import React from "react";
import styles from "./grid.module.css";

const Grid = () => {
  // Crée un tableau de 24 colonnes
  const columns = Array.from({ length: 24 });

  return (
    <div className={styles.gridBackground}>
      {columns.map((_, index) => (
        <div key={index} className={styles.gridColumn} />
      ))}
    </div>
  );
};

export default Grid;
