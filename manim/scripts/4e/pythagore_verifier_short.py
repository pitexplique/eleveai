# pythagore_verifier_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 5 : la corde à 13 nœuds.
# CEINTURE BLANCHE : en HAUT la corde se tend en triangle 3-4-5, nœud après nœud ;
# en BAS les deux colonnes se remplissent en même temps (5² = 25 | 3² + 4² = 25),
# puis le signe « = » et, enfin, le petit carré de l'angle droit (comme dans la paysage).
# Voix : manim/voix/4e-pythagore-verifier-short.json.
# ⭐ 31/10/2026 : + 1 question-pause après 01-image (questions-pythagore.md, Ép. 5 : 13²),
# compte à rebours de 3 s, module commun pythagore_pauses.py ; marques mot à mot :
# 4e-pythagore-verifier-short.marques.json. ShortDalle4e (ép. 6) et le short de l'ép. 7
# héritent de cette scène, donc du mixin. Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/pythagore_verifier_short.py ShortCorde4e
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_verifier_short.py ShortCorde4e -o eleveai-maths-4e-pythagore-verifier-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/05-verifier/.
# ⭐ 01/11/2026 : la ceinture = l'ÉCHELLE ENTIÈRE sous le titre (echelle_short) ; lignes de base alignées.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_carre_racine import COTE, P, PythagoreCarreRacine4e  # noqa: E402  (pose les chemins)
from pythagore_reconnaitre import PythagoreReconnaitre4e  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from gabarit_trigo import COUL_HYP  # noqa: E402
from pythagore_pauses import PausesShort, sans_audit  # noqa: E402
from pythagore_verifier import morceaux_alignes, poser_en_ligne  # noqa: E402
from signes_expression_2de import ceinture, echelle_ceintures  # noqa: E402,F401  (ceinture : pour les héritiers)

CORDE = "#D6B47A"


def echelle_short(nom="blanche"):
    """(01/11) La ceinture d'un short = l'ÉCHELLE ENTIÈRE (REGLES.md l. 78), sous le titre."""
    return echelle_ceintures(nom).scale_to_fit_width(config.frame_width * 0.7)


class ShortCorde4e(PausesShort, Short6e):
    nom_voix = "4e-pythagore-verifier-short"

    t = PythagoreCarreRacine4e.t
    carre_droit = PythagoreReconnaitre4e.carre_droit

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        # (01/11) l'échelle entière sous le titre ; titre et accroche écartés pour qu'elle ne touche rien.
        titre = self.grand("La corde à 13 nœuds", font_size=40, color=JAUNE_TITRE).move_to(P(0, 2.9))
        q = self.grand("Les deux calculs sont-ils égaux ?", font_size=26, color=BLEU_CALCUL).move_to(P(0, 1.75))
        badge = echelle_short("blanche").move_to(P(0, (titre.get_bottom()[1] + q.get_top()[1]) / 2))
        self.play(FadeIn(badge), run_time=0.6)
        self.au_nb("La corde à 13")  # (31/10) le titre quand la voix dit « 13 »
        self.play(FadeIn(titre), run_time=0.5)
        self.au_mot("Les deux calculs")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 ── (31/10) chaque nombre à SON mot (marques)
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
        self.play(Transform(corde, cible), *[n.animate.move_to(p) for n, p in zip(noeuds, tour)], run_time=0.7)
        for txt, pos, col, cue in (("3", Line(A, C).get_left() + LEFT * 0.2, COTE, "tend : 3"),
                                   ("4", Line(A, B).get_bottom() + DOWN * 0.2, COTE, "3, 4"),
                                   ("5", (B + C) / 2 + UR * 0.25, COUL_HYP, "4 et 5")):
            self.au_nb(cue)
            self.play(FadeIn(self.t(txt, 28, col).move_to(pos)), run_time=0.3)

        y = -1.1
        g5, g25 = self.grand("5²", font_size=28, color=COUL_HYP), self.grand("= 25", font_size=28, color=COUL_HYP)
        gauche = VGroup(g5, g25).arrange(RIGHT, buff=0.12)
        cadre_g = SurroundingRectangle(gauche, color=COUL_HYP, buff=0.12, corner_radius=0.1)
        VGroup(gauche, cadre_g).move_to(P(-1.2, y))
        self.au_nb("intervalles. 5")
        self.play(Create(Line(B, C, color=COUL_HYP, stroke_width=7)), Create(cadre_g), FadeIn(g5), run_time=0.6)
        self.au_nb("carré : 25")
        self.play(FadeIn(g25), run_time=0.3)
        d3, d4, d25 = self.t("3²", 28, COTE), self.t("+ 4²", 28, COTE), self.t("= 25", 28, COTE)
        droite_t = VGroup(VGroup(d3, d4).arrange(RIGHT, buff=0.12), d25).arrange(DOWN, buff=0.08)
        cadre_d = SurroundingRectangle(droite_t, color=COTE, buff=0.12, corner_radius=0.1)
        VGroup(droite_t, cadre_d).move_to(P(1.2, y))
        self.au_nb("25. 3")
        self.play(Create(VGroup(Line(A, B), Line(A, C)).set_stroke(COTE, 6)), Create(cadre_d), FadeIn(d3), run_time=0.6)
        self.au_nb("plus 4")
        self.play(FadeIn(d4), run_time=0.3)
        self.au_nb("carré : 25", 2)
        self.play(FadeIn(d25), run_time=0.3)
        self.au_mot("Les deux sont égaux")
        egal = self.t("=", 54, VERT_OK).move_to(P(0, y))
        self.play(GrowFromCenter(egal))
        carre = self.carre_droit(A, RIGHT, UP, s=0.25)
        self.play(GrowFromCenter(carre), Flash(A + UR * 0.12, color=BLEU_CALCUL, line_length=0.25))
        self.play(FadeIn(self.grand("un angle droit !", font_size=32, color=VERT_OK).move_to(P(0, -2.05))))
        self.attendre_voix(marge=0.5)

        # ── 01q : la question-pause (3 s) ──
        # (01/11) les morceaux d'une ligne alignés sur leur ligne de base.
        lq, lph = (lambda *m: morceaux_alignes(m, self.FS_Q)), (lambda *m: morceaux_alignes(m, self.FS_PH, VERT_OK))
        self.ecran_question("01q-question", "01r-reponse", [lq("Côtés 5,", "12 et 13."), lq("Combien vaut", "13² ?")],
                            ["26", "169", "139"], 1, [["13 × 13,"], lph("et pas", "13", "× 2.")])

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))))
        l0 = poser_en_ligne([self.grand(x, font_size=30, color=CORDE) for x in ("6,", "8 et", "10 intervalles")], buff=0.14)
        l2 = VGroup(self.grand("6²", font_size=40, color=COTE), self.grand("+ 8² = ?", font_size=40, color=COTE))
        l2.arrange(RIGHT, buff=0.16)
        lignes = VGroup(l0, self.grand("10² = ?", font_size=40, color=COUL_HYP), l2).arrange(DOWN, buff=0.3).move_to(P(0, 0.9))
        for m, cue in zip(l0, ("de 6", "6, 8", "8 et 10")):
            self.au_nb(cue)
            self.play(FadeIn(m), run_time=0.3)
        self.au_nb("Combien font 10")
        self.play(FadeIn(lignes[1]), run_time=0.5)
        self.au_nb("et 6")
        self.play(FadeIn(l2[0]), run_time=0.3)
        self.au_nb("plus 8")
        self.play(FadeIn(l2[1]), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     sans_audit(self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL))).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.5))))
        self.attendre_voix(marge=1.5)
