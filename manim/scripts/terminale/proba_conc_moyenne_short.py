# proba_conc_moyenne_short.py
# EleveAI — Maths Tle spé (micro concentration_echantillon_moyenne) — short
# jumeau de « La moyenne d'un échantillon ». Ceinture ORANGE.
# Il AMUSE : une gousse de vanille, 15 g à 3 g près… et la moyenne de 9 ?
# Surprise : à 1 g près ! (la variance 9 est divisée par 9).
#   · en HAUT la carte `stat_graph` en nuage de points : 40 VRAIES gousses
#     tombent, étalées ; puis 40 VRAIES moyennes de 9, serrées ;
#   · en BAS, EN MÊME TEMPS : 15 g, écart-type 3 g, puis 1 g, puis 9 / 9 ;
#   · fin : avec 100 gousses ? « Réponds en commentaire ! », puis la phrase
#     de fin (« Entraîne-toi sur eleveai.fr. Et abonne-toi ! »).
# Ti-Margo en bas (margo_bas). Tirages : ceux de proba_conc_moyenne.py.
#
# Voix : manim/voix/terminale-proba-conc-moyenne-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conc_moyenne_short.py ShortProbaConcMoyenneTerminale -o eleveai-maths-terminale-proba-conc-moyenne-short --media_dir manim/scripts/terminale/media-conc_moyenne-1s-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_moyenne import (  # noqa: E402
    BATON, BLEU_NB, MOYENNES, MU, PROBA, SEULES, CarteNuage, MotsCales, P, frac, gousse, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaConcMoyenneBase(MotsCales, Short6e):
    fichier_marques = "proba_conc_moyenne_short_marques.json"
    nom_voix = "terminale-proba-conc-moyenne-short"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def cap(self, g, larg=LARGEUR_MAX):
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : une gousse : 15 g, à 3 g près. Et la moyenne de 9 ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        titre = self.t("Vanille", 58, JAUNE_TITRE).move_to(P(0, 3.3))
        c = CarteNuage(larg=4.2, haut=3.0, rangees=("", ""), r=0.045, marge_bas=0.55).move_to(P(0, 0.4))
        self.add(badge, titre, c)
        g1 = gousse(15, 1.6).move_to(P(0, -1.55))
        self.au_mot("15 grammes")
        quinze = self.t("15 g", 66, VERT_OK).move_to(P(0, -2.25))
        self.play(FadeIn(g1, scale=1.5), FadeIn(quinze, scale=1.6), run_time=0.5)
        p1 = c.nuage(SEULES, 0, color=BATON)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 1.0) for p in p1], lag_ratio=0.03), run_time=0.9)
        self.au_mot("écart-type de 3")
        f3 = c.fleche_ecart(MU, 3, c.y_axe(0), "", color=ROUGE_ERREUR)
        et3 = suite(self.t("écart-type", 40), self.t("3 g", 56, ROUGE_ERREUR), buff=0.25)
        self.cap(et3).move_to(P(0, -2.65))
        self.play(GrowFromCenter(f3), FadeOut(g1), quinze.animate.move_to(P(0, -1.75)), FadeIn(et3, shift=UP * 0.15),
                  run_time=0.6)
        self.au_mot("la moyenne de 9")
        neuf = VGroup(*[gousse(15, 0.5) for _ in range(9)]).arrange_in_grid(rows=3, cols=3, buff=0.1)
        neuf.move_to(P(0, -1.75))
        q = self.t("Et la moyenne de 9 ?", 44, ORANGE_RETENUE).move_to(P(0, 3.3))
        self.play(ReplacementTransform(titre, q), FadeOut(quinze),
                  LaggedStart(*[FadeIn(g, scale=1.5) for g in neuf], lag_ratio=0.05), run_time=0.7)
        self.play(Wiggle(q), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : surprise : 1 gramme ! ──
        self.dire("01-image")
        p2 = c.nuage(MOYENNES, 1, color=PROBA)
        self.play(FadeOut(neuf), LaggedStart(*[FadeIn(p, shift=DOWN * 1.0) for p in p2], lag_ratio=0.03),
                  run_time=1.2)
        self.au_mot("tombe à 1 gramme")
        f1 = c.fleche_ecart(MU, 1, c.y_axe(1) - 0.25, "", color=VERT_OK)
        et1 = suite(self.t("écart-type", 40), self.t("1 g !", 60, VERT_OK), buff=0.25)
        self.cap(et1).move_to(P(0, -2.62))
        self.play(GrowFromCenter(f1), FadeOut(et3, shift=UP * 0.3), FadeIn(et1, scale=1.4), run_time=0.5)
        self.insister(et1[1], 1.3)
        self.au_mot("La variance, 9")
        v = suite(self.t("variance", 40), frac("9", "9", 40, c_haut=BLEU_NB, c_bas=BLEU_NB), buff=0.3)
        self.cap(v).move_to(P(0, -1.72))
        self.play(FadeIn(v[0], shift=UP * 0.1), FadeIn(v[1][0], scale=1.5), run_time=0.4)
        self.au_mot("divisée par 9")
        self.play(Create(v[1][1]), FadeIn(v[1][2], scale=1.6), run_time=0.4)
        self.au_mot("se concentre")
        self.play(Indicate(p2, color=VERT_OK, scale_factor=1.15), run_time=0.7)
        self.attendre_voix(marge=0.1)

        # ── 02 : et avec 100 gousses ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 58, JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(ReplacementTransform(q, et), FadeOut(VGroup(c, p1, p2, f3, f1, v, et1)), run_time=0.5)
        self.au_mot("100 gousses")
        cent = VGroup(*[gousse(15, 0.3) for _ in range(100)]).arrange_in_grid(rows=10, cols=10, buff=(0.06, 0.1))
        self.cap(cent, 3.6).move_to(P(0, 0.85))
        n100 = self.t("100 gousses", 48, BLEU_NB).move_to(P(0, -0.65))
        self.play(LaggedStart(*[FadeIn(g, scale=1.4) for g in cent], lag_ratio=0.005),
                  FadeIn(n100, shift=UP * 0.15), run_time=0.9)
        self.au_mot("quelle est la variance")
        qv = VGroup(self.t("variance de", 44, ORANGE_RETENUE), self.t("la moyenne ?", 44, ORANGE_RETENUE))
        qv.arrange(DOWN, buff=0.06).move_to(P(0, -1.6))
        self.play(FadeIn(qv, scale=1.2), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 50, VERT_OK), self.t("commentaire !", 50, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin ──
        self.fin_short("03-abonne", [badge, et, cent, n100, qv, appel])

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)


class ShortProbaConcMoyenneTerminale(ShortProbaConcMoyenneBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
