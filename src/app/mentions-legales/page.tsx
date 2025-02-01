// app/mentions-legales/page.tsx
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales et informations juridiques",
};

export default function MentionsLegalesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>Mentions Légales</h1>
        </div>

        <div className={styles.cardContent}>
          <section className={styles.section}>
            <h2>1. Informations légales</h2>
            <p>
              [Nom de la société]
              <br />
              [Forme juridique]
              <br />
              [Adresse du siège social]
              <br />
              [Numéro RCS]
              <br />
              [Capital social]
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Hébergeur</h2>
            <p>
              [Nom de l&apos;hébergeur]
              <br />
              [Adresse de l&apos;hébergeur]
              <br />
              [Contact hébergeur]
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Directeur de la publication</h2>
            <p>
              [Nom du directeur]
              <br />
              [Contact]
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble de ce site relève de la législation française et
              internationale sur le droit d&apos;auteur et la propriété
              intellectuelle. Tous les droits de reproduction sont réservés, y
              compris pour les documents téléchargeables et les représentations
              iconographiques et photographiques.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Liens hypertextes</h2>
            <p>
              La création de liens hypertextes vers le site est soumise à
              l&apos;accord préalable du Directeur de la publication. Les liens
              hypertextes établis en direction d&apos;autres sites à partir de
              ce site ne sauraient en aucun cas engager la responsabilité de
              [Nom de la société].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
