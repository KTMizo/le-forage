// components/Cards/MachineCard/MachineCard.tsx
import Image from "next/image";
import styles from "./MachineCard.module.css";
import Button from "@/components/ui/Button";

interface MachineCardProps {
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  title: string;
  technicalSheetUrl: string;
}

const MachineCard = ({ image, title, technicalSheetUrl }: MachineCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width || 520}
          height={image.height || 520}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <Button variant="primary" href={technicalSheetUrl}>
          Télécharger la fiche technique
        </Button>
      </div>
    </div>
  );
};

export default MachineCard;
