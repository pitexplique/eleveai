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
import wave
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


# ⛔⛔ LE SECOND GARDE-FOU : L'ÉCRAN QU'ON CROYAIT AVOIR EFFACÉ.
# Frédéric, 05/09, capture à l'appui : « enlève le 4, tu as oublié de
# l'effacer » — le chiffre blanc du tracé traînait derrière la liste des
# quantités, en plein sur « quatre bougies ».
# ⭐⭐ CE DÉFAUT NE SE VOIT PAS EN REGARDANT LA LEÇON. Le tracé oublié est
# recouvert au pixel près par la reprise rapide qui le redessine : les deux sont
# superposés, l'image est juste. Il n'apparait qu'un écran PLUS LOIN, au moment
# où l'on efface ce qui le cachait — quand plus personne ne regarde le chiffre.
# 👉 D'où la règle : **on ne vérifie pas qu'un écran est propre en le
# regardant, on compte ce qui reste.** C'est le pendant de `verifier()`, qui
# mesure une largeur au lieu de la juger à l'œil.
class EcranNonNettoye(Exception):
    pass


def _se_voit(m) -> bool:
    """Un mobjet laisse-t-il une trace à l'image ?

    ⚠️ ON MESURE CE QUI SE VOIT, PAS CE QUI EXISTE. La scène garde en permanence
    des objets parfaitement légitimes et parfaitement invisibles : les
    `ValueTracker` des animations, et les rescapés d'un `FadeOut` — car
    `Scene.remove(groupe)` ne retire PAS les sous-objets ajoutés un par un
    (`Create(groupe[0])` ajoute le trait, pas le groupe), il se contente de les
    passer à opacité zéro. Les compter tous ferait un garde-fou qui crie à
    chaque écran, donc un garde-fou qu'on désactive.
    """
    if not hasattr(m, "get_family"):
        return False
    for f in m.get_family():
        if not f.get_num_points():
            continue
        # ⚠️ `ValueTracker` a des points mais n'est pas un VMobject : il lève
        # AttributeError sur `stroke_opacity`. On l'écarte par la question qu'on
        # lui pose, pas par son type — un futur mobjet sans opacité serait
        # traité pareil, sans qu'il faille y penser.
        for lire in (
            getattr(f, "get_stroke_opacity", None),
            getattr(f, "get_fill_opacity", None),
        ):
            try:
                if lire is not None and float(lire() or 0) > 0.01:
                    return True
            except AttributeError:
                continue
    return False


def verifier_ecran_vide(scene, etape: str, garder=()):
    """⛔ Arrête le rendu si un objet VISIBLE survit à un changement d'écran.

    `garder` liste ce qui doit rester — typiquement la lettre ou le chiffre
    rappelé dans un coin pendant toute la vidéo.
    """
    epargnes = {id(g) for m in garder for g in m.get_family()}
    restants = [
        m for m in scene.mobjects if id(m) not in epargnes and _se_voit(m)
    ]
    if restants:
        details = ", ".join(
            f"{type(m).__name__}(largeur {m.width:.2f})" for m in restants[:6]
        )
        raise EcranNonNettoye(
            f"{len(restants)} objet(s) VISIBLE(s) après « {etape} » : {details}. "
            f"Deux causes connues : un tracé créé DANS une boucle, dont la "
            f"variable ne garde que le dernier ; ou un `FadeOut(groupe)` alors "
            f"que les membres ont été ajoutés séparément — écrire `FadeOut(*g)`."
        )


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
def page_de_garde(
    scene,
    lettre: str,
    chemin_cursif: VMobject,
    mascotte,
    hauteur_cursive: float = 1.4,
    notion: str = "Écriture cursive",
    classe: str = "Français CP",
    mains: tuple[str, str] = ("Pour droitier", "Pour gaucher"),
    serie: str = "La belle écriture",
):
    """Le carton d'ouverture, posé par `add` — jamais par `play`.

    ⛔ LA VIDÉO S'OUVRAIT SUR 3,2 s D'ÉCRAN NOIR : la première phrase se jouait
    sur du vide, et le titre mettait encore une seconde à monter en fondu.
    Frédéric, 03/09 : « rien n'apparait avant 4 ou 5 secondes », puis « ça doit
    commencer au bout d'1 seconde et la page de garde de 0 à 1 seconde ». Sur un
    Reel, c'est là que le spectateur décide — et il décidait sur du noir.
    ⭐ Un fondu d'entrée ne peut pas s'appliquer à la PREMIÈRE image : il ne fait
    que la retarder. D'où `add`.
    """
    # ⭐⭐ LA GARDE EST EN COULEUR DEPUIS LE 05/09, ET C'EST UNE MESURE QUI L'A
    # DÉCIDÉ. Sources de trafic sur 28 jours : le flux Shorts apporte 805 vues
    # pour 6,7 SECONDES en moyenne, quand la recherche en apporte 173 pour
    # 33 secondes. Sur 65 s de vidéo, c'est 10 % de rétention contre 50 % : dans
    # le fil, le pouce part avant la leçon.
    # 👉 Le seul écran qu'il voit à ce moment-là est CELLE-CI, et elle était
    # NOIRE — au milieu d'un fil saturé de couleur. C'est aussi elle que YouTube
    # prend en vignette. Un changement, deux effets.
    # ⚠️ LE FOND NOIR RESTE POUR LE TRACÉ : là, il faut du contraste et rien qui
    # distraie. La couleur est pour la garde, pas pour la leçon.
    CIEL = "#5BC8F5"
    SOLEIL = "#FFC93C"
    NUIT = "#0B2545"

    v = scene.vertical
    fond = Rectangle(
        width=config.frame_width + 1, height=config.frame_height + 1,
        stroke_width=0,
    ).set_fill(CIEL, opacity=1)
    soleil = Circle(radius=1.5 if not v else 1.2, stroke_width=0)
    soleil.set_fill(SOLEIL, opacity=1)
    soleil.move_to(
        np.array([config.frame_width / 2 - 0.3, config.frame_height / 2 - 0.3, 0])
    )
    ciel = VGroup(fond, soleil)

    # ⚠️ `classe` et `mains` sont des PARAMÈTRES depuis le 05/09 : le tracé d'une
    # lettre ne dépend pas de la langue, mais tout le texte autour, si. C'est ce
    # qui permet de refaire la série en anglais sans dupliquer une ligne de
    # géométrie.
    # ⭐⭐ « LA BELLE ÉCRITURE » — LE NOM DE LA SÉRIE, EN HAUT DE LA GARDE
    # (Frédéric, 05/09 : « j'aimerais bien rajouter La belle écriture », « on
    # pourrait mettre en page de garde La belle écriture non ? »).
    # ⭐ ET C'EST CE QUI RÉSOUT LE PROBLÈME DE MATIÈRE. La garde des chiffres
    # annonçait « Français CP », ce qui semblait faux — j'allais le corriger en
    # « Maths CP ». Frédéric a tranché autrement, et mieux : « ça peut être
    # français en fait, pas maths — c'est de l'écriture ». **Tracer un chiffre
    # est un geste graphique, pas un calcul.** Le point de départ, le sens, le
    # nombre de traits, le lever de crayon : rien là-dedans n'est de l'arithmé-
    # tique. Ranger les chiffres en maths aurait coupé la série en deux là où
    # elle est une.
    # ⚠️ CE QUI NE CHANGE PAS POUR AUTANT : le RANGEMENT sur le disque garde
    # `cp/maths/shorts/` pour les chiffres et `cp/francais/shorts/` pour les
    # lettres, et le nom de fichier garde `eleveai-maths-cp-`. Ce sont deux
    # questions différentes — ce qu'on ANNONCE à l'enfant, et où l'on RETROUVE
    # un fichier parmi trente-six. Dix chiffres mélangés à vingt-six lettres
    # dans un même dossier ne se retrouvent plus ; et quatre chiffres sont déjà
    # en ligne sous ce nom, qu'un renommage ne rattraperait pas.
    # ⭐ Le nom de série donne aussi son titre à la playlist : une seule pour
    # les lettres ET les chiffres, ce qui n'était pas possible tant que la garde
    # annonçait deux matières.
    # ⭐⭐ LA SÉRIE SUR PASTILLE SOMBRE, ET EN CURSIVE — MESURÉ, PAS CHOISI.
    # Frédéric, 06/09 : « pas assez de contraste entre eleveai et la belle
    # écriture, qui doit être en écriture cursive », puis « fond noir et
    # écriture orange ». Le calcul lui donne raison sans appel :
    #     orange sur le ciel #5BC8F5  →  1,47   ⛔ (seuil grand texte : 3,00)
    #     les autres lignes (nuit sur ciel) → 8,08
    #     orange sur la pastille nuit →  5,49   ✅
    # La ligne de série était LA SEULE chose illisible de la page de garde,
    # pendant que tout le reste était à 8. Ce n'était pas une impression.
    # ⭐ Et la cursive : une série qui s'appelle « La belle écriture » doit
    # l'écrire. ⚠️ C'est le SEUL endroit où une police script est permise —
    # elle nomme, elle n'enseigne pas. Le modèle que l'enfant repasse reste
    # tracé point par point (voir `chemin_bezier`) : une police donne un
    # contour, jamais un chemin.
    serie = Text(
        serie, font="Segoe Script",
        font_size=32 if not v else 26, color=ORANGE_RETENUE,
    )
    pastille = RoundedRectangle(
        width=serie.width + (0.55 if not v else 0.40),
        height=serie.height + (0.34 if not v else 0.26),
        corner_radius=0.16, stroke_width=0,
    ).set_fill(NUIT, opacity=1).move_to(serie)
    serie = VGroup(pastille, serie)
    classe = Text(classe, font_size=34 if not v else 26, color=NUIT)
    # ⚠️ `notion` est un paramètre depuis le 04/09 : les CHIFFRES ne sont pas de
    # l'« écriture cursive » — un chiffre s'écrit pareil en script et en attaché.
    # Leur garde dit « Les chiffres ».
    notion = Text(notion, font_size=54 if not v else 40, color=NUIT)
    # ⭐ LA CURSIVE À GAUCHE ET PLUS GRANDE : c'est le sujet de la vidéo, et on
    # lit de gauche à droite. L'imprimée était devant, sur une vidéo qui
    # s'appelle « Écriture cursive ».
    # ⭐ MAIS L'IMPRIMÉE RESTE : elle revient dans les cinq mots, où l'initiale
    # est en jaune. Jamais montrée, l'enfant la rencontrerait pour la première
    # fois au milieu d'un mot — et la correspondance entre les deux écritures
    # d'une lettre est une compétence du CP, pas un décor.
    # ⚠️ Sur ciel clair, le jaune de la charte devient illisible. La cursive
    # garde le BLANC (elle est le sujet, et un trait épais tient sur le bleu) ;
    # l'imprimée passe en orange, qui contraste sans hurler.
    imprime = Text(lettre, font_size=96 if not v else 76, color=ORANGE_RETENUE)
    # ⛔ LE FACTEUR SE RÈGLE PAR LETTRE, IL N'EST PAS UNIVERSEL.
    # 1,4 convient aux lettres qui tiennent au-dessus de la ligne (a, e, i, o,
    # u). Le « y » descend à −0,85 : caler sa HAUTEUR TOTALE sur la même valeur
    # écrase son corps à presque rien et replie la boucle par-dessus. Vu sur la
    # vignette du Short, pas dans le code — le glyphe y devenait illisible.
    # ⚠️ Chaque lettre à jambage (j, g, p, q, f) devra passer sa propre valeur.
    cursive = chemin_cursif
    cursive.height = imprime.height * hauteur_cursive
    duo = VGroup(cursive, imprime).arrange(RIGHT, buff=0.8)
    # ⚠️ La série se colle À LA CLASSE (buff serré), pas à la notion : les deux
    # premières lignes sont l'étiquette, la troisième est le sujet. Un espace
    # égal partout ferait quatre lignes de même poids, et plus de titre.
    etiquette = VGroup(serie, classe).arrange(DOWN, buff=0.16)
    coeur = VGroup(etiquette, notion, duo).arrange(DOWN, buff=0.38)
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
    # ⭐ LA MAIN SUR UNE PASTILLE BLEU NUIT : c'est la seule chose qui distingue
    # les deux vidéos, et sur ciel clair un texte blanc nu disparaitrait.
    # ⭐⭐ ET C'EST DEVENU LE POINT FORT DE LA CHAINE. Frédéric, 05/09 : « il y a
    # une vraie demande sur gaucher, car toutes les vidéos sont faites pour les
    # droitiers ». Les cinq paires publiées lui donnent raison — le gaucher fait
    # 3,4× à 20× les vues du droitier, sans exception.
    texte_main = Text(
        mains[1] if scene.gaucher else mains[0],
        font_size=32 if not v else 26,
        color=WHITE,
    )
    pastille = RoundedRectangle(
        width=texte_main.width + 0.55, height=texte_main.height + 0.35,
        corner_radius=0.18, stroke_width=0,
    ).set_fill(NUIT, opacity=1)
    main = VGroup(pastille, texte_main).to_edge(UP, buff=0.45)
    verifier(main, "mention de la main")
    # ⛔⛔ ELLE DOIT TENIR AU-DELÀ DE LA SECONDE, PAS JUSQU'À LA SECONDE.
    # Frédéric, 04/09 : « YouTube sélectionne l'image, celle qui est à
    # 1 seconde ». La première version s'arrêtait PILE à 1,00 s (0,75 + 0,25 de
    # fondu) : l'image prélevée tombait donc au milieu du fondu, ou déjà sur
    # l'écran d'accueil. La vignette du Short montrait le mauvais écran — et
    # sur un Short, cette image est tout ce qui décide.
    # ⭐⭐ 1,50 s — ET C'EST LA VIGNETTE TÉLÉVERSÉE QUI LE PERMET.
    # Historique de ce seul nombre, parce qu'il a bougé trois fois :
    #   0,75 → l'écran d'accueil arrivait à 1,00 s pile, YouTube prélevait le
    #          fondu. Trois Shorts sont partis en ligne avec une vignette NOIRE.
    #   1,30 → corrigeait 1,0 s, mais Frédéric a observé que YouTube prélève
    #          plutôt vers 1,5 s : on retombait dans le fondu (fin à 1,55 s).
    #   1,80 → sûr, mais 0,3 s de plus avant la leçon, sur le format où le pouce
    #          décide en deux secondes.
    #   1,50 → ⭐ LE CHOIX DU 04/09, après que les vignettes sont générées :
    #          « on revient à 1,5 s et on crée miniature ». Une vignette
    #          téléversée à la main rend le prélèvement automatique SANS OBJET,
    #          donc la durée redevient une pure question de rythme — et sur un
    #          Short, 0,3 s au démarrage ne sont pas rien.
    # ⛔ CE RÉGLAGE SUPPOSE QUE LA VIGNETTE EST TÉLÉVERSÉE. Elle est générée par
    # `scripts/vignettes-shorts.py` dans `manim/miniatures/cp/francais/shorts/`.
    # Sans elle, 1,50 remet le prélèvement au bord du fondu : remonter à 1,80.
    scene.add(ciel, garde, main)
    scene.wait(1.50)
    # ⚠️  et non  :  contient Ti-Margo, un ImageMobject.
    return Group(ciel, garde), main


# ─── La relance ───────────────────────────────────────────────────────────────
def ecran_relance(
    vertical: bool, lettre: str, dans_le_mot: bool = False,
    consigne: tuple[str, str, str] | None = None,
) -> VGroup:
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
    # ⚠️ `consigne` = (ligne 1 portrait, ligne 2 portrait, phrase paysage).
    # Traduisible, comme le reste des écrans.
    l1, l2, entier = consigne or (
        "Trouve un mot",
        "où on entend le" if dans_le_mot else "qui commence par",
        "Trouve un mot " + ("où on entend le" if dans_le_mot else "qui commence par"),
    )
    if vertical:
        haut = VGroup(
            Text(l1, font_size=36, color=VERT_OK),
            Text(l2, font_size=28, color=VERT_OK),
        ).arrange(DOWN, buff=0.18)
    else:
        haut = Text(entier, font_size=48, color=VERT_OK)
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

# ⭐ LES CHIFFRES SONT DES MATHS. Frédéric, 04/09 : « pour les prochaines vidéos
# de chiffre, remplace coach français par coach maths ». Une porte hors matière
# sur l'écran de sortie disperse au lieu de conduire — c'est le même argument
# qui avait fait retirer « Coach Maths » des vidéos de lettres.
# ⚠️ « Dictée » reste pour l'instant : c'est un rituel de français, et il pourrait
# devenir « Calcul rapide » sur les chiffres. Non tranché — à voir au rendu.
PORTES_MATHS = [
    "Coach Maths",
    "Dictée",
    "Fiches activités",
    "Fiches d'écriture",
]


# ⭐ Les clips PARTAGÉS par toutes les vidéos vivent dans leur propre dossier.
# La durée est lue sur le fichier, pas recopiée dans une table : une table de
# durées se désynchronise dès qu'on régénère la voix, et personne ne s'en aperçoit
# avant d'entendre une phrase coupée.
SONS = Path(__file__).resolve().parents[3] / "public" / "sons"


def _jouer(scene, dossier: str, nom: str) -> float:
    """Joue un clip partagé et rend sa durée réelle, lue dans le WAV."""
    chemin = SONS / dossier / f"{nom}.wav"
    scene.add_sound(str(chemin))
    with wave.open(str(chemin), "rb") as w:
        return w.getnframes() / float(w.getframerate())


def page_de_fin(
    scene, mascotte, clip_url: str, clip_tout: str | None = None,
    clip_bientot: str = "", portes: list[str] | None = None,
    adieu: str = "À bientôt !",
    adieu_taille: int | None = None,
    abonne: tuple[str, ...] = ("Abonne-toi", "à la chaîne !"),
    poignee: str = "@eleveai974",
    voix_abonne: str = "cp-commun",
    fiche: tuple[str, ...] | None = ("Télécharge", "ta fiche !"),
    fiche_url: str = "eleveai.fr/fiches-ecriture",
):
    """L'écran de sortie — COURT, et différent selon le format.

    ⛔⛔ LES QUATRE PORTES ONT SAUTÉ LE 05/09, ET C'EST UNE MESURE QUI L'A DÉCIDÉ.
    Elles occupaient une dizaine de secondes sur 65 — 15 % de la vidéo — alors
    que la durée moyenne de visionnage est de **6,7 s dans le fil Shorts** et
    **33 s en recherche**. Presque personne ne les atteignait. Et sur un Short,
    rien n'est cliquable : elles ne pouvaient même pas servir de lien.
    ⭐ EFFET MÉCANIQUE : raccourcir la fin AUGMENTE le pourcentage visionné. De
    65 à 58 secondes, les mêmes 33 s regardées passent de 51 % à 57 % — et c'est
    ce pourcentage que l'algorithme regarde.
    ⚠️ `clip_tout` et `portes` restent acceptés pour ne pas casser les appels
    existants ; ils ne sont plus joués.

    ⭐ DEUX ADRESSES SELON LE FORMAT (Frédéric, 05/09) :
      — PORTRAIT : « eleveai.fr » seul. Un chemin complet ne se retient pas sur
        un téléphone qu'on fait défiler ; il va dans la DESCRIPTION, où il est
        cliquable.
      — PAYSAGE : « eleveai.fr/fiches-ecriture ». Le spectateur est assis devant
        une leçon de plusieurs minutes — il peut lire et taper un chemin.
    ⚠️ SINGULIER : la route du site est `/fiches-ecriture`. Un « s » de trop
    affiché à l'écran envoie sur un 404 que personne ne corrigera de tête.
    """
    v = scene.vertical
    adresse = "eleveai.fr" if v else "eleveai.fr/fiches-ecriture"
    url = Text(adresse, font_size=54 if not v else 50, color=JAUNE_TITRE)
    verifier(url, "l'adresse de fin")
    # ⚠️ LA TAILLE SE PASSE, ELLE NE SE DEVINE PAS. « See you soon! » mesure
    # 4,11 de large à 42 pour 3,90 utiles — l'anglais est plus long que le
    # français à corps égal.  a arrêté le rendu, comme il doit.
    bientot = Text(
        adieu, font_size=adieu_taille or (52 if not v else 42), color=VERT_OK
    )
    verifier(bientot, "à bientôt")

    bloc = VGroup(url, bientot).arrange(DOWN, buff=0.55)
    margo = mascotte.scale(0.75 if not v else 0.85)
    page = Group(margo, bloc).arrange(DOWN, buff=0.45)
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

    d3 = scene.dire(clip_bientot)
    scene.play(GrowFromCenter(bientot), run_time=0.35)
    scene.play(bientot.animate.scale(1.18), run_time=0.35)
    scene.play(bientot.animate.scale(1 / 1.18), run_time=0.30)
    # ⚠️ Le plancher passe de 0,8 à 0,3 : l'écran d'abonnement suit, il n'y a
    # plus de raison de laisser un blanc avant lui.
    scene.wait(max(0.3, d3 - 1.0))

    # ── ⭐⭐ L'APPEL À L'ABONNEMENT (Frédéric, 05/09 : « à la fin on met abonne
    # toi à la chaîne »). ───────────────────────────────────────────────────
    # ⭐ LA POIGNÉE EST ÉCRITE, ET C'EST LE POINT. Sur un Short, RIEN N'EST
    # CLIQUABLE — c'est déjà ce qui avait condamné les quatre portes. Un bouton
    # dessiné ne serait qu'un dessin. `@eleveai974` se retient et se retape ;
    # un bouton, non.
    # ⛔ ET PAS DE FAUX BOUTON YOUTUBE : imiter l'interface de la plateforme
    # dans la vidéo, c'est promettre une action que l'image ne peut pas rendre.
    # ⚠️ CE QUE ÇA COÛTE, MESURÉ. L'écran ajoute ~3,5 s. Sur 64 s, les 39 s
    # réellement regardées passent de 61 % à 58 % du total — et c'est ce
    # pourcentage que l'algorithme lit. Le pari : convertir les 243 vues
    # engagées (contre 7 abonnés) vaut mieux que 3 points de rétention.
    # ⚠️ La voix est un clip PARTAGÉ (`public/sons/cp-commun/abonne.wav`), joué
    # en direct et non par `dire()` : `dire` lit le dossier de SA vidéo, et
    # recopier le même wav dans trente-six dossiers serait trente-six occasions
    # d'en oublier un.
    scene.play(FadeOut(url), FadeOut(bientot), run_time=0.3)
    lignes_abo = VGroup(
        *[
            Text(t, font_size=(46 if not v else 40), color=ORANGE_RETENUE)
            for t in (abonne if v else (" ".join(abonne),))
        ]
    ).arrange(DOWN, buff=0.18)
    for t in lignes_abo:
        verifier(t, "l'appel à l'abonnement")
    nom = Text(poignee, font_size=48 if not v else 42, color=WHITE)
    verifier(nom, "la poignée de la chaîne")
    bloc_abo = VGroup(lignes_abo, nom).arrange(DOWN, buff=0.45)
    # ⭐ ON REPREND LA PLACE DE `bloc`, DANS LE HAUT DE L'IMAGE — et le vide en
    # bas est voulu. Sur un Short, l'interface de YouTube (titre, nom de chaîne,
    # boutons) recouvre le cinquième inférieur de l'écran : ce qu'on y pose est
    # masqué chez la moitié des spectateurs. La poignée doit rester au-dessus.
    bloc_abo.move_to(bloc)

    # ⛔ LE TEMPS D'ATTENTE SE CALCULE, IL NE SE DEVINE PAS. Première version :
    # `max(0.6, d4 - 1.3)` — un 1,3 écrit à vue. Les animations en prenaient en
    # réalité 1,28, et la vidéo finissait 0,06 s AVANT la voix : la dernière
    # syllabe d'« à la chaîne » était rognée. Six centièmes qu'aucun œil ne
    # trouve, et que la comparaison des deux durées a sortis en une ligne.
    # ⚠️ On soustrait donc la somme RÉELLE des `run_time`, plus une marge de
    # 0,25 s — le son doit finir avant l'image, jamais l'inverse.
    anim = (0.35, 0.35, 0.30, 0.28)
    d4 = _jouer(scene, voix_abonne, "abonne")
    scene.play(GrowFromCenter(lignes_abo), run_time=anim[0])
    scene.play(FadeIn(nom, shift=UP * 0.25), run_time=anim[1])
    scene.play(nom.animate.scale(1.12), run_time=anim[2])
    scene.play(nom.animate.scale(1 / 1.12), run_time=anim[3])
    scene.wait(max(0.6, d4 - sum(anim) + 0.25))

    # ── ⭐⭐ LA FICHE À TÉLÉCHARGER ────────────────────────────────────────────
    # Frédéric, 06/09 : « ce serait bien à la fin de dire télécharge fiche
    # d'écriture ».
    # ⭐⭐ ET C'EST L'ÉCRAN LE PLUS IMPORTANT DE LA VIDÉO. Une vidéo montre le
    # geste ; elle ne le FAIT PAS FAIRE. L'enfant qui regarde n'écrit pas — il
    # regarde quelqu'un écrire. La feuille est le seul endroit où le geste passe
    # dans sa main. Tout le reste (l'abonnement, la chaîne) sert la chaîne ;
    # celui-ci sert l'enfant, et c'est aussi la seule conversion qui compte.
    # ⛔ CET ÉCRAN N'A PAS PU EXISTER AVANT LE 06/09 : les chiffres n'avaient
    # pas de fiche, la famille était fermée sur le site, et annoncer un
    # téléchargement inexistant aurait été pire que de se taire.
    # ⛔ ET L'ADRESSE SUIT LA MÊME RÈGLE QUE L'ÉCRAN DE SORTIE, pas une nouvelle.
    # J'y ai mis le chemin complet en portrait : 5,26 de large pour 3,90 utiles,
    # `verifier()` a arrêté le rendu. Or la règle était écrite vingt lignes plus
    # haut — chemin complet en PAYSAGE, « eleveai.fr » seul en PORTRAIT, parce
    # qu'un chemin ne se retient pas sur un téléphone qu'on fait défiler. Il
    # vit dans la DESCRIPTION, où il est cliquable.
    # 👉 Inventer une seconde règle à côté d'une règle existante, c'est en
    # créer deux qui divergeront.
    if fiche:
        scene.play(FadeOut(lignes_abo), FadeOut(nom), run_time=0.3)
        lignes_f = VGroup(
            *[
                Text(t, font_size=(46 if not v else 40), color=VERT_OK)
                for t in (fiche if v else (" ".join(fiche),))
            ]
        ).arrange(DOWN, buff=0.18)
        for t in lignes_f:
            verifier(t, "l'appel à la fiche")
        adr = Text(
            fiche_url if not v else fiche_url.split("/")[0],
            font_size=40 if not v else 34, color=JAUNE_TITRE,
        )
        verifier(adr, "l'adresse de la fiche")
        bloc_f = VGroup(lignes_f, adr).arrange(DOWN, buff=0.45)
        bloc_f.move_to(bloc)
        anim_f = (0.35, 0.35, 0.30, 0.28)
        d5 = _jouer(scene, voix_abonne, "fiche")
        scene.play(GrowFromCenter(lignes_f), run_time=anim_f[0])
        scene.play(FadeIn(adr, shift=UP * 0.25), run_time=anim_f[1])
        scene.play(adr.animate.scale(1.10), run_time=anim_f[2])
        scene.play(adr.animate.scale(1 / 1.10), run_time=anim_f[3])
        scene.wait(max(0.6, d5 - sum(anim_f) + 0.25))


# ─── ⭐ « MAINTENANT, PLUS VITE ! » ───────────────────────────────────────────
# Frédéric, 06/09 : « quand tu dis écrire plus vite, il faut un écran : on
# l'élève apprend à écrire plus vite ».
# ⭐ CE QUI SE JOUE : la reprise rapide n'était qu'une répétition, et une
# répétition sans annonce ressemble à un bug de montage. Nommée, elle devient
# une ÉTAPE — et c'est la vraie progression de l'écriture au CP : on trace
# d'abord juste, puis on trace fluide. La vitesse n'est pas de la performance,
# c'est ce qui libère la tête pour penser à ce qu'on écrit.
# ⚠️ IL NE COÛTE RIEN EN DURÉE, et c'est délibéré. La voix « on recommence, un
# peu plus vite » dure déjà 3,3 s pendant qu'on redessine : l'écran se loge DANS
# ce temps. Un écran de plus aurait allongé une vidéo déjà à 77 s, et le
# pourcentage visionné est ce que l'algorithme lit.
def ecran_plus_vite(scene, duree: float = 1.1):
    """Annonce la reprise rapide. À jouer juste après `dire("04-encore")`."""
    v = scene.vertical
    lignes = VGroup(
        *[
            Text(t, font_size=42 if not v else 34, color=BLEU_CALCUL)
            for t in (("Maintenant,", "plus vite !") if v
                      else ("Maintenant, plus vite !",))
        ]
    ).arrange(DOWN, buff=0.16)
    for t in lignes:
        verifier(t, "l'annonce de la reprise rapide")
    # ⛔ PAS EN HAUT DE L'ÉCRAN : le rappel du chiffre (`son`) y est posé en
    # permanence, à gauche, et l'annonce lui passait dessus — « Maintenant, »
    # écrit en travers du 6 jaune. Un texte centré ne « voit » pas ce qui
    # occupe déjà le coin.
    # ⭐ Elle descend donc dans la bande vide qui sépare le rappel de la
    # réglure : le seul endroit du cadre qui n'appartienne à personne.
    lignes.to_edge(UP, buff=2.0 if v else 1.4)
    scene.play(FadeIn(lignes, shift=DOWN * 0.25), run_time=0.35)
    scene.play(lignes.animate.scale(1.08), run_time=0.25)
    scene.play(lignes.animate.scale(1 / 1.08), run_time=0.22)
    scene.wait(max(0.1, duree - 0.82))
    return lignes


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
