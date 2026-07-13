# aire_surface.py
# EleveAI — Maths 6e — Les aires (notionId : aire_surface)
# Mêmes exemples que la fiche lib/fiches/maths-6e-aires.tsx.
#
# Mapping micro-compétences (banque aires.bank.ts) → écrans :
# - aire_comprendre → écran 1 (l'intérieur qu'on remplit ; aire ≠ périmètre)
# - aire_compter    → écran 1 (compter les carreaux : 3 × 4 = 12)
# - aire_rectangle  → écran 2 (rectangle 8 × 5 rempli → 40 cm²)
# - aire_carre      → écran 3 (carré c = 5 → 5 × 5 = 25 cm²)
# - aire_decomposer → écran 4 (figure en L : 4×3 + 2×2 = 16 cm²)
# - aire_comparer   → écran 5 (jardin vs potager) + correction
# - aire_probleme   → écran 5 (jardin 7×3 vs potager 5×5)
# - aire_defi       → à retenir (aire ≠ périmètre)
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/aire_surface.py AireSurface6e -o eleveai-maths-6e-aire-surface --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class AireSurface6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def grille(self, rows, cols, cell=0.5, center=ORIGIN, color=BLEU_CALCUL):
        g = VGroup()
        for r in range(rows):
            for c in range(cols):
                sq = Square(cell, stroke_width=1.5, color=WHITE)
                sq.set_fill(color, opacity=0.0)
                sq.move_to([c * cell, -r * cell, 0])
                g.add(sq)
        g.move_to(center)
        return g

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les aires", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Quelle surface à l'intérieur ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("L'aire se compte en carreaux (cm², m²).", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.2))
        self.wait(2.2)

    # ── écran 1 : comprendre + compter ──────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. L'aire = compter les carreaux")

        g = self.grille(3, 4, cell=0.7, center=[-3.0, -0.2, 0])
        self.play(Create(g, lag_ratio=0.05))
        self.wait(0.3)

        # on remplit les carreaux un par un
        compteur = Text("0", font_size=44, color=ORANGE_RETENUE).move_to([2.4, 0.6, 0])
        legende = Text("carreaux recouverts", font_size=26, color=WHITE).next_to(compteur, DOWN, buff=0.2)
        self.play(FadeIn(compteur), FadeIn(legende))
        for i, sq in enumerate(g, 1):
            nb = Text(str(i), font_size=44, color=ORANGE_RETENUE).move_to([2.4, 0.6, 0])
            self.play(sq.animate.set_fill(BLEU_CALCUL, opacity=0.7), Transform(compteur, nb), run_time=0.14)

        res = Text("3 rangées × 4 = 12 unités d'aire", font_size=32, color=VERT_OK).move_to([0, -2.6, 0])
        self.play(Write(res))
        self.wait(2.0)

    # ── écran 2 : le rectangle ──────────────────────────────────────────────

    def ecran_rectangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le rectangle : Aire = L × l")

        g = self.grille(5, 8, cell=0.5, center=[-2.4, -0.2, 0])
        self.play(Create(g, lag_ratio=0.02))

        lL = Text("L = 8", font_size=26, color=BLEU_CALCUL).next_to(g, UP, buff=0.15)
        ll = Text("l = 5", font_size=26, color=ORANGE_RETENUE).next_to(g, LEFT, buff=0.15)
        self.play(FadeIn(lL), FadeIn(ll))
        self.wait(0.3)

        # on remplit rangée par rangée
        self.play(LaggedStart(*[sq.animate.set_fill(BLEU_CALCUL, opacity=0.6) for sq in g], lag_ratio=0.01), run_time=1.6)

        calcul = Text("Aire = 8 × 5 = 40 cm²", font_size=38, color=VERT_OK).move_to([3.0, 0.2, 0])
        self.play(Write(calcul))
        note = Text("(8 + 5 + 8 + 5 = 26 cm : ça, c'est le périmètre)", font_size=22, color=ROUGE_ERREUR).move_to([3.0, -1.0, 0])
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 3 : le carré ──────────────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le carré : Aire = côté × côté")

        g = self.grille(5, 5, cell=0.55, center=[-2.8, -0.2, 0])
        self.play(Create(g, lag_ratio=0.03))
        lab = Text("côté = 5 cm", font_size=26, color=WHITE).next_to(g, DOWN, buff=0.15)
        self.play(FadeIn(lab))
        self.play(LaggedStart(*[sq.animate.set_fill(BLEU_CALCUL, opacity=0.6) for sq in g], lag_ratio=0.02), run_time=1.4)

        calcul = Text("Aire = 5 × 5 = 25 cm²", font_size=38, color=VERT_OK).move_to([3.0, 0.0, 0])
        self.play(Write(calcul))
        self.wait(2.2)

    # ── écran 4 : décomposer (figure en L) ──────────────────────────────────

    def ecran_decomposer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Découper une figure en L")

        cell = 0.6
        # rectangle 4 (larg) × 3 (haut) en bleu
        rect = VGroup()
        for r in range(3):
            for c in range(4):
                sq = Square(cell, stroke_width=1.5, color=WHITE).set_fill(BLEU_CALCUL, opacity=0.5)
                sq.move_to([c * cell, -r * cell, 0])
                rect.add(sq)
        # carré 2 × 2 en orange, collé sous la gauche du rectangle
        carre = VGroup()
        for r in range(2):
            for c in range(2):
                sq = Square(cell, stroke_width=1.5, color=WHITE).set_fill(ORANGE_RETENUE, opacity=0.5)
                sq.move_to([c * cell, -(3 + r) * cell, 0])
                carre.add(sq)
        figure = VGroup(rect, carre).move_to([-2.8, 0, 0])

        self.play(Create(rect, lag_ratio=0.03))
        self.play(Create(carre, lag_ratio=0.05))
        self.wait(0.4)

        a1 = Text("Rectangle : 4 × 3 = 12 cm²", font_size=30, color=BLEU_CALCUL).move_to([3.0, 1.0, 0])
        self.play(Indicate(rect), Write(a1))
        a2 = Text("Carré : 2 × 2 = 4 cm²", font_size=30, color=ORANGE_RETENUE).move_to([3.0, 0.0, 0])
        self.play(Indicate(carre), Write(a2))
        self.wait(0.4)

        total = Text("Total : 12 + 4 = 16 cm²", font_size=36, color=VERT_OK).move_to([3.0, -1.3, 0])
        self.play(Write(total))
        self.wait(2.2)

    # ── écran 5 : défi (jardin vs potager) ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        k = 0.45
        jardin = Rectangle(width=7 * k, height=3 * k, color=BLEU_CALCUL, fill_opacity=0.25).move_to([-2.7, 0.4, 0])
        lj = Text("Jardin 7 m × 3 m", font_size=26, color=BLEU_CALCUL).next_to(jardin, DOWN, buff=0.15)
        potager = Square(side_length=5 * k, color=ORANGE_RETENUE, fill_opacity=0.25).move_to([2.7, 0.2, 0])
        lp = Text("Potager 5 m × 5 m", font_size=26, color=ORANGE_RETENUE).next_to(potager, DOWN, buff=0.15)
        self.play(GrowFromCenter(jardin), FadeIn(lj))
        self.play(GrowFromCenter(potager), FadeIn(lp))

        q = Text("Lequel a la plus grande aire ?", font_size=34, color=BLEU_CALCUL).move_to([0, -2.0, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.4)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Jardin : 7 × 3 = 21 m²", font_size=34, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("Potager : 5 × 5 = 25 m²", font_size=34, color=ORANGE_RETENUE).move_to([0, 0.4, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("25 > 21 : le potager a la plus grande aire.", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. L'aire = la surface, en unités carrées (cm², m²).", font_size=27),
            Text("2. Rectangle : L × l.   Carré : c × c.", font_size=27),
            Text("3. Figure compliquée : on la découpe et on additionne.", font_size=27),
            Text("4. Aire ≠ périmètre : la surface, pas le tour.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_compter()
        self.ecran_rectangle()
        self.ecran_carre()
        self.ecran_decomposer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
