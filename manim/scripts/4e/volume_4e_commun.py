# volume_4e_commun.py
# EleveAI — Maths 4e (et 3e) — série « Périmètre, aire, volume, solides » (2e poste, 15/11/2026).
# Base : le commun de la série 5e (manim/scripts/5e/aire_volume_5e_commun.py → CM2 → CM1 → 6e :
# synchro par jetons, audit, question-pause, finale, fin du 05/11, et les solides en cavalière
# pave() / prisme_tri() / cylindre()), IMPORTÉ sans le modifier.
# Ici : l'identité 4e et 3e, les solides NEUFS du cycle 4 (pyramide, cône), et les personnages du lot.
# ⛔ Le short de la 4e et au-dessus est en MANIM, pas en dessin animé (REGLES.md, 09/11/2026),
# et il porte toujours un défi (Frédéric, 15/11/2026).
# Voix : manim/voix/4e-<micro en tirets>.json ; marques : python manim/scripts/4e/volume_4e_marques.py <slug>.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "5e"))

from aire_volume_5e_commun import *  # noqa: E402,F401,F403
from aire_volume_5e_commun import FUITE, point3, pave, prisme_tri, cylindre, Paysage5e  # noqa: E402,F401

# Les couleurs du lot : la base bleue (BASE_C) et la hauteur verte (HAUTEUR_C) viennent du commun 5e.
PYR_FACE, PYR_COTE, PYR_BORD = "#c084fc", "#7e22ce", "#3b0764"   # la pyramide (violet)
PRI_FACE, PRI_DESSUS, PRI_COTE = "#38bdf8", "#7dd3fc", "#0284c7"  # le prisme de comparaison (bleu)
SABLE_C = "#fcd34d"                                               # le sable qu'on verse
TOILE_C, TOILE_B = "#f1f5f9", "#64748b"                           # la toile de la tonnelle


# ── les solides neufs du cycle 4 ──────────────────────────────────────────────

def pyramide(cote, haut, u, o=ORIGIN, prof=None, face=PYR_FACE, cote_c=PYR_COTE, bord=PYR_BORD, sw=4, op=1.0,
             sommet_x=None):
    """Une pyramide à base rectangulaire, en cavalière, posée sur sa base ; `o` = le coin avant-bas-GAUCHE
    de la base, `cote` = la largeur de la base, `prof` = sa profondeur (par défaut `cote` : base carrée),
    `haut` = la hauteur (du sommet à la base, bien droite). `sommet_x` décale le sommet (pyramide penchée).
    Attributs : .base (le parallélogramme de la base) .faces .S (sommet) .H (pied de la hauteur)
    .hh (la hauteur, pointillée verte) .eq (l'équerre) .arete (une arête du sommet à un coin : le piège)
    .pt(x, y, z) .u .o .cote .prof .haut"""
    p = cote if prof is None else prof
    q = lambda x, y, z: point3(o, u, x, y, z)  # noqa: E731
    xs = cote / 2 if sommet_x is None else sommet_x
    A, B, C, D = q(0, 0, 0), q(cote, 0, 0), q(cote, p, 0), q(0, p, 0)
    S = q(xs, p / 2, haut)
    H = q(xs, p / 2, 0)
    base = Polygon(A, B, C, D, fill_color=cote_c, fill_opacity=op * 0.55, stroke_color=bord, stroke_width=sw)
    # les deux faces visibles (avant et droite), la gauche et l'arrière cachées
    f_av = Polygon(A, B, S, fill_color=face, fill_opacity=op, stroke_color=bord, stroke_width=sw)
    f_dr = Polygon(B, C, S, fill_color=cote_c, fill_opacity=op, stroke_color=bord, stroke_width=sw)
    caches = VGroup(DashedLine(D, S, dash_length=0.1), DashedLine(A, D, dash_length=0.1),
                    DashedLine(D, C, dash_length=0.1)).set_stroke(bord, sw * 0.6)
    v = VGroup(base, caches, f_dr, f_av)
    v.base, v.faces, v.caches = base, VGroup(f_av, f_dr), caches
    v.A, v.B, v.C, v.D, v.S, v.H = A, B, C, D, S, H
    v.hh = DashedLine(S, H, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
    v.eq = equerre(H, np.array([FUITE[0], FUITE[1], 0.0]) / np.hypot(*FUITE), UP, 0.18, HAUTEUR_C)
    v.arete = Line(S, A, color=ROUGE_ERREUR, stroke_width=7)
    v.base_trait = Line(A, B, color=BASE_C, stroke_width=9)
    v.pt, v.u, v.o, v.cote, v.prof, v.haut = q, u, o, cote, p, haut
    return v


def cone(r, haut, u, o=ORIGIN, corps="#fb923c", disque="#fdba74", bord="#7c2d12", sw=4, aplat=0.32, op=1.0):
    """Un cône de révolution debout, rayon r, hauteur `haut` ; `o` = le CENTRE du disque de base.
    Attributs : .disque .corps .S .H .hh .eq .rayon_trait .u .o"""
    w, e = 2 * r * u, 2 * r * u * aplat
    S = o + UP * haut * u
    base = Ellipse(width=w, height=e, fill_color=disque, fill_opacity=op * 0.9, stroke_color=bord, stroke_width=sw)
    base.move_to(o)
    flancs = Polygon(o + P(-r * u, 0), o + P(r * u, 0), S, fill_color=corps, fill_opacity=op, stroke_width=0)
    gen = VGroup(Line(o + P(-r * u, 0), S), Line(o + P(r * u, 0), S)).set_stroke(bord, sw)
    v = VGroup(flancs, base, gen)
    v.disque, v.corps, v.gen = base, flancs, gen
    v.S, v.H = S, o
    v.hh = DashedLine(S, o, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
    v.eq = equerre(o, RIGHT, UP, 0.18, HAUTEUR_C)
    v.rayon_trait = Line(o, o + P(r * u, 0), color=BASE_C, stroke_width=9)
    v.u, v.o, v.r, v.haut = u, o, r, haut
    return v


def sable(mob, n=22, graine=5, r=0.055, couleur=SABLE_C, bas=0.0, haut=1.0):
    """Des grains de sable semés dans la boîte englobante de `mob`, entre les hauteurs relatives
    `bas` et `haut` (pour montrer un remplissage)."""
    import random
    rnd = random.Random(graine)
    x0, x1 = mob.get_left()[0], mob.get_right()[0]
    y0, y1 = mob.get_bottom()[1], mob.get_top()[1]
    g = VGroup()
    for _ in range(n):
        x = x0 + (x1 - x0) * (0.12 + 0.76 * rnd.random())
        y = y0 + (y1 - y0) * (bas + (haut - bas) * rnd.random())
        g.add(Dot(P(x, y), radius=r, color=couleur))
    return g


# ── les personnages du lot 4e + 3e (un par épisode) ───────────────────────────

def awen(s=1.0):
    """V2 · Awen, monteuse de stands de festival : veste bleu nuit, casque jaune."""
    p = personne(peau="#c68642", tenue="#1e293b", cheveux="#78350f", longs=True, s=s)
    p.add(casquette(p, "#facc15"))
    return p


class Paysage4e(Paysage5e):
    """La base de la série : identité 4e, phrase de réponse à gauche, lignes sur la ligne d'écriture."""
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"


class Paysage3e(Paysage5e):
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"
