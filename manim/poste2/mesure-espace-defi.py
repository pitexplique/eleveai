# manim/poste2/mesure-espace-defi.py
# LES COTES DE L'ÉPISODE 6 (« espace_defi »), MESURÉES SANS RENDRE.
#
# ⭐⭐ POURQUOI CE FICHIER EXISTE. Deux leçons de la série se rejoignent ici :
#   · « un chiffre non mesuré est un souvenir » — toute cote écrite dans un épisode doit
#     venir d'une commande, pas d'une estimation ;
#   · « une cote se remesure sur l'objet, elle ne se recopie pas » — l'épisode 5 a posé un
#     bloc de deux lignes en se fiant à « la bande libre est y ≈ −2,0 » écrit dans la note
#     de reprise, et les ceintures se sont écrites par-dessus (elles montent à −1,98).
# Rien ici n'utilise le renderer : `Text`, `VGroup` et `Repere3D` se mesurent à froid, et
# `q_tete` s'appelle sur `EcransEspace.__new__(…)` (recette de l'épisode 3).
#
# CE QU'IL A ATTRAPÉ SUR CET ÉPISODE, avant tout rendu :
#   · le tableau des huit sommets rétréci à 21 px par `gauche(xmax=1.6)` (9,25 pour 8,10) ;
#   · la carte A de la question 1 à 26,4 px dans une carte de 4,1 (triplet trop large) ;
#   · les choix de la question 2 à 22,1 px, puis à **20,4 px** quand on les met sur trois
#     lignes — le garde-fou Ti-Margo de `col()` mesure les cartes centrées en y = 0 ;
#   · quatre blocs de 06, 07b et 09b rétrécis parce qu'ils demandaient 8,10 de large alors
#     que la place réelle, SOUS les cartes, est de 11,10.
#
# ⚠️ À RELANCER APRÈS CHAQUE CHANGEMENT d'une question ou d'une police : `col()` réduit le
# bloc à la largeur de sa plus longue ligne, donc toucher UN mot déplace tout ce qui pend
# dessous. Le critère : aucune ligne « RÉTRÉCI », aucune « HORS MARGE », aucun
# chevauchement dans les colonnes de y.
#
#   python -X utf8 manim/poste2/mesure-espace-defi.py

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from espace_ecrans import P, EcransEspace  # noqa: E402
from espace_defi import (S, OMEGA, EspaceDefiBase, cavaliere,  # noqa: E402
                         se_croisent_a_lecran)

MARGE_X, MARGE_Y = 6.68, 3.573          # la marge de 3 %
E = EcransEspace.__new__(EspaceDefiBase)
T = lambda s, fs: EcransEspace.t(E, s, fs)                      # noqa: E731
TRIP = lambda t3, fs, **k: EcransEspace.trip(E, t3, fs, **k)    # noqa: E731
ennuis = []


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
    print(f"  {nom:36s} x ∈ [{x0:6.2f} ; {x1:6.2f}]   y ∈ [{y0:6.2f} ; {y1:6.2f}]{note}")
    return x0, x1, y0, y1


def bloc(nom, mob, y, xmax):
    naturel = float(mob.width)
    EcransEspace.gauche(E, mob, y, xmax=xmax)
    return cadre(f"{nom} (y={y}, xmax={xmax})", mob, naturel=naturel)


def droite_(nom, mob, y, xl=2.2):
    naturel = float(mob.width)
    EcransEspace.col(E, mob, y, xl)
    return cadre(f"{nom} (y={y})", mob, naturel=naturel)


print("── les six repères de l'épisode (cube unité + axes portée 2) ──")
for nom, o, u in (("01-situation", (-5.1, -0.75), 1.3),
                  ("02-idee", (-5.2, 0.0), 1.25),
                  ("04-question / 04b", (-5.4, 0.35), 1.5),
                  ("05-appliquer", (-5.3, -1.60), 1.6),
                  ("06-piege", (-5.1, -1.00), 1.3),
                  ("09-defi / 09b", (-5.3, 0.30), 1.3)):
    r, cube = EspaceDefiBase.cube_repere(E, o=o, u=u)
    cadre(nom, cube)
R02, CUBE02 = EspaceDefiBase.cube_repere(E, o=(-5.2, 0.0), u=1.25)
cadre("02 + les trois vecteurs de base", CUBE02, EspaceDefiBase.base_repere(E, R02))
OM = R02.pt(*OMEGA)
print(f"  centre du cube a l ecran : ({float(OM[0]):.2f} ; {float(OM[1]):.2f})")

print("\n── 02 : le tableau des huit sommets (2 rangées de 4, pleine largeur) ──")
rangees = VGroup()
for groupe in ("ABCD", "EFGH"):
    rangee = VGroup(*[EspaceDefiBase.coords(E, s, S[s], 24) for s in groupe])
    rangee.arrange(RIGHT, buff=0.42)
    rangees.add(rangee)
rangees.arrange(DOWN, aligned_edge=LEFT, buff=0.26)
nat = float(rangees.width)
if rangees.width > 11.0:
    rangees.scale_to_fit_width(11.0)
rangees.move_to(P(-0.9, -2.55))
cadre("tableau centré en x = −0,9", rangees, naturel=nat)

print("\n── 04 : les cartes à TRIPLETS (largeur 4,9, xl 1,65) ──")
tete, q, cartes, pause, rebours = EcransEspace.q_tete(
    E, ["quelles sont les coordonnées", "du centre du cube ?"],
    [TRIP(OMEGA, 32), TRIP(S["G"], 32), TRIP((0.5, 0.5, 1), 32)], largeur=4.9, xl=1.65)
cadre("tête « Question ! » + rebours", tete, rebours)
cadre("question (2 lignes)", q)
cadre("les trois cartes", cartes)
cadre("« Mets pause, et choisis ! »", pause)
pol = [round(float(c[1][1][0].font_size), 1) for c in cartes]
print(f"  polices obtenues : {pol}  (demandée 32)"
      f"{'  ⛔ RÉDUITES' if min(pol) < 31.5 else '  ✅'}")
if min(pol) < 31.5:
    ennuis.append("04 : cartes réduites")

print("\n── 04b : les quatre blocs de gauche ──")
fs = 28
bloc("l1 « le centre est le milieu »",
     VGroup(T("le centre est le milieu de", fs), T("la grande diagonale A G", fs))
     .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -0.65, 1.45)
bloc("la moyenne de (0;0;0) et (1;1;1)",
     VGroup(T("la moyenne de", fs), TRIP(S["A"], fs), T("et de", fs), TRIP(S["G"], fs))
     .arrange(RIGHT, buff=0.22), -1.55, 4.6)
bloc("leurre B « le sommet G »",
     VGroup(EcransEspace.croix(E, r=0.13), TRIP(S["G"], fs), T(": le sommet G lui-même", fs))
     .arrange(RIGHT, buff=0.20), -2.25, 4.6)
bloc("leurre C « le centre de la face »",
     VGroup(VGroup(EcransEspace.croix(E, r=0.13), TRIP((0.5, 0.5, 1), fs),
                   T(": le centre de la face", fs)).arrange(RIGHT, buff=0.20),
            T("du haut E F G H — la hauteur 1 aurait dû t'alerter", 26))
     .arrange(DOWN, aligned_edge=LEFT, buff=0.12), -3.00, 4.6)

print("\n── 05 : la colonne de droite ──")
droite_("A Ω (0,5 ; 0,5 ; 0,5)",
        VGroup(T("A Ω", fs), TRIP(OMEGA, fs)).arrange(RIGHT, buff=0.24), 2.45)
droite_("A G (1 ; 1 ; 1)",
        VGroup(T("A G", fs), TRIP(S["G"], fs)).arrange(RIGHT, buff=0.24), 1.60)
droite_("(1;1;1) = / 2 × (0,5;0,5;0,5)",
        VGroup(VGroup(TRIP(S["G"], fs), T("=", fs)).arrange(RIGHT, buff=0.18),
               VGroup(T("2 ×", fs), TRIP(OMEGA, fs, par=True)).arrange(RIGHT, buff=0.18))
        .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 0.70)
eg = T("A G = 2 A Ω", 34)
droite_("A G = 2 A Ω + cadre",
        VGroup(eg, SurroundingRectangle(eg, buff=0.14, stroke_width=3)), -0.20)
droite_("colinéaires",
        VGroup(EcransEspace.coche(E, "#16a34a", 0.15), T("colinéaires", 32)).arrange(RIGHT, buff=0.22),
        -1.10)
droite_("A, Ω et G alignés",
        VGroup(EcransEspace.coche(E, "#16a34a", 0.15), T("A, Ω et G alignés", 32)).arrange(RIGHT, buff=0.22),
        -1.69)
bloc("« deux lignes, et c'est démontré »", T("deux lignes, et c'est démontré", 32), -2.80, 1.6)

print("\n── 06 : les trois lignes du second piège ──")
bloc("« deuxième piège : le repère »", T("deuxième piège, plus discret : le repère", 28),
     -2.05, 1.9)
bloc("« l'arête vaut 1 / 6 cm »",
     VGroup(T("l'arête du cube vaut", 28), T("1", 32), T(", même si ton brouillon dit", 28),
            T("6 cm", 32)).arrange(RIGHT, buff=0.16), -2.65, 4.6)
bloc("« des zéros et des uns »", T("des zéros et des uns, pas des centimètres", 30), -3.20, 4.6)

print("\n── 07 : les cartes à PHRASES (largeur 6,3, xl 0,35 ; B sur trois lignes) ──")
tete2, q2, cartes2, pause2, rebours2 = EcransEspace.q_tete(
    E, ["que fait-on ?"],
    [EcransEspace.choix2(E, "on montre que A B et", "A C ont la même norme", fs=26),
     EcransEspace.choix3(E, "on montre que les", "vecteurs A B et A C", "sont colinéaires", fs=26),
     EcransEspace.choix2(E, "on montre qu'ils sont", "dans un même plan", fs=26)],
    largeur=6.3, xl=0.35)
cadre("question (1 ligne)", q2)
cadre("les trois cartes", cartes2)
cadre("« Mets pause, et choisis ! »", pause2)
pol2 = [round(float(c[1][1][0].font_size), 1) for c in cartes2]
print(f"  polices obtenues : {pol2}  (demandée 26)"
      f"{'  ⚠️ réduites' if min(pol2) < 25.5 else '  ✅'}")
bloc("intro (3 lignes)",
     VGroup(T("pour démontrer que trois points", 28), T("A, B et C de l'espace", 28),
            T("sont alignés", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.14), 1.70, -0.1)

print("\n── 07b : les quatre blocs de gauche ──")
bloc("« on cherche un nombre k »",
     VGroup(T("on cherche un nombre k tel que", 28), T("A C = k × A B", 34))
     .arrange(DOWN, aligned_edge=LEFT, buff=0.14), -0.35, -0.1)
bloc("« la même norme » (3 lignes, 24)",
     VGroup(VGroup(EcransEspace.croix(E, r=0.12), T("la même norme : B et C sont", 24))
            .arrange(RIGHT, buff=0.18),
            T("à la même distance de A —", 24), T("rien à voir avec l'alignement", 24))
     .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.45, -0.1)
bloc("« toujours dans un même plan »",
     T("trois points de l'espace sont TOUJOURS dans un même plan", 26), -2.50, 4.6)
j4 = T("vrai, et ça ne démontre jamais rien", 32)
bloc("conclusion + cadre", VGroup(j4, SurroundingRectangle(j4, buff=0.14, stroke_width=3)),
     -3.17, 4.6)

print("\n── 01 : la chaîne des quatre maillons (colonne de droite, xl 2,8) ──")
ch = VGroup()
for txt in ("des coordonnées", "une droite", "un plan", "une intersection"):
    ch.add(VGroup(T("→", 26), T(txt, 26)).arrange(RIGHT, buff=0.14))
ch.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
droite_("la chaîne (4 lignes)", ch, -1.05, 2.8)

print("\n── 09 : les trois questions À GAUCHE, sous le cube ──")
from espace_ecrans import CompteARebours  # noqa: E402
for k, lignes_q, y in ((1, ["vérifie que B et E sont dans P"], -0.45),
                       (2, ["donne une représentation paramétrique", "de la droite A G"], -1.25),
                       (3, ["trouve le point d'intersection de la droite A G", "et du plan P"], -2.15)):
    corps = VGroup(*[T(x, 26) for x in lignes_q]).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
    bloc(f"question {k}", VGroup(EcransEspace.pastille(E, k), corps)
         .arrange(RIGHT, buff=0.26, aligned_edge=UP), y, 4.6)
pz = T("Mets pause, et cherche !", 30)
EcransEspace.gauche(E, pz, -3.05, xmax=4.6)
cadre("pause + rebours (côte à côte)", pz,
      CompteARebours(5, r=0.34, fs=32).next_to(pz, RIGHT, buff=0.35))

print("\n── 09b : la colonne de droite (l'équation de P reste, bas 2,13) ──")
droite_("B (1;0;0) + 1 + 0 − 1 = 0",
        VGroup(VGroup(T("B", 26), TRIP(S["B"], 26)).arrange(RIGHT, buff=0.20),
               EcransEspace.eq_zero(E, "1 + 0 − 1", 26)).arrange(DOWN, aligned_edge=LEFT, buff=0.10),
        1.55)
droite_("E (0;0;1) + 0 + 1 − 1 = 0",
        VGroup(VGroup(T("E", 26), TRIP(S["E"], 26)).arrange(RIGHT, buff=0.20),
               EcransEspace.eq_zero(E, "0 + 1 − 1", 26)).arrange(DOWN, aligned_edge=LEFT, buff=0.10),
        0.55)
droite_("A G (1;1;1) / A = origine",
        VGroup(VGroup(T("A G", 26), TRIP(S["G"], 26)).arrange(RIGHT, buff=0.18),
               T("A = origine", 26)).arrange(DOWN, aligned_edge=LEFT, buff=0.10), -0.35)
droite_("système x = t, y = t, z = t",
        EcransEspace.systeme(E, ["x = t", "y = t", "z = t"], 30), -1.30)

print("\n── 09b : les trois blocs de gauche ──")
bloc("substitution → t = 0,5 (2 lignes)",
     VGroup(VGroup(T("on remplace :", 28), EcransEspace.eq_zero(E, "t + t − 1", 30))
            .arrange(RIGHT, buff=0.14),
            VGroup(T("donc", 28), T("2t = 1", 30), T(", donc", 28), T("t = 0,5", 32))
            .arrange(RIGHT, buff=0.14)).arrange(DOWN, aligned_edge=LEFT, buff=0.12),
     -1.30, 1.9)
cc = VGroup(T("le point d'intersection est", 32),
            VGroup(T("le centre du cube", 32), TRIP(OMEGA, 30)).arrange(RIGHT, buff=0.24)
            ).arrange(DOWN, aligned_edge=LEFT, buff=0.10)
bloc("conclusion + cadre",
     VGroup(cc, SurroundingRectangle(cc, buff=0.14, stroke_width=3)), -2.32, 1.6)
bloc("« pas un hasard »",
     T("P coupe le cube selon le rectangle B C H E, traversé en son centre", 24), -3.25, 4.8)

print("\n── 06 : (A C) et (E B) se croisent-elles À L'ÉCRAN ? ──")
ts = se_croisent_a_lecran(S["A"], S["C"], S["E"], S["B"])
pa = [S["A"][i] + ts[0] * (S["C"][i] - S["A"][i]) for i in range(3)]
pb = [S["E"][i] + ts[1] * (S["B"][i] - S["E"][i]) for i in range(3)]
print(f"  (A C) × (E B) : paramètres {ts[0]:.3f} et {ts[1]:.3f}")
print(f"  dans l'espace : {tuple(round(v, 3) for v in pa)} ≠ {tuple(round(v, 3) for v in pb)}")
print(f"  à l'écran     : {tuple(round(v, 3) for v in cavaliere(pa))} "
      f"= {tuple(round(v, 3) for v in cavaliere(pb))}  ✅ superposés")
for a, b, c, d in (("A", "G", "B", "H"), ("A", "G", "B", "D"), ("A", "F", "D", "G")):
    r_ = se_croisent_a_lecran(S[a], S[b], S[c], S[d])
    print(f"  ({a}{b}) × ({c}{d}) → "
          f"{'croisent à l écran ' + str(tuple(round(v, 3) for v in r_)) if r_ else 'ne se croisent pas'}")

print("\n── la page de garde ──")
cadre("echelle() alignée en bas", EcransEspace.echelle(E).align_to(P(0, -3.45), DOWN))
cadre("la ligne finale", T("c'est l'exercice que tu auras", 32).move_to(P(-0.9, -1.55)))

print()
if ennuis:
    print("⛔ " + str(len(ennuis)) + " problème(s) : " + " | ".join(ennuis))
    sys.exit(1)
print("✅ aucune cote hors marge, aucun bloc rétréci")
