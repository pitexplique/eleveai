# stats_moyenne_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 02 « Calculer une moyenne »
# (micro stat_moyenne). CEINTURE ORANGE (un cran sous la paysage verte : la
# moyenne se VOIT comme un partage égal ; un seul calcul, 399 × 6).
# Il AMUSE : « Combien dure une sortie dans l'espace, en moyenne ? Devine ! »
#   · en HAUT, la station et le casque ; en BAS, le diagramme du coach
#     (canvas_stats.Barres) : chaque barre pousse quand la voix dit sa durée ;
#   · puis les longues sorties DONNENT leurs minutes aux courtes (des blocs
#     ambre glissent d'une barre à l'autre) : toutes arrivent à 399 ;
#   · une question-pause (3 s) : 6 sorties de 399 min, combien en tout ?
#   · fin : « avec une 7e sortie de 546 min, la nouvelle moyenne ? » (420).
# Données réelles : voir stats_moyenne.py (Thomas Pesquet, 39 h 54 en 6 sorties).
# Transferts (somme des excès = somme des manques = 57 min) :
#   S3 → S1 : 36 ; S6 → S1 : 5 ; S6 → S2 : 5 ; S6 → S4 : 5 ; S5 → S4 : 6.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-moyenne-short.json (débit −10) ; calage :
# manim/scripts/seconde/stats_moyenne_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_moyenne_short.py StatsMoyenneShort -o eleveai-maths-seconde-stats-moyenne-short --media_dir manim/scripts/seconde/media-stats-moyenne-short
# Sortie : manim/sorties/seconde/maths/statistiques/02-moyenne/eleveai-maths-seconde-stats-moyenne-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403
from stats_moyenne import DUREES, GRIS, SORTIES, casque, station  # noqa: E402

HAUT_GRAPHE = -0.3
TRANSFERTS = [(2, 0, 36), (5, 0, 5), (5, 1, 5), (5, 3, 5), (4, 3, 6)]


class StatsMoyenneShort(Short2de):
    nom_voix = "2de-stats-moyenne-short"
    fichier_marques = "stats_moyenne_short_marques.json"

    def graphe(self):
        g = Barres(SORTIES, DUREES, pas=100, maxi=500, largeur=3.3, hauteur=1.3, fs=20, couleurs=[GRIS] * 6,
                   nom_axe="Minutes")
        g.scale_to_fit_width(4.05)
        return g.move_to(P(0, HAUT_GRAPHE), aligned_edge=UP)

    def bloc(self, g, i, bas, n):
        """Un bloc de n minutes posé sur la barre i, de la hauteur `bas` (en min)."""
        uy = g._uy()[1]
        w = g.barres[i].width
        r = Rectangle(width=w, height=n * uy, fill_color=AMBRE, fill_opacity=1, stroke_color="#b45309",
                      stroke_width=1.5)
        return r.move_to(P(g.base(i)[0], g.base(i)[1] + bas * uy), aligned_edge=DOWN)

    def barre_a(self, g, i, v):
        b = g.barres[i].copy()
        h = (v - g.mini) * g._uy()[1]
        b.stretch_to_fit_height(h).move_to(g.base(i), aligned_edge=DOWN)
        return b

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Une sortie dans l'espace", "orange")
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        st = station(2.6).move_to(P(0, 1.55))
        c = casque(0.35).move_to(P(-1.2, 0.75))
        self.play(Write(titre), FadeIn(badge), FadeIn(st, shift=LEFT * 0.4), FadeIn(c, shift=UP * 0.3), run_time=0.7)
        self.play(c.animate.shift(RIGHT * 0.8 + UP * 0.15).rotate(-0.3), run_time=1.0)
        self.au_mot("39 heures")
        tot = self.ligne([("6 sorties :", WHITE), ("39 h 54 min", AMBRE)], 32).move_to(P(0, 0.05))
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.4)
        self.au_mot("en moyenne")
        q = self.ligne([("1 sortie :", WHITE), ("?", ORANGE_RETENUE)], 36).move_to(P(0, -0.65))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Devine")
        self.insister(q[1], 1.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : les barres, puis le partage ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(tot, q)), st.animate.scale(0.6).move_to(P(-1.2, 1.5)),
                  c.animate.scale(0.8).move_to(P(1.2, 1.5)), FadeIn(g.fond), run_time=0.5)
        vals = VGroup()
        for i, ext in enumerate(["358,", "394,", "435,", "388,", "405,", "414."]):
            self.au_mot(ext)
            v = g.valeur(i, fs=19)
            vals.add(v)
            self.play(GrowFromEdge(g.barres[i], DOWN), FadeIn(v, scale=1.5), run_time=0.4)
        self.au_mot("Les longues sorties")
        self.play(FadeOut(vals), run_time=0.3)
        haut = list(DUREES)
        blocs = []
        for d, r, n in TRANSFERTS:
            depart = self.bloc(g, d, haut[d] - n, n)
            arrivee = self.bloc(g, r, haut[r], n)
            haut[d] -= n
            haut[r] += n
            self.add(depart)
            self.play(Transform(g.barres[d], self.barre_a(g, d, haut[d])),
                      MoveAlongPath(depart, ArcBetweenPoints(depart.get_center(), arrivee.get_center(), angle=-PI / 2)),
                      run_time=0.55)
            blocs.append(depart)
        self.au_mot("Toutes durent 399")
        lm = DashedLine(P(g.base(0)[0] - 0.3, g.y_axe(399)[1]), P(g.base(5)[0] + 0.3, g.y_axe(399)[1]),
                        color=VERT_OK, stroke_width=5, dash_length=0.1)
        self.play(*[Transform(g.barres[i], self.barre_a(g, i, 399)) for i in range(6)], *[FadeOut(b) for b in blocs],
                  Create(lm), run_time=0.6)
        egal = self.ligne([("399 min", VERT_OK), ("chacune !", WHITE)], 34).move_to(P(0, 0.45))
        self.play(FadeIn(egal, scale=0.7), run_time=0.4)
        self.au_mot("C'est la moyenne")
        moy = self.ligne([("Moyenne :", WHITE), ("399 min", VERT_OK)], 34).move_to(P(0, 0.45))
        self.play(FadeOut(egal, shift=UP * 0.2), FadeIn(moy, shift=UP * 0.2), run_time=0.35)
        self.au_mot("6 heures et 39")
        hm = self.ligne([("=", WHITE), ("6 h 39 min", VERT_OK)], 34).move_to(P(0, -0.0))
        self.play(FadeIn(hm, shift=UP * 0.15), run_time=0.35)
        self.insister(hm[1], 1.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        def geste():
            return [LaggedStart(*[Indicate(b, color=VERT_OK, scale_factor=1.08) for b in g.barres], lag_ratio=0.1)]

        t0 = self.question_short("02-question", "02b-reponse", ["6 sorties de 399 min :", "combien en tout ?"],
                                 ["405", "2 394", "66,5"], 1,
                                 [("399 × 6 = 2 394 min", VERT_OK, "399 fois 6"),
                                  ("405 = 399 + 6", ROUGE_CLAIR, "405, c'est")],
                                 geste=geste, efface=[st, c, moy, hm])
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("septième sortie")
        self.play(FadeOut(VGroup(moy, hm)), run_time=0.3)
        q1 = self.borne(self.ligne([("+ 1 sortie de", WHITE), ("546 min", ORANGE_RETENUE)], 32)).move_to(P(0, 0.7))
        self.play(FadeIn(q1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("nouvelle moyenne")
        q2 = self.ligne([("Nouvelle moyenne :", WHITE), ("?", ORANGE_RETENUE)], 32).move_to(P(0, 0.1))
        self.play(FadeIn(q2, scale=0.8), run_time=0.35)
        self.insister(q2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, 2.05))
        self.play(FadeIn(appel, scale=0.7), FadeOut(VGroup(st, c)), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
