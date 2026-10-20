# proba_formule_pascal_short.py
# EleveAI — Maths STMG — short jumeau de « La formule de Pascal » (micro
# vaT_formule_pascal). CEINTURE JAUNE. Il AMUSE : « 4 + 6 = 10 », un calcul de
# CP… et c'est une formule de probabilités !
#   · en HAUT le triangle de Pascal du coach (tableau_donnees, lignes 0 à 6) :
#     4 et 6 s'allument côte à côte, la flèche descend sur 10 ;
#   · en BAS, EN MÊME TEMPS : 4 + 6 = 10, puis « 1 parmi 4 » + « 2 parmi 4 »
#     = « 2 parmi 5 » écrit au-dessus, terme sous terme ;
#   · fin : 10 + 10 = ? (la case de la ligne 6 attend), « Réponds en
#     commentaire ! ».
# Ti-Margo en bas (margo_bas). ⛔ PAS D'ÉCART : les cases du triangle restent
# vides tant que la voix ne dit pas leur nombre.
#
# Voix : manim/voix/stmg-proba-formule-pascal-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_formule_pascal_short.py ShortProbaFormulePascal -o eleveai-maths-stmg-proba-formule-pascal-short --media_dir manim/scripts/stmg/media-vaT_formule_pascal
# Copier dans manim/sorties/stmg/maths/probabilites/44-formule-pascal/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_formule_pascal import (DESSOUS, DESSOUS_BORD, P, TablePascal, binome,  # noqa: E402  (pose les chemins)
                                  suite)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import PROBA  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaFormulePascal(Short6e):
    nom_voix = "stmg-proba-formule-pascal-short"
    identite = "Maths STMG — EleveAI"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : 4 + 6 = 10… et c'est une formule de probabilités ──
        self.dire("00-accroche")
        titre = self.grand("Un calcul de CP ?", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tb = TablePascal(6, w=0.5, h=0.31, fs=18)
        tb.scale_to_fit_width(4.2).move_to(P(0, 0.45))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(tb, shift=UP * 0.3), run_time=0.7)
        # la ligne des binomes (vue au 01) fixe les abscisses des nombres
        e = [binome(4, 1, 28, JAUNE_TITRE), self.t("+", 34), binome(4, 2, 28, JAUNE_TITRE), self.t("=", 34),
             binome(5, 2, 28, VERT_OK)]
        le = suite(*e, buff=0.3).move_to(P(0, -1.72))
        n = [self.t("4", 46, JAUNE_TITRE), self.t("+", 40), self.t("6", 46, JAUNE_TITRE), self.t("=", 40),
             self.t("10", 50, VERT_OK)]
        for a, b in zip(n, e):
            a.move_to(P(b.get_center()[0], -2.5))
        self.au_mot("4 plus 6")
        v4, v6 = tb.valeur(4, 1, "4"), tb.valeur(4, 2, "6")
        self.play(FadeIn(n[0], scale=1.8), tb.allumer(4, 1), FadeIn(v4, scale=2.0), run_time=0.35)
        self.play(FadeIn(n[1]), FadeIn(n[2], scale=1.8), tb.allumer(4, 2), FadeIn(v6, scale=2.0), run_time=0.35)
        cad = tb.voisins(4, 1)
        self.play(Create(cad), run_time=0.25)
        self.au_mot("égale 10")
        fl = tb.fleche(cad, (5, 2))
        v10 = tb.valeur(5, 2, "10")
        self.play(GrowArrow(fl), FadeIn(n[3]), FadeIn(n[4], scale=2.0), run_time=0.35)
        self.play(tb.allumer(5, 2, DESSOUS, DESSOUS_BORD), FadeIn(v10, scale=2.0), run_time=0.3)
        self.au_mot("Et c'est une formule")
        titre2 = self.grand("Formule de probas !", font_size=40, color=ORANGE_RETENUE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, titre2), run_time=0.4)
        self.play(Wiggle(titre2, scale_value=1.2), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : deux voisins → le nombre en dessous ; 1 parmi 4 + 2 parmi 4 ──
        self.dire("01-image")
        self.au_mot("triangle de Pascal")
        self.play(Indicate(tb.titre, color=PROBA, scale_factor=1.3), run_time=0.5)
        self.au_mot("deux voisins")
        self.play(Wiggle(VGroup(tb.case[(4, 1)], tb.case[(4, 2)], v4, v6, cad), scale_value=1.25), run_time=0.6)
        self.au_mot("le nombre en dessous")
        self.play(Indicate(v10, color=DESSOUS_BORD, scale_factor=1.8), run_time=0.6)
        self.au_mot("« 1 parmi 4 »")
        self.play(FadeIn(e[0], scale=1.6), Indicate(v4, color=ORANGE_RETENUE, scale_factor=1.8), run_time=0.45)
        self.au_mot("plus « 2 parmi 4 »")
        self.play(FadeIn(e[1]), FadeIn(e[2], scale=1.6), Indicate(v6, color=ORANGE_RETENUE, scale_factor=1.8),
                  run_time=0.45)
        self.au_mot("égale « 2 parmi 5 »")
        self.play(FadeIn(e[3]), FadeIn(e[4], scale=1.6), Indicate(v10, color=DESSOUS_BORD, scale_factor=1.8),
                  run_time=0.45)
        self.insister(e[4], 1.3, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : 10 + 10 = ? ; « Réponds en commentaire ! » ──
        self.dire("02-question")
        self.au_mot("10 plus 10")
        self.play(FadeOut(VGroup(*e, *n)), FadeOut(cad), FadeOut(fl), tb.eteindre(4, 1), tb.eteindre(4, 2),
                  run_time=0.3)
        w = tb.valeur(5, 3, "10")
        q = tb.valeur(6, 3, "?", ORANGE_RETENUE)
        cad2 = tb.voisins(5, 2)
        m = suite(self.t("10", 50, JAUNE_TITRE), self.t("+", 40), self.t("10", 50, JAUNE_TITRE), self.t("=", 40),
                  self.t("?", 56, ORANGE_RETENUE), buff=0.22).move_to(P(0, -1.65))
        self.play(tb.allumer(5, 2), tb.allumer(5, 3), FadeIn(w, scale=2.0), Create(cad2),
                  FadeIn(m[0], scale=1.6), FadeIn(m[1]), FadeIn(m[2], scale=1.6), run_time=0.5)
        self.au_mot("quel coefficient")
        fl2 = tb.fleche(cad2, (6, 3))
        self.play(GrowArrow(fl2), tb.allumer(6, 3, "#FED7AA", ORANGE_RETENUE), FadeIn(q, scale=2.0),
                  FadeIn(m[3]), FadeIn(m[4], scale=2.0), run_time=0.45)
        self.insister(m[4], 1.4, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 36, VERT_OK), self.t("commentaire !", 36, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
