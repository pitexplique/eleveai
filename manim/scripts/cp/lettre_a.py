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
# Rendu 16:9   : python -m manim render -qh manim/scripts/cp/lettre_a.py LettreACp \
#                  -o eleveai-francais-cp-lettre-a --media_dir manim/scripts/cp/media
# Rendu 9:16   : python -m manim render -qh -r 1080,1920 manim/scripts/cp/lettre_a.py LettreACpShort \
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


class _LettreABase(Scene):
    """Le contenu, écrit une fois. Les deux formats n'en changent que le cadre."""

    vertical = False

    def construct(self):
        # ── 1. LE SON D'ABORD, LA LETTRE ENSUITE ────────────────────────────
        # ⭐ Au CP on dit le SON, jamais le nom de la lettre. Pour « a » les deux
        # se confondent ; pour « b » le nom (« bé ») est l'erreur à ne pas
        # commettre. L'écran l'écrit donc en clair.
        son = Text("[a]", font_size=140, color=JAUNE_TITRE)
        titre = Text("le son", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        self.play(FadeIn(titre, shift=DOWN * 0.3), GrowFromCenter(son))
        self.wait(1.4)
        self.play(FadeOut(titre), son.animate.scale(0.42).to_edge(UP, buff=0.9))
        self.wait(0.4)

        # ── 2. LE GESTE, LENTEMENT ──────────────────────────────────────────
        lignes = reglure(3)
        lettre = chemin_a(stroke_width=14 if not self.vertical else 16)
        groupe = VGroup(lignes, lettre)
        groupe.move_to(ORIGIN).shift(DOWN * 0.4)

        self.play(Create(lignes), run_time=0.8)
        point = Dot(lettre.get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2))
        self.wait(0.6)

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
        self.play(avance.animate.set_value(1.0), run_time=5, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()
        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        # ── 3. ON REFAIT, PLUS VITE ─────────────────────────────────────────
        # Deux reprises : l'enfant a vu le geste, il le revoit au rythme où il
        # l'écrira. Sans stylo cette fois — c'est le trait qu'on regarde.
        for duree in (2.0, 1.2):
            self.remove(trace)
            trace = chemin_a(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes))
        lettre = trace

        # ── 4. « a » COMME ARBRE ────────────────────────────────────────────
        # ⭐ La boucle se ferme : le son, le geste, puis le MOT et l'image. Et
        # c'est le meme arbre que l'enfant colorie sur sa fiche de vocabulaire.
        mot = Text("arbre", font_size=88, color=WHITE)
        initiale = Text("a", font_size=88, color=JAUNE_TITRE)
        arbre = arbre_dessine()

        if self.vertical:
            mot.to_edge(UP, buff=2.6)
            arbre.scale(1.1).next_to(mot, DOWN, buff=1.0)
        else:
            mot.shift(LEFT * 2.6)
            arbre.scale(1.2).shift(RIGHT * 2.8)

        self.play(FadeOut(lettre), FadeIn(mot, shift=UP * 0.3))
        initiale.move_to(mot[0])
        self.play(Transform(mot[0], initiale), Circumscribe(mot[0], color=JAUNE_TITRE))
        self.play(Create(arbre), run_time=1.6)
        self.wait(1.6)

        # ── 5. SIGNATURE ────────────────────────────────────────────────────
        self.play(FadeOut(mot), FadeOut(arbre))
        # ⚠️ `MascotteMargouillat` ne prend PAS de `scale` en argument : son
        # `__init__` ne transmet que les kwargs d'ImageMobject et fixe la
        # hauteur. Tous les scripts existants font `.scale(...)` après coup.
        margo = MascotteMargouillat().scale(0.55)
        signe = Text("EleveAI — Ti Margo", font_size=40, color=BLEU_CALCUL)
        bloc = Group(margo, signe).arrange(DOWN, buff=0.5).move_to(ORIGIN)
        self.play(FadeIn(bloc, shift=UP * 0.3))
        self.wait(1.8)


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
