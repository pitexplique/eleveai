# expression_comprendre_short.py
# EleveAI — Maths 4e — short jumeau de l'expression littérale, épisode 1 : les termes.
# CEINTURE BLANCHE : en HAUT les stylos (2 € pièce) et le colis (3 € d'envoi) ;
# en BAS « prix = 2x + 3 » qui s'écrit EN MÊME TEMPS. Les mêmes cadres VERT et
# ORANGE entourent le dessin et le terme ; puis 7a − 2, le signe part avec son cadre.
# Voix : manim/voix/4e-expression-comprendre-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/expression_comprendre_short.py ShortComprendre4e -o eleveai-maths-4e-expression-comprendre-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/01-comprendre/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_comprendre import (COUL_COEF, COUL_CONST, DessinsExpression, P)  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import ceinture, echelle_ceintures  # noqa: E402


class ShortComprendre4e(DessinsExpression, Short6e):
    nom_voix = "4e-expression-comprendre-short"

    def borne(self, m, largeur=4.0):
        """⛔ Le cadre vertical ne fait que 4,5 : tout ce qui est plus large rétrécit."""
        if m.width > largeur:
            m.scale_to_fit_width(largeur)
        return m

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Combien de termes ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 2.85))
        # Frédéric, 13/10 : l'échelle entière, pour situer la ceinture parmi les 7.
        # Frédéric, 14/10 : « tout ne doit pas être en ceinture blanche, les faibles auront du mal » → jaune.
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("dans 7 a moins 2")
        q = VGroup(self.t("dans", 30, BLEU_CALCUL), self.expr("7a − 2", 40),
                   self.t("?", 30, BLEU_CALCUL)).arrange(RIGHT, buff=0.6).move_to(P(0, 1.75))
        self.play(FadeIn(q))
        self.insister(q[1], 1.25)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        self.play(FadeOut(q), run_time=0.4)
        st = self.stylos(4, 0.8).move_to(P(-1.08, 1.1))
        c = self.colis(0.62).move_to(P(1.08, 1.05))
        prix = self.borne(self.expr("prix = 2x + 3", 44), 3.8).move_to(P(0, -0.75))
        prix[3].set_color(WHITE)
        self.au_mot("Les stylos")
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.3) for s in st], lag_ratio=0.2), FadeIn(prix[0:5]))
        self.au_mot("2 euros pièce")
        e1 = self.etiquette("2 € pièce", COUL_COEF, 18).next_to(st, DOWN, buff=0.3)
        self.play(GrowFromCenter(e1), Write(prix[5:7]))
        self.au_mot("plus 3 euros")
        e2 = self.etiquette("3 € d'envoi", COUL_CONST, 18).next_to(c, DOWN, buff=0.3)
        e2.set_y(e1.get_y())
        self.play(FadeIn(c, shift=LEFT * 0.4), Write(prix[7:]))
        self.play(GrowFromCenter(e2))
        self.au_mot("Le prix")
        self.play(Circumscribe(prix, color=BLEU_CALCUL))
        self.au_mot("Deux termes")
        haut1 = self.cadre(VGroup(st, e1), COUL_COEF, 0.07)
        haut2 = self.cadre(VGroup(c, e2), COUL_CONST, 0.07)
        bas1 = self.cadre(prix[5:7], COUL_COEF, 0.1)
        bas2 = self.cadre(prix[8], COUL_CONST, 0.1)
        self.play(Create(haut1), Create(bas1))
        self.play(Create(haut2), Create(bas2))
        deux = self.grand("2 termes", font_size=32, color=BLEU_CALCUL).move_to(P(0, -1.35))
        self.play(FadeIn(deux))
        self.au_mot("de coefficient 2")
        co = self.lab("coefficient : 2", 22, COUL_COEF).move_to(P(-1.05, -1.9))
        self.play(FadeIn(co), Indicate(haut1, color=COUL_COEF))
        self.au_mot("le terme constant")
        k = self.lab("constant : 3", 22, COUL_CONST).move_to(P(1.15, -1.9))
        self.play(FadeIn(k), Indicate(haut2, color=COUL_CONST))

        self.au_mot("Avec un moins")
        self.play(FadeOut(VGroup(st, c, e1, e2, haut1, haut2, prix, bas1, bas2, deux, co, k)))
        self.au_mot("le signe reste collé")
        regle = self.grand("Le signe − reste collé !", font_size=28, color=BLEU_CALCUL).move_to(P(0, -1.75))
        self.play(FadeIn(regle))
        self.au_mot("dans 7 a moins 2")
        e = self.borne(self.expr("7a − 2", 80), 2.6).move_to(P(0, 0.9))
        self.play(Write(e))
        self.au_mot("les termes sont")
        t1 = VGroup(e[0:2], self.cadre(e[0:2], COUL_COEF, 0.12))
        t2 = VGroup(e[2:4], self.cadre(e[2:4], COUL_CONST, 0.12))
        self.play(Create(t1[1]), Create(t2[1]), e[2].animate.set_color(COUL_CONST))
        self.play(t1.animate.shift(LEFT * 0.25), t2.animate.shift(RIGHT * 0.25))
        self.insister(e[2], 1.8)
        self.au_mot("7 a et moins 2")
        ter = self.borne(self.expr("termes : 7a et −2", 34)).move_to(P(0, -0.9))
        ter[-2:].set_color(COUL_CONST)
        self.play(Write(ter))
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("Dans 5 moins 4 y")
        self.play(Write(self.borne(self.expr("5 − 4y", 96), 3.4).move_to(P(0, 1.2))))
        self.au_mot("quel est le coefficient")
        self.play(FadeIn(self.borne(self.lab("Le coefficient de y ?", 34, COUL_COEF, lettre="y")).move_to(P(0, 0.05))))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("Réponds", font_size=40, color=VERT_OK),
                     self.grand("en commentaire !", font_size=40, color=VERT_OK),
                     self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.4))))
        self.attendre_voix(marge=1.5)
