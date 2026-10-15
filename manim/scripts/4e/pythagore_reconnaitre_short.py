# pythagore_reconnaitre_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 1 : l'hypoténuse.
# CEINTURE BLANCHE (règle du short blanc, manim/REGLES.md) : en HAUT l'échelle
# contre la case, en BAS le triangle qui se trace EN MÊME TEMPS ; angle droit
# BLEU, échelle et hypoténuse ORANGE, comme dans la paysage (TBM5bum-xj4).
# Voix validée le 12/10 : manim/voix/4e-pythagore-reconnaitre-short.json.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_reconnaitre_short.py ShortHypotenuse4e -o eleveai-maths-4e-pythagore-reconnaitre-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/01-hypotenuse/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Short6e
from gabarit_trigo import COUL_HYP
from signes_expression_2de import ceinture

COUL_DROIT = BLEU_CALCUL


def P(x, y):
    return np.array([x, y, 0.0])


def carre_droit(sommet, s=0.22):
    return Polygon(sommet, sommet + RIGHT * s, sommet + RIGHT * s + UP * s, sommet + UP * s,
                   color=COUL_DROIT, stroke_width=4, fill_color=COUL_DROIT, fill_opacity=0.4)


class ShortHypotenuse4e(Short6e):
    nom_voix = "4e-pythagore-reconnaitre-short"

    def construct(self):
        self.margo_bas()

        # ── 00 : le titre, la ceinture, la question ──
        self.dire("00-accroche")
        titre = self.grand("L'hypoténuse", font_size=44, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.3))
        q = self.grand("Quel côté est le plus long ?", font_size=28, color=BLEU_CALCUL).move_to(P(0, 1.9))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Quel côté")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 : l'image en haut, le triangle en bas, ensemble ──
        self.dire("01-image")
        # En haut : la case et l'échelle. A au pied du mur, C en haut, B au pied de l'échelle.
        A, C, B = P(-0.9, 0.1), P(-0.9, 1.5), P(1.05, 0.1)
        sol = Line(P(-2.2, 0.1), P(2.2, 0.1), color=GRAY_B, stroke_width=4)
        mur = Rectangle(width=1.2, height=1.5, stroke_color=WHITE, stroke_width=2,
                        fill_color="#14B8A6", fill_opacity=0.35).move_to(P(-1.5, 0.85))
        toit = Rectangle(width=1.45, height=0.14, stroke_width=0, fill_color="#DC2626",
                         fill_opacity=0.8).move_to(P(-1.5, 1.67))
        porte = Rectangle(width=0.32, height=0.6, stroke_color=WHITE, stroke_width=1.5,
                          fill_color="#7C2D12", fill_opacity=0.6).move_to(P(-1.7, 0.4))
        case = VGroup(mur, toit, porte)
        d = (C - B) / np.linalg.norm(C - B)
        n = np.array([-d[1], d[0], 0]) * 0.07
        L = np.linalg.norm(C - B)
        echelle = VGroup(Line(B + n, C + n), Line(B - n, C - n),
                         *[Line(B + d * k + n, B + d * k - n) for k in np.arange(0.2, L - 0.05, 0.22)])
        echelle.set_stroke(COUL_HYP, 3)

        # En bas : le même triangle, agrandi.
        k, o = 1.0, P(-1.0, -2.0)
        a, c, b = o, o + (C - A) * k, o + (B - A) * k
        self.play(Create(sol), FadeIn(case), run_time=0.8)
        self.au_mot("Une échelle")
        trait = Line(b, c, color=WHITE, stroke_width=4)
        self.play(Create(echelle), Create(trait), run_time=1.2)

        self.au_mot("Le mur et le sol")
        coin_h = VGroup(Line(A, C), Line(A, B)).set_stroke(COUL_DROIT, 6)
        coin_b = VGroup(Line(a, c), Line(a, b)).set_stroke(COUL_DROIT, 6)
        self.play(Create(coin_h), Create(coin_b))
        ch, cb = carre_droit(A, 0.18), carre_droit(a, 0.24)
        self.au_mot("angle droit")
        self.play(GrowFromCenter(ch), GrowFromCenter(cb))
        lab_droit = self.grand("angle droit", font_size=26, color=COUL_DROIT).move_to(P(0, -0.22))
        self.play(FadeIn(lab_droit), Indicate(ch, color=COUL_DROIT), Indicate(cb, color=COUL_DROIT))

        self.au_mot("L'échelle est en face")
        hyp_h = Line(B, C, color=COUL_HYP, stroke_width=8)
        hyp_b = Line(b, c, color=COUL_HYP, stroke_width=9)
        self.play(Create(hyp_h), Create(hyp_b))
        self.au_mot("Son nom")
        nom = self.grand("l'hypoténuse", font_size=30, color=COUL_HYP).move_to(P(0, -0.22))
        self.play(ReplacementTransform(lab_droit, nom))

        self.au_mot("C'est toujours")
        # Les trois côtés du bas se couchent côte à côte : l'orange dépasse.
        x0 = -1.9
        cibles = [(coin_b[0], P(x0, -0.75)), (coin_b[1], P(x0, -1.2)), (hyp_b, P(x0, -1.65))]
        anims = []
        for seg, gauche in cibles:
            lg = seg.get_length()
            anims.append(Transform(seg, Line(gauche, gauche + RIGHT * lg, color=seg.get_color(),
                                             stroke_width=seg.get_stroke_width())))
        self.remove(trait)
        self.play(FadeOut(cb), *anims, run_time=1.2)
        self.play(FadeIn(self.grand("le plus long !", font_size=30, color=COUL_HYP).move_to(P(0.3, -2.08))))
        self.attendre_voix(marge=0.4)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        a2 = P(-1.2, 0.0)
        c2, b2 = a2 + UP * 1.5, a2 + RIGHT * 2.0
        tri = Polygon(a2, b2, c2, color=WHITE, stroke_width=4)
        self.au_mot("Les deux côtés")
        self.play(Create(tri), GrowFromCenter(carre_droit(a2, 0.22)))
        self.au_mot("6 centimètres")
        self.play(FadeIn(self.grand("6 cm", font_size=28, color=COUL_DROIT).next_to(Line(a2, c2), LEFT, buff=0.15)))
        self.au_mot("8 centimètres")
        self.play(FadeIn(self.grand("8 cm", font_size=28, color=COUL_DROIT).next_to(Line(a2, b2), DOWN, buff=0.15)))
        self.au_mot("L'hypoténuse peut-elle")
        self.play(Create(Line(b2, c2, color=COUL_HYP, stroke_width=8)),
                  FadeIn(self.grand("7 cm ?", font_size=34, color=COUL_HYP).move_to((b2 + c2) / 2 + UR * 0.45)))
        self.play(FadeIn(self.grand("Est-ce possible ?", font_size=34).move_to(P(0, -0.9))))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.85))))
        self.attendre_voix(marge=1.5)
