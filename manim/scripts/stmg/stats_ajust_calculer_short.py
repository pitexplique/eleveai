# stats_ajust_calculer_short.py
# EleveAI — Maths STMG — short jumeau de 23-ajust-calculer. CEINTURE ORANGE
# (un cran sous la paysage verte : un seul calcul). Il AMUSE :
#   · en HAUT, une éolienne qui tourne et le calcul du moment ; EN MÊME TEMPS,
#     en bas, la verticale orange monte de x = 8 à la droite, l'horizontale
#     violette file vers l'axe ;
#   · 1 question-pause (3 s) : 1,5 × 8 + 11,8 ? (23,8 ; leurres 21,3 et 29,7) ;
#     surprise : en vrai, fin 2024, le parc a dépassé 24 GW ;
#   · fin : en quelle année la droite dépasse 30 GW ? (rang 13 → 2029).
# ⭐ Données RÉELLES : voir l'en-tête de stats_ajust_calculer.py.
#
# Voix : manim/voix/stmg-stats-ajust-calculer-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_calculer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_ajust_calculer_short.py StatsAjustCalculerShort -o eleveai-maths-stmg-stats-ajust-calculer-short --media_dir manim/scripts/stmg/media-stats-ajust-calculer-short
# Sortie : manim/sorties/stmg/maths/statistiques/23-ajust-calculer/eleveai-maths-stmg-stats-ajust-calculer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403
from stats_ajust_calculer import A, B, EOL, RANGS, eolienne  # noqa: E402

Y_IMG = 1.7


class StatsAjustCalculerShort(ShortJ1):
    nom_voix = "stmg-stats-ajust-calculer-short"
    fichier_marques = "stats_ajust_calculer_short_marques.json"

    def nuage(self, grand=False):
        if grand:
            n = Nuage(RANGS, EOL, 0, 16, 10, 35, pas_x=4, pas_y=5, fin_x=1, fin_y=5, largeur=3.1, hauteur=2.6, fs=19,
                      nom_x="Rang (1 = 2017)", nom_y="Puissance (GW)")
        else:
            n = Nuage(RANGS, EOL, 0, 10, 10, 30, pas_x=2, pas_y=5, fin_x=1, fin_y=5, largeur=3.1, hauteur=2.6, fs=19,
                      nom_x="Rang (1 = 2017)", nom_y="Puissance (GW)")
        return self.caser_nuage(n)

    def tourner(self, e, k=1, rt=0.6):
        return Rotate(e.pales, -k * TAU / 3, about_point=e.rond.get_center(), run_time=rt)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Une équation, une prévision", "orange")
        self.add(badge)
        n = self.nuage()
        e = eolienne(0.85).move_to(P(-1.75, Y_IMG - 0.05))

        # ── 00 : les données et l'équation ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(e, shift=UP * 0.2), run_time=0.6)
        garder = [badge, titre, self.mobjects[0]]
        t0 = self.ligne([("13,5 GW", VIOLET_CLAIR), ("en 2017", WHITE)], 28).move_to(P(0.45, Y_IMG + 0.25))
        t1 = self.ligne([("22,5 GW", VIOLET_CLAIR), ("en 2023", WHITE)], 28).move_to(P(0.45, Y_IMG - 0.25))
        self.reveler([(VGroup(t0[0], n.ronds[0]), "13,5 gigawatts"), (t0[1], "2017,"),
                      (VGroup(t1[0], *n.ronds[1:]), "22,5 en"), (t1[1], "2023.")])
        eq = self.ligne([("y =", WHITE), ("1,5", AMBRE), ("x +", WHITE), ("11,8", VIOLET_CLAIR)], 34)
        eq.scale_to_fit_width(min(eq.width, 2.75)).move_to(P(0.5, Y_IMG))
        self.au_mot("y égale")
        self.play(FadeOut(VGroup(t0, t1)), FadeIn(eq[0]), Create(droite(n, A, B, sw=5)), self.tourner(e), run_time=0.5)
        self.reveler([(eq[1:3], "1,5 x"), (eq[3], "11,8,")])
        self.attendre_voix(marge=0.1)

        # ── 01 : x = 8, le geste ──
        self.dire("01-image")
        self.au_mot("2024,")
        self.play(eq.animate.move_to(P(0.5, Y_IMG + 0.3)), run_time=0.25)
        t2 = self.ligne([("2024 :", WHITE), ("x = 8", ORANGE_V)], 30).move_to(P(0.5, Y_IMG - 0.3))
        self.play(FadeIn(t2[0]), run_time=0.2)
        self.reveler([(VGroup(t2[1], n.lu_x(8)), "8, que")])
        self.au_mot("je monte jusqu'à la droite")
        v, h = lecture(n, A, B, 8)
        self.play(Create(v), self.tourner(e), run_time=0.5)
        self.play(FadeIn(point_droite(n, A, B, 8), scale=2), run_time=0.2)
        self.au_mot("je file vers l'axe")
        self.play(Create(h), self.tourner(e), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["1,5 × 8 + 11,8 = ?"], ["23,8", "21,3", "29,7"], 0,
                            ["12 + 11,8 = 23,8 GW.", "En vrai, fin 2024 : plus de 24 GW !"], mot_q="11,8, ça",
                            mots_choix=["23,8.", "21,3.", "29,7."], mots_ph=["23,8. Et", "24 gigawatts"])
        self.vider(garder)

        # ── 03 : 30 GW, en commentaire ──
        self.dire("03-question")
        n2 = self.nuage(grand=True)
        self.play(FadeIn(n2), Create(droite(n2, A, B, sw=5)), run_time=0.5)
        self.au_mot("30 gigawatts")
        t5 = self.ligne([("30 GW :", VIOLET_CLAIR), ("en quelle année ?", ORANGE_RETENUE)], 32).move_to(P(0, Y_IMG + 0.2))
        self.play(FadeIn(t5), Create(n2.horizontale(30)), FadeIn(n2.lu_y(30)), run_time=0.5)
        self.insister(t5[1], 1.15)
        self.appel_commentaire(y=Y_IMG - 0.42)
