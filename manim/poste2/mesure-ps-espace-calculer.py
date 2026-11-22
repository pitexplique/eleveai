# manim/poste2/mesure-ps-espace-calculer.py
# LES COTES DE L'ÉPISODE 7 (« ps_espace_calculer »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-espace-defi.py` (épisode 6), qui est écrit pour ça. Deux leçons
# de la série se rejoignent ici :
#   · « un chiffre non mesuré est un souvenir » — toute cote écrite dans un épisode doit
#     venir d'une commande, pas d'une estimation ;
#   · « une cote se remesure sur l'objet, elle ne se recopie pas » — l'épisode 5 a posé un
#     bloc de deux lignes en se fiant à un chiffre écrit dans la note de reprise, et les
#     ceintures se sont écrites par-dessus.
# Rien ici n'utilise le renderer : `Text`, `VGroup` et `Repere3D` se mesurent à froid, et
# `q_tete` s'appelle sur `EcransEspace.__new__(…)` (recette de l'épisode 3).
#
# ⭐⭐ CE QU'IL A ATTRAPÉ SUR CET ÉPISODE, avant tout rendu — onze blocs, dont trois que
# la version de l'épisode 6 n'aurait PAS vus :
#   · les deux leurres de 04b posés À DROITE DES CARTES (xmax = 4,6 dans la bande
#     y ∈ [−1,25 ; 1,63]) : ils se seraient écrits PAR-DESSUS les cartes A et B ;
#   · le même accident en 09b, où « A G · A C » occupe encore la colonne de droite
#     jusqu'à −2,35 ;
#   · le modèle de rédaction de l'écran 08, ramené à 19,8 px par le plafond de la copie ;
#   · la FINALE, réduite de 27 % (30 px → 21,9) par son plafond de 10,60 ;
#   · le rappel de l'écran 08, hors marge des DEUX côtés (−6,73 et 5,53) ;
#   · six blocs rétrécis par `col()` ou `gauche()` d'un à trois dixièmes.
# ⭐ Les deux réductions par un PLAFOND ne sortaient pas de l'outil de l'épisode 6 :
#   là-bas le plafond était passé en `naturel=min(nat, plafond)`, donc une réduction par
#   le plafond lui-même ne se signalait jamais. D'où `plafonne()` ci-dessous.
#   ⚠️ À reporter dans les mesures des épisodes suivants.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit le
# bloc à la largeur de sa plus longue ligne, donc toucher UN mot déplace tout ce qui pend
# dessous. Et son second garde-fou (« bas sous −1,95 ET droite au-delà de 5,3 → réduire »)
# se déclenche au CENTIÈME près. Le critère : aucune ligne « RÉTRÉCI », aucune
# « HORS MARGE », aucun « RÉDUIT PAR LE PLAFOND », aucun chevauchement dans les colonnes
# de y.
#
#   python -X utf8 manim/poste2/mesure-ps-espace-calculer.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import C_PLAN, C_REGARD, C_VECTEUR, C_VECTEUR2, Repere3D  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace  # noqa: E402
from ps_espace_calculer import (S, U02, U04, U05, U06, V02, V04, V06, W06,  # noqa: E402
                                PsEspaceCalculerBase, kelly, poussee)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
E = EcransEspace.__new__(PsEspaceCalculerBase)
T = lambda s, fs: EcransEspace.t(E, s, fs)                      # noqa: E731
TRIP = lambda t3, fs, **k: EcransEspace.trip(E, t3, fs, **k)    # noqa: E731
NOMME = lambda n, t3, c, fs: PsEspaceCalculerBase.nomme(E, n, t3, c, fs)   # noqa: E731
ZERO = lambda fs=28, c=WHITE: PsEspaceCalculerBase.zero(E, fs, c)          # noqa: E731
CROIX = lambda r=0.13: EcransEspace.croix(E, r=r)               # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)   # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
COCHE = lambda t=0.15: EcransEspace.coche(E, "#00FF7F", t)      # noqa: E731
ennuis = []


def police(carte):
    """La police RÉELLEMENT obtenue par le corps d'une carte de choix.
    ⚠️ Le corps peut être un Text simple (un nombre), un VGroup de Text (choix2) ou un
    triplet : on descend jusqu'au premier objet qui porte `font_size`, sinon on lit un
    glyphe SVG et Manim lève une AttributeError opaque."""
    pile = [carte[1][1]]
    while pile:
        m = pile.pop(0)
        if isinstance(getattr(m, "font_size", None), (int, float)):
            return round(float(m.font_size), 1)
        pile += list(m.submobjects)
    return 0.0


def cadre(nom, *mobs, naturel=None):
    g = VGroup(*[m for m in mobs if m is not None])
    x0, x1 = float(g.get_left()[0]), float(g.get_right()[0])
    y0, y1 = float(g.get_bottom()[1]), float(g.get_top()[1])
    note = ""
    if x0 < -MARGE_X - 1e-6 or x1 > MARGE_X + 1e-6 or y0 < -MARGE_Y - 1e-6 or y1 > MARGE_Y + 1e-6:
        note += "  ⛔ HORS MARGE"
        ennuis.append(f"{nom} : hors marge")
    if naturel is not None and x1 - x0 < naturel - 0.01:
        note += f"  ⛔ RÉTRÉCI ({naturel:.2f} → {x1 - x0:.2f})"
        ennuis.append(f"{nom} : rétréci")
    print(f"  {nom:42s} x ∈ [{x0:6.2f} ; {x1:6.2f}]   y ∈ [{y0:6.2f} ; {y1:6.2f}]{note}")
    return x0, x1, y0, y1


def plafonne(nom, mob, plafond, pos):
    """Un bloc large, borné par `scale_to_fit_width` puis centré sur `pos`.

    ⭐⭐ IL SIGNALE SA RÉDUCTION, et c'est la correction de l'outil de l'épisode 6 :
    là-bas le plafond était passé en `naturel=min(nat, plafond)`, donc une réduction
    PAR LE PLAFOND LUI-MÊME ne sortait jamais. Mesuré ici : la finale de cet épisode
    faisait 14,52 pour 10,60, soit 30 px ramenés à 21,9 — et rien ne l'aurait dit."""
    nat = float(mob.width)
    if nat > plafond:
        mob.scale_to_fit_width(plafond)
    mob.move_to(pos)
    bords = cadre(nom, mob)
    note = ""
    if nat > plafond + 0.01:
        note = f"  ⛔ RÉDUIT PAR LE PLAFOND de {100 * (1 - plafond / nat):.1f} %"
        ennuis.append(f"{nom} : réduit par le plafond")
    print(f"  {'':42s} largeur naturelle {nat:5.2f}   plafond {plafond:5.2f}{note}")
    return bords


def bloc(nom, mob, y, xmax):
    naturel = float(mob.width)
    EcransEspace.gauche(E, mob, y, xmax=xmax)
    return cadre(f"{nom} (y={y}, xmax={xmax})", mob, naturel=naturel)


def droite_(nom, mob, y, xl=2.2):
    naturel = float(mob.width)
    EcransEspace.col(E, mob, y, xl)
    return cadre(f"{nom} (y={y})", mob, naturel=naturel)


print("── 00 : la page de garde ──")
cadre("titre", T("Produit scalaire dans l'espace", 46).to_edge(UP, buff=0.5))
lg = VGroup()
for txt in ("deux vecteurs", "trois multiplications, une addition"):
    lg.add(VGroup(Dot(radius=0.08), T(txt, 38)).arrange(RIGHT, buff=0.26))
lg.arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to(P(-0.9, 0.95))
cadre("les deux promesses", lg)
cadre("echelle() alignée en bas", EcransEspace.echelle(E).align_to(P(0, -3.45), DOWN))
cadre("la ligne finale", T("un nombre, pas un vecteur", 32).move_to(P(-0.9, -1.55)))

print("\n── 01 : Kelly, le schéma, et les quatre blocs ──")
k = kelly(0.68).move_to(P(-5.45, 0.90))
x0k, x1k, y0k, y1k = cadre("Kelly (s = 0,68)", k)
nom = T("Kelly", 32).next_to(k, DOWN, buff=0.20)
if nom.get_left()[0] < -6.5:
    nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
cadre("« Kelly » (après garde-fou)", nom)
met = T("kitesurf à l'Hermitage", 24).next_to(nom, DOWN, buff=0.12)
if met.get_left()[0] < -6.5:
    met.shift(RIGHT * (-6.5 - met.get_left()[0]))
cadre("« kitesurf à l'Hermitage »", met)
sch = poussee(0.92).move_to(P(-2.75, 0.75))
cadre("le schéma de la poussée", sch)
print(f"  écart Kelly → schéma : {float(sch.get_left()[0]) - x1k:.2f}"
      f"{'  ⛔ SE TOUCHENT' if float(sch.get_left()[0]) - x1k < 0.15 else '  ✅'}")
if float(sch.get_left()[0]) - x1k < 0.15:
    ennuis.append("01 : Kelly et le schéma se touchent")
fs = 28
droite_("« seule la partie… »",
        VGroup(T("seule la partie", fs), T("dans le bon sens", fs))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.50)
droite_("« un vent de côté… »",
        VGroup(CROIX(), VGroup(T("un vent de côté", fs), T("ne sert à rien", fs))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08)).arrange(RIGHT, buff=0.22), 1.35)
droite_("« c'est ce que mesure… »",
        VGroup(COCHE(), VGroup(T("c'est ce que mesure", fs), T("un produit scalaire", fs))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08)).arrange(RIGHT, buff=0.22), 0.20)
droite_("« en physique… »",
        VGroup(T("en physique :", fs), T("le travail d'une force", fs))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.95)
fil = T("un seul nombre qui résume l'accord entre deux directions", 26)
bloc("conclusion + cadre",
     VGroup(fil, SurroundingRectangle(fil, buff=0.16, stroke_width=3)), -2.60, 4.6)

print("\n── 02 : la condition, la recette, et l'exemple ──")
cond = VGroup(T("repère", 28), T("ORTHONORMÉ", 28),
              T("obligatoire", 26)).arrange(DOWN, buff=0.10)
# ⛔⛔ LE CONTRÔLE QUI MANQUAIT, ET QUI A COÛTÉ UN RENDU : la mesure voyait le titre et
# voyait la colonne de droite, elle ne les COMPARAIT pas. À y = 2,45 ce cadre de trois
# lignes monte à 3,25 et s'écrivait sur le titre, qui descend à 2,88.
titre02 = T("Le calcul en coordonnées", 46).to_edge(UP, buff=0.5)
tx0, tx1, ty0, ty1 = cadre("titre de l'écran 02", titre02)
bx0, bx1, by0, by1 = droite_(
    "condition + cadre",
    VGroup(cond, SurroundingRectangle(cond, buff=0.14, stroke_width=3)), 1.95)
if by1 > ty0 and bx1 > tx0 and bx0 < tx1:
    ennuis.append("02 : le badge recouvre le titre")
    print("  ⛔ LE BADGE RECOUVRE LE TITRE")
else:
    print(f"  écart badge → titre : {ty0 - by1:.2f}  ✅")
droite_("« on multiplie les x… »",
        VGroup(T("on multiplie les x,", 28), T("les y, les z", 28))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.45)
droite_("« puis on additionne… »",
        VGroup(T("puis on additionne", 28), T("les trois résultats", 28))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.55)
bloc("u (1 ; 2 ; 3)", NOMME("u", U02, C_VECTEUR, 32), 2.35, 1.9)
bloc("v (4 ; −1 ; 2)", NOMME("v", V02, C_VECTEUR2, 32), 1.55, 1.9)
rangs = [VGroup(T(g, 26), T(d, 30)).arrange(RIGHT, buff=0.22)
         for g, d in (("les x :", "1 × 4 = 4"), ("les y :", "2 × (−1) = −2"),
                      ("les z :", "3 × 2 = 6"))]
bloc("les trois produits", VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.22),
     -1.10, 4.6)
tot = VGroup(T("total :", 28), T("4 − 2 + 6 = 8", 34)).arrange(RIGHT, buff=0.22)
bloc("total + cadre", VGroup(tot, SurroundingRectangle(tot[1], buff=0.14, stroke_width=3)),
     -2.75, 4.6)

print("\n── 03 : les trois rangées, pleine largeur ──")
rangs3 = []
for k3, (g, d) in enumerate((("le résultat :", "un nombre réel, jamais un vecteur"),
                             ("seconde formule :",
                              ("u · v = ‖u‖ × ‖v‖ × cos θ", ("u", "v"))),
                             ("le plus utile :", ("u · u = ‖u‖²", ("u",)))), start=1):
    corps3 = VX(d[0], d[1], 30) if isinstance(d, tuple) else T(d, 30)
    rangs3.append(VGroup(EcransEspace.pastille(E, k3), T(g, 30), corps3)
                  .arrange(RIGHT, buff=0.24))
plafonne("les trois rangées", VGroup(*rangs3).arrange(DOWN, aligned_edge=LEFT, buff=0.50),
         10.6, P(-0.75, 0.85))
rap = VGroup(T("le produit scalaire d'un vecteur par lui-même", 28),
             T("est le carré de sa norme", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.10)
bloc("rappel (2 lignes) + cadre",
     VGroup(rap, SurroundingRectangle(rap, buff=0.16, stroke_width=3)), -2.45, 4.6)

print("\n── 04 : la question-pause n° 1 (largeur 4,9 ; xl 1,65) ──")
cC = VGroup(T("le vecteur", 28), TRIP((2, 0, -2), 30))
cC.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
cC.nb = cC[1].nb
tete, q, cartes, pause, rebours = EcransEspace.q_tete(
    E, [T("que vaut le produit scalaire", 32), VX("de u et v ?", ("u", "v"), 32)],
    [T("4", 34), ZERO(34), cC], largeur=4.9, xl=1.65)
cadre("tête « Question ! » + rebours", tete, rebours)
cadre("question (2 lignes)", q)
xc0, xc1, yc0, yc1 = cadre("les trois cartes", cartes)
cadre("« Mets pause, et choisis ! »", pause)
pol = [police(c) for c in cartes]
print(f"  polices obtenues : {pol}  (demandées 34 / 34 / 28)"
      f"{'  ⛔ RÉDUITES' if min(pol[:2]) < 33.5 or pol[2] < 27.5 else '  ✅'}")
if min(pol[:2]) < 33.5 or pol[2] < 27.5:
    ennuis.append("04 : cartes réduites")
bloc("u (2 ; 0 ; −1)", NOMME("u", U04, C_VECTEUR, 34), 1.50, 1.45)
bloc("v (1 ; 5 ; 2)", NOMME("v", V04, C_VECTEUR2, 34), 0.60, 1.45)

print("\n── 04b : les blocs de gauche (cartes : x ≥ %.2f, y ∈ [%.2f ; %.2f]) ──"
      % (xc0, yc0, yc1))
# ⛔⛔ CET ÉCRAN HÉRITE DE 04 : u (y ∈ [1,28 ; 1,72]) et v (y ∈ [0,38 ; 0,82]) RESTENT.
# Le calcul est donc UN SEUL bloc, posé dessous — la première version le posait en
# quatre morceaux à 1,55 / 0,75 / −0,05 / −0,95, c'est-à-dire PAR-DESSUS les données.
calc = VGroup(T("2 × 1 = 2", 32),
              VGroup(ZERO(32), T("× 5 =", 32), ZERO(32)).arrange(RIGHT, buff=0.18),
              T("(−1) × 2 = −2", 32),
              T("2 + 0 − 2 = 0", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
cx0, cx1, cy0, cy1 = bloc("le calcul (4 lignes, sous u et v)", calc, -0.78, 1.45)
if cy1 > 0.38:
    ennuis.append("04b : le calcul recouvre la donnée v")
    print("  ⛔ LE CALCUL RECOUVRE v (bas 0,38)")
else:
    print(f"  écart calcul → v : {0.38 - cy1:.2f}  ✅")
bloc("leurre A « le signe oublié »",
     VGroup(CROIX(0.12), T("4", 30), T(": le signe moins oublié", 26))
     .arrange(RIGHT, buff=0.18), -2.15, 4.6)
bloc("leurre C « pas du bon type »",
     VGroup(CROIX(0.12), T("un produit scalaire est un NOMBRE, pas un vecteur", 26))
     .arrange(RIGHT, buff=0.18), -2.60, 4.6)
ort = VX("ce zéro n'est pas rien : u et v sont ORTHOGONAUX", ("u", "v"), 28)
bloc("conclusion + cadre",
     VGroup(ort, SurroundingRectangle(ort, buff=0.16, stroke_width=3)), -3.20, 4.6)

print("\n── 05 : le repère, le vecteur u, et la colonne de droite ──")
r05, ax05 = EcransEspace.repere(E, o=(-4.85, -1.85), u=0.62, portee=4)
fu = r05.vecteur((0, 0, 0), U05, "u", couleur=C_VECTEUR, sw=7)
esc = r05.point(*U05, nom=None, couleur=C_VECTEUR, r=0.06, escalier=True)
cadre("repère (portée 4) + u + escalier", ax05, fu, esc)
droite_("u (1 ; 2 ; 3)", NOMME("u", U05, C_VECTEUR, 30), 2.45)
droite_("« u · u = 1 × 1 + 2 × 2 + 3 × 3 »",
        VGroup(VX("u · u =", ("u",), 28), T("1 × 1 + 2 × 2 + 3 × 3", 28))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 1.35)
droite_("« = 1 + 4 + 9 = 14 »", T("= 1 + 4 + 9 = 14", 32), 0.40)
nor = VGroup(VX("‖u‖ =", ("u",), 34), T("√14", 34)).arrange(RIGHT, buff=0.16)
droite_("norme + cadre",
        VGroup(nor, SurroundingRectangle(nor, buff=0.14, stroke_width=3)), -0.60)
bloc("« deux lignes, et on a une longueur »",
     T("deux lignes, et on a une longueur", 32), -3.10, 4.6)

print("\n── 06 : le piège ──")
bloc("« ça ressemble à une multiplication »",
     VGroup(T("ça ressemble à", 28), T("une multiplication...", 28))
     .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.30, 1.9)
droite_("« symétrique »",
        VGroup(COCHE(), VGroup(T("symétrique :", 28), VX("u · v = v · u", ("u", "v"), 28))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.55)
droite_("« distributif » (3 lignes)",
        VGroup(COCHE(), VGroup(T("distributif :", 28),
                               VX("u · (v + w) =", ("u", "v", "w"), 28),
                               VX("u · v + u · w", ("u", "v", "w"), 28))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), 1.20)
droite_("« si u · v = u · w » (3 lignes)",
        VGroup(CROIX(), VGroup(VX("si u · v = u · w,", ("u", "v", "w"), 28),
                               T("on ne conclut PAS", 28), VX("que v = w", ("v", "w"), 28))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.35)
r06 = Repere3D(o=np.array([-5.00, -1.30, 0.0]), u=1.45, portee=2)
f06 = VGroup(*[r06.vecteur((0, 0, 0), t3, n, couleur=c, sw=7, fs=28, decal=d)
               for n, t3, c, d in (("u", U06, C_VECTEUR, DOWN), ("v", V06, C_VECTEUR2, RIGHT),
                                   ("w", W06, C_PLAN, UP))])
cadre("les trois vecteurs (SANS axes)", f06)
bloc("« u · v = 0 et u · w = 0 »",
     VGroup(VX("u · v =", ("u", "v"), 30), ZERO(30), T("et", 28),
            VX("u · w =", ("u", "w"), 30), ZERO(30))
     .arrange(RIGHT, buff=0.18), -2.45, 4.6)
pt = VX("et pourtant v ≠ w", ("v", "w"), 34)
bloc("« et pourtant v ≠ w » + cadre",
     VGroup(pt, SurroundingRectangle(pt, buff=0.14, stroke_width=3)), -3.17, 4.6)

print("\n── 07 : la question-pause n° 2 (largeur 6,3 ; xl 0,35) ──")
tete2, q2, cartes2, pause2, rebours2 = EcransEspace.q_tete(
    E, ["que peut-on dire ?"],
    [T("ils sont orthogonaux", 28), T("ils sont colinéaires", 28),
     EcransEspace.choix2(E, "l'un des deux est", "le vecteur nul", fs=28)],
    largeur=6.3, xl=0.35)
cadre("question (1 ligne)", q2)
x20, x21, y20, y21 = cadre("les trois cartes", cartes2)
cadre("« Mets pause, et choisis ! »", pause2)
pol2 = [police(c) for c in cartes2]
print(f"  polices obtenues : {pol2}  (demandée 28)"
      f"{'  ⛔ RÉDUITES' if min(pol2) < 27.5 else '  ✅'}")
if min(pol2) < 27.5:
    ennuis.append("07 : cartes réduites")
don = VGroup(VGroup(VX("u · v =", ("u", "v"), 30),
                    ZERO(30, C_REGARD)).arrange(RIGHT, buff=0.18),
             VGroup(VX("u ≠", ("u",), 30), ZERO(30), T("et", 26),
                    VX("v ≠", ("v",), 30), ZERO(30))
             .arrange(RIGHT, buff=0.16)).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
bloc("la donnée (2 lignes)", don, 1.55, -0.1)

print("\n── 07b : les blocs de gauche (cartes : x ≥ %.2f, y ∈ [%.2f ; %.2f]) ──"
      % (x20, y20, y21))
bloc("« c'est LA définition » (3 lignes, 26)",
     VGroup(COCHE(0.14), VGroup(T("produit nul, vecteurs non nuls :", 26),
                                T("c'est LA définition", 26), T("de l'orthogonalité", 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
     .arrange(RIGHT, buff=0.20, aligned_edge=UP), -0.45, -0.1)
bloc("« colinéaires » (2 lignes)",
     VGroup(CROIX(0.12), VGroup(T("colinéaires : le cas extrême OPPOSÉ —", 26),
                                T("le produit scalaire y vaut le produit des normes", 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
     .arrange(RIGHT, buff=0.18, aligned_edge=UP), -1.95, 4.6)
l3 = VGroup(T("la réponse C se contredit elle-même :", 26),
            T("lis toujours l'énoncé jusqu'au bout", 26))
l3.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
bloc("conclusion (2 lignes) + cadre",
     VGroup(l3, SurroundingRectangle(l3, buff=0.14, stroke_width=3)), -3.00, 4.6)

print("\n── 08 : la copie ──")
copie = RoundedRectangle(width=10.2, height=3.0, corner_radius=0.18, stroke_width=3)
copie.move_to(P(-0.6, -0.45))
marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
             copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2)
cadre("la copie", copie)
rangs8 = [VGroup(EcransEspace.pastille(E, k8),
                 VX(txt[0], txt[1], 24) if isinstance(txt, tuple) else T(txt, 24))
          .arrange(RIGHT, buff=0.30)
          for k8, txt in enumerate(
              (("les coordonnées de u et de v", ("u", "v")),
               "la somme des trois produits, signes visibles",
               "puis seulement le résultat"), start=1)]
l8 = VGroup(*rangs8).arrange(DOWN, aligned_edge=LEFT, buff=0.34)
plafonne("les trois points (plafond de la copie)", l8, 8.6, copie.get_center())
l8.align_to(marge.get_center() + RIGHT * 0.3, LEFT)
cadre("les trois points, recalés sur la marge", l8)
if float(l8.get_right()[0]) > float(copie.get_right()[0]) - 0.2:
    ennuis.append("08 : le texte sort de la copie")
    print("  ⛔ LE TEXTE SORT DE LA COPIE")
rap8 = VGroup(T("le correcteur cherche la ligne de calcul,", 26),
              T("pas seulement le nombre", 26)).arrange(DOWN, buff=0.08)
g8 = VGroup(rap8, SurroundingRectangle(rap8, buff=0.12, stroke_width=3))
g8.next_to(copie, DOWN, buff=0.28)
cadre("le rappel (2 lignes) sous la copie", g8)

print("\n── 09 : le cube, le repère, les deux questions ──")
r09, cube09 = PsEspaceCalculerBase.cube_repere(E, o=(-5.3, 0.25), u=1.3)
cadre("cube (u = 1,3)", cube09)
cadre("cube + les trois vecteurs de base", cube09,
      PsEspaceCalculerBase.base_repere(E, r09))
droite_("« cube d'arête 1 »",
        VGroup(T("cube d'arête", 30), T("1", 32)).arrange(RIGHT, buff=0.18), 2.55)
for k9, lignes_q, y9 in (
        (1, [("calcule le produit scalaire", ()), ("de A G et A B", ("A G", "A B"))], -1.25),
        (2, [("puis celui de A G et A C", ("A G", "A C"))], -2.25)):
    corps = VGroup(*[VX(x, n, 26) if n else T(x, 26) for x, n in lignes_q]
                   ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
    bloc(f"question {k9}", VGroup(EcransEspace.pastille(E, k9), corps)
         .arrange(RIGHT, buff=0.26, aligned_edge=UP), y9, 4.6)
pz = T("Mets pause, et cherche !", 30)
EcransEspace.gauche(E, pz, -3.10, xmax=4.6)
cadre("pause + rebours (côte à côte)", pz,
      CompteARebours(5, r=0.34, fs=32).next_to(pz, RIGHT, buff=0.35))

print("\n── 09b : la colonne de droite, et les trois blocs de gauche ──")
cadre("A G, A B et A C dans le cube",
      VGroup(*[r09.vecteur(S["A"], S[s], None, couleur=c, sw=7)
               for s, c in (("G", C_REGARD), ("B", C_VECTEUR), ("C", C_VECTEUR2))]))
droite_("A G (1 ; 1 ; 1)", NOMME("A G", S["G"], C_REGARD, 30), 1.60)
droite_("A B (1 ; 0 ; 0)", NOMME("A B", S["B"], C_VECTEUR, 30), 0.70)
droite_("A G · A B = 1 (3 lignes)",
        VGroup(VX("A G · A B =", ("A G", "A B"), 26),
               VGroup(T("1 × 1 + 1 ×", 26), ZERO(26), T("+ 1 ×", 26), ZERO(26))
               .arrange(RIGHT, buff=0.14),
               VGroup(T("=", 26), T("1", 32)).arrange(RIGHT, buff=0.14))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -0.30)
droite_("A C (1 ; 1 ; 0)", NOMME("A C", S["C"], C_VECTEUR2, 30), -1.25)
droite_("A G · A C = 2 (2 lignes)",
        VGroup(VX("A G · A C =", ("A G", "A C"), 26),
               VGroup(T("1 + 1 +", 26), ZERO(26), T("=", 26), T("2", 32))
               .arrange(RIGHT, buff=0.14))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -2.00)
bloc("« les deux résultats sont positifs »",
     T("les deux résultats sont positifs", 28), -1.20, 1.9)
bloc("« on ne compare PAS » (2 lignes)",
     VGroup(CROIX(0.12), VGroup(T("on ne compare PAS ces deux nombres :", 26),
                                T("les normes diffèrent", 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
     .arrange(RIGHT, buff=0.18, aligned_edge=UP), -2.38, 1.9)
ang = T("pour les angles : on divise par les normes", 28)
bloc("« pour les angles » + cadre",
     VGroup(ang, SurroundingRectangle(ang, buff=0.14, stroke_width=3)), -3.20, 4.6)

print("\n── 10 : les quatre faits ──")
blocs10 = [VGroup(VX(g[0], g[1], 28) if isinstance(g, tuple) else T(g, 28), T(d, 28))
           .arrange(RIGHT, buff=0.22)
           for g, d in (("repère orthonormé :", "la somme des trois produits"),
                        ("le résultat :", "un nombre, jamais un vecteur"),
                        (("u · u :", ("u",)), "le carré de la norme"),
                        ("produit scalaire nul :", "orthogonaux"))]
plafonne("les quatre faits (Ti-Margo 0,65 : x ≥ 5,30)",
         VGroup(*[VGroup(COCHE(0.22), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                  for b in blocs10]).arrange(DOWN, aligned_edge=LEFT, buff=0.45),
         10.6, P(-0.75, 0.10))

print("\n── la passe arithmétique du défi, refaite ici ──")
print(f"  A G · A B = {sum(S['G'][i] * S['B'][i] for i in range(3))}   "
      f"A G · A C = {sum(S['G'][i] * S['C'][i] for i in range(3))}")

print()
if ennuis:
    print("⛔ " + str(len(ennuis)) + " problème(s) : " + " | ".join(ennuis))
    sys.exit(1)
print("✅ aucune cote hors marge, aucun bloc rétréci, aucune réduction par un plafond")
