# expressions_litterales_2de.py
# EleveAI — Maths seconde — Les expressions littérales
# (notionId : expressions_litterales_2de)
#
# ⭐ 21/09/2026 : la leçon paysage qui manquait, faite « pour faire le lien »
# (Frédéric). La fiche de cours existe depuis le 10/09/2026
# (`lib/fiches/maths-seconde-expressions.tsx`) ; la feuille d'exercices est en
# ligne depuis le 21/09. Mêmes exemples que la FICHE : « le triple de x augmenté
# de 2 », x² − 4x pour x = −3, U = RI, le programme « × 5, + 10, ÷ 5 »,
# (x + 3)² = x² + 9 ? ; le défi est son exercice du programme « + 5, × 3, − 15 ».
#
# ⭐ LE FIL DE LA FICHE, ASYMÉTRIQUE : pour RÉFUTER, un seul contre-exemple
# suffit ; pour DÉMONTRER, aucun nombre d'exemples ne suffit — il faut la lettre.
#
# Briques communes : `manim/gabarit_seconde.py`.
#
# Mapping micro-compétences (3 micros, TOUS couverts) → écrans :
# - expr_modeliser          → écran 1 (deux phrases voisines), écran 5 (programme)
# - expr_reduire_substituer → écrans 2 et 3 (réduire, remplacer un négatif), 6
# - expr_exprimer_variable  → écran 4 (retourner une formule)
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/expressions_litterales_2de.py Expressions2de -o eleveai-maths-seconde-expressions-litterales --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde

VOIX = SONS / "seconde-expressions-litterales"


class Expressions2de(NotionSeconde):

    dossier_voix = VOIX

    def empiler(self, textes, y=0.6, buff=0.35, font_size=36, couleurs=None):
        couleurs = couleurs or [WHITE] * len(textes)
        g = VGroup(*[Text(t, font_size=font_size, color=c) for t, c in zip(textes, couleurs)])
        return g.arrange(DOWN, buff=buff).move_to([0, y, 0])

    # ── écran 1 : traduire ──────────────────────────────────────────────────

    def ecran_traduire(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-traduire")
        self.titre_ecran("Deux phrases voisines")

        p1 = Text("« le triple de x, augmenté de 2 »", font_size=30, color=WHITE).move_to([-2.6, 1.7, 0])
        e1 = Text("3x + 2", font_size=46, color=BLEU_CALCUL).move_to([3.6, 1.7, 0])
        p2 = Text("« le triple de la somme de x et 2 »", font_size=30, color=WHITE).move_to([-2.6, 0.5, 0])
        e2 = Text("3(x + 2)", font_size=46, color=VERT_OK).move_to([3.6, 0.5, 0])
        self.play(FadeIn(p1), FadeIn(e1, shift=LEFT * 0.2))
        self.play(FadeIn(p2), FadeIn(e2, shift=LEFT * 0.2))

        test = Text("pour x = 10 :   32   et   36", font_size=32, color=ORANGE_RETENUE).move_to([0, -0.8, 0])
        self.play(Write(test))
        self.play(Write(self.chute("Les parenthèses disent sur quoi porte le mot.")))
        self.attendre_voix()

    # ── écran 2 : réduire ───────────────────────────────────────────────────

    def ecran_reduire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-reduire")
        self.titre_ecran("Réduire : regrouper les semblables")

        l0 = Text("4x + 3 − x + 2", font_size=48, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(l0))
        l1 = Text("4x − x   et   3 + 2", font_size=38, color=WHITE).move_to([0, 0.8, 0])
        l2 = Text("= 3x + 5", font_size=48, color=VERT_OK).move_to([0, -0.2, 0])
        self.play(FadeIn(l1, shift=UP * 0.12))
        self.play(FadeIn(l2, shift=UP * 0.12))
        faux = Text("3x + 5 = 8x", font_size=36, color=ROUGE_ERREUR).move_to([0, -1.35, 0])
        barre = Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(faux))
        self.play(Create(barre))
        self.play(Write(self.chute("Un terme en x et un nombre ne se regroupent jamais.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 3 : ⛔ substituer un négatif ───────────────────────────────────

    def ecran_substituer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-substituer")
        self.titre_ecran("Remplacer x par −3")

        l0 = Text("x² − 4x   pour   x = −3", font_size=42, color=JAUNE_TITRE).move_to([0, 2.0, 0])
        self.play(FadeIn(l0))
        juste = self.empiler(["(−3)² − 4 × (−3)", "= 9 + 12", "= 21"], y=0.3, font_size=38,
                             couleurs=[WHITE, WHITE, VERT_OK]).shift(LEFT * 2.8)
        faux = self.empiler(["−3² − 4 × −3", "= −9 …", "FAUX"], y=0.3, font_size=34,
                            couleurs=[ROUGE_ERREUR, ROUGE_ERREUR, ROUGE_ERREUR]).shift(RIGHT * 3.2)
        for m in juste:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)
        self.play(FadeIn(faux))
        self.play(Circumscribe(juste[2], color=VERT_OK, buff=0.15))
        self.play(Write(self.chute("Un nombre négatif se remplace ENTRE PARENTHÈSES.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 4 : retourner une formule ─────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-formule")
        self.titre_ecran("Retourner une formule")

        lignes = self.empiler(["U = R × I", "÷ R des deux côtés", "I = U ÷ R"], y=0.9, font_size=42,
                              couleurs=[JAUNE_TITRE, BLEU_CALCUL, VERT_OK])
        for m in lignes:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.55)
        autre = Text("de même :  d = v × t   donne   t = d ÷ v", font_size=30, color=WHITE).move_to([0, -1.3, 0])
        self.play(FadeIn(autre, shift=UP * 0.12))
        self.play(Write(self.chute("Les gestes d'une équation, avec des lettres.")))
        self.attendre_voix()

    # ── écran 5 : un programme de calcul ────────────────────────────────────

    def ecran_programme(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-programme")
        self.titre_ecran("Un programme de calcul")

        prog = Text("× 5,  puis + 10,  puis ÷ 5", font_size=36, color=JAUNE_TITRE).move_to([0, 2.05, 0])
        self.play(FadeIn(prog))
        essais = Text("3 → 5        10 → 12", font_size=34, color=WHITE).move_to([0, 1.1, 0])
        self.play(FadeIn(essais))
        chemin = Text("x  →  5x  →  5x + 10  →  (5x + 10) ÷ 5", font_size=32, color=BLEU_CALCUL).move_to([0, 0.05, 0])
        self.play(Write(chemin))
        res = Text("= x + 2", font_size=50, color=VERT_OK).move_to([0, -1.0, 0])
        self.play(FadeIn(res, shift=UP * 0.12))
        self.play(Circumscribe(res, color=VERT_OK, buff=0.15))
        self.play(Write(self.chute("Le résultat, c'est TOUJOURS le nombre de départ plus 2.")))
        self.attendre_voix()

    # ── écran 6 : ⭐ prouver ou réfuter ──────────────────────────────────────

    def ecran_prouver(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-prouver")
        self.titre_ecran("Prouver, ou réfuter")

        q = Text("(x + 3)² = x² + 9   pour tout x ?", font_size=40, color=JAUNE_TITRE).move_to([0, 2.05, 0])
        self.play(FadeIn(q))
        contre = self.empiler(["avec x = 1 :", "(1 + 3)² = 16", "1² + 9 = 10"], y=0.4, font_size=34,
                              couleurs=[WHITE, WHITE, ROUGE_ERREUR]).shift(LEFT * 3.0)
        for m in contre:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)
        verdict = self.empiler(["FAUX :", "un seul exemple", "suffit à réfuter"], y=0.4, font_size=32,
                               couleurs=[ROUGE_ERREUR, WHITE, WHITE]).shift(RIGHT * 3.0)
        self.play(FadeIn(verdict))
        preuve = Text("Pour PROUVER, aucun exemple ne suffit : il faut la lettre.",
                      font_size=30, color=VERT_OK).move_to([0, -1.55, 0])
        self.play(Write(preuve))
        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))
        prog = self.empiler(["Choisir un nombre.", "Ajouter 5.", "Multiplier par 3.", "Retirer 15."],
                            y=0.9, font_size=36, couleurs=[WHITE, WHITE, WHITE, WHITE])
        for m in prog:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.play(FadeIn(Text("Que peut-on affirmer ? Démontre-le.", font_size=32,
                              color=BLEU_CALCUL).move_to([0, -1.3, 0]), shift=UP * 0.15))
        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")
        lignes = self.empiler(["x  →  x + 5  →  3(x + 5)  →  3(x + 5) − 15",
                               "= 3x + 15 − 15", "= 3x"], y=0.9, font_size=36,
                              couleurs=[BLEU_CALCUL, WHITE, VERT_OK])
        for m in lignes:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.55)
        self.play(Circumscribe(lignes[2], color=VERT_OK, buff=0.15))
        self.play(Write(self.chute("On obtient toujours le triple du nombre de départ.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Les expressions littérales",
            accroche="Ça marche pour 1, 2 et 3 : c'est prouvé ?",
            promesse="Traduire · remplacer · prouver",
        )
        self.page_objectifs([
            "traduire une phrase en expression, et la réduire",
            "remplacer une lettre par un nombre, même négatif",
            "prouver avec une lettre, réfuter avec un exemple",
        ])
        self.ecran_traduire()
        self.ecran_reduire()
        self.ecran_substituer()
        self.ecran_formule()
        self.ecran_programme()
        self.ecran_prouver()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "traduire : les parenthèses disent sur quoi porte le mot",
                "remplacer un négatif : toujours entre parenthèses",
                "réfuter : un exemple suffit ; prouver : il faut la lettre",
            ],
            rappel="Trois exemples qui marchent ne prouvent rien. Un seul qui rate réfute.",
        )
        self.page_abonnement()
