# Writing the cursive letter « s » — CP (English)
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
# ⭐ LE « s » EN COURBURES (Frédéric, 07/09), après CINQ essais à l'aveugle :
#   1. une COURBE CONVEXE — un creux qui monte depuis la ligne ;
#   2. une petite BOUCLE VERS LA GAUCHE, tout en haut ;
#   3. on repart VERS LA DROITE ;
#   4. un CREUX (convexe) puis une VOÛTE (concave) ;
#   5. on finit par une PARABOLE CONVEXE, vers la GAUCHE, posée sur la ligne.
#
# ⛔ MES CINQ PREMIERS ESSAIS METTAIENT LE VENTRE À GAUCHE et ignoraient la
# boucle du sommet : aucun ne pouvait converger. Et je n'ai même pas su lire le
# « s » sur la photo de Frédéric — je l'ai pris pour un « d ». Ma lecture d'une
# forme manuscrite n'est pas fiable ; la description en courbures, si.
# 👉 DEMANDER LA SUITE DES COURBURES AVANT LE PREMIER ESSAI, pas après le
# cinquième. Le « m » et le « h » ont coûté ZÉRO essai pour cette raison.
#
# ⚠️ Le « s » cursif n'est PAS le serpent de l'imprimé : il n'a pas deux ventres
# opposés, il a une boucle en haut et un seul ventre à droite.
# ⭐ Un seul tracé, pas de lever.
DEPART = np.array([-0.34, 0.06, 0])
COURBES = [
    ((-0.26, 0.16), (-0.10, 0.56), (0.02, 0.96)),   # 1. le creux qui monte
    ((0.08, 1.16), (-0.24, 1.12), (-0.12, 0.86)),   # 2. la BOUCLE, vers la GAUCHE
    ((-0.04, 0.72), (0.16, 0.70), (0.30, 0.60)),    # 3. on repart vers la DROITE
    ((0.44, 0.50), (0.44, 0.28), (0.28, 0.18)),     # 4a. le creux (convexe)
    ((0.16, 0.10), (0.00, 0.08), (-0.10, 0.16)),    # 4b. la voûte (concave)
    ((-0.20, 0.24), (-0.28, 0.14), (-0.18, 0.04)),  # 5. le creux final, à GAUCHE
]

# ⭐ « sun », « snake » et « salad » GARDENT LEUR DESSIN FRANÇAIS (soleil,
# serpent, salade) : même image, même ordre, la comparaison fr/gb reste lisible.
# « souris » et « sac » n'ont pas d'équivalent en s — deux COUPLES neufs.
# ⛔ TRADUIRE UNE LETTRE, C'EST TRADUIRE CINQ COUPLES MOT-IMAGE, PAS CINQ MOTS.
# Le 06/09 j'ai failli laisser « mouse » sur le dessin de la souris : le mot
# aurait commencé par un m devant une vidéo qui enseigne le s.
MOTS_EN_S = ["sun", "star", "snake", "sock", "salad"]


def chemin_s(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Un soleil : le disque et ses huit rayons."""
    disque = Circle(radius=0.26, stroke_color=JAUNE_TITRE, stroke_width=5)
    disque.set_fill(opacity=0)
    rayons = VGroup(
        *[Line(np.array([0.36 * np.cos(a), 0.36 * np.sin(a), 0]),
               np.array([0.54 * np.cos(a), 0.54 * np.sin(a), 0]),
               stroke_color=ORANGE_RETENUE, stroke_width=4)
          for a in np.linspace(0, 2 * np.pi, 9)[:-1]]
    )
    return VGroup(disque, rayons)


def lit_dessine() -> VGroup:
    """A star: five points, drawn in one closed outline."""
    pts = []
    for k in range(10):
        a = PI / 2 + k * PI / 5
        r = 0.52 if k % 2 == 0 else 0.22
        pts.append(np.array([r * np.cos(a), r * np.sin(a), 0]))
    return VGroup(Polygon(*pts, stroke_color=JAUNE_TITRE,
                          stroke_width=5).set_fill(opacity=0))


def livre_dessine() -> VGroup:
    """Un serpent : le corps ondulé, la tête, la langue."""
    corps = VMobject(stroke_color=VERT_OK, stroke_width=6)
    corps.set_fill(opacity=0)
    corps.start_new_path(np.array([-0.62, -0.32, 0]))
    corps.add_cubic_bezier_curve_to(
        np.array([-0.20, -0.46, 0]), np.array([-0.18, 0.04, 0]),
        np.array([0.10, -0.02, 0]))
    corps.add_cubic_bezier_curve_to(
        np.array([0.38, -0.08, 0]), np.array([0.14, 0.36, 0]),
        np.array([0.40, 0.40, 0]))
    tete = Ellipse(width=0.30, height=0.20, stroke_color=VERT_OK, stroke_width=5)
    tete.set_fill(opacity=0).move_to(np.array([0.52, 0.44, 0]))
    oeil = Dot(np.array([0.56, 0.48, 0]), radius=0.03)
    langue = Line(np.array([0.66, 0.42, 0]), np.array([0.84, 0.40, 0]),
                  stroke_color=ROUGE_ERREUR, stroke_width=3)
    return VGroup(corps, tete, oeil, langue)


def lapin_dessine() -> VGroup:
    """A sock: the leg, the heel, the toe, and its cuff."""
    forme = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=5)
    forme.set_fill(opacity=0)
    forme.start_new_path(np.array([-0.16, 0.48, 0]))
    forme.add_line_to(np.array([-0.16, -0.16, 0]))          # la jambe, à gauche
    forme.add_cubic_bezier_curve_to(                        # le talon
        np.array([-0.20, -0.44, 0]), np.array([-0.02, -0.50, 0]),
        np.array([0.24, -0.48, 0]))
    forme.add_cubic_bezier_curve_to(                        # la pointe du pied
        np.array([0.52, -0.46, 0]), np.array([0.52, -0.16, 0]),
        np.array([0.24, -0.14, 0]))
    forme.add_line_to(np.array([0.16, -0.14, 0]))
    forme.add_line_to(np.array([0.16, 0.48, 0]))            # la jambe, à droite
    forme.add_line_to(np.array([-0.16, 0.48, 0]))
    bord = Line(np.array([-0.16, 0.34, 0]), np.array([0.16, 0.34, 0]),
                stroke_color=JAUNE_TITRE, stroke_width=4)
    return VGroup(forme, bord)


def lampe_dessine() -> VGroup:
    """Une salade : le cœur et trois feuilles qui s'ouvrent en éventail."""
    # ⛔ PREMIÈRE VERSION : une boule cerclée avec des arcs VERTICAUX dedans.
    # Ça ne lisait pas « salade », ça lisait CITROUILLE — les arcs faisaient les
    # côtes du potiron. Une laitue ne se dessine pas par son contour rond mais
    # par ses feuilles SÉPARÉES qui s'écartent.
    def feuille(pointe, largeur, courbe):
        f = VMobject(stroke_color=VERT_OK, stroke_width=4)
        f.set_fill(opacity=0)
        f.start_new_path(np.array([0.00, -0.30, 0]))
        f.add_cubic_bezier_curve_to(
            np.array([pointe[0] - largeur - courbe, -0.02, 0]),
            np.array([pointe[0] - largeur, pointe[1] - 0.10, 0]),
            np.array([pointe[0], pointe[1], 0]))
        f.add_cubic_bezier_curve_to(
            np.array([pointe[0] + largeur, pointe[1] - 0.10, 0]),
            np.array([pointe[0] + largeur + courbe, -0.02, 0]),
            np.array([0.00, -0.30, 0]))
        return f

    feuilles = VGroup(
        feuille((-0.36, 0.26), 0.12, 0.14),
        feuille((0.00, 0.44), 0.14, 0.08),
        feuille((0.36, 0.26), 0.12, -0.14),
    )
    coeur = Arc(radius=0.20, start_angle=PI, angle=PI,
                stroke_color=VERT_OK, stroke_width=5)
    coeur.move_to(np.array([0.00, -0.22, 0]))
    return VGroup(feuilles, coeur)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "en-lettre-s"
DUREE = {
    "00-aujourdhui": 3.83, "01-ecoute": 4.00, "02-regarde": 3.18, "03-depart": 25.86,
    "04-encore": 4.15, "05-cherchons": 4.60, "05-s-comme": 1.95, "06-soleil": 1.71,
    "07-souris": 1.52, "08-serpent": 1.83, "09-sac": 1.74, "10-salade": 1.82,
    "10-pareil": 5.16, "11-relance": 3.68, "12-va-sur": 3.56, "14-bientot": 2.23,
}
CLIPS_MOTS = ["06-soleil", "07-souris", "08-serpent", "09-sac", "10-salade"]


class _LetterSBase(Scene):
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
        son = Text("s", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        garde, garde_main = page_de_garde(
            self, "s", chemin_s(stroke_width=12), MascotteMargouillat()
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
        lettre = chemin_s(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_s(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "s", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            trace = chemin_s(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── 4. « o » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        self.play(FadeOut(trace))

        titre_mots = Text("s as in…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_S, dessins):
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
        d = self.dire("05-s-comme")
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
            self.vertical, "s",
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


class LetterSRight(_LetterSBase):
    """16:9, droitier."""


class LetterSLeft(_LetterSBase):
    """16:9, gaucher."""

    gaucher = True


class LetterSPortraitRight(Portrait, _LetterSBase):
    """9:16, droitier."""


class LetterSPortraitLeft(Portrait, _LetterSBase):
    """9:16, gaucher."""

    gaucher = True
