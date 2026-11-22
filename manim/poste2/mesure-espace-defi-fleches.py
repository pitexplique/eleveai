# manim/poste2/mesure-espace-defi-fleches.py
# LES COTES DES BLOCS DE L'ÉPISODE 6 QUI ONT REÇU LA NOTATION FLÉCHÉE (22/11/2026).
#
# ⛔ CE N'EST PAS UN REMPLAÇANT DE `mesure-espace-defi.py`, qui mesure l'épisode entier
# et reste la référence. Celui-ci ne regarde que les SIX textes devenus `vec` / `vexpr`
# et leurs voisins immédiats, parce que c'est là, et seulement là, que la flèche change
# quelque chose : elle déborde de 0,10 + l'épaisseur au-dessus du texte.
# ⭐ Mesuré avant d'écrire une ligne : `grep "\.vecteur("` dit que cet épisode n'a
# **aucune étiquette de figure nommée** (son seul appel passe `nom=None`). Le changement
# de défaut de `Repere3D.vecteur` ne le touche donc pas — contrairement à l'épisode 1.
#
# ⭐⭐ `--sans-fleches` rebâtit les mêmes blocs SANS la notation : c'est le TÉMOIN, et
# c'est le seul moyen de distinguer ce que CETTE passe a changé de ce que l'épisode
# publié portait déjà. ⛔ Sans lui, on relit l'état et on croit lire un diff.
#
#   python -X utf8 manim/poste2/mesure-espace-defi-fleches.py [--sans-fleches]

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import C_DROITE, C_PIEGE, C_REGARD  # noqa: E402
from espace_ecrans import P, EcransEspace, ligne_param  # noqa: E402
from espace_defi import OMEGA, S, EspaceDefiBase  # noqa: E402

MARGE_X, MARGE_Y = 6.68, 3.573
VERT_OK, JAUNE_TITRE = "#22c55e", "#fbbf24"
E = EcransEspace.__new__(EspaceDefiBase)
T = lambda s, fs, c=WHITE: EcransEspace.t(E, s, fs, c)                      # noqa: E731
TRIP = lambda t3, fs, c=WHITE, **k: EcransEspace.trip(E, t3, fs, c, **k)    # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)               # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
CH2 = lambda a, b, fs, noms: EcransEspace.choix2(E, a, b, fs, noms)         # noqa: E731
CH3 = lambda a, b, c, fs, noms: EcransEspace.choix3(E, a, b, c, fs, noms)   # noqa: E731
ennuis = []

if "--sans-fleches" in sys.argv:
    VEC = lambda n, fs=28, c=WHITE: T(n, fs, c)                        # noqa: E731,F811
    VX = lambda t, noms, fs=28, c=WHITE: T(t, fs, c)                   # noqa: E731,F811
    CH2 = lambda a, b, fs, noms: EcransEspace.choix2(E, a, b, fs)      # noqa: E731,F811
    CH3 = lambda a, b, c, fs, noms: EcransEspace.choix3(E, a, b, c, fs)  # noqa: E731,F811


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


def police_de(mob):
    pile = [mob]
    while pile:
        m = pile.pop(0)
        if isinstance(getattr(m, "font_size", None), (int, float)):
            return round(float(m.font_size), 1)
        pile += list(m.submobjects)
    return 0.0


def ecart(nom, haut, bas, mini=0.08):
    d = haut[2] - bas[3]
    print(f"  écart {nom:38s} {d:5.2f}{'  ⛔ ILS SE TOUCHENT' if d < mini else '  ✅'}")
    if d < mini:
        ennuis.append(f"{nom} : les blocs se touchent")


# ── 05 : A Ω, A G, et l'égalité qui démontre l'alignement ─────────────────────────
print("── 05 : les TROIS blocs fléchés de la démonstration ──")
t05 = T("Montrons un alignement", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
tx = cadre("titre de 05", t05)
fs = 28
b1 = droite_("⭐ A Ω fléché (0,5 ; 0,5 ; 0,5)",
             VGroup(VEC("A Ω", fs, VERT_OK), TRIP(OMEGA, fs)).arrange(RIGHT, buff=0.24), 2.45)
if b1[3] > tx[2]:
    ennuis.append("05 : le bloc A Ω recouvre le titre")
    print("  ⛔ LE BLOC A Ω RECOUVRE LE TITRE")
else:
    print(f"  écart A Ω → titre : {tx[2] - b1[3]:.2f}  ✅")
b2 = droite_("⭐ A G fléché (1 ; 1 ; 1)",
             VGroup(VEC("A G", fs, C_REGARD), TRIP(S["G"], fs)).arrange(RIGHT, buff=0.24), 1.60)
ecart("A Ω → A G", b1, b2)
b3 = droite_("« 1 ; 1 ; 1 = 2 × (0,5 …) » (2 lignes)",
             VGroup(VGroup(TRIP(S["G"], fs, C_REGARD), T("=", fs, GREY_A)).arrange(RIGHT, buff=0.18),
                    VGroup(T("2 ×", fs, C_REGARD), TRIP(OMEGA, fs, WHITE, par=True))
                    .arrange(RIGHT, buff=0.18)).arrange(DOWN, aligned_edge=LEFT, buff=0.10), 0.70)
ecart("A G → l'égalité des triplets", b2, b3)
eg = VX("A G = 2 A Ω", ("A G", "A Ω"), 34, VERT_OK)
b4 = droite_("⭐ « A G = 2 A Ω » fléché + cadre",
             VGroup(eg, SurroundingRectangle(eg, color=VERT_OK, buff=0.14, stroke_width=3)), -0.20)
ecart("l'égalité → le cadre fléché", b3, b4)
print(f"  police obtenue dans le cadre : {police_de(eg):.1f} (demandée 34)")
if police_de(eg) < 33.5:
    ennuis.append("05 : « A G = 2 A Ω » est rétréci")
    print("  ⛔ « A G = 2 A Ω » EST RÉTRÉCI")
b5 = droite_("« colinéaires »",
             VGroup(EcransEspace.coche(E, VERT_OK, 0.15), T("colinéaires", 32, VERT_OK))
             .arrange(RIGHT, buff=0.22), -1.10)
ecart("le cadre fléché → « colinéaires »", b4, b5)
b6 = droite_("« A, Ω et G alignés » (⛔ des POINTS)",
             VGroup(EcransEspace.coche(E, VERT_OK, 0.15), T("A, Ω et G alignés", 32, VERT_OK))
             .arrange(RIGHT, buff=0.22), -1.69)
ecart("« colinéaires » → « A, Ω et G alignés »", b5, b6)
r05, cube05 = EcransEspace.__dict__.get("cube_repere", EspaceDefiBase.cube_repere)(
    E, o=(-5.3, -1.60), u=1.6, rouges=("A", "G"))
cadre("le cube (u = 1,6)", cube05)

# ── 07 : les trois cartes de choix, dont DEUX nomment des vecteurs ────────────────
print("\n── 07 : la question 2 (largeur 6,3 ; xl 0,35) — cartes fléchées ──")
fsq = 24
intro = VGroup(T("pour démontrer que trois points", 28), T("A, B et C de l'espace", 28),
               T("sont alignés", 28, C_REGARD)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
bi = bloc("l'intro (3 lignes)", intro, 1.70, -0.1)
cA = CH2("on montre que A B et A C", "ont la même norme", fsq, ("A B", "A C"))
cB = CH3("on montre que les", "vecteurs A B et A C", "sont colinéaires", fsq, ("A B", "A C"))
cC = CH2("on montre qu'ils sont", "dans un même plan", fsq, ("A B", "A C"))
tete, q, cartes, pause, rebours = EcransEspace.q_tete(
    E, ["que fait-on ?"], [cA, cB, cC], largeur=6.3, xl=0.35)
cadre("tête « Question ! » + rebours", tete, rebours)
cadre("la question (1 ligne)", q)
bc = cadre("⭐ les trois cartes (A et B fléchées)", cartes)
cadre("« Mets pause, et choisis ! »", pause)
pol = []
for c in cartes:
    pol.append(police_de(c[1][1]))
print(f"  polices obtenues : {pol}  (demandée {fsq})"
      f"{'  ⛔ RÉDUITES' if min(pol) < fsq - 0.5 else '  ✅'}")
if min(pol) < fsq - 0.5:
    ennuis.append("07 : cartes réduites")
# ⛔ LA BOÎTE DE TI-MARGO A DEUX DIMENSIONS : x ∈ [5,54 ; 6,66] ET y ≤ −2,15. Un bloc
# qui descend sous −2,15 mais s'arrête avant x = 5,54 ne le touche pas — la pause de cet
# écran est dans ce cas, et un contrôle en y seul la signalait à tort.
MARGO = (5.54, 6.66, -3.55, -2.15)
pb = (float(pause.get_left()[0]), float(pause.get_right()[0]),
      float(pause.get_bottom()[1]), float(pause.get_top()[1]))
if not (pb[1] < MARGO[0] or MARGO[1] < pb[0] or pb[3] < MARGO[2] or MARGO[3] < pb[2]):
    ennuis.append("07 : la pause touche Ti-Margo")
    print("  ⛔ LA PAUSE TOUCHE TI-MARGO")
else:
    print(f"  pause : bas {pb[2]:.2f}, droite {pb[1]:.2f} — Ti-Margo commence à "
          f"x = 5,54 sous y = −2,15  ✅")
print(f"  intro (x ≤ {bi[1]:.2f}) → cartes (x ≥ {bc[0]:.2f}) : {bc[0] - bi[1]:.2f}"
      f"{'  ⛔ ELLES SE TOUCHENT' if bc[0] - bi[1] < 0.08 else '  ✅'}")
if bc[0] - bi[1] < 0.08:
    ennuis.append("07 : l'intro touche les cartes")

# ── 07b : « A C = k × A B », juste à gauche des cartes ────────────────────────────
print("\n── 07b : le bloc fléché de la réponse (cartes : bas %.2f) ──" % bc[2])
l1 = VGroup(T("on cherche un nombre k tel que", 28),
            VX("A C = k × A B", ("A C", "A B"), 34, VERT_OK))
b7 = bloc("⭐ « A C = k × A B » fléché (2 lignes)",
          l1.arrange(DOWN, aligned_edge=LEFT, buff=0.14), -0.35, -0.1)
if b7[3] > bc[2] and b7[1] > bc[0]:
    ennuis.append("07b : le bloc fléché recouvre les cartes")
    print("  ⛔ LE BLOC FLÉCHÉ RECOUVRE LES CARTES")
else:
    print(f"  il reste à GAUCHE des cartes (x ≤ {b7[1]:.2f} < {bc[0]:.2f})  ✅")
l2 = VGroup(VGroup(EcransEspace.croix(E, r=0.12), T("la même norme : B et C sont", 24, C_PIEGE))
            .arrange(RIGHT, buff=0.18),
            T("à la même distance de A —", 24, C_PIEGE),
            T("rien à voir avec l'alignement", 24, C_PIEGE)).arrange(DOWN, aligned_edge=LEFT,
                                                                     buff=0.08)
b8 = bloc("« la même norme » (3 lignes)", l2, -1.53, -0.1)
ecart("le bloc fléché → « la même norme »", b7, b8)

# ── 09b : « A G », le vecteur directeur de la diagonale ───────────────────────────
print("\n── 09b : « A G » fléché, et le système juste dessous ──")
vAG = VGroup(VGroup(VEC("A G", 28, C_REGARD), TRIP(S["G"], 28)).arrange(RIGHT, buff=0.18),
             T("A = origine", 28, GREY_A)).arrange(DOWN, aligned_edge=LEFT, buff=0.10)
b9 = droite_("⭐ A G fléché + « A = origine »", vAG, -0.35)
syst = EcransEspace.systeme(E, [ligne_param(n, S["A"][i], S["G"][i])
                                for i, n in enumerate("xyz")], 30, c_acc=C_DROITE)
b10 = droite_("le système (3 lignes)", syst, -1.64)
ecart("A G → le système", b9, b10)

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
print("✅ aucune cote hors marge, aucun bloc rétréci, aucun chevauchement")
