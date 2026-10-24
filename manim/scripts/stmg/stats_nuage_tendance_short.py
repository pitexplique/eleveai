# stats_nuage_tendance_short.py
# EleveAI — Maths 1re (tronc commun) / STMG — short jumeau de l'épisode
# « Décrire la tendance d'un nuage ». CEINTURE ORANGE (un cran sous la paysage
# verte de 1re). Il AMUSE : « plus c'est loin de l'équateur, plus il fait froid ? »
#   · en HAUT, un globe : le repère jaune monte en latitude ; EN MÊME TEMPS, en
#     bas, la ville qu'il atteint apparaît dans le nuage du coach ;
#   · la flèche de tendance descend ; surprise : Montréal, plus au sud que Paris,
#     est bien plus froide (7 °C) ;
#   · 1 question-pause (3 s) : alignés, tendance, ou aucun lien ? ;
#   · fin : Tunis, 37° de latitude : quelle température ? (en vrai 18,4 °C).
# ⭐ Données RÉELLES : voir l'en-tête de stats_nuage_tendance.py.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
#
# Voix : manim/voix/lycee-stats-nuage-tendance-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_nuage_tendance_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_nuage_tendance_short.py StatsNuageTendanceShort -o eleveai-maths-stmg-stats-nuage-tendance-short --media_dir manim/scripts/stmg/media-stats-nuage-tendance-short
# Sorties : manim/sorties/stmg/maths/statistiques/19-nuage-tendance/eleveai-maths-stmg-stats-nuage-tendance-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/13-nuage-tendance/eleveai-maths-premiere-commun-stats-nuage-tendance-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403
from stats_nuage_tendance import LAT, TEMP, globe  # noqa: E402

Y_IMG, Y_TXT = 1.6, 0.95
HAUT_CARTE = 0.5
GX = -1.3  # le globe, à gauche de la bande du haut


class StatsNuageTendanceShort(ShortH2):
    nom_voix = "lycee-stats-nuage-tendance-short"
    fichier_marques = "stats_nuage_tendance_short_marques.json"

    def nuage(self, xs=LAT, ys=TEMP):
        n = Nuage(xs, ys, 0, 60, 0, 30, pas_x=10, pas_y=10, fin_x=2, fin_y=2, largeur=3.1, hauteur=2.6, fs=19,
                  nom_x="Latitude (°)", nom_y="Température (°C)")
        n.scale_to_fit_width(min(n.width, config.frame_width - 0.3))
        if n.height > HAUT_CARTE + 3.72:  # jamais collé au bas du cadre
            n.scale_to_fit_height(HAUT_CARTE + 3.72)
        return n.move_to(P(0, HAUT_CARTE - n.height / 2))

    def droite_txt(self, morceaux, fs=30, y=Y_IMG + 0.2):
        """Un texte dans la bande du haut, à droite du globe."""
        t = self.ligne(morceaux, fs)
        t.scale_to_fit_width(min(t.width, 2.45)).move_to(P(0.8, y))
        return t

    def repere(self, g, lat):
        """Le point jaune sur le globe, à la latitude lat (en degrés)."""
        c, r = g[0].get_center(), g[0].width / 2
        a = np.radians(lat)
        return c + r * np.array([np.cos(a) * 0.35, np.sin(a), 0])

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Chaud ou froid ?", "orange")
        self.add(badge)
        n = self.nuage()
        g = globe(0.62).move_to(P(GX, Y_IMG))

        # ── 00 : l'équateur, puis Bruxelles ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), GrowFromCenter(g), run_time=0.6)
        self.au_mot("Libreville")
        rp = Dot(self.repere(g, 0), radius=0.08, color=JAUNE_TITRE)
        t0 = self.droite_txt([("Libreville", WHITE)])
        self.play(FadeIn(rp, scale=2), FadeIn(n.ronds[0], scale=3), FadeIn(t0), run_time=0.4)
        self.au_mot("25,9 degrés")
        t0b = self.droite_txt([("25,9 °C", VIOLET_CLAIR)], 30, Y_IMG - 0.25)
        self.play(FadeIn(t0b), FadeIn(n.lu_y(25.9)), run_time=0.35)
        self.au_mot("Bruxelles")
        t1 = self.droite_txt([("Bruxelles", WHITE)])
        self.play(rp.animate.move_to(self.repere(g, 51)), FadeIn(n.ronds[8], scale=3), FadeOut(VGroup(t0, t0b)),
                  FadeIn(t1), run_time=0.6)
        self.au_mot("51 degrés")
        t1b = self.droite_txt([("51°", ORANGE_V)], 30, Y_IMG - 0.25)
        self.play(FadeIn(t1b), FadeIn(n.lu_x(51), scale=1.4), run_time=0.35)
        self.au_mot("10,5")
        t1c = self.droite_txt([("51°", ORANGE_V), ("→", WHITE), ("10,5 °C", VIOLET_CLAIR)], 30, Y_IMG - 0.25)
        self.play(FadeOut(t1b), FadeIn(t1c), FadeIn(n.lu_y(10.5)), run_time=0.35)
        self.attendre_voix(marge=0.1)

        # ── 01 : la tendance, et la surprise de Montréal ──
        self.dire("01-image")
        self.au_mot("Les points descendent")
        self.play(FadeOut(VGroup(t1, t1c)), run_time=0.2)
        for i in range(1, 8):  # le repère monte, la ville apparaît
            self.play(rp.animate.move_to(self.repere(g, LAT[i])), FadeIn(n.ronds[i], scale=3), run_time=0.14)
        fl = Arrow(n.p(0, 28.5), n.p(56, 7.5), buff=0, color=VERT_OK, stroke_width=8,
                   max_tip_length_to_length_ratio=0.08).set_opacity(0.6)
        self.au_mot("tendance décroissante")
        t2 = self.droite_txt([("décroissante !", VERT_OK)], 32)
        self.play(GrowArrow(fl), FadeIn(t2), run_time=0.6)
        self.au_mot("Montréal")
        t3 = self.droite_txt([("Montréal", WHITE)], 30, Y_IMG - 0.25)
        self.play(rp.animate.move_to(self.repere(g, 46)), n.allumer(6), FadeIn(t3), run_time=0.45)
        self.au_mot("plus au sud que Paris")
        par = Circle(radius=0.12, stroke_color=AMBRE, stroke_width=4).move_to(n.ronds[7])
        self.play(Create(par), run_time=0.35)
        self.au_mot("7 degrés seulement")
        t4 = self.droite_txt([("Montréal :", WHITE), ("7 °C", VIOLET_CLAIR)], 30, Y_IMG - 0.25)
        self.play(FadeOut(t3), FadeIn(t4), FadeIn(n.lu_y(7)), Create(n.vers_y(6)), run_time=0.45)
        self.play(Flash(n.ronds[6], color=AMBRE), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Les points de ce nuage", "sont-ils…"],
                            ["exactement alignés ?", "proches d'une tendance ?", "sans aucun lien ?"], 1,
                            ["Une tendance,", "pas une droite parfaite."], mot_q="Les points")
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 03 : Tunis, en commentaire ──
        self.dire("03-question")
        n2 = self.nuage()
        fl2 = Arrow(n2.p(0, 28.5), n2.p(56, 7.5), buff=0, color=VERT_OK, stroke_width=8,
                    max_tip_length_to_length_ratio=0.08).set_opacity(0.6)
        self.play(FadeIn(n2), FadeIn(fl2), run_time=0.4)
        self.au_mot("Tunis")
        t5 = self.ligne([("Tunis", JAUNE_TITRE)], 38).move_to(P(0, Y_IMG + 0.2))
        self.play(FadeIn(t5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("37 degrés")
        t6 = self.ligne([("Tunis :", JAUNE_TITRE), ("37°", ORANGE_V), ("→", WHITE), ("? °C", ORANGE_RETENUE)], 38)
        t6.move_to(P(0, Y_IMG + 0.2))
        self.play(FadeOut(t5), FadeIn(t6), Create(n2.verticale(37)), FadeIn(n2.lu_x(37), scale=1.4), run_time=0.45)
        self.au_mot("Quelle température")
        self.insister(t6[3], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
