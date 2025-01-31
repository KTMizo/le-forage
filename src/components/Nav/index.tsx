// app/components/Nav/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "À propos", href: "/about" },
  { label: "Nos services", href: "/services" },
  { label: "Sécurité", href: "/security" },
  { label: "Nos machines", href: "/machines" },
  { label: "FAQ", href: "/faq" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${
              pathname === item.href ? styles.active : ""
            }`}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
