// components/Cards/MachineCard/MachineCard.tsx
import Image from "next/image";
import styles from "./MachineCard.module.css";
import Button from "@/components/UI/Button";
import type { MachineItem } from "@/types/modules/machine";

type MachineCardProps = {
  image: MachineItem["image"];
  title: string;
  technical_sheet: string;
  boutton: MachineItem["boutton"];
};

const MachineCard = ({
  image,
  title,
  technical_sheet,
  boutton,
}: MachineCardProps) => {
  // Ensure href is always a string
  const href = typeof technical_sheet === "string" ? technical_sheet : "#";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width || 520}
          height={image.height || 520}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <Button
          target="_blank"
          variant={boutton.variant}
          href={href}
          showArrow={boutton.showArrow}>
          {boutton.text}
        </Button>
      </div>
    </div>
  );
};

export default MachineCard;
