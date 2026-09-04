# Les morceaux communs aux vidéos de lettres du CP.
#
# ⭐⭐ POURQUOI CE FICHIER EXISTE, ET PAS PLUS TÔT.
# `lettre_a.py` puis `lettre_i.py` ont été écrits séparément à dessein :
# généraliser sur un seul exemple, c'est inventer une règle qu'on n'a pas
# vérifiée. Le 03/09, Frédéric a fait changer DEUX FOIS le même écran de fin —
# et il a fallu éditer les deux fichiers à l'identique chaque fois. À vingt-six
# lettres, c'est intenable. Ce qui bouge quand on retouche le montage vit donc
# ici ; ce qui est propre à une lettre (son chemin, ses cinq mots, ses cinq
# dessins, sa chorégraphie) reste dans son fichier.
#
# ⚠️ DETTE ASSUMÉE : `lettre_a.py` et `lettre_i.py` gardent encore leurs propres
# copies. Elles viennent d'être rendues et attendent la mise en ligne ; les
# migrer maintenant obligerait à refaire huit rendus pour prouver que rien n'a
# bougé. À faire dès que les Shorts sont publiés.

import sys
from pathlib import Path

import numpy as np
from manim import *

# ⚠️ Ce module est importé par les scripts de lettres, qui vivent dans
# `manim/scripts/cp/`. Il lui faut sa propre entrée vers `manim/` : sans elle,
# `BLEU_CALCUL` et les autres couleurs de la charte ne sont pas définies ici,
# même si le script appelant les a importées chez lui.
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from charte import *  # noqa: F403,E402

INTERLIGNE = 1.0
LARGEUR_REGLURE = 9.0


def reglure(nb_interlignes: int = 3) -> VGroup:
    """La bande d'écriture : ligne de base forte, trois fines au-dessus.

    ⭐ TROIS INTERLIGNES, JAMAIS DEUX (arbitrage de Frédéric) : le modèle, le
    pointillé à repasser, et une ligne VIDE où l'enfant écrit seul.
    """
    g = VGroup()
    for k in range(nb_interlignes + 1):
        y = k * INTERLIGNE
        forte = k == 0
        g.add(
            Line(
                np.array([-LARGEUR_REGLURE / 2, y, 0]),
                np.array([LARGEUR_REGLURE / 2, y, 0]),
                stroke_width=3 if forte else 1.5,
                stroke_color=GREY_B if forte else GREY_D,
            )
        )
    return g


# ─── Le stylo ─────────────────────────────────────────────────────────────────
# ⛔⛔ NE JAMAIS L'ORIENTER SUR LE CHEMIN. Première version (02/09) : il suivait
# la NORMALE au segment, (−ty, tx). Le calcul est juste, le résultat est faux —
# sur un rond la tangente fait un tour complet, donc le stylo tourne avec elle
# et finit **couché vers la gauche**, la prise d'un GAUCHER, projetée à toute la
# classe sur la seule vidéo dont l'objet est la tenue du stylo.
# ⭐ Une main ne change pas de prise en cours de lettre : l'angle est CONSTANT.
LONGUEUR_STYLO = 1.15
EPS = 1e-3
ANGLE_STYLO = 30 * DEGREES


def angle_main(gaucher: bool) -> float:
    """L'unique chose qui sépare la vidéo du gaucher de celle du droitier."""
    return PI - ANGLE_STYLO if gaucher else ANGLE_STYLO


def stylo_neuf() -> VGroup:
    """Un stylo stylisé, pointe en (0,0), corps vers le haut."""
    corps = Polygon(
        np.array([0.0, 0.0, 0]),
        np.array([-0.10, 0.26, 0]),
        np.array([-0.10, LONGUEUR_STYLO, 0]),
        np.array([0.10, LONGUEUR_STYLO, 0]),
        np.array([0.10, 0.26, 0]),
        stroke_color=WHITE,
        stroke_width=4,
    )
    corps.set_fill(BLEU_CALCUL, opacity=1)
    pointe = Polygon(
        np.array([0.0, 0.0, 0]),
        np.array([-0.10, 0.26, 0]),
        np.array([0.10, 0.26, 0]),
        stroke_color=WHITE,
        stroke_width=4,
    )
    pointe.set_fill(JAUNE_TITRE, opacity=1)
    return VGroup(corps, pointe)


def poser_stylo(
    stylo: VGroup, modele: VGroup, chemin: VMobject, s: float, angle: float
) -> None:
    """Pose la POINTE sur le chemin à l'abscisse `s`. L'inclinaison ne bouge pas.

    ⚠️ On borne `s` : `point_from_proportion` refuse 0 et 1 exactement sur
    certains chemins composés.
    """
    s = min(max(s, EPS), 1 - EPS)
    p = chemin.point_from_proportion(s)
    stylo.become(modele.copy().rotate(angle - PI / 2, about_point=ORIGIN).shift(p))


def chemin_bezier(
    depart, courbes, stroke_width: float = 10, color: str = WHITE
) -> VMobject:
    """Un chemin d'UN SEUL TRAIT, dans le sens de l'écriture.

    ⛔ PAS UNE POLICE. Une cursive de police est un CONTOUR fermé : `Write()` et
    `Create()` animeraient le tour de la lettre, pas son chemin. Sur une vidéo
    dont l'objet EST le geste, ce serait montrer l'inverse de ce qu'on enseigne.
    """
    p = VMobject(stroke_width=stroke_width, stroke_color=color)
    p.set_fill(opacity=0)
    p.start_new_path(np.array([*depart, 0]) if len(depart) == 2 else depart)
    for c1, c2, fin in courbes:
        p.add_cubic_bezier_curve_to(
            np.array([*c1, 0]), np.array([*c2, 0]), np.array([*fin, 0])
        )
    return p


# ─── ⛔ LE VÉRIFICATEUR DE LARGEUR ────────────────────────────────────────────
# ⭐⭐ POURQUOI IL LÈVE UNE ERREUR AU LIEU DE RATTRAPER.
# Les scripts se protégeaient par un `min(1, largeur_utile / largeur)` posé sur
# le bloc entier. Ce filet a laissé passer DEUX défauts en un jour :
#   — « Essaie notre coach CP français » (5,70 pour 3,90 utiles) : il l'a
#     « sauvé » en écrasant tout le bloc, Ti-Margo réduit à un timbre. Le rendu
#     paraissait correct et il était mauvais.
#   — « On essaie un autre mot ? » (9,57 !) n'était même pas dans un bloc
#     protégé : il est parti sur YouTube coupé des deux côtés, sur le Short qui
#     a fait 98 vues quand le paysage en faisait 1.
# 👉 Un garde-fou silencieux transforme un bug visible en bug invisible. Celui-ci
# ARRÊTE le rendu et nomme le texte fautif : mieux vaut une erreur bruyante
# qu'un Short coupé devant cent personnes.
class TexteTropLarge(Exception):
    pass


def verifier(mobjet, nom: str, marge: float = 0.6):
    """Refuse de continuer si `mobjet` ne tient pas dans la largeur du cadre."""
    utile = config.frame_width - marge
    if mobjet.width > utile:
        raise TexteTropLarge(
            f"« {nom} » mesure {mobjet.width:.2f} de large pour {utile:.2f} "
            f"utiles dans un cadre de {config.frame_width:.1f}. "
            "⛔ NE PAS le mettre à l'échelle : le couper en deux lignes, ou "
            "réduire sa police pour CE cadre. Voir le commentaire de `verifier`."
        )
    return mobjet


# ─── La page de garde (0 → 1 seconde) ─────────────────────────────────────────
def page_de_garde(scene, lettre: str, chemin_cursif: VMobject, mascotte):
    """Le carton d'ouverture, posé par `add` — jamais par `play`.

    ⛔ LA VIDÉO S'OUVRAIT SUR 3,2 s D'ÉCRAN NOIR : la première phrase se jouait
    sur du vide, et le titre mettait encore une seconde à monter en fondu.
    Frédéric, 03/09 : « rien n'apparait avant 4 ou 5 secondes », puis « ça doit
    commencer au bout d'1 seconde et la page de garde de 0 à 1 seconde ». Sur un
    Reel, c'est là que le spectateur décide — et il décidait sur du noir.
    ⭐ Un fondu d'entrée ne peut pas s'appliquer à la PREMIÈRE image : il ne fait
    que la retarder. D'où `add`.
    """
    v = scene.vertical
    classe = Text("Français CP", font_size=34 if not v else 26, color=BLEU_CALCUL)
    notion = Text(
        "Écriture cursive", font_size=54 if not v else 40, color=JAUNE_TITRE
    )
    # ⭐ LA CURSIVE À GAUCHE ET PLUS GRANDE : c'est le sujet de la vidéo, et on
    # lit de gauche à droite. L'imprimée était devant, sur une vidéo qui
    # s'appelle « Écriture cursive ».
    # ⭐ MAIS L'IMPRIMÉE RESTE : elle revient dans les cinq mots, où l'initiale
    # est en jaune. Jamais montrée, l'enfant la rencontrerait pour la première
    # fois au milieu d'un mot — et la correspondance entre les deux écritures
    # d'une lettre est une compétence du CP, pas un décor.
    imprime = Text(lettre, font_size=96 if not v else 76, color=JAUNE_TITRE)
    cursive = chemin_cursif
    cursive.height = imprime.height * 1.4
    duo = VGroup(cursive, imprime).arrange(RIGHT, buff=0.8)
    coeur = VGroup(classe, notion, duo).arrange(DOWN, buff=0.38)
    # ⚠️ `Group` et non `VGroup` : Ti-Margo est un ImageMobject.
    margo = mascotte.scale(0.7 if not v else 0.62)
    garde = Group(coeur, margo).arrange(DOWN if v else RIGHT, buff=0.5 if v else 1.0)
    garde.scale(
        min(
            1.0,
            (config.frame_width - 0.8) / garde.width,
            (config.frame_height - 1.8) / garde.height,
        )
    ).move_to(ORIGIN)

    # ⭐⭐ LA MAIN S'ANNONCE EN HAUT (Frédéric, 03/09 : « rajoute en haut Pour
    # Droitier ou pour Gaucher »). C'est la SEULE chose qui distingue les deux
    # vidéos : même titre, même durée, même vignette. Sans elle, un parent
    # regarde la mauvaise, et un gaucher apprend la prise de l'autre main.
    main = Text(
        "Pour gaucher" if scene.gaucher else "Pour droitier",
        font_size=32 if not v else 26,
    ).to_edge(UP, buff=0.45)
    verifier(main, "mention de la main")
    # ⛔⛔ ELLE DOIT TENIR AU-DELÀ DE LA SECONDE, PAS JUSQU'À LA SECONDE.
    # Frédéric, 04/09 : « YouTube sélectionne l'image, celle qui est à
    # 1 seconde ». La première version s'arrêtait PILE à 1,00 s (0,75 + 0,25 de
    # fondu) : l'image prélevée tombait donc au milieu du fondu, ou déjà sur
    # l'écran d'accueil. La vignette du Short montrait le mauvais écran — et
    # sur un Short, cette image est tout ce qui décide.
    # ⭐ 1,30 s d'affichage plein, puis le fondu : à 1,000 s on est franchement
    # sur la garde, avec de la marge des deux côtés.
    # ⚠️ Ne pas rallonger davantage « pour être sûr » : c'est aussi le temps
    # avant que la leçon commence, et le pouce décide vite.
    scene.add(garde, main)
    scene.wait(1.30)
    return garde, main


# ─── La relance ───────────────────────────────────────────────────────────────
def ecran_relance(vertical: bool, lettre: str, dans_le_mot: bool = False) -> VGroup:
    """« Trouve un mot qui commence par <x> » — et la LETTRE en gros dessous.

    ⛔ « On essaie un autre mot ? » EST ABANDONNÉ (Frédéric, 03/09 : « enlève on
    essaie un autre mot, mets trouve un mot commençant par i »). Une question
    fermée à laquelle l'enfant répond oui ou non ne fait rien faire ; une
    consigne, si. Et elle nomme la lettre, que l'ancienne formule taisait.

    ⭐ LA LETTRE EST LA CHUTE : grande, jaune, seule sur sa ligne. C'est elle
    qu'il doit garder en tête pour chercher, et le jaune la relie au repère
    resté dans le coin depuis le début de la vidéo.

    ⛔ TOUT DÉBORDE EN PORTRAIT, MESURÉ : la phrase entière fait 11,08 à 44 pour
    3,90 utiles ; « Trouve un mot » déborde encore à 40 (4,16) ; « qui commence
    par » déborde à 30 (3,93). D'où trois lignes, et des tailles qui ne se
    devinent pas — 36 et 28.
    """
    # ⭐⭐ DEUX FORMULES, PARCE QUE DEUX LEÇONS.
    # « a », « i », « o » se trouvent en tête de mot : on dit « qui commence
    # par ». « u » et « e » ne s'y trouvent presque jamais en français — leur
    # leçon est d'ENTENDRE le son où qu'il soit, et la consigne doit le dire.
    # Arbitrage de Frédéric, 04/09 : le son DANS le mot (lune, mur, tortue).
    # ⚠️ C'est aussi la formule qu'il faudra pour les vingt consonnes.
    jaune = Text(lettre, font_size=120 if not vertical else 90, color=JAUNE_TITRE)
    l2 = "où on entend le" if dans_le_mot else "qui commence par"
    if vertical:
        haut = VGroup(
            Text("Trouve un mot", font_size=36, color=VERT_OK),
            Text(l2, font_size=28, color=VERT_OK),
        ).arrange(DOWN, buff=0.18)
    else:
        haut = Text(f"Trouve un mot {l2}", font_size=48, color=VERT_OK)
    bloc = VGroup(haut, jaune).arrange(DOWN, buff=0.35)
    for m in (haut, jaune):
        verifier(m, f"relance ({lettre})")
    return bloc


# ─── La page de fin ───────────────────────────────────────────────────────────
# ⭐ CINQ PORTES DEPUIS LE 03/09. « Fiches d'écriture » a été ajoutée le jour où
# elles ont existé : c'est la ressource la plus proche de la vidéo — l'enfant
# vient de voir le geste, la feuille lui met le crayon dans la main. La mettre
# en dernier serait la cacher ; elle ferme la liste juste avant « À bientôt ! »,
# à l'endroit dont on se souvient.
# ⚠️ « Fiches activités » = le cours + ses exercices. « Fiches d'écriture » = la
# feuille à repasser. Deux choses différentes, deux lignes.
# ⭐ LE FRANÇAIS D'ABORD, ET C'EST L'ORDRE DE FRÉDÉRIC (04/09) : « coach
# francais, coach maths, dictée, fiche d'activité, fiches d'écritures ».
# ⚠️ La première version ouvrait sur « Coach Maths » — sur une vidéo qui apprend
# à tracer une lettre, c'est la porte la plus éloignée de ce qu'on vient de
# faire. L'enfant qui vient d'écrire un « a » continue en français.
# ⛔ PAS DE « Coach Maths » ICI. Frédéric, 04/09 : « on peut enlever coach maths
# car ça concerne français, non ? ». Oui — et rien n'est perdu : `eleveai.fr`
# est écrit juste au-dessus, les maths sont à un clic. Une porte hors sujet sur
# l'écran de sortie d'une leçon d'écriture disperse au lieu de conduire.
PORTES = [
    "Coach Français",
    "Dictée",
    "Fiches activités",
    "Fiches d'écriture",
]


def page_de_fin(scene, mascotte, clip_url: str, clip_tout: str, clip_bientot: str):
    """L'écran de sortie : une PORTE, pas une signature.

    ⛔ Il signait « EleveAI — Ti Margo » : un nom, et rien à faire ensuite.
    Frédéric, 03/09 : « Ti margo / eleveai.fr / Coach Maths / Coach Français /
    Dictée / A bientôt / fiches activités / avec effet ».
    ⛔ PAS DE VERBE : « enlève essayer, mets simplement Coach français ». L'écran
    dit ce qui EXISTE ; une seule proposition cachait les quatre autres.
    ⭐ Ti-Margo en haut, puis chaque ligne arrive à son tour avec ZOOM IN /
    ZOOM OUT — le rythme des cinq mots. Sans lui, quatre lignes s'empilent et
    l'œil ne sait plus laquelle vient d'arriver.
    """
    v = scene.vertical
    url = Text("eleveai.fr", font_size=62 if not v else 50, color=JAUNE_TITRE)
    portes = VGroup(
        *[
            Text(p, font_size=40 if not v else 30, color=BLEU_CALCUL)
            for p in PORTES
        ]
    ).arrange(DOWN, buff=0.30)
    bientot = Text("À bientôt !", font_size=52 if not v else 42, color=VERT_OK)
    for m, nom in [(url, "eleveai.fr"), (bientot, "À bientôt !")] + [
        (p, PORTES[i]) for i, p in enumerate(portes)
    ]:
        verifier(m, nom)

    bloc = VGroup(url, portes, bientot).arrange(DOWN, buff=0.45)
    margo = mascotte.scale(0.75 if not v else 0.85)
    page = Group(margo, bloc).arrange(DOWN, buff=0.40)
    page.scale(
        min(
            1.0,
            (config.frame_width - 0.8) / page.width,
            (config.frame_height - 0.8) / page.height,
        )
    ).move_to(ORIGIN)

    d1 = scene.dire(clip_url)
    scene.play(FadeIn(margo, shift=UP * 0.3), GrowFromCenter(url))
    scene.wait(max(0.3, d1 - 1.2))

    d2 = scene.dire(clip_tout)
    pas = max(1.05, (d2 - 0.6) / len(PORTES))
    for p in portes:
        # ⚠️ Le zoom porte sur la LIGNE, pas sur le bloc : le bloc grossirait
        # d'un coup et ferait sauter tout l'écran.
        scene.play(FadeIn(p, shift=RIGHT * 0.35), run_time=0.30)
        scene.play(p.animate.scale(1.22), run_time=0.30)
        scene.wait(0.20)
        scene.play(p.animate.scale(1 / 1.22), run_time=0.25)
        scene.wait(max(0.05, pas - 1.05))

    d3 = scene.dire(clip_bientot)
    scene.play(GrowFromCenter(bientot), run_time=0.35)
    scene.play(bientot.animate.scale(1.18), run_time=0.35)
    scene.play(bientot.animate.scale(1 / 1.18), run_time=0.30)
    scene.wait(max(1.0, d3 - 1.0))


class Portrait:
    """9:16 — Shorts, Reels, TikTok. **Le format qui est vu** : 98 vues contre 1
    pour le paysage (relevé le 03/09).

    ⚠️ LE CADRE LOGIQUE S'IMPOSE DANS `__init__`, avant `super()`. Passer
    seulement `-r 1080,1920` ne change que les pixels : le cadre reste large, et
    tout le texte déborde. (Règle de manim/REGLES.md, § 974.)
    ⛔ Il est GLOBAL : rendre un portrait puis un paysage dans le même processus
    laisse le cadre étroit au second, sans qu'aucune erreur ne le signale. UNE
    COMMANDE PAR SCÈNE.
    """

    vertical = True

    def __init__(self, *args, **kwargs):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(*args, **kwargs)
