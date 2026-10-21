# stats_frequence_short.py
# EleveAI — Maths 4e — short jumeau de la série « Statistiques », épisode 04 :
# calculer une fréquence. CEINTURE ORANGE (un cran sous la paysage verte). Il
# AMUSE : « Quel est le groupe sanguin le plus rare en France ? »
#   · en HAUT, la goutte du groupe (sa couleur) et son pourcentage ;
#   · en BAS, EN MÊME TEMPS, la grille de 100 cases se colorie (une case = 1 %) :
#     A 45, O 42, B 9, AB 4 (chiffres de l'EFS couramment cités, arrondis) ;
#   · 45 + 42 + 9 + 4 = 100 % ; fin : « 200 donneurs : combien de AB, environ ? »
#     (réponse 4 % de 200 = 8), « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/4e-stats-frequence-short.json (débit −10) ; marques :
# manim/scripts/4e/stats_frequence_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_frequence_short.py StatsFrequenceShort4e -o eleveai-maths-4e-stats-frequence-short --media_dir manim/scripts/4e/media-frequence-short
# Sortie : manim/sorties/4e/maths/statistiques/04-frequence/eleveai-maths-4e-stats-frequence-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403
from stats_frequence import COUL, FRANCE, GROUPES, colorier, goutte, grille100  # noqa: E402

Y_IMG, Y_TXT = 1.75, 1.0


class StatsFrequenceShort4e(Short4e):
    nom_voix = "4e-stats-frequence-short"
    fichier_marques = "stats_frequence_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Sang rare ?", "orange")
        self.add(badge)
        gr = grille100(0, COUL[0], 0.31, 0.04).move_to(P(0, -1.25))
        cadre = SurroundingRectangle(gr, color=GRILLE, buff=0.08, stroke_width=3)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), run_time=0.5)
        self.au_mot("le plus rare")
        gts = VGroup(*[goutte(0.2, c) for c in COUL]).arrange(RIGHT, buff=0.4).move_to(P(0, Y_IMG))
        q = self.t("?", 56, ORANGE_RETENUE).next_to(gts, RIGHT, buff=0.25)
        self.play(LaggedStart(*[FadeIn(g, shift=DOWN * 0.3) for g in gts], lag_ratio=0.2), FadeIn(q), run_time=0.7)
        self.au_mot("100 cases")
        cent = self.ligne([("100", AMBRE), ("cases", WHITE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeIn(gr, scale=0.9), Create(cadre), FadeIn(cent), run_time=0.6)
        self.au_mot("une case")
        un = self.ligne([("1 case", WHITE), ("=", WHITE), ("1 %", AMBRE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeOut(cent), FadeIn(un), gr[0].animate.set_fill(AMBRE), run_time=0.4)
        self.au_mot("1 %")
        self.play(Indicate(gr[0], color=AMBRE, scale_factor=2.0), Indicate(un[2]), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : la grille se colorie ──
        self.dire("01-image")
        self.play(FadeOut(un), FadeOut(gts), FadeOut(q), gr[0].animate.set_fill(WHITE), run_time=0.3)
        debut = 0
        img = None
        for i, (mot, mot_n) in enumerate([("Groupe A", "45 cases"), ("Groupe O", "42 cases"), ("Groupe B", "9 cases"),
                                          ("pour le groupe AB", "reste 4")]):
            self.au_mot(mot_n if i == 3 else mot)
            neuf = VGroup(goutte(0.26, COUL[i]), self.t(GROUPES[i], 44, COUL[i])).arrange(RIGHT, buff=0.25)
            neuf.move_to(P(0, Y_IMG))
            n = FRANCE[i]
            lab = self.ligne([(f"{n} cases", COUL[i])], 38).move_to(P(0, Y_TXT))
            anims = [FadeIn(neuf, shift=DOWN * 0.2)] + ([FadeOut(img)] if img is not None else [])
            if i < 3:
                self.play(*anims, run_time=0.3)
                self.au_mot(mot_n)
                self.play(FadeIn(lab, scale=1.3), colorier(gr, debut, debut + n, COUL[i], 0.9 if n > 20 else 0.5))
            else:
                self.play(*anims, FadeIn(lab, scale=1.3), colorier(gr, debut, debut + n, COUL[i], 0.5))
            img = VGroup(neuf, lab)
            debut += n
            if i == 3:
                self.au_mot("le plus rare")
                rare = self.t("le plus rare !", 40, ORANGE_RETENUE).move_to(P(0, Y_TXT))
                self.play(FadeOut(lab), FadeIn(rare, scale=0.7),
                          *[Indicate(gr[k], color=ORANGE_RETENUE, scale_factor=1.6) for k in range(96, 100)],
                          run_time=0.6)
                img = VGroup(neuf, rare)
        self.au_mot("45 plus")
        som = self.ligne([("45", COUL[0]), ("+", WHITE), ("42", COUL[1]), ("+", WHITE), ("9", COUL[2]), ("+", WHITE),
                          ("4", COUL[3])], 40, 0.1).move_to(P(0, Y_IMG))
        self.play(FadeOut(img), FadeIn(som[0], scale=1.4), run_time=0.3)
        for k, mot in enumerate(["42 plus", "9 plus", "4, égale"]):
            self.au_mot(mot)
            self.play(FadeIn(som[2 * k + 1]), FadeIn(som[2 * k + 2], scale=1.4), run_time=0.25)
        self.au_mot("100 %")
        tot = self.ligne([("=", WHITE), ("100 %", VERT_OK)], 44).move_to(P(0, Y_TXT))
        self.play(FadeIn(tot, scale=0.7), Circumscribe(cadre, color=VERT_OK), run_time=0.6)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("200 donneurs")
        d = self.ligne([("200", AMBRE), ("donneurs", WHITE)], 40).move_to(P(0, Y_IMG))
        self.play(FadeOut(som, shift=UP * 0.2), FadeOut(tot), FadeIn(d, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("Combien seront du groupe AB")
        q2 = self.ligne([("AB", COUL[3]), ("sur 200 :", WHITE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, Y_TXT))
        self.play(FadeIn(q2, shift=UP * 0.2), *[Indicate(gr[k], color=ORANGE_RETENUE) for k in range(96, 100)],
                  run_time=0.5)
        self.insister(q2[2], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeOut(d), q2.animate.move_to(P(0, Y_IMG)), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
