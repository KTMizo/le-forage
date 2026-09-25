// Titres et résumés rédigés pour le site (référencement), à partir des posts LinkedIn.
// Le texte des posts est repris tel quel depuis posts.json (hashtags retirés).
// tempImage : image déjà présente dans Prismic (page d'accueil), utilisée en photo provisoire
// quand les photos LinkedIn ne peuvent pas être envoyées (mode --temp-images).
export const ARTICLES: Record<string, { uid: string; title: string; excerpt: string; tempImage: string }> = {
  "7508888214368043008": {
    uid: "deux-foreuses-emci-e450-ecocentre-morangis",
    title: "Deux foreuses EMCI E4.50 à l'Écocentre de Morangis",
    excerpt: "À l'Écocentre de Morangis (91), nos deux foreuses EMCI E4.50 et leurs équipes interviennent côte à côte sur le chantier.",
    tempImage: "service: Forage géotechniques",
  },
  "7508140141794816000": {
    uid: "sondages-hydrogeologiques-saint-aubin-le-cauf",
    title: "Sondages hydrogéologiques à Saint-Aubin-le-Cauf",
    excerpt: "Nos sondages hydrogéologiques nous emmènent au vert, à Saint-Aubin-le-Cauf, en Seine-Maritime (76).",
    tempImage: "question: Piézomètres",
  },
  "7504163456498053120": {
    uid: "sondages-pressiometriques-pantin",
    title: "Sondages pressiométriques à Pantin",
    excerpt: "Nouvelle intervention de Le Forage à Pantin (Seine-Saint-Denis) pour la réalisation de sondages pressiométriques.",
    tempImage: "question: Sondage pressiométrique",
  },
  "7503382471548313602": {
    uid: "sondages-geotechniques-sous-sol-paris-15",
    title: "Sondages géotechniques en sous-sol à Paris 15ᵉ",
    excerpt: "Dans le parking d'un immeuble du boulevard de Grenelle, une de nos foreuses compactes a réalisé des sondages avec quelques centimètres de marge.",
    tempImage: "question: Sondage destructif instrumenté",
  },
  "7488516559032868864": {
    uid: "reconnaissances-geotechniques-cimetiere-americain-suresnes",
    title: "Reconnaissances géotechniques au cimetière américain de Suresnes",
    excerpt: "Caractérisation des terrains et des fondations existantes, avec plaques de protection pour préserver les espaces paysagers.",
    tempImage: "question: Sondage carotté",
  },
  "7397571492882055170": {
    uid: "forage-par-grand-froid",
    title: "Forer par grand froid",
    excerpt: "Même quand le thermomètre descend, nos équipes gardent la motivation au plus haut et continuent de forer.",
    tempImage: "hero_about_break",
  },
  "7397283894242410496": {
    uid: "essais-matsuo-zone-agricole",
    title: "Journal de chantier : essais Matsuo en zone agricole",
    excerpt: "Ouverture d'une fouille à la mini-pelle pour une série d'essais Matsuo, dans le respect du sol agricole, remis en état en fin de journée.",
    tempImage: "question: Sols",
  },
  "7394310786896277504": {
    uid: "securite-au-coeur-de-nos-chantiers",
    title: "La sécurité, au cœur de nos chantiers",
    excerpt: "Chez Le Forage, la sécurité est une priorité de chaque instant : des équipes formées, protégées et équipées de la tête aux pieds.",
    tempImage: "about_image",
  },
  "7393695362051514370": {
    uid: "forage-rue-d-anjou-paris-8",
    title: "Forage en intérieur rue d'Anjou, Paris 8ᵉ",
    excerpt: "Forage depuis l'étage jusqu'au sous-sol avec la foreuse compacte télécommandée Terramo TR-0.8, dans un espace confiné.",
    tempImage: "question: Sondage à la Tarière",
  },
  "7392165232359444481": {
    uid: "sondages-controle-eglise-saint-charles-joinville-le-pont",
    title: "Sondages de contrôle à l'église Saint-Charles de Joinville-le-Pont",
    excerpt: "6 sondages destructifs et 3 sondages pressiométriques à 16 m pour ANTEA GROUP, dans le cadre du comblement d'une carrière de calcaire grossier.",
    tempImage: "question: Pénétromètre dynamique",
  },
};
