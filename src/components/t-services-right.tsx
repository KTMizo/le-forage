import Image from "next/image";
export default function TServicesRight({ data, cardActive }) {
  return (
    <div className="hidden lg:grid lg:col-start-2 lg:col-span-1  relative row-span-full pt-186">
      <div className=" col-span-full row-span-full grid  sticky top-0  z-10 max-h-432 pointer-events-none">
        <div className="absolute h-[calc(100vw_-_54rem)] w-[102%] -left-1 z-0 top-432 bg-beige"></div>
      </div>

      <div className=" col-span-full row-span-full grid relative pb-100 ">
        <div className="relative h-1496 overflow-visible grid gap-y-100">
          {data.services.map((item, idx) => (
            <div
              className={`${idx == 1 ? " z-2 " : ""} ${idx == 2 ? " z-3 " : ""} top-0 sticky grid `}
              key={`${item.title.replaceAll(" ", "")}-${idx}`}
            >
              <figure className="col-span-full row-span-full ">
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
                {item.questions.map((question, id) => (
                  <div
                    className={`${
                      question.question
                        .replaceAll(" ", "")
                        .replaceAll(/[^a-zA-Z ]/g, "") == cardActive
                        ? " visible"
                        : " invisible"
                    } col-span-full grid row-span-full bg-white transition-transform
  duration-300 ease-in-out
 p-20  gap-y-24 items-start content-start  grid-cols-8  gap-x-8`}
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
