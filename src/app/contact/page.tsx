import type { Metadata } from "next";
import Header from "@/components/Header";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import { getFooterData } from "@/lib/prismic";

export const metadata: Metadata = {
  title: "Nous contacter | Le Forage",
  description:
    "Demande de devis, question sur une prestation de sondage ou candidature : contactez Le Forage.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ objet?: string }>;
}) {
  const [{ objet }, footerData] = await Promise.all([searchParams, getFooterData()]);

  return (
    <main>
      <Header />
      <div id="page-content">
        <Contact initialSubject={objet} />
        <div className="bg-red">
          <Footer data={footerData} withFore />
        </div>
      </div>
    </main>
  );
}
