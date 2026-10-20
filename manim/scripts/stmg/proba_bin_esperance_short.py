# proba_bin_esperance_short.py
# EleveAI — Maths STMG — short jumeau de « L'espérance d'une loi binomiale :
# n × p ». CEINTURE JAUNE. Il AMUSE : on parie sur le nombre de recrues.
#   · en HAUT : 200 téléphones ; les appels qui aboutissent s'allument, puis
#     d'autres campagnes clignotent (jamais exactement le même nombre) ;
#   · en BAS, EN MÊME TEMPS : « 200 appels », « 15 % de réussite »,
#     « Combien de recrues ? », « 200 × 0,15 = 30 », « pas forcément 30 à
#     chaque fois », « c'est une moyenne ! » ;
#   · fin : 50 clients, « 40 % satisfaits », « En moyenne : ? » et
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/stmg-proba-bin-esperance-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_esperance_short.py ShortProbaBinEsperance -o eleveai-maths-stmg-proba-bin-esperance-short --media_dir manim/scripts/stmg/media-vaT_bin_esperance-s
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/47-bin-esperance/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_esperance import CalageVoix, ALLUME, COUL_N, COUL_P, GrilleAppels, P, tirage  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import suite  # noqa: E402
from proba_bern_epreuve import client  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaBinEsperance(CalageVoix, Short6e):
    nom_voix = "stmg-proba-bin-esperance-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, *morceaux, largeur=LARGEUR_MAX, buff=0.15):
        g = suite(*morceaux, buff=buff)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 200 appels, 15 %, combien de recrues ? ──
        self.dire("00-accroche")
        titre = self.grand("Campagne d'appels", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        g = GrilleAppels(h=0.2, pas_x=0.2, pas_y=0.25).move_to(P(0, 0.5))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("200 appels")
        l1 = self.t("200 appels,", 40, COUL_N).move_to(P(0, -1.0))
        self.play(LaggedStart(*[FadeIn(tl, scale=0.4) for tl in g.tels], lag_ratio=0.004),
                  FadeIn(l1, shift=UP * 0.15), run_time=0.9)
        self.au_mot("15 %")
        l2 = self.ligne(self.t("15 %", 40, COUL_P), self.t("de réussite", 34)).move_to(P(0, -1.65))
        self.play(FadeIn(l2, shift=UP * 0.15), *g.allumer(tirage(30, 21)), run_time=0.5)
        self.au_mot("Combien de recrues")
        q = self.t("Combien de recrues ?", 38, ORANGE_RETENUE).move_to(P(0, -2.4))
        self.play(FadeIn(q, scale=0.6), *g.allumer(tirage(27, 22)), run_time=0.4)
        self.play(*g.allumer(tirage(33, 23)), run_time=0.3)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : en moyenne 30… mais pas forcément 30 ! ──
        self.dire("01-image")
        moy = self.grand("En moyenne :", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeOut(badge, shift=UP * 0.2), FadeOut(VGroup(l1, l2, q), shift=DOWN * 0.2),
                  ReplacementTransform(titre, moy), g.animate.move_to(P(0, 1.45)), run_time=0.5)
        calc = self.ligne(self.t("200", 50, COUL_N), self.t("×", 46), self.t("0,15", 50, COUL_P),
                          self.t("=", 46), self.t("30", 60, VERT_OK), buff=0.15).move_to(P(0, -0.3))
        self.au_mot("200 fois")
        self.play(FadeIn(calc[:3], shift=UP * 0.15), run_time=0.4)
        self.au_mot(": 30")
        self.play(FadeIn(calc[3:], scale=1.6), *g.allumer(tirage(30, 24)), run_time=0.4)
        self.play(Flash(calc[4], color=VERT_OK, line_length=0.3), run_time=0.4)
        self.insister(calc[4], 1.3)
        self.au_mot("Pas forcément")
        pas = VGroup(self.t("pas forcément 30", 36, ROUGE_ERREUR), self.t("à chaque fois", 36, ROUGE_ERREUR))
        pas.arrange(DOWN, buff=0.1).move_to(P(0, -1.38))
        self.play(FadeIn(pas, shift=UP * 0.15), *g.allumer(tirage(25, 25)), run_time=0.35)
        for k, graine in ((34, 26), (28, 27), (32, 28), (26, 29)):
            self.play(*g.allumer(tirage(k, graine)), run_time=0.25)
        self.au_mot("c'est une moyenne")
        fin = self.t("c'est une moyenne !", 40, VERT_OK).move_to(P(0, -2.35))
        self.play(FadeIn(fin, scale=0.6), *g.allumer(tirage(30, 24)), run_time=0.4)
        self.insister(moy, 1.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 50 clients, 40 % ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))
        cl = VGroup(*[client(0.31) for _ in range(50)]).arrange_in_grid(5, 10, buff=(0.06, 0.12)).move_to(P(0, 1.6))
        self.play(ReplacementTransform(moy, toi), FadeOut(VGroup(g, calc, pas, fin), shift=DOWN * 0.3),
                  run_time=0.4)
        self.au_mot("50 clients")
        a = self.t("50 clients,", 40, COUL_N)
        b = self.t("40 % satisfaits", 40, COUL_P)
        a.move_to(P(0, -0.15))
        b.move_to(P(0, -0.7))
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cl], lag_ratio=0.01), FadeIn(a), run_time=0.6)
        self.au_mot("40 %")
        self.play(FadeIn(b, shift=UP * 0.15), *[cl[k][1].animate.set_fill(ALLUME) for k in tirage(19, 30, 50)],
                  run_time=0.5)
        self.au_mot("combien en moyenne")
        pq = self.ligne(self.t("En moyenne :", 40), self.t("?", 60, ORANGE_RETENUE), buff=0.2).move_to(P(0, -1.35))
        self.play(FadeIn(pq, scale=0.6), run_time=0.35)
        self.insister(pq[1], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
