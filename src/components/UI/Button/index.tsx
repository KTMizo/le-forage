/**
 * @file /Users/antoinepiney/Documents/hub-station/le-forage/le-forage/src/components/UI/Button/index.tsx
 *
 * This file contains the Button component which can be used to render a button or a link with different variants and optional arrow icon.
 *
 * @typedef {("primary" | "secondary" | "outline" | "outline-accent" | "accent-outline")} ButtonVariant - The variant of the button.
 *
 * @interface ButtonProps
 * @property {ButtonVariant} [variant="primary"] - The variant of the button.
 * @property {string} [href] - The URL to link to. If provided, the button will be rendered as a link.
 * @property {React.ReactNode} children - The content of the button.
 * @property {string} [className=""] - Additional class names to apply to the button.
 * @property {boolean} [showArrow=false] - Whether to show an arrow icon inside the button.
 * @property {() => void} [onClick] - The click handler for the button.
 *
 * @component
 * @example
 * // Usage example:
 * <Button variant="primary" onClick={() => console.log('Button clicked!')}>
 *   Click Me
 * </Button>
 *
 * @example
 * // Usage example with link:
 * <Button variant="outline" href="/about">
 *   Learn More
 * </Button>
 */
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
  target?: string; // add target property
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  children,
  className = "",
  showArrow = false,
  onClick,
  target, // add target property
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
      <Link href={href} passHref className={buttonClasses} target={target}>
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
