# expression_traduire.py
# EleveAI — Maths 5e — Expression littérale, épisode 2 : traduire une phrase
# en expression (notionId : litteral_calcul, micro : litteral_traduire), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau (modèle Pythagore 4e). Épisode 1 = expression_comprendre.py,
# dont on reprend TOUT (dessins, couleurs, structure). Paysage ceinture JAUNE.
#
# ⭐ LE DESSIN QUI PORTE TOUT : le PETIT DICTIONNAIRE « mot → signe », qui se
# remplit ligne par ligne (écrans 02 et 03), après les porte-monnaie du marché
# (Ti Margo « x € », sa sœur « x + 5 », son cousin « 2x »). L'écran 04 découpe
# la phrase en morceaux colorés, chaque morceau DEVIENT son bout d'expression,
# et l'on retombe sur 3x + 2, le prix des letchis de l'épisode 1.
# Couleurs : coefficient VERT, terme constant ORANGE, lettre JAUNE (épisode 1).
# ⛔ Division : « x ÷ 2 », jamais x/2 (règle du 06/10).
#
# Piège : 2(x + 5) barré ; pour x = 1, 2x + 5 vaut 7 mais 2(x + 5) vaut 12.
# Défi : le triple de n diminué de 4 (3n − 4) ; 6 de plus que y (y + 6).
#
# Voix : manim/voix/5e-expression-traduire.json (Julie, débit −8), validée.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/expression_traduire.py ExpressionTraduire5e -o eleveai-maths-5e-expression-traduire --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/expression-litterale/02-traduire/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from expression_comprendre import ExpressionComprendre5e
from signes_expression_2de import echelle_ceintures

COUL_COEF = VERT_OK
COUL_CONST = ORANGE_RETENUE
COUL_X = JAUNE_TITRE
CUIR = "#92400E"


def P(x, y):
    return np.array([x, y, 0.0])


class ExpressionTraduire5e(ExpressionComprendre5e):
    nom_voix = "5e-expression-traduire"

    # ── les dessins ─────────────────────────────────────────────────────────

    def porte_monnaie(self, s=1.0):
        corps = RoundedRectangle(width=1.8, height=1.2, corner_radius=0.2, stroke_color=WHITE,
                                 stroke_width=2, fill_color=CUIR, fill_opacity=1)
        rabat = Polygon(P(-0.9, 0.6), P(0.9, 0.6), P(0.0, 0.0), stroke_color=WHITE,
                        stroke_width=2, fill_color="#B45309", fill_opacity=1)
        bouton = Circle(radius=0.09, fill_color=JAUNE_TITRE, fill_opacity=1,
                        stroke_width=0).move_to(P(0, 0.05))
        return VGroup(corps, rabat, bouton).scale(s)

    def boite(self, texte, color, font_size=40):
        """Un morceau de phrase dans un cadre coloré."""
        lbl = self.t(texte, font_size, color)
        cadre = SurroundingRectangle(lbl, color=color, buff=0.18, corner_radius=0.12, stroke_width=3)
        return VGroup(cadre, lbl)

    def dico(self, lignes, ys, x_mot=-6.2, x_fleche=0.0, x_expr=0.7, font_size=38):
        """Le petit dictionnaire : (morceaux de la phrase, morceaux de l'expression)."""
        rangs = []
        for (mots, expr), y in zip(lignes, ys):
            m = self.ligne(mots, font_size)
            m.move_to(P(0, y)).align_to(P(x_mot, 0), LEFT)
            f = Arrow(P(x_fleche - 0.45, y), P(x_fleche + 0.45, y), buff=0, color=WHITE,
                      stroke_width=4, max_tip_length_to_length_ratio=0.35)
            e = self.ligne(expr, font_size + 6)
            e.move_to(P(0, y)).align_to(P(x_expr, 0), LEFT)
            rangs.append((m, f, e))
        return rangs

    def cadre_dico(self, haut, bas):
        cadre = RoundedRectangle(width=12.0, height=haut - bas, corner_radius=0.2,
                                 stroke_color=BLEU_CALCUL, stroke_width=2)
        cadre.move_to(P(-0.6, (haut + bas) / 2))
        onglet = self.t("mot  →  signe", 24, BLEU_CALCUL)
        onglet.next_to(cadre.get_corner(UL), DR, buff=0.12)
        return VGroup(cadre, onglet)

    def montrer_rang(self, rang, extrait_mot, extrait_expr, insiste=None):
        m, f, e = rang
        self.au_mot(extrait_mot)
        self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot(extrait_expr)
        self.play(GrowArrow(f), run_time=0.4)
        self.play(FadeIn(e, shift=RIGHT * 0.3), run_time=0.6)
        if insiste is not None:
            cible = e[insiste]
            self.play(cible.animate.scale(1.5), run_time=0.45)
            self.play(cible.animate.scale(1 / 1.5), run_time=0.45)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Traduire une phrase en expression", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Comment écrire")
        q = self.ligne([("une phrase", BLEU_CALCUL), ("→", WHITE), ("une expression avec", BLEU_CALCUL),
                        ("x", COUL_X), ("?", BLEU_CALCUL)], 44)
        q.move_to(P(-0.3, 0.4))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.play(q[3].animate.scale(1.6), run_time=0.5)
        self.play(q[3].animate.scale(1 / 1.6), run_time=0.5)
        self.attendre_voix(marge=1.5)

    # ── 01 : le marché ──────────────────────────────────────────────────────

    def ecran_marche(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-marche")
        self.titre_ecran("Au marché")
        xs = [-4.6, -0.8, 3.0]
        noms = ["Ti Margo", "sa sœur", "son cousin"]
        bourses, etiquettes = [], []
        for x, nom in zip(xs, noms):
            b = self.porte_monnaie(1.0).move_to(P(x, 0.9))
            n = self.t(nom, 34, BLEU_CALCUL).next_to(b, UP, buff=0.3)
            bourses.append(b)
            etiquettes.append(n)
        # Ti Margo : x euros
        self.au_mot("Ti Margo a x euros")
        self.play(FadeIn(etiquettes[0]), FadeIn(bourses[0], shift=DOWN * 0.3))
        ex = self.ligne([("x", COUL_X), ("€", WHITE)], 54).next_to(bourses[0], DOWN, buff=0.4)
        self.play(GrowFromCenter(ex))
        self.play(ex.animate.scale(1.5), run_time=0.45)
        self.play(ex.animate.scale(1 / 1.5), run_time=0.45)
        # la sœur : 5 euros de plus
        self.au_mot("Sa sœur")
        self.play(FadeIn(etiquettes[1]), FadeIn(bourses[1], shift=DOWN * 0.3))
        self.au_mot("5 euros de plus")
        p_soeur = self.ligne([("5 €", COUL_CONST), ("de plus", WHITE)], 34).next_to(bourses[1], DOWN, buff=0.45)
        self.play(FadeIn(p_soeur, shift=UP * 0.2))
        # le cousin : le double
        self.au_mot("Son cousin")
        self.play(FadeIn(etiquettes[2]), FadeIn(bourses[2], shift=DOWN * 0.3))
        self.au_mot("le double")
        p_cousin = self.t("le double", 34).next_to(bourses[2], DOWN, buff=0.45)
        self.play(FadeIn(p_cousin, shift=UP * 0.2))
        self.au_mot("Combien ont-ils")
        qs = VGroup(*[self.t("?", 60, ROUGE_ERREUR).next_to(b, RIGHT, buff=0.15) for b in bourses[1:]])
        self.play(*[GrowFromCenter(q) for q in qs])
        self.au_mot("On ne connaît pas x")
        self.play(Indicate(ex, color=COUL_X, scale_factor=1.4))
        self.au_mot("mais on peut l'écrire")
        e_soeur = self.ligne([("x", COUL_X), ("+ 5", COUL_CONST), ("€", WHITE)], 54).move_to(p_soeur)
        e_cousin = self.ligne([("2", COUL_COEF), ("x", COUL_X), ("€", WHITE)], 54).move_to(p_cousin)
        e_cousin[1].next_to(e_cousin[0], RIGHT, buff=0.06)
        e_cousin[2].next_to(e_cousin[1], RIGHT, buff=0.2)
        e_cousin.move_to(p_cousin)
        self.play(FadeOut(qs), ReplacementTransform(p_soeur, e_soeur), ReplacementTransform(p_cousin, e_cousin))
        self.play(Circumscribe(VGroup(ex, e_soeur, e_cousin), color=JAUNE_TITRE, buff=0.2))
        self.play(Write(self.chute("Une phrase devient une expression.", color=BLEU_CALCUL, font_size=36)))
        self.attendre_voix()

    # ── 02 : les mots qui ajoutent ou enlèvent ──────────────────────────────

    def ecran_mots_plus(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-mots-plus")
        self.titre_ecran("Les mots qui ajoutent ou qui enlèvent")
        ys = [1.6, 0.3, -1.0]
        cadre = self.cadre_dico(2.45, -1.75)
        self.play(Create(cadre[0]), FadeIn(cadre[1]))
        rangs = self.dico([
            ([("5", COUL_CONST), ("de plus que", BLEU_CALCUL), ("x", COUL_X)],
             [("x", COUL_X), ("+", BLEU_CALCUL), ("5", COUL_CONST)]),
            ([("x", COUL_X), ("augmenté de", BLEU_CALCUL), ("3", COUL_CONST)],
             [("x", COUL_X), ("+", BLEU_CALCUL), ("3", COUL_CONST)]),
            ([("x", COUL_X), ("diminué de", BLEU_CALCUL), ("7", COUL_CONST)],
             [("x", COUL_X), ("−", BLEU_CALCUL), ("7", COUL_CONST)]),
        ], ys)
        self.montrer_rang(rangs[0], "5 de plus que x", "x plus 5", insiste=1)
        self.montrer_rang(rangs[1], "x augmenté de 3", "x plus 3", insiste=1)
        self.montrer_rang(rangs[2], "x diminué de 7", "x moins 7", insiste=1)
        self.play(*[Indicate(r[0][1], color=WHITE, scale_factor=1.0) for r in rangs])
        self.attendre_voix()

    # ── 03 : les mots qui multiplient ou divisent ───────────────────────────

    def ecran_mots_fois(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-mots-fois")
        self.titre_ecran("Les mots qui multiplient ou qui divisent")
        ys = [1.75, 0.65, -0.45, -1.55]
        cadre = self.cadre_dico(2.55, -2.2)
        self.play(Create(cadre[0]), FadeIn(cadre[1]))
        rangs = self.dico([
            ([("le double de", BLEU_CALCUL), ("x", COUL_X)],
             [("2", COUL_COEF), ("×", BLEU_CALCUL), ("x", COUL_X)]),
            ([("le triple de", BLEU_CALCUL), ("x", COUL_X)],
             [("3", COUL_COEF), ("x", COUL_X)]),
            ([("la moitié de", BLEU_CALCUL), ("x", COUL_X)],
             [("x", COUL_X), ("÷", BLEU_CALCUL), ("2", COUL_COEF)]),
            ([("le quart de", BLEU_CALCUL), ("x", COUL_X)],
             [("x", COUL_X), ("÷", BLEU_CALCUL), ("4", COUL_COEF)]),
        ], ys)
        # le triple s'écrit collé : 3x
        rangs[1][2][1].next_to(rangs[1][2][0], RIGHT, buff=0.06)
        # le double : 2 × x, puis 2x
        self.montrer_rang(rangs[0], "Le double de x", "2 fois x")
        self.au_mot("donc 2 x")
        m, f, e = rangs[0]
        court = self.ligne([("2", COUL_COEF), ("x", COUL_X)], 44)
        court[1].next_to(court[0], RIGHT, buff=0.06)
        egal = self.t("=", 44).next_to(e, RIGHT, buff=0.35)
        court.next_to(egal, RIGHT, buff=0.35)
        self.play(FadeIn(egal), TransformFromCopy(VGroup(e[0], e[2]), court))
        self.play(court.animate.scale(1.5), run_time=0.45)
        self.play(court.animate.scale(1 / 1.5), run_time=0.45)
        self.montrer_rang(rangs[1], "Le triple de x", "3 x.")
        self.montrer_rang(rangs[2], "La moitié de x", "x divisé par 2", insiste=1)
        self.montrer_rang(rangs[3], "Le quart de x", "x divisé par 4", insiste=1)
        self.attendre_voix()

    # ── 04 : dans l'ordre ───────────────────────────────────────────────────

    def ecran_ordre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ordre")
        self.titre_ecran("Une phrase plus longue : dans l'ordre")
        self.au_mot("morceau par morceau")
        self.play(FadeIn(self.t("morceau par morceau", 30, BLEU_CALCUL).move_to(P(-0.6, 2.45))))
        self.au_mot("Le triple de x, augmenté")
        m1 = self.boite("le triple de x,", COUL_COEF, 42)
        m2 = self.boite("augmenté de 2", COUL_CONST, 42)
        phrase = VGroup(m1, m2).arrange(RIGHT, buff=0.35).move_to(P(-0.6, 1.5))
        m1[1][-2].set_color(COUL_X)  # le x
        self.play(FadeIn(m1, shift=RIGHT * 0.2))
        self.play(FadeIn(m2, shift=RIGHT * 0.2))
        e1 = self.ligne([("3", COUL_COEF), ("x", COUL_X)], 90)
        e1[1].next_to(e1[0], RIGHT, buff=0.1)
        e2 = self.ligne([("+", WHITE), ("2", COUL_CONST)], 90)
        e2[1].next_to(e2[0], RIGHT, buff=0.4)
        expr = VGroup(e1, e2).arrange(RIGHT, buff=0.45).move_to(P(-0.6, -0.2))
        self.au_mot("D'abord")
        self.play(Circumscribe(m1, color=COUL_COEF, buff=0.05))
        self.au_mot("3 x.")
        self.play(TransformFromCopy(m1[1], e1), run_time=1.0)
        self.au_mot("Puis augmenté")
        self.play(Circumscribe(m2, color=COUL_CONST, buff=0.05))
        self.au_mot("plus 2.")
        self.play(TransformFromCopy(m2[1], e2), run_time=1.0)
        self.au_mot("On obtient")
        self.play(expr.animate.scale(1.5), run_time=0.5)
        self.play(expr.animate.scale(1 / 1.5), run_time=0.5)
        self.au_mot("le prix des letchis")
        b = self.barquette(0.75).move_to(P(-4.6, -2.2))
        s = self.sac(0.55).move_to(P(-2.6, -2.1))
        rappel = self.ligne([("prix =", WHITE), ("3", COUL_COEF), ("x", COUL_X), ("+ 2", COUL_CONST)], 38)
        rappel[2].next_to(rappel[1], RIGHT, buff=0.06)
        rappel[3].next_to(rappel[2], RIGHT, buff=0.26)
        rappel.next_to(s, RIGHT, buff=0.5)
        ep = self.t("(épisode 1)", 26, GRAY_B).next_to(rappel, RIGHT, buff=0.3)
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(s, shift=UP * 0.2))
        self.play(FadeIn(rappel), FadeIn(ep))
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("Le double de x augmenté de 5")
        phrase = self.ligne([("le double de", WHITE), ("x", COUL_X), ("augmenté de", WHITE), ("5", COUL_CONST)], 42)
        phrase.move_to(P(-0.6, 2.2))
        self.play(FadeIn(phrase, shift=DOWN * 0.2))
        self.au_mot("ce n'est pas")
        faux = self.t("2(x + 5)", 64, ROUGE_ERREUR).move_to(P(-3.6, 0.85))
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux)))
        self.au_mot("on doublerait aussi le 5")
        # faux : « 2 ( x + 5 ) » → indices 0 1 2 3 4 5
        a1 = CurvedArrow(faux[0].get_top() + UP * 0.1, faux[2].get_top() + UP * 0.1,
                         angle=-PI / 2, color=WHITE, stroke_width=3, tip_length=0.15)
        a2 = CurvedArrow(faux[0].get_top() + UP * 0.1, faux[4].get_top() + UP * 0.1,
                         angle=-PI / 2, color=ROUGE_ERREUR, stroke_width=3, tip_length=0.15)
        note = self.t("le 5 serait doublé aussi !", 32, ROUGE_ERREUR).move_to(P(2.2, 0.85))
        self.play(Create(a1), Create(a2))
        self.play(FadeIn(note, shift=LEFT * 0.2))
        self.au_mot("Pour x égale 1")
        x1 = self.ligne([("Pour", WHITE), ("x = 1", COUL_X), (":", WHITE)], 40)
        x1.move_to(P(0, -0.2)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(x1))
        self.au_mot("2 x plus 5 vaut 7")
        bon = self.t("2x + 5  =  2 × 1 + 5  =  7", 42, VERT_OK)
        bon.move_to(P(0, -1.05)).align_to(P(-5.4, 0), LEFT)
        self.play(Write(bon))
        sept = bon[-1]
        self.play(sept.animate.scale(1.5), run_time=0.4)
        self.play(sept.animate.scale(1 / 1.5), run_time=0.4)
        self.au_mot("mais 2 fois")
        mauvais = self.t("2(x + 5)  =  2 × (1 + 5)  =  12", 42, ROUGE_ERREUR)
        mauvais.move_to(P(0, -1.95)).align_to(P(-5.4, 0), LEFT)
        self.play(Write(mauvais))
        self.au_mot("vaut 12")
        douze = mauvais[-2:]
        self.play(douze.animate.scale(1.5), run_time=0.4)
        self.play(douze.animate.scale(1 / 1.5), run_time=0.4)
        self.play(Write(self.chute("7 et 12 : ce n'est pas la même expression !", color=JAUNE_TITRE, font_size=34)))
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Traduis")
        self.play(FadeIn(self.t("Traduis en expression :", 36, BLEU_CALCUL).move_to(P(-0.6, 2.2))))
        self.au_mot("le triple d'un nombre n")
        q1 = self.ligne([("1.", WHITE), ("le triple d'un nombre", WHITE), ("n", COUL_X),
                         ("diminué de", WHITE), ("4", COUL_CONST)], 40)
        q1.move_to(P(-0.6, 1.2))
        self.play(FadeIn(q1, shift=RIGHT * 0.2))
        self.au_mot("6 de plus que y")
        q2 = self.ligne([("2.", WHITE), ("6", COUL_CONST), ("de plus que", WHITE), ("y", COUL_X)], 40)
        q2.move_to(P(0, -0.6)).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.2))
        cases = VGroup()
        for q in (q1, q2):
            c = DashedVMobject(RoundedRectangle(width=1.8, height=0.8, corner_radius=0.12,
                                                stroke_color=BLEU_CALCUL, stroke_width=3), num_dashes=24)
            fl = self.t("→", 40).next_to(q, DOWN, buff=0.45).align_to(q, LEFT).shift(RIGHT * 0.6)
            c.next_to(fl, RIGHT, buff=0.3)
            cases.add(VGroup(fl, c, self.t("?", 40, BLEU_CALCUL).move_to(c)))
        self.play(*[FadeIn(c) for c in cases])
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        self.au_mot("Le triple de n")
        m1 = self.boite("le triple de n,", COUL_COEF, 40)
        m2 = self.boite("diminué de 4", COUL_CONST, 40)
        VGroup(m1, m2).arrange(RIGHT, buff=0.35).move_to(P(-0.6, 2.0))
        m1[1][-2].set_color(COUL_X)
        self.play(FadeIn(m1, shift=RIGHT * 0.2), FadeIn(m2, shift=RIGHT * 0.2))
        e1 = self.ligne([("3", COUL_COEF), ("n", COUL_X)], 80)
        e1[1].next_to(e1[0], RIGHT, buff=0.08)
        e2 = self.ligne([("−", WHITE), ("4", COUL_CONST)], 80)
        expr = VGroup(e1, e2).arrange(RIGHT, buff=0.4).move_to(P(-0.6, 0.6))
        self.au_mot("3 n.")
        self.play(Circumscribe(m1, color=COUL_COEF, buff=0.05), TransformFromCopy(m1[1], e1))
        self.au_mot("moins 4.")
        self.play(Circumscribe(m2, color=COUL_CONST, buff=0.05), TransformFromCopy(m2[1], e2))
        self.au_mot("On obtient")
        self.play(expr.animate.scale(1.5), run_time=0.5)
        self.play(expr.animate.scale(1 / 1.5), run_time=0.5)
        self.play(Circumscribe(expr, color=VERT_OK))
        self.au_mot("Et 6 de plus")
        p2 = self.ligne([("6", COUL_CONST), ("de plus que", WHITE), ("y", COUL_X)], 40).move_to(P(-3.4, -1.2))
        self.play(FadeIn(p2, shift=RIGHT * 0.2))
        self.au_mot("y plus 6")
        f = Arrow(p2.get_right() + RIGHT * 0.2, p2.get_right() + RIGHT * 1.2, buff=0, color=WHITE)
        r2 = self.ligne([("y", COUL_X), ("+ 6", COUL_CONST)], 64).next_to(f, RIGHT, buff=0.3)
        self.play(GrowArrow(f), FadeIn(r2, shift=RIGHT * 0.3))
        self.play(Circumscribe(r2, color=VERT_OK))
        self.attendre_voix()

    # ── 07 : ce que tu as appris (règle du 13/10 : des affirmations) ─────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Plus, de plus", "Plus, de plus, augmenté de : on ajoute"),
            ("Diminué de", "Diminué de : on enlève"),
            ("Le double", "Le double, le triple, la moitié : × 2, × 3, ÷ 2"),
            ("Et une phrase", "Une phrase se lit dans l'ordre"),
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
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : remplacer la lettre par un nombre", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_marche()
        self.ecran_mots_plus()
        self.ecran_mots_fois()
        self.ecran_ordre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
