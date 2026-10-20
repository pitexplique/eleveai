# proba_bin_calculer_short.py
# EleveAI — Maths STMG (micro vaT_bin_pk) ET Maths Tle spé (micro
# binomiale_calculer) — short jumeau de « Loi binomiale : calculer P(X = k) ».
# Il AMUSE : 4 clients, 30 % achètent un antivol ; exactement 2 ventes, c'est
# 0,3 × 0,3 × 0,7 × 0,7 ? Presque ! Un seul chemin : il y a 6 façons.
#   · en HAUT les 4 clients, les antivols qui tombent, puis les 6 façons qui
#     s'empilent ;
#   · en BAS, EN MÊME TEMPS : le produit, 0,0441, puis 6 × 0,0441 = 0,2646 ;
#   · fin : combien de façons d'avoir 1 vente ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran, mais la CEINTURE
# change : ShortProbaBinCalculerSTMG (jaune), ShortProbaBinCalculerTerminale
# (orange).
#
# Voix : manim/voix/stmg-terminale-proba-bin-calculer-short.json (débit −7).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_calculer_short.py ShortProbaBinCalculerSTMG -o eleveai-maths-stmg-proba-bin-calculer-short --media_dir manim/scripts/stmg/media-bin_calculer
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_calculer_short.py ShortProbaBinCalculerTerminale -o eleveai-maths-terminale-proba-bin-calculer-short --media_dir manim/scripts/stmg/media-bin_calculer

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_calculer import DEUX_S, P, cadenas, client, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.2
BLEU_NB = "#60A5FA"
COULEURS = ["#38BDF8", "#A78BFA", "#F472B6", "#34D399"]


def non(s=1.0):
    """La croix rouge : pas d'antivol."""
    return VGroup(Line(P(-0.15, -0.15), P(0.15, 0.15)), Line(P(-0.15, 0.15), P(0.15, -0.15))).set_stroke(
        ROUGE_ERREUR, 7).scale(s)


def facon(f, s=0.42):
    """Une façon : 4 petits clients, un antivol au-dessus de chaque vente."""
    g = VGroup()
    for c, col in zip(f, COULEURS):
        u = VGroup(client(col, s))
        if c == "s":
            u.add(cadenas(s * 0.75).next_to(u[0], RIGHT, buff=0.04))
        else:
            u.add(non(s * 0.6).next_to(u[0], RIGHT, buff=0.06).set_opacity(0.55))
        g.add(u)
    return g.arrange(RIGHT, buff=0.12)


class ShortProbaBinCalculerBase(Short6e):
    nom_voix = "stmg-terminale-proba-bin-calculer-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=44, y=-1.6):
        g = suite(*[Text(tx, font_size=fs, color=c) for tx, c in morceaux], buff=0.1)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : 4 clients, 30 % ; exactement 2 ventes : 0,3 × 0,3 × 0,7 × 0,7 ? ──
        self.dire("00-accroche")
        titre = self.t("4 clients", 46, JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        gens = VGroup(*[client(c, 1.0) for c in COULEURS]).arrange(RIGHT, buff=0.38).move_to(P(0, 0.75))
        self.play(FadeIn(badge, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("4 clients")
        self.play(Write(titre), LaggedStart(*[FadeIn(g, shift=RIGHT * 1.2) for g in gens], lag_ratio=0.2),
                  run_time=0.9)
        self.au_mot("30 %")
        trente = suite(self.t("30 %", 46, JAUNE_TITRE), cadenas(0.8), buff=0.25).move_to(P(0, -0.5))
        self.play(FadeIn(trente[0], scale=1.8), FadeIn(trente[1], shift=DOWN * 0.3), run_time=0.5)
        self.au_mot("Exactement 2 ventes")
        q = VGroup(self.t("Exactement", 40, JAUNE_TITRE), self.t("2 ventes ?", 40, JAUNE_TITRE))
        q.arrange(DOWN, buff=0.06).move_to(P(0, 3.22))
        self.play(ReplacementTransform(titre, q), run_time=0.5)
        prod = self.ligne([("0,3", BLEU_NB), ("×", WHITE), ("0,3", BLEU_NB), ("×", WHITE), ("0,7", BLEU_NB),
                           ("×", WHITE), ("0,7", BLEU_NB), ("?", ORANGE_RETENUE)], fs=46, y=-1.55)
        marques = []
        for k, ex in enumerate(["0,3 fois 0,3 fois", "0,3 fois 0,7", "0,7 fois 0,7", "0,7 ?"]):
            self.au_mot(ex)
            if k < 2:
                m = cadenas(0.75).move_to(gens[k][0].get_top() + UP * 0.32)
                haut = [FadeIn(m, shift=DOWN * 0.45)]
            else:
                m = non(1.0).next_to(gens[k], UP, buff=0.12)
                haut = [Create(m), gens[k].animate.set_opacity(0.55)]
            marques.append(m)
            bas = [FadeIn(prod[2 * k], scale=1.8)] + ([FadeIn(prod[2 * k + 1])] if k < 3 else [FadeIn(prod[7])])
            self.play(*haut, *bas, run_time=0.4, rate_func=rate_functions.ease_out_bounce if k < 2 else smooth)
        self.attendre_voix(marge=0.1)

        # ── 01 : presque ! un seul chemin ; 6 façons ; 0,2646 ──
        self.dire("01-image")
        self.au_mot("Presque")
        presque = self.t("Presque !", 52, ORANGE_RETENUE).move_to(P(0, 3.2))
        self.play(ReplacementTransform(q, presque), FadeOut(prod[7]), run_time=0.5)
        self.play(Wiggle(presque), run_time=0.5)
        self.au_mot("un seul chemin")
        seul = self.t("un seul chemin", 38, ROUGE_ERREUR).move_to(P(0, -0.5))
        self.play(FadeOut(trente), FadeIn(seul, shift=UP * 0.15), run_time=0.5)
        self.au_mot("0,0441")
        res1 = suite(self.t("=", 46), self.t("0,0441", 48, JAUNE_TITRE), buff=0.15).move_to(P(0, -2.25))
        self.play(FadeIn(res1[0]), FadeIn(res1[1], scale=1.8), run_time=0.5)
        self.insister(res1[1], 1.4)
        self.au_mot("6 façons")
        rangs = VGroup(*[facon(f, 0.32) for f in DEUX_S]).arrange(DOWN, buff=0.1).move_to(P(-0.55, 0.42))
        six = self.t("× 6", 56, ORANGE_RETENUE).move_to(P(1.35, 0.42))
        perso = VGroup(gens, *marques)
        self.play(FadeOut(seul), ReplacementTransform(perso, rangs[0]), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(r, shift=DOWN * 0.3) for r in rangs[1:]], lag_ratio=0.3), run_time=1.4)
        self.play(FadeIn(six, scale=2.0), run_time=0.4)
        self.au_mot("6 fois 0,0441")
        prod2 = self.ligne([("6", ORANGE_RETENUE), ("×", WHITE), ("0,0441", JAUNE_TITRE)], fs=50, y=-1.55)
        self.play(FadeOut(prod), FadeOut(res1[0]), ReplacementTransform(res1[1], prod2[2]),
                  TransformFromCopy(six, prod2[0]), FadeIn(prod2[1]), run_time=0.6)
        self.au_mot("0,2646")
        res2 = suite(self.t("=", 50), self.t("0,2646", 56, VERT_OK), buff=0.15).move_to(P(0, -2.3))
        self.play(FadeIn(res2[0]), FadeIn(res2[1], scale=2.0), Flash(six, color=ORANGE_RETENUE), run_time=0.5)
        self.insister(res2[1], 1.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : et 1 vente ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.2))
        self.play(ReplacementTransform(presque, et), FadeOut(VGroup(rangs, six, prod2, res2)), run_time=0.5)
        self.au_mot("exactement 1 vente")
        un = facon("seee", 0.95).move_to(P(0, 1.0))
        txt = self.t("1 vente sur 4 clients", 36, WHITE).move_to(P(0, -0.05))
        self.play(FadeIn(un, shift=DOWN * 0.2), FadeIn(txt, shift=UP * 0.15), run_time=0.6)
        cb = self.t("Combien de façons ?", 40, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.play(FadeIn(cb, scale=1.3), run_time=0.4)
        self.insister(cb, 1.12, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.05))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaBinCalculerSTMG(ShortProbaBinCalculerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"


class ShortProbaBinCalculerTerminale(ShortProbaBinCalculerBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
