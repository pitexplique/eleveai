# litteral_developper.py
# EleveAI — Maths 4e — Développer (notions litteral_distributivite et
# litteral_identite_remarquable), AVEC VOIX.
# Mêmes exemples que les fiches lib/fiches/maths-4e-distributivite.tsx et
# maths-4e-identites-remarquables.tsx : 3(x + 4), −2(x + 5), (x + 2)(x + 3),
# (x + 3)², (x − 5)(x + 5).
#
# ⭐ 09/10/2026 : paysage 2 du fil « calcul littéral » (4e, rappel en 3e,
# automatismes de 1re et de STMG). Voix validée : manim/voix/4e-litteral-developper.json
# (débit −7, celui de la 4e).
#
# ⭐ LE DESSIN QUI PORTE TOUT : le RECTANGLE DÉCOUPÉ (modèle d'aire). Il fait
# voir les 2 produits de 3(x + 4), les 4 de (x + 2)(x + 3), et les DEUX
# rectangles de 3x que l'on oublie dans (x + 3)².
#
# Mapping micro-compétences (coach 4e) → écrans :
# - litteral_distributivite_simple       → 01-simple, 02-signe
# - litteral_distributivite_double       → 03-double
# - litteral_distributivite_reduire      → 04-reduire
# - litteral_identite_lier_distributivite, litteral_identite_developper → 05-carre
# - litteral_identite_reconnaitre        → 06-difference
# - litteral_distributivite_defi         → 07-defi + correction (21 × 19)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/litteral_developper.py LitteralDevelopper4e -o eleveai-maths-4e-litteral-developper --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Développer k(a + b), même avec un signe −",
    "Développer deux parenthèses, puis réduire",
    "Développer un carré sans oublier le milieu",
]


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class LitteralDevelopper4e(Notion4e):
    nom_voix = "4e-litteral-developper"

    # ── les dessins ─────────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def grille(self, cols, rows, coin=(-5.6, 1.6)):
        """Le rectangle découpé. cols / rows : [(étiquette, taille)].
        Renvoie (cases[i][j], étiquettes) ; les cases sont vides, on les remplit
        avec `remplir`."""
        x0, y0 = coin
        cases, etiq = [], VGroup()
        y = y0
        for i, (lr, h) in enumerate(rows):
            ligne = []
            x = x0
            for j, (lc, w) in enumerate(cols):
                r = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3)
                r.move_to([x + w / 2, y - h / 2, 0])
                ligne.append(r)
                if i == 0:
                    etiq.add(self.t(lc, 32, BLEU_CALCUL).move_to([x + w / 2, y0 + 0.32, 0]))
                x += w
            etiq.add(self.t(lr, 32, BLEU_CALCUL).move_to([x0 - 0.35, y - h / 2, 0]))
            cases.append(ligne)
            y -= h
        return cases, etiq

    def remplir(self, case, texte, color, font_size=34):
        fond = case.copy().set_fill(color, opacity=0.35).set_stroke(width=0)
        txt = self.t(texte, font_size, WHITE).move_to(case.get_center())
        return VGroup(fond, txt)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def montrer_grille(self, cases, etiq):
        self.play(*[Create(c) for l in cases for c in l], FadeIn(etiq))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Développer", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        q = self.t("(x + 3)²  =  x² + 9 ?", 80, BLEU_CALCUL).move_to([-0.6, 0.3, 0])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))
        self.au_mot("Presque tout le monde")
        self.play(FadeIn(self.t("presque tout le monde le croit…", 34, ORANGE_RETENUE).move_to([-0.6, -1.0, 0])))
        self.au_mot("Un simple dessin")
        self.play(Write(self.chute("Un simple dessin va montrer ce qui manque.", color=VERT_OK, font_size=32)))
        self.attendre_voix()

    # ── 01 : un nombre devant la parenthèse ─────────────────────────────────

    def ecran_simple(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-simple")
        self.titre_ecran("1. Un nombre devant la parenthèse")
        self.au_mot("3 fois, parenthèse")
        self.play(Write(self.t("3(x + 4)", 64, BLEU_CALCUL).move_to([2.6, 2.0, 0])))

        self.au_mot("Dessinons un rectangle")
        cases, etiq = self.grille([("x", 2.6), ("4", 1.4)], [("3", 1.4)], coin=(-5.4, 1.0))
        self.montrer_grille(cases, etiq)
        self.au_mot("Une partie de 3 sur x")
        self.play(FadeIn(self.remplir(cases[0][0], "3x", BLEU_CALCUL)))
        self.au_mot("Une partie de 3 sur 4")
        self.play(FadeIn(self.remplir(cases[0][1], "12", ORANGE_RETENUE)))
        self.au_mot("L'aire totale")
        self.play(Write(self.t("= 3x + 12", 64, VERT_OK).move_to([2.6, 1.0, 0])))
        self.au_mot("Le 3 multiplie chaque terme")
        self.play(FadeIn(self.t("le 3 multiplie CHAQUE terme", 30, VERT_OK).move_to([2.4, 0.1, 0])))

        self.au_mot("Pas 3 x plus 4")
        faux = self.t("3x + 4", 52, ORANGE_RETENUE).move_to([-0.6, -1.15, 0])
        self.play(FadeIn(faux), Create(self.barrer(faux)))
        self.au_mot("pour x égale 1")
        self.play(FadeIn(self.t("x = 1 :   3 × 5 = 15,   mais 3 + 4 = 7", 34).move_to([-0.6, -2.05, 0])))
        self.attendre_voix()

    # ── 02 : avec un signe moins ────────────────────────────────────────────

    def ecran_signe(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-signe")
        self.titre_ecran("2. Avec un nombre négatif")
        self.au_mot("Moins 2 fois, parenthèse")
        e = self.t("−2(x + 5)", 84, BLEU_CALCUL).move_to([-0.6, 1.6, 0])
        self.play(Write(e))
        self.au_mot("Moins 2 fois x")
        f1 = CurvedArrow(e[1].get_top(), e[3].get_top(), angle=-PI / 2, color=VERT_OK)
        self.play(Create(f1), FadeIn(self.t("−2 × x = −2x", 44, VERT_OK).move_to([-3.4, 0.2, 0])))
        self.au_mot("Moins 2 fois 5")
        f2 = CurvedArrow(e[1].get_top(), e[5].get_top(), angle=-PI / 2, color=ORANGE_RETENUE)
        self.play(Create(f2), FadeIn(self.t("−2 × 5 = −10", 44, ORANGE_RETENUE).move_to([2.2, 0.2, 0])))
        self.au_mot("Résultat")
        self.play(GrowFromCenter(self.t("−2(x + 5) = −2x − 10", 60, VERT_OK).move_to([-0.6, -1.1, 0])))
        self.au_mot("Le signe moins voyage")
        self.play(Write(self.chute("Le signe − voyage avec le nombre : il se distribue aussi.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 03 : deux parenthèses ───────────────────────────────────────────────

    def ecran_double(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-double")
        self.titre_ecran("3. Deux parenthèses")
        self.au_mot("x plus 2, fois")
        self.play(Write(self.t("(x + 2)(x + 3)", 56, BLEU_CALCUL).move_to([2.6, 2.0, 0])))
        self.au_mot("Le rectangle a pour côtés")
        cases, etiq = self.grille([("x", 2.4), ("3", 1.1)], [("x", 2.4), ("2", 0.8)], coin=(-5.2, 1.7))
        self.montrer_grille(cases, etiq)
        for mot, (i, j), txt, c in [("x fois x : x au carré", (0, 0), "x²", BLEU_CALCUL),
                                    ("x fois 3", (0, 1), "3x", VERT_OK),
                                    ("2 fois x", (1, 0), "2x", VERT_OK),
                                    ("2 fois 3", (1, 1), "6", ORANGE_RETENUE)]:
            self.au_mot(mot)
            self.play(FadeIn(self.remplir(cases[i][j], txt, c)), run_time=0.6)
        self.au_mot("Quatre produits")
        self.play(Write(self.t("= x² + 3x + 2x + 6", 48, VERT_OK).move_to([2.6, 1.0, 0])))
        self.au_mot("chaque terme de la première")
        self.play(FadeIn(VGroup(self.t("chaque terme rencontre", 30, ORANGE_RETENUE),
                                self.t("chaque terme : 4 produits", 30, ORANGE_RETENUE)
                                ).arrange(DOWN, buff=0.12).move_to([2.6, -0.2, 0])))
        self.attendre_voix()

    # ── 04 : réduire ────────────────────────────────────────────────────────

    def ecran_reduire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-reduire")
        self.titre_ecran("4. Puis réduire")
        morceaux = VGroup(self.t("x²", 60), self.t("+ 3x", 60), self.t("+ 2x", 60), self.t("+ 6", 60)
                          ).arrange(RIGHT, buff=0.3).move_to([-0.6, 1.9, 0])
        self.play(Write(morceaux))
        self.au_mot("Les deux termes en x")
        self.play(morceaux[1].animate.set_color(VERT_OK), morceaux[2].animate.set_color(VERT_OK))
        self.play(FadeIn(self.t("3x + 2x = 5x", 44, VERT_OK).move_to([-0.6, 0.85, 0])))
        self.au_mot("Résultat")
        r = self.t("= x² + 5x + 6", 70, VERT_OK).move_to([-0.6, -0.2, 0])
        self.play(GrowFromCenter(r))
        self.au_mot("Vérifions")
        self.play(FadeIn(self.t("x = 1 :   (1 + 2)(1 + 3) = 3 × 4 = 12", 36).move_to([-0.6, -1.3, 0])))
        self.au_mot("Et 1 plus 5 plus 6")
        v = VGroup(self.t("1 + 5 + 6 = 12", 36), self.coche()).arrange(RIGHT, buff=0.3).move_to([-0.6, -2.0, 0])
        self.play(FadeIn(v))
        self.attendre_voix()

    # ── 05 : le carré ───────────────────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-carre")
        self.titre_ecran("5. Le carré d'une somme")
        self.play(Write(self.t("(x + 3)²", 64, BLEU_CALCUL).move_to([2.4, 2.1, 0])))
        self.au_mot("c'est x plus 3, fois")
        self.play(FadeIn(self.t("= (x + 3)(x + 3)", 44, BLEU_CALCUL).move_to([2.4, 1.25, 0])))
        self.au_mot("Le dessin est un carré")
        cases, etiq = self.grille([("x", 2.3), ("3", 1.1)], [("x", 2.3), ("3", 1.1)], coin=(-5.2, 1.8))
        self.montrer_grille(cases, etiq)
        self.au_mot("un carré x au carré")
        self.play(FadeIn(self.remplir(cases[0][0], "x²", BLEU_CALCUL)))
        self.au_mot("un petit carré de 9")
        self.play(FadeIn(self.remplir(cases[1][1], "9", BLEU_CALCUL)))
        self.au_mot("et deux rectangles")
        r1 = self.remplir(cases[0][1], "3x", ORANGE_RETENUE)
        r2 = self.remplir(cases[1][0], "3x", ORANGE_RETENUE)
        self.play(FadeIn(r1), FadeIn(r2))
        self.au_mot("Les voilà")
        self.play(Indicate(r1, color=ORANGE_RETENUE), Indicate(r2, color=ORANGE_RETENUE))
        self.au_mot("En tout")
        self.play(Write(self.t("= x² + 6x + 9", 56, VERT_OK).move_to([2.4, 0.2, 0])))
        faux = self.t("x² + 9", 40, ORANGE_RETENUE).move_to([2.4, -0.75, 0])
        self.play(FadeIn(faux), Create(self.barrer(faux)))
        self.au_mot("double produit")
        self.play(FadeIn(self.t("6x : le double produit", 34, ORANGE_RETENUE).move_to([2.4, -1.6, 0])))
        self.attendre_voix()

    # ── 06 : quand le milieu disparaît ──────────────────────────────────────

    def ecran_difference(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-difference")
        self.titre_ecran("6. Quand le milieu disparaît")
        self.au_mot("x moins 5, fois")
        self.play(Write(self.t("(x − 5)(x + 5)", 64, BLEU_CALCUL).move_to([-0.6, 1.9, 0])))
        self.au_mot("Quatre produits")
        m = VGroup(self.t("= x²", 54), self.t("+ 5x", 54, VERT_OK), self.t("− 5x", 54, VERT_OK), self.t("− 25", 54)
                   ).arrange(RIGHT, buff=0.3).move_to([-0.6, 0.7, 0])
        self.play(Write(m))
        self.au_mot("s'annulent")
        self.play(Create(self.barrer(m[1])), Create(self.barrer(m[2])))
        self.au_mot("Il reste")
        self.play(GrowFromCenter(self.t("= x² − 25", 76, VERT_OK).move_to([-0.6, -0.6, 0])))
        self.au_mot("presque jumelles")
        self.play(Write(self.chute("Parenthèses presque jumelles : le milieu disparaît.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Calcule 21 fois 19")
        self.play(GrowFromCenter(self.t("21 × 19 = ?", 96, BLEU_CALCUL).move_to([-0.6, 1.5, 0])))
        self.au_mot("de tête")
        self.play(FadeIn(self.t("de tête, sans poser l'opération", 36).move_to([-0.6, 0.4, 0])))
        self.au_mot("Indice")
        self.play(FadeIn(self.t("Indice :  21 = 20 + 1.   Et 19 ?", 40, ORANGE_RETENUE).move_to([-0.6, -0.6, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        self.au_mot("21 fois 19, c'est")
        self.play(Write(self.t("21 × 19 = (20 + 1)(20 − 1)", 50, BLEU_CALCUL).move_to([-0.6, 1.9, 0])))
        self.au_mot("Le milieu disparaît")
        self.play(FadeIn(self.t("= 20² − 1²", 56).move_to([-0.6, 0.8, 0])))
        self.au_mot("400 moins 1")
        r = self.t("= 400 − 1 = 399", 72, VERT_OK).move_to([-0.6, -0.4, 0])
        self.play(GrowFromCenter(r))
        self.au_mot("Développer, ça sert aussi")
        self.play(Write(self.chute("Développer sert aussi à calculer de tête.", color=VERT_OK)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_simple()
        self.ecran_signe()
        self.ecran_double()
        self.ecran_reduire()
        self.ecran_carre()
        self.ecran_difference()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Le nombre multiplie chaque terme, avec son signe",
                "Deux parenthèses : 4 produits, puis on réduit",
                "(x + 3)² = x² + 6x + 9",
            ],
            rappel="Piège : (x + 3)² n'est pas x² + 9 : il manque 6x.",
            voix="08-finale",
        )
        self.page_abonnement(voix="09-abonne")
