# Écriture de la lettre « k » en cursive — CP
#
# ⭐⭐ LE « k » SE FAIT SANS LEVER LE CRAYON. C'est ce que Frédéric a corrigé au
# troisième essai : je faisais repartir le bras en DIAGONALE depuis la ligne,
# ce qui ajoutait un trait — donc une difficulté. Le vrai geste REMONTE SUR LE
# MÊME TRAIT VERTICAL, comme le « n ».
#
# ⛔ TOUJOURS --disable_caching.

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

# ─── Le chemin du « k » ──────────────────────────────────────────────────────
# ⭐ LE « k » EN COURBURES (Frédéric, 08/09), d'après ses quatre photos d'étapes :
#   1. le départ du « l » — un creux qui monte, la grande boucle qui bascule à
#      GAUCHE, la descente VERTICALE jusqu'à la ligne ;
#   2. on REMONTE SUR LE MÊME TRAIT, sans lever ;
#   3. une petite boucle « comme un r », qui revient toucher la verticale ;
#   4. la jambe descend : une VOÛTE, puis un CREUX posé sur la ligne.
#
# ⛔ MES DEUX ERREURS, ET ELLES SE RESSEMBLENT :
#   1. le bras repartait en DIAGONALE depuis la ligne — un trait de plus, donc
#      une difficulté inventée. Le geste remonte sur sa propre verticale ;
#   2. j'ai copié le nœud du « r » TEL QUEL, donc vers la GAUCHE. Il sortait du
#      mauvais côté et faisait une bulle collée au fût : le « k » porte son nœud
#      à DROITE, c'est le BRAS de la lettre.
# ⚠️ « comme un r » ne veut pas dire « en miroir » — la même leçon que sur la
# boucle du « f », deux heures plus tôt.
#
# ⭐ DEUX VERSIONS DU NŒUD ONT ÉTÉ RENDUES, chacune SEULE et PLEIN CADRE, puis
# en miniature. Frédéric a choisi la B, la plus ouverte : son trou survit à la
# réduction. Le « k » précédent, à nœud serré, sortait en pâté sur la garde.
DEPART = np.array([-0.80, 0.10, 0])
COURBES = [
    ((-0.56, 0.12), (-0.32, 0.20), (-0.06, 0.42)),   # 1. le creux qui monte
    ((0.16, 1.00), (0.30, 1.95), (0.30, 2.90)),      # 2. la montée, à DROITE
    ((0.30, 3.32), (-0.12, 3.34), (-0.12, 2.80)),    # 3. la voûte, bascule à GAUCHE
    ((-0.12, 2.00), (-0.12, 0.90), (-0.10, 0.08)),   # 4. la descente, VERTICALE
    ((-0.10, 0.30), (-0.10, 0.60), (-0.08, 0.92)),   # 5. on REMONTE sur le même trait
    ((0.12, 1.32), (0.60, 1.06), (0.38, 0.76)),      # 6a. le NŒUD, ample, vers la DROITE
    # ⚠️ La fermeture s'ARRÊTE SUR LE FÛT (−0,04) : à −0,08 elle le dépassait
    # et laissait un éperon pointu à gauche.
    ((0.26, 0.62), (0.04, 0.66), (-0.04, 0.76)),     # 6b. …qui rejoint la verticale
    ((0.08, 0.60), (0.24, 0.42), (0.26, 0.24)),      # 7. la VOÛTE
    ((0.30, 0.06), (0.46, -0.02), (0.62, 0.12)),     # 8. le CREUX, posé sur la ligne
    ((0.72, 0.20), (0.82, 0.28), (0.92, 0.36)),      # 9. la sortie
]

# ⭐ CINQ MOTS EN « k », tous avec un k SEUL suivi d'une voyelle.
# ⚠️ Le « k » est une lettre PAUVRE en français : la plupart de ses mots sont
# des emprunts. On prend donc ceux qu'un CP connait vraiment — trois animaux,
# un bateau, un chapeau.
# ⭐ Trois sur cinq sont du vivant. Le « kiwi » est dessiné en FRUIT COUPÉ (le
# rond à graines), pas en oiseau : c'est l'image que l'enfant a déjà vue.
MOTS_EN_K = ["kangourou", "koala", "kiwi", "kayak", "képi"]


def chemin_k(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Un kangourou : UNE SEULE SILHOUETTE FERMÉE, comme un pictogramme."""
    # ⛔ DEUX ESSAIS EN MORCEAUX AVANT CELUI-CI : corps + tête + pied + queue,
    # assemblés. Ça faisait un tas de formes, jamais une bête — les jointures
    # se voyaient plus que l'animal.
    # 👉 Un animal à silhouette forte se dessine D'UN SEUL CONTOUR. C'est la
    # leçon déjà payée sur le « l » (silhouettes fermées) et sur la main du
    # chiffre 5, où les doigts détourés coupaient la paume.
    k = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=5)
    k.set_fill(opacity=0)
    k.start_new_path(np.array([0.06, 0.74, 0]))            # la pointe de l'oreille
    k.add_line_to(np.array([0.16, 0.54, 0]))               # la base de l'oreille
    k.add_cubic_bezier_curve_to(                            # le front et le museau
        np.array([0.30, 0.54, 0]), np.array([0.38, 0.46, 0]),
        np.array([0.36, 0.38, 0]))
    k.add_cubic_bezier_curve_to(                            # la gorge
        np.array([0.30, 0.32, 0]), np.array([0.22, 0.30, 0]),
        np.array([0.18, 0.20, 0]))
    k.add_cubic_bezier_curve_to(                            # la petite patte avant
        np.array([0.30, 0.16, 0]), np.array([0.30, 0.06, 0]),
        np.array([0.16, 0.04, 0]))
    k.add_cubic_bezier_curve_to(                            # le ventre
        np.array([0.10, -0.10, 0]), np.array([0.06, -0.24, 0]),
        np.array([0.14, -0.34, 0]))
    k.add_line_to(np.array([0.48, -0.42, 0]))              # LE GRAND PIED
    k.add_line_to(np.array([0.46, -0.50, 0]))
    k.add_line_to(np.array([0.02, -0.50, 0]))              # le talon
    k.add_cubic_bezier_curve_to(                            # le dessous de la queue
        np.array([-0.26, -0.50, 0]), np.array([-0.58, -0.46, 0]),
        np.array([-0.78, -0.36, 0]))
    k.add_cubic_bezier_curve_to(                            # le dessus de la queue
        np.array([-0.54, -0.34, 0]), np.array([-0.28, -0.24, 0]),
        np.array([-0.14, -0.06, 0]))
    k.add_cubic_bezier_curve_to(                            # le dos, jusqu'à la nuque
        np.array([-0.08, 0.16, 0]), np.array([-0.04, 0.40, 0]),
        np.array([0.02, 0.54, 0]))
    k.add_line_to(np.array([0.06, 0.74, 0]))               # on referme sur l'oreille
    oeil = Dot(np.array([0.26, 0.44, 0]), radius=0.03)
    return VGroup(k, oeil)


def lit_dessine() -> VGroup:
    """Un koala : la grosse tête ronde, deux oreilles touffues, le museau."""
    tete = Circle(radius=0.30, stroke_color=GREY_B, stroke_width=5)
    tete.set_fill(opacity=0)
    oreilles = VGroup(
        *[Circle(radius=0.16, stroke_color=GREY_B, stroke_width=4)
          .set_fill(opacity=0).move_to(np.array([x, 0.24, 0])) for x in (-0.28, 0.28)]
    )
    museau = Ellipse(width=0.20, height=0.26, stroke_color=WHITE, stroke_width=4)
    museau.set_fill(opacity=0).move_to(np.array([0.00, -0.14, 0]))
    yeux = VGroup(*[Dot(np.array([x, 0.06, 0]), radius=0.035) for x in (-0.13, 0.13)])
    return VGroup(oreilles, tete, museau, yeux)


def livre_dessine() -> VGroup:
    """Un kiwi coupé : la peau, la chair claire, le cœur et ses graines."""
    peau = Circle(radius=0.38, stroke_color=ORANGE_RETENUE, stroke_width=5)
    peau.set_fill(opacity=0)
    chair = Circle(radius=0.31, stroke_color=VERT_OK, stroke_width=4)
    chair.set_fill(opacity=0)
    coeur = Circle(radius=0.09, stroke_color=VERT_OK, stroke_width=3)
    coeur.set_fill(opacity=0)
    graines = VGroup(
        *[Dot(np.array([0.19 * np.cos(a), 0.19 * np.sin(a), 0]), radius=0.028)
          for a in np.linspace(0, 2 * np.pi, 11)[:-1]]
    )
    return VGroup(peau, chair, graines, coeur)


def lapin_dessine() -> VGroup:
    """Un kayak : la coque pointue aux deux bouts, et sa pagaie."""
    coque = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=5)
    coque.set_fill(opacity=0)
    coque.start_new_path(np.array([-0.62, -0.10, 0]))
    coque.add_cubic_bezier_curve_to(
        np.array([-0.30, 0.14, 0]), np.array([0.30, 0.14, 0]),
        np.array([0.62, -0.10, 0]))
    coque.add_cubic_bezier_curve_to(
        np.array([0.30, -0.34, 0]), np.array([-0.30, -0.34, 0]),
        np.array([-0.62, -0.10, 0]))
    trou = Ellipse(width=0.26, height=0.14, stroke_color=ROUGE_ERREUR,
                   stroke_width=3)
    trou.set_fill(opacity=0).move_to(np.array([0.00, -0.08, 0]))
    pagaie = Line(np.array([-0.34, 0.42, 0]), np.array([0.34, -0.02, 0]),
                  stroke_color=JAUNE_TITRE, stroke_width=4)
    pales = VGroup(
        Ellipse(width=0.10, height=0.20, stroke_color=JAUNE_TITRE, stroke_width=3)
        .set_fill(opacity=0).move_to(np.array([-0.38, 0.46, 0])).rotate(-0.6),
        Ellipse(width=0.10, height=0.20, stroke_color=JAUNE_TITRE, stroke_width=3)
        .set_fill(opacity=0).move_to(np.array([0.38, -0.06, 0])).rotate(-0.6),
    )
    vague = Line(np.array([-0.72, -0.30, 0]), np.array([0.72, -0.30, 0]),
                 stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(vague, coque, trou, pagaie, pales)


def lampe_dessine() -> VGroup:
    """Un képi : le bandeau, le plateau plat, et une PETITE visière sombre."""
    # ⛔ PREMIÈRE VERSION : une visière blanche énorme, plus large que le képi
    # lui-même. Ça lisait comme un seau posé dans une flaque. La visière d'un
    # képi est PETITE, sombre, et ne déborde que d'un côté.
    bandeau = Polygon(
        np.array([-0.26, -0.14, 0]), np.array([0.26, -0.14, 0]),
        np.array([0.30, 0.18, 0]), np.array([-0.30, 0.18, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5).set_fill(opacity=0)
    plateau = Ellipse(width=0.62, height=0.16, stroke_color=BLEU_CALCUL,
                      stroke_width=4)
    plateau.set_fill(opacity=0).move_to(np.array([0.00, 0.18, 0]))
    visiere = VMobject(stroke_color=VIOLET_ACCENT, stroke_width=5)
    visiere.set_fill(opacity=0)
    visiere.start_new_path(np.array([-0.20, -0.14, 0]))
    visiere.add_cubic_bezier_curve_to(
        np.array([0.06, -0.30, 0]), np.array([0.34, -0.30, 0]),
        np.array([0.44, -0.20, 0]))
    visiere.add_cubic_bezier_curve_to(
        np.array([0.30, -0.14, 0]), np.array([0.06, -0.10, 0]),
        np.array([-0.20, -0.14, 0]))
    galon = Line(np.array([-0.28, 0.02, 0]), np.array([0.28, 0.02, 0]),
                 stroke_color=JAUNE_TITRE, stroke_width=3)
    return VGroup(visiere, bandeau, galon, plateau)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-k"
DUREE = { "00-aujourdhui": 3.33, "01-ecoute": 3.1, "02-regarde": 3.11,
    "03-depart": 26.41, "04-encore": 2.92, "05-cherchons": 4.26,
    "05-k-comme": 1.72, "06-kangourou": 1.69, "07-koala": 1.62,
    "08-kiwi": 1.5, "09-kayak": 1.69, "10-kepi": 1.49, "10-pareil": 4.71,
    "11-relance": 3.07, "12-va-sur": 3.16, "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-kangourou", "07-koala", "08-kiwi", "09-kayak", "10-kepi"]


class _LettreKBase(Scene):
    """Le contenu, écrit une fois. Les quatre variantes ne changent que le cadre
    et le côté vers lequel le stylo penche."""

    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE. `Scene.add_sound` commence par
        `if self.renderer.skip_animations: return`, et ce drapeau passe à True
        dès qu'une animation vient du cache : la vidéo sort avec une phrase sur
        douze, sans un mot dans les journaux."""
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
        son = Text("k", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        # ⛔⛔ LE « f » SORTAIT EN PÂTÉ BLANC SUR LA PAGE DE GARDE — et c'est
        # l'image que YouTube prélève à 1 seconde pour la vignette.
        # Le glyphe brut fait 4,36 de haut (contre 1,10 pour un « a »). Calé sur
        # `imprime.height * 1,4` comme une voyelle, il est réduit près de 4×
        # PENDANT QUE `stroke_width=12` NE BOUGE PAS : ses deux boucles se
        # bouchent et il ne reste qu'une masse.
        # 👉 On agit sur LES DEUX leviers : la lettre est dessinée plus grande
        # (2,8) ET d'un trait plus fin (6). Jugé sur le rendu de la garde, pas
        # sur le code — un pâté ne se voit pas dans des coordonnées.
        # ⚠️ Le « l » (3,32 de haut, laissé à 1,4) a été vérifié à cette
        # occasion : sa boucle est fine mais lisible, et Frédéric l'a validé
        # tel quel. On ne touche donc pas aux autres lettres.
        garde, garde_main = page_de_garde(
            self, "k", chemin_k(stroke_width=6), MascotteMargouillat(),
            hauteur_cursive=2.2,
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
        lettre = chemin_k(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_k(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "k", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            trace = chemin_k(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── 4. « o » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        self.play(FadeOut(trace))

        titre_mots = Text("k comme…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_K, dessins):
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
        d = self.dire("05-k-comme")
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
        relance = ecran_relance(self.vertical, "k")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN ───────────────────────────────────────────────
        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class LettreKCp(_LettreKBase):
    """16:9, droitier."""


class LettreKCpGaucher(_LettreKBase):
    """16:9, gaucher."""

    gaucher = True


class LettreKCpPortrait(Portrait, _LettreKBase):
    """9:16, droitier."""


class LettreKCpPortraitGaucher(Portrait, _LettreKBase):
    """9:16, gaucher."""

    gaucher = True
