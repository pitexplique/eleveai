# ps_espace_orthogonalite.py
# EleveAI — Maths Tle spé — paysage « Démontrer une orthogonalité » (16:9),
# ceinture VERTE. Micro du coach : ps_espace_orthogonalite (notion produit_scalaire_espace).
# Épisode 8 sur 12, et le DEUXIÈME des six du produit scalaire.
# Centre : sciences (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, « un produit scalaire nul » / « pour un plan, il en faut DEUX » ;
#   · 01-situation  : Marc, maçon — un poteau vérifié dans un seul sens n'est pas droit ;
#   · 02-idee       : le test, en coordonnées : u(2;1;−1) · v(1;−1;1) = 0 ;
#   · 03-theoreme   : LE théorème du chapitre — deux vecteurs NON COLINÉAIRES du plan ;
#   · 04/04b        : question-pause n° 1 (u(1;2;−2) · v(2;−3;−2) → réponse A, zéro) ;
#   · 05-appliquer  : n(1;1;1) normal au plan P porté par u(1;−1;0) et v(0;1;−1) ;
#   · 06-piege      : un seul produit nul ne suffit pas (le nord est AU SOL), et
#                     orthogonales ≠ sécantes (les arêtes [A B] et [C G] du cube) ;
#   · 07/07b        : question-pause n° 2 (un seul vecteur du plan → réponse C) ;
#   · 08-rediger    : la copie — les CINQ lignes, dont la quatrième qu'on oublie ;
#   · 09/09b        : le défi — (A G) orthogonale au plan (BDE) dans le cube unité ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py, les figures dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'OUTIL se fait là-bas, jamais recopiée ici.
# ⭐ Toutes les cotes de ce fichier viennent d'une COMMANDE :
#   `python -X utf8 manim/poste2/mesure-ps-espace-orthogonalite.py` (recopié de celui de
#   E7, le plus complet : il signale les réductions PAR UN PLAFOND et compare la colonne
#   de droite au TITRE, deux défauts payés sur E7).
#
# ⚠️ Bonne réponse : 04 → A, 07 → C (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# ⭐⭐ LA NOTATION VECTORIELLE EST OBLIGATOIRE (décision de Frédéric, 22/11) : tout nom de
#   vecteur écrit à l'écran porte sa flèche — `self.vec` pour un nom seul, `self.vexpr`
#   pour une expression. Le contrôle : `python -X utf8 manim/poste2/auditer-fleches-vecteurs.py`.
#   ⛔ MAIS UNE DROITE ET UN PLAN NE SONT PAS DES VECTEURS : cet épisode écrit donc
#   « (A G) » pour la droite et « (BDE) » pour le plan — la notation française, qui est
#   justement ce qui distingue une droite d'un vecteur à l'écran. C'est la leçon de
#   l'épisode : le vecteur A G est orthogonal au PLAN (BDE), pas « A G orthogonal à B D E ».
#
# ⛔⛔ LE ZÉRO DE CET ÉPISODE EST HORS AUDIT, ET C'EST STRUCTUREL (même raison qu'en E7) :
#   la voix dit « zéro » EN TOUTES LETTRES partout (« A : oui, le produit scalaire vaut
#   zéro », « égale zéro »), et l'écran écrit 0 — seule écriture juste d'un produit
#   scalaire nul. Sans `self.zero()`, chaque 0 affiché sortirait en `AUDIT-ABSENT` et
#   noierait le seul vrai signalement qu'on cherche.
#
# ⛔⛔ DEUX PLANS DE CET ÉPISODE SE PROJETTERAIENT SUR UNE LAME, ET C'EST MESURÉ :
#   `platitude((1 ; 1 ; 1))` = 9,0°, sous le seuil de 12° (voir le NOYAU dans espace3d.py).
#   C'est la normale du plan P de l'écran 05 ET celle du plan (BDE) du défi.
#   · écran 05 : le plan est donc DESSINÉ À PLAT (`plan_poteau` ci-dessous), comme un
#     manuel, et sans aucun axe — il montre CE QU'EST un plan, pas où il est ;
#   · écran 09b : pas de morceau de plan du tout. Mesuré : le triangle B D E projeté ne
#     garde que **17,5 %** de son aire, et D tombe à **0,214** unité de la droite (B E) —
#     rempli, il se lirait comme une lame. On montre les deux VECTEURS du plan, B D et
#     B E, qui sont ce que la démonstration manipule.
#   ⭐ Et le sol de l'écran 06, lui, se projette très bien : `platitude((0 ; 0 ; 1))` = 14,9°.
#
# Voix : manim/voix/terminale-ps-espace-orthogonalite.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
#   --disable_caching manim/scripts/terminale/ps_espace_orthogonalite.py \
#   PsEspaceOrthogonaliteTerminale \
#   --media_dir manim/scripts/terminale/media-ps-espace-orthogonalite --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_FANTOME, C_PIEGE, C_PLAN, C_POINT, C_REGARD,  # noqa: E402
                      C_VECTEUR, C_VECTEUR2, Repere3D, platitude)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import CompteARebours, P, EcransEspace, pastille_pause  # noqa: E402

PEAU, CASQUE = "#c68642", "#facc15"
BLEU_TRAVAIL, OUTIL = "#1e40af", "#cbd5e1"

# ── les données de l'épisode, écrites UNE fois ─────────────────────────────
U02, V02 = (2, 1, -1), (1, -1, 1)         # 02 : l'exemple fondateur
U04, V04 = (1, 2, -2), (2, -3, -2)        # 04 : la question-pause n° 1
N05, U05, V05 = (1, 1, 1), (1, -1, 0), (0, 1, -1)   # 05 : n normal au plan P
NORD, EST = (0, 1, 0), (1, 0, 0)          # 06 : le contre-exemple du sol
# ⭐ Le cube de 9 épisodes sur 12, dans le repère (A ; AB, AD, AE).
S = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
     "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}


def ps(u, v):
    """Le produit scalaire, recalculé ici — aucun nombre de cet épisode n'est recopié."""
    return sum(u[i] * v[i] for i in range(3))


def vec3(m, n):
    return tuple(n[i] - m[i] for i in range(3))


def colineaires(u, v):
    """True si u et v sont colinéaires. ⭐ C'est LA ligne que l'épisode dit qu'on oublie :
    elle est donc vérifiée par un calcul, pas par une relecture."""
    return all(abs(u[i] * v[j] - u[j] * v[i]) < 1e-12
               for i, j in ((0, 1), (0, 2), (1, 2)))


def cavaliere(m):
    """Le projeté (x + 0,41 y ; z + 0,287 y), en unités de repère — pour vérifier HORS
    RENDU qu'une figure dit bien ce que l'écran prétend montrer."""
    return (m[0] + 0.41 * m[1], m[2] + 0.287 * m[1])


# ── la passe maths du script, refaite indépendamment de la voix ────────────
assert ps(U02, V02) == 0                       # 02 : 2 − 1 − 1
assert [U02[i] * V02[i] for i in range(3)] == [2, -1, -1]
assert ps(U04, V04) == 0                       # 04 : 2 − 6 + 4, bonne réponse A
assert [U04[i] * V04[i] for i in range(3)] == [2, -6, 4]
assert 2 - 6 - 4 == -8                         # le leurre B : (−2) × (−2) pris pour −4
# ⛔ Le leurre C (« coordonnées non proportionnelles ») dit la NON-COLINÉARITÉ, et elle
# est vraie ici : c'est bien pour ça que ce leurre « confond deux notions ».
assert not colineaires(U04, V04)
# ⭐ 05 : les deux produits nuls ET la non-colinéarité — le théorème en entier.
assert ps(N05, U05) == 0 and ps(N05, V05) == 0
assert not colineaires(U05, V05)
assert V05[0] == 0 and U05[0] != 0             # la raison que la voix donne
# ⭐ 06 : le contre-exemple du sol, et les deux arêtes orthogonales non sécantes.
assert ps(NORD, EST) == 0 and NORD[2] == 0 and EST[2] == 0   # tous deux AU SOL
AB06, CG06 = vec3(S["A"], S["B"]), vec3(S["C"], S["G"])
assert ps(AB06, CG06) == 0
# (A B) : y = z = 0 ; (C G) : x = y = 1 — aucun point commun.
assert not any(S["A"][1] + t * AB06[1] == 1 for t in (-2, -1, 0, 1, 2, 3))
# ⭐ 09b : la démonstration du défi, refaite en entier.
AG, BD, BE = vec3(S["A"], S["G"]), vec3(S["B"], S["D"]), vec3(S["B"], S["E"])
assert AG == (1, 1, 1) and BD == (-1, 1, 0) and BE == (-1, 0, 1)
assert ps(AG, BD) == 0 and ps(AG, BE) == 0
assert not colineaires(BD, BE)
# ⛔⛔ LES DEUX PLANS DE L'ÉPISODE SE PROJETTERAIENT SUR UNE LAME (9,0° < 12°) : c'est
# pour ça que l'écran 05 dessine son plan À PLAT et que le défi n'en dessine aucun.
assert platitude(N05) < 12.0 and platitude(AG) < 12.0
assert platitude((0, 0, 1)) > 12.0             # le sol de l'écran 06, lui, se projette bien


def marc(s=1.0):
    """Marc, maçon : casque de chantier, bleu de travail, un niveau à la main.

    ⛔ Les règles payées sur les quatre personnages des épisodes 1 à 7, appliquées ici :
    1. AUCUN trait de visage — aucun des personnages de la série n'en a, et une bouche
       dessinée à cette taille se lit comme une tache (E4) ;
    2. ⛔⛔ LE BORD DU CASQUE PART DU HAUT DE LA TÊTE, PAS DU MILIEU DU VISAGE. C'est le
       défaut de la visière de Jean-Bernard (E4), vu seulement au gros plan : elle lui
       barrait la figure. La tête est centrée en y = 1,14 et son rayon fait 0,31 ; le
       bord est donc posé à 1,30, au-dessus du front ;
    3. un accessoire n'est JAMAIS de la couleur de ce qu'il touche (piège n° 17 des
       entiers) : le casque est JAUNE sur une tête couleur peau, le niveau est GRIS
       CLAIR dans une main couleur peau, et sa bulle est verte ;
    4. le bras part de l'ÉPAULE (x = ±0,36, le bord du torse), pas du milieu du buste —
       défaut n° 1 de Jean-Bernard, revu sur Kelly (E7) ;
    5. ⛔ LES JAMBES : sans elles, le torse se lit comme un buste coupé à mi-corps (Kelly,
       E7, vu seulement au gros plan ×2,8). Elles font 0,50, la moitié du torse."""
    corps = RoundedRectangle(width=0.94, height=1.10, corner_radius=0.22,
                             fill_color=BLEU_TRAVAIL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.25))
    # ⚠️ Les bretelles du bleu de travail : deux traits CLAIRS sur le bleu, sinon elles
    # disparaissent dans le torse (c'est le piège n° 17, dans sa version la plus discrète).
    bretelles = VGroup(Line(P(-0.26, 0.78), P(-0.26, 0.10), stroke_width=5, color=OUTIL),
                       Line(P(0.26, 0.78), P(0.26, 0.10), stroke_width=5, color=OUTIL))
    jambes = VGroup(Line(P(-0.21, -0.28), P(-0.24, -0.78), stroke_width=13,
                         color=BLEU_TRAVAIL),
                    Line(P(0.21, -0.28), P(0.26, -0.78), stroke_width=13,
                         color=BLEU_TRAVAIL))
    tete = Circle(radius=0.31, fill_color=PEAU, fill_opacity=1,
                  stroke_width=0).move_to(P(0, 1.14))
    # ⛔⛔ VU AU GROS PLAN (×2) AVANT LE PREMIER RENDU : avec un dôme en ARC et un bord
    # posé à 1,30, le casque flottait au-dessus du crâne (le haut de la tête est à 1,45)
    # et son bord barrait le visage à hauteur des yeux — on lisait un sombrero, ou une
    # auréole. C'est exactement la visière de Jean-Bernard (E4), et le dessin est le seul
    # instrument qui le voit. ⭐ Le dôme est maintenant un demi-disque PLEIN (un arc
    # laisse du noir entre le crâne et le trait) et le bord est posé à 1,44, c'est-à-dire
    # SUR le haut du crâne et non dedans.
    dome = AnnularSector(inner_radius=0, outer_radius=0.37, angle=PI, start_angle=0,
                         fill_color=CASQUE, fill_opacity=1, stroke_width=0)
    dome.move_to(P(0, 1.44 + 0.185))
    bord = RoundedRectangle(width=0.98, height=0.12, corner_radius=0.06,
                            fill_color=CASQUE, fill_opacity=1,
                            stroke_width=0).move_to(P(0, 1.44))
    bras_g = Line(P(-0.36, 0.62), P(-0.78, 0.40), stroke_width=9, color=PEAU)
    bras_d = Line(P(0.36, 0.62), P(0.72, 0.30), stroke_width=9, color=PEAU)
    # Le NIVEAU : l'outil du métier, et c'est lui que la voix met en scène
    # (« il vérifie au niveau dans un sens »). Il est en AMBRE sur son bord, parce que
    # c'est ce qu'on regarde dans cet épisode.
    niveau = VGroup(RoundedRectangle(width=0.86, height=0.17, corner_radius=0.05,
                                     fill_color=OUTIL, fill_opacity=1,
                                     stroke_color=C_REGARD, stroke_width=3),
                    Dot(radius=0.05, color=VERT_OK))
    niveau.move_to(P(-1.08, 0.33))
    niveau[1].move_to(niveau[0].get_center())
    return VGroup(jambes, corps, bretelles, bras_g, bras_d, tete, bord, dome,
                  niveau).scale(s)


def poteau_vue(penche=False, s=1.0):
    """UNE VUE DU POTEAU SUR SA DALLE — droite si `penche` est faux, penchée sinon.

    ⭐⭐ C'EST LE SCHÉMA QUI PORTE TOUT L'ÉPISODE, et c'est un schéma PLAN : rien n'y est
    projeté, donc rien n'y ment. Les deux vues côte à côte disent exactement ce que dit
    la voix — « un poteau peut être droit vu de face et penché vu de côté » — et c'est
    la raison pour laquelle un seul produit scalaire ne suffit pas.
    ⛔ Un morceau de plan en cavalière à cet endroit aurait fait croire à une figure de
    l'espace, dans un épisode dont les deux plans se projettent justement sur une lame.
    ⚠️ La dalle est HORIZONTALE et le poteau MONTE : dans un schéma plan comme dans la
    cavalière, ce qui doit paraître horizontal se dessine selon x (leçon du pont, E5)."""
    dalle = RoundedRectangle(width=1.50, height=0.17, corner_radius=0.04,
                             fill_color=C_PLAN, fill_opacity=0.35,
                             stroke_color=C_PLAN, stroke_width=3).move_to(P(0, -0.09))
    haut = P(0.46, 1.18) if penche else P(0, 1.18)
    poteau = Line(P(0, 0), haut, stroke_width=13, color=C_POINT)
    g = VGroup(dalle, poteau)
    if penche:
        # ⭐ La VERTICALE en pointillé à côté du poteau penché : sans elle, « penché » ne
        # se voit pas — il n'y a rien par rapport à quoi juger. Avec elle, l'écart saute
        # aux yeux (c'est la leçon « la route doit passer SOUS le pont quelque part », E5).
        g.add(DashedLine(P(0, 0), P(0, 1.18), dash_length=0.09).set_stroke(C_FANTOME, 3))
        g.add(VGroup(Line(P(-0.14, -0.14), P(0.14, 0.14)),
                     Line(P(-0.14, 0.14), P(0.14, -0.14)))
              .set_stroke(C_PIEGE, 6).move_to(P(0.62, 1.28)))
    else:
        g.add(VGroup(Line(P(0.02, 0.26), P(0.26, 0.26)),
                     Line(P(0.26, 0.26), P(0.26, 0.02))).set_stroke(VERT_OK, 4))
        # ⛔ VU AU GROS PLAN : posée sur le haut du poteau, la coche se lisait comme un
        # poteau TORDU à son sommet. Elle est à côté, dans le vide, comme la croix de
        # l'autre vue.
        g.add(VGroup(Line(P(0.28, 1.26), P(0.37, 1.16)),
                     Line(P(0.37, 1.16), P(0.54, 1.40))).set_stroke(VERT_OK, 6))
    return g.scale(s)


def plan_poteau(s=1.0):
    """LE PLAN P DESSINÉ À PLAT, avec ses deux directions et sa normale.

    ⛔⛔ POURQUOI À PLAT, ET C'EST UNE MESURE : la normale du plan P est (1 ; 1 ; 1), et
    `platitude((1 ; 1 ; 1))` vaut **9,0°** — sous le seuil de 12°. Posé en cavalière, ce
    plan-là se dessine comme une LAME qu'on prend pour du papier vu de champ (c'est le
    défaut payé sur l'épisode 5, et le NOYAU de la projection est documenté dans
    espace3d.py). ⭐ Le remède est celui des manuels : on dessine le plan à plat, en
    parallélogramme, et on ne prétend pas montrer OÙ il est — on montre CE QU'IL EST.
    ⛔ Donc aucun axe sur cet écran : un parallélogramme posé à côté d'axes se lirait
    comme un morceau de plan DU repère, et il serait faux.

    Rend (plan, u, v, n, angles) : les deux directions partent du même point du plan,
    la normale en sort, et les deux petits carrés disent les deux angles droits."""
    coins = [P(-1.55, -0.42), P(1.25, -0.42), P(1.85, 0.42), P(-0.95, 0.42)]
    plan = Polygon(*coins, fill_color=C_PLAN, fill_opacity=0.22,
                   stroke_color=C_PLAN, stroke_width=4)
    o = P(0, 0)
    # ⚠️ Les deux directions sont DANS le parallélogramme : u part vers la droite, v vers
    # le haut à gauche. Elles ne sont pas perpendiculaires à l'écran — et c'est juste :
    # deux vecteurs d'un plan n'ont aucune raison de l'être, l'épisode demande seulement
    # qu'ils ne soient pas colinéaires.
    # ⛔⛔ VU AU GROS PLAN AVANT LE PREMIER RENDU, DEUX FOIS :
    # 1. v pointait vers (0,42 ; 0,56), c'est-à-dire AU-DESSUS du bord haut du
    #    parallélogramme (y = 0,42) : un « vecteur du plan » dessiné HORS du plan, dans
    #    l'écran qui enseigne justement que u et v sont dans P ;
    # 2. le second carré d'angle droit était posé à GAUCHE de n, où il n'y avait aucun
    #    vecteur — il marquait un angle avec le vide.
    # ⭐ u et v partent maintenant de part et d'autre de n (u à droite, v en haut à
    # gauche) : chacun a son carré, et comme les deux carrés partagent le côté porté par
    # n, on lit au pied de la normale la DOUBLE marque des manuels.
    u = Arrow(o, P(1.15, 0), buff=0, stroke_width=6, color=C_VECTEUR,
              max_tip_length_to_length_ratio=0.16)
    v = Arrow(o, P(-0.72, 0.33), buff=0, stroke_width=6, color=C_VECTEUR2,
              max_tip_length_to_length_ratio=0.20)
    n = Arrow(o, P(0, 1.45), buff=0, stroke_width=7, color=C_REGARD,
              max_tip_length_to_length_ratio=0.14)
    # ⚠️ Les deux carrés sont une CONVENTION (« ici, c'est 90° dans l'espace ») et non
    # une mesure : dans un plan dessiné en parallélogramme, l'angle entre n et une
    # direction du plan n'est pas droit SUR LA PAGE. C'est la même convention que
    # `Repere3D.angle_droit`, et la voix dit l'orthogonalité en toutes lettres.
    a1 = VGroup(Line(P(0.20, 0), P(0.20, 0.20)), Line(P(0.20, 0.20), P(0, 0.20)))
    a2 = VGroup(Line(P(-0.20, 0), P(-0.20, 0.20)), Line(P(-0.20, 0.20), P(0, 0.20)))
    angles = VGroup(a1, a2).set_stroke(VERT_OK, 3)
    return VGroup(plan, u, v, n, angles).scale(s)


class PsEspaceOrthogonaliteBase(EcransEspace):
    fichier_marques = "ps_espace_orthogonalite_marques.json"
    nom_voix = "terminale-ps-espace-orthogonalite"

    # ── les outils propres à cet épisode ───────────────────────────────────

    def zero(self, fs=28, color=WHITE):
        """LE CHIFFRE 0, HORS AUDIT — structurel dans cet épisode comme dans E7.
        La voix dit « zéro » en toutes lettres partout (« égale zéro », « le produit
        scalaire vaut zéro »), l'écran écrit 0 : seule écriture juste. Même raison que
        `eq_zero` dans le socle, mais ici le zéro est la CONCLUSION de chaque calcul,
        donc il revient sur sept écrans."""
        return self.sans_audit(self.t("0", fs, color))

    def nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« n⃗ (1 ; 1 ; 1) » : le nom du vecteur AVEC SA FLÈCHE, puis son triplet.
        ⭐ Ambre pour n (ce qu'on regarde), bleu pour u, rose pour v : le code couleur
        annoncé dans la voix.
        ⛔⛔ `self.vec` ET NON `self.t` (décision de Frédéric du 22/11) : « n (1 ; 1 ; 1) »
        sans flèche se lit comme une FONCTION de trois variables."""
        g = VGroup(self.vec(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def cube_repere(self, o, u, rouges=(), fs=24):
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
        ⚠️ `u` reste entre 1,25 et 1,6 : à 0,95 les noms des sommets se touchent."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=2)
        cube = self.sans_audit(r.cube(cote=1, rouges=rouges, couleur=C_POINT, sw=4, fs=fs))
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
        titre = self.t("Démontrer une orthogonalité", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Démontrer une orthogonalité")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        fs = 38
        promesses = (("un produit scalaire nul : c'est prouvé", C_REGARD,
                      "Un produit scalaire nul"),
                     ("mais pour un plan, il en faut DEUX", C_VECTEUR,
                      "mais pour un plan"))
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
        fin = self.t("deux, pas un", 32, VERT_OK).move_to(P(-0.9, -1.55))
        self.au_mot("deux, pas un")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : Marc, et le poteau vérifié dans un seul sens ──────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        m = marc(0.68).move_to(P(-5.60, 0.70))
        self.au_mot("Voici Marc")
        nom = self.t("Marc", 32, JAUNE_TITRE).next_to(m, DOWN, buff=0.20)
        # ⛔ Le garde-fou AVANT le play, et pas après (défaut n° 7 de l'épisode 1, refait
        # sur E4) : un nom centré sous un personnage posé à gauche part hors marge.
        if nom.get_left()[0] < -6.5:
            nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
        self.play(FadeIn(m, shift=UP * 0.2), FadeIn(nom), run_time=0.6)
        self.au_mot("maçon")
        metier = self.t("maçon", 24, GREY_A).next_to(nom, DOWN, buff=0.12)
        if metier.get_left()[0] < -6.5:
            metier.shift(RIGHT * (-6.5 - metier.get_left()[0]))
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)

        # ⭐ LES DEUX VUES ARRIVENT EN DEUX TEMPS, et c'est la leçon qu'elles portent :
        # d'abord la vue où tout va bien, PUIS celle qui contredit — sinon la réponse
        # est à l'écran avant la question.
        self.au_mot("Il plante un poteau")
        v1 = poteau_vue(False, 0.95).move_to(P(-3.30, 0.95))
        self.play(Create(v1[0]), Create(v1[1]), run_time=0.6)
        et1 = self.sans_audit(self.t("vu de face", 24, VERT_OK)).next_to(v1, DOWN, buff=0.18)
        self.au_mot("Il vérifie au niveau dans un sens")
        self.play(FadeIn(v1[2]), FadeIn(v1[3]), FadeIn(et1), run_time=0.6)

        fs = 28
        b1 = self.col(VGroup(self.coche(VERT_OK, 0.15),
                             VGroup(self.t("au niveau,", fs, VERT_OK),
                                    self.t("dans un sens : droit", fs, VERT_OK))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.40)
        self.au_mot("c'est droit")
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Est-ce que cela suffit")
        b2 = self.col(self.t("cela suffit ?", fs, C_REGARD), 1.25)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.5)

        self.au_mot("droit vu de face")
        v2 = poteau_vue(True, 0.95).move_to(P(-1.00, 0.95))
        et2 = self.sans_audit(self.t("vu de côté", 24, C_PIEGE)).next_to(v2, DOWN, buff=0.18)
        self.play(Create(v2[0]), Create(v2[1]), FadeIn(et2), run_time=0.6)
        self.au_mot("penché vu de côté")
        self.play(Create(v2[2]), FadeIn(v2[3]), run_time=0.5)
        b3 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.t("penché", fs, C_PIEGE),
                                    self.t("vu de côté", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 0.05)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Il faut vérifier dans deux directions")
        b4 = self.col(VGroup(self.t("il faut vérifier", fs, C_REGARD),
                             self.t("dans DEUX directions", fs, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.25)
        self.play(FadeIn(b4, shift=RIGHT * 0.12), run_time=0.5)
        # ⭐ La CONCLUSION va à gauche, sous les figures, en grand (défaut n° 4 de E3) :
        # le bas de la colonne de droite est réservé aux lignes COURTES.
        self.au_mot("c'est exactement le théorème de ce chapitre")
        fil = self.t("ce geste de chantier, c'est le théorème de ce chapitre", 26, C_REGARD)
        cad = SurroundingRectangle(fil, color=C_REGARD, buff=0.16, stroke_width=3)
        # ⛔ On pose le GROUPE texte + cadre : gauche() borne le TEXTE, pas le cadre.
        self.gauche(VGroup(fil, cad), -2.70, xmax=4.6)
        self.play(FadeIn(fil, scale=1.05), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 02 : le test, en coordonnées ───────────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Deux vecteurs non nuls sont orthogonaux")
        titre = self.t("Le test de l'orthogonalité", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 28
        # ⭐ LA CONDITION D'ABORD, ET ENCADRÉE : « non nuls » est dit par la voix, et c'est
        # la seule phrase de l'écran qui peut rendre tout le reste faux.
        # ⛔⛔ DEUX LIGNES, ET C'EST UNE MESURE CONTRE LE TITRE : sur E7, un badge de TROIS
        # lignes posé à y = 2,45 montait à 3,25 et s'écrivait sur le titre, qui descend à
        # 2,88 — aucun instrument ne le disait, parce que le titre est posé par `to_edge`
        # et la colonne par `col()`, et la mesure ne les comparait pas. Le haut de la
        # colonne de droite est libre jusqu'à 2,78.
        cond = VGroup(self.t("vecteurs", fs, C_REGARD),
                      self.t("NON NULS", fs, C_PIEGE))
        cond.arrange(DOWN, buff=0.10)
        cadc = SurroundingRectangle(cond, color=C_PIEGE, buff=0.14, stroke_width=3)
        self.col(VGroup(cond, cadc), 2.05)
        self.play(FadeIn(cond, shift=RIGHT * 0.12), Create(cadc), run_time=0.7)
        # ⚠️ Hors audit : la voix dit « leur produit scalaire est nul », donc « zéro » en
        # toutes lettres, et l'écran écrit 0 — seule écriture juste.
        self.au_mot("leur produit scalaire est nul")
        b2 = self.col(self.sans_audit(self.vexpr("u · v = 0", ("u", "v"), 34, VERT_OK)), 0.75)
        b2b = self.col(self.sans_audit(self.vexpr("u ⊥ v", ("u", "v"), 34, VERT_OK)), 0.00)
        # ⚠️ LE GLYPHE ⟺ (U+27FA) A ÉTÉ RENDU AVANT D'ÊTRE EMPLOYÉ, parce que deux
        # caractères de cette série sont sortis en carré « tofu » (le ⚠ de E1, la flèche
        # combinante U+20D7 de E7). Il se dessine, et il se distingue bien de ⟹ (U+27F9),
        # qui n'a qu'une pointe. ⊥ (U+22A5) a été vérifié de la même façon.
        # ⭐ Il est CENTRÉ sous la première formule : aligné à gauche de la colonne, il se
        # lisait comme un soulignement.
        fl = self.sans_audit(self.t("⟺", 34, GREY_A))
        fl.move_to(P(0, 0.38)).align_to(P(float(b2.get_center()[0]), 0), LEFT)
        fl.shift(LEFT * fl.width / 2)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.5)
        self.play(FadeIn(fl), FadeIn(b2b, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("c'est un calcul de trois secondes")
        b3 = self.col(VGroup(self.t("un calcul de", fs, GREY_A),
                             self.t("trois secondes", fs, GREY_A))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.10)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.5)

        # ── l'exemple, à GAUCHE, du haut vers le bas ──────────────────────
        # ⚠️ xmax = 1,9 tant que la colonne de droite est occupée (son dernier bloc
        # descend à −1,33) ; en dessous, la largeur est libre jusqu'à Ti-Margo.
        self.au_fin("u de coordonnées 2, 1, moins 1")
        lu = self.gauche(self.nomme("u", U02, C_VECTEUR, 32), 2.35, xmax=1.9)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("v de coordonnées 1, moins 1, 1")
        lv = self.gauche(self.nomme("v", V02, C_VECTEUR2, 32), 1.55, xmax=1.9)
        self.play(FadeIn(lv, shift=RIGHT * 0.12), run_time=0.5)

        # ⭐ Les trois produits sont posés ENSEMBLE puis montrés un à un : construits
        # ligne par ligne, le bloc se recentrerait à chaque fois (et le sursaut ne se
        # voit qu'à l'image). Même raison que l'accolade de `systeme` dans le socle.
        produits = (("les x :", "2 × 1 = 2", "2 fois 1 fait 2"),
                    ("les y :", "1 × (−1) = −1", "1 fois moins 1 fait moins 1"),
                    ("les z :", "(−1) × 1 = −1", "moins 1 fois 1 fait moins 1"))
        rangs = [VGroup(self.t(g, 26, GREY_A), self.t(d, 30, WHITE))
                 .arrange(RIGHT, buff=0.22) for g, d, _ in produits]
        bloc = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        # ⚠️ −0,25 et non −0,55, VU À LA PLANCHE : à −0,55 il restait 1,14 de noir entre
        # v et la première ligne de calcul, et le regard tombait dans le trou.
        self.gauche(bloc, -0.25, xmax=1.9)
        for r_, (_, _, extrait) in zip(rangs, produits):
            self.au_fin(extrait)
            self.play(FadeIn(r_, shift=RIGHT * 0.12), run_time=0.45)
        # ⚠️ La somme est hors audit : la voix l'énonce EN LETTRES (« Deux moins un moins
        # un : zéro »), donc chaque chiffre affiché sortirait en ABSENT ou en TARD sur
        # une autre occurrence.
        self.au_mot("Deux moins un moins un")
        tot = VGroup(self.t("total :", 28, GREY_A),
                     self.sans_audit(self.t("2 − 1 − 1 = 0", 34, VERT_OK)))
        tot.arrange(RIGHT, buff=0.22)
        cadt = SurroundingRectangle(tot[1], color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(tot, cadt), -2.30, xmax=4.6)
        self.play(FadeIn(tot, shift=UP * 0.1), Create(cadt), run_time=0.7)
        self.au_mot("Ils sont orthogonaux")
        ort = self.gauche(self.sans_audit(self.vexpr("u et v sont orthogonaux",
                                                     ("u", "v"), 30, VERT_OK)),
                          -3.10, xmax=4.6)
        self.play(FadeIn(ort, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 03 : LE théorème du chapitre ───────────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("le théorème qui porte tout le chapitre")
        titre = self.t("Le théorème du chapitre", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⛔ 28 ET NON 30, ET C'EST UNE MESURE : à 30 la deuxième rangée fait 11,20 de
        # large pour un plafond de 10,60, donc `scale_to_fit_width` réduisait TOUT le
        # tableau de 5,3 % — c'est le défaut payé sur la finale de E7, où personne ne
        # l'aurait vu. À 28, la plus large fait 10,51 : aucune réduction.
        fs = 28
        # ⭐ Un tableau se lit en RANGÉES sur toute la largeur, pas dans la colonne de
        # droite : chaque rangée est « l'idée → ce qu'elle dit ». Recette des écrans 03
        # de E5, E6 et E7 : on arrange, on borne à 10,6 et on centre en −0,75, à l'écart
        # de Ti-Margo (x ≥ 5,54).
        # ⚠️ LES LIBELLÉS DE GAUCHE SONT COURTS, ET C'EST MESURÉ : au-delà de 10,60 de
        # large, `scale_to_fit_width` réduit le tableau de quelques pour cent — invisible
        # à l'œil, et c'est exactement ce que la mesure existe pour voir (E7 : la finale
        # réduite de 27 % sans que rien ne le dise).
        lignes = (("la droite :", C_VECTEUR,
                   "son vecteur directeur est orthogonal", WHITE,
                   "Une droite est orthogonale à un plan"),
                  ("à deux vecteurs :", C_REGARD, "du plan, et NON COLINÉAIRES", C_PIEGE,
                   "orthogonal à deux vecteurs non colinéaires"),
                  ("son nom :", C_PLAN, "un vecteur NORMAL au plan", VERT_OK,
                   "ce vecteur est normal au plan"))
        rangs, extraits = [], []
        for k, (g, cg, d, cd, extrait) in enumerate(lignes, start=1):
            rangs.append(VGroup(self.pastille(k), self.t(g, fs, cg), self.t(d, fs, cd))
                         .arrange(RIGHT, buff=0.24))
            extraits.append(extrait)
        rangees = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.50)
        if rangees.width > 10.6:
            rangees.scale_to_fit_width(10.6)
        rangees.move_to(P(-0.75, 0.85))
        # ⛔⛔ L'ORDRE EST CELUI DE LA VOIX, PAS CELUI DU TABLEAU, ET C'EST LE DRY RUN
        # QUI L'A DIT : la voix dit « Deux vecteurs, pas un. Et non colinéaires, sinon… »
        # AVANT « on dit que ce vecteur est normal au plan ». Les trois rangées jouées à
        # la suite mettaient donc ces deux blocs 9,07 s et 5,97 s EN RETARD. La troisième
        # rangée se révèle après eux — le tableau est construit d'un bloc, seule la
        # révélation suit la voix. (Même défaut qu'à l'écran 04b de E6.)
        for b, extrait in zip(rangs[:2], extraits[:2]):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1:], shift=RIGHT * 0.15),
                      run_time=0.5)
        # ⭐ La ligne qu'on oublie, reprise en grand sous le tableau : c'est elle que
        # l'écran 08 met en quatrième position de la copie, et elle vaut un point.
        self.au_mot("Deux vecteurs, pas un")
        deux = self.gauche(self.t("DEUX vecteurs, pas un", 32, C_PIEGE), -1.55, xmax=4.6)
        self.play(FadeIn(deux, shift=UP * 0.1), run_time=0.6)
        self.au_mot("sinon ils donnent deux fois la même direction")
        # ⛔ DEUX LIGNES, MESURÉ : d'un seul tenant cette phrase et son cadre dépassent
        # les 11,10 offerts à gauche.
        rap = VGroup(self.t("et non colinéaires : sinon, ils donnent", 28, C_REGARD),
                     self.t("deux fois la même direction", 28, C_REGARD))
        rap.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(rap, color=C_REGARD, buff=0.16, stroke_width=3)
        self.gauche(VGroup(rap, cad), -2.75, xmax=4.6)
        self.play(FadeIn(rap, scale=1.04), Create(cad), run_time=0.8)
        # ⭐ Et SEULEMENT MAINTENANT la troisième rangée : « quand c'est le cas, on dit
        # que ce vecteur est normal au plan » est la dernière phrase du clip.
        self.au_mot(extraits[2])
        self.play(FadeIn(rangs[2][0], scale=1.3), FadeIn(rangs[2][1:], shift=RIGHT * 0.15),
                  run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : A) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ Le dessin porte la DONNÉE (les deux triplets), jamais la RÉPONSE : aucun
        # calcul, aucune flèche, aucun angle droit. Tout arrive en 04b.
        # ⚠️ Cartes de 6,3 à partir de x = 0,35 (donc jusqu'à 6,65) : la donnée de gauche
        # s'arrête avant x = 0,15, d'où xmax = −0,1. C'est le réglage de l'épisode 5, et
        # il est nécessaire ici parce que « non, car leurs coordonnées ne sont pas
        # proportionnelles » fait 56 caractères, qu'une carte de 4,1 ramènerait à ~15 px.
        lu = self.gauche(self.nomme("u", U04, C_VECTEUR, 34), 2.30, xmax=-0.1)
        lv = self.gauche(self.nomme("v", V04, C_VECTEUR2, 34), 1.45, xmax=-0.1)
        # ⚠️ Le choix A porte un 0 que la voix dit « zéro » : la carte entière est donc
        # hors audit (même raison que `self.zero`).
        cA = self.sans_audit(self.choix2("oui, le produit", "scalaire vaut 0", fs=28))
        # ⛔ LA CARTE B PORTE UN NOMBRE, ET LE DRY RUN L'A DIT : posée à son premier mot,
        # « non, il vaut −8 » mettait le 8 à l'écran **1,05 s avant** qu'il soit prononcé
        # (AUDIT-AVANCE). ⭐ `.nb` fait attendre `q_montrer_choix` jusqu'à la dernière
        # marque DANS le choix — c'est le mécanisme que l'épisode 7 emploie pour son
        # choix-triplet, et c'est le piège n° 6 des entiers dans une carte de choix.
        cB = self.t("non, il vaut −8", 28, WHITE)
        cB.nb = [cB]
        # ⛔⛔ TROIS LIGNES POUR LA CARTE C, ET C'EST UNE MESURE : sur deux lignes,
        # « ne sont pas proportionnelles » (28 caractères) tombe à **22,5 px** — une carte
        # de 6,3 n'offre que 5,15 à son texte, soit ~23 caractères à 28 px. C'est le
        # défaut n° 4 de l'épisode 1 sous sa forme habituelle. Sur trois lignes de
        # 19 caractères au plus, les trois cartes tiennent à 27,8 px.
        # ⭐ Et UNE SEULE des trois est sur trois lignes (la plus longue) : c'est le
        # remède mesuré de l'épisode 6, où ajouter une ligne aux TROIS les rapetissait.
        cC = self.choix3("non, car leurs", "coordonnées ne sont",
                         "pas proportionnelles", fs=28)
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t("Sont-ils orthogonaux ?", 32)], [cA, cB, cC],
            largeur=6.3, xl=0.35)
        # ⛔⛔ LA PAUSE EST DÉPLACÉE À GAUCHE, ET C'EST UNE MESURE : avec la carte C sur
        # trois lignes, `q_tete` la pose à −2,24 — sous −2,15, là où commence la boîte de
        # Ti-Margo, et elle lui couperait la tête (piège n° 33 des entiers). Les cartes
        # elles-mêmes s'arrêtent à −1,59 : il n'y a que la pause à reposer, et le bas
        # gauche de l'écran est libre (u et v s'arrêtent à y = 0,38).
        pause.move_to(P(0, -3.05)).align_to(P(-6.5, 0), LEFT)
        rebours.next_to(pause, RIGHT, buff=0.35)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        # ⛔⛔ CHAQUE ATTENTE EST COLLÉE À SON `play`, ET C'EST LE DRY RUN QUI L'A DIT :
        # les deux `au_fin` groupés en tête de méthode attendaient la fin de v AVANT de
        # montrer u, donc le « 1 » de u s'affichait **4,93 s** après avoir été prononcé
        # (AUDIT-TARD). Un `au_fin` ne place rien : il attend. Il doit donc être juste
        # devant le `play` qu'il règle.
        self.au_fin("u a pour coordonnées 1, 2, moins 2")
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("v a pour coordonnées 2, moins 3, moins 2")
        self.play(FadeIn(lv, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Sont-ils orthogonaux")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "A")
        self.mem_q1 = (cartes, pause, rebours)

    def ecran_reponse1(self):
        cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent par-dessus l'explication (défaut n° 1 de l'épisode 1).
        self.q_reponse(cartes, 0, pause, rebours)
        # ⛔⛔ CET ÉCRAN HÉRITE DE L'ÉCRAN 04, ET C'EST LA CINQUIÈME RÉCIDIVE DANS LA SÉRIE :
        # u (1 ; 2 ; −2) reste à y = 1,50 et v (2 ; −3 ; −2) à 0,60 — ce sont les DONNÉES
        # de l'exercice, elles ne s'effacent pas. Le calcul est donc UN SEUL bloc posé
        # SOUS elles, et sa cote vient de la mesure : le haut du bloc est comparé au bas
        # de v, pas au `y` qu'on avait en tête.
        # ⭐ Cinq lignes d'un bloc, parce qu'un calcul se lit d'un bloc : les trois
        # produits, la raison du signe, puis la somme.
        lignes_c = (self.t("1 × 2 = 2", 32, WHITE),
                    self.t("2 × (−3) = −6", 32, WHITE),
                    self.t("(−2) × (−2) = +4", 32, WHITE),
                    self.t("moins par moins fait PLUS", 24, C_REGARD),
                    self.sans_audit(self.t("2 − 6 + 4 = 0", 36, VERT_OK)))
        calc = VGroup(*lignes_c).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(calc, -0.60, xmax=-0.1)
        ancres = (("1 fois 2 fait 2", True), ("2 fois moins 3 fait moins 6", True),
                  ("moins 2 fois moins 2 fait plus 4", True),
                  ("moins par moins fait plus", False),
                  ("Deux, moins six, plus quatre", False))
        for mob, (extrait, fin) in zip(lignes_c, ancres):
            self.au_fin(extrait) if fin else self.au_mot(extrait)
            self.play(FadeIn(mob, shift=RIGHT * 0.12), run_time=0.45)

        # ── les deux leurres, nommés ──────────────────────────────────────
        # ⛔ au_fin ET NON au_mot : posée à « Si », cette ligne mettrait son « 8 » à
        # l'écran avant qu'il soit dit. C'est le piège n° 6 des entiers — une ligne qui
        # porte un nombre se pose à l'instant de CE nombre — et il revient à chaque
        # épisode de la série.
        self.au_fin("Si tu as trouvé moins 8")
        lB = VGroup(self.croix(r=0.12), self.t("−8", 30, C_PIEGE),
                    self.t(": ce dernier signe t'a échappé", 26, C_PIEGE))
        lB.arrange(RIGHT, buff=0.18)
        self.gauche(lB, -2.20, xmax=4.6)
        self.play(FadeIn(lB, shift=RIGHT * 0.12), run_time=0.5)
        # ⭐ Le leurre C est le plus intéressant de l'épisode : il est VRAI et hors sujet.
        # C'est pour ça qu'il est encadré en ambre et pas barré en rouge.
        self.au_mot("la réponse C confond deux notions")
        # ⛔ DEUX LIGNES, MESURÉ : d'un seul tenant cette phrase fait 13,58 de large pour
        # les 11,10 offerts à gauche, donc `gauche()` la rétrécissait — et c'est la
        # phrase qui explique le leurre le plus intéressant de l'épisode.
        # ⚠️ 24 ET NON 26, MESURÉ AU CENTIÈME : à 26 le bas du cadre tombe à −3,570,
        # c'est-à-dire TROIS MILLIÈMES au-dessus de la marge de 3 % (−3,573). C'est le
        # genre d'écart qu'aucune relecture ne voit, et le dry run l'aurait signalé.
        lC = VGroup(self.sans_audit(self.vexpr(
            "non proportionnelles = u et v non colinéaires :", ("u", "v"), 24, C_REGARD)),
            self.t("ça ne dit rien de l'orthogonalité", 24, C_REGARD))
        lC.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cadc = SurroundingRectangle(lC, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(lC, cadc), -3.00, xmax=4.6)
        self.play(FadeIn(lC, scale=1.04), Create(cadc), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 05 : le théorème appliqué ──────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons le théorème du poteau")
        titre = self.t("Le théorème du poteau", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        # ⛔⛔ LE PLAN EST DESSINÉ À PLAT, ET C'EST UNE MESURE : `platitude((1 ; 1 ; 1))`
        # vaut 9,0°, sous le seuil de 12° — en cavalière, ce plan-là serait une lame
        # (voir `plan_poteau` et le NOYAU dans espace3d.py). Donc AUCUN axe sur cet écran.
        sch = plan_poteau(1.0).move_to(P(-4.35, 1.05))
        self.play(Create(sch[0]), run_time=0.6)
        # ⛔ L'étiquette va du côté où le vecteur ne va PAS (défaut vu au gros plan sur
        # E7, deux fois) : n monte → son nom part à GAUCHE ; u va à droite → DESSOUS ;
        # v fuit en haut à droite → à DROITE de sa pointe.
        self.au_fin("n a pour coordonnées 1, 1, 1")
        # ⛔ L'étiquette va du côté où le vecteur ne va PAS (défaut vu au gros plan sur
        # E7, deux fois) : n monte → son nom part à DROITE, du côté laissé libre depuis
        # que v part vers la gauche ; u va à droite → DESSOUS ; v part en haut à gauche
        # → son nom va AU-DESSUS de sa pointe.
        en = self.vec("n", 30, C_REGARD).next_to(sch[3], RIGHT, buff=0.14)
        self.play(GrowArrow(sch[3]), FadeIn(en), run_time=0.6)
        ln = self.col(self.nomme("n", N05, C_REGARD, 30), 2.40)
        self.play(FadeIn(ln, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("u de coordonnées 1, moins 1, 0")
        eu = self.vec("u", 30, C_VECTEUR).next_to(sch[1], DOWN, buff=0.12)
        self.play(GrowArrow(sch[1]), FadeIn(eu), run_time=0.5)
        lu = self.col(self.nomme("u", U05, C_VECTEUR, 30), 1.60)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("v de coordonnées 0, 1, moins 1")
        ev = self.vec("v", 30, C_VECTEUR2).next_to(sch[2], UP, buff=0.08)
        self.play(GrowArrow(sch[2]), FadeIn(ev), run_time=0.5)
        lv = self.col(self.nomme("v", V05, C_VECTEUR2, 30), 0.80)
        self.play(FadeIn(lv, shift=RIGHT * 0.12), run_time=0.45)

        fs = 28
        # ⛔ DEUX LIGNES CHACUN, ET C'EST UNE MESURE : d'un seul tenant
        # « n · u = 1 − 1 + 0 = 0 » dépasse les 4,40 de la colonne de droite, donc
        # `col()` le rétrécirait — c'est-à-dire que LA LIGNE QUI PORTE LA DÉMONSTRATION
        # deviendrait le plus petit texte de l'écran (défaut n° 4 de l'épisode 3).
        self.au_fin("1 moins 1 plus 0, égale zéro")
        p1 = self.col(VGroup(self.sans_audit(self.vexpr("n · u =", ("n", "u"), fs, GREY_A)),
                             VGroup(self.t("1 − 1 +", fs, WHITE), self.zero(fs),
                                    self.t("=", fs, WHITE), self.zero(fs, VERT_OK))
                             .arrange(RIGHT, buff=0.14))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -0.15)
        # ⛔⛔ LE CARRÉ D'ANGLE DROIT ARRIVE AVEC SON PRODUIT SCALAIRE — et il était
        # CONSTRUIT, BIEN PLACÉ, ET JAMAIS JOUÉ : `plan_poteau` rend cinq morceaux et
        # l'écran n'en montrait que quatre. Vu au gros plan ×2,6, par rien d'autre :
        # aucun outil ne voit un mobjet qu'on a oublié de jouer (défaut de E6, l. 07b).
        # ⭐ Et c'est mieux ainsi : chaque angle droit paraît quand on PROUVE qu'il est
        # droit, pas avant.
        self.play(FadeIn(p1, shift=RIGHT * 0.12), Create(sch[4][0]), run_time=0.55)
        self.au_fin("zéro plus 1 moins 1, égale zéro")
        p2 = self.col(VGroup(self.sans_audit(self.vexpr("n · v =", ("n", "v"), fs, GREY_A)),
                             VGroup(self.zero(fs), self.t("+ 1 − 1 =", fs, WHITE),
                                    self.zero(fs, VERT_OK))
                             .arrange(RIGHT, buff=0.14))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -1.30)
        self.play(FadeIn(p2, shift=RIGHT * 0.12), Create(sch[4][1]), run_time=0.55)

        # ── la ligne qu'on oublie, à GAUCHE sous le schéma ────────────────
        # ⚠️ xmax = 1,9 : la colonne de droite est encore occupée à cette hauteur-là
        # (« n · v » descend à −1,53), donc un bloc posé jusqu'à 4,6 s'écrirait DESSUS.
        # C'est le défaut n° 1 de l'épisode 3, attrapé par la mesure et non par la planche.
        self.au_mot("u et v ne sont pas colinéaires")
        nc = VGroup(self.coche(VERT_OK, 0.14),
                    VGroup(self.sans_audit(
                        self.vexpr("u et v ne sont pas colinéaires :", ("u", "v"),
                                   26, VERT_OK)),
                        self.sans_audit(
                        self.vexpr("la première coordonnée de v est nulle,", ("v",),
                                   26, VERT_OK)),
                        self.sans_audit(
                        self.vexpr("celle de u ne l'est pas", ("u",), 26, VERT_OK)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        nc.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(nc, -1.55, xmax=1.9)
        self.play(FadeIn(nc[0], shift=RIGHT * 0.12), FadeIn(nc[1][0], shift=RIGHT * 0.12),
                  run_time=0.5)
        # ⛔ `nc[1][1:]` et non `nc[1][1]` : le bloc fait TROIS lignes, et un `play` sur
        # un seul index en laisserait une construite, bien placée, et jamais jouée
        # (défaut de l'épisode 6, l.07b).
        self.au_mot("la première coordonnée de v est nulle")
        self.play(FadeIn(nc[1][1:], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("c'est un vecteur normal à P")
        nor = self.sans_audit(self.vexpr("n est un vecteur NORMAL au plan P", ("n",),
                                         30, VERT_OK))
        cadn = SurroundingRectangle(nor, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(nor, cadn), -3.05, xmax=4.6)
        self.play(FadeIn(nor, scale=1.06), Create(cadn), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège le plus coûteux du chapitre ──────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ Le glyphe ⚠ ne se rend pas (carré « tofu ») : on DESSINE le triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Un seul ne suffit pas", 42, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.9)
        fs = 28
        b1 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.t("un seul produit", fs, C_PIEGE),
                                    self.t("scalaire nul", fs, C_PIEGE),
                                    self.t("ne suffit PAS", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.05)
        # ⚠️ 2,05 ET NON 2,25, MESURÉ CONTRE LE TITRE : ce bloc fait TROIS lignes, donc à
        # 2,25 il monte à 2,82 et le titre de cet écran descend à 2,80 — deux centièmes,
        # et il s'écrivait dessus. C'est le défaut payé sur l'écran 02 de E7.
        self.au_mot("Un seul produit scalaire nul ne suffit pas")
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("peut même être dans le plan")
        b2 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.t("il peut même", fs, C_PIEGE),
                                    self.t("être DANS le plan", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 0.75)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.55)

        # ── le contre-exemple du SOL, en cavalière ────────────────────────
        # ⭐ Celui-là se projette très bien : `platitude((0 ; 0 ; 1))` = 14,9°, au-dessus
        # du seuil de 12° (⛔ contrairement au plan P de l'écran 05). On peut donc le
        # dessiner comme un vrai morceau de plan — et c'est le sol, l'élève le reconnaît.
        self.au_mot("au sol, la direction du nord")
        # ⚠️ TOUTES CES COTES SONT MESURÉES, et la première version ne tenait pas : à
        # u = 1,15 avec sa verticale, la figure montait à 3,13 et s'écrivait SUR LE TITRE
        # (qui descend à 2,80). À u = 1,02 et avec l'étiquette « la verticale » posée à
        # DROITE du bout de la flèche plutôt qu'au-dessus, elle tient dans
        # y ∈ [0,36 ; 2,45] — il reste 0,35 jusqu'au titre.
        r = Repere3D(o=np.array([-5.40, 0.80, 0.0]), u=1.02, portee=2)
        # ⛔⛔ LES DEUX FLÈCHES SORTAIENT DU SOL, ET C'EST L'ÉCRAN QUI DIT « LE NORD EST
        # AU SOL » : vu au gros plan ×3, la pointe de « nord » passait au-dessus du bord
        # haut du parallélogramme et celle d'« est » dépassait son bord droit. Une figure
        # qui contredit sa propre légende. Recalculé : avec demi = 1,15 centré en
        # (0,6 ; 0,6), le morceau de sol projeté va de (−0,78 ; −0,16) à (2,47 ; 0,50) ;
        # le projeté de (0 ; 1,5 ; 0) est (0,615 ; 0,431) et celui de (1,45 ; 0 ; 0) est
        # (1,45 ; 0) — les deux sont DEDANS, et la mesure le vérifie.
        sol = self.sans_audit(r.plan((0, 0, 1), d=0.0, centre=(0.6, 0.6, 0), demi=1.15,
                                     couleur=C_PLAN, op=0.22))
        fn = r.vecteur((0, 0, 0), (0, 1.5, 0), "nord", couleur=C_VECTEUR, sw=6, fs=24,
                       decal=UL, fleche_nom=False)
        fe = r.vecteur((0, 0, 0), (1.45, 0, 0), "est", couleur=C_VECTEUR2, sw=6, fs=24,
                       decal=DOWN, fleche_nom=False)
        # ⚠️⚠️ EN CAVALIÈRE, UN ANGLE DROIT N'EST PAS DROIT À L'ÉCRAN : nord et est font
        # 35° sur l'image alors qu'ils sont orthogonaux dans l'espace. Ce petit carré est
        # donc une CONVENTION qui dit « ici, c'est 90° », et la voix le dit en toutes
        # lettres (« la direction du nord est orthogonale à la direction de l'est »).
        droit = self.sans_audit(r.angle_droit((0, 0, 0), (0, 1, 0), (1, 0, 0),
                                              taille=0.26, couleur=VERT_OK, sw=3))
        # ⚠️ `fleche_nom=False` ET C'EST VOULU : « nord » et « est » ne sont pas des NOMS
        # de vecteur, ce sont des directions nommées en français. Une flèche dessinée
        # au-dessus du mot « nord » serait une faute de notation.
        # ⛔ VU AU GROS PLAN ×3 : `decal=UL` s'applique au MILIEU du vecteur, et « nord »
        # est COURT en cavalière (son projeté fait 0,615 ; 0,431), donc son milieu est
        # près de l'origine et l'étiquette tombait SUR le bord cyan du sol. On la
        # décale à la main : `decal` ne suffit pas pour un vecteur court (c'est le piège
        # payé sur le v de l'écran 06 de E7).
        fn.nom.shift(UP * 0.16 + LEFT * 0.12)
        self.play(FadeIn(sol), run_time=0.5)
        self.play(GrowArrow(fn[0]), FadeIn(fn.nom), GrowArrow(fe[0]), FadeIn(fe.nom),
                  Create(droit), run_time=0.6)
        self.au_mot("il n'est pas vertical")
        vert = DashedLine(r.pt(0, 0, 0), r.pt(0, 0, 1.5), dash_length=0.1)
        vert.set_stroke(VERT_OK, 4)
        # ⚠️ À DROITE du bout de la flèche, et non au-dessus : posée au-dessus, cette
        # étiquette portait la figure jusqu'à 3,13 et touchait le titre.
        et_v = self.sans_audit(self.t("la verticale", 22, VERT_OK))
        et_v.next_to(vert.get_end(), RIGHT, buff=0.10)
        # ⭐ La légende est accrochée SOUS la figure (`next_to`) et non posée à un y
        # choisi : la figure a changé trois fois de taille, et une cote recopiée aurait
        # survécu à ces changements sans avoir raison (leçon de l'épisode 5).
        sous = self.sans_audit(self.t("le nord est AU SOL : il n'est pas vertical",
                                      24, C_REGARD))
        sous.next_to(VGroup(sol, fn, fe), DOWN, buff=0.16).align_to(P(-6.3, 0), LEFT)
        self.play(Create(vert), FadeIn(et_v), FadeIn(sous), run_time=0.7)

        # ── le second piège : orthogonales SANS être sécantes ─────────────
        # ⭐⭐ LA PAIRE D'ARÊTES EST CHOISIE PAR LA MESURE, PAS À VUE (leçon de l'écran 06
        # de E6) : à l'écran, [A B] va de (0 ; 0) à (1 ; 0) — horizontale — et [C G] de
        # (1,41 ; 0,287) à (1,41 ; 1,287) — verticale. Elles PARAISSENT donc
        # perpendiculaires (ce qu'elles sont dans l'espace) et il reste 0,41 unité entre
        # la fin de l'une et l'autre : on voit qu'elles ne se rencontrent pas.
        self.au_mot("Deuxième piège")
        b3 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.t("orthogonales,", fs, C_PIEGE),
                                    self.t("mais pas sécantes", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.75)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("elles ne se rencontrent jamais")
        # ⚠️ o_y = −2,12 MESURÉ : le cube occupe y de o_y − 0,42 à o_y + 1,87 une fois
        # ses noms de sommet comptés, donc il tient entre la légende du sol (qui s'arrête
        # à 0,03) et le cadre final (qui monte à −2,81). À −2,70, sa base tombait à
        # −3,12 et le cadre final s'écrivait dessus.
        r2, cube = self.cube_repere(o=(-5.55, -2.12), u=1.15, rouges=())
        ab = Line(r2.pt(*S["A"]), r2.pt(*S["B"])).set_stroke(C_VECTEUR, 9)
        cg = Line(r2.pt(*S["C"]), r2.pt(*S["G"])).set_stroke(C_VECTEUR2, 9)
        # ⚠️ « [A B] » et « [C G] » entre CROCHETS : ce sont des ARÊTES, donc des
        # segments, pas des vecteurs — c'est la notation qui le dit, et c'est aussi ce
        # qui évite une flèche fausse au-dessus d'un nom de segment.
        e_ab = self.sans_audit(self.t("[A B]", 24, C_VECTEUR)).next_to(ab, DOWN, buff=0.12)
        e_cg = self.sans_audit(self.t("[C G]", 24, C_VECTEUR2)).next_to(cg, RIGHT, buff=0.10)
        self.play(FadeIn(cube), run_time=0.5)
        self.play(Create(ab), Create(cg), FadeIn(e_ab), FadeIn(e_cg), run_time=0.6)
        self.au_mot("On réserve le mot perpendiculaire")
        per = VGroup(self.t("perpendiculaire = orthogonales ET sécantes", 28, C_REGARD))
        cad = SurroundingRectangle(per, color=C_REGARD, buff=0.14, stroke_width=3)
        # ⚠️ −3,15 et non −3,22 : à −3,22 le bas du cadre tombe à −3,56, à un centième de
        # la marge de 3 % (−3,573). C'est la même marge qu'au dernier écran de E6, et
        # c'est le genre d'écart qu'aucune relecture ne voit.
        self.gauche(VGroup(per, cad), -3.15, xmax=4.6)
        self.play(FadeIn(per, scale=1.04), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : C) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ AUCUNE figure : un schéma montrerait tout de suite que n peut être dans le
        # plan, c'est-à-dire la réponse.
        fs = 30
        don = VGroup(self.sans_audit(self.vexpr("n ⊥ u", ("n", "u"), 34, C_REGARD)),
                     self.sans_audit(self.vexpr("et u est un vecteur du plan P", ("u",),
                                                fs, WHITE)))
        don.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        self.gauche(don, 1.55, xmax=-0.1)
        # ⛔⛔ 24 ET NON 28, ET C'EST LA MESURE QUI TRANCHE, pas le goût : les deux
        # derniers choix font 48 et 50 caractères, que la voix dit mot pour mot et qu'on
        # ne raccourcit pas. Mesuré, sur deux lignes dans une carte de 6,3 :
        #   fs 28 → 27,8 / 25,2 / 24,9 px (deux cartes rétrécies, et de tailles inégales)
        #   fs 26 → 25,8 / 24,9 / 24,7 px (idem)
        #   fs 24 → 23,8 / 23,8 / 23,8 px — AUCUNE réduction, et trois cartes identiques.
        # ⛔ Trois lignes à 28 px donneraient 27,8 partout, mais les cartes descendraient
        # à −2,52 : elles entreraient dans la boîte de Ti-Margo (x ∈ [5,54 ; 6,66],
        # y ∈ [−3,55 ; −2,15]). À 24 px sur deux lignes elles s'arrêtent à −1,67.
        fs_c = 24
        cA = self.t("oui, un vecteur suffit", fs_c, WHITE)
        cB = self.choix2("oui, à condition que u", "ne soit pas le vecteur nul", fs=fs_c,
                         noms=("u",))
        cC = self.choix2("non, il faut deux vecteurs", "non colinéaires du plan", fs=fs_c)
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.vexpr("Peut-on en conclure que n", ("n",), 32)),
             self.t("est orthogonal au plan P ?", 32)],
            [cA, cB, cC], largeur=6.3, xl=0.35)
        # ⛔⛔ LA PAUSE EST DÉPLACÉE À GAUCHE, ET C'EST UNE MESURE : avec une question de
        # DEUX lignes et des cartes de cinq lignes en tout, `q_tete` pose la pause sous
        # les cartes, c'est-à-dire sous y = −2,15 — là où commence la boîte de Ti-Margo,
        # et elle lui couperait la tête (piège n° 33 des entiers). Les cartes elles-mêmes
        # s'arrêtent au-dessus de −2,15 : il n'y a que la pause à reposer, et le bas
        # gauche de l'écran est libre.
        pause.move_to(P(0, -3.05)).align_to(P(-6.5, 0), LEFT)
        rebours.next_to(pause, RIGHT, buff=0.35)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Le vecteur n est orthogonal à un vecteur u du plan P")
        self.play(FadeIn(don, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("Peut-on en conclure")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "C")
        self.mem_q2 = (cartes, pause, rebours)

    def ecran_reponse2(self):
        cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        # ⭐⭐ DEUX LARGEURS, parce que les cartes ne descendent que jusqu'à un certain
        # point : les deux premiers blocs les LONGENT (xmax = −0,1), le dernier passe
        # DESSOUS et prend toute la largeur jusqu'à Ti-Margo (xmax = 4,6).
        # ⚠️ Comptés du bas vers le haut : le dernier bloc est un cadre de deux lignes.
        self.au_mot("Une seule direction ne suffit jamais")
        l1 = VGroup(self.coche(VERT_OK, 0.14),
                    VGroup(self.t("une seule direction", 26, VERT_OK),
                           self.t("ne suffit JAMAIS,", 26, VERT_OK),
                           self.t("même bien choisie", 26, VERT_OK))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l1.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(l1, 0.15, xmax=-0.1)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("le vecteur n pourrait être lui-même dans le plan P")
        l2 = VGroup(self.croix(r=0.12),
                    VGroup(self.sans_audit(self.vexpr("n pourrait être", ("n",),
                                                      26, C_PIEGE)),
                           self.t("lui-même DANS le plan,", 26, C_PIEGE),
                           self.t("comme le nord est au sol", 26, C_PIEGE))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l2.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(l2, -1.60, xmax=-0.1)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.12), FadeIn(l2[1][0], shift=RIGHT * 0.12),
                  run_time=0.5)
        # ⛔ `l2[1][1:]` et non `l2[1][1]` : trois lignes, et un `play` sur un seul index
        # en laisserait une construite, bien placée, et jamais jouée (défaut de E6).
        self.au_mot("comme le nord est au sol")
        self.play(FadeIn(l2[1][1:], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Il faut deux vecteurs du plan")
        l3 = VGroup(self.t("DEUX vecteurs du plan, non colinéaires —", 26, C_REGARD),
                    self.t("et on écrit les DEUX produits scalaires", 26, C_REGARD))
        l3.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(l3, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(l3, cad), -3.00, xmax=4.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(cad), run_time=0.5)
        self.au_mot("il faut écrire les deux produits scalaires")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 08 : les CINQ lignes de la copie ───────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Le modèle de rédaction")
        titre = self.t("Cinq lignes, et la quatrième compte", 42, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️ hauteur 3,5 et centre −0,55 : la copie descend à −2,30, au-dessus du rappel
        # posé dessous, qui s'arrête à −3,20 (marge : −3,573).
        copie = RoundedRectangle(width=10.2, height=3.5, corner_radius=0.18,
                                 stroke_color=GREY_B, stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.6, -0.55))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        # ⛔ 24 ET DES LIGNES COURTES, ET C'EST UNE MESURE : sur E7, la première version
        # du modèle faisait 11,27 de large pour les 8,60 que la copie offre, et
        # `scale_to_fit_width` le ramenait à 19,8 px — le MODÈLE DE RÉDACTION devenait le
        # plus petit texte de l'épisode. Ici la mesure dit qu'aucune ligne n'est réduite.
        # ⚠️ Les cinq lignes sont hors audit : ce sont des GABARITS (« (calcul) »), et
        # leurs 0 sont dits « zéro » par la voix.
        fs = 24
        # ⛔ LA PREMIÈRE LIGNE EST COURTE, ET C'EST UNE MESURE : avec « ; u et v sont deux
        # vecteurs du plan P » elle fait 8,89 pour les 8,60 que la copie offre, donc
        # `scale_to_fit_width` ramenait les CINQ lignes de 24 à 23,2 px — le MODÈLE DE
        # RÉDACTION réduit en silence, défaut payé sur E7. Raccourcie, la plus large est
        # la cinquième (7,41) : plus rien n'est réduit.
        points = ((("n (a ; b ; c), u et v vecteurs du plan P", ("n", "u", "v")),
                   C_VECTEUR, "Un : le vecteur n a pour coordonnées"),
                  (("n · u = (calcul) = 0", ("n", "u")), WHITE,
                   "Deux : le produit scalaire de n et u"),
                  (("n · v = (calcul) = 0", ("n", "v")), WHITE,
                   "Trois : le produit scalaire de n et v"),
                  (("u et v ne sont pas colinéaires, car...", ("u", "v")), C_PIEGE,
                   "Quatre :"),
                  (("donc n est un vecteur normal au plan P", ("n",)), VERT_OK,
                   "Cinq : donc n est un vecteur normal"))
        rangs, extraits = [], []
        for k, (txt, coul, extrait) in enumerate(points, start=1):
            corps = self.vexpr(txt[0], txt[1], fs, coul)
            rangs.append(VGroup(self.pastille(k), self.sans_audit(corps))
                         .arrange(RIGHT, buff=0.30))
            extraits.append(extrait)
        lignes = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        # ⛔ VU AU GROS PLAN SUR L'ÉPISODE 5 : à 9,1 le dernier caractère SORTAIT de la
        # copie. La place réelle : la copie va jusqu'à x = 4,5, le texte commence après
        # la marge rouge à −4,65, il reste 9,15 — 8,6 laisse 0,55.
        if lignes.width > 8.6:
            lignes.scale_to_fit_width(8.6)
        lignes.move_to(copie.get_center()).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        for b, extrait in zip(rangs, extraits):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15),
                      run_time=0.4)
        # ⭐ La quatrième ligne est celle qu'on oublie : elle est en rouge dans la copie,
        # et le rappel la désigne par son numéro.
        self.au_mot("La quatrième ligne est celle qu'on oublie")
        rappel = VGroup(self.t("la quatrième ligne est celle qu'on oublie —", 26, C_PIEGE),
                        self.t("et c'est un point perdu à chaque fois", 26, C_PIEGE))
        rappel.arrange(DOWN, buff=0.08)
        cad = SurroundingRectangle(rappel, color=C_PIEGE, buff=0.12, stroke_width=3)
        VGroup(rappel, cad).next_to(copie, DOWN, buff=0.22)
        self.play(FadeIn(rappel, shift=UP * 0.1), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.38), self.t("À toi de jouer !", 42, ORANGE_RETENUE))
        tete.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.5)
        # ⛔ LE DESSIN PORTE LA DONNÉE, JAMAIS LA RÉPONSE : le cube, son repère et les
        # quatre sommets concernés, oui ; les vecteurs A G, B D et B E, NON — ce sont eux
        # que la démonstration doit produire.
        # ⚠️ Repère MESURÉ : o = (−5,90 ; 0,20), u = 1,4.
        r, cube = self.cube_repere(o=(-5.90, 0.20), u=1.4, rouges=("B", "D", "E", "G"))
        self.au_mot("Dans le cube")
        self.play(FadeIn(cube), run_time=0.7)
        self.au_mot("avec le repère A, A B, A D, A E")
        base = self.sans_audit(self.base_repere(r))
        self.play(*[GrowArrow(v[0]) for v in base], run_time=0.7)
        # ⛔⛔ LA CONSIGNE VA À GAUCHE, SOUS LE CUBE : dans la colonne de droite elle fait
        # plus de 6 de large pour 4,40 offerts, donc `col()` la rétrécirait — c'est-à-dire
        # que ce que l'élève doit LIRE pendant qu'il met pause deviendrait le plus petit
        # texte de la vidéo (défaut payé sur l'épisode 6).
        # ⭐ « (A G) » et « (BDE) » : la droite et le plan, dans la notation française.
        # ⛔ PAS de flèche sur eux — une droite n'est pas un vecteur, et c'est justement
        # ce que l'épisode enseigne.
        self.au_mot("démontre que la droite A G est orthogonale au plan B D E")
        # ⚠️ Pas de pastille ici : il n'y a qu'UNE consigne (⛔ contrairement à E7, qui en
        # avait deux). Une pastille « 1 » seule ferait attendre une « 2 » qui n'existe pas.
        cons = VGroup(self.t("démontre que la droite (A G)", 32, WHITE),
                      self.t("est orthogonale au plan (BDE)", 32, WHITE))
        cons.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        self.gauche(cons, -1.65, xmax=4.6)
        self.play(FadeIn(cons, shift=RIGHT * 0.12), run_time=0.6)
        # ⚠️ Le compte à rebours est posé À CÔTÉ de la pause et non dessous : à cette
        # hauteur-là, dessous, il sortirait du cadre.
        self.au_mot("Mets pause, et cherche")
        pause = self.gauche(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -3.05,
                            xmax=4.6)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(pause, RIGHT, buff=0.35)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, cube, base, cons, pause, rebours)

    def ecran_correction(self):
        r, cube, base, cons, pause, rebours = self.mem_defi
        # ⛔ L'écran de correction HÉRITE de l'écran de défi, et l'héritage descend plus
        # bas qu'on ne croit (payé sur E3, E5 PUIS E7). Ce qui s'efface : la consigne, la
        # pause, le rebours — ET les trois flèches du repère, parce que A B part de A
        # comme A G : laissées en place, la flèche de la correction se superposerait à
        # celle de la base, et on lirait une arête doublée au lieu d'un vecteur.
        # Ce qui RESTE : le cube seul, avec ses quatre sommets en ambre.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), FadeOut(base),
                  run_time=0.3)
        self.dire("09b-correction")
        fs = 26
        # ── ① les quatre points, UN SEUL bloc de quatre lignes ────────────
        # ⭐ Un bloc, pas quatre : les coordonnées des sommets se lisent ensemble, et
        # quatre blocs séparés auraient occupé toute la colonne de droite (il reste à y
        # écrire A G, B D, B E).
        pts = (("B", S["B"], "B vaut 1, 0, 0"), ("D", S["D"], "D vaut 0, 1, 0"),
               ("E", S["E"], "E vaut 0, 0, 1"), ("G", S["G"], "et G vaut 1, 1, 1"))
        # ⚠️ Les noms de SOMMET ne portent pas de flèche : ce sont des points. D'où
        # `self.t` et non `self.vec` — et la parenthèse les distingue d'un vecteur.
        rangs = [VGroup(self.t(n, 28, C_REGARD), self.t("(", 28, WHITE),
                        self.trip(t3, 28, WHITE), self.t(")", 28, WHITE))
                 .arrange(RIGHT, buff=0.10) for n, t3, _ in pts]
        bloc = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        self.col(bloc, 1.80)
        for rg, (_, _, extrait) in zip(rangs, pts):
            self.au_fin(extrait)
            self.play(FadeIn(rg, shift=RIGHT * 0.12), run_time=0.35)
        # ── ② A G, puis les deux vecteurs du plan ─────────────────────────
        # ⛔⛔ LES TROIS FLÈCHES N'ONT PAS D'ÉTIQUETTE SUR LA FIGURE, ET C'EST MESURÉ.
        # Le plan (B D E) se projette à 9,0° du noyau de la cavalière : à l'écran, B D et
        # B E ne sont séparés que de 19°, et leurs noms tombent l'un sur l'autre. Les 512
        # combinaisons de `decal` ont été essayées hors rendu (`etiquettes()` dans le
        # script de mesure) : la MEILLEURE laisse 0,14 entre deux étiquettes, et la paire
        # « A G » / « B E » se touche franchement dans la plupart.
        # ⭐ C'est la COULEUR qui relie la figure à la colonne de droite — ambre pour
        # A G, bleu pour B D, rose pour B E — exactement comme l'écran 09b de l'épisode 7,
        # qui passe ses trois vecteurs en `nom=None` pour la même raison.
        self.au_fin("A G a donc pour coordonnées 1, 1, 1")
        fAG = r.vecteur(S["A"], S["G"], None, couleur=C_REGARD, sw=7)
        bAG = self.col(self.nomme("A G", S["G"], C_REGARD, 28), -0.25)
        self.play(GrowArrow(fAG[0]), FadeIn(bAG, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("Le vecteur B D, c'est D moins B : moins 1, 1, 0")
        fBD = r.vecteur(S["B"], S["D"], None, couleur=C_VECTEUR, sw=7)
        bBD = self.col(self.nomme("B D", BD, C_VECTEUR, 28), -1.05)
        self.play(GrowArrow(fBD[0]), FadeIn(bBD, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("Le vecteur B E, c'est E moins B : moins 1, 0, 1")
        fBE = r.vecteur(S["B"], S["E"], None, couleur=C_VECTEUR2, sw=7)
        bBE = self.col(self.nomme("B E", BE, C_VECTEUR2, 28), -1.85)
        self.play(GrowArrow(fBE[0]), FadeIn(bBE, shift=RIGHT * 0.12), run_time=0.6)

        # ── ③ les deux produits scalaires, à GAUCHE sous le cube ──────────
        # ⚠️ xmax = 1,9 : la colonne de droite descend à −2,08 (B E), donc un bloc posé
        # jusqu'à 4,6 s'écrirait DESSUS. Défaut n° 1 de l'épisode 3, cinquième récidive.
        self.au_fin("moins 1, plus 1, plus zéro, égale zéro")
        q1 = VGroup(self.sans_audit(self.vexpr("A G · B D =", ("A G", "B D"), fs, GREY_A)),
                    VGroup(self.t("−1 + 1 +", fs, WHITE), self.zero(fs),
                           self.t("=", fs, WHITE), self.zero(fs, VERT_OK))
                    .arrange(RIGHT, buff=0.14))
        q1.arrange(RIGHT, buff=0.18)
        self.gauche(q1, -1.35, xmax=1.9)
        self.play(FadeIn(q1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("moins 1, plus zéro, plus 1, égale zéro")
        q2 = VGroup(self.sans_audit(self.vexpr("A G · B E =", ("A G", "B E"), fs, GREY_A)),
                    VGroup(self.t("−1 +", fs, WHITE), self.zero(fs),
                           self.t("+ 1 =", fs, WHITE), self.zero(fs, VERT_OK))
                    .arrange(RIGHT, buff=0.14))
        q2.arrange(RIGHT, buff=0.18)
        self.gauche(q2, -1.95, xmax=1.9)
        self.play(FadeIn(q2, shift=RIGHT * 0.12), run_time=0.55)
        # ⭐⭐ LA LIGNE QU'ON OUBLIE, et c'est pour elle que l'épisode existe : sans la
        # non-colinéarité, le théorème ne s'applique pas. Elle est donc écrite en entier.
        self.au_mot("B D et B E ne sont pas colinéaires")
        nc = VGroup(self.coche(VERT_OK, 0.13),
                    self.sans_audit(self.vexpr(
                        "B D et B E ne sont pas colinéaires : (1 ; 0) et (0 ; 1)",
                        ("B D", "B E"), 26, VERT_OK)))
        nc.arrange(RIGHT, buff=0.18)
        self.gauche(nc, -2.55, xmax=4.6)
        self.play(FadeIn(nc, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("la droite A G est orthogonale au plan B D E")
        fin = self.t("la droite (A G) est orthogonale au plan (BDE)", 30, VERT_OK)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -3.20, xmax=4.6)
        self.play(FadeIn(fin, scale=1.05), Create(cad), run_time=0.7)
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
        # rien ne le dise. Ici la mesure confirme qu'aucune rangée n'est réduite.
        fs = 26
        faits = (
            (("produit scalaire nul :", None), C_REGARD, ("vecteurs orthogonaux", None),
             WHITE, "Produit scalaire nul, vecteurs orthogonaux"),
            (("droite et plan :", None), C_VECTEUR,
             ("DEUX vecteurs non colinéaires", None), WHITE,
             "il faut deux vecteurs non colinéaires du plan"),
            (("et on le justifie :", None), C_PIEGE,
             ("c'est la ligne qu'on oublie", None), WHITE,
             "il faut justifier qu'ils ne le sont pas"),
            (("orthogonal à un plan :", None), C_PLAN,
             ("un vecteur NORMAL", None), VERT_OK, "s'appelle un vecteur normal"),
            # ⛔ « attention : » ET NON « dans l'espace : », ET C'EST UNE MESURE : avec
            # le second, cette rangée fait 10,73 pour un plafond de 10,60, donc les CINQ
            # rangées de la FINALE — l'écran que l'élève relit — étaient réduites de
            # 1,2 % sans que rien ne le dise. Avec « attention : », 9,94.
            (("attention :", None), GREY_A,
             ("orthogonales ne veut pas dire sécantes", None), WHITE,
             "orthogonales ne veut pas dire sécantes"),
        )
        blocs = []
        for (g, gn), cg, (d, dn), cd, _ in faits:
            gauche_ = self.vexpr(g, gn, fs, cg) if gn else self.t(g, fs, cg)
            droite_ = self.vexpr(d, dn, fs, cd) if dn else self.t(d, fs, cd)
            blocs.append(VGroup(self.sans_audit(gauche_), droite_)
                         .arrange(RIGHT, buff=0.22))
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                          for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.36)
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


class PsEspaceOrthogonaliteTerminale(PsEspaceOrthogonaliteBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
