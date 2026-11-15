# aire_volume_5e_commun.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste, 15/11/2026) : ce qui sert aux
# 17 paysages (notions aire_surface, volume_solide, grandeur_conversion).
# Base : le commun aire du CM2 (manim/scripts/cm2/aire_cm2_commun.py → CM1 → 6e/calcul_pose_commun :
# synchro par jetons, audit, question-pause, finale, fin du 05/11), IMPORTÉ sans le modifier.
# Ici : l'identité 5e, les 17 personnages-métiers du lot, quelques outils de géométrie.
# Voix : manim/voix/5e-<micro en tirets>.json (validées par Frédéric le 15/11, Julie, débit −6) ;
# marques : python manim/scripts/5e/aire_volume_5e_marques.py <slug> (⛔ jamais sans argument).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm2"))

from aire_cm2_commun import *  # noqa: E402,F401,F403
from aire_cm2_commun import PaysageAireCM2G, LigneAlignee, casquette, coiffe  # noqa: E402,F401

HAUTEUR_C = VERT_OK          # la hauteur (perpendiculaire à la base), toujours verte
BASE_C = BLEU_CALCUL         # la base, toujours bleue
PENCHE_C = ROUGE_ERREUR      # le côté penché (le piège)
TRI_C, TRI_B = "#fb923c", "#7c2d12"     # le triangle (orange)
TERRE_C, TERRE_B = "#a16207", "#713f12"  # la terre du champ
CHAMP_C = "#4d7c0f"                      # les rangs de culture


# ── géométrie ────────────────────────────────────────────────────────────────

def tri(a, b, c, couleur=TRI_C, bord=TRI_B, sw=4, op=1.0):
    return Polygon(a, b, c, fill_color=couleur, fill_opacity=op, stroke_color=bord, stroke_width=sw)


def equerre(sommet, d1, d2, s=0.26, couleur=WHITE, sw=4):
    """Le petit carré de l'angle droit, au sommet, le long des directions d1 et d2 (unitaires)."""
    return Polygon(sommet, sommet + d1 * s, sommet + (d1 + d2) * s, sommet + d2 * s, stroke_color=couleur,
                   stroke_width=sw, fill_opacity=0)


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, audit=True, buff=0.18, fond=False):
    """La mesure d'un côté, posée contre la figure ; audit=False : un nombre déjà dit ;
    fond=True : un cartouche sombre derrière (étiquette posée SUR la figure, lisible sur tout fond)."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=buff)
    if fond:
        t.add_background_rectangle(color=BLACK, opacity=0.72, buff=0.07)
    return t if audit else hors_audit(t)


def sur_fond(t, opacite=0.72):
    """Un cartouche sombre derrière un texte posé sur une figure."""
    t.add_background_rectangle(color=BLACK, opacity=opacite, buff=0.07)
    return t


def centre_de(*pts):
    return sum(pts) / len(pts)


def triangle_hb(base, haut, x_sommet, u, o=ORIGIN):
    """Un triangle de base `base` (posée en bas) et de hauteur `haut`, le sommet à `x_sommet` de A
    (0 < x_sommet < base : pied de la hauteur sur la base ; sinon : à l'extérieur). Échelle u.
    Renvoie (A, B, C, H) : A et B la base, C le sommet, H le pied de la hauteur, centrés sur o."""
    A = o + P(-base * u / 2, -haut * u / 2)
    B = A + P(base * u, 0)
    C = A + P(x_sommet * u, haut * u)
    H = A + P(x_sommet * u, 0)
    return A, B, C, H


def fleurs(a, b, c, n=14, graine=7, r=0.07):
    """Des fleurs (petits disques colorés) semées dans le triangle abc."""
    import random
    rnd = random.Random(graine)
    coul = ["#f472b6", "#facc15", "#f8fafc", "#c084fc", "#fb7185"]
    g = VGroup()
    for k in range(n):
        u, v = rnd.random(), rnd.random()
        if u + v > 1:
            u, v = 1 - u, 1 - v
        p = a + (b - a) * (0.12 + 0.76 * u) + (c - a) * (0.12 + 0.76 * v) * 0.9
        g.add(Dot(p, radius=r, color=coul[k % len(coul)]))
    return g


# ── les 17 personnages-métiers du lot (un par épisode) ─────────────────────────

def chapeau_paille(p, couleur="#eab308"):
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.55, fill_color=couleur, fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.85, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    return VGroup(dome, bord)


def awa5(s=1.0):
    """A1 · Awa, maçonne : tenue grise tachée d'enduit, casque blanc."""
    p = personne(peau="#8d5524", tenue="#6b7280", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def ibrahim(s=1.0):
    """A2 · Ibrahim, agriculteur : chemise vert champ, chapeau de paille."""
    p = personne(peau="#8d5524", tenue="#65a30d", cheveux="#111827", s=s)
    p.add(chapeau_paille(p))
    return p


def soraya(s=1.0):
    """A3 · Soraya, graphiste : pull violet, casque audio."""
    p = personne(peau="#e0ac69", tenue="#9333ea", cheveux="#1f2937", longs=True, s=s)
    p.add(casque_audio(p))
    return p


def leila(s=1.0):
    """A4 · Leïla, technicienne en énergies renouvelables : gilet jaune, casque orange."""
    p = personne(peau="#c68642", tenue="#facc15", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#f97316"))
    return p


def mehdi(s=1.0):
    """A5 · Mehdi, menuisier agenceur : tablier marron, casquette verte."""
    p = personne(peau="#c68642", tenue="#92400e", cheveux="#111827", s=s)
    p.add(casquette(p, "#15803d"))
    return p


def gael(s=1.0):
    """V1 · Gaël, concepteur d'emballages : chemise beige carton, casquette bleue."""
    p = personne(peau="#f1c27d", tenue="#d6b98c", cheveux="#78350f", s=s)
    p.add(casquette(p, "#1d4ed8"))
    return p


def tiago(s=1.0):
    """V2 · Tiago, logisticien : gilet orange, casque blanc."""
    p = personne(peau="#e0ac69", tenue="#ea580c", cheveux="#1f2937", s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def yuna(s=1.0):
    """V3 · Yuna, technicienne en climatisation : combinaison bleu ciel, casquette grise."""
    p = personne(peau="#f1c27d", tenue="#0ea5e9", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#64748b"))
    return p


def maia(s=1.0):
    """V4 · Maïa, fabricante de tentes : veste rouge, bonnet vert."""
    p = personne(peau="#a16207", tenue="#dc2626", cheveux="#1f2937", longs=True, s=s)
    p.add(coiffe(p, "#16a34a", haut=0.6, large=2.1, hauteur=0.9))
    return p


def hakim(s=1.0):
    """V5 · Hakim, ingénieur de l'eau : chemise bleu marine, casque bleu clair."""
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", s=s)
    p.add(casquette(p, "#7dd3fc"))
    return p


def chloe5(s=1.0):
    """V6 · Chloé, pâtissière : veste blanche, toque blanche."""
    p = personne(peau="#e0ac69", tenue="#f8fafc", cheveux="#b45309", longs=True, s=s)
    p.add(coiffe(p, "#ffffff", haut=0.55, large=1.9, hauteur=1.3))
    return p


def fanta(s=1.0):
    """V7 · Fanta, pompière : veste bleu nuit, casque rouge."""
    p = personne(peau="#5c3317", tenue="#1e293b", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#dc2626"))
    return p


def jonas(s=1.0):
    """V8 · Jonas, installateur de récupérateurs d'eau de pluie : tenue verte, casquette bleue."""
    p = personne(peau="#f1c27d", tenue="#047857", cheveux="#92400e", s=s)
    p.add(casquette(p, "#2563eb"))
    return p


def samir(s=1.0):
    """C1 · Samir, pharmacien : blouse blanche, croix verte."""
    p = personne(peau="#c68642", tenue="#f8fafc", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    croix = VGroup(Rectangle(width=r * 0.6, height=r * 0.18), Rectangle(width=r * 0.18, height=r * 0.6))
    croix.set_fill("#16a34a", 1).set_stroke(width=0).move_to(c + P(r * 0.6, -r * 2.2))
    p.add(croix)
    return p


def lena(s=1.0):
    """C2 · Léna, monteuse de films : sweat rose, casque audio."""
    p = personne(peau="#f1c27d", tenue="#db2777", cheveux="#78350f", longs=True, s=s)
    p.add(casque_audio(p))
    return p


def lucie(s=1.0):
    """C3 · Lucie, cheffe cuisinière : veste blanche, toque blanche."""
    p = personne(peau="#f1c27d", tenue="#f8fafc", cheveux="#1f2937", longs=True, s=s)
    p.add(coiffe(p, "#ffffff", haut=0.55, large=1.9, hauteur=1.3))
    return p


def ana(s=1.0):
    """C4 · Ana, contrôleuse qualité : blouse bleue, casque blanc."""
    p = personne(peau="#e0ac69", tenue="#2563eb", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


class Paysage5e(LigneAlignee, PaysageAireCM2G):
    """La base de la série : identité 5e, phrase de réponse à gauche, lignes sur la ligne d'écriture."""
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"


# ── les solides (série Volume, 15/11) : perspective cavalière, fuyante à 35°, coefficient 0,5 ────────────────
import math as _math

FUITE = 0.5 * _math.cos(_math.radians(35)), 0.5 * _math.sin(_math.radians(35))
PAVE_FACE, PAVE_DESSUS, PAVE_COTE, PAVE_BORD = "#38bdf8", "#7dd3fc", "#0284c7", "#0c4a6e"


def point3(o, u, x, y, z):
    """Le point (x en largeur, y en profondeur, z en hauteur) d'un solide en cavalière, o = coin avant-bas-gauche."""
    return o + P((x + y * FUITE[0]) * u, (z + y * FUITE[1]) * u)


def pave(l, p, h, u, o=ORIGIN, face=PAVE_FACE, dessus=PAVE_DESSUS, cote=PAVE_COTE, bord=PAVE_BORD, sw=4,
         grille=False, op=1.0):
    """Un pavé l × p × h (unités) en cavalière ; o = le coin avant-bas-gauche. grille=True : les cubes-unité
    tracés sur les trois faces visibles. Attributs : .face .dessus .cote .grille .pt(x, y, z) .u .o"""
    q = lambda x, y, z: point3(o, u, x, y, z)  # noqa: E731
    f = Polygon(q(0, 0, 0), q(l, 0, 0), q(l, 0, h), q(0, 0, h), fill_color=face, fill_opacity=op,
                stroke_color=bord, stroke_width=sw)
    d = Polygon(q(0, 0, h), q(l, 0, h), q(l, p, h), q(0, p, h), fill_color=dessus, fill_opacity=op,
                stroke_color=bord, stroke_width=sw)
    c = Polygon(q(l, 0, 0), q(l, p, 0), q(l, p, h), q(l, 0, h), fill_color=cote, fill_opacity=op,
                stroke_color=bord, stroke_width=sw)
    g = VGroup()
    if grille:
        for i in range(1, int(round(l))):
            g.add(Line(q(i, 0, 0), q(i, 0, h)), Line(q(i, 0, h), q(i, p, h)))
        for k in range(1, int(round(h))):
            g.add(Line(q(0, 0, k), q(l, 0, k)), Line(q(l, 0, k), q(l, p, k)))
        for j in range(1, int(round(p))):
            g.add(Line(q(0, j, h), q(l, j, h)), Line(q(l, j, 0), q(l, j, h)))
        g.set_stroke(bord, max(1.5, sw * 0.5))
    v = VGroup(f, d, c, g)
    v.face, v.dessus, v.cote, v.grille, v.pt, v.u, v.o = f, d, c, g, q, u, o
    return v


def prisme_tri(base, haut, x_sommet, longueur, u, o=ORIGIN, face="#fb923c", cote="#c2410c", dessus="#fdba74",
               bord="#7c2d12", sw=4, op=1.0):
    """Un prisme droit à base triangulaire, la base (triangle) DE FACE : côté du bas `base`, hauteur `haut`, sommet
    au-dessus de x_sommet ; il fuit en profondeur sur `longueur`. o = le coin avant-bas-gauche.
    Attributs : .avant (le triangle de face) .pt(x, y, z) .u .o"""
    q = lambda x, y, z: point3(o, u, x, y, z)  # noqa: E731
    L = longueur
    pans = VGroup(
        Polygon(q(x_sommet, 0, haut), q(base, 0, 0), q(base, L, 0), q(x_sommet, L, haut), fill_color=cote,
                fill_opacity=op, stroke_color=bord, stroke_width=sw),
        Polygon(q(0, 0, 0), q(x_sommet, 0, haut), q(x_sommet, L, haut), q(0, L, 0), fill_color=dessus,
                fill_opacity=op, stroke_color=bord, stroke_width=sw))
    avant = Polygon(q(0, 0, 0), q(base, 0, 0), q(x_sommet, 0, haut), fill_color=face, fill_opacity=op,
                    stroke_color=bord, stroke_width=sw)
    v = VGroup(pans, avant)
    v.avant, v.pans, v.pt, v.u, v.o = avant, pans, q, u, o
    return v


def cylindre(r, h, u, o=ORIGIN, corps="#38bdf8", dessus="#7dd3fc", bord="#0c4a6e", sw=4, aplat=0.32, op=1.0):
    """Un cylindre debout de rayon r et de hauteur h (unités) ; o = le centre du disque du BAS. Les disques sont des
    ellipses (aplatissement `aplat`) ; le bord arrière du bas est en pointillé. Attributs : .haut .bas .corps .u .o"""
    w, e = 2 * r * u, 2 * r * u * aplat
    ar = DashedVMobject(Arc(radius=1, start_angle=0, angle=PI).stretch(r * u, 0).stretch(r * u * aplat, 1)
                        .move_to(o + UP * e / 4), num_dashes=14).set_stroke(bord, sw * 0.7)
    corps_ = Polygon(o + P(-r * u, 0), o + P(r * u, 0), o + P(r * u, h * u), o + P(-r * u, h * u),
                     fill_color=corps, fill_opacity=op, stroke_width=0)
    fond = Ellipse(width=w, height=e, fill_color=corps, fill_opacity=op, stroke_width=0).move_to(o)
    devant = Arc(radius=1, start_angle=PI, angle=PI).stretch(r * u, 0).stretch(r * u * aplat, 1).move_to(
        o + DOWN * e / 4).set_stroke(bord, sw)
    cotes = VGroup(Line(o + P(-r * u, 0), o + P(-r * u, h * u)), Line(o + P(r * u, 0), o + P(r * u, h * u)))
    cotes.set_stroke(bord, sw)
    haut_ = Ellipse(width=w, height=e, fill_color=dessus, fill_opacity=op, stroke_color=bord,
                    stroke_width=sw).move_to(o + UP * h * u)
    v = VGroup(fond, corps_, ar, devant, cotes, haut_)
    v.haut, v.bas, v.corps, v.u, v.o, v.r, v.h = haut_, VGroup(fond, ar, devant), VGroup(corps_, cotes), u, o, r, h
    return v
