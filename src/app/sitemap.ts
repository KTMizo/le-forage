import { MetadataRoute } from "next";

const SITE_URL = "https://www.leforage.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/mentions-legales`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/protection-donnees`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
