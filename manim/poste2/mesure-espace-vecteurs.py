# manim/poste2/mesure-espace-vecteurs.py
# LES COTES DE L'ÉPISODE 1 (« espace_vecteurs »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-calculer.py` (épisode 7), qui est le plus complet :
# il signale en plus les réductions PAR UN PLAFOND, et il COMPARE la colonne de droite
# au titre (deux contrôles que celui de l'épisode 6 n'a pas).
#
# ⛔⛔ POURQUOI CET ÉPISODE EN A BESOIN MAINTENANT : le 22/11/2026 il a reçu la notation
# vectorielle fléchée (`self.vec`, `self.vexpr`) sur **treize** textes, et ses **six**
# étiquettes de figure ont gagné leur flèche par le changement de défaut de
# `Repere3D.vecteur(fleche_nom=True)` — sans qu'une ligne de l'épisode change pour
# elles. Or une flèche déborde de 0,10 + son épaisseur AU-DESSUS du texte : tout bloc
# qui en porte une est plus HAUT qu'avant, et toute figure qui en porte est plus GRANDE.
# Sur l'épisode 7, deux flèches ont suffi à faire passer un cadre de −3,55 à −3,59, donc
# SOUS la marge de 3 %. ⭐ Le périmètre mesuré ici est donc exactement celui du
# changement : les écrans 02, 03, 05, 07, 07b, 09, 09b et 10, c'est-à-dire tous ceux qui
# portent une notation vectorielle, plus les figures qui portent une étiquette.
# ⛔ Les écrans 00, 01, 04, 06 et 08 ne nomment aucun vecteur : rien n'y a bougé, et une
# cote recopiée à la main pour eux serait un souvenir, pas une mesure.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit
# le bloc à la largeur de sa plus longue ligne, et son second garde-fou (« bas sous
# −1,95 ET droite au-delà de 5,3 → réduire ») se déclenche au CENTIÈME près.
# Le critère : aucune ligne « RÉTRÉCI », aucune « HORS MARGE », aucune « RÉDUIT PAR LE
# PLAFOND », aucun chevauchement signalé.
#
#   python -X utf8 manim/poste2/mesure-espace-vecteurs.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import C_PIEGE, C_POINT, C_REGARD, C_VECTEUR, C_VECTEUR2  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace  # noqa: E402
from espace_vecteurs import (A02, AB_D, AC_D, AD, B02, BD, CD,  # noqa: E402
                             U05, V05, EspaceVecteursBase)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
VERT_OK, JAUNE_TITRE, GREY_A_ = "#22c55e", "#fbbf24", GREY_A
E = EcransEspace.__new__(EspaceVecteursBase)
T = lambda s, fs, c=WHITE: EcransEspace.t(E, s, fs, c)                      # noqa: E731
TRIP = lambda t3, fs, c=WHITE, **k: EcransEspace.trip(E, t3, fs, c, **k)    # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)               # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
ennuis = []

# ⭐⭐ LE MODE TÉMOIN : `--sans-fleches` rebâtit EXACTEMENT les mêmes blocs sans la
# notation vectorielle (ni dans les textes, ni sur les étiquettes de figure). Deux
# sorties à comparer, et la question qui compte devient mesurable : **qu'est-ce que la
# flèche a changé ?**
# ⛔⛔ SANS CE MODE, CET OUTIL MENT PAR OMISSION. Lancé une seule fois sur l'état
# d'arrivée, il a sorti dix « RÉTRÉCI » — et neuf d'entre eux sont dans l'épisode
# PUBLIÉ, regardé et accepté le 22/11 au matin (la question de l'écran 07 est à 14,4 px
# depuis le premier rendu). Les traiter comme des défauts de cette passe-ci, c'était
# refaire la faute que la note des entiers appelle « un diff a DEUX colonnes » : lire les
# ajouts sans lire les retraits. Le critère de CETTE passe est le DELTA, pas l'état.
if "--sans-fleches" in sys.argv:
    VEC = lambda n, fs=28, c=WHITE: T(n, fs, c)                      # noqa: E731,F811
    VX = lambda t, noms, fs=28, c=WHITE: T(t, fs, c)                 # noqa: E731,F811
    import espace3d
    _vrai_vecteur = espace3d.Repere3D.vecteur
    espace3d.Repere3D.vecteur = (
        lambda self, d, a, nom=None, **k: _vrai_vecteur(self, d, a, nom,
                                                        **dict(k, fleche_nom=False)))


def police_de(mob):
    """La police RÉELLEMENT obtenue par un bloc, en descendant jusqu'au premier objet
    qui porte `font_size`.
    ⚠️ ON NE LIT JAMAIS `mob[0][0].font_size` : selon que le bloc passe par `vexpr` ou
    par `t`, ce chemin tombe sur un `Text` ou sur un GLYPHE SVG, et Manim lève alors une
    AttributeError opaque. Le mode témoin de cet outil l'a montré du premier coup."""
    pile = [mob]
    while pile:
        m = pile.pop(0)
        if isinstance(getattr(m, "font_size", None), (int, float)):
            return round(float(m.font_size), 1)
        pile += list(m.submobjects)
    return 0.0


def police(carte):
    """La police RÉELLEMENT obtenue par le corps d'une carte de choix (recette de E7)."""
    return police_de(carte[1][1])


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
    """Un bloc large, borné par `scale_to_fit_width` puis centré sur `pos` — et qui DIT
    sa réduction (la correction de l'outil de l'épisode 6, voir E7)."""
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


def contre_titre(nom, titre, boite):
    """⛔⛔ LE CONTRÔLE QUI A COÛTÉ UN RENDU SUR L'ÉPISODE 7 : la mesure voyait le titre
    et voyait la colonne de droite, elle ne les COMPARAIT pas. Le titre est posé par
    `to_edge`, la colonne par `col()` — deux systèmes qui ne se croisent nulle part."""
    tx0, tx1, ty0, _ = cadre(f"titre de {nom}", titre)
    bx0, bx1, _, by1 = boite
    if by1 > ty0 and bx1 > tx0 and bx0 < tx1:
        ennuis.append(f"{nom} : le bloc recouvre le titre")
        print("  ⛔ LE BLOC HAUT RECOUVRE LE TITRE")
    else:
        print(f"  écart bloc haut → titre : {ty0 - by1:.2f}  ✅")


def ligne_(nom, *morceaux, y, xl=2.2):
    g = VGroup(*morceaux).arrange(RIGHT, buff=0.15)
    return droite_(nom, g, y, xl)


# ── 02 : l'idée « arrivée moins départ » ────────────────────────────────────
print("── 02 : A, B, le calcul, et « A B (3 ; 4 ; 0) » FLÉCHÉ ──")
t02 = T("arrivée moins départ", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
b02 = ligne_("A (1 ; 2 ; 3)", T("A", 34, C_POINT), TRIP(A02, 34, GREY_A), y=2.1)
contre_titre("02", t02, b02)
ligne_("B (4 ; 6 ; 3)", T("B", 34, C_POINT), TRIP(B02, 34, GREY_A), y=1.35)
calc = VGroup(T("4 − 1", 34), T("6 − 2", 34), T("3 − 3", 34))
droite_("le calcul (3 lignes)", calc.arrange(DOWN, aligned_edge=LEFT, buff=0.16), 0.1)
# ⭐ LE BLOC FLÉCHÉ DE CET ÉCRAN : « A B » gagne sa flèche, donc 0,10 + l'épaisseur.
res = ligne_("⭐ A B fléché (3 ; 4 ; 0)", VEC("A B", 38, C_VECTEUR), TRIP((3, 4, 0), 38, VERT_OK),
             y=-1.15)
droite_("« même hauteur »", T("même hauteur", 30, VERT_OK), -2.0)

# ── 03 : les règles du plan, « u + v : » et « k u : » fléchés ───────────────
print("\n── 03 : les deux règles FLÉCHÉES, et la figure u / v ──")
t03 = T("Les règles du plan tiennent", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
L1 = VGroup(VX("u + v :", ("u", "v"), 34), T("coordonnée par coordonnée", 28, GREY_A))
b03 = droite_("⭐ « u + v : » fléché (2 lignes)",
              L1.arrange(DOWN, aligned_edge=LEFT, buff=0.08), 1.9)
contre_titre("03", t03, b03)
L2 = VGroup(VX("k u :", ("u",), 34), T("les trois à la fois", 28, GREY_A))
droite_("⭐ « k u : » fléché (2 lignes)",
        L2.arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.75)
L3 = VGroup(T("colinéaires :", 34, VERT_OK), T("l'un est un multiple de l'autre", 30))
droite_("« colinéaires » (2 lignes)",
        L3.arrange(DOWN, aligned_edge=LEFT, buff=0.12), -0.25)
r03, ax03 = EcransEspace.repere(E, o=(-4.6, -1.5), u=0.52, portee=5)
# ⚠️ LES ÉTIQUETTES PORTENT MAINTENANT LEUR FLÈCHE : la figure est plus grande, et les
# deux vecteurs partent du MÊME point, donc leurs étiquettes se gênent (piège de E7).
u03 = r03.vecteur((0, 0, 0), U05, "u", couleur=C_VECTEUR, sw=7,
                  decal=np.array([0.25, -1.25, 0.0]))
v03 = r03.vecteur((0, 0, 0), V05, "v", couleur=C_VECTEUR2, sw=7,
                  decal=np.array([2.25, 2.25, 0.0]))
d03 = r03.vecteur((0, 0, 0), tuple(2 * a for a in U05), None, couleur=C_VECTEUR, sw=4)
cadre("repère + u + v + 2u (étiquettes fléchées)", ax03, u03, v03, d03)
cadre("  étiquette u seule", u03.nom)
cadre("  étiquette v seule", v03.nom)
ecart = float(u03.nom.get_right()[0]) - float(v03.nom.get_left()[0])
print(f"  écart horizontal entre les deux étiquettes : {-ecart:.2f}"
      f"{'  ⛔ ELLES SE CHEVAUCHENT' if ecart > 0 and abs(float(u03.nom.get_center()[1]) - float(v03.nom.get_center()[1])) < 0.45 else '  ✅'}")
if ecart > 0 and abs(float(u03.nom.get_center()[1]) - float(v03.nom.get_center()[1])) < 0.45:
    ennuis.append("03 : les étiquettes u et v se chevauchent")

# ── 05 : somme et multiple, quatre blocs fléchés ────────────────────────────
print("\n── 05 : u, v, u + v, 2 u — les QUATRE blocs fléchés ──")
t05 = T("Somme et multiple", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
b05 = ligne_("⭐ u fléché (1 ; 2 ; −1)", VEC("u", 34, C_VECTEUR), TRIP(U05, 34, GREY_A), y=2.0)
contre_titre("05", t05, b05)
ligne_("⭐ v fléché (3 ; 0 ; 2)", VEC("v", 34, C_VECTEUR2), TRIP(V05, 34, GREY_A), y=1.3)
S05 = tuple(a + b for a, b in zip(U05, V05))
ligne_("⭐ « u + v » fléché (4 ; 2 ; 1)", VX("u + v", ("u", "v"), 38, VERT_OK),
       TRIP(S05, 38, VERT_OK), y=0.3)
D05 = tuple(2 * a for a in U05)
ligne_("⭐ « 2 u » fléché (2 ; 4 ; −2)", VX("2 u", ("u",), 38, C_REGARD),
       TRIP(D05, 38, C_REGARD), y=-0.65)
r05, ax05 = EcransEspace.repere(E, o=(-4.6, -1.2), u=0.5, portee=5)
u05 = r05.vecteur((0, 0, 0), U05, "u", couleur=C_VECTEUR, sw=7,
                  decal=np.array([-0.75, -1.00, 0.0]))
v05 = r05.vecteur((0, 0, 0), V05, "v", couleur=C_VECTEUR2, sw=7,
                  decal=np.array([2.25, 2.25, 0.0]))
cadre("repère + u + v + somme + double", ax05, u05, v05,
      r05.vecteur((0, 0, 0), S05, None, couleur=VERT_OK, sw=8),
      r05.vecteur(V05, S05, None, couleur=C_VECTEUR, sw=4),
      r05.vecteur((0, 0, 0), D05, None, couleur=C_REGARD, sw=6))

# ── 07 : la question n° 2, dont les DEUX premières lignes sont fléchées ─────
print("\n── 07 : la question-pause n° 2 (largeur 4,1 ; xl 2,2) ──")
lu = VGroup(VX("Le vecteur u a pour coordonnées", ("u",), 32), T("1 ; 2 ; 3,", 32))
lu.arrange(RIGHT, buff=0.18)
lv = VGroup(VX("et le vecteur v a pour coordonnées", ("v",), 32), T("2 ; 4 ; 6.", 32))
lv.arrange(RIGHT, buff=0.18)
tete, q, cartes, pause, rebours = EcransEspace.q_tete(
    E, [lu, lv, "Que peut-on dire ?"],
    [EcransEspace.choix2(E, "ils ne sont pas", "colinéaires"), T("on ne peut pas savoir", 28),
     EcransEspace.choix2(E, "ils sont", "colinéaires")])
cadre("tête « Question ! » + rebours", tete, rebours)
# ⛔ `col()` réduit le bloc de question à la largeur de sa plus longue ligne : les deux
# premières lignes sont des `vexpr` LARGES, c'est le bloc le plus exposé de l'épisode.
qx0, qx1, qy0, qy1 = cadre("⭐ question (3 lignes, 2 fléchées)", q)
print(f"  largeur de la question : {qx1 - qx0:.2f}"
      f"   police de la 1re ligne : {police_de(q[0]):.1f}")
if police_de(q[0]) < 31.5:
    ennuis.append("07 : la question est rétrécie")
    print("  ⛔ LA QUESTION EST RÉTRÉCIE")
xc0, xc1, yc0, yc1 = cadre("les trois cartes", cartes)
cadre("« Mets pause, et choisis ! »", pause)
pol = [police(c) for c in cartes]
print(f"  polices obtenues : {pol}  (demandées 28 / 28 / 28)"
      f"{'  ⛔ RÉDUITES' if min(pol) < 27.5 else '  ✅'}")
if min(pol) < 27.5:
    ennuis.append("07 : cartes réduites")
if float(pause.get_bottom()[1]) < -2.15:
    ennuis.append("07 : la pause descend sur la tête de Ti-Margo")
    print("  ⛔ LA PAUSE DESCEND SOUS −2,15 (tête de Ti-Margo)")

# ── 07b : la réponse, et les deux étiquettes fléchées sur la MÊME direction ─
print("\n── 07b : le calcul de gauche, et u / v COLINÉAIRES (mêmes directions) ──")
calc7 = VGroup(T("2 = 2 × 1", 32, VERT_OK), T("4 = 2 × 2", 32, VERT_OK),
               T("6 = 2 × 3", 32, VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
cx0, cx1, cy0, cy1 = bloc("le calcul (3 lignes)", calc7, -0.4, -4.55)
r07, ax07 = EcransEspace.repere(E, o=(-4.3, -1.4), u=0.44, portee=7)
u07 = r07.vecteur((0, 0, 0), (1, 2, 3), "u", couleur=C_VECTEUR, sw=8,
                  decal=np.array([-0.25, 1.50, 0.0]))
v07 = r07.vecteur((0, 0, 0), (2, 4, 6), "v", couleur=VERT_OK, sw=5,
                  decal=np.array([1.25, 0.75, 0.0]))
cadre("repère + u + v (colinéaires)", ax07, u07, v07)
eu = cadre("  étiquette u seule", u07.nom)
ev = cadre("  étiquette v seule", v07.nom)
# ⛔⛔ u ET v ONT LA MÊME DIRECTION : leurs deux étiquettes sont du même côté (DR) de la
# MÊME droite. Si elles se recouvrent, on ne lit plus ni l'une ni l'autre.
if not (eu[1] < ev[0] or ev[1] < eu[0] or eu[2] > ev[3] or ev[2] > eu[3]):
    ennuis.append("07b : les étiquettes u et v se recouvrent")
    print("  ⛔ LES DEUX ÉTIQUETTES SE RECOUVRENT")
else:
    print("  les deux étiquettes ne se recouvrent pas  ✅")
if float(u07.nom.get_left()[0]) < cx1 and float(u07.nom.get_bottom()[1]) < cy1:
    ennuis.append("07b : l'étiquette u tombe sur la colonne de calcul")
    print("  ⛔ L'ÉTIQUETTE u TOMBE SUR LE CALCUL")
droite_("« un seul écart, et c'est fini »", T("un seul écart, et c'est fini", 30, C_PIEGE), -2.6)

# ── 09 : le défi, consigne fléchée ─────────────────────────────────────────
print("\n── 09 : la consigne du défi (« A B » et « A C » fléchés) ──")
cons = VGroup(VX("les coordonnées de A B et A C,", ("A B", "A C"), 32),
              T("puis : sont-ils colinéaires ?", 32, "#f97316"))
cx, cx1_, cy, cy1_ = droite_("⭐ consigne (2 lignes, 1 fléchée)",
                             cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12), -0.8)
print(f"  police de la ligne fléchée : {police_de(cons[0]):.1f} (demandée 32)")
if police_de(cons[0]) < 31.5:
    ennuis.append("09 : la consigne est rétrécie")
    print("  ⛔ LA CONSIGNE EST RÉTRÉCIE")
p09 = droite_("« Mets pause, et cherche ! »", T("Mets pause, et cherche !", 32, "#f97316"), -2.1)
reb = CompteARebours(5, r=0.34, fs=32)
reb.next_to(T("Mets pause, et cherche !", 32).move_to(P(0, -2.1)), DOWN, buff=0.3)
cadre("le rebours sous la pause", reb)

# ── 09b : la correction, deux blocs fléchés ────────────────────────────────
print("\n── 09b : « A B » et « A C » fléchés, puis k et la conclusion ──")
L1_ = ligne_("⭐ A B fléché (−1 ; 1 ; 0)", VEC("A B", 34, C_VECTEUR), TRIP(AB_D, 34, VERT_OK),
             y=-0.75)
L2g = VGroup(VEC("A C", 34, C_VECTEUR2), TRIP(AC_D, 34, VERT_OK)).arrange(RIGHT, buff=0.15)
L2_ = droite_("⭐ A C fléché (−1 ; 0 ; 1)", L2g, -1.5)
kv = T("k = 1 ?", 34, C_REGARD)
kv.move_to(P(0, L2_[2] - 0.4 - 0.2)).align_to(P(L2_[0], 0), LEFT)
cadre("« k = 1 ? » sous A C", kv)
cadre("« 1 ≠ 0 » à sa droite", T("1 ≠ 0", 36, C_PIEGE).next_to(kv, RIGHT, buff=0.4))
concl = VGroup(T("non colinéaires :", 34, VERT_OK),
               T("A, B et C ne sont pas alignés", 34, VERT_OK))
concl.arrange(DOWN, aligned_edge=LEFT, buff=0.1).move_to(P(0, -2.75)).align_to(P(-6.2, 0), LEFT)
ccl = cadre("la conclusion (2 lignes, à gauche)", concl)
if ccl[1] > L2_[0] and ccl[3] > L2_[2]:
    ennuis.append("09b : la conclusion touche la colonne de droite")
    print("  ⛔ LA CONCLUSION TOUCHE LA COLONNE DE DROITE")
r09, ax09 = EcransEspace.repere(E, o=(-4.0, -1.0), u=0.9, portee=2)
cadre("repère + A B + A C (sans étiquette)", ax09,
      r09.vecteur(AD, BD, None, couleur=C_VECTEUR, sw=7),
      r09.vecteur(AD, CD, None, couleur=C_VECTEUR2, sw=7))

# ── 10 : la finale, dont la 2e ligne est fléchée ───────────────────────────
print("\n── 10 : les trois faits (Ti-Margo 0,65 : x ≥ 5,30) ──")
fs = 42
b1 = VGroup(T("un vecteur de l'espace :", fs), T("trois coordonnées", fs, C_REGARD))
b2 = VGroup(VX("A B :", ("A B",), fs, C_VECTEUR), T("arrivée moins départ", fs, C_REGARD))
b3 = VGroup(T("colinéaires :", fs, VERT_OK), T("un seul et même nombre", fs),
            T("pour les trois", fs, C_REGARD))
for b in (b1, b2):
    b.arrange(RIGHT, buff=0.25)
b3_ = VGroup(b3[0], VGroup(b3[1], b3[2]).arrange(RIGHT, buff=0.22)).arrange(RIGHT, buff=0.25)
lignes = VGroup(*[VGroup(EcransEspace.coche(E), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                  for b in (b1, b2, b3_)]).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
plafonne("les trois faits (dont « A B : » fléché)", lignes, 10.6, P(-0.75, 0.10))
cadre("  la ligne fléchée seule", b2)

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
