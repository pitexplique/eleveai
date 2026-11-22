# manim/poste2/mesure-espace-droite-parametrique.py
# LES COTES DE L'ÉPISODE 3 (« espace_droite_parametrique »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-calculer.py` (épisode 7), le plus complet.
#
# ⛔ PÉRIMÈTRE, mesuré et non supposé : cet épisode a reçu la notation fléchée sur
# QUATRE textes (écrans 02, 08, 09 et 09b) et il a **une seule étiquette de figure
# nommée** (`vu`, l'écran 02), qui gagne sa flèche par le changement de défaut de
# `Repere3D.vecteur`. Les écrans sans nom de vecteur ne sont pas mesurés ici : une cote
# recopiée à la main pour eux serait un souvenir, pas une mesure.
#
# ⚠️ L'écran 09 a changé de CONTENU et pas seulement de notation : la consigne écrit
# maintenant « (A B) », la DROITE, et non « A B ». C'est trois caractères de plus, donc
# la largeur du bloc change et `col()` ne réduit plus pareil : raison de plus pour
# remesurer.
#
# ⭐⭐ `--sans-fleches` rebâtit les mêmes blocs SANS la notation (et sans les flèches
# d'étiquette) : c'est le TÉMOIN, et c'est lui qui dit ce que la flèche a changé.
#
#   python -X utf8 manim/poste2/mesure-espace-droite-parametrique.py [--sans-fleches]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import C_DROITE, C_REGARD, C_VECTEUR, C_VECTEUR2  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace, ligne_param  # noqa: E402
from espace_droite_parametrique import (A_D, A_DEFI, AB_DEFI, B_DEFI,  # noqa: E402
                                        U_D, EspaceDroiteParametriqueBase, pt_de)

MARGE_X, MARGE_Y = 6.68, 3.573
VERT_OK, JAUNE_TITRE, ORANGE_RETENUE = "#22c55e", "#fbbf24", "#f97316"
E = EcransEspace.__new__(EspaceDroiteParametriqueBase)
T = lambda s, fs, c=WHITE: EcransEspace.t(E, s, fs, c)                      # noqa: E731
TRIP = lambda t3, fs, c=WHITE, **k: EcransEspace.trip(E, t3, fs, c, **k)    # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)               # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
ennuis = []

if "--sans-fleches" in sys.argv:
    VEC = lambda n, fs=28, c=WHITE: T(n, fs, c)                      # noqa: E731,F811
    VX = lambda t, noms, fs=28, c=WHITE: T(t, fs, c)                 # noqa: E731,F811
    import espace3d
    _vrai = espace3d.Repere3D.vecteur
    espace3d.Repere3D.vecteur = (
        lambda self, d, a, nom=None, **k: _vrai(self, d, a, nom, **dict(k, fleche_nom=False)))


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
    print(f"  {nom:46s} x ∈ [{x0:6.2f} ; {x1:6.2f}]   y ∈ [{y0:6.2f} ; {y1:6.2f}]{note}")
    return x0, x1, y0, y1


def droite_(nom, mob, y, xl=2.2):
    naturel = float(mob.width)
    EcransEspace.col(E, mob, y, xl)
    return cadre(f"{nom} (y={y})", mob, naturel=naturel)


def bloc(nom, mob, y, xmax):
    naturel = float(mob.width)
    EcransEspace.gauche(E, mob, y, xmax=xmax)
    return cadre(f"{nom} (y={y}, xmax={xmax})", mob, naturel=naturel)


def ligne_(nom, *morceaux, y, xl=2.2):
    return droite_(nom, VGroup(*morceaux).arrange(RIGHT, buff=0.15), y, xl)


def police_de(mob):
    pile = [mob]
    while pile:
        m = pile.pop(0)
        if isinstance(getattr(m, "font_size", None), (int, float)):
            return round(float(m.font_size), 1)
        pile += list(m.submobjects)
    return 0.0


# ── 02 : le point, le vecteur directeur fléché, et l'étiquette de FIGURE ───────────
print("── 02 : « u » fléché en colonne, et l'étiquette « u » sur la figure ──")
t02 = T("Un point, une direction", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
tx = cadre("titre de 02", t02)
bA = ligne_("A (1 ; 2 ; 0)", T("A", 34, C_REGARD), TRIP(A_D, 34), y=2.55)
if bA[3] > tx[2]:
    ennuis.append("02 : le bloc A recouvre le titre")
    print("  ⛔ LE BLOC A RECOUVRE LE TITRE")
else:
    print(f"  écart bloc A → titre : {tx[2] - bA[3]:.2f}  ✅")
bu = ligne_("⭐ u fléché (2 ; −1 ; 3)", VEC("u", 34, C_VECTEUR2), TRIP(U_D, 34), y=1.90)
print(f"  écart A → u : {bA[2] - bu[3]:.2f}"
      f"{'  ⛔ ILS SE TOUCHENT' if bA[2] - bu[3] < 0.08 else '  ✅'}")
if bA[2] - bu[3] < 0.08:
    ennuis.append("02 : les blocs A et u se touchent")
r02, ax02 = EcransEspace.repere(E, o=(-4.5, -2.0), u=0.46, portee=7)
# ⚠️ LA SEULE ÉTIQUETTE DE FIGURE NOMMÉE DE L'ÉPISODE : elle gagne sa flèche sans qu'une
# ligne du script change, et son décalage (DR) date d'avant la flèche.
vu = r02.vecteur(A_D, pt_de(1), "u", couleur=C_VECTEUR2, sw=7, decal=DR)
dr = r02.droite(A_D, U_D, -0.3, 1.6, nom="d", couleur=C_DROITE, sw=5, decal=UR)
cadre("repère + u + la droite d", ax02, vu, dr)
eu = cadre("  étiquette u de la FIGURE", vu.nom)
ed = cadre("  étiquette d de la droite", dr.nom if hasattr(dr, "nom") else dr)
if not (eu[1] < ed[0] or ed[1] < eu[0] or eu[2] > ed[3] or ed[2] > eu[3]):
    ennuis.append("02 : les étiquettes u et d se recouvrent")
    print("  ⛔ LES ÉTIQUETTES u ET d SE RECOUVRENT")
else:
    print("  les étiquettes u et d ne se recouvrent pas  ✅")
syst = EcransEspace.systeme(E, ["x = 1 + 2t", "y = 2 − t", "z = 3t"], 34, c_acc=C_DROITE)
droite_("le système (3 lignes)", syst, 0.35)

# ── 08 : la rédaction du bac — « vecteur directeur u » fléché ─────────────────────
print("\n── 08 : les quatre lignes de gauche, dont « vecteur directeur u » ──")
fs = 30
bloc("« d passe par le point A »", T("d passe par le point A", fs), 1.60, 0.4)
g2 = bloc("⭐ « et a pour vecteur directeur u, » fléché",
          VX("et a pour vecteur directeur u,", ("u",), fs), 1.10, 0.4)
print(f"  police obtenue : {police_de(g2 if False else VX('et a pour vecteur directeur u,', ('u',), fs)):.1f}"
      f" (demandée {fs})")
g3 = VGroup(T("donc une représentation", fs), T("paramétrique de d est :", fs))
bloc("« donc une représentation… » (2 lignes)",
     g3.arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.35, 0.4)

# ── 09 : la consigne — la DROITE (A B), sans flèche ───────────────────────────────
print("\n── 09 : la consigne du défi — « (A B) » est une DROITE, pas un vecteur ──")
ligne_("A (2 ; 0 ; 1)", T("A", 34, C_REGARD), TRIP(A_DEFI, 34), y=2.40)
ligne_("B (2 ; 3 ; −1)", T("B", 34, C_VECTEUR2), TRIP(B_DEFI, 34), y=1.70)
cons = VGroup(T("écris une représentation", 30), T("paramétrique de la droite", 30),
              T("(A B)", 30, ORANGE_RETENUE))
droite_("la consigne (3 lignes, SANS flèche)",
        cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0.55)
droite_("« Mets pause, et cherche ! »", T("Mets pause, et cherche !", 32, ORANGE_RETENUE), -0.95)

# ── 09b : la correction — le VECTEUR A B, fléché ──────────────────────────────────
print("\n── 09b : « A B » fléché (le VECTEUR), puis le système ──")
lab = ligne_("⭐ A B fléché (0 ; 3 ; −2)", VEC("A B", 34, VERT_OK), TRIP(AB_DEFI, 34, VERT_OK),
             y=0.95)
pa = droite_("« on part de A »", T("on part de A", 30, C_REGARD), 0.25)
print(f"  écart A B → « on part de A » : {lab[2] - pa[3]:.2f}"
      f"{'  ⛔ ILS SE TOUCHENT' if lab[2] - pa[3] < 0.08 else '  ✅'}")
if lab[2] - pa[3] < 0.08:
    ennuis.append("09b : A B touche « on part de A »")
syst9 = EcransEspace.systeme(E, [ligne_param(n, A_DEFI[i], AB_DEFI[i])
                                 for i, n in enumerate("xyz")], 34, c_acc=C_DROITE)
sy = droite_("le système (3 lignes)", syst9, -0.90)
print(f"  écart « on part de A » → système : {pa[2] - sy[3]:.2f}"
      f"{'  ⛔ ILS SE TOUCHENT' if pa[2] - sy[3] < 0.08 else '  ✅'}")
if pa[2] - sy[3] < 0.08:
    ennuis.append("09b : le système touche « on part de A »")
droite_("« avec t réel »", T("avec t réel", 26, GREY_A), -2.05)

print()
if ennuis:
    print("⛔ " + str(len(ennuis)) + " problème(s) : " + " | ".join(ennuis))
    # ⛔⛔ CE CODE DE SORTIE DIT L'ÉTAT, PAS LE DELTA. Plusieurs de ces blocs sont
    # rétrécis depuis le PREMIER rendu de l'épisode, qui a été regardé et accepté : les
    # compter comme des dégâts de la passe en cours, c'est lire la colonne des ajouts
    # sans lire celle des retraits. ⭐ La seule lecture honnête est la comparaison :
    #
    #   python -X utf8 <ce script> --sans-fleches > avant.txt
    #   python -X utf8 <ce script>                > apres.txt
    #   diff avant.txt apres.txt
    #
    # Un diff VIDE sur les lignes « RÉTRÉCI » / « HORS MARGE » / « PLAFOND » veut dire
    # que la notation vectorielle n'a rien cassé — et c'était le cas le 22/11.
    print("⚠️  Ce verdict décrit l'ÉTAT. Pour savoir ce que la passe a changé, comparer"
          " avec « --sans-fleches » (voir le commentaire au-dessus de ce message).")
    sys.exit(1)
print("✅ aucune cote hors marge, aucun bloc rétréci, aucune réduction par un plafond")
