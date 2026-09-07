# Écriture de la lettre « m » en cursive — CP
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
from chiffre_commune import main_ouverte  # noqa: E402

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
# ⭐⭐ LE « m » EST LE « n » AVEC UN PONT DE PLUS, et c'est la démonstration que
# la grammaire des gestes paie : le « n » a demandé QUATRE essais, le « m »
# ZÉRO. Même crosse tournée vers la gauche, même remontée sur le même trait,
# même creux final. Un seul geste s'ajoute : descente + remontée + second pont.
# ⭐ Et c'est aussi la leçon pour l'enfant : qui sait écrire le « n » sait déjà
# écrire le « m », il répète une fois de plus. La voix le dit en toutes lettres.
# ⚠️ Les ponts sont RESSERRÉS par rapport au « n » (0,40 au lieu de 0,46) : à
# trois jambes, la lettre dépasserait sinon la largeur utile. Mesuré : 1,85
# pour 3,90 utiles.
H = 1.00
DEPART = np.array([-0.62, 0.84, 0])
COURBES = [
    ((-0.60, H + 0.06), (-0.38, H + 0.08), (-0.32, 0.86)),  # 1. la crosse, vers la GAUCHE
    ((-0.31, 0.58), (-0.30, 0.30), (-0.30, 0.05)),          # 2. la descente
    ((-0.30, 0.20), (-0.30, 0.38), (-0.29, 0.54)),          # 3. la remontée, MÊME TRAIT
    ((-0.24, 0.88), (-0.04, H + 0.04), (0.10, H - 0.02)),   # 4. le premier pont
    ((0.16, 0.72), (0.17, 0.34), (0.17, 0.05)),             # 5. la descente
    ((0.17, 0.20), (0.17, 0.38), (0.18, 0.54)),             # 6. la remontée, MÊME TRAIT
    ((0.23, 0.88), (0.43, H + 0.04), (0.57, H - 0.02)),     # 7. le second pont
    ((0.63, 0.72), (0.64, 0.34), (0.64, 0.08)),             # 8. la descente
    ((0.66, -0.02), (0.81, -0.03), (0.95, 0.10)),           # le creux, sur la ligne
    ((1.05, 0.20), (1.13, 0.28), (1.23, 0.34)),             # la sortie, qui s'effile
]

# ⭐ Cinq noms concrets, tous avec la LETTRE « o » ET le SON [o] en initiale.
#
# ⭐ CINQ MOTS OÙ LE « l » EST EN INITIALE, et tous dessinables en silhouette
# fermée — la leçon payée trois fois (l'iris du « i », l'oreille du « o », la
# plume du « u »).
# ⚠️ Écartés : « lion » (une crinière est un faisceau de traits, pas une
# silhouette) et tous les mots en « ill » (fille, bille), où le « l » ne se
# prononce pas seul — même piège que « ou » pour le « o ».
# ⚠️ DESSINS À FAIRE : nid, nuage, note, navire, nappe.
# ⚠️ DESSINS À FAIRE : maison, montagne, main, moto, melon.
# ⭐ « main » réutilise `main_ouverte()` de `chiffre_commune` — le référent
# corporel du « 5 » resservira ici.
MOTS_EN_M = ["maison", "montagne", "main", "moto", "melon"]


def chemin_m(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Une maison : les murs, le toit, la porte, une fenêtre."""
    murs = Polygon(
        np.array([-0.44, -0.40, 0]), np.array([0.44, -0.40, 0]),
        np.array([0.44, 0.16, 0]), np.array([-0.44, 0.16, 0]),
        stroke_color=WHITE, stroke_width=5,
    ).set_fill(opacity=0)
    toit = Polygon(
        np.array([-0.56, 0.16, 0]), np.array([0.56, 0.16, 0]),
        np.array([0.00, 0.58, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=5,
    ).set_fill(opacity=0)
    porte = Polygon(
        np.array([-0.12, -0.40, 0]), np.array([0.12, -0.40, 0]),
        np.array([0.12, -0.02, 0]), np.array([-0.12, -0.02, 0]),
        stroke_color=ORANGE_RETENUE, stroke_width=4,
    ).set_fill(opacity=0)
    fenetre = Polygon(
        np.array([0.20, -0.06, 0]), np.array([0.36, -0.06, 0]),
        np.array([0.36, 0.08, 0]), np.array([0.20, 0.08, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=4,
    ).set_fill(opacity=0)
    return VGroup(murs, toit, porte, fenetre)


def lit_dessine() -> VGroup:
    """Une montagne : deux sommets et la neige au-dessus."""
    massif = Polygon(
        np.array([-0.62, -0.34, 0]), np.array([-0.16, 0.42, 0]),
        np.array([0.06, 0.10, 0]), np.array([0.30, 0.50, 0]),
        np.array([0.62, -0.34, 0]),
        stroke_color=WHITE, stroke_width=5,
    ).set_fill(opacity=0)
    neige = VGroup(
        Polygon(np.array([-0.28, 0.22, 0]), np.array([-0.16, 0.42, 0]),
                np.array([-0.05, 0.24, 0]),
                stroke_color=BLEU_CALCUL, stroke_width=4).set_fill(opacity=0),
        Polygon(np.array([0.19, 0.32, 0]), np.array([0.30, 0.50, 0]),
                np.array([0.40, 0.30, 0]),
                stroke_color=BLEU_CALCUL, stroke_width=4).set_fill(opacity=0),
    )
    return VGroup(massif, neige)


def livre_dessine() -> VGroup:
    """Une main ouverte — ⭐ le même dessin que le référent du « 5 »."""
    return main_ouverte(5).scale(0.72)


def lapin_dessine() -> VGroup:
    """Une moto : deux roues, le cadre, le guidon."""
    roues = VGroup(
        *[Circle(radius=0.19, stroke_color=WHITE, stroke_width=5)
          .set_fill(opacity=0).move_to(np.array([x, -0.24, 0]))
          for x in (-0.40, 0.40)]
    )
    cadre = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=5)
    cadre.set_fill(opacity=0)
    cadre.start_new_path(np.array([-0.40, -0.24, 0]))
    cadre.add_line_to(np.array([-0.06, 0.06, 0]))
    cadre.add_line_to(np.array([0.28, 0.06, 0]))
    cadre.add_line_to(np.array([0.40, -0.24, 0]))
    guidon = Line(np.array([0.28, 0.06, 0]), np.array([0.44, 0.28, 0]),
                  stroke_color=WHITE, stroke_width=5)
    barre = Line(np.array([0.32, 0.32, 0]), np.array([0.58, 0.24, 0]),
                 stroke_color=WHITE, stroke_width=4)
    return VGroup(roues, cadre, guidon, barre)


def lampe_dessine() -> VGroup:
    """Un melon : le fruit rond, ses côtes, sa queue."""
    fruit = Circle(radius=0.38, stroke_color=VERT_OK, stroke_width=5)
    fruit.set_fill(opacity=0)
    cotes = VGroup(
        *[ArcBetweenPoints(np.array([0, 0.38, 0]), np.array([0, -0.38, 0]),
                           angle=a, stroke_color=VERT_OK, stroke_width=3)
          for a in (-0.9, -0.3, 0.3, 0.9)]
    )
    queue = Line(np.array([0, 0.38, 0]), np.array([0.04, 0.54, 0]),
                 stroke_color=ORANGE_RETENUE, stroke_width=4)
    return VGroup(fruit, cotes, queue)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-m"
DUREE = {
    "00-aujourdhui": 3.40, "01-ecoute": 3.10, "02-regarde": 3.10, "03-depart": 21.00,
    "04-encore": 2.92, "05-cherchons": 4.27, "05-m-comme": 1.66, "06-maison": 1.55,
    "07-montagne": 1.75, "08-main": 1.35, "09-moto": 1.40, "10-melon": 1.50,
    "10-pareil": 4.71, "11-relance": 3.08, "12-va-sur": 3.16, "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-maison", "07-montagne", "08-main", "09-moto", "10-melon"]


class _LettreMBase(Scene):
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
        son = Text("m", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        garde, garde_main = page_de_garde(
            self, "m", chemin_m(stroke_width=12), MascotteMargouillat()
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
        lettre = chemin_m(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_m(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "m", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            trace = chemin_m(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── 4. « o » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        self.play(FadeOut(trace))

        titre_mots = Text("m comme…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_M, dessins):
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
        d = self.dire("05-m-comme")
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
        relance = ecran_relance(self.vertical, "m")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN ───────────────────────────────────────────────
        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class LettreMCp(_LettreMBase):
    """16:9, droitier."""


class LettreMCpGaucher(_LettreMBase):
    """16:9, gaucher."""

    gaucher = True


class LettreMCpPortrait(Portrait, _LettreMBase):
    """9:16, droitier."""


class LettreMCpPortraitGaucher(Portrait, _LettreMBase):
    """9:16, gaucher."""

    gaucher = True
