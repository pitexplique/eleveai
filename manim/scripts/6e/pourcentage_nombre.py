# pourcentage_nombre.py
# EleveAI — Maths 6e — Les pourcentages (notionId : pourcentage_nombre)
# Mêmes exemples que la fiche lib/fiches/maths-6e-pourcentages.tsx.
#
# Mapping micro-compétences (banque pourcentages.bank.ts) → écrans :
# - pourcentage_comprendre    → écran 1 (grille 100, 25 coloriés = 25 %)
# - pourcentage_lire          → écran 1 + écran 3 (repères)
# - pourcentage_fraction      → écran 2 (25 % = 25/100 = 1/4)
# - pourcentage_decimal       → écran 2 (= 0,25)
# - pourcentage_calcul_simple → écran 3 (repères) + écran 4 (10 % de 60, 50 % de 18)
# - pourcentage_defi          → défi + correction (20 % de 50)
#
# Rendu : python -m manim render -qh manim/scripts/6e/pourcentage_nombre.py PourcentageNombre6e -o eleveai-maths-6e-pourcentage-nombre --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class PourcentageNombre6e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def grille(self, center=ORIGIN, cell=0.32):
        """Grille 10×10 = 100 carreaux, tous vides au départ."""
        cells = VGroup()
        for i in range(100):
            r, c = i // 10, i % 10
            sq = Square(cell, stroke_width=1.2, color=BLEU_CALCUL)
            sq.set_fill(BLEU_CALCUL, opacity=0.0)
            sq.move_to([c * cell, -r * cell, 0])
            cells.add(sq)
        cells.move_to(center)
        return cells

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les pourcentages", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 6e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("25 %, ça veut dire quoi ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.wait(2.0)

    # ── écran 1 : % veut dire sur 100 (grille, 25 coloriés) ────────────────

    def ecran_sur100(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. % veut dire « sur 100 »")

        cells = self.grille(center=[-3.3, -0.3, 0])
        self.play(FadeIn(cells))
        self.wait(0.4)

        self.play(*[cells[i].animate.set_fill(BLEU_CALCUL, opacity=0.85) for i in range(25)], run_time=1.2)

        t1 = Text("25 carreaux", font_size=32, color=WHITE).move_to([2.3, 1.2, 0])
        t2 = Text("sur 100", font_size=32, color=WHITE).move_to([2.3, 0.6, 0])
        eq = Text("25 % = 25/100", font_size=40, color=VERT_OK).move_to([2.3, -0.4, 0])
        self.play(Write(t1), Write(t2))
        self.play(Write(eq))
        self.wait(2.2)

    # ── écran 2 : trois écritures (25 % = 25/100 = 0,25 = 1/4) ──────────────

    def ecran_ecritures(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Trois écritures")

        p = Text("25 %", font_size=64, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(Write(p))
        self.wait(0.6)

        f = Text("= 25/100", font_size=44, color=WHITE).move_to([0, 0.5, 0])
        self.play(Write(f))
        self.wait(0.6)

        d = Text("= 0,25   (÷ 100)", font_size=44, color=WHITE).move_to([0, -0.3, 0])
        self.play(Write(d))
        self.wait(0.6)

        s = Text("= 1/4   (le quart)", font_size=44, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(Write(s))
        self.wait(2.2)

    # ── écran 3 : les repères (50 % = la moitié…) ──────────────────────────

    def ecran_reperes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Les repères")

        cells = self.grille(center=[-3.3, -0.3, 0])
        self.play(FadeIn(cells))
        self.play(*[cells[i].animate.set_fill(BLEU_CALCUL, opacity=0.85) for i in range(50)], run_time=1.0)

        r1 = Text("50 % = la moitié", font_size=38, color=VERT_OK).move_to([2.4, 0.9, 0])
        r2 = Text("25 % = le quart", font_size=34, color=WHITE).move_to([2.4, 0.1, 0])
        r3 = Text("10 % = le dixième", font_size=34, color=WHITE).move_to([2.4, -0.7, 0])
        self.play(Write(r1))
        self.play(Write(r2), Write(r3))
        self.wait(2.2)

    # ── écran 4 : calculer avec un repère ──────────────────────────────────

    def ecran_calculer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Calculer")

        astuce = Text("Astuce : on passe par le repère", font_size=30, color=ORANGE_RETENUE).move_to([0, 1.9, 0])
        self.play(Write(astuce))
        self.wait(0.8)

        m1 = Text("10 % de 60", font_size=40, color=BLEU_CALCUL)
        m1r = Text("= 6", font_size=40, color=VERT_OK)
        ligne_m = VGroup(m1, m1r).arrange(RIGHT, buff=0.2).move_to([0, 0.9, 0])
        m_det = Text("le dixième : 60 ÷ 10", font_size=26, color=WHITE).move_to([0, 0.35, 0])
        self.play(Write(ligne_m))
        self.play(Write(m_det))
        self.wait(1.2)

        d1 = Text("50 % de 18", font_size=40, color=BLEU_CALCUL)
        d1r = Text("= 9", font_size=40, color=VERT_OK)
        ligne_d = VGroup(d1, d1r).arrange(RIGHT, buff=0.2).move_to([0, -0.7, 0])
        d_det = Text("la moitié : 18 ÷ 2", font_size=26, color=WHITE).move_to([0, -1.25, 0])
        self.play(Write(ligne_d))
        self.play(Write(d_det))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        q = Text("Combien font 20 % de 50 ?", font_size=40, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(titre))
        self.play(Write(q))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction (20 % de 50 = 10) ─────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("20 % = 20/100 = 1/5", font_size=36, color=BLEU_CALCUL).move_to([0, 1.2, 0])
        self.play(Write(e1))
        self.wait(1.0)

        e2 = Text("le cinquième : 50 ÷ 5", font_size=34, color=WHITE).move_to([0, 0.3, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("20 % de 50 = 10", font_size=42, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. % veut toujours dire « sur 100 ».", font_size=28),
            Text("2. Trois écritures : 25 % = 25/100 = 0,25.", font_size=28),
            Text("3. Repères : 50 % moitié, 25 % quart, 10 % dixième.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_sur100()
        self.ecran_ecritures()
        self.ecran_reperes()
        self.ecran_calculer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
