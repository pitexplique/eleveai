# stats_mediane_quartiles_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 04 « Médiane et quartiles »
# (micro stat_mediane_quartiles). CEINTURE ORANGE (un cran sous la paysage
# verte : la médiane se VOIT en rangeant, sans calcul de rang).
# Il AMUSE : « Quelle durée coupe l'album en deux moitiés ? Devine ! »
#   · en HAUT, un égaliseur qui danse ; en BAS, le diagramme du coach
#     (canvas_stats.Barres) : les 12 titres dans l'ordre de l'album, puis les
#     barres GLISSENT à leur rang (du plus court au plus long) ; une ligne coupe
#     le paquet en 6 + 6 : la médiane, 185,5 s ;
#   · une question-pause (3 s) : un bonus de 600 s fait-il exploser la médiane ?
#     (non : 187 s, la 7e des 13 valeurs) ;
#   · fin : « quel est Q3 ? » en commentaire (191 s).
# Données réelles : voir stats_mediane_quartiles.py (Multitude, Stromae, Wikipédia).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-mediane-quartiles-short.json (débit −10) ; calage :
# manim/scripts/seconde/stats_mediane_quartiles_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_mediane_quartiles_short.py StatsMedianeQuartilesShort -o eleveai-maths-seconde-stats-mediane-quartiles-short --media_dir manim/scripts/seconde/media-stats-mediane-quartiles-short
# Sortie : manim/sorties/seconde/maths/statistiques/04-mediane-quartiles/eleveai-maths-seconde-stats-mediane-quartiles-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403
from stats_mediane_quartiles import DUREES, ORDRE, RANGEES, egaliseur  # noqa: E402

HAUT_GRAPHE = -0.3
COUL = "#c4b5fd"


class StatsMedianeQuartilesShort(Short2de):
    nom_voix = "2de-stats-mediane-quartiles-short"
    fichier_marques = "stats_mediane_quartiles_short_marques.json"

    def graphe(self, valeurs, cats):
        g = Barres(cats, valeurs, pas=50, maxi=250, largeur=6.6, hauteur=2.6, fs=30, couleurs=[COUL] * 12,
                   nom_axe="Secondes")
        g.scale_to_fit_width(4.05)
        return g.move_to(P(0, HAUT_GRAPHE), aligned_edge=UP)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("L'album coupé en deux", "orange")
        eg = egaliseur(n=12, h=1.1, w=0.18).move_to(P(0, 1.45))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(badge), LaggedStart(*[GrowFromEdge(b, DOWN) for b in eg], lag_ratio=0.05),
                  run_time=0.8)
        self.au_mot("Multitude")
        nom = self.borne(self.ligne([("Multitude", JAUNE_TITRE), ("— Stromae", WHITE)], 32)).move_to(P(0, 0.55))
        self.play(FadeIn(nom, shift=UP * 0.2),
                  *[b.animate.stretch(f, 1, about_edge=DOWN) for b, f in zip(eg, [1.3, 0.6, 0.8, 1.4, 0.7, 1.2] * 2)],
                  run_time=0.6)
        self.au_mot("deux moitiés")
        q = self.borne(self.ligne([("La durée du milieu :", WHITE), ("?", ORANGE_RETENUE)], 30)).move_to(P(0, -0.0))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Devine")
        self.insister(q[1], 1.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : ranger, puis couper en deux ──
        self.dire("01-image")
        g = self.graphe(DUREES, [""] * 12)
        cible = self.graphe(RANGEES, [str(k + 1) for k in range(12)])
        self.play(FadeOut(q), FadeIn(g.fond), g.pousser(run_time=0.4, lag=0.02), run_time=0.4)
        self.au_mot("On range les titres")
        rang_de = {i: k for k, i in enumerate(ORDRE)}
        self.play(*[g.barres[i].animate.move_to(cible.barres[rang_de[i]].get_center()) for i in range(12)],
                  FadeIn(cible.etiquettes), run_time=1.3)
        self.au_mot("de 125 secondes")
        v1 = cible.valeur(0, fs=30)
        self.play(FadeIn(v1, scale=1.5), Indicate(g.barres[ORDRE[0]], color=AMBRE), run_time=0.4)
        self.au_mot("à 201")
        v2 = cible.valeur(11, fs=30)
        self.play(FadeIn(v2, scale=1.5), Indicate(g.barres[ORDRE[11]], color=AMBRE), run_time=0.4)
        self.au_mot("6 titres d'un côté")
        xm = (cible.barres[5].get_right()[0] + cible.barres[6].get_left()[0]) / 2
        coupe = DashedLine(P(xm, cible.base(0)[1] - 0.05), P(xm, cible.y_axe(240)[1]), color=VERT_OK, stroke_width=5,
                           dash_length=0.1)
        gauche = self.t("6", 34, BLEU_CALCUL).move_to(P((cible.barres[0].get_left()[0] + xm) / 2, 0.45))
        self.play(Create(coupe), FadeIn(gauche, scale=1.4), FadeOut(eg), FadeOut(nom),
                  *[g.barres[ORDRE[k]].animate.set_fill(BLEU_CALCUL) for k in range(6)], run_time=0.5)
        self.au_mot("6 de l'autre")
        droite = self.t("6", 34, AMBRE).move_to(P((cible.barres[11].get_right()[0] + xm) / 2, 0.45))
        self.play(FadeIn(droite, scale=1.4), *[g.barres[ORDRE[k]].animate.set_fill(AMBRE) for k in range(6, 12)],
                  run_time=0.5)
        self.au_mot("entre 184 et 187")
        e1 = self.borne(self.ligne([("entre", WHITE), ("184", BLEU_CALCUL), ("et", WHITE), ("187", AMBRE)], 30))
        e1.move_to(P(0, 1.05))
        self.play(FadeIn(e1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("la médiane, 185,5")
        med = self.borne(self.ligne([("Médiane :", WHITE), ("185,5 s", VERT_OK)], 36)).move_to(P(0, 1.7))
        self.play(FadeIn(med, scale=0.8), run_time=0.4)
        self.insister(med[1], 1.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        t0 = self.question_short("02-question", "02b-reponse", ["+ 1 bonus de 600 s :", "la médiane…"],
                                 ["explose", "bouge peu", "double"], 1,
                                 [("13 titres : le 7e, 187 s", VERT_OK, "avec 13 titres"),
                                  ("l'extrême ne la tire pas", ROUGE_CLAIR, "une valeur extrême")],
                                 efface=[e1, med, gauche, droite])
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("troisième quartile")
        self.play(FadeOut(VGroup(e1, med)), run_time=0.3)
        q3 = self.borne(self.ligne([("Q3 :", AMBRE), ("?", ORANGE_RETENUE), ("secondes", WHITE)], 38)).move_to(P(0, 1.1))
        self.play(FadeIn(q3, shift=DOWN * 0.2), run_time=0.4)
        self.insister(q3[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, 1.85))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
