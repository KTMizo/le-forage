// sections/Machine/index.tsx
import React from "react";
import styles from "./Machine.module.css";
import MachineCard from "@/components/Cards/MachineCard/MachineCard";

const Machine = () => {
  return (
    <section className={styles.machineSection}>
      <div className={styles.machineContainer}>
        <div className={styles.machineCards}>
          <MachineCard
            image={{
              src: "/assets/images/machines/machinetest.png",
              alt: "Machine de forage E 4.50",
              width: 520,
              height: 718,
            }}
            title="E 4.50 - Machine de forage"
            technicalSheetUrl="/fiches-techniques/e450.pdf"
          />
          <MachineCard
            image={{
              src: "/assets/images/machines/machinetest.png",
              alt: "DPM 30 - Pénétromètre",
              width: 520,
              height: 718,
            }}
            title="E 4.50 - Machine de forage"
            technicalSheetUrl="/fiches-techniques/e450.pdf"
          />
          <MachineCard
            image={{
              src: "/assets/images/machines/machinetest.png",
              alt: "Machine de forage E 4.50",
              width: 520,
              height: 718,
            }}
            title="E 4.50 - Machine de forage"
            technicalSheetUrl="/fiches-techniques/e450.pdf"
          />
        </div>
      </div>
    </section>
  );
};

export default Machine;
