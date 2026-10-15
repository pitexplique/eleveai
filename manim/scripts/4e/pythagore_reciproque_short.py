# pythagore_reciproque_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 6 : la dalle du maçon.
# CEINTURE BLANCHE : en HAUT la dalle, ses deux bords puis la diagonale au mètre ;
# en BAS « d'une part » et « d'autre part » qui se remplissent en même temps,
# puis « = » et le petit carré : le coin est droit (la réciproque).
# Voix : manim/voix/4e-pythagore-reciproque-short.json.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_reciproque_short.py ShortDalle4e -o eleveai-maths-4e-pythagore-reciproque-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/06-reciproque/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_verifier_short import COTE, COUL_HYP, P, ShortCorde4e  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import ceinture  # noqa: E402

BETON = "#9CA3AF"


class ShortDalle4e(ShortCorde4e):
    nom_voix = "4e-pythagore-reciproque-short"

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("La dalle du maçon", font_size=42, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.3))
        q = self.grand("Le coin est-il droit ?", font_size=28, color=BLEU_CALCUL).move_to(P(0, 1.9))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Le coin")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        u = 0.022
        A = P(-0.7, -0.25)
        B, C = A + RIGHT * 60 * u, A + UP * 80 * u
        fond = Polygon(A, B, B + (C - A), C, stroke_width=0, fill_color=BETON, fill_opacity=0.3)
        self.play(FadeIn(fond))
        self.au_mot("60, 80")
        self.play(Create(VGroup(Line(A, B), Line(A, C)).set_stroke(COTE, 6)),
                  FadeIn(self.t("60", 26, COTE).next_to(Line(A, B), DOWN, buff=0.08)),
                  FadeIn(self.t("80", 26, COTE).next_to(Line(A, C), LEFT, buff=0.08)))
        self.au_mot("et 100")
        self.play(Create(DashedLine(B, C, color=JAUNE_TITRE, stroke_width=6, dash_length=0.12)),
                  FadeIn(self.t("100", 26, JAUNE_TITRE).move_to((B + C) / 2 + UR * 0.25)))

        self.au_mot("D'une part")
        g = self.grand("d'une part : 100² = 10 000", font_size=24, color=COUL_HYP).move_to(P(0, -0.8))
        self.play(Create(Line(B, C, color=COUL_HYP, stroke_width=6)), FadeIn(g))
        self.au_mot("D'autre part")
        d = self.grand("d'autre part : 60² + 80² = 10 000", font_size=24, color=COTE).move_to(P(0, -1.3))
        self.play(FadeIn(d))
        self.au_mot("C'est égal")
        self.play(Write(self.grand("10 000 = 10 000", font_size=34, color=VERT_OK).move_to(P(0, -1.82))))
        carre = self.carre_droit(A, RIGHT, UP, s=0.25)
        self.play(GrowFromCenter(carre), Flash(A + UR * 0.12, color=BLEU_CALCUL, line_length=0.25))
        self.play(FadeIn(self.grand("le coin est droit !", font_size=32, color=VERT_OK).move_to(P(0, -2.3))))
        self.attendre_voix(marge=0.5)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("30, 40 et 51")
        lignes = VGroup(self.grand("Une autre dalle :", font_size=32),
                        self.grand("30, 40 et 51 cm", font_size=42, color=JAUNE_TITRE),
                        self.grand("Le coin est-il droit ?", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.3)
        lignes.move_to(P(0, 0.9))
        self.play(FadeIn(lignes[0]), FadeIn(lignes[1]))
        self.au_mot("Le coin est-il droit")
        self.play(FadeIn(lignes[2]))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.5))))
        self.attendre_voix(marge=1.5)
