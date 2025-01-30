import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-accent"
  | "accent-outline";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  children,
  className = "",
  showArrow = false,
  onClick,
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  const content = (
    <>
      <span className={styles.content}>{children}</span>
      {showArrow && (
        <svg
          className={styles.arrow}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
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
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
