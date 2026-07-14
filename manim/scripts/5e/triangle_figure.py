# triangle_figure.py
# EleveAI — Maths 5e — Les triangles (notionId : triangle_figure)
# Mêmes exemples que la fiche lib/fiches/maths-5e-triangles.tsx.
#
# Mapping micro-compétences (banque triangles.bank.ts) → écrans :
# - triangle_reconnaitre → écran 1 (triangle ABC : 3 sommets, 3 côtés)
# - triangle_nature      → écran 2 (isocèle / équilatéral / rectangle)
# - triangle_construire  → écran 3 (inégalité triangulaire : 2,3,8 impossible ; 4,5,7 ok)
# - triangle_somme_angle → écran 4 (50° + 60° + ? = 180° → 70°)
# - triangle_defi        → défi (45° et 45°) + correction (90°, rectangle)
#
# Rendu : python -m manim render -qh manim/scripts/5e/triangle_figure.py TriangleFigure5e -o eleveai-maths-5e-triangle-figure --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class TriangleFigure5e(Scene):

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
        titre = Text("Les triangles", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 5e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("3 longueurs forment-elles toujours un triangle ?", font_size=32, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Pas toujours ! Et la somme des angles fait 180°.", font_size=26, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : reconnaître ───────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Trois sommets, trois côtés")

        A = np.array([-2.6, -1.3, 0])
        B = np.array([2.6, -1.3, 0])
        C = np.array([0.4, 1.9, 0])
        tri = Polygon(A, B, C, color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(tri))

        la = Text("A", font_size=30, color=VERT_OK).next_to(A, DL, buff=0.15)
        lb = Text("B", font_size=30, color=VERT_OK).next_to(B, DR, buff=0.15)
        lc = Text("C", font_size=30, color=VERT_OK).next_to(C, UP, buff=0.15)
        self.play(FadeIn(la), FadeIn(lb), FadeIn(lc))
        self.wait(0.6)

        s = Text("A, B, C : les sommets (points)", font_size=28, color=VERT_OK).move_to([0, -2.6, 0])
        c = Text("AB, BC, CA : les côtés (segments)", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.35)
        self.play(FadeIn(s))
        self.play(FadeIn(c))
        self.wait(2.0)

    # ── écran 2 : les natures ───────────────────────────────────────────────

    def tick(self, p1, p2):
        mid = (p1 + p2) / 2
        d = normalize(p2 - p1)
        perp = np.array([-d[1], d[0], 0]) * 0.12
        return Line(mid - perp, mid + perp, color=JAUNE_TITRE, stroke_width=3)

    def ecran_natures(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Trois natures")

        # isocèle
        A1 = np.array([-4.9, -0.6, 0]); B1 = np.array([-3.1, -0.6, 0]); C1 = np.array([-4.0, 1.2, 0])
        iso = Polygon(A1, B1, C1, color=BLEU_CALCUL, stroke_width=4)
        ticks = VGroup(self.tick(A1, C1), self.tick(B1, C1))
        t1 = Text("Isocèle", font_size=26, color=VERT_OK).move_to([-4.0, -1.3, 0])
        s1 = Text("2 côtés égaux", font_size=20, color=WHITE).move_to([-4.0, -1.75, 0])

        # équilatéral
        A2 = np.array([-1.4, -0.6, 0]); B2 = np.array([0.4, -0.6, 0]); C2 = np.array([-0.5, 0.96, 0])
        equi = Polygon(A2, B2, C2, color=BLEU_CALCUL, stroke_width=4)
        ticks2 = VGroup(self.tick(A2, B2), self.tick(B2, C2), self.tick(C2, A2))
        t2 = Text("Équilatéral", font_size=26, color=VERT_OK).move_to([-0.5, -1.3, 0])
        s2 = Text("3 côtés égaux", font_size=20, color=WHITE).move_to([-0.5, -1.75, 0])

        # rectangle
        A3 = np.array([2.2, -0.6, 0]); B3 = np.array([4.4, -0.6, 0]); C3 = np.array([2.2, 1.4, 0])
        rect = Polygon(A3, B3, C3, color=BLEU_CALCUL, stroke_width=4)
        carre = Square(0.3, color=ORANGE_RETENUE, stroke_width=3).move_to(A3 + [0.15, 0.15, 0])
        t3 = Text("Rectangle", font_size=26, color=VERT_OK).move_to([3.3, -1.3, 0])
        s3 = Text("un angle droit", font_size=20, color=WHITE).move_to([3.3, -1.75, 0])

        self.play(Create(iso), Create(ticks), FadeIn(t1), FadeIn(s1))
        self.play(Create(equi), Create(ticks2), FadeIn(t2), FadeIn(s2))
        self.play(Create(rect), Create(carre), FadeIn(t3), FadeIn(s3))
        self.wait(2.4)

    # ── écran 3 : l'inégalité triangulaire ──────────────────────────────────

    def ecran_inegalite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Peut-on le construire ?")

        u = 0.55  # 1 cm = 0.55 unité
        # cas impossible : 2, 3, 8
        A = np.array([-4.3, 0.9, 0])
        B = A + np.array([8 * u, 0, 0])
        base = Line(A, B, color=BLEU_CALCUL, stroke_width=5)
        cerc1 = Arc(radius=2 * u, start_angle=-PI / 2, angle=PI, arc_center=A, color=VERT_OK, stroke_width=3)
        cerc2 = Arc(radius=3 * u, start_angle=PI / 2, angle=PI, arc_center=B, color=ORANGE_RETENUE, stroke_width=3)
        lbl = Text("côtés 2, 3 et 8", font_size=26, color=WHITE).next_to(base, UP, buff=0.7)
        self.play(Create(base), FadeIn(lbl))
        self.play(Create(cerc1), Create(cerc2))
        calc = Text("2 + 3 = 5  <  8", font_size=30, color=ROUGE_ERREUR).move_to([-1.0, -0.5, 0])
        conc = Text("les arcs ne se touchent pas → IMPOSSIBLE", font_size=26, color=ROUGE_ERREUR).move_to([-1.0, -1.3, 0])
        self.play(Write(calc))
        self.play(Write(conc))
        self.wait(1.2)

        ok = Text("Avec 4, 5, 7 : 4 + 5 = 9 > 7 → possible", font_size=28, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(ok))
        self.wait(2.0)

    # ── écran 4 : la somme des angles ───────────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. La somme des angles = 180°")

        A = np.array([-2.6, -1.2, 0])
        B = np.array([2.6, -1.2, 0])
        C = np.array([-0.2, 1.8, 0])
        tri = Polygon(A, B, C, color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(tri))

        aA = Text("50°", font_size=28, color=VERT_OK).move_to(A + [0.65, 0.35, 0])
        aB = Text("60°", font_size=28, color=VERT_OK).move_to(B + [-0.7, 0.35, 0])
        aC = Text("?", font_size=32, color=ORANGE_RETENUE).move_to(C + [0.0, -0.55, 0])
        self.play(FadeIn(aA), FadeIn(aB), FadeIn(aC))
        self.wait(0.6)

        calc = Text("180 - 50 - 60 = 70", font_size=36, color=BLEU_CALCUL).move_to([0, -2.2, 0])
        self.play(Write(calc))
        self.wait(0.6)

        rep = Text("70°", font_size=34, color=VERT_OK).move_to(C + [0.0, -0.55, 0])
        self.play(Transform(aC, rep), Flash(C + [0.0, -0.55, 0], color=VERT_OK))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        A = np.array([-2.6, -0.6, 0])
        B = np.array([2.6, -0.6, 0])
        C = np.array([0.0, 1.6, 0])
        tri = Polygon(A, B, C, color=BLEU_CALCUL, stroke_width=5)
        aA = Text("45°", font_size=28, color=VERT_OK).move_to(A + [0.7, 0.3, 0])
        aB = Text("45°", font_size=28, color=VERT_OK).move_to(B + [-0.75, 0.3, 0])
        aC = Text("?", font_size=32, color=ORANGE_RETENUE).move_to(C + [0.0, -0.5, 0])
        q = Text("Le 3e angle ? Quelle nature ?", font_size=32, color=BLEU_CALCUL).move_to([0, -1.9, 0])
        self.play(Create(tri), FadeIn(aA), FadeIn(aB), FadeIn(aC))
        self.play(Write(q))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.35)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("45 + 45 = 90", font_size=36, color=WHITE).move_to([0, 1.4, 0])
        self.play(Write(e1))
        self.wait(0.6)

        e2 = Text("180 - 90 = 90°", font_size=40, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        self.play(Write(e2))
        self.wait(0.6)

        conclusion = Text("Un angle droit → triangle RECTANGLE", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Somme des 3 angles = 180°.", font_size=27),
            Text("2. Natures : isocèle, équilatéral, rectangle.", font_size=27),
            Text("3. Constructible si un côté < somme des deux autres.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_definition()
        self.ecran_natures()
        self.ecran_inegalite()
        self.ecran_somme()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Les triangles. Trois longueurs forment-elles
#                     toujours un triangle ? Pas toujours ! Et la somme des angles
#                     fait 180 degrés. »
# [Écran 1 ~0:12]   « Un triangle ABC : trois sommets, A, B et C, ce sont des
#                     points. Et trois côtés, AB, BC et CA, ce sont des segments. »
# [Écran 2 ~0:30]   « Trois natures. Isocèle : deux côtés égaux, marqués pareil.
#                     Équilatéral : les trois côtés égaux. Rectangle : un angle
#                     droit, avec son petit carré. »
# [Écran 3 ~0:50]   « Peut-on construire un triangle de côtés 2, 3 et 8 ? On pose
#                     le grand côté, 8. Du compas, on trace 2 d'un côté et 3 de
#                     l'autre. Les arcs ne se touchent pas : 2 plus 3 égale 5, plus
#                     petit que 8. Impossible ! Avec 4, 5 et 7, ça marche, car 4
#                     plus 5 égale 9, plus grand que 7. »
# [Écran 4 ~1:14]   « La somme des angles fait toujours 180. Si deux angles valent
#                     50 et 60, le troisième, c'est 180 moins 50 moins 60 : 70
#                     degrés. »
# [Défi ~1:32]      « À toi ! Deux angles de 45 degrés. Combien vaut le troisième,
#                     et quelle est la nature du triangle ? Mets pause. »
# [Correction ~1:48] « 45 plus 45 égale 90. 180 moins 90 égale 90. Le troisième
#                     angle est droit : c'est un triangle rectangle. »
# [À retenir ~2:02] « On retient : la somme des angles fait 180 ; on classe par
#                     les côtés ou l'angle droit ; et un triangle n'existe que si un
#                     côté est plus court que la somme des deux autres. À bientôt ! »
