# expression_substituer_short.py
# EleveAI — Maths 3e — short jumeau de l'expression littérale, épisode 2 :
# la distance de freinage, d = v² ÷ 100.
# CEINTURE BLANCHE (l'échelle des 7 ceintures sous le titre) : en HAUT deux
# voitures freinent et laissent leurs bandes (25 m et 100 m) sur une échelle en
# mètres ; en BAS les deux calculs s'écrivent EN MÊME TEMPS que les bandes se
# tracent ; « × 4 » mis en valeur (quatre bandes de 25 m dans celle de 100 m).
# Couleurs de la paysage : vitesse JAUNE, distance VERTE, × 2 / × 4 ORANGE.
# Voix : manim/voix/3e-expression-substituer-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/expression_substituer_short.py ShortSubstituer3e -o eleveai-maths-3e-expression-substituer-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/02-substituer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_substituer import COUL_X, TRACE, P, route, voiture  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Les routes du short : 100 m = 3,4 unités, freinage à partir de X0.
X0 = -1.85
ECH = 0.034
Y1, Y2 = 1.4, 0.65       # les deux routes
Y_E = 0.17               # l'échelle en mètres


class ShortSubstituer3e(Short6e):
    nom_voix = "3e-expression-substituer-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=30, buff=0.14):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def gonfler(self, mob, f=1.5, duree=0.4):
        self.play(mob.animate.scale(f), run_time=duree)
        self.play(mob.animate.scale(1 / f), run_time=duree)

    def calcul(self, v, d, y):
        """« 50² ÷ 100 = 25 m » : la vitesse JAUNE, le ² blanc, la distance VERTE."""
        l = self.ligne([(f"{v}²", COUL_X), ("÷ 100", WHITE), ("=", WHITE), (f"{d} m", VERT_OK)], 30)
        l[0][-1].set_color(WHITE)
        return l.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Freiner deux fois plus vite", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.0))
        ech = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        q1 = self.ligne([("vitesse", WHITE), ("× 2", ORANGE_RETENUE)], 38, 0.2).move_to(P(0, 0.9))
        q2 = self.ligne([("distance", WHITE), ("× 2 ?", ORANGE_RETENUE)], 38, 0.2).move_to(P(0, 0.1))
        self.play(FadeIn(titre), FadeIn(ech), run_time=0.6)
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("deux fois plus loin")
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.5)
        self.gonfler(q2[1])
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        r1, r2 = route(-2.25, 2.25, Y1, 0.42), route(-2.25, 2.25, Y2, 0.42)
        regle = VGroup(Line(P(X0, Y_E), P(X0 + 100 * ECH, Y_E), stroke_width=2, color=GREY_B))
        for k in range(5):
            x = X0 + 25 * k * ECH
            regle.add(Line(P(x, Y_E - 0.07), P(x, Y_E + 0.07), stroke_width=2, color=GREY_B))
            regle.add(self.t(f"{25 * k}", 16, GREY_B).move_to(P(x, Y_E - 0.2)))
        regle.add(self.t("m", 16, GREY_B).move_to(P(X0 + 100 * ECH + 0.32, Y_E - 0.2)))
        car1 = voiture(-3.0, Y1 - 0.16, 0.42)
        car2 = voiture(-3.0, Y2 - 0.16, 0.42)
        self.play(FadeOut(q1), FadeOut(q2), FadeIn(r1), FadeIn(r2), FadeIn(regle), run_time=0.5)

        self.au_mot("Distance de freinage")
        f = self.ligne([("d", WHITE), ("=", WHITE), ("v²", COUL_X), ("÷ 100", WHITE)], 36, 0.16).move_to(P(0, -0.4))
        f[2][1].set_color(WHITE)
        cadre = SurroundingRectangle(f, color=BLEU_CALCUL, buff=0.12)
        self.play(Write(f[0:2]))
        self.au_mot("v au carré")
        self.play(Write(f[2:]), Create(cadre))

        # 50 km/h : la voiture arrive, freine ; le calcul s'écrit pendant la trace
        self.au_mot("À 50 kilomètres")
        v1 = self.t("50 km/h", 18, COUL_X).move_to(P(-1.55, Y1 + 0.37))
        self.play(car1.animate.shift(RIGHT * (X0 + 3.0)), FadeIn(v1), run_time=0.7, rate_func=linear)
        c1 = self.calcul(50, 25, -0.92)
        tr1 = Line(P(X0, Y1 - 0.08), P(X0 + 25 * ECH, Y1 - 0.08), stroke_color=TRACE, stroke_width=7)
        e1 = self.t("25 m", 20, VERT_OK).move_to(P(X0 + 25 * ECH + 0.85, Y1 + 0.02))
        self.play(car1.animate(rate_func=rate_functions.ease_out_cubic).shift(RIGHT * 25 * ECH),
                  Create(tr1, rate_func=rate_functions.ease_out_cubic), Write(c1), run_time=1.6)
        self.play(FadeIn(e1), Indicate(c1[3], color=VERT_OK), run_time=0.6)

        self.au_mot("À 100 kilomètres")
        v2 = self.t("100 km/h", 18, COUL_X).move_to(P(-1.5, Y2 + 0.37))
        self.play(car2.animate.shift(RIGHT * (X0 + 3.0)), FadeIn(v2), run_time=0.6, rate_func=linear)
        c2 = self.calcul(100, 100, -1.36)
        tr2 = Line(P(X0, Y2 - 0.08), P(X0 + 100 * ECH, Y2 - 0.08), stroke_color=TRACE, stroke_width=7)
        e2 = self.t("100 m", 20, VERT_OK).move_to(P(X0 + 100 * ECH - 0.1, Y2 + 0.37))
        self.play(car2.animate(rate_func=rate_functions.ease_out_cubic).shift(RIGHT * 100 * ECH),
                  Create(tr2, rate_func=rate_functions.ease_out_cubic), Write(c2), run_time=2.0)
        self.play(FadeIn(e2), Indicate(c2[3], color=VERT_OK), run_time=0.6)

        self.au_mot("Vitesse doublée")
        x2 = self.ligne([("vitesse", WHITE), ("× 2", ORANGE_RETENUE)], 28, 0.16).move_to(P(0, -1.8))
        self.play(FadeIn(x2, shift=UP * 0.15), Indicate(VGroup(v1, v2), color=ORANGE_RETENUE), run_time=0.7)
        self.au_mot("distance multipliée par 4")
        x4 = self.ligne([("distance", WHITE), ("× 4", ORANGE_RETENUE)], 28, 0.16).move_to(P(0, -2.17))
        # quatre bandes de 25 m sous la trace de 100 m
        L25 = 25 * ECH
        quatre = VGroup(*[Rectangle(width=L25 - 0.03, height=0.08, stroke_width=0,
                                    fill_color=ORANGE_RETENUE if k % 2 == 0 else "#FDBA74", fill_opacity=1)
                          .move_to(P(X0 + (k + 0.5) * L25, Y2 - 0.3)) for k in range(4)])
        self.play(FadeIn(x4, shift=UP * 0.15),
                  LaggedStart(*[TransformFromCopy(tr1, q) for q in quatre], lag_ratio=0.25), run_time=1.2)
        self.gonfler(x4[1], f=1.5)
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.6))))
        self.au_mot("130 kilomètres")
        rte = route(-2.25, 2.25, 1.45, 0.42)
        car = voiture(-3.0, 1.29, 0.5).set_z_index(2)
        v = self.t("130 km/h", 40, COUL_X).move_to(P(0, 0.75))
        self.play(FadeIn(rte), car.animate.shift(RIGHT * 2.0), FadeIn(v, shift=DOWN * 0.2), run_time=0.9)
        self.au_mot("combien de mètres")
        q = self.ligne([("d", WHITE), ("=", WHITE), ("?", BLEU_CALCUL), ("m", WHITE)], 52, 0.2).move_to(P(0, -0.1))
        self.play(Write(q))
        self.gonfler(q[2])
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("Réponds", font_size=46, color=VERT_OK),
                     self.grand("en commentaire !", font_size=40, color=VERT_OK),
                     self.grand("@eleveai974", font_size=30, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.5)), scale=1.1))
        self.attendre_voix(marge=1.5)
