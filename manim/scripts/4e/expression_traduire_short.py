# expression_traduire_short.py
# EleveAI — Maths 4e — short jumeau de l'expression littérale, épisode 2 :
# traduire une phrase (micro litteral_expression_traduire).
# CEINTURE BLANCHE : en HAUT le jardin créole vu du ciel, dont la clôture se
# trace ; en BAS l'expression qui se remplit EN MÊME TEMPS. Première moitié du
# tour → (a + b) ; seconde moitié → « 2 × » : le double de la somme.
# Puis la clôture de 2a + b (deux longueurs, UNE largeur) : elle ne ferme pas.
# Couleurs de la paysage : coefficient VERT, lettre JAUNE, somme BLEUE.
# Voix : manim/voix/4e-expression-traduire-short.json (débit −7), validée.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/expression_traduire_short.py ShortTraduire4e -o eleveai-maths-4e-expression-traduire-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/02-traduire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_traduire import (BOIS, COUL_COEF, COUL_CONST, COUL_PLUS, COUL_X,  # noqa: E402
                                 ExpressionTraduire4e, P)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import ceinture, echelle_ceintures  # noqa: E402

# Le jardin : 2,8 sur 1,4 (a > b).
SO, SE, NE, NO = P(-1.4, 0.2), P(1.4, 0.2), P(1.4, 1.6), P(-1.4, 1.6)


class ShortTraduire4e(Short6e):
    nom_voix = "4e-expression-traduire-short"

    t = ExpressionTraduire4e.t
    ligne = ExpressionTraduire4e.ligne
    boite = ExpressionTraduire4e.boite
    jardin = ExpressionTraduire4e.jardin

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Le double de la somme", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.0))
        # Frédéric, 13/10 : l'échelle entière, pour situer la blanche parmi les 7.
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.5))
        q = self.grand("ou la somme du double ?", font_size=28, color=BLEU_CALCUL).move_to(P(0, 2.0))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("ou la somme")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        jardin = self.jardin(SO, NE)
        self.play(FadeOut(q), FadeIn(jardin), run_time=0.8)
        y1, y_neq, y2, y3 = -0.6, -1.3, -1.95, -2.5
        self.au_mot("longueur a")
        la = self.t("a", 36, COUL_X).next_to(Line(SO, SE), DOWN, buff=0.1)
        self.play(FadeIn(la))
        self.au_mot("largeur b")
        lb = self.t("b", 36, COUL_X).next_to(Line(SE, NE), RIGHT, buff=0.1)
        self.play(FadeIn(lb))

        # le tour : la 1re moitié écrit (a + b), la 2de moitié écrit « 2 × »
        e1 = self.ligne([("2", COUL_COEF), ("×", WHITE), ("(", WHITE), ("a", COUL_X, "colle"), ("+", WHITE),
                         ("b", COUL_X), (")", WHITE, "colle")], 34).move_to(P(0, y1))
        poteau = Dot(SO, radius=0.09, color=BOIS)
        self.au_mot("Le tour")
        self.add(poteau)
        cote = [Line(a, b, color=BOIS, stroke_width=7) for a, b in [(SO, SE), (SE, NE), (NE, NO), (NO, SO)]]
        self.play(Create(cote[0]), poteau.animate.move_to(SE), FadeIn(VGroup(e1[2], e1[3]), shift=UP * 0.1),
                  run_time=0.6, rate_func=linear)
        self.play(Create(cote[1]), poteau.animate.move_to(NE), FadeIn(VGroup(e1[4], e1[5], e1[6]), shift=UP * 0.1),
                  run_time=0.5, rate_func=linear)
        self.au_mot("le double")
        la2 = self.t("a", 30, COUL_X).next_to(Line(NE, NO), UP, buff=0.06)
        lb2 = self.t("b", 30, COUL_X).next_to(Line(NO, SO), LEFT, buff=0.08)
        self.play(Create(cote[2]), poteau.animate.move_to(NO), FadeIn(la2), run_time=0.6, rate_func=linear)
        self.play(Create(cote[3]), poteau.animate.move_to(SO), FadeIn(lb2),
                  FadeIn(VGroup(e1[0], e1[1]), shift=RIGHT * 0.1), run_time=0.5, rate_func=linear)
        self.au_mot("2 fois, parenthèse")
        self.play(e1.animate.scale(1.5), run_time=0.45)
        self.play(e1.animate.scale(1 / 1.5), run_time=0.45)
        self.au_mot("La parenthèse d'abord")
        b_int = self.boite(VGroup(e1[2], e1[3], e1[4], e1[5], e1[6]), COUL_PLUS, 0.08)
        moitie = VGroup(cote[0], cote[1]).copy().set_stroke(COUL_PLUS, 10)
        self.play(Create(b_int), Create(moitie), run_time=0.8)
        self.play(FadeOut(moitie), run_time=0.4)

        # la somme du double : 2a + b, deux longueurs et UNE largeur
        self.au_mot("Mais la somme du double")
        cloture = VGroup(*cote)
        self.play(cloture.animate.set_stroke(opacity=0.25), FadeOut(la2), FadeOut(lb2), FadeOut(poteau))
        e2 = self.ligne([("2", COUL_COEF), ("a", COUL_X, "colle"), ("+", WHITE), ("b", COUL_X)], 40)
        e2.move_to(P(0, y2))
        rouge = [Line(a, b, color=ROUGE_ERREUR, stroke_width=7) for a, b in [(SO, SE), (NO, NE), (SE, NE)]]
        self.au_mot("c'est 2 a plus b")
        self.play(Create(rouge[0]), Create(rouge[1]), FadeIn(VGroup(e2[0], e2[1]), shift=UP * 0.1), run_time=0.6)
        self.play(Create(rouge[2]), FadeIn(VGroup(e2[2], e2[3]), shift=UP * 0.1), run_time=0.5)
        trou = self.t("?", 44, ROUGE_ERREUR).next_to(Line(NO, SO), LEFT, buff=0.1)
        self.play(FadeIn(trou, scale=1.6))
        self.au_mot("Pas la même clôture")
        neq = self.t("≠", 50, ROUGE_ERREUR).rotate(PI / 2).move_to(P(0, y_neq))
        self.play(GrowFromCenter(neq))
        self.play(Write(self.grand("Pas la même clôture !", font_size=30, color=ROUGE_ERREUR).move_to(P(0, y3))))
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.7))))
        self.au_mot("Traduis")
        self.play(FadeIn(self.grand("Traduis :", font_size=34, color=BLEU_CALCUL).move_to(P(0, 1.85))))
        self.au_mot("le triple de la somme")
        l1 = self.ligne([("le triple", COUL_COEF), ("de la somme", COUL_PLUS)], 36).move_to(P(0, 1.1))
        l2 = self.ligne([("de", WHITE), ("x", COUL_X), ("et", WHITE), ("4", COUL_CONST)], 36).move_to(P(0, 0.5))
        for l in (l1, l2):
            if l.width > 3.9:
                l.scale_to_fit_width(3.9)
        self.play(FadeIn(l1, shift=UP * 0.1))
        self.play(FadeIn(l2, shift=UP * 0.1))
        c = DashedVMobject(RoundedRectangle(width=2.6, height=0.85, corner_radius=0.12,
                                            stroke_color=BLEU_CALCUL, stroke_width=3), num_dashes=28)
        c.move_to(P(0, -0.3))
        self.play(FadeIn(c), FadeIn(self.t("?", 44, BLEU_CALCUL).move_to(c)))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("Réponds", font_size=40, color=VERT_OK),
                     self.grand("en commentaire !", font_size=40, color=VERT_OK),
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.9))))
        self.attendre_voix(marge=1.5)
