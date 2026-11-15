# longueur_cm2_commun.py
# EleveAI — Maths CM2 — série « Longueurs » (15/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux 4 paysages longueur_comparer, longueur_convertir, longueur_estimer, longueur_defi.
# Base : le commun du CM1 (manim/scripts/cm1/longueur_cm1_commun.py : règle graduée, ruban, tableau de
# conversion km → mm, schéma en barre, accolade, crayon ; PaysageLongueurCM1 = PhraseAGauche + base),
# IMPORTÉ sans le modifier. Ici : l'identité CM2, LigneAlignee (aire_cm2_commun) et les personnages du lot.
# ⚠️ L'ancien prototype manim/scripts/cm2/longueur.py (juillet) n'a rien à voir : ne pas le toucher.
# Voix : manim/voix/cm2-longueur-<ep>.json (validées le 15/11, Julie, débit −6) ;
# marques : manim/scripts/cm2/longueur_<ep>_marques.json (python manim/scripts/cm2/aire_marques_cm2.py longueur:<ep>,
# ⛔ jamais sans argument). Les outils propres à un épisode restent dans son script.

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[0] / "cm1"))
sys.path.insert(1, str(ICI))

from longueur_cm1_commun import *  # noqa: E402,F401,F403
from longueur_cm1_commun import PaysageLongueurCM1  # noqa: E402,F401
from aire_cm2_commun import LigneAlignee, aligner_base, ligne_de_base, coiffe  # noqa: E402,F401

FIBRE = "#22d3ee"      # le câble de fibre optique (cyan)
PISTE = "#fb923c"      # le sentier de trail (orange)


def leonie(s=1.0):
    """Léonie, coureuse de trail : maillot orange, bandeau turquoise, dossard blanc."""
    p = personne(peau="#c68642", tenue="#ea580c", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Rectangle(width=r * 2.0, height=r * 0.32, fill_color="#14b8a6", fill_opacity=1, stroke_width=0)
          .move_to(c + UP * r * 0.55))
    p.add(Rectangle(width=r * 1.1, height=r * 0.8, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
          .move_to(c + DOWN * r * 2.6))
    return p


def arthur(s=1.0):
    """Arthur, géomètre : gilet jaune fluo, casque blanc."""
    p = personne(peau="#f1c27d", tenue="#d9f99d", cheveux="#78350f", s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def mia(s=1.0):
    """Mia, photographe animalière : veste kaki, appareil photo noir au cou."""
    p = personne(peau="#8d5524", tenue="#65a30d", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    boitier = RoundedRectangle(width=r * 1.3, height=r * 0.85, corner_radius=r * 0.12, fill_color="#111827",
                               fill_opacity=1, stroke_color="#9ca3af", stroke_width=2).move_to(c + DOWN * r * 2.3)
    objectif = Circle(radius=r * 0.3, fill_color="#374151", fill_opacity=1, stroke_color="#e5e7eb",
                      stroke_width=2).move_to(boitier)
    p.add(boitier, objectif)
    return p


def nathan(s=1.0):
    """Nathan, technicien fibre optique : combinaison bleue, casque orange, câble cyan à l'épaule."""
    p = personne(peau="#a16207", tenue="#1d4ed8", cheveux="#111827", s=s)
    p.add(casquette(p, "#f97316"))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Circle(radius=r * 0.55, color=FIBRE, stroke_width=7 * s).move_to(c + P(r * 1.3, -r * 2.2)))
    return p


class PaysageLongueurCM2(LigneAlignee, PaysageLongueurCM1):
    """La base des 4 épisodes : PhraseAGauche (question_gauche) + ligne posée sur la ligne d'écriture."""
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
