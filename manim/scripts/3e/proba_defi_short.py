# proba_defi_short.py
# EleveAI — Maths 3e — short jumeau de Probabilités, épisode 8 : les défis.
# CEINTURE JAUNE. Il AMUSE : le pari « boîte A ou boîte B ? ».
#   · en HAUT, les deux boîtes de bonbons qui s'ouvrent (A : 7 blancs sur 13,
#     B : 3 blancs sur 4) ;
#   · en BAS, EN MÊME TEMPS, deux bandes de même longueur qui se remplissent à
#     7/13 et 3/4 : la B gagne avec moins de bonbons blancs ;
#   · fin : la boîte C (5 blancs sur 8) et la question, « Réponds en commentaire ! ».
# Dessins repris de la paysage (proba_defi.py). Ti-Margo en bas (margo_bas).
# Voix : manim/voix/3e-proba-defi-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_defi_short.py ShortProbaDefi3e -o eleveai-maths-3e-proba-defi-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/08-defis/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_defi import BONBON_BLANC, BONBON_ROSE, P, bande, boite, bonbon, remplir  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
X_BANDE, L_BANDE, H_BANDE = -0.2, 2.7, 0.42


class ShortProbaDefi3e(Short6e):
    nom_voix = "3e-proba-defi-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def fraction(self, num, den, font_size=32, color=WHITE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.07)

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ouvrir(self, bx):
        """Le couvercle saute, les bonbons apparaissent."""
        return AnimationGroup(
            bx[2].animate.shift(UP * 0.35 + RIGHT * 0.25).rotate(-0.3).set_opacity(0),
            LaggedStart(*[b.animate.set_opacity(1) for b in bx[1]], lag_ratio=0.08))

    def rangee(self, nom, y):
        """Une rangée du bas : la lettre de la boîte, la bande vide."""
        lettre = self.t(nom, 30, JAUNE_TITRE).move_to(P(-1.95, y))
        b = bande_s = bande(13 if nom == "A" else (4 if nom == "B" else 8), L_BANDE, H_BANDE)
        bande_s.move_to(P(X_BANDE, y))
        return lettre, b

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Boîte A ou boîte B ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.75))
        a = boite(7, 6, 5, 0.42).move_to(P(-0.95, 1.45))
        b = boite(3, 1, 2, 0.42).move_to(P(1.3, 1.45)).align_to(a, DOWN)
        for bx in (a, b):
            bx[1].set_opacity(0)
        la = self.t("A", 30, JAUNE_TITRE).next_to(a, DOWN, buff=0.12)
        lb = self.t("B", 30, JAUNE_TITRE).next_to(b, DOWN, buff=0.12)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.8)
        self.au_mot("Tu veux un bonbon blanc")
        veux = bonbon(BONBON_BLANC, 1.6).move_to(P(0, -0.35))
        self.play(FadeIn(a, shift=DOWN * 0.3), FadeIn(b, shift=DOWN * 0.3), FadeIn(la), FadeIn(lb),
                  GrowFromCenter(veux), run_time=0.7)
        self.play(Rotate(veux, 0.4), rate_func=there_and_back, run_time=0.4)
        self.au_mot("Boîte A ou boîte B")
        self.play(Wiggle(a), Wiggle(b), run_time=0.9)
        self.attendre_voix(marge=0.1)

        # ── 01 : on ouvre, les bandes se remplissent ──
        self.dire("01-image")
        self.play(FadeOut(veux, scale=0.5), run_time=0.3)
        lA, bA = self.rangee("A", -0.35)
        lB, bB = self.rangee("B", -1.3)
        fA = self.fraction(7, 13, 30, JAUNE_TITRE).move_to(P(1.7, -0.35))
        fB = self.fraction(3, 4, 30, JAUNE_TITRE).move_to(P(1.7, -1.3))
        cA = VGroup(self.t("7", 24, JAUNE_TITRE), self.t("blancs", 24)).arrange(RIGHT, buff=0.1)
        cB = VGroup(self.t("3", 24, JAUNE_TITRE), self.t("blancs", 24)).arrange(RIGHT, buff=0.1)
        cA.next_to(la, DOWN, buff=0.06)
        cB.next_to(lb, DOWN, buff=0.06)

        self.au_mot("7 blancs sur 13")
        self.play(FadeIn(lA), Create(bA), run_time=0.4)
        self.play(self.ouvrir(a), LaggedStart(*remplir(bA, 7), lag_ratio=0.08), FadeIn(fA, shift=LEFT * 0.2),
                  run_time=1.3)
        self.au_mot("3 blancs sur 4")
        self.play(FadeIn(lB), Create(bB), run_time=0.3)
        self.play(self.ouvrir(b), LaggedStart(*remplir(bB, 3), lag_ratio=0.2), FadeIn(fB, shift=LEFT * 0.2),
                  run_time=0.9)

        self.au_mot("La A a plus de blancs")
        self.play(FadeIn(cA), FadeIn(cB), Indicate(a[1][:7], color=WHITE), run_time=0.6)
        self.insister(cA[0], 1.6)
        self.au_mot("mais la B donne plus de chances")
        mil = DashedLine(P(X_BANDE, 0.05), P(X_BANDE, -1.7), color=BLEU_CALCUL, stroke_width=3)
        cadre = SurroundingRectangle(VGroup(bB, fB), color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(mil), Create(cadre), run_time=0.5)
        self.au_mot("3 sur 4 !")
        gagne = self.grand("B gagne !", font_size=44, color=VERT_OK).move_to(P(0, -2.2))
        self.play(FadeIn(gagne, scale=0.6), run_time=0.3)
        self.insister(fB, 1.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(titre.become(self.grand("Et la boîte C ?", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))), badge)
        c = boite(5, 3, 4, 0.42).move_to(P(-0.6, 1.75))
        c[1].set_opacity(0)
        lc = self.t("C", 30, JAUNE_TITRE).next_to(c, LEFT, buff=0.2)
        self.au_mot("Boîte C")
        self.play(FadeIn(c, shift=DOWN * 0.3), FadeIn(lc), run_time=0.4)
        lC, bC = self.rangee("C", 0.75)
        fC = self.fraction(5, 8, 30, JAUNE_TITRE).move_to(P(1.7, 0.75))
        self.au_mot("5 blancs sur 8")
        self.play(FadeIn(lC), Create(bC), run_time=0.3)
        self.play(self.ouvrir(c), LaggedStart(*remplir(bC, 5), lag_ratio=0.1), FadeIn(fC, shift=LEFT * 0.2),
                  run_time=1.0)
        self.au_mot("Mieux que la boîte A")
        lA2, bA2 = self.rangee("A", -0.15)
        for i, cc in enumerate(bA2):
            cc.set_fill(BONBON_BLANC if i < 7 else BONBON_ROSE, 0.9 if i < 7 else 0.35)
        fA2 = self.fraction(7, 13, 30, JAUNE_TITRE).move_to(P(1.7, -0.15))
        q = self.grand("C mieux que A ?", font_size=34, color=BLEU_CALCUL).move_to(P(0, -0.9))
        self.play(FadeIn(VGroup(lA2, bA2, fA2), shift=UP * 0.2), run_time=0.4)
        self.play(FadeIn(q, scale=0.7), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.85))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
