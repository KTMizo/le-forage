# 📋 Le Forage - Document de Reprise de Projet

**Date de création:** 24 septembre 2026  
**Dernière mise à jour:** 24 septembre 2026  
**Propriétaire:** KTMizo / thomas.bagnolati@gmail.com  
**Statut:** Projet à reprendre

---

## 🎯 Vue d'Ensemble Rapide

**Le Forage** est un site web vitrine pour une entreprise française de forage géotechnique.

**Architecture:** WordPress Headless + Next.js 15 + Vercel + OVH  
**Site en production:** https://www.leforage.fr/  
**Repository:** https://github.com/KTMizo/le-forage  
**Documentation:** `CLAUDE.md` à la racine du projet

---

## 🏗️ Infrastructure & Hébergement

### Code Source

**Repository Git:**
- **URL:** `https://github.com/KTMizo/le-forage`
- **Propriétaire:** KTMizo
- **Accès:** thomas.bagnolati@gmail.com
- **Branches principales:**
  - `main` - Production
  - `claude/claude-md-mj32nia7cixfb2df-01MhuPhkZ2a8cFyf5kibDFTj` - Branche de développement actuelle

### Backend WordPress (CMS)

**WordPress Headless:**
- **URL Admin:** `https://admin.leforage.fr/wp-admin`
- **API REST:** `https://admin.leforage.fr/wp-json/wp/v2`
- **Plugin principal:** Advanced Custom Fields (ACF) Pro
- **Rôle:** Gestion du contenu uniquement (pas de frontend)

**Contenu géré dans WordPress:**
- Hero section
- Section À propos
- Services
- Machines (catalogue avec PDFs)
- FAQ
- RSE (Responsabilité Sociale)
- Footer
- Images de séparation avec parallaxe

### Frontend Next.js

**Framework:** Next.js 15.1.6 avec App Router  
**Version:** 0.1.0 (private)  
**Langue:** TypeScript 5.x strict

**Hébergement:** Vercel (✅ DÉJÀ CONFIGURÉ)
- Déploiement automatique depuis GitHub
- ISR (Incremental Static Regeneration) - revalidation toutes les heures
- Edge Functions
- Optimisation automatique des images
- URL Vercel: (domaine par défaut Vercel)

### Domaine & DNS

**Configuration actuelle (✅ EN PRODUCTION):**
- **Domaine:** `www.leforage.fr` (via OVH)
- **DNS/Redirection:** OVH → Vercel
- **SSL/TLS:** ✅ Actif (HTTPS fonctionnel)
- **Site accessible:** https://www.leforage.fr/

**Gestion du domaine:**
- Registrar: OVH
- Configuration DNS: Pointe vers Vercel (probablement via CNAME ou redirection)

---

## 📊 Services & Analytics Connectés

### Google Analytics 4

**ID de mesure:** `G-9XPYMXJKWN`

**Configuration:**
- Fichier: `src/components/GoogleAnalytics.tsx`
- Intégration: Google Tag Manager
- Chargement: `strategy="afterInteractive"`
- Pages suivies: Toutes les pages du site

**Accès Analytics:**
- Console: https://analytics.google.com
- Compte lié: thomas.bagnolati@gmail.com (à vérifier)

### Autres Services

**Aucun autre service externe connecté actuellement.**

Possibles ajouts futurs:
- Formulaire de contact (besoin d'un service email)
- Recaptcha pour formulaires
- Service de CDN additionnel
- Monitoring (Sentry, LogRocket, etc.)

---

## 🔧 Stack Technique Complète

### Core Framework

```json
{
  "next": "15.1.6",
  "react": "19.0.0",
  "typescript": "5.x",
  "node": "20.x (requis)"
}
```

### Styling & UI

- **Tailwind CSS:** 4.1.11 (via PostCSS)
- **CSS Modules:** Styles scopés par composant
- **Fonts personnalisées:** Articulat CF, Bebas Neue
- **Icons:** Lucide React 0.475.0

### Animation & Scroll

- **Lenis:** 1.3.8 - Smooth scrolling principal
- **GSAP:** 3.12.7 - Animations complexes + ScrollTrigger
- **Framer Motion:** 12.3.1 - Animations React
- **Locomotive Scroll:** 4.1.4 - Scroll-based animations
- **SplitType:** 0.3.4 - Animations de texte

### Data & API

- **Axios:** 1.7.9 - Client HTTP pour WordPress
- **WordPress REST API:** Récupération de contenu
- **ISR Next.js:** Cache et revalidation (3600s)

---

## 📁 Structure du Projet

```
le-forage/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout racine + Lenis
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── LenisProvider.tsx   # Provider smooth scroll
│   │   ├── mentions-legales/   # Page mentions légales
│   │   └── protection-donnees/ # Page RGPD
│   ├── components/             # Composants réutilisables
│   │   ├── UI/                 # Button, Menu
│   │   ├── Cards/              # Cartes (machines, services)
│   │   ├── Nav/                # Navigation
│   │   ├── Loader/             # Loader de page
│   │   └── GoogleAnalytics.tsx # GA4
│   ├── sections/               # Sections de page
│   │   ├── Hero/               # Hero avec background
│   │   ├── About/              # À propos
│   │   ├── Services/           # Services
│   │   ├── RSE/                # Responsabilité sociale
│   │   ├── Machine/            # Catalogue machines
│   │   ├── FAQ/                # FAQ
│   │   ├── Footer/             # Footer
│   │   └── ImageBreak/         # Images parallaxe
│   ├── lib/
│   │   └── api.ts              # Fonctions API WordPress
│   ├── types/                  # Types TypeScript
│   │   ├── wordpress.ts
│   │   └── modules/            # Types par module
│   └── styles/                 # Styles globaux
│       ├── globals.css         # Styles + Tailwind
│       └── variables.css       # Variables CSS
├── public/
│   └── assets/
│       ├── fonts/              # Articulat CF, Bebas Neue
│       ├── images/             # Images statiques
│       ├── svg/                # Icônes SVG
│       └── pdf/                # Fiches techniques machines
├── CLAUDE.md                   # Guide complet du projet
├── package.json
├── tsconfig.json
├── next.config.ts
└── .gitignore
```

---

## 🔑 Variables d'Environnement

### Fichier `.env.local` (à créer)

```env
# WordPress API
NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2
WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2
WP_API_TOKEN=<optionnel-si-api-privée>

# Google Analytics (déjà configuré dans le code)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9XPYMXJKWN

# Optionnel
DISABLE_WORDPRESS=false
```

### Configuration Vercel

Lors du déploiement sur Vercel, ajouter ces variables dans:
**Settings → Environment Variables**

Pour chaque environnement:
- Production
- Preview
- Development

---

## 🚀 Commandes & Workflow

### Installation

```bash
# Cloner le repository
git clone https://github.com/KTMizo/le-forage.git
cd le-forage

# Installer les dépendances
npm install

# Créer .env.local avec les variables d'environnement
# (voir section ci-dessus)
```

### Développement Local

```bash
# Lancer le serveur de dev
npm run dev
# → http://localhost:3000

# Build de production (test local)
npm run build
npm start

# Linting
npm run lint
```

### Déploiement

**Via Vercel (recommandé):**

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déploiement automatique à chaque push sur `main`
4. Preview deployments sur les PRs

**Configuration Vercel:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 20.x

---

## 🎨 Design System

### Palette de Couleurs

```css
--color-red: #ab2325      /* Rouge principal (accent) */
--color-beige: #f9f1ea    /* Fond beige */
--color-bleu: #003b87     /* Bleu secondaire */
--color-black: #000000    /* Texte noir */
--color-white: #ffffff    /* Blanc */
```

### Typographie

- **Principale:** Articulat CF (Regular 400, Medium 500, DemiBold 700)
- **Affichage:** Bebas Neue (Regular 400)

### Breakpoints

```
Mobile:  375px   (base)
Tablet:  768px   (md:)
Desktop: 1920px  (lg:)
Large:   1921px+ (fixe)
```

---

## 📝 État Actuel du Projet

### ✅ Fonctionnalités Complétées & En Production

- ✅ **Site en production:** https://www.leforage.fr/
- ✅ Architecture WordPress Headless fonctionnelle
- ✅ Intégration API WordPress avec ACF
- ✅ Page d'accueil complète avec toutes les sections
- ✅ Smooth scrolling (Lenis)
- ✅ Animations GSAP et Framer Motion
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Google Analytics 4 configuré
- ✅ Système de navigation
- ✅ Section FAQ avec accordéons
- ✅ Catalogue de machines avec PDFs
- ✅ Popups RSE (certifications)
- ✅ Pages légales (mentions légales, RGPD)
- ✅ Gestion des erreurs API avec fallback data
- ✅ Documentation complète (CLAUDE.md)
- ✅ **Déploiement Vercel configuré**
- ✅ **Domaine OVH configuré** (www.leforage.fr)
- ✅ **SSL/HTTPS actif**

### 🚧 À Finaliser

- 🚧 **Contenu FAQ** (actuellement en Lorem ipsum - à remplacer dans WordPress)
- 🚧 **Tests** (aucun test unitaire)
- 🚧 **Formulaire de contact** (pas encore implémenté)
- 🚧 **Envoi d'emails** pour les devis
- 🚧 **Optimisations SEO** (sitemap, robots.txt améliorés)
- 🚧 **Performances** (audit Lighthouse à faire)
- 🚧 **Accès Vercel** (à récupérer pour voir les déploiements)

### 🔮 Améliorations Futures

- Blog (utiliser les posts WordPress)
- Système multilingue (FR/EN)
- Dashboard d'administration custom
- Système de cache avancé
- Progressive Web App (PWA)
- Tests E2E (Playwright)

---

## 🔐 Accès & Credentials

### GitHub

- **Repository:** https://github.com/KTMizo/le-forage
- **Compte:** KTMizo
- **Email:** thomas.bagnolati@gmail.com

### WordPress

- **Admin:** https://admin.leforage.fr/wp-admin
- **Utilisateur:** (à récupérer)
- **Mot de passe:** (à récupérer/réinitialiser)

### Vercel (✅ Déjà configuré)

- **Compte:** Déjà créé et lié avec GitHub
- **Dashboard:** https://vercel.com/dashboard
- **Email:** thomas.bagnolati@gmail.com
- **Accès:** À récupérer si perdu

### OVH (Domaine)

- **Domaine:** www.leforage.fr
- **Espace client:** https://www.ovh.com/manager/
- **Email:** thomas.bagnolati@gmail.com (probablement)
- **Configuration:** DNS/Redirection vers Vercel

### Google Analytics

- **ID Mesure:** G-9XPYMXJKWN
- **Console:** https://analytics.google.com
- **Compte:** thomas.bagnolati@gmail.com (à vérifier)

---

## 📋 Checklist de Reprise

### Étape 1: Récupération des Accès

- [ ] Confirmer l'accès au repository GitHub
- [ ] Récupérer les credentials WordPress admin
- [ ] Récupérer l'accès Vercel (voir les déploiements)
- [ ] Récupérer l'accès OVH (gestion domaine)
- [ ] Vérifier l'accès Google Analytics

### Étape 2: Installation Locale

- [ ] Cloner le repository
- [ ] Installer les dépendances (`npm install`)
- [ ] Créer `.env.local` avec les variables
- [ ] Tester localement (`npm run dev`)
- [ ] Vérifier la connexion à l'API WordPress

### ✅ Étape 3: Production (DÉJÀ FAIT)

- [x] ✅ Projet Vercel créé
- [x] ✅ Repository GitHub connecté
- [x] ✅ Variables d'environnement configurées
- [x] ✅ Site déployé en production
- [x] ✅ Site accessible sur https://www.leforage.fr/

### ✅ Étape 4: Domaine & DNS (DÉJÀ FAIT)

- [x] ✅ Domaine acheté via OVH (www.leforage.fr)
- [x] ✅ DNS/Redirection OVH → Vercel configurée
- [x] ✅ SSL/TLS actif
- [x] ✅ Site fonctionnel sur le domaine

### Étape 5: Optimisations

- [ ] Audit Lighthouse
- [ ] Optimiser les performances
- [ ] Vérifier le SEO
- [ ] Tester sur mobiles réels
- [ ] Configurer les alertes de monitoring

### Étape 6: Contenu & Fonctionnalités

- [ ] **Remplacer le Lorem Ipsum de la FAQ** dans WordPress
- [ ] Vérifier et compléter tout le contenu WordPress
- [ ] Implémenter formulaire de contact
- [ ] Configurer l'envoi d'emails
- [ ] Ajouter Recaptcha si nécessaire
- [ ] Tester le parcours complet utilisateur

---

## 🛠️ Dépannage Rapide

### Le site ne démarre pas localement

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### L'API WordPress ne répond pas

- Vérifier que `admin.leforage.fr` est accessible
- Vérifier les variables d'environnement dans `.env.local`
- Le site utilisera les fallback data si l'API est down

### Les images ne se chargent pas

Vérifier `next.config.ts`:
```typescript
images: {
  domains: ['localhost', 'admin.leforage.fr']
}
```

### Erreurs de build

```bash
# Vérifier les erreurs TypeScript
npm run build

# Nettoyer et rebuild
rm -rf .next
npm run build
```

---

## 📚 Documentation

### Documents Disponibles

1. **`CLAUDE.md`** - Guide technique complet
   - Structure du projet
   - Conventions de code
   - Patterns de composants
   - Guide d'animation
   - Troubleshooting détaillé

2. **`REPRISE-PROJET.md`** - Ce document
   - Vue d'ensemble infrastructure
   - Services connectés
   - Checklist de reprise

3. **`README.md`** - README Next.js standard

### Ressources Externes

- **Next.js:** https://nextjs.org/docs
- **WordPress REST API:** https://developer.wordpress.org/rest-api
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel:** https://vercel.com/docs

---

## 📞 Contacts

### Projet

- **Propriétaire:** KTMizo
- **Email:** thomas.bagnolati@gmail.com
- **Repository:** https://github.com/KTMizo/le-forage

### Support Technique

- **Next.js:** https://nextjs.org/docs
- **Vercel:** support@vercel.com
- **WordPress:** Forums WordPress

---

## 🔄 Historique des Modifications

**2026-09-24**
- Création du document de reprise
- Documentation de l'infrastructure complète
- Identification des services connectés (GA4)
- Checklist de reprise créée

**2025-12-12**
- Création initiale du projet
- Intégration WordPress Headless
- Développement de toutes les sections
- Configuration Google Analytics
- Documentation technique (CLAUDE.md)

---

## 💡 Conseils pour la Reprise

### Pour un Développeur

1. **Lire `CLAUDE.md` en entier** - Contient tous les patterns et conventions
2. **Le site est DÉJÀ EN PRODUCTION** sur https://www.leforage.fr/
3. **Récupérer les accès** - Vercel, OVH, WordPress pour maintenir le site
4. **Vérifier l'API WordPress** - C'est le point d'échec le plus courant
5. **Respecter les conventions Git** - Branches `claude/*` et commits en français
6. **Priorité:** Remplacer le Lorem Ipsum de la FAQ dans WordPress

### Pour un Non-Développeur

1. **Le site est déjà en ligne** - https://www.leforage.fr/
2. **Récupérer les accès** - OVH (domaine), Vercel (hosting), WordPress (contenu)
3. **Engager un développeur Next.js** pour maintenance et évolutions
4. **Définir les priorités** - Contenu FAQ > Formulaire contact > Blog
5. **Coûts actuels** - Vercel (probablement gratuit ou ~$20/mois), OVH (domaine ~10€/an)

### Pour un Modèle IA Plus Puissant

1. **Commencer par lire `CLAUDE.md`** - Contient TOUTE la documentation technique
2. **Ce document (`REPRISE-PROJET.md`)** - Vue d'ensemble infrastructure
3. **Structure du code** - Bien documentée, TypeScript strict
4. **API WordPress** - Fonction `fetchWithFallback` pour robustesse
5. **Conventions** - Commits en français, branches `claude/*`

**Points d'attention:**
- Le smooth scrolling (Lenis) est critique pour l'UX
- Les animations GSAP sont complexes mais bien organisées
- L'intégration WordPress ACF est le cœur du système de contenu
- **Le site est EN PRODUCTION sur https://www.leforage.fr/**
- Le contenu de la FAQ est en Lorem Ipsum et doit être remplacé dans WordPress

---

## 📊 Métriques & KPIs à Suivre

### En Production (Site déjà déployé)

**Performance:**
- Lighthouse Score (viser 90+)
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

**Analytics (GA4):**
- Visiteurs uniques
- Taux de rebond
- Durée de session
- Conversions (demandes de devis)

**Technique:**
- Taux d'erreur API WordPress
- Temps de revalidation ISR
- Bande passante Vercel
- Coût d'hébergement mensuel

---

**Document préparé pour faciliter la reprise du projet.**  
**Dernière mise à jour:** 24 septembre 2026  
**Contact:** thomas.bagnolati@gmail.com
