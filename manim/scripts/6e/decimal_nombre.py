# decimal_nombre.py
# EleveAI — Maths 6e — Les nombres décimaux (notionId : decimal_nombre)
# Mêmes exemples que la fiche lib/fiches/maths-6e-decimaux.tsx.
#
# Mapping micro-compétences (banque decimaux.bank.ts) → écrans :
# - decimal_lire_ecrire        → écran 1 (tableau prolongé, 3,45) + écran 2 (25/10 → 2,5)
# - decimal_rang               → écran 1 (dixièmes, centièmes)
# - decimal_comparer           → écran 3 (2,5 vs 2,45, on ajoute un zéro)
# - decimal_additionner        → écran 4 (3,45 + 1,70 posé, virgules alignées)
# - decimal_multiplier         → écran 5 (2,5 × 6 en dixièmes)
# - decimal_diviser_par_entier → écran 5 (9,6 ÷ 3 en dixièmes)
# - decimal_defi               → défi + correction (intercaler entre 3,4 et 3,5)
#
# Rendu : python -m manim render -qh manim/scripts/6e/decimal_nombre.py DecimalNombre6e -o eleveai-maths-6e-decimal-nombre --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class DecimalNombre6e(Scene):

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
        """Écrit une chaîne caractère par caractère, alignée à droite sur xs."""
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
        titre = Text("Les nombres décimaux", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 6e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("2,5 ou 2,45 : lequel est le plus grand ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.wait(2.0)

    # ── écran 1 : le tableau prolongé après la virgule (3,45) ──────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. La virgule prolonge le tableau")

        cols = [-2.7, 0.6, 2.7]
        noms = ["Unités", "Dixièmes", "Centièmes"]
        chiffres = ["3", "4", "5"]
        valeurs = ["3", "0,4", "0,05"]

        entetes = VGroup()
        cases = VGroup()
        for x, nom in zip(cols, noms):
            entetes.add(VGroup(
                Rectangle(width=1.7, height=0.6, stroke_width=2, color=BLEU_CALCUL).move_to([x, 1.7, 0]),
                Text(nom, font_size=20, color=BLEU_CALCUL).move_to([x, 1.7, 0]),
            ))
            cases.add(Rectangle(width=1.7, height=1.0, stroke_width=2, color=WHITE).move_to([x, 0.8, 0]))
        virgule = Text(",", font_size=56, color=VERT_OK).move_to([-1.05, 0.65, 0])
        self.play(FadeIn(entetes), Create(cases), Write(virgule))

        chiffres_m = VGroup(*[Text(c, font_size=50).move_to([x, 0.8, 0]) for x, c in zip(cols, chiffres)])
        self.play(LaggedStart(*[Write(c) for c in chiffres_m], lag_ratio=0.2))
        self.wait(1.0)

        valeurs_m = VGroup(*[Text(v, font_size=28, color=VERT_OK).move_to([x, -0.5, 0]) for x, v in zip(cols, valeurs)])
        self.play(LaggedStart(*[Write(v) for v in valeurs_m], lag_ratio=0.2))
        self.wait(1.2)

        conclusion = Text("3,45 = 3 + 0,4 + 0,05", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : lire et écrire (25/10 → 2,5) ─────────────────────────────

    def ecran_ecrire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Lire et écrire")

        frac = Text("25/10", font_size=60, color=BLEU_CALCUL).move_to([0, 1.5, 0])
        self.play(Write(frac))
        self.wait(0.8)

        e1 = Text("= 25 dixièmes", font_size=34, color=WHITE).move_to([0, 0.6, 0])
        e2 = Text("= 2 unités et 5 dixièmes", font_size=34, color=WHITE).move_to([0, -0.1, 0])
        self.play(Write(e1))
        self.wait(0.8)
        self.play(Write(e2))
        self.wait(0.8)

        res = Text("= 2,5", font_size=54, color=VERT_OK).move_to([0, -1.1, 0])
        self.play(Write(res))
        self.wait(2.2)

    # ── écran 3 : comparer (2,5 vs 2,45) ───────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Comparer 2,5 et 2,45")

        astuce = Text("On ajoute un zéro : 2,5 = 2,50", font_size=30, color=ORANGE_RETENUE).move_to([0, 1.7, 0])
        self.play(Write(astuce))
        self.wait(1.0)

        xs = [-2.4, -1.7, -1.0, -0.3]
        n1 = self.digits("2,50", xs, 0.7, font_size=56)
        n2 = self.digits("2,45", xs, -0.3, font_size=56)
        self.play(FadeIn(n1), FadeIn(n2))
        self.wait(0.6)

        box = SurroundingRectangle(VGroup(n1[2], n2[2]), color=BLEU_CALCUL, buff=0.12)
        comp = Text("5 dixièmes > 4", font_size=30, color=BLEU_CALCUL).move_to([2.6, 0.2, 0])
        self.play(Create(box), Write(comp))
        self.wait(1.4)

        conclusion = Text("2,5 > 2,45", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(FadeOut(box), n1.animate.set_color(VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : additionner (3,45 + 1,70 = 5,15) ─────────────────────────

    def ecran_additionner(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Additionner")

        xs = [-2.9, -2.2, -1.5, -0.8]  # unité, virgule, dixième, centième
        haut = self.digits("3,45", xs, 1.15)
        bas = self.digits("1,70", xs, 0.35)
        plus = Text("+", font_size=54).move_to([-3.7, 0.35, 0])
        barre = Line([-4.0, -0.15, 0], [-0.4, -0.15, 0], stroke_width=3)
        self.play(FadeIn(haut), FadeIn(bas), FadeIn(plus), Create(barre))

        aligne = DashedLine([xs[1], 1.7, 0], [xs[1], -1.1, 0], color=ORANGE_RETENUE, stroke_width=3)
        regle = Text("Virgules alignées !", font_size=28, color=ORANGE_RETENUE).move_to([2.0, 1.3, 0])
        self.play(Create(aligne), Write(regle))
        self.wait(1.2)

        # centièmes : 5 + 0 = 5
        calc1 = Text("5 + 0 = 5", font_size=28, color=BLEU_CALCUL).move_to([2.0, 0.5, 0])
        r_c = Text("5", font_size=54).move_to([xs[3], -0.75, 0])
        self.play(FadeOut(regle), Write(calc1))
        self.play(Write(r_c))
        self.wait(0.8)

        # dixièmes : 4 + 7 = 11
        calc2 = Text("4 + 7 = 11", font_size=28, color=BLEU_CALCUL).move_to([2.0, -0.1, 0])
        r_d = Text("1", font_size=54).move_to([xs[2], -0.75, 0])
        retenue = Text("1", font_size=28, color=ORANGE_RETENUE).move_to([xs[0], 1.75, 0])
        self.play(Write(calc2))
        self.play(Write(r_d), Write(retenue))
        self.wait(0.8)

        # la virgule descend
        r_virg = Text(",", font_size=54, color=VERT_OK).move_to([xs[1], -0.85, 0])
        self.play(Write(r_virg))

        # unités : 3 + 1 + 1 = 5
        calc3 = Text("3 + 1 + 1 = 5", font_size=28, color=BLEU_CALCUL).move_to([2.0, -0.7, 0])
        r_u = Text("5", font_size=54).move_to([xs[0], -0.75, 0])
        self.play(Write(calc3))
        self.play(Write(r_u))
        self.wait(0.6)

        resultat = VGroup(r_u, r_virg, r_d, r_c)
        conclusion = Text("3,45 + 1,70 = 5,15", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(resultat.animate.set_color(VERT_OK), FadeOut(aligne), Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : multiplier et diviser (en dixièmes) ──────────────────────

    def ecran_calculer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Multiplier et diviser")

        astuce = Text("Astuce : penser en dixièmes", font_size=30, color=ORANGE_RETENUE).move_to([0, 2.0, 0])
        self.play(Write(astuce))
        self.wait(1.0)

        # multiplication — opération + résultat sur une ligne, détail dessous
        m1 = Text("2,5 × 6 = ", font_size=42, color=BLEU_CALCUL)
        m1r = Text("15", font_size=42, color=VERT_OK)
        ligne_m = VGroup(m1, m1r).arrange(RIGHT, buff=0.15).move_to([0, 0.9, 0])
        m_det = Text("25 dixièmes × 6 = 150 dixièmes", font_size=26, color=WHITE).move_to([0, 0.35, 0])
        self.play(Write(ligne_m))
        self.play(Write(m_det))
        self.wait(1.2)

        # division — même disposition
        d1 = Text("9,6 ÷ 3 = ", font_size=42, color=BLEU_CALCUL)
        d1r = Text("3,2", font_size=42, color=VERT_OK)
        ligne_d = VGroup(d1, d1r).arrange(RIGHT, buff=0.15).move_to([0, -0.7, 0])
        d_det = Text("96 dixièmes ÷ 3 = 32 dixièmes", font_size=26, color=WHITE).move_to([0, -1.25, 0])
        self.play(Write(ligne_d))
        self.play(Write(d_det))
        self.wait(2.2)

    # ── écran 6 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        q1 = Text("Trouve un nombre décimal", font_size=38, color=WHITE).move_to([0, 0.7, 0])
        q2 = Text("compris entre 3,4 et 3,5", font_size=38, color=BLEU_CALCUL).move_to([0, 0.0, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(titre))
        self.play(Write(q1))
        self.play(Write(q2))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction (3,40 < 3,45 < 3,50) ──────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("3,4 = 3,40   et   3,5 = 3,50", font_size=34, color=ORANGE_RETENUE).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(1.0)

        e2 = Text("Entre les deux : 3,45", font_size=36, color=WHITE).move_to([0, 0.3, 0])
        self.play(Write(e2))
        self.wait(1.0)

        conclusion = Text("3,40 < 3,45 < 3,50", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. La virgule prolonge le tableau de numération.", font_size=28),
            Text("2. Pour comparer ou poser : on ajoute des zéros.", font_size=28),
            Text("3. Additionner : virgule sous virgule.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_tableau()
        self.ecran_ecrire()
        self.ecran_comparer()
        self.ecran_additionner()
        self.ecran_calculer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
