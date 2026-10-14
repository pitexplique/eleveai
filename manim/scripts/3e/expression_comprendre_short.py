# expression_comprendre_short.py
# EleveAI — Maths 3e — short jumeau de l'expression littérale, épisode 1 :
# la somme de trois nombres qui se suivent est un multiple de 3.
# CEINTURE BLANCHE : en HAUT trois colonnes de billes (4, 5, 6 : la partie « n »
# JAUNE, les billes en plus ORANGE) ; en BAS n + (n + 1) + (n + 2) = 3n + 3
# = 3 × (n + 1) qui s'écrit EN MÊME TEMPS. La bille orange de la 3e colonne
# passe sur la 1re : trois colonnes égales, 3 × le nombre du milieu.
# Couleurs de la paysage : coefficient VERT, terme constant ORANGE, lettre JAUNE.
# L'échelle complète des ceintures (blanche grandie) sous le titre.
# Voix : manim/voix/3e-expression-comprendre-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/expression_comprendre_short.py ShortComprendre3e -o eleveai-maths-3e-expression-comprendre-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/01-comprendre/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_comprendre import COUL_CONST, COUL_LETTRE, P, colorier  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

R_BILLE = 0.13
PAS = 0.3
Y_BASE = -0.1
XS = [-1.35, 0.0, 1.35]


class ShortComprendre3e(Short6e):
    nom_voix = "3e-expression-comprendre-short"

    def t(self, texte, font_size=34, color=WHITE):
        m = Text(texte, font_size=font_size, color=color)
        if m.width > config.frame_width - 0.4:
            m.scale_to_fit_width(config.frame_width - 0.4)
        return m

    def e(self, texte, font_size=34):
        m = colorier(texte, font_size)
        if m.width > config.frame_width - 0.4:
            m.scale_to_fit_width(config.frame_width - 0.4)
        return m

    def bille(self, color):
        return Circle(radius=R_BILLE, fill_color=color, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)

    def place(self, x, k):
        return P(x, Y_BASE + R_BILLE + k * PAS)

    def colonne(self, x, en_plus):
        g = VGroup(*[self.bille(COUL_LETTRE).move_to(self.place(x, k)) for k in range(4)])
        for k in range(en_plus):
            g.add(self.bille(COUL_CONST).move_to(self.place(x, 4 + k)))
        return g

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Trois nombres qui se suivent", font_size=40, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("4 plus 5")
        q1 = self.t("4 + 5 + 6 = 15", 40).move_to(P(0, 1.2))
        self.play(Write(q1))
        self.au_mot("un multiple de 3")
        q2 = self.t("un multiple de 3", 38, VERT_OK).move_to(P(0, 0.45))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.au_mot("Toujours")
        q3 = self.t("Toujours ?", 54, BLEU_CALCUL).move_to(P(0, -0.5))
        self.play(FadeIn(q3, scale=1.3))
        self.play(q3.animate.scale(1.5), run_time=0.4)
        self.play(q3.animate.scale(1 / 1.5), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(q1, q2, q3)), run_time=0.4)
        cols = [self.colonne(x, k) for x, k in zip(XS, (0, 1, 2))]
        noms = ["n", "n + 1", "n + 2"]
        lbls = VGroup(*[self.e(nm, 24).move_to(P(x, -0.42)) for nm, x in zip(noms, XS)])
        L1 = self.e("n + (n + 1) + (n + 2)", 32).move_to(P(0, -0.9))
        morceaux = [L1[0:1], L1[1:7], L1[7:]]
        for mot, c, l, m in zip([": n,", "n plus 1,", "n plus 2"], cols, lbls, morceaux):
            self.au_mot(mot)
            self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in c], lag_ratio=0.12),
                      FadeIn(l), Write(m), run_time=0.9)

        self.au_mot("Leur somme")
        L2 = self.e("= 3n + 3 = 3 × (n + 1)", 30).move_to(P(0, -1.4))
        self.play(Write(L2[0]))
        self.au_mot("3 n plus 3")
        self.play(Write(L2[1:3]), *[Indicate(c[:4], color=COUL_LETTRE, scale_factor=1.1) for c in cols])
        self.play(Write(L2[3:5]), *[Indicate(c[4:], color=COUL_CONST, scale_factor=1.3) for c in cols[1:]])

        self.au_mot("c'est 3 fois")
        b = cols[2][-1]
        self.play(b.animate.move_to(self.place(XS[0], 4)), run_time=1.0)
        cols[2].remove(b)
        cols[0].add(b)
        nouv = VGroup(*[self.e("n + 1", 24).move_to(l) for l in lbls])
        self.play(Write(L2[5:]), ReplacementTransform(lbls, nouv), run_time=1.2)
        self.play(L2[6:].animate.scale(1.3), run_time=0.4)
        self.play(L2[6:].animate.scale(1 / 1.3), run_time=0.4)

        self.au_mot("Toujours un multiple de 3")
        f1 = self.t("Toujours un multiple de 3 :", 26, VERT_OK).move_to(P(0, -1.85))
        self.play(FadeIn(f1, shift=UP * 0.15))
        self.au_mot("3 fois le nombre du milieu")
        f2 = self.t("3 × le nombre du milieu", 30, VERT_OK).move_to(P(0, -2.25))
        cadre = SurroundingRectangle(VGroup(cols[1], nouv[1]), color=BLEU_CALCUL, buff=0.08)
        self.play(FadeIn(f2, shift=UP * 0.15), Create(cadre))
        self.attendre_voix(marge=1.0)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("La somme de 5")
        a = VGroup(self.t("La somme de", 34), self.t("5 nombres qui se suivent", 34, BLEU_CALCUL))
        a.arrange(DOWN, buff=0.15).move_to(P(0, 1.55))
        self.play(FadeIn(a, shift=DOWN * 0.2))
        self.au_mot("toujours un multiple de 5")
        b = VGroup(self.t("est-elle toujours", 34), self.t("un multiple de 5 ?", 40, VERT_OK))
        b.arrange(DOWN, buff=0.15).move_to(P(0, 0.4))
        self.play(FadeIn(b, shift=DOWN * 0.2))
        self.play(b[1].animate.scale(1.3), run_time=0.4)
        self.play(b[1].animate.scale(1 / 1.3), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.14)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.3)), scale=0.8))
        self.attendre_voix(marge=1.5)
