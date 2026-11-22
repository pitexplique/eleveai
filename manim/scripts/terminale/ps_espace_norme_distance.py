# ps_espace_norme_distance.py
# EleveAI — Maths Tle spé — paysage « Calculer une norme ou une distance » (16:9),
# ceinture VERTE. Micro du coach : ps_espace_norme_distance (notion produit_scalaire_espace).
# Épisode 9 sur 12, et le TROISIÈME des six du produit scalaire.
# Centre : sport (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, « trois carrés, une racine » / « une règle qu'on viole » ;
#   · 01-situation  : la Diagonale des Fous — 10 km à plat et 1 km de dénivelé ≠ 11 km ;
#   · 02-idee       : la norme en coordonnées, et L'ESCALIER qui montre les trois arêtes ;
#   · 03-theoreme   : distance AB = ‖A B⃗‖, et ‖u⃗‖² = u⃗ · u⃗ (le lien avec l'épisode 7) ;
#   · 04/04b        : question-pause n° 1 (u(1;−2;2) → réponse B, 3) ;
#   · 05-appliquer  : A(1;0;2), B(3;−1;4) → A B⃗ (2;−1;2), distance 3 ;
#   · 06-piege      : la racine ne se distribue pas (3-4-5), la valeur EXACTE, norme ≥ 0 ;
#   · 07/07b        : question-pause n° 2 (A(2;1;0), B(2;1;5) → réponse C, 5) ;
#   · 08-rediger    : la copie — les TROIS lignes, toujours dans cet ordre ;
#   · 09/09b        : le défi — les longueurs A C et A G dans le cube unité (√2 et √3) ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py, les figures dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'OUTIL se fait là-bas, jamais recopiée ici.
# ⭐ Toutes les cotes de ce fichier viennent d'une COMMANDE :
#   `python -X utf8 manim/poste2/mesure-ps-espace-norme-distance.py` (recopié de celui de
#   E8 : il signale les blocs rétrécis, les réductions PAR UN PLAFOND, compare la colonne
#   de droite au TITRE, mesure les étiquettes de figure DEUX À DEUX, et teste la pointe
#   d'une flèche contre le polygone de son plan).
#
# ⚠️ Bonne réponse : 04 → B, 07 → C (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# ⭐⭐ LA NOTATION VECTORIELLE EST OBLIGATOIRE (décision de Frédéric, 22/11) : tout nom de
#   vecteur écrit à l'écran porte sa flèche — `self.vec` pour un nom seul, `self.vexpr`
#   pour une expression. Le contrôle : `python -X utf8 manim/poste2/auditer-fleches-vecteurs.py`.
#   ⛔⛔ ET CET ÉPISODE-CI EST CELUI OÙ LA DISTINCTION EST LA LEÇON : « A B⃗ » est un
#   VECTEUR (flèche), « AB » est sa NORME, c'est-à-dire une LONGUEUR, un nombre — donc
#   sans flèche. L'écran 03 écrit les deux côte à côte (« AB = ‖A B⃗‖ ») : si les deux
#   notations se ressemblaient, il n'y aurait plus rien à enseigner. Les textes qui
#   portent une longueur sont inscrits, AVEC LEUR RAISON, dans la table
#   `PAS_DES_VECTEURS` de l'audit des flèches — c'est son point d'extension prévu.
#
# ⭐⭐ LE RADICAL EST DESSINÉ, PAS TAPÉ, ET C'EST UNE MESURE (image d'essai, avant le
#   premier écran) : le glyphe √ (U+221A) se rend bien, MAIS IL N'A AUCUNE BARRE.
#   « √x² + y² + z² » se lirait « (√x²) + y² + z² » — la faute même que l'épisode
#   combat. `self.racine(...)` (socle) trace le vinculum. ⚠️ Un radical est plus HAUT
#   qu'un texte de même police : les cotes des blocs qui en portent un se remesurent.
#
# ⛔⛔ DEUX FAMILLES DE NOMBRES SONT HORS AUDIT DANS CET ÉPISODE, ET LES DEUX SONT
#   STRUCTURELLES (même raison que le `zero()` de l'épisode 8) :
#   · `self.lettres(...)` — l'écran 01 et quelques lignes ailleurs écrivent en CHIFFRES
#     ce que la voix dit EN TOUTES LETTRES (« dix kilomètres », « onze », « cent un »,
#     « zéro », « trois dimensions », « cinq unités »). Les écrire en lettres à l'écran
#     d'un cours de maths serait une faute ; sans ce découpage, chacun sortirait en
#     AUDIT-ABSENT et noierait le seul signalement qu'on cherche ;
#   · `self.env(v)` — « ≈ 1,41 », « ≈ 1,73 », « 3,74 » : la voix dit « environ 1 virgule
#     41 », donc la chaîne « 1,41 » n'existe nulle part dans son texte.
#
# ⛔ AUCUN MORCEAU DE PLAN DANS CET ÉPISODE : il ne parle que de longueurs. `platitude()`
#   n'a donc rien à trancher ici — et c'est vérifié plus bas, pour que personne ne croie
#   que le contrôle a été oublié.
#
# Voix : manim/voix/terminale-ps-espace-norme-distance.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
#   --disable_caching manim/scripts/terminale/ps_espace_norme_distance.py \
#   PsEspaceNormeDistanceTerminale \
#   --media_dir manim/scripts/terminale/media-ps-espace-norme-distance --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_FANTOME, C_PIEGE, C_POINT, C_REGARD,  # noqa: E402
                      C_VECTEUR, C_VECTEUR2, Repere3D)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import CompteARebours, P, EcransEspace, pastille_pause  # noqa: E402

PEAU, MAILLOT = "#c68642", "#0ea5e9"
SHORT, DOSSARD = "#1e293b", "#f8fafc"

# ── les données de l'épisode, écrites UNE fois ─────────────────────────────
U02 = (2, 3, 6)                           # 02 : l'exemple qui tombe juste → 7
U04 = (1, -2, 2)                          # 04 : la question-pause n° 1 → 3 (réponse B)
A05, B05 = (1, 0, 2), (3, -1, 4)          # 05 : la distance A B → 3
A07, B07 = (2, 1, 0), (2, 1, 5)           # 07 : la question-pause n° 2 → 5 (réponse C)
PLAT, DENIV = 10, 1                       # 01 : la Diagonale des Fous, en kilomètres
# ⭐ Le cube de 9 épisodes sur 12, dans le repère (A ; AB, AD, AE).
S = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
     "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}


def vec3(m, n):
    return tuple(n[i] - m[i] for i in range(3))


def carres(u):
    """Les trois carrés, séparément — l'épisode les affiche un à un."""
    return [u[i] * u[i] for i in range(3)]


def norme2(u):
    """Le CARRÉ de la norme. ⭐ C'est lui qu'on calcule ; la racine vient après, et
    l'épisode entier existe parce qu'on l'oublie (le leurre A de la question 1)."""
    return sum(carres(u))


# ── la passe maths du script, refaite indépendamment de la voix ────────────
# ⭐ Aucun nombre affiché par cet épisode n'est recopié de la voix : ils sont tous
# recalculés ici, et une erreur de voix se verrait comme un écart entre les deux.
assert norme2(U02) == 49 and norme2(U02) ** 0.5 == 7           # 02 : 4 + 9 + 36
assert carres(U02) == [4, 9, 36]
assert norme2(U04) == 9 and norme2(U04) ** 0.5 == 3            # 04 : réponse B
assert carres(U04) == [1, 4, 4]
assert sum(U04) == 1                                           # le leurre C : 1 − 2 + 2
# ⛔ Le leurre A (9) est le CARRÉ de la norme : la racine oubliée. C'est le même nombre
# que la somme des carrés, et c'est exactement ce qui le rend crédible.
assert norme2(U04) == 9
AB05 = vec3(A05, B05)
assert AB05 == (2, -1, 2) and norme2(AB05) == 9                # 05 : 4 + 1 + 4
AB07 = vec3(A07, B07)
assert AB07 == (0, 0, 5) and norme2(AB07) == 25                # 07 : réponse C, 5
assert 3 ** 2 + 4 ** 2 == 25 and 25 ** 0.5 == 5 and 3 + 4 == 7   # 06 : 5, et non 7
assert abs(14 ** 0.5 - 3.7416) < 1e-4                          # 06 : √14 ≈ 3,74
# ⭐ 01 : « pas onze kilomètres » est EXACT, et c'est le cœur de la situation.
assert PLAT ** 2 + DENIV ** 2 == 101
assert abs(101 ** 0.5 - 10.0499) < 1e-4 and 101 ** 0.5 < PLAT + DENIV
# ⭐ 09b : le défi, refait en entier.
AC, AG = vec3(S["A"], S["C"]), vec3(S["A"], S["G"])
assert AC == (1, 1, 0) and norme2(AC) == 2                     # la diagonale d'une face
assert AG == (1, 1, 1) and norme2(AG) == 3                     # la grande diagonale
assert abs(2 ** 0.5 - 1.4142) < 1e-4 and abs(3 ** 0.5 - 1.7321) < 1e-4
# ⭐ « si l'arête mesure a, il suffit de multiplier » : l'homogénéité de la norme,
# vérifiée sur un a quelconque plutôt que crue sur parole.
for a in (0.5, 2, 7):
    assert abs(norme2(tuple(a * c for c in AC)) ** 0.5 - a * 2 ** 0.5) < 1e-9
    assert abs(norme2(tuple(a * c for c in AG)) ** 0.5 - a * 3 ** 0.5) < 1e-9
# ⭐ 09b : A C G est un triangle RECTANGLE en C — c'est ce que la figure montre, et
# c'est pour ça que A G² = A C² + C G².
CG = vec3(S["C"], S["G"])
assert sum(AC[i] * CG[i] for i in range(3)) == 0
assert norme2(AG) == norme2(AC) + norme2(CG)


def coureur(s=1.0):
    """UNE COUREUSE DE LA DIAGONALE DES FOUS, en pleine foulée.

    ⛔ Les règles payées sur les cinq personnages des épisodes 1 à 8, appliquées ici :
    1. AUCUN trait de visage — aucun personnage de la série n'en a, et une bouche
       dessinée à cette taille se lit comme une tache (E4) ;
    2. ⛔ PAS DE COIFFURE QUI BARRE LE VISAGE : la visière de Jean-Bernard (E4) et le
       casque de Marc (E8) ont coûté un gros plan chacun. Ici, rien sur la tête — un
       bandeau posé trop bas serait la troisième récidive du même défaut ;
    3. un accessoire n'est JAMAIS de la couleur de ce qu'il touche (piège n° 17 des
       entiers) : le dossard est BLANC sur un maillot cyan, le short est sombre ;
    4. le bras part de l'ÉPAULE (x = ±0,33, le bord du torse), pas du milieu du buste —
       défaut n° 1 de Jean-Bernard (E4), revu sur Kelly (E7) ;
    5. ⛔ LES JAMBES, et ici elles portent la foulée : sans elles, le torse se lit comme
       un buste coupé à mi-corps (Kelly, E7, vu seulement au gros plan ×2,8). Une jambe
       part en avant, l'autre en arrière, et les DEUX ont un genou — une jambe droite
       en diagonale se lit comme une béquille.
    ⭐ Le DOSSARD est ce qui dit « course », et la Diagonale des Fous est d'abord un
    dossard : c'est l'objet que la voix met en scène sans le nommer."""
    corps = RoundedRectangle(width=0.88, height=1.05, corner_radius=0.22,
                             fill_color=MAILLOT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.28))
    # Le dossard : un rectangle clair sur le maillot, avec sa bande de marque.
    dossard = VGroup(RoundedRectangle(width=0.46, height=0.34, corner_radius=0.05,
                                      fill_color=DOSSARD, fill_opacity=1, stroke_width=0),
                     Line(LEFT * 0.17, RIGHT * 0.17, stroke_width=4, color=C_PIEGE))
    dossard.move_to(P(0, 0.22))
    dossard[1].move_to(dossard[0].get_center() + DOWN * 0.07)
    # ⚠️ 0,70 ET NON 0,80 : le torse est un `RoundedRectangle` de rayon 0,22, donc son
    # BAS est plus étroit que ses 0,88 nominaux. Un short de 0,80 débordait des deux
    # côtés et se lisait comme une couche. Il doit être plus étroit que ce qu'on voit
    # du torse, pas que sa largeur déclarée.
    short = RoundedRectangle(width=0.70, height=0.32, corner_radius=0.10,
                             fill_color=SHORT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.34))
    # ⭐ Deux jambes à DEUX segments : cuisse puis mollet.
    # ⛔ VU AU GROS PLAN ×3,2 SUR LE PREMIER RENDU : le mollet arrière REMONTAIT
    # (talon vers la fesse, ce qui est une vraie foulée) et se lisait comme un bâton
    # détaché. À cette taille, la lisibilité passe avant le mouvement : les deux pieds
    # vont vers le BAS, l'un devant, l'autre derrière, et la foulée se lit quand même.
    jambe_av = VGroup(Line(P(-0.14, -0.50), P(-0.42, -0.82), stroke_width=13, color=PEAU),
                      Line(P(-0.42, -0.82), P(-0.36, -1.22), stroke_width=13, color=PEAU))
    jambe_ar = VGroup(Line(P(0.16, -0.50), P(0.44, -0.84), stroke_width=13, color=PEAU),
                      Line(P(0.44, -0.84), P(0.70, -1.10), stroke_width=13, color=PEAU))
    tete = Circle(radius=0.29, fill_color=PEAU, fill_opacity=1,
                  stroke_width=0).move_to(P(-0.06, 1.12))
    # ⛔⛔ PAS DE CHEVEUX, ET C'EST UNE DÉCISION PAYÉE DEUX FOIS SUR CE PERSONNAGE :
    # 1. une queue de cheval en `Arc` posé par `move_to` — qui centre sa BOÎTE et non son
    #    centre de courbure — flottait détachée du crâne (planche des figures seules) ;
    # 2. réécrite en deux segments partant de l'INTÉRIEUR de la tête, elle se lisait au
    #    gros plan ×3,2 comme une CORNE, ou un bâton planté dans le crâne.
    # ⭐ C'est le troisième épisode d'affilée où un accessoire de tête coûte un tour (la
    # visière de Jean-Bernard E4, le casque de Marc E8, ces cheveux-ci), et aucun des
    # personnages de la série n'a de traits de visage non plus. Une tête nue est le
    # gabarit de la maison : c'est le DOSSARD qui dit « course », pas la coiffure.
    # ⛔⛔ LES BRAS SONT DESSINÉS AVANT LE TORSE, ET LEUR ÉPAULE EST DEDANS. Deux essais
    # ratés avant celui-ci : à x = ±0,33 l'épaule était au MILIEU du buste (défaut n° 1
    # de Jean-Bernard, E4, troisième récidive) ; poussée à ±0,43, c'est-à-dire sur le
    # bord même du torse, le gros plan montrait un TROU NOIR entre le torse et chaque
    # bras. ⭐ La solution n'est pas une cote, c'est l'ORDRE : l'épaule est à ±0,34, donc
    # franchement dans le torse, et le torse est posé PAR-DESSUS — l'articulation
    # disparaît sous le vêtement, comme sur un vrai dessin.
    # ⚠️ ELLE COURT VERS LA GAUCHE (la jambe avant part en −x) : le bras AVANT va donc à
    # gauche, le bras arrière à droite, et tous deux sont PLIÉS au coude — un bras tendu
    # en diagonale se lit comme une béquille, exactement comme une jambe droite.
    # ⛔ LES DEUX BRAS NE SONT PAS SYMÉTRIQUES, ET C'EST LE GROS PLAN QUI L'A DIT : pliés
    # de la même façon des deux côtés, ils se lisaient comme un HAUSSEMENT D'ÉPAULES, pas
    # comme une foulée. Dans une course, le bras avant remonte vers la poitrine et le
    # bras arrière descend derrière la hanche — c'est l'OPPOSITION des deux qui dit le
    # mouvement, et aucune cote ne la remplace.
    bras_av = VGroup(Line(P(-0.34, 0.60), P(-0.66, 0.34), stroke_width=11, color=PEAU),
                     Line(P(-0.66, 0.34), P(-0.92, 0.62), stroke_width=11, color=PEAU))
    bras_ar = VGroup(Line(P(0.34, 0.60), P(0.68, 0.36), stroke_width=11, color=PEAU),
                     Line(P(0.68, 0.36), P(0.90, 0.04), stroke_width=11, color=PEAU))
    return VGroup(jambe_ar, jambe_av, short, bras_ar, bras_av, corps, dossard,
                  tete).scale(s)


def pente(s=1.0):
    """LE PROFIL DE LA COURSE : le plat, le dénivelé, et la distance réellement parcourue.

    ⭐⭐ DESSINÉ À L'ÉCHELLE, ET C'EST TOUTE LA LEÇON : la hauteur fait exactement un
    DIXIÈME de la base, donc l'hypoténuse se superpose presque au sol — « le dénivelé
    change presque tout à l'effort, et presque rien à la distance ». Un schéma exagéré
    aurait fait croire le contraire, et l'écran aurait contredit la voix.
    ⛔ Schéma PLAN : rien n'y est projeté, donc rien n'y ment. C'est la règle du poteau
    de l'épisode 8 — en cavalière, un angle de 5,7° serait illisible ET faux.
    ⚠️ Ce qui doit paraître horizontal se dessine selon x (leçon du pont, E5) : le plat
    est l'axe des x, le dénivelé monte.

    Rend (sol, montee, trajet, angle) : quatre morceaux, et les QUATRE sont joués —
    `plan_poteau` de l'épisode 8 en rendait cinq et l'écran n'en montrait que quatre."""
    base, haut = 4.0, 0.40
    a, b, c = P(-base / 2, -haut / 2), P(base / 2, -haut / 2), P(base / 2, haut / 2)
    # ⛔ LE SOL EST UN TRAIT PLEIN, ET C'EST LE GROS PLAN QUI L'A DIT : en `DashedLine`,
    # le premier et le dernier tiret ne vont pas jusqu'aux extrémités — mesuré à ×2,6,
    # le pointillé commençait 0,30 unité à droite du départ, et le triangle paraissait
    # OUVERT à gauche. ⚠️ Et il n'a aucune raison d'être pointillé : les dix kilomètres à
    # plat sont réellement parcourus, ce n'est pas un trait de construction.
    sol = Line(a, b, stroke_width=7, color=C_FANTOME)
    montee = Line(b, c, stroke_width=9, color=C_REGARD)
    trajet = Line(a, c, stroke_width=9, color=C_VECTEUR)
    # Le petit carré de l'angle droit, au pied de la montée. ⚠️ 0,11 et non 0,20 : la
    # montée ne fait que 0,40 de haut, un carré de 0,20 en occuperait la moitié.
    k = 0.11
    angle = VGroup(Line(b + LEFT * k, b + LEFT * k + UP * k),
                   Line(b + LEFT * k + UP * k, b + UP * k)).set_stroke(VERT_OK, 3)
    return VGroup(sol, montee, trajet, angle).scale(s)


def triangle345(s=1.0):
    """LE 3-4-5 DU PIÈGE : trois carrés, une racine, et la réponse n'est pas 7.

    ⛔ Schéma PLAN, pour la même raison que `pente` : l'écran dit « racine de 3 au carré
    plus 4 au carré », une égalité de nombres, pas une figure de l'espace.
    ⭐ Les deux côtés de l'angle droit portent les couleurs des deux termes qu'on
    voudrait additionner, et l'hypoténuse celle du résultat : le dessin dit visuellement
    pourquoi 3 + 4 ne peut pas être la longueur du troisième côté.

    ⛔⛔ IL EST AUX VRAIES PROPORTIONS 3-4-5, ET IL NE L'ÉTAIT PAS. Premier jet, vu sur
    la planche des figures seules : base 2,30 pour une hauteur 1,53, soit un rapport de
    1,50 au lieu de 1,333 — un triangle étiqueté « 3, 4, 5 » qui n'est pas un 3-4-5,
    faux de 13 %. ⛔ Aucun outil ne peut le voir : les trois nombres affichés sont
    exactement ceux que la voix dit, le dessin est dans la marge, et il est simplement
    FAUX. Les cotes viennent maintenant d'une UNITÉ (`k`), et l'assertion du module les
    revérifie."""
    k = 0.58                               # une unité du 3-4-5, en coordonnées Manim
    a, b, c = P(-2 * k, -1.5 * k), P(2 * k, -1.5 * k), P(2 * k, 1.5 * k)
    cote3 = Line(b, c, stroke_width=9, color=C_REGARD)       # le côté 3 (vertical)
    cote4 = Line(a, b, stroke_width=9, color=C_VECTEUR2)     # le côté 4 (horizontal)
    hyp = Line(a, c, stroke_width=9, color=VERT_OK)          # l'hypoténuse, 5
    k = 0.20
    angle = VGroup(Line(b + LEFT * k, b + LEFT * k + UP * k),
                   Line(b + LEFT * k + UP * k, b + UP * k)).set_stroke(GREY_A, 3)
    return VGroup(cote4, cote3, hyp, angle).scale(s)


# ── les deux schémas sont-ils vraiment à l'échelle qu'ils annoncent ? ──────
# ⭐⭐ CES DEUX ASSERTIONS SONT NÉES D'UN DÉFAUT RÉEL, vu sur la planche des figures
# seules : le triangle « 3-4-5 » avait un rapport de 1,50 au lieu de 1,333. Un dessin
# peut être dans la marge, porter les bons nombres, et mentir sur ce qu'il montre —
# aucun audit, aucune mesure de cadre ne le voit. Alors on le CALCULE.
def _cotes(g):
    """Les longueurs des trois premiers segments d'un schéma, en unités Manim."""
    return [float(np.linalg.norm(m.get_end() - m.get_start())) for m in g[:3]]


_t345 = _cotes(triangle345(1.0))
assert abs(_t345[0] / _t345[1] - 4 / 3) < 1e-9, "le 3-4-5 n'est pas un 3-4-5"
assert abs(_t345[2] / _t345[1] - 5 / 3) < 1e-9, "l'hypoténuse du 3-4-5 n'est pas 5"
# ⭐ Le profil de la course : la hauteur fait EXACTEMENT un dixième de la base, sinon
# l'écran dirait autre chose que la voix (« presque rien à la distance »).
# ⚠️ La base se déduit de la MONTÉE et du TRAJET, et non du sol : c'est la précaution
# qui avait été prise quand le sol était encore une `DashedLine` (dont les extrémités
# sont celles du premier et du dernier tiret, pas de la ligne). Elle ne coûte rien et
# elle survit au changement — une cote lue sur le mauvais objet est une cote fausse.
_p = pente(1.0)
_haut = float(np.linalg.norm(_p[1].get_end() - _p[1].get_start()))
_traj = float(np.linalg.norm(_p[2].get_end() - _p[2].get_start()))
_base = (_traj ** 2 - _haut ** 2) ** 0.5
assert abs(_base / _haut - PLAT / DENIV) < 1e-6, "le profil n'est pas à l'échelle 10 / 1"


class PsEspaceNormeDistanceBase(EcransEspace):
    fichier_marques = "ps_espace_norme_distance_marques.json"
    nom_voix = "terminale-ps-espace-norme-distance"

    # ── les outils propres à cet épisode ───────────────────────────────────

    def lettres(self, mob):
        """UN TEXTE DONT LA VOIX DIT LES NOMBRES EN TOUTES LETTRES — hors audit, et
        c'est structurel (même mécanisme que le `zero()` de l'épisode 8).

        L'écran 01 en est plein : la voix dit « dix kilomètres à plat », « un kilomètre
        de dénivelé », « pas onze kilomètres », « racine de cent un », « en trois
        dimensions » ; ailleurs, « zéro » et « cinq unités ». À l'écran d'un cours de
        maths, « 10 km » est la seule écriture juste — mais la chaîne « 10 » n'existe
        nulle part dans le texte de la voix, donc chaque nombre sortirait en
        AUDIT-ABSENT et noierait le seul signalement qu'on cherche."""
        return self.sans_audit(mob)

    def env(self, v, fs=26, color=WHITE):
        """« ≈ 1,41 » — HORS AUDIT, et pour la même raison : la voix dit « environ 1
        virgule 41 », donc « 1,41 » n'est pas dans son texte. ⭐ Et l'arrondi est écrit
        à la française (virgule), par `self.nombre`."""
        return self.sans_audit(self.t("≈ " + self.nombre(v), fs, color))

    def nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« A B⃗ (2 ; −1 ; 2) » : le nom du VECTEUR avec sa flèche, puis son triplet.
        ⛔⛔ `self.vec` ET NON `self.t` : « A B (2 ; −1 ; 2) » sans flèche se lit comme
        une fonction de trois variables — et dans CET épisode, où « AB » tout court
        désigne une LONGUEUR, l'ambiguïté serait la faute elle-même."""
        g = VGroup(self.vec(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def pt_nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« A (1 ; 0 ; 2) » : un POINT et ses coordonnées. ⛔ Pas de flèche — un point
        n'est pas un vecteur, et la parenthèse l'en distingue (règle de l'écran 09b de
        l'épisode 8)."""
        g = VGroup(self.t(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def somme_carres(self, u, fs=28, color=WHITE, total=None):
        """« 4 + 1 + 4 = 9 » — la somme des trois carrés, recalculée, jamais recopiée.
        ⚠️ `g.nb` porte TOUS les nombres de la ligne : posée à son premier mot, elle
        mettrait son total à l'écran avant qu'il soit dit (piège n° 6 des entiers)."""
        c = carres(u)
        t = self.t(" + ".join(str(x) for x in c)
                   + " = " + str(norme2(u) if total is None else total), fs, color)
        t.nb = [t]
        return t

    def cube_repere(self, o, u, rouges=(), fs=24, ecarte=None):
        """LE CUBE UNITÉ ABCDEFGH — ⛔ SANS AXES, et c'est une correction payée à l'image
        sur l'épisode 6 (recopiée ici telle quelle, avec sa raison).

        Dans CE repère-là, les trois axes sont PORTÉS PAR TROIS ARÊTES DU CUBE (A B,
        A D, A E) : dessinés avec `portee=2`, ils se superposent exactement aux arêtes
        sur leur première moitié — on ne voit pas des axes, on voit des arêtes grises
        doublées — et surtout le bout de l'axe des y tombe À L'INTÉRIEUR du cube (le
        projeté de (0 ; 2 ; 0) est (0,82 ; 0,57) et la silhouette du cube va jusqu'à
        (1,41 ; 1,29)). ⛔ Allonger la portée n'arrange rien avant 4, où les axes
        feraient quatre fois le cube.
        ⭐ Le repère est DIT, pas tracé : `base_repere` le montre par trois flèches
        posées sur les trois arêtes qui partent de A.
        ⚠️ `u` reste entre 1,25 et 1,6 : à 0,95 les noms des sommets se touchent.

        ⛔⛔ `ecarte` — UN NOM DE SOMMET QU'UNE FLÈCHE TRAVERSE. Mesuré : la grande
        diagonale A G passe à **0,00** du nom « D » et à **0,10** du nom « F ». En
        cavalière, A G se projette sur (1,41 ; 1,287) et frôle le projeté de D
        (0,41 ; 0,287) comme celui de F (1 ; 1) — les deux noms étaient barrés par le
        fût. ⛔ `etiquettes()` compare les étiquettes DEUX À DEUX : il ne pouvait pas le
        voir. C'est `loin_des_fleches()` (le contrôle neuf de cet épisode) qui l'a dit.

        ⛔⛔ ET LA POSITION NE SE DEVINE PAS : écarter « D » vers la gauche et « F » vers
        la droite — le premier réflexe — les a posés PILE SUR deux arêtes du cube, vu au
        gros plan ×2,8. On ne gagne rien à fuir une flèche pour tomber sur une arête.
        ⭐ Les deux décalages viennent donc d'une RECHERCHE EN GRILLE (pas de 0,06 entre
        −0,9 et +0,9), qui garde les positions à plus de 0,11 de TOUT segment tracé —
        les douze arêtes, les deux diagonales et [C G] — et à plus de 0,22 des sept
        autres noms, puis classe par distance au sommet. C'est la recette de la « passe
        des flèches » (REPRISE-espace-terminale.md), et elle vaut pour E10 à E12, qui
        dessinent tous des vecteurs dans ce même cube.
        ⚠️ `placer` donne la position du nom PAR RAPPORT AU SOMMET, pas un décalage par
        rapport à la place que `cube()` lui avait donnée : une cote relative à une autre
        cote se périme au premier changement de l'une des deux."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=2)
        cube = self.sans_audit(r.cube(cote=1, rouges=rouges, couleur=C_POINT, sw=4, fs=fs))
        for lettre, offset in (ecarte or {}).items():
            for sub in cube.submobjects:
                if isinstance(sub, Text) and sub.text == lettre:
                    sub.move_to(cube.sommet(lettre) + offset)
        return r, cube

    def base_repere(self, r, couleur=C_VECTEUR, sw=5):
        """LES TROIS VECTEURS DE BASE A B, A D, A E — le repère de l'énoncé, montré.
        ⛔ Sans lettres : un « y » posé au bout de A D tomberait dans le cube."""
        return VGroup(*[r.vecteur(S["A"], S[s], None, couleur=couleur, sw=sw)
                        for s in ("B", "D", "E")])

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Normes et distances", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Normes et distances dans l'espace")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        fs = 38
        # ⛔ L'ORDRE EST CELUI DE LA VOIX : « Trois carrés, une racine — et une règle
        # qu'on viole tout le temps : la racine ne se distribue pas. » La règle arrive
        # DERNIÈRE, et c'est elle qu'on met en bas, en grand.
        promesses = (("trois carrés, une racine", C_REGARD, "Trois carrés, une racine"),
                     ("une règle qu'on viole tout le temps", C_PIEGE,
                      "une règle qu'on viole tout le temps"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, fs, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        lignes.move_to(P(-0.9, 0.95))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔ UNE SEULE LIGNE, et à −1,55 : `echelle()` alignée en bas occupe y de −3,45 à
        # −1,98 (mesuré sur l'épisode 5, où la note de reprise annonçait −2,6 et avait
        # tort). Une ligne simple à −1,55 descend à −1,75 : elle passe de 0,23.
        fin = self.t("la racine ne se distribue pas", 32, VERT_OK).move_to(P(-0.9, -1.55))
        self.au_mot("la racine ne se distribue pas")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : la Diagonale des Fous ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        c = coureur(0.68).move_to(P(-5.70, 0.55))
        self.au_mot("Pense à la Diagonale des Fous")
        nom = self.t("la Diagonale", 28, JAUNE_TITRE).next_to(c, DOWN, buff=0.20)
        # ⛔ Le garde-fou AVANT le play, et pas après (défaut n° 7 de l'épisode 1, refait
        # sur E4) : un nom centré sous un personnage posé à gauche part hors marge.
        if nom.get_left()[0] < -6.5:
            nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
        met = self.t("des Fous", 28, JAUNE_TITRE).next_to(nom, DOWN, buff=0.08)
        if met.get_left()[0] < -6.5:
            met.shift(RIGHT * (-6.5 - met.get_left()[0]))
        self.play(FadeIn(c, shift=UP * 0.2), FadeIn(nom), FadeIn(met), run_time=0.7)

        # ── le profil, À L'ÉCHELLE ────────────────────────────────────────
        pr = pente(1.0).move_to(P(-1.55, 1.25))
        self.au_mot("Un coureur enchaîne dix kilomètres à plat")
        et_plat = self.lettres(self.t(f"{PLAT} km à plat", 26, C_FANTOME))
        et_plat.next_to(pr[0], DOWN, buff=0.16)
        self.play(Create(pr[0]), FadeIn(et_plat), run_time=0.6)
        self.au_mot("un kilomètre de dénivelé")
        et_den = self.lettres(self.t(f"{DENIV} km", 26, C_REGARD))
        et_den.next_to(pr[1], RIGHT, buff=0.14)
        self.play(Create(pr[1]), Create(pr[3]), FadeIn(et_den), run_time=0.6)

        fs = 28
        self.au_mot("Quelle distance a-t-il parcourue")
        b1 = self.col(VGroup(self.t("quelle distance,", fs, C_REGARD),
                             self.t("vraiment ?", fs, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.40)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ LE TRAJET RÉEL ARRIVE AVEC « pas onze kilomètres » : c'est lui la réponse, et
        # le dessin ne porte jamais la réponse avant que la voix l'annonce.
        self.au_mot("Pas onze kilomètres")
        self.play(Create(pr[2]), run_time=0.6)
        b2 = self.col(VGroup(self.croix(r=0.13),
                             self.lettres(self.t(f"pas {PLAT + DENIV} km", fs, C_PIEGE)))
                      .arrange(RIGHT, buff=0.22), 1.25)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("on passe par les carrés")
        b3 = self.col(VGroup(self.t("on passe", fs, C_REGARD),
                             self.t("par les CARRÉS", fs, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.05)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.5)
        # ⚠️ Le radical est posé SUR l'hypoténuse, au-dessus d'elle : la pointe du
        # triangle est à droite, le milieu du trajet est libre.
        self.au_fin("Racine de cent plus un")
        et_tr = self.lettres(self.racine(PLAT ** 2 + DENIV ** 2, 28, C_VECTEUR))
        et_tr.next_to(pr[2].get_center(), UP, buff=0.18)
        km = self.t("km", 24, C_VECTEUR).next_to(et_tr, RIGHT, buff=0.10)
        self.play(FadeIn(et_tr), FadeIn(km), run_time=0.6)
        self.au_mot("soit un peu plus de dix kilomètres")
        b4 = self.col(self.lettres(self.t(f"un peu plus de {PLAT} km", fs, VERT_OK)), -1.15)
        self.play(FadeIn(b4, shift=RIGHT * 0.12), run_time=0.5)

        # ⭐ La CONCLUSION va à gauche, sous les figures, en grand (défaut n° 4 de E3) :
        # le bas de la colonne de droite est réservé aux lignes COURTES.
        # ⛔ DEUX LIGNES, parce que la phrase fait 72 caractères : d'un seul tenant elle
        # dépasse les 11,10 offerts à gauche et `gauche()` la rétrécirait.
        self.au_mot("Le dénivelé change presque tout à l'effort")
        fil = VGroup(self.t("le dénivelé change presque tout à l'effort,", 26, C_REGARD),
                     self.t("et presque rien à la distance", 26, C_REGARD))
        fil.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(fil, color=C_REGARD, buff=0.16, stroke_width=3)
        # ⛔ On pose le GROUPE texte + cadre : gauche() borne le TEXTE, pas le cadre.
        self.gauche(VGroup(fil, cad), -2.00, xmax=4.6)
        self.play(FadeIn(fil, scale=1.05), Create(cad), run_time=0.8)
        self.au_mot("C'est le théorème de Pythagore")
        pyt = self.lettres(self.t("c'est Pythagore, en trois dimensions", 28, VERT_OK))
        self.gauche(pyt, -3.10, xmax=4.6)
        self.play(FadeIn(pyt, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : la norme, et l'ESCALIER de coordonnées ────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Dans un repère orthonormé")
        titre = self.t("La norme d'un vecteur", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)

        # ── L'ESCALIER DE COORDONNÉES, à gauche ───────────────────────────
        # ⭐⭐ C'EST LA FIGURE DE CETTE MICRO, et sa docstring le dit :
        # `Repere3D.point(..., escalier=True)` trace le chemin pointillé qui montre d'où
        # sortent les trois arêtes dont on fait la somme des carrés. On avance en x, puis
        # en y, puis on monte en z — et la flèche bleue est l'hypoténuse de tout ça.
        # ⚠️ Il ENCOMBRE : c'est le seul écran de l'épisode qui le demande.
        # ⚠️ u = 0,85 et non 0,62 : à 0,62 la figure ne fait que 1,86 de large, et
        # l'épisode 7 a payé une figure de « trois traits d'un centimètre ».
        r, ax = self.repere(o=(-4.95, -1.45), u=0.85, portee=3)
        self.play(Create(ax), run_time=0.6)
        self.au_mot("la norme d'un vecteur u de coordonnées x, y, z")
        # ⛔⛔ (1 ; 2 ; 2) ET NON (2 ; 2 ; 2), ET C'EST UNE MESURE : le projeté de
        # (2 ; 2 ; 2) part à 42,4° et l'axe des y à 35,0° — SEPT DEGRÉS d'écart, donc le
        # fût de u passait à 0,06 du « y » de l'axe et le traversait. C'est la même
        # famille que « les trois axes sont trois arêtes du cube » (E6) et que le vecteur
        # de E1 confondu avec l'axe des y : en cavalière, une direction choisie à vue
        # tombe sur un axe une fois sur trois. (1 ; 2 ; 2) part à 54,7°, soit 19,7° du y
        # et 35,3° du z. ⭐ Et ici on PEUT choisir : la voix ne donne aucun nombre sur
        # cette figure, elle dit « un vecteur u de coordonnées x, y, z ».
        esc = self.sans_audit(r.point(1, 2, 2, None, couleur=C_VECTEUR, r=0.07,
                                      escalier=True))
        # ⛔ L'étiquette va du côté où le vecteur ne va PAS (défaut vu au gros plan sur
        # E7, deux fois) : u monte vers la DROITE, son nom part donc en haut à GAUCHE.
        fu = r.vecteur((0, 0, 0), (1, 2, 2), "u", couleur=C_VECTEUR, sw=7, fs=28, decal=UL)
        self.play(Create(esc.escalier), run_time=0.7)
        self.play(GrowArrow(fu[0]), FadeIn(fu.nom), FadeIn(esc[0]), run_time=0.6)
        # ⚠️ La légende est accrochée SOUS la figure (`next_to`) et non posée à un y
        # choisi : la figure a changé de taille deux fois, et une cote recopiée aurait
        # survécu à ces changements sans avoir raison (leçon de l'épisode 5).
        sous = self.sans_audit(self.t("trois pas : x, puis y, puis z", 24, C_FANTOME))
        sous.next_to(VGroup(ax, esc), DOWN, buff=0.18).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(sous), run_time=0.4)

        # ── la formule, puis l'exemple, dans la colonne de droite ─────────
        fs = 28
        self.au_fin("vaut racine de x au carré plus y au carré plus z au carré")
        form = VGroup(self.vexpr("‖u‖ =", ("u",), 32, VERT_OK),
                      self.racine("x² + y² + z²", 32, VERT_OK))
        form.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        self.col(form, 2.30)
        self.play(FadeIn(form, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("u de coordonnées 2, 3, 6")
        lu = self.col(self.nomme("u", U02, C_VECTEUR, fs), 1.10)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Les carrés font 4, 9 et 36")
        car = self.col(self.t(" ; ".join(str(x) for x in carres(U02)), fs, WHITE), 0.30)
        self.play(FadeIn(car, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Leur somme fait 49")
        som = self.col(self.t(f"somme : {norme2(U02)}", fs, WHITE), -0.50)
        self.play(FadeIn(som, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Et racine de 49 fait 7")
        rac = VGroup(self.racine(norme2(U02), 32, VERT_OK),
                     self.t(f"= {int(norme2(U02) ** 0.5)}", 32, VERT_OK))
        rac.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        self.col(rac, -1.30)
        self.play(FadeIn(rac, shift=RIGHT * 0.12), run_time=0.6)
        # ⚠️ xmax = 4,6 : la colonne de droite s'arrête au-dessus (son dernier bloc
        # descend vers −1,5), donc cette ligne-là peut prendre toute la largeur.
        self.au_fin("La norme de u vaut exactement 7")
        fin = self.sans_audit(self.vexpr(
            f"la norme de u vaut exactement {int(norme2(U02) ** 0.5)}", ("u",), 30, VERT_OK))
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -3.10, xmax=4.6)
        self.play(FadeIn(fin, scale=1.05), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 03 : distance = norme du vecteur ───────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("La distance entre deux points A et B")
        titre = self.t("Une distance est une norme", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⛔⛔ LES DEUX NOTATIONS CÔTE À CÔTE, ET C'EST LA LEÇON DE L'ÉPISODE : « AB »
        # est une LONGUEUR (un nombre, pas de flèche), « A B⃗ » est un VECTEUR. Si les
        # deux s'écrivaient pareil, il n'y aurait rien à démontrer.
        # ⛔ Deux morceaux, et `aligned_edge=DOWN` : « AB » et « = ‖A B⃗‖ » n'ont ni la
        # même hauteur ni la même ligne de base (c'est la raison d'être de `vexpr`), et
        # sans cet alignement l'expression monterait au milieu.
        self.au_mot("est la norme du vecteur A B")
        tete = VGroup(self.sans_audit(self.t("AB", 40, C_REGARD)),
                      self.sans_audit(self.vexpr("= ‖A B‖", ("A B",), 40, C_VECTEUR)))
        tete.arrange(RIGHT, buff=0.18, aligned_edge=DOWN)
        cad0 = SurroundingRectangle(tete, color=C_REGARD, buff=0.18, stroke_width=3)
        VGroup(tete, cad0).move_to(P(-0.75, 1.85))
        self.play(FadeIn(tete, scale=1.06), Create(cad0), run_time=0.8)
        legende = self.sans_audit(self.t("une LONGUEUR = la norme d'un VECTEUR", 24, GREY_A))
        legende.next_to(cad0, DOWN, buff=0.16)
        self.play(FadeIn(legende), run_time=0.35)

        # ⛔ 28 ET NON 30 : c'est la police mesurée de l'écran 03 de E8, où 30 faisait
        # 11,20 de large pour un plafond de 10,60 et réduisait TOUT le tableau en
        # silence. La mesure de cet épisode-ci le revérifie sur SES libellés.
        fs = 28
        lignes = (("1", "d'abord :", C_VECTEUR, ("arrivée moins départ", None), WHITE,
                   "d'abord arrivée moins départ"),
                  ("2", "ensuite :", C_REGARD,
                   ("la racine de la somme des carrés", None), WHITE,
                   "puis la racine de la somme des carrés"),
                  ("3", "le lien :", VERT_OK, ("‖u‖² = u · u", ("u",)), WHITE,
                   "le carré de la norme est le produit scalaire du vecteur par lui-même"))
        rangs, extraits = [], []
        for k, (_, g, cg, (d, dn), cd, extrait) in enumerate(lignes, start=1):
            corps = (self.sans_audit(self.vexpr(d, dn, fs, cd)) if dn
                     else self.t(d, fs, cd))
            rangs.append(VGroup(self.pastille(k), self.t(g, fs, cg), corps)
                         .arrange(RIGHT, buff=0.24))
            extraits.append(extrait)
        rangees = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if rangees.width > 10.6:
            rangees.scale_to_fit_width(10.6)
        rangees.move_to(P(-0.75, -1.25))
        # ⭐ L'ordre du tableau EST celui de la voix ici (contrairement à l'écran 03 de
        # E8, où deux blocs d'insistance arrivaient avant la troisième rangée) : les
        # trois rangées se montrent donc simplement l'une après l'autre.
        for b, extrait in zip(rangs, extraits):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1:], shift=RIGHT * 0.15),
                      run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : B) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ Le dessin porte la DONNÉE (le triplet), jamais la RÉPONSE : aucun carré,
        # aucune racine, aucune figure. Tout arrive en 04b.
        # ⚠️ Les trois choix sont des NOMBRES À UN CHIFFRE : la carte étroite par défaut
        # (4,1 à partir de x = 2,2) suffit largement, et la donnée de gauche a donc toute
        # la place jusqu'à x = 1,9. ⛔ Pas de carte large ici : elle ne servirait à rien
        # et pousserait la pause sous Ti-Margo.
        lu = self.gauche(self.nomme("u", U04, C_VECTEUR, 40), 1.70, xmax=1.9)
        # ⛔⛔ LES TROIS CARTES PORTENT UN NOMBRE, ET CHACUNE A DONC BESOIN DE `.nb` :
        # posée à son premier mot, « 9 » serait à l'écran avant d'être prononcé. C'est
        # le défaut de la carte B de l'épisode 8 (1,05 s d'avance), ici à toutes les
        # trois — `q_montrer_choix` n'attend la dernière marque d'un choix que si son
        # corps porte un `.nb`.
        cartes_txt = (norme2(U04), int(norme2(U04) ** 0.5), sum(U04))   # 9, 3, 1
        choix = []
        for v in cartes_txt:
            c = self.t(str(v), 36, WHITE)
            c.nb = [c]
            choix.append(c)
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.vexpr("Que vaut la norme de u ?", ("u",), 32))], choix)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        # ⛔⛔ L'ATTENTE EST COLLÉE À SON `play` (défaut de l'écran 04 de E8, 4,93 s de
        # retard) : un `au_fin` ne place rien, il ATTEND.
        self.au_fin("u a pour coordonnées 1, moins 2, 2")
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Que vaut la norme de u")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "B")
        self.mem_q1 = (cartes, pause, rebours)

    def ecran_reponse1(self):
        cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent par-dessus l'explication (défaut n° 1 de l'épisode 1).
        self.q_reponse(cartes, 1, pause, rebours)
        # ⛔⛔ CET ÉCRAN HÉRITE DE L'ÉCRAN 04 : u (1 ; −2 ; 2) RESTE à y = 1,70 — c'est la
        # DONNÉE de l'exercice, elle ne s'efface pas (cinquième récidive de la série).
        # Le calcul est donc UN SEUL bloc posé SOUS elle, et sa cote vient de la mesure :
        # le haut du bloc est comparé au bas de u, pas au `y` qu'on avait en tête.
        # ⭐ Quatre lignes d'un bloc, parce qu'un calcul se lit d'un bloc.
        fs = 30
        l1 = self.t("1² = 1", fs, WHITE)
        l2 = self.t("(−2)² = +4", fs, WHITE)
        l3 = self.t("2² = 4", fs, WHITE)
        l4 = self.t(f"somme : {norme2(U04)}", fs, WHITE)
        calc = VGroup(l1, l2, l3, l4).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        self.gauche(calc, 0.00, xmax=1.9)
        ancres = ((l1, "1 au carré fait 1"), (l2, "moins 2 au carré fait plus 4"),
                  (l3, "2 au carré fait 4"), (l4, "La somme fait 9"))
        for mob, extrait in ancres:
            self.au_fin(extrait)
            self.play(FadeIn(mob, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("et racine de 9 fait 3")
        rac = VGroup(self.racine(norme2(U04), 36, VERT_OK),
                     self.t(f"= {int(norme2(U04) ** 0.5)}", 36, VERT_OK))
        rac.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        cadr = SurroundingRectangle(rac, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(rac, cadr), -1.55, xmax=1.9)
        self.play(FadeIn(rac, scale=1.05), Create(cadr), run_time=0.7)

        # ── les deux leurres, nommés ──────────────────────────────────────
        # ⛔ au_fin ET NON au_mot : posées à leur premier mot, ces deux lignes mettraient
        # leur nombre à l'écran avant qu'il soit dit (piège n° 6 des entiers, qui revient
        # à chaque épisode de la série).
        # ⛔⛔ LE GROUPE SE MONTE EN DEUX ÉTAGES, ET LA MESURE L'A DIT : écrit
        # `VGroup(croix, t1, t2)` puis `lA[1:].arrange(DOWN)` suivi de
        # `lA.arrange(RIGHT)`, le second `arrange` reprend LES TROIS enfants et défait le
        # premier — le bloc sortait en UNE ligne de 10,34 de large au lieu de deux.
        # Mesuré, pas vu : à la planche, deux lignes et une ligne se ressemblent trop.
        self.au_fin("La réponse A, 9, c'est le carré de la norme")
        lA = VGroup(self.croix(r=0.12),
                    VGroup(self.t(f"{norme2(U04)} : c'est le carré de la norme —",
                                  26, C_PIEGE),
                           self.t("la racine a été oubliée", 26, C_PIEGE))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        lA.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(lA, -2.30, xmax=4.6)
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.6)
        # ⚠️ LA COUPURE EST APRÈS « coordonnées, » ET NON APRÈS LE CALCUL : d'un seul
        # tenant, la première ligne faisait 12,50 pour les 11,10 offerts à gauche, et
        # `gauche()` rétrécissait la phrase qui EXPLIQUE le leurre.
        self.au_fin("Et la réponse C, 1, c'est la somme des coordonnées")
        lC = VGroup(self.croix(r=0.12),
                    VGroup(self.t(f"{sum(U04)} : la somme des coordonnées,", 26, C_PIEGE),
                           self.t(f"{U04[0]} − {abs(U04[1])} + {U04[2]} : "
                                  "les carrés ont disparu", 26, C_PIEGE))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        lC.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(lC, -3.15, xmax=4.6)
        # ⛔⛔ DEUX INSTANTS, ET C'EST UN `AUDIT-TARD` DE 14,23 s QUI CACHAIT L'AVANCE :
        # la voix finit « c'est la somme des coordonnées » à 21,67 s et ne dit
        # « 1 moins 2 plus 2 » qu'à 23,56 s. Le bloc entier posé au premier instant
        # mettait donc son calcul à l'écran **1,9 s trop tôt** — et l'audit, qui avait
        # rattaché ces « 2 » au « moins 2 au carré » du début du clip, criait au RETARD.
        # C'est la huitième fois de la série qu'un gros TARD cache une vraie avance
        # (E5, E6 deux fois, E7, et ici) : on relit les plus gros à la main, toujours.
        self.play(FadeIn(lC[0], shift=RIGHT * 0.12),
                  FadeIn(lC[1][0], shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("1 moins 2 plus 2")
        self.play(FadeIn(lC[1][1:], shift=RIGHT * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 05 : une distance, d'un bout à l'autre ─────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons à une distance")
        titre = self.t("D'un point à l'autre", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        # ⚠️ Repère MESURÉ : o = (−4,95 ; −1,70), u = 0,5, portée 5 — B monte à z = 4,
        # donc la portée doit dépasser 4, et u = 0,5 garde la figure sous le titre.
        r, ax = self.repere(o=(-4.95, -1.70), u=0.5, portee=5)
        self.play(Create(ax), run_time=0.5)
        fs = 28
        self.au_fin("A a pour coordonnées 1, 0, 2")
        # ⛔ Deux points proches ont besoin de deux `decal` DIFFÉRENTS, et ça ne se
        # vérifie qu'à la mesure (`etiquettes()` les compare deux à deux) : A est
        # au-dessus de l'axe des y, son nom part à GAUCHE ; B est en l'air, le sien
        # part en haut à droite.
        pA = self.sans_audit(r.point(*A05, "A", couleur=C_REGARD, fs=26, decal=LEFT))
        self.play(FadeIn(pA), run_time=0.45)
        lA = self.col(self.pt_nomme("A", A05, C_REGARD, fs), 2.25)
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("B a pour coordonnées 3, moins 1, 4")
        pB = self.sans_audit(r.point(*B05, "B", couleur=C_REGARD, fs=26, decal=UR))
        self.play(FadeIn(pB), run_time=0.45)
        lB = self.col(self.pt_nomme("B", B05, C_REGARD, fs), 1.45)
        self.play(FadeIn(lB, shift=RIGHT * 0.12), run_time=0.45)
        # ⛔ L'étiquette va du côté où le vecteur ne va PAS : A B monte vers la droite,
        # son nom part donc en haut à GAUCHE (règle payée deux fois au gros plan sur E7).
        self.au_fin("D'abord le vecteur A B, arrivée moins départ : 2, moins 1, 2")
        fAB = r.vecteur(A05, B05, "A B", couleur=C_VECTEUR, sw=7, fs=26, decal=UL)
        lAB = self.col(self.nomme("A B", AB05, C_VECTEUR, fs), 0.55)
        self.play(GrowArrow(fAB[0]), FadeIn(fAB.nom),
                  FadeIn(lAB, shift=RIGHT * 0.12), run_time=0.7)
        self.au_fin("Ensuite les carrés : 4, 1 et 4")
        car = self.col(self.t(" ; ".join(str(x) for x in carres(AB05)), fs, WHITE), -0.30)
        self.play(FadeIn(car, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("leur somme fait 9")
        som = self.col(self.t(f"somme : {norme2(AB05)}", fs, WHITE), -1.10)
        self.play(FadeIn(som, shift=RIGHT * 0.12), run_time=0.5)
        # ⚠️ xmax = 1,9 tant que la colonne de droite est occupée ; ici le dernier bloc
        # de droite descend sous −1,2, donc la conclusion passe DESSOUS et prend toute
        # la largeur (xmax = 4,6).
        self.au_fin("Enfin la racine : la distance A B vaut 3")
        fin = VGroup(self.sans_audit(self.t("la distance AB vaut", 30, VERT_OK)),
                     self.racine(norme2(AB05), 32, VERT_OK),
                     self.t(f"= {int(norme2(AB05) ** 0.5)}", 30, VERT_OK))
        fin.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.95, xmax=4.6)
        self.play(FadeIn(fin, scale=1.04), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège le plus coûteux du chapitre ──────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège !")
        # ⛔ Le glyphe ⚠ ne se rend pas (carré « tofu ») : on DESSINE le triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("La racine ne se distribue pas", 42, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.9)
        fs = 28

        # ── le 3-4-5, à gauche ────────────────────────────────────────────
        self.au_mot("La racine ne se distribue pas")
        tri = triangle345(1.0).move_to(P(-4.60, 1.35))
        e3 = self.t("3", 28, C_REGARD).next_to(tri[1], RIGHT, buff=0.14)
        e4 = self.t("4", 28, C_VECTEUR2).next_to(tri[0], DOWN, buff=0.14)
        e5 = self.t("5", 28, VERT_OK).next_to(tri[2].get_center(), UL, buff=0.10)
        # ⛔⛔ LES DEUX CÔTÉS D'ABORD, LEURS NOMBRES ENSUITE, ET LE DRY RUN L'A DIT : posés
        # avec la figure, le « 3 » paraissait 2,62 s et le « 4 » 3,73 s avant d'être
        # prononcés. La voix dit « Racine de 3 au carré » à 5,12 s et « plus 4 au carré »
        # à 6,25 s, alors que la figure arrive à 3,75 s. C'est le piège n° 6 des entiers
        # dans sa forme « étiquette de figure ».
        self.play(Create(tri[0]), Create(tri[1]), Create(tri[3]), run_time=0.7)
        self.au_fin("Racine de 3 au carré")
        self.play(FadeIn(e3, scale=1.2), run_time=0.3)
        self.au_fin("plus 4 au carré")
        self.play(FadeIn(e4, scale=1.2), run_time=0.3)
        # ⛔⛔ 2,05 ET NON 2,25 : ce bloc fait TROIS lignes dont une porte un RADICAL,
        # donc il est plus haut qu'un bloc de texte de la même police — et le titre de
        # cet écran descend près de 2,80. C'est le défaut payé sur l'écran 02 de E7
        # (deux centièmes), que la mesure compare maintenant explicitement.
        b1 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.racine("3² + 4²", fs, C_PIEGE),
                                    self.t("ne fait PAS", fs, C_PIEGE),
                                    self.t("3 + 4 = 7", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.05)
        # ⛔ LA TROISIÈME LIGNE A SON PROPRE INSTANT : « 3 + 4 = 7 » porte un 7 que la
        # voix ne dit qu'à 9,00 s (« c'est-à-dire 7 »), alors que « ne fait pas 3 plus 4 »
        # finit à 7,72 s — 1,28 s d'avance au premier dry run.
        self.au_fin("ne fait pas 3 plus 4")
        self.play(FadeIn(b1[0], shift=RIGHT * 0.12),
                  FadeIn(b1[1][0:2], shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("c'est-à-dire 7")
        self.play(FadeIn(b1[1][2:], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("elle fait racine de 25, c'est-à-dire 5")
        b2 = self.col(VGroup(self.coche(VERT_OK, 0.14),
                             VGroup(VGroup(self.t("elle fait", fs, VERT_OK),
                                           self.racine(25, fs, VERT_OK))
                                    .arrange(RIGHT, buff=0.12, aligned_edge=DOWN),
                                    self.t("c'est-à-dire 5", fs, VERT_OK))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 0.55)
        self.play(Create(tri[2]), FadeIn(e5), FadeIn(b2, shift=RIGHT * 0.12), run_time=0.7)

        # ── la valeur exacte, sous le triangle ────────────────────────────
        # ⚠️ xmax = 1,9 : la colonne de droite est encore occupée à cette hauteur-là.
        self.au_fin("Racine de 14 est une réponse")
        ex = VGroup(VGroup(self.racine(14, 28, VERT_OK),
                           self.t("est une réponse ;", 28, VERT_OK))
                    .arrange(RIGHT, buff=0.12, aligned_edge=DOWN),
                    self.lettres(self.t(f"{self.nombre(round(14 ** 0.5, 2))} "
                                        "est un arrondi", 28, C_PIEGE)))
        ex.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        cadex = SurroundingRectangle(ex, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(ex, cadex), -1.35, xmax=1.9)
        self.play(FadeIn(ex[0], shift=RIGHT * 0.12), Create(cadex), run_time=0.6)
        self.au_fin("3 virgule 74 est un arrondi")
        self.play(FadeIn(ex[1], shift=RIGHT * 0.12), run_time=0.5)

        # ⛔⛔ L'ORDRE EST CELUI DE LA VOIX, PAS CELUI DE L'ÉCRAN, ET C'EST
        # `verifier-avant-rendu.py` QUI L'A DIT : la conclusion « au bac, la valeur
        # exacte » est dite à 25,88 s et « une norme est toujours positive ou nulle » à
        # 29,24 s. Écrite dans l'ordre de la page — le bloc de droite d'abord, la
        # conclusion du bas ensuite — elle serait arrivée **3,36 s en retard**. C'est le
        # défaut de l'écran 03 de E8 (9,07 s), et il tombe ici sur une conclusion de bac.
        # ⭐ La CONCLUSION va à gauche, en bas, en grand (défaut n° 4 de E3) — mais elle
        # PARAÎT avant le dernier bloc de la colonne de droite.
        # ⛔ DEUX LIGNES, MESURÉ : d'un seul tenant cette phrase fait 12,88 de large pour
        # les 11,10 offerts à gauche, donc `gauche()` la rétrécissait.
        self.au_mot("si l'énoncé demande un arrondi")
        fin = VGroup(self.t("au bac : la VALEUR EXACTE —", 26, C_REGARD),
                     self.t("l'arrondi seulement si on le demande", 26, C_REGARD))
        fin.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(fin, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.95, xmax=4.6)
        self.play(FadeIn(fin, scale=1.04), Create(cad), run_time=0.7)
        self.au_mot("une norme est toujours positive ou nulle")
        b3 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.t("une norme n'est", fs, C_PIEGE),
                                    self.t("JAMAIS négative", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), -1.05)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.55)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : C) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ AUCUNE figure : deux points l'un au-dessus de l'autre, dessinés, donneraient
        # la réponse avant la question.
        fs = 30
        # ⚠️ Cartes de 6,3 à partir de x = 0,35 : le choix B fait 54 caractères que la
        # voix dit mot pour mot, et une carte de 4,1 le ramènerait à ~15 px (défaut n° 4
        # de l'épisode 1). La donnée de gauche s'arrête donc avant x = 0,15 (xmax = −0,1).
        lA = self.pt_nomme("A", A07, C_REGARD, fs)
        lB = self.pt_nomme("B", B07, C_REGARD, fs)
        # ⚠️ Le troisième nombre de A est un ZÉRO que la voix dit EN TOUTES LETTRES
        # (« 2, 1, zéro ») : lui seul sort de l'audit, pas la ligne entière — sinon on
        # perdrait le contrôle sur le 2 et le 1.
        self.lettres(lA.nb[2])
        don = VGroup(lA, lB).arrange(DOWN, aligned_edge=LEFT, buff=0.30)
        self.gauche(don, 1.70, xmax=-0.1)
        # ⛔ LA CARTE A PORTE UN RADICAL ET LA CARTE C UN NOMBRE : toutes deux ont besoin
        # de `.nb`, sinon leur nombre est à l'écran avant d'être prononcé (carte B de
        # l'épisode 8, 1,05 s). ⭐ `racine()` pose `.nb` tout seul.
        # ⛔ LA CARTE B, ELLE, EST UNE PHRASE : on ne la retarde PAS, l'élève doit
        # pouvoir la LIRE pendant qu'il l'entend (règle de `q_montrer_choix`).
        cA = self.racine(5, 30, WHITE)
        # ⛔⛔ TROIS LIGNES POUR LA CARTE B, ET C'EST UNE MESURE : sur deux lignes,
        # « 0, puisque les deux premières » (29 caractères) tombe à **21,4 px** — une
        # carte de 6,3 n'offre que 5,15 à son texte. C'est le défaut n° 4 de l'épisode 1,
        # et le remède est celui de l'épisode 6 : UNE SEULE des trois cartes sur trois
        # lignes, jamais les trois (ajouter une ligne aux trois les rapetisse toutes).
        # ⚠️ Les deux autres sont un radical et un chiffre : leur hauteur ne bouge pas.
        # ⚠️ 26 ET NON 28, MESURÉ : à 28 comme à 27, « premières coordonnées » sature
        # la carte et retombe à 26,5-26,7 px — deux cartes de tailles inégales. À 26,
        # on obtient 25,8, c'est-à-dire la police demandée moins les 0,8 % que `col()`
        # retire au bloc entier (il déborde de 0,05 du bord de 6,60). Même chiffre
        # qu'à l'écran 07 de l'épisode 8.
        cB = self.lettres(self.choix3("0, puisque les deux", "premières coordonnées",
                                      "sont égales", fs=26))
        cC = self.t(str(int(norme2(AB07) ** 0.5)), 32, WHITE)
        cC.nb = [cC]
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.t("Que vaut la distance AB ?", 32))],
            [cA, cB, cC], largeur=6.3, xl=0.35)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_fin("A a pour coordonnées 2, 1, zéro")
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("B a pour coordonnées 2, 1, 5")
        self.play(FadeIn(lB, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Que vaut la distance A B")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "C")
        self.mem_q2 = (cartes, pause, rebours)

    def ecran_reponse2(self):
        cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        # ⭐⭐ DEUX LARGEURS, parce que les cartes ne descendent que jusqu'à un certain
        # point : les premiers blocs les LONGENT (xmax = −0,1), les derniers passent
        # DESSOUS et prennent toute la largeur jusqu'à Ti-Margo (xmax = 4,6).
        fs = 28
        self.au_fin("Le vecteur A B a pour coordonnées zéro, zéro, 5")
        lAB = self.nomme("A B", AB07, C_VECTEUR, fs)
        # ⚠️ Les deux zéros sont dits EN TOUTES LETTRES par la voix (« zéro, zéro, 5 ») :
        # eux seuls sortent de l'audit.
        self.lettres(lAB.nb[0])
        self.lettres(lAB.nb[1])
        self.gauche(lAB, 0.45, xmax=-0.1)
        self.play(FadeIn(lAB, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Sa norme : racine de zéro plus zéro plus 25")
        norme = VGroup(self.sans_audit(self.vexpr("‖A B‖ =", ("A B",), fs, GREY_A)),
                       self.lettres(self.racine("0 + 0 + 25", fs, WHITE)))
        norme.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        self.gauche(norme, -0.35, xmax=-0.1)
        self.play(FadeIn(norme, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("c'est-à-dire racine de 25, donc 5")
        don = VGroup(self.racine(norme2(AB07), 32, VERT_OK),
                     self.t(f"= {int(norme2(AB07) ** 0.5)}", 32, VERT_OK))
        don.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        cadd = SurroundingRectangle(don, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(don, cadd), -1.30, xmax=-0.1)
        self.play(FadeIn(don, scale=1.05), Create(cadd), run_time=0.6)
        # ⚠️ PAS DE `au_mot` ICI, ET C'EST MESURÉ : la voix ne laisse que **0,34 s** entre
        # « racine de 25, donc 5 » et « A et B sont l'un au-dessus de l'autre », soit
        # moins que le seuil de 0,6 s du contrôle. Le remède du piège n° 6 des entiers
        # est de NE PAS poser d'ancre et d'enchaîner : le `play` précédent dure 0,6 s et
        # cale la ligne tout seul. Une ancre ici produirait un RETARD.
        l1 = VGroup(self.coche(VERT_OK, 0.14),
                    self.lettres(self.t("A et B sont l'un au-dessus de l'autre, "
                                        "à 5 unités", 26, VERT_OK)))
        l1.arrange(RIGHT, buff=0.20)
        self.gauche(l1, -2.25, xmax=4.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔ DEUX LIGNES, parce que la phrase fait 76 caractères : d'un seul tenant elle
        # dépasse les 11,10 offerts à gauche et `gauche()` la rétrécirait — et c'est la
        # phrase qui explique le leurre.
        self.au_mot("ce sont les deux premières coordonnées du vecteur qui sont nulles")
        l2 = VGroup(self.croix(r=0.12),
                    VGroup(self.sans_audit(self.vexpr(
                        "ce sont les coordonnées du vecteur A B qui sont nulles,",
                        ("A B",), 26, C_PIEGE)),
                        self.t("pas la distance", 26, C_PIEGE))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l2.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(l2, -3.10, xmax=4.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 08 : les TROIS lignes de la copie ──────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, trois lignes")
        titre = self.t("Trois lignes, toujours dans cet ordre", 42, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️ hauteur 2,8 et centre −0,35 : la copie descend à −1,75, au-dessus du rappel
        # posé dessous, qui s'arrête vers −3,20 (marge : −3,573).
        copie = RoundedRectangle(width=10.2, height=2.8, corner_radius=0.18,
                                 stroke_color=GREY_B, stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.6, -0.35))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        # ⛔ 26 ET DES LIGNES COURTES, ET C'EST UNE MESURE : sur E7 puis E8, un modèle de
        # rédaction trop large a été ramené à 19,8 px par `scale_to_fit_width` — LE
        # MODÈLE DE RÉDACTION devenu le plus petit texte de l'épisode. La copie offre
        # 8,60 ; la mesure vérifie qu'aucune ligne n'est réduite.
        fs = 26
        rangs, extraits = [], []
        lignes_copie = (
            (("A B (… ; … ; …) : arrivée moins départ", ("A B",)), C_VECTEUR,
             "Un : les coordonnées du vecteur, arrivée moins départ"),
            ((None, None), WHITE, "Deux : la somme des trois carrés, écrite"),
            (("la racine, en VALEUR EXACTE", None), VERT_OK,
             "Trois : la racine, en valeur exacte"),
        )
        for k, (txt, coul, extrait) in enumerate(lignes_copie, start=1):
            if txt[0] is None:
                # ⭐ La deuxième ligne porte un RADICAL : elle se monte en morceaux, et
                # `aligned_edge=DOWN` garde les lignes de base alignées.
                corps = VGroup(self.t("la somme des trois carrés :", fs, coul),
                               self.sans_audit(self.t("x² + y² + z²", fs, coul)))
                corps.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
            elif txt[1]:
                corps = self.sans_audit(self.vexpr(txt[0], txt[1], fs, coul))
            else:
                corps = self.sans_audit(self.t(txt[0], fs, coul))
            rangs.append(VGroup(self.pastille(k), corps).arrange(RIGHT, buff=0.30))
            extraits.append(extrait)
        lignes = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.26)
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
        # ⭐ La PHRASE finale est ce qu'on oublie quand l'énoncé parle de distance : elle
        # est sous la copie, encadrée, et la voix la dit en dernier.
        self.au_mot("Et si l'énoncé parle de distance, finis par une phrase")
        rappel = VGroup(self.t("et si l'énoncé parle de distance, finis par une phrase :",
                               26, C_REGARD),
                        self.sans_audit(self.t("« la distance AB vaut … »", 26, C_REGARD)))
        rappel.arrange(DOWN, buff=0.10)
        cad = SurroundingRectangle(rappel, color=C_REGARD, buff=0.14, stroke_width=3)
        VGroup(rappel, cad).next_to(copie, DOWN, buff=0.26)
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
        # ⛔ LE DESSIN PORTE LA DONNÉE, JAMAIS LA RÉPONSE : le cube, son repère et les
        # deux sommets concernés, oui ; les segments [A C] et [A G], NON — ce sont eux
        # que l'élève doit reconnaître.
        # ⚠️ Repère MESURÉ : o = (−5,90 ; 0,20), u = 1,4.
        # ⛔⛔ DEUX NOMS DE SOMMET SONT ÉCARTÉS, ET LES DEUX COTES VIENNENT DE LA MESURE
        # (`loin_des_fleches`, le contrôle neuf de cet épisode) : le fût de la grande
        # diagonale A G passe à **0,00** de « D » et à **0,10** de « F ». Dans cette
        # cavalière, A G se projette sur (1,41 ; 1,287) et frôle littéralement le
        # projeté de D (0,41 ; 0,287) et celui de F (1 ; 1) — les deux noms étaient
        # traversés par la flèche. ⚠️ Rien d'autre ne le voit : `etiquettes()` compare
        # les boîtes entre elles, le dry run ne regarde que les bords du cadre, et à la
        # planche un trait qui coupe une lettre se lit comme un trait.
        r, cube = self.cube_repere(
            o=(-5.90, 0.20), u=1.4, rouges=("C", "G"),
            # ⭐ Les deux positions GAGNANTES de la recherche en grille : « D » en haut à
            # gauche de son sommet (0,14 de tout segment tracé, 0,77 du nom le plus
            # proche), « F » en bas à droite (0,17 et 0,55).
            ecarte={"D": np.array([-0.30, 0.30, 0.0]),
                    "F": np.array([0.30, -0.30, 0.0])})
        self.au_mot("Dans le cube A B C D E F G H d'arête 1")
        self.play(FadeIn(cube), run_time=0.7)
        self.au_mot("avec le repère A, A B, A D, A E")
        base = self.sans_audit(self.base_repere(r))
        self.play(*[GrowArrow(v[0]) for v in base], run_time=0.7)
        # ⛔⛔ LA CONSIGNE VA À GAUCHE, SOUS LE CUBE : dans la colonne de droite elle fait
        # plus de 6 de large pour 4,40 offerts, donc `col()` la rétrécirait — c'est-à-dire
        # que ce que l'élève doit LIRE pendant qu'il met pause deviendrait le plus petit
        # texte de la vidéo (défaut payé sur l'épisode 6).
        # ⛔ « la longueur A C » : PAS de flèche. Une longueur est un NOMBRE, et c'est la
        # distinction que tout l'épisode enseigne (voir la table de l'audit des flèches).
        self.au_mot("calcule la longueur A C, puis la longueur A G")
        cons = VGroup(self.lettres(self.t("dans le cube d'arête 1 :", 26, GREY_A)),
                      self.sans_audit(self.t("calcule la longueur AC,", 32, WHITE)),
                      self.sans_audit(self.t("puis la longueur AG", 32, WHITE)))
        cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(cons, -1.75, xmax=4.6)
        self.play(FadeIn(cons, shift=RIGHT * 0.12), run_time=0.6)
        # ⚠️ Le compte à rebours est posé À CÔTÉ de la pause et non dessous : à cette
        # hauteur-là, dessous, il sortirait du cadre.
        self.au_mot("Mets pause, et cherche")
        pause = self.gauche(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -3.10,
                            xmax=4.6)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(pause, RIGHT, buff=0.35)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, cube, base, cons, pause, rebours)

    def ecran_correction(self):
        r, cube, base, cons, pause, rebours = self.mem_defi
        # ⛔ L'écran de correction HÉRITE de l'écran de défi, et l'héritage descend plus
        # bas qu'on ne croit (payé sur E3, E5, E7 PUIS E8). Ce qui s'efface : la consigne,
        # la pause, le rebours — ET les trois flèches du repère, parce que A B part de A
        # comme A C : laissées en place, la diagonale de la correction se superposerait à
        # la flèche de la base, et on lirait une arête doublée.
        # Ce qui RESTE : le cube seul, avec C et G en ambre.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), FadeOut(base),
                  run_time=0.3)
        self.dire("09b-correction")
        fs = 26
        # ── ① le point C, et le vecteur A C ───────────────────────────────
        self.au_fin("Le point C a pour coordonnées 1, 1, zéro")
        lC = self.pt_nomme("C", S["C"], C_REGARD, 28)
        # ⚠️ Le zéro est dit EN TOUTES LETTRES par la voix : lui seul sort de l'audit.
        self.lettres(lC.nb[2])
        self.col(lC, 2.20)
        self.play(FadeIn(lC, shift=RIGHT * 0.12), run_time=0.45)
        # ⛔⛔ LES DEUX DIAGONALES N'ONT PAS D'ÉTIQUETTE SUR LA FIGURE, ET C'EST MESURÉ :
        # elles partent du MÊME sommet A et ne sont séparées que de 31° à l'écran, donc
        # leurs noms se gênent (`etiquettes()` les compare deux à deux, et contre les
        # huit noms de sommet du cube). ⭐ C'est la COULEUR qui relie la figure à la
        # colonne de droite — bleu pour A C, ambre pour A G — exactement comme l'écran
        # 09b de l'épisode 8.
        self.au_fin("donc le vecteur A C aussi")
        fAC = r.vecteur(S["A"], S["C"], None, couleur=C_VECTEUR, sw=7)
        lAC = self.col(self.nomme("A C", AC, C_VECTEUR, 28), 1.40)
        self.lettres(lAC.nb[2])
        self.play(GrowArrow(fAC[0]), FadeIn(lAC, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔ « c'est-à-dire 2 » ET NON « La somme des carrés fait 1 plus 1 plus zéro » :
        # la ligne affichée est « 1 + 1 + 0 = 2 », et son TOTAL n'est dit qu'après
        # l'extrait. Une ligne qui finit par un nombre se pose à l'instant de CE nombre
        # (piège n° 6 des entiers) — l'extrait doit donc contenir le total, pas s'arrêter
        # juste avant. Le dry run le voyait en `AUDIT-TARD` de 3,71 s, pas en avance.
        self.au_fin("c'est-à-dire 2")
        sAC = self.col(self.lettres(self.somme_carres(AC, fs, WHITE)), 0.60)
        self.play(FadeIn(sAC, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("la longueur A C vaut racine de 2")
        rAC = VGroup(self.sans_audit(self.t("AC =", 30, VERT_OK)),
                     self.racine(norme2(AC), 30, VERT_OK))
        rAC.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        self.col(rAC, -0.15)
        self.play(FadeIn(rAC, shift=RIGHT * 0.12), run_time=0.55)
        # ⚠️ PAS DE `au_mot` : la voix ne laisse que 0,45 s entre « la longueur A C vaut
        # racine de 2 » et « environ 1 virgule 41 » — on enchaîne (même raison qu'à
        # l'écran 07b).
        apx1 = self.col(self.env(round(norme2(AC) ** 0.5, 2), 26, GREY_A), -0.75)
        self.play(FadeIn(apx1), run_time=0.35)

        # ── ② le point G, la grande diagonale ─────────────────────────────
        self.au_fin("Le point G a pour coordonnées 1, 1, 1")
        lG = self.col(self.pt_nomme("G", S["G"], C_REGARD, 28), -1.45)
        self.play(FadeIn(lG, shift=RIGHT * 0.12), run_time=0.45)
        # ⭐ [C G] MIS EN COULEUR, ET SÛREMENT PAS EN POINTILLÉ : vu sur la planche des
        # figures seules, un `DashedLine` de C à G était INVISIBLE — [C G] EST une arête
        # du cube, déjà tracée en blanc plein, et le pointillé se posait dessus. ⛔ Un
        # objet construit, bien placé, et qu'on ne voit pas : c'est le défaut de l'écran
        # 07b de E6 sous une forme neuve (il était joué, et recouvert). Un trait rose
        # plein par-dessus l'arête, lui, se voit.
        # ⭐ Et il porte la leçon : A C G est rectangle EN C (assertion plus haut), donc
        # A G² = A C² + C G² = 2 + 1. Le petit carré d'angle est une CONVENTION — en
        # cavalière un angle droit ne l'est pas à l'écran — et c'est la même convention
        # que `Repere3D.angle_droit` emploie dans les huit épisodes précédents.
        self.au_fin("la somme des carrés fait 3")
        cg = Line(r.pt(*S["C"]), r.pt(*S["G"])).set_stroke(C_VECTEUR2, 8)
        droit = self.sans_audit(r.angle_droit(S["C"], S["A"], S["G"], taille=0.22,
                                              couleur=VERT_OK, sw=3))
        fAG = r.vecteur(S["A"], S["G"], None, couleur=C_REGARD, sw=7)
        sAG = self.col(self.somme_carres(AG, fs, WHITE), -2.10)
        self.play(Create(cg), Create(droit), GrowArrow(fAG[0]),
                  FadeIn(sAG, shift=RIGHT * 0.12), run_time=0.7)
        # ⚠️ xmax = 1,9 : la colonne de droite descend sous −2,2, donc un bloc posé
        # jusqu'à 4,6 s'écrirait DESSUS (défaut n° 1 de l'épisode 3, sixième récidive).
        self.au_fin("la longueur A G vaut racine de 3")
        rAG = VGroup(self.sans_audit(self.t("AG =", 32, VERT_OK)),
                     self.racine(norme2(AG), 32, VERT_OK),
                     self.env(round(norme2(AG) ** 0.5, 2), 26, GREY_A))
        rAG.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        cadg = SurroundingRectangle(rAG, color=VERT_OK, buff=0.14, stroke_width=3)
        # ⛔⛔ −1,30 ET NON −1,70, ET C'EST LA MESURE QUI L'A IMPOSÉ : sous cet encadré il
        # reste DEUX blocs (le « retiens » de deux lignes et la conclusion encadrée), et
        # à −1,70 ils ne tenaient pas — la conclusion sortait de la marge de 3 % et
        # s'écrivait sur le « retiens ». La place entre le bas du cube (−0,18) et la
        # marge (−3,573) se compte du HAUT vers le bas, bloc par bloc, pas à vue.
        self.gauche(VGroup(rAG, cadg), -1.05, xmax=1.9)
        self.play(FadeIn(rAG, scale=1.04), Create(cadg), run_time=0.7)

        # ── ③ ce qu'il faut retenir, à gauche sous le cube ────────────────
        # ⛔⛔ TROIS LIGNES ET TROIS INSTANTS, ET UN `AUDIT-TARD` DE 13,28 s LE CACHAIT :
        # « Retiens ces deux résultats par cœur » finit à 28,25 s, mais « la diagonale
        # d'une face vaut racine de 2 » n'est dit qu'à 32,54 s et « la grande diagonale
        # vaut racine de 3 » à 35,04 s. Un bloc de deux lignes posé au premier instant
        # mettait donc √2 à l'écran **4,3 s** trop tôt et √3 **6,8 s** trop tôt.
        # ⭐ Le remède donne aussi un meilleur écran : l'annonce, puis chaque résultat
        # quand il est dit.
        ret = VGroup(self.lettres(self.t("dans un cube d'arête 1 :", fs, C_REGARD)),
                     VGroup(self.t("la diagonale d'une face vaut", fs, C_REGARD),
                            self.racine(norme2(AC), fs, C_REGARD))
                     .arrange(RIGHT, buff=0.12, aligned_edge=DOWN),
                     VGroup(self.t("et la grande diagonale vaut", fs, C_REGARD),
                            self.racine(norme2(AG), fs, C_REGARD))
                     .arrange(RIGHT, buff=0.12, aligned_edge=DOWN))
        ret.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(ret, -2.15, xmax=4.6)
        self.au_mot("Retiens ces deux résultats par cœur")
        self.play(FadeIn(ret[0], shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("la diagonale d'une face vaut racine de 2")
        self.play(FadeIn(ret[1], shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("la grande diagonale vaut racine de 3")
        self.play(FadeIn(ret[2], shift=RIGHT * 0.12), run_time=0.45)
        # ⛔ MÊME DÉFAUT, MÊME REMÈDE : « il suffit de multiplier » finit à 38,64 s, mais
        # « a racine de 2 » est dit à 40,45 s et « et a racine de 3 » à 41,79 s. Le cadre
        # paraît avec l'annonce et se remplit au rythme de la voix.
        fin = VGroup(self.t("si l'arête mesure a :", 28, VERT_OK),
                     self.racine(norme2(AC), 28, VERT_OK, coef="a"),
                     self.t("et", 28, VERT_OK),
                     self.racine(norme2(AG), 28, VERT_OK, coef="a"))
        fin.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -3.20, xmax=4.6)
        self.au_mot("Et si l'arête mesure a, il suffit de multiplier")
        self.play(FadeIn(fin[0], scale=1.05), Create(cad), run_time=0.6)
        self.au_fin("a racine de 2")
        self.play(FadeIn(fin[1], shift=UP * 0.1), run_time=0.4)
        self.au_fin("et a racine de 3")
        self.play(FadeIn(fin[2:], shift=UP * 0.1), run_time=0.4)
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
        # rien ne le dise. ⚠️ Et deux de ces rangées portent un RADICAL, donc elles sont
        # plus hautes qu'un texte simple : la mesure est à relire après tout changement.
        fs = 26
        faits = (("la norme :", C_REGARD, "la racine de la somme des trois carrés", None,
                  "La norme, c'est la racine de la somme des trois carrés"),
                 ("la distance :", C_VECTEUR, "la norme du vecteur A B", ("A B",),
                  "c'est la norme du vecteur A B"),
                 ("la racine :", C_PIEGE, "elle ne se distribue JAMAIS", None,
                  "La racine ne se distribue jamais"),
                 ("le cube d'arête 1 :", VERT_OK, None, None,
                  "Et dans le cube d'arête 1"))
        # ⛔⛔ LA DERNIÈRE RANGÉE PORTE DEUX RADICAUX, ET LA VOIX LES DIT L'UN APRÈS
        # L'AUTRE : « Et dans le cube d'arête 1 » finit à 14,49 s, « racine de 2 pour la
        # diagonale d'une face » à 16,92 s et « racine de 3 pour la grande diagonale » à
        # 19,36 s. Jouée d'un bloc, elle mettait √2 1,90 s et √3 **4,67 s** en avance
        # (dry run). ⭐ Chaque morceau a donc son instant — et la FINALE est l'écran que
        # l'élève relit le plus.
        suites = {3: (("racine de 2 pour la diagonale d'une face", slice(0, 2)),
                      ("racine de 3 pour la grande diagonale", slice(2, 4)))}
        blocs = []
        for g, cg, d, dn, _ in faits:
            if d is None:
                # ⭐ La dernière rangée se monte en morceaux : elle porte DEUX radicaux.
                # ⛔ « (une face) » ET NON « pour une face », ET C'EST UNE MESURE : avec
                # les deux « pour », cette rangée fait 10,97 pour un plafond de 10,60,
                # donc les QUATRE rangées de la FINALE — l'écran que l'élève relit —
                # étaient réduites de 3,4 % sans que rien ne le dise. Avec les
                # parenthèses : 9,55. (Même défaut que la finale de E7, réduite de 27 %.)
                droite_ = VGroup(self.racine(norme2(AC), fs, WHITE),
                                 self.t("(une face),", fs, WHITE),
                                 self.racine(norme2(AG), fs, WHITE),
                                 self.t("(la grande)", fs, WHITE))
                droite_.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
            elif dn:
                droite_ = self.sans_audit(self.vexpr(d, dn, fs, WHITE))
            else:
                droite_ = self.t(d, fs, WHITE)
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
            if i in suites:
                for ex, tranche in suites[i]:
                    self.au_fin(ex)
                    self.play(FadeIn(blocs[i][1][tranche], shift=RIGHT * 0.2),
                              run_time=0.30)
            else:
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


class PsEspaceNormeDistanceTerminale(PsEspaceNormeDistanceBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
