# expression_substituer_short.py
# EleveAI — Maths 4e — short jumeau de l'expression littérale, épisode 3 :
# le piège du carré d'un négatif.
# CEINTURE BLANCHE : en HAUT un thermomètre qui descend à −3 (x = −3) ; en BAS le
# calcul qui s'écrit EN MÊME TEMPS : (−3)² = (−3) × (−3) = +9, et −3² = −9 barré.
# Quand le calcul met les parenthèses, l'étiquette du thermomètre les prend aussi.
# Parenthèses ORANGE, valeur de x JAUNE, juste VERT, faux ROUGE (comme la paysage).
# Voix : manim/voix/4e-expression-substituer-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/expression_substituer_short.py ShortSubstituer4e -o eleveai-maths-4e-expression-substituer-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/03-substituer/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_reconnaitre import P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import ceinture, echelle_ceintures  # noqa: E402

MOINS = "−"  # U+2212
PAREN = ORANGE_RETENUE
COUL_X = JAUNE_TITRE
MERCURE_CHAUD = "#EF4444"
MERCURE_FROID = BLEU_CALCUL

# Le thermomètre : de −5 à +5 °C, 0,14 unité par degré.
TX = -1.45
Y0 = 1.12  # le zéro
PAS_DEG = 0.14


def y_temp(d):
    return Y0 + d * PAS_DEG


class ShortSubstituer4e(Short6e):
    nom_voix = "4e-expression-substituer-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def neg(self, n, font_size, color=COUL_X):
        m = self.t(f"({MOINS}{n})", font_size, color)
        m[0].set_color(PAREN)
        m[-1].set_color(PAREN)
        return m

    def gonfler(self, mob, f=1.5, duree=0.4):
        self.play(mob.animate.scale(f), run_time=duree)
        self.play(mob.animate.scale(1 / f), run_time=duree)

    def thermometre(self, temp):
        bas, haut = y_temp(-5) - 0.12, y_temp(5) + 0.1
        tube = RoundedRectangle(width=0.26, height=haut - bas, corner_radius=0.13, stroke_color=WHITE,
                                stroke_width=3, fill_color="#1F2937", fill_opacity=1).move_to(P(TX, (bas + haut) / 2))
        bulbe = Circle(radius=0.22, stroke_color=WHITE, stroke_width=3, fill_color=MERCURE_CHAUD,
                       fill_opacity=1).move_to(P(TX, bas - 0.12))
        graduations = VGroup(*[Line(P(TX + 0.13, y_temp(d)), P(TX + (0.3 if d % 5 == 0 else 0.22), y_temp(d)),
                                    stroke_width=2, color=GREY_B) for d in range(-5, 6)])

        def colonne():
            d = temp.get_value()
            c = MERCURE_FROID if d < 0 else MERCURE_CHAUD
            top = y_temp(d)
            return Rectangle(width=0.12, height=max(0.02, top - (bas - 0.1)), stroke_width=0,
                             fill_color=c, fill_opacity=1).move_to(P(TX, (top + bas - 0.1) / 2))

        def boule():
            c = MERCURE_FROID if temp.get_value() < 0 else MERCURE_CHAUD
            return Circle(radius=0.15, stroke_width=0, fill_color=c, fill_opacity=1).move_to(bulbe)

        bulbe.set_fill("#1F2937")
        mercure = always_redraw(colonne)
        b2 = always_redraw(boule)
        zero = self.t("0 °C", 20, GREY_B).next_to(P(TX + 0.3, Y0), RIGHT, buff=0.08)
        return VGroup(tube, bulbe, graduations, zero), VGroup(mercure, b2)

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Le piège du carré", font_size=44, color=JAUNE_TITRE).move_to(P(0, 2.85))
        # Frédéric, 13/10 : l'échelle entière, pour situer la ceinture parmi les 7.
        # Frédéric, 14/10 : « tout ne doit pas être en ceinture blanche, les faibles auront du mal » → orange.
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        q = self.t(f"({MOINS}3)²  :  9  ou  {MOINS}9 ?", 30, BLEU_CALCUL).move_to(P(0, 1.85))
        q[0].set_color(PAREN)
        q[3].set_color(PAREN)
        self.play(FadeIn(titre), FadeIn(badge), FadeIn(q[0:6]), run_time=0.8)
        self.au_mot("9, ou")
        self.play(FadeIn(q[6], scale=1.4), run_time=0.4)
        self.au_mot("ou moins 9")
        self.play(FadeIn(q[7:], scale=1.4), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        temp = ValueTracker(4)
        cadre, mercure = self.thermometre(temp)
        self.play(FadeOut(q), FadeIn(cadre), FadeIn(mercure), run_time=0.6)
        y1, y2, y3, y4 = -0.5, -1.08, -1.66, -2.32
        # le thermomètre descend à −3, x = −3 s'écrit à côté
        trait = Line(P(TX - 0.14, y_temp(-3)), P(TX + 0.34, y_temp(-3)), color=COUL_X, stroke_width=3)
        lbl = self.t(f"{MOINS}3 °C", 20, COUL_X).next_to(trait, RIGHT, buff=0.08)
        vx = self.t(f"x = {MOINS}3", 40, COUL_X).move_to(P(0.7, 1.5))
        self.play(temp.animate.set_value(-3), Write(vx), run_time=1.8)
        self.play(FadeIn(lbl), Create(trait), run_time=0.4)

        self.au_mot("x au carré, c'est")
        l1 = VGroup(self.t("x²", 38, COUL_X), self.t("=", 38), self.neg(3, 38), self.t("²", 38))
        l1[0][1].set_color(WHITE)
        l1.arrange(RIGHT, buff=0.16)
        l1[3].next_to(l1[2], RIGHT, buff=0.04).align_to(l1[2], UP)
        l1.move_to(P(0, y1))
        self.play(FadeIn(l1[0:2]))
        self.au_mot("parenthèse, moins 3")
        # les parenthèses arrivent EN MÊME TEMPS sous le thermomètre et dans le calcul
        p_g = self.t("(", 40, PAREN).next_to(vx[2:], LEFT, buff=0.04)
        p_d = self.t(")", 40, PAREN).next_to(vx[2:], RIGHT, buff=0.04)
        vx_par = VGroup(vx, p_g, p_d)
        self.play(vx[2:].animate.shift(RIGHT * 0.12), run_time=0.2)
        p_g.next_to(vx[2:], LEFT, buff=0.04)
        p_d.next_to(vx[2:], RIGHT, buff=0.04)
        self.play(GrowFromCenter(p_g), GrowFromCenter(p_d), TransformFromCopy(vx[2:], l1[2][1:3]),
                  GrowFromCenter(l1[2][0]), GrowFromCenter(l1[2][3]))
        self.au_mot("au carré.")
        self.play(FadeIn(l1[3], scale=1.5))
        self.gonfler(VGroup(l1[2][0], l1[2][3], p_g, p_d))

        self.au_mot("Moins 3 fois moins 3")
        l2 = VGroup(self.t("=", 36), self.neg(3, 36), self.t("×", 36), self.neg(3, 36)).arrange(RIGHT, buff=0.14)
        l2.move_to(P(0, y2))
        self.play(FadeIn(l2[0]), TransformFromCopy(l1[2], l2[1]), Indicate(vx_par, color=COUL_X))
        self.play(FadeIn(l2[2]), TransformFromCopy(l1[2], l2[3]))
        self.au_mot("plus 9")
        l3 = self.grand("= +9", font_size=38, color=VERT_OK).move_to(P(0, y3))
        self.play(TransformFromCopy(l2, l3))
        self.play(Circumscribe(l3, color=VERT_OK), run_time=0.8)

        self.au_mot("Sans parenthèses")
        self.play(FadeOut(VGroup(p_g, p_d), scale=1.6), vx[2:].animate.shift(LEFT * 0.12), run_time=0.5)
        f1 = self.t(f"{MOINS}3²", 38, ROUGE_ERREUR)
        f2 = self.t(f"= {MOINS}9", 38, ROUGE_ERREUR)
        faux = VGroup(f1, f2).arrange(RIGHT, buff=0.18)
        mot_faux = self.t("faux", 30, ROUGE_ERREUR)
        VGroup(faux, mot_faux).arrange(RIGHT, buff=0.3).move_to(P(0, y4))
        self.play(FadeIn(f1))
        self.au_mot("que le 3")
        self.play(Indicate(f1[1:], color=ROUGE_ERREUR, scale_factor=1.6))
        self.au_mot("moins 9")
        self.play(FadeIn(f2))
        self.au_mot("C'est faux")
        # barre presque horizontale : une diagonale toucherait le « = +9 » au-dessus
        barre = Line(faux.get_left() + LEFT * 0.08 + DOWN * 0.08, faux.get_right() + RIGHT * 0.08 + UP * 0.08,
                     color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), FadeIn(mot_faux))
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("Pour x égale moins 2")
        v = self.t(f"x = {MOINS}2", 50, COUL_X).move_to(P(0, 1.55))
        self.play(FadeIn(v, shift=DOWN * 0.2))
        self.au_mot("combien vaut")
        e = self.t("x² + x = ?", 56).move_to(P(0, 0.5))
        e[0].set_color(COUL_X)
        e[3].set_color(COUL_X)
        e[5].set_color(BLEU_CALCUL)
        self.play(Write(e))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("Réponds", font_size=46, color=VERT_OK),
                     self.grand("en commentaire !", font_size=40, color=VERT_OK),
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.16)
        self.play(FadeIn(rep.move_to(P(0, -1.2)), scale=1.1))
        self.attendre_voix(marge=1.5)
