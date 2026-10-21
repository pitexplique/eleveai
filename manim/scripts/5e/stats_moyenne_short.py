# stats_moyenne_short.py
# EleveAI — Maths 5e — short jumeau de la série « Statistiques » (cycle 4),
# épisode 07 : la moyenne. CEINTURE JAUNE (un cran sous la paysage verte).
# Il AMUSE : les buts de Kylian Mbappé en grands tournois (données RÉELLES,
# vérifiées le 21/10/2026, voir l'en-tête de stats_moyenne.py : 4, 0, 8, 1),
# puis le PARTAGE ÉGAL : 13 ballons répartis en 4 tas, 3 chacun, et le 13e
# coupé en quatre quarts → 3,25.
#   · en HAUT, les ballons de chaque tournoi apparaissent au mot ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach : la barre pousse au mot, et
#     au partage, la moyenne 3,25 se trace en pointillé ;
#   · fin : « un tournoi de plus à 7 buts : nouvelle moyenne ? » (réponse : 4).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/5e-stats-moyenne-short.json ; calage :
# manim/scripts/5e/stats5_moyenne_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_moyenne_short.py StatsMoyenneShort5e -o eleveai-maths-5e-stats-moyenne-short --media_dir manim/scripts/5e/media-moyenne-short
# Sortie : manim/sorties/5e/maths/statistiques/07-moyenne/eleveai-maths-5e-stats-moyenne-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_moyenne import BUTS, COUL, MOY, TOURNOIS, ballon  # noqa: E402

Y_TXT = -0.15
XS = [-1.5, -0.5, 0.5, 1.5]   # les quatre tas de ballons
R = 0.12


def place(k, j):
    """La j-ième place du tas k (deux colonnes, de bas en haut)."""
    return P(XS[k] - 0.15 + 0.3 * (j % 2), 0.75 + 0.3 * (j // 2))


class StatsMoyenneShort5e(Short5):
    nom_voix = "5e-stats-moyenne-short"
    fichier_marques = "stats5_moyenne_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Mbappé : la moyenne", "jaune")
        self.add(badge)
        g = Barres(TOURNOIS, BUTS, pas=2, maxi=8, couleurs=COUL, nom_axe="Buts", largeur=3.0, hauteur=1.7, fs=22)
        g.scale_to_fit_height(2.0).move_to(P(0, -2.0))
        tas = [VGroup(*[ballon(R).move_to(place(k, j)) for j in range(BUTS[k])]) for k in range(4)]
        ans = VGroup(*[self.t(TOURNOIS[k], 24, WHITE).move_to(P(XS[k], 0.45)) for k in range(4)])

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), run_time=0.3)
        self.au_mot("en équipe de France")
        self.play(FadeIn(g.fond, shift=UP * 0.2), run_time=0.4)
        self.au_mot("combien de buts en moyenne")
        q = self.t("En moyenne ?", 42, ORANGE_RETENUE).move_to(P(0, 1.4))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : les ballons, puis le partage ──
        self.dire("01-image")
        self.play(FadeOut(q), run_time=0.2)
        mots = ["4 buts en 2018", "0 à l'Euro 2020", "8 en 2022", "1 en 2024"]
        for k in range(4):
            self.au_mot(mots[k])
            anims = [FadeIn(ans[k]), g.pousser(k, run_time=0.4), FadeIn(g.valeur(k, fs=24), scale=1.5)]
            if BUTS[k]:
                anims.append(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in tas[k]], lag_ratio=0.08))
            self.play(*anims, run_time=0.5)
        self.au_mot("Je partage les 13 buts")
        tous = [b for t in tas for b in t]
        n13 = self.ligne([("13", JAUNE_TITRE), ("buts", WHITE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeIn(n13), *[Indicate(b, color=JAUNE_TITRE) for b in tous], run_time=0.5)
        self.au_mot("en 4 parts égales")
        cibles = [place(k, j) for k in range(4) for j in range(3)]
        self.play(*[b.animate.move_to(c) for b, c in zip(tous[:12], cibles)],
                  tous[12].animate.move_to(P(0, 1.75)).scale(1.6), run_time=1.0)
        quarts = VGroup(*[Sector(radius=R * 1.6, start_angle=PI / 2 - k * PI / 2, angle=-PI / 2, fill_color=WHITE,
                                 fill_opacity=1, stroke_color="#0f172a", stroke_width=2).move_arc_center_to(P(0, 1.75))
                          for k in range(4)])
        self.remove(tous[12])
        self.add(quarts)
        self.play(*[quarts[k].animate.scale(1 / 1.6).move_to(place(k, 3)) for k in range(4)], run_time=0.8)
        self.au_mot("3,25 buts par tournoi")
        lm = DashedLine(g.y_axe(MOY) * 0 + P(g.axe_x.get_start()[0], g.y_axe(MOY)[1]),
                        P(g.axe_x.get_end()[0], g.y_axe(MOY)[1]), color=AMBRE, stroke_width=5, dash_length=0.1)
        r = self.ligne([("=", WHITE), ("3,25", AMBRE), ("par tournoi", WHITE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeOut(n13), FadeIn(r, scale=0.7), Create(lm), run_time=0.5)
        self.insister(r[1], 1.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("un tournoi de plus à 7 buts")
        q2 = self.ligne([("+ 1 tournoi à", WHITE), ("7", JAUNE_TITRE), ("buts", WHITE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeOut(r), FadeIn(q2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("nouvelle moyenne")
        q3 = self.ligne([("nouvelle moyenne", WHITE), ("?", ORANGE_RETENUE)], 34).move_to(P(0, 2.08))
        self.play(FadeIn(q3, scale=0.7), run_time=0.35)
        self.insister(q3[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeOut(q2), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
