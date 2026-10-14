# expression_reduire_short.py
# EleveAI — Maths 4e — short jumeau de l'expression littérale, épisode 4 : réduire.
# CEINTURE BLANCHE : en HAUT le rectangle de 3x sur 2x qui se découpe en 6 carrés
# de x sur x ; en BAS « 3x × 2x = 3 × 2 × x × x = 6x² » qui s'écrit EN MÊME
# TEMPS ; puis 3x + 2x = 5x (les deux côtés mis bout à bout).
# Couleurs de la paysage : coefficient VERT, lettre JAUNE, faux ROUGE, carrés x² VIOLETS.
# Voix : manim/voix/4e-expression-reduire-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/expression_reduire_short.py ShortReduire4e -o eleveai-maths-4e-expression-reduire-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/04-reduire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_reduire import FAM_CARRE, P, colorier  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import ceinture, echelle_ceintures  # noqa: E402


class ShortReduire4e(Short6e):
    nom_voix = "4e-expression-reduire-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def e(self, texte, font_size=40):
        return colorier(texte, font_size)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Fois ou plus ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 2.85))
        # Frédéric, 13/10 : l'échelle entière, pour situer la ceinture parmi les 7.
        # Frédéric, 14/10 : « tout ne doit pas être en ceinture blanche, les faibles auront du mal » → jaune.
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        q = VGroup(self.e("3x × 2x", 38), self.t("= 6x ?", 38, BLEU_CALCUL)).arrange(RIGHT, buff=0.45)
        q.move_to(P(0, 1.2))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("3 x fois 2 x")
        self.play(Write(q[0]))
        self.au_mot("ça fait 6 x")
        self.play(FadeIn(q[1]))
        self.play(q[1][1:3].animate.scale(1.5), run_time=0.4)
        self.play(q[1][1:3].animate.scale(1 / 1.5), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        self.play(FadeOut(q), run_time=0.4)
        c = 0.66
        cases = VGroup(*[Square(side_length=c, stroke_width=0, fill_color=FAM_CARRE, fill_opacity=0.0)
                         for _ in range(6)]).arrange_in_grid(2, 3, buff=0).move_to(P(0.25, 0.95))
        bord = Rectangle(width=3 * c, height=2 * c, stroke_color=WHITE, stroke_width=4).move_to(cases)
        haut = Line(bord.get_corner(UL), bord.get_corner(UR), color=VERT_OK, stroke_width=6)
        gauche = Line(bord.get_corner(DL), bord.get_corner(UL), color=JAUNE_TITRE, stroke_width=6)
        l3 = self.e("3x", 32).next_to(haut, UP, buff=0.1)
        l2 = self.e("2x", 32).next_to(gauche, LEFT, buff=0.1)
        y1, y2, y3 = -0.35, -0.95, -1.55

        self.au_mot("Un rectangle de 3 x sur 2 x")
        L1 = self.e("3x × 2x", 40).move_to(P(0, y1))
        self.play(Create(bord), FadeIn(l3), FadeIn(l2), Write(L1), run_time=1.2)

        self.au_mot("Je le découpe")
        coupes = VGroup(
            Line(cases[0].get_corner(UR), cases[3].get_corner(DR)),
            Line(cases[1].get_corner(UR), cases[4].get_corner(DR)),
            Line(cases[0].get_corner(DL), cases[2].get_corner(DR)),
        ).set_stroke(WHITE, 2.5)
        self.play(Create(coupes), run_time=1.0)

        self.au_mot("3 fois 2, 6")
        L2 = self.t("= 3 × 2 × x × x", 34).move_to(P(0, y2))
        L2[1].set_color(VERT_OK)
        L2[3].set_color(VERT_OK)
        L2[5].set_color(JAUNE_TITRE)
        L2[7].set_color(JAUNE_TITRE)
        nums = VGroup(*[self.t(str(k + 1), 24, WHITE).move_to(q) for k, q in enumerate(cases)])
        self.play(Write(L2[:4]),
                  LaggedStart(*[AnimationGroup(q.animate.set_fill(FAM_CARRE, 0.4), FadeIn(n))
                                for q, n in zip(cases, nums)], lag_ratio=0.25), run_time=1.6)

        self.au_mot("de x sur x")
        q0 = cases[0]
        sx = self.t("x", 24, JAUNE_TITRE).next_to(q0, UP, buff=0.03)
        sy = self.t("x", 24, JAUNE_TITRE).next_to(q0, LEFT, buff=0.03)
        self.play(q0.animate.set_fill(FAM_CARRE, 0.9), FadeOut(l3), FadeOut(l2), FadeIn(sx), FadeIn(sy),
                  Write(L2[4:]))

        self.au_mot("Chaque carré a pour aire")
        x2s = VGroup(*[self.e("x²", 26).move_to(q) for q in cases])
        self.play(LaggedStart(*[ReplacementTransform(n, m) for n, m in zip(nums, x2s)], lag_ratio=0.15),
                  *[q.animate.set_fill(FAM_CARRE, 0.55) for q in cases[1:]], run_time=1.2)

        self.au_mot("L'aire : 6 x au carré")
        L3 = VGroup(self.t("=", 44), self.e("6x²", 48)).arrange(RIGHT, buff=0.18).move_to(P(-0.55, y3))
        self.play(Write(L3), FadeOut(sx), FadeOut(sy), FadeIn(l3), FadeIn(l2))
        self.play(L3[1].animate.scale(1.5), run_time=0.4)
        self.play(L3[1].animate.scale(1 / 1.5), run_time=0.4)
        cadre = SurroundingRectangle(L3[1], color=VERT_OK, buff=0.1)
        self.play(Create(cadre), run_time=0.4)

        self.au_mot("pas 6 x")
        faux = self.t("6x", 40, ROUGE_ERREUR).move_to(P(1.35, y3))
        self.play(FadeIn(faux))
        barre = self.barrer(faux)
        self.play(Create(barre), run_time=0.4)

        self.au_mot("Mais 3 x plus 2 x")
        # les deux côtés bout à bout : une longueur, 5x
        y_seg = 0.08
        seg3 = Line(P(-1.9, y_seg), P(-1.9 + 3 * c, y_seg), color=VERT_OK, stroke_width=6)
        seg2 = Line(seg3.get_end(), seg3.get_end() + RIGHT * 2 * c, color=JAUNE_TITRE, stroke_width=6)
        L4 = self.e("3x + 2x", 40)
        # on garde 6x² (barré : 6x) en haut du bas, et 3x + 2x vient dessous
        bloc3 = VGroup(L3, cadre, faux, barre)
        self.play(VGroup(bord, coupes, cases, x2s).animate.set_opacity(0.3),
                  FadeOut(l2), FadeOut(l3), FadeOut(L1), FadeOut(L2), run_time=0.5)
        self.play(bloc3.animate.shift(UP * (-0.6 - y3)), run_time=0.6)
        self.play(TransformFromCopy(haut, seg3), TransformFromCopy(gauche, seg2), run_time=1.0)
        L4.move_to(P(-0.4, -1.4))
        self.play(Write(L4))

        self.au_mot("c'est 5 x")
        R4 = VGroup(self.t("=", 40), self.e("5x", 44)).arrange(RIGHT, buff=0.16).next_to(L4, RIGHT, buff=0.18)
        lseg = self.e("5x", 30).next_to(VGroup(seg3, seg2), RIGHT, buff=0.1)
        self.play(Write(R4), FadeIn(lseg))

        self.au_mot("on additionne")
        self.play(Indicate(R4[1], color=VERT_OK, scale_factor=1.5))
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("Réduis")
        self.play(FadeIn(self.t("Réduis :", 34, BLEU_CALCUL).move_to(P(0, 1.75))))
        self.au_mot("4 x fois 3 x")
        a = VGroup(self.e("4x × 3x", 50), self.t("= ?", 50, BLEU_CALCUL)).arrange(RIGHT, buff=0.2).move_to(P(0, 1.0))
        self.play(Write(a))
        self.au_mot("Et 4 x plus 3 x")
        b = VGroup(self.e("4x + 3x", 50), self.t("= ?", 50, BLEU_CALCUL)).arrange(RIGHT, buff=0.2).move_to(P(0, 0.1))
        self.play(Write(b))
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.14)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        rep = VGroup(appel,
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.3)), scale=0.8))
        self.attendre_voix(marge=1.5)
