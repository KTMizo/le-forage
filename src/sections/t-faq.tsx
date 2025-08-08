"use client";
import { FaqSectionProps, ACFFaqItem } from "@/types/modules/faq";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import ListAsk from "@/components/ListAsk";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
export default function TFAQ({ data }: FaqSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("null");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  function handleToggle(id) {
    setId(id);
  }

  useEffect(() => {
    if (titleRef.current) {
      // Split et anime le titre
      const splitTitle = new SplitType(titleRef.current, {
        types: "lines",
        lineClass: "animated-line",
      });

      gsap.fromTo(
        titleRef.current.querySelectorAll(".animated-line"),
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      return () => {
        splitTitle.revert();
      };
    }
  }, []);

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
    <section className="grid lg:grid-rows-[auto_auto] lg:grid-cols-[auto_/_1fr] lg:gap-x-84 gap-y-16 px-8 lg:px-40 py-20  lg:pb-40 lg:pt-56">
      <div className="lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-1">
        <h2
          ref={titleRef}
          className="text-tag  lg:text-desk-tag uppercase font-bebas text-bleu"
        >
          {data.faq_title}
        </h2>
      </div>
      <div className="lg:col-start-2 lg:col-span-1 lg:row-span-full">
        {data.faq_items.map((item, index) => (
          <div
            className={`border-t border-black-10 t-accordeon ${id == item.question ? "is-open" : ""} ${index + 1 === data.faq_items.length ? "border-b" : ""}`}
            key={index}
          >
            <button
              onClick={() => handleToggle(`${item.question}`)}
              className={`t-accordeon-head flex cursor-pointer py-12 lg:py-18 justify-between items-center w-full `}
            >
              <span
                className={` ${id == item.question ? "text-bleu" : ""} font-articulate max-w-150 lg:max-w-245 text-m text-left text-16 lg:text-desk-s  leading-11`}
              >
                {item.question}
              </span>
              <span className="lg:flex lg:items-center lg:gap-x-9">
                {id == item.question ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-[1px]"
                    viewBox="0 0 16 2"
                    fill="none"
                  >
                    <path d="M0 1L16 1" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7 plus"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 18"
                    fill="none"
                  >
                    <path
                      d="M0 9.00052L16 9.00051M8 17.1485L8 0.852539"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}

                <span className="hidden lg:inline-grid font-articulate text-18 leading-12">
                  {id == item.question ? (
                    <span>Lire moins</span>
                  ) : (
                    <span>Lire plus</span>
                  )}
                </span>
              </span>
            </button>
            <div
              className={`${id == item.question ? "is-open" : ""} t-accordeon-body lg:text-18 lg:leading-12 z-10 relative overflow-hidden max-h-0`}
            >
              {item.answer}
            </div>
          </div>
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
