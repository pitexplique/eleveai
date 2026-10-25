# frac_comparer_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 05 « Comparer des fractions »
# (micro fraction_comparer). CEINTURE BLANCHE : on VOIT qu'1/3 > 1/4.
# Il AMUSE : une HISTOIRE VRAIE. Années 1980, aux États-Unis, une chaîne de
# fast-food lance un steak d'1/3 de livre au prix du « quart de livre » du
# concurrent : échec, car beaucoup de clients croyaient 1/3 < 1/4 (« 3 < 4 »).
# En 2021, la chaîne relance… un steak de 3/9 de livre (= 1/3).
# Vérifié le 25/10/2026 (WebSearch) : Snopes, « Did Third-of-a-Pound Burger
# Fail Because People Didn't Understand Fractions? » (17/06/2022) ; Wikipedia
# « Third-pound burger » ; Adweek (2021) « … So It's Trying a 3/9th Pound
# Burger Instead ». La marque n'est pas nommée à l'écran.
#   · EN HAUT, l'image : deux steaks, l'un coupé en 3, l'autre en 4 ; la part
#     sort du steak ;
#   · EN BAS, au même instant, deux barres du coach : 1/3 dépasse 1/4 ;
#   · 1 question-pause (3 s) : 1/5, 1/6, 1/8 de livre : le plus gros ?
#   · fin : « 3/9 de livre : plus, moins ou autant qu'1/3 ? » en commentaire.
# Centres d'intérêt : argent-budget, cuisine.
#
# Voix : manim/voix/4e-frac-comparer-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_comparer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_comparer_short.py FracComparerShort4e -o eleveai-maths-4e-frac-comparer-short --media_dir manim/scripts/4e/media-frac-comparer-short
# Sortie : manim/sorties/4e/maths/fractions/05-comparer/eleveai-maths-4e-frac-comparer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

VIANDE, GRILL = "#92400e", "#451a03"
Y_ST, Y_B = 1.35, -0.55


def steak(n, centre, r=0.75):
    """Un steak rond coupé en n parts : .parts (secteurs), .coupes."""
    a = TAU / n
    parts = VGroup(*[AnnularSector(inner_radius=0, outer_radius=r, angle=-a, start_angle=PI / 2 - i * a,
                                   fill_color=VIANDE, fill_opacity=1, stroke_width=0) for i in range(n)])
    stries = VGroup(*[Line(P(-r * 0.6, y), P(r * 0.6, y), color=GRILL, stroke_width=5) for y in (-0.3 * r, 0, 0.3 * r)])
    coupes = VGroup(*[Line(ORIGIN, r * np.array([np.cos(PI / 2 - j * a), np.sin(PI / 2 - j * a), 0]), color="#fde68a",
                           stroke_width=4) for j in range(n)])
    bord = Circle(radius=r, stroke_color=GRILL, stroke_width=5)
    g = VGroup(parts, stries, bord, coupes).move_to(centre)
    g.parts, g.coupes, g.n = parts, coupes, n
    return g


def sortir(st, i, d=0.35):
    a = PI / 2 - (i + 0.5) * TAU / st.n
    return st.parts[i].animate.shift(d * np.array([np.cos(a), np.sin(a), 0])).set_fill("#f97316")


class FracComparerShort4e(ShortLotD):
    nom_voix = "4e-frac-comparer-short"
    fichier_marques = "frac_comparer_short_marques.json"
    ceinture = "blanche"

    def barre(self, n, y):
        return Barre(n, 0, largeur=3.0, hauteur=0.42, couleur=ORANGE_PART, marge=0.1, sw=2, centre=P(0.3, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("1/3 ou 1/4 ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        s3, s4 = steak(3, P(-1.05, Y_ST)), steak(4, P(1.05, Y_ST))
        for c in (*s3.coupes, *s4.coupes):
            c.set_opacity(0)

        # ── 00 : l'histoire ──
        self.dire("00-accroche")
        self.au_nb("Années 1980")
        an = self.t("années 1980, États-Unis", 24, AMBRE).move_to(P(0, -0.4))
        self.play(FadeIn(an, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("1 tiers de livre")
        l3 = sans_synchro(self.t("1/3 de livre", 24, WHITE)).next_to(s3, DOWN, buff=0.15)
        self.play(GrowFromCenter(s3), FadeIn(l3), run_time=0.6)
        self.au_mot("au même prix")
        prix = self.t("même prix !", 30, VERT_OK).move_to(P(0, -1.1))
        self.play(FadeIn(prix, scale=0.8), run_time=0.4)
        self.au_mot("quart de livre")
        l4 = sans_synchro(self.t("1/4 de livre", 24, WHITE)).next_to(s4, DOWN, buff=0.15)
        self.play(GrowFromCenter(s4), FadeIn(l4), run_time=0.6)
        self.au_mot("C'est un échec")
        ech = self.t("ÉCHEC", 54, ROUGE_ERREUR).rotate(0.15).move_to(P(0, -2.0))
        self.play(FadeIn(ech, scale=1.6), run_time=0.4)
        self.au_mot("Pourquoi")
        self.play(Write(titre), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(an, prix, ech)), run_time=0.3)

        # ── 01 : l'erreur des clients ──
        self.dire("01-erreur")
        self.au_mot("Beaucoup de clients")
        bulle = RoundedRectangle(width=3.8, height=1.3, corner_radius=0.3, fill_color="#1e293b", fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=3).move_to(P(0, -1.0))
        t1 = sans_synchro(self.t("« 1/3 < 1/4 »", 36, ROUGE_ERREUR)).move_to(bulle).shift(UP * 0.25)
        self.play(FadeIn(bulle, scale=0.8), FadeIn(t1), run_time=0.5)
        self.au_mot("Parce que 3")
        t2 = self.t("car 3 < 4", 30, WHITE).move_to(bulle).shift(DOWN * 0.3)
        self.play(FadeIn(t2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(bulle, t1, t2)), run_time=0.3)

        # ── 02 : la surprise ──
        self.dire("02-surprise")
        self.au_mot("Faux")
        b3, b4 = self.barre(3, Y_B), self.barre(4, Y_B - 0.85)
        e3 = sans_synchro(self.t("1/3", 28)).next_to(b3, LEFT, buff=0.15)
        e4 = sans_synchro(self.t("1/4", 28)).next_to(b4, LEFT, buff=0.15)
        self.au_mot("Coupe un steak en 3")
        self.play(*[c.animate.set_opacity(1) for c in s3.coupes], b3.apparaitre(0.6), FadeIn(e3), run_time=0.6)
        self.au_mot("un autre en 4")
        self.play(*[c.animate.set_opacity(1) for c in s4.coupes], b4.apparaitre(0.6), FadeIn(e4), run_time=0.6)
        self.au_mot("la part d'1 tiers")
        self.play(sortir(s3, 0), sortir(s4, 0), b3.colorier([0]), b4.colorier([0]), run_time=0.8)
        tir = DashedLine(P(b3.x_trait(1), b3.contour.get_top()[1] + 0.1), P(b3.x_trait(1), b4.contour.get_bottom()[1] - 0.1),
                         color=AMBRE, stroke_width=5, dash_length=0.08)
        self.play(Create(tir), Indicate(b3.parts[0], color=VERT_OK), run_time=0.6)
        self.au_mot("environ 0,33")
        r1 = self.t("1/3 ≈ 0,33", 32, VERT_OK).move_to(P(0, -2.1))
        r1.sans_synchro = True
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.4)
        self.au_nb("c'est 0,25")
        r2 = sans_synchro(self.t("1/4 = 0,25", 32, ORANGE_PART)).move_to(P(0, -2.6))
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["Quel steak est le plus gros ?"],
                            [self.inline("1/5 de livre", 30), self.inline("1/6 de livre", 30),
                             self.inline("1/8 de livre", 30)], 0,
                            ["Même numérateur :", "petit dénominateur,", "grosse part !"], mot_q="Quel steak")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        self.au_nb("En 2021")
        a21 = self.t("2021", 34, AMBRE).move_to(P(0, 2.05))
        self.play(FadeIn(a21, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("3 neuvièmes de livre")
        s9 = steak(9, P(0, 0.9), r=0.75)
        l9 = sans_synchro(self.t("3/9 de livre", 30)).next_to(s9, DOWN, buff=0.15)
        self.play(GrowFromCenter(s9), FadeIn(l9), run_time=0.6)
        self.play(*[sortir(s9, i, 0.15) for i in range(3)], run_time=0.6)
        self.au_mot("plus, moins")
        q = sans_synchro(self.ligne([("3/9", WHITE), ("?", ORANGE_TROU), ("1/3", WHITE)], 46)).move_to(P(0, -0.8))
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.insister(q[1], 1.6)
        self.appel_commentaire(y=-1.9)
