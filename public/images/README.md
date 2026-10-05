# Photos à fournir

Les visuels actuels (`.svg`) sont des **emplacements provisoires**. Remplacez-les par de vraies photos
de la fondation. N'utilisez pas d'images générées par IA ni de photos de banque d'images présentées
comme des actions réelles de la fondation.

| Fichier provisoire | Où il apparaît | Photo à fournir |
|---|---|---|
| `echos-classe.svg` | Accueil (bloc ÉCHOS), page Projets, page ÉCHOS | Un atelier en classe, des élèves en échange (projet ÉCHOS ou Lycée Tobongisa) |
| `apropos-equipe.svg` | Page À propos | L'équipe et/ou la fondatrice, Sublime Koyi |
| `engager-ateliers.svg` | Page S'engager | Des jeunes en atelier, des bénévoles en action |
| *(optionnel)* | — | Photos supplémentaires : salles de classe, ateliers, communautés, équipe |

## Conseils

- Format : **JPG ou WebP**, environ **1600 × 1067 px** (format 3:2), moins de 400 Ko.
- Obtenez **l'accord écrit** des personnes photographiées (et des parents pour les mineurs).
- Privilégiez des images naturelles, lumineuses et respectueuses des personnes.

## Comment remplacer une image

1. Déposez la photo dans ce dossier, par exemple `public/images/echos-classe.jpg`.
2. Mettez à jour le chemin et le texte alternatif (`alt`) :
   - photo d'un projet → `src/data/projects.ts` (champ `image`) ;
   - autres photos → `src/data/images.ts`.
3. Supprimez l'ancien fichier `.svg` s'il n'est plus utilisé.

## Autres fichiers graphiques (dossier `public/`)

Les logos, favicons et l'image de partage (`og-image.png`) sont générés à partir des logos officiels
du dossier `brand/logos/` : voir le README principal, section « Logo et favicon ».
