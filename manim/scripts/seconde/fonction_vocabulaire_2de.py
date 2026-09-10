# fonction_vocabulaire_2de.py
# EleveAI — Maths seconde — Fonctions : image, antécédent, courbe
# (notionId : fonction_vocabulaire_2de)
#
# ⭐ SIXIÈME NOTION DE SECONDE (10/09/2026), et la NOTION CHARNIÈRE de l'année :
# les variations, les tableaux de signes, les fonctions de référence et les
# fonctions affines s'appuient tous sur ce vocabulaire.
#
# Briques communes : `manim/gabarit_seconde.py`.
# Mêmes exemples que la fiche `lib/fiches/maths-seconde-fonctions.tsx`.
#
# Mapping micro-compétences (7 micros, TOUS couverts) → écrans :
# - fonction_vocabulaire         → écran 1 (la courbe, et le point lu DANS LES
#                                  DEUX SENS)
# - fonction_image_formule       → écran 2 (remplacer : f(4) = 8)
# - fonction_antecedent          → écran 3 (résoudre : les antécédents de 3)
# - fonction_domaine             → écran 3 (une équation peut n'avoir aucune
#                                  solution : zéro antécédent)
# - fonction_tableau_graphique   → écran 5 (du tableau de valeurs à la courbe)
# - fonction_resolution_graphique→ écran 5 (monter / traverser)
# - fonction_comparer_courbes    → écran 4 (verticale contre horizontale)
#
# ⭐ TOUT REPOSE SUR UNE SEULE FONCTION : f(x) = x² − 2x. Elle a été choisie
# pour que la dissymétrie SE VOIE — l'image de 4 vaut 8 (un seul résultat),
# mais 3 a DEUX antécédents (−1 et 3). Avec une fonction affine, la leçon
# passerait inaperçue : tout y est unique dans les deux sens.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/fonction_vocabulaire_2de.py FonctionVocabulaire2de -o eleveai-maths-seconde-fonction-vocabulaire --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-fonction-vocabulaire"
VOIX_DIS = SONS / "seconde-fonction-vocabulaire-short-dissymetrie"
VOIX_IMG = SONS / "seconde-fonction-vocabulaire-short-image"
VOIX_LEC = SONS / "seconde-fonction-vocabulaire-short-lecture"


def f(x):
    return x * x - 2 * x


class FonctionVocabulaire2de(NotionSeconde):

    dossier_voix = VOIX

    def repere_f(self, centre=ORIGIN, x_length=6.2, y_length=4.2):
        """Le repère et la parabole de f(x) = x² − 2x, prêts à l'emploi."""
        axes = self.axes_notion([-2, 5, 1], [-2, 9, 2],
                                x_length=x_length, y_length=y_length, font_size=20)
        axes.move_to(centre)
        courbe = axes.plot(f, x_range=[-1.7, 3.7, 0.05], color=BLEU_CALCUL, stroke_width=5)
        return axes, courbe

    # ── écran 1 : fonction_vocabulaire ──────────────────────────────────────

    def ecran_vocabulaire(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-vocabulaire")
        self.titre_ecran("Image et antécédent")

        axes, courbe = self.repere_f(centre=[-3.2, -0.6, 0], x_length=5.4, y_length=3.6)
        self.play(Create(axes))
        self.play(Create(courbe))

        # LE MÊME POINT, LU DANS LES DEUX SENS.
        p = Dot(axes.c2p(4, 8), color=JAUNE_TITRE, radius=0.09)
        # ⚠️ Étiquette vers la GAUCHE : le point A est au bord droit du repère,
        # et en UR elle venait toucher le bloc de texte de droite.
        etiq = Text("A(4 ; 8)", font_size=24, color=JAUNE_TITRE)
        etiq.next_to(p, UL, buff=0.1)
        self.play(GrowFromCenter(p), Write(etiq))

        sens = VGroup(
            Text("l'image de 4 est 8", font_size=30, color=VERT_OK),
            Text("4 est un antécédent de 8", font_size=30, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.6, aligned_edge=LEFT).move_to([3.0, 0.7, 0])
        for m in sens:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.6)

        note = Text("le MÊME point, lu dans les deux sens",
                    font_size=26, color=WHITE).move_to([3.0, -0.9, 0])
        if note.width > 6.0:
            note.scale_to_fit_width(6.0)
        self.play(Write(note))

        self.play(Write(self.chute("Une fonction associe à x un seul nombre : f(x).")))
        self.attendre_voix()

    # ── écran 2 : fonction_image_formule ────────────────────────────────────

    def ecran_image(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-image")
        self.titre_ecran("Calculer une image : REMPLACER")

        formule = Text("f(x) = x² − 2x", font_size=44, color=JAUNE_TITRE).move_to([0, 2.05, 0])
        self.play(FadeIn(formule, shift=DOWN * 0.15))
        self.wait(0.4)

        etapes = VGroup(
            Text("f(4) = 4² − 2 × 4", font_size=38, color=WHITE),
            Text("= 16 − 8", font_size=38, color=WHITE),
            Text("= 8", font_size=48, color=VERT_OK),
        ).arrange(DOWN, buff=0.5).move_to([-2.0, -0.25, 0])
        for m in etapes:
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.5)
        self.play(Circumscribe(etapes[2], color=VERT_OK, buff=0.2))

        bilan = VGroup(
            Text("l'image de 4", font_size=32, color=VERT_OK),
            Text("est 8", font_size=32, color=VERT_OK),
            Text("un seul calcul,", font_size=26, color=WHITE),
            Text("un seul résultat", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.28).move_to([3.3, -0.25, 0])
        cadre = SurroundingRectangle(bilan, color=VERT_OK, buff=0.3, stroke_width=2.5)
        self.play(FadeIn(bilan), Create(cadre))

        self.play(Write(self.chute("C'est le sens facile.")))
        self.attendre_voix()

    # ── écran 3 : fonction_antecedent (+ domaine) ───────────────────────────

    def ecran_antecedent(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-antecedent")
        self.titre_ecran("Chercher un antécédent : RÉSOUDRE")

        question = Text("Quels sont les antécédents de 3 ?",
                        font_size=34, color=JAUNE_TITRE).move_to([0, 2.1, 0])
        self.play(Write(question))

        etapes = VGroup(
            Text("x² − 2x = 3", font_size=36, color=WHITE),
            Text("x² − 2x − 3 = 0", font_size=36, color=WHITE),
            Text("(x − 3)(x + 1) = 0", font_size=36, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.42).move_to([-2.4, 0.35, 0])
        for m in etapes:
            self.play(FadeIn(m, shift=UP * 0.13), run_time=0.5)

        sol = VGroup(
            Text("x = 3", font_size=42, color=VERT_OK),
            Text("ou", font_size=28, color=WHITE),
            Text("x = −1", font_size=42, color=VERT_OK),
        ).arrange(DOWN, buff=0.28).move_to([3.1, 0.35, 0])
        cadre = SurroundingRectangle(sol, color=VERT_OK, buff=0.3, stroke_width=2.5)
        self.play(FadeIn(sol), Create(cadre))
        self.play(Flash(sol, color=VERT_OK, line_length=0.3))

        deux = Text("DEUX antécédents", font_size=36, color=ORANGE_RETENUE)
        deux.move_to([0, -1.75, 0])
        self.play(Write(deux))

        self.play(Write(self.chute("Il a fallu résoudre une équation.")))
        self.attendre_voix()

    # ── écran 4 : LA DISSYMÉTRIE ────────────────────────────────────────────

    def ecran_dissymetrie(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-dissymetrie")
        self.titre_ecran("La dissymétrie qu'il faut retenir")

        gauche = VGroup(
            Text("une IMAGE", font_size=34, color=VERT_OK),
            Text("est UNIQUE", font_size=34, color=VERT_OK),
            Text("sinon ce ne serait", font_size=24, color=WHITE),
            Text("pas une fonction", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.24).move_to([-3.4, 1.1, 0])
        cadre_g = SurroundingRectangle(gauche, color=VERT_OK, buff=0.28, stroke_width=2.5)

        droite = VGroup(
            Text("un ANTÉCÉDENT", font_size=34, color=ORANGE_RETENUE),
            Text("ne l'est PAS", font_size=34, color=ORANGE_RETENUE),
            Text("zéro, un, deux…", font_size=24, color=WHITE),
            Text("ou une infinité", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.24).move_to([3.4, 1.1, 0])
        cadre_d = SurroundingRectangle(droite, color=ORANGE_RETENUE, buff=0.28, stroke_width=2.5)

        self.play(FadeIn(gauche), Create(cadre_g))
        self.play(FadeIn(droite), Create(cadre_d))
        self.wait(0.4)

        # ⭐ Et ça SE VOIT : verticale contre horizontale.
        # ⚠️ Remonté : à −1,75 les graduations de l'axe des abscisses tombaient
        # sur la phrase de fin d'écran (rendu du 10/09).
        axes, courbe = self.repere_f(centre=[0, -1.35, 0], x_length=4.6, y_length=2.1)
        self.play(Create(axes), Create(courbe))

        verticale = DashedLine(axes.c2p(4, -2), axes.c2p(4, 8), color=VERT_OK, stroke_width=4)
        horizontale = DashedLine(axes.c2p(-2, 3), axes.c2p(5, 3), color=ORANGE_RETENUE, stroke_width=4)
        self.play(Create(verticale))
        self.play(Create(horizontale))
        p1 = Dot(axes.c2p(3, 3), color=ORANGE_RETENUE, radius=0.07)
        p2 = Dot(axes.c2p(-1, 3), color=ORANGE_RETENUE, radius=0.07)
        self.play(GrowFromCenter(p1), GrowFromCenter(p2))

        self.play(Write(self.chute("La verticale coupe une fois. L'horizontale, deux.")))
        self.attendre_voix()

    # ── écran 5 : lecture graphique ─────────────────────────────────────────

    def ecran_graphique(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-graphique")
        self.titre_ecran("Les deux gestes, sur la courbe")

        axes, courbe = self.repere_f(centre=[-2.6, -0.5, 0], x_length=6.0, y_length=4.0)
        self.play(Create(axes), Create(courbe))

        # L'image : je MONTE.
        v = DashedLine(axes.c2p(4, 0), axes.c2p(4, 8), color=VERT_OK, stroke_width=4)
        h = DashedLine(axes.c2p(4, 8), axes.c2p(0, 8), color=VERT_OK, stroke_width=4)
        pt = Dot(axes.c2p(4, 8), color=VERT_OK, radius=0.08)
        self.play(Create(v), Create(h), GrowFromCenter(pt))
        lab_i = VGroup(
            Text("l'IMAGE", font_size=30, color=VERT_OK),
            Text("je MONTE", font_size=32, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([3.6, 1.5, 0])
        self.play(FadeIn(lab_i, shift=RIGHT * 0.2))

        # L'antécédent : je TRAVERSE.
        h2 = DashedLine(axes.c2p(-2, 3), axes.c2p(4, 3), color=ORANGE_RETENUE, stroke_width=4)
        a1 = Dot(axes.c2p(3, 3), color=ORANGE_RETENUE, radius=0.08)
        a2 = Dot(axes.c2p(-1, 3), color=ORANGE_RETENUE, radius=0.08)
        self.play(Create(h2), GrowFromCenter(a1), GrowFromCenter(a2))
        lab_a = VGroup(
            Text("l'ANTÉCÉDENT", font_size=30, color=ORANGE_RETENUE),
            Text("je TRAVERSE", font_size=32, color=ORANGE_RETENUE),
            Text("−1 et 3", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([3.6, -1.3, 0])
        self.play(FadeIn(lab_a, shift=RIGHT * 0.2))

        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        formule = Text("f(x) = x² − 2x", font_size=44, color=JAUNE_TITRE).move_to([0, 1.95, 0])
        self.play(FadeIn(formule, shift=DOWN * 0.15))

        q = VGroup(
            Text("1.  Calcule f(−2)", font_size=36, color=WHITE),
            Text("2.  Trouve TOUS les antécédents de 0", font_size=36, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to([0, 0.4, 0])
        for m in q:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.55)

        indice = Text("Il y en a plus d'un.", font_size=28, color=BLEU_CALCUL)
        indice.move_to([0, -1.0, 0])
        self.play(FadeIn(indice, shift=UP * 0.15))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-correction")
        self.titre_ecran("Correction")

        # 1. l'image de −2
        t1 = Text("1.  f(−2)", font_size=30, color=VERT_OK).move_to([-4.0, 2.15, 0])
        self.play(Write(t1))
        c1 = VGroup(
            Text("(−2)² − 2 × (−2)", font_size=32, color=WHITE),
            Text("= 4 + 4  =  8", font_size=34, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([-2.7, 1.25, 0])
        for m in c1:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)
        alerte = Text("(−2)² = 4, positif !", font_size=25, color=ORANGE_RETENUE)
        alerte.move_to([-2.7, 0.35, 0])
        self.play(FadeIn(alerte))

        # 2. les antécédents de 0
        t2 = Text("2.  antécédents de 0", font_size=30, color=VERT_OK).move_to([-2.6, -0.5, 0])
        self.play(Write(t2))
        c2 = VGroup(
            Text("x² − 2x = 0", font_size=32, color=WHITE),
            Text("x(x − 2) = 0", font_size=32, color=BLEU_CALCUL),
            Text("x = 0   ou   x = 2", font_size=36, color=VERT_OK),
        ).arrange(DOWN, buff=0.32).move_to([0, -1.6, 0])
        for m in c2:
            self.play(FadeIn(m, shift=UP * 0.13), run_time=0.45)
        self.play(Circumscribe(c2[2], color=VERT_OK, buff=0.18))

        self.play(Write(self.chute("Un produit est nul si l'un des facteurs l'est.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Image, antécédent, courbe",
            accroche="Combien 3 a-t-il d'antécédents ?",
            promesse="Calculer · résoudre · lire sur la courbe",
        )
        self.page_objectifs([
            "calculer l'image d'un nombre avec une formule",
            "chercher les antécédents, et voir pourquoi il y en a plusieurs",
            "lire tout ça sur une courbe",
        ])
        self.ecran_vocabulaire()
        self.ecran_image()
        self.ecran_antecedent()
        self.ecran_dissymetrie()
        self.ecran_graphique()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "calculer une image : je REMPLACE",
                "chercher un antécédent : je RÉSOUS une équation",
                "sur la courbe : l'image en montant, l'antécédent en traversant",
            ],
            rappel="Une image est UNIQUE. Un antécédent ne l'est pas.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LES TROIS SHORTS
# ══════════════════════════════════════════════════════════════════════════════

class FonctionVocabulaire2deShortDissymetrie(ShortSeconde):
    """L'ERREUR — la confusion image / antécédent."""

    dossier_voix = VOIX_DIS

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("IMAGE", font_size=64, color=VERT_OK),
            self.grand("ou", font_size=34, color=WHITE),
            self.grand("ANTÉCÉDENT ?", font_size=54, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.28).move_to([0, 1.7, 0])
        self.play(FadeIn(t, shift=DOWN * 0.15), run_time=0.5)
        q = self.grand("tout le monde confond", font_size=32, color=WHITE).move_to([0, -0.1, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_image(self):
        self.clear()
        self.margo_bas()
        self.dire("01-image")
        bloc = VGroup(
            self.grand("une IMAGE", font_size=44, color=VERT_OK),
            self.grand("est UNIQUE", font_size=48, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.7, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.32, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        note = VGroup(
            self.grand("sinon ce ne serait", font_size=30, color=WHITE),
            self.grand("pas une fonction", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.4, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_antecedent(self):
        self.clear()
        self.margo_bas()
        self.dire("02-antecedent")
        bloc = VGroup(
            self.grand("un ANTÉCÉDENT", font_size=40, color=ORANGE_RETENUE),
            self.grand("ne l'est PAS", font_size=48, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.7, 0])
        cadre = SurroundingRectangle(bloc, color=ORANGE_RETENUE, buff=0.32, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        note = VGroup(
            self.grand("zéro, un, deux…", font_size=32, color=WHITE),
            self.grand("ou une infinité", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.4, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_courbe(self):
        self.clear()
        self.margo_bas()
        self.dire("03-courbe")
        self.play(Write(self.grand("Et ça se VOIT", font_size=38, color=JAUNE_TITRE).move_to([0, 3.15, 0])))

        axes = self.axes_notion([-2, 5, 1], [-2, 9, 3], x_length=3.5, y_length=2.8, font_size=16)
        axes.move_to([0, 1.2, 0])
        courbe = axes.plot(f, x_range=[-1.7, 3.7, 0.05], color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(axes), Create(courbe))

        v = DashedLine(axes.c2p(4, -2), axes.c2p(4, 8), color=VERT_OK, stroke_width=4)
        self.play(Create(v))
        self.play(Write(self.grand("verticale : 1 fois", font_size=28, color=VERT_OK).move_to([0, -0.85, 0])))

        h = DashedLine(axes.c2p(-2, 3), axes.c2p(5, 3), color=ORANGE_RETENUE, stroke_width=4)
        self.play(Create(h))
        for x in (3, -1):
            self.play(GrowFromCenter(Dot(axes.c2p(x, 3), color=ORANGE_RETENUE, radius=0.07)),
                      run_time=0.3)
        self.play(Write(self.grand("horizontale : 2 fois", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.45, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("l'image :", font_size=36, color=VERT_OK),
            self.grand("je MONTE", font_size=48, color=VERT_OK),
            self.grand("l'antécédent :", font_size=36, color=ORANGE_RETENUE),
            self.grand("je TRAVERSE", font_size=48, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.play(Write(self.chute("Pour l'antécédent : une équation.",
                                   color=JAUNE_TITRE, font_size=26)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_image()
        self.ecran_antecedent()
        self.ecran_courbe()
        self.ecran_retenir()
        self.ecran_renvoi()


class FonctionVocabulaire2deShortImage(ShortSeconde):
    """LE GESTE — calculer une image en remplaçant."""

    dossier_voix = VOIX_IMG

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        formule = self.grand("f(x) = x² − 2x", font_size=56, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(formule, shift=DOWN * 0.15), run_time=0.45)
        q = self.grand("f(4) = ?", font_size=68, color=WHITE).move_to([0, 0.3, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.play(Flash(q, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_remplacer(self):
        self.clear()
        self.margo_bas()
        self.dire("01-remplacer")
        self.play(Write(self.grand("Le geste", font_size=38, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("REMPLACER", font_size=54, color=VERT_OK),
            self.grand("partout où il y a x,", font_size=30, color=WHITE),
            self.grand("j'écris 4", font_size=40, color=WHITE),
        ).arrange(DOWN, buff=0.32).move_to([0, 1.4, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_calcul(self):
        self.clear()
        self.margo_bas()
        self.dire("02-calcul")
        bloc = VGroup(
            self.grand("f(4) =", font_size=44, color=WHITE),
            self.grand("4² − 2 × 4", font_size=52, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.4).move_to([0, 1.6, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_resultat(self):
        self.clear()
        self.margo_bas()
        self.dire("03-resultat")
        suite = VGroup(
            self.grand("16 − 8", font_size=54, color=WHITE),
            self.grand("=", font_size=40, color=WHITE),
            self.grand("8", font_size=110, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.4, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Write(self.grand("l'image de 4 est 8", font_size=34, color=VERT_OK).move_to([0, -1.3, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("04-piege")
        self.play(Write(self.grand("Le piège", font_size=38, color=ROUGE_ERREUR).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("f(−2) = (−2)² − 2×(−2)", font_size=32, color=WHITE),
            self.grand("(−2)² = 4", font_size=42, color=VERT_OK),
            self.grand("POSITIF", font_size=40, color=VERT_OK),
            self.grand("= 4 + 4 = 8", font_size=44, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.2, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_remplacer()
        self.ecran_calcul()
        self.ecran_resultat()
        self.ecran_piege()
        self.ecran_renvoi()


class FonctionVocabulaire2deShortLecture(ShortSeconde):
    """L'USAGE — lire une image et un antécédent sur la courbe."""

    dossier_voix = VOIX_LEC

    def _courbe(self, y=1.1, x_length=3.5, y_length=2.8):
        axes = self.axes_notion([-2, 5, 1], [-2, 9, 3],
                                x_length=x_length, y_length=y_length, font_size=16)
        axes.move_to([0, y, 0])
        courbe = axes.plot(f, x_range=[-1.7, 3.7, 0.05], color=BLEU_CALCUL, stroke_width=4)
        return axes, courbe

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("LIRE", font_size=64, color=JAUNE_TITRE),
            self.grand("sur une courbe", font_size=40, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.25).move_to([0, 2.2, 0])
        self.play(FadeIn(t, shift=DOWN * 0.15), run_time=0.45)
        q = VGroup(
            self.grand("deux gestes", font_size=40, color=WHITE),
            self.grand("différents", font_size=40, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, 0.5, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_image(self):
        self.clear()
        self.margo_bas()
        self.dire("01-image")
        self.play(Write(self.grand("L'IMAGE", font_size=44, color=VERT_OK).move_to([0, 3.15, 0])))
        axes, courbe = self._courbe()
        self.play(Create(axes), Create(courbe))
        v = DashedLine(axes.c2p(4, 0), axes.c2p(4, 8), color=VERT_OK, stroke_width=4)
        h = DashedLine(axes.c2p(4, 8), axes.c2p(0, 8), color=VERT_OK, stroke_width=4)
        pt = Dot(axes.c2p(4, 8), color=VERT_OK, radius=0.07)
        self.play(Create(v))
        self.play(GrowFromCenter(pt), Create(h))
        self.play(Write(self.grand("je MONTE", font_size=44, color=VERT_OK).move_to([0, -1.1, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_antecedent(self):
        self.clear()
        self.margo_bas()
        self.dire("02-antecedent")
        self.play(Write(self.grand("L'ANTÉCÉDENT", font_size=40, color=ORANGE_RETENUE).move_to([0, 3.15, 0])))
        axes, courbe = self._courbe()
        self.play(Create(axes), Create(courbe))
        h = DashedLine(axes.c2p(-2, 3), axes.c2p(5, 3), color=ORANGE_RETENUE, stroke_width=4)
        self.play(Create(h))
        self.play(Write(self.grand("je TRAVERSE", font_size=44, color=ORANGE_RETENUE).move_to([0, -1.1, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_plusieurs(self):
        self.clear()
        self.margo_bas()
        self.dire("03-plusieurs")
        axes, courbe = self._courbe(y=1.3)
        self.play(Create(axes), Create(courbe))
        h = DashedLine(axes.c2p(-2, 3), axes.c2p(5, 3), color=ORANGE_RETENUE, stroke_width=4)
        self.play(Create(h))
        for x in (3, -1):
            self.play(GrowFromCenter(Dot(axes.c2p(x, 3), color=ORANGE_RETENUE, radius=0.08)),
                      run_time=0.35)
        bloc = VGroup(
            self.grand("DEUX points", font_size=44, color=ORANGE_RETENUE),
            self.grand("deux antécédents", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.25).move_to([0, -1.2, 0])
        self.play(FadeIn(bloc, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("l'image", font_size=42, color=VERT_OK),
            self.grand("je MONTE", font_size=52, color=VERT_OK),
            self.grand("l'antécédent", font_size=42, color=ORANGE_RETENUE),
            self.grand("je TRAVERSE", font_size=52, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_image()
        self.ecran_antecedent()
        self.ecran_plusieurs()
        self.ecran_retenir()
        self.ecran_renvoi()
