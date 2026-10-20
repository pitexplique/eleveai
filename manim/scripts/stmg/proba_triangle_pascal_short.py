# proba_triangle_pascal_short.py
# EleveAI — Maths STMG — short jumeau du « Triangle de Pascal » (micro
# vaT_triangle_pascal). CEINTURE JAUNE. Il AMUSE : un triangle de nombres qui
# compte les chemins tout seul.
#   · en HAUT une planche de Galton : 16 billes tombent, chacune par un chemin
#     différent (gauche / droite à chaque clou) ; les bacs se remplissent
#     1, 4, 6, 4, 1 ;
#   · en BAS, EN MÊME TEMPS : le triangle se construit, chaque nombre né de
#     deux flèches qui partent des deux nombres au-dessus, quand la voix le dit ;
#   · « Magique ! » : la ligne 1, 4, 6, 4, 1 et les bacs s'allument ensemble ;
#   · fin : la ligne suivante en « ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/stmg-proba-triangle-pascal-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_triangle_pascal_short.py ShortProbaTrianglePascal -o eleveai-maths-stmg-proba-triangle-pascal-short --media_dir manim/scripts/stmg/media-triangle_pascal
# Copier dans manim/sorties/stmg/maths/probabilites/43-triangle-pascal/.

import random
import re
import sys
from itertools import product
from math import comb
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_triangle_pascal import FLECHE, P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
BILLE = "#FBBF24"
CLOU = "#CBD5E1"

# la planche de Galton
Y_CLOUS = [1.62, 1.38, 1.14, 0.9]
PAS_X = 0.44
Y_HAUT_BACS = 0.72
Y_SOL = 0.0
R_BILLE = 0.055
PAS_PILE = 0.112

# le triangle (en bas)
Y_T0 = -0.3
PAS_TY = 0.46
PAS_TX = 0.66


def pos_tri(n, k):
    return P((k - n / 2) * PAS_TX, Y_T0 - n * PAS_TY)


def planche():
    """Les clous (4 rangées) et les 5 bacs."""
    clous = VGroup()
    for r, y in enumerate(Y_CLOUS):
        for j in range(r + 1):
            clous.add(Dot(P((j - r / 2) * PAS_X, y), radius=0.045, color=CLOU))
    murs = VGroup()
    for i in range(6):
        x = (i - 2.5) * PAS_X
        murs.add(Line(P(x, Y_HAUT_BACS), P(x, Y_SOL), color=CLOU, stroke_width=3))
    sol = Line(P(-2.5 * PAS_X, Y_SOL), P(2.5 * PAS_X, Y_SOL), color=CLOU, stroke_width=3)
    return VGroup(VGroup(), clous, murs, sol)


def billes_qui_tombent(intervalle=0.5, duree=1.15, graine=7):
    """16 billes, 16 chemins tous différents (2⁴) : les bacs finissent à
    1, 4, 6, 4, 1. Une structure fixe, déplacée par un updater (jamais de
    remove/add dans l'updater)."""
    chemins = list(product((-1, 1), repeat=4))
    random.Random(graine).shuffle(chemins)
    pile = [0] * 5
    trajets = []
    for ch in chemins:
        pts = [P(0, 1.88)]
        x = 0.0
        for r, y in enumerate(Y_CLOUS):
            pts.append(P(x, y + 0.1))
            x += ch[r] * PAS_X / 2
        bac = int(round(x / PAS_X + 2))
        pts.append(P(x, Y_HAUT_BACS - 0.05))
        pts.append(P(x, Y_SOL + R_BILLE + 0.01 + PAS_PILE * pile[bac]))
        pile[bac] += 1
        trajets.append(pts)
    g = VGroup(*[Dot(radius=R_BILLE, color=BILLE).move_to(t[0]).set_opacity(0) for t in trajets])
    horloge = {"t": 0.0}

    def bouge(m, dt):
        horloge["t"] += dt
        for i, (b, pts) in enumerate(zip(m, trajets)):
            u = (horloge["t"] - i * intervalle) / duree
            if u <= 0:
                b.set_opacity(0)
                continue
            b.set_opacity(1)
            u = min(u, 1.0)
            seg = u * (len(pts) - 1)
            j = min(int(seg), len(pts) - 2)
            f = seg - j
            b.move_to(pts[j] + (pts[j + 1] - pts[j]) * f)

    g.add_updater(bouge)
    return g


class ShortProbaTrianglePascal(Short6e):
    nom_voix = "stmg-proba-triangle-pascal-short"
    identite = "Maths STMG — EleveAI"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def au_car(self, i):
        """Attend le caractère n° i de la phrase en cours."""
        if not self._duree_voix:
            return
        cible = self._debut_voix + self._duree_voix * i / len(self._texte_voix)
        reste = cible - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def nombre(self, n, k):
        return Text(str(comb(n, k)), font_size=32, color=WHITE, weight=BOLD).move_to(pos_tri(n, k))

    def fleches(self, n, k):
        out = VGroup()
        cible = pos_tri(n, k)
        for kk, dx in ((k - 1, -0.1), (k, 0.1)):
            src = pos_tri(n - 1, kk)
            a = src + DOWN * 0.14 + RIGHT * (0.08 if kk == k - 1 else -0.08)
            b = cible + UP * 0.15 + RIGHT * dx
            out.add(Arrow(a, b, buff=0, color=FLECHE, stroke_width=6, max_tip_length_to_length_ratio=0.45,
                          max_stroke_width_to_length_ratio=20))
        return out

    def construct(self):
        self.margo_bas()

        # ── 00 : un triangle qui compte les chemins tout seul ? ──
        self.dire("00-accroche")
        titre = self.t("Un triangle qui compte ?", 40, JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pl = planche()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(pl), run_time=0.8)
        billes = billes_qui_tombent()
        self.add(billes)
        self.au_mot("compte les chemins")
        self.play(Indicate(pl[1], color=BILLE, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : le triangle se construit, chaque nombre né de deux flèches ──
        self.dire("01-image")
        texte = self._texte_voix
        fin = texte.find("Chaque")
        pos = [m.start() for m in re.finditer(r"\d+", texte[:fin])]
        cases = [(n, k) for n in range(5) for k in range(n + 1)]
        nums = {}
        fl_prec = VGroup()
        for (n, k), i in zip(cases, pos):
            self.au_car(i)
            num = self.nombre(n, k)
            nums[(n, k)] = num
            anims = []
            if len(fl_prec):
                anims.append(FadeOut(fl_prec))
                fl_prec = VGroup()
            if 0 < k < n:
                fl = self.fleches(n, k)
                self.play(*anims, GrowArrow(fl[0]), GrowArrow(fl[1]), run_time=0.2)
                self.play(FadeIn(num, scale=2.0), run_time=0.18)
                fl_prec = fl
            else:
                self.play(*anims, FadeIn(num, scale=2.0), run_time=0.22)
        if len(fl_prec):
            self.play(FadeOut(fl_prec), run_time=0.2)
        self.au_mot("Chaque nombre")
        fl6 = self.fleches(4, 2)
        self.play(GrowArrow(fl6[0]), GrowArrow(fl6[1]), nums[(3, 1)].animate.set_color(FLECHE),
                  nums[(3, 2)].animate.set_color(FLECHE), run_time=0.4)
        self.play(nums[(4, 2)].animate.scale(1.6).set_color(JAUNE_TITRE), run_time=0.3)
        self.play(nums[(4, 2)].animate.scale(1 / 1.6), run_time=0.3)
        self.au_mot("Magique")
        magique = self.t("Magique !", 54, JAUNE_TITRE, 3.6).move_to(P(0, 3.4))
        ligne4 = VGroup(*[nums[(4, k)] for k in range(5)])
        cadre = SurroundingRectangle(ligne4, color=BILLE, buff=0.1, stroke_width=4)
        self.play(ReplacementTransform(titre, magique), FadeOut(fl6),
                  *[nums[(3, k)].animate.set_color(WHITE) for k in (1, 2)], Create(cadre), run_time=0.5)
        self.play(Indicate(ligne4, color=BILLE, scale_factor=1.2), Indicate(pl[2], color=BILLE, scale_factor=1.05),
                  Wiggle(magique), run_time=0.8)
        self.attendre_voix(marge=0.1)

        # ── 02 : la ligne suivante ? ──
        self.dire("02-question")
        self.au_mot("quelle est la ligne suivante")
        qs = VGroup(*[Text("?", font_size=32, color=FLECHE, weight=BOLD).move_to(pos_tri(5, k)) for k in range(6)])
        self.play(LaggedStart(*[FadeIn(q, scale=2.0) for q in qs], lag_ratio=0.12), FadeOut(cadre), run_time=0.8)
        self.au_mot("Réponds en commentaire")
        billes.clear_updaters()
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK))
        appel.arrange(DOWN, buff=0.08).move_to(P(0, 0.9))
        fond = BackgroundRectangle(appel, color=BLACK, fill_opacity=0.9, buff=0.2)
        self.play(FadeOut(VGroup(pl, billes)), FadeIn(fond), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
