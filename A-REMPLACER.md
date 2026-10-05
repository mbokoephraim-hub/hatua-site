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

- [x] ~~Mot de la fondatrice~~ : intégré (`src/data/site.ts` → `founderMessage`).
- [x] ~~Notre histoire~~ : intégrée (`src/data/site.ts` → `history`).

## Photos (visuels provisoires)

Détails dans `public/images/README.md`.

- [x] ~~Photo ÉCHOS~~ : `public/images/echos-eleves.webp` (à compléter par des photos réelles du projet).
- [ ] **Photo d'équipe** (page À propos) : le portrait de la fondatrice est utilisé en attendant (`src/data/images.ts` → `about`).
- [ ] **Photo d'atelier** (page S'engager) : le portrait de la fondatrice est utilisé en attendant (`src/data/images.ts` → `engage`).

## [À VALIDER] : textes rédigés à partir de la mission

Ces textes ne contiennent aucun chiffre ni aucun résultat inventé, mais doivent être relus par l'équipe :

- [ ] **Valeurs** (Progression, Dignité, Proximité, Intégrité, Collaboration) : `src/data/values.ts`.
- [ ] **Descriptions et axes de travail des 7 pôles** : `src/data/poles.ts`.
- [ ] **Présentation du projet ÉCHOS** (contexte, objectifs, étape intermédiaire « 2027 : déploiement progressif ») :
      `src/data/projects.ts`.
- [ ] **Page S'engager** (profils de bénévoles, étapes, types de partenaires) : `src/data/engage.ts`.
