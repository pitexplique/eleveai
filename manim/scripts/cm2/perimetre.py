# perimetre.py
# EleveAI — Maths CM2 — Les périmètres (notionId : perimetre)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-perimetres.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. VARIÉTÉ
# D'ANIMATIONS (contour parcouru, côtés qui s'allument un à un) + légendes distribuées.
#
# Mapping micro-compétences (banque perimetres.bank.ts) → écrans :
# - perimetre_comprendre   → écran 1 (le tour d'un rectangle parcouru en vert)
# - perimetre_triangle     → écran 2 (5 + 6 + 7 = 18)
# - perimetre_quadrilatere → écran 3 (rectangle 8 × 5 → 26) + écran 4 (carré 7 → 28)
# - perimetre_polygone     → écran 5 (figure quelconque : on additionne tous les côtés)
# - perimetre_defi         → défi + correction (jardin 12 × 8 → grillage 40 m)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/perimetre.py PerimetreCM2 -o eleveai-maths-cm2-perimetre --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class PerimetreCM2(Scene):

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
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Quelle longueur pour faire le tour ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Le périmètre = la longueur du contour.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(GrowFromCenter(accroche))
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

        contour = rect.copy().set_stroke(VERT_OK, width=8).set_fill(opacity=0)
        pt = Dot(color=VERT_OK).move_to(rect.get_vertices()[0])
        self.add(pt)
        legende = Text("On suit tout le tour de la figure.", font_size=30, color=WHITE).move_to([0, -2.5, 0])
        self.play(FadeIn(legende))
        self.play(Create(contour), MoveAlongPath(pt, rect), run_time=2.4)
        self.wait(0.6)

        note = Text("C'est une longueur : en cm ou en m (jamais en cm²).", font_size=28, color=VERT_OK).move_to([0, -2.5, 0])
        self.play(Transform(legende, note), FadeOut(pt))
        self.wait(2.0)

    # ── écran 2 : le triangle (5 + 6 + 7 = 18) ─────────────────────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le triangle : on additionne les 3 côtés")

        A = np.array([-3.4, -1.2, 0])
        B = np.array([-0.2, -1.2, 0])
        C = np.array([-1.6, 1.4, 0])
        tri = Polygon(A, B, C, color=BLEU_CALCUL, fill_opacity=0.1)
        self.play(Create(tri))
        self.wait(0.3)

        cotes = [(A, B, "7", BLEU_CALCUL), (B, C, "6", ORANGE_RETENUE), (C, A, "5", VERT_OK)]
        somme = Text("P = 5 + 6 + 7", font_size=34, color=WHITE).move_to([3.0, 0.6, 0])
        self.play(FadeIn(somme, shift=DOWN * 0.2))
        for a, b, val, col in cotes:
            mid = (a + b) / 2
            direction = normalize(mid - tri.get_center())
            surbr = Line(a, b, color=col, stroke_width=8)
            lab = Text(val + " cm", font_size=26, color=col).move_to(mid + 0.45 * direction)
            self.play(Create(surbr), FadeIn(lab), run_time=0.55)

        conclusion = Text("P = 18 cm", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Circumscribe(somme, color=VERT_OK))
        self.wait(2.0)

    # ── écran 3 : le rectangle (8 × 5 → 26) ────────────────────────────────

    def ecran_rectangle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le rectangle : P = 2 × (L + l)")

        r = Rectangle(width=3.6, height=1.7, color=BLEU_CALCUL, fill_opacity=0.1).move_to([-2.8, 0.3, 0])
        lL = Text("L = 8 cm", font_size=24, color=BLEU_CALCUL).next_to(r, UP, buff=0.12)
        ll = Text("l = 5 cm", font_size=24, color=ORANGE_RETENUE).next_to(r, LEFT, buff=0.12)
        self.play(Create(r), FadeIn(lL), FadeIn(ll))
        self.wait(0.4)

        haut = Line(r.get_corner(UL), r.get_corner(UR), color=BLEU_CALCUL, stroke_width=8)
        bas = Line(r.get_corner(DL), r.get_corner(DR), color=BLEU_CALCUL, stroke_width=8)
        g = Line(r.get_corner(UL), r.get_corner(DL), color=ORANGE_RETENUE, stroke_width=8)
        d = Line(r.get_corner(UR), r.get_corner(DR), color=ORANGE_RETENUE, stroke_width=8)
        self.play(Create(haut), Create(bas))
        t1 = Text("2 longueurs : 8 + 8", font_size=26, color=BLEU_CALCUL).move_to([2.6, 1.2, 0])
        self.play(Write(t1))
        self.play(Create(g), Create(d))
        t2 = Text("2 largeurs : 5 + 5", font_size=26, color=ORANGE_RETENUE).move_to([2.6, 0.4, 0])
        self.play(Write(t2))
        self.wait(0.6)

        calcul = Text("P = 2 × (8 + 5) = 26 cm", font_size=36, color=VERT_OK).move_to([2.6, -1.0, 0])
        self.play(Write(calcul))
        self.wait(2.2)

    # ── écran 4 : le carré (7 → 28) ────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le carré : P = 4 × côté")

        c = Square(side_length=2.6, color=BLEU_CALCUL, fill_opacity=0.1).move_to([-3.0, -0.2, 0])
        lab = Text("7 cm", font_size=26, color=WHITE).next_to(c, DOWN, buff=0.15)
        self.play(Create(c), FadeIn(lab))

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
            nouveau = Text(f"{i} côté" + ("s" if i > 1 else "") + " de 7 cm", font_size=28, color=ORANGE_RETENUE).move_to([2.6, 1.4, 0])
            self.play(Create(surbr), Transform(compteur, nouveau), run_time=0.5)

        calcul = Text("P = 4 × 7 = 28 cm", font_size=40, color=VERT_OK).move_to([2.6, -0.2, 0])
        self.play(Write(calcul))
        piege = Text("(7 × 7 = 49, ce serait l'aire !)", font_size=24, color=ROUGE_ERREUR).move_to([2.6, -1.3, 0])
        self.play(FadeIn(piege))
        self.wait(2.2)

    # ── écran 5 : figure quelconque ────────────────────────────────────────

    def ecran_figure(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Figure quelconque : on additionne")

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

    # ── écran 6 : défi (jardin) ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        r = Rectangle(width=4.2, height=2.6, color=VERT_OK, fill_color=VERT_OK, fill_opacity=0.12).move_to([0, 0.3, 0])
        lL = Text("12 m", font_size=26, color=WHITE).next_to(r, UP, buff=0.12)
        ll = Text("8 m", font_size=26, color=WHITE).next_to(r, LEFT, buff=0.12)
        q = Text("Quelle longueur de grillage pour entourer ce jardin ?", font_size=30, color=BLEU_CALCUL).move_to([0, -2.0, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.4)
        self.play(Create(r), FadeIn(lL), FadeIn(ll))
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 7 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Le grillage suit le tour : c'est le périmètre.", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        self.play(FadeIn(e1, shift=DOWN * 0.2))
        self.wait(0.8)

        e2 = Text("P = 2 × (12 + 8)", font_size=40, color=BLEU_CALCUL).move_to([0, 0.5, 0])
        self.play(Write(e2))
        self.wait(0.6)

        e3 = Text("= 2 × 20", font_size=40, color=ORANGE_RETENUE).move_to([0, -0.4, 0])
        self.play(Write(e3))
        self.wait(0.5)

        conclusion = Text("= 40 m de grillage", font_size=44, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Le périmètre = la longueur du contour (tout le tour).", font_size=26),
            Text("2. Carré : P = 4 × c.   Rectangle : P = 2 × (L + l).", font_size=26),
            Text("3. Figure quelconque : on additionne tous les côtés.", font_size=26),
            Text("4. C'est une longueur : en cm ou m, jamais en cm².", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_comprendre()
        self.ecran_triangle()
        self.ecran_rectangle()
        self.ecran_carre()
        self.ecran_figure()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! Les périmètres. Quelle longueur pour faire le tour
#                      d'une figure ? Le périmètre, c'est la longueur du contour. »
# [Écran 1 ~0:14]    « Regarde : on suit tout le tour de la figure, en vert. C'est
#                      une longueur, en centimètres ou en mètres. Jamais en
#                      centimètres carrés. »
# [Écran 2 ~0:34]    « Un triangle ? On additionne ses trois côtés. Cinq, plus six,
#                      plus sept : dix-huit centimètres. »
# [Écran 3 ~0:50]    « Un rectangle a deux longueurs et deux largeurs. Deux fois
#                      huit, et deux fois cinq. On fait deux fois, huit plus cinq :
#                      vingt-six centimètres. »
# [Écran 4 ~1:08]    « Un carré a quatre côtés égaux. Un, deux, trois, quatre côtés
#                      de sept. Quatre fois sept : vingt-huit centimètres. Attention,
#                      sept fois sept, ce serait l'aire ! »
# [Écran 5 ~1:28]    « Une figure quelconque ? Pas de formule : on additionne tous
#                      les côtés du contour. Deux plus deux plus trois plus trois
#                      plus quatre : quatorze centimètres. »
# [Défi ~1:48]       « À toi ! Un jardin de douze mètres sur huit. Quelle longueur
#                      de grillage pour l'entourer ? Mets pause. »
# [Correction ~2:06] « Le grillage suit le tour : c'est le périmètre. Deux fois,
#                      douze plus huit ; deux fois vingt : quarante mètres de grillage. »
# [À retenir ~2:24]  « On retient : le périmètre, c'est le tour. Carré, quatre fois
#                      le côté ; rectangle, deux fois longueur plus largeur. Sinon,
#                      on additionne tous les côtés. Et c'est une longueur. À bientôt ! »
