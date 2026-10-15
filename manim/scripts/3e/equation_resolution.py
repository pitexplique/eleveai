# equation_resolution.py
# EleveAI — Maths 3e — Résoudre une équation (notionId : equation_resolution), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-3e-equations.tsx ; le produit nul
# (x + 3)(x − 2) = 0 est l'exemple de Frédéric (10/10/2026).
#
# ⭐ 10/10/2026 : une paysage PAR CLASSE pour les équations. La 4e a la balance ;
# la 3e apporte le PRODUIT NUL et x² = a. Voix validée : manim/voix/3e-equation-resolution.json
# (débit −6, entre la 4e à −7 et le lycée à −4).
#
# ⭐ LES DESSINS : deux « boîtes » (les facteurs) reliées par × ; si l'une vaut 0,
# tout vaut 0. Puis la droite graduée où 5 et −5 sont à la même distance de 0.
#
# Mapping micro-compétences (coach 3e, notion equation_resolution) → écrans :
# - equation_resoudre_developper → 01-developper
# - equation_produit_nul         → 02-regle, 03-produit-nul, 06-lien
# - equation_verifier            → 04-verifier
# - (x² = a, fiche 3e)           → 05-carre
# - equation_probleme            → 07-probleme
# - equation_defi                → 08-defi + correction (x² = 3x)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/equation_resolution.py EquationResolution3e -o eleveai-maths-3e-equation-resolution --media_dir manim/scripts/3e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Développer avant de résoudre",
    "Résoudre une équation produit nul",
    "Résoudre x² = a, et vérifier ses solutions",
]


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


class EquationResolution3e(Notion3e):
    nom_voix = "3e-equation-resolution"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def boite(self, texte, color=BLEU_CALCUL, w=2.6):
        r = RoundedRectangle(width=w, height=1.0, corner_radius=0.18, stroke_color=color, stroke_width=4)
        return VGroup(r, self.t(texte, 44, color).move_to(r))

    def produit(self, a, b, y=1.6):
        g = VGroup(self.boite(a), self.t("×", 54), self.boite(b), self.t("= 0", 54, JAUNE_TITRE)
                   ).arrange(RIGHT, buff=0.35).move_to([-0.6, y, 0])
        return g

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Résoudre une équation", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        q = self.t("x² = 25", 110, BLEU_CALCUL).move_to([-0.6, 0.4, 0])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))
        self.au_mot("Presque tout le monde")
        self.play(FadeIn(self.t("x = 5 … et c'est tout ?", 44, ORANGE_RETENUE).move_to([-0.6, -1.0, 0])))
        self.au_mot("le produit nul")
        self.play(Write(self.chute("Il manque une solution. L'outil : le produit nul.", color=VERT_OK)))
        self.attendre_voix()

    # ── 01 ──────────────────────────────────────────────────────────────────

    def ecran_developper(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-developper")
        self.titre_ecran("1. Développer avant de résoudre")
        self.au_mot("3 fois, parenthèse")
        self.play(Write(self.t("3(x − 2) = 2x + 5", 52, BLEU_CALCUL).move_to([-0.6, 2.1, 0])))
        y = 1.15
        for mot, geste, res in [("On développe", "développer", "3x − 6 = 2x + 5"),
                                ("On enlève 2 x", "− 2x", "x − 6 = 5"),
                                ("On ajoute 6", "+ 6", "x = 11")]:
            self.au_mot(mot)
            self.play(FadeIn(self.t(geste, 32, ORANGE_RETENUE).move_to([-4.2, y, 0])),
                      FadeIn(self.t(res, 44, VERT_OK if res == "x = 11" else WHITE).move_to([0.2, y, 0])))
            y -= 0.85
        self.au_mot("On vérifie")
        v = VGroup(self.t("3 × 9 = 27   et   22 + 5 = 27", 36, VERT_OK), self.coche()).arrange(RIGHT, buff=0.3)
        self.play(FadeIn(v.move_to([-0.6, -1.65, 0])))
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        self.titre_ecran("2. L'outil nouveau : le produit nul")
        for mot, txt, c, y in [("3 fois 0", "3 × 0 = 0", VERT_OK, 2.0), ("0 fois 7", "0 × 7 = 0", VERT_OK, 1.2),
                               ("Et 3 fois 7", "3 × 7 = 21", ORANGE_RETENUE, 0.4)]:
            self.au_mot(mot)
            self.play(FadeIn(self.t(txt, 50, c).move_to([-4.0, y, 0])))
        self.au_mot("il faut qu'un des facteurs")
        self.play(FadeIn(VGroup(self.t("un produit vaut 0", 32), self.t("seulement si", 32), self.t("un facteur vaut 0", 32)
                                ).arrange(DOWN, buff=0.12).move_to([2.6, 1.2, 0])))
        self.au_mot("La règle")
        r = self.t("A × B = 0   ⟺   A = 0  ou  B = 0", 46, JAUNE_TITRE).move_to([-0.6, -0.9, 0])
        self.play(Write(r), Create(SurroundingRectangle(r, color=JAUNE_TITRE, buff=0.2)))
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────

    def ecran_produit_nul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-produit-nul")
        self.titre_ecran("3. Résoudre un produit nul")
        p = self.produit("x + 3", "x − 2", y=1.9)
        self.play(FadeIn(p))
        self.au_mot("Donc x plus 3 égale 0")
        g = self.t("x + 3 = 0", 46, BLEU_CALCUL).move_to([-3.6, 0.4, 0])
        d = self.t("x − 2 = 0", 46, BLEU_CALCUL).move_to([2.4, 0.4, 0])
        ou = self.t("ou", 40, JAUNE_TITRE).move_to([-0.6, 0.4, 0])
        self.play(GrowArrow(Arrow(p[0].get_bottom(), g.get_top(), buff=0.12, color=BLEU_CALCUL)), FadeIn(g))
        self.play(FadeIn(ou), GrowArrow(Arrow(p[2].get_bottom(), d.get_top(), buff=0.12, color=BLEU_CALCUL)), FadeIn(d))
        self.au_mot("Première équation")
        self.play(FadeIn(self.t("x = −3", 52, VERT_OK).move_to([-3.6, -0.6, 0])))
        self.au_mot("Deuxième équation")
        self.play(FadeIn(self.t("x = 2", 52, VERT_OK).move_to([2.4, -0.6, 0])))
        self.au_mot("Deux solutions")
        self.play(Write(self.t("deux solutions :  −3  et  2", 40, VERT_OK).move_to([-0.6, -1.5, 0])))
        self.au_mot("Le piège")
        self.play(Write(self.chute("Piège : x + 3 = 0 donne x = −3, pas 3.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-verifier")
        self.titre_ecran("4. Vérifier")
        self.au_mot("Je remplace x par moins 3")
        self.play(FadeIn(self.t("x = −3 :", 40, JAUNE_TITRE).move_to([-5.3, 1.8, 0])))
        self.play(FadeIn(self.t("(−3 + 3)(−3 − 2) = 0 × (−5) = 0", 38, VERT_OK).move_to([0.9, 1.8, 0])))
        self.au_mot("C'est bien une solution")
        self.play(FadeIn(VGroup(self.coche(), self.t("−3 est solution", 40, VERT_OK)).arrange(RIGHT, buff=0.3).move_to([-0.6, 0.85, 0])))
        self.au_mot("Et 3 ?")
        self.play(FadeIn(self.t("x = 3 :", 40, JAUNE_TITRE).move_to([-5.3, -0.3, 0])))
        self.play(FadeIn(self.t("(3 + 3)(3 − 2) = 6 × 1 = 6", 38, ORANGE_RETENUE).move_to([0.9, -0.3, 0])))
        self.au_mot("3 n'est pas solution")
        self.play(FadeIn(self.t("6 ≠ 0 :  3 n'est pas solution", 40, ROUGE_ERREUR).move_to([-0.6, -1.25, 0])))
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-carre")
        self.titre_ecran("5. x² = a")
        self.play(Write(self.t("x² = 25", 56, BLEU_CALCUL).move_to([-0.6, 2.35, 0])))
        d, pt = self.droite(-6, 6, 12, {-5: "−5", 0: "0", 5: "5"}, longueur=8.0, centre=(-0.6, 1.0), font_size=26)
        self.play(Create(d[0]), Create(d[1]), FadeIn(d[2]))
        self.au_mot("5 au carré")
        self.play(FadeIn(self.point(pt, 5, "5² = 25", color=VERT_OK, font_size=26)))
        self.au_mot("Mais moins 5 au carré")
        self.play(FadeIn(self.point(pt, -5, "(−5)² = 25", color=VERT_OK, font_size=26)))
        self.au_mot("Deux solutions")
        self.play(Write(self.t("deux solutions :  5  et  −5", 44, VERT_OK).move_to([-0.6, -0.05, 0])))
        self.au_mot("Et x au carré égale 0")
        self.play(FadeIn(self.t("x² = 0  :  une seule solution, 0", 36).move_to([-0.6, -0.9, 0])))
        self.au_mot("Et x au carré égale moins 4")
        self.play(FadeIn(self.t("x² = −4 :  aucune solution", 36, ORANGE_RETENUE).move_to([-0.6, -1.6, 0])))
        self.au_mot("un carré n'est jamais négatif")
        self.play(Write(self.chute("Un carré n'est jamais négatif.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 06 ──────────────────────────────────────────────────────────────────

    def ecran_lien(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-lien")
        self.titre_ecran("6. Pourquoi deux solutions ?")
        self.au_mot("x au carré égale 25, c'est")
        self.play(Write(self.t("x² = 25   ⟺   x² − 25 = 0", 48, BLEU_CALCUL).move_to([-0.6, 2.1, 0])))
        self.au_mot("On factorise")
        self.play(FadeIn(self.t("identité remarquable :  a² − b² = (a − b)(a + b)", 30, GRAY_B).move_to([-0.6, 1.25, 0])))
        p = self.produit("x − 5", "x + 5", y=0.2)
        self.play(FadeIn(p))
        self.au_mot("C'est un produit nul")
        self.play(Indicate(p[3], color=JAUNE_TITRE))
        self.au_mot("On retrouve")
        self.play(Write(self.t("x = 5   ou   x = −5", 52, VERT_OK).move_to([-0.6, -1.2, 0])))
        self.attendre_voix()

    # ── 07 ──────────────────────────────────────────────────────────────────

    def ecran_probleme(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-probleme")
        self.titre_ecran("7. Un problème")
        carre = Square(side_length=2.2, color=WHITE, stroke_width=4).move_to([-4.3, 0.6, 0])
        aire = self.t("49 cm²", 36, BLEU_CALCUL).move_to(carre)
        cote = self.t("x", 40, JAUNE_TITRE).next_to(carre, DOWN, buff=0.15)
        self.play(Create(carre), FadeIn(aire))
        self.au_mot("J'appelle x le côté")
        self.play(FadeIn(cote), FadeIn(self.t("x² = 49", 56, BLEU_CALCUL).move_to([1.4, 1.7, 0])))
        self.au_mot("Deux solutions")
        self.play(FadeIn(self.t("x = 7   ou   x = −7", 48).move_to([1.4, 0.75, 0])))
        self.au_mot("une longueur n'est jamais négative")
        m7 = self.t("−7", 48, ORANGE_RETENUE).move_to([1.4, -0.2, 0])
        self.play(FadeIn(m7), Create(self.barrer(m7)))
        self.au_mot("Le côté mesure")
        self.play(Write(self.chute("Le côté mesure 7 cm.", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── 08 ──────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Résous")
        self.play(GrowFromCenter(self.t("x² = 3x", 110, BLEU_CALCUL).move_to([-0.6, 1.0, 0])))
        self.au_mot("il y a un piège")
        self.play(FadeIn(self.t("un piège… et DEUX solutions", 40, ORANGE_RETENUE).move_to([-0.6, -0.5, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        self.au_mot("diviser par x")
        faux = self.t("÷ x  :  x = 3   seulement ?", 40, ORANGE_RETENUE).move_to([-0.6, 2.1, 0])
        self.play(FadeIn(faux))
        self.au_mot("On perd une solution")
        self.play(Create(self.barrer(faux)))
        self.au_mot("on ramène tout à gauche")
        self.play(FadeIn(self.t("x² − 3x = 0", 48).move_to([-0.6, 1.1, 0])))
        self.au_mot("On factorise par x")
        self.play(FadeIn(self.t("x(x − 3) = 0", 52, BLEU_CALCUL).move_to([-0.6, 0.15, 0])))
        self.au_mot("Produit nul")
        self.play(FadeIn(self.t("x = 0   ou   x − 3 = 0", 44).move_to([-0.6, -0.8, 0])))
        self.au_mot("Deux solutions")
        self.play(Write(self.chute("Deux solutions : 0 et 3.", color=VERT_OK, font_size=38)))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_developper()
        self.ecran_regle()
        self.ecran_produit_nul()
        self.ecran_verifier()
        self.ecran_carre()
        self.ecran_lien()
        self.ecran_probleme()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Produit nul : on résout chaque facteur",
                "x² = a (a positif) : deux solutions",
                "On ne divise jamais par x : on factorise",
            ],
            rappel="Piège : x + 3 = 0 donne x = −3, pas 3.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
