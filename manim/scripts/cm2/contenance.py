# contenance.py
# EleveAI — Maths CM2 — Les contenances (notionId : contenance)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-contenances.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (jauges de liquide qui montent, gamme d'unités × 1000, verre doseur).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque contenance.bank.ts) → écrans :
# - contenance_estimer  → écran 1 (verre 250 mL, bouteille 1,5 L, seau 10 L)
# - contenance_comparer → écran 2 (jauges : 1 L vs 500 mL → 1 L plus grand)
# - contenance_convertir→ écran 3 (1 L = 1000 mL ; 1,5 L = 1500 mL, × 1000)
# - contenance_defi     → défi + correction (jus 1 L + sirop 750 mL = 1750 mL)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/contenance.py ContenanceCM2 -o eleveai-maths-cm2-contenance --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class ContenanceCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def bocal(self, center, w=1.6, h=3.0, remplissage=0.0, couleur=BLEU_CALCUL):
        """Un récipient + son liquide (fraction 0→1). Renvoie (contour, liquide)."""
        c = np.array([center[0], center[1], 0])
        contour = VGroup(
            Line(c + [-w / 2, h / 2, 0], c + [-w / 2, -h / 2, 0], stroke_width=4, color=WHITE),
            Line(c + [-w / 2, -h / 2, 0], c + [w / 2, -h / 2, 0], stroke_width=4, color=WHITE),
            Line(c + [w / 2, -h / 2, 0], c + [w / 2, h / 2, 0], stroke_width=4, color=WHITE),
        )
        hl = h * remplissage
        liquide = Rectangle(width=w - 0.08, height=max(hl, 0.001),
                            fill_color=couleur, fill_opacity=0.85, stroke_width=0)
        liquide.move_to(c + [0, -h / 2 + hl / 2, 0])
        return contour, liquide

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les contenances", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.3)
        contour, liquide = self.bocal([-2.8, -0.4, 0], remplissage=0.0)
        cible = self.bocal([-2.8, -0.4, 0], remplissage=0.7)[1]
        accroche = Text("1 L = 1000 mL", font_size=40, color=BLEU_CALCUL).move_to([2.2, 0.3, 0])
        astuce = Text("Ce qu'un récipient peut contenir.", font_size=25, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(Create(contour), FadeIn(liquide))
        self.play(Transform(liquide, cible))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : estimer ──────────────────────────────────────────────────

    def ecran_estimer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Estimer une contenance")

        lignes = [
            ("Cuillère", "5 mL", VERT_OK),
            ("Verre d'eau", "250 mL", VERT_OK),
            ("Grande bouteille", "1,5 L", BLEU_CALCUL),
            ("Seau", "10 L", BLEU_CALCUL),
        ]
        rows = VGroup()
        for nom, m, col in lignes:
            g = VGroup(
                Text(nom, font_size=30, color=WHITE),
                Text("≈ " + m, font_size=30, color=col),
            ).arrange(RIGHT, buff=0.6)
            rows.add(g)
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, -0.2, 0])
        self.play(LaggedStart(*[FadeIn(g, shift=RIGHT * 0.3) for g in rows], lag_ratio=0.3))

        note = Text("Estimer = choisir une contenance raisonnable (pas exacte).", font_size=26, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 2 : comparer (jauges) ────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Comparer 1 L et 500 mL")

        astuce = Text("Même unité d'abord : 1 L = 1000 mL", font_size=28, color=ORANGE_RETENUE).move_to([0, 2.1, 0])
        self.play(FadeIn(astuce, shift=DOWN * 0.2))

        c1, l1 = self.bocal([-2.6, -0.5, 0], remplissage=1.0, couleur=VERT_OK)
        c2, l2 = self.bocal([2.6, -0.5, 0], remplissage=0.5, couleur=BLEU_CALCUL)
        lab1 = Text("1 L = 1000 mL", font_size=26, color=VERT_OK).next_to(c1, DOWN, buff=0.3)
        lab2 = Text("500 mL", font_size=26, color=BLEU_CALCUL).next_to(c2, DOWN, buff=0.3)
        self.play(Create(c1), Create(c2))
        self.play(FadeIn(l1, shift=UP * 0.3), FadeIn(l2, shift=UP * 0.3))
        self.play(FadeIn(lab1), FadeIn(lab2))

        conclusion = Text("1 L est plus grand que 500 mL", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(conclusion), Flash(l1.get_top(), color=VERT_OK))
        self.wait(2.2)

    # ── écran 3 : convertir ────────────────────────────────────────────────

    def ecran_convertir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Convertir en millilitres")

        L = Text("1,5 L", font_size=56, color=WHITE).move_to([-3.0, 0.6, 0])
        fleche = Arrow([-1.4, 0.6, 0], [1.2, 0.6, 0], buff=0.2, color=ORANGE_RETENUE)
        x1000 = Text("× 1000", font_size=32, color=ORANGE_RETENUE).next_to(fleche, UP, buff=0.2)
        mL = Text("1500 mL", font_size=56, color=VERT_OK).move_to([3.0, 0.6, 0])
        self.play(Write(L))
        self.play(GrowArrow(fleche), FadeIn(x1000))
        self.play(TransformFromCopy(L, mL))

        detail = Text("1 L = 1000 mL  et  0,5 L = 500 mL  →  1500 mL", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.7)
        self.play(FadeIn(detail, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 4 : défi ─────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Pour le goûter : une brique de jus de 1 L", font_size=30, color=WHITE).move_to([0, 1.6, 0])
        q2 = Text("et une bouteille de sirop de 750 mL.", font_size=30, color=WHITE).move_to([0, 0.85, 0])
        q3 = Text("Contenance totale en mL ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.05, 0])
        indice = Text("Indice : mets tout en mL d'abord.", font_size=26, color=ORANGE_RETENUE).move_to([0, -0.75, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(q3, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 5 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("1 L = 1000 mL", font_size=36, color=ORANGE_RETENUE).move_to([0, 1.2, 0])
        e2 = Text("1000 + 750 = 1750", font_size=42, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        self.play(Write(e1))
        self.play(FadeIn(e2, shift=DOWN * 0.2))
        self.wait(0.5)

        conclusion = Text("En tout : 1750 mL", font_size=42, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. 1 L = 1000 mL et 1 L = 100 cL.", font_size=27),
            Text("2. Pour comparer ou additionner : la même unité d'abord.", font_size=27),
            Text("3. Estimer = choisir un ordre de grandeur raisonnable.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_estimer()
        self.ecran_comparer()
        self.ecran_convertir()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les contenances » + bocal   │ « Ce qu'un récipient peut contenir, voilà
#  ~0:00      │  1 L = 1000 mL               │   la contenance. Regarde le bocal se
#             │                               │   remplir. Une seule règle : un litre,
#             │                               │   c'est mille millilitres. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  cuillère 5 mL … seau 10 L    │ « Devine avant de mesurer. Une cuillère,
#  ~0:14      │                               │   quelques millilitres. Un seau, des
#             │                               │   litres. Vise le bon ordre de grandeur,
#             │                               │   pas le chiffre exact. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  deux bocaux 1000 mL / 500 mL │ « Un litre contre cinq cents millilitres.
#  ~0:34      │  → 1 L plus grand             │   Mets le litre en millilitres : mille.
#             │                               │   Le niveau parle tout seul, le bocal
#             │                               │   plein l'emporte. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  1,5 L × 1000 = 1500 mL       │ « Des litres vers les millilitres, on
#  ~0:54      │                               │   descend vers le petit : on multiplie par
#             │                               │   mille. Un litre cinq, mille cinq cents
#             │                               │   millilitres. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  jus 1 L + sirop 750 mL       │ « À toi, pour le goûter. Encore deux unités
#  ~1:12      │  Total en mL ?               │   différentes : range-les pareil avant
#             │                               │   d'additionner. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  1 L = 1000 mL                │ « Le jus en millilitres : mille. On ajoute
#  ~1:28      │  1000 + 750 = 1750           │   le sirop, sept cent cinquante. Mille sept
#             │                               │   cent cinquante millilitres en tout. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : mille millilitres dans un
#  ~1:44      │                               │   litre ; même unité avant de comparer ;
#             │                               │   et estimer, c'est viser juste. À bientôt ! »
