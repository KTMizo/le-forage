import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import RevealText from "@/components/UI/RevealText";
import NewsCard from "@/sections/News/NewsCard";
import { getFooterData, getNewsArticles } from "@/lib/prismic";
import styles from "@/sections/News/News.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Actualités | Le Forage",
  description:
    "Chantiers, sondages géotechniques et environnementaux, nouvelles machines : les dernières actualités de Le Forage.",
  alternates: { canonical: "/actualites" },
};

export default async function NewsPage() {
  const [articles, footerData] = await Promise.all([getNewsArticles(), getFooterData()]);

  return (
    <main>
      <Header />
      <div id="page-content">
        <section data-theme="beige" className={styles.page}>
          <div className={styles.intro}>
            <RevealText as="p" className="text-tag lg:text-desk-tag uppercase font-bebas text-bleu">
              Actualités
            </RevealText>
            <RevealText as="h1" className="font-articulate text-xl lg:text-desk-xl text-red">
              Nos derniers chantiers
            </RevealText>
          </div>
          {articles.length ? (
            <div className={styles.list}>
              {articles.map((article) => (
                <NewsCard key={article.uid} article={article} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Les premières actualités arrivent bientôt.</p>
          )}
        </section>
        <div className="bg-red">
          <Footer data={footerData} withFore />
        </div>
      </div>
    </main>
  );
}
