import RevealText from "@/components/UI/RevealText";
import ContactForm from "./ContactForm";
import { ADDRESS_URL, COMPANY, CONTACT_EMAIL } from "@/lib/site";
import styles from "./Contact.module.css";

export default function Contact({ initialSubject }: { initialSubject?: string }) {
  const phoneHref = COMPANY.phone ? `tel:${COMPANY.phone.replace(/[^+0-9]/g, "")}` : "";

  return (
    <section id="contact" data-theme="beige" className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <RevealText as="p" className="text-tag lg:text-desk-tag uppercase font-bebas text-bleu">
            Contact
          </RevealText>
          <RevealText
            as="h1"
            className="font-articulate text-xl lg:text-desk-xl text-red"
          >
            Parlons de votre projet
          </RevealText>
          <p className="font-articulate text-16 lg:text-desk-s max-w-[40rem]">
            Une demande de devis, une question sur une prestation ou une candidature :
            remplissez le formulaire, nous revenons vers vous rapidement.
          </p>
        </div>

        <dl className={styles.infos}>
          <div className={styles.info}>
            <dt className={styles.infoLabel}>E-mail</dt>
            <dd>
              <a className={styles.infoValue} href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </dd>
          </div>
          {COMPANY.phone && (
            <div className={styles.info}>
              <dt className={styles.infoLabel}>Téléphone</dt>
              <dd>
                <a className={styles.infoValue} href={phoneHref}>
                  {COMPANY.phone}
                </a>
              </dd>
            </div>
          )}
          <div className={styles.info}>
            <dt className={styles.infoLabel}>Adresse</dt>
            <dd>
              <a
                className={styles.infoValue}
                href={ADDRESS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {COMPANY.address || "Voir sur Google Maps"}
              </a>
            </dd>
          </div>
          {COMPANY.hours && (
            <div className={styles.info}>
              <dt className={styles.infoLabel}>Horaires</dt>
              <dd className={styles.infoValue}>{COMPANY.hours}</dd>
            </div>
          )}
        </dl>

        <ContactForm initialSubject={initialSubject} />
      </div>
    </section>
  );
}
