# longueur_cm1_commun.py
# EleveAI — Maths CM1 — série « Longueurs » (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux paysages longueur_comparer, longueur_convertir, longueur_estimer, longueur_mesurer, longueur_defi.
# Base : contenance_cm1_commun (PaysageContenanceCM1 = PaysagePerimetreCM1 = PhraseAGauche + PaysageAireCM1),
# importée sans la modifier.
# Ici : la règle graduée (cm, mm), le ruban / le fil (une barre colorée à l'échelle), le tableau de conversion
# (km hm dam m dm cm mm), le schéma en barre, les personnages-métiers du lot (Jade, Bilal, Sarah, Adam, Zoé).
# Unités du CM1 : km, m, cm, mm, des entiers (comme la banque du coach `cm1/maths/longueur.bank.ts`).
# Voix : manim/voix/cm1-longueur-<ep>.json (validées le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm1/aire_marques.py longueur:<ep>  (⛔ jamais sans argument).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm1_commun import *  # noqa: E402,F401,F403

RUBAN = "#f472b6"      # le ruban rose (longueur par défaut)
RUBAN2 = "#a78bfa"     # un second ruban (violet)
RUBAN3 = "#facc15"     # un troisième (jaune)
RUBAN4 = "#34d399"     # un quatrième (vert d'eau)
BOIS = "#fde68a"       # le corps de la règle
BOIS_B = "#b45309"     # son bord
TRAIT = "#1f2937"      # les graduations


def regle(n_cm=12, u=0.9, mm=True, depuis=0, h=0.75, fs=20):
    """La règle graduée : de `depuis` à `depuis + n_cm` cm, u unités Manim par cm.
    Grands traits numérotés (cm), traits moyens (demi-cm), petits traits (mm) si mm=True.
    r.x(v) = l'abscisse (en coordonnées de la scène, après placement) de la graduation v.
    Les nombres de la règle sont hors audit (on les LIT, la voix ne les dit pas tous)."""
    L = n_cm * u
    corps = RoundedRectangle(width=L + 0.5, height=h, corner_radius=0.08, fill_color=BOIS, fill_opacity=1,
                             stroke_color=BOIS_B, stroke_width=3)
    g = VGroup(corps)
    x0 = -L / 2
    haut = h / 2
    traits, nums = VGroup(), VGroup()
    pas = 10 if mm else 2
    for k in range(n_cm * pas + 1):
        x = x0 + k * u / pas
        if k % pas == 0:
            lg, sw = h * 0.45, 3
        elif pas == 10 and k % 5 == 0:
            lg, sw = h * 0.32, 2
        else:
            lg, sw = h * (0.2 if pas == 10 else 0.32), 1.5
        traits.add(Line(P(x, haut), P(x, haut - lg), color=TRAIT, stroke_width=sw))
        if k % pas == 0:
            n = Text(str(depuis + k // pas), font_size=fs, color=TRAIT, weight=BOLD)
            n.move_to(P(x, haut - h * 0.68))
            nums.add(hors_audit(n))
    g.add(traits, nums)
    g.corps, g.traits, g.nums, g.u, g.depuis, g.n_cm = corps, traits, nums, u, depuis, n_cm
    # x(v) suit la règle si on la déplace ou l'agrandit (on relit la place et la largeur du corps)
    g.x =lambda v: g.corps.get_center()[0] + (-L / 2 + (v - depuis) * u) * g.corps.width / (L + 0.5)
    g.haut = lambda: g.corps.get_top()[1]
    return g


def sur_regle(r, debut, fin, couleur=RUBAN, ep=0.32, ecart=0.06):
    """Un objet (bande colorée) posé AU-DESSUS de la règle r, de la graduation `debut` à `fin`."""
    xa, xb = r.x(debut), r.x(fin)
    b = Rectangle(width=max(xb - xa, 0.01), height=ep, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                  stroke_width=2)
    b.move_to(P((xa + xb) / 2, r.haut() + ecart + ep / 2))
    return b


def crayon(longueur, ep=0.3, corps="#facc15", pointe="#fde68a"):
    """Un crayon couché (gomme rose à gauche, pointe à droite), de longueur totale `longueur`."""
    lp = min(ep * 1.2, longueur * 0.25)
    gomme = Rectangle(width=ep * 0.7, height=ep, fill_color="#f9a8d4", fill_opacity=1, stroke_width=0)
    bague = Rectangle(width=ep * 0.25, height=ep, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)
    lc = longueur - lp - ep * 0.95
    c = Rectangle(width=max(lc, 0.05), height=ep, fill_color=corps, fill_opacity=1, stroke_width=0)
    g = VGroup(gomme, bague, c).arrange(RIGHT, buff=0)
    tip = Polygon(P(0, ep / 2), P(0, -ep / 2), P(lp, 0), fill_color=pointe, fill_opacity=1, stroke_width=0)
    tip.next_to(c, RIGHT, buff=0)
    mine = Polygon(P(0, ep * 0.17), P(0, -ep * 0.17), P(lp * 0.34, 0), fill_color=TRAIT, fill_opacity=1,
                   stroke_width=0).align_to(tip, RIGHT).set_y(tip.get_y())
    g.add(tip, mine)
    return g


def crayon_sur_regle(r, debut, fin, ep=0.3, **kw):
    """Le crayon posé au-dessus de la règle, de `debut` à `fin` (cm)."""
    c = crayon(r.x(fin) - r.x(debut), ep, **kw)
    c.move_to(P((r.x(debut) + r.x(fin)) / 2, r.haut() + 0.06 + ep / 2))
    return c


def repere(r, v, couleur=ORANGE_RETENUE, h=0.55):
    """Un trait vertical qui tombe sur la graduation v de la règle (pour montrer « le début », « la fin »)."""
    x = r.x(v)
    return Line(P(x, r.haut() + h), P(x, r.haut() - 0.05), color=couleur, stroke_width=5)


def ruban(longueur, couleur=RUBAN, ep=0.28, sw=2):
    """Un ruban (ou un fil, un câble) : une bande colorée de `longueur` unités Manim."""
    return Rectangle(width=max(longueur, 0.02), height=ep, fill_color=couleur, fill_opacity=1,
                     stroke_color=WHITE, stroke_width=sw)


def rubans_alignes(longueurs, couleurs, ech, buff=0.45, ep=0.28):
    """Des rubans les uns sous les autres, alignés à GAUCHE (on voit tout de suite le plus long).
    longueurs en cm, ech = unités Manim par cm."""
    g = VGroup(*[ruban(l * ech, c, ep) for l, c in zip(longueurs, couleurs)])
    g.arrange(DOWN, buff=buff, aligned_edge=LEFT)
    return g


def etiq(m, s, fs=26, couleur=JAUNE_TITRE, cote=RIGHT, buff=0.18, audit=False):
    """L'étiquette d'un ruban ou d'un objet (« 85 cm »), à sa droite par défaut. Hors audit par défaut."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(m, cote, buff=buff)
    return t if audit else hors_audit(t)


COLS = ["km", "hm", "dam", "m", "dm", "cm", "mm"]


def tableau_conv(cols=COLS, cw=0.95, ch=0.62, fs=24, surligne=()):
    """Le tableau de conversion : une ligne d'en-têtes (km … mm) et une ligne vide à remplir.
    t.case(u) = le centre de la case vide de la colonne u ; t.tete[u] = l'en-tête (hors audit).
    surligne : les colonnes à fond coloré (l'unité de départ, l'unité cherchée)."""
    g = VGroup()
    tetes, cases = {}, {}
    for i, u in enumerate(cols):
        x = (i - (len(cols) - 1) / 2) * cw
        hc = Rectangle(width=cw, height=ch, fill_color="#1e3a8a" if u not in surligne else "#b45309",
                       fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(x, ch / 2))
        bc = Rectangle(width=cw, height=ch * 1.15, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).move_to(P(x, -ch * 1.15 / 2))
        t = hors_audit(Text(u, font_size=fs, color=WHITE, weight=BOLD).move_to(hc))
        g.add(hc, bc, t)
        tetes[u], cases[u] = t, bc
    g.tete, g.cases = tetes, cases
    g.case = lambda u: g.cases[u].get_center()
    return g


def chiffre(t, u, s, couleur=BLEU_D, fs=34, audit=False):
    """Un chiffre posé dans la case u du tableau t."""
    c = Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(t.case(u))
    return c if audit else hors_audit(c)


def barre(parts, ech, couleurs=(RUBAN2, "#475569"), h=0.6, inconnue=None):
    """Le schéma en barre : des parts côte à côte (longueurs dans la même unité, ech unités Manim par unité).
    inconnue = l'indice de la part cherchée (hachurée en pointillés, fond sombre)."""
    g = VGroup()
    for k, p in enumerate(parts):
        c = couleurs[k % len(couleurs)]
        r = Rectangle(width=p * ech, height=h, fill_color=c, fill_opacity=0.9 if k != inconnue else 0.25,
                      stroke_color=WHITE, stroke_width=3)
        if k == inconnue:
            r.set_stroke(ORANGE_RETENUE, 4)
        g.add(r)
    g.arrange(RIGHT, buff=0)
    return g


def accolade(m, s, fs=26, couleur=JAUNE_TITRE, dessus=True, audit=False):
    """Une accolade au-dessus (ou au-dessous) de m, avec son texte."""
    b = Brace(m, UP if dessus else DOWN, color=couleur)
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(b, UP if dessus else DOWN, buff=0.1)
    if not audit:
        hors_audit(t)
    return VGroup(b, t)


# ── Les personnages-métiers du lot ──────────────────────────────────────────

def jade(s=1.0):
    """Jade, couturière : blouse rose, mètre ruban jaune autour du cou."""
    p = personne(peau="#8d5524", tenue="#db2777", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    cou = c + DOWN * r * 1.15
    metre = VGroup(Line(cou + P(-r * 0.7, 0), cou + P(-r * 0.55, -r * 1.6), color="#facc15", stroke_width=9 * s),
                   Line(cou + P(r * 0.7, 0), cou + P(r * 0.55, -r * 1.6), color="#facc15", stroke_width=9 * s),
                   Line(cou + P(-r * 0.7, 0), cou + P(r * 0.7, 0), color="#facc15", stroke_width=9 * s))
    p.add(metre)
    return p


def bilal(s=1.0):
    """Bilal, électricien : tenue bleue, casque de chantier jaune, câble enroulé à l'épaule."""
    p = personne(peau="#a16207", tenue="#1d4ed8", cheveux="#111827", s=s)
    p.add(casquette(p, "#facc15"))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Circle(radius=r * 0.55, color="#f97316", stroke_width=7 * s).move_to(c + P(r * 1.3, -r * 2.2)))
    return p


def sarah(s=1.0):
    """Sarah, guide nature : veste verte, chapeau de brousse beige."""
    p = personne(peau="#f1c27d", tenue="#166534", cheveux="#b45309", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 2.8, height=r * 0.45, fill_color="#d6b98c", fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.85, angle=PI, start_angle=0, fill_color="#d6b98c",
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    p.add(dome, bord)
    return p


def adam(s=1.0):
    """Adam, dessinateur de bandes dessinées : sweat orange, béret noir, crayon à l'oreille."""
    p = personne(peau="#e0ac69", tenue="#ea580c", cheveux="#1f2937", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    beret = Ellipse(width=r * 2.2, height=r * 0.7, fill_color="#111827", fill_opacity=1, stroke_width=0)
    beret.move_to(c + UP * r * 0.85).rotate(0.12)
    p.add(beret, crayon(r * 1.6, r * 0.22).rotate(0.5).move_to(c + P(r * 1.05, r * 0.15)))
    return p


def zoe(s=1.0):
    """Zoé, factrice à vélo : veste jaune, casquette bleue, sacoche."""
    p = personne(peau="#8d5524", tenue="#facc15", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#1d4ed8"))
    c, r = p.tete.get_center(), p.tete.width / 2
    sac = RoundedRectangle(width=r * 1.3, height=r * 1.0, corner_radius=r * 0.15, fill_color="#1d4ed8",
                           fill_opacity=1, stroke_width=0).move_to(c + P(-r * 1.25, -r * 3.0))
    p.add(sac)
    return p


def velo(s=1.0, couleur="#38bdf8"):
    """Un vélo de profil (deux roues, cadre)."""
    rr = 0.42 * s
    r1 = Circle(radius=rr, color=WHITE, stroke_width=4).move_to(P(-0.7 * s, 0))
    r2 = Circle(radius=rr, color=WHITE, stroke_width=4).move_to(P(0.7 * s, 0))
    a, b, c_, d = P(-0.7 * s, 0), P(0.7 * s, 0), P(-0.1 * s, 0.55 * s), P(0.45 * s, 0.6 * s)
    cadre = VGroup(Line(a, c_), Line(c_, P(0.1 * s, 0)), Line(P(0.1 * s, 0), a), Line(c_, d), Line(d, b),
                   Line(P(0.1 * s, 0), d)).set_stroke(couleur, 5)
    return VGroup(r1, r2, cadre)


class PaysageLongueurCM1(PaysageContenanceCM1):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
