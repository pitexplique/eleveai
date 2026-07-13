# sym_axiale.py
# EleveAI — Maths 6e — La symétrie axiale (notionId : sym_axiale)
# Mêmes exemples que la fiche lib/fiches/maths-6e-symetrie.tsx.
#
# Mapping micro-compétences (banque symetrie.bank.ts) → écrans :
# - sym_reconnaitre → écran 1 (le miroir : figure ↔ image le long de l'axe)
# - sym_point       → écran 2 (image d'un point : perpendiculaire, même distance)
# - sym_propriete   → écran 3 (conserve longueurs, angles, aires)
# - sym_axe         → écran 4 (axes : rectangle 2, carré 4, triangle 3, cercle ∞)
# - sym_figure / sym_defi → défi (combien d'axes pour un carré ?) + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/sym_axiale.py SymAxiale6e -o eleveai-maths-6e-sym-axiale --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


def Pt(x, y, z=0):
    return np.array([x, y, z])


class SymAxiale6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def axe_vertical(self, x, y0=-2.2, y1=2.2, label="axe"):
        ligne = DashedLine(Pt(x, y0), Pt(x, y1), color=JAUNE_TITRE, stroke_width=3)
        lab = Text(label, font_size=22, color=JAUNE_TITRE).next_to(Pt(x, y1), UP, buff=0.1)
        return VGroup(ligne, lab)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("La symétrie axiale", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Le miroir des mathématiques", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Une droite, l'axe, sépare une figure de son reflet.", font_size=26, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.15))
        self.wait(2.2)

    # ── écran 1 : le miroir ─────────────────────────────────────────────────

    def ecran_miroir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. L'axe joue le rôle d'un miroir")

        ax = 0.0
        axe = self.axe_vertical(ax)
        self.play(Create(axe))

        src_pts = [Pt(-2.6, -1.0), Pt(-0.8, -1.0), Pt(-2.6, 1.4)]
        src = Polygon(*src_pts, color=BLEU_CALCUL, stroke_width=4, fill_color=BLEU_CALCUL, fill_opacity=0.15)
        lsrc = Text("figure", font_size=24, color=BLEU_CALCUL).move_to(Pt(-2.0, -1.5))
        self.play(Create(src), FadeIn(lsrc))
        self.wait(0.5)

        img_pts = [Pt(2 * ax - p[0], p[1], 0) for p in src_pts]
        img = Polygon(*img_pts, color=VERT_OK, stroke_width=4, fill_color=VERT_OK, fill_opacity=0.15)
        limg = Text("image", font_size=24, color=VERT_OK).move_to(Pt(2.0, -1.5))
        self.play(TransformFromCopy(src, img), FadeIn(limg))

        # liens perpendiculaires entre 2 sommets et leurs images
        for p, q in [(src_pts[2], img_pts[2]), (src_pts[1], img_pts[1])]:
            self.play(Create(DashedLine(p, q, color=ORANGE_RETENUE, stroke_width=2)), run_time=0.5)

        note = Text("On plie le long de l'axe : la figure et l'image se superposent.", font_size=24, color=WHITE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.0)

    # ── écran 2 : l'image d'un point ────────────────────────────────────────

    def ecran_point(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. L'image d'un point")

        ax = 0.0
        axe = self.axe_vertical(ax)
        self.play(Create(axe))

        y = 0.2
        A = Pt(-3.0, y)
        Ai = Pt(3.0, y)
        perp = DashedLine(Pt(-3.4, y), Pt(3.4, y), color=WHITE, stroke_width=2)
        self.play(Create(perp))

        dA = Dot(A, radius=0.09, color=BLEU_CALCUL)
        lA = Text("A", font_size=28, color=BLEU_CALCUL).next_to(A, UP, buff=0.15)
        self.play(GrowFromCenter(dA), Write(lA))

        d1 = Text("3 carreaux", font_size=22, color=ORANGE_RETENUE).move_to(Pt(-1.5, y + 0.4))
        d2 = Text("3 carreaux", font_size=22, color=ORANGE_RETENUE).move_to(Pt(1.5, y + 0.4))
        self.play(FadeIn(d1))

        dAi = Dot(Ai, radius=0.09, color=VERT_OK)
        lAi = Text("A'", font_size=28, color=VERT_OK).next_to(Ai, UP, buff=0.15)
        self.play(GrowFromCenter(dAi), Write(lAi), FadeIn(d2))
        self.wait(0.6)

        note = Text("Même distance de l'autre côté : l'axe est le milieu de [AA'].", font_size=24, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 3 : la symétrie conserve tout ─────────────────────────────────

    def ecran_conserve(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La symétrie conserve tout")

        ax = 0.0
        axe = self.axe_vertical(ax)
        self.play(Create(axe))

        src_pts = [Pt(-2.8, -1.0), Pt(-0.7, -1.0), Pt(-2.0, 1.2)]
        src = Polygon(*src_pts, color=BLEU_CALCUL, stroke_width=4, fill_opacity=0.12)
        img_pts = [Pt(-p[0], p[1], 0) for p in src_pts]
        img = Polygon(*img_pts, color=VERT_OK, stroke_width=4, fill_opacity=0.12)
        self.play(Create(src), TransformFromCopy(src, img))

        l1 = Text("longueur 7 cm  →  image 7 cm", font_size=26, color=WHITE).move_to(Pt(0, -2.0))
        self.play(FadeIn(l1))
        self.wait(0.6)

        note = VGroup(
            Text("Rien ne change :", font_size=26, color=ORANGE_RETENUE),
            Text("longueurs · angles · aires · alignement", font_size=26, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2.0)

    # ── écran 4 : les axes des figures usuelles ─────────────────────────────

    def ecran_axes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Les axes des figures usuelles")

        def axes_lines(mob, dirs):
            g = VGroup()
            c = mob.get_center()
            for d in dirs:
                g.add(DashedLine(c - d, c + d, color=JAUNE_TITRE, stroke_width=2.5))
            return g

        # rectangle : 2 axes
        rect = Rectangle(width=1.9, height=1.2, color=BLEU_CALCUL, stroke_width=3).move_to([-4.4, 0.5, 0])
        rax = axes_lines(rect, [Pt(1.15, 0), Pt(0, 0.75)])
        lr = VGroup(Text("Rectangle", font_size=24, color=BLEU_CALCUL), Text("2 axes", font_size=22, color=WHITE)).arrange(DOWN, buff=0.1).next_to(rect, DOWN, buff=0.35)

        # carré : 4 axes
        car = Square(side_length=1.6, color=VERT_OK, stroke_width=3).move_to([-1.4, 0.5, 0])
        cax = axes_lines(car, [Pt(1.0, 0), Pt(0, 1.0), Pt(0.9, 0.9), Pt(0.9, -0.9)])
        lc = VGroup(Text("Carré", font_size=24, color=VERT_OK), Text("4 axes", font_size=22, color=WHITE)).arrange(DOWN, buff=0.1).next_to(car, DOWN, buff=0.35)

        # triangle équilatéral : 3 axes (médianes)
        tc = [Pt(1.7, -0.3), Pt(3.3, -0.3), Pt(2.5, 1.1)]
        tri = Polygon(*tc, color=ORANGE_RETENUE, stroke_width=3)
        centre = (tc[0] + tc[1] + tc[2]) / 3
        tax = VGroup(*[DashedLine((tc[i] + tc[(i + 1) % 3]) / 2, tc[(i + 2) % 3], color=JAUNE_TITRE, stroke_width=2.5) for i in range(3)])
        lt = VGroup(Text("Équilatéral", font_size=24, color=ORANGE_RETENUE), Text("3 axes", font_size=22, color=WHITE)).arrange(DOWN, buff=0.1).next_to(tri, DOWN, buff=0.35)

        # cercle : une infinité
        cer = Circle(radius=0.85, color=VIOLET_ACCENT, stroke_width=3).move_to([5.2, 0.5, 0])
        cerax = VGroup(*[DashedLine(cer.get_center() - Pt(0.85 * np.cos(a), 0.85 * np.sin(a)), cer.get_center() + Pt(0.85 * np.cos(a), 0.85 * np.sin(a)), color=JAUNE_TITRE, stroke_width=1.5) for a in np.linspace(0, PI, 6, endpoint=False)])
        lce = VGroup(Text("Cercle", font_size=24, color=VIOLET_ACCENT), Text("une infinité", font_size=22, color=WHITE)).arrange(DOWN, buff=0.1).next_to(cer, DOWN, buff=0.35)

        self.play(Create(rect), Create(rax), FadeIn(lr))
        self.play(Create(car), Create(cax), FadeIn(lc))
        self.play(Create(tri), Create(tax), FadeIn(lt))
        self.play(Create(cer), Create(cerax), FadeIn(lce))
        self.wait(2.4)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        car = Square(side_length=2.6, color=VERT_OK, stroke_width=4, fill_opacity=0.08).move_to([0, 0.2, 0])
        self.play(Create(car))

        q = Text("Combien d'axes de symétrie a un carré ?", font_size=32, color=BLEU_CALCUL).move_to([0, -2.0, 0])
        pause = Text("Mets pause et cherche !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.35)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        car = Square(side_length=2.4, color=VERT_OK, stroke_width=4).move_to([-3.0, 0.1, 0])
        c = car.get_center()
        med = VGroup(
            DashedLine(c - Pt(1.2, 0), c + Pt(1.2, 0), color=BLEU_CALCUL, stroke_width=2.5),
            DashedLine(c - Pt(0, 1.2), c + Pt(0, 1.2), color=BLEU_CALCUL, stroke_width=2.5),
        )
        diag = VGroup(
            DashedLine(c - Pt(1.2, 1.2), c + Pt(1.2, 1.2), color=ORANGE_RETENUE, stroke_width=2.5),
            DashedLine(c - Pt(1.2, -1.2), c + Pt(1.2, -1.2), color=ORANGE_RETENUE, stroke_width=2.5),
        )
        self.play(Create(car))
        self.play(Create(med))
        m = Text("2 médianes", font_size=26, color=BLEU_CALCUL).move_to([2.6, 0.8, 0])
        self.play(Write(m))
        self.play(Create(diag))
        dg = Text("+ 2 diagonales", font_size=26, color=ORANGE_RETENUE).move_to([2.6, -0.1, 0])
        self.play(Write(dg))

        conclusion = Text("Un carré a 4 axes de symétrie.", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. La symétrie axiale = un pliage le long de l'axe.", font_size=27),
            Text("2. L'image est de l'autre côté, à la même distance.", font_size=27),
            Text("3. L'axe est la médiatrice de [AA'].", font_size=27),
            Text("4. Elle conserve tout : longueurs, angles, aires.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_miroir()
        self.ecran_point()
        self.ecran_conserve()
        self.ecran_axes()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
