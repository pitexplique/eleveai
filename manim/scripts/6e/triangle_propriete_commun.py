# triangle_propriete_commun.py
# Série TRIANGLES 6e, notion triangle_propriete (épisodes 06 à 09) : les petits dessins communs.
# ⭐ Vraies mesures : un secteur marqué 40° ouvre 40° ; une baguette de 6 cm vaut 6 × l'échelle.
# Rien n'est ajouté à la scène : tout est renvoyé.

import numpy as np
from manim import *

C_COINS = ("#f472b6", "#facc15", "#22d3ee")
BOIS = "#d6a15c"


def _p(p):
    return np.array([p[0], p[1], 0.0], dtype=float)


def _ouverture(s, a, b):
    """Le départ et l'ouverture (positive, en radians) de l'angle a-s-b."""
    s, a, b = _p(s), _p(a), _p(b)
    t1, t2 = np.arctan2(*(a - s)[[1, 0]]), np.arctan2(*(b - s)[[1, 0]])
    d = (t2 - t1 + PI) % TAU - PI
    return (t1, d) if d >= 0 else (t2, -d)


def secteur(s, a, b, r=0.8, couleur="#fb923c", op=0.9):
    """Le coin plein de l'angle a-s-b : sa vraie ouverture."""
    t, d = _ouverture(s, a, b)
    return AnnularSector(inner_radius=0, outer_radius=r, angle=d, start_angle=t, arc_center=_p(s),
                         fill_color=couleur, fill_opacity=op, stroke_width=0)


def secteur_a(o, depart_deg, ouverture_deg, r=2.0, couleur="#fb923c", op=0.9):
    """Le même coin, posé en o, à partir de la direction depart_deg."""
    return AnnularSector(inner_radius=0, outer_radius=r, angle=np.deg2rad(ouverture_deg), start_angle=np.deg2rad(depart_deg),
                         arc_center=_p(o), fill_color=couleur, fill_opacity=op, stroke_width=0)


def dans_angle(s, a, b, r):
    """Le point à la distance r de s, sur la bissectrice de a-s-b."""
    t, d = _ouverture(s, a, b)
    return _p(s) + r * np.array([np.cos(t + d / 2), np.sin(t + d / 2), 0.0])


def etq(txt, fs=34, couleur=WHITE):
    """Un petit texte de figure, posé au mot par la scène (hors synchro automatique)."""
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD)
    t._pas_audit = t.sans_synchro = True
    return t


def mesure(s, a, b, txt, r=1.0, fs=34, couleur=WHITE):
    return etq(txt, fs, couleur).move_to(dans_angle(s, a, b, r))


def sommet_haut(b, c, lb, lc):
    """Le sommet du haut d'un triangle de base bc : à lb de b et à lc de c (longueurs déjà à l'échelle)."""
    b, c = _p(b), _p(c)
    L = np.linalg.norm(c - b)
    x = (L * L + lb * lb - lc * lc) / (2 * L)
    return b + np.array([x, np.sqrt(max(0.0, lb * lb - x * x)), 0.0])


class CalculAuMot:
    """Une ligne de calcul dont chaque morceau paraît à son mot."""

    def poser_calcul(self, morceaux, y, mots, xl=0.9, fs=52):
        """morceaux = (texte, couleur) ; mots = (extrait, n, indices des morceaux à montrer)."""
        lg = VGroup(*[etq(t, fs, c) for t, c in morceaux]).arrange(RIGHT, buff=0.24)
        self.col(lg, y, xl=xl)
        for m, n, idx in mots:
            self.au_mot(m, n)
            self.play(*[FadeIn(lg[i], shift=RIGHT * 0.08) for i in idx], run_time=0.22)
        return lg


def baguette(a, b, couleur=BOIS, sw=14):
    """Une baguette, avec une petite vis à chaque bout."""
    a, b = _p(a), _p(b)
    return VGroup(Line(a, b, color=couleur, stroke_width=sw), Dot(a, radius=0.08, color="#475569"), Dot(b, radius=0.08, color="#475569"))
