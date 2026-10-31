# pythagore_reciproque_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 6 : la dalle du maçon.
# CEINTURE BLANCHE : en HAUT la dalle, ses deux bords puis la diagonale au mètre ;
# en BAS « d'une part » et « d'autre part » qui se remplissent en même temps,
# puis « = » et le petit carré : le coin est droit (la réciproque).
# Voix : manim/voix/4e-pythagore-reciproque-short.json.
# ⭐ 31/10/2026 : + 1 question-pause après 01-image (questions-pythagore.md, Ép. 6 : la table
# 6-8-10), compte à rebours de 3 s ; le mixin (pythagore_pauses.py) vient de ShortCorde4e (ép. 5) ;
# marques mot à mot : 4e-pythagore-reciproque-short.marques.json. Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/pythagore_reciproque_short.py ShortDalle4e
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
from pythagore_pauses import sans_audit  # noqa: E402

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

        # ── 01 ── (31/10) chaque nombre à SON mot (marques)
        self.dire("01-image")
        u = 0.022
        A = P(-0.7, -0.25)
        B, C = A + RIGHT * 60 * u, A + UP * 80 * u
        fond = Polygon(A, B, B + (C - A), C, stroke_width=0, fill_color=BETON, fill_opacity=0.3)
        self.play(FadeIn(fond), run_time=0.6)
        self.au_nb("dalle : 60")
        self.play(Create(Line(A, B).set_stroke(COTE, 6)),
                  FadeIn(self.t("60", 26, COTE).next_to(Line(A, B), DOWN, buff=0.08)), run_time=0.5)
        self.au_nb("60, 80")
        self.play(Create(Line(A, C).set_stroke(COTE, 6)),
                  FadeIn(self.t("80", 26, COTE).next_to(Line(A, C), LEFT, buff=0.08)), run_time=0.5)
        self.au_nb("et 100")
        self.play(Create(DashedLine(B, C, color=JAUNE_TITRE, stroke_width=6, dash_length=0.12)),
                  FadeIn(self.t("100", 26, JAUNE_TITRE).move_to((B + C) / 2 + UR * 0.25)), run_time=0.6)

        def ligne(morceaux, y, color):
            ms = VGroup(*[self.grand(x, font_size=24, color=color) for x, _ in morceaux]).arrange(RIGHT, buff=0.1)
            ms.move_to(P(0, y))
            return ms, [c for _, c in morceaux]

        g, cg = ligne([("d'une part :", ("D'une part", 1)), ("100²", ("part, 100", 1)), ("= 10 000", ("carré : 10000", 1))],
                      -0.8, COUL_HYP)
        d, cd = ligne([("d'autre part :", ("D'autre part", 1)), ("60²", ("part, 60", 1)), ("+ 80²", ("plus 80", 1)),
                       ("= 10 000", ("carré : 10000", 2))], -1.3, COTE)
        if d.width > 3.9:  # (31/10) en morceaux, la ligne déborde : les deux lignes à la même taille
            f = 3.9 / d.width
            d.scale(f)
            g.scale(f)
        for k, (m, (cue, n)) in enumerate(list(zip(g, cg)) + list(zip(d, cd))):
            (self.au_nb if any(c.isdigit() for c in cue) else self.au_mot)(cue, n)
            extra = [Create(Line(B, C, color=COUL_HYP, stroke_width=6))] if k == 0 else []
            self.play(FadeIn(m), *extra, run_time=0.35)
        self.au_mot("C'est égal")
        self.play(Write(self.grand("10 000 = 10 000", font_size=34, color=VERT_OK).move_to(P(0, -1.82))), run_time=0.5)
        carre = self.carre_droit(A, RIGHT, UP, s=0.25)
        self.play(GrowFromCenter(carre), Flash(A + UR * 0.12, color=BLEU_CALCUL, line_length=0.25), run_time=0.5)
        self.au_mot("le coin est droit")
        self.play(FadeIn(self.grand("le coin est droit !", font_size=32, color=VERT_OK).move_to(P(0, -2.3))))
        self.attendre_voix(marge=0.5)

        # ── 01q : la question-pause (3 s) ──
        self.ecran_question("01q-question", "01r-reponse",
                            [["Table :", "6,", "8", "et 10 dm."], ["10²", "= 100 ;", "6²", "+ 8² = ?"]],
                            ["14", "100", "48"], 1, [["C'est égal :", "le coin est droit."]])

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        l1 = VGroup(self.grand("30,", font_size=42, color=JAUNE_TITRE),
                    self.grand("40 et 51 cm", font_size=42, color=JAUNE_TITRE)).arrange(RIGHT, buff=0.16)
        if l1.width > 3.9:
            l1.scale_to_fit_width(3.9)
        lignes = VGroup(self.grand("Une autre dalle :", font_size=32), l1,
                        self.grand("Le coin est-il droit ?", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.3)
        lignes.move_to(P(0, 0.9))
        self.play(FadeIn(lignes[0]), run_time=0.5)
        self.au_nb("dalle : 30")
        self.play(FadeIn(l1[0]), run_time=0.3)
        self.au_nb("40 et 51")
        self.play(FadeIn(l1[1]), run_time=0.3)
        self.au_mot("Le coin est-il droit")
        self.play(FadeIn(lignes[2]))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     sans_audit(self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL))).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.5))))
        self.attendre_voix(marge=1.5)
