"""
Génère les illustrations de l'article ÉCHOS « Qui influence vraiment les choix des adolescents ? ».
Usage : python3 scripts/illustrations/generate.py   (aucune dépendance)
Sortie : public/images/articles/echos-influences/*.svg
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from lib import *  # noqa: F401,F403

OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'images', 'articles', 'echos-influences')
os.makedirs(OUT, exist_ok=True)


def save(name, content):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
        f.write(content)
    print('écrit', name)


def medallion(cid, cx, cy, r, bg, inner):
    return (
        f'<clipPath id="{cid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>'
        f'<circle cx="{cx}" cy="{cy}" r="{r + 8}" fill="{IVOIRE}"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{bg}"/>'
        f'<g clip-path="url(#{cid})">{inner}</g>'
    )


# ---------------------------------------------------------------- 1. COUVERTURE
def cover():
    W, H = 1600, 900
    cx, cy = 800, 470
    b = [f'<rect width="{W}" height="{H}" fill="{IVOIRE}"/>']
    # halo et orbite
    b.append(f'<circle cx="{cx}" cy="{cy + 20}" r="330" fill="{MIEL_CLAIR}"/>')
    b.append(f'<circle cx="{cx}" cy="{cy + 20}" r="400" fill="none" stroke="{MIEL}" stroke-width="3" stroke-dasharray="2 14" stroke-linecap="round"/>')
    # médaillons (sources d'influence)
    meds = {
        'famille': (300, 250), 'amis': (250, 640), 'ecole': (1300, 250), 'reseaux': (1350, 640), 'avenir': (800, 105),
    }
    for (mx, my) in meds.values():
        # pointillés vers l'adolescente
        ang = math.atan2(cy - my, cx - mx)
        b.append(dots(mx + math.cos(ang) * 105, my + math.sin(ang) * 105, cx - math.cos(ang) * 190, cy - math.sin(ang) * 150, HIBISCUS, 3.5, 18))
    r = 92
    # Famille : adulte + jeune
    fx, fy = meds['famille']
    b.append(medallion('m-fam', fx, fy, r, BAOBAB_CLAIR,
        person(fx - 28, fy + 92, 165, PEAUX[3], TERRE_DOUX, ENCRE, hair='wrap', pose='down', accessory=HIBISCUS)
        + person(fx + 38, fy + 92, 118, PEAUX[1], BLANC, MARINE, hair='short', pose='down')))
    # Amis : trois têtes
    ax, ay = meds['amis']
    b.append(medallion('m-amis', ax, ay, r, MIEL_CLAIR,
        person(ax - 45, ay + 110, 150, PEAUX[2], HIBISCUS, MARINE, hair='puff', facing=1)
        + person(ax + 45, ay + 110, 150, PEAUX[4], BAOBAB, MARINE, hair='shaved', facing=-1)
        + person(ax, ay + 125, 160, PEAUX[0], BLANC, MARINE, hair='braids')))
    # École : bâtiment + livre
    sx, sy = meds['ecole']
    b.append(medallion('m-ecole', sx, sy, r, MIEL_CLAIR,
        school_building(sx - 95, sy + 55, 190, 105, columns=3)
        + f'<rect x="{sx - 95}" y="{sy + 55}" width="190" height="60" fill="{BAOBAB_MOYEN}"/>'
        + line([(sx, sy - 52), (sx, sy - 92)], ENCRE, 3)
        + f'<path d="M{sx},{sy - 92} L{sx + 30},{sy - 84} L{sx},{sy - 76} Z" fill="{HIBISCUS}"/>'))
    # Réseaux sociaux : smartphone, bulles, cœur
    px, py = meds['reseaux']
    b.append(medallion('m-res', px, py, r, BAOBAB_CLAIR,
        f'<rect x="{px - 34}" y="{py - 62}" width="68" height="124" rx="12" fill="{ENCRE}"/>'
        f'<rect x="{px - 27}" y="{py - 52}" width="54" height="100" rx="6" fill="{IVOIRE}"/>'
        f'<rect x="{px - 21}" y="{py - 44}" width="34" height="12" rx="6" fill="{BAOBAB_MOYEN}"/>'
        f'<rect x="{px - 13}" y="{py - 26}" width="34" height="12" rx="6" fill="{MIEL}"/>'
        f'<rect x="{px - 21}" y="{py - 8}" width="40" height="22" rx="4" fill="{HIBISCUS}" opacity="0.8"/>'
        f'<path d="M{px + 46},{py - 30} c-6,-10 -20,-6 -18,5 c1,7 12,14 18,18 c6,-4 17,-11 18,-18 c2,-11 -12,-15 -18,-5 z" fill="{HIBISCUS}"/>'
        + bubble(px - 82, py - 50, 44, 22, BAOBAB)))
    # Avenir : toque de diplômé, étoile, chemin
    vx, vy = meds['avenir']
    b.append(medallion('m-av', vx, vy, r, MIEL_CLAIR,
        f'<path d="M{vx - 50},{vy - 10} L{vx},{vy - 32} L{vx + 50},{vy - 10} L{vx},{vy + 12} Z" fill="{ENCRE}"/>'
        f'<path d="M{vx - 28},{vy} L{vx - 28},{vy + 26} Q{vx},{vy + 42} {vx + 28},{vy + 26} L{vx + 28},{vy} L{vx},{vy + 12} Z" fill="{ENCRE}"/>'
        f'<path d="M{vx + 40},{vy - 6} L{vx + 40},{vy + 30}" stroke="{MIEL}" stroke-width="4" stroke-linecap="round"/>'
        f'<circle cx="{vx + 40}" cy="{vy + 34}" r="6" fill="{HIBISCUS}"/>'
        f'<path d="M{vx - 62},{vy + 62} L{vx - 30},{vy + 62} L{vx - 30},{vy + 48} L{vx},{vy + 48} L{vx},{vy + 34} L{vx + 30},{vy + 34}" fill="none" stroke="{BAOBAB}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'))
    # Ombre au sol + adolescente au centre, pensive
    b.append(f'<ellipse cx="{cx}" cy="{cy + 360}" rx="150" ry="18" fill="{MIEL}"/>')
    b.append(person(cx, cy + 360, 560, PEAUX[1], BLANC, MARINE, hair='braids', bottom_type='skirt', pose='chin',
                    facing=0, backpack=BAOBAB, head_tilt=-6))
    return svg(W, H, ''.join(b), 'Une adolescente pensive entourée des voix qui l’influencent : famille, amis, école, réseaux sociaux et aspirations')


# ---------------------------------------------------------------- 2. LES AMIS
def amis():
    W, H = 1200, 750
    b = [f'<rect width="{W}" height="{H}" fill="{IVOIRE}"/>']
    b.append(school_building(40, 520, 1120, 270, columns=7))
    b.append(f'<rect x="0" y="520" width="{W}" height="{H - 520}" fill="#ecdcc6"/>')
    b.append(f'<ellipse cx="480" cy="700" rx="300" ry="20" fill="#dcc6aa"/>')
    b.append(f'<ellipse cx="920" cy="700" rx="80" ry="14" fill="#dcc6aa"/>')
    # groupe en discussion
    b.append(person(300, 700, 390, PEAUX[2], BLANC, MARINE, hair='puff', bottom_type='skirt', pose='talk', facing=1, backpack=TERRE_DOUX))
    b.append(person(430, 700, 420, PEAUX[0], BLANC, MARINE, hair='short', pose='hips', facing=-1))
    b.append(person(555, 700, 400, PEAUX[4], BLANC, MARINE, hair='braids', bottom_type='skirt', pose='phone', facing=-1, backpack=BAOBAB))
    b.append(person(675, 700, 410, PEAUX[3], BLANC, MARINE, hair='shaved', pose='down', facing=-1))
    # adolescent légèrement en retrait, qui écoute
    b.append(person(925, 700, 405, PEAUX[1], BLANC, MARINE, hair='short', pose='strap', facing=-1, backpack=HIBISCUS, head_tilt=-8))
    # bulles de conversation (sans texte)
    b.append(bubble(250, 205, 120, 46, BAOBAB))
    b.append(f'<rect x="272" y="222" width="76" height="6" rx="3" fill="{IVOIRE}" opacity="0.7"/>')
    b.append(bubble(470, 175, 96, 42, HIBISCUS, tail='right'))
    b.append(bubble(640, 215, 80, 38, MIEL))
    b.append(dots(860, 300, 760, 260, TERRE_DOUX, 3, 16))
    return svg(W, H, ''.join(b), 'Un groupe d’adolescents en uniforme discute dans la cour d’une école de Kinshasa ; un élève, un peu en retrait, écoute et hésite')


# ---------------------------------------------------------------- 3. LA FAMILLE
def famille():
    W, H = 1200, 750
    T = 520  # dessus de la table
    b = [f'<rect width="{W}" height="{H}" fill="{IVOIRE}"/>']
    b.append(f'<rect x="0" y="600" width="{W}" height="150" fill="{SABLE}"/>')
    # fenêtre : ciel et toits au loin
    b.append(f'<rect x="760" y="70" width="320" height="250" rx="10" fill="{MIEL_CLAIR}"/>')
    b.append(f'<path d="M770,320 L770,250 L840,250 L840,220 L930,220 L930,262 L1010,262 L1010,236 L1070,236 L1070,320 Z" fill="{BAOBAB_MOYEN}"/>')
    b.append(f'<circle cx="1000" cy="140" r="32" fill="{MIEL}"/>')
    b.append(f'<rect x="760" y="70" width="320" height="250" rx="10" fill="none" stroke="{TERRE_DOUX}" stroke-width="10"/>')
    b.append(f'<path d="M920,70 L920,320" stroke="{TERRE_DOUX}" stroke-width="8"/>')
    # plante
    b.append(f'<path d="M80,600 L115,505 L205,505 L240,600 Z" fill="{TERRE_DOUX}"/>')
    for dx, dy in [(-60, -170), (0, -215), (55, -160), (-25, -120), (35, -115)]:
        b.append(f'<path d="M160,505 Q{160 + dx*0.4},{505 + dy*0.6} {160 + dx},{505 + dy}" fill="none" stroke="{BAOBAB}" stroke-width="16" stroke-linecap="round"/>')
    # personnages assis (épaules bien au-dessus de la table)
    b.append(seated(420, 585, 560, PEAUX[3], BAOBAB, hair='wrap', table_y=T, facing=1, accessory=HIBISCUS, gesture=True))
    b.append(seated(820, 600, 530, PEAUX[1], BLANC, hair='short', table_y=T, facing=-1))
    # table
    b.append(f'<rect x="200" y="{T}" width="840" height="34" rx="8" fill="#8a5a3c"/>')
    b.append(f'<rect x="260" y="{T + 34}" width="26" height="150" fill="#6e452d"/><rect x="954" y="{T + 34}" width="26" height="150" fill="#6e452d"/>')
    # objets : cahier ouvert devant le jeune, brochure et documents au centre, stylo, tasse
    b.append(f'<path d="M670,{T - 2} L745,{T - 20} L820,{T - 2} Z" fill="{BLANC}"/>')
    b.append(f'<path d="M745,{T - 20} L745,{T - 2}" stroke="{BAOBAB_MOYEN}" stroke-width="2"/>')
    b.append(f'<rect x="540" y="{T - 22}" width="110" height="22" rx="3" fill="{TERRE}"/><rect x="540" y="{T - 22}" width="36" height="22" rx="3" fill="{MIEL}"/>')
    b.append(f'<rect x="470" y="{T - 14}" width="70" height="14" rx="2" fill="{BLANC}"/><rect x="478" y="{T - 22}" width="66" height="10" rx="2" fill="#efe7dc"/>')
    b.append(line([(840, T - 6), (888, T - 16)], HIBISCUS, 6))
    b.append(f'<rect x="300" y="{T - 36}" width="34" height="36" rx="6" fill="{HIBISCUS}"/>')
    return svg(W, H, ''.join(b), 'Une mère et son adolescent assis autour d’une table avec un cahier, des documents et une brochure d’orientation : ils discutent d’un choix important')


# ---------------------------------------------------------------- 4. RÉSEAUX SOCIAUX
def card(x, y, w, h, icon):
    return f'<g><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{BLANC}"/><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="none" stroke="{SABLE}" stroke-width="2"/>{icon}</g>'


def reseaux():
    W, H = 1200, 750
    b = [f'<rect width="{W}" height="{H}" fill="{IVOIRE}"/>']
    b.append(f'<circle cx="400" cy="420" r="300" fill="{BAOBAB_CLAIR}"/>')
    b.append(f'<ellipse cx="400" cy="720" rx="150" ry="16" fill="{BAOBAB_MOYEN}"/>')
    b.append(person(400, 720, 600, PEAUX[0], HIBISCUS, ENCRE, hair='shaved', pose='phone', facing=1, shoes=BLANC))
    # vignettes de contenus
    cards = [
        (720, 70, 'cap'), (920, 130, 'case'), (760, 250, 'bulb'),
        (970, 310, 'plane'), (740, 440, 'star'), (950, 500, 'shirt'),
    ]
    icons = {
        'cap': lambda x, y: f'<path d="M{x-34},{y-4} L{x},{y-20} L{x+34},{y-4} L{x},{y+12} Z" fill="{ENCRE}"/><path d="M{x-18},{y+4} L{x-18},{y+20} Q{x},{y+30} {x+18},{y+20} L{x+18},{y+4}" fill="{ENCRE}"/>',
        'case': lambda x, y: f'<rect x="{x-32}" y="{y-14}" width="64" height="40" rx="6" fill="{TERRE}"/><rect x="{x-12}" y="{y-24}" width="24" height="12" rx="3" fill="none" stroke="{TERRE}" stroke-width="5"/><rect x="{x-32}" y="{y}" width="64" height="5" fill="{MIEL}"/>',
        'bulb': lambda x, y: f'<circle cx="{x}" cy="{y-6}" r="22" fill="{MIEL}"/><rect x="{x-10}" y="{y+14}" width="20" height="14" rx="3" fill="{ENCRE}"/><path d="M{x-6},{y-6} L{x},{y+4} L{x+6},{y-6}" fill="none" stroke="{TERRE}" stroke-width="3"/>',
        'plane': lambda x, y: f'<path d="M{x-34},{y+4} L{x+30},{y-14} Q{x+40},{y-16} {x+36},{y-6} L{x-24},{y+20} Z" fill="{BAOBAB}"/><path d="M{x-6},{y-2} L{x+6},{y+30} L{x+14},{y+28} L{x+8},{y-6} Z" fill="{BAOBAB}"/><path d="M{x-24},{y+8} L{x-32},{y-10} L{x-24},{y-12} L{x-14},{y+4} Z" fill="{BAOBAB}"/>',
        'star': lambda x, y: f'<circle cx="{x-14}" cy="{y-6}" r="14" fill="{PEAUX[2]}"/><path d="M{x-34},{y+26} Q{x-14},{y+2} {x+6},{y+26} Z" fill="{HIBISCUS}"/><path d="M{x+22},{y-24} l5,11 l12,1 l-9,8 l3,12 l-11,-6 l-11,6 l3,-12 l-9,-8 l12,-1 z" fill="{MIEL}"/>',
        'shirt': lambda x, y: f'<path d="M{x-14},{y-24} L{x-34},{y-14} L{x-26},{y+2} L{x-18},{y-2} L{x-18},{y+26} L{x+18},{y+26} L{x+18},{y-2} L{x+26},{y+2} L{x+34},{y-14} L{x+14},{y-24} Q{x},{y-12} {x-14},{y-24} Z" fill="{TERRE_DOUX}"/>',
    }
    for (x, y, k) in cards:
        b.append(dots(560, 330, x, y + 50, HIBISCUS, 2.6, 15))
    for (x, y, k) in cards:
        b.append(card(x, y, 150, 104, icons[k](x + 75, y + 50)))
    # mentions « j'aime » discrètes
    for (hx, hy, sc) in [(660, 200, 1), (1110, 260, 0.8), (690, 600, 0.9)]:
        b.append(f'<path transform="translate({hx} {hy}) scale({sc})" d="M0,6 c-6,-10 -20,-6 -18,5 c1,7 12,14 18,18 c6,-4 17,-11 18,-18 c2,-11 -12,-15 -18,-5 z" fill="{HIBISCUS}" opacity="0.85"/>')
    return svg(W, H, ''.join(b), 'Un adolescent regarde son smartphone, entouré de vignettes : études, réussite professionnelle, entrepreneuriat, voyages, influenceurs, mode')


# ---------------------------------------------------------------- 5. L'ÉCOLE À KINSHASA
def ecole():
    W, H = 1600, 760
    b = [f'<rect width="{W}" height="{H}" fill="{IVOIRE}"/>']
    b.append(f'<circle cx="1380" cy="120" r="70" fill="{MIEL}"/>')
    b.append(palm(130, 470, 330))
    b.append(school_building(220, 470, 1180, 250, columns=8))
    b.append(palm(1480, 470, 280))
    b.append(f'<rect x="0" y="470" width="{W}" height="{H - 470}" fill="#ecdcc6"/>')
    # enseignant en arrière-plan, près d'une porte
    b.append(person(1120, 490, 250, PEAUX[3], BAOBAB, ENCRE, hair='short', pose='book'))
    # élèves au premier plan
    for cx in (370, 960, 1300):
        b.append(f'<ellipse cx="{cx}" cy="722" rx="150" ry="14" fill="#dcc6aa"/>')
    b.append(person(310, 720, 380, PEAUX[2], BLANC, MARINE, hair='puff', bottom_type='skirt', pose='talk', facing=1, backpack=BAOBAB))
    b.append(person(440, 720, 400, PEAUX[0], BLANC, MARINE, hair='short', pose='hips', facing=-1))
    b.append(person(680, 720, 385, PEAUX[4], BLANC, MARINE, hair='bun', bottom_type='skirt', pose='book', facing=0))
    b.append(person(910, 720, 405, PEAUX[1], BLANC, MARINE, hair='shaved', pose='strap', facing=1, backpack=TERRE_DOUX))
    b.append(person(1020, 720, 390, PEAUX[3], BLANC, MARINE, hair='braids', bottom_type='skirt', pose='strap', facing=-1, backpack=HIBISCUS))
    b.append(person(1300, 720, 395, PEAUX[2], BLANC, MARINE, hair='short', pose='wave', facing=-1, backpack=BAOBAB))
    return svg(W, H, ''.join(b), 'Des élèves congolais en uniforme à la sortie des classes dans une école de Kinshasa : discussions, lecture, au revoir ; un enseignant en arrière-plan')


# ---------------------------------------------------------------- SCHÉMAS (insérés dans la page, textes en HTML)
# Textes des schémas, en français et en anglais
TEXTES = {
    'fr': {
        'anneaux': ('Culture, normes et valeurs', 'Réseaux sociaux et numérique', 'Quartier et communauté'),
        'micro': ('Famille', 'Amis', 'École'),
        'centre': ('L’adolescent', 'et ses choix'),
        'titre': 'Les environnements qui entourent l’adolescent',
        'desc': 'Schéma en cercles concentriques inspiré du modèle écologique de Bronfenbrenner : au centre, l’adolescent ; '
                'autour, la famille, les amis et l’école ; puis le quartier et la communauté ; puis les réseaux sociaux et le numérique ; enfin la culture, les normes et les valeurs.',
        'barres': (('Influence des amis', 40), ('Influence des parents', 28), ('Gêne', 20)),
        'pct': lambda v: f'{v} %',
        'barre_titre': lambda label, v: f'{label} : {v} % des répondants',
        'graphique': 'Facteurs de démotivation cités par les répondants à Kamina : influence des amis 40 %, influence des parents 28 %, gêne 20 %',
    },
    'en': {
        'anneaux': ('Culture, norms and values', 'Social media and digital life', 'Neighbourhood and community'),
        'micro': ('Family', 'Friends', 'School'),
        'centre': ('Adolescent', 'and their choices'),
        'micro_r': 114,
        'titre': 'The environments surrounding the adolescent',
        'desc': 'Concentric circles inspired by Bronfenbrenner’s ecological model: at the centre, the adolescent; '
                'around them, family, friends and school; then the neighbourhood and community; then social media and digital life; finally culture, norms and values.',
        'barres': (('Influence of friends', 40), ('Influence of parents', 28), ('Embarrassment', 20)),
        'pct': lambda v: f'{v}%',
        'barre_titre': lambda label, v: f'{label}: {v}% of respondents',
        'graphique': 'Demotivating factors cited by respondents in Kamina: influence of friends 40%, influence of parents 28%, embarrassment 20%',
    },
}


def modele_ecologique(lang='fr'):
    t = TEXTES[lang]
    W = H = 640
    c = 320
    rings = [
        (305, MIEL_CLAIR, t['anneaux'][0]),
        (250, '#f6dcd3', t['anneaux'][1]),
        (195, BAOBAB_CLAIR, t['anneaux'][2]),
        (140, MIEL, ''),
    ]
    b = []
    for r, color, _ in rings:
        b.append(f'<circle cx="{c}" cy="{c}" r="{r}" fill="{color}"/>')
    b.append(f'<circle cx="{c}" cy="{c}" r="68" fill="{TERRE}"/>')
    # étiquettes des anneaux, en haut de chaque anneau
    for r, _, label in rings[:3]:
        b.append(f'<text x="{c}" y="{c - r + 36}" font-size="21" font-weight="600" fill="{ENCRE}" text-anchor="middle" letter-spacing="0.3">{label}</text>')
    # microsystème : famille, amis, école
    for label, ang in zip(t['micro'], (-90, 30, 150)):
        a = math.radians(ang)
        mr = t.get('micro_r', 104)
        x, y = c + math.cos(a) * mr, c + math.sin(a) * mr
        b.append(f'<text x="{x:.1f}" y="{y + 6:.1f}" font-size="22" font-weight="700" fill="{TERRE}" text-anchor="middle">{label}</text>')
    b.append(f'<text x="{c}" y="{c - 4}" font-size="20" font-weight="700" fill="{IVOIRE}" text-anchor="middle">{t["centre"][0]}</text>')
    b.append(f'<text x="{c}" y="{c + 20}" font-size="15" fill="{MIEL}" text-anchor="middle">{t["centre"][1]}</text>')
    body = ''.join(b)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {W} {H}" role="img" aria-labelledby="modele-titre modele-desc" font-family="inherit">'
            f'<title id="modele-titre">{t["titre"]}</title>'
            f'<desc id="modele-desc">{t["desc"]}</desc>'
            f'{body}</svg>')


def kamina(lang='fr'):
    t = TEXTES[lang]
    # Format étroit, libellés au-dessus des barres : reste lisible sur mobile
    W, H = 460, 236
    data = t['barres']
    left, right, top, bar_h, row = 8, 420, 30, 26, 70
    scale = (right - left) / 100
    b = []
    bottom = top + len(data) * row - row + bar_h
    for v in (0, 25, 50, 75, 100):
        x = left + v * scale
        b.append(f'<line x1="{x}" x2="{x}" y1="{top - 4}" y2="{bottom + 8}" stroke="#dcc8b6" stroke-width="1.5"/>')
        b.append(f'<text x="{x}" y="{bottom + 30}" font-size="15" fill="#6b5a55" text-anchor="{"start" if v == 0 else "end" if v == 100 else "middle"}">{t["pct"](v)}</text>')
    for i, (label, v) in enumerate(data):
        y = top + i * row
        w = v * scale
        b.append(f'<text x="{left}" y="{y - 8}" font-size="18" font-weight="600" fill="{ENCRE}">{label}</text>')
        b.append(f'<g><title>{t["barre_titre"](label, v)}</title>'
                 f'<path d="M{left},{y} H{left + w - 4} Q{left + w},{y} {left + w},{y + 4} V{y + bar_h - 4} Q{left + w},{y + bar_h} {left + w - 4},{y + bar_h} H{left} Z" fill="{TERRE}"/></g>')
        b.append(f'<text x="{left + w + 10}" y="{y + bar_h/2 + 6}" font-size="18" font-weight="700" fill="{ENCRE}">{t["pct"](v)}</text>')
    body = ''.join(b)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="kamina-titre" font-family="inherit">'
            f'<title id="kamina-titre">{t["graphique"]}</title>'
            f'{body}</svg>')


if __name__ == '__main__':
    save('1-couverture.svg', cover())
    save('2-amis.svg', amis())
    save('3-famille.svg', famille())
    save('4-reseaux-sociaux.svg', reseaux())
    save('5-ecole-kinshasa.svg', ecole())
    save('schema-modele-ecologique.svg', modele_ecologique())
    save('graphique-kamina.svg', kamina())
    save('schema-modele-ecologique-en.svg', modele_ecologique('en'))
    save('graphique-kamina-en.svg', kamina('en'))
