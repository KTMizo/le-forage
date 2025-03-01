"use client";

import { ReactNode, useRef, useEffect } from "react";

interface InfiniteWrapperProps {
  children: ReactNode;
}

const InfiniteWrapper = ({ children }: InfiniteWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fonction pour gérer le défilement infini
    const handleInfiniteScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // Si nous sommes près du bas du document
      if (scrollPosition + windowHeight > documentHeight - 100) {
        // On peut implémenter ici le chargement de contenu supplémentaire
        // ou toute autre logique nécessaire pour le défilement infini
      }
    };

    // Écouter l'événement de défilement avec un throttle pour de meilleures performances
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleInfiniteScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="infinite-wrapper"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}>
      {children}
    </div>
  );
};

export default InfiniteWrapper;
