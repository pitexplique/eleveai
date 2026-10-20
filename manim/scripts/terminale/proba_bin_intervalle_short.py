# proba_bin_intervalle_short.py
# EleveAI — Maths Tle spé (micro binomiale_intervalle) — short jumeau de
# « Loi binomiale : la probabilité d'un intervalle ». CEINTURE ORANGE.
# Il AMUSE : entre 4 et 8 élèves sur 20, on fait P(X ≤ 8) − P(X ≤ 4) ?
# Raté ! On a enlevé X = 4. Il faut enlever P(X ≤ 3).
#   · en HAUT les bâtons du coach (stat_graph de la banque) pour 20 élèves :
#     l'intervalle s'allume, ce qu'on enlève rougit, le bâton 4 tombe puis
#     revient ;
#   · en BAS, EN MÊME TEMPS : P(X ≤ 8) − P(X ≤ 4) ?, barré, puis − P(X ≤ 3) ;
#   · fin : « entre 5 et 10 », tu enlèves quoi ? « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : la carte n'affiche pas 0,3 (la voix du short ne le dit pas).
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/terminale-proba-bin-intervalle-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_bin_intervalle_short.py ShortProbaBinIntervalleTerminale -o eleveai-maths-terminale-proba-bin-intervalle-short --media_dir manim/scripts/terminale/media-bin_intervalle-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_intervalle import (  # noqa: E402  (pose les chemins)
    ACTIF, BATON, CUMUL, CUMUL_T, ENLEVE, ENLEVE_T, N, CarteBatons, P, le, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.2
LARG_CALC = 3.9   # les lignes de calcul (le zoom d'insistance tient dans le cadre)


class ShortProbaBinIntervalleTerminale(Short6e):
    nom_voix = "terminale-proba-bin-intervalle-short"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def caser(self, g, y):
        if g.width > LARG_CALC:
            g.scale_to_fit_width(LARG_CALC)
        return g.move_to(P(0, y))

    def insister(self, mob, k=1.4, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : entre 4 et 8 : P(X ≤ 8) − P(X ≤ 4) ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        titre = self.t("Entre 4 et 8 élèves", 40, JAUNE_TITRE).move_to(P(0, 3.25))
        c = CarteBatons(larg=4.4, haut=2.3, titre="20 élèves", fs_eti=15, fs_titre=22, sw=5, kmax=12).move_to(P(0, 0.55))
        self.play(FadeIn(badge, shift=DOWN * 0.2), Write(titre), FadeIn(c.socle()), run_time=0.6)
        bd = c.bande(4, 8)
        self.play(c.pousser(run_time=1.0), run_time=1.0)
        self.play(FadeIn(bd), *c.colorer(range(4, 9), ACTIF),
                  *[Indicate(c.eti[k], color=ACTIF, scale_factor=2.2) for k in (4, 8)], run_time=0.6)
        fs = 50
        l1 = self.caser(le("X", "8", fs, CUMUL_T), -1.2)
        l2 = self.caser(suite(self.t("−", fs), le("X", "4", fs, ENLEVE_T), self.t("?", fs, ORANGE_RETENUE),
                              buff=0.15), -2.0)
        self.au_mot("P de X inférieur ou égal à 8")
        self.play(FadeIn(l1, scale=1.6), *c.colorer(range(4), CUMUL), run_time=0.5)
        self.au_mot("moins P de X")
        self.play(FadeIn(l2[:2], scale=1.6), *c.colorer(range(5), ENLEVE, 0.35), run_time=0.5)
        self.play(FadeIn(l2[2], scale=2.0), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : raté ! on a enlevé X = 4 ; il faut enlever P(X ≤ 3) ──
        self.dire("01-image")
        self.au_mot("Raté")
        rate = self.t("Raté !", 56, ROUGE_ERREUR).move_to(P(0, 3.2))
        self.play(ReplacementTransform(titre, rate), FadeOut(l2[2]), run_time=0.4)
        self.play(Wiggle(rate), run_time=0.5)
        self.au_mot("X égale 4")
        anneau = Circle(radius=0.17, color=ROUGE_ERREUR, stroke_width=5).move_to(c.eti[4])
        x4 = self.t("Tu enlèves X = 4", 38, ROUGE_ERREUR).move_to(P(0, -2.65))
        croix = Line(l2[:2].get_left() + LEFT * 0.05, l2[:2].get_right() + RIGHT * 0.05, color=ROUGE_ERREUR,
                     stroke_width=7)
        self.play(Create(anneau), Wiggle(c.bat[4]), Create(croix), FadeIn(x4, scale=1.5), run_time=0.7)
        self.au_mot("dans l'intervalle")
        self.play(c.bat[4].animate.set_color(ACTIF).set_opacity(1), Indicate(bd, color=ACTIF, scale_factor=1.04),
                  run_time=0.6)
        self.au_mot("Il faut enlever")
        bon = self.caser(suite(self.t("−", fs), le("X", "3", fs, VERT_OK), self.coche(VERT_OK, 0.3), buff=0.15), -2.0)
        ok = bon[2]
        bon = VGroup(bon[0], bon[1])
        self.play(FadeOut(VGroup(l2[:2], croix)), FadeOut(anneau), FadeOut(x4), run_time=0.4)
        self.au_mot("P de X inférieur ou égal à 3")
        self.play(FadeIn(bon, scale=1.6), *c.colorer(range(4), ENLEVE, 0.35), run_time=0.5)
        self.play(Create(ok), Flash(c.bat[4], color=ACTIF), run_time=0.5)
        self.insister(bon, 1.08)
        self.attendre_voix(marge=0.1)

        # ── 02 : et toi : entre 5 et 10 ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 56, JAUNE_TITRE).move_to(P(0, 3.2))
        bd2 = c.bande(5, 10)
        self.play(ReplacementTransform(rate, et), FadeOut(VGroup(l1, bon, ok, bd)),
                  *c.colorer(range(13), BATON), run_time=0.5)
        self.au_mot("entre 5 et 10")
        q1 = self.caser(self.t("entre 5 et 10", 46, ACTIF), -0.95)
        self.play(FadeIn(q1, shift=UP * 0.15), FadeIn(bd2), *c.colorer(range(5, 11), ACTIF),
                  *[Indicate(c.eti[k], color=ACTIF, scale_factor=2.2) for k in (5, 10)], run_time=0.6)
        self.au_mot("tu enlèves quoi")
        q2 = self.caser(self.t("tu enlèves quoi ?", 42, ORANGE_RETENUE), -1.55)
        self.play(FadeIn(q2, scale=1.3), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 42, VERT_OK, 3.8), self.t("commentaire !", 42, VERT_OK, 3.8))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.36))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
