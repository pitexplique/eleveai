# stats_comparer_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 08 :
# comparer des données. CEINTURE BLANCHE. Il AMUSE : combien de Pitons des
# Neiges empilés pour atteindre le sommet de l'Everest ?
#   · en HAUT l'Everest (8 849 m) et, à côté, des Pitons des Neiges (3 070 m)
#     qui s'empilent un à un, à la même échelle ; le niveau de l'Everest en
#     pointillé ;
#   · en BAS, EN MÊME TEMPS, les lignes de calcul se remplissent (6 140, puis
#     9 210 : trop !) au mot où la voix les dit ;
#   · fin : deux Pitons, l'écart jusqu'au sommet marqué « ? », « Réponds en
#     commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/6e-stats-comparer-short.json (débit −10), WAV dans
# public/sons/6e-stats-comparer-short/ ; calage mot à mot :
# manim/scripts/6e/stats_comparer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_comparer_short.py StatsComparerShort6e -o eleveai-maths-6e-stats-comparer-short --media_dir manim/scripts/6e/media-comparer-short
# Sortie : manim/sorties/6e/maths/statistiques/08-comparer/eleveai-maths-6e-stats-comparer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from stats_comparer import montagne  # noqa: E402
from canvas_stats import AMBRE  # noqa: E402

Y_SOL = -0.6
K = 2.2 / 8849           # unités d'écran par mètre (l'Everest fait 2,2)
X_PILE, X_EV = -0.95, 1.05
YS = [-1.05, -1.6, -2.15]  # les trois lignes de calcul


class StatsComparerShort6e(MotsCales6, OutilsShort, Short6e):
    nom_voix = "6e-stats-comparer-short"
    fichier_marques = "stats_comparer_short_marques.json"

    def piton(self, k):
        """Le k-ième Piton des Neiges de la pile (k = 0, 1, 2)."""
        h = 3070 * K
        m = montagne(1.35, h, "#64748b", neige=True)
        return m.move_to(P(X_PILE, Y_SOL + k * h), aligned_edge=DOWN)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Plus haut que l'Everest ?")
        self.add(badge)
        sol = Line(P(-2.1, Y_SOL), P(2.1, Y_SOL), color="#64748b", stroke_width=3)
        ev = montagne(2.0, 8849 * K, "#57534e", neige=True).move_to(P(X_EV, Y_SOL), aligned_edge=DOWN)
        y_ev = Y_SOL + 8849 * K
        niveau = DashedLine(P(-2.05, y_ev), P(2.05, y_ev), color=AMBRE, stroke_width=4, dash_length=0.1)
        p = [self.piton(k) for k in range(3)]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Combien de Pitons")
        self.play(FadeIn(titre), FadeIn(sol), FadeIn(p[0], shift=UP * 0.2), run_time=0.5)
        self.au_mot("empilés")
        self.play(FadeIn(p[1], shift=DOWN * 0.4), run_time=0.4)
        self.au_mot("l'Everest")
        self.play(GrowFromEdge(ev, DOWN), run_time=0.7)
        q = self.t("?", 60, ORANGE_RETENUE).move_to(P(X_PILE, y_ev - 0.1))
        self.play(FadeOut(p[1]), FadeIn(q, scale=0.4), run_time=0.35)
        self.insister(q, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : on empile ──
        self.dire("01-image")
        self.au_mot("Le Piton des Neiges")
        l1 = self.ligne([("Piton :", WHITE), ("3 070 m", "#e2e8f0")], 28).move_to(P(0, YS[0]))
        self.play(FadeOut(q), Indicate(p[0], color=WHITE, scale_factor=1.1), run_time=0.4)
        self.au_mot("3 070 mètres")
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.35)
        self.au_mot("L'Everest")
        lev = self.t("Everest : 8 849 m", 28, "#fde68a").set_stroke(BLACK, 4, background=True)
        lev.next_to(niveau, UP, buff=0.06).align_to(P(2.05, 0), RIGHT)
        self.au_mot("8 849 mètres")
        self.play(Create(niveau), FadeIn(lev, scale=1.3), run_time=0.45)
        self.au_mot("Deux Pitons")
        l2 = self.ligne([("2 Pitons :", WHITE), ("6 140 m", "#e2e8f0")], 28).move_to(P(0, YS[1]))
        self.play(FadeIn(p[1], shift=DOWN * 0.5), FadeIn(l2[0]), run_time=0.4)
        self.au_mot("6 140")
        self.play(FadeIn(l2[1], scale=1.4), run_time=0.3)
        self.au_mot("Trois Pitons")
        l3 = self.ligne([("3 Pitons :", WHITE), ("9 210 m", ROUGE_ERREUR), ("trop !", ROUGE_ERREUR)], 28).move_to(P(0, YS[2]))
        self.play(FadeIn(p[2], shift=DOWN * 0.5), FadeIn(l3[0]), run_time=0.4)
        self.au_mot("9 210")
        self.play(FadeIn(l3[1], scale=1.4), run_time=0.3)
        self.au_mot("c'est trop")
        trop = l3[2]
        self.play(FadeIn(trop, scale=1.5), p[2].animate.set_color(ROUGE_ERREUR), run_time=0.35)
        self.insister(trop, 1.2)
        self.au_mot("Il faut presque 3 Pitons")
        presque = self.borne(self.t("presque 3 Pitons !", 34, VERT_OK), 0.4)
        self.play(FadeOut(VGroup(l1, l2, l3)), run_time=0.25)
        presque.move_to(P(0, YS[1]))
        self.play(FadeIn(presque, scale=0.7), run_time=0.35)
        self.insister(presque, 1.12)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("De combien de mètres")
        self.play(FadeOut(VGroup(p[2], presque)), run_time=0.35)
        y2 = Y_SOL + 2 * 3070 * K
        haut2 = DashedLine(P(X_PILE - 0.6, y2), P(X_EV - 0.5, y2), color="#e2e8f0", stroke_width=3, dash_length=0.08)
        fl = DoubleArrow(P(X_PILE + 0.75, y2), P(X_PILE + 0.75, y_ev), buff=0, color=ORANGE_RETENUE, stroke_width=5,
                         tip_length=0.12, max_tip_length_to_length_ratio=0.4)
        pq = self.t("?", 44, ORANGE_RETENUE).set_stroke(BLACK, 4, background=True).next_to(fl, LEFT, buff=0.05)
        self.au_mot("deux Pitons des Neiges empilés")
        self.play(Create(haut2), GrowFromCenter(fl), FadeIn(pq, scale=1.5), run_time=0.5)
        self.insister(pq, 1.4)
        q2 = VGroup(self.t("Everest −", 30), self.t("2 Pitons = ?", 30, ORANGE_RETENUE)).arrange(RIGHT, buff=0.15)
        self.borne(q2).move_to(P(0, YS[0]))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, YS[2] + 0.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
