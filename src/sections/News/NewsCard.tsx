import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types/modules/news";
import { formatNewsDate } from "./date";
import styles from "./News.module.css";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/actualites/${article.uid}`} className={styles.card}>
      <div className={styles.cardImage}>
        {article.cover && (
          <Image
            src={article.cover.url}
            alt={article.cover.alt || article.title}
            width={article.cover.width}
            height={article.cover.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        )}
      </div>
      <time className={styles.date} dateTime={article.date}>
        {formatNewsDate(article.date)}
      </time>
      <h2 className={styles.cardTitle}>{article.title}</h2>
      {article.excerpt && <p className={styles.cardExcerpt}>{article.excerpt}</p>}
    </Link>
  );
}
