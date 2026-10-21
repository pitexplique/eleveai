# stats_tableau_interpreter_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 03 : interpréter un tableau. CEINTURE JAUNE (un cran sous la
# paysage orange). Il AMUSE : « Pourquoi la boulangère se lève-t-elle plus tôt
# le dimanche ? »
#   · en HAUT, une baguette DEBOUT par jour, haute comme les ventes : celle du
#     lundi, recopiée et posée sur elle-même, fait juste celle du dimanche
#     (deux fois plus !) ;
#   · en BAS, EN MÊME TEMPS, la ligne du tableau du coach se remplit sous sa
#     baguette (120, 240, puis 180) ;
#   · fin : samedi contre lundi, le morceau en plus marqué « ? »,
#     « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/cm-stats-tableau-interpreter-short.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-interpreter-short/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_interpreter_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_tableau_interpreter_short.py StatsTableauInterpreterShort -o eleveai-maths-cm1-stats-tableau-interpreter-short --media_dir manim/scripts/cm1/media-tableau-interpreter-short
# Sorties : manim/sorties/cm1/maths/statistiques/03-tableau-interpreter/eleveai-maths-cm1-stats-tableau-interpreter-short.mp4
#           manim/sorties/cm2/maths/statistiques/03-tableau-interpreter/eleveai-maths-cm2-stats-tableau-interpreter-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import P, BaseTableauShort, allumer, eteindre, remplir, textes_devant  # noqa: E402
from stats_tableau_interpreter import DORE, DORE_FONCE  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, ORANGE_Q, Tableau  # noqa: E402

Y_TXT = 1.98
BASE = -0.15            # le pied des baguettes debout
U = 1.75 / 240          # hauteur d'une baguette vendue
JOURS_S = ["Lun.", "Sam.", "Dim."]  # abrégés : « Dimanche » entier était rétréci dans sa case


def baguette_debout(v, x):
    """Une baguette debout, haute comme v ventes, le pied sur BASE."""
    h = v * U
    corps = RoundedRectangle(width=0.42, height=h, corner_radius=0.2, fill_color=DORE, fill_opacity=1,
                             stroke_color=DORE_FONCE, stroke_width=3).move_to(P(x, BASE + h / 2))
    n = max(2, int(h / 0.35))
    entailles = VGroup(*[Line(P(x - 0.1, BASE + h * (k + 0.6) / (n + 0.4) - 0.07),
                              P(x + 0.1, BASE + h * (k + 0.6) / (n + 0.4) + 0.07), color=DORE_FONCE, stroke_width=3)
                         for k in range(n)])
    return VGroup(corps, entailles)


class StatsTableauInterpreterShort(BaseTableauShort):
    nom_voix = "cm-stats-tableau-interpreter-short"
    fichier_marques = "statscm_tableau_interpreter_short_marques.json"

    def legende(self, s, color=WHITE, fs=36):
        return self.borne(self.t(s, fs, color)).move_to(P(0, Y_TXT))

    def tableau(self):
        tab = Tableau(JOURS_S, [[None] * 3], largeur_case=1.45, hauteur=0.8, fs=30, titre="Baguettes vendues",
                      centre=P(0, -1.4))
        tab.scale_to_fit_width(config.frame_width - 0.3)
        return textes_devant(tab.move_to(P(0, -1.5)))

    def construct(self):
        self.margo_bas()
        titre = self.entete_short("Le dimanche", "jaune")
        tab = self.tableau()
        xs = [tab.case(0, c).get_center()[0] for c in range(3)]
        sol = Line(P(-2.1, BASE), P(2.1, BASE), color=GREY_B, stroke_width=4)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tab, shift=UP * 0.2), Create(sol), run_time=0.5)
        self.au_mot("plus tôt")
        q = self.legende("Pourquoi plus tôt ?", ORANGE_RETENUE, 40)
        self.play(FadeIn(q, shift=UP * 0.2), Indicate(tab.tetes[2][1], color=ORANGE_RETENUE, scale_factor=1.2),
                  run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : 120 le lundi, 240 le dimanche : deux fois plus ──
        self.dire("01-image")
        self.au_mot("Son tableau le dit")
        dit = self.legende("Son tableau le dit :", BLEU_CALCUL, 38)
        self.play(FadeOut(q, shift=UP * 0.2), FadeIn(dit, shift=UP * 0.2), run_time=0.35)
        self.au_mot("120 baguettes")
        b_lun = baguette_debout(120, xs[0])
        self.play(GrowFromEdge(b_lun, DOWN), remplir(tab, 0, 0, 120), *allumer(tab, 0, 0), run_time=0.6)
        self.au_mot("240 le dimanche")
        b_dim = baguette_debout(240, xs[2])
        self.play(GrowFromEdge(b_dim, DOWN), remplir(tab, 0, 2, 240), *allumer(tab, 0, 2), run_time=0.6)
        self.au_mot("Deux fois plus")
        deux = self.legende("Deux fois plus !", VERT_OK, 44)
        c1, c2 = b_lun.copy(), b_lun.copy()
        self.play(FadeOut(dit, shift=UP * 0.2), FadeIn(deux, scale=0.7), run_time=0.3)
        self.play(c1.animate.move_to(P(xs[2] - 0.55, BASE + 120 * U / 2)), run_time=0.45)
        self.play(c2.animate.move_to(P(xs[2] - 0.55, BASE + 120 * U * 1.5)), run_time=0.45)
        x2 = self.t("× 2", 40, VERT_OK).next_to(VGroup(c1, c2), LEFT, buff=0.12)
        self.play(FadeIn(x2, scale=1.5), run_time=0.3)
        self.au_mot("deux fois plus de pâte")
        pate = self.legende("Deux fois plus de pâte !", AMBRE, 36)
        self.play(FadeOut(deux, shift=UP * 0.2), FadeIn(pate, shift=UP * 0.2), run_time=0.35)
        self.insister(pate, 1.1)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question, samedi contre lundi ──
        self.dire("02-question")
        self.au_mot("180 baguettes")
        self.play(FadeOut(VGroup(c1, c2, x2, pate)), *eteindre(tab), b_dim.animate.set_opacity(0.3), run_time=0.3)
        b_sam = baguette_debout(180, xs[1])
        self.play(GrowFromEdge(b_sam, DOWN), remplir(tab, 0, 1, 180), *allumer(tab, 0, 1), run_time=0.6)
        self.au_mot("Combien de plus")
        cb = self.legende("Combien de plus ?", ORANGE_RETENUE, 40)
        haut_l = BASE + 120 * U
        niveau = DashedLine(P(xs[0] - 0.3, haut_l), P(xs[1] + 0.45, haut_l), color=AMBRE, stroke_width=4,
                            dash_length=0.1)
        ecart = DoubleArrow(P(xs[1] + 0.4, haut_l), P(xs[1] + 0.4, BASE + 180 * U), buff=0, color=ORANGE_RETENUE,
                            stroke_width=6, tip_length=0.14, max_tip_length_to_length_ratio=0.35)
        pq = self.t("?", 48, ORANGE_RETENUE).next_to(ecart, RIGHT, buff=0.08)
        self.play(FadeIn(cb, shift=UP * 0.2), Create(niveau), *allumer(tab, 0, 0), run_time=0.45)
        self.play(GrowFromCenter(ecart), FadeIn(pq, scale=1.6), run_time=0.4)
        self.insister(pq, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.legende("Réponds en commentaire !", VERT_OK, 32)
        self.play(FadeOut(cb, shift=UP * 0.2), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
