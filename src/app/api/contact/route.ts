// Réception du formulaire de contact.
// Protections : même origine uniquement, taille de requête limitée, champ piège (honeypot),
// délai minimal de remplissage, limite de fréquence par adresse IP, captcha Cloudflare
// Turnstile si les clés sont configurées, validation stricte, e-mail échappé (pas d'injection HTML).
// Envoi par l'API Resend : RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL.
import { NextResponse, type NextRequest } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";
import { CONTACT_EMAIL, CONTACT_SUBJECTS } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 3000; // un humain met plus de 3 s à remplir le formulaire
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5; // 5 envois / 10 min / IP

// Mémoire de l'instance serveur. Sur Vercel chaque instance a la sienne : c'est un frein,
// pas une garantie absolue (Turnstile fait le gros du travail contre les robots).
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const str = (v: unknown) => (typeof v === "string" ? v : "");

const fail = (status: number, error: string, fields?: object) =>
  NextResponse.json({ ok: false, error, fields }, { status });

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // captcha non configuré
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}

export async function POST(req: NextRequest) {
  // 1. Même origine : refuse les envois depuis un autre site
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) {
    return fail(403, "Requête refusée.");
  }

  // 2. Taille et format
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return fail(413, "Message trop volumineux.");
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "Requête invalide.");
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "inconnue";

  // 3. Robots : champ piège rempli ou formulaire envoyé trop vite -> on fait semblant d'accepter
  const startedAt = Number(body.startedAt);
  if (str(body.website) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  // 4. Fréquence
  if (rateLimited(ip)) {
    return fail(429, "Trop d'envois en peu de temps. Réessayez dans quelques minutes.");
  }

  // 5. Captcha
  if (!(await verifyTurnstile(str(body.turnstileToken), ip))) {
    return fail(400, "La vérification anti-robot a échoué. Rechargez la page et réessayez.");
  }

  // 6. Validation (la même que dans le navigateur, mais c'est celle-ci qui fait foi)
  const input: ContactInput = {
    firstName: str(body.firstName).trim(),
    lastName: str(body.lastName).trim(),
    company: str(body.company).trim(),
    email: str(body.email).trim(),
    phone: str(body.phone).trim(),
    subject: str(body.subject) as ContactInput["subject"],
    message: str(body.message).trim(),
    consent: body.consent === true,
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return fail(422, "Certains champs sont à corriger.", errors);
  }

  // 7. Envoi
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;
  if (!apiKey || !from) {
    console.error("[contact] RESEND_API_KEY ou CONTACT_FROM_EMAIL manquant");
    return fail(
      503,
      `Le formulaire est momentanément indisponible. Écrivez-nous à ${CONTACT_EMAIL}.`,
    );
  }

  const subjectLabel =
    CONTACT_SUBJECTS.find((s) => s.key === input.subject)?.label ?? "Contact";
  const fullName = `${input.firstName} ${input.lastName}`;
  const rows: [string, string][] = [
    ["Objet", subjectLabel],
    ["Nom", fullName],
    ["Société", input.company || "-"],
    ["E-mail", input.email],
    ["Téléphone", input.phone || "-"],
  ];
  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#ab2325">${escapeHtml(subjectLabel)}</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(input.message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${input.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email, // « Répondre » écrit directement au visiteur
      // Retours à la ligne retirés : empêche l'injection d'en-têtes par l'objet
      subject: `[Site] ${subjectLabel} - ${fullName}`.replace(/[\r\n]+/g, " "),
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend", res.status, await res.text().catch(() => ""));
    return fail(502, `L'envoi a échoué. Réessayez ou écrivez-nous à ${CONTACT_EMAIL}.`);
  }

  return NextResponse.json({ ok: true });
}
