# triangle_figure.py
# EleveAI — Maths 6e — Les triangles (notionId : triangle_figure)
# Mêmes exemples que la fiche lib/fiches/maths-6e-triangles.tsx.
#
# Mapping micro-compétences (banque triangles.bank.ts) → écrans :
# - triangle_nommer / triangle_sommet_cote → écran 1 (ABC : 3 sommets, 3 côtés)
# - triangle_type_cote     → écran 2 (équilatéral / isocèle / quelconque)
# - triangle_type_angle    → écran 3 (rectangle / aigu / obtusangle)
# - triangle_somme_angle / triangle_angle_manquant → écran 4 (180° : 60+70+? = 50)
# - triangle_possible_ou_non → défi (2, 3, 6 : possible ?) + correction
# - triangle_defi          → défi + correction
#
# Muet + texte : chaque écran s'explique seul. wait() généreux.
# Rendu : python -m manim render -qh manim/scripts/6e/triangle_figure.py TriangleFigure6e -o eleveai-maths-6e-triangle-figure --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


def P(x, y, z=0):
    return np.array([x, y, z])


class TriangleFigure6e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def tri(self, pts, color=BLEU_CALCUL):
        return Polygon(*pts, color=color, stroke_width=4, fill_color=color, fill_opacity=0.08)

    def ticks(self, a, b, n, color=VERT_OK, size=0.12):
        m = (a + b) / 2
        d = (b - a) / np.linalg.norm(b - a)
        perp = np.array([-d[1], d[0], 0])
        g = VGroup()
        for o in np.linspace(-(n - 1) / 2, (n - 1) / 2, n) * 0.1:
            c = m + o * d
            g.add(Line(c - size * perp, c + size * perp, color=color, stroke_width=3))
        return g

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les triangles", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 6e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("3 sommets, 3 côtés, 3 angles.", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Et une règle en or : la somme des angles = 180°.", font_size=27, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.15))
        self.wait(2.2)

    # ── écran 1 : nommer (sommets, côtés) ───────────────────────────────────

    def ecran_nommer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Nommer : 3 sommets, 3 côtés")

        A, B, C = P(-2.6, -1.4), P(2.4, -1.4), P(-0.4, 1.8)
        t = self.tri([A, B, C])
        self.play(Create(t))

        # sommets
        for pt, lab, pos in [(A, "A", DOWN + LEFT), (B, "B", DOWN + RIGHT), (C, "C", UP)]:
            d = Dot(pt, radius=0.08, color=WHITE)
            l = Text(lab, font_size=30, color=VERT_OK).next_to(pt, pos, buff=0.15)
            self.play(GrowFromCenter(d), Write(l), run_time=0.4)

        # côtés
        mAB = Text("AB", font_size=24, color=BLEU_CALCUL).move_to((A + B) / 2 + DOWN * 0.35)
        mBC = Text("BC", font_size=24, color=BLEU_CALCUL).move_to((B + C) / 2 + RIGHT * 0.4)
        mCA = Text("CA", font_size=24, color=BLEU_CALCUL).move_to((C + A) / 2 + LEFT * 0.4)
        self.play(FadeIn(mAB), FadeIn(mBC), FadeIn(mCA))

        note = Text("Sommets = points (A, B, C) ; côtés = segments (AB, BC, CA).", font_size=24, color=WHITE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 2 : selon les côtés ───────────────────────────────────────────

    def ecran_cotes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Selon les côtés")

        # équilatéral
        cx = -4.4
        eq = [P(cx - 0.9, -0.3), P(cx + 0.9, -0.3), P(cx, 1.26)]
        te = self.tri(eq)
        tks_e = VGroup(
            self.ticks(eq[0], eq[1], 1), self.ticks(eq[1], eq[2], 1), self.ticks(eq[2], eq[0], 1),
        )
        le = VGroup(Text("Équilatéral", font_size=26, color=VERT_OK), Text("3 côtés égaux", font_size=20, color=WHITE)).arrange(DOWN, buff=0.12).next_to(te, DOWN, buff=0.35)

        # isocèle
        cx = -0.6
        iso = [P(cx - 0.9, -0.3), P(cx + 0.9, -0.3), P(cx, 1.5)]
        ti = self.tri(iso)
        tks_i = VGroup(self.ticks(iso[1], iso[2], 2), self.ticks(iso[2], iso[0], 2))
        li = VGroup(Text("Isocèle", font_size=26, color=BLEU_CALCUL), Text("2 côtés égaux", font_size=20, color=WHITE)).arrange(DOWN, buff=0.12).next_to(ti, DOWN, buff=0.35)

        # quelconque
        cx = 3.6
        qu = [P(cx - 1.0, -0.3), P(cx + 1.1, -0.3), P(cx + 0.5, 1.4)]
        tq = self.tri(qu)
        lq = VGroup(Text("Quelconque", font_size=26, color=ORANGE_RETENUE), Text("3 côtés différents", font_size=20, color=WHITE)).arrange(DOWN, buff=0.12).next_to(tq, DOWN, buff=0.35)

        self.play(Create(te), FadeIn(tks_e), FadeIn(le))
        self.play(Create(ti), FadeIn(tks_i), FadeIn(li))
        self.play(Create(tq), FadeIn(lq))
        self.wait(2.4)

    # ── écran 3 : selon les angles ──────────────────────────────────────────

    def ecran_angles(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Selon les angles")

        # rectangle (angle droit)
        cx = -4.4
        A = P(cx - 0.9, -0.3); B = P(cx + 0.9, -0.3); C = P(cx - 0.9, 1.3)
        tr = self.tri([A, B, C])
        sq = Square(0.24, color=ROUGE_ERREUR, stroke_width=3).move_to(A + P(0.12, 0.12, 0))
        lr = VGroup(Text("Rectangle", font_size=26, color=ROUGE_ERREUR), Text("un angle = 90°", font_size=20, color=WHITE)).arrange(DOWN, buff=0.12).next_to(tr, DOWN, buff=0.35)

        # aigu
        cx = -0.6
        ta = self.tri([P(cx - 0.9, -0.3), P(cx + 0.9, -0.3), P(cx + 0.1, 1.4)])
        la = VGroup(Text("Aigu", font_size=26, color=VERT_OK), Text("3 angles < 90°", font_size=20, color=WHITE)).arrange(DOWN, buff=0.12).next_to(ta, DOWN, buff=0.35)

        # obtusangle
        cx = 3.7
        Ao = P(cx - 1.2, -0.3); Bo = P(cx + 1.2, -0.3); Co = P(cx + 0.7, 0.7)
        to = self.tri([Ao, Bo, Co])
        arc = Arc(radius=0.4, start_angle=0, angle=(120 * DEGREES), arc_center=Ao, color=ORANGE_RETENUE, stroke_width=3)
        lo = VGroup(Text("Obtusangle", font_size=26, color=ORANGE_RETENUE), Text("un angle > 90°", font_size=20, color=WHITE)).arrange(DOWN, buff=0.12).next_to(to, DOWN, buff=0.35)

        self.play(Create(tr), Create(sq), FadeIn(lr))
        self.play(Create(ta), FadeIn(la))
        self.play(Create(to), Create(arc), FadeIn(lo))
        self.wait(2.4)

    # ── écran 4 : la règle des 180° ─────────────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. La règle en or : 180°")

        A, B, C = P(-3.4, -1.2), P(0.4, -1.2), P(-1.8, 1.5)
        t = self.tri([A, B, C])
        self.play(Create(t))
        a60 = Text("60°", font_size=26, color=BLEU_CALCUL).move_to(A + P(0.55, 0.3, 0))
        a70 = Text("70°", font_size=26, color=BLEU_CALCUL).move_to(B + P(-0.7, 0.3, 0))
        aC = Text("?", font_size=30, color=ORANGE_RETENUE).move_to(C + P(0.15, -0.5, 0))
        self.play(FadeIn(a60), FadeIn(a70), FadeIn(aC))
        self.wait(0.6)

        e1 = Text("Somme = 180°", font_size=32, color=WHITE).move_to([3.0, 1.3, 0])
        e2 = Text("? = 180 − 60 − 70", font_size=30, color=BLEU_CALCUL).move_to([3.0, 0.3, 0])
        e3 = Text("? = 50°", font_size=40, color=VERT_OK).move_to([3.0, -0.8, 0])
        self.play(Write(e1))
        self.play(Write(e2))
        self.play(Write(e3), Transform(aC, Text("50°", font_size=28, color=VERT_OK).move_to(C + P(0.15, -0.5, 0))))
        verif = Text("60 + 70 + 50 = 180 ✓", font_size=26, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(verif))
        self.wait(2.2)

    # ── écran 5 : défi (inégalité triangulaire) ─────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        enonce = Text("Un triangle de côtés 2 cm, 3 cm et 6 cm.", font_size=32, color=WHITE).move_to([0, 1.4, 0])
        self.play(FadeIn(enonce))

        # on montre les deux petits côtés bout à bout comparés au grand
        y = -0.2
        c2 = Line(P(-3.5, y), P(-3.5 + 1.0, y), color=BLEU_CALCUL, stroke_width=8)
        c3 = Line(c2.get_end(), c2.get_end() + P(1.5, 0, 0), color=VERT_OK, stroke_width=8)
        l23 = Text("2 + 3 = 5 cm", font_size=26, color=WHITE).next_to(VGroup(c2, c3), UP, buff=0.2)
        c6 = Line(P(-3.5, y - 1.0), P(-3.5 + 3.0, y - 1.0), color=ORANGE_RETENUE, stroke_width=8)
        l6 = Text("6 cm", font_size=26, color=ORANGE_RETENUE).next_to(c6, DOWN, buff=0.15)
        self.play(Create(c2), Create(c3), FadeIn(l23))
        self.play(Create(c6), FadeIn(l6))

        q = Text("Ce triangle est-il possible ?", font_size=32, color=BLEU_CALCUL).move_to([0, -2.3, 0])
        pause = Text("Mets pause et cherche !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("On additionne les deux plus petits : 2 + 3 = 5.", font_size=32, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("Or 5 est plus petit que 6.", font_size=34, color=ROUGE_ERREUR).move_to([0, 0.2, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("La somme ne dépasse pas 6 : triangle IMPOSSIBLE.", font_size=32, color=ROUGE_ERREUR).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un triangle : 3 sommets, 3 côtés, 3 angles.", font_size=27),
            Text("2. Selon les côtés : équilatéral, isocèle, quelconque.", font_size=27),
            Text("3. La somme des 3 angles fait toujours 180°.", font_size=27),
            Text("4. Possible si un côté < somme des deux autres.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_nommer()
        self.ecran_cotes()
        self.ecran_angles()
        self.ecran_somme()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
