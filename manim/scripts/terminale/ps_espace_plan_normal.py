"""E11 — « Utiliser un vecteur normal à un plan » (micro `ps_espace_plan_normal`).

Terminale spé, notion `produit_scalaire_espace`. Onzième des douze épisodes de la série
« géométrie dans l'espace ». Quinze clips, un écran par clip.

Contexte : LE CLOU PLANTÉ DROIT DANS UNE PLANCHE. ⭐ Et cet épisode n'a AUCUN
personnage — sa voix n'en nomme aucun. C'est une chance qu'on ne gâche pas : six
épisodes d'affilée ont perdu un tour de rendu sur un personnage vu au gros plan (la
visière de Jean-Bernard E4, le pont E5, les axes E6, l'aile de Kelly E7, le casque de
Marc E8, les cheveux de la coureuse E9). Ici la figure est un objet, et un objet se
vérifie par ses COTES.

⛔⛔ DEUX NORMALES DE CET ÉPISODE SE PROJETTENT SUR UNE LAME, ET C'EST MESURÉ.
`platitude((1 ; 1 ; 1))` = **9,02°**, sous le seuil de 12° (le NOYAU de `espace3d.py`).
Or (1 ; 1 ; 1) est la normale du plan de la question 07 **et** celle du plan du défi
(09 / 09b) : les deux écrans qui portent la leçon sont les deux écrans qu'on ne peut
pas dessiner en cavalière. C'est exactement la situation de l'épisode 8, et on reprend
ses deux remèdes :
  · 07b (deux plans parallèles) : `plan_dessine()` — à PLAT, sans aucun axe. L'écran ne
    prétend pas montrer OÙ sont les plans, il montre qu'ils sont parallèles ;
  · 09 / 09b : **aucun morceau de plan**. On montre le point A, la direction normale et
    le projeté K — c'est-à-dire ce que la démonstration manipule. Un parallélogramme de
    normale (1 ; 1 ; 1) se lirait comme un trait.
⭐ Les autres plans de l'épisode se projettent bien et sont dessinés dans un repère :
(0 ; 0 ; 1) = 14,9° (la planche), (2 ; −1 ; 3) = 39,8° (écran 02), (3 ; 0 ; 1) = 25,4°
(écran 05). Un épisode peut porter les deux conventions, à condition que chacune ait sa
raison — leçon de E8.

⛔⛔ TROIS FAMILLES DE NOMBRES SONT HORS AUDIT, ET LES TROIS SONT STRUCTURELLES :
  · `self.lettres(...)` — la voix dit « zéro » en toutes lettres partout (« plus zéro y »,
    « égale zéro », « zéro, zéro, 7 », « donc zéro »), et à l'écran d'un cours de maths
    « 0 » est la seule écriture juste. Ces chaînes n'existent pas dans le texte de la
    voix et sortiraient chacune en AUDIT-ABSENT, en noyant le seul signalement qu'on
    cherche ;
  · `eq_zero` (socle) sort déjà le « 0 » du second membre de chaque équation ;
  · les lettres a, b, c, d de l'écran 03 ne sont pas des nombres : rien à signaler.

Voix : manim/voix/terminale-ps-espace-plan-normal.json (débit −6, Julie).
Marques : manim/scripts/terminale/ps_espace_plan_normal_marques.json.
Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
  manim/scripts/terminale/ps_espace_plan_normal.py PsEspacePlanNormalTerminale \
  --media_dir manim/scripts/terminale/media-ps-espace-plan-normal --dry_run
Mesure hors rendu : manim/poste2/mesure-ps-espace-plan-normal.py

⚠️ LE SOCLE EST GELÉ (consigne du chef d'orchestre, 23/11) : `espace_ecrans.py` et
`espace3d.py` ne bougent pas tant que des rendus tournent contre eux. Les outils qui
manquent ici — `lettres`, `nomme`, `fleche_vers`, les trois figures — sont donc écrits
DANS ce fichier. ⏳ `nomme` et `lettres` sont identiques à ceux de E10 et E9 : ils sont
à extraire dans le socle quand les rendus seront finis.
"""

import math
import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_FANTOME, C_NORMALE, C_PIEGE, C_PLAN, C_POINT,  # noqa: E402
                      C_REGARD, C_VECTEUR, C_VECTEUR2, Repere3D, plan_dessine,
                      platitude, point3)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import (CompteARebours, P, EcransEspace,  # noqa: E402
                           equation_plan, pastille_pause)

BOIS, CLOU = "#a16207", "#cbd5e1"      # la planche et le clou de l'écran 01

# ── les données de l'épisode, écrites UNE fois ─────────────────────────────
N02, D02 = (2, -1, 3), -5              # 02 : 2x − y + 3z − 5 = 0  →  n(2 ; −1 ; 3)
N04, D04 = (1, -2, 5), 7               # 04 : la question-pause n° 1 → réponse A
B04, C04 = (1, 2, 5), (0, 0, 7)        #      le signe perdu, et le terme constant
A05, N05 = (1, 2, -1), (3, 0, 1)       # 05 : on cherche d → 3x + z − 2 = 0
N06A, D06A = (2, 2, 2), -2             # 06 : deux écritures du MÊME plan
N06B, D06B = (1, 1, 1), -1
N07, D07 = (1, 1, 1), -1               # 07 : P  — la question-pause n° 2 → réponse B
N07P, D07P = (2, 2, 2), 6              #      P′ — colinéaire, mais d ≠ : parallèles
N09, D09 = (1, 1, 1), 0                # 09 : P : x + y + z = 0
A09 = (1, 1, 1)                        #      le point à projeter → K = l'origine


def ps(u, v):
    return sum(u[i] * v[i] for i in range(3))


def norme2(u):
    return ps(u, u)


def colineaires(u, v):
    """⭐ Le test des DEUX normales, par les produits en croix — pas par une division,
    qui tomberait sur un zéro dès que le plan est parallèle à un axe (écran 05)."""
    return all(abs(u[i] * v[j] - u[j] * v[i]) < 1e-12
               for i, j in ((0, 1), (0, 2), (1, 2)))


def d_depuis(normale, point):
    """Le terme constant d'un plan de normale donnée passant par un point : c'est TOUT
    l'écran 05, et il est calculé, jamais recopié de la voix."""
    return -ps(normale, point)


def dans_le_plan(normale, d, point):
    return abs(ps(normale, point) + d) < 1e-12


# ── la passe maths du script, refaite indépendamment de la voix ────────────
# ⭐ Aucun nombre affiché par cet épisode n'est recopié de la voix : ils sont tous
# recalculés ici, et un désaccord entre les deux se verrait à l'import.
# 02 : la normale se LIT dans l'équation — c'est la seule chose à vérifier, et on la
# vérifie en testant que deux points du plan donnent bien un A⃗M orthogonal à n.
_m1 = (0, 1, 2)                                    # 2·0 − 1 + 3·2 − 5 = 0
_m2 = (1, 0, 1)                                    # 2·1 − 0 + 3·1 − 5 = 0
assert dans_le_plan(N02, D02, _m1) and dans_le_plan(N02, D02, _m2)
assert abs(ps(N02, tuple(_m2[i] - _m1[i] for i in range(3)))) < 1e-12
# 04 : la bonne réponse est la lecture des coefficients ; les deux leurres ne sont
# colinéaires NI à elle NI entre eux (exclusion deux à deux, règle de la série).
assert N04 == (D04 * 0 + 1, -2, 5)                 # la lecture, écrite une fois
assert not colineaires(N04, B04) and not colineaires(N04, C04)
assert not colineaires(B04, C04)
assert B04 != N04 and C04 == (0, 0, D04)           # le leurre C EST le terme constant
# 05 : d se calcule, et l'équation obtenue est vérifiée SUR le point A.
assert d_depuis(N05, A05) == -2
assert dans_le_plan(N05, d_depuis(N05, A05), A05)
assert equation_plan(*N05, d_depuis(N05, A05)) == "3x + z − 2 = 0"
assert N05[1] == 0                                 # « le plan est parallèle à l'axe y »
assert abs(ps(N05, (0, 1, 0))) < 1e-12             # … c'est-à-dire n ⊥ j
# 06 : les deux écritures décrivent le même plan — mêmes solutions, pas seulement des
# normales colinéaires. ⛔ Un plan n'est pas caractérisé par sa normale seule.
assert colineaires(N06A, N06B)
for _p in ((1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, -1), (0.5, 0.5, 0)):
    assert dans_le_plan(N06A, D06A, _p) == dans_le_plan(N06B, D06B, _p)
assert tuple(c // 2 for c in N06A) == N06B and D06A // 2 == D06B
# 07 : normales colinéaires, mais les deux plans n'ont AUCUN point commun.
assert colineaires(N07, N07P)
assert tuple(c // 2 for c in N07P) == N07 and D07P / 2 == 3 and 3 != D07
for _p in ((1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, -1)):
    assert not (dans_le_plan(N07, D07, _p) and dans_le_plan(N07P, D07P, _p))
# ⛔ Et « strictement parallèles » se prouve : aucun point du premier n'est dans le
# second, sur tout un échantillon du plan P.
for _s in range(-3, 4):
    for _t in range(-3, 4):
        _p = (_s, _t, 1 - _s - _t)                 # un point quelconque de P
        assert dans_le_plan(N07, D07, _p) and not dans_le_plan(N07P, D07P, _p)
# 09b : le projeté orthogonal de A sur P, par la droite normale — et T09 est le
# paramètre que la correction annonce.
T09 = -(ps(N09, A09) + D09) / norme2(N09)
K09 = tuple(A09[i] + T09 * N09[i] for i in range(3))
assert T09 == -1 and K09 == (0, 0, 0)
assert dans_le_plan(N09, D09, K09)                 # « l'origine est bien dans P »
assert ps(N09, A09) + D09 == 3                     # « cela fait 3 plus 3 t »
# ⭐ ET LE CONTRÔLE QUI COMPTE : A⃗K est bien colinéaire à la normale, c'est-à-dire que
# le point trouvé est bien le PROJETÉ ORTHOGONAL et pas un point quelconque du plan.
_ak = tuple(K09[i] - A09[i] for i in range(3))
assert colineaires(_ak, N09) and _ak == (-1, -1, -1)
# ⛔⛔ CE QUE LA CAVALIÈRE FERAIT DE CES PLANS — mesuré, et c'est pourquoi les écrans
# 07b, 09 et 09b ne portent AUCUN morceau de plan (voir l'en-tête).
assert platitude(N09) < 12 and platitude(N07) < 12
assert platitude((0, 0, 1)) >= 12 and platitude(N02) >= 12 and platitude(N05) >= 12


def planche_clou(u=1.0, demi=1.35, h_clou=1.45):
    """LA PLANCHE ET SON CLOU — la figure de l'écran 01, et la seule figure d'objet
    de l'épisode.

    ⭐ LA PLANCHE EST UN VRAI MORCEAU DE PLAN, de normale (0 ; 0 ; 1) : `platitude` la
    donne à 14,9°, donc elle se projette bien (c'est le « sol » de l'épisode 8). Et
    c'est exactement ce que l'écran doit dire — une planche EST un plan.
    ⛔ ET ELLE EST HORIZONTALE DANS LE BON SENS : la règle de l'épisode 5 (« dans cette
    cavalière, ce qui doit paraître horizontal se dessine selon x, ce qui s'éloigne se
    dessine selon y ») — une planche posée à plat occupe donc le plan (x, y), et le clou
    monte selon z. Dessinée dans un plan vertical, on lirait une porte.
    ⛔ AUCUN AXE : cet écran raconte une situation, il ne lit pas de coordonnées. Et
    trois axes partant du pied du clou se liraient comme trois autres clous.
    ⚠️ LE CLOU ET LA NORMALE SONT À DEUX ABSCISSES DIFFÉRENTES, et c'est voulu :
    superposés, la flèche verte recouvrirait le fût gris et on ne verrait qu'un objet
    là où l'écran en montre deux (« ce clou S'APPELLE un vecteur normal »). C'est le
    défaut n° 3 des constats de E1 (un vecteur invisible sous son double)."""
    r = Repere3D(o=ORIGIN, u=u, portee=2)
    planche = r.plan((0, 0, 1), d=0.0, centre=(0, 0, 0), demi=demi,
                     couleur=BOIS, op=0.45, sw=4)
    # Le clou : un fût qui monte, et sa TÊTE en haut — un clou planté a sa tête dehors.
    pied, sommet = r.pt(-0.55, -0.15, 0), r.pt(-0.55, -0.15, h_clou)
    fut = Line(pied, sommet, stroke_width=9, color=CLOU)
    tete = Dot(sommet, radius=0.13, color=CLOU)
    clou = VGroup(fut, tete)
    # L'angle droit, au pied du clou : c'est LA leçon de l'écran.
    # ⛔⛔ LE PETIT CARRÉ VA AU PIED DE LA NORMALE, PAS À CELUI DU CLOU — et c'est le
    # gros plan ×2,8 qui l'a dit : isolé sur l'aplat brun de la planche, à côté d'un
    # clou gris, l'angle droit VERT se lisait comme un **chiffre 7** posé sur le bois.
    # Rien d'autre ne pouvait le voir : il est dans la marge, il ne recouvre rien, et
    # aucune cote n'est fausse. ⭐ Posé au pied de la flèche verte, d'où elle s'élève,
    # il se lit pour ce qu'il est : « cette flèche-là est perpendiculaire à la planche ».
    # C'est la leçon de la coche verte de l'épisode 8 — une marque se pose À CÔTÉ de ce
    # qu'elle qualifie, et de la bonne couleur.
    droit = r.angle_droit((0.70, -0.15, 0), (1, 0, 0), (0, 0, 1),
                          taille=0.24, couleur=C_NORMALE)
    # ⛔⛔ LA NORMALE EST CONSTRUITE **ICI**, DANS LA FIGURE, ET PAS DANS L'ÉCRAN.
    # Premier jet : l'écran faisait `planche_clou().move_to(...)` puis appelait
    # `fig.r.vecteur(...)` pour poser la flèche verte. Or `move_to` déplace le VGroup
    # et ne touche PAS au `Repere3D`, qui reste à l'origine : la flèche se calculait
    # donc dans l'ancien repère et se posait au MILIEU DE L'ÉCRAN, détachée de la
    # planche. Mesuré : la boîte « figure + normale » allait de −6,05 à **1,13**, soit
    # 7,2 de large pour une planche qui en fait 3,8. ⭐ Une figure se construit entière,
    # puis se déplace entière — un repère n'est pas un mobjet.
    normale = r.vecteur((0.70, -0.15, 0), (0.70, -0.15, h_clou), "n",
                        couleur=C_NORMALE, sw=7, decal=RIGHT)
    g = VGroup(planche, clou, droit, normale)
    g.r, g.planche, g.clou, g.droit, g.normale = r, planche, clou, droit, normale
    return g


def normales_multiples(n=(1, 1, 1), couleur=C_NORMALE):
    """UN PLAN À PLAT ET TROIS NORMALES DE LONGUEURS DIFFÉRENTES — l'écran 06.

    ⛔⛔ À PLAT, ET C'EST UNE MESURE : la normale de cet écran est (1 ; 1 ; 1), que
    `platitude` donne à 9,02°. Dessiné dans un repère, le plan serait une LAME qu'on
    prendrait pour du papier vu de champ (le défaut mesuré de l'épisode 5, repayé sur
    l'épisode 8). `plan_dessine` ne prétend pas dire OÙ est le plan : il dit ce qu'est
    un plan, et c'est tout ce que l'écran 06 demande.
    ⭐ Les trois flèches partent du MÊME point et portent la même direction : c'est la
    figure de « tous ses multiples non nuls en sont aussi ». La plus courte est
    l'opposée — un multiple NÉGATIF est un vecteur normal lui aussi, et c'est le cas
    que les élèves oublient."""
    plan = plan_dessine(largeur=3.1, profondeur=1.15, cisaille=0.6, couleur=C_PLAN,
                        op=0.26, sw=4)
    # ⛔⛔ TROIS FLÈCHES CÔTE À CÔTE, ET NON TROIS FLÈCHES SUR LA MÊME DROITE.
    # Premier jet : les trois partaient du MÊME point, dans la même direction, avec des
    # longueurs différentes — géométriquement juste, et illisible. Vu au gros plan ×3,4 :
    # la pointe de la plus courte tombait AU MILIEU du fût de la plus longue, et on
    # lisait une flèche qui en traverse une autre, pas trois multiples.
    # ⭐ Trois flèches PARALLÈLES, décalées, disent exactement la même chose — un
    # vecteur est libre — et elles se comptent du premier coup d'œil.
    base = plan.poly.get_center()
    fleches = VGroup()
    for dx, k, op in ((-0.62, 1.05, 1.0), (0.0, 1.70, 0.8), (0.62, -0.80, 0.6)):
        pied = base + RIGHT * dx
        f = Arrow(pied, pied + UP * k, buff=0, stroke_width=6,
                  max_tip_length_to_length_ratio=0.22, color=couleur)
        f.set_opacity(op)
        fleches.add(f)
    g = VGroup(plan, fleches)
    g.plan, g.fleches, g.base = plan, fleches, base
    return g


class PsEspacePlanNormalBase(EcransEspace):
    """Les quinze écrans. ⭐ Le modèle est `ps_espace_norme_distance.py` (E9) pour la
    structure et `ps_espace_calculer.py` (E7) pour la notation fléchée."""

    # ⚠️ C'est `nom_voix` qui va chercher À LA FOIS le JSON des textes
    # (manim/voix/<nom>.json) et le dossier des WAV (public/sons/<nom>/). Oublié, le
    # script plante sur « manim/voix/None.json » — ce qui est au moins franc.
    # ⭐⭐ LA COLONNE LARGE DE CET ÉPISODE, EN UN SEUL ENDROIT.
    # Cinq écrans la demandent, et à xl = 2,2 (le défaut du socle) la colonne n'offre
    # que 4,40 : la mesure a sorti SEPT blocs rétrécis d'un coup, jusqu'à −30 % sur la
    # ligne de calcul du défi. Les figures de cet épisode sont étroites (elles finissent
    # toutes avant x = −2,20), donc la colonne peut commencer à 0,2 et offrir 6,40.
    # ⛔ ET C'EST UNE CONSTANTE DE CLASSE, PAS UNE VARIABLE LOCALE : écrite dans chaque
    # méthode, elle manquait à `ecran_correction` — qui hérite de l'écran du défi mais
    # pas de ses variables — et le dry run est mort sur un NameError au 13ᵉ écran.
    XL_LARGE = 0.2
    fichier_marques = "ps_espace_plan_normal_marques.json"
    nom_voix = "terminale-ps-espace-plan-normal"

    # ── les outils que le socle n'a pas, et qui sont ici parce qu'il est GELÉ ──

    def lettres(self, mob):
        """UN TEXTE DONT LA VOIX DIT LES NOMBRES EN TOUTES LETTRES — hors audit, et
        c'est structurel (même mécanisme que le `lettres()` de E9 et de E10).

        Ici, c'est presque toujours « zéro » : « plus zéro y » (écran 05), « zéro,
        zéro, 7 » (le leurre C de l'écran 04), « donc zéro » (écran 09b). À l'écran
        d'un cours de maths « 0 » est la seule écriture juste — mais la chaîne « 0 »
        n'est nulle part dans le texte de la voix, et chaque occurrence sortirait en
        AUDIT-ABSENT en noyant le seul signalement qu'on cherche (`@eleveai974`)."""
        return self.sans_audit(mob)

    def nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« n⃗ (2 ; −1 ; 3) » : le nom du VECTEUR avec sa flèche, puis son triplet."""
        g = VGroup(self.vec(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def fleche_bas(self, longueur=0.52, couleur=GREY_B, sw=4):
        """LA FLÈCHE « ON LIT » entre l'équation et le triplet (écrans 02 et 09b).
        ⚠️ Elle est GRISE : en vert elle se lirait comme un vecteur normal de plus, dans
        un épisode dont tout le sujet est de savoir lequel des objets est le vecteur."""
        return Arrow(ORIGIN, DOWN * longueur, buff=0, stroke_width=sw,
                     max_tip_length_to_length_ratio=0.35, color=couleur)

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Vecteur normal à un plan", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Vecteur normal à un plan")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        fs = 36
        # ⛔ L'ORDRE EST CELUI DE LA VOIX, et chaque ligne a son instant : un bloc qui
        # porte ce que la voix énumère se remplit au rythme de la voix (piège n° 6 des
        # entiers, payé sur six épisodes de cette série).
        promesses = (("les trois coefficients de l'équation", C_VECTEUR,
                      "Les trois coefficients"),
                     ("sont les coordonnées d'un vecteur", C_VECTEUR2,
                      "les coordonnées d'un vecteur"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, fs, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        lignes.move_to(P(-0.9, 1.05))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔ UNE SEULE LIGNE, et à −1,55 : `echelle()` alignée en bas occupe y de −3,45 à
        # −1,98 (mesuré sur l'épisode 5, où la note de reprise annonçait −2,6 et avait
        # tort). Une ligne simple à −1,55 descend à −1,75 : elle passe de 0,23.
        fin = self.t("et ce vecteur donne la direction perpendiculaire", 30, VERT_OK)
        fin.move_to(P(-0.9, -1.55))
        self.au_mot("la direction perpendiculaire")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : le clou planté droit dans une planche ─────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        fig = planche_clou(u=1.0).move_to(P(-4.15, 1.05))
        self.sans_audit(fig)
        self.au_mot("Un clou planté bien droit")
        self.play(FadeIn(fig.planche), run_time=0.6)
        self.play(Create(fig.clou), run_time=0.5)
        fs = 28
        # ⛔ COLONNE LARGE (xl = 0,2 et non 2,2), ET C'EST UNE MESURE : à 2,2 la colonne
        # n'offre que 4,40, et les deux blocs de cet écran font 5,61 et 6,22 — `col()`
        # les rétrécissait de 22 % et de 29 %. La planche s'arrête à x = −2,25, donc la
        # colonne peut commencer bien plus à gauche. C'est le remède de l'épisode 5
        # (« le remède est la LARGEUR, pas la police »), appliqué à un bloc de texte.
        XLC = self.XL_LARGE
        # ⛔ L'ANGLE DROIT ARRIVE AVEC LA PHRASE QUI LE DIT, pas avec le dessin : c'est
        # la leçon de l'écran 05 de l'épisode 8 (« chaque carré paraît avec son produit
        # scalaire », c'est-à-dire quand on vient de PROUVER que l'angle est droit).
        self.au_mot("la direction perpendiculaire à la planche")
        b1 = self.col(VGroup(self.t("le clou donne la direction", fs, C_REGARD),
                             self.t("perpendiculaire à la planche", fs, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 2.05, XLC)
        self.play(Create(fig.droit), FadeIn(b1, shift=RIGHT * 0.12), run_time=0.6)
        # ⭐ LA FLÈCHE VERTE EST UN SECOND OBJET, à côté du clou : « en maths, ce clou
        # S'APPELLE un vecteur normal » — l'écran doit montrer le passage de l'objet à
        # l'abstraction, donc les deux ensemble.
        # ⚠️ L'ÉTIQUETTE VA DU CÔTÉ OÙ LE VECTEUR NE VA PAS (règle de E7) : n⃗ monte,
        # son nom part donc à DROITE, jamais en haut où il percuterait la pointe.
        self.au_mot("ce clou s'appelle un vecteur normal")
        nf = fig.normale
        b2 = self.col(VGroup(self.t("en maths, ce clou s'appelle", fs, C_NORMALE),
                             self.vexpr("un vecteur normal n", ("n",), fs, C_NORMALE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 1.08, XLC)
        self.play(GrowArrow(nf[0]), FadeIn(nf.nom), FadeIn(b2, shift=RIGHT * 0.12),
                  run_time=0.7)
        # ⛔ LA CONCLUSION VA À GAUCHE, SOUS LA FIGURE, ET EN GRAND : le bas de la
        # colonne de droite est réservé aux lignes COURTES (défaut n° 4 de E3, où le
        # second garde-fou de `col()` a rapetissé une conclusion à 19 px).
        self.au_fin("sous les yeux, sans aucun calcul")
        fin = VGroup(self.t("si tu as l'équation d'un plan,", 28, WHITE),
                     self.t("tu as déjà son vecteur normal — sans aucun calcul", 28, WHITE))
        fin.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.16, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.25, xmax=4.6)
        self.play(FadeIn(fin, scale=1.03), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 02 : on LIT les coefficients ───────────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        titre = self.t("Les coefficients SONT la normale", 44, JAUNE_TITRE)
        titre.to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.6)
        # ⭐ LE PLAN EST DESSINÉ DANS UN REPÈRE, et c'est permis ici : `platitude` donne
        # 39,8° à la normale (2 ; −1 ; 3), bien au-dessus du seuil de 12°.
        # ⛔⛔ PORTÉE 2 ET NON 3 : un axe long met son NOM loin de l'origine, c'est-à-dire
        # exactement là où arrivent les objets de la figure. Mesuré au gros plan puis par
        # `noms_axes()` : à 3 de portée, le nom de la normale et le « y » se rendaient en
        # « n̄y » (distance 0,00). ⭐ Le nom d'un axe n'est pas du décor : c'est une
        # étiquette de plus, et elle se mesure comme les autres.
        r, ax = self.repere(o=(-4.35, -1.15), u=0.52, portee=3)
        self.play(Create(ax), run_time=0.6)
        # ⛔⛔ UN PLAN PLUS PETIT ET UNE NORMALE PLUS LONGUE — et les deux cotes
        # viennent du GROS PLAN, pas d'un goût. Au premier jet (demi 1,55, normale de
        # 0,88 unité sur des axes de portée 1), le plan RECOUVRAIT les trois axes et
        # leurs noms — le « z » disparaissait sous son bord — et la normale se rendait
        # en TIRET vert de 0,43, sans pointe visible, dont l'étiquette flottait à 0,85
        # sans qu'on sache ce qu'elle nommait.
        # ⭐ La leçon : bien placer une étiquette ne sauve pas une figure trop petite.
        # On rallonge les axes (portée 3), on rétrécit le plan (demi 1,0) et la normale
        # fait 2,2 unités — elle est alors le plus grand objet de la figure, ce qui est
        # exactement ce que l'écran raconte.
        pl = self.sans_audit(r.plan(N02, d=D02, centre=(0, 0, 0), demi=1.00,
                                    couleur=C_PLAN, op=0.30, sw=3))
        # Le pied de la normale : le projeté de l'origine sur le plan, que `r.plan`
        # vient justement de calculer — on ne le recopie pas, on le lui demande.
        pied = tuple(float(x) for x in pl.centre_plan)
        bout = tuple(pied[i] + 2.2 * N02[i] / math.sqrt(norme2(N02)) for i in range(3))
        # ⛔ COLONNE LARGE (0,2) : à xl = 2,2 l'équation tombait de 4,63 à 4,40 et le
        # bloc « les coefficients de x, de y et de z » de 6,01 à 4,40 — soit la phrase
        # qui PORTE la leçon réduite de 27 %. Le repère s'arrête à x = −2,23.
        XLC = self.XL_LARGE
        self.au_fin("moins 5 égale zéro")
        eq = self.col(self.eq_plan(*N02, D02, fs=34, color=WHITE), 2.05, XLC)
        self.play(FadeIn(pl), FadeIn(eq, shift=RIGHT * 0.12), run_time=0.7)
        self.au_fin("2, moins 1, 3")
        # ⛔⛔ CE DÉCALAGE VIENT D'UNE RECHERCHE EN GRILLE, PAS D'UN CHOIX À VUE :
        # `manim/poste2/chercher-decal-e11.py` balaie (dx ; dy) au pas de 0,25 entre
        # −2,5 et +2,5, garde ce qui est à plus de 0,11 de TOUT CE QUI EST TRACÉ (les
        # trois axes, le fût, les quatre bords du plan) et à plus de 0,22 des trois noms
        # d'axes, puis classe par distance au fût — la plus proche gagne, pour qu'on
        # sache à qui l'étiquette appartient. 39 positions libres sur 440.
        # ⛔ Trois essais À LA MAIN avaient échoué avant : `RIGHT` posait le nom sur le
        # « y » (0,00) ET sur son propre fût (0,06), `UL` le posait sur l'axe des z.
        # Retenu : (+1,75 ; +1,75) — 0,18 du tracé, 0,59 des noms d'axes.
        nf = r.vecteur(pied, bout, "n", couleur=C_NORMALE, sw=7,
                       decal=np.array([1.75, 0.75, 0.0]))
        fl = self.fleche_bas()
        trip = self.nomme("n", N02, C_NORMALE, 32)
        bloc = VGroup(fl, trip).arrange(DOWN, buff=0.10)
        self.col(bloc, 1.10, XLC)
        self.play(GrowArrow(nf[0]), FadeIn(nf.nom), Create(fl),
                  FadeIn(trip, shift=RIGHT * 0.12), run_time=0.8)
        self.au_mot("les coefficients de x, de y et de z")
        b1 = self.col(VGroup(self.t("les coefficients de x, de y et de z,", 26, GREY_A),
                             self.t("avec leurs signes", 26, GREY_A))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.02, XLC)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ LE TERME CONSTANT EST LE PIÈGE DE L'ÉCRAN 04 (son leurre C) : il est donc
        # montré ICI, et montré comme ce qu'il est — une information de POSITION.
        # ⛔⛔ ANCRÉ SUR « Le terme constant », ET NON SUR LA FIN DU CLIP. Premier jet :
        # `au_fin("pas comment il est orienté")`, c'est-à-dire le dernier mot du clip —
        # la voix parlait du terme constant pendant six secondes devant un écran qui ne
        # le montrait pas encore. Le dry run l'a dit par un `AUDIT-TARD` de **19,34 s**,
        # le plus gros de l'épisode : l'audit rattachait le « 5 » affiché à la seule
        # fois où la voix le dit, dans l'équation du début.
        # ⚠️ ET LE « −5 » EST HORS AUDIT : c'est un RAPPEL de l'équation écrite plus
        # haut, que la voix ne redit pas (« le terme constant, LUI… »). C'est le cas
        # décrit par l'épisode 3 — l'audit travaille clip par clip et ne voit jamais un
        # rappel —, et la raison est écrite ici, comme l'exige la règle du `sans_audit`.
        self.au_mot("Le terme constant")
        b2 = VGroup(self.croix(r=0.13),
                    VGroup(self.lettres(self.t(f"le terme constant {self.nombre(D02)} :",
                                               26, C_PIEGE)),
                           self.t("où le plan se place, pas son orientation", 26, C_PIEGE))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        b2.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(b2, -3.05, xmax=4.6)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 03 : le théorème, dans les deux sens ───────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        titre = self.t("Et dans l'autre sens", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Et cela marche dans les deux sens")
        self.play(Write(titre), run_time=0.6)
        fs = 30
        # ⭐ UN TABLEAU EN DEUX COLONNES : « ce qu'on a » et « ce qu'on écrit ». Il se
        # construit D'UN BLOC — c'est la leçon de l'écran 03 de l'épisode 8, où trois
        # rangées jouées à la suite sortaient à neuf secondes de retard sur la voix.
        # Seules les RÉVÉLATIONS suivent la voix, pas la structure.
        gA = VGroup(self.t("un point A", fs, C_REGARD),
                    self.vexpr("et une normale n (a ; b ; c)", ("n",), fs, C_NORMALE))
        gA.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        fleche = Arrow(LEFT * 0.35, RIGHT * 0.35, buff=0, stroke_width=5,
                       max_tip_length_to_length_ratio=0.32, color=GREY_B)
        # ⚠️ « = 0 » HORS AUDIT : la voix dit « égale zéro » en toutes lettres, donc
        # la chaîne « 0 » n'est nulle part dans son texte. C'est ce que `eq_zero` fait
        # tout seul dans le socle — mais cette ligne-ci est littérale (a, b, c, d), elle
        # ne passe pas par `eq_plan`. Un AUDIT-ABSENT de plus noierait le seul qu'on
        # cherche, celui de @eleveai974.
        gB = self.lettres(self.t("a x + b y + c z + d = 0", fs, WHITE))
        tab = VGroup(gA, fleche, gB).arrange(RIGHT, buff=0.34)
        # ⛔ PLAFOND 12,0 ET NON 10,60, ET C'EST MESURÉ : le tableau fait 11,72 de large,
        # et le plafond de 10,60 — celui de la FINALE — le réduisait de 9,6 %. Or 10,60
        # existe pour laisser Ti-Margo tranquille, et elle commence à x = 5,30 ET à
        # y = −2,15 : ce tableau-ci est à y = 1,55, il ne peut pas la rencontrer.
        # Centré en −0,75, 11,72 de large va de −6,61 à 4,97 — dans la marge (±6,68).
        # ⭐ Un plafond se justifie par ce qu'il protège, sinon c'est une superstition.
        if tab.width > 12.0:
            tab.scale_to_fit_width(12.0)
        tab.move_to(P(-0.75, 1.55))
        self.au_fin("a x plus b y plus c z plus d égale zéro")
        self.play(FadeIn(gA, shift=RIGHT * 0.15), GrowArrow(fleche),
                  FadeIn(gB, shift=RIGHT * 0.15), run_time=0.9)
        self.au_mot("on trouve d en remplaçant")
        # ⚠️ « d se trouve… » ET NON « et d se trouve… » : à 53 caractères la ligne fait
        # 11,33 pour les 11,10 qu'offre `gauche(xmax=4.6)`, et elle était rétrécie.
        # Trois caractères de moins, et plus aucune réduction.
        l2 = VGroup(self.coche(VERT_OK, 0.16),
                    self.t("d se trouve en remplaçant par les coordonnées de A",
                           28, VERT_OK))
        l2.arrange(RIGHT, buff=0.22)
        self.gauche(l2, 0.50, xmax=4.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔⛔ LA RAISON PROFONDE EST LA SEULE CHOSE À RETENIR DE CET ÉCRAN, et elle
        # s'écrit en UNE ligne encadrée. ⚠️ « M est dans P » et non « M ∈ P » : le
        # glyphe ∈ se rend (vérifié sur une image d'essai avant d'écrire cet écran),
        # mais la voix dit « un point M est dans le plan » — l'écran dit ce que la voix
        # dit, c'est la règle de l'audit comme celle de la lecture.
        self.au_fin("si leur produit scalaire est nul")
        rais = VGroup(self.sans_audit(self.t("la raison :", 28, GREY_A)),
                      self.sans_audit(self.vexpr("M est dans P  ⟺  A M · n = 0",
                                                 ("A M", "n"), 32, WHITE)))
        rais.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        cad = SurroundingRectangle(rais, color=C_VECTEUR, buff=0.18, stroke_width=3)
        self.gauche(VGroup(rais, cad), -1.35, xmax=4.6)
        self.play(FadeIn(rais, scale=1.03), Create(cad), run_time=0.9)
        # ⛔ ET RIEN APRÈS. Première écriture : une ligne de conclusion ancrée sur
        # « orthogonal à n ». `verifier-avant-rendu.py` l'a refusée avec un écart
        # NÉGATIF de −3,58 s — la voix dit « orthogonal à n » AVANT « si leur produit
        # scalaire est nul », donc la ligne serait arrivée trois secondes et demie en
        # retard sur son ancre. C'est le défaut de l'écran 06 de E9 et de l'écran 03 de
        # E8 : l'ordre est celui de la VOIX, jamais celui de la page.
        # ⭐ Et en la relisant, elle ne disait rien de plus que le cadre juste au-dessus.
        self.attendre_voix(marge=0.5)

    # ── 04 / 04b : la question-pause n° 1 — réponse A ──────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ LE DESSIN PORTE LA DONNÉE, JAMAIS LA RÉPONSE : on écrit l'équation, et
        # surtout pas le plan avec sa normale déjà tracée.
        don = self.eq_plan(*N04, D04, fs=42, color=C_REGARD)
        self.gauche(don, 1.45, xmax=0.15)
        rapp = self.sans_audit(self.t("un vecteur normal à ce plan ?", 26, GREY_A))
        self.gauche(rapp, 0.70, xmax=0.15)
        # ⛔⛔ LES TROIS CARTES PORTENT DES NOMBRES : elles ont donc besoin de `.nb`,
        # sinon le triplet est à l'écran avant que la voix l'ait énoncé (la carte B de
        # l'épisode 8, 1,05 s d'avance). ⭐ `trip()` le donne tout seul.
        # ⚠️ Le leurre C est « zéro, zéro, 7 » : ses deux zéros sont dits en toutes
        # lettres, donc hors audit — un par un, pas le triplet entier, sinon on perdrait
        # le contrôle du 7.
        cA = self.trip(N04, 30, WHITE, par=True)
        cB = self.trip(B04, 30, WHITE, par=True)
        cC = self.trip(C04, 30, WHITE, par=True)
        self.lettres(cC.nb[0])
        self.lettres(cC.nb[1])
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.t("Quel est un vecteur normal", 26)),
             self.sans_audit(self.t("au plan d'équation ci-contre ?", 26))],
            [cA, cB, cC], largeur=5.0, xl=1.5)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        # ⛔⛔ LA QUESTION D'ABORD, L'ÉQUATION ENSUITE — ET C'EST L'ORDRE DE LA VOIX, pas
        # celui de la page. Première écriture : l'équation à « plus 7 égale zéro » puis
        # la question à « Quel est un vecteur normal ». `verifier-avant-rendu.py` l'a
        # refusée par un écart NÉGATIF de −5,49 s : la voix demande « Quel est un
        # vecteur normal » à 1,63 s et ne finit de lire l'équation qu'à 7,12 s.
        # ⚠️ L'ATTENTE EST COLLÉE À SON `play` (défaut de l'écran 04 de E8, 4,93 s de
        # retard) : un `au_fin` ne place rien, il ATTEND.
        self.au_mot("Quel est un vecteur normal")
        self.play(FadeIn(q, shift=RIGHT * 0.1), FadeIn(rapp), run_time=0.45)
        self.au_fin("plus 7 égale zéro")
        self.play(FadeIn(don, shift=RIGHT * 0.12), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "A")
        self.mem_q1 = (cartes, pause, rebours, don, rapp)

    def ecran_reponse1(self):
        cartes, pause, rebours, don, rapp = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent par-dessus l'explication (défaut n° 1 de l'épisode 1).
        self.q_reponse(cartes, 0, pause, rebours)
        # ⛔⛔ CET ÉCRAN HÉRITE DE L'ÉCRAN 04 : l'équation RESTE — c'est la donnée, et
        # toute l'explication la relit (septième récidive de la série). La question,
        # elle, s'efface : elle a servi.
        self.play(FadeOut(rapp), run_time=0.25)
        fs = 28
        self.au_fin("1, moins 2 et 5")
        l1 = VGroup(self.coche(VERT_OK, 0.14),
                    VGroup(self.sans_audit(self.t("on lit les coefficients", fs, VERT_OK)),
                           self.sans_audit(self.t("avec leurs signes", fs, VERT_OK)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l1.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(l1, 0.47, xmax=0.15)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("une direction complètement différente")
        l2 = VGroup(self.croix(r=0.13),
                    VGroup(self.sans_audit(self.t("B a perdu le signe moins :", fs, C_PIEGE)),
                           self.sans_audit(self.t("une tout autre direction", fs, C_PIEGE)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l2.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(l2, -0.66, xmax=0.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("qui ne dit rien de la direction")
        l3 = VGroup(self.croix(r=0.13),
                    VGroup(self.sans_audit(self.t("C a pris le terme constant,", fs, C_PIEGE)),
                           self.sans_audit(self.t("qui ne dit rien de la direction", fs, C_PIEGE)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l3.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(l3, -1.84, xmax=0.15)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.55)
        # ⚠️ xmax = 4,6 : à cette hauteur les cartes sont finies, la ligne peut prendre
        # toute la largeur jusqu'à Ti-Margo.
        # ⚠️ DEUX LIGNES, ET C'EST UNE MESURE : d'un seul tenant cette phrase fait 12,19
        # pour les 11,10 qu'offre `gauche(xmax=4.6)` — elle était rétrécie de 9 %.
        self.au_fin("et des termes constants différents")
        l4 = VGroup(self.sans_audit(self.t("deux plans parallèles :", 26, C_REGARD)),
                    self.sans_audit(self.t("même vecteur normal, "
                                           "termes constants différents", 26, C_REGARD)))
        l4.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.gauche(l4, -3.03, xmax=4.6)
        self.play(FadeIn(l4, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 05 : on cherche l'équation ─────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        titre = self.t("Dans l'autre sens", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Appliquons dans l'autre sens")
        self.play(Write(titre), run_time=0.6)
        # `platitude((3 ; 0 ; 1))` = 25,4° : ce plan-là se dessine très bien.
        # ⛔ REPÈRE REMONTÉ À −0,95 (et non −1,30) : le morceau de plan descend bien plus
        # bas que les axes — mesuré, la figure entière allait jusqu'à y = −2,47 et
        # l'équation finale encadrée, posée à −2,40, s'écrivait DESSUS. Un morceau de
        # plan n'a pas la hauteur de son repère, et c'est la mesure qui le dit.
        # ⛔ PORTÉE 2 : voir l'écran 02. Ici l'axe des x arrivait sous la pointe de n⃗.
        r, ax = self.repere(o=(-4.35, -0.80), u=0.56, portee=2)
        self.play(Create(ax), run_time=0.5)
        # ⛔ COLONNE LARGE (0,2) : à 2,2 la ligne de substitution tombait de 4,93 à 4,40.
        XLC = self.XL_LARGE
        d05 = d_depuis(N05, A05)
        self.au_fin("1, 2, moins 1")
        # ⚠️ `decal=DOWN` : à `UL`, le nom « A » tombait PILE SUR l'axe des x (traversé
        # à 0,00) — A (1 ; 2 ; −1) se projette à 0,04 au-dessus de cet axe.
        pa = r.point(*A05, "A", couleur=C_REGARD, decal=DOWN)
        don = self.col(self.nomme("A", A05, C_REGARD, 30), 2.05)
        # ⚠️ « A » n'est pas un vecteur : son nom ne porte PAS de flèche. Mais `nomme`
        # en pose une — on écrit donc le point à la main, c'est trois lignes.
        don = VGroup(self.t("A", 30, C_REGARD), self.t("(", 30, WHITE),
                     self.trip(A05, 30, WHITE), self.t(")", 30, WHITE))
        don.arrange(RIGHT, buff=0.10)
        self.col(don, 2.05, XLC)
        self.play(FadeIn(pa), FadeIn(don, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("3, zéro, 1")
        bout = tuple(A05[i] + 0.52 * N05[i] for i in range(3))
        nf = r.vecteur(A05, bout, "n", couleur=C_NORMALE, sw=7, decal=DR)
        nd = self.nomme("n", N05, C_NORMALE, 30)
        self.lettres(nd.nb[1])                      # la voix dit « zéro »
        self.col(nd, 1.35, XLC)
        self.play(GrowArrow(nf[0]), FadeIn(nf.nom), FadeIn(nd, shift=RIGHT * 0.12),
                  run_time=0.7)
        pl = self.sans_audit(r.plan(N05, d=d05, centre=A05, demi=1.05,
                                    couleur=C_PLAN, op=0.28, sw=3))
        fs = 30
        # ⛔⛔ « 3x + 0y + z + d = 0 » S'ÉCRIT AVEC SON ZÉRO, et `equation_plan` ne sait
        # pas le faire (un coefficient nul y fait disparaître son terme, ce qui est la
        # bonne règle partout ailleurs). Or la voix dit « 3 x plus zéro y plus z plus d
        # égale zéro » : c'est l'étape où le zéro doit SE VOIR, puisque l'écran suivant
        # va justement le faire disparaître. On l'écrit donc à la main, hors audit.
        self.au_fin("plus d égale zéro")
        e1 = self.lettres(self.t("3x + 0y + z + d = 0", fs, WHITE))
        self.col(e1, 0.50, XLC)
        self.play(FadeIn(pl), FadeIn(e1, shift=RIGHT * 0.12), run_time=0.7)
        # ⛔⛔ LA SUBSTITUTION PORTE CE QUE LA VOIX ÉNUMÈRE : elle se remplit au rythme
        # de la voix, elle ne se pose pas d'un bloc (leçon n° 3 de E9, trouvée en
        # relisant les plus gros AUDIT-TARD sur quatre épisodes d'affilée).
        self.au_fin("plus moins 1, plus d")
        e2 = self.lettres(self.t("3 × 1 + 0 + (−1) + d = 0", 28, GREY_A))
        self.col(e2, -0.25, XLC)
        self.play(FadeIn(e2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("donc d vaut moins 2")
        e3 = VGroup(self.lettres(self.t("2 + d = 0", 30, WHITE)),
                    self.t(f"d = {self.nombre(d05)}", 32, VERT_OK))
        e3.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(e3, -1.15, XLC)
        self.play(FadeIn(e3, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔ LA CONCLUSION VA À GAUCHE, SOUS LE REPÈRE, ET EN GRAND (défaut n° 4 de E3).
        # ⚠️ n=1 ET NON n=2 : « moins 2 égale zéro » n'apparaît qu'UNE fois dans ce
        # clip (« donc d vaut moins 2 » ne contient pas « égale zéro »).
        # `verifier-avant-rendu.py` l'a dit en « ABSENT de la voix » — un `au_fin` sur
        # une occurrence qui n'existe pas aurait pris silencieusement la marque d'avant.
        self.au_fin("moins 2 égale zéro")
        fin = self.eq_plan(*N05, d05, fs=34, color=VERT_OK)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.16, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.26, xmax=1.9)
        self.play(FadeIn(fin, scale=1.04), Create(cad), run_time=0.7)
        # ⚠️ DEUX LIGNES : d'un seul tenant elle fait 12,06 pour les 11,10 offerts.
        self.au_fin("parallèle à l'axe des y")
        note = VGroup(self.coche(VERT_OK, 0.14),
                      VGroup(self.sans_audit(self.t("le y absent : son coefficient est nul,",
                                                    24, C_REGARD)),
                             self.sans_audit(self.t("le plan est parallèle à l'axe des y",
                                                    24, C_REGARD)))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        note.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(note, -3.11, xmax=4.6)
        self.play(FadeIn(note, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège — une normale n'est pas unique ───────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        # ⛔ LE GLYPHE ⚠ NE SE REND PAS (carré « tofu » avec son code hexa dedans,
        # défaut n° 2 de l'épisode 1) : le triangle se DESSINE.
        tri = Triangle(color=C_PIEGE, stroke_width=5).scale(0.26)
        tete = VGroup(tri, self.t("!", 24, C_PIEGE).move_to(tri.get_center() + DOWN * 0.03))
        titre = VGroup(tete, self.t("Une normale n'est pas unique", 42, C_PIEGE))
        titre.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.au_mot("Voilà le piège !")
        self.play(FadeIn(titre, shift=DOWN * 0.1), run_time=0.6)
        fig = normales_multiples().move_to(P(-4.35, 1.25))
        self.au_mot("tous ses multiples non nuls")
        self.play(FadeIn(fig.plan), run_time=0.5)
        self.play(*[GrowArrow(f) for f in fig.fleches], run_time=0.7)
        fs = 28
        # ⛔⛔ LES DEUX ÉQUATIONS, L'UNE SOUS L'AUTRE, AVEC LA DIVISION ENTRE ELLES :
        # écrites côte à côte sur une ligne, « 2x + 2y + 2z − 2 = 0  x + y + z − 1 = 0 »
        # se lirait comme UNE expression. C'est le défaut du bloc des deux normes de
        # l'épisode 10 (deux résultats pris pour un produit), évité à l'écriture.
        # ⛔ COLONNE LARGE (0,2) : à 2,2 l'étape ① faisait 7,18 pour 4,40 offerts —
        # elle tombait à 61 % de sa taille, et c'est elle que l'élève doit emporter.
        # Le schéma s'arrête à x = −2,20.
        XLC = self.XL_LARGE
        # ⛔⛔ LES DEUX ÉQUATIONS SE REMPLISSENT AU RYTHME DE LA VOIX, elles ne se
        # posent pas d'un bloc. Premier jet : tout à `au_fin("sont deux écritures du
        # même plan")`, c'est-à-dire la fin de la phrase — et le dry run a rendu un
        # `AUDIT-TARD` de **4,98 s** sur le « 2 » de la première. C'est la leçon n° 3 de
        # l'épisode 9, trouvée en relisant les plus gros TARD sur cinq épisodes
        # d'affilée. Le GROUPE est monté d'un coup (sinon le « ÷ 2 » sauterait), mais
        # chaque morceau paraît à son instant.
        q1 = self.eq_plan(*N06A, D06A, fs=fs, color=WHITE)
        q2 = self.eq_plan(*N06B, D06B, fs=fs, color=WHITE)
        div = self.sans_audit(self.t("÷ 2", 26, GREY_B))
        deux = VGroup(q1, div, q2).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(deux, 2.00, XLC)
        mm = self.sans_audit(self.t("le MÊME plan", 26, VERT_OK))
        self.col(mm, 0.95, XLC)
        self.au_fin("moins 2 égale zéro")
        self.play(FadeIn(q1, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("moins 1 égale zéro")
        self.play(FadeIn(div), FadeIn(q2, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("du même plan")
        self.play(FadeIn(mm, shift=RIGHT * 0.12), run_time=0.4)
        # ⭐ LA MÉTHODE EN DEUX TEMPS est ce que l'élève doit emporter : elle est
        # numérotée, et c'est elle que la question 07 va demander.
        self.au_mot("on procède donc en deux temps")
        # ⚠️ DEUX LIGNES, mesurées : d'un seul tenant « les normales sont-elles
        # colinéaires ? » fait 7,18 avec sa pastille. Coupée, elle fait 4,81.
        m1 = VGroup(self.pastille(1, C_VECTEUR, 0.20),
                    VGroup(self.sans_audit(self.t("les normales sont-elles", 26, WHITE)),
                           self.sans_audit(self.t("colinéaires ?", 26, WHITE)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        m1.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.col(m1, 0.10, XLC)
        self.play(FadeIn(m1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Si non, les plans sont sécants")
        m2 = self.sans_audit(self.t("non → sécants", 26, C_PIEGE))
        self.col(m2, -0.55, XLC)
        self.play(FadeIn(m2, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("pour savoir s'ils sont confondus")
        m3 = VGroup(self.sans_audit(self.t("oui → parallèles,", 26, VERT_OK)),
                    self.sans_audit(self.t("puis on teste UN point", 26, VERT_OK)))
        m3.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(m3, -1.30, XLC)
        self.play(FadeIn(m3, shift=RIGHT * 0.12), run_time=0.55)
        # ⛔ LE SECOND PIÈGE VA À GAUCHE, SOUS LA FIGURE : c'est une phrase longue, et
        # la colonne de droite n'offre plus la place à cette hauteur.
        self.au_fin("ne confonds pas vecteur normal et vecteur directeur")
        # ⚠️ « normal » et « directeur » sont des ADJECTIFS, pas des noms de vecteur :
        # pas de flèche, et `auditer-fleches-vecteurs.py` ne les réclame pas non plus.
        p2 = VGroup(self.sans_audit(self.t("normal ≠ directeur", 28, C_PIEGE)),
                    self.sans_audit(self.t("la normale d'un plan dirige toute droite",
                                           26, C_REGARD)),
                    self.sans_audit(self.t("perpendiculaire à ce plan", 26, C_REGARD)))
        p2.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(p2, color=C_PIEGE, buff=0.16, stroke_width=3)
        self.gauche(VGroup(p2, cad), -2.45, xmax=1.9)
        self.play(FadeIn(p2, scale=1.02), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 07 / 07b : la question-pause n° 2 — réponse B ──────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ LA DONNÉE, JAMAIS LA RÉPONSE : les deux équations, et aucun dessin — un
        # schéma de deux plans parallèles donnerait la réponse avant la question.
        fs = 30
        # ⛔⛔ AUCUNE ATTENTE ICI : on CONSTRUIT les deux équations, on ne les montre pas
        # encore. Première écriture : un `au_fin` posé devant chaque construction, et
        # `verifier-avant-rendu.py` a rendu un écart NÉGATIF de −5,21 s. C'est le
        # défaut de l'écran 04 de l'épisode 8, mot pour mot : **un `au_fin` ne place
        # rien, il ATTEND** — groupé en tête de méthode, il fait attendre la voix
        # entière avant le premier `play`. Les attentes sont plus bas, collées à leur
        # `play`.
        e1 = VGroup(self.sans_audit(self.t("P :", fs, C_VECTEUR)),
                    self.eq_plan(*N07, D07, fs=fs, color=WHITE))
        e1.arrange(RIGHT, buff=0.18)
        self.gauche(e1, 1.55, xmax=0.15)
        e2 = VGroup(self.sans_audit(self.t("P′ :", fs, C_VECTEUR2)),
                    self.eq_plan(*N07P, D07P, fs=fs, color=WHITE))
        e2.arrange(RIGHT, buff=0.18)
        self.gauche(e2, 0.70, xmax=0.15)
        cA = self.t("sécants", 28, WHITE)
        cB = self.t("strictement parallèles", 28, WHITE)
        cC = self.t("confondus", 28, WHITE)
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.sans_audit(self.t("Les plans P et P′", 26)),
             self.sans_audit(self.t("sont :", 26))],
            [cA, cB, cC], largeur=5.6, xl=1.0)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_fin("moins 1 égale zéro")
        self.play(FadeIn(e1, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("plus 6 égale zéro")
        self.play(FadeIn(e2, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("sont :")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "B")
        self.mem_q2 = (cartes, pause, rebours, e1, e2)

    def ecran_reponse2(self):
        cartes, pause, rebours, e1, e2 = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        # Les deux équations RESTENT : toute la correction les relit.
        fs = 26
        # ⛔⛔ PAS DE FIGURE SUR CET ÉCRAN, ET LA RAISON EST UNE PLACE COMPTÉE, pas un
        # choix de style. La colonne de gauche porte déjà SIX blocs — les deux
        # équations (qui sont la donnée et ne s'effacent pas), les trois étapes du
        # raisonnement et la conclusion encadrée —, de y = 1,55 à y = −3,20 ; et la
        # colonne de droite est occupée par les trois cartes, qui restent affichées sur
        # un écran de réponse. Un schéma de deux plans parallèles serait tombé sur les
        # étapes. ⭐ Et il n'aurait rien ajouté : toute la voix de ce clip est
        # algébrique (« divisons par 2 », « le terme constant vaut plus 3 »). La leçon
        # de l'épisode 8 vaut dans les deux sens — on dessine un plan quand le dessin
        # porte la preuve, pas pour décorer.
        self.au_fin("sont colinéaires")
        l1 = VGroup(self.coche(VERT_OK, 0.14),
                    VGroup(self.nomme("n", N07, C_VECTEUR, fs),
                           self.nomme("n", N07P, C_VECTEUR2, fs),
                           self.sans_audit(self.t("colinéaires → parallèles", fs, VERT_OK)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l1.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(l1, -0.20, xmax=0.15)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.7)
        self.au_fin("plus 3 égale zéro")
        l2 = VGroup(self.sans_audit(self.t("P′ ÷ 2 :", fs, GREY_A)),
                    self.eq_plan(2 // 2, 2 // 2, 2 // 2, int(D07P / 2), fs=28, color=WHITE))
        l2.arrange(RIGHT, buff=0.18)
        self.gauche(l2, -1.30, xmax=0.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("ce ne sont pas les mêmes plans")
        l3 = VGroup(self.croix(r=0.13),
                    self.sans_audit(self.t(f"{self.nombre(3)} ≠ {self.nombre(D07)} : "
                                           f"pas les mêmes plans", fs, C_PIEGE)))
        l3.arrange(RIGHT, buff=0.20)
        self.gauche(l3, -2.25, xmax=0.15)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("sans aucun point commun")
        fin = self.sans_audit(self.t("strictement parallèles — sans aucun point commun",
                                     28, VERT_OK))
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -3.20, xmax=4.6)
        self.play(FadeIn(fin, scale=1.03), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 08 : les deux rédactions ───────────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        titre = self.t("Deux rédactions à connaître", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Deux rédactions à connaître")
        self.play(Write(titre), run_time=0.6)
        # ⛔⛔ 23 PX ET DES LIGNES COURTES, ET C'EST UNE MESURE : à 25 px avec les
        # lignes longues, les deux cadres côte à côte faisaient **14,02** pour un
        # plafond de 10,60 — soit une réduction de 24,4 %, c'est-à-dire un modèle de
        # copie à 19 px. C'est le défaut de l'écran 08 de l'épisode 7, à sa deuxième
        # récidive. ⭐ Et ce qui cède, c'est la LONGUEUR DES LIGNES, pas la police
        # seule : chaque ligne tient maintenant sous 29 caractères.
        fs = 23
        r1 = VGroup(self.sans_audit(self.vexpr("n est un vecteur normal à P,", ("n",),
                                               fs, C_NORMALE)),
                    self.sans_audit(self.t("donc P a une équation", fs, WHITE)),
                    self.sans_audit(self.t("a x + b y + c z + d = 0,", fs, WHITE)),
                    self.sans_audit(self.t("et le point A donne d", fs, VERT_OK)))
        r1.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        t1 = VGroup(self.pastille(1, C_VECTEUR, 0.20),
                    self.sans_audit(self.t("pour une équation", 27, C_VECTEUR)))
        t1.arrange(RIGHT, buff=0.18)
        b1 = VGroup(t1, r1).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        c1 = SurroundingRectangle(b1, color=C_VECTEUR, buff=0.18, stroke_width=3)
        g1 = VGroup(b1, c1)
        r2 = VGroup(self.sans_audit(self.t("on écrit la droite qui passe", fs, WHITE)),
                    self.sans_audit(self.vexpr("par le point, de direction n,", ("n",),
                                               fs, WHITE)),
                    self.sans_audit(self.t("puis son intersection avec P :", fs, WHITE)),
                    self.sans_audit(self.t("le point trouvé EST le projeté", fs, VERT_OK)))
        r2.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        t2 = VGroup(self.pastille(2, C_NORMALE, 0.20),
                    self.sans_audit(self.t("pour un projeté orthogonal", 27, C_NORMALE)))
        t2.arrange(RIGHT, buff=0.18)
        b2 = VGroup(t2, r2).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        c2 = SurroundingRectangle(b2, color=C_NORMALE, buff=0.18, stroke_width=3)
        g2 = VGroup(b2, c2)
        tout = VGroup(g1, g2).arrange(RIGHT, buff=0.45, aligned_edge=UP)
        # ⚠️ 10,6 de large et centré en x = −0,75 : Ti-Margo commence à 5,30.
        # ⚠️ PLAFOND 11,5 : le bloc fait 11,39 et 10,60 le réduisait de 7 %. Centré en
        # −0,75, 11,5 va de −6,50 à 4,75 — dans la marge, et Ti-Margo est à 5,54.
        if tout.width > 11.5:
            tout.scale_to_fit_width(11.5)
        tout.move_to(P(-0.75, 0.15))
        self.au_mot("Pour une équation")
        self.play(FadeIn(b1, shift=RIGHT * 0.15), Create(c1), run_time=0.9)
        self.au_mot("voilà la méthode reine")
        self.play(FadeIn(b2, shift=RIGHT * 0.15), Create(c2), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 09 / 09b : le défi et sa correction ────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer !")
        tete = VGroup(pastille_pause(0.38), self.t("À toi de jouer !", 42, ORANGE_RETENUE))
        tete.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.5)
        # ⛔⛔ AUCUN MORCEAU DE PLAN SUR CET ÉCRAN, ET C'EST MESURÉ : la normale du plan
        # du défi est (1 ; 1 ; 1), que `platitude` donne à 9,02° — un parallélogramme
        # se projetterait sur un TRAIT, et l'élève croirait voir une seconde droite
        # (le défaut exact de l'épisode 5). On montre le repère et le point A ; le plan
        # est dans son ÉQUATION, qui est la donnée.
        # ⛔ Et le dessin porte la DONNÉE, jamais la RÉPONSE : pas de normale tracée
        # (c'est la méthode), pas de K (c'est le résultat).
        # ⛔⛔ TROIS AXES COURTS ET UNE GRANDE UNITÉ, ET LES DEUX COTES SONT BALAYÉES.
        # A (1 ; 1 ; 1) se projette à **8°** de l'axe des y : à portée 3, le bout de cet
        # axe tombe au MÊME rayon que A, et le DISQUE du point touchait le « y » (vu au
        # gros plan ×3, puis mesuré). Allonger l'axe n'arrange rien — il suit la même
        # direction. ⭐ Le remède est l'inverse : des axes COURTS, qui disent la
        # direction sans aller nulle part, et une unité PLUS GRANDE pour que la figure
        # reste lisible (2,62 × 2,40 au lieu de 1,72 × 2,04). Écart obtenu : 0,84.
        # ⚠️ `portee` est converti en `int` par `Repere3D` : écrire 1, pas 1,8.
        r, ax = self.repere(o=(-4.60, -1.05), u=0.98, portee=1)
        # ⛔⛔ DEUX NOMS D'AXES SONT ÉCARTÉS, ET LES COTES VIENNENT D'UN BALAYAGE.
        # Sur cet écran TOUT passe par le coin bas-gauche : les trois axes, les trois
        # barreaux de l'escalier et, en 09b, la droite normale. Mesuré :
        #   · le barreau vertical de l'escalier traversait le « x » (0,06) ;
        #   · la droite normale traversait le « y » (0,00) — elle est à 7° de cet axe.
        # ⭐ `axes()` pose un nom au bout de son axe et ne se règle pas : on le déplace
        # donc ici, APRÈS coup, aux positions d'un balayage au pas de 0,1 qui garde ce
        # qui est à plus de 0,12 de tout segment tracé et à plus de 0,20 de A et de K.
        # 33 positions libres pour le « y » sur 289 : on prend la plus proche.
        # ⚠️ `ax[1]`, `ax[3]`, `ax[5]` sont les trois noms — `axes()` rend (flèche, nom)
        # pour chaque axe, dans l'ordre x, y, z.
        ax[1].shift(RIGHT * 0.10 + DOWN * 0.10)
        ax[3].shift(RIGHT * 0.30)
        # ⛔ COLONNE LARGE (0,2) : à 2,2 la ligne de substitution de 09b faisait 6,27
        # pour 4,40 offerts, et le bloc « 3 + 3t = 0 / t = −1 » tombait sous le second
        # garde-fou de `col()` (bas à −2,14, droite au-delà de 5,3 → réduit à 3,10).
        # Le repère s'arrête à x = −2,36.
        XLC = self.XL_LARGE
        self.au_mot("Le plan P a pour équation")
        self.play(Create(ax), run_time=0.6)
        eq = VGroup(self.sans_audit(self.t("P :", 30, C_PLAN)),
                    self.eq_plan(*N09, D09, fs=30, color=WHITE))
        eq.arrange(RIGHT, buff=0.18)
        self.col(eq, 2.05, XLC)
        self.au_fin("plus z égale zéro")
        self.play(FadeIn(eq, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("1, 1, 1")
        # ⛔⛔ `decal=UL` ET NON `UR`, ET C'EST UNE MESURE : la droite normale passe
        # EXACTEMENT par A et par K (c'est sa définition), et en cavalière la direction
        # (1 ; 1 ; 1) se projette sur (1,41 ; 1,287), c'est-à-dire à 42° vers le haut à
        # DROITE. Un décalage `UR` posait donc le nom « A » PILE SUR le fût —
        # `loin_des_fleches()` l'a mesuré à **0,00**. ⭐ La règle : sur une droite, une
        # étiquette se décale PERPENDICULAIREMENT au fût, jamais le long de lui. `UL`
        # est à 2,6° de la perpendiculaire ici, et `DR` l'est pour K, de l'autre côté —
        # ce qui dit aussi que les deux points ne sont pas le même.
        # ⛔⛔ L'ESCALIER DE COORDONNÉES, ET C'EST LE GROS PLAN QUI L'A DEMANDÉ : avec
        # des axes courts (portée 1) et A au bout de la grande diagonale, le point
        # flottait à l'écart du repère — un disque orange tout seul, que rien ne reliait
        # aux axes. ⭐ C'est la figure que l'épisode 9 a trouvée pour cette famille de
        # micros : on avance de 1 en x, de 1 en y, puis on monte de 1.
        # ⚠️ Son premier barreau se superpose à l'axe des x (il va de l'origine à
        # (1 ; 0 ; 0)) : il est tracé APRÈS, en C_FANTOME, donc il reste visible
        # par-dessus. C'est l'inverse du [C G] invisible de l'épisode 9 — là-bas le
        # pointillé passait SOUS une arête déjà tracée de la même couleur.
        pa = r.point(*A09, "A", couleur=C_REGARD, decal=UL, escalier=True)
        don = VGroup(self.t("A", 30, C_REGARD), self.t("(", 30, WHITE),
                     self.trip(A09, 30, WHITE), self.t(")", 30, WHITE))
        don.arrange(RIGHT, buff=0.10)
        self.col(don, 1.25, XLC)
        self.play(FadeIn(pa), FadeIn(don, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔⛔ LA CONSIGNE VA À GAUCHE, SOUS LE REPÈRE : dans la colonne de droite elle
        # dépasse les 4,40 offerts, donc `col()` la rétrécirait — c'est-à-dire que ce
        # que l'élève doit LIRE pendant qu'il met pause deviendrait le plus petit texte
        # de la vidéo (défaut payé sur l'épisode 6).
        self.au_mot("Détermine les coordonnées du projeté orthogonal")
        cons = VGroup(self.sans_audit(self.t("détermine les coordonnées", 30, WHITE)),
                      self.sans_audit(self.t("du projeté orthogonal de A sur P", 30, WHITE)))
        cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(cons, -2.20, xmax=4.6)
        self.play(FadeIn(cons, shift=RIGHT * 0.12), run_time=0.7)
        # ⛔⛔ LE COMPTE À REBOURS VA À CÔTÉ DE LA PAUSE, PAS DESSOUS — et c'est le
        # remède déjà écrit dans l'épisode 6. `rebours_sous` le pose 0,3 plus bas, et à
        # cette hauteur-là il descendait à y = −4,3 pour une marge à −3,573 : le dry run
        # a sorti NEUF lignes `BORD` d'un coup, toutes pour ce seul objet (l'arc, le
        # cercle, le texte et le groupe sont comptés séparément).
        pause = self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE)
        self.gauche(pause, -3.10, xmax=4.6)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(pause, RIGHT, buff=0.35)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.7), run_time=0.45)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, ax, pa, eq, don, cons, pause, rebours)

    def ecran_correction(self):
        r, ax, pa, eq, don, cons, pause, rebours = self.mem_defi
        # ⛔ L'ÉCRAN DE CORRECTION HÉRITE, ET L'HÉRITAGE DESCEND PLUS BAS QU'ON NE CROIT
        # (payé sur E3, E5, E7, E8, E9 PUIS E10). Ce qui s'efface : la consigne, la
        # pause, le rebours. Ce qui RESTE : le repère, le point A, l'équation de P et
        # les coordonnées de A — ce sont les DONNÉES, et toute la correction les relit.
        # ⛔ L'ESCALIER S'EFFACE ICI : il a dit OÙ est A, et la correction trace la
        # droite normale au même endroit. Deux chemins partant du même point, l'un
        # pointillé l'autre plein, se gênent — on en laisse un de trop.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours),
                  FadeOut(pa.escalier), run_time=0.3)
        self.dire("09b-correction")
        fs, XLC = 26, self.XL_LARGE
        # ── ① la normale se LIT dans l'équation ───────────────────────────
        self.au_fin("1, 1, 1")
        nd = self.nomme("n", N09, C_NORMALE, 28)
        self.col(nd, 0.55, XLC)
        self.play(FadeIn(nd, shift=RIGHT * 0.12), run_time=0.5)
        # ── ② la droite qui passe par A et suit la normale ────────────────
        # ⛔ LES TROIS LIGNES SONT UN SYSTÈME, avec son accolade construite d'emblée :
        # montée ligne par ligne, l'accolade changerait de taille à chaque fois (socle).
        self.au_fin("z égale 1 plus t")
        from espace_ecrans import ligne_param
        sysd = self.systeme([ligne_param(v, A09[i], N09[i])
                             for i, v in enumerate(("x", "y", "z"))], fs=28)
        self.col(sysd, -0.45, XLC)
        # La droite, tracée : elle part de A et suit la normale — c'est la méthode reine.
        bas = tuple(A09[i] + (T09 - 0.35) * N09[i] for i in range(3))
        haut = tuple(A09[i] + 0.55 * N09[i] for i in range(3))
        dr = Line(r.pt(*haut), r.pt(*bas), stroke_width=5, color=C_NORMALE)
        self.play(Create(dr), FadeIn(sysd, shift=RIGHT * 0.12), run_time=0.8)
        # ── ③ on remplace, et on résout ───────────────────────────────────
        self.au_fin("Cela fait 3 plus 3 t")
        # ⚠️ DEUX LIGNES : d'un seul tenant la substitution fait 6,27, et elle tenait
        # tout juste dans la colonne large — un écart de 0,13, c'est-à-dire le genre de
        # marge qui se périme au premier changement de police (leçon de E8 : trois
        # millièmes d'unité décidaient).
        sub = VGroup(self.lettres(self.t("(1 + t) + (1 + t) + (1 + t)", 26, GREY_A)),
                     self.lettres(self.t("= 3 + 3t", 26, GREY_A)))
        sub.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(sub, -1.60, XLC)
        self.play(FadeIn(sub, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("t vaut moins 1")
        res = VGroup(self.lettres(self.t("3 + 3t = 0", 28, WHITE)),
                     self.t(f"t = {self.nombre(T09)}", 30, VERT_OK))
        res.arrange(RIGHT, buff=0.26, aligned_edge=DOWN)
        self.col(res, -2.35, XLC)
        self.play(FadeIn(res, shift=RIGHT * 0.12), run_time=0.55)
        # ── ④ on reporte : K est l'origine ────────────────────────────────
        # ⚠️ « 1 moins 1, donc zéro » : le zéro est dit en toutes lettres, hors audit.
        self.au_fin("donc zéro")
        pk = r.point(*K09, "K", couleur=VERT_OK, decal=DR, r=0.095)
        rep = self.lettres(self.t("1 − 1 = 0", 28, C_REGARD))
        self.gauche(rep, -1.95, xmax=1.9)
        self.play(FadeIn(rep, shift=RIGHT * 0.12), FadeIn(pk), run_time=0.6)
        self.au_fin("est l'origine du repère")
        fin = VGroup(self.t("K", 30, VERT_OK), self.t("(", 30, VERT_OK),
                     self.lettres(self.trip(K09, 30, VERT_OK)), self.t(")", 30, VERT_OK),
                     self.sans_audit(self.t(": l'origine", 28, VERT_OK)))
        fin.arrange(RIGHT, buff=0.10)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.60, xmax=1.9)
        self.play(FadeIn(fin, scale=1.04), Create(cad), run_time=0.7)
        self.au_fin("l'origine est bien dans P")
        ver = VGroup(self.coche(VERT_OK, 0.14),
                     self.lettres(self.t("vérification : 0 + 0 + 0 = 0", 26, C_REGARD)))
        ver.arrange(RIGHT, buff=0.20)
        self.gauche(ver, -3.25, xmax=4.6)
        self.play(FadeIn(ver, shift=RIGHT * 0.12), run_time=0.6)
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
        # elle a été réduite de 27 % par son plafond de 10,60 sans que rien ne le dise.
        fs = 26
        faits = (("les coefficients :", C_REGARD, "a x + b y + c z + d = 0  →  n (a ; b ; c)",
                  ("n",), "sont les coordonnées d'un vecteur normal"),
                 ("un point + une normale :", C_VECTEUR, "suffisent pour l'équation", None,
                  "suffisent pour écrire l'équation"),
                 ("deux normales colinéaires :", C_NORMALE, "deux plans parallèles", None,
                  "annoncent deux plans parallèles"),
                 ("un projeté orthogonal :", VERT_OK, "on suit la normale", None,
                  "on suit la normale"))
        blocs = []
        for g, cg, d, dn, _ in faits:
            droite_ = (self.sans_audit(self.vexpr(d, dn, fs, WHITE)) if dn
                       else self.sans_audit(self.t(d, fs, WHITE)))
            blocs.append(VGroup(self.sans_audit(self.t(g, fs, cg)), droite_)
                         .arrange(RIGHT, buff=0.22, aligned_edge=DOWN))
        lignes = VGroup(*[VGroup(self.coche(VERT_OK, 0.22), b)
                          .arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.46)
        # ⚠️ PLAFOND 11,0 ET NON 10,60 : les quatre rangées font 10,75, et 10,60 les
        # réduisait de 1,4 % — sur l'écran que l'élève relit le plus. Centré en −0,75,
        # 11,0 de large s'arrête à 4,75, et Ti-Margo à scale 0,65 commence à 5,30.
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
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


class PsEspacePlanNormalTerminale(PsEspacePlanNormalBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
