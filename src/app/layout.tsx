// app/layout.tsx
import "../styles/globals.css";
import "../styles/variables.css";
import LenisProvider from "./LenisProvider";
import Loader from "@/components/Loader";
import CookieConsent from "@/components/CookieConsent";
import GridOverlay from "@/components/UI/GridOverlay";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

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
      <head>
        {/* Avant tout le reste : empêche le navigateur de restaurer la position de scroll au
            rechargement (la page repart toujours du haut, comme le prévoit LenisProvider) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual';window.scrollTo(0,0);",
          }}
        />
      </head>
      <body>
        <LenisProvider>
          <Loader />
          {children}
        </LenisProvider>
        <CookieConsent />
        <GridOverlay />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
