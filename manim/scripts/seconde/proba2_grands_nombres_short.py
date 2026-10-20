# proba2_grands_nombres_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 14 :
# la loi des grands nombres. CEINTURE JAUNE. Il AMUSE : une punaise, pointe en
# haut ou en bas ? Personne ne sait… mais en la lançant 1 000 fois, la courbe
# se calme autour de 0,6.
#   · en HAUT la punaise qui tombe, puis la courbe de la fréquence qui oscille
#     et se stabilise (la même série fixée que la paysage) ;
#   · en BAS, EN MÊME TEMPS, les fréquences dites : 0,7 ; 0,62 ; 0,604 ;
#   · fin : « sur 5 000 lancers, combien de fois pointe en haut ? »,
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-grands-nombres-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_grands_nombres_short.py ShortProba2GrandsNombres -o eleveai-maths-seconde-proba-grands-nombres-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/14-grands-nombres/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

# Les dessins de la paysage, chargés par CHEMIN EXACT.
_spec = importlib.util.spec_from_file_location("proba2_grands_nombres_seconde", ICI / "proba2_grands_nombres.py")
_pg = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pg)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

P, punaise, frequences = _pg.P, _pg.punaise, _pg.frequences
COUL_F, COUL_P = _pg.COUL_F, _pg.COUL_P

GX0, GX1 = -1.75, 1.45      # la mini-courbe : n = 1 … 1 000 (échelle 1, 10, 100, 1 000)
GY0, GY1 = -0.35, 1.55      # f = 0 … 1
YL = (-1.05, -1.65, -2.25)  # les trois lignes de maths


def gx(n):
    return GX0 + (GX1 - GX0) * math.log10(n) / 3


def gy(f):
    return GY0 + (GY1 - GY0) * f


class ShortProba2GrandsNombres(Short6e):
    nom_voix = "seconde-proba-grands-nombres-short"

    def ligne(self, morceaux, font_size=40, y=0.0, buff=0.16, largeur=4.1):
        g = VGroup(*[m if isinstance(m, Mobject) else Text(m, font_size=font_size, color=c)
                     for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g.move_to(P(0, y))

    def insister(self, mob, k=1.5, run_time=0.22):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def tombe(self, x, y_sol, haut, s=0.9, run_time=0.5):
        pn = punaise(haut, s).next_to(P(x, y_sol), UP, buff=0)
        fin = pn.copy()
        pn.shift(UP * 1.6).rotate(2.4)
        self.play(Transform(pn, fin, path_arc=-2.4), run_time=run_time, rate_func=rate_functions.ease_in_quad)
        return pn

    def courbe(self, f, n0, n1, sw=4):
        c = VMobject(stroke_color=COUL_F, stroke_width=sw)
        c.set_points_as_corners([P(gx(n), gy(f[n - 1])) for n in range(n0, n1 + 1)])
        return c

    def construct(self):
        self.margo_bas()
        f = frequences()

        # ── 00 : l'accroche : pointe en haut ou en bas ? ──
        self.dire("00-accroche")
        titre = self.grand("Pointe en haut ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        sol = Line(P(-1.9, 0.3), P(1.9, 0.3), color=GREY_B, stroke_width=4)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), Create(sol), run_time=0.6)
        self.au_mot("pointe en haut")
        h = self.tombe(-0.95, 0.3, True, 1.0, 0.45)
        lh = Text("en haut", font_size=32, color=JAUNE_TITRE).move_to(P(-0.95, -0.15))
        self.play(FadeIn(lh, scale=0.6), run_time=0.2)
        self.au_mot("ou en bas")
        b = self.tombe(0.95, 0.3, False, 1.0, 0.45)
        lb = Text("en bas", font_size=32, color=ORANGE_RETENUE).move_to(P(0.95, -0.15))
        self.play(FadeIn(lb, scale=0.6), run_time=0.2)
        self.au_mot("Personne ne connaît")
        q = self.ligne([("probabilité", WHITE), ("?", ORANGE_RETENUE)], 46, YL[1], 0.2)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(h.animate.scale(1.25), b.animate.scale(1.25), run_time=0.2)
        self.play(h.animate.scale(1 / 1.25), b.animate.scale(1 / 1.25), run_time=0.2)
        self.insister(q[1], 1.6, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : la courbe se calme ──
        self.dire("01-image")
        ax = Arrow(P(GX0, GY0), P(GX1 + 0.35, GY0), buff=0, stroke_width=3, color=WHITE,
                   max_tip_length_to_length_ratio=0.05)
        ay = Line(P(GX0, GY0), P(GX0, GY1), stroke_width=3, color=WHITE)
        self.play(FadeOut(VGroup(sol, h, b, lh, lb, q)), Create(ax), Create(ay), run_time=0.4)
        paliers = [(10, 1, "10", "0,7", "10 lancers", "0,7", 0.7),
                   (100, 10, "100", "0,62", "100 lancers", "0,62", 0.8),
                   (1000, 100, "1 000", "0,604", "1 000 lancers", "0,604", 0.9)]
        lignes = VGroup()
        for i, (n, n0, tn, tf, ex_n, ex_f, run) in enumerate(paliers):
            self.au_mot(ex_n)
            tr = Line(P(gx(n), GY0 - 0.08), P(gx(n), GY0 + 0.08), stroke_width=3)
            gl = Text(tn, font_size=20, color=JAUNE_TITRE).next_to(tr, DOWN, buff=0.06)
            ln = Text(f"{tn} lancers :", font_size=34, color=WHITE)
            v = Text(tf, font_size=38, color=JAUNE_TITRE, weight=BOLD)
            gr = VGroup(ln, v).arrange(RIGHT, buff=0.2)
            if gr.width > 4.0:
                gr.scale_to_fit_width(4.0)
            gr.move_to(P(0, YL[i]))
            self.play(Create(tr), FadeIn(gl), FadeIn(ln, shift=UP * 0.1), run_time=0.25)
            self.play(Create(self.courbe(f, n0, n)), run_time=run, rate_func=linear)
            self.au_mot(ex_f)
            pt = Dot(P(gx(n), gy(f[n - 1])), radius=0.07, color=JAUNE_TITRE)
            self.play(FadeIn(v, scale=0.5), FadeIn(pt, scale=0.5), run_time=0.3)
            self.insister(v, 1.4, 0.18)
            lignes.add(VGroup(ln, v))
        self.au_mot("La fréquence se stabilise")
        stab = self.grand("Ça se stabilise !", font_size=42, color=VERT_OK).move_to(P(0, 3.25))
        ld = DashedLine(P(GX0, gy(0.6)), P(GX1 + 0.1, gy(0.6)), dash_length=0.1, color=COUL_P, stroke_width=4)
        self.play(Transform(titre, stab), Create(ld), run_time=0.5)
        self.au_mot("autour de 0,6")
        six = Text("0,6", font_size=44, color=COUL_P, weight=BOLD)
        fond = BackgroundRectangle(six, color=BLACK, fill_opacity=0.85, buff=0.05)
        bulle = VGroup(fond, six).move_to(P(0.75, gy(0.6) - 0.5))
        self.play(FadeIn(bulle, scale=0.5), ld.animate.set_stroke(width=7), run_time=0.35)
        self.insister(bulle, 1.6, 0.25)
        self.attendre_voix(marge=0.6)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        sol = Line(P(-2.0, -0.1), P(2.0, -0.1), color=GREY_B, stroke_width=3)
        self.play(Write(toi), Create(sol), run_time=0.4)
        self.au_mot("sur 5 000 lancers")
        cinq = self.ligne([("5 000", JAUNE_TITRE), ("lancers", WHITE)], 44, YL[0] + 0.1)
        rng = np.random.default_rng(14)
        pluie = VGroup()
        for k in range(18):
            x = -1.75 + 3.5 * (k % 9) / 8
            y = -0.1 + (0.75 if k >= 9 else 0.0)
            pn = punaise(bool(rng.random() < 0.6), 0.32).next_to(P(x, y), UP, buff=0)
            pluie.add(pn)
        self.play(FadeIn(cinq, shift=UP * 0.15),
                  LaggedStart(*[FadeIn(p, shift=DOWN * 1.2) for p in pluie], lag_ratio=0.08), run_time=1.3)
        self.au_mot("combien de fois")
        qq = self.ligne([("pointe en haut :", WHITE), ("?", ORANGE_RETENUE)], 40, YL[1] + 0.12, 0.2)
        self.play(FadeIn(qq, scale=0.6), run_time=0.35)
        self.insister(qq[1], 1.7, 0.22)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=38, color=VERT_OK),
                       self.grand("commentaire !", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.06)
        appel.move_to(P(0, -2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
