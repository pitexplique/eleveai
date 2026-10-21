# stats_graphique_lire_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 05 : lire un diagramme en barres. CEINTURE BLANCHE. Il AMUSE :
# « La France a gagné plus d'or que d'argent ? Faux ! »
#   · en HAUT les médailles (or > argent ?), qui s'allument au moment où leur
#     barre s'allume ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (manim/canvas_stats.py : axe
#     gradué 0, 4, 8… avec ses petits traits) : les barres poussent, 16, 26 et
#     22 s'écrivent au-dessus de leur barre au mot où la voix les dit ;
#   · fin : l'écart entre l'or et l'argent marqué « ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit (les
# nombres de l'axe sont des étiquettes). Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/cm-stats-graphique-lire-short.json (débit −10), WAV dans
# public/sons/cm-stats-graphique-lire-short/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_lire_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_graphique_lire_short.py StatsGraphiqueLireShort -o eleveai-maths-cm1-stats-graphique-lire-short --media_dir manim/scripts/cm1/media-graphique-lire-short
# Sorties : manim/sorties/cm1/maths/statistiques/05-graphique-lire/eleveai-maths-cm1-stats-graphique-lire-short.mp4
#           manim/sorties/cm2/maths/statistiques/05-graphique-lire/eleveai-maths-cm2-stats-graphique-lire-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_graphique_lire import (ARGENT, BRONZE, COUL_TXT, MEDAILLES, OR, VALEURS, MotsCales, P,  # noqa: E402
                                  croix, medaille)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, Barres  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

Y_MED, Y_TXT = 1.72, 1.12  # la ligne des médailles, la ligne de texte
HAUT_CARTE = 0.68         # le haut de la carte du diagramme


class StatsGraphiqueLireShort(MotsCales, Short6e):
    nom_voix = "cm-stats-graphique-lire-short"
    fichier_marques = "stats_graphique_lire_short_marques.json"

    def t(self, s, fs=36, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def insister(self, mob, k=1.3, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def graphe(self):
        g = Barres(MEDAILLES, VALEURS, pas=4, sous_pas=2, couleurs=[OR, ARGENT, BRONZE], largeur=2.9, hauteur=1.8,
                   fs=20)
        return g.move_to(P(0, HAUT_CARTE - g.height / 2))

    def construct(self):
        self.margo_bas()
        titre = self.t("Paris 2024", 50, JAUNE_TITRE).move_to(P(0, 3.45))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        self.add(badge)
        g = self.graphe()

        # ── 00 : l'accroche, plus d'or que d'argent ? ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(g.fond), run_time=0.5)
        self.au_mot("la France")
        mor, marg = medaille(OR, 0.27), medaille(ARGENT, 0.27)
        sup = self.t(">", 50)
        rang = VGroup(mor, sup, marg).arrange(RIGHT, buff=0.35).move_to(P(0, Y_MED))
        self.au_mot("plus de médailles d'or")
        self.play(FadeIn(mor, shift=DOWN * 0.3), run_time=0.3)
        phrase = self.borne(self.t("plus d'or que d'argent ?", 32)).move_to(P(0, Y_TXT))
        self.play(FadeIn(sup, scale=0.5), FadeIn(phrase, shift=UP * 0.15), run_time=0.3)
        self.au_mot("que d'argent")
        self.play(FadeIn(marg, shift=DOWN * 0.3), run_time=0.3)
        self.au_mot("Vrai ou faux")
        vf = self.borne(self.t("Vrai ou faux ?", 42, ORANGE_RETENUE), 1.0).move_to(P(0, Y_TXT))
        self.play(FadeOut(phrase, shift=UP * 0.2), FadeIn(vf, shift=UP * 0.2), run_time=0.35)
        self.insister(vf, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : faux ! les barres ──
        self.dire("01-image")
        self.au_mot("Faux")
        faux = self.t("Faux !", 50, ROUGE_ERREUR).move_to(P(0, Y_TXT))
        x = croix(sup, sw=7)
        self.play(FadeOut(vf), FadeIn(faux, scale=1.6), Create(x), run_time=0.35)
        self.insister(faux, 1.2)
        self.au_mot("Regarde les barres")
        self.play(g.pousser(run_time=0.8))
        self.add(g)
        valeurs = []
        meds = [mor, marg, None]
        for i, mot in enumerate(["16 en or", "26 en argent", "22 en bronze"]):
            self.au_mot(mot)
            v = g.valeur(i, fs=30)
            anims = [g.focus(i, 0.4), FadeIn(v, scale=1.8)]
            if meds[i] is not None:
                anims.append(Indicate(meds[i], color=WHITE, scale_factor=1.3))
            self.play(*anims, run_time=0.35)
            valeurs.append(v)
        self.au_mot("C'est l'argent")
        self.play(g.focus(1, 0.4), run_time=0.3)
        self.insister(VGroup(g.barres[1], valeurs[1]), 1.12)
        gagne = self.borne(self.t("L'argent gagne !", 40, VERT_OK)).move_to(P(0, Y_TXT))
        rang2 = VGroup(marg.copy(), self.t(">", 50), mor.copy()).arrange(RIGHT, buff=0.35).move_to(P(0, Y_MED))
        self.au_mot("qui gagne")
        self.play(FadeOut(faux), FadeIn(gagne, scale=0.7), FadeOut(VGroup(rang, x)), FadeIn(rang2), run_time=0.4)
        self.insister(gagne, 1.12)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Combien")
        self.play(FadeOut(VGroup(gagne, rang2), shift=UP * 0.2), g.estomper([0, 1], 0.4), run_time=0.35)
        q = VGroup(medaille(ARGENT, 0.24), self.t("de plus que", 32), medaille(OR, 0.24)).arrange(RIGHT, buff=0.22)
        self.borne(q).move_to(P(0, Y_MED))
        self.au_mot("de plus que")
        self.play(FadeIn(q, shift=DOWN * 0.2), run_time=0.35)
        # l'écart : du niveau de l'or au niveau de l'argent, le long de la barre d'argent
        xg = g.barres[1].get_left()[0] + 0.12
        niveau = DashedLine(g.barres[0].get_corner(UR), P(xg, g.point(0)[1]), color=AMBRE, stroke_width=5,
                            dash_length=0.1)
        ecart = DoubleArrow(P(xg, g.point(0)[1]), P(xg, g.point(1)[1]), buff=0, color=ORANGE_RETENUE,
                            stroke_width=6, tip_length=0.14, max_tip_length_to_length_ratio=0.3)
        point_q = self.t("?", 48, ORANGE_RETENUE).set_stroke(WHITE, 4, background=True)
        point_q.next_to(ecart, RIGHT, buff=0.08)
        self.au_mot("médailles d'or")
        self.play(Create(niveau), GrowFromCenter(ecart), FadeIn(point_q, scale=1.6), run_time=0.5)
        self.insister(point_q, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
