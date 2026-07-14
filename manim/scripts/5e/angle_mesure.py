# angle_mesure.py
# EleveAI — Maths 5e — Les angles (notionId : angle_mesure)
# Mêmes exemples que la fiche lib/fiches/maths-5e-angles.tsx.
# Jumelle de la vidéo 6e (même notionId, mêmes primitives) ; défi recalé 974.
#
# Mapping micro-compétences (banque angles.bank.ts) → écrans :
# - angle_lire    → écran 1 (un angle : sommet + deux côtés + ouverture)
# - angle_estimer → écran 2 (la famille : aigu / droit / obtus / plat, comparer à 90°)
# - angle_mesurer → écran 3 (le rapporteur : centre sur le sommet, lecture 60°)
# - angle_tracer  → écran 3 (mêmes gestes pour tracer)
# - angle_defi    → défi 974 (randonnée 120° : aigu, droit ou obtus ?) + correction
#
# Rendu : python -m manim render -qh manim/scripts/5e/angle_mesure.py AngleMesure5e -o eleveai-maths-5e-angle-mesure --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


def pol(deg, r):
    a = deg * DEGREES
    return np.array([r * np.cos(a), r * np.sin(a), 0])


class AngleMesure5e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def mini_angle(self, center, deg, titre, sous, couleur):
        O = np.array([center[0], center[1], 0])
        r = 1.25
        ray1 = Line(O, O + pol(0, r), color=BLEU_CALCUL, stroke_width=4)
        ray2 = Line(O, O + pol(deg, r), color=BLEU_CALCUL, stroke_width=4)
        arc = Arc(radius=0.45, start_angle=0, angle=deg * DEGREES, arc_center=O, color=ORANGE_RETENUE, stroke_width=4)
        t = Text(titre, font_size=26, color=couleur).move_to(O + [0, -0.9, 0])
        s = Text(sous, font_size=20, color=WHITE).move_to(O + [0, -1.35, 0])
        return VGroup(ray1, ray2, arc, Dot(O, radius=0.05, color=WHITE), t, s)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les angles", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 5e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Comment mesurer une ouverture ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("On la mesure en degrés (°), au rapporteur.", font_size=28, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, scale=1.2))
        self.wait(2.2)

    # ── écran 1 : reconnaître un angle ──────────────────────────────────────

    def ecran_reconnaitre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Un angle : un sommet, deux côtés")

        O = np.array([-2.2, -1.2, 0])
        r = 4.5
        ray1 = Line(O, O + pol(0, r), color=BLEU_CALCUL, stroke_width=5)
        ray2 = Line(O, O + pol(48, r), color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(ray1), Create(ray2))

        dot = Dot(O, radius=0.09, color=WHITE)
        sommet = Text("sommet", font_size=26, color=VERT_OK).next_to(O, DOWN, buff=0.2)
        self.play(GrowFromCenter(dot), Write(sommet))

        arc = Arc(radius=0.9, start_angle=0, angle=48 * DEGREES, arc_center=O, color=ORANGE_RETENUE, stroke_width=5)
        louv = Text("l'ouverture", font_size=24, color=ORANGE_RETENUE).move_to(O + pol(24, 1.7))
        self.play(Create(arc), FadeIn(louv))

        c1 = Text("côté", font_size=24, color=BLEU_CALCUL).next_to(O + pol(0, 3.2), DOWN, buff=0.15)
        c2 = Text("côté", font_size=24, color=BLEU_CALCUL).next_to(O + pol(48, 3.2), UP, buff=0.15)
        self.play(FadeIn(c1), FadeIn(c2))
        self.wait(2.0)

    # ── écran 2 : la famille des angles ─────────────────────────────────────

    def ecran_famille(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. La famille des angles")

        a1 = self.mini_angle([-4.6, 0.4, 0], 40, "Aigu", "moins de 90°", VERT_OK)
        a2 = self.mini_angle([-1.7, 0.4, 0], 90, "Droit", "= 90°", BLEU_CALCUL)
        a3 = self.mini_angle([1.4, 0.4, 0], 130, "Obtus", "entre 90° et 180°", ORANGE_RETENUE)
        Op = np.array([4.6, 0.4, 0])
        plat = VGroup(
            Line(Op + pol(180, 1.25), Op + pol(0, 1.25), color=BLEU_CALCUL, stroke_width=4),
            Arc(radius=0.45, start_angle=0, angle=PI, arc_center=Op, color=ORANGE_RETENUE, stroke_width=4),
            Dot(Op, radius=0.05, color=WHITE),
            Text("Plat", font_size=26, color=VIOLET_ACCENT).move_to(Op + [0, -0.9, 0]),
            Text("= 180°", font_size=20, color=WHITE).move_to(Op + [0, -1.35, 0]),
        )

        carre = Square(0.28, color=BLEU_CALCUL, stroke_width=3).move_to([-1.7 + 0.2, 0.4 + 0.2, 0])

        self.play(FadeIn(a1))
        self.play(FadeIn(a2), Create(carre))
        self.play(FadeIn(a3))
        self.play(FadeIn(plat))
        self.wait(2.4)

    # ── écran 3 : mesurer au rapporteur ─────────────────────────────────────

    def ecran_rapporteur(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Mesurer (et tracer) au rapporteur")

        O = np.array([-0.3, -1.4, 0])
        R = 2.6
        ray1 = Line(O, O + pol(0, R + 0.6), color=BLEU_CALCUL, stroke_width=5)
        ray2 = Line(O, O + pol(60, R + 0.6), color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(ray1), Create(ray2))

        demi = Arc(radius=R, start_angle=0, angle=PI, arc_center=O, color=WHITE, stroke_width=3)
        base = Line(O + pol(180, R), O + pol(0, R), color=WHITE, stroke_width=2)
        ticks = VGroup()
        for d in range(0, 181, 10):
            p1 = O + pol(d, R)
            p2 = O + pol(d, R - (0.28 if d % 30 == 0 else 0.16))
            ticks.add(Line(p1, p2, color=WHITE, stroke_width=2))
        nums = VGroup()
        for d in (0, 30, 60, 90, 120, 150, 180):
            nums.add(Text(str(d), font_size=18, color=WHITE).move_to(O + pol(d, R + 0.28)))
        rapporteur = VGroup(demi, base, ticks, nums)
        self.play(FadeIn(rapporteur), FadeIn(Dot(O, radius=0.07, color=ORANGE_RETENUE)))
        self.wait(0.5)

        centre = Text("centre sur le sommet, 0 sur un côté", font_size=24, color=ORANGE_RETENUE).move_to([0, -2.7, 0])
        self.play(FadeIn(centre))
        self.wait(0.6)

        lecture = Line(O, O + pol(60, R), color=VERT_OK, stroke_width=6)
        val = Text("on lit 60°", font_size=34, color=VERT_OK).move_to(O + pol(60, R) + [0.9, 0.4, 0])
        self.play(Create(lecture), Write(val), Flash(O + pol(60, R), color=VERT_OK))
        self.wait(2.2)

    # ── écran 4 : défi (974) ────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        enonce = Text("Deux chemins de randonnée à La Réunion", font_size=28, color=WHITE).move_to([0, 2.3, 0])
        self.play(Write(enonce))

        O = np.array([-1.0, -0.9, 0])
        r = 3.0
        ray1 = Line(O, O + pol(0, r), color=BLEU_CALCUL, stroke_width=5)
        ray2 = Line(O, O + pol(120, r), color=BLEU_CALCUL, stroke_width=5)
        arc = Arc(radius=0.9, start_angle=0, angle=120 * DEGREES, arc_center=O, color=ORANGE_RETENUE, stroke_width=5)
        val = Text("120°", font_size=32, color=ORANGE_RETENUE).move_to(O + pol(60, 1.6))
        self.play(Create(ray1), Create(ray2), Create(arc), FadeIn(val))

        q = Text("Angle aigu, droit ou obtus ?", font_size=32, color=BLEU_CALCUL).move_to([0, -2.4, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.2))
        self.wait(4.0)

    # ── écran 5 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Un angle droit mesure 90°.", font_size=34, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("120 est entre 90 et 180.", font_size=34, color=WHITE).move_to([0, 0.2, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("Plus grand qu'un angle droit : il est OBTUS.", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un angle = deux demi-droites, un sommet commun.", font_size=27),
            Text("2. On le mesure en degrés (°) avec un rapporteur.", font_size=27),
            Text("3. Droit = 90°, plat = 180°.", font_size=27),
            Text("4. Aigu < 90° < obtus < 180°.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_reconnaitre()
        self.ecran_famille()
        self.ecran_rapporteur()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Les angles. Comment mesurer une ouverture ? En
#                     degrés, avec un rapporteur. »
# [Écran 1 ~0:12]   « Un angle, c'est deux demi-droites qui partent d'un même
#                     point : le sommet. Entre les deux côtés, il y a l'ouverture,
#                     c'est ce qu'on mesure. »
# [Écran 2 ~0:30]   « Quatre familles. Aigu : moins de 90 degrés. Droit :
#                     exactement 90, avec son petit carré. Obtus : entre 90 et 180.
#                     Plat : 180, les deux côtés forment une ligne droite. »
# [Écran 3 ~0:52]   « Le rapporteur : on pose le centre pile sur le sommet, le zéro
#                     sur un côté, et on lit la graduation atteinte par l'autre côté.
#                     Ici, on lit 60 degrés. Pour tracer, c'est les mêmes gestes. »
# [Défi ~1:16]      « À toi ! Deux chemins de randonnée forment un angle de 120
#                     degrés. Aigu, droit ou obtus ? Mets pause. »
# [Correction ~1:32] « Un angle droit, c'est 90. 120, c'est entre 90 et 180 : plus
#                     grand que l'angle droit. C'est donc un angle obtus. »
# [À retenir ~1:48] « On retient : un angle, deux demi-droites et un sommet ; on le
#                     mesure au rapporteur ; droit égale 90, plat égale 180 ; aigu
#                     en dessous de 90, obtus au-dessus. À bientôt ! »
