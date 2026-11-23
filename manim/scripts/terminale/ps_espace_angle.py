# ps_espace_angle.py
# EleveAI — Maths Tle spé — paysage « Calculer un angle dans l'espace » (16:9),
# ceinture VERTE. Micro du coach : ps_espace_angle (notion produit_scalaire_espace).
# Épisode 10 sur 12, et le QUATRIÈME des six du produit scalaire.
# Centre : nature-ecologie (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, les trois calculs, et « le signe donne la réponse avant » ;
#   · 01-situation  : Ravi pose des panneaux solaires à Saint-Pierre — l'angle fait le
#                     rendement : face au soleil à plein, 30° un peu moins, 90° rien ;
#   · 02-idee       : la seconde formule, le cosinus isolé, et l'exemple à 45° ;
#   · 03-theoreme   : trois calculs + arccos — et le SIGNE qui tranche aigu/droit/obtus ;
#   · 04/04b        : question-pause n° 1 (u⃗ · v⃗ = −6 → réponse C, obtus) ;
#   · 05-appliquer  : u⃗(1;1;0), v⃗(0;1;1) → cos = 1/2, donc 60° sans calculatrice ;
#   · 06-piege      : le produit et non la somme · |cos| ≤ 1 · vecteurs ≠ droites ;
#   · 07/07b        : question-pause n° 2 (cos = 1,25 → réponse B, c'est une erreur) ;
#   · 08-rediger    : la copie — les QUATRE lignes, et l'UNITÉ qui coûte le point ;
#   · 09/09b        : le défi — l'angle de A⃗G et A⃗B dans le cube unité (55°, pas 45°) ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py, les figures dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'OUTIL se fait là-bas, jamais recopiée ici.
# ⭐ Toutes les cotes de ce fichier viennent d'une COMMANDE :
#   `python -X utf8 manim/poste2/mesure-ps-espace-angle.py` (recopié de celui de E9 :
#   blocs rétrécis, réductions PAR UN PLAFOND, colonne de droite comparée au TITRE,
#   étiquettes DEUX À DEUX, et `loin_des_fleches()` — une étiquette contre le FÛT de
#   tout segment tracé).
#
# ⚠️ Bonne réponse : 04 → C, 07 → B (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# ⭐⭐ LA NOTATION VECTORIELLE EST OBLIGATOIRE (décision de Frédéric, 22/11) : tout nom de
#   vecteur écrit à l'écran porte sa flèche — `self.vec` pour un nom seul, `self.vexpr`
#   pour une expression. Contrôle : `python -X utf8 manim/poste2/auditer-fleches-vecteurs.py`.
#   ⛔ Et ici une DROITE s'écrit « (A B) », un PLAN « (BDE) », une LONGUEUR « AB » : sans
#   flèche, et c'est le sujet du piège n° 3 (l'angle de deux VECTEURS n'est pas l'angle
#   de deux DROITES).
#
# ⛔⛔ AUCUNE FIGURE D'ANGLE N'EST DESSINÉE EN CAVALIÈRE, ET C'EST UNE MESURE.
#   La projection de cette série envoie (x, y, z) sur (x + 0,41 y ; z + 0,287 y). Elle ne
#   conserve donc AUCUN angle :
#     · u(1;1;0) se projette à 11,5° de l'axe des x — c'est-à-dire PRESQUE DESSUS, la
#       famille de défauts de E1 (vecteur confondu avec l'axe des y) et de E6 (les trois
#       axes couchés sur les arêtes du cube) ;
#     · l'angle de u(1;1;0) et v(0;1;1), qui vaut 60° dans l'espace, se lit 60,8° à
#       l'écran — par chance, et on ne construit pas un épisode sur une chance ;
#     · l'angle de A⃗G et A⃗B, qui vaut 54,7°, se lit 42,4° : 12,3° de MENSONGE.
#   ⭐ Les figures d'angle sont donc PLANES (`coin()`), comme `pente` et `triangle345` de
#   l'épisode 9 : elles ne prétendent pas montrer OÙ sont les vecteurs, elles montrent
#   CE QU'EST l'angle de deux vecteurs — et leur angle dessiné est le vrai, vérifié par
#   une assertion du module. C'est la règle du `plan_dessine` de l'épisode 8.
#   ⛔ Et dans le cube (écran 09b), l'arc de l'angle est une CONVENTION qui ne porte
#   AUCUNE valeur — exactement comme le petit carré de `angle_droit`, qui n'est pas droit
#   à l'écran non plus. La valeur est dans la colonne de droite, jamais sur la figure.
#   ⚠️ `platitude()` n'a rien à trancher ici : cet épisode ne pose aucun morceau de plan.
#
# ⛔⛔ DEUX FAMILLES DE NOMBRES SONT HORS AUDIT, ET LES DEUX SONT STRUCTURELLES :
#   · `self.lettres(...)` — la voix dit en TOUTES LETTRES ce que l'écran doit écrire en
#     chiffres : « trente degrés », « quatre-vingt-dix degrés », « zéro », « un demi »,
#     « 1 virgule 25 ». À l'écran d'un cours de maths, « 30° » et « 1,25 » sont les
#     seules écritures justes — mais ces chaînes-là n'existent pas dans le texte de la
#     voix, et chacune sortirait en AUDIT-ABSENT ;
#   · `self.env(v)` — « ≈ 0,71 », « ≈ 0,577 » : la voix dit « environ zéro virgule 71 ».
#
# Voix : manim/voix/terminale-ps-espace-angle.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
#   --disable_caching manim/scripts/terminale/ps_espace_angle.py PsEspaceAngleTerminale \
#   --media_dir manim/scripts/terminale/media-ps-espace-angle --dry_run

import math
import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_AXE, C_FANTOME, C_PIEGE, C_POINT, C_REGARD,  # noqa: E402
                      C_VECTEUR, C_VECTEUR2, Repere3D, point3)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import CompteARebours, P, EcransEspace, pastille_pause  # noqa: E402

PEAU, GILET = "#c68642", "#f97316"
PANTALON, BANDE = "#1e293b", "#e2e8f0"
PANNEAU, CADRE_P = "#1e3a8a", "#60a5fa"

# ── les données de l'épisode, écrites UNE fois ─────────────────────────────
U02, V02 = (1, 0, 0), (1, 1, 0)       # 02 : cos = 1/√2 → 45°
PS04 = -6                             # 04 : la question-pause n° 1 → obtus (réponse C)
U05, V05 = (1, 1, 0), (0, 1, 1)       # 05 : cos = 1/2 → 60°
COS07 = 1.25                          # 07 : la question-pause n° 2 → erreur (réponse B)
INCL01 = 30                           # 01 : le panneau incliné de trente degrés
# ⛔⛔ LA PLACE DE RAVI EST ÉCRITE UNE SEULE FOIS, ET LA MESURE L'IMPORTE.
# Elle était recopiée dans `mesure-ps-espace-angle.py` : corrigée d'un côté
# (0,35 → 0,85, pour que « Saint-Pierre » cesse de tomber sur le cadre de
# conclusion) et pas de l'autre, l'instrument a mesuré pendant un tour un écran
# QUI N'EXISTAIT PAS, et il a crié sur un défaut déjà corrigé. C'est la même
# forme que « la fiche et le registre ont divergé » du même jour : deux copies
# d'une seule vérité divergent dès qu'on en touche une.
POS_RAVI, ECH_RAVI = (-5.72, 0.85), 0.66
# ⭐ Le cube de 9 épisodes sur 12, dans le repère (A ; AB, AD, AE).
S = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
     "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}
AG, AB = S["G"], S["B"]               # 09b : cos = 1/√3 → 54,7°, donc 55°


def ps(u, v):
    return sum(u[i] * v[i] for i in range(3))


def norme2(u):
    return ps(u, u)


def angle(u, v):
    """L'angle des deux vecteurs, en degrés — recalculé, jamais recopié de la voix."""
    return math.degrees(math.acos(ps(u, v) / math.sqrt(norme2(u) * norme2(v))))


# ── la passe maths du script, refaite indépendamment de la voix ────────────
# ⭐ Aucun nombre affiché par cet épisode n'est recopié de la voix : ils sont tous
# recalculés ici, et une erreur de voix se verrait comme un écart entre les deux.
assert ps(U02, V02) == 1 and norme2(U02) == 1 and norme2(V02) == 2       # 02
assert abs(1 / math.sqrt(2) - 0.7071) < 1e-4
assert abs(angle(U02, V02) - 45) < 1e-9                                  # 45° exactement
assert ps(U05, V05) == 1 and norme2(U05) == 2 and norme2(V05) == 2       # 05
assert abs(math.sqrt(norme2(U05)) * math.sqrt(norme2(V05)) - 2) < 1e-9   # √2 × √2 = 2
assert abs(ps(U05, V05) / 2 - 0.5) < 1e-12
assert abs(angle(U05, V05) - 60) < 1e-9                                  # 60° exactement
assert ps(AG, AB) == 1 and norme2(AG) == 3 and norme2(AB) == 1           # 09b
assert abs(1 / math.sqrt(3) - 0.5774) < 1e-4
assert abs(angle(AG, AB) - 54.7356) < 1e-4 and round(angle(AG, AB)) == 55
# ⛔ « ce n'est pas 45 degrés » est le cœur du défi : 45° voudrait cos = 0,707.
assert abs(math.cos(math.radians(45)) - 0.7071) < 1e-4
assert abs(math.cos(math.radians(45)) - 1 / math.sqrt(3)) > 0.12
# ⭐ Le signe du produit scalaire donne la nature de l'angle, parce que les deux normes
# sont strictement positives : vérifié sur des vecteurs quelconques, pas cru sur parole.
for u, v in (((1, 2, 3), (2, 1, 0)), ((1, 0, 0), (0, 1, 0)), ((1, 1, 1), (-2, -1, -3))):
    c = ps(u, v) / math.sqrt(norme2(u) * norme2(v))
    assert (ps(u, v) > 0) == (angle(u, v) < 90 - 1e-9)
    assert (ps(u, v) == 0) == (abs(angle(u, v) - 90) < 1e-9)
    assert (ps(u, v) < 0) == (angle(u, v) > 90 + 1e-9)
    assert abs(c) <= 1 + 1e-12                                   # Cauchy-Schwarz : 06
# ⭐ 06 : retourner un vecteur change le signe et donne l'angle SUPPLÉMENTAIRE.
for u, v in (((1, 2, 3), (2, 1, 0)), (U05, V05)):
    oppose = tuple(-x for x in v)
    assert ps(u, oppose) == -ps(u, v)
    assert abs(angle(u, oppose) - (180 - angle(u, v))) < 1e-9
    # … et la VALEUR ABSOLUE du cosinus, elle, ne bouge pas : c'est l'angle des DROITES,
    # et il est dans [0° ; 90°].
    c1 = abs(ps(u, v)) / math.sqrt(norme2(u) * norme2(v))
    c2 = abs(ps(u, oppose)) / math.sqrt(norme2(u) * norme2(oppose))
    assert abs(c1 - c2) < 1e-12 and 0 <= math.degrees(math.acos(c1)) <= 90 + 1e-9
# ⛔⛔ CE QUE LA CAVALIÈRE FERAIT DE CES ANGLES — mesuré, et c'est pourquoi les figures
# d'angle de cet épisode sont PLANES (voir l'en-tête).
def _apparent(u, v):
    a, b = (point3((0, 0, 0), 1.0, *u))[:2], (point3((0, 0, 0), 1.0, *v))[:2]
    return abs(math.degrees(math.atan2(b[1], b[0]) - math.atan2(a[1], a[0])))


assert abs(_apparent((1, 0, 0), U05) - 11.5) < 0.6      # u(1;1;0) frôle l'axe des x
assert abs(_apparent(AB, AG) - 42.4) < 0.6              # 42,4° à l'écran pour 54,7° réels
assert abs(_apparent(AB, AG) - angle(AG, AB)) > 12      # … soit plus de douze degrés


def ravi(s=1.0):
    """RAVI, INSTALLATEUR DE PANNEAUX SOLAIRES, un panneau levé dans la main.

    ⛔ Les règles payées sur les six personnages des épisodes 1 à 9, appliquées ici :
    1. AUCUN trait de visage — aucun personnage de la série n'en a ;
    2. ⛔⛔ RIEN SUR LA TÊTE. Trois épisodes de suite ont perdu un tour sur un
       accessoire de tête : la visière de Jean-Bernard (E4), le casque de Marc (E8), la
       queue de cheval de la coureuse (E9, qui se lisait comme une corne). Un
       installateur SANS casque, c'est le gabarit de la maison — et c'est le PANNEAU
       qu'il tient qui dit son métier, pas un couvre-chef ;
    3. un accessoire n'est jamais de la couleur de ce qu'il touche (piège n° 17 des
       entiers) : le gilet est orange, ses bandes réfléchissantes claires, le pantalon
       sombre, le panneau bleu nuit sur ciel sombre — donc cerclé de bleu clair ;
    4. ⛔⛔ L'ÉPAULE EST FRANCHEMENT DANS LE TORSE, ET LE TORSE EST DESSINÉ PAR-DESSUS.
       C'est la leçon de E9, et ce n'est pas une cote mais un ORDRE : à ±0,33 l'épaule
       était au milieu du buste (défaut n° 1 de E4), et poussée sur le bord même du
       torse elle laissait un TROU NOIR entre le torse et le bras au gros plan ;
    5. ⛔ LES JAMBES : sans elles, le torse se lit comme un buste coupé (Kelly, E7, vu
       seulement au gros plan ×2,8). Debout, les deux pieds au sol, un genou chacune —
       une jambe parfaitement droite se lit comme une béquille.
    ⭐ Le bras GAUCHE est levé et tient le panneau ; le bras droit descend le long du
    corps. Les deux sont pliés au coude, et ils ne sont pas symétriques : c'est leur
    OPPOSITION qui fait un geste et non un haussement d'épaules (leçon de E9)."""
    corps = RoundedRectangle(width=0.86, height=1.02, corner_radius=0.20,
                             fill_color=GILET, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.26))
    # Les deux bandes réfléchissantes du gilet — c'est ce qui dit « chantier ».
    bandes = VGroup(*[Line(P(-0.33, y), P(0.33, y), stroke_width=5, color=BANDE)
                      for y in (0.42, 0.14)])
    pantalon = RoundedRectangle(width=0.70, height=0.34, corner_radius=0.10,
                                fill_color=PANTALON, fill_opacity=1,
                                stroke_width=0).move_to(P(0, -0.36))
    # ⛔ LES DEUX SEGMENTS SONT DU PANTALON, ET C'EST LE GROS PLAN QUI L'A DIT : la
    # cuisse sombre et le mollet couleur PEAU se lisaient comme un short avec des
    # jambes nues — sur un installateur en gilet de chantier. Un vêtement de travail
    # est d'une seule pièce, et la jambe garde ses deux segments pour son genou.
    jambe_g = VGroup(Line(P(-0.17, -0.52), P(-0.22, -0.90), stroke_width=13, color=PANTALON),
                     Line(P(-0.22, -0.90), P(-0.20, -1.24), stroke_width=13, color=PANTALON))
    jambe_d = VGroup(Line(P(0.17, -0.52), P(0.24, -0.90), stroke_width=13, color=PANTALON),
                     Line(P(0.24, -0.90), P(0.22, -1.24), stroke_width=13, color=PANTALON))
    # ⚠️ Épaules à ±0,32 : DANS le torse (demi-largeur 0,43), et le torse passe dessus.
    bras_leve = VGroup(Line(P(-0.32, 0.58), P(-0.70, 0.74), stroke_width=11, color=PEAU),
                       Line(P(-0.70, 0.74), P(-0.86, 1.14), stroke_width=11, color=PEAU))
    # ⛔ LE BRAS BAS DÉPASSE FRANCHEMENT DU TORSE, ET LA PLANCHE L'A DIT : avec un coude
    # à x = 0,60 pour un torse qui va jusqu'à 0,43, il ne dépassait que de 0,17 et on
    # lisait un moignon. Il va maintenant à 0,74, soit 0,31 au-delà du gilet.
    bras_bas = VGroup(Line(P(0.32, 0.56), P(0.74, 0.22), stroke_width=11, color=PEAU),
                      Line(P(0.74, 0.22), P(0.68, -0.22), stroke_width=11, color=PEAU))
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1,
                  stroke_width=0).move_to(P(-0.02, 1.08))
    # Le panneau qu'il tient : un rectangle bleu nuit cerclé de bleu clair, avec ses
    # cellules. ⚠️ Légèrement incliné, pour qu'on le lise comme un objet tenu.
    pan = VGroup(RoundedRectangle(width=0.86, height=0.54, corner_radius=0.04,
                                  fill_color=PANNEAU, fill_opacity=1,
                                  stroke_color=CADRE_P, stroke_width=3))
    pan.add(*[Line(pan[0].get_corner(UL) + RIGHT * dx + DOWN * 0.03,
                   pan[0].get_corner(DL) + RIGHT * dx + UP * 0.03,
                   stroke_width=2, color=CADRE_P) for dx in (0.29, 0.58)])
    pan.rotate(18 * DEGREES).move_to(P(-1.14, 1.34))
    return VGroup(jambe_g, jambe_d, pantalon, bras_bas, bras_leve, corps, bandes,
                  tete, pan).scale(s)


def soleil(s=1.0, r=0.30):
    """Le soleil et ses rayons — du décor nommé, pas une leçon."""
    disque = Circle(radius=r, fill_color=C_REGARD, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(np.array([math.cos(a) * r * 1.35, math.sin(a) * r * 1.35, 0.0]),
                           np.array([math.cos(a) * r * 2.0, math.sin(a) * r * 2.0, 0.0]),
                           stroke_width=4, color=C_REGARD)
                      for a in np.arange(0, 2 * math.pi, math.pi / 4)])
    return VGroup(disque, rayons).scale(s)


# L'orientation du soleil sur le schéma du panneau : en haut à gauche, en degrés.
VERS_SOLEIL = 118.0


def toit_panneau(ecart_deg, s=1.0, long_pan=1.70, long_fl=1.15, r_arc=0.52):
    """LE PANNEAU, LA DIRECTION DU SOLEIL, SA PERPENDICULAIRE, ET L'ANGLE ENTRE LES DEUX.

    ⭐⭐ SCHÉMA PLAN, et c'est la règle de l'épisode : rien n'y est projeté, donc rien
    n'y ment. L'angle DESSINÉ entre la direction du soleil et la perpendiculaire au
    panneau est exactement `ecart_deg` — vérifié par une assertion du module, comme le
    3-4-5 de l'épisode 9 (qui, lui, était faux de 13 % au premier jet sans que rien ne
    le dise).
    ⚠️ C'est bien l'angle à la PERPENDICULAIRE du panneau qui décide du rendement, pas
    l'angle au panneau lui-même : à zéro, le panneau est face au soleil.

    Rend (panneau, fleche_soleil, perpendiculaire, arc) — QUATRE morceaux, et les quatre
    sont joués (`plan_poteau` de l'épisode 8 en rendait cinq pour quatre `play`)."""
    a_sol = math.radians(VERS_SOLEIL)
    a_perp = math.radians(VERS_SOLEIL - ecart_deg)
    d_perp = np.array([math.cos(a_perp), math.sin(a_perp), 0.0])
    # Le panneau est perpendiculaire à sa normale.
    d_pan = np.array([-d_perp[1], d_perp[0], 0.0])
    pan = Line(-d_pan * long_pan / 2, d_pan * long_pan / 2,
               stroke_width=12, color=PANNEAU)
    bord = Line(-d_pan * long_pan / 2, d_pan * long_pan / 2,
                stroke_width=4, color=CADRE_P)
    panneau = VGroup(pan, bord)
    fl_sol = Arrow(ORIGIN, np.array([math.cos(a_sol), math.sin(a_sol), 0.0]) * long_fl,
                   buff=0, stroke_width=7, color=C_REGARD,
                   max_tip_length_to_length_ratio=0.16)
    perp = Arrow(ORIGIN, d_perp * long_fl * 0.88, buff=0, stroke_width=6,
                 color=C_VECTEUR2, max_tip_length_to_length_ratio=0.17)
    arc = (Arc(radius=r_arc, start_angle=a_perp, angle=math.radians(ecart_deg),
               color=VERT_OK, stroke_width=5) if ecart_deg > 1e-6 else VGroup())
    g = VGroup(panneau, fl_sol, perp, arc)
    g.panneau, g.soleil, g.perp, g.arc = panneau, fl_sol, perp, arc
    g.d_perp, g.d_sol = d_perp, np.array([math.cos(a_sol), math.sin(a_sol), 0.0])
    return g.scale(s)


def ecart(p, signe=1.0, d=0.42):
    """LE DÉCALAGE D'UNE ÉTIQUETTE : PERPENDICULAIRE AU FÛT QU'ELLE NOMME.

    ⛔⛔ Mesuré le 23/11 : posée à `p * 0,80 + UP * 0,16`, l'étiquette « v » restait à
    **0,00** de son propre fût dans les trois figures. La cause n'est pas la distance,
    c'est la DIRECTION : un décalage vertical sur un fût à 45° ne gagne que
    0,16 × cos 45° = 0,11 de distance réelle, et la boîte de l'étiquette est plus large
    que ça. Pour « u », qui est horizontal, le même `DOWN` marchait — d'où le piège :
    une cote qui marche sur un vecteur et pas sur l'autre se lit comme un réglage à
    affiner, alors que c'est la méthode qui est fausse.
    ⭐ `signe` choisit le côté : +1 tourne dans le sens direct, −1 dans l'autre. On met
    l'étiquette du côté où le vecteur ne va PAS, et loin de l'arc."""
    n = np.array([-float(p[1]), float(p[0]), 0.0])
    return signe * d * n / max(1e-9, float(np.linalg.norm(n)))


def coin(deg, r=1.30, sw=7, c1=C_VECTEUR, c2=C_VECTEUR2, r_arc=0.46, c_arc=C_REGARD,
         oppose=False, s=1.0):
    """DEUX VECTEURS ET LEUR ANGLE, DESSINÉS À PLAT — l'angle vu DANS leur plan.

    ⭐⭐ C'est la figure de cet épisode, et elle est PLANE pour la raison écrite en tête
    du fichier : la cavalière de la série ne conserve aucun angle (u(1;1;0) y tombe à
    11,5° de l'axe des x, et l'angle du défi se lit 42° au lieu de 55°). Comme le
    `plan_dessine` de l'épisode 8, cette figure ne prétend pas dire OÙ sont les
    vecteurs : elle dit ce qu'est leur angle, et elle le dit JUSTE.
    ⚠️ L'angle dessiné est vérifié par une assertion du module.

    `oppose=True` ajoute −v⃗ et l'arc du supplémentaire : c'est le piège n° 3 (l'angle de
    deux DROITES), et les deux arcs doivent avoir des RAYONS différents, sinon ils se
    touchent au point de départ commun."""
    th = math.radians(deg)
    p1 = np.array([r, 0.0, 0.0])
    p2 = np.array([r * math.cos(th), r * math.sin(th), 0.0])
    f1 = Arrow(ORIGIN, p1, buff=0, stroke_width=sw, color=c1,
               max_tip_length_to_length_ratio=0.14)
    f2 = Arrow(ORIGIN, p2, buff=0, stroke_width=sw, color=c2,
               max_tip_length_to_length_ratio=0.14)
    arc = Arc(radius=r_arc, start_angle=0, angle=th, color=c_arc, stroke_width=5)
    g = VGroup(f1, f2, arc)
    g.f1, g.f2, g.arc, g.p1, g.p2 = f1, f2, arc, p1, p2
    # ⛔⛔ `g.sommet()` REND LE POINT D'OÙ PARTENT LES DEUX FLÈCHES, et c'est par rapport
    # à LUI qu'on place une étiquette — jamais par rapport à `g.get_center()`, qui est le
    # centre de la BOÎTE du groupe et tombe au milieu du secteur (à ~0,5 ; 0,37 du sommet
    # pour un coin de rayon 1). Mesuré : posées depuis le centre de boîte, « u » tombait
    # à 0,02 de son propre fût. ⚠️ Il se lit APRÈS les `move_to` et les `scale`, sinon il
    # rend la position d'avant — c'est la leçon de `placer` sur le cube de E9 : une cote
    # relative à une autre cote se périme au premier changement de l'une des deux.
    g.sommet = lambda: f1.get_start()
    if oppose:
        f3 = Arrow(ORIGIN, -p2, buff=0, stroke_width=sw - 2, color=c2,
                   max_tip_length_to_length_ratio=0.16).set_opacity(0.55)
        # ⛔⛔ L'ARC DU SUPPLÉMENTAIRE VA DE −v⃗ À u⃗, ET PAS DE v⃗ À LA GAUCHE DE L'ÉCRAN.
        # Vu sur la planche des figures seules : écrit `start_angle=th, angle=π−th`, il
        # partait bien de v⃗ et balayait bien 120°… du côté OPPOSÉ à −v⃗. Il ne touchait
        # donc NI u⃗ NI −v⃗, et il mesurait l'angle de v⃗ avec la demi-droite opposée à u⃗ :
        # la bonne valeur, posée sur le mauvais angle. ⛔ Aucun outil ne pouvait le dire
        # — 120° est 120°, la figure est dans la marge, et l'assertion du module ne
        # portait que sur les FLÈCHES. C'est le défaut « un schéma porte les bons nombres
        # et ment sur sa forme » de E9, dans sa version la plus discrète.
        arc2 = Arc(radius=r_arc * 1.55, start_angle=th + math.pi, angle=math.pi - th,
                   color=C_PIEGE, stroke_width=5)
        g.add(f3, arc2)
        g.f3, g.arc2, g.p3 = f3, arc2, -p2
    return g.scale(s)


# ── les schémas disent-ils vraiment l'angle qu'ils annoncent ? ─────────────
# ⭐⭐ L'ASSERTION QUI MANQUAIT À L'ÉPISODE 9 jusqu'à ce que la planche des figures
# seules montre un « 3-4-5 » faux de 13 %. Un dessin peut être dans la marge, porter les
# bons nombres, et mentir sur ce qu'il montre : aucun audit ne le voit, alors on le
# CALCULE.
def _angle_dessine(f1, f2):
    """L'angle GÉOMÉTRIQUE des deux flèches, dans [0° ; 180°].
    ⚠️ Pas l'angle orienté : −v⃗ est à 240° de u⃗ dans le sens direct, et l'angle qu'on
    lit à l'écran est 120° — c'est-à-dire le supplémentaire de 60°, qui est bien ce que
    l'écran doit montrer."""
    d1, d2 = f1.get_end() - f1.get_start(), f2.get_end() - f2.get_start()
    a = math.degrees(math.atan2(d2[1], d2[0]) - math.atan2(d1[1], d1[0])) % 360
    return min(a, 360 - a)


for _d in (45, 50, 60, 90, 130):
    _c = coin(_d)
    assert abs(_angle_dessine(_c.f1, _c.f2) - _d) < 1e-6, f"coin({_d}) ne fait pas {_d}°"
_c = coin(60, oppose=True)
assert abs(_angle_dessine(_c.f1, _c.f3) - (180 - 60)) < 1e-6, "le supplémentaire est faux"
for _e in (0, INCL01, 90):
    _t = toit_panneau(_e)
    _a = math.degrees(math.acos(min(1.0, float(np.dot(_t.d_perp, _t.d_sol)))))
    assert abs(_a - _e) < 1e-6, f"le panneau à {_e}° n'est pas dessiné à {_e}°"
    # … et le panneau est bien PERPENDICULAIRE à sa normale (sinon la figure dirait le
    # contraire de la légende).
    _dp = _t.panneau[0].get_end() - _t.panneau[0].get_start()
    assert abs(float(np.dot(_dp[:2], _t.d_perp[:2]))) < 1e-9


class PsEspaceAngleBase(EcransEspace):
    fichier_marques = "ps_espace_angle_marques.json"
    nom_voix = "terminale-ps-espace-angle"

    # ── les outils propres à cet épisode ───────────────────────────────────

    def lettres(self, mob):
        """UN TEXTE DONT LA VOIX DIT LES NOMBRES EN TOUTES LETTRES — hors audit, et
        c'est structurel (même mécanisme que le `zero()` de E8 et le `lettres()` de E9).

        Ici : « trente degrés » et « quatre-vingt-dix degrés » (écran 01), « zéro »
        partout, « un demi » (écran 05), « 1 virgule 25 » (écrans 06 et 07). À l'écran
        d'un cours de maths, « 30° » et « 1,25 » sont les seules écritures justes — mais
        ces chaînes n'existent pas dans le texte de la voix, et chacune sortirait en
        AUDIT-ABSENT en noyant le seul signalement qu'on cherche."""
        return self.sans_audit(mob)

    def env(self, v, fs=26, color=GREY_A):
        """« ≈ 0,71 » — hors audit : la voix dit « environ zéro virgule 71 », donc la
        chaîne « 0,71 » n'est nulle part dans son texte. ⭐ Et l'arrondi est écrit à la
        française (virgule), par `self.nombre`."""
        return self.sans_audit(self.t("≈ " + self.nombre(v), fs, color))

    def deg(self, v, fs=28, color=WHITE):
        """« 45° ». ⭐ Celui-là reste DANS l'audit : la voix dit « 45 degrés », donc le
        chiffre existe bien dans son texte, et on veut savoir s'il s'affiche au bon
        moment. ⚠️ Le glyphe ° a été rendu dans une image d'essai avant d'être tapé."""
        return self.t(f"{self.nombre(v)}°", fs, color)

    def nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« u⃗ (1 ; 0 ; 0) » : le nom du VECTEUR avec sa flèche, puis son triplet."""
        g = VGroup(self.vec(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def frac(self, haut, bas, fs=28, color=WHITE):
        """UNE FRACTION — numérateur, BARRE, dénominateur.

        ⭐ Même raison que `racine()` dans le socle : « cos θ = u⃗ · v⃗ / ‖u⃗‖ × ‖v⃗‖ »
        écrit sur une ligne se lit « divisé par ‖u⃗‖, fois ‖v⃗‖ » — c'est-à-dire le
        contraire de ce que la voix dit (« divisé par le PRODUIT des deux normes »), et
        c'est exactement le piège n° 1 de l'écran 06. La barre lève l'ambiguïté.
        ⚠️ Une fraction est BEAUCOUP plus haute qu'un texte de la même police : toute
        cote d'un bloc qui en gagne une se remesure (leçon du radical, E9).
        ⚠️ `g.nb` porte les nombres des DEUX étages : une carte de choix qui porte une
        fraction en a besoin pour ne pas s'afficher avant que la voix l'ait dite."""
        larg = max(float(haut.width), float(bas.width)) + 0.22
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2,
                     stroke_width=max(2.0, fs / 14), color=color)
        g = VGroup(haut, barre, bas).arrange(DOWN, buff=0.12)
        g.nb = (list(getattr(haut, "nb", [haut])) + list(getattr(bas, "nb", [bas])))
        g.haut, g.bas, g.barre = haut, bas, barre
        return g

    def cos_formule(self, fs=28, color=WHITE):
        """« cos θ = (u⃗ · v⃗) / (‖u⃗‖ × ‖v⃗‖) » — LA formule de l'épisode, en fraction."""
        return VGroup(self.t("cos θ =", fs, color),
                      self.frac(self.vexpr("u · v", ("u", "v"), fs, color),
                                self.vexpr("‖u‖ × ‖v‖", ("u", "v"), fs, color),
                                fs, color)).arrange(RIGHT, buff=0.18)

    def cube_repere(self, o, u, rouges=(), fs=24, ecarte=None):
        """LE CUBE UNITÉ ABCDEFGH — ⛔ SANS AXES, et c'est une correction payée à l'image
        sur l'épisode 6 (recopiée ici telle quelle, avec sa raison).

        Dans CE repère-là, les trois axes sont PORTÉS PAR TROIS ARÊTES DU CUBE (A B,
        A D, A E) : dessinés avec `portee=2`, ils se superposent aux arêtes sur leur
        première moitié, et le bout de l'axe des y tombe À L'INTÉRIEUR du solide.
        ⭐ Le repère est DIT, pas tracé : `base_repere` le montre par trois flèches
        posées sur les trois arêtes qui partent de A.
        ⚠️ `u` reste entre 1,25 et 1,6 : à 0,95 les noms des sommets se touchent.

        ⛔⛔ `ecarte` — UN NOM DE SOMMET QU'UNE FLÈCHE TRAVERSE. La grande diagonale
        A⃗G passe à 0,00 du nom « D » et à 0,10 du nom « F » (en cavalière, A G se projette
        sur (1,41 ; 1,287) et frôle le projeté de D comme celui de F). `etiquettes()`
        compare des BOÎTES entre elles : il ne peut pas le voir. C'est `loin_des_fleches()`
        qui le dit — et ⛔ il faut lui passer TOUS les segments tracés : la première
        version de E9 ne connaissait que les deux diagonales, et les deux noms écartés
        pour les fuir se sont posés PILE SUR deux arêtes."""
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
        ⚠️ En GRIS (C_AXE) et non en bleu : dans cet épisode-ci, A⃗B est l'un des deux
        vecteurs du défi et il sera tracé en bleu à la correction. Deux flèches de même
        couleur sur la même arête se liraient comme une seule."""
        return VGroup(*[r.vecteur(S["A"], S[s], None, couleur=couleur, sw=sw)
                        for s in ("B", "D", "E")])

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Calculer un angle", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Calculer un angle dans l'espace")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        fs = 36
        # ⛔ L'ORDRE EST CELUI DE LA VOIX : « Un produit scalaire, deux normes, une
        # division — et le signe te donne la réponse avant le calcul. » Les trois
        # premiers sont une énumération, et chacun a son instant (piège n° 6 des
        # entiers : un bloc qui porte ce que la voix énumère se remplit au rythme de la
        # voix, il ne se pose pas d'un coup).
        promesses = (("un produit scalaire", C_VECTEUR, "Un produit scalaire"),
                     ("deux normes", C_VECTEUR2, "deux normes"),
                     ("une division", C_REGARD, "une division"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, fs, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.40)
        lignes.move_to(P(-0.9, 0.95))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔ UNE SEULE LIGNE, et à −1,55 : `echelle()` alignée en bas occupe y de −3,45 à
        # −1,98 (mesuré sur l'épisode 5, où la note de reprise annonçait −2,6 et avait
        # tort). Une ligne simple à −1,55 descend à −1,75 : elle passe de 0,23.
        fin = self.t("le signe donne la réponse avant le calcul", 30, VERT_OK)
        fin.move_to(P(-0.9, -1.55))
        self.au_mot("le signe te donne la réponse")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : Ravi et les panneaux solaires de Saint-Pierre ─────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        # ⛔⛔ 0,85 ET NON 0,35 : vu au gros plan au second tour, le bord HAUT du cadre
        # de conclusion (y = −1,44) barrait « Saint-Pierre » (bas à −1,57). Le tour
        # précédent avait écarté « Ravi » de « Saint-Pierre » en passant le buff de 0,08
        # à 0,18 — et ce faisant il a poussé « Saint-Pierre » SUR le cadre. ⭐ C'est la
        # leçon de E9 (« fuir une flèche pour tomber sur une arête ») : une correction
        # qui ne connaît qu'une partie de l'écran DÉPLACE le défaut.
        # ⚠️ Et la place est en HAUT : Ravi monte à 1,33 pour une marge à 3,573, et la
        # colonne du panneau commence à x = −4,13, donc il ne la rencontre jamais.
        c = ravi(ECH_RAVI).move_to(P(*POS_RAVI))
        self.au_mot("Voici Ravi")
        nom = self.t("Ravi", 28, JAUNE_TITRE).next_to(c, DOWN, buff=0.22)
        # ⛔ Le garde-fou AVANT le play, et pas après (défaut n° 7 de l'épisode 1, refait
        # sur E4) : un nom centré sous un personnage posé à gauche part hors marge.
        if nom.get_left()[0] < -6.5:
            nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
        # ⚠️ 0,18 ET NON 0,08 : vu au gros plan, le bas de « Ravi » touchait le haut de
        # « Saint-Pierre ». La mesure ne le voyait pas — elle compare la BOÎTE des deux
        # pris ensemble à la marge, pas les deux entre eux.
        lieu = self.t("Saint-Pierre", 24, GREY_A).next_to(nom, DOWN, buff=0.18)
        if lieu.get_left()[0] < -6.5:
            lieu.shift(RIGHT * (-6.5 - lieu.get_left()[0]))
        self.play(FadeIn(c, shift=UP * 0.2), FadeIn(nom), run_time=0.7)
        self.au_mot("Il installe des panneaux solaires")
        self.play(FadeIn(lieu), run_time=0.3)

        # ── le schéma : le soleil, le panneau, et l'angle ──────────────────
        # ⚠️ 0,88 ET NON 1,05 : à 1,05 le bout des rayons du soleil montait à 3,68 pour une
        # marge à 3,573. Mesuré, pas estimé — un soleil est plus haut que sa boîte ne le
        # laisse croire, ses rayons dépassent du disque de 2 fois son rayon.
        tp = toit_panneau(INCL01, 1.0).move_to(P(-2.45, 0.88))
        sol = soleil(1.0).move_to(tp.get_center() + tp.d_sol * 2.30)
        self.au_mot("sur les toits de Saint-Pierre")
        self.play(Create(tp.panneau), FadeIn(sol, scale=0.7), run_time=0.7)

        fs = 28
        # ⛔ Les trois cas dans l'ordre de la voix, chacun à son instant.
        self.au_mot("Un panneau face au soleil")
        b1 = self.col(VGroup(self.coche(VERT_OK, 0.14),
                             VGroup(self.lettres(self.t("face au soleil (0°) :", fs, VERT_OK)),
                                    self.t("à plein", fs, VERT_OK))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.30)
        self.play(GrowArrow(tp.soleil), FadeIn(b1, shift=RIGHT * 0.12), run_time=0.7)
        self.au_mot("Incliné de trente degrés")
        b2 = self.col(VGroup(self.lettres(self.t(f"incliné de {INCL01}° :", fs, C_REGARD)),
                             self.t("il perd un peu", fs, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.85)
        self.play(GrowArrow(tp.perp), Create(tp.arc),
                  FadeIn(b2, shift=RIGHT * 0.12), run_time=0.7)
        self.au_mot("À quatre-vingt-dix degrés")
        b3 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.lettres(self.t("à 90° :", fs, C_PIEGE)),
                                    self.t("plus rien", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.60)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.55)

        # ⭐ La CONCLUSION va à gauche, sous les figures, en grand (défaut n° 4 de E3) :
        # le bas de la colonne de droite est réservé aux lignes COURTES.
        self.au_mot("Ce qui compte")
        fil = VGroup(self.t("ce qui compte, c'est l'ANGLE entre", 26, C_REGARD),
                     self.t("la direction du soleil et celle du panneau", 26, C_REGARD))
        fil.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(fil, color=C_REGARD, buff=0.16, stroke_width=3)
        # ⛔ On pose le GROUPE texte + cadre : gauche() borne le TEXTE, pas le cadre.
        self.gauche(VGroup(fil, cad), -2.00, xmax=1.9)
        self.play(FadeIn(fil, scale=1.05), Create(cad), run_time=0.8)
        self.au_mot("Et cet angle se calcule")
        ps_ = self.t("et cet angle se calcule avec un produit scalaire", 28, VERT_OK)
        self.gauche(ps_, -3.10, xmax=4.6)
        self.play(FadeIn(ps_, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : la seconde formule, et le cosinus isolé ───────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("On part de la seconde formule")
        titre = self.t("Du produit scalaire à l'angle", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)

        # ── la formule, à gauche, en DEUX morceaux ────────────────────────
        # ⛔ DEUX MORCEAUX, ET DEUX INSTANTS : la voix dit « u scalaire v égale » puis
        # « la norme de u, fois la norme de v, fois le cosinus de l'angle ». Posée d'un
        # bloc au premier mot, la seconde moitié serait à l'écran 4 s avant d'être dite.
        f1 = self.vexpr("u · v =", ("u", "v"), 32, WHITE)
        f2 = self.vexpr("‖u‖ × ‖v‖ × cos θ", ("u", "v"), 32, WHITE)
        form = VGroup(f1, f2).arrange(RIGHT, buff=0.18, aligned_edge=DOWN)
        self.gauche(form, 1.95, xmax=1.9)
        self.au_fin("u scalaire v égale")
        self.play(FadeIn(f1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("fois le cosinus de l'angle")
        self.play(FadeIn(f2, shift=RIGHT * 0.12), run_time=0.6)

        # ── le cosinus isolé : LA formule de l'épisode, encadrée ──────────
        # ⚠️ UNE FRACTION EST HAUTE : ce bloc fait près de 1,3 de haut, là où une ligne
        # de texte en fait 0,4. Sa cote vient de la mesure, pas d'un pas régulier.
        iso = self.cos_formule(30, VERT_OK)
        cadi = SurroundingRectangle(iso, color=VERT_OK, buff=0.16, stroke_width=3)
        self.gauche(VGroup(iso, cadi), 0.30, xmax=1.9)
        self.au_fin("il vaut le produit scalaire")
        self.play(FadeIn(iso.submobjects[0], shift=RIGHT * 0.12),
                  FadeIn(iso.submobjects[1].haut, shift=RIGHT * 0.12),
                  Create(cadi), run_time=0.6)
        self.au_fin("par le produit des deux normes")
        self.play(Create(iso.submobjects[1].barre),
                  FadeIn(iso.submobjects[1].bas, shift=UP * 0.1), run_time=0.5)

        # ── la figure plane, en bas à gauche ──────────────────────────────
        # ⛔⛔ ELLE PARAÎT AVANT LA COLONNE DE DROITE, ET C'EST `verifier-avant-rendu.py`
        # QUI L'A DIT : la voix annonce « Exemple : » à 15,43 s, et la colonne de droite
        # court jusqu'à 32,50 s (« environ zéro virgule 71 »). Écrite dans l'ordre de la
        # PAGE — la colonne d'abord, la figure ensuite —, la figure arrivait **17,07 s en
        # retard**, et l'outil le signale par un écart NÉGATIF entre deux ancres. C'est
        # le défaut de l'écran 06 de E9 (3,36 s) et de l'écran 03 de E8 (9,07 s), en bien
        # pire. ⭐ L'ordre est celui de la VOIX, jamais celui de l'écran.
        # ⛔ PLANE, et la raison est en tête du fichier : en cavalière, u(1;0;0) et
        # v(1;1;0) se dessineraient à 11,5° l'un de l'autre alors que leur angle vaut
        # 45°. Ici la figure ne dit pas OÙ ils sont, elle dit leur ANGLE — et elle le dit
        # juste (assertion du module).
        # ⛔⛔ LES TROIS COTES D'ÉTIQUETTE VIENNENT DE LA MESURE, et les trois premières
        # étaient fausses : « u » touchait « 45° » (0,00) ET était TRAVERSÉE par son
        # propre fût (0,00), et « 45° », posé par `next_to(arc, RIGHT)`, tombait pile sur
        # le fût de u — le point le plus à droite d'un arc qui part de 0° EST sur ce
        # fût. ⭐ `loin_des_fleches()` les a toutes les trois ; `etiquettes()` seul n'en
        # voyait qu'une (il compare des boîtes, jamais une boîte à un segment).
        # ⭐ La valeur se pose sur la BISSECTRICE, au-DELÀ des deux pointes : à 1,35 elle
        # est à 1,35 × sin(22,5°) = 0,52 de chaque fût, et elle désigne sans ambiguïté
        # l'angle qu'elle mesure.
        g = coin(round(angle(U02, V02)), r=1.05, s=1.0).move_to(P(-4.55, -2.10))
        o = g.sommet()
        nu = self.vec("u", 26, C_VECTEUR).move_to(o + g.p1 * 0.62 + ecart(g.p1, -1))
        nv = self.vec("v", 26, C_VECTEUR2).move_to(o + g.p2 * 0.74 + ecart(g.p2, +1))
        leg = self.sans_audit(self.t("vus dans leur plan", 22, C_FANTOME))
        leg.next_to(VGroup(g, nu, nv), DOWN, buff=0.14)
        self.au_mot("Exemple")
        self.play(GrowArrow(g.f1), GrowArrow(g.f2), FadeIn(nu), FadeIn(nv),
                  FadeIn(leg), run_time=0.7)

        # ── l'exemple, dans la colonne de droite ──────────────────────────
        fs = 28
        self.au_fin("u de coordonnées 1, zéro, zéro")
        lu = self.nomme("u", U02, C_VECTEUR, fs)
        # ⚠️ Les deux zéros sont dits EN TOUTES LETTRES par la voix : eux seuls sortent
        # de l'audit, pas la ligne entière — sinon on perdrait le contrôle sur le 1.
        self.lettres(lu.nb[1])
        self.lettres(lu.nb[2])
        self.col(lu, 2.40)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("v de coordonnées 1, 1, zéro")
        lv = self.nomme("v", V02, C_VECTEUR2, fs)
        self.lettres(lv.nb[2])
        self.col(lv, 1.70)
        self.play(FadeIn(lv, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Le produit scalaire vaut 1")
        lps = self.col(self.vexpr(f"u · v = {ps(U02, V02)}", ("u", "v"), fs, WHITE), 1.00)
        self.play(FadeIn(lps, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ UNE SEULE LIGNE POUR LES DEUX NORMES, parce que la voix les dit d'un trait
        # (« La norme de u vaut 1, celle de v vaut racine de 2 ») — mais elle se pose à
        # la FIN, sinon √2 est à l'écran avant d'être dit.
        # ⛔ DEUX INSTANTS, ET C'EST UN `AUDIT-TARD` DE 1,86 s QUI L'A DIT : la voix
        # énonce « La norme de u vaut 1 » puis « celle de v vaut racine de 2 » à près de
        # deux secondes d'écart. Posée d'un bloc à la fin, la première moitié arrivait
        # en retard — c'est la règle « un bloc qui porte ce que la voix énumère se
        # remplit au rythme de la voix », dans son autre sens.
        nu0 = self.vexpr(f"‖u‖ = {norme2(U02)}", ("u",), fs, WHITE)
        nv0 = VGroup(self.vexpr("‖v‖ =", ("v",), fs, WHITE),
                     self.racine(norme2(V02), fs, WHITE))
        nv0.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        lno = VGroup(nu0, nv0).arrange(RIGHT, buff=0.34, aligned_edge=DOWN)
        self.col(lno, 0.20)
        self.au_fin("La norme de u vaut 1")
        self.play(FadeIn(nu0, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("celle de v vaut racine de 2")
        self.play(FadeIn(nv0, shift=RIGHT * 0.12), run_time=0.45)
        # ⚠️ « 1 sur racine de 2 » : une fraction dont le dénominateur est un RADICAL.
        # Elle est donc plus haute encore — mesurée, pas estimée.
        self.au_fin("1 sur racine de 2")
        lcos = VGroup(self.t("cos θ =", fs, VERT_OK),
                      self.frac(self.t("1", fs, VERT_OK),
                                self.racine(norme2(V02), fs, VERT_OK), fs, VERT_OK))
        lcos.arrange(RIGHT, buff=0.16)
        self.col(lcos, -0.90)
        self.play(FadeIn(lcos, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("environ zéro virgule 71")
        apx = self.col(self.env(round(1 / math.sqrt(2), 2), 26), -1.70)
        self.play(FadeIn(apx), run_time=0.35)

        # ── et SON angle, en dernier : c'est la conclusion de la voix ─────
        self.au_fin("L'angle vaut 45 degrés")
        val = self.deg(round(angle(U02, V02)), 30, C_REGARD)
        bis = math.radians(angle(U02, V02) / 2)
        val.move_to(g.sommet()
                    + np.array([math.cos(bis), math.sin(bis), 0.0]) * 1.42)
        self.play(Create(g.arc), FadeIn(val, scale=1.15), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 03 : le signe décide avant le calcul ───────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("La méthode tient en trois calculs")
        titre = self.t("Le signe décide avant le calcul", 44, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)

        # ── la méthode, en trois pastilles sur UNE ligne ──────────────────
        fs = 28
        etapes = (("le produit scalaire", C_VECTEUR, "le produit scalaire, puis"),
                  ("les deux normes", C_VECTEUR2, "puis les deux normes"),
                  ("la division", C_REGARD, "puis la division"))
        rangs = []
        for k, (txt, coul, _) in enumerate(etapes, start=1):
            rangs.append(VGroup(self.pastille(k), self.t(txt, 24, coul))
                         .arrange(RIGHT, buff=0.18))
        # ⛔ 24 px ET UN BUFF DE 0,42, ET C'EST UNE MESURE : à 28 px avec 0,55 la ligne
        # faisait 11,88 pour un plafond de 10,60, donc `scale_to_fit_width` réduisait
        # TOUTE la méthode de 10,8 % en silence. ⚠️ Les pastilles, elles, ne rétrécissent
        # pas avec la police (rayon fixe) : elles pèsent 2,04 à elles seules.
        meth = VGroup(*rangs).arrange(RIGHT, buff=0.42)
        # ⚠️ Le plafond de la bande centrale est 10,60 (mesuré depuis E7) : au-delà,
        # `scale_to_fit_width` réduit TOUT en silence. La mesure le revérifie.
        if meth.width > 10.6:
            meth.scale_to_fit_width(10.6)
        meth.move_to(P(-0.75, 2.00))
        for b, (_, _, extrait) in zip(rangs, etapes):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15),
                      run_time=0.45)
        self.au_mot("la touche arccosinus")
        arc = self.t("… puis la touche arccos de la calculatrice", 26, GREY_A)
        arc.next_to(meth, DOWN, buff=0.26)
        self.play(FadeIn(arc), run_time=0.45)

        # ── les trois signes, trois figures planes ────────────────────────
        # ⛔ PLANES (voir l'en-tête) : ces trois schémas disent « aigu », « droit »,
        # « obtus », donc ils disent un ANGLE — et la cavalière n'en conserve aucun.
        # ⭐ Leurs angles dessinés sont vérifiés par l'assertion du module.
        cas = ((50, "> 0", "aigu", VERT_OK, "positif, l'angle est aigu"),
               (90, "= 0", "droit", C_REGARD, "nul, il est droit"),
               (130, "< 0", "obtus", C_PIEGE, "négatif, il est obtus"))
        colonnes, figs = [], []
        for deg_, signe, mot, coul, _ in cas:
            g = coin(deg_, r=0.90, sw=6, r_arc=0.34, c_arc=coul, s=1.0)
            lab = VGroup(self.lettres(self.vexpr(f"u · v {signe}", ("u", "v"), 26, coul)),
                         self.t(mot, 30, coul)).arrange(DOWN, buff=0.10)
            colonnes.append(VGroup(g, lab).arrange(DOWN, buff=0.22))
            figs.append(g)
        trois = VGroup(*colonnes).arrange(RIGHT, buff=0.95)
        if trois.width > 10.6:
            trois.scale_to_fit_width(10.6)
        trois.move_to(P(-0.75, -0.55))
        self.au_mot("regarde le signe du produit scalaire")
        for b, (_, _, _, _, extrait) in zip(colonnes, cas):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=UP * 0.12), run_time=0.45)

        # ── la raison, en bas ─────────────────────────────────────────────
        self.au_mot("Les normes étant toujours positives")
        fin = VGroup(self.sans_audit(self.vexpr("‖u‖ × ‖v‖ est toujours positif :",
                                                ("u", "v"), 26, VERT_OK)),
                     self.sans_audit(self.vexpr("cos θ a le MÊME signe que u · v",
                                                ("u", "v"), 26, VERT_OK)))
        fin.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.95, xmax=4.6)
        self.play(FadeIn(fin, scale=1.04), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : C) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ Le dessin porte la DONNÉE, jamais la RÉPONSE : on écrit u⃗ · v⃗ = −6, et
        # SURTOUT pas une figure d'angle obtus, qui donnerait la réponse avant la
        # question.
        # ⚠️ CARTES LARGES (6,3 à partir de x = 0,35) : le choix C fait 29 caractères
        # que la voix dit mot pour mot, et une carte de 4,1 le ramènerait à ~15 px
        # (défaut n° 4 de l'épisode 1). La donnée de gauche s'arrête donc avant x = 0,15.
        don = self.sans_audit(self.vexpr(f"u · v = {self.nombre(PS04)}", ("u", "v"), 44,
                                         C_REGARD))
        self.gauche(don, 1.55, xmax=0.15)
        nul = self.sans_audit(self.vexpr("et ni u ni v n'est nul", ("u", "v"), 26, GREY_A))
        self.gauche(nul, 0.75, xmax=0.15)
        # ⛔⛔ LA CARTE C PORTE UN NOMBRE, ELLE A DONC BESOIN DE `.nb` : posée à son
        # premier mot, « 90 » serait à l'écran avant d'être prononcé (carte B de
        # l'épisode 8, 1,05 s d'avance). ⚠️ Les cartes A et B sont des mots sans chiffre :
        # on ne les retarde pas, l'élève doit pouvoir les LIRE pendant qu'il les entend.
        # ⛔ 28 px ET NON 32, ET LARGEUR 6,2 ET NON 6,3 : mesuré, une carte de 6,3 posée
        # à x = 0,35 finit à 6,65 et `col()` la réduit de 1 % (6,60 est le bord) ; et la
        # question sur TROIS lignes à 28 px poussait le bas des cartes à −1,79, donc la
        # pause à −2,44 — c'est-à-dire SUR la tête de Ti-Margo (seuil −2,15).
        cA = self.t("aigu", 28, WHITE)
        cB = self.t("droit", 28, WHITE)
        cC = self.choix2("obtus, donc plus grand", "que 90°", fs=26)
        cC.nb = [cC]
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.vexpr("Le produit scalaire de u et v vaut −6,",
                                        ("u", "v"), 26)),
             self.sans_audit(self.t("et aucun des deux vecteurs n'est nul.", 26)),
             self.sans_audit(self.vexpr("L'angle entre u et v est :", ("u", "v"), 26))],
            [cA, cB, cC], largeur=6.2, xl=0.35)
        # ⛔⛔ LA PAUSE EST DÉPLACÉE EN BAS À GAUCHE, ET C'EST LE REMÈDE MESURÉ DE
        # L'ÉPISODE 8 : posée par `q_tete` sous des cartes qui descendent à −1,81, elle
        # tombe à −2,46, c'est-à-dire SUR la tête de Ti-Margo (boîte y ∈ [−3,55 ; −2,15],
        # x ∈ [5,54 ; 6,66]). Les CARTES, elles, restent où `q_tete` les met.
        self.gauche(pause, -2.95, xmax=0.15)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        # ⛔⛔ L'ATTENTE EST COLLÉE À SON `play` (défaut de l'écran 04 de E8, 4,93 s de
        # retard) : un `au_fin` ne place rien, il ATTEND.
        self.au_fin("vaut moins 6")
        self.play(FadeIn(don, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("aucun des deux vecteurs n'est nul")
        self.play(FadeIn(nul, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("L'angle entre u et v est")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "C")
        self.mem_q1 = (cartes, pause, rebours, don, nul)

    def ecran_reponse1(self):
        cartes, pause, rebours, don, nul = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent par-dessus l'explication (défaut n° 1 de l'épisode 1).
        self.q_reponse(cartes, 2, pause, rebours)
        # ⛔⛔ CET ÉCRAN HÉRITE DE L'ÉCRAN 04 : u⃗ · v⃗ = −6 RESTE — c'est la DONNÉE de
        # l'exercice, elle ne s'efface pas (sixième récidive de la série). La ligne
        # « ni u ni v n'est nul », elle, s'efface : elle a servi, et la place sous la
        # donnée est celle du raisonnement.
        self.play(FadeOut(nul), run_time=0.25)
        fs = 28
        self.au_fin("a le même signe que le produit scalaire")
        l1 = self.sans_audit(self.vexpr("cos θ a le signe de u · v", ("u", "v"), fs, VERT_OK))
        self.gauche(l1, 0.70, xmax=0.15)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("divise par deux normes qui sont positives")
        # ⚠️ 24 ET NON 26 : à 26 cette ligne fait 6,90 pour les 6,65 offerts à gauche,
        # et `gauche()` rétrécissait la phrase qui EXPLIQUE le signe.
        l2 = self.sans_audit(self.vexpr("on divise par ‖u‖ × ‖v‖, qui est positif",
                                        ("u", "v"), 24, GREY_A))
        self.gauche(l2, 0.05, xmax=0.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("donne donc un cosinus négatif")
        l3 = self.sans_audit(self.t("cos θ < 0", 32, C_PIEGE))
        self.lettres(l3)
        self.gauche(l3, -0.70, xmax=0.15)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ L'INTERVALLE PORTE DEUX NOMBRES QUE LA VOIX ÉNUMÈRE (« entre 90 et 180
        # degrés ») : il se pose à la FIN, sinon le 180 est à l'écran avant d'être dit.
        self.au_fin("entre 90 et 180 degrés")
        l4 = VGroup(self.t("90° < θ ≤ 180°", 32, VERT_OK),
                    self.t("un angle obtus", 30, VERT_OK))
        l4.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad4 = SurroundingRectangle(l4, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(l4, cad4), -1.70, xmax=0.15)
        self.play(FadeIn(l4, scale=1.04), Create(cad4), run_time=0.7)
        # ⚠️ xmax = 4,6 : à cette hauteur-là, les cartes sont finies et la ligne peut
        # prendre toute la largeur jusqu'à Ti-Margo.
        self.au_mot("On n'a même pas eu besoin")
        l5 = VGroup(self.coche(VERT_OK, 0.14),
                    self.t("on n'a pas eu besoin de connaître les normes", 26, C_REGARD))
        l5.arrange(RIGHT, buff=0.20)
        self.gauche(l5, -3.05, xmax=4.6)
        self.play(FadeIn(l5, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 05 : jusqu'au bout, sans calculatrice ──────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons jusqu'au bout")
        titre = self.t("Jusqu'au bout, sans calculatrice", 44, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        fs = 28

        # ── la colonne de droite : le calcul, étape par étape ─────────────
        self.au_fin("u a pour coordonnées 1, 1, zéro")
        lu = self.nomme("u", U05, C_VECTEUR, fs)
        self.lettres(lu.nb[2])
        self.col(lu, 2.40)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("v a pour coordonnées zéro, 1, 1")
        lv = self.nomme("v", V05, C_VECTEUR2, fs)
        self.lettres(lv.nb[0])
        self.col(lv, 1.70)
        self.play(FadeIn(lv, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ LA LIGNE PORTE SON TOTAL : l'extrait d'un `au_fin` doit CONTENIR le dernier
        # nombre de la ligne (leçon de E9, écran 09b) — « zéro plus 1 plus zéro » s'arrête
        # juste avant « donc 1 », et le total s'afficherait en avance.
        self.au_fin("zéro plus 1 plus zéro, donc 1")
        lps = self.col(self.lettres(self.t(f"0 + 1 + 0 = {ps(U05, V05)}", fs, WHITE)), 1.00)
        self.play(FadeIn(lps, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Les deux normes valent racine de 2")
        lno = VGroup(self.vexpr("‖u‖ = ‖v‖ =", ("u", "v"), fs, WHITE),
                     self.racine(norme2(U05), fs, WHITE))
        lno.arrange(RIGHT, buff=0.16, aligned_edge=DOWN)
        self.col(lno, 0.25)
        self.play(FadeIn(lno, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("leur produit vaut donc 2")
        lpr = VGroup(self.vexpr("‖u‖ × ‖v‖ =", ("u", "v"), fs, WHITE),
                     self.t(f"{int(math.sqrt(norme2(U05)) * math.sqrt(norme2(V05)))}",
                            fs, WHITE))
        lpr.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        self.col(lpr, -0.45)
        self.play(FadeIn(lpr, shift=RIGHT * 0.12), run_time=0.5)
        # ⚠️ Une fraction est haute : −1,45 et non −1,15 (cote mesurée).
        self.au_fin("Le cosinus vaut 1 divisé par 2")
        lcos = VGroup(self.t("cos θ =", fs, VERT_OK),
                      self.frac(self.t("1", fs, VERT_OK), self.t("2", fs, VERT_OK),
                                fs, VERT_OK))
        lcos.arrange(RIGHT, buff=0.16)
        self.col(lcos, -1.45)
        self.play(FadeIn(lcos, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("c'est-à-dire zéro virgule 5")
        demi = self.col(self.lettres(self.t(f"= {self.nombre(0.5)}", 26, GREY_A)), -2.25)
        self.play(FadeIn(demi), run_time=0.35)

        # ── la figure plane, à gauche ─────────────────────────────────────
        # ⛔ PLANE, et ici la mesure l'impose doublement : en cavalière, u(1;1;0) se
        # projette à 11,5° de l'axe des x — il serait dessiné PRESQUE SUR l'axe (la
        # famille de défauts de E1 et de E6). Et l'angle de 60° s'y lirait 60,8°, ce qui
        # n'est juste que par chance.
        g = coin(round(angle(U05, V05)), r=1.35).move_to(P(-4.35, 0.75))
        o = g.sommet()
        nu = self.vec("u", 28, C_VECTEUR).move_to(o + g.p1 * 0.66 + ecart(g.p1, -1, 0.46))
        nv = self.vec("v", 28, C_VECTEUR2).move_to(o + g.p2 * 0.76 + ecart(g.p2, +1, 0.46))
        leg = self.sans_audit(self.t("vus dans leur plan", 22, C_FANTOME))
        leg.next_to(VGroup(g, nu, nv), DOWN, buff=0.16)
        self.au_mot("Et un cosinus qui vaut un demi")
        self.play(GrowArrow(g.f1), GrowArrow(g.f2), FadeIn(nu), FadeIn(nv),
                  FadeIn(leg), run_time=0.7)
        # ⚠️ xmax = 1,9 : la colonne de droite est encore occupée à cette hauteur-là.
        self.au_fin("c'est l'angle de 60 degrés")
        fin = VGroup(self.deg(round(angle(U05, V05)), 34, VERT_OK),
                     self.t("sans calculatrice", 28, VERT_OK))
        fin.arrange(RIGHT, buff=0.22, aligned_edge=DOWN)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.30, xmax=1.9)
        self.play(Create(g.arc), FadeIn(fin, scale=1.05), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 06 : les trois pièges ──────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ Le glyphe ⚠ ne se rend pas (carré « tofu », épisode 1) : on DESSINE le
        # triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Trois pièges", 42, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.9)
        fs = 27

        # ── piège 1 : le produit, pas la somme ───────────────────────────
        self.au_fin("jamais par leur somme")
        b1 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.sans_audit(self.vexpr("‖u‖ + ‖v‖", ("u", "v"),
                                                               fs, C_PIEGE)),
                                    self.t("jamais la SOMME", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.35)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.6)
        b2 = self.col(VGroup(self.coche(VERT_OK, 0.14),
                             VGroup(self.sans_audit(self.vexpr("‖u‖ × ‖v‖", ("u", "v"),
                                                               fs, VERT_OK)),
                                    self.t("le PRODUIT", fs, VERT_OK))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 1.20)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.5)

        # ── piège 2 : |cos| ≤ 1 ──────────────────────────────────────────
        self.au_fin("entre moins 1 et 1")
        b3 = self.col(VGroup(self.coche(VERT_OK, 0.14),
                             self.t("|cos θ| ≤ 1, toujours", fs, VERT_OK))
                      .arrange(RIGHT, buff=0.22), 0.20)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ « 1,25 » N'EST PAS DANS LA VOIX, qui dit « 1 virgule 25 » : hors audit.
        self.au_fin("si tu trouves 1 virgule 25")
        b4 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.lettres(self.t(f"{self.nombre(COS07)} :", fs,
                                                        C_PIEGE)),
                                    self.t("une erreur de calcul", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.80)
        self.play(FadeIn(b4, shift=RIGHT * 0.12), run_time=0.6)

        # ── piège 3 : vecteurs ≠ droites, avec sa figure ─────────────────
        # ⛔ PLANE, et avec DEUX arcs de rayons différents : au même rayon ils se
        # touchent au sommet commun et on lit un seul angle.
        g = coin(round(angle(U05, V05)), r=1.15, r_arc=0.40, oppose=True)
        g.move_to(P(-4.25, 1.25))
        o = g.sommet()
        nv = self.vec("v", 26, C_VECTEUR2).move_to(o + g.p2 * 0.78 + ecart(g.p2, +1))
        # ⛔ LA FLÈCHE NE COIFFE QUE LE NOM, PAS LE SIGNE : `vec("−v")` dessinait la
        # flèche au-dessus de « −v » tout entier, et au gros plan on lisait un double
        # trait. Un vecteur opposé s'écrit « − » suivi de « v⃗ ».
        # ⚠️ ET LE SIGNE S'ALIGNE SUR LE CENTRE DU « v », PAS SUR LA LIGNE DE BASE :
        # `aligned_edge=DOWN` posait le moins au niveau du pied de la lettre, et au gros
        # plan on lisait « _v⃗ ». Un signe moins se centre à mi-hauteur.
        vv = self.vec("v", 26, C_VECTEUR2)
        mo = self.t("−", 26, C_VECTEUR2).next_to(vv.texte, LEFT, buff=0.06)
        mo.set_y(float(vv.texte.get_center()[1]))
        nw = VGroup(mo, vv)
        nw.move_to(o + g.p3 * 0.78 + ecart(g.p3, -1, 0.52))
        nw.set_opacity(0.75)
        self.au_mot("Si tu retournes un vecteur")
        self.play(GrowArrow(g.f1), GrowArrow(g.f2), Create(g.arc), FadeIn(nv),
                  run_time=0.6)
        self.au_fin("l'angle devient son supplémentaire")
        self.play(GrowArrow(g.f3), Create(g.arc2), FadeIn(nw), run_time=0.6)
        # ⚠️ xmax = 1,9 : la colonne de droite descend sous −1,1.
        self.au_mot("Pour l'angle de deux droites")
        fin = VGroup(self.sans_audit(self.t("l'angle de deux VECTEURS n'est pas",
                                            26, C_REGARD)),
                     self.sans_audit(self.t("l'angle de deux DROITES", 26, C_REGARD)))
        fin.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cadf = SurroundingRectangle(fin, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cadf), -1.95, xmax=1.9)
        self.play(FadeIn(fin, scale=1.04), Create(cadf), run_time=0.7)
        # ⛔ « zéro et 90 degrés » : le zéro est dit en toutes lettres.
        self.au_fin("et on obtient un angle entre zéro et 90 degrés")
        drt = VGroup(self.coche(VERT_OK, 0.14),
                     VGroup(self.t("pour deux droites : |cos θ|,", 26, VERT_OK),
                            self.lettres(self.t("donc un angle entre 0° et 90°", 26,
                                                VERT_OK)))
                     .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        drt.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(drt, -3.05, xmax=4.6)
        self.play(FadeIn(drt, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : B) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ AUCUNE figure : un angle dessiné donnerait un indice, et la question porte
        # sur un nombre impossible — il n'y a rien à dessiner qui soit vrai.
        don = self.lettres(self.t(f"cos θ = {self.nombre(COS07)}", 44, C_REGARD))
        self.gauche(don, 1.55, xmax=0.15)
        # ⛔⛔ LA CARTE B PORTE DEUX NOMBRES (« −1 » et « 1 »), ELLE A DONC `.nb`. Oui,
        # elle paraît alors à la fin de sa phrase et non au début — et c'est le choix
        # mesuré : sans `.nb`, ses deux nombres sont à l'écran 2,4 s avant d'être dits
        # (défaut de la carte B de l'épisode 8). Les cartes A et C, qui ne portent aucun
        # chiffre, paraissent dès leur premier mot et restent lisibles à temps.
        # ⛔ Mêmes cotes mesurées qu'à l'écran 04, et pour la même raison.
        # ⛔⛔ MESURÉ : une carte de 6,2 n'offre que 5,05 à son texte, soit ~30 caractères
        # à 26 px. « les deux vecteurs sont colinéaires » en fait 34 et retombait à
        # **18,8 px** — le défaut n° 4 de l'épisode 1. Les deux choix longs passent donc
        # sur DEUX lignes, à la même police que le premier : trois cartes de tailles
        # inégales se lisent plus mal qu'une carte de deux lignes.
        cA = self.t("l'angle est très petit", 26, WHITE)
        # ⛔ TROIS LIGNES POUR LA SEULE CARTE B : « il y a une erreur, un cosinus » fait
        # 29 caractères et retombait à 22,5 px (une carte de 6,2 n'offre que 5,05, soit
        # ~30 caractères à 26 px — mesuré). ⚠️ UNE SEULE des trois sur trois lignes,
        # jamais les trois : c'est le remède de l'épisode 6, puis de l'épisode 8.
        cB = self.choix3("il y a une erreur,", "un cosinus reste",
                         "entre −1 et 1", fs=26)
        cB.nb = [cB]
        cC = self.choix2("les deux vecteurs", "sont colinéaires", fs=26)
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.t("On calcule le cosinus de l'angle entre", 26)),
             self.lettres(self.t(f"deux vecteurs et on trouve {self.nombre(COS07)}.", 26)),
             self.sans_audit(self.t("Que peut-on dire ?", 26))],
            [cA, cB, cC], largeur=6.2, xl=0.35)
        # ⛔ Même remède qu'à l'écran 04, et pour la même raison mesurée.
        self.gauche(pause, -2.95, xmax=0.15)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_fin("on trouve 1 virgule 25")
        self.play(FadeIn(don, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Que peut-on dire")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "B")
        self.mem_q2 = (cartes, pause, rebours, don)

    def ecran_reponse2(self):
        cartes, pause, rebours, don = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        # ⛔ LA DONNÉE RESTE (septième récidive de la série) : « cos θ = 1,25 » est ce
        # qu'on est en train de réfuter.
        fs = 27
        self.au_fin("ne dépasse jamais 1, jamais")
        l1 = self.t("|cos θ| ≤ 1", 36, VERT_OK)
        cad1 = SurroundingRectangle(l1, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(l1, cad1), 0.60, xmax=0.15)
        self.play(FadeIn(l1, scale=1.05), Create(cad1), run_time=0.6)
        self.au_fin("par la somme des normes au lieu de leur produit")
        l2 = VGroup(self.croix(r=0.12),
                    VGroup(self.sans_audit(self.vexpr("divisé par ‖u‖ + ‖v‖", ("u", "v"),
                                                      fs, C_PIEGE)),
                           self.t("au lieu du produit", fs, C_PIEGE))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l2.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(l2, -0.45, xmax=0.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("oublié une racine dans une norme")
        l3 = VGroup(self.croix(r=0.12),
                    self.t("une racine oubliée dans une norme", 25, C_PIEGE))
        l3.arrange(RIGHT, buff=0.18)
        self.gauche(l3, -1.45, xmax=0.15)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.55)
        # ⚠️ xmax = 4,6 : sous les cartes, la ligne prend toute la largeur.
        # ⛔ LA LIGNE PORTE DEUX NOMBRES QUE LA VOIX ÉNUMÈRE (« exactement 1, ou
        # exactement moins 1 ») : elle se pose à la fin du second.
        self.au_fin("ou exactement moins 1")
        l4 = VGroup(self.sans_audit(self.t("cos θ = 1 ou cos θ = −1 :", 26, C_REGARD)),
                    self.sans_audit(self.t("là, oui, les vecteurs sont colinéaires",
                                           26, C_REGARD)))
        l4.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad4 = SurroundingRectangle(l4, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(l4, cad4), -2.55, xmax=4.6)
        self.play(FadeIn(l4, scale=1.04), Create(cad4), run_time=0.7)
        self.au_fin("mais pas 1 virgule 25")
        l5 = self.lettres(self.t(f"mais pas {self.nombre(COS07)} — reprends le calcul",
                                 26, C_PIEGE))
        self.gauche(l5, -3.30, xmax=4.6)
        self.play(FadeIn(l5, shift=RIGHT * 0.12), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 08 : les QUATRE lignes de la copie ─────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, quatre lignes")
        titre = self.t("Quatre lignes, dans cet ordre", 42, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️ QUATRE lignes et non trois (E9) : la copie est plus haute, donc son centre
        # remonte. Hauteur 3,0 centrée en −0,40 → elle descend à −1,90, et le rappel
        # posé dessous s'arrête vers −3,25 (marge : −3,573). Cotes mesurées.
        copie = RoundedRectangle(width=10.2, height=3.0, corner_radius=0.18,
                                 stroke_color=GREY_B, stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.6, -0.40))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        # ⛔ 26 ET DES LIGNES COURTES, ET C'EST UNE MESURE : sur E7 puis E8, un modèle de
        # rédaction trop large a été ramené à 19,8 px par `scale_to_fit_width` — LE
        # MODÈLE DE RÉDACTION devenu le plus petit texte de l'épisode.
        fs = 26
        lignes_copie = (
            (("u · v = … (le calcul écrit)", ("u", "v")), C_VECTEUR,
             "le produit scalaire, calcul écrit"),
            (("‖u‖ = …", ("u",)), C_VECTEUR2, "la première norme"),
            (("‖v‖ = …", ("v",)), C_VECTEUR2, "la seconde norme"),
            ((None, None), VERT_OK, "le cosinus sous forme exacte"),
        )
        rangs, extraits = [], []
        for k, (txt, coul, extrait) in enumerate(lignes_copie, start=1):
            if txt[0] is None:
                # ⭐ La quatrième ligne porte l'essentiel : la forme EXACTE, puis
                # l'arrondi AVEC SON UNITÉ.
                corps = self.sans_audit(self.t("cos θ = … (exact), puis θ ≈ …° ou … rad",
                                               fs, coul))
            else:
                corps = self.sans_audit(self.vexpr(txt[0], txt[1], fs, coul))
            rangs.append(VGroup(self.pastille(k), corps).arrange(RIGHT, buff=0.30))
            extraits.append(extrait)
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
        # ⭐ LA PHRASE FINALE EST CELLE QUI COÛTE LE POINT, et la voix la dit en dernier.
        self.au_mot("Donner un angle sans préciser l'unité")
        rappel = VGroup(self.t("un angle sans unité, c'est le point perdu :", 26, C_PIEGE),
                        self.sans_audit(self.t("degrés ou radians, toujours", 26, C_PIEGE)))
        rappel.arrange(DOWN, buff=0.10)
        cad = SurroundingRectangle(rappel, color=C_PIEGE, buff=0.14, stroke_width=3)
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
        # ⛔ LE DESSIN PORTE LA DONNÉE, JAMAIS LA RÉPONSE : le cube, son repère et les
        # deux sommets concernés, oui ; les flèches A⃗G et A⃗B, NON — et surtout pas l'arc
        # de l'angle, qui est la question elle-même. Tout arrive en 09b.
        # ⚠️ Repère MESURÉ : o = (−5,90 ; 0,20), u = 1,4 (les cotes de E9, même cube).
        # ⛔⛔ DEUX NOMS DE SOMMET SONT ÉCARTÉS, ET LES COTES VIENNENT DE LA MESURE
        # (`loin_des_fleches`) : le fût de A⃗G passe à 0,00 du nom « D » et à 0,10 du nom
        # « F ». ⚠️ Et la recherche en grille connaît TOUS les segments tracés — les
        # douze arêtes et les deux flèches —, sinon elle déplace le défaut au lieu de le
        # corriger (vu au gros plan sur E9 : les deux noms écartés tombaient pile sur
        # deux arêtes).
        r, cube = self.cube_repere(
            o=(-5.90, 0.20), u=1.4, rouges=("B", "G"),
            ecarte={"D": np.array([-0.30, 0.30, 0.0]),
                    "F": np.array([0.30, -0.30, 0.0])})
        self.au_mot("Dans le cube A B C D E F G H")
        self.play(FadeIn(cube), run_time=0.7)
        self.au_mot("avec le repère A, A B, A D, A E")
        base = self.sans_audit(self.base_repere(r))
        self.play(*[GrowArrow(v[0]) for v in base], run_time=0.7)
        # ⛔⛔ LA CONSIGNE VA À GAUCHE, SOUS LE CUBE : dans la colonne de droite elle fait
        # plus de 6 de large pour 4,40 offerts, donc `col()` la rétrécirait — c'est-à-dire
        # que ce que l'élève doit LIRE pendant qu'il met pause deviendrait le plus petit
        # texte de la vidéo (défaut payé sur l'épisode 6).
        self.au_mot("calcule l'angle entre les vecteurs A G et A B")
        cons = VGroup(self.lettres(self.t("dans le cube d'arête 1 :", 26, GREY_A)),
                      self.sans_audit(self.vexpr("calcule l'angle entre A G et A B,",
                                                 ("A G", "A B"), 30, WHITE)),
                      self.sans_audit(self.t("arrondi au degré", 30, WHITE)))
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
        # bas qu'on ne croit (payé sur E3, E5, E7, E8 PUIS E9). Ce qui s'efface : la
        # consigne, la pause, le rebours — ET les trois flèches du repère, parce que
        # A⃗B EST l'une d'elles : laissée en place, la flèche bleue de la correction se
        # superposerait exactement à la flèche grise de la base.
        # Ce qui RESTE : le cube seul, avec B et G en ambre.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), FadeOut(base),
                  run_time=0.3)
        self.dire("09b-correction")
        fs = 26
        # ── ① les deux vecteurs ───────────────────────────────────────────
        self.au_fin("Le vecteur A G a pour coordonnées 1, 1, 1")
        lAG = self.col(self.nomme("A G", AG, C_REGARD, 28), 2.40)
        fAG = r.vecteur(S["A"], S["G"], None, couleur=C_REGARD, sw=7)
        self.play(GrowArrow(fAG[0]), FadeIn(lAG, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("le vecteur A B a pour coordonnées 1, zéro, zéro")
        lAB = self.nomme("A B", AB, C_VECTEUR, 28)
        self.lettres(lAB.nb[1])
        self.lettres(lAB.nb[2])
        self.col(lAB, 1.70)
        fAB = r.vecteur(S["A"], S["B"], None, couleur=C_VECTEUR, sw=7)
        # ⛔⛔ L'ARC NE PORTE AUCUNE VALEUR, ET C'EST MESURÉ : en cavalière, l'angle de
        # A⃗G et A⃗B se lit 42,4° alors qu'il vaut 54,7° — douze degrés de mensonge. L'arc
        # est donc une CONVENTION qui dit « c'est CET angle-là », exactement comme le
        # petit carré de `angle_droit`, qui n'est pas droit à l'écran non plus. La valeur
        # est dans la colonne de droite, jamais sur la figure (leçon du 3-4-5 faux de E9).
        arc = Arc(radius=0.46, start_angle=0,
                  angle=math.radians(_apparent(AB, AG)), color=C_REGARD,
                  stroke_width=5).move_arc_center_to(r.pt(*S["A"]))
        self.play(GrowArrow(fAB[0]), Create(arc),
                  FadeIn(lAB, shift=RIGHT * 0.12), run_time=0.6)

        # ── ② le produit scalaire, terme à terme ──────────────────────────
        # ⛔⛔ UNE LIGNE QUI PORTE CE QUE LA VOIX ÉNUMÈRE SE REMPLIT AU RYTHME DE LA VOIX
        # (leçon n° 3 de E9, trouvée quatre épisodes de suite en relisant les plus gros
        # AUDIT-TARD) : « 1 fois 1, plus 1 fois zéro, plus 1 fois zéro, donc 1 » dure
        # plus de quatre secondes. Posée d'un bloc, la ligne mettrait son total à l'écran
        # bien avant qu'il soit dit.
        t1 = self.t("1 × 1", 24, WHITE)
        t2 = self.lettres(self.t("+ 1 × 0", 24, WHITE))
        t3 = self.lettres(self.t("+ 1 × 0", 24, WHITE))
        t4 = self.t(f"= {ps(AG, AB)}", 24, VERT_OK)
        # ⛔⛔ DEUX ÉTAGES, ET C'EST UNE MESURE : d'un seul tenant cette ligne fait 6,69
        # pour les 4,40 qu'offre la colonne de droite, donc `col()` la réduisait de 34 %
        # — le calcul du défi serait devenu le plus petit texte de l'épisode.
        entete = self.sans_audit(self.vexpr("A G · A B =", ("A G", "A B"), fs, GREY_A))
        # ⛔⛔ VU AU GROS PLAN : à buff 0,06 on lisait « 1 × 1+ 1 × 0+ 1 × 0= 1 » — les
        # « + » et le « = » collés au terme de gauche et détachés de celui de droite.
        # La ligne doit tenir dans les 4,40 de la colonne, alors c'est la POLICE qui
        # cède, pas l'espacement : 24 px et buff 0,14 font 4,25.
        suite = VGroup(t1, t2, t3, t4).arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        calc = VGroup(entete, suite).arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        self.col(calc, 0.95)
        self.au_fin("1 fois 1")
        self.play(FadeIn(entete, shift=RIGHT * 0.12), FadeIn(t1), run_time=0.5)
        self.au_fin("plus 1 fois zéro", 1)
        self.play(FadeIn(t2), run_time=0.35)
        self.au_fin("plus 1 fois zéro", 2)
        self.play(FadeIn(t3), run_time=0.35)
        # ⚠️ « zéro, donc 1 » ET NON « fois zéro, donc 1 » : il n'y a PAS de marque à
        # l'offset du mot « fois » (168), et `au_fin` aurait silencieusement pris celle
        # d'avant. C'est le piège n° 4 de la série des entiers, payé trois fois là-bas —
        # et seul `verifier-avant-rendu.py` le voit, jamais le dry run.
        self.au_fin("zéro, donc 1")
        self.play(FadeIn(t4, scale=1.15), run_time=0.35)

        # ── ③ les deux normes, puis le cosinus ────────────────────────────
        self.au_fin("celle de A B vaut 1")
        # ⛔ DEUX LIGNES, ET C'EST LE GROS PLAN QUI L'A DIT : côte à côte, « √3 » et
        # « ‖A B⃗‖ » se lisaient comme un PRODUIT. Deux normes sont deux résultats, pas
        # une multiplication — et l'écran 06 passe son temps à dire que le produit des
        # normes est au DÉNOMINATEUR.
        # ⛔⛔ UNE LIGNE, AVEC UN POINT-VIRGULE — et deux défauts corrigés d'un coup.
        # Côte à côte sans séparateur, « √3 » et « ‖A B⃗‖ » se lisaient comme un PRODUIT
        # (vu au gros plan). Mais sur DEUX lignes, le bloc gagnait 0,5 de haut et sa
        # première ligne venait TOUCHER le calcul du dessus — la flèche de « ‖A G⃗‖ »
        # montait dans « 1 × 1 ». ⚠️ Et ma mesure ne comparait pas ces deux blocs-là :
        # c'est le trou d'instrument de l'épisode 6 (« l'accolade mordait de 0,13, et
        # aucun outil ne comparait ces deux blocs »), refait ici. Le contrôle manquant
        # est ajouté dans `mesure-ps-espace-angle.py`.
        lig1 = VGroup(self.sans_audit(self.vexpr("‖A G‖ =", ("A G",), fs, WHITE)),
                      self.racine(norme2(AG), fs, WHITE))
        lig1.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        lno = VGroup(lig1, self.sans_audit(self.vexpr("; ‖A B‖ = 1", ("A B",), fs, WHITE)))
        lno.arrange(RIGHT, buff=0.20, aligned_edge=DOWN)
        self.col(lno, 0.15)
        self.play(FadeIn(lno, shift=RIGHT * 0.12), run_time=0.55)
        # ⚠️ Une fraction dont le dénominateur est un RADICAL : le bloc est haut, et sa
        # cote est mesurée (−0,95 et non −0,70).
        self.au_fin("1 divisé par racine de 3")
        lcos = VGroup(self.t("cos θ =", 28, VERT_OK),
                      self.frac(self.t("1", 28, VERT_OK),
                                self.racine(norme2(AG), 28, VERT_OK), 28, VERT_OK))
        lcos.arrange(RIGHT, buff=0.16)
        self.col(lcos, -0.95)
        self.play(FadeIn(lcos, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("environ zéro virgule 577")
        apx = self.col(self.env(round(1 / math.sqrt(3), 3), 26), -1.80)
        self.play(FadeIn(apx), run_time=0.35)

        # ── ④ l'angle, à gauche sous le cube ──────────────────────────────
        # ⚠️ xmax = 1,9 : la colonne de droite descend sous −1,9.
        self.au_fin("environ 54 virgule 7 degrés")
        # ⚠️ « 54,7 » HORS AUDIT : la voix dit « 54 virgule 7 degrés », donc la chaîne
        # « 54,7 » n'existe nulle part dans son texte et sortait en AUDIT-ABSENT. Le
        # « 55 » voisin, lui, RESTE dans l'audit — la voix le dit en chiffres.
        ang = VGroup(self.t("θ ≈", 30, VERT_OK),
                     self.lettres(self.deg(54.7, 30, VERT_OK)),
                     self.t("→", 30, VERT_OK),
                     self.deg(round(angle(AG, AB)), 34, VERT_OK))
        ang.arrange(RIGHT, buff=0.18, aligned_edge=DOWN)
        cada = SurroundingRectangle(ang, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(ang, cada), -1.10, xmax=1.9)
        self.play(FadeIn(ang[:2], shift=RIGHT * 0.12), Create(cada), run_time=0.6)
        self.au_fin("donc 55 degrés arrondi au degré")
        self.play(FadeIn(ang[2:], shift=RIGHT * 0.12), run_time=0.4)
        # ── ⑤ ET SURTOUT : ce n'est pas 45° ───────────────────────────────
        # ⭐ C'est la phrase que la voix met en avant, et c'est l'erreur la plus répandue
        # du chapitre : on lit « diagonale » et on écrit 45 sans calculer.
        self.au_fin("ce n'est pas 45 degrés")
        l1 = VGroup(self.croix(r=0.13),
                    VGroup(self.deg(45, 30, C_PIEGE), self.t("sans calculer", 28, C_PIEGE))
                    .arrange(RIGHT, buff=0.16, aligned_edge=DOWN))
        l1.arrange(RIGHT, buff=0.20)
        self.gauche(l1, -2.15, xmax=1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("vaut 55 degrés environ")
        l2 = VGroup(self.coche(VERT_OK, 0.14),
                    VGroup(self.sans_audit(self.t("la grande diagonale et une arête :",
                                                  26, VERT_OK)),
                           VGroup(self.deg(round(angle(AG, AB)), 26, VERT_OK),
                                  self.t("environ", 26, VERT_OK))
                           .arrange(RIGHT, buff=0.14))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l2.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(l2, -3.10, xmax=4.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.6)
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
        # ⛔⛔ LA PREMIÈRE RANGÉE EST ÉCRITE EN SYMBOLES, ET C'EST UNE MESURE : en toutes
        # lettres (« le produit scalaire divisé par le produit des normes ») les QUATRE
        # rangées faisaient 12,32 pour un plafond de 10,60, donc la FINALE — l'écran que
        # l'élève relit le plus — était réduite de 13,9 % sans que rien ne le dise.
        # ⭐ Et la formule est ce qu'il doit retenir, pas sa paraphrase.
        faits = (("le cosinus :", C_REGARD,
                  "u · v divisé par ‖u‖ × ‖v‖", ("u", "v"),
                  "c'est le produit scalaire divisé par le produit des normes"),
                 ("le signe :", C_VECTEUR, "aigu, droit ou obtus — tout de suite", None,
                  "dit tout de suite aigu, droit ou obtus"),
                 ("un cosinus :", C_PIEGE, "toujours entre −1 et 1", None,
                  "reste entre moins 1 et 1"),
                 ("deux droites :", VERT_OK, "on prend la valeur absolue", None,
                  "on prend la valeur absolue"))
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


class PsEspaceAngleTerminale(PsEspaceAngleBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
