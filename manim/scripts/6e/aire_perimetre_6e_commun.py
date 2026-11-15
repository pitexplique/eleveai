# aire_perimetre_6e_commun.py
# EleveAI — Maths 6e — série « Périmètre » (15/11/2026) : ce qui sert aux 2 paysages
# aire_perimetre_rectangle (P1, Lucas) et aire_perimetre_defi (P2, Chloé).
# Base : manim/scripts/cm2/perimetre_cm2_commun.py (PaysagePerimetreCM2, pts_rect, etiquettes, tour,
# cote_tour…), importée SANS la modifier. Ici : identité 6e et les personnages-métiers du lot.
# Voix : manim/voix/6e-aire-perimetre-<ep>.json (validées par Frédéric le 15/11, Julie, débit −6) ;
# marques : python manim/scripts/6e/aire_perimetre_marques.py <ep>   (⛔ jamais sans argument).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm2"))

from perimetre_cm2_commun import *  # noqa: E402,F401,F403

PELOUSE, PELOUSE_B = "#16a34a", "#14532d"
TERRE, TERRE_B = "#a16207", "#422006"
MASSIF, MASSIF_B = "#db2777", "#831843"
CLOTURE = "#f97316"      # la clôture / le ruban : le tour, orange
BOITE, BOITE_B = "#f9a8d4", "#9d174d"


def rect(L, l, u, pos, fond=PELOUSE, bord=PELOUSE_B):
    return poly(pts_rect(L, l, u), fond, bord).move_to(pos)


def lucas(s=1.0):
    """Lucas, paysagiste : tenue verte, chapeau de jardin beige."""
    p = personne(peau="#f1c27d", tenue="#15803d", cheveux="#78350f", s=s)
    p.add(casquette(p, "#d6d3d1"))
    return p


def chloe(s=1.0):
    """Chloé, fleuriste : tablier rose, cheveux longs, une fleur dans les cheveux."""
    p = personne(peau="#e0ac69", tenue="#db2777", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    fleur = VGroup(*[Circle(radius=r * 0.18, fill_color="#fde047", fill_opacity=1, stroke_width=0)
                     .move_to(c + P(r * 0.8, r * 0.75) + r * 0.2 * np.array([np.cos(a), np.sin(a), 0]))
                     for a in np.linspace(0, 2 * PI, 5, endpoint=False)])
    fleur.add(Circle(radius=r * 0.12, fill_color="#f97316", fill_opacity=1, stroke_width=0)
              .move_to(c + P(r * 0.8, r * 0.75)))
    p.add(fleur)
    return p


class PaysagePerimetre6e(PaysagePerimetreCM2):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
