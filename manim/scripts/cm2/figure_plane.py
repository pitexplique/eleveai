# figure_plane.py
# EleveAI — Maths CM2 — Les figures planes (notionId : figure_plane)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-figure-plane.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (triangle, carré/rectangle/losange, cercle + rayon/diamètre, cerf-volant losange).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque figures-planes.bank.ts) → écrans :
# - figure_triangle      → écran 1 (le triangle : 3 côtés)
# - figure_quadrilatere  → écran 2 (carré · rectangle · losange)
# - figure_cercle        → écran 3 (centre O · rayon · diamètre = 2 × rayon)
# - figure_defi          → défi + correction (cerf-volant : 4 côtés égaux, pas d'angle droit → losange)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/figure_plane.py FigurePlaneCM2 -o eleveai-maths-cm2-figure-plane --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
ORANGE = "#f97316"
VIOLET = "#8b5cf6"
VERT = "#16a34a"


class FigurePlaneCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def tick(self, p1, p2, couleur=VERT):
        """Un petit trait de côté égal au milieu de [p1,p2]."""
        m = (np.array(p1) + np.array(p2)) / 2
        d = np.array(p2) - np.array(p1)
        n = np.array([-d[1], d[0], 0])
        n = n / (np.linalg.norm(n) or 1) * 0.12
        return Line(m - n, m + n, color=couleur, stroke_width=4)

    def angle_droit(self, sommet, p1, p2, taille=0.32, couleur=ROUGE):
        s = np.array(sommet)
        u = (np.array(p1) - s); u = u / (np.linalg.norm(u) or 1) * taille
        v = (np.array(p2) - s); v = v / (np.linalg.norm(v) or 1) * taille
        return VMobject(color=couleur, stroke_width=4).set_points_as_corners([s + u, s + u + v, s + v])

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les figures planes", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        tri = Polygon([-3.6, -1.0, 0], [-2.2, -1.0, 0], [-2.9, 0.2, 0], color=VERT, stroke_width=5)
        car = Square(side_length=1.2, color=BLEU_CALCUL, stroke_width=5).move_to([-0.6, -0.4, 0])
        cer = Circle(radius=0.7, color=ORANGE, stroke_width=5).move_to([1.8, -0.4, 0])
        self.play(Write(titre), FadeIn(sous))
        self.play(Create(tri), Create(car), Create(cer))
        note = Text("des côtés, des angles… ou une courbe", font_size=26, color=BLEU_CALCUL).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : le triangle ───────────────────────────────────────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le triangle : 3 côtés")

        A, B, C = [-1.8, -1.2, 0], [1.8, -1.2, 0], [-0.3, 1.2, 0]
        tri = Polygon(A, B, C, color=VERT, stroke_width=6)
        self.play(Create(tri))
        for i, (p, q) in enumerate([(A, B), (B, C), (C, A)]):
            num = Text(str(i + 1), font_size=28, color=WHITE).move_to((np.array(p) + np.array(q)) / 2 + np.array([0.25, 0.25, 0]))
            self.play(FadeIn(num), run_time=0.4)
        note = Text("3 côtés et 3 sommets", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(note))
        self.wait(2.0)

    # ── écran 2 : les quadrilatères ─────────────────────────────────────────

    def ecran_quadrilateres(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Les quadrilatères : 4 côtés")

        # carré
        car = Square(side_length=1.5, color=BLEU_CALCUL, stroke_width=5).move_to([-3.6, 0.2, 0])
        cc = car.get_vertices()
        marks_c = VGroup(*[self.tick(cc[i], cc[(i + 1) % 4], BLEU_CALCUL) for i in range(4)])
        ad_c = self.angle_droit(cc[0], cc[1], cc[3])
        lc = Text("carré", font_size=26, color=WHITE).next_to(car, DOWN, buff=0.25)

        # rectangle
        rec = Rectangle(width=2.0, height=1.2, color=VERT, stroke_width=5).move_to([-0.2, 0.2, 0])
        rv = rec.get_vertices()
        ad_r = self.angle_droit(rv[0], rv[1], rv[3])
        lr = Text("rectangle", font_size=26, color=WHITE).next_to(rec, DOWN, buff=0.25)

        # losange
        los = Polygon([2.9, 0.9, 0], [3.8, 0.2, 0], [2.9, -0.5, 0], [2.0, 0.2, 0], color=ORANGE, stroke_width=5)
        lv = los.get_vertices()
        marks_l = VGroup(*[self.tick(lv[i], lv[(i + 1) % 4], ORANGE) for i in range(4)])
        ll = Text("losange", font_size=26, color=WHITE).next_to(los, DOWN, buff=0.25)

        self.play(Create(car), Create(marks_c), Create(ad_c), FadeIn(lc))
        self.play(Create(rec), Create(ad_r), FadeIn(lr))
        self.play(Create(los), Create(marks_l), FadeIn(ll))
        note = Text("carré : côtés égaux + angles droits", font_size=26, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(Write(note))
        self.wait(2.4)

    # ── écran 3 : le cercle ─────────────────────────────────────────────────

    def ecran_cercle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le cercle")

        centre = np.array([0, 0.0, 0])
        r = 1.5
        cer = Circle(radius=r, color=ORANGE, stroke_width=6).move_to(centre)
        O = Dot(centre, color=ROUGE); Ot = Text("O", font_size=24, color=ROUGE).next_to(O, DOWN, buff=0.1)
        self.play(Create(cer), FadeIn(O), FadeIn(Ot))

        A = centre + RIGHT * r
        rayon = Line(centre, A, color=VERT, stroke_width=5)
        lray = Text("rayon", font_size=24, color=VERT).next_to(rayon, UP, buff=0.1)
        self.play(Create(rayon), FadeIn(lray))

        B = centre + LEFT * r
        diam = Line(B, A, color=BLEU_CALCUL, stroke_width=5)
        ldia = Text("diamètre", font_size=24, color=BLEU_CALCUL).next_to(diam, DOWN, buff=0.15)
        self.play(Create(diam), FadeIn(ldia))

        note = Text("diamètre = 2 × rayon", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(note))
        self.wait(2.2)

    # ── écran 4 : défi (le cerf-volant) ─────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : le cerf-volant", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        los = Polygon([0, 1.4, 0], [1.1, 0.1, 0], [0, -1.2, 0], [-1.1, 0.1, 0], color=ORANGE, stroke_width=6)
        lv = los.get_vertices()
        marks = VGroup(*[self.tick(lv[i], lv[(i + 1) % 4], ORANGE) for i in range(4)])
        self.play(Create(los), Create(marks))

        consigne = Text("4 côtés égaux, mais aucun angle droit", font_size=28, color=WHITE).to_edge(DOWN, buff=1.0)
        pause = Text("Quelle figure ? Mets pause !", font_size=28, color=VERT).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(consigne, shift=UP * 0.2))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        los = Polygon([0, 1.4, 0], [1.1, 0.1, 0], [0, -1.2, 0], [-1.1, 0.1, 0], color=ORANGE, stroke_width=6)
        lv = los.get_vertices()
        marks = VGroup(*[self.tick(lv[i], lv[(i + 1) % 4], ORANGE) for i in range(4)])
        self.play(Create(los), Create(marks))

        note = Text("4 côtés égaux + pas d'angle droit", font_size=28, color=WHITE).move_to([0, -2.0, 0])
        concl = Text("C'est un losange", font_size=38, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.play(Write(concl))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Triangle = 3 côtés ; quadrilatère = 4 côtés.", font_size=26),
            Text("2. Carré = côtés égaux + angles droits ; losange = côtés égaux.", font_size=26),
            Text("3. Cercle : rayon (centre → bord), diamètre = 2 × rayon.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_triangle()
        self.ecran_quadrilateres()
        self.ecran_cercle()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les figures planes » 3 formes│ « Trois familles de formes. Pour les
#  ~0:00      │                               │   reconnaître, on ne devine pas : on compte
#             │                               │   les côtés et on regarde les coins. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  triangle · 1 2 3             │ « Compte avec moi : un côté, deux, trois. Trois
#  ~0:14      │  3 côtés et 3 sommets         │   côtés, trois pointes. Dès que tu vois ça, c'est
#             │                               │   un triangle, quelle que soit sa forme. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  carré · rectangle · losange  │ « Quatre côtés ici. Les petits carrés rouges, ce
#  ~0:32      │                               │   sont les angles droits ; les petits traits, les
#             │                               │   côtés égaux. Le carré a les deux, c'est le champion. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  cercle O · rayon · diamètre  │ « Le cercle n'a pas de côté. Du centre au bord :
#  ~0:52      │  diamètre = 2 × rayon         │   le rayon. Et si tu traverses tout en passant par
#             │                               │   le centre : le diamètre, deux fois plus long. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  losange (cerf-volant)        │ « À toi. Un cerf-volant : quatre côtés tous
#  ~1:10      │  4 côtés égaux, pas d'angle    │   pareils, mais penché, aucun coin bien carré.
#             │                               │   Comment s'appelle cette figure ? Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  « C'est un losange »          │ « Côtés égaux, oui — mais pas d'angle droit.
#  ~1:26      │                               │   Ce n'est donc pas un carré : c'est un losange. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : compte les côtés ; regarde angles et
#  ~1:42      │                               │   longueurs ; et le cercle, lui, se mesure avec le
#             │                               │   rayon et le diamètre. À bientôt ! »
