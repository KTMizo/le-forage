import React from "react";
import Image from "next/image";
import styles from "./ImageBreak.module.css";

interface ImageBreakProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
}

const ImageBreak: React.FC<ImageBreakProps> = ({
  src,
  alt,
  width = 1920,
  height = 1080,
  quality = 85,
  priority = false,
}) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
      />
    </div>
  );
};

export default ImageBreak;
