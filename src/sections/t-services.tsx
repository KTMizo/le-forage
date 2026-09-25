"use client";
import { useState } from "react";
import Image from "next/image";
import type { ServicesSection } from "@/types/modules/services";
import TServicesLine from "@/components/t-services-line";
import AccordionItem from "@/components/UI/Accordion";
import ParallaxImage from "@/components/UI/ParallaxImage";
import RevealText from "@/components/UI/RevealText";

interface ServicesProps {
  data: ServicesSection;
}

// Nos services : chaque expertise = titre + accordéon à gauche, image en parallax à droite.
// Sur mobile, l'image passe sous l'accordéon. Une seule question ouverte à la fois.
export default function TServices({ data }: ServicesProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section
      id="services"
      data-theme="beige"
      className="grid grid-cols-8 gap-x-4 px-8 py-20 lg:grid-cols-2 lg:gap-x-136 lg:px-40 lg:py-44"
    >
      <div className="col-span-7 col-start-1 row-span-full grid content-start gap-y-8 lg:col-span-full">
        <RevealText className="text-tag uppercase font-bebas text-bleu lg:text-desk-tag">
          {data.services_title}
        </RevealText>

        <div className="grid gap-y-28 lg:gap-y-100">
          {data.services.map((service, sIdx) => (
            <article
              key={sIdx}
              className="grid items-start gap-y-16 lg:grid-cols-2 lg:gap-x-136"
            >
              <div className="grid gap-y-16 lg:gap-y-36">
                {/* line-height retiré en haut : le haut des lettres s'aligne sur le haut de l'image */}
                <RevealText
                  as="h3"
                  className="t-trim text-xl text-red font-articulate lg:text-desk-xl"
                >
                  {service.title}
                </RevealText>
                <div>
                  {service.questions.map((q, qIdx) => {
                    const key = `${sIdx}-${qIdx}`;
                    return (
                      <AccordionItem
                        key={key}
                        question={q.question}
                        isOpen={openKey === key}
                        onToggle={() =>
                          setOpenKey(openKey === key ? null : key)
                        }
                        isLast={qIdx + 1 === service.questions.length}
                      >
                        <div className="grid grid-cols-[5rem_1fr] items-start gap-x-8 lg:grid-cols-[7.5rem_1fr] lg:gap-x-12">
                          {q.image ? (
                            <Image
                              className="aspect-square w-full object-cover"
                              src={q.image.url}
                              alt={q.image.alt}
                              width={240}
                              height={240}
                              quality={85}
                            />
                          ) : (
                            <span />
                          )}
                          {q.zone_de_texte ? (
                            <div
                              className="t-rich text-16 lg:text-18 lg:leading-12"
                              dangerouslySetInnerHTML={{
                                __html: q.zone_de_texte,
                              }}
                            />
                          ) : null}
                        </div>
                      </AccordionItem>
                    );
                  })}
                </div>
              </div>
              <ParallaxImage
                className="aspect-[691/778] w-full"
                src={service.image.url}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </article>
          ))}
        </div>
      </div>
      <TServicesLine />
    </section>
  );
}
