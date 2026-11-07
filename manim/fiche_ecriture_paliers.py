# « Mon cahier d'écriture » par PALIERS : la nouvelle philosophie du cahier.
#
# ── POURQUOI CE FICHIER EXISTE (06/11/2026) ───────────────────────────────────
# Frédéric a donné le premier cahier à deux élèves d'ULIS : « j'ai adoré le
# diplôme, pour une fois ils étaient fiers ». Puis : « petit à petit, leur
# apprendre à diminuer la hauteur des lettres », « qu'il puisse à la fin écrire
# avec de belles lettres », « des assemblages de nombres qui forment des
# dizaines, des centaines, exactement comme les lettres », « le sentiment de
# réussir est essentiel ».
#
# ⭐ LA PHILOSOPHIE, EN QUATRE RÈGLES :
#   1. LA RÉUSSITE D'ABORD : on repasse avant d'écrire seul, chaque page peut se
#      finir, chaque ligne a son étoile, chaque palier a son diplôme. Aucun bilan
#      négatif sur la feuille.
#   2. LA HAUTEUR DESCEND par 5 paliers (10, 7, 5, 3, 2 mm par interligne), jusqu'à
#      l'interligne d'un cahier ordinaire.
#   3. LES AIDES S'EFFACENT avec la hauteur : point vert et pointillés partout au
#      début, un seul modèle à la fin.
#   4. CHIFFRES ET LETTRES, MÊME CHEMIN : lettres → syllabes → mots → phrases ;
#      chiffres → dizaines → nombres → centaines → grands nombres.
#
# ⛔ MÊMES TRACÉS QUE LES VIDÉOS (`traces_scenes.py`). Tant que b j v w x z ne sont
# pas tracées, aucun mot ne les utilise (ni lettre accentuée).
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   python manim/fiche_ecriture_paliers.py           → les deux cahiers
#
# Deux cahiers : LES LETTRES et LES NOMBRES, chacun avec sa page de garde à décorer,
# ses médailles à gagner, ses 5 paliers et ses diplômes.
# Sortie : public/fiches-ecriture/mon-cahier-paliers/ (l'ancien cahier ne bouge pas)

import json
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))
import fiche_ecriture_ulis as ulis  # noqa: E402
from fiche_ecriture import (  # noqa: E402
    BLEU, GRIS_LIGNE, GRIS_MODELE, H, MARGE, NAVY, TI_MARGO, VERT, W, _un_trait, police,
)
from fiche_ecriture_ulis import (  # noqa: E402
    JAUNE_BORD, JAUNE_CLAIR, ORANGE, ROSE, etoile, smiley,
)
from traces_scenes import spec_chiffre as _spec_chiffre, spec_lettre  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIE = RACINE / "public" / "fiches-ecriture" / "mon-cahier-paliers"
VERT_FONCE = (20, 110, 60)
MM = W / 210  # pixels par millimètre sur l'A4

# Le zéro du tracé est étroit (0,68 de large pour 1,9 de haut, quand les autres
# chiffres font 0,9) : on l'élargit, le geste reste le même.
LARGEUR_ZERO = 1.3


def spec_chiffre(n: int) -> dict:
    spec = _spec_chiffre(n)
    if n == 0:
        spec = {**spec, "traits": [[(x * LARGEUR_ZERO, y) for x, y in t] for t in spec["traits"]]}
    return spec


# ⭐ « Les lettres étaient très grosses » (Frédéric, 06/11) : le palier 1 passe de
# 13 mm à 10 mm.
MM_PALIER = {1: 10, 2: 7, 3: 5, 4: 3, 5: 2}
NOMS = {
    "lettres": {1: "Lettres géantes", 2: "Lettres grandes", 3: "Lettres moyennes",
                4: "Lettres petites", 5: "Belles lettres"},
    "nombres": {1: "Chiffres géants", 2: "Chiffres grands", 3: "Nombres moyens",
                4: "Nombres petits", 5: "Beaux nombres"},
}
COURT = {
    "lettres": {1: "Géantes", 2: "Grandes", 3: "Moyennes", 4: "Petites", 5: "Belles"},
    "nombres": {1: "Géants", 2: "Grands", 3: "Moyens", 4: "Petits", 5: "Beaux"},
}

# Le contenu de chaque palier : (titre, éléments, décomposer les nombres ?).
PAGES = {
    "lettres": {
        2: [
            ("Les lettres qui ont une grande boucle", ["l", "h", "k"], False),
            ("Les lettres rondes", ["a", "c", "o"], False),
            ("Les lettres rondes qui montent ou qui descendent", ["d", "g", "q"], False),
            ("Les lettres qui montent et qui redescendent", ["i", "u", "t", "y"], False),
            ("Les lettres avec des ponts", ["n", "m", "r"], False),
            ("Les dernières lettres", ["e", "s", "p", "f"], False),
            ("J'attache deux lettres", ["ma", "la", "to", "pa"], False),
            ("J'attache encore deux lettres", ["ri", "no", "lu", "sa"], False),
        ],
        3: [
            ("Mes premiers mots", ["ami", "papa", "moto", "lune", "lit", "mur"], False),
            ("D'autres mots", ["rat", "rose", "nid", "sac", "main", "os"], False),
            ("Encore des mots", ["pomme", "porte", "tasse", "maman", "lapin", "poule"], False),
        ],
        4: [
            ("Des mots plus longs", ["tomate", "maison", "soleil", "souris", "salade", "lampe"], False),
            ("Encore plus longs", ["tortue", "melon", "renard", "cerise", "nuage", "gomme"], False),
            ("Les mots les plus longs", ["montagne", "carotte", "dauphin", "domino", "oreille", "ordinateur"], False),
        ],
        5: [
            ("Mes premières phrases", ["le chat dort", "la lune monte", "la poule a un nid",
                                       "le soleil est chaud", "ma main trace des lettres"], False),
            ("Encore des phrases", ["maman lit", "papa porte le sac", "la moto roule",
                                    "mon ami a un lapin", "la montagne est haute"], False),
        ],
    },
    "nombres": {
        2: [
            ("Les chiffres, plus petits", ["0", "1", "2", "3", "4"], False),
            ("Encore les chiffres", ["5", "6", "7", "8", "9"], False),
            ("Dix, et ce qui vient après", ["10", "11", "12", "13"], True),
            ("Je continue à compter", ["14", "15", "16", "17"], True),
            ("Encore deux, et voici vingt", ["18", "19", "20"], True),
            ("Les dizaines", ["20", "30", "40", "50"], True),
            ("Les dizaines, encore", ["60", "70", "80", "90"], True),
        ],
        3: [
            ("Dizaines et unités", ["23", "34", "45", "56"], True),
            ("Dizaines et unités, encore", ["67", "78", "89", "91"], True),
            ("Cent !", ["98", "99", "100"], True),
        ],
        4: [
            ("Les centaines", ["100", "200", "300", "400", "500"], True),
            ("Les centaines, jusqu'à neuf cents", ["600", "700", "800", "900"], True),
            ("Centaines, dizaines et unités", ["125", "240", "368", "507", "999"], True),
        ],
        5: [
            # ⭐ Avec l'espace des milliers, comme au tableau (2026 est une année : sans).
            ("Les grands nombres", ["1 000", "2 000", "5 000", "2026", "10 000"], False),
            ("Des nombres de ma vie", ["12", "60", "365", "974", "2026"], False),
        ],
    },
}

# Les aides, palier par palier : combien de copies à repasser, et où va le point vert.
AIDES = {
    2: {"repasser": 2, "points": "tous"},
    3: {"repasser": 2, "points": "premier"},
    4: {"repasser": 1, "points": "premier"},
    5: {"repasser": 0, "points": "modele"},
}

# Tournées vers l'effort, et valables pour une fille comme pour un garçon.
ENCOURAGEMENTS = [
    "Regarde : ton écriture devient plus belle.",
    "Doucement, c'est comme ça qu'on réussit.",
    "Tu sais déjà faire tout ça. Bravo !",
    "Une ligne après l'autre : tu vas y arriver.",
    "Tu as le droit de recommencer à côté.",
    "Ta main apprend un peu plus chaque jour.",
    "Prends ton temps. C'est toi qui décides.",
    "Chaque ligne finie est une victoire.",
]


# ── ASSEMBLER LES LETTRES ET LES CHIFFRES ─────────────────────────────────────
def _bezier(p0, p1, p2, p3, n=18):
    pts = []
    for k in range(1, n + 1):
        t = k / n
        a, b, c, e = (1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t ** 2, t ** 3
        pts.append((a * p0[0] + b * p1[0] + c * p2[0] + e * p3[0],
                    a * p0[1] + b * p1[1] + c * p2[1] + e * p3[1]))
    return pts


ENTREE_BASSE = set("efhiklrsuy")


def assembler(texte: str) -> dict:
    """Un mot ou un nombre → {traits, points, largeur}, repère en interlignes.

    ⭐ L'attache suit l'écriture : la sortie d'une lettre rejoint la montée de la
    suivante (on coupe le début de cette montée à la bonne hauteur), ou passe
    par-dessus quand la lettre commence en haut (a, c, d, g, o, q).
    """
    traits, points = [], []
    x, sortie, courant = 0.0, None, None
    for c in texte:
        if c == " ":
            # L'espace des milliers est plus courte que celle entre deux mots.
            x += 0.5 if texte.replace(" ", "").isdigit() else 1.5
            sortie = courant = None
            continue
        spec = spec_chiffre(int(c)) if c.isdigit() else spec_lettre(c)
        ts = [list(t) for t in spec["traits"]]
        xs = [px for t in ts for px, _ in t]
        xmin, xmax = min(xs), max(xs)
        point = spec.get("point")
        if c.isdigit() or sortie is None:
            ecart = 0.4 if (c.isdigit() and traits) else 0.0
            dx = x + ecart - xmin
            ts = [[(px + dx, py) for px, py in t] for t in ts]
            traits += ts
            premier = ts[0]
        else:
            xe, ye = sortie
            debut = ts[0][0]
            if c in ENTREE_BASSE:
                j = next((k for k, p in enumerate(ts[0]) if p[1] >= ye), 0)
                dx = xe - ts[0][j][0]
                # ⭐ Le corps de la lettre ne doit pas mordre la précédente (« ce » de
                # « trace ») : seule la partie basse compte, une grande boucle haute
                # peut passer au-dessus.
                bas_corps = [px for t in ts for px, py in t[j:] if py < 1.15]
                dx2 = max(dx, x + 0.06 - min(bas_corps))
                ts = [[(px + dx2, py) for px, py in t] for t in ts]
                if dx2 > dx:
                    courant.append(ts[0][j])
                courant += ts[0][j + 1:]
                dx = dx2
            else:
                if c == "t":
                    dx = xe + 0.2 - debut[0]
                elif c in "mnp":
                    dx = xe + 0.3 - debut[0]
                else:
                    dx = xe + 0.12 - xmin
                ts = [[(px + dx, py) for px, py in t] for t in ts]
                sx, sy = ts[0][0]
                haut = max(sy, ye) + (0.0 if c in "tmnp" else 0.22)
                courant += _bezier((xe, ye), (xe + 0.3 * (sx - xe), ye + 0.7 * (haut - ye)),
                                   (sx - 0.3 * (sx - xe), haut), (sx, sy))
                courant += ts[0][1:]
            traits += ts[1:]
            premier = courant
        if point:
            points.append((point[0] + dx, point[1]))
        xs = [px for t in ts for px, _ in t]
        x = max(xs)
        if c.isdigit() or c == "s":
            # Les chiffres ne s'attachent pas ; le « s » finit en crochet sur la ligne.
            sortie = courant = None
            x += 0.2 if c == "s" else 0
        elif c == "t":
            courant = premier
            sortie = ts[0][-1]
        else:
            courant = traits[-1] if len(ts) > 1 else premier
            sortie = courant[-1]
    tous = [p for t in traits for p in t]
    xmin = min(p[0] for p in tous)
    traits = [[(px - xmin, py) for px, py in t] for t in traits]
    points = [(px - xmin, py) for px, py in points]
    ys = [p[1] for t in traits for p in t]
    return {"traits": traits, "points": points, "largeur": max(p[0] for t in traits for p in t),
            "haut": max(ys), "bas": min(ys)}


def _reechantillonner(pts, pas):
    sortie, reste = [pts[0]], 0.0
    for a, b in zip(pts, pts[1:]):
        L = math.hypot(b[0] - a[0], b[1] - a[1])
        if L == 0:
            continue
        d = pas - reste
        while d <= L:
            t = d / L
            sortie.append((a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])))
            d += pas
        reste = (reste + L) % pas
    sortie.append(pts[-1])
    return sortie


GRIS_REPASSE = (160, 176, 198)


def dessiner(d, g, bx, by, il, couleur, ep, pointille=False, tirets=True):
    for t in g["traits"]:
        pts = [(bx + x * il, by - y * il) for x, y in t]
        if pointille and tirets and il >= 70:
            # Des tirets longs et des trous courts : on doit lire le mot.
            pts = _reechantillonner(pts, il * 0.05)
            i = 0
            while i < len(pts) - 1:
                d.line(pts[i:i + 6], fill=couleur, width=ep, joint="curve")
                i += 9
        elif pointille:
            # ⛔ En petit, le pointillé partait en miettes (« papa » illisible à 5 mm) :
            # un trait plein clair, qu'on repasse. Assez foncé pour survivre à l'imprimante.
            d.line(pts, fill=(178, 192, 212), width=ep, joint="curve")
        else:
            d.line(pts, fill=couleur, width=ep, joint="curve")
    r = max(4, ep * 0.75)
    for x, y in g["points"]:
        cx, cy = bx + x * il, by - y * il
        if pointille:
            d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=couleur, width=max(2, ep // 3))
        else:
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=couleur)


def points_de_depart(d, g, bx, by, il, tous=True):
    r = max(8, il * 0.13)
    for t in (g["traits"] if tous else g["traits"][:1]):
        x, y = bx + t[0][0] * il, by - t[0][1] * il
        d.ellipse([x - r, y - r, x + r, y + r], fill=VERT)


# ── LES BLOCS DE LA NUMÉRATION : une centaine, une dizaine, une unité ─────────
def decomposition(n: int) -> str:
    def morceau(q, sing):
        return f"{q} {sing}{'s' if q > 1 else ''}"
    c, di, u = n // 100, n // 10 % 10, n % 10
    parts = []
    if c:
        parts.append(morceau(c, "centaine"))
    if di:
        parts.append(morceau(di, "dizaine"))
    if u:
        parts.append(morceau(u, "unité"))
    if len(parts) == 3:
        return f"{parts[0]}, {parts[1]} et {parts[2]}"
    return " et ".join(parts)


def blocs(d, n: int, x, y_bas):
    """Plaques de cent, barres de dix, cubes : on VOIT le nombre. Renvoie la fin en x."""
    c, di, u = n // 100, n // 10 % 10, n % 10
    # ⛔ Les blocs de 999 sortaient de la page : ils rapetissent, mais seulement s'il le faut.
    cu = 10
    largeur = lambda k: c * (10 * k + 12) + di * (2 * k + 10) + min(u, 5) * (2 * k + 6)
    while cu > 5 and x + largeur(cu) > W - MARGE - 150:
        cu -= 1
    for _ in range(c):
        d.rectangle([x, y_bas - 10 * cu, x + 10 * cu, y_bas], fill=(254, 226, 170), outline=ORANGE, width=3)
        for k in range(1, 10):
            d.line([(x + k * cu, y_bas - 10 * cu), (x + k * cu, y_bas)], fill=ORANGE, width=1)
            d.line([(x, y_bas - k * cu), (x + 10 * cu, y_bas - k * cu)], fill=ORANGE, width=1)
        x += 10 * cu + 12
    for _ in range(di):
        d.rectangle([x, y_bas - 10 * cu, x + 2 * cu, y_bas], fill=(191, 219, 254), outline=BLEU, width=3)
        for k in range(1, 10):
            d.line([(x, y_bas - k * cu), (x + 2 * cu, y_bas - k * cu)], fill=BLEU, width=1)
        x += 2 * cu + 10
    for k in range(u):
        col, lig = divmod(k, 5)
        cx = x + col * (2 * cu + 6)
        d.rectangle([cx, y_bas - (lig + 1) * (2 * cu + 4), cx + 2 * cu, y_bas - lig * (2 * cu + 4) - 4],
                    fill=(187, 247, 208), outline=VERT, width=3)
    return x


# ── L'ESCALIER, repère de chaque page ─────────────────────────────────────────
def escalier(d, n, x, y, larg=86, pas_h=24):
    for k in range(1, 6):
        x0 = x + (k - 1) * larg
        haut = y - k * pas_h
        fait = k <= n
        d.rectangle([x0, haut, x0 + larg - 6, y], fill=ORANGE if k == n else JAUNE_BORD if fait else (235, 238, 243))
    etoile(d, x + (n - 0.5) * larg - 3, y - n * pas_h - 38, 28, couleur=ORANGE, largeur=6)


def en_tete(img, d, cahier, n, titre, rang):
    t = f"Palier {n} · {NOMS[cahier][n]}"
    f = police("ariblk.ttf", 50)
    d.rounded_rectangle([MARGE, 140, MARGE + d.textlength(t, font=f) + 90, 250], radius=55, fill=ORANGE)
    d.text((MARGE + 45, 162), t, font=f, fill=(255, 255, 255))
    d.text((1400, 150), "Prénom :", font=police("arialbd.ttf", 50), fill=NAVY)
    d.line([(1640, 205), (W - MARGE, 205)], fill=GRIS_LIGNE, width=5)
    d.text((1400, 235), "Date :", font=police("arialbd.ttf", 50), fill=NAVY)
    d.line([(1590, 290), (W - MARGE, 290)], fill=GRIS_LIGNE, width=5)
    taille = 84
    while d.textlength(titre, font=police("ariblk.ttf", taille)) > W - 2 * MARGE - 40:
        taille -= 4
    d.text((MARGE, 320), titre, font=police("ariblk.ttf", taille), fill=NAVY)
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 230
    m = m.resize((int(m.width * mh / m.height), mh), Image.LANCZOS)
    img.paste(m, (W - MARGE - m.width, 450), m)
    bx1 = W - MARGE - m.width - 30
    d.rounded_rectangle([MARGE + 470, 480, bx1, 640], radius=34, outline=VERT, width=6, fill=(236, 252, 243))
    f2 = police("arialbd.ttf", 46)
    phrase = ENCOURAGEMENTS[rang % len(ENCOURAGEMENTS)]
    d.text((MARGE + 500, 535), phrase, font=f2, fill=VERT_FONCE)
    escalier(d, n, MARGE, 640)


def bas_de_page(d):
    yb = H - 500
    etoile(d, MARGE + 110, yb + 110, 105, largeur=12)
    d.text((MARGE + 250, yb + 25), "J'ai fini ma page :", font=police("ariblk.ttf", 50), fill=NAVY)
    d.text((MARGE + 250, yb + 95), "je colorie la grande étoile !", font=police("arialbd.ttf", 46), fill=VERT_FONCE)
    d.text((MARGE + 250, yb + 165), "J'entoure ma plus belle ligne.", font=police("arialbd.ttf", 46), fill=BLEU)
    bx0 = MARGE + 1200
    d.rounded_rectangle([bx0, yb - 10, W - MARGE, yb + 260], radius=30, outline=GRIS_LIGNE, width=5)
    d.text((bx0 + 30, yb + 10), "Le mot de mon prof :", font=police("arialbd.ttf", 42), fill=BLEU)
    d.line([(MARGE, H - 200), (W - MARGE, H - 200)], fill=GRIS_LIGNE, width=3)
    d.text((MARGE, H - 170), "eleveai.fr", font=police("ariblk.ttf", 50), fill=BLEU)


# ── UNE LIGNE D'ÉCRITURE ──────────────────────────────────────────────────────
def reglure(d, x0, x1, y_base, il, haut, bas):
    for k in range(-bas, haut + 1):
        y = y_base - k * il
        forte = k == 0
        d.line([(x0, y), (x1, y)], fill=NAVY if forte else GRIS_LIGNE, width=max(3, int(il * 0.05)) if forte else 2)


def ligne(d, n, g, y_base, il, haut, bas, rang_ligne):
    x0, x1 = MARGE, W - MARGE - 150
    reglure(d, x0, x1, y_base, il, haut, bas)
    etoile(d, W - MARGE - 62, y_base - il * max(1, haut) / 2, 52, largeur=7)
    aide = AIDES[n]
    ep = max(5, round(il * 0.10))
    bx = x0 + il * 0.9
    pas = (g["largeur"] + max(1.1, 0.9)) * il
    nb = max(2, int((x1 - bx) / pas))
    if n <= 3:
        nb = min(nb, 5)
    for i in range(nb):
        if i == 0:
            dessiner(d, g, bx, y_base, il, BLEU, ep + 1)
            points_de_depart(d, g, bx, y_base, il, tous=aide["points"] == "tous" or len(g["traits"]) <= 2)
        elif i <= aide["repasser"]:
            dessiner(d, g, bx, y_base, il, GRIS_REPASSE, ep, pointille=True)
            if aide["points"] == "tous" or (aide["points"] == "premier" and i == 1):
                points_de_depart(d, g, bx, y_base, il, tous=aide["points"] == "tous")
        bx += pas


def page(cahier, n, titre, items, decomposer, base, rang):
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    en_tete(img, d, cahier, n, titre, rang)
    il = round(MM_PALIER[n] * MM)
    y, y_fin = 720, H - 540
    # La place se calcule : chaque ligne prend ce qu'il faut pour SES lettres.
    groupes = [assembler(t) for t in items]
    tete = 150 if decomposer else 0
    hauteurs = []
    for g in groupes:
        haut = max(3, math.ceil(g["haut"] + 0.15))
        bas = math.ceil(-g["bas"] + 0.1) if g["bas"] < -0.05 else 0
        hauteurs.append((haut, bas, tete + (haut + bas) * il))
    libre = (y_fin - y - sum(h[2] for h in hauteurs)) / max(1, len(items))
    assert libre >= 20, f"{base} : {len(items)} lignes ne tiennent pas (reste {libre:.0f} px)"
    libre = min(libre, 300)
    for k, (texte, g, (haut, bas, total)) in enumerate(zip(items, groupes, hauteurs)):
        if decomposer:
            v = int(texte)
            t = f"{v} = {decomposition(v)}" if v not in (0,) else "0"
            f = police("arialbd.ttf", 46)
            d.text((MARGE, y + 40), t, font=f, fill=NAVY)
            blocs(d, v, MARGE + d.textlength(t, font=f) + 50, y + tete - 22)
            y += tete
        y_base = y + haut * il
        ligne(d, n, g, y_base, il, haut, bas, k)
        if n == 5:
            # ⭐ Plus rien à repasser : une ligne de plus, toute vide, pour écrire.
            reglure(d, MARGE, W - MARGE - 150, y_base + libre * 0.45, il, 3, 0)
        y += (haut + bas) * il + libre
    bas_de_page(d)
    return ulis._enregistrer(img, base)


# ── LES PAGES QUI FONT LA FIERTÉ ──────────────────────────────────────────────
OR = (245, 176, 0)
COULEURS_MEDAILLE = [VERT, (37, 99, 175), (124, 58, 237), ROSE, ORANGE, OR]
R_MEDAILLE = 150


def titres_medailles(cahier):
    return ["Premier pas"] + [COURT[cahier][n] for n in range(1, 6)]


def medaille(d, cx, cy, k, nom, r=R_MEDAILLE):
    """Une médaille à découper : un disque, une étoile, et le nom de ce qu'on a gagné."""
    c = COULEURS_MEDAILLE[k]
    d.ellipse([cx - r - 22, cy - r - 22, cx + r + 22, cy + r + 22], outline=GRIS_LIGNE, width=3)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c)
    d.ellipse([cx - r * 0.84, cy - r * 0.84, cx + r * 0.84, cy + r * 0.84], fill=(255, 250, 235))
    pts = []
    for j in range(10):
        a = -math.pi / 2 + j * math.pi / 5
        rr = r * 0.42 if j % 2 == 0 else r * 0.19
        pts.append((cx + rr * math.cos(a), cy - r * 0.18 + rr * math.sin(a)))
    d.polygon(pts, fill=c)
    taille = 44
    while d.textlength(nom, font=police("ariblk.ttf", taille)) > r * 1.5:
        taille -= 2
    f = police("ariblk.ttf", taille)
    d.text((cx - d.textlength(nom, font=f) / 2, cy + r * 0.3), nom, font=f, fill=NAVY)


def couverture(cahier, glyphes):
    """⭐ « Qui puisse aussi décorer leur page de garde » : les emplacements attendent
    les médailles ; chaque médaille gagnée vient remplir la couverture."""
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([MARGE, 130, W - MARGE, 960], radius=60, fill=JAUNE_CLAIR, outline=JAUNE_BORD, width=8)
    f = police("ariblk.ttf", 110)
    t = "Mon cahier d'écriture"
    d.text(((W - d.textlength(t, font=f)) / 2, 180), t, font=f, fill=ORANGE)
    f2 = police("ariblk.ttf", 92)
    t = f"Les {cahier}"
    d.text(((W - d.textlength(t, font=f2)) / 2, 320), t, font=f2, fill=NAVY)
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 440
    m = m.resize((int(m.width * mh / m.height), mh), Image.LANCZOS)
    img.paste(m, (W - MARGE - m.width - 50, 490), m)
    d.text((MARGE + 80, 500), "Ce cahier appartient à :", font=police("arialbd.ttf", 60), fill=NAVY)
    d.line([(MARGE + 80, 690), (W - MARGE - m.width - 90, 690)], fill=NAVY, width=6)
    d.text((MARGE + 80, 760), "J'apprends doucement,", font=police("arialbd.ttf", 54), fill=VERT_FONCE)
    d.text((MARGE + 80, 830), "et je réussis !", font=police("arialbd.ttf", 54), fill=VERT_FONCE)

    d.text((MARGE, 1010), "Mes médailles", font=police("ariblk.ttf", 72), fill=NAVY)
    d.text((MARGE + 660, 1040), "Je les gagne, je les colle ici !", font=police("arialbd.ttf", 46), fill=BLEU)
    noms = titres_medailles(cahier)
    pas = (W - 2 * MARGE) / 3
    for k, nom in enumerate(noms):
        r_, c_ = divmod(k, 3)
        cx, cy = MARGE + (c_ + 0.5) * pas, 1310 + r_ * 390
        rr = R_MEDAILLE + 12
        for a in range(0, 360, 12):
            d.arc([cx - rr, cy - rr, cx + rr, cy + rr], a, a + 7, fill=JAUNE_BORD, width=7)
        f3 = police("arialbd.ttf", 40)
        d.text((cx - d.textlength(nom, font=f3) / 2, cy - 22), nom, font=f3, fill=GRIS_LIGNE)

    y0 = 2090
    d.text((MARGE, y0), "Mon tableau de réussite", font=police("ariblk.ttf", 60), fill=NAVY)
    d.text((MARGE, y0 + 80), "Je sais écrire ? Je colorie son étoile.", font=police("arialbd.ttf", 44), fill=BLEU)
    cols = 10
    lig = math.ceil(len(glyphes) / cols)
    cw = (W - 2 * MARGE) / cols
    ch = min(330, (H - 200 - y0 - 160) / lig)
    for k, g in enumerate(glyphes):
        r_, c_ = divmod(k, cols)
        x, y = MARGE + c_ * cw, y0 + 160 + r_ * ch
        d.rounded_rectangle([x + 6, y, x + cw - 6, y + ch - 16], radius=20, outline=GRIS_LIGNE, width=4)
        ulis._glyphe(d, g, x + cw / 2, y + ch * 0.36, 40, BLEU, 6, haut_max=ch * 0.52)
        etoile(d, x + cw / 2, y + ch * 0.76, ch * 0.13, largeur=5)
    return ulis._enregistrer(img, f"couverture-{cahier}")


def planche_medailles(cahier):
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    f = police("ariblk.ttf", 100)
    t = "Mes médailles à gagner"
    d.text(((W - d.textlength(t, font=f)) / 2, 170), t, font=f, fill=ORANGE)
    f2 = police("arialbd.ttf", 50)
    t = "Je découpe ma médaille, et je la colle sur ma page de garde."
    d.text(((W - d.textlength(t, font=f2)) / 2, 320), t, font=f2, fill=NAVY)
    f3 = police("arialbd.ttf", 42)
    quand = ["Ma toute première page", "Fin du palier 1", "Fin du palier 2", "Fin du palier 3",
             "Fin du palier 4", "Fin du palier 5"]
    pas = (W - 2 * MARGE) / 3
    for k, nom in enumerate(titres_medailles(cahier)):
        r_, c_ = divmod(k, 3)
        cx, cy = MARGE + (c_ + 0.5) * pas, 660 + r_ * 560
        medaille(d, cx, cy, k, nom)
        d.text((cx - d.textlength(quand[k], font=f3) / 2, cy + R_MEDAILLE + 45), quand[k], font=f3, fill=BLEU)
    y = 1800
    d.text((MARGE, y), "Des petites étoiles, pour chaque page réussie", font=police("ariblk.ttf", 56), fill=NAVY)
    for r_ in range(4):
        for c_ in range(8):
            cx, cy = MARGE + 130 + c_ * 265, y + 240 + r_ * 270
            d.ellipse([cx - 110, cy - 110, cx + 110, cy + 110], outline=GRIS_LIGNE, width=3)
            pts = []
            for j in range(10):
                a = -math.pi / 2 + j * math.pi / 5
                rr = 88 if j % 2 == 0 else 40
                pts.append((cx + rr * math.cos(a), cy - 8 + rr * math.sin(a)))
            d.polygon(pts, fill=COULEURS_MEDAILLE[(r_ + c_) % 6])
    d.text((MARGE, H - 170), "eleveai.fr", font=police("ariblk.ttf", 50), fill=BLEU)
    return ulis._enregistrer(img, f"medailles-{cahier}")


def page_escalier(cahier):
    """« Mes lettres rapetissent, moi je grandis » : l'année d'un seul coup d'œil."""
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    f = police("ariblk.ttf", 130)
    t = "Mon escalier"
    d.text(((W - d.textlength(t, font=f)) / 2, 180), t, font=f, fill=ORANGE)
    f2 = police("ariblk.ttf", 60)
    t = ("Mes lettres rapetissent. Moi, je grandis !" if cahier == "lettres"
         else "Mes chiffres rapetissent. Moi, je grandis !")
    d.text(((W - d.textlength(t, font=f2)) / 2, 380), t, font=f2, fill=NAVY)
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 620
    m = m.resize((int(m.width * mh / m.height), mh), Image.LANCZOS)
    img.paste(m, (MARGE + 40, 560), m)
    larg = (W - 2 * MARGE) / 5
    y_sol = H - 500
    a = assembler("a" if cahier == "lettres" else "5")
    for k in range(1, 6):
        x0 = MARGE + (k - 1) * larg
        y_haut = y_sol - k * 310
        d.rectangle([x0, y_haut, x0 + larg - 8, y_sol], fill=JAUNE_CLAIR, outline=JAUNE_BORD, width=6)
        il = round(MM_PALIER[k] * MM)
        cx = x0 + larg / 2 - a["largeur"] * il / 2
        dessiner(d, a, cx, y_haut - 18, il, BLEU, max(5, round(il * 0.10)))
        fn = police("ariblk.ttf", 42)
        nom = COURT[cahier][k]
        d.text((x0 + (larg - d.textlength(nom, font=fn)) / 2, y_haut + 26), nom, font=fn, fill=NAVY)
        etoile(d, x0 + larg / 2, y_haut + 150, 62, largeur=9)
    t = "Quand je finis une marche, je gagne un diplôme et une médaille !"
    f3 = police("arialbd.ttf", 46)
    d.text(((W - d.textlength(t, font=f3)) / 2, y_sol + 60), t, font=f3, fill=VERT_FONCE)
    return ulis._enregistrer(img, f"escalier-{cahier}")


def page_chemin(cahier):
    """La même chose à toutes les hauteurs : la preuve du progrès, sous ses yeux."""
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    f = police("ariblk.ttf", 80)
    t = "Regarde tout ce chemin !"
    d.text(((W - d.textlength(t, font=f)) / 2, 170), t, font=f, fill=ORANGE)
    f2 = police("arialbd.ttf", 50)
    t = ("J'écris le même mot, de plus en plus petit." if cahier == "lettres"
         else "J'écris le même nombre, de plus en plus petit.")
    d.text(((W - d.textlength(t, font=f2)) / 2, 290), t, font=f2, fill=NAVY)
    g = assembler("ami" if cahier == "lettres" else "125")
    y = 420
    # L'écart se calcule : les cinq lignes occupent toute la page.
    ecart = (H - 540 - y - sum(3 * round(MM_PALIER[n] * MM) for n in range(1, 6))) / 5
    for n in range(1, 6):
        il = round(MM_PALIER[n] * MM)
        y += 3 * il
        reglure(d, MARGE, W - MARGE - 150, y, il, 3, 0)
        ep = max(5, round(il * 0.10))
        bx = MARGE + il * 0.5
        # ⛔ Les tirets hachaient le mot à 10 mm : le même trait plein à toutes les tailles.
        dessiner(d, g, bx, y, il, GRIS_REPASSE, ep, pointille=True, tirets=False)
        points_de_depart(d, g, bx, y, il, tous=False)
        etoile(d, W - MARGE - 62, y - 1.5 * il, 52, largeur=7)
        y += ecart
    bas_de_page(d)
    return ulis._enregistrer(img, f"chemin-{cahier}")


DIPLOMES = {
    "lettres": {
        2: ("Mes lettres sont plus petites !", ["ma", "la", "to"]),
        3: ("J'écris mes premiers mots !", ["ami", "moto"]),
        4: ("J'écris de longs mots !", ["tomate", "soleil"]),
        5: ("J'écris avec de belles lettres !", ["ma main trace des lettres"]),
    },
    "nombres": {
        2: ("Je sais écrire les dizaines !", ["10", "20", "50"]),
        3: ("Je sais écrire jusqu'à cent !", ["45", "100"]),
        4: ("Je sais écrire les centaines !", ["125", "999"]),
        5: ("J'écris les grands nombres !", ["2026", "10 000"]),
    },
}


def diplome_palier(cahier, n):
    titre, items = DIPLOMES[cahier][n]
    base = f"{cahier}-diplome-{n}"
    img = ulis.diplome(titre, [], base)
    d = ImageDraw.Draw(img)
    gs = [assembler(t) for t in items]
    il, ecart = 70, 200
    total = sum(g["largeur"] * il for g in gs) + ecart * (len(gs) - 1)
    if total > W - 700:
        il = il * (W - 700) / total
        ecart = ecart * il / 70
        total = W - 700
    x = (W - total) / 2
    for g, c in zip(gs, (BLEU, ORANGE, VERT)):
        dessiner(d, g, x, 1740, il, c, max(7, round(il * 0.13)))
        x += g["largeur"] * il + ecart
    return ulis._enregistrer(img, base)


def construire():
    SORTIE.mkdir(parents=True, exist_ok=True)
    ulis.SORTIE = SORTIE
    # ⭐ Palier 1 : les lettres moins grosses, cinq modèles par ligne, aucun bilan
    # négatif, et le zéro élargi.
    ulis.spec_chiffre = spec_chiffre
    ulis.IL_MAX = round(MM_PALIER[1] * MM)
    ulis.NB_MODELES = 5
    ulis.ENCOURAGEMENTS = ENCOURAGEMENTS
    ulis.BILANS = [("grand", "J'ai réussi !"), ("sourire", "Je progresse")]
    lettres = ulis.lettres_presentes()
    sommaire = []

    def pdf(pages, nom):
        pages = [p.resize((W * 2 // 3, H * 2 // 3), Image.LANCZOS) for p in pages]
        pages[0].save(SORTIE / nom, "PDF", resolution=200, quality=80, save_all=True, append_images=pages[1:])

    rang = 0
    for cahier, glyphes in (("lettres", lettres), ("nombres", ulis.CHIFFRES)):
        images = []

        def ajouter(palier, nom, img, base):
            images.append((palier, img))
            sommaire.append({"cahier": cahier, "palier": palier, "nom": nom, "base": base})

        ajouter(0, "Page de garde", couverture(cahier, glyphes), f"couverture-{cahier}")
        ajouter(0, "Mon escalier", page_escalier(cahier), f"escalier-{cahier}")
        ajouter(0, "Mes médailles", planche_medailles(cahier), f"medailles-{cahier}")
        for g in glyphes:
            quoi = "chiffre" if g.isdigit() else "lettre"
            ajouter(1, f"{quoi.capitalize()} {g}", ulis.construire(g, rang), f"cahier-ecriture-{quoi}-{g}")
            rang += 1
        b = f"{cahier}-diplome-1"
        titre = "Je sais écrire les lettres !" if cahier == "lettres" else "Je sais écrire les 10 chiffres !"
        ajouter(1, "Diplôme du palier 1", ulis.diplome(titre, glyphes, b), b)
        for n, liste in PAGES[cahier].items():
            for k, (titre, items, decomposer) in enumerate(liste):
                base = f"{cahier}-{n}-{k + 1:02d}"
                ajouter(n, titre, page(cahier, n, titre, items, decomposer, base, rang), base)
                rang += 1
            if n == 5:
                ajouter(5, "Regarde tout ce chemin !", page_chemin(cahier), f"chemin-{cahier}")
            ajouter(n, f"Diplôme du palier {n}", diplome_palier(cahier, n), f"{cahier}-diplome-{n}")
        # ⭐ Un PDF par palier (on imprime la marche suivante) + le cahier entier.
        for n in range(1, 6):
            pdf([im for p, im in images if p == n], f"{cahier}-palier-{n}.pdf")
        pdf([im for _, im in images], f"mon-cahier-{cahier}.pdf")
        print(cahier, len(images), "pages")
    (SORTIE / "sommaire.json").write_text(
        json.dumps({"mm": MM_PALIER, "noms": NOMS, "pages": sommaire}, ensure_ascii=False, indent=2),
        encoding="utf-8")


if __name__ == "__main__":
    construire()
