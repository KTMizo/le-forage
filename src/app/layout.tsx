// app/layout.tsx
import "../styles/globals.css";
import "../styles/variables.css";
import LenisProvider from "./LenisProvider";
import Loader from "@/components/Loader";
import InfiniteWrapper from "./InfiniteWrapper";

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
        <LenisProvider>
          <Loader />
          <InfiniteWrapper>{children}</InfiniteWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
