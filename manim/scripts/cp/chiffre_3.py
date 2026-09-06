# Écriture du chiffre « 3 » — CP
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
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_1.py Chiffre3CpPortrait \
#                       -o eleveai-maths-cp-chiffre-3-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_1.py Chiffre3CpPortraitGaucher \
#                       -o eleveai-maths-cp-chiffre-3-gaucher-portrait --media_dir manim/scripts/cp/media

import sys
import wave
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
DEPART = np.array([-0.40, 1.54, 0])
COURBES = [
    # 1 — la première boucle, vers la droite
    ((-0.24, 2.04), (0.46, 1.98), (0.36, 1.40)),
    # 2 — on revient au milieu
    ((0.30, 1.14), (0.06, 1.02), (-0.06, 1.00)),
    # 3 — la seconde boucle, plus grande
    ((0.14, 0.98), (0.48, 0.84), (0.40, 0.42)),
    # 4 — et on remonte fermer
    ((0.32, 0.00), (-0.28, -0.06), (-0.46, 0.30)),
]


def chemin_3(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    """Deux boucles qui se rejoignent au milieu — jamais fermées à gauche."""
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


# ─── Les cinq groupes de TROIS ────────────────────────────────────────────────
# ⭐ CINQ CHOSES DIFFÉRENTES, TROIS DE CHAQUE.
# ⚠️ Trois objets alignés prennent plus de large que deux : l'écart se resserre,
# sinon le bloc déborde du cadre 9:16 et `verifier()` arrête le rendu.
def _trio(faire, ecart=0.50):
    g = VGroup(faire(), faire(), faire())
    g[0].shift(LEFT * ecart)
    g[2].shift(RIGHT * ecart)
    return g


def roues_dessine() -> VGroup:
    def roue():
        jante = Circle(radius=0.22, stroke_color=WHITE, stroke_width=4)
        jante.set_fill(opacity=0)
        rayons = VGroup(
            *[Line(np.array([0.20 * np.cos(a), 0.20 * np.sin(a), 0]),
                   np.array([-0.20 * np.cos(a), -0.20 * np.sin(a), 0]),
                   stroke_color=GREY_B, stroke_width=2)
              for a in (0, PI / 3, 2 * PI / 3)]
        )
        return VGroup(jante, rayons)
    return _trio(roue, 0.52)


def pommes_dessine() -> VGroup:
    def pomme():
        fruit = Circle(radius=0.22, stroke_color=ROUGE_ERREUR, stroke_width=4)
        fruit.set_fill(opacity=0)
        queue = Line(np.array([0.01, 0.21, 0]), np.array([0.04, 0.40, 0]),
                     stroke_color=VERT_OK, stroke_width=3)
        return VGroup(fruit, queue)
    return _trio(pomme, 0.52)


def bougies_dessine() -> VGroup:
    def bougie():
        corps = Rectangle(width=0.18, height=0.52, stroke_color=JAUNE_TITRE,
                          stroke_width=4)
        corps.set_fill(opacity=0)
        meche = Line(np.array([0, 0.26, 0]), np.array([0, 0.36, 0]),
                     stroke_color=GREY_B, stroke_width=2)
        flamme = Ellipse(width=0.14, height=0.24, stroke_color=ORANGE_RETENUE,
                         stroke_width=3)
        flamme.set_fill(opacity=0).shift(UP * 0.48)
        return VGroup(corps, meche, flamme)
    return _trio(bougie, 0.46)


def etoiles_dessine() -> VGroup:
    def etoile():
        r, p = 0.26, 0.11
        pts = []
        for k in range(10):
            a = PI / 2 + k * PI / 5
            d = r if k % 2 == 0 else p
            pts.append(np.array([d * np.cos(a), d * np.sin(a), 0]))
        e = Polygon(*pts, stroke_color=JAUNE_TITRE, stroke_width=4)
        return e.set_fill(opacity=0)
    return _trio(etoile, 0.54)


def poissons_dessine() -> VGroup:
    def poisson():
        corps = Ellipse(width=0.52, height=0.26, stroke_color=BLEU_CALCUL,
                        stroke_width=4)
        corps.set_fill(opacity=0)
        queue = Polygon(
            np.array([-0.26, 0, 0]), np.array([-0.44, 0.16, 0]),
            np.array([-0.44, -0.16, 0]),
            stroke_color=BLEU_CALCUL, stroke_width=3,
        )
        queue.set_fill(opacity=0)
        oeil = Dot(np.array([0.16, 0.05, 0]), radius=0.035)
        return VGroup(corps, queue, oeil)
    return _trio(poisson, 0.58)


# ─── La voix ──────────────────────────────────────────────────────────────────
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-chiffre-3"
DUREE = {
    "00-aujourdhui": 4.16, "01-ecoute": 3.19, "02-regarde": 3.18, "03-depart": 11.35,
    "04-encore": 2.92, "05-combien": 2.90, "06-yeux": 1.59, "07-mains": 1.80,
    "08-ailes": 1.84, "09-roues": 2.06, "10-chaussures": 1.95, "10-pareil": 4.61,
    "11-relance": 3.36, "12-va-sur": 3.16, "14-bientot": 1.71,
}
OBJETS = [
    ("trois roues", roues_dessine),
    ("trois pommes", pommes_dessine),
    ("trois bougies", bougies_dessine),
    ("trois étoiles", etoiles_dessine),
    ("trois poissons", poissons_dessine),
]
CLIPS = ["06-yeux", "07-mains", "08-ailes", "09-roues", "10-chaussures"]


class _Chiffre3Base(Scene):
    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE, sinon les sons sautent sans un mot."""
        chemin = VOIX / f"{nom}.wav"
        self.add_sound(str(chemin))
        # ⭐⭐ LA DURÉE SE LIT DANS LE FICHIER, elle ne se recopie plus à la main
        # dans `DUREE`. Une table écrite à la main se désynchronise dès qu'on
        # régénère une voix — et le symptôme n'est pas une erreur, c'est une
        # phrase coupée en fin de vidéo, que personne ne revérifie.
        # ⚠️ `DUREE` reste dans le fichier : c'est la trace de ce qui a été dit,
        # utile pour relire le script sans ouvrir les WAV. Mais elle ne commande
        # plus rien.
        with wave.open(str(chemin), "rb") as w:
            return w.getnframes() / float(w.getframerate())

    def construct(self):
        son = Text("3", font_size=150, color=JAUNE_TITRE)
        titre = Text("le chiffre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        garde, garde_main = page_de_garde(
            self, "3", chemin_3(stroke_width=12), MascotteMargouillat(),
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
        chiffre = chemin_3(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, chiffre).move_to(ORIGIN).shift(DOWN * 0.3)

        modele = chemin_3(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(chiffre)
        imprime = Text(
            "3", font_size=130 if not self.vertical else 110, color=JAUNE_TITRE
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
            trace = chemin_3(stroke_width=14 if not self.vertical else 16)
            trace.match_points(chiffre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime), FadeOut(trace))

        # ── UN, ÇA VEUT DIRE COMBIEN ? ──────────────────────────────────────
        d = self.dire("05-combien")
        if self.vertical:
            question = VGroup(
                Text("trois,", font_size=34, color=BLEU_CALCUL),
                Text("c'est combien ?", font_size=34, color=BLEU_CALCUL),
            ).arrange(DOWN, buff=0.18)
        else:
            question = Text("trois, c'est combien ?", font_size=52, color=BLEU_CALCUL)
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
                Text("3", font_size=90, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.22)
        else:
            relance = VGroup(
                Text("Cherche une chose dont il y en a", font_size=48, color=VERT_OK),
                Text("3", font_size=120, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.35)
        for m in relance:
            verifier(m, "relance du un")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.06), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class Chiffre3Cp(_Chiffre3Base):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class Chiffre3CpGaucher(_Chiffre3Base):
    gaucher = True


class Chiffre3CpPortrait(Portrait, _Chiffre3Base):
    """9:16, droitier — LE format qui est vu."""


class Chiffre3CpPortraitGaucher(Portrait, _Chiffre3Base):
    gaucher = True
