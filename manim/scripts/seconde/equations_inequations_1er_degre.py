# equations_inequations_1er_degre.py
# EleveAI — Maths seconde — Équations et inéquations du premier degré
# (notionId : equations_inequations_1er_degre)
#
# ⭐ CINQUIÈME NOTION DE SECONDE (10/09/2026). Une vidéo longue et trois shorts.
#
# Briques communes : `manim/gabarit_seconde.py`.
# Mêmes exemples que la fiche `lib/fiches/maths-seconde-equations.tsx`.
#
# Mapping micro-compétences (5 micros, TOUS couverts) → écrans :
# - equation_resoudre            → écran 1 (la balance : 5x − 3 = 12)
# - inequation_resoudre          → écran 2 (les mêmes gestes) + écran 3 (⛔ le
#                                  retournement, et sa DÉMONSTRATION sur 2 < 5)
# - inequation_intervalle        → écran 4 (le crochet ouvert du côté de l'infini)
# - equation_probleme            → écran 5 (les quatre étapes)
# - comparer_difference_quotient → écran 5 (comparer par la différence)
#
# ⭐ LE RETOURNEMENT SE DÉMONTRE, il ne s'assène pas : on part de 2 < 5, on
# multiplie les deux par −1, et on VOIT −2 > −5. La règle cesse d'être un décret
# à retenir, elle devient une conséquence.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/equations_inequations_1er_degre.py EquationsInequations2de -o eleveai-maths-seconde-equations-inequations --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-equations-inequations"
VOIX_RET = SONS / "seconde-equations-inequations-short-retournement"
VOIX_BAL = SONS / "seconde-equations-inequations-short-balance"
VOIX_PB = SONS / "seconde-equations-inequations-short-probleme"


class EquationsInequations2de(NotionSeconde):

    dossier_voix = VOIX

    def etape(self, gauche, droite, geste, y, couleur=WHITE):
        """Une ligne de résolution : l'égalité, et le geste qui l'a produite."""
        g = Text(gauche, font_size=36, color=couleur)
        s = Text("=", font_size=36, color=couleur)
        d = Text(droite, font_size=36, color=couleur)
        ligne = VGroup(g, s, d).arrange(RIGHT, buff=0.25).move_to([0, y, 0])
        note = Text(geste, font_size=24, color=BLEU_CALCUL)
        note.next_to(ligne, RIGHT, buff=0.6)
        return ligne, note

    # ── écran 1 : equation_resoudre ─────────────────────────────────────────

    def ecran_equation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-equation")
        self.titre_ecran("L'équation : une balance")

        # La balance, dessinée : ce qu'on fait d'un côté, on le fait de l'autre.
        pivot = [0, 1.35, 0]
        barre = Line([-2.4, 1.35, 0], [2.4, 1.35, 0], color=WHITE, stroke_width=5)
        pied = Polygon([-0.35, 0.75, 0], [0.35, 0.75, 0], pivot,
                       color=WHITE, fill_opacity=0.3, stroke_width=3)
        pg = Rectangle(width=1.7, height=0.6, color=BLEU_CALCUL, fill_opacity=0.35,
                       stroke_width=3).move_to([-1.65, 1.72, 0])
        pd = Rectangle(width=1.7, height=0.6, color=VERT_OK, fill_opacity=0.35,
                       stroke_width=3).move_to([1.65, 1.72, 0])
        tg = Text("5x − 3", font_size=28, color=WHITE).move_to(pg.get_center())
        td = Text("12", font_size=28, color=WHITE).move_to(pd.get_center())
        self.play(Create(barre), Create(pied))
        self.play(FadeIn(pg), FadeIn(pd), Write(tg), Write(td))

        regle = Text("ce que je fais d'un côté, je le fais de l'autre",
                     font_size=27, color=JAUNE_TITRE).move_to([0, 0.45, 0])
        self.play(Write(regle))

        l1, n1 = self.etape("5x", "15", "+ 3 des deux côtés", -0.55)
        self.play(FadeIn(l1, shift=UP * 0.12), FadeIn(n1))
        l2, n2 = self.etape("x", "3", "÷ 5 des deux côtés", -1.55, VERT_OK)
        self.play(FadeIn(l2, shift=UP * 0.12), FadeIn(n2))
        self.play(Circumscribe(l2, color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("Une équation du premier degré a UNE solution.")))
        self.attendre_voix()

    # ── écran 2 : inequation_resoudre ───────────────────────────────────────

    def ecran_inequation(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-inequation")
        self.titre_ecran("L'inéquation : les MÊMES gestes")

        depart = Text("2x + 1 < 9", font_size=42, color=JAUNE_TITRE).move_to([0, 2.05, 0])
        self.play(FadeIn(depart, shift=DOWN * 0.15))

        for txt, geste, y, coul in [("2x < 8", "− 1 des deux côtés", 1.0, WHITE),
                                    ("x < 4", "÷ 2 des deux côtés", 0.0, VERT_OK)]:
            ligne = Text(txt, font_size=38, color=coul).move_to([-1.2, y, 0])
            note = Text(geste, font_size=24, color=BLEU_CALCUL)
            note.next_to(ligne, RIGHT, buff=0.7)
            self.play(FadeIn(ligne, shift=UP * 0.12), FadeIn(note))

        # La différence : une infinité de solutions, montrée sur la droite.
        axe = NumberLine(x_range=[0, 8, 1], length=8.5, include_numbers=True,
                         label_constructor=Text, font_size=24, color=WHITE)
        axe.move_to([0, -1.5, 0])
        self.play(Create(axe))
        zone = Line(axe.n2p(0), axe.n2p(4), color=VERT_OK, stroke_width=9)
        crochet = Circle(radius=0.11, color=VERT_OK, stroke_width=4).move_to(axe.n2p(4))
        self.play(Create(zone), Create(crochet))

        self.play(Write(self.chute("Pas UNE solution : une INFINITÉ.", color=VERT_OK)))
        self.attendre_voix()

    # ── écran 3 : ⛔ le retournement, DÉMONTRÉ ──────────────────────────────

    def ecran_retournement(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-retournement")
        self.titre_ecran("L'exception : diviser par un NÉGATIF")

        # ⭐ On DÉMONTRE au lieu d'asséner : 2 < 5, et pourtant −2 > −5.
        preuve = Text("2 < 5", font_size=44, color=WHITE).move_to([-3.2, 1.55, 0])
        self.play(FadeIn(preuve))
        fl = Arrow([-2.1, 1.55, 0], [-0.3, 1.55, 0], buff=0.1,
                   color=ORANGE_RETENUE, stroke_width=4)
        lab = Text("× (−1)", font_size=26, color=ORANGE_RETENUE)
        lab.next_to(fl, UP, buff=0.1)
        self.play(Create(fl), FadeIn(lab))

        resultat = Text("−2 > −5", font_size=44, color=ROUGE_ERREUR).move_to([1.6, 1.55, 0])
        self.play(FadeIn(resultat, shift=RIGHT * 0.2))
        self.play(Flash(resultat, color=ROUGE_ERREUR, line_length=0.3))

        constat = Text("le sens a BASCULÉ", font_size=32, color=ROUGE_ERREUR)
        constat.move_to([0, 0.55, 0])
        self.play(Write(constat))
        self.wait(0.4)

        # L'application.
        app = VGroup(
            Text("−2x > 6", font_size=38, color=JAUNE_TITRE),
            Text("÷ (−2)", font_size=26, color=ORANGE_RETENUE),
            Text("x < −3", font_size=38, color=VERT_OK),
        ).arrange(RIGHT, buff=0.55).move_to([0, -0.75, 0])
        for m in app:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Circumscribe(app[2], color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("Le symbole a changé de sens.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 4 : inequation_intervalle ─────────────────────────────────────

    def ecran_intervalle(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-intervalle")
        self.titre_ecran("Écrire les solutions en intervalle")

        deux = VGroup(
            Text("x < 4", font_size=40, color=WHITE),
            Text("→", font_size=40, color=BLEU_CALCUL),
            Text("] −∞ ; 4 [", font_size=40, color=VERT_OK),
        ).arrange(RIGHT, buff=0.4).move_to([0, 1.85, 0])
        self.play(FadeIn(deux, shift=DOWN * 0.15))
        self.wait(0.4)

        regle1 = Text("le crochet est OUVERT du côté de l'infini — toujours",
                      font_size=28, color=ORANGE_RETENUE).move_to([0, 0.95, 0])
        self.play(Write(regle1))
        raison = Text("l'infini n'est pas un nombre", font_size=25, color=WHITE)
        raison.move_to([0, 0.4, 0])
        self.play(FadeIn(raison))

        # L'inégalité large ferme le crochet.
        large = VGroup(
            Text("x ≤ 4", font_size=40, color=WHITE),
            Text("→", font_size=40, color=BLEU_CALCUL),
            Text("] −∞ ; 4 ]", font_size=40, color=VERT_OK),
        ).arrange(RIGHT, buff=0.4).move_to([0, -0.75, 0])
        self.play(FadeIn(large, shift=UP * 0.15))
        self.play(Indicate(large[2], color=JAUNE_TITRE))

        self.play(Write(self.chute("Inégalité LARGE : le crochet se ferme sur le nombre.")))
        self.attendre_voix()

    # ── écran 5 : equation_probleme + comparer ──────────────────────────────

    def ecran_probleme(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-probleme")
        self.titre_ecran("Mettre un problème en équation")

        etapes = VGroup(
            Text("1.  Je NOMME l'inconnue", font_size=32, color=BLEU_CALCUL),
            Text("2.  Je TRADUIS la phrase en égalité", font_size=32, color=BLEU_CALCUL),
            Text("3.  Je RÉSOUS", font_size=32, color=BLEU_CALCUL),
            Text("4.  Je RÉPONDS par une phrase, avec l'unité", font_size=32, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to([0, 0.55, 0])
        for e in etapes:
            self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.5)

        self.play(Circumscribe(etapes[3], color=VERT_OK, buff=0.18))
        oubli = Text("c'est la quatrième qu'on oublie — et c'est un point",
                     font_size=27, color=ORANGE_RETENUE).move_to([0, -1.85, 0])
        self.play(Write(oubli))
        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        consigne = Text("Résous, et donne l'intervalle des solutions :",
                        font_size=30, color=WHITE).move_to([0, 1.9, 0])
        self.play(Write(consigne))

        expr = Text("3 − 2x ≥ 11", font_size=56, color=JAUNE_TITRE).move_to([0, 0.85, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.2))
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.3))

        indice = Text("Il y a un piège quelque part.", font_size=30, color=BLEU_CALCUL)
        indice.move_to([0, -0.6, 0])
        self.play(FadeIn(indice, shift=UP * 0.15))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-correction")
        self.titre_ecran("Correction")

        l1 = Text("3 − 2x ≥ 11", font_size=38, color=WHITE).move_to([-1.0, 2.05, 0])
        n1 = Text("− 3 des deux côtés", font_size=24, color=BLEU_CALCUL)
        n1.next_to(l1, RIGHT, buff=0.6)
        self.play(FadeIn(l1), FadeIn(n1))

        l2 = Text("−2x ≥ 8", font_size=38, color=WHITE).move_to([-1.0, 1.1, 0])
        n2 = Text("÷ (−2) … négatif !", font_size=24, color=ORANGE_RETENUE)
        n2.next_to(l2, RIGHT, buff=0.6)
        self.play(FadeIn(l2), FadeIn(n2))
        self.play(Indicate(n2, color=ORANGE_RETENUE))

        alerte = Text("le sens se RETOURNE", font_size=32, color=ROUGE_ERREUR)
        alerte.move_to([0, 0.25, 0])
        self.play(Write(alerte))

        l3 = Text("x ≤ −4", font_size=46, color=VERT_OK).move_to([0, -0.75, 0])
        self.play(FadeIn(l3, shift=UP * 0.15))
        self.play(Circumscribe(l3, color=VERT_OK, buff=0.2))

        inter = Text("] −∞ ; −4 ]", font_size=44, color=VERT_OK).move_to([0, -1.85, 0])
        self.play(FadeIn(inter, shift=UP * 0.15))

        self.play(Write(self.chute("Fermé sur −4 : l'inégalité était large.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Équations et inéquations",
            accroche="−2x > 6 : x est-il plus grand que −3 ?",
            promesse="Résoudre · retourner · écrire en intervalle",
        )
        self.page_objectifs([
            "résoudre une équation du premier degré",
            "résoudre une inéquation, et savoir quand le sens se retourne",
            "écrire les solutions sous forme d'intervalle",
        ])
        self.ecran_equation()
        self.ecran_inequation()
        self.ecran_retournement()
        self.ecran_intervalle()
        self.ecran_probleme()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "une équation : les mêmes gestes des deux côtés",
                "diviser par un NÉGATIF retourne le sens de l'inégalité",
                "les solutions s'écrivent en intervalle, ouvert côté infini",
            ],
            rappel="Dès que tu divises par un nombre négatif, retourne le symbole.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LES TROIS SHORTS
# ══════════════════════════════════════════════════════════════════════════════

class EquationsInequations2deShortRetournement(ShortSeconde):
    """L'ERREUR — micro `inequation_resoudre`, le piège du négatif."""

    dossier_voix = VOIX_RET

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        expr = self.grand("−2x > 6", font_size=88, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.15), run_time=0.45)
        q = self.grand("x > −3 ?", font_size=56, color=WHITE).move_to([0, 0.3, 0])
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_erreur(self):
        self.clear()
        self.margo_bas()
        self.dire("01-erreur")
        self.play(Write(Text("Le réflexe", font_size=34, color=ROUGE_ERREUR).move_to([0, 3.05, 0])))
        bloc = VGroup(
            Text("÷ (−2)", font_size=38, color=WHITE),
            Text("x > −3", font_size=48, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.5, 0])
        cadre = SurroundingRectangle(bloc, color=ROUGE_ERREUR, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        barre = Line(cadre.get_corner(DL), cadre.get_corner(UR),
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre))
        self.play(Write(Text("c'est FAUX", font_size=40, color=ROUGE_ERREUR).move_to([0, -0.85, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("02-pourquoi")
        self.play(Write(Text("Pourquoi ?", font_size=36, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        suite = VGroup(
            Text("2 < 5", font_size=54, color=WHITE),
            Text("× (−1)", font_size=32, color=ORANGE_RETENUE),
            Text("−2 > −5", font_size=54, color=VERT_OK),
        ).arrange(DOWN, buff=0.42).move_to([0, 1.4, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)
        self.play(Flash(suite[2], color=VERT_OK, line_length=0.35))
        self.play(Write(Text("le sens a basculé", font_size=34, color=JAUNE_TITRE).move_to([0, -1.1, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("03-regle")
        bloc = VGroup(
            Text("÷ ou × par", font_size=34, color=WHITE),
            Text("un NÉGATIF", font_size=44, color=ROUGE_ERREUR),
            Text("le sens", font_size=32, color=WHITE),
            Text("se RETOURNE", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.3, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.32, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.play(Flash(bloc[3], color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=0.4)

    def ecran_resultat(self):
        self.clear()
        self.margo_bas()
        self.dire("04-resultat")
        suite = VGroup(
            Text("−2x > 6", font_size=52, color=WHITE),
            Text("÷ (−2)", font_size=32, color=ORANGE_RETENUE),
            Text("x < −3", font_size=64, color=VERT_OK),
        ).arrange(DOWN, buff=0.4).move_to([0, 1.4, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Circumscribe(suite[2], color=VERT_OK, buff=0.22))
        self.play(Write(self.chute("INFÉRIEUR, pas supérieur.", color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_erreur()
        self.ecran_pourquoi()
        self.ecran_regle()
        self.ecran_resultat()
        self.ecran_renvoi()


class EquationsInequations2deShortBalance(ShortSeconde):
    """LE GESTE — micro `equation_resoudre`, la balance en trois temps."""

    dossier_voix = VOIX_BAL

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        expr = Text("5x − 3 = 12", font_size=72, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.15), run_time=0.45)
        q = Text("en 3 gestes", font_size=44, color=WHITE).move_to([0, 0.4, 0])
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_balance(self):
        self.clear()
        self.margo_bas()
        self.dire("01-balance")
        barre = Line([-1.6, 1.9, 0], [1.6, 1.9, 0], color=WHITE, stroke_width=5)
        pied = Polygon([-0.3, 1.35, 0], [0.3, 1.35, 0], [0, 1.9, 0],
                       color=WHITE, fill_opacity=0.3, stroke_width=3)
        pg = Rectangle(width=1.45, height=0.55, color=BLEU_CALCUL, fill_opacity=0.35,
                       stroke_width=3).move_to([-1.0, 2.25, 0])
        pd = Rectangle(width=1.45, height=0.55, color=VERT_OK, fill_opacity=0.35,
                       stroke_width=3).move_to([1.0, 2.25, 0])
        self.play(Create(barre), Create(pied), FadeIn(pg), FadeIn(pd))
        self.play(Write(Text("5x − 3", font_size=24, color=WHITE).move_to(pg.get_center())),
                  Write(Text("12", font_size=24, color=WHITE).move_to(pd.get_center())))
        note = VGroup(
            Text("ce que je fais", font_size=30, color=JAUNE_TITRE),
            Text("d'un côté,", font_size=30, color=JAUNE_TITRE),
            Text("je le fais de l'autre", font_size=30, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, 0.2, 0])
        self.play(FadeIn(note, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

    def ecran_geste1(self):
        self.clear()
        self.margo_bas()
        self.dire("02-geste1")
        self.play(Write(Text("Geste 1", font_size=36, color=JAUNE_TITRE).move_to([0, 3.05, 0])))
        suite = VGroup(
            Text("+ 3 des", font_size=34, color=ORANGE_RETENUE),
            Text("deux côtés", font_size=34, color=ORANGE_RETENUE),
            Text("5x = 15", font_size=56, color=VERT_OK),
        ).arrange(DOWN, buff=0.32).move_to([0, 1.4, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_geste2(self):
        self.clear()
        self.margo_bas()
        self.dire("03-geste2")
        self.play(Write(Text("Geste 2", font_size=36, color=JAUNE_TITRE).move_to([0, 3.05, 0])))
        suite = VGroup(
            Text("÷ 5 des", font_size=34, color=ORANGE_RETENUE),
            Text("deux côtés", font_size=34, color=ORANGE_RETENUE),
            Text("x = 3", font_size=68, color=VERT_OK),
        ).arrange(DOWN, buff=0.32).move_to([0, 1.4, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(suite[2], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_verifier(self):
        self.clear()
        self.margo_bas()
        self.dire("04-verifier")
        self.play(Write(Text("Geste 3", font_size=36, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        self.play(Write(Text("celui qu'on saute", font_size=28, color=ROUGE_ERREUR).move_to([0, 2.55, 0])))
        suite = VGroup(
            Text("5 × 3 − 3", font_size=42, color=WHITE),
            Text("= 15 − 3", font_size=38, color=WHITE),
            Text("= 12", font_size=52, color=VERT_OK),
        ).arrange(DOWN, buff=0.32).move_to([0, 0.9, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Write(self.chute("Je VÉRIFIE.", color=JAUNE_TITRE, font_size=30)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_balance()
        self.ecran_geste1()
        self.ecran_geste2()
        self.ecran_verifier()
        self.ecran_renvoi()


class EquationsInequations2deShortProbleme(ShortSeconde):
    """L'USAGE — micro `equation_probleme`, la méthode en quatre étapes."""

    dossier_voix = VOIX_PB

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            Text("Mettre un", font_size=44, color=JAUNE_TITRE),
            Text("problème", font_size=52, color=JAUNE_TITRE),
            Text("en équation", font_size=44, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.9, 0])
        self.play(FadeIn(t, shift=DOWN * 0.15), run_time=0.5)
        q = Text("4 étapes", font_size=48, color=WHITE).move_to([0, 0.1, 0])
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def _etape(self, voix, numero, titre, contenu, couleur=VERT_OK):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        self.play(Write(Text(f"Étape {numero}", font_size=36, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        self.play(Write(Text(titre, font_size=38, color=couleur).move_to([0, 2.4, 0])))
        bloc = VGroup(*[Text(l, font_size=30, color=WHITE) for l in contenu])
        bloc.arrange(DOWN, buff=0.3).move_to([0, 0.9, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self._etape("01-nommer", 1, "NOMMER",
                    ["soit x le nombre", "de places vendues", "", "pas « x » tout seul"], BLEU_CALCUL)
        self._etape("02-traduire", 2, "TRADUIRE",
                    ["« le double,", "augmenté de 5,", "vaut 23 »", "", "2x + 5 = 23"], BLEU_CALCUL)
        self._etape("03-resoudre", 3, "RÉSOUDRE",
                    ["2x = 18", "x = 9"], VERT_OK)
        self._etape("04-repondre", 4, "RÉPONDRE",
                    ["« Il y a 9 places", "vendues. »", "", "sans la phrase :", "un point en moins"], ORANGE_RETENUE)
        self.ecran_renvoi()
