# -*- coding: utf-8 -*-
"""LA PASSE MATHS du manifeste — série « CONTINUITÉ ET TVI », Tle spé.

    python -X utf8 manim/poste2/controler-maths-continuite-tvi.py

⭐⭐ POURQUOI. « Un oui de Frédéric valide le ton, pas l'arithmétique » (série espace), et
« un chiffre non mesuré est un souvenir ». Tous les nombres du manifeste ont été écrits à
la main : f(0), f(2), les signes de f′, le nombre de solutions. Un seul faux, et il est
ENSEIGNÉ — la série des entiers a eu une voix validée qui disait « 6 032 a 3 centaines ».

Ce fichier RECALCULE chaque affirmation chiffrée du § 5 du manifeste. Il ne lit pas le
texte : il redit les mêmes calculs, à partir des fonctions, et compare. Si le manifeste
change, c'est ici qu'on reporte le changement — et le désaccord se verra.

⚠️ Il ne contrôle pas la PÉDAGOGIE : qu'un exemple soit bien choisi, qu'un leurre soit
plausible, qu'un énoncé soit clair, rien de tout cela ne se calcule.
"""
import math
import sys

erreurs = []
controles = 0


def eq(nom, calcule, annonce, tol=5e-3):
    """une PRÉDICTION réfutable : le manifeste annonce, la machine recalcule."""
    global controles
    controles += 1
    ok = abs(calcule - annonce) <= tol
    if not ok:
        erreurs.append(f"{nom} : le manifeste dit {annonce}, le calcul donne {calcule}")
    print(f"  {'OK ' if ok else '⛔ '}{nom:46s} {calcule:>10.4g}   (manifeste : {annonce})")


def vrai(nom, condition, pourquoi):
    global controles
    controles += 1
    if not condition:
        erreurs.append(f"{nom} : {pourquoi}")
    print(f"  {'OK ' if condition else '⛔ '}{nom:46s} {pourquoi}")


def solutions(f, a, b, pas=1e-4):
    """combien de fois f s'annule sur [a ; b], compté par changement de signe."""
    n, x, prec = 0, a, f(a)
    if abs(prec) < 1e-12:
        n += 1
    while x < b:
        x = min(x + pas, b)
        v = f(x)
        if prec * v < 0:
            n += 1
        prec = v
    return n


print("\nE1 · continuite_reconnaitre")
eq("02-idee  limite à gauche de 2x+1 en 1", 2 * 1 + 1, 3)
eq("02-idee  valeur du second morceau en 1", 5, 5)
eq("02-idee  taille du saut", abs(5 - 3), 2)
eq("04  premier morceau x² en 2", 2 ** 2, 4)
eq("04  second morceau 3x-2 en 2", 3 * 2 - 2, 4)
vrai("04  les deux morceaux recollent", 2 ** 2 == 3 * 2 - 2, "donc g est continue en 2 → carte A")
eq("05  dénominateur de (2x+1)/(x-3) en 3", 3 - 3, 0)
vrai("07  ln x + x² exige x > 0", True, "ensemble de continuité ]0 ; +∞[ → carte B")
vrai("09b √(x-1) exige x ⩾ 1", True, "et 1/(x-4) exclut 4 → [1 ; 4[ et ]4 ; +∞[")

print("\nE2 · tvi_appliquer")
vrai("04  7 est entre f(1)=5 et f(4)=9", 5 < 7 < 9, "le TVI conclut → carte C")
g2 = lambda x: x ** 5 + 3 * x - 5
eq("05  g(1) pour x⁵+3x-5", g2(1), -1)
eq("05  g(2) pour x⁵+3x-5", g2(2), 33)
vrai("05  0 est entre g(1) et g(2)", g2(1) < 0 < g2(2), "au moins une solution sur [1 ; 2]")
vrai("07  0 n'est PAS entre 2 et 8", not (2 <= 0 <= 8), "le TVI ne conclut rien → carte A")
f2 = lambda x: x ** 3 - x - 5
eq("09b f(1) pour x³-x-5", f2(1), -5)
eq("09b f(2) pour x³-x-5", f2(2), 1)
vrai("09b x³ = x+5 se ramène à f(x) = 0", f2(1) < 0 < f2(2), "une solution entre 1 et 2")

print("\nE3 · tvi_unicite")
vrai("04  g strictement croissante, g(0)=2 > 0", 2 > 0, "g ⩾ 2 sur [0 ; 5] : AUCUNE solution → carte C")
f3 = lambda x: math.exp(x) + x - 4
eq("05  f(0) pour eˣ+x-4", f3(0), -3)
eq("05  f(2) pour eˣ+x-4", f3(2), 5.389)
vrai("05  f'(x) = eˣ+1 > 0", all(math.exp(x) + 1 > 0 for x in (0, 1, 2)), "strictement croissante")
eq("05  nombre de solutions sur [0 ; 2]", solutions(f3, 0, 2), 1)
vrai("07  f(0)=-4 et f(6)=2 changent de signe", -4 < 0 < 2, "il manque la stricte monotonie → carte B")
f3b = lambda x: x + math.log(x) - 3
eq("09b f(1) pour x+ln x-3", f3b(1), -2)
eq("09b f(3) pour x+ln x-3", f3b(3), math.log(3))
eq("09b ln 3", math.log(3), 1.0986)
eq("09b nombre de solutions sur [1 ; 3]", solutions(f3b, 1, 3), 1)

print("\nE4 · tvi_rediger")
f4 = lambda x: 2 * x ** 3 + 3 * x - 4
eq("02-idee f(0) pour 2x³+3x-4", f4(0), -4)
eq("02-idee f(2) pour 2x³+3x-4", f4(2), 18)
vrai("02-idee f'(x) = 6x²+3 > 0", all(6 * x ** 2 + 3 > 0 for x in (0, 1, 2)), "strictement croissante")
g4 = lambda x: 2 * math.log(x) + x - 4
eq("05  g(1) pour 2ln x+x-4", g4(1), -3)
eq("05  g(4) pour 2ln x+x-4", g4(4), 2.7726)
vrai("05  g'(x) = 2/x+1 > 0 sur [1 ; 4]", all(2 / x + 1 > 0 for x in (1, 2, 4)), "strictement croissante")
eq("05  nombre de solutions sur [1 ; 4]", solutions(g4, 1, 4), 1)
vrai("07  h(2)=-1 et h(5)=6 changent de signe", -1 < 0 < 6, "il manque la stricte monotonie → carte C")
f4b = lambda x: x ** 3 + 3 * x - 6
eq("09b f(1) pour x³+3x-6", f4b(1), -2)
eq("09b f(2) pour x³+3x-6", f4b(2), 8)
vrai("09b f'(x) = 3x²+3 > 0", all(3 * x ** 2 + 3 > 0 for x in (1, 2)), "la ligne manquante de la copie")

print("\nE5 · tvi_defi")
g5 = lambda x: (x - 1) ** 2 - 4
eq("02-idee g(-2) pour (x-1)²-4", g5(-2), 5)
eq("02-idee g(1) pour (x-1)²-4", g5(1), -4)
eq("02-idee g(4) pour (x-1)²-4", g5(4), 5)
eq("02-idee nombre de zéros sur [-2 ; 4]", solutions(g5, -2, 4), 2)
vrai("02-idee mêmes signes aux deux bornes", g5(-2) > 0 and g5(4) > 0, "et pourtant deux zéros")
vrai("04  décroît de 5 à -2 puis croît à 3", True, "un zéro par morceau strictement monotone → carte B, deux")
f5 = lambda t: t ** 3 - 3 * t + 1
eq("05  f(0) pour t³-3t+1", f5(0), 1)
eq("05  f(1) pour t³-3t+1", f5(1), -1)
eq("05  f(2) pour t³-3t+1", f5(2), 3)
vrai("05  f'(t) = 3t²-3 s'annule en 1", abs(3 * 1 ** 2 - 3) < 1e-12, "signe - sur [0;1[, + sur ]1;2]")
eq("05  nombre de solutions sur [0 ; 2]", solutions(f5, 0, 2), 2)
vrai("06  f(0) et f(2) sont du même signe", f5(0) > 0 and f5(2) > 0, "le TVI brut ne dit RIEN sur [0 ; 2]")
eq("07  f(0,3) pour t³-3t+1", f5(0.3), 0.127)
eq("07  f(0,4) pour t³-3t+1", f5(0.4), -0.136)
vrai("07  α est entre 0,3 et 0,4", f5(0.3) > 0 > f5(0.4), "encadrement 0,3 < α < 0,4 → carte A")
f5b = lambda x: x ** 3 - 12 * x + 5
eq("09b f(0) pour x³-12x+5", f5b(0), 5)
eq("09b f(2) pour x³-12x+5", f5b(2), -11)
eq("09b f(3) pour x³-12x+5", f5b(3), -4)
vrai("09b f' s'annule en 2 sur [0 ; 3]", abs(3 * 2 ** 2 - 12) < 1e-12, "deux morceaux monotones")
vrai("09b sur [2 ; 3], 0 n'est pas entre -11 et -4", not (-11 <= 0 <= -4), "aucune solution sur ce morceau")
eq("09b nombre de solutions sur [0 ; 3]", solutions(f5b, 0, 3), 1)

print("\nLES DÉCOMPOSITIONS DITES À HAUTE VOIX")
# ⛔ Une voix de correction ne donne pas un résultat, elle le DÉROULE : « huit, moins
# vingt-quatre, plus cinq : moins onze ». Chacun de ces trois nombres est enseigné, et
# une faute d'étape passe inaperçue quand le total, lui, est juste. On les recalcule.
eq("E2 05  1 + 3 - 5", 1 + 3 - 5, -1)
eq("E2 05  32 + 6 - 5", 32 + 6 - 5, 33)
eq("E2 09b 1 - 1 - 5", 1 - 1 - 5, -5)
eq("E2 09b 8 - 2 - 5", 8 - 2 - 5, 1)
eq("E3 05  1 + 0 - 4", 1 + 0 - 4, -3)
eq("E3 05  e² (la voix dit 5,39 pour f(2))", math.exp(2) + 2 - 4, 5.39)
eq("E3 09b 1 + 0 - 3", 1 + 0 - 3, -2)
eq("E3 09b ln 3 (la voix dit 1,10)", math.log(3), 1.10)
eq("E4 02  f'(1) = 6 x 1 + 3", 6 * 1 ** 2 + 3, 9)
eq("E4 05  2 ln 4 + 4 - 4 (la voix dit 2,77)", 2 * math.log(4) + 4 - 4, 2.77)
eq("E5 05  1 - 3 + 1", 1 - 3 + 1, -1)
eq("E5 09b 8 - 24 + 5", 8 - 24 + 5, -11)
eq("E5 09b 27 - 36 + 5", 27 - 36 + 5, -4)
vrai("E3 02  deux courbes de -3 à 5", True,
     "3 traversées et 1 : dessinées, aucune formule — rien à recalculer")

print(f"\n{controles} contrôles, {len(erreurs)} erreur(s).")
for e in erreurs:
    print("  ⛔ " + e)
print("⚠️ Cette passe ne juge AUCUN choix pédagogique : elle ne vérifie que les nombres.")
sys.exit(1 if erreurs else 0)
