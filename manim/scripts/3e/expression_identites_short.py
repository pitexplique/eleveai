# expression_identites_short.py
# EleveAI — Maths 3e — short jumeau de l'expression littérale, épisode 6 : les
# identités remarquables. CEINTURE BLANCHE : en HAUT le carré de côté x + 3 qui
# se découpe en 4 morceaux (les deux rectangles 3x ORANGE clignotent) ; en BAS
# « (x + 3)² = x² + 3x + 3x + 9 = x² + 6x + 9 » qui s'écrit EN MÊME TEMPS ;
# « x² + 9 » barré.
# Couleurs de la paysage : x² BLEU, 3x ORANGE, 9 VERT, lettre JAUNE, faux ROUGE.
# Voix : manim/voix/3e-expression-identites-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/expression_identites_short.py ShortIdentites3e -o eleveai-maths-3e-expression-identites-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/06-identites/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_identites import C_2AB, C_A2, C_B2, W, P, carre_decoupe, ex  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


class ShortIdentites3e(Short6e):
    nom_voix = "3e-expression-identites-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Le carré oublié", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.0))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        q = ex([("(x + 3)²", W), ("=", W), ("x² + 9", BLEU_CALCUL), ("?", BLEU_CALCUL)], 44)
        if q.width > config.frame_width - 0.5:
            q.scale_to_fit_width(config.frame_width - 0.5)
        q.move_to(P(0, 0.9))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("x plus 3")
        self.play(Write(q[0]), run_time=0.8)
        self.au_mot("x au carré plus 9")
        self.play(FadeIn(q[1:]), run_time=0.6)
        self.play(q[3].animate.scale(1.6), run_time=0.35)
        self.play(q[3].animate.scale(1 / 1.6), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        c = carre_decoupe((-0.95, 1.45), 1.4, 0.6, fs=24, fs_lbl=24)
        y1, y2, y3 = -0.95, -1.65, -2.35
        bas = VGroup(q[0], q[1], q[2])
        self.add(c.big, c.r1, c.r2, c.pt)
        self.au_mot("Le carré de côté x plus 3")
        self.play(FadeOut(q[3]), bas.animate.scale(0.85).move_to(P(0, y1)),
                  Create(c.contour), FadeIn(c.lbl), run_time=1.0)
        self.play(Create(c.coupes), run_time=0.6)

        L = ex([("=", W), ("x²", C_A2), ("+", W), ("3x", C_2AB), ("+", W), ("3x", C_2AB), ("+", W), ("9", C_B2)], 34)
        if L.width > config.frame_width - 0.9:
            L.scale_to_fit_width(config.frame_width - 0.9)
        L.move_to(P(0, y2))

        self.au_mot("un carré x au carré")
        self.play(c.big.animate.set_fill(C_A2, 0.5), FadeIn(c.t_big), Write(L[0:2]), run_time=0.9)
        self.au_mot("un petit carré de 9")
        self.play(c.pt.animate.set_fill(C_B2, 0.5), FadeIn(c.t_pt), Write(L[6:8]), run_time=0.9)
        self.au_mot("deux rectangles de 3 x")
        self.play(c.r1.animate.set_fill(C_2AB, 0.5), c.r2.animate.set_fill(C_2AB, 0.5),
                  FadeIn(c.t_r1), FadeIn(c.t_r2), Write(L[2:6]), run_time=1.0)
        self.au_mot("qu'on oublie")
        barre = self.barrer(bas[2])
        self.play(bas[2].animate.set_color(ROUGE_ERREUR), Create(barre), run_time=0.5)
        for _ in range(2):
            self.play(c.r1.animate.set_fill(C_2AB, 0.95), c.r2.animate.set_fill(C_2AB, 0.95),
                      c.t_r1.animate.scale(1.5), c.t_r2.animate.scale(1.5),
                      L[3].animate.scale(1.3), L[5].animate.scale(1.3), run_time=0.4)
            self.play(c.r1.animate.set_fill(C_2AB, 0.5), c.r2.animate.set_fill(C_2AB, 0.5),
                      c.t_r1.animate.scale(1 / 1.5), c.t_r2.animate.scale(1 / 1.5),
                      L[3].animate.scale(1 / 1.3), L[5].animate.scale(1 / 1.3), run_time=0.4)
        self.au_mot("Le total")
        R = ex([("=", W), ("x²", C_A2), ("+", W), ("6x", C_2AB), ("+", W), ("9", C_B2)], 40).move_to(P(0, y3))
        self.play(Write(R[0:2]), TransformFromCopy(VGroup(L[3], L[5]), R[3]), FadeIn(R[2]), run_time=1.0)
        self.au_mot("plus 9")
        self.play(FadeIn(R[4:]), run_time=0.5)
        cadre = SurroundingRectangle(R[1:], color=VERT_OK, buff=0.1)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))), run_time=0.6)
        self.au_mot("31 fois 29")
        a = VGroup(self.t("31 × 29", 54), self.t("= ?", 54, BLEU_CALCUL)).arrange(RIGHT, buff=0.25)
        a.scale_to_fit_width(min(a.width, config.frame_width - 0.8)).move_to(P(0, 1.45))
        self.play(Write(a), run_time=0.8)
        self.au_mot("de tête")
        self.play(FadeIn(self.t("de tête !", 36, ORANGE_RETENUE).move_to(P(0, 0.65))), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.14)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        rep = VGroup(appel,
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.0)), scale=0.8))
        self.attendre_voix(marge=1.5)
