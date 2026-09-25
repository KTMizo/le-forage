/**
 * Crée les actualités (type « article ») à partir des posts LinkedIn de Le Forage.
 *
 * Usage (PRISMIC_WRITE_TOKEN dans .env.local, type « article » déjà envoyé avec `npx prismic push`) :
 *   npm run news:prismic -- --dry-run   # affiche ce qui serait créé
 *   npm run news:prismic                # crée les actualités (images comprises)
 *
 * Les documents arrivent dans la release « Migration », non publiés. Les actualités déjà
 * présentes (même UID) sont ignorées : le script peut être relancé sans créer de doublons.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, createMigration, createWriteClient } from "@prismicio/client";
import type { RichTextField } from "@prismicio/client";
import prismicConfig from "../../prismic.config.json";
import { ARTICLES } from "./linkedin/articles";

type Post = { id: string; date: string; url: string; text: string; images: string[] };

const DIR = join(__dirname, "linkedin");
const posts: Post[] = JSON.parse(readFileSync(join(DIR, "posts.json"), "utf8"));
const DRY_RUN = process.argv.includes("--dry-run");

// Texte du post -> texte riche : un bloc par paragraphe, « - » en liste, hashtags retirés
function toRichText(text: string): RichTextField {
  const blocks: RichTextField[number][] = [];
  for (const chunk of text.split(/\n{2,}/)) {
    const lines = chunk
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !/^(#\S+\s*)+$/.test(l)); // ligne composée uniquement de hashtags
    if (!lines.length) continue;
    if (lines.every((l) => l.startsWith("- "))) {
      lines.forEach((l) => blocks.push({ type: "list-item", text: l.slice(2), spans: [] }));
    } else {
      const paragraph: string[] = [];
      for (const l of lines) {
        if (l.startsWith("- ")) blocks.push({ type: "list-item", text: l.slice(2), spans: [] });
        else paragraph.push(l);
      }
      if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join("\n"), spans: [] });
    }
  }
  return blocks as RichTextField;
}

async function main() {
  const repositoryName = prismicConfig.repositoryName;
  const reader = createClient(repositoryName, { accessToken: process.env.PRISMIC_ACCESS_TOKEN });
  const existing = new Set(
    (await reader.getAllByType("article").catch(() => [])).map((doc) => doc.uid),
  );

  const migration = createMigration();
  let count = 0;
  for (const post of posts) {
    const meta = ARTICLES[post.id];
    if (!meta) {
      console.warn(`Post ${post.id} sans titre prévu dans articles.ts : ignoré`);
      continue;
    }
    if (existing.has(meta.uid)) {
      console.log(`= déjà présent : ${meta.uid}`);
      continue;
    }
    const assets = post.images.map((file, i) =>
      migration.createAsset(readFileSync(join(DIR, file)), `${meta.uid}-${i + 1}.jpg`, {
        alt: `${meta.title}${post.images.length > 1 ? ` (photo ${i + 1})` : ""}`,
        credits: "Le Forage",
      }),
    );
    migration.createDocument(
      {
        type: "article",
        uid: meta.uid,
        lang: "fr-fr",
        data: {
          title: [{ type: "heading1", text: meta.title, spans: [] }],
          date: post.date,
          excerpt: meta.excerpt,
          cover: assets[0],
          content: toRichText(post.text),
          // Le type généré exige un tableau non vide : cast pour les posts à une seule image
          gallery: assets.slice(1).map((image) => ({ image })) as never,
          linkedin_url: { link_type: "Web", url: post.url, target: "_blank" },
          meta_title: meta.title,
          meta_description: meta.excerpt,
          meta_image: assets[0],
        },
      },
      meta.title,
    );
    count++;
    console.log(`+ ${post.date}  ${meta.uid}  (${post.images.length} image(s))`);
  }

  if (DRY_RUN || !count) {
    console.log(DRY_RUN ? "\n--dry-run : rien n'a été envoyé." : "\nRien à créer.");
    return;
  }

  const writeToken = process.env.PRISMIC_WRITE_TOKEN;
  if (!writeToken) throw new Error("PRISMIC_WRITE_TOKEN manquant (Settings > API & Security > Write APIs).");

  const writeClient = createWriteClient(repositoryName, { writeToken });
  await writeClient.migrate(migration, {
    reporter: (event) => {
      if (event.type === "assets:creating")
        console.log(`[image ${event.data.current}/${event.data.total}] ${event.data.asset.config.filename}`);
      if (event.type === "documents:creating")
        console.log(`[actualité ${event.data.current}/${event.data.total}] ${event.data.document.title}`);
      if (event.type === "end")
        console.log('\nTerminé. Relis la release « Migration » dans Prismic, puis publie-la.');
    },
  });
}

main().catch((error) => {
  console.error("\nÉchec :", error);
  process.exit(1);
});
