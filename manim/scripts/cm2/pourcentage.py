# pourcentage.py
# EleveAI — Maths CM2 — Les pourcentages (notionId : pourcentage)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-pourcentages.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (grille de 100 qui se colorie, barre partagée, roue en secteurs, prix qui
# baisse). Légendes DISTRIBUÉES.
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque pourcentages.bank.ts) → écrans :
# - pourcentage_comprendre       → écran 1 (grille 100 : 50 % puis 25 %)
# - pourcentage_fraction_decimal → écran 2 (50 % = 1/2 = 0,5 ; 25 % = 1/4 ; 75 % = 3/4)
# - pourcentage_calculer         → écran 3 (50 % de 80 = 40 ; 10 % de 70 = 7)
# - pourcentage_probleme         → écran 4 (camembert : 24 élèves, 50 % chorale = 12)
# - pourcentage_defi             → défi + correction (marché : panier 80 € − 25 % = 60 €)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/pourcentage.py PourcentageCM2 -o eleveai-maths-cm2-pourcentage --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class PourcentageCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def grille100(self, center, cell=0.34):
        """10×10 cases. Renvoie (groupe, liste ordonnée des cases par ligne)."""
        c = np.array([center[0], center[1], 0])
        cases = []
        grp = VGroup()
        for r in range(10):
            for col in range(10):
                x = c[0] + (col - 4.5) * cell
                y = c[1] + (4.5 - r) * cell
                sq = Square(cell, stroke_width=1.5, color=GREY).move_to([x, y, 0])
                sq.set_fill("#0b1b2b", opacity=1)
                cases.append(sq)
                grp.add(sq)
        return grp, cases

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les pourcentages", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("% = sur 100", font_size=42, color=BLEU_CALCUL).next_to(sous, DOWN, buff=0.8)
        astuce = Text("50 %, c'est 50 cases coloriées sur 100.", font_size=26, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : comprendre (grille) ──────────────────────────────────────

    def ecran_comprendre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Une part sur 100")

        grp, cases = self.grille100([-2.4, -0.3, 0])
        self.play(Create(grp), run_time=1.2)

        # colorie 50 cases (5 lignes).
        moit = [cases[i] for i in range(50)]
        self.play(LaggedStart(*[sq.animate.set_fill(BLEU_CALCUL, opacity=0.9) for sq in moit], lag_ratio=0.01))
        lab50 = Text("50 % = 50/100\n= la moitié", font_size=30, color=VERT_OK, line_spacing=0.9).move_to([3.2, 0.4, 0])
        self.play(FadeIn(lab50, shift=RIGHT * 0.2))
        self.wait(1.0)

        # on ramène à 25 cases (un quart).
        self.play(*[cases[i].animate.set_fill("#0b1b2b", opacity=1) for i in range(25, 50)])
        lab25 = Text("25 % = 25/100\n= un quart", font_size=30, color=ORANGE_RETENUE, line_spacing=0.9).move_to([3.2, -1.0, 0])
        self.play(FadeIn(lab25, shift=RIGHT * 0.2))
        self.wait(2.0)

    # ── écran 2 : fraction & décimal ───────────────────────────────────────

    def ecran_fraction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Fraction et décimal")

        # une barre partagée en 4, 3 parts coloriées = 75 %.
        largeur, h = 8.0, 0.9
        pas = largeur / 4
        x0 = -largeur / 2
        parts = VGroup()
        for i in range(4):
            r = Rectangle(width=pas, height=h, stroke_width=2, color=WHITE).move_to([x0 + pas * (i + 0.5), 0.6, 0])
            parts.add(r)
        self.play(Create(parts))
        self.play(LaggedStart(*[parts[i].animate.set_fill(BLEU_CALCUL, opacity=0.85) for i in range(3)], lag_ratio=0.2))

        lab = Text("3 parts sur 4 coloriées", font_size=26, color=WHITE).move_to([0, -0.4, 0])
        self.play(FadeIn(lab, shift=UP * 0.2))
        conclusion = Text("75 % = 3/4 = 0,75", font_size=44, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : calculer ─────────────────────────────────────────────────

    def ecran_calculer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Calculer un pourcentage")

        e1 = Text("50 % de 80", font_size=44, color=WHITE).move_to([-3.0, 1.2, 0])
        f1 = Text("÷ 2", font_size=30, color=ORANGE_RETENUE).next_to(e1, DOWN, buff=0.3)
        r1 = Text("= 40", font_size=44, color=VERT_OK).next_to(e1, RIGHT, buff=0.4)
        self.play(Write(e1))
        self.play(FadeIn(f1, shift=UP * 0.2))
        self.play(TransformFromCopy(e1, r1))
        self.wait(0.6)

        e2 = Text("10 % de 70", font_size=44, color=WHITE).move_to([-3.0, -1.2, 0])
        f2 = Text("÷ 10", font_size=30, color=ORANGE_RETENUE).next_to(e2, DOWN, buff=0.3)
        r2 = Text("= 7", font_size=44, color=VERT_OK).next_to(e2, RIGHT, buff=0.4)
        self.play(Write(e2))
        self.play(FadeIn(f2, shift=UP * 0.2))
        self.play(TransformFromCopy(e2, r2))

        note = Text("50 % → ÷ 2   ·   25 % → ÷ 4   ·   10 % → ÷ 10", font_size=26, color=BLEU_CALCUL).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 4 : problème (camembert) ─────────────────────────────────────

    def ecran_probleme(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. La chorale")

        enonce = Text("24 élèves, 50 % font de la chorale", font_size=30, color=WHITE).move_to([0, 2.0, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.2))

        # un camembert coupé en deux moitiés.
        centre = [-2.6, -0.4, 0]
        r = 1.5
        moitie1 = Sector(outer_radius=r, angle=PI, start_angle=PI / 2, fill_color=VERT_OK, fill_opacity=0.9, color=WHITE, stroke_width=3).move_to(centre)
        moitie1.shift(np.array(centre) - moitie1.get_arc_center())
        moitie2 = Sector(outer_radius=r, angle=PI, start_angle=-PI / 2, fill_color="#94a3b8", fill_opacity=0.9, color=WHITE, stroke_width=3)
        moitie2.shift(np.array(centre) - moitie2.get_arc_center())
        self.play(GrowFromCenter(moitie2), GrowFromCenter(moitie1))
        l1 = Text("chorale\n12", font_size=26, color=VERT_OK, line_spacing=0.8).move_to([-2.6, 0.6, 0])
        l2 = Text("autres\n12", font_size=24, color=WHITE, line_spacing=0.8).move_to([-2.6, -1.4, 0])
        self.play(FadeIn(l1), FadeIn(l2))

        calc = Text("50 % de 24\n= 24 ÷ 2\n= 12 élèves", font_size=34, color=BLEU_CALCUL, line_spacing=0.9).move_to([3.0, -0.3, 0])
        self.play(FadeIn(calc, shift=RIGHT * 0.2))
        self.wait(2.2)

    # ── écran 5 : défi (marché) ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Au marché : un panier gourmand à 80 €.", font_size=32, color=WHITE).move_to([0, 1.6, 0])
        q2 = Text("Réduction de 25 %.", font_size=32, color=WHITE).move_to([0, 0.85, 0])
        q3 = Text("Quel est le prix final ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.05, 0])
        indice = Text("Indice : 25 % = un quart. La réduction, puis le reste.", font_size=26, color=ORANGE_RETENUE).move_to([0, -0.75, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(q3, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Réduction : 25 % de 80 = 80 ÷ 4 = 20 €", font_size=32, color=ORANGE_RETENUE).move_to([0, 1.2, 0])
        e2 = Text("Prix final : 80 − 20 = 60 €", font_size=36, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        self.play(Write(e1))
        self.play(FadeIn(e2, shift=DOWN * 0.2))
        self.wait(0.5)

        note = Text("On paie les 75 % restants.", font_size=28, color=WHITE).move_to([0, -0.9, 0])
        self.play(FadeIn(note, shift=UP * 0.2))
        conclusion = Text("Prix final : 60 €", font_size=42, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. % veut dire « sur 100 » : 50 % = 50/100.", font_size=27),
            Text("2. 50 % = 1/2 ; 25 % = 1/4 ; 10 % = 1/10.", font_size=27),
            Text("3. 50 % → ÷ 2 ; 25 % → ÷ 4 ; 10 % → ÷ 10.", font_size=27),
            Text("4. Réduction : on calcule la part, puis on la soustrait.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_comprendre()
        self.ecran_fraction()
        self.ecran_calculer()
        self.ecran_probleme()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les pourcentages »          │ « Un seul secret à retenir aujourd'hui :
#  ~0:00      │  % = sur 100                  │   le petit symbole pour cent, ça veut
#             │                               │   toujours dire « sur cent ». »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  grille 100 : 50 % → 25 %     │ « Regarde la grille se remplir : la
#  ~0:14      │                               │   moitié qui s'allume, c'est cinquante
#             │                               │   pour cent. J'en éteins la moitié : il
#             │                               │   reste un quart, vingt-cinq pour cent. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  barre 3/4 → 75 % = 3/4 = 0,75│ « Trois parts sur quatre coloriées.
#  ~0:34      │                               │   Suis-les : ça fait trois quarts. Et
#             │                               │   trois quarts, ça se dit aussi soixante-
#             │                               │   quinze pour cent, ou zéro virgule
#             │                               │   soixante-quinze. Trois écritures, pareil. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  50 % de 80 = 40              │ « Prendre un pourcentage, c'est diviser.
#  ~0:56      │  10 % de 70 = 7              │   Cinquante pour cent : coupe en deux.
#             │  ÷2 · ÷4 · ÷10               │   Dix pour cent : coupe en dix. Retiens ces
#             │                               │   trois divisions, tu iras vite. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 4    │  camembert 12 / 12           │ « La moitié de la classe, en vrai combien ?
#  ~1:16      │  50 % de 24 = 12             │   Vingt-quatre élèves coupés en deux :
#             │                               │   douze. Le camembert te le montre, moitié
#             │                               │   verte, moitié grise. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  panier 80 €, − 25 %          │ « À toi. Attention au piège : on ne te
#  ~1:36      │  Prix final ?                 │   demande pas la réduction, mais ce que tu
#             │                               │   paies au bout. Deux étapes. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  25 % de 80 = 20              │ « La réduction d'abord : un quart de
#  ~1:52      │  80 − 20 = 60 €              │   quatre-vingts, vingt euros. Et le prix
#             │                               │   final, c'est ce qui reste : quatre-vingts
#             │                               │   moins vingt, soixante euros. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 4 points                 │ « Trois réflexes : pour cent veut dire sur
#  ~2:10      │                               │   cent ; les fractions clés, moitié, quart,
#             │                               │   dixième ; et pour une réduction, on
#             │                               │   soustrait la part. À bientôt ! »
