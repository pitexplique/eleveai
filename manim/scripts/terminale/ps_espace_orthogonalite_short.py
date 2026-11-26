# ps_espace_orthogonalite_short.py
# EleveAI — Maths Tle spé — short « orthogonal à une direction, et pourtant dedans »
# (9:16), ceinture VERTE. Micro du coach : ps_espace_orthogonalite.
# Paysage jumeau : ps_espace_orthogonalite.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : un seul produit scalaire nul ne prouve RIEN sur un plan.
#
#   · 00-accroche   : le titre, l'échelle, ce qu'un produit scalaire nul prouve, et ce
#                     qu'il ne prouve pas ;
#   · 01-idee       : le poteau de Marc, vu de face puis vu de côté — droit dans un sens,
#                     penché dans l'autre. ⭐ Les deux vues côte à côte portent toute la
#                     leçon, et c'est pour ça qu'elles sont PLANES ;
#   · 02/02b        : question-pause (C : non, le nord est dans le sol), 3 s, puis le sol
#                     dessiné à plat avec le nord et l'est DEDANS ;
#   · 03-commentaire: [A B] et [C G] du cube — ⛔ la réponse (non, elles ne se coupent
#                     pas) n'est NI dite NI affichée ;
#   · 04-abonne     : la fin commune.
#
# ⛔⛔ POURQUOI DES SCHÉMAS PLANS ET PAS DE LA CAVALIÈRE. `poteau_vue` et `plan_dessine`
# ne projettent rien, donc ils ne mentent sur rien. Un morceau de plan en cavalière, dans
# un épisode dont les deux plans se projettent sur une LAME (platitude 9°), aurait fait
# croire à une figure de l'espace et se serait lu « quelconque ». Les deux figures et
# leur promesse sont contrôlées à l'import de `espace3d` (`_controler_figures_planes`).
#
# Voix : manim/voix/terminale-ps-espace-orthogonalite-short.json, calée par
# ps_espace_orthogonalite_short_marques.json (200 marques).
# Découpage : manim/poste2/DECOUPAGE-shorts-ps-espace.md, section E8.
#
# Mesure (⛔ AVANT tout rendu) : python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E8
# Avant rendu : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/terminale/ps_espace_orthogonalite_short.py PsEspaceOrthogonaliteShort
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/ps_espace_orthogonalite_short.py PsEspaceOrthogonaliteShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/ps_espace_orthogonalite_short.py PsEspaceOrthogonaliteShort -o eleveai-maths-terminale-ps-espace-orthogonalite-short --media_dir manim/scripts/terminale/media-ps-espace-orthogonalite-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from espace_commun_short import *  # noqa: E402,F403
from espace3d import poteau_vue  # noqa: E402

# ── LES DONNÉES, et ce qu'elles promettent, REFAIT à l'import ───────────────
S = ShortEspace.CUBE_SOMMETS
BONNE = 2                                    # C — tirage des shorts : A C B C B A
U_CUBE, Y_CUBE = 0.95, 1.30

# ⭐ L'IDÉE DU SHORT EST UN FAIT GÉOMÉTRIQUE, ET ON LE REFAIT ICI. Le « nord » et l'« est »
# du sol sont deux vecteurs orthogonaux entre eux ; le nord est pourtant DANS le sol, donc
# il n'est pas orthogonal au plan. Un seul produit scalaire nul ne conclut rien.
import numpy as _np  # noqa: E402

_NORD, _EST, _VERTICALE = _np.array([0, 1, 0]), _np.array([1, 0, 0]), _np.array([0, 0, 1])
assert float(_NORD @ _EST) == 0.0                    # nord ⟂ est : le produit scalaire EST nul
assert float(_NORD @ _VERTICALE) == 0.0              # et le nord est bien dans le sol…
assert float(_np.cross(_NORD, _EST) @ _VERTICALE) != 0.0   # …dont la normale est la verticale
# ⛔ Donc « orthogonal à une direction du plan » n'entraîne PAS « orthogonal au plan » :
# c'est exactement le contre-exemple que la carte C donne, et il tient en trois lignes.

# ⭐ Le défi de l'écran 03 : [A B] et [C G] sont orthogonales et NE SE COUPENT PAS. La
# réponse n'est ni dite ni affichée, mais elle est VÉRIFIÉE ici — sans quoi l'écran
# pourrait poser une question dont la réponse serait l'inverse de ce qu'on croit.
_AB = _np.array(S["B"]) - _np.array(S["A"])
_CG = _np.array(S["G"]) - _np.array(S["C"])
assert float(_AB @ _CG) == 0.0, (_AB, _CG)           # orthogonales : c'est la donnée
# non coplanaires ⟹ aucun point commun : det(A⃗B, C⃗G, A⃗C) ≠ 0
_AC = _np.array(S["C"]) - _np.array(S["A"])
assert abs(float(_np.linalg.det(_np.array([_AB, _CG, _AC])))) > 0.5

# ⛔⛔ LES TROIS LIBELLÉS DE CARTE SONT TRONQUÉS, ET C'EST UNE COTE MESURÉE.
# Les trois libellés DITS font 45, 36 et 28 caractères. Le corps d'une carte de ce cadre
# plafonne à **2,41 d'unité** (largeur 3,95 moins 0,95, moins 0,20 d'écart, moins le rond
# de 0,37), c'est-à-dire ~14 caractères par ligne à 24 px. Écrits en entier, les trois
# tiennent en 4 + 3 + 2 lignes : **3,81 de cartes**, alors que la question et les cartes
# n'ont que 3,885 à elles deux. Il ne resterait pas une ligne de question.
# ⭐ Les trois sont donc coupés sur des fragments CONTIGUS de leur propre libellé, et
# l'ordre des longueurs est celui de la voix (45 > 36 > 28 devient 38 > 24 > 28… non :
# 38 > 28 > 24). ⚠️ Ce qui compte est mesuré ici : la bonne réponse C n'est PAS la plus
# longue — A l'est, et A est un leurre. Un devineur n'y gagne rien.
CHOIX = ("oui, il est orthogonal à une direction",      # A — 38 car., 3 lignes
         "on ne peut pas le savoir",                    # B — 24 car., 2 lignes
         "non, le nord est dans le sol")                # C — 28 car., 2 lignes
assert len(CHOIX[BONNE]) < len(CHOIX[0]), [len(c) for c in CHOIX]
assert len(set(CHOIX)) == 3                  # oui / on ne sait pas / non : trois positions


def carte_lignes(e, texte, fs=24, largeur=3.95):
    """Coupe un libellé de carte contre le plafond RÉEL du corps de `carte_choix`.

    ⛔⛔ `ShortEspace.lignes()` coupe à `LARG` (3,90), qui est la largeur d'un bloc de
    TEXTE, pas celle d'une carte. Une carte réserve 0,95 au rond, à la lettre et aux
    marges, puis 0,20 d'écart et le diamètre du rond : il ne reste que 2,41 à 24 px.
    Couper à 3,90 puis donner le résultat à `carte_choix` fait rétrécir la carte entière
    — c'est le défaut qui a mis une carte de E7 à **16,7 px**, et augmenter la police n'y
    change rien, c'est la largeur qui décide (épisode 5).
    ⭐ Et il LÈVE au lieu de rétrécir en silence : un mot plus large que le plafond est
    une cote à revoir, pas une réduction à subir."""
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
            raise ValueError(f"« {ligne} » ne tient pas dans {plafond:.2f} à {fs} px : "
                             f"un seul mot dépasse le plafond d'une carte")
    return VGroup(*[e.t(x, fs, larg=None) for x in lignes]).arrange(
        DOWN, aligned_edge=LEFT, buff=0.05)


def sol_avec_directions(e, fs=22):
    """Le sol à plat, et les deux directions DEDANS — la figure de la réponse.

    ⛔⛔ « nord » ET « est » SONT DES DIRECTIONS EN FRANÇAIS, PAS DES NOMS DE VECTEUR :
    pas de flèche de notation au-dessus. Le découpage le dit, et l'audit des flèches les
    signalerait comme nus — c'est un faux positif documenté. On les écrit donc en texte
    simple, et c'est la FLÈCHE DESSINÉE qui dit que ce sont des directions.
    ⭐ Les deux flèches suivent les DEUX côtés du parallélogramme : l'est le long de la
    largeur, le nord le long de la fuite. ⛔ Et leurs longueurs sont BORNÉES : à 0,62 du
    côté de fuite, la pointe du nord montait à y = +0,65 pour un sol qui s'arrête à
    +0,53 — la flèche SORTAIT du sol, sous une légende qui dit qu'elle est dedans. C'est
    mot pour mot « une flèche qui sort de son plan contredit la légende qui est juste
    dessous » (épisode 8). À 0,45 elle reste dans le parallélogramme, et c'est vérifié
    par l'assertion ci-dessous, pas par l'œil.

    ⭐⭐ LES DEUX MOTS SONT PLACÉS PAR UNE RECHERCHE EN GRILLE, UN À LA FOIS.
    Premier jet : `next_to` sur la pointe de chaque flèche — « nord » tombait à **0,008**
    d'un trait et « est » à 0,027, c'est-à-dire collés. Et la grille naïve (la place la
    plus LOIN de tout) a aussitôt rendu le défaut de l'épisode 12 : elle donnait la même
    case aux deux mots, à 0,071 l'un de l'autre. Le critère juste est celui du cube :
    parmi les places à plus de 0,14 de tout trait, **la plus PROCHE de sa propre
    flèche** — pour qu'on sache à qui le mot appartient — et à plus de 0,40 du mot déjà
    posé. Résultat mesuré : « nord » à 0,160 d'un trait (236 places libres), « est » à
    0,148 (395 places)."""
    g = plan_dessine(largeur=2.6, profondeur=1.40, cisaille=0.50)
    c0, c1, c3 = g.coins[0], g.coins[1], g.coins[3]
    o = g.poly.get_center()
    est = Arrow(o, o + (c1 - c0) * 0.33, buff=0, stroke_width=6, color=C_VECTEUR,
                max_tip_length_to_length_ratio=0.18)
    nord = Arrow(o, o + (c3 - c0) * 0.45, buff=0, stroke_width=6, color=C_VECTEUR2,
                 max_tip_length_to_length_ratio=0.22)
    # ⛔ La promesse de la figure, refaite ici : les deux pointes sont DANS le sol.
    assert nord.get_end()[1] < g.poly.get_top()[1], (nord.get_end(), g.poly.get_top())
    assert est.get_end()[0] < g.poly.get_right()[0]
    t_est = e.t("est", fs, C_VECTEUR, larg=None).move_to(o + P(+0.56, -0.31))
    t_nord = e.t("nord", fs, C_VECTEUR2, larg=None).move_to(o + P(+0.96, +0.41))
    e.sans_audit(g)                  # le sol ne porte aucun nombre
    return VGroup(g, est, nord, t_est, t_nord)


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    titre, badge = e.entete_blocs("Orthogonalité", fs=38)

    # ── 00 : ce qu'un produit scalaire nul prouve, et ce qu'il ne prouve pas ─
    # ⚠️ 26 px : à 28 px « Un produit scalaire nul » dépasse 3,90 et se coupe en
    # « Un produit scalaire » / « nul » — un mot de trois lettres seul sur sa ligne.
    # ⛔⛔ « PROUVE QUE » N'EST PAS UN ORNEMENT, C'EST CE QUI FAIT UNE PHRASE. Au gros
    # plan du 26/11, l'accroche affichait « Un produit scalaire nul » puis « deux
    # vecteurs sont orthogonaux » — deux fragments sans rien entre eux. La VOIX dit
    # « … nul prouve que deux vecteurs… » : l'oreille entend une phrase, l'œil lit une
    # suite de mots. ⛔ Et le remède évident — ajouter « : » — est impossible :
    # `jouer_phrase` cherche le texte de CHAQUE LIGNE AFFICHÉE dans le fragment de voix
    # (`texte.find(m.original_text, k)`), donc un caractère que la voix ne porte pas
    # casse le calage en silence. On rallonge l'écran jusqu'au mot qui manque.
    # ⭐ Mesuré : même découpe en deux lignes, « Un produit scalaire » / « nul prouve
    # que », 3,51 d'unité pour 3,90 — la cote de l'écran ne bouge pas.
    a1 = e.blocs_phrase("Un produit scalaire nul prouve que", 1.95, 26)
    a2 = e.blocs_phrase("deux vecteurs sont orthogonaux", 1.00, 28, VERT_OK)
    # ⛔⛔ `larg=3,60` ET NON LES 3,90 OFFERTS, ET C'EST UNE RÈGLE GÉNÉRALE QUE CE
    # SHORT A PAYÉE APRÈS E7 : un bloc ENCADRÉ qui remplit la largeur ne peut pas être
    # battu. Le cadre ajoute 2 × 0,14, et `insister(…, 1,05)` multiplie le tout : avec
    # une ligne à 3,90 on obtient (3,90 + 0,28) × 1,05 / 2 = **2,19**, pour une marge à
    # 2,115. Le dry run l'a signalé deux fois, et la mesure statique ne pouvait pas le
    # voir — elle mesure le bloc au repos.
    # ⭐ La borne se calcule : larg ≤ 2 × 2,115 / 1,05 − 0,28 = 3,75. On prend 3,60.
    a3 = e.blocs_phrase("Mais face à un plan, un seul ne suffit pas.", -1.10, 26,
                        C_PIEGE, larg=3.60)
    cadre3 = SurroundingRectangle(a3, color=C_PIEGE, buff=0.14, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("ce qu'il prouve", a1),
                        ("orthogonaux", a2), ("le piège", VGroup(a3, cadre3))]

    # ── 01 : le poteau de Marc, les deux vues ───────────────────────────────
    # ⚠️ 24 px et non 26 : à 26 px « Marc plante un poteau » dépasse les 3,90 offerts
    # et `lignes()` le coupe en DEUX — le bloc passe de 0,33 à 0,80 de haut et tombe
    # sur les deux vues. Une ligne qui se coupe toute seule coûte toujours une cote.
    ph0 = e.blocs_phrase("Marc plante un poteau", 2.15, 24)
    # ⚠️ 0,85 d'échelle et x = ±0,80 : chaque vue fait 1,50 de large, donc deux vues
    # pleines feraient 3,00 collées. À 0,85 elles font 1,275 et il reste 0,32 entre
    # elles — assez pour qu'on les lise comme DEUX figures et non comme une seule.
    v1 = poteau_vue(penche=False, s=0.85).move_to(P(-0.80, 1.05))
    v2 = poteau_vue(penche=True, s=0.85).move_to(P(+0.80, 1.05))
    # ⚠️ 22 px pour les deux légendes : à 24 px elles font 1,60 de large et se touchent
    # au milieu de l'écran (chacune est centrée à 0,80 de l'axe).
    # ⛔⛔ « de face » ET « de côté », PAS « vu de face » ET « vu de côté ». Vu à la
    # PLANCHE, et par rien d'autre : à 22 px les deux légendes font 1,47 de large, elles
    # sont centrées à 0,80 de l'axe, et leurs bords intérieurs se rejoignaient — l'écran
    # affichait « vu de facevu de côté », lu comme un seul mot.
    # ⭐⭐ ET C'EST UN TROU D'INSTRUMENT, pas une étourderie : les deux légendes étaient
    # dans DEUX blocs différents. La comparaison deux à deux de `mesure-shorts` ne
    # compare que des blocs qui se recouvrent HORIZONTALEMENT — côte à côte, deux blocs
    # ne sont jamais comparés — et `etiquettes()` ne compare des mots entre eux qu'à
    # l'INTÉRIEUR d'un bloc, et seulement si ce bloc trace quelque chose.
    # ⛔⛔ ET LE REMÈDE ÉVIDENT NE MARCHE PAS — mesuré, pas supposé. Mettre les deux
    # légendes dans UN seul bloc « figure » pour que `etiquettes()` les compare entre
    # elles ne change RIEN : son critère de voisinage est la distance des CENTRES
    # (< 0,30), et deux mots de 1,47 de large centrés à 1,60 l'un de l'autre sont à
    # 0,13 de GAP pour 1,60 de centres. L'instrument se tait, et il a raison au sens
    # où il mesure — il ne mesure simplement pas la bonne chose.
    # ⭐ Étalonné : le défaut remis en place (22 px, ±0,80), `mesure-shorts-ps-espace.py`
    # reste muet. Le seul contrôle qui le voit est donc écrit ICI, et il mesure le VIDE
    # entre les deux mots, pas leurs centres. 0,30 est à peu près deux espaces à 24 px.
    l1 = e.t("de face", 24, VERT_OK, larg=None).move_to(P(-0.85, 0.08))
    l2 = e.t("de côté", 24, C_PIEGE, larg=None).move_to(P(+0.85, 0.08))
    _vide = float(l2.get_left()[0] - l1.get_right()[0])
    assert _vide > 0.30, (
        f"« {l1.original_text} » et « {l2.original_text} » ne sont séparées que de "
        f"{_vide:.3f} : à l'écran elles se lisent comme un seul mot")
    ph1 = e.blocs_phrase("il faut deux directions", -1.00, 26, C_REGARD)
    ph2 = e.blocs_phrase("et deux vecteurs non colinéaires", -2.00, 24, C_REGARD)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("Marc", ph0),
                    ("figure", VGroup(v1, l1, v2, l2)),
                    ("deux directions", ph1), ("non colinéaires", ph2)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⚠️ LA QUESTION EST À 22 px ET LES CARTES À 24, ET C'EST L'INVERSE DE L'HABITUDE.
    # Mesuré : les trois cartes prennent 3,12 de haut (3 + 2 + 2 lignes), et la question
    # plus les cartes n'ont que 3,885 entre le bas de la tête et la cote où « Mets
    # pause » passerait sur Ti-Margo. Il reste 0,765 : deux lignes à 22 px (0,70) y
    # tiennent, deux lignes à 24 (0,76) ne laissent rien.
    fsq, fsc = 22, 24
    q_lignes, _ = e.lignes("Le nord est-il orthogonal au sol ?", fsq)
    choix = [carte_lignes(e, c, fsc) for c in CHOIX]
    # ⛔ PAS de `y_tete` relevé : à 2,26 le compte à rebours mord de 0,02 sur
    # l'échelle des ceintures. Les 0,08 qu'il rendait ne valaient pas ça.
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, choix, fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]
    # ⛔⛔ LE SOL N'EST PAS À L'ÉCRAN PENDANT LA PAUSE, et c'est le découpage qui le dit :
    # le poser avec ses deux flèches MONTRE la réponse (le nord couché dans le sol), et
    # le poser sans ses flèches ne montre rien du tout. Il arrive en 02b.
    sol = sol_avec_directions(e)
    # ⚠️ 0,14 d'écart et pas 0,33 : le sol fait 1,40 de haut, les cartes montent à
    # +0,86 et l'échelle des ceintures descend à +2,48. Il reste 1,62 pour une figure
    # de 1,40 — l'écart est ce qui reste, il ne se choisit pas.
    sol.move_to(P(0, float(cartes.get_top()[1]) + 0.14 + sol.height / 2))
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("figure sol", sol),
                        ("cartes", cartes)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    # ⛔⛔ « [A B] » ET « [C G] », AVEC LEURS CROCHETS. Ce sont des ARÊTES, donc des
    # SEGMENTS : « A B » nu, à l'écran d'une terminale, se lit comme un vecteur. La
    # notation tranche, et elle tranche aussi pour l'audit des flèches, qui exempte
    # « [A G] » et « (A B) » sans table (convention de la passe des flèches, épisode 8).
    r3, _cube3, _v3, cube3g = e.cube_place(U_CUBE, Y_CUBE, ecarte=e.ECARTE_CUBE,
                                           noms=("A", "B", "C", "G"))
    ab = e.arete(r3, "A", "B", couleur=C_REGARD, sw=6)
    cg = e.arete(r3, "C", "G", couleur=C_VECTEUR2, sw=6)
    dq = e.pose(VGroup(*e.lignes("[A B] et [C G] sont orthogonales.", 24, color=C_REGARD)[0],
                       *e.lignes("Se coupent-elles ?", 26, color=WHITE)[0]
                       ).arrange(DOWN, buff=0.14), -0.75)
    appel = e.appel_blocs(-2.25)
    p["03-commentaire"] = [("à toi", et), ("cube", cube3g), ("+ [A B]", ab),
                           ("+ [C G]", cg), ("question", dq), ("appel", appel)]
    return p


class PsEspaceOrthogonaliteShort(ShortEspace):
    fichier_marques = "ps_espace_orthogonalite_short_marques.json"
    nom_voix = "terminale-ps-espace-orthogonalite-short"

    def construct(self):
        p = self.par_nom(pieces(self))
        titre, badge = p["00-accroche"]["titre"], p["00-accroche"]["badge"]

        # ── 00 : l'accroche ─────────────────────────────────────────────────
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        a = p["00-accroche"]
        self.jouer_phrase(a["ce qu'il prouve"], "Un produit scalaire nul prouve que")
        self.jouer_phrase(a["orthogonaux"], "deux vecteurs sont orthogonaux")
        self.au_mot("Mais face à un plan")
        self.play(FadeIn(a["le piège"][0], shift=UP * 0.08),
                  Create(a["le piège"][1]), run_time=0.45)
        self.insister(a["le piège"], 1.05)
        self.attendre_voix(marge=0.25)

        # ── 01 : le poteau, de face puis de côté ────────────────────────────
        self.dire("01-idee")
        i = p["01-idee"]
        self.play(FadeOut(VGroup(a["ce qu'il prouve"], a["orthogonaux"], a["le piège"])),
                  run_time=0.25)
        self.jouer_phrase(i["Marc"], "Marc plante un poteau")
        # ⭐ LES DEUX VUES ARRIVENT CHACUNE À SON MOT, et c'est toute la leçon : « droit
        # vu de face » puis « penché vu de côté ». Posées ensemble, la comparaison ne se
        # fait plus — l'élève voit une image, pas un avant/après.
        v1, l1, v2, l2 = i["figure"]
        self.au_mot("c'est droit")
        self.play(FadeIn(VGroup(v1, l1), shift=UP * 0.1), run_time=0.45)
        self.au_mot("penché vu de côté")
        self.play(FadeIn(VGroup(v2, l2), shift=UP * 0.1), run_time=0.45)
        self.jouer_phrase(i["deux directions"], "il faut deux directions")
        self.jouer_phrase(i["non colinéaires"], "et deux vecteurs non colinéaires")
        self.attendre_voix(marge=0.3)

        # ── 02 : la question-pause ──────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        qq = p["02-question"]
        self.play(FadeOut(VGroup(i["Marc"], i["figure"],
                                 i["deux directions"], i["non colinéaires"])),
                  run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(qq["tête"], shift=DOWN * 0.12), run_time=0.3)
        self.au_mot("Le nord est-il pour autant orthogonal au sol")
        self.play(FadeIn(qq["question"], shift=UP * 0.08), run_time=0.35)
        self.q_montrer_choix(qq["cartes"])
        self.q_pause(qq["pause"], qq["rebours"], "02-question", t0, BONNE)

        # ── 02b : la réponse ────────────────────────────────────────────────
        self.dire("02b-reponse")
        r = p["02b-reponse"]
        cartes = qq["cartes"]
        ok = self.q_reponse(cartes, BONNE, qq["pause"], qq["rebours"])
        self.play(FadeOut(VGroup(qq["tête"], qq["question"])), run_time=0.25)
        sol = r["figure sol"]
        self.au_mot("Le nord est au sol")
        self.play(FadeIn(sol[0]), run_time=0.35)
        self.au_mot("orthogonal à l'est")
        self.play(GrowArrow(sol[1]), FadeIn(sol[3]), run_time=0.3)
        self.play(GrowArrow(sol[2]), FadeIn(sol[4]), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire ─────────────────────────────────
        self.dire("03-commentaire")
        c = p["03-commentaire"]
        self.play(FadeOut(VGroup(cartes, sol, ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(c["à toi"], shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Dans le cube")
        self.play(FadeIn(c["cube"]), run_time=0.45)
        self.au_mot("sont orthogonales")
        self.play(Create(c["+ [A B]"]), Create(c["+ [C G]"]),
                  FadeIn(c["question"][:len(c["question"]) - 1]), run_time=0.45)
        self.au_mot("Se coupent-elles")
        self.play(FadeIn(c["question"][-1], scale=1.1), run_time=0.35)
        self.jouer_appel(c["appel"])
        self.attendre_voix(marge=0.5)

        # ── 04 : la fin ─────────────────────────────────────────────────────
        self.fin_short("04-abonne", [c["à toi"], c["cube"], c["+ [A B]"], c["+ [C G]"],
                                     c["question"], c["appel"]])
