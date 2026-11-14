# solides_cm1_commun.py
# EleveAI — Maths CM1 — série « Solides et espace » (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux 3 paysages solides_prisme, solides_patron, solides_defi. Seulement ce qui va plus
# loin que le CE2 : le reste du CM1 reprend les vidéos CE2 par `aussi`.
# Base : manim/scripts/ce2/solides_ce2_commun.py (Solide en cavalière, pyramide, Patron du cube qui se
# plie, Cylindre…), IMPORTÉE sans la modifier.
# Ici :
#   · prisme(base 2D, profondeur) : un prisme droit, les deux bases devant et au fond ;
#   · PatronLibre : un patron fait de polygones quelconques (triangles, rectangles) qui se plie
#     autour de ses charnières (tente = prisme à base triangulaire, pyramide, pavé) ;
#   · PATRONS_CM1 : d'autres patrons du cube (bande de 4 décalée, escalier) pour Patron ;
#   · Empilement : des cubes empilés, dessinés opaques du fond vers l'avant (ceux qu'on ne voit
#     pas sont VRAIMENT cachés) ; étages, colonnes, cubes manquants en pointillés ;
#   · les personnages-métiers du lot : Sacha, Rose, Ilan.
# Voix : manim/voix/cm1-solides-<slug>.json ; marques : manim/scripts/cm1/solides_<slug>_marques.json
# (python manim/scripts/cm1/aire_marques.py solides:<ép>, ⛔ jamais sans argument).

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "ce2"))

from solides_ce2_commun import *  # noqa: E402,F401,F403
from solides_ce2_commun import _rot, _normale  # noqa: E402,F401

BASE_C = "#a78bfa"    # les bases d'un prisme (violet)
LAT_C = "#34d399"     # les faces latérales (vert)
TOILE = "#f97316"     # la toile de la tente


def regulier(n, r=0.8, rot=None):
    """Les sommets 2D d'un polygone régulier à n côtés (un côté en bas, horizontal)."""
    r0 = -PI / 2 - PI / n if rot is None else rot
    return [(r * np.cos(r0 + TAU * i / n), r * np.sin(r0 + TAU * i / n)) for i in range(n)]


def prisme(base, p=1.6, axe="z", **k):
    """Prisme droit : la base (liste de points 2D (u, v)) au départ, la même à la distance p.
    axe "z" : bases devant / au fond ; "y" : DEBOUT (bases en bas / en haut, comme un écrou posé) ;
    "x" : COUCHÉ (bases à gauche / à droite, comme un crayon).
    Sommets : 0..n-1 la première base, n..2n-1 l'autre. Faces : 0 et 1 les bases, puis 2 + i le
    rectangle qui part du côté (i, i+1) de la base."""
    n = len(base)
    pose = {"z": lambda u, v, w: (u, v, w), "y": lambda u, v, w: (u, w, v), "x": lambda u, v, w: (w, v, u)}[axe]
    S = [pose(x, y, 0.0) for x, y in base] + [pose(x, y, p) for x, y in base]
    F = [list(range(n)), list(range(n, 2 * n))] + [[i, (i + 1) % n, n + (i + 1) % n, n + i] for i in range(n)]
    return Solide(S, F, **k)


def tente(a=1.6, h=None, p=2.0, **k):
    """La tente de Sacha : prisme à base triangulaire (triangle équilatéral de côté a).
    Sommets 0 bas-gauche, 1 bas-droit, 2 le faîte (devant), 3, 4, 5 au fond.
    Faces : 0 l'entrée, 1 le fond, 2 le sol, 3 le toit à droite, 4 le toit à gauche."""
    h = a * np.sqrt(3) / 2 if h is None else h
    return prisme([(0, 0), (a, 0), (a / 2, h)], p, **k)


class PatronLibre(Patron):
    """Un patron fait de POLYGONES (pas seulement des carrés). pieces = {nom: [(x, z)…]} dans le
    plan de la table ; parents = {nom: parent ou None} ; la charnière d'une pièce = le côté commun
    avec son parent (trouvé tout seul). maj(), plier(), recaler() comme Patron."""

    def __init__(self, pieces, parents, e=0.8, centre=ORIGIN, couleur=CARTON, sw=4, sens=1, caches=(),
                 couleurs=None):
        self.poly = {k: [np.array([x, 0.0, z], dtype=float) for x, z in v] for k, v in pieces.items()}
        VGroup.__init__(self)
        self.cel = {k: (0, 0) for k in pieces}
        self.par = dict(parents)
        self.e, self.couleur, self.sw, self.sens = e, couleur, sw, sens
        self.tilt = -90.0
        self.angles = {k: 0.0 for k in pieces}
        self.caches = set(caches)
        self.couleurs = dict(couleurs or {})
        self._dec = np.zeros(3)
        self.charn = {}
        for k, pa in self.par.items():
            if pa is None:
                continue
            com = [p for p in self.poly[k] if any(np.allclose(p, q) for q in self.poly[pa])]
            assert len(com) == 2, f"charnière introuvable : {k} / {pa}"
            self.charn[k] = (com[0], com[1])
        tous = [self._proj(p) for v in self.poly.values() for p in v]
        xs, ys = [p[0] for p in tous], [p[1] for p in tous]
        self._dec = np.array(centre) - np.array([(min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, 0])
        self.racine = [k for k, v in self.par.items() if v is None][0]
        self._rc = sum(self.poly[self.racine]) / len(self.poly[self.racine])
        self._ancre = self._proj(self._rc)
        self.pieces = VGroup()
        self.add(self.pieces)
        self.maj()

    def _monde(self, nom, p):
        s = nom
        while self.par[s] is not None:
            pa = self.par[s]
            a, b = self.charn[s]
            g = sum(self.poly[s]) / len(self.poly[s])
            ax = (b - a) / np.linalg.norm(b - a)
            d = g - a - ax * np.dot(g - a, ax)
            d = d / np.linalg.norm(d)
            axe = np.cross(d, np.array([0.0, self.sens, 0.0]))
            p = a + _rot(p - a, axe, np.radians(self.angles[s]))
            s = pa
        return p

    def coins3(self, nom):
        return [self._monde(nom, p) for p in self.poly[nom]]

    def centre_carre(self, nom):
        c = self.coins(nom)
        return sum(c) / len(c)

    def charnieres(self, couleur=JAUNE_TITRE, sw=7):
        g = VGroup()
        for k in self.charn:
            if k in self.caches:
                continue
            a, b = self.charn[k]
            pa = self.par[k]
            g.add(DashedLine(self._proj(self._monde(pa, a)), self._proj(self._monde(pa, b)), color=couleur,
                             stroke_width=sw, dash_length=0.12))
        return g


def patron_tente(a=1.0, p=1.4):
    """Le patron de la tente : 3 rectangles en bande (toit gauche | sol | toit droit) et les 2
    triangles, un de chaque côté du sol (l'entrée devant, le fond derrière).
    Plier : toits 120°, triangles 90° (angle de pliage = 180° − l'angle du triangle, 60°)."""
    h = a * np.sqrt(3) / 2
    pieces = {"sol": [(0, 0), (a, 0), (a, p), (0, p)],
              "tg": [(-a, 0), (0, 0), (0, p), (-a, p)],
              "td": [(a, 0), (2 * a, 0), (2 * a, p), (a, p)],
              "entree": [(0, 0), (a / 2, -h), (a, 0)],
              "fond": [(0, p), (a, p), (a / 2, p + h)]}
    par = {"sol": None, "tg": "sol", "td": "sol", "entree": "sol", "fond": "sol"}
    return pieces, par


PLI_TENTE = {"tg": 120, "td": 120, "entree": 90, "fond": 90}


def patron_pyramide(a=1.0, h=0.9):
    """Pyramide à base carrée : le carré et 4 triangles autour (une étoile)."""
    s = np.sqrt(h ** 2 + (a / 2) ** 2)
    pieces = {"base": [(0, 0), (a, 0), (a, a), (0, a)],
              "t0": [(0, 0), (a / 2, -s), (a, 0)], "t1": [(a, 0), (a + s, a / 2), (a, a)],
              "t2": [(a, a), (a / 2, a + s), (0, a)], "t3": [(0, a), (-s, a / 2), (0, 0)]}
    par = {"base": None, "t0": "base", "t1": "base", "t2": "base", "t3": "base"}
    phi = np.degrees(np.arccos(-a / (2 * s)))
    return pieces, par, {k: phi for k in ("t0", "t1", "t2", "t3")}


def patron_pave(L=1.4, l=0.8, h=0.6):
    """Pavé droit : la croix en rectangles (fond L × l, côtés de hauteur h, couvercle)."""
    pieces = {"fond": [(0, 0), (L, 0), (L, l), (0, l)],
              "av": [(0, -h), (L, -h), (L, 0), (0, 0)], "ar": [(0, l), (L, l), (L, l + h), (0, l + h)],
              "g": [(-h, 0), (0, 0), (0, l), (-h, l)], "d": [(L, 0), (L + h, 0), (L + h, l), (L, l)],
              "couv": [(0, l + h), (L, l + h), (L, 2 * l + h), (0, 2 * l + h)]}
    par = {"fond": None, "av": "fond", "ar": "fond", "g": "fond", "d": "fond", "couv": "ar"}
    return pieces, par, {k: 90 for k in ("av", "ar", "g", "d", "couv")}


# d'autres patrons du cube (cellule (colonne, rangée), rangée 0 en bas)
PATRONS.update({
    # bande de 4, un carré au-dessus du premier, un au-dessous du dernier
    "decale": ({"b0": (0, 1), "fond": (1, 1), "b2": (2, 1), "b3": (3, 1), "haut": (0, 2), "bas": (3, 0)},
               {"fond": None, "b0": "fond", "b2": "fond", "b3": "b2", "haut": "b0", "bas": "b3"}),
    # l'escalier : 2, 2, 2 en marches
    "escalier": ({"a": (0, 0), "b": (1, 0), "fond": (1, 1), "d": (2, 1), "e": (2, 2), "f": (3, 2)},
                 {"fond": None, "b": "fond", "a": "b", "d": "fond", "e": "d", "f": "e"}),
})


# ── Cubes empilés ──────────────────────────────────────────────────────────

CUBE_C = "#22c55e"


class Empilement(VGroup):
    """Des cubes unité aux positions (x, y, z) (x à droite, y en haut, z vers le fond), en
    cavalière, OPAQUES : on les dessine du fond vers l'avant, de bas en haut, de gauche à droite,
    donc ceux du dessous et du fond sont vraiment cachés. self.cubes[(x, y, z)] = le VGroup d'un
    cube (devant, dessus, droite). couleurs : {(x, y, z): couleur}."""

    def __init__(self, positions, e=0.6, centre=ORIGIN, couleur=CUBE_C, couleurs=None, sw=2.5,
                 trait="#052e16", opacite=1.0):
        super().__init__()
        self.e = e
        pos = sorted(positions, key=lambda q: (-q[2], q[1], q[0]))
        tous = [cav(np.array([x + dx, y + dy, z + dz])) * e for x, y, z in pos
                for dx in (0, 1) for dy in (0, 1) for dz in (0, 1)]
        xs, ys = [p[0] for p in tous], [p[1] for p in tous]
        self._dec = np.array(centre) - np.array([(min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, 0])
        self.cubes = {}
        couleurs = couleurs or {}
        for q in pos:
            c = self.un_cube(q, couleurs.get(q, couleur), sw, trait, opacite)
            self.cubes[q] = c
            self.add(c)

    def pp(self, p):
        return cav(np.array(p, dtype=float)) * self.e + self._dec

    def un_cube(self, q, couleur, sw=2.5, trait="#052e16", opacite=1.0):
        x, y, z = q
        P3 = lambda a, b, c: self.pp((x + a, y + b, z + c))  # noqa: E731
        dev = Polygon(P3(0, 0, 0), P3(1, 0, 0), P3(1, 1, 0), P3(0, 1, 0))
        des = Polygon(P3(0, 1, 0), P3(1, 1, 0), P3(1, 1, 1), P3(0, 1, 1))
        dro = Polygon(P3(1, 0, 0), P3(1, 0, 1), P3(1, 1, 1), P3(1, 1, 0))
        for f, n in ((dev, np.array([0, 0, -1.0])), (des, UP), (dro, RIGHT)):
            f.set_fill(nuance(couleur, n), opacite).set_stroke(trait, sw)
        return VGroup(dev, des, dro)

    def centre_cube(self, q):
        x, y, z = q
        return self.pp((x + 0.5, y + 0.5, z))

    def dessus(self, q):
        x, y, z = q
        return self.pp((x + 0.5, y + 1, z + 0.5))

    def fantome(self, q, couleur=JAUNE_TITRE, sw=4):
        """Un cube manquant : ses arêtes en pointillés (une place à remplir)."""
        x, y, z = q
        P3 = lambda a, b, c: self.pp((x + a, y + b, z + c))  # noqa: E731
        ar = [((0, 0, 0), (1, 0, 0)), ((1, 0, 0), (1, 1, 0)), ((1, 1, 0), (0, 1, 0)), ((0, 1, 0), (0, 0, 0)),
              ((0, 1, 0), (0, 1, 1)), ((1, 1, 0), (1, 1, 1)), ((0, 1, 1), (1, 1, 1)), ((1, 0, 0), (1, 0, 1)),
              ((1, 0, 1), (1, 1, 1))]
        return VGroup(*[DashedLine(P3(*a), P3(*b), color=couleur, stroke_width=sw, dash_length=0.08)
                        for a, b in ar])

    def boite(self, L, H, Pr, couleur=JAUNE_TITRE, sw=4):
        """Le contour en pointillés du pavé L × H × Pr (à partir de l'origine)."""
        P3 = lambda a, b, c: self.pp((a, b, c))  # noqa: E731
        S = [(0, 0, 0), (L, 0, 0), (L, H, 0), (0, H, 0), (0, 0, Pr), (L, 0, Pr), (L, H, Pr), (0, H, Pr)]
        A = [(0, 1), (1, 2), (2, 3), (3, 0), (4, 5), (5, 6), (6, 7), (7, 4), (0, 4), (1, 5), (2, 6), (3, 7)]
        return VGroup(*[DashedLine(P3(*S[a]), P3(*S[b]), color=couleur, stroke_width=sw, dash_length=0.1)
                        for a, b in A])


def pave_cubes(L, H, Pr):
    """Les positions d'un pavé de L × H × Pr cubes."""
    return [(x, y, z) for x in range(L) for y in range(H) for z in range(Pr)]


# ── Personnages-métiers du lot ─────────────────────────────────────────────

def sacha(s=1.0):
    """Sacha, guide de montagne : veste rouge, bonnet bleu, sac à dos."""
    p = visage(personne(peau="#e0ac69", tenue="#dc2626", cheveux="#78350f", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bonnet = VGroup(Sector(radius=r * 1.05, start_angle=0, angle=PI, fill_color="#2563eb", fill_opacity=1,
                           stroke_width=0).move_to(c + UP * r * 0.75),
                    Circle(radius=r * 0.22, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                    .move_to(c + UP * r * 1.45))
    sac = RoundedRectangle(width=r * 0.9, height=r * 1.6, corner_radius=r * 0.2, fill_color="#065f46",
                           fill_opacity=1, stroke_width=0).move_to(c + P(-r * 1.55, -r * 2.6))
    p.add_to_back(sac)
    p.add(bonnet)
    return p


def rose(s=1.0):
    """Rose, créatrice de jeux de société : tenue rose, un dé à la main."""
    p = visage(personne(peau="#c68642", tenue="#db2777", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    de = VGroup(RoundedRectangle(width=r * 0.8, height=r * 0.8, corner_radius=r * 0.12, fill_color=WHITE,
                                 fill_opacity=1, stroke_color="#111827", stroke_width=2),
                *[Dot(P(x * r, y * r), radius=r * 0.08, color="#111827") for x, y in ((-0.2, 0.2), (0, 0), (0.2, -0.2))])
    p.add(de.move_to(c + P(r * 1.9, -r * 1.9)))
    return p


def ilan(s=1.0):
    """Ilan, créateur de décors de jeux vidéo : sweat bleu, casque audio."""
    p = visage(personne(peau="#8d5524", tenue="#1d4ed8", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Arc(radius=r * 1.12, start_angle=PI * 0.05, angle=PI * 0.9, stroke_color="#111827", stroke_width=5)
          .move_to(c + UP * r * 0.55))
    for x in (-1, 1):
        p.add(RoundedRectangle(width=r * 0.35, height=r * 0.6, corner_radius=r * 0.12, fill_color="#f97316",
                               fill_opacity=1, stroke_width=0).move_to(c + P(x * r * 1.05, -r * 0.05)))
    return p


class PaysageSolidesCM1(PaysageSolidesCE2):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
