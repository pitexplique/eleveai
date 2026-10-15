# pythagore_verifier_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 5 : la corde à 13 nœuds.
# CEINTURE BLANCHE : en HAUT la corde se tend en triangle 3-4-5, nœud après nœud ;
# en BAS les deux colonnes se remplissent en même temps (5² = 25 | 3² + 4² = 25),
# puis le signe « = » et, enfin, le petit carré de l'angle droit (comme dans la paysage).
# Voix : manim/voix/4e-pythagore-verifier-short.json.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_verifier_short.py ShortCorde4e -o eleveai-maths-4e-pythagore-verifier-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/05-verifier/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_carre_racine import COTE, P, PythagoreCarreRacine4e  # noqa: E402  (pose les chemins)
from pythagore_reconnaitre import PythagoreReconnaitre4e  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from gabarit_trigo import COUL_HYP  # noqa: E402
from signes_expression_2de import ceinture  # noqa: E402

CORDE = "#D6B47A"


class ShortCorde4e(Short6e):
    nom_voix = "4e-pythagore-verifier-short"

    t = PythagoreCarreRacine4e.t
    carre_droit = PythagoreReconnaitre4e.carre_droit

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("La corde à 13 nœuds", font_size=40, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.7), self.grand("Ceinture blanche", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.3))
        q = self.grand("Les deux calculs sont-ils égaux ?", font_size=26, color=BLEU_CALCUL).move_to(P(0, 1.9))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Les deux calculs")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        u = 0.45
        A = P(-1.0, -0.05)
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        tour = [A + RIGHT * k * u for k in range(5)] + [B + (C - B) * k / 5 for k in range(1, 6)] + \
               [C + DOWN * k * u for k in range(1, 4)]
        droite = [P(-2.0 + k * 0.333, 1.2) for k in range(13)]
        corde = VMobject(stroke_color=CORDE, stroke_width=5).set_points_as_corners(droite)
        noeuds = VGroup(*[Dot(p, radius=0.06, color=CORDE) for p in droite])
        self.au_mot("Une corde")
        self.play(Create(corde), LaggedStart(*[GrowFromCenter(n) for n in noeuds], lag_ratio=0.06), run_time=1.2)
        self.au_mot("On la tend")
        cible = VMobject(stroke_color=CORDE, stroke_width=5).set_points_as_corners(tour)
        self.play(Transform(corde, cible), *[n.animate.move_to(p) for n, p in zip(noeuds, tour)], run_time=1.6)
        self.play(FadeIn(self.t("3", 28, COTE).next_to(Line(A, C), LEFT, buff=0.12)),
                  FadeIn(self.t("4", 28, COTE).next_to(Line(A, B), DOWN, buff=0.1)),
                  FadeIn(self.t("5", 28, COUL_HYP).move_to((B + C) / 2 + UR * 0.25)))

        y = -1.1
        self.au_mot("5 au carré")
        gauche = self.grand("5² = 25", font_size=30, color=COUL_HYP)
        cadre_g = SurroundingRectangle(gauche, color=COUL_HYP, buff=0.15, corner_radius=0.1)
        VGroup(gauche, cadre_g).move_to(P(-1.35, y))
        self.play(Create(Line(B, C, color=COUL_HYP, stroke_width=7)), Create(cadre_g), FadeIn(gauche))
        self.au_mot("3 au carré plus 4")
        droite_t = VGroup(self.t("3² + 4²", 30, COTE), self.t("= 25", 30, COTE)).arrange(DOWN, buff=0.08)
        cadre_d = SurroundingRectangle(droite_t, color=COTE, buff=0.15, corner_radius=0.1)
        VGroup(droite_t, cadre_d).move_to(P(1.4, y))
        self.play(Create(VGroup(Line(A, B), Line(A, C)).set_stroke(COTE, 6)), Create(cadre_d), FadeIn(droite_t))
        self.au_mot("Les deux sont égaux")
        egal = self.t("=", 54, VERT_OK).move_to(P(0, y))
        self.play(GrowFromCenter(egal))
        carre = self.carre_droit(A, RIGHT, UP, s=0.25)
        self.play(GrowFromCenter(carre), Flash(A + UR * 0.12, color=BLEU_CALCUL, line_length=0.25))
        self.play(FadeIn(self.grand("un angle droit !", font_size=32, color=VERT_OK).move_to(P(0, -2.05))))
        self.attendre_voix(marge=0.5)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        self.au_mot("6, 8 et 10")
        lignes = VGroup(self.grand("6, 8 et 10 intervalles", font_size=30, color=CORDE),
                        self.grand("10² = ?", font_size=40, color=COUL_HYP),
                        self.grand("6² + 8² = ?", font_size=40, color=COTE)).arrange(DOWN, buff=0.3).move_to(P(0, 0.9))
        self.play(FadeIn(lignes[0]))
        self.au_mot("Combien font 10 au carré")
        self.play(FadeIn(lignes[1]))
        self.au_mot("6 au carré plus 8")
        self.play(FadeIn(lignes[2]))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.5))))
        self.attendre_voix(marge=1.5)
