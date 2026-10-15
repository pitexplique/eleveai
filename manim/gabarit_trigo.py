# gabarit_trigo.py
# LE TRIANGLE RECTANGLE DES VIDÉOS DE TRIGONOMÉTRIE (4e cosinus, 3e sin/cos/tan).
#
# ⭐ TOUJOURS LA MÊME PLACE DES SOMMETS, comme dans les fiches
# (lib/fiches/maths-4e-cosinus.tsx, maths-3e-trigonometrie.tsx) : A en bas à
# gauche (angle droit), B en bas à droite, C en haut à gauche. L'élève qui passe
# de la fiche à la vidéo retrouve le même dessin.
#
# ⭐ UNE COULEUR PAR RÔLE, la même dans les deux vidéos : hypoténuse orange,
# adjacent bleu, opposé violet. Le rôle se voit avant de se lire.
#
# ⛔ Pas de LaTeX sur ce poste : tout est en `Text`, l'arc d'angle est un `Arc`.

import math

import numpy as np
from manim import *

from charte import *

COUL_HYP = ORANGE_RETENUE
COUL_ADJ = BLEU_CALCUL
COUL_OPP = VIOLET_ACCENT


class TriangleRect:
    """Un triangle rectangle en A, dessiné à partir de ses deux côtés de l'angle droit."""

    def triangle(self, centre=(-2.8, -0.2), l=4.0, h=3.0, lettres=True):
        cx, cy = centre
        A = np.array([cx - l / 2, cy - h / 2, 0])
        B = np.array([cx + l / 2, cy - h / 2, 0])
        C = np.array([cx - l / 2, cy + h / 2, 0])
        poly = Polygon(A, B, C, color=WHITE, stroke_width=4)
        s = 0.26
        carre = Polygon(A, A + RIGHT * s, A + RIGHT * s + UP * s, A + UP * s,
                        color=WHITE, stroke_width=2.5)
        g = VGroup(poly, carre)
        if lettres:
            g.add(Text("A", font_size=32).move_to(A + DL * 0.3),
                  Text("B", font_size=32).move_to(B + DR * 0.3),
                  Text("C", font_size=32).move_to(C + UL * 0.3))
        g.A, g.B, g.C, g.l, g.h = A, B, C, l, h
        return g

    # ── les côtés ───────────────────────────────────────────────────────────

    def cote(self, tri, nom, color, width=9):
        p = {"A": tri.A, "B": tri.B, "C": tri.C}
        return Line(p[nom[0]], p[nom[1]], color=color, stroke_width=width)

    def etiquette(self, tri, nom, texte, color, font_size=30):
        """Le nom d'un côté, posé DEHORS du triangle, contre son milieu."""
        t = Text(texte, font_size=font_size, color=color)
        if nom == "AB":
            t.next_to(Line(tri.A, tri.B), DOWN, buff=0.2)
        elif nom == "AC":
            t.next_to(Line(tri.A, tri.C), LEFT, buff=0.25)
        else:  # BC, l'hypoténuse
            milieu = (tri.B + tri.C) / 2
            t.next_to(milieu, UR, buff=0.12)
        return t

    # ── les angles ──────────────────────────────────────────────────────────

    def arc(self, tri, sommet, color=JAUNE_TITRE, r=0.6):
        t = math.atan2(tri.h, tri.l)
        if sommet == "B":
            return Arc(radius=r, start_angle=PI - t, angle=t, arc_center=tri.B,
                       color=color, stroke_width=5)
        return Arc(radius=r, start_angle=-PI / 2, angle=PI / 2 - t, arc_center=tri.C,
                   color=color, stroke_width=5)

    def mesure(self, tri, sommet, texte, color=JAUNE_TITRE, font_size=28):
        """La mesure d'un angle, posée DANS le triangle, sur sa bissectrice."""
        t = math.atan2(tri.h, tri.l)
        if sommet == "B":
            a = PI - t / 2
            p = tri.B + 1.05 * np.array([math.cos(a), math.sin(a), 0]) + LEFT * 0.2
        else:
            a = -PI / 2 + (PI / 2 - t) / 2
            p = tri.C + 1.05 * np.array([math.cos(a), math.sin(a), 0]) + DOWN * 0.15
        return Text(texte, font_size=font_size, color=color).move_to(p)
