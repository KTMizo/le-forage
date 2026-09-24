# Guide de migration WordPress → Prismic (version corrigée)

Ce guide remplace la partie « déroulé » de `PLAN-MIGRATION-PRISMIC.md`
(branche `claude/claude-md-…`). Il s'appuie sur le code réel et sur un export
du WordPress de production fait le 24/09/2026 (dossier `wordpress-export/`).

---

## 1. Ce qui change par rapport au plan initial

| Plan initial | En réalité |
|---|---|
| Bascule DNS OVH, blue-green, `new.leforage.fr`, TTL à 60 s | **Aucun changement DNS.** `www.leforage.fr` pointe déjà sur Vercel. On change seulement la source des données dans le code, sur le même projet Vercel. |
| Répartition du trafic avec `Math.random()` | À ne pas faire : avec l'ISR, la page mise en cache mélangerait les deux sources. On bascule avec une variable d'environnement (`CMS_SOURCE`). |
| Export manuel du contenu et des images | **Déjà fait** : l'API WordPress est publique, j'ai exporté les 3 pages et la liste des 34 médias. Les images seront importées dans Prismic directement depuis leur URL, par le script. |
| Saisie manuelle dans Prismic ou « IA Prismic » | Modèles créés avec la CLI `prismic` et versionnés dans `customtypes/`, puis contenu importé par script avec l'API Migration. Rien à ressaisir. (Slice Machine est désormais obsolète : on ne l'utilise pas.) |
| `@prismicio/types`, `pages/api/revalidate.ts` | Paquet obsolète (les types sont dans `@prismicio/client`), et le projet utilise l'App Router : ce sera `src/app/api/revalidate/route.ts` avec `revalidateTag`. |
| Seule la home est migrée | Il faut aussi migrer **`/mentions-legales` et `/protection-donnees`**, qui lisent aussi WordPress (`getPage()`). |

---

## 2. Ce que tu dois récupérer (moi, je ne peux pas y accéder)

Ne colle **aucun mot de passe ni token** dans le chat ou dans un commit.

### Vercel (le plus important)
- [ ] Nom du projet et **Production Branch** (Settings → Git). Ça devrait être `main`.
- [ ] **Liste des variables d'environnement** (Settings → Environment Variables) : les noms et les environnements concernés, pas les valeurs.
- [ ] L'**ID ou l'URL du déploiement de production actuel** (Deployments → celui marqué « Production »). C'est ton point de retour arrière.
- [ ] Les **logs du dernier build de production** (Deployments → le déploiement → Building). Copie les warnings et les erreurs.
- [ ] Les **logs runtime des dernières 24 h** (onglet Logs), filtrés sur « error » et « warning ». Je cherche des `API request failed` ou `Error fetching` venant de WordPress.
- [ ] Le **plan** (Hobby ou Pro). Le plan Hobby est réservé à un usage non commercial, or c'est le site d'une entreprise : à vérifier.

### OVH
- [ ] **Export de la zone DNS de `leforage.fr`** (Domaines → leforage.fr → Zone DNS → « Modifier en mode textuel », puis copier-coller). Ça permet de savoir :
  - où est hébergé `admin.leforage.fr` (le WordPress), pour résilier plus tard ;
  - s'il y a des **MX (emails)**. On n'y touche pas, mais il faut les connaître.
- [ ] L'offre d'hébergement du WordPress et sa **date de renouvellement**, pour ne pas payer une année de plus.
- [ ] La date d'expiration du domaine.

### WordPress (admin.leforage.fr/wp-admin)
- [ ] Un accès admin qui marche.
- [ ] **ACF → Outils → Exporter → tous les groupes → JSON**. Ça sert de référence sur les champs (optionnel, j'ai déjà la structure via l'API).
- [ ] **Outils → Exporter → Tout le contenu** (XML), comme sauvegarde avant d'éteindre.
- [ ] La liste des extensions installées (capture d'écran), pour vérifier qu'aucune ne fait autre chose (formulaires, SEO…).

### Google (5 min)
- [ ] GA4 : vérifier que tu as l'accès et noter le trafic des 28 derniers jours (base de comparaison).
- [ ] **Search Console** : vérifier que `leforage.fr` y est et que tu y as accès. C'est là qu'on vérifie qu'on ne perd rien en SEO.
- [ ] Faire un audit [PageSpeed Insights](https://pagespeed.web.dev/) de `https://www.leforage.fr/` et garder les scores (mobile et desktop).

### Au client
- [ ] Le **vrai contenu de la FAQ** (6 questions, les réponses sont en Lorem ipsum).
- [ ] Les **vraies fiches techniques PDF** des machines (les 3 pointent vers `test.pdf`).
- [ ] Les **emails de contact** (voir §4).

---

## 3. Les étapes dans l'ordre

Légende : 👤 = toi, 🤖 = moi (dans une session Claude Code).

### Étape 1 — 👤 Récupérer les infos du §2 (≈ 45 min)
Envoie-moi les logs Vercel et la zone DNS OVH (sans secrets). La FAQ et les PDF peuvent arriver plus tard : ils ne bloquent pas la suite.

### Étape 2 — 👤 Créer le repository Prismic (≈ 15 min)
1. Crée un compte sur https://prismic.io avec ton email, en plan Free.
2. Crée un repository (le nom `le-forage` peut être déjà pris : note le nom obtenu). Choisis **Next.js** comme framework et **Français (fr-fr)** comme langue principale.
3. Dans Settings → API & Security :
   - laisse l'API en « Public API for Master only » (pas besoin d'access token pour lire) ;
   - dans **Write APIs**, génère un **Migration / Write token**. Garde-le pour l'étape 5.
4. Donne-moi **uniquement le nom du repository**.

### Étape 3 — 🤖 Intégrer Prismic dans le code ✅ fait
- Paquets `@prismicio/client`, `@prismicio/next`, `@prismicio/react`, plus la CLI `prismic` et `tsx` en dev.
- Modèles créés avec la CLI dans `customtypes/` :
  - `home` (page unique, route `/`) avec un onglet par section : Hero, Images de séparation, À propos, Services (avec les prestations en groupe imbriqué), RSE, Machines, FAQ, Footer ;
  - `legal_page` (UID : `mentions-legales`, `protection-donnees`), avec un onglet SEO standard.
- `src/lib/prismic.ts` renvoie **exactement les mêmes objets** que `src/lib/api.ts` (WordPress). Les composants et les animations ne changent pas.
- `src/lib/cms.ts` choisit la source avec `CMS_SOURCE=wordpress|prismic`. Par défaut, c'est WordPress.
- Routes `/api/preview`, `/api/exit-preview` et `/api/revalidate` (webhook, protégé par `PRISMIC_WEBHOOK_SECRET`).
- `next.config.ts` : `images.domains` passe à `remotePatterns`, avec l'ajout des domaines Prismic.
- Scripts : `scripts/prismic/wordpress-to-prismic.ts` fait la conversion, `scripts/prismic/migrate.ts` fait l'envoi.
- Vérifié en local avec une fausse API Prismic servant les documents produits par le script : texte identique au site WordPress, mêmes images et mêmes dimensions, captures identiques en mobile et desktop (hors animations).

### Étape 4 — 👤 Envoyer les modèles vers Prismic (≈ 5 min, en local)
```bash
git fetch origin && git checkout claude/prismic-migration-guide-hhd3jz && git pull
npm install
npx prismic login          # ouvre le navigateur, connecte-toi avec ton compte Prismic
npx prismic push           # crée les types "Accueil" et "Page légale" dans le-forage
npx prismic status         # doit indiquer que tout est synchronisé
```

### Étape 5 — 👤 Lancer l'import du contenu (≈ 5 min, en local)
Crée `.env.local` à partir de `.env.example` (jamais commité) et renseigne au minimum :
```env
PRISMIC_WRITE_TOKEN=<token Write API de l'étape 2>
```
```bash
npm run migrate:prismic -- --dry-run   # liste les 3 documents et les 32 médias, n'envoie rien
npm run migrate:prismic                # envoie
```
Le script importe les images, SVG et PDF depuis `admin.leforage.fr`, puis crée les documents dans la **release « Migration »**. Rien n'est publié automatiquement.
**Garde la sortie de la commande** : c'est le log à m'envoyer si quelque chose échoue.
À lancer **une seule fois**. Une deuxième exécution recréerait les médias en double.

### Étape 6 — 👤 Relire et publier dans Prismic (≈ 30 min)
1. Dashboard Prismic → Migration release : ouvre chaque document et compare-le avec le site actuel.
2. Corrige au passage les problèmes de contenu du §4.
3. **Publie** la release.

### Étape 7 — 🤖 + 👤 Tester en local avec Prismic
Dans `.env.local`, mets `CMS_SOURCE=prismic`, puis :
```bash
npm run dev     # puis npm run build && npm start
```
De mon côté, je peux faire une **comparaison de captures** (WordPress vs Prismic) en mobile, tablette et desktop avec Playwright. Toi, vérifie les animations, les popups RSE, la FAQ, le téléchargement des PDF et les deux pages légales.

### Étape 8 — 👤 Preview sur Vercel (≈ 20 min)
1. Vercel → Settings → Environment Variables, en **Preview uniquement** :
   `CMS_SOURCE=prismic` et `PRISMIC_WEBHOOK_SECRET=<chaîne aléatoire>`. Le nom du repository est déjà dans `prismic.config.json`.
2. Pousse la branche. Vercel génère une URL de preview.
3. Previews Prismic : `npx prismic preview add https://<url-preview-vercel>/api/preview`.
4. Teste la preview, le bouton « Preview » de Prismic, et PageSpeed (à comparer avec l'étape 1).

### Étape 9 — 👤 Mise en production (≈ 15 min, sans coupure)
1. Ajoute les mêmes variables en **Production**.
2. Merge la PR dans `main` : Vercel redéploie `www.leforage.fr`. **Aucune action OVH.**
3. Webhook :
   ```bash
   npx prismic webhook create https://www.leforage.fr/api/revalidate \
     --secret <PRISMIC_WEBHOOK_SECRET> --trigger documentsPublished --trigger documentsUnpublished
   npx prismic preview add https://www.leforage.fr/api/preview
   ```
4. Test de bout en bout : modifie un titre dans Prismic, publie, et vérifie que le site change en moins d'une minute.
5. Search Console : « Inspection d'URL » sur `/`, puis « Demander l'indexation ».

**Retour arrière** (≈ 1 min) : Vercel → Deployments → l'ancien déploiement de production → **Instant Rollback**, ou remets `CMS_SOURCE=wordpress` et redéploie. WordPress reste allumé pendant tout ce temps.

### Étape 10 — 🤖 + 👤 Nettoyage (après 2 à 4 semaines sans problème)
- 🤖 Supprimer `src/lib/api.ts`, `src/types/wordpress.ts`, `axios`, la variable `CMS_SOURCE` et `admin.leforage.fr` de `next.config.ts`.
- 👤 Faire une sauvegarde finale du WordPress (XML et dossier `uploads` en FTP), puis résilier l'hébergement.
- 👤 OVH : supprimer l'enregistrement DNS `admin` (**pas** les MX ni `www`).

---

## 4. Problèmes de contenu trouvés dans l'export (visibles en prod aujourd'hui)

| Où | Problème | Action |
|---|---|---|
| Footer → bouton « Demandez un devis » | `url = "mailto:"` : **le bouton n'ouvre aucun destinataire** | Mettre l'email du client |
| Hero → bouton | `mailto:bonjour@antoinepiney.fr` | Vérifier que c'est bien l'adresse à utiliser |
| FAQ (6 items) | Réponses en Lorem ipsum | Contenu à demander au client |
| Machines (3) | Toutes les fiches pointent vers `test.pdf`. Images `machinetest.png` et `hero-cover.jpg`, titre « Nouvelle Machine » | Vrais PDF, vraies images, supprimer la machine en trop si elle n'existe pas |
| RSE → carte « EPI » | Logo `logo-test.jpg` | Vrai logo |
| RSE → popups (8) | Toutes utilisent la même image, `hero-cover.jpg` | Images dédiées ou volontaire ? |
| Protection des données | Le champ ACF s'appelle `subtile` au lieu de `subtitle` : **le sous-titre ne s'affiche pas** | Corrigé automatiquement par la migration |
| Mentions légales / Protection des données | Contenu en Lorem ipsum et sous-titre « Test » : **obligation légale** pour un site d'entreprise | Vrais textes à obtenir |
| Médias | `blank.jpg` et `favicon-1.jpg` ne sont utilisés nulle part | Non migrés |

---

## 5. Contenu de `wordpress-export/`

- `page-home.json`, `page-mentions-legales.json`, `page-protection-donnees.json` : réponse brute de l'API REST avec ACF (`?acf_format=standard`).
- `media.json` : les 34 médias de la bibliothèque (URL, dimensions, poids, alt, type).

C'est l'instantané de référence pour le script de migration et pour une restauration éventuelle.

---

## 6. Remarques techniques

- **Texte riche :** la réponse de la FAQ, le texte des prestations et les sections légales sont en texte riche dans Prismic (paragraphes, gras, liens, listes). Côté WordPress, le texte brut est échappé, donc l'affichage actuel ne change pas.
- **Textes alternatifs :** les deux images de séparation utilisent maintenant l'alt réel de l'image (« Sondage géotechnique », « Chantier de forage ») au lieu de « Image de séparation ».
- **Lint :** `npm run lint` était déjà cassé avant la migration (config ESLint « flat » avec ESLint 8). Le build n'est pas bloqué, mais c'est à corriger à part.
