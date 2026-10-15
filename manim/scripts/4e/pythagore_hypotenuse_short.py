# pythagore_hypotenuse_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 3 : le raccourci.
# CEINTURE BLANCHE : en HAUT le champ de cannes vu du ciel, que le marcheur longe
# puis traverse en diagonale ; en BAS le calcul qui s'écrit À CHACUN DE SES PAS.
# Bords BLEUS, diagonale ORANGE, comme dans la paysage.
# Voix validée le 12/10 : manim/voix/4e-pythagore-hypotenuse-short.json.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_hypotenuse_short.py ShortRaccourci4e -o eleveai-maths-4e-pythagore-hypotenuse-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/03-hypotenuse-calcul/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_carre_racine import COTE, P, PythagoreCarreRacine4e  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from gabarit_trigo import COUL_HYP  # noqa: E402
from signes_expression_2de import ceinture  # noqa: E402

CANNE = "#3F7D20"
# Le champ : 40 m sur 30 m, à l'échelle exacte (0,06 unité par mètre → 2,4 × 1,8).
SO, SE, NE, NO = P(-1.2, -0.15), P(1.2, -0.15), P(1.2, 1.65), P(-1.2, 1.65)


class ShortRaccourci4e(Short6e):
    nom_voix = "4e-pythagore-hypotenuse-short"

    t = PythagoreCarreRacine4e.t

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Le raccourci", font_size=48, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.3))
        q = self.grand("Combien de mètres en diagonale ?", font_size=26, color=BLEU_CALCUL).move_to(P(0, 1.9))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Combien")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        fond = Polygon(SO, SE, NE, NO, stroke_color=WHITE, stroke_width=3, fill_color=CANNE, fill_opacity=0.55)
        rangs = VGroup(*[Line(P(SO[0] + 0.1, y), P(SE[0] - 0.1, y), color="#A3D977", stroke_width=1.2,
                              stroke_opacity=0.6) for y in np.arange(SO[1] + 0.2, NO[1] - 0.05, 0.2)])
        self.play(FadeIn(fond), Create(rangs), run_time=0.8)
        y1, y2, y3, y4 = -0.72, -1.25, -1.78, -2.27
        self.au_mot("30 mètres sur 40")
        l40 = self.t("40 m", 24, COTE).next_to(Line(SO, SE), DOWN, buff=0.08)
        l30 = self.t("30 m", 24, COTE).next_to(Line(SE, NE), RIGHT, buff=0.06)
        self.play(FadeIn(l40), FadeIn(l30))

        self.au_mot("Par les bords")
        m = Dot(SO, radius=0.1, color=JAUNE_TITRE)
        self.add(m)
        bords = VGroup(Line(SO, SE), Line(SE, NE)).set_stroke(COTE, 6)
        l_bords = self.grand("30 + 40 = 70 m", font_size=32, color=COTE).move_to(P(0, y1))
        self.play(Create(bords[0]), m.animate.move_to(SE), run_time=0.9, rate_func=linear)
        self.play(Create(bords[1]), m.animate.move_to(NE), FadeIn(l_bords), run_time=0.7, rate_func=linear)

        self.au_mot("En diagonale")
        self.play(m.animate.move_to(SO), run_time=0.3)
        diag = Line(SO, NE, color=COUL_HYP, stroke_width=7)
        carres = self.grand("30² + 40² = 2 500", font_size=32, color=COUL_HYP).move_to(P(0, y2))
        self.play(Create(diag), m.animate.move_to(NE), FadeIn(carres), run_time=1.6, rate_func=linear)

        self.au_mot("Racine de 2500")
        res = VGroup(self.radical("2 500", font_size=34, color=VERT_OK), self.t("= 50 m", 34, VERT_OK))
        res.arrange(RIGHT, buff=0.2).move_to(P(0, y3))
        self.play(Write(res))
        self.play(FadeIn(self.t("50 m", 26, COUL_HYP).move_to((SO + NE) / 2 + UL * 0.3)))
        self.au_mot("20 mètres de gagnés")
        gain = self.grand("20 m de gagnés !", font_size=30, color=VERT_OK).move_to(P(0, y4))
        self.play(Write(gain))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        r = Rectangle(width=2.8, height=2.1, stroke_color=WHITE, stroke_width=3,
                      fill_color=CANNE, fill_opacity=0.45).move_to(P(-0.35, 0.75))
        self.au_mot("Un terrain")
        self.play(FadeIn(r))
        self.au_mot("60 mètres sur 80")
        self.play(FadeIn(self.t("80 m", 26, COTE).next_to(r, DOWN, buff=0.08)),
                  FadeIn(self.t("60 m", 26, COTE).next_to(r, RIGHT, buff=0.06)))
        self.au_mot("Combien mesure sa diagonale")
        self.play(Create(Line(r.get_corner(DL), r.get_corner(UR), color=COUL_HYP, stroke_width=7)),
                  FadeIn(self.t("?", 48, COUL_HYP).move_to(r.get_center() + UL * 0.35)))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.5))))
        self.attendre_voix(marge=1.5)
