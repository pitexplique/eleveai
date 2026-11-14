# contenance_cm1_commun.py
# EleveAI — Maths CM1 — série « Contenance » (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux paysages contenance_comparer, contenance_convertir, contenance_estimer, contenance_defi.
# Base : perimetre_cm1_commun (PaysagePerimetreCM1 = PhraseAGauche + PaysageAireCM1), importée sans la modifier.
# Ici : les récipients dessinés (bouteille, verre, bidon, gourde, pichet, carafe, pot) avec leur liquide,
# l'étiquette de contenance sous un récipient, les personnages-métiers du lot (Inès, Sofia, Malik, Nora).
# Unités du CM1 : L, cL, mL, des entiers (comme la banque et la fiche du coach).
# Voix : manim/voix/cm1-contenance-<ep>.json (validées le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm1/aire_marques.py contenance:<ep>  (⛔ jamais sans argument).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm1_commun import *  # noqa: E402,F401,F403

JUS = "#fb923c"        # le jus d'orange (liquide par défaut)
EAU = "#38bdf8"        # l'eau
LAIT = "#f8fafc"       # le lait, la crème
MIEL = "#f59e0b"       # le miel
VERRE = "#cbd5e1"      # le bord d'un récipient transparent
BOUCHON = "#16a34a"


def _liquide_rect(corps, niveau, couleur, marge=0.07):
    """Le liquide d'un récipient droit : un rectangle posé au fond, jusqu'à `niveau` (0 → 1) de la hauteur."""
    w, h = corps.width - 2 * marge, (corps.height - 2 * marge) * niveau
    r = Rectangle(width=w, height=max(h, 0.001), fill_color=couleur, fill_opacity=0.9, stroke_width=0)
    return r.align_to(corps, DOWN).shift(UP * marge).set_x(corps.get_x())


def recipient(forme="bouteille", h=2.0, larg=0.9, niveau=0.85, couleur=JUS, bord=VERRE, sw=4):
    """Un récipient dessiné, de hauteur h (le CORPS, sans le goulot), avec son liquide.
    forme : bouteille, gourde, bidon, verre, pichet, carafe, pot, tasse.
    Renvoie un VGroup ; r.liquide = le liquide (à remplir avec remplir(r)), r.corps = le corps."""
    g = VGroup()
    if forme in ("verre", "tasse"):
        a, b = larg / 2, larg * 0.36
        corps = Polygon(P(-a, h / 2), P(a, h / 2), P(b, -h / 2), P(-b, -h / 2),
                        fill_opacity=0, stroke_color=bord, stroke_width=sw)
        y = -h / 2 + h * niveau
        aa = b + (a - b) * niveau
        liq = Polygon(P(-aa + 0.05, y), P(aa - 0.05, y), P(b - 0.05, -h / 2 + 0.05), P(-b + 0.05, -h / 2 + 0.05),
                      fill_color=couleur, fill_opacity=0.9, stroke_width=0)
        g.add(liq, corps)
        if forme == "tasse":
            g.add(Arc(radius=h * 0.25, start_angle=-PI / 2, angle=PI, color=bord, stroke_width=sw)
                  .move_to(P(a * 0.86 + h * 0.12, 0)))
    else:
        rayon = {"gourde": 0.35, "pot": 0.12, "bidon": 0.1}.get(forme, 0.18)
        corps = RoundedRectangle(width=larg, height=h, corner_radius=min(rayon, larg / 2.2, h / 2.2),
                                 fill_opacity=0, stroke_color=bord, stroke_width=sw)
        liq = _liquide_rect(corps, niveau, couleur)
        g.add(liq, corps)
        haut = corps.get_top()
        if forme == "bouteille":
            epaule = Polygon(haut + P(-larg / 2 + 0.05, -0.02), haut + P(larg / 2 - 0.05, -0.02),
                             haut + P(larg * 0.17, h * 0.16), haut + P(-larg * 0.17, h * 0.16),
                             fill_opacity=0, stroke_color=bord, stroke_width=sw)
            col_ = Rectangle(width=larg * 0.34, height=h * 0.12, fill_opacity=0, stroke_color=bord, stroke_width=sw)
            col_.next_to(epaule, UP, buff=0)
            bou = Rectangle(width=larg * 0.4, height=h * 0.06, fill_color=BOUCHON, fill_opacity=1, stroke_width=0)
            bou.next_to(col_, UP, buff=0)
            g.add(epaule, col_, bou)
        elif forme == "gourde":
            bou = RoundedRectangle(width=larg * 0.45, height=h * 0.12, corner_radius=0.05, fill_color="#2563eb",
                                   fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=0)
            g.add(bou)
        elif forme == "bidon":
            anse = Arc(radius=larg * 0.22, start_angle=0, angle=PI, color=bord, stroke_width=sw + 2)
            anse.next_to(corps, UP, buff=0).shift(RIGHT * larg * 0.15)
            bou = Rectangle(width=larg * 0.18, height=h * 0.07, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
            bou.next_to(corps, UP, buff=0).shift(LEFT * larg * 0.28)
            g.add(anse, bou)
        elif forme in ("pichet", "carafe"):
            anse = Arc(radius=h * 0.22, start_angle=-PI / 2, angle=PI, color=bord, stroke_width=sw + 1)
            anse.move_to(corps.get_right() + RIGHT * h * 0.1 + UP * h * 0.08)
            bec = Polygon(haut + P(-larg / 2, 0), haut + P(-larg / 2 - 0.18, 0.12), haut + P(-larg / 2 + 0.15, 0),
                          fill_opacity=0, stroke_color=bord, stroke_width=sw)
            g.add(anse, bec)
        elif forme == "pot":
            cou = Rectangle(width=larg * 1.06, height=h * 0.16, fill_color="#b45309", fill_opacity=1, stroke_width=0)
            cou.next_to(corps, UP, buff=0)
            g.add(cou)
    g.liquide, g.corps = liq, corps
    return g


def vider(r):
    """Le liquide de r écrasé au fond (avant remplir(r))."""
    r.liquide.save_state()
    r.liquide.stretch(0.02, 1, about_edge=DOWN)
    return r


def remplir(r, run_time=0.8):
    """L'animation : le liquide de r monte jusqu'à son niveau (après vider(r))."""
    return Restore(r.liquide, run_time=run_time)


def contenance(r, s, fs=28, couleur=JAUNE_TITRE, buff=0.18, audit=False):
    """L'étiquette de contenance SOUS le récipient r (« 75 cL »). Hors audit par défaut :
    le nombre est dit par la ligne de calcul ; audit=True quand l'étiquette est la première à le montrer."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(r, DOWN, buff=buff)
    return t if audit else hors_audit(t)


def rangee_recipients(rs, buff=0.45):
    """Des récipients côte à côte, posés sur la même ligne (le bas aligné)."""
    g = VGroup(*rs).arrange(RIGHT, buff=buff, aligned_edge=DOWN)
    return g


def ines(s=1.0):
    """Inès, vendeuse de jus de fruits frais au marché : tablier orange, foulard vert."""
    p = personne(peau="#a16207", tenue="#ea580c", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    fou = AnnularSector(inner_radius=0, outer_radius=r * 1.05, angle=PI, start_angle=0, fill_color="#16a34a",
                        fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.62))
    p.add(fou)
    return p


def sofia(s=1.0):
    """Sofia, pâtissière : veste blanche, toque blanche."""
    p = personne(peau="#f1c27d", tenue="#f8fafc", cheveux="#78350f", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    toque = VGroup(Rectangle(width=r * 1.6, height=r * 0.5, fill_color="#ffffff", fill_opacity=1, stroke_width=0)
                   .move_to(c + P(0, r * 1.05)),
                   Circle(radius=r * 0.75, fill_color="#ffffff", fill_opacity=1, stroke_width=0)
                   .move_to(c + P(0, r * 1.65)))
    p.add(toque)
    return p


def malik(s=1.0):
    """Malik, pompier : tenue bleu marine, casque rouge."""
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", s=s)
    p.add(casquette(p, "#dc2626"))
    return p


def nora(s=1.0):
    """Nora, apicultrice : combinaison blanche, chapeau à voile (jaune)."""
    p = personne(peau="#e0ac69", tenue="#fef3c7", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.5, fill_color="#eab308", fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.9, angle=PI, start_angle=0, fill_color="#eab308",
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    p.add(dome, bord)
    return p


class PaysageContenanceCM1(PaysagePerimetreCM1):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
