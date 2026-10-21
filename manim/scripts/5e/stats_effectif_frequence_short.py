# stats_effectif_frequence_short.py
# EleveAI — Maths 5e (et 3e) — short jumeau de la série « Statistiques »
# (cycle 4), épisode « effectif et fréquence ». CEINTURE JAUNE (un cran sous la
# paysage verte : on VOIT les parts, sans poser le calcul). Il AMUSE :
# « 4 gauchers, c'est plus que 3… et pourtant ! »
#   · en HAUT, les deux groupes dessinés (classe de 25, club de 40), les
#     gauchers s'allument en orange au mot ;
#   · en BAS, EN MÊME TEMPS, deux grilles de 100 : 12 cases orange pour la
#     classe au mot « 12 % », 10 pour le club au mot « 10 % » ;
#   · fin : un groupe de 20 avec 2 gauchers, « fréquence ? » (réponse : 0,1).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous le nom 3e.
# Voix : manim/voix/5e-stats-effectif-frequence-short.json ; calage :
# manim/scripts/5e/stats5_effectif_frequence_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_effectif_frequence_short.py StatsEffectifFrequenceShort -o eleveai-maths-5e-stats-effectif-frequence-short --media_dir manim/scripts/5e/media-effectif-frequence-short
# Sorties : manim/sorties/5e/maths/statistiques/04-effectif-frequence/eleveai-maths-5e-stats-effectif-frequence-short.mp4
#           manim/sorties/3e/maths/statistiques/03-effectif-frequence/eleveai-maths-3e-stats-effectif-frequence-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_effectif_frequence import GAUCHE, groupe, grille100  # noqa: E402

Y_TXT = -0.3


class StatsEffectifFrequenceShort(Short5):
    nom_voix = "5e-stats-effectif-frequence-short"
    fichier_marques = "stats5_effectif_frequence_short_marques.json"

    def allumer(self, g):
        return [g[i].animate.set_color(GAUCHE).scale(1.15) for i in g.gauchers]

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Gauchers : qui gagne ?", "jaune")
        self.add(badge)
        cl = groupe(25, 5, [3, 11, 22], 0.22, 0.07).move_to(P(-1.1, 1.35))
        cb = groupe(40, 8, [5, 14, 26, 35], 0.17, 0.05).move_to(P(1.1, 1.35))
        cb.align_to(cl, DOWN)
        g1 = grille100(0, 0.155).move_to(P(-1.08, -2.0))
        g2 = grille100(0, 0.155).move_to(P(1.08, -2.0))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), run_time=0.3)
        self.au_mot("3 gauchers")
        self.play(FadeIn(cl, scale=0.8), run_time=0.4)
        self.play(*self.allumer(cl), run_time=0.3)
        self.au_mot("classe de 25")
        l1 = self.ligne([("3", GAUCHE), ("sur", WHITE), ("25", BLEU_CALCUL)], 30).next_to(cl, DOWN, buff=0.2)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("4 gauchers")
        self.play(FadeIn(cb, scale=0.8), run_time=0.4)
        self.play(*self.allumer(cb), run_time=0.3)
        self.au_mot("club de 40")
        l2 = self.ligne([("4", GAUCHE), ("sur", WHITE), ("40", BLEU_CALCUL)], 30).next_to(cb, DOWN, buff=0.2)
        l2.align_to(l1, DOWN)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("le plus de gauchers")
        q = self.borne(self.t("Où y en a-t-il le plus ?", 32, ORANGE_RETENUE)).move_to(P(0, Y_TXT))
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.insister(q, 1.1)
        self.attendre_voix(marge=0.1)

        # ── 01 : compare les parts ──
        self.dire("01-image")
        self.au_mot("On dirait le club")
        d = self.ligne([("4", GAUCHE), (">", WHITE), ("3", GAUCHE), ("... le club ?", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(FadeOut(q), FadeIn(d), Indicate(cb, color=WHITE, scale_factor=1.05), run_time=0.4)
        self.au_mot("compare les parts")
        self.play(FadeOut(d), FadeIn(g1, shift=UP * 0.2), FadeIn(g2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Classe : 12 %")
        p1 = self.t("12 %", 40, VERT_OK).next_to(g1, UP, buff=0.12)
        self.play(*[g1[i].animate.set_fill(GAUCHE) for i in range(12)], FadeIn(p1, scale=1.5), run_time=0.5)
        self.au_mot("Club : 10 %")
        p2 = self.t("10 %", 40, VERT_OK).next_to(g2, UP, buff=0.12)
        self.play(*[g2[i].animate.set_fill(GAUCHE) for i in range(10)], FadeIn(p2, scale=1.5), run_time=0.5)
        self.au_mot("C'est la classe qui gagne")
        gg = self.t("La classe gagne !", 38, VERT_OK).move_to(P(0, 0.05))
        self.play(FadeIn(gg, scale=0.7), Circumscribe(VGroup(cl, l1), color=VERT_OK), run_time=0.6)
        self.insister(p1, 1.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Dans un groupe de 20")
        g20 = groupe(20, 5, [6, 17], 0.24, 0.08).move_to(P(0, 1.35))
        t20 = self.ligne([("groupe de", WHITE), ("20", BLEU_CALCUL)], 32).next_to(g20, DOWN, buff=0.2)
        self.play(FadeOut(VGroup(cl, cb, l1, l2, gg, g1, g2, p1, p2)), FadeIn(g20, scale=0.8), FadeIn(t20), run_time=0.5)
        self.au_mot("avec 2 gauchers")
        self.play(*self.allumer(g20), run_time=0.35)
        t2 = self.ligne([("2", GAUCHE), ("gauchers", WHITE)], 32).next_to(t20, DOWN, buff=0.15)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("quelle est la fréquence")
        fq = self.ligne([("fréquence", JAUNE_TITRE), ("=", WHITE), ("?", ORANGE_RETENUE)], 44).move_to(P(0, -1.3))
        self.play(FadeIn(fq, scale=0.7), run_time=0.35)
        self.insister(fq[2], 1.7)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, -2.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
