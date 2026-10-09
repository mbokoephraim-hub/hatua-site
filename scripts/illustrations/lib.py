"""
Briques de dessin des illustrations éditoriales HATUA (SVG, style 2D minimaliste).
Personnages construits à partir de formes simples : traits arrondis pour les membres,
formes pleines pour le buste, la tête et les cheveux. Pas de traits du visage (style éditorial).
"""

# Palette de la charte + tons complémentaires
IVOIRE = '#fbf4ee'
SABLE = '#f3e9df'
MIEL = '#f3d3a0'
MIEL_CLAIR = '#f8e6c6'
TERRE = '#5c1a16'
TERRE_DOUX = '#8a3b2e'
BAOBAB = '#2e4b3c'
BAOBAB_CLAIR = '#e8efe9'
BAOBAB_MOYEN = '#bfd0c4'
HIBISCUS = '#e07a62'
ENCRE = '#2a1512'
MARINE = '#25324d'      # bas d'uniforme scolaire (bleu marine)
BLANC = '#ffffff'
OCRE_MUR = '#e9c89a'    # murs d'école
BRUN_MUR = '#8b3a2b'    # soubassement des murs

PEAUX = ['#5a3420', '#6e4128', '#7f4c2e', '#4a2a19', '#8c5a38']
CHEVEUX = '#1b100c'


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">'
        f'<title>{title}</title>{body}</svg>'
    )


def line(points, color, width, cap='round'):
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in points)
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width:.1f}" stroke-linecap="{cap}" stroke-linejoin="round"/>'


def person(x, ground, H, skin, top, bottom, hair='short', bottom_type='pants', pose='down',
           facing=0, backpack=None, shoes=ENCRE, head_tilt=0, accessory=None):
    """
    Personnage debout. (x, ground) = point au sol entre les pieds ; H = taille totale.
    pose : 'down', 'chin' (main au menton), 'phone' (téléphone tenu devant), 'talk' (main qui explique),
           'strap' (mains aux bretelles du sac), 'book' (livre tenu), 'wave'.
    facing : -1 (tourné vers la gauche), 0 (face), 1 (vers la droite) : décale légèrement la tête.
    """
    u = H
    hip_y = ground - 0.46 * u
    sh_y = ground - 0.78 * u
    head_r = 0.085 * u
    head_cx = x + facing * 0.012 * u
    head_cy = ground - 0.885 * u
    sw = 0.165 * u   # demi-largeur des épaules
    hw = 0.13 * u    # demi-largeur des hanches
    limb = 0.085 * u
    out = []

    # Sac à dos (derrière le buste)
    if backpack:
        bx = x - facing * 0.05 * u
        out.append(f'<rect x="{bx - 0.15*u:.1f}" y="{sh_y + 0.02*u:.1f}" width="{0.30*u:.1f}" height="{0.32*u:.1f}" rx="{0.06*u:.1f}" fill="{backpack}"/>')

    # Jambes
    leg_top = hip_y - 0.02 * u
    lx1, lx2 = x - 0.065 * u, x + 0.065 * u
    if bottom_type == 'skirt':
        out.append(line([(lx1, hip_y + 0.12*u), (lx1, ground - 0.03*u)], skin, limb * 0.85))
        out.append(line([(lx2, hip_y + 0.12*u), (lx2, ground - 0.03*u)], skin, limb * 0.85))
        # chaussettes blanches
        out.append(line([(lx1, ground - 0.11*u), (lx1, ground - 0.03*u)], BLANC, limb * 0.88))
        out.append(line([(lx2, ground - 0.11*u), (lx2, ground - 0.03*u)], BLANC, limb * 0.88))
    else:
        out.append(line([(lx1, leg_top), (lx1 - 0.005*u, ground - 0.03*u)], bottom, limb))
        out.append(line([(lx2, leg_top), (lx2 + 0.005*u, ground - 0.03*u)], bottom, limb))
    # Chaussures
    for sx in (lx1, lx2):
        out.append(f'<ellipse cx="{sx + facing*0.012*u:.1f}" cy="{ground - 0.015*u:.1f}" rx="{0.06*u:.1f}" ry="{0.025*u:.1f}" fill="{shoes}"/>')

    # Buste (forme arrondie des épaules aux hanches)
    torso = (
        f'M{x - sw:.1f},{sh_y + 0.04*u:.1f} '
        f'Q{x - sw:.1f},{sh_y:.1f} {x - sw + 0.05*u:.1f},{sh_y:.1f} '
        f'L{x + sw - 0.05*u:.1f},{sh_y:.1f} '
        f'Q{x + sw:.1f},{sh_y:.1f} {x + sw:.1f},{sh_y + 0.04*u:.1f} '
        f'L{x + hw:.1f},{hip_y:.1f} L{x - hw:.1f},{hip_y:.1f} Z'
    )
    out.append(f'<path d="{torso}" fill="{top}"/>')
    # Jupe ou ceinture
    if bottom_type == 'skirt':
        sk = f'M{x - hw:.1f},{hip_y - 0.01*u:.1f} L{x + hw:.1f},{hip_y - 0.01*u:.1f} L{x + hw + 0.05*u:.1f},{hip_y + 0.17*u:.1f} L{x - hw - 0.05*u:.1f},{hip_y + 0.17*u:.1f} Z'
        out.append(f'<path d="{sk}" fill="{bottom}"/>')
    else:
        out.append(f'<rect x="{x - hw:.1f}" y="{hip_y - 0.035*u:.1f}" width="{2*hw:.1f}" height="{0.05*u:.1f}" fill="{bottom}"/>')
    # Col en V (chemise)
    out.append(f'<path d="M{x - 0.04*u:.1f},{sh_y:.1f} L{x:.1f},{sh_y + 0.06*u:.1f} L{x + 0.04*u:.1f},{sh_y:.1f} Z" fill="{skin}"/>')

    # Bretelles du sac
    if backpack:
        out.append(line([(x - 0.09*u, sh_y + 0.005*u), (x - 0.1*u, sh_y + 0.2*u)], backpack, 0.03*u))
        out.append(line([(x + 0.09*u, sh_y + 0.005*u), (x + 0.1*u, sh_y + 0.2*u)], backpack, 0.03*u))

    # Bras : épaule -> coude -> main (manche courte : haut du bras couleur du haut, avant-bras en peau)
    lsh = (x - sw + 0.035*u, sh_y + 0.04*u)
    rsh = (x + sw - 0.035*u, sh_y + 0.04*u)
    poses = {
        'down': ([(-0.03, 0.17), (-0.04, 0.34)], [(0.03, 0.17), (0.04, 0.34)]),
        'chin': ([(-0.03, 0.17), (-0.04, 0.34)], [(0.05, 0.15), (-0.11, -0.06)]),
        'phone': ([(0.0, 0.17), (0.11, 0.13)], [(0.0, 0.17), (-0.11, 0.13)]),
        'talk': ([(-0.03, 0.17), (-0.04, 0.34)], [(0.08, 0.15), (0.16, 0.06)]),
        'strap': ([(0.0, 0.15), (0.06, 0.06)], [(0.0, 0.15), (-0.06, 0.06)]),
        'book': ([(0.0, 0.17), (0.12, 0.17)], [(0.0, 0.17), (-0.1, 0.18)]),
        'wave': ([(-0.03, 0.17), (-0.04, 0.34)], [(0.1, 0.02), (0.15, -0.14)]),
        'hips': ([(-0.09, 0.14), (-0.03, 0.27)], [(0.09, 0.14), (0.03, 0.27)]),
    }
    larm, rarm = poses[pose]
    for (sx, sy), arm, sign in ((lsh, larm, 1), (rsh, rarm, 1)):
        (ex, ey), (hx, hy) = arm
        elbow = (sx + ex * u, sy + ey * u)
        hand = (sx + hx * u, sy + hy * u)
        out.append(line([(sx, sy), elbow], top, limb * 0.95))
        out.append(line([elbow, hand], skin, limb * 0.78))
    if pose == 'phone':
        px, py = x, sh_y + 0.16 * u
        out.append(f'<rect x="{px - 0.045*u:.1f}" y="{py - 0.075*u:.1f}" width="{0.09*u:.1f}" height="{0.15*u:.1f}" rx="{0.015*u:.1f}" fill="{ENCRE}"/>')
        out.append(f'<rect x="{px - 0.035*u:.1f}" y="{py - 0.063*u:.1f}" width="{0.07*u:.1f}" height="{0.12*u:.1f}" rx="{0.008*u:.1f}" fill="{MIEL}"/>')
    if pose == 'book':
        bx, by = x + 0.01*u, sh_y + 0.2*u
        out.append(f'<rect x="{bx - 0.11*u:.1f}" y="{by - 0.06*u:.1f}" width="{0.22*u:.1f}" height="{0.12*u:.1f}" rx="{0.01*u:.1f}" fill="{HIBISCUS}"/>')

    # Cou + tête
    out.append(line([(head_cx, head_cy + head_r * 0.6), (x, sh_y + 0.01*u)], skin, 0.07 * u, 'butt'))
    rot = f' transform="rotate({head_tilt} {head_cx:.1f} {head_cy:.1f})"' if head_tilt else ''
    head = [f'<ellipse cx="{head_cx:.1f}" cy="{head_cy:.1f}" rx="{head_r*0.92:.1f}" ry="{head_r:.1f}" fill="{skin}"/>']
    hr = head_r
    if hair == 'short':
        head.insert(0, f'<path d="M{head_cx - hr*0.98:.1f},{head_cy - hr*0.05:.1f} Q{head_cx - hr:.1f},{head_cy - hr*1.25:.1f} {head_cx:.1f},{head_cy - hr*1.2:.1f} Q{head_cx + hr:.1f},{head_cy - hr*1.25:.1f} {head_cx + hr*0.98:.1f},{head_cy - hr*0.05:.1f} Z" fill="{CHEVEUX}"/>')
    elif hair == 'puff':
        head.insert(0, f'<circle cx="{head_cx:.1f}" cy="{head_cy - hr*0.55:.1f}" r="{hr*1.2:.1f}" fill="{CHEVEUX}"/>')
    elif hair == 'braids':
        for k in (-0.75, -0.25, 0.25, 0.75):
            head.insert(0, line([(head_cx + k*hr, head_cy + hr*0.6), (head_cx + k*hr*1.15, head_cy + hr*1.75)], CHEVEUX, hr*0.32))
        head.insert(0, f'<path d="M{head_cx - hr*1.05:.1f},{head_cy + hr*1.6:.1f} L{head_cx - hr*1.05:.1f},{head_cy - hr*0.3:.1f} Q{head_cx - hr*1.05:.1f},{head_cy - hr*1.3:.1f} {head_cx:.1f},{head_cy - hr*1.3:.1f} Q{head_cx + hr*1.05:.1f},{head_cy - hr*1.3:.1f} {head_cx + hr*1.05:.1f},{head_cy - hr*0.3:.1f} L{head_cx + hr*1.05:.1f},{head_cy + hr*1.6:.1f} Z" fill="{CHEVEUX}"/>')
    elif hair == 'bun':
        head.insert(0, f'<circle cx="{head_cx:.1f}" cy="{head_cy - hr*1.15:.1f}" r="{hr*0.5:.1f}" fill="{CHEVEUX}"/>')
        head.insert(1, f'<path d="M{head_cx - hr*0.98:.1f},{head_cy:.1f} Q{head_cx - hr:.1f},{head_cy - hr*1.2:.1f} {head_cx:.1f},{head_cy - hr*1.15:.1f} Q{head_cx + hr:.1f},{head_cy - hr*1.2:.1f} {head_cx + hr*0.98:.1f},{head_cy:.1f} Z" fill="{CHEVEUX}"/>')
    elif hair == 'wrap':  # foulard
        head.append(f'<path d="M{head_cx - hr*1.05:.1f},{head_cy - hr*0.1:.1f} Q{head_cx - hr*1.2:.1f},{head_cy - hr*1.6:.1f} {head_cx + hr*0.2:.1f},{head_cy - hr*1.45:.1f} Q{head_cx + hr*1.3:.1f},{head_cy - hr*1.35:.1f} {head_cx + hr*1.05:.1f},{head_cy - hr*0.1:.1f} Z" fill="{accessory or HIBISCUS}"/>')
    elif hair == 'shaved':
        head.insert(0, f'<path d="M{head_cx - hr*0.95:.1f},{head_cy - hr*0.2:.1f} Q{head_cx:.1f},{head_cy - hr*1.35:.1f} {head_cx + hr*0.95:.1f},{head_cy - hr*0.2:.1f} Z" fill="{CHEVEUX}"/>')
    out.append(f'<g{rot}>' + ''.join(head) + '</g>')
    return '<g>' + ''.join(out) + '</g>'


def seated(x, seat_y, H, skin, top, hair='short', arms='table', table_y=None, facing=0, accessory=None, gesture=False):
    """Personnage assis derrière une table : seuls le buste, les bras et la tête sont visibles."""
    u = H
    sh_y = seat_y - 0.32 * u
    sw = 0.165 * u
    hw = 0.14 * u
    head_r = 0.085 * u
    head_cx = x + facing * 0.02 * u
    head_cy = sh_y - 0.11 * u
    limb = 0.085 * u
    out = []
    torso = (
        f'M{x - sw:.1f},{sh_y + 0.04*u:.1f} Q{x - sw:.1f},{sh_y:.1f} {x - sw + 0.05*u:.1f},{sh_y:.1f} '
        f'L{x + sw - 0.05*u:.1f},{sh_y:.1f} Q{x + sw:.1f},{sh_y:.1f} {x + sw:.1f},{sh_y + 0.04*u:.1f} '
        f'L{x + hw:.1f},{seat_y:.1f} L{x - hw:.1f},{seat_y:.1f} Z'
    )
    out.append(f'<path d="{torso}" fill="{top}"/>')
    out.append(f'<path d="M{x - 0.04*u:.1f},{sh_y:.1f} L{x:.1f},{sh_y + 0.06*u:.1f} L{x + 0.04*u:.1f},{sh_y:.1f} Z" fill="{skin}"/>')
    ty = table_y if table_y is not None else seat_y - 0.05 * u
    lsh = (x - sw + 0.035*u, sh_y + 0.04*u)
    rsh = (x + sw - 0.035*u, sh_y + 0.04*u)
    d = facing if facing else 1
    for (sx, sy), side in ((lsh, -1), (rsh, 1)):
        elbow = (sx + side * 0.02 * u, ty - 0.02 * u)
        if gesture and side == d:
            hand = (sx + d * 0.2 * u, sy - 0.02 * u)
            elbow = (sx + d * 0.1 * u, ty - 0.06 * u)
        else:
            hand = (sx + (-side) * 0.08 * u + d * 0.1 * u, ty - 0.01 * u)
        out.append(line([(sx, sy), elbow], top, limb * 0.95))
        out.append(line([elbow, hand], skin, limb * 0.78))
    out.append(line([(head_cx, head_cy + head_r * 0.6), (x, sh_y + 0.01*u)], skin, 0.07 * u, 'butt'))
    hr = head_r
    head = [f'<ellipse cx="{head_cx:.1f}" cy="{head_cy:.1f}" rx="{hr*0.92:.1f}" ry="{hr:.1f}" fill="{skin}"/>']
    if hair == 'short':
        head.insert(0, f'<path d="M{head_cx - hr*0.98:.1f},{head_cy - hr*0.05:.1f} Q{head_cx - hr:.1f},{head_cy - hr*1.25:.1f} {head_cx:.1f},{head_cy - hr*1.2:.1f} Q{head_cx + hr:.1f},{head_cy - hr*1.25:.1f} {head_cx + hr*0.98:.1f},{head_cy - hr*0.05:.1f} Z" fill="{CHEVEUX}"/>')
    elif hair == 'wrap':
        head.append(f'<path d="M{head_cx - hr*1.05:.1f},{head_cy - hr*0.1:.1f} Q{head_cx - hr*1.2:.1f},{head_cy - hr*1.6:.1f} {head_cx + hr*0.2:.1f},{head_cy - hr*1.45:.1f} Q{head_cx + hr*1.3:.1f},{head_cy - hr*1.35:.1f} {head_cx + hr*1.05:.1f},{head_cy - hr*0.1:.1f} Z" fill="{accessory or HIBISCUS}"/>')
    elif hair == 'puff':
        head.insert(0, f'<circle cx="{head_cx:.1f}" cy="{head_cy - hr*0.55:.1f}" r="{hr*1.2:.1f}" fill="{CHEVEUX}"/>')
    elif hair == 'braids':
        head.insert(0, f'<path d="M{head_cx - hr*1.05:.1f},{head_cy + hr*1.6:.1f} L{head_cx - hr*1.05:.1f},{head_cy - hr*0.3:.1f} Q{head_cx - hr*1.05:.1f},{head_cy - hr*1.3:.1f} {head_cx:.1f},{head_cy - hr*1.3:.1f} Q{head_cx + hr*1.05:.1f},{head_cy - hr*1.3:.1f} {head_cx + hr*1.05:.1f},{head_cy - hr*0.3:.1f} L{head_cx + hr*1.05:.1f},{head_cy + hr*1.6:.1f} Z" fill="{CHEVEUX}"/>')
    out.append(''.join(head))
    return '<g>' + ''.join(out) + '</g>'


def school_building(x, ground, w, h, columns=5):
    """Bâtiment scolaire de Kinshasa : murs ocre, soubassement brun, galerie à arcades, portes et persiennes."""
    out = []
    top = ground - h
    out.append(f'<rect x="{x}" y="{top}" width="{w}" height="{h}" fill="{OCRE_MUR}"/>')
    out.append(f'<rect x="{x}" y="{ground - h*0.28:.1f}" width="{w}" height="{h*0.28:.1f}" fill="{BRUN_MUR}"/>')
    # toit en tôle
    out.append(f'<path d="M{x - 20},{top} L{x + w + 20},{top} L{x + w},{top - h*0.12:.1f} L{x},{top - h*0.12:.1f} Z" fill="{TERRE_DOUX}"/>')
    # portes / fenêtres
    step = w / columns
    for i in range(columns):
        cx = x + step * (i + 0.5)
        if i % 2 == 0:
            out.append(f'<rect x="{cx - step*0.18:.1f}" y="{top + h*0.25:.1f}" width="{step*0.36:.1f}" height="{h*0.75:.1f}" fill="{TERRE}"/>')
        else:
            out.append(f'<rect x="{cx - step*0.22:.1f}" y="{top + h*0.22:.1f}" width="{step*0.44:.1f}" height="{h*0.3:.1f}" fill="{BAOBAB}"/>')
            for k in range(4):
                yy = top + h*0.25 + k * h*0.065
                out.append(f'<rect x="{cx - step*0.2:.1f}" y="{yy:.1f}" width="{step*0.4:.1f}" height="{h*0.02:.1f}" fill="{BAOBAB_MOYEN}" opacity="0.5"/>')
    # piliers de la galerie
    for i in range(columns + 1):
        px = x + step * i
        out.append(f'<rect x="{px - 7:.1f}" y="{top:.1f}" width="14" height="{h:.1f}" fill="{IVOIRE}" opacity="0.9"/>')
    return ''.join(out)


def palm(x, ground, h):
    out = [line([(x, ground), (x + h*0.08, ground - h)], '#7a5a3a', h*0.06)]
    tx, ty = x + h*0.08, ground - h
    for ang_pts in [(-0.45, 0.05), (-0.3, -0.2), (0.0, -0.3), (0.3, -0.2), (0.45, 0.05), (-0.25, 0.2), (0.25, 0.2)]:
        dx, dy = ang_pts
        out.append(f'<path d="M{tx:.1f},{ty:.1f} Q{tx + dx*h*0.5:.1f},{ty + dy*h*0.5 - h*0.15:.1f} {tx + dx*h:.1f},{ty + dy*h + h*0.08:.1f}" fill="none" stroke="{BAOBAB}" stroke-width="{h*0.05:.1f}" stroke-linecap="round"/>')
    return ''.join(out)


def bubble(x, y, w, h, color, tail='left'):
    tx = x + (w * 0.25 if tail == 'left' else w * 0.75)
    return (
        f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{h/2:.1f}" fill="{color}"/>'
        f'<path d="M{tx - 10:.1f},{y + h - 2:.1f} L{tx + (8 if tail == "left" else -8) - 4:.1f},{y + h + 16:.1f} L{tx + 10:.1f},{y + h - 2:.1f} Z" fill="{color}"/>'
    )


def dots(x1, y1, x2, y2, color, r=3.2, gap=16):
    import math
    n = max(2, int(math.hypot(x2 - x1, y2 - y1) / gap))
    return ''.join(f'<circle cx="{x1 + (x2-x1)*i/n:.1f}" cy="{y1 + (y2-y1)*i/n:.1f}" r="{r}" fill="{color}"/>' for i in range(1, n))
