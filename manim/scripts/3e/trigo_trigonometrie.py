# trigo_trigonometrie.py
# EleveAI — Maths 3e — Trigonométrie : sinus, cosinus, tangente
# (notionId : trigo_trigonometrie), AVEC VOIX.
# Mêmes nombres que la fiche lib/fiches/maths-3e-trigonometrie.tsx : sin 30° = 0,5,
# tan 45° = 1, l'hypoténuse 10 ; plus l'arbre de l'accroche (50 m, 40° → ≈ 42 m),
# le 3-4 → tan⁻¹(0,75) ≈ 37° et le défi cos 60° = 4 ÷ BC → 8 cm.
#
# ⭐ 11/10/2026 : voix validée par Frédéric (« go ») :
# manim/voix/3e-trigo-trigonometrie.json (débit −6).
#
# ⭐ LE FIL : en 4e, un seul rapport ; en 3e, trois — et la vraie question est
# de CHOISIR. L'écran 04 (le tableau « ce que l'on a → on utilise ») porte tout.
#
# Mapping micro-compétences (coach 3e, notion trigo_trigonometrie) → écrans :
# - trigo_triangle_rectangle            → 01-cotes
# - trigo_cosinus, trigo_sinus, trigo_tangente → 02-trois-rapports, 03-bornes
# - trigo_choisir_rapport               → 04-choisir
# - trigo_calculer_longueur             → 05-longueur, 07-arbre
# - trigo_calculer_angle                → 06-angle
# - trigo_defi                          → 08-defi + correction
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/trigo_trigonometrie.py TrigoTrigonometrie3e -o eleveai-maths-3e-trigo-trigonometrie --media_dir manim/scripts/3e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from gabarit_trigo import COUL_ADJ, COUL_HYP, COUL_OPP, TriangleRect

OBJECTIFS = [
    "Nommer les trois côtés depuis un angle",
    "Connaître cosinus, sinus et tangente",
    "Choisir le bon rapport, puis calculer",
]

XD = 2.7  # la colonne de droite, celle des calculs
VERT_ARBRE = "#22C55E"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


class TrigoTrigonometrie3e(TriangleRect, Notion3e):
    nom_voix = "3e-trigo-trigonometrie"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, texte, y, font_size=36, color=WHITE, x=XD):
        return self.t(texte, font_size, color).move_to([x, y, 0])

    def rapport(self, nom, num, den, cn, cd, font_size=34):
        """« cos θ = adjacent / hypoténuse », la fraction écrite et colorée par rôle."""
        f = self.fraction(num, den, font_size=font_size, color=WHITE, color_num=cn, color_den=cd)
        return VGroup(self.t(f"{nom} =", font_size + 2, JAUNE_TITRE), f).arrange(RIGHT, buff=0.25)

    def trois_cotes(self, tri, taille=28):
        return VGroup(self.cote(tri, "BC", COUL_HYP), self.etiquette(tri, "BC", "hypoténuse", COUL_HYP, taille),
                      self.cote(tri, "AB", COUL_ADJ), self.etiquette(tri, "AB", "adjacent", COUL_ADJ, taille),
                      self.cote(tri, "AC", COUL_OPP), self.etiquette(tri, "AC", "opposé", COUL_OPP, taille))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("La trigonométrie", 56, JAUNE_TITRE).to_edge(UP, buff=0.45)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.2)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        tri = self.triangle(centre=(-3.0, -1.1), l=4.6, h=3.86, lettres=False)
        self.au_mot("Tu es à 50 mètres")
        sol = Line(tri.A + LEFT * 0.8, tri.B + RIGHT * 0.5, color=GRAY_B, stroke_width=6)
        oeil = Dot(tri.B, color=BLEU_CALCUL, radius=0.12)
        self.play(Create(sol), FadeIn(oeil), Create(self.cote(tri, "AB", COUL_ADJ)),
                  FadeIn(self.etiquette(tri, "AB", "50 m", COUL_ADJ, 32)))
        self.au_mot("tu vois son sommet")
        arbre = Line(tri.A, tri.C, color=VERT_ARBRE, stroke_width=14)
        feuillage = Circle(radius=0.55, color=VERT_ARBRE, fill_color=VERT_ARBRE, fill_opacity=0.6).move_to(tri.C)
        visee = DashedLine(tri.B, tri.C, color=WHITE, stroke_width=3)
        self.play(Create(arbre), FadeIn(feuillage), Create(visee))
        self.au_mot("sous un angle de 40 degrés")
        self.play(Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "40°")))
        self.au_mot("Combien mesure l'arbre")
        self.play(FadeIn(self.t("?", 48, VERT_ARBRE).next_to(arbre, LEFT, buff=0.3)),
                  FadeIn(self.ligne("Combien mesure l'arbre ?", 1.0, 38, BLEU_CALCUL, x=2.8)))
        self.au_mot("le cosinus de 4e ne suffit pas")
        self.play(FadeIn(self.ligne("le cosinus ne suffit pas", 0.0, 32, GRAY_B, x=2.8)))
        self.au_mot("la tangente")
        self.play(Write(self.ligne("→ la tangente", -1.0, 46, JAUNE_TITRE, x=2.8)))
        self.attendre_voix()

    # ── 01 : les côtés ──────────────────────────────────────────────────────

    def ecran_cotes(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-cotes")
        self.titre_ecran("1. Nommer les trois côtés")
        tri = self.triangle()
        self.play(Create(tri))
        self.au_mot("l'hypoténuse, en face")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "hypoténuse", COUL_HYP)))
        self.play(FadeIn(self.ligne("hypoténuse = BC", 2.0, 34, COUL_HYP)))
        self.au_mot("Elle ne change jamais")
        self.play(FadeIn(self.ligne("(ne change jamais)", 1.45, 26, COUL_HYP)))
        self.au_mot("l'angle en B")
        arc_b = self.arc(tri, "B")
        self.play(Create(arc_b))
        self.au_mot("c'est l'opposé : AC")
        opp = VGroup(self.cote(tri, "AC", COUL_OPP), self.etiquette(tri, "AC", "opposé", COUL_OPP))
        self.play(FadeIn(opp))
        self.play(FadeIn(self.ligne("depuis B : opposé = AC", 0.6, 32, COUL_OPP)))
        self.au_mot("c'est l'adjacent : AB")
        adj = VGroup(self.cote(tri, "AB", COUL_ADJ), self.etiquette(tri, "AB", "adjacent", COUL_ADJ))
        self.play(FadeIn(adj))
        self.play(FadeIn(self.ligne("adjacent = AB", 0.05, 32, COUL_ADJ, x=XD + 0.85)))
        self.au_mot("Si on se place en C")
        self.play(FadeOut(arc_b), Create(self.arc(tri, "C")))
        self.au_mot("ils échangent")
        self.play(FadeOut(opp), FadeOut(adj))
        self.play(Create(self.cote(tri, "AB", COUL_OPP)), FadeIn(self.etiquette(tri, "AB", "opposé", COUL_OPP)),
                  Create(self.cote(tri, "AC", COUL_ADJ)), FadeIn(self.etiquette(tri, "AC", "adjacent", COUL_ADJ)))
        self.play(FadeIn(self.ligne("depuis C : opposé = AB", -0.9, 32, COUL_OPP)),
                  FadeIn(self.ligne("adjacent = AC", -1.45, 32, COUL_ADJ, x=XD + 0.85)))
        self.attendre_voix()

    # ── 02 : les trois rapports ─────────────────────────────────────────────

    def ecran_trois_rapports(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-trois-rapports")
        self.titre_ecran("2. Trois rapports")
        tri = self.triangle(centre=(-3.6, -0.1), l=3.4, h=2.55)
        self.play(Create(tri), Create(self.arc(tri, "B")), FadeIn(self.trois_cotes(tri, 24)))
        lignes = []
        for mot, nom, num, den, cn, cd, y, cle in [
            ("Le cosinus, celui de 4e", "cos", "adjacent", "hypoténuse", COUL_ADJ, COUL_HYP, 1.75, "CAH"),
            ("Le sinus : opposé", "sin", "opposé", "hypoténuse", COUL_OPP, COUL_HYP, 0.1, "SOH"),
            ("La tangente : opposé", "tan", "opposé", "adjacent", COUL_OPP, COUL_ADJ, -1.55, "TOA"),
        ]:
            self.au_mot(mot)
            r = self.rapport(nom, num, den, cn, cd, 30).move_to([1.2, y, 0])
            self.play(FadeIn(r, shift=LEFT * 0.2))
            lignes.append((r, cle))
        self.au_mot("Pour les retenir")
        for (r, cle), mot in zip(lignes, ["C, A, H", "S, O, H", "T, O, A"]):
            self.au_mot(mot)
            c = self.t(cle, 50, JAUNE_TITRE).next_to(r, RIGHT, buff=0.7)
            self.play(Write(c))
        self.attendre_voix()

    # ── 03 : sous 1, ou pas ─────────────────────────────────────────────────

    def ecran_bornes(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-bornes")
        self.titre_ecran("3. Qui peut dépasser 1 ?")
        self.au_mot("Le cosinus et le sinus")
        self.play(FadeIn(self.ligne("cos et sin : ÷ hypoténuse, le plus long côté", 2.0, 32, x=-0.6)))
        self.au_mot("ils restent toujours entre 0 et 1")
        self.play(Write(self.ligne("toujours entre 0 et 1", 1.3, 40, VERT_OK, x=-0.6)))
        self.au_mot("La tangente, elle")
        self.play(FadeIn(self.ligne("tan : pas d'hypoténuse", 0.4, 34, x=-3.6)))
        self.au_mot("elle peut dépasser 1")
        self.play(Write(self.ligne("peut dépasser 1", -0.3, 38, ORANGE_RETENUE, x=-3.6)))
        self.au_mot("Quand l'opposé et l'adjacent sont égaux")
        tri = self.triangle(centre=(2.6, -1.1), l=2.4, h=2.4)
        self.play(Create(tri), Create(self.cote(tri, "AB", COUL_ADJ)), Create(self.cote(tri, "AC", COUL_OPP)),
                  FadeIn(self.etiquette(tri, "AB", "3", COUL_ADJ)), FadeIn(self.etiquette(tri, "AC", "3", COUL_OPP)))
        self.au_mot("la tangente vaut exactement 1")
        self.play(FadeIn(self.ligne("tan = 3 ÷ 3 = 1", -1.3, 36, x=-3.6)))
        self.au_mot("l'angle mesure 45 degrés")
        self.play(Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "45°")),
                  Write(self.ligne("tan 45° = 1", -2.1, 40, VERT_OK, x=-3.6)))
        self.attendre_voix()

    # ── 04 : choisir ────────────────────────────────────────────────────────

    def ecran_choisir(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-choisir")
        self.titre_ecran("4. Lequel choisir ?")
        self.au_mot("On ne choisit pas")
        self.play(FadeIn(self.ligne("On ne choisit pas : on LIT les données.", 2.05, 34, BLEU_CALCUL, x=-0.6)))
        self.au_mot("On entoure les deux côtés")
        self.play(FadeIn(self.ligne("les 2 côtés en jeu : le connu + le cherché", 1.35, 30, GRAY_B, x=-0.6)))
        y = 0.5
        for mot, gauche, droite, cg in [
            ("Adjacent et hypoténuse", "adjacent + hypoténuse", "cosinus", COUL_ADJ),
            ("Opposé et hypoténuse", "opposé + hypoténuse", "sinus", COUL_OPP),
            ("Opposé et adjacent", "opposé + adjacent", "tangente", COUL_OPP),
            ("aucun angle", "aucun angle", "Pythagore", GRAY_B),
        ]:
            self.au_mot(mot)
            g = self.t(gauche, 32, cg).move_to([-3.0, y, 0])
            fl = self.t("→", 34).move_to([0.0, y, 0])
            d = self.t(droite, 36, JAUNE_TITRE if droite != "Pythagore" else ORANGE_RETENUE).move_to([2.2, y, 0])
            self.play(FadeIn(g), FadeIn(fl), FadeIn(d))
            y -= 0.75
        self.attendre_voix()

    # ── 05 : une longueur ───────────────────────────────────────────────────

    def ecran_longueur(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-longueur")
        self.titre_ecran("5. Calculer une longueur")
        tri = self.triangle(l=4.4, h=2.54)
        self.play(Create(tri))
        self.au_mot("L'angle en B mesure 30 degrés")
        self.play(Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "30°")))
        self.au_mot("l'hypoténuse BC mesure 10")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "10 cm", COUL_HYP)))
        self.au_mot("On cherche AC")
        self.play(Create(self.cote(tri, "AC", COUL_OPP)), FadeIn(self.etiquette(tri, "AC", "AC = ?", COUL_OPP)))
        self.au_mot("c'est l'opposé")
        self.play(FadeIn(self.ligne("opposé + hypoténuse → sinus", 2.0, 30, COUL_OPP)))
        self.au_mot("Sinus de 30 degrés égale AC")
        self.play(FadeIn(self.ligne("sin 30° = AC ÷ 10", 1.1, 40)))
        self.au_mot("Donc AC égale 10 fois")
        self.play(FadeIn(self.ligne("AC = 10 × sin 30°", 0.2, 40)))
        self.au_mot("10 fois 0 virgule 5")
        self.play(Write(self.ligne("AC = 10 × 0,5 = 5 cm", -0.7, 42, VERT_OK)))
        self.attendre_voix()

    # ── 06 : un angle ───────────────────────────────────────────────────────

    def ecran_angle(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-angle")
        self.titre_ecran("6. Calculer un angle")
        tri = self.triangle()
        self.play(Create(tri), Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "?", font_size=34)))
        self.au_mot("En face de B, AC mesure 3")
        self.play(Create(self.cote(tri, "AC", COUL_OPP)), FadeIn(self.etiquette(tri, "AC", "3 cm", COUL_OPP)))
        self.au_mot("Contre B, AB mesure 4")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "4 cm", COUL_ADJ)))
        self.au_mot("Opposé et adjacent : tangente")
        self.play(FadeIn(self.ligne("opposé + adjacent → tangente", 2.0, 30, JAUNE_TITRE)))
        self.au_mot("Tangente de B égale 3 divisé par 4")
        self.play(FadeIn(self.ligne("tan B = 3 ÷ 4 = 0,75", 1.1, 40)))
        self.au_mot("Touche tangente moins 1")
        self.play(FadeIn(self.ligne("tan⁻¹  (mode degrés)", 0.3, 32, BLEU_CALCUL)))
        self.au_mot("environ 37 degrés")
        self.play(Write(self.ligne("B ≈ 37°", -0.55, 50, VERT_OK)))
        self.au_mot("Contrôle gratuit")
        self.play(FadeIn(self.ligne("l'autre : 90° − 37° = 53°", -1.45, 34, VERT_OK)))
        self.attendre_voix()

    # ── 07 : l'arbre ────────────────────────────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-arbre")
        self.titre_ecran("7. La hauteur de l'arbre")
        tri = self.triangle(centre=(-2.9, -0.6), l=4.0, h=3.36, lettres=False)
        sol = Line(tri.A + LEFT * 0.6, tri.B + RIGHT * 0.4, color=GRAY_B, stroke_width=6)
        visee = DashedLine(tri.B, tri.C, color=WHITE, stroke_width=3)
        self.play(Create(sol), Create(visee), Create(self.arc(tri, "B")), FadeIn(self.mesure(tri, "B", "40°")),
                  FadeIn(Line(tri.A, tri.C, color=VERT_ARBRE, stroke_width=6)))
        self.au_mot("Les 50 mètres au sol")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "50 m : adjacent", COUL_ADJ, 26)))
        self.au_mot("La hauteur de l'arbre")
        self.play(Create(self.cote(tri, "AC", COUL_OPP, 14)), FadeIn(self.etiquette(tri, "AC", "h ?", COUL_OPP)))
        self.play(FadeIn(self.t("opposé", 26, COUL_OPP).next_to(Line(tri.A, tri.C), LEFT, buff=0.25).shift(DOWN * 0.5)))
        self.au_mot("Opposé et adjacent : tangente")
        self.play(FadeIn(self.ligne("opposé + adjacent → tangente", 2.0, 30, JAUNE_TITRE)))
        self.au_mot("Tangente de 40 degrés égale")
        self.play(FadeIn(self.ligne("tan 40° = h ÷ 50", 1.1, 40)))
        self.au_mot("Donc la hauteur égale 50 fois")
        self.play(FadeIn(self.ligne("h = 50 × tan 40°", 0.2, 40)))
        self.au_mot("La calculatrice donne")
        self.play(FadeIn(self.ligne("tan 40° ≈ 0,84", -0.6, 36, BLEU_CALCUL)))
        self.au_mot("50 fois 0 virgule 84")
        self.play(Write(self.ligne("h ≈ 50 × 0,84 ≈ 42 m", -1.45, 42, VERT_OK)))
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tri = self.triangle(centre=(-3.8, -0.1), l=2.0, h=3.46)
        self.au_mot("ABC est rectangle en A")
        self.play(Create(tri))
        self.au_mot("L'angle en B mesure 60 degrés")
        self.play(Create(self.arc(tri, "B", r=0.5)), FadeIn(self.mesure(tri, "B", "60°", font_size=26)))
        self.au_mot("AB mesure 4")
        self.play(FadeIn(self.etiquette(tri, "AB", "4 cm", WHITE)))
        self.au_mot("Combien mesure l'hypoténuse BC")
        self.play(FadeIn(self.etiquette(tri, "BC", "BC = ?", WHITE)),
                  Write(self.ligne("BC = ?", 1.0, 52, BLEU_CALCUL, x=2.0)))
        self.au_mot("choisis le rapport")
        self.play(FadeIn(self.ligne("D'abord : quel rapport ?", 0.0, 36, ORANGE_RETENUE, x=2.0)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        tri = self.triangle(centre=(-4.0, -0.1), l=2.0, h=3.46)
        self.play(Create(tri), Create(self.arc(tri, "B", r=0.5)), FadeIn(self.mesure(tri, "B", "60°", font_size=26)))
        self.au_mot("AB touche l'angle")
        self.play(Create(self.cote(tri, "AB", COUL_ADJ)), FadeIn(self.etiquette(tri, "AB", "4 cm", COUL_ADJ)))
        self.au_mot("BC est l'hypoténuse")
        self.play(Create(self.cote(tri, "BC", COUL_HYP)), FadeIn(self.etiquette(tri, "BC", "BC", COUL_HYP)))
        self.au_mot("Adjacent et hypoténuse : cosinus")
        self.play(FadeIn(self.ligne("adjacent + hypoténuse → cosinus", 2.0, 30, JAUNE_TITRE, x=2.0)))
        self.au_mot("Cosinus de 60 degrés égale 4")
        self.play(FadeIn(self.ligne("cos 60° = 4 ÷ BC", 1.1, 40, x=2.0)))
        self.au_mot("Cosinus de 60 degrés vaut")
        self.play(FadeIn(self.ligne("cos 60° = 0,5", 0.3, 38, BLEU_CALCUL, x=2.0)))
        self.au_mot("Donc BC égale 4 divisé")
        self.play(Write(self.ligne("BC = 4 ÷ 0,5 = 8 cm", -0.55, 44, VERT_OK, x=2.0)))
        self.au_mot("Contrôle")
        self.play(FadeIn(VGroup(self.coche(), self.t("8 > 4 : l'hypoténuse est la plus longue", 28, VERT_OK))
                         .arrange(RIGHT, buff=0.25).move_to([1.6, -1.45, 0])))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_cotes()
        self.ecran_trois_rapports()
        self.ecran_bornes()
        self.ecran_choisir()
        self.ecran_longueur()
        self.ecran_angle()
        self.ecran_arbre()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "L'hypoténuse ne change pas ; opposé et adjacent, si",
                "CAH  SOH  TOA",
                "Le rapport se lit sur les deux côtés en jeu",
            ],
            rappel="Piège : sortir le cosinus par habitude quand c'est l'opposé qui est donné.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
