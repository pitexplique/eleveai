# perimetre_cm2_commun.py
# EleveAI — Maths CM2 — série « Périmètre » (14/11/2026) : ce qui sert aux 5 paysages
# perimetre_comprendre, perimetre_triangle, perimetre_quadrilatere, perimetre_polygone, perimetre_defi.
# Base : manim/scripts/cm1/perimetre_cm1_commun.py (PaysagePerimetreCM1, PhraseAGauche, etiquette, tour…),
# importée SANS la modifier. Ici : identité CM2, les outils polygones (rectangle, polygone régulier,
# croix, numéros), le quadrillage, les personnages-métiers du lot (Noah, Maëlle, Rayan, Inaya, Malo).
# Voix : manim/voix/cm2-perimetre-<ep>.json (validées le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/perimetre_marques.py <ep>   (⛔ jamais sans argument).
# La voix dit « 6 virgule 5 », l'écran écrit « 6,5 » : la base (VoixDecimale du 6e) normalise ;
# dans une scène : self.au_mot("6,5 mètres").

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from perimetre_cm1_commun import *  # noqa: E402,F401,F403

CROIX = "#facc15"       # la coche posée sur un côté déjà compté
GRILLE = "#475569"      # le quadrillage


def pts_rect(L, l, u=0.06):
    """Un rectangle par sa longueur L et sa largeur l (échelle u), centré.
    Sommets : 0 en haut à gauche, 1 en haut à droite, 2 en bas à droite, 3 en bas à gauche.
    Côtés : 0 haut, 1 droite, 2 bas, 3 gauche."""
    a, b = L * u / 2, l * u / 2
    return [P(-a, b), P(a, b), P(a, -b), P(-a, -b)]


def pts_regulier(n, cote, u=0.1, tourner=0.0):
    """Les sommets d'un polygone régulier à n côtés de longueur `cote` (échelle u), un côté
    horizontal EN BAS, centré sur l'origine. Sommet 0 = en bas à gauche, puis dans le sens inverse
    des aiguilles d'une montre (côté 0 = le côté du bas)."""
    r = cote * u / (2 * np.sin(PI / n))
    a0 = -PI / 2 - PI / n + tourner
    return [P(r * np.cos(a0 + 2 * PI * k / n), r * np.sin(a0 + 2 * PI * k / n)) for k in range(n)]


def etiquettes(p, textes, cotes=None, fs=26, ecart=0.32, couleur=JAUNE_TITRE):
    """Les étiquettes des côtés `cotes` (tous par défaut) du polygone p, dehors, hors audit."""
    cotes = range(len(textes)) if cotes is None else cotes
    return VGroup(*[etiquette(p, i, s, fs, couleur, ecart) for i, s in zip(cotes, textes)])


def croix(p, i, couleur=CROIX, t=0.15, sw=6):
    """Une petite croix posée SUR le côté i du polygone p (au milieu) : le côté est compté."""
    v = p.get_vertices()
    m = (v[i] + v[(i + 1) % len(v)]) / 2
    return VGroup(Line(m + P(-t, -t), m + P(t, t), color=couleur, stroke_width=sw),
                  Line(m + P(-t, t), m + P(t, -t), color=couleur, stroke_width=sw))


def numero(p, i, s, fs=24, couleur=WHITE, ecart=0.42):
    """Le numéro du côté i, posé DEDANS, près du milieu du côté (hors audit)."""
    v = p.get_vertices()
    c = sum(v) / len(v)
    m = (v[i] + v[(i + 1) % len(v)]) / 2
    n = c - m
    n = n / (np.linalg.norm(n) or 1)
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(m + n * ecart))


def quadrillage(n_col, n_rang, c=0.5, couleur=GRILLE, sw=1.5):
    """Un quadrillage de n_col × n_rang carreaux de côté c, coin haut gauche en (0, 0)."""
    g = VGroup()
    for i in range(n_col + 1):
        g.add(Line(P(i * c, 0), P(i * c, -n_rang * c), color=couleur, stroke_width=sw))
    for j in range(n_rang + 1):
        g.add(Line(P(0, -j * c), P(n_col * c, -j * c), color=couleur, stroke_width=sw))
    return g


def bord_cases(cases, c=0.5):
    """Les segments de carreau du BORD d'une figure en carreaux (cases = (colonne, rangée), rangée 0
    en haut, carreau (i, j) centré en (i c, −j c)) : chaque côté de carreau qui ne touche pas un autre
    carreau de la figure. Renvoie la liste de (a, b), dans l'ordre du tour quand c'est possible."""
    S = set(cases)
    segs = []
    for (i, j) in cases:
        x0, x1, y0, y1 = (i - 0.5) * c, (i + 0.5) * c, -(j - 0.5) * c, -(j + 0.5) * c
        if (i, j - 1) not in S:
            segs.append((P(x0, y0), P(x1, y0)))
        if (i + 1, j) not in S:
            segs.append((P(x1, y0), P(x1, y1)))
        if (i, j + 1) not in S:
            segs.append((P(x1, y1), P(x0, y1)))
        if (i - 1, j) not in S:
            segs.append((P(x0, y1), P(x0, y0)))
    # remise dans l'ordre du tour : chaque segment commence où finit le précédent
    ordre, reste = [segs[0]], segs[1:]
    while reste:
        fin = ordre[-1][1]
        k = next((n for n, s in enumerate(reste) if np.linalg.norm(s[0] - fin) < 1e-6), 0)
        ordre.append(reste.pop(k))
    return ordre


def traits_dedans(cases, c=0.5):
    """Les côtés de carreau INTÉRIEURS (partagés par deux carreaux de la figure)."""
    S = set(cases)
    segs = []
    for (i, j) in cases:
        x0, x1, y0, y1 = (i - 0.5) * c, (i + 0.5) * c, -(j - 0.5) * c, -(j + 0.5) * c
        if (i + 1, j) in S:
            segs.append((P(x1, y0), P(x1, y1)))
        if (i, j + 1) in S:
            segs.append((P(x1, y1), P(x0, y1)))
    return segs


# ── Les personnages du lot ─────────────────────────────────────────────────
def noah(s=1.0):
    """Noah, régisseur de concerts : tee-shirt noir, casque audio autour du cou."""
    p = personne(peau="#c68642", tenue="#111827", cheveux="#1f2937", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    arc = Arc(radius=r * 0.9, start_angle=PI * 1.15, angle=PI * 0.7, color="#ef4444", stroke_width=6 * s)
    arc.move_to(c + P(0, -r * 1.25))
    oreilles = VGroup(*[Circle(radius=r * 0.2, fill_color="#ef4444", fill_opacity=1, stroke_width=0)
                        .move_to(arc.get_corner(UL if k == 0 else UR)) for k in range(2)])
    p.add(arc, oreilles)
    return p


def maelle(s=1.0):
    """Maëlle, voilière : marinière bleue, cheveux longs blonds, petit foulard rouge."""
    p = personne(peau="#f1c27d", tenue="#1d4ed8", cheveux="#d97706", longs=True, s=s)
    for k in range(3):
        y = p.corps.get_top()[1] - (0.35 + 0.35 * k) * s
        p.add(Line(P(p.corps.get_left()[0] + 0.25 * s, y), P(p.corps.get_right()[0] - 0.25 * s, y),
                   color=WHITE, stroke_width=5 * s))
    return p


def rayan(s=1.0):
    """Rayan, jardinier de stade : tenue verte, casquette blanche."""
    p = personne(peau="#8d5524", tenue="#15803d", cheveux="#111827", s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def inaya(s=1.0):
    """Inaya, créatrice de bijoux : tenue violette, cheveux longs, un pendentif hexagone doré."""
    p = personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#1f2937", longs=True, s=s)
    h = RegularPolygon(6, fill_color="#fbbf24", fill_opacity=1, stroke_color="#e5e7eb", stroke_width=2 * s)
    h.scale(0.14 * s).move_to(p.corps.get_top() + DOWN * 0.35 * s)
    p.add(h)
    return p


def malo(s=1.0):
    """Malo, technicien en robotique : combinaison grise, casquette orange."""
    p = personne(peau="#f1c27d", tenue="#475569", cheveux="#78350f", s=s)
    p.add(casquette(p, "#f97316"))
    return p


class PaysagePerimetreCM2(PaysagePerimetreCM1):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
