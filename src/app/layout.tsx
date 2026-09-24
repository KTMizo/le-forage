// app/layout.tsx
import "../styles/globals.css";
import "../styles/variables.css";
import LenisProvider from "./LenisProvider";
import Loader from "@/components/Loader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { cmsSource } from "@/lib/cms";

export const metadata = {
  title: "Le Forage : Spécialistes en Sondage Géotechnique",
  description:
    "Le Forage offre des services de sondage géotechnique de haute qualité pour évaluer les conditions du sol et assurer la réussite de vos projets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <GoogleAnalytics />
        <LenisProvider>
          <Loader />
          {children}
        </LenisProvider>
        {cmsSource === "prismic" && (
          <PrismicPreview repositoryName={repositoryName} />
        )}
      </body>
    </html>
  );
}
