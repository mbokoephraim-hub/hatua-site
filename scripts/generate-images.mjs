/**
 * Génère les images du site à partir des logos officiels (dossier brand/logos) :
 *   public/logo.png             logo horizontal terre-rouge (en-tête, fond clair)
 *   public/logo-light.png       logo horizontal miel (pied de page, fond foncé)
 *   public/favicon.ico          favicon (16, 32 et 48 px)
 *   public/favicon-32.png       favicon PNG
 *   public/apple-touch-icon.png icône iPhone / iPad (180 px)
 *   public/icon-192.png, icon-512.png  icônes Android / données structurées
 *   public/og-image.png         image de partage sur les réseaux sociaux (1200 × 630)
 *   public/og-fondatrice.jpg    image de partage de la page /fondatrice (à partir de public/images/sublime-koyi-saley.jpg)
 *
 * Usage : node scripts/generate-images.mjs
 * À relancer après un changement de logo ou de slogan.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

// Rend la police Sora (brand/fonts) disponible pour le texte de l'image de partage.
// Doit être défini AVANT le chargement de sharp.
process.env.FONTCONFIG_FILE = `${root}scripts/fonts.conf`;
const { default: sharp } = await import('sharp');
const logos = `${root}brand/logos/Sans_fond`;
const out = (f) => `${root}public/${f}`;

// Couleurs officielles (identiques à src/styles/global.css)
const TERRE_ROUGE = '#5c1a16';
const BAOBAB = '#2e4b3c';
const MIEL = '#f3d3a0';

const SLOGAN = 'Étape après étape';

/** Charge un PNG transparent et retire les marges vides. */
const trimmed = (file) => sharp(`${logos}/${file}`).trim().toBuffer();

// 1. Logos horizontaux pour l'en-tête et le pied de page (hauteur 128 px = net sur écrans haute densité)
for (const [file, src] of [
  ['logo.png', 'Avec_texte/Hatua_Foundation_horizontal_terre-rouge_transparent.png'],
  ['logo-light.png', 'Avec_texte/Hatua_Foundation_horizontal_miel_transparent.png'],
]) {
  await sharp(await trimmed(src)).resize({ height: 128 }).png({ compressionLevel: 9, palette: true }).toFile(out(file));
}

// 2. Icônes carrées : emblème miel sur fond terre-rouge
const emblem = await trimmed('Sans_texte/Hatua_embleme_miel_transparent.png');
async function icon(size, ratio = 0.8) {
  const h = Math.round(size * ratio);
  const glyph = await sharp(emblem).resize({ height: h }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: TERRE_ROUGE } })
    .composite([{ input: glyph, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

writeFileSync(out('favicon-32.png'), await icon(32, 0.86));
writeFileSync(out('apple-touch-icon.png'), await icon(180, 0.72));
writeFileSync(out('icon-192.png'), await icon(192, 0.72));
writeFileSync(out('icon-512.png'), await icon(512, 0.72));

// favicon.ico : conteneur ICO avec des images PNG (16, 32, 48 px)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => icon(s, s === 16 ? 0.9 : 0.86)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4); // plans
  header.writeUInt16LE(32, e + 6); // bits par pixel
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync(out('favicon.ico'), Buffer.concat([header, ...pngs]));

// 3. Image de partage : logo miel sur fond baobab + slogan
const W = 1200;
const H = 630;
const logo = await sharp(await trimmed('Avec_texte/Hatua_Foundation_horizontal_miel_transparent.png'))
  .resize({ width: 760 })
  .toBuffer();
const { height: logoH } = await sharp(logo).metadata();
const logoTop = Math.round((H - logoH) / 2) - 50;
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="${W / 2 - 40}" y="${logoTop + logoH + 52}" width="80" height="3" rx="1.5" fill="${MIEL}" opacity="0.6"/>
  <text x="${W / 2}" y="${logoTop + logoH + 112}" text-anchor="middle" fill="#fbf4ee"
    font-family="Sora, Arial, sans-serif" font-size="40" font-weight="600" letter-spacing="0.5">${SLOGAN}</text>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 4, background: BAOBAB } })
  .composite([
    { input: logo, top: logoTop, left: Math.round((W - 760) / 2) },
    { input: text, top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out('og-image.png'));

// 4. Image de partage de la page /fondatrice : portrait à droite, nom à gauche, fond terre-rouge
{
  const { existsSync } = await import('node:fs');
  const photoPath = `${root}public/images/sublime-koyi-saley.jpg`;
  if (existsSync(photoPath)) {
    const photo = await sharp(photoPath).resize({ height: H }).toBuffer();
    const { width: pw } = await sharp(photo).metadata();
    const txt = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <text x="72" y="250" fill="${MIEL}" font-family="Sora, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="4">PRÉSIDENTE &amp; FONDATRICE</text>
      <text x="72" y="330" fill="#fbf4ee" font-family="Sora, Arial, sans-serif" font-size="60" font-weight="600">Sublime Koyi</text>
      <text x="72" y="400" fill="${MIEL}" font-family="Sora, Arial, sans-serif" font-size="60" font-weight="300">Saley</text>
      <rect x="72" y="440" width="64" height="2" fill="#e07a62"/>
      <text x="72" y="490" fill="#fbf4ee" font-family="Sora, Arial, sans-serif" font-size="24" font-weight="400">HATUA Foundation</text>
    </svg>`);
    await sharp({ create: { width: W, height: H, channels: 3, background: TERRE_ROUGE } })
      .composite([
        { input: photo, top: 0, left: W - pw },
        { input: txt, top: 0, left: 0 },
      ])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out('og-fondatrice.jpg'));
  }
}

console.log('Images générées dans public/');
