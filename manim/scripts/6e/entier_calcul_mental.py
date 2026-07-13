# entier_calcul_mental.py
# EleveAI — Maths 6e — Le calcul mental (notionId : entier_calcul_mental)
# Mêmes exemples que la fiche lib/fiches/maths-6e-calcul-mental.tsx.
#
# Mapping micro-compétences (banque calcul-mental.bank.ts) → écrans :
# - entier_addition_mentale       → écran 1 (droite graduée, 47 + 8 en 2 sauts)
# - entier_soustraction_mentale   → écran 2 (arrondir puis corriger, 121 - 38)
# - entier_multiplication_mentale → écran 3 (18 × 5 = moitié de 18 × 10)
# - entier_division_mentale       → écran 4 (56 ÷ 8 : 8 rangées de 7 objets)
# - entier_strategie_mentale      → écran 5 (double, moitié, × 10 / ÷ 10)
# - entier_calcul_mental_defi     → défi (boulangerie) + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/entier_calcul_mental.py EntierCalculMental6e -o eleveai-maths-6e-entier-calcul-mental --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class EntierCalculMental6e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def droite(self, xmin, xmax, marks, y=-1.4, width=11.5):
        """Droite graduée : une ligne + des repères étiquetés. Renvoie (groupe, x2p)."""
        ligne = Line([-width / 2, y, 0], [width / 2, y, 0], color=WHITE, stroke_width=3)
        fleche = Triangle(color=WHITE, fill_opacity=1).scale(0.09).rotate(-PI / 2)
        fleche.move_to([width / 2, y, 0])

        def x2p(v):
            return np.array([-width / 2 + (v - xmin) / (xmax - xmin) * width, y, 0])

        reperes = VGroup()
        for v in marks:
            p = x2p(v)
            tick = Line(p + [0, 0.14, 0], p + [0, -0.14, 0], color=WHITE, stroke_width=2)
            lab = Text(str(v), font_size=26, color=WHITE).next_to([p[0], y - 0.16, 0], DOWN, buff=0.12)
            reperes.add(tick, lab)
        return VGroup(ligne, fleche, reperes), x2p

    def saut(self, x2p, a, b, texte, color, mag=0.7):
        """Une flèche courbe (le « saut ») de a à b, toujours bombée VERS LE HAUT,
        avec son étiquette au-dessus. mag règle la hauteur de l'arc."""
        ang = -PI * mag if b > a else PI * mag
        arc = CurvedArrow(x2p(a), x2p(b), angle=ang, color=color, tip_length=0.2)
        lab = Text(texte, font_size=28, color=color).next_to(arc, UP, buff=0.08)
        return arc, lab

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Le calcul mental", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Calculer vite, sans calculatrice ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Le secret : décomposer.", font_size=30, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.2))
        self.wait(2.2)

    # ── écran 1 : addition — passer par la dizaine (47 + 8) ─────────────────

    def ecran_addition(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Additionner : passer par la dizaine")

        calcul = Text("47 + 8 = ?", font_size=44, color=BLEU_CALCUL).move_to([0, 1.9, 0])
        self.play(Write(calcul))
        self.wait(0.6)

        grp, x2p = self.droite(45, 57, [45, 47, 50, 55, 57])
        self.play(Create(grp[0]), FadeIn(grp[1]))
        self.play(FadeIn(grp[2], lag_ratio=0.1))
        depart = Dot(x2p(47), radius=0.1, color=BLEU_CALCUL)
        self.play(GrowFromCenter(depart))
        self.wait(0.4)

        a1, l1 = self.saut(x2p, 47, 50, "+ 3", ORANGE_RETENUE)
        idee1 = Text("d'abord + 3 pour atteindre 50 (un nombre rond)", font_size=26, color=WHITE).move_to([0, -2.5, 0])
        self.play(Create(a1), Write(l1))
        self.play(FadeIn(idee1))
        self.wait(1.2)

        a2, l2 = self.saut(x2p, 50, 55, "+ 5", VERT_OK)
        idee2 = Text("puis + 5 : il restait 5 à ajouter", font_size=26, color=WHITE).move_to([0, -2.5, 0])
        self.play(Create(a2), Write(l2))
        self.play(Transform(idee1, idee2))
        self.wait(1.0)

        res = Text("47 + 8 = 55", font_size=44, color=VERT_OK).move_to([0, 1.9, 0])
        self.play(Transform(calcul, res), Indicate(Dot(x2p(55), radius=0.1, color=VERT_OK)))
        self.wait(2.2)

    # ── écran 2 : soustraction — arrondir puis corriger (121 - 38) ──────────

    def ecran_soustraction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Soustraire : arrondir puis corriger")

        calcul = Text("121 − 38 = ?", font_size=44, color=BLEU_CALCUL).move_to([0, 2.0, 0])
        self.play(Write(calcul))
        self.wait(0.4)

        astuce = Text("38 est proche de 40 : on enlève 40, c'est plus facile.", font_size=28, color=ORANGE_RETENUE).move_to([0, 1.1, 0])
        self.play(FadeIn(astuce))
        self.wait(0.8)

        grp, x2p = self.droite(78, 124, [81, 121], y=-1.2)
        self.play(Create(grp[0]), FadeIn(grp[1]), FadeIn(grp[2], lag_ratio=0.1))

        a1, l1 = self.saut(x2p, 121, 81, "− 40", BLEU_CALCUL, mag=0.42)
        e1 = Text("121 − 40 = 81", font_size=32, color=WHITE).move_to([0, -1.9, 0])
        self.play(Create(a1), Write(l1))
        self.play(FadeIn(e1))
        self.wait(1.0)

        corr = Text("on a enlevé 2 de trop → on les rend : 81 + 2 = 83", font_size=28, color=VERT_OK).move_to([0, -2.7, 0])
        self.play(Write(corr), Indicate(Dot(x2p(81), radius=0.09, color=VERT_OK)))
        self.wait(1.2)

        res = Text("121 − 38 = 83", font_size=44, color=VERT_OK).move_to([0, 2.0, 0])
        self.play(Transform(calcul, res), FadeOut(astuce))
        self.wait(2.2)

    # ── écran 3 : multiplication — × 5 = moitié de × 10 (18 × 5) ────────────

    def ecran_multiplication(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Multiplier par 5 : × 10 puis moitié")

        c = Text("18 × 5 = ?", font_size=48, color=BLEU_CALCUL).move_to([0, 1.7, 0])
        self.play(Write(c))
        self.wait(0.6)

        etape1 = Text("18 × 10 = 180", font_size=42, color=WHITE).move_to([0, 0.6, 0])
        fl1 = Text("(× 10 est facile : on ajoute un zéro)", font_size=26, color=ORANGE_RETENUE).next_to(etape1, DOWN, buff=0.2)
        self.play(FadeIn(etape1, shift=0.3 * RIGHT))
        self.play(Write(fl1))
        self.wait(1.0)

        # la barre de 180 coupée en deux moitiés de 90
        barre = Rectangle(width=7.0, height=0.8, color=BLEU_CALCUL, fill_opacity=0.25).move_to([0, -1.2, 0])
        milieu = DashedLine(barre.get_top() + [0, 0, 0], barre.get_bottom() + [0, 0, 0], color=ORANGE_RETENUE)
        milieu.move_to(barre.get_center())
        g = Text("90", font_size=34, color=VERT_OK).move_to(barre.get_center() + [-1.75, 0, 0])
        d = Text("90", font_size=34, color=WHITE).move_to(barre.get_center() + [1.75, 0, 0])
        total = Text("180", font_size=26, color=WHITE).next_to(barre, UP, buff=0.15)
        self.play(Create(barre), FadeIn(total))
        self.play(Create(milieu))
        self.play(Write(g), Write(d))
        moitie = Text("18 × 5 = la moitié de 180", font_size=28, color=WHITE).move_to([0, -2.6, 0])
        self.play(FadeIn(moitie), Indicate(g))
        self.wait(1.0)

        res = Text("18 × 5 = 90", font_size=48, color=VERT_OK).move_to([0, 1.7, 0])
        self.play(Transform(c, res))
        self.wait(2.2)

    # ── écran 4 : division — partager (56 ÷ 8) ──────────────────────────────

    def ecran_division(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Diviser : la table à l'envers")

        c = Text("56 ÷ 8 = ?", font_size=44, color=BLEU_CALCUL).move_to([-4.2, 1.4, 0])
        self.play(Write(c))
        self.wait(0.4)

        # 8 rangées de 7 points = 56
        grille = VGroup()
        for r in range(8):
            rang = VGroup(*[Dot(radius=0.11, color=BLEU_CALCUL) for _ in range(7)]).arrange(RIGHT, buff=0.16)
            grille.add(rang)
        grille.arrange(DOWN, buff=0.16).move_to([1.2, -0.4, 0])
        self.play(LaggedStart(*[FadeIn(r) for r in grille], lag_ratio=0.12), run_time=1.6)

        leg = Text("8 rangées de 7 = 56", font_size=30, color=WHITE).move_to([-4.0, 0.2, 0])
        self.play(Write(leg))
        self.wait(0.8)

        # on entoure une rangée : chaque part vaut 7
        cadre = SurroundingRectangle(grille[0], color=VERT_OK, buff=0.08)
        une_part = Text("1 part = 7", font_size=30, color=VERT_OK).move_to([-4.0, -0.6, 0])
        self.play(Create(cadre), Circumscribe(grille[0], color=VERT_OK))
        self.play(Write(une_part))
        self.wait(1.0)

        cle = Text("8 × 7 = 56  →  56 ÷ 8 = 7", font_size=32, color=VERT_OK).move_to([-4.0, -1.7, 0])
        self.play(Write(cle))
        self.wait(2.2)

    # ── écran 5 : les stratégies (double, moitié, × 10) ─────────────────────

    def ecran_strategies(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Les astuces à connaître")

        def carte(titre, exemple, couleur, x):
            boite = RoundedRectangle(width=3.8, height=2.2, corner_radius=0.2, color=couleur, fill_opacity=0.12)
            t = Text(titre, font_size=30, color=couleur).move_to(boite.get_center() + [0, 0.55, 0])
            e = Text(exemple, font_size=26, color=WHITE).move_to(boite.get_center() + [0, -0.35, 0])
            g = VGroup(boite, t, e).move_to([x, -0.2, 0])
            return g

        c1 = carte("Le double", "35 → 70  (× 2)", BLEU_CALCUL, -4.1)
        c2 = carte("La moitié", "48 → 24  (÷ 2)", ORANGE_RETENUE, 0)
        c3 = carte("× 10 / ÷ 10", "4,23 × 10 = 42,3", VERT_OK, 4.1)

        self.play(GrowFromCenter(c1))
        self.play(GrowFromCenter(c2))
        self.play(GrowFromCenter(c3))
        note = Text("Astuce × 10 : la virgule se déplace d'un rang.",
                    font_size=26, color=WHITE).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(note))
        self.wait(2.4)

    # ── écran 6 : défi (boulangerie) ────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        def article(nom, prix, x, couleur):
            boite = RoundedRectangle(width=3.0, height=1.4, corner_radius=0.18, color=couleur, fill_opacity=0.15)
            n = Text(nom, font_size=28, color=WHITE).move_to(boite.get_center() + [0, 0.3, 0])
            p = Text(prix, font_size=32, color=couleur).move_to(boite.get_center() + [0, -0.35, 0])
            return VGroup(boite, n, p).move_to([x, 0.9, 0])

        a1 = article("Pain", "2 €", -3.7, BLEU_CALCUL)
        a2 = article("Croissant", "1 €", 0, VERT_OK)
        a3 = article("Gâteau", "6 €", 3.7, ORANGE_RETENUE)
        self.play(LaggedStart(GrowFromCenter(a1), GrowFromCenter(a2), GrowFromCenter(a3), lag_ratio=0.3))

        billet = RoundedRectangle(width=3.2, height=1.2, corner_radius=0.1, color=VERT_OK, fill_opacity=0.2).move_to([0, -0.9, 0])
        bt = Text("Tu paies : 10 €", font_size=30, color=VERT_OK).move_to(billet.get_center())
        self.play(FadeIn(billet), Write(bt))

        q = Text("Combien te rend-on ?", font_size=36, color=BLEU_CALCUL).move_to([0, -2.1, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.5)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 7 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Le total : 2 + 1 + 6 = 9 €", font_size=38, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(Write(e1))
        self.wait(1.0)

        # barre complément de 9 à 10
        barre = Rectangle(width=8.0, height=0.8, color=WHITE).move_to([0, 0.1, 0])
        part9 = Rectangle(width=8.0 * 9 / 10, height=0.8, color=BLEU_CALCUL, fill_opacity=0.3)
        part9.align_to(barre, LEFT).move_to(barre.get_center() + [-8.0 * 0.5 / 10, 0, 0])
        l9 = Text("9 €", font_size=28, color=BLEU_CALCUL).move_to(part9.get_center())
        lr = Text("?", font_size=30, color=ORANGE_RETENUE).move_to(barre.get_center() + [8.0 * 4.5 / 10, 0, 0])
        total = Text("10 €", font_size=26, color=WHITE).next_to(barre, UP, buff=0.15)
        self.play(Create(barre), FadeIn(total))
        self.play(FadeIn(part9), Write(l9), Write(lr))
        self.wait(0.8)

        e2 = Text("De 9 à 10, il manque 1.", font_size=32, color=WHITE).move_to([0, -1.4, 0])
        self.play(Write(e2), Indicate(lr))
        self.wait(0.8)

        conclusion = Text("On te rend 1 €.", font_size=42, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Décomposer : passer par les nombres ronds.", font_size=28),
            Text("2. Une table sert dans les 2 sens : 8 × 7 = 56 → 56 ÷ 8 = 7.", font_size=28),
            Text("3. Double × 2, moitié ÷ 2, × 10 déplace la virgule.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_addition()
        self.ecran_soustraction()
        self.ecran_multiplication()
        self.ecran_division()
        self.ecran_strategies()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
