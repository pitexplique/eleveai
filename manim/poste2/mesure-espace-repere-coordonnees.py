# manim/poste2/mesure-espace-repere-coordonnees.py
# LES COTES DE L'ÉPISODE 2 (« espace_repere_coordonnees »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-calculer.py` (épisode 7) : il signale les réductions
# PAR UN PLAFOND et il COMPARE la colonne de droite au titre.
#
# ⛔ PÉRIMÈTRE, et il est petit, parce qu'il a été MESURÉ et non supposé : cet épisode
# n'a reçu la notation fléchée que sur QUATRE textes (écrans 08, 09 et 09b), et
# `grep "\.vecteur("` dit qu'il n'a **aucune étiquette de figure nommée** (ses deux
# appels passent `nom=None`). Le changement de défaut de `Repere3D.vecteur` ne le touche
# donc pas du tout — contrairement à l'épisode 1, qui en a six.
#
# ⭐⭐ `--sans-fleches` rebâtit les mêmes blocs SANS la notation : deux sorties à
# comparer, et la seule question qui compte devient mesurable — qu'est-ce que la flèche
# a changé ? ⛔ Sans ce mode, l'outil liste aussi les blocs que l'épisode PUBLIÉ portait
# déjà, et on croit avoir cassé ce qu'on n'a pas touché.
#
#   python -X utf8 manim/poste2/mesure-espace-repere-coordonnees.py [--sans-fleches]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import C_REGARD, C_VECTEUR, C_VECTEUR2  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace  # noqa: E402
from espace_repere_coordonnees import (AD_, CUBE, IJ, I_EF, J_GH,  # noqa: E402
                                       EspaceRepereCoordonneesBase)

MARGE_X, MARGE_Y = 6.68, 3.573
VERT_OK, JAUNE_TITRE, ORANGE_RETENUE = "#22c55e", "#fbbf24", "#f97316"
GREY_B_, ROUGE = GREY_B, "#dc2626"
E = EcransEspace.__new__(EspaceRepereCoordonneesBase)
T = lambda s, fs, c=WHITE: EcransEspace.t(E, s, fs, c)                      # noqa: E731
TRIP = lambda t3, fs, c=WHITE, **k: EcransEspace.trip(E, t3, fs, c, **k)    # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)               # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
ennuis = []

if "--sans-fleches" in sys.argv:
    VEC = lambda n, fs=28, c=WHITE: T(n, fs, c)                      # noqa: E731,F811
    VX = lambda t, noms, fs=28, c=WHITE: T(t, fs, c)                 # noqa: E731,F811


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


def plafonne(nom, mob, plafond, pos=None):
    nat = float(mob.width)
    if nat > plafond:
        mob.scale_to_fit_width(plafond)
    if pos is not None:
        mob.move_to(pos)
    bords = cadre(nom, mob)
    note = ""
    if nat > plafond + 0.01:
        note = f"  ⛔ RÉDUIT PAR LE PLAFOND de {100 * (1 - plafond / nat):.1f} %"
        ennuis.append(f"{nom} : réduit par le plafond")
    print(f"  {'':44s} largeur naturelle {nat:5.2f}   plafond {plafond:5.2f}{note}")
    return bords


def droite_(nom, mob, y, xl=2.2):
    naturel = float(mob.width)
    EcransEspace.col(E, mob, y, xl)
    return cadre(f"{nom} (y={y})", mob, naturel=naturel)


def ligne_(nom, *morceaux, y, xl=2.2):
    return droite_(nom, VGroup(*morceaux).arrange(RIGHT, buff=0.15), y, xl)


def police_de(mob):
    """⚠️ On descend jusqu'au premier `font_size` : selon que le bloc passe par `vexpr`
    ou par `t`, `mob[0][0]` tombe sur un `Text` ou sur un GLYPHE, et Manim lève alors une
    AttributeError opaque."""
    pile = [mob]
    while pile:
        m = pile.pop(0)
        if isinstance(getattr(m, "font_size", None), (int, float)):
            return round(float(m.font_size), 1)
        pile += list(m.submobjects)
    return 0.0


# ── 08 : la première ligne de la copie — « le repère A, A B, A D, A E » fléché ──────
print("── 08 : la copie, et la ligne qui annonce le repère ──")
titre08 = T("La première ligne de la copie", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
cadre("titre de 08", titre08)
copie = RoundedRectangle(width=9.8, height=3.9, corner_radius=0.18, stroke_color=GREY_B_,
                         stroke_width=3).move_to(P(-0.5, -0.35))
marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
             copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2, color=ROUGE)
cx = cadre("la copie", copie)
if cx[3] > float(titre08.get_bottom()[1]):
    ennuis.append("08 : la copie touche le titre")
    print("  ⛔ LA COPIE TOUCHE LE TITRE")
fs = 32
un = VGroup(EcransEspace.pastille(E, 1), VGroup(
    VX("on se place dans le repère A, A B, A D, A E,", ("A B", "A D", "A E"), fs),
    T("qui est orthonormé", fs, C_VECTEUR)).arrange(DOWN, aligned_edge=LEFT, buff=0.1))
un.arrange(RIGHT, buff=0.3, aligned_edge=UP)
deux = VGroup(EcransEspace.pastille(E, 2), VGroup(
    T("les coordonnées de tous les points utiles :", fs),
    T("les sommets d'abord, les milieux ensuite", fs, VERT_OK)).arrange(
        DOWN, aligned_edge=LEFT, buff=0.1))
deux.arrange(RIGHT, buff=0.3, aligned_edge=UP)
lignes = VGroup(un, deux).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
plafonne("⭐ les deux points (dont la ligne fléchée)", lignes, 8.7)
lignes.move_to(copie.get_center() + UP * 0.3).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
lx = cadre("  recalés sur la marge de la copie", lignes)
print(f"  police obtenue sur la ligne fléchée : {police_de(un[1][0]):.1f} (demandée {fs})")
if lx[1] > float(copie.get_right()[0]) - 0.2:
    ennuis.append("08 : le texte sort de la copie")
    print("  ⛔ LE TEXTE SORT DE LA COPIE")
else:
    print(f"  jeu jusqu'au bord droit de la copie : {float(copie.get_right()[0]) - lx[1]:.2f}  ✅")
rap = T("cette ligne-là rapporte des points", 32, C_REGARD).next_to(copie, DOWN, buff=0.3)
cadre("le rappel sous la copie + cadre",
      VGroup(rap, SurroundingRectangle(rap, buff=0.12, stroke_width=3)))

# ── 09 : la consigne du défi — « du vecteur I J » fléché ───────────────────────────
print("\n── 09 : la consigne du défi ──")
cons = VGroup(T("les coordonnées de I et de J,", 32),
              VX("puis celles du vecteur I J", ("I J",), 32, ORANGE_RETENUE))
co = droite_("⭐ consigne (2 lignes, 1 fléchée)",
             cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0.9)
print(f"  police obtenue sur la ligne fléchée : {police_de(cons[1]):.1f} (demandée 32)")
if police_de(cons[1]) < 31.5:
    ennuis.append("09 : la consigne est rétrécie")
    print("  ⛔ LA CONSIGNE EST RÉTRÉCIE")
pz = droite_("« Mets pause, et cherche ! »", T("Mets pause, et cherche !", 32, ORANGE_RETENUE), -0.6)
reb = CompteARebours(5, r=0.34, fs=32)
reb.next_to(T("Mets pause, et cherche !", 32).move_to(P(0, -0.6)), DOWN, buff=0.3)
cadre("le rebours sous la pause", reb)

# ── 09b : la correction — « I J » et « A D » fléchés ───────────────────────────────
print("\n── 09b : I, J, puis les deux VECTEURS fléchés, puis les deux DROITES ──")
fs = 32
ligne_("I (0,5 ; 0 ; 1)", T("I", fs, C_REGARD), TRIP(I_EF, fs, VERT_OK), y=2.0)
ligne_("J (0,5 ; 1 ; 1)", T("J", fs, C_VECTEUR2), TRIP(J_GH, fs, VERT_OK), y=1.2)
b3 = ligne_("⭐ I J fléché (0 ; 1 ; 0)", VEC("I J", fs + 2, VERT_OK), TRIP(IJ, fs + 2, VERT_OK),
            y=0.3)
b4 = ligne_("⭐ A D fléché (0 ; 1 ; 0)", VEC("A D", fs + 2, C_VECTEUR2),
            TRIP(AD_, fs + 2, C_VECTEUR2), y=-0.5)
print(f"  écart vertical entre les deux blocs fléchés : {b3[2] - b4[3]:.2f}"
      f"{'  ⛔ ILS SE TOUCHENT' if b3[2] - b4[3] < 0.10 else '  ✅'}")
if b3[2] - b4[3] < 0.10:
    ennuis.append("09b : les blocs I J et A D se touchent")
# ⛔ PAS DE FLÈCHE sur la conclusion : ce sont les DROITES (I J) et (A D).
cl = VGroup(T("(I J) et (A D)", 34, VERT_OK), T("sont parallèles", 34, VERT_OK))
cc = droite_("conclusion : les DROITES, sans flèche",
             cl.arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.6)
print(f"  écart entre « A D » fléché et la conclusion : {b4[2] - cc[3]:.2f}"
      f"{'  ⛔ ILS SE TOUCHENT' if b4[2] - cc[3] < 0.10 else '  ✅'}")
if b4[2] - cc[3] < 0.10:
    ennuis.append("09b : la conclusion touche le bloc A D")
droite_("« démontré, pas vu »", T("démontré, pas vu", 30, C_REGARD), -2.6)

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
