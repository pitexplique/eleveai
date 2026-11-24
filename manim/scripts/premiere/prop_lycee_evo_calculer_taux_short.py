# prop_lycee_evo_calculer_taux_short.py
# EleveAI — Maths 1re, STMG et 2de (automatismes) — short jumeau de l'épisode
# COMMUN 11 « Calculer un taux d'évolution » (micro auto_evo_calculer_taux ;
# 2de : info_taux_evolution). CEINTURE BLANCHE (échelle entière), rendu UNE fois.
#   · EN HAUT, l'étiquette « 20 € → 25 € » et la fausse réponse « + 5 % ? » ;
#   · EN BAS, au même instant, les 20 € en quatre blocs de 5 € : le bloc
#     ajouté (vert) vaut UN bloc sur quatre, soit 5 ÷ 20 = 0,25 = + 25 % ;
#   · 1 question-pause (3 s) : de 40 à 50 abonnés (C = + 25 %) ;
#   · fin : de 50 à 40, quel taux ? (− 20 %) en commentaire, puis la fin commune.
# Voix : manim/voix/lycee-evo-calculer-taux-short.json ; WAV :
# public/sons/lycee-evo-calculer-taux-short/ ; marques :
# prop_lycee_evo_calculer_taux_short_marques.json. Base EvoShortBase chargée
# de prop_lycee_evo_valeur_initiale_short.py.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_evo_calculer_taux_short.py PropLyceeEvoCalculerTauxShort
# Brouillon : python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/prop_lycee_evo_calculer_taux_short.py PropLyceeEvoCalculerTauxShort -o eleveai-maths-premiere-evo-calculer-taux-short --media_dir manim/scripts/premiere/media-prop-lycee-evo-calculer-taux-short

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
DEP, ARR = _s10.DEP, _s10.ARR


def boite_s(txt, couleur, centre, l=1.6, h=0.85, fs=40):
    c = RoundedRectangle(width=l, height=h, corner_radius=0.14, fill_color=couleur, fill_opacity=0.18,
                         stroke_color=couleur, stroke_width=4).move_to(centre)
    t = gras(txt, fs).move_to(c)
    return VGroup(c, t)


class PropLyceeEvoCalculerTauxShort(EvoShortBase):
    nom_voix = "lycee-evo-calculer-taux-short"
    fichier_marques = "prop_lycee_evo_calculer_taux_short_marques.json"

    def _rep_q(self, sc):
        # HD 23/11 : sur une ligne, la réponse était réduite à 3,85 de large (minuscule, « 0,25 » collé au cadre)
        l0 = sc.ligne_rep(0, ["10 ÷ 40", "= 0,25"], buff=0.24)
        l1 = sc.ligne_rep(1, ["= + 25 %"])
        sc.au("10 divisé", FadeIn(l0[0], shift=UP * 0.12), *self.garder_bonne(sc, 2))
        sc.au("égale 0,25", FadeIn(l0[1], scale=1.3))
        sc.au("plus 25", FadeIn(l1[0], scale=1.3))
        sc.play(Create(SurroundingRectangle(l1[0], color=VERT_OK, buff=0.14)), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        garder, titre = self.debut("Le taux d'évolution")

        # ── 00 : 20 € → 25 € : + 5 % ? ──
        self.dire("00-accroche")
        self.au_mot("Un prix")
        self.play(Write(titre), run_time=0.5)
        a = boite_s("20 €", DEP, P(-1.3, 1.45), l=1.45, fs=36)
        b = boite_s("25 €", ARR, P(1.3, 1.45), l=1.45, fs=36)
        fl = Arrow(a[0].get_right(), b[0].get_left(), buff=0.08, color=AMBRE, stroke_width=6,
                   max_tip_length_to_length_ratio=0.3)
        self.au("de 20", FadeIn(a, shift=RIGHT * 0.15))
        self.au("à 25", GrowArrow(fl), FadeIn(b, scale=1.2))
        q = self.ligne([("+ 5 %", AMBRE), ("?", AMBRE)], 54).move_to(P(0, 0.45))
        self.au("5 %", FadeIn(q, scale=1.3), rt=0.4)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.2)

        # ── 01 : non ! 5 € sur 20 € : un bloc sur quatre ; 5 ÷ 20 = 0,25 = + 25 % ──
        self.dire("01-image")
        non = gras("Non !", 48, ROUGE_ERREUR).move_to(P(-0.6, 0.45))
        self.au("Non", FadeOut(q), FadeIn(non, scale=1.3))
        lb = 0.7
        blocs = VGroup(*[Rectangle(width=lb, height=0.5, fill_color=DEP, fill_opacity=1, stroke_color=WHITE,
                                   stroke_width=2).move_to(P(-1.75 + lb * (i + 0.5), -0.45)) for i in range(4)])
        vert = Rectangle(width=lb, height=0.5, fill_color=ARR, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P(-1.75 + lb * 4.5, -0.45))
        t5 = gras("+ 5 €", 28, ARR).next_to(vert, UP, buff=0.12)
        self.au("5 € de plus", FadeIn(blocs, shift=UP * 0.15), FadeIn(vert, shift=LEFT * 0.3), FadeIn(t5, scale=1.3),
                rt=0.45)
        br = Brace(blocs, DOWN, buff=0.08, color=DEP)
        t20 = gras("20 €", 30, DEP).next_to(br, DOWN, buff=0.06)
        self.au("sur 20", GrowFromCenter(br), FadeIn(t20, scale=1.3))
        L1 = self.borne_l(self.ligne([("5 ÷ 20", WHITE), ("= 0,25", AMBRE)], 40, buff=0.22)).move_to(P(0, -1.75))
        self.au("5 divisé", FadeIn(L1[0], shift=RIGHT * 0.12), Indicate(vert, color=ARR))
        self.au("égale 0,25", FadeIn(L1[1], scale=1.3))
        L2 = gras("= + 25 %", 50, VERT_OK).move_to(P(0, -2.5))
        self.au("plus 25", FadeIn(L2, scale=1.3), Circumscribe(VGroup(blocs[0], vert), color=ARR, buff=0.06), rt=0.5)
        self.play(Create(SurroundingRectangle(L2, color=VERT_OK, buff=0.14)), run_time=0.3)  # HD 23/11
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) : de 40 à 50 abonnés ──
        self.bonne_q = 2
        self.question_pause("02-question", "02b-reponse", ["De 40 à 50 abonnés :", "quel taux ?"],
                            [self.t("+ 10 %", 32), self.t("+ 20 %", 32), self.t("+ 25 %", 32)], 2,
                            ["10 ÷ 40 = 0,25", "= + 25 %"], mot_q="De 40", autres_r=self._rep_q)
        self.vider(garder)

        # ── 03 : la question en commentaire (sans Ti-Margo), puis la fin commune ──
        self.commentaire("03-commentaire", [("De 50 à 40 :", WHITE, "de 50"), ("quel taux", AMBRE, "quel taux"),
                                            ("d'évolution ?", AMBRE, "évolution")])
        ecran_fin(self, "short", voix="04-abonne")
