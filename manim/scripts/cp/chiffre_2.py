# Écriture du chiffre « 2 » — CP
#
# ⚠️ RÉFÉRENCE : programme de MATHÉMATIQUES du cycle 2 — écrire les chiffres, et
# la quantité un.
#
# ⭐ CE QUE LE « 1 » APPORTE APRÈS LE « 0 ».
# Le zéro demandait une DISPARITION : sa quantité est invisible, il fallait un
# contenant pour la montrer. Le « 1 » n'a pas ce problème — mais il en a un
# autre, plus discret : **un, c'est un de N'IMPORTE QUOI**. Un enfant qui ne voit
# que « une pomme » associe le chiffre à la pomme. On montre donc cinq objets
# différents, et un seul de chaque : c'est la variété qui fait comprendre que le
# nombre ne dépend pas de la chose comptée.
#
# ⚠️ « un soleil » mais « une pomme » : le genre change et la voix le dit. À six
# ans, entendre les deux formes du même nombre vaut mieux qu'un « un » figé.
#
# ⛔ TOUJOURS --disable_caching. ⛔ ON NE REND QUE LES SHORTS.
#
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_1.py Chiffre2CpPortrait \
#                       -o eleveai-maths-cp-chiffre-2-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_1.py Chiffre2CpPortraitGaucher \
#                       -o eleveai-maths-cp-chiffre-2-gaucher-portrait --media_dir manim/scripts/cp/media

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
    PORTES_MATHS,
    Portrait,
    angle_main,
    chemin_bezier,
    page_de_fin,
    page_de_garde,
    poser_stylo,
    stylo_neuf,
    verifier,
)

# ─── Le chemin du « 1 » ───────────────────────────────────────────────────────
# ⭐ DEUX TRAITS DROITS, ET C'EST TOUT — le seul chiffre sans la moindre courbe.
# La petite attaque oblique n'est pas un ornement : sans elle, le « 1 » devient
# une barre verticale qu'un enfant confond avec un « l » minuscule.
# ⚠️ On monte AVANT de descendre. Un « 1 » tracé de haut en bas se lit pareil,
# mais il perd son attaque, et c'est elle qui l'attache à la ligne d'écriture.
DEPART = np.array([-0.42, 1.50, 0])
COURBES = [
    # 1 — la petite boucle du haut, vers la droite
    ((-0.30, 2.02), (0.44, 1.98), (0.40, 1.42)),
    # 2 — la descente en biais jusqu'à la ligne
    ((0.36, 1.00), (-0.20, 0.60), (-0.44, 0.00)),
]
# ⚠️ Le trait du bas est une LIGNE, pas une courbe : c'est ce qui donne au « 2 »
# son assise. Tracé arrondi, il ressemble à un « Z » manuscrit.
BASE = np.array([0.46, 0.00, 0])


def chemin_2(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    """La boucle, la descente en biais, puis le trait droit du bas."""
    p = chemin_bezier(DEPART, COURBES, stroke_width, color)
    p.add_line_to(BASE)
    return p


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


# ─── Les cinq groupes de DEUX ─────────────────────────────────────────────────
# ⭐ CINQ CHOSES DIFFÉRENTES, DEUX DE CHAQUE. Comme pour le « 1 », c'est la
# variété qui enseigne que le nombre ne dépend pas de l'objet compté.
def _paire(faire, ecart=0.62):
    """Deux exemplaires côte à côte — le geste commun aux cinq dessins."""
    g = VGroup(faire(), faire())
    g[0].shift(LEFT * ecart)
    g[1].shift(RIGHT * ecart)
    return g


def yeux_dessine() -> VGroup:
    def oeil():
        blanc = Ellipse(width=0.56, height=0.34, stroke_color=WHITE, stroke_width=5)
        blanc.set_fill(opacity=0)
        iris = Circle(radius=0.11, stroke_color=BLEU_CALCUL, stroke_width=4)
        iris.set_fill(opacity=0)
        pupille = Dot(ORIGIN, radius=0.045)
        return VGroup(blanc, iris, pupille)
    return _paire(oeil, 0.40)


def mains_dessine() -> VGroup:
    def main():
        paume = RoundedRectangle(width=0.40, height=0.42, corner_radius=0.12,
                                 stroke_color=ORANGE_RETENUE, stroke_width=5)
        paume.set_fill(opacity=0)
        doigts = VGroup(
            *[Line(np.array([x, 0.20, 0]), np.array([x, 0.56, 0]),
                   stroke_color=ORANGE_RETENUE, stroke_width=4)
              for x in (-0.13, 0.0, 0.13)]
        )
        pouce = Line(np.array([-0.20, 0.0, 0]), np.array([-0.42, 0.16, 0]),
                     stroke_color=ORANGE_RETENUE, stroke_width=4)
        return VGroup(paume, doigts, pouce)
    return _paire(main, 0.46)


def ailes_dessine() -> VGroup:
    def aile(sens=1):
        return ArcBetweenPoints(
            np.array([0, 0, 0]), np.array([sens * 0.62, 0.44, 0]),
            angle=sens * 1.2, stroke_color=BLEU_CALCUL, stroke_width=5,
        )
    corps = Ellipse(width=0.20, height=0.46, stroke_color=BLEU_CALCUL, stroke_width=4)
    corps.set_fill(opacity=0)
    return VGroup(aile(-1), aile(1), corps)


def roues_dessine() -> VGroup:
    def roue():
        jante = Circle(radius=0.30, stroke_color=WHITE, stroke_width=5)
        jante.set_fill(opacity=0)
        rayons = VGroup(
            *[Line(np.array([0.28 * np.cos(a), 0.28 * np.sin(a), 0]),
                   np.array([-0.28 * np.cos(a), -0.28 * np.sin(a), 0]),
                   stroke_color=GREY_B, stroke_width=2)
              for a in (0, PI / 3, 2 * PI / 3)]
        )
        return VGroup(jante, rayons)
    return _paire(roue, 0.40)


def chaussures_dessine() -> VGroup:
    def chaussure():
        semelle = Polygon(
            np.array([-0.30, -0.16, 0]), np.array([0.32, -0.16, 0]),
            np.array([0.30, 0.04, 0]), np.array([-0.10, 0.06, 0]),
            np.array([-0.24, 0.30, 0]), np.array([-0.32, 0.28, 0]),
            stroke_color=ROUGE_ERREUR, stroke_width=5,
        )
        semelle.set_fill(opacity=0)
        lacet = Line(np.array([-0.26, 0.16, 0]), np.array([-0.14, 0.10, 0]),
                     stroke_color=ROUGE_ERREUR, stroke_width=3)
        return VGroup(semelle, lacet)
    return _paire(chaussure, 0.44)


# ─── La voix ──────────────────────────────────────────────────────────────────
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-chiffre-2"
DUREE = {
    "00-aujourdhui": 4.08, "01-ecoute": 3.10, "02-regarde": 3.09, "03-depart": 10.82,
    "04-encore": 2.92, "05-combien": 2.79, "06-yeux": 1.62, "07-mains": 1.50,
    "08-ailes": 1.70, "09-roues": 1.52, "10-chaussures": 2.07, "10-pareil": 4.52,
    "11-relance": 3.26, "12-va-sur": 3.16, "14-bientot": 1.71,
}
OBJETS = [
    ("deux yeux", yeux_dessine),
    ("deux mains", mains_dessine),
    ("deux ailes", ailes_dessine),
    ("deux roues", roues_dessine),
    ("deux chaussures", chaussures_dessine),
]
CLIPS = ["06-yeux", "07-mains", "08-ailes", "09-roues", "10-chaussures"]


class _Chiffre2Base(Scene):
    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE, sinon les sons sautent sans un mot."""
        self.add_sound(str(VOIX / f"{nom}.wav"))
        return DUREE[nom]

    def construct(self):
        son = Text("2", font_size=150, color=JAUNE_TITRE)
        titre = Text("le chiffre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        garde, garde_main = page_de_garde(
            self, "2", chemin_2(stroke_width=12), MascotteMargouillat(),
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
        chiffre = chemin_2(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, chiffre).move_to(ORIGIN).shift(DOWN * 0.3)

        modele = chemin_2(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(chiffre)
        imprime = Text(
            "2", font_size=130 if not self.vertical else 110, color=JAUNE_TITRE
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
            trace = chemin_2(stroke_width=14 if not self.vertical else 16)
            trace.match_points(chiffre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime), FadeOut(trace))

        # ── UN, ÇA VEUT DIRE COMBIEN ? ──────────────────────────────────────
        d = self.dire("05-combien")
        if self.vertical:
            question = VGroup(
                Text("deux,", font_size=34, color=BLEU_CALCUL),
                Text("c'est combien ?", font_size=34, color=BLEU_CALCUL),
            ).arrange(DOWN, buff=0.18)
        else:
            question = Text("deux, c'est combien ?", font_size=52, color=BLEU_CALCUL)
        for m in (question if self.vertical else [question]):
            verifier(m, "la question")
        question.to_edge(UP, buff=1.2 if self.vertical else 0.9)
        self.play(FadeIn(question, shift=DOWN * 0.3))
        self.wait(max(0.3, d - 1.0))

        # ⭐ Le même gabarit que la liste de mots des lettres : un objet par
        # ligne, son dessin à côté, et le zoom qui met en avant celui qu'on dit.
        # ⛔ PLUS PETIT QUE POUR LE « 1 », ET C EST LE VERIFICATEUR QUI L A DIT.
        # « deux chaussures » et « trois poissons » sont plus longs que « une
        # maison » : le bloc mesurait 4,19 pour 3,90 utiles. Chaque chiffre
        # amene ses propres mots, donc ses propres reglages.
        echelle = 0.52 if not self.vertical else 0.36
        lignes_obj = VGroup()
        for texte, faire in OBJETS:
            t = Text(texte, font_size=42 if not self.vertical else 29)
            # ⭐ LE « un »/« une » EN JAUNE, pas l'objet : c'est le nombre qu'on
            # apprend, et il est le seul mot commun aux cinq lignes.
            # ⛔ LA LONGUEUR SE CALCULE. Écrit en dur (3), le jaune mordait sur
            # la PREMIÈRE LETTRE de l'objet : « un s​oleil », « un b​allon ».
            # ⚠️ Manim n'indexe pas les espaces : « un soleil » a l'objet dès
            # l'indice 2, « une pomme » dès l'indice 3.
            article = texte.split()[0]
            t[0:len(article)].set_color(JAUNE_TITRE)
            lignes_obj.add(VGroup(t, faire().scale(echelle)).arrange(RIGHT, buff=0.45))
        lignes_obj.arrange(DOWN, buff=0.32, aligned_edge=LEFT)
        bloc = lignes_obj.move_to(ORIGIN).shift(DOWN * 0.5)
        bloc.scale(0.95 if not self.vertical else 0.86)
        verifier(bloc, "bloc des cinq objets")

        for ligne, clip in zip(lignes_obj, CLIPS):
            duree = self.dire(clip)
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.20), run_time=0.35)
            self.wait(0.35)
            self.play(ligne.animate.scale(1 / 1.20), run_time=0.3)
            self.wait(max(0.15, duree - 1.35))
        dp = self.dire("10-pareil")
        self.wait(dp)

        # ── LA RELANCE ──────────────────────────────────────────────────────
        self.play(FadeOut(question), FadeOut(bloc))
        if self.vertical:
            relance = VGroup(
                Text("Cherche une chose", font_size=28, color=VERT_OK),
                Text("dont il y en a", font_size=28, color=VERT_OK),
                Text("2", font_size=90, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.22)
        else:
            relance = VGroup(
                Text("Cherche une chose dont il y en a", font_size=48, color=VERT_OK),
                Text("2", font_size=120, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.35)
        for m in relance:
            verifier(m, "relance du un")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.06), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class Chiffre2Cp(_Chiffre2Base):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class Chiffre2CpGaucher(_Chiffre2Base):
    gaucher = True


class Chiffre2CpPortrait(Portrait, _Chiffre2Base):
    """9:16, droitier — LE format qui est vu."""


class Chiffre2CpPortraitGaucher(Portrait, _Chiffre2Base):
    gaucher = True
