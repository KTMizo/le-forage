"use client";
import type { ReactNode } from "react";

interface AccordionItemProps {
  question: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast?: boolean;
  children: ReactNode;
}

// Ligne d'accordéon commune (FAQ, Nos services) : même tête, même icône +/−,
// même « Lire plus / Lire moins », même animation d'ouverture.
export default function AccordionItem({
  question,
  isOpen,
  onToggle,
  isLast = false,
  children,
}: AccordionItemProps) {
  return (
    <div
      className={`t-accordeon border-t border-black-10 ${isOpen ? "is-open" : ""} ${isLast ? "border-b" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="t-accordeon-head flex w-full cursor-pointer items-center justify-between gap-x-8 py-12 lg:py-18"
      >
        <span className="font-articulate text-left text-16 leading-11 lg:text-desk-s">
          {question}
        </span>
        <span className="flex flex-none items-center gap-x-9">
          <svg
            className={`t-toggle w-7 h-7 ${isOpen ? "is-open" : "plus"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 8H16" stroke="currentColor" strokeWidth="2" />
            <path
              className="t-toggle-bar"
              d="M8 0V16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="hidden font-articulate text-18 leading-12 lg:inline">
            {isOpen ? "Lire moins" : "Lire plus"}
          </span>
        </span>
      </button>
      <div className="t-accordeon-body" inert={!isOpen}>
        <div className="t-accordeon-inner">{children}</div>
      </div>
    </div>
  );
}
