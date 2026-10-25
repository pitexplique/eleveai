# stats_cv_appliquer_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 30 « Effectuer un changement
# de variable ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « le taxi et 1 sur x » :
#   · EN HAUT, un taxi roule 4 km puis 25 km ; EN BAS, au même instant, le point
#     de la course apparaît dans le nuage (prix par km) ;
#   · surprise : la prise en charge (4,48 €) se partage ; le nuage courbe se
#     REDRESSE quand on remplace x par z = 1/x ;
#   · 1 question-pause (3 s) : 10 km, z = 0,1, 10 ou 100 ? ;
#   · fin : 8 km, que vaut z ? (réponse : 0,125).
# ⭐ Données RÉELLES : voir l'en-tête de stats_cv_appliquer.py (tarifs 2026).
# Centres d'intérêt : argent-budget, transports.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-cv-appliquer-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_cv_appliquer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_cv_appliquer_short.py StatsCvAppliquerShort -o eleveai-maths-stmg-stats-cv-appliquer-short --media_dir manim/scripts/stmg/media-stats-cv-appliquer-short
# Sortie : manim/sorties/stmg/maths/statistiques/30-cv-appliquer/eleveai-maths-stmg-stats-cv-appliquer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403
from stats_cv_appliquer import XS, YS, ZS, taxi  # noqa: E402

Y_ROUTE, Y_T = 1.3, 1.88


class StatsCvAppliquerShort(ShortJ2):
    nom_voix = "stmg-stats-cv-appliquer-short"
    fichier_marques = "stats_cv_appliquer_short_marques.json"

    def nuage(self, z=False):
        if z:
            n = Nuage(ZS, YS, 0, 0.3, 1, 2.6, pas_x=0.1, pas_y=0.4, fin_x=0.05, fin_y=0.2, largeur=3.2, hauteur=2.7,
                      fs=19, nom_x="z = 1/x", nom_y="Prix par km (€)")
        else:
            n = Nuage(XS, YS, 0, 30, 1, 2.6, pas_x=10, pas_y=0.4, fin_x=5, fin_y=0.2, largeur=3.2, hauteur=2.7,
                      fs=19, nom_x="Course x (km)", nom_y="Prix par km (€)")
        return self.caser_bas(n)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le taxi et 1 sur x", "orange")
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        n = self.nuage()
        route = Line(P(-1.95, Y_ROUTE - 0.25), P(1.95, Y_ROUTE - 0.25), color=GREY_B, stroke_width=4)
        tx = taxi(0.42).move_to(P(-1.4, Y_ROUTE))
        x0 = -1.4

        def xr(km):  # la position sur la route (0 à 25 km)
            return x0 + km / 25 * 2.8

        # ── 00 : 4 km, puis 25 km ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), Create(route), FadeIn(tx), run_time=0.25)
        self.au_mot("2,42 euros")
        t1 = self.haut_txt([("2,42 € le km", VIOLET_CLAIR)], 30, Y_T)
        lus = [n.lu_y(2.42), n.lu_x(4), n.lu_y(1.48), n.lu_x(25)]
        self.play(FadeIn(t1), FadeIn(n.ronds[0], scale=3), FadeIn(lus[0]), tx.animate.set_x(xr(4)), run_time=0.4)
        self.au_mot("4 kilomètres")
        t1b = self.haut_txt([("4 km :", ORANGE_V), ("2,42 € le km", VIOLET_CLAIR)], 30, Y_T)
        self.play(Transform(t1, t1b), FadeIn(lus[1]), run_time=0.35)
        self.au_mot("mais 1,48")
        self.play(tx.animate.set_x(xr(22)), FadeOut(t1), run_time=0.5)
        self.au_mot("1,48 euro")
        t2 = self.haut_txt([("1,48 € le km", VIOLET_CLAIR)], 30, Y_T)
        self.play(FadeIn(t2), FadeIn(n.ronds[5], scale=3), FadeIn(lus[2]), tx.animate.set_x(xr(25)), run_time=0.4)
        self.au_mot("25 kilomètres")
        t2b = self.haut_txt([("25 km :", ORANGE_V), ("1,48 € le km", VIOLET_CLAIR)], 30, Y_T)
        self.play(Transform(t2, t2b), FadeIn(lus[3]), run_time=0.35)
        self.au_mot("Pourquoi")
        self.play(Indicate(t2, color=AMBRE, scale_factor=1.0), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : la prise en charge se partage ; le nuage se redresse ──
        self.dire("01-image")
        self.au_mot("4,48 euros")
        self.play(FadeOut(t2), tx.animate.set_x(xr(0)), run_time=0.4)
        pc = self.haut_txt([("4,48 €", AMBRE), ("partagés", WHITE)], 30, Y_T)
        self.play(FadeIn(pc, scale=0.7), run_time=0.35)
        self.au_mot("se partage")
        bouts = VGroup(*[Rectangle(width=3.4 / 6, height=0.14, fill_color=AMBRE, fill_opacity=0.9, stroke_color=BLACK,
                                   stroke_width=2) for _ in range(6)]).arrange(RIGHT, buff=0).move_to(P(0, Y_ROUTE - 0.25))
        self.play(LaggedStart(*[FadeIn(b) for b in bouts], lag_ratio=0.2), tx.animate.set_x(xr(25)), run_time=1.0)
        self.apparaitre_points_short(n)
        self.au_mot("Le nuage est courbe")
        courbe = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=4).set_points_smoothly(
            [n.p(x, 4.48 / x + 1.30) for x in (3.2, 4, 5, 6.5, 8, 10, 14, 20, 25, 29)])
        self.play(Create(courbe), run_time=0.6)
        self.au_mot("avec z égale 1 sur x")
        m = self.nuage(z=True)
        zt = self.haut_txt([("x", ORANGE_V), ("→", WHITE), ("z = 1/x", VERT_OK)], 34, Y_T)
        self.play(FadeOut(pc), FadeIn(zt, scale=0.7), FadeOut(courbe), run_time=0.4)
        n.ronds.set_z_index(5)
        self.play(*[n.ronds[i].animate.move_to(m.ronds[i]) for i in range(6)], FadeTransform(n.fond, m.fond),
                  *[FadeOut(x) for x in lus],
                  run_time=1.2)
        self.au_mot("tout droit")
        self.play(Create(droite(m, 4.48, 1.30, BLEU_D, 5)), run_time=0.6)
        ok = self.haut_txt([("Tout droit !", VERT_OK)], 36, Y_ROUTE + 0.05)
        self.play(FadeOut(VGroup(tx, route, bouts)), FadeIn(ok, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Course de 10 km :", "que vaut z = 1/x ?"],
                            ["0,1", "10", "100"], 0, ["1 ÷ 10 = 0,1"], mot_q="Pour 10")
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        self.au_mot("8 kilomètres")
        tx2 = taxi(0.9).move_to(P(0, 0.3))
        l8 = self.t("8 km", 44, ORANGE_V).next_to(tx2, DOWN, buff=0.3)
        self.play(FadeIn(tx2, shift=RIGHT * 0.6), FadeIn(l8), run_time=0.5)
        self.au_mot("que vaut z")
        q = self.haut_txt([("z = 1/x =", VERT_OK), ("?", ORANGE_RETENUE)], 44, Y_T - 0.3)
        self.play(FadeIn(q, shift=DOWN * 0.1), run_time=0.35)
        self.insister(q[1], 1.6)
        self.appel_commentaire(y=-1.6)

    def apparaitre_points_short(self, n):
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in (1, 2, 3, 4)], lag_ratio=0.15), run_time=0.6)
