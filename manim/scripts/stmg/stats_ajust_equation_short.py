# stats_ajust_equation_short.py
# EleveAI — Maths STMG — short jumeau de 22-ajust-equation. CEINTURE ORANGE
# (un cran sous la paysage bleue : un seul calcul, la pente). Il AMUSE :
#   · « chaque année, plus de 2 mois et demi de vie en plus ! » ;
#   · en HAUT, le cœur et les nombres ; EN MÊME TEMPS, en bas, les deux points,
#     la marche orange (+50 en x) et violette (+11 en y) sous la droite bleue ;
#   · 1 question-pause (3 s) : combien par an ? (0,22 ; leurres 4,5 = 50 ÷ 11, 11) ;
#   · fin : en 10 ans ? (2,2 ans), à répondre en commentaire.
# ⭐ Données RÉELLES : voir l'en-tête de stats_ajust_equation.py.
#
# Voix : manim/voix/stmg-stats-ajust-equation-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_equation_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_ajust_equation_short.py StatsAjustEquationShort -o eleveai-maths-stmg-stats-ajust-equation-short --media_dir manim/scripts/stmg/media-stats-ajust-equation-short
# Sortie : manim/sorties/stmg/maths/statistiques/22-ajust-equation/eleveai-maths-stmg-stats-ajust-equation-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403
from stats_ajust_equation import A, B, EV, XS, coeur  # noqa: E402

Y_IMG = 1.7


class StatsAjustEquationShort(ShortJ1):
    nom_voix = "stmg-stats-ajust-equation-short"
    fichier_marques = "stats_ajust_equation_short_marques.json"

    def nuage(self):
        n = Nuage(XS, EV, 0, 70, 60, 90, pas_x=20, pas_y=10, fin_x=10, fin_y=5, largeur=3.1, hauteur=2.6, fs=19,
                  nom_x="Années depuis 1950", nom_y="Espérance de vie")
        return self.caser_nuage(n)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Combien par an ?", "orange")
        self.add(badge)
        n = self.nuage()
        c = coeur(0.75).move_to(P(-1.6, Y_IMG + 0.05))

        # ── 00 : 1960 et 2010 ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(c, scale=0.5), run_time=0.6)
        garder = [badge, titre, self.mobjects[0]]
        t0 = self.ligne([("73,6 ans", VIOLET_CLAIR), ("en 1960", WHITE)], 30)
        t1 = self.ligne([("84,6 ans", VIOLET_CLAIR), ("en 2010", WHITE)], 30)
        for t, y in ((t0, Y_IMG + 0.25), (t1, Y_IMG - 0.25)):
            t.scale_to_fit_width(min(t.width, 2.75)).move_to(P(0.6, y))
        self.reveler([(VGroup(t0[0], n.ronds[0]), "73,6"), (t0[1], "1960,"), (VGroup(t1[0], n.ronds[5]), "84,6"),
                      (t1[1], "2010.")])
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=2) for i in range(1, 5)], lag_ratio=0.2), run_time=0.6)
        self.au_mot("Combien de plus")
        self.play(c.animate.scale(1.25), run_time=0.2)
        self.play(c.animate.scale(1 / 1.25), run_time=0.2)
        self.attendre_voix(marge=0.1)
        self.play(FadeOut(VGroup(t0, t1)), run_time=0.25)

        # ── 01 : la marche ──
        self.dire("01-image")
        self.play(Create(droite(n, A, B, sw=5)), run_time=0.5)
        coin = n.p(60, 73.6)
        dy = Line(coin, n.ronds[5].get_center(), color=VIOLET_H, stroke_width=6)
        dx = Line(n.ronds[0].get_center(), coin, color=ORANGE_V, stroke_width=6)
        self.au_mot("11 ans de plus")
        u = self.ligne([("+11 ans", VIOLET_CLAIR)], 36).move_to(P(0.45, Y_IMG + 0.25))
        self.play(Create(dy), FadeIn(u), run_time=0.45)
        self.au_mot("50 ans")
        u2 = self.ligne([("en", WHITE), ("50 ans", ORANGE_V)], 36).move_to(P(0.45, Y_IMG - 0.3))
        self.play(Create(dx), FadeIn(u2), run_time=0.45)
        self.au_mot("La droite monte de 11")
        self.play(Indicate(dy, color=VIOLET_CLAIR), run_time=0.4)
        self.au_mot("avance de 50")
        self.play(Indicate(dx, color=ORANGE_V), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Combien gagne-t-on", "par an ?"],
                            ["0,22 an", "4,5 ans", "11 ans"], 0,
                            ["11 ÷ 50 = 0,22 an :", "plus de 2 mois et demi !"], mot_q="Combien",
                            mots_choix=["0,22 an", "4,5 ans", "11 ans"], mots_ph=["0,22 an,", "2 mois"])
        self.vider(garder)

        # ── 03 : en 10 ans, en commentaire ──
        self.dire("03-question")
        n2 = self.nuage()
        self.play(FadeIn(n2), Create(droite(n2, A, B, sw=5)), run_time=0.5)
        self.au_mot("0,22 an par an")
        t5 = self.ligne([("+0,22 an", VIOLET_CLAIR), ("par an", WHITE)], 34).move_to(P(0, Y_IMG + 0.25))
        self.play(FadeIn(t5), run_time=0.35)
        self.au_mot("10 ans")
        t6 = self.ligne([("en 10 ans :", WHITE), ("+ ? ans", ORANGE_RETENUE)], 36).move_to(P(0, Y_IMG + 0.25))
        x0 = 30
        st = VGroup(Line(n2.p(x0, A * x0 + B), n2.p(x0 + 10, A * x0 + B), color=ORANGE_V, stroke_width=6),
                    Line(n2.p(x0 + 10, A * x0 + B), n2.p(x0 + 10, A * (x0 + 10) + B), color=VIOLET_H, stroke_width=6))
        self.play(FadeOut(t5), FadeIn(t6), Create(st), run_time=0.45)
        self.insister(t6[1], 1.4)
        self.appel_commentaire(y=Y_IMG - 0.42)
