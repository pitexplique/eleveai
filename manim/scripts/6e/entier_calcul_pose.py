# entier_calcul_pose.py
# EleveAI — Maths 6e — Le calcul posé (notionId : entier_calcul_pose)
# Mêmes exemples que la fiche lib/fiches/maths-6e-calcul-pose.tsx.
#
# Mapping micro-compétences (banque calcul-pose.bank.ts) → écrans :
# - entier_addition_posee        → écran 1 (475 + 286) + défi/correction (348 + 275)
# - entier_soustraction_posee    → écran 2 (632 − 458, méthode « je casse »)
# - entier_multiplication_posee  → écran 3 (267 × 4)
# - entier_division_posee        → écran 4 (58 ÷ 7, potence)
# - entier_calcul_verifier       → vérifications vertes (écrans 2 et 4) + à retenir
# - entier_calcul_pose_defi      → défi + correction
#
# Rendu : python -m manim render -qh manim/scripts/6e/entier_calcul_pose.py EntierCalculPose6e --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class EntierCalculPose6e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def digits(self, chaine, xs, y, color=WHITE, font_size=54):
        """Écrit un nombre chiffre par chiffre, aligné à droite sur les colonnes xs."""
        rangee = VGroup()
        decalage = len(xs) - len(chaine)
        for i, caractere in enumerate(chaine):
            rangee.add(
                Text(caractere, font_size=font_size, color=color)
                .move_to([xs[decalage + i], y, 0])
            )
        return rangee

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Le calcul posé", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 6e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("475 + 286, sans calculatrice ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.wait(2.0)

    # ── écran 1 : addition posée (475 + 286 = 761) ─────────────────────────

    def ecran_addition(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. L'addition posée")

        xs = [-2.9, -2.2, -1.5]
        haut = self.digits("475", xs, 1.15)
        bas = self.digits("286", xs, 0.35)
        plus = Text("+", font_size=54).move_to([-3.7, 0.35, 0])
        barre = Line([-4.0, -0.15, 0], [-1.1, -0.15, 0], stroke_width=3)
        self.play(FadeIn(haut), FadeIn(bas), FadeIn(plus), Create(barre))

        regle = Text("Unités sous unités !", font_size=28, color=BLEU_CALCUL)
        regle.move_to([1.8, 1.4, 0])
        self.play(Write(regle))
        self.wait(1.4)

        # unités : 5 + 6 = 11
        cadre = SurroundingRectangle(VGroup(haut[2], bas[2]), color=BLEU_CALCUL, buff=0.18)
        calc1 = Text("5 + 6 = 11", font_size=30, color=BLEU_CALCUL).move_to([1.8, 0.5, 0])
        self.play(Create(cadre), FadeOut(regle))
        self.play(Write(calc1))
        r_unites = Text("1", font_size=54).move_to([xs[2], -0.75, 0])
        retenue1 = Text("1", font_size=28, color=ORANGE_RETENUE).move_to([xs[1], 1.75, 0])
        self.play(Write(r_unites), Write(retenue1))
        self.wait(1.2)

        # dizaines : 7 + 8 + 1 = 16
        cadre2 = SurroundingRectangle(
            VGroup(retenue1, haut[1], bas[1]), color=BLEU_CALCUL, buff=0.18
        )
        calc2 = Text("7 + 8 + 1 = 16", font_size=30, color=BLEU_CALCUL).move_to([1.8, -0.1, 0])
        self.play(Transform(cadre, cadre2), Write(calc2))
        r_dizaines = Text("6", font_size=54).move_to([xs[1], -0.75, 0])
        retenue2 = Text("1", font_size=28, color=ORANGE_RETENUE).move_to([xs[0], 1.75, 0])
        self.play(Write(r_dizaines), Write(retenue2))
        self.wait(1.2)

        # centaines : 4 + 2 + 1 = 7
        cadre3 = SurroundingRectangle(
            VGroup(retenue2, haut[0], bas[0]), color=BLEU_CALCUL, buff=0.18
        )
        calc3 = Text("4 + 2 + 1 = 7", font_size=30, color=BLEU_CALCUL).move_to([1.8, -0.7, 0])
        self.play(Transform(cadre, cadre3), Write(calc3))
        r_centaines = Text("7", font_size=54).move_to([xs[0], -0.75, 0])
        self.play(Write(r_centaines))
        self.wait(0.6)

        resultat = VGroup(r_centaines, r_dizaines, r_unites)
        conclusion = Text("475 + 286 = 761", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(FadeOut(cadre), resultat.animate.set_color(VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : soustraction posée (632 − 458 = 174) ─────────────────────

    def ecran_soustraction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. La soustraction posée")

        xs = [-2.9, -2.2, -1.5]
        haut = self.digits("632", xs, 1.15)
        bas = self.digits("458", xs, 0.35)
        moins = Text("−", font_size=54).move_to([-3.7, 0.35, 0])
        barre = Line([-4.0, -0.15, 0], [-1.1, -0.15, 0], stroke_width=3)
        self.play(FadeIn(haut), FadeIn(bas), FadeIn(moins), Create(barre))
        self.wait(0.8)

        # unités : 2 − 8 impossible → on casse une dizaine
        cadre = SurroundingRectangle(VGroup(haut[2], bas[2]), color=BLEU_CALCUL, buff=0.18)
        impossible = Text("2 − 8 : impossible !", font_size=30, color=ROUGE_ERREUR)
        impossible.move_to([1.9, 1.4, 0])
        self.play(Create(cadre), Write(impossible))
        self.wait(1.2)

        casse = Text("Je casse une dizaine.", font_size=28, color=ORANGE_RETENUE)
        casse.move_to([1.9, 0.85, 0])
        petit1_u = Text("1", font_size=26, color=ORANGE_RETENUE).move_to([xs[2] - 0.24, 1.32, 0])
        croix3 = Cross(haut[1], stroke_color=ORANGE_RETENUE, stroke_width=4).scale(1.2)
        nouveau2 = Text("2", font_size=30, color=ORANGE_RETENUE).move_to([xs[1], 1.78, 0])
        self.play(Write(casse))
        self.play(Write(petit1_u), Create(croix3), Write(nouveau2))
        calc1 = Text("12 − 8 = 4", font_size=30, color=BLEU_CALCUL).move_to([1.9, 0.3, 0])
        r_unites = Text("4", font_size=54).move_to([xs[2], -0.75, 0])
        self.play(FadeOut(impossible), FadeOut(casse), Write(calc1))
        self.play(Write(r_unites))
        self.wait(1.4)

        # dizaines : 2 − 5 impossible → on casse une centaine
        cadre2 = SurroundingRectangle(VGroup(nouveau2, bas[1]), color=BLEU_CALCUL, buff=0.18)
        petit1_d = Text("1", font_size=22, color=ORANGE_RETENUE).move_to([xs[1] - 0.2, 1.92, 0])
        croix6 = Cross(haut[0], stroke_color=ORANGE_RETENUE, stroke_width=4).scale(1.2)
        nouveau5 = Text("5", font_size=30, color=ORANGE_RETENUE).move_to([xs[0], 1.78, 0])
        calc2 = Text("12 − 5 = 7", font_size=30, color=BLEU_CALCUL).move_to([1.9, -0.25, 0])
        self.play(Transform(cadre, cadre2))
        self.play(Write(petit1_d), Create(croix6), Write(nouveau5))
        self.play(Write(calc2))
        r_dizaines = Text("7", font_size=54).move_to([xs[1], -0.75, 0])
        self.play(Write(r_dizaines))
        self.wait(1.4)

        # centaines : 5 − 4 = 1
        cadre3 = SurroundingRectangle(VGroup(nouveau5, bas[0]), color=BLEU_CALCUL, buff=0.18)
        calc3 = Text("5 − 4 = 1", font_size=30, color=BLEU_CALCUL).move_to([1.9, -0.8, 0])
        self.play(Transform(cadre, cadre3), Write(calc3))
        r_centaines = Text("1", font_size=54).move_to([xs[0], -0.75, 0])
        self.play(Write(r_centaines))
        self.wait(0.6)

        resultat = VGroup(r_centaines, r_dizaines, r_unites)
        verif = Text("Vérif : 174 + 458 = 632 ✔", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(FadeOut(cadre), resultat.animate.set_color(VERT_OK), Write(verif))
        self.wait(2.2)

    # ── écran 3 : multiplication posée (267 × 4 = 1 068) ───────────────────

    def ecran_multiplication(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La multiplication posée")

        xs = [-3.6, -2.9, -2.2, -1.5]
        haut = self.digits("267", xs, 1.15)
        bas = self.digits("4", xs, 0.35)
        fois = Text("×", font_size=54).move_to([-4.2, 0.35, 0])
        barre = Line([-4.5, -0.15, 0], [-1.1, -0.15, 0], stroke_width=3)
        self.play(FadeIn(haut), FadeIn(bas), FadeIn(fois), Create(barre))
        self.wait(0.8)

        # 7 × 4 = 28
        calc1 = Text("7 × 4 = 28", font_size=30, color=BLEU_CALCUL).move_to([1.9, 0.9, 0])
        r_unites = Text("8", font_size=54).move_to([xs[3], -0.75, 0])
        retenue1 = Text("2", font_size=28, color=ORANGE_RETENUE).move_to([xs[2], 1.75, 0])
        self.play(Write(calc1))
        self.play(Write(r_unites), Write(retenue1))
        self.wait(1.2)

        # 6 × 4 + 2 = 26
        calc2 = Text("6 × 4 = 24, + 2 = 26", font_size=30, color=BLEU_CALCUL).move_to([1.9, 0.3, 0])
        r_dizaines = Text("6", font_size=54).move_to([xs[2], -0.75, 0])
        retenue2 = Text("2", font_size=28, color=ORANGE_RETENUE).move_to([xs[1], 1.75, 0])
        self.play(Write(calc2))
        self.play(Write(r_dizaines), Write(retenue2))
        self.wait(1.2)

        # 2 × 4 + 2 = 10
        calc3 = Text("2 × 4 = 8, + 2 = 10", font_size=30, color=BLEU_CALCUL).move_to([1.9, -0.3, 0])
        r_centaines = Text("0", font_size=54).move_to([xs[1], -0.75, 0])
        r_milliers = Text("1", font_size=54).move_to([xs[0], -0.75, 0])
        self.play(Write(calc3))
        self.play(Write(r_centaines), Write(r_milliers))
        self.wait(0.6)

        resultat = VGroup(r_milliers, r_centaines, r_dizaines, r_unites)
        conclusion = Text("267 × 4 = 1 068", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(resultat.animate.set_color(VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : division posée (58 ÷ 7 → quotient 8, reste 2) ────────────

    def ecran_division(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. La division posée")

        dividende = Text("58", font_size=54).move_to([-2.6, 0.9, 0])
        potence_v = Line([-1.7, 1.45, 0], [-1.7, -0.9, 0], stroke_width=3)
        diviseur = Text("7", font_size=54).move_to([-1.15, 0.9, 0])
        potence_h = Line([-1.7, 0.45, 0], [-0.5, 0.45, 0], stroke_width=3)
        self.play(FadeIn(dividende), Create(potence_v), FadeIn(diviseur), Create(potence_h))
        self.wait(0.8)

        question = Text("Dans 58, combien de fois 7 ?", font_size=28, color=BLEU_CALCUL)
        question.move_to([1.9, 1.3, 0])
        self.play(Write(question))
        self.wait(1.2)

        calc = Text("7 × 8 = 56", font_size=30, color=BLEU_CALCUL).move_to([1.9, 0.7, 0])
        quotient = Text("8", font_size=54, color=VERT_OK).move_to([-1.15, -0.05, 0])
        self.play(Write(calc))
        self.play(Write(quotient))
        self.wait(1.0)

        moins56 = Text("− 56", font_size=40).move_to([-2.75, 0.15, 0])
        petite_barre = Line([-3.2, -0.25, 0], [-2.0, -0.25, 0], stroke_width=3)
        reste = Text("2", font_size=48, color=ORANGE_RETENUE).move_to([-2.35, -0.7, 0])
        self.play(Write(moins56), Create(petite_barre))
        self.play(Write(reste))
        petit = Text("Le reste 2 est plus petit que 7 ✔", font_size=26, color=ORANGE_RETENUE)
        petit.move_to([1.9, 0.0, 0])
        self.play(Write(petit))
        self.wait(1.2)

        verif = Text("Vérif : 7 × 8 + 2 = 58 ✔", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(verif))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        question = Text("Pose et calcule : 348 + 275", font_size=38, color=WHITE)
        question.move_to([0, 0.5, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE)
        pause.to_edge(DOWN)
        self.play(Write(titre))
        self.play(Write(question))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction du défi (348 + 275 = 623) ─────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        xs = [-2.9, -2.2, -1.5]
        haut = self.digits("348", xs, 1.15)
        bas = self.digits("275", xs, 0.35)
        plus = Text("+", font_size=54).move_to([-3.7, 0.35, 0])
        barre = Line([-4.0, -0.15, 0], [-1.1, -0.15, 0], stroke_width=3)
        self.play(FadeIn(haut), FadeIn(bas), FadeIn(plus), Create(barre))

        calc1 = Text("8 + 5 = 13", font_size=28, color=BLEU_CALCUL).move_to([1.9, 1.0, 0])
        calc2 = Text("4 + 7 + 1 = 12", font_size=28, color=BLEU_CALCUL).move_to([1.9, 0.45, 0])
        calc3 = Text("3 + 2 + 1 = 6", font_size=28, color=BLEU_CALCUL).move_to([1.9, -0.1, 0])

        retenue1 = Text("1", font_size=28, color=ORANGE_RETENUE).move_to([xs[1], 1.75, 0])
        retenue2 = Text("1", font_size=28, color=ORANGE_RETENUE).move_to([xs[0], 1.75, 0])
        r_unites = Text("3", font_size=54).move_to([xs[2], -0.75, 0])
        r_dizaines = Text("2", font_size=54).move_to([xs[1], -0.75, 0])
        r_centaines = Text("6", font_size=54).move_to([xs[0], -0.75, 0])

        self.play(Write(calc1))
        self.play(Write(r_unites), Write(retenue1))
        self.wait(0.8)
        self.play(Write(calc2))
        self.play(Write(r_dizaines), Write(retenue2))
        self.wait(0.8)
        self.play(Write(calc3))
        self.play(Write(r_centaines))
        self.wait(0.6)

        resultat = VGroup(r_centaines, r_dizaines, r_unites)
        conclusion = Text("348 + 275 = 623", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(resultat.animate.set_color(VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. J'aligne : unités sous unités.", font_size=30),
            Text("2. Je calcule de droite à gauche, avec les retenues.", font_size=30),
            Text("3. Je vérifie avec l'opération inverse.", font_size=30),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_addition()
        self.ecran_soustraction()
        self.ecran_multiplication()
        self.ecran_division()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
