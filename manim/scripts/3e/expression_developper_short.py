# expression_developper_short.py
# EleveAI — Maths 3e — short jumeau de l'expression littérale, épisode 4 : développer.
# CEINTURE BLANCHE (échelle complète sous le titre) : en HAUT le terrain de
# x + 2 sur x + 3 qui se découpe en 4 morceaux ; en BAS les 4 produits qui
# s'écrivent EN MÊME TEMPS, puis x² + 5x + 6.
# Couleurs de la paysage : x² BLEU, 3x et 2x ORANGE, 6 VERT, lettre JAUNE.
# Voix : manim/voix/3e-expression-developper-short.json (débit −7), validée.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/expression_developper_short.py ShortDevelopper3e -o eleveai-maths-3e-expression-developper-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/04-developper/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_developper import COUL_X, COUL_X2, COUL_K, P, terrain, tx  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

NOMS = [["x²", "3x"], ["2x", "6"]]


class ShortDevelopper3e(Short6e):
    nom_voix = "3e-expression-developper-short"

    def t(self, texte, font_size=34, color=WHITE):
        return tx(texte, font_size, color)

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Combien de morceaux ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.0))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("x plus 2, fois")
        e = self.t("(x + 2)(x + 3)", 46)
        e.scale_to_fit_width(min(e.width, config.frame_width - 0.8)).move_to(P(0, 0.9))
        self.play(Write(e))
        self.au_mot("combien de morceaux")
        q = Text("?", font_size=90, color=ORANGE_RETENUE).move_to(P(0, -0.4))
        self.play(GrowFromCenter(q))
        self.play(q.animate.scale(1.5), run_time=0.4)
        self.play(q.animate.scale(1 / 1.5), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        X, A, B = 1.4, 0.7, 0.45
        ter = terrain((-1.7, 1.4), X, A, B, police=26)
        m = ter["morceaux"]
        y1, y2, y3 = -0.85, -1.45, -2.0
        self.play(FadeOut(q), e.animate.scale_to_fit_width(2.9).move_to(P(0, y1)),
                  FadeIn(ter["fond"]), Create(ter["bord"]), FadeIn(ter["touffes"]), FadeIn(ter["etiq"]),
                  run_time=0.9)
        self.au_mot("se découpe en quatre")
        self.play(Create(ter["coupes"]), run_time=0.8)
        ligne = VGroup(self.t("=", 30))
        premier = True
        termes = [("x au carré", 0, 0, "x²"), ("3 x,", 0, 1, "+ 3x"), ("2 x,", 1, 0, "+ 2x"), ("et 6", 1, 1, "+ 6")]
        noms = VGroup()
        for mot, i, j, terme in termes:
            self.au_mot(mot)
            n = self.t(NOMS[i][j], 28).move_to(m[i][j])
            noms.add(n)
            tm = self.t(terme, 30)
            ligne.add(tm)
            ligne.arrange(RIGHT, buff=0.14).move_to(P(0, y2))
            neuf = VGroup(ligne[0], tm) if premier else tm
            premier = False
            self.play(FadeIn(m[i][j]), FadeIn(n), FadeIn(neuf, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Quatre produits")
        quatre = VGroup(Text("4", font_size=44, color=ORANGE_RETENUE),
                        Text("produits", font_size=20, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.08)
        quatre.move_to(P(1.5, 0.45))
        self.play(FadeIn(quatre), Indicate(VGroup(*[r for l in m for r in l]), scale_factor=1.05))
        self.au_mot("puis on réduit")
        self.play(ligne[2].animate.set_color(COUL_X), ligne[3].animate.set_color(COUL_X),
                  Indicate(m[0][1], color=COUL_X), Indicate(m[1][0], color=COUL_X))
        self.au_mot("x au carré plus 5 x")
        res = VGroup(self.t("=", 36), self.t("x²", 36), self.t("+ 5x", 36, COUL_X), self.t("+ 6", 36)
                     ).arrange(RIGHT, buff=0.16).move_to(P(0, y3))
        res.set_color(VERT_OK)
        res[1][0].set_color(JAUNE_TITRE)
        res[2][-1].set_color(JAUNE_TITRE)
        self.play(TransformFromCopy(ligne, res), run_time=1.0)
        self.play(res[2].animate.scale(1.5), run_time=0.4)
        self.play(res[2].animate.scale(1 / 1.5), run_time=0.4)
        self.attendre_voix(marge=0.6)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("Développe")
        self.play(FadeIn(self.t("Développe :", 34, BLEU_CALCUL).move_to(P(0, 1.75))))
        self.au_mot("x plus 1, fois x plus 4")
        a = VGroup(self.t("(x + 1)(x + 4)", 42), self.t("= ?", 42, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        if a.width > config.frame_width - 0.8:
            a.scale_to_fit_width(config.frame_width - 0.8)
        self.play(Write(a.move_to(P(0, 0.9))))
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.14)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -0.8)), scale=0.8))
        self.attendre_voix(marge=1.5)
