# graphique.py
# EleveAI — Maths CM2 — Lire un graphique (notionId : graphique)
# Mêmes données que la fiche lib/fiches/maths-cm2-graphiques.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (barres qui poussent, hauteur lue sur l'axe, plus haute qui clignote, camembert).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque graphiques.bank.ts) → écrans :
# - graphique_lire       → écran 1 (barres fruits : letchis = 18)
# - graphique_completer  → écran 2 (bâtons météo : lire la hauteur, jeudi le plus chaud)
# - graphique_interpreter→ écran 3 (barres activités : Foot le plus, 12 − 7 = 5)
# - graphique_defi       → défi + correction (camembert cantine : cari le plus choisi)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/graphique.py GraphiqueCM2 -o eleveai-maths-cm2-graphique --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class GraphiqueCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def diagramme(self, labels, valeurs, couleurs, base=(-3.6, -1.6), bw=1.1, unit=0.16, vmax=30):
        """Un diagramme en barres. Renvoie (axes, list_of_bars, list_of_val_texts)."""
        bx, by = base
        axe_x = Line([bx - 0.4, by, 0], [bx + len(labels) * bw + 0.2, by, 0], stroke_width=3, color=WHITE)
        axe_y = Line([bx - 0.4, by, 0], [bx - 0.4, by + vmax * unit + 0.4, 0], stroke_width=3, color=WHITE)
        grad = VGroup()
        for v in range(0, vmax + 1, 10):
            y = by + v * unit
            grad.add(Line([bx - 0.55, y, 0], [bx - 0.4, y, 0], stroke_width=2, color=WHITE))
            grad.add(Text(str(v), font_size=18, color=WHITE).move_to([bx - 0.85, y, 0]))
        axes = VGroup(axe_x, axe_y, grad)
        bars = []
        vals = []
        labs = VGroup()
        for i, (lab, val, col) in enumerate(zip(labels, valeurs, couleurs)):
            x = bx + i * bw + bw / 2
            h = val * unit
            bar = Rectangle(width=bw * 0.7, height=h, fill_color=col, fill_opacity=0.95, stroke_width=2, color=WHITE)
            bar.move_to([x, by + h / 2, 0])
            bars.append(bar)
            vals.append(Text(str(val), font_size=22, color=WHITE).move_to([x, by + h + 0.28, 0]))
            labs.add(Text(lab, font_size=22, color=col).move_to([x, by - 0.35, 0]))
        return axes, bars, vals, labs

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Lire un graphique", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.3)
        axes, bars, vals, labs = self.diagramme(
            ["Foot", "Danse", "Nage", "Basket"], [12, 9, 7, 10],
            ["#bfdbfe", "#fecdd3", "#bbf7d0", "#fde68a"], base=(-3.0, -1.8))
        self.play(Write(titre), FadeIn(sous))
        self.play(Create(axes))
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.2), FadeIn(labs))
        self.play(*[FadeIn(v) for v in vals])
        self.wait(2.0)

    # ── écran 1 : lire une barre ───────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire une barre")

        axes, bars, vals, labs = self.diagramme(
            ["Ananas", "Bananes", "Mangues", "Letchis"], [24, 28, 15, 18],
            ["#fde68a", "#bbf7d0", "#fed7aa", "#fecdd3"], base=(-3.0, -1.8))
        self.play(Create(axes), FadeIn(labs))
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.15))
        self.play(*[FadeIn(v) for v in vals])
        self.wait(0.4)

        # on lit la barre Letchis (i=3) : trait horizontal vers l'axe.
        b = bars[3]
        top_y = b.get_top()[1]
        trait = DashedLine([b.get_center()[0], top_y, 0], [-3.4, top_y, 0], color=ORANGE_RETENUE, stroke_width=3)
        self.play(Indicate(b, color=ORANGE_RETENUE), Create(trait))
        rep = Text("Letchis = 18", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(rep))
        self.wait(2.0)

    # ── écran 2 : lire la hauteur (météo) ──────────────────────────────────

    def ecran_completer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Lire la hauteur")

        axes, bars, vals, labs = self.diagramme(
            ["Lun", "Mar", "Mer", "Jeu"], [25, 27, 26, 28],
            ["#bfdbfe", "#bbf7d0", "#fde68a", "#fed7aa"], base=(-3.0, -1.8), vmax=30)
        self.play(Create(axes), FadeIn(labs))
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.15))
        self.play(*[FadeIn(v) for v in vals])

        q = Text("Le jour le plus chaud ?", font_size=28, color=WHITE).to_edge(DOWN, buff=0.7)
        self.play(FadeIn(q, shift=UP * 0.2))
        # jeudi (i=3) le plus haut
        box = SurroundingRectangle(bars[3], color=VERT_OK, buff=0.05)
        self.play(Create(box), Flash(bars[3].get_top(), color=VERT_OK))
        rep = Text("Jeudi : 28 °C", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Transform(q, rep))
        self.wait(2.0)

    # ── écran 3 : interpréter (activités) ──────────────────────────────────

    def ecran_interpreter(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Comparer les barres")

        axes, bars, vals, labs = self.diagramme(
            ["Foot", "Danse", "Nage", "Basket"], [12, 9, 7, 10],
            ["#bfdbfe", "#fecdd3", "#bbf7d0", "#fde68a"], base=(-3.0, -1.8))
        self.play(Create(axes), FadeIn(labs))
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.15), *[FadeIn(v) for v in vals])

        box = SurroundingRectangle(bars[0], color=VERT_OK, buff=0.05)
        plus = Text("Le plus choisi : Foot (12)", font_size=28, color=VERT_OK).move_to([2.6, 1.4, 0])
        self.play(Create(box), FadeIn(plus))
        self.wait(0.4)

        diff = Text("Foot 12 − Nage 7 = 5", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.6)
        self.play(Indicate(bars[2], color=ORANGE_RETENUE), Write(diff))
        self.wait(2.0)

    # ── écran 4 : défi (camembert) ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # un camembert de la cantine : cari 16, rougail 14, salade 8, sandwich 12 (total 50).
        parts = [("Cari", 16, "#fed7aa"), ("Rougail", 14, "#fecdd3"), ("Salade", 8, "#bbf7d0"), ("Sandwich", 12, "#bfdbfe")]
        total = sum(v for _, v, _ in parts)
        centre = [-1.8, -0.3, 0]
        r = 1.7
        start = 90
        secteurs = VGroup()
        for lab, v, col in parts:
            ang = 360 * v / total
            sec = AnnularSector(inner_radius=0, outer_radius=r, angle=-ang * DEGREES,
                                start_angle=start * DEGREES, fill_color=col, fill_opacity=0.95,
                                stroke_color=WHITE, stroke_width=2)
            sec.shift(np.array(centre) - sec.get_arc_center())
            secteurs.add(sec)
            start -= ang
        self.play(LaggedStart(*[GrowFromCenter(s) for s in secteurs], lag_ratio=0.25))

        legende = VGroup(*[Text(f"{lab} : {v}", font_size=26, color=col) for lab, v, col in parts])
        legende.arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([2.6, 0.0, 0])
        self.play(FadeIn(legende, shift=RIGHT * 0.2))

        q = Text("Le plat le plus choisi ? Mets pause !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(q))
        self.wait(4.0)

    # ── écran 5 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("La plus grande part du camembert", font_size=32, color=WHITE).move_to([0, 1.0, 0])
        e2 = Text("= Cari (16)", font_size=46, color=ORANGE_RETENUE).next_to(e1, DOWN, buff=0.5)
        self.play(Write(e1))
        self.play(GrowFromCenter(e2))
        self.wait(0.5)

        conclusion = Text("Le cari est le plat le plus choisi", font_size=36, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. La hauteur d'une barre = la quantité (on lit sur l'axe).", font_size=26),
            Text("2. La plus haute barre = le plus ; la plus courte = le moins.", font_size=26),
            Text("3. Un camembert : la plus grande part = le plus fréquent.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_completer()
        self.ecran_interpreter()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Lire un graphique » barres  │ « Un graphique, c'est des chiffres en
#  ~0:00      │                               │   images. Regarde les barres pousser :
#             │                               │   plus une barre est haute, plus il y en a. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  barres fruits + trait letchis│ « Pour lire une barre, ne devine pas.
#  ~0:14      │  → 18                         │   Suis son sommet avec le pointillé jusqu'à
#             │                               │   l'axe de gauche. Les letchis tombent
#             │                               │   pile sur dix-huit. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  bâtons météo → jeudi 28      │ « Quatre jours. Cherche le bâton qui monte
#  ~0:34      │                               │   le plus haut : jeudi. C'est le jour le plus
#             │                               │   chaud, vingt-huit degrés. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  barres activités             │ « Interpréter, c'est comparer. La plus haute,
#  ~0:52      │  Foot 12 ; 12 − 7 = 5        │   c'est le foot. Et l'écart avec la nage ?
#             │                               │   Douze moins sept : cinq élèves de plus. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  camembert cantine            │ « À toi. Le camembert partage un tout en
#  ~1:12      │  Le plus choisi ?            │   parts. Cherche la plus grosse part de
#             │                               │   l'œil. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  Cari (16)                    │ « La plus grosse part, c'est le cari, seize.
#  ~1:28      │                               │   C'est le plat que la cantine préfère. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : la hauteur donne la quantité ;
#  ~1:42      │                               │   la plus haute barre gagne ; et sur un
#             │                               │   camembert, la plus grande part. À bientôt ! »
