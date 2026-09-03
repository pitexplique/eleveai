# Création et écriture de la lettre « o » — CP
#
# ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, notion `grapheme_phoneme`.
# Micros couvertes : cp_gph_voyelles (le son [o]) et cp_copie_lettre (le tracé).
#
# ⭐ PREMIÈRE LETTRE ÉCRITE SUR `lettre_commune.py` : la réglure, le stylo, la
# page de garde, la relance et la page de fin viennent de là. Ici ne restent que
# le CHEMIN du « o », ses cinq mots, ses cinq dessins et sa chorégraphie.
#
# ⛔ TOUJOURS --disable_caching, et UNE COMMANDE PAR SCÈNE.
#
# paysage droitier  : python -m manim render -qh --disable_caching manim/scripts/cp/lettre_o.py LettreOCp \
#                       -o eleveai-francais-cp-lettre-o-droitier-paysage --media_dir manim/scripts/cp/media
# paysage gaucher   : python -m manim render -qh --disable_caching manim/scripts/cp/lettre_o.py LettreOCpGaucher \
#                       -o eleveai-francais-cp-lettre-o-gaucher-paysage --media_dir manim/scripts/cp/media
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/lettre_o.py LettreOCpPortrait \
#                       -o eleveai-francais-cp-lettre-o-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/lettre_o.py LettreOCpPortraitGaucher \
#                       -o eleveai-francais-cp-lettre-o-gaucher-portrait --media_dir manim/scripts/cp/media

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

# ─── Le chemin du « o » ───────────────────────────────────────────────────────
# ⭐⭐ CE QUI DISTINGUE LE « o » DU « a » : IL SORT PAR LE HAUT.
# Le rond est le même geste (départ en haut à droite, on tourne à gauche, on
# fait le tour) — mais au lieu de descendre une hampe, le crayon REMONTE fermer
# le rond et repart d'une petite boucle à hauteur du sommet. C'est cette sortie
# haute qui permettra d'attacher « on », « ou », « oi » : un « o » qui sortirait
# en bas ne s'accrocherait à rien.
#
# ⭐ Trois essais au rendu avant d'écrire du Manim :
#   1. la boucle fermait à 1,02 et culminait plus haut que le rond → un drapeau
#      planté sur un ballon ;
#   2. lissée, elle faisait encore un éperon — la courbe se retournait trop sec ;
#   3. fermeture ramenée À HAUTEUR DU DÉPART et boucle petite (sommet 0,94).
# ⚠️ La boucle CROISE le rond, et c'est normal : c'est ce croisement qui fait la
# sortie. Ce qu'il ne faut pas, c'est qu'elle dépasse le sommet du rond.
DEPART = np.array([0.02, 0.80, 0])
COURBES = [
    # 1 — par le haut, vers la gauche
    ((-0.20, 1.02), (-0.84, 0.96), (-0.84, 0.44)),
    # 2 — le bas du rond
    ((-0.84, -0.02), (-0.14, -0.04), (0.06, 0.40)),
    # 3 — on FERME, à hauteur du départ
    ((0.16, 0.60), (0.14, 0.74), (0.02, 0.82)),
    # 4 — la petite boucle de sortie, HAUTE et PETITE
    ((-0.08, 0.94), (0.18, 0.94), (0.34, 0.76)),
]

# ⭐ Cinq noms concrets, tous avec la LETTRE « o » ET le SON [o] en initiale.
#
# ⛔⛔ LES DEUX MOTS QU'UN ADULTE PROPOSE D'ABORD SONT LES DEUX À ÉCARTER :
#   — « ours » : « ou » se lit [u], pas [o]. La lettre est là, le son n'y est pas.
#   — « oiseau » : « oi » se lit [wa]. Même piège.
# Ce sont les deux images les plus évidentes pour un CP, et elles enseigneraient
# exactement le contraire de la leçon. Écartés aussi « œuf » (ligature) et
# « oignon » (le « oi » y fait [ɔ], une exception qui n'a rien à faire ici).
MOTS_EN_O = ["orange", "olive", "oreille", "os", "ordinateur"]


def chemin_o(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def orange_dessine() -> VGroup:
    """Le fruit, sa feuille, et les quartiers suggérés."""
    fruit = Circle(radius=0.50, stroke_color=ORANGE_RETENUE, stroke_width=5)
    fruit.set_fill(opacity=0)
    quartiers = VGroup(
        *[
            Line(ORIGIN, np.array([0.44 * np.cos(a), 0.44 * np.sin(a), 0]),
                 stroke_color=ORANGE_RETENUE, stroke_width=2)
            for a in (PI / 2, PI / 2 + TAU / 3, PI / 2 + 2 * TAU / 3)
        ]
    )
    feuille = Polygon(
        np.array([0.06, 0.48, 0]), np.array([0.44, 0.80, 0]),
        np.array([0.12, 0.74, 0]),
        stroke_color=VERT_OK, stroke_width=4,
    )
    feuille.set_fill(opacity=0)
    return VGroup(fruit, quartiers, feuille)


def olive_dessine() -> VGroup:
    """Une olive et sa branche."""
    fruit = Ellipse(width=0.52, height=0.76, stroke_color=VERT_OK, stroke_width=5)
    fruit.set_fill(opacity=0)
    noyau = Ellipse(width=0.18, height=0.34, stroke_color=VERT_OK, stroke_width=2)
    noyau.set_fill(opacity=0)
    branche = Line(np.array([0, 0.38, 0]), np.array([0.10, 0.68, 0]),
                   stroke_color=VERT_OK, stroke_width=4)
    feuille = Ellipse(width=0.36, height=0.16, stroke_color=VERT_OK, stroke_width=3)
    feuille.set_fill(opacity=0).rotate(PI / 5).shift(np.array([0.30, 0.72, 0]))
    return VGroup(fruit, noyau, branche, feuille)


def oreille_dessine() -> VGroup:
    """Une oreille de profil : la silhouette, le pli, le conduit.

    ⛔ PREMIÈRE VERSION ÉCARTÉE AU RENDU : trois arcs ouverts censés suggérer le
    pavillon et le lobe. Réduits à 0,46 dans la liste des mots, ils faisaient
    une virgule bleue — impossible d'y lire une oreille. Comme l'iris du « i »,
    ça ne se voyait pas dans le code.
    ⭐ À cette taille, il faut une SILHOUETTE FERMÉE : l'œil reconnaît une forme
    avant de reconnaître des traits.
    """
    contour = Ellipse(width=0.64, height=0.96, stroke_color=WHITE, stroke_width=5)
    contour.set_fill(opacity=0).rotate(-0.16)
    pli = Arc(
        radius=0.21, start_angle=PI * 0.8, angle=-PI * 1.45,
        stroke_color=BLEU_CALCUL, stroke_width=4,
    ).shift(np.array([-0.01, 0.08, 0]))
    conduit = Dot(np.array([0.02, -0.14, 0]), radius=0.065, color=BLEU_CALCUL)
    return VGroup(contour, pli, conduit)


def os_dessine() -> VGroup:
    """Un os : la tige et ses quatre bosses."""
    tige = Rectangle(width=0.94, height=0.26, stroke_color=WHITE, stroke_width=5)
    tige.set_fill(opacity=0)
    bosses = VGroup(
        *[
            Circle(radius=0.17, stroke_color=WHITE, stroke_width=5)
            .set_fill(opacity=0)
            .shift(np.array([x, y, 0]))
            for x in (-0.50, 0.50)
            for y in (0.15, -0.15)
        ]
    )
    return VGroup(bosses, tige)


def ordinateur_dessine() -> VGroup:
    """Un portable ouvert : l'écran et le clavier."""
    ecran = Rectangle(width=1.06, height=0.72, stroke_color=WHITE, stroke_width=5)
    ecran.set_fill(opacity=0).shift(UP * 0.30)
    dedans = Rectangle(width=0.86, height=0.52, stroke_color=BLEU_CALCUL, stroke_width=3)
    dedans.set_fill(opacity=0).shift(UP * 0.30)
    clavier = Polygon(
        np.array([-0.62, -0.10, 0]), np.array([0.62, -0.10, 0]),
        np.array([0.74, -0.34, 0]), np.array([-0.74, -0.34, 0]),
        stroke_color=WHITE, stroke_width=5,
    )
    clavier.set_fill(opacity=0)
    touche = Line(np.array([-0.30, -0.22, 0]), np.array([0.30, -0.22, 0]),
                  stroke_color=GREY_B, stroke_width=3)
    return VGroup(ecran, dedans, clavier, touche)


# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-o"
DUREE = {
    "00-aujourdhui": 3.17, "01-ecoute": 2.99, "02-regarde": 3.02, "03-depart": 9.03,
    "04-encore": 2.92, "05-cherchons": 4.12, "05-o-comme": 1.58, "06-orange": 1.57,
    "07-olive": 1.53, "08-oreille": 1.56, "09-os": 1.37, "10-ordinateur": 2.03,
    "10-pareil": 4.71, "11-relance": 2.94, "12-va-sur": 3.16, "13-tout": 9.55,
    "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-orange", "07-olive", "08-oreille", "09-os", "10-ordinateur"]


class _LettreOBase(Scene):
    """Le contenu, écrit une fois. Les quatre variantes ne changent que le cadre
    et le côté vers lequel le stylo penche."""

    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE. `Scene.add_sound` commence par
        `if self.renderer.skip_animations: return`, et ce drapeau passe à True
        dès qu'une animation vient du cache : la vidéo sort avec une phrase sur
        douze, sans un mot dans les journaux."""
        self.add_sound(str(VOIX / f"{nom}.wav"))
        return DUREE[nom]

    def construct(self):
        son = Text("o", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        garde, garde_main = page_de_garde(
            self, "o", chemin_o(stroke_width=12), MascotteMargouillat()
        )

        # ── 1. L'ACCUEIL, À LA SECONDE PILE ─────────────────────────────────
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
        # ⛔ Le son se range dans un COIN : posé en haut au centre, il restait
        # pile là où « o comme… » vient s'écrire. Mais il RESTE affiché — c'est
        # ce qu'on apprend.
        self.play(
            FadeOut(titre),
            FadeOut(margo, shift=RIGHT * 0.4),
            son.animate.scale(0.40).to_corner(UL, buff=0.55),
        )
        self.wait(0.4)

        # ── 2. LE GESTE, LENTEMENT ──────────────────────────────────────────
        lignes = reglure(3)
        lettre = chemin_o(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_o(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "o", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
        ).move_to(modele)

        d = self.dire("02-regarde")
        self.play(Create(lignes), run_time=0.8)
        self.play(FadeIn(imprime, scale=0.85), run_time=0.3)
        self.play(Transform(imprime, modele), run_time=0.8)
        point = Dot(lettre.get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2), run_time=0.5)
        self.wait(max(0.3, d - 2.4))

        # ⭐ UN SEUL `ValueTracker` pilote le trait ET le stylo : c'est ce qui
        # les garde synchrones à l'image près.
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
        # ⭐ LE TRACÉ DURE EXACTEMENT LE TEMPS DE LA PHRASE QUI LE DÉCRIT, sinon
        # l'enfant entend « on sort par le haut » quand le crayon est déjà parti.
        d = self.dire("03-depart")
        self.play(avance.animate.set_value(1.0), run_time=d - 0.4, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()
        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        # ── 3. ON REFAIT, PLUS VITE ─────────────────────────────────────────
        self.dire("04-encore")
        for duree in (2.0, 1.2):
            self.remove(trace)
            trace = chemin_o(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── 4. « o » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        self.play(FadeOut(trace))

        titre_mots = Text("o comme…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            orange_dessine(), olive_dessine(), oreille_dessine(),
            os_dessine(), ordinateur_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_O, dessins):
            t = Text(mot, font_size=42 if not self.vertical else 38)
            t[0].set_color(JAUNE_TITRE)
            lignes_mots.add(VGroup(t, dessin.scale(echelle)).arrange(RIGHT, buff=0.55))

        # ⚠️ Alignés à GAUCHE : centrer ferait danser les initiales d'une ligne à
        # l'autre, et c'est justement l'initiale qu'on regarde.
        lignes_mots.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        bloc = VGroup(titre_mots, lignes_mots).arrange(DOWN, buff=0.5)
        bloc.move_to(ORIGIN).scale(0.95 if not self.vertical else 0.8)
        verifier(bloc, "bloc des cinq mots")

        dc = self.dire("05-cherchons")
        self.wait(dc)
        d = self.dire("05-o-comme")
        self.play(FadeIn(titre_mots, shift=DOWN * 0.3))
        self.wait(max(0.2, d - 1.0))
        for ligne, clip in zip(lignes_mots, CLIPS_MOTS):
            duree_mot = self.dire(clip)
            # ⚠️ Le zoom porte sur la ligne ENTIÈRE, mot ET image : zoomer le
            # seul mot a été essayé et écarté, le dessin restait petit à côté.
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.22), run_time=0.35)
            self.wait(0.45)
            self.play(ligne.animate.scale(1 / 1.22), run_time=0.3)
            self.wait(max(0.15, duree_mot - 1.45))
        dp = self.dire("10-pareil")
        self.wait(dp)

        # ── 4 bis. LA RELANCE : UNE CONSIGNE, PAS UNE QUESTION ──────────────
        self.play(FadeOut(bloc))
        relance = ecran_relance(self.vertical, "o")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN ───────────────────────────────────────────────
        page_de_fin(self, margo, "12-va-sur", "13-tout", "14-bientot")


class LettreOCp(_LettreOBase):
    """16:9, droitier."""


class LettreOCpGaucher(_LettreOBase):
    """16:9, gaucher."""

    gaucher = True


class LettreOCpPortrait(Portrait, _LettreOBase):
    """9:16, droitier."""


class LettreOCpPortraitGaucher(Portrait, _LettreOBase):
    """9:16, gaucher."""

    gaucher = True
