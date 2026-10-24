# stats_nuage_construire_short.py
# EleveAI — Maths 1re (tronc commun) / STMG — short jumeau de l'épisode
# « Construire un nuage de points ». CEINTURE ORANGE (un cran sous la paysage
# verte). Il AMUSE : « la plus petite ligne du métro de Paris : 4 stations ! »
#   · en HAUT, la rame passe les 4 stations de la ligne 3bis ; à chaque station,
#     EN MÊME TEMPS, la flèche violette monte d'un carreau dans le nuage en bas ;
#   · le point (1 ; 4) se pose, puis la ligne 9 (20 ; 37) tout là-haut ;
#   · 1 question-pause (3 s) : la ligne 7bis, 3 km et 8 stations : quel point ? ;
#   · fin : la ligne 6, 14 km et 28 stations : ses coordonnées en commentaire.
# ⭐ Données RÉELLES : voir l'en-tête de stats_nuage_construire.py.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
#
# Voix : manim/voix/lycee-stats-nuage-construire-short.json (débit −7) ;
# marques : manim/scripts/stmg/stats_nuage_construire_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_nuage_construire_short.py StatsNuageConstruireShort -o eleveai-maths-stmg-stats-nuage-representer-short --media_dir manim/scripts/stmg/media-stats-nuage-construire-short
# Sorties : manim/sorties/stmg/maths/statistiques/17-nuage-representer/eleveai-maths-stmg-stats-nuage-representer-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/12-nuage-construire/eleveai-maths-premiere-commun-stats-nuage-construire-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403
from stats_nuage_construire import METRO, rame  # noqa: E402

Y_IMG, Y_TXT = 1.7, 0.95
HAUT_CARTE = 0.5
XS, YS = [1, 20], [4, 37]


class StatsNuageConstruireShort(ShortH2):
    nom_voix = "lycee-stats-nuage-construire-short"
    fichier_marques = "stats_nuage_construire_short_marques.json"

    def nuage(self):
        n = Nuage(XS, YS, 0, 25, 0, 40, largeur=3.1, hauteur=2.7, fs=19, nom_x="Longueur (km)", nom_y="Stations")
        if n.width > config.frame_width - 0.3:
            n.scale_to_fit_width(config.frame_width - 0.3)
        if n.height > HAUT_CARTE + 3.72:  # jamais collé au bas du cadre
            n.scale_to_fit_height(HAUT_CARTE + 3.72)
        return n.move_to(P(0, HAUT_CARTE - n.height / 2))

    def texte_haut(self, morceaux, fs=34, y=Y_TXT):
        return self.ligne(morceaux, fs).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le métro de Paris", "orange")
        self.add(badge)
        n = self.nuage()

        # ── 00 : la plus petite ligne ──
        self.dire("00-accroche")
        self.au_mot("Le métro de Paris")
        self.play(Write(titre), FadeIn(n.fond), run_time=0.6)
        self.au_mot("la 3 bis")
        voie = Line(P(-1.9, Y_IMG - 0.3), P(1.9, Y_IMG - 0.3), color=GREY_B, stroke_width=5)
        st = VGroup(*[Dot(P(-1.5 + k, Y_IMG - 0.3), radius=0.11, fill_color=WHITE, stroke_color=METRO,
                          stroke_width=4) for k in range(4)])
        r = rame(1.1).move_to(P(-1.5, Y_IMG + 0.05))
        t0 = self.texte_haut([("Ligne 3bis", JAUNE_TITRE)], 36)
        self.play(Create(voie), FadeIn(st), FadeIn(t0, shift=UP * 0.1), run_time=0.5)
        self.au_mot("1 kilomètre")
        t1 = self.texte_haut([("Ligne 3bis :", JAUNE_TITRE), ("1", ORANGE_V), ("km", WHITE)], 36)
        av = Arrow(n.p(0, 0), n.p(1, 0), buff=0, color=ORANGE_V, stroke_width=6, max_tip_length_to_length_ratio=0.5)
        self.play(FadeOut(t0), FadeIn(t1), GrowArrow(av), FadeIn(n.lu_x(1), scale=1.5), run_time=0.4)
        self.au_mot("4 stations")
        mo = VGroup()
        for k in range(4):  # la rame s'arrête à chaque station ; la flèche monte d'un cran
            seg = Line(n.p(1, k), n.p(1, k + 1), color=VIOLET_H, stroke_width=6)
            self.play(r.animate.move_to(P(-1.5 + k, Y_IMG + 0.05)), st[k].animate.set_fill(AMBRE), Create(seg),
                      run_time=0.32)
            mo.add(seg)
        t2 = self.texte_haut([("3bis :", JAUNE_TITRE), ("1", ORANGE_V), ("km,", WHITE), ("4", VIOLET_CLAIR),
                              ("stations !", WHITE)], 34)
        self.play(FadeIn(n.lu_y(4), scale=1.5), FadeOut(t1), FadeIn(t2, scale=0.7), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : le point, puis la ligne 9 ──
        self.dire("01-image")
        self.au_mot("le point 1")
        self.play(FadeIn(n.ronds[0], scale=4), run_time=0.4)
        c = self.ligne([("(", WHITE), ("1", ORANGE_V), (";", WHITE), ("4", VIOLET_CLAIR), (")", WHITE)], 44, 0.1)
        c.move_to(P(0, Y_IMG))
        self.play(FadeOut(VGroup(voie, st, r)), FadeIn(c, scale=0.7), Flash(n.ronds[0], color=ROUGE_PT), run_time=0.45)
        self.au_mot("Et la ligne 9")
        t3 = self.texte_haut([("Ligne 9 :", JAUNE_TITRE)], 36)
        self.play(FadeOut(t2), FadeIn(t3), FadeOut(VGroup(av, mo)), run_time=0.35)
        self.au_mot("20 kilomètres")
        t4 = self.texte_haut([("Ligne 9 :", JAUNE_TITRE), ("20", ORANGE_V), ("km,", WHITE)], 34)
        self.play(FadeOut(t3), FadeIn(t4), Create(n.verticale(20)), FadeIn(n.lu_x(20), scale=1.5), run_time=0.4)
        self.au_mot("37 stations")
        t5 = self.texte_haut([("Ligne 9 :", JAUNE_TITRE), ("20", ORANGE_V), ("km,", WHITE), ("37", VIOLET_CLAIR),
                              ("stations", WHITE)], 32)
        self.play(FadeOut(t4), FadeIn(t5), FadeIn(n.lu_y(37), scale=1.5), run_time=0.4)
        self.au_mot("tout là-haut")
        self.play(FadeIn(n.ronds[1], scale=4), run_time=0.35)
        self.play(Flash(n.ronds[1], color=AMBRE), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        def cp(x, y):
            return self.ligne([("(", WHITE), (str(x), WHITE), (";", WHITE), (str(y), WHITE), (")", WHITE)], 28, 0.1)

        self.question_pause("02-question", "02b-reponse", ["Ligne 7bis : 3 km,", "8 stations. Quel point ?"],
                            [cp(8, 3), cp(3, 8), cp(3, 3)], 1, ["La longueur d'abord,", "puis les stations."],
                            mot_q="La ligne 7 bis")
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        n2 = Nuage([1, 3, 20], [4, 8, 37], 0, 25, 0, 40, largeur=3.1, hauteur=2.7, fs=19, nom_x="Longueur (km)",
                   nom_y="Stations")
        n2.scale_to_fit_width(min(n2.width, config.frame_width - 0.3))
        n2.scale_to_fit_height(min(n2.height, HAUT_CARTE + 3.72)).move_to(P(0, HAUT_CARTE - n2.height / 2))
        self.play(FadeIn(n2), run_time=0.4)
        self.au_mot("la ligne 6")
        t6 = self.texte_haut([("Ligne 6 :", JAUNE_TITRE)], 36, 2.02)
        self.play(FadeIn(t6, shift=UP * 0.1), run_time=0.3)
        self.au_mot("14 kilomètres")
        t7 = self.texte_haut([("Ligne 6 :", JAUNE_TITRE), ("14", ORANGE_V), ("km,", WHITE)], 34, 2.02)
        self.play(FadeOut(t6), FadeIn(t7), run_time=0.3)
        self.au_mot("28 stations")
        t8 = self.texte_haut([("Ligne 6 :", JAUNE_TITRE), ("14", ORANGE_V), ("km,", WHITE), ("28", VIOLET_CLAIR),
                              ("stations", WHITE)], 32, 2.02)
        self.play(FadeOut(t7), FadeIn(t8), run_time=0.3)
        self.au_mot("Quelles sont les coordonnées")
        q = self.ligne([("(", WHITE), ("?", ORANGE_RETENUE), (";", WHITE), ("?", ORANGE_RETENUE), (")", WHITE)], 44,
                       0.12).move_to(P(0, 1.45))
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.insister(q, 1.25)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, 0.9))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
