# Création et écriture de la lettre « u » — CP
#
# ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, notion `grapheme_phoneme`.
# Micros couvertes : cp_gph_voyelles (le son [y]) et cp_copie_lettre (le tracé).
#
# ⭐⭐ PREMIÈRE LETTRE AU FORMAT « LE SON DANS LE MOT ».
# Les trois premières (a, i, o) montraient cinq mots COMMENÇANT par la lettre.
# Le « u » n'en a pas : en français, `u` initial ne donne que usine, uniforme,
# urne, ustensile, ukulélé — dont trois qu'un enfant de six ans n'a jamais
# entendus. Forcer l'initiale, c'était enseigner la règle avec des mots que
# l'élève ne connait pas.
# ⭐ Arbitrage de Frédéric (04/09) : lune, mur, tortue, plume, jupe. De VRAIS
# mots de CP, tous dessinables, et le `u` colorié À SA PLACE dans le mot.
# ⚠️ C'est aussi la seule formule qui marchera pour le « e » et pour les vingt
# consonnes : ce n'est pas une exception, c'est le format de la suite.
#
# ⛔ TOUJOURS --disable_caching, et UNE COMMANDE PAR SCÈNE.
# ⛔ ON NE REND PLUS QUE LES SHORTS (Frédéric, 04/09) : 126 vues pour un Short
#    contre 2 pour la vidéo paysage. Les scènes 16:9 restent, on ne les rend pas.
#
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/lettre_u.py LettreUCpPortrait \
#                       -o eleveai-francais-cp-lettre-u-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/lettre_u.py LettreUCpPortraitGaucher \
#                       -o eleveai-francais-cp-lettre-u-gaucher-portrait --media_dir manim/scripts/cp/media

import sys
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

# ─── Le chemin du « u » ───────────────────────────────────────────────────────
# ⭐ DEUX PONTS : c'est le premier geste RÉPÉTÉ que l'enfant rencontre, et c'est
# ce qui le prépare au « n », au « m », au « i » double. Sommets pointus, creux
# ARRONDIS — l'inverse ferait un « v » doublé.
#
# ⭐ Deux essais au rendu avant d'écrire du Manim : au premier, les deux ponts
# étaient trop serrés et la lettre se lisait « m ». Élargie, et les creux
# adoucis en amenant la courbe à l'horizontale au fond de la vallée.
DEPART = np.array([-0.82, 0.00, 0])
COURBES = [
    # 1 — le premier pont : la montée oblique
    ((-0.70, 0.34), (-0.52, 0.68), (-0.34, 0.95)),
    # 2 — on redescend, et le creux est ROND (la courbe arrive à l'horizontale)
    ((-0.28, 0.52), (-0.26, 0.04), (-0.02, 0.02)),
    # 3 — le second pont
    ((0.14, 0.02), (0.22, 0.50), (0.28, 0.95)),
    # 4 — la seconde descente
    ((0.34, 0.56), (0.34, 0.10), (0.48, 0.04)),
    # 5 — la sortie, qui amorce la lettre suivante
    ((0.60, 0.00), (0.70, 0.12), (0.86, 0.30)),
]

# ⭐ Cinq mots où l'on ENTEND [y], et où on VOIT le `u`.
# ⛔ Écartés : tous les mots en « ou » (loup, jour) — « ou » se lit [u], pas
# [y] ; et tous les « un/um » (lundi, parfum) — nasale [œ̃]. La lettre y est,
# le son n'y est pas : c'est le même piège que « ours » pour le « o ».
# Chaque couple dit le mot ET la position du `u` dans ce mot.
MOTS_EN_U = [("lune", 1), ("mur", 1), ("tortue", 4), ("plume", 2), ("jupe", 1)]


def chemin_u(stroke_width: float = 10, color: str = WHITE) -> VMobject:
    return chemin_bezier(DEPART, COURBES, stroke_width, color)


# ─── Les cinq dessins ─────────────────────────────────────────────────────────
def lune_dessine() -> VGroup:
    """Un croissant : deux arcs qui se REJOIGNENT en pointe.

    ⛔ PREMIÈRE VERSION ÉCARTÉE AU RENDU : deux `Arc` posés l'un sur l'autre,
    dont les extrémités ne se touchaient pas. Réduit à l'échelle de la liste,
    ça faisait un ANNEAU — une lune pleine trouée, pas un croissant.
    ⭐ Un croissant se dessine par ses DEUX POINTES : on part d'un point, on
    contourne largement, on revient en creusant. C'est la rencontre des
    extrémités qui fait la forme, pas la superposition.
    """
    p1 = np.array([0.20, 0.46, 0])
    p2 = np.array([0.20, -0.46, 0])
    exterieur = ArcBetweenPoints(
        p1, p2, angle=1.30 * PI, stroke_color=JAUNE_TITRE, stroke_width=5
    )
    interieur = ArcBetweenPoints(
        p2, p1, angle=-0.55 * PI, stroke_color=JAUNE_TITRE, stroke_width=5
    )
    etoile = VGroup(
        Line(np.array([0.56, 0.50, 0]), np.array([0.56, 0.74, 0]), stroke_width=3),
        Line(np.array([0.44, 0.62, 0]), np.array([0.68, 0.62, 0]), stroke_width=3),
    ).set_color(JAUNE_TITRE)
    return VGroup(exterieur, interieur, etoile)


def mur_dessine() -> VGroup:
    """Un mur de briques : trois rangées décalées."""
    g = VGroup()
    largeur, hauteur = 0.44, 0.26
    for rang in range(3):
        y = -0.30 + rang * hauteur
        decalage = (largeur / 2) if rang % 2 else 0
        for k in range(-2, 2):
            x = k * largeur + decalage + largeur / 2
            if abs(x) > 0.80:
                continue
            b = Rectangle(width=largeur, height=hauteur,
                          stroke_color=ORANGE_RETENUE, stroke_width=4)
            g.add(b.set_fill(opacity=0).shift(np.array([x, y, 0])))
    return g


def tortue_dessine() -> VGroup:
    """Une tortue de profil : la carapace, la tête, les pattes."""
    carapace = Arc(radius=0.52, start_angle=0, angle=PI,
                   stroke_color=VERT_OK, stroke_width=5)
    ventre = Line(np.array([-0.52, 0, 0]), np.array([0.52, 0, 0]),
                  stroke_color=VERT_OK, stroke_width=5)
    ecailles = VGroup(
        *[Line(np.array([0.36 * np.cos(a), 0.36 * np.sin(a), 0]),
               np.array([0.50 * np.cos(a), 0.50 * np.sin(a), 0]),
               stroke_color=VERT_OK, stroke_width=3)
          for a in (PI / 5, PI / 2, 4 * PI / 5)]
    )
    tete = Circle(radius=0.17, stroke_color=VERT_OK, stroke_width=5)
    tete.set_fill(opacity=0).shift(np.array([0.64, 0.10, 0]))
    oeil = Dot(np.array([0.70, 0.14, 0]), radius=0.04)
    pattes = VGroup(
        Rectangle(width=0.16, height=0.16, stroke_color=VERT_OK, stroke_width=4)
        .set_fill(opacity=0).shift(np.array([-0.30, -0.10, 0])),
        Rectangle(width=0.16, height=0.16, stroke_color=VERT_OK, stroke_width=4)
        .set_fill(opacity=0).shift(np.array([0.26, -0.10, 0])),
    )
    return VGroup(carapace, ventre, ecailles, pattes, tete, oeil).shift(DOWN * 0.10)


def plume_dessine() -> VGroup:
    """Une plume : un contour en amande, sa tige, ses barbes.

    ⛔ PREMIÈRE VERSION ÉCARTÉE AU RENDU : une tige seule et quatre traits
    obliques. À la taille de la liste, ça faisait un éclat, pas une plume —
    l'œil n'avait aucun CONTOUR à reconnaitre.
    ⭐ Même leçon que l'iris du « i » et l'oreille du « o » : à trente pixels,
    une forme fermée se lit, un faisceau de traits non.
    """
    haut = np.array([0.06, 0.72, 0])
    bas = np.array([-0.06, -0.30, 0])
    contour = VGroup(
        ArcBetweenPoints(bas, haut, angle=0.62, stroke_color=BLEU_CALCUL, stroke_width=5),
        ArcBetweenPoints(haut, bas, angle=0.62, stroke_color=BLEU_CALCUL, stroke_width=5),
    )
    tige = Line(haut, np.array([-0.14, -0.70, 0]),
                stroke_color=BLEU_CALCUL, stroke_width=4)
    barbes = VGroup(
        *[Line(np.array([-0.02 - 0.03 * i, 0.44 - 0.20 * i, 0]),
               np.array([0.16 - 0.03 * i, 0.52 - 0.20 * i, 0]),
               stroke_color=BLEU_CALCUL, stroke_width=2)
          for i in range(4)]
    )
    return VGroup(contour, tige, barbes)


def jupe_dessine() -> VGroup:
    """Une jupe évasée, avec sa ceinture et ses plis."""
    ceinture = Rectangle(width=0.52, height=0.14, stroke_color=WHITE, stroke_width=4)
    ceinture.set_fill(opacity=0).shift(UP * 0.52)
    corps = Polygon(
        np.array([-0.26, 0.45, 0]), np.array([0.26, 0.45, 0]),
        np.array([0.62, -0.56, 0]), np.array([-0.62, -0.56, 0]),
        stroke_color=BLEU_CALCUL, stroke_width=5,
    )
    corps.set_fill(opacity=0)
    plis = VGroup(
        *[Line(np.array([x * 0.20, 0.42, 0]), np.array([x * 0.50, -0.52, 0]),
               stroke_color=BLEU_CALCUL, stroke_width=2) for x in (-1, 0, 1)]
    )
    return VGroup(corps, plis, ceinture)


# ─── La voix ──────────────────────────────────────────────────────────────────
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-lettre-u"
DUREE = {
    "00-aujourdhui": 3.17, "01-ecoute": 2.99, "02-regarde": 3.03, "03-depart": 9.09,
    "04-encore": 2.92, "05-cherchons": 3.74, "05-u-comme": 1.97, "06-lune": 1.47,
    "07-mur": 1.53, "08-tortue": 1.54, "09-plume": 1.55, "10-jupe": 1.48,
    "10-pareil": 4.79, "11-relance": 2.56, "12-va-sur": 3.16, "13-tout": 8.14,
    "14-bientot": 1.71,
}
CLIPS_MOTS = ["06-lune", "07-mur", "08-tortue", "09-plume", "10-jupe"]


class _LettreUBase(Scene):
    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE, sinon les sons sautent sans un mot."""
        self.add_sound(str(VOIX / f"{nom}.wav"))
        return DUREE[nom]

    def construct(self):
        son = Text("u", font_size=150, color=JAUNE_TITRE)
        titre = Text("la lettre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        garde, garde_main = page_de_garde(
            self, "u", chemin_u(stroke_width=12), MascotteMargouillat()
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

        # ── LE GESTE ────────────────────────────────────────────────────────
        lignes = reglure(3)
        lettre = chemin_u(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, lettre).move_to(ORIGIN).shift(DOWN * 0.4)

        modele = chemin_u(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        modele.match_points(lettre)
        imprime = Text(
            "u", font_size=110 if not self.vertical else 90, color=JAUNE_TITRE
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
            trace = chemin_u(stroke_width=14 if not self.vertical else 16)
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
        titre_mots = Text("u comme dans…", font_size=50 if not self.vertical else 38)
        titre_mots[0].set_color(JAUNE_TITRE)

        dessins = [
            lune_dessine(), mur_dessine(), tortue_dessine(),
            plume_dessine(), jupe_dessine(),
        ]
        # ⛔ PLUS PETIT QUE POUR a/i/o, ET C'EST LE VÉRIFICATEUR QUI L'A DIT.
        # Avec les réglages des trois premières lettres, le bloc mesurait 4,48
        # de large pour 3,90 utiles en portrait : `verifier()` a ARRÊTÉ le rendu
        # au lieu de tout écraser en silence, comme l'ancien filet l'aurait fait.
        # La cause : « tortue » est plus long que « arbre » ou « olive », et le
        # format « dans le mot » amène forcément des mots plus longs.
        echelle = 0.52 if not self.vertical else 0.40
        lignes_mots = VGroup()
        for (mot, pos), dessin in zip(MOTS_EN_U, dessins):
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
        d = self.dire("05-u-comme")
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
        relance = ecran_relance(self.vertical, "u", dans_le_mot=True)
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.08), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-va-sur", "13-tout", "14-bientot")


class LettreUCp(_LettreUBase):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class LettreUCpGaucher(_LettreUBase):
    gaucher = True


class LettreUCpPortrait(Portrait, _LettreUBase):
    """9:16, droitier — LE format qui est vu."""


class LettreUCpPortraitGaucher(Portrait, _LettreUBase):
    gaucher = True
