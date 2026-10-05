/**
 * Emplacements des images du site.
 * Pour remplacer une photo : déposez-la dans public/images (voir public/images/README.md),
 * puis mettez à jour le chemin, les dimensions et le texte alternatif ici.
 */
const founderAlt = 'Portrait de Sublime Koyi, fondatrice de Hatua Foundation, souriante, en veste noire';

export const images = {
  // Page À propos. En attendant une photo d'équipe : portrait de la fondatrice.
  about: {
    src: '/images/fondatrice.webp',
    srcSmall: '/images/fondatrice-640.webp',
    width: 1200,
    height: 1261,
    alt: founderAlt,
  },
  // Page S'engager (section Bénévolat) : portrait de la fondatrice, en attendant une photo d'atelier.
  engage: {
    src: '/images/fondatrice-engager.webp',
    srcSmall: '/images/fondatrice-engager-640.webp',
    width: 1200,
    height: 1261,
    alt: 'Sublime Koyi Saley, fondatrice de Hatua Foundation, souriante, en veste noire',
  },
  // Vignette à côté du mot de la fondatrice
  founderAvatar: '/images/fondatrice-avatar.webp',
  og: '/og-image.png',
};
