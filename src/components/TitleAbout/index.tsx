import type { TitleAboutData } from "@/types/modules/titleAbout";
import RevealText from "@/components/UI/RevealText";

export default function TitleAbout({ subtitle, highlight, mainText }: TitleAboutData) {
  return (
    <div className="grid gap-y-8 lg:grid-cols-[auto_1fr] lg:gap-x-40">
      <RevealText
        as="h3"
        className="text-tag lg:text-desk-tag uppercase font-bebas text-bleu"
      >
        {subtitle}
      </RevealText>
      <RevealText className="text-black font-articulate text-m lg:text-desk-m lg:indent-[9.375rem] lg:max-w-657">
        <span className="text-red">{highlight}</span> {mainText}
      </RevealText>
    </div>
  );
}
