/**
 * Import du contenu WordPress (export JSON de migration/wordpress-export/)
 * dans Prismic via l'API Migration.
 *
 * Usage :
 *   npm run migrate:prismic -- --dry-run   # vérifie la transformation, n'envoie rien
 *   npm run migrate:prismic                # envoie (PRISMIC_WRITE_TOKEN requis)
 *
 * Les images et PDF sont téléchargés depuis admin.leforage.fr puis envoyés dans
 * la médiathèque Prismic. Les documents arrivent dans la release « Migration »,
 * non publiés : il faut les relire puis publier depuis le dashboard.
 *
 * À lancer une seule fois : une deuxième exécution recréerait les médias.
 */
import {
  createClient,
  createWriteClient,
} from "@prismicio/client";
import prismicConfig from "../../prismic.config.json";
import { assetURLs, legalPages, migration } from "./wordpress-to-prismic";

const DRY_RUN = process.argv.includes("--dry-run");

// ---------------------------------------------------------------------------
// Envoi
// ---------------------------------------------------------------------------

async function main() {
  const repositoryName = prismicConfig.repositoryName;
  const docs = ["Accueil", ...legalPages.map((p) => p.slug)];

  console.log(`Repository : ${repositoryName}`);
  console.log(`Documents  : ${docs.join(", ")}`);
  console.log(`Médias     : ${assetURLs.size}`);
  for (const url of [...assetURLs].sort()) console.log(`  - ${url}`);

  if (DRY_RUN) {
    console.log("\n--dry-run : rien n'a été envoyé.");
    return;
  }

  const writeToken = process.env.PRISMIC_WRITE_TOKEN;
  if (!writeToken) {
    throw new Error(
      "PRISMIC_WRITE_TOKEN manquant. Ajoute-le dans .env.local (Settings → API & Security → Write APIs).",
    );
  }

  // Les modèles doivent déjà exister dans Prismic (npx prismic push) :
  // l'API Migration refuse sinon les documents avec un message explicite.
  const reader = createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  // Garde-fou : ne pas réimporter par-dessus un contenu déjà publié
  const existing = await reader.getAllByType("home").catch(() => []);
  if (existing.length && !process.argv.includes("--force")) {
    throw new Error(
      'Un document "home" est déjà publié. Relance avec --force si tu veux vraiment réimporter.',
    );
  }

  const writeClient = createWriteClient(repositoryName, { writeToken });

  await writeClient.migrate(migration, {
    reporter: (event) => {
      switch (event.type) {
        case "assets:creating":
          console.log(
            `[média ${event.data.current}/${event.data.total}] ${event.data.asset.config.filename}`,
          );
          break;
        case "documents:creating":
          console.log(
            `[document ${event.data.current}/${event.data.total}] ${event.data.document.title}`,
          );
          break;
        case "end":
          console.log(
            `\nTerminé : ${event.data.migrated.assets} médias, ${event.data.migrated.documents} documents.`,
          );
          console.log('Relis la release "Migration" dans Prismic, puis publie-la.');
          break;
      }
    },
  });
}

main().catch((error) => {
  console.error("\nÉchec de la migration :", error);
  process.exit(1);
});
