# proba_bin_defi_short.py
# EleveAI — Maths Tle spé (micro binomiale_defi) — short jumeau de « Loi
# binomiale : un exercice type bac ». Ceinture ORANGE.
# Il AMUSE : 3 % de panneaux défectueux, un lot de 50… aucun défaut, tu
# paries ? 0,97⁵⁰ ≈ 0,22 : une chance sur cinq seulement !
#   · en HAUT le lot de 50 panneaux ; ils s'allument un à un pendant que la
#     jauge « lot parfait » fond ; puis cinq lots, un seul parfait ;
#   · en BAS, EN MÊME TEMPS : 3 %, 50, 0,97⁵⁰ ≈ 0,22, 1 chance sur 5 ;
#   · fin : au moins un défectueux ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Valeurs calculées en Python (0,97⁵⁰ = 0,218).
#
# Voix : manim/voix/terminale-proba-bin-defi-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_bin_defi_short.py ShortProbaBinDefiTerminale -o eleveai-maths-terminale-proba-bin-defi-short --media_dir manim/scripts/terminale/media-bin_defi-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_defi import DEFAUT, MotsCales, P, P0, lot_panneaux, panneau, puissance, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

assert f"{P0:.2f}" == "0.22"
LARGEUR_MAX = 4.0
BLEU_NB = "#60A5FA"
OK = "#22C55E"


class ShortProbaBinDefiTerminale(MotsCales, Short6e):
    fichier_marques = "proba_bin_defi_short_marques.json"
    nom_voix = "terminale-proba-bin-defi-short"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def cap(self, g, larg=LARGEUR_MAX):
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : 3 %, un lot de 50, aucun défaut : tu paries ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.add(badge)
        self.au_mot("3 %")
        titre = self.cap(suite(self.t("3 %", 60, DEFAUT), self.t("défectueux", 40, DEFAUT), buff=0.2)).move_to(P(0, 3.25))
        d = panneau(1.3, defectueux=True).move_to(P(0, 0.75))
        self.play(FadeIn(titre[0], scale=1.8), FadeIn(d, scale=1.6), run_time=0.5)
        self.play(FadeIn(titre[1], shift=LEFT * 0.15), run_time=0.3)
        bas1 = self.cap(suite(self.t("3 %", 50, DEFAUT), self.t("défectueux", 40), buff=0.2)).move_to(P(0, -1.0))
        self.play(TransformFromCopy(titre, bas1), run_time=0.5)
        self.au_mot("lot de 50")
        lot = lot_panneaux(lignes=5, colonnes=10, s=0.38, buff=0.06).move_to(P(0, 0.75))
        bas2 = suite(self.t("un lot de", 40), self.t("50", 54, BLEU_NB), buff=0.2).move_to(P(0, -1.7))
        self.play(FadeOut(d), LaggedStart(*[FadeIn(p, scale=1.5) for p in lot], lag_ratio=0.02),
                  FadeIn(bas2, shift=UP * 0.15), run_time=1.0)
        self.au_mot("aucun défaut")
        aucun = self.t("aucun défaut ?", 44, ORANGE_RETENUE).move_to(P(0, -2.4))
        self.play(FadeIn(aucun, scale=1.3), run_time=0.4)
        self.au_mot("tu paries")
        pari = self.t("Tu paries ?", 58, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(titre, pari), run_time=0.4)
        self.play(Wiggle(pari), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : 0,97⁵⁰ ≈ 0,22 : une chance sur cinq ──
        self.dire("01-image")
        self.au_mot("0,97 puissance")
        larg = lot.width
        y_j = lot.get_bottom()[1] - 0.3
        fond = Rectangle(width=larg, height=0.26, stroke_color=WHITE, stroke_width=2).move_to(P(0, y_j))
        jauge = Rectangle(width=larg, height=0.26, fill_color=OK, fill_opacity=1, stroke_width=0).move_to(P(0, y_j))
        jauge.align_to(fond, LEFT)
        pw = puissance("0,97", "50", 56, BLEU_NB)
        l1 = pw.copy().move_to(P(0, -1.35))
        self.play(FadeOut(VGroup(bas1, bas2, aucun)), FadeIn(fond), FadeIn(jauge), FadeIn(l1[0], scale=1.5),
                  run_time=0.4)
        self.au_mot("puissance 50")
        self.play(FadeIn(l1[1], scale=1.8), run_time=0.3)
        # chaque panneau bon (×0,97) : il s'allume en vert, la jauge fond jusqu'à 0,97⁵⁰
        anims = []
        for k, p in enumerate(lot):
            anims.append(p[0].animate.set_stroke(OK, 3))
        cible = jauge.copy().stretch_to_fit_width(larg * P0).align_to(fond, LEFT)
        self.play(LaggedStart(*anims, lag_ratio=0.03), Transform(jauge, cible), run_time=1.2)
        self.au_mot("environ 0,22")
        res = suite(self.t("≈", 54), self.t("0,22", 66, OK), buff=0.2)
        ligne = VGroup(l1, res)
        res.next_to(l1, RIGHT, buff=0.2)
        cible_l = self.cap(ligne.copy()).move_to(P(0, -1.35))
        res.become(cible_l[1])
        self.play(FadeIn(res, scale=1.6), Transform(l1, cible_l[0]), run_time=0.5)
        self.insister(res[1], 1.3)
        self.au_mot("une chance sur cinq")
        cinq = VGroup(*[lot_panneaux(lignes=5, colonnes=10, s=0.115, buff=0.022) for _ in range(5)])
        VGroup(*cinq[:3]).arrange(RIGHT, buff=0.16)
        VGroup(*cinq[3:]).arrange(RIGHT, buff=0.16)
        VGroup(VGroup(*cinq[:3]), VGroup(*cinq[3:])).arrange(DOWN, buff=0.2).move_to(P(0, 1.0))
        for g in cinq:
            for p in g:
                p[0].set_stroke(width=0.8)
                p[1].set_stroke(width=0.4, opacity=0.4)
        for p in cinq[0]:
            p[0].set_stroke(OK, 1.5)
        for g in cinq[1:]:
            g[7][0].set_stroke(DEFAUT, 3)
            g[7][0].set_fill(DEFAUT, 1)
        cadre = SurroundingRectangle(cinq[0], color=OK, buff=0.06, stroke_width=4)
        un5 = self.t("1 chance sur 5", 48, JAUNE_TITRE).move_to(P(0, -2.2))
        self.play(FadeOut(VGroup(fond, jauge)), ReplacementTransform(lot, cinq[0]), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(g, shift=LEFT * 0.3) for g in cinq[1:]], lag_ratio=0.2),
                  FadeIn(un5, scale=1.4), run_time=0.8)
        self.au_mot("parfait")
        parf = self.t("parfait !", 40, OK).next_to(cinq, DOWN, buff=0.25)
        self.play(Create(cadre), FadeIn(parf, shift=UP * 0.1), run_time=0.4)
        self.insister(VGroup(cinq[0], cadre), 1.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : au moins un défectueux ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 58, JAUNE_TITRE).move_to(P(0, 3.25))
        lot2 = lot_panneaux(lignes=5, colonnes=10, s=0.38, buff=0.06).move_to(P(0, 0.75))
        self.play(ReplacementTransform(pari, et), FadeOut(VGroup(cinq, cadre, parf, ligne, un5)), FadeIn(lot2),
                  run_time=0.5)
        self.au_mot("au moins un")
        rouge = panneau(0.38, defectueux=True).move_to(lot2[23])
        q = VGroup(self.t("Au moins un", 46, ORANGE_RETENUE), self.t("défectueux ?", 46, ORANGE_RETENUE))
        q.arrange(DOWN, buff=0.08).move_to(P(0, -1.05))
        self.play(FadeIn(rouge, scale=2.5), FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.play(rouge.animate.scale(2.2), run_time=0.25)
        self.play(rouge.animate.scale(1 / 2.2), run_time=0.25)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 50, VERT_OK), self.t("commentaire !", 50, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
