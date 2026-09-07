# Écriture de la lettre « p » en cursive — CP
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
# ⭐ LE « p » EN DEUX TRACÉS (Frédéric, 07/09) :
#   1. une PARABOLE LÉGÈREMENT CONVEXE qui monte — l'attaque, INCURVÉE et non
#      un segment oblique : elle part presque à plat et se redresse ;
#   2. on arrive en haut, et on REDESCEND TOUT DROIT, À LA VERTICALE, jusque
#      SOUS la ligne ;
#   3. on SE POSITIONNE EN HAUT — donc un LEVER DE CRAYON ;
#   4. une PARABOLE CONCAVE (la voûte), puis une PARABOLE CONVEXE (le creux).
#
# ⭐⭐ « SE POSITIONNE EN HAUT » N'EST PAS « ON REMONTE SUR LE MÊME TRAIT ».
# Frédéric emploie les deux formules et les distingue : pour le « n » il a dit
# « on descend et remonte sur la même ligne » (pas de lever) ; ici il dit « se
# positionne » (lever). C'est la distinction qui décide de tout le montage — la
# machinerie à deux tracés n'est pas la même que celle à un seul.
#
# ⚠️ LE FÛT EST STRICTEMENT VERTICAL : tous ses points de contrôle partagent la
# même abscisse. Un fût penché a été refusé.
H = 1.00
DEPART = np.array([-0.50, 0.60, 0])
FUT = [
    ((-0.42, 0.61), (-0.30, 0.78), (-0.14, 1.04)),  # 1. l'attaque, INCURVÉE
    ((-0.05, 0.98), (-0.14, 0.80), (-0.14, 0.52)),  # le sommet tourne…
    ((-0.14, 0.20), (-0.14, -0.30), (-0.14, -0.72)),# 2. …et le fût plonge, VERTICAL
]
DEPART_2 = np.array([-0.13, 0.94, 0])
PANSE = [
    ((-0.06, 1.06), (0.18, 1.04), (0.26, 0.68)),    # 4a. la voûte
    ((0.30, 0.40), (0.30, 0.16), (0.30, 0.06)),     # …qui redescend
    ((0.32, -0.04), (0.46, -0.05), (0.60, 0.08)),   # 4b. le creux, sur la ligne
    ((0.70, 0.18), (0.78, 0.26), (0.88, 0.32)),     # la sortie, qui s'effile
]


# Cinq noms concrets, tous avec la LETTRE « p » ET le SON [p] en initiale,
# tous dessinables en silhouette fermee.
# ⛔ AUCUN des cinq mots français ne se traduit en gardant son dessin :
# ni « apple », ni « door », ni « bread », ni « basket » ne commencent par p.
# Il faut donc CINQ COUPLES mot-image neufs — c'est la règle apprise sur le
# « t », où j'avais mis « tent » sur le dessin d'un tapis.
MOTS_EN_P = ["pencil", "pig", "pot", "pizza", "plane"]


def chemin_p(stroke_width: float = 10, color: str = WHITE) -> VGroup:
    """Les deux tracés, séparés — jamais réunis en un seul chemin."""
    return VGroup(
        chemin_bezier(DEPART, FUT, stroke_width, color),
        chemin_bezier(DEPART_2, PANSE, stroke_width, color),
    )


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """A pencil: the body, the wooden tip, the lead."""
    corps = Polygon(
        np.array([-0.52, -0.10, 0]), np.array([0.30, -0.10, 0]),
        np.array([0.30, 0.14, 0]), np.array([-0.52, 0.14, 0]),
        stroke_color=JAUNE_TITRE, stroke_width=5,
    ).set_fill(opacity=0)
    bois = Polygon(
        np.array([0.30, -0.10, 0]), np.array([0.30, 0.14, 0]),
        np.array([0.56, 0.02, 0]),
        stroke_color=ORANGE_RETENUE, stroke_width=5,
    ).set_fill(opacity=0)
    mine = Line(np.array([0.48, 0.06, 0]), np.array([0.56, 0.02, 0]),
                stroke_color=WHITE, stroke_width=5)
    gomme = Polygon(
        np.array([-0.66, -0.10, 0]), np.array([-0.52, -0.10, 0]),
        np.array([-0.52, 0.14, 0]), np.array([-0.66, 0.14, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=4,
    ).set_fill(opacity=0)
    return VGroup(gomme, corps, bois, mine)


def lit_dessine() -> VGroup:
    """A pig: round body, snout, ear, curly tail."""
    corps = Ellipse(width=0.80, height=0.52, stroke_color=ROUGE_ERREUR,
                    stroke_width=5).set_fill(opacity=0)
    corps.move_to(np.array([-0.06, -0.06, 0]))
    groin = Ellipse(width=0.20, height=0.16, stroke_color=ROUGE_ERREUR,
                    stroke_width=4).set_fill(opacity=0)
    groin.move_to(np.array([0.38, -0.06, 0]))
    oreille = Polygon(
        np.array([0.10, 0.18, 0]), np.array([0.24, 0.44, 0]),
        np.array([0.30, 0.16, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=4).set_fill(opacity=0)
    oeil = Dot(np.array([0.24, 0.04, 0]), radius=0.035)
    queue = ArcBetweenPoints(np.array([-0.46, 0.02, 0]), np.array([-0.62, 0.16, 0]),
                             angle=-3.0, stroke_color=ROUGE_ERREUR, stroke_width=4)
    pattes = VGroup(
        *[Line(np.array([x, -0.30, 0]), np.array([x, -0.48, 0]),
               stroke_color=ROUGE_ERREUR, stroke_width=4) for x in (-0.24, 0.08)]
    )
    return VGroup(corps, groin, oreille, oeil, queue, pattes)


def livre_dessine() -> VGroup:
    """A pot: the body, the rim, two handles."""
    corps = Polygon(
        np.array([-0.34, 0.16, 0]), np.array([0.34, 0.16, 0]),
        np.array([0.26, -0.36, 0]), np.array([-0.26, -0.36, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5,
    ).set_fill(opacity=0)
    bord = Line(np.array([-0.42, 0.16, 0]), np.array([0.42, 0.16, 0]),
                stroke_color=BLEU_CALCUL, stroke_width=5)
    anses = VGroup(
        ArcBetweenPoints(np.array([-0.42, 0.14, 0]), np.array([-0.42, -0.06, 0]),
                         angle=2.2, stroke_color=BLEU_CALCUL, stroke_width=4),
        ArcBetweenPoints(np.array([0.42, -0.06, 0]), np.array([0.42, 0.14, 0]),
                         angle=2.2, stroke_color=BLEU_CALCUL, stroke_width=4),
    )
    vapeur = ArcBetweenPoints(np.array([-0.06, 0.28, 0]), np.array([0.08, 0.56, 0]),
                              angle=1.4, stroke_color=GREY_B, stroke_width=3)
    return VGroup(corps, bord, anses, vapeur)


def lapin_dessine() -> VGroup:
    """A pizza slice: the triangle, the crust, three toppings."""
    part = Polygon(
        np.array([0.00, -0.44, 0]), np.array([-0.38, 0.42, 0]),
        np.array([0.38, 0.42, 0]),
        stroke_color=JAUNE_TITRE, stroke_width=5,
    ).set_fill(opacity=0)
    croute = ArcBetweenPoints(np.array([-0.38, 0.42, 0]), np.array([0.38, 0.42, 0]),
                              angle=-0.7, stroke_color=ORANGE_RETENUE, stroke_width=5)
    garniture = VGroup(
        *[Circle(radius=0.06, stroke_color=ROUGE_ERREUR, stroke_width=4)
          .set_fill(opacity=0).move_to(np.array(p))
          for p in ((-0.12, 0.16, 0), (0.14, 0.18, 0), (0.00, -0.10, 0))]
    )
    return VGroup(part, croute, garniture)


def lampe_dessine() -> VGroup:
    """A plane: the fuselage, the wings, the tail."""
    fuselage = Ellipse(width=0.92, height=0.24, stroke_color=WHITE, stroke_width=5)
    fuselage.set_fill(opacity=0)
    aile = Polygon(
        np.array([-0.06, 0.00, 0]), np.array([0.14, 0.00, 0]),
        np.array([-0.06, 0.42, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5).set_fill(opacity=0)
    aile_bas = Polygon(
        np.array([-0.06, 0.00, 0]), np.array([0.14, 0.00, 0]),
        np.array([-0.06, -0.42, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5).set_fill(opacity=0)
    queue = Polygon(
        np.array([-0.46, 0.00, 0]), np.array([-0.34, 0.00, 0]),
        np.array([-0.50, 0.28, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5).set_fill(opacity=0)
    hublots = VGroup(
        *[Dot(np.array([x, 0.02, 0]), radius=0.03, color=GREY_B)
          for x in (0.10, 0.22, 0.34)]
    )
    return VGroup(fuselage, aile, aile_bas, queue, hublots)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "en-lettre-p"
DUREE = {
    "00-aujourdhui": 3.60, "01-ecoute": 3.70, "02-regarde": 3.00, "03-depart": 26.48,
    "04-encore": 4.15, "05-cherchons": 4.50, "05-p-comme": 1.80, "06-pomme": 1.60,
    "07-poule": 1.35, "08-porte": 1.30, "09-pain": 1.50, "10-panier": 1.45,
    "10-pareil": 5.16, "11-relance": 3.60, "12-va-sur": 3.56, "14-bientot": 2.23,
}
CLIPS_MOTS = ["06-pomme", "07-poule", "08-porte", "09-pain", "10-panier"]


class _LetterPBase(Scene):
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
        son = Text("p", font_size=150, color=JAUNE_TITRE)
        titre = Text("the letter", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À 1 SECONDE ──────────────────────────
        garde, garde_main = page_de_garde(
            self, "p", chemin_p(stroke_width=12), MascotteMargouillat(),
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
        lettre = chemin_p(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_p(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "p", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            refait = chemin_p(stroke_width=14 if not self.vertical else 16)
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

        titre_mots = Text("p as in…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_P, dessins):
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
        d = self.dire("05-p-comme")
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
            self.vertical, "p",
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


class LetterPRight(_LetterPBase):
    """16:9, droitier."""


class LetterPLeft(_LetterPBase):
    """16:9, gaucher."""

    gaucher = True


class LetterPPortraitRight(Portrait, _LetterPBase):
    """9:16, droitier."""


class LetterPPortraitLeft(Portrait, _LetterPBase):
    """9:16, gaucher."""

    gaucher = True
