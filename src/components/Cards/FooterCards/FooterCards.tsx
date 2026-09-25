"use client";
import styles from "./FooterCards.module.css";
import Button from "@/components/UI/Button";
import RevealText from "@/components/UI/RevealText";
import type { ButtonVariant } from "@/types/modules/footer";
import { QUOTE_PAGE, ADDRESS_URL } from "@/lib/site";

interface FooterCardsProps {
  title: string;
  button: {
    variant: ButtonVariant;
    url: string;
    showArrow: boolean;
    text: string;
  };
}

export default function FooterCards({ title, button }: FooterCardsProps) {
  return (
    <div className="w-full">
      <div className="relative grid grid-cols-8 gap-y-12 bg-beige py-12 lg:h-250 lg:max-w-657 lg:gap-y-22 lg:pt-71 lg:pb-73">
        <div className={styles.corner} id={styles.topLeft}></div>
        <div className={styles.corner} id={styles.topRight}></div>
        <div className={styles.corner} id={styles.bottomLeft}></div>
        <div className={styles.corner} id={styles.bottomRight}></div>
        <RevealText className="col-span-7 col-start-1 pl-12 font-articulate text-24 leading-18 lg:min-h-60 lg:max-w-510 lg:pl-37 lg:text-48 lg:leading-30">
          {title}
        </RevealText>
        <div className="col-span-6 col-start-1 grid gap-8 pl-12 lg:flex lg:pl-37">
          <Button
            variant={button.variant}
            href={QUOTE_PAGE}
            showArrow={button.showArrow}
          >
            {button.text}
          </Button>
          <Button
            variant="blue"
            href={ADDRESS_URL}
            target="_blank"
            showMap={button.showArrow}
          >
            Notre adresse
          </Button>
        </div>
      </div>
    </div>
  );
}
