# Création et écriture de la lettre « e » — CP
#
# ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, notion `grapheme_phoneme`.
# Micros couvertes : cp_gph_voyelles (le son [ə]) et cp_copie_lettre (le tracé).
#
# ⭐⭐ LA LETTRE QUI A ÉTÉ REPORTÉE TROIS FOIS, ET POURQUOI.
# En français, `e` initial ne fait presque JAMAIS le son [ə] : « école » et
# « étoile » sont des `é`, « escargot » est [ɛ], « enfant » est nasal. La règle
# des trois premières lettres — cinq noms qui commencent par la LETTRE ET par le
# SON — n'a aucune solution ici. Une liste forcée aurait fait entendre quatre
# sons différents sous un seul signe : exactement l'erreur que la vidéo existe
# pour éviter.
# ⭐ Arbitrage de Frédéric (04/09), le même que pour le « u » : le son DANS le
# mot. cheval, renard, melon, requin, cerise — de vrais mots de CP, et le `e`
# colorié à sa place.
#
# ⛔ TOUJOURS --disable_caching. ⛔ ON NE REND QUE LES SHORTS.
#
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/en_letter_e.py LetterEPortraitRight #                       -o eleveai-francais-cp-lettre-e-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/en_letter_e.py LetterEPortraitLeft #                       -o eleveai-francais-cp-lettre-e-gaucher-portrait --media_dir manim/scripts/cp/media

import sys
import wave
from pathlib import Path

import numpy as np
from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/
sys.path.insert(0, str(Path(__file__).resolve().parent))  # dossier cp/
from charte import *  # noqa: F403,E402
from mascotte import MascotteMargouillat  # noqa: E402

from lettre_o import oreille_dessine as _ear  # noqa: E402
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

# ─── Le chemin du « e » ───────────────────────────────────────────────────────
# ⭐⭐ LE PREMIER CROISEMENT DE L'ALPHABET. Le crayon monte en biais, tourne au
# sommet, redescend EN COUPANT le trait qu'il vient de tracer, puis contourne
# par le bas et sort. C'est ce croisement qui fait la boucle — et c'est le geste
# qui prépare le `l`, le `b`, le `f`.
# ⚠️ Deux essais : au premier, la lettre culminait à 0,72 interligne là où les
# autres montent à 0,95 — elle paraissait écrasée à côté du « a » sur la même
# réglure.
DEPART = np.array([-0.58, 0.10, 0])
COURBES = [
    # 1 — la montée oblique, jusqu'au sommet
    ((-0.42, 0.32), (-0.22, 0.62), (0.02, 0.90)),
    # 2 — la boucle par le haut : c'est ici que le trait se CROISE
    ((-0.08, 1.05), (-0.68, 1.02), (-0.70, 0.48)),
    # 3 — le bas du rond
    ((-0.72, 0.06), (-0.22, -0.04), (0.10, 0.14)),
    # 4 — la sortie, qui amorce la lettre suivante
    ((0.26, 0.24), (0.40, 0.28), (0.58, 0.36)),
]

# ⭐ Cinq mots où l'on ENTEND [ə] et où on VOIT le `e`.
# ⛔ Écartés : « école », « étoile », « éléphant » (ce sont des `é`, pas des
# `e`), « escargot » ([ɛ]) et « enfant » (nasale). La lettre y est, le son n'y
# est pas — le même piège que « ours » pour le « o ».
# ⭐ DESSINS REPRIS DE LA SÉRIE FRANÇAISE : oreille → ear.
# Même image, même place : c'est ce qui rend la comparaison fr/gb lisible.
# ⛔ LE « e » ET LE « y » STOCKENT DES PAIRES (mot, position), pas des
# mots : en français la lettre est À L'INTÉRIEUR du mot, et le jaune se
# pose à cette position — c'est tout l'objet de ce format, l'œil doit
# aller CHERCHER la lettre. En anglais elle est en INITIALE, donc la
# position vaut 0 partout. Écrire une liste simple faisait planter le
# rendu : « too many values to unpack ».
MOTS_EN_E = [("egg", 0), ("eye", 0), ("envelope", 0), ("engine", 0), ("ear", 0)]


def chemin_e(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
# ⚠️ LEÇON DES TROIS LETTRES PRÉCÉDENTES : à l'échelle de la liste (0,40), une
# SILHOUETTE FERMÉE se lit, un faisceau de traits non. L'iris du « i », l'oreille
# du « o » et la plume du « u » ont tous dû être refaits pour cette raison.
def cheval_dessine() -> VGroup:
    """An egg: the oval, narrower at the top — and its little cup."""
    oeuf = VMobject(stroke_color=WHITE, stroke_width=5)
    oeuf.set_fill(opacity=0)
    oeuf.start_new_path(np.array([0.00, 0.52, 0]))
    oeuf.add_cubic_bezier_curve_to(
        np.array([0.24, 0.44, 0]), np.array([0.32, 0.06, 0]),
        np.array([0.32, -0.10, 0]))
    oeuf.add_cubic_bezier_curve_to(
        np.array([0.32, -0.40, 0]), np.array([-0.32, -0.40, 0]),
        np.array([-0.32, -0.10, 0]))
    oeuf.add_cubic_bezier_curve_to(
        np.array([-0.32, 0.06, 0]), np.array([-0.24, 0.44, 0]),
        np.array([0.00, 0.52, 0]))
    coquetier = VMobject(stroke_color=BLEU_CALCUL, stroke_width=4)
    coquetier.set_fill(opacity=0)
    coquetier.start_new_path(np.array([-0.30, -0.14, 0]))
    coquetier.add_cubic_bezier_curve_to(
        np.array([-0.26, -0.44, 0]), np.array([0.26, -0.44, 0]),
        np.array([0.30, -0.14, 0]))
    pied = Line(np.array([-0.18, -0.52, 0]), np.array([0.18, -0.52, 0]),
                stroke_color=BLEU_CALCUL, stroke_width=4)
    tige = Line(np.array([0.00, -0.36, 0]), np.array([0.00, -0.52, 0]),
                stroke_color=BLEU_CALCUL, stroke_width=4)
    return VGroup(coquetier, tige, pied, oeuf)


def renard_dessine() -> VGroup:
    """An eye: the almond, the iris, the pupil, and three lashes."""
    # ⛔ CE MOT REMPLACE « elephant », abandonné après DEUX essais : oreilles
    # trop grandes puis trop discrètes, et la trompe se lisait comme un crochet.
    # C'est le quatrième animal que j'abandonne aujourd'hui (gazelle, goat,
    # elephant) contre zéro objet à silhouette franche.
    # 👉 LA RÈGLE EST FAITE : deux échecs sur un dessin, on change de mot.
    amande = VMobject(stroke_color=WHITE, stroke_width=5)
    amande.set_fill(opacity=0)
    amande.start_new_path(np.array([-0.52, 0.00, 0]))
    amande.add_cubic_bezier_curve_to(
        np.array([-0.26, 0.34, 0]), np.array([0.26, 0.34, 0]),
        np.array([0.52, 0.00, 0]))
    amande.add_cubic_bezier_curve_to(
        np.array([0.26, -0.34, 0]), np.array([-0.26, -0.34, 0]),
        np.array([-0.52, 0.00, 0]))
    iris = Circle(radius=0.19, stroke_color=BLEU_CALCUL, stroke_width=5)
    iris.set_fill(opacity=0)
    pupille = Dot(np.array([0.00, 0.00, 0]), radius=0.08)
    reflet = Dot(np.array([0.07, 0.07, 0]), radius=0.035, color=WHITE)
    cils = VGroup(
        *[Line(np.array([x, y, 0]), np.array([x * 1.25, y + 0.16, 0]),
               stroke_color=WHITE, stroke_width=3)
          for x, y in ((-0.30, 0.20), (0.00, 0.26), (0.30, 0.20))]
    )
    return VGroup(cils, amande, iris, pupille, reflet)

def melon_dessine() -> VGroup:
    """An envelope: the rectangle, and the V of its flap."""
    corps = Polygon(
        np.array([-0.50, -0.30, 0]), np.array([0.50, -0.30, 0]),
        np.array([0.50, 0.30, 0]), np.array([-0.50, 0.30, 0]),
        stroke_color=JAUNE_TITRE, stroke_width=5).set_fill(opacity=0)
    rabat = VMobject(stroke_color=JAUNE_TITRE, stroke_width=4)
    rabat.set_fill(opacity=0)
    rabat.start_new_path(np.array([-0.50, 0.30, 0]))
    rabat.add_line_to(np.array([0.00, -0.06, 0]))
    rabat.add_line_to(np.array([0.50, 0.30, 0]))
    coins = VGroup(
        Line(np.array([-0.50, -0.30, 0]), np.array([-0.14, 0.02, 0]),
             stroke_color=JAUNE_TITRE, stroke_width=2),
        Line(np.array([0.50, -0.30, 0]), np.array([0.14, 0.02, 0]),
             stroke_color=JAUNE_TITRE, stroke_width=2),
    )
    timbre = Polygon(
        np.array([0.28, 0.10, 0]), np.array([0.44, 0.10, 0]),
        np.array([0.44, 0.24, 0]), np.array([0.28, 0.24, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=3).set_fill(opacity=0)
    return VGroup(corps, coins, rabat, timbre)


def requin_dessine() -> VGroup:
    """An engine: the boiler, the cab, the funnel and its puff of smoke."""
    chaudiere = Polygon(
        np.array([-0.52, -0.20, 0]), np.array([0.10, -0.20, 0]),
        np.array([0.10, 0.12, 0]), np.array([-0.52, 0.12, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=5).set_fill(opacity=0)
    cabine = Polygon(
        np.array([0.10, -0.20, 0]), np.array([0.52, -0.20, 0]),
        np.array([0.52, 0.30, 0]), np.array([0.10, 0.30, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=5).set_fill(opacity=0)
    vitre = Polygon(
        np.array([0.20, 0.02, 0]), np.array([0.42, 0.02, 0]),
        np.array([0.42, 0.20, 0]), np.array([0.20, 0.20, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=3).set_fill(opacity=0)
    cheminee = Polygon(
        np.array([-0.44, 0.12, 0]), np.array([-0.26, 0.12, 0]),
        np.array([-0.22, 0.34, 0]), np.array([-0.48, 0.34, 0]),
        stroke_color=ROUGE_ERREUR, stroke_width=4).set_fill(opacity=0)
    fumee = VGroup(
        *[Circle(radius=r, stroke_color=GREY_B, stroke_width=3)
          .set_fill(opacity=0).move_to(np.array([-0.35 + dx, 0.44 + dy, 0]))
          for r, dx, dy in ((0.08, 0.00, 0.00), (0.10, 0.16, 0.14),
                            (0.07, 0.34, 0.24))]
    )
    roues = VGroup(
        *[Circle(radius=r, stroke_color=GREY_B, stroke_width=4)
          .set_fill(opacity=0).move_to(np.array([x, -0.30, 0]))
          for x, r in ((-0.34, 0.12), (0.02, 0.12), (0.34, 0.10))]
    )
    rail = Line(np.array([-0.62, -0.44, 0]), np.array([0.62, -0.44, 0]),
                stroke_color=GREY_B, stroke_width=3)
    return VGroup(rail, roues, chaudiere, cabine, vitre, cheminee, fumee)


def cerise_dessine() -> VGroup:
    """ear — le dessin de « oreille », repris tel quel."""
    return _ear()


# ─── La voix ──────────────────────────────────────────────────────────────────
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "en-lettre-e"
DUREE = { "00-aujourdhui": 3.62, "01-ecoute": 3.77, "02-regarde": 2.96,
    "03-depart": 14.44, "04-encore": 4.15, "05-cherchons": 4.37,
    "05-e-comme": 1.92, "06-cheval": 1.5, "07-renard": 1.3, "08-melon": 2.01,
    "09-requin": 1.77, "10-cerise": 1.3, "10-pareil": 5.16,
    "11-relance": 3.46, "12-va-sur": 3.56, "13-tout": 9.71,
    "14-bientot": 2.23,
}
CLIPS_MOTS = ["06-cheval", "07-renard", "08-melon", "09-requin", "10-cerise"]


class _LetterEBase(Scene):
    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE, sinon les sons sautent sans un mot."""
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
        son = Text("e", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        garde, garde_main = page_de_garde(
            self, "e", chemin_e(stroke_width=12), MascotteMargouillat()
        )

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
        self.play(
            FadeOut(titre),
            FadeOut(margo, shift=RIGHT * 0.4),
            son.animate.scale(0.40).to_corner(UL, buff=0.55),
        )
        self.wait(0.4)

        # ── LE GESTE ────────────────────────────────────────────────────────
        lignes = reglure(3)
        lettre = chemin_e(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        modele = chemin_e(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "e", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
        ).move_to(modele)

        d = self.dire("02-regarde")
        self.play(Create(lignes), run_time=0.8)
        self.play(FadeIn(imprime, scale=0.85), run_time=0.3)
        self.play(Transform(imprime, modele), run_time=0.8)
        point = Dot(lettre.get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2), run_time=0.5)
        self.wait(max(0.3, d - 2.4))

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
        d = self.dire("03-depart")
        self.play(avance.animate.set_value(1.0), run_time=d - 0.4, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()
        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.8)

        self.dire("04-encore")
        for duree in (2.0, 1.2):
            self.remove(trace)
            trace = chemin_e(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.wait(0.4)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── « u » COMME DANS… ───────────────────────────────────────────────
        # ⭐ « COMME DANS », ET NON « COMME » : le mot ne commence pas par la
        # lettre, et la formule doit le dire. C'est la nuance qui fait la leçon.
        self.play(FadeOut(trace))

        # ⛔ LE COUPABLE DU DÉBORDEMENT, ET CE N'ÉTAIT PAS LA LISTE DE MOTS.
        # « u comme dans… » fait quatre signes de plus que « a comme… », et je
        # ne lui avais pas donné de taille pour le portrait : à 50, c'est LUI
        # qui portait les 4,48 de large, pas les cinq lignes en dessous. J'ai
        # d'abord rétréci les mots pour rien — la mesure du vérificateur n'avait
        # pas bougé d'un centième, et c'est ce qui l'a dit.
        titre_mots = Text("e as in…", font_size=50 if not self.vertical else 38)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            cheval_dessine(), renard_dessine(), melon_dessine(),
            requin_dessine(), cerise_dessine(),
        ]
        # ⛔ PLUS PETIT QUE POUR a/i/o, ET C'EST LE VÉRIFICATEUR QUI L'A DIT.
        # Avec les réglages des trois premières lettres, le bloc mesurait 4,48
        # de large pour 3,90 utiles en portrait : `verifier()` a ARRÊTÉ le rendu
        # au lieu de tout écraser en silence, comme l'ancien filet l'aurait fait.
        # La cause : « tortue » est plus long que « arbre » ou « olive », et le
        # format « dans le mot » amène forcément des mots plus longs.
        echelle = 0.52 if not self.vertical else 0.40
        lignes_mots = VGroup()
        for (mot, pos), dessin in zip(MOTS_EN_E, dessins):
            t = Text(mot, font_size=42 if not self.vertical else 34)
            # ⭐ LE JAUNE SE POSE À LA PLACE DU `u`, PAS SUR LA PREMIÈRE LETTRE.
            # C'est tout l'objet de ce format : l'œil doit aller CHERCHER la
            # lettre dans le mot, comme l'oreille va chercher le son.
            t[pos].set_color(JAUNE_TITRE)
            lignes_mots.add(VGroup(t, dessin.scale(echelle)).arrange(RIGHT, buff=0.45))

        lignes_mots.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        bloc = VGroup(titre_mots, lignes_mots).arrange(DOWN, buff=0.5)
        bloc.move_to(ORIGIN).scale(0.95 if not self.vertical else 0.8)
        verifier(bloc, "bloc des cinq mots")

        dc = self.dire("05-cherchons")
        self.wait(dc)
        d = self.dire("05-e-comme")
        self.play(FadeIn(titre_mots, shift=DOWN * 0.3))
        self.wait(max(0.2, d - 1.0))
        for ligne, clip in zip(lignes_mots, CLIPS_MOTS):
            duree_mot = self.dire(clip)
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.22), run_time=0.35)
            self.wait(0.45)
            self.play(ligne.animate.scale(1 / 1.22), run_time=0.3)
            self.wait(max(0.15, duree_mot - 1.45))
        dp = self.dire("10-pareil")
        self.wait(dp)

        # ── LA RELANCE ──────────────────────────────────────────────────────
        self.play(FadeOut(bloc))
        relance = ecran_relance(
            self.vertical, "e",
            consigne=("Find a word", "beginning with",
                      "Find a word beginning with"),
        )
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-va-sur", "13-tout", "14-bientot",
                    adieu="See you soon!", adieu_taille=36,
                    abonne=("Subscribe to", "the channel!"),
                    fiche=("Download", "your sheet!"),
                    voix_abonne="en-commun")


class LetterERight(_LetterEBase):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class LetterELeft(_LetterEBase):
    gaucher = True


class LetterEPortraitRight(Portrait, _LetterEBase):
    """9:16, droitier — LE format qui est vu."""


class LetterEPortraitLeft(Portrait, _LetterEBase):
    gaucher = True
