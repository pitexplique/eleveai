# frac_comparer_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 05 « Comparer des fractions »
# (micro fraction_comparer). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT la notion, aucun calcul.
# Il AMUSE : « Le piège du lingot ». Sacha, CRÉATEUR D'ESCAPE GAMES, propose
# 1/3 d'un lingot d'or ou 1/5 d'un autre, identique :
#   · EN HAUT, l'image qui bouge : chaque lingot se coupe (3, puis 5 parts) et
#     la part prise devient ORANGE et se soulève ;
#   · EN BAS, AU MÊME INSTANT, la barre juste dessous (même largeur, mêmes
#     traits à la verticale) se coupe et sa part devient ORANGE ;
#   · surprise : 5 > 3, mais 1/5 < 1/3 (« plus on coupe, plus c'est petit ») ;
#   · 1 question-pause (3 s) : 1/10, 1/2, 1/7 → 1/2 ;
#   · fin : « Range 1/2, 1/9 et 1/5 du plus petit au plus grand » en commentaire
#     (1/9 < 1/5 < 1/2).
# Centres d'intérêt : jeux-defis, argent-budget.
# Voix : manim/voix/6e-frac-comparer-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_comparer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_comparer_short.py FracComparerShort6e -o eleveai-maths-6e-frac-comparer-short --media_dir manim/scripts/6e/media-frac-comparer-short
# Sortie : manim/sorties/6e/maths/fractions/05-comparer/eleveai-maths-6e-frac-comparer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotb_commun import *  # noqa: E402,F403

OR, OR_CLAIR, OR_SOMBRE = "#f59e0b", "#fcd34d", "#b45309"
L = 3.8                  # la largeur commune : lingot = barre (les coupes tombent à la verticale)
Y_LING = [1.72, 0.92]
Y_BAR = [-0.25, -1.3]


def lingot(n=1, h=0.5, centre=ORIGIN):
    """Un lingot vu de face : la face avant (n parts) et le dessus (trapèze).
    .parts[i] : VGroup(face avant de la part, dessus de la part) ;
    .coupes : les traits de coupe (à tracer AU MOT, hors du groupe)."""
    g = VGroup()
    g.parts = VGroup()
    w, d = L / n, 0.18
    for i in range(n):
        x0 = -L / 2 + i * w
        face = Rectangle(width=w, height=h, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(x0 + w / 2, 0))
        ga = d if i == 0 else 0
        dr = d if i == n - 1 else 0
        dessus = Polygon(P(x0, h / 2), P(x0 + w, h / 2), P(x0 + w - dr, h / 2 + 0.2), P(x0 + ga, h / 2 + 0.2),
                         fill_color=OR_CLAIR, fill_opacity=1, stroke_width=0)
        g.parts.add(VGroup(face, dessus))
    bord = Polygon(P(-L / 2, -h / 2), P(L / 2, -h / 2), P(L / 2, h / 2), P(L / 2 - d, h / 2 + 0.2),
                   P(-L / 2 + d, h / 2 + 0.2), P(-L / 2, h / 2), stroke_color=OR_SOMBRE, stroke_width=4)
    g.add(g.parts, bord)
    g.coupes = VGroup(*[Line(P(-L / 2 + j * L / n, -h / 2), P(-L / 2 + j * L / n, h / 2 + 0.2), color=OR_SOMBRE,
                             stroke_width=5) for j in range(1, n)])
    g.move_to(centre)
    g.coupes.shift(centre - ORIGIN)
    return g


class FracComparerShort6e(ShortB):
    nom_voix = "6e-frac-comparer-short"
    fichier_marques = "frac_comparer_short_marques.json"
    ceinture = "blanche"

    def barre(self, i, n):
        return Barre(n, 0, largeur=L, hauteur=0.42, couleur=ORANGE_PART, marge=0.12, sw=2, centre=P(0, Y_BAR[i]))

    def couper(self, cle, i, n, mot_coupe, mot_prise, mot_frac, ling, frac):
        """Le lingot i se coupe en n ET sa barre aussi ; la part prise devient orange en haut ET en bas."""
        self.dire(cle)
        b = self.barre(i, n)
        neuf = lingot(n, centre=P(0, Y_LING[i]))
        self.au_mot(mot_coupe)
        self.remove(ling)
        self.add(neuf)
        self.play(LaggedStart(*[Create(c) for c in neuf.coupes], lag_ratio=0.2), b.apparaitre(0.9), run_time=0.9)
        self.add(neuf.coupes)
        self.au_mot(mot_prise)
        part = neuf.parts[0]
        self.play(part[0].animate.set_fill(ORANGE_PART), part[1].animate.set_fill("#fdba74"),
                  b.colorier([0]), run_time=0.6)
        self.play(part.animate.shift(UP * 0.18), run_time=0.4)
        self.au_mot(mot_frac)
        lab = self.inline(frac, 30, ORANGE_PART).next_to(b.carte, UP, buff=0.06).align_to(b.carte, LEFT).shift(RIGHT * 0.1)
        self.play(FadeIn(lab, scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.2)
        return neuf, b, lab

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le piège du lingot", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : deux lingots ──
        self.dire("00-accroche")
        self.au_mot("Sacha")
        m = self.mor("Sacha,", 34, BLEU_CALCUL).move_to(P(0, -0.25))
        m2 = self.borne(self.mor("créateur d'escape games", 28, BLEU_CALCUL), 0.7).move_to(P(0, -0.8))
        self.play(FadeIn(m, scale=0.8), run_time=0.3)
        self.au_mot("créateur")
        self.play(FadeIn(m2, scale=0.8), run_time=0.3)
        lings = [lingot(1, centre=P(0, y)) for y in Y_LING]
        self.au_mot("deux lingots")
        self.play(LaggedStart(*[GrowFromCenter(g) for g in lings], lag_ratio=0.3), run_time=0.8)
        self.au_mot("1 tiers du premier")
        c1 = self.inline("1/3 ?", 34, AMBRE).move_to(P(-1.0, -1.5))
        self.play(FadeIn(c1, scale=1.3), run_time=0.3)
        self.au_mot("1 cinquième du second")
        c2 = self.inline("1/5 ?", 34, AMBRE).move_to(P(1.0, -1.5))
        self.play(FadeIn(c2, scale=1.3), run_time=0.3)
        self.au_mot("Lequel prends-tu")
        self.play(FadeOut(VGroup(m, m2, c1, c2)), Write(titre), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 et 02 : les deux coupes ──
        l1, b1, lab1 = self.couper("01-tiers", 0, 3, "coupé en 3", "Tu en prends 1", "1 tiers", lings[0], "1/3")
        l2, b2, lab2 = self.couper("02-cinquieme", 1, 5, "coupé en 5", "Tu en prends 1", "1 cinquième", lings[1],
                                   "1/5")

        # ── 03 : la surprise ──
        self.dire("03-surprise")
        self.au_mot("5 est plus grand")
        lg = self.ligne_mots([("5 >", ROUGE_ERREUR, "5 est plus grand"), ("3", ROUGE_ERREUR, "3, mais")], fs=34)
        lg.move_to(P(0, -2.05))
        self.jouer_mots(lg)
        x = b1.x_trait(1)
        tir = DashedLine(P(x, l1.get_top()[1] + 0.05), P(x, b2.contour.get_bottom()[1] - 0.1), color=AMBRE,
                         stroke_width=6, dash_length=0.12)
        lg2 = self.ligne_mots([(EcritureFraction(1, 5, fs=40, couleur=ORANGE_PART), WHITE, "1 cinquième est",
                                lambda: [Create(tir), FadeOut(lg),
                                         Indicate(VGroup(b2.parts[0], l2.parts[0]), color=AMBRE, scale_factor=1.1)]),
                               ("<", WHITE, None),
                               (EcritureFraction(1, 3, fs=40, couleur=VERT_OK), WHITE, "1 tiers. Plus")], fs=36)
        lg2.move_to(P(0, -2.1))
        self.jouer_mots(lg2)
        self.au_mot("Plus on coupe")
        r = self.bloc(["Plus on coupe,", "plus c'est petit !"], 30, AMBRE)
        for x in r:
            x.sans_synchro = True
        self.play(FadeOut(lg2), run_time=0.2)
        r.move_to(P(0, -2.15))
        self.play(FadeIn(r, scale=0.8), run_time=0.4)
        self.au_mot("Prends le tiers")
        self.play(Flash(l1.parts[0], color=VERT_OK, flash_radius=0.8), Indicate(lab1, color=VERT_OK, scale_factor=1.4),
                  run_time=0.6)
        self.attendre_voix(marge=0.4)
        self.vider(garder)
        self.question_suite(garder)

    def question_suite(self, garder):
        # ── 04 : la question-pause (3 s) ──
        self.question_b("04-question", "04b-reponse", ["Laquelle est", "la plus grande ?"],
                        [self.inline("1/10", 30), self.inline("1/2", 30), self.inline("1/7", 30)], 1,
                        [[("Couper en 2 :", VERT_OK, "2 donne"), ("les plus grosses !", VERT_OK, "les plus grosses")]],
                        fs_rep=26, mot_q="Laquelle")
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-question")
        self.au_mot("range")
        q = self.bloc(["Range du plus petit", "au plus grand :"], 32)
        q.move_to(P(0, 1.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        fr3 = [EcritureFraction(1, d, fs=64) for d in (2, 9, 5)]
        VGroup(*fr3).arrange(RIGHT, buff=0.75).move_to(P(0, 0.15))
        for f, mot in zip(fr3, ["1 demi", "1 neuvième", "1 cinquième"]):
            self.au_mot(mot)
            self.play(FadeIn(f, scale=1.4), run_time=0.35)
        self.appel_commentaire(y=-1.5)
