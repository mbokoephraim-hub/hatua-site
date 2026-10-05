# Contenus à compléter ou à remplacer

Liste de tous les éléments provisoires du site. Cochez-les au fur et à mesure.

## [À COMPLÉTER] : informations manquantes

- [ ] **Slogan officiel** : `src/data/site.ts` → `slogan` (actuellement « Étape après étape »).
      Pensez aussi à régénérer `public/og-image.png` (texte dans `scripts/generate-images.mjs`).
- [ ] **Instagram** : `src/data/site.ts` → `social.instagram` (URL complète ; l'icône s'affiche automatiquement).
- [ ] **LinkedIn (page entreprise)** : `src/data/site.ts` → `social.linkedin`.
- [ ] **Nom de domaine / URL du site** : variable `SITE_URL` chez l'hébergeur, ou `astro.config.mjs`
      (actuellement `https://hatua-foundation.org`, valeur provisoire).
- [ ] **Identifiant Formspree** : variable `PUBLIC_FORMSPREE_ID` (ou `PUBLIC_FORM_PROVIDER=netlify` sur Netlify).
      Tant qu'il manque, le formulaire de contact est désactivé et renvoie vers l'e-mail.

## Identité visuelle (provisoire)

- [ ] **Logo officiel** : remplacer `public/logo.svg` et `public/logo-light.svg` (mêmes noms de fichiers).
- [ ] **Favicon** : remplacer `public/favicon.svg`, puis régénérer `favicon-32.png` et `apple-touch-icon.png`
      (`node scripts/generate-images.mjs`, voir README).
- [ ] **Couleurs et polices** : si une charte graphique existe, mettre à jour `src/styles/global.css` (bloc `@theme`).

## [À REMPLACER] : textes provisoires

- [ ] **Mot de la fondatrice** (page À propos) : `src/pages/a-propos.astro`, section « Le mot de la fondatrice ».
- [ ] **Notre histoire** (page À propos) : `src/pages/a-propos.astro`, encadré « [À REMPLACER] Notre histoire »
      (année de création, contexte, premières étapes).

## Photos (visuels provisoires)

Détails dans `public/images/README.md`.

- [ ] `public/images/echos-classe.svg` : atelier en classe / projet ÉCHOS.
- [ ] `public/images/apropos-equipe.svg` : équipe et/ou fondatrice.
- [ ] `public/images/engager-ateliers.svg` : jeunes en atelier, bénévoles.

## [À VALIDER] : textes rédigés à partir de la mission

Ces textes ne contiennent aucun chiffre ni aucun résultat inventé, mais doivent être relus par l'équipe :

- [ ] **Valeurs** (Progression, Dignité, Proximité, Intégrité, Collaboration) : `src/data/values.ts`.
- [ ] **Descriptions et axes de travail des 7 pôles** : `src/data/poles.ts`.
- [ ] **Présentation du projet ÉCHOS** (contexte, objectifs, étape intermédiaire « 2027 : déploiement progressif ») :
      `src/data/projects.ts`.
- [ ] **Page S'engager** (profils de bénévoles, étapes, types de partenaires) : `src/data/engage.ts`.
