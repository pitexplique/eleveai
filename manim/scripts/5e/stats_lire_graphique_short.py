# stats_lire_graphique_short.py
# EleveAI — Maths 5e / 4e — short jumeau de la série « Statistiques » (cycle 4),
# épisode commun « lire un diagramme ». CEINTURE BLANCHE. Il AMUSE :
# « À quel niveau les joueurs abandonnent-ils le plus ? Devine ! »
#   · en HAUT, l'écran du jeu : le héros saute de plateforme en plateforme ;
#     au niveau 3, un MUR se dresse ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (canvas_stats.Barres, axe de
#     10 en 10) : la barre du niveau pousse quand le héros y arrive, et sa
#     valeur s'écrit au mot (35, 20, 75, 15, 5) ;
#   · fin : l'écart entre les niveaux 3 et 2 marqué « ? » (réponse : 55).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# Voix : manim/voix/5e-stats-lire-graphique-short.json ; calage :
# manim/scripts/5e/stats5_lire_graphique_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_lire_graphique_short.py StatsLireGraphiqueShort -o eleveai-maths-5e-stats-lire-graphique-short --media_dir manim/scripts/5e/media-lire-graphique-short
# Sorties : manim/sorties/5e/maths/statistiques/03-lire-graphique/eleveai-maths-5e-stats-lire-graphique-short.mp4
#           manim/sorties/4e/maths/statistiques/02-lire-graphique/eleveai-maths-4e-stats-lire-graphique-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_graphique import ABANDONS, COUL, NIV, ecran_jeu, heros  # noqa: E402

Y_TXT = 0.15


class StatsLireGraphiqueShort(Short5):
    nom_voix = "5e-stats-lire-graphique-short"
    fichier_marques = "stats5_lire_graphique_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le niveau maudit", "blanche")
        self.add(badge)
        jeu, plats = ecran_jeu(4.1, 1.7)
        jeu.move_to(P(0, 1.35))
        h = heros(0.18).next_to(plats[0], UP, buff=0)
        g = Barres(NIV, ABANDONS, pas=20, maxi=80, couleurs=COUL, largeur=3.0, hauteur=1.7, fs=22, nom_axe="Abandons")
        g.scale_to_fit_height(2.15).move_to(P(0.1, -1.95))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), FadeIn(jeu[0]), run_time=0.4)
        self.au_mot("cinq niveaux")
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in plats], lag_ratio=0.15), FadeIn(h),
                  FadeIn(g.fond), run_time=0.8)
        self.au_mot("abandonnent-ils le plus")
        q = self.t("Où ça bloque ?", 36, ORANGE_RETENUE).move_to(P(0, Y_TXT))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.au_mot("Devine")
        self.insister(q, 1.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : les barres poussent avec le héros ──
        self.dire("01-image")
        self.play(FadeOut(q), run_time=0.2)
        mots = ["35 abandons", "20.", "75 !", "15.", "5. Le"]
        niveaux = ["Niveau 1", "Niveau 2", "Niveau 3", "Niveau 4", "Niveau 5"]
        mur = None
        for i in range(5):
            self.au_mot(niveaux[i])
            anims = [h.animate.next_to(plats[i], UP, buff=0)] if i else [Indicate(h)]
            self.play(*anims, g.pousser(i, run_time=0.4), run_time=0.4)
            self.au_mot(mots[i])
            v = g.valeur(i, fs=26)
            self.play(FadeIn(v, scale=1.8), Indicate(plats[i], color=WHITE), run_time=0.3)
            if i == 2:
                mur = VGroup(*[Rectangle(width=0.22, height=0.14, fill_color="#b91c1c", fill_opacity=1,
                                         stroke_color="#fecaca", stroke_width=2) for _ in range(12)])
                mur.arrange_in_grid(4, 3, buff=0.0).next_to(plats[2], UP, buff=0).shift(RIGHT * 0.2)
                self.play(GrowFromEdge(mur, DOWN), Flash(g.barres[2], color=ROUGE_ERREUR), run_time=0.4)
        self.au_mot("un vrai mur")
        m = self.ligne([("Niveau 3 :", WHITE), ("un mur !", ROUGE_ERREUR)], 40).move_to(P(0, Y_TXT))
        self.play(FadeIn(m, scale=0.7), g.focus(2, 0.5), Wiggle(mur), run_time=0.6)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("combien d'abandons de plus")
        self.play(FadeOut(m), g.estomper([1, 2], 0.35), run_time=0.35)
        xg = g.barres[2].get_left()[0] - 0.08
        niveau = DashedLine(g.barres[1].get_corner(UR), P(xg, g.barres[1].get_top()[1]), color=AMBRE,
                            stroke_width=4, dash_length=0.08)
        ecart = DoubleArrow(P(xg, g.barres[1].get_top()[1]), P(xg, g.barres[2].get_top()[1]), buff=0,
                            color=ORANGE_RETENUE, stroke_width=5, tip_length=0.12)
        pq = self.t("?", 44, ORANGE_RETENUE).set_stroke(WHITE, 4, background=True).next_to(ecart, LEFT, buff=0.06)
        qq = self.ligne([("Niveau 3", WHITE), ("−", WHITE), ("niveau 2", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)],
                        34).move_to(P(0, Y_TXT))
        self.play(Create(niveau), GrowFromCenter(ecart), FadeIn(pq, scale=1.5), FadeIn(qq, shift=UP * 0.2),
                  run_time=0.5)
        self.insister(pq, 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT - 0.48))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
