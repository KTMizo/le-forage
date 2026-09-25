"use client";
import type { FaqSectionProps } from "@/types/modules/faq";
import AccordionItem from "@/components/UI/Accordion";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import RevealText from "@/components/UI/RevealText";
export default function TFAQ({ data }: FaqSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    const currentElement = imageWrapperRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);
  return (
    <section
      id="faq"
      data-theme="beige"
      className="grid lg:grid-rows-[auto_auto] lg:grid-cols-[26.5rem_minmax(0,1fr)] lg:gap-x-84 gap-y-16 px-8 lg:px-40 py-20  lg:pb-40 lg:pt-56"
    >
      <div className="lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-1">
        <RevealText className="text-tag lg:text-desk-tag uppercase font-bebas text-bleu">
          {data.faq_title}
        </RevealText>
      </div>
      <div className="lg:col-start-2 lg:col-span-1 lg:row-span-full">
        {data.faq_items.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            isLast={index + 1 === data.faq_items.length}
          >
            <div
              className="t-rich lg:text-18 lg:leading-12"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </AccordionItem>
        ))}
      </div>
      <figure
        ref={imageWrapperRef}
        className={`t-image-clip-path lg:col-start-1 lg:col-span-1 lg:max-w-212 lg:aspect-[425_/_592] lg:row-start-2 lg:row-span-1 w-full overflow-hidden aspect-[342_/_420] grid ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <Image
          src={data.faq_cover_image}
          alt={data.faq_title}
          width={342}
          height={420}
          className="w-full h-full aspect-[342_/_420]  lg:aspect-[425_/_592] object-cover"
        />
      </figure>
    </section>
  );
}
