# masse.py
# EleveAI — Maths CM2 — Les masses (notionId : masse)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-masses.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (balance qui penche, gamme d'unités × 1000, conversion, panier du marché).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque masses.bank.ts) → écrans :
# - masse_estimer  → écran 1 (objets → masse raisonnable : crayon 10 g, cartable 3 kg)
# - masse_comparer → écran 2 (balance : 1 kg vs 1200 g → 1200 g plus lourd)
# - masse_convertir→ écran 3 (1 kg = 1000 g ; 1,5 kg = 1500 g, × 1000)
# - masse_defi     → défi + correction (marché : mangue 350 g + ananas 1,2 kg = 1550 g)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/masse.py MasseCM2 -o eleveai-maths-cm2-masse --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


class MasseCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def balance(self, center, tilt=0.0):
        """Une balance à fléau. tilt > 0 : côté droit descend. Renvoie le groupe."""
        c = np.array([center[0], center[1], 0])
        colonne = Line(c + [0, -1.3, 0], c + [0, 0.8, 0], stroke_width=6, color=WHITE)
        socle = Line(c + [-0.9, -1.3, 0], c + [0.9, -1.3, 0], stroke_width=6, color=WHITE)
        pivot = c + [0, 0.8, 0]
        dx, dy = 2.0, tilt
        left = pivot + [-dx, dy, 0]
        right = pivot + [dx, -dy, 0]
        fleau = Line(left, right, stroke_width=5, color=BLEU_CALCUL)
        pan_l = self.plateau(left)
        pan_r = self.plateau(right)
        return VGroup(socle, colonne, fleau, pan_l, pan_r), left, right

    def plateau(self, top):
        cup = Arc(radius=0.5, start_angle=PI, angle=PI, color=WHITE, stroke_width=4).move_to(top + [0, -0.55, 0])
        s1 = Line(top, top + [-0.5, -0.55, 0], stroke_width=2, color=WHITE)
        s2 = Line(top, top + [0.5, -0.55, 0], stroke_width=2, color=WHITE)
        return VGroup(s1, s2, cup)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les masses", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.3)
        bal, l, r = self.balance([-2.6, -0.4, 0], tilt=0.0)
        accroche = Text("1 kg = 1000 g", font_size=40, color=BLEU_CALCUL).move_to([2.4, 0.3, 0])
        astuce = Text("Lourd ou léger ? Tout se pèse.", font_size=25, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(Create(bal))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : estimer ──────────────────────────────────────────────────

    def ecran_estimer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Estimer une masse")

        lignes = [
            ("Crayon", "10 g", VERT_OK),
            ("Pomme", "150 g", VERT_OK),
            ("Paquet de riz", "1 kg", BLEU_CALCUL),
            ("Cartable rempli", "3 kg", BLEU_CALCUL),
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

        note = Text("Estimer = choisir une masse raisonnable (pas exacte).", font_size=26, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 2 : comparer (balance) ───────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Comparer 1 kg et 1200 g")

        astuce = Text("Même unité d'abord : 1 kg = 1000 g", font_size=28, color=ORANGE_RETENUE).move_to([0, 2.0, 0])
        self.play(FadeIn(astuce, shift=DOWN * 0.2))

        bal, l, r = self.balance([0, -0.3, 0], tilt=0.0)
        self.play(Create(bal))
        lab_l = Text("1000 g", font_size=28, color=WHITE).move_to(l + [0, 0.5, 0])
        lab_r = Text("1200 g", font_size=28, color=VERT_OK).move_to(r + [0, 0.5, 0])
        self.play(FadeIn(lab_l), FadeIn(lab_r))
        self.wait(0.5)

        # la balance penche vers 1200 g (droite descend).
        bal2, l2, r2 = self.balance([0, -0.3, 0], tilt=0.55)
        self.play(Transform(bal, bal2),
                  lab_l.animate.move_to(l2 + [0, 0.5, 0]),
                  lab_r.animate.move_to(r2 + [0, 0.5, 0]))

        conclusion = Text("1200 g est plus lourd que 1 kg", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : convertir (× 1000) ───────────────────────────────────────

    def ecran_convertir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Convertir en grammes")

        kg = Text("1,5 kg", font_size=56, color=WHITE).move_to([-3.0, 0.6, 0])
        fleche = Arrow([-1.4, 0.6, 0], [1.2, 0.6, 0], buff=0.2, color=ORANGE_RETENUE)
        x1000 = Text("× 1000", font_size=32, color=ORANGE_RETENUE).next_to(fleche, UP, buff=0.2)
        g = Text("1500 g", font_size=56, color=VERT_OK).move_to([3.0, 0.6, 0])
        self.play(Write(kg))
        self.play(GrowArrow(fleche), FadeIn(x1000))
        self.play(TransformFromCopy(kg, g))
        self.wait(0.6)

        detail = Text("1 kg = 1000 g  et  0,5 kg = 500 g  →  1500 g", font_size=28, color=BLEU_CALCUL).to_edge(DOWN, buff=0.7)
        self.play(FadeIn(detail, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 4 : défi (marché) ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Au marché : une mangue de 350 g", font_size=32, color=WHITE).move_to([0, 1.6, 0])
        q2 = Text("et un ananas de 1,2 kg.", font_size=32, color=WHITE).move_to([0, 0.85, 0])
        q3 = Text("Masse totale en grammes ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.05, 0])
        indice = Text("Indice : mets tout en grammes d'abord.", font_size=26, color=ORANGE_RETENUE).move_to([0, -0.75, 0])
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

        e1 = Text("1,2 kg = 1200 g", font_size=36, color=ORANGE_RETENUE).move_to([0, 1.2, 0])
        e2 = Text("1200 + 350 = 1550", font_size=42, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        self.play(Write(e1))
        self.play(FadeIn(e2, shift=DOWN * 0.2))
        self.wait(0.5)

        conclusion = Text("Le panier pèse 1550 g", font_size=42, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 6 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. 1 kg = 1000 g et 1 t = 1000 kg.", font_size=27),
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
#  Accueil    │ « Les masses » + balance      │ « Lourd ou léger ? La masse, c'est ça.
#  ~0:00      │  1 kg = 1000 g                │   Et une seule règle ouvre toutes les
#             │                               │   portes : un kilo, c'est mille grammes. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  crayon 10 g … cartable 3 kg  │ « Avant de peser, devine. Un crayon, c'est
#  ~0:14      │                               │   des grammes, quelques-uns. Un cartable
#             │                               │   plein, c'est des kilos. Attrape le bon
#             │                               │   ordre de grandeur, pas le chiffre exact. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  balance 1000 g / 1200 g      │ « Ne compare jamais un kilo et douze cents
#  ~0:34      │  → 1200 g plus lourd          │   grammes tels quels. Mets le kilo en
#             │                               │   grammes : mille. Regarde la balance
#             │                               │   pencher : douze cents l'emporte. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  1,5 kg × 1000 = 1500 g       │ « Des kilos vers les grammes, on grandit :
#  ~0:54      │                               │   on multiplie par mille. Un kilo cinq,
#             │                               │   c'est mille cinq cents grammes. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  mangue 350 g + ananas 1,2 kg │ « À toi, au marché. Un piège t'attend :
#  ~1:12      │  Masse totale ?               │   deux unités différentes. Range-les
#             │                               │   pareil avant d'additionner. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  1,2 kg = 1200 g              │ « L'ananas d'abord en grammes : mille deux
#  ~1:28      │  1200 + 350 = 1550           │   cents. On ajoute la mangue, trois cent
#             │                               │   cinquante : mille cinq cent cinquante
#             │                               │   grammes dans le panier. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : mille grammes dans un kilo ;
#  ~1:44      │                               │   toujours la même unité avant de comparer ;
#             │                               │   et estimer, c'est viser juste, pas exact.
#             │                               │   À bientôt ! »
