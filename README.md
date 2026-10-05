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


---

## 2. Structure des dossiers

```
hatua-site/
├── astro.config.mjs          # URL du site (hatuafoundation.org), langues
├── .github/workflows/deploy-hostinger.yml   # déploiement automatique FTP
├── .env.example              # surcharges facultatives (formulaire, URL)
├── A-REMPLACER.md            # liste des contenus provisoires à compléter
├── public/                   # fichiers servis tels quels
│   ├── logo.png              # logo horizontal terre-rouge (en-tête)
│   ├── logo-light.png        # logo horizontal miel (pied de page)
│   ├── favicon.ico / favicon-32.png / apple-touch-icon.png / icon-192.png / icon-512.png
│   ├── og-image.png          # image de partage sur les réseaux sociaux
│   ├── .htaccess             # HTTPS, page 404, cache (serveur Hostinger)
│   └── images/               # photos (voir images/README.md)
├── brand/logos/              # logos officiels d'origine (non publiés)
├── scripts/generate-images.mjs   # génère logos web, favicons et og-image.png depuis brand/
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
- Instagram / LinkedIn : `src/data/site.ts` → `social`. Un champ vide masque l'icône.

> Astuce : dans les textes, utilisez l'apostrophe typographique `’` ; si vous utilisez `'`, entourez le texte de guillemets doubles `"…"`.

### Couleurs et polices
Dans **`src/styles/global.css`**, bloc `@theme` en haut du fichier. Les couleurs reprennent la **charte du logo** :

| Variable | Couleur de la charte | Valeur | Usage |
|---|---|---|---|
| `--color-secondary` | terre-rouge | `#5c1a16` | titres, boutons principaux |
| `--color-primary` | baobab | `#2e4b3c` | grands aplats, boutons verts, pied de page |
| `--color-accent` | miel | `#f3d3a0` | accents, texte sur fond foncé |
| `--color-cream` | ivoire | `#fbf4ee` | fond du site |
| `--color-ink` / `--color-muted` | (neutres) | `#2b2220` / `#6b5a55` | texte |

Pour changer les polices : modifiez `--font-display` / `--font-sans` **et** le lien Google Fonts dans `src/layouts/BaseLayout.astro`.

### Logo et favicon
Les fichiers officiels sont rangés dans **`brand/logos/`** (toutes les déclinaisons : horizontal, vertical, emblème ; terre-rouge, miel, noir, blanc).
Le site utilise des versions allégées, générées automatiquement :
```bash
node scripts/generate-images.mjs
```
Ce script crée `public/logo.png`, `public/logo-light.png`, le favicon (emblème miel sur fond terre-rouge), les icônes
mobiles et l'image de partage `og-image.png` (logo + slogan, texte modifiable en haut du script).
Pour changer de logo : remplacez les fichiers dans `brand/logos/` (mêmes noms) puis relancez la commande.

### Photos
Voir **`public/images/README.md`**.

### Ajouter un projet
1. Dans `src/data/projects.ts`, copiez le bloc du projet ÉCHOS (de `{` à `},`) et collez-le à la suite.
2. Changez le `slug` (ex. `mon-projet`) et les textes.
3. C'est tout : la carte apparaît sur la page Projets et la page `/projets/mon-projet` est créée automatiquement (et ajoutée au sitemap).

### Ajouter une page
Créez un fichier dans `src/pages/` (ex. `actualites.astro`, en copiant une page existante), ajoutez-le au menu dans `src/data/navigation.ts` et à la liste `staticPages` de `src/pages/sitemap.xml.ts`.

### Ajouter l'anglais (plus tard)
1. Dans `astro.config.mjs`, ajoutez `'en'` à `i18n.locales`.
2. Dans `src/i18n/ui.ts`, dupliquez le bloc `fr` en `en` et traduisez-le.
3. Créez des versions anglaises des données (ex. `src/data/en/…`) et les pages dans `src/pages/en/`.

---

## 4. Formulaire de contact

Le site est statique : les messages sont transmis par **Formspree**, qui les renvoie par e-mail.

- Identifiant du formulaire : `xgaoewap`, dans `src/data/site.ts` → `form.formspreeId`.
- Les messages arrivent sur l'adresse e-mail du compte Formspree. Vous pouvez changer cette adresse et restreindre le formulaire au domaine `hatuafoundation.org` dans les réglages Formspree.
- Un champ invisible (`_gotcha`) filtre une partie des robots spammeurs.

---

## 5. Déploiement sur Hostinger (automatique)

Le site est publié sur **https://hatuafoundation.org** (hébergement mutualisé Hostinger).
À chaque modification fusionnée dans la branche **`main`**, GitHub construit le site et l'envoie par FTP dans
`public_html` (workflow `.github/workflows/deploy-hostinger.yml`). Seuls les fichiers modifiés sont renvoyés.

### Étape 1 : préparer Hostinger (une seule fois)
1. **Activer le SSL** : hPanel → *Sites web* → *Gérer* (hatuafoundation.org) → *Sécurité* → *SSL*. Le certificat
   (gratuit) doit être **actif** avant la mise en ligne, car le fichier `.htaccess` force le HTTPS.
2. **Vider `public_html`** : hPanel → *Fichiers* → *Gestionnaire de fichiers* → ouvrez `public_html` et supprimez
   le fichier d'accueil par défaut d'Hostinger (`default.php`), s'il existe. Sinon, il pourrait s'afficher à la place du site.

### Étape 2 : trouver vos accès FTP dans hPanel
1. Connectez-vous sur [hpanel.hostinger.com](https://hpanel.hostinger.com).
2. *Sites web* → cliquez sur **Gérer** à côté de `hatuafoundation.org`.
3. Dans le menu de gauche : **Fichiers** → **Comptes FTP**.
4. La zone **Détails FTP** indique :
   - **IP FTP / Nom d'hôte** (ex. `ftp.hatuafoundation.org` ou une adresse IP) → secret `FTP_SERVER` ;
   - **Nom d'utilisateur FTP** (ex. `u123456789.hatuafoundation.org`) → secret `FTP_USERNAME` ;
   - **Port FTP** : `21` (déjà réglé dans le workflow) ;
   - **Dossier de téléchargement des fichiers** : `public_html`.
5. **Mot de passe** : s'il est perdu, cliquez sur **Changer le mot de passe du compte FTP** sur la même page et
   choisissez-en un nouveau, long et unique → secret `FTP_PASSWORD`.

*Conseil :* vous pouvez aussi créer, sur la même page, un compte FTP dédié à GitHub (rubrique *Créer un nouveau compte FTP*), limité au dossier `public_html`. Il se désactive facilement en cas de besoin, sans toucher au compte principal.

### Étape 3 : ajouter les accès comme « secrets » dans GitHub
Les secrets sont chiffrés : personne ne peut les relire, pas même vous. Ils ne figurent jamais dans le code.
1. Sur GitHub, ouvrez le dépôt `hatua-site` → onglet **Settings** (Paramètres).
2. Menu de gauche : **Secrets and variables** → **Actions**.
3. Onglet **Secrets** → bouton **New repository secret**, puis créez ces trois secrets, un par un :

   | Name (nom exact) | Secret (valeur) |
   |---|---|
   | `FTP_SERVER` | le nom d'hôte ou l'IP FTP, sans `ftp://` |
   | `FTP_USERNAME` | le nom d'utilisateur FTP |
   | `FTP_PASSWORD` | le mot de passe FTP |

4. Cliquez sur **Add secret** à chaque fois.

### Étape 4 : lancer un déploiement
- **Automatique** : fusionnez une modification dans `main`.
- **Manuel** : onglet **Actions** → *Déploiement Hostinger* → **Run workflow**.
- Suivez l'exécution dans l'onglet **Actions** : une coche verte ✔ signifie que le site est en ligne.

### En cas d'erreur
| Message dans l'onglet Actions | Solution |
|---|---|
| `Secrets GitHub manquants` | Un secret est absent ou mal nommé (étape 3). |
| `Login authentication failed` / `530` | Identifiant ou mot de passe FTP incorrect (étape 2). |
| Erreur de certificat (`certificate`, `altnames`, `self signed`) | Onglet **Variables** (même écran que les secrets) → *New repository variable* : `FTP_SECURITY` = `loose`. La connexion reste chiffrée. |
| Délai dépassé / connexion TLS refusée | Variable `FTP_PROTOCOL` = `ftp` (connexion non chiffrée : à éviter si possible). |
| Le site s'affiche dans un sous-dossier `public_html/public_html` | Variable `FTP_SERVER_DIR` = `./` (votre compte FTP s'ouvre déjà dans `public_html`). |

### Fichier `.htaccess`
`public/.htaccess` est copié à la racine du site. Il :
- force le **HTTPS** et redirige `www.hatuafoundation.org` vers `hatuafoundation.org` ;
- affiche la **page 404** personnalisée (`404.html`) ;
- ajoute des en-têtes de sécurité, la compression et la mise en cache.

### Construire le site à la main (sans GitHub)
`npm run build`, puis envoyez le **contenu** du dossier `dist/` (y compris le fichier caché `.htaccess`) dans
`public_html` avec le gestionnaire de fichiers d'hPanel ou un logiciel FTP comme FileZilla.

---

## 6. Règles éditoriales

- Ton humain, sincère, porteur d'espoir ; phrases courtes ; idée de progression pas à pas.
- **Ne jamais publier** de chiffres, résultats, témoignages, partenaires ou prix non vérifiés.
- Ne pas publier le budget des projets.
- Les contenus provisoires sont signalés par `[À REMPLACER]` / `[À COMPLÉTER]` : voir `A-REMPLACER.md`.
