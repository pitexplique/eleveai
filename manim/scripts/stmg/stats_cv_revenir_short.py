# stats_cv_revenir_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 32 « Revenir aux variables de
# départ ». CEINTURE VERTE (un cran sous la paysage bleue).
# Il AMUSE : « le piège du 10 fois » :
#   · EN HAUT, le calcul s'écrit ; EN BAS, au même instant, le point de 2030
#     tombe là où le calcul l'envoie dans le nuage de la population de l'Afrique ;
#   · surprise : « 10 × 3,259 » envoie le point SOUS 1960 (32,59 millions,
#     absurde) ; « 10 puissance 3,259 » le pose dans la tendance (≈ 1 816) ;
#   · 1 question-pause (3 s) : z = 2 → y = 20, 100 ou 2 ? ;
#   · fin : z = 3 → y ? (réponse : 1 000).
# ⭐ Données RÉELLES : voir l'en-tête de stats_cv_revenir.py (ONU, WPP 2024).
# Centres d'intérêt : histoire-geographie.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-cv-revenir-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_cv_revenir_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_cv_revenir_short.py StatsCvRevenirShort -o eleveai-maths-stmg-stats-cv-revenir-short --media_dir manim/scripts/stmg/media-stats-cv-revenir-short
# Sortie : manim/sorties/stmg/maths/statistiques/32-cv-revenir/eleveai-maths-stmg-stats-cv-revenir-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403
from stats_cv_revenir import XS, YS, Y7  # noqa: E402
from stats_cv_lire import puiss  # noqa: E402

Y1, Y2 = 1.85, 1.25


class StatsCvRevenirShort(ShortJ2):
    nom_voix = "stmg-stats-cv-revenir-short"
    fichier_marques = "stats_cv_revenir_short_marques.json"

    def nuage(self):
        n = Nuage(XS, YS, 0, 8, 0, 2500, pas_x=2, pas_y=500, fin_x=1, fin_y=250, largeur=3.2, hauteur=2.7, fs=19,
                  nom_x="Rang de la décennie (x)", nom_y="Afrique (millions)")
        return self.caser_bas(n)

    def centre(self, m, y):
        if m.width > config.frame_width - 0.6:
            m.scale_to_fit_width(config.frame_width - 0.6)
        return m.move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le piège du 10 fois", "verte")
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        n = self.nuage()

        # ── 00 : z = 3,259 ; combien d'habitants ? ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.25)
        self.au_mot("2030")
        v = n.verticale(7)
        self.play(Create(v), FadeIn(n.lu_x(7)), run_time=0.4)
        self.au_mot("z égale 3,259")
        t1 = self.centre(self.ligne([("z =", WHITE), ("3,259", VERT_OK)], 36), Y1)
        self.play(FadeIn(t1, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("avec z égale log de y")
        t1b = self.centre(self.ligne([("z = 3,259", VERT_OK), ("avec", WHITE), ("z = log(y)", VERT_OK)], 30), Y1)
        self.play(Transform(t1, t1b), run_time=0.35)
        self.au_mot("Combien d'habitants")
        t2 = self.centre(self.ligne([("y =", AMBRE), ("?", ORANGE_RETENUE)], 40), Y2)
        self.play(FadeIn(t2, scale=0.7), run_time=0.35)
        self.attendre_voix(marge=0.1)

        # ── 01 : le piège, puis la bonne puissance ──
        self.dire("01-image")
        self.au_mot("10 fois 3,259")
        self.play(FadeOut(t2), run_time=0.2)
        f = self.centre(self.t("10 × 3,259", 38), Y2)
        self.play(FadeIn(f), run_time=0.3)
        self.au_mot("32,59 millions")
        faux = Dot(n.p(7, 32.59), radius=0.09, fill_color=ROUGE_ERREUR, stroke_color=WHITE, stroke_width=2)
        f2 = self.centre(self.ligne([("10 × 3,259 =", WHITE), ("32,59", ROUGE_ERREUR)], 34), Y2)
        self.play(Transform(f, f2), FadeIn(faux, scale=3), run_time=0.4)
        self.au_mot("absurde")
        barre = Line(f.get_left(), f.get_right(), color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), Flash(faux, color=ROUGE_ERREUR),
                  Indicate(n.ronds[0], color=AMBRE, scale_factor=2), run_time=0.6)
        self.au_mot("10 puissance 3,259")
        self.play(FadeOut(VGroup(t1)), run_time=0.2)
        p = self.centre(VGroup(self.t("y =", 36, AMBRE), puiss("10", "3,259", 44, AMBRE)).arrange(RIGHT, buff=0.15), Y1)
        self.play(FadeIn(p, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("environ 1 816 millions")
        bon = Dot(n.p(7, Y7), radius=0.1, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        r = self.centre(self.ligne([("≈", WHITE), ("1 816 millions", VERT_OK)], 34), Y2)
        self.play(FadeOut(VGroup(f, barre)), FadeIn(bon, scale=3), FadeIn(r), faux.animate.set_opacity(0.3), run_time=0.5)
        self.play(Flash(bon, color=VERT_OK), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["z = 2, avec z = log(y).", "Que vaut y ?"],
                            ["20", "100", "2"], 1, ["10 puissance 2 = 100"], mot_q="z égale 2")
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        self.au_mot("z égale 3")
        q1 = self.centre(self.ligne([("z = 3", VERT_OK), ("avec", WHITE), ("z = log(y)", VERT_OK)], 32), 0.9)
        self.play(FadeIn(q1, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Que vaut y")
        q = self.centre(self.ligne([("y =", AMBRE), ("?", ORANGE_RETENUE)], 56), 0.0)
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.insister(q[1], 1.3)
        self.appel_commentaire(y=-1.3)
