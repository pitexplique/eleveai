# proba2_formule_union.py
# EleveAI — Maths 2de — série « Probabilités », épisode 6 : la formule de la
# réunion P(A ∪ B) = P(A) + P(B) − P(A ∩ B) (micro : proba_formule_union), AVEC
# VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba2_formule_union_short.py.
#
# Écrans : 00 garde · 01 la classe (sport 60 %, instrument 30 %, les deux 20 %)
# · 02 la formule (la zone commune comptée deux fois clignote puis est retirée)
# · 03 le calcul 0,6 + 0,3 − 0,2 = 0,7 · 04 ni l'un ni l'autre : 1 − 0,7 · 05
# incompatibles (les cercles s'écartent) · 06 le piège 0,9 · 07 défi · 07b
# correction · 08 ce que tu as appris · 09 fin (« Entraîne-toi sur eleveai.fr »).
#
# Canvas du coach : la micro proba_formule_union n'a AUCUN canvas dans
# lib/tutor-v4/questionBank/seconde/maths/probabilites.bank.ts (ses questions
# sont du texte). On reprend donc le diagramme A / B de l'épisode 1
# (proba_vocabulaire.py : A ambre #FBBF24, B vert, A ∩ B jaune) posé dans le
# rectangle Ω, et l'ambre / bleu du canvas « de » / « tableau » du coach
# (ProbabilitesCanvas.tsx) pour les zones allumées.
#
# Voix : manim/voix/seconde-proba-formule-union.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_formule_union.py Proba2FormuleUnion -o eleveai-maths-seconde-proba-formule-union --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/06-formule-union/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

AMBRE = "#FBBF24"        # A (sport) — l'ambre du coach
VERT_B = "#22C55E"       # B (instrument) — le vert du coach
DOUBLE = "#F97316"       # la zone comptée deux fois
BLEU_NI = "#3B82F6"      # ni l'un ni l'autre — le bleu du coach
BLANC_OMEGA = "#E2E8F0"


class Notion2de(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class Venn(VGroup):
    """Le rectangle Ω et deux cercles A / B qui se chevauchent (ou non).
    self.ca, self.cb : les cercles ; self.rect : Ω ; self.lom : « Ω »."""

    def __init__(self, centre, w=5.2, h=3.4, r=1.15, d=1.35, nom_a="A", nom_b="B", fs=30, **kw):
        super().__init__(**kw)
        self.rect = Rectangle(width=w, height=h, stroke_color=BLANC_OMEGA, stroke_width=3).move_to(centre)
        self.ca = Circle(radius=r, stroke_color=AMBRE, stroke_width=5).move_to(centre + P(-d / 2, -0.15))
        self.cb = Circle(radius=r, stroke_color=VERT_B, stroke_width=5).move_to(centre + P(d / 2, -0.15))
        self.lom = Text("Ω", font_size=fs + 4, color=JAUNE_TITRE).move_to(self.rect.get_corner(UL) + P(0.3, -0.3))
        self.la = Text(nom_a, font_size=fs, color=AMBRE).next_to(self.ca, UP, buff=0.08).shift(LEFT * 0.35)
        self.lb = Text(nom_b, font_size=fs, color=VERT_B).next_to(self.cb, UP, buff=0.08).shift(RIGHT * 0.35)
        self.add(self.rect, self.lom, self.ca, self.cb, self.la, self.lb)

    def zone_a(self, op=0.45):
        return Circle(radius=self.ca.radius, stroke_width=0, fill_color=AMBRE, fill_opacity=op).move_to(self.ca)

    def zone_b(self, op=0.45):
        return Circle(radius=self.cb.radius, stroke_width=0, fill_color=VERT_B, fill_opacity=op).move_to(self.cb)

    def inter(self, color=DOUBLE, op=0.9):
        return Intersection(self.ca, self.cb, fill_color=color, fill_opacity=op, stroke_width=0)

    def union(self, color=VERT_OK, op=0.4):
        return Union(self.ca, self.cb, fill_color=color, fill_opacity=op, stroke_width=0)

    def dehors(self, color=BLEU_NI, op=0.45):
        return Difference(self.rect, Union(self.ca, self.cb), fill_color=color, fill_opacity=op, stroke_width=0)


class Proba2FormuleUnion(Notion2de):
    nom_voix = "seconde-proba-formule-union"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=36, buff=0.2):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def clignoter(self, mob, fois=3, run_time=0.22, bas=0.15, haut=0.9):
        for _ in range(fois):
            self.play(mob.animate.set_fill(opacity=bas), run_time=run_time)
            self.play(mob.animate.set_fill(opacity=haut), run_time=run_time)

    def formule(self, fs=40):
        """P(A ∪ B) = P(A) + P(B) − P(A ∩ B), en 4 morceaux colorés."""
        return self.ligne([("P(A ∪ B)", VERT_OK), ("=", WHITE), ("P(A)", AMBRE), ("+", WHITE),
                           ("P(B)", VERT_B), ("−", WHITE), ("P(A ∩ B)", DOUBLE)], fs, 0.2)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La formule de la réunion", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.9)
        v = Venn(P(-0.6, 0.35), w=4.2, h=2.5, r=0.85, d=1.0, fs=26)
        self.play(Create(v.rect), Create(v.ca), Create(v.cb), FadeIn(v.lom, v.la, v.lb), run_time=0.8)
        z = v.inter()
        self.au_mot("ne rien compter deux fois")
        q = self.t("ne rien compter deux fois", 38, BLEU_CALCUL).move_to(P(-0.6, -1.4))
        self.play(FadeIn(z), FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.clignoter(z, 2, 0.2)
        self.attendre_voix(marge=1.0)

    # ── 01 : la classe ──────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Sport, instrument… ou les deux")
        v = Venn(P(-3.0, -0.35), w=6.2, h=4.3, r=1.4, d=1.75, nom_a="sport", nom_b="instrument", fs=30)
        self.au_mot("Dans une classe")
        self.play(Create(v.rect), FadeIn(v.lom), run_time=0.6)
        x_g = 1.0
        self.au_mot("60 %")
        za = v.zone_a()
        l1 = self.ligne([("sport :", AMBRE), ("60 %", AMBRE)], 40).move_to(P(0, 1.3)).align_to(P(x_g, 0), LEFT)
        self.play(Create(v.ca), FadeIn(za), FadeIn(v.la), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("30 %")
        zb = v.zone_b()
        l2 = self.ligne([("instrument :", VERT_B), ("30 %", VERT_B)], 40).move_to(P(0, 0.2)).align_to(P(x_g, 0), LEFT)
        self.play(Create(v.cb), FadeIn(zb), FadeIn(v.lb), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("20 %")
        zi = v.inter()
        vingt = self.t("20 %", 30, BLACK).move_to(zi.get_center())
        l3 = self.ligne([("les deux :", DOUBLE), ("20 %", DOUBLE)], 40).move_to(P(0, -0.9)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(zi), FadeIn(vingt), FadeIn(l3, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(VGroup(zi, vingt), 0.3)
        self.attendre_voix()

    # ── 02 : la formule ─────────────────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        self.titre_ecran("La formule")
        f = self.formule(40).move_to(P(-0.6, 2.05))
        v = Venn(P(-2.6, -1.0), w=5.0, h=2.75, r=1.05, d=1.3, fs=28)
        self.play(FadeIn(v), run_time=0.5)
        self.au_mot("P de A union B")
        u = v.union(VERT_OK, 0.3)
        self.play(FadeIn(f[0], shift=DOWN * 0.15), FadeIn(u), run_time=0.5)
        self.play(FadeOut(u), run_time=0.3)
        self.au_mot("égale P de A")
        za = v.zone_a()
        self.play(FadeIn(f[1]), FadeIn(f[2], shift=DOWN * 0.15), FadeIn(za), run_time=0.5)
        self.au_mot("plus P de B")
        zb = v.zone_b()
        self.play(FadeIn(f[3]), FadeIn(f[4], shift=DOWN * 0.15), FadeIn(zb), run_time=0.5)
        zi = v.inter()
        deux = self.t("comptée deux fois", 32, DOUBLE).move_to(P(2.1, -0.6))
        fl = Arrow(deux.get_left() + P(-0.05, 0), zi.get_right() + P(0.05, 0), color=DOUBLE, buff=0.1,
                   stroke_width=4, max_tip_length_to_length_ratio=0.15)
        self.play(FadeIn(zi), run_time=0.3)
        self.au_mot("moins P de A inter B")
        self.play(FadeIn(f[5]), FadeIn(f[6], shift=DOWN * 0.15), run_time=0.4)
        self.clignoter(zi, 3, 0.18)
        self.au_mot("On enlève")
        ch = self.chute("On enlève ce qui a été compté deux fois.", color=BLEU_CALCUL, font_size=34)
        self.play(Write(ch), GrowArrow(fl), FadeIn(deux), run_time=0.8)
        self.play(zi.animate.move_to(f[6].get_center()).scale(0.25).set_opacity(0), run_time=0.9)
        self.insister(f[6], 0.3, 1.3)
        self.attendre_voix()

    # ── 03 : le calcul ──────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("Le calcul")
        v = Venn(P(-3.55, -0.45), w=5.6, h=3.9, r=1.25, d=1.55, nom_a="sport", nom_b="instrument", fs=28)
        self.add(v)
        x_g = 0.4
        l1 = self.ligne([("sport", AMBRE), ("ou", WHITE), ("instrument :", VERT_B)], 36).move_to(P(0, 1.7)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        c = self.ligne([("0,6", AMBRE), ("+", WHITE), ("0,3", VERT_B), ("−", WHITE), ("0,2", DOUBLE)], 46)
        c.move_to(P(0, 0.6)).align_to(P(x_g, 0), LEFT)
        za, zb, zi = v.zone_a(), v.zone_b(), v.inter()
        self.au_mot("0,6")
        self.play(FadeIn(c[0], scale=0.6), FadeIn(za), run_time=0.4)
        self.au_mot("0,3")
        self.play(FadeIn(c[1]), FadeIn(c[2], scale=0.6), FadeIn(zb), run_time=0.4)
        self.au_mot("moins 0,2")
        self.play(FadeIn(c[3]), FadeIn(c[4], scale=0.6), FadeIn(zi), run_time=0.4)
        self.clignoter(zi, 2, 0.15)
        self.play(FadeOut(zi, scale=0.3), run_time=0.4)
        self.au_mot("0,7")
        u = v.union(VERT_OK, 0.55)
        r = self.ligne([("=", WHITE), ("0,7", VERT_OK)], 46).next_to(c, DOWN, buff=0.4).align_to(c, LEFT)
        self.play(FadeOut(za), FadeOut(zb), FadeIn(u), FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("70 %")
        p = self.ligne([("70 %", VERT_OK), ("des élèves", WHITE)], 40).next_to(r, DOWN, buff=0.45).align_to(c, LEFT)
        self.play(FadeIn(p, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(p[0], 0.3)
        self.attendre_voix()

    # ── 04 : ni l'un ni l'autre ─────────────────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sens")
        self.titre_ecran("Ni l'un ni l'autre")
        v = Venn(P(-3.55, -0.45), w=5.6, h=3.9, r=1.25, d=1.55, nom_a="sport", nom_b="instrument", fs=28)
        u = v.union(VERT_OK, 0.55)
        self.add(u, v)
        x_g = 0.4
        self.au_mot("ni l'un ni l'autre")
        dh = v.dehors()
        q = self.t("ni l'un ni l'autre ?", 38, BLEU_NI).move_to(P(0, 1.7)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(dh), FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.clignoter(dh, 2, 0.18, 0.1, 0.45)
        self.au_mot("le contraire")
        k = self.t("le contraire", 38, BLEU_CALCUL).next_to(q, DOWN, buff=0.35).align_to(q, LEFT)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.4)
        c = self.ligne([("1", BLANC_OMEGA), ("−", WHITE), ("0,7", VERT_OK)], 46).next_to(k, DOWN, buff=0.45).align_to(q, LEFT)
        self.au_mot("1 moins")
        self.play(FadeIn(c[0], scale=0.6), Indicate(v.rect, color=WHITE, scale_factor=1.03), run_time=0.5)
        self.au_mot("0,7,")
        sept = self.t("0,7", 32, BLACK).move_to(v.ca.get_center() + P(0.78, 0))
        self.play(FadeIn(c[1]), FadeIn(c[2], scale=0.6), FadeIn(sept), run_time=0.4)
        self.au_mot("soit 0,3")
        r = self.ligne([("=", WHITE), ("0,3", BLEU_NI)], 46).next_to(c, RIGHT, buff=0.25)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("30 %")
        p = self.ligne([("30 %", BLEU_NI), ("des élèves", WHITE)], 40).next_to(c, DOWN, buff=0.45).align_to(q, LEFT)
        self.play(FadeIn(p, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(p[0], 0.3)
        self.attendre_voix()

    # ── 05 : incompatibles ──────────────────────────────────────────────────

    def ecran_incompatibles(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-incompatibles")
        self.titre_ecran("Des événements incompatibles")
        v = Venn(P(-3.75, -0.3), w=5.6, h=3.4, r=1.0, d=1.3, fs=30)
        za, zb, zi = v.zone_a(), v.zone_b(), v.inter()
        self.play(FadeIn(v), FadeIn(za), FadeIn(zb), FadeIn(zi), run_time=0.6)
        self.au_mot("ne peuvent pas arriver")
        self.play(FadeOut(zi, scale=0.3), run_time=0.3)
        self.play(VGroup(v.ca, za, v.la).animate.shift(LEFT * 0.7),
                  VGroup(v.cb, zb, v.lb).animate.shift(RIGHT * 0.7), run_time=1.0)
        x_g = 0.0
        self.au_mot("incompatibles")
        l1 = self.ligne([("A", AMBRE), ("et", WHITE), ("B", VERT_B), ("incompatibles", BLEU_CALCUL)], 38)
        l1.move_to(P(0, 1.5)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("vaut 0")
        l2 = self.ligne([("P(A ∩ B)", DOUBLE), ("=", WHITE), ("0", DOUBLE)], 38).next_to(l1, DOWN, buff=0.5).align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l2[2], 0.3)
        self.au_mot("Alors P de A union B")
        l3 = self.ligne([("P(A ∪ B)", VERT_OK), ("=", WHITE), ("P(A)", AMBRE), ("+", WHITE), ("P(B)", VERT_B)], 38)
        l3.next_to(l2, DOWN, buff=0.5).align_to(l1, LEFT)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Indicate(za, color=AMBRE), Indicate(zb, color=VERT_B), run_time=0.7)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège", font_size=44)
        v = Venn(P(-3.55, -0.45), w=5.6, h=3.9, r=1.25, d=1.55, nom_a="sport", nom_b="instrument", fs=28)
        self.add(v)
        x_g = 0.4
        za, zb, zi = v.zone_a(), v.zone_b(), v.inter(ROUGE_ERREUR, 0.85)
        c = self.ligne([("0,6", AMBRE), ("+", WHITE), ("0,3", VERT_B)], 46).move_to(P(0, 1.5)).align_to(P(x_g, 0), LEFT)
        self.au_mot("additionner 0,6")
        self.play(FadeIn(c[0], scale=0.6), FadeIn(za), run_time=0.4)
        self.au_mot("et 0,3")
        self.play(FadeIn(c[1]), FadeIn(c[2], scale=0.6), FadeIn(zb), run_time=0.4)
        self.au_mot("oublier")
        o = VGroup(self.t("oublier d'enlever", 34, ROUGE_ERREUR), self.t("0,2", 34, ROUGE_ERREUR)).arrange(RIGHT, buff=0.2)
        o.next_to(c, DOWN, buff=0.45).align_to(c, LEFT)
        self.play(FadeIn(o, shift=RIGHT * 0.2), FadeIn(zi), run_time=0.4)
        self.clignoter(zi, 3, 0.17, 0.1, 0.85)
        self.au_mot("0,9")
        r = self.ligne([("=", WHITE), ("0,9", ROUGE_ERREUR)], 46).next_to(c, RIGHT, buff=0.25)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("trop")
        trop = self.t("trop !", 60, ROUGE_ERREUR).next_to(o, DOWN, buff=0.5).align_to(c, LEFT)
        self.play(FadeIn(trop, scale=0.5), run_time=0.35)
        self.insister(trop, 0.3, 1.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        v = Venn(P(2.4, 0.45), w=4.4, h=2.9, r=0.95, d=1.15, fs=28)
        self.play(FadeIn(v), run_time=0.4)
        x_g = -6.3
        lignes = []
        for i, (ex, gauche, val, col) in enumerate([("P de A égale 0,5", "P(A)", "0,5", AMBRE),
                                                    ("P de B égale 0,4", "P(B)", "0,4", VERT_B),
                                                    ("union B égale 0,7", "P(A ∪ B)", "0,7", VERT_OK)]):
            self.au_mot(ex)
            l = self.ligne([(gauche, col), ("=", WHITE), (val, col)], 40).move_to(P(0, 1.6 - i * 0.95)).align_to(P(x_g, 0), LEFT)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.4)
            lignes.append(l)
        self.au_mot("Que vaut")
        zi = v.inter()
        qm = self.t("?", 34, BLACK).move_to(zi.get_center())
        l4 = self.ligne([("P(A ∩ B)", DOUBLE), ("=", WHITE), ("?", DOUBLE)], 40).move_to(P(0, 1.6 - 3 * 0.95)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), FadeIn(zi), FadeIn(qm), run_time=0.4)
        self.insister(l4[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        c = self.ligne([("0,7", VERT_OK), ("=", WHITE), ("0,5", AMBRE), ("+", WHITE), ("0,4", VERT_B),
                        ("−", WHITE), ("P(A ∩ B)", DOUBLE)], 42).move_to(P(-0.6, 1.9))
        v = Venn(P(-3.4, -1.15), w=4.6, h=2.7, r=0.95, d=1.15, fs=28)
        self.play(FadeIn(v), run_time=0.4)
        za, zb, zi, u = v.zone_a(), v.zone_b(), v.inter(), v.union(VERT_OK, 0.45)
        self.au_mot("0,7 égale")
        self.play(FadeIn(c[0], scale=0.6), FadeIn(u), run_time=0.4)
        self.au_mot("0,5")
        self.play(FadeIn(c[1]), FadeIn(c[2], scale=0.6), FadeOut(u), FadeIn(za), run_time=0.4)
        self.au_mot("0,4")
        self.play(FadeIn(c[3]), FadeIn(c[4], scale=0.6), FadeIn(zb), run_time=0.4)
        self.au_mot("moins P de A inter B")
        self.play(FadeIn(c[5]), FadeIn(c[6], shift=DOWN * 0.15), FadeIn(zi), run_time=0.4)
        self.clignoter(zi, 2, 0.17)
        self.au_mot("Donc")
        d = self.ligne([("Donc", WHITE), ("P(A ∩ B)", DOUBLE), ("=", WHITE)], 42).move_to(P(0, 0.4)).align_to(P(-0.4, 0), LEFT)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("vaut 0,2")
        res = self.t("0,2", 54, DOUBLE).next_to(d, RIGHT, buff=0.25)
        dans = self.t("0,2", 26, BLACK).move_to(zi.get_center())
        self.play(FadeIn(res, scale=0.5), FadeIn(dans), run_time=0.4)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        l1 = self.formule(38)
        l2 = VGroup(self.t("A et B incompatibles :", 38, BLEU_CALCUL),
                    self.t("on additionne simplement", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.8)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.5, 0.4))
        for mot, l in zip(["P de A union B", "Si A et B sont incompatibles"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 7")
        self.play(Write(self.chute("Épisode 7 : tableaux et arbres", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_calcul()
        self.ecran_sens()
        self.ecran_incompatibles()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
