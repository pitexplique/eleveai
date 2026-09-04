# Création et écriture de la lettre « i » — CP
#
# ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, notion `grapheme_phoneme`.
# Micros couvertes : cp_gph_voyelles (le son [i]) et cp_copie_lettre (le tracé).
#
# ⭐ MÊME MOULE QUE `lettre_a.py`, VALIDÉ ET PUBLIÉ LE 03/09/2026. Tout ce qui
# suit y est expliqué en long ; on ne redit ici que ce qui CHANGE pour le « i ».
# ⚠️ Les deux fichiers se ressemblent beaucoup et ce n'est pas un oubli : on
# factorisera quand DEUX lettres seront écrites, pas avant. Généraliser sur un
# seul exemple, c'est inventer une règle qu'on n'a pas vérifiée.
#
# ⛔ TOUJOURS --disable_caching : sans lui, les sons sautent.
# ⛔ UNE COMMANDE PAR SCÈNE : le cadre du portrait est global.
#
# paysage droitier  : python -m manim render -qh --disable_caching manim/scripts/cp/lettre_i.py LettreICp \
#                       -o eleveai-francais-cp-lettre-i-droitier-paysage --media_dir manim/scripts/cp/media
# paysage gaucher   : python -m manim render -qh --disable_caching manim/scripts/cp/lettre_i.py LettreICpGaucher \
#                       -o eleveai-francais-cp-lettre-i-gaucher-paysage --media_dir manim/scripts/cp/media
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/lettre_i.py LettreICpPortrait \
#                       -o eleveai-francais-cp-lettre-i-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/lettre_i.py LettreICpPortraitGaucher \
#                       -o eleveai-francais-cp-lettre-i-gaucher-portrait --media_dir manim/scripts/cp/media

import sys
from pathlib import Path

import numpy as np
from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/
from charte import *  # noqa: F403,E402
from mascotte import MascotteMargouillat  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))  # dossier cp/
from lettre_commune import ecran_relance, page_de_fin, page_de_garde  # noqa: E402

INTERLIGNE = 1.0
LARGEUR_REGLURE = 9.0


def reglure(nb_interlignes: int = 3) -> VGroup:
    """La bande d'écriture : ligne de base forte, trois fines au-dessus."""
    g = VGroup()
    for k in range(nb_interlignes + 1):
        y = k * INTERLIGNE
        forte = k == 0
        g.add(
            Line(
                np.array([-LARGEUR_REGLURE / 2, y, 0]),
                np.array([LARGEUR_REGLURE / 2, y, 0]),
                stroke_width=3 if forte else 1.5,
                stroke_color=GREY_B if forte else GREY_D,
            )
        )
    return g


# ─── Le chemin du « i », en courbes de Bézier ─────────────────────────────────
# ⭐⭐ CE QUE LE « i » APPORTE ET QUE LE « a » N'AVAIT PAS : ON LÈVE LE CRAYON.
# Le corps se fait d'un trait, puis la main QUITTE LA FEUILLE et revient poser
# le point. C'est le premier geste en deux temps que l'enfant rencontre, et un
# tracé continu qui ferait remonter le crayon jusqu'au point lui enseignerait
# l'inverse : un « i » dont le point est attaché n'est plus un « i ».
#
# ⭐ Vérifié au rendu (image PNG sur réglure) AVANT d'écrire du Manim, comme
# pour le « a ». Deux essais : au premier, montée et descente se refermaient en
# pointe et la sortie montait trop haut — la lettre ressemblait à un lambda.
DEPART = np.array([-0.44, 0.00, 0])
COURBES = [
    # 1 — la montée oblique, de la ligne jusqu'en haut du corps
    ((-0.32, 0.30), (-0.16, 0.64), (0.02, 0.95)),
    # 2 — la descente, presque droite, qui s'incurve juste avant la ligne
    ((0.07, 0.64), (0.09, 0.24), (0.18, 0.02)),
    # 3 — la sortie : elle AMORCE la lettre suivante, ce n'est pas une boucle
    ((0.30, -0.02), (0.42, 0.08), (0.58, 0.26)),
]
# ⚠️ Le point se pose au-dessus du sommet, dans l'interligne du dessus — pas
# collé à la lettre, pas perdu en haut de page.
POSITION_POINT = np.array([0.06, 1.32, 0])

# ⭐ Cinq mots, chacun avec SON dessin. Tous commencent par la LETTRE « i » ET
# par le SON [i].
# ⛔ « île » EST ÉCARTÉ, et c'est la même règle qui avait sorti « âne » de la
# liste du « a » : le circonflexe donne le son sans la lettre nue, et l'enfant
# cherche un « i » qu'il ne voit pas.
# ⛔ Écartés aussi tous les mots en « in- » (insecte, instrument, invitation) :
# la lettre y est bien un i, mais elle se lit [ɛ̃] — c'est le son composé, une
# autre leçon, et la mélanger ici détruit celle-ci.
# ⭐ « iguane » est un clin d'œil assumé : Ti-Margo est un margouillat.
MOTS_EN_I = ["image", "igloo", "iguane", "iris", "immeuble"]


def chemin_i(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    """Le CORPS du i — un seul trait. Le point est un objet à part."""
    p = VMobject(stroke_width=stroke_width, stroke_color=color)
    p.set_fill(opacity=0)
    p.start_new_path(DEPART)
    for c1, c2, fin in COURBES:
        p.add_cubic_bezier_curve_to(
            np.array([*c1, 0]), np.array([*c2, 0]), np.array([*fin, 0])
        )
    return p


# ─── Le stylo qui écrit ───────────────────────────────────────────────────────
# ⛔ NE PAS L'ORIENTER SUR LE CHEMIN : voir `lettre_a.py`, la normale faisait
# tourner le stylo avec la courbe et le couchait en main de gaucher.
# ⭐ Angle CONSTANT, ouvert vers la droite pour un droitier, miroir pour un
# gaucher. Une main ne change pas de prise en cours de lettre.
LONGUEUR_STYLO = 1.15
EPS = 1e-3
ANGLE_STYLO = 30 * DEGREES


def stylo_neuf() -> VGroup:
    """Un stylo stylisé, pointe en (0,0), corps vers le haut."""
    corps = Polygon(
        np.array([0.0, 0.0, 0]),
        np.array([-0.10, 0.26, 0]),
        np.array([-0.10, LONGUEUR_STYLO, 0]),
        np.array([0.10, LONGUEUR_STYLO, 0]),
        np.array([0.10, 0.26, 0]),
        stroke_color=WHITE,
        stroke_width=4,
    )
    corps.set_fill(BLEU_CALCUL, opacity=1)
    pointe = Polygon(
        np.array([0.0, 0.0, 0]),
        np.array([-0.10, 0.26, 0]),
        np.array([0.10, 0.26, 0]),
        stroke_color=WHITE,
        stroke_width=4,
    )
    pointe.set_fill(JAUNE_TITRE, opacity=1)
    return VGroup(corps, pointe)


def poser_stylo(
    stylo: VGroup, modele: VGroup, chemin: VMobject, s: float, angle: float
) -> None:
    """Pose la POINTE sur le chemin à l'abscisse `s`. L'inclinaison ne bouge pas."""
    s = min(max(s, EPS), 1 - EPS)
    p = chemin.point_from_proportion(s)
    stylo.become(modele.copy().rotate(angle - PI / 2, about_point=ORIGIN).shift(p))


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def image_dessine() -> VGroup:
    """Un cadre avec un paysage dedans : c'est ça, une image."""
    cadre = Rectangle(width=1.30, height=1.00, stroke_color=WHITE, stroke_width=5)
    cadre.set_fill(opacity=0)
    soleil = Circle(radius=0.16, stroke_color=JAUNE_TITRE, stroke_width=4)
    soleil.set_fill(opacity=0).shift(LEFT * 0.34 + UP * 0.22)
    mont = Polygon(
        np.array([-0.55, -0.42, 0]), np.array([-0.05, 0.22, 0]),
        np.array([0.45, -0.42, 0]),
        stroke_color=VERT_OK, stroke_width=4,
    )
    mont.set_fill(opacity=0)
    return VGroup(cadre, soleil, mont)


def igloo_dessine() -> VGroup:
    """Une coupole de neige et sa porte en arche."""
    dome = Arc(radius=0.62, start_angle=0, angle=PI, stroke_color=WHITE, stroke_width=5)
    sol = Line(np.array([-0.62, 0, 0]), np.array([0.62, 0, 0]),
               stroke_color=WHITE, stroke_width=5)
    porte = VGroup(
        Arc(radius=0.20, start_angle=0, angle=PI, stroke_color=BLEU_CALCUL, stroke_width=4),
        Line(np.array([-0.20, 0, 0]), np.array([0.20, 0, 0]),
             stroke_color=BLEU_CALCUL, stroke_width=4),
    )
    briques = VGroup(
        Arc(radius=0.42, start_angle=0, angle=PI, stroke_color=GREY_B, stroke_width=2),
        Line(np.array([-0.42, 0.28, 0]), np.array([-0.30, 0.42, 0]), stroke_width=2),
        Line(np.array([0.42, 0.28, 0]), np.array([0.30, 0.42, 0]), stroke_width=2),
    )
    g = VGroup(dome, sol, briques, porte)
    return g.shift(DOWN * 0.25)


def iguane_dessine() -> VGroup:
    """Un lézard de profil — le cousin de Ti-Margo."""
    corps = Ellipse(width=1.00, height=0.40, stroke_color=VERT_OK, stroke_width=5)
    corps.set_fill(opacity=0)
    tete = Circle(radius=0.22, stroke_color=VERT_OK, stroke_width=5)
    tete.set_fill(opacity=0).shift(RIGHT * 0.60)
    oeil = Dot(np.array([0.66, 0.06, 0]), radius=0.045)
    queue = ArcBetweenPoints(
        np.array([-0.50, 0.0, 0]), np.array([-1.10, 0.28, 0]),
        angle=-PI / 2.4, stroke_color=VERT_OK, stroke_width=4,
    )
    pattes = VGroup(
        Line(np.array([-0.20, -0.18, 0]), np.array([-0.30, -0.48, 0]), stroke_width=4),
        Line(np.array([0.26, -0.18, 0]), np.array([0.36, -0.48, 0]), stroke_width=4),
    )
    crete = VGroup(
        *[
            Polygon(
                np.array([x - 0.07, 0.18, 0]), np.array([x, 0.36, 0]),
                np.array([x + 0.07, 0.18, 0]),
                stroke_color=VERT_OK, stroke_width=3,
            ).set_fill(opacity=0)
            for x in (-0.24, 0.0, 0.24)
        ]
    )
    return VGroup(queue, corps, crete, pattes, tete, oeil)


def iris_dessine() -> VGroup:
    """La fleur, en bleu — la couleur de l'iris.

    ⛔ PREMIÈRE VERSION ÉCARTÉE AU RENDU : trois pétales étroits (0,30 de large)
    et vides. Réduits à 0,52 dans la liste des mots, ils ne faisaient plus qu'un
    bâton — le seul dessin des cinq qui ne disait rien. Les dessins de cette
    vidéo se jugent à leur TAILLE FINALE, pas dans le code.
    ⭐ Cinq pétales larges autour d'un cœur : à cette échelle, l'enfant doit
    d'abord lire « fleur ». La justesse botanique de l'iris ne tient pas en
    trente pixels ; la couleur, si.
    """
    petales = VGroup(
        *[
            Ellipse(width=0.34, height=0.52, stroke_color=BLEU_CALCUL, stroke_width=4)
            .set_fill(opacity=0)
            .rotate(a)
            .shift(0.30 * np.array([-np.sin(a), np.cos(a), 0]) + UP * 0.34)
            for a in (0, TAU / 5, 2 * TAU / 5, 3 * TAU / 5, 4 * TAU / 5)
        ]
    )
    coeur = Circle(radius=0.13, stroke_color=JAUNE_TITRE, stroke_width=4)
    coeur.set_fill(opacity=0).shift(UP * 0.34)
    tige = Line(np.array([0, 0.0, 0]), np.array([0, -0.72, 0]),
                stroke_color=VERT_OK, stroke_width=5)
    feuille = ArcBetweenPoints(
        np.array([0, -0.28, 0]), np.array([-0.46, -0.70, 0]),
        angle=PI / 2.6, stroke_color=VERT_OK, stroke_width=4,
    )
    return VGroup(tige, feuille, petales, coeur)


def immeuble_dessine() -> VGroup:
    """Un bâtiment haut, ses fenêtres, sa porte."""
    mur = Rectangle(width=0.90, height=1.50, stroke_color=WHITE, stroke_width=5)
    mur.set_fill(opacity=0)
    fenetres = VGroup(
        *[
            Rectangle(width=0.22, height=0.22, stroke_color=JAUNE_TITRE, stroke_width=3)
            .set_fill(opacity=0)
            .shift(RIGHT * x + UP * y)
            for y in (0.46, 0.10, -0.26)
            for x in (-0.22, 0.22)
        ]
    )
    porte = Rectangle(width=0.24, height=0.34, stroke_color=BLEU_CALCUL, stroke_width=4)
    porte.set_fill(opacity=0).shift(DOWN * 0.58)
    return VGroup(mur, fenetres, porte)


# ─── La voix ──────────────────────────────────────────────────────────────────
# ⚠️ DURÉES MESURÉES par `scripts/generer-voix.ps1`, pas estimées.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-i"
DUREE = {
    "00-aujourdhui": 3.15, "01-ecoute": 2.96, "02-regarde": 3.00, "03-depart": 7.56,
    "04-le-point": 4.21, "05-encore": 2.92, "06-cherchons": 4.09, "06-i-comme": 1.56,
    "07-image": 1.61, "08-igloo": 1.48, "09-iguane": 1.66, "10-iris": 1.52,
    "11-immeuble": 1.63, "11-pareil": 4.71, "12-relance": 2.91, "13-va-sur": 3.16,
    "14-tout": 8.14, "15-bientot": 1.71,
}
CLIPS_MOTS = ["07-image", "08-igloo", "09-iguane", "10-iris", "11-immeuble"]


class _LettreIBase(Scene):
    """Le contenu, écrit une fois. Les quatre variantes n'en changent que deux
    choses : le cadre, et le côté vers lequel le stylo penche."""

    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """Joue un clip et rend sa durée. ⛔ RENDRE SANS CACHE (voir lettre_a)."""
        self.add_sound(str(VOIX / f"{nom}.wav"))
        return DUREE[nom]

    def construct(self):
        son = Text("i", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        # ── 0. LA PAGE DE GARDE : DE 0 À ~1,5 SECONDE ──────────────────────
        # ⭐ Elle vient du MODULE COMMUN. Elle vivait ici en copie, et c'est
        # ainsi que « Fiches d'écriture » avait manqué à l'écran de fin :
        # une seule des trois copies avait été mise à jour.
        garde, garde_main = page_de_garde(
            self, "i", chemin_i(stroke_width=12), MascotteMargouillat()
        )

        # ── 1. L'ACCUEIL, À LA SECONDE PILE ─────────────────────────────────
        self.play(
            FadeOut(garde),
            FadeOut(garde_main),
            FadeIn(titre),
            FadeIn(son),
            FadeIn(margo),
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
        self.play(
            FadeOut(titre),
            FadeOut(margo, shift=RIGHT * 0.4),
            son.animate.scale(0.40).to_corner(UL, buff=0.55),
        )
        self.wait(0.4)

        # ── 2. LE GESTE, LENTEMENT ──────────────────────────────────────────
        lignes = reglure(3)
        lettre = chemin_i(stroke_width=14 if not self.vertical else 16)
        pos_point = POSITION_POINT.copy()
        groupe = VGroup(lignes, lettre)
        # ⚠️ Le point suit le MÊME déplacement que le groupe, sinon il reste où
        # la géométrie l'avait posé et flotte à côté de la lettre.
        avant = lettre.get_start().copy()
        groupe.move_to(ORIGIN).shift(DOWN * 0.4)
        pos_point += lettre.get_start() - avant

        modele = chemin_i(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "i", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
        angle_main = PI - ANGLE_STYLO if self.gaucher else ANGLE_STYLO
        stylo.add_updater(
            lambda m: poser_stylo(m, modele_stylo, lettre, avance.get_value(), angle_main)
        )

        self.remove(lettre)
        self.add(trace, stylo)
        d = self.dire("03-depart")
        self.play(avance.animate.set_value(1.0), run_time=d - 0.4, rate_func=linear)
        trace.clear_updaters()
        stylo.clear_updaters()

        # ── 2 bis. ON LÈVE LE CRAYON, ET ON POSE LE POINT ───────────────────
        # ⭐⭐ LE GESTE QUE LE « a » N'AVAIT PAS. Le crayon QUITTE la feuille :
        # on le voit se soulever, aller au-dessus de la lettre, et poser le
        # point. Un trait qui remonterait du corps jusqu'au point enseignerait
        # un « i » attaché, qui n'est pas un « i ».
        # ⚠️ On décale le stylo de (cible − pointe actuelle) : sa pointe est son
        # origine, donc un `shift` suffit et l'inclinaison ne bouge pas.
        d = self.dire("04-le-point")
        pointe_actuelle = lettre.point_from_proportion(1 - EPS)
        le_point = Dot(pos_point, radius=0.11, color=WHITE)
        self.play(
            stylo.animate.shift(pos_point - pointe_actuelle + UP * 0.10), run_time=1.2
        )
        self.play(FadeIn(le_point, scale=3), run_time=0.4)
        self.play(FadeOut(stylo, scale=0.6), run_time=0.5)
        self.wait(max(0.4, d - 2.1))

        # ── 3. ON REFAIT, PLUS VITE ─────────────────────────────────────────
        self.dire("05-encore")
        for duree in (2.0, 1.2):
            self.remove(trace, le_point)
            trace = chemin_i(stroke_width=14 if not self.vertical else 16)
            trace.match_points(lettre)
            le_point = Dot(pos_point, radius=0.11, color=WHITE)
            self.play(Create(trace), run_time=duree, rate_func=linear)
            self.play(FadeIn(le_point, scale=2), run_time=0.25)
            self.wait(0.3)

        self.play(FadeOut(point), FadeOut(lignes), FadeOut(imprime))

        # ── 4. « i » COMME… CINQ MOTS, CHACUN AVEC SON DESSIN ───────────────
        self.play(FadeOut(trace), FadeOut(le_point))

        titre_mots = Text("i comme…", font_size=50)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            image_dessine(), igloo_dessine(), iguane_dessine(),
            iris_dessine(), immeuble_dessine(),
        ]
        echelle_dessin = 0.52 if not self.vertical else 0.46
        lignes_mots = VGroup()
        for mot, dessin in zip(MOTS_EN_I, dessins):
            t = Text(mot, font_size=42 if not self.vertical else 38)
            t[0].set_color(JAUNE_TITRE)
            dd = dessin.scale(echelle_dessin)
            lignes_mots.add(VGroup(t, dd).arrange(RIGHT, buff=0.55))

        # ⚠️ Alignés à GAUCHE : centrer ferait danser les initiales, et c'est
        # justement l'initiale qu'on regarde.
        lignes_mots.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        bloc = VGroup(titre_mots, lignes_mots).arrange(DOWN, buff=0.5)
        bloc.move_to(ORIGIN).scale(0.95 if not self.vertical else 0.8)

        dc = self.dire("06-cherchons")
        self.wait(dc)
        d = self.dire("06-i-comme")
        self.play(FadeIn(titre_mots, shift=DOWN * 0.3))
        self.wait(max(0.2, d - 1.0))
        for ligne, clip in zip(lignes_mots, CLIPS_MOTS):
            duree_mot = self.dire(clip)
            # ⚠️ Le zoom porte sur la ligne ENTIÈRE, mot et image.
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.22), run_time=0.35)
            self.wait(0.45)
            self.play(ligne.animate.scale(1 / 1.22), run_time=0.3)
            self.wait(max(0.15, duree_mot - 1.45))
        dp = self.dire("11-pareil")
        self.wait(dp)

        # ── 4 bis. LA RELANCE ───────────────────────────────────────────────
        self.play(FadeOut(bloc))
        # ⛔⛔ DEUX LIGNES EN PORTRAIT, JAMAIS UNE. La phrase mesure 9,57 de
        # large à 54, et le cadre 9:16 n'en offre que 3,90 : elle sortait des
        # deux côtés. La réduire ne suffit pas (5,64 encore à 32).
        # ⭐ ET C'EST LE FORMAT QUI COMPTE : 98 vues pour un Short contre 1 pour
        # le paysage (relevé le 03/09). Le portrait n'est pas la version
        # secondaire, c'est celle que les gens voient.
        relance = ecran_relance(self.vertical, "i")
        d = self.dire("12-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        # ── 5. LA PAGE DE FIN : OÙ ALLER MAINTENANT ─────────────────────────
        # ⭐ On nomme le COACH FRANÇAIS, pas l'accueil : c'est la porte d'entrée
        # qui mène au tutor. Page vérifiée : /coach-ia/francais?classe=cp.
        # ⭐ L'ÉCRAN DE FIN VIENT DU MODULE COMMUN. Il portait ici sa propre
        # copie de la liste — et le jour où « Fiches d'écriture » est arrivée,
        # seule celle de `lettre_commune.py` a été mise à jour : la vidéo du
        # « i » a été rendue avec l'ANCIENNE liste, « Coach Maths » compris.
        # C'est très exactement la duplication que le module devait supprimer.
        page_de_fin(self, margo, "13-va-sur", "14-tout", "15-bientot")


class _Portrait:
    """9:16 — Shorts, Reels, TikTok.

    ⚠️ LE CADRE LOGIQUE S'IMPOSE DANS `__init__`, avant `super()`. Passer
    seulement `-r 1080,1920` ne change que les pixels.
    """

    vertical = True

    def __init__(self, *args, **kwargs):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(*args, **kwargs)


class LettreICp(_LettreIBase):
    """16:9, droitier."""


class LettreICpGaucher(_LettreIBase):
    """16:9, gaucher."""

    gaucher = True


class LettreICpPortrait(_Portrait, _LettreIBase):
    """9:16, droitier."""


class LettreICpPortraitGaucher(_Portrait, _LettreIBase):
    """9:16, gaucher."""

    gaucher = True
