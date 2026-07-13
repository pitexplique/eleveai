# entier_nombre.py
# EleveAI — Maths 6e — Les nombres entiers (notionId : entier_nombre)
# Mêmes exemples que la fiche lib/fiches/maths-6e-entiers.tsx.
#
# Mapping micro-compétences (banque entiers.bank.ts) → écrans :
# - entier_lire_ecrire  → écran 1 (tableau de numération) + écran 2 (« mille quarante-deux » → 1 042)
# - entier_rang         → écran 1 (chaque chiffre à son rang) + écran 2 (chiffre des dizaines)
# - entier_decomposer   → écran 1 (4 273 = 4 000 + 200 + 70 + 3)
# - entier_comparer     → écran 3 (345 vs 354, on compare les dizaines)
# - entier_encadrer     → écran 4 (droite graduée : 40 < 47 < 50)
# - entier_defi         → défi + correction (plus petit nombre avec 3, 0, 5, 1)
#
# Rendu : python -m manim render -qh manim/scripts/6e/entier_nombre.py EntierNombre6e -o eleveai-maths-6e-entier-nombre --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class EntierNombre6e(Scene):

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
        titre = Text("Les nombres entiers", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 6e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("Dans 4 273, que vaut le 2 ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.wait(2.0)

    # ── écran 1 : le tableau de numération (4 273) ─────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le tableau de numération")

        cols = [-3.3, -1.1, 1.1, 3.3]
        noms = ["Milliers", "Centaines", "Dizaines", "Unités"]
        chiffres = ["4", "2", "7", "3"]
        valeurs = ["4 000", "200", "70", "3"]

        entetes = VGroup()
        cases = VGroup()
        for x, nom in zip(cols, noms):
            cell_h = Rectangle(width=2.0, height=0.6, stroke_width=2, color=BLEU_CALCUL).move_to([x, 1.7, 0])
            lbl = Text(nom, font_size=20, color=BLEU_CALCUL).move_to([x, 1.7, 0])
            entetes.add(VGroup(cell_h, lbl))
            cases.add(Rectangle(width=2.0, height=1.0, stroke_width=2, color=WHITE).move_to([x, 0.8, 0]))
        self.play(FadeIn(entetes), Create(cases))

        chiffres_m = VGroup(*[Text(c, font_size=52).move_to([x, 0.8, 0]) for x, c in zip(cols, chiffres)])
        self.play(LaggedStart(*[Write(c) for c in chiffres_m], lag_ratio=0.2))
        self.wait(1.0)

        valeurs_m = VGroup(*[Text(v, font_size=30, color=VERT_OK).move_to([x, -0.4, 0]) for x, v in zip(cols, valeurs)])
        self.play(LaggedStart(*[Write(v) for v in valeurs_m], lag_ratio=0.2))
        self.wait(1.2)

        conclusion = Text("4 273 = 4 000 + 200 + 70 + 3", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : lire et écrire (« mille quarante-deux » → 1 042) ─────────

    def ecran_ecrire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Lire et écrire")

        mots = Text("« mille quarante-deux »", font_size=36, color=BLEU_CALCUL).move_to([0, 1.6, 0])
        self.play(Write(mots))
        self.wait(1.0)

        fleche = Arrow([0, 1.15, 0], [0, 0.45, 0], color=WHITE, buff=0.1)
        self.play(Create(fleche))

        xs = [-1.2, -0.5, 0.2, 0.9]
        nombre = self.digits("1042", xs, -0.35, font_size=64)
        self.play(FadeIn(nombre))
        self.wait(0.8)

        zero_box = SurroundingRectangle(nombre[1], color=ORANGE_RETENUE, buff=0.12)
        zero_txt = Text("un zéro aux centaines", font_size=26, color=ORANGE_RETENUE).move_to([0, -1.6, 0])
        self.play(Create(zero_box), Write(zero_txt))
        self.wait(1.4)

        diz_box = SurroundingRectangle(nombre[2], color=VERT_OK, buff=0.12)
        diz_txt = Text("chiffre des dizaines : 4", font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(FadeOut(zero_box), FadeOut(zero_txt), Create(diz_box), Write(diz_txt))
        self.wait(2.2)

    # ── écran 3 : comparer (345 vs 354) ────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Comparer deux nombres")

        xs = [-2.2, -1.5, -0.8]
        n1 = self.digits("345", xs, 1.0, font_size=56)
        n2 = self.digits("354", xs, 0.0, font_size=56)
        self.play(FadeIn(n1), FadeIn(n2))
        self.wait(0.8)

        box = SurroundingRectangle(VGroup(n1[0], n2[0]), color=BLEU_CALCUL, buff=0.12)
        egal = Text("3 = 3 : on continue", font_size=28, color=BLEU_CALCUL).move_to([2.2, 0.9, 0])
        self.play(Create(box), Write(egal))
        self.wait(1.2)

        box_d = SurroundingRectangle(VGroup(n1[1], n2[1]), color=ORANGE_RETENUE, buff=0.12)
        comp = Text("5 > 4", font_size=36, color=ORANGE_RETENUE).move_to([2.2, 0.15, 0])
        self.play(Transform(box, box_d), FadeOut(egal), Write(comp))
        self.wait(1.2)

        conclusion = Text("354 > 345", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(FadeOut(box), n2.animate.set_color(VERT_OK), Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : encadrer (droite graduée, 40 < 47 < 50) ──────────────────

    def ecran_encadrer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Encadrer un nombre")

        x0, x1, y = -4.5, 4.5, 0.0
        axe = Line([x0, y, 0], [x1, y, 0], stroke_width=3)
        ticks = VGroup()
        labels = VGroup()
        for i in range(11):
            tx = x0 + (x1 - x0) * i / 10
            ticks.add(Line([tx, y - 0.12, 0], [tx, y + 0.12, 0], stroke_width=2))
            if i in (0, 10):
                labels.add(Text(str(40 + i), font_size=30, color=WHITE).move_to([tx, y - 0.55, 0]))
        self.play(Create(axe), Create(ticks), Write(labels))
        self.wait(0.8)

        tx47 = x0 + (x1 - x0) * 7 / 10
        dot = Dot([tx47, y, 0], color=VERT_OK, radius=0.13)
        lbl47 = Text("47", font_size=34, color=VERT_OK).move_to([tx47, y + 0.7, 0])
        self.play(FadeIn(dot, scale=0.5), Write(lbl47))
        self.wait(1.2)

        conclusion = Text("40 < 47 < 50", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        q1 = Text("Avec les chiffres 3, 0, 5 et 1", font_size=36, color=WHITE).move_to([0, 0.9, 0])
        q2 = Text("(chacun une seule fois)", font_size=28, color=WHITE).move_to([0, 0.35, 0])
        q3 = Text("le plus PETIT nombre de 4 chiffres ?", font_size=34, color=BLEU_CALCUL).move_to([0, -0.45, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(titre))
        self.play(Write(q1), Write(q2))
        self.play(Write(q3))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction (1 035) ────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        regle = Text("Un nombre ne commence pas par 0.", font_size=30, color=ROUGE_ERREUR).move_to([0, 1.6, 0])
        self.play(Write(regle))
        self.wait(1.2)

        xs = [-1.6, -0.9, -0.2, 0.5]
        chiffres = ["1", "0", "3", "5"]
        indices = [
            "le plus petit non nul",
            "puis 0",
            "puis 3",
            "puis 5",
        ]
        chiffres_m = VGroup(*[Text(c, font_size=60, color=VERT_OK).move_to([xs[i], 0.1, 0]) for i, c in enumerate(chiffres)])
        note = Text("", font_size=26, color=ORANGE_RETENUE).move_to([0, -1.1, 0])
        for i, c in enumerate(chiffres_m):
            nouvelle = Text(indices[i], font_size=26, color=ORANGE_RETENUE).move_to([0, -1.1, 0])
            self.play(Write(c), Transform(note, nouvelle), run_time=0.7)
        self.wait(1.0)

        conclusion = Text("Réponse : 1 035", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. La position donne la valeur.", font_size=30),
            Text("2. Je compare de gauche à droite.", font_size=30),
            Text("3. J'encadre entre deux nombres ronds.", font_size=30),
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
        self.ecran_encadrer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
