# ps_espace_defi.py
# EleveAI — Maths Tle spé — paysage « Exercice type bac avec produit scalaire » (16:9),
# ceinture VERTE. Micro du coach : ps_espace_defi (notion produit_scalaire_espace).
# Épisode 12 sur 12 — le DERNIER de la série, et le second « défi » (l'autre est E6).
# Centre : jeux-defis (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, « une normale / une équation / une distance », le même fil ;
#   · 01-situation  : LE CHEMIN des sujets de bac, trois étapes enfilées sur un fil ;
#   · 02-idee       : le fil en trois étapes, avec le plan DESSINÉ À PLAT et sa normale ;
#   · 03-theoreme   : la boîte à outils complète, CINQ objets ;
#   · 04/04b        : question-pause n° 1 (que vérifier ? → réponse B, les deux + la phrase) ;
#   · 05-appliquer  : dans le cube, A⃗G normale ⟹ (BDE) : x + y + z − 1 = 0, vérifiée ;
#   · 06-piege      : les CINQ pièges de la copie, et « la preuve est un calcul » ;
#   · 07/07b        : question-pause n° 2 (le triangle (BDE) → réponse A, équilatéral) ;
#   · 08-rediger    : le squelette d'une copie complète, quatre points ;
#   · 09/09b        : le défi — le projeté K de A sur (BDE), et la distance ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py, les figures dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'OUTIL se fait là-bas, jamais recopiée ici.
# ⭐ Toutes les cotes de ce fichier viennent d'une COMMANDE :
#   `python -X utf8 manim/poste2/mesure-ps-espace-defi.py` (recopié de celui de E10, qui
#   porte la chaîne complète de `dessous()` sur toute une colonne, plus les trois
#   contrôles de E9 : étiquettes DEUX À DEUX, pointe de flèche DANS le polygone de son
#   plan, et `loin_des_fleches()` — une étiquette contre le FÛT de tout segment tracé).
#
# ⚠️ Bonne réponse : 04 → B, 07 → A (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# ⭐⭐ LA NOTATION VECTORIELLE EST OBLIGATOIRE (décision de Frédéric, 22/11) : tout nom de
#   vecteur écrit à l'écran porte sa flèche — `self.vec` pour un nom seul, `self.vexpr`
#   pour une expression. Contrôle : `python -X utf8 manim/poste2/auditer-fleches-vecteurs.py`.
#   ⛔ Les trois notations de cet épisode, et elles ne sont pas cosmétiques :
#     · un VECTEUR : « n⃗ », « A⃗G », « B⃗D », « A⃗K » — flèche (`vec` / `vexpr`) ;
#     · un PLAN : « (BDE) », écrit COLLÉ. C'est la convention tranchée sur E8, et c'est
#       aussi ce qui évite un faux positif de l'audit (« (B D E) », trois lettres
#       espacées, serait signalé ; « (BDE) » ne produit aucune correspondance) ;
#     · un SEGMENT : « [A G] » — crochets, et la notation suffit à l'audit.
#   ⛔⛔ ET UN PIÈGE DE `vexpr` QUE CET ÉPISODE A TROUVÉ : son test d'isolement est
#   `avant.isalpha() or apres.isalpha()`, et l'APOSTROPHE n'est pas une lettre. Passer
#   ("n",) sur un texte qui contient « n'est », « n'a », « n'existe » dessine donc une
#   flèche de vecteur sur ce « n »-là, sans qu'aucun outil le dise (l'audit, lui, exclut
#   l'apostrophe par son regex, donc il se taît). ⭐ Règle : AUCUN texte passé avec
#   ("n",) ne contient « n' » dans cet épisode. Vérifié texte par texte.
#
# ⛔⛔ LE PLAN (BDE) NE SE DESSINE JAMAIS EN CAVALIÈRE, ET C'EST UNE MESURE.
#   `platitude((1, 1, 1))` = **9,02°**, sous le seuil de 12° du NOYAU (espace3d.py) : ce
#   plan-là se projette sur une LAME, et son triangle B D E garde **17,5 %** de son aire.
#   Pire, et c'est propre à cet épisode-ci : les trois côtés du triangle ÉQUILATÉRAL
#   B D E se projettent à **0,656 · 1,414 · 0,822** (mesuré), et l'angle en B se lit
#   **19,1°** au lieu de 60°. Un triangle B D E dessiné dans le cube dirait donc le
#   CONTRAIRE de ce que la voix enseigne à l'écran 07b (« ses trois côtés ont la même
#   longueur », « l'angle en B vaut 60 degrés »).
#   ⭐ Donc : le plan se montre par ses TROIS POINTS en ambre dans le cube (c'est la
#   donnée), et sa forme se montre par une figure PLANE (`triangle_plan`), comme le
#   `plan_dessine` de E8 et les `coin()` de E10. L'équilatéralité de cette figure plane
#   est vérifiée par une assertion du module.
#
# ⛔⛔ TROIS FAMILLES DE NOMBRES SONT HORS AUDIT, ET LES TROIS SONT STRUCTURELLES :
#   · `self.lettres(...)` — la voix dit en TOUTES LETTRES ce que l'écran doit écrire en
#     chiffres : « zéro » partout (les équations du cube en sont pleines), « un tiers »,
#     « un neuvième », « trois neuvièmes », « soixante » jamais ;
#   · `self.env(v)` — « ≈ 0,58 » : la voix dit « environ zéro virgule 58 » ;
#   · le « 0 » du second membre d'une équation, sorti par `eq_zero` du socle.
#
# ⛔ PAS DE PERSONNAGE, et c'est la voix qui le décide : elle ne nomme personne, son
#   « contexte » est le sujet de bac lui-même (comme E6). ⭐ Au passage, cela évite la
#   famille de défauts la plus coûteuse de la série — six épisodes d'affilée ont perdu un
#   tour sur un personnage vu seulement au gros plan. La figure à regarder en grand ici,
#   c'est LE CUBE (écrans 05, 07, 09, 09b) et les deux figures planes (02, 07b).
#
# Voix : manim/voix/terminale-ps-espace-defi.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
#   --disable_caching manim/scripts/terminale/ps_espace_defi.py PsEspaceDefiTerminale \
#   --media_dir manim/scripts/terminale/media-ps-espace-defi --dry_run

import math
import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_AXE, C_FANTOME, C_NORMALE, C_PIEGE, C_PLAN,  # noqa: E402
                      C_POINT, C_REGARD, C_VECTEUR, C_VECTEUR2, Repere3D,
                      plan_dessine, platitude, point3)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import CompteARebours, P, EcransEspace, pastille_pause  # noqa: E402

# ── les données de l'épisode, écrites UNE fois ─────────────────────────────
# ⭐ Le cube ABCDEFGH dans le repère (A ; AB, AD, AE) — la figure de SEPT voix de la
# série et de SIX scripts (recompté le 23/11 : le « neuf » qui circulait était une
# intention de conception, jamais mesurée). Celui-ci est le septième script.
S = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
     "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}
NORMALE = S["G"]                      # A⃗G = (1 ; 1 ; 1), la normale du plan (BDE)
D_PLAN = -1                           # (BDE) : x + y + z − 1 = 0
K = (1 / 3, 1 / 3, 1 / 3)             # le projeté orthogonal de A sur (BDE)
# ⛔ LA COLONNE DE DROITE DE L'ÉCRAN 02 PART DE 1,3 ET NON DE 2,2 (XL du socle) : la
# mesure disait « RÉTRÉCI (5,10 → 4,40) » sur ses deux blocs. ⭐ La cote est écrite UNE
# fois ici et importée par `mesure-ps-espace-defi.py` : deux copies d'une seule vérité
# divergent dès qu'on en touche une (la cote de Ravi, épisode 10).
XL02 = 1.3
# ⛔⛔ LE CUBE EST AU MÊME `u` SUR LES TROIS ÉCRANS QUI LE DESSINENT, ET LES DEUX NOMS
# ÉCARTÉS N'ONT QU'UNE COTE. Mesuré : au décalage par défaut de `cube()`, le nom « D »
# est à MOINS de 0,08 de l'arête [A D] et « F » à moins de 0,08 de [F G] — les deux
# lettres sont posées sur un trait, et `etiquettes()` ne peut pas le voir (il compare des
# boîtes entre elles, jamais une boîte à un SEGMENT : c'est le contrôle neuf de E9).
# ⭐ Les deux cotes viennent d'une RECHERCHE EN GRILLE (pas de 0,04 entre −0,9 et +0,9,
# on garde ce qui est à plus de 0,11 de tout segment tracé — les douze arêtes ET la
# diagonale [A G] — et à plus de 0,22 des sept autres noms, puis on classe par distance
# au sommet) : 274 positions libres pour « D », la meilleure à (−0,26 ; +0,30).
# ⚠️ ET UNE COTE EST RELATIVE À SON `u` : à u = 1,18, le même (−0,26 ; +0,30) remettait
# « D » à 0,07 de l'arête [A E]. D'où un seul `u` pour les trois écrans — une cote qui
# vaut sur un écran et pas sur l'autre se lit comme un réglage à affiner alors que c'est
# l'échelle qui a changé (la leçon de `ecart()` sur E10).
# ⚠️⚠️ ET « D » EST MONTÉ DE 0,30 À 0,42 APRÈS LE GROS PLAN : le point K de l'écran 09b
# est AU TIERS de la diagonale, donc à 0,36 du nom « D » posé à 0,30 — au recadrage ×2,6,
# la lettre ambre et le POINT VERT se lisaient comme un seul objet. ⛔ Et aucun instrument
# ne pouvait le dire : `etiquettes()` compare des étiquettes entre elles,
# `loin_des_fleches()` une étiquette à un SEGMENT — aucun des deux ne connaît un POINT.
# C'est le trou d'instrument de cet épisode, et la mesure passe désormais le point K dans
# la liste des obstacles (un segment de longueur nulle).
U_CUBE = 1.30
ECARTE_CUBE = {"D": np.array([-0.26, 0.42, 0.0]),
               "F": np.array([0.26, -0.30, 0.0])}


def ps(u, v):
    return sum(u[i] * v[i] for i in range(3))


def norme2(u):
    return ps(u, u)


def moins(a, b):
    return tuple(b[i] - a[i] for i in range(3))


BD, BE, DE = moins(S["B"], S["D"]), moins(S["B"], S["E"]), moins(S["D"], S["E"])


def angle(u, v):
    """L'angle de deux vecteurs, en degrés — recalculé, jamais recopié de la voix."""
    return math.degrees(math.acos(ps(u, v) / math.sqrt(norme2(u) * norme2(v))))


# ── la passe maths du script, refaite indépendamment de la voix ────────────
# ⭐ Aucun nombre affiché par cet épisode n'est recopié de la voix : ils sont tous
# recalculés ici, et une erreur de voix se verrait comme un écart entre les deux.
# ⛔ C'est la règle fondée sur « 6 032 a 3 centaines » (série des entiers) : un « oui »
# de Frédéric valide le ton, pas l'arithmétique.
# 05 : A⃗G est bien normal au plan (BDE), et l'équation est bien x + y + z − 1 = 0.
assert ps(NORMALE, BD) == 0 and ps(NORMALE, BE) == 0
assert ps(NORMALE, S["B"]) + D_PLAN == 0          # B est dans le plan
assert ps(NORMALE, S["D"]) + D_PLAN == 0          # D aussi
assert ps(NORMALE, S["E"]) + D_PLAN == 0          # E aussi
assert ps(NORMALE, S["A"]) + D_PLAN != 0          # … et A n'y est pas : le défi existe
# ⛔ et B⃗D, B⃗E ne sont PAS colinéaires — c'est la phrase que l'écran 04 fait gagner.
assert np.linalg.norm(np.cross(BD, BE)) > 1e-9
# 07b : le triangle (BDE) est équilatéral de côté √2, et l'angle en B vaut 60°.
assert norme2(BD) == 2 and norme2(BE) == 2 and norme2(DE) == 2
assert abs(math.sqrt(2) - 1.4142) < 1e-4
assert ps(BD, BE) == 1                            # « moins 1 fois moins 1 » = 1, pas 0
assert abs(angle(BD, BE) - 60) < 1e-9             # 60° EXACTEMENT
# 09b : la droite (A ; n⃗) coupe le plan en t = 1/3, et la distance vaut √3/3.
_t = -D_PLAN / norme2(NORMALE)
assert abs(_t - 1 / 3) < 1e-12 and norme2(NORMALE) == 3
assert all(abs(K[i] - _t * NORMALE[i]) < 1e-12 for i in range(3))
assert abs(K[0] ** 2 - 1 / 9) < 1e-12 and abs(3 * (1 / 9) - 1 / 3) < 1e-12
assert abs(math.sqrt(norme2(K)) - math.sqrt(1 / 3)) < 1e-12
assert abs(math.sqrt(1 / 3) - math.sqrt(3) / 3) < 1e-12
assert abs(math.sqrt(3) / 3 - 0.5774) < 1e-4 and round(math.sqrt(3) / 3, 2) == 0.58
# … et la formule de la distance d'un point à un plan donne le même nombre : deux
# chemins, un seul résultat. C'est le contrôle qu'on ne peut pas se payer à vue.
assert abs(abs(ps(NORMALE, S["A"]) + D_PLAN) / math.sqrt(norme2(NORMALE))
           - math.sqrt(3) / 3) < 1e-12
# ⭐ « K est au tiers de la grande diagonale [A G] » : c'est la chute de l'épisode.
assert abs(math.sqrt(norme2(K)) / math.sqrt(norme2(NORMALE)) - 1 / 3) < 1e-12

# ⛔⛔ CE QUE LA CAVALIÈRE FERAIT DU TRIANGLE B D E — mesuré, et c'est pourquoi la
# figure de l'écran 07b est PLANE (voir l'en-tête du fichier).
PLATITUDE_BDE = platitude(NORMALE)


def _projete(p):
    q = point3((0, 0, 0), 1.0, *p)
    return float(q[0]), float(q[1])


def _long_projetee(p, q):
    a, b = _projete(p), _projete(q)
    return math.hypot(b[0] - a[0], b[1] - a[1])


COTES_PROJETES = (_long_projetee(S["B"], S["D"]), _long_projetee(S["B"], S["E"]),
                  _long_projetee(S["D"], S["E"]))
assert PLATITUDE_BDE < 12.0                       # une LAME, pas une surface
assert max(COTES_PROJETES) / min(COTES_PROJETES) > 2.0   # trois côtés « égaux » : 1 à 2,2
_b, _d, _e = (_projete(S[k]) for k in "BDE")
_v1 = (_d[0] - _b[0], _d[1] - _b[1])
_v2 = (_e[0] - _b[0], _e[1] - _b[1])
_a = math.degrees(math.atan2(_v2[1], _v2[0]) - math.atan2(_v1[1], _v1[0])) % 360
ANGLE_APPARENT_B = min(_a, 360 - _a)
assert abs(ANGLE_APPARENT_B - 19.1) < 0.6         # 19,1° à l'écran pour 60° réels
assert abs(ANGLE_APPARENT_B - angle(BD, BE)) > 35  # … soit 41 degrés de mensonge


# ── les deux figures PLANES de l'épisode ───────────────────────────────────

def equerre(sommet, vers1, vers2, taille=0.20, couleur=C_NORMALE, sw=4):
    """LE PETIT CARRÉ DE L'ANGLE DROIT, dans une figure PLANE.

    ⭐ Celui de `espace3d.angle_droit` travaille dans un repère (il prend des triplets) ;
    ici les deux figures sont planes, donc il n'y a rien à projeter — et l'angle droit
    dessiné EST droit. ⛔ C'est la différence qu'il faut garder en tête : dans le cube,
    ce carré est une CONVENTION ; ici, c'est une mesure."""
    d1 = np.array(vers1, dtype=float)
    d2 = np.array(vers2, dtype=float)
    d1 = d1 / max(1e-9, float(np.linalg.norm(d1))) * taille
    d2 = d2 / max(1e-9, float(np.linalg.norm(d2))) * taille
    s = np.array(sommet, dtype=float)
    return VGroup(Line(s + d1, s + d1 + d2),
                  Line(s + d2, s + d1 + d2)).set_stroke(couleur, sw)


def dedans(pt, poly):
    """Le point est-il DANS le polygone (lancer de rayon) ?

    ⭐ Contrôle neuf de l'épisode 8, payé au gros plan : une flèche dont la pointe sort
    du morceau de plan contredit la légende qui est juste dessous. Il est ici au niveau
    du MODULE et non du seul script de mesure, parce que deux assertions d'import s'en
    servent : une figure fausse doit casser à l'import, pas à la planche."""
    x, y = float(pt[0]), float(pt[1])
    d, n = False, len(poly)
    for i in range(n):
        x1, y1 = float(poly[i][0]), float(poly[i][1])
        x2, y2 = float(poly[(i + 1) % n][0]), float(poly[(i + 1) % n][1])
        if (y1 > y) != (y2 > y) and x < x1 + (y - y1) / (y2 - y1) * (x2 - x1):
            d = not d
    return d


def plan_normale(larg=2.9, prof=1.05, cisaille=0.55, h_norm=1.15, s=1.0):
    """UN PLAN DESSINÉ À PLAT, SA NORMALE, ET DEUX VECTEURS DU PLAN.

    ⭐⭐ `plan_dessine` et non `r.plan(...)`, et c'est une MESURE, pas un goût :
    `platitude((1 ; 1 ; 1))` = 9,02°, donc le plan de cet épisode se projetterait sur une
    lame (voir l'en-tête). Cette figure ne prétend pas dire OÙ est le plan : elle dit ce
    qu'est une normale — orthogonale à DEUX directions du plan — et c'est exactement ce
    que l'écran 02 doit montrer. ⛔ Donc jamais à côté d'axes (règle de `plan_dessine`).

    ⛔⛔ UN SEUL CARRÉ D'ANGLE DROIT, ET C'EST UNE MESURE QUI L'A DÉCIDÉ. Premier jet :
    deux carrés, un par vecteur du plan — et l'assertion d'import a crié « la normale du
    schéma 02 n'est pas orthogonale à v ». Elle avait raison, et c'était le défaut n° 3
    de l'épisode 8 (« v pointait hors du plan, dans l'écran qui enseigne que u et v sont
    DANS le plan ») sous sa forme d'angle : sur un plan dessiné en perspective, AUCUNE
    direction de la page n'est perpendiculaire aux DEUX côtés du parallélogramme à la
    fois. La normale verticale fait **90,0°** avec le côté horizontal (u⃗) et **46,6°**
    avec le côté de fuite (v⃗) — un « carré » de 46,6° ne se lit pas comme une convention,
    il se lit comme un dessin bâclé.
    ⭐ Donc : le carré n'est posé que là où l'angle de la PAGE est vraiment droit, et
    l'orthogonalité à v⃗ est portée par le « n⃗ · v⃗ = 0 » écrit dans la colonne, qui paraît
    au même instant. Dans une figure dont tout l'argument est « à plat, donc rien n'y
    mente », un demi-mensonge est pire que pas de carré du tout.
    ⚠️ Les deux directions du plan sont LUES SUR LES CÔTÉS du parallélogramme rendu, pas
    réécrites : au premier jet, dv était calculé à la main et la pointe de v⃗ sortait du
    plan de 0,02 (y = 0,546 pour un bord haut à 0,525). Vérifié par une assertion.

    Rend (plan, u, v, normale, equerre) — CINQ morceaux, et les cinq sont joués :
    `plan_poteau` de l'épisode 8 en rendait cinq pour quatre `play`, et ses deux carrés
    d'angle droit n'ont jamais paru."""
    pl = plan_dessine(largeur=larg, profondeur=prof, cisaille=cisaille, couleur=C_PLAN,
                      op=0.24, sw=4)
    o = ORIGIN
    c = pl.coins
    du = (c[1] - c[0]) * 0.30          # le côté « largeur » : horizontal sur la page
    dv = (c[3] - c[0]) * 0.46          # le côté de fuite du parallélogramme
    n = Arrow(o, o + UP * h_norm, buff=0, stroke_width=7, color=C_NORMALE,
              max_tip_length_to_length_ratio=0.16)
    fu = Arrow(o, o + du, buff=0, stroke_width=6, color=C_VECTEUR,
               max_tip_length_to_length_ratio=0.18)
    fv = Arrow(o, o + dv, buff=0, stroke_width=6, color=C_VECTEUR2,
               max_tip_length_to_length_ratio=0.20)
    eq = equerre(o, UP, du, 0.20)
    g = VGroup(pl, fu, fv, n, eq)
    g.plan, g.normale, g.fu, g.fv, g.eq = pl, n, fu, fv, eq
    g.du, g.dv, g.coins = du, dv, c
    return g.scale(s)


def triangle_plan(cote=1.55, r_arc=0.40, s=1.0):
    """LE TRIANGLE (BDE) DESSINÉ À PLAT — ÉQUILATÉRAL, parce qu'il l'est.

    ⛔⛔ C'EST LA FIGURE LA PLUS IMPORTANTE DE L'ÉPISODE, ET ELLE EST PLANE PAR MESURE.
    Dans la cavalière de la série, les trois côtés du triangle B D E se projettent à
    0,656 · 1,414 · 0,822 et l'angle en B se lit 19,1° au lieu de 60° (chiffres de
    l'en-tête, revérifiés par une assertion). Dessiné dans le cube, ce triangle dirait
    donc le contraire de la voix — c'est le défaut « un schéma porte les bons nombres et
    ment sur sa forme » de l'épisode 9, dans sa forme la plus grave : ici le mensonge
    porte sur la RÉPONSE de la question-pause.
    ⭐ Ici l'équilatéralité est vérifiée par une assertion du module, comme les angles de
    `coin()` sur l'épisode 10 et le 3-4-5 de l'épisode 9.
    ⚠️ B est en bas à gauche, D en bas à droite, E au sommet : l'angle marqué est celui
    en B, celui dont la question demande s'il est droit.

    Rend le groupe, ses trois sommets (`.B`, `.D`, `.E`), ses trois côtés (`.cBD`,
    `.cBE`, `.cDE`) et l'arc en B (`.arc`)."""
    b = np.array([0.0, 0.0, 0.0])
    d = np.array([cote, 0.0, 0.0])
    e = np.array([cote / 2, cote * math.sqrt(3) / 2, 0.0])
    # ⛔⛔ LES TROIS CÔTÉS SONT DE LA MÊME COULEUR, ET C'EST LA PLANCHE DES FIGURES SEULES
    # QUI L'A DIT. Premier jet : bleu, rose et ambre — un côté par couleur de la charte.
    # En grand, on lit TROIS objets différents, sur l'écran dont toute la leçon est que
    # les trois côtés sont ÉGAUX. C'est le défaut « un schéma porte les bons nombres et
    # ment sur sa forme » de E9 déplacé dans la couleur : la figure était géométriquement
    # juste et disait le contraire de la voix. ⭐ Trois côtés égaux, une seule couleur ;
    # c'est l'ARC qui est vert, parce que lui dit autre chose (l'angle de 60°).
    cBD = Line(b, d).set_stroke(C_REGARD, 6)
    cBE = Line(b, e).set_stroke(C_REGARD, 6)
    cDE = Line(d, e).set_stroke(C_REGARD, 6)
    arc = Arc(radius=r_arc, start_angle=0.0, angle=math.radians(60), color=VERT_OK,
              stroke_width=5).move_arc_center_to(b)
    g = VGroup(cBD, cBE, cDE, arc)
    g.B, g.D, g.E = b, d, e
    g.cBD, g.cBE, g.cDE, g.arc = cBD, cBE, cDE, arc
    g.cote = cote
    return g.scale(s)


# ── les figures planes disent-elles ce qu'elles annoncent ? ────────────────
# ⭐⭐ L'ASSERTION QUI MANQUAIT À L'ÉPISODE 9 jusqu'à ce que la planche des figures seules
# montre un « 3-4-5 » faux de 13 %. Un dessin peut être dans la marge, porter les bons
# nombres, et mentir sur ce qu'il montre. Alors on le CALCULE.
_tr = triangle_plan()
_l = (float(np.linalg.norm(_tr.D - _tr.B)), float(np.linalg.norm(_tr.E - _tr.B)),
      float(np.linalg.norm(_tr.E - _tr.D)))
assert max(_l) - min(_l) < 1e-9, f"triangle_plan n'est pas équilatéral : {_l}"
_u1, _u2 = _tr.D - _tr.B, _tr.E - _tr.B
_ang = math.degrees(math.acos(float(_u1 @ _u2) / (np.linalg.norm(_u1) * np.linalg.norm(_u2))))
assert abs(_ang - 60) < 1e-6, f"l'angle en B du dessin vaut {_ang}°"
# … et la figure de l'écran 02 : la normale dessinée est bien orthogonale aux DEUX
# vecteurs du plan (sinon la figure contredirait la légende, défaut n° 3 de E8).
_pn = plan_normale()
_dn = _pn.normale.get_end() - _pn.normale.get_start()
# ⛔ LE CARRÉ N'EST POSÉ QUE LÀ OÙ L'ANGLE DE LA PAGE EST VRAIMENT DROIT (voir
# `plan_normale`) : u⃗ est horizontal, donc n⃗ ⊥ u⃗ sur la page. Pour v⃗, qui suit le côté
# de fuite, il n'y a pas de carré — et l'angle de page est noté ici pour que personne ne
# le « corrige ».
assert abs(float(np.dot(_dn[:2], np.array(_pn.du)[:2]))) < 1e-9, \
    "la normale du schéma 02 n'est pas orthogonale à u sur la page"
ANGLE_PAGE_NV = math.degrees(math.acos(
    abs(float(np.dot(_dn[:2], np.array(_pn.dv)[:2])))
    / (np.linalg.norm(_dn[:2]) * np.linalg.norm(np.array(_pn.dv)[:2]))))
assert abs(ANGLE_PAGE_NV - 46.6) < 1.0        # 46,6° : d'où le carré unique
# ⛔⛔ ET LES DEUX POINTES DES VECTEURS DU PLAN SONT DANS LE PLAN, la pointe de la
# normale est DEHORS. C'est le contrôle neuf de E8 (« une flèche qui sort de son plan
# contredit la légende »), ici en assertion d'import : au premier jet la pointe de v⃗
# sortait de 0,02 par le bord haut, et rien d'autre ne l'aurait dit.
_poly = [k[:2] for k in _pn.coins]
assert dedans(_pn.fu.get_end(), _poly), "la pointe de u sort du plan (écran 02)"
assert dedans(_pn.fv.get_end(), _poly), "la pointe de v sort du plan (écran 02)"
assert not dedans(_pn.normale.get_end(), _poly), "la normale ne sort pas du plan (02)"


class PsEspaceDefiBase(EcransEspace):
    fichier_marques = "ps_espace_defi_marques.json"
    nom_voix = "terminale-ps-espace-defi"

    # ── les outils propres à cet épisode ───────────────────────────────────

    def lettres(self, mob):
        """UN TEXTE DONT LA VOIX DIT LES NOMBRES EN TOUTES LETTRES — hors audit, et
        c'est structurel (même mécanisme que le `zero()` de E8, le `lettres()` de E9 et
        de E10). Ici : « zéro » dans toutes les équations du cube, « un tiers », « un
        neuvième », « trois neuvièmes ». À l'écran d'un cours de maths français, « 0 » et
        « 1/3 » sont les seules écritures justes — mais ces chaînes n'existent pas dans
        le texte de la voix, et chacune sortirait en AUDIT-ABSENT en noyant le seul
        signalement qu'on cherche."""
        return self.sans_audit(mob)

    def env(self, v, fs=26, color=GREY_A):
        """« ≈ 0,58 » — hors audit : la voix dit « environ zéro virgule 58 », donc la
        chaîne « 0,58 » n'est nulle part dans son texte. ⭐ Et l'arrondi est écrit à la
        française (virgule), par `self.nombre`."""
        return self.sans_audit(self.t("≈ " + self.nombre(v), fs, color))

    def nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« n⃗ (1 ; 1 ; 1) » : le nom du VECTEUR avec sa flèche, puis son triplet."""
        g = VGroup(self.vec(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def point_nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« B (1 ; 0 ; 0) » : un POINT et ses coordonnées — SANS flèche.
        ⛔ Et c'est le sujet de la convention de la série : B est un point, B⃗D est un
        vecteur. Si les deux notations se ressemblaient, l'écran 04 n'aurait plus rien à
        démontrer. (`auditer-fleches-vecteurs.py` ne voit rien ici : une majuscule seule
        n'est pas un nom de vecteur pour lui.)"""
        g = VGroup(self.t(nom, fs, c_nom, ), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def tiers(self, fs=28, color=WHITE):
        """« 1/3 » — écrit avec une BARRE OBLIQUE, et il faut dire pourquoi.

        ⛔ Le socle n'a pas de primitive de fraction (`frac` vit dans l'épisode 10), et
        je n'ai pas le droit d'en ajouter une au socle : la règle de la maison est qu'une
        correction d'outil se fait dans le socle ou nulle part, et deux copies d'une
        seule vérité divergent dès qu'on en touche une (leçon de la cote de Ravi, E10).
        ⭐ La barre oblique suffit ICI, et c'est mesurable : le piège de E10 était
        « cos θ = u⃗ · v⃗ / ‖u⃗‖ × ‖v⃗‖ », où le dénominateur est un PRODUIT et où la
        lecture devient fausse. « 1/3 » n'a qu'un numérateur et qu'un dénominateur d'un
        seul terme : il n'y a aucune ambiguïté à lever.
        ⚠️ Hors audit : la voix dit « un tiers »."""
        return self.lettres(self.t("1/3", fs, color))

    def cube_repere(self, o, u, rouges=(), fs=24, ecarte=None):
        """LE CUBE UNITÉ ABCDEFGH — ⛔ SANS AXES, et c'est une correction payée à l'image
        sur l'épisode 6 (recopiée ici avec sa raison, comme sur E7 à E10).

        Dans CE repère-là, les trois axes sont PORTÉS PAR TROIS ARÊTES DU CUBE (A B,
        A D, A E) : dessinés avec `portee=2`, ils se superposent aux arêtes sur leur
        première moitié, et le bout de l'axe des y tombe À L'INTÉRIEUR du solide.
        ⭐ Le repère est DIT, pas tracé : `base_repere` le montre par trois flèches
        posées sur les trois arêtes qui partent de A.
        ⚠️ `u` reste entre 1,15 et 1,6 : à 0,95 les noms des sommets se touchent.

        ⛔⛔ `ecarte` — UN NOM DE SOMMET QU'UNE FLÈCHE TRAVERSE. La grande diagonale A⃗G
        passe à 0,00 du nom « D » et à 0,10 du nom « F » (en cavalière, A G se projette
        sur (1,41 ; 1,287) et frôle le projeté de D comme celui de F). `etiquettes()`
        compare des BOÎTES entre elles : il ne peut pas le voir. C'est
        `loin_des_fleches()` qui le dit — et ⛔ il faut lui passer TOUS les segments
        tracés, sinon il déplace le défaut au lieu de le corriger."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=2)
        cube = self.sans_audit(r.cube(cote=1, rouges=rouges, couleur=C_POINT, sw=4, fs=fs))
        for lettre, offset in (ecarte or {}).items():
            for sub in cube.submobjects:
                if isinstance(sub, Text) and sub.text == lettre:
                    sub.move_to(cube.sommet(lettre) + offset)
        return r, cube

    def base_repere(self, r, couleur=C_AXE, sw=5):
        """LES TROIS VECTEURS DE BASE A⃗B, A⃗D, A⃗E — le repère de l'énoncé, montré.
        ⛔ Sans lettres : un « y » posé au bout de A D tomberait dans le cube.
        ⚠️ En GRIS : dans cet épisode, A⃗G (ambre) et A⃗K (vert) partent du même point A.
        Trois flèches de plus en couleur y feraient une étoile illisible."""
        return VGroup(*[r.vecteur(S["A"], S[s], None, couleur=couleur, sw=sw)
                        for s in ("B", "D", "E")])

    def rangees(self, lignes, y, buff=0.34, plafond=10.6, x=-0.75):
        """UN TABLEAU DE RANGÉES SUR TOUTE LA LARGEUR — pastille + contenu.

        ⭐ Recette de l'écran 03 de E5, reprise sur E6 et E10 : on arrange, on BORNE à
        10,6 et on centre en x = −0,75, à l'écart de Ti-Margo (sa boîte commence à 5,54
        à `scale=0,5`). ⚠️ Le plafond réduit en SILENCE : c'est `mesure-ps-espace-defi.py`
        qui le signale (`plafonne()`), et c'est la correction d'outil de E7.
        ⛔ Les pastilles, elles, ne rétrécissent pas avec la police (rayon fixe) : à cinq
        rangées elles pèsent 2,40 à elles seules, et c'est la POLICE du texte qui cède."""
        rangs = [VGroup(self.pastille(k), corps).arrange(RIGHT, buff=0.30,
                                                         aligned_edge=UP)
                 for k, corps in enumerate(lignes, start=1)]
        g = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=buff)
        if g.width > plafond:
            g.scale_to_fit_width(plafond)
        g.move_to(P(x, y))
        g.rangs = rangs
        return g

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Exercice type bac", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Exercice type bac")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        # ⛔ L'ORDRE EST CELUI DE LA VOIX : « Une normale, une équation, une distance »
        # est une énumération, et chaque terme a son instant (piège n° 6 des entiers :
        # un bloc qui porte ce que la voix énumère se remplit au rythme de la voix).
        promesses = (("une normale", C_NORMALE, "Une normale"),
                     ("une équation", C_PLAN, "une équation"),
                     ("une distance", C_REGARD, "une distance"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, 36, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.40)
        lignes.move_to(P(-0.9, 0.95))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔ UNE SEULE LIGNE, et à −1,55 : `echelle()` alignée en bas occupe y de −3,45 à
        # −1,98 (mesuré sur E5, où la note de reprise annonçait −2,6 et avait tort). Une
        # ligne simple à −1,55 descend à −1,75 : elle passe de 0,23.
        fin = self.t("toujours le même fil, en quatre questions", 30, VERT_OK)
        fin.move_to(P(-0.9, -1.55))
        self.au_mot("c'est toujours le même fil")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : le chemin des sujets de bac ───────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Regarde les sujets des années passées")
        titre = self.t("Toujours le même chemin", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⛔ 28 ET NON 30, ET C'EST LA MESURE QUI L'A DIT : à 30 le tableau faisait 10,97
        # pour un plafond de 10,60, donc `scale_to_fit_width` réduisait LES TROIS ÉTAPES
        # de 3,4 % en silence. ⚠️ Les pastilles ne rétrécissent pas avec la police (rayon
        # fixe) : c'est toujours le texte qui cède (correction d'outil de E7, `plafonne`).
        fs = 28
        etapes = (("on démontre qu'un vecteur est normal à un plan", C_NORMALE,
                   "On démontre qu'un vecteur est normal à un plan"),
                  ("on en déduit l'équation de ce plan", C_PLAN,
                   "On en déduit l'équation de ce plan"),
                  ("on calcule une distance, un projeté, ou un angle", C_REGARD,
                   "Puis on calcule une distance"))
        g = self.rangees([self.t(txt, fs, coul) for txt, coul, _ in etapes], 1.05)
        # ⭐ LE FIL EST DESSINÉ, et c'est le mot de la voix (« c'est toujours le même
        # fil ») : un trait vertical qui enfile les trois pastilles. ⚠️ Il est construit
        # APRÈS le `move_to` du tableau, sinon il relie des positions périmées — c'est la
        # leçon de `placer` sur le cube de E9 (« une cote relative à une autre cote se
        # périme au premier changement de l'une des deux »).
        haut = g.rangs[0][0].get_center()
        bas = g.rangs[-1][0].get_center()
        fil = Line(haut, bas).set_stroke(C_REGARD, 4).set_z_index(-1)
        self.play(Create(fil), run_time=0.5)
        for b, (_, _, extrait) in zip(g.rangs, etapes):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15),
                      run_time=0.5)
        # ⭐ La CONCLUSION va en bas, sur toute la largeur, en grand (défaut n° 4 de E3 :
        # le bas de la colonne de droite est réservé aux lignes COURTES).
        self.au_mot("Si tu reconnais le chemin")
        fin = VGroup(self.t("si tu reconnais le chemin,", 30, GREY_A),
                     self.t("tu ne cherches plus quoi faire : tu avances", 30, VERT_OK))
        fin.arrange(DOWN, buff=0.12)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.18, stroke_width=3)
        VGroup(fin, cad).move_to(P(-0.75, -2.35))
        self.play(FadeIn(fin[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("tu avances")
        self.play(FadeIn(fin[1], shift=UP * 0.1), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 02 : le fil en trois étapes ────────────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Le fil, en trois étapes")
        titre = self.t("Le fil, en trois étapes", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 26

        # ── la figure PLANE, à gauche ─────────────────────────────────────
        # ⛔⛔ À PLAT, ET C'EST UNE MESURE : `platitude((1 ; 1 ; 1))` = 9,02°, donc le
        # plan de cet épisode se projetterait sur une LAME dans la cavalière de la série
        # (voir l'en-tête). Cette figure ne dit pas OÙ est le plan, elle dit ce qu'est une
        # normale — et son orthogonalité aux deux vecteurs est vérifiée par une assertion.
        # ⛔ Et donc, règle de `plan_dessine` : aucun axe à côté.
        fig = plan_normale(s=1.0).move_to(P(-4.30, 1.30))
        leg = self.sans_audit(self.t("le plan vu à plat", 22, C_FANTOME))
        leg.next_to(fig, DOWN, buff=0.16)
        self.au_mot("deux produits scalaires nuls")
        self.play(FadeIn(fig.plan), GrowArrow(fig.fu), GrowArrow(fig.fv),
                  FadeIn(leg), run_time=0.7)
        self.au_mot("prouvent qu'un vecteur est normal au plan")
        self.play(GrowArrow(fig.normale), Create(fig.eq), run_time=0.7)

        # ── ① et ② dans la colonne de droite ──────────────────────────────
        # ⛔ LES DEUX « 0 » SONT HORS AUDIT, ET LE DRY RUN L'A DIT (2 × AUDIT-ABSENT) :
        # la voix dit « deux produits scalaires NULS », jamais « zéro ». À l'écran, « = 0 »
        # est la seule écriture juste d'un produit scalaire nul — mais la chaîne « 0 »
        # n'existe nulle part dans le texte du clip. Même mécanisme que `eq_zero` du
        # socle, qui sort le zéro du second membre d'une équation.
        e1 = VGroup(self.pastille(1),
                    VGroup(self.lettres(self.vexpr("n · u = 0 et n · v = 0",
                                                   ("n", "u", "v"), fs, VERT_OK)),
                           self.vexpr("⟹ n est normal au plan", ("n",), fs, WHITE))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.10))
        e1.arrange(RIGHT, buff=0.24, aligned_edge=UP)
        # ⛔⛔ LA COLONNE PART DE x = 1,3 ET NON DE 2,2, ET C'EST UNE MESURE : à xl = 2,2
        # elle n'offre que 4,40, et les blocs ① et ② font 5,10 et 5,04 — `col()` les
        # rétrécissait tous les deux (le défaut n° 4 de E3). La figure de gauche s'arrête
        # à x = −2,30, donc la place existe. ⚠️ Le garde-fou Ti-Margo de `col()` réduirait
        # à 5,3 − 1,3 = 4,0 tout bloc dont le bas passe sous −1,95 : les trois blocs de
        # cette colonne s'arrêtent à −0,21, donc il ne les touche pas.
        self.col(e1, 2.25, XL02)
        self.play(FadeIn(e1, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("ce vecteur donne les coefficients")
        e2 = VGroup(self.pastille(2),
                    VGroup(self.eq_zero("a x + b y + c z + d", fs, WHITE),
                           self.sans_audit(self.t("(a ; b ; c) est la normale", fs,
                                                  C_PLAN)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.10))
        e2.arrange(RIGHT, buff=0.24, aligned_edge=UP)
        self.col(e2, 0.85, XL02)
        self.play(FadeIn(e2, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("un point du plan donne le terme constant")
        pt = self.col(self.sans_audit(self.t("un point du plan donne d", 24, GREY_A)),
                      -0.05, XL02)
        self.play(FadeIn(pt, shift=RIGHT * 0.12), run_time=0.45)

        # ── ③ en bas, sur toute la largeur ────────────────────────────────
        # ⛔ EN BAS ET SUR TOUTE LA LARGEUR, pas dans la colonne de droite : les trois
        # débouchés font une ligne de plus de 9 de large, et `col()` n'en offre que 4,40
        # — ce qui est la leçon « la conclusion va à gauche, en grand » de E3.
        self.au_mot("avec la normale, on atteint tout le reste")
        tete3 = VGroup(self.pastille(3),
                       self.t("avec la normale, on atteint tout le reste :", 28, C_REGARD))
        tete3.arrange(RIGHT, buff=0.24).move_to(P(-0.75, -1.45))
        self.play(FadeIn(tete3, shift=RIGHT * 0.12), run_time=0.5)
        debouches = (("le projeté", "on suit la normale", C_NORMALE,
                      "le projeté orthogonal en suivant la normale"),
                     ("la distance", "une norme", C_REGARD,
                      "la distance en calculant une norme"),
                     ("l'angle", "on divise par les normes", C_VECTEUR,
                      "l'angle en divisant par les normes"))
        colonnes = []
        for g_, d_, coul, _ in debouches:
            colonnes.append(VGroup(self.t(g_, 26, coul),
                                   self.sans_audit(self.t(d_, 22, WHITE)))
                            .arrange(DOWN, buff=0.08))
        trois = VGroup(*colonnes).arrange(RIGHT, buff=0.80)
        if trois.width > 10.6:
            trois.scale_to_fit_width(10.6)
        trois.move_to(P(-0.75, -2.60))
        for b, (_, _, _, extrait) in zip(colonnes, debouches):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 03 : la boîte à outils, CINQ objets ────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("Ta boîte à outils complète")
        titre = self.t("Cinq objets, et ils suffisent", 44, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 26
        # ⚠️ CINQ RANGÉES, une de plus que E6, et la police vient de la mesure : le
        # plafond de la bande centrale est 10,60, et une réduction par le plafond ne se
        # signale QUE dans `mesure-ps-espace-defi.py` (correction d'outil de E7).
        # ⚠️ La troisième rangée porte un RADICAL, donc elle est plus HAUTE que les
        # autres (0,07 au-dessus du radicande) : la hauteur du tableau est mesurée AVEC.
        norme = VGroup(self.vexpr("‖u‖ =", ("u",), fs, WHITE),
                       self.racine(self.t("x² + y² + z²", fs, WHITE), fs, WHITE))
        norme.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        eq = VGroup(self.eq_zero("a x + b y + c z + d", fs, WHITE),
                    self.sans_audit(self.t("et (a ; b ; c) est sa normale", fs, C_PLAN)))
        eq.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        outils = (
            (VGroup(self.t("le produit scalaire :", fs, C_VECTEUR),
                    self.sans_audit(self.t("x x′ + y y′ + z z′", fs, WHITE)))
             .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
             "Le produit scalaire en coordonnées"),
            (VGroup(self.t("produit nul :", fs, C_NORMALE),
                    self.t("vecteurs orthogonaux", fs, WHITE))
             .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
             "Produit nul, vecteurs orthogonaux"),
            (VGroup(self.t("la norme :", fs, C_VECTEUR2), norme)
             .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
             "La norme, racine de la somme des carrés"),
            # ⛔ « l'équation : » ET NON « l'équation d'un plan : », ET C'EST LA MESURE :
            # avec le libellé long, les cinq rangées faisaient 11,17 pour un plafond de
            # 10,60, donc LA BOÎTE À OUTILS — l'écran que l'élève photographie — était
            # réduite de 5,1 % sans que rien ne le dise. Le mot « plan » est déjà dans la
            # seconde ligne de la cellule.
            (VGroup(self.t("l'équation :", fs, C_PLAN), eq)
             .arrange(RIGHT, buff=0.22, aligned_edge=UP),
             "Les coefficients de l'équation d'un plan"),
            (VGroup(self.t("le projeté orthogonal :", fs, VERT_OK),
                    self.sans_audit(self.t("on suit la normale", fs, WHITE)))
             .arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
             "le projeté orthogonal"),
        )
        g = self.rangees([corps for corps, _ in outils], 0.25, buff=0.30)
        for b, (_, extrait) in zip(g.rangs, outils):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15),
                      run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : B) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔⛔ AUCUNE FIGURE, ET C'EST LA RÈGLE « le dessin porte la DONNÉE, jamais la
        # RÉPONSE » à son point le plus serré : la seule figure qui aurait un sens ici
        # serait un plan avec sa normale et DEUX vecteurs du plan — c'est-à-dire la
        # réponse B dessinée. C'est le choix de l'écran 07 de E10 (« aucune figure : un
        # angle dessiné donnerait un indice »).
        don = self.sans_audit(self.vexpr("n ⊥ au plan (BDE) ?", ("n",), 42, C_REGARD))
        self.gauche(don, 1.55, xmax=0.15)
        # ⚠️ CARTES LARGES (6,2 à partir de x = 0,35) : le choix B fait 86 caractères que
        # la voix dit mot pour mot, et une carte de 4,1 n'offre que 2,20 à son texte —
        # c'est le défaut n° 4 de l'épisode 1. La donnée de gauche s'arrête donc avant
        # x = 0,15.
        # ⛔ UNE SEULE des trois cartes sur trois lignes (la plus longue), les deux autres
        # sur une : c'est le remède mesuré de E6 puis de E8 — ajouter une ligne à TOUS les
        # choix fait descendre le bloc et `col()` les rapetisse tous les trois.
        # ⛔⛔ LES TROIS CHOIX SONT ÉCRITS EN SYMBOLES, ET C'EST UNE MESURE, PAS UN GOÛT.
        # Premier jet, mot pour mot comme la voix (« que n est orthogonal à B D et à B E,
        # et que ces deux vecteurs ne sont pas colinéaires ») : polices obtenues
        # **23,2 / 18,0 / 23,9 px** pour 26 demandées — le défaut n° 4 de l'épisode 1, et
        # 18 px est illisible sur un téléphone. Mesuré : une carte de 6,2 n'offre que
        # 5,05 à son texte, soit **23 caractères** à 26 px ; le choix B en fait 86.
        # ⛔ Et on ne peut pas le couper en quatre lignes : le bloc de cartes descendrait
        # à −2,6, c'est-à-dire DANS la boîte de Ti-Margo (y ∈ [−3,55 ; −2,15]) — c'est le
        # piège de E6 (« ajouter une ligne à un choix rapetisse les trois cartes »).
        # ⭐ Le « ⊥ » est la notation du cours, il a été rendu dans une image d'essai sur
        # l'épisode 8, et l'écran porte déjà « n⃗ ⊥ au plan (BDE) ? » dans sa donnée :
        # l'élève lit le même signe à deux endroits. ⚠️ Et chaque élément que la voix
        # nomme est à l'écran — les DEUX produits, et la non-colinéarité.
        cA = self.vexpr("n ⊥ B D", ("n", "B D"), 28, WHITE)
        cB = self.choix2("n ⊥ B D et n ⊥ B E,", "et non colinéaires", fs=26,
                         noms=("n", "B D", "B E"))
        cC = self.vexpr("n colinéaire à B D", ("n", "B D"), 26, WHITE)
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.vexpr("Pour démontrer qu'un vecteur n est", ("n",), 26)),
             self.sans_audit(self.t("normal au plan (BDE),", 26)),
             self.sans_audit(self.t("que faut-il vérifier ?", 26))],
            [cA, cB, cC], largeur=6.2, xl=0.35)
        # ⛔⛔ LA PAUSE EST DÉPLACÉE EN BAS À GAUCHE, remède mesuré de E8 : posée par
        # `q_tete` sous des cartes qui descendent bas, elle tombe sur la tête de Ti-Margo
        # (boîte x ∈ [5,54 ; 6,66], y ∈ [−3,55 ; −2,15]). Les CARTES, elles, restent où
        # `q_tete` les met.
        self.gauche(pause, -2.95, xmax=0.15)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        # ⛔⛔ L'ATTENTE EST COLLÉE À SON `play` (défaut de l'écran 04 de E8, 4,93 s de
        # retard) : un `au_mot` ne place rien, il ATTEND.
        self.au_mot("Pour démontrer qu'un vecteur")
        self.play(FadeIn(don, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("que faut-il vérifier")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "B")
        self.mem_q1 = (cartes, pause, rebours, don)

    def ecran_reponse1(self):
        cartes, pause, rebours, don = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent par-dessus l'explication (défaut n° 1 de l'épisode 1).
        self.q_reponse(cartes, 1, pause, rebours)
        # ⛔⛔ CET ÉCRAN HÉRITE DE L'ÉCRAN 04 : la question « n⃗ ⊥ (BDE) ? » RESTE — c'est
        # la DONNÉE, et c'est à elle que les quatre lignes répondent (huitième récidive de
        # la série ; les cotes qui suivent en tiennent compte).
        fs = 26
        self.au_mot("Il faut les deux produits scalaires")
        # ⛔ Les deux « 0 » hors audit, même raison qu'à l'écran 02 : la voix dit « les
        # deux produits scalaires », jamais « zéro » (2 × AUDIT-ABSENT au dry run).
        l1 = self.lettres(self.vexpr("n · B D = 0  et  n · B E = 0",
                                     ("n", "B D", "B E"), fs, VERT_OK))
        self.gauche(l1, 0.60, xmax=0.15)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("la phrase sur la non-colinéarité")
        l2 = VGroup(self.vexpr("et B D, B E non colinéaires", ("B D", "B E"), fs, VERT_OK),
                    self.sans_audit(self.t("sans elle : le point est perdu", 24, C_PIEGE)))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad2 = SurroundingRectangle(l2, color=VERT_OK, buff=0.14, stroke_width=3)
        # ⛔ On pose le GROUPE texte + cadre : `gauche()` borne le TEXTE, pas le cadre
        # (défaut nouveau de E4, et il frappe des deux côtés).
        self.gauche(VGroup(l2, cad2), -0.30, xmax=0.15)
        self.play(FadeIn(l2, scale=1.04), Create(cad2), run_time=0.7)
        self.au_mot("La réponse A, c'est le piège du poteau")
        # ⛔ DEUX LIGNES, ET C'EST LA MESURE : d'un seul tenant, la ligne faisait 7,00
        # pour les 6,65 offerts à gauche des cartes, et `gauche()` rétrécissait la phrase
        # qui NOMME le piège.
        l3 = VGroup(self.croix(r=0.12),
                    VGroup(self.sans_audit(self.t("A : le piège du poteau,", 25,
                                                  C_PIEGE)),
                           self.sans_audit(self.t("vérifié dans un seul sens", 25,
                                                  C_PIEGE)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l3.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(l3, -1.60, xmax=0.15)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.55)
        # ⚠️ xmax = 4,6 : sous les cartes, la ligne peut prendre toute la largeur jusqu'à
        # Ti-Margo.
        self.au_mot("Et la réponse C dit le contraire")
        l4 = VGroup(self.croix(r=0.12),
                    VGroup(self.sans_audit(self.t("C : colinéaire à un vecteur du plan,",
                                                  25, C_PIEGE)),
                           self.sans_audit(self.t("c'est aller DANS la direction du plan",
                                                  25, C_PIEGE)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l4.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(l4, -2.90, xmax=4.6)
        self.play(FadeIn(l4, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 05 : les deux premières étapes, dans le cube ───────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons les deux premières étapes")
        titre = self.t("Dans le cube : la normale, puis l'équation", 40, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 26

        # ── le cube, à gauche ─────────────────────────────────────────────
        # ⛔⛔ AUCUN MORCEAU DE PLAN : `platitude((1 ; 1 ; 1))` = 9,02°, le plan (BDE) se
        # projetterait sur une lame. Il est montré par ses TROIS POINTS en ambre — c'est
        # le remède de l'écran 09b de E8, et c'est aussi ce que la démonstration manipule.
        # ⛔⛔ « D » ET « F » SONT ÉCARTÉS (cotes mesurées, voir `ECARTE_CUBE` en tête).
        r, cube = self.cube_repere(o=(-5.70, -0.10), u=U_CUBE, rouges=("B", "D", "E"),
                                   ecarte=ECARTE_CUBE)
        self.au_mot("dans le cube")
        self.play(FadeIn(cube), run_time=0.7)
        self.au_mot("repère A, A B, A D, A E")
        base = self.sans_audit(self.base_repere(r))
        self.play(*[GrowArrow(v[0]) for v in base], run_time=0.7)

        # ── la colonne de droite : la normale, puis l'équation ────────────
        # ⛔ `au_fin` et non `au_mot` pour un TRIPLET : « 1, 1, 1 » se dit en 0,8 s, et
        # posé à son premier chiffre le dernier « 1 » est à l'écran avant d'être dit
        # (35 AUDIT-AVANCE sur E3, tous de cette cause).
        # ⛔⛔ A⃗G EST VERT ICI ET AMBRE À L'ÉCRAN 09b, ET CE N'EST PAS UNE INCOHÉRENCE —
        # c'est la seule façon de ne pas en faire une. Vu au gros plan ×2,6 : avec B, D et
        # E en ambre (les trois points du plan) ET la flèche A⃗G en ambre, l'écran dont
        # toute la phrase est « A⃗G est normal au PLAN (BDE) » peignait de la même couleur
        # les deux objets de cette phrase. ⭐ Dans toute la série, C_NORMALE (vert) est la
        # couleur d'un vecteur normal : c'est celle de la normale de l'écran 02 et du n⃗
        # de la correction. ⚠️ En 09b, [A G] n'est plus un vecteur mais un SEGMENT — la
        # grande diagonale du cube —, donc il y est ambre, « ce que la question regarde ».
        self.au_fin("de coordonnées 1, 1, 1")
        lAG = self.col(self.nomme("A G", NORMALE, C_NORMALE, 28), 2.40)
        fAG = r.vecteur(S["A"], S["G"], None, couleur=C_NORMALE, sw=7)
        self.play(GrowArrow(fAG[0]), FadeIn(lAG, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔ PAS D'ANCRE ICI, ET C'EST MESURÉ : `verifier-avant-rendu.py` annonce
        # « est normal au plan B D E » (11,11 s) à 0,35 s de « de coordonnées 1, 1, 1 »
        # (10,76 s), donc sous son garde-fou de 0,6 s. C'est le remède du piège n° 6 des
        # entiers : quand la voix ne laisse pas la place, on n'appelle pas `au_mot`, on
        # ENCHAÎNE — le `play` précédent (0,6 s) cale la ligne tout seul. ⚠️ On ne tait
        # pas l'outil, on écrit pourquoi l'écart est tenu et on laisse le dry run trancher.
        # ⛔ « ⊥ au plan (BDE) » ET NON « est normal au plan (BDE) » : écrite en mots, la
        # ligne faisait plus que les 4,40 de la colonne et `col()` la rétrécissait. ⭐ Le
        # signe est celui de la donnée de l'écran 04 et des cartes : l'élève le relit.
        lno = self.col(self.vexpr("A G ⊥ au plan (BDE)", ("A G",), 26, VERT_OK), 1.85)
        self.play(FadeIn(lno, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ L'équation inconnue : `eq_plan(…, d=None)` laisse « + d » en lettre, et son
        # « 0 » de second membre est hors audit par construction (`eq_zero` du socle).
        self.au_fin("x plus y plus z plus d égale zéro")
        leq = self.col(self.eq_plan(1, 1, 1, None, 30, WHITE), 1.25)
        self.play(FadeIn(leq, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("de coordonnées 1, zéro, zéro")
        lB = self.point_nomme("B", S["B"], C_POINT, 28)
        # ⚠️ Les deux zéros sont dits EN TOUTES LETTRES : eux seuls sortent de l'audit,
        # pas la ligne entière — sinon on perdrait le contrôle sur le 1.
        self.lettres(lB.nb[1])
        self.lettres(lB.nb[2])
        self.col(lB, 0.65)
        self.play(FadeIn(lB, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ « 1 plus d égale zéro, donc d vaut moins 1 » : le « zéro » est dit en toutes
        # lettres, donc la ligne entière sort de l'audit (même forme que le « 0 + 1 + 0 =
        # 1 » de l'écran 05 de E10). On perd le contrôle sur les deux « 1 », et c'est le
        # prix d'une écriture juste.
        # ⛔ DEUX LIGNES, ET C'EST LA MESURE : d'un seul tenant, « 1 + d = 0 ⟹ d = −1 »
        # fait 5,31 pour les 4,40 de la colonne, et `col()` réduisait la résolution.
        # ⛔ DEUX INSTANTS, ET C'EST UN `AUDIT-TARD` DE 0,92 s QUI L'A DIT : la voix dit
        # « 1 plus d égale zéro » puis « donc d vaut moins 1 ». Posées d'un bloc à la
        # seconde, la première ligne arrivait après avoir été dite — la règle « un bloc
        # qui porte ce que la voix énumère se remplit au rythme de la voix », dans son
        # autre sens (E10, écran 02).
        ld = VGroup(self.lettres(self.t("1 + d = 0", 28, WHITE)),
                    self.lettres(self.t("⟹   d = −1", 28, WHITE)))
        ld.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        self.col(ld, -0.15)
        self.au_fin("1 plus d égale zéro")
        self.play(FadeIn(ld[0], shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("donc d vaut moins 1")
        self.play(FadeIn(ld[1], shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("x plus y plus z moins 1 égale zéro")
        lfin = self.eq_plan(1, 1, 1, D_PLAN, 32, VERT_OK)
        cadf = SurroundingRectangle(lfin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.col(VGroup(lfin, cadf), -1.25)
        self.play(FadeIn(lfin, scale=1.05), Create(cadf), run_time=0.7)

        # ── la vérification, en bas à gauche ──────────────────────────────
        # ⛔ EN BAS À GAUCHE et non dans la colonne : à cette hauteur le second garde-fou
        # de `col()` (« bas sous −1,95 ET droite au-delà de 5,3 → réduire à 3,1 ») frappe,
        # et il a rapetissé trois textes porteurs de leçon sur E6. Le bas de la colonne de
        # droite est réservé aux lignes COURTES.
        self.au_fin("zéro plus 1 plus zéro moins 1 fait zéro")
        v1 = self.lettres(self.t("pour D :   0 + 1 + 0 − 1 = 0", fs, WHITE))
        self.gauche(v1, -2.25, xmax=4.6)
        self.play(FadeIn(v1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("zéro plus zéro plus 1 moins 1 fait zéro")
        v2 = self.lettres(self.t("pour E :   0 + 0 + 1 − 1 = 0", fs, WHITE))
        self.gauche(v2, -2.80, xmax=4.6)
        self.play(FadeIn(v2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Les trois points y sont")
        v3 = VGroup(self.coche(VERT_OK, 0.14),
                    self.sans_audit(self.t("les trois points y sont", 28, VERT_OK)))
        v3.arrange(RIGHT, buff=0.20)
        self.gauche(v3, -3.35, xmax=4.6)
        self.play(FadeIn(v3, shift=RIGHT * 0.12), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 06 : les CINQ pièges de la copie ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà les pièges de la copie")
        # ⛔ Le glyphe ⚠ ne se rend pas (carré « tofu », épisode 1) : on DESSINE le
        # triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Cinq pièges de copie", 42, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.9)
        # ⚠️ CINQ RANGÉES, ET 24 PX VIENT DE LA MESURE : à 26 le tableau dépassait le
        # plafond de 10,60 et les cinq pièges étaient réduits en silence. À cinq rangs,
        # les pastilles pèsent 2,40 à elles seules et ne rétrécissent pas avec la police
        # (rayon fixe) — c'est donc la POLICE du texte qui cède, jamais l'espacement
        # (leçon de E10 sur les « + » collés).
        fs = 24
        pieges = (("prouver l'orthogonalité sur une seule direction",
                   "prouver une orthogonalité sur une seule direction"),
                  ("oublier la phrase de non-colinéarité",
                   "oublier d'écrire que les deux vecteurs ne sont pas colinéaires"),
                  ("un arrondi là où l'énoncé demande l'exact",
                   "donner un arrondi quand l'énoncé demande une valeur exacte"),
                  ("annoncer une distance négative, ce qui n'existe pas",
                   "annoncer une distance négative"),
                  ("s'appuyer sur le dessin pour affirmer",
                   "s'appuyer sur le dessin pour affirmer"))
        g = self.rangees([self.sans_audit(self.t(txt, fs, C_PIEGE))
                          for txt, _ in pieges], 0.55, buff=0.30)
        for b, (_, extrait) in zip(g.rangs, pieges):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15),
                      run_time=0.45)
        self.au_mot("la preuve est toujours un calcul")
        fin = VGroup(self.t("dans l'espace,", 30, GREY_A),
                     self.t("la preuve est toujours un CALCUL", 32, VERT_OK))
        fin.arrange(RIGHT, buff=0.22, aligned_edge=DOWN)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.18, stroke_width=3)
        VGroup(fin, cad).move_to(P(-0.75, -2.55))
        self.play(FadeIn(fin, scale=1.04), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 (bonne réponse : A) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔⛔ LE TRIANGLE B D E N'EST PAS DESSINÉ DANS LE CUBE, ET C'EST LA MESURE QUI LE
        # DÉCIDE : ses trois côtés se projettent à 0,656 · 1,414 · 0,822 et son angle en
        # B se lit 19,1° au lieu de 60°. Un élève qui le verrait lirait « quelconque » —
        # c'est-à-dire la MAUVAISE réponse, dessinée. ⭐ Les trois POINTS en ambre sont la
        # donnée (« on considère les points B, D et E »), et la forme du triangle arrive
        # en 07b, à plat.
        # ⚠️ MÊME `u` ET MÊMES COTES D'ÉCART QU'AUX ÉCRANS 05 ET 09, et ce n'est pas une
        # commodité : à u = 1,18 (mon premier jet), le même écart remettait « D » à 0,07
        # de l'arête [A E], parce qu'entre [A E] et [D H] il ne reste que 0,48 de largeur
        # pour un nom qui en fait 0,27. Un seul `u` pour les trois écrans, une seule cote.
        r, cube = self.cube_repere(o=(-5.95, 0.85), u=U_CUBE, rouges=("B", "D", "E"),
                                   ecarte=ECARTE_CUBE)
        self.au_mot("Dans le cube d'arête 1")
        self.play(FadeIn(cube), run_time=0.6)
        # ⚠️ CARTES LARGES (6,0 à partir de x = 0,6 — le remède mesuré de E5) : la
        # question fait 82 caractères, et la colonne par défaut (4,40) l'aurait coupée en
        # quatre lignes, ce qui pousse les cartes sur Ti-Margo. Les trois choix sont
        # courts et tiennent à 28 px sur UNE ligne.
        cA = self.t("équilatéral", 28, WHITE)
        cB = self.t("rectangle en B", 28, WHITE)
        cC = self.t("quelconque", 28, WHITE)
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.lettres(self.t("Dans le cube d'arête 1, on considère", 26)),
             self.sans_audit(self.t("les points B, D et E.", 26)),
             self.sans_audit(self.t("Le triangle (BDE) est :", 26))],
            [cA, cB, cC], largeur=6.0, xl=0.6)
        # ⛔ Même remède qu'à l'écran 04, et pour la même raison mesurée.
        self.gauche(pause, -3.05, xmax=0.4)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Le triangle B D E est")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "A")
        self.mem_q2 = (r, cube, cartes, pause, rebours)

    def ecran_reponse2(self):
        r, cube, cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        # ⛔ LE CUBE RESTE (neuvième récidive de l'héritage) : c'est la donnée, et c'est
        # lui qui dit QUELS points sont B, D et E.
        fs = 25

        # ── la figure PLANE du triangle ───────────────────────────────────
        # ⛔⛔ À PLAT — la raison est en tête du fichier et dans `triangle_plan` : dessiné
        # dans le cube, ce triangle équilatéral se lit avec des côtés de 0,66 / 1,41 /
        # 0,82 et un angle de 19° en B. Il dirait le contraire de la voix.
        tri = triangle_plan(cote=1.45).move_to(P(-2.05, 1.55))
        # ⚠️ Les trois étiquettes de sommet sont posées VERS L'EXTÉRIEUR du triangle,
        # depuis le sommet réel (et non depuis le centre de la boîte du groupe : c'est la
        # leçon de `coin().sommet()` sur E10, où « u » tombait à 0,02 de son propre fût).
        # ⚠️ Et elles sont lues APRÈS le `move_to`, sinon elles rendent la position d'avant.
        et = {}
        # ⭐ Le sommet réel se relit sur les segments TRACÉS, pas sur les coordonnées
        # locales d'avant le `move_to` : [B D] va de B à D, [B E] de B à E.
        pB = tri.cBD.get_start()
        pD = tri.cBD.get_end()
        pE = tri.cBE.get_end()
        for nom, p, direc in (("B", pB, DL), ("D", pD, DR), ("E", pE, UP)):
            et[nom] = self.sans_audit(self.t(nom, 26, C_POINT)).move_to(p + direc * 0.30)
        leg = self.sans_audit(self.t("vu dans son plan", 22, C_FANTOME))
        leg.next_to(VGroup(tri, *et.values()), DOWN, buff=0.14)
        # ⛔ AUCUNE ANCRE ICI, ET C'EST LE DRY RUN QUI L'A DIT : `au_mot("Réponse A,
        # équilatéral")` sortait un `RETARD … 0,65 s`, parce que `q_reponse` (la carte qui
        # verdit, les deux autres estompées, la coche, le battement) occupe déjà le début
        # du clip. Un `au_mot` ne place rien, il ATTEND — et quand l'instant est passé, il
        # ne fait que crier. La figure enchaîne sur `q_reponse`, qui la cale.
        self.play(Create(tri.cBD), Create(tri.cBE), Create(tri.cDE),
                  *[FadeIn(x) for x in et.values()], FadeIn(leg), run_time=0.8)

        # ── les trois côtés valent √2 ─────────────────────────────────────
        # ⛔⛔ LA LÉGENDE EST AU-DESSUS ET LA LIGNE DES NORMES EN DESSOUS, ET C'EST
        # L'ORDRE DE LA VOIX : « Chacun de ses trois côtés est la diagonale d'une face du
        # cube : B D, B E et D E ont tous pour longueur racine de 2. » Écrit dans l'ordre
        # de la PAGE (les normes d'abord), le dry run sortait `AUDIT-AVANCE « 2 »
        # **6,82 s** — le « 2 » de √2 était à l'écran près de sept secondes avant d'être
        # prononcé. ⭐ Et l'extrait d'un `au_fin` doit CONTENIR le dernier nombre de la
        # ligne (leçon de l'écran 09b de E9), d'où « pour longueur racine de 2 ».
        l2 = self.sans_audit(self.t("trois diagonales de face", 24, GREY_A))
        l1 = VGroup(self.vexpr("‖B D‖ = ‖B E‖ = ‖D E‖ =", ("B D", "B E", "D E"), fs,
                               WHITE),
                    self.racine(norme2(BD), fs, WHITE))
        l1.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        bloc1 = VGroup(l2, l1).arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        self.gauche(bloc1, -0.45, xmax=0.4)
        self.au_mot("est la diagonale d'une face")
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("pour longueur racine de 2")
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.5)

        # ── et l'angle en B n'est pas droit ───────────────────────────────
        # ⛔⛔ DEUX ÉTAGES, parce qu'une ligne d'un seul tenant ne tient pas dans la place
        # offerte à gauche des cartes : c'est la POLICE qui céderait, et ce calcul est
        # celui que l'élève relit (leçon de l'écran 09b de E10, où la ligne d'un bloc
        # était réduite de 34 %).
        # ⛔ ET LA LIGNE SE REMPLIT AU RYTHME DE LA VOIX : « moins 1 fois moins 1, plus 1
        # fois zéro, plus zéro fois 1, c'est-à-dire 1 » dure plus de quatre secondes.
        # Posée d'un bloc, son total serait à l'écran bien avant d'être dit (huit fois
        # dans cette série).
        entete = self.vexpr("B D · B E =", ("B D", "B E"), fs, GREY_A)
        t1 = self.t("(−1) × (−1)", 24, WHITE)
        t2 = self.lettres(self.t("+ 1 × 0", 24, WHITE))
        t3 = self.lettres(self.t("+ 0 × 1", 24, WHITE))
        t4 = self.t("= 1", 24, VERT_OK)
        suite = VGroup(t1, t2, t3, t4).arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        calc = VGroup(entete, suite).arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        self.gauche(calc, -1.75, xmax=4.6)
        self.au_fin("vaut moins 1 fois moins 1")
        self.play(FadeIn(entete, shift=RIGHT * 0.12), FadeIn(t1), run_time=0.5)
        self.au_fin("plus 1 fois zéro")
        self.play(FadeIn(t2), run_time=0.35)
        self.au_fin("plus zéro fois 1")
        self.play(FadeIn(t3), run_time=0.35)
        self.au_fin("c'est-à-dire 1")
        self.play(FadeIn(t4, scale=1.15), run_time=0.35)
        # ⚠️ « 60° » RESTE dans l'audit : la voix dit « 60 degrés », en chiffres.
        self.au_fin("il vaut 60 degrés")
        fin = VGroup(self.croix(r=0.12),
                     VGroup(self.sans_audit(self.t("pas nul, donc pas droit en B :", 26,
                                                   C_REGARD)),
                            VGroup(self.t(f"{round(angle(BD, BE))}°", 30, VERT_OK),
                                   self.sans_audit(self.t("comme dans tout triangle"
                                                          " équilatéral", 24, VERT_OK)))
                            .arrange(RIGHT, buff=0.18, aligned_edge=DOWN))
                     .arrange(DOWN, aligned_edge=LEFT, buff=0.10))
        fin.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(fin, -3.00, xmax=4.6)
        self.play(Create(tri.arc), FadeIn(fin, shift=RIGHT * 0.12), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 08 : le squelette d'une copie complète ─────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Le squelette d'une copie complète")
        titre = self.t("Le squelette d'une copie", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️ hauteur 3,0 et centre −0,40 : la copie descend à −1,90, et le rappel posé
        # dessous s'arrête vers −3,25 (marge : −3,573). Cotes mesurées, comme sur E10.
        copie = RoundedRectangle(width=10.2, height=3.0, corner_radius=0.18,
                                 stroke_color=GREY_B, stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.6, -0.40))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        # ⛔ 26 ET DES LIGNES COURTES, ET C'EST UNE MESURE : sur E7 puis E8, un modèle de
        # rédaction trop large a été ramené à 19,8 px par `scale_to_fit_width` — LE MODÈLE
        # DE RÉDACTION devenu le plus petit texte de l'épisode.
        fs = 26
        # ⛔ LES QUATRE LIGNES SONT COURTES, ET C'EST LA MESURE : au premier jet elles
        # faisaient plus que les 8,60 offerts par la copie, et `scale_to_fit_width`
        # réduisait le MODÈLE DE RÉDACTION — exactement le défaut de E7 et de E8.
        lignes_copie = (
            (("les coordonnées des points utiles", None), C_POINT,
             "les coordonnées de tous les points utiles"),
            (("les deux produits scalaires + la phrase", None), C_VECTEUR,
             "les deux produits scalaires"),
            (("donc n est normal, puis l'équation", ("n",)), C_PLAN,
             "donc n est normal au plan"),
            (("le calcul, la conclusion, l'unité", None), VERT_OK,
             "le calcul demandé"),
        )
        corps_l, extraits = [], []
        for (txt, noms), coul, extrait in lignes_copie:
            corps_l.append(self.sans_audit(self.vexpr(txt, noms, fs, coul) if noms
                                           else self.t(txt, fs, coul)))
            extraits.append(extrait)
        rangs = [VGroup(self.pastille(k), c).arrange(RIGHT, buff=0.30)
                 for k, c in enumerate(corps_l, start=1)]
        lignes = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.20)
        # ⛔ VU AU GROS PLAN SUR L'ÉPISODE 5 : à 9,1 le dernier caractère SORTAIT de la
        # copie. La place réelle : la copie va jusqu'à x = 4,5, le texte commence après
        # la marge rouge à −4,65, il reste 9,15 — 8,6 laisse 0,55.
        if lignes.width > 8.6:
            lignes.scale_to_fit_width(8.6)
        lignes.move_to(copie.get_center()).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        for b, extrait in zip(rangs, extraits):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15),
                      run_time=0.45)
        # ⭐ LA PHRASE FINALE est celle que la voix met en dernier, et c'est la promesse
        # de l'épisode.
        self.au_mot("Ce plan-là fonctionne")
        rappel = VGroup(self.t("ce plan-là fonctionne", 26, C_REGARD),
                        self.t("sur n'importe quel sujet de l'espace", 26, C_REGARD))
        rappel.arrange(DOWN, buff=0.10)
        cad = SurroundingRectangle(rappel, color=C_REGARD, buff=0.14, stroke_width=3)
        VGroup(rappel, cad).next_to(copie, DOWN, buff=0.24)
        self.play(FadeIn(rappel, shift=UP * 0.1), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer !")
        tete = VGroup(pastille_pause(0.38), self.t("À toi de jouer !", 42, ORANGE_RETENUE))
        tete.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.5)
        # ⛔⛔ LE DESSIN PORTE LA DONNÉE, JAMAIS LA RÉPONSE : le cube et les quatre points
        # nommés par la voix (A, B, D, E), oui. ⛔ NI la grande diagonale [A G], NI le
        # point K, NI la perpendiculaire : K est la réponse, et [A G] est la CHUTE de la
        # correction (« K est au tiers de la grande diagonale »). Tout arrive en 09b.
        # ⚠️ Les deux noms écartés dès le DÉFI et non seulement à la correction : la
        # diagonale n'arrive qu'en 09b, mais les arêtes [A D] et [F G], elles, sont déjà
        # là — et c'est d'elles que « D » et « F » devaient d'abord s'écarter.
        r, cube = self.cube_repere(o=(-5.90, 0.55), u=U_CUBE,
                                   rouges=("A", "B", "D", "E"), ecarte=ECARTE_CUBE)
        self.au_mot("Dans le cube d'arête 1")
        self.play(FadeIn(cube), run_time=0.7)
        # ⭐ L'équation est une DONNÉE de l'énoncé : encadrée, et elle restera en 09b.
        self.au_fin("x plus y plus z moins 1 égale zéro")
        don = VGroup(self.sans_audit(self.t("le plan (BDE) :", 26, C_PLAN)),
                     self.eq_plan(1, 1, 1, D_PLAN, 28, WHITE))
        don.arrange(RIGHT, buff=0.20, aligned_edge=DOWN)
        cadd = SurroundingRectangle(don, color=C_PLAN, buff=0.14, stroke_width=3)
        self.gauche(VGroup(don, cadd), -0.60, xmax=4.6)
        self.play(FadeIn(don, shift=RIGHT * 0.12), Create(cadd), run_time=0.7)
        # ⛔⛔ LA CONSIGNE VA À GAUCHE, SOUS LE CUBE : dans la colonne de droite elle fait
        # plus de 6 de large pour 4,40 offerts, donc `col()` la rétrécirait — c'est-à-dire
        # que ce que l'élève doit LIRE pendant qu'il met pause deviendrait le plus petit
        # texte de la vidéo (défaut payé sur l'épisode 6).
        self.au_mot("Détermine le projeté orthogonal K")
        cons = VGroup(self.sans_audit(self.t("détermine le projeté orthogonal K de A,",
                                             28, WHITE)),
                      self.sans_audit(self.t("puis la distance de A au plan (BDE)", 28,
                                             WHITE)))
        cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(cons, -1.90, xmax=4.6)
        self.play(FadeIn(cons[0], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("puis la distance de A au plan")
        self.play(FadeIn(cons[1], shift=RIGHT * 0.12), run_time=0.5)
        # ⚠️ Le compte à rebours est posé À CÔTÉ de la pause et non dessous : à cette
        # hauteur-là, dessous, il sortirait du cadre.
        self.au_mot("Mets pause, et cherche")
        pause = self.gauche(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -3.05,
                            xmax=4.6)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(pause, RIGHT, buff=0.35)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, cube, don, cadd, cons, pause, rebours)

    def ecran_correction(self):
        r, cube, don, cadd, cons, pause, rebours = self.mem_defi
        # ⛔ L'écran de correction HÉRITE de l'écran de défi, et l'héritage descend plus
        # bas qu'on ne croit (payé sur E3, E5, E7, E8, E9 PUIS E10). Ce qui s'efface : la
        # consigne, la pause, le rebours. Ce qui RESTE : le cube et L'ÉQUATION, qui est la
        # donnée dont la correction lit la normale.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), run_time=0.3)
        self.dire("09b-correction")
        fs = 26

        # ── ① la normale se lit dans l'équation ───────────────────────────
        self.au_fin("se lit dans l'équation : 1, 1, 1")
        lnor = self.col(self.nomme("n", NORMALE, C_NORMALE, 28), 2.35)
        self.play(FadeIn(lnor, shift=RIGHT * 0.12), run_time=0.55)

        # ── ② la droite (A ; n⃗), puis t ──────────────────────────────────
        # ⭐ L'accolade est construite sur les TROIS lignes dès le départ (socle) : montée
        # ligne par ligne, elle changerait de taille à chaque fois.
        self.au_fin("z égale t")
        sysb = self.systeme(["x = t", "y = t", "z = t"], 28, WHITE)
        self.col(sysb, 1.40)
        self.play(FadeIn(sysb, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔ « t plus t plus t moins 1 égale zéro, donc 3 t égale 1 » : le « zéro » est dit
        # en toutes lettres, donc la ligne entière sort de l'audit.
        # ⛔ DEUX LIGNES, ET C'EST LA MESURE : d'un seul tenant elle fait 5,31 pour les
        # 4,40 de la colonne, et `col()` réduisait la substitution — le geste central de
        # la correction.
        self.au_fin("donc 3 t égale 1")
        lsub = VGroup(self.lettres(self.t("t + t + t − 1 = 0", 26, WHITE)),
                      self.lettres(self.t("⟹   3t = 1", 26, WHITE)))
        lsub.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        self.col(lsub, 0.20)
        self.play(FadeIn(lsub, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("donc t vaut un tiers")
        lt = VGroup(self.t("t =", 30, VERT_OK), self.tiers(30, VERT_OK))
        lt.arrange(RIGHT, buff=0.14)
        self.col(lt, -0.60)
        self.play(FadeIn(lt, shift=RIGHT * 0.12), run_time=0.5)

        # ── ③ K, et son dessin dans le cube ───────────────────────────────
        self.au_mot("Le projeté K a donc pour coordonnées")
        lK = VGroup(self.sans_audit(self.t("K", 30, VERT_OK)),
                    self.sans_audit(self.t("(", 30, WHITE)),
                    self.tiers(30, WHITE), self.sans_audit(self.t(";", 30, WHITE)),
                    self.tiers(30, WHITE), self.sans_audit(self.t(";", 30, WHITE)),
                    self.tiers(30, WHITE), self.sans_audit(self.t(")", 30, WHITE)))
        lK.arrange(RIGHT, buff=0.12)
        cadK = SurroundingRectangle(lK, color=VERT_OK, buff=0.14, stroke_width=3)
        self.col(VGroup(lK, cadK), -1.35)
        # ⛔ [A G] est un SEGMENT, pas un vecteur : un trait, pas une flèche — et la
        # notation « [A G] » le dit (c'est ce qui dispense l'audit d'une entrée de table).
        # ⚠️ Le fût de [A G] passe à 0,00 du nom « D » et à 0,10 du nom « F » au décalage
        # par défaut (mesuré sur E9) : les deux sont déjà écartés depuis l'écran 09.
        diag = Line(cube.sommet("A"), cube.sommet("G")).set_stroke(C_REGARD, 5)
        pK = r.pt(*K)
        # ⛔⛔ K N'A PAS D'ÉTIQUETTE SUR LA FIGURE, ET C'EST UNE RECHERCHE EN GRILLE QUI
        # L'A DÉCIDÉ, pas un renoncement. K est AU TIERS de la diagonale, donc à 0,20 du
        # projeté de D : posée en `UL`, sa boîte tombait à **0,00** du nom « D » ; posée
        # perpendiculairement à la diagonale vers le bas, à **0,00** de l'arête [C D].
        # La grille (pas de 0,04 entre −0,9 et +0,9, à plus de 0,11 de tout segment tracé
        # et à plus de 0,22 des huit noms de sommet) rend 110 positions libres, et la plus
        # proche est à **0,82** du point — c'est-à-dire plus d'une demi-arête, au milieu
        # du cube, plus près d'autre chose que de K. Une étiquette qui n'appartient plus
        # visiblement à son point ne nomme rien.
        # ⭐ Le remède est celui de l'écran 09b de E8 : on n'étiquette pas, et c'est la
        # COULEUR qui relie — le point est VERT, et le bloc « K (1/3 ; 1/3 ; 1/3) » de la
        # colonne de droite est encadré en VERT, lui aussi.
        ptK = Dot(pK, radius=0.095, color=VERT_OK)
        self.play(FadeIn(lK, scale=1.05), Create(cadK), run_time=0.6)

        # ── ④ la distance, en bas à gauche ────────────────────────────────
        # ⛔ UN SEUL BLOC DE DEUX LIGNES, rempli AU RYTHME DE LA VOIX : « chaque
        # coordonnée au carré fait un neuvième, et trois neuvièmes font un tiers » est une
        # seule phrase, et deux blocs séparés laissaient 0,14 entre eux — un écart que la
        # chute, deux crans plus bas, faisait sortir de la marge (bas à −3,74 pour
        # −3,573). Mesuré, pas estimé.
        d = VGroup(VGroup(self.vexpr("‖A K‖ :", ("A K",), fs, GREY_A),
                          self.lettres(self.t("chaque carré = 1/9", fs, WHITE)))
                   .arrange(RIGHT, buff=0.20, aligned_edge=DOWN),
                   self.lettres(self.t("3 × 1/9 = 1/3", fs, WHITE)))
        d.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        self.gauche(d, -1.55, xmax=4.6)
        self.au_fin("chaque coordonnée au carré fait un neuvième")
        self.play(FadeIn(d[0], shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("trois neuvièmes font un tiers")
        self.play(FadeIn(d[1], shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ DEUX ÉCRITURES, DEUX INSTANTS : la voix dit « racine d'un tiers, c'est-à-dire
        # racine de 3 divisé par 3, environ zéro virgule 58 ». Posées d'un bloc, les deux
        # dernières seraient à l'écran avant d'être dites (la règle « un bloc qui porte ce
        # que la voix énumère se remplit au rythme de la voix »).
        dist1 = VGroup(self.sans_audit(self.t("distance =", fs, VERT_OK)),
                       self.racine(self.tiers(fs, VERT_OK), fs, VERT_OK))
        dist1.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        dist2 = VGroup(self.sans_audit(self.t("=", fs, VERT_OK)),
                       self.racine(norme2(NORMALE), fs, VERT_OK),
                       self.sans_audit(self.t("/ 3", fs, VERT_OK)))
        dist2.arrange(RIGHT, buff=0.10, aligned_edge=DOWN)
        dist = VGroup(dist1, dist2, self.env(round(math.sqrt(3) / 3, 2), fs))
        dist.arrange(RIGHT, buff=0.26, aligned_edge=DOWN)
        self.gauche(dist, -2.35, xmax=4.6)
        self.au_fin("racine d'un tiers")
        self.play(FadeIn(dist1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("racine de 3 divisé par 3")
        self.play(FadeIn(dist2, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("environ zéro virgule 58")
        self.play(FadeIn(dist[2]), run_time=0.35)

        # ── ⑤ la chute : K est au tiers de [A G] ──────────────────────────
        # ⭐ C'est ce que la voix met en avant, et c'est la raison d'être de l'épisode :
        # l'élève a calculé un projeté, et il vient de démontrer une propriété du cube.
        self.au_mot("K est au tiers de la grande diagonale")
        self.play(Create(diag), FadeIn(ptK), run_time=0.7)
        chute = VGroup(self.coche(VERT_OK, 0.14),
                       VGroup(self.sans_audit(self.t("K est au tiers de [A G] :", 26,
                                                     VERT_OK)),
                              self.sans_audit(self.t("(BDE) coupe la diagonale du cube"
                                                     " à son premier tiers", 26, VERT_OK)))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        chute.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        # ⚠️ −3,10 ET NON −3,35 : un bloc de DEUX lignes posé à −3,35 descend à −3,74
        # pour une marge à −3,573 (`gauche()` CENTRE en hauteur — piège n° 19 des
        # entiers). C'est la cote qui a obligé à comprimer toute la colonne de gauche.
        self.gauche(chute, -3.10, xmax=4.6)
        self.au_mot("coupe la diagonale du cube à son premier tiers")
        self.play(FadeIn(chute, shift=RIGHT * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        # ⚠️ 26 ET NON 30, MESURÉ : la FINALE est l'écran que l'élève relit, et sur E7
        # elle a été réduite de 27 % (30 px → 21,9) par son plafond de 10,60 sans que
        # rien ne le dise.
        fs = 26
        # ⛔⛔ LES QUATRE RANGÉES SONT COURTES, ET C'EST LA MESURE QUI L'A IMPOSÉ : au
        # premier jet elles faisaient **13,69** pour un plafond de 10,60, donc la FINALE
        # — l'écran que l'élève relit le plus — était réduite de **22,6 %** sans que rien
        # ne le dise. C'est le défaut de E7 (27 % de réduction silencieuse) à sa pire
        # amplitude de la série. ⭐ Chaque rangée dit la même chose en moins de mots ;
        # aucune ne perd un élément que la voix nomme.
        faits = (("le fil :", C_REGARD, "normale, équation, distance", None,
                  "une normale, une équation, puis une distance"),
                 ("la normale :", C_NORMALE,
                  "deux produits nuls + la phrase ÉCRITE", None,
                  "Deux produits scalaires nuls"),
                 ("le projeté :", C_PLAN, "on suit la normale", None,
                  "Le projeté orthogonal se trouve en suivant la normale"),
                 ("la preuve :", C_PIEGE, "un calcul, jamais un dessin", None,
                  "est toujours un calcul, jamais un dessin"))
        blocs = []
        for g, cg, d, dn, _ in faits:
            droite_ = (self.sans_audit(self.vexpr(d, dn, fs, WHITE)) if dn
                       else self.sans_audit(self.t(d, fs, WHITE)))
            blocs.append(VGroup(self.sans_audit(self.t(g, fs, cg)), droite_)
                         .arrange(RIGHT, buff=0.22, aligned_edge=DOWN))
        lignes = VGroup(*[VGroup(self.coche(VERT_OK, 0.22), b)
                          .arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.46)
        # ⚠️ 10,6 de large, centré en x = −0,75 : le bloc s'arrête à 4,55, à l'écart de
        # Ti-Margo à scale 0,65 (boîte à partir de x = 5,30).
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.75, 0.10))
        for i, (_, _, _, _, extrait) in enumerate(faits):
            self.au_mot(extrait)
            self.play(Create(lignes[i][0]), FadeIn(blocs[i][0], shift=RIGHT * 0.2),
                      run_time=0.35)
            self.play(FadeIn(blocs[i][1], shift=RIGHT * 0.2), run_time=0.30)
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question1()
        self.ecran_reponse1()
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_reponse2()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class PsEspaceDefiTerminale(PsEspaceDefiBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
