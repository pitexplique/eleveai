# sym_centrale.py
# EleveAI — Maths 5e — La symétrie centrale (notionId : sym_centrale)
# Mêmes exemples que la fiche lib/fiches/maths-5e-symetrie-centrale.tsx.
#
# Mapping micro-compétences (banque symetrie_centrale.bank.ts) → écrans :
# - sym_centrale_reconnaitre → écran 1 (définition : demi-tour de 180° autour de O)
# - sym_centrale_point       → écran 2 (image d'un point : O milieu de [AA'])
# - sym_centrale_figure      → écran 3 (image d'une figure : Rotate 180° autour de O)
# - sym_centrale_propriete   → écran 4 (conserve longueurs, angles, aires)
# - sym_centrale_defi        → défi (centrale vs axiale) + correction
#
# Rendu : python -m manim render -qh manim/scripts/5e/sym_centrale.py SymCentrale5e -o eleveai-maths-5e-sym-centrale --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class SymCentrale5e(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def tick(self, p1, p2, color=JAUNE_TITRE):
        mid = (np.array(p1) + np.array(p2)) / 2
        d = normalize(np.array(p2) - np.array(p1))
        perp = np.array([-d[1], d[0], 0]) * 0.14
        return Line(mid - perp, mid + perp, color=color, stroke_width=4)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("La symétrie centrale", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths 5e — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("Un demi-tour autour d'un point.", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous, DOWN, buff=0.9)
        astuce = Text("On fait pivoter la figure de 180° autour du centre O.", font_size=26, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : définition (demi-tour) ────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Un demi-tour autour de O")

        O = np.array([0, 0.1, 0])
        A = np.array([-2.6, 1.1, 0])
        Aim = 2 * O - A  # image de A

        dO = Dot(O, radius=0.09, color=JAUNE_TITRE)
        lO = Text("O", font_size=28, color=JAUNE_TITRE).next_to(O, UR, buff=0.1)
        dA = Dot(A, radius=0.09, color=BLEU_CALCUL)
        lA = Text("A", font_size=28, color=BLEU_CALCUL).next_to(A, UL, buff=0.1)
        self.play(FadeIn(dO), Write(lO), FadeIn(dA), Write(lA))
        self.wait(0.5)

        seg = Line(A, Aim, color=WHITE, stroke_width=3)
        self.play(Create(seg))

        # la flèche qui tourne (demi-tour)
        dAim = Dot(A.copy(), radius=0.09, color=ROUGE_ERREUR)
        self.add(dAim)
        self.play(Rotate(dAim, angle=PI, about_point=O, run_time=1.6))
        lAim = Text("A'", font_size=28, color=ROUGE_ERREUR).next_to(Aim, DR, buff=0.1)
        self.play(Write(lAim))
        self.wait(0.4)

        t1 = self.tick(A, O)
        t2 = self.tick(O, Aim)
        note = Text("O est le milieu de [AA'] : OA = OA'", font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(Create(t1), Create(t2), Write(note))
        self.wait(2.2)

    # ── écran 2 : construire l'image d'un point ─────────────────────────────

    def ecran_point(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Construire l'image d'un point")

        O = np.array([0.2, 0.0, 0])
        A = np.array([-2.8, 1.3, 0])
        Aim = 2 * O - A

        dO = Dot(O, radius=0.09, color=JAUNE_TITRE)
        lO = Text("O", font_size=26, color=JAUNE_TITRE).next_to(O, UP, buff=0.12)
        dA = Dot(A, radius=0.09, color=BLEU_CALCUL)
        lA = Text("A", font_size=26, color=BLEU_CALCUL).next_to(A, UL, buff=0.1)
        self.play(FadeIn(dO), Write(lO), FadeIn(dA), Write(lA))

        e1 = Text("1. Je relie A au centre O...", font_size=28, color=ORANGE_RETENUE).move_to([0, -2.2, 0])
        ray = Line(A, Aim, color=WHITE, stroke_width=3)
        self.play(Write(e1), Create(ray))
        self.wait(0.8)

        e2 = Text("2. ... et je reporte la même distance de l'autre côté.", font_size=26, color=ORANGE_RETENUE).move_to([0, -2.2, 0])
        dAim = Dot(Aim, radius=0.09, color=ROUGE_ERREUR)
        lAim = Text("A'", font_size=26, color=ROUGE_ERREUR).next_to(Aim, DR, buff=0.1)
        t1 = self.tick(A, O)
        t2 = self.tick(O, Aim)
        self.play(Transform(e1, e2), FadeIn(dAim, scale=0.4), Write(lAim), Create(t1), Create(t2))
        self.wait(2.2)

    # ── écran 3 : image d'une figure (Rotate 180°) ──────────────────────────

    def ecran_figure(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Image d'une figure")

        O = np.array([0.2, 0.0, 0])
        pts = [np.array([-3.0, 0.6, 0]), np.array([-1.4, 0.6, 0]), np.array([-3.0, 2.0, 0])]
        F = Polygon(*pts, color=BLEU_CALCUL, stroke_width=5, fill_color=BLEU_CALCUL, fill_opacity=0.3)
        lF = Text("F", font_size=28, color=BLEU_CALCUL).move_to([-2.6, 1.0, 0])
        dO = Dot(O, radius=0.09, color=JAUNE_TITRE)
        lO = Text("O", font_size=26, color=JAUNE_TITRE).next_to(O, DOWN, buff=0.1)
        self.play(Create(F), FadeIn(lF), FadeIn(dO), Write(lO))
        self.wait(0.6)

        note = Text("demi-tour de 180° autour de O", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.6)
        self.play(Write(note))

        Fim = F.copy().set_color(ROUGE_ERREUR).set_fill(ROUGE_ERREUR, opacity=0.3)
        self.add(Fim)
        self.play(Rotate(Fim, angle=PI, about_point=O, run_time=2.0))
        lFim = Text("F'", font_size=28, color=ROUGE_ERREUR).move_to(2 * O - np.array([-2.6, 1.0, 0]))
        self.play(Write(lFim))
        self.wait(2.0)

    # ── écran 4 : les propriétés ────────────────────────────────────────────

    def ecran_proprietes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Ce qu'elle conserve")

        lignes = VGroup(
            Text("Les longueurs  →  un segment de 5 cm reste 5 cm", font_size=30, color=WHITE),
            Text("Les angles  →  un angle de 40° reste 40°", font_size=30, color=WHITE),
            Text("Les aires  →  la figure image a la même aire", font_size=30, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.7).move_to([0, 0.3, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=0.2 * RIGHT) for l in lignes], lag_ratio=0.4))
        self.wait(0.8)

        note = Text("La figure est IDENTIQUE, juste retournée.", font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(Write(note))
        self.wait(2.2)

    # ── écran 5 : défi (centrale vs axiale) ─────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("Quelle est la différence entre", font_size=32, color=WHITE).move_to([0, 1.3, 0])
        q2 = Text("symétrie AXIALE et symétrie CENTRALE ?", font_size=32, color=BLEU_CALCUL).move_to([0, 0.5, 0])
        self.play(Write(q1), Write(q2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Axiale : un AXE (miroir) → figure réfléchie", font_size=30, color=BLEU_CALCUL).move_to([0, 1.2, 0])
        self.play(Write(e1))
        self.wait(0.8)

        e2 = Text("Centrale : un CENTRE (demi-tour) → figure retournée", font_size=30, color=VERT_OK).move_to([0, 0.1, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("L'une réfléchit, l'autre fait un demi-tour.", font_size=32, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.9)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Symétrie centrale = demi-tour de 180° autour de O.", font_size=27),
            Text("2. O est le milieu de [AA'] : OA = OA'.", font_size=27),
            Text("3. Elle conserve longueurs, angles et aires.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_definition()
        self.ecran_point()
        self.ecran_figure()
        self.ecran_proprietes()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! La symétrie centrale. C'est un demi-tour autour d'un
#                     point : on fait pivoter la figure de 180 degrés autour du
#                     centre O. »
# [Écran 1 ~0:12]   « Voilà un point A et le centre O. On fait faire un demi-tour à
#                     A autour de O : il arrive en A'. Regarde : O est pile au milieu
#                     de A et A'. Les distances OA et OA' sont égales. »
# [Écran 2 ~0:34]   « Pour construire l'image : d'abord je relie A au centre O.
#                     Ensuite, de l'autre côté de O, je reporte la même distance.
#                     J'obtiens A'. »
# [Écran 3 ~0:54]   « Pour une figure entière, c'est pareil : un demi-tour de 180
#                     degrés autour de O. La figure bleue F devient la figure rouge
#                     F', identique mais retournée. »
# [Écran 4 ~1:16]   « La symétrie centrale conserve tout : les longueurs, un segment
#                     de 5 reste 5 ; les angles, un angle de 40 reste 40 ; et les
#                     aires. La figure est identique, juste retournée. »
# [Défi ~1:36]      « À toi ! Quelle est la différence entre symétrie axiale et
#                     symétrie centrale ? Mets pause. »
# [Correction ~1:52] « L'axiale, c'est un axe, un miroir : la figure est réfléchie.
#                     La centrale, c'est un centre, un demi-tour : la figure est
#                     retournée. L'une réfléchit, l'autre pivote. »
# [À retenir ~2:10] « On retient : symétrie centrale, demi-tour de 180 autour de O ;
#                     O est le milieu de A A prime ; et ça conserve longueurs, angles
#                     et aires. À bientôt ! »
