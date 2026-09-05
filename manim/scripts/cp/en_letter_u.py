# Writing the letter « u » in cursive — English version
#
# ⭐⭐ POURQUOI UNE VERSION ANGLAISE (05/09/2026).
# Frédéric : « plutôt que de faire plein de choses, on peut se concentrer cette
# semaine sur les vidéos d'écriture partout dans le monde ». L'idée tient parce
# que **le tracé ne dépend pas de la langue** : la géométrie, le stylo, la
# réglure, le rendu, la vignette — tout est déjà écrit. Ce qui change tient en
# une voix et une vingtaine de chaînes de texte.
#
# ⭐ ET LE CRÉNEAU EST MONDIAL. Ce qui a été découvert cette semaine — personne
# ne fait de vidéos d'écriture POUR LES GAUCHERS — n'a rien de français. Les
# cinq paires publiées donnent au gaucher 3,4× à 20× les vues du droitier.
#
# ⭐ C'EST LE « u » ET PAS LE « a », PARCE QUE C'EST LUI QUI MARCHE.
# Frédéric : « on fait un test sur les vidéos les plus regardées pour voir ».
# Le « u » gaucher est le sommet de la chaîne (345 vues). On reproduit ce qui
# fonctionne, on ne repart pas de zéro.
#
# ⛔⛔ LE PIÈGE À CONNAITRE AVANT D'EN FAIRE VINGT-SIX : LA CURSIVE N'EST PAS LA
# MÊME PARTOUT. Espagne et Amérique latine sont très proches du modèle français ;
# les États-Unis (D'Nealian, Zaner-Bloser) et le Royaume-Uni en diffèrent, et
# l'Allemagne franchement. Les VOYELLES passent à peu près partout — c'est
# pourquoi ce test en est une. ⛔ Le `r`, le `s` et le `z` américains n'ont PAS
# notre forme : les publier tels quels enseignerait une lettre fausse.
#
# ⚠️ La liste de mots emploie le format « le son DANS le mot », inventé pour le
# français : en anglais aussi, `u` en initiale est rare, et « sun, cup, bus,
# duck, drum » sont les mots de phonics que tout le monde connait.
#
# ⛔ TOUJOURS --disable_caching. ⛔ ON NE REND QUE LES SHORTS.
#
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/en_letter_u.py LetterUPortraitLeft \
#                       -o eleveai-english-cursive-letter-u-left-portrait --media_dir manim/scripts/cp/media
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/en_letter_u.py LetterUPortraitRight \
#                       -o eleveai-english-cursive-letter-u-right-portrait --media_dir manim/scripts/cp/media

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
    Portrait,
    angle_main,
    chemin_bezier,
    ecran_relance,
    page_de_fin,
    page_de_garde,
    poser_stylo,
    reglure,
    stylo_neuf,
    verifier,
)

# ─── Le chemin du « u » ───────────────────────────────────────────────────────
# ⭐ DEUX PONTS : c'est le premier geste RÉPÉTÉ que l'enfant rencontre, et c'est
# ce qui le prépare au « n », au « m », au « i » double. Sommets pointus, creux
# ARRONDIS — l'inverse ferait un « v » doublé.
#
# ⭐ Deux essais au rendu avant d'écrire du Manim : au premier, les deux ponts
# étaient trop serrés et la lettre se lisait « m ». Élargie, et les creux
# adoucis en amenant la courbe à l'horizontale au fond de la vallée.
DEPART = np.array([-0.82, 0.00, 0])
COURBES = [
    # 1 — le premier pont : la montée oblique
    ((-0.70, 0.34), (-0.52, 0.68), (-0.34, 0.95)),
    # 2 — on redescend, et le creux est ROND (la courbe arrive à l'horizontale)
    ((-0.28, 0.52), (-0.26, 0.04), (-0.02, 0.02)),
    # 3 — le second pont
    ((0.14, 0.02), (0.22, 0.50), (0.28, 0.95)),
    # 4 — la seconde descente
    ((0.34, 0.56), (0.34, 0.10), (0.48, 0.04)),
    # 5 — la sortie, qui amorce la lettre suivante
    ((0.60, 0.00), (0.70, 0.12), (0.86, 0.30)),
]

# ⭐ Cinq mots où l'on ENTEND [y], et où on VOIT le `u`.
# ⛔ Écartés : tous les mots en « ou » (loup, jour) — « ou » se lit [u], pas
# [y] ; et tous les « un/um » (lundi, parfum) — nasale [œ̃]. La lettre y est,
# le son n'y est pas : c'est le même piège que « ours » pour le « o ».
# Chaque couple dit le mot ET la position du `u` dans ce mot.
WORDS = [("lune", 1), ("mur", 1), ("tortue", 4), ("plume", 2), ("jupe", 1)]


def chemin_u(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── The five drawings ────────────────────────────────────────────────────────
# ⚠️ Même leçon qu'en français : à cette échelle une SILHOUETTE FERMÉE se lit,
# un faisceau de traits non.
def sun_dessine() -> VGroup:
    disque = Circle(radius=0.32, stroke_color=JAUNE_TITRE, stroke_width=5)
    disque.set_fill(opacity=0)
    rayons = VGroup(
        *[Line(np.array([0.44 * np.cos(a), 0.44 * np.sin(a), 0]),
               np.array([0.64 * np.cos(a), 0.64 * np.sin(a), 0]),
               stroke_color=JAUNE_TITRE, stroke_width=4)
          for a in np.arange(0, TAU, TAU / 8)]
    )
    return VGroup(disque, rayons)


def cup_dessine() -> VGroup:
    """A mug: the body, the handle, the steam."""
    corps = Polygon(
        np.array([-0.30, 0.34, 0]), np.array([0.30, 0.34, 0]),
        np.array([0.24, -0.36, 0]), np.array([-0.24, -0.36, 0]),
        stroke_color=WHITE, stroke_width=5,
    )
    corps.set_fill(opacity=0)
    anse = ArcBetweenPoints(
        np.array([0.30, 0.18, 0]), np.array([0.30, -0.14, 0]),
        angle=-2.2, stroke_color=WHITE, stroke_width=4,
    )
    vapeur = ArcBetweenPoints(
        np.array([-0.06, 0.44, 0]), np.array([0.08, 0.74, 0]),
        angle=1.4, stroke_color=GREY_B, stroke_width=3,
    )
    return VGroup(corps, anse, vapeur)


def bus_dessine() -> VGroup:
    """A bus seen from the side: body, windows, wheels."""
    caisse = RoundedRectangle(width=1.24, height=0.66, corner_radius=0.10,
                              stroke_color=ORANGE_RETENUE, stroke_width=5)
    caisse.set_fill(opacity=0).shift(UP * 0.08)
    fenetres = VGroup(
        *[Rectangle(width=0.24, height=0.22, stroke_color=BLEU_CALCUL,
                    stroke_width=3).set_fill(opacity=0)
          .shift(np.array([x, 0.22, 0])) for x in (-0.38, -0.02, 0.34)]
    )
    roues = VGroup(
        Circle(radius=0.14, stroke_color=WHITE, stroke_width=4)
        .set_fill(opacity=0).shift(np.array([-0.38, -0.32, 0])),
        Circle(radius=0.14, stroke_color=WHITE, stroke_width=4)
        .set_fill(opacity=0).shift(np.array([0.38, -0.32, 0])),
    )
    return VGroup(caisse, fenetres, roues)


def duck_dessine() -> VGroup:
    """A duck: body, head, beak."""
    corps = Ellipse(width=0.86, height=0.46, stroke_color=JAUNE_TITRE, stroke_width=5)
    corps.set_fill(opacity=0).shift(np.array([-0.08, -0.22, 0]))
    tete = Circle(radius=0.20, stroke_color=JAUNE_TITRE, stroke_width=5)
    tete.set_fill(opacity=0).shift(np.array([0.30, 0.28, 0]))
    cou = Line(np.array([0.18, -0.06, 0]), np.array([0.28, 0.14, 0]),
               stroke_color=JAUNE_TITRE, stroke_width=5)
    bec = Polygon(np.array([0.46, 0.32, 0]), np.array([0.70, 0.24, 0]),
                  np.array([0.46, 0.18, 0]),
                  stroke_color=ORANGE_RETENUE, stroke_width=4).set_fill(opacity=0)
    oeil = Dot(np.array([0.34, 0.34, 0]), radius=0.04)
    eau = Line(np.array([-0.62, -0.44, 0]), np.array([0.50, -0.44, 0]),
               stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(eau, corps, cou, tete, bec, oeil)


def drum_dessine() -> VGroup:
    """A drum: the shell, the skin, two sticks."""
    corps = Rectangle(width=0.86, height=0.52, stroke_color=ROUGE_ERREUR,
                      stroke_width=5)
    corps.set_fill(opacity=0)
    peau = Ellipse(width=0.86, height=0.22, stroke_color=WHITE, stroke_width=4)
    peau.set_fill(opacity=0).shift(UP * 0.26)
    zigzag = VGroup(
        *[Line(np.array([-0.43 + i * 0.29, 0.26, 0]),
               np.array([-0.29 + i * 0.29, -0.26, 0]),
               stroke_color=WHITE, stroke_width=3) for i in range(3)]
    )
    baguettes = VGroup(
        Line(np.array([-0.30, 0.46, 0]), np.array([-0.62, 0.82, 0]),
             stroke_color=ORANGE_RETENUE, stroke_width=4),
        Line(np.array([0.30, 0.46, 0]), np.array([0.62, 0.82, 0]),
             stroke_color=ORANGE_RETENUE, stroke_width=4),
    )
    return VGroup(corps, zigzag, peau, baguettes)


# ─── La voix ──────────────────────────────────────────────────────────────────
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "en-letter-u"
DUREE = {
    "00-today": 3.99, "01-listen": 3.56, "02-watch": 3.11, "03-start": 8.34,
    "04-again": 3.57, "05-find": 4.02, "05-u-as-in": 2.14, "06-sun": 1.53,
    "07-cup": 1.59, "08-bus": 1.57, "09-duck": 1.56, "10-drum": 1.48,
    "10-same": 5.09, "11-again": 3.39, "12-go-to": 3.18, "14-bye": 2.00,
}
WORDS = [("sun", 1), ("cup", 1), ("bus", 1), ("duck", 1), ("drum", 2)]
CLIPS_MOTS = ["06-sun", "07-cup", "08-bus", "09-duck", "10-drum"]


class _LetterUBase(Scene):
    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE, sinon les sons sautent sans un mot."""
        self.add_sound(str(VOIX / f"{nom}.wav"))
        return DUREE[nom]

    def construct(self):
        son = Text("u", font_size=150, color=JAUNE_TITRE)
        titre = Text("the letter", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        garde, garde_main = page_de_garde(
            self, "u", chemin_u(stroke_width=12), MascotteMargouillat(),
            notion="Cursive letters",
            classe="Handwriting · ages 5-7",
            mains=("For right-handers", "For left-handers"),
        )

        self.play(
            FadeOut(garde), FadeOut(garde_main),
            FadeIn(titre), FadeIn(son), FadeIn(margo),
            run_time=0.25,
        )
        d0 = self.dire("00-today")
        self.wait(d0)
        d = self.dire("01-listen")
        self.play(
            Transform(titre, Text("the sound", font_size=44, color=BLEU_CALCUL).move_to(titre)),
            Indicate(son, scale_factor=1.25, color=JAUNE_TITRE),
        )
        self.wait(d - 1.0)
        self.play(
            FadeOut(titre),
            FadeOut(margo, shift=RIGHT * 0.4),
            son.animate.scale(0.40).to_corner(UL, buff=0.55),
        )
        self.wait(0.4)

        # ── LE GESTE ────────────────────────────────────────────────────────
        lignes = reglure(3)
        lettre = chemin_u(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        modele = chemin_u(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "u", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
        ).move_to(modele)

        d = self.dire("02-watch")
        self.play(Create(lignes), run_time=0.8)
        self.play(FadeIn(imprime, scale=0.85), run_time=0.3)
        self.play(Transform(imprime, modele), run_time=0.8)
        point = Dot(lettre.get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2), run_time=0.5)
        self.wait(max(0.3, d - 2.4))

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
        a_main = angle_main(self.gaucher)
        stylo.add_updater(
            lambda m: poser_stylo(m, modele_stylo, lettre, avance.get_value(), a_main)
        )

        self.remove(lettre)
        self.add(trace, stylo)
        d = self.dire("03-start")
        self.play(avance.animate.set_value(1.0), run_time=d - 0.4, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()
        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        self.dire("04-again")
        for duree in (2.0, 1.2):
            self.remove(trace)
            trace = chemin_u(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── « u » COMME DANS… ───────────────────────────────────────────────
        # ⭐ « COMME DANS », ET NON « COMME » : le mot ne commence pas par la
        # lettre, et la formule doit le dire. C'est la nuance qui fait la leçon.
        self.play(FadeOut(trace))

        # ⛔ LE COUPABLE DU DÉBORDEMENT, ET CE N'ÉTAIT PAS LA LISTE DE MOTS.
        # « u comme dans… » fait quatre signes de plus que « a comme… », et je
        # ne lui avais pas donné de taille pour le portrait : à 50, c'est LUI
        # qui portait les 4,48 de large, pas les cinq lignes en dessous. J'ai
        # d'abord rétréci les mots pour rien — la mesure du vérificateur n'avait
        # pas bougé d'un centième, et c'est ce qui l'a dit.
        titre_mots = Text("u as in…", font_size=50 if not self.vertical else 40)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            sun_dessine(), cup_dessine(), bus_dessine(),
            duck_dessine(), drum_dessine(),
        ]
        # ⛔ PLUS PETIT QUE POUR a/i/o, ET C'EST LE VÉRIFICATEUR QUI L'A DIT.
        # Avec les réglages des trois premières lettres, le bloc mesurait 4,48
        # de large pour 3,90 utiles en portrait : `verifier()` a ARRÊTÉ le rendu
        # au lieu de tout écraser en silence, comme l'ancien filet l'aurait fait.
        # La cause : « tortue » est plus long que « arbre » ou « olive », et le
        # format « dans le mot » amène forcément des mots plus longs.
        echelle = 0.52 if not self.vertical else 0.40
        lignes_mots = VGroup()
        for (mot, pos), dessin in zip(WORDS, dessins):
            t = Text(mot, font_size=42 if not self.vertical else 34)
            # ⭐ LE JAUNE SE POSE À LA PLACE DU `u`, PAS SUR LA PREMIÈRE LETTRE.
            # C'est tout l'objet de ce format : l'œil doit aller CHERCHER la
            # lettre dans le mot, comme l'oreille va chercher le son.
            t[pos].set_color(JAUNE_TITRE)
            lignes_mots.add(VGroup(t, dessin.scale(echelle)).arrange(RIGHT, buff=0.45))

        lignes_mots.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        bloc = VGroup(titre_mots, lignes_mots).arrange(DOWN, buff=0.5)
        bloc.move_to(ORIGIN).scale(0.95 if not self.vertical else 0.8)
        verifier(bloc, "bloc des cinq mots")

        dc = self.dire("05-find")
        self.wait(dc)
        d = self.dire("05-u-as-in")
        self.play(FadeIn(titre_mots, shift=DOWN * 0.3))
        self.wait(max(0.2, d - 1.0))
        for ligne, clip in zip(lignes_mots, CLIPS_MOTS):
            duree_mot = self.dire(clip)
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.22), run_time=0.35)
            self.wait(0.45)
            self.play(ligne.animate.scale(1 / 1.22), run_time=0.3)
            self.wait(max(0.15, duree_mot - 1.45))
        dp = self.dire("10-same")
        self.wait(dp)

        # ── LA RELANCE ──────────────────────────────────────────────────────
        self.play(FadeOut(bloc))
        relance = ecran_relance(
            self.vertical, "u", dans_le_mot=True,
            consigne=("Find a word", "with the sound", "Find a word with the sound"),
        )
        d = self.dire("11-again")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-go-to", clip_bientot="14-bye",
                    adieu="See you soon!", adieu_taille=36)


class LetterURight(_LetterUBase):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class LetterULeft(_LetterUBase):
    gaucher = True


class LetterUPortraitRight(Portrait, _LetterUBase):
    """9:16, droitier — LE format qui est vu."""


class LetterUPortraitLeft(Portrait, _LetterUBase):
    gaucher = True
