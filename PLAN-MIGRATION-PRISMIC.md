# 🚀 Plan de Migration WordPress → Prismic

**Date de création:** 24 septembre 2026  
**Projet:** Le Forage  
**Objectif:** Migrer de WordPress vers Prismic sans impact SEO ni interruption de service  
**Site actuel:** https://www.leforage.fr/

---

## 🎯 Pourquoi Prismic ?

### Avantages de Prismic vs WordPress

**Prismic:**
- ✅ Headless CMS moderne et rapide
- ✅ API GraphQL et REST
- ✅ Interface d'édition plus moderne
- ✅ Pas de serveur à maintenir (SaaS)
- ✅ Versioning natif du contenu
- ✅ Preview en temps réel
- ✅ CDN intégré pour les médias
- ✅ Webhooks pour rebuild automatique
- ✅ Prix transparent (gratuit jusqu'à 2 utilisateurs)
- ✅ **IA pour création de schémas** (nouveau)

**WordPress actuel:**
- ❌ Nécessite maintenance serveur
- ❌ Sécurité à gérer
- ❌ Mises à jour plugins
- ❌ Performance variable
- ❌ Coût hébergement

---

## 📋 Plan de Migration - Vue d'Ensemble

### Phase 1: Préparation (Priorité 1) ⏱️ 1-2 jours
1. Récupérer tous les accès
2. Audit du contenu WordPress actuel
3. Créer compte Prismic
4. Setup projet local

### Phase 2: Analyse & Nettoyage Code (Priorité 2) ⏱️ 2-3 jours
1. Reprendre le code localement
2. Identifier les problèmes
3. Nettoyer et améliorer le code
4. Documenter les points à améliorer

### Phase 3: Configuration Prismic (Priorité 3) ⏱️ 2-3 jours
1. Créer les Custom Types (équivalent ACF)
2. Configurer les champs avec l'IA Prismic
3. Migrer les médias
4. Migrer le contenu

### Phase 4: Adaptation Code (Priorité 4) ⏱️ 3-5 jours
1. Remplacer API WordPress par Prismic
2. Adapter les types TypeScript
3. Tester en local
4. Optimiser les performances

### Phase 5: Déploiement (Priorité 5) ⏱️ 1-2 jours
1. Déploiement en preview
2. Tests complets
3. Migration DNS (zero downtime)
4. Monitoring

**Durée totale estimée:** 9-15 jours de développement

---

## 🔥 PHASE 1: PRÉPARATION (START HERE)

### Étape 1.1: Récupération des Accès ⚡ PRIORITÉ TOP

**À récupérer immédiatement:**

#### GitHub
- [x] Accès au repository: https://github.com/KTMizo/le-forage
- [ ] Cloner en local
- [ ] Vérifier les branches

#### OVH
- [ ] **Login OVH:** https://www.ovh.com/manager/
- [ ] Email: thomas.bagnolati@gmail.com
- [ ] Récupérer mot de passe ou réinitialiser
- [ ] Noter configuration DNS actuelle
- [ ] Vérifier date expiration domaine

#### Vercel
- [ ] **Login Vercel:** https://vercel.com/dashboard
- [ ] Email: thomas.bagnolati@gmail.com
- [ ] Récupérer mot de passe ou réinitialiser
- [ ] Noter les variables d'environnement
- [ ] Télécharger les logs si nécessaire

#### WordPress
- [ ] **Login WordPress:** https://admin.leforage.fr/wp-admin
- [ ] Récupérer identifiants admin
- [ ] **EXPORT COMPLET DU CONTENU** (voir étape 1.2)
- [ ] Prendre screenshots de tous les champs ACF

#### Google Analytics
- [ ] **Login Analytics:** https://analytics.google.com
- [ ] Vérifier accès avec thomas.bagnolati@gmail.com
- [ ] Noter l'ID: G-9XPYMXJKWN

---

### Étape 1.2: Audit & Export WordPress 📊

**Contenu à auditer et exporter:**

#### 1. Structure ACF (Advanced Custom Fields)

**Sections à documenter:**

```
Page "home" avec ACF:
├── Hero
│   ├── title (texte)
│   ├── description (textarea)
│   └── button (groupe)
│       ├── text
│       ├── url
│       ├── variant
│       └── showArrow
├── About
│   ├── subtitle
│   ├── highlight
│   ├── main_text
│   ├── about_image (image)
│   └── about_skills (répéteur)
│       ├── icon (image)
│       ├── title
│       └── description
├── Services
│   ├── services_title
│   └── services (répéteur)
│       ├── title
│       ├── image
│       └── questions (sous-répéteur)
│           ├── question
│           ├── img
│           └── zone_de_texte
├── RSE
│   ├── rse_header
│   ├── rse_content
│   ├── security_cards (répéteur)
│   └── qualifications_cards (répéteur)
├── Machines
│   ├── machines_section_header
│   └── machines (répéteur)
│       ├── image
│       ├── title
│       └── technical_sheet (PDF)
├── FAQ
│   ├── faq_title
│   ├── faq_cover_image
│   └── faq_items (répéteur)
│       ├── question
│       └── answer
├── Footer
│   └── footer_card
│       ├── title
│       └── button
└── Image Breaks
    ├── hero_about_break
    └── services_rse_break
```

**Action à faire:**
```bash
# Dans WordPress admin
1. Aller dans ACF > Groupes de champs
2. Pour chaque groupe, cliquer sur "Export"
3. Télécharger le JSON
4. Sauvegarder dans un dossier local: ./migration/acf-exports/
```

#### 2. Export du Contenu

**Via WordPress Dashboard:**

```bash
# Méthode 1: Export WordPress natif
Outils > Exporter > Tout le contenu > Télécharger le fichier d'export
→ Sauvegarder dans ./migration/wordpress-export.xml

# Méthode 2: Export ACF JSON
ACF > Outils > Export > Tout sélectionner > Générer le code d'export
→ Sauvegarder dans ./migration/acf-fields.json
```

#### 3. Export des Médias

**Méthode manuelle:**
```bash
# Lister toutes les images utilisées
1. Aller dans Médias
2. Noter les URLs de toutes les images
3. Télécharger via FTP/SFTP si accès
   OU
4. Télécharger via l'API WordPress (script à créer)
```

**Script d'export des médias (à créer):**
```typescript
// scripts/export-wordpress-media.ts
// Script pour télécharger toutes les images WordPress
```

#### 4. Documentation Complète

**Créer un fichier `./migration/WORDPRESS-AUDIT.md`:**
```markdown
# Audit WordPress - Le Forage

## Structure des données
[Copier la structure ACF ci-dessus]

## URLs des images
- Hero: ...
- About: ...
- etc.

## Contenu textuel
[Copier tout le texte de chaque section]

## Fichiers PDF
- Machine 1: URL du PDF
- Machine 2: URL du PDF
- etc.
```

---

### Étape 1.3: Création Compte Prismic 🆕

**1. Créer le compte:**

```bash
URL: https://prismic.io/
Email: thomas.bagnolati@gmail.com
Plan: Free (2 users, parfait pour démarrer)
```

**2. Créer le repository:**
```
Nom: le-forage
Region: Europe (pour RGPD)
Language: French
```

**3. Installer Prismic CLI:**
```bash
npm install -g @prismicio/cli
prismic login
```

---

### Étape 1.4: Setup Projet Local 💻

**1. Cloner le repository:**
```bash
git clone https://github.com/KTMizo/le-forage.git
cd le-forage
```

**2. Installer les dépendances:**
```bash
npm install
```

**3. Créer `.env.local` avec les variables actuelles:**
```env
# WordPress (ancien - à garder temporairement)
NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2
WORDPRESS_API_URL=https://admin.leforage.fr/wp-json/wp/v2

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9XPYMXJKWN

# Prismic (nouveau - à ajouter)
PRISMIC_REPOSITORY_NAME=le-forage
PRISMIC_ACCESS_TOKEN=<à récupérer après création>
```

**4. Tester que tout fonctionne:**
```bash
npm run dev
# → http://localhost:3000
```

**5. Créer une branche de migration:**
```bash
git checkout -b migration/wordpress-to-prismic
```

---

## 🧹 PHASE 2: ANALYSE & NETTOYAGE CODE

### Étape 2.1: Audit du Code Actuel

**Points à vérifier:**

#### Performance
```bash
# Lancer un audit Lighthouse
npm run build
npm start
# Puis dans Chrome DevTools > Lighthouse
```

#### Code Quality
```bash
# Vérifier les erreurs TypeScript
npm run build

# Linter
npm run lint
```

#### Problèmes Identifiés à Documenter

**Créer `./migration/CODE-ISSUES.md`:**
```markdown
# Problèmes & Améliorations Code

## Problèmes critiques
- [ ] ...

## Améliorations performance
- [ ] ...

## Refactoring nécessaire
- [ ] ...

## Types TypeScript à améliorer
- [ ] ...
```

---

### Étape 2.2: Nettoyage du Code

**Actions de nettoyage:**

1. **Supprimer le code inutilisé:**
```bash
# Chercher les imports non utilisés
npx depcheck

# Chercher le code mort
npx ts-prune
```

2. **Améliorer les types TypeScript:**
```typescript
// Exemple: Rendre les types plus stricts
// Avant
interface Button {
  text: string;
  url: string;
  variant?: any; // ❌ any
}

// Après
interface Button {
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline'; // ✅ union type
}
```

3. **Optimiser les images:**
```typescript
// Vérifier que toutes les images utilisent next/image
// Pas de <img> en dur
```

4. **Simplifier les composants:**
```typescript
// Identifier les composants trop complexes
// Extraire la logique métier
```

---

## 🎨 PHASE 3: CONFIGURATION PRISMIC

### Étape 3.1: Installer Prismic dans le Projet

```bash
# Installer les packages Prismic
npm install @prismicio/client @prismicio/next
npm install -D @prismicio/types slice-machine-ui
```

---

### Étape 3.2: Créer les Custom Types avec l'IA Prismic ✨

**Prismic propose une IA pour créer les schémas !**

**1. Utiliser l'IA Prismic:**

```
Dans Prismic Dashboard:
1. Aller dans "Custom Types"
2. Cliquer sur "Create with AI" (nouveau)
3. Fournir le contexte
```

**Prompt pour l'IA Prismic:**

```
Je migre un site Next.js depuis WordPress ACF vers Prismic.

Voici la structure de données actuelle:

Page "home" avec les sections suivantes:

1. HERO
- title: texte simple
- description: texte long
- button: groupe avec text, url, variant (primary/secondary/outline), showArrow (boolean)

2. ABOUT
- subtitle: texte simple
- highlight: texte simple
- main_text: texte long
- about_image: image avec alt, width, height
- about_skills: répéteur (4 items) avec:
  - icon: image
  - title: texte
  - description: texte

3. SERVICES
- services_title: texte
- services: répéteur avec:
  - title: texte
  - image: image
  - questions: sous-répéteur avec:
    - question: texte
    - img: image (optionnelle)
    - zone_de_texte: rich text

4. RSE (Responsabilité Sociale)
- rse_header: groupe (tag_title, main_title)
- rse_content: groupe (description, method_note)
- security_cards: répéteur
- qualifications_cards: répéteur

5. MACHINES
- machines_section_header: groupe (tag_title, main_title)
- machines: répéteur avec:
  - image: image
  - title: texte
  - technical_sheet: lien vers PDF

6. FAQ
- faq_title: texte
- faq_cover_image: image
- faq_items: répéteur avec:
  - question: texte
  - answer: rich text

7. FOOTER
- footer_card: groupe avec title et button

8. IMAGE BREAKS
- hero_about_break: groupe avec image et params (quality, priority, parallax_strength)
- services_rse_break: idem

Crée-moi les Custom Types Prismic correspondants.
```

**2. Ajustements manuels si nécessaire:**

Si l'IA ne génère pas exactement ce qu'il faut, ajuster manuellement dans l'interface Prismic.

---

### Étape 3.3: Structure Prismic Recommandée

**Custom Type: `page_home`**

```json
{
  "Main": {
    "uid": {
      "type": "UID",
      "config": {
        "label": "UID"
      }
    },
    "hero": {
      "type": "Group",
      "config": {
        "fields": {
          "title": { "type": "Text" },
          "description": { "type": "Text" },
          "button": {
            "type": "Group",
            "config": {
              "fields": {
                "text": { "type": "Text" },
                "url": { "type": "Link" },
                "variant": { 
                  "type": "Select",
                  "options": ["primary", "secondary", "outline"]
                },
                "showArrow": { "type": "Boolean" }
              }
            }
          }
        }
      }
    },
    "about": {
      "type": "Group",
      "config": {
        "fields": {
          "subtitle": { "type": "Text" },
          "highlight": { "type": "Text" },
          "main_text": { "type": "Text" },
          "about_image": { "type": "Image" },
          "about_skills": {
            "type": "Group",
            "config": {
              "fields": {
                "icon": { "type": "Image" },
                "title": { "type": "Text" },
                "description": { "type": "Text" }
              },
              "repeat": true
            }
          }
        }
      }
    }
    // ... autres sections
  }
}
```

**Note:** Prismic propose aussi des **Slices** pour des sections répétables - à considérer pour une structure plus flexible.

---

### Étape 3.4: Migration des Médias

**1. Uploader les images dans Prismic:**

```bash
# Via l'interface Prismic Media Library
1. Aller dans Media Library
2. Upload toutes les images depuis ./migration/images/
3. Organiser par dossier (hero, about, services, etc.)
```

**2. Script de migration automatique (optionnel):**

```typescript
// scripts/migrate-media-to-prismic.ts
import * as prismic from '@prismicio/client';

const client = prismic.createClient('le-forage');

async function migrateImages() {
  // Lire les images locales
  // Uploader vers Prismic via API
  // Logger les nouveaux IDs
}
```

---

### Étape 3.5: Migration du Contenu

**Option 1: Manuelle (Recommandé pour le premier essai)**

```
Dans Prismic Dashboard:
1. Créer un nouveau document "page_home"
2. Remplir chaque champ avec le contenu WordPress
3. Utiliser l'audit WordPress comme référence
4. Tester le preview en temps réel
```

**Option 2: Script de migration (Pour production)**

```typescript
// scripts/migrate-content-to-prismic.ts
import * as prismic from '@prismicio/client';

// Lire le contenu WordPress exporté
// Transformer au format Prismic
// Créer les documents via API
```

---

## 💻 PHASE 4: ADAPTATION DU CODE

### Étape 4.1: Configuration Prismic dans Next.js

**1. Créer `prismicio.ts` à la racine:**

```typescript
// prismicio.ts
import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

export const repositoryName = 
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || 'le-forage';

const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'page_home',
    path: '/',
  },
];

export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
```

**2. Créer `slicemachine.config.json`:**

```json
{
  "repositoryName": "le-forage",
  "adapter": "@slicemachine/adapter-next",
  "libraries": ["./slices"]
}
```

---

### Étape 4.2: Remplacer l'API WordPress par Prismic

**Avant (WordPress):**

```typescript
// src/lib/api.ts
export async function getHeroData(): Promise<HeroData> {
  const pageData = await getPageData('home');
  return {
    title: pageData.acf?.title || '',
    description: pageData.acf?.description || '',
    // ...
  };
}
```

**Après (Prismic):**

```typescript
// src/lib/prismic.ts
import { createClient } from '@/prismicio';

export async function getHeroData(): Promise<HeroData> {
  const client = createClient();
  const page = await client.getSingle('page_home');
  
  return {
    title: page.data.hero.title || '',
    description: page.data.hero.description || '',
    button: {
      text: page.data.hero.button.text,
      url: page.data.hero.button.url,
      variant: page.data.hero.button.variant,
      showArrow: page.data.hero.button.showArrow,
    },
  };
}
```

---

### Étape 4.3: Mettre à Jour les Types TypeScript

**Générer les types depuis Prismic:**

```bash
npx @slicemachine/init
npx prismic-ts-codegen
```

**Cela génère automatiquement:**
```typescript
// prismicio-types.d.ts
// Types générés automatiquement depuis Prismic
```

**Adapter les types existants:**

```typescript
// src/types/modules/hero.ts
import type { PageHomeDocumentData } from '@/prismicio-types';

export type HeroData = PageHomeDocumentData['hero'];
```

---

### Étape 4.4: Migration Progressive (Stratégie)

**Option A: Big Bang (tout d'un coup)**
- ❌ Risqué
- ❌ Downtime potentiel
- ✅ Plus rapide

**Option B: Migration progressive (RECOMMANDÉ)**
- ✅ Zero downtime
- ✅ Rollback facile
- ✅ Test en production

**Stratégie de migration progressive:**

```typescript
// src/lib/api.ts
const USE_PRISMIC = process.env.NEXT_PUBLIC_USE_PRISMIC === 'true';

export async function getHeroData(): Promise<HeroData> {
  if (USE_PRISMIC) {
    return getHeroDataFromPrismic();
  }
  return getHeroDataFromWordPress();
}
```

**Variables d'environnement:**
```env
# Phase de test
NEXT_PUBLIC_USE_PRISMIC=false

# Après validation
NEXT_PUBLIC_USE_PRISMIC=true
```

---

### Étape 4.5: Tests Complets

**1. Tests en local:**
```bash
# Démarrer avec Prismic
NEXT_PUBLIC_USE_PRISMIC=true npm run dev

# Vérifier:
- Toutes les sections s'affichent
- Les images se chargent
- Les liens fonctionnent
- Les animations marchent
- Responsive OK
```

**2. Tests de performance:**
```bash
npm run build
npm start

# Lighthouse audit
# Comparer avec l'ancienne version WordPress
```

**3. Tests SEO:**
```bash
# Vérifier que:
- Les meta tags sont identiques
- Les URLs restent les mêmes
- Le sitemap est à jour
- Les images ont des alt text
```

---

## 🚀 PHASE 5: DÉPLOIEMENT

### Étape 5.1: Déploiement Preview sur Vercel

**1. Créer une Preview Deployment:**

```bash
# Push la branche migration
git add .
git commit -m "Migration: Prismic integration complete"
git push origin migration/wordpress-to-prismic
```

**2. Dans Vercel:**
```
- Vercel créera automatiquement une preview URL
- Exemple: le-forage-git-migration-wordpress-to-prismic.vercel.app
```

**3. Configurer les variables d'environnement sur Vercel:**
```
Settings → Environment Variables → Preview

NEXT_PUBLIC_USE_PRISMIC=true
PRISMIC_REPOSITORY_NAME=le-forage
PRISMIC_ACCESS_TOKEN=<token>
```

**4. Tester intensivement sur la preview:**
- [ ] Navigation complète
- [ ] Toutes les sections
- [ ] Responsive mobile/tablet/desktop
- [ ] Performances
- [ ] SEO
- [ ] Analytics

---

### Étape 5.2: Migration DNS (Zero Downtime) 🎯

**Stratégie de migration sans interruption:**

**Option 1: Blue-Green Deployment**

```
Ancien (Blue):          Nouveau (Green):
WordPress → Vercel      Prismic → Vercel
www.leforage.fr         new.leforage.fr (test)
     ↓                       ↓
  [Basculement DNS instantané]
```

**Étapes:**
1. Le nouveau site Prismic tourne sur une URL temporaire
2. Tests complets sur new.leforage.fr
3. Basculement DNS OVH: www.leforage.fr → nouveau Vercel
4. L'ancien reste accessible en rollback

**Option 2: Feature Flag (PLUS SÛR)**

```typescript
// Déployer le code avec les deux systèmes
// Activer Prismic progressivement

// Étape 1: 10% du trafic sur Prismic
if (Math.random() < 0.1) {
  return getPrismicData();
}
return getWordPressData();

// Étape 2: 50% du trafic
// Étape 3: 100% du trafic
```

---

### Étape 5.3: Procédure de Basculement

**Préparation (J-1):**
```bash
# 1. Backup complet WordPress
- Export ACF
- Export contenu
- Download toutes les images
- Screenshots de tout

# 2. Vérifier Prismic production
- Tout le contenu est présent
- Toutes les images sont uploadées
- Preview fonctionne parfaitement

# 3. Préparer le rollback
- Garder les anciennes variables d'env
- Documenter comment revenir en arrière
```

**Jour J (Migration):**

**09:00 - Préparation**
```bash
# 1. Dernière synchro contenu WordPress → Prismic
# 2. Déploiement final sur Vercel
# 3. Vérification preview URL
```

**10:00 - Basculement DNS**
```bash
# Dans OVH Manager:
1. Aller dans Domaines → www.leforage.fr
2. Noter la config DNS actuelle
3. Modifier le CNAME/A record vers nouvelle URL Vercel
4. TTL: réduire à 60 secondes (temporaire)
5. Sauvegarder
```

**10:05 - Monitoring**
```bash
# Surveiller:
- Analytics temps réel
- Logs Vercel
- Temps de réponse
- Erreurs éventuelles
```

**10:30 - Vérification**
```bash
# Tester le site:
- Cache DNS propagé ? (dig www.leforage.fr)
- Site accessible ?
- Contenu correct ?
- Images chargent ?
- Analytics fonctionne ?
```

**11:00 - Stabilisation**
```bash
# Si tout OK:
- Remonter le TTL DNS à 3600 (1h)
- Continuer monitoring 24h
- Documenter tout problème

# Si problème:
- Rollback DNS immédiat
- Analyser les logs
- Corriger
- Retry
```

---

### Étape 5.4: Configuration Post-Migration

**1. Webhooks Prismic → Vercel:**

```
Dans Prismic:
Settings → Webhooks → Add Webhook

URL: https://vercel.com/api/webhook/xxx (récupérer dans Vercel)
Secret: <générer un secret>
Triggers: 
  - Document published
  - Document unpublished
```

**2. Revalidation automatique:**

```typescript
// pages/api/revalidate.ts
export default async function handler(req, res) {
  // Vérifier le secret
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate('/');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
```

**3. Mettre à jour Google Analytics:**
```
Aucun changement nécessaire - GA4 reste identique
```

---

## 📊 CHECKLIST FINALE PRÉ-MIGRATION

### Infrastructure ✅
- [ ] Accès OVH récupéré
- [ ] Accès Vercel récupéré
- [ ] Accès WordPress récupéré
- [ ] Compte Prismic créé
- [ ] Repository Prismic configuré

### Contenu ✅
- [ ] Export WordPress complet
- [ ] Toutes les images téléchargées
- [ ] Structure ACF documentée
- [ ] Contenu migré dans Prismic
- [ ] Médias uploadés dans Prismic

### Code ✅
- [ ] Code local à jour
- [ ] Branche migration créée
- [ ] Packages Prismic installés
- [ ] Custom Types créés dans Prismic
- [ ] API Prismic implémentée
- [ ] Types TypeScript mis à jour
- [ ] Tests en local passés

### Déploiement ✅
- [ ] Preview Vercel fonctionnelle
- [ ] Variables d'environnement configurées
- [ ] Webhooks Prismic configurés
- [ ] Plan de rollback documenté
- [ ] Backup WordPress fait

### SEO & Performance ✅
- [ ] Meta tags identiques
- [ ] URLs restent les mêmes
- [ ] Lighthouse score OK
- [ ] Images optimisées
- [ ] Sitemap à jour

---

## 🆘 PLAN DE ROLLBACK

**Si problème après migration:**

### Rollback DNS (5 minutes)
```bash
# Dans OVH:
1. Revenir à l'ancienne config DNS
2. Sauvegarder
3. Attendre propagation (quelques minutes)
```

### Rollback Code (10 minutes)
```bash
# Dans Vercel:
1. Deployments → Previous deployment
2. Click "Promote to Production"
```

### Rollback Variables d'Environnement
```env
# Remettre:
NEXT_PUBLIC_USE_PRISMIC=false
```

---

## 💰 COÛTS ESTIMÉS

### Prismic
- **Free Plan:** Gratuit jusqu'à 2 utilisateurs
- **Starter Plan:** 7€/mois (si besoin plus tard)
- **Médias:** Inclus (CDN gratuit)

### Vercel
- **Hobby:** Gratuit (probablement suffisant)
- **Pro:** 20$/mois (si besoin plus de performance)

### OVH
- **Domaine .fr:** ~10-15€/an (inchangé)

### WordPress (À supprimer après migration)
- **Hébergement:** Économie de X€/mois

**Coût total post-migration:** 0-7€/mois + 10-15€/an domaine

---

## 📚 RESSOURCES

### Documentation
- **Prismic:** https://prismic.io/docs/nextjs
- **Prismic + Next.js:** https://prismic.io/docs/technologies/nextjs
- **Prismic TypeScript:** https://prismic.io/docs/typescript
- **Slice Machine:** https://prismic.io/docs/slice-machine

### Tutoriels
- **Migration Guide:** https://prismic.io/blog/migrate-to-prismic
- **Next.js Integration:** https://prismic.io/docs/nextjs-define-data

### Support
- **Prismic Community:** https://community.prismic.io/
- **Discord Prismic:** https://prismic.io/discord

---

## 🎯 PROCHAINES ÉTAPES IMMÉDIATES

### À faire MAINTENANT (Ordre de priorité)

1. **✅ Récupérer TOUS les accès** (1-2h)
   - OVH, Vercel, WordPress, GitHub

2. **✅ Cloner le projet localement** (15min)
   ```bash
   git clone https://github.com/KTMizo/le-forage.git
   cd le-forage
   npm install
   npm run dev
   ```

3. **✅ Export WordPress** (1h)
   - Export ACF JSON
   - Export contenu
   - Télécharger toutes les images
   - Documenter la structure

4. **✅ Créer compte Prismic** (30min)
   - Sign up sur https://prismic.io/
   - Créer repository "le-forage"
   - Récupérer l'access token

5. **✅ Créer les Custom Types avec l'IA** (2-3h)
   - Utiliser l'IA Prismic
   - Fournir la structure ACF
   - Ajuster si nécessaire

6. **🔄 Migrer le contenu** (3-4h)
   - Créer document "page_home"
   - Remplir tous les champs
   - Uploader les images
   - Vérifier preview

7. **💻 Adapter le code** (2-3 jours)
   - Installer packages Prismic
   - Créer prismicio.ts
   - Remplacer API WordPress
   - Mettre à jour types
   - Tester en local

8. **🚀 Déployer en preview** (1h)
   - Push branche migration
   - Configurer variables Vercel
   - Tester preview URL

9. **✅ Migration production** (1 journée)
   - Vérifications finales
   - Basculement DNS
   - Monitoring

---

**Ce plan vous guide étape par étape pour une migration réussie WordPress → Prismic sans impact SEO ni interruption de service.**

**Bon courage pour la migration ! 🚀**

---

**Document créé le:** 24 septembre 2026  
**Dernière mise à jour:** 24 septembre 2026  
**Contact:** thomas.bagnolati@gmail.com
