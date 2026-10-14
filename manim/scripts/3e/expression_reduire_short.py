# expression_reduire_short.py
# EleveAI — Maths 3e — short jumeau de l'expression littérale, épisode 3 : réduire,
# le moins devant une parenthèse.
# CEINTURE BLANCHE : en HAUT la parenthèse-boîte, un « − » devant ; quand elle
# s'ouvre, la pastille de signe de chaque terme BASCULE ; en BAS
# « 5x − (2x − 3) = 5x − 2x + 3 = 3x + 3 » qui s'écrit EN MÊME TEMPS ;
# « 3x − 3 » barré.
# Couleurs de la paysage : coefficient VERT, constante ORANGE, lettre JAUNE,
# pastilles « + » bleue et « − » rose, faux ROUGE.
# Voix : manim/voix/3e-expression-reduire-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/expression_reduire_short.py ShortReduire3e -o eleveai-maths-3e-expression-reduire-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/03-reduire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_reduire import (FAM_NB, FAM_X, FOND_CARTE, SIGNE_MOINS, OutilsSignes, P,  # noqa: E402
                                colorier, pastille)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


class ShortReduire3e(OutilsSignes, Short6e):
    nom_voix = "3e-expression-reduire-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def e(self, texte, font_size=40):
        return colorier(texte, font_size)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def carte(self, texte, fam, font_size=34):
        e = self.e(texte, font_size)
        fond = RoundedRectangle(width=max(e.width + 0.3, 0.75), height=e.height + 0.3, corner_radius=0.1,
                                fill_color=FOND_CARTE, fill_opacity=1, stroke_color=fam, stroke_width=3)
        return VGroup(fond, e.move_to(fond))

    def suite(self, haut, texte, font_size=40, buff=0.3):
        l = VGroup(self.t("=", font_size), self.e(texte, font_size)).arrange(RIGHT, buff=0.18)
        l.next_to(haut, DOWN, buff=buff)
        ref = haut[1] if isinstance(haut[0], Text) and haut[0].text == "=" else haut
        l.shift(RIGHT * (ref.get_left()[0] - l[1].get_left()[0]))
        return l

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Le piège du moins", font_size=46, color=JAUNE_TITRE).move_to(P(0, 2.95))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        # l'image du haut : un « − » devant une parenthèse-boîte
        yh = 0.95
        moins = self.t("−", 80, SIGNE_MOINS).move_to(P(-0.95, yh))
        g = Arc(radius=0.95, start_angle=PI * 0.72, angle=PI * 0.56, stroke_width=7, color=WHITE)
        d = Arc(radius=0.95, start_angle=-PI * 0.28, angle=PI * 0.56, stroke_width=7, color=WHITE)
        g.move_to(P(-0.5, yh))
        d.move_to(P(1.95, yh))
        fond = Rectangle(width=2.3, height=1.5, stroke_width=0, fill_color=WHITE, fill_opacity=0.06).move_to(P(0.72, yh))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Un moins devant une parenthèse")
        self.play(FadeIn(moins), Create(g), Create(d), FadeIn(fond), run_time=0.9)
        self.au_mot("le piège")
        self.play(moins.animate.scale(1.5), run_time=0.4)
        self.play(moins.animate.scale(1 / 1.5), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        y1 = -0.35
        c5 = self.carte("5x", FAM_X).move_to(P(-1.75, yh))
        c2 = self.carte("2x", FAM_X).move_to(P(0.2, yh - 0.2))
        c3 = self.carte("3", FAM_NB).move_to(P(1.3, yh - 0.2))
        p2 = pastille("+", r=0.2, font_size=28).next_to(c2, UP, buff=0.12)
        p3 = pastille("−", r=0.2, font_size=28).next_to(c3, UP, buff=0.12)
        L1 = self.e("5x − (2x − 3)", 36).move_to(P(0.25, y1))
        L1[2].set_color(SIGNE_MOINS)

        self.au_mot("5 x moins, parenthèse")
        self.play(FadeIn(c5, shift=DOWN * 0.2), Write(L1[0:4]), run_time=0.9)
        self.au_mot("2 x moins 3.")
        self.play(FadeIn(c2, shift=DOWN * 0.2), GrowFromCenter(p2), Write(L1[4:6]), run_time=0.7)
        self.play(FadeIn(c3, shift=DOWN * 0.2), GrowFromCenter(p3), Write(L1[6:9]), run_time=0.7)

        self.au_mot("Le moins change tous les signes")
        # la boîte s'ouvre : les deux parenthèses s'écartent et s'effacent
        self.play(moins.animate.scale(1.3), run_time=0.3)
        self.play(moins.animate.scale(1 / 1.3), g.animate.shift(LEFT * 0.3).set_opacity(0.0),
                  d.animate.shift(RIGHT * 0.3).set_opacity(0.0), fond.animate.set_opacity(0.0),
                  L1[3].animate.set_opacity(0.35), L1[8].animate.set_opacity(0.35), run_time=0.7)

        self.au_mot(": 5 x moins 2 x plus 3")
        L2 = self.suite(L1, "5x − 2x + 3", 36, buff=0.32)
        L2[1][2].set_color(SIGNE_MOINS)
        L2[1][5].set_color(BLEU_CALCUL)
        self.play(Write(L2[0]), Write(L2[1][0:2]), run_time=0.5)
        p2 = self.basculer(p2, run_time=0.6)
        self.play(Write(L2[1][2:5]), run_time=0.5)
        p3 = self.basculer(p3, run_time=0.6)
        self.play(Write(L2[1][5:7]), run_time=0.5)

        self.au_mot("Le résultat : 3 x plus 3")
        L3 = self.suite(L2, "3x + 3", 40, buff=0.32)
        c3x = self.carte("3x", FAM_X).move_to(P(-0.6, yh - 0.2))
        self.play(ReplacementTransform(VGroup(c5, c2, p2, moins), c3x),
                  VGroup(c3, p3).animate.shift(LEFT * 0.4), Write(L3), run_time=1.0)
        self.play(L3[1].animate.scale(1.5), run_time=0.4)
        self.play(L3[1].animate.scale(1 / 1.5), run_time=0.4)
        cadre = SurroundingRectangle(L3[1], color=VERT_OK, buff=0.1)
        self.play(Create(cadre), run_time=0.4)

        self.au_mot("Pas 3 x moins 3")
        faux = self.t("3x − 3", 38, ROUGE_ERREUR).next_to(L3, DOWN, buff=0.4).set_x(0)
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux)), run_time=0.4)
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("Réduis")
        self.play(FadeIn(self.t("Réduis :", 34, BLEU_CALCUL).move_to(P(0, 1.75))))
        self.au_mot("7 moins, parenthèse, x moins 4")
        a = VGroup(self.e("7 − (x − 4)", 50), self.t("= ?", 50, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        a[0][1].set_color(SIGNE_MOINS)
        if a.width > config.frame_width - 0.5:
            a.scale_to_fit_width(config.frame_width - 0.5)
        self.play(Write(a.move_to(P(0, 0.8))))
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.14)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        rep = VGroup(appel,
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.0)), scale=0.8))
        self.attendre_voix(marge=1.5)
