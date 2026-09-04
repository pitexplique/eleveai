# Écriture du chiffre « 0 » — CP
#
# ⚠️ RÉFÉRENCE : programme de MATHÉMATIQUES du cycle 2 — écrire les chiffres, et
# la notion de quantité nulle.
#
# ⭐⭐ CE QUI CHANGE PAR RAPPORT AUX LETTRES, ET POURQUOI.
#
# 1. UN CHIFFRE N'A PAS DE SON. Les vidéos de lettres finissaient sur cinq mots
#    où l'on entend la lettre. Un « 3 » n'a aucun équivalent : il n'y a pas de
#    mots « où l'on entend trois ». À la place, on montre la QUANTITÉ — et c'est
#    le programme du CP, où le tracé et le sens du nombre s'apprennent ensemble.
#
# 2. ⭐⭐ LE ZÉRO NE SE DESSINE PAS. C'est le seul chiffre dont la quantité est
#    invisible : « rien » ne se voit que par rapport à l'endroit où quelque
#    chose aurait dû être. Frédéric, 04/09 : « je valide 1 pomme ou 2 pommes,
#    mais comment fait-on pour zéro ? ».
#    👉 On ne montre donc pas cinq images fixes, on montre une DISPARITION :
#    trois pommes dans une assiette, on les mange une à une, et **l'assiette
#    reste**. C'est elle qui rend le zéro visible.
#    ⛔ NE JAMAIS montrer un écran vide : un enfant qui voit du vide ne lit pas
#    « zéro », il croit que la vidéo a planté. Le vide ne s'enseigne qu'avec un
#    cadre autour.
#
# 3. « ZÉRO POMME » EST AU SINGULIER — la seule quantité qui ne prend pas la
#    marque du pluriel. C'est dans la voix, sans en faire une leçon.
#
# 4. Deux interlignes, pas trois : un chiffre est plus grand qu'une minuscule.
#
# ⛔ TOUJOURS --disable_caching. ⛔ ON NE REND QUE LES SHORTS.
#
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_0.py Chiffre0CpPortrait \
#                       -o eleveai-maths-cp-chiffre-0-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_0.py Chiffre0CpPortraitGaucher \
#                       -o eleveai-maths-cp-chiffre-0-gaucher-portrait --media_dir manim/scripts/cp/media

import sys
from pathlib import Path

import numpy as np
from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/
sys.path.insert(0, str(Path(__file__).resolve().parent))  # dossier cp/
from charte import *  # noqa: F403,E402
from mascotte import MascotteMargouillat  # noqa: E402

from lettre_commune import (  # noqa: E402
    EPS,
    INTERLIGNE,
    LARGEUR_REGLURE,
    Portrait,
    angle_main,
    chemin_bezier,
    page_de_fin,
    page_de_garde,
    poser_stylo,
    stylo_neuf,
    verifier,
)

# ─── Le chemin du « 0 » ───────────────────────────────────────────────────────
# ⭐ DEUX INTERLIGNES DE HAUT. Les chiffres sont plus grands que les minuscules :
# c'est ce qui permet de les distinguer d'un « o » ou d'un « l » dans une même
# ligne d'écriture.
# ⭐ On part EN HAUT et on tourne À GAUCHE — le même sens que le rond du « a » et
# du « o ». Un zéro tracé dans l'autre sens s'écrit peut-être, mais il rompt
# l'habitude que toutes les autres formes rondes viennent d'installer.
DEPART = np.array([0.00, 1.90, 0])
COURBES = [
    # 1 — par la gauche, on descend
    ((-0.46, 1.90), (-0.46, 0.00), (0.00, 0.00)),
    # 2 — le bas, puis on remonte fermer le rond
    ((0.46, 0.00), (0.46, 1.90), (0.00, 1.90)),
]


def chemin_0(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


def reglure_chiffres() -> VGroup:
    """Deux interlignes — la bande où s'écrit un chiffre."""
    g = VGroup()
    for k in range(3):
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


# ─── L'assiette et ses pommes ─────────────────────────────────────────────────
def assiette_dessine() -> VGroup:
    """L'assiette vue de trois quarts : le fond et le bord.

    ⭐ ELLE NE DISPARAIT JAMAIS. C'est tout le sujet de cette vidéo : le zéro
    n'est visible que parce qu'il reste un contenant pour le contenir.
    """
    bord = Ellipse(width=3.40, height=1.10, stroke_color=WHITE, stroke_width=6)
    bord.set_fill(opacity=0)
    fond = Ellipse(width=2.60, height=0.74, stroke_color=GREY_B, stroke_width=3)
    fond.set_fill(opacity=0)
    return VGroup(bord, fond)


def pomme_dessine() -> VGroup:
    """Une pomme : le fruit, la feuille, la queue."""
    fruit = Circle(radius=0.34, stroke_color=ROUGE_ERREUR, stroke_width=6)
    fruit.set_fill(opacity=0)
    queue = Line(np.array([0.02, 0.32, 0]), np.array([0.06, 0.58, 0]),
                 stroke_color=VERT_OK, stroke_width=4)
    feuille = Ellipse(width=0.30, height=0.14, stroke_color=VERT_OK, stroke_width=4)
    feuille.set_fill(opacity=0).rotate(0.5).shift(np.array([0.24, 0.56, 0]))
    return VGroup(fruit, queue, feuille)


# ─── La voix ──────────────────────────────────────────────────────────────────
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-chiffre-0"
DUREE = {
    "00-aujourdhui": 4.25, "01-ecoute": 3.28, "02-regarde": 3.29, "03-depart": 9.39,
    "04-encore": 2.92, "05-combien": 3.23, "06-trois": 4.73, "07-deux": 3.99,
    "08-une": 3.72, "09-zero": 5.73, "10-assiette": 6.45, "11-relance": 4.47,
    "12-va-sur": 3.16, "13-tout": 8.14, "14-bientot": 1.71,
}


class _Chiffre0Base(Scene):
    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE, sinon les sons sautent sans un mot."""
        self.add_sound(str(VOIX / f"{nom}.wav"))
        return DUREE[nom]

    def construct(self):
        son = Text("0", font_size=150, color=JAUNE_TITRE)
        titre = Text("le chiffre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ⚠️ « Les chiffres » et non « Écriture cursive » : un chiffre s'écrit
        # pareil en script et en attaché, la mention serait fausse.
        garde, garde_main = page_de_garde(
            self, "0", chemin_0(stroke_width=12), MascotteMargouillat(),
            hauteur_cursive=1.9, notion="Les chiffres",
        )

        self.play(
            FadeOut(garde), FadeOut(garde_main),
            FadeIn(titre), FadeIn(son), FadeIn(margo),
            run_time=0.25,
        )
        d0 = self.dire("00-aujourdhui")
        self.wait(d0)
        d = self.dire("01-ecoute")
        self.play(Indicate(son, scale_factor=1.25, color=JAUNE_TITRE))
        self.wait(max(0.2, d - 1.0))
        self.play(
            FadeOut(titre),
            FadeOut(margo, shift=RIGHT * 0.4),
            son.animate.scale(0.40).to_corner(UL, buff=0.55),
        )
        self.wait(0.4)

        # ── LE GESTE ────────────────────────────────────────────────────────
        lignes = reglure_chiffres()
        chiffre = chemin_0(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, chiffre).move_to(ORIGIN).shift(DOWN * 0.3)

        modele = chemin_0(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(chiffre)
        imprime = Text(
            "0", font_size=130 if not self.vertical else 110, color=JAUNE_TITRE
        ).move_to(modele)

        d = self.dire("02-regarde")
        self.play(Create(lignes), run_time=0.8)
        self.play(FadeIn(imprime, scale=0.85), run_time=0.3)
        self.play(Transform(imprime, modele), run_time=0.8)
        point = Dot(chiffre.get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2), run_time=0.5)
        self.wait(max(0.3, d - 2.4))

        modele_stylo = stylo_neuf()
        stylo = stylo_neuf()
        avance = ValueTracker(0.0)
        trace = VMobject(stroke_width=14 if not self.vertical else 16, stroke_color=WHITE)
        trace.set_fill(opacity=0)
        trace.add_updater(
            lambda m: m.become(
                chiffre.copy().pointwise_become_partial(
                    chiffre, 0, max(avance.get_value(), EPS)
                )
            )
        )
        a_main = angle_main(self.gaucher)
        stylo.add_updater(
            lambda m: poser_stylo(m, modele_stylo, chiffre, avance.get_value(), a_main)
        )

        self.remove(chiffre)
        self.add(trace, stylo)
        d = self.dire("03-depart")
        self.play(avance.animate.set_value(1.0), run_time=d - 0.4, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()
        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        self.dire("04-encore")
        for duree in (2.0, 1.2):
            self.remove(trace)
            trace = chemin_0(stroke_width=14 if not self.vertical else 16)
            trace.match_points(chiffre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime), FadeOut(trace))

        # ── ZÉRO, ÇA VEUT DIRE COMBIEN ? ────────────────────────────────────
        # ⭐⭐ LA DISPARITION. Trois pommes s'en vont une à une, et l'ASSIETTE
        # RESTE. C'est le seul moyen de montrer une quantité nulle : on ne voit
        # pas « rien », on voit un contenant vide.
        d = self.dire("05-combien")
        # ⛔ DEUX LIGNES EN PORTRAIT : « zéro, c'est combien ? » mesure 5,44 de
        # large à 38 pour 3,90 utiles — `verifier()` a arrêté le rendu. C'est la
        # troisième fois qu'une phrase entière ne tient pas dans le 9:16 ; la
        # règle est simple, au-delà de quinze signes on coupe à la main.
        if self.vertical:
            question = VGroup(
                Text("zéro,", font_size=34, color=BLEU_CALCUL),
                Text("c'est combien ?", font_size=34, color=BLEU_CALCUL),
            ).arrange(DOWN, buff=0.18)
        else:
            question = Text(
                "zéro, c'est combien ?", font_size=52, color=BLEU_CALCUL
            )
        for m in (question if self.vertical else [question]):
            verifier(m, "la question")
        question.to_edge(UP, buff=1.2 if self.vertical else 0.9)
        self.play(FadeIn(question, shift=DOWN * 0.3))
        self.wait(max(0.4, d - 1.0))

        assiette = assiette_dessine()
        echelle_a = 1.0 if not self.vertical else 0.78
        assiette.scale(echelle_a).move_to(DOWN * 0.9)
        pommes = VGroup(*[pomme_dessine().scale(echelle_a) for _ in range(3)])
        for i, p in enumerate(pommes):
            p.move_to(assiette.get_center() + np.array([(i - 1) * 0.9 * echelle_a, 0.34, 0]))

        # ⭐ Un compteur qui descend : le chiffre change à chaque pomme mangée.
        compteur = Text("3", font_size=150 if not self.vertical else 120, color=JAUNE_TITRE)
        compteur.next_to(assiette, UP, buff=0.9)

        d = self.dire("06-trois")
        self.play(Create(assiette), run_time=0.6)
        self.play(*[FadeIn(p, scale=0.6) for p in pommes], run_time=0.5)
        self.play(FadeIn(compteur, scale=0.7), run_time=0.4)
        self.wait(max(0.3, d - 1.5))

        for clip, reste in (("07-deux", "2"), ("08-une", "1"), ("09-zero", "0")):
            d = self.dire(clip)
            partante = pommes[-1]
            pommes.remove(partante)
            # ⚠️ La pomme SORT de l'écran vers le haut : « mangée », pas
            # « effacée ». Un objet qui s'évanouit sur place se lit comme une
            # erreur d'affichage ; un objet qui part se lit comme une action.
            self.play(partante.animate.shift(UP * 2.6).set_opacity(0), run_time=0.7)
            neuf = Text(
                reste, font_size=150 if not self.vertical else 120,
                color=JAUNE_TITRE if reste != "0" else VERT_OK,
            ).move_to(compteur)
            self.play(Transform(compteur, neuf), run_time=0.4)
            self.wait(max(0.3, d - 1.1))

        # ⭐ L'ASSIETTE SEULE, ET ELLE PULSE. C'est l'image à retenir.
        d = self.dire("10-assiette")
        self.play(Indicate(assiette, scale_factor=1.15, color=VERT_OK), run_time=1.0)
        self.wait(max(0.6, d - 1.0))

        # ── LA RELANCE ──────────────────────────────────────────────────────
        self.play(FadeOut(question), FadeOut(assiette), FadeOut(compteur))
        if self.vertical:
            relance = VGroup(
                Text("Cherche une chose", font_size=28, color=VERT_OK),
                Text("dont il y a", font_size=28, color=VERT_OK),
                Text("0", font_size=90, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.22)
        else:
            relance = VGroup(
                Text("Cherche une chose dont il y a", font_size=48, color=VERT_OK),
                Text("0", font_size=120, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.35)
        for m in relance:
            verifier(m, "relance du zéro")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.06), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-va-sur", "13-tout", "14-bientot")


class Chiffre0Cp(_Chiffre0Base):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class Chiffre0CpGaucher(_Chiffre0Base):
    gaucher = True


class Chiffre0CpPortrait(Portrait, _Chiffre0Base):
    """9:16, droitier — LE format qui est vu."""


class Chiffre0CpPortraitGaucher(Portrait, _Chiffre0Base):
    gaucher = True
