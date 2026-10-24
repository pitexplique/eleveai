# stats_nuage_lire_short.py
# EleveAI — Maths 1re (tronc commun) / STMG — short jumeau de l'épisode
# « Lire un nuage de points ». CEINTURE JAUNE (un cran sous la paysage orange).
# Il AMUSE : « Le point le plus haut ? »
#   · en HAUT, le ballon saute au-dessus de chaque saison ; le point qu'il
#     survole apparaît EN MÊME TEMPS en bas, dans le nuage du coach ;
#   · le record (29 ; 33) se lit avec les deux pointillés (orange puis violet) ;
#   · 1 question-pause (compte à rebours 3 s) : « 20 ; 18 : que vaut 18 ? » ;
#   · fin : Real Madrid 2024-25, 34 matchs et 31 buts : « combien de buts de plus
#     que sa saison à 34 matchs au PSG ? » (31 − 29 = 2), réponds en commentaire.
# ⭐ Données RÉELLES : voir l'en-tête de stats_nuage_lire.py (source et date).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
#
# Voix : manim/voix/lycee-stats-nuage-lire-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_nuage_lire_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_nuage_lire_short.py StatsNuageLireShort -o eleveai-maths-stmg-stats-nuage-lire-short --media_dir manim/scripts/stmg/media-stats-nuage-lire-short
# Sorties : manim/sorties/stmg/maths/statistiques/18-nuage-lire/eleveai-maths-stmg-stats-nuage-lire-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/11-nuage-lire/eleveai-maths-premiere-commun-stats-nuage-lire-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403
from stats_nuage_lire import BUTS, MATCHS, ballon  # noqa: E402

Y_IMG, Y_TXT = 1.75, 1.05
HAUT_CARTE = 0.55


class StatsNuageLireShort(ShortH2):
    nom_voix = "lycee-stats-nuage-lire-short"
    fichier_marques = "stats_nuage_lire_short_marques.json"

    def nuage(self):
        n = Nuage(MATCHS, BUTS, 15, 40, 10, 35, largeur=3.1, hauteur=2.5, fs=19, nom_x="Matchs joués",
                  nom_y="Buts")
        if n.width > config.frame_width - 0.3:
            n.scale_to_fit_width(config.frame_width - 0.3)
        if n.height > HAUT_CARTE + 3.72:  # jamais collé au bas du cadre
            n.scale_to_fit_height(HAUT_CARTE + 3.72)
        return n.move_to(P(0, HAUT_CARTE - n.height / 2))

    def texte_haut(self, morceaux, fs=34):
        return self.ligne(morceaux, fs).move_to(P(0, Y_TXT))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Mbappé au PSG", "jaune")
        self.add(badge)
        n = self.nuage()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), run_time=0.6)
        self.au_mot("7 saisons")
        t0 = self.texte_haut([("7", AMBRE), ("saisons au PSG", WHITE)])
        self.play(FadeIn(t0, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Chaque point")
        b = ballon(0.3).move_to(P(n.p(MATCHS[0], 10)[0], Y_IMG))
        self.play(FadeIn(b, shift=DOWN * 0.3), FadeOut(t0), run_time=0.3)
        ordre = sorted(range(len(MATCHS)), key=lambda i: (MATCHS[i], BUTS[i]))
        for i in ordre:  # le ballon saute au-dessus de la saison, le point naît dessous
            x = n.p(MATCHS[i], 10)[0]
            self.play(b.animate.move_to(P(x, Y_IMG)), FadeIn(n.ronds[i], scale=0.2), run_time=0.2)
        self.au_mot("ses matchs")
        self.play(Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.3), run_time=0.5)
        self.au_mot("et ses buts")
        self.play(Indicate(n.nom_y, color=VIOLET_H, scale_factor=1.4), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : le point le plus haut ──
        self.dire("01-image")
        self.au_mot("Le point le plus haut")
        t1 = self.texte_haut([("Le plus haut ?", ORANGE_RETENUE)], 38)
        self.play(b.animate.move_to(P(n.p(29, 10)[0], Y_IMG)), FadeIn(t1), n.allumer(1), run_time=0.5)
        self.au_mot("Je descends")
        lus = VGroup(n.vers_x(1), n.lu_x(29), n.vers_y(1), n.lu_y(33))
        self.play(Create(lus[0]), run_time=0.6)
        self.au_mot("29 matchs")
        t2 = self.texte_haut([("29", ORANGE_V), ("matchs", WHITE)], 38)
        self.play(FadeIn(lus[1], scale=1.6), FadeOut(t1), FadeIn(t2), run_time=0.35)
        self.au_mot("Je vais à gauche")
        self.play(Create(lus[2]), run_time=0.6)
        self.au_mot("33 buts")
        t3 = self.texte_haut([("29", ORANGE_V), ("matchs,", WHITE), ("33", VIOLET_CLAIR), ("buts !", WHITE)], 36)
        self.play(FadeIn(lus[3], scale=1.6), FadeOut(t2), FadeIn(t3), run_time=0.35)
        self.play(Flash(n.ronds[1], color=AMBRE), b.animate.shift(UP * 0.25), rate_func=there_and_back, run_time=0.5)
        self.au_mot("Son record")
        t4 = self.texte_haut([("Record :", JAUNE_TITRE), ("2018-2019", JAUNE_TITRE)], 36).set_y(Y_IMG)
        self.play(FadeOut(b), FadeIn(t4, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(t3, t4, lus, n)), run_time=0.4)
        n.ronds[1].scale(1 / 1.6).set_stroke(WHITE, width=2)  # éteint, hors scène

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Ce point : (20 ; 18).", "Que vaut 18 ?"],
                            ["les matchs", "les buts", "la saison"], 1,
                            ["L'ordonnée se lit en hauteur,", "sur l'axe vertical."], mot_q="Ce point")
        q_objs = [m for m in self.mobjects if m not in (badge, titre) and m is not self.mobjects[0]]
        self.play(*[FadeOut(m) for m in q_objs], run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        self.play(FadeIn(n), run_time=0.4)
        self.au_mot("En 2024-2025")
        t5 = self.texte_haut([("2024-2025 :", JAUNE_TITRE), ("Real Madrid", WHITE)], 34).set_y(Y_IMG)
        self.play(FadeIn(t5, shift=UP * 0.15), run_time=0.4)
        self.au_mot("34 matchs")
        v = n.verticale(34)
        self.play(Create(v), FadeIn(n.lu_x(34), scale=1.6), run_time=0.5)
        self.au_mot("31 buts")
        neuf = Star(5, outer_radius=0.13, inner_radius=0.06, fill_color=BLEU_CALCUL, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=2).move_to(n.p(34, 31))
        t6 = self.texte_haut([("34", ORANGE_V), ("matchs,", WHITE), ("31", VIOLET_CLAIR), ("buts", WHITE)], 34)
        self.play(GrowFromCenter(neuf), FadeIn(n.lu_y(31), scale=1.6), FadeIn(t6), run_time=0.45)
        self.au_mot("Combien de buts de plus")
        anneau = Circle(radius=0.13, stroke_color=AMBRE, stroke_width=4).move_to(n.ronds[5])
        self.play(Create(anneau), FadeOut(VGroup(t5, t6)), run_time=0.35)
        # la LOUPE : la bande de 28 à 32 buts, agrandie au-dessus du nuage
        cy, k, cx = 1.25, 0.26, -1.0
        y = lambda v: cy + (v - 30) * k  # noqa: E731
        carte = RoundedRectangle(width=2.2, height=1.5, corner_radius=0.15, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=AMBRE, stroke_width=4).move_to(P(cx, cy))
        grille = VGroup(*[Line(P(cx - 0.75, y(v)), P(cx + 0.95, y(v)), color=GRILLE_FORTE if v % 5 == 0 else GRILLE,
                               stroke_width=3 if v % 5 == 0 else 1.6) for v in range(28, 33)])
        axe = Line(P(cx - 0.75, y(27.6)), P(cx - 0.75, y(32.4)), color=NUIT, stroke_width=4)
        lab = texte(30, 20, ENCRE).next_to(P(cx - 0.75, y(30)), LEFT, buff=0.06)
        p29 = Dot(P(cx + 0.2, y(29)), radius=0.1, fill_color=ROUGE_PT, stroke_color=AMBRE, stroke_width=4)
        p31 = neuf.copy().scale(1.4).move_to(P(cx + 0.2, y(31)))
        liens = VGroup(DashedLine(n.p(34, 30) + LEFT * 0.12, carte.get_corner(DL), color=AMBRE, stroke_width=2),
                       DashedLine(n.p(34, 30) + RIGHT * 0.12, carte.get_corner(DR), color=AMBRE, stroke_width=2))
        self.play(Create(liens), FadeIn(VGroup(carte, grille, axe, lab), scale=0.4), run_time=0.5)
        self.play(FadeIn(p29, scale=0.4), FadeIn(p31, scale=0.4), run_time=0.35)
        fl = DoubleArrow(P(cx + 0.6, y(29)), P(cx + 0.6, y(31)), buff=0, color=ORANGE_RETENUE, stroke_width=5,
                         tip_length=0.13, max_tip_length_to_length_ratio=0.4)
        pq = self.t("?", 44, ORANGE_RETENUE).next_to(fl, RIGHT, buff=0.08)
        self.au_mot("au PSG")
        self.play(GrowFromCenter(fl), FadeIn(pq, scale=1.6), run_time=0.45)
        self.insister(pq, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 28, VERT_OK), self.t("commentaire !", 28, VERT_OK)).arrange(DOWN, buff=0.08)
        appel.scale_to_fit_width(min(appel.width, 1.5)).move_to(P(1.2, cy))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
