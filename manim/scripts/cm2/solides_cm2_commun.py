# solides_cm2_commun.py
# EleveAI — Maths CM2 — série « Solides » (15/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux 6 paysages solides_reconnaitre, solides_sommets_aretes_faces, solides_faces,
# solides_patron, solides_patron_construire, solides_defi.
# Base : le commun CM1 (manim/scripts/cm1/solides_cm1_commun.py : prisme, tente, regulier, PatronLibre,
# patron_pyramide / patron_pave / patron_tente, PATRONS du cube (croix, decale, escalier…), Empilement,
# pave_cubes), lui-même sur le commun CE2 (Solide en cavalière, arêtes cachées en pointillés, cube, pave,
# pyramide, Cylindre, Cone, Boule, rouler, Patron qui se plie, patron_plat, rep_lignes, etiquette,
# compter), IMPORTÉS sans les modifier.
# Ici : l'identité CM2 et les personnages-métiers du lot (Gabriel, Lisa, Victor, Julia, Anna, Ethan).
# Les outils propres à un épisode restent dans son script (6 scripts écrits en parallèle).
# Voix : manim/voix/cm2-solides-<slug>.json (validées le 15/11, Julie, débit −6) ;
# marques : manim/scripts/cm2/solides_<slug _>_marques.json
# (python manim/scripts/cm2/aire_marques_cm2.py solides:<slug>, ⛔ jamais sans argument).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from solides_cm1_commun import *  # noqa: E402,F401,F403
from solides_cm1_commun import _rot, _normale, PaysageSolidesCM1  # noqa: E402,F401


def _tete(p):
    return p.tete.get_center(), p.tete.width / 2


def gabriel(s=1.0):
    """Gabriel, ingénieur spatial : combinaison blanche, écusson bleu, petite fusée à la main."""
    p = visage(personne(peau="#f1c27d", tenue="#e5e7eb", cheveux="#1f2937", s=s))
    c, r = _tete(p)
    p.add(Circle(radius=r * 0.28, fill_color="#2563eb", fill_opacity=1, stroke_width=0)
          .move_to(c + P(-r * 0.55, -r * 2.3)))
    fus = VGroup(RoundedRectangle(width=r * 0.4, height=r * 1.1, corner_radius=r * 0.15, fill_color=WHITE,
                                  fill_opacity=1, stroke_color="#1f2937", stroke_width=2),
                 Triangle(fill_color="#dc2626", fill_opacity=1, stroke_width=0).scale(r * 0.25)
                 .shift(UP * r * 0.68))
    p.add(fus.move_to(c + P(r * 1.9, -r * 1.7)))
    return p


def lisa(s=1.0):
    """Lisa, sculptrice : tablier vert, foulard, un petit cube de pierre à côté."""
    p = visage(personne(peau="#c68642", tenue="#15803d", cheveux="#7c2d12", longs=True, s=s))
    c, r = _tete(p)
    p.add(Rectangle(width=r * 2.0, height=r * 0.3, fill_color="#facc15", fill_opacity=1, stroke_width=0)
          .move_to(c + UP * r * 0.8))
    p.add(Square(side_length=r * 0.8, fill_color="#d6d3d1", fill_opacity=1, stroke_color="#57534e",
                 stroke_width=2).move_to(c + P(r * 1.9, -r * 2.0)))
    return p


def victor(s=1.0):
    """Victor, chocolatier : veste blanche, toque marron, tablette de chocolat."""
    p = visage(personne(peau="#8d5524", tenue="#f8fafc", cheveux="#111827", s=s))
    c, r = _tete(p)
    p.add(RoundedRectangle(width=r * 1.9, height=r * 1.2, corner_radius=r * 0.3, fill_color="#78350f",
                           fill_opacity=1, stroke_width=0).move_to(c + UP * r * 1.2))
    tab = VGroup(*[Square(side_length=r * 0.38, fill_color="#5b2a0e", fill_opacity=1, stroke_color="#3f1d08",
                          stroke_width=1.5).move_to(c + P(r * (1.55 + 0.4 * i), -r * (1.6 + 0.4 * j)))
                   for i in range(2) for j in range(3)])
    p.add(tab)
    return p


def julia(s=1.0):
    """Julia, maquettiste : pull orange, lunettes, crayon derrière l'oreille."""
    p = visage(personne(peau="#f1c27d", tenue="#ea580c", cheveux="#b45309", longs=True, s=s))
    c, r = _tete(p)
    p.add(VGroup(*[Circle(radius=0.22 * r, stroke_color="#111827", stroke_width=3).move_to(c + P(x * r, -0.18 * r))
                   for x in (-0.36, 0.36)]))
    p.add(Line(c + P(r * 0.85, r * 0.6), c + P(r * 1.35, r * 0.05), stroke_color="#facc15", stroke_width=6))
    return p


def anna(s=1.0):
    """Anna, créatrice de lanternes : tenue violette, une lanterne allumée à la main."""
    p = visage(personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#111827", longs=True, s=s))
    c, r = _tete(p)
    lan = VGroup(RoundedRectangle(width=r * 0.75, height=r * 1.0, corner_radius=r * 0.15, fill_color="#fde047",
                                  fill_opacity=1, stroke_color="#b45309", stroke_width=2),
                 Line(UP * r * 0.5, UP * r * 0.8, stroke_color="#b45309", stroke_width=3))
    p.add(lan.move_to(c + P(r * 1.9, -r * 1.8)))
    return p


def ethan(s=1.0):
    """Ethan, fabricant d'aquariums : tenue bleu canard, casquette, un petit poisson orange."""
    p = visage(personne(peau="#a16207", tenue="#0e7490", cheveux="#111827", s=s))
    c, r = _tete(p)
    p.add(casquette(p, "#38bdf8"))
    poisson = VGroup(Ellipse(width=r * 0.8, height=r * 0.45, fill_color="#f97316", fill_opacity=1, stroke_width=0),
                     Triangle(fill_color="#f97316", fill_opacity=1, stroke_width=0).scale(r * 0.2)
                     .rotate(-PI / 2).shift(LEFT * r * 0.5))
    p.add(poisson.move_to(c + P(r * 1.9, -r * 1.8)))
    return p


class PaysageSolidesCM2(PaysageSolidesCM1):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
