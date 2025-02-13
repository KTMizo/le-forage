// app/not-found.tsx
import styles from "./not-found.module.css";
import Button from "@/components/UI/Button";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Alors, on s&apos;est perdu ?</h1>
        <h2 className={styles.subtitle}>Page Non Trouvée</h2>
        <p className={styles.description}>
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>
        <Button variant="primary" href="/" showArrow>
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
