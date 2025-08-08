export default function TServicesItem({ question, handlePopinClick, id }) {
  return (
    <div
      className="t-accordeon"
      key={`${question.question.replaceAll(" ", "")}-${id}`}
    >
      <button
        data-id={`${question.question.replaceAll(" ", "")}-${id}`}
        onClick={() =>
          handlePopinClick(`${question.question.replaceAll(" ", "")}-${id}`)
        }
        className={` lg:hidden flex cursor-pointer py-12 lg:py-18 justify-between w-full border-t border-black-10 ${id + 1 === item.questions.length ? "border-b" : ""}`}
      >
        <span className="font-articulate text-m text-16 lg:text-desk-s  leading-11">
          {question.question}
        </span>
        <span className="lg:flex lg:items-center lg:gap-x-9">
          <svg
            className="w-8 h-9"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              d="M0 9.00052L16 9.00051M8 17.1485L8 0.852539"
              stroke="#AB2325"
              strokeWidth="2"
            />
          </svg>
          <span className="hidden lg:inline-grid font-articulate text-18 leading-12">
            Lire plus
          </span>
        </span>
      </button>
      <button
        data-id={`${question.question.replaceAll(" ", "")}-${id}`}
        className={`t-accordeon-head hidden lg:flex cursor-pointer py-12 lg:py-18 justify-between w-full border-t border-black-10 ${id + 1 === item.questions.length ? "border-b" : ""}`}
      >
        <span className="font-articulate text-m text-16 lg:text-desk-s  leading-11">
          {question.question}
        </span>
        <span className="lg:flex lg:items-center lg:gap-x-9">
          <svg
            className="w-8 h-9 plus"
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
          <span className="hidden lg:inline-grid font-articulate text-18 leading-12">
            Lire plus
          </span>
        </span>
      </button>
    </div>
  );
}
