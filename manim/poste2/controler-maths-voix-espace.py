# manim/poste2/controler-maths-voix-espace.py
# ⭐⭐ LA PASSE MATHS de la série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026).
#
# Pourquoi ce script existe. Dans la série des entiers CM1→6e, une voix VALIDÉE disait
# « 6 032 a 3 centaines » — c'était faux, c'était dans un clip de CORRECTION, et l'erreur
# aurait donc été ENSEIGNÉE. Le « oui » de Frédéric valide le ton, le rythme, le métier :
# il ne contrôle pas l'arithmétique. Alors on la contrôle à part, et à l'exécution.
#
# ⛔ Un tableau de recalcul dans le .md reste une relecture : c'est moi qui affirme que
# « 4 moins 4 fait zéro ». Ici, c'est Python qui le refait. Chaque ligne ci-dessous est
# une affirmation prise dans une voix, réécrite en calcul, et comparée.
#
#   python manim/poste2/controler-maths-voix-espace.py
#
# ⚠️ Ce script ne lit PAS les fichiers de voix : il ne saurait pas comprendre
# « moins 3 fois moins 1 fait plus 3 ». Les affirmations sont recopiées ici à la main,
# clip par clip. C'est le prix d'une passe maths : deux écritures indépendantes du même
# calcul, et un désaccord qui se voit.

import sys
from math import acos, degrees, isclose, sqrt

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ---------- outils de vecteurs (volontairement minuscules, rien d'importé) ----------
def vec(a, b):                      # le vecteur AB : arrivée moins départ
    return tuple(y - x for x, y in zip(a, b))

def ps(u, v):                       # produit scalaire
    return sum(x * y for x, y in zip(u, v))

def norme(u):
    return sqrt(ps(u, u))

def colineaires(u, v):              # u et v colinéaires dans l'espace
    return all(isclose(a, 0, abs_tol=1e-12) for a in (
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0],
    ))

def det3(u, v, w):              # determinant : nul <=> les trois vecteurs sont coplanaires
    return (u[0] * (v[1] * w[2] - v[2] * w[1])
            - u[1] * (v[0] * w[2] - v[2] * w[0])
            + u[2] * (v[0] * w[1] - v[1] * w[0]))

def milieu(a, b):
    return tuple((x + y) / 2 for x, y in zip(a, b))

def dans_plan(p, eq):               # eq = (a, b, c, d) pour ax + by + cz + d = 0
    a, b, c, d = eq
    return isclose(a * p[0] + b * p[1] + c * p[2] + d, 0, abs_tol=1e-12)

def angle(u, v):                    # en degrés
    return degrees(acos(ps(u, v) / (norme(u) * norme(v))))

# le cube ABCDEFGH dans le repère (A ; AB, AD, AE) — neuf épisodes sur douze s'en servent
A, B, C, D = (0, 0, 0), (1, 0, 0), (1, 1, 0), (0, 1, 0)
E, F, G, H = (0, 0, 1), (1, 0, 1), (1, 1, 1), (0, 1, 1)

fautes = []

def dit(episode, clip, affirmation, vrai):
    """Une affirmation d'une voix, recalculée. `vrai` doit être True."""
    if not vrai:
        fautes.append(f"{episode} / {clip} : {affirmation}")

# =====================================================================================
# E1 · espace_vecteurs
# =====================================================================================
dit("E1", "02", "A(1;2;3), B(4;6;3) donne AB = (3;4;0)",
    vec((1, 2, 3), (4, 6, 3)) == (3, 4, 0))
dit("E1", "02", "la 3e coordonnee nulle : meme hauteur",
    vec((1, 2, 3), (4, 6, 3))[2] == 0)
dit("E1", "04", "A(2;1;0), B(2;1;5) donne AB = (0;0;5)",
    vec((2, 1, 0), (2, 1, 5)) == (0, 0, 5))
dit("E1", "04", "leurre (4;2;5) est la somme des coordonnees, pas la difference",
    tuple(x + y for x, y in zip((2, 1, 0), (2, 1, 5))) == (4, 2, 5))
dit("E1", "05", "u(1;2;-1) + v(3;0;2) = (4;2;1)",
    tuple(x + y for x, y in zip((1, 2, -1), (3, 0, 2))) == (4, 2, 1))
dit("E1", "05", "2u = (2;4;-2)",
    tuple(2 * x for x in (1, 2, -1)) == (2, 4, -2))
dit("E1", "07", "u(1;2;3) et v(2;4;6) sont colineaires",
    colineaires((1, 2, 3), (2, 4, 6)))
dit("E1", "06", "(1;0;0), (0;1;0), (1;1;0) : deux a deux NON colineaires",
    not colineaires((1, 0, 0), (0, 1, 0))
    and not colineaires((1, 0, 0), (1, 1, 0))
    and not colineaires((0, 1, 0), (1, 1, 0)))
dit("E1", "06", "... et tous les trois dans le plan z = 0 (donc coplanaires)",
    all(dans_plan(p, (0, 0, 1, 0)) for p in [(1, 0, 0), (0, 1, 0), (1, 1, 0)]))
_a, _b, _c = (1, 0, 0), (0, 1, 0), (0, 0, 1)
dit("E1", "09b", "AB = (-1;1;0) et AC = (-1;0;1)",
    vec(_a, _b) == (-1, 1, 0) and vec(_a, _c) == (-1, 0, 1))
dit("E1", "09b", "k vaudrait 1 d'apres la 1re coordonnee, et echoue sur la 2e",
    vec(_a, _c)[0] == 1 * vec(_a, _b)[0] and vec(_a, _c)[1] != 1 * vec(_a, _b)[1])
dit("E1", "09b", "AB et AC ne sont pas colineaires : A, B, C non alignes",
    not colineaires(vec(_a, _b), vec(_a, _c)))

# =====================================================================================
# E2 · espace_repere_coordonnees
# =====================================================================================
dit("E2", "02", "G = A + AB + AD + AE a pour coordonnees (1;1;1)", G == (1, 1, 1))
dit("E2", "04", "milieu de [AB] avec A(1;3;5), B(3;1;1) = (2;2;3)",
    milieu((1, 3, 5), (3, 1, 1)) == (2, 2, 3))
dit("E2", "04", "leurre (4;4;6) est la somme",
    tuple(x + y for x, y in zip((1, 3, 5), (3, 1, 1))) == (4, 4, 6))
dit("E2", "04", "leurre (1;-1;-2) est la moitie du vecteur AB",
    tuple(x / 2 for x in vec((1, 3, 5), (3, 1, 1))) == (1, -1, -2))
dit("E2", "05", "milieu de [AG] = (0,5;0,5;0,5)", milieu(A, G) == (0.5, 0.5, 0.5))
dit("E2", "05", "milieu de [CE] = le meme point", milieu(C, E) == milieu(A, G))
dit("E2", "05", "les QUATRE grandes diagonales se coupent au centre",
    milieu(A, G) == milieu(B, H) == milieu(C, E) == milieu(D, F))
dit("E2", "07", "leurre (1;1;0) est C et (0;1;1) est H", C == (1, 1, 0) and H == (0, 1, 1))
I2, J2 = milieu(E, F), milieu(G, H)
dit("E2", "09b", "I milieu de [EF] = (0,5;0;1)", I2 == (0.5, 0, 1))
dit("E2", "09b", "J milieu de [GH] = (0,5;1;1)", J2 == (0.5, 1, 1))
dit("E2", "09b", "IJ = (0;1;0) = AD", vec(I2, J2) == (0, 1, 0) == vec(A, D))

# =====================================================================================
# E3 · espace_droite_parametrique
# =====================================================================================
def d3(t):                                  # x = 1+2t, y = 2-t, z = 3t
    return (1 + 2 * t, 2 - t, 3 * t)

dit("E3", "02", "t = 0 donne A(1;2;0)", d3(0) == (1, 2, 0))
dit("E3", "02", "t = 1 donne (3;1;3)", d3(1) == (3, 1, 3))
dit("E3", "04", "les leurres (1;2;0) et (3;1;3) ne sont pas colineaires a u(2;-1;3)",
    not colineaires((1, 2, 0), (2, -1, 3)) and not colineaires((3, 1, 3), (2, -1, 3)))
dit("E3", "05", "B(5;0;6) est sur d, avec t = 2", d3(2) == (5, 0, 6))
dit("E3", "06", "(4;-2;6) est le double de (2;-1;3)",
    tuple(2 * x for x in (2, -1, 3)) == (4, -2, 6))
dit("E3", "06", "le 2e systeme passe par (3;1;3), qui est sur d", d3(1) == (3, 1, 3))
dit("E3", "07", "C(7;-1;10) : t = 3 donne x et y justes mais z = 9",
    d3(3)[:2] == (7, -1) and d3(3)[2] == 9 and d3(3)[2] != 10)
dit("E3", "09b", "AB = (0;3;-2) avec A(2;0;1), B(2;3;-1)",
    vec((2, 0, 1), (2, 3, -1)) == (0, 3, -2))
dit("E3", "09b", "la paramétrique x=2, y=3t, z=1-2t passe par A et par B",
    all((2, 3 * t, 1 - 2 * t) == p for t, p in [(0, (2, 0, 1)), (1, (2, 3, -1))]))

# =====================================================================================
# E4 · espace_plan_equation
# =====================================================================================
dit("E4", "02", "A(0;0;1) est dans 2x + y - z + 1 = 0", dans_plan((0, 0, 1), (2, 1, -1, 1)))
P4 = (1, 1, -1, -1)                         # x + y - z - 1 = 0
dit("E4", "04", "(1;1;1) est dans P", dans_plan((1, 1, 1), P4))
dit("E4", "04", "(1;2;3) donne -1", isclose(1 + 2 - 3 - 1, -1))
dit("E4", "04", "(2;0;0) donne 1", isclose(2 + 0 - 0 - 1, 1))
dit("E4", "04", "les deux leurres ne sont PAS dans P",
    not dans_plan((1, 2, 3), P4) and not dans_plan((2, 0, 0), P4))
dit("E4", "05", "3x - y + 2z + d = 0 par B(1;1;0) donne d = -2",
    isclose(-(3 * 1 - 1 + 2 * 0), -2) and dans_plan((1, 1, 0), (3, -1, 2, -2)))
dit("E4", "07", "y = 1 s'ecrit 0x + 1y + 0z - 1 = 0 et ses coefficients ne sont pas tous nuls",
    dans_plan((5, 1, -3), (0, 1, 0, -1)) and (0, 1, 0) != (0, 0, 0))
P4b = (2, -3, 1, -4)                        # 2x - 3y + z - 4 = 0
dit("E4", "09b", "A(2;0;0) est dans P", dans_plan((2, 0, 0), P4b))
dit("E4", "09b", "B(0;-1;1) est dans P (le piege du moins par moins)",
    dans_plan((0, -1, 1), P4b) and isclose(-3 * -1, 3))

# =====================================================================================
# E5 · espace_position_relative
# =====================================================================================
def subst(point, direction, eq):
    """Renvoie (coefficient de t, constante) de la substitution de la droite dans le plan."""
    a, b, c, d = eq
    return (a * direction[0] + b * direction[1] + c * direction[2],
            a * point[0] + b * point[1] + c * point[2] + d)

ct, cc = subst((1, 0, -1), (1, 2, 1), (1, 1, -1, -2))
dit("E5", "02", "substitution : 2t = 0", isclose(ct, 2) and isclose(cc, 0))
dit("E5", "02", "le point commun (1;0;-1) est bien dans le plan",
    dans_plan((1, 0, -1), (1, 1, -1, -2)))
dit("E5", "05", "P' a des coefficients doubles de P", colineaires((2, 2, 2), (1, 1, 1)))
dit("E5", "05", "P' divise par 2 donne la constante 2,5, differente de -1",
    isclose(5 / 2, 2.5) and not isclose(2.5, -1))
ct5, cc5 = subst((0, 1, 2), (1, 1, -1), (1, 1, 2, 1))
dit("E5", "09b", "les t s'eliminent (coefficient nul)", isclose(ct5, 0))
dit("E5", "09b", "la constante vaut 6, donc 6 = 0 est impossible : parallele stricte",
    isclose(cc5, 6))

# =====================================================================================
# E6 · espace_defi
# =====================================================================================
P6 = (1, 0, 1, -1)                          # x + z - 1 = 0
dit("E6", "04", "centre du cube = (0,5;0,5;0,5)", milieu(A, G) == (0.5, 0.5, 0.5))
dit("E6", "04", "leurre (0,5;0,5;1) est le centre de la face EFGH",
    tuple(sum(p[i] for p in (E, F, G, H)) / 4 for i in range(3)) == (0.5, 0.5, 1))
dit("E6", "05", "AG = 2 x A-centre", vec(A, G) == tuple(2 * x for x in milieu(A, G)))
dit("E6", "09b", "B et E sont dans P", dans_plan(B, P6) and dans_plan(E, P6))
ct6, cc6 = subst(A, vec(A, G), P6)
dit("E6", "09b", "substitution : 2t - 1 = 0, donc t = 0,5", isclose(-cc6 / ct6, 0.5))
dit("E6", "09b", "l'intersection est le centre du cube",
    tuple(0.5 * x for x in vec(A, G)) == milieu(A, G))
dit("E6", "09b", "P contient aussi C et H", dans_plan(C, P6) and dans_plan(H, P6))
dit("E6", "09b", "le centre de la section BCHE est ce meme point",
    tuple(sum(p[i] for p in (B, C, H, E)) / 4 for i in range(3)) == (0.5, 0.5, 0.5))
# ⛔ Ici j'avais ecrit « True » : une tautologie ne mesure rien. Ce qui se teste, c'est
# que les deux AUTRES leurres sont bien des criteres qui ne prouvent pas l'alignement.
dit("E6", "07", "meme norme n'implique pas alignement : AB et AC egales et non colineaires",
    isclose(norme(vec(A, B)), norme(vec(A, D))) and not colineaires(vec(A, B), vec(A, D)))

# =====================================================================================
# E7 · ps_espace_calculer
# =====================================================================================
dit("E7", "02", "u(1;2;3).v(4;-1;2) = 8", ps((1, 2, 3), (4, -1, 2)) == 8)
dit("E7", "04", "u(2;0;-1).v(1;5;2) = 0", ps((2, 0, -1), (1, 5, 2)) == 0)
dit("E7", "04", "le leurre 4 vient du signe oublie", 2 + 0 + 2 == 4)
dit("E7", "05", "u.u = 14 et la norme vaut racine de 14",
    ps((1, 2, 3), (1, 2, 3)) == 14 and isclose(norme((1, 2, 3)), sqrt(14)))
dit("E7", "06", "u.v = u.w = 0 avec v different de w",
    ps((1, 0, 0), (0, 1, 0)) == ps((1, 0, 0), (0, 0, 1)) == 0)
dit("E7", "09b", "AG.AB = 1", ps(vec(A, G), vec(A, B)) == 1)
dit("E7", "09b", "AG.AC = 2", ps(vec(A, G), vec(A, C)) == 2)
dit("E7", "09b", "les deux produits sont positifs", ps(vec(A, G), vec(A, B)) > 0
    and ps(vec(A, G), vec(A, C)) > 0)
dit("E7", "09b", "prudence justifiee : les normes different, on ne compare pas les angles",
    not isclose(norme(vec(A, B)), norme(vec(A, C))))

# =====================================================================================
# E8 · ps_espace_orthogonalite
# =====================================================================================
dit("E8", "02", "u(2;1;-1).v(1;-1;1) = 0", ps((2, 1, -1), (1, -1, 1)) == 0)
dit("E8", "04", "u(1;2;-2).v(2;-3;-2) = 0", ps((1, 2, -2), (2, -3, -2)) == 0)
dit("E8", "04", "le leurre -8 vient de (-2)x(-2) pris pour -4", 2 - 6 - 4 == -8)
dit("E8", "05", "n(1;1;1) orthogonal a u(1;-1;0) et a v(0;1;-1)",
    ps((1, 1, 1), (1, -1, 0)) == 0 and ps((1, 1, 1), (0, 1, -1)) == 0)
dit("E8", "05", "u et v non colineaires", not colineaires((1, -1, 0), (0, 1, -1)))
dit("E8", "06", "au sol, nord et est sont orthogonaux ET tous deux dans z = 0",
    ps((0, 1, 0), (1, 0, 0)) == 0
    and dans_plan((0, 1, 0), (0, 0, 1, 0)) and dans_plan((1, 0, 0), (0, 0, 1, 0)))
dit("E8", "06", "AB et CG sont orthogonales", ps(vec(A, B), vec(C, G)) == 0)
# ⚠️ Ma premiere version de ce test etait CREUSE : elle contenait isclose(0, 1),
# toujours faux, donc la ligne etait vraie quoi qu'il arrive. Trouve en relisant mes
# propres tests apres un « 0 faute » — un instrument non etalonne ne prouve rien.
dit("E8", "06", "... et ne se rencontrent pas : (AB) et (CG) ne sont pas coplanaires",
    det3(vec(A, C), vec(A, B), vec(C, G)) != 0)
dit("E8", "09b", "BD = (-1;1;0) et BE = (-1;0;1)",
    vec(B, D) == (-1, 1, 0) and vec(B, E) == (-1, 0, 1))
dit("E8", "09b", "AG.BD = 0 et AG.BE = 0",
    ps(vec(A, G), vec(B, D)) == 0 and ps(vec(A, G), vec(B, E)) == 0)
dit("E8", "09b", "BD et BE non colineaires", not colineaires(vec(B, D), vec(B, E)))

# =====================================================================================
# E9 · ps_espace_norme_distance
# =====================================================================================
dit("E9", "01", "10 km a plat et 1 km de denivele : racine de 101, un peu plus de 10",
    isclose(sqrt(101), 10.0498, abs_tol=1e-3) and sqrt(101) < 10.1)
dit("E9", "02", "u(2;3;6) a pour norme 7", isclose(norme((2, 3, 6)), 7))
dit("E9", "04", "u(1;-2;2) a pour norme 3", isclose(norme((1, -2, 2)), 3))
dit("E9", "04", "le leurre 9 est le carre de la norme", isclose(ps((1, -2, 2), (1, -2, 2)), 9))
dit("E9", "04", "le leurre 1 est la somme des coordonnees", 1 - 2 + 2 == 1)
dit("E9", "05", "A(1;0;2), B(3;-1;4) : AB = (2;-1;2) et la distance vaut 3",
    vec((1, 0, 2), (3, -1, 4)) == (2, -1, 2) and isclose(norme((2, -1, 2)), 3))
dit("E9", "06", "racine de 3 carre plus 4 carre vaut 5, pas 7", isclose(norme((3, 4, 0)), 5))
dit("E9", "06", "racine de 14 vaut environ 3,74", isclose(sqrt(14), 3.7417, abs_tol=1e-3))
dit("E9", "07", "A(2;1;0), B(2;1;5) : la distance vaut 5",
    isclose(norme(vec((2, 1, 0), (2, 1, 5))), 5))
dit("E9", "09b", "AC = racine de 2, environ 1,41",
    isclose(norme(vec(A, C)), sqrt(2)) and isclose(sqrt(2), 1.4142, abs_tol=1e-3))
dit("E9", "09b", "AG = racine de 3, environ 1,73",
    isclose(norme(vec(A, G)), sqrt(3)) and isclose(sqrt(3), 1.7321, abs_tol=1e-3))
dit("E9", "09b", "arete a : la face vaut a racine de 2 et la diagonale a racine de 3",
    isclose(norme((5, 5, 0)), 5 * sqrt(2)) and isclose(norme((5, 5, 5)), 5 * sqrt(3)))

# =====================================================================================
# E10 · ps_espace_angle
# =====================================================================================
dit("E10", "02", "u(1;0;0) et v(1;1;0) : cosinus 1 sur racine de 2, soit 45 degres",
    isclose(ps((1, 0, 0), (1, 1, 0)) / (norme((1, 0, 0)) * norme((1, 1, 0))), 1 / sqrt(2))
    and isclose(angle((1, 0, 0), (1, 1, 0)), 45))
dit("E10", "02", "1 sur racine de 2 vaut environ 0,71",
    isclose(1 / sqrt(2), 0.7071, abs_tol=1e-3))
dit("E10", "04", "un produit scalaire negatif donne un angle obtus",
    angle((1, 0, 0), (-6, 0, 0)) > 90)
dit("E10", "05", "u(1;1;0) et v(0;1;1) : produit 1, normes racine de 2, cosinus 0,5",
    ps((1, 1, 0), (0, 1, 1)) == 1
    and isclose(norme((1, 1, 0)) * norme((0, 1, 1)), 2)
    and isclose(angle((1, 1, 0), (0, 1, 1)), 60))
dit("E10", "06", "retourner un vecteur donne l'angle supplementaire",
    isclose(angle((1, 1, 0), (0, 1, 1)) + angle((1, 1, 0), (0, -1, -1)), 180))
dit("E10", "07", "un cosinus ne peut pas valoir 1,25", 1.25 > 1)
dit("E10", "09b", "AG et AB : cosinus 1 sur racine de 3, environ 0,577",
    isclose(ps(vec(A, G), vec(A, B)) / (norme(vec(A, G)) * norme(vec(A, B))), 1 / sqrt(3))
    and isclose(1 / sqrt(3), 0.5774, abs_tol=1e-3))
dit("E10", "09b", "l'angle vaut environ 54,7 degres, donc 55 arrondi",
    isclose(angle(vec(A, G), vec(A, B)), 54.7356, abs_tol=1e-3)
    and round(angle(vec(A, G), vec(A, B))) == 55)
dit("E10", "09b", "ce n'est PAS 45 degres", not isclose(angle(vec(A, G), vec(A, B)), 45, abs_tol=0.5))

# =====================================================================================
# E11 · ps_espace_plan_normal
# =====================================================================================
dit("E11", "04", "les leurres (1;2;5) et (0;0;7) ne sont pas colineaires a (1;-2;5)",
    not colineaires((1, 2, 5), (1, -2, 5)) and not colineaires((0, 0, 7), (1, -2, 5)))
dit("E11", "05", "A(1;2;-1) et n(3;0;1) donnent d = -2, et A est dans le plan",
    -ps((3, 0, 1), (1, 2, -1)) == -2 and dans_plan((1, 2, -1), (3, 0, 1, -2)))
dit("E11", "05", "le plan 3x + z - 2 = 0 est parallele a l'axe des y",
    ps((3, 0, 1), (0, 1, 0)) == 0)
dit("E11", "06", "2x+2y+2z-2 = 0 et x+y+z-1 = 0 ont les memes points",
    all(dans_plan(p, (2, 2, 2, -2)) == dans_plan(p, (1, 1, 1, -1))
        for p in [(1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 1), (2, -1, 0)]))
dit("E11", "07", "les normales (1;1;1) et (2;2;2) sont colineaires",
    colineaires((1, 1, 1), (2, 2, 2)))
dit("E11", "07", "P' divise par 2 a la constante +3, celle de P vaut -1 : non confondus",
    isclose(6 / 2, 3) and not isclose(3, -1))
dit("E11", "07", "aucun point de P n'est dans P'",
    not any(dans_plan(p, (2, 2, 2, 6)) for p in [(1, 0, 0), (0, 1, 0), (0, 0, 1)]))
ct11, cc11 = subst((1, 1, 1), (1, 1, 1), (1, 1, 1, 0))
dit("E11", "09b", "substitution : 3 + 3t = 0, donc t = -1",
    isclose(ct11, 3) and isclose(cc11, 3) and isclose(-cc11 / ct11, -1))
K11 = tuple(1 + (-1) * 1 for _ in range(3))
dit("E11", "09b", "le projete est l'origine", K11 == (0, 0, 0))
dit("E11", "09b", "l'origine est bien dans P", dans_plan((0, 0, 0), (1, 1, 1, 0)))
dit("E11", "09b", "le vecteur AK est bien colineaire a la normale",
    colineaires(vec((1, 1, 1), K11), (1, 1, 1)))

# =====================================================================================
# E12 · ps_espace_defi
# =====================================================================================
PBDE = (1, 1, 1, -1)                        # x + y + z - 1 = 0
dit("E12", "05", "la normale (1;1;1) et B donnent d = -1",
    isclose(-(1 + 0 + 0), -1))
dit("E12", "05", "B, D et E sont dans le plan BDE",
    all(dans_plan(p, PBDE) for p in (B, D, E)))
dit("E12", "05", "AG est bien normal a ce plan",
    ps(vec(A, G), vec(B, D)) == 0 and ps(vec(A, G), vec(B, E)) == 0)
dit("E12", "07", "BD, BE et DE ont tous pour longueur racine de 2",
    all(isclose(norme(v), sqrt(2)) for v in (vec(B, D), vec(B, E), vec(D, E))))
dit("E12", "07", "BD.BE = 1, donc l'angle en B n'est pas droit",
    ps(vec(B, D), vec(B, E)) == 1)
dit("E12", "07b", "l'angle en B vaut 60 degres",
    isclose(angle(vec(B, D), vec(B, E)), 60))
ct12, cc12 = subst(A, vec(A, G), PBDE)
dit("E12", "09b", "substitution : 3t - 1 = 0, donc t = un tiers",
    isclose(ct12, 3) and isclose(cc12, -1) and isclose(-cc12 / ct12, 1 / 3))
K12 = tuple(x / 3 for x in (1, 1, 1))
dit("E12", "09b", "K = (1/3;1/3;1/3) et K est dans le plan", dans_plan(K12, PBDE))
dit("E12", "09b", "la distance AK vaut racine de 3 sur 3, environ 0,58",
    isclose(norme(vec(A, K12)), sqrt(3) / 3)
    and isclose(sqrt(3) / 3, 0.5774, abs_tol=1e-3))
dit("E12", "09b", "K est au tiers de la grande diagonale AG",
    colineaires(vec(A, K12), vec(A, G))
    and isclose(norme(vec(A, K12)) * 3, norme(vec(A, G))))

# =====================================================================================
print("PASSE MATHS — série espace, terminale spé")
print(f"{len(fautes)} affirmation(s) fausse(s) sur les voix des 12 épisodes")
for f in fautes:
    print("  ⛔", f)
if not fautes:
    print("✅ chaque nombre dit par les voix a été refait ici, indépendamment du .md")
    print("⚠️  ce script ne contrôle ni le ton, ni la longueur, ni ce qui s'AFFICHE :")
    print("    la planche de contrôle reste obligatoire avant tout rendu HD.")
sys.exit(1 if fautes else 0)
