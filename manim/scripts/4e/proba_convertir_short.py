# proba_convertir_short.py
# EleveAI — Maths 4e — short jumeau des probabilités, épisode 6 : convertir.
# CEINTURE JAUNE. Il AMUSE : le pari « 1 chance sur 4, c'est 4 % ? ».
# En HAUT le gâteau coupé en 4 (1 part colorée) et la grille 10 × 10 où 25 cases
# se colorent ; en BAS, EN MÊME TEMPS, « 4 % ? » barré, 1 ÷ 4 = 0,25,
# 0,25 × 100 = 25, puis 1/4 = 25 %. Fin : 1 chance sur 5, la question en commentaire.
# Voix : manim/voix/4e-proba-convertir-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_convertir_short.py ProbaConvertir4eShort -o eleveai-maths-4e-proba-convertir-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/06-convertir/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_convertir import COUL_DEC, COUL_FRAC, COUL_PC, P, colorier, grille100  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ProbaConvertir4eShort(Short6e):
    nom_voix = "4e-proba-convertir-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def fraction(self, num, den, font_size=34, color=WHITE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=4)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.08)

    def gateau(self, parts, prises, rayon, couleur=COUL_FRAC):
        g = VGroup()
        for i in range(parts):
            s = Sector(radius=rayon, start_angle=PI / 2 - (i + 1) * TAU / parts, angle=TAU / parts,
                       stroke_width=2.5, stroke_color=WHITE)
            s.set_fill(couleur if i < prises else BLACK, opacity=0.85 if i < prises else 0.12)
            g.add(s)
        return g

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : le pari ──
        self.dire("00-accroche")
        titre = self.grand("Un quart en %", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.2))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.45))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.5)
        gat = self.gateau(4, 1, 0.95).move_to(P(0, 0.95))
        self.add(gat)
        self.play(GrowFromCenter(gat), run_time=0.5)
        self.play(gat[0].animate.shift(P(0.18, 0.18)), run_time=0.25)
        self.play(gat[0].animate.shift(P(-0.18, -0.18)), run_time=0.25)
        f0 = self.fraction(1, 4, 50, COUL_FRAC)
        faux = VGroup(f0, self.t("= 4 % ?", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2).move_to(P(0, -0.85))
        self.play(FadeIn(f0, scale=0.6), run_time=0.3)
        self.au_mot("C'est 4 %")
        self.play(FadeIn(faux[1], scale=0.6), run_time=0.4)
        self.insister(faux[1], 1.3, 0.25)
        self.attendre_voix(marge=0.15)

        # ── 01 : non ! ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = Line(faux[1].get_corner(DL) + LEFT * 0.08, faux[1].get_corner(UR) + RIGHT * 0.08,
                     stroke_width=8, color=ROUGE_ERREUR)
        self.play(Create(barre), faux[1].animate.set_color(ROUGE_ERREUR), run_time=0.35)
        self.play(Wiggle(VGroup(faux, barre)), run_time=0.5)
        self.play(FadeOut(VGroup(faux, barre), shift=DOWN * 0.3),
                  gat.animate.scale(0.75).move_to(P(-1.15, 1.0)), run_time=0.45)

        self.au_mot("1 divisé par 4")
        L1 = self.t("1 ÷ 4", 42)
        r1 = VGroup(self.t("=", 42), self.t("0,25", 42, COUL_DEC)).arrange(RIGHT, buff=0.15)
        VGroup(L1, r1).arrange(RIGHT, buff=0.15).move_to(P(0, -0.45))
        self.play(FadeIn(L1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("égale 0,25")
        self.play(FadeIn(r1, shift=LEFT * 0.2), run_time=0.4)

        gr = grille100(0, 0.165).move_to(P(1.15, 1.0))
        self.au_mot("0,25 fois 100")
        L2 = Text("0,25 × 100", font_size=38)
        L2[:4].set_color(COUL_DEC)
        r2 = VGroup(self.t("=", 38), self.t("25", 38, COUL_PC)).arrange(RIGHT, buff=0.12)
        ligne2 = VGroup(L2, r2).arrange(RIGHT, buff=0.12)
        if ligne2.width > LARGEUR_MAX:
            ligne2.scale_to_fit_width(LARGEUR_MAX)
        ligne2.move_to(P(0, -1.2))
        self.play(TransformFromCopy(r1[1], L2[:4]), FadeIn(L2[4:]), Create(gr), run_time=0.7)
        self.au_mot("égale 25")
        self.play(FadeIn(r2, shift=LEFT * 0.2), LaggedStart(*colorier(gr, 25), lag_ratio=0.04), run_time=1.1)

        self.au_mot("c'est 25 %")
        L3 = VGroup(self.fraction(1, 4, 50, COUL_FRAC), self.t("= 25 %", 56, COUL_PC)).arrange(RIGHT, buff=0.2)
        L3.move_to(P(0, -2.2))
        eg = self.t("=", 46).move_to(P(0.0, 1.0))
        self.play(FadeIn(L3, scale=0.6), FadeIn(eg), run_time=0.5)
        self.insister(L3, 1.25, 0.3)
        self.play(Create(SurroundingRectangle(L3, color=COUL_PC, buff=0.12)),
                  Indicate(gr[:25], color=WHITE), Indicate(gat[0], color=WHITE), run_time=0.7)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.95))), run_time=0.5)
        self.au_mot("1 chance sur 5")
        g5 = self.gateau(5, 1, 0.85).move_to(P(-1.0, 1.4))
        gr5 = grille100(0, 0.16).move_to(P(1.15, 1.4))
        self.play(GrowFromCenter(g5), Create(gr5), run_time=0.6)
        q = VGroup(self.fraction(1, 5, 50, COUL_FRAC), self.t("= ? %", 52, COUL_PC)).arrange(RIGHT, buff=0.2)
        q.move_to(P(0, -0.3))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.au_mot("combien de pour cent")
        self.insister(q[1], 1.3, 0.25)
        self.play(Wiggle(gr5), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        appel.move_to(P(0, -1.6))
        poignee = self.grand("@eleveai974", font_size=26, color=BLEU_CALCUL).move_to(P(0, -2.58))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
