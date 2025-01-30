// ImageBreak/index.tsx
import React from "react";
import Image from "next/image";
import styles from "./ImageBreak.module.css";

const ImageBreak = () => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        className={styles.image}
        src="/assets/images/hero-cover.jpg"
        alt="Le Forage"
        width={1920} // Ajustez selon vos besoins
        height={1080} // Ajustez selon vos besoins
        priority // Pour LCP (Largest Contentful Paint)
        quality={85} // Équilibre entre qualité et performance
      />
    </div>
  );
};

export default ImageBreak;
