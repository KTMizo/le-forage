// Constantes du site partagées entre les composants
export const CONTACT_EMAIL = "contact@leforage.fr";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const CONTACT_PAGE = "/contact";
export const QUOTE_PAGE = "/contact?objet=devis";
export const ADDRESS_URL = "https://share.google/1bkRVXJnEzysTFXns";

// Ancres de la page d'accueil (en-tête desktop et menu mobile).
// Depuis une autre page, elles pointent vers l'accueil : navHref("#faq", false) = "/#faq".
export const NAV_LINKS = [
  { title: "À propos", url: "#a-propos" },
  { title: "Nos services", url: "#services" },
  { title: "Sécurité", url: "#rse" },
  { title: "Nos machines", url: "#machines" },
  { title: "FAQ", url: "#faq" },
];

// Coordonnées affichées sur la page contact. Une valeur vide n'est pas affichée :
// à compléter quand le client aura donné son adresse et son téléphone.
export const COMPANY = {
  name: "Le Forage",
  address: "", // ex. "12 rue Exemple, 75000 Paris"
  phone: "", // ex. "01 23 45 67 89"
  hours: "", // ex. "Du lundi au vendredi, de 8h à 18h"
};

// Objets proposés dans le formulaire de contact (la clé sert aussi pour ?objet= dans l'URL)
export const CONTACT_SUBJECTS = [
  { key: "devis", label: "Je veux un devis" },
  { key: "candidature", label: "Je candidate chez vous" },
  { key: "prestation", label: "Question sur une prestation" },
  { key: "chantier", label: "Suivi d'un chantier en cours" },
  { key: "partenariat", label: "Partenariat ou sous-traitance" },
  { key: "fournisseur", label: "Je suis fournisseur" },
  { key: "autre", label: "Autre demande" },
] as const;

export type ContactSubjectKey = (typeof CONTACT_SUBJECTS)[number]["key"];

export const navHref = (url: string, onHome: boolean) =>
  onHome || !url.startsWith("#") ? url : `/${url}`;
