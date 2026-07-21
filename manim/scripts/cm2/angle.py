# angle.py
# EleveAI — Maths CM2 — Les angles (notionId : angle)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-angles.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. VARIÉTÉ
# D'ANIMATIONS (angle qui s'ouvre, familles, rapporteur gradué, horloge) + légendes distribuées.
#
# Mapping micro-compétences (banque angles.bank.ts) → écrans :
# - angle_reconnaitre → écran 1 (un angle : sommet + deux côtés + ouverture)
# - angle_type/droit  → écran 2 (la famille : aigu / droit / obtus / plat)
# - angle_mesurer     → écran 3 (le rapporteur : centre sur le sommet, lecture 60°)
# - angle_defi        → défi (horloge à 3 h : quel angle ?) + correction (90°, angle droit)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/angle.py AngleCM2 -o eleveai-maths-cm2-angle --media_dir manim/scripts/cm2/media

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


class AngleCM2(Scene):

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
        titre = Text("Les angles", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Aigu, droit ou obtus ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("Un angle, c'est une ouverture. On compare à l'angle droit.", font_size=26, color=VERT_OK).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, scale=1.15))
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
        self.play(Create(ray1))
        self.play(Create(ray2))

        dot = Dot(O, radius=0.09, color=WHITE)
        sommet = Text("sommet", font_size=26, color=VERT_OK).next_to(O, DOWN, buff=0.2)
        self.play(GrowFromCenter(dot), Write(sommet))

        arc = Arc(radius=0.9, start_angle=0, angle=48 * DEGREES, arc_center=O, color=ORANGE_RETENUE, stroke_width=5)
        louv = Text("l'ouverture", font_size=24, color=ORANGE_RETENUE).move_to(O + pol(24, 1.7))
        self.play(Create(arc), FadeIn(louv))

        c1 = Text("côté", font_size=24, color=BLEU_CALCUL).next_to(O + pol(0, 3.2), DOWN, buff=0.15)
        c2 = Text("côté", font_size=24, color=BLEU_CALCUL).next_to(O + pol(48, 3.2), UP, buff=0.15)
        self.play(FadeIn(c1), FadeIn(c2))

        note = Text("La longueur des côtés ne change rien : c'est l'ouverture qui compte.",
                    font_size=24, color=WHITE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.0)

    # ── écran 2 : la famille des angles ─────────────────────────────────────

    def ecran_famille(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Les familles d'angles")

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
        note = Text("On compare toujours à l'angle droit (90°).", font_size=26, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.4)

    # ── écran 3 : mesurer au rapporteur ─────────────────────────────────────

    def ecran_rapporteur(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Mesurer au rapporteur")

        O = np.array([-0.3, -1.4, 0])
        R = 2.6
        ray1 = Line(O, O + pol(0, R + 0.6), color=BLEU_CALCUL, stroke_width=5)
        ray2 = Line(O, O + pol(60, R + 0.6), color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(ray1), Create(ray2))

        demi = Arc(radius=R, start_angle=0, angle=PI, arc_center=O, color=WHITE, stroke_width=3)
        base = Line(O + pol(180, R), O + pol(0, R), color=WHITE, stroke_width=2)
        ticks = VGroup()
        for dgr in range(0, 181, 10):
            p1 = O + pol(dgr, R)
            p2 = O + pol(dgr, R - (0.28 if dgr % 30 == 0 else 0.16))
            ticks.add(Line(p1, p2, color=WHITE, stroke_width=2))
        nums = VGroup()
        for dgr in (0, 30, 60, 90, 120, 150, 180):
            nums.add(Text(str(dgr), font_size=18, color=WHITE).move_to(O + pol(dgr, R + 0.28)))
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

    # ── écran 4 : défi (l'horloge à 3 h) ───────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        O = np.array([0, 0.2, 0])
        cadran = Circle(radius=1.9, color=WHITE, stroke_width=4).move_to(O)
        # les 12 repères
        reperes = VGroup(*[Line(O + pol(90 - 30 * k, 1.9), O + pol(90 - 30 * k, 1.7), color=WHITE, stroke_width=3) for k in range(12)])
        douze = Text("12", font_size=24, color=WHITE).move_to(O + pol(90, 1.55))
        trois = Text("3", font_size=24, color=WHITE).move_to(O + pol(0, 1.55))
        # aiguilles : la grande sur 12 (haut), la petite sur 3 (droite)
        gr = Line(O, O + pol(90, 1.6), color=BLEU_CALCUL, stroke_width=6)
        pt = Line(O, O + pol(0, 1.2), color=ORANGE_RETENUE, stroke_width=8)
        self.play(Create(cadran), Create(reperes), FadeIn(douze), FadeIn(trois))
        self.play(Create(gr), Create(pt), FadeIn(Dot(O, radius=0.08, color=WHITE)))

        q = Text("À 3 heures, quel angle forment les aiguilles ?", font_size=30, color=BLEU_CALCUL).move_to([0, -2.2, 0])
        pause = Text("Mets pause et cherche !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 5 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        O = np.array([-3.2, 0.1, 0])
        gr = Line(O, O + pol(90, 1.8), color=BLEU_CALCUL, stroke_width=6)
        pt = Line(O, O + pol(0, 1.8), color=ORANGE_RETENUE, stroke_width=6)
        marque = Square(0.32, color=VERT_OK, stroke_width=4).move_to(O + [0.2, 0.2, 0])
        self.play(Create(gr), Create(pt))
        self.play(Create(marque))

        e1 = Text("De 12 à 3 : un quart de tour.", font_size=32, color=WHITE).move_to([2.0, 1.0, 0])
        e2 = Text("Un tour = 360°, donc 360 ÷ 4 = 90°.", font_size=30, color=BLEU_CALCUL).move_to([2.0, 0.1, 0])
        self.play(Write(e1))
        self.play(Write(e2))
        self.wait(0.6)

        conclusion = Text("Les aiguilles forment un angle droit (90°).", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un angle = deux demi-droites qui partent d'un sommet.", font_size=27),
            Text("2. C'est l'ouverture qui compte, pas la longueur des côtés.", font_size=27),
            Text("3. Aigu < 90°, droit = 90°, obtus entre 90° et 180°, plat = 180°.", font_size=27),
            Text("4. On mesure en degrés (°) avec un rapporteur.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
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
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! Les angles. Aigu, droit ou obtus ? Un angle, c'est
#                      une ouverture. On la compare toujours à l'angle droit. »
# [Écran 1 ~0:14]    « Un angle, c'est deux côtés qui partent d'un même point : le
#                      sommet. Entre les deux, l'ouverture. La longueur des côtés
#                      ne change rien ! »
# [Écran 2 ~0:34]    « Quatre familles. L'aigu, plus petit que l'angle droit. Le
#                      droit, quatre-vingt-dix degrés, avec son petit carré. L'obtus,
#                      plus grand. Et le plat, cent quatre-vingts degrés. »
# [Écran 3 ~0:54]    « Pour mesurer : le rapporteur. Le centre sur le sommet, le zéro
#                      sur un côté. On suit l'autre côté et on lit : soixante degrés. »
# [Défi ~1:14]       « À toi ! À trois heures, quel angle forment les aiguilles de
#                      l'horloge ? Mets pause. »
# [Correction ~1:30] « De midi à trois heures, c'est un quart de tour. Un tour fait
#                      trois cent soixante degrés ; le quart, quatre-vingt-dix. Les
#                      aiguilles forment un angle droit. »
# [À retenir ~1:48]  « On retient : un angle, deux côtés, un sommet. C'est
#                      l'ouverture qui compte. Aigu, droit, obtus, plat. Et on mesure
#                      au rapporteur. À bientôt ! »
