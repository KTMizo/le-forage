// app/mentions-legales/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

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

export default function MentionsLegalesPage() {
  const sections: SectionProps[] = [
    {
      id: "informations",
      number: "01",
      title: "Informations légales",
      content: `[Nom de la société]
[Forme juridique]
[Adresse du siège social]
[Numéro RCS]
[Capital social]`,
    },
    {
      id: "hebergeur",
      number: "02",
      title: "Hébergeur",
      content: `[Nom de l'hébergeur]
[Adresse de l'hébergeur]
[Contact hébergeur]`,
    },
    {
      id: "direction",
      number: "03",
      title: "Direction de la publication",
      content: `[Nom du directeur]
[Contact]`,
    },
    {
      id: "propriete",
      number: "04",
      title: "Propriété intellectuelle",
      content:
        "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.",
    },
    {
      id: "liens",
      number: "05",
      title: "Liens hypertextes",
      content:
        "La création de liens hypertextes vers le site est soumise à l'accord préalable du Directeur de la publication. Les liens hypertextes établis en direction d'autres sites à partir de ce site ne sauraient en aucun cas engager la responsabilité de [Nom de la société].",
    },
  ];

  return (
    <div className={styles.legalPage} id="top">
      <header className={styles.header}>
        <div className={styles.container}>
          <Breadcrumb />
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Mentions Légales</h1>
            <p className={styles.headerSubtitle}>
              Informations juridiques et réglementaires
            </p>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <TableOfContents sections={sections} />
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
}
