# aire_6e_commun.py
# EleveAI — Maths 6e — lot AIRE (15/11/2026, série périmètre-aire-longueurs de la 6e) :
# ce qui sert aux 4 paysages aire_rectangle (A1), aire_comparer (A2), aire_probleme (A3), aire_defi (A4).
# Base : le commun CM2 (manim/scripts/cm2/aire_cm2_commun.py → commun CM1 : carreaux, contour, numéros, pile,
# PhraseAGauche, LigneAlignee, m2, TRIANGLE_C), IMPORTÉ sans le modifier. Ici : l'identité 6e et les personnages.
# Voix : manim/voix/6e-aire-<ep>.json (validées par Frédéric le 15/11, Julie, débit −6) ;
# marques : python manim/scripts/6e/aire_surface_marques.py <ep> (⛔ jamais sans argument).
# Les outils propres à un épisode restent dans son script (4 scripts écrits en parallèle).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm2"))

from aire_cm2_commun import *  # noqa: E402,F401,F403
from aire_cm2_commun import PhraseAGauche, PaysageAireCM1, LigneAlignee, aligner_base  # noqa: E402,F401


def amina(s=1.0):
    """Amina, jardinière : salopette verte, chapeau de paille."""
    p = personne(peau="#8d5524", tenue="#16a34a", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.55, fill_color="#eab308", fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.85, angle=PI, start_angle=0, fill_color="#eab308",
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    p.add(dome, bord)
    return p


def lena(s=1.0):
    """Léna, agente immobilière : veste bleu marine, foulard rouge."""
    p = personne(peau="#f1c27d", tenue="#1e3a8a", cheveux="#b45309", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Triangle(fill_color="#dc2626", fill_opacity=1, stroke_width=0).scale(r * 0.45).rotate(PI)
          .move_to(c + DOWN * r * 1.35))
    return p


def yanis(s=1.0):
    """Yanis, maçon (6e) : tenue grise, casque de chantier orange (≠ yanis architecte du CM1)."""
    p = personne(peau="#8d5524", tenue="#6b7280", cheveux="#111827", s=s)
    p.add(casquette(p, "#f97316"))
    return p


def theo(s=1.0):
    """Théo, technicien en énergies renouvelables : combinaison jaune, casque blanc."""
    p = personne(peau="#e0ac69", tenue="#ca8a04", cheveux="#78350f", s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


class PaysageAire6e(PaysageAireCM1):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"


class PaysageAire6eG(LigneAlignee, PhraseAGauche, PaysageAire6e):
    """La base des 4 épisodes : phrase de réponse à gauche (question_gauche), morceaux d'une ligne
    posés sur la même ligne d'écriture (LigneAlignee)."""
    pass
