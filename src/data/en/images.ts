/** English alternative texts for the site images (see src/data/images.ts). */
import { images as fr } from '../images';

const founderAlt = 'Portrait of Sublime Koyi Saley, founder of Hatua Foundation, smiling, in a black jacket';

export const images: typeof fr = {
  ...fr,
  about: { ...fr.about, alt: founderAlt },
  engage: { ...fr.engage, alt: founderAlt },
};
