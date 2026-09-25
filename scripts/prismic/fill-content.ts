/**
 * Remplit la FAQ, les deux pages légales et les liens « Demandez un devis » dans Prismic.
 *
 * Usage (en local, avec PRISMIC_WRITE_TOKEN dans .env.local) :
 *   npm run content:prismic -- --dry-run   # affiche ce qui serait envoyé, n'envoie rien
 *   npm run content:prismic                # envoie
 *
 * Les documents mis à jour arrivent dans la release « Migration » de Prismic, NON publiés :
 * relis-les dans le dashboard, puis publie la release.
 *
 * AVANT DE LANCER : complète le bloc COMPANY ci-dessous. Toute valeur vide apparaîtra
 * sous la forme « [À COMPLÉTER] » dans les pages légales.
 */
import { createClient, createMigration, createWriteClient } from "@prismicio/client";
import type { RichTextField } from "@prismicio/client";
import prismicConfig from "../../prismic.config.json";

// ---------------------------------------------------------------------------
// Informations de l'entreprise (à compléter)
// ---------------------------------------------------------------------------
const COMPANY = {
  legalName: "Le Forage", // raison sociale exacte (Kbis)
  legalForm: "", // SAS, SARL…
  capital: "", // ex. « 10 000 € »
  address: "", // siège social complet
  rcs: "", // ex. « RCS Paris 123 456 789 »
  siret: "",
  vat: "", // TVA intracommunautaire
  phone: "",
  email: "contact@leforage.fr",
  director: "", // directeur de la publication (prénom nom)
  directorRole: "", // ex. « Président »
  designer: "", // conception et réalisation du site
};

const TODO = "[À COMPLÉTER]";
const v = (value: string) => value || TODO;

// ---------------------------------------------------------------------------
// Helpers texte riche
// ---------------------------------------------------------------------------
type Block = RichTextField[number];
const p = (text: string): Block => ({ type: "paragraph", text, spans: [] });
const li = (text: string): Block => ({ type: "list-item", text, spans: [] });
const rich = (...blocks: Block[]) => blocks as RichTextField;

// ---------------------------------------------------------------------------
// FAQ (les questions existantes sont conservées, seules les réponses changent)
// ---------------------------------------------------------------------------
const FAQ: Record<string, RichTextField> = {
  "Quels types de forage proposez-vous ?": rich(
    p("Nous réalisons trois familles de prestations :"),
    li("les forages géotechniques : sondages pressiométriques, carottés, destructifs instrumentés, à la tarière, et essais au pénétromètre dynamique et statique ;"),
    li("les forages environnementaux : prélèvements de sols, pose de piézomètres et de piézairs ;"),
    li("les essais d'eau : suivi piézométrique, essais de pompage et essais de perméabilité."),
    p("Chaque prestation est adaptée au cahier des charges de votre bureau d'études."),
  ),
  "Quelle est la durée typique d'un projet de forage ?": rich(
    p("Elle dépend du nombre de sondages, de leur profondeur, de la nature du terrain et de l'accès au chantier. Une campagne de quelques sondages se réalise en général en une à deux journées sur site ; les campagnes plus importantes se planifient sur plusieurs jours."),
    p("Nous vous communiquons un planning précis avec le devis."),
  ),
  "Quels équipements utilisez-vous pour le forage ?": rich(
    p("Nous travaillons avec notre propre parc de machines, dont la foreuse E 4.50 et le pénétromètre DPM 30, présentés dans la rubrique « Nos machines » avec leur fiche technique."),
    p("Le choix de la machine dépend du type de sondage, de la profondeur visée et de l'accessibilité du site."),
  ),
  "Intervenez-vous uniquement en Île-de-France ?": rich(
    p("Nous intervenons principalement en Île-de-France et dans les régions limitrophes. Pour un chantier plus éloigné, contactez-nous : nous étudions chaque demande."),
  ),
  "Proposez-vous des analyses en laboratoire ?": rich(
    p("Nous réalisons les prélèvements sur site (sols, eaux, gaz des sols) en respectant les protocoles de conditionnement et de conservation des échantillons. Les analyses sont confiées à des laboratoires accrédités, et les résultats sont transmis à votre bureau d'études."),
  ),
  "Les DICT sont elles obligatoires ?": rich(
    p("Oui. Avant tout forage, la réglementation anti-endommagement des réseaux impose de déclarer les travaux aux exploitants des réseaux enterrés : la DT est faite par le maître d'ouvrage, la DICT par l'entreprise qui exécute les travaux, via le guichet unique reseaux-et-canalisations.gouv.fr."),
    p("Aucun sondage ne démarre sans les réponses des exploitants. Nous pouvons prendre en charge les DICT de votre chantier."),
  ),
};

// ---------------------------------------------------------------------------
// Pages légales
// ---------------------------------------------------------------------------
const LEGAL: Record<string, { subtitle: string; meta: string; sections: { title: string; content: RichTextField }[] }> = {
  "mentions-legales": {
    subtitle: "Informations légales relatives au site leforage.fr",
    meta: "Mentions légales du site Le Forage : éditeur, hébergeur, propriété intellectuelle.",
    sections: [
      {
        title: "Éditeur du site",
        content: rich(
          p(`Le site leforage.fr est édité par ${COMPANY.legalName}, ${v(COMPANY.legalForm)} au capital de ${v(COMPANY.capital)}.`),
          li(`Siège social : ${v(COMPANY.address)}`),
          li(`Immatriculation : ${v(COMPANY.rcs)}`),
          li(`SIRET : ${v(COMPANY.siret)}`),
          li(`TVA intracommunautaire : ${v(COMPANY.vat)}`),
          li(`Téléphone : ${v(COMPANY.phone)}`),
          li(`E-mail : ${COMPANY.email}`),
        ),
      },
      {
        title: "Directeur de la publication",
        content: rich(p(`${v(COMPANY.director)}, en qualité de ${v(COMPANY.directorRole)}.`)),
      },
      {
        title: "Hébergement",
        content: rich(
          p("Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis (vercel.com)."),
          p("Les contenus sont administrés avec Prismic, service de gestion de contenu en ligne."),
        ),
      },
      {
        title: "Conception et réalisation",
        content: rich(p(v(COMPANY.designer))),
      },
      {
        title: "Propriété intellectuelle",
        content: rich(
          p(`L'ensemble des éléments du site (textes, photographies, logo, illustrations, mise en page) est la propriété de ${COMPANY.legalName} ou de ses partenaires et est protégé par le droit de la propriété intellectuelle.`),
          p("Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite."),
        ),
      },
      {
        title: "Responsabilité",
        content: rich(
          p(`${COMPANY.legalName} veille à l'exactitude des informations publiées, sans pouvoir garantir qu'elles soient exhaustives ou exemptes d'erreurs. Elles sont données à titre indicatif et ne remplacent pas une étude adaptée à votre projet.`),
          p(`Les liens vers des sites tiers sont fournis pour information ; ${COMPANY.legalName} n'est pas responsable de leur contenu.`),
        ),
      },
      {
        title: "Données personnelles et cookies",
        content: rich(
          p("Le traitement de vos données personnelles et l'utilisation des cookies sont décrits dans notre page « Protection des données »."),
        ),
      },
      {
        title: "Droit applicable",
        content: rich(p("Les présentes mentions légales sont soumises au droit français.")),
      },
    ],
  },
  "protection-donnees": {
    subtitle: "Comment nous collectons et utilisons vos données",
    meta: "Politique de protection des données personnelles et cookies du site Le Forage.",
    sections: [
      {
        title: "Responsable du traitement",
        content: rich(
          p(`Le responsable du traitement est ${COMPANY.legalName}, ${v(COMPANY.address)}. Pour toute question sur vos données : ${COMPANY.email}.`),
        ),
      },
      {
        title: "Données collectées",
        content: rich(
          p("Nous collectons uniquement les données nécessaires :"),
          li("via le formulaire de contact : objet de la demande, prénom, nom, société, adresse e-mail, téléphone (facultatif) et contenu du message ;"),
          li("via la mesure d'audience, si vous l'acceptez : pages consultées, durée de visite, type d'appareil et de navigateur, provenance géographique approximative."),
          p("Aucune donnée n'est collectée à votre insu et aucune n'est revendue."),
        ),
      },
      {
        title: "Finalités et bases légales",
        content: rich(
          li("Répondre à vos demandes de contact et de devis : mesures précontractuelles prises à votre demande et intérêt légitime de Le Forage à répondre à ses prospects."),
          li("Étudier votre candidature : mesures précontractuelles prises à votre demande."),
          li("Mesurer l'audience du site pour l'améliorer : votre consentement."),
        ),
      },
      {
        title: "Destinataires",
        content: rich(
          p(`Vos données sont destinées aux seules personnes habilitées de ${COMPANY.legalName}. Elles sont traitées pour notre compte par des prestataires techniques :`),
          li("Vercel Inc. (hébergement du site) ;"),
          li("Resend (acheminement des messages du formulaire de contact) ;"),
          li("Google LLC (mesure d'audience Google Analytics, si vous l'acceptez)."),
        ),
      },
      {
        title: "Transferts hors de l'Union européenne",
        content: rich(
          p("Ces prestataires peuvent traiter des données aux États-Unis. Ces transferts sont encadrés par les garanties prévues par le RGPD : décision d'adéquation (Data Privacy Framework) ou clauses contractuelles types de la Commission européenne."),
        ),
      },
      {
        title: "Durées de conservation",
        content: rich(
          li("Demandes de contact et de devis : 3 ans à compter du dernier échange."),
          li("Candidatures non retenues : 2 ans à compter du dernier échange, sauf demande de suppression de votre part."),
          li("Cookies de mesure d'audience : 13 mois au maximum ; données statistiques associées : 25 mois au maximum."),
        ),
      },
      {
        title: "Sécurité",
        content: rich(
          p("Le site est servi exclusivement en HTTPS. Le formulaire de contact est protégé contre les envois automatisés, et les messages ne sont conservés que dans la messagerie de Le Forage."),
        ),
      },
      {
        title: "Vos droits",
        content: rich(
          p("Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données, ainsi que du droit de définir des directives relatives à leur sort après votre décès. Vous pouvez retirer votre consentement à tout moment."),
          p(`Pour exercer ces droits, écrivez à ${COMPANY.email}. Nous répondons dans un délai d'un mois.`),
          p("Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (www.cnil.fr)."),
        ),
      },
      {
        title: "Cookies",
        content: rich(
          p("Le site utilise des cookies de mesure d'audience (Google Analytics) uniquement avec votre accord, recueilli lors de votre première visite. Vous pouvez modifier votre choix à tout moment ; refuser ces cookies n'empêche pas d'utiliser le site."),
          p("Vous pouvez également bloquer les cookies depuis les paramètres de votre navigateur."),
        ),
      },
    ],
  },
};

// Boutons « Demandez un devis » : vers la page contact, objet pré-sélectionné
const QUOTE_URL = "/contact?objet=devis";

// ---------------------------------------------------------------------------
// Envoi
// ---------------------------------------------------------------------------
const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  const repositoryName = prismicConfig.repositoryName;
  const reader = createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  const missing = Object.entries(COMPANY).filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) {
    console.warn(`Attention, champs COMPANY vides (affichés « ${TODO} ») : ${missing.join(", ")}\n`);
  }

  const home = await reader.getSingle("home");
  const unknown: string[] = [];
  home.data.faq_items = home.data.faq_items.map((item) => {
    const answer = item.question ? FAQ[item.question] : undefined;
    if (!answer) unknown.push(item.question ?? "(sans question)");
    return answer ? { ...item, answer } : item;
  }) as typeof home.data.faq_items;
  home.data.hero_button_url = QUOTE_URL;
  home.data.footer_button_url = QUOTE_URL;

  const legalDocs = await Promise.all(
    Object.entries(LEGAL).map(async ([uid, content]) => {
      const doc = await reader.getByUID("legal_page", uid);
      doc.data.subtitle = content.subtitle;
      doc.data.meta_description = content.meta;
      doc.data.sections = content.sections.map((s) => ({
        title: s.title,
        content: s.content,
      })) as typeof doc.data.sections;
      return doc;
    }),
  );

  console.log(`Repository : ${repositoryName}`);
  console.log(`Accueil : ${home.data.faq_items.length} réponses FAQ, boutons devis -> ${QUOTE_URL}`);
  if (unknown.length) console.log(`  Questions sans réponse prévue (inchangées) : ${unknown.join(" | ")}`);
  for (const doc of legalDocs) console.log(`Page légale « ${doc.uid} » : ${doc.data.sections.length} sections`);

  if (DRY_RUN) {
    console.log("\n--dry-run : rien n'a été envoyé.");
    return;
  }

  const writeToken = process.env.PRISMIC_WRITE_TOKEN;
  if (!writeToken) {
    throw new Error("PRISMIC_WRITE_TOKEN manquant dans .env.local (Settings > API & Security > Write APIs).");
  }

  const migration = createMigration();
  migration.updateDocument(home, "Accueil");
  for (const doc of legalDocs) migration.updateDocument(doc, doc.data.title || doc.uid);

  const writeClient = createWriteClient(repositoryName, { writeToken });
  await writeClient.migrate(migration, {
    reporter: (event) => {
      if (event.type === "documents:updating")
        console.log(`[document ${event.data.current}/${event.data.total}] ${event.data.document.title}`);
      if (event.type === "end")
        console.log('\nTerminé. Relis la release « Migration » dans Prismic, puis publie-la.');
    },
  });
}

main().catch((error) => {
  console.error("\nÉchec :", error);
  process.exit(1);
});
