import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import Button from "@/components/UI/Button";
import { getFooterData, getNewsArticle, getNewsArticles } from "@/lib/prismic";
import { formatNewsDate } from "@/sections/News/date";
import styles from "@/sections/News/News.module.css";

export const revalidate = 3600;

const SITE_URL = "https://www.leforage.fr";

type Params = { params: Promise<{ uid: string }> };

export async function generateStaticParams() {
  return (await getNewsArticles()).map((a) => ({ uid: a.uid }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getNewsArticle((await params).uid);
  if (!article) return {};
  return {
    title: `${article.metaTitle} | Le Forage`,
    description: article.metaDescription,
    alternates: { canonical: `/actualites/${article.uid}` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.date,
      images: article.cover ? [{ url: article.cover.url }] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: Params) {
  const { uid } = await params;
  const [article, footerData] = await Promise.all([getNewsArticle(uid), getFooterData()]);
  if (!article) notFound();

  // Données structurées : Google comprend qu'il s'agit d'un article daté de l'entreprise
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    description: article.metaDescription,
    image: [article.cover, ...article.gallery].filter(Boolean).map((img) => img!.url),
    mainEntityOfPage: `${SITE_URL}/actualites/${article.uid}`,
    author: { "@type": "Organization", name: "Le Forage", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Le Forage", url: SITE_URL },
    ...(article.linkedinUrl ? { sameAs: article.linkedinUrl } : {}),
  };

  const images = [article.cover, ...article.gallery].filter(
    (img): img is NonNullable<typeof img> => img !== null,
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <div id="page-content">
        <article data-theme="beige" className={`${styles.page} ${styles.article}`}>
          <div className={styles.media}>
            {images.map((img, i) => (
              <Image
                key={img.url}
                src={img.url}
                alt={img.alt || article.title}
                width={img.width}
                height={img.height}
                priority={i === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            ))}
          </div>
          <div className={styles.text}>
            <p className="text-tag lg:text-desk-tag uppercase font-bebas text-bleu">
              Actualités ·{" "}
              <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
            </p>
            <h1 className="font-articulate text-xl lg:text-desk-m text-red">{article.title}</h1>
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: article.contentHTML }} />
            <div className={styles.links}>
              {article.linkedinUrl && (
                <Button variant="blue" href={article.linkedinUrl} target="_blank" showArrow>
                  Voir le post LinkedIn
                </Button>
              )}
              <Button variant="accent-outline" href="/actualites">
                Toutes les actualités
              </Button>
            </div>
          </div>
        </article>
        <div className="bg-red">
          <Footer data={footerData} withFore />
        </div>
      </div>
    </main>
  );
}
