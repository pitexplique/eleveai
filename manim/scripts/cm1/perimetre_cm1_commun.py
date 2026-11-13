# perimetre_cm1_commun.py
# EleveAI — Maths CM1 — série « Périmètre » (13/11/2026) : ce qui sert aux paysages
# perimetre_triangle, perimetre_quadrilatere, perimetre_polygone, perimetre_defi.
# Base : aire_cm1_commun (PaysageAireCM1, PhraseAGauche, personne…), importée sans la modifier.
# Ici : les polygones par leurs côtés, les étiquettes de côté, le tour orange (le galon, la baguette…),
# les personnages-métiers du lot (Nina, Lucas, Emma, Karim).
# Voix : manim/voix/cm1-perimetre-<ep>.json (Julie, débit −6) ;
# marques : python manim/scripts/cm1/aire_marques.py perimetre:<ep>  (⛔ jamais sans argument).

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm1_commun import *  # noqa: E402,F401,F403

TOUR = ORANGE_RETENUE   # le tour (périmètre), toujours orange dans la série
FOND_TRI = "#f472b6"    # le fanion (rose)
FOND_TRI_B = "#831843"


def pts_triangle(base, g, d, u=0.1, pointe_en_bas=False):
    """Un triangle par ses 3 côtés (en cm, échelle u) : la base horizontale, le côté g à gauche,
    d à droite. Renvoie [A, B, C] centrés sur l'origine (A, B la base ; C la pointe)."""
    b = base * u
    x = (base * base + g * g - d * d) / (2 * base) * u
    y = math.sqrt(max((g * u) ** 2 - x * x, 0))
    if pointe_en_bas:
        y = -y
    A, B, C = P(-b / 2, 0), P(b / 2, 0), P(-b / 2 + x, y)
    centre = (A + B + C) / 3
    milieu_h = P(0, (max(0, y) + min(0, y)) / 2)
    return [A - milieu_h, B - milieu_h, C - milieu_h]


def poly(points, fond=FOND_TRI, bord=FOND_TRI_B, op=1.0, sw=4):
    return Polygon(*points, fill_color=fond, fill_opacity=op, stroke_color=bord, stroke_width=sw)


def etiquette(p, i, s, fs=28, couleur=JAUNE_TITRE, ecart=0.42):
    """L'étiquette du côté i (du sommet i au sommet i+1) du polygone p, posée DEHORS, au milieu.
    Hors audit : la longueur est dite par la ligne de calcul, pas par l'étiquette."""
    v = p.get_vertices()
    a, b = v[i], v[(i + 1) % len(v)]
    c = sum(v) / len(v)
    m = (a + b) / 2
    n = m - c
    n = n / (np.linalg.norm(n) or 1)
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    t.move_to(m + n * (ecart + max(t.width, t.height) * 0.35))
    return hors_audit(t)


def cote_tour(p, i, couleur=TOUR, sw=11):
    """Le côté i du polygone p, repassé en orange (un morceau du tour)."""
    v = p.get_vertices()
    return Line(v[i], v[(i + 1) % len(v)], color=couleur, stroke_width=sw)


def tour(p, couleur=TOUR, sw=11):
    """Tout le tour du polygone p, en orange."""
    return p.copy().set_fill(opacity=0).set_stroke(couleur, sw)


def fanion(base=20, g=25, d=25, u=0.11, fond=FOND_TRI, bord=FOND_TRI_B):
    """Un fanion : un triangle pointe en bas, la base en haut (là où passe la ficelle)."""
    return poly(pts_triangle(base, g, d, u, pointe_en_bas=True), fond, bord)


def nina(s=1.0):
    """Nina, décoratrice de fêtes : robe rose, cheveux longs, un petit fanion dans les cheveux."""
    p = personne(peau="#c68642", tenue="#db2777", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    f = Polygon(P(-0.5, 0), P(0.5, 0), P(0, -0.7), fill_color="#fde047", fill_opacity=1, stroke_width=0)
    f.scale(r * 0.55).move_to(c + P(r * 0.75, r * 0.85))
    p.add(f)
    return p


def lucas(s=1.0):
    """Lucas, encadreur : tablier marron, chemise beige."""
    p = personne(peau="#f1c27d", tenue="#92400e", cheveux="#78350f", s=s)
    return p


def emma(s=1.0):
    """Emma, menuisière : salopette verte, casquette grise."""
    p = personne(peau="#e0ac69", tenue="#166534", cheveux="#b45309", longs=True, s=s)
    p.add(casquette(p, "#9ca3af"))
    return p


def karim(s=1.0):
    """Karim, éleveur de chevaux : chemise à carreaux rouge, chapeau marron."""
    p = personne(peau="#8d5524", tenue="#b91c1c", cheveux="#111827", s=s)
    p.add(casquette(p, "#78350f"))
    return p


class PaysagePerimetreCM1(PhraseAGauche, PaysageAireCM1):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
