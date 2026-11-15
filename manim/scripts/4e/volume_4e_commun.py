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

# ── les figures de la série (périmètre, aire, sections) ───────────────────────

CERCLE_C, CERCLE_B = "#38bdf8", "#0c4a6e"
DISQUE_C = "#7dd3fc"


def cercle(r, u, o=ORIGIN, couleur=CERCLE_C, sw=6, plein=False, op=0.85):
    """Un cercle de rayon r (unités), centré en o. plein=True : un disque colorié.
    Attributs : .centre .r .u .rayon_trait .diam_trait"""
    c = Circle(radius=r * u, color=couleur, stroke_width=sw).move_to(o)
    if plein:
        c.set_fill(DISQUE_C, op)
    c.centre, c.r, c.u = o, r, u
    c.rayon_trait = Line(o, o + P(r * u, 0), color=BASE_C, stroke_width=7)
    c.diam_trait = Line(o + P(-r * u, 0), o + P(r * u, 0), color=BASE_C, stroke_width=7)
    c.pt_centre = Dot(o, radius=0.06, color=WHITE)
    return c


def demi_disque(r, u, o=ORIGIN, couleur=DISQUE_C, bord=CERCLE_B, sw=5, op=0.8):
    """Un demi-disque posé sur son diamètre horizontal ; o = le milieu du diamètre.
    Attributs : .arc (le demi-cercle) .diam (le diamètre, sur le contour lui aussi)"""
    forme = AnnularSector(inner_radius=0, outer_radius=r * u, angle=PI, start_angle=0,
                          fill_color=couleur, fill_opacity=op, stroke_color=bord, stroke_width=sw).move_to(o)
    forme.shift(o - forme.get_bottom() + DOWN * 0)
    arc = Arc(radius=r * u, start_angle=0, angle=PI, color=couleur, stroke_width=sw + 2).move_arc_center_to(o)
    diam = Line(o + P(-r * u, 0), o + P(r * u, 0), color=ORANGE_Q, stroke_width=sw + 2)
    g = VGroup(forme, arc, diam)
    g.forme, g.arc, g.diam, g.r, g.u, g.o = forme, arc, diam, r, u, o
    return g


def boule(r, u, o=ORIGIN, couleur="#f472b6", bord="#831843", sw=4, op=0.9, aplat=0.34):
    """Une boule en perspective : un disque, l'équateur en ellipse, un reflet.
    Attributs : .equateur .rayon_trait .centre"""
    d = Circle(radius=r * u, fill_color=couleur, fill_opacity=op, stroke_color=bord,
               stroke_width=sw).move_to(o)
    eq = Ellipse(width=2 * r * u, height=2 * r * u * aplat, stroke_color=bord, stroke_width=sw * 0.8,
                 fill_opacity=0).move_to(o)
    ref = Arc(radius=r * u * 0.62, start_angle=PI * 0.62, angle=PI * 0.4, stroke_color=WHITE,
              stroke_width=sw * 0.8, stroke_opacity=0.5).move_arc_center_to(o)
    g = VGroup(d, eq, ref)
    g.disque, g.equateur, g.centre, g.r, g.u = d, eq, o, r, u
    g.rayon_trait = Line(o, o + P(r * u, 0), color=BASE_C, stroke_width=7)
    g.pt_centre = Dot(o, radius=0.06, color=WHITE)
    return g


def figure_L(a, b, c, d, u, o=ORIGIN, couleur="#a3e635", bord="#3f6212", sw=5, op=0.75):
    """Une figure en L : un rectangle a × b dont on a enlevé un rectangle c × d au coin
    HAUT-DROIT. o = le coin bas-gauche. Attributs : .coupe (le trait de découpe interne,
    pointillé : il n'est PAS sur le contour) .cotes(…)"""
    A = o
    B = o + P(a * u, 0)
    C = o + P(a * u, (b - d) * u)
    D = o + P((a - c) * u, (b - d) * u)
    E = o + P((a - c) * u, b * u)
    F = o + P(0, b * u)
    poly = Polygon(A, B, C, D, E, F, fill_color=couleur, fill_opacity=op, stroke_color=bord, stroke_width=sw)
    poly.sommets = (A, B, C, D, E, F)
    poly.coupe = DashedLine(D, o + P((a - c) * u, 0), color=WHITE, stroke_width=3, dash_length=0.1)
    poly.u, poly.o, poly.a, poly.b, poly.c, poly.d = u, o, a, b, c, d
    return poly


def piste(long_droit, r, u, o=ORIGIN, couleur="#fb923c", bord="#7c2d12", sw=5, op=0.35):
    """Une piste : un rectangle (long_droit × 2r) fermé à droite par un demi-disque de rayon r.
    o = le coin bas-gauche. Attributs : .droits (les 3 côtés droits) .arc"""
    A = o
    B = o + P(long_droit * u, 0)
    C = o + P(long_droit * u, 2 * r * u)
    D = o + P(0, 2 * r * u)
    centre = o + P(long_droit * u, r * u)
    arc = Arc(radius=r * u, start_angle=-PI / 2, angle=PI, color=couleur, stroke_width=sw + 2)
    arc.move_arc_center_to(centre)
    fond = VGroup(Polygon(A, B, C, D, fill_color=couleur, fill_opacity=op, stroke_width=0),
                  AnnularSector(inner_radius=0, outer_radius=r * u, angle=PI, start_angle=-PI / 2,
                                fill_color=couleur, fill_opacity=op, stroke_width=0).move_arc_center_to(centre))
    droits = VGroup(Line(A, B), Line(D, C), Line(A, D)).set_stroke(couleur, sw + 2)
    g = VGroup(fond, droits, arc)
    g.fond, g.droits, g.arc, g.u, g.o, g.r = fond, droits, arc, u, o, r
    g.coins = (A, B, C, D)
    return g


def vues_trois(solide_nom, u=0.55, o=ORIGIN):
    """Les trois vues (face, dessus, côté) d'un solide usuel, en contours blancs.
    solide_nom : « cylindre », « cone », « pave », « pyramide », « boule »."""
    carre = lambda s: Square(side_length=s * u, color=WHITE, stroke_width=5)  # noqa: E731
    rect = lambda a, b: Rectangle(width=a * u, height=b * u, color=WHITE, stroke_width=5)  # noqa: E731
    rond = lambda s: Circle(radius=s * u / 2, color=WHITE, stroke_width=5)  # noqa: E731
    tri = lambda a, h: Polygon(P(-a * u / 2, -h * u / 2), P(a * u / 2, -h * u / 2), P(0, h * u / 2),  # noqa: E731
                               color=WHITE, stroke_width=5)
    table = {
        "cylindre": (rect(2, 3), rond(2), rect(2, 3)),
        "cone": (tri(2, 3), rond(2), tri(2, 3)),
        "pave": (rect(3, 2), rect(3, 2), rect(2, 2)),
        "pyramide": (tri(3, 2.4), carre(3), tri(3, 2.4)),
        "boule": (rond(3), rond(3), rond(3)),
    }
    f, d, c = table[solide_nom]
    g = VGroup(f, d, c).arrange(RIGHT, buff=0.75).move_to(o)
    g.face, g.dessus, g.cote = f, d, c
    return g


def patron_pyramide_carree(cote, haut_tri, u, o=ORIGIN, base_c=BASE_C, tri_c=PYR_FACE, bord=PYR_BORD, sw=4):
    """Le patron d'une pyramide à base carrée : le carré au milieu, 4 triangles rabattus autour.
    Attributs : .carre .triangles"""
    c = cote * u
    carre = Square(side_length=c, fill_color=base_c, fill_opacity=0.5, stroke_color=bord,
                   stroke_width=sw).move_to(o)
    tris = VGroup()
    for k, (sens, ang) in enumerate([(UP, 0), (RIGHT, -PI / 2), (DOWN, PI), (LEFT, PI / 2)]):
        base_mid = o + sens * c / 2
        d = np.array([-sens[1], sens[0], 0.0])
        t = Polygon(base_mid - d * c / 2, base_mid + d * c / 2, base_mid + sens * haut_tri * u,
                    fill_color=tri_c, fill_opacity=0.85, stroke_color=bord, stroke_width=sw)
        tris.add(t)
    g = VGroup(carre, tris)
    g.carre, g.triangles, g.u, g.o = carre, tris, u, o
    return g

# ── les 27 autres personnages du lot (un par épisode) ─────────────────────────
# ⚠️ yuna4 et tiago4 portent un 4 : le commun 5e a déjà une Yuna (climatisation) et
# un Tiago (logisticien). Deux métiers différents, deux fonctions différentes.

def nour(s=1.0):
    """P1 · Nour, géomètre-topographe : gilet orange, casque blanc."""
    p = personne(peau="#c68642", tenue="#f97316", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def marc(s=1.0):
    """P2 · Marc, pisciniste : polo bleu clair, casquette bleu nuit."""
    p = personne(peau="#f1c27d", tenue="#38bdf8", cheveux="#78350f", s=s)
    p.add(casquette(p, "#1e3a8a"))
    return p


def zahia(s=1.0):
    """P3 · Zahia, conceptrice de pistes de BMX : veste violette, casque rouge."""
    p = personne(peau="#8d5524", tenue="#7c3aed", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#dc2626"))
    return p


def sonia(s=1.0):
    """P4 · Sonia, entraîneuse d'athlétisme : survêtement vert, casquette blanche."""
    p = personne(peau="#5c3317", tenue="#16a34a", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def thierry(s=1.0):
    """P5 · Thierry, éleveur : chemise brune, chapeau de paille."""
    p = personne(peau="#f1c27d", tenue="#92400e", cheveux="#a16207", s=s)
    p.add(chapeau_paille(p))
    return p


def noe(s=1.0):
    """A1 · Noé, réparateur de smartphones : t-shirt gris, casquette bleue."""
    p = personne(peau="#c68642", tenue="#475569", cheveux="#111827", s=s)
    p.add(casquette(p, "#0ea5e9"))
    return p


def nina(s=1.0):
    """A2 · Nina, fabricante de tambours : tablier ocre, foulard rouge."""
    p = personne(peau="#8d5524", tenue="#b45309", cheveux="#111827", longs=True, s=s)
    p.add(coiffe(p, "#dc2626", haut=0.5, large=1.9, hauteur=0.7))
    return p


def hugo(s=1.0):
    """A3 · Hugo, paysagiste : polo vert, casquette verte."""
    p = personne(peau="#e0ac69", tenue="#15803d", cheveux="#78350f", s=s)
    p.add(casquette(p, "#4d7c0f"))
    return p


def salome(s=1.0):
    """A4 · Salomé, carreleuse : combinaison grise, casque jaune."""
    p = personne(peau="#e0ac69", tenue="#64748b", cheveux="#1f2937", longs=True, s=s)
    p.add(casquette(p, "#facc15"))
    return p


def ryan(s=1.0):
    """A5 · Ryan, imprimeur grand format : tablier noir, casquette orange."""
    p = personne(peau="#5c3317", tenue="#1e293b", cheveux="#111827", s=s)
    p.add(casquette(p, "#f97316"))
    return p


def lea(s=1.0):
    """V1 · Léa, technicienne en traitement de l'eau : blouse turquoise, casquette blanche."""
    p = personne(peau="#f1c27d", tenue="#06b6d4", cheveux="#78350f", longs=True, s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


def malo(s=1.0):
    """V3 · Malo, glacier : veste blanche, calot rose."""
    p = personne(peau="#c68642", tenue="#f8fafc", cheveux="#111827", s=s)
    p.add(coiffe(p, "#f472b6", haut=0.5, large=1.8, hauteur=0.75))
    return p


def elsa(s=1.0):
    """V4 · Elsa, hydrologue : veste bleu nuit, bonnet vert d'eau."""
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#a16207", longs=True, s=s)
    p.add(coiffe(p, "#2dd4bf", haut=0.55, large=1.9, hauteur=0.8))
    return p


def yuna4(s=1.0):
    """S1 · Yuna, animatrice 3D : sweat violet, casque audio."""
    p = personne(peau="#f1c27d", tenue="#8b5cf6", cheveux="#1f2937", longs=True, s=s)
    p.add(casque_audio(p))
    return p


def karim(s=1.0):
    """S2 · Karim, architecte : chemise blanche, casque clair."""
    p = personne(peau="#8d5524", tenue="#f8fafc", cheveux="#111827", s=s)
    p.add(casquette(p, "#e2e8f0"))
    return p


def maya(s=1.0):
    """S3 · Maya, dessinatrice de BD : pull jaune, crayon derrière l'oreille."""
    p = personne(peau="#e0ac69", tenue="#facc15", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    crayon = Rectangle(width=r * 0.18, height=r * 0.9, fill_color="#f97316", fill_opacity=1,
                       stroke_width=0).rotate(0.35).move_to(c + P(r * 1.05, r * 0.1))
    p.add(crayon)
    return p


def tiago4(s=1.0):
    """S4 · Tiago, fabricant de jeux de société : gilet rouge, casquette verte."""
    p = personne(peau="#c68642", tenue="#dc2626", cheveux="#78350f", s=s)
    p.add(casquette(p, "#16a34a"))
    return p


def naima(s=1.0):
    """S5 · Naïma, manipulatrice en radiologie : blouse bleu clair, badge."""
    p = personne(peau="#8d5524", tenue="#bae6fd", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    badge = RoundedRectangle(width=r * 0.5, height=r * 0.35, corner_radius=0.04, fill_color="#0ea5e9",
                             fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.65, -r * 2.1))
    p.add(badge)
    return p


def enzo(s=1.0):
    """S6 · Enzo, pilote de drone : blouson kaki, casquette noire."""
    p = personne(peau="#f1c27d", tenue="#4d7c0f", cheveux="#111827", s=s)
    p.add(casquette(p, "#1e293b"))
    return p


def lina(s=1.0):
    """T1 · Lina, kinésithérapeute : tunique blanche, croix bleue."""
    p = personne(peau="#c68642", tenue="#f8fafc", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    croix = VGroup(Rectangle(width=r * 0.55, height=r * 0.16), Rectangle(width=r * 0.16, height=r * 0.55))
    croix.set_fill("#0ea5e9", 1).set_stroke(width=0).move_to(c + P(r * 0.62, -r * 2.2))
    p.add(croix)
    return p


def adam(s=1.0):
    """T2 · Adam, responsable de salle de cinéma : veste bordeaux, nœud papillon."""
    p = personne(peau="#e0ac69", tenue="#9f1239", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    noeud = VGroup(Triangle(fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.22).rotate(-PI / 2),
                   Triangle(fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.22).rotate(PI / 2))
    noeud[0].shift(P(-r * 0.2, 0))
    noeud[1].shift(P(r * 0.2, 0))
    noeud.move_to(c + P(0, -r * 1.5))
    p.add(noeud)
    return p


def fatou(s=1.0):
    """T3 · Fatou, boulangère : tablier beige, toque blanche."""
    p = personne(peau="#5c3317", tenue="#fde68a", cheveux="#111827", longs=True, s=s)
    p.add(coiffe(p, "#ffffff", haut=0.55, large=1.9, hauteur=1.2))
    return p


def oscar(s=1.0):
    """T4 · Oscar, tourneur sur métaux : bleu de travail, lunettes de protection."""
    p = personne(peau="#f1c27d", tenue="#1d4ed8", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    lunettes = RoundedRectangle(width=r * 1.5, height=r * 0.42, corner_radius=0.06, fill_color="#fbbf24",
                                fill_opacity=0.75, stroke_color="#78350f", stroke_width=2).move_to(c + UP * r * 0.25)
    p.add(lunettes)
    return p


def jade(s=1.0):
    """T5 · Jade, volcanologue : combinaison argentée, casque rouge."""
    p = personne(peau="#c68642", tenue="#cbd5e1", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#dc2626"))
    return p


def rayan(s=1.0):
    """T6 · Rayan, géographe : pull bleu nuit, écharpe ocre."""
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    echarpe = RoundedRectangle(width=r * 1.6, height=r * 0.3, corner_radius=0.07, fill_color="#d97706",
                               fill_opacity=1, stroke_width=0).move_to(c + P(0, -r * 1.45))
    p.add(echarpe)
    return p


def maelle(s=1.0):
    """T7 · Maëlle, pilote de ligne : veste bleu marine, casquette à galons."""
    p = personne(peau="#f1c27d", tenue="#172554", cheveux="#78350f", longs=True, s=s)
    p.add(casquette(p, "#0f172a"))
    return p


def nathan(s=1.0):
    """T8 · Nathan, technicien en numérisation 3D : sweat anthracite, casquette cyan."""
    p = personne(peau="#e0ac69", tenue="#334155", cheveux="#111827", s=s)
    p.add(casquette(p, "#22d3ee"))
    return p
