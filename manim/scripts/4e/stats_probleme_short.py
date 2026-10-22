# stats_probleme_short.py
# EleveAI — Maths 4e — short jumeau de la série « Statistiques », épisode 10 :
# résoudre un problème statistique. CEINTURE ORANGE (un cran sous la paysage
# verte). Il AMUSE : « Un seul orage fait plonger la moyenne ! »
#   · en HAUT, le soleil (puis l'orage) et le texte du calcul ;
#   · en BAS, EN MÊME TEMPS, la semaine du toit solaire (`stat_graph` barres du
#     coach, manim/canvas_stats.py), la ligne de la moyenne à 20 ; le 8e jour
#     (4 kWh) pousse au mot dit, et la ligne descend à 18 quand la voix dit 18 ;
#   · fin : « si le 8e jour avait produit 28 kWh ? » (168 ÷ 8 = 21),
#     « Réponds en commentaire ! ».
# Données vraisemblables (voir stats_probleme.py).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/4e-stats-probleme-short.json (débit −10) ; marques :
# manim/scripts/4e/stats_probleme_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_probleme_short.py StatsProblemeShort4e -o eleveai-maths-4e-stats-probleme-short --media_dir manim/scripts/4e/media-probleme-short
# Sortie : manim/sorties/4e/maths/statistiques/10-probleme/eleveai-maths-4e-stats-probleme-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403
from stats_probleme import JOURS, NUAGE, ORAGE, PROD, SOL, eclair, nuage, soleil  # noqa: E402

Y_IMG, Y_TXT = 1.75, 1.0
HAUT_CARTE = 0.45


class StatsProblemeShort4e(Short4e):
    nom_voix = "4e-stats-probleme-short"
    fichier_marques = "stats_probleme_short_marques.json"

    def graphe(self):
        vals = PROD + [4]
        g = Barres([j[0] for j in JOURS] + ["L"], vals, pas=5, maxi=30, couleurs=[NUAGE if v < 15 else SOL
                                                                                   for v in vals],
                   nom_axe="kWh", largeur=3.7, hauteur=2.1, fs=22)
        if g.width > 4.35:
            g.scale_to_fit_width(4.35)
        return g.move_to(P(0, HAUT_CARTE - g.height / 2))

    def ligne_moy(self, g, v, couleur):
        y = g.y_axe(v)
        return DashedLine(y, P(g.barres[-1].get_right()[0] + 0.08, y[1]), color=couleur, stroke_width=5,
                          dash_length=0.12)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("L'orage solaire", "orange")
        self.add(badge)
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Une semaine de soleil")
        self.play(Write(titre), FadeIn(g.fond), run_time=0.4)
        s = soleil(0.32).move_to(P(0, Y_IMG))
        self.play(GrowFromCenter(s), g.pousser(list(range(7)), run_time=1.4), run_time=1.4)
        self.au_mot("En moyenne, 20")
        lm = self.ligne_moy(g, 20, VERT_OK)
        moy = self.ligne([("moyenne :", VERT_OK), ("20", VERT_OK), ("kWh / jour", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(Create(lm), FadeIn(moy, scale=0.8), run_time=0.5)
        self.au_mot("l'orage")
        orage = VGroup(nuage(0.32, ORAGE), eclair(0.45).shift(DOWN * 0.4)).move_to(P(0, Y_IMG))
        self.play(FadeOut(s), FadeIn(orage, shift=DOWN * 0.3), run_time=0.4)
        self.play(Wiggle(orage), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : la moyenne plonge ──
        self.dire("01-image")
        self.au_mot("140 en tout")
        t = self.ligne([("7 jours :", WHITE), ("140", AMBRE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeOut(moy), FadeIn(t, shift=UP * 0.2), run_time=0.35)
        self.au_mot("que 4")
        v4 = g.valeur(7, fs=26)
        self.play(orage.animate.move_to(P(g.point(7)[0], Y_IMG)), g.pousser(7, run_time=0.4),
                  FadeIn(v4, scale=1.8), run_time=0.5)
        self.au_mot("140 plus 4")
        c1 = self.ligne([("140", AMBRE), ("+", WHITE), ("4", ORANGE_RETENUE)], 40).move_to(P(0, Y_TXT))
        self.play(FadeOut(t), FadeIn(c1, shift=UP * 0.2), FadeOut(orage), run_time=0.35)
        self.au_mot("égale 144")
        r1 = self.ligne([("=", WHITE), ("144", AMBRE)], 40).next_to(c1, RIGHT, buff=0.15)
        self.borne(VGroup(c1, r1), 0.3).move_to(P(0, Y_TXT))
        self.play(FadeIn(r1, scale=1.3), run_time=0.3)
        self.au_mot("Divisé par 8")
        c2 = self.ligne([("144", AMBRE), ("÷", WHITE), ("8", AMBRE)], 44).move_to(P(0, Y_IMG))
        self.play(FadeIn(c2, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("égale 18")
        r2 = self.ligne([("=", WHITE), ("18", ORANGE_RETENUE)], 44).next_to(c2, RIGHT, buff=0.15)
        VGroup(c2, r2).move_to(P(0, Y_IMG))
        lm2 = self.ligne_moy(g, 18, ORANGE_RETENUE)
        self.play(FadeIn(r2, scale=1.4), Transform(lm, lm2), run_time=0.6)
        self.insister(r2[1], 1.4)
        self.au_mot("de 20 à 18")
        plonge = self.ligne([("20", VERT_OK), ("→", WHITE), ("18", ORANGE_RETENUE)], 44).move_to(P(0, Y_TXT))
        self.play(FadeOut(VGroup(c1, r1)), FadeIn(plonge, scale=0.8), run_time=0.4)
        self.insister(plonge, 1.15)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("si le 8e jour")
        self.play(FadeOut(VGroup(c2, r2, plonge), shift=UP * 0.2), run_time=0.3)
        self.au_mot("28 kilowattheures")
        q = self.ligne([("8e jour :", WHITE), ("28", AMBRE), ("kWh", WHITE)], 38).move_to(P(0, Y_IMG))
        self.play(FadeIn(q, shift=DOWN * 0.2), Indicate(g.etiquettes[7], color=AMBRE, scale_factor=1.6), run_time=0.4)
        self.au_mot("quelle serait la nouvelle moyenne")
        q2 = self.ligne([("nouvelle moyenne :", VERT_OK), ("?", ORANGE_RETENUE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.35)
        self.insister(q2[1], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, 0.82))
        self.play(q.animate.move_to(P(0, 2.0)), q2.animate.move_to(P(0, 1.42)), FadeIn(appel, scale=0.7),
                  run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
