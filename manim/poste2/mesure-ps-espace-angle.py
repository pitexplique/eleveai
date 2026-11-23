# manim/poste2/mesure-ps-espace-angle.py
# LES COTES DE L'ÉPISODE 10 (« ps_espace_angle »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-norme-distance.py` (épisode 9), la version la plus
# complète de l'outil : blocs RÉTRÉCIS, réductions PAR UN PLAFOND, colonne de droite
# comparée au TITRE, étiquettes de figure DEUX À DEUX (`etiquettes()`), et surtout
# `loin_des_fleches()` — une étiquette comparée au FÛT de tout segment tracé.
#
# ⚠️ CE QUE CET ÉPISODE AJOUTE :
#   · `loin_des_fleches` reçoit ici LES DOUZE ARÊTES DU CUBE en plus des deux flèches.
#     ⛔ Sur E9, la première version ne connaissait que les diagonales, et les deux noms
#     écartés pour les fuir se sont posés PILE SUR deux arêtes : un contrôle qui ne
#     connaît qu'une partie du dessin DÉPLACE le défaut au lieu de le corriger.
#   · une FRACTION est bien plus haute qu'une ligne de texte (et davantage encore quand
#     son dénominateur est un RADICAL). Les blocs qui en portent une sont donc mesurés
#     AVEC, jamais estimés depuis un voisin — c'est la leçon du radical de l'épisode 9,
#     à son deuxième étage.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit
# le bloc à la largeur de sa plus longue ligne, et son second garde-fou (« bas sous
# −1,95 ET droite au-delà de 5,3 → réduire ») se déclenche au CENTIÈME près.
# Le critère : aucune ligne « RÉTRÉCI », aucune « HORS MARGE », aucune « RÉDUIT PAR LE
# PLAFOND », aucun chevauchement, aucune étiquette « SE TOUCHENT » ni « TRAVERSÉE ».
#
#   python -X utf8 manim/poste2/mesure-ps-espace-angle.py

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import (C_FANTOME, C_PIEGE, C_REGARD, C_VECTEUR,  # noqa: E402
                      C_VECTEUR2, Repere3D)
from charte import VERT_OK  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace  # noqa: E402
from ps_espace_angle import (AB, AG, COS07, ECH_RAVI, INCL01, POS_RAVI,  # noqa: E402
                             PS04, S, U02, U05,
                             V02, V05, PsEspaceAngleBase, angle, coin, ecart,
                             norme2, ps, ravi, soleil, toit_panneau)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
E = EcransEspace.__new__(PsEspaceAngleBase)
T = lambda s, fs: EcransEspace.t(E, s, fs)                                   # noqa: E731
RAC = lambda r, fs=28, **k: EcransEspace.racine(E, r, fs, WHITE, **k)        # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)                # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)   # noqa: E731
NOMME = lambda n, t3, c, fs: PsEspaceAngleBase.nomme(E, n, t3, c, fs)        # noqa: E731
FRAC = lambda h, b, fs=28: PsEspaceAngleBase.frac(E, h, b, fs)               # noqa: E731
COSF = lambda fs=28: PsEspaceAngleBase.cos_formule(E, fs)                    # noqa: E731
DEG = lambda v, fs=28: PsEspaceAngleBase.deg(E, v, fs)                       # noqa: E731
ENV = lambda v, fs=26: PsEspaceAngleBase.env(E, v, fs)                       # noqa: E731
CROIX = lambda r=0.13: EcransEspace.croix(E, r=r)                            # noqa: E731
COCHE = lambda t=0.14: EcransEspace.coche(E, "#00FF7F", t)                   # noqa: E731
CH2 = lambda a, b, fs=28, **k: EcransEspace.choix2(E, a, b, fs, **k)         # noqa: E731
NB = lambda v: EcransEspace.nombre(E, v)                                     # noqa: E731
ennuis = []


def police(carte):
    """LA PLUS PETITE police réellement obtenue par le corps d'une carte de choix.
    ⛔ « la plus petite » et non « la première » : `racine()` dessine son signe √ à 1,15
    fois la police demandée, et la première police rencontrée était donc celle du signe
    — la carte paraissait plus grande que demandée alors que son texte, lui, était
    rétréci."""
    pile, vues = [carte[1][1]], []
    while pile:
        m = pile.pop(0)
        if isinstance(getattr(m, "font_size", None), (int, float)):
            vues.append(round(float(m.font_size), 1))
        pile += list(m.submobjects)
    return min(vues) if vues else 0.0


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
    print(f"  {'':46s} largeur naturelle {nat:5.2f}   plafond {plafond:5.2f}{note}")
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
    par `col()`, et la mesure ne les COMPARAIT pas."""
    ty0, ty1 = float(titre.get_bottom()[1]), float(titre.get_top()[1])
    tx0, tx1 = float(titre.get_left()[0]), float(titre.get_right()[0])
    for b in blocs_droite:
        bx0, bx1, by0, by1 = b
        if by1 > ty0 and bx1 > tx0 and bx0 < tx1:
            ennuis.append(f"{cle} : un bloc recouvre le titre")
            print("  ⛔ UN BLOC RECOUVRE LE TITRE")
            return
    haut = max(b[3] for b in blocs_droite) if blocs_droite else -99
    print(f"  écart colonne → titre : {ty0 - haut:.2f}  ✅")


def dessous(cle, quoi, haut, bas):
    """Deux blocs empilés : le second passe-t-il SOUS le premier ?"""
    if bas[3] > haut[2]:
        ennuis.append(f"{cle} : {quoi}")
        print(f"  ⛔ {quoi.upper()}")
    else:
        print(f"  écart ({quoi}) : {haut[2] - bas[3]:.2f}  ✅")


def etiquettes(cle, *paires):
    """⭐ LES ÉTIQUETTES DE FIGURE, DEUX À DEUX (hérité de l'épisode 8)."""
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


def _dist_seg_boite(a, b, mob, pas=120):
    x0, x1 = float(mob.get_left()[0]), float(mob.get_right()[0])
    y0, y1 = float(mob.get_bottom()[1]), float(mob.get_top()[1])
    mini = 1e9
    for k in range(pas + 1):
        t = k / pas
        px = float(a[0]) + t * (float(b[0]) - float(a[0]))
        py = float(a[1]) + t * (float(b[1]) - float(a[1]))
        dx = max(x0 - px, 0.0, px - x1)
        dy = max(y0 - py, 0.0, py - y1)
        mini = min(mini, (dx * dx + dy * dy) ** 0.5)
    return mini


def loin_des_fleches(cle, segments, etqs, seuil=0.08):
    """⛔⛔ UNE ÉTIQUETTE TRAVERSÉE PAR UN FÛT (contrôle neuf de l'épisode 9).

    `etiquettes()` compare des boîtes ENTRE ELLES : il ne voit jamais une boîte contre
    un SEGMENT. ⚠️ On échantillonne le segment, pas sa boîte — la boîte d'une flèche en
    diagonale est un grand rectangle presque vide.
    ⛔⛔ ET ON LUI PASSE TOUT CE QUI EST TRACÉ, pas seulement les flèches : sur E9, la
    première version ne connaissait que les deux diagonales, et les noms écartés pour
    les fuir se sont posés pile sur deux arêtes du cube."""
    for nom_e, mob in etqs:
        pire, coupable = 1e9, ""
        for nom_f, a, b in segments:
            d = _dist_seg_boite(a, b, mob)
            if d < pire:
                pire, coupable = d, nom_f
        note = ("  ⛔ TRAVERSÉE" if pire < seuil
                else ("  ⚠️ serré" if pire < 0.18 else "  ✅"))
        if pire < seuil:
            ennuis.append(f"{cle} : « {nom_e} » traversée par {coupable}")
        print(f"    « {nom_e:5s} » ↔ {coupable:10s} : {pire:.2f}{note}")


def segments_du_cube(r, extra=()):
    """Les DOUZE arêtes du cube, plus ce qu'on y ajoute. ⭐ Les arêtes sont recalculées
    depuis les sommets (paires qui diffèrent d'UNE coordonnée) et non recopiées : c'est
    ce comptage-là qui a montré, le 23/11, que `cube()` n'en traçait que onze."""
    segs = []
    for s1 in S:
        for s2 in S:
            if s1 < s2 and sum(1 for k in range(3) if S[s1][k] != S[s2][k]) == 1:
                segs.append((f"[{s1}{s2}]", r.pt(*S[s1]), r.pt(*S[s2])))
    return segs + list(extra)


print("── les figures disent-elles l'angle qu'elles annoncent ? ──")
for d in (45, 50, 60, 90, 130):
    g = coin(d)
    v1 = g.f1.get_end() - g.f1.get_start()
    v2 = g.f2.get_end() - g.f2.get_start()
    a = math.degrees(math.atan2(v2[1], v2[0]) - math.atan2(v1[1], v1[0])) % 360
    print(f"  coin({d:3d}) dessine {min(a, 360 - a):6.2f}°"
          f"{'  ✅' if abs(min(a, 360 - a) - d) < 1e-6 else '  ⛔ FAUX'}")
tp = toit_panneau(INCL01)
import numpy as _np  # noqa: E402
_a = math.degrees(math.acos(min(1.0, float(_np.dot(tp.d_perp, tp.d_sol)))))
print(f"  le panneau annonce {INCL01}° et dessine {_a:.2f}°"
      f"{'  ✅' if abs(_a - INCL01) < 1e-6 else '  ⛔ FAUX'}")
print(f"  ⚠️ en cavalière, l'angle de A⃗G et A⃗B se lirait 42,4° pour 54,7° réels :")
print(f"     c'est pourquoi AUCUNE figure d'angle de cet épisode n'est en cavalière,")
print(f"     et pourquoi l'arc du cube ne porte AUCUNE valeur.")

print("\n── 00 : la page de garde ──")
t00 = T("Calculer un angle", 46).to_edge(UP, buff=0.5)
cadre("titre", t00)
lg = VGroup()
for txt in ("un produit scalaire", "deux normes", "une division"):
    lg.add(VGroup(Dot(radius=0.08), T(txt, 36)).arrange(RIGHT, buff=0.26))
lg.arrange(DOWN, aligned_edge=LEFT, buff=0.40).move_to(P(-0.9, 0.95))
g00 = cadre("les trois promesses", lg)
ech = cadre("echelle() alignée en bas", EcransEspace.echelle(E).align_to(P(0, -3.45), DOWN))
fin00 = cadre("la ligne finale",
              T("le signe donne la réponse avant le calcul", 30).move_to(P(-0.9, -1.55)))
print(f"  écart ligne finale → échelle : {fin00[2] - ech[3]:.2f}"
      f"{'  ⛔ SE TOUCHENT' if fin00[2] < ech[3] else '  ✅'}")
if fin00[2] < ech[3]:
    ennuis.append("00 : la ligne finale touche l'échelle des ceintures")

print("\n── 01 : Ravi, le panneau, les trois cas ──")
c = ravi(ECH_RAVI).move_to(P(*POS_RAVI))   # ⭐ importée, plus recopiée
rx0, rx1, ry0, ry1 = cadre("Ravi (s = 0,66)", c)
nom = T("Ravi", 28).next_to(c, DOWN, buff=0.22)
if nom.get_left()[0] < -6.5:
    nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
lieu = T("Saint-Pierre", 24).next_to(nom, DOWN, buff=0.18)
if lieu.get_left()[0] < -6.5:
    lieu.shift(RIGHT * (-6.5 - lieu.get_left()[0]))
cadre("« Ravi / Saint-Pierre » (après garde-fou)", nom, lieu)
# ⛔⛔ « SAINT-PIERRE » SEUL, PARCE QU'IL EST LE BAS DE LA COLONNE DE GAUCHE et que
# le cadre de conclusion arrive juste dessous. Mesuré en paire, ce bas-là disparaît
# dans la boîte commune avec « Ravi ». C'est la faute de l'épisode 7 (« la mesure
# voyait le titre et ne le comparait à rien ») sous sa forme de gauche — et elle a
# coûté un tour de plus : la correction précédente avait écarté « Ravi » de
# « Saint-Pierre » et poussé « Saint-Pierre » SUR le cadre, sans que rien le dise.
sp01 = cadre("« Saint-Pierre » seul", lieu)
tp1 = toit_panneau(INCL01, 1.0).move_to(P(-2.45, 0.88))
sol = soleil(1.0).move_to(tp1.get_center() + tp1.d_sol * 2.30)
px0, px1, py0, py1 = cadre("le panneau + le soleil", tp1, sol)
print(f"  écart Ravi → panneau : {px0 - rx1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if px0 - rx1 < 0.15 else '  ✅'}")
if px0 - rx1 < 0.15:
    ennuis.append("01 : Ravi touche le schéma du panneau")
fs = 28
d1 = droite_("✓ « face au soleil (0°) / à plein »",
             VGroup(COCHE(), VGroup(T("face au soleil (0°) :", fs), T("à plein", fs))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
             .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.30)
d2 = droite_(f"« incliné de {INCL01}° / il perd un peu »",
             VGroup(T(f"incliné de {INCL01}° :", fs), T("il perd un peu", fs))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.85)
d3 = droite_("✗ « à 90° / plus rien »",
             VGroup(CROIX(), VGroup(T("à 90° :", fs), T("plus rien", fs))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
             .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.60)
dessous("01", "le 2e cas recouvre le 1er", d1, d2)
dessous("01", "le 3e cas recouvre le 2e", d2, d3)
fil = VGroup(T("ce qui compte, c'est l'ANGLE entre", 26),
             T("la direction du soleil et celle du panneau", 26))
fil.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
b01 = bloc("conclusion (2 lignes) + cadre",
           VGroup(fil, SurroundingRectangle(fil, buff=0.16, stroke_width=3)), -2.00, 1.9)
p01 = bloc("« et cet angle se calcule… »",
           T("et cet angle se calcule avec un produit scalaire", 28), -3.10, 4.6)
dessous("01", "le cadre de conclusion recouvre « Saint-Pierre »", sp01, b01)
dessous("01", "la dernière ligne recouvre la conclusion", b01, p01)

print("\n── 02 : la formule, le cosinus isolé, l'exemple ──")
t02 = T("Du produit scalaire à l'angle", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 02", t02)
f1 = VX("u · v =", ("u", "v"), 32)
f2 = VX("‖u‖ × ‖v‖ × cos θ", ("u", "v"), 32)
form = VGroup(f1, f2).arrange(RIGHT, buff=0.18, aligned_edge=DOWN)
bf = bloc("la formule (2 morceaux)", form, 1.95, 1.9)
iso = COSF(30)
bi = bloc("cos θ = fraction + cadre",
          VGroup(iso, SurroundingRectangle(iso, buff=0.16, stroke_width=3)), 0.30, 1.9)
print(f"    ⚠️ hauteur de la fraction encadrée : {bi[3] - bi[2]:.2f} "
      f"(une ligne de texte en fait ~0,40)")
dessous("02", "le cosinus isolé recouvre la formule", bf, bi)
g02 = coin(round(angle(U02, V02)), r=1.05).move_to(P(-4.55, -2.10))
o02 = g02.sommet()
nu = VEC("u", 26, C_VECTEUR).move_to(o02 + g02.p1 * 0.62 + ecart(g02.p1, -1))
nv = VEC("v", 26, C_VECTEUR2).move_to(o02 + g02.p2 * 0.74 + ecart(g02.p2, +1))
leg = T("vus dans leur plan", 22).next_to(VGroup(g02, nu, nv), DOWN, buff=0.14)
_bis = math.radians(22.5)
val02 = DEG(45, 30).move_to(o02
                            + np.array([math.cos(_bis), math.sin(_bis), 0.0]) * 1.42)
gg = cadre("la figure 45° + ses noms + sa légende", g02, nu, nv, leg, val02)
dessous("02", "la figure recouvre le cosinus isolé", bi, gg)
etiquettes("02", ("u", nu), ("v", nv), ("45°", val02))
loin_des_fleches("02", [("u (fût)", g02.f1.get_start(), g02.f1.get_end()),
                        ("v (fût)", g02.f2.get_start(), g02.f2.get_end())],
                 [("u", nu), ("v", nv), ("45°", val02)])
lu = NOMME("u", U02, C_VECTEUR, 28)
d02 = droite_("u⃗ (1 ; 0 ; 0)", lu, 2.40)
contre_titre("02", t02, d02)
droite_("v⃗ (1 ; 1 ; 0)", NOMME("v", V02, C_VECTEUR2, 28), 1.70)
droite_("u⃗ · v⃗ = 1", VX(f"u · v = {ps(U02, V02)}", ("u", "v"), 28), 1.00)
_nv0 = VGroup(VX("‖v‖ =", ("v",), 28), RAC(norme2(V02), 28))
_nv0.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
lno = VGroup(VX(f"‖u‖ = {norme2(U02)}", ("u",), 28), _nv0)
lno.arrange(RIGHT, buff=0.34, aligned_edge=DOWN)
droite_("‖u⃗‖ = 1  ‖v⃗‖ = √2", lno, 0.20)
lcos = VGroup(T("cos θ =", 28), FRAC(T("1", 28), RAC(norme2(V02), 28), 28))
lcos.arrange(RIGHT, buff=0.16)
dc = droite_("cos θ = 1/√2 (fraction + radical)", lcos, -0.90)
print(f"    ⚠️ hauteur du bloc : {dc[3] - dc[2]:.2f}")
da = droite_("≈ 0,71", ENV(round(1 / math.sqrt(2), 2)), -1.70)
dessous("02", "« ≈ 0,71 » recouvre le cosinus", dc, da)

print("\n── 03 : la méthode, les trois signes, la raison ──")
t03 = T("Le signe décide avant le calcul", 44).to_edge(UP, buff=0.5)
cadre("titre de l'écran 03", t03)
rangs = []
for k, txt in enumerate(("le produit scalaire", "les deux normes", "la division"), start=1):
    rangs.append(VGroup(EcransEspace.pastille(E, k), T(txt, 24)).arrange(RIGHT, buff=0.18))
meth = VGroup(*rangs).arrange(RIGHT, buff=0.42)
m03 = plafonne("la méthode (3 pastilles sur une ligne)", meth, 10.6, P(-0.75, 2.00))
arc03 = T("… puis la touche arccos de la calculatrice", 26).next_to(meth, DOWN, buff=0.26)
a03 = cadre("« … puis la touche arccos »", arc03)
colonnes, figs = [], []
for deg_, signe, mot, coul in ((50, "> 0", "aigu", VERT_OK), (90, "= 0", "droit", C_REGARD),
                               (130, "< 0", "obtus", C_PIEGE)):
    g = coin(deg_, r=0.90, sw=6, r_arc=0.34, c_arc=coul)
    lab = VGroup(VX(f"u · v {signe}", ("u", "v"), 26), T(mot, 30)).arrange(DOWN, buff=0.10)
    colonnes.append(VGroup(g, lab).arrange(DOWN, buff=0.22))
trois = VGroup(*colonnes).arrange(RIGHT, buff=0.95)
t3 = plafonne("les trois cas (figures + libellés)", trois, 10.6, P(-0.75, -0.55))
dessous("03", "les trois cas recouvrent la ligne arccos", a03, t3)
fin03 = VGroup(VX("‖u‖ × ‖v‖ est toujours positif :", ("u", "v"), 26),
               VX("cos θ a le MÊME signe que u · v", ("u", "v"), 26))
fin03.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
b03 = bloc("la raison + cadre",
           VGroup(fin03, SurroundingRectangle(fin03, buff=0.14, stroke_width=3)), -2.95, 4.6)
dessous("03", "la raison recouvre les trois cas", t3, b03)

print("\n── 04 : la question-pause n° 1 (cartes larges, 6,3 à partir de 0,35) ──")
cA = T("aigu", 28)
cB = T("droit", 28)
cC = CH2("obtus, donc plus grand", "que 90°", fs=26)
cC.nb = [cC]
q04 = [VX("Le produit scalaire de u et v vaut −6,", ("u", "v"), 26),
       T("et aucun des deux vecteurs n'est nul.", 26),
       VX("L'angle entre u et v est :", ("u", "v"), 26)]
tete, q, cartes, pause, rebours = EcransEspace.q_tete(E, q04, [cA, cB, cC],
                                                      largeur=6.2, xl=0.35)
cadre("tête « Question ! » + rebours", tete, rebours)
qq = cadre("la question (3 lignes)", q, naturel=max(float(x.width) for x in q04))
xc0, xc1, yc0, yc1 = cadre("les trois cartes", cartes)
EcransEspace.gauche(E, pause, -2.95, xmax=0.15)   # remède de l'épisode 8
pc = cadre("« Mets pause » (déplacée en bas à gauche)", pause)
pol = [police(cc) for cc in cartes]
print(f"  polices obtenues : {pol}  (demandées 28 / 28 / 26)"
      f"{'  ⛔ RÉDUITES' if min(pol) < 25.5 else '  ✅'}")
if min(pol) < 25.5:
    ennuis.append("04 : cartes réduites")
def sur_margo(cle, quoi, b, scale=0.5):
    """⛔⛔ TI-MARGO EST UNE BOÎTE, PAS UNE HAUTEUR. Le contrôle de l'épisode 8 testait
    « bas < −2,15 », ce qui suppose que le bloc est déjà SOUS elle. Déplacée en bas à
    GAUCHE — le remède même de E8 —, la pause reste basse et ne touche plus rien : le
    seuil criait alors sur la correction qu'il avait servi à trouver. On teste donc le
    recouvrement des deux rectangles (x ∈ [5,54 ; 6,66], y ∈ [−3,55 ; −2,15] à 0,5)."""
    mx0, mx1, my0, my1 = (5.54, 6.66, -3.55, -2.15) if scale == 0.5 else (5.30, 6.70, -3.55, -1.95)
    touche = b[1] > mx0 and b[0] < mx1 and b[3] > my0 and b[2] < my1
    print(f"  {quoi} : x ∈ [{b[0]:.2f} ; {b[1]:.2f}] y ∈ [{b[2]:.2f} ; {b[3]:.2f}]"
          f"{'  ⛔ SUR TI-MARGO' if touche else '  ✅ hors de la boîte de Ti-Margo'}")
    if touche:
        ennuis.append(f"{cle} : {quoi} sur Ti-Margo")


sur_margo("04", "la pause", pc)
sur_margo("04", "les cartes", (xc0, xc1, yc0, yc1))
don = bloc("u⃗ · v⃗ = −6", VX(f"u · v = {NB(PS04)}", ("u", "v"), 44), 1.55, 0.15)
nul = bloc("« et ni u⃗ ni v⃗ n'est nul »", VX("et ni u ni v n'est nul", ("u", "v"), 26),
           0.75, 0.15)
dessous("04", "la précision recouvre la donnée", don, nul)

print("\n── 04b : les blocs de gauche (cartes : x ≥ %.2f, y ∈ [%.2f ; %.2f]) ──"
      % (xc0, yc0, yc1))
l1 = bloc("« cos θ a le signe de u⃗ · v⃗ »", VX("cos θ a le signe de u · v", ("u", "v"), 28),
          0.70, 0.15)
l2 = bloc("« on divise par ‖u⃗‖ × ‖v⃗‖… »",
          VX("on divise par ‖u‖ × ‖v‖, qui est positif", ("u", "v"), 24), 0.05, 0.15)
l3 = bloc("« cos θ < 0 »", T("cos θ < 0", 32), -0.70, 0.15)
l4g = VGroup(T("90° < θ ≤ 180°", 32), T("un angle obtus", 30))
l4g.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
l4 = bloc("l'intervalle + cadre",
          VGroup(l4g, SurroundingRectangle(l4g, buff=0.14, stroke_width=3)), -1.70, 0.15)
dessous("04b", "l2 recouvre l1", l1, l2)
dessous("04b", "l3 recouvre l2", l2, l3)
dessous("04b", "l'intervalle recouvre « cos θ < 0 »", l3, l4)
l5g = VGroup(COCHE(), T("on n'a pas eu besoin de connaître les normes", 26))
l5g.arrange(RIGHT, buff=0.20)
l5 = bloc("« pas besoin des normes »", l5g, -3.05, 4.6)
dessous("04b", "la dernière ligne recouvre l'intervalle", l4, l5)

print("\n── 05 : le calcul complet, et la figure 60° ──")
t05 = T("Jusqu'au bout, sans calculatrice", 44).to_edge(UP, buff=0.5)
cadre("titre de l'écran 05", t05)
e1 = droite_("u⃗ (1 ; 1 ; 0)", NOMME("u", U05, C_VECTEUR, 28), 2.40)
contre_titre("05", t05, e1)
droite_("v⃗ (0 ; 1 ; 1)", NOMME("v", V05, C_VECTEUR2, 28), 1.70)
droite_("« 0 + 1 + 0 = 1 »", T(f"0 + 1 + 0 = {ps(U05, V05)}", 28), 1.00)
lno5 = VGroup(VX("‖u‖ = ‖v‖ =", ("u", "v"), 28), RAC(norme2(U05), 28))
lno5.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
droite_("‖u⃗‖ = ‖v⃗‖ = √2", lno5, 0.25)
lpr = VGroup(VX("‖u‖ × ‖v‖ =", ("u", "v"), 28), T("2", 28))
lpr.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
droite_("‖u⃗‖ × ‖v⃗‖ = 2", lpr, -0.45)
lc5 = VGroup(T("cos θ =", 28), FRAC(T("1", 28), T("2", 28), 28)).arrange(RIGHT, buff=0.16)
dc5 = droite_("cos θ = 1/2 (fraction)", lc5, -1.45)
print(f"    ⚠️ hauteur du bloc : {dc5[3] - dc5[2]:.2f}")
dd5 = droite_("« = 0,5 »", T(f"= {NB(0.5)}", 26), -2.25)
dessous("05", "« = 0,5 » recouvre le cosinus", dc5, dd5)
g05 = coin(round(angle(U05, V05)), r=1.35).move_to(P(-4.35, 0.75))
o05 = g05.sommet()
nu5 = VEC("u", 28, C_VECTEUR).move_to(o05 + g05.p1 * 0.66 + ecart(g05.p1, -1, 0.46))
nv5 = VEC("v", 28, C_VECTEUR2).move_to(o05 + g05.p2 * 0.76 + ecart(g05.p2, +1, 0.46))
leg5 = T("vus dans leur plan", 22).next_to(VGroup(g05, nu5, nv5), DOWN, buff=0.16)
gf5 = cadre("la figure 60° + ses noms + sa légende", g05, nu5, nv5, leg5)
etiquettes("05", ("u", nu5), ("v", nv5))
loin_des_fleches("05", [("u (fût)", g05.f1.get_start(), g05.f1.get_end()),
                        ("v (fût)", g05.f2.get_start(), g05.f2.get_end())],
                 [("u", nu5), ("v", nv5)])
fin5 = VGroup(DEG(60, 34), T("sans calculatrice", 28)).arrange(RIGHT, buff=0.22,
                                                               aligned_edge=DOWN)
b05 = bloc("« 60° sans calculatrice » + cadre",
           VGroup(fin5, SurroundingRectangle(fin5, buff=0.14, stroke_width=3)), -2.30, 1.9)
dessous("05", "la conclusion recouvre la figure", gf5, b05)

print("\n── 06 : les trois pièges ──")
bang = VGroup(Triangle(stroke_width=4).scale(0.33), Text("!", font_size=30, weight=BOLD))
t06 = VGroup(bang, T("Trois pièges", 42)).arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
cadre("titre de l'écran 06", t06)
fs6 = 27
p1 = droite_("✗ « ‖u⃗‖ + ‖v⃗‖ / jamais la SOMME »",
             VGroup(CROIX(), VGroup(VX("‖u‖ + ‖v‖", ("u", "v"), fs6), T("jamais la SOMME", fs6))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
             .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.35)
contre_titre("06", t06[1], p1)
p2 = droite_("✓ « ‖u⃗‖ × ‖v⃗‖ / le PRODUIT »",
             VGroup(COCHE(), VGroup(VX("‖u‖ × ‖v‖", ("u", "v"), fs6), T("le PRODUIT", fs6))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
             .arrange(RIGHT, buff=0.22, aligned_edge=UP), 1.20)
dessous("06", "le produit recouvre la somme", p1, p2)
p3 = droite_("✓ « |cos θ| ≤ 1, toujours »",
             VGroup(COCHE(), T("|cos θ| ≤ 1, toujours", fs6)).arrange(RIGHT, buff=0.22), 0.20)
dessous("06", "p3 recouvre p2", p2, p3)
p4 = droite_(f"✗ « {NB(COS07)} : une erreur de calcul »",
             VGroup(CROIX(), VGroup(T(f"{NB(COS07)} :", fs6), T("une erreur de calcul", fs6))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
             .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.80)
dessous("06", "p4 recouvre p3", p3, p4)
g06 = coin(60, r=1.15, r_arc=0.40, oppose=True).move_to(P(-4.25, 1.25))
o06 = g06.sommet()
nv6 = VEC("v", 26, C_VECTEUR2).move_to(o06 + g06.p2 * 0.78 + ecart(g06.p2, +1))
_vv = VEC("v", 26, C_VECTEUR2)
_mo = T("−", 26).next_to(_vv.texte, LEFT, buff=0.06)
_mo.set_y(float(_vv.texte.get_center()[1]))
nw6 = VGroup(_mo, _vv)
nw6.move_to(o06 + g06.p3 * 0.78 + ecart(g06.p3, -1, 0.52))
gf6 = cadre("la figure du supplémentaire + ses noms", g06, nv6, nw6)
etiquettes("06", ("v", nv6), ("−v", nw6))
loin_des_fleches("06", [("u (fût)", g06.f1.get_start(), g06.f1.get_end()),
                        ("v (fût)", g06.f2.get_start(), g06.f2.get_end()),
                        ("−v (fût)", g06.f3.get_start(), g06.f3.get_end())],
                 [("v", nv6), ("−v", nw6)])
f06 = VGroup(T("l'angle de deux VECTEURS n'est pas", 26), T("l'angle de deux DROITES", 26))
f06.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
b06 = bloc("« vecteurs ≠ droites » + cadre",
           VGroup(f06, SurroundingRectangle(f06, buff=0.14, stroke_width=3)), -1.95, 1.9)
dessous("06", "le bloc recouvre la figure", gf6, b06)
d06 = VGroup(COCHE(), VGroup(T("pour deux droites : |cos θ|,", 26),
                             T("donc un angle entre 0° et 90°", 26))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
d06.arrange(RIGHT, buff=0.20, aligned_edge=UP)
bd6 = bloc("« pour deux droites : |cos θ| »", d06, -3.05, 4.6)
dessous("06", "la dernière ligne recouvre le bloc", b06, bd6)

print("\n── 07 : la question-pause n° 2 ──")
cA7 = T("l'angle est très petit", 26)
cB7 = EcransEspace.choix3(E, "il y a une erreur,", "un cosinus reste",
                          "entre −1 et 1", fs=26)
cB7.nb = [cB7]
cC7 = CH2("les deux vecteurs", "sont colinéaires", fs=26)
q07 = [T("On calcule le cosinus de l'angle entre", 26),
       T(f"deux vecteurs et on trouve {NB(COS07)}.", 26), T("Que peut-on dire ?", 26)]
tete7, q7, cartes7, pause7, rebours7 = EcransEspace.q_tete(E, q07, [cA7, cB7, cC7],
                                                           largeur=6.2, xl=0.35)
cadre("tête « Question ! » + rebours", tete7, rebours7)
cadre("la question (3 lignes)", q7, naturel=max(float(x.width) for x in q07))
x70, x71, y70, y71 = cadre("les trois cartes", cartes7)
EcransEspace.gauche(E, pause7, -2.95, xmax=0.15)
pc7 = cadre("« Mets pause » (déplacée en bas à gauche)", pause7)
pol7 = [police(cc) for cc in cartes7]
print(f"  polices obtenues : {pol7}  (demandées 26 / 26 / 26)"
      f"{'  ⛔ RÉDUITES' if min(pol7) < 25.5 else '  ✅'}")
if min(pol7) < 25.5:
    ennuis.append("07 : cartes réduites")
sur_margo("07", "la pause", pc7)
don7 = bloc(f"cos θ = {NB(COS07)}", T(f"cos θ = {NB(COS07)}", 44), 1.55, 0.15)

print("\n── 07b : les blocs de gauche ──")
r1 = T("|cos θ| ≤ 1", 36)
b71 = bloc("« |cos θ| ≤ 1 » + cadre",
           VGroup(r1, SurroundingRectangle(r1, buff=0.14, stroke_width=3)), 0.60, 0.15)
dessous("07b", "le rappel recouvre la donnée", don7, b71)
e2 = VGroup(CROIX(0.12), VGroup(VX("divisé par ‖u‖ + ‖v‖", ("u", "v"), 27),
                                T("au lieu du produit", 27))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
e2.arrange(RIGHT, buff=0.18, aligned_edge=UP)
b72 = bloc("✗ « divisé par la somme »", e2, -0.45, 0.15)
dessous("07b", "l'erreur 1 recouvre le rappel", b71, b72)
e3 = VGroup(CROIX(0.12), T("une racine oubliée dans une norme", 25)).arrange(RIGHT, buff=0.18)
b73 = bloc("✗ « une racine oubliée »", e3, -1.45, 0.15)
dessous("07b", "l'erreur 2 recouvre l'erreur 1", b72, b73)
e4 = VGroup(T("cos θ = 1 ou cos θ = −1 :", 26), T("là, oui, les vecteurs sont colinéaires", 26))
e4.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
b74 = bloc("« cos = ±1 ⟹ colinéaires » + cadre",
           VGroup(e4, SurroundingRectangle(e4, buff=0.14, stroke_width=3)), -2.55, 4.6)
dessous("07b", "le cas ±1 recouvre l'erreur 2", b73, b74)
b75 = bloc(f"« mais pas {NB(COS07)} »",
           T(f"mais pas {NB(COS07)} — reprends le calcul", 26), -3.30, 4.6)
dessous("07b", "la dernière ligne recouvre le cas ±1", b74, b75)

print("\n── 08 : la copie, QUATRE lignes ──")
t08 = T("Quatre lignes, dans cet ordre", 42).to_edge(UP, buff=0.5)
cadre("titre de l'écran 08", t08)
copie = RoundedRectangle(width=10.2, height=3.0, corner_radius=0.18,
                         stroke_width=3).move_to(P(-0.6, -0.40))
ccad = cadre("la copie", copie)
print(f"  écart titre → copie : {float(t08.get_bottom()[1]) - ccad[3]:.2f}"
      f"{'  ⛔ SE TOUCHENT' if float(t08.get_bottom()[1]) < ccad[3] else '  ✅'}")
if float(t08.get_bottom()[1]) < ccad[3]:
    ennuis.append("08 : la copie touche le titre")
rangs8 = []
for k, (txt, dn) in enumerate((("u · v = … (le calcul écrit)", ("u", "v")),
                               ("‖u‖ = …", ("u",)), ("‖v‖ = …", ("v",)),
                               ("cos θ = … (exact), puis θ ≈ …° ou … rad", None)), start=1):
    corps = VX(txt, dn, 26) if dn else T(txt, 26)
    rangs8.append(VGroup(EcransEspace.pastille(E, k), corps).arrange(RIGHT, buff=0.30))
l8 = VGroup(*rangs8).arrange(DOWN, aligned_edge=LEFT, buff=0.20)
nat8 = float(l8.width)
if l8.width > 8.6:
    l8.scale_to_fit_width(8.6)
l8.move_to(copie.get_center())
c8 = cadre("les 4 lignes de la copie", l8)
print(f"  {'':46s} largeur naturelle {nat8:5.2f}   place offerte  8,60"
      f"{'  ⛔ RÉDUITES de %.1f %%' % (100 * (1 - 8.6 / nat8)) if nat8 > 8.61 else '  ✅'}")
if nat8 > 8.61:
    ennuis.append("08 : le modèle de rédaction est réduit")
print(f"  hauteur des 4 lignes : {c8[3] - c8[2]:.2f} pour une copie de 3,00"
      f"{'  ⛔ DÉBORDE' if c8[3] - c8[2] > 2.7 else '  ✅'}")
if c8[3] - c8[2] > 2.7:
    ennuis.append("08 : les 4 lignes débordent de la copie")
rap = VGroup(T("un angle sans unité, c'est le point perdu :", 26),
             T("degrés ou radians, toujours", 26)).arrange(DOWN, buff=0.10)
rc = SurroundingRectangle(rap, buff=0.14, stroke_width=3)
VGroup(rap, rc).next_to(copie, DOWN, buff=0.24)
r8 = cadre("le rappel sous la copie + cadre", rap, rc)

print("\n── 09 / 09b : le cube, le défi, la correction ──")
r9 = Repere3D(o=np.array([-5.90, 0.20, 0.0]), u=1.4, portee=2)
cube = r9.cube(cote=1, rouges=("B", "G"), sw=4, fs=24)
noms_cube = {}
for sub in cube.submobjects:
    if isinstance(sub, Text):
        noms_cube[sub.text] = sub
for lettre, off in (("D", np.array([-0.30, 0.30, 0.0])), ("F", np.array([0.30, -0.30, 0.0]))):
    noms_cube[lettre].move_to(cube.sommet(lettre) + off)
base = VGroup(*[r9.vecteur(S["A"], S[s], None, sw=5) for s in ("B", "D", "E")])
cc = cadre("le cube + les 3 vecteurs de base", cube, base)
fAG = r9.vecteur(S["A"], S["G"], None, couleur=C_REGARD, sw=7)
fAB = r9.vecteur(S["A"], S["B"], None, couleur=C_VECTEUR, sw=7)
cadre("le cube + A⃗G + A⃗B", cube, fAG, fAB)
segs = segments_du_cube(r9, [("A⃗G", fAG.fleche.get_start(), fAG.fleche.get_end()),
                             ("A⃗B", fAB.fleche.get_start(), fAB.fleche.get_end())])
print(f"  ⭐ {len(segs)} segments passés au contrôle "
      f"({len(segs) - 2} arêtes + les 2 flèches)")
etiquettes("09", *[(k, v) for k, v in sorted(noms_cube.items())])
loin_des_fleches("09b", segs, [(k, v) for k, v in sorted(noms_cube.items())])
cons = VGroup(T("dans le cube d'arête 1 :", 26),
              VX("calcule l'angle entre A G et A B,", ("A G", "A B"), 30),
              T("arrondi au degré", 30)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
bc = bloc("la consigne (3 lignes)", cons, -1.75, 4.6)
dessous("09", "la consigne recouvre le cube", cc, bc)
pause9 = bloc("« Mets pause, et cherche ! »", T("Mets pause, et cherche !", 30), -3.10, 4.6)
reb9 = CompteARebours(5, r=0.34, fs=32).next_to(pause9 and T("x", 1), RIGHT)
dessous("09", "la pause recouvre la consigne", bc, pause9)
# ── 09b, la colonne de droite ──
q1 = droite_("A⃗G (1 ; 1 ; 1)", NOMME("A G", AG, C_REGARD, 28), 2.40)
q2 = droite_("A⃗B (1 ; 0 ; 0)", NOMME("A B", AB, C_VECTEUR, 28), 1.70)
suite9 = VGroup(T("1 × 1", 24), T("+ 1 × 0", 24), T("+ 1 × 0", 24),
                T(f"= {ps(AG, AB)}", 24)).arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
calc = VGroup(VX("A G · A B =", ("A G", "A B"), 26), suite9)
calc.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
bcalc = droite_("le produit scalaire, terme à terme", calc, 0.95)
_lig1 = VGroup(VX("‖A G‖ =", ("A G",), 26), RAC(norme2(AG), 26))
_lig1.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
lno9 = VGroup(_lig1, VX("; ‖A B‖ = 1", ("A B",), 26))
lno9.arrange(RIGHT, buff=0.20, aligned_edge=DOWN)
bno9 = droite_("‖A⃗G‖ = √3 ; ‖A⃗B‖ = 1", lno9, 0.15)
# ⛔⛔ LA COLONNE DE DROITE DE 09b N'ÉTAIT COMPARÉE À RIEN — six blocs mesurés un par
# un, et pas une seule paire. C'est ce trou qui a laissé passer le bloc des deux
# normes PAR-DESSUS la ligne de calcul : en passant les deux normes de UNE à DEUX
# lignes (correction du tour précédent), le bloc a grandi de 0,68 autour de son
# centre, donc il est MONTÉ de 0,34 — et personne ne recomptait la colonne.
# ⭐ La leçon de E6 à sa énième forme : changer la hauteur d'un bloc oblige à
# recompter TOUS ceux qui l'entourent, pas seulement celui qu'on vient d'écrire.
dessous("09b", "A⃗B recouvre A⃗G", q1, q2)
dessous("09b", "le calcul recouvre A⃗B", q2, bcalc)
dessous("09b", "les deux normes recouvrent le calcul", bcalc, bno9)
lc9 = VGroup(T("cos θ =", 28), FRAC(T("1", 28), RAC(norme2(AG), 28), 28))
lc9.arrange(RIGHT, buff=0.16)
dc9 = droite_("cos θ = 1/√3 (fraction + radical)", lc9, -0.95)
print(f"    ⚠️ hauteur du bloc : {dc9[3] - dc9[2]:.2f}")
dessous("09b", "le cosinus recouvre les deux normes", bno9, dc9)
da9 = droite_("≈ 0,577", ENV(round(1 / math.sqrt(3), 3)), -1.80)
dessous("09b", "« ≈ 0,577 » recouvre le cosinus", dc9, da9)
ang = VGroup(T("θ ≈", 30), DEG(54.7, 30), T("→", 30), DEG(55, 34))
ang.arrange(RIGHT, buff=0.18, aligned_edge=DOWN)
ba = bloc("« θ ≈ 54,7° → 55° » + cadre",
          VGroup(ang, SurroundingRectangle(ang, buff=0.14, stroke_width=3)), -1.10, 1.9)
dessous("09b", "l'angle recouvre le cube", cc, ba)
p45 = VGroup(CROIX(), VGroup(DEG(45, 30), T("sans calculer", 28))
             .arrange(RIGHT, buff=0.16, aligned_edge=DOWN)).arrange(RIGHT, buff=0.20)
bp = bloc("✗ « 45° sans calculer »", p45, -2.15, 1.9)
dessous("09b", "« pas 45° » recouvre l'angle", ba, bp)
dg = VGroup(COCHE(), VGroup(T("la grande diagonale et une arête :", 26),
                            VGroup(DEG(55, 26), T("environ", 26)).arrange(RIGHT, buff=0.14))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
dg.arrange(RIGHT, buff=0.20, aligned_edge=UP)
bg = bloc("✓ « la grande diagonale : 55° environ »", dg, -3.10, 4.6)
dessous("09b", "la conclusion recouvre « pas 45° »", bp, bg)

print("\n── 10 : la finale ──")
t10 = T("Ce que tu as appris", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 10", t10)
blocs = []
for g, d, dn in (("le cosinus :", "u · v divisé par ‖u‖ × ‖v‖", ("u", "v")),
                 ("le signe :", "aigu, droit ou obtus — tout de suite", None),
                 ("un cosinus :", "toujours entre −1 et 1", None),
                 ("deux droites :", "on prend la valeur absolue", None)):
    corps = VX(d, dn, 26) if dn else T(d, 26)
    blocs.append(VGroup(T(g, 26), corps).arrange(RIGHT, buff=0.22, aligned_edge=DOWN))
lignes = VGroup(*[VGroup(COCHE(0.22), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                  for b in blocs])
lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.46)
f10 = plafonne("les 4 rangées de la finale", lignes, 10.6, P(-0.75, 0.10))
print(f"  droite du bloc : {f10[1]:5.2f}  (Ti-Margo à 0,65 commence à 5,30)"
      f"{'  ⛔ SOUS TI-MARGO' if f10[1] > 5.30 else '  ✅'}")
if f10[1] > 5.30:
    ennuis.append("10 : la finale passe sous Ti-Margo")

print("\n" + "=" * 78)
if ennuis:
    print(f"⛔ {len(ennuis)} ENNUI(S) :")
    for x in ennuis:
        print("   ·", x)
    sys.exit(1)
print("✅ aucune cote hors marge, aucun bloc rétréci, aucune réduction par un plafond,")
print("   aucun chevauchement, aucune étiquette traversée.")
