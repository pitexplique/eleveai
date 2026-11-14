# contenance_ce2_commun.py
# EleveAI — Maths CE2 — série « Contenance » (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux paysages contenance_unites, _relations, _comparer, _probleme, _defi.
# Base : contenance_cm1_commun (récipients dessinés, vider/remplir, étiquette de contenance,
# PaysageContenanceCM1), IMPORTÉE sans la modifier : même style que la série CM1.
# Ici : les personnages-métiers du lot CE2 (Lucas, Amina, Théo, Mélissa, Yanis), la règle,
# la marmite, la cuillère, l'arrosoir, le saladier.
# ⛔ Unités du CE2 : L, dL, cL seulement (pas de mL, pas de virgule, pas de tableau), comme la banque.
# Voix : manim/voix/ce2-contenance-<ep>.json (validées le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/ce2/perimetre_marques.py contenance:<ep>

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from contenance_cm1_commun import *  # noqa: E402,F401,F403
from contenance_cm1_commun import _liquide_rect  # noqa: E402

CREME = "#fde68a"
SIROP = "#e11d48"
HUILE = "#eab308"
ROSE = "#f472b6"
VIOLET = "#a78bfa"


def marmite(larg=2.2, h=1.3, niveau=0.75, couleur="#f97316"):
    """Une marmite : corps large et bas, deux anses, un couvercle posé à côté (non)."""
    corps = RoundedRectangle(width=larg, height=h, corner_radius=0.12, fill_opacity=0, stroke_color="#94a3b8",
                             stroke_width=5)
    liq = Rectangle(width=larg - 0.14, height=(h - 0.14) * niveau, fill_color=couleur, fill_opacity=0.9,
                    stroke_width=0).align_to(corps, DOWN).shift(UP * 0.07)
    anses = VGroup(*[RoundedRectangle(width=0.32, height=0.16, corner_radius=0.06, fill_color="#64748b",
                                      fill_opacity=1, stroke_width=0).next_to(corps, s, buff=-0.02)
                     .shift(UP * h * 0.3) for s in (LEFT, RIGHT)])
    bord = Line(corps.get_corner(UL) + LEFT * 0.08, corps.get_corner(UR) + RIGHT * 0.08, color="#94a3b8",
                stroke_width=8)
    g = VGroup(liq, corps, anses, bord)
    g.liquide, g.corps = liq, corps
    return g


def cuillere(s=1.0, couleur=CREME):
    """Une grosse cuillère vue de profil, pleine de crème."""
    cuil = Ellipse(width=0.62 * s, height=0.34 * s, fill_color=couleur, fill_opacity=1, stroke_color="#cbd5e1",
                   stroke_width=3)
    manche = Line(cuil.get_right(), cuil.get_right() + P(1.0 * s, 0.32 * s), color="#cbd5e1", stroke_width=6)
    return VGroup(manche, cuil)


def saladier(larg=2.6, h=0.9, niveau=0.35, couleur=EAU):
    """Un saladier large et bas (demi-ellipse) et son liquide."""
    corps = ArcBetweenPoints(P(-larg / 2, 0), P(larg / 2, 0), angle=PI * 0.9, stroke_color=VERRE, stroke_width=5)
    corps.stretch_to_fit_height(h)
    corps.rotate(PI, about_point=corps.get_center()).align_to(P(0, -h / 2), DOWN)
    corps.move_to(ORIGIN)
    haut = Line(corps.get_corner(UL), corps.get_corner(UR), color=VERRE, stroke_width=3, stroke_opacity=0.5)
    liq = Ellipse(width=larg * 0.82, height=h * niveau * 1.6, fill_color=couleur, fill_opacity=0.9, stroke_width=0)
    liq.move_to(P(0, -h / 2 + h * niveau * 0.55))
    g = VGroup(liq, corps, haut)
    g.liquide, g.corps = liq, corps
    return g


def seau(larg=2.4, h=1.0, niveau=0.3, couleur=EAU):
    """Un seau très large (trapèze) et son eau, basse."""
    a, b = larg / 2, larg * 0.42
    corps = Polygon(P(-a, h / 2), P(a, h / 2), P(b, -h / 2), P(-b, -h / 2), fill_opacity=0, stroke_color="#94a3b8",
                    stroke_width=5)
    y = -h / 2 + h * niveau
    aa = b + (a - b) * niveau
    liq = Polygon(P(-aa + 0.05, y), P(aa - 0.05, y), P(b - 0.05, -h / 2 + 0.05), P(-b + 0.05, -h / 2 + 0.05),
                  fill_color=couleur, fill_opacity=0.9, stroke_width=0)
    anse = Arc(radius=a * 0.95, start_angle=0, angle=PI, color="#94a3b8", stroke_width=3).next_to(corps, UP, buff=-0.05)
    g = VGroup(liq, corps, anse)
    g.liquide, g.corps = liq, corps
    return g


def arrosoir(s=1.0, niveau=0.8, couleur=EAU):
    """Un arrosoir : corps, bec, pomme, anse."""
    corps = RoundedRectangle(width=1.5 * s, height=1.3 * s, corner_radius=0.15 * s, fill_opacity=0,
                             stroke_color="#16a34a", stroke_width=5)
    liq = _liquide_rect(corps, niveau, couleur)
    bec = Line(corps.get_corner(DR) + P(-0.05, 0.3 * s), corps.get_corner(DR) + P(0.85 * s, 1.0 * s),
               color="#16a34a", stroke_width=8)
    pomme = Ellipse(width=0.22 * s, height=0.38 * s, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    pomme.move_to(bec.get_end()).rotate(-0.6)
    anse = Arc(radius=0.55 * s, start_angle=0, angle=PI, color="#16a34a", stroke_width=6).next_to(corps, UP, buff=0)
    g = VGroup(liq, corps, bec, pomme, anse)
    g.liquide, g.corps = liq, corps
    return g


def plant(s=1.0):
    """Un plant en pot : pot brun, tige, trois feuilles, une fleur."""
    pot = Polygon(P(-0.3 * s, 0.3 * s), P(0.3 * s, 0.3 * s), P(0.22 * s, -0.25 * s), P(-0.22 * s, -0.25 * s),
                  fill_color="#b45309", fill_opacity=1, stroke_width=0)
    tige = Line(P(0, 0.3 * s), P(0, 1.0 * s), color=HERBE_CE2, stroke_width=5)
    feuilles = VGroup(*[Ellipse(width=0.34 * s, height=0.16 * s, fill_color=HERBE_CE2, fill_opacity=1, stroke_width=0)
                        .move_to(P(dx * s, y * s)).rotate(r) for dx, y, r in ((-0.17, 0.55, 0.5), (0.17, 0.72, -0.5))])
    fleur = Circle(radius=0.14 * s, fill_color=ROSE, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05 * s))
    return VGroup(tige, feuilles, fleur, pot)


HERBE_CE2 = "#22c55e"


def toque(p):
    c, r = p.tete.get_center(), p.tete.width / 2
    return VGroup(Rectangle(width=r * 1.6, height=r * 0.5, fill_color="#ffffff", fill_opacity=1, stroke_width=0)
                  .move_to(c + P(0, r * 1.05)),
                  Circle(radius=r * 0.75, fill_color="#ffffff", fill_opacity=1, stroke_width=0)
                  .move_to(c + P(0, r * 1.65)))


def lucas(s=1.0):
    """Lucas, chef cuisinier : veste blanche, toque blanche."""
    p = visage(personne(peau="#f1c27d", tenue="#f8fafc", cheveux="#1f2937", s=s))
    p.add(toque(p))
    return p


def amina(s=1.0):
    """Amina, chimiste : blouse blanche, lunettes de protection bleues."""
    p = visage(personne(peau="#8d5524", tenue="#e2e8f0", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    lun = RoundedRectangle(width=r * 1.5, height=r * 0.38, corner_radius=r * 0.15, fill_color="#38bdf8",
                           fill_opacity=0.55, stroke_color="#0ea5e9", stroke_width=2).move_to(c + P(0, r * 0.12))
    p.add(lun)
    return p


def theo(s=1.0):
    """Théo, entraîneur de football : survêtement vert, sifflet."""
    p = visage(personne(peau="#e0ac69", tenue="#15803d", cheveux="#78350f", s=s))
    p.add(casquette(p, "#f8fafc"))
    return p


def melissa(s=1.0):
    """Mélissa, horticultrice : salopette verte, chapeau de paille."""
    p = visage(personne(peau="#a16207", tenue="#4d7c0f", cheveux="#1f2937", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.5, fill_color="#fcd34d", fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.9, angle=PI, start_angle=0, fill_color="#fcd34d",
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    p.add(dome, bord)
    return p


def yanis(s=1.0):
    """Yanis, mécanicien : combinaison bleue, casquette rouge."""
    p = visage(personne(peau="#c68642", tenue="#1d4ed8", cheveux="#111827", s=s))
    p.add(casquette(p, "#dc2626"))
    return p


class PaysageContenanceCE2(PaysageContenanceCM1):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"

    def aux_extraits(self, morceaux, extraits, run_time=0.18):
        """Chaque morceau à SON extrait de la voix : extraits (texte) ou (texte, n, délai).
        Les morceaux sortent de la synchro automatique (un nombre redit)."""
        for m, ex in zip(morceaux, extraits):
            for f in m.get_family():
                f.sans_synchro = True
            ex = list(ex) if isinstance(ex, (tuple, list)) else [ex]
            ex, n, delai = (ex + [1, 0.0][len(ex) - 1:])[:3]
            self.au_mot(ex, n)
            self.wait(0.07 + delai)
            self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)
