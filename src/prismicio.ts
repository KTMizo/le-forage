import {
  createClient as baseCreateClient,
  type ClientConfig,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import prismicConfig from "../prismic.config.json";

// Nom du repository Prismic (le-forage.prismic.io)
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || prismicConfig.repositoryName;

export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    // La route des actualités est gérée par le site (/actualites/[uid]) : si le client Prismic
    // la connaissait alors que le type « article » n'est pas encore envoyé dans Prismic,
    // toutes les requêtes échoueraient (« Link resolver error: Unknown type »).
    routes: prismicConfig.routes.filter((route) => route.type !== "article"),
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    // En production, le cache est vidé par le webhook Prismic (/api/revalidate)
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
