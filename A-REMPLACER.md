# Contenus à compléter ou à remplacer

Liste de tous les éléments provisoires du site. Cochez-les au fur et à mesure.

## [À COMPLÉTER] : informations manquantes

- [x] ~~Instagram, LinkedIn, domaine (hatuafoundation.org), identifiant Formspree~~ : renseignés.
- [x] ~~Slogan~~ : « Étape après étape » confirmé (`src/data/site.ts` → `slogan`).
      En cas de changement, régénérer aussi `public/og-image.png` (texte dans `scripts/generate-images.mjs`).
- [ ] **Accès FTP Hostinger** : à ajouter comme secrets GitHub (voir README, section 5).

## Identité visuelle

- [x] ~~Logo officiel, favicon, couleurs de la charte~~ : intégrés (`brand/logos/`, `src/styles/global.css`).
- [x] ~~Polices~~ : Sora (titres) et Onest (texte), hébergées sur le site.

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
