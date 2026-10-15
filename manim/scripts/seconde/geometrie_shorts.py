# geometrie_shorts.py
# EleveAI — Maths seconde — les trois shorts de « Problèmes de géométrie plane »
# (notionId : geometrie_problemes_plan)
#
# ⭐ UN SHORT PAR MICRO QUI TIENT SEULE EN UNE MINUTE. `geo_trig_identite` et
# `geo_longueurs_aires` restent à la leçon longue : la première est un outil
# sans surprise, la seconde est la suite du projeté, pas un sujet à part.
#
# - GeometrieShortPente   → geo_trigonometrie       (12 % n'est pas 12°)
# - GeometrieShortProjete → geo_projete_orthogonal  (le chemin le plus court)
# - GeometrieShortEnclos  → geo_optimisation        (60 m de clôture)
#
# ⛔ Fichier SÉPARÉ de `geometrie_problemes_plan.py` : `ShortSeconde.__init__`
# fixe `config.frame_width` à 4,5 pour tout le module. Garder la leçon paysage
# et ses shorts dans un même fichier marche (Manim rend une scène par appel),
# mais un import de la leçon depuis un autre script hériterait du cadre
# vertical. On isole.
#
# Rendu (chacun) :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/geometrie_shorts.py <Classe> -o <nom> -r 1080,1920 --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, ShortSeconde

VOIX_PENTE = SONS / "seconde-geometrie-short-pente"
VOIX_PROJETE = SONS / "seconde-geometrie-short-projete"
VOIX_ENCLOS = SONS / "seconde-geometrie-short-enclos"


def cote(p, q, texte, decalage, font_size=26, color=WHITE):
    """La mesure d'un segment, posée à côté de lui et non dessus."""
    t = Text(texte, font_size=font_size, color=color)
    t.move_to((p + q) / 2 + decalage)
    return t


class GeometrieShortPente(ShortSeconde):
    """⭐ 12 % n'est pas 12°. Un panneau que tout le monde a vu, et que presque
    tout le monde lit de travers."""

    dossier_voix = VOIX_PENTE

    def triangle_pente(self, y=1.5):
        A = np.array([-1.7, y - 0.45, 0])
        B = A + RIGHT * 3.4
        C = B + UP * 0.72
        return A, B, C, Polygon(A, B, C, color=WHITE, stroke_width=4)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("PENTE 12 %", font_size=58, color=ORANGE_RETENUE),
            self.grand("=  12° ?", font_size=62, color=WHITE),
        ).arrange(DOWN, buff=0.35).move_to([0, 2.4, 0])
        self.play(FadeIn(t, shift=DOWN * 0.15), run_time=0.5)
        non = self.grand("NON", font_size=92, color=ROUGE_ERREUR).move_to([0, 0.6, 0])
        self.play(GrowFromCenter(non))
        self.play(Flash(non, color=ROUGE_ERREUR, line_length=0.45))
        self.play(Write(self.grand("presque deux fois moins", font_size=32,
                                   color=WHITE).move_to([0, -0.7, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_sens(self):
        self.clear()
        self.margo_bas()
        self.dire("01-sens")
        self.play(Write(self.grand("Ce que ça veut dire", font_size=38,
                                   color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        A, B, C, tri = self.triangle_pente()
        self.play(Create(tri))
        self.play(Create(RightAngle(Line(B, A), Line(B, C), length=0.24,
                                    color=BLEU_CALCUL, stroke_width=3)))
        self.play(FadeIn(cote(A, B, "100 m à plat", DOWN * 0.38, 24, WHITE)),
                  FadeIn(cote(B, C, "12 m", RIGHT * 0.55, 26, ORANGE_RETENUE)))
        bas = VGroup(
            self.grand("12 en hauteur", font_size=38, color=ORANGE_RETENUE),
            self.grand("100 en largeur", font_size=38, color=WHITE),
            self.grand("à l'HORIZONTALE", font_size=30, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, -1.3, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_calcul(self):
        self.clear()
        self.margo_bas()
        self.dire("02-calcul")
        self.play(Write(self.grand("Opposé sur adjacent", font_size=36,
                                   color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("c'est une TANGENTE", font_size=42, color=BLEU_CALCUL),
            self.grand("tan α  =  12/100", font_size=44, color=WHITE),
            self.grand("=  0,12", font_size=44, color=WHITE),
        ).arrange(DOWN, buff=0.32).move_to([0, 1.8, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        rep = self.grand("α  =  6,8°", font_size=78, color=VERT_OK).move_to([0, -0.5, 0])
        self.play(GrowFromCenter(rep))
        self.play(Flash(rep, color=VERT_OK, line_length=0.4))
        self.play(Write(self.grand("une pente n'est jamais un angle", font_size=28,
                                   color=ORANGE_RETENUE).move_to([0, -1.7, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("03-piege")
        self.play(Write(self.grand("Le second piège", font_size=38,
                                   color=ROUGE_ERREUR).move_to([0, 3.15, 0])))
        A, B, C, tri = self.triangle_pente(y=1.9)
        self.play(Create(tri))
        self.play(Create(Line(A, C, color=ROUGE_ERREUR, stroke_width=7)),
                  FadeIn(cote(A, C, "2 km", np.array([0.05, 0.42, 0]), 26,
                              ROUGE_ERREUR)))
        self.play(Write(self.grand("ton compteur mesure ÇA", font_size=28,
                                   color=ROUGE_ERREUR).move_to([0, 0.35, 0])))
        bas = VGroup(
            self.grand("c'est l'HYPOTÉNUSE", font_size=36, color=ROUGE_ERREUR),
            self.grand("donc SINUS, pas tangente", font_size=30, color=VERT_OK),
            self.grand("2000 × sin 6,8°  =  238 m", font_size=32, color=VERT_OK),
            self.grand("et non 240", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.35, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("un % de pente", font_size=38, color=WHITE),
            self.grand("c'est une TANGENTE", font_size=44, color=ORANGE_RETENUE),
            self.grand("jamais un angle", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.26).move_to([0, 2.1, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        b2 = VGroup(
            self.grand("et ton compteur", font_size=34, color=WHITE),
            self.grand("mesure l'HYPOTÉNUSE", font_size=36, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, -0.5, 0])
        self.play(FadeIn(b2, shift=UP * 0.12), run_time=0.5)
        self.play(Flash(b2[1], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_sens()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_retenir()
        self.ecran_renvoi()


class GeometrieShortProjete(ShortSeconde):
    """⭐ Le plus court chemin vers une droite — et sa DÉMONSTRATION en une
    ligne : l'hypoténuse est le plus grand côté."""

    dossier_voix = VOIX_PROJETE

    def scene_droite(self, y=1.4):
        d = Line([-1.9, y - 1.2, 0], [1.9, y - 1.2, 0], color=WHITE, stroke_width=4)
        M = np.array([-0.8, y + 1.0, 0])
        H = np.array([-0.8, y - 1.2, 0])
        A = np.array([1.1, y - 1.2, 0])
        return d, M, H, A

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("UNE ROUTE", font_size=46, color=WHITE),
            self.grand("UN PHARE", font_size=46, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.28).move_to([0, 2.5, 0])
        self.play(FadeIn(t, shift=DOWN * 0.15), run_time=0.5)
        q = VGroup(
            self.grand("par où pars-tu", font_size=40, color=WHITE),
            self.grand("pour aller le plus vite ?", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.9, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.45)
        self.play(Write(self.grand("une seule bonne réponse", font_size=32,
                                   color=ORANGE_RETENUE).move_to([0, -0.5, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_perpendiculaire(self):
        self.clear()
        self.margo_bas()
        self.dire("01-perpendiculaire")
        self.play(Write(self.grand("La perpendiculaire", font_size=40,
                                   color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        d, M, H, A = self.scene_droite()
        self.play(Create(d))
        self.play(GrowFromCenter(Dot(M, color=JAUNE_TITRE, radius=0.09)),
                  FadeIn(Text("M", font_size=30, color=JAUNE_TITRE)
                         .next_to(M, UP, buff=0.12)))
        self.play(Create(Line(M, H, color=VERT_OK, stroke_width=7)),
                  GrowFromCenter(Dot(H, color=VERT_OK, radius=0.08)),
                  FadeIn(Text("H", font_size=28, color=VERT_OK)
                         .next_to(H, DOWN, buff=0.14)))
        self.play(Create(RightAngle(Line(H, M), Line(H, A), length=0.26,
                                    color=VERT_OK, stroke_width=3)))
        bas = VGroup(
            self.grand("H = le PROJETÉ", font_size=38, color=VERT_OK),
            self.grand("ORTHOGONAL de M", font_size=34, color=VERT_OK),
            self.grand("le pied de la perpendiculaire", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.24).move_to([0, -1.5, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("02-pourquoi")
        self.play(Write(self.grand("Pourquoi ?", font_size=42,
                                   color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        # ⛔ M doit être TRACÉ et NOMMÉ : sans lui, l'écran montre un segment
        # vert qui part de nulle part, et la phrase « MA est l'hypoténuse »
        # parle d'un point qu'on ne voit pas (planche du 24/09).
        d, M, H, A = self.scene_droite(y=1.2)
        self.play(Create(d))
        self.play(GrowFromCenter(Dot(M, color=JAUNE_TITRE, radius=0.09)),
                  FadeIn(Text("M", font_size=30, color=JAUNE_TITRE)
                         .next_to(M, UP, buff=0.12)))
        self.play(Create(Line(M, H, color=VERT_OK, stroke_width=6)),
                  Create(RightAngle(Line(H, M), Line(H, A), length=0.26,
                                    color=VERT_OK, stroke_width=3)),
                  FadeIn(Text("H", font_size=26, color=VERT_OK)
                         .next_to(H, DOWN, buff=0.14)))
        self.play(Create(Line(M, A, color=ORANGE_RETENUE, stroke_width=6)),
                  FadeIn(Text("A", font_size=28, color=ORANGE_RETENUE)
                         .next_to(A, DOWN, buff=0.14)))
        bas = VGroup(
            self.grand("MA est l'HYPOTÉNUSE", font_size=32, color=ORANGE_RETENUE),
            self.grand("du triangle MHA", font_size=26, color=WHITE),
            self.grand("or l'hypoténuse est", font_size=26, color=WHITE),
            self.grand("LE PLUS GRAND CÔTÉ", font_size=32, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.5, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_exemple(self):
        self.clear()
        self.margo_bas()
        self.dire("03-exemple")
        self.play(Write(self.grand("Un exemple", font_size=40,
                                   color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("HA = 5 m", font_size=42, color=WHITE),
            self.grand("MA = 13 m", font_size=42, color=ORANGE_RETENUE),
            self.grand("MH²  =  169 − 25  =  144", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.7, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        rep = self.grand("MH  =  12 m", font_size=60, color=VERT_OK).move_to([0, -0.6, 0])
        self.play(GrowFromCenter(rep))
        self.play(Flash(rep, color=VERT_OK, line_length=0.4))
        self.play(Write(self.grand("la distance de M à la droite", font_size=28,
                                   color=VERT_OK).move_to([0, -1.7, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("la distance", font_size=38, color=WHITE),
            self.grand("d'un point à une droite", font_size=32, color=WHITE),
            self.grand("c'est TOUJOURS", font_size=36, color=VERT_OK),
            self.grand("la perpendiculaire", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.9, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.play(Write(self.chute("Et c'est aussi la hauteur d'un triangle.",
                                   color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_perpendiculaire()
        self.ecran_pourquoi()
        self.ecran_exemple()
        self.ecran_retenir()
        self.ecran_renvoi()


class GeometrieShortEnclos(ShortSeconde):
    """⭐ Deux largeurs différentes donnent la MÊME aire : 10 et 20 donnent 400.
    C'est la symétrie de la parabole, montrée sans le mot."""

    dossier_voix = VOIX_ENCLOS

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("60 m DE CLÔTURE", font_size=44, color=ORANGE_RETENUE),
            self.grand("UNE RIVIÈRE", font_size=44, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.3).move_to([0, 2.5, 0])
        self.play(FadeIn(t, shift=DOWN * 0.15), run_time=0.5)
        q = VGroup(
            self.grand("le plus grand", font_size=44, color=WHITE),
            self.grand("enclos possible ?", font_size=44, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.8, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.45)
        self.play(Write(self.grand("ce n'est pas le carré", font_size=32,
                                   color=ROUGE_ERREUR).move_to([0, -0.6, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_equation(self):
        self.clear()
        self.margo_bas()
        self.dire("01-mise-en-equation")
        riviere = Line([-1.7, 2.6, 0], [1.7, 2.6, 0], color=BLEU_CALCUL, stroke_width=9)
        self.play(Create(riviere),
                  FadeIn(self.grand("la rivière", font_size=26, color=BLEU_CALCUL)
                         .move_to([0, 3.05, 0])))
        coins = [np.array([-1.3, 2.6, 0]), np.array([1.3, 2.6, 0]),
                 np.array([1.3, 0.9, 0]), np.array([-1.3, 0.9, 0])]
        for p, q, coul in ((coins[0], coins[3], VERT_OK),
                           (coins[3], coins[2], ORANGE_RETENUE),
                           (coins[2], coins[1], VERT_OK)):
            self.play(Create(Line(p, q, color=coul, stroke_width=7)), run_time=0.35)
        self.play(FadeIn(cote(coins[0], coins[3], "x", LEFT * 0.3, 34, VERT_OK)),
                  FadeIn(cote(coins[1], coins[2], "x", RIGHT * 0.3, 34, VERT_OK)),
                  FadeIn(cote(coins[3], coins[2], "60 − 2x", DOWN * 0.34, 28,
                              ORANGE_RETENUE)))
        bas = VGroup(
            self.grand("les deux largeurs : 2x", font_size=30, color=VERT_OK),
            self.grand("il reste 60 − 2x", font_size=32, color=ORANGE_RETENUE),
            self.grand("pour la longueur", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.24).move_to([0, -1.0, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_essais(self):
        self.clear()
        self.margo_bas()
        self.dire("02-essais")
        self.play(Write(self.grand("A(x) = 60x − 2x²", font_size=44,
                                   color=JAUNE_TITRE).move_to([0, 3.05, 0])))
        valeurs = [("x = 5", "250 m²", WHITE), ("x = 10", "400 m²", VERT_OK),
                   ("x = 20", "400 m²", VERT_OK), ("x = 25", "250 m²", WHITE)]
        lignes = VGroup(*[
            VGroup(self.grand(g, font_size=34, color=WHITE),
                   self.grand("→", font_size=30, color=WHITE),
                   self.grand(dr, font_size=36, color=c)
                   ).arrange(RIGHT, buff=0.3)
            for g, dr, c in valeurs
        ]).arrange(DOWN, buff=0.3).move_to([0, 1.3, 0])
        for m in lignes:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)
        self.play(Circumscribe(VGroup(lignes[1], lignes[2]), color=VERT_OK, buff=0.14))
        self.play(Write(self.grand("ça monte, puis ça redescend", font_size=30,
                                   color=ORANGE_RETENUE).move_to([0, -1.3, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_canonique(self):
        self.clear()
        self.margo_bas()
        self.dire("03-canonique")
        self.play(Write(self.grand("La forme canonique", font_size=40,
                                   color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        bloc = VGroup(
            self.grand("60x − 2x²", font_size=44, color=WHITE),
            self.grand("=", font_size=32, color=WHITE),
            self.grand("450 − 2(x − 15)²", font_size=44, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.8, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(bloc[2], color=BLEU_CALCUL, line_length=0.35))
        bas = VGroup(
            self.grand("un carré est ≥ 0", font_size=34, color=WHITE),
            self.grand("on retire toujours", font_size=28, color=ORANGE_RETENUE),
            self.grand("quelque chose à 450…", font_size=28, color=ORANGE_RETENUE),
            self.grand("sauf si x = 15", font_size=42, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.2, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        rep = VGroup(
            self.grand("450 m²", font_size=74, color=VERT_OK),
            self.grand("15 m  ×  30 m", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.28).move_to([0, 2.2, 0])
        self.play(FadeIn(rep, shift=DOWN * 0.15), run_time=0.5)
        self.play(Flash(rep[0], color=VERT_OK, line_length=0.45))
        bas = VGroup(
            self.grand("une aire écrite", font_size=32, color=WHITE),
            self.grand("avec un CARRÉ", font_size=38, color=JAUNE_TITRE),
            self.grand("donne son maximum", font_size=32, color=WHITE),
            self.grand("sans calcul", font_size=38, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.4, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_equation()
        self.ecran_essais()
        self.ecran_canonique()
        self.ecran_retenir()
        self.ecran_renvoi()
