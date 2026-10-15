# trigo_cosinus.py
# EleveAI — Maths 4e — Le cosinus d'un angle aigu (notionId : trigo_cosinus), AVEC VOIX.
# Mêmes nombres que la fiche lib/fiches/maths-4e-cosinus.tsx : le triangle
# 6-8-10 (cos ≈ 0,8, angle ≈ 37°), l'échelle 5 / 10 → 60°, la route de 12°
# sur 800 m → 818 m.
#
# ⭐ 11/10/2026 : voix validée par Frédéric (« go ») :
# manim/voix/4e-trigo-cosinus.json (débit −7).
#
# ⭐ LE DESSIN QUI PORTE TOUT : le même triangle, A en bas à gauche, où le côté
# ADJACENT change de place quand l'angle étudié passe de B à C (écran 02).
#
# Mapping micro-compétences (coach 4e, notion trigo_cosinus) → écrans :
# - cos_cotes             → 01-cotes, 02-adjacent-bouge
# - cos_definition        → 03-definition, 04-entre-0-et-1
# - cos_calculer_longueur → 05-longueur, 07-diviser
# - cos_calculer_angle    → 06-angle
# - cos_probleme          → 07-diviser (la route)
# - cos_defi              → 08-defi + correction (angle en C, 60°, BC = 12)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/trigo_cosinus.py TrigoCosinus4e -o eleveai-maths-4e-trigo-cosinus --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from gabarit_trigo import COUL_ADJ, COUL_HYP, COUL_OPP, TriangleRect

OBJECTIFS = [
    "Repérer le côté adjacent à un angle",
    "Calculer un cosinus",
    "Trouver une longueur ou un angle avec le cosinus",
]

XD = 2.7  # la colonne de droite, celle des calculs


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class TrigoCosinus4e(TriangleRect, Notion4e):
    nom_voix = "4e-trigo-cosinus"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, texte, y, font_size=36, color=WHITE, x=XD):
        return self.t(texte, font_size, color).move_to([x, y, 0])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Le cosinus", 58, JAUNE_TITRE).to_edge(UP, buff=0.5)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.2)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))

        self.au_mot("Une échelle de 10 mètres")
        tri = self.triangle(centre=(-3.6, -1.0), l=1.75, h=3.03, lettres=False)
        mur = Line(tri.A + DOWN * 0.05, tri.A + UP * 3.4, color=GRAY_B, stroke_width=10)
        sol = Line(tri.A + LEFT * 0.6, tri.B + RIGHT * 1.0, color=GRAY_B, stroke_width=6)
        echelle = self.cote(tri, "BC", COUL_HYP, 10)
        self.play(Create(mur), Create(sol), Create(echelle))
        self.play(FadeIn(self.etiquette(tri, "BC", "10 m", COUL_HYP, 34)))
        self.au_mot("Son pied est à 5 mètres")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ, 8)),
                  FadeIn(self.etiquette(tri, "AB", "5 m", COUL_ADJ, 34)))
        self.au_mot("Quel angle fait-elle")
        self.play(Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "?", font_size=36)))
        self.play(FadeIn(self.ligne("Quel angle avec le sol ?", 0.9, 40, BLEU_CALCUL, x=2.4)))
        self.au_mot("Pas besoin de rapporteur")
        self.play(FadeIn(self.ligne("sans rapporteur", -0.1, 34, GRAY_B, x=2.4)))
        self.au_mot("Ce nombre, c'est le cosinus")
        self.play(Write(self.ligne("→ le cosinus", -1.1, 46, JAUNE_TITRE, x=2.4)))
        self.attendre_voix()

    # ── 01 : les côtés ──────────────────────────────────────────────────────

    def ecran_cotes(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-cotes")
        self.titre_ecran("1. Les trois côtés")
        tri = self.triangle()
        self.play(Create(tri))
        self.au_mot("ABC est rectangle en A")
        self.play(FadeIn(self.ligne("ABC rectangle en A", 2.0, 34)))
        self.au_mot("L'hypoténuse")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "hypoténuse", COUL_HYP)))
        self.play(FadeIn(self.ligne("hypoténuse = BC", 1.0, 36, COUL_HYP)))
        self.au_mot("C'est le plus long")
        self.play(FadeIn(self.ligne("(le plus long)", 0.4, 28, COUL_HYP)))
        self.au_mot("l'angle en B")
        self.play(Create(self.arc(tri, "B")))
        self.au_mot("Le côté adjacent")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "adjacent", COUL_ADJ)))
        self.play(FadeIn(self.ligne("adjacent à B = AB", -0.5, 36, COUL_ADJ)))
        self.au_mot("le côté opposé")
        self.play(Create(self.cote(tri, "AC", COUL_OPP)), FadeIn(self.etiquette(tri, "AC", "opposé", COUL_OPP)))
        self.play(FadeIn(self.ligne("opposé à B = AC", -1.4, 36, COUL_OPP)))
        self.attendre_voix()

    # ── 02 : l'adjacent change de place ─────────────────────────────────────

    def ecran_adjacent_bouge(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-adjacent-bouge")
        self.titre_ecran("2. Le piège : l'adjacent bouge")
        g = self.triangle(centre=(-4.2, -0.2), l=3.2, h=2.4)
        d = self.triangle(centre=(1.4, -0.2), l=3.2, h=2.4)
        self.play(Create(g), Create(d))
        self.play(Create(self.arc(g, "B")), FadeIn(self.t("angle en B", 30, JAUNE_TITRE).move_to([-4.2, 2.1, 0])),
                  Create(self.cote(g, "AB", COUL_ADJ)), FadeIn(self.etiquette(g, "AB", "adjacent", COUL_ADJ, 26)))
        self.au_mot("l'angle en C")
        self.play(Create(self.arc(d, "C")), FadeIn(self.t("angle en C", 30, JAUNE_TITRE).move_to([1.4, 2.1, 0])))
        self.au_mot("L'hypoténuse ne bouge pas")
        self.play(Create(self.cote(g, "BC", COUL_HYP)), Create(self.cote(d, "BC", COUL_HYP)))
        self.au_mot("c'est maintenant AC")
        self.play(Create(self.cote(d, "AC", COUL_ADJ)), FadeIn(self.etiquette(d, "AC", "adjacent", COUL_ADJ, 26)))
        self.play(FadeIn(self.t("adjacent = AB", 30, COUL_ADJ).move_to([-4.2, -2.3, 0])),
                  FadeIn(self.t("adjacent = AC", 30, COUL_ADJ).move_to([1.4, -2.3, 0])))
        self.au_mot("c'est une place")
        self.play(Write(self.chute("Adjacent : le côté qui TOUCHE l'angle étudié.", color=JAUNE_TITRE)))
        self.au_mot("jamais de l'angle droit")
        croix = self.t("✗ angle droit", 30, ROUGE_ERREUR).move_to([5.0, 1.0, 0])
        self.play(FadeIn(croix))
        self.attendre_voix()

    # ── 03 : la définition ──────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-definition")
        self.titre_ecran("3. Le cosinus")
        tri = self.triangle()
        self.play(Create(tri), Create(self.arc(tri, "B")))
        self.play(Write(self.ligne("cos B = adjacent ÷ hypoténuse", 2.0, 34, JAUNE_TITRE, x=2.3)))
        self.au_mot("AB égale 8")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "8", COUL_ADJ, 34)))
        self.au_mot("BC égale 10")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "10", COUL_HYP, 34)))
        self.au_mot("Cosinus de B égale 8 divisé par 10")
        self.play(FadeIn(self.ligne("cos B = 8 ÷ 10", 0.8, 44)))
        self.au_mot("0 virgule 8. L'adjacent")
        self.play(Write(self.ligne("cos B = 0,8", -0.2, 50, VERT_OK)))
        self.au_mot("L'adjacent occupe")
        barre_h = Rectangle(width=5.0, height=0.45, color=COUL_HYP, stroke_width=3).move_to([XD, -1.2, 0])
        barre_a = Rectangle(width=4.0, height=0.45, color=COUL_ADJ, fill_color=COUL_ADJ, fill_opacity=0.7,
                            stroke_width=0).align_to(barre_h, LEFT).move_to([XD - 0.5, -1.2, 0])
        self.play(Create(barre_h))
        self.play(GrowFromEdge(barre_a, LEFT))
        self.play(FadeIn(self.t("8 sur 10", 26, COUL_ADJ).next_to(barre_a, DOWN, buff=0.12)))
        self.au_mot("sans unité")
        self.play(Write(self.chute("Un cosinus est un nombre, sans unité.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 04 : entre 0 et 1 ───────────────────────────────────────────────────

    def ecran_entre_0_et_1(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-entre-0-et-1")
        self.titre_ecran("4. Toujours entre 0 et 1")
        self.play(FadeIn(self.ligne("adjacent < hypoténuse", 2.0, 40, BLEU_CALCUL, x=-0.6)))
        self.au_mot("toujours entre 0 et 1")
        axe = NumberLine(x_range=[0, 1.4, 0.2], length=9, include_numbers=False, color=WHITE).move_to([-0.6, 0.7, 0])
        nums = VGroup(*[self.t(s, 28).next_to(axe.n2p(v), DOWN, buff=0.2)
                        for v, s in [(0, "0"), (1, "1")]])
        zone = Line(axe.n2p(0), axe.n2p(1), color=VERT_OK, stroke_width=12)
        self.play(Create(axe), FadeIn(nums))
        self.play(Create(zone))
        self.au_mot("1 virgule 25")
        p = Dot(axe.n2p(1.25), color=ROUGE_ERREUR, radius=0.12)
        lab = self.t("1,25", 30, ROUGE_ERREUR).next_to(p, UP, buff=0.2)
        self.play(FadeIn(p), FadeIn(lab))
        self.au_mot("Il s'est trompé")
        self.play(FadeIn(self.t("✗ impossible", 30, ROUGE_ERREUR).next_to(p, DOWN, buff=0.45)))
        self.au_mot("il a divisé l'hypoténuse")
        self.play(FadeIn(self.ligne("10 ÷ 8 au lieu de 8 ÷ 10", -0.6, 34, ORANGE_RETENUE, x=-0.6)))
        self.au_mot("quand l'angle s'ouvre")
        self.play(FadeIn(self.ligne("l'angle grandit → le cosinus diminue", -1.4, 34, JAUNE_TITRE, x=-0.6)))
        self.au_mot("0 virgule 8 pour 37 degrés")
        a = Dot(axe.n2p(0.8), color=BLEU_CALCUL, radius=0.1)
        self.play(FadeIn(a), FadeIn(self.t("37°", 28, BLEU_CALCUL).next_to(a, UP, buff=0.2)))
        self.au_mot("0 virgule 5 pour 60 degrés")
        b = Dot(axe.n2p(0.5), color=BLEU_CALCUL, radius=0.1)
        self.play(FadeIn(b), FadeIn(self.t("60°", 28, BLEU_CALCUL).next_to(b, UP, buff=0.2)))
        self.attendre_voix()

    # ── 05 : une longueur ───────────────────────────────────────────────────

    def ecran_longueur(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-longueur")
        self.titre_ecran("5. Calculer une longueur")
        tri = self.triangle()
        self.play(Create(tri))
        self.au_mot("L'angle en B mesure 37 degrés")
        self.play(Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "37°")))
        self.au_mot("l'hypoténuse BC mesure 10")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "10 cm", COUL_HYP)))
        self.au_mot("Combien mesure AB")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "AB = ?", COUL_ADJ)))
        self.au_mot("c'est l'adjacent")
        self.play(FadeIn(self.ligne("AB : adjacent à B", 2.0, 32, COUL_ADJ)))
        self.au_mot("J'écris")
        self.play(FadeIn(self.ligne("cos 37° = AB ÷ 10", 1.1, 40)))
        self.au_mot("La calculatrice donne")
        self.play(FadeIn(self.ligne("cos 37° ≈ 0,8", 0.2, 40, BLEU_CALCUL)))
        self.au_mot("Donc AB égale 10 fois")
        self.play(Write(self.ligne("AB ≈ 10 × 0,8 = 8 cm", -0.7, 42, VERT_OK)))
        self.au_mot("Contrôle")
        self.play(FadeIn(VGroup(self.coche(), self.t("8 < 10", 34, VERT_OK)).arrange(RIGHT, buff=0.25)
                         .move_to([XD - 0.5, -1.6, 0])))
        self.attendre_voix()

    # ── 06 : un angle ───────────────────────────────────────────────────────

    def ecran_angle(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-angle")
        self.titre_ecran("6. Calculer un angle : l'échelle")
        tri = self.triangle(centre=(-4.0, -0.5), l=1.75, h=3.03)
        self.play(Create(tri), Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "?", font_size=34)))
        self.au_mot("Le pied est à 5 mètres")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "5 m", COUL_ADJ)))
        self.au_mot("L'échelle mesure 10 mètres")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "10 m", COUL_HYP)))
        self.au_mot("Cosinus de B égale 5 divisé par 10")
        self.play(FadeIn(self.ligne("cos B = 5 ÷ 10 = 0,5", 1.9, 40, x=2.2)))
        self.au_mot("la touche cosinus moins 1")
        touche = self.t("cos⁻¹", 46, JAUNE_TITRE)
        cadre = SurroundingRectangle(touche, color=JAUNE_TITRE, buff=0.18, corner_radius=0.12)
        self.play(FadeIn(VGroup(touche, cadre).move_to([0.6, 0.8, 0])))
        self.play(FadeIn(self.t("mode degrés", 28, GRAY_B).move_to([3.0, 0.8, 0])))
        self.au_mot("Cosinus moins 1 de 0 virgule 5")
        self.play(Write(self.ligne("cos⁻¹(0,5) = 60°", -0.3, 46, VERT_OK, x=2.2)))
        self.au_mot("L'échelle fait un angle de 60 degrés")
        self.play(Write(self.chute("L'échelle fait 60° avec le sol.", color=VERT_OK, font_size=34)))
        self.attendre_voix()

    # ── 07 : diviser, la route ──────────────────────────────────────────────

    def ecran_diviser(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-diviser")
        self.titre_ecran("7. Chercher l'hypoténuse")
        tri = self.triangle(centre=(-3.5, 1.1), l=5.0, h=1.06)
        self.play(Create(tri))
        self.au_mot("un angle de 12 degrés")
        self.play(Create(self.arc(tri, "B", r=1.2)),
                  FadeIn(self.t("12°", 24, JAUNE_TITRE).move_to(tri.B + LEFT * 2.1 + UP * 0.2)))
        self.au_mot("la distance horizontale mesure 800")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "carte : 800 m", COUL_ADJ, 28)))
        self.au_mot("Quelle distance parcourt-on")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "route = ?", COUL_HYP, 28)))
        self.au_mot("Cosinus de 12 degrés égale 800")
        self.play(FadeIn(self.ligne("cos 12° = 800 ÷ route", -0.6, 38, x=-0.6)))
        self.au_mot("Donc la route égale 800 divisé")
        self.play(FadeIn(self.ligne("route = 800 ÷ cos 12°", -1.35, 38, x=-0.6)))
        self.au_mot("800 divisé par 0 virgule 978")
        self.play(Write(self.ligne("= 800 ÷ 0,978 ≈ 818 m", -2.1, 40, VERT_OK, x=-0.6)))
        self.au_mot("18 mètres de plus")
        self.play(FadeIn(self.t("+ 18 m", 32, VERT_OK).move_to([4.6, -2.1, 0])))
        self.au_mot("Retiens")
        regle = VGroup(self.t("hypoténuse connue → × cos", 30, COUL_HYP),
                       self.t("adjacent connu → ÷ cos", 30, COUL_ADJ)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        regle.move_to([3.5, 0.2, 0])
        self.play(FadeIn(regle[0]))
        self.au_mot("on connaît l'adjacent")
        self.play(FadeIn(regle[1]))
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tri = self.triangle(centre=(-2.7, -0.3), l=4.0, h=2.31)
        self.au_mot("ABC est rectangle en A")
        self.play(Create(tri))
        self.au_mot("L'angle en C mesure 60 degrés")
        self.play(Create(self.arc(tri, "C")), FadeIn(self.mesure(tri, "C", "60°")))
        self.au_mot("l'hypoténuse BC mesure 12")
        self.play(FadeIn(self.etiquette(tri, "BC", "12 cm", COUL_HYP)))
        self.au_mot("Combien mesure AC")
        self.play(FadeIn(self.etiquette(tri, "AC", "?", WHITE)),
                  Write(self.ligne("AC = ?", 1.0, 52, BLEU_CALCUL, x=3.4)))
        self.au_mot("Attention à l'angle")
        self.play(FadeIn(self.ligne("Attention à l'angle !", 0.0, 36, ORANGE_RETENUE, x=3.4)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        tri = self.triangle(centre=(-2.7, -0.3), l=4.0, h=2.31)
        self.play(Create(tri), Create(self.arc(tri, "C")), FadeIn(self.mesure(tri, "C", "60°")),
                  FadeIn(self.etiquette(tri, "BC", "12 cm", COUL_HYP)))
        self.au_mot("c'est AC")
        self.play(Create(self.cote(tri, "AC", COUL_ADJ)), FadeIn(self.etiquette(tri, "AC", "adjacent", COUL_ADJ, 26)))
        self.au_mot("Cosinus de 60 degrés égale AC")
        self.play(FadeIn(self.ligne("cos 60° = AC ÷ 12", 1.9, 40)))
        self.au_mot("Cosinus de 60 degrés vaut")
        self.play(FadeIn(self.ligne("cos 60° = 0,5", 1.0, 40, BLEU_CALCUL)))
        self.au_mot("Donc AC égale 12 fois")
        self.play(Write(self.ligne("AC = 12 × 0,5 = 6 cm", 0.1, 44, VERT_OK)))
        self.au_mot("Contrôle")
        self.play(FadeIn(VGroup(self.coche(), self.t("6 < 12", 34, VERT_OK)).arrange(RIGHT, buff=0.25)
                         .move_to([XD - 0.5, -0.8, 0])))
        self.au_mot("Le piège")
        self.play(Write(self.chute("Piège : AB est l'adjacent de B, pas de C.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_cotes()
        self.ecran_adjacent_bouge()
        self.ecran_definition()
        self.ecran_entre_0_et_1()
        self.ecran_longueur()
        self.ecran_angle()
        self.ecran_diviser()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "L'adjacent touche l'angle, et change avec lui",
                "cos = adjacent ÷ hypoténuse, entre 0 et 1",
                "Pour un angle : la touche cos⁻¹",
            ],
            rappel="Piège : un cosinus plus grand que 1, c'est un quotient à l'envers.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
