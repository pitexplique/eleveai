# stats_linearite_moyenne_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 07 « La linéarité de la
# moyenne » (micro stat_linearite_moyenne). CEINTURE ORANGE (un cran sous la
# paysage verte : une seule transformation, + 20). Il AMUSE : le marathon
# Hunger Games et ses bandes-annonces.
#   · en HAUT, les 5 pellicules (une par film, longueur = durée) ; on colle
#     20 minutes de bandes-annonces au début de chacune ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (canvas_stats.Barres) : un
#     bloc rose pousse sur chaque barre, la ligne de la moyenne monte de 20 ;
#   · une question-pause (3 s) : la nouvelle moyenne (piège : 241, + 20 cinq fois) ;
#   · fin : « et si chaque film durait 2 fois plus longtemps ? » en commentaire (282).
# Données réelles (voir stats_linearite_moyenne.py) : Box Office Mojo, 5 films.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-linearite-moyenne-short.json (débit −10) ;
# calage : manim/scripts/seconde/stats_linearite_moyenne_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_linearite_moyenne_short.py StatsLineariteMoyenneShort -o eleveai-maths-seconde-stats-linearite-moyenne-short --media_dir manim/scripts/seconde/media-stats-linearite-moyenne-short
# Sortie : manim/sorties/seconde/maths/statistiques/07-linearite-moyenne/eleveai-maths-seconde-stats-linearite-moyenne-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

DUREES = [142, 146, 123, 137, 157]
ROSE = "#f472b6"
X0 = -1.95          # le bord gauche des pellicules
K = 3.4 / 200       # unités par minute


def pellicule(minutes, couleur="#475569", h=0.3):
    w = minutes * K
    fond = Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    n = max(1, int(w / 0.16))
    trous = VGroup(*[VGroup(Square(0.05, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(
        fond.get_left() + RIGHT * (0.08 + j * 0.16) + UP * h * 0.32),
        Square(0.05, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(
        fond.get_left() + RIGHT * (0.08 + j * 0.16) + DOWN * h * 0.32)) for j in range(n)])
    return VGroup(fond, trous)


class StatsLineariteMoyenneShort(Short2de):
    nom_voix = "2de-stats-linearite-moyenne-short"
    fichier_marques = "stats_linearite_moyenne_short_marques.json"

    def graphe(self):
        g = Barres(["1", "2", "3", "4", "5"], DUREES, pas=50, maxi=200, largeur=3.0, hauteur=1.15, fs=22,
                   nom_axe="min")
        g.scale_to_fit_width(3.9)
        return g.move_to(P(0, -0.3), aligned_edge=UP)

    def moy(self, g, v, couleur, txt):
        y = g.y_axe(v)[1]
        tr = DashedLine(P(g.ref_x.get_start()[0], y), P(g.ref_x.get_end()[0], y), color=couleur, stroke_width=5,
                        dash_length=0.1)
        t = self.ligne([("moyenne :", couleur), (txt, couleur)], 30).move_to(P(0, 0.47))
        return VGroup(tr, t)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Marathon de films", "orange")
        films = VGroup(*[pellicule(d, h=0.24).move_to(P(0, 2.05 - 0.3 * i), aligned_edge=LEFT).set_x(X0 + d * K / 2)
                         for i, d in enumerate(DUREES)])
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(badge), run_time=0.7)
        self.au_mot("5 films")
        self.play(LaggedStart(*[GrowFromEdge(f, LEFT) for f in films], lag_ratio=0.15), FadeIn(g.fond), g.pousser(),
                  run_time=1.0)
        self.au_mot("141 minutes")
        m = self.moy(g, 141, VERT_OK, "141 min")
        self.play(Create(m[0]), FadeIn(m[1], scale=1.4), run_time=0.5)
        self.au_mot("Et si on ajoute")
        q = self.ligne([("+ bandes-annonces :", ROSE), ("?", ORANGE_RETENUE)], 28).move_to(P(0, -0.03))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Devine")
        self.insister(q[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : coller 20 minutes au début de chaque film ──
        self.dire("01-image")
        self.au_mot("Chaque bande")
        self.play(FadeOut(q), LaggedStart(*[Indicate(f, color=AMBRE, scale_factor=1.05) for f in films],
                                          lag_ratio=0.1), run_time=0.8)
        self.au_mot("J'ajoute 20 minutes")
        roses = VGroup(*[pellicule(20, ROSE, h=0.24).move_to(P(0, f.get_y())).set_x(X0 + 10 * K) for f in films])
        h = g.y_axe(20)[1] - g.y_axe(0)[1]
        blocs = VGroup(*[Rectangle(width=b.width, height=h, fill_color=ROSE, fill_opacity=0.95, stroke_color=NUIT,
                                   stroke_width=2).next_to(b, UP, buff=0) for b in g.barres])
        self.play(*[f.animate.shift(RIGHT * 20 * K) for f in films], run_time=0.6)
        self.play(LaggedStart(*[GrowFromEdge(r, LEFT) for r in roses], lag_ratio=0.12),
                  LaggedStart(*[GrowFromEdge(b, DOWN) for b in blocs], lag_ratio=0.12), run_time=1.0)
        self.au_mot("grandissent de 20")
        self.play(Indicate(roses, color=AMBRE, scale_factor=1.05), Indicate(blocs, color=AMBRE), run_time=0.6)
        self.au_mot("la ligne de la moyenne monte")
        m2 = self.moy(g, 161, ROSE, "?")
        self.play(m[0].animate.set_opacity(0.35), TransformFromCopy(m[0], m2[0]), FadeOut(m[1]),
                  FadeIn(m2[1]), run_time=0.9)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        haut = VGroup(films, roses)

        def geste():
            return [Indicate(m2[0], color=VERT_OK, scale_factor=1.05)]

        self.play(FadeOut(haut), FadeOut(m2[1]), run_time=0.35)
        t0 = self.question_short("02-question", "02b-reponse", ["La nouvelle moyenne", "des séances ?"],
                                 ["241", "161", "141"], 1,
                                 [("141 + 20 = 161", VERT_OK, "141 plus 20"),
                                  ("241 : + 20 cinq fois", ROUGE_CLAIR, "241 ajoute")],
                                 geste=geste, efface=())
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("2 fois plus longtemps")
        l1 = self.ligne([("Chaque film", WHITE), ("× 2", AMBRE)], 34).move_to(P(0, 1.8))
        self.play(FadeIn(l1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("quelle serait la durée moyenne")
        l2 = self.ligne([("Durée moyenne :", WHITE), ("?", ORANGE_RETENUE)], 32).move_to(P(0, 1.1))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.insister(l2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, 0.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
