// app/protection-donnees/page.tsx
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Protection des Données",
  description: "Notre politique de protection des données personnelles",
};

export default function ProtectionDonneesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>Protection des Données</h1>
        </div>

        <div className={styles.cardContent}>
          <section className={styles.section}>
            <h2>1. Collecte des données personnelles</h2>
            <p>
              Les données personnelles collectées sur ce site sont uniquement
              destinées à un usage interne. En aucun cas ces données ne seront
              cédées ou vendues à des tiers. Conformément à la loi
              &quot;Informatique et Libertés&quot; du 6 janvier 1978 modifiée,
              vous disposez d&apos;un droit d&apos;accès, de modification et de
              suppression des données qui vous concernent.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Utilisation des données</h2>
            <p>
              Les informations recueillies font l&apos;objet d&apos;un
              traitement informatique destiné à [préciser la finalité du
              traitement]. Les destinataires des données sont : [préciser les
              destinataires].
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience de
              navigation. Vous pouvez paramétrer votre navigateur pour refuser
              les cookies, mais certaines fonctionnalités du site pourraient ne
              plus être accessibles.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Sécurité</h2>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et
              organisationnelles appropriées pour assurer la sécurité de vos
              données personnelles contre toute accès non autorisé,
              modification, divulgation ou destruction.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez des droits suivants concernant vos données
              personnelles :
            </p>
            <ul className={styles.list}>
              <li>Droit d&apos;accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Contact</h2>
            <p>
              Pour exercer vos droits ou pour toute question relative à la
              protection de vos données personnelles, vous pouvez nous contacter
              à l&apos;adresse suivante : [email du DPO/responsable données]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
