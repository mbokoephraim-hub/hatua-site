/**
 * Point d'entrée des contenus selon la langue.
 * Français : src/data/*.ts — Anglais : src/data/en/*.ts (même structure).
 */
import type { Lang } from '../i18n';
import { site as siteFr, socialLinks } from './site';
import { site as siteEn } from './en/site';
import { poles as polesFr } from './poles';
import { poles as polesEn } from './en/poles';
import { values as valuesFr } from './values';
import { values as valuesEn } from './en/values';
import { projects as projectsFr } from './projects';
import { projects as projectsEn } from './en/projects';
import { engage as engageFr } from './engage';
import { engage as engageEn } from './en/engage';
import { engageForms as formsFr } from './forms';
import { engageForms as formsEn } from './en/forms';
import { images as imagesFr } from './images';
import { images as imagesEn } from './en/images';
import { fondatrice as fondatriceFr } from './fondatrice';
import { fondatrice as fondatriceEn } from './en/fondatrice';

const content = {
  fr: { site: siteFr, poles: polesFr, values: valuesFr, projects: projectsFr, engage: engageFr, forms: formsFr, images: imagesFr, fondatrice: fondatriceFr },
  en: { site: siteEn, poles: polesEn, values: valuesEn, projects: projectsEn, engage: engageEn, forms: formsEn, images: imagesEn, fondatrice: fondatriceEn },
};

export function getContent(lang: Lang) {
  return content[lang];
}

export { socialLinks };
export { mailto } from './site';
