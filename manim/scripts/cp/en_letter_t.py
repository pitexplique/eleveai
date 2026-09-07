# Écriture de la lettre « t » en cursive — CP
#
# ⭐⭐ LA PREMIÈRE CONSONNE, ET LE PREMIER TRACÉ RELEVÉ SUR UN MODÈLE.
# Les six voyelles ont été dessinées à l'œil. Le 07/09, Frédéric a envoyé le
# SVG du « l » d'une planche officielle, et la méthode a changé : on SUPERPOSE
# notre tracé au modèle et on regarde l'écart, au lieu de deviner des courbes.
# ⛔ Six essais à l'aveugle avant le SVG, un seul après. Pour les vingt
# consonnes restantes, DEMANDER LE SVG D'ABORD.
#
# ⭐ Ce que le modèle a corrigé, et qu'aucun de mes essais n'avait trouvé :
#   — la boucle est une GROSSE GOUTTE penchée, pas une fente verticale ;
#   — le croisement tombe BAS, au niveau de la ligne médiane ;
#   — la lettre a une LONGUE ATTAQUE qui vient de loin à gauche ;
#   — le bas est une PARABOLE CONVEXE posée sur la ligne, pas un crochet.
#
# ⚠️ L'ATTAQUE POSE UNE QUESTION DE SÉRIE : les six voyelles publiées n'en ont
# pas (le « a » commence sur son rond). Si les consonnes en ont une et pas les
# voyelles, la série est incohérente. À trancher avec Frédéric.
#
# ⭐ Pourquoi le « l » d'abord parmi les vingt consonnes : c'est la BOUCLE
# HAUTE. Une fois ce geste acquis, `b`, `h`, `k` et `f` le réutilisent.
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
# ⭐ LE « t » EN QUATRE GESTES NOMMÉS (Frédéric, 07/09) :
#   1. on COMMENCE EN HAUT ;
#   2. on DESCEND TOUT DROIT ;
#   3. on finit par une PARABOLE CONVEXE posée sur la ligne, EXACTEMENT comme le
#      « l » — c'est le même geste de sortie, et c'est ce qui fait que les deux
#      lettres s'attachent pareil à la suivante ;
#   4. on LÈVE le crayon, et on trace un TRAIT HORIZONTAL au premier tiers.
# ⛔ Ma première version le faisait MONTER d'abord, avec une attaque. Faux : le
# « t » n'a pas d'attaque, il tombe.
# ⚠️ C'est la PREMIÈRE LETTRE À DEUX TRACÉS, comme le « 4 » et le « 7 ».
HAUT = 2.05
DEPART = np.array([0.10, HAUT, 0])
CORPS = [
    ((0.08, 1.45), (0.02, 0.80), (0.00, 0.30)),     # 2. la descente, DROITE
    ((-0.02, 0.10), (0.10, 0.00), (0.26, 0.02)),    # 3. le creux, sur la ligne
    ((0.42, 0.06), (0.56, 0.18), (0.70, 0.34)),     # la sortie, qui s'effile
]
# ⭐ La barre au PREMIER TIERS EN PARTANT DU HAUT.
Y_BARRE = HAUT * 2 / 3
BARRE = [np.array([-0.20, Y_BARRE, 0]), np.array([0.42, Y_BARRE, 0])]


# ⭐ Cinq noms concrets, tous avec la LETTRE « t » ET le SON [t] en initiale,
# tous dessinables en silhouette fermée.
MOTS_EN_T = ["table", "tomato", "train", "tent", "teacup"]


def chemin_t(stroke_width: float = 10, color: str = WHITE) -> VGroup:
    """Les deux tracés, séparés — jamais réunis en un seul chemin."""
    corps = chemin_bezier(DEPART, CORPS, stroke_width, color)
    barre = VMobject(stroke_width=stroke_width, stroke_color=color)
    barre.set_fill(opacity=0)
    barre.start_new_path(BARRE[0])
    barre.add_line_to(BARRE[1])
    return VGroup(corps, barre)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Une table vue de face : le plateau et quatre pieds."""
    plateau = Polygon(
        np.array([-0.62, 0.22, 0]), np.array([0.62, 0.22, 0]),
        np.array([0.62, 0.38, 0]), np.array([-0.62, 0.38, 0]),
        stroke_color=ORANGE_RETENUE, stroke_width=5,
    ).set_fill(opacity=0)
    pieds = VGroup(
        *[Line(np.array([x, 0.22, 0]), np.array([x * 1.06, -0.44, 0]),
               stroke_color=ORANGE_RETENUE, stroke_width=5)
          for x in (-0.50, -0.16, 0.16, 0.50)]
    )
    return VGroup(plateau, pieds)


def lit_dessine() -> VGroup:
    """Une tomate : le fruit rond et sa collerette."""
    fruit = Circle(radius=0.38, stroke_color=ROUGE_ERREUR, stroke_width=5)
    fruit.set_fill(opacity=0)
    collerette = VGroup(
        *[Line(np.array([0, 0.36, 0]),
               np.array([0.20 * np.cos(a), 0.36 + 0.16 * np.sin(a), 0]),
               stroke_color=VERT_OK, stroke_width=4)
          for a in (0.4, 1.05, 1.7, 2.35, 2.75)]
    )
    queue = Line(np.array([0, 0.36, 0]), np.array([0.02, 0.56, 0]),
                 stroke_color=VERT_OK, stroke_width=4)
    return VGroup(fruit, collerette, queue)


def livre_dessine() -> VGroup:
    """Un train : la locomotive, sa cheminée, un wagon."""
    loco = Polygon(
        np.array([-0.66, -0.24, 0]), np.array([-0.06, -0.24, 0]),
        np.array([-0.06, 0.20, 0]), np.array([-0.36, 0.20, 0]),
        np.array([-0.36, 0.02, 0]), np.array([-0.66, 0.02, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5,
    ).set_fill(opacity=0)
    cheminee = Rectangle(width=0.12, height=0.16, stroke_color=BLEU_CALCUL,
                         stroke_width=4).set_fill(opacity=0)
    cheminee.move_to(np.array([-0.56, 0.10, 0]))
    wagon = Rectangle(width=0.52, height=0.34, stroke_color=ORANGE_RETENUE,
                      stroke_width=5).set_fill(opacity=0)
    wagon.move_to(np.array([0.30, -0.07, 0]))
    roues = VGroup(
        *[Circle(radius=0.10, stroke_color=WHITE, stroke_width=4)
          .set_fill(opacity=0).move_to(np.array([x, -0.32, 0]))
          for x in (-0.50, -0.18, 0.14, 0.46)]
    )
    return VGroup(loco, cheminee, wagon, roues)


def lapin_dessine() -> VGroup:
    """A tent: a closed triangle with its door and a pole.

    ⛔ REMPLACE LE TAPIS DU FRANÇAIS. « rug » ne commence pas par un t, et
    j'avais mis le mot « tent » SUR LE DESSIN D'UN TAPIS : l'enfant aurait
    entendu un mot et vu autre chose. Le mot et l'image doivent coïncider —
    traduire la liste ne suffit pas, il faut traduire les DESSINS avec.
    """
    toile = Polygon(
        np.array([-0.58, -0.34, 0]), np.array([0.58, -0.34, 0]),
        np.array([0.00, 0.46, 0]),
        stroke_color=VERT_OK, stroke_width=5,
    ).set_fill(opacity=0)
    porte = Polygon(
        np.array([-0.14, -0.34, 0]), np.array([0.14, -0.34, 0]),
        np.array([0.00, 0.14, 0]),
        stroke_color=ORANGE_RETENUE, stroke_width=4,
    ).set_fill(opacity=0)
    mat = Line(np.array([0.00, 0.46, 0]), np.array([0.00, 0.62, 0]),
               stroke_color=WHITE, stroke_width=4)
    return VGroup(toile, porte, mat)


def lampe_dessine() -> VGroup:
    """Une tasse : le corps, l'anse, la vapeur."""
    corps = Polygon(
        np.array([-0.30, 0.30, 0]), np.array([0.30, 0.30, 0]),
        np.array([0.24, -0.34, 0]), np.array([-0.24, -0.34, 0]),
        stroke_color=WHITE, stroke_width=5,
    ).set_fill(opacity=0)
    anse = ArcBetweenPoints(
        np.array([0.30, 0.16, 0]), np.array([0.28, -0.16, 0]),
        angle=-2.2, stroke_color=WHITE, stroke_width=4,
    )
    soucoupe = Line(np.array([-0.44, -0.38, 0]), np.array([0.44, -0.38, 0]),
                    stroke_color=BLEU_CALCUL, stroke_width=5)
    vapeur = ArcBetweenPoints(
        np.array([-0.06, 0.40, 0]), np.array([0.08, 0.68, 0]),
        angle=1.4, stroke_color=GREY_B, stroke_width=3,
    )
    return VGroup(corps, anse, soucoupe, vapeur)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "en-lettre-t"
DUREE = {
    "00-aujourdhui": 3.60, "01-ecoute": 3.70, "02-regarde": 3.00, "03-depart": 25.16,
    "04-encore": 4.15, "05-cherchons": 4.50, "05-t-comme": 1.80, "06-table": 1.60,
    "07-tomate": 1.70, "08-train": 1.45, "09-tapis": 1.50, "10-tasse": 1.70,
    "10-pareil": 5.16, "11-relance": 3.60, "12-va-sur": 3.56, "14-bientot": 2.23,
}
CLIPS_MOTS = ["06-table", "07-tomate", "08-train", "09-tapis", "10-tasse"]


class _LetterTBase(Scene):
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
        son = Text("t", font_size=150, color=JAUNE_TITRE)
        titre = Text("the letter", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        garde, garde_main = page_de_garde(
            self, "t", chemin_t(stroke_width=12), MascotteMargouillat(),
            notion="Cursive letters",
            mains=("For right-handers", "For left-handers"),
            serie="Beautiful handwriting"
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
        lettre = chemin_t(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_t(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "t", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            refait = chemin_t(stroke_width=14 if not self.vertical else 16)
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

        titre_mots = Text("t as in…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_T, dessins):
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
        d = self.dire("05-t-comme")
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
            self.vertical, "t",
            consigne=("Find a word", "beginning with", "Find a word beginning with"),
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


class LetterTRight(_LetterTBase):
    """16:9, droitier."""


class LetterTLeft(_LetterTBase):
    """16:9, gaucher."""

    gaucher = True


class LetterTPortraitRight(Portrait, _LetterTBase):
    """9:16, droitier."""


class LetterTPortraitLeft(Portrait, _LetterTBase):
    """9:16, gaucher."""

    gaucher = True
