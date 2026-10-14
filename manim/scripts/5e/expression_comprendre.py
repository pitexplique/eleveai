# expression_comprendre.py
# EleveAI — Maths 5e — Expression littérale, épisode 1 : comprendre une expression
# (notionId : litteral_calcul, micro : litteral_expression_comprendre), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau (modèle Pythagore 4e). Frédéric : « un répertoire
# expression littérale puis sous-répertoire pour les micros : paysage et short ».
# Paysage ceinture JAUNE ; le short jumeau (déjà rendu, ceinture blanche) :
# 5e-litteral-calcul-short-comprendre (« si x vaut 2, combien vaut 3x ? »).
#
# ⭐ LE DESSIN QUI PORTE TOUT : la barquette de letchis (3 €) et le sac (2 €).
# Le COEFFICIENT est le prix d'une barquette (VERT), le TERME CONSTANT est le
# sac qu'on paie toujours (ORANGE). Mêmes couleurs que la paysage 5e générale.
#
# Défi = questions du coach sur cette micro (5a pour a = 3, leurre 53).
#
# Voix : manim/voix/5e-expression-comprendre.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/expression_comprendre.py ExpressionComprendre5e -o eleveai-maths-5e-expression-comprendre --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/expression-litterale/01-comprendre/.

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
LETCHI = "#DC2626"


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class ExpressionComprendre5e(Notion5e):
    nom_voix = "5e-expression-comprendre"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40):
        """Une ligne faite de morceaux (texte, couleur), pour colorier un seul nombre."""
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=0.26)

    # ── les dessins ─────────────────────────────────────────────────────────

    def barquette(self, s=1.0):
        bac = Polygon(P(-0.8, 0), P(0.8, 0), P(0.6, -0.45), P(-0.6, -0.45),
                      stroke_color=WHITE, stroke_width=2, fill_color="#E5E7EB", fill_opacity=0.9)
        fruits = VGroup()
        for x, y in [(-0.5, 0.12), (-0.17, 0.14), (0.17, 0.12), (0.5, 0.14),
                     (-0.33, 0.4), (0.0, 0.42), (0.33, 0.4), (-0.15, 0.66), (0.17, 0.66)]:
            fruits.add(Circle(radius=0.17, fill_color=LETCHI, fill_opacity=1,
                              stroke_color="#7F1D1D", stroke_width=2).move_to(P(x, y)))
        return VGroup(fruits, bac).scale(s)

    def sac(self, s=1.0):
        corps = RoundedRectangle(width=1.2, height=1.3, corner_radius=0.15, stroke_color=WHITE,
                                 stroke_width=2, fill_color="#A7F3D0", fill_opacity=0.5)
        anse = Arc(radius=0.3, start_angle=0, angle=PI, stroke_color=WHITE, stroke_width=4)
        anse.next_to(corps, UP, buff=0)
        return VGroup(corps, anse).scale(s)

    def etiquette(self, texte, color):
        lbl = self.t(texte, 36, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Comprendre une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Que cache")
        q = self.ligne([("Que cache l'écriture", BLEU_CALCUL), ("3x", JAUNE_TITRE), ("?", BLEU_CALCUL)], 46)
        q.move_to(P(0, 0.3))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.play(q[1].animate.scale(1.5), run_time=0.5)
        self.play(q[1].animate.scale(1 / 1.5), run_time=0.5)
        self.attendre_voix(marge=1.5)

    # ── 01 : le marché ──────────────────────────────────────────────────────

    def ecran_marche(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-marche")
        self.titre_ecran("Au marché de Saint-Pierre")
        b = self.barquette(1.3).move_to(P(-3.6, 0.6))
        e1 = self.etiquette("3 € la barquette", COUL_COEF).next_to(b, DOWN, buff=0.45)
        self.play(FadeIn(b, shift=DOWN * 0.3))
        self.au_mot("3 euros la barquette")
        self.play(GrowFromCenter(e1))
        self.au_mot("Et le sac")
        s = self.sac(1.1).move_to(P(1.6, 0.7))
        e2 = self.etiquette("2 € le sac", COUL_CONST).next_to(s, DOWN, buff=0.45)
        self.play(FadeIn(s, shift=DOWN * 0.3))
        self.play(GrowFromCenter(e2))
        self.au_mot("Combien je paie")
        self.play(Write(self.chute("Combien je paie ?", color=BLEU_CALCUL, font_size=40)))
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        m = self.add_mascotte()
        self.dire("02-tableau")
        titre = self.titre_ecran("Toujours le même calcul")
        lignes = VGroup()
        for mot, n, nom, res, y in [("1 barquette", "1", "1 barquette", "5 €", 1.7),
                                    ("4 barquettes", "4", "4 barquettes", "14 €", 0.7),
                                    ("10 barquettes", "10", "10 barquettes", "32 €", -0.3)]:
            self.au_mot(mot)
            l = self.ligne([(nom + " :", WHITE), ("3 ×", COUL_COEF), (n, JAUNE_TITRE),
                            ("+ 2", COUL_CONST), ("=", WHITE), (res, BLEU_CALCUL)])
            l.move_to(P(-0.6, y))
            self.play(FadeIn(l, shift=RIGHT * 0.2))
            lignes.add(l)
        self.au_mot("C'est toujours le même calcul")
        self.play(*[Indicate(VGroup(l[1], l[3]), color=WHITE) for l in lignes])
        self.au_mot("Seul le nombre")
        self.play(*[Indicate(l[2], color=JAUNE_TITRE, scale_factor=1.6) for l in lignes])
        self.play(Write(self.chute("Seul le nombre de barquettes change.", color=JAUNE_TITRE, font_size=36)))
        self.attendre_voix()

    # ── 03 : la lettre ──────────────────────────────────────────────────────

    def ecran_lettre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lettre")
        self.titre_ecran("Une lettre pour le nombre qui change")
        self.au_mot("je l'appelle x")
        a = self.ligne([("nombre de barquettes", JAUNE_TITRE), ("→", WHITE), ("x", JAUNE_TITRE)], 40)
        a.move_to(P(-0.6, 1.8))
        self.play(FadeIn(a[0]), FadeIn(a[1], shift=RIGHT * 0.2))
        self.play(GrowFromCenter(a[2]))
        self.au_mot("Le prix s'écrit")
        prix = self.ligne([("prix =", WHITE), ("3 ×", COUL_COEF), ("x", JAUNE_TITRE), ("+ 2", COUL_CONST)], 56)
        prix.move_to(P(-0.6, 0.5))
        self.play(Write(prix))
        self.au_mot("Une lettre, c'est un nombre")
        d = self.t("Une lettre, c'est un nombre :", 38, BLEU_CALCUL).move_to(P(-0.6, -0.8))
        self.play(FadeIn(d, shift=UP * 0.2))
        self.au_mot("qu'on ne connaît pas encore")
        self.play(FadeIn(self.t("qu'on ne connaît pas encore,", 34).move_to(P(-0.6, -1.5))))
        self.au_mot("ou qui peut changer")
        self.play(FadeIn(self.t("ou qui peut changer.", 34).move_to(P(-0.6, -2.1))))
        self.attendre_voix()

    # ── 04 : le signe caché ─────────────────────────────────────────────────

    def ecran_signe_cache(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-signe-cache")
        self.titre_ecran("Le signe × se cache")
        long_ = self.ligne([("3", COUL_COEF), ("×", WHITE), ("x", JAUNE_TITRE)], 110).move_to(P(-0.6, 1.0))
        self.play(Write(long_))
        self.au_mot("on cache le signe fois")
        self.play(long_[1].animate.set_color(ROUGE_ERREUR))
        self.play(FadeOut(long_[1], scale=0.3))
        court = VGroup(long_[0], long_[2])
        self.play(long_[0].animate.next_to(long_[2], LEFT, buff=0.08))
        self.au_mot("3 x.")
        self.play(court.animate.scale(1.5), run_time=0.6)
        self.play(court.animate.scale(1 / 1.5), run_time=0.6)
        eg = self.t("=  3 × x", 60).next_to(court, RIGHT, buff=0.4)
        self.play(FadeIn(eg))
        self.au_mot("Le prix devient")
        prix = self.ligne([("prix =", WHITE), ("3x", COUL_COEF), ("+ 2", COUL_CONST)], 60).move_to(P(-0.6, -1.0))
        prix[1][1].set_color(JAUNE_TITRE)
        self.play(Write(prix))
        self.play(Write(self.chute("Entre un nombre et une lettre, le × se cache.", color=BLEU_CALCUL, font_size=34)))
        self.attendre_voix()

    # ── 05 : les noms ───────────────────────────────────────────────────────

    def ecran_anatomie(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-anatomie")
        self.titre_ecran("Chaque morceau a un nom")
        expr = self.t("3x + 2", 120).move_to(P(-0.6, 0.9))
        expr[1].set_color(JAUNE_TITRE)
        self.play(Write(expr))
        self.au_mot("Le 3, collé")
        c = self.t("coefficient", 40, COUL_COEF).move_to(P(-3.6, -0.9))
        fc = Arrow(c.get_top(), expr[0].get_bottom(), buff=0.12, color=COUL_COEF)
        self.play(expr[0].animate.set_color(COUL_COEF), GrowArrow(fc), FadeIn(c))
        self.au_mot("le prix d'une barquette")
        b = self.barquette(0.6).next_to(c, DOWN, buff=0.35)
        self.play(FadeIn(b), FadeIn(self.t("3 € la barquette", 26).next_to(b, RIGHT, buff=0.2)))
        self.au_mot("Le 2, tout seul")
        k = self.t("terme constant", 40, COUL_CONST).move_to(P(2.6, -0.9))
        fk = Arrow(k.get_top(), expr[3].get_bottom(), buff=0.12, color=COUL_CONST)
        self.play(expr[3].animate.set_color(COUL_CONST), GrowArrow(fk), FadeIn(k))
        self.au_mot("le sac")
        s = self.sac(0.45).next_to(k, DOWN, buff=0.35).shift(LEFT * 1.2)
        self.play(FadeIn(s), FadeIn(self.t("2 €, toujours", 26).next_to(s, RIGHT, buff=0.2)))
        self.au_mot("quel que soit x")
        self.play(Indicate(expr[3], color=COUL_CONST, scale_factor=1.4))
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("Si x vaut 2")
        self.play(FadeIn(self.t("x = 2", 48, JAUNE_TITRE).move_to(P(-5.0, 1.7))))
        self.au_mot("3 x ne vaut pas 32")
        faux = self.t("3x = 32", 60, ROUGE_ERREUR).move_to(P(-1.4, 1.7))
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux)))
        self.au_mot("On ne colle pas")
        self.play(FadeIn(self.t("on ne colle pas les chiffres", 30, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.4)))
        self.au_mot("3 x, c'est 3 fois 2")
        bon = self.t("3x = 3 × 2 = 6", 60, VERT_OK).move_to(P(-0.6, 0.4))
        self.play(Write(bon))
        self.play(Circumscribe(bon, color=VERT_OK))
        self.au_mot("Et le signe plus")
        plus = self.t("3 + x", 60, BLEU_CALCUL).move_to(P(-3.0, -1.0))
        self.play(FadeIn(plus))
        self.play(Indicate(plus[1], color=BLEU_CALCUL, scale_factor=1.8))
        self.au_mot("ne se cache jamais")
        self.play(FadeIn(self.t("le + ne se cache jamais", 34, BLEU_CALCUL).move_to(P(2.0, -1.0))))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Dans 5 a plus 7")
        self.play(Write(self.t("5a + 7", 90).move_to(P(-0.6, 1.5))))
        self.au_mot("quel est le coefficient")
        self.play(FadeIn(self.t("1. Le coefficient ?", 36, COUL_COEF).move_to(P(-0.6, 0.2))))
        self.au_mot("Quel est le terme constant")
        self.play(FadeIn(self.t("2. Le terme constant ?", 36, COUL_CONST).move_to(P(-0.6, -0.5))))
        self.au_mot("Et si a vaut 3")
        self.play(FadeIn(self.t("3. Si a = 3, combien vaut 5a ?", 36, BLEU_CALCUL).move_to(P(-0.6, -1.2))))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        expr = self.t("5a + 7", 90).move_to(P(-0.6, 1.5))
        self.add(expr)
        self.au_mot("Le coefficient")
        self.play(expr[0].animate.set_color(COUL_COEF))
        self.play(FadeIn(self.t("1. Le coefficient : 5", 36, COUL_COEF).move_to(P(-0.6, 0.2))))
        self.au_mot("Le terme constant")
        self.play(expr[3].animate.set_color(COUL_CONST))
        self.play(FadeIn(self.t("2. Le terme constant : 7", 36, COUL_CONST).move_to(P(-0.6, -0.5))))
        self.au_mot("Et pour a égale 3")
        res = self.t("3. 5a = 5 × 3 = 15", 40, VERT_OK).move_to(P(-1.4, -1.3))
        self.play(Write(res))
        self.au_mot("Pas 53")
        faux = self.t("53", 44, ROUGE_ERREUR).next_to(res, RIGHT, buff=0.8)
        self.play(FadeIn(faux), Create(self.barrer(faux)))
        self.attendre_voix()

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("3 x, c'est", "3x = 3 × x"),
            ("Le nombre collé", "Le nombre collé à la lettre : le coefficient"),
            ("le nombre seul", "Le nombre seul : le terme constant"),
            ("Et on ne colle", "On ne colle jamais les chiffres"),
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
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : traduire une phrase en expression", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_marche()
        self.ecran_tableau()
        self.ecran_lettre()
        self.ecran_signe_cache()
        self.ecran_anatomie()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
