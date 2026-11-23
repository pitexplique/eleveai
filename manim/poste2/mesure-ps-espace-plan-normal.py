# manim/poste2/mesure-ps-espace-plan-normal.py
# LES COTES DE L'ÉPISODE 11 (« ps_espace_plan_normal »), MESURÉES SANS RENDRE.
#
# ⭐⭐ Recopié de `mesure-ps-espace-norme-distance.py` (épisode 9), qui porte la version
# la plus complète de l'outil : blocs RÉTRÉCIS, réductions PAR UN PLAFOND, colonne de
# droite comparée au TITRE (`contre_titre`, trou d'instrument de E7), étiquettes de
# figure DEUX À DEUX (`etiquettes`, E8), et étiquette comparée au FÛT de tout segment
# tracé (`loin_des_fleches`, E9).
#
# ⚠️ CE QUE CET ÉPISODE AJOUTE À L'OUTIL — `enchaine()` : une colonne entière passée en
# revue, paire par paire, EN UNE SEULE LIGNE D'APPEL. Ce n'est pas un contrôle neuf,
# c'est le contrôle de E9 rendu difficile à oublier — et il faut qu'il le soit, parce
# que le 23/11 l'épisode 10 a perdu un tour de rendu sur exactement ça : ses six blocs
# de la colonne de droite de 09b étaient mesurés un par un, et pas une seule paire
# n'était comparée. Le bloc des deux normes est passé PAR-DESSUS la ligne de calcul, et
# aucun instrument ne l'a dit — c'est le gros plan qui l'a montré.
# ⭐ La règle qui en sort : **un bloc mesuré tout seul ne prouve rien.** Ce qui abîme un
# écran, ce n'est presque jamais une cote hors marge, c'est DEUX cotes qui se croisent.
#
# ⚠️ ET LE MÊME JOUR, SUR LE MÊME ÉPISODE, LA COLONNE DE GAUCHE A PAYÉ LA MÊME FAUTE :
# « Saint-Pierre » n'était mesuré qu'EN PAIRE avec « Ravi », donc son bas disparaissait
# dans la boîte commune, et le cadre de conclusion l'a barré. D'où `seul()` ci-dessous,
# qui existe pour qu'on pense à mesurer un bloc À PART quand il est le bas d'une pile.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit
# le bloc à la largeur de sa plus longue ligne, et son second garde-fou (« bas sous
# −1,95 ET droite au-delà de 5,3 → réduire à 3,1 ») se déclenche au CENTIÈME près.
# Le critère : aucune ligne « RÉTRÉCI », aucune « HORS MARGE », aucun « RÉDUIT PAR LE
# PLAFOND », aucun chevauchement, aucune étiquette traversée.
#
#   python -X utf8 manim/poste2/mesure-ps-espace-plan-normal.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_NORMALE, C_PIEGE, C_PLAN, C_REGARD,  # noqa: E402
                      C_VECTEUR, C_VECTEUR2)
from espace_ecrans import P, EcransEspace, ligne_param  # noqa: E402
from ps_espace_plan_normal import (A05, A09, B04, C04, D02, D04, D06A,  # noqa: E402
                                   D06B, D07, D07P, D09, K09, N02, N04, N05,
                                   N06A, N06B, N07, N07P, N09, T09,
                                   PsEspacePlanNormalBase, d_depuis,
                                   norme2, normales_multiples, planche_clou)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
E = EcransEspace.__new__(PsEspacePlanNormalBase)
T = lambda s, fs, c=WHITE: EcransEspace.t(E, s, fs, c)                    # noqa: E731
TRIP = lambda t3, fs, **k: EcransEspace.trip(E, t3, fs, **k)              # noqa: E731
NOMME = lambda n, t3, c, fs: PsEspacePlanNormalBase.nomme(E, n, t3, c, fs)  # noqa: E731
CROIX = lambda r=0.13: EcransEspace.croix(E, r=r)                         # noqa: E731
VEC = lambda n, fs=28, c=WHITE: EcransEspace.vec(E, n, fs, c)             # noqa: E731
VX = lambda t, noms, fs=28, c=WHITE: EcransEspace.vexpr(E, t, noms, fs, c)  # noqa: E731
COCHE = lambda t=0.15: EcransEspace.coche(E, "#00FF7F", t)                # noqa: E731
EQP = lambda a, b, c, d, fs, co=WHITE: EcransEspace.eq_plan(E, a, b, c, d, fs, co)  # noqa: E731
PAST = lambda k, c, r=0.20: EcransEspace.pastille(E, k, c, r)             # noqa: E731
NB = lambda v: EcransEspace.nombre(E, v)                                  # noqa: E731
ennuis = []

# ⭐ La boîte de Ti-Margo, MESURÉE sur l'épisode 3 et jamais réestimée depuis :
# à scale 0,5 elle occupe x ∈ [5,54 ; 6,66] et y ∈ [−3,55 ; −2,15].
MARGO = {0.5: (5.54, 6.66, -3.55, -2.15),
         0.65: (5.30, 6.75, -3.55, -1.74),
         0.8: (5.06, 6.84, -3.55, -1.33)}


def police(carte):
    """LA PLUS PETITE police réellement obtenue par le corps d'une carte de choix.
    ⛔ « la plus petite » et non « la première » (leçon de E9 : le signe √ est dessiné à
    1,15 fois la police demandée et masquait un radicande rétréci)."""
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
    print(f"  {nom:48s} x ∈ [{x0:6.2f} ; {x1:6.2f}]   y ∈ [{y0:6.2f} ; {y1:6.2f}]{note}")
    return x0, x1, y0, y1


def seul(nom, mob):
    """⛔⛔ UN BLOC MESURÉ À PART, parce qu'il est le BAS d'une pile et que c'est son bas
    qui va rencontrer ce qui vient dessous. Mesuré dans la boîte commune de la pile, ce
    bas-là est invisible — c'est ce qui a laissé le cadre de conclusion de l'épisode 10
    barrer « Saint-Pierre » (23/11), après qu'une correction l'eut justement déplacé."""
    return cadre(nom, mob)


def plafonne(nom, mob, plafond, pos):
    """Un bloc large, borné par `scale_to_fit_width` puis centré sur `pos`.
    ⭐⭐ IL SIGNALE SA RÉDUCTION — correction de l'outil de E6, où un bloc réduit PAR LE
    PLAFOND lui-même ne sortait jamais (deux cas graves sur E7, dont la finale à −27 %)."""
    nat = float(mob.width)
    if nat > plafond:
        mob.scale_to_fit_width(plafond)
    mob.move_to(pos)
    bords = cadre(nom, mob)
    note = ""
    if nat > plafond + 0.01:
        note = f"  ⛔ RÉDUIT PAR LE PLAFOND de {100 * (1 - plafond / nat):.1f} %"
        ennuis.append(f"{nom} : réduit par le plafond")
    print(f"  {'':48s} largeur naturelle {nat:5.2f}   plafond {plafond:5.2f}{note}")
    return bords


def bloc(nom, mob, y, xmax):
    naturel = float(mob.width)
    EcransEspace.gauche(E, mob, y, xmax=xmax)
    return cadre(f"{nom} (y={y}, xmax={xmax})", mob, naturel=naturel)


def droite_(nom, mob, y, xl=2.2):
    naturel = float(mob.width)
    EcransEspace.col(E, mob, y, xl)
    return cadre(f"{nom} (y={y})", mob, naturel=naturel)


def dessous(cle, quoi, haut, bas):
    """Deux blocs empilés : le second passe-t-il SOUS le premier ?
    ⚠️ Et il ne suffit pas qu'ils ne se touchent pas : un écart de 0,05 se lit comme un
    chevauchement à l'image (mesuré sur E6, écran 07b)."""
    if bas[3] > haut[2]:
        ennuis.append(f"{cle} : {quoi}")
        print(f"  ⛔ {quoi.upper()}")
    else:
        e = haut[2] - bas[3]
        note = "  ✅" if e >= 0.10 else "  ⚠️ SERRÉ (< 0,10)"
        if e < 0.10:
            ennuis.append(f"{cle} : {quoi} — écart {e:.2f}")
        print(f"  écart ({quoi}) : {e:.2f}{note}")


def enchaine(cle, *blocs):
    """⛔⛔ TOUTE UNE COLONNE, PAIRE PAR PAIRE, EN UN SEUL APPEL.

    C'est le contrôle que l'épisode 10 n'avait PAS sur sa colonne de droite de 09b : six
    blocs mesurés un par un, aucune paire comparée, et le bloc des deux normes s'est
    écrit par-dessus la ligne de calcul. Vu au gros plan, par rien d'autre.
    ⭐ Prend des couples (nom, bords) DANS L'ORDRE DE HAUT EN BAS."""
    for (n1, b1), (n2, b2) in zip(blocs, blocs[1:]):
        dessous(cle, f"« {n2} » recouvre « {n1} »", b1, b2)


def margo(cle, nom, bords, scale=0.5):
    """LE RECOUVREMENT AVEC TI-MARGO, par les DEUX rectangles.
    ⛔ Et non par le seul seuil « bas < −2,15 » : ce seuil suppose que le bloc est SOUS
    elle, et il criait donc sur une pause déplacée en bas à GAUCHE, qui ne la touchait
    pas (défaut de l'instrument de l'épisode 10, corrigé le 23/11)."""
    mx0, mx1, my0, my1 = MARGO[scale]
    x0, x1, y0, y1 = bords
    if x1 > mx0 and x0 < mx1 and y1 > my0 and y0 < my1:
        ennuis.append(f"{cle} : « {nom} » recouvre Ti-Margo")
        print(f"  ⛔ « {nom} » RECOUVRE TI-MARGO")
    else:
        print(f"  « {nom} » ↔ Ti-Margo (s={scale}) : à l'écart  ✅")


def contre_titre(cle, titre, *blocs_droite):
    """⛔⛔ LE CONTRÔLE QUI MANQUAIT SUR E7 : le titre est posé par `to_edge`, la colonne
    par `col()`, et la mesure ne les COMPARAIT pas."""
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


def noms_axes(ax):
    """⛔⛔ LES TROIS NOMS D'AXES SONT DES ÉTIQUETTES, ET AUCUN INSTRUMENT NE LES VOYAIT.

    `r.axes()` rend un VGroup (flèche, nom) × 3 : les noms sont aux indices 1, 3 et 5.
    Ils étaient donc DESSINÉS sur tous les écrans à repère et comparés à RIEN — ni par
    `etiquettes()` (qui ne reçoit que ce qu'on lui donne), ni par `loin_des_fleches()`.
    Mesuré au gros plan sur le premier −ql de cet épisode, trois fois d'un coup :
      · écran 02, le nom de la normale et le « y » se rendaient en « n̄y » ;
      · écran 05, la pointe de n⃗ tombait sur la pointe de l'axe des x ;
      · écran 09b, le POINT A lui-même était collé au « y » — A (1 ; 1 ; 1) se projette
        à 8° de l'axe des y, et à 3 de portée leurs deux bouts sont au même rayon.
    ⭐ C'est la famille « les trois axes sont trois arêtes du cube » (E6) et « le vecteur
    v dessiné par-dessus l'axe des y » (E1) : un repère n'est pas un fond neutre, c'est
    un dessin de plus, et il faut le passer à la mesure comme les autres.
    ⚠️ On rend aussi les FÛTS des trois axes, pour `loin_des_fleches`."""
    return ([(ax[i].text, ax[i]) for i in (1, 3, 5)],
            [(f"axe {ax[i].text}", ax[i - 1].get_start(), ax[i - 1].get_end())
             for i in (1, 3, 5)])


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


def loin_des_fleches(cle, segments, etqs, seuil=0.08):
    """⛔⛔ UNE ÉTIQUETTE TRAVERSÉE PAR UN FÛT — le contrôle neuf de l'épisode 9.

    `etiquettes()` compare des boîtes ENTRE ELLES : il ne voit jamais une boîte contre
    un SEGMENT. ⚠️ On échantillonne le segment, PAS sa boîte — la boîte d'une flèche en
    diagonale est un grand rectangle presque vide, et testée ainsi elle crierait partout.
    ⚠️ Et il faut lui passer TOUS les segments tracés : la première version de E9 ne
    connaissait que les deux diagonales, et les deux noms écartés pour les fuir se sont
    posés PILE SUR deux arêtes (vu au gros plan)."""
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
        print(f"    « {nom_e:6s} » ↔ {coupable:12s} : {pire:.2f}{note}")


# ══════════════════════════════════════════════════════════════════════════
print("── 00 : la page de garde ──")
t00 = T("Vecteur normal à un plan", 46, "#FFD700").to_edge(UP, buff=0.5)
cadre("titre de l'écran 00", t00)
i00 = T("Maths Tle — EleveAI", 26, GREY_A).next_to(t00, DOWN, buff=0.18)
cadre("l'identité", i00)
_p = VGroup()
for txt, coul in (("les trois coefficients de l'équation", C_VECTEUR),
                  ("sont les coordonnées d'un vecteur", C_VECTEUR2)):
    _p.add(VGroup(Dot(radius=0.08, color=coul), T(txt, 36, coul)).arrange(RIGHT, buff=0.26))
_p.arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to(P(-0.9, 1.05))
b00 = cadre("les deux promesses", _p)
f00 = T("et ce vecteur donne la direction perpendiculaire", 30, "#00FF7F")
f00.move_to(P(-0.9, -1.55))
d00 = cadre("la ligne finale", f00)
ech = EcransEspace.echelle(E).align_to(P(0, -3.45), DOWN)
e00 = cadre("l'échelle des ceintures", ech)
# ⛔ MESURÉ SUR E5, où CETTE note annonçait −2,6 et avait tort : `echelle()` alignée en
# bas occupe y de −3,45 à −1,98. Une cote se remesure sur l'objet, elle ne se recopie pas.
dessous("00", "l'échelle recouvre la ligne finale", d00, e00)
margo("00", "la ligne finale", d00, 0.8)
margo("00", "les promesses", b00, 0.8)

print("\n── 01 : le clou et la planche ──")
XL1 = 0.2
fig1 = planche_clou(u=1.0).move_to(P(-4.15, 1.05))
nf1 = fig1.normale
gn1 = cadre("la planche + le clou + l'angle droit + n⃗", fig1)
# ⚠️ Le nom de la normale ne doit traverser NI son propre fût NI le clou : les deux sont
# verticaux et proches (c'est pour ça qu'ils sont à deux abscisses différentes).
loin_des_fleches("01",
                 [("le fût de n⃗", nf1[0].get_start(), nf1[0].get_end()),
                  ("le fût du clou", fig1.clou[0].get_start(), fig1.clou[0].get_end())],
                 [("n", nf1.nom)])
b1a = droite_("« le clou donne la direction… » (2 l.)",
              VGroup(T("le clou donne la direction", 28, C_REGARD),
                     T("perpendiculaire à la planche", 28, C_REGARD))
              .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 2.05, XL1)
b1b = droite_("« en maths, ce clou s'appelle… » (2 l.)",
              VGroup(T("en maths, ce clou s'appelle", 28, C_NORMALE),
                     VX("un vecteur normal n", ("n",), 28, C_NORMALE))
              .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 1.08, XL1)
enchaine("01", ("le clou donne la direction", b1a), ("en maths : un vecteur normal", b1b))
_f1 = VGroup(T("si tu as l'équation d'un plan,", 28),
             T("tu as déjà son vecteur normal — sans aucun calcul", 28))
_f1.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
f1 = bloc("la conclusion encadrée (2 l.)",
          VGroup(_f1, SurroundingRectangle(_f1, buff=0.16, stroke_width=3)), -2.25, 4.6)
dessous("01", "la conclusion recouvre la figure", gn1, f1)
margo("01", "la conclusion", f1)

print("\n── 02 : on LIT les coefficients ──")
t02 = T("Les coefficients SONT la normale", 44, "#FFD700").to_edge(UP, buff=0.5)
cadre("titre de l'écran 02", t02)
r02, ax02 = EcransEspace.repere(E, o=(-4.35, -1.15), u=0.52, portee=3)
pl02 = r02.plan(N02, d=D02, centre=(0, 0, 0), demi=1.00, couleur=C_PLAN, op=0.30, sw=3)
pied02 = tuple(float(x) for x in pl02.centre_plan)
bout02 = tuple(pied02[i] + 2.2 * N02[i] / norme2(N02) ** 0.5 for i in range(3))
nf02 = r02.vecteur(pied02, bout02, "n", couleur=C_NORMALE, sw=7,
                   decal=np.array([1.75, 0.75, 0.0]))
g02 = cadre("le repère + le plan + la normale", ax02, pl02, nf02)
_e02, _f02 = noms_axes(ax02)
etiquettes("02", ("n", nf02.nom), *_e02)
loin_des_fleches("02", _f02 + [("le fût de n⃗", nf02[0].get_start(), nf02[0].get_end())],
                 [("n", nf02.nom)])
XL2 = 0.2
e02 = droite_("l'équation 2x − y + 3z − 5 = 0", EQP(*N02, D02, 34), 2.05, XL2)
_fl = Arrow(ORIGIN, DOWN * 0.52, buff=0, stroke_width=4,
            max_tip_length_to_length_ratio=0.35, color=GREY_B)
_tr = NOMME("n", N02, C_NORMALE, 32)
_bl = VGroup(_fl, _tr).arrange(DOWN, buff=0.10)
n02 = droite_("la flèche « on lit » + n⃗ (2 ; −1 ; 3)", _bl, 1.10, XL2)
c02 = droite_("« les coefficients de x, de y et de z »",
              VGroup(T("les coefficients de x, de y et de z,", 26, GREY_A),
                     T("avec leurs signes", 26, GREY_A))
              .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.02, XL2)
contre_titre("02", t02, e02)
enchaine("02", ("l'équation", e02), ("n⃗ (2 ; −1 ; 3)", n02), ("les coefficients", c02))
_b2 = VGroup(CROIX(), VGroup(T(f"le terme constant {NB(D02)} :", 26, C_PIEGE),
                             T("où le plan se place, pas son orientation", 26, C_PIEGE))
             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
_b2.arrange(RIGHT, buff=0.20, aligned_edge=UP)
p02 = bloc("✗ « le terme constant »", _b2, -3.05, 4.6)
dessous("02", "le terme constant recouvre la figure", g02, p02)
margo("02", "le terme constant", p02)

print("\n── 03 : le théorème, dans les deux sens ──")
t03 = T("Et dans l'autre sens", 44, "#FFD700").to_edge(UP, buff=0.5)
cadre("titre de l'écran 03", t03)
_gA = VGroup(T("un point A", 30, C_REGARD),
             VX("et une normale n (a ; b ; c)", ("n",), 30, C_NORMALE))
_gA.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
_fe = Arrow(LEFT * 0.35, RIGHT * 0.35, buff=0, stroke_width=5,
            max_tip_length_to_length_ratio=0.32, color=GREY_B)
_gB = T("a x + b y + c z + d = 0", 30)
_tab = VGroup(_gA, _fe, _gB).arrange(RIGHT, buff=0.34)
g03 = plafonne("le tableau « ce qu'on a → ce qu'on écrit »", _tab, 12.0, P(-0.75, 1.55))
_l2 = VGroup(COCHE(0.16), T("d se trouve en remplaçant par les coordonnées de A",
                            28, "#00FF7F")).arrange(RIGHT, buff=0.22)
d03 = bloc("« d se trouve en remplaçant »", _l2, 0.50, 4.6)
_ra = VGroup(T("la raison :", 28, GREY_A),
             VX("M est dans P  ⟺  A M · n = 0", ("A M", "n"), 32))
_ra.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
r03 = bloc("la raison encadrée",
           VGroup(_ra, SurroundingRectangle(_ra, buff=0.18, stroke_width=3)), -1.35, 4.6)
contre_titre("03", t03, g03)
enchaine("03", ("le tableau", g03), ("« d se trouve… »", d03), ("la raison", r03))
margo("03", "la raison", r03)

print("\n── 04 / 04b : la question-pause n° 1 (réponse A) ──")
don4 = bloc("l'équation x − 2y + 5z + 7 = 0", EQP(*N04, D04, 42, C_REGARD), 1.45, 0.15)
rap4 = bloc("« un vecteur normal à ce plan ? »",
            T("un vecteur normal à ce plan ?", 26, GREY_A), 0.70, 0.15)
dessous("04", "le rappel recouvre l'équation", don4, rap4)
cA4, cB4, cC4 = (TRIP(N04, 30, par=True), TRIP(B04, 30, par=True), TRIP(C04, 30, par=True))
tete4, q4, cartes4, pause4, reb4 = EcransEspace.q_tete(
    E, [T("Quel est un vecteur normal", 26), T("au plan d'équation ci-contre ?", 26)],
    [cA4, cB4, cC4], largeur=5.0, xl=1.5)
cadre("la tête « Question ! »", tete4, reb4)
cadre("la question (2 lignes)", q4)
for _n, _c in zip("ABC", cartes4):
    print(f"    carte {_n} : police obtenue {police(_c):.1f} px")
    if police(_c) < 22:
        ennuis.append(f"04 : la carte {_n} tombe à {police(_c):.1f} px")
g4 = cadre("le bloc des trois cartes", VGroup(*cartes4))
p4 = cadre("la pause de l'écran 04", pause4)
margo("04", "les cartes", g4)
margo("04", "la pause", p4)
dessous("04", "la pause recouvre les cartes", g4, p4)

l41 = bloc("✓ « on lit les coefficients » (2 l.)",
           VGroup(COCHE(0.14), VGroup(T("on lit les coefficients", 28, "#00FF7F"),
                                      T("avec leurs signes", 28, "#00FF7F"))
                  .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
           .arrange(RIGHT, buff=0.20, aligned_edge=UP), 0.47, 0.15)
l42 = bloc("✗ « B a perdu le signe moins » (2 l.)",
           VGroup(CROIX(), VGroup(T("B a perdu le signe moins :", 28, C_PIEGE),
                                  T("une tout autre direction", 28, C_PIEGE))
                  .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
           .arrange(RIGHT, buff=0.20, aligned_edge=UP), -0.66, 0.15)
l43 = bloc("✗ « C a pris le terme constant » (2 l.)",
           VGroup(CROIX(), VGroup(T("C a pris le terme constant,", 28, C_PIEGE),
                                  T("qui ne dit rien de la direction", 28, C_PIEGE))
                  .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
           .arrange(RIGHT, buff=0.20, aligned_edge=UP), -1.84, 0.15)
l44 = bloc("« deux plans parallèles… » (2 l.)",
           VGroup(T("deux plans parallèles :", 26, C_REGARD),
                  T("même vecteur normal, termes constants différents", 26, C_REGARD))
           .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -3.03, 4.6)
enchaine("04b", ("l'équation", don4), ("on lit les coefficients", l41),
         ("B a perdu le signe", l42), ("C a pris le constant", l43),
         ("deux plans parallèles", l44))
margo("04b", "la dernière ligne", l44)

print("\n── 05 : on cherche l'équation ──")
t05 = T("Dans l'autre sens", 44, "#FFD700").to_edge(UP, buff=0.5)
cadre("titre de l'écran 05", t05)
d05 = d_depuis(N05, A05)
XL5 = 0.2
r05, ax05 = EcransEspace.repere(E, o=(-4.35, -0.80), u=0.56, portee=2)
pa05 = r05.point(*A05, "A", couleur=C_REGARD, decal=DOWN)
bout05 = tuple(A05[i] + 0.52 * N05[i] for i in range(3))
nf05 = r05.vecteur(A05, bout05, "n", couleur=C_NORMALE, sw=7, decal=DR)
pl05 = r05.plan(N05, d=d05, centre=A05, demi=1.05, couleur=C_PLAN, op=0.28, sw=3)
g05 = cadre("le repère + A + n⃗ + le plan", ax05, pl05, pa05, nf05)
_e05, _f05 = noms_axes(ax05)
etiquettes("05", ("A", pa05.nom), ("n", nf05.nom), *_e05)
loin_des_fleches("05", _f05 + [("le fût de n⃗", nf05[0].get_start(), nf05[0].get_end())],
                 [("A", pa05.nom), ("n", nf05.nom)])
_dn = VGroup(T("A", 30, C_REGARD), T("(", 30), TRIP(A05, 30), T(")", 30))
_dn.arrange(RIGHT, buff=0.10)
a05 = droite_("A (1 ; 2 ; −1)", _dn, 2.05, XL5)
n05b = droite_("n⃗ (3 ; 0 ; 1)", NOMME("n", N05, C_NORMALE, 30), 1.35, XL5)
e05a = droite_("« 3x + 0y + z + d = 0 »", T("3x + 0y + z + d = 0", 30), 0.50, XL5)
e05b = droite_("la substitution", T("3 × 1 + 0 + (−1) + d = 0", 28, GREY_A), -0.25, XL5)
_e3 = VGroup(T("2 + d = 0", 30), T(f"d = {NB(d05)}", 32, "#00FF7F"))
_e3.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
e05c = droite_("« 2 + d = 0 » puis « d = −2 »", _e3, -1.15, XL5)
contre_titre("05", t05, a05)
enchaine("05", ("A (1 ; 2 ; −1)", a05), ("n⃗ (3 ; 0 ; 1)", n05b),
         ("3x + 0y + z + d = 0", e05a), ("la substitution", e05b), ("d = −2", e05c))
margo("05", "« d = −2 »", e05c)
_fi5 = EQP(*N05, d05, 34, "#00FF7F")
f05 = bloc("l'équation finale encadrée",
           VGroup(_fi5, SurroundingRectangle(_fi5, buff=0.16, stroke_width=3)), -2.26, 1.9)
no5 = bloc("« le y absent » (2 l.)",
           VGroup(COCHE(0.14),
                  VGroup(T("le y absent : son coefficient est nul,", 24, C_REGARD),
                         T("le plan est parallèle à l'axe des y", 24, C_REGARD))
                  .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
           .arrange(RIGHT, buff=0.20, aligned_edge=UP), -3.11, 4.6)
dessous("05", "l'équation finale recouvre la figure", g05, f05)
dessous("05", "« le y absent » recouvre l'équation finale", f05, no5)
margo("05", "« le y absent »", no5)

print("\n── 06 : le piège — une normale n'est pas unique ──")
_tri = Triangle(color=C_PIEGE, stroke_width=5).scale(0.26)
_te = VGroup(_tri, T("!", 24, C_PIEGE).move_to(_tri.get_center() + DOWN * 0.03))
t06 = VGroup(_te, T("Une normale n'est pas unique", 42, C_PIEGE))
t06.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
cadre("titre de l'écran 06 (triangle dessiné)", t06)
fig6 = normales_multiples().move_to(P(-4.35, 1.25))
g06 = cadre("le plan à plat + les trois normales", fig6)
_dx = VGroup(EQP(*N06A, D06A, 28), T("÷ 2", 26, GREY_B), EQP(*N06B, D06B, 28))
_dx.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
XL6 = 0.2
e06 = droite_("les deux écritures + « ÷ 2 »", _dx, 2.00, XL6)
m06 = droite_("« le MÊME plan »", T("le MÊME plan", 26, "#00FF7F"), 0.95, XL6)
u06 = droite_("① « les normales… colinéaires ? » (2 l.)",
              VGroup(PAST(1, C_VECTEUR),
                     VGroup(T("les normales sont-elles", 26), T("colinéaires ?", 26))
                     .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
              .arrange(RIGHT, buff=0.20, aligned_edge=UP), 0.10, XL6)
n06 = droite_("« non → sécants »", T("non → sécants", 26, C_PIEGE), -0.55, XL6)
o06 = droite_("« oui → parallèles, puis un point » (2 l.)",
              VGroup(T("oui → parallèles,", 26, "#00FF7F"),
                     T("puis on teste UN point", 26, "#00FF7F"))
              .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.30, XL6)
contre_titre("06", t06[1], e06)
enchaine("06", ("les deux écritures", e06), ("le MÊME plan", m06),
         ("① colinéaires ?", u06), ("non → sécants", n06), ("oui → parallèles", o06))
margo("06", "« oui → parallèles »", o06)
_p6 = VGroup(T("normal ≠ directeur", 28, C_PIEGE),
             T("la normale d'un plan dirige toute droite", 26, C_REGARD),
             T("perpendiculaire à ce plan", 26, C_REGARD))
_p6.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
p06 = bloc("le second piège, encadré (3 l.)",
           VGroup(_p6, SurroundingRectangle(_p6, buff=0.16, stroke_width=3)), -2.45, 1.9)
dessous("06", "le second piège recouvre la figure", g06, p06)
margo("06", "le second piège", p06)

print("\n── 07 / 07b : la question-pause n° 2 (réponse B) ──")
_e71 = VGroup(T("P :", 30, C_VECTEUR), EQP(*N07, D07, 30)).arrange(RIGHT, buff=0.18)
e71 = bloc("P : x + y + z − 1 = 0", _e71, 1.55, 0.15)
_e72 = VGroup(T("P′ :", 30, C_VECTEUR2), EQP(*N07P, D07P, 30)).arrange(RIGHT, buff=0.18)
e72 = bloc("P′ : 2x + 2y + 2z + 6 = 0", _e72, 0.70, 0.15)
dessous("07", "P′ recouvre P", e71, e72)
cA7, cB7, cC7 = (T("sécants", 28), T("strictement parallèles", 28), T("confondus", 28))
tete7, q7, cartes7, pause7, reb7 = EcransEspace.q_tete(
    E, [T("Les plans P et P′", 26), T("sont :", 26)],
    [cA7, cB7, cC7], largeur=5.6, xl=1.0)
cadre("la tête « Question ! » (07)", tete7, reb7)
cadre("la question (2 lignes)", q7)
for _n, _c in zip("ABC", cartes7):
    print(f"    carte {_n} : police obtenue {police(_c):.1f} px")
    if police(_c) < 22:
        ennuis.append(f"07 : la carte {_n} tombe à {police(_c):.1f} px")
g7 = cadre("le bloc des trois cartes (07)", VGroup(*cartes7))
p7 = cadre("la pause de l'écran 07", pause7)
margo("07", "les cartes", g7)
margo("07", "la pause", p7)
dessous("07", "la pause recouvre les cartes", g7, p7)

_l71 = VGroup(COCHE(0.14), VGroup(NOMME("n", N07, C_VECTEUR, 26),
                                  NOMME("n", N07P, C_VECTEUR2, 26),
                                  T("colinéaires → parallèles", 26, "#00FF7F"))
              .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
_l71.arrange(RIGHT, buff=0.20, aligned_edge=UP)
l71 = bloc("✓ les deux normales + « colinéaires » (3 l.)", _l71, -0.20, 0.15)
_l72 = VGroup(T("P′ ÷ 2 :", 26, GREY_A), EQP(1, 1, 1, int(D07P / 2), 28))
_l72.arrange(RIGHT, buff=0.18)
l72 = bloc("« P′ ÷ 2 : x + y + z + 3 = 0 »", _l72, -1.30, 0.15)
l73 = bloc("✗ « 3 ≠ −1 : pas les mêmes plans »",
           VGroup(CROIX(), T(f"{NB(3)} ≠ {NB(D07)} : pas les mêmes plans", 26, C_PIEGE))
           .arrange(RIGHT, buff=0.20), -2.25, 0.15)
_f7 = T("strictement parallèles — sans aucun point commun", 28, "#00FF7F")
f07 = bloc("la conclusion encadrée (07b)",
           VGroup(_f7, SurroundingRectangle(_f7, buff=0.14, stroke_width=3)), -3.20, 4.6)
enchaine("07b", ("P′", e72), ("les deux normales", l71), ("P′ ÷ 2", l72),
         ("3 ≠ −1", l73), ("la conclusion", f07))
margo("07b", "la conclusion", f07)

print("\n── 08 : les deux rédactions ──")
t08 = T("Deux rédactions à connaître", 44, "#FFD700").to_edge(UP, buff=0.5)
cadre("titre de l'écran 08", t08)
_r1 = VGroup(VX("n est un vecteur normal à P,", ("n",), 23, C_NORMALE),
             T("donc P a une équation", 23), T("a x + b y + c z + d = 0,", 23),
             T("et le point A donne d", 23, "#00FF7F"))
_r1.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
_t1 = VGroup(PAST(1, C_VECTEUR), T("pour une équation", 27, C_VECTEUR)).arrange(RIGHT, buff=0.18)
_b1 = VGroup(_t1, _r1).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
_g1 = VGroup(_b1, SurroundingRectangle(_b1, buff=0.18, stroke_width=3))
_r2 = VGroup(T("on écrit la droite qui passe", 23),
             VX("par le point, de direction n,", ("n",), 23),
             T("puis son intersection avec P :", 23),
             T("le point trouvé EST le projeté", 23, "#00FF7F"))
_r2.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
_t2 = VGroup(PAST(2, C_NORMALE), T("pour un projeté orthogonal", 27, C_NORMALE)).arrange(RIGHT, buff=0.18)
_b2r = VGroup(_t2, _r2).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
_g2 = VGroup(_b2r, SurroundingRectangle(_b2r, buff=0.18, stroke_width=3))
_tt = VGroup(_g1, _g2).arrange(RIGHT, buff=0.45, aligned_edge=UP)
g08 = plafonne("les deux rédactions encadrées", _tt, 11.5, P(-0.75, 0.15))
contre_titre("08", t08, g08)
margo("08", "les deux rédactions", g08)

print("\n── 09 / 09b : le défi et sa correction ──")
_te9 = VGroup(Circle(radius=0.19, color="#F97316"), T("À toi de jouer !", 42, "#F97316"))
_te9.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
cadre("titre de l'écran 09 (approché)", _te9)
r09, ax09 = EcransEspace.repere(E, o=(-4.60, -1.05), u=0.98, portee=1)
ax09[1].shift(RIGHT * 0.10 + DOWN * 0.10)
ax09[3].shift(RIGHT * 0.30)
XL9 = 0.2
pa09 = r09.point(*A09, "A", couleur=C_REGARD, decal=UL, escalier=True)
pk09 = r09.point(*K09, "K", couleur="#00FF7F", decal=DR, r=0.095)
_bas = tuple(A09[i] + (T09 - 0.35) * N09[i] for i in range(3))
_haut = tuple(A09[i] + 0.55 * N09[i] for i in range(3))
dr09 = Line(r09.pt(*_haut), r09.pt(*_bas), stroke_width=5, color=C_NORMALE)
g09 = cadre("le repère + A (écran 09)", ax09, pa09)
g09b = cadre("… + la droite normale et K (écran 09b)", ax09, pa09, dr09, pk09)
_e09, _f09 = noms_axes(ax09)
etiquettes("09b", ("A", pa09.nom), ("K", pk09.nom), *_e09)
# ⛔⛔ ET LE DISQUE DU POINT, PAS SEULEMENT SON NOM : à l'écran 09b c'est le DOT de A
# qui touchait le « y », pas son étiquette. Un point est un objet dessiné.
etiquettes("09b (disques)", ("•A", pa09[0]), ("•K", pk09[0]), *_e09)
# ⛔⛔ LA DROITE NORMALE PASSE EXACTEMENT PAR A ET PAR K : leurs deux noms sont donc les
# plus exposés de l'épisode. C'est le défaut de E9 (le nom « D » à 0,00 du fût de A⃗G).
# ⛔ LES TROIS BARREAUX DE L'ESCALIER SONT DES SEGMENTS TRACÉS : ils passent donc à
# `loin_des_fleches` comme les axes et la droite normale. Le barreau vertical monte
# juste à côté du nom de l'axe des x, et rien d'autre ne le dirait.
_esc = [(f"escalier {i}", m.get_start(), m.get_end())
        for i, m in enumerate(pa09.escalier, 1)]
loin_des_fleches("09b", [("la droite normale", dr09.get_start(), dr09.get_end())] + _esc + _f09,
                 [("A", pa09.nom), ("K", pk09.nom)] + _e09)
_eq9 = VGroup(T("P :", 30, C_PLAN), EQP(*N09, D09, 30)).arrange(RIGHT, buff=0.18)
q09 = droite_("P : x + y + z = 0", _eq9, 2.05, XL9)
_dn9 = VGroup(T("A", 30, C_REGARD), T("(", 30), TRIP(A09, 30), T(")", 30))
_dn9.arrange(RIGHT, buff=0.10)
a09 = droite_("A (1 ; 1 ; 1)", _dn9, 1.25, XL9)
enchaine("09", ("P : x + y + z = 0", q09), ("A (1 ; 1 ; 1)", a09))
_co9 = VGroup(T("détermine les coordonnées", 30), T("du projeté orthogonal de A sur P", 30))
_co9.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
c09 = bloc("la consigne (2 l.)", _co9, -2.20, 4.6)
pz9 = bloc("« Mets pause, et cherche ! »", T("Mets pause, et cherche !", 30, "#F97316"),
           -3.10, 4.6)
dessous("09", "la consigne recouvre le repère", g09, c09)
dessous("09", "la pause recouvre la consigne", c09, pz9)
margo("09", "la consigne", c09)
margo("09", "la pause", pz9)

n09 = droite_("n⃗ (1 ; 1 ; 1)", NOMME("n", N09, C_NORMALE, 28), 0.55, XL9)
_sy = EcransEspace.systeme(E, [ligne_param(v, A09[i], N09[i])
                               for i, v in enumerate(("x", "y", "z"))], fs=28)
s09 = droite_("le système paramétrique (accolade)", _sy, -0.45, XL9)
b09 = droite_("la substitution → 3 + 3t (2 l.)",
              VGroup(T("(1 + t) + (1 + t) + (1 + t)", 26, GREY_A),
                     T("= 3 + 3t", 26, GREY_A))
              .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.60, XL9)
_re = VGroup(T("3 + 3t = 0", 28), T(f"t = {NB(T09)}", 30, "#00FF7F"))
_re.arrange(RIGHT, buff=0.26, aligned_edge=DOWN)
t09b = droite_("« 3 + 3t = 0 » puis « t = −1 »", _re, -2.35, XL9)
enchaine("09b", ("P : x + y + z = 0", q09), ("A (1 ; 1 ; 1)", a09), ("n⃗ (1 ; 1 ; 1)", n09),
         ("le système", s09), ("la substitution", b09), ("t = −1", t09b))
margo("09b", "« t = −1 »", t09b)
rp9 = bloc("« 1 − 1 = 0 »", T("1 − 1 = 0", 28, C_REGARD), -1.95, 1.9)
_fk = VGroup(T("K", 30, "#00FF7F"), T("(", 30, "#00FF7F"), TRIP(K09, 30, color="#00FF7F"),
             T(")", 30, "#00FF7F"), T(": l'origine", 28, "#00FF7F"))
_fk.arrange(RIGHT, buff=0.10)
fk9 = bloc("K (0 ; 0 ; 0) encadré",
           VGroup(_fk, SurroundingRectangle(_fk, buff=0.14, stroke_width=3)), -2.60, 1.9)
vr9 = bloc("la vérification « 0 + 0 + 0 = 0 »",
           VGroup(COCHE(0.14), T("vérification : 0 + 0 + 0 = 0", 26, C_REGARD))
           .arrange(RIGHT, buff=0.20), -3.25, 4.6)
dessous("09b", "« 1 − 1 = 0 » recouvre la figure", g09b, rp9)
enchaine("09b (gauche)", ("1 − 1 = 0", rp9), ("K (0 ; 0 ; 0)", fk9), ("la vérification", vr9))
margo("09b", "la vérification", vr9)

print("\n── 10 : la finale ──")
t10 = T("Ce que tu as appris", 46, "#FFD700").to_edge(UP, buff=0.5)
cadre("titre de l'écran 10", t10)
_faits = (("les coefficients :", C_REGARD, "a x + b y + c z + d = 0  →  n (a ; b ; c)", ("n",)),
          ("un point + une normale :", C_VECTEUR, "suffisent pour l'équation", None),
          ("deux normales colinéaires :", C_NORMALE, "deux plans parallèles", None),
          ("un projeté orthogonal :", "#00FF7F", "on suit la normale", None))
_bl = []
for _g, _cg, _d, _dn in _faits:
    _dr = VX(_d, _dn, 26) if _dn else T(_d, 26)
    _bl.append(VGroup(T(_g, 26, _cg), _dr).arrange(RIGHT, buff=0.22, aligned_edge=DOWN))
_li = VGroup(*[VGroup(COCHE(0.22), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in _bl])
_li.arrange(DOWN, aligned_edge=LEFT, buff=0.46)
g10 = plafonne("les 4 rangées de la finale", _li, 11.0, P(-0.75, 0.10))
contre_titre("10", t10, g10)
margo("10", "les 4 rangées", g10, 0.65)

print("\n" + "=" * 78)
if ennuis:
    print(f"⛔ {len(ennuis)} ENNUI(S) :")
    for e in ennuis:
        print(f"   · {e}")
    sys.exit(1)
print("✅ aucune cote hors marge, aucun bloc rétréci, aucune réduction par un plafond,")
print("   aucun chevauchement, aucune étiquette traversée, rien sur Ti-Margo.")
