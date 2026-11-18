# miniatures-shorts-grille.py — le GABARIT A des miniatures de shorts (Frédéric, 18/11/2026 : « gabarit A »).
#
# Pourquoi : l'onglet Shorts de la chaîne montre chaque short dans une carte 2:3 (206 × 309 px,
# mesuré le 18/11 sur youtube.com/@eleveai974/shorts) en « cover » : sur un PNG 1080 × 1920,
# il COUPE 150 px EN HAUT ET 150 px EN BAS. Les anciennes miniatures posaient la question à
# 60 px du haut : le mot clé disparaissait. Ici, tout ce qui compte tient entre y = 215 et 1700.
#
# Le gabarit A : le décor du film flouté derrière, la QUESTION dans une carte blanche en haut,
# le CALCUL en très gros sur une ardoise, l'échelle des ceintures, Ti Margo en petit médaillon,
# la pastille « Dessin animé ».
#
# Le contenu de chaque short est dans scripts/miniatures-shorts-grille.json (clé = id du manifeste).
# La miniature du manifeste est RÉÉCRITE sur place ; l'ancienne est gardée à côté sous
# « <nom>-avant-grille.png » et sert de source (décor, Ti Margo) : relancer ne dégrade rien.
# ⚠️ Relancer `node scripts/ti-margo-short.mjs <série> <ép> miniature` écrase la nouvelle
# par l'ancien style : il faut alors relancer ce script (il reprend l'image fraîche comme source).
#
# Usage :  python scripts/miniatures-shorts-grille.py [filtre]          → écrit les PNG
#          python scripts/miniatures-shorts-grille.py [filtre] --planche → + planche de contrôle
# Poser en ligne ensuite : node scripts/publier-youtube.mjs --miniatures id1,id2 (avec l'accord de Frédéric).
import json, os, shutil, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

RACINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RACINE / 'manim'))
from miniature_short_expression import echelle  # l'échelle des ceintures, dessinée (REGLES.md)

W, H = 1080, 1920
COUPE = 150                 # ce que la grille de la chaîne coupe en haut et en bas
HAUT, BAS = 215, 1700       # la zone sûre, avec 65 px de marge
VERT, ORANGE = '#17452a', '#e8590c'
COUL = {'blanc': '#f8f9fa', 'jaune': '#ffd43b', 'bleu': '#74c0fc', 'rouge': '#ff8787',
        'vert': '#8ce99a', 'gris': '#adb5bd', 'rose': '#faa2c1'}
POLICE = 'C:/Windows/Fonts/'


def F(n, f='seguibl.ttf'):
    return ImageFont.truetype(POLICE + f, n)


def ajuste(d, s, taille, larg, police='seguibl.ttf'):
    while True:
        f = F(taille, police); bb = d.textbbox((0, 0), s, font=f)
        if bb[2] - bb[0] <= larg or taille <= 30:
            return f, bb
        taille -= 4


def ecrit_centre(d, cx, cy, s, taille, coul, larg):
    f, bb = ajuste(d, s, taille, larg)
    d.text((cx - (bb[2] - bb[0]) / 2 - bb[0], cy - (bb[3] - bb[1]) / 2 - bb[1]), s, font=f, fill=coul)


def bloc(d, y, lignes, larg=930):
    """lignes = [(texte, taille, couleur)] centrées à partir de y ; renvoie le y de fin."""
    for s, t, c in lignes:
        f, bb = ajuste(d, s, t, larg); h = bb[3] - bb[1]
        ecrit_centre(d, W / 2, y + h / 2, s, t, c, larg)
        y += h + 26
    return y - 26


def medaillon(src, diam, boite=None):
    """Ti Margo (tête et haut du corps) pris dans l'ancienne miniature, dans un rond blanc."""
    im = Image.open(src).convert('RGB')
    if boite:
        x, y, c = boite
    else:
        px = im.load()  # le vert de Ti Margo le plus haut, dans la moitié centrale
        ys = [yy for yy in range(450, 1500, 6) for xx in range(300, 800, 10)
              if px[xx, yy][1] > 150 and px[xx, yy][0] < 140 and px[xx, yy][2] < 120]
        y = (min(ys) - 50) if ys else 700
        x, c = 190, 700
    im = im.crop((x, y, x + c, y + c)).resize((diam, diam), Image.LANCZOS)
    m = Image.new('L', (diam, diam), 0); ImageDraw.Draw(m).ellipse((0, 0, diam, diam), fill=255)
    out = Image.new('RGBA', (diam + 20, diam + 20), (0, 0, 0, 0))
    ImageDraw.Draw(out).ellipse((0, 0, diam + 19, diam + 19), fill='#ffffff')
    out.paste(im, (10, 10), m)
    return out


def margo_2d(h):
    im = Image.open(RACINE / 'public' / 'cahier-vacances' / 'ti-margo.png').convert('RGBA')
    im = im.crop(im.getbbox())
    return im.resize((int(im.width * h / im.height), h), Image.LANCZOS)


def pastille(d, cx, cy, s, fond=VERT, coul='#fff', taille=58):
    f = F(taille, 'segoeuib.ttf'); bb = d.textbbox((0, 0), s, font=f)
    w, h = bb[2] - bb[0], bb[3] - bb[1]
    d.rounded_rectangle((cx - w / 2 - 36, cy - h / 2 - 22, cx + w / 2 + 36, cy + h / 2 + 26), radius=999, fill=fond)
    d.text((cx - w / 2 - bb[0], cy - h / 2 - bb[1]), s, font=f, fill=coul)


def figure_triangles(d, x0, y0, x1, y1):
    """Le grand triangle coupé par deux traits partant du sommet : combien de triangles ?"""
    cx = (x0 + x1) / 2; A = (cx, y0 + 30); B = (x0 + 90, y1 - 40); C = (x1 - 90, y1 - 40)
    P = (B[0] + (C[0] - B[0]) * .38, B[1]); Q = (B[0] + (C[0] - B[0]) * .7, B[1])
    d.line([A, B, C, A], fill=COUL['blanc'], width=16, joint='curve')
    d.line([A, P], fill=COUL['jaune'], width=14); d.line([A, Q], fill=COUL['jaune'], width=14)
    for p in (A, B, C, P, Q):
        d.ellipse((p[0] - 14, p[1] - 14, p[0] + 14, p[1] + 14), fill=COUL['blanc'])
    f = F(150)
    d.text((x0 + 110, y0 + 20), '?', font=f, fill=COUL['jaune'])
    d.text((x1 - 230, y0 + 20), '?', font=f, fill=COUL['jaune'])


def dessine(e, src):
    """e = l'entrée du registre ; src = l'ancienne miniature (décor + Ti Margo), ou None."""
    if src:
        fond = Image.open(src).convert('RGB').resize((W, H)).filter(ImageFilter.GaussianBlur(20))
        im = Image.blend(fond, Image.new('RGB', (W, H), '#0b1a12'), .4)
        # hors zone sûre, le flou de l'ancien texte se devine : on fonce vers les bords
        voile = Image.new('L', (W, H), 0); dv = ImageDraw.Draw(voile)
        for y in range(HAUT):
            dv.line((0, y, W, y), fill=int(200 * (1 - y / HAUT)))
        for y in range(BAS, H):
            dv.line((0, y, W, y), fill=int(200 * (y - BAS) / (H - BAS)))
        im = Image.composite(Image.new('RGB', (W, H), '#0b1a12'), im, voile)
    else:
        im = Image.new('RGB', (W, H), '#e9eef8')
    d = ImageDraw.Draw(im)

    # 1. La question, dans une carte blanche, en haut de la zone sûre
    lignes = [(q, 100, VERT) for q in e['question']] + [(e.get('accroche', 'TU PARIES ?'), 136, ORANGE)]
    h = _hauteur(lignes)
    d.rounded_rectangle((50, HAUT, W - 50, HAUT + h + 60), radius=40, fill='#fff', outline=VERT, width=8)
    bloc(d, HAUT + 30, lignes)

    # 2. Le calcul en très gros, sur l'ardoise
    y0, y1 = HAUT + h + 60 + 30, 1210
    d.rounded_rectangle((60, y0, W - 60, y1), radius=36, fill='#1f3b2c', outline='#8a5a2b', width=18)
    if e.get('figure') == 'triangles':
        figure_triangles(d, 90, y0 + 20, W - 90, y1 - 20)
    else:
        cal = e['calcul']; pas = (y1 - y0 - 40) / len(cal)
        for k, (s, coul, *t) in enumerate(cal):
            ecrit_centre(d, W / 2, y0 + 20 + pas * (k + .5), s, t[0] if t else 200,
                         COUL.get(coul, coul), W - 240)

    # 3. L'échelle des ceintures (REGLES.md : les miniatures la dessinent aussi)
    if e.get('ceinture'):
        d.rounded_rectangle((60, 1228, W - 60, 1430), radius=30, fill='#fff', outline=VERT, width=6)
        echelle(d, W // 2, 1282, e['ceinture'], s=0.8, pas=100)

    # 4. Ti Margo en médaillon et la pastille, en bas de la zone sûre
    if src and not e.get('margo_2d'):
        md = medaillon(src, 230, e.get('margo'))
        im.paste(md, (55, BAS - md.height), md)
    else:
        mg = margo_2d(270)
        im.paste(mg, (70, BAS - mg.height), mg)
    mention = e.get('mention', 'Dessin animé')
    if mention:
        pastille(d, 680, BAS - 135, mention, fond=e.get('fond_mention', VERT))
    return im


def _hauteur(lignes):
    d = ImageDraw.Draw(Image.new('RGB', (W, 10)))
    y = 0
    for s, t, c in lignes:
        f, bb = ajuste(d, s, t, 930); y += bb[3] - bb[1] + 26
    return y - 26


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    filtre = args[0] if args else ''
    reg = json.loads((RACINE / 'scripts' / 'miniatures-shorts-grille.json').read_text(encoding='utf-8'))
    man = json.loads((RACINE / 'manim' / 'manifeste-youtube.json').read_text(encoding='utf-8'))
    V = {v['id']: v for v in man['videos']}
    faites = []
    for cle, e in reg.items():
        if cle.startswith('_') or filtre not in cle:
            continue
        rel = V[cle]['miniature']
        cible = next((p for p in (RACINE / 'manim' / 'miniatures' / rel, RACINE / 'manim' / 'sorties' / rel) if p.exists()), None)
        if not cible:
            print(f'  {cle} : miniature absente ({rel})'); continue
        avant = cible.with_name(cible.stem + '-avant-grille.png')
        if not avant.exists():
            shutil.copy2(cible, avant)
        src = None if e.get('sans_decor') else avant
        im = dessine(e, src)
        im.save(cible)
        faites.append((cle, im))
        print(f'  {cle} : {cible.relative_to(RACINE)}')
    if '--planche' in sys.argv and faites:
        n = len(faites); col = min(n, 6); lig = (n + col - 1) // col
        pl = Image.new('RGB', (col * 220 + 20, lig * (330 + 40) + 20), '#0f0f0f'); d = ImageDraw.Draw(pl)
        for i, (cle, im) in enumerate(faites):
            x, y = 20 + (i % col) * 220, 20 + (i // col) * 370
            pl.paste(im.crop((0, COUPE, W, H - COUPE)).resize((200, 300), Image.LANCZOS), (x, y))
            d.text((x, y + 304), cle[:30], font=F(13, 'segoeuib.ttf'), fill='#ddd')
        out = RACINE / 'manim' / 'sorties' / 'planche-miniatures-shorts-grille.png'
        pl.save(out); print('planche :', out.relative_to(RACINE))


if __name__ == '__main__':
    main()
