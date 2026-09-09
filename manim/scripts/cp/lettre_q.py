# Écriture de la lettre « q » en cursive — CP
#
# ⭐⭐ LA LETTRE QUI NE SE PROMÈNE JAMAIS SEULE. En français, `q` n'existe
# pratiquement pas sans son `u` : aucun mot courant ne commence par « q » suivi
# d'une voyelle. La leçon est donc « q u », et la voix le dit — enseigner le
# son du `q` seul apprendrait un son qui n'existe pas.
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
# ─── Le chemin du « q » ──────────────────────────────────────────────────────
# ⭐ LE « q » EN DEUX TRACÉS (Frédéric, 08/09, photo à l'appui) :
#   1. on fait un « o » ;
#   2. le trait COLLE au flanc droit, démarre un peu plus haut, et DESCEND
#      VERTICALEMENT sous la ligne ;
#   3. on LÈVE LE CRAYON ;
#   4. une parabole convexe part à droite du point vert et descend TOUCHER la
#      ligne — c'est elle qui attachera la lettre suivante.
#
# ⛔⛔ HUIT ESSAIS, ET TROIS PIÈGES QUI SE RESSEMBLENT :
#   1. sa PREMIÈRE description parlait d'un « crochet vers la droite puis un
#      petit trait montant » — le poisson. Sa PHOTO montrait un trait droit qui
#      s'arrête net et une attache détachée. 👉 LA PHOTO GAGNE : la description
#      raconte le souvenir du geste, la photo montre le résultat ;
#   2. l'ÉPERON DU SOMMET, trois fois. Tant que le rond FERMAIT (retour vers la
#      gauche) avant que le trait REMONTE (vers la droite), les deux directions
#      se heurtaient sur un même point. La solution n'est pas de corriger la
#      pointe : c'est de NE PAS FERMER. Le rond remonte son flanc droit d'un
#      seul geste et le trait passe en ARCHE par-dessus — un demi-tour serré
#      dans un trait épais reste pointu, même « arrondi » ;
#   3. le fût « penchait » : il allait de 0,20 à 0,14, une dérive de 0,06 sur
#      toute la hauteur. Invisible dans les chiffres, très visible au rendu.
#      x CONSTANT — c'est le seul moyen d'être vertical.
#
# ⚠️ Et le petit pic qui reste au sommet est celui du « a », rendu et vérifié :
# c'est la signature de la famille a/d/q, pas un défaut. AVANT DE CORRIGER UN
# DÉFAUT, RENDRE LA LETTRE VOISINE.
DEPART = np.array([0.10, 0.90, 0])
ROND = [
    ((-0.16, 1.06), (-0.84, 0.98), (-0.84, 0.44)),   # 1. par le haut, vers la GAUCHE
    ((-0.84, -0.02), (-0.14, -0.04), (0.06, 0.40)),  # 2. le bas du rond
    ((0.16, 0.62), (0.18, 0.82), (0.10, 0.90)),      # 3. on FERME AU POINT VERT
]
# ⭐⭐ LE FÛT EST UN TRACÉ À PART (Frédéric, 08/09) : « tu termines au point
# vert, et APRÈS tu lèves le stylo, tu vas un peu en haut et tu traces la ligne
# verticale ». C'est ce lever qui règle tout : plus de demi-tour au sommet,
# donc plus d'éperon — et le trait peut être VRAIMENT vertical, x constant.
# ⛔ J'avais passé six essais à supprimer une pointe qui n'existait que parce
# que je faisais le rond et le fût D'UN SEUL GESTE. Le défaut n'était pas dans
# la courbe, il était dans le NOMBRE DE TRACÉS.
DEPART_2 = np.array([0.14, 1.12, 0])
FUT = [
    ((0.14, 0.60), (0.14, -0.18), (0.14, -0.95)),    # LA LIGNE, x CONSTANT
]
# ⚠️ L'attache part DU POINT VERT LUI-MÊME (Frédéric), pas à sa droite : c'est
# le même point que le départ du rond. Posée à 0,22 elle semblait sortir du
# fût ; à 0,36, plus tôt, elle lisait comme une virgule oubliée à côté.
DEPART_3 = np.array([0.10, 0.90, 0])
ATTACHE = [
    ((0.20, 0.62), (0.32, 0.32), (0.48, 0.15)),      # on descend doucement
    ((0.60, 0.03), (0.73, 0.01), (0.86, 0.05)),      # …et on TOUCHE la ligne
]


def chemin_q(stroke_width: float = 10, color: str = WHITE) -> VGroup:
    """LES TROIS TRACÉS, séparés — le rond, le fût, l'attache."""
    return VGroup(
        chemin_bezier(DEPART, ROND, stroke_width, color),
        chemin_bezier(DEPART_2, FUT, stroke_width, color),
        chemin_bezier(DEPART_3, ATTACHE, stroke_width, color),
    )


# ⭐ CINQ MOTS EN « qu », parce que le « q » seul n'existe pas en français.
# ⚠️ C'est la lettre la PLUS PAUVRE de la série : presque tous ses mots sont
# abstraits (quand, quel, question) ou hors de portée d'un CP. Ces cinq-là sont
# les seuls à la fois concrets, connus et dessinables.
# ⛔ « quinze » a été écarté : un nombre ne se dessine pas sans écrire son
# chiffre, et montrer un « 15 » dans une vidéo d'écriture de lettre brouille.
MOTS_EN_Q = ["quatre", "queue", "quille", "quiche", "quartier"]


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Quatre : quatre étoiles, deux par deux — on les compte d'un coup d'œil."""
    return VGroup(
        *[Star(n=5, outer_radius=0.20, inner_radius=0.09,
               stroke_color=JAUNE_TITRE, stroke_width=4).set_fill(opacity=0)
          .move_to(np.array([x, y, 0]))
          for x in (-0.26, 0.26) for y in (0.26, -0.26)]
    )


def lit_dessine() -> VGroup:
    """Une queue : le chat vu de dos, et sa queue DRESSÉE — c'est elle le sujet."""
    corps = VMobject(stroke_color=GREY_B, stroke_width=5)
    corps.set_fill(opacity=0)
    # ⛔ Le corps etait une arche droite : ça lisait « pierre tombale ». Un chat
    # de dos a un dos ROND et des epaules plus larges que la tete.
    corps.start_new_path(np.array([-0.34, -0.40, 0]))
    corps.add_cubic_bezier_curve_to(
        np.array([-0.36, -0.06, 0]), np.array([-0.26, 0.14, 0]),
        np.array([-0.12, 0.14, 0]))
    corps.add_cubic_bezier_curve_to(
        np.array([0.02, 0.14, 0]), np.array([0.12, -0.06, 0]),
        np.array([0.10, -0.40, 0]))
    corps.add_line_to(np.array([-0.34, -0.40, 0]))
    oreilles = VGroup(
        *[Polygon(np.array([x - 0.07, 0.02, 0]), np.array([x, 0.20, 0]),
                  np.array([x + 0.07, 0.02, 0]),
                  stroke_color=GREY_B, stroke_width=4).set_fill(opacity=0)
          for x in (-0.20, -0.02)]
    )
    # La queue : ORANGE, pour qu'on sache que c'est elle qu'on nomme.
    queue = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=6)
    queue.set_fill(opacity=0)
    queue.start_new_path(np.array([0.04, -0.34, 0]))
    queue.add_cubic_bezier_curve_to(
        np.array([0.36, -0.30, 0]), np.array([0.44, 0.10, 0]),
        np.array([0.34, 0.36, 0]))
    queue.add_cubic_bezier_curve_to(
        np.array([0.28, 0.52, 0]), np.array([0.52, 0.56, 0]),
        np.array([0.54, 0.40, 0]))
    sol = Line(np.array([-0.44, -0.42, 0]), np.array([0.20, -0.42, 0]),
               stroke_color=GREY_B, stroke_width=2)
    return VGroup(sol, queue, corps, oreilles)


def livre_dessine() -> VGroup:
    """Une quille : le corps en sablier, son col, et la boule à côté."""
    quille = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=5)
    quille.set_fill(opacity=0)
    quille.start_new_path(np.array([-0.16, -0.44, 0]))
    quille.add_cubic_bezier_curve_to(
        np.array([-0.20, -0.10, 0]), np.array([-0.09, -0.02, 0]),
        np.array([-0.08, 0.14, 0]))
    quille.add_cubic_bezier_curve_to(
        np.array([-0.08, 0.36, 0]), np.array([0.08, 0.36, 0]),
        np.array([0.08, 0.14, 0]))
    quille.add_cubic_bezier_curve_to(
        np.array([0.09, -0.02, 0]), np.array([0.20, -0.10, 0]),
        np.array([0.16, -0.44, 0]))
    quille.add_line_to(np.array([-0.16, -0.44, 0]))
    col = Line(np.array([-0.085, 0.06, 0]), np.array([0.085, 0.06, 0]),
               stroke_color=ROUGE_ERREUR, stroke_width=3)
    boule = Circle(radius=0.17, stroke_color=BLEU_CALCUL, stroke_width=5)
    boule.set_fill(opacity=0).move_to(np.array([0.48, -0.28, 0]))
    # ⛔ La boule avait DEUX TROUS SYMETRIQUES : ça lisait « smiley ». Trois
    # trous en triangle, décalés, disent « boule de bowling » sans faire un
    # visage. Deux points alignés dans un rond font toujours des yeux.
    trous = VGroup(
        *[Dot(np.array([0.48 + dx, -0.24 + dy, 0]), radius=0.026,
              color=BLEU_CALCUL)
          for dx, dy in ((-0.05, 0.06), (0.05, 0.06), (0.00, -0.02))]
    )
    return VGroup(quille, col, boule, trous)


def lapin_dessine() -> VGroup:
    """Une quiche : le moule cannelé vu de dessus, et ses parts."""
    bord = Circle(radius=0.40, stroke_color=ORANGE_RETENUE, stroke_width=5)
    bord.set_fill(opacity=0)
    garniture = Circle(radius=0.30, stroke_color=JAUNE_TITRE, stroke_width=4)
    garniture.set_fill(opacity=0)
    parts = VGroup(
        *[Line(np.array([0.30 * np.cos(a), 0.30 * np.sin(a), 0]),
               np.array([0.40 * np.cos(a), 0.40 * np.sin(a), 0]),
               stroke_color=ORANGE_RETENUE, stroke_width=3)
          for a in np.linspace(0, 2 * np.pi, 13)[:-1]]
    )
    lardons = VGroup(
        *[Line(np.array([x, y, 0]), np.array([x + 0.09, y + 0.04, 0]),
               stroke_color=ROUGE_ERREUR, stroke_width=3)
          for x, y in ((-0.14, 0.08), (0.02, -0.10), (-0.06, -0.16),
                       (0.10, 0.12))]
    )
    return VGroup(bord, parts, garniture, lardons)


def lampe_dessine() -> VGroup:
    """Un quartier d'orange : la TRANCHE EN HAUT, la peau arrondie en bas."""
    # ⛔ PREMIERE VERSION : la peau en haut et la tranche en bas — ça lisait
    # comme un pont, ou un dôme. Un quartier posé se voit COUCHÉ : le côté
    # coupé, droit, est EN HAUT, et la peau fait le ventre en dessous.
    part = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=5)
    part.set_fill(opacity=0)
    part.start_new_path(np.array([-0.44, 0.20, 0]))
    part.add_line_to(np.array([0.44, 0.20, 0]))          # la TRANCHE, droite, en haut
    part.add_cubic_bezier_curve_to(                      # la peau, qui fait le ventre
        np.array([0.34, -0.34, 0]), np.array([-0.34, -0.34, 0]),
        np.array([-0.44, 0.20, 0]))
    chair = VMobject(stroke_color=JAUNE_TITRE, stroke_width=3)
    chair.set_fill(opacity=0)
    chair.start_new_path(np.array([-0.35, 0.14, 0]))
    chair.add_line_to(np.array([0.35, 0.14, 0]))
    chair.add_cubic_bezier_curve_to(
        np.array([0.27, -0.24, 0]), np.array([-0.27, -0.24, 0]),
        np.array([-0.35, 0.14, 0]))
    fibres = VGroup(
        *[Line(np.array([x, 0.14, 0]), np.array([x * 0.55, -0.18, 0]),
               stroke_color=JAUNE_TITRE, stroke_width=2)
          for x in (-0.24, -0.08, 0.08, 0.24)]
    )
    return VGroup(part, chair, fibres)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-q"
DUREE = { "00-aujourdhui": 3.33, "01-ecoute": 3.11, "02-regarde": 3.13,
    "03-depart": 24.05, "04-encore": 2.92, "05-cherchons": 9.28,
    "05-q-comme": 1.78, "06-quatre": 1.52, "07-queue": 1.29,
    "08-quille": 1.48, "09-quiche": 1.52, "10-pareil": 4.71,
    "10-quartier": 1.68, "11-relance": 3.15, "12-va-sur": 3.16,
    "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-quatre", "07-queue", "08-quille", "09-quiche",
              "10-quartier"]


class _LettreQBase(Scene):
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
        son = Text("q", font_size=150, color=JAUNE_TITRE)
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
            self, "q", chemin_q(stroke_width=7), MascotteMargouillat(),
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
        lettre = chemin_q(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_q(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "q", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            refait = chemin_q(stroke_width=14 if not self.vertical else 16)
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

        titre_mots = Text("q u comme…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_Q, dessins):
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
        d = self.dire("05-q-comme")
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
        relance = ecran_relance(self.vertical, "q")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN ───────────────────────────────────────────────
        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class LettreQCp(_LettreQBase):
    """16:9, droitier."""


class LettreQCpGaucher(_LettreQBase):
    """16:9, gaucher."""

    gaucher = True


class LettreQCpPortrait(Portrait, _LettreQBase):
    """9:16, droitier."""


class LettreQCpPortraitGaucher(Portrait, _LettreQBase):
    """9:16, gaucher."""

    gaucher = True
