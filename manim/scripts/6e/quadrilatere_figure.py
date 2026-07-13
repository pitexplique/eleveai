# quadrilatere_figure.py
# EleveAI — Maths 6e — Les quadrilatères (notionId : quadrilatere_figure)
# Mêmes exemples que la fiche lib/fiches/maths-6e-quadrilateres.tsx.
#
# Mapping micro-compétences (banque quadrilateres.bank.ts) → écrans :
# - quadrilatere_nommer_vocabulaire / lire_propriete → écran 1 (ABCD : côtés, diagonales)
# - quadrilatere_identifier_nature → écrans 2-3 (rectangle, losange, carré)
# - quadrilatere_lien_propriete / distinguer → écran 3 (le carré = rectangle + losange)
# - quadrilatere_conclusion / completer_construire / defi → défi + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/quadrilatere_figure.py QuadrilatereFigure6e -o eleveai-maths-6e-quadrilatere-figure --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


def P(x, y, z=0):
    return np.array([x, y, z])


class QuadrilatereFigure6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def ticks(self, a, b, n=1, color=VERT_OK, size=0.11):
        m = (a + b) / 2
        d = (b - a) / np.linalg.norm(b - a)
        perp = np.array([-d[1], d[0], 0])
        g = VGroup()
        for o in np.linspace(-(n - 1) / 2, (n - 1) / 2, n) * 0.1:
            c = m + o * d
            g.add(Line(c - size * perp, c + size * perp, color=color, stroke_width=3))
        return g

    def marque_droite(self, corner, d1, d2, size=0.22, color=ROUGE_ERREUR):
        """Petit carré de l'angle droit à un sommet, le long des deux côtés d1, d2."""
        p1 = corner + d1 * size
        p2 = corner + d1 * size + d2 * size
        p3 = corner + d2 * size
        return VGroup(Line(p1, p2, color=color, stroke_width=3), Line(p2, p3, color=color, stroke_width=3))

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les quadrilatères", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("4 côtés : rectangle, losange ou carré ?", font_size=32, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("La nature se lit dans les codages, pas l'orientation.", font_size=26, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.15))
        self.wait(2.2)

    # ── écran 1 : nommer + diagonales ───────────────────────────────────────

    def ecran_nommer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Nommer : 4 côtés, 2 diagonales")

        A, B, C, D = P(-3.0, 1.4), P(1.2, 1.8), P(2.2, -1.4), P(-2.6, -1.2)
        quad = Polygon(A, B, C, D, color=BLEU_CALCUL, stroke_width=4, fill_color=BLEU_CALCUL, fill_opacity=0.08)
        self.play(Create(quad))

        for pt, lab, pos in [(A, "A", UP + LEFT), (B, "B", UP + RIGHT), (C, "C", DOWN + RIGHT), (D, "D", DOWN + LEFT)]:
            self.play(GrowFromCenter(Dot(pt, radius=0.07, color=WHITE)),
                      Write(Text(lab, font_size=28, color=VERT_OK).next_to(pt, pos, buff=0.12)), run_time=0.35)

        diag1 = DashedLine(A, C, color=ORANGE_RETENUE, stroke_width=3)
        diag2 = DashedLine(B, D, color=ORANGE_RETENUE, stroke_width=3)
        dtxt = Text("2 diagonales : AC et BD", font_size=26, color=ORANGE_RETENUE).move_to([3.4, 0.6, 0])
        self.play(Create(diag1), Create(diag2), FadeIn(dtxt))

        note = Text("AB et CD sont opposés ; AB et BC (au sommet B) sont consécutifs.", font_size=22, color=WHITE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 2 : rectangle et losange ──────────────────────────────────────

    def ecran_rect_losange(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Rectangle et losange")

        # rectangle à gauche
        rect = Rectangle(width=2.8, height=1.8, color=BLEU_CALCUL, stroke_width=4, fill_opacity=0.08).move_to([-3.4, 0.5, 0])
        coins = [rect.get_corner(c) for c in [UL, UR, DR, DL]]
        dirs = [(RIGHT, DOWN), (LEFT, DOWN), (LEFT, UP), (RIGHT, UP)]
        marks = VGroup(*[self.marque_droite(coins[i], dirs[i][0], dirs[i][1]) for i in range(4)])
        lrect = VGroup(Text("Rectangle", font_size=28, color=BLEU_CALCUL), Text("4 angles droits", font_size=22, color=WHITE)).arrange(DOWN, buff=0.12).next_to(rect, DOWN, buff=0.4)
        self.play(Create(rect))
        self.play(Create(marks))
        self.play(FadeIn(lrect))
        self.wait(0.6)

        # losange à droite
        cx = 3.2
        A, B, C, D = P(cx, 1.5), P(cx + 1.2, 0.4), P(cx, -0.7), P(cx - 1.2, 0.4)
        los = Polygon(A, B, C, D, color=ORANGE_RETENUE, stroke_width=4, fill_color=ORANGE_RETENUE, fill_opacity=0.08)
        tks = VGroup(self.ticks(A, B), self.ticks(B, C), self.ticks(C, D), self.ticks(D, A))
        llos = VGroup(Text("Losange", font_size=28, color=ORANGE_RETENUE), Text("4 côtés égaux", font_size=22, color=WHITE)).arrange(DOWN, buff=0.12).next_to(los, DOWN, buff=0.4)
        self.play(Create(los))
        self.play(Create(tks))
        self.play(FadeIn(llos))
        self.wait(2.2)

    # ── écran 3 : le carré = les deux ───────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le carré : les deux à la fois")

        carre = Square(side_length=2.4, color=VERT_OK, stroke_width=4, fill_opacity=0.1).move_to([-3.0, 0.1, 0])
        coins = [carre.get_corner(c) for c in [UL, UR, DR, DL]]
        dirs = [(RIGHT, DOWN), (LEFT, DOWN), (LEFT, UP), (RIGHT, UP)]
        marks = VGroup(*[self.marque_droite(coins[i], dirs[i][0], dirs[i][1]) for i in range(4)])
        sides = [
            (carre.get_corner(UL), carre.get_corner(UR)),
            (carre.get_corner(UR), carre.get_corner(DR)),
            (carre.get_corner(DR), carre.get_corner(DL)),
            (carre.get_corner(DL), carre.get_corner(UL)),
        ]
        tks = VGroup(*[self.ticks(a, b, color=VERT_OK) for a, b in sides])
        self.play(Create(carre))
        self.play(Create(marks), Create(tks))

        lignes = VGroup(
            Text("4 angles droits  →  comme un rectangle", font_size=26, color=BLEU_CALCUL),
            Text("4 côtés égaux    →  comme un losange", font_size=26, color=ORANGE_RETENUE),
            Text("Carré = rectangle ET losange", font_size=30, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([2.5, 0.1, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=0.2 * RIGHT) for l in lignes], lag_ratio=0.35))
        self.wait(2.2)

    # ── écran 4 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        A, B, C, D = P(-0.2, 1.7), P(1.3, 0.3), P(-0.2, -1.1), P(-1.7, 0.3)
        los = Polygon(A, B, C, D, color=BLEU_CALCUL, stroke_width=4, fill_color=BLEU_CALCUL, fill_opacity=0.08)
        tks = VGroup(self.ticks(A, B), self.ticks(B, C), self.ticks(C, D), self.ticks(D, A))
        self.play(Create(los), Create(tks))

        enonce = Text("4 côtés égaux, mais aucun angle droit marqué.", font_size=28, color=WHITE).move_to([0, -1.9, 0])
        q = Text("Losange ou carré ?", font_size=32, color=BLEU_CALCUL).move_to([0, -2.5, 0])
        pause = Text("Mets pause et cherche !", font_size=26, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.25)
        self.play(FadeIn(enonce))
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("4 côtés égaux  →  c'est un losange.", font_size=32, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("Aucun angle droit codé : on ne peut pas dire « carré ».", font_size=28, color=ROUGE_ERREUR).move_to([0, 0.2, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("C'est un LOSANGE (pas forcément un carré).", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un quadrilatère : 4 côtés, 4 sommets, 2 diagonales.", font_size=27),
            Text("2. Rectangle = 4 angles droits.", font_size=27),
            Text("3. Losange = 4 côtés égaux.", font_size=27),
            Text("4. Carré = les deux à la fois.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_nommer()
        self.ecran_rect_losange()
        self.ecran_carre()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
