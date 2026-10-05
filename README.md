# Hatua Foundation : site vitrine

Site officiel de **Hatua Foundation**, organisation à but non lucratif basée à Kinshasa (RDC).
*« Hatua » signifie « pas, étape » en swahili.*

- **Technologies :** [Astro](https://astro.build) (site 100 % statique) + [Tailwind CSS](https://tailwindcss.com) v4
- **Aucune dépendance JavaScript lourde** côté visiteur : quelques lignes de JS natif (menu mobile, animations, formulaire).
- **Accessible** (contrastes AA, navigation au clavier, lien d'évitement, balises sémantiques), **responsive**, **SEO** (meta, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD `NGO`).

---

## 1. Installation et lancement en local

Prérequis : **Node.js 22.12 ou plus récent** ([nodejs.org](https://nodejs.org)).

```bash
npm install        # installe les dépendances
npm run dev        # lance le site sur http://localhost:4321 (rechargement automatique)
npm run build      # construit le site final dans le dossier dist/
npm run preview    # prévisualise la version construite
```

Pour configurer le formulaire de contact en local, copiez `.env.example` en `.env` et complétez-le.

---

## 2. Structure des dossiers

```
hatua-site/
├── astro.config.mjs          # URL du site, sous-dossier, langues
├── .env.example              # variables de configuration (formulaire, URL)
├── A-REMPLACER.md            # liste des contenus provisoires à compléter
├── public/                   # fichiers servis tels quels
│   ├── logo.svg              # logo (fond clair) : PROVISOIRE
│   ├── logo-light.svg        # logo (fond foncé, pied de page) : PROVISOIRE
│   ├── favicon.svg / favicon-32.png / apple-touch-icon.png
│   ├── og-image.png          # image de partage sur les réseaux sociaux
│   └── images/               # photos (voir images/README.md)
├── scripts/generate-images.mjs   # régénère favicons PNG et og-image.png
└── src/
    ├── data/                 # ← TOUS LES TEXTES ET CONTENUS
    │   ├── site.ts           # nom, slogan, mission, vision, coordonnées, réseaux
    │   ├── navigation.ts     # menu
    │   ├── poles.ts          # les 7 pôles
    │   ├── values.ts         # valeurs
    │   ├── projects.ts       # projets (ÉCHOS…)
    │   ├── engage.ts         # page « S'engager »
    │   └── images.ts         # chemins et textes alternatifs des photos
    ├── i18n/ui.ts            # libellés d'interface (boutons…), prêt pour l'anglais
    ├── styles/global.css     # ← COULEURS ET POLICES
    ├── layouts/BaseLayout.astro   # <head>, SEO, en-tête, pied de page
    ├── components/           # blocs réutilisables (Header, Footer, cartes, frise…)
    └── pages/                # une page = un fichier (index, a-propos, poles, projets/…)
```

---

## 3. Modifier le site

### Textes, coordonnées, réseaux sociaux
Tout se trouve dans **`src/data/`**. Ouvrez le fichier concerné, modifiez le texte entre guillemets, enregistrez.

- Slogan, mission, e-mail, téléphone : `src/data/site.ts`
- Instagram / LinkedIn : `src/data/site.ts` → `social`. Collez l'URL complète ; tant que le champ est vide, l'icône n'est pas affichée.

> Astuce : dans les textes, utilisez l'apostrophe typographique `’` ; si vous utilisez `'`, entourez le texte de guillemets doubles `"…"`.

### Couleurs et polices
Dans **`src/styles/global.css`**, bloc `@theme` en haut du fichier. Chaque couleur n'est définie qu'**une seule fois** :

| Variable | Rôle | Valeur actuelle |
|---|---|---|
| `--color-primary` | vert principal | `#14532d` |
| `--color-secondary` | ocre / orange (boutons) | `#c2410c` |
| `--color-accent` | ocre clair (décor) | `#e59a3b` |
| `--color-cream` | fond blanc cassé | `#faf7f2` |
| `--color-ink` | texte | `#1f2933` |

Pour changer les polices : modifiez `--font-display` / `--font-sans` **et** le lien Google Fonts dans `src/layouts/BaseLayout.astro`.

### Logo
Remplacez `public/logo.svg` (et `public/logo-light.svg` pour le fond vert du pied de page) par le logo officiel, **en gardant les mêmes noms de fichiers**.
Mettez aussi à jour `public/favicon.svg`, puis régénérez les images PNG (voir ci-dessous).

### Photos
Voir **`public/images/README.md`**.

### Ajouter un projet
1. Dans `src/data/projects.ts`, copiez le bloc du projet ÉCHOS (de `{` à `},`) et collez-le à la suite.
2. Changez le `slug` (ex. `mon-projet`) et les textes.
3. C'est tout : la carte apparaît sur la page Projets et la page `/projets/mon-projet` est créée automatiquement (et ajoutée au sitemap).

### Ajouter une page
Créez un fichier dans `src/pages/` (ex. `actualites.astro`, en copiant une page existante), ajoutez-le au menu dans `src/data/navigation.ts` et à la liste `staticPages` de `src/pages/sitemap.xml.ts`.

### Régénérer les favicons PNG et l'image de partage
Après un changement de logo, de couleurs ou de slogan :
```bash
npm install --no-save playwright && npx playwright install chromium
node scripts/generate-images.mjs
```
(Le texte de l'image de partage se modifie directement dans `scripts/generate-images.mjs`.)

### Ajouter l'anglais (plus tard)
1. Dans `astro.config.mjs`, ajoutez `'en'` à `i18n.locales`.
2. Dans `src/i18n/ui.ts`, dupliquez le bloc `fr` en `en` et traduisez-le.
3. Créez des versions anglaises des données (ex. `src/data/en/…`) et les pages dans `src/pages/en/`.

---

## 4. Formulaire de contact

Le site est statique : l'envoi passe par un service externe. Deux options :

**Formspree (par défaut, fonctionne partout)**
1. Créez un compte sur [formspree.io](https://formspree.io) et un formulaire avec l'adresse `hatuafound@gmail.com`.
2. Copiez l'identifiant (la partie après `/f/` dans `https://formspree.io/f/abcdwxyz`).
3. Définissez la variable `PUBLIC_FORMSPREE_ID=abcdwxyz` (fichier `.env` en local, ou dans les réglages de l'hébergeur).

**Netlify Forms (si le site est hébergé sur Netlify)**
Définissez `PUBLIC_FORM_PROVIDER=netlify` dans les variables d'environnement Netlify, puis activez les notifications e-mail dans *Forms* de votre tableau de bord Netlify.

Tant que rien n'est configuré, le formulaire affiche un message invitant à écrire directement par e-mail.

---

## 5. Déploiement

Avant tout déploiement, indiquez l'URL définitive du site via la variable `SITE_URL` (ou dans `astro.config.mjs`) : elle sert au sitemap, aux liens canoniques et au partage sur les réseaux sociaux.

### Netlify (recommandé)
1. [app.netlify.com](https://app.netlify.com) → *Add new site* → *Import from Git* → choisissez ce dépôt.
2. Les réglages sont lus depuis `netlify.toml` (commande `npm run build`, dossier `dist`).
3. *Site configuration → Environment variables* : ajoutez `SITE_URL` et `PUBLIC_FORMSPREE_ID` (ou `PUBLIC_FORM_PROVIDER=netlify`).

### Vercel
1. [vercel.com/new](https://vercel.com/new) → importez le dépôt (Astro est détecté automatiquement, voir `vercel.json`).
2. Ajoutez les variables d'environnement `SITE_URL` et `PUBLIC_FORMSPREE_ID`.

### GitHub Pages
1. Dans le dépôt : *Settings → Pages → Source* : **GitHub Actions**.
2. Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.
3. Variables optionnelles (*Settings → Secrets and variables → Actions → Variables*) :
   - `PUBLIC_FORMSPREE_ID` : identifiant Formspree ;
   - `SITE_URL` : à définir **uniquement** si vous utilisez un domaine personnalisé (sinon le site est servi sous `https://<compte>.github.io/<depot>/`).

### Nom de domaine
Achetez le domaine (ex. `hatua-foundation.org`) puis suivez la procédure « custom domain » de votre hébergeur, et mettez `SITE_URL` à jour.

---

## 6. Règles éditoriales

- Ton humain, sincère, porteur d'espoir ; phrases courtes ; idée de progression pas à pas.
- **Ne jamais publier** de chiffres, résultats, témoignages, partenaires ou prix non vérifiés.
- Ne pas publier le budget des projets.
- Les contenus provisoires sont signalés par `[À REMPLACER]` / `[À COMPLÉTER]` : voir `A-REMPLACER.md`.
