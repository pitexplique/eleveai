# stats_lire_serie_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 01 « Lire une série
# statistique » (micro stat_lire_serie). CEINTURE ORANGE (un cran sous la
# paysage verte : on LIT un diagramme, sans calcul). Il AMUSE : « Combien de
# buts voit-on le plus souvent ? Devine ! »
#   · en HAUT, un ballon par match, empilé au-dessus de SA valeur (64 ballons) ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (canvas_stats.Barres) : la
#     barre pousse quand ses ballons arrivent ;
#   · une question-pause (3 s) : la valeur la plus fréquente (piège : 17) ;
#   · fin : « combien de matchs avec au moins 5 buts ? » en commentaire (12).
# Données réelles (voir stats_lire_serie.py) : Coupe du monde 2022, 64 matchs.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-lire-serie-short.json (débit −10) ; calage :
# manim/scripts/seconde/stats_lire_serie_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_lire_serie_short.py StatsLireSerieShort -o eleveai-maths-seconde-stats-lire-serie-short --media_dir manim/scripts/seconde/media-stats-lire-serie-short
# Sortie : manim/sorties/seconde/maths/statistiques/01-lire-serie/eleveai-maths-seconde-stats-lire-serie-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403

BUTS = list(range(9))
MATCHS = [7, 10, 17, 14, 4, 6, 3, 2, 1]
CATS = [str(v) for v in BUTS]
HAUT_GRAPHE = -0.3   # le haut de la carte du diagramme
DY = 0.082            # l'écart vertical entre deux ballons d'une pile


def petit_ballon(r=0.036):
    return VGroup(Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=1.2),
                  Dot(radius=r * 0.38, color=NUIT))


class StatsLireSerieShort(Short2de):
    nom_voix = "2de-stats-lire-serie-short"
    fichier_marques = "stats_lire_serie_short_marques.json"

    def graphe(self):
        g = Barres(CATS, MATCHS, pas=5, maxi=20, largeur=3.3, hauteur=1.3, fs=20, nom_axe="Matchs")
        g.scale_to_fit_width(4.05)
        return g.move_to(P(0, HAUT_GRAPHE), aligned_edge=UP)

    def pile(self, g, i):
        base = HAUT_GRAPHE + 0.13
        return VGroup(*[petit_ballon().move_to(P(g.base(i)[0], base + k * DY)) for k in range(MATCHS[i])])

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Combien de buts ?", "orange")
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(badge), run_time=0.7)
        self.au_mot("64 matchs")
        gros = VGroup(*[petit_ballon(0.16).move_to(P(-1.2 + 0.6 * k, 1.35)) for k in range(5)])
        n64 = self.ligne([("64", BLEU_CALCUL), ("matchs", WHITE)], 44).move_to(P(0, 0.55))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.5) for b in gros], lag_ratio=0.12), FadeIn(n64), run_time=0.8)
        self.au_mot("le plus souvent")
        q = self.ligne([("Le plus souvent :", WHITE), ("?", ORANGE_RETENUE), ("buts", WHITE)], 32).move_to(P(0, -0.3))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Devine")
        self.insister(q[1], 1.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : les ballons et les barres ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(gros, n64, q)), FadeIn(g.fond), run_time=0.5)
        piles = [self.pile(g, i) for i in range(9)]
        vals = VGroup()
        etapes = [("7 matchs", 1), ("10.", 1), ("17.", 1), ("14.", 1), ("4, 6", 1), ("6, 3", 1), ("3, 2", 1),
                  ("2…", 1), ("un seul match", 1)]
        for i, (ext, n) in enumerate(etapes):
            self.au_mot(ext, n)
            v = g.valeur(i, fs=19)
            vals.add(v)
            self.play(GrowFromEdge(g.barres[i], DOWN), FadeIn(v, scale=1.5),
                      LaggedStart(*[FadeIn(b, shift=DOWN * 0.4) for b in piles[i]], lag_ratio=0.05),
                      run_time=0.45)
        self.play(Indicate(piles[2], color=AMBRE, scale_factor=1.1), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        tous = VGroup(*piles)

        def geste():
            return [g.focus(2), Indicate(vals[2], color=AMBRE)]

        t0 = self.question_short("02-question", "02b-reponse", ["Quelle est la valeur", "la plus fréquente ?"],
                                 ["17", "2", "8"], 1,
                                 [("2 buts : la plus haute pile", VERT_OK, "2 buts"),
                                  ("17 : son effectif", ROUGE_CLAIR, "17, c'est")],
                                 geste=geste, efface=[tous])
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.play(g.rallumer(), run_time=0.3)
        self.au_mot("au moins 5 buts")
        q1 = self.borne(self.ligne([("Au moins", WHITE), ("5", BLEU_CALCUL), ("buts :", WHITE), ("?", ORANGE_RETENUE),
                                    ("matchs", WHITE)], 34)).move_to(P(0, 2.0))
        self.play(FadeIn(q1, shift=DOWN * 0.2), FadeOut(tous), g.estomper([5, 6, 7, 8]), run_time=0.5)
        self.insister(q1[3], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, 1.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
