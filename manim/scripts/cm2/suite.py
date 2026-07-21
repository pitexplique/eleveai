# suite.py
# EleveAI — Maths CM2 — Les suites de nombres (notionId : suite)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-suites.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (cases de termes + flèches d'écart, règle, sens, piège ×2, défi balises).
#
# ⚠️ SON — ligne du 21/07 : VOIX de Frédéric. Script voix en bas, DEUX COLONNES.
#
# Mapping micro-compétences (banque suites.bank.ts) → écrans :
# - suite_continuer                → écran 1 (5;10;15;20;? → +5 → 25)
# - suite_regle                    → écran 2 (4;7;10;13 → trouver +3)
# - suite_croissante_decroissante  → écran 3 (20;15;10;5 → décroissante)
# - suite_regle (piège ×)          → écran 4 (2;4;8;16 → ×2, pas +2)
# - suite_defi                     → défi + correction (balises sentier +5 → 25 m)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/suite.py SuiteCM2 -o eleveai-maths-cm2-suite --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
ORANGE = "#f97316"
VIOLET = "#8b5cf6"


class SuiteCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def case(self, valeur, couleur=BLEU_CALCUL, manquant=False):
        """Une case de terme : rectangle arrondi + nombre."""
        col = VIOLET if manquant else couleur
        box = RoundedRectangle(width=1.15, height=1.15, corner_radius=0.14,
                               stroke_color=col, stroke_width=4,
                               fill_color=col, fill_opacity=0.10)
        txt = Text(str(valeur), font_size=38, color=col if manquant else WHITE)
        return VGroup(box, txt.move_to(box.get_center()))

    def suite_group(self, valeurs, manquant_index=None, couleur=BLEU_CALCUL):
        """Range les cases horizontalement, centré."""
        cases = VGroup()
        for i, v in enumerate(valeurs):
            cases.add(self.case(v, couleur, manquant=(i == manquant_index)))
        cases.arrange(RIGHT, buff=1.0)
        return cases

    def fleche_ecart(self, c1, c2, label, couleur=ORANGE):
        a = Arrow(c1.get_top(), c2.get_top(), buff=0.05, stroke_width=4,
                  color=couleur, max_tip_length_to_length_ratio=0.25)
        a.shift(UP * 0.15)
        t = Text(label, font_size=24, color=couleur).next_to(a, UP, buff=0.05)
        return VGroup(a, t)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les suites de nombres", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=30, color=WHITE).next_to(titre, DOWN, buff=0.3)

        s = self.suite_group([2, 4, 6, 8, "?"], manquant_index=4).shift(DOWN * 0.3)
        self.play(Write(titre), FadeIn(sous))
        self.play(LaggedStart(*[GrowFromCenter(c) for c in s], lag_ratio=0.2))
        for i in range(3):
            self.play(FadeIn(self.fleche_ecart(s[i], s[i + 1], "+2"), shift=DOWN * 0.1), run_time=0.4)
        astuce = Text("Une règle relie chaque nombre au suivant", font_size=26,
                      color=BLEU_CALCUL).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : continuer ─────────────────────────────────────────────────

    def ecran_continuer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Continuer la suite")

        s = self.suite_group([5, 10, 15, 20, "?"], manquant_index=4).shift(DOWN * 0.2)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in s[:4]], lag_ratio=0.2))
        for i in range(3):
            self.play(GrowArrow(self.fleche_ecart(s[i], s[i + 1], "+5")[0]),
                      FadeIn(self.fleche_ecart(s[i], s[i + 1], "+5")[1]), run_time=0.4)

        self.play(GrowFromCenter(s[4]))
        calc = Text("20 + 5 = 25", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.6)
        rep = self.case(25).move_to(s[4].get_center())
        self.play(Write(calc))
        self.play(Transform(s[4], rep))
        self.wait(2.0)

    # ── écran 2 : trouver la règle ──────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Trouver la règle")

        s = self.suite_group([4, 7, 10, 13]).shift(DOWN * 0.2)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in s], lag_ratio=0.2))

        for i in range(3):
            self.play(FadeIn(self.fleche_ecart(s[i], s[i + 1], "+3"), shift=DOWN * 0.1), run_time=0.5)

        note = Text("7 − 4 = 3   ·   10 − 7 = 3   ·   13 − 10 = 3", font_size=28, color=WHITE).move_to([0, -1.4, 0])
        regle = Text("La règle : ajouter 3", font_size=38, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.play(Write(regle))
        self.wait(2.0)

    # ── écran 3 : croissante / décroissante ─────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Croissante ou décroissante ?")

        s = self.suite_group([20, 15, 10, 5], couleur="#0ea5e9").shift(DOWN * 0.2)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in s], lag_ratio=0.2))
        for i in range(3):
            self.play(FadeIn(self.fleche_ecart(s[i], s[i + 1], "−5"), shift=DOWN * 0.1), run_time=0.4)

        fleche = Text("20 > 15 > 10 > 5   ↓", font_size=30, color=WHITE).move_to([0, -1.4, 0])
        concl = Text("Les nombres descendent : décroissante", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(fleche))
        self.play(Write(concl))
        self.wait(2.0)

    # ── écran 4 : piège (multiplication) ────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Attention au piège")

        s = self.suite_group([2, 4, 8, 16], couleur=ORANGE).shift(DOWN * 0.2)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in s], lag_ratio=0.2))

        faux = Text("Ce n'est pas +2 à chaque fois !", font_size=30, color=ROUGE).move_to([0, 1.2, 0])
        self.play(FadeIn(faux, shift=DOWN * 0.2))
        for i in range(3):
            self.play(FadeIn(self.fleche_ecart(s[i], s[i + 1], "×2", couleur=VERT_OK), shift=DOWN * 0.1), run_time=0.4)

        regle = Text("On multiplie par 2", font_size=38, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(regle))
        self.wait(2.2)

    # ── écran 5 : défi (balises) ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = Text("Défi : les balises du sentier", font_size=42, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        s = self.suite_group([5, 10, 15, 20, "?"], manquant_index=4).scale(0.95).shift(DOWN * 0.1)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in s], lag_ratio=0.2))

        consigne = Text("Des balises tous les 5 mètres : 5, 10, 15, 20 m", font_size=26,
                        color=WHITE).to_edge(DOWN, buff=1.0)
        pause = Text("Où sera la suivante ? Mets pause !", font_size=28, color=ORANGE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(consigne, shift=UP * 0.2))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        s = self.suite_group([5, 10, 15, 20, 25]).scale(0.95).shift(DOWN * 0.2)
        self.play(LaggedStart(*[GrowFromCenter(c) for c in s[:4]], lag_ratio=0.15))
        for i in range(3):
            self.play(FadeIn(self.fleche_ecart(s[i], s[i + 1], "+5"), shift=DOWN * 0.1), run_time=0.3)
        self.play(GrowFromCenter(s[4]), Flash(s[4].get_center(), color=ORANGE))

        calc = Text("20 + 5 = 25", font_size=34, color=WHITE).move_to([0, -1.6, 0])
        concl = Text("La balise suivante est à 25 m", font_size=34, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(Write(calc))
        self.play(Write(concl))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Une suite est une liste de nombres rangés selon une règle.", font_size=26),
            Text("2. Pour la règle, on cherche l'écart entre deux termes voisins.", font_size=26),
            Text("3. Croissante = ça monte partout ; décroissante = ça descend partout.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_continuer()
        self.ecran_regle()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les suites » + 2 4 6 8 ?    │ « Regarde ces nombres alignés. Ils ne sont
#  ~0:00      │  +2 +2 +2                     │   pas là par hasard : entre chacun, il se
#             │                               │   passe toujours la même chose. Trouve quoi. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  5 10 15 20 ?                 │ « Passe le doigt d'une case à l'autre : à
#  ~0:16      │  20 + 5 = 25                  │   chaque saut, on gagne cinq. Alors après
#             │                               │   vingt, il n'y a qu'à faire un saut de plus. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  4 7 10 13                    │ « Ici je ne te donne pas la règle : à toi de
#  ~0:34      │  → ajouter 3                  │   la trouver. Compte l'écart entre les deux
#             │                               │   premières cases, puis vérifie sur les autres. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  20 15 10 5   ↓               │ « Cette fois les nombres rapetissent à chaque
#  ~0:52      │  décroissante                 │   pas. Quand ça descend tout du long, on dit
#             │                               │   que la suite est décroissante. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 4    │  2 4 8 16   ×2                │ « Piège ! Ne dis pas plus deux trop vite.
#  ~1:10      │  on multiplie par 2          │   Regarde : deux fois deux quatre, deux fois
#             │                               │   quatre huit… ici on double, on multiplie. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  5 10 15 20 ? (balises)       │ « À toi. Des balises sur le sentier, une tous
#  ~1:30      │                               │   les cinq mètres. Suis-les du regard et dis-moi
#             │                               │   où se plante la suivante. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  25 m                        │ « Un saut de cinq après vingt : vingt-cinq.
#  ~1:46      │                               │   La balise suivante est à vingt-cinq mètres. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : une suite suit une règle ; on la
#  ~2:00      │                               │   trouve en regardant l'écart entre deux cases ;
#             │                               │   et une suite peut monter ou descendre. À bientôt ! »
