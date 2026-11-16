# duree_cm1_commun.py
# EleveAI — Maths CM1 — série « Durées » (16/11/2026, thème GRANDEURS ET MESURES, série CP → 6e) :
# ce qui sert aux paysages duree_convertir, duree_calculer (PILOTE), duree_probleme, duree_defi.
# (duree_lire et duree_positionner_aiguilles : vidéos CE2 branchées par `aussi`.)
# Base : longueur_cm1_commun (PaysageLongueurCM1 → synchro voix, audit, question-pause, finale, fin),
# importée sans la modifier ; le dessin des durées vient de manim/scripts/cp/duree_commun.py (commun CP → 6e).
# Méthode CM1 : une durée se calcule par BONDS sur une frise, en passant par l'heure pile ;
# jamais de soustraction posée en base 60.
# Voix : manim/voix/cm1-duree-<ep>.json (⏳ à valider par Frédéric avant tout WAV) ;
# marques : python manim/scripts/cm1/aire_marques.py duree:<ep>  (⛔ jamais sans argument).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cp"))

from longueur_cm1_commun import *  # noqa: E402,F401,F403
from duree_commun import (  # noqa: E402,F401
    AIG_H, AIG_M, AIG_S, BOND, BOND2, CADRAN, FRISE, bond, duree_txt, ecran_digital, frise, hm, horloge,
    regler, secteur_minutes, tableau_hms, tourner,
)


# ── Les personnages-métiers du lot CM1 ──────────────────────────────────────

def theo(s=1.0):
    """Théo, contrôleur aérien : chemise bleu ciel, casque audio noir avec micro."""
    p = personne(peau="#8d5524", tenue="#38bdf8", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    arceau = Arc(radius=r * 1.15, start_angle=0.25, angle=PI - 0.5, color="#334155", stroke_width=6 * s)
    arceau.move_to(c + UP * r * 0.95)
    ecg = RoundedRectangle(width=r * 0.45, height=r * 0.75, corner_radius=r * 0.12, fill_color="#111827",
                           fill_opacity=1, stroke_width=0).move_to(c + LEFT * r * 1.05)
    ecd = ecg.copy().move_to(c + RIGHT * r * 1.05)
    micro = Line(c + P(r * 1.05, -r * 0.2), c + P(r * 0.35, -r * 0.75), color="#111827", stroke_width=5 * s)
    p.add(arceau, ecg, ecd, micro)
    return p


def louise(s=1.0):
    """Louise, sage-femme : blouse vert d'eau, chignon."""
    p = personne(peau="#f1c27d", tenue="#5eead4", cheveux="#7c2d12", longs=False, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Circle(radius=r * 0.38, fill_color="#7c2d12", fill_opacity=1, stroke_width=0).move_to(c + UP * r * 1.15))
    return p


def salome(s=1.0):
    """Salomé, conductrice de tramway : veste rouge, casquette grise."""
    p = personne(peau="#a16207", tenue="#dc2626", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#6b7280"))
    return p


def bastien(s=1.0):
    """Bastien, chef de chantier : gilet orange fluo, casque blanc."""
    p = personne(peau="#e0ac69", tenue="#f97316", cheveux="#78350f", s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def avion(s=1.0, couleur="#e2e8f0"):
    """Un avion de profil, nez à droite."""
    corps = RoundedRectangle(width=2.0 * s, height=0.36 * s, corner_radius=0.18 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
    aile = Polygon(P(-0.1, 0), P(0.35, 0), P(-0.35, -0.75), P(-0.6, -0.75), fill_color="#94a3b8",
                   fill_opacity=1, stroke_width=0).scale(s, about_point=ORIGIN)
    queue = Polygon(P(-1.0, 0.05), P(-0.7, 0.05), P(-0.95, 0.6), P(-1.1, 0.6), fill_color="#ef4444",
                    fill_opacity=1, stroke_width=0).scale(s, about_point=ORIGIN)
    hublots = VGroup(*[Dot(P(x * s, 0.04 * s), radius=0.045 * s, color="#1e3a8a") for x in (-0.4, -0.15, 0.1, 0.35)])
    nez = Dot(P(0.88 * s, 0.03 * s), radius=0.07 * s, color="#1e3a8a")
    return VGroup(queue, corps, aile, hublots, nez)


def tour_controle(s=1.0):
    """La tour de contrôle : un fût et sa cabine vitrée."""
    fut = Rectangle(width=0.35 * s, height=1.6 * s, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    cab = Polygon(P(-0.55, 0), P(0.55, 0), P(0.42, -0.45), P(-0.42, -0.45), fill_color="#38bdf8",
                  fill_opacity=1, stroke_color=WHITE, stroke_width=2).scale(s, about_point=ORIGIN)
    toit = Rectangle(width=1.2 * s, height=0.12 * s, fill_color="#475569", fill_opacity=1, stroke_width=0)
    cab.next_to(fut, UP, buff=0)
    toit.next_to(cab, UP, buff=0)
    return VGroup(fut, cab, toit)


class PaysageDureeCM1(PaysageLongueurCM1):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
