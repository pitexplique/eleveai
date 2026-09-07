# Écriture de la lettre « l » en cursive — CP
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
DEPART = np.array([-0.95, 0.30, 0])
COURBES = [
    ((-0.70, 0.52), (-0.30, 0.86), (0.00, 1.05)),   # l'attaque, longue et plate
    ((0.16, 1.60), (0.02, 2.60), (0.22, 3.02)),     # la montée, dans la boucle
    ((0.46, 3.28), (0.72, 2.94), (0.66, 2.40)),     # le sommet de la goutte
    # ⭐ LA REDESCENTE EST UNE DROITE (Frédéric : « après la boucle descends
    # tout droit ») : ses contrôles sont posés SUR le segment.
    ((0.44, 1.95), (0.22, 1.50), (0.00, 1.05)),     # …et le CROISEMENT
    ((-0.06, 0.74), (-0.07, 0.48), (-0.06, 0.30)),  # le fût, droit
    # ⭐ LE BAS EST UNE PARABOLE CONVEXE, pas un crochet : elle descend jusqu'à
    # la ligne, s'y aplatit, et remonte symétriquement.
    # ⚠️ Le point bas se pose SUR la ligne (y = 0) : un « l » qui descend plus
    # bas devient un « j ».
    ((-0.08, 0.12), (0.02, 0.00), (0.18, 0.00)),
    ((0.36, 0.00), (0.52, 0.11), (0.66, 0.27)),
    ((0.76, 0.35), (0.84, 0.40), (0.92, 0.43)),     # la sortie, qui s'effile
]

# ⭐ Cinq noms concrets, tous avec la LETTRE « o » ET le SON [o] en initiale.
#
# ⭐ CINQ MOTS OÙ LE « l » EST EN INITIALE, et tous dessinables en silhouette
# fermée — la leçon payée trois fois (l'iris du « i », l'oreille du « o », la
# plume du « u »).
# ⚠️ Écartés : « lion » (une crinière est un faisceau de traits, pas une
# silhouette) et tous les mots en « ill » (fille, bille), où le « l » ne se
# prononce pas seul — même piège que « ou » pour le « o ».
MOTS_EN_L = ["lamp", "leaf", "lock", "log", "ladder"]


def chemin_l(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """A lamp: shade, stem, base — reused from the French « lampe »."""
    abat = Polygon(
        np.array([-0.34, 0.14, 0]), np.array([0.34, 0.14, 0]),
        np.array([0.22, 0.52, 0]), np.array([-0.22, 0.52, 0]),
        stroke_color=ORANGE_RETENUE, stroke_width=5,
    ).set_fill(opacity=0)
    pied = Line(np.array([0.00, 0.14, 0]), np.array([0.00, -0.34, 0]),
                stroke_color=WHITE, stroke_width=5)
    socle = Line(np.array([-0.26, -0.34, 0]), np.array([0.26, -0.34, 0]),
                 stroke_color=WHITE, stroke_width=5)
    return VGroup(abat, pied, socle)


def lit_dessine() -> VGroup:
    """A leaf: a closed silhouette with its central vein."""
    feuille = VMobject(stroke_color=VERT_OK, stroke_width=5)
    feuille.set_fill(opacity=0)
    feuille.start_new_path(np.array([-0.46, -0.24, 0]))
    feuille.add_cubic_bezier_curve_to(
        np.array([-0.30, 0.34, 0]), np.array([0.20, 0.52, 0]),
        np.array([0.46, 0.30, 0]))
    feuille.add_cubic_bezier_curve_to(
        np.array([0.30, -0.14, 0]), np.array([-0.10, -0.34, 0]),
        np.array([-0.46, -0.24, 0]))
    nervure = Line(np.array([-0.46, -0.24, 0]), np.array([0.40, 0.28, 0]),
                   stroke_color=VERT_OK, stroke_width=3)
    tige = Line(np.array([-0.46, -0.24, 0]), np.array([-0.64, -0.40, 0]),
                stroke_color=VERT_OK, stroke_width=4)
    return VGroup(feuille, nervure, tige)


def livre_dessine() -> VGroup:
    """A padlock: the body and the shackle."""
    corps = RoundedRectangle(width=0.60, height=0.48, corner_radius=0.08,
                             stroke_color=JAUNE_TITRE, stroke_width=5)
    corps.set_fill(opacity=0).move_to(np.array([0, -0.14, 0]))
    anse = Arc(radius=0.20, start_angle=0, angle=PI,
               stroke_color=GREY_B, stroke_width=5)
    anse.move_to(np.array([0, 0.20, 0]))
    trou = Circle(radius=0.06, stroke_color=JAUNE_TITRE, stroke_width=4)
    trou.set_fill(opacity=0).move_to(np.array([0, -0.10, 0]))
    return VGroup(anse, corps, trou)


def lapin_dessine() -> VGroup:
    """A log: a cylinder seen from the side, with its rings."""
    corps = RoundedRectangle(width=0.90, height=0.40, corner_radius=0.06,
                             stroke_color=ORANGE_RETENUE, stroke_width=5)
    corps.set_fill(opacity=0)
    bout = Ellipse(width=0.22, height=0.40, stroke_color=ORANGE_RETENUE,
                   stroke_width=5).set_fill(opacity=0).move_to(np.array([0.45, 0, 0]))
    cernes = VGroup(
        *[Ellipse(width=0.11, height=0.20, stroke_color=GREY_B, stroke_width=3)
          .set_fill(opacity=0).move_to(np.array([0.45, 0, 0])),
          Ellipse(width=0.05, height=0.09, stroke_color=GREY_B, stroke_width=3)
          .set_fill(opacity=0).move_to(np.array([0.45, 0, 0]))]
    )
    return VGroup(corps, bout, cernes)


def lampe_dessine() -> VGroup:
    """A ladder: two rails and four rungs."""
    montants = VGroup(
        Line(np.array([-0.26, -0.48, 0]), np.array([-0.18, 0.52, 0]),
             stroke_color=WHITE, stroke_width=5),
        Line(np.array([0.26, -0.48, 0]), np.array([0.18, 0.52, 0]),
             stroke_color=WHITE, stroke_width=5),
    )
    barreaux = VGroup(
        *[Line(np.array([-0.25 + k * 0.02, -0.34 + k * 0.28, 0]),
               np.array([0.25 - k * 0.02, -0.34 + k * 0.28, 0]),
               stroke_color=WHITE, stroke_width=4) for k in range(4)]
    )
    return VGroup(montants, barreaux)




# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "en-lettre-l"
DUREE = {
    "00-aujourdhui": 3.82, "01-ecoute": 3.98, "02-regarde": 3.16, "03-depart": 21.66,
    "04-encore": 4.15, "05-cherchons": 4.57, "05-l-comme": 1.83, "06-lune": 1.71,
    "07-lit": 1.61, "08-livre": 1.63, "09-lapin": 1.61, "10-lampe": 1.65,
    "10-pareil": 5.16, "11-relance": 3.65, "12-va-sur": 3.56, "14-bientot": 2.23,
}
CLIPS_MOTS = ["06-lune", "07-lit", "08-livre", "09-lapin", "10-lampe"]


class _LetterLBase(Scene):
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
        son = Text("l", font_size=150, color=JAUNE_TITRE)
        titre = Text("the letter", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        garde, garde_main = page_de_garde(
            self, "l", chemin_l(stroke_width=12), MascotteMargouillat(),
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
        lettre = chemin_l(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_l(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "l", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            trace = chemin_l(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── 4. « o » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        self.play(FadeOut(trace))

        titre_mots = Text("l as in…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_L, dessins):
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
        d = self.dire("05-l-comme")
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
            self.vertical, "l",
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


class LetterLRight(_LetterLBase):
    """16:9, droitier."""


class LetterLLeft(_LetterLBase):
    """16:9, gaucher."""

    gaucher = True


class LetterLPortraitRight(Portrait, _LetterLBase):
    """9:16, droitier."""


class LetterLPortraitLeft(Portrait, _LetterLBase):
    """9:16, gaucher."""

    gaucher = True
