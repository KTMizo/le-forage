# 📋 Le Forage - Résumé du Projet

**Date de création:** 12 décembre 2025  
**Propriétaire:** KTMizo  
**Type:** Site web professionnel pour entreprise de forage géotechnique

---

## 🎯 Vue d'ensemble

Le Forage est un site web vitrine pour une entreprise française spécialisée dans le sondage géotechnique. Le site présente les services, le parc de machines, les certifications RSE, et permet aux clients de demander des devis.

---

## 🏗️ Architecture

### WordPress Headless CMS

Le projet utilise une architecture **headless** avec WordPress comme système de gestion de contenu (CMS) découplé :

**Backend WordPress:**
- **URL Admin:** `https://admin.leforage.fr`
- **API REST:** `https://admin.leforage.fr/wp-json/wp/v2`
- **Plugin ACF:** Advanced Custom Fields pour la structure de données
- **Endpoints utilisés:**
  - `/pages` - Pages du site
  - `/posts` - Articles
  - `/media` - Images et fichiers PDF

**Frontend Next.js:**
- Application React qui consomme l'API WordPress
- Rendu côté serveur (SSR) et régénération statique incrémentale (ISR)
- Revalidation des données toutes les heures (3600 secondes)

**Flux de données:**
```
WordPress (CMS)
    ↓ API REST
Next.js (Frontend)
    ↓ Build/Deploy
Vercel (Hébergement)
```

---

## 🔧 Stack Technique

### Framework & Langage
- **Next.js:** 15.1.6 (App Router)
- **React:** 19.0.0
- **TypeScript:** 5.x
- **Node.js:** 20.x minimum

### Styling
- **Tailwind CSS:** 4.1.11
- **CSS Modules:** Styles scopés par composant
- **Variables CSS:** Palette de couleurs et typographie personnalisées

### Animation
- **Lenis:** 1.3.8 (smooth scrolling)
- **GSAP:** 3.12.7 (animations avancées)
- **Framer Motion:** 12.3.1
- **Locomotive Scroll:** 4.1.4

### Données & API
- **Axios:** 1.7.9
- **WordPress REST API**

### Icons & UI
- **Lucide React:** 0.475.0

---

## 📦 Repository Git

### Informations

- **Plateforme:** GitHub
- **Propriétaire:** KTMizo
- **Repository:** le-forage
- **URL:** `https://github.com/KTMizo/le-forage`

### Convention de branches

```
claude/<description>-<session-id>
```

**Exemples:**
- `claude/fix-footer-button-style-01AXotjdfWJ4kpjrEkgJReAN`
- `claude/fix-svg-footer-overlap-01Pg9bg7UGoUxXoDAX5eQQpv`

### Convention de commits

**Format:** `Type: Description` (en français)

**Types:**
- `Fix` - Correction de bug
- `Refactor` - Refactorisation de code
- `Feature` - Nouvelle fonctionnalité
- `Update` - Mise à jour
- `Docs` - Documentation
- `Style` - Mise en forme
- `Test` - Tests

**Exemples:**
```
Fix: Corriger le z-index du SVG du footer pour permettre les clics sur les liens
Refactor: Remplacer les animations SplitText par des animations d'opacité simples
Docs: Ajouter le guide complet CLAUDE.md pour les assistants IA
```

---

## 🚀 Déploiement Vercel

### Configuration

Le projet est configuré pour être déployé sur **Vercel** (plateforme d'hébergement optimisée pour Next.js).

**Fichiers de configuration:**
- `.vercel/` - Dossier de configuration Vercel (ignoré par Git)
- `next.config.ts` - Configuration Next.js avec optimisations images

**Fonctionnalités Vercel utilisées:**
- Déploiement automatique depuis GitHub
- Preview deployments pour chaque PR
- Edge Functions pour les pages dynamiques
- Optimisation automatique des images
- CDN global

### Variables d'environnement

**Variables requises sur Vercel:**

```env
# WordPress API
NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2
WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2
WP_API_TOKEN=<token-optionnel>

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=<id-ga4>

# Optionnel
DISABLE_WORDPRESS=false
```

**Configuration dans Vercel:**
1. Settings → Environment Variables
2. Ajouter chaque variable pour Production, Preview, et Development
3. Redéployer après modification

---

## 📁 Structure du Projet

```
le-forage/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout racine
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── LenisProvider.tsx   # Provider smooth scroll
│   │   ├── mentions-legales/   # Page mentions légales
│   │   └── protection-donnees/ # Page RGPD
│   ├── components/             # Composants réutilisables
│   │   ├── UI/Button/          # Boutons
│   │   ├── UI/Menu/            # Menu hamburger
│   │   ├── Nav/                # Navigation
│   │   ├── Cards/              # Cartes (machines, services, etc.)
│   │   └── ...
│   ├── sections/               # Sections de page
│   │   ├── Hero/               # Section hero
│   │   ├── About/              # Section à propos
│   │   ├── Services/           # Section services
│   │   ├── RSE/                # Section RSE
│   │   ├── Machine/            # Catalogue machines
│   │   ├── FAQ/                # Section FAQ
│   │   └── Footer/             # Footer
│   ├── lib/
│   │   └── api.ts              # Fonctions API WordPress
│   ├── types/                  # Définitions TypeScript
│   │   ├── wordpress.ts        # Types WordPress
│   │   └── modules/            # Types par module
│   └── styles/                 # Styles globaux
│       ├── globals.css         # Styles + Tailwind + Variables
│       ├── variables.css       # Variables CSS
│       └── reset.css           # Reset CSS
├── public/
│   └── assets/
│       ├── fonts/              # Articulat CF, Bebas Neue
│       ├── images/             # Images statiques
│       ├── svg/                # Icônes SVG
│       └── pdf/                # Fiches techniques machines
├── CLAUDE.md                   # Guide pour assistants IA
├── PROJET-RESUME.md            # Ce document
├── package.json                # Dépendances
├── tsconfig.json               # Config TypeScript
├── next.config.ts              # Config Next.js
└── tailwind.config.js          # Config Tailwind (implicite)
```

---

## 🎨 Design & Branding

### Palette de couleurs

```css
--color-red: #ab2325      /* Accent principal (rouge) */
--color-beige: #f9f1ea    /* Fond */
--color-bleu: #003b87     /* Accent secondaire (bleu) */
--color-black: #000000    /* Texte */
--color-white: #ffffff    /* Blanc */
```

### Typographie

- **Police principale:** Articulat CF (Regular, Medium, DemiBold)
- **Police d'affichage:** Bebas Neue (Regular)

### Responsive Design

- **Mobile:** 375px base
- **Tablette:** 768px
- **Desktop:** 1920px
- **Large screens:** 1921px+ (taille de police fixe)

**Breakpoints Tailwind:**
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px
- `3xl:` 1920px
- `4xl:` 1921px+

---

## 📄 Contenu WordPress (ACF)

### Sections du site (page "home")

**Hero:**
- Titre
- Description
- Bouton CTA (texte, URL, variant, showArrow)

**About:**
- Sous-titre
- Texte en surbrillance
- Texte principal
- Image principale
- Compétences (skills):
  - Icône
  - Titre
  - Description

**Services:**
- Titre de section
- Services (répéteur):
  - Titre du service
  - Image
  - Questions (sous-répéteur):
    - Question
    - Image (optionnelle)
    - Zone de texte (description)

**RSE (Responsabilité Sociale):**
- En-tête (tag_title, main_title)
- Contenu (description, method_note)
- Cartes de sécurité (répéteur)
- Cartes de qualifications (répéteur)

**Machines:**
- En-tête de section
- Machines (répéteur):
  - Image
  - Titre
  - Fiche technique (PDF)
  - Bouton de téléchargement

**FAQ:**
- Titre
- Image de couverture
- Items FAQ (répéteur):
  - Question
  - Réponse

**Footer:**
- Carte de contact (titre, bouton)
- Informations légales (entreprise, liens légaux)

**Image Breaks (séparations):**
- Image entre Hero et About
- Image entre Services et RSE
- Paramètres (qualité, priorité, force parallaxe)

---

## 🔌 Intégration WordPress

### Fonctions API principales

Toutes les fonctions se trouvent dans `src/lib/api.ts` :

```typescript
getHeroData()              // Données section Hero
getTitleAboutData()        // Titre section About
getAboutData()             // Données section About
getServicesData()          // Services
getRSERelatedData(slug)    // Données RSE
getMachineData()           // Catalogue machines
getFaqData(slug)           // FAQ
getFooterData()            // Footer
getImageBreakData()        // Images de séparation
getPage(slug)              // Page générique
```

### Gestion des erreurs

- **Fallback data:** Données par défaut pour chaque section
- **Try/catch:** Gestion des erreurs d'API
- **Console warnings:** Logs des problèmes de connexion
- **Revalidation ISR:** 3600 secondes (1 heure)

### Images WordPress

- Récupération par ID média
- Résolution en URL complète
- Métadonnées (alt, width, height)
- Optimisation Next.js Image

---

## ⚙️ Commandes de développement

```bash
# Installation
npm install

# Développement local (http://localhost:3000)
npm run dev

# Build production
npm run build

# Serveur production local
npm start

# Linting
npm run lint
```

---

## 🌐 URLs Importantes

### Production
- **Site web:** (à définir après déploiement Vercel)
- **WordPress Admin:** `https://admin.leforage.fr/wp-admin`
- **API WordPress:** `https://admin.leforage.fr/wp-json/wp/v2`

### Développement
- **Local:** `http://localhost:3000`
- **WordPress API:** `https://admin.leforage.fr/wp-json/wp/v2` (même en dev)

### Git & Déploiement
- **GitHub:** `https://github.com/KTMizo/le-forage`
- **Vercel Dashboard:** (lien à obtenir après configuration Vercel)

---

## 🔐 Accès & Credentials

### WordPress
- **URL Admin:** `https://admin.leforage.fr/wp-admin`
- **Utilisateur:** (à demander au propriétaire)
- **Token API:** Variable `WP_API_TOKEN` (optionnel)

### Vercel
- **Compte:** Lié au compte GitHub de KTMizo
- **Projet:** le-forage
- **Accès:** Via GitHub OAuth

### GitHub
- **Repository:** `KTMizo/le-forage`
- **Accès:** Membres de l'organisation KTMizo

---

## 📊 Fonctionnalités Principales

### Côté Utilisateur
1. **Smooth Scrolling** - Navigation fluide avec Lenis
2. **Animations** - GSAP, Framer Motion, Locomotive Scroll
3. **Responsive Design** - Mobile, tablette, desktop
4. **Accordéons FAQ** - Ouverture/fermeture animée
5. **Popups RSE** - Modales pour certifications
6. **Catalogue Machines** - Cartes avec téléchargement PDF
7. **Navigation sticky** - Menu qui disparaît au scroll vers le bas
8. **Progress bar** - Indicateur de progression de scroll

### Côté Technique
1. **ISR Next.js** - Régénération toutes les heures
2. **TypeScript strict** - Typage fort
3. **CSS Modules** - Styles scopés
4. **Optimisation images** - Next.js Image avec domaines autorisés
5. **SEO** - Métadonnées pour chaque page
6. **Google Analytics** - Tracking GA4
7. **Fonts personnalisées** - Articulat CF, Bebas Neue
8. **SVG inline** - Via @svgr/webpack

---

## 🐛 Problèmes Connus & Solutions

### WordPress API indisponible
**Solution:** Fallback data dans toutes les fonctions API

### Images ne chargent pas
**Solution:** Vérifier domaines dans `next.config.ts`
```typescript
images: {
  domains: ['localhost', 'admin.leforage.fr']
}
```

### Smooth scroll ne fonctionne pas
**Solution:** Vérifier LenisProvider dans layout.tsx

### Erreurs TypeScript
**Solution:** Vérifier types dans `/src/types/modules/`

---

## 📝 Workflow de Développement

### Nouvelle fonctionnalité

1. **Créer une branche:** `claude/feature-name-session-id`
2. **Développer** avec commits réguliers en français
3. **Tester localement:** `npm run dev`
4. **Build:** `npm run build` pour vérifier
5. **Push:** `git push -u origin branch-name`
6. **Pull Request** sur GitHub
7. **Review & Merge**
8. **Déploiement automatique** sur Vercel après merge

### Mise à jour de contenu

1. **Se connecter** à WordPress admin
2. **Modifier** la page "home" ou créer du contenu
3. **Sauvegarder** les modifications
4. **Attendre** la revalidation (max 1 heure) ou redéployer manuellement

---

## 📞 Contacts & Support

### Propriétaire du Projet
- **GitHub:** KTMizo
- **Repository:** https://github.com/KTMizo/le-forage

### Documentation
- **Guide Développeur:** `CLAUDE.md`
- **Ce document:** `PROJET-RESUME.md`
- **README:** `README.md`

### Ressources Externes
- **Next.js:** https://nextjs.org/docs
- **WordPress REST API:** https://developer.wordpress.org/rest-api
- **Vercel:** https://vercel.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 🔄 Prochaines Étapes Recommandées

### Configuration Initiale (si pas encore fait)
- [ ] Configurer le projet sur Vercel
- [ ] Lier le repository GitHub à Vercel
- [ ] Ajouter les variables d'environnement sur Vercel
- [ ] Effectuer le premier déploiement
- [ ] Configurer le domaine personnalisé

### Améliorations Futures
- [ ] Ajouter un formulaire de contact
- [ ] Implémenter l'envoi d'emails pour les devis
- [ ] Ajouter des tests unitaires
- [ ] Améliorer le SEO (sitemap, robots.txt)
- [ ] Ajouter un blog (utiliser posts WordPress)
- [ ] Optimiser les performances (Lighthouse score)
- [ ] Ajouter un système de multilangue (EN/FR)

### Maintenance
- [ ] Mettre à jour les dépendances régulièrement
- [ ] Vérifier les liens WordPress API
- [ ] Surveiller les erreurs Vercel
- [ ] Backup régulier de WordPress
- [ ] Monitoring des performances

---

## 📚 Glossaire

**ACF:** Advanced Custom Fields - Plugin WordPress pour créer des champs personnalisés

**Headless CMS:** CMS découplé où le backend (WordPress) est séparé du frontend (Next.js)

**ISR:** Incremental Static Regeneration - Régénération statique incrémentale de Next.js

**SSR:** Server-Side Rendering - Rendu côté serveur

**App Router:** Nouveau système de routing de Next.js 13+

**CSS Modules:** Système de CSS scopé par composant

**Smooth Scroll:** Défilement fluide et animé

**REST API:** API basée sur HTTP pour accéder aux données

**Revalidation:** Rafraîchissement des données statiques dans Next.js

**Fallback Data:** Données par défaut en cas d'erreur API

---

**Document créé le:** 12 décembre 2025  
**Dernière mise à jour:** 12 décembre 2025  
**Version:** 1.0.0
