# Écriture de la lettre « f » en cursive — CP
#
# ⭐⭐ LA LETTRE LA PLUS HAUTE DE LA SÉRIE : la seule qui monte dans l'interligne
# du dessus ET descend sous la ligne. Deux boucles, 4,40 de haut contre 1,10
# pour un « a ». Tout ce qui suppose une lettre « normale » s'y casse.
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

# ─── Le chemin du « f » ──────────────────────────────────────────────────────
# ⭐ LE « f » EN COURBURES (Frédéric, 08/09) :
#   1. un creux qui monte, puis une GRANDE boucle qui bascule à GAUCHE en haut ;
#   2. la descente, qui passe SOUS la ligne ;
#   3. une deuxième boucle, PLUS PETITE, vers le BAS et vers la DROITE ;
#   4. elle s'ARRÊTE SUR LA LIGNE ;
#   5. et on sort par la PARABOLE CONVEXE — la même que l t n m h.
#
# ⭐⭐ CE QUI A DEMANDÉ SIX ESSAIS, ET QUI EST LE CŒUR DU « f » :
# **la boucle du haut se ferme JUSTE AU-DESSUS DE LA LIGNE**, pas à mi-hauteur.
# J'avais repris le haut du « l » tel quel, où la boucle se ferme vers 1,3 — la
# lettre était alors un « l » à qui on avait accroché une queue. C'est cette
# fermeture BASSE qui fait la boucle longue du « f », et qui la fait se
# rejoindre presque avec celle du bas, arrêtée sur la ligne.
# 👉 Pour fermer bas, la montée file à DROITE tôt et la descente reste à GAUCHE
# tard : les deux traits ne se croisent qu'en bas.
#
# ⛔ MES ERREURS, DANS L'ORDRE, POUR NE PAS LES REFAIRE :
#   1. boucle du bas à GAUCHE, sur « comme celle du haut mais inversée » —
#      « inversée » ne voulait pas dire EN MIROIR ;
#   2. boucle du bas pincée à 0,32 de large : elle lisait comme un PLI ;
#   3. sortie en trait droit, alors que le « f » appartient à la famille qui
#      finit par un creux posé sur la ligne — c'est cette fin commune qui
#      attache l, t, n, m, h et f pareil à la lettre suivante ;
#   4. remontée de la boucle du bas jusque sous celle du haut : elle longeait
#      alors le fût et la boucle se refermait. Le vrai réglage était en HAUT.
# ⚠️ Aucune de ces quatre ne se voyait dans les coordonnées. Toutes se sont vues
# au rendu, plein cadre, à l'épaisseur où la lettre sera regardée.
DEPART = np.array([-0.90, 0.08, 0])
COURBES = [
    # ── la boucle du HAUT : elle se ferme JUSTE AU-DESSUS DE LA LIGNE ──────
    ((-0.66, 0.10), (-0.36, 0.16), (-0.10, 0.38)),   # 1. le creux qui monte
    ((0.14, 1.00), (0.30, 1.95), (0.30, 2.90)),      # 2. la montée, à DROITE
    ((0.30, 3.34), (-0.12, 3.36), (-0.12, 2.80)),    # 3. la voûte, bascule à GAUCHE
    # ── la descente : VERTICALE (Frédéric, 08/09) ─────────────────────────
    # ⛔ Elle partait de -0,22 pour arriver a 0,00 : elle DÉRIVAIT vers la
    # droite en descendant. « Quand tu es en haut de la boucle tu dois
    # descendre DROIT, pas penché vers la droite. » x constant, donc.
    ((-0.12, 2.00), (-0.12, 1.00), (-0.12, 0.02)),   # 4. tout droit, jusque sous la ligne
    # ── la boucle du BAS : 2/3 de celle du haut ───────────────────────────
    # ⚠️ MESURE : la boucle du haut fait 2,98 (de 0,38 à 3,36). Les 2/3 font
    # 1,99 — d'où un fond a -1,97. Elle s'arrêtait a -1,06, soit un tiers.
    ((-0.12, -0.60), (0.18, -0.82), (0.20, -1.32)),  # 5. elle plonge vers la DROITE, PROFOND
    ((0.22, -1.80), (-0.14, -1.97), (-0.22, -1.46)), # 6. elle tourne au fond
    ((-0.28, -0.96), (-0.16, -0.38), (0.06, 0.02)),  # 7. elle remonte et s ARRETE SUR LA LIGNE
    # ── la sortie : la parabole convexe de la famille l t n m h ───────────
    ((0.20, -0.02), (0.34, 0.02), (0.48, 0.12)),     # 8. le creux final, posé sur la ligne
    ((0.60, 0.20), (0.72, 0.28), (0.84, 0.36)),      # 9. la sortie
]

# ⭐ CINQ MOTS OÙ LE « f » EST EN INITIALE, suivi d'une VOYELLE.
# ⛔ ÉCARTÉS : « fleur » et « fraise », pourtant les plus dessinables. L'enfant y
# entend [fl] et [fr], pas [f] seul — le même piège que « stylo » pour le « s ».
# ⭐ QUATRE SUR CINQ SONT DU VIVANT OU DU CIEL. Mesuré le 07/09 : sur les 80 mots
# de la série, 42 seulement l'étaient, et le « t » n'en avait qu'un sur cinq
# (table, train, tapis, tasse — un intérieur d'appartement). Le « f » ne sera
# pas une lettre de mobilier. Et la fée est là pour la part de poésie.
MOTS_EN_F = ["fourmi", "feuille", "forêt", "fusée", "fée"]


def chemin_f(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Une fourmi : trois segments de taille CROISSANTE, six pattes sous elle."""
    # ⛔ PREMIÈRE VERSION : trois cercles de même taille, et les pattes copiées
    # par `flip(RIGHT)` — qui les envoyait VERS LE HAUT, en travers du corps.
    # Une fourmi se lit à deux choses : des segments INÉGAUX, et des pattes qui
    # partent toutes VERS LE BAS.
    tete = Circle(radius=0.10, stroke_color=ROUGE_ERREUR, stroke_width=4)
    tete.set_fill(opacity=0).move_to(np.array([-0.40, 0.02, 0]))
    thorax = Circle(radius=0.08, stroke_color=ROUGE_ERREUR, stroke_width=4)
    thorax.set_fill(opacity=0).move_to(np.array([-0.18, 0.00, 0]))
    abdomen = Ellipse(width=0.42, height=0.30, stroke_color=ROUGE_ERREUR,
                      stroke_width=4)
    abdomen.set_fill(opacity=0).move_to(np.array([0.16, 0.00, 0]))
    pattes = VGroup(
        *[Line(np.array([x, -0.06, 0]), np.array([x + dx, -0.34, 0]),
               stroke_color=ROUGE_ERREUR, stroke_width=3)
          for x, dx in ((-0.24, -0.16), (-0.18, 0.00), (-0.12, 0.16),
                        (-0.26, -0.06), (-0.16, 0.08), (-0.08, 0.24))]
    )
    antennes = VGroup(
        *[Line(np.array([-0.46, 0.08, 0]), np.array([-0.62, y, 0]),
               stroke_color=ROUGE_ERREUR, stroke_width=3) for y in (0.30, 0.18)]
    )
    oeil = Dot(np.array([-0.44, 0.04, 0]), radius=0.025)
    return VGroup(pattes, tete, thorax, abdomen, antennes, oeil)


def lit_dessine() -> VGroup:
    """Une feuille : le limbe et sa nervure centrale."""
    limbe = VMobject(stroke_color=VERT_OK, stroke_width=5)
    limbe.set_fill(opacity=0)
    limbe.start_new_path(np.array([-0.46, -0.30, 0]))
    limbe.add_cubic_bezier_curve_to(
        np.array([-0.30, 0.26, 0]), np.array([0.20, 0.44, 0]),
        np.array([0.46, 0.34, 0]))
    limbe.add_cubic_bezier_curve_to(
        np.array([0.42, 0.02, 0]), np.array([0.06, -0.30, 0]),
        np.array([-0.46, -0.30, 0]))
    nervure = Line(np.array([-0.46, -0.30, 0]), np.array([0.42, 0.32, 0]),
                   stroke_color=VERT_OK, stroke_width=3)
    cotes = VGroup(
        *[Line(np.array([-0.30 + k * 0.20, -0.19 + k * 0.14, 0]),
               np.array([-0.34 + k * 0.20, 0.06 + k * 0.11, 0]),
               stroke_color=VERT_OK, stroke_width=2) for k in range(3)]
    )
    tige = Line(np.array([-0.46, -0.30, 0]), np.array([-0.64, -0.44, 0]),
                stroke_color=VERT_OK, stroke_width=4)
    return VGroup(tige, limbe, nervure, cotes)


def livre_dessine() -> VGroup:
    """Une forêt : trois sapins, de tailles différentes."""
    def sapin(x, h, couleur):
        cime = Polygon(
            np.array([x, h, 0]), np.array([x - 0.20, h - 0.44, 0]),
            np.array([x + 0.20, h - 0.44, 0]),
            stroke_color=couleur, stroke_width=4).set_fill(opacity=0)
        jupe = Polygon(
            np.array([x, h - 0.22, 0]), np.array([x - 0.26, h - 0.72, 0]),
            np.array([x + 0.26, h - 0.72, 0]),
            stroke_color=couleur, stroke_width=4).set_fill(opacity=0)
        tronc = Line(np.array([x, h - 0.72, 0]), np.array([x, h - 0.90, 0]),
                     stroke_color=ORANGE_RETENUE, stroke_width=4)
        return VGroup(cime, jupe, tronc)

    return VGroup(sapin(-0.44, 0.28, VERT_OK), sapin(0.02, 0.50, VERT_OK),
                  sapin(0.46, 0.22, VERT_OK))


def lapin_dessine() -> VGroup:
    """Une fusée : le corps, la pointe, deux ailerons, le feu."""
    corps = VMobject(stroke_color=WHITE, stroke_width=5)
    corps.set_fill(opacity=0)
    corps.start_new_path(np.array([-0.16, -0.20, 0]))
    corps.add_line_to(np.array([-0.16, 0.22, 0]))
    corps.add_cubic_bezier_curve_to(
        np.array([-0.16, 0.44, 0]), np.array([0.16, 0.44, 0]),
        np.array([0.16, 0.22, 0]))
    corps.add_line_to(np.array([0.16, -0.20, 0]))
    corps.add_line_to(np.array([-0.16, -0.20, 0]))
    hublot = Circle(radius=0.09, stroke_color=BLEU_CALCUL, stroke_width=4)
    hublot.set_fill(opacity=0).move_to(np.array([0.00, 0.16, 0]))
    ailerons = VGroup(
        Polygon(np.array([-0.16, -0.20, 0]), np.array([-0.38, -0.44, 0]),
                np.array([-0.16, -0.02, 0]),
                stroke_color=ROUGE_ERREUR, stroke_width=4).set_fill(opacity=0),
        Polygon(np.array([0.16, -0.20, 0]), np.array([0.38, -0.44, 0]),
                np.array([0.16, -0.02, 0]),
                stroke_color=ROUGE_ERREUR, stroke_width=4).set_fill(opacity=0),
    )
    feu = Polygon(np.array([-0.10, -0.20, 0]), np.array([0.00, -0.54, 0]),
                  np.array([0.10, -0.20, 0]),
                  stroke_color=JAUNE_TITRE, stroke_width=4).set_fill(opacity=0)
    return VGroup(feu, ailerons, corps, hublot)


def lampe_dessine() -> VGroup:
    """Une fée : la robe, la tête POSÉE dessus, deux ailes pointues, la baguette."""
    # ⛔ PREMIÈRE VERSION : tête flottant au-dessus du corps et ailes en ellipses
    # — ça lisait « deux ballons ». Ici la tête TOUCHE la robe, et les ailes
    # sont des feuilles pointues, penchées vers le haut : une aile a une pointe.
    robe = Polygon(np.array([0.00, 0.10, 0]), np.array([-0.20, -0.34, 0]),
                   np.array([0.20, -0.34, 0]),
                   stroke_color=ROUGE_ERREUR, stroke_width=4).set_fill(opacity=0)
    tete = Circle(radius=0.11, stroke_color=JAUNE_TITRE, stroke_width=4)
    tete.set_fill(opacity=0).move_to(np.array([0.00, 0.20, 0]))

    def aile(sens):
        a = VMobject(stroke_color=BLEU_CALCUL, stroke_width=3)
        a.set_fill(opacity=0)
        a.start_new_path(np.array([sens * 0.08, 0.02, 0]))
        a.add_cubic_bezier_curve_to(
            np.array([sens * 0.18, 0.30, 0]), np.array([sens * 0.42, 0.30, 0]),
            np.array([sens * 0.44, 0.10, 0]))
        a.add_cubic_bezier_curve_to(
            np.array([sens * 0.42, -0.08, 0]), np.array([sens * 0.20, -0.10, 0]),
            np.array([sens * 0.08, 0.02, 0]))
        return a

    baguette = Line(np.array([0.16, -0.16, 0]), np.array([0.44, -0.30, 0]),
                    stroke_color=ORANGE_RETENUE, stroke_width=3)
    etoile = Star(n=5, outer_radius=0.10, inner_radius=0.045,
                  stroke_color=JAUNE_TITRE, stroke_width=3)
    etoile.set_fill(opacity=0).move_to(np.array([0.52, -0.34, 0]))
    return VGroup(aile(-1), aile(1), robe, tete, baguette, etoile)





# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, jamais estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-f"
DUREE = { "00-aujourdhui": 3.36, "01-ecoute": 3.17, "02-regarde": 3.13,
    "03-depart": 21.78, "04-encore": 2.92, "05-cherchons": 4.29,
    "05-f-comme": 1.71, "06-fourmi": 1.57, "07-feuille": 1.55,
    "08-foret": 1.52, "09-fusee": 1.57, "10-fee": 1.35, "10-pareil": 4.71,
    "11-relance": 3.12, "12-va-sur": 3.16, "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-fourmi", "07-feuille", "08-foret", "09-fusee", "10-fee"]


class _LettreFBase(Scene):
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
        son = Text("f", font_size=150, color=JAUNE_TITRE)
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
            self, "f", chemin_f(stroke_width=6), MascotteMargouillat(),
            hauteur_cursive=2.8,
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
        lettre = chemin_f(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        # ⭐ L'IMPRIMÉE DEVIENT LA CURSIVE, et la cursive reste en GRIS : c'est
        # le modèle à repasser, comme la ligne pointillée de la réglure.
        modele = chemin_f(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "f", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            trace = chemin_f(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── 4. « o » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        self.play(FadeOut(trace))

        titre_mots = Text("f comme…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), lit_dessine(), livre_dessine(),
            lapin_dessine(), lampe_dessine(),
        ]
        echelle = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_F, dessins):
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
        d = self.dire("05-f-comme")
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
        relance = ecran_relance(self.vertical, "f")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN ───────────────────────────────────────────────
        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class LettreFCp(_LettreFBase):
    """16:9, droitier."""


class LettreFCpGaucher(_LettreFBase):
    """16:9, gaucher."""

    gaucher = True


class LettreFCpPortrait(Portrait, _LettreFBase):
    """9:16, droitier."""


class LettreFCpPortraitGaucher(Portrait, _LettreFBase):
    """9:16, gaucher."""

    gaucher = True
