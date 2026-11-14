# perimetre_ce2_commun.py
# EleveAI — Maths CE2 — série « Périmètre » (13/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux paysages perimetre_comprendre, perimetre_polygone, perimetre_comparer
# (puis rectangle et défi). Vidéos COMMUNES : la session CM1 les relie par `aussi`.
# Base : PaysageCalculPose (6e/calcul_pose_commun : synchro par jetons, audit, question-pause,
# finale « Ce que tu as appris », fin du 05/11), IMPORTÉE sans la modifier.
# Ici : la figure cotée (côtés écrits dehors), le tour en ORANGE (même code que la série CM1 :
# orange = le tour = le périmètre), la fourmi, les personnages-métiers du lot.
# Voix : manim/voix/ce2-perimetre-<slug>.json (Julie, débit −6) ; marques : perimetre_marques.py.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from calcul_pose_commun import *  # noqa: E402,F401,F403

TOUR = ORANGE_RETENUE   # le tour (périmètre), toujours orange
HERBE = "#22c55e"
HERBE_F = "#166534"
BOIS = "#a16207"
DEDANS = "#1e293b"


class FigureCotee(VGroup):
    """Un polygone à partir de ses sommets (en mètres ou en cm, unité libre), à l'échelle `e`,
    centré sur `centre`. Les côtés vont du sommet i au sommet i+1 ; leurs textes (`textes`,
    None = pas de texte) se posent DEHORS, au milieu du côté. Les textes ne sont PAS ajoutés au
    groupe : la scène les pose au mot (fig.lab[i])."""

    def __init__(self, pts, textes=None, e=0.5, centre=ORIGIN, fs=30, couleur=WHITE, remplir=None,
                 opacite=1.0, sw=5, decal=0.34, couleur_txt=WHITE):
        super().__init__()
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
        self.s = [np.array([(x - cx) * e, (y - cy) * e, 0]) + np.array(centre) for x, y in pts]
        self.poly = Polygon(*self.s, stroke_color=couleur, stroke_width=sw)
        if remplir:
            self.poly.set_fill(remplir, opacite)
        self.add(self.poly)
        n = len(self.s)
        aire = sum(self.s[i][0] * self.s[(i + 1) % n][1] - self.s[(i + 1) % n][0] * self.s[i][1] for i in range(n))
        sens = 1 if aire > 0 else -1  # sens direct : la normale extérieure est (dy, −dx)
        self.lab = VGroup()
        for i in range(n):
            a, b = self.s[i], self.s[(i + 1) % n]
            if not textes or textes[i] is None:
                self.lab.add(VGroup())
                continue
            d = b - a
            nrm = np.array([d[1], -d[0], 0]) * sens
            nrm = nrm / (np.linalg.norm(nrm) or 1)
            t = Text(textes[i], font_size=fs, color=couleur_txt, weight=BOLD)
            # le texte s'écarte du côté de sa demi-taille dans la direction de la normale
            ext = abs(nrm[0]) * t.width / 2 + abs(nrm[1]) * t.height / 2
            t.move_to((a + b) / 2 + nrm * (decal + ext))
            self.lab.add(t)

    def sommets(self):
        """Les sommets là où est la figure MAINTENANT (après un move_to)."""
        return list(self.poly.get_vertices())

    def cote(self, i, couleur=TOUR, sw=11):
        s = self.sommets()
        return Line(s[i], s[(i + 1) % len(s)], color=couleur, stroke_width=sw)

    def contour(self, couleur=TOUR, sw=11):
        return Polygon(*self.sommets(), stroke_color=couleur, stroke_width=sw)


def rect_pts(L, l):
    """Rectangle L × l, sommets dans le sens direct depuis le coin en bas à gauche :
    côtés bas (L), droite (l), haut (L), gauche (l)."""
    return [(0, 0), (L, 0), (L, l), (0, l)]


def depart(p, couleur=JAUNE_TITRE):
    return Dot(p, radius=0.13, color=couleur)


def fourmi(s=1.0, couleur="#111827"):
    """Une fourmi vue de dessus (tête à droite) : trois boules, six pattes, deux antennes."""
    corps = VGroup(*[Circle(radius=r * s, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                            stroke_width=1.5).move_to(P(x * s, 0)) for x, r in ((-0.26, 0.15), (0, 0.1), (0.2, 0.09))])
    pattes = VGroup(*[Line(P(x * s, 0), P((x + dx) * s, sy * 0.22 * s), color=couleur, stroke_width=3)
                      for x, dx in ((-0.06, -0.12), (0, 0), (0.06, 0.12)) for sy in (1, -1)])
    ant = VGroup(*[Line(P(0.26 * s, 0), P(0.4 * s, sy * 0.13 * s), color=couleur, stroke_width=2.5) for sy in (1, -1)])
    return VGroup(pattes, ant, corps)


def poteaux(fig, pas=0.55, h=0.32, couleur=BOIS):
    """Les poteaux d'une clôture tout le long du tour."""
    g = VGroup()
    s = fig.sommets()
    n = len(s)
    for i in range(n):
        a, b = s[i], s[(i + 1) % n]
        k = max(1, int(np.linalg.norm(b - a) / pas))
        for j in range(k):
            p = a + (b - a) * j / k
            g.add(Rectangle(width=0.09, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(p))
    return g


def touffes(centre, n=5, s=1.0):
    """Des touffes d'herbe (le dedans du jardin)."""
    g = VGroup()
    rng = np.random.default_rng(7)
    for _ in range(n):
        c = np.array(centre) + np.array([rng.uniform(-0.9, 0.9) * s, rng.uniform(-0.45, 0.45) * s, 0])
        g.add(VGroup(*[Line(c, c + np.array([dx * s, 0.22 * s, 0]), color="#86efac", stroke_width=3)
                       for dx in (-0.08, 0, 0.08)]))
    return g


def casquette(p, couleur="#f59e0b"):
    c, r = p.tete.get_center(), p.tete.width / 2
    vis = RoundedRectangle(width=r * 1.6, height=r * 0.28, corner_radius=r * 0.12, fill_color=couleur,
                           fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.55, r * 0.55))
    dome = AnnularSector(inner_radius=0, outer_radius=r * 1.02, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.62))
    return VGroup(dome, vis)


def chapeau(p, couleur="#eab308"):
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.55, fill_color=couleur, fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.85, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    return VGroup(dome, bord)


def leo(s=1.0):
    """Léo, paysagiste : tenue verte, casquette orange."""
    p = visage(personne(peau="#e0ac69", tenue="#15803d", cheveux="#78350f", s=s))
    p.add(casquette(p))
    return p


def ines(s=1.0):
    """Inès, éleveuse de moutons : chemise brune, chapeau de paille."""
    p = visage(personne(peau="#8d5524", tenue="#92400e", cheveux="#111827", longs=True, s=s))
    p.add(chapeau(p))
    return p


def mouton(s=1.0):
    laine = VGroup(*[Circle(radius=0.2 * s, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1", stroke_width=1.5)
                     .move_to(P(x * s, y * s)) for x, y in ((-0.2, 0), (0, 0.08), (0.2, 0), (-0.1, -0.1), (0.1, -0.1))])
    tete = Ellipse(width=0.22 * s, height=0.28 * s, fill_color="#1f2937", fill_opacity=1, stroke_width=0) \
        .move_to(P(0.42 * s, 0.05 * s))
    pattes = VGroup(*[Line(P(x * s, -0.18 * s), P(x * s, -0.42 * s), color="#1f2937", stroke_width=4)
                      for x in (-0.18, 0.15)])
    return VGroup(pattes, laine, tete)


class PaysagePerimetreCE2(PaysageCalculPose):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    def ligne_somme(self, prec, reste, fs=40, couleur=None):
        """« 13 + 8 = 21 » quand la voix dit « Plus 8, 21 » : le 13 (déjà dit, déjà écrit au-dessus)
        est hors synchro et hors audit ; le reste paraît au mot."""
        c = couleur or BLEU_D
        lg = self.ligne([(prec, c), (reste, c)], fs, buff=0.16)
        hors_audit(lg[0])
        return lg

    def au_fil(self, lg, debut=0, run_time=0.18):
        """Les morceaux lg[debut:] l'un après l'autre : la synchro par jetons attend chacun
        à son nombre (« 5 », « + 5 », « + 5 », « = 15. »)."""
        for m in lg[debut:]:
            self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)
        return lg

    def tour_cote(self, fig, i, run_time=0.5, mobile=None):
        """Le côté i passe en orange (le tour avance) ; `mobile` (fourmi, point) le suit."""
        c = fig.cote(i)
        if mobile is not None:
            self.play(Create(c), mobile.animate.move_to(c.get_end()), run_time=run_time)
        else:
            self.play(Create(c), run_time=run_time)
        return c

    # ── ajoutés pour les épisodes 04 (rectangle) et 05 (défi), 14/11 ─────────
    def aux_extraits(self, morceaux, extraits, run_time=0.18):
        """Chaque morceau à SON extrait de la voix (nombres répétés : la synchro par jetons s'y
        perd). Un extrait = « texte » ou (« texte », occurrence, délai). L'audit vérifie toujours."""
        for m, ex in zip(morceaux, extraits):
            for f in m.get_family():
                f.sans_synchro = True
            ex = list(ex) if isinstance(ex, (tuple, list)) else [ex]
            ex, n, delai = (ex + [1, 0.0][len(ex) - 1:])[:3]
            self.au_mot(ex, n)
            self.wait(0.07 + delai)  # au-delà de l'arrondi d'image de l'aperçu
            self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)

    def somme_lg(self, morceaux, y, mot, fs=34, x=None, xl=None, couleur=BLEU_D, avec=(), mots=None,
                 couleur0=WHITE):
        """Une somme écrite au fil de la voix : le titre (« Longueurs : ») au mot, puis chaque
        nombre à son tour (au_fil, ou à son extrait si `mots`)."""
        lg = self.ligne([(m, couleur if k else couleur0) for k, m in enumerate(morceaux)], fs, buff=0.16)
        if x is not None:
            gauche(lg, x, y)
        else:
            self.col(lg, y, xl=xl)
        self.au_mot(mot)
        self.play(FadeIn(lg[0], shift=UP * 0.08), *avec, run_time=0.25)
        if mots is None:
            self.au_fil(lg, 1)
        else:
            self.aux_extraits(lg[1:], mots)
        return lg


def codes(fig, couleur=WHITE, long=0.22):
    """Les petits traits qui disent « côtés égaux », au milieu de chaque côté."""
    s = fig.sommets()
    g = VGroup()
    for i in range(len(s)):
        a, b = s[i], s[(i + 1) % len(s)]
        d = (b - a) / (np.linalg.norm(b - a) or 1)
        n = np.array([-d[1], d[0], 0])
        m = (a + b) / 2
        g.add(Line(m - n * long / 2, m + n * long / 2, color=couleur, stroke_width=4))
    return g
