# proba_conc_inegalite_short.py
# EleveAI — Maths Tle spé (micro concentration_inegalite_concentration) —
# short jumeau de « L'inégalité de concentration ». Ceinture ORANGE.
# Il AMUSE : 125 comprimés pour la moyenne à 2 mg près ; pour 1 mg près,
# 250 ? Non : 500, quatre fois plus (δ est au carré : 25/n ≤ 0,05 → n ≥ 500).
#   · en HAUT la grille de comprimés qui grandit : 125, puis 250 (?), puis 500 ;
#   · en BAS, EN MÊME TEMPS : 125, 2 mg, 1 mg, 250 ?, 500, × 4, δ² ;
#   · fin : 10 fois plus précis ? « Réponds en commentaire ! », puis la
#     phrase de fin.
#
# Voix : manim/voix/terminale-proba-conc-inegalite-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conc_inegalite_short.py ShortProbaConcInegaliteTerminale -o eleveai-maths-terminale-proba-conc-inegalite-short --media_dir manim/scripts/terminale/media-conc_inegalite-1s-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_bienayme import delta2  # noqa: E402
from proba_conc_inegalite import comprime  # noqa: E402
from proba_conc_moyenne import BLEU_NB, CHEMIN, P, suite  # noqa: E402
from proba_conc_moyenne_short import ShortProbaConcMoyenneBase  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

assert 25 / (4 * 0.05) == 125 and 25 / 0.05 == 500

COLS = 25
PAS = 3.7 / COLS
HAUT = 1.85          # le haut de la grille (sous l'échelle des ceintures)


def rangees(r0, r1, opacite=1.0):
    """Les comprimés des rangées r0 … r1 − 1 (25 par rangée)."""
    g = VGroup()
    for r in range(r0, r1):
        for k in range(COLS):
            c = comprime(PAS / 0.42).move_to(P(-1.85 + PAS * (k + 0.5), HAUT - PAS * (r + 0.5)))
            g.add(c.set_opacity(opacite))
    return g


class ShortProbaConcInegaliteBase(ShortProbaConcMoyenneBase):
    fichier_marques = "proba_conc_inegalite_short_marques.json"
    nom_voix = "terminale-proba-conc-inegalite-short"

    def construct(self):
        self.margo_bas()

        # ── 00 : 125 comprimés, à 2 mg près ; à 1 mg près, 250 ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        titre = self.t("Contrôle qualité", 52, JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(badge, titre)
        self.au_mot("125 comprimés")
        g1 = rangees(0, 5)
        l1 = self.cap(suite(self.t("125", 64, BLEU_NB), self.t("comprimés", 40), buff=0.2)).move_to(P(0, -1.55))
        self.play(LaggedStart(*[FadeIn(c, scale=1.6) for c in g1], lag_ratio=0.006), FadeIn(l1, scale=1.3),
                  run_time=0.9)
        self.au_mot("2 milligrammes près")
        l2 = self.cap(suite(self.t("à", 42), self.t("2 mg", 60, CHEMIN), self.t("près", 42), buff=0.2)).move_to(P(0, -2.35))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("1 milligramme près")
        l2b = self.cap(suite(self.t("à", 42), self.t("1 mg", 60, CHEMIN), self.t("près", 42), buff=0.2)).move_to(P(0, -2.35))
        self.play(ReplacementTransform(l2, l2b), run_time=0.4)
        self.insister(l2b[1], 1.3)
        self.au_mot("il en faut 250")
        g2 = rangees(5, 10, opacite=0.35)
        l1b = self.cap(suite(self.t("250", 64, BLEU_NB), self.t("?", 64, ORANGE_RETENUE), buff=0.2)).move_to(P(0, -1.55))
        pari = self.t("Tu paries ?", 58, JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(FadeIn(g2, shift=DOWN * 0.2), ReplacementTransform(l1, l1b), ReplacementTransform(titre, pari),
                  run_time=0.6)
        self.play(Wiggle(pari), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : non : 500, quatre fois plus ; δ est au carré ──
        self.dire("01-image")
        self.au_mot("Non")
        non = self.t("Non !", 64, ROUGE_ERREUR).move_to(P(0, 3.3))
        self.play(ReplacementTransform(pari, non), l1b.animate.set_color(ROUGE_ERREUR), run_time=0.4)
        self.au_mot("500")
        g3 = rangees(10, 20)
        l1c = self.cap(suite(self.t("500", 70, VERT_OK), self.t("comprimés", 40), buff=0.2)).move_to(P(0, -1.55))
        self.play(g2.animate.set_opacity(1), LaggedStart(*[FadeIn(c, scale=1.6) for c in g3], lag_ratio=0.002),
                  ReplacementTransform(l1b, l1c), run_time=1.0)
        self.au_mot("quatre fois plus")
        blocs = VGroup(*[Rectangle(width=3.7, height=PAS * 5, stroke_color=ORANGE_RETENUE, stroke_width=3)
                         .move_to(P(0, HAUT - PAS * (5 * i + 2.5))) for i in range(4)])
        x4 = self.t("× 4 !", 60, ORANGE_RETENUE).move_to(P(0, -2.35))
        self.play(LaggedStart(*[Create(b) for b in blocs], lag_ratio=0.25), FadeOut(l2b), FadeIn(x4, scale=1.5),
                  run_time=0.9)
        self.au_mot("delta est au carré")
        d2 = delta2(96, ORANGE_RETENUE).move_to(P(0, 0.45))
        fond = BackgroundRectangle(d2, color=BLACK, fill_opacity=0.85, buff=0.2)
        self.play(FadeIn(fond), FadeIn(d2, scale=2.0), run_time=0.5)
        self.insister(d2, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : 10 fois plus précis ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 58, JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(ReplacementTransform(non, et), FadeOut(VGroup(g1, g2, g3, blocs, fond, d2, l1c, x4)), run_time=0.5)
        self.au_mot("10 fois plus précis")
        dix = VGroup(self.t("10 fois", 72, CHEMIN), self.t("plus précis", 46, CHEMIN)).arrange(DOWN, buff=0.1)
        dix.move_to(P(0, 1.0))
        un = comprime(2.2).move_to(P(0, -0.35))
        self.play(FadeIn(dix, scale=1.4), FadeIn(un, scale=1.5), run_time=0.5)
        self.au_mot("combien de fois plus")
        q = self.cap(suite(self.t("×", 60, ORANGE_RETENUE), self.t("?", 72, ORANGE_RETENUE), self.t("comprimés", 40),
                  buff=0.2)).move_to(P(0, -1.35))
        self.play(FadeIn(q, scale=1.3), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK))
        appel.arrange(DOWN, buff=0.04).move_to(P(0, -2.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin ──
        self.fin_short("03-abonne", [badge, et, dix, un, q, appel])


class ShortProbaConcInegaliteTerminale(ShortProbaConcInegaliteBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
