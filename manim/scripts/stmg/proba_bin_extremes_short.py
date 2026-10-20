# proba_bin_extremes_short.py
# EleveAI — Maths STMG (micro vaT_bin_extremes) — short jumeau de « Loi
# binomiale : les cas extrêmes ». Il AMUSE : 5 panneaux solaires, 10 % de
# risque de panne chacun ; aucune panne de l'année ? 0,9⁵ ≈ 0,59 : plus d'une
# chance sur deux !
#   · en HAUT les 5 panneaux qui clignotent, s'allument, puis tombent en panne ;
#   · en BAS, EN MÊME TEMPS : 0,9⁵ ≈ 0,59 et la jauge qui passe la moitié ;
#   · fin : les 5 en panne, fréquent ou rarissime ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Ceinture JAUNE.
#
# Voix : manim/voix/stmg-proba-bin-extremes-short.json (débit −7).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_extremes_short.py ShortProbaBinExtremes -o eleveai-maths-stmg-proba-bin-extremes-short --media_dir manim/scripts/stmg/media-bin_extremes-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_extremes import BLEU_NB, P, Panneau, puissance, soleil, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.2
ROUGE_S = "#F87171"


class ShortProbaBinExtremes(Short6e):
    nom_voix = "stmg-proba-bin-extremes-short"
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : 5 panneaux, 10 % ; aucune panne : tes chances ? ──
        self.dire("00-accroche")
        titre = VGroup(self.t("5 panneaux", 46, JAUNE_TITRE), self.t("solaires", 46, JAUNE_TITRE))
        titre.arrange(DOWN, buff=0.06).move_to(P(0, 3.25))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.2))
        xs = [-1.56 + 0.78 * i for i in range(5)]
        rang = VGroup(*[Panneau(0.46).poser("off").move_to(P(x, 0.75)) for x in xs])
        sol = soleil(0.6).move_to(P(1.7, 1.55))
        self.play(FadeIn(badge, shift=DOWN * 0.2), Write(titre), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.6) for p in rang], lag_ratio=0.15), FadeIn(sol, scale=0.4),
                  run_time=0.8)
        self.play(*[a for p in rang for a in p.vers("on")], Rotate(sol[1], PI / 4), run_time=0.4)
        self.au_mot("10 %")
        dix = VGroup(self.t("10 %", 56, JAUNE_TITRE), self.t("de risque chacun", 30, ROUGE_S))
        dix.arrange(DOWN, buff=0.1).move_to(P(0, -0.8))
        self.play(FadeIn(dix[0], scale=2.0), run_time=0.4)
        self.play(FadeIn(dix[1], shift=UP * 0.1), run_time=0.3)
        for i in (1, 3, 0, 4, 2):        # le clignotement : la panne rôde
            self.play(*rang[i].vers("panne"), run_time=0.13)
            self.play(*rang[i].vers("on"), run_time=0.13)
        self.au_mot("Aucune panne")
        q = VGroup(self.t("Aucune panne", 44, VERT_OK), self.t("cette année ?", 44, VERT_OK))
        q.arrange(DOWN, buff=0.06).move_to(P(0, 3.25))
        self.play(FadeOut(titre, shift=UP * 0.3), FadeOut(dix), run_time=0.25)
        self.play(FadeIn(q, shift=UP * 0.3), run_time=0.3)
        self.play(*[Flash(p, color=BLEU_CALCUL, line_length=0.15, flash_radius=0.45) for p in rang], run_time=0.5)
        self.au_mot("tes chances")
        chances = self.t("Tes chances ?", 50, ORANGE_RETENUE).move_to(P(0, -1.2))
        self.play(FadeIn(chances, scale=1.6), run_time=0.4)
        self.play(Wiggle(chances), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : 0,9⁵ ≈ 0,59 : plus d'une chance sur deux ──
        self.dire("01-image")
        self.au_mot("0,9 puissance 5")
        nb = VGroup(*[Text("0,9", font_size=28, color=BLEU_NB).next_to(p, DOWN, buff=0.1) for p in rang])
        pw = puissance("0,9", "5", 60, BLEU_NB)
        res = suite(self.t("≈", 56), self.t("0,59", 64, VERT_OK), buff=0.2)
        ligne = suite(pw, res, buff=0.25)
        if ligne.width > 3.7:
            ligne.scale_to_fit_width(3.7)
        ligne.move_to(P(0, -0.55))
        self.play(FadeOut(chances), LaggedStart(*[FadeIn(n, scale=1.8) for n in nb], lag_ratio=0.15),
                  run_time=0.8)
        self.play(FadeIn(pw[0], shift=DOWN * 0.3), Indicate(nb, color=JAUNE_TITRE, scale_factor=1.25), run_time=0.6)
        self.play(FadeIn(pw[1], scale=2.2), run_time=0.3)
        self.au_mot("environ 0,59")
        self.play(FadeIn(res[0]), FadeIn(res[1], scale=2.0), run_time=0.5)
        self.insister(res[1], 1.12)
        self.au_mot("Plus d'une chance sur deux")
        fond = RoundedRectangle(width=4.0, height=0.45, corner_radius=0.1, fill_color="#1E293B", fill_opacity=1,
                                stroke_color=GREY_B, stroke_width=2).move_to(P(0, -1.4))
        mil = DashedLine(P(0, -1.03), P(0, -1.77), color=WHITE, stroke_width=3)
        barre = Rectangle(width=4.0 * 0.59 - 0.08, height=0.37, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
        barre.move_to(fond.get_left() + RIGHT * (0.04 + barre.width / 2))
        phrase = VGroup(self.t("plus d'une chance", 34, VERT_OK), self.t("sur deux !", 34, VERT_OK))
        phrase.arrange(DOWN, buff=0.06).move_to(P(0, -2.15))
        self.play(FadeIn(VGroup(fond, mil)), run_time=0.3)
        self.play(GrowFromEdge(barre, LEFT), FadeIn(phrase, shift=UP * 0.15), run_time=0.9)
        self.play(Indicate(mil, color=JAUNE_TITRE), run_time=0.4)
        self.au_mot("aucune panne")
        self.play(*[Flash(p, color=VERT_OK, line_length=0.15, flash_radius=0.45) for p in rang], run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : les 5 en panne : fréquent ou rarissime ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(FadeOut(q, shift=UP * 0.3), FadeOut(VGroup(nb, pw, res, fond, mil, barre, phrase)), run_time=0.25)
        self.play(FadeIn(et, shift=UP * 0.3), run_time=0.3)
        self.au_mot("les 5 panneaux en panne")
        cinq = self.t("les 5 en panne", 40, ROUGE_S).move_to(P(0, -0.15))
        self.play(LaggedStart(*[AnimationGroup(*p.vers("panne")) for p in rang], lag_ratio=0.2),
                  FadeIn(cinq, shift=UP * 0.15), sol.animate.set_opacity(0.3), run_time=1.0)
        self.play(Wiggle(rang), run_time=0.5)
        self.au_mot("fréquent")
        fr = self.t("fréquent ?", 38, BLEU_CALCUL).move_to(P(0, -0.72))
        ra = self.t("ou rarissime ?", 38, ORANGE_RETENUE).move_to(P(0, -1.22))
        self.play(FadeIn(fr, scale=1.4), run_time=0.35)
        self.au_mot("rarissime")
        self.play(FadeIn(ra, scale=1.4), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
