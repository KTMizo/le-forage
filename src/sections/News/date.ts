// « 2026-09-24 » -> « 24 septembre 2026 » (date fixe, sans décalage de fuseau)
export const formatNewsDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );
