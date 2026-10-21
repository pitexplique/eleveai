# proba_conc_defi_short.py
# EleveAI — Maths Tle spé (micro concentration_defi) — short jumeau de
# « Exercice type bac sur la concentration ». Ceinture ORANGE.
# Il AMUSE : 60 % des joueurs finissent le niveau ; sur 500, pile 300, tu
# paries ? Mauvaise idée : P(X = 300) ≈ 0,036 (B(500 ; 0,6), calculé en
# Python). Dix VRAIS tirages (graines 0 à 9) : 283, 305, 293, 301, 275, 320,
# 281, 294, 309, 297 : jamais 300, mais tous proches.
#   · en HAUT l'écran du jeu, les 500 joueurs, puis la droite où tombent les
#     dix tirages autour de 300 ;
#   · en BAS, EN MÊME TEMPS : 60 %, pile 300 ?, ≈ 0,036, la liste des tirages ;
#   · fin : variance 0,24, δ = 0,02 : combien de joueurs pour une borne
#     ≤ 0,05 ? (réponse : 0,24 / (0,05 × 0,0004) = 12 000), « Réponds en
#     commentaire ! », puis « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/terminale-proba-conc-defi-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conc_defi_short.py ShortProbaConcDefiTerminale -o eleveai-maths-terminale-proba-conc-defi-short --media_dir manim/scripts/terminale/media-conc_defi-s

import sys
from math import comb
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_lgn import BLEU_NB, P, fraction, puissance, suite  # noqa: E402
from proba_conc_lgn_short import ShortConc  # noqa: E402
from proba_conc_defi import FINIT, grille_joueurs, niveau  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402

TIRAGES = [int((np.random.default_rng(g).random(500) < 0.6).sum()) for g in range(10)]
assert TIRAGES == [283, 305, 293, 301, 275, 320, 281, 294, 309, 297] and 300 not in TIRAGES
P300 = comb(500, 300) * 0.6 ** 300 * 0.4 ** 200
assert f"{P300:.3f}" == "0.036"
assert round(0.24 / (0.05 * 0.02 ** 2)) == 12000


class ShortProbaConcDefiTerminale(ShortConc):
    fichier_marques = "proba_conc_defi_short_marques.json"
    nom_voix = "terminale-proba-conc-defi-short"

    def construct(self):
        self.margo_bas()

        # ── 00 : 60 %, sur 500, pile 300 : tu paries ? ──
        self.dire("00-accroche")
        self.badge()
        nv = niveau(0.72).move_to(P(0, 0.7))
        self.au_mot("60 %")
        titre = suite(self.t("60 %", 66, FINIT), self.t("finissent", 40), buff=0.2)
        self.cap(titre).move_to(P(0, 3.25))
        self.play(FadeIn(nv), FadeIn(titre[0], scale=1.6), run_time=0.5)
        h = nv[6]
        self.play(h.animate.move_to(nv[5].get_center() + DOWN * 0.25), FadeIn(titre[1]), path_arc=-1.0, run_time=0.6)
        self.au_mot("Sur 500")
        g = grille_joueurs(cote=0.088, buff=0.034).move_to(P(0, 0.62))
        b500 = suite(self.t("500", 56, BLEU_NB), self.t("joueurs", 42), buff=0.2).move_to(P(0, -1.0))
        self.play(FadeOut(nv), FadeIn(g, lag_ratio=0.002), FadeIn(b500, shift=UP * 0.1), run_time=0.8)
        self.au_mot("pile 300")
        p3 = suite(self.t("pile", 44, ORANGE_RETENUE), self.t("300", 60, ORANGE_RETENUE), self.t("?", 56, ORANGE_RETENUE),
                   buff=0.18).move_to(P(0, -1.9))
        self.play(FadeIn(p3, scale=1.3), run_time=0.4)
        self.au_mot("tu paries")
        pari = self.t("Tu paries ?", 58, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(titre, pari), run_time=0.4)
        self.play(Wiggle(pari), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : ≈ 0,036 ; dix tirages, jamais 300 ──
        self.dire("01-image")
        self.au_mot("Mauvaise idée")
        mi = self.t("Mauvaise idée !", 52, ROUGE_ERREUR).move_to(P(0, 3.25))
        self.play(ReplacementTransform(pari, mi), run_time=0.4)
        self.au_mot("environ 0,036")
        pr = suite(self.t("≈", 56), self.t("0,036", 66, ROUGE_ERREUR), buff=0.2).move_to(P(0, -2.2))
        self.play(FadeOut(b500), p3.animate.move_to(P(0, -1.2)), FadeIn(pr, scale=1.6), run_time=0.5)
        self.insister(pr[1], 1.3)
        # la droite de 270 à 330, 300 au milieu
        self.au_mot("Dix tirages")
        x0, x1, y = -1.9, 1.9, 0.35
        X = lambda v: x0 + (x1 - x0) * (v - 270) / 60
        axe = Line(P(x0 - 0.1, y), P(x1 + 0.1, y), color=WHITE, stroke_width=4)
        trois = Line(P(X(300), y - 0.2), P(X(300), y + 1.55), color=ORANGE_RETENUE, stroke_width=4)
        l300 = self.t("300", 34, ORANGE_RETENUE).next_to(trois, DOWN, buff=0.12)
        self.play(FadeOut(VGroup(g, p3)), FadeOut(pr), Create(axe), Create(trois), FadeIn(l300), run_time=0.6)
        lis = VGroup()
        pts = VGroup()
        empile = {}
        for k, v in enumerate(TIRAGES):
            col = int((v - 270) // 6)
            hgt = empile.get(col, 0)
            empile[col] = hgt + 1
            pts.add(Dot(P(X(v), y + 0.25 + 0.3 * hgt), radius=0.12, color=FINIT))
        for k, ext in enumerate(["283,", "305,", "293,", "301…"]):
            self.au_mot(ext)
            t = self.t(ext, 46)
            lis.add(t)
            lis.arrange(RIGHT, buff=0.18)
            self.cap(lis, 4.0).move_to(P(0, -1.15))
            self.play(FadeIn(pts[k], shift=DOWN * 1.2), FadeIn(t, scale=1.3), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 1.2) for p in pts[4:]], lag_ratio=0.12), run_time=0.5)
        self.au_mot("jamais 300")
        jam = self.t("jamais 300 !", 52, ORANGE_RETENUE).move_to(P(0, -1.9))
        self.play(FadeIn(jam, scale=1.3), Indicate(trois, color=ORANGE_RETENUE), run_time=0.5)
        self.au_mot("tous restent proches")
        bd = Rectangle(width=X(325) - X(275), height=2.0, fill_color=FINIT, fill_opacity=0.18, stroke_width=0)
        bd.move_to(P(X(300), y + 0.9))
        pro = self.t("tous proches", 46, FINIT).move_to(P(0, -2.6))
        self.play(FadeIn(bd), FadeIn(pro, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : combien de joueurs ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 58, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(mi, et), FadeOut(VGroup(axe, trois, l300, pts, lis, jam, bd, pro)), run_time=0.4)
        fs = 44
        self.au_mot("variance 0,24")
        v = suite(self.t("variance", fs - 4), self.t("0,24", fs, FINIT), buff=0.2)
        v.move_to(P(0, 1.55))
        self.play(FadeIn(v, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("delta égale 0,02")
        d = suite(self.t("δ =", fs), self.t("0,02", fs, BLEU_NB), buff=0.15).move_to(P(0, 0.75))
        self.play(FadeIn(d, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("combien de joueurs")
        fr = fraction(self.t("0,24", fs, FINIT), suite(self.t("n ×", fs), puissance("0,02", "2", fs, BLEU_NB), buff=0.12))
        q = self.cap(suite(fr, self.t("≤ 0,05", fs, ORANGE_RETENUE), buff=0.2)).move_to(P(0, -0.35))
        nq = suite(self.t("n =", fs + 6), self.t("?", fs + 16, ORANGE_RETENUE), buff=0.2).move_to(P(0, -1.35))
        self.play(FadeIn(q, scale=1.15), FadeIn(nq, scale=1.3), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        self.appel(y=-2.45)
        self.attendre_voix(marge=1.2)

        self.fin("03-abonne")
