# stats_defi_short.py
# EleveAI — Maths 5e — short jumeau de la série « Statistiques » (cycle 4),
# épisode 08 : défi. CEINTURE VERTE (un cran sous la paysage bleue). Il AMUSE :
# « Un seul jour de feu de forêt, et la moyenne s'envole ! »
#   · en HAUT, le calendrier des 20 jours, puis le 21e jour en flammes ;
#   · en BAS, EN MÊME TEMPS, une droite graduée de 0 à 5 : le curseur de la
#     moyenne est à 2,4, puis il SAUTE à 3 au mot « saute à 3 » ;
#   · fin : « et avec 36 interventions ? » (réponse : 84 ÷ 21 = 4).
# Données : celles de la paysage (stats_defi.py), calculées en Python.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit (les
# graduations 0 à 5 de la droite sont des étiquettes).
# Voix : manim/voix/5e-stats-defi-short.json ; calage :
# manim/scripts/5e/stats5_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_defi_short.py StatsDefiShort5e -o eleveai-maths-5e-stats-defi-short --media_dir manim/scripts/5e/media-defi-short
# Sortie : manim/sorties/5e/maths/statistiques/08-defi/eleveai-maths-5e-stats-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_defi import flamme  # noqa: E402

assert (48 + 36) / 21 == 4
Y_TXT = 0.0


class StatsDefiShort5e(Short5):
    nom_voix = "5e-stats-defi-short"
    fichier_marques = "stats5_defi_short_marques.json"

    def curseur(self, axe, v, couleur=AMBRE, label=None):
        tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.16).rotate(PI)
        tri.next_to(axe.n2p(v), UP, buff=0.05)
        g = VGroup(tri)
        if label:
            g.add(self.t(label, 40, couleur).next_to(tri, UP, buff=0.1))
        return g

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Moyenne en feu !", "verte")
        self.add(badge)
        cal = VGroup(*[Square(side_length=0.32, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8",
                              stroke_width=2) for _ in range(20)]).arrange_in_grid(4, 5, buff=0.06).move_to(P(-0.6, 1.4))
        j21 = Square(side_length=0.32, fill_color="#7f1d1d", fill_opacity=1, stroke_color="#fca5a5",
                     stroke_width=3).next_to(cal, RIGHT, buff=0.35)
        axe = NumberLine(x_range=[0, 5, 1], length=3.8, include_numbers=False, color=WHITE).move_to(P(0, -2.0))
        nums = VGroup(*[self.t(str(k), 28).next_to(axe.n2p(k), DOWN, buff=0.15) for k in range(6)])
        lbl = self.t("moyenne par jour", 28, "#cbd5e1").next_to(nums, DOWN, buff=0.15)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), run_time=0.3)
        self.au_mot("20 jours")
        t20 = self.ligne([("20", JAUNE_TITRE), ("jours", WHITE)], 30).next_to(cal, DOWN, buff=0.12)
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in cal], lag_ratio=0.03), FadeIn(t20), run_time=0.8)
        self.au_mot("en moyenne")
        self.play(Create(axe), FadeIn(nums), FadeIn(lbl), run_time=0.5)
        self.au_mot("2,4 interventions")
        c24 = self.curseur(axe, 2.4, AMBRE, "2,4")
        self.play(FadeIn(c24, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("un feu de forêt")
        fl = flamme(0.28).move_to(j21)
        self.play(FadeIn(j21, scale=0.5), GrowFromEdge(fl, DOWN), run_time=0.5)
        self.play(Wiggle(fl), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : la moyenne saute ──
        self.dire("01-image")
        self.au_mot("15 interventions")
        t15 = self.ligne([("21e jour :", WHITE), ("15", ROUGE_ERREUR), ("interventions", WHITE)], 30).move_to(P(0, Y_TXT + 0.45))
        self.play(FadeOut(t20), FadeIn(t15, scale=0.8), fl.animate.scale(1.6), run_time=0.45)
        self.play(fl.animate.scale(1 / 1.6), run_time=0.3)
        self.au_mot("Le total passe de 48")
        tot = self.ligne([("total :", WHITE), ("48", WHITE)], 38).move_to(P(0, Y_TXT - 0.15))
        self.play(FadeIn(tot), run_time=0.35)
        self.au_mot("à 63")
        tot2 = self.ligne([("total :", WHITE), ("63", ROUGE_ERREUR)], 38).move_to(tot)
        self.play(Transform(tot, tot2), run_time=0.4)
        self.au_mot("Sur 21 jours")
        t21 = self.ligne([("sur", WHITE), ("21", JAUNE_TITRE), ("jours", WHITE)], 34).move_to(P(0, Y_TXT - 0.7))
        self.play(FadeIn(t21), run_time=0.3)
        self.au_mot("saute à 3")
        c3 = self.curseur(axe, 3, ROUGE_ERREUR, "3")
        self.play(c24[0].animate.set_opacity(0.35), FadeOut(c24[1]), FadeIn(c3, shift=RIGHT * 0.6), run_time=0.5)
        fleche = CurvedArrow(axe.n2p(2.4) + UP * 0.9, axe.n2p(3) + UP * 0.9, angle=-PI / 2, color=ORANGE_RETENUE)
        self.play(Create(fleche), run_time=0.4)
        self.insister(c3[1], 1.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("36 interventions")
        q = self.ligne([("21e jour :", WHITE), ("36", ROUGE_ERREUR), ("?", ORANGE_RETENUE)], 36).move_to(P(0, Y_TXT + 0.45))
        self.play(FadeOut(VGroup(t15, tot, t21)), FadeIn(q, shift=UP * 0.2), FadeOut(fleche), run_time=0.4)
        self.au_mot("quelle serait la moyenne")
        cq = self.ligne([("moyenne :", WHITE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, Y_TXT - 0.2))
        self.play(FadeIn(cq, scale=0.7), run_time=0.35)
        self.insister(cq[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT - 0.8))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
