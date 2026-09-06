# Création et écriture de la lettre « y » — CP
#
# ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, notion `grapheme_phoneme`.
#
# ⭐⭐ LE « y » EST UNE VOYELLE — la sixième. L'alphabet français en compte six :
# a, e, i, o, u, y. Frédéric, 04/09 : « le y est-ce une voyelle ou consonne ? ».
# Officiellement voyelle, mais il joue les deux rôles :
#   — VOYELLE quand il dit [i] : stylo, pyjama, cygne, pyramide, bicyclette ;
#   — semi-consonne quand il dit [j] : yaourt, yeux.
# Au CP on enseigne le premier. ⛔ « yaourt » et « yeux » sont donc écartés,
# exactement comme « ours » pour le « o » : la lettre y est, le son n'y est pas.
#
# ⭐ CE QUE LE « y » APPORTE ET QU'AUCUNE AUTRE VOYELLE N'AVAIT : IL DESCEND
# SOUS LA LIGNE. C'est la première fois que le crayon quitte la bande d'écriture
# par le bas, et il y fait une boucle avant de remonter. Le geste qui prépare le
# « j », le « g », le « p ».
#
# ⛔ TOUJOURS --disable_caching. ⛔ ON NE REND QUE LES SHORTS.

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

# ─── Le chemin du « y » ───────────────────────────────────────────────────────
# ⭐ Deux ponts comme le « u », puis LA JAMBE : elle descend sous la ligne de
# base, tourne à gauche en boucle, et remonte en croisant. C'est la première
# lettre de la série qui sort de la bande d'écriture par le bas.
DEPART = np.array([-0.50, 0.00, 0])
COURBES = [
    # 1 — la montée, comme le u
    ((-0.36, 0.32), (-0.20, 0.64), (-0.02, 0.95)),
    # 2 — la descente, creux rond
    ((0.04, 0.55), (0.06, 0.06), (0.26, 0.02)),
    # 3 — le second pont
    ((0.40, 0.06), (0.46, 0.55), (0.50, 0.95)),
    # 4 — LA JAMBE : sous la ligne de base
    ((0.54, 0.40), (0.50, -0.30), (0.30, -0.62)),
    # 5 — la boucle sous la ligne, elle croise le trait en remontant
    ((0.00, -0.85), (-0.38, -0.50), (-0.10, -0.10)),
    # 6 — la sortie
    ((0.10, 0.02), (0.30, 0.06), (0.56, 0.20)),
]

# ⭐ Cinq mots où le `y` DIT [i]. Il est colorié à sa place.
# ⛔ Écartés : « yaourt » et « yeux », où le y se lit [j] — c'est l'autre rôle
# de la lettre, une autre leçon.
MOTS_EN_Y = [("stylo", 2), ("pyjama", 1), ("cygne", 1), ("pyramide", 1),
             ("bicyclette", 3)]


def chemin_y(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def stylo_dessine() -> VGroup:
    """Un stylo incliné : le corps, la pointe."""
    corps = Polygon(
        np.array([-0.34, -0.52, 0]), np.array([0.26, 0.56, 0]),
        np.array([0.44, 0.46, 0]), np.array([-0.16, -0.62, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5,
    )
    corps.set_fill(opacity=0)
    pointe = Polygon(
        np.array([-0.34, -0.52, 0]), np.array([-0.16, -0.62, 0]),
        np.array([-0.30, -0.80, 0]),
        stroke_color=JAUNE_TITRE, stroke_width=4,
    )
    pointe.set_fill(opacity=0)
    anneau = Line(np.array([0.04, 0.18, 0]), np.array([0.22, 0.08, 0]),
                  stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(corps, pointe, anneau)


def pyjama_dessine() -> VGroup:
    """Une veste de pyjama : le col, les manches, les rayures."""
    corps = Polygon(
        np.array([-0.34, 0.44, 0]), np.array([0.34, 0.44, 0]),
        np.array([0.34, -0.54, 0]), np.array([-0.34, -0.54, 0]),
        stroke_color=VERT_OK, stroke_width=5,
    )
    corps.set_fill(opacity=0)
    manches = VGroup(
        Polygon(np.array([-0.34, 0.42, 0]), np.array([-0.68, 0.10, 0]),
                np.array([-0.52, -0.06, 0]), np.array([-0.34, 0.16, 0]),
                stroke_color=VERT_OK, stroke_width=4).set_fill(opacity=0),
        Polygon(np.array([0.34, 0.42, 0]), np.array([0.68, 0.10, 0]),
                np.array([0.52, -0.06, 0]), np.array([0.34, 0.16, 0]),
                stroke_color=VERT_OK, stroke_width=4).set_fill(opacity=0),
    )
    col = Polygon(np.array([-0.14, 0.44, 0]), np.array([0.0, 0.20, 0]),
                  np.array([0.14, 0.44, 0]),
                  stroke_color=VERT_OK, stroke_width=4).set_fill(opacity=0)
    rayures = VGroup(
        *[Line(np.array([-0.32, y, 0]), np.array([0.32, y, 0]),
               stroke_color=VERT_OK, stroke_width=2) for y in (-0.10, -0.32)]
    )
    return VGroup(corps, manches, col, rayures)


def cygne_dessine() -> VGroup:
    """Un cygne : le corps, le long cou en S, le bec."""
    corps = Ellipse(width=0.94, height=0.44, stroke_color=WHITE, stroke_width=5)
    corps.set_fill(opacity=0).shift(np.array([-0.10, -0.34, 0]))
    cou = ArcBetweenPoints(
        np.array([0.22, -0.20, 0]), np.array([0.40, 0.62, 0]),
        angle=-1.5, stroke_color=WHITE, stroke_width=5,
    )
    tete = Circle(radius=0.13, stroke_color=WHITE, stroke_width=4)
    tete.set_fill(opacity=0).shift(np.array([0.40, 0.66, 0]))
    bec = Polygon(np.array([0.50, 0.70, 0]), np.array([0.72, 0.62, 0]),
                  np.array([0.50, 0.58, 0]),
                  stroke_color=ORANGE_RETENUE, stroke_width=4).set_fill(opacity=0)
    aile = ArcBetweenPoints(
        np.array([-0.44, -0.28, 0]), np.array([0.14, -0.30, 0]),
        angle=-1.1, stroke_color=WHITE, stroke_width=3,
    )
    return VGroup(corps, aile, cou, tete, bec)


def pyramide_dessine() -> VGroup:
    """Une pyramide : la face, l'arête, le sable."""
    face = Polygon(
        np.array([0.0, 0.66, 0]), np.array([0.66, -0.44, 0]),
        np.array([-0.66, -0.44, 0]),
        stroke_color=JAUNE_TITRE, stroke_width=5,
    )
    face.set_fill(opacity=0)
    arete = Line(np.array([0.0, 0.66, 0]), np.array([0.10, -0.44, 0]),
                 stroke_color=JAUNE_TITRE, stroke_width=3)
    sable = Line(np.array([-0.84, -0.44, 0]), np.array([0.84, -0.44, 0]),
                 stroke_color=ORANGE_RETENUE, stroke_width=4)
    return VGroup(face, arete, sable)


def bicyclette_dessine() -> VGroup:
    """Un vélo : deux roues, le cadre, le guidon."""
    roues = VGroup(
        Circle(radius=0.32, stroke_color=BLEU_CALCUL, stroke_width=5)
        .set_fill(opacity=0).shift(np.array([-0.54, -0.24, 0])),
        Circle(radius=0.32, stroke_color=BLEU_CALCUL, stroke_width=5)
        .set_fill(opacity=0).shift(np.array([0.54, -0.24, 0])),
    )
    cadre = VGroup(
        Line(np.array([-0.54, -0.24, 0]), np.array([0.54, -0.24, 0]),
             stroke_color=WHITE, stroke_width=4),
        Line(np.array([-0.06, -0.24, 0]), np.array([0.10, 0.30, 0]),
             stroke_color=WHITE, stroke_width=4),
        Line(np.array([-0.54, -0.24, 0]), np.array([0.10, 0.30, 0]),
             stroke_color=WHITE, stroke_width=4),
        Line(np.array([0.10, 0.30, 0]), np.array([0.54, -0.24, 0]),
             stroke_color=WHITE, stroke_width=4),
    )
    tige = Line(np.array([0.54, -0.24, 0]), np.array([0.54, 0.34, 0]),
                stroke_color=WHITE, stroke_width=3)
    guidon = Line(np.array([0.36, 0.34, 0]), np.array([0.70, 0.34, 0]),
                  stroke_color=WHITE, stroke_width=4)
    selle = Line(np.array([-0.02, 0.32, 0]), np.array([0.24, 0.32, 0]),
                 stroke_color=WHITE, stroke_width=5)
    return VGroup(roues, cadre, tige, guidon, selle)


# ─── La voix ──────────────────────────────────────────────────────────────────
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-y"
DUREE = {
    "00-aujourdhui": 3.20, "01-ecoute": 3.51, "02-regarde": 3.02, "03-depart": 11.54,
    "04-encore": 2.92, "05-cherchons": 5.22, "05-y-comme": 1.97, "06-stylo": 1.54,
    "07-pyjama": 1.66, "08-cygne": 1.54, "09-pyramide": 1.77, "10-bicyclette": 1.99,
    "10-pareil": 4.73, "11-relance": 2.54, "12-va-sur": 3.16, "13-tout": 8.14,
    "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-stylo", "07-pyjama", "08-cygne", "09-pyramide", "10-bicyclette"]


class _LettreYBase(Scene):
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
        son = Text("y", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        garde, garde_main = page_de_garde(
            self, "y", chemin_y(stroke_width=12), MascotteMargouillat(),
            # ⭐ Le « y » descend a -0,85 : cale sur 1,4 comme les autres, son
            # corps devenait minuscule et la boucle se repliait dessus.
            hauteur_cursive=2.4,
        )

        self.play(
            FadeOut(garde), FadeOut(garde_main),
            FadeIn(titre), FadeIn(son), FadeIn(margo),
            run_time=0.25,
        )
        d0 = self.dire("00-aujourdhui")
        self.wait(d0)
        d = self.dire("01-ecoute")
        self.play(
            Transform(titre, Text("le son", font_size=44, color=BLEU_CALCUL).move_to(titre)),
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
        lettre = chemin_y(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        modele = chemin_y(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "y", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
        ).move_to(modele)

        d = self.dire("02-regarde")
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
        d = self.dire("03-depart")
        self.play(avance.animate.set_value(1.0), run_time=d - 0.4, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()
        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        self.dire("04-encore")
        for duree in (2.0, 1.2):
            self.remove(trace)
            trace = chemin_y(stroke_width=14 if not self.vertical else 16)
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
        titre_mots = Text("y comme dans…", font_size=50 if not self.vertical else 38)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            stylo_dessine(), pyjama_dessine(), cygne_dessine(),
            pyramide_dessine(), bicyclette_dessine(),
        ]
        # ⛔ PLUS PETIT QUE POUR a/i/o, ET C'EST LE VÉRIFICATEUR QUI L'A DIT.
        # Avec les réglages des trois premières lettres, le bloc mesurait 4,48
        # de large pour 3,90 utiles en portrait : `verifier()` a ARRÊTÉ le rendu
        # au lieu de tout écraser en silence, comme l'ancien filet l'aurait fait.
        # La cause : « tortue » est plus long que « arbre » ou « olive », et le
        # format « dans le mot » amène forcément des mots plus longs.
        echelle = 0.52 if not self.vertical else 0.40
        lignes_mots = VGroup()
        for (mot, pos), dessin in zip(MOTS_EN_Y, dessins):
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

        dc = self.dire("05-cherchons")
        self.wait(dc)
        d = self.dire("05-y-comme")
        self.play(FadeIn(titre_mots, shift=DOWN * 0.3))
        self.wait(max(0.2, d - 1.0))
        for ligne, clip in zip(lignes_mots, CLIPS_MOTS):
            duree_mot = self.dire(clip)
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.22), run_time=0.35)
            self.wait(0.45)
            self.play(ligne.animate.scale(1 / 1.22), run_time=0.3)
            self.wait(max(0.15, duree_mot - 1.45))
        dp = self.dire("10-pareil")
        self.wait(dp)

        # ── LA RELANCE ──────────────────────────────────────────────────────
        self.play(FadeOut(bloc))
        relance = ecran_relance(self.vertical, "y", dans_le_mot=True)
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-va-sur", "13-tout", "14-bientot")


class LettreYCp(_LettreYBase):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class LettreYCpGaucher(_LettreYBase):
    gaucher = True


class LettreYCpPortrait(Portrait, _LettreYBase):
    """9:16, droitier — LE format qui est vu."""


class LettreYCpPortraitGaucher(Portrait, _LettreYBase):
    gaucher = True
