import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "blue"
  | "outline"
  | "outline-accent"
  | "accent-outline";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  showMap?: boolean;
  onClick?: () => void;
  target?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  children,
  className = "",
  showArrow = false,
  showMap = false,
  onClick,
  target,
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  const content = (
    <>
      <span className={styles.content}>{children}</span>
      {showArrow && (
        <svg
          className="w-9 h-9"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5082 10.9307L13.5082 4.49254L7.06996 4.49254"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.49251 13.5075L13.418 4.58203"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {showMap && (
        <svg
          className="w-9 h-9"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.625 7.73832C2.625 4.28842 5.50791 1.5 8.99508 1.5C12.4921 1.5 15.375 4.28842 15.375 7.73832C15.375 9.47677 14.7428 11.0907 13.7021 12.4587C12.5541 13.9676 11.1391 15.2823 9.54641 16.3143C9.18188 16.5528 8.85291 16.5708 8.45284 16.3143C6.85105 15.2823 5.43607 13.9676 4.29787 12.4587C3.25649 11.0907 2.625 9.47677 2.625 7.73832ZM6.89567 7.93256C6.89567 9.08828 7.83874 9.99725 8.99508 9.99725C10.1522 9.99725 11.1043 9.08828 11.1043 7.93256C11.1043 6.78585 10.1522 5.83262 8.99508 5.83262C7.83874 5.83262 6.89567 6.78585 6.89567 7.93256Z"
            fill="currentColor"
          />
        </svg>
      )}
    </>
  );

  if (href) {
    // Utilisez Link pour les routes internes sans utiliser <a> comme enfant direct
    if (href.startsWith("/") && !href.startsWith("/api")) {
      return (
        <Link href={href} className={buttonClasses} target={target}>
          {content}
        </Link>
      );
    } else {
      // Direct <a> tag for external links and mailto
      return (
        <a
          href={href}
          className={buttonClasses}
          target={target}
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
