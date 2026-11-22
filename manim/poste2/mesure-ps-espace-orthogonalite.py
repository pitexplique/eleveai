# manim/poste2/mesure-ps-espace-orthogonalite.py
# LES COTES DE L'ÉPISODE 8 (« ps_espace_orthogonalite »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-calculer.py` (épisode 7), qui est la version la plus
# complète de l'outil : il signale les blocs RÉTRÉCIS, les réductions PAR UN PLAFOND (que
# la version de E6 ne voyait pas) et il COMPARE la colonne de droite au TITRE (défaut payé
# sur E7, où un badge de trois lignes s'écrivait sur le titre sans qu'aucun instrument ne
# le dise). Deux leçons de la série se rejoignent ici :
#   · « un chiffre non mesuré est un souvenir » — toute cote écrite dans un épisode doit
#     venir d'une commande, pas d'une estimation ;
#   · « une cote se remesure sur l'objet, elle ne se recopie pas ».
# Rien ici n'utilise le renderer : `Text`, `VGroup` et `Repere3D` se mesurent à froid, et
# `q_tete` s'appelle sur `EcransEspace.__new__(…)` (recette de l'épisode 3).
#
# ⚠️ CE QUE CET ÉPISODE AJOUTE À L'OUTIL : un contrôle des ÉTIQUETTES DE FIGURE deux à
# deux (`etiquettes()`). Les trois vecteurs du défi partent de deux sommets seulement et
# le plan (B D E) se projette à plat (9,0°, donc les vecteurs B D et B E ne sont séparés
# que de 19° à l'écran) : leurs noms peuvent se toucher, et jusqu'ici seul le gros plan
# l'aurait dit.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit le
# bloc à la largeur de sa plus longue ligne, donc toucher UN mot déplace tout ce qui pend
# dessous. Et son second garde-fou (« bas sous −1,95 ET droite au-delà de 5,3 → réduire »)
# se déclenche au CENTIÈME près. Le critère : aucune ligne « RÉTRÉCI », aucune
# « HORS MARGE », aucun « RÉDUIT PAR LE PLAFOND », aucun chevauchement.
#
#   python -X utf8 manim/poste2/mesure-ps-espace-orthogonalite.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import C_PLAN, C_REGARD, C_VECTEUR, C_VECTEUR2, Repere3D  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace  # noqa: E402
from ps_espace_orthogonalite import (AG, BD, BE, S, U02, U04, U05, V02,  # noqa: E402
                                     V04, V05, N05,
                                     PsEspaceOrthogonaliteBase, marc,
                                     plan_poteau, poteau_vue)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
E = EcransEspace.__new__(PsEspaceOrthogonaliteBase)
T = lambda s, fs: EcransEspace.t(E, s, fs)                      # noqa: E731
TRIP = lambda t3, fs, **k: EcransEspace.trip(E, t3, fs, **k)    # noqa: E731
NOMME = lambda n, t3, c, fs: PsEspaceOrthogonaliteBase.nomme(E, n, t3, c, fs)   # noqa: E731
ZERO = lambda fs=28, c=WHITE: PsEspaceOrthogonaliteBase.zero(E, fs, c)          # noqa: E731
CROIX = lambda r=0.13: EcransEspace.croix(E, r=r)               # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)   # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
COCHE = lambda t=0.15: EcransEspace.coche(E, "#00FF7F", t)      # noqa: E731
CH2 = lambda a, b, fs=28, **k: EcransEspace.choix2(E, a, b, fs, **k)   # noqa: E731
ennuis = []


def police(carte):
    """La police RÉELLEMENT obtenue par le corps d'une carte de choix."""
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
    print(f"  {nom:44s} x ∈ [{x0:6.2f} ; {x1:6.2f}]   y ∈ [{y0:6.2f} ; {y1:6.2f}]{note}")
    return x0, x1, y0, y1


def plafonne(nom, mob, plafond, pos):
    """Un bloc large, borné par `scale_to_fit_width` puis centré sur `pos`.
    ⭐⭐ IL SIGNALE SA RÉDUCTION — correction de l'outil de l'épisode 6, où le plafond
    était passé en `naturel=min(nat, plafond)` et où une réduction PAR LE PLAFOND
    lui-même ne sortait donc jamais."""
    nat = float(mob.width)
    if nat > plafond:
        mob.scale_to_fit_width(plafond)
    mob.move_to(pos)
    bords = cadre(nom, mob)
    note = ""
    if nat > plafond + 0.01:
        note = f"  ⛔ RÉDUIT PAR LE PLAFOND de {100 * (1 - plafond / nat):.1f} %"
        ennuis.append(f"{nom} : réduit par le plafond")
    print(f"  {'':44s} largeur naturelle {nat:5.2f}   plafond {plafond:5.2f}{note}")
    return bords


def bloc(nom, mob, y, xmax):
    naturel = float(mob.width)
    EcransEspace.gauche(E, mob, y, xmax=xmax)
    return cadre(f"{nom} (y={y}, xmax={xmax})", mob, naturel=naturel)


def droite_(nom, mob, y, xl=2.2):
    naturel = float(mob.width)
    EcransEspace.col(E, mob, y, xl)
    return cadre(f"{nom} (y={y})", mob, naturel=naturel)


def contre_titre(cle, titre, *blocs_droite):
    """⛔⛔ LE CONTRÔLE QUI MANQUAIT SUR E7 : le titre est posé par `to_edge`, la colonne
    par `col()`, et la mesure ne les COMPARAIT pas. Un badge de trois lignes à y = 2,45
    monte à 3,25 et s'écrit sur un titre qui descend à 2,88."""
    tx0, tx1, ty0, ty1 = (float(titre.get_left()[0]), float(titre.get_right()[0]),
                          float(titre.get_bottom()[1]), float(titre.get_top()[1]))
    for b in blocs_droite:
        bx0, bx1, by0, by1 = b
        if by1 > ty0 and bx1 > tx0 and bx0 < tx1:
            ennuis.append(f"{cle} : un bloc recouvre le titre")
            print("  ⛔ UN BLOC RECOUVRE LE TITRE")
            return
    haut = max(b[3] for b in blocs_droite) if blocs_droite else -99
    print(f"  écart colonne → titre : {ty0 - haut:.2f}  ✅")


def etiquettes(cle, *paires):
    """⭐ LES ÉTIQUETTES DE FIGURE, DEUX À DEUX. Ajouté pour cet épisode : le plan (B D E)
    se projette à 9,0°, donc B D et B E ne sont séparés que de 19° à l'écran, et leurs
    noms peuvent se toucher. Jusqu'ici, seul le gros plan l'aurait dit."""
    for i in range(len(paires)):
        for j in range(i + 1, len(paires)):
            (n1, m1), (n2, m2) = paires[i], paires[j]
            dx = max(0.0, max(float(m1.get_left()[0]) - float(m2.get_right()[0]),
                              float(m2.get_left()[0]) - float(m1.get_right()[0])))
            dy = max(0.0, max(float(m1.get_bottom()[1]) - float(m2.get_top()[1]),
                              float(m2.get_bottom()[1]) - float(m1.get_top()[1])))
            d = (dx * dx + dy * dy) ** 0.5
            note = "  ⛔ SE TOUCHENT" if d < 0.10 else ("  ⚠️ serré" if d < 0.22 else "  ✅")
            if d < 0.10:
                ennuis.append(f"{cle} : « {n1} » et « {n2} » se touchent")
            print(f"    « {n1:5s} » ↔ « {n2:5s} » : {d:.2f}{note}")


print("── 00 : la page de garde ──")
t00 = T("Démontrer une orthogonalité", 46).to_edge(UP, buff=0.5)
cadre("titre", t00)
lg = VGroup()
for txt in ("un produit scalaire nul : c'est prouvé", "mais pour un plan, il en faut DEUX"):
    lg.add(VGroup(Dot(radius=0.08), T(txt, 38)).arrange(RIGHT, buff=0.26))
lg.arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to(P(-0.9, 0.95))
cadre("les deux promesses", lg)
cadre("echelle() alignée en bas", EcransEspace.echelle(E).align_to(P(0, -3.45), DOWN))
cadre("la ligne finale", T("deux, pas un", 32).move_to(P(-0.9, -1.55)))

print("\n── 01 : Marc, les deux vues, et les quatre blocs ──")
m = marc(0.68).move_to(P(-5.60, 0.70))
x0m, x1m, y0m, y1m = cadre("Marc (s = 0,68)", m)
nom = T("Marc", 32).next_to(m, DOWN, buff=0.20)
if nom.get_left()[0] < -6.5:
    nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
cadre("« Marc » (après garde-fou)", nom)
met = T("maçon", 24).next_to(nom, DOWN, buff=0.12)
if met.get_left()[0] < -6.5:
    met.shift(RIGHT * (-6.5 - met.get_left()[0]))
cadre("« maçon »", met)
v1 = poteau_vue(False, 0.95).move_to(P(-3.30, 0.95))
a0, a1, _, _ = cadre("vue de face", v1)
v2 = poteau_vue(True, 0.95).move_to(P(-1.00, 0.95))
b0, b1, _, _ = cadre("vue de côté", v2)
print(f"  écart Marc → vue 1 : {a0 - x1m:.2f}   vue 1 → vue 2 : {b0 - a1:.2f}")
if a0 - x1m < 0.15 or b0 - a1 < 0.15:
    ennuis.append("01 : les figures se touchent")
cadre("« vu de face »", T("vu de face", 24).next_to(v1, DOWN, buff=0.18))
cadre("« vu de côté »", T("vu de côté", 24).next_to(v2, DOWN, buff=0.18))
fs = 28
droite_("« au niveau, dans un sens »",
        VGroup(COCHE(), VGroup(T("au niveau,", fs), T("dans un sens : droit", fs))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.40)
droite_("« cela suffit ? »", T("cela suffit ?", fs), 1.25)
droite_("« penché vu de côté »",
        VGroup(CROIX(), VGroup(T("penché", fs), T("vu de côté", fs))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), 0.05)
droite_("« il faut vérifier… »",
        VGroup(T("il faut vérifier", fs), T("dans DEUX directions", fs))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.25)
fil = T("ce geste de chantier, c'est le théorème de ce chapitre", 26)
bloc("conclusion + cadre",
     VGroup(fil, SurroundingRectangle(fil, buff=0.16, stroke_width=3)), -2.70, 4.6)

print("\n── 02 : la condition, l'équivalence, et l'exemple ──")
titre02 = T("Le test de l'orthogonalité", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 02", titre02)
cond = VGroup(T("vecteurs", 28), T("NON NULS", 28)).arrange(DOWN, buff=0.10)
b02 = droite_("condition + cadre",
              VGroup(cond, SurroundingRectangle(cond, buff=0.14, stroke_width=3)), 2.05)
contre_titre("02", titre02, b02)
droite_("« u · v = 0 »", VX("u · v = 0", ("u", "v"), 34), 0.75)
droite_("« u ⊥ v »", VX("u ⊥ v", ("u", "v"), 34), 0.00)
droite_("« un calcul de trois secondes »",
        VGroup(T("un calcul de", 28), T("trois secondes", 28))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.10)
bloc("u (2 ; 1 ; −1)", NOMME("u", U02, C_VECTEUR, 32), 2.35, 1.9)
bloc("v (1 ; −1 ; 1)", NOMME("v", V02, C_VECTEUR2, 32), 1.55, 1.9)
rangs = [VGroup(T(g, 26), T(d, 30)).arrange(RIGHT, buff=0.22)
         for g, d in (("les x :", "2 × 1 = 2"), ("les y :", "1 × (−1) = −1"),
                      ("les z :", "(−1) × 1 = −1"))]
bloc("les trois produits", VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.22),
     -0.25, 1.9)
tot = VGroup(T("total :", 28), T("2 − 1 − 1 = 0", 34)).arrange(RIGHT, buff=0.22)
bloc("total + cadre", VGroup(tot, SurroundingRectangle(tot[1], buff=0.14, stroke_width=3)),
     -2.30, 4.6)
bloc("« u et v sont orthogonaux »", VX("u et v sont orthogonaux", ("u", "v"), 30),
     -3.10, 4.6)

print("\n── 03 : les trois rangées, pleine largeur ──")
t03 = T("Le théorème du chapitre", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 03", t03)
rangs3 = []
for k3, (g, d) in enumerate((("la droite :", "son vecteur directeur est orthogonal"),
                             ("à deux vecteurs :", "du plan, et NON COLINÉAIRES"),
                             ("son nom :", "un vecteur NORMAL au plan")), start=1):
    rangs3.append(VGroup(EcransEspace.pastille(E, k3), T(g, 28), T(d, 28))
                  .arrange(RIGHT, buff=0.24))
r03 = plafonne("les trois rangées", VGroup(*rangs3).arrange(DOWN, aligned_edge=LEFT,
                                                            buff=0.50),
               10.6, P(-0.75, 0.85))
contre_titre("03", t03, r03)
bloc("« DEUX vecteurs, pas un »", T("DEUX vecteurs, pas un", 32), -1.55, 4.6)
rap = VGroup(T("et non colinéaires : sinon, ils donnent", 28),
             T("deux fois la même direction", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.10)
bloc("rappel (2 lignes) + cadre",
     VGroup(rap, SurroundingRectangle(rap, buff=0.16, stroke_width=3)), -2.75, 4.6)

print("\n── 04 : la question-pause n° 1 (largeur 6,3 ; xl 0,35) ──")
cA = CH2("oui, le produit", "scalaire vaut 0")
cB = T("non, il vaut −8", 28)
cC = EcransEspace.choix3(E, "non, car leurs", "coordonnées ne sont",
                         "pas proportionnelles", 28)
tete, q, cartes, pause, rebours = EcransEspace.q_tete(
    E, [T("Sont-ils orthogonaux ?", 32)], [cA, cB, cC], largeur=6.3, xl=0.35)
cadre("tête « Question ! » + rebours", tete, rebours)
cadre("question (1 ligne)", q)
xc0, xc1, yc0, yc1 = cadre("les trois cartes", cartes)
cadre("« Mets pause, et choisis ! »", pause)
pol = [police(c) for c in cartes]
print(f"  polices obtenues : {pol}  (demandées 28)"
      f"{'  ⛔ RÉDUITES' if min(pol) < 27.5 else '  ✅'}")
if min(pol) < 27.5:
    ennuis.append("04 : cartes réduites")
# ⛔⛔ LA PAUSE EST DÉPLACÉE À GAUCHE : avec la carte C sur trois lignes, `q_tete` la
# pose sous −2,15, là où commence la boîte de Ti-Margo (piège n° 33 des entiers).
print(f"  pause d'origine : bas {float(pause.get_bottom()[1]):6.2f}"
      f"{'  ⛔ SOUS −2,15 → déplacée à gauche' if float(pause.get_bottom()[1]) < -2.15 else ''}")
pause.move_to(P(0, -3.05)).align_to(P(-6.5, 0), LEFT)
rebours.next_to(pause, RIGHT, buff=0.35)
cadre("pause déplacée + rebours", pause, rebours)
if float(cartes.get_bottom()[1]) < -2.15 and float(cartes.get_right()[0]) > 5.54:
    ennuis.append("04 : les cartes descendent sur Ti-Margo")
    print("  ⛔ LES CARTES DESCENDENT SUR TI-MARGO")
ux0, ux1, uy0, uy1 = bloc("u (1 ; 2 ; −2)", NOMME("u", U04, C_VECTEUR, 34), 2.30, -0.1)
vx0, vx1, vy0, vy1 = bloc("v (2 ; −3 ; −2)", NOMME("v", V04, C_VECTEUR2, 34), 1.45, -0.1)

print("\n── 04b : les blocs de gauche (cartes : x ≥ %.2f, y ∈ [%.2f ; %.2f]) ──"
      % (xc0, yc0, yc1))
# ⛔⛔ CET ÉCRAN HÉRITE DE 04 : u et v RESTENT. Le calcul est donc UN SEUL bloc, posé
# dessous, et la mesure compare son HAUT au BAS de v.
calc = VGroup(T("1 × 2 = 2", 32), T("2 × (−3) = −6", 32), T("(−2) × (−2) = +4", 32),
              T("moins par moins fait PLUS", 24),
              T("2 − 6 + 4 = 0", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
cx0, cx1, cy0, cy1 = bloc("le calcul (5 lignes, sous u et v)", calc, -0.60, -0.1)
if cy1 > vy0:
    ennuis.append("04b : le calcul recouvre la donnée v")
    print(f"  ⛔ LE CALCUL RECOUVRE v (bas de v : {vy0:.2f})")
else:
    print(f"  écart calcul → v : {vy0 - cy1:.2f}  ✅")
lB = VGroup(CROIX(0.12), T("−8", 30), T(": ce dernier signe t'a échappé", 26))
bx0, bx1, by0, by1 = bloc("leurre B « le signe oublié »", lB.arrange(RIGHT, buff=0.18),
                          -2.20, 4.6)
if by1 > cy0:
    ennuis.append("04b : le leurre B recouvre le calcul")
    print("  ⛔ LE LEURRE B RECOUVRE LE CALCUL")
lC = VGroup(VX("non proportionnelles = u et v non colinéaires :", ("u", "v"), 24),
            T("ça ne dit rien de l'orthogonalité", 24))
lC.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
bloc("leurre C (2 lignes) + cadre",
     VGroup(lC, SurroundingRectangle(lC, buff=0.14, stroke_width=3)), -3.00, 4.6)

print("\n── 05 : le plan À PLAT, et la colonne de droite ──")
t05 = T("Le théorème du poteau", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 05", t05)
sch = plan_poteau(1.0).move_to(P(-4.35, 1.05))
sx0, sx1, sy0, sy1 = cadre("le plan à plat + u, v, n", sch)
en = VEC("n", 30, C_REGARD).next_to(sch[3], LEFT, buff=0.14)
eu = VEC("u", 30, C_VECTEUR).next_to(sch[1], DOWN, buff=0.12)
ev = VEC("v", 30, C_VECTEUR2).next_to(sch[2], UR, buff=0.08)
cadre("les trois étiquettes du schéma", en, eu, ev)
etiquettes("05", ("n", en), ("u", eu), ("v", ev))
d1 = droite_("n (1 ; 1 ; 1)", NOMME("n", N05, C_REGARD, 30), 2.40)
contre_titre("05", t05, d1)
droite_("u (1 ; −1 ; 0)", NOMME("u", U05, C_VECTEUR, 30), 1.60)
droite_("v (0 ; 1 ; −1)", NOMME("v", V05, C_VECTEUR2, 30), 0.80)
droite_("« n · u = 1 − 1 + 0 = 0 » (2 lignes)",
        VGroup(VX("n · u =", ("n", "u"), 28),
               VGroup(T("1 − 1 +", 28), ZERO(28), T("=", 28), ZERO(28))
               .arrange(RIGHT, buff=0.14))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -0.15)
p2 = droite_("« n · v = 0 + 1 − 1 = 0 » (2 lignes)",
             VGroup(VX("n · v =", ("n", "v"), 28),
                    VGroup(ZERO(28), T("+ 1 − 1 =", 28), ZERO(28))
                    .arrange(RIGHT, buff=0.14))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -1.30)
nc = VGroup(COCHE(0.14),
            VGroup(VX("u et v ne sont pas colinéaires :", ("u", "v"), 26),
                   VX("la première coordonnée de v est nulle,", ("v",), 26),
                   VX("celle de u ne l'est pas", ("u",), 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
nx0, nx1, ny0, ny1 = bloc("« u et v non colinéaires » (3 lignes)",
                          nc.arrange(RIGHT, buff=0.20, aligned_edge=UP), -1.55, 1.9)
print(f"  haut du bloc {ny1:.2f} vs bas du schéma {sy0:.2f} : "
      f"{'⛔ SE TOUCHENT' if ny1 > sy0 else '✅'}")
if ny1 > sy0:
    ennuis.append("05 : la non-colinéarité recouvre le schéma")
nor = VX("n est un vecteur NORMAL au plan P", ("n",), 30)
bloc("« n est NORMAL à P » + cadre",
     VGroup(nor, SurroundingRectangle(nor, buff=0.14, stroke_width=3)), -3.05, 4.6)

print("\n── 06 : le piège — le sol, puis les deux arêtes ──")
fs = 28
bang = VGroup(Triangle(stroke_width=4).scale(0.33),
              Text("!", font_size=30, weight=BOLD).shift(DOWN * 0.05))
t06 = VGroup(bang, T("Un seul ne suffit pas", 42)).arrange(RIGHT, buff=0.3)
t06.to_edge(UP, buff=0.5)
cadre("titre de l'écran 06", t06)
b06 = droite_("« un seul produit… » (3 lignes)",
        VGroup(CROIX(), VGroup(T("un seul produit", fs), T("scalaire nul", fs),
                               T("ne suffit PAS", fs))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.05)
contre_titre("06", t06, b06)
droite_("« il peut même être DANS le plan »",
        VGroup(CROIX(), VGroup(T("il peut même", fs), T("être DANS le plan", fs))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), 0.75)
droite_("« orthogonales, mais pas sécantes »",
        VGroup(CROIX(), VGroup(T("orthogonales,", fs), T("mais pas sécantes", fs))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.75)
r06 = Repere3D(o=np.array([-5.40, 0.80, 0.0]), u=1.02, portee=2)
sol = r06.plan((0, 0, 1), d=0.0, centre=(0.6, 0.6, 0), demi=1.15, couleur=C_PLAN,
               op=0.22)
fn = r06.vecteur((0, 0, 0), (0, 1.5, 0), "nord", couleur=C_VECTEUR, sw=6, fs=24,
                 decal=UL, fleche_nom=False)
fe = r06.vecteur((0, 0, 0), (1.45, 0, 0), "est", couleur=C_VECTEUR2, sw=6, fs=24,
                 decal=DOWN, fleche_nom=False)
fn.nom.shift(UP * 0.16 + LEFT * 0.12)
vert = DashedLine(r06.pt(0, 0, 0), r06.pt(0, 0, 1.5), dash_length=0.1)
et_v = T("la verticale", 22).next_to(vert.get_end(), RIGHT, buff=0.10)
g0, g1, gy0, gy1 = cadre("le sol + nord + est + la verticale", sol, fn, fe, vert, et_v)
# ⛔⛔ CONTRÔLE NEUF, PAYÉ AU GROS PLAN : les deux flèches du SOL doivent rester DANS le
# morceau de plan — l'écran dit « le nord est AU SOL », une pointe qui dépasse le
# contredit. Le test : la pointe de chaque flèche est-elle dans le polygone du sol ?
def _dedans(pt, poly):
    x, y = float(pt[0]), float(pt[1])
    dans, n = False, len(poly)
    for i in range(n):
        x1, y1 = float(poly[i][0]), float(poly[i][1])
        x2, y2 = float(poly[(i + 1) % n][0]), float(poly[(i + 1) % n][1])
        if (y1 > y) != (y2 > y) and x < x1 + (y - y1) / (y2 - y1) * (x2 - x1):
            dans = not dans
    return dans
_poly = [r06.pt(*k) for k in sol.coins]
for _nom, _f in (("nord", fn), ("est", fe)):
    _ok = _dedans(_f.fleche.get_end(), _poly)
    print(f"    pointe de « {_nom} » dans le sol : {'✅' if _ok else '⛔ ELLE SORT DU PLAN'}")
    if not _ok:
        ennuis.append(f"06 : la flèche « {_nom} » sort du sol")
etiquettes("06", ("nord", fn.nom), ("est", fe.nom), ("vert.", et_v))
sous = T("le nord est AU SOL : il n'est pas vertical", 24)
sous.next_to(VGroup(sol, fn, fe), DOWN, buff=0.16).align_to(P(-6.3, 0), LEFT)
s0, s1, sy0b, sy1b = cadre("« le nord est AU SOL » (sous la figure)", sous)
print(f"  écart sol → légende : {gy0 - sy1b:.2f}"
      f"{'  ⛔ SE TOUCHENT' if gy0 < sy1b else '  ✅'}")
if gy0 < sy1b:
    ennuis.append("06 : la légende touche le sol")
r62, cube6 = PsEspaceOrthogonaliteBase.cube_repere(E, o=(-5.55, -2.12), u=1.15)
ab = Line(r62.pt(*S["A"]), r62.pt(*S["B"])).set_stroke(C_VECTEUR, 9)
cg = Line(r62.pt(*S["C"]), r62.pt(*S["G"])).set_stroke(C_VECTEUR2, 9)
e_ab = T("[A B]", 24).next_to(ab, DOWN, buff=0.12)
e_cg = T("[C G]", 24).next_to(cg, RIGHT, buff=0.10)
c0, c1, cy0b, cy1b = cadre("le cube + [A B] + [C G]", cube6, ab, cg, e_ab, e_cg)
etiquettes("06-cube", ("[A B]", e_ab), ("[C G]", e_cg))
print(f"  écart légende du sol → cube : {sy0b - cy1b:.2f}"
      f"{'  ⛔ SE TOUCHENT' if sy0b < cy1b else '  ✅'}")
if sy0b < cy1b:
    ennuis.append("06 : le cube touche la légende du sol")
per = T("perpendiculaire = orthogonales ET sécantes", 28)
p0, p1, py0, py1 = bloc("« perpendiculaire = … » + cadre",
                        VGroup(per, SurroundingRectangle(per, buff=0.14, stroke_width=3)),
                        -3.15, 4.6)
if py1 > cy0b and p0 < c1:
    ennuis.append("06 : le cadre final touche le cube")
    print("  ⛔ LE CADRE FINAL TOUCHE LE CUBE")

print("\n── 07 : la question-pause n° 2 (largeur 6,3 ; xl 0,35) ──")
# ⛔⛔ 24 ET NON 28 : mesuré, sur deux lignes dans une carte de 6,3, fs 28 rend
# 27,8 / 25,2 / 24,9 px (deux cartes rétrécies et de tailles inégales) et fs 24 rend
# 23,8 partout, sans aucune réduction. Trois lignes à 28 px feraient descendre les
# cartes à −2,52, c'est-à-dire DANS la boîte de Ti-Margo.
FSC = 24
cA2 = T("oui, un vecteur suffit", FSC)
cB2 = CH2("oui, à condition que u", "ne soit pas le vecteur nul", FSC, noms=("u",))
cC2 = CH2("non, il faut deux vecteurs", "non colinéaires du plan", FSC)
tete2, q2, cartes2, pause2, rebours2 = EcransEspace.q_tete(
    E, [VX("Peut-on en conclure que n", ("n",), 32), T("est orthogonal au plan P ?", 32)],
    [cA2, cB2, cC2], largeur=6.3, xl=0.35)
cadre("question (2 lignes)", q2)
x20, x21, y20, y21 = cadre("les trois cartes", cartes2)
pol2 = [police(c) for c in cartes2]
print(f"  polices obtenues : {pol2}  (demandée {FSC})"
      f"{'  ⛔ RÉDUITES' if min(pol2) < FSC - 0.5 else '  ✅'}")
if min(pol2) < FSC - 0.5:
    ennuis.append("07 : cartes réduites")
# ⛔⛔ LA PAUSE EST DÉPLACÉE À GAUCHE : à sa place d'origine elle descend sous −2,15 et
# coupe la tête de Ti-Margo (piège n° 33 des entiers).
print(f"  pause d'origine : bas {float(pause2.get_bottom()[1]):6.2f}"
      f"{'  ⛔ SOUS −2,15 → déplacée à gauche' if float(pause2.get_bottom()[1]) < -2.15 else ''}")
pause2.move_to(P(0, -3.05)).align_to(P(-6.5, 0), LEFT)
rebours2.next_to(pause2, RIGHT, buff=0.35)
cadre("pause déplacée + rebours", pause2, rebours2)
if float(cartes2.get_bottom()[1]) < -2.15 and float(cartes2.get_right()[0]) > 5.54:
    ennuis.append("07 : les cartes descendent sur Ti-Margo")
    print("  ⛔ LES CARTES DESCENDENT SUR TI-MARGO")
don = VGroup(VX("n ⊥ u", ("n", "u"), 34),
             VX("et u est un vecteur du plan P", ("u",), 30)) \
    .arrange(DOWN, aligned_edge=LEFT, buff=0.22)
dx0, dx1, dy0, dy1 = bloc("la donnée (2 lignes)", don, 1.55, -0.1)

print("\n── 07b : les blocs de gauche (cartes : x ≥ %.2f, y ∈ [%.2f ; %.2f]) ──"
      % (x20, y20, y21))
l1 = VGroup(COCHE(0.14), VGroup(T("une seule direction", 26), T("ne suffit JAMAIS,", 26),
                                T("même bien choisie", 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08)) \
    .arrange(RIGHT, buff=0.20, aligned_edge=UP)
e0, e1, ey0, ey1 = bloc("« une seule direction… » (3 lignes)", l1, 0.15, -0.1)
if ey1 > dy0:
    ennuis.append("07b : le bloc 1 recouvre la donnée")
    print("  ⛔ LE BLOC 1 RECOUVRE LA DONNÉE")
else:
    print(f"  écart bloc 1 → donnée : {dy0 - ey1:.2f}  ✅")
l2 = VGroup(CROIX(0.12), VGroup(VX("n pourrait être", ("n",), 26),
                                T("lui-même DANS le plan,", 26),
                                T("comme le nord est au sol", 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08)) \
    .arrange(RIGHT, buff=0.18, aligned_edge=UP)
f0, f1, fy0, fy1 = bloc("« n pourrait être… » (3 lignes)", l2, -1.60, -0.1)
if fy1 > ey0:
    ennuis.append("07b : le bloc 2 recouvre le bloc 1")
    print("  ⛔ LE BLOC 2 RECOUVRE LE BLOC 1")
l3 = VGroup(T("DEUX vecteurs du plan, non colinéaires —", 26),
            T("et on écrit les DEUX produits scalaires", 26))
l3.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
g0b, g1b, gy0c, gy1c = bloc("conclusion (2 lignes) + cadre",
                            VGroup(l3, SurroundingRectangle(l3, buff=0.14, stroke_width=3)),
                            -3.00, 4.6)
if gy1c > fy0:
    ennuis.append("07b : la conclusion recouvre le bloc 2")
    print("  ⛔ LA CONCLUSION RECOUVRE LE BLOC 2")

print("\n── 08 : la copie, CINQ lignes ──")
copie = RoundedRectangle(width=10.2, height=3.5, corner_radius=0.18, stroke_width=3)
copie.move_to(P(-0.6, -0.55))
marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
             copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2)
t08 = T("Cinq lignes, et la quatrième compte", 42).to_edge(UP, buff=0.5)
cadre("titre de l'écran 08", t08)
k0, k1, ky0, ky1 = cadre("la copie", copie)
print(f"  écart copie → titre : {float(t08.get_bottom()[1]) - ky1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if float(t08.get_bottom()[1]) < ky1 else '  ✅'}")
if float(t08.get_bottom()[1]) < ky1:
    ennuis.append("08 : la copie touche le titre")
rangs8 = [VGroup(EcransEspace.pastille(E, k8), VX(txt, noms, 24)).arrange(RIGHT, buff=0.30)
          for k8, (txt, noms) in enumerate(
              (("n (a ; b ; c), u et v vecteurs du plan P", ("n", "u", "v")),
               ("n · u = (calcul) = 0", ("n", "u")),
               ("n · v = (calcul) = 0", ("n", "v")),
               ("u et v ne sont pas colinéaires, car...", ("u", "v")),
               ("donc n est un vecteur normal au plan P", ("n",))), start=1)]
l8 = VGroup(*rangs8).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
plafonne("les cinq lignes (plafond de la copie)", l8, 8.6, copie.get_center())
l8.align_to(marge.get_center() + RIGHT * 0.3, LEFT)
h0, h1, hy0, hy1 = cadre("les cinq lignes, recalées sur la marge", l8)
if h1 > k1 - 0.2 or hy1 > ky1 - 0.05 or hy0 < ky0 + 0.05:
    ennuis.append("08 : le texte sort de la copie")
    print("  ⛔ LE TEXTE SORT DE LA COPIE")
rap8 = VGroup(T("la quatrième ligne est celle qu'on oublie —", 26),
              T("et c'est un point perdu à chaque fois", 26)).arrange(DOWN, buff=0.08)
g8 = VGroup(rap8, SurroundingRectangle(rap8, buff=0.12, stroke_width=3))
g8.next_to(copie, DOWN, buff=0.22)
cadre("le rappel (2 lignes) sous la copie", g8)

print("\n── 09 : le cube, le repère, la consigne ──")
r09, cube09 = PsEspaceOrthogonaliteBase.cube_repere(E, o=(-5.90, 0.20), u=1.4,
                                                    rouges=("B", "D", "E", "G"))
q0, q1c, qy0, qy1 = cadre("cube (u = 1,4)", cube09)
cadre("cube + les trois vecteurs de base", cube09,
      PsEspaceOrthogonaliteBase.base_repere(E, r09))
cons = VGroup(T("démontre que la droite (A G)", 32), T("est orthogonale au plan (BDE)", 32))
cons.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
i0, i1, iy0, iy1 = bloc("la consigne (2 lignes)", cons, -1.65, 4.6)
print(f"  écart cube → consigne : {qy0 - iy1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if qy0 < iy1 else '  ✅'}")
if qy0 < iy1:
    ennuis.append("09 : la consigne touche le cube")
pz = T("Mets pause, et cherche !", 30)
EcransEspace.gauche(E, pz, -3.05, xmax=4.6)
cadre("pause + rebours (côte à côte)", pz,
      CompteARebours(5, r=0.34, fs=32).next_to(pz, RIGHT, buff=0.35))

print("\n── 09b : la colonne de droite, et les blocs de gauche ──")
# ⛔⛔ SANS ÉTIQUETTE : les 512 combinaisons de `decal` ont été essayées ici, et la
# MEILLEURE ne laisse que 0,14 entre deux étiquettes (« A G » et « B E » se touchent
# dans la plupart). Le plan (B D E) se projette à 9,0° : B D et B E ne sont séparés
# que de 19° à l'écran. C'est la COULEUR qui relie la figure à la colonne de droite,
# comme à l'écran 09b de l'épisode 7.
fAG = r09.vecteur(S["A"], S["G"], None, couleur=C_REGARD, sw=7)
fBD = r09.vecteur(S["B"], S["D"], None, couleur=C_VECTEUR, sw=7)
fBE = r09.vecteur(S["B"], S["E"], None, couleur=C_VECTEUR2, sw=7)
cadre("les trois vecteurs dans le cube (sans étiquette)", fAG, fBD, fBE)
print("  les noms de sommet, deux à deux :")
noms_sommets = {}
for s in ("A", "B", "C", "D", "E", "F", "G", "H"):
    for sub in cube09.submobjects:
        if isinstance(sub, Text) and sub.text == s:
            noms_sommets[s] = sub
etiquettes("09b", *[(s, m) for s, m in noms_sommets.items()])
rangs9 = [VGroup(T(n, 28), T("(", 28), TRIP(t3, 28), T(")", 28)).arrange(RIGHT, buff=0.10)
          for n, t3 in (("B", S["B"]), ("D", S["D"]), ("E", S["E"]), ("G", S["G"]))]
droite_("les quatre sommets (4 lignes)",
        VGroup(*rangs9).arrange(DOWN, aligned_edge=LEFT, buff=0.16), 1.80)
droite_("A G (1 ; 1 ; 1)", NOMME("A G", S["G"], C_REGARD, 28), -0.25)
droite_("B D (−1 ; 1 ; 0)", NOMME("B D", BD, C_VECTEUR, 28), -1.05)
dbe = droite_("B E (−1 ; 0 ; 1)", NOMME("B E", BE, C_VECTEUR2, 28), -1.85)
q1b = VGroup(VX("A G · B D =", ("A G", "B D"), 26),
             VGroup(T("−1 + 1 +", 26), ZERO(26), T("=", 26), ZERO(26))
             .arrange(RIGHT, buff=0.14)).arrange(RIGHT, buff=0.18)
j0, j1, jy0, jy1 = bloc("« A G · B D = 0 »", q1b, -1.35, 1.9)
print(f"  écart cube → produit 1 : {qy0 - jy1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if qy0 < jy1 else '  ✅'}")
if qy0 < jy1:
    ennuis.append("09b : le produit 1 touche le cube")
q2b = VGroup(VX("A G · B E =", ("A G", "B E"), 26),
             VGroup(T("−1 +", 26), ZERO(26), T("+ 1 =", 26), ZERO(26))
             .arrange(RIGHT, buff=0.14)).arrange(RIGHT, buff=0.18)
bloc("« A G · B E = 0 »", q2b, -1.95, 1.9)
nc9 = VGroup(COCHE(0.13),
             VX("B D et B E ne sont pas colinéaires : (1 ; 0) et (0 ; 1)",
                ("B D", "B E"), 26)).arrange(RIGHT, buff=0.18)
n0, n1b, ny0b, ny1b = bloc("« B D et B E non colinéaires »", nc9, -2.55, 4.6)
if ny1b > dbe[2] and n1b > 2.2:
    ennuis.append("09b : la non-colinéarité recouvre la colonne de droite")
    print(f"  ⛔ RECOUVRE LA COLONNE DE DROITE (bas de B E : {dbe[2]:.2f})")
fin9 = T("la droite (A G) est orthogonale au plan (BDE)", 30)
bloc("la conclusion + cadre",
     VGroup(fin9, SurroundingRectangle(fin9, buff=0.14, stroke_width=3)), -3.20, 4.6)

print("\n── 10 : les cinq faits ──")
t10 = T("Ce que tu as appris", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 10", t10)
blocs10 = [VGroup(T(g, 26), T(d, 26)).arrange(RIGHT, buff=0.22)
           for g, d in (("produit scalaire nul :", "vecteurs orthogonaux"),
                        ("droite et plan :", "DEUX vecteurs non colinéaires"),
                        ("et on le justifie :", "c'est la ligne qu'on oublie"),
                        ("orthogonal à un plan :", "un vecteur NORMAL"),
                        ("attention :", "orthogonales ne veut pas dire sécantes"))]
f10 = plafonne("les cinq faits (Ti-Margo 0,65 : x ≥ 5,30)",
               VGroup(*[VGroup(COCHE(0.22), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                        for b in blocs10]).arrange(DOWN, aligned_edge=LEFT, buff=0.36),
               10.6, P(-0.75, 0.10))
contre_titre("10", t10, f10)

print("\n── la passe arithmétique de l'épisode, refaite ici ──")
print(f"  u·v (02) = {sum(U02[i] * V02[i] for i in range(3))}   "
      f"u·v (04) = {sum(U04[i] * V04[i] for i in range(3))}")
print(f"  n·u (05) = {sum(N05[i] * U05[i] for i in range(3))}   "
      f"n·v (05) = {sum(N05[i] * V05[i] for i in range(3))}")
print(f"  A G·B D  = {sum(AG[i] * BD[i] for i in range(3))}   "
      f"A G·B E  = {sum(AG[i] * BE[i] for i in range(3))}")

print()
if ennuis:
    print("⛔ " + str(len(ennuis)) + " problème(s) : " + " | ".join(ennuis))
    sys.exit(1)
print("✅ aucune cote hors marge, aucun bloc rétréci, aucune réduction par un plafond")
