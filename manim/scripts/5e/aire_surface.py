# aire_surface.py
# EleveAI — Maths 5e — Les aires (notionId : aire_surface)
# Mêmes exemples que la fiche lib/fiches/maths-5e-aires.tsx.
#
# Mapping micro-compétences (banque aires.bank.ts) → écrans :
# - aire_comprendre      → écran 1 (compter les carrés-unité : 12 cm²)
# - aire_triangle        → écran 2 (base × hauteur ÷ 2 ; 2 triangles = 1 parallélogramme → 20 cm²)
# - aire_parallelogramme → écran 3 (base × hauteur = 24 cm²)
# - aire_composer        → écran 4 (figure en L : on décompose → 10 cm²)
# - aire_defi            → défi (retrouver la hauteur) + correction
#
# Rendu : python -m manim render -qh manim/scripts/5e/aire_surface.py AireSurface5e -o eleveai-maths-5e-aire-surface --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class AireSurface5e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def grille(self, rows, cols, cells, x0, y0, s=0.6, couleur=BLEU_CALCUL):
        g = VGroup()
        filled = VGroup()
        for r in range(rows):
            for c in range(cols):
                cell = Square(s, stroke_width=2, color=GREY)
                cell.move_to([x0 + c * s + s / 2, y0 - r * s - s / 2, 0])
                g.add(cell)
                if [r, c] in cells:
                    fc = Square(s, stroke_width=2, color=WHITE).set_fill(couleur, opacity=0.7)
                    fc.move_to(cell.get_center())
                    filled.add(fc)
        return g, filled

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les aires", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 5e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Combien de carrés dans cette surface ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Triangle et parallélogramme : deux formules.", font_size=26, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : comprendre (compter les carrés) ───────────────────────────

    def ecran_comprendre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. L'aire = des carrés-unité")

        cells = [[r, c] for r in range(3) for c in range(4)]
        g, filled = self.grille(3, 4, cells, x0=-1.4, y0=1.4)
        self.play(Create(g))
        self.play(LaggedStart(*[FadeIn(f, scale=0.6) for f in filled], lag_ratio=0.05))
        self.wait(0.6)

        note = Text("12 carreaux de 1 cm²", font_size=32, color=WHITE).move_to([0, -1.4, 0])
        self.play(Write(note))
        conclusion = Text("Aire = 12 cm²   (le tour, lui, serait un périmètre)", font_size=28, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : le triangle (moitié du parallélogramme) ───────────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. L'aire d'un triangle")

        A = np.array([-3.6, -1.2, 0])
        B = np.array([0.4, -1.2, 0])
        C = np.array([-2.6, 1.6, 0])
        tri = Polygon(A, B, C, color=BLEU_CALCUL, stroke_width=5, fill_color=BLEU_CALCUL, fill_opacity=0.4)
        base = Text("base = 8 cm", font_size=24, color=BLEU_CALCUL).next_to(Line(A, B), DOWN, buff=0.15)
        haut = DashedLine(C, np.array([C[0], A[1], 0]), color=ORANGE_RETENUE, stroke_width=3)
        hlbl = Text("h = 5 cm", font_size=24, color=ORANGE_RETENUE).next_to(haut, LEFT, buff=0.1)
        self.play(Create(tri), Write(base), Create(haut), Write(hlbl))
        self.wait(0.8)

        # copie retournée pour former un parallélogramme
        D = B + C - A  # 4e sommet
        tri2 = Polygon(B, D, C, color=VERT_OK, stroke_width=4, fill_color=VERT_OK, fill_opacity=0.35)
        note = Text("2 triangles identiques = 1 parallélogramme", font_size=26, color=ORANGE_RETENUE).move_to([0, 2.4, 0]).set_z_index(-1)
        self.play(FadeIn(tri2), Write(note))
        self.wait(0.8)

        conclusion = Text("aire = base × hauteur ÷ 2 = 8 × 5 ÷ 2 = 20 cm²", font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : le parallélogramme ────────────────────────────────────────

    def ecran_parallelogramme(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. L'aire d'un parallélogramme")

        A = np.array([-3.0, -1.0, 0])
        B = np.array([0.6, -1.0, 0])
        C = np.array([1.4, 1.2, 0])
        D = np.array([-2.2, 1.2, 0])
        para = Polygon(A, B, C, D, color=BLEU_CALCUL, stroke_width=5, fill_color=BLEU_CALCUL, fill_opacity=0.35)
        base = Text("base = 6 cm", font_size=24, color=BLEU_CALCUL).next_to(Line(A, B), DOWN, buff=0.15)
        haut = DashedLine(D, np.array([D[0], A[1], 0]), color=ORANGE_RETENUE, stroke_width=3)
        hlbl = Text("h = 4 cm", font_size=24, color=ORANGE_RETENUE).next_to(haut, LEFT, buff=0.1)
        self.play(Create(para), Write(base), Create(haut), Write(hlbl))
        self.wait(0.8)

        note = Text("Pas de ÷ 2 ici !", font_size=30, color=ROUGE_ERREUR).move_to([2.6, 0.6, 0])
        self.play(Write(note))
        self.wait(0.6)

        conclusion = Text("aire = base × hauteur = 6 × 4 = 24 cm²", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : figure composée ───────────────────────────────────────────

    def ecran_composee(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Une figure composée")

        # figure en L : 3 lignes × 4 colonnes, sans le coin haut-droit (1×2)
        cells = [[r, c] for r in range(3) for c in range(4) if not (r < 1 and c >= 2)]
        g, filled = self.grille(3, 4, cells, x0=-1.4, y0=1.4)
        self.play(Create(filled))
        self.wait(0.6)

        # décomposition : rectangle bas (2×4) + rectangle haut-gauche (1×2)
        bas = Rectangle(width=4 * 0.6, height=2 * 0.6, color=VERT_OK, stroke_width=5).move_to([-1.4 + 2 * 0.6, 1.4 - 2 * 0.6 - 0.6, 0])
        hg = Rectangle(width=2 * 0.6, height=1 * 0.6, color=ORANGE_RETENUE, stroke_width=5).move_to([-1.4 + 0.6, 1.4 - 0.3, 0])
        l1 = Text("2 × 4 = 8", font_size=26, color=VERT_OK).move_to([2.4, -0.6, 0])
        l2 = Text("1 × 2 = 2", font_size=26, color=ORANGE_RETENUE).move_to([2.4, 0.4, 0])
        self.play(Create(bas), Write(l1))
        self.play(Create(hg), Write(l2))
        self.wait(0.6)

        conclusion = Text("Aire totale = 8 + 2 = 10 cm²", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("Un triangle a une aire de 20 cm²", font_size=32, color=WHITE).move_to([0, 1.2, 0])
        q2 = Text("et une base de 8 cm.", font_size=32, color=WHITE).move_to([0, 0.5, 0])
        q3 = Text("Quelle est sa hauteur ?", font_size=34, color=BLEU_CALCUL).move_to([0, -0.3, 0])
        self.play(Write(q1), Write(q2), Write(q3))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("On inverse la formule :", font_size=32, color=WHITE).move_to([0, 1.4, 0])
        e2 = Text("hauteur = aire × 2 ÷ base", font_size=34, color=ORANGE_RETENUE).move_to([0, 0.5, 0])
        self.play(Write(e1), Write(e2))
        self.wait(0.8)

        calc = Text("20 × 2 ÷ 8 = 40 ÷ 8", font_size=36, color=BLEU_CALCUL).move_to([0, -0.6, 0])
        self.play(Write(calc))
        self.wait(0.6)

        conclusion = Text("hauteur = 5 cm", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Aire du triangle = base × hauteur ÷ 2.", font_size=27),
            Text("2. Aire du parallélogramme = base × hauteur.", font_size=27),
            Text("3. La hauteur est perpendiculaire à la base.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_comprendre()
        self.ecran_triangle()
        self.ecran_parallelogramme()
        self.ecran_composee()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Les aires. Une aire, c'est le nombre de carrés qui
#                     remplissent une surface. On va voir deux formules : le
#                     triangle et le parallélogramme. »
# [Écran 1 ~0:12]   « L'aire, ce sont des carrés-unité. Ici, 12 carreaux de 1
#                     centimètre carré : l'aire vaut 12 centimètres carrés. Attention,
#                     ça, c'est l'aire, pas le périmètre, qui serait le tour. »
# [Écran 2 ~0:32]   « L'aire d'un triangle : base fois hauteur, divisé par deux.
#                     Pourquoi divisé par deux ? Regarde : deux triangles identiques
#                     forment un parallélogramme. Le triangle, c'est donc la moitié.
#                     8 fois 5 divisé par 2, ça fait 20 centimètres carrés. »
# [Écran 3 ~0:56]   « Le parallélogramme, lui, c'est base fois hauteur, sans
#                     diviser par deux. 6 fois 4, ça fait 24 centimètres carrés. »
# [Écran 4 ~1:16]   « Une figure compliquée ? On la découpe. Ici, un rectangle de 2
#                     sur 4, ça fait 8, plus un rectangle de 1 sur 2, ça fait 2.
#                     Total : 10 centimètres carrés. »
# [Défi ~1:36]      « À toi ! Un triangle a une aire de 20 et une base de 8. Quelle
#                     est sa hauteur ? Mets pause. »
# [Correction ~1:52] « On inverse la formule : hauteur égale aire fois 2 divisé par
#                     la base. 20 fois 2 égale 40, divisé par 8 : la hauteur est 5
#                     centimètres. »
# [À retenir ~2:08] « On retient : triangle, base fois hauteur divisé par 2 ;
#                     parallélogramme, base fois hauteur ; et la hauteur est toujours
#                     perpendiculaire à la base. À bientôt ! »
