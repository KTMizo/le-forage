# CLAUDE.md - Le Forage Project Guide

**Last Updated:** 2025-12-12
**Project:** Le Forage - Geotechnical Drilling Services Website
**Framework:** Next.js 15 with TypeScript
**Language:** French (content and commit messages)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Development Workflows](#development-workflows)
5. [Coding Conventions](#coding-conventions)
6. [Styling Guidelines](#styling-guidelines)
7. [WordPress Integration](#wordpress-integration)
8. [Component Patterns](#component-patterns)
9. [Animation Guidelines](#animation-guidelines)
10. [Common Tasks](#common-tasks)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

Le Forage is a professional website for a geotechnical drilling company. The site showcases their services, machines, certifications (RSE), and provides a way for clients to request quotes.

**Key Features:**
- WordPress headless CMS integration via REST API
- Smooth scroll animations using Lenis and GSAP
- Responsive design with mobile-first approach
- Server-side rendering with Next.js App Router
- Custom fonts (Articulat CF, Bebas Neue)
- Image optimization with Next.js Image component
- FAQ accordion sections
- Machine catalog with PDF technical sheets
- Service popup modals

**Target Audience:** French-speaking businesses requiring geotechnical services

---

## Tech Stack

### Core Framework
- **Next.js:** 15.1.6 (App Router)
- **React:** 19.0.0
- **TypeScript:** 5.x
- **Node.js:** 20.x (required)

### Styling
- **Tailwind CSS:** 4.1.11 (with PostCSS plugin)
- **CSS Modules:** Component-scoped styling
- **Custom CSS Variables:** Defined in `src/styles/globals.css`

### Animation & Scroll
- **Lenis:** 1.3.8 - Smooth scrolling
- **GSAP:** 3.12.7 - Advanced animations and ScrollTrigger
- **Framer Motion:** 12.3.1 - React animation library
- **Locomotive Scroll:** 4.1.4 - Scroll-based animations
- **SplitType:** 0.3.4 - Text animation utilities

### Data & API
- **Axios:** 1.7.9 - HTTP client for WordPress API
- **WordPress REST API:** Headless CMS (admin.leforage.fr)

### Icons & UI
- **Lucide React:** 0.475.0 - Icon library

---

## Project Structure

```
le-forage/
├── public/
│   └── assets/
│       ├── fonts/            # Custom web fonts (Articulat CF, Bebas Neue)
│       ├── images/           # Static images (JPG, PNG)
│       ├── svg/              # SVG icons and logos
│       │   ├── Icones/       # Service/feature icons
│       │   └── Logo/         # Company logo
│       └── pdf/              # PDF documents (technical sheets)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   └── fetch/        # WordPress fetch endpoint
│   │   ├── mentions-legales/ # Legal notices page
│   │   ├── protection-donnees/ # Data protection page
│   │   ├── layout.tsx        # Root layout with Lenis provider
│   │   ├── page.tsx          # Home page (main entry)
│   │   ├── page_main.tsx     # Alternative main page component
│   │   ├── not-found.tsx     # 404 page
│   │   ├── LenisProvider.tsx # Smooth scroll provider
│   │   ├── InfiniteWrapper.tsx # Infinite scroll wrapper
│   │   └── robot.ts          # Robots.txt generation
│   ├── components/           # Reusable components
│   │   ├── Cards/            # Card components
│   │   │   ├── AboutCards/   # About section skill cards
│   │   │   ├── FooterCards/  # Footer CTA cards
│   │   │   ├── MachineCard/  # Machine catalog cards
│   │   │   ├── PartnersCard/ # Partner/certification cards
│   │   │   └── PartnersPopUp/ # Certification popup modal
│   │   ├── UI/               # Generic UI components
│   │   │   ├── Button/       # Button component with variants
│   │   │   └── Menu/         # Hamburger menu
│   │   ├── Nav/              # Navigation bar
│   │   ├── Loader/           # Page loader
│   │   ├── ScrollProgress/   # Scroll progress indicator
│   │   ├── Fore/             # Drilling icon/animation
│   │   ├── Grid/             # Grid layout component
│   │   ├── ListAsk/          # FAQ list component
│   │   ├── Coming/           # Coming soon component
│   │   ├── TitleAbout/       # About section title
│   │   └── GoogleAnalytics.tsx # GA4 integration
│   ├── sections/             # Page sections (large components)
│   │   ├── Hero/             # Hero section with background
│   │   ├── About/            # Company about section
│   │   ├── Services/         # Services section
│   │   ├── RSE/              # Corporate responsibility section
│   │   ├── Machine/          # Machine catalog section
│   │   ├── FAQ/              # FAQ section
│   │   ├── Footer/           # Footer section
│   │   ├── ImageBreak/       # Full-width parallax images
│   │   ├── t-about.tsx       # Alternative about section
│   │   ├── t-services.tsx    # Alternative services section
│   │   └── t-faq.tsx         # Alternative FAQ section
│   ├── lib/
│   │   └── api.ts            # WordPress API functions
│   ├── types/                # TypeScript type definitions
│   │   ├── wordpress.ts      # WordPress data types
│   │   └── modules/          # Module-specific types
│   │       ├── hero.ts
│   │       ├── about.ts
│   │       ├── services.ts
│   │       ├── rse.ts
│   │       ├── machine.ts
│   │       ├── faq.ts
│   │       ├── footer.ts
│   │       ├── imageBreak.ts
│   │       └── titleAbout.ts
│   └── styles/               # Global styles
│       ├── globals.css       # Global styles + Tailwind + CSS variables
│       ├── variables.css     # CSS custom properties
│       ├── reset.css         # CSS reset
│       └── infinite-scroll.css # Infinite scroll styles
├── imagebreak.json           # ACF field configuration for image breaks
├── package.json
├── tsconfig.json             # TypeScript config with path aliases
├── next.config.ts            # Next.js config (image domains, SVG loader)
├── postcss.config.mjs        # PostCSS config for Tailwind
├── eslint.config.mjs         # ESLint configuration
└── .gitignore
```

### Key Directory Purposes

- **`/src/app`**: Next.js 15 App Router pages and layouts
- **`/src/components`**: Small, reusable components with single responsibilities
- **`/src/sections`**: Large page sections that compose multiple components
- **`/src/lib`**: Utility functions, especially WordPress API integration
- **`/src/types`**: TypeScript interfaces and types (strongly typed)
- **`/src/styles`**: Global CSS, variables, and resets
- **`/public/assets`**: Static assets served directly

---

## Development Workflows

### Git Workflow

**Branch Naming Convention:**
```
claude/<descriptive-name>-<session-id>
```

Examples:
- `claude/fix-footer-button-style-01AXotjdfWJ4kpjrEkgJReAN`
- `claude/fix-svg-footer-overlap-01Pg9bg7UGoUxXoDAX5eQQpv`
- `claude/fix-rse-mobile-layout-016EfyzAHmLDCCXU3pt1hhBa`

**Commit Message Convention:**
- Written in **French**
- Format: `<Type>: <Description>`
- Types: `Fix`, `Refactor`, `Feature`, `Update`, `Docs`, `Style`, `Test`

Examples:
```
Fix: Corriger le z-index du SVG du footer pour permettre les clics sur les liens
Refactor: Remplacer les animations SplitText par des animations d'opacité simples
Fix: Uniformiser le style et l'effet du bouton 'forer la page' entre header et footer
```

**Pull Request Workflow:**
1. Create feature branch from current branch
2. Make changes and commit with descriptive French messages
3. Push to remote: `git push -u origin <branch-name>`
4. Create PR via GitHub
5. Merge to main after review

**Important Git Rules:**
- Always push to branches starting with `claude/` and ending with session ID
- Use exponential backoff retry (2s, 4s, 8s, 16s) for network failures
- Never force push to main/master
- Never skip hooks without explicit permission

### Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

Required `.env.local` variables:
```env
# WordPress API Configuration
NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2
WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2
WP_API_TOKEN=<optional-bearer-token>

# Optional: Disable WordPress (use fallback data)
DISABLE_WORDPRESS=false

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=<your-ga4-id>
```

---

## Coding Conventions

### TypeScript

**Import Paths:**
Use the `@/` alias for absolute imports:
```typescript
import Button from '@/components/UI/Button';
import { getHeroData } from '@/lib/api';
import type { HeroData } from '@/types/modules/hero';
```

**Type Safety:**
- Always define TypeScript interfaces for data structures
- Use `type` for module exports when appropriate
- Avoid `any` - use `unknown` or specific types
- Define types in `/src/types` directory

**Example Type Definition:**
```typescript
// src/types/modules/hero.ts
export interface HeroData {
  title: string;
  description: string;
  button: {
    text: string;
    url: string;
    variant: ButtonVariant;
    showArrow: boolean;
  };
}
```

### Component Structure

**Functional Components:**
```typescript
import React from 'react';
import styles from './Component.module.css';

interface ComponentProps {
  title: string;
  description?: string;
}

const Component: React.FC<ComponentProps> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Component;
```

**Server Components (Default in App Router):**
```typescript
// No "use client" directive = Server Component
export default async function Page() {
  const data = await fetchData();
  return <Section data={data} />;
}
```

**Client Components (When Needed):**
```typescript
"use client";

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [state, setState] = useState(null);
  // ... client-side logic
}
```

**When to Use Client Components:**
- Event handlers (onClick, onChange, etc.)
- Hooks (useState, useEffect, useContext)
- Browser APIs (window, document, localStorage)
- Third-party libraries requiring client-side JS

### File Naming

- **Components:** PascalCase (`Button.tsx`, `HeroSection.tsx`)
- **Utilities:** camelCase (`api.ts`, `helpers.ts`)
- **Styles:** kebab-case with module suffix (`button.module.css`)
- **Types:** camelCase (`hero.ts`, `wordpress.ts`)

### Code Organization

**Component File Structure:**
```
Button/
├── index.tsx          # Main component
├── Button.module.css  # Scoped styles
└── types.ts           # Component-specific types (if complex)
```

**Export Pattern:**
```typescript
// index.tsx - default export for component
export default Button;

// types.ts - named exports for types
export type { ButtonVariant, ButtonProps };
```

---

## Styling Guidelines

### CSS Variables

Defined in `src/styles/globals.css` under `@theme`:

**Colors:**
```css
--color-red: #ab2325;        /* Primary accent */
--color-beige: #f9f1ea;      /* Background */
--color-bleu: #003b87;       /* Secondary accent */
--color-black: #000000;      /* Text */
--color-white: #ffffff;      /* White */
```

**Typography:**
```css
--font-articulate: "articulat";  /* Body font */
--font-bebas: "bebas";           /* Display font */

/* Responsive text sizes */
--text-desk-xxl: 5.25rem;    /* Desktop extra large */
--text-desk-xl: 4rem;        /* Desktop large */
--text-desk-m: 2.25rem;      /* Desktop medium */
--text-xl: 1.5rem;           /* Mobile large */
--text-m: 1.375rem;          /* Mobile medium */
```

**Breakpoints:**
```css
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
--breakpoint-3xl: 1920px;
--breakpoint-4xl: 1921px;
```

### Responsive Font Scaling

The project uses viewport-based font scaling:
```css
html {
  @apply
    text-[calc(100vw_/_375_*_16)]      /* Mobile: 375px base */
    md:text-[calc(100vw_/_768_*_16)]   /* Tablet: 768px base */
    lg:text-[calc(100vw_/_1920_*_16)]  /* Desktop: 1920px base */
    2xl:text-[calc(100vw_/_1920_*_16)]
    3xl:text-[calc(100vw_/_1920_*_16)]
    4xl:text-[16px];                   /* Fixed at 1921px+ */
}
```

**Effect:** Font sizes scale proportionally with viewport width until 1921px, then become fixed.

### Tailwind Usage

**Utility Classes:**
```tsx
<div className="flex items-center justify-between px-4 md:px-8 lg:px-16">
  <h1 className="text-xl md:text-desk-xl font-medium">Title</h1>
</div>
```

**Custom Utilities (if needed):**
Define in `globals.css`:
```css
.t-image-clip-path img {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.5s cubic-bezier(0.6, 0, 0.3, 0.9);
}

.t-image-clip-path.is-visible img {
  clip-path: inset(0 0 0 0);
}
```

### CSS Modules

**Scoped Component Styles:**
```css
/* Button.module.css */
.button {
  position: relative;
  padding: 1rem 2rem;
  border-radius: var(--radius-5);
  transition: all 0.3s ease;
}

.primary {
  background-color: var(--color-red);
  color: var(--color-white);
}

.outline {
  border: 1px solid var(--color-bleu);
  color: var(--color-bleu);
}
```

**Usage in Component:**
```tsx
import styles from './Button.module.css';

const Button = ({ variant = 'primary' }) => (
  <button className={`${styles.button} ${styles[variant]}`}>
    Click me
  </button>
);
```

### Animation Classes

**Global Animation Utilities:**
```css
/* Accordion animations */
.t-accordeon {
  transition: all 0.5s cubic-bezier(0.31, 0.2, 0, 1);
  overflow: hidden;
}

.t-accordeon-body {
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.7, 0, 0.2, 1);
}

.t-accordeon-body.is-open {
  opacity: 1;
  max-height: max-content;
}
```

**Scroll-based Classes:**
```css
/* Applied/removed by Lenis scroll listener */
html.is-red #nav-sticky {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

#nav-sticky.is-scroll-down {
  transform: translateY(-5rem);
  opacity: 0;
  pointer-events: none;
}
```

### Styling Best Practices

1. **Use CSS Variables** for colors, fonts, and spacing
2. **Mobile-First** responsive design (start with mobile, add `md:`, `lg:` breakpoints)
3. **CSS Modules** for component-specific styles
4. **Tailwind Utilities** for layout and spacing
5. **Custom Classes** (`.t-*` prefix) for complex animations
6. **Avoid Inline Styles** unless dynamically computed
7. **Consistent Transitions** using defined easing functions

---

## WordPress Integration

### API Configuration

**Base URL:** `https://admin.leforage.fr/wp-json/wp/v2`

The WordPress API is accessed via custom functions in `src/lib/api.ts`.

### API Functions

**Available Data Fetchers:**

```typescript
// Hero section data
getHeroData(): Promise<HeroData>

// About section title and subtitle
getTitleAboutData(): Promise<TitleAboutData>

// About section skills and image
getAboutData(): Promise<AboutData>

// Services list with questions
getServicesData(): Promise<ServicesSection>

// RSE (Corporate Responsibility) cards
getRSERelatedData(slug: string): Promise<RSEModules>

// Machine catalog
getMachineData(): Promise<Machine>

// FAQ items
getFaqData(slug: string): Promise<ACFFaqFields>

// Footer data
getFooterData(): Promise<Footer>

// Image break sections (parallax images)
getImageBreakData(): Promise<ImageBreakSection>

// Generic page data
getPage(slug: string): Promise<WordPressPage>
```

### Data Fetching Pattern

**Server Component (Recommended):**
```typescript
// app/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const heroData = await getHeroData();
  const servicesData = await getServicesData();

  return (
    <>
      <Hero data={heroData} />
      <Services data={servicesData} />
    </>
  );
}
```

**With Error Handling:**
```typescript
async function fetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    console.error('Error fetching data:', error);
    return fallback;
  }
}

const heroData = await fetchWithFallback(getHeroData, defaultHeroData);
```

### ACF Field Structure

The WordPress backend uses **Advanced Custom Fields (ACF)** for structured data.

**Example ACF Structure (Hero Section):**
```json
{
  "acf": {
    "title": "Le Forage",
    "description": "Spécialistes en sondage géotechnique",
    "button": {
      "text": "Demandez un devis",
      "url": "/contact",
      "variant": "primary",
      "showArrow": true
    }
  }
}
```

### Image Handling

WordPress images are fetched by ID and resolved to URLs:

```typescript
// Get image URL from WordPress media ID
async function getImageUrl(imageId: number): Promise<string> {
  const response = await fetch(`${WP_API_URL}/media/${imageId}`);
  const data = await response.json();
  return data.source_url || '';
}
```

**Image Response Includes:**
- `source_url`: Full image URL
- `alt_text`: Accessibility text
- `media_details.width`: Image width
- `media_details.height`: Image height

### Fallback Data

All API functions include fallback data to prevent crashes if WordPress is unavailable:

```typescript
// Default data prevents empty sections
const defaultHeroData: HeroData = {
  title: "Titre par défaut",
  description: "Description par défaut",
  button: {
    text: "Demandez un devis",
    url: "/destination",
    variant: "outline",
    showArrow: true
  }
};
```

### Caching & Revalidation

**ISR (Incremental Static Regeneration):**
```typescript
export const revalidate = 3600; // Revalidate page every 3600 seconds (1 hour)
```

**Fetch Caching:**
```typescript
fetch(endpoint, {
  method: 'GET',
  headers,
  next: { revalidate: 10 } // Cache for 10 seconds
});
```

---

## Component Patterns

### Button Component

**Location:** `src/components/UI/Button/index.tsx`

**Variants:**
- `primary` - Red background, white text
- `secondary` - Secondary style
- `blue` - Blue background
- `outline` - Outlined button
- `outline-accent` - Outlined with accent color
- `accent-outline` - Accent outlined

**Props:**
```typescript
interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;           // Link URL (internal or external)
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;     // Show arrow icon
  showMap?: boolean;       // Show map pin icon
  onClick?: () => void;
  target?: string;
}
```

**Usage:**
```tsx
// Internal link
<Button variant="primary" href="/contact" showArrow>
  Contactez-nous
</Button>

// External link
<Button variant="outline" href="https://example.com" target="_blank">
  En savoir plus
</Button>

// Button with onClick
<Button variant="secondary" onClick={() => console.log('Clicked')}>
  Cliquez ici
</Button>
```

### Section Pattern

**Typical Section Structure:**
```tsx
// sections/Hero/index.tsx
import styles from './Hero.module.css';
import type { HeroData } from '@/types/modules/hero';

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <Button href={data.button.url} variant={data.button.variant}>
          {data.button.text}
        </Button>
      </div>
    </section>
  );
}
```

### Card Components

**Location:** `src/components/Cards/`

**AboutCards Pattern:**
```tsx
interface AboutSkillProps {
  icon: string;
  title: string;
  description: string;
}

export default function AboutSkill({ icon, title, description }: AboutSkillProps) {
  return (
    <div className={styles.card}>
      <img src={icon} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

### Modal/Popup Pattern

**PartnersPopUp Example:**
```tsx
"use client";

import { useState } from 'react';
import styles from './PartnersPopUp.module.css';

export default function PartnersPopUp({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal content */}
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
```

### Accordion Pattern

**FAQ/List Pattern:**
```tsx
"use client";

import { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`t-accordeon ${openIndex === index ? 'is-open' : ''}`}
        >
          <div
            className="t-accordeon-head"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3>{item.question}</h3>
            <svg className={openIndex === index ? 'is-open' : ''}>
              {/* Plus icon */}
            </svg>
          </div>

          <div className={`t-accordeon-body ${openIndex === index ? 'is-open' : ''}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Animation Guidelines

### Lenis Smooth Scroll

**Setup:** Configured in `src/app/LenisProvider.tsx`

**Configuration:**
```typescript
const lenis = new Lenis({
  duration: 1.2,         // Scroll duration
  smoothWheel: true,     // Enable smooth wheel scrolling
  wheelMultiplier: 1,    // Wheel sensitivity
  touchMultiplier: 2,    // Touch sensitivity
});
```

**Global Access:**
```typescript
// Lenis instance available globally
window.lenis.scrollTo(0);           // Scroll to top
window.lenis.scrollTo('#section');  // Scroll to element
```

**Scroll Event Listener:**
```typescript
lenis.on('scroll', (e) => {
  // e.targetScroll - current scroll position
  // e.direction - scroll direction (1 = down, -1 = up)

  if (e.targetScroll > threshold) {
    // Add class when scrolled past threshold
    document.documentElement.classList.add('is-red');
  }
});
```

### GSAP Animations

**ScrollTrigger Setup:**
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animate on scroll
gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    scrub: true
  },
  opacity: 1,
  y: 0
});
```

**Scale Animation Example:**
```typescript
// From LenisProvider.tsx - scale images on scroll
gsap.set(image, {
  scale: 1 + normalized * 0.5  // Scale from 1 to 1.5
});
```

### CSS Transitions

**Standard Easing:**
```css
/* Smooth ease */
transition: all 0.3s ease;

/* Custom cubic-bezier */
transition: all 0.5s cubic-bezier(0.31, 0.2, 0, 1);
transition: all 0.6s cubic-bezier(0.7, 0, 0.2, 1);
transition: clip-path 1.5s cubic-bezier(0.6, 0, 0.3, 0.9);
```

### Framer Motion

**Basic Animation:**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Scroll-triggered Animation:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Image Reveal Animation

**Pattern:**
```tsx
<div className="t-image-clip-path">
  <img src={src} alt={alt} />
</div>
```

**CSS:**
```css
.t-image-clip-path img {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.5s cubic-bezier(0.6, 0, 0.3, 0.9);
}

.t-image-clip-path.is-visible img {
  clip-path: inset(0 0 0 0);
}
```

**JavaScript:**
```typescript
// Add 'is-visible' class when in viewport
observer.observe(element);
```

### Animation Performance Tips

1. **Use `will-change`** for animated properties:
   ```css
   .animated {
     will-change: transform, opacity;
   }
   ```

2. **Prefer `transform` and `opacity`** over other properties
3. **Use `requestAnimationFrame`** for smooth animations
4. **Debounce scroll listeners** for performance
5. **Clean up GSAP instances** in React cleanup:
   ```typescript
   useEffect(() => {
     const animation = gsap.to(...);
     return () => animation.kill();
   }, []);
   ```

---

## Common Tasks

### Adding a New Section

1. **Create section directory:**
   ```bash
   mkdir src/sections/NewSection
   touch src/sections/NewSection/index.tsx
   touch src/sections/NewSection/NewSection.module.css
   ```

2. **Define types:**
   ```typescript
   // src/types/modules/newSection.ts
   export interface NewSectionData {
     title: string;
     content: string;
   }
   ```

3. **Create API function:**
   ```typescript
   // src/lib/api.ts
   export async function getNewSectionData(): Promise<NewSectionData> {
     const pageData = await getPageData('home');
     return {
       title: pageData.acf?.new_section_title || '',
       content: pageData.acf?.new_section_content || ''
     };
   }
   ```

4. **Create component:**
   ```tsx
   // src/sections/NewSection/index.tsx
   import styles from './NewSection.module.css';
   import type { NewSectionData } from '@/types/modules/newSection';

   export default function NewSection({ data }: { data: NewSectionData }) {
     return (
       <section className={styles.section}>
         <h2>{data.title}</h2>
         <p>{data.content}</p>
       </section>
     );
   }
   ```

5. **Add to page:**
   ```tsx
   // src/app/page.tsx
   import NewSection from '@/sections/NewSection';
   import { getNewSectionData } from '@/lib/api';

   export default async function Home() {
     const newSectionData = await getNewSectionData();

     return (
       <main>
         {/* Other sections */}
         <NewSection data={newSectionData} />
       </main>
     );
   }
   ```

### Adding a New Component

1. **Create component directory:**
   ```bash
   mkdir src/components/NewComponent
   touch src/components/NewComponent/index.tsx
   touch src/components/NewComponent/NewComponent.module.css
   ```

2. **Define component:**
   ```tsx
   import React from 'react';
   import styles from './NewComponent.module.css';

   interface NewComponentProps {
     title: string;
     onClick?: () => void;
   }

   const NewComponent: React.FC<NewComponentProps> = ({ title, onClick }) => {
     return (
       <div className={styles.container} onClick={onClick}>
         <h3>{title}</h3>
       </div>
     );
   };

   export default NewComponent;
   ```

3. **Add styles:**
   ```css
   /* NewComponent.module.css */
   .container {
     padding: 1rem;
     background-color: var(--color-beige);
   }
   ```

4. **Use in parent component:**
   ```tsx
   import NewComponent from '@/components/NewComponent';

   <NewComponent title="Hello" onClick={() => console.log('Clicked')} />
   ```

### Adding a New Page

1. **Create page directory:**
   ```bash
   mkdir src/app/new-page
   touch src/app/new-page/page.tsx
   touch src/app/new-page/page.module.css
   ```

2. **Create page component:**
   ```tsx
   // src/app/new-page/page.tsx
   import styles from './page.module.css';

   export const metadata = {
     title: 'New Page | Le Forage',
     description: 'Description of new page'
   };

   export default async function NewPage() {
     return (
       <main className={styles.main}>
         <h1>New Page</h1>
       </main>
     );
   }
   ```

3. **Add navigation link:**
   ```tsx
   // In Nav component
   <Link href="/new-page">New Page</Link>
   ```

### Updating Styles

**Global Styles:**
```css
/* src/styles/globals.css */
@theme {
  --color-new: #123456;  /* Add new color */
}

.new-global-class {
  /* Add new global utility */
}
```

**Component Styles:**
```css
/* Component.module.css */
.newClass {
  color: var(--color-new);
}
```

**Tailwind Classes:**
```tsx
<div className="bg-beige text-bleu p-4 md:p-8">
  Content
</div>
```

### Adding Animation

**CSS Animation:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animated {
  animation: fadeIn 0.5s ease-in;
}
```

**GSAP Animation:**
```typescript
"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedComponent() {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.to(elementRef.current, {
      opacity: 1,
      y: 0,
      duration: 1
    });
  }, []);

  return <div ref={elementRef}>Content</div>;
}
```

**Framer Motion:**
```tsx
"use client";
import { motion } from 'framer-motion';

export default function MotionComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Troubleshooting

### Common Issues

#### 1. WordPress API Not Responding

**Symptoms:**
- Sections showing default/fallback data
- Console errors about failed fetches

**Solutions:**
1. Check `.env.local` has correct WordPress URL
2. Verify WordPress site is accessible
3. Check API token if using authentication
4. Use fallback data pattern:
   ```typescript
   const data = await fetchWithFallback(getData, defaultData);
   ```

#### 2. Smooth Scroll Not Working

**Symptoms:**
- Page scrolls normally without smoothness
- Animations not triggering

**Solutions:**
1. Ensure `LenisProvider` wraps app in `layout.tsx`
2. Check for conflicting scroll libraries
3. Verify `overscroll-behavior: none` in CSS
4. Check browser console for Lenis errors

#### 3. Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors for images

**Solutions:**
1. Add domain to `next.config.ts`:
   ```typescript
   images: {
     domains: ['localhost', 'admin.leforage.fr', 'your-domain.com']
   }
   ```
2. Check image paths in `/public/assets`
3. Verify WordPress media URLs are correct
4. Use fallback images in API functions

#### 4. TypeScript Errors

**Symptoms:**
- Red underlines in VSCode
- Build failures

**Solutions:**
1. Run `npm install` to ensure types are installed
2. Check `tsconfig.json` path aliases
3. Add type definitions to `src/types`
4. Use type assertions when necessary:
   ```typescript
   const data = apiResponse as MyType;
   ```

#### 5. CSS Modules Not Applying

**Symptoms:**
- Styles not appearing
- Class names not found

**Solutions:**
1. Ensure `.module.css` extension
2. Import styles: `import styles from './Component.module.css'`
3. Use `styles.className` not string literals
4. Check for typos in class names
5. Verify CSS Module is in same directory as component

#### 6. Build Errors

**Symptoms:**
- `npm run build` fails

**Common Fixes:**
1. Clear `.next` directory: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run build`
4. Ensure all imports are correct
5. Verify all environment variables are set

#### 7. Animation Performance Issues

**Symptoms:**
- Janky animations
- High CPU usage

**Solutions:**
1. Use `transform` and `opacity` only
2. Add `will-change` to animated elements
3. Reduce number of animated elements
4. Use `requestAnimationFrame` for scroll listeners
5. Debounce scroll events
6. Check browser DevTools Performance tab

#### 8. Mobile Responsiveness Issues

**Symptoms:**
- Layout breaks on mobile
- Text too small/large

**Solutions:**
1. Use Tailwind responsive classes (`md:`, `lg:`)
2. Check viewport-based font scaling in `globals.css`
3. Test on actual devices, not just browser resize
4. Use mobile-first approach (design for mobile, add desktop)
5. Check `@media` queries in CSS modules

### Debugging Tips

**Console Logging:**
```typescript
console.log('Data:', data);
console.error('Error:', error);
console.warn('Warning:', warning);
```

**React DevTools:**
- Install React DevTools extension
- Inspect component props and state
- Check component tree

**Network Tab:**
- Monitor API requests
- Check response data
- Verify headers and status codes

**Performance Tab:**
- Record page load
- Identify slow renders
- Find animation bottlenecks

**Lighthouse Audit:**
```bash
npm run build
npm start
# Then run Lighthouse in Chrome DevTools
```

---

## Best Practices Summary

### Code Quality

- ✅ Use TypeScript for all components
- ✅ Define interfaces for all data structures
- ✅ Use `@/` alias for imports
- ✅ Write functional components with React.FC
- ✅ Extract reusable logic into custom hooks
- ✅ Keep components small and focused
- ✅ Use meaningful variable and function names
- ✅ Comment complex logic
- ✅ Handle errors gracefully with try/catch
- ✅ Provide fallback data for API failures

### Performance

- ✅ Use Server Components by default
- ✅ Only use Client Components when necessary
- ✅ Implement ISR with `revalidate` export
- ✅ Optimize images with Next.js Image component
- ✅ Use CSS Modules for scoped styles
- ✅ Minimize use of `use client`
- ✅ Lazy load heavy components
- ✅ Use `will-change` for animations
- ✅ Debounce scroll events
- ✅ Clean up effects and event listeners

### Accessibility

- ✅ Use semantic HTML elements
- ✅ Add `alt` text to all images
- ✅ Ensure sufficient color contrast
- ✅ Support keyboard navigation
- ✅ Add ARIA labels where needed
- ✅ Test with screen readers
- ✅ Ensure focus states are visible
- ✅ Use descriptive link text

### Styling

- ✅ Use CSS variables for colors and fonts
- ✅ Follow mobile-first responsive design
- ✅ Use Tailwind for layout and spacing
- ✅ Use CSS Modules for component styles
- ✅ Maintain consistent spacing and sizing
- ✅ Use defined easing functions for transitions
- ✅ Prefer `transform` and `opacity` for animations
- ✅ Test on multiple devices and browsers

### Git & Workflow

- ✅ Use descriptive branch names with session ID
- ✅ Write clear commit messages in French
- ✅ Keep commits focused and atomic
- ✅ Test before pushing
- ✅ Create PRs for review
- ✅ Never force push to main
- ✅ Use exponential backoff for network retries

---

## Additional Resources

### Official Documentation

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **GSAP:** https://greensock.com/docs
- **Lenis:** https://lenis.studiofreight.com
- **Framer Motion:** https://www.framer.com/motion

### WordPress

- **REST API:** https://developer.wordpress.org/rest-api
- **ACF:** https://www.advancedcustomfields.com/resources

### Tools

- **React DevTools:** Browser extension for React debugging
- **Lighthouse:** Built into Chrome DevTools for performance audits
- **TypeScript Playground:** https://www.typescriptlang.org/play

---

## Changelog

**2025-12-12**
- Initial creation of CLAUDE.md
- Documented current project structure
- Added coding conventions and workflows
- Included WordPress integration details
- Added animation guidelines and common tasks

---

## Questions?

If you encounter issues not covered in this guide:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the official documentation for relevant libraries
3. Search for similar issues in the project's git history
4. Examine existing components for patterns and examples

**Remember:** This is a living document. Update it as the project evolves and new patterns emerge.
