# ps_espace_defi_short.py
# EleveAI — Maths Tle spé — short « le plan (BDE) coupe la diagonale à son premier
# tiers » (9:16), ceinture VERTE. Micro du coach : ps_espace_defi.
# Paysage jumeau : ps_espace_defi.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : on atteint un projeté orthogonal en SUIVANT LA NORMALE — et le
# résultat est une surprise géométrique.
#
#   · 00-accroche   : le plan (BDE) coupe la grande diagonale. En son milieu ? Non ;
#   · 01-idee       : le cube, B, D, E en ambre, la diagonale [A G], puis l'équation du
#                     plan, sa normale, la droite, la substitution et t = 1/3 ;
#   · 02/02b        : question-pause (A : au tiers), 3 s, puis le point K apparaît ;
#   · 03-commentaire: la distance de A au plan — ⛔ la réponse (√3/3 ≈ 0,58) n'est NI
#                     dite NI affichée ;
#   · 04-abonne     : la fin commune.
#
# ⛔⛔⛔ PAS DE TRIANGLE (BDE) REMPLI. Sa normale est (1 ; 1 ; 1) : en cavalière il se
# projette sur une LAME (platitude mesurée ci-dessous, bien au-dessous des 12° qu'il faut
# pour qu'un morceau de plan se lise comme une surface). Rempli, il se lirait
# « quelconque » et l'écran enseignerait autre chose que la voix. C'est le défaut n° 1 de
# l'épisode 12 de la série, et il est repris tel quel ici.
# ⛔⛔ ET LE POINT K N'APPARAÎT QU'EN 02b. Le poser pendant la pause, c'est montrer la
# réponse à la question qu'on vient de poser : la pause montre le cube, la diagonale et
# t = 1/3 déjà calculé — pas le point.
#
# Voix : manim/voix/terminale-ps-espace-defi-short.json, calée par
# ps_espace_defi_short_marques.json (217 marques — une de plus que les 216 d'origine,
# le 02-question ayant été repris le 23/11 pour la devinabilité).
# Découpage : manim/poste2/DECOUPAGE-shorts-ps-espace.md, section E12.
#
# Mesure (⛔ AVANT tout rendu) : python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E12
# Avant rendu : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/terminale/ps_espace_defi_short.py PsEspaceDefiShort
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/ps_espace_defi_short.py PsEspaceDefiShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/ps_espace_defi_short.py PsEspaceDefiShort -o eleveai-maths-terminale-ps-espace-defi-short --media_dir manim/scripts/terminale/media-ps-espace-defi-short

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

from espace_commun_short import *  # noqa: E402,F403

# ── LES DONNÉES, REFAITES à l'import ────────────────────────────────────────
S = ShortEspace.CUBE_SOMMETS
NORMALE = (1, 1, 1)                 # (BDE) : x + y + z − 1 = 0
T = 1.0 / 3.0
K = (T, T, T)
BONNE = 0                           # A — tirage des shorts : A C B C B A
U_CUBE, Y_CUBE = 0.65, 1.58
# ⚠️ L'écran de réponse n'a plus de colonne de calcul : son cube peut être plus
# grand, et il a besoin de l'être (voir le bloc du point K).
U_K = 0.70

# ⭐ L'ÉQUATION DU PLAN EST REFAITE, pas recopiée : B, D et E la vérifient tous les trois,
# et A ne la vérifie pas (sinon A serait dans le plan et le projeté serait A lui-même).
def _plan(p):
    return sum(p) - 1.0


for _s in ("B", "D", "E"):
    assert abs(_plan(S[_s])) < 1e-12, _s
assert abs(_plan(S["A"]) + 1.0) < 1e-12
# ⭐ La normale est bien normale : orthogonale à deux directions non colinéaires du plan.
_n = np.array(NORMALE, dtype=float)
_u = np.array(S["D"], float) - np.array(S["B"], float)
_v = np.array(S["E"], float) - np.array(S["B"], float)
assert np.linalg.norm(np.cross(_u, _v)) > 1e-9
assert abs(float(_n @ _u)) < 1e-12 and abs(float(_n @ _v)) < 1e-12
# ⭐ La substitution : 3t − 1 = 0, donc t = 1/3, et le projeté est sur la diagonale.
assert abs(3 * T - 1) < 1e-12
assert abs(_plan(K)) < 1e-12
_AG = np.array(S["G"], float) - np.array(S["A"], float)
assert np.allclose(np.array(K) - np.array(S["A"], float), T * _AG)
# ⛔ LES DEUX LEURRES SONT RÉFUTÉS PAR L'ÉQUATION ELLE-MÊME, et on le recalcule :
# le milieu donne 1/2, les deux tiers donnent 1 — ni l'un ni l'autre n'est nul.
assert abs(_plan((0.5, 0.5, 0.5)) - 0.5) < 1e-12
assert abs(_plan((2 / 3, 2 / 3, 2 / 3)) - 1.0) < 1e-12
# ⛔⛔ ET LA RAISON DE NE PAS DESSINER LE TRIANGLE (BDE), MESURÉE ET PAS CRUE :
# `platitude()` rend l'angle entre la normale du plan et le noyau de la projection ;
# au-dessous de ~12° le morceau de plan se projette sur une lame. S'il était au-dessus,
# l'interdiction serait une superstition.
PLATITUDE = platitude(NORMALE)
assert PLATITUDE < 12.0, PLATITUDE
# ⭐ Le défi de l'écran 03 : la distance de A au plan vaut √3/3 ≈ 0,58. Ni dite, ni
# affichée — mais vérifiée, pour que la question ne soit pas posée au hasard.
assert abs(abs(_plan(S["A"])) / math.sqrt(3) - math.sqrt(3) / 3) < 1e-12


def ecarte_a_echelle(u, reference=1.10):
    """Les écarts de nom du socle, RAMENÉS À L'ÉCHELLE de ce cube.

    ⛔⛔ `ECARTE_CUBE_DIAG` est une table de cotes ABSOLUES, mesurée à u ≥ 1,00. Ce short
    dessine son cube à u = 0,70 : appliqué tel quel, l'écart de « D » (−0,44) vaut alors
    0,63 d'arête au lieu de 0,40, et le nom part bien plus loin qu'il ne faut. C'est la
    leçon ⚠️⚠️ de l'épisode 12 — « une cote d'écart est relative à son u » — et la note
    donne même le chiffre : le même écart remet « D » à 0,064 d'une arête quand on change
    de u. On ramène donc l'écart au même rapport, au lieu de le recopier.
    ⭐ `mesure-shorts-ps-espace.py` vérifie ensuite chaque nom contre les traits de sa
    propre figure : c'est lui qui dit si le compte y est, pas ce raisonnement."""
    k = u / reference
    out = {s_: (dx * k, dy * k) for s_, (dx, dy) in ShortEspace.ECARTE_CUBE_DIAG.items()}
    # ⚠️ ET « B » A BESOIN DU SIEN, que le socle ne lui donne pas. Mesuré sur CETTE
    # figure (le cube à u = 0,65, la diagonale [A G] tracée et les trois points B, D, E
    # posés dessus) : à sa place par défaut, le nom est à **0,120** d'un trait, c'est-à-
    # dire exactement au seuil où `mesure-shorts-ps-espace.py` dit « serré ».
    # ⭐ Cherché en grille, un pas de 0,03, mêmes critères que le socle : à plus de 0,16
    # de tout trait, à plus de 0,34 de chaque autre nom, et le plus PROCHE possible de
    # son propre sommet pour qu'on sache à qui il appartient. 566 places libres, la
    # retenue est à 0,181 du trait le plus proche et à 0,35 du sommet.
    # ⛔ Cette cote vaut pour CE cube et CETTE figure : les points B, D, E posés sur les
    # sommets changent la grille, et un écart mesuré ailleurs ne vaut pas ici.
    out["B"] = (-0.27, -0.09)
    # ⛔⛔ ET « D » AUSSI, PARCE QUE LE RAMENER À L'ÉCHELLE L'AVAIT CASSÉ. Vu au gros
    # plan du 26/11 et mesuré ensuite : avec l'écart mis à l'échelle (−0,26), le nom
    # « D » tombait à **0,315 du sommet A** et à 0,520 du sien — autrement dit le
    # sommet A avait « D » pour nom le plus proche, devant son propre « A » (0,368).
    # Sur un short dont toute la leçon est le plan (BDE) et la diagonale [AG], c'est
    # la figure entière qui ment.
    # ⭐ LA CAUSE EST DANS LA MISE À L'ÉCHELLE ELLE-MÊME, et c'est contre-intuitif :
    # l'écart BRUT du socle (−0,44) éloignait assez le nom pour qu'il dégage le sommet
    # A ; ramené au rapport u/1,10 il ne l'éloigne plus assez. Mesuré sur les quatre
    # tailles : sans écart la marge vaut −0,181, avec l'écart brut −0,010, avec
    # l'écart mis à l'échelle −0,053. Aucun des trois ne passe à u = 0,65.
    # ⚠️ Et le cube ne peut pas grandir pour s'en sortir : il occupe 1,694 entre le
    # badge (2,480) et la colonne de calcul (0,640), soit 1,84 de fente.
    # ⭐ Cherché en grille (pas de 0,03, 1 681 places) avec le critère qui manquait —
    # CHAQUE SOMMET MONTRÉ DOIT AVOIR SON PROPRE NOM POUR PLUS PROCHE VOISIN. Les
    # meilleures marges sont sous le cube, à 0,57 du sommet : un « D » qui flotte
    # au-dessous se lit comme l'étiquette de l'arête [AB]. On garde donc la colonne de
    # gauche, où E, D et A se lisent dans l'ordre de hauteur de leurs sommets, et on
    # retient (−0,30 ; +0,15) : marge **+0,062**, 0,294 du trait le plus proche.
    out["D"] = (-0.30, 0.15)
    return out


def controler_noms(r, c, montres):
    """Chaque sommet montré a-t-il SON nom pour plus proche voisin ?

    ⛔⛔ C'EST LE CONTRÔLE QUI MANQUAIT À LA SÉRIE, et son absence a laissé passer un
    « D » posé sur le sommet A jusqu'aux planches. `--ancres` mesure un nom contre les
    TRAITS, `etiquettes()` mesure les noms ENTRE EUX : ni l'un ni l'autre ne demande
    jamais *à qui un nom appartient*. Un nom peut donc être à bonne distance de tout,
    et désigner le mauvais sommet.
    ⭐ Il tient en dix lignes, il s'exécute au `pieces()`, et il casse le rendu au lieu
    de laisser l'erreur atteindre l'image.
    ⚠️ Les noms sont les DERNIERS mobjets du cube, et `cube_place(noms=…)` retire du
    groupe ceux qu'on ne montre pas : on les relit donc dans l'ordre « ABCDEFGH »
    filtré, et surtout pas par `c[len(c) - 8 + i]`. C'est ce décalage qui avait rendu
    mon premier relevé faux, et il accusait trois noms innocents."""
    gardes = [s for s in "ABCDEFGH" if s in montres]
    etiq = {s: c[len(c) - len(gardes) + i] for i, s in enumerate(gardes)}
    som = {k: np.array(r.pt(*v))[:2] for k, v in S.items()}
    for k in montres:
        d = sorted((float(np.linalg.norm(np.array(etiq[L].get_center())[:2] - som[k])), L)
                   for L in montres)
        if d[0][1] != k:
            raise AssertionError(
                f"le sommet {k} a « {d[0][1]} » pour nom le plus proche ({d[0][0]:.3f}) "
                f"et non le sien ({next(x for x, L in d if L == k):.3f})")


def carte_lignes(e, texte, fs=24, largeur=3.95):
    """Coupe un libellé de carte contre le plafond RÉEL du corps de `carte_choix`.

    ⛔ `lignes()` coupe à `LARG` (3,90), la largeur d'un bloc de TEXTE. Une carte réserve
    0,95 au rond et aux marges, puis 0,20 d'écart et le diamètre du rond : il ne reste que
    **2,41 à 24 px**. Mesuré ici : « aux deux tiers de [A G] » d'une seule ligne tombait
    à **16,2 px obtenus**, et augmenter la police n'y change rien — c'est la largeur qui
    décide (épisode 5)."""
    plafond = largeur - 0.95 - 0.20 - 0.21 * fs / 26 * 2
    mots, lignes, cur = texte.split(), [], ""
    for m in mots:
        essai = (cur + " " + m).strip()
        if cur and Text(essai, font_size=fs).width > plafond:
            lignes.append(cur)
            cur = m
        else:
            cur = essai
    if cur:
        lignes.append(cur)
    for ligne in lignes:
        if Text(ligne, font_size=fs).width > plafond:
            raise ValueError(f"« {ligne} » ne tient pas dans {plafond:.2f} à {fs} px")
    return VGroup(*[e.t(x, fs, larg=None) for x in lignes]).arrange(
        DOWN, aligned_edge=LEFT, buff=0.05)


def frac(e, haut, bas, fs=24, color=WHITE):
    """Une fraction : numérateur, barre, dénominateur.
    ⛔ Le socle des shorts n'en a pas et il est GELÉ ; `frac()` vit dans un épisode
    LIVRÉ, qu'on n'importe pas (ce serait exécuter ses assertions de figure et se lier à
    un fichier qui n'a aucune raison de rester stable)."""
    h = haut if isinstance(haut, Mobject) else e.t(str(haut), fs, color, larg=None)
    b = bas if isinstance(bas, Mobject) else e.t(str(bas), fs, color, larg=None)
    g = VGroup(h, b).arrange(DOWN, buff=0.14)
    barre = Line(LEFT, RIGHT, stroke_width=max(2.0, fs / 14.0), color=color)
    barre.set_length(max(h.width, b.width) + 0.14).move_to(g)
    return VGroup(g, barre)


def tiers(e, fs=24, color=WHITE):
    """« 1/3 », hors audit — la voix dit « un tiers », en LETTRES.
    ⛔ L'audit cherche les chiffres « 1 » et « 3 » à l'instant où la fraction paraît et
    les trouve bien plus tôt (dans le triplet de la normale). Ce n'est pas un défaut de
    synchro, c'est une différence d'écriture, et un gros TARD qu'on apprend à ignorer
    est ce qui fait rater le petit signalement voisin."""
    return e.sans_audit(frac(e, "1", "3", fs, color))


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    # ⚠️ 30 px : « Type bac : le projeté » du découpage fait 5,46 à 38 px pour 3,90
    # offerts — il serait tombé à 27 px. Raccourci et remesuré, il tient à 30.
    titre, badge = e.entete_blocs("Type bac : projeté", fs=30)

    # ── 00 : en son milieu ? Non. ───────────────────────────────────────────
    # ⛔⛔ « (BDE) » ET NON « B D E » : c'est un PLAN, et la notation tranche. Écrit avec
    # des espaces, « B D » entre dans la règle des noms de vecteur et
    # `mesure-shorts-ps-espace.py --fleches` le signale comme nu — à juste titre, puisque
    # deux majuscules séparées d'un espace, à l'écran d'une terminale, c'est un vecteur.
    # ⭐ Collé entre parenthèses, il n'y entre plus du tout : la règle exige qu'aucune
    # LETTRE ne suive le couple, et « E » en suit un. C'est la convention de toute la
    # série — « (A B) » la droite, « [A G] » le segment, « (BDE) » le plan, « A G⃗ » le
    # vecteur — et l'épisode paysage l'écrit ainsi vingt-quatre fois.
    # ⚠️ Donc cette ligne ne passe plus par `blocs_phrase` (qui recopie la voix mot pour
    # mot, et la voix dit « B D E ») : elle est coupée à la main et son ancre est posée
    # explicitement, comme l'écran 03 du short de l'épisode 6.
    # ⛔ MAJUSCULE ET POINT : le gros plan du 26/11 a montré une accroche qui s'ouvrait
    # sur « le plan (BDE) coupe » — la ligne recopiait le milieu de la voix (« Dans le
    # cube, le plan B D E coupe… »). Une accroche est la PREMIÈRE chose qu'on lit.
    # ⭐ Les deux lignes sont coupées à la main (la voix dit « B D E »), donc rien
    # n'oblige à recopier sa casse. Mesuré : 3,75 et 3,71 pour 3,90 offerts.
    a1 = e.pose(VGroup(*e.lignes("Le plan (BDE) coupe", 26)[0],
                       *e.lignes("la grande diagonale.", 26)[0]
                       ).arrange(DOWN, buff=0.12), 1.85)
    a2 = e.blocs_phrase("En son milieu ?", 0.55, 30, C_REGARD)
    # ⛔ `larg=3,60` : la borne d'un bloc encadré que `insister` fait battre de 5 %.
    a3 = e.blocs_phrase("Non.", -1.10, 44, C_PIEGE, larg=3.60)
    cadre3 = SurroundingRectangle(a3, color=C_PIEGE, buff=0.18, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("le plan coupe", a1),
                        ("en son milieu", a2), ("non", VGroup(a3, cadre3))]

    # ── 01 : le cube, puis la chaîne de calcul ──────────────────────────────
    # ⛔ SEULS A, B, D, E ET G SONT NOMMÉS : ce sont les cinq sommets dont la question
    # parle. « C », « F » et « H » n'apportent rien et la grille des noms est déjà serrée
    # avec la diagonale tracée (« quand la grille ne trouve rien, on n'étiquette pas »).
    r, _cube, _vs, cubeg = e.cube_place(U_CUBE, Y_CUBE, ecarte=ecarte_a_echelle(U_CUBE),
                                        noms=("A", "B", "D", "E", "G"))
    controler_noms(r, _cube, ("A", "B", "D", "E", "G"))
    ag = e.arete(r, "A", "G", couleur=C_VECTEUR2, sw=5)
    # ⛔⛔ PAS DE TRIANGLE (BDE) : voir l'en-tête, la platitude est mesurée à l'import.
    #
    # ⛔⛔⛔ ET PAS DE POINTS NON PLUS — VU AU GROS PLAN ×1,7, ET PAR RIEN D'AUTRE.
    # Premier jet : un `Dot` ambre sur chacun des trois sommets B, D et E. Mesuré après
    # coup, la projection cavalière met **D à 0,057 de la diagonale [A G]**, pour un
    # point de rayon 0,075 : le disque la recouvre. À l'écran, le point se lisait comme
    # un point DE la diagonale — c'est-à-dire exactement ce que ce short cherche, et la
    # figure désignait un faux K, quinze secondes avant le vrai.
    # ⭐ Aucun instrument ne pouvait le dire : `etiquettes()` ne mesure que des MOTS, et
    # la comparaison deux à deux exclut par construction les blocs « + … », qui sont
    # posés SUR la figure et dont le recouvrement est voulu.
    # ⭐ Le remède est celui du découpage, pris au mot : ce sont les trois NOMS qui
    # passent en ambre. Un nom ne tombe pas sur une diagonale — la grille des écarts du
    # socle s'en occupe — et la couleur dit la même chose sans rien ajouter à la figure.
    # ⚠️ Du coup la diagonale change de couleur : ambre = les données du plan, magenta =
    # la diagonale. Deux choses différentes ne portent pas la même couleur.
    pts = VGroup(*[t_ for t_ in cubeg.get_family()
                   if isinstance(t_, Text)
                   and getattr(t_, "original_text", "") in ("B", "D", "E")])
    assert len(pts) == 3, [t_.original_text for t_ in pts]
    pts.set_color(C_REGARD)
    # ⚠️ « (BDE) : » EN TÊTE DE L'ÉQUATION, et 22 px : sans le nom du plan, l'équation
    # n'est attribuée à rien ; avec lui elle fait 4,0 à 24 px pour 3,90 offerts, donc
    # elle serait réduite. ⭐ Et « (BDE) » collé entre parenthèses ne déclenche pas la
    # règle des noms de vecteur, contrairement à « B D E ».
    eqp = e.pose(e.eq_mots(["(BDE) :", "x", "+", "y", "+", "z", "−", "1", "=", "0"], 22),
                 0.50)
    nvec = e.pose(VGroup(e.vec("n", 24, VERT_OK),
                         e.trip(NORMALE, 24, VERT_OK, par=True)
                         ).arrange(RIGHT, buff=0.16), -0.08)
    param = e.pose(e.t("x = y = z = t", 24, C_VECTEUR2, larg=None), -0.66)
    # ⚠️ « 3 » hors audit : la voix dit « trois t moins 1 égale zéro », donc le 3 en
    # LETTRES. Le « 1 », lui, est dit en chiffre et reste surveillé — c'est le seul
    # nombre de cette ligne que l'audit doit voir. `eq_mots` exempte déjà le « 0 ».
    subst = e.eq_mots(["3t", "−", "1", "=", "0"], 24)
    e.sans_audit(subst[0])
    e.pose(subst, -1.24)
    tfrac = VGroup(e.t("t =", 28, VERT_OK, larg=None), tiers(e, 28, VERT_OK)
                   ).arrange(RIGHT, buff=0.16)
    e.pose(tfrac, -2.08)
    cadre_t = SurroundingRectangle(tfrac, color=VERT_OK, buff=0.14, stroke_width=3)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("cube", cubeg),
                    ("+ [A G]", ag),
                    ("équation du plan", eqp), ("la normale", nvec),
                    ("la droite", param), ("la substitution", subst),
                    ("t", VGroup(tfrac, cadre_t))]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ LES TROIS CHOIX GARDENT LA MÊME FORME, et c'est ce qui compte plus encore que
    # leur longueur : trois tournures parallèles ne laissent aucune prise au devineur.
    # ⛔⛔ Et ils s'écrivent « [A G] », avec les CROCHETS du segment. « A G » nu se lit
    # comme un vecteur à l'écran d'une terminale, et l'audit des flèches le signalerait
    # — à juste titre, puisque la notation seule tranche. Ici c'est bien la diagonale,
    # c'est-à-dire un segment, et le point s'y situe.
    fsq, fsc = 26, 24
    # ⛔⛔ « [AG] » SANS ESPACE, ET C'EST LA PLANCHE QUI L'A DIT. Écrit « [A G] », le
    # découpage des cartes coupe aux ESPACES : la carte A affichait « au tiers de [A » /
    # « G] », une notation brisée en deux lignes. Un segment ne se coupe pas au milieu de
    # son nom. ⭐ Collé, « [AG] » est un seul mot, il reste entier — et il est tout aussi
    # exempté par l'audit des flèches, qui regarde les caractères autour du couple de
    # majuscules (« [ » et « ] »).
    CHOIX = ("au tiers de [AG]", "au milieu de [AG]", "aux deux tiers de [AG]")
    assert len(CHOIX[BONNE]) < min(len(CHOIX[1]), len(CHOIX[2])), [len(c) for c in CHOIX]
    # ⛔⛔ « CE POINT » NE DÉSIGNAIT RIEN, ET C'EST LE GROS PLAN DU 26/11 QUI L'A VU.
    # L'écran de pause affichait « Ce point est situé où sur la diagonale ? » avec les
    # trois cartes — et RIEN D'AUTRE : ni cube, ni diagonale, ni t = 1/3. Le découpage
    # demandait pourtant que la pause les montre. Un élève qui met pause lisait un
    # démonstratif sans antécédent, sur le seul écran qu'il regarde longtemps.
    # ⚠️ Remettre la figure est impossible : la question (2 lignes) et les trois cartes
    # (2 lignes chacune) prennent déjà ~3,3 des 3,885 disponibles, et un cube fait 1,40.
    # ⭐ On change donc la QUESTION, pour qu'elle se tienne debout toute seule — et elle
    # referme l'accroche, qui demandait « En son milieu ? Non. ». Mesuré : deux lignes,
    # 3,05 d'unité au lieu de 3,74, l'écran y gagne même de l'air.
    # ⛔ « [AG] » collé, comme les trois cartes : la coupe se fait aux espaces.
    q_lignes, _ = e.lignes("Où le plan (BDE) coupe-t-il [AG] ?", fsq)
    tete, q, cartes, pause, rebours = e.q_tete(
        q_lignes, [carte_lignes(e, c, fsc) for c in CHOIX], fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]

    # ── 02b : le point K apparaît ENFIN ─────────────────────────────────────
    # ⚠️ Le cube de cet écran est REBÂTI (il n'était pas à l'écran pendant la pause), et
    # à la même échelle : une cote d'écart de nom est relative à son `u`.
    r2, _c2, _v2, cube2g = e.cube_place(U_K, 1.10, ecarte=ecarte_a_echelle(U_K),
                                        noms=("A", "G"))
    controler_noms(r2, _c2, ("A", "G"))
    ag2 = e.arete(r2, "A", "G", couleur=C_VECTEUR2, sw=5)
    # ⛔⛔ LE POINT SEUL NE SUFFIT PAS, ET LA MESURE LE DIT : dans cette projection, K
    # tombe à **0,100 d'unité du sommet D** à u = 0,65 (0,108 à u = 0,70), pour un point
    # de rayon 0,085. Posé seul, il se lit comme un sommet du cube et non comme un point
    # de la diagonale — la même faute que les trois `Dot` de l'écran 01, un écran plus
    # loin et sur l'image qui porte la réponse.
    # ⭐⭐ Le remède n'est pas de déplacer le point, c'est de montrer le TIERS : le
    # premier tiers de la diagonale est repassé en vert, et K est le bout de ce vert.
    # La réponse « au tiers » devient alors une LONGUEUR qu'on voit, et plus un point
    # qu'il faut croire. ⚠️ Et le cube est un peu agrandi (0,70 au lieu de 0,65) parce que cet
    # écran n'a pas de colonne de calcul à loger.
    _a2, _k2 = r2.pt(*S["A"]), r2.pt(*K)
    ktiers = Line(_a2, _k2).set_stroke(VERT_OK, 8)
    assert abs(float(np.linalg.norm(np.array(_k2) - np.array(_a2))
                     / np.linalg.norm(np.array(r2.pt(*S["G"])) - np.array(_a2))) - T) < 1e-9
    kdot = Dot(_k2, radius=0.085, color=VERT_OK)
    fig_k = VGroup(cube2g, ag2, ktiers, kdot)
    fig_k.move_to(P(0, 1.58))
    # ⭐⭐ K NE PORTE PAS D'ÉTIQUETTE, ET C'EST LA COULEUR QUI RELIE : le point est vert,
    # et le bloc « K (1/3 ; 1/3 ; 1/3) » est vert et encadré de vert. La grille des noms
    # est déjà prise par A et G sur la même diagonale ; poser un « K » de plus à moins de
    # 0,14 d'un trait ferait exactement le défaut de l'épisode 9 (« un nom de sommet
    # traversé par un fût »). « Quand la grille ne trouve rien, on n'étiquette pas. »
    # ⚠️ LES TROIS TIERS SONT ÉCRITS EN LIGNE ET NON EN FRACTIONS BÂTIES, et c'est une
    # cote : trois `frac()` côte à côte font **0,83 de haut**, et il ne reste que 0,78
    # sous les cartes avant la boîte de Ti-Margo (mesuré : le bloc descendait à −3,01).
    # La grande fraction encadrée, elle, a toute sa place à l'écran 01, où elle est la
    # conclusion du calcul.
    # ⛔ Tout le bloc est hors audit : « un tiers, un tiers, un tiers » est dit en
    # LETTRES, et « K » est une lettre.
    bloc_k = e.sans_audit(e.t("K (1/3 ; 1/3 ; 1/3)", 26, VERT_OK, larg=None))
    e.pose(bloc_k, float(cartes.get_bottom()[1]) - 0.38)
    cadre_k = SurroundingRectangle(bloc_k, color=VERT_OK, buff=0.12, stroke_width=3)
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("figure K", fig_k), ("K", VGroup(bloc_k, cadre_k))]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    # ⛔ « (BDE) » AVEC SES PARENTHÈSES : c'est un PLAN, pas un vecteur ni un produit.
    # C'est la convention tranchée par la passe des flèches (épisode 8) : « (A G) » la
    # droite, « [A G] » le segment, « (BDE) » le plan, « A G⃗ » le vecteur.
    # ⛔ « La distance de A » ET NON « la distance du point A ». Deux défauts d'un coup,
    # vus au gros plan du 26/11 : la minuscule d'ouverture, et surtout « la distance du
    # point A » qui se coupait en « la distance du » / « point A » — le A, c'est-à-dire
    # le point dont parle toute la question, se retrouvait SEUL sur sa ligne.
    # ⭐ Mesuré à 28 px : « La distance de A » tient sur une ligne (3,26 pour 3,90), et
    # la question redevient deux lignes nettes. C'est l'écriture du découpage.
    dq = e.pose(VGroup(*e.lignes("La distance de A", 28, color=C_REGARD)[0],
                       *e.lignes("au plan (BDE) ?", 28, color=C_REGARD)[0]
                       ).arrange(DOWN, buff=0.14), 1.55)
    appel = e.appel_blocs(-0.60)
    p["03-commentaire"] = [("à toi", et), ("question", dq), ("appel", appel)]
    return p


class PsEspaceDefiShort(ShortEspace):
    fichier_marques = "ps_espace_defi_short_marques.json"
    nom_voix = "terminale-ps-espace-defi-short"

    def construct(self):
        p = self.par_nom(pieces(self))
        titre, badge = p["00-accroche"]["titre"], p["00-accroche"]["badge"]

        # ── 00 : l'accroche ─────────────────────────────────────────────────
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        a = p["00-accroche"]
        self.au_mot("le plan B D E coupe la grande diagonale")
        self.play(FadeIn(a["le plan coupe"], shift=UP * 0.08), run_time=0.4)
        self.jouer_phrase(a["en son milieu"], "En son milieu ?")
        self.au_mot("Non.")
        self.play(FadeIn(a["non"][0], scale=1.2), Create(a["non"][1]), run_time=0.45)
        self.insister(a["non"], 1.05)
        self.attendre_voix(marge=0.25)

        # ── 01 : la chaîne de calcul ────────────────────────────────────────
        self.dire("01-idee")
        i = p["01-idee"]
        self.play(FadeOut(VGroup(a["le plan coupe"], a["en son milieu"], a["non"])),
                  run_time=0.25)
        self.au_mot("Le plan B D E")
        self.play(FadeIn(i["cube"]), run_time=0.45)
        self.au_fin("x plus y plus z moins 1 égale zéro")
        self.play(FadeIn(i["équation du plan"], shift=UP * 0.08), run_time=0.35)
        self.au_fin("donc pour vecteur normal 1, 1, 1")
        self.play(FadeIn(i["la normale"], shift=UP * 0.08), run_time=0.35)
        # ⭐ La diagonale paraît AVEC la droite qui la porte : c'est la même chose dite
        # deux fois, et `avec=` évite que le `play` de la figure coûte son temps au
        # budget du clip.
        self.au_fin("x égale t, y égale t, z égale t")
        self.play(FadeIn(i["la droite"], shift=UP * 0.08),
                  Create(i["+ [A G]"]), run_time=0.4)
        self.au_fin("trois t moins 1 égale zéro")
        self.play(FadeIn(i["la substitution"], shift=UP * 0.08), run_time=0.35)
        self.au_fin("donc t vaut un tiers")
        self.play(FadeIn(i["t"][0], shift=UP * 0.08), Create(i["t"][1]), run_time=0.4)
        self.insister(i["t"], 1.05)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question-pause ──────────────────────────────────────────
        # ⛔⛔ LE CUBE DISPARAÎT POUR LA QUESTION, ET LE POINT K N'EXISTE PAS ENCORE.
        # La pause ne doit montrer ni le point ni rien qui le désigne : elle pose la
        # question, et la réponse arrive en 02b.
        self.dire("02-question")
        t0 = self.renderer.time
        qq = p["02-question"]
        self.play(FadeOut(VGroup(i["cube"], i["+ [A G]"],
                                 i["équation du plan"], i["la normale"], i["la droite"],
                                 i["la substitution"], i["t"])), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(qq["tête"], shift=DOWN * 0.12), run_time=0.3)
        self.au_mot("Ce point est donc situé où")
        self.play(FadeIn(qq["question"], shift=UP * 0.08), run_time=0.35)
        self.q_montrer_choix(qq["cartes"])
        self.q_pause(qq["pause"], qq["rebours"], "02-question", t0, BONNE)

        # ── 02b : la réponse, et le point K ─────────────────────────────────
        self.dire("02b-reponse")
        r = p["02b-reponse"]
        cartes = qq["cartes"]
        ok = self.q_reponse(cartes, BONNE, qq["pause"], qq["rebours"])
        self.play(FadeOut(VGroup(qq["tête"], qq["question"])), run_time=0.25)
        cube2g, ag2, ktiers, kdot = r["figure K"]
        self.au_fin("Le vecteur A G a pour coordonnées 1, 1, 1")
        self.play(FadeIn(cube2g), Create(ag2), run_time=0.45)
        # ⭐ K ARRIVE ICI, ET SEULEMENT ICI.
        self.au_fin("un tiers, un tiers, un tiers")
        self.play(Create(ktiers), FadeIn(kdot, scale=2.0), run_time=0.45)
        self.au_mot("c'est exactement un tiers du vecteur A G")
        self.play(FadeIn(r["K"][0], shift=UP * 0.08), Create(r["K"][1]), run_time=0.4)
        self.insister(r["K"], 1.05)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire ─────────────────────────────────
        self.dire("03-commentaire")
        c = p["03-commentaire"]
        self.play(FadeOut(VGroup(cartes, r["figure K"], r["K"], ok, titre, badge)),
                  run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(c["à toi"], shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Quelle est alors la distance")
        self.play(FadeIn(c["question"], shift=UP * 0.08), run_time=0.4)
        self.jouer_appel(c["appel"])
        self.attendre_voix(marge=0.5)

        # ── 04 : la fin ─────────────────────────────────────────────────────
        self.fin_short("04-abonne", [c["à toi"], c["question"], c["appel"]])
