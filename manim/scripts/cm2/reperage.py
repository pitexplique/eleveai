# reperage.py
# EleveAI — Maths CM2 — Le repérage (notionId : reperage)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-reperage.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (quadrillage, point qui se pose, lecture x puis y, chemin fléché vers le trésor).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque reperage.bank.ts) → écrans :
# - reperage_quadrillage  → écran 1 (le quadrillage, l'origine, les axes)
# - reperage_coordonnees  → écran 2 (lire A : x d'abord (2), puis y (3) → A(2 ; 3))
# - reperage_placer_point → écran 3 (placer B(4 ; 1))
# - reperage_deplacement  → écran 4 (chemin : 3 à droite, 2 en haut)
# - reperage_defi         → défi + correction (trésor : (0;0) → 4 droite, 3 haut → (4 ; 3))
#
# Rendu : python -m manim render -qh manim/scripts/cm2/reperage.py ReperageCM2 -o eleveai-maths-cm2-reperage --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
ORANGE = "#f97316"
VIOLET = "#8b5cf6"


class ReperageCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def grille(self, n=5, u=0.9, origin=(-3.2, -2.0)):
        """Quadrillage n×n + axes + graduations. Renvoie (groupe, xy(i,j))."""
        ox, oy = origin
        grp = VGroup()
        for i in range(n + 1):
            grp.add(Line([ox + i * u, oy, 0], [ox + i * u, oy + n * u, 0], stroke_width=1.5, color="#3b4a5a"))
            grp.add(Line([ox, oy + i * u, 0], [ox + n * u, oy + i * u, 0], stroke_width=1.5, color="#3b4a5a"))
        axe_x = Arrow([ox, oy, 0], [ox + n * u + 0.4, oy, 0], buff=0, stroke_width=4, color=BLEU_CALCUL)
        axe_y = Arrow([ox, oy, 0], [ox, oy + n * u + 0.4, 0], buff=0, stroke_width=4, color=VERT_OK)
        grp.add(axe_x, axe_y)
        for i in range(n + 1):
            grp.add(Text(str(i), font_size=20, color=BLEU_CALCUL).move_to([ox + i * u, oy - 0.32, 0]))
            grp.add(Text(str(i), font_size=20, color=VERT_OK).move_to([ox - 0.32, oy + i * u, 0]))
        grp.add(Text("0", font_size=20, color=WHITE).move_to([ox - 0.32, oy - 0.32, 0]))

        def xy(i, j):
            return np.array([ox + i * u, oy + j * u, 0])

        return grp, xy

    def point(self, pos, label, color):
        d = Dot(pos, radius=0.12, color=color)
        t = Text(label, font_size=26, color=color).next_to(d, UR, buff=0.08)
        return VGroup(d, t)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Le repérage", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.3)
        g, xy = self.grille(n=5, origin=(-2.4, -2.2))
        A = self.point(xy(2, 3), "A(2 ; 3)", ROUGE)
        astuce = Text("Deux nombres : x puis y", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.4)
        self.play(Write(titre), FadeIn(sous))
        self.play(Create(g))
        self.play(GrowFromCenter(A))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : le quadrillage ───────────────────────────────────────────

    def ecran_quadrillage(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le quadrillage")

        g, xy = self.grille(n=5, origin=(-2.0, -2.2))
        self.play(Create(g))

        orig = Text("l'origine (0 ; 0)", font_size=24, color=WHITE).next_to(xy(0, 0), DL, buff=0.1).shift(DOWN * 0.1)
        self.play(FadeIn(orig, shift=UP * 0.1), Flash(xy(0, 0), color=JAUNE_TITRE))
        ax = Text("x : l'horizontale →", font_size=24, color=BLEU_CALCUL).move_to([3.2, -1.4, 0])
        ay = Text("y : la verticale ↑", font_size=24, color=VERT_OK).move_to([3.2, 1.4, 0])
        self.play(FadeIn(ax, shift=LEFT * 0.2))
        self.play(FadeIn(ay, shift=DOWN * 0.2))
        self.wait(2.0)

    # ── écran 2 : lire les coordonnées ─────────────────────────────────────

    def ecran_coordonnees(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Lire les coordonnées de A")

        g, xy = self.grille(n=5, origin=(-2.0, -2.2))
        self.play(Create(g))
        A = self.point(xy(2, 3), "A", ROUGE)
        self.play(GrowFromCenter(A))

        # x d'abord : flèche horizontale de l'origine
        fx = Arrow(xy(0, 0), xy(2, 0), buff=0, color=BLEU_CALCUL, stroke_width=5)
        lx = Text("x = 2", font_size=26, color=BLEU_CALCUL).next_to(fx, DOWN, buff=0.15)
        self.play(GrowArrow(fx), FadeIn(lx))
        # puis y : flèche verticale
        fy = Arrow(xy(2, 0), xy(2, 3), buff=0, color=VERT_OK, stroke_width=5)
        ly = Text("y = 3", font_size=26, color=VERT_OK).next_to(fy, RIGHT, buff=0.15)
        self.play(GrowArrow(fy), FadeIn(ly))

        conclusion = Text("A(2 ; 3)", font_size=44, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 3 : placer un point ──────────────────────────────────────────

    def ecran_placer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Placer B(4 ; 1)")

        g, xy = self.grille(n=5, origin=(-2.0, -2.2))
        self.play(Create(g))

        fx = Arrow(xy(0, 0), xy(4, 0), buff=0, color=BLEU_CALCUL, stroke_width=5)
        self.play(GrowArrow(fx), run_time=0.8)
        fy = Arrow(xy(4, 0), xy(4, 1), buff=0, color=VERT_OK, stroke_width=5)
        self.play(GrowArrow(fy), run_time=0.6)
        B = self.point(xy(4, 1), "B", ORANGE)
        self.play(GrowFromCenter(B), Flash(xy(4, 1), color=ORANGE))

        note = Text("4 vers la droite, puis 1 vers le haut", font_size=28, color=WHITE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.0)

    # ── écran 4 : se déplacer ──────────────────────────────────────────────

    def ecran_deplacement(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Suivre un chemin")

        g, xy = self.grille(n=5, origin=(-2.0, -2.2))
        self.play(Create(g))
        D = self.point(xy(1, 1), "D", VIOLET)
        self.play(GrowFromCenter(D))

        # 3 à droite
        f1 = Arrow(xy(1, 1), xy(4, 1), buff=0, color=VIOLET, stroke_width=5)
        t1 = Text("3 à droite", font_size=24, color=VIOLET).next_to(f1, DOWN, buff=0.15)
        self.play(GrowArrow(f1), FadeIn(t1))
        # 2 en haut
        f2 = Arrow(xy(4, 1), xy(4, 3), buff=0, color=VIOLET, stroke_width=5)
        t2 = Text("2 en haut", font_size=24, color=VIOLET).next_to(f2, RIGHT, buff=0.15)
        self.play(GrowArrow(f2), FadeIn(t2))

        arr = self.point(xy(4, 3), "(4 ; 3)", VERT_OK)
        self.play(GrowFromCenter(arr), Flash(xy(4, 3), color=VERT_OK))
        conclusion = Text("On arrive en (4 ; 3)", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 5 : défi (trésor) ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : le trésor", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        g, xy = self.grille(n=6, u=0.8, origin=(-2.4, -2.4))
        self.play(Create(g))
        depart = self.point(xy(0, 0), "Départ", VIOLET)
        self.play(GrowFromCenter(depart))

        consigne = Text("4 cases à droite, puis 3 en haut", font_size=26, color=WHITE).to_edge(DOWN, buff=1.0)
        pause = Text("Où est le trésor ? Mets pause !", font_size=28, color=ORANGE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(consigne, shift=UP * 0.2))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        g, xy = self.grille(n=6, u=0.8, origin=(-2.4, -2.4))
        self.play(Create(g))
        depart = self.point(xy(0, 0), "Départ", VIOLET)
        self.play(GrowFromCenter(depart))

        f1 = Arrow(xy(0, 0), xy(4, 0), buff=0, color=BLEU_CALCUL, stroke_width=5)
        f2 = Arrow(xy(4, 0), xy(4, 3), buff=0, color=VERT_OK, stroke_width=5)
        self.play(GrowArrow(f1))
        self.play(GrowArrow(f2))
        tresor = self.point(xy(4, 3), "Trésor (4 ; 3)", ORANGE)
        self.play(GrowFromCenter(tresor), Flash(xy(4, 3), color=ORANGE))

        conclusion = Text("Le trésor est en (4 ; 3)", font_size=36, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un point se repère par deux nombres : (x ; y).", font_size=27),
            Text("2. On lit x d'abord (horizontale →), puis y (verticale ↑).", font_size=27),
            Text("3. L'origine (0 ; 0) est en bas à gauche.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_quadrillage()
        self.ecran_coordonnees()
        self.ecran_placer()
        self.ecran_deplacement()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Le repérage » + point A     │ « Comme à la bataille navale : pour dire
#  ~0:00      │  x puis y                     │   où est un point, il faut deux nombres.
#             │                               │   Et l'ordre compte, tu vas voir. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  quadrillage + origine        │ « Repère d'abord le coin en bas à gauche :
#  ~0:14      │  x → · y ↑                    │   c'est le zéro-zéro, le point de départ de
#             │                               │   tout. De là part l'horizontale, bleue, et
#             │                               │   la verticale, verte. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  flèche x=2 puis y=3          │ « Pour lire A, suis d'abord la flèche bleue
#  ~0:32      │  → A(2 ; 3)                   │   qui compte deux vers la droite. Ensuite
#             │                               │   seulement, la verte qui monte de trois.
#             │                               │   Deux, puis trois. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  placer B(4 ; 1)              │ « L'inverse maintenant : on te donne les
#  ~0:52      │                               │   nombres, tu poses le point. Quatre vers la
#             │                               │   droite, un vers le haut. Là, B se pose. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 4    │  chemin 3 droite, 2 haut      │ « Un chemin, ce sont des flèches à suivre.
#  ~1:10      │  → (4 ; 3)                    │   Pars de D, avance de trois, tourne, monte
#             │                               │   de deux. Regarde où le violet s'arrête. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  grille + départ (0 ; 0)      │ « À toi, chasse au trésor. Depuis le départ :
#  ~1:30      │  4 à droite, 3 en haut        │   quatre à droite, trois en haut. Suis du
#             │                               │   doigt et donne les coordonnées. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  trésor (4 ; 3)               │ « Quatre vers la droite, la ligne du bas ;
#  ~1:46      │                               │   puis trois en montant. Le trésor est en
#             │                               │   quatre-trois. Bien joué ! »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : deux nombres pour un point ;
#  ~2:00      │                               │   x d'abord, y ensuite ; et on part toujours
#             │                               │   du zéro-zéro, en bas à gauche. À bientôt ! »
