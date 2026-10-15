# pente_maido_short.py
# EleveAI — Maths 3e — short « La pente du Maïdo » (Diagonale des Fous).
# Idée proposée par YouTube Studio (11/10/2026), chiffres VÉRIFIÉS sur le profil
# officiel du Grand Raid 2025 (descriptif_diagonale_des_fous_25.pdf) :
#   PR10 La Brèche, km 117,9, 1 284 m  →  PR11 Ti Col Maïdo, km 121,2, 2 025 m
#   741 m de dénivelé sur 3,3 km de sentier ≈ 3 216 m à l'horizontale → 23 % ≈ 13°.
# Voix validée (« go », avec la tangente) : manim/voix/3e-pente-maido-short.json
# Branché en 3e seulement (son choix) : trigo_tangente et affine_coeff_directeur.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/pente_maido_short.py ShortPenteMaido3e -o eleveai-maths-3e-pente-maido-short --media_dir manim/scripts/3e/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e


class ShortPenteMaido3e(Short6e):
    nom_voix = "3e-pente-maido-short"

    def ouvrir(self, voix):
        self.clear()
        self.margo_bas()
        self.dire(voix)

    def pile(self, lignes, y, buff=0.16):
        g = VGroup(*[self.grand(t, font_size=s, color=c) for t, s, c in lignes]).arrange(DOWN, buff=buff)
        return g.move_to([0, y, 0])

    def triangle(self, base, haut, origine=(-1.8, 0.0), couleur=VERT_OK):
        """Triangle rectangle : la base à l'horizontale, la hauteur à droite."""
        o = np.array([origine[0], origine[1], 0])
        a, b = o + RIGHT * base, o + RIGHT * base + UP * haut
        pente = Line(o, b, color=couleur, stroke_width=6)
        horiz = Line(o, a, color=WHITE, stroke_width=3)
        vert = Line(a, b, color=BLEU_CALCUL, stroke_width=3)
        angle_droit = Square(side_length=0.18, stroke_width=2, color=WHITE).move_to(a + LEFT * 0.09 + UP * 0.09)
        arc = Arc(radius=0.55, start_angle=0, angle=math.atan2(haut, base), arc_center=o, color=JAUNE_TITRE, stroke_width=3)
        return VGroup(horiz, vert, pente, angle_droit, arc), o, a, b

    def construct(self):
        # 00
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("La montée", 44, WHITE), ("du Maïdo", 64, JAUNE_TITRE)], 2.3)))
        self.au_mot("Une pente à 100")
        self.play(FadeIn(self.pile([("pente à 100 %", 52, BLEU_CALCUL), ("= un mur", 44, WHITE), ("vertical ?", 44, WHITE)], 0.0)))
        self.attendre_voix(marge=0.4)

        # 01
        self.ouvrir("01-piege")
        mur = Line([0.6, 0.6, 0], [0.6, 2.8, 0], color=ORANGE_RETENUE, stroke_width=8)
        self.play(Create(mur), FadeIn(self.grand("90° ?", font_size=60, color=ORANGE_RETENUE).move_to([-0.8, 1.7, 0])))
        self.au_mot("Et c'est faux")
        f = self.grand("FAUX !", font_size=80, color=ROUGE_ERREUR).rotate(0.15).move_to([0, -0.1, 0])
        self.play(FadeIn(f, scale=2.0))
        self.au_mot("c'est 45 degrés")
        self.play(FadeIn(self.grand("100 % = 45°", font_size=60, color=VERT_OK).move_to([0, -1.6, 0])))
        self.attendre_voix(marge=0.4)

        # 02
        self.ouvrir("02-definition")
        formule = self.pile([("pente =", 40, WHITE), ("dénivelé ÷ horizontale", 34, BLEU_CALCUL), ("× 100", 40, WHITE)], 2.5, buff=0.1)
        self.play(FadeIn(formule))
        self.au_mot("Tu montes de 100")
        tri, o, a, b = self.triangle(2.4, 2.4, origine=(-1.7, -1.4))
        self.play(Create(tri))
        self.play(FadeIn(self.grand("100 m", font_size=30, color=BLEU_CALCUL).next_to(Line(a, b), RIGHT, buff=0.1)),
                  FadeIn(self.grand("100 m", font_size=30).next_to(Line(o, a), DOWN, buff=0.1)))
        self.au_mot("ça fait 100")
        self.play(FadeIn(self.grand("100 %", font_size=40, color=VERT_OK).move_to([-1.3, 0.75, 0])))
        self.au_mot("l'angle fait 45")
        self.play(FadeIn(self.grand("45°", font_size=32, color=JAUNE_TITRE).move_to(o + RIGHT * 0.95 + UP * 0.3)))
        self.au_mot("c'est la tangente")
        self.play(FadeIn(self.grand("tan 45° = 1", font_size=40, color=JAUNE_TITRE).move_to([0, -2.1, 0])))
        self.attendre_voix(marge=0.4)

        # 03
        self.ouvrir("03-maido")
        self.play(FadeIn(self.pile([("profil officiel", 30, GRAY_B), ("Grand Raid 2025", 30, GRAY_B)], 2.8, buff=0.06)))
        self.au_mot("La Brèche")
        self.play(FadeIn(self.grand("La Brèche : 1 284 m", font_size=34).move_to([0, 2.0, 0])))
        self.au_mot("Le Ti Col")
        self.play(FadeIn(self.grand("Ti Col : 2 025 m", font_size=34).move_to([0, 1.45, 0])))
        self.au_mot("741 mètres de dénivelé")
        self.play(FadeIn(self.grand("dénivelé : 741 m", font_size=38, color=BLEU_CALCUL).move_to([0, 0.75, 0])))
        self.au_mot("sur 3,3 kilomètres")
        self.play(FadeIn(self.grand("3,3 km de sentier", font_size=32).move_to([0, 0.15, 0])))
        self.au_mot("soit environ 3 200")
        self.play(FadeIn(self.grand("≈ 3 200 m à l'horizontale", font_size=32).move_to([0, -0.4, 0])))
        self.au_mot("741 divisé par 3 200")
        self.play(FadeIn(self.grand("741 ÷ 3 200 ≈ 0,23", font_size=40).move_to([0, -1.15, 0])))
        self.play(GrowFromCenter(self.grand("≈ 23 %", font_size=70, color=VERT_OK).move_to([0, -2.0, 0])))
        self.attendre_voix(marge=0.4)

        # 04
        self.ouvrir("04-angle")
        tri, o, a, b = self.triangle(3.6, 3.6 * 0.23, origine=(-1.9, 1.4), couleur=VERT_OK)
        self.play(Create(tri))
        self.play(FadeIn(self.grand("23 %", font_size=34, color=VERT_OK).next_to(Line(o, b), UP, buff=0.15)))
        self.au_mot("à peine 13 degrés")
        self.play(FadeIn(self.grand("tan = 0,23  →  13°", font_size=40, color=JAUNE_TITRE).move_to([0, 0.5, 0])))
        self.au_mot("trois fois une route")
        self.play(FadeIn(self.pile([("route de montagne", 32, WHITE), ("≈ 7 %", 44, WHITE), ("23 % ≈ 3 fois plus", 36, ORANGE_RETENUE)], -0.75)))
        self.au_mot("après 117 kilomètres")
        self.play(FadeIn(self.grand("après 117 km de course !", font_size=34, color=ROUGE_ERREUR).move_to([0, -2.15, 0])))
        self.attendre_voix(marge=0.4)

        # 05
        self.ouvrir("05-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        self.play(FadeIn(self.pile([("pente à 50 %", 56, BLEU_CALCUL), ("combien de mètres", 38, WHITE), ("de montée pour", 38, WHITE),
                                    ("100 m à l'horizontale ?", 38, WHITE)], 0.7)))
        self.au_mot("Ta réponse en commentaire")
        self.play(FadeIn(self.pile([("en commentaire !", 40, VERT_OK), ("@eleveai974", 40, BLEU_CALCUL)], -1.6)))
        self.attendre_voix(marge=1.5)
