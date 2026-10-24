# stats_interpreter_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 09 « Interpréter des
# indicateurs » (micro stat_interpreter). CEINTURE ORANGE (un cran sous la
# paysage verte : on VOIT pourquoi moyenne et médiane diffèrent, sans calcul).
# Il SURPREND : « salaire moyen 2 735 €, et pourtant la moitié gagne moins de
# 2 183 € ».
#   · en HAUT, la « parade » des salariés rangés du moins payé au mieux payé
#     (un SCHÉMA, annoncé comme tel : seules les valeurs écrites sont des
#     données) ; le salarié du milieu, puis les géants du bout ;
#   · en BAS, EN MÊME TEMPS, la droite graduée : le salarié du milieu descend
#     sur la médiane, les géants poussent la moyenne vers la droite ;
#   · une question-pause (3 s) : lequel veut dire « la moitié gagne moins » ?
#   · fin : « un sur dix gagne plus de 4 302 € : sur 30 salariés ? » en
#     commentaire (3).
# Données réelles (voir stats_interpreter.py) : Insee Première n° 2020 (2023).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-interpreter-short.json (débit −10) ;
# calage : manim/scripts/seconde/stats_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_interpreter_short.py StatsInterpreterShort -o eleveai-maths-seconde-stats-interpreter-short --media_dir manim/scripts/seconde/media-stats-interpreter-short
# Sortie : manim/sorties/seconde/maths/statistiques/09-interpreter/eleveai-maths-seconde-stats-interpreter-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

# la parade (SCHÉMA) : 11 hauteurs croissantes, le dernier est un géant
HAUTS = [0.3, 0.38, 0.44, 0.49, 0.54, 0.6, 0.66, 0.75, 0.87, 1.1, 1.95]
BASE = -0.05


class StatsInterpreterShort(Short2deG2):
    nom_voix = "2de-stats-interpreter-short"
    fichier_marques = "stats_interpreter_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le salaire moyen", "orange")
        barres = VGroup(*[RoundedRectangle(width=0.27, height=h, corner_radius=0.05, fill_color=BLEU_CALCUL,
                                           fill_opacity=1, stroke_width=0) for h in HAUTS])
        barres.arrange(RIGHT, buff=0.08, aligned_edge=DOWN).move_to(P(0, BASE), aligned_edge=DOWN)
        tetes = VGroup(*[Circle(radius=0.1, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0).next_to(
            b, UP, buff=0.03) for b in barres])
        parade = VGroup(barres, tetes)
        schema = Text("(schéma)", font_size=18, color=GRIS).next_to(barres, DOWN, buff=0.08).align_to(barres, LEFT)
        ax = AxePoints([], 0, 11000, 2000, sous_pas=1000, longueur=8.0, couleur=BLEU_CALCUL, fs=30)
        ax.scale_to_fit_width(4.05).move_to(P(0, -2.1))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(badge), run_time=0.7)
        self.au_mot("2 735 euros")
        l1 = self.ligne([("moyenne :", AMBRE), ("2 735 €", WHITE)], 34).move_to(P(0, 1.6))
        self.play(FadeIn(l1, shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("la moitié des salariés")
        l2 = self.ligne([("la moitié :", VERT_OK), ("moins de", WHITE), ("2 183 €", WHITE)], 30).move_to(P(0, 0.85))
        self.play(FadeIn(l2[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("moins de 2 183")
        self.play(FadeIn(l2[2], scale=1.3), run_time=0.35)
        self.au_mot("Comment est-ce possible")
        q = self.t("Comment ?", 40, ORANGE_RETENUE).move_to(P(0, 0.05))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.insister(q, 1.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : la parade ──
        self.dire("01-image")
        self.au_mot("Range tous les salariés")
        self.play(FadeOut(VGroup(l1, l2, q)), FadeIn(ax), run_time=0.4)
        self.play(LaggedStart(*[AnimationGroup(GrowFromEdge(b, DOWN), FadeIn(t)) for b, t in zip(barres, tetes)],
                              lag_ratio=0.12), FadeIn(schema), run_time=1.4)
        self.au_mot("Celui du milieu")
        mil = barres[5]
        self.play(mil.animate.set_fill(VERT_OK), tetes[5].animate.set_fill(VERT_OK), run_time=0.4)
        self.au_mot("2 183 euros")
        xm = ax.x(2183)
        pm = DashedLine(mil.get_bottom(), P(xm[0], xm[1] + 0.05), color=VERT_OK, stroke_width=4, dash_length=0.08)
        tm = Text("médiane 2 183 €", font_size=22, color=VERT_OK, weight=BOLD).move_to(P(-0.6, -1.1))
        self.play(Create(pm), FadeIn(tm, scale=1.2), run_time=0.6)
        self.au_mot("quelques salaires énormes")
        self.play(*[b.animate.set_fill(ROUGE_CLAIR) for b in barres[9:]],
                  *[t.animate.set_fill(ROUGE_CLAIR) for t in tetes[9:]], run_time=0.5)
        self.au_mot("plus de 10 222")
        tg = Text("10 222 € et +", font_size=22, color=ROUGE_CLAIR, weight=BOLD).next_to(barres[10], LEFT, buff=0.1)
        tg.align_to(barres[10], UP)
        un = Text("1 sur 100", font_size=20, color=ROUGE_CLAIR).next_to(tg, DOWN, buff=0.05).align_to(tg, RIGHT)
        self.play(FadeIn(tg, shift=LEFT * 0.1), FadeIn(un), Indicate(barres[10], color=ROUGE_CLAIR), run_time=0.5)
        self.au_mot("tirent la moyenne")
        xa = ax.x(2735)
        mo = Triangle(fill_color=AMBRE, fill_opacity=1, stroke_width=0).scale(0.1).rotate(PI).move_to(
            P(ax.x(2183)[0], xa[1] + 0.25))
        to = Text("moyenne 2 735 €", font_size=22, color=AMBRE, weight=BOLD).move_to(P(0.7, -1.5))
        self.play(FadeIn(mo), run_time=0.2)
        self.play(mo.animate.move_to(P(xa[0], xa[1] + 0.25)), FadeIn(to, shift=RIGHT * 0.2), run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        haut = VGroup(parade, schema, tg, un, pm)

        def geste():
            return [Indicate(tm, color=VERT_OK, scale_factor=1.2)]

        self.play(FadeOut(haut), run_time=0.35)
        t0 = self.question_short("02-question", "02b-reponse", ["Lequel veut dire", "« la moitié gagne moins » ?"],
                                 ["2 735 €", "4 302 €", "2 183 €"], 2,
                                 [("2 183 € : la médiane", VERT_OK, "2 183 euros, la médiane"),
                                  ("2 735 € : la moyenne", ROUGE_CLAIR, "2 735, c'est")],
                                 efface=[VGroup(tm, to)], colonne=True)
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("un salarié sur dix")
        l1 = self.ligne([("1 sur 10 :", AMBRE), ("plus de 4 302 €", WHITE)], 32).move_to(P(0, 1.8))
        self.play(FadeIn(l1, shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("Sur 30 salariés")
        l2 = self.ligne([("Sur 30 salariés :", WHITE), ("?", ORANGE_RETENUE)], 34).move_to(P(0, 1.05))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.insister(l2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, 0.25))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
