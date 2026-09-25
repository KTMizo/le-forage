"use client";
// Formulaire de contact. La validation ici ne sert qu'au confort : le serveur revalide tout.
import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import Button from "@/components/UI/Button";
import { CONTACT_EMAIL, CONTACT_SUBJECTS } from "@/lib/site";
import {
  LIMITS,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";
import styles from "./Contact.module.css";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const EMPTY: ContactInput = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ initialSubject }: { initialSubject?: string }) {
  const [values, setValues] = useState<ContactInput>(() => ({
    ...EMPTY,
    subject: CONTACT_SUBJECTS.some((s) => s.key === initialSubject)
      ? (initialSubject as ContactInput["subject"])
      : "",
  }));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Focus sur le premier champ en erreur
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: form.get("website") ?? "", // champ piège
          startedAt: startedAt.current,
          turnstileToken: form.get("cf-turnstile-response") ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setValues(EMPTY);
        return;
      }
      if (data.fields) setErrors(data.fields);
      setServerMessage(data.error || "L'envoi a échoué.");
      setStatus("error");
    } catch {
      setServerMessage(`L'envoi a échoué. Écrivez-nous à ${CONTACT_EMAIL}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.success} role="status">
        <p className="font-articulate text-m lg:text-desk-m text-red">Merci, votre message est bien parti.</p>
        <p className="font-articulate text-16 lg:text-desk-s">
          Nous vous répondons au plus vite, en général sous 48 h ouvrées.
        </p>
      </div>
    );
  }

  const field = (key: keyof ContactInput) => ({
    id: `contact-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
  });
  const error = (key: keyof ContactInput) =>
    errors[key] ? (
      <span id={`contact-${key}-error`} className={styles.error}>
        {errors[key]}
      </span>
    ) : null;

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      {TURNSTILE_SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      )}

      <div className={styles.field}>
        <label htmlFor="contact-subject">Objet de votre demande *</label>
        <div className={styles.select}>
          <select
            {...field("subject")}
            value={values.subject}
            onChange={(e) => set("subject", e.target.value as ContactInput["subject"])}
            required
          >
            <option value="" disabled>
              Choisissez un objet
            </option>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        {error("subject")}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-firstName">Prénom *</label>
          <input
            {...field("firstName")}
            autoComplete="given-name"
            maxLength={LIMITS.name}
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            required
          />
          {error("firstName")}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-lastName">Nom *</label>
          <input
            {...field("lastName")}
            autoComplete="family-name"
            maxLength={LIMITS.name}
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            required
          />
          {error("lastName")}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-email">E-mail *</label>
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            required
          />
          {error("email")}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-phone">Téléphone</label>
          <input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          {error("phone")}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-company">Société</label>
        <input
          {...field("company")}
          autoComplete="organization"
          maxLength={LIMITS.company}
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
        {error("company")}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Votre message *</label>
        <textarea
          {...field("message")}
          rows={7}
          maxLength={LIMITS.message}
          placeholder={
            values.subject === "devis"
              ? "Type de sondage, adresse du chantier, délais souhaités…"
              : values.subject === "candidature"
                ? "Poste recherché, expérience, disponibilités…"
                : ""
          }
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          required
        />
        <span className={styles.counter} aria-hidden="true">
          {values.message.length} / {LIMITS.message}
        </span>
        {error("message")}
      </div>

      {/* Champ piège : invisible pour un humain, rempli par les robots */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="contact-website">Site web</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.field}>
        <label className={styles.consent}>
          <input
            {...field("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <span>
            J&apos;accepte que Le Forage utilise ces informations pour répondre à ma demande. Voir
            notre <a href="/protection-donnees">politique de protection des données</a>. *
          </span>
        </label>
        {error("consent")}
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-language="fr" />
      )}

      <div className={styles.actions}>
        <Button type="submit" variant="secondary" showArrow disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        </Button>
        <span className={styles.required}>* Champs obligatoires</span>
      </div>

      {status === "error" && serverMessage && (
        <p className={styles.serverError} role="alert">
          {serverMessage}
        </p>
      )}
    </form>
  );
}
