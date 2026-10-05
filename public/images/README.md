# Photos à fournir

Les visuels `.svg` sont des **emplacements provisoires**. Remplacez-les par de vraies photos
de la fondation. N'utilisez pas d'images générées par IA ni de photos de banque d'images présentées
comme des actions réelles de la fondation.

| Fichier provisoire | Où il apparaît | Photo à fournir |
|---|---|---|
| ✅ `echos-eleves.webp` (+ `echos-eleves-800.webp` pour mobile) | Accueil (bloc ÉCHOS), page Projets, page ÉCHOS | Fournie. À compléter plus tard par des photos réelles du projet au Lycée Tobongisa |
| `fondatrice.webp` (+ `-640` et `-avatar`) | Page À propos, mot de la fondatrice | Fournie. **Provisoire** sur À propos (→ photo d'équipe) |
| `fondatrice-engager.webp` (+ `-640`) | Page S'engager (Bénévolat) | Fournie. **Provisoire** (→ photo d'atelier) |
| `sublime-koyi-saley.jpg` | Page /sublimekoyi (hero) | Fournie. Peut être remplacée par un fichier du même nom |
| `sublime-koyi-saley-portrait.jpg` | Page /sublimekoyi (section HATUA Foundation), accueil (« À la découverte de la fondatrice »), image de partage | Fournie |
| `sublime-koyi-saley-intervention.jpg`, `-pupitre.jpg` | Page /sublimekoyi (Vision, Parcours) | Fournies |
| *(optionnel)* | — | Photos supplémentaires : salles de classe, ateliers, communautés, équipe |

## Conseils

- Format : **JPG ou WebP**, environ **1600 × 1067 px** (format 3:2), moins de 400 Ko.
- Obtenez **l'accord écrit** des personnes photographiées (et des parents pour les mineurs).
- Privilégiez des images naturelles, lumineuses et respectueuses des personnes.

## Comment remplacer une image

1. Déposez la photo dans ce dossier, par exemple `public/images/equipe.webp` (largeur ~1600 px).
2. Mettez à jour le chemin et le texte alternatif (`alt`) :
   - photo d'un projet → `src/data/projects.ts` (champ `image`) ;
   - autres photos → `src/data/images.ts` (chemin, dimensions `width`/`height`, texte `alt`).
3. Supprimez l'ancien fichier `.svg` s'il n'est plus utilisé.

## Autres fichiers graphiques (dossier `public/`)

Les logos, favicons et l'image de partage (`og-image.png`) sont générés à partir des logos officiels
du dossier `brand/logos/` : voir le README principal, section « Logo et favicon ».
