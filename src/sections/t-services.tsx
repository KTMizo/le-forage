"use client";
import type { ServicesSection } from "@/types/modules/services";
import { useState } from "react";
import Image from "next/image";
import TServicesLine from "@/components/t-services-line";
import TServicesRight from "@/components/t-services-right";
interface ServicesProps {
  data: any;
}
export default function TServices({ data }: ServicesProps) {
  const [popinOpen, setPopinOpen] = useState(false);
  const [cardActive, setCardActive] = useState(null);

  function handleDesktop(parent: any, id: any) {
    const elParent = document.querySelector(`#${parent}`);
    //@ts-ignore
    window.lenis.scrollTo(elParent, {
      offset: 10,
    });
    if (cardActive == id) {
      setCardActive(null);
    } else {
      setCardActive(id);
    }
  }
  function handlePopinClick(id: any) {
    setPopinOpen(!popinOpen);

    if (!popinOpen) {
      //@ts-ignore
      window.lenis.stop();
    } else {
      //@ts-ignore
      window.lenis.start();
    }
    setCardActive(id);
  }

  return (
    <section className="px-8 grid-cols-8 gap-x-4 lg:grid-cols-2  lg:gap-x-136 py-20 grid gap-y-20 lg:px-40 lg:gap-y-96 lg:py-44">
      <div className="col-start-1 col-span-7 lg:col-span-1 lg:col-start-1 row-span-full">
        <div className="grid gap-y-8 lg:gap-y-36 ">
          <div className="lg:h-143">
            <h2 className="text-tag lg:sticky lg:top-113  lg:text-desk-tag uppercase font-bebas text-bleu">
              {data.services_title}
            </h2>
          </div>

          <div className="grid gap-y-28 lg:gap-y-100">
            {data.services.map((item: any, idx: any) => (
              <div
                id={item.title
                  .replaceAll(" ", "")
                  .replaceAll(/[^a-zA-Z ]/g, "")}
                key={idx}
              >
                <div className="grid gap-y-16 lg:gap-y-36 lg:min-h-432 content-start">
                  <h3 className="text-xl lg:text-desk-xl text-red font-articulate">
                    {item.title}
                  </h3>
                  <div>
                    {item.questions.map((question: any, id: any) => (
                      <div
                        className={`t-accordeon ${
                          cardActive ==
                          question.question
                            .replaceAll(" ", "")
                            .replaceAll(/[^a-zA-Z ]/g, "")
                            ? "is-open"
                            : ""
                        }`}
                        key={`${question.question.replaceAll(" ", "")}-${id}`}
                      >
                        <button
                          data-id={`${question.question.replaceAll(" ", "")}-${id}`}
                          onClick={() =>
                            handlePopinClick(
                              `${question.question.replaceAll(" ", "")}-${id}`,
                            )
                          }
                          className={` lg:hidden flex cursor-pointer py-12 lg:py-18 justify-between w-full border-t border-black-10 ${id + 1 === item.questions.length ? "border-b" : ""}`}
                        >
                          <span className="font-articulate text-m text-16 lg:text-desk-s  leading-11">
                            {question.question}
                          </span>
                          <span className="lg:flex lg:items-center lg:gap-x-9">
                            {cardActive ==
                            question.question
                              .replaceAll(" ", "")
                              .replaceAll(/[^a-zA-Z ]/g, "") ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-[1px]"
                                viewBox="0 0 16 2"
                                fill="none"
                              >
                                <path
                                  d="M0 1L16 1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
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
                              {cardActive ==
                              question.question
                                .replaceAll(" ", "")
                                .replaceAll(/[^a-zA-Z ]/g, "") ? (
                                <span>Lire moins</span>
                              ) : (
                                <span>Lire plus</span>
                              )}
                            </span>
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            handleDesktop(
                              item.title
                                .replaceAll(" ", "")
                                .replaceAll(/[^a-zA-Z ]/g, ""),
                              question.question
                                .replaceAll(" ", "")
                                .replaceAll(/[^a-zA-Z ]/g, ""),
                            )
                          }
                          data-parent={item.title
                            .replaceAll(" ", "")
                            .replaceAll(/[^a-zA-Z ]/g, "")}
                          className={` t-accordeon-head hidden lg:flex cursor-pointer py-12 lg:py-18 justify-between w-full border-t border-black-10 ${id + 1 === item.questions.length ? "border-b" : ""}`}
                        >
                          <span className="font-articulate text-m text-16 lg:text-desk-s  leading-11">
                            {question.question}
                          </span>
                          <span className="lg:flex lg:items-center lg:gap-x-9">
                            {cardActive ==
                            question.question
                              .replaceAll(" ", "")
                              .replaceAll(/[^a-zA-Z ]/g, "") ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-[1px]"
                                viewBox="0 0 16 2"
                                fill="none"
                              >
                                <path
                                  d="M0 1L16 1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
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
                              {cardActive ==
                              question.question
                                .replaceAll(" ", "")
                                .replaceAll(/[^a-zA-Z ]/g, "") ? (
                                <span>Lire moins</span>
                              ) : (
                                <span>Lire plus</span>
                              )}
                            </span>
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <figure className="lg:hidden">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      quality={85}
                    />
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        id="popin-question"
        className={`${popinOpen ? "grid" : "hidden"} fixed top-0   left-0 bg-white w-full h-[100svh] z-100 overflow-hidden gap-x-4 py-16 `}
      >
        <button
          onClick={() => handlePopinClick(`null`)}
          className="col-span-full row-span-full justify-self-end z-2 self-start pr-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.34277 2.19531L7.99963 7.85217M7.99963 7.85217L13.6565 13.509M7.99963 7.85217L2.34277 13.509M7.99963 7.85217L13.6565 2.19531"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="grid col-span-full row-span-full px-8">
          {data.services.map((item: any, idx: any) => (
            <div key={`${item.title}-${idx}`}>
              <div
                id={`popin-question-section-${item.title.replaceAll(" ", "")}-${idx}`}
                className="grid col-span-full row-span-full"
              >
                <>
                  {item.questions.map((question: any, id: any) => (
                    <div
                      id={`popin-question-${question.question.replaceAll(" ", "")}-${id}`}
                      className={`${question.question.replaceAll(" ", "") + "-" + id == cardActive ? "grid" : "hidden"} col-span-full  gap-y-12 items-start content-start row-span-full grid-cols-8 grid gap-x-8`}
                      key={`${question.question.replaceAll(" ", "")}-${id}`}
                    >
                      {question?.image ? (
                        <figure className="col-start-1 col-span-4">
                          <Image
                            className="aspect-square min-w-84 object-cover"
                            src={question?.image.url}
                            alt={question?.image.alt}
                            width={question?.image.width}
                            height={question?.image.height}
                            quality={85}
                          />
                        </figure>
                      ) : (
                        <div className="w-84 h-84"></div>
                      )}
                      <div className="grid gap-y-8 col-span-full">
                        {question?.question ? (
                          <span className="font-articulate text-m text-bleu">
                            {question.question}
                          </span>
                        ) : null}
                        {question?.zone_de_texte ? (
                          <div
                            className="font-articulate text-16"
                            dangerouslySetInnerHTML={{
                              __html: question?.zone_de_texte,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TServicesLine />
      <TServicesRight data={data} cardActive={cardActive} />
    </section>
  );
}
