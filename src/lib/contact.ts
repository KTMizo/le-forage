// Validation du formulaire de contact, partagée entre le navigateur (retour immédiat)
// et le serveur (seule validation qui fait foi).
import { CONTACT_SUBJECTS, type ContactSubjectKey } from "@/lib/site";

export interface ContactInput {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  subject: ContactSubjectKey | "";
  message: string;
  consent: boolean;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = {
  name: 80,
  company: 120,
  email: 160,
  phone: 30,
  messageMin: 10,
  message: 4000,
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+0-9 ().-]{6,30}$/;

export function validateContact(input: ContactInput): ContactErrors {
  // Même ordre que les champs du formulaire (le premier en erreur reçoit le focus)
  const e: ContactErrors = {};
  if (!CONTACT_SUBJECTS.some((s) => s.key === input.subject))
    e.subject = "Choisissez l'objet de votre demande.";
  if (!input.firstName.trim()) e.firstName = "Indiquez votre prénom.";
  else if (input.firstName.length > LIMITS.name) e.firstName = "Prénom trop long.";
  if (!input.lastName.trim()) e.lastName = "Indiquez votre nom.";
  else if (input.lastName.length > LIMITS.name) e.lastName = "Nom trop long.";
  if (input.company.length > LIMITS.company) e.company = "Nom de société trop long.";
  if (!input.email.trim()) e.email = "Indiquez votre adresse e-mail.";
  else if (input.email.length > LIMITS.email || !EMAIL_RE.test(input.email.trim()))
    e.email = "Cette adresse e-mail ne semble pas valide.";
  if (input.phone.trim() && !PHONE_RE.test(input.phone.trim()))
    e.phone = "Ce numéro ne semble pas valide.";
  const len = input.message.trim().length;
  if (len < LIMITS.messageMin) e.message = "Votre message est trop court.";
  else if (input.message.length > LIMITS.message)
    e.message = `Votre message dépasse ${LIMITS.message} caractères.`;
  if (!input.consent)
    e.consent = "Merci d'accepter l'utilisation de vos données pour traiter votre demande.";
  return e;
}
