# proba_conc_fluctuation_short.py
# EleveAI — Maths Tle spé (micro concentration_fluctuation) — short jumeau de
# « Fluctuation d'échantillonnage en terminale ». Ceinture ORANGE.
# Il AMUSE : 70 % de réussite, ce soir 11 sur 20… elle a baissé ? Pas
# forcément ! Dix matchs simulés (le VRAI tirage de la paysage, graine 4788) :
# 14, 15, 11, 13… la fréquence saute de 0,55 à 0,85.
#   · en HAUT la cage, les 20 tirs du match (pastilles), puis le stat_graph ;
#   · en BAS, EN MÊME TEMPS : 70 %, 11 sur 20, la suite 14, 15, 11, 13…,
#     de 0,55 à 0,85 ;
#   · fin : p = 0,7, n = 400, δ = 0,1 : que vaut p(1 − p) / (nδ²) ?
#     (réponse : 0,21 / 4 = 0,0525), « Réponds en commentaire ! », puis
#     « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/terminale-proba-conc-fluctuation-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conc_fluctuation_short.py ShortProbaConcFluctuationTerminale -o eleveai-maths-terminale-proba-conc-fluctuation-short --media_dir manim/scripts/terminale/media-conc_fluct-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_lgn import BLEU_NB, P, suite  # noqa: E402
from proba_conc_lgn_short import ShortConc  # noqa: E402
from proba_conc_fluctuation import AMBRE, F_MATCH, MATCHS, REUSSI, TIRS, CarteBarres, ballon, borne, but, pastilles  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402

assert MATCHS.min() == 11 and MATCHS.max() == 17
assert abs(0.21 / (400 * 0.01) - 0.0525) < 1e-12


class ShortProbaConcFluctuationTerminale(ShortConc):
    fichier_marques = "proba_conc_fluctuation_short_marques.json"
    nom_voix = "terminale-proba-conc-fluctuation-short"

    def construct(self):
        self.margo_bas()

        # ── 00 : 70 %, ce soir 11 sur 20 : elle a baissé ? ──
        self.dire("00-accroche")
        self.badge()
        cage = but(0.95).move_to(P(0, 0.9))
        titre = suite(self.t("70 %", 66, REUSSI), self.t("de réussite", 40), buff=0.2)
        self.cap(titre).move_to(P(0, 3.25))
        self.au_mot("70 %")
        b = ballon(0.6).move_to(P(-1.4, -0.6))
        self.play(FadeIn(cage, scale=0.8), FadeIn(titre[0], scale=1.6), FadeIn(b), run_time=0.5)
        self.play(b.animate.move_to(cage.get_center() + P(0.7, 0.3)).scale(0.7), FadeIn(titre[1]),
                  path_arc=0.7, run_time=0.5)
        bas1 = suite(self.t("70 %", 54, REUSSI), self.t("des tirs", 40), buff=0.2).move_to(P(0, -0.9))
        self.play(TransformFromCopy(titre, bas1), run_time=0.4)
        self.au_mot("11 sur 20")
        pts = pastilles(TIRS[2], r=0.17, buff=0.06).move_to(P(0, 1.0))
        onze = suite(self.t("ce soir :", 38), self.t("11", 60, ORANGE_RETENUE), self.t("sur 20", 42), buff=0.2)
        self.cap(onze).move_to(P(0, -1.75))
        self.play(FadeOut(VGroup(cage, b)), LaggedStart(*[FadeIn(p, scale=0.3) for p in pts], lag_ratio=0.03),
                  FadeIn(onze, shift=UP * 0.15), run_time=0.9)
        self.au_mot("Elle a baissé")
        q = self.t("Elle a baissé ?", 52, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(titre, q), run_time=0.4)
        self.play(Wiggle(q), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : pas forcément ! dix matchs simulés ──
        self.dire("01-image")
        self.au_mot("Pas forcément")
        pf = self.t("Pas forcément !", 54, VERT_OK).move_to(P(0, 3.25))
        c = CarteBarres(F_MATCH, larg=4.2, haut=2.9, titre="Dix matchs simulés", bas="").move_to(P(0, 0.85))
        self.play(ReplacementTransform(q, pf), FadeOut(VGroup(pts, bas1, onze)),
                  FadeIn(VGroup(c.carte, c.titre, c.ax, c.ay)), run_time=0.5)
        nombres = VGroup()
        for i, extrait in enumerate(["14,", "15,", "11,", "13…"]):
            self.au_mot(extrait)
            n = self.t(str(MATCHS[i]) + ("…" if i == 3 else ","), 50, ORANGE_RETENUE if i == 2 else WHITE)
            nombres.add(n)
            nombres.arrange(RIGHT, buff=0.2)
            self.cap(nombres, 3.9).move_to(P(0, -1.0))
            self.play(GrowFromEdge(c.barres[i], DOWN), FadeIn(n, scale=1.4),
                      run_time=0.35)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in c.barres[4:]], lag_ratio=0.12), run_time=0.8)
        self.au_mot("de 0,55")
        de = suite(self.t("de", 40), self.t("0,55", 56, ORANGE_RETENUE), buff=0.2)
        a = suite(self.t("à", 40), self.t("0,85", 56, REUSSI), buff=0.2)
        ligne = self.cap(suite(de, a, buff=0.35)).move_to(P(0, -2.0))
        self.play(FadeIn(de, shift=UP * 0.1), c.activer(2, ORANGE_RETENUE), run_time=0.4)
        self.au_mot("à 0,85")
        self.play(FadeIn(a, shift=UP * 0.1), c.activer(7, REUSSI), run_time=0.4)
        self.play(c.barres[2].animate.stretch(1.12, 1, about_edge=DOWN),
                  c.barres[7].animate.stretch(1.12, 1, about_edge=DOWN), run_time=0.25)
        self.play(c.barres[2].animate.stretch(1 / 1.12, 1, about_edge=DOWN),
                  c.barres[7].animate.stretch(1 / 1.12, 1, about_edge=DOWN), run_time=0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : la borne pour 400 tirs ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 58, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(pf, et), FadeOut(VGroup(c, nombres, ligne)), run_time=0.4)
        fs = 44
        self.au_mot("p égale 0,7")
        pp = suite(self.t("p =", fs), self.t("0,7", fs, REUSSI), buff=0.15)
        nn = suite(self.t("n =", fs), self.t("400", fs, BLEU_NB), buff=0.15)
        dd = suite(self.t("δ =", fs), self.t("0,1", fs, AMBRE), buff=0.15)
        VGroup(pp, nn, dd).arrange(DOWN, buff=0.2, aligned_edge=LEFT).move_to(P(0, 0.85))
        self.play(FadeIn(pp, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("n égale 400")
        self.play(FadeIn(nn, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("delta égale 0,1")
        self.play(FadeIn(dd, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("que vaut")
        bo = borne(48, ORANGE_RETENUE)
        qv = self.cap(suite(bo, self.t("= ?", 56, ORANGE_RETENUE), buff=0.25)).move_to(P(0, -0.95))
        self.play(FadeIn(qv, scale=1.2), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        self.appel(y=-2.35)
        self.attendre_voix(marge=1.2)

        self.fin("03-abonne")
