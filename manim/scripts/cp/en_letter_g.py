# Writing the cursive letter « g » — CP (English)
#
# ⭐⭐ LE « g » ET LE « q » SONT LA MÊME FAMILLE, ET ILS DOIVENT LEVER PAREIL.
# Certains modèles tracent le « g » SANS lever le crayon, et le principe du
# projet pousserait dans ce sens (le « n » repasse sur son trait, le « 5 » se
# fait d'un geste — « ne pas inventer une difficulté »).
# ⛔ MAIS le « q » validé le 08/09 lève DEUX fois, et les deux lettres partagent
# EXACTEMENT le même rond. Un « q » qui lève et un « g » qui ne lève pas
# apprendraient DEUX GESTES DIFFÉRENTS POUR LE MÊME ROND — l'incohérence se
# verrait dès le premier cahier.
# 👉 Si un jour on passe au sans-lever, il faudra refaire LES DEUX ensemble.
#
# ⚠️ LE « g » A DEUX SONS en français : [g] dans « gâteau », [ʒ] dans « girafe ».
# Cette vidéo enseigne le [g] DUR, comme celle du « c » enseigne le [k].
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
    verifier_ecran_vide,
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
# ⭐⭐ LE « l » EN CINQ GESTES NOMMÉS PAR LEUR COURBURE (Frédéric, 07/09) :
#   1. une PARABOLE CONVEXE QUI MONTE — l'attaque, un creux qui se relève ;
#   2. la BOUCLE À GAUCHE ;
#   3. une PARABOLE CONCAVE — le sommet, une voûte ;
#   4. on DESCEND TOUT DROIT ;
#   5. à 80 % du haut, une PARABOLE CONVEXE — le creux final, posé sur la ligne.
#
# ⭐⭐ ET C'EST CETTE DESCRIPTION-LÀ QUI A CONVERGÉ, APRÈS HUIT ESSAIS RATÉS.
# Frédéric : « parfait, mieux lorsque je te décris en maths ». Les descriptions
# visuelles (« la boucle est trop fermée », « on n'y est pas ») me faisaient
# faire du yoyo ; une suite de COURBURES — creux, voûte, droite, pourcentage de
# hauteur — se transpose directement en points de contrôle.
# 👉 POUR LES DIX-NEUF LETTRES RESTANTES : demander la suite des courbures.
#
# ⛔ ET LE SVG NE SUFFISAIT PAS. Il m'a donné la FORME juste, et j'en ai conclu
# que la lettre l'était. Mais un SVG montre où passent les traits, PAS DANS QUEL
# ORDRE LA MAIN LES PARCOURT — ma version calée sur le SVG montait à gauche et
# redescendait à droite, l'exact inverse du geste. Sur une vidéo dont l'objet
# EST le geste, c'est la seule chose qui compte.
# ─── Le chemin du « g » ──────────────────────────────────────────────────────
# ⭐ LE « g » EN DEUX TRACÉS (Frédéric, 08/09) : « on peut faire en levant le
# stylo d'abord o, puis en haut vertical, puis boucle vers la gauche qui revient
# sur la ligne ».
#
# ⭐ CE QUI LE SÉPARE DU « q », ET C'EST NET :
#   — le « q » lève DEUX fois : rond, fût, puis une parabole d'attache à part ;
#   — le « g » lève UNE fois : rond, puis fût ET boucle d'un seul geste.
# 👉 « Le q lève et s'arrête, le g boucle et repart. » Sa boucle attache toute
# seule, il n'a pas besoin d'un troisième tracé.
#
# ⭐ Le rond est EXACTEMENT celui du « q » : départ au point vert, on tourne à
# gauche, on ferme AU POINT VERT. Validé au rendu le même jour.
DEPART = np.array([0.10, 0.90, 0])
ROND = [
    ((-0.16, 1.06), (-0.84, 0.98), (-0.84, 0.44)),   # 1. par le haut, vers la GAUCHE
    ((-0.84, -0.02), (-0.14, -0.04), (0.06, 0.40)),  # 2. le bas du rond
    ((0.16, 0.62), (0.18, 0.82), (0.10, 0.90)),      # 3. on FERME AU POINT VERT
]
DEPART_2 = np.array([0.14, 1.12, 0])
JAMBAGE = [
    ((0.14, 0.60), (0.14, -0.10), (0.13, -0.62)),    # la descente, VERTICALE
    ((0.11, -0.94), (-0.32, -1.02), (-0.46, -0.70)),  # la BOUCLE plonge vers la GAUCHE
    ((-0.56, -0.44), (-0.26, -0.10), (0.14, 0.04)),  # elle REVIENT SUR LA LIGNE
    ((0.26, 0.10), (0.36, 0.16), (0.48, 0.24)),      # la sortie, qui s'effile
]


def chemin_g(stroke_width: float = 10, color: str = WHITE) -> VGroup:
    """Les DEUX tracés : le rond, puis le fût et sa boucle."""
    return VGroup(
        chemin_bezier(DEPART, ROND, stroke_width, color),
        chemin_bezier(DEPART_2, JAMBAGE, stroke_width, color),
    )


# ⭐ SEUL « gorilla » garde son dessin français — le recouvrement le plus
# faible de la série, et ce n'est pas un hasard : les mots français au son [g]
# dur désignent des choses dont le nom anglais commence par une AUTRE lettre
# (gomme → rubber, goutte → drop, galet → pebble, gâteau → cake).
# ⛔ Écarté : « gift », dont le paquet-cadeau porte déjà le dessin du « c »
# français. Deux lettres ne partagent jamais la même image.
# ⚠️ Comme en français, cette vidéo enseigne le [g] DUR — « giraffe » et
# « gentle » feraient entendre un autre son sous la même lettre.
MOTS_EN_G = ["goal", "goose", "gorilla", "gate", "gum"]


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """A goal: the frame, its net, and the ball in front."""
    # ⛔ CE MOT REMPLACE « goat », abandonné après un essai — et c'était la
    # TROISIÈME tête d'animal à cornes de profil qui ne se lisait pas (la
    # gazelle française avait échoué deux fois : « bâton à cornes », puis
    # « poisson »). 👉 Une tête cornue de profil ne se lit pas à cette taille :
    # ce qui marche, ce sont les objets à silhouette franche.
    cadre = VGroup(
        Line(np.array([-0.50, -0.34, 0]), np.array([-0.50, 0.30, 0]),
             stroke_color=WHITE, stroke_width=5),
        Line(np.array([0.34, -0.34, 0]), np.array([0.34, 0.30, 0]),
             stroke_color=WHITE, stroke_width=5),
        Line(np.array([-0.50, 0.30, 0]), np.array([0.34, 0.30, 0]),
             stroke_color=WHITE, stroke_width=5),
    )
    filet = VGroup(
        *[Line(np.array([x, -0.34, 0]), np.array([x, 0.30, 0]),
               stroke_color=GREY_B, stroke_width=2)
          for x in (-0.29, -0.08, 0.13)],
        *[Line(np.array([-0.50, y, 0]), np.array([0.34, y, 0]),
               stroke_color=GREY_B, stroke_width=2)
          for y in (0.09, -0.12)],
    )
    ballon = Circle(radius=0.16, stroke_color=WHITE, stroke_width=5)
    ballon.set_fill(opacity=0).move_to(np.array([0.46, -0.34, 0]))
    coutures = VGroup(
        Polygon(np.array([0.40, -0.30, 0]), np.array([0.52, -0.30, 0]),
                np.array([0.46, -0.40, 0]),
                stroke_color=WHITE, stroke_width=3).set_fill(opacity=0),
    )
    sol = Line(np.array([-0.62, -0.34, 0]), np.array([0.64, -0.34, 0]),
               stroke_color=GREY_B, stroke_width=2)
    return VGroup(filet, cadre, sol, ballon, coutures)


def lit_dessine() -> VGroup:
    """A goose: the long neck, the round body, the orange beak and feet."""
    corps = Ellipse(width=0.62, height=0.40, stroke_color=WHITE, stroke_width=5)
    corps.set_fill(opacity=0).move_to(np.array([-0.14, -0.14, 0]))
    cou = VMobject(stroke_color=WHITE, stroke_width=5)
    cou.set_fill(opacity=0)
    cou.start_new_path(np.array([0.02, 0.02, 0]))
    cou.add_cubic_bezier_curve_to(
        np.array([0.22, 0.14, 0]), np.array([0.20, 0.42, 0]),
        np.array([0.14, 0.52, 0]))
    cou.add_cubic_bezier_curve_to(
        np.array([0.02, 0.60, 0]), np.array([-0.02, 0.38, 0]),
        np.array([-0.04, 0.16, 0]))
    tete = Circle(radius=0.11, stroke_color=WHITE, stroke_width=4)
    tete.set_fill(opacity=0).move_to(np.array([0.10, 0.50, 0]))
    bec = Polygon(np.array([0.20, 0.52, 0]), np.array([0.42, 0.46, 0]),
                  np.array([0.20, 0.42, 0]),
                  stroke_color=ORANGE_RETENUE, stroke_width=4).set_fill(opacity=0)
    oeil = Dot(np.array([0.13, 0.54, 0]), radius=0.028)
    pattes = VGroup(
        *[Line(np.array([x, -0.32, 0]), np.array([x, -0.46, 0]),
               stroke_color=ORANGE_RETENUE, stroke_width=4) for x in (-0.22, -0.02)]
    )
    aile = ArcBetweenPoints(np.array([-0.34, -0.10, 0]), np.array([-0.02, -0.16, 0]),
                            angle=-1.0, stroke_color=WHITE, stroke_width=3)
    return VGroup(pattes, corps, aile, cou, tete, bec, oeil)


def livre_dessine() -> VGroup:
    """Un gorille : la tête large, l'arcade sourcilière, le museau plat."""
    tete = VMobject(stroke_color=GREY_B, stroke_width=5)
    tete.set_fill(opacity=0)
    tete.start_new_path(np.array([-0.36, 0.10, 0]))
    tete.add_cubic_bezier_curve_to(                     # le crâne, haut et large
        np.array([-0.36, 0.48, 0]), np.array([0.36, 0.48, 0]),
        np.array([0.36, 0.10, 0]))
    tete.add_cubic_bezier_curve_to(                     # les joues, qui se resserrent
        np.array([0.36, -0.30, 0]), np.array([-0.36, -0.30, 0]),
        np.array([-0.36, 0.10, 0]))
    oreilles = VGroup(
        *[Circle(radius=0.08, stroke_color=GREY_B, stroke_width=3)
          .set_fill(opacity=0).move_to(np.array([x, 0.14, 0])) for x in (-0.40, 0.40)]
    )
    arcade = ArcBetweenPoints(np.array([-0.24, 0.20, 0]), np.array([0.24, 0.20, 0]),
                              angle=-0.7, stroke_color=GREY_B, stroke_width=4)
    yeux = VGroup(*[Dot(np.array([x, 0.08, 0]), radius=0.04) for x in (-0.13, 0.13)])
    museau = Ellipse(width=0.34, height=0.20, stroke_color=GREY_B, stroke_width=4)
    museau.set_fill(opacity=0).move_to(np.array([0.00, -0.12, 0]))
    narines = VGroup(*[Dot(np.array([x, -0.09, 0]), radius=0.025)
                       for x in (-0.06, 0.06)])
    bouche = Line(np.array([-0.10, -0.20, 0]), np.array([0.10, -0.20, 0]),
                  stroke_color=GREY_B, stroke_width=2)
    return VGroup(oreilles, tete, arcade, yeux, museau, narines, bouche)


def lapin_dessine() -> VGroup:
    """A gate: two posts, three bars, and the diagonal brace."""
    montants = VGroup(
        *[Line(np.array([x, -0.44, 0]), np.array([x, 0.36, 0]),
               stroke_color=ORANGE_RETENUE, stroke_width=5)
          for x in (-0.44, 0.44)]
    )
    barres = VGroup(
        *[Line(np.array([-0.44, y, 0]), np.array([0.44, y, 0]),
               stroke_color=ORANGE_RETENUE, stroke_width=4)
          for y in (0.28, 0.02, -0.24)]
    )
    croix = Line(np.array([-0.44, -0.24, 0]), np.array([0.44, 0.28, 0]),
                 stroke_color=ORANGE_RETENUE, stroke_width=3)
    gonds = VGroup(
        *[Dot(np.array([-0.44, y, 0]), radius=0.035, color=GREY_B)
          for y in (0.28, -0.24)]
    )
    sol = Line(np.array([-0.62, -0.46, 0]), np.array([0.62, -0.46, 0]),
               stroke_color=GREY_B, stroke_width=2)
    return VGroup(sol, montants, barres, croix, gonds)


def lampe_dessine() -> VGroup:
    """A stick of gum: the wrapper, its folded end, and the stripe."""
    papier = Polygon(
        np.array([-0.16, -0.46, 0]), np.array([0.16, -0.46, 0]),
        np.array([0.16, 0.34, 0]), np.array([-0.16, 0.34, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5).set_fill(opacity=0)
    repli = Polygon(
        np.array([-0.16, 0.34, 0]), np.array([0.16, 0.34, 0]),
        np.array([0.10, 0.50, 0]), np.array([-0.10, 0.50, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=4).set_fill(opacity=0)
    bandes = VGroup(
        *[Line(np.array([-0.16, y, 0]), np.array([0.16, y, 0]),
               stroke_color=ROUGE_ERREUR, stroke_width=3)
          for y in (0.08, -0.06)]
    )
    # La gomme qui dépasse en bas : c'est elle qui dit « chewing-gum ».
    pate = Polygon(
        np.array([-0.13, -0.46, 0]), np.array([0.13, -0.46, 0]),
        np.array([0.13, -0.60, 0]), np.array([-0.13, -0.60, 0]),
        stroke_color=WHITE, stroke_width=4).set_fill(opacity=0)
    return VGroup(pate, papier, bandes, repli)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "en-lettre-g"
DUREE = { "00-aujourdhui": 3.66, "01-ecoute": 3.98, "02-regarde": 2.99,
    "03-depart": 28.7, "04-encore": 4.15, "05-cherchons": 5.74,
    "05-g-comme": 2.01, "06-gateau": 1.71, "07-gomme": 1.73,
    "08-gorille": 1.83, "09-goutte": 1.77, "10-galet": 1.69,
    "10-pareil": 5.16, "11-relance": 3.54, "12-va-sur": 3.56,
    "14-bientot": 2.23,
}
CLIPS_MOTS = ["06-gateau", "07-gomme", "08-gorille", "09-goutte",
              "10-galet"]


class _LetterGBase(Scene):
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
        son = Text("g", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        garde, garde_main = page_de_garde(
            # ⚠️ Réglage propre au « q », jugé au rendu de la garde : à 1,4/12
            # son rond se bouchait en pastille pleine. Troisième lettre de
            # suite dans ce cas après le « f » et le « k » — c'est LA PLUS
            # PETITE BOUCLE qui décide, pas la hauteur.
            self, "g", chemin_g(stroke_width=7), MascotteMargouillat(),
            hauteur_cursive=2.0,
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
            Transform(titre, Text("the sound", font_size=44, color=BLEU_CALCUL).move_to(titre)),
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
        lettre = chemin_g(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_g(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "g", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
        ).move_to(modele)

        d = self.dire("02-regarde")
        self.play(Create(lignes), run_time=0.8)
        self.play(FadeIn(imprime, scale=0.85), run_time=0.3)
        self.play(Transform(imprime, modele), run_time=0.8)
        point = Dot(lettre[0].get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2), run_time=0.5)
        self.wait(max(0.3, d - 2.4))

        # ⭐⭐ DEUX TRACÉS, ET UN LEVER DE CRAYON ENTRE LES DEUX — la machinerie
        # du « 4 » et du « 7 », amenée ici pour la première lettre qui lève.
        # ⛔ Le montage des lettres était écrit pour UN SEUL chemin : il appelait
        # `pointwise_become_partial` sur le tracé, ce qui échoue sur un VGroup.
        modele_stylo = stylo_neuf()
        stylo = stylo_neuf()
        a_main = angle_main(self.gaucher)
        self.remove(lettre)

        d = self.dire("03-depart")
        # ⭐ On répartit le temps de la phrase : le corps, le SAUT, la barre.
        t_corps = (d - 0.4 - 1.4) * 0.72
        t_barre = (d - 0.4 - 1.4) * 0.28

        # ⛔ LES TRACÉS SE COLLECTIONNENT : un par trait, et seul le dernier
        # survivrait dans une variable. Voir le « 4 », où l'oubli laissait un
        # chiffre fantôme à l'écran deux écrans plus loin.
        traces = []
        for i_trait, duree in ((0, t_corps), (1, t_barre)):
            chemin = lettre[i_trait]
            avance = ValueTracker(0.0)
            trace = VMobject(
                stroke_width=14 if not self.vertical else 16, stroke_color=WHITE
            )
            trace.set_fill(opacity=0)
            trace.add_updater(
                lambda m, c=chemin, a=avance: m.become(
                    c.copy().pointwise_become_partial(c, 0, max(a.get_value(), EPS))
                )
            )
            stylo.add_updater(
                lambda m, c=chemin, a=avance: poser_stylo(
                    m, modele_stylo, c, a.get_value(), a_main
                )
            )
            self.add(trace, stylo)
            traces.append(trace)
            self.play(avance.animate.set_value(1.0), run_time=duree, rate_func=linear)
            trace.clear_updaters()
            stylo.clear_updaters()

            if i_trait == 0:
                # ⭐⭐ LE SAUT DU CRAYON, MONTRÉ. Il se soulève, traverse, et se
                # repose. ⛔ Le faire disparaitre puis réapparaitre se lirait
                # comme un défaut d'animation, pas comme un geste.
                depart_2 = lettre[1].get_start()
                pointe = chemin.point_from_proportion(1 - EPS)
                self.play(stylo.animate.shift(UP * 0.55).scale(1.12), run_time=0.45)
                self.play(
                    stylo.animate.shift(depart_2 - pointe + DOWN * 0.55).scale(1 / 1.12),
                    run_time=0.95,
                )

        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        # ── 3. ON REFAIT, PLUS VITE ─────────────────────────────────────────
        # ⚠️ Les deux reprises redessinent LES DEUX TRAITS, dans l'ordre et avec
        # la coupure entre eux : une reprise d'un seul tenant effacerait la
        # leçon qu'on vient de donner.
        self.dire("04-encore")
        refait = None
        for duree in (2.0, 1.2):
            if refait is not None:
                # ⛔ `remove(groupe)` ne retire PAS les membres ajoutés un par un.
                self.remove(*refait)
            refait = chemin_g(stroke_width=14 if not self.vertical else 16)
            for r, t in zip(refait, lettre):
                r.match_points(t)
            self.play(Create(refait[0]), run_time=duree * 0.72, rate_func=linear)
            self.play(Create(refait[1]), run_time=duree * 0.28, rate_func=linear)
            self.wait(0.4)

        self.play(
            FadeOut(point), FadeOut(lignes), FadeOut(imprime), FadeOut(*refait),
            *[FadeOut(t) for t in traces],
        )
        verifier_ecran_vide(self, "la fin du tracé", garder=(son,))

        # ── 4. « t » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────

        titre_mots = Text("g as in…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_G, dessins):
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
        d = self.dire("05-g-comme")
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
        relance = ecran_relance(
            self.vertical, "g",
            consigne=("Find a word", "beginning with",
                      "Find a word beginning with"),
        )
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN ───────────────────────────────────────────────
        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot",
                    adieu="See you soon!", adieu_taille=36,
                    abonne=("Subscribe to", "the channel!"),
                    fiche=("Download", "your sheet!"),
                    voix_abonne="en-commun")


class LetterGRight(_LetterGBase):
    """16:9, droitier."""


class LetterGLeft(_LetterGBase):
    """16:9, gaucher."""

    gaucher = True


class LetterGPortraitRight(Portrait, _LetterGBase):
    """9:16, droitier."""


class LetterGPortraitLeft(Portrait, _LetterGBase):
    """9:16, gaucher."""

    gaucher = True
