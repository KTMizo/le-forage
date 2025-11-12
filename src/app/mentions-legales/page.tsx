export const dynamic = 'force-dynamic';
export const revalidate = 60 * 60;


// app/mentions-legales/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { getPage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Informations juridiques et réglementaires",
};

interface SectionProps {
  number: string;
  title: string;
  content: string;
  id: string;
}

interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isLast?: boolean;
}

const ChevronIcon = () => (
  <svg
    className={styles.breadcrumbSeparator}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const BreadcrumbItem = ({
  label,
  href,
  isLast = false,
}: BreadcrumbItemProps) => (
  <li className={styles.breadcrumbItem}>
    {href ? (
      <Link href={href} className={styles.breadcrumbLink}>
        {label}
      </Link>
    ) : (
      <span className={isLast ? styles.breadcrumbCurrent : ""}>{label}</span>
    )}
    {!isLast && <ChevronIcon />}
  </li>
);

const Breadcrumb = () => (
  <nav aria-label="Fil d'Ariane" className={styles.breadcrumb}>
    <ol className={styles.breadcrumbList}>
      <BreadcrumbItem label="Accueil" href="/" />
      <BreadcrumbItem label="Mentions Légales" isLast />
    </ol>
  </nav>
);

const TableOfContents = ({ sections }: { sections: SectionProps[] }) => (
  <nav className={styles.tableOfContents} aria-label="Table des matières">
    <h2 className={styles.tocTitle}>Sommaire</h2>
    <ul className={styles.tocList}>
      {sections.map((section) => (
        <li key={section.id} className={styles.tocItem}>
          <a href={`#${section.id}`} className={styles.tocLink}>
            <span className={styles.tocNumber}>{section.number}</span>
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const LegalSection = ({ number, title, content, id }: SectionProps) => (
  <section id={id} className={styles.legalSection}>
    <div className={styles.sectionHeader}>
      <span className={styles.sectionNumber}>{number}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
    <div className={styles.sectionContent}>
      <p className={styles.sectionText}>{content}</p>
    </div>
  </section>
);

const ScrollToTop = () => (
  <a href="#top" className={styles.scrollToTop} aria-label="Retour en haut">
    <ArrowUpIcon />
  </a>
);

// [Tous les autres composants restent identiques]

export default async function MentionsLegalesPage() {
  try {
    const pageData = await getPage("mentions-legales");

    // Ajout d'une vérification sécurisée
    const sections: SectionProps[] =
      pageData.acf?.sections?.map((section, index) => ({
        id: section.title.toLowerCase().replace(/\s+/g, "-"),
        number: String(index + 1).padStart(2, "0"),
        title: section.title,
        content: section.content,
      })) || [];

    return (
      <div className={styles.legalPage} id="top">
        <header className={styles.header}>
          <div className={styles.container}>
            <Breadcrumb />
            <div className={styles.headerContent}>
              <h1 className={styles.headerTitle}>{pageData.title.rendered}</h1>
              <p className={styles.headerSubtitle}>{pageData.acf.subtitle}</p>
            </div>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.layout}>
              <aside className={styles.sidebar}>
                {sections.length > 0 && <TableOfContents sections={sections} />}
              </aside>
              <div className={styles.legalSections}>
                {sections.map((section) => (
                  <LegalSection key={section.id} {...section} />
                ))}
              </div>
            </div>
          </div>
        </main>

        <ScrollToTop />
      </div>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    return (
      <div className={styles.errorContainer}>
        <h1>Une erreur est survenue</h1>
        <p>Impossible de charger les mentions légales pour le moment.</p>
      </div>
    );
  }
}
