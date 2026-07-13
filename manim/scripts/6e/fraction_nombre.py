# fraction_nombre.py
# EleveAI — Maths 6e — Les fractions (notionId : fraction_nombre)
# Mêmes exemples que la fiche lib/fiches/maths-6e-fractions.tsx.
#
# Mapping micro-compétences (banque fractions.bank.ts) → écrans :
# - fraction_lire_ecrire  → écran 1 (3/4, disque + numérateur/dénominateur)
# - fraction_representer  → écran 2 (représenter 4/6 sur une barre)
# - fraction_comparer     → écran 3 (1/3 vs 1/5, deux barres)
# - fraction_quantite     → écran 4 (les 2/3 de 15 billes)
# - fraction_decimal      → écran 5 (1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75)
# - fraction_defi         → défi + correction (2/4 = 1/2)
#
# Rendu : python -m manim render -qh manim/scripts/6e/fraction_nombre.py FractionNombre6e -o eleveai-maths-6e-fraction-nombre --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class FractionNombre6e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def barre(self, num, den, width=5.0, height=0.8, center=ORIGIN, color=BLEU_CALCUL):
        """Une barre de `den` parts égales, `num` coloriées."""
        cells = VGroup()
        cw = width / den
        for i in range(den):
            cell = Rectangle(width=cw, height=height, stroke_width=3, color=WHITE)
            cell.set_fill(color, opacity=0.85 if i < num else 0.0)
            cells.add(cell)
        cells.arrange(RIGHT, buff=0).move_to(center)
        return cells

    def disque(self, num, den, center=ORIGIN, radius=1.35, color=BLEU_CALCUL):
        """Un disque partagé en `den` parts égales, `num` coloriées."""
        g = VGroup()
        ang = TAU / den
        for i in range(den):
            sec = AnnularSector(inner_radius=0, outer_radius=radius, angle=ang, start_angle=PI / 2 + i * ang)
            sec.set_stroke(WHITE, 2.5)
            sec.set_fill(color, opacity=0.85 if i < num else 0.0)
            g.add(sec)
        g.shift(center)
        return g

    def fraction_mob(self, num, den, center, font_size=56, color=WHITE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        bar = Line(LEFT * 0.35, RIGHT * 0.35, stroke_width=4, color=color)
        return VGroup(n, bar, d).arrange(DOWN, buff=0.14).move_to(center)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les fractions", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 6e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("3/4 d'une pizza, c'est quoi ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.wait(2.0)

    # ── écran 1 : lire une fraction (3/4) ──────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire une fraction")

        disc = self.disque(3, 4, center=[-3.2, 0.2, 0])
        self.play(Create(disc))

        frac = self.fraction_mob(3, 4, center=[0.3, 0.3, 0], font_size=64)
        self.play(Write(frac))
        self.wait(0.6)

        num_txt = Text("3 parts prises", font_size=28, color=VERT_OK).move_to([3.1, 0.9, 0])
        den_txt = Text("4 parts égales", font_size=28, color=BLEU_CALCUL).move_to([3.1, -0.3, 0])
        fl_num = Arrow([1.0, 0.7, 0], [2.0, 0.9, 0], color=VERT_OK, buff=0.1, stroke_width=3)
        fl_den = Arrow([1.0, -0.1, 0], [2.0, -0.3, 0], color=BLEU_CALCUL, buff=0.1, stroke_width=3)
        self.play(Create(fl_num), Write(num_txt))
        self.play(Create(fl_den), Write(den_txt))
        self.wait(2.2)

    # ── écran 2 : représenter (4/6) ────────────────────────────────────────

    def ecran_representer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Représenter 4/6")

        vide = self.barre(0, 6, center=[0, 0.4, 0])
        self.play(Create(vide))
        d = Text("6 parts égales (le dénominateur)", font_size=28, color=BLEU_CALCUL).move_to([0, -0.9, 0])
        self.play(Write(d))
        self.wait(1.0)

        # colorier 4 parts une à une
        for i in range(4):
            self.play(vide[i].animate.set_fill(BLEU_CALCUL, opacity=0.85), run_time=0.4)
        n = Text("on colorie 4 parts (le numérateur)", font_size=28, color=VERT_OK).move_to([0, -0.9, 0])
        self.play(FadeOut(d), Write(n))
        self.wait(1.0)

        conclusion = Text("4/6", font_size=48, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 3 : comparer (1/3 vs 1/5) ────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Comparer 1/3 et 1/5")

        b1 = self.barre(1, 3, center=[0, 0.9, 0])
        l1 = Text("1/3", font_size=34, color=WHITE).next_to(b1, LEFT, buff=0.4)
        b2 = self.barre(1, 5, center=[0, -0.4, 0])
        l2 = Text("1/5", font_size=34, color=WHITE).next_to(b2, LEFT, buff=0.4)
        self.play(Create(b1), Write(l1))
        self.play(Create(b2), Write(l2))
        self.wait(1.0)

        note = Text("Plus on partage, plus les parts sont petites", font_size=26, color=ORANGE_RETENUE).move_to([0, -1.5, 0])
        self.play(Write(note))
        self.wait(1.2)

        conclusion = Text("1/3 > 1/5", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(b1[0].animate.set_fill(VERT_OK, opacity=0.85), Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : fraction d'une quantité (2/3 de 15) ──────────────────────

    def ecran_quantite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Les 2/3 de 15")

        # une barre de 3 parts, chacune vaut 5 (total 15)
        barre = self.barre(0, 3, width=5.4, height=1.0, center=[0, 0.6, 0])
        etiquettes = VGroup(*[
            Text("5", font_size=40, color=WHITE).move_to(barre[i].get_center())
            for i in range(3)
        ])
        total = Text("15 billes", font_size=30, color=WHITE).next_to(barre, UP, buff=0.3)
        self.play(Create(barre), FadeIn(total))
        self.wait(0.5)

        c1 = Text("15 ÷ 3 = 5  (une part)", font_size=30, color=BLEU_CALCUL).move_to([0, -0.9, 0])
        self.play(Write(c1), LaggedStart(*[Write(e) for e in etiquettes], lag_ratio=0.2))
        self.wait(1.2)

        # prendre 2 parts
        c2 = Text("On prend 2 parts : 2 × 5", font_size=30, color=BLEU_CALCUL).move_to([0, -1.5, 0])
        self.play(
            barre[0].animate.set_fill(VERT_OK, opacity=0.85),
            barre[1].animate.set_fill(VERT_OK, opacity=0.85),
            Write(c2),
        )
        self.wait(1.0)

        conclusion = Text("2/3 de 15 = 10 billes", font_size=36, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : fraction ↔ écriture décimale ─────────────────────────────

    def ecran_decimal(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Fraction et décimal")

        demi = self.barre(1, 2, width=3.2, height=0.7, center=[-2.6, 0.9, 0])
        eq = Text("1/2 = 0,5", font_size=40, color=VERT_OK).move_to([2.0, 0.9, 0])
        self.play(Create(demi), Write(eq))
        self.wait(1.2)

        autres = VGroup(
            Text("1/4 = 0,25", font_size=38, color=WHITE),
            Text("3/4 = 0,75", font_size=38, color=WHITE),
        ).arrange(DOWN, buff=0.5).move_to([0, -0.9, 0])
        self.play(LaggedStart(*[Write(a) for a in autres], lag_ratio=0.3))
        self.wait(2.2)

    # ── écran 6 : défi (2/4 = ?) ───────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        barre = self.barre(2, 4, width=4.4, height=0.9, center=[0, 0.7, 0])
        q = Text("Quelle fraction simple\nest égale à 2/4 ?", font_size=36, color=WHITE, line_spacing=1.1).move_to([0, -0.9, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(titre))
        self.play(Create(barre))
        self.play(Write(q))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction (2/4 = 1/2) ───────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        b1 = self.barre(2, 4, width=4.4, height=0.8, center=[0, 0.9, 0])
        l1 = Text("2/4", font_size=34, color=WHITE).next_to(b1, LEFT, buff=0.4)
        b2 = self.barre(1, 2, width=4.4, height=0.8, center=[0, -0.4, 0])
        l2 = Text("1/2", font_size=34, color=WHITE).next_to(b2, LEFT, buff=0.4)
        self.play(Create(b1), Write(l1))
        self.play(Create(b2), Write(l2))
        self.wait(0.8)

        note = Text("La même part coloriée !", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.5, 0])
        self.play(Write(note))
        self.wait(1.0)

        conclusion = Text("2/4 = 1/2", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. En haut le numérateur, en bas le dénominateur.", font_size=28),
            Text("2. Toujours des parts égales.", font_size=28),
            Text("3. Une quantité : je divise par le bas, × le haut.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_representer()
        self.ecran_comparer()
        self.ecran_quantite()
        self.ecran_decimal()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
