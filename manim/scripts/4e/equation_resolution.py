# equation_resolution.py
# EleveAI — Maths 4e — Résoudre une équation (notionId : equation_resolution), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-4e-equations.tsx : 3x = 15,
# 5x = 8 (le piège), 2x + 3x = 15, 2(x + 3) = 14, la vérification 2 × 4 + 3 = 11.
#
# ⭐ 10/10/2026 : paysage du fil « calcul littéral », une PAR CLASSE pour les
# équations (Frédéric : 4e, 3e, 1re sans spé/STMG, terminale TVI). Le produit
# nul est parti dans la vidéo de 3e. Voix validée : manim/voix/4e-equation-resolution.json
# (débit −7).
#
# ⭐ LE DESSIN QUI PORTE TOUT : la BALANCE chargée des SACS de x billes de la
# vidéo de 5e. On voit les 3 billes retirées des DEUX plateaux, puis les 8
# billes partagées entre les deux sacs.
#
# Mapping micro-compétences (coach 4e, notion equation_resolution) → écrans :
# - equation_reconnaitre             → 01-equation
# - equation_resoudre_simple         → 02-balance, 03-inverse
# - equation_resoudre_reduction, equation_resoudre_distributivite → 04-reduire
# - equation_verifier                → 05-verifier
# - equation_traduire, equation_probleme → 06-probleme
# - equation_defi                    → 08-defi + correction (3x − 4 = x + 6)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_resolution.py EquationResolution4e -o eleveai-maths-4e-equation-resolution --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

SAC = "#8B5E3C"
BILLE = "#60A5FA"

OBJECTIFS = [
    "Reconnaître une équation",
    "La résoudre en gardant l'équilibre, et vérifier",
    "Mettre un problème en équation",
]


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class EquationResolution4e(Notion4e):
    nom_voix = "4e-equation-resolution"

    # ── les dessins ─────────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def sac(self, h=0.62):
        corps = RoundedRectangle(width=h * 0.85, height=h, corner_radius=0.12,
                                 fill_color=SAC, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        x = self.t("x", int(h * 46)).move_to(corps.get_center())
        return VGroup(corps, x)

    def bille(self, r=0.13):
        return Circle(radius=r, fill_color=BILLE, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)

    def tas(self, n, par_ligne=4):
        """n billes en tas, par rangées, posées sur une ligne de base."""
        g = VGroup(*[self.bille() for _ in range(n)])
        g.arrange_in_grid(cols=min(n, par_ligne), buff=0.07)
        return g

    def balance(self, y=-0.2, demi=3.2):
        pied = Triangle(fill_color=GRAY_B, fill_opacity=1, stroke_width=0).scale(0.35).move_to([-0.6, y - 0.35, 0])
        fleau = Line([-0.6 - demi, y, 0], [-0.6 + demi, y, 0], stroke_width=6, color=GRAY_B)
        pg = Line([-0.6 - demi - 1.0, y + 0.05, 0], [-0.6 - demi + 1.0, y + 0.05, 0], stroke_width=8, color=WHITE)
        pd = Line([-0.6 + demi - 1.0, y + 0.05, 0], [-0.6 + demi + 1.0, y + 0.05, 0], stroke_width=8, color=WHITE)
        socle = Line([-1.2, y - 0.62, 0], [0.0, y - 0.62, 0], stroke_width=6, color=GRAY_B)
        return VGroup(pied, fleau, pg, pd, socle), pg, pd

    def poser(self, mob, plateau):
        return mob.next_to(plateau, UP, buff=0.06)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Résoudre une équation", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        q = self.t("× 2,  + 3  →  11.   Mon nombre ?", 46, BLEU_CALCUL).move_to([-0.6, 1.0, 0])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))
        self.au_mot("Je le double")
        self.play(FadeIn(self.t("je le double, j'ajoute 3, je trouve 11", 34).move_to([-0.6, 0.0, 0])))
        self.au_mot("une balance")
        b, pg, pd = self.balance(y=-1.9, demi=2.4)
        self.play(FadeIn(b))
        self.attendre_voix()

    # ── 01 : qu'est-ce qu'une équation ──────────────────────────────────────

    def ecran_equation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-equation")
        self.titre_ecran("1. Qu'est-ce qu'une équation ?")
        self.play(FadeIn(self.t("une égalité  +  une inconnue", 40, BLEU_CALCUL).move_to([-0.6, 2.2, 0])))
        for mot, txt, ok, raison, y in [("3 x plus 2 égale 11", "3x + 2 = 11", True, "un « = » et une lettre", 1.0),
                                       ("2 plus 7 égale 9", "2 + 7 = 9", False, "pas de lettre", -0.05),
                                       ("3 x plus 5 : pas", "3x + 5", False, "pas de « = »", -1.1)]:
            self.au_mot(mot)
            e = self.t(txt, 48, VERT_OK if ok else ORANGE_RETENUE).move_to([-3.6, y, 0])
            signe = self.coche() if ok else self.t("✗", 44, ROUGE_ERREUR)
            signe.move_to([-1.2, y, 0])
            r = self.t(raison, 32, GRAY_B).move_to([2.2, y, 0])
            self.play(FadeIn(e), FadeIn(signe), FadeIn(r))
        self.au_mot("Résoudre une équation")
        self.play(Write(self.chute("Résoudre : trouver la valeur de x qui rend l'égalité vraie.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 02 : la balance ─────────────────────────────────────────────────────

    def ecran_balance(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-balance")
        self.titre_ecran("2. La balance")
        self.au_mot("2 x plus 3 égale 11")
        eq = self.t("2x + 3 = 11", 54, BLEU_CALCUL).move_to([-0.6, 2.2, 0])
        self.play(Write(eq))

        self.au_mot("Sur la balance")
        b, pg, pd = self.balance(y=-0.4)
        sacs = VGroup(self.sac(), self.sac()).arrange(RIGHT, buff=0.1)
        trois = self.tas(3, 3)
        gauche = VGroup(sacs, trois).arrange(RIGHT, buff=0.15)
        self.poser(gauche, pg)
        onze = self.tas(11, 6)
        self.poser(onze, pd)
        self.play(FadeIn(b))
        self.au_mot("à gauche, 2 sacs")
        self.play(FadeIn(gauche, shift=DOWN * 0.2))
        self.au_mot("À droite, 11 billes")
        self.play(FadeIn(onze, shift=DOWN * 0.2))

        self.au_mot("J'enlève 3 billes à gauche")
        enleve_d = VGroup(*onze[-3:])
        self.play(trois.animate.set_color(ROUGE_ERREUR), enleve_d.animate.set_color(ROUGE_ERREUR))
        self.play(FadeOut(trois, shift=UP * 0.5), FadeOut(enleve_d, shift=UP * 0.5))
        self.play(FadeIn(self.t("− 3", 40, ROUGE_ERREUR).next_to(pg, DOWN, buff=0.35)),
                  FadeIn(self.t("− 3", 40, ROUGE_ERREUR).next_to(pd, DOWN, buff=0.35)))
        self.au_mot("2 x égale 8")
        self.play(Transform(eq, self.t("2x = 8", 54, BLEU_CALCUL).move_to([-0.6, 2.2, 0])))

        self.au_mot("Je partage en deux")
        huit = VGroup(*onze[:8])
        g1, g2 = VGroup(*huit[:4]), VGroup(*huit[4:])
        cible = VGroup(g1.copy().arrange_in_grid(cols=2, buff=0.06), g2.copy().arrange_in_grid(cols=2, buff=0.06)
                       ).arrange(RIGHT, buff=0.5).next_to(pd, UP, buff=0.06)
        self.play(g1.animate.move_to(cible[0]).arrange_in_grid(cols=2, buff=0.06).move_to(cible[0]),
                  g2.animate.arrange_in_grid(cols=2, buff=0.06).move_to(cible[1]), run_time=1.2)
        self.play(Create(SurroundingRectangle(g1, color=JAUNE_TITRE, buff=0.06)),
                  Create(SurroundingRectangle(g2, color=JAUNE_TITRE, buff=0.06)),
                  Create(SurroundingRectangle(sacs[0], color=JAUNE_TITRE, buff=0.04)),
                  Create(SurroundingRectangle(sacs[1], color=JAUNE_TITRE, buff=0.04)))
        self.play(FadeIn(self.t("1 sac = 4 billes", 34, JAUNE_TITRE).move_to([-0.6, 1.25, 0])))
        self.au_mot("x égale 4")
        self.play(Transform(eq, self.t("x = 4", 64, VERT_OK).move_to([-0.6, 2.2, 0])))
        self.au_mot("Ce qu'on fait d'un côté")
        self.play(Write(self.chute("Ce qu'on fait d'un côté, on le fait de l'autre.", color=VERT_OK)))
        self.attendre_voix()

    # ── 03 : l'opération inverse ────────────────────────────────────────────

    def ecran_inverse(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-inverse")
        self.titre_ecran("3. L'opération inverse")
        self.play(FadeIn(self.t("on défait ce qu'on a fait à x", 34, BLEU_CALCUL).move_to([-0.6, 2.25, 0])))
        for mot, eq, geste, res, y in [("x plus 4 égale 9", "x + 4 = 9", "− 4 des deux côtés", "x = 5", 1.2),
                                       ("3 x égale 15", "3x = 15", "÷ 3 des deux côtés", "x = 5", 0.2)]:
            self.au_mot(mot)
            self.play(FadeIn(self.t(eq, 42).move_to([-4.7, y, 0])))
            self.play(FadeIn(self.t(geste, 32, ORANGE_RETENUE).move_to([-0.4, y, 0])))
            self.play(FadeIn(self.t(res, 42, VERT_OK).move_to([3.4, y, 0])))
        self.au_mot("Le piège")
        faux = self.t("5x = 8  donc  x = 3", 44, ORANGE_RETENUE).move_to([-0.6, -0.85, 0])
        self.play(FadeIn(faux))
        self.au_mot("Faux")
        self.play(Create(self.barrer(faux)))
        self.au_mot("il faut diviser")
        self.play(Write(self.t("x = 8 ÷ 5 = 1,6", 50, VERT_OK).move_to([-0.6, -1.85, 0])))
        self.attendre_voix()

    # ── 04 : réduire ou développer d'abord ──────────────────────────────────

    def ecran_reduire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-reduire")
        self.titre_ecran("4. Préparer l'équation")
        self.au_mot("2 x plus 3 x égale 15")
        self.play(FadeIn(self.t("2x + 3x = 15", 40, BLEU_CALCUL).move_to([-4.3, 1.9, 0])))
        self.au_mot("on réduit d'abord")
        self.play(FadeIn(self.t("réduire :  5x = 15", 34).move_to([0.9, 1.9, 0])))
        self.au_mot("puis x égale 3")
        self.play(FadeIn(self.t("x = 3", 42, VERT_OK).move_to([4.5, 1.9, 0])))

        self.au_mot("2 fois, parenthèse")
        self.play(FadeIn(self.t("2(x + 3) = 14", 40, BLEU_CALCUL).move_to([-4.3, 0.6, 0])))
        self.au_mot("on développe d'abord")
        self.play(FadeIn(self.t("développer :  2x + 6 = 14", 34).move_to([1.5, 0.6, 0])))
        self.au_mot("On enlève 6")
        self.play(FadeIn(self.t("− 6 :  2x = 8", 38).move_to([1.5, -0.4, 0])))
        self.au_mot("On divise par 2")
        self.play(FadeIn(self.t("÷ 2 :  x = 4", 42, VERT_OK).move_to([1.5, -1.4, 0])))
        self.attendre_voix()

    # ── 05 : vérifier ───────────────────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifier")
        self.titre_ecran("5. Vérifier")
        self.au_mot("Est-ce que 4")
        self.play(Write(self.t("2x + 3 = 11   avec   x = 4 ?", 48, BLEU_CALCUL).move_to([-0.6, 1.9, 0])))
        self.au_mot("Je remplace x par 4")
        self.play(FadeIn(self.t("2 × 4 + 3", 52).move_to([-3.2, 0.6, 0])))
        self.au_mot("8 plus 3")
        self.play(FadeIn(self.t("= 8 + 3 = 11", 52, VERT_OK).move_to([1.9, 0.6, 0])))
        self.au_mot("On retrouve 11")
        v = VGroup(self.coche(), self.t("4 est bien la solution", 44, VERT_OK)).arrange(RIGHT, buff=0.3).move_to([-0.6, -0.6, 0])
        self.play(FadeIn(v, shift=UP * 0.15))
        self.au_mot("Vérifier prend dix secondes")
        self.play(Write(self.chute("Vérifier : 10 secondes, et plus de réponse fausse.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 06 : mettre en équation ─────────────────────────────────────────────

    def ecran_probleme(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-probleme")
        self.titre_ecran("6. Mettre un problème en équation")
        self.au_mot("3 cahiers")
        self.play(FadeIn(self.t("3 cahiers + 1 stylo à 2 € = 11 €.   Prix d'un cahier ?", 34, BLEU_CALCUL).move_to([-0.6, 2.2, 0])))
        for mot, num, txt, c, y in [("Un : je choisis", "1", "x = le prix d'un cahier", WHITE, 1.15),
                                    ("Deux : je traduis", "2", "3x + 2 = 11", WHITE, 0.3),
                                    ("Trois : je résous", "3", "3x = 9,  donc  x = 3", WHITE, -0.55),
                                    ("Quatre : je réponds", "4", "Un cahier coûte 3 €.", VERT_OK, -1.4)]:
            self.au_mot(mot)
            n = self.t(num, 40, JAUNE_TITRE).move_to([-5.0, y, 0])
            self.play(FadeIn(n), FadeIn(self.t(txt, 40, c).next_to(n, RIGHT, buff=0.5)))
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Le triple d'un nombre")
        self.play(FadeIn(self.t("Le triple d'un nombre, moins 4,", 40).move_to([-0.6, 1.5, 0])))
        self.au_mot("est égal à ce nombre")
        self.play(FadeIn(self.t("est égal à ce nombre plus 6.", 40).move_to([-0.6, 0.8, 0])))
        self.au_mot("Quel est ce nombre")
        self.play(Write(self.t("Quel est ce nombre ?", 48, BLEU_CALCUL).move_to([-0.6, -0.3, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        self.au_mot("L'équation")
        self.play(Write(self.t("3x − 4 = x + 6", 52, BLEU_CALCUL).move_to([-0.6, 2.2, 0])))
        y = 1.25
        for mot, geste, res in [("J'enlève x", "− x", "2x − 4 = 6"), ("J'ajoute 4", "+ 4", "2x = 10"),
                                ("Je divise par 2", "÷ 2", "x = 5")]:
            self.au_mot(mot)
            g = self.t(geste, 36, ORANGE_RETENUE).move_to([-3.6, y, 0])
            r = self.t(res, 44, VERT_OK if res == "x = 5" else WHITE).move_to([-0.6, y, 0])
            self.play(FadeIn(g), FadeIn(r))
            y -= 0.8
        self.au_mot("Je vérifie")
        self.play(FadeIn(self.t("3 × 5 − 4 = 11    et    5 + 6 = 11", 38, VERT_OK).move_to([-0.6, -1.3, 0])))
        self.au_mot("le nombre est 5")
        self.play(Write(self.chute("Le nombre est 5.", color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_equation()
        self.ecran_balance()
        self.ecran_inverse()
        self.ecran_reduire()
        self.ecran_verifier()
        self.ecran_probleme()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Une équation est une balance",
                "Pour isoler x : l'opération inverse",
                "Une solution se vérifie",
            ],
            rappel="Piège : 5x = 8 ne donne pas x = 3 : on divise, x = 1,6.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
