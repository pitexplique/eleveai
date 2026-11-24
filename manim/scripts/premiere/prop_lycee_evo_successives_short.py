# prop_lycee_evo_successives_short.py
# EleveAI — Maths 1re, STMG et 2de (automatismes) — short jumeau de l'épisode
# COMMUN 12 « Les évolutions successives » (micro auto_evo_successives ; 2de :
# info_evolutions_successives). CEINTURE BLANCHE (échelle entière), rendu UNE fois.
#   · EN HAUT, deux étiquettes « − 50 % » et la promesse « = GRATUIT ? » ;
#   · EN BAS, au même instant, la barre du prix coupée en deux, puis encore en
#     deux : il reste un quart (0,5 × 0,5 = 0,25) : − 75 %, pas gratuit ;
#   · 1 question-pause (3 s) : − 20 % puis − 20 % (B = − 36 %) ;
#   · fin : + 50 % puis + 50 % (+ 125 %) en commentaire, puis la fin commune.
# Voix : manim/voix/lycee-evo-successives-short.json ; WAV :
# public/sons/lycee-evo-successives-short/ ; marques :
# prop_lycee_evo_successives_short_marques.json. Base EvoShortBase chargée de
# prop_lycee_evo_valeur_initiale_short.py.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_evo_successives_short.py PropLyceeEvoSuccessivesShort
# Brouillon : python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/prop_lycee_evo_successives_short.py PropLyceeEvoSuccessivesShort -o eleveai-maths-premiere-evo-successives-short --media_dir manim/scripts/premiere/media-prop-lycee-evo-successives-short

import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("prop_lycee_evo_valeur_initiale_short_base",
                                               _ICI / "prop_lycee_evo_valeur_initiale_short.py")
_s10 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_s10)
sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from fin_commune import ecran_fin  # noqa: E402

EvoShortBase, gras = _s10.EvoShortBase, _s10.gras
DEP, BAISSE = _s10.DEP, _s10.BAISSE


def etiquette(txt, centre, angle=0.0):
    """Une étiquette de soldes jaune, trouée, le taux en rouge."""
    c = RoundedRectangle(width=1.85, height=0.95, corner_radius=0.16, fill_color=JAUNE_TITRE, fill_opacity=1,
                         stroke_width=0)
    trou = Circle(radius=0.08, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(c.get_left() + RIGHT * 0.2)
    t = gras(txt, 32, BAISSE)
    t.scale_to_fit_width(min(t.width, 1.4)).move_to(c.get_center() + RIGHT * 0.14)
    g = VGroup(c, trou, t).rotate(angle).move_to(centre)
    return g


class PropLyceeEvoSuccessivesShort(EvoShortBase):
    nom_voix = "lycee-evo-successives-short"
    fichier_marques = "prop_lycee_evo_successives_short_marques.json"

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["0,8 × 0,8", "= 0,64"])
        l1 = sc.ligne_rep(1, ["soit", "− 36 %"], buff=0.3)  # HD 23/11 : « soit » collé au cadre
        sc.au("0,8 fois", FadeIn(l0[0], shift=UP * 0.12), *self.garder_bonne(sc, 1))
        sc.au("égale 0,64", FadeIn(l0[1], scale=1.3))
        sc.au("moins 36", FadeIn(l1, scale=1.3))
        sc.play(Create(SurroundingRectangle(l1[1], color=VERT_OK, buff=0.12)), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        garder, titre = self.debut("Deux soldes de suite")

        # ── 00 : − 50 % puis encore − 50 % : gratuit ? ──
        self.dire("00-accroche")
        self.au_mot("Moins 50")
        self.play(Write(titre), run_time=0.4)
        e1 = etiquette("− 50 %", P(-1.02, 1.6), 0.08)
        e2 = etiquette("− 50 %", P(1.02, 1.6), -0.08)
        self.play(FadeIn(e1, scale=1.3), run_time=0.35)
        self.au("encore moins", FadeIn(e2, scale=1.3))
        gr = gras("= GRATUIT ?", 46, AMBRE)
        gr.scale_to_fit_width(min(gr.width, 3.4)).move_to(P(0, 0.55))
        self.au("gratuit", FadeIn(gr, scale=1.3), rt=0.4)
        self.insister(gr, 1.15)
        self.attendre_voix(marge=0.2)

        # ── 01 : non ! la barre coupée en deux, puis encore : il reste 25 % : − 75 % ──
        self.dire("01-image")
        non = gras("Non !", 48, ROUGE_ERREUR).move_to(P(0, 0.55))
        lb = 0.36
        morceaux = VGroup(*[Rectangle(width=lb, height=0.55, fill_color=DEP, fill_opacity=1, stroke_color=WHITE,
                                      stroke_width=1.5).move_to(P(-1.8 + lb * (i + 0.5), -0.4)) for i in range(10)])
        self.au("Non", FadeOut(gr), FadeIn(non, scale=1.3), FadeIn(morceaux, shift=UP * 0.15))
        L1 = self.borne_l(self.ligne([("0,5 × 0,5", WHITE), ("= 0,25", AMBRE)], 44, buff=0.3)).move_to(P(0, -1.75))  # HD 23/11 : « 0,5= »
        self.au("0,5 fois", FadeIn(L1[0], shift=RIGHT * 0.12), *[morceaux[i].animate.set_fill(BAISSE, 1)
                                                                 for i in range(5, 10)], Indicate(e1, scale_factor=1.1))
        demi = Rectangle(width=lb / 2, height=0.55, fill_color=BAISSE, fill_opacity=1, stroke_width=0)
        demi.align_to(morceaux[2], RIGHT).set_y(morceaux[2].get_y())
        self.au("égale 0,25", FadeIn(L1[1], scale=1.3), morceaux[3].animate.set_fill(BAISSE, 1),
                morceaux[4].animate.set_fill(BAISSE, 1), FadeIn(demi), Indicate(e2, scale_factor=1.1), rt=0.45)
        br = Brace(VGroup(morceaux[0], morceaux[1], demi.copy().align_to(morceaux[2], LEFT)), DOWN, buff=0.06,
                   color=DEP)
        tq = self.t("un quart", 28, DEP).next_to(br, DOWN, buff=0.04)
        tq.shift(RIGHT * max(0.0, -1.85 - tq.get_left()[0]))
        self.au("un quart", GrowFromCenter(br), FadeIn(tq), rt=0.35)
        L2 = gras("− 75 %", 50, VERT_OK).move_to(P(0, -2.45))  # HD 23/11 : le cadre touchait Ti-Margo
        self.au("moins 75", FadeIn(L2, scale=1.3), rt=0.4)
        self.play(Create(SurroundingRectangle(L2, color=VERT_OK, buff=0.14)), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) : − 20 % puis − 20 % ──
        self.bonne_q = 1
        self.question_pause("02-question", "02b-reponse", ["− 20 %, puis − 20 % :", "au total ?"],
                            [self.t("− 40 %", 32), self.t("− 36 %", 32), self.t("− 4 %", 32)], 1,
                            ["0,8 × 0,8 = 0,64", "soit − 36 %"], mot_q="Moins 20", autres_r=self._rep_q)
        self.vider(garder)

        # ── 03 : la question en commentaire (sans Ti-Margo), puis la fin commune ──
        self.commentaire("03-commentaire", [("+ 50 %,", WHITE, "plus 50"), ("puis + 50 % :", WHITE, "puis plus"),
                                            ("quel taux", AMBRE, "Quel taux"), ("au total ?", AMBRE, "au total")])
        ecran_fin(self, "short", voix="04-abonne")
