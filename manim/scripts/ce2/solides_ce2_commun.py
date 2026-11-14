# solides_ce2_commun.py
# EleveAI — Maths CE2 — série « Solides et espace » (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux 5 paysages solides_reconnaitre, solides_decrire, solides_pyramide, solides_patron,
# solides_defi. Vidéos COMMUNES : le CM1 les reprend par `aussi`.
# Base : PaysagePerimetreCE2 (perimetre_ce2_commun → calcul_pose_commun : synchro par jetons, audit,
# question-pause, finale « Ce que tu as appris », fin du 05/11), IMPORTÉE sans la modifier.
# Ici :
#   · Solide : un polyèdre en PERSPECTIVE CAVALIÈRE (fuyantes à 45°, coefficient 0,5), faces vues
#     pleines et ombrées, arêtes cachées en POINTILLÉS (calculées : une arête est cachée si aucune
#     de ses faces n'est vue), faces / arêtes / sommets surlignables un par un pour compter ;
#     cube(), pave(), pyramide(n côtés) ;
#   · Cylindre, Cone, Boule (contour apparent, dos de la base en pointillés) ;
#   · Patron : un patron de cube (croix, ligne de 6, bloc 2 × 3…) dont les carrés se PLIENT en 3D
#     (charnières, rotations en chaîne), vu à plat puis couché sur la table, pliage animé ;
#   · les personnages-métiers du lot : Jade, Hugo, Amina, Théo, Lou.
# Voix : manim/voix/ce2-solides-<slug>.json ; marques : manim/scripts/ce2/solides_<slug>_marques.json.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_ce2_commun import *  # noqa: E402,F401,F403

K_CAV = 0.5           # coefficient de réduction des fuyantes
A_CAV = PI / 4        # angle des fuyantes
VUE = np.array([-K_CAV * np.cos(A_CAV), -K_CAV * np.sin(A_CAV), 1.0])  # rayon de vue (vers le fond)

FACE_C = "#38bdf8"    # faces (bleu clair)
ARETE_C = "#f97316"   # arêtes (orange)
SOMMET_C = "#facc15"  # sommets (jaune)
CARTON = "#d6a15c"


def cav(p):
    """Projection cavalière d'un point 3D (x à droite, y en haut, z vers le fond)."""
    return np.array([p[0] + K_CAV * p[2] * np.cos(A_CAV), p[1] + K_CAV * p[2] * np.sin(A_CAV), 0.0])


def nuance(couleur, n):
    """Ombrage d'une face selon sa normale n (unitaire) : le dessus clair, le côté plus sombre."""
    lum = 0.55 * max(0.0, n[1]) - 0.35 * max(0.0, n[0]) + 0.15 * max(0.0, -n[2])
    if lum >= 0:
        return interpolate_color(ManimColor(couleur), WHITE, min(lum, 0.6))
    return interpolate_color(ManimColor(couleur), BLACK, min(-lum, 0.6))


def _normale(pts):
    n = np.zeros(3)
    for i in range(len(pts)):
        a, b = pts[i], pts[(i + 1) % len(pts)]
        n += np.cross(a, b)
    return n / (np.linalg.norm(n) or 1)


class Solide(VGroup):
    """Un polyèdre convexe en perspective cavalière. `sommets` en 3D, `faces` = listes d'indices.
    Groupes : fonds (faces vues, pleines), cachees (arêtes cachées, pointillés), vues (arêtes vues).
    Pour compter : face(i), arete(i), sommet(i) renvoient un surlignage NEUF (non ajouté)."""

    def __init__(self, sommets, faces, e=1.0, centre=ORIGIN, couleur=FACE_C, opacite=0.85, sw=4,
                 couleur_trait=WHITE, noms_faces=None):
        super().__init__()
        S = [np.array(p, dtype=float) for p in sommets]
        g = sum(S) / len(S)
        self.p3 = S
        pr = [cav(p) * e for p in S]
        xs, ys = [p[0] for p in pr], [p[1] for p in pr]
        dec = np.array(centre) - np.array([(min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, 0])
        self.p2 = [p + dec for p in pr]
        self.faces_i, self.normales, self.vue_face = [], [], []
        for f in faces:
            pts = [S[i] for i in f]
            n = _normale(pts)
            if np.dot(n, sum(pts) / len(pts) - g) < 0:
                f, n = list(reversed(f)), -n
            self.faces_i.append(list(f))
            self.normales.append(n)
            self.vue_face.append(np.dot(n, VUE) < -1e-6)
        self.noms_faces = noms_faces or {}
        ar = {}
        for k, f in enumerate(self.faces_i):
            for j in range(len(f)):
                a, b = f[j], f[(j + 1) % len(f)]
                ar.setdefault(tuple(sorted((a, b))), []).append(k)
        self.aretes_i = sorted(ar)
        self.vue_arete = [any(self.vue_face[k] for k in ar[c]) for c in self.aretes_i]
        self.fonds = VGroup()
        for k, f in enumerate(self.faces_i):
            if self.vue_face[k]:
                self.fonds.add(Polygon(*[self.p2[i] for i in f], stroke_width=0,
                                       fill_color=nuance(couleur, self.normales[k]), fill_opacity=opacite))
        self.cachees = VGroup(*[DashedLine(self.p2[a], self.p2[b], color=couleur_trait, stroke_width=sw * 0.7,
                                           dash_length=0.12, dashed_ratio=0.55)
                                for (a, b), v in zip(self.aretes_i, self.vue_arete) if not v])
        self.vues = VGroup(*[Line(self.p2[a], self.p2[b], color=couleur_trait, stroke_width=sw)
                             for (a, b), v in zip(self.aretes_i, self.vue_arete) if v])
        self.add(self.fonds, self.cachees, self.vues)

    def shift(self, *vecteurs):
        """Déplacer le solide (move_to de finale_gauche) déplace aussi ses sommets projetés :
        les faces et arêtes surlignées ensuite tombent à la bonne place."""
        super().shift(*vecteurs)
        d = sum(vecteurs, ORIGIN)
        self.p2 = [p + d for p in self.p2]
        return self

    # ── pour compter ───────────────────────────────────────────────────────
    def pt(self, i):
        return self.p2[i]

    def centre_face(self, k):
        return sum(self.p2[i] for i in self.faces_i[k]) / len(self.faces_i[k])

    def sur_face(self, k, u, v):
        """Le point (u, v) de la face k (0..1 sur deux côtés) : la cavalière garde les parallèles."""
        p0, p1, _, p3 = [self.p2[i] for i in self.faces_i[k][:4]]
        return p0 + u * (p1 - p0) + v * (p3 - p0)

    def face(self, k, couleur=FACE_C, opacite=0.75):
        """La face k surlignée : pleine si on la voit, hachurée en pointillés si elle est cachée."""
        pts = [self.p2[i] for i in self.faces_i[k]]
        if self.vue_face[k]:
            return Polygon(*pts, fill_color=couleur, fill_opacity=opacite, stroke_color=couleur, stroke_width=6)
        return VGroup(Polygon(*pts, fill_color=couleur, fill_opacity=0.25, stroke_width=0),
                      DashedVMobject(Polygon(*pts, stroke_color=couleur, stroke_width=6), num_dashes=24))

    def arete(self, j, couleur=ARETE_C, sw=10):
        a, b = self.aretes_i[j]
        if self.vue_arete[j]:
            return Line(self.p2[a], self.p2[b], color=couleur, stroke_width=sw)
        return DashedLine(self.p2[a], self.p2[b], color=couleur, stroke_width=sw * 0.8, dash_length=0.14)

    def arete_ab(self, a, b, couleur=ARETE_C, sw=10):
        return self.arete(self.aretes_i.index(tuple(sorted((a, b)))), couleur, sw)

    def sommet(self, i, couleur=SOMMET_C, r=0.11):
        return Dot(self.p2[i], radius=r, color=couleur)

    def contour_vue(self):
        """Toutes les arêtes (vues et cachées), pour un Create d'ensemble."""
        return VGroup(self.cachees.copy(), self.vues.copy())


def cube(a=1.0, **k):
    """Indices : 0-3 = face de devant (bas-gauche, bas-droit, haut-droit, haut-gauche), 4-7 = derrière.
    Faces : 0 devant, 1 derrière, 2 dessous, 3 dessus, 4 gauche, 5 droite."""
    return pave(a, a, a, **k)


def pave(L=1.6, h=0.9, p=1.0, **k):
    S = [(0, 0, 0), (L, 0, 0), (L, h, 0), (0, h, 0), (0, 0, p), (L, 0, p), (L, h, p), (0, h, p)]
    F = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]]
    return Solide(S, F, **k)


FACES_CUBE = {"devant": 0, "derrière": 1, "dessous": 2, "dessus": 3, "gauche": 4, "droite": 5}


def pyramide(n=4, cote=1.4, h=1.5, rot=None, **k):
    """Pyramide à base régulière à n côtés (posée sur y = 0), pointe au-dessus du centre.
    Sommets : 0..n-1 la base, n la pointe. Faces : 0 la base, puis les n triangles.
    n = 4 : la base est un carré aligné sur les axes (0 devant-gauche, 1 devant-droit…)."""
    if n == 4:
        b = [(0, 0, 0), (cote, 0, 0), (cote, 0, cote), (0, 0, cote)]
        c = (cote / 2, cote / 2)
    else:
        r = cote / (2 * np.sin(PI / n))
        r0 = -PI / 2 - PI / n if rot is None else rot  # un côté devant, parallèle à l'écran
        b = [(r * np.cos(r0 + 2 * PI * i / n), 0, r * np.sin(r0 + 2 * PI * i / n)) for i in range(n)]
        c = (0, 0)
    S = b + [(c[0], h, c[1])]
    F = [list(range(n))] + [[i, (i + 1) % n, n] for i in range(n)]
    return Solide(S, F, **k)


def _ellipse_pts(cx, y, cz, r, m=72):
    return [np.array([cx + r * np.cos(t), y, cz + r * np.sin(t)]) for t in np.linspace(0, TAU, m, endpoint=False)]


class Rond(VGroup):
    """Base commune du cylindre et du cône : projette, recentre, trace."""

    def _poser(self, pts3, e, centre):
        pr = [cav(p) * e for p in pts3]
        xs, ys = [p[0] for p in pr], [p[1] for p in pr]
        self._dec = np.array(centre) - np.array([(min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, 0])
        self._e = e

    def pp(self, p):
        return cav(p) * self._e + self._dec


class Cylindre(Rond):
    """Cylindre debout (axe vertical). Groupes : corps, haut (disque du haut), bas_vu, bas_cache.
    disque_haut() / disque_bas() : surlignages pour « un disque en haut, un disque en bas »."""

    def __init__(self, r=0.7, h=1.4, e=1.0, centre=ORIGIN, couleur=FACE_C, opacite=0.85, sw=4,
                 couleur_trait=WHITE):
        super().__init__()
        bas3, haut3 = _ellipse_pts(0, 0, 0, r), _ellipse_pts(0, h, 0, r)
        self._poser(bas3 + haut3, e, centre)
        bas, haut = [self.pp(p) for p in bas3], [self.pp(p) for p in haut3]
        m = len(bas)
        ig = int(np.argmin([p[0] for p in bas]))
        idr = int(np.argmax([p[0] for p in bas]))
        # l'arc de devant : celui qui a les plus petits z (sin < 0)
        def arc(i0, i1, devant):
            idx, i = [], i0
            pas = 1 if devant else -1
            while True:
                idx.append(i)
                if i == i1:
                    break
                i = (i + pas) % m
            return idx
        av = arc(ig, idr, True) if bas3[(ig + 1) % m][2] < 0 else arc(ig, idr, False)
        arr = [i for i in range(m) if i not in av] + []
        self.corps = Polygon(*([bas[i] for i in av] + [haut[i] for i in reversed(av)]), stroke_width=0,
                             fill_color=nuance(couleur, np.array([0.3, 0, -1]) / 1.05), fill_opacity=opacite)
        self.haut = Polygon(*haut, fill_color=nuance(couleur, UP), fill_opacity=opacite, stroke_color=couleur_trait,
                            stroke_width=sw)
        self.bas_vu = VMobject(stroke_color=couleur_trait, stroke_width=sw).set_points_as_corners(
            [bas[i] for i in av])
        arr_pts = [bas[idr]] + [bas[i] for i in arr] + [bas[ig]]
        self.bas_cache = DashedVMobject(VMobject(stroke_color=couleur_trait, stroke_width=sw * 0.7)
                                        .set_points_as_corners(arr_pts), num_dashes=16)
        self.cotes = VGroup(Line(bas[ig], haut[ig], color=couleur_trait, stroke_width=sw),
                            Line(bas[idr], haut[idr], color=couleur_trait, stroke_width=sw))
        self._bas, self._haut = bas, haut
        self.add(self.corps, self.bas_cache, self.haut, self.bas_vu, self.cotes)

    def disque_haut(self, couleur=FACE_C):
        return Polygon(*self._haut, fill_color=couleur, fill_opacity=0.8, stroke_color=couleur, stroke_width=6)

    def disque_bas(self, couleur=FACE_C):
        return VGroup(Polygon(*self._bas, fill_color=couleur, fill_opacity=0.3, stroke_width=0),
                      DashedVMobject(Polygon(*self._bas, stroke_color=couleur, stroke_width=6), num_dashes=30))


class Cone(Rond):
    """Cône debout, pointe en haut. Groupes : corps, bas_vu, bas_cache, cotes ; pointe() ; disque_bas()."""

    def __init__(self, r=0.75, h=1.6, e=1.0, centre=ORIGIN, couleur=FACE_C, opacite=0.85, sw=4,
                 couleur_trait=WHITE):
        super().__init__()
        bas3 = _ellipse_pts(0, 0, 0, r)
        som3 = np.array([0, h, 0])
        self._poser(bas3 + [som3], e, centre)
        bas = [self.pp(p) for p in bas3]
        s = self.pp(som3)
        m = len(bas)
        ang = [np.arctan2(p[1] - s[1], p[0] - s[0]) for p in bas]  # tous vers le bas : pas de saut
        ig, idr = int(np.argmin(ang)), int(np.argmax(ang))
        # contour apparent : de la pointe aux deux points de tangence ; l'arc de devant entre eux
        av, i = [], ig
        pas = 1 if bas3[(ig + 1) % m][2] < bas3[(ig - 1) % m][2] else -1
        while True:
            av.append(i)
            if i == idr:
                break
            i = (i + pas) % m
        arr = [k for k in range(m) if k not in av]
        self.corps = Polygon(*([bas[k] for k in av] + [s]), stroke_width=0,
                             fill_color=nuance(couleur, np.array([0.2, 0.3, -1]) / 1.06), fill_opacity=opacite)
        self.bas_vu = VMobject(stroke_color=couleur_trait, stroke_width=sw).set_points_as_corners([bas[k] for k in av])
        # dos de la base : de la tangence droite à la gauche en passant par derrière
        arr_ord = [idr]
        k = (idr + pas) % m
        while k != ig:
            arr_ord.append(k)
            k = (k + pas) % m
        arr_ord.append(ig)
        self.bas_cache = DashedVMobject(VMobject(stroke_color=couleur_trait, stroke_width=sw * 0.7)
                                        .set_points_as_corners([bas[k] for k in arr_ord]), num_dashes=16)
        self.cotes = VGroup(Line(bas[ig], s, color=couleur_trait, stroke_width=sw),
                            Line(bas[idr], s, color=couleur_trait, stroke_width=sw))
        self._bas, self._s = bas, s
        self.add(self.corps, self.bas_cache, self.bas_vu, self.cotes)

    def pointe(self, couleur=SOMMET_C, r=0.12):
        return Dot(self._s, radius=r, color=couleur)

    def disque_bas(self, couleur=FACE_C):
        return VGroup(Polygon(*self._bas, fill_color=couleur, fill_opacity=0.45, stroke_width=0),
                      Polygon(*self._bas, stroke_color=couleur, stroke_width=6))


class Boule(VGroup):
    """Une boule : le disque ombré, l'équateur (devant plein, derrière en pointillés), un reflet."""

    def __init__(self, r=0.8, centre=ORIGIN, couleur=FACE_C, opacite=0.9, sw=4, couleur_trait=WHITE, equateur=True):
        super().__init__()
        c = np.array(centre)
        self.disque = Circle(radius=r, fill_color=couleur, fill_opacity=opacite, stroke_color=couleur_trait,
                             stroke_width=sw).move_to(c)
        self.ombre = Circle(radius=r * 0.98, fill_color=BLACK, fill_opacity=0.25, stroke_width=0) \
            .move_to(c + P(r * 0.18, -r * 0.18))
        self.ombre = Intersection(self.disque, self.ombre, fill_color=BLACK, fill_opacity=0.0, stroke_width=0)
        self.reflet = Ellipse(width=r * 0.55, height=r * 0.35, fill_color=WHITE, fill_opacity=0.45,
                              stroke_width=0).rotate(PI / 5).move_to(c + P(-r * 0.4, r * 0.45))
        self.add(self.disque, self.reflet)
        if equateur:
            av = Arc(radius=r, start_angle=PI, angle=PI, stroke_color=couleur_trait, stroke_width=sw * 0.7) \
                .stretch(0.32, 1).move_to(c + DOWN * r * 0.16)
            ar = DashedVMobject(Arc(radius=r, start_angle=0, angle=PI, stroke_color=couleur_trait,
                                    stroke_width=sw * 0.6).stretch(0.32, 1).move_to(c + UP * r * 0.16),
                                num_dashes=14)
            self.equateur = VGroup(av, ar)
            self.add(self.equateur)


def rouler(mob, dx, r, run_time=1.0):
    """Une boule (ou un objet rond de rayon r) qui roule de dx : elle tourne en avançant."""
    depart = mob.copy()

    def maj(m, a):
        m.become(depart.copy().rotate(-dx * a / r).shift(RIGHT * dx * a))
    return UpdateFromAlphaFunc(mob, maj, run_time=run_time)


# ── Patrons du cube, pliage en 3D ──────────────────────────────────────────

def _rot(v, a, th):
    """Rodrigues : v tourné de th autour de l'axe unitaire a."""
    return v * np.cos(th) + np.cross(a, v) * np.sin(th) + a * np.dot(a, v) * (1 - np.cos(th))


PATRONS = {
    # cellule (colonne, rangée) ; parent ; la racine = le fond. Rangée 0 = devant (en bas, à plat).
    "croix": ({"fond": (1, 1), "g": (0, 1), "d": (2, 1), "av": (1, 0), "ar": (1, 2), "couv": (1, 3)},
              {"fond": None, "g": "fond", "d": "fond", "av": "fond", "ar": "fond", "couv": "ar"}),
    "ligne": ({"a": (0, 0), "fond": (1, 0), "c": (2, 0), "d": (3, 0), "e": (4, 0), "f": (5, 0)},
              {"fond": None, "a": "fond", "c": "fond", "d": "c", "e": "d", "f": "e"}),
    "bloc": ({"a": (0, 0), "fond": (1, 0), "c": (2, 0), "d": (0, 1), "e": (1, 1), "f": (2, 1)},
             {"fond": None, "a": "fond", "c": "fond", "e": "fond", "d": "e", "f": "e"}),
}


class Patron(VGroup):
    """Un patron de cube qui se plie. État : `tilt` (−90 = à plat face à nous, 0 = couché sur la
    table) et `angles` (degrés de pliage de chaque carré autour de sa charnière, 90 = relevé).
    `sens` = +1 : les carrés se relèvent vers le haut (patron couché) ; −1 : vers l'arrière.
    `caches` : carrés pas encore dessinés. maj() redessine ; plier(...) renvoie l'animation."""

    def __init__(self, nom="croix", e=0.8, centre=ORIGIN, couleur=CARTON, sw=4, sens=1, caches=(),
                 cellules=None, parents=None):
        super().__init__()
        cel, par = (cellules, parents) if cellules else PATRONS[nom]
        self.cel, self.par = dict(cel), dict(par)
        self.e, self.couleur, self.sw, self.sens = e, couleur, sw, sens
        self.tilt = -90.0
        self.angles = {k: 0.0 for k in self.cel}
        self.caches = set(caches)
        self.couleurs = {}
        self._dec = np.zeros(3)
        cs = [self._proj(np.array([c + 0.5, 0, r + 0.5])) for c, r in self.cel.values()]
        xs = [p[0] for p in cs]
        ys = [p[1] for p in cs]
        self._dec = np.array(centre) - np.array([(min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, 0])
        self.racine = [k for k, v in self.par.items() if v is None][0]
        rc, rr = self.cel[self.racine]
        self._rc = np.array([rc + 0.5, 0.0, rr + 0.5])
        self._ancre = self._proj(self._rc)  # le fond reste à sa place quand le patron se couche
        self.pieces = VGroup()
        self.add(self.pieces)
        self.maj()

    def _proj(self, p):
        t = np.radians(self.tilt)
        q = np.array([p[0], p[1] * np.cos(t) - p[2] * np.sin(t), p[1] * np.sin(t) + p[2] * np.cos(t)])
        return cav(q) * self.e + self._dec

    def _monde(self, nom, p):
        s = nom
        while self.par[s] is not None:
            pa = self.par[s]
            (c1, r1), (c0, r0) = self.cel[s], self.cel[pa]
            d = np.array([c1 - c0, 0.0, r1 - r0])
            charn = np.array([(c0 + c1) / 2 + 0.5, 0.0, (r0 + r1) / 2 + 0.5])
            a = np.cross(d, np.array([0.0, self.sens, 0.0]))
            p = charn + _rot(p - charn, a, np.radians(self.angles[s]))
            s = pa
        return p

    def coins3(self, nom):
        c, r = self.cel[nom]
        return [self._monde(nom, np.array([x, 0.0, z], dtype=float))
                for x, z in ((c, r), (c + 1, r), (c + 1, r + 1), (c, r + 1))]

    def coins(self, nom):
        return [self._proj(p) for p in self.coins3(nom)]

    def centre_carre(self, nom):
        return sum(self.coins(nom)) / 4

    def _profondeur(self, nom):
        t = np.radians(self.tilt)
        ps = self.coins3(nom)
        z = [p[1] * np.sin(t) + p[2] * np.cos(t) for p in ps]
        y = [p[1] * np.cos(t) - p[2] * np.sin(t) for p in ps]
        return np.mean(z) - 0.02 * np.mean(y)

    def piece(self, nom, couleur=None, opacite=0.92):
        pts3 = self.coins3(nom)
        t = np.radians(self.tilt)
        n = _normale(pts3)
        n = np.array([n[0], n[1] * np.cos(t) - n[2] * np.sin(t), n[1] * np.sin(t) + n[2] * np.cos(t)])
        if np.dot(n, VUE) > 0:
            n = -n
        return Polygon(*[self._proj(p) for p in pts3], fill_color=nuance(couleur or self.couleurs.get(nom, self.couleur), n),
                       fill_opacity=opacite, stroke_color="#78350f", stroke_width=self.sw)

    def maj(self):
        self._dec = self._dec + self._ancre - self._proj(self._rc)
        noms = sorted([k for k in self.cel if k not in self.caches], key=self._profondeur, reverse=True)
        neuf = VGroup(*[self.piece(k) for k in noms])
        self.pieces.submobjects = neuf.submobjects
        self._pr = neuf[noms.index(self.racine)] if self.racine in noms else None
        return self

    def recaler(self):
        """Après un move_to / shift du patron : le fond reste là où on l'a posé."""
        if self._pr is not None:
            d = self._pr.get_center() - sum(self.coins(self.racine)) / 4
            self._ancre = self._ancre + d
            self._dec = self._dec + d
        return self

    def plier(self, angles=None, tilt=None, run_time=1.5):
        """Animation du pliage de l'état courant vers (angles, tilt)."""
        a0, t0 = dict(self.angles), self.tilt
        a1 = dict(a0)
        a1.update(angles or {})
        t1 = t0 if tilt is None else tilt

        def maj(m, al):
            m.tilt = t0 + (t1 - t0) * al
            for k in m.angles:
                m.angles[k] = a0[k] + (a1[k] - a0[k]) * al
            m.maj()
        return UpdateFromAlphaFunc(self, maj, run_time=run_time, rate_func=smooth)

    def charnieres(self, couleur=JAUNE_TITRE, sw=7):
        """Les traits de pliage (à plat) : le côté commun de chaque carré et de son parent."""
        g = VGroup()
        for k, pa in self.par.items():
            if pa is None or k in self.caches:
                continue
            (c1, r1), (c0, r0) = self.cel[k], self.cel[pa]
            if c1 != c0:
                x = max(c0, c1)
                a, b = np.array([x, 0.0, r0]), np.array([x, 0.0, r0 + 1])
            else:
                z = max(r0, r1)
                a, b = np.array([c0, 0.0, z]), np.array([c0 + 1, 0.0, z])
            g.add(DashedLine(self._proj(self._monde(k, a)), self._proj(self._monde(k, b)), color=couleur,
                             stroke_width=sw, dash_length=0.12))
        return g

    def contour_carre(self, nom, couleur=JAUNE_TITRE, sw=8):
        return Polygon(*self.coins(nom), stroke_color=couleur, stroke_width=sw)

    def place(self, cellule, texte=None, couleur=JAUNE_TITRE, fs=34):
        """Une place vide en pointillés (cellule hors patron, à plat), avec son numéro."""
        c, r = cellule
        pts = [self._proj(np.array([x, 0.0, z], dtype=float))
               for x, z in ((c, r), (c + 1, r), (c + 1, r + 1), (c, r + 1))]
        g = VGroup(DashedVMobject(Polygon(*pts, stroke_color=couleur, stroke_width=5), num_dashes=20))
        if texte:
            g.add(Text(texte, font_size=fs, color=couleur, weight=BOLD).move_to(sum(pts) / 4))
        return g


def patron_plat(nom, cote=0.5, centre=ORIGIN, couleur=CARTON, sw=3):
    """Le même patron, dessiné à plat (sans 3D), pour une question ou une liste."""
    cel = PATRONS[nom][0] if isinstance(nom, str) else nom
    g = VGroup(*[Square(cote, fill_color=couleur, fill_opacity=0.9, stroke_color="#78350f", stroke_width=sw)
                 .move_to(P(c * cote, r * cote)) for c, r in cel.values()])
    return g.move_to(centre)


# ── Personnages-métiers du lot ─────────────────────────────────────────────

def jade(s=1.0):
    """Jade, vendeuse de jouets : tablier rouge, cheveux longs."""
    p = visage(personne(peau="#e0ac69", tenue="#dc2626", cheveux="#78350f", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(RoundedRectangle(width=r * 1.3, height=r * 1.1, corner_radius=r * 0.1, fill_color="#fde68a",
                           fill_opacity=1, stroke_width=0).move_to(c + DOWN * r * 3.0))
    return p


def hugo(s=1.0):
    """Hugo, logisticien : gilet orange fluo à bandes, casquette."""
    p = visage(personne(peau="#8d5524", tenue="#f97316", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    for dy in (2.4, 3.1):
        p.add(Rectangle(width=r * 2.0, height=r * 0.18, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
              .move_to(c + DOWN * r * dy))
    p.add(casquette(p, "#1d4ed8"))
    return p


def amina(s=1.0):
    """Amina, archéologue : chemise sable, chapeau d'explorateur."""
    p = visage(personne(peau="#8d5524", tenue="#a16207", cheveux="#111827", longs=True, s=s))
    p.add(chapeau(p, "#d6a15c"))
    return p


def theo(s=1.0):
    """Théo, designer d'emballages : pull vert, lunettes, crayon."""
    p = visage(personne(peau="#f1c27d", tenue="#16a34a", cheveux="#b45309", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(VGroup(*[Circle(radius=0.22 * r, stroke_color="#111827", stroke_width=3).move_to(c + P(x * r, -0.18 * r))
                   for x in (-0.36, 0.36)]))
    return p


def lou(s=1.0):
    """Lou, créatrice de lampes : tenue violette, une petite ampoule allumée à côté."""
    p = visage(personne(peau="#c68642", tenue="#7c3aed", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    amp = VGroup(Circle(radius=r * 0.35, fill_color="#fde047", fill_opacity=1, stroke_width=0),
                 Rectangle(width=r * 0.3, height=r * 0.2, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)
                 .shift(DOWN * r * 0.4))
    p.add(amp.move_to(c + P(r * 1.9, -r * 1.6)))
    return p


class PaysageSolidesCE2(PaysagePerimetreCE2):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"

    def rep_lignes(self, lignes, mots, fs=32, y0=-1.75, pas=0.6, x=-6.2):
        """Dans autres_r : la réponse en lignes vertes, en bas à gauche, chacune à son mot."""
        for i, (l, m) in enumerate(zip(lignes, mots)):
            lg = self.rep_bas(i, [l], fs=fs, y0=y0, pas=pas, x=x)
            self.au_mot(m)
            self.play(FadeIn(lg, shift=UP * 0.08), run_time=0.3)
        self.rep_fini()

    def etiquette(self, texte, cible, mot, cote=DOWN, fs=30, couleur=BLEU_CALCUL, buff=0.2, n=1):
        """Le nom d'un objet, posé au mot sous (ou à côté de) l'objet."""
        t = self.t(texte, fs, couleur).next_to(cible, cote, buff=buff)
        self.au_mot(mot, n)
        self.play(FadeIn(t, shift=-cote * 0.1), run_time=0.3)
        return t

    def compter(self, objets, extraits, numeros=None, couleur=JAUNE_TITRE, fs=34, run_time=0.25):
        """Compter à voix haute : chaque objet (surlignage) paraît avec son numéro, à SON extrait
        (« 1, », « 2, »…). numeros : positions des numéros (None = pas de numéro)."""
        nums = VGroup()
        for k, (o, ex) in enumerate(zip(objets, extraits)):
            ex = list(ex) if isinstance(ex, (tuple, list)) else [ex]
            ex, n, delai = (ex + [1, 0.0][len(ex) - 1:])[:3]
            self.au_mot(ex, n)
            self.wait(0.07 + delai)
            anims = [FadeIn(o, scale=1.1)]
            if numeros is not None:
                t = Text(str(k + 1), font_size=fs, color=couleur, weight=BOLD).move_to(numeros[k])
                for f in t.get_family():
                    f.sans_synchro = True
                nums.add(t)
                anims.append(FadeIn(t, scale=1.4))
            self.play(*anims, run_time=run_time)
        return nums
