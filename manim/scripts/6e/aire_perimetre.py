# aire_perimetre.py
# EleveAI — Maths 6e — Les périmètres (notionId : aire_perimetre)
# Mêmes exemples que la fiche lib/fiches/maths-6e-perimetres.tsx.
#
# Mapping micro-compétences (banque perimetres.bank.ts) → écrans :
# - aire_perimetre_comprendre → écran 1 (le tour d'un rectangle tracé en vert)
# - aire_perimetre_carre      → écran 2 (carré c = 9 → P = 4 × 9 = 36)
# - aire_perimetre_rectangle  → écran 3 (rectangle 8 × 3 → P = 2 × (8+3) = 22)
# - aire_perimetre_figure     → écran 4 (figure quelconque : on additionne tous les côtés)
# - aire_perimetre_probleme   → écran 3 (jardin) + à retenir
# - aire_perimetre_defi       → défi (retrouver le côté d'un carré, P = 28) + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/aire_perimetre.py AirePerimetre6e -o eleveai-maths-6e-aire-perimetre --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class AirePerimetre6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les périmètres", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Quelle longueur pour faire le tour ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Le périmètre = la longueur du contour.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.2))
        self.wait(2.2)

    # ── écran 1 : comprendre (le tour) ──────────────────────────────────────

    def ecran_comprendre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le périmètre, c'est le tour")

        rect = Rectangle(width=5.0, height=3.0, color=BLEU_CALCUL, fill_opacity=0.1).move_to([0, 0.2, 0])
        self.play(Create(rect))
        self.wait(0.4)

        # on trace le contour en vert avec un point qui en fait le tour
        contour = rect.copy().set_stroke(VERT_OK, width=8).set_fill(opacity=0)
        pt = Dot(color=VERT_OK).move_to(rect.get_vertices()[0])
        self.add(pt)
        legende = Text("On suit tout le tour de la figure.", font_size=30, color=WHITE).move_to([0, -2.5, 0])
        self.play(FadeIn(legende))
        self.play(Create(contour), MoveAlongPath(pt, rect), run_time=2.2)
        self.wait(0.6)

        note = Text("C'est une longueur : en cm ou en m (jamais en cm²).", font_size=28, color=VERT_OK).move_to([0, -2.5, 0])
        self.play(Transform(legende, note), FadeOut(pt))
        self.wait(2.0)

    # ── écran 2 : le carré ──────────────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le carré : P = 4 × côté")

        c = Square(side_length=2.6, color=BLEU_CALCUL, fill_opacity=0.1).move_to([-3.0, -0.2, 0])
        lab = Text("9 cm", font_size=26, color=WHITE).next_to(c, DOWN, buff=0.15)
        self.play(Create(c), FadeIn(lab))

        # les 4 côtés s'allument un par un
        cotes = [
            Line(c.get_corner(UL), c.get_corner(UR)),
            Line(c.get_corner(UR), c.get_corner(DR)),
            Line(c.get_corner(DR), c.get_corner(DL)),
            Line(c.get_corner(DL), c.get_corner(UL)),
        ]
        compteur = Text("0 côté", font_size=30, color=ORANGE_RETENUE).move_to([2.6, 1.4, 0])
        self.play(FadeIn(compteur))
        for i, cote in enumerate(cotes, 1):
            surbr = Line(cote.get_start(), cote.get_end(), color=VERT_OK, stroke_width=8)
            nouveau = Text(f"{i} côté" + ("s" if i > 1 else ""), font_size=30, color=ORANGE_RETENUE).move_to([2.6, 1.4, 0])
            self.play(Create(surbr), Transform(compteur, nouveau), run_time=0.5)

        calcul = Text("P = 4 × 9 = 36 cm", font_size=40, color=VERT_OK).move_to([2.6, -0.2, 0])
        self.play(Write(calcul))
        piege = Text("(9 × 9 = 81, ce serait l'aire, pas le périmètre)", font_size=24, color=ROUGE_ERREUR).move_to([2.6, -1.3, 0])
        self.play(FadeIn(piege))
        self.wait(2.2)

    # ── écran 3 : le rectangle ──────────────────────────────────────────────

    def ecran_rectangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le rectangle : P = 2 × (L + l)")

        r = Rectangle(width=3.6, height=1.5, color=BLEU_CALCUL, fill_opacity=0.1).move_to([-2.8, 0.3, 0])
        lL = Text("L = 8 cm", font_size=24, color=BLEU_CALCUL).next_to(r, UP, buff=0.12)
        ll = Text("l = 3 cm", font_size=24, color=ORANGE_RETENUE).next_to(r, LEFT, buff=0.12)
        self.play(Create(r), FadeIn(lL), FadeIn(ll))
        self.wait(0.4)

        # 2 longueurs (haut+bas) puis 2 largeurs (gauche+droite)
        haut = Line(r.get_corner(UL), r.get_corner(UR), color=BLEU_CALCUL, stroke_width=8)
        bas = Line(r.get_corner(DL), r.get_corner(DR), color=BLEU_CALCUL, stroke_width=8)
        g = Line(r.get_corner(UL), r.get_corner(DL), color=ORANGE_RETENUE, stroke_width=8)
        d = Line(r.get_corner(UR), r.get_corner(DR), color=ORANGE_RETENUE, stroke_width=8)
        self.play(Create(haut), Create(bas))
        t1 = Text("2 longueurs : 8 + 8", font_size=26, color=BLEU_CALCUL).move_to([2.6, 1.2, 0])
        self.play(Write(t1))
        self.play(Create(g), Create(d))
        t2 = Text("2 largeurs : 3 + 3", font_size=26, color=ORANGE_RETENUE).move_to([2.6, 0.4, 0])
        self.play(Write(t2))
        self.wait(0.6)

        calcul = Text("P = 2 × (8 + 3) = 22 cm", font_size=36, color=VERT_OK).move_to([2.6, -1.0, 0])
        self.play(Write(calcul))
        self.wait(2.2)

    # ── écran 4 : figure quelconque ─────────────────────────────────────────

    def ecran_figure(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Figure quelconque : on additionne")

        verts = [
            np.array([-2.2, -1.2, 0]),
            np.array([-2.2, 1.0, 0]),
            np.array([0.0, 2.0, 0]),
            np.array([2.2, 1.0, 0]),
            np.array([1.2, -1.2, 0]),
        ]
        poly = Polygon(*verts, color=BLEU_CALCUL, fill_opacity=0.1).shift(0.2 * DOWN + 2.4 * LEFT)
        self.play(Create(poly))
        self.wait(0.3)

        v = poly.get_vertices()
        longueurs = ["2", "2", "3", "3", "4"]
        somme = Text("P =", font_size=34, color=VERT_OK).move_to([2.4, 1.0, 0])
        self.play(FadeIn(somme))
        for i, val in enumerate(longueurs):
            a, b = v[i], v[(i + 1) % len(v)]
            mid = (a + b) / 2
            direction = normalize(mid - poly.get_center())
            surbr = Line(a, b, color=VERT_OK, stroke_width=8)
            lab = Text(val, font_size=28, color=WHITE).move_to(mid + 0.35 * direction)
            self.play(Create(surbr), FadeIn(lab), run_time=0.45)

        detail = Text("2 + 2 + 3 + 3 + 4", font_size=32, color=WHITE).move_to([3.1, 0.0, 0])
        res = Text("= 14 cm", font_size=40, color=VERT_OK).move_to([3.1, -1.1, 0])
        self.play(Write(detail))
        self.play(Write(res))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        c = Square(side_length=2.8, color=BLEU_CALCUL, fill_opacity=0.1).move_to([0, 0.2, 0])
        p = Text("Périmètre = 28 cm", font_size=30, color=VERT_OK).next_to(c, UP, buff=0.2)
        q = Text("Combien mesure un côté ?", font_size=34, color=BLEU_CALCUL).move_to([0, -2.0, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.5)
        self.play(Create(c), FadeIn(p))
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("P d'un carré = 4 × côté.", font_size=34, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("On fait à l'envers : côté = 28 ÷ 4.", font_size=34, color=WHITE).move_to([0, 0.3, 0])
        self.play(Write(e2))
        self.wait(0.8)

        res = Text("Un côté mesure 7 cm.", font_size=42, color=VERT_OK).move_to([0, -0.9, 0])
        verif = Text("Vérification : 4 × 7 = 28 cm.", font_size=28, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Write(res))
        self.play(FadeIn(verif))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Le périmètre = la longueur du contour (tout le tour).", font_size=27),
            Text("2. Carré : P = 4 × c.   Rectangle : P = 2 × (L + l).", font_size=27),
            Text("3. Figure quelconque : on additionne tous les côtés.", font_size=27),
            Text("4. C'est une longueur : en cm ou m, jamais en cm².", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_comprendre()
        self.ecran_carre()
        self.ecran_rectangle()
        self.ecran_figure()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
