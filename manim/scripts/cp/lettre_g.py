# Écriture de la lettre « g » en cursive — CP
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


# ⭐ CINQ MOTS AU SON [g] DUR, tous avec un g suivi de a, o ou u.
# ⛔ ÉCARTÉS, et c'est le piège propre à cette lettre :
#   — « girafe », « genou » : le g y fait [ʒ], un AUTRE son. Les mettre ici
#     enseignerait deux sons sous une seule lettre ;
#   — « guitare », « guêpe » : le son est bon, mais l'enfant VOIT « gui », pas
#     « g ». On ne montre pas une exception d'orthographe dans la leçon du son ;
#   — « grenouille », « glace » : groupes [gr] et [gl], le même piège que
#     « stylo » pour le « s ».
# ⭐ Trois sur cinq sont du vivant ou du ciel.
MOTS_EN_G = ["gâteau", "gomme", "gorille", "goutte", "galet"]


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Un gâteau : deux étages, une bougie, sa flamme."""
    bas = Polygon(
        np.array([-0.40, -0.36, 0]), np.array([0.40, -0.36, 0]),
        np.array([0.40, -0.02, 0]), np.array([-0.40, -0.02, 0]),
        stroke_color=ORANGE_RETENUE, stroke_width=5).set_fill(opacity=0)
    haut = Polygon(
        np.array([-0.26, -0.02, 0]), np.array([0.26, -0.02, 0]),
        np.array([0.26, 0.22, 0]), np.array([-0.26, 0.22, 0]),
        stroke_color=ORANGE_RETENUE, stroke_width=5).set_fill(opacity=0)
    glacage = VGroup(
        *[ArcBetweenPoints(np.array([-0.26 + k * 0.17, 0.22, 0]),
                           np.array([-0.09 + k * 0.17, 0.22, 0]),
                           angle=-2.0, stroke_color=ROUGE_ERREUR, stroke_width=3)
          for k in range(3)]
    )
    bougie = Line(np.array([0.00, 0.22, 0]), np.array([0.00, 0.48, 0]),
                  stroke_color=BLEU_CALCUL, stroke_width=4)
    # ⛔ La flamme était une ELLIPSE : ça lisait comme un anneau posé sur un
    # fil. Une flamme a une POINTE en haut et un ventre en bas.
    flamme = VMobject(stroke_color=JAUNE_TITRE, stroke_width=4)
    flamme.set_fill(opacity=0)
    flamme.start_new_path(np.array([0.00, 0.66, 0]))
    flamme.add_cubic_bezier_curve_to(
        np.array([0.09, 0.56, 0]), np.array([0.09, 0.46, 0]),
        np.array([0.00, 0.46, 0]))
    flamme.add_cubic_bezier_curve_to(
        np.array([-0.09, 0.46, 0]), np.array([-0.09, 0.56, 0]),
        np.array([0.00, 0.66, 0]))
    return VGroup(bas, haut, glacage, bougie, flamme)


def lit_dessine() -> VGroup:
    """Une gomme : le bloc en perspective, et sa bande de couleur."""
    face = Polygon(
        np.array([-0.34, -0.22, 0]), np.array([0.26, -0.22, 0]),
        np.array([0.26, 0.14, 0]), np.array([-0.34, 0.14, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=5).set_fill(opacity=0)
    dessus = Polygon(
        np.array([-0.34, 0.14, 0]), np.array([-0.20, 0.30, 0]),
        np.array([0.40, 0.30, 0]), np.array([0.26, 0.14, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=4).set_fill(opacity=0)
    cote = Polygon(
        np.array([0.26, -0.22, 0]), np.array([0.40, -0.06, 0]),
        np.array([0.40, 0.30, 0]), np.array([0.26, 0.14, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=4).set_fill(opacity=0)
    bande = Line(np.array([-0.34, -0.04, 0]), np.array([0.26, -0.04, 0]),
                 stroke_color=BLEU_CALCUL, stroke_width=4)
    return VGroup(face, dessus, cote, bande)


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
    """Une goutte : la pointe en haut, le ventre rond en bas, et son reflet."""
    goutte = VMobject(stroke_color=BLEU_CALCUL, stroke_width=5)
    goutte.set_fill(opacity=0)
    goutte.start_new_path(np.array([0.00, 0.52, 0]))
    goutte.add_cubic_bezier_curve_to(
        np.array([0.10, 0.20, 0]), np.array([0.34, 0.02, 0]),
        np.array([0.34, -0.16, 0]))
    goutte.add_cubic_bezier_curve_to(
        np.array([0.34, -0.42, 0]), np.array([-0.34, -0.42, 0]),
        np.array([-0.34, -0.16, 0]))
    goutte.add_cubic_bezier_curve_to(
        np.array([-0.34, 0.02, 0]), np.array([-0.10, 0.20, 0]),
        np.array([0.00, 0.52, 0]))
    reflet = ArcBetweenPoints(np.array([-0.18, -0.20, 0]), np.array([-0.10, 0.02, 0]),
                              angle=0.8, stroke_color=WHITE, stroke_width=3)
    return VGroup(goutte, reflet)


def lampe_dessine() -> VGroup:
    """Un galet : trois pierres empilées, lisses et inégales — un cairn."""
    # ⛔ CE MOT REMPLACE « gazelle », ABANDONNÉE APRÈS DEUX ESSAIS. En morceaux
    # elle lisait « bâton à cornes » ; en tête de profil, « poisson ». Le « g »
    # n'a que cinq mots possibles au son [g] dur ET dessinables : autant qu'ils
    # soient tous nets. Un galet est du naturel, et trois pierres empilées ne
    # ressemblent à rien d'autre.
    pierres = VGroup(
        Ellipse(width=0.68, height=0.26, stroke_color=GREY_B, stroke_width=5)
        .set_fill(opacity=0).move_to(np.array([0.00, -0.34, 0])),
        Ellipse(width=0.50, height=0.24, stroke_color=GREY_B, stroke_width=5)
        .set_fill(opacity=0).move_to(np.array([0.03, -0.08, 0])).rotate(0.10),
        Ellipse(width=0.34, height=0.22, stroke_color=GREY_B, stroke_width=5)
        .set_fill(opacity=0).move_to(np.array([-0.02, 0.16, 0])).rotate(-0.14),
    )
    # Deux reflets : c'est ce qui dit « poli par l'eau » plutôt que « caillou ».
    reflets = VGroup(
        ArcBetweenPoints(np.array([-0.20, -0.30, 0]), np.array([-0.04, -0.28, 0]),
                         angle=-0.8, stroke_color=WHITE, stroke_width=2),
        ArcBetweenPoints(np.array([-0.12, 0.20, 0]), np.array([-0.02, 0.21, 0]),
                         angle=-0.8, stroke_color=WHITE, stroke_width=2),
    )
    sol = Line(np.array([-0.46, -0.48, 0]), np.array([0.46, -0.48, 0]),
               stroke_color=GREY_B, stroke_width=2)
    return VGroup(sol, pierres, reflets)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-g"
DUREE = { "00-aujourdhui": 3.36, "01-ecoute": 3.14, "02-regarde": 3.11,
    "03-depart": 24.36, "04-encore": 2.92, "05-cherchons": 4.63,
    "05-g-comme": 1.71, "06-gateau": 1.56, "07-gomme": 1.49,
    "08-gorille": 1.68, "09-goutte": 1.49, "10-galet": 1.49,
    "10-pareil": 4.71, "11-relance": 3.44, "12-va-sur": 3.16,
    "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-gateau", "07-gomme", "08-gorille", "09-goutte",
              "10-galet"]


class _LettreGBase(Scene):
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

        titre_mots = Text("g comme…", font_size=50)
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
        relance = ecran_relance(self.vertical, "g")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN ───────────────────────────────────────────────
        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class LettreGCp(_LettreGBase):
    """16:9, droitier."""


class LettreGCpGaucher(_LettreGBase):
    """16:9, gaucher."""

    gaucher = True


class LettreGCpPortrait(Portrait, _LettreGBase):
    """9:16, droitier."""


class LettreGCpPortraitGaucher(Portrait, _LettreGBase):
    """9:16, gaucher."""

    gaucher = True
