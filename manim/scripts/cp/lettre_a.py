# Création et écriture de la lettre « a » — CP
#
# ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, notion `grapheme_phoneme`.
# Micros couvertes : cp_gph_voyelles (le son [a]) et cp_copie_lettre (le sens du
# tracé — c'est la même leçon vue par l'écriture).
#
# ⭐⭐ POURQUOI CE SCRIPT N'EMPLOIE PAS LA POLICE CURSIVE, ALORS QU'ON L'A.
# Marelle est embarquée dans le site depuis le 02/09, et Manim sait afficher une
# police système. Mais une police donne le CONTOUR d'une lettre — un tracé fermé
# qui monte d'un côté du trait et redescend de l'autre pour faire l'épaisseur.
# `Write()` et `Create()` animent ce contour : le crayon ferait LE TOUR de la
# lettre, pas son chemin. Sur une vidéo dont l'objet EST le geste, ce serait
# montrer exactement l'inverse de ce qu'on enseigne — et le pool du coach dit
# pourquoi ça compte : « une lettre tracée à l'envers se lit peut-être, mais
# elle ne s'attachera pas à la suivante ».
#
# ⭐ Le « a » est donc écrit comme un CHEMIN À UN SEUL TRAIT, en courbes de
# Bézier, avec son point de départ et son sens. Les mêmes points servent au site
# (canvas `reglure`) : une seule vérité pour la vidéo et pour la fiche.
#
# ⭐ Vérifié au rendu avant d'écrire une ligne de Manim : les quatre temps du
# geste se lisent (le rond part en haut à droite, tourne à gauche, redescend le
# côté droit, sort vers la lettre suivante).
#
# ⛔ TOUJOURS --disable_caching : sans lui, les sons sautent (voir `dire`).
# Rendu 16:9   : python -m manim render -qh --disable_caching manim/scripts/cp/lettre_a.py LettreACp \
#                  -o eleveai-francais-cp-lettre-a --media_dir manim/scripts/cp/media
# Rendu 9:16   : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/lettre_a.py LettreACpShort \
#                  -o eleveai-francais-cp-lettre-a-short --media_dir manim/scripts/cp/media

import sys
from pathlib import Path

import numpy as np
from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/
from charte import *  # noqa: F403,E402
from mascotte import MascotteMargouillat  # noqa: E402

# ─── La géométrie du Seyès, en unités Manim ───────────────────────────────────
# ⭐ 1 unité = 1 interligne. Le corps d'une minuscule occupe EXACTEMENT un
# interligne : c'est sur lui que l'enfant apprend la taille de ses lettres, et
# c'est pour ça que la réglure est dessinée et non suggérée.
INTERLIGNE = 1.0
LARGEUR_REGLURE = 9.0


def reglure(nb_interlignes: int = 3) -> VGroup:
    """La bande d'écriture : ligne de base forte, trois fines au-dessus."""
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


# ─── Le chemin du « a », en courbes de Bézier ─────────────────────────────────
# Repère : (0, 0) sur la ligne de base, à l'aplomb du départ du rond.
# Les quatre temps du geste, dans l'ordre où le crayon les fait.
DEPART = np.array([0.00, 0.70, 0])
COURBES = [
    # 1 et 2 — le rond : il part en haut à droite, passe par le haut, descend à gauche
    ((-0.10, 1.05), (-0.80, 1.00), (-0.80, 0.50)),
    # 2 et 3 — il ferme le rond par le bas et remonte à droite
    ((-0.80, 0.05), (-0.15, 0.05), (0.00, 0.60)),
]
STEM_BAS = np.array([0.00, 0.00, 0])
SORTIE = ((0.15, -0.05), (0.30, 0.10), (0.50, 0.35))

# ⭐ Cinq mots, pas un : un seul exemple ne fait pas une règle. Tous commencent
# par la LETTRE « a » ET par le SON [a] — « âne » aurait le son sans la lettre
# nue, et brouillerait la leçon au lieu de l'élargir.
#
# ⛔ ET CHACUN A SON DESSIN (Frédéric : « en face de chaque mot tu dessines,
# pas l'arbre isolé »). C'est ce qui a fait sortir « allons » de la liste : un
# verbe ne se dessine pas, et un mot sans image serait le seul que l'enfant ne
# pourrait pas relier à quelque chose. Cinq noms concrets à la place.
MOTS_EN_A = ["arbre", "avion", "ami", "animal", "abricot"]


def chemin_a(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    """⭐ UN SEUL TRAIT, dans le sens de l'écriture — pas un contour de police."""
    p = VMobject(stroke_width=stroke_width, stroke_color=color)
    p.set_fill(opacity=0)
    p.start_new_path(DEPART)
    for c1, c2, fin in COURBES:
        p.add_cubic_bezier_curve_to(
            np.array([*c1, 0]), np.array([*c2, 0]), np.array([*fin, 0])
        )
    p.add_line_to(STEM_BAS)  # la hampe descend jusqu'à la ligne
    c1, c2, fin = SORTIE
    p.add_cubic_bezier_curve_to(
        np.array([*c1, 0]), np.array([*c2, 0]), np.array([*fin, 0])
    )
    return p


# ─── Le stylo qui écrit ───────────────────────────────────────────────────────
# ⭐⭐ IDÉE DE FRÉDÉRIC (02/09/2026) : « oriente-le comme le vecteur normal au
# segment, il est facile à calculer ». Sans stylo, on voit un trait APPARAITRE ;
# avec lui, on voit quelqu'un ÉCRIRE — et c'est toute la différence pour un
# enfant qui doit reproduire le geste.
#
# La normale d'une tangente (tx, ty) est (−ty, tx) : une soustraction et une
# permutation, rien de plus. Le stylo est bâti la POINTE À L'ORIGINE, corps vers
# le haut ; à chaque image on le tourne de l'angle de la normale et on pose sa
# pointe sur le point courant du chemin.

LONGUEUR_STYLO = 1.15
EPS = 1e-3


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


def poser_stylo(stylo: VGroup, modele: VGroup, chemin: VMobject, s: float) -> None:
    """Pose la pointe sur le chemin à l'abscisse `s`, inclinée selon la NORMALE.

    ⚠️ On borne `s` : `point_from_proportion` refuse 0 et 1 exactement sur
    certains chemins composés, et une tangente nulle ferait un `atan2(0, 0)`.
    """
    s = min(max(s, EPS), 1 - EPS)
    p = chemin.point_from_proportion(s)
    q = chemin.point_from_proportion(min(s + EPS, 1 - EPS))
    tangente = q - p
    if np.linalg.norm(tangente) < 1e-9:
        tangente = np.array([1.0, 0.0, 0.0])
    normale = np.array([-tangente[1], tangente[0], 0.0])
    normale /= np.linalg.norm(normale)
    angle = np.arctan2(normale[1], normale[0])
    stylo.become(modele.copy().rotate(angle - PI / 2, about_point=ORIGIN).shift(p))


def avion_dessine() -> VGroup:
    """Un avion vu de dessus : fuselage, ailes, empennage."""
    fuselage = Ellipse(width=0.35, height=1.5, stroke_color=WHITE, stroke_width=5)
    ailes = Polygon(
        np.array([-0.75, -0.05, 0]), np.array([0.75, -0.05, 0]),
        np.array([0.28, -0.42, 0]), np.array([-0.28, -0.42, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5,
    )
    queue = Polygon(
        np.array([-0.32, -0.62, 0]), np.array([0.32, -0.62, 0]),
        np.array([0.14, -0.80, 0]), np.array([-0.14, -0.80, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5,
    )
    g = VGroup(ailes, queue, fuselage)
    for m in g:
        m.set_fill(opacity=0)
    return g


def ami_dessine() -> VGroup:
    """Deux camarades côte à côte : l'ami, ça se dessine à deux."""
    def bonhomme(dx, couleur):
        tete = Circle(radius=0.26, stroke_color=couleur, stroke_width=5)
        tete.set_fill(opacity=0).shift(UP * 0.5)
        corps = RoundedRectangle(
            width=0.42, height=0.62, corner_radius=0.16,
            stroke_color=couleur, stroke_width=5,
        )
        corps.set_fill(opacity=0).shift(DOWN * 0.15)
        return VGroup(tete, corps).shift(RIGHT * dx)

    return VGroup(bonhomme(-0.32, WHITE), bonhomme(0.32, BLEU_CALCUL))


def animal_dessine() -> VGroup:
    """Un chat de face : la tête suffit à dire « animal »."""
    tete = Circle(radius=0.48, stroke_color=WHITE, stroke_width=5)
    tete.set_fill(opacity=0)
    oreilles = VGroup(
        Polygon(np.array([-0.42, 0.22, 0]), np.array([-0.34, 0.72, 0]),
                np.array([-0.06, 0.38, 0]), stroke_color=WHITE, stroke_width=5),
        Polygon(np.array([0.42, 0.22, 0]), np.array([0.34, 0.72, 0]),
                np.array([0.06, 0.38, 0]), stroke_color=WHITE, stroke_width=5),
    )
    for o in oreilles:
        o.set_fill(opacity=0)
    yeux = VGroup(Dot(np.array([-0.17, 0.08, 0]), radius=0.06),
                  Dot(np.array([0.17, 0.08, 0]), radius=0.06))
    museau = Polygon(np.array([-0.09, -0.10, 0]), np.array([0.09, -0.10, 0]),
                     np.array([0.0, -0.22, 0]), stroke_color=WHITE, stroke_width=4)
    museau.set_fill(opacity=0)
    moustaches = VGroup(
        Line(np.array([-0.24, -0.14, 0]), np.array([-0.66, -0.20, 0]), stroke_width=3),
        Line(np.array([0.24, -0.14, 0]), np.array([0.66, -0.20, 0]), stroke_width=3),
    )
    return VGroup(tete, oreilles, yeux, museau, moustaches)


def abricot_dessine() -> VGroup:
    """Un abricot : le fruit, sa rainure, sa feuille."""
    fruit = Circle(radius=0.48, stroke_color=ORANGE_RETENUE, stroke_width=5)
    fruit.set_fill(opacity=0)
    rainure = Arc(radius=0.34, start_angle=PI / 2, angle=-PI / 2.6,
                  stroke_color=ORANGE_RETENUE, stroke_width=3)
    feuille = Polygon(np.array([0.05, 0.46, 0]), np.array([0.42, 0.78, 0]),
                      np.array([0.10, 0.72, 0]), stroke_color=VERT_OK, stroke_width=4)
    feuille.set_fill(opacity=0)
    return VGroup(fruit, rainure, feuille)


def arbre_dessine() -> VGroup:
    """L'arbre, dessiné comme dans la bibliothèque du site : un tronc et trois
    houppiers. ⭐ Le même objet que l'enfant colorie sur sa fiche de vocabulaire."""
    tronc = Rectangle(width=0.34, height=0.9, stroke_color=WHITE, stroke_width=6)
    tronc.set_fill(opacity=0).shift(DOWN * 0.45)
    feuillage = VGroup(
        Circle(radius=0.62, stroke_color=VERT_OK, stroke_width=6).shift(UP * 0.55),
        Circle(radius=0.42, stroke_color=VERT_OK, stroke_width=6).shift(
            UP * 0.25 + LEFT * 0.55
        ),
        Circle(radius=0.42, stroke_color=VERT_OK, stroke_width=6).shift(
            UP * 0.25 + RIGHT * 0.55
        ),
    )
    for c in feuillage:
        c.set_fill(opacity=0)
    return VGroup(tronc, feuillage)


# ─── La voix ──────────────────────────────────────────────────────────────────
# ⭐⭐ POURQUOI CETTE VIDÉO N'EST PAS MUETTE, alors que `manim/REGLES.md` pose que
# « les vidéos sont muettes, le texte à l'écran doit tout expliquer ».
# La règle tient du CP au lycée — sauf ici, et pour une raison qui la retourne :
# UN ENFANT DE SIX ANS NE SAIT PAS LIRE. Le texte ne peut pas porter
# l'explication puisqu'il est justement ce qu'on lui apprend à déchiffrer.
# Frédéric, 02/09/2026 : « il faut mettre le script de la vidéo en son ».
#
# Les clips sont produits par `scripts/generer-voix.ps1` depuis
# `manim/voix/cp-lettre-a.json` — une phrase change, on régénère en une commande.
#
# ⭐ VOIX : **Julie**, l'une des trois voix françaises MODERNES de Windows.
# Frédéric, 02/09 : « elle n'est pas très joyeuse », « ça fait trop machine » —
# c'était Hortense, une voix SAPI5 de 2012, la seule que `System.Speech` sache
# voir. Julie et Paul ne s'atteignent que par WinRT (voir le générateur).
#
# ⚠️ LES DURÉES SONT MESURÉES, PAS ESTIMÉES (lecture des en-têtes WAV). Elles
# commandent les `wait()` : une phrase plus longue que son écran déborde sur le
# suivant, et personne ne le voit en lisant le code.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-a"
DUREE = {
    "00-aujourdhui": 3.17, "01-ecoute": 2.99, "02-regarde": 3.02, "03-depart": 6.70,
    "04-encore": 2.92, "05-cherchons": 4.12, "05-a-comme": 1.58, "06-arbre": 1.46,
    "07-avion": 1.47, "08-ami": 1.36, "09-animal": 1.68, "10-abricot": 1.65,
    "10-pareil": 4.71, "11-relance": 3.60, "12-signature": 2.95,
}
CLIPS_MOTS = ["06-arbre", "07-avion", "08-ami", "09-animal", "10-abricot"]


class _LettreABase(Scene):
    """Le contenu, écrit une fois. Les deux formats n'en changent que le cadre."""

    vertical = False

    def dire(self, nom: str) -> float:
        """Joue un clip de voix ici, et rend sa durée pour caler l'attente.

        ⛔⛔ RENDRE **SANS CACHE**, SINON LE SON DISPARAIT SANS UN MOT.
        `Scene.add_sound` commence par `if self.renderer.skip_animations:
        return` — et `skip_animations` passe à True dès qu'une animation est
        reprise du cache. Au deuxième rendu, la vidéo sortait donc avec 3,71 s
        d'audio pour 48 s d'image : seul le premier clip, celui joué avant que
        le cache ne s'active. Rien dans les journaux, rien à l'écran.
        👉 Toujours `--disable_caching` sur cette vidéo (c'est dans les
        commandes en tête de fichier), et VÉRIFIER la durée de la piste audio
        après rendu.
        """
        self.add_sound(str(VOIX / f"{nom}.wav"))
        return DUREE[nom]

    def construct(self):
        # ── 1. LE SON D'ABORD, LA LETTRE ENSUITE ────────────────────────────
        # ⭐ Au CP on dit le SON, jamais le nom de la lettre. Pour « a » les deux
        # se confondent ; pour « b » le nom (« bé ») est l'erreur à ne pas
        # commettre. L'écran l'écrit donc en clair.
        # ⛔ PAS DE CROCHETS (Frédéric, 02/09) : « [a] » est la notation des
        # phonéticiens, elle ne dit rien à un enfant de six ans — et elle
        # ajoutait deux signes à lire là où on veut qu'il n'en lise qu'un.
        son = Text("a", font_size=150, color=JAUNE_TITRE)
        titre = Text("le son", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        # ⭐ TI-MARGO OUVRE ET FERME LA VIDÉO, ET RIEN ENTRE LES DEUX.
        # `manim/REGLES.md` le veut « sur chaque écran » ; Frédéric a tranché
        # autrement pour celle-ci (02/09) : « pas sur chaque écran, mais sur
        # l'écran d'accueil et de fin ». ⭐ La raison se voit au rendu — pendant
        # le tracé, l'oeil doit suivre le crayon et rien d'autre. Une mascotte
        # dans le coin est un second point d'attention sur le seul écran qui
        # n'en supporte pas.
        # ⭐ Et il tient déjà un crayon : c'est lui qui va écrire.
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        d0 = self.dire("00-aujourdhui")
        self.wait(d0)
        d = self.dire("01-ecoute")
        self.play(
            FadeIn(titre, shift=DOWN * 0.3),
            GrowFromCenter(son),
            FadeIn(margo, shift=LEFT * 0.4),
        )
        self.wait(d - 0.8)
        # ⛔ LE SON SE RANGE DANS UN COIN, PAS EN HAUT AU CENTRE (corrigé au
        # rendu du 02/09). Posé à `to_edge(UP)`, il restait pile là où
        # « a comme… » vient s'écrire, et les deux se chevauchaient à l'écran.
        # ⭐ Mais il RESTE affiché : le son est ce qu'on apprend, et le garder
        # sous les yeux pendant tout l'exercice vaut mieux que le faire
        # disparaitre dès qu'on trace.
        # Il sort avec l'écran d'accueil, et laisse la place au geste.
        self.play(
            FadeOut(titre),
            FadeOut(margo, shift=RIGHT * 0.4),
            son.animate.scale(0.40).to_corner(UL, buff=0.55),
        )
        self.wait(0.4)

        # ── 2. LE GESTE, LENTEMENT ──────────────────────────────────────────
        lignes = reglure(3)
        lettre = chemin_a(stroke_width=14 if not self.vertical else 16)
        groupe = VGroup(lignes, lettre)
        groupe.move_to(ORIGIN).shift(DOWN * 0.4)

        d = self.dire("02-regarde")
        self.play(Create(lignes), run_time=0.8)
        point = Dot(lettre.get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2))
        self.wait(max(0.4, d - 1.4))

        # ⭐ LE TRACÉ EST LENT, D'UN SEUL TENANT, ET LE STYLO LE MÈNE.
        # Un seul `ValueTracker` pilote les deux : le trait qui se dessine et le
        # stylo qui avance. C'est ce qui les garde synchrones à l'image près —
        # un `Create()` d'un côté et un `MoveAlongPath()` de l'autre dérivent.
        modele_stylo = stylo_neuf()
        stylo = stylo_neuf()
        avance = ValueTracker(0.0)

        trace = VMobject(stroke_width=14 if not self.vertical else 16, stroke_color=WHITE)
        trace.set_fill(opacity=0)
        trace.add_updater(
            lambda m: m.become(
                lettre.copy().pointwise_become_partial(
                    lettre, 0, max(avance.get_value(), EPS)
                )
            )
        )
        stylo.add_updater(
            lambda m: poser_stylo(m, modele_stylo, lettre, avance.get_value())
        )

        self.remove(lettre)
        self.add(trace, stylo)
        # ⭐ LE TRACÉ DURE EXACTEMENT LE TEMPS DE LA PHRASE QUI LE DÉCRIT —
        # « on part du point vert, on tourne à gauche, on redescend, et on
        # sort ». Le geste et les mots avancent ensemble, sinon l'enfant entend
        # « on redescend » quand le crayon est déjà sorti.
        d = self.dire("03-depart")
        self.play(avance.animate.set_value(1.0), run_time=d - 0.4, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()
        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        # ── 3. ON REFAIT, PLUS VITE ─────────────────────────────────────────
        # Deux reprises : l'enfant a vu le geste, il le revoit au rythme où il
        # l'écrira. Sans stylo cette fois — c'est le trait qu'on regarde.
        self.dire("04-encore")
        for duree in (2.0, 1.2):
            self.remove(trace)
            trace = chemin_a(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes))
        lettre = trace

        # ── 4. « a » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        # ⭐ La boucle se ferme : le son, le geste, puis les MOTS. Cinq, parce
        # qu'un seul exemple ne fait pas une règle.
        # ⛔ Et CHAQUE mot a son image, jamais un seul dessin pour toute la
        # liste : un mot sans image serait le seul que l'enfant ne pourrait
        # relier à rien. C'est ce qui a fait sortir « allons » — un verbe ne se
        # dessine pas.
        self.play(FadeOut(lettre), FadeOut(lignes), FadeOut(point))

        titre_mots = Text("a comme…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            arbre_dessine(), avion_dessine(), ami_dessine(),
            animal_dessine(), abricot_dessine(),
        ]
        echelle_dessin = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_A, dessins):
            t = Text(mot, font_size=42 if not self.vertical else 38)
            t[0].set_color(JAUNE_TITRE)
            d = dessin.scale(echelle_dessin)
            ligne = VGroup(t, d).arrange(RIGHT, buff=0.55)
            lignes_mots.add(ligne)

        # ⚠️ Les mots s'alignent à GAUCHE de leur ligne : centrer chaque ligne
        # ferait danser les initiales d'une ligne à l'autre, et c'est justement
        # l'initiale qu'on regarde.
        lignes_mots.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        bloc = VGroup(titre_mots, lignes_mots).arrange(DOWN, buff=0.5)
        bloc.move_to(ORIGIN).scale(0.95 if not self.vertical else 0.8)

        dc = self.dire("05-cherchons")
        self.wait(dc)
        d = self.dire("05-a-comme")
        self.play(FadeIn(titre_mots, shift=DOWN * 0.3))
        self.wait(max(0.2, d - 1.0))
        for ligne, clip in zip(lignes_mots, CLIPS_MOTS):
            duree_mot = self.dire(clip)
            # ⭐ ZOOM IN / ZOOM OUT (demande de Frédéric) : le mot arrive, se
            # rapproche pour qu'on le regarde, puis reprend sa place dans la
            # liste. C'est ce qui donne le rythme — sans lui, cinq lignes
            # s'empilent et l'oeil ne sait plus laquelle est la nouvelle.
            # ⚠️ LE ZOOM PORTE SUR LA LIGNE ENTIÈRE, MOT **ET** IMAGE
            # (Frédéric, 02/09 : « sur la ligne avec l'image »). Zoomer le seul
            # mot a été essayé et écarté : le dessin restait petit à côté d'un
            # mot grossi, et c'est justement le couple mot–image qu'on veut
            # faire regarder ensemble.
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.22), run_time=0.35)
            self.wait(0.45)
            self.play(ligne.animate.scale(1 / 1.22), run_time=0.3)
            # Le mot dit, puis un souffle : jamais l'un sur l'autre.
            self.wait(max(0.15, duree_mot - 1.45))
        dp = self.dire("10-pareil")
        self.wait(dp)

        # ── 4 bis. LA RELANCE ───────────────────────────────────────────────
        # ⭐ On ne finit pas sur une liste : on rend la main. « Un autre mot ? »
        # transforme un visionnage en devinette, et c'est ce qui fait rejouer.
        self.play(FadeOut(bloc))
        relance = Text("On essaie un autre mot ?", font_size=54, color=VERT_OK)
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. SIGNATURE ────────────────────────────────────────────────────
        # ⚠️ `MascotteMargouillat` ne prend PAS de `scale` en argument : son
        # `__init__` ne transmet que les kwargs d'ImageMobject et fixe la
        # hauteur. Tous les scripts existants font `.scale(...)` après coup.
        # ⚠️ On REPREND le même Ti-Margo, on n'en crée pas un second : il a
        # accompagné toute la vidéo depuis son coin, il revient au centre.
        signe = Text("EleveAI — Ti Margo", font_size=40, color=BLEU_CALCUL)
        signe.move_to(DOWN * 2.3)
        # ⚠️ On REPREND le même Ti-Margo — il ouvrait la vidéo, il la ferme.
        margo.scale(0.75).move_to(UP * 0.7)
        d = self.dire("12-signature")
        self.play(FadeIn(margo, shift=UP * 0.3), FadeIn(signe, shift=UP * 0.3))
        self.wait(max(1.2, d - 0.8))


class LettreACp(_LettreABase):
    """16:9 — YouTube."""

    vertical = False


class LettreACpShort(_LettreABase):
    """9:16 — Shorts et Instagram.

    ⚠️ LE CADRE LOGIQUE S'IMPOSE DANS `__init__`, avant `super()`. Passer
    seulement `-r 1080,1920` ne change que les pixels : le cadre reste large, et
    tout le texte déborde. (Règle de manim/REGLES.md, § 974.)
    """

    vertical = True

    def __init__(self, *args, **kwargs):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(*args, **kwargs)
