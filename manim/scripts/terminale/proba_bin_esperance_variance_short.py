# proba_bin_esperance_variance_short.py
# EleveAI — Maths Tle spé (micro binomiale_esperance_variance) — short jumeau
# de « Loi binomiale : espérance, variance, écart-type ». CEINTURE ORANGE.
# Il AMUSE : 100 lancers francs à 70 % ; elle en marque EXACTEMENT 70 ?
#   · en HAUT : le panier et les ballons, puis le stat_graph « bâtons » du
#     coach (B(100 ; 0,7)) où des entraînements tombent autour de 70 ;
#   · en BAS, EN MÊME TEMPS : 70 %, « exactement 70 ? », moyenne 70,
#     écart-type √21 ≈ 4,6 ;
#   · fin : 400 lancers de pièce, quel écart-type ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/terminale-proba-bin-esperance-variance-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_bin_esperance_variance_short.py ShortProbaBinEsperanceVarianceTerminale -o eleveai-maths-terminale-proba-bin-esperance-variance-short --media_dir manim/scripts/terminale/media-bin_esperance_variance-s

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_esperance_variance import (  # noqa: E402
    ACTIF, MOYENNE, CarteBatons, MotsCales, P, Panier, ballon, piece_qui_tourne, rac_txt, suite, vol,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.2
K = (56, 84)


class ShortProbaBinEsperanceVarianceBase(MotsCales, Short6e):
    nom_voix = "terminale-proba-bin-esperance-variance-short"
    fichier_marques = "proba_bin_esperance_variance_short_marques.json"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def tir(self, b, panier, reussi=True, run_time=0.5):
        c = panier.cerceau
        if reussi:
            arc = ArcBetweenPoints(b.get_center(), c + UP * 0.2, angle=-PI / 2.2)
            self.play(vol(b, arc), run_time=run_time, rate_func=rate_functions.linear)
            self.play(b.animate.move_to(c + DOWN * 0.9).set_opacity(0), run_time=0.25)
        else:
            cible = c + LEFT * 0.3 + UP * 0.15
            arc = ArcBetweenPoints(b.get_center(), cible, angle=-PI / 2.4)
            self.play(vol(b, arc), run_time=run_time, rate_func=rate_functions.linear)
            rebond = ArcBetweenPoints(cible, cible + LEFT * 1.0 + DOWN * 1.0, angle=-PI / 1.6)
            self.play(MoveAlongPath(b, rebond), Wiggle(panier.anneau, scale_value=1.15),
                      run_time=0.35)
            self.remove(b)

    def construct(self):
        self.margo_bas()

        # ── 00 : 100 lancers francs, 70 % ; exactement 70 ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        titre = VGroup(self.t("100 lancers", 46, ORANGE_RETENUE), self.t("francs", 40, JAUNE_TITRE))
        titre.arrange(DOWN, buff=0.06).move_to(P(0, 3.3))
        pan = Panier(0.62).move_to(P(1.15, 0.55))
        depart = P(-1.7, -0.3)
        self.play(FadeIn(badge, shift=DOWN * 0.2), FadeIn(pan, shift=UP * 0.2), run_time=0.4)
        self.au_mot("100 lancers")
        self.play(Write(titre), run_time=0.6)
        self.au_mot("70 %")
        pc = VGroup(self.t("70 %", 60, JAUNE_TITRE), self.t("de réussite", 36)).arrange(DOWN, buff=0.08)
        pc.move_to(P(0, -0.6))
        b = ballon(0.17).move_to(depart)
        self.add(b)
        self.play(FadeIn(pc[0], scale=1.8), FadeIn(pc[1]), run_time=0.4)
        self.tir(b, pan, True, 0.45)
        for ok in (True, False):
            bb = ballon(0.17).move_to(depart)
            self.add(bb)
            self.tir(bb, pan, ok, 0.4)
        self.au_mot("exactement 70")
        q = VGroup(self.t("Exactement", 46, ORANGE_RETENUE), self.t("70 ?", 64, ORANGE_RETENUE))
        q.arrange(DOWN, buff=0.08).move_to(P(0, -2.2))
        self.play(FadeIn(q, scale=1.4), run_time=0.4)
        self.play(Wiggle(q[1]), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : en moyenne, oui : 70 ; mais l'écart-type √21 ≈ 4,6 ──
        self.dire("01-image")
        c = CarteBatons(100, 0.7, *K, larg=4.3, haut=2.3, sw=3).move_to(P(0, 0.7))
        self.au_mot("En moyenne")
        moy = self.t("En moyenne, oui !", 42, VERT_OK).move_to(P(0, 3.25))
        self.play(FadeOut(pan), FadeOut(pc), FadeOut(q), ReplacementTransform(titre, moy), FadeIn(c.socle()),
                  run_time=0.5)
        self.play(c.pousser(0.7))
        self.au_mot("70. Mais")
        lm = c.ligne_moyenne(70)
        e70 = c.etiquette(70, "70", MOYENNE, 30)
        l1 = suite(self.t("moyenne :", 44, MOYENNE), self.t("70", 60, MOYENNE), buff=0.22).move_to(P(0, -1.05))
        b70 = c.par_k[70]
        self.play(Create(lm), FadeIn(e70, scale=1.6), b70[0].animate.set_stroke(ACTIF, width=5),
                  b70[1].animate.set_color(ACTIF), FadeIn(l1, scale=1.3), run_time=0.5)
        self.au_mot("l'écart-type")
        et = self.t("écart-type", 42, VERT_OK).move_to(P(0, -1.85))
        self.play(FadeIn(et, shift=UP * 0.15), run_time=0.4)
        self.au_mot("racine de 21")
        r21 = rac_txt("21", 50, VERT_OK, WHITE)
        l2 = suite(self.t("=", 50), r21, buff=0.22)
        l2b = suite(self.t("≈", 50), self.t("4,6", 64, VERT_OK), buff=0.22)
        VGroup(l2, l2b).arrange(RIGHT, buff=0.3).move_to(P(0, -2.5))
        self.play(FadeIn(l2[0]), Create(r21[0]), FadeIn(r21[1], scale=1.5), run_time=0.5)
        self.au_mot("4,6")
        y = c.y_axe() + c.h_max * 0.45
        fls = []
        for k1, k2, cote in ((65.4, 70, LEFT), (70, 74.6, RIGHT)):
            fl = DoubleArrow(P(c.x_de(k1), y), P(c.x_de(k2), y), buff=0, color=VERT_OK, stroke_width=5,
                             tip_length=0.12, max_tip_length_to_length_ratio=0.35)
            tx = Text("4,6", font_size=30, color=VERT_OK, weight=BOLD).next_to(fl, cote, buff=0.06)
            fond = BackgroundRectangle(tx, color=WHITE, fill_opacity=0.92, buff=0.03)
            fls.append(VGroup(fl, fond, tx).set_z_index(3))
        self.play(FadeIn(l2b[0]), FadeIn(l2b[1], scale=1.8), *[GrowFromCenter(f) for f in fls], run_time=0.5)
        self.au_mot("s'en écarte souvent")
        rng = np.random.default_rng(974)
        pile, balles = {}, []
        for v in rng.binomial(100, 0.7, 26):
            v = int(min(max(v, K[0]), K[1]))
            h = pile.get(v, 0)
            pile[v] = h + 1
            balles.append(ballon(0.05).move_to(P(c.x_de(v), c.y_axe() + 0.06 + 0.105 * h)).set_z_index(2))
        self.play(c.batons.animate.set_opacity(0.3),
                  LaggedStart(*[FadeIn(bl, shift=DOWN * 1.0) for bl in balles], lag_ratio=0.1), run_time=2.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : et 400 lancers de pièce ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et_toi = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(moy, et_toi), FadeOut(VGroup(c, lm, e70, *fls, *balles, l1, et, l2, l2b)),
                  run_time=0.5)
        self.au_mot("400 lancers")
        piece = piece_qui_tourne(P(0, 0.75), r=0.72)
        q4 = self.t("400 lancers", 50, ORANGE_RETENUE).move_to(P(0, -0.3))
        self.play(FadeIn(piece, scale=0.5), FadeIn(q4, scale=1.4), run_time=0.5)
        self.au_mot("quel est l'écart-type")
        qe = self.t("écart-type ?", 50, VERT_OK).move_to(P(0, -1.05))
        self.play(FadeIn(qe, scale=1.3), run_time=0.4)
        self.insister(qe, 1.12, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.15))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
        piece.clear_updaters()


class ShortProbaBinEsperanceVarianceTerminale(ShortProbaBinEsperanceVarianceBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
