# duree_cp_commun.py
# EleveAI — Maths CP — série « Durées » (CP → 6e, 17/11/2026, thème GRANDEURS ET MESURES) :
# ce qui sert aux paysages CP lire_heure, placer_aiguilles, jour_semaine, ordonner, defi.
# Base : cm1/longueur_cm1_commun (PaysageLongueurCM1 → synchro voix, audit, question-pause, finale, fin),
# importée sans la modifier, comme duree_cm1_commun ; le dessin des durées vient de cp/duree_commun.py.
# CP : heures ENTIÈRES seulement (la grande aiguille sur le 12), moments de la journée, ranger dans l'ordre.
# Voix : manim/voix/cp-duree-<ep>.json (validées le 16-17/11, Julie, débit −6) ;
# marques : python manim/scripts/cp/duree_marques.py <ep>  → cp/duree_<ep>_marques.json

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from longueur_cm1_commun import *  # noqa: E402,F401,F403
from duree_commun import (  # noqa: E402,F401
    AIG_H, AIG_M, AIG_S, BOND, BOND2, CADRAN, FRISE, LUNETTE, LUNETTE_B, bond, duree_txt, ecran_digital, frise, hm,
    horloge, regler, secteur_minutes, tableau_hms, tourner,
)


def hl(*a, **k):
    """L'horloge, hors audit (ses nombres 1 à 12 ne sont pas des nombres dits).
    Au CP les nombres du cadran sont un peu plus petits (11, 12 et 1 se touchaient : planche du 17/11)."""
    hg = horloge(*a, **k)
    for n in hg.nums.values():
        n.scale(0.8)
    return hors_audit(hg)


def entoure(hg, k, couleur=JAUNE_TITRE, sw=5, f=1.0):
    """Un cercle autour du nombre k du cadran de l'horloge hg (f < 1 : plus petit, pour deux nombres voisins)."""
    n = hg.nums[k]
    r = 0.165 * hg.cadran.width / 2
    return Circle(radius=f * max(r, n.height * 0.75), color=couleur, stroke_width=sw).move_to(n)


def fleche_vers(depart, cible, couleur=WHITE, sw=5):
    """Une flèche courte d'une étiquette vers un point (une aiguille, un nombre)."""
    return Arrow(depart, cible, buff=0.12, color=couleur, stroke_width=sw, max_tip_length_to_length_ratio=0.18)


def bout_aiguille(hg, quelle="h", k=0.75):
    """Un point le long d'une aiguille (k = fraction de sa longueur depuis le centre)."""
    aig = hg.aig_h if quelle == "h" else hg.aig_m
    c = hg.centre()
    pointe = aig.get_vertices()[0]
    return c + (pointe - c) * k


# ── Les personnages-métiers du lot CP ───────────────────────────────────────

def rose(s=1.0):
    """Rose, horlogère : blouse bleu nuit, cheveux longs, loupe d'horloger à l'œil."""
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#78350f", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    loupe = VGroup(Circle(radius=r * 0.3, fill_color="#111827", fill_opacity=1, stroke_color="#facc15",
                          stroke_width=3 * s),
                   Circle(radius=r * 0.17, fill_color="#93c5fd", fill_opacity=0.8, stroke_width=0))
    loupe.move_to(c + P(r * 0.32, r * 0.08))
    p.add(loupe)
    return p


def leo(s=1.0):
    """Léo, clown de cirque : costume à pois, nez rouge, chapeau pointu."""
    p = personne(peau="#f1c27d", tenue="#7c3aed", cheveux="#f97316", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    nez = Circle(radius=r * 0.2, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(c + P(0, -r * 0.1))
    chap = Polygon(P(-r * 0.6, 0), P(r * 0.6, 0), P(0, r * 1.3), fill_color="#facc15", fill_opacity=1,
                   stroke_width=0).move_to(c + UP * r * 1.35)
    pompon = Circle(radius=r * 0.16, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(
        chap.get_top() + UP * r * 0.08)
    p.add(nez, chap, pompon)
    return p


def malo(s=1.0):
    """Malo, maître-nageur : tee-shirt rouge, sifflet au cou."""
    p = personne(peau="#a16207", tenue="#dc2626", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    cou = c + DOWN * r * 1.15
    cordon = VGroup(Line(cou + P(-r * 0.5, 0), cou + P(0, -r * 1.1)), Line(cou + P(r * 0.5, 0), cou + P(0, -r * 1.1)))
    cordon.set_stroke("#facc15", 4 * s)
    sifflet = RoundedRectangle(width=r * 0.5, height=r * 0.3, corner_radius=r * 0.1, fill_color="#e2e8f0",
                               fill_opacity=1, stroke_width=0).move_to(cou + P(0, -r * 1.2))
    p.add(cordon, sifflet)
    return p


def inaya(s=1.0):
    """Inaya, astronaute : combinaison blanche, casque à visière."""
    p = personne(peau="#8d5524", tenue="#e2e8f0", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = Circle(radius=r * 1.45, stroke_color="#cbd5e1", stroke_width=6 * s, fill_color="#93c5fd",
                    fill_opacity=0.18).move_to(c)
    p.add(casque)
    return p


def tom(s=1.0):
    """Tom, pâtissier : veste blanche, toque blanche."""
    p = personne(peau="#e0ac69", tenue="#f8fafc", cheveux="#78350f", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bande = Rectangle(width=r * 1.7, height=r * 0.35, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    bande.move_to(c + UP * r * 0.95)
    haut = VGroup(*[Circle(radius=r * 0.45, fill_color="#f8fafc", fill_opacity=1, stroke_width=0).move_to(
        c + P(dx * r, r * 1.45)) for dx in (-0.45, 0, 0.45)])
    p.add(haut, bande)
    return p


class PaysageDureeCP(PaysageLongueurCM1):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"


def pointer(hg, quelle, n, run_time=1.0):
    """Animation : UNE aiguille de hg (« h » la petite, « m » la grande) tourne seule, dans le sens des aiguilles
    d'une montre, jusqu'au nombre n du cadran (pour « placer les aiguilles », sans faire tourner l'autre)."""
    aig = hg.aig_h if quelle == "h" else hg.aig_m
    cible = PI / 2 - TAU * (n % 12) / 12
    delta = (cible - hg._ang[quelle]) % TAU
    delta = delta - TAU if delta > 1e-6 else 0.0   # négatif = sens horaire
    hg._ang[quelle] = hg._ang[quelle] + delta
    return Rotate(aig, delta, about_point=hg.centre(), run_time=run_time)


def sans_aiguille(hg, quelle):
    """Retire une aiguille du dessin (elle reste réglée : on la fera apparaître avec montrer_aiguille)."""
    aig = hg.aig_h if quelle == "h" else hg.aig_m
    hg.remove(aig)
    return aig


def coche_v(m, couleur=VERT_OK, s=0.32):
    """Une coche dessinée (pas un caractère), à droite de m."""
    c = VMobject(stroke_color=couleur, stroke_width=8).set_points_as_corners(
        [P(-s * 0.5, 0), P(-s * 0.1, -s * 0.45), P(s * 0.7, s * 0.55)])
    return c.next_to(m, RIGHT, buff=0.25)


def croix_x(m, couleur=ROUGE_ERREUR, s=0.35):
    """Une croix rouge (deux traits) centrée sur m."""
    c = VGroup(Line(P(-s, -s), P(s, s)), Line(P(-s, s), P(s, -s))).set_stroke(couleur, 9)
    return c.move_to(m)


def chapiteau(s=1.0):
    """Le chapiteau du cirque : toit rayé rouge et blanc, fanion."""
    g = VGroup()
    for k in range(6):
        x0, x1 = -1.5 + k * 0.5, -1.0 + k * 0.5
        g.add(Polygon(P(0, 1.3), P(x0, 0), P(x1, 0), fill_color="#ef4444" if k % 2 == 0 else "#f8fafc",
                      fill_opacity=1, stroke_width=0))
    mur = Rectangle(width=3.0, height=1.1, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(0, -0.55))
    porte = Polygon(P(-0.35, -1.1), P(0.35, -1.1), P(0, -0.2), fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    mat = Line(P(0, 1.3), P(0, 1.75), color=WHITE, stroke_width=4)
    fanion = Polygon(P(0, 1.75), P(0.4, 1.62), P(0, 1.5), fill_color="#facc15", fill_opacity=1, stroke_width=0)
    return VGroup(mur, porte, g, mat, fanion).scale(s)


# ── Les moments de la journée (épisode 03) : soleil, lune, assiette, lit, goûter, piscine ─────────────
def soleil(s=1.0):
    """Le soleil : un disque jaune et 8 rayons."""
    d = Circle(radius=0.32, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    r = VGroup(*[Line(P(0.42 * np.cos(a), 0.42 * np.sin(a)), P(0.6 * np.cos(a), 0.6 * np.sin(a)))
                 for a in np.arange(8) * TAU / 8]).set_stroke("#facc15", 6)
    return VGroup(r, d).scale(s)


def lune(s=1.0):
    """La lune : un croissant pâle (un disque moins un disque décalé)."""
    a = Circle(radius=0.36)
    b = Circle(radius=0.31).shift(P(0.17, 0.08))
    c = Difference(a, b, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
    etoiles = VGroup(*[Star(5, outer_radius=0.07, inner_radius=0.03, fill_color="#fef9c3", fill_opacity=1,
                            stroke_width=0).move_to(P(x, y)) for x, y in ((0.45, 0.3), (0.62, -0.12))])
    return VGroup(c, etoiles).scale(s)


def assiette(s=1.0):
    """L'assiette, la fourchette et le couteau (le repas)."""
    a = Circle(radius=0.38, fill_color="#f8fafc", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3)
    b = Circle(radius=0.25, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    f = VGroup(Line(P(-0.55, -0.32), P(-0.55, 0.3)),
               *[Line(P(-0.55 + dx, 0.12), P(-0.55 + dx, 0.32)) for dx in (-0.06, 0.06)]).set_stroke("#cbd5e1", 4)
    k = Line(P(0.55, -0.32), P(0.55, 0.32)).set_stroke("#cbd5e1", 6)
    return VGroup(a, b, f, k).scale(s)


def lit(s=1.0):
    """Le lit : tête de lit, matelas, oreiller, couette bleue."""
    tete = Rectangle(width=0.12, height=0.7, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P(-0.74, 0.05))
    pied = Rectangle(width=0.12, height=0.42, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P(0.74, -0.09))
    mat = Rectangle(width=1.4, height=0.16, fill_color="#f1f5f9", fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    ore = RoundedRectangle(width=0.36, height=0.16, corner_radius=0.06, fill_color="#f8fafc", fill_opacity=1,
                           stroke_width=0).move_to(P(-0.47, 0.04))
    cou = RoundedRectangle(width=1.0, height=0.22, corner_radius=0.08, fill_color="#60a5fa", fill_opacity=1,
                           stroke_width=0).move_to(P(0.17, 0.05))
    return VGroup(tete, pied, mat, ore, cou).scale(s)


def gouter(s=1.0):
    """Le goûter : un pain au chocolat et un verre de lait."""
    pain = RoundedRectangle(width=0.8, height=0.36, corner_radius=0.12, fill_color="#d97706", fill_opacity=1,
                            stroke_width=0).move_to(P(-0.25, -0.12))
    choc = VGroup(*[Line(P(x, -0.27), P(x, 0.03)) for x in (-0.42, -0.08)]).set_stroke("#451a03", 6)
    verre = Polygon(P(0.33, 0.25), P(0.63, 0.25), P(0.58, -0.3), P(0.38, -0.3), fill_color="#f8fafc", fill_opacity=1,
                    stroke_color="#cbd5e1", stroke_width=2)
    return VGroup(pain, choc, verre).scale(s)


def piscine(w=3.6, h=1.2):
    """La piscine vue de face : un bassin bleu, ses vagues, son bord blanc."""
    eau = RoundedRectangle(width=w, height=h, corner_radius=0.15, fill_color="#0ea5e9", fill_opacity=1,
                           stroke_color="#e2e8f0", stroke_width=6)
    vagues = VGroup()
    for k, y in enumerate((h * 0.18, -h * 0.18)):
        pts = [P(x, y + 0.07 * np.sin(6 * x + k)) for x in np.linspace(-w / 2 + 0.3, w / 2 - 0.3, 40)]
        vagues.add(VMobject(stroke_color="#e0f2fe", stroke_width=4).set_points_smoothly(pts))
    return VGroup(eau, vagues)


def panneau(texte, couleur, s=1.0):
    """Un petit panneau (« OUVERT », « FERMÉ ») sur un poteau."""
    t = Text(texte, font_size=26, color=WHITE, weight=BOLD)
    fond = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.3, corner_radius=0.1, fill_color=couleur,
                            fill_opacity=1, stroke_width=0)
    t.move_to(fond)
    poteau = Line(fond.get_bottom(), fond.get_bottom() + DOWN * 0.6).set_stroke("#e2e8f0", 6)
    return VGroup(poteau, fond, t).scale(s)
