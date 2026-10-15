# pythagore_cote_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 4 : la largeur cachée.
# CEINTURE BLANCHE : en HAUT le champ de cannes de l'épisode 3, la diagonale
# ORANGE déjà connue, la largeur BLEUE qui se cherche ; en BAS le calcul qui
# s'écrit en même temps (50² − 40² = 900, √900 = 30).
# Voix : manim/voix/4e-pythagore-cote-short.json.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_cote_short.py ShortLargeur4e -o eleveai-maths-4e-pythagore-cote-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/04-cote/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_hypotenuse_short import CANNE, NE, NO, SE, SO, ShortRaccourci4e  # noqa: E402  (pose les chemins)
from pythagore_carre_racine import COTE, P  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_trigo import COUL_HYP  # noqa: E402
from signes_expression_2de import ceinture  # noqa: E402


class ShortLargeur4e(ShortRaccourci4e):
    nom_voix = "4e-pythagore-cote-short"

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("La largeur cachée", font_size=44, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.3))
        q = self.grand("Combien mesure la largeur ?", font_size=26, color=BLEU_CALCUL).move_to(P(0, 1.9))
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
        y1, y2, y3 = -0.75, -1.35, -1.95
        self.au_mot("diagonale 50")
        diag = Line(SO, NE, color=COUL_HYP, stroke_width=7)
        self.play(Create(diag), FadeIn(self.t("50 m", 26, COUL_HYP).move_to((SO + NE) / 2 + UL * 0.3)))
        self.au_mot("longueur 40")
        self.play(Create(Line(SO, SE, color=COTE, stroke_width=6)),
                  FadeIn(self.t("40 m", 24, COTE).next_to(Line(SO, SE), DOWN, buff=0.08)))
        larg = Line(SE, NE, color=COTE, stroke_width=8)
        q_l = self.t("?", 30, COTE).next_to(larg, RIGHT, buff=0.08)
        self.play(Create(larg), FadeIn(q_l))
        self.au_mot("50 au carré moins")
        l1 = self.grand("50² − 40² = 900", font_size=34, color=COTE).move_to(P(0, y1))
        self.play(Write(l1), Indicate(larg, color=COTE))
        self.au_mot("Racine de 900")
        res = VGroup(self.radical(900, font_size=38, color=VERT_OK), self.t("= 30 m", 38, VERT_OK))
        res.arrange(RIGHT, buff=0.2).move_to(P(0, y2))
        self.play(Write(res), Transform(q_l, self.t("30 m", 24, VERT_OK).next_to(larg, RIGHT, buff=0.06)))
        self.play(Circumscribe(res, color=VERT_OK))
        self.play(FadeIn(self.grand("30 m < 50 m : c'est cohérent", font_size=26, color=VERT_OK).move_to(P(0, y3))))
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
        self.au_mot("diagonale 100")
        self.play(Create(Line(r.get_corner(DL), r.get_corner(UR), color=COUL_HYP, stroke_width=7)),
                  FadeIn(self.t("100 m", 26, COUL_HYP).move_to(r.get_center() + UL * 0.35)))
        self.au_mot("longueur 80")
        self.play(FadeIn(self.t("80 m", 26, COTE).next_to(r, DOWN, buff=0.08)))
        self.au_mot("Combien mesure sa largeur")
        self.play(FadeIn(self.t("?", 34, COTE).next_to(r, RIGHT, buff=0.08)))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.5))))
        self.attendre_voix(marge=1.5)
