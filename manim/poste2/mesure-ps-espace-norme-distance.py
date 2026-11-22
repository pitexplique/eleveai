# manim/poste2/mesure-ps-espace-norme-distance.py
# LES COTES DE L'ÉPISODE 9 (« ps_espace_norme_distance »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-orthogonalite.py` (épisode 8), la version la plus
# complète de l'outil : blocs RÉTRÉCIS, réductions PAR UN PLAFOND, colonne de droite
# comparée au TITRE, étiquettes de figure DEUX À DEUX (`etiquettes()`), et pointe d'une
# flèche testée DANS le polygone de son plan.
#
# ⚠️ CE QUE CET ÉPISODE AJOUTE À L'OUTIL — `loin_des_fleches()` : une étiquette comparée
# au FÛT d'une flèche, et non à une autre étiquette. Mesuré sur la planche des figures
# seules : la grande diagonale A G passe à 0,12 du sommet F du cube et son étiquette
# était TRAVERSÉE par le fût. `etiquettes()` ne pouvait pas le voir — il compare des
# boîtes entre elles, jamais une boîte à un segment. ⚠️ À recopier dans E10 à E12 :
# les trois derniers épisodes dessinent tous des vecteurs dans ce même cube.
#
# ⚠️ ET UN RADICAL EST PLUS HAUT QU'UN TEXTE DE MÊME POLICE (le vinculum déborde de 0,07
# au-dessus du radicande) : tous les blocs de cet épisode qui en portent un sont donc
# mesurés AVEC, jamais estimés depuis un bloc de texte voisin.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit
# le bloc à la largeur de sa plus longue ligne, et son second garde-fou (« bas sous
# −1,95 ET droite au-delà de 5,3 → réduire ») se déclenche au CENTIÈME près.
# Le critère : aucune ligne « RÉTRÉCI », aucune « HORS MARGE », aucun « RÉDUIT PAR LE
# PLAFOND », aucun chevauchement.
#
#   python -X utf8 manim/poste2/mesure-ps-espace-norme-distance.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace3d import C_FANTOME, C_REGARD, C_VECTEUR, C_VECTEUR2, Repere3D  # noqa: E402
from espace_ecrans import CompteARebours, P, EcransEspace  # noqa: E402
from ps_espace_norme_distance import (A05, A07, AB05, AB07, AC, AG, B05,  # noqa: E402
                                      B07, S, U02, U04, carres, coureur,
                                      norme2, pente,
                                      PsEspaceNormeDistanceBase, triangle345)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
E = EcransEspace.__new__(PsEspaceNormeDistanceBase)
T = lambda s, fs: EcransEspace.t(E, s, fs)                      # noqa: E731
TRIP = lambda t3, fs, **k: EcransEspace.trip(E, t3, fs, **k)    # noqa: E731
RAC = lambda r, fs=28, **k: EcransEspace.racine(E, r, fs, WHITE, **k)   # noqa: E731
NOMME = lambda n, t3, c, fs: PsEspaceNormeDistanceBase.nomme(E, n, t3, c, fs)   # noqa: E731
PTN = lambda n, t3, c, fs: PsEspaceNormeDistanceBase.pt_nomme(E, n, t3, c, fs)  # noqa: E731
SOMC = lambda u, fs: PsEspaceNormeDistanceBase.somme_carres(E, u, fs)          # noqa: E731
ENV = lambda v, fs=26: PsEspaceNormeDistanceBase.env(E, v, fs)                 # noqa: E731
CROIX = lambda r=0.13: EcransEspace.croix(E, r=r)               # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)   # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
COCHE = lambda t=0.15: EcransEspace.coche(E, "#00FF7F", t)      # noqa: E731
CH2 = lambda a, b, fs=28, **k: EcransEspace.choix2(E, a, b, fs, **k)   # noqa: E731
ennuis = []


def police(carte):
    """LA PLUS PETITE police réellement obtenue par le corps d'une carte de choix.

    ⛔ Et c'est « la plus petite » et non « la première », parce que l'épisode 9 met des
    RADICAUX dans des cartes : `racine()` dessine son signe √ à 1,15 fois la police
    demandée, et la première police rencontrée dans la famille était donc celle du
    signe — la carte paraissait plus grande que demandée alors que son radicande, lui,
    pouvait être rétréci. Un instrument qui rend un chiffre plausible n'a pas prouvé
    qu'il mesurait la bonne chose."""
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
    """La plus petite distance entre un SEGMENT [a ; b] et la boîte d'un mobjet."""
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


def loin_des_fleches(cle, fleches, etqs, seuil=0.08):
    """⛔⛔ LE CONTRÔLE NEUF DE L'ÉPISODE 9 : UNE ÉTIQUETTE TRAVERSÉE PAR UN FÛT.

    `etiquettes()` compare des boîtes ENTRE ELLES. Il ne voit donc pas qu'une flèche
    passe au travers d'un nom — et c'est ce qui arrivait au sommet F du cube : la grande
    diagonale A G passe à 0,12 de F (en cavalière, A G se projette sur (1,41 ; 1,287) et
    F sur (1 ; 1)), et son fût traversait l'étiquette « F » posée à droite du sommet.
    Vu sur la planche des figures seules, par rien d'autre.
    ⚠️ On échantillonne le SEGMENT, pas sa boîte : la boîte d'une flèche en diagonale
    est un grand rectangle presque vide, et testée ainsi elle crierait partout (c'est
    la leçon de la recherche de `decal` en grille, passe des flèches)."""
    for nom_e, mob in etqs:
        pire, coupable = 1e9, ""
        for nom_f, f in fleches:
            d = _dist_seg_boite(f.get_start(), f.get_end(), mob)
            if d < pire:
                pire, coupable = d, nom_f
        note = ("  ⛔ TRAVERSÉE" if pire < seuil
                else ("  ⚠️ serré" if pire < 0.18 else "  ✅"))
        if pire < seuil:
            ennuis.append(f"{cle} : « {nom_e} » traversée par la flèche {coupable}")
        print(f"    « {nom_e:5s} » ↔ fût {coupable:6s} : {pire:.2f}{note}")


print("── les figures, à l'échelle qu'elles annoncent ──")
_t = triangle345(1.0)
_c = [float(np.linalg.norm(m.get_end() - m.get_start())) for m in _t[:3]]
print(f"  3-4-5 : côtés {_c[1]:.3f} / {_c[0]:.3f} / {_c[2]:.3f}  "
      f"→ rapports {_c[0] / _c[1]:.4f} (4/3 = 1,3333) et "
      f"{_c[2] / _c[1]:.4f} (5/3 = 1,6667)")
_p = pente(1.0)
_h = float(np.linalg.norm(_p[1].get_end() - _p[1].get_start()))
_tr = float(np.linalg.norm(_p[2].get_end() - _p[2].get_start()))
print(f"  profil : base {(_tr ** 2 - _h ** 2) ** 0.5:.3f} pour une hauteur {_h:.3f} "
      f"→ rapport {((_tr ** 2 - _h ** 2) ** 0.5) / _h:.3f} (attendu 10,000)")

print("\n── 00 : la page de garde ──")
t00 = T("Normes et distances", 46).to_edge(UP, buff=0.5)
cadre("titre", t00)
lg = VGroup()
for txt in ("trois carrés, une racine", "une règle qu'on viole tout le temps"):
    lg.add(VGroup(Dot(radius=0.08), T(txt, 38)).arrange(RIGHT, buff=0.26))
lg.arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to(P(-0.9, 0.95))
cadre("les deux promesses", lg)
cadre("echelle() alignée en bas", EcransEspace.echelle(E).align_to(P(0, -3.45), DOWN))
cadre("la ligne finale", T("la racine ne se distribue pas", 32).move_to(P(-0.9, -1.55)))

print("\n── 01 : la coureuse, le profil, les quatre blocs ──")
c = coureur(0.68).move_to(P(-5.70, 0.55))
x0m, x1m, y0m, y1m = cadre("la coureuse (s = 0,68)", c)
nom = T("la Diagonale", 28).next_to(c, DOWN, buff=0.20)
if nom.get_left()[0] < -6.5:
    nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
met = T("des Fous", 28).next_to(nom, DOWN, buff=0.08)
if met.get_left()[0] < -6.5:
    met.shift(RIGHT * (-6.5 - met.get_left()[0]))
cadre("« la Diagonale / des Fous » (après garde-fou)", nom, met)
pr = pente(1.0).move_to(P(-1.55, 1.25))
a0, a1, ay0, ay1 = cadre("le profil 10 / 1", pr)
print(f"  écart coureuse → profil : {a0 - x1m:.2f}"
      f"{'  ⛔ SE TOUCHENT' if a0 - x1m < 0.15 else '  ✅'}")
if a0 - x1m < 0.15:
    ennuis.append("01 : la coureuse touche le profil")
e_plat = T(f"{10} km à plat", 26).next_to(pr[0], DOWN, buff=0.16)
e_den = T(f"{1} km", 26).next_to(pr[1], RIGHT, buff=0.14)
e_tr = RAC(101, 28)
e_tr.next_to(pr[2].get_center(), UP, buff=0.18)
km = T("km", 24).next_to(e_tr, RIGHT, buff=0.10)
cadre("les trois étiquettes du profil", e_plat, e_den, e_tr, km)
etiquettes("01", ("plat", e_plat), ("déniv", e_den), ("√101", VGroup(e_tr, km)))
fs = 28
droite_("« quelle distance, vraiment ? »",
        VGroup(T("quelle distance,", fs), T("vraiment ?", fs))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.40)
droite_("« pas 11 km »", VGroup(CROIX(), T("pas 11 km", fs)).arrange(RIGHT, buff=0.22), 1.25)
droite_("« on passe par les CARRÉS »",
        VGroup(T("on passe", fs), T("par les CARRÉS", fs))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.05)
droite_("« un peu plus de 10 km »", T("un peu plus de 10 km", fs), -1.15)
fil = VGroup(T("le dénivelé change presque tout à l'effort,", 26),
             T("et presque rien à la distance", 26)).arrange(DOWN, aligned_edge=LEFT,
                                                             buff=0.10)
f0, f1, fy0, fy1 = bloc("conclusion (2 lignes) + cadre",
                        VGroup(fil, SurroundingRectangle(fil, buff=0.16, stroke_width=3)),
                        -2.00, 4.6)
py = bloc("« c'est Pythagore, en trois dimensions »",
          T("c'est Pythagore, en trois dimensions", 28), -3.10, 4.6)
if py[3] > fy0:
    ennuis.append("01 : Pythagore recouvre la conclusion")
    print("  ⛔ PYTHAGORE RECOUVRE LA CONCLUSION")
else:
    print(f"  écart conclusion → Pythagore : {fy0 - py[3]:.2f}  ✅")

print("\n── 02 : l'escalier, la formule, l'exemple ──")
t02 = T("La norme d'un vecteur", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 02", t02)
r02 = Repere3D(o=np.array([-4.95, -1.45, 0.0]), u=0.85, portee=3)
ax02 = r02.axes()
esc = r02.point(1, 2, 2, None, couleur=C_VECTEUR, r=0.07, escalier=True)
fu = r02.vecteur((0, 0, 0), (1, 2, 2), "u", couleur=C_VECTEUR, sw=7, fs=28, decal=UL)
g02 = cadre("le repère + l'escalier + u", ax02, esc, fu)
noms_ax = [m for m in ax02.submobjects if isinstance(m, Text)]
etiquettes("02", *[(m.text, m) for m in noms_ax], ("u", fu.nom))
loin_des_fleches("02", [("u", fu.fleche)], [(m.text, m) for m in noms_ax])
sous02 = T("trois pas : x, puis y, puis z", 24)
sous02.next_to(VGroup(ax02, esc), DOWN, buff=0.18).align_to(P(-6.3, 0), LEFT)
s0, s1, sy0, sy1 = cadre("la légende « trois pas »", sous02)
form = VGroup(VX("‖u‖ =", ("u",), 32), RAC("x² + y² + z²", 32))
form.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
d02 = droite_("la formule (‖u‖ = √…)", form, 2.30)
contre_titre("02", t02, d02)
droite_("u (2 ; 3 ; 6)", NOMME("u", U02, C_VECTEUR, 28), 1.10)
droite_("les trois carrés", T(" ; ".join(str(x) for x in carres(U02)), 28), 0.30)
droite_("« somme : 49 »", T(f"somme : {norme2(U02)}", 28), -0.50)
rac02 = VGroup(RAC(norme2(U02), 32), T("= 7", 32)).arrange(RIGHT, buff=0.16,
                                                           aligned_edge=DOWN)
dr02 = droite_("« √49 = 7 »", rac02, -1.30)
fin02 = VX("la norme de u vaut exactement 7", ("u",), 30)
b02f = bloc("la conclusion + cadre",
            VGroup(fin02, SurroundingRectangle(fin02, buff=0.14, stroke_width=3)),
            -3.10, 4.6)
if b02f[3] > sy0:
    ennuis.append("02 : la conclusion touche la légende de la figure")
    print("  ⛔ LA CONCLUSION TOUCHE LA LÉGENDE")
else:
    print(f"  écart légende → conclusion : {sy0 - b02f[3]:.2f}  ✅")

print("\n── 03 : les deux notations, puis le tableau ──")
t03 = T("Une distance est une norme", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 03", t03)
tete03 = VGroup(T("AB", 40), VX("= ‖A B‖", ("A B",), 40))
tete03.arrange(RIGHT, buff=0.18, aligned_edge=DOWN)
cad03 = SurroundingRectangle(tete03, buff=0.18, stroke_width=3)
VGroup(tete03, cad03).move_to(P(-0.75, 1.85))
h0, h1, hy0, hy1 = cadre("« AB = ‖A B⃗‖ » + cadre", tete03, cad03)
print(f"  écart titre → en-tête : {float(t03.get_bottom()[1]) - hy1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if float(t03.get_bottom()[1]) < hy1 else '  ✅'}")
if float(t03.get_bottom()[1]) < hy1:
    ennuis.append("03 : l'en-tête touche le titre")
leg03 = T("une LONGUEUR = la norme d'un VECTEUR", 24).next_to(cad03, DOWN, buff=0.16)
l0, l1, ly0, ly1 = cadre("la légende de l'en-tête", leg03)
rangs3 = []
for k3, (g, d, dn) in enumerate(
        (("d'abord :", "arrivée moins départ", None),
         ("ensuite :", "la racine de la somme des carrés", None),
         ("le lien :", "‖u‖² = u · u", ("u",))), start=1):
    corps = VX(d, dn, 28) if dn else T(d, 28)
    rangs3.append(VGroup(EcransEspace.pastille(E, k3), T(g, 28), corps)
                  .arrange(RIGHT, buff=0.24))
r03 = plafonne("les trois rangées", VGroup(*rangs3).arrange(DOWN, aligned_edge=LEFT,
                                                            buff=0.42),
               10.6, P(-0.75, -1.25))
print(f"  écart légende → tableau : {ly0 - r03[3]:.2f}"
      f"{'  ⛔ SE TOUCHENT' if ly0 < r03[3] else '  ✅'}")
if ly0 < r03[3]:
    ennuis.append("03 : le tableau touche la légende")

print("\n── 04 : la question-pause n° 1 (cartes étroites, 4,1 à partir de 2,2) ──")
choix04 = []
for v in (norme2(U04), int(norme2(U04) ** 0.5), sum(U04)):
    cc = T(str(v), 36)
    cc.nb = [cc]
    choix04.append(cc)
q04 = VX("Que vaut la norme de u ?", ("u",), 32)
tete, q, cartes, pause, rebours = EcransEspace.q_tete(E, [q04], choix04)
cadre("tête « Question ! » + rebours", tete, rebours)
cadre("question (1 ligne)", q)
xc0, xc1, yc0, yc1 = cadre("les trois cartes", cartes)
pc = cadre("« Mets pause, et choisis ! »", pause)
pol = [police(cc) for cc in cartes]
print(f"  polices obtenues : {pol}  (demandées 36)"
      f"{'  ⛔ RÉDUITES' if min(pol) < 35.5 else '  ✅'}")
if min(pol) < 35.5:
    ennuis.append("04 : cartes réduites")
print(f"  bas de la pause : {pc[2]:6.2f}"
      f"{'  ⛔ SOUS −2,15 (tête de Ti-Margo)' if pc[2] < -2.15 else '  ✅ au-dessus de −2,15'}")
if pc[2] < -2.15:
    ennuis.append("04 : la pause descend sur Ti-Margo")
if yc0 < -2.15 and xc1 > 5.54:
    ennuis.append("04 : les cartes descendent sur Ti-Margo")
    print("  ⛔ LES CARTES DESCENDENT SUR TI-MARGO")
ux0, ux1, uy0, uy1 = bloc("u (1 ; −2 ; 2)", NOMME("u", U04, C_VECTEUR, 40), 1.70, 1.9)

print("\n── 04b : les blocs de gauche (cartes : x ≥ %.2f, y ∈ [%.2f ; %.2f]) ──"
      % (xc0, yc0, yc1))
calc = VGroup(T("1² = 1", 30), T("(−2)² = +4", 30), T("2² = 4", 30),
              T(f"somme : {norme2(U04)}", 30)).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
cx0, cx1, cy0, cy1 = bloc("le calcul (4 lignes, sous u)", calc, 0.00, 1.9)
if cy1 > uy0:
    ennuis.append("04b : le calcul recouvre la donnée u")
    print(f"  ⛔ LE CALCUL RECOUVRE u (bas de u : {uy0:.2f})")
else:
    print(f"  écart calcul → u : {uy0 - cy1:.2f}  ✅")
rac04 = VGroup(RAC(norme2(U04), 36), T("= 3", 36)).arrange(RIGHT, buff=0.16,
                                                           aligned_edge=DOWN)
r0, r1, ry0, ry1 = bloc("« √9 = 3 » + cadre",
                        VGroup(rac04, SurroundingRectangle(rac04, buff=0.14,
                                                           stroke_width=3)), -1.55, 1.9)
if ry1 > cy0:
    ennuis.append("04b : le résultat recouvre le calcul")
    print("  ⛔ LE RÉSULTAT RECOUVRE LE CALCUL")
lA = VGroup(CROIX(0.12),
            VGroup(T(f"{norme2(U04)} : c'est le carré de la norme —", 26),
                   T("la racine a été oubliée", 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
lA.arrange(RIGHT, buff=0.18, aligned_edge=UP)
a0b, a1b, ay0b, ay1b = bloc("leurre A « le carré de la norme »", lA, -2.30, 4.6)
if ay1b > ry0:
    ennuis.append("04b : le leurre A recouvre le résultat")
    print("  ⛔ LE LEURRE A RECOUVRE LE RÉSULTAT")
lC = VGroup(CROIX(0.12),
            VGroup(T(f"{sum(U04)} : la somme des coordonnées,", 26),
                   T("1 − 2 + 2 : les carrés ont disparu", 26))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
lC.arrange(RIGHT, buff=0.18, aligned_edge=UP)
c0b, c1b, cy0c, cy1c = bloc("leurre C « la somme des coordonnées »", lC, -3.15, 4.6)
if cy1c > ay0b:
    ennuis.append("04b : le leurre C recouvre le leurre A")
    print("  ⛔ LE LEURRE C RECOUVRE LE LEURRE A")

print("\n── 05 : le repère, les deux points, la colonne de droite ──")
t05 = T("D'un point à l'autre", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 05", t05)
r05 = Repere3D(o=np.array([-4.95, -1.70, 0.0]), u=0.5, portee=5)
ax05 = r05.axes()
pA = r05.point(*A05, "A", couleur=C_REGARD, fs=26, decal=LEFT)
pB = r05.point(*B05, "B", couleur=C_REGARD, fs=26, decal=UR)
fAB = r05.vecteur(A05, B05, "A B", couleur=C_VECTEUR, sw=7, fs=26, decal=UL)
g05 = cadre("le repère + A + B + A B⃗", ax05, pA, pB, fAB)
noms05 = [m for m in ax05.submobjects if isinstance(m, Text)]
etiquettes("05", *[(m.text, m) for m in noms05], ("A", pA.nom), ("B", pB.nom),
           ("A B", fAB.nom))
loin_des_fleches("05", [("A B", fAB.fleche)],
                 [(m.text, m) for m in noms05] + [("A", pA.nom), ("B", pB.nom)])
d05 = droite_("A (1 ; 0 ; 2)", PTN("A", A05, C_REGARD, 28), 2.25)
contre_titre("05", t05, d05)
droite_("B (3 ; −1 ; 4)", PTN("B", B05, C_REGARD, 28), 1.45)
droite_("A B⃗ (2 ; −1 ; 2)", NOMME("A B", AB05, C_VECTEUR, 28), 0.55)
droite_("les trois carrés", T(" ; ".join(str(x) for x in carres(AB05)), 28), -0.30)
dd05 = droite_("« somme : 9 »", T(f"somme : {norme2(AB05)}", 28), -1.10)
fin05 = VGroup(T("la distance AB vaut", 30), RAC(norme2(AB05), 32), T("= 3", 30))
fin05.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
bf05 = bloc("la conclusion + cadre",
            VGroup(fin05, SurroundingRectangle(fin05, buff=0.14, stroke_width=3)),
            -2.95, 4.6)
if bf05[3] > dd05[2] and bf05[1] > 2.2:
    ennuis.append("05 : la conclusion recouvre la colonne de droite")
    print(f"  ⛔ RECOUVRE LA COLONNE (bas de « somme » : {dd05[2]:.2f})")
else:
    print(f"  écart colonne → conclusion : {dd05[2] - bf05[3]:.2f}  ✅")

print("\n── 06 : le 3-4-5, les trois pièges ──")
bang = VGroup(Triangle(stroke_width=4).scale(0.33),
              Text("!", font_size=30, weight=BOLD).shift(DOWN * 0.05))
t06 = VGroup(bang, T("La racine ne se distribue pas", 42)).arrange(RIGHT, buff=0.3)
t06.to_edge(UP, buff=0.5)
cadre("titre de l'écran 06", t06)
tri = triangle345(1.0).move_to(P(-4.60, 1.35))
e3 = T("3", 28).next_to(tri[1], RIGHT, buff=0.14)
e4 = T("4", 28).next_to(tri[0], DOWN, buff=0.14)
e5 = T("5", 28).next_to(tri[2].get_center(), UL, buff=0.10)
tx0, tx1, ty0b, ty1b = cadre("le 3-4-5 + ses trois nombres", tri, e3, e4, e5)
etiquettes("06", ("3", e3), ("4", e4), ("5", e5))
b06 = droite_("« √(3²+4²) ne fait PAS 3+4 » (3 lignes)",
              VGroup(CROIX(), VGroup(RAC("3² + 4²", 28), T("ne fait PAS", 28),
                                     T("3 + 4 = 7", 28))
                     .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
              .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.05)
contre_titre("06", t06, b06)
droite_("« elle fait √25 » (2 lignes)",
        VGroup(COCHE(0.14),
               VGroup(VGroup(T("elle fait", 28), RAC(25, 28))
                      .arrange(RIGHT, buff=0.12, aligned_edge=DOWN),
                      T("c'est-à-dire 5", 28))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), 0.55)
ex = VGroup(VGroup(RAC(14, 28), T("est une réponse ;", 28))
            .arrange(RIGHT, buff=0.12, aligned_edge=DOWN),
            T("3,74 est un arrondi", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
ex0, ex1, exy0, exy1 = bloc("« √14 / 3,74 » (2 lignes) + cadre",
                            VGroup(ex, SurroundingRectangle(ex, buff=0.14,
                                                            stroke_width=3)), -1.35, 1.9)
print(f"  écart 3-4-5 → bloc exact : {ty0b - exy1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if ty0b < exy1 else '  ✅'}")
if ty0b < exy1:
    ennuis.append("06 : le bloc « valeur exacte » touche le 3-4-5")
droite_("« une norme n'est JAMAIS négative »",
        VGroup(CROIX(), VGroup(T("une norme n'est", 28), T("JAMAIS négative", 28))
               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        .arrange(RIGHT, buff=0.22, aligned_edge=UP), -1.05)
fin06 = VGroup(T("au bac : la VALEUR EXACTE —", 26),
               T("l'arrondi seulement si on le demande", 26))
fin06.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
bf06 = bloc("la conclusion + cadre",
            VGroup(fin06, SurroundingRectangle(fin06, buff=0.14, stroke_width=3)),
            -2.95, 4.6)
if bf06[3] > exy0:
    ennuis.append("06 : la conclusion touche le bloc « valeur exacte »")
    print("  ⛔ LA CONCLUSION TOUCHE LE BLOC « VALEUR EXACTE »")

print("\n── 07 : la question-pause n° 2 (cartes larges, 6,3 à partir de 0,35) ──")
cA2 = RAC(5, 30)
cB2 = EcransEspace.choix3(E, "0, puisque les deux", "premières coordonnées",
                          "sont égales", 26)
cC2 = T("5", 32)
cC2.nb = [cC2]
tete2, q2, cartes2, pause2, rebours2 = EcransEspace.q_tete(
    E, [T("Que vaut la distance AB ?", 32)], [cA2, cB2, cC2], largeur=6.3, xl=0.35)
cadre("question (1 ligne)", q2)
x20, x21, y20, y21 = cadre("les trois cartes", cartes2)
pc2 = cadre("« Mets pause, et choisis ! »", pause2)
pol2 = [police(cc) for cc in cartes2]
# ⚠️ LE SEUIL TIENT COMPTE DE LA RÉDUCTION GLOBALE DE `col()` : des cartes de 6,3
# posées à xl = 0,35 finissent à 6,65, au-delà du bord de 6,60, donc `col()` réduit TOUT
# le bloc de 0,8 %. Mesuré sur E8 : fs 24 → 23,8. Ce n'est pas un défaut, c'est le
# gabarit — et c'est pour ça que le seuil est à 0,985 et non à l'égalité.
demandees2 = [30, 26, 32]
print(f"  polices obtenues : {pol2}  (demandées {demandees2})"
      f"{'  ⛔ RÉDUITES' if any(o < d * 0.985 for o, d in zip(pol2, demandees2)) else '  ✅'}")
if any(o < d * 0.985 for o, d in zip(pol2, demandees2)):
    ennuis.append("07 : cartes réduites")
print(f"  bas de la pause : {pc2[2]:6.2f}"
      f"{'  ⛔ SOUS −2,15 → à déplacer à gauche' if pc2[2] < -2.15 else '  ✅'}")
if pc2[2] < -2.15:
    ennuis.append("07 : la pause descend sur Ti-Margo")
if y20 < -2.15 and x21 > 5.54:
    ennuis.append("07 : les cartes descendent sur Ti-Margo")
    print("  ⛔ LES CARTES DESCENDENT SUR TI-MARGO")
don = VGroup(PTN("A", A07, C_REGARD, 30), PTN("B", B07, C_REGARD, 30))
don.arrange(DOWN, aligned_edge=LEFT, buff=0.30)
dx0, dx1, dy0, dy1 = bloc("la donnée A et B (2 lignes)", don, 1.70, -0.1)

print("\n── 07b : les blocs de gauche (cartes : x ≥ %.2f, y ∈ [%.2f ; %.2f]) ──"
      % (x20, y20, y21))
lAB = NOMME("A B", AB07, C_VECTEUR, 28)
e0, e1, ey0, ey1 = bloc("A B⃗ (0 ; 0 ; 5)", lAB, 0.45, -0.1)
if ey1 > dy0:
    ennuis.append("07b : A B⃗ recouvre la donnée")
    print("  ⛔ A B⃗ RECOUVRE LA DONNÉE")
else:
    print(f"  écart donnée → A B⃗ : {dy0 - ey1:.2f}  ✅")
norme7 = VGroup(VX("‖A B‖ =", ("A B",), 28), RAC("0 + 0 + 25", 28))
norme7.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
n0, n1, ny0, ny1 = bloc("« ‖A B⃗‖ = √(0+0+25) »", norme7, -0.35, -0.1)
if ny1 > ey0:
    ennuis.append("07b : la norme recouvre A B⃗")
    print("  ⛔ LA NORME RECOUVRE A B⃗")
don7 = VGroup(RAC(norme2(AB07), 32), T("= 5", 32)).arrange(RIGHT, buff=0.16,
                                                           aligned_edge=DOWN)
d0, d1, dy0b, dy1b = bloc("« √25 = 5 » + cadre",
                          VGroup(don7, SurroundingRectangle(don7, buff=0.14,
                                                            stroke_width=3)), -1.30, -0.1)
if dy1b > ny0:
    ennuis.append("07b : le résultat recouvre la norme")
    print("  ⛔ LE RÉSULTAT RECOUVRE LA NORME")
l1b = VGroup(COCHE(0.14), T("A et B sont l'un au-dessus de l'autre, à 5 unités", 26))
l1b.arrange(RIGHT, buff=0.20)
g1b = bloc("« l'un au-dessus de l'autre »", l1b, -2.25, 4.6)
if g1b[3] > y20 and g1b[1] > x20:
    ennuis.append("07b : le bloc recouvre les cartes")
    print(f"  ⛔ RECOUVRE LES CARTES (bas des cartes : {y20:.2f})")
else:
    print(f"  écart cartes → bloc : {y20 - g1b[3]:.2f}  ✅")
l2b = VGroup(CROIX(0.12),
             VGroup(VX("ce sont les coordonnées du vecteur A B qui sont nulles,",
                       ("A B",), 26), T("pas la distance", 26))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
l2b.arrange(RIGHT, buff=0.18, aligned_edge=UP)
g2b = bloc("leurre B (2 lignes)", l2b, -3.10, 4.6)
if g2b[3] > g1b[2]:
    ennuis.append("07b : le leurre B recouvre le bloc du dessus")
    print("  ⛔ LE LEURRE B RECOUVRE LE BLOC DU DESSUS")

print("\n── 08 : la copie, TROIS lignes ──")
copie = RoundedRectangle(width=10.2, height=2.8, corner_radius=0.18, stroke_width=3)
copie.move_to(P(-0.6, -0.35))
marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
             copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2)
t08 = T("Trois lignes, toujours dans cet ordre", 42).to_edge(UP, buff=0.5)
cadre("titre de l'écran 08", t08)
k0, k1, ky0, ky1 = cadre("la copie", copie)
print(f"  écart copie → titre : {float(t08.get_bottom()[1]) - ky1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if float(t08.get_bottom()[1]) < ky1 else '  ✅'}")
if float(t08.get_bottom()[1]) < ky1:
    ennuis.append("08 : la copie touche le titre")
l8a = VX("A B (… ; … ; …) : arrivée moins départ", ("A B",), 26)
l8b = VGroup(T("la somme des trois carrés :", 26), T("x² + y² + z²", 26))
l8b.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
l8c = T("la racine, en VALEUR EXACTE", 26)
rangs8 = [VGroup(EcransEspace.pastille(E, i + 1), corps).arrange(RIGHT, buff=0.30)
          for i, corps in enumerate((l8a, l8b, l8c))]
l8 = VGroup(*rangs8).arrange(DOWN, aligned_edge=LEFT, buff=0.26)
plafonne("les trois lignes (plafond de la copie)", l8, 8.6, copie.get_center())
l8.align_to(marge.get_center() + RIGHT * 0.3, LEFT)
h0b, h1b, hy0b, hy1b = cadre("les trois lignes, recalées sur la marge", l8)
if h1b > k1 - 0.2 or hy1b > ky1 - 0.05 or hy0b < ky0 + 0.05:
    ennuis.append("08 : le texte sort de la copie")
    print("  ⛔ LE TEXTE SORT DE LA COPIE")
rap8 = VGroup(T("et si l'énoncé parle de distance, finis par une phrase :", 26),
              T("« la distance AB vaut … »", 26)).arrange(DOWN, buff=0.10)
g8 = VGroup(rap8, SurroundingRectangle(rap8, buff=0.14, stroke_width=3))
g8.next_to(copie, DOWN, buff=0.26)
cadre("le rappel (2 lignes) sous la copie", g8)

print("\n── 09 : le cube, le repère, la consigne ──")
r09, cube09 = PsEspaceNormeDistanceBase.cube_repere(E, o=(-5.90, 0.20), u=1.4,
                                                    rouges=("C", "G"),
                                                    ecarte={"D": np.array([-0.30, 0.30, 0.0]),
                                                            "F": np.array([0.30, -0.30, 0.0])})
q0, q1c, qy0, qy1 = cadre("cube (u = 1,4), « F » écarté", cube09)
cadre("cube + les trois vecteurs de base", cube09,
      PsEspaceNormeDistanceBase.base_repere(E, r09))
cons = VGroup(T("dans le cube d'arête 1 :", 26), T("calcule la longueur AC,", 32),
              T("puis la longueur AG", 32))
cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
i0, i1, iy0, iy1 = bloc("la consigne (3 lignes)", cons, -1.75, 4.6)
print(f"  écart cube → consigne : {qy0 - iy1:.2f}"
      f"{'  ⛔ SE TOUCHENT' if qy0 < iy1 else '  ✅'}")
if qy0 < iy1:
    ennuis.append("09 : la consigne touche le cube")
pz = T("Mets pause, et cherche !", 30)
EcransEspace.gauche(E, pz, -3.10, xmax=4.6)
pz0, pz1, pzy0, pzy1 = cadre("pause + rebours (côte à côte)", pz,
                             CompteARebours(5, r=0.34, fs=32).next_to(pz, RIGHT,
                                                                      buff=0.35))
if pzy1 > iy0:
    ennuis.append("09 : la pause touche la consigne")
    print("  ⛔ LA PAUSE TOUCHE LA CONSIGNE")

print("\n── 09b : les deux diagonales, et la colonne de droite ──")
fAC = r09.vecteur(S["A"], S["C"], None, couleur=C_VECTEUR, sw=7)
fAG = r09.vecteur(S["A"], S["G"], None, couleur=C_REGARD, sw=7)
cg = Line(r09.pt(*S["C"]), r09.pt(*S["G"])).set_stroke(C_VECTEUR2, 8)
droit = r09.angle_droit(S["C"], S["A"], S["G"], taille=0.22, sw=3)
cadre("les deux diagonales + [C G] + l'angle droit", fAC, fAG, cg, droit)
print("  les noms de sommet, deux à deux :")
noms_sommets = {}
for s in "ABCDEFGH":
    for sub in cube09.submobjects:
        if isinstance(sub, Text) and sub.text == s:
            noms_sommets[s] = sub
etiquettes("09b", *[(s, m) for s, m in noms_sommets.items()])
# ⛔⛔ LE CONTRÔLE NEUF, ET IL PORTE SUR TOUS LES SEGMENTS TRACÉS — pas seulement sur
# les flèches. Premier jet : il ne testait que les deux diagonales, « D » et « F » ont
# donc été écartés pour les fuir… et se sont posés PILE SUR deux arêtes du cube, vu au
# gros plan ×2,8. Un contrôle qui ne connaît qu'une partie du dessin déplace le défaut
# au lieu de le corriger.
print("  les noms de sommet, contre TOUT segment tracé (arêtes + diagonales + [C G]) :")
_segments = [(f"arête {i}", m) for i, m in enumerate(cube09.submobjects)
             if isinstance(m, (Line, DashedLine))]
_segments += [("A C", fAC.fleche), ("A G", fAG.fleche), ("[C G]", cg)]
loin_des_fleches("09b", _segments, [(s, m) for s, m in noms_sommets.items()], seuil=0.10)
dC = droite_("C (1 ; 1 ; 0)", PTN("C", S["C"], C_REGARD, 28), 2.20)
droite_("A C⃗ (1 ; 1 ; 0)", NOMME("A C", AC, C_VECTEUR, 28), 1.40)
droite_("« 1 + 1 + 0 = 2 »", SOMC(AC, 26), 0.60)
rAC = VGroup(T("AC =", 30), RAC(norme2(AC), 30)).arrange(RIGHT, buff=0.14,
                                                         aligned_edge=DOWN)
droite_("« AC = √2 »", rAC, -0.15)
droite_("« ≈ 1,41 »", ENV(1.41, 26), -0.75)
droite_("G (1 ; 1 ; 1)", PTN("G", S["G"], C_REGARD, 28), -1.45)
dAG = droite_("« 1 + 1 + 1 = 3 »", SOMC(AG, 26), -2.10)
rAG = VGroup(T("AG =", 32), RAC(norme2(AG), 32), ENV(1.73, 26))
rAG.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
bAG = bloc("« AG = √3 ≈ 1,73 » + cadre",
           VGroup(rAG, SurroundingRectangle(rAG, buff=0.14, stroke_width=3)), -1.05, 1.9)
print(f"  écart cube → « AG = √3 » : {qy0 - bAG[3]:.2f}"
      f"{'  ⛔ SE TOUCHENT' if qy0 < bAG[3] else '  ✅'}")
if qy0 < bAG[3]:
    ennuis.append("09b : le cadre AG touche le cube")
ret = VGroup(T("dans un cube d'arête 1 :", 26),
             VGroup(T("la diagonale d'une face vaut", 26), RAC(norme2(AC), 26))
             .arrange(RIGHT, buff=0.12, aligned_edge=DOWN),
             VGroup(T("et la grande diagonale vaut", 26), RAC(norme2(AG), 26))
             .arrange(RIGHT, buff=0.12, aligned_edge=DOWN))
ret.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
br = bloc("« retiens » (3 lignes)", ret, -2.15, 4.6)
if br[3] > bAG[2]:
    ennuis.append("09b : « retiens » recouvre le cadre AG")
    print("  ⛔ « RETIENS » RECOUVRE LE CADRE AG")
fin9 = VGroup(T("si l'arête mesure a :", 28), RAC(norme2(AC), 28, coef="a"), T("et", 28),
              RAC(norme2(AG), 28, coef="a"))
fin9.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
bf9 = bloc("la conclusion + cadre",
           VGroup(fin9, SurroundingRectangle(fin9, buff=0.14, stroke_width=3)),
           -3.20, 4.6)
if bf9[3] > br[2]:
    ennuis.append("09b : la conclusion recouvre « retiens »")
    print("  ⛔ LA CONCLUSION RECOUVRE « RETIENS »")

print("\n── 10 : les quatre faits ──")
t10 = T("Ce que tu as appris", 46).to_edge(UP, buff=0.5)
cadre("titre de l'écran 10", t10)
d4 = VGroup(RAC(norme2(AC), 26), T("(une face),", 26), RAC(norme2(AG), 26),
            T("(la grande)", 26)).arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
blocs10 = [VGroup(T("la norme :", 26), T("la racine de la somme des trois carrés", 26))
           .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
           VGroup(T("la distance :", 26), VX("la norme du vecteur A B", ("A B",), 26))
           .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
           VGroup(T("la racine :", 26), T("elle ne se distribue JAMAIS", 26))
           .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
           VGroup(T("le cube d'arête 1 :", 26), d4)
           .arrange(RIGHT, buff=0.22, aligned_edge=DOWN)]
for _i, _b in enumerate(blocs10, start=1):
    print(f"    rangée {_i} : largeur {float(VGroup(COCHE(0.22), _b).arrange(RIGHT, buff=0.3, aligned_edge=UP).width):5.2f}"
          f"{'  ⛔ > 10,60' if float(_b.width) + 0.52 > 10.6 else ''}")
f10 = plafonne("les quatre faits (Ti-Margo 0,65 : x ≥ 5,30)",
               VGroup(*[VGroup(COCHE(0.22), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                        for b in blocs10]).arrange(DOWN, aligned_edge=LEFT, buff=0.46),
               10.6, P(-0.75, 0.10))
contre_titre("10", t10, f10)

print("\n── la passe arithmétique de l'épisode, refaite ici ──")
print(f"  ‖u‖² (02) = {norme2(U02)} → {norme2(U02) ** 0.5:.0f}    "
      f"‖u‖² (04) = {norme2(U04)} → {norme2(U04) ** 0.5:.0f}")
print(f"  A B⃗ (05) = {AB05}, somme {norme2(AB05)} → {norme2(AB05) ** 0.5:.0f}    "
      f"A B⃗ (07) = {AB07}, somme {norme2(AB07)} → {norme2(AB07) ** 0.5:.0f}")
print(f"  A C = √{norme2(AC)} ≈ {norme2(AC) ** 0.5:.4f}    "
      f"A G = √{norme2(AG)} ≈ {norme2(AG) ** 0.5:.4f}    "
      f"√101 ≈ {101 ** 0.5:.4f} (et non 11)")

print()
if ennuis:
    print("⛔ " + str(len(ennuis)) + " problème(s) : " + " | ".join(ennuis))
    sys.exit(1)
print("✅ aucune cote hors marge, aucun bloc rétréci, aucune réduction par un plafond")
