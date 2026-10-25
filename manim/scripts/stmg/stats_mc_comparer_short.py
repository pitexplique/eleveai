# stats_mc_comparer_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 29 « Comparer deux droites
# d'ajustement ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « un point qui casse tout » :
#   · EN HAUT, un avion vole au-dessus des années ; EN BAS, au même instant, le
#     nuage des passagers de Paris Aéroport se dessine, la droite colle (1,54) ;
#   · surprise : 2020, l'avion plonge pile au-dessus du point de 2020 (33,1) ;
#     l'écart (−78,2) devient un carré GÉANT (≈ 6 115) ;
#   · 1 question-pause (3 s) : 1,54 ou 1,91, laquelle garder ? ;
#   · fin : un écart de −10 pèse combien ? (réponse : 100).
# ⭐ Données RÉELLES : voir l'en-tête de stats_mc_comparer.py (Groupe ADP).
# Centres d'intérêt : transports.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-mc-comparer-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_mc_comparer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_mc_comparer_short.py StatsMcComparerShort -o eleveai-maths-stmg-stats-mc-comparer-short --media_dir manim/scripts/stmg/media-stats-mc-comparer-short
# Sortie : manim/sorties/stmg/maths/statistiques/29-mc-comparer/eleveai-maths-stmg-stats-mc-comparer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403
from stats_mc_comparer import XS, YS, D1, Y20, avion  # noqa: E402

Y_AV = 1.75   # la ligne de vol de l'avion
Y_T = 1.1     # la ligne de texte sous l'avion


class StatsMcComparerShort(ShortJ2):
    nom_voix = "stmg-stats-mc-comparer-short"
    fichier_marques = "stats_mc_comparer_short_marques.json"

    def nuage(self):
        n = Nuage(XS + [6], YS + [Y20], 0, 7, 0, 120, pas_x=1, pas_y=20, fin_x=1, fin_y=10, largeur=3.3, hauteur=2.9,
                  fs=19, nom_x="Rang de l'année", nom_y="Passagers (millions)")
        return self.caser_bas(n)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Un point qui casse tout", "orange")
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        n = self.nuage()
        av = avion(0.55).rotate(-PI / 4).move_to(P(n.p(0.5, 0)[0], Y_AV))

        # ── 00 : cinq années, la droite colle ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(av), run_time=0.25)
        self.au_mot("Cinq années")
        for i in range(5):  # l'avion passe au-dessus de chaque année, le point apparaît
            self.play(av.animate.set_x(n.p(XS[i], 0)[0]), FadeIn(n.ronds[i], scale=3), run_time=0.3)
        self.au_mot("la droite colle")
        d1 = droite(n, *D1, sw=5)
        self.play(Create(d1), run_time=0.6)
        self.au_mot("1,54")
        t0 = self.haut_txt([("somme des carrés :", WHITE), ("1,54", VERT_OK)], 28, Y_T)
        self.play(FadeIn(t0, shift=DOWN * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.1)

        # ── 01 : 2020, l'avion plonge, le carré géant ──
        self.dire("01-image")
        self.au_mot("Arrive 2020")
        t1 = self.haut_txt([("2020 :", WHITE), ("33,1 millions", VIOLET_CLAIR)], 28, Y_AV)
        self.play(FadeOut(t0), av.animate.set_x(n.p(6, 0)[0]), FadeIn(t1[0]), run_time=0.4)
        self.au_mot("33,1 millions")
        self.play(av.animate.rotate(-PI / 3).move_to(n.ronds[5].get_center() + UP * 0.35), FadeIn(n.ronds[5], scale=4),
                  FadeIn(t1[1]), run_time=0.4)
        self.play(FadeOut(av), Flash(n.ronds[5], color=ROUGE_ERREUR), run_time=0.45)
        self.au_mot("moins 78,2")
        rr = Line(n.ronds[5].get_center(), n.p(6, 111.3), color=AMBRE, stroke_width=5)
        self.play(Create(rr), run_time=0.4)
        t2 = self.haut_txt([("écart :", WHITE), ("−78,2", AMBRE)], 28, Y_T)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("environ 6 115")
        c = rr.get_length()
        sq = Square(c, stroke_color=ROSE_C, stroke_width=4, fill_color=ROSE_C, fill_opacity=0.35)
        sq.move_to(rr.get_center() + LEFT * c / 2)
        t3 = self.haut_txt([("au carré ≈", WHITE), ("6 115 !", ROUGE_ERREUR)], 30, Y_T)
        self.play(GrowFromEdge(sq, RIGHT), FadeOut(t2), FadeIn(t3), run_time=0.8)
        self.insister(t3[1], 1.3)
        self.au_mot("Un seul point écrase tout")
        self.play(Wiggle(sq), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Deux sommes : 1,54", "et 1,91. Laquelle garder ?"],
                            ["1,54", "1,91", "peu importe"], 0, ["La plus petite", "somme gagne."], mot_q="Deux droites")
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        self.au_mot("moins 10")
        sq2 = Square(1.6, stroke_color=ROSE_C, stroke_width=4, fill_color=ROSE_C, fill_opacity=0.35).move_to(P(0, 0.0))
        l = self.t("−10", 38, AMBRE).next_to(sq2, LEFT, buff=0.15)
        q = self.haut_txt([("(−10)² =", WHITE), ("?", ORANGE_RETENUE)], 40, Y_AV)
        self.play(GrowFromEdge(sq2, DOWN), FadeIn(l), FadeIn(q[0]), run_time=0.4)
        self.au_mot("Combien pèse-t-il")
        self.play(FadeIn(q[1], shift=DOWN * 0.1), run_time=0.3)
        self.insister(q[1], 1.6)
        self.appel_commentaire(y=-1.6)
