# proba_bern_esperance_short.py
# EleveAI — Maths STMG — short jumeau de « L'espérance d'une loi de
# Bernoulli : p ». CEINTURE JAUNE. Il AMUSE : une file de 300 clients,
#   · en HAUT : cinq clients, un seul repart avec un sac vert (éco-responsable),
#     puis la foule de 300 clients d'où 60 sacs verts s'allument ;
#   · en BAS, EN MÊME TEMPS : « un client sur cinq », « 300 clients : combien ? »,
#     « E(X) = p = 0,2 », « 300 × 0,2 ≈ 60 » ;
#   · fin : la carte sans contact, « 35 % », « sur 200 clients : ? » et
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran.
#
# Voix : manim/voix/stmg-proba-bern-esperance-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_esperance_short.py ShortProbaBernEsperance -o eleveai-maths-stmg-proba-bern-esperance-short --media_dir manim/scripts/stmg/media-bern_esperance
# Puis copier dans manim/sorties/stmg/maths/probabilites/31-bern-esperance/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bern_esperance import (SUCCES, P, allumer_eco, carte_sans_contact, client_eco,  # noqa: E402
                                  file_clients)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import suite  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaBernEsperance(Short6e):
    nom_voix = "stmg-proba-bern-esperance-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : un client sur cinq… sur 300 ? ──
        self.dire("00-accroche")
        titre = self.grand("Éco-responsable ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        cinq = VGroup(*[client_eco(0.62) for _ in range(5)]).arrange(RIGHT, buff=0.22).move_to(P(0, 0.75))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(c, shift=LEFT * 0.3) for c in cinq], lag_ratio=0.12), run_time=0.8)
        self.au_mot("Un client sur cinq")
        un5 = self.t("un client sur cinq", 36, JAUNE_TITRE).move_to(P(0, -1.3))
        self.play(FadeIn(un5, shift=UP * 0.15), cinq[1:].animate.set_opacity(0.4), run_time=0.4)
        self.au_mot("achète éco-responsable")
        f = allumer_eco(cinq[0], self, 0.45)
        self.insister(VGroup(cinq[0], f), 1.3)
        self.au_mot("Sur 300 clients")
        g, allumes = file_clients(20, 15, 0.2, 0.175, 0.15, 974, 60)
        g.move_to(P(0, 0.7))
        n300 = self.t("300 clients :", 38, BLEU_CALCUL).move_to(P(-0.55, -2.15))
        q = self.t("?", 56, ORANGE_RETENUE, weight=BOLD).next_to(n300, RIGHT, buff=0.25)
        self.play(FadeOut(VGroup(cinq, f), scale=0.4), FadeOut(badge),
                  LaggedStart(*[FadeIn(VGroup(*g[20 * r:20 * (r + 1)]), shift=DOWN * 0.15) for r in range(15)],
                              lag_ratio=0.06), FadeIn(n300, shift=UP * 0.15), run_time=0.9)
        self.au_mot("combien")
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : E = p = 0,2, et 60 sacs verts s'allument ──
        self.dire("01-image")
        self.play(FadeOut(un5, shift=UP * 0.2), run_time=0.3)
        self.au_mot("c'est p")
        e1 = suite(self.t("E(X)", 36, JAUNE_TITRE, weight=BOLD), self.t("=", 36), self.t("p", 42, JAUNE_TITRE, weight=BOLD),
                   buff=0.18).move_to(P(0, -1.3))
        self.play(FadeIn(e1, scale=0.5), run_time=0.4)
        self.au_mot(": 0,2")
        e2 = VGroup(self.t("=", 36), self.t("0,2", 42, VERT_OK, weight=BOLD)).arrange(RIGHT, buff=0.18)
        self.play(e1.animate.shift(LEFT * 0.7), run_time=0.25)
        e2.next_to(e1, RIGHT, buff=0.18)
        self.play(FadeIn(e2, scale=0.5), run_time=0.3)
        self.insister(e2[1], 1.4)
        self.au_mot("300 fois 0,2")
        calc = suite(self.t("300", 36, BLEU_CALCUL), self.t("×", 36), self.t("0,2", 36, VERT_OK), buff=0.13)
        calc.move_to(P(-0.65, -2.15))
        self.play(FadeOut(n300, shift=LEFT * 0.3), FadeOut(q), FadeIn(calc, shift=UP * 0.15), run_time=0.35)
        self.play(LaggedStart(*[g[i].animate.set_fill(SUCCES).scale(1.25) for i in allumes], lag_ratio=0.05),
                  run_time=1.6)
        self.au_mot("environ 60")
        r60 = suite(self.t("≈", 38), self.t("60", 46, SUCCES, weight=BOLD), buff=0.13).next_to(calc, RIGHT, buff=0.15)
        self.play(FadeIn(r60, scale=0.4), *[Flash(g[i], color=SUCCES, line_length=0.08, num_lines=6)
                                             for i in allumes[::5]], run_time=0.5)
        self.insister(r60[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 35 % sans contact, 200 clients ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.35))
        carte = carte_sans_contact(1.3).move_to(P(-0.25, 1.75))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(g, e1, e2, calc, r60), shift=DOWN * 0.3),
                  run_time=0.5)
        self.au_mot("35 %")
        p35 = self.t("35 %", 56, JAUNE_TITRE, weight=BOLD).move_to(P(0, 0.45))
        sc = self.t("sans contact", 36).next_to(p35, DOWN, buff=0.15)
        self.play(FadeIn(carte, shift=UP * 0.2), FadeIn(p35, scale=0.5), run_time=0.45)
        self.au_mot("sans contact")
        self.play(FadeIn(sc, shift=UP * 0.1), Wiggle(carte[3]), run_time=0.6)
        self.au_mot("combien sur 200 clients")
        s200 = suite(self.t("sur 200 clients :", 31, BLEU_CALCUL), self.t("?", 50, ORANGE_RETENUE, weight=BOLD),
                     buff=0.2).move_to(P(0, -1.0))
        self.play(FadeIn(s200, shift=UP * 0.15), run_time=0.4)
        self.insister(s200[1], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
