# proba_frequence_calculer_short.py
# EleveAI — Maths 4e — short jumeau des probabilités, épisode 9 : calculer une fréquence.
# CEINTURE JAUNE. Il AMUSE : un bouchon de bouteille lancé 50 fois.
# En HAUT le bouchon qui tombe en tournant et les deux compteurs (lancers,
# à l'endroit) ; puis les 50 bouchons en grille. En BAS, EN MÊME TEMPS que la
# voix : 30/50, 30 ÷ 50 = 0,6, 0,6 × 100 = 60, et « ? % » devient « 60 % ».
# Fin : 20 à l'endroit sur 80 lancers, la question en commentaire.
# Voix : manim/voix/4e-proba-frequence-calculer-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_frequence_calculer_short.py ProbaFrequenceCalculer4eShort -o eleveai-maths-4e-proba-frequence-calculer-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/09-frequence-calculer/.

import math
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_frequence_calculer import P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

ROUGE_BOUCHON = "#DC2626"
GRIS_BOUCHON = "#9CA3AF"

_r = random.Random(5030)
SERIE = ["E"] * 30 + ["V"] * 20  # E = à l'endroit, V = à l'envers
_r.shuffle(SERIE)


def bouchon(endroit=True, s=1.0, couleur=ROUGE_BOUCHON):
    """Un bouchon de bouteille vu de profil : le dessus plat, la jupe striée.
    À l'endroit : le dessus en haut. À l'envers : retourné."""
    jupe = Rectangle(width=0.9, height=0.42, fill_color=couleur, fill_opacity=1,
                     stroke_color=WHITE, stroke_width=2).move_to(P(0, -0.04))
    stries = VGroup(*[Line(P(x, -0.22), P(x, 0.14), stroke_width=1.5, color=WHITE, stroke_opacity=0.55)
                      for x in [-0.33 + 0.11 * k for k in range(7)]])
    dessus = RoundedRectangle(width=1.0, height=0.14, corner_radius=0.05, fill_color=couleur,
                              fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.22))
    g = VGroup(jupe, stries, dessus)
    if not endroit:
        g.rotate(PI)
    return g.scale(s)


class ProbaFrequenceCalculer4eShort(Short6e):
    nom_voix = "4e-proba-frequence-calculer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
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

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def bouchon_lance(self, centre, s=1.0, haut=1.2, periode=0.55):
        etat = {"t": 0.0}

        def faire(t):
            ph = (t % periode) / periode
            return bouchon(True, s).rotate(t * 8).move_to(centre + UP * haut * 4 * ph * (1 - ph))

        holder = faire(0)

        def maj(m, dt):
            etat["t"] += dt
            m.become(faire(etat["t"]))

        holder.add_updater(maj)
        return holder

    def construct(self):
        self.margo_bas()

        # ── 00 : le pari ──
        self.dire("00-accroche")
        titre = self.grand("Le bouchon", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        sol = Line(P(-2.0, 0.12), P(-0.2, 0.12), stroke_width=4, color=GREY_B)
        self.play(FadeIn(titre), FadeIn(badge), Create(sol), run_time=0.7)
        b = self.bouchon_lance(P(-1.1, 0.4), 1.0, 1.15)
        self.add(b)

        n = ValueTracker(0)
        xc = 1.0
        l_lan = self.t("lancers", 24).move_to(P(xc, 1.6))
        l_end = VGroup(bouchon(True, 0.22), self.t("à l'endroit", 22, VERT_OK)).arrange(RIGHT, buff=0.1)
        l_end.move_to(P(xc, 0.65))
        c_lan = always_redraw(lambda: self.t(str(int(n.get_value())), 46, JAUNE_TITRE).move_to(P(xc, 1.15)))
        c_end = always_redraw(lambda: self.t(str(SERIE[:int(n.get_value())].count("E")), 46, VERT_OK)
                              .move_to(P(xc, 0.2)))
        self.play(FadeIn(l_lan), FadeIn(l_end), FadeIn(c_lan), FadeIn(c_end), run_time=0.4)

        self.au_mot("50 fois")
        self.play(n.animate.set_value(50), run_time=2.6, rate_func=linear)
        c_lan.clear_updaters()
        c_end.clear_updaters()

        self.au_mot("30 fois")
        self.insister(c_end, 1.5, 0.3)
        self.insister(c_lan, 1.3, 0.25)

        self.au_mot("combien de pour cent")
        q = self.t("? %", 80, BLEU_CALCUL).move_to(P(0, -1.2))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.play(Wiggle(q), run_time=0.6)
        self.attendre_voix(marge=0.15)
        b.clear_updaters()

        # ── 01 : le calcul, en même temps que la grille des 50 bouchons ──
        self.dire("01-image")
        self.au_mot("30 sur 50")
        grille = VGroup()
        for i in range(50):
            r, k = divmod(i, 10)
            endroit = i < 30
            grille.add(bouchon(endroit, 0.32, ROUGE_BOUCHON if endroit else GRIS_BOUCHON)
                       .move_to(P(-1.71 + k * 0.38, 1.72 - r * 0.38)))
        frac = self.fraction(30, 50, 52, VERT_OK).move_to(P(-1.0, -0.55))
        self.play(FadeOut(VGroup(b, sol, l_lan, l_end, c_lan, c_end)),
                  q.animate.scale(0.7).move_to(P(1.05, -0.55)), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(g, shift=DOWN * 0.6) for g in grille], lag_ratio=0.02),
                  FadeIn(frac, scale=1.4), run_time=1.0)

        self.au_mot("30 divisé par 50")
        l2a = self.t("30 ÷ 50", 38).move_to(P(-1.95, -1.45), aligned_edge=LEFT)
        self.play(FadeIn(l2a), *[g.animate.shift(UP * 0.1) for g in grille[:30]], run_time=0.35)
        self.play(*[g.animate.shift(DOWN * 0.1) for g in grille[:30]], run_time=0.2)
        self.au_mot("égale 0,6")
        l2b = self.t("= 0,6", 38, BLEU_CALCUL).next_to(l2a, RIGHT, buff=0.2)
        self.play(FadeIn(l2b, shift=LEFT * 0.15), run_time=0.35)
        self.insister(l2b, 1.3, 0.25)

        self.au_mot("0,6 fois 100")
        l3a = self.t("0,6 × 100", 38).move_to(P(-1.95, -2.1), aligned_edge=LEFT)
        self.play(FadeIn(l3a), run_time=0.35)
        self.au_mot("égale 60")
        l3b = self.t("= 60", 38, BLEU_CALCUL).next_to(l3a, RIGHT, buff=0.2)
        self.play(FadeIn(l3b, shift=LEFT * 0.15), run_time=0.35)

        self.au_mot("60 %")
        res = self.t("60 %", 60, VERT_OK).move_to(q)
        self.play(ReplacementTransform(q, res), run_time=0.4)
        self.play(Create(SurroundingRectangle(res, color=VERT_OK, buff=0.1)),
                  LaggedStart(*[Indicate(g, color=VERT_OK, scale_factor=1.3) for g in grille[:30]],
                              lag_ratio=0.02), run_time=0.9)
        self.insister(res, 1.3, 0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.3))), run_time=0.5)
        b2 = self.bouchon_lance(P(0, 2.0), 1.0, 0.5)
        self.add(b2)
        self.au_mot("20 fois")
        l20 = VGroup(self.t("20", 46, VERT_OK), self.t("à l'endroit", 34, VERT_OK)).arrange(RIGHT, buff=0.15)
        l20.move_to(P(0, 1.1))
        self.play(FadeIn(l20, scale=1.4), run_time=0.4)
        self.au_mot("80 lancers")
        l80 = VGroup(self.t("sur", 34), self.t("80", 46, JAUNE_TITRE), self.t("lancers", 34)).arrange(RIGHT, buff=0.15)
        l80.move_to(P(0, 0.45))
        self.play(FadeIn(l80, scale=1.4), run_time=0.4)
        self.au_mot("combien de pour cent")
        q2 = self.t("? %", 64, BLEU_CALCUL).move_to(P(0, -0.3))
        self.play(FadeIn(q2, scale=0.5), run_time=0.35)
        self.insister(q2, 1.3, 0.25)

        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=48, color=VERT_OK),
                       self.grand("commentaire !", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.12)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        appel.move_to(P(0, -1.55))
        poignee = self.grand("@eleveai974", font_size=32, color=BLEU_CALCUL).move_to(P(0, -2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
        b2.clear_updaters()
