# manim/poste2/mesure-ps-espace-defi.py
# LES COTES DE L'ÉPISODE 12 (« ps_espace_defi »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-angle.py` (épisode 10), la version la plus complète
# de l'outil, et il porte donc les contrôles des épisodes 6 à 10 :
#   · blocs RÉTRÉCIS par `col()` / `gauche()` (E6) ;
#   · réductions PAR UN PLAFOND, qui ne se signalaient jamais avant (`plafonne()`, E7) ;
#   · colonne de droite comparée au TITRE (`contre_titre()`, E7) ;
#   · étiquettes de figure DEUX À DEUX (`etiquettes()`, E8) ;
#   · pointe d'une flèche testée DANS le polygone de son plan (E8, `dedans()` — ici
#     importée du script de l'épisode, parce que deux assertions d'import s'en servent
#     aussi : une figure fausse doit casser à l'import, pas à la planche) ;
#   · `loin_des_fleches()` — une étiquette comparée au FÛT de TOUT segment tracé (E9) ;
#   · la chaîne complète de `dessous()` sur toute une colonne, et tout bloc qui a un
#     voisin mesuré SEUL en plus de son groupe (E10 : c'est ce trou-là qui avait laissé
#     deux blocs se chevaucher pendant que la mesure disait ✅).
#
# ⚠️ CE QUE CET ÉPISODE AJOUTE :
#   · il a DEUX figures PLANES (le plan + sa normale en 02, le triangle équilatéral en
#     07b) et le cube sur QUATRE écrans. Les figures planes sont mesurées comme le reste,
#     mais leur JUSTESSE (équilatéralité, orthogonalité, pointes dans le plan) est
#     vérifiée par des assertions du module de l'épisode : un dessin peut être dans la
#     marge, porter les bons nombres et mentir sur sa forme (le 3-4-5 faux de E9).
#   · il écrit CINQ rangées sur deux écrans (03 et 06) là où E6 en écrivait quatre : les
#     pastilles ne rétrécissent pas avec la police (rayon fixe), donc c'est le seul écran
#     de la série où le plafond de 10,60 peut mordre sans qu'on s'y attende.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit
# le bloc à la largeur de sa plus longue ligne, et son second garde-fou (« bas sous
# −1,95 ET droite au-delà de 5,3 → réduire ») se déclenche au CENTIÈME près.
# Le critère : aucune ligne « RÉTRÉCI », aucune « HORS MARGE », aucune « RÉDUIT PAR LE
# PLAFOND », aucun chevauchement, aucune étiquette « SE TOUCHENT » ni « TRAVERSÉE ».
#
#   python -X utf8 manim/poste2/mesure-ps-espace-defi.py

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_FANTOME, C_NORMALE, C_PIEGE, C_PLAN, C_POINT,  # noqa: E402
                      C_REGARD, C_VECTEUR, C_VECTEUR2, platitude)
from charte import VERT_OK  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace  # noqa: E402
from ps_espace_defi import (ANGLE_APPARENT_B, ANGLE_PAGE_NV, BD, BE,  # noqa: E402
                            COTES_PROJETES, D_PLAN, DE, K, NORMALE,
                            ECARTE_CUBE, PLATITUDE_BDE, PsEspaceDefiBase, S,
                            U_CUBE, XL02, angle, dedans, norme2, plan_normale,
                            ps, triangle_plan)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
E = EcransEspace.__new__(PsEspaceDefiBase)
T = lambda s, fs: EcransEspace.t(E, s, fs)                                   # noqa: E731
RAC = lambda r, fs=28, **k: EcransEspace.racine(E, r, fs, WHITE, **k)        # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)                # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)   # noqa: E731
EQZ = lambda g, fs=28: EcransEspace.eq_zero(E, g, fs)                        # noqa: E731
EQP = lambda a, b, c, d, fs=28: EcransEspace.eq_plan(E, a, b, c, d, fs)      # noqa: E731
SYS = lambda l, fs=28: EcransEspace.systeme(E, l, fs)                        # noqa: E731
PAST = lambda k: EcransEspace.pastille(E, k)                                 # noqa: E731
NOMME = lambda n, t3, c, fs: PsEspaceDefiBase.nomme(E, n, t3, c, fs)         # noqa: E731
PTN = lambda n, t3, c, fs: PsEspaceDefiBase.point_nomme(E, n, t3, c, fs)     # noqa: E731
TIERS = lambda fs=28: PsEspaceDefiBase.tiers(E, fs)                          # noqa: E731
RANG = lambda l, y, **k: PsEspaceDefiBase.rangees(E, l, y, **k)              # noqa: E731
CROIX = lambda r=0.13: EcransEspace.croix(E, r=r)                            # noqa: E731
COCHE = lambda t=0.14: EcransEspace.coche(E, "#00FF7F", t)                   # noqa: E731
CH2 = lambda a, b, fs=28, **k: EcransEspace.choix2(E, a, b, fs, **k)         # noqa: E731
NB = lambda v: EcransEspace.nombre(E, v)                                     # noqa: E731
ennuis = []


def police(carte):
    """LA PLUS PETITE police réellement obtenue par le corps d'une carte de choix.
    ⛔ « la plus petite » et non « la première » : `racine()` dessine son signe √ à 1,15
    fois la police demandée, et la première police rencontrée serait celle du signe."""
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
    ⭐⭐ IL SIGNALE SA RÉDUCTION — correction de l'outil de E6, où le plafond était passé
    en `naturel=min(nat, plafond)` et où une réduction PAR LE PLAFOND ne sortait jamais."""
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


def rangees_(nom, lignes, y, buff=0.34, plafond=10.6):
    """Les rangées pleine largeur de l'épisode (écrans 01, 03, 06), AVEC leur plafond.
    ⛔ C'est le seul endroit où une réduction silencieuse peut passer : `rangees()`
    appelle `scale_to_fit_width` sans rien dire."""
    g = VGroup(*[VGroup(PAST(k), c).arrange(RIGHT, buff=0.30, aligned_edge=UP)
                 for k, c in enumerate(lignes, start=1)])
    g.arrange(DOWN, aligned_edge=LEFT, buff=buff)
    return plafonne(nom, g, plafond, P(-0.75, y))


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


def a_cote(cle, quoi, gauche_b, droite_b, mini=0.15):
    """Deux blocs CÔTE À CÔTE : le second commence-t-il après la fin du premier ?
    ⭐ Il fallait ce pendant horizontal de `dessous()` : sur les écrans 04, 07 et 09, la
    figure est à GAUCHE et les cartes larges commencent à x = 0,35 ou 0,6 — les comparer
    en hauteur ne dit rien, ils sont à la même hauteur exprès."""
    d = droite_b[0] - gauche_b[1]
    note = "  ⛔ SE TOUCHENT" if d < mini else "  ✅"
    if d < mini:
        ennuis.append(f"{cle} : {quoi}")
    print(f"  écart horizontal ({quoi}) : {d:.2f}{note}")


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

    `etiquettes()` compare des boîtes ENTRE ELLES : il ne voit jamais une boîte contre un
    SEGMENT. ⚠️ On échantillonne le segment, pas sa boîte — la boîte d'une flèche en
    diagonale est un grand rectangle presque vide.
    ⛔⛔ ET ON LUI PASSE TOUT CE QUI EST TRACÉ, pas seulement les flèches : sur E9, la
    première version ne connaissait que les deux diagonales, et les noms écartés pour les
    fuir se sont posés pile sur deux arêtes du cube."""
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
    """Les DOUZE arêtes du cube, plus ce qu'on y ajoute. ⭐ Les arêtes sont RECALCULÉES
    depuis les sommets (les paires qui diffèrent d'UNE coordonnée) et non recopiées :
    c'est ce comptage-là qui a montré, le 23/11, que `cube()` n'en traçait que onze."""
    segs = []
    for s1 in S:
        for s2 in S:
            if s1 < s2 and sum(1 for k in range(3) if S[s1][k] != S[s2][k]) == 1:
                segs.append((f"[{s1}{s2}]", r.pt(*S[s1]), r.pt(*S[s2])))
    return segs + list(extra)


def noms_du_cube(cube):
    out = {}
    for sub in cube.submobjects:
        if isinstance(sub, Text):
            out[sub.text] = sub
    return out


def sur_margo(cle, quoi, b, scale=0.5):
    """⛔⛔ TI-MARGO EST UNE BOÎTE, PAS UNE HAUTEUR (correction de l'outil sur E10) : le
    contrôle de E8 testait « bas < −2,15 », ce qui suppose que le bloc est déjà SOUS
    elle. Déplacée en bas à GAUCHE — le remède même de E8 —, la pause reste basse et ne
    touche plus rien, et le seuil criait alors sur la correction qu'il avait servi à
    trouver. On teste donc le recouvrement des deux rectangles."""
    mx0, mx1, my0, my1 = ((5.54, 6.66, -3.55, -2.15) if scale == 0.5
                          else (5.30, 6.70, -3.55, -1.95))
    touche = b[1] > mx0 and b[0] < mx1 and b[3] > my0 and b[2] < my1
    print(f"  {quoi} : x ∈ [{b[0]:.2f} ; {b[1]:.2f}] y ∈ [{b[2]:.2f} ; {b[3]:.2f}]"
          f"{'  ⛔ SUR TI-MARGO' if touche else '  ✅ hors de la boîte de Ti-Margo'}")
    if touche:
        ennuis.append(f"{cle} : {quoi} sur Ti-Margo")


# ═══════════════════════════════════════════════════════════════════════════
print("── les figures disent-elles ce qu'elles annoncent ? ──")
print(f"  platitude de la normale (1 ; 1 ; 1) : {PLATITUDE_BDE:.2f}°"
      f"{'  ⛔ UNE LAME (< 12°) → aucun morceau de plan en cavalière' if PLATITUDE_BDE < 12 else ''}")
print(f"  les 3 côtés du triangle (BDE), projetés : "
      f"{COTES_PROJETES[0]:.3f} · {COTES_PROJETES[1]:.3f} · {COTES_PROJETES[2]:.3f}"
      f"   (ils valent tous √2 = {math.sqrt(2):.3f})")
print(f"  l'angle en B, projeté : {ANGLE_APPARENT_B:.1f}° pour {angle(BD, BE):.0f}° réels"
      f"  ⛔ d'où la figure PLANE de l'écran 07b")
_tr = triangle_plan()
_l = (float(np.linalg.norm(_tr.D - _tr.B)), float(np.linalg.norm(_tr.E - _tr.B)),
      float(np.linalg.norm(_tr.E - _tr.D)))
_u1, _u2 = _tr.D - _tr.B, _tr.E - _tr.B
_ad = math.degrees(math.acos(float(_u1 @ _u2)
                             / (np.linalg.norm(_u1) * np.linalg.norm(_u2))))
print(f"  triangle_plan : côtés {_l[0]:.3f} / {_l[1]:.3f} / {_l[2]:.3f}, angle en B "
      f"{_ad:.2f}°{'  ✅ équilatéral' if max(_l) - min(_l) < 1e-9 and abs(_ad - 60) < 1e-6 else '  ⛔ FAUX'}")
if max(_l) - min(_l) > 1e-9 or abs(_ad - 60) > 1e-6:
    ennuis.append("07b : triangle_plan n'est pas équilatéral")
# ⛔⛔ LE CONTRÔLE NEUF DE E8 : la pointe de chaque flèche du plan est-elle DANS le
# morceau de plan ? Une flèche qui en sort contredit la légende qui est juste dessous.
_pn = plan_normale()
_poly = [k[:2] for k in _pn.coins]
for _nom, _f, _attendu in (("u", _pn.fu, True), ("v", _pn.fv, True),
                           ("n", _pn.normale, False)):
    _ok = dedans(_f.get_end(), _poly) == _attendu
    print(f"    pointe de « {_nom} » {'DANS' if _attendu else 'HORS DE'} le plan : "
          f"{'✅' if _ok else '⛔ FAUX'}")
    if not _ok:
        ennuis.append(f"02 : la pointe de « {_nom} » est du mauvais côté du plan")
print(f"  ⚠️ angle de PAGE entre n⃗ et v⃗ : {ANGLE_PAGE_NV:.1f}° — c'est pourquoi l'écran 02")
print("     ne pose qu'UN carré d'angle droit (sur u⃗, horizontal, vraiment à 90°).")

print("\n── 00 : la page de garde ──")
t00 = T("Exercice type bac", 46).to_edge(UP, buff=0.5)
cadre("titre", t00)
lg = VGroup()
for txt in ("une normale", "une équation", "une distance"):
    lg.add(VGroup(Dot(radius=0.08), T(txt, 36)).arrange(RIGHT, buff=0.26))
lg.arrange(DOWN, aligned_edge=LEFT, buff=0.40).move_to(P(-0.9, 0.95))
cadre("les trois promesses", lg)
ech = cadre("echelle() alignée en bas",
            EcransEspace.echelle(E).align_to(P(0, -3.45), DOWN))
fin00 = cadre("la ligne finale",
              T("toujours le même fil, en quatre questions", 30).move_to(P(-0.9, -1.55)))
print(f"  écart ligne finale → échelle : {fin00[2] - ech[3]:.2f}"
      f"{'  ⛔ SE TOUCHENT' if fin00[2] < ech[3] else '  ✅'}")
if fin00[2] < ech[3]:
    ennuis.append("00 : la ligne finale touche l'échelle des ceintures")

print("\n── 01 : le chemin, trois étapes sur un fil ──")
t01 = T("Toujours le même chemin", 44).to_edge(UP, buff=0.5)
cadre("titre de l'écran 01", t01)
g01 = rangees_("les 3 étapes du chemin",
               [T("on démontre qu'un vecteur est normal à un plan", 28),
                T("on en déduit l'équation de ce plan", 28),
                T("on calcule une distance, un projeté, ou un angle", 28)], 1.05)
contre_titre("01", t01, g01)
f01 = VGroup(T("si tu reconnais le chemin,", 30),
             T("tu ne cherches plus quoi faire : tu avances", 30)).arrange(DOWN, buff=0.12)
_c01 = SurroundingRectangle(f01, buff=0.18, stroke_width=3)
VGroup(f01, _c01).move_to(P(-0.75, -2.35))
b01 = cadre("la conclusion + cadre", f01, _c01)
dessous("01", "la conclusion recouvre les 3 étapes", g01, b01)
sur_margo("01", "la conclusion", b01)

print("\n── 02 : le fil en trois étapes ──")
t02 = T("Le fil, en trois étapes", 44).to_edge(UP, buff=0.5)
cadre("titre de l'écran 02", t02)
fig02 = plan_normale().move_to(P(-4.30, 1.30))
leg02 = T("le plan vu à plat", 22).next_to(fig02, DOWN, buff=0.16)
gf02 = cadre("le plan à plat + normale + légende", fig02, leg02)
fs = 26
e1 = VGroup(PAST(1), VGroup(VX("n · u = 0 et n · v = 0", ("n", "u", "v"), fs),
                            VX("⟹ n est normal au plan", ("n",), fs))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.10))
e1.arrange(RIGHT, buff=0.24, aligned_edge=UP)
d1 = droite_("① les deux produits scalaires nuls", e1, 2.25, XL02)
contre_titre("02", t02, d1)
_eq2 = VGroup(EQZ("a x + b y + c z + d", fs), T("(a ; b ; c) est la normale", fs))
_eq2.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
e2 = VGroup(PAST(2), _eq2).arrange(RIGHT, buff=0.24, aligned_edge=UP)
d2 = droite_("② l'équation et sa normale", e2, 0.85, XL02)
dessous("02", "② recouvre ①", d1, d2)
d3 = droite_("« un point du plan donne d »", T("un point du plan donne d", 24),
             -0.05, XL02)
dessous("02", "la ligne du point recouvre ②", d2, d3)
te3 = VGroup(PAST(3), T("avec la normale, on atteint tout le reste :", 28))
te3.arrange(RIGHT, buff=0.24).move_to(P(-0.75, -1.45))
b3 = cadre("③ la tête, pleine largeur", te3)
dessous("02", "③ recouvre la ligne du point", d3, b3)
dessous("02", "③ recouvre la figure de gauche", gf02, b3)
cols = []
for g_, d_ in (("le projeté", "on suit la normale"), ("la distance", "une norme"),
               ("l'angle", "on divise par les normes")):
    cols.append(VGroup(T(g_, 26), T(d_, 22)).arrange(DOWN, buff=0.08))
trois = VGroup(*cols).arrange(RIGHT, buff=0.80)
b32 = plafonne("les 3 débouchés", trois, 10.6, P(-0.75, -2.60))
dessous("02", "les 3 débouchés recouvrent ③", b3, b32)
sur_margo("02", "les 3 débouchés", b32)

print("\n── 03 : la boîte à outils, CINQ objets ──")
t03 = T("Cinq objets, et ils suffisent", 44).to_edge(UP, buff=0.5)
cadre("titre de l'écran 03", t03)
fs = 26
_norme = VGroup(VX("‖u‖ =", ("u",), fs), RAC(T("x² + y² + z²", fs), fs))
_norme.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
_eq = VGroup(EQZ("a x + b y + c z + d", fs), T("et (a ; b ; c) est sa normale", fs))
_eq.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
outils = [
    VGroup(T("le produit scalaire :", fs), T("x x′ + y y′ + z z′", fs))
    .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
    VGroup(T("produit nul :", fs), T("vecteurs orthogonaux", fs))
    .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
    VGroup(T("la norme :", fs), _norme).arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
    VGroup(T("l'équation :", fs), _eq).arrange(RIGHT, buff=0.22, aligned_edge=UP),
    VGroup(T("le projeté orthogonal :", fs), T("on suit la normale", fs))
    .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
]
g03 = rangees_("les 5 outils", outils, 0.25, buff=0.30)
contre_titre("03", t03, g03)
sur_margo("03", "la boîte à outils", g03)

print("\n── 04 : la question-pause n° 1 (cartes 6,2 à partir de 0,35) ──")
cA = VX("n ⊥ B D", ("n", "B D"), 28)
cB = CH2("n ⊥ B D et n ⊥ B E,", "et non colinéaires", fs=26,
         noms=("n", "B D", "B E"))
cC = VX("n colinéaire à B D", ("n", "B D"), 26)
q04 = [VX("Pour démontrer qu'un vecteur n est", ("n",), 26),
       T("normal au plan (BDE),", 26), T("que faut-il vérifier ?", 26)]
tete, q, cartes, pause, rebours = EcransEspace.q_tete(E, q04, [cA, cB, cC],
                                                      largeur=6.2, xl=0.35)
cadre("tête « Question ! » + rebours", tete, rebours)
cadre("la question (3 lignes)", q, naturel=max(float(x.width) for x in q04))
c04 = cadre("les trois cartes", cartes)
EcransEspace.gauche(E, pause, -2.95, xmax=0.15)   # remède mesuré de l'épisode 8
pc = cadre("« Mets pause » (déplacée en bas à gauche)", pause)
pol = [police(cc) for cc in cartes]
print(f"  polices obtenues : {pol}  (demandées 28 / 26 / 26)"
      f"{'  ⛔ RÉDUITES' if min(pol) < 25.5 else '  ✅'}")
if min(pol) < 25.5:
    ennuis.append("04 : cartes réduites")
sur_margo("04", "la pause", pc)
sur_margo("04", "les cartes", c04)
don04 = bloc("« n⃗ ⊥ au plan (BDE) ? »", VX("n ⊥ au plan (BDE) ?", ("n",), 42), 1.55, 0.15)
a_cote("04", "la donnée touche les cartes", don04, c04)

print("\n── 04b : les blocs de gauche ──")
l1 = bloc("« n⃗ · B⃗D = 0 et n⃗ · B⃗E = 0 »",
          VX("n · B D = 0  et  n · B E = 0", ("n", "B D", "B E"), 26), 0.60, 0.15)
dessous("04b", "la première ligne recouvre la donnée", don04, l1)
_l2 = VGroup(VX("et B D, B E non colinéaires", ("B D", "B E"), 26),
             T("sans elle : le point est perdu", 24))
_l2.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
l2 = bloc("la non-colinéarité + cadre",
          VGroup(_l2, SurroundingRectangle(_l2, buff=0.14, stroke_width=3)), -0.30, 0.15)
dessous("04b", "la non-colinéarité recouvre les deux produits", l1, l2)
_l3 = VGroup(CROIX(0.12), VGroup(T("A : le piège du poteau,", 25),
                                 T("vérifié dans un seul sens", 25))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
_l3.arrange(RIGHT, buff=0.18, aligned_edge=UP)
l3 = bloc("✗ « A : le piège du poteau »", _l3, -1.60, 0.15)
dessous("04b", "le piège A recouvre la non-colinéarité", l2, l3)
_l4 = VGroup(CROIX(0.12), VGroup(T("C : colinéaire à un vecteur du plan,", 25),
                                 T("c'est aller DANS la direction du plan", 25))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
_l4.arrange(RIGHT, buff=0.18, aligned_edge=UP)
l4 = bloc("✗ « C : dans la direction du plan »", _l4, -2.90, 4.6)
dessous("04b", "le piège C recouvre le piège A", l3, l4)
sur_margo("04b", "le piège C", l4)

print("\n── 05 : la normale, puis l'équation, dans le cube ──")
t05 = T("Dans le cube : la normale, puis l'équation", 40).to_edge(UP, buff=0.5)
cadre("titre de l'écran 05", t05)
r05, cube05 = PsEspaceDefiBase.cube_repere(
    E, o=(-5.70, -0.10), u=U_CUBE, rouges=("B", "D", "E"), ecarte=ECARTE_CUBE)
base05 = PsEspaceDefiBase.base_repere(E, r05)
fAG05 = r05.vecteur(S["A"], S["G"], None, couleur=C_NORMALE, sw=7)
cc05 = cadre("le cube + la base + A⃗G", cube05, base05, fAG05)
n05 = noms_du_cube(cube05)
etiquettes("05", *[(k, v) for k, v in sorted(n05.items())])
loin_des_fleches("05", segments_du_cube(
    r05, [("A⃗G", fAG05.fleche.get_start(), fAG05.fleche.get_end())]
    + [(f"A⃗{s}", v.fleche.get_start(), v.fleche.get_end())
       for s, v in zip("BDE", base05)]),
    [(k, v) for k, v in sorted(n05.items())])
q1 = droite_("A⃗G (1 ; 1 ; 1)", NOMME("A G", NORMALE, C_NORMALE, 28), 2.40)
contre_titre("05", t05, q1)
q2 = droite_("« A⃗G ⊥ au plan (BDE) »", VX("A G ⊥ au plan (BDE)", ("A G",), 26), 1.85)
dessous("05", "la conclusion recouvre A⃗G", q1, q2)
q3 = droite_("x + y + z + d = 0", EQP(1, 1, 1, None, 30), 1.25)
dessous("05", "l'équation inconnue recouvre la conclusion", q2, q3)
q4 = droite_("B (1 ; 0 ; 0)", PTN("B", S["B"], C_POINT, 28), 0.65)
dessous("05", "le point B recouvre l'équation", q3, q4)
_q5 = VGroup(T("1 + d = 0", 28), T("⟹   d = −1", 28))
_q5.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
q5 = droite_("« 1 + d = 0 » / « ⟹ d = −1 » (2 lignes)", _q5, -0.15)
dessous("05", "la résolution recouvre le point B", q4, q5)
_lf = EQP(1, 1, 1, D_PLAN, 32)
q6 = droite_("x + y + z − 1 = 0 + cadre",
             VGroup(_lf, SurroundingRectangle(_lf, buff=0.14, stroke_width=3)), -1.25)
dessous("05", "l'équation finale recouvre la résolution", q5, q6)
sur_margo("05", "l'équation finale", q6)
v1 = bloc("vérification pour D", T("pour D :   0 + 1 + 0 − 1 = 0", 26), -2.25, 4.6)
dessous("05", "la vérification recouvre le cube", cc05, v1)
v2 = bloc("vérification pour E", T("pour E :   0 + 0 + 1 − 1 = 0", 26), -2.80, 4.6)
dessous("05", "la 2e vérification recouvre la 1re", v1, v2)
_v3 = VGroup(COCHE(), T("les trois points y sont", 28)).arrange(RIGHT, buff=0.20)
v3 = bloc("✓ « les trois points y sont »", _v3, -3.35, 4.6)
dessous("05", "la conclusion recouvre la 2e vérification", v2, v3)

print("\n── 06 : les CINQ pièges ──")
bang = VGroup(Triangle(stroke_width=4).scale(0.33), Text("!", font_size=30, weight=BOLD))
t06 = VGroup(bang, T("Cinq pièges de copie", 42)).arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
cadre("titre de l'écran 06", t06)
g06 = rangees_("les 5 pièges", [
    T("prouver l'orthogonalité sur une seule direction", 24),
    T("oublier la phrase de non-colinéarité", 24),
    T("un arrondi là où l'énoncé demande l'exact", 24),
    T("annoncer une distance négative, ce qui n'existe pas", 24),
    T("s'appuyer sur le dessin pour affirmer", 24)], 0.55, buff=0.30)
contre_titre("06", t06[1], g06)
_f06 = VGroup(T("dans l'espace,", 30), T("la preuve est toujours un CALCUL", 32))
_f06.arrange(RIGHT, buff=0.22, aligned_edge=DOWN)
_c06 = SurroundingRectangle(_f06, buff=0.18, stroke_width=3)
VGroup(_f06, _c06).move_to(P(-0.75, -2.55))
b06 = cadre("la conclusion + cadre", _f06, _c06)
dessous("06", "la conclusion recouvre les 5 pièges", g06, b06)
sur_margo("06", "la conclusion", b06)

print("\n── 07 : la question-pause n° 2 (cartes 6,0 à partir de 0,6) ──")
r07, cube07 = PsEspaceDefiBase.cube_repere(
    E, o=(-5.95, 0.85), u=U_CUBE, rouges=("B", "D", "E"), ecarte=ECARTE_CUBE)
cc07 = cadre("le cube (donnée : les points B, D, E)", cube07)
_n07 = noms_du_cube(cube07)
etiquettes("07", *[(k, v) for k, v in sorted(_n07.items())])
loin_des_fleches("07", segments_du_cube(r07),
                 [(k, v) for k, v in sorted(_n07.items())])
q07 = [T("Dans le cube d'arête 1, on considère", 26), T("les points B, D et E.", 26),
       T("Le triangle (BDE) est :", 26)]
cA7, cB7, cC7 = T("équilatéral", 28), T("rectangle en B", 28), T("quelconque", 28)
tete7, q7, cartes7, pause7, rebours7 = EcransEspace.q_tete(E, q07, [cA7, cB7, cC7],
                                                           largeur=6.0, xl=0.6)
cadre("tête « Question ! » + rebours", tete7, rebours7)
cadre("la question (3 lignes)", q7, naturel=max(float(x.width) for x in q07))
c07 = cadre("les trois cartes", cartes7)
EcransEspace.gauche(E, pause7, -3.05, xmax=0.4)
pc7 = cadre("« Mets pause » (déplacée en bas à gauche)", pause7)
pol7 = [police(cc) for cc in cartes7]
print(f"  polices obtenues : {pol7}  (demandées 28 / 28 / 28)"
      f"{'  ⛔ RÉDUITES' if min(pol7) < 27.5 else '  ✅'}")
if min(pol7) < 27.5:
    ennuis.append("07 : cartes réduites")
sur_margo("07", "la pause", pc7)
sur_margo("07", "les cartes", c07)
a_cote("07", "le cube touche les cartes", cc07, c07)

print("\n── 07b : le triangle à plat, les trois √2, le produit scalaire ──")
tri = triangle_plan(cote=1.45).move_to(P(-2.05, 1.55))
pB, pD, pE = tri.cBD.get_start(), tri.cBD.get_end(), tri.cBE.get_end()
et7 = {}
for nom, p, direc in (("B", pB, DL), ("D", pD, DR), ("E", pE, UP)):
    et7[nom] = T(nom, 26).move_to(p + direc * 0.30)
leg7 = T("vu dans son plan", 22).next_to(VGroup(tri, *et7.values()), DOWN, buff=0.14)
gt7 = cadre("le triangle à plat + ses 3 noms + sa légende", tri, *et7.values(), leg7)
etiquettes("07b", *[(k, v) for k, v in sorted(et7.items())])
# ⛔ Les trois noms de sommet contre les trois CÔTÉS tracés : c'est `loin_des_fleches` de
# E9 appliqué à une figure plane — un « B » posé sur [B D] serait illisible, et
# `etiquettes()` seul ne compare que des boîtes entre elles.
loin_des_fleches("07b", [("[B D]", tri.cBD.get_start(), tri.cBD.get_end()),
                         ("[B E]", tri.cBE.get_start(), tri.cBE.get_end()),
                         ("[D E]", tri.cDE.get_start(), tri.cDE.get_end())],
                 [(k, v) for k, v in sorted(et7.items())])
a_cote("07b", "le triangle touche les cartes", gt7, c07)
a_cote("07b", "le cube touche le triangle", cc07, gt7)
fs = 25
_m1 = VGroup(VX("‖B D‖ = ‖B E‖ = ‖D E‖ =", ("B D", "B E", "D E"), fs),
             RAC(norme2(BD), fs))
_m1.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
_b1 = VGroup(_m1, T("trois diagonales de face", 24))
_b1.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
m1 = bloc("‖B⃗D‖ = ‖B⃗E‖ = ‖D⃗E‖ = √2", _b1, -0.45, 0.4)
dessous("07b", "les trois normes recouvrent le triangle", gt7, m1)
a_cote("07b", "les trois normes touchent les cartes", m1, c07)
_suite = VGroup(T("(−1) × (−1)", 24), T("+ 1 × 0", 24), T("+ 0 × 1", 24),
                T("= 1", 24)).arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
_calc = VGroup(VX("B D · B E =", ("B D", "B E"), fs), _suite)
_calc.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
m2 = bloc("le produit scalaire, terme à terme (2 étages)", _calc, -1.75, 4.6)
dessous("07b", "le produit scalaire recouvre les normes", m1, m2)
_f7 = VGroup(CROIX(0.12),
             VGroup(T("pas nul, donc pas droit en B :", 26),
                    VGroup(T(f"{round(angle(BD, BE))}°", 30),
                           T("comme dans tout triangle équilatéral", 24))
                    .arrange(RIGHT, buff=0.18, aligned_edge=DOWN))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.10))
_f7.arrange(RIGHT, buff=0.20, aligned_edge=UP)
m3 = bloc("✗ « pas droit en B : 60° »", _f7, -3.00, 4.6)
dessous("07b", "la conclusion recouvre le produit scalaire", m2, m3)
sur_margo("07b", "la conclusion", m3)

print("\n── 08 : la copie, QUATRE lignes ──")
t08 = T("Le squelette d'une copie", 44).to_edge(UP, buff=0.5)
cadre("titre de l'écran 08", t08)
copie = RoundedRectangle(width=10.2, height=3.0, corner_radius=0.18,
                         stroke_width=3).move_to(P(-0.6, -0.40))
ccad = cadre("la copie", copie)
print(f"  écart titre → copie : {float(t08.get_bottom()[1]) - ccad[3]:.2f}"
      f"{'  ⛔ SE TOUCHENT' if float(t08.get_bottom()[1]) < ccad[3] else '  ✅'}")
if float(t08.get_bottom()[1]) < ccad[3]:
    ennuis.append("08 : la copie touche le titre")
rangs8 = []
for k, (txt, dn) in enumerate((("les coordonnées des points utiles", None),
                               ("les deux produits scalaires + la phrase", None),
                               ("donc n est normal, puis l'équation", ("n",)),
                               ("le calcul, la conclusion, l'unité", None)), start=1):
    corps = VX(txt, dn, 26) if dn else T(txt, 26)
    rangs8.append(VGroup(PAST(k), corps).arrange(RIGHT, buff=0.30))
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
rap = VGroup(T("ce plan-là fonctionne", 26),
             T("sur n'importe quel sujet de l'espace", 26)).arrange(DOWN, buff=0.10)
rc = SurroundingRectangle(rap, buff=0.14, stroke_width=3)
VGroup(rap, rc).next_to(copie, DOWN, buff=0.24)
r8 = cadre("le rappel sous la copie + cadre", rap, rc)
dessous("08", "le rappel recouvre la copie", ccad, r8)
sur_margo("08", "le rappel", r8)

print("\n── 09 / 09b : le cube, le défi, la correction ──")
r09, cube09 = PsEspaceDefiBase.cube_repere(E, o=(-5.90, 0.55), u=U_CUBE,
                                           rouges=("A", "B", "D", "E"),
                                           ecarte=ECARTE_CUBE)
loin_des_fleches("09", segments_du_cube(r09),
                 [(k, v) for k, v in sorted(noms_du_cube(cube09).items())])
cc09 = cadre("le cube du défi", cube09)
_d09 = VGroup(T("le plan (BDE) :", 26), EQP(1, 1, 1, D_PLAN, 28))
_d09.arrange(RIGHT, buff=0.20, aligned_edge=DOWN)
don09 = bloc("la donnée : l'équation du plan + cadre",
             VGroup(_d09, SurroundingRectangle(_d09, buff=0.14, stroke_width=3)),
             -0.60, 4.6)
dessous("09", "l'équation recouvre le cube", cc09, don09)
_c09 = VGroup(T("détermine le projeté orthogonal K de A,", 28),
              T("puis la distance de A au plan (BDE)", 28))
_c09.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
cons09 = bloc("la consigne (2 lignes)", _c09, -1.90, 4.6)
dessous("09", "la consigne recouvre l'équation", don09, cons09)
_p09 = T("Mets pause, et cherche !", 30)
pause09 = bloc("« Mets pause, et cherche ! »", _p09, -3.05, 4.6)
# ⚠️ Le compte à rebours est posé À CÔTÉ de la pause (dessous, à cette hauteur-là, il
# sortirait du cadre) : c'est donc le GROUPE des deux qu'il faut mesurer, pas la pause
# seule — la leçon de « Saint-Pierre mesuré seulement EN PAIRE » de l'épisode 10, à
# l'envers.
reb09 = CompteARebours(5, r=0.34, fs=32).next_to(_p09, RIGHT, buff=0.35)
pr09 = cadre("« Mets pause » + le rebours", _p09, reb09)
dessous("09", "la pause recouvre la consigne", cons09, pr09)
sur_margo("09", "la pause + le rebours", pr09)

# ── 09b : la correction ──
# ⛔⛔ LA DIAGONALE [A G] ET LE POINT K SONT AJOUTÉS AU CUBE, et les deux noms « D » et
# « F » sont écartés : le fût de [A G] passe à 0,00 du nom « D » et à 0,10 du nom « F »
# (mesuré sur E9). ⭐ `loin_des_fleches` reçoit les DOUZE arêtes, la diagonale ET le nom
# de K — un contrôle qui ne connaît qu'une partie du dessin DÉPLACE le défaut.
n09 = noms_du_cube(cube09)
diag = Line(cube09.sommet("A"), cube09.sommet("G")).set_stroke(C_REGARD, 5)
pK = r09.pt(*K)
# ⛔⛔ K N'A PAS D'ÉTIQUETTE, ET C'EST UNE RECHERCHE EN GRILLE QUI L'A DÉCIDÉ (pas de
# 0,04 entre −0,9 et +0,9, à plus de 0,11 de tout segment et à plus de 0,22 des huit noms
# de sommet) : 110 positions libres, la plus proche à **0,82** du point, c'est-à-dire plus
# d'une demi-arête — au milieu du cube, plus près d'autre chose que de K. Posée en `UL`
# elle tombait à 0,00 de « D », et perpendiculairement à la diagonale à 0,00 de [C D].
# ⭐ Remède de l'écran 09b de E8 : on n'étiquette pas, et c'est la COULEUR qui relie le
# point VERT au bloc « K (1/3 ; 1/3 ; 1/3) » encadré en VERT dans la colonne.
cc09b = cadre("le cube + [A G] + le point K", cube09, diag,
              Dot(pK, radius=0.095))
# ⛔⛔ LE POINT K EST DANS LA LISTE DES OBSTACLES, ET C'EST LE TROU D'INSTRUMENT DE
# CET ÉPISODE : `etiquettes()` compare des étiquettes ENTRE ELLES, `loin_des_fleches()`
# une étiquette à un SEGMENT — aucun des deux ne connaît un POINT. Vu au gros plan ×2,6 :
# la lettre ambre « D » et le point VERT de K se lisaient comme un seul objet. ⭐ Un point
# se passe comme un segment de longueur nulle, et le contrôle existant fait le reste.
segs09 = segments_du_cube(r09, [("[A G]", diag.get_start(), diag.get_end()),
                                ("le point K", pK, pK)])
print(f"  ⭐ {len(segs09)} segments passés au contrôle "
      f"({len(segs09) - 2} arêtes + la diagonale + le point K)")
etiquettes("09b", *[(k, v) for k, v in sorted(n09.items())])
loin_des_fleches("09b", segs09, [(k, v) for k, v in sorted(n09.items())])
w1 = droite_("n⃗ (1 ; 1 ; 1)", NOMME("n", NORMALE, C_NORMALE, 28), 2.35)
w2 = droite_("le système x = t, y = t, z = t", SYS(["x = t", "y = t", "z = t"], 28), 1.40)
dessous("09b", "le système recouvre la normale", w1, w2)
_w3 = VGroup(T("t + t + t − 1 = 0", 26), T("⟹   3t = 1", 26))
_w3.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
w3 = droite_("la substitution (2 lignes)", _w3, 0.20)
dessous("09b", "la substitution recouvre le système", w2, w3)
_lt = VGroup(T("t =", 30), TIERS(30)).arrange(RIGHT, buff=0.14)
w4 = droite_("« t = 1/3 »", _lt, -0.60)
dessous("09b", "t = 1/3 recouvre la substitution", w3, w4)
_lK = VGroup(T("K", 30), T("(", 30), TIERS(30), T(";", 30), TIERS(30), T(";", 30),
             TIERS(30), T(")", 30)).arrange(RIGHT, buff=0.12)
w5 = droite_("K (1/3 ; 1/3 ; 1/3) + cadre",
             VGroup(_lK, SurroundingRectangle(_lK, buff=0.14, stroke_width=3)), -1.35)
dessous("09b", "K recouvre t = 1/3", w4, w5)
sur_margo("09b", "le bloc K", w5)
fs = 26
_d1 = VGroup(VGroup(VX("‖A K‖ :", ("A K",), fs), T("chaque carré = 1/9", fs))
             .arrange(RIGHT, buff=0.20, aligned_edge=DOWN),
             T("3 × 1/9 = 1/3", fs))
_d1.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
x2 = bloc("les carrés (2 lignes, un seul bloc)", _d1, -1.55, 4.6)
dessous("09b", "les carrés recouvrent l'équation du défi", don09, x2)
dessous("09b", "les carrés recouvrent le cube", cc09b, x2)
_dd1 = VGroup(T("distance =", fs), RAC(TIERS(fs), fs))
_dd1.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
_dd2 = VGroup(T("=", fs), RAC(norme2(NORMALE), fs), T("/ 3", fs))
_dd2.arrange(RIGHT, buff=0.10, aligned_edge=DOWN)
_dist = VGroup(_dd1, _dd2, T("≈ " + NB(round(math.sqrt(3) / 3, 2)), fs))
_dist.arrange(RIGHT, buff=0.26, aligned_edge=DOWN)
x3 = bloc("« distance = √(1/3) = √3/3 ≈ 0,58 »", _dist, -2.35, 4.6)
print(f"    ⚠️ hauteur du bloc (deux radicaux) : {x3[3] - x3[2]:.2f} "
      f"(une ligne de texte en fait ~0,40)")
dessous("09b", "la distance recouvre la somme des carrés", x2, x3)
_ch = VGroup(COCHE(), VGroup(T("K est au tiers de [A G] :", 26),
                             T("(BDE) coupe la diagonale du cube à son premier tiers", 26))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
_ch.arrange(RIGHT, buff=0.20, aligned_edge=UP)
x4 = bloc("✓ la chute : « K est au tiers de [A G] »", _ch, -3.10, 4.6)
dessous("09b", "la chute recouvre la distance", x3, x4)
sur_margo("09b", "la chute", x4)

print("\n── 10 : la finale ──")
t10 = T("Ce que tu as appris", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 10", t10)
blocs = []
for g, d in (("le fil :", "normale, équation, distance"),
             ("la normale :", "deux produits nuls + la phrase ÉCRITE"),
             ("le projeté :", "on suit la normale"),
             ("la preuve :", "un calcul, jamais un dessin")):
    blocs.append(VGroup(T(g, 26), T(d, 26)).arrange(RIGHT, buff=0.22, aligned_edge=DOWN))
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
print("   aucun chevauchement, aucune étiquette traversée, aucune pointe hors de son plan.")
