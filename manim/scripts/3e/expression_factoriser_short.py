# expression_factoriser_short.py
# EleveAI — Maths 3e — short jumeau de l'expression littérale, épisode 5 : factoriser.
# CEINTURE BLANCHE : en HAUT la tablette de chocolat (3 rangées : x carrés au
# lait + 4 carrés noirs), les rangées s'entourent une par une ; en BAS
# « 3x + 12 = 3 × (x + 4) » qui s'écrit EN MÊME TEMPS.
# Couleurs de la paysage : facteur commun VERT, lettre JAUNE.
# Voix : manim/voix/3e-expression-factoriser-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/expression_factoriser_short.py ShortFactoriser3e -o eleveai-maths-3e-expression-factoriser-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/05-factoriser/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_factoriser import COUL_FACTEUR, FOND_ETIQ, NOIR_BORD, P, ex, rang, tablette  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


class ShortFactoriser3e(Short6e):
    nom_voix = "3e-expression-factoriser-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Factoriser", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.1))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        q = ex("3x + 12", 56).move_to(P(0, 0.9))
        q2 = self.t("en rangées ?", 40, BLEU_CALCUL).move_to(P(0, -0.1))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("3 x plus 12")
        self.play(Write(q))
        self.au_mot("le ranger en rangées")
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(q2.animate.scale(1.4), run_time=0.4)
        self.play(q2.animate.scale(1 / 1.4), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        self.play(FadeOut(q), FadeOut(q2), run_time=0.4)
        T = "3x + 12 = 3 × (x + 4)"
        rangees = tablette(barre=1.6, c=0.47, h=0.55, ecart=0.1).move_to(P(0.2, 0.82))
        nums = VGroup(*[self.t(str(k + 1), 30, COUL_FACTEUR).next_to(r, LEFT, buff=0.12)
                        for k, r in enumerate(rangees)])
        self.au_mot("La tablette")
        self.play(LaggedStart(*[FadeIn(r, shift=RIGHT * 0.2) for r in rangees], lag_ratio=0.3), run_time=1.0)
        self.au_mot("3 rangées")
        self.play(LaggedStart(*[FadeIn(n, scale=0.5) for n in nums], lag_ratio=0.3), run_time=0.8)

        self.au_mot("x carrés au lait")
        xs = VGroup()
        for r in rangees:
            lbl = self.t("x", 26, JAUNE_TITRE)
            fond = RoundedRectangle(width=lbl.width + 0.2, height=lbl.height + 0.14, corner_radius=0.06,
                                    fill_color=FOND_ETIQ, fill_opacity=1, stroke_width=0)
            xs.add(VGroup(fond, lbl.move_to(fond)).move_to(r[0]))
        self.play(LaggedStart(*[FadeIn(x, scale=0.6) for x in xs], lag_ratio=0.2), run_time=0.7)
        self.au_mot("4 carrés noirs")
        quatre = self.t("4", 24).next_to(rangees[0][1], UP, buff=0.14)
        self.play(FadeIn(quatre), Indicate(rangees[0][1], color=NOIR_BORD, scale_factor=1.1), run_time=0.7)

        # en bas, les maths
        res = ex(T, 34, verts=[("3", 1)])
        haut = res[rang(T, "3x + 12")].copy()
        bas = res[rang(T, "= 3 × (x + 4)")].copy()
        haut.scale(1.3).move_to(P(0, -0.6))
        bas.scale(1.3)
        if bas.width > config.frame_width - 0.6:
            bas.scale_to_fit_width(config.frame_width - 0.6)
        bas.move_to(P(0, -1.4))
        self.au_mot("3 x plus 12 égale")
        self.play(Write(haut[0:2]), *[Indicate(r[0], color=WHITE, scale_factor=1.06) for r in rangees],
                  run_time=0.8)
        self.play(Write(haut[2:]), *[Indicate(r[1], color=NOIR_BORD, scale_factor=1.06) for r in rangees],
                  run_time=0.8)
        self.au_mot("égale 3 fois")
        cadres = [SurroundingRectangle(r, color=COUL_FACTEUR, buff=0.04, stroke_width=4) for r in rangees]
        # chaque rangée s'entoure pendant que la ligne du bas s'écrit
        self.play(Create(cadres[0]), Indicate(nums[0], color=COUL_FACTEUR), Write(bas[0]), run_time=0.5)
        self.play(Create(cadres[1]), Indicate(nums[1], color=COUL_FACTEUR), Write(bas[1]), run_time=0.5)
        self.play(Create(cadres[2]), Indicate(nums[2], color=COUL_FACTEUR), Write(bas[2]), run_time=0.5)
        self.au_mot("parenthèse, x plus 4")
        self.play(Write(bas[3:]), *[Indicate(c, color=COUL_FACTEUR, scale_factor=1.04) for c in cadres],
                  run_time=1.0)
        self.play(bas[1:].animate.scale(1.35), run_time=0.4)
        self.play(bas[1:].animate.scale(1 / 1.35), run_time=0.4)
        boite = SurroundingRectangle(bas[1:], color=VERT_OK, buff=0.1)
        self.play(Create(boite), run_time=0.4)

        self.au_mot("Factoriser, c'est")
        phrase = VGroup(self.t("Factoriser, c'est", 30, VERT_OK),
                        self.t("retrouver les rangées", 30, VERT_OK)).arrange(DOWN, buff=0.12)
        if phrase.width > config.frame_width - 0.5:
            phrase.scale_to_fit_width(config.frame_width - 0.5)
        phrase.move_to(P(0, -2.25))
        self.play(FadeIn(phrase, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("Factorise")
        self.play(FadeIn(self.t("Factorise :", 34, BLEU_CALCUL).move_to(P(0, 1.65))))
        self.au_mot("5 x plus 35")
        a = ex("5x + 35", 54).move_to(P(0, 0.7))
        self.play(Write(a))
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.14)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        rep = VGroup(appel,
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.0)), scale=0.8))
        self.attendre_voix(marge=1.5)
