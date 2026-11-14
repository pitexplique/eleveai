# aire_cm2_commun.py
# EleveAI — Maths CM2 — série « Aire » (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux 7 paysages aire_comprendre, aire_unites, aire_convertir_unites, aire_carre_rectangle,
# aire_triangle_rectangle, aire_composer, aire_defi.
# Base : le commun du CM1 (manim/scripts/cm1/aire_cm1_commun.py : carreaux, contour, numéros, pile,
# mixin PhraseAGauche), IMPORTÉ sans le modifier. Ici : l'identité CM2 et les personnages-métiers du lot.
# Voix : manim/voix/cm2-aire-<slug>.json (validées le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/aire_marques_cm2.py <slug> (⛔ jamais sans argument).
# Les outils propres à un épisode restent dans son script (pas ici : 7 scripts écrits en parallèle).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from aire_cm1_commun import *  # noqa: E402,F401,F403
from aire_cm1_commun import PhraseAGauche, PaysageAireCM1  # noqa: E402,F401

TRIANGLE_C, TRIANGLE_B = "#fb923c", "#7c2d12"   # demi-carrés / triangles (orange clair)


def coiffe(p, couleur, haut=0.75, large=2.2, hauteur=0.9):
    """Une toque / un bonnet posé sur la tête (rectangle arrondi)."""
    c, r = p.tete.get_center(), p.tete.width / 2
    t = RoundedRectangle(width=r * large, height=r * hauteur, corner_radius=r * 0.3, fill_color=couleur,
                         fill_opacity=1, stroke_width=0).move_to(c + UP * r * (haut + hauteur / 2))
    return t


def elsa(s=1.0):
    """Elsa, couturière de patchwork : robe rose, mètre ruban jaune autour du cou."""
    p = personne(peau="#f1c27d", tenue="#db2777", cheveux="#78350f", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    ruban = VGroup(Line(c + P(-r * 0.7, -r * 1.05), c + P(-r * 0.5, -r * 3.0), stroke_color="#facc15", stroke_width=8),
                   Line(c + P(r * 0.7, -r * 1.05), c + P(r * 0.5, -r * 3.0), stroke_color="#facc15", stroke_width=8))
    p.add(ruban)
    return p


def tom(s=1.0):
    """Tom, imprimeur : tablier gris foncé, casquette rouge."""
    p = personne(peau="#e0ac69", tenue="#374151", cheveux="#92400e", s=s)
    p.add(casquette(p, "#dc2626"))
    return p


def kenzo(s=1.0):
    """Kenzo, vitrier : tenue bleu marine, gants (casquette bleu ciel)."""
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", s=s)
    p.add(casquette(p, "#38bdf8"))
    return p


def yasmine(s=1.0):
    """Yasmine, installatrice de panneaux solaires : gilet orange, casque de chantier jaune."""
    p = personne(peau="#c68642", tenue="#ea580c", cheveux="#1f2937", longs=True, s=s)
    p.add(casquette(p, "#facc15"))
    return p


def baptiste(s=1.0):
    """Baptiste, chef traiteur : veste blanche, toque blanche."""
    p = personne(peau="#f1c27d", tenue="#f8fafc", cheveux="#78350f", s=s)
    p.add(coiffe(p, "#ffffff", haut=0.55, large=1.9, hauteur=1.3))
    return p


def nadia(s=1.0):
    """Nadia, soigneuse animalière (CM2) : tenue kaki, chapeau de brousse."""
    p = personne(peau="#a16207", tenue="#4d7c0f", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 2.9, height=r * 0.5, fill_color="#a3a35b", fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.85, angle=PI, start_angle=0, fill_color="#a3a35b",
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    p.add(dome, bord)
    return p


def romane(s=1.0):
    """Romane, conceptrice de skateparks : sweat turquoise, casque de skate violet."""
    p = personne(peau="#e0ac69", tenue="#0d9488", cheveux="#b45309", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(AnnularSector(inner_radius=0, outer_radius=r * 1.1, angle=PI, start_angle=0, fill_color="#7c3aed",
                        fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.5))
    return p


def m2(texte, fs=32, couleur=WHITE):
    """Une étiquette d'aire hors audit (« 12 m² » déjà dit, ou lu sur la figure)."""
    return hors_audit(Text(texte, font_size=fs, color=couleur, weight=BOLD))


class PaysageAireCM2(PaysageAireCM1):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"


class PaysageAireCM2G(PhraseAGauche, PaysageAireCM2):
    """La base avec la phrase de réponse à gauche (question_gauche) : celle des épisodes."""
    pass
