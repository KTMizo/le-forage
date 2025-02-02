// app/protection-donnees/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Protection des Données",
  description: "Notre politique de protection des données personnelles",
};

interface SectionProps {
  number: string;
  title: string;
  content: string;
  id: string;
  list?: string[];
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
      <BreadcrumbItem label="Protection des Données" isLast />
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

const LegalSection = ({ number, title, content, id, list }: SectionProps) => (
  <section id={id} className={styles.legalSection}>
    <div className={styles.sectionHeader}>
      <span className={styles.sectionNumber}>{number}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
    <div className={styles.sectionContent}>
      <p className={styles.sectionText}>{content}</p>
      {list && (
        <ul className={styles.sectionList}>
          {list.map((item, index) => (
            <li key={index} className={styles.sectionListItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

const ScrollToTop = () => (
  <a href="#top" className={styles.scrollToTop} aria-label="Retour en haut">
    <ArrowUpIcon />
  </a>
);

export default function ProtectionDonneesPage() {
  const sections: SectionProps[] = [
    {
      id: "collecte",
      number: "01",
      title: "Collecte des données personnelles",
      content:
        "Les données personnelles collectées sur ce site sont uniquement destinées à un usage interne. En aucun cas ces données ne seront cédées ou vendues à des tiers. Conformément à la loi \"Informatique et Libertés\" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de modification et de suppression des données qui vous concernent.",
    },
    {
      id: "utilisation",
      number: "02",
      title: "Utilisation des données",
      content:
        "Les informations recueillies font l'objet d'un traitement informatique destiné à [préciser la finalité du traitement]. Les destinataires des données sont : [préciser les destinataires].",
    },
    {
      id: "cookies",
      number: "03",
      title: "Cookies",
      content:
        "Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez paramétrer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne plus être accessibles.",
    },
    {
      id: "securite",
      number: "04",
      title: "Sécurité",
      content:
        "Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles contre toute accès non autorisé, modification, divulgation ou destruction.",
    },
    {
      id: "droits",
      number: "05",
      title: "Vos droits",
      content:
        "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :",
      list: [
        "Droit d'accès",
        "Droit de rectification",
        "Droit à l'effacement",
        "Droit à la limitation du traitement",
        "Droit à la portabilité",
        "Droit d'opposition",
      ],
    },
    {
      id: "contact",
      number: "06",
      title: "Contact",
      content:
        "Pour exercer vos droits ou pour toute question relative à la protection de vos données personnelles, vous pouvez nous contacter à l'adresse suivante : [email du DPO/responsable données]",
    },
  ];

  return (
    <div className={styles.legalPage} id="top">
      <header className={styles.header}>
        <div className={styles.container}>
          <Breadcrumb />
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Protection des Données</h1>
            <p className={styles.headerSubtitle}>
              Notre politique de protection des données personnelles
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
