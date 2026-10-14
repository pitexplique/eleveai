# expression_reduire.py
# EleveAI — Maths 5e — Expression littérale, épisode 4 : réduire une expression
# (notionId : litteral_calcul, micro : litteral_reduire), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau (modèle Pythagore 4e). Paysage ceinture JAUNE, même
# structure que l'épisode 1 (expression_comprendre.py).
#
# ⭐ LE DESSIN QUI PORTE TOUT : le SAC de x billes et la BILLE seule (repris de
# litteral_calcul.py). Il fait voir pourquoi 3x + 2x = 5x, pourquoi 3x + 2 ne
# se réduit pas, et pourquoi x + x = 2x mais x × x = x² (carré de 3 × 3 billes).
# Frédéric adore les schémas de billes.
# Couleurs : COEFFICIENT en VERT, TERME CONSTANT en ORANGE, LETTRE en JAUNE.
#
# Défi : x + 4 + 3x + 1 → on trie → 4x + 5.
#
# Voix : manim/voix/5e-expression-reduire.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/expression_reduire.py ExpressionReduire5e -o eleveai-maths-5e-expression-reduire --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/expression-litterale/04-reduire/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

COUL_COEF = VERT_OK
COUL_CONST = ORANGE_RETENUE
COUL_LETTRE = JAUNE_TITRE
SAC = "#8B5E3C"
BILLE = "#60A5FA"


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class ExpressionReduire5e(Notion5e):
    nom_voix = "5e-expression-reduire"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def expr(self, texte, font_size=60):
        """Une expression coloriée : coefficient VERT, lettre JAUNE, terme constant ORANGE."""
        m = Text(texte, font_size=font_size, color=WHITE)
        s = texte.replace(" ", "")
        if len(s) != len(m):
            return m
        i = 0
        while i < len(s):
            c = s[i]
            if c in "0123456789":
                j = i
                while j < len(s) and s[j] in "0123456789":
                    j += 1
                coul = COUL_COEF if j < len(s) and s[j] == "x" else COUL_CONST
                for k in range(i, j):
                    m[k].set_color(coul)
                i = j
                continue
            if c in "x²":
                m[i].set_color(COUL_LETTRE)
            i += 1
        return m

    def ligne(self, morceaux, buff=0.28):
        """Des morceaux (déjà des Mobjects) alignés sur une ligne."""
        return VGroup(*morceaux).arrange(RIGHT, buff=buff)

    def insister(self, mob, f=1.5):
        self.play(mob.animate.scale(f), run_time=0.5)
        self.play(mob.animate.scale(1 / f), run_time=0.5)

    # ── les dessins ─────────────────────────────────────────────────────────

    def sac(self, h=0.9):
        corps = RoundedRectangle(width=h * 0.85, height=h, corner_radius=0.16 * h / 0.75,
                                 fill_color=SAC, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        noeud = Line(corps.get_top() + LEFT * 0.15 * h, corps.get_top() + RIGHT * 0.15 * h,
                     stroke_width=5, color=WHITE)
        x = Text("x", font_size=int(h * 42), color=COUL_LETTRE).move_to(corps.get_center() + DOWN * 0.04 * h)
        return VGroup(corps, noeud, x)

    def bille(self, r=0.17):
        return Circle(radius=r, fill_color=BILLE, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)

    def sacs(self, n, h=0.9, buff=0.16):
        return VGroup(*[self.sac(h) for _ in range(n)]).arrange(RIGHT, buff=buff)

    def billes(self, n, r=0.17, buff=0.14):
        return VGroup(*[self.bille(r) for _ in range(n)]).arrange(RIGHT, buff=buff)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Réduire une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("3 x plus 2 x")
        q = self.ligne([self.expr("3x + 2x", 64), self.t("= ?", 64, BLEU_CALCUL)], buff=0.35)
        q.move_to(P(-0.6, 0.3))
        self.play(FadeIn(q[0], shift=UP * 0.2))
        self.au_mot("ça fait combien")
        self.play(FadeIn(q[1]))
        self.insister(q[1][1])
        self.attendre_voix(marge=1.5)

    # ── 01 : les sacs et les billes ─────────────────────────────────────────

    def ecran_sacs(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-sacs")
        self.titre_ecran("Des sacs et des billes")
        self.au_mot("Imagine des sacs")
        gros = self.sac(1.6).move_to(P(-4.6, 1.0))
        self.play(FadeIn(gros, shift=DOWN * 0.3))
        self.au_mot("Dans chaque sac")
        bulle = DashedVMobject(Circle(radius=1.15, color=WHITE, stroke_width=3), num_dashes=40)
        bulle.move_to(P(-1.4, 1.0))
        lien = DashedLine(gros.get_right() + RIGHT * 0.1, bulle.get_left(), color=WHITE, dash_length=0.12)
        fantomes = VGroup(*[self.bille(0.16).set_opacity(0.45) for _ in range(5)]).arrange(RIGHT, buff=0.1)
        fantomes.move_to(bulle.get_center() + UP * 0.45)
        q = self.t("x billes ?", 40, COUL_LETTRE).move_to(bulle.get_center() + DOWN * 0.3)
        self.play(Create(lien), Create(bulle))
        self.play(FadeIn(fantomes, lag_ratio=0.2), Write(q))
        self.au_mot("tous les sacs en contiennent autant")
        meme = VGroup(self.t("le même nombre", 38, BLEU_CALCUL),
                      self.t("dans chaque sac", 38, BLEU_CALCUL)).arrange(DOWN, buff=0.2)
        meme.next_to(bulle, RIGHT, buff=0.5)
        self.play(FadeIn(meme, shift=LEFT * 0.2))
        self.au_mot("3 x, ce sont 3 sacs")
        trois = self.sacs(3).move_to(P(-4.0, -1.3))
        l3 = self.expr("3x", 60).next_to(trois, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.3) for s in trois], lag_ratio=0.3))
        self.play(Write(l3))
        self.au_mot("Et 2, ce sont 2 billes")
        deux = self.billes(2, r=0.25).move_to(P(1.4, -1.3))
        l2 = self.t("2", 60, COUL_CONST).next_to(deux, DOWN, buff=0.3).align_to(l3, DOWN)
        self.play(LaggedStart(*[GrowFromCenter(b) for b in deux], lag_ratio=0.3))
        self.play(Write(l2))
        self.insister(VGroup(deux, l2), 1.3)
        self.attendre_voix()

    # ── 02 : regrouper ──────────────────────────────────────────────────────

    def ecran_regrouper(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regrouper")
        self.titre_ecran("On regroupe les sacs")
        trois = self.sacs(3).move_to(P(-3.8, 1.5))
        l3 = self.t("3 sacs", 34).next_to(trois, DOWN, buff=0.25)
        self.play(FadeIn(trois, shift=DOWN * 0.2), FadeIn(l3))
        self.au_mot("plus 2 sacs")
        plus = self.t("+", 60).move_to(P(-1.4, 1.5))
        deux = self.sacs(2).move_to(P(0.6, 1.5))
        l2 = self.t("2 sacs", 34).next_to(deux, DOWN, buff=0.25)
        self.play(FadeIn(plus), FadeIn(deux, shift=DOWN * 0.2), FadeIn(l2))
        self.au_mot("ça fait 5 sacs")
        cible = VGroup(*trois.copy(), *deux.copy()).arrange(RIGHT, buff=0.16).move_to(P(-1.6, 1.5))
        l5 = self.t("5 sacs", 34).next_to(cible, DOWN, buff=0.25)
        self.play(FadeOut(plus), FadeOut(l3), FadeOut(l2),
                  *[m.animate.move_to(c) for m, c in zip([*trois, *deux], cible)], run_time=1.2)
        self.play(FadeIn(l5))
        self.au_mot("3 x plus 2 x égale 5 x")
        eq = self.ligne([self.expr("3x", 72), self.t("+", 72), self.expr("2x", 72),
                         self.t("=", 72), self.expr("5x", 72)])
        eq.move_to(P(-0.6, -0.4))
        self.play(Write(eq[:3]))
        self.play(Write(eq[3:]))
        self.au_mot("On additionne les coefficients")
        self.play(Indicate(eq[0][0], color=COUL_COEF, scale_factor=1.6),
                  Indicate(eq[2][0], color=COUL_COEF, scale_factor=1.6))
        self.au_mot("3 plus 2, 5")
        calc = self.t("3 + 2 = 5", 56, COUL_COEF).move_to(P(-0.6, -1.7))
        self.play(Write(calc))
        self.insister(calc[-1])
        self.au_mot("La lettre ne change pas")
        self.play(*[Indicate(m[1], color=COUL_LETTRE, scale_factor=1.6) for m in (eq[0], eq[2], eq[4])])
        self.play(Write(self.chute("La lettre ne change pas : x reste x.", color=COUL_LETTRE, font_size=36)))
        self.attendre_voix()

    # ── 03 : en enlevant ────────────────────────────────────────────────────

    def ecran_moins(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-moins")
        self.titre_ecran("Ça marche aussi en enlevant")
        self.au_mot("4 x moins x")
        eq = self.ligne([self.expr("4x − x", 72), self.t("=", 72), self.expr("3x", 72)])
        eq.move_to(P(-0.6, 1.9))
        self.play(Write(eq[0]))
        self.au_mot("4 sacs")
        quatre = self.sacs(4, h=1.0).move_to(P(-0.6, 0.2))
        l4 = self.t("4 sacs", 34).next_to(quatre, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.3) for s in quatre], lag_ratio=0.25), FadeIn(l4))
        self.au_mot("j'en enlève 1")
        part = quatre[-1]
        moins = self.t("− 1 sac", 34, ROUGE_ERREUR).next_to(part, RIGHT, buff=0.4)
        self.play(part[0].animate.set_stroke(ROUGE_ERREUR, width=5), FadeIn(moins))
        self.play(FadeOut(part, shift=UP * 1.2), FadeOut(moins, shift=UP * 1.2), run_time=1.0)
        self.au_mot("Il reste 3 sacs")
        reste = quatre[:3]
        l3 = self.t("3 sacs", 34).next_to(reste, DOWN, buff=0.3)
        self.play(Transform(l4, l3))
        self.au_mot("3 x.")
        self.play(Write(eq[1:]))
        self.insister(eq[2])
        self.au_mot("Car x tout seul")
        un = self.ligne([self.expr("x", 72), self.t("=", 72), self.expr("1x", 72)]).move_to(P(-0.6, -1.9))
        self.play(FadeIn(un[0]))
        self.au_mot("c'est 1 x")
        self.play(FadeIn(un[1:]))
        self.insister(un[2][0], 1.7)
        self.attendre_voix()

    # ── 04 : trier ──────────────────────────────────────────────────────────

    def ecran_trier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-trier")
        self.titre_ecran("Une expression mélangée ? On trie.")
        self.au_mot("3 x plus 2, plus 2 x")
        e = self.expr("3x + 2 + 2x", 72).move_to(P(-0.6, 2.0))
        trois, b, deux = self.sacs(3), self.billes(2, r=0.22), self.sacs(2)
        rang = VGroup(trois, b, deux).arrange(RIGHT, buff=0.5).move_to(P(-0.6, 0.5))
        self.play(Write(e))
        self.play(FadeIn(trois, shift=DOWN * 0.2))
        self.play(FadeIn(b, shift=DOWN * 0.2))
        self.play(FadeIn(deux, shift=DOWN * 0.2))
        self.au_mot("Les sacs avec les sacs")
        cible_s = VGroup(*trois.copy(), *deux.copy()).arrange(RIGHT, buff=0.16).move_to(P(-3.4, 0.5))
        self.play(*[m.animate.move_to(c) for m, c in zip([*trois, *deux], cible_s)],
                  b.animate.move_to(P(2.4, 0.5)), run_time=1.5)
        self.au_mot("3 x plus 2 x, 5 x")
        ls = self.expr("3x + 2x = 5x", 46).next_to(cible_s, DOWN, buff=0.45)
        self.play(Write(ls))
        self.au_mot("restent seules : plus 2")
        lb = self.expr("+ 2", 46).next_to(b, DOWN, buff=0.45).align_to(ls, DOWN)
        self.play(Indicate(b, color=COUL_CONST, scale_factor=1.4), Write(lb))
        self.au_mot("Le résultat")
        res = self.ligne([self.expr("3x + 2 + 2x", 54), self.t("=", 54), self.expr("5x + 2", 54)], buff=0.4)
        res.move_to(P(-0.8, -2.2))
        self.play(Write(res))
        boite = SurroundingRectangle(res[2], color=VERT_OK, buff=0.15)
        self.play(Create(boite))
        self.insister(VGroup(res[2], boite), 1.3)
        self.attendre_voix(marge=1.8)

    # ── 05 : premier piège ──────────────────────────────────────────────────

    def ecran_piege_sac(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege-sac")
        self.titre_ecran("Premier piège")
        self.au_mot("3 x plus 2, ça")
        faux = self.ligne([self.expr("3x + 2", 72), self.t("=", 72, ROUGE_ERREUR), self.t("5x", 72, ROUGE_ERREUR)], buff=0.4)
        faux.move_to(P(-0.6, 1.9))
        self.play(Write(faux[0]))
        self.au_mot("ne fait pas 5 x")
        self.play(FadeIn(faux[1:]))
        self.play(Create(self.barrer(faux[1:])))
        self.au_mot("Les 2 billes")
        trois, deux = self.sacs(3), self.billes(2, r=0.25)
        dessin = VGroup(trois, deux).arrange(RIGHT, buff=0.7).move_to(P(-0.8, 0.3))
        self.play(FadeIn(dessin, shift=DOWN * 0.2))
        self.insister(deux, 1.5)
        note = self.t("2 billes : pas des sacs !", 34, COUL_CONST).next_to(dessin, DOWN, buff=0.35)
        self.play(Circumscribe(deux, color=COUL_CONST), FadeIn(note))
        self.au_mot("ne se réduit pas")
        self.play(Write(self.chute("3x + 2 ne se réduit pas.", color=BLEU_CALCUL, font_size=38)))
        self.au_mot("il reste 3 x plus 2")
        bon = self.ligne([self.t("il reste :", 44, VERT_OK), self.expr("3x + 2", 56)]).move_to(P(-0.6, -1.9))
        self.play(FadeIn(bon, shift=UP * 0.2))
        self.play(Circumscribe(bon[1], color=VERT_OK))
        self.attendre_voix()

    # ── 06 : deuxième piège ─────────────────────────────────────────────────

    def ecran_piege_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege-carre")
        self.titre_ecran("Deuxième piège")
        xg, xd = -4.0, 2.6
        self.au_mot("x plus x, c'est 2 x")
        g = self.expr("x + x = 2x", 54).move_to(P(xg, 2.0))
        self.play(Write(g))
        self.au_mot("2 sacs")
        deux = self.sacs(2, h=1.0).move_to(P(xg, 0.6))
        self.play(FadeIn(deux, shift=DOWN * 0.2))
        self.au_mot("Mais x fois x")
        d = self.ligne([self.expr("x × x", 54), self.t("=", 54), self.expr("x²", 54)], buff=0.25).move_to(P(xd, 2.0))
        self.play(Write(d[0]))
        self.au_mot("c'est x au carré")
        self.play(Write(d[1:]))
        self.insister(d[2])
        self.au_mot("Pour x égale 3")
        x3 = self.ligne([self.t("x", 48, COUL_LETTRE), self.t("= 3", 48)], buff=0.2).move_to(P(-0.7, 0.6))
        cadre = SurroundingRectangle(x3, color=COUL_LETTRE, buff=0.18)
        self.play(FadeIn(x3), Create(cadre))
        self.au_mot("2 x vaut 6")
        groupes = VGroup(*[VGroup(*[self.bille(0.17) for _ in range(3)]).arrange(DOWN, buff=0.1)
                           for _ in range(2)])
        for grp, s in zip(groupes, deux):
            grp.move_to(s)
        self.play(*[ReplacementTransform(s, grp) for s, grp in zip(deux, groupes)], run_time=1.0)
        lg = self.ligne([self.expr("2x", 44), self.t("= 2 × 3 =", 44), self.t("6", 44, BLEU_CALCUL)], buff=0.2)
        lg.move_to(P(xg, -0.7))
        self.play(Write(lg))
        self.insister(lg[2], 1.7)
        self.au_mot("x au carré vaut 9")
        carre = VGroup(*[self.bille(0.17) for _ in range(9)]).arrange_in_grid(3, 3, buff=0.1).move_to(P(xd, 0.6))
        self.play(LaggedStart(*[GrowFromCenter(b) for b in carre], lag_ratio=0.1))
        ld = self.ligne([self.expr("x²", 44), self.t("= 3 × 3 =", 44), self.t("9", 44, BLEU_CALCUL)], buff=0.2)
        ld.move_to(P(xd, -0.7))
        self.play(Write(ld))
        self.insister(ld[2], 1.7)
        self.au_mot("Ce n'est pas pareil")
        diff = self.ligne([self.t("6", 60, BLEU_CALCUL), self.t("≠", 60, ROUGE_ERREUR), self.t("9", 60, BLEU_CALCUL)])
        diff.move_to(P(-0.7, -1.9))
        self.play(FadeIn(diff, scale=0.6))
        self.play(Write(self.chute("2x et x², ce n'est pas pareil.", color=ROUGE_ERREUR, font_size=36)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def rangee_defi(self):
        un, quatre, trois, une = self.sacs(1, h=0.8), self.billes(4), self.sacs(3, h=0.8), self.billes(1)
        return VGroup(un, quatre, trois, une).arrange(RIGHT, buff=0.45)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Réduis")
        self.play(FadeIn(self.t("Réduis :", 40, BLEU_CALCUL).move_to(P(-0.6, 2.2))))
        self.au_mot("x plus 4, plus 3 x, plus 1")
        e = self.expr("x + 4 + 3x + 1", 90).move_to(P(-0.6, 1.0))
        rang = self.rangee_defi().move_to(P(-0.6, -0.6))
        self.play(Write(e))
        self.play(LaggedStart(*[FadeIn(g, shift=DOWN * 0.2) for g in rang], lag_ratio=0.3))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        e = self.expr("x + 4 + 3x + 1", 64).move_to(P(-0.6, 2.1))
        rang = self.rangee_defi().move_to(P(-0.6, 0.8))
        self.add(e, rang)
        un, quatre, trois, une = rang
        self.au_mot("Les sacs")
        cible_s = VGroup(*un.copy(), *trois.copy()).arrange(RIGHT, buff=0.16).move_to(P(-3.6, 0.8))
        cible_b = VGroup(*quatre.copy(), *une.copy()).arrange(RIGHT, buff=0.14).move_to(P(2.0, 0.8))
        self.play(*[m.animate.move_to(c) for m, c in zip([*un, *trois], cible_s)],
                  *[m.animate.move_to(c) for m, c in zip([*quatre, *une], cible_b)], run_time=1.5)
        self.au_mot("x plus 3 x, c'est")
        ls = self.expr("x + 3x", 46).next_to(cible_s, DOWN, buff=0.45)
        self.play(Write(ls))
        self.au_mot("1 x plus 3 x")
        ls2 = self.ligne([self.expr("1x + 3x", 46), self.t("=", 46), self.expr("4x", 46)], buff=0.22)
        ls2.next_to(cible_s, DOWN, buff=0.45)
        self.play(TransformMatchingShapes(ls, ls2[0]))
        self.insister(ls2[0][0], 1.7)
        self.au_mot("4 x. Les")
        self.play(Write(ls2[1:]))
        self.au_mot("4 plus 1, 5")
        lb = self.ligne([self.t("4 + 1", 46, COUL_CONST), self.t("=", 46), self.t("5", 46, COUL_CONST)], buff=0.22)
        lb.next_to(cible_b, DOWN, buff=0.45).align_to(ls2, DOWN)
        self.play(Write(lb))
        self.au_mot("Le résultat")
        res = self.ligne([self.expr("x + 4 + 3x + 1", 52), self.t("=", 52), self.expr("4x + 5", 52)], buff=0.4)
        res.move_to(P(-0.8, -2.0))
        self.play(Write(res))
        boite = SurroundingRectangle(res[2], color=VERT_OK, buff=0.15)
        self.play(Create(boite))
        self.insister(VGroup(res[2], boite), 1.3)
        self.attendre_voix(marge=1.8)

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("On additionne", "On additionne les coefficients des x"),
            ("On trie", "On trie les x et les nombres seuls"),
            ("Et 2 x", "2x ≠ x²"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 34)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 10.0:  # ne pas toucher Ti-Margo (coin bas-droit)
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("Épisode 5 : tester une égalité", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_sacs()
        self.ecran_regrouper()
        self.ecran_moins()
        self.ecran_trier()
        self.ecran_piege_sac()
        self.ecran_piege_carre()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
