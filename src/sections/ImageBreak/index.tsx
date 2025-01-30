import React from "react";
import styles from "./ImageBreak.module.css";

const ImageBreak = () => {
  return (
    <div className={styles.imageWrapper}>
      {/* ImageWrapper */}
      <img
        className={styles.image}
        src="/assets/images/hero-cover.jpg"
        alt="Le Forage"
      />
    </div>
  );
};

export default ImageBreak;
