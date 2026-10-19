# proba_bern_calculer_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Répétition d'épreuves : calculer une probabilité » (micros probaI_produit /
# alea_bern_calculer). CEINTURE JAUNE. Il AMUSE : un tireur marque 8 fois sur
# 10 ; trois de suite, presque sûr ? Non : 0,8 × 0,8 × 0,8 = 0,512, à peine
# une chance sur deux.
#   · en HAUT les buts, le gardien, le ballon : trois tirs, trois buts ;
#   · en BAS, EN MÊME TEMPS : chaque tir écrit son 0,8, puis = 0,512 ;
#   · fin : cinq penaltys, plus ou moins d'une chance sur trois ?
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-bern-calculer-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_calculer_short.py ShortProbaBernCalculerSTMG -o eleveai-maths-stmg-proba-bern-calculer-short --media_dir manim/scripts/stmg/media-bern_calculer
# (ShortProbaBernCalculerPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/21-bern-calculer/ et
# manim/sorties/premiere-commun/maths/probabilites/21-bern-calculer/
# (eleveai-maths-premiere-commun-proba-bern-calculer-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bern_calculer import P, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
BLEU_NB = "#60A5FA"
PELOUSE = "#166534"
MAILLOT = "#38BDF8"
GARDIEN = "#F97316"


def ballon(r=0.17):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=BLACK, stroke_width=2)
    penta = RegularPolygon(5, fill_color=BLACK, fill_opacity=1, stroke_width=0).scale(r * 0.4).move_to(b)
    return VGroup(b, penta)


def cage(larg=3.4, haut=1.2):
    """Les buts vus de face : le filet, deux poteaux, la barre."""
    filet = VGroup()
    for k in range(1, 12):
        x = -larg / 2 + k * larg / 12
        filet.add(Line(P(x, 0), P(x, haut), color=GREY_B, stroke_width=1, stroke_opacity=0.5))
    for k in range(1, 5):
        y = k * haut / 5
        filet.add(Line(P(-larg / 2, y), P(larg / 2, y), color=GREY_B, stroke_width=1, stroke_opacity=0.5))
    cadre = VMobject(stroke_color=WHITE, stroke_width=7)
    cadre.set_points_as_corners([P(-larg / 2, 0), P(-larg / 2, haut), P(larg / 2, haut), P(larg / 2, 0)])
    return VGroup(filet, cadre)


def joueur(couleur, s=1.0):
    """Un petit joueur : tête, maillot, deux jambes."""
    tete = Circle(radius=0.12, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0, 0.42))
    corps = RoundedRectangle(width=0.3, height=0.36, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5).move_to(P(0, 0.12))
    j1 = Line(P(-0.07, -0.06), P(-0.12, -0.32), color=WHITE, stroke_width=5)
    j2 = Line(P(0.07, -0.06), P(0.12, -0.32), color=WHITE, stroke_width=5)
    return VGroup(tete, corps, j1, j2).scale(s)


class ShortProbaBernCalculerBase(Short6e):
    nom_voix = "stmg-premiere-proba-bern-calculer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=44, y=-2.0):
        g = suite(*[Text(tx, font_size=fs, color=c) for tx, c in morceaux], buff=0.12)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def tir(self, cible, plongeon, avec=()):
        """Le ballon part du point de penalty vers `cible` ; le gardien plonge
        de l'autre côté ; `avec` : les animations du bas, jouées EN MÊME TEMPS."""
        b = self.balle
        self.gardien.save_state()
        angle = -0.9 if plongeon[0] > 0 else 0.9
        self.play(b.animate.move_to(cible).scale(0.7), self.gardien.animate.shift(plongeon).rotate(angle),
                  *avec, run_time=0.45, rate_func=rate_functions.ease_out_quad)
        self.play(Flash(cible, color=VERT_OK, line_length=0.18, flash_radius=0.3), run_time=0.3)
        neuf = ballon().move_to(self.point)
        self.play(FadeOut(b), FadeIn(neuf), Restore(self.gardien), run_time=0.25)
        self.balle = neuf

    def construct(self):
        self.margo_bas()

        # ── 00 : 8 fois sur 10 ; trois de suite, presque sûr ? ──
        self.dire("00-accroche")
        titre = VGroup(self.t("Trois penaltys", 40, JAUNE_TITRE), self.t("de suite ?", 40, JAUNE_TITRE))
        titre.arrange(DOWN, buff=0.08).move_to(P(0, 3.28))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pelouse = Rectangle(width=4.5, height=1.75, fill_color=PELOUSE, fill_opacity=1, stroke_width=0)
        pelouse.move_to(P(0, 0.18))
        self.but = cage().move_to(P(0, 1.15))
        self.but.align_to(P(0, 0.55), DOWN)
        point = Dot(P(0, -0.33), radius=0.05, color=WHITE)
        self.point = P(0, -0.2)
        self.pos_gardien = P(0, 0.95)
        self.gardien = joueur(GARDIEN, 1.1).move_to(self.pos_gardien)
        self.tireur = joueur(MAILLOT, 1.1).move_to(P(-0.6, -0.12))
        self.balle = ballon().move_to(self.point)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(pelouse), FadeIn(self.but),
                  FadeIn(point), FadeIn(self.gardien), FadeIn(self.tireur, shift=RIGHT * 0.3), FadeIn(self.balle),
                  run_time=0.8)
        self.au_mot("8 fois sur 10")
        huit = self.t("8 fois sur 10", 44, WHITE).move_to(P(0, -1.2))
        points = VGroup(*[ballon(0.15) for _ in range(10)]).arrange(RIGHT, buff=0.1).move_to(P(0, -1.85))
        for k in (8, 9):
            points[k][0].set_fill(ROUGE_ERREUR)
        for k in range(8):
            points[k][0].set_stroke(VERT_OK, 3)
        self.play(FadeIn(huit, scale=1.4), LaggedStart(*[FadeIn(p, scale=1.6) for p in points], lag_ratio=0.08),
                  run_time=0.9)
        self.au_mot("Trois de suite")
        self.play(Indicate(titre, color=WHITE, scale_factor=1.12), run_time=0.5)
        self.au_mot("Presque sûr")
        sur = self.grand("Presque sûr ?", font_size=48, color=ORANGE_RETENUE).move_to(P(0, -2.5))
        sur_fond = VGroup(BackgroundRectangle(sur, color=BLACK, fill_opacity=0.85, buff=0.1), sur)
        self.play(FadeIn(sur_fond, scale=1.6), Wiggle(self.tireur), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : trois tirs, trois 0,8 : 0,512 ──
        self.dire("01-image")
        prod = self.ligne([("0,8", BLEU_NB), ("×", WHITE), ("0,8", BLEU_NB), ("×", WHITE), ("0,8", BLEU_NB)],
                          fs=54, y=-1.25)
        res = suite(self.t("=", 60), self.t("0,512", 60, JAUNE_TITRE), buff=0.2).move_to(P(0, -1.9))
        prod.add(*res)
        self.au_mot("On multiplie")
        self.play(FadeOut(VGroup(huit, points, sur_fond), shift=DOWN * 0.2), run_time=0.4)
        cibles = [(P(-1.15, 1.35), RIGHT * 0.8), (P(1.2, 0.85), LEFT * 0.8), (P(1.0, 1.4), LEFT * 0.8)]
        extraits = ["0,8 fois 0,8 fois", "0,8 fois 0,8, égale", "0,8, égale"]
        for k, ((c, pl), ex) in enumerate(zip(cibles, extraits)):
            self.au_mot(ex)
            bas = [FadeIn(prod[2 * k], scale=1.8)] + ([FadeIn(prod[2 * k + 1])] if k < 2 else [])
            self.tir(c, pl, bas)
        self.au_mot("égale 0,512")
        self.play(FadeIn(prod[5]), FadeIn(prod[6], scale=2.0), run_time=0.4)
        self.insister(prod[6], 1.5, 0.25)
        self.au_mot("À peine")
        peine = VGroup(self.t("À peine une chance", 36, JAUNE_TITRE), self.t("sur deux !", 36, JAUNE_TITRE))
        peine.arrange(DOWN, buff=0.08).move_to(P(0, 3.2))
        self.play(ReplacementTransform(titre, peine), run_time=0.5)
        self.play(Wiggle(peine), run_time=0.6)
        self.au_mot("À chaque tir")
        risque = VGroup(self.t("À chaque tir,", 30, WHITE), self.t("le risque de rater revient", 30, ROUGE_ERREUR))
        risque.arrange(DOWN, buff=0.06).move_to(P(0, -2.6))
        self.play(FadeIn(risque[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("rater")
        b = self.balle
        poteau = P(1.7, 1.1)
        self.play(b.animate.move_to(poteau).scale(0.8), FadeIn(risque[1], shift=UP * 0.15), run_time=0.4,
                  rate_func=rate_functions.ease_out_quad)
        self.play(b.animate.move_to(P(2.6, 0.2)).rotate(2.0), Flash(poteau, color=ROUGE_ERREUR, line_length=0.2),
                  Indicate(self.but[1], color=ROUGE_ERREUR, scale_factor=1.02), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : et cinq de suite ? ──
        self.dire("02-question")
        self.au_mot("Et cinq penaltys")
        cinq_t = VGroup(self.t("Et cinq", 40, JAUNE_TITRE), self.t("de suite ?", 40, JAUNE_TITRE))
        cinq_t.arrange(DOWN, buff=0.08).move_to(P(0, 3.2))
        cinq = VGroup(*[ballon(0.26) for _ in range(5)]).arrange(RIGHT, buff=0.32).move_to(P(0, 1.35))
        self.play(ReplacementTransform(peine, cinq_t),
                  FadeOut(VGroup(pelouse, self.but, point, self.gardien, self.tireur, b, prod, risque)),
                  LaggedStart(*[FadeIn(x, scale=1.6) for x in cinq], lag_ratio=0.12), run_time=0.8)
        self.au_mot("0,8 chacun")
        huits = VGroup(*[self.t("0,8", 28, BLEU_NB).next_to(x, DOWN, buff=0.15) for x in cinq])
        self.play(LaggedStart(*[FadeIn(h, scale=1.6) for h in huits], lag_ratio=0.12), run_time=0.7)
        self.au_mot("plus ou moins")
        q = VGroup(self.t("plus ou moins", 40, WHITE), self.t("d'une chance", 40, WHITE),
                   self.t("sur trois ?", 40, ORANGE_RETENUE)).arrange(DOWN, buff=0.1).move_to(P(0, -0.65))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.insister(q[2], 1.15, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaBernCalculerSTMG(ShortProbaBernCalculerBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaBernCalculerPremiere(ShortProbaBernCalculerBase):
    identite = "Maths 1re — EleveAI"
