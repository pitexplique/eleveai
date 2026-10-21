# stats_mediane_short.py
# EleveAI — Maths 4e / 3e — short jumeau de la série « Statistiques » (cycle 4),
# épisode commun « déterminer une médiane ». CEINTURE JAUNE (on VOIT le milieu
# d'une série rangée, aucun calcul ; sous les paysages verte et orange).
# Il AMUSE : « Quelle production est pile au milieu ? Pas si simple ! »
#   · en HAUT, sept soleils, un par jour, d'autant plus GROS que le toit a
#     produit ; ils se RANGENT du plus petit au plus gros ;
#   · en BAS, EN MÊME TEMPS, la droite graduée du coach (`number_line`,
#     AxePoints) : le point de chaque jour tombe sur sa valeur quand son soleil
#     apparaît ; le soleil du milieu et la médiane s'allument ensemble ;
#   · fin : « un 8e jour à 20 kWh : la nouvelle médiane ? » (13,5).
# Données (voir stats_mediane.py) : 14, 9, 16, 12, 15, 6, 13 → médiane 13.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# Voix : manim/voix/4e-stats-mediane-short.json ; calage :
# manim/scripts/4e/stats_mediane_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_mediane_short.py StatsMedianeShort -o eleveai-maths-4e-stats-mediane-short --media_dir manim/scripts/4e/media-mediane-short
# Sorties : manim/sorties/4e/maths/statistiques/07-mediane/eleveai-maths-4e-stats-mediane-short.mp4
#           manim/sorties/3e/maths/statistiques/05-mediane/eleveai-maths-3e-stats-mediane-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lotf_commun import *  # noqa: E402,F403
from stats_mediane import SEMAINE, soleil  # noqa: E402

Y_TXT = 1.95
Y_SOL = 1.38
PAS_X = 0.6


def x_rang(k, n=7):
    return (k - (n - 1) / 2) * PAS_X


class StatsMedianeShort(ShortF):
    nom_voix = "4e-stats-mediane-short"
    fichier_marques = "stats_mediane_short_marques.json"

    def soleil_jour(self, v):
        s = soleil(0.05 + 0.0095 * v)
        lab = texte(v, 26, WHITE, gras=False).move_to(P(0, Y_SOL - 0.6))
        return VGroup(s.move_to(P(0, Y_SOL)), lab)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le toit solaire", "jaune")
        self.add(badge)
        ax = AxePoints(SEMAINE, 4, 20, 4, sous_pas=2, longueur=3.4, couleur="#fbbf24", fs=22, nom="kWh",
                       rayon=0.1, hauteur_carte=1.3, centre=ORIGIN)
        ax.scale_to_fit_width(4.15).move_to(P(0, -1.15))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        sols = [self.soleil_jour(v) for v in SEMAINE]
        for k, s in enumerate(sols):
            s.shift(RIGHT * x_rang(k))
        sept = self.ligne([("7", AMBRE), ("jours de soleil", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(Write(titre), FadeIn(sept), LaggedStart(*[FadeIn(s[0], scale=0.4) for s in sols], lag_ratio=0.1), run_time=0.7)
        self.au_mot("pile au milieu")
        q = self.ligne([("Au milieu :", WHITE), ("?", ORANGE_RETENUE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeOut(sept, shift=UP * 0.2), FadeIn(q, shift=UP * 0.2), FadeIn(ax.fond), run_time=0.4)
        self.au_mot("Pas si simple")
        self.insister(q[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : on range ──
        self.dire("01-image")
        for k, p in enumerate(self.nombres_apres("kilowattheures", 7)):
            self.au_i(p)
            self.play(FadeIn(sols[k][1], scale=1.6), Indicate(sols[k][0], scale_factor=1.3, color=WHITE),
                      FadeIn(ax.ronds[k], shift=DOWN * 0.5), run_time=0.3)
        self.au_mot("On range")
        rg = self.t("On range…", 36, AMBRE).move_to(P(0, Y_TXT))
        self.play(FadeOut(q), FadeIn(rg), run_time=0.3)
        ordre = sorted(range(7), key=lambda k: SEMAINE[k])
        rangs = {k: r for r, k in enumerate(ordre)}
        self.play(*[sols[k].animate.shift(RIGHT * (x_rang(rangs[k]) - x_rang(k))) for k in range(7)],
                  run_time=1.2)
        for r, p in enumerate(self.nombres_apres("plus grand", 7)):
            self.au_i(p)
            k = ordre[r]
            self.play(Indicate(sols[k], color=AMBRE, scale_factor=1.25), Indicate(ax.ronds[k], color=AMBRE,
                                                                                  scale_factor=1.8), run_time=0.25)
        self.au_mot("Au milieu : 13")
        mil = ordre[3]
        rep = ax.repere(13, "13", VERT_OK)
        med = self.ligne([("Au milieu :", WHITE), ("13", VERT_OK)], 38).move_to(P(0, Y_TXT))
        self.play(FadeOut(rg), FadeIn(med, scale=0.7), sols[mil][0][1].animate.set_fill(VERT_OK),
                  ax.ronds[mil].animate.set_fill(VERT_OK), Create(rep[0]), FadeIn(rep[1]), run_time=0.5)
        self.play(sols[mil].animate.scale(1.4), run_time=0.25)
        self.play(sols[mil].animate.scale(1 / 1.4), run_time=0.25)
        self.au_mot("3 jours en dessous")
        bas = VGroup(*[sols[ordre[r]] for r in range(3)])
        haut = VGroup(*[sols[ordre[r]] for r in range(4, 7)])
        b1 = Brace(bas, DOWN, color=ORANGE_RETENUE, buff=0.05)
        t1 = self.t("3", 34, ORANGE_RETENUE).next_to(b1, DOWN, buff=0.05)
        self.play(GrowFromCenter(b1), FadeIn(t1), *[ax.ronds[ordre[r]].animate.set_fill(ORANGE_RETENUE)
                                                     for r in range(3)], run_time=0.4)
        self.au_mot("3 jours au-dessus")
        b2 = Brace(haut, DOWN, color=BLEU_CALCUL, buff=0.05)
        t2 = self.t("3", 34, BLEU_CALCUL).next_to(b2, DOWN, buff=0.05)
        self.play(GrowFromCenter(b2), FadeIn(t2), *[ax.ronds[ordre[r]].animate.set_fill(BLEU_CALCUL)
                                                     for r in range(4, 7)], run_time=0.4)
        self.au_mot("c'est la médiane")
        nom = self.t("la médiane !", 40, VERT_OK).move_to(P(0, -2.4))
        self.play(FadeIn(nom, scale=0.7), run_time=0.35)
        self.insister(nom, 1.15)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("un huitième jour")
        self.play(FadeOut(VGroup(b1, t1, b2, t2, nom, med)), run_time=0.3)
        h = self.t("8e jour :", 30).move_to(P(-0.85, Y_TXT))
        self.play(FadeIn(h), run_time=0.3)
        self.au_mot("produit 20")
        vingt = self.t("20 kWh", 30, AMBRE).next_to(h, RIGHT, buff=0.2)
        p20 = Dot(ax.x(20) + UP * 0.38, radius=0.1, fill_color=ORANGE_RETENUE, stroke_color=NUIT, stroke_width=2)
        self.play(FadeIn(vingt, scale=1.4), FadeIn(p20, shift=DOWN * 0.5), FadeOut(rep), run_time=0.4)
        self.au_mot("la nouvelle médiane")
        nq = self.ligne([("Nouvelle médiane :", WHITE), ("?", ORANGE_RETENUE)], 34).move_to(P(0, -2.3))
        self.play(FadeIn(nq, scale=0.7), run_time=0.35)
        self.insister(nq[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, -2.8))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
