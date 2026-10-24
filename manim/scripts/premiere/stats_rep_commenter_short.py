# stats_rep_commenter_short.py
# EleveAI — Maths 1re — short jumeau de la série « Statistiques », lycée,
# épisode 10 : commenter un croisement. CEINTURE VERTE (un cran sous la paysage
# bleue). Il AMUSE : « Plus de filles au foot ou au basket ? »
#   · en HAUT un ballon de foot et un ballon de basket ; en BAS les barres du
#     coach : la part des femmes (foot 10,5 %, basket 35 %) ;
#   · surprise : le foot a 2 372 milliers de licenciés, le basket 631 ;
#   · question-pause (foot / basket / autant) : ≈ 249 contre ≈ 221 milliers ;
#   · fin : le handball, 602 milliers dont 39,8 % de femmes → combien ?
#     « Réponds en commentaire ! » (réponse attendue : ≈ 240 milliers).
# Source : Insee, licences sportives, données 2025 (voir stats_rep_commenter.py).
# Centres d'intérêt : sport, corps-sante.
#
# Voix : manim/voix/1re-stats-rep-commenter-short.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_commenter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/stats_rep_commenter_short.py StatsRepCommenterShort -o eleveai-maths-premiere-commun-stats-rep-commenter-short --media_dir manim/scripts/premiere/media-stats-rep-commenter-short
# Sortie : manim/sorties/premiere-commun/maths/statistiques/10-rep-commenter/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

ROSE_B = "#f9a8d4"


def ballon_foot(r=0.4):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    pent = RegularPolygon(5, radius=r * 0.38, fill_color=NUIT, fill_opacity=1, stroke_width=0).rotate(PI / 10)
    rayons = VGroup(*[Line(pent.get_vertices()[k], pent.get_vertices()[k] * 2.3, color=NUIT, stroke_width=3)
                      for k in range(5)])
    return VGroup(b, rayons, pent)


def ballon_basket(r=0.4):
    b = Circle(radius=r, fill_color="#f97316", fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    l = VGroup(Line(UP * r, DOWN * r), Line(LEFT * r, RIGHT * r),
               Arc(radius=r * 0.8, start_angle=-PI / 3, angle=2 * PI / 3).shift(LEFT * r * 0.95),
               Arc(radius=r * 0.8, start_angle=2 * PI / 3, angle=2 * PI / 3).shift(RIGHT * r * 0.95))
    l.set_stroke(NUIT, 3)
    return VGroup(b, l)


class StatsRepCommenterShort(ShortI1):
    nom_voix = "1re-stats-rep-commenter-short"
    fichier_marques = "stats_rep_commenter_short_marques.json"

    def graphe(self, noms=("Foot", "Basket"), vals=(10.5, 35)):
        g = Barres(list(noms), list(vals), pas=10, maxi=50, couleurs=[ROSE_B] * len(vals), nom_axe="% de femmes",
                   titre="Part des femmes", largeur=2.4, hauteur=2.0, fs=24, colonne_lue=True)
        return caser(g, -1.95, 1.95, -3.0, 0.7)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Foot ou basket ?", ceinture="verte")
        self.add(badge)
        bf, bb = ballon_foot(0.42).move_to(P(-1.05, 1.6)), ballon_basket(0.42).move_to(P(1.05, 1.6))
        ou = self.t("ou", 34).move_to(P(0, 1.6))
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(g.fond), run_time=0.5)
        self.au_mot("au football")
        self.play(FadeIn(bf, scale=0.5), run_time=0.3)
        self.au_mot("ou au basket")
        self.play(FadeIn(ou), FadeIn(bb, scale=0.5), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : les parts, puis la surprise ──
        self.dire("01-image")
        self.au_mot("10,5 %")
        self.play(g.pousser(indices=[0], run_time=0.5), run_time=0.5)
        self.add(g.barres[0])
        self.play(FadeIn(g.lu(10.5), scale=1.4), Create(g.vers_axe(0, jusqu_au_lu=True)), run_time=0.3)
        self.au_mot("35 %")
        self.play(g.pousser(indices=[1], run_time=0.5), run_time=0.5)
        self.add(g.barres[1])
        self.play(FadeIn(g.lu(35), scale=1.4), Create(g.vers_axe(1, jusqu_au_lu=True)), run_time=0.3)
        self.au_mot("Le basket gagne")
        q = self.t("le basket gagne ?", 32, ORANGE_RETENUE).move_to(P(0, 0.95))
        self.play(FadeIn(q, scale=0.8), bb.animate.scale(1.25), run_time=0.4)
        self.au_mot("Attention")
        self.play(FadeOut(q), bb.animate.scale(1 / 1.25), run_time=0.3)
        self.au_mot("2 372")
        n1 = self.t("2 372 milliers", 24, VERT_OK)
        n1.scale(min(1, 1.85 / n1.width)).move_to(P(-1.05, 0.95))
        self.play(FadeIn(n1, shift=UP * 0.1), bf.animate.scale(1.2), run_time=0.4)
        self.au_mot("631")
        n2 = self.t("631 milliers", 24, VERT_OK)
        n2.scale(min(1, 1.85 / n2.width)).move_to(P(1.05, 0.95))
        self.play(FadeIn(n2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[x for x in self.mobjects if x is not badge and x is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Où y a-t-il le plus", "de licenciées ?"],
                                    ["au foot", "au basket", "autant"], 0, ["≈ 249 milliers contre 221"],
                                    ys=(-0.12, -0.97, -1.82), y_bas=-2.58)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        self.add(titre)
        self.au_mot("Le handball")
        hb = self.t("Handball", 40, AMBRE).move_to(P(0, 1.9))
        self.play(FadeIn(hb, scale=0.8), run_time=0.4)
        self.au_mot("602")
        l1 = self.borne(self.ligne([("602", VERT_OK), ("milliers de licenciés", WHITE)], 28)).move_to(P(0, 1.2))
        self.play(FadeIn(l1, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("39,8 %")
        l2 = self.ligne([("dont", WHITE), ("39,8 %", ROSE_B), ("de femmes", WHITE)], 30).move_to(P(0, 0.6))
        self.play(FadeIn(l2, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Combien de licenciées")
        l3 = self.t("combien de licenciées ?", 34, ORANGE_RETENUE).move_to(P(0, -0.3))
        self.borne(l3)
        self.play(FadeIn(l3, scale=0.8), run_time=0.4)
        self.insister(l3, 1.1)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, -1.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
