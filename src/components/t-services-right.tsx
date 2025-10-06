import Image from "next/image";
import { useEffect, useRef } from "react";
export default function TServicesRight({
  data,
  cardActive,
  setCardActive,
}: {
  data: any;
  cardActive: any;
  setCardActive: any;
}) {
  function extractQuestionsWithItemTitle(data: any) {
    const questionsWithItemTitle: any = [];

    data.forEach((obj: any) => {
      const itemTitle = obj.title;
      obj.questions.forEach((question: any) => {
        questionsWithItemTitle.push({
          ...question,
          itemTitle: itemTitle,
        });
      });
    });

    return questionsWithItemTitle;
  }

  function handlePrev() {
    const allQuestions = extractQuestionsWithItemTitle(data.services);

    const currentIndex = allQuestions.findIndex(
      (q: any) =>
        q.question.replaceAll(" ", "").replaceAll(/[^a-zA-Z ]/g, "") ===
        cardActive,
    );

    if (currentIndex !== 0) {
      const currentParent = allQuestions[currentIndex].itemTitle
        .replaceAll(" ", "")
        .replaceAll(/[^a-zA-Z ]/g, "");
      const prevParent = allQuestions[currentIndex - 1].itemTitle
        .replaceAll(" ", "")
        .replaceAll(/[^a-zA-Z ]/g, "");
      if (currentParent !== prevParent) {
        const elParent = document.querySelector(`#${prevParent}`);
        //@ts-ignore
        window.lenis.scrollTo(elParent, {
          offset: -20,
        });
      }
      setCardActive(
        allQuestions[currentIndex - 1].question
          .replaceAll(" ", "")
          .replaceAll(/[^a-zA-Z ]/g, ""),
      );
    } else {
      setCardActive("null");
    }
  }
  function handleNext() {
    const allQuestions = extractQuestionsWithItemTitle(data.services);

    const currentIndex = allQuestions.findIndex(
      (q: any) =>
        q.question.replaceAll(" ", "").replaceAll(/[^a-zA-Z ]/g, "") ===
        cardActive,
    );

    if (currentIndex !== allQuestions.length - 1) {
      const currentParent = allQuestions[currentIndex].itemTitle
        .replaceAll(" ", "")
        .replaceAll(/[^a-zA-Z ]/g, "");
      const nextParent = allQuestions[currentIndex + 1].itemTitle
        .replaceAll(" ", "")
        .replaceAll(/[^a-zA-Z ]/g, "");
      if (currentParent !== nextParent) {
        const elParent = document.querySelector(`#${nextParent}`);
        //@ts-ignore
        window.lenis.scrollTo(elParent, {
          offset: -20,
        });
      }
      setCardActive(
        allQuestions[currentIndex + 1].question
          .replaceAll(" ", "")
          .replaceAll(/[^a-zA-Z ]/g, ""),
      );
    } else {
      setCardActive("null");
    }
  }
  return (
    <div className="hidden lg:grid lg:col-start-2 lg:col-span-1  relative row-span-full pt-186">
      <div className=" col-span-full row-span-full grid  sticky top-[calc((100vh_-_54rem)_/_2)] z-10 max-h-432 pointer-events-none">
        <div className="absolute h-[calc(100vw_-_54rem)] w-[102%] -left-1 z-0 top-432 bg-beige"></div>
      </div>

      <div className=" col-span-full row-span-full grid relative pb-100 ">
        <div className="relative h-1496 overflow-visible grid gap-y-100">
          {data.services.map((item: any, idx: any) => (
            <div
              className={`${idx == 1 ? " z-2 " : ""} ${idx == 2 ? " z-3 " : ""} top-[calc((100vh_-_54rem)_/_2)] sticky grid image-services`}
              key={`${item.title.replaceAll(" ", "")}-${idx}`}
            >
              <figure className="col-span-full row-span-full overflow-hidden">
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className={`aspect-[691_/_864]  w-full h-full max-h-432 object-cover`}
                  quality={85}
                />
              </figure>
              <div className="col-span-full overflow-hidden  row-span-full grid">
                {item.questions.map((question: any, id: any) => (
                  <div
                    className={`${
                      question.question
                        .replaceAll(" ", "")
                        .replaceAll(/[^a-zA-Z ]/g, "") == cardActive
                        ? " visible"
                        : " invisible"
                    } col-span-full grid row-span-full z-10 bg-white transition-transform
  duration-300 ease-in-out
 p-20  gap-y-24 items-start content-start  grid-cols-8 relative  gap-x-8`}
                    key={`${question.question.replaceAll(" ", "")}-${id}`}
                  >
                    <div
                      className={`${
                        question.question
                          .replaceAll(" ", "")
                          .replaceAll(/[^a-zA-Z ]/g, "") == cardActive
                          ? " translate-y-0 opacity-100 pointer-events-auto"
                          : " translate-y-10 opacity-0 pointer-events-none"
                      } col-span-full grid row-span-full bg-white transition-transform
                        duration-300 ease-in-out
                      p-20  gap-y-24 items-start content-start  grid-cols-8  gap-x-8`}
                    >
                      {question?.image ? (
                        <div className="flex gap-x-16">
                          <figure className="col-start-1 col-span-4">
                            <Image
                              className="aspect-square min-w-130 object-cover"
                              src={question?.image.url}
                              alt={question?.image.alt}
                              width={question?.image.width}
                              height={question?.image.height}
                              quality={85}
                            />
                          </figure>
                          {question?.question ? (
                            <span className="font-articulate self-end text-l text-bleu">
                              {question.question}
                            </span>
                          ) : null}
                        </div>
                      ) : (
                        <div className="grid grid-cols-[1fr_auto] gap-x-16">
                          <div className="w-130 h-130"></div>
                          {question?.question ? (
                            <span className="font-articulate self-end text-l text-bleu">
                              {question.question}
                            </span>
                          ) : null}
                        </div>
                      )}
                      <div className="grid gap-y-8 col-span-full">
                        {question?.zone_de_texte ? (
                          <div
                            className="font-articulate text-22"
                            dangerouslySetInnerHTML={{
                              __html: question?.zone_de_texte,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="absolute bottom-20 left-20  self-end z-20 ">
                      <button
                        onClick={() => handlePrev()}
                        className="p-8 cursor-pointer bg-bleu"
                      >
                        <svg
                          className="w-9"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.17773 4.94727L2.62523 9.49977L7.17773 14.0523"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.375 9.5H2.7525"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleNext()}
                        className="p-8 cursor-pointer bg-bleu"
                      >
                        <svg
                          className="w-9"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8223 4.94727L15.3748 9.49977L10.8223 14.0523"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.625 9.5H15.2475"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
