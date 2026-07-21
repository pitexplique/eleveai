# calcul.py
# EleveAI — Maths CM2 — Le calcul (notionId : calcul)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-calcul.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (calcul mental en bonds, colonnes qui s'additionnent avec la retenue qui monte,
# virgules alignées, parenthèse encadrée). Légendes DISTRIBUÉES.
#
# ⚠️ SON — ligne du 21/07 : la leçon prend la VOIX de Frédéric. Script voix en
# bas, à DEUX COLONNES (écrit / voix) : la voix GUIDE LE REGARD, ne relit pas.
#
# Mapping micro-compétences (banque calcul.bank.ts) → écrans :
# - calcul_mental               → écran 1 (25 + 25 = 50 ; complément 37 → 100)
# - calcul_addition_posee       → écran 2 (487 + 268 = 755, retenue qui monte)
# - calcul_soustraction_posee   → écran 3 (704 − 268 = 436, l'emprunt)
# - calcul_decimal_addition     → écran 4 (3,4 + 2,5 = 5,9, virgules alignées)
# - calcul_priorite             → écran 5 (4 + 3 × 5 = 19, la multiplication d'abord)
# - calcul_defi                 → défi + correction (marché : 5 × 5 puis 30 − 25 = 5 €)
# - calcul_decimal_soustraction → rappelé à l'écran « à retenir » (8 = 8,00)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/calcul.py CalculCM2 -o eleveai-maths-cm2-calcul --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class CalculCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def colonnes(self, hauts, bas, signe, cx=-1.2, cy=0.6, dx=0.75):
        """Pose un calcul : chiffres alignés à droite. hauts/bas = listes de
        chiffres (str), même longueur. Renvoie (groupe, VGroup(haut), VGroup(bas))."""
        n = len(hauts)
        haut = VGroup()
        basg = VGroup()
        for i in range(n):
            x = cx + (i - (n - 1) / 2) * dx
            haut.add(Text(hauts[i], font_size=52).move_to([x, cy + 0.7, 0]))
            basg.add(Text(bas[i], font_size=52).move_to([x, cy - 0.1, 0]))
        op = Text(signe, font_size=52, color=ORANGE_RETENUE).move_to([cx - (n + 1) / 2 * dx, cy - 0.1, 0])
        barre = Line([cx - (n / 2 + 0.4) * dx, cy - 0.55, 0], [cx + (n / 2 - 0.1) * dx, cy - 0.55, 0], stroke_width=3)
        return VGroup(haut, basg, op, barre), haut, basg

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Le calcul", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        accroche = Text("De tête, ou en colonnes ?", font_size=36, color=BLEU_CALCUL).next_to(sous, DOWN, buff=0.9)
        astuce = Text("Le secret : bien aligner les rangs.", font_size=26, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : calcul mental ─────────────────────────────────────────────

    def ecran_mental(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Calculer de tête")

        # Un double : 25 + 25.
        d1 = Text("25 + 25", font_size=48, color=WHITE).move_to([-3.2, 1.1, 0])
        astuce1 = Text("c'est le double de 25", font_size=26, color=ORANGE_RETENUE).next_to(d1, DOWN, buff=0.3)
        eq1 = Text("= 50", font_size=48, color=VERT_OK).next_to(d1, RIGHT, buff=0.4)
        self.play(Write(d1))
        self.play(FadeIn(astuce1, shift=UP * 0.2))
        self.play(TransformFromCopy(d1, eq1))
        self.wait(0.8)

        # Un complément à 100 : 37 → 100.
        ligne = Line([-4.5, -1.2, 0], [4.5, -1.2, 0], stroke_width=3, color=WHITE)
        p37 = Dot([-3.0, -1.2, 0], color=BLEU_CALCUL, radius=0.1)
        p100 = Dot([4.0, -1.2, 0], color=VERT_OK, radius=0.1)
        l37 = Text("37", font_size=28, color=BLEU_CALCUL).next_to(p37, DOWN, buff=0.2)
        l100 = Text("100", font_size=28, color=VERT_OK).next_to(p100, DOWN, buff=0.2)
        self.play(Create(ligne), FadeIn(p37), FadeIn(p100), Write(l37), Write(l100))
        arc = ArcBetweenPoints([-3.0, -1.2, 0], [4.0, -1.2, 0], angle=-PI / 2.5, color=ORANGE_RETENUE, stroke_width=4)
        saut = Text("+ 63", font_size=30, color=ORANGE_RETENUE).move_to([0.5, 0.2, 0])
        self.play(Create(arc), FadeIn(saut))
        conclusion = Text("Pour aller de 37 à 100 : + 63", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : addition posée avec retenue ──────────────────────────────

    def ecran_addition(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Addition en colonnes")

        grp, haut, bas = self.colonnes(["4", "8", "7"], ["2", "6", "8"], "+")
        self.play(FadeIn(grp))
        self.wait(0.4)

        res = VGroup(*[Text(c, font_size=52, color=VERT_OK).move_to([haut[i].get_x(), -0.9, 0]) for i, c in enumerate(["7", "5", "5"])])
        ret = VGroup(
            Text("1", font_size=30, color=ORANGE_RETENUE).move_to([haut[1].get_x(), 1.9, 0]),
            Text("1", font_size=30, color=ORANGE_RETENUE).move_to([haut[0].get_x(), 1.9, 0]),
        )

        # unités : 7 + 8 = 15 → 5, retiens 1
        c_u = Text("7 + 8 = 15", font_size=28, color=WHITE).to_edge(RIGHT, buff=0.6).shift(UP * 0.8)
        self.play(Indicate(haut[2], color=BLEU_CALCUL), Indicate(bas[2], color=BLEU_CALCUL), FadeIn(c_u))
        self.play(Write(res[2]), FadeIn(ret[0], shift=UP * 0.2))
        self.wait(0.4)
        # dizaines : 8 + 6 + 1 = 15 → 5, retiens 1
        c_d = Text("8 + 6 + 1 = 15", font_size=28, color=WHITE).next_to(c_u, DOWN, buff=0.5)
        self.play(Indicate(haut[1], color=BLEU_CALCUL), Indicate(bas[1], color=BLEU_CALCUL), FadeIn(c_d))
        self.play(Write(res[1]), FadeIn(ret[1], shift=UP * 0.2))
        self.wait(0.4)
        # centaines : 4 + 2 + 1 = 7
        c_c = Text("4 + 2 + 1 = 7", font_size=28, color=WHITE).next_to(c_d, DOWN, buff=0.5)
        self.play(Indicate(haut[0], color=BLEU_CALCUL), Indicate(bas[0], color=BLEU_CALCUL), FadeIn(c_c))
        self.play(Write(res[0]))

        conclusion = Text("487 + 268 = 755", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : soustraction posée (l'emprunt) ───────────────────────────

    def ecran_soustraction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Soustraction : l'emprunt")

        grp, haut, bas = self.colonnes(["7", "0", "4"], ["2", "6", "8"], "−")
        self.play(FadeIn(grp))
        self.wait(0.4)

        alerte = Text("4 − 8 : impossible ! On emprunte.", font_size=28, color=ORANGE_RETENUE).to_edge(RIGHT, buff=0.5).shift(UP * 0.9)
        self.play(Indicate(haut[2], color=ORANGE_RETENUE), FadeIn(alerte))
        emprunt = Text("14 − 8 = 6", font_size=28, color=BLEU_CALCUL).next_to(alerte, DOWN, buff=0.5)
        self.play(FadeIn(emprunt))

        res = VGroup(*[Text(c, font_size=52, color=VERT_OK).move_to([haut[i].get_x(), -0.9, 0]) for i, c in enumerate(["4", "3", "6"])])
        self.play(Write(res[2]))
        self.play(Write(res[1]), Write(res[0]))

        conclusion = Text("704 − 268 = 436", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : additionner des décimaux (virgules alignées) ─────────────

    def ecran_decimaux(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Aligner les virgules")

        astuce = Text("La virgule sous la virgule.", font_size=30, color=ORANGE_RETENUE).move_to([0, 2.0, 0])
        self.play(FadeIn(astuce, shift=DOWN * 0.2))

        n1 = Text("3,4", font_size=64).move_to([-0.6, 0.9, 0])
        n2 = Text("2,5", font_size=64).move_to([-0.6, 0.0, 0])
        plus = Text("+", font_size=52, color=ORANGE_RETENUE).move_to([-2.2, 0.0, 0])
        barre = Line([-1.7, -0.5, 0], [0.5, -0.5, 0], stroke_width=3)
        self.play(FadeIn(n1), FadeIn(n2), FadeIn(plus), Create(barre))

        # une ligne verticale sur la virgule pour montrer l'alignement
        axe = DashedLine([-0.62, 1.4, 0], [-0.62, -1.2, 0], color=VERT_OK, stroke_width=2)
        self.play(Create(axe))
        self.wait(0.5)

        res = Text("5,9", font_size=64, color=VERT_OK).move_to([-0.6, -1.05, 0])
        detail = Text("4 dixièmes + 5 dixièmes = 9 dixièmes", font_size=26, color=WHITE).to_edge(DOWN, buff=0.5)
        self.play(Write(res))
        self.play(FadeIn(detail, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 5 : priorités (4 + 3 × 5) ────────────────────────────────────

    def ecran_priorite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Les priorités")

        calc = Text("4 + 3 × 5", font_size=64, color=WHITE).move_to([0, 1.2, 0])
        self.play(GrowFromCenter(calc))
        self.wait(0.3)

        # on encadre la multiplication : elle passe d'abord.
        box = SurroundingRectangle(VGroup(calc[2], calc[3], calc[4]), color=ORANGE_RETENUE, buff=0.12)
        note = Text("la multiplication d'abord", font_size=28, color=ORANGE_RETENUE).next_to(box, DOWN, buff=0.5).shift(RIGHT * 0.5)
        self.play(Create(box), FadeIn(note))
        self.wait(0.4)

        etape1 = Text("3 × 5 = 15", font_size=40, color=BLEU_CALCUL).move_to([0, -0.6, 0])
        etape2 = Text("4 + 15 = 19", font_size=44, color=VERT_OK).move_to([0, -1.6, 0])
        self.play(Write(etape1))
        self.play(TransformFromCopy(etape1, etape2))

        piege = Text("(Pas 35 !)", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(piege, scale=1.1))
        self.wait(2.2)

    # ── écran 6 : défi (marché) ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Au marché : 5 sachets à 5 € le sachet.", font_size=32, color=WHITE).move_to([0, 1.6, 0])
        q2 = Text("Malo paie avec 30 €.", font_size=32, color=WHITE).move_to([0, 0.85, 0])
        q3 = Text("Combien de monnaie ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.05, 0])
        indice = Text("Indice : le total, puis la soustraction.", font_size=28, color=ORANGE_RETENUE).move_to([0, -0.75, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(q3, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction ───────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Total : 5 × 5 = 25 €", font_size=40, color=BLEU_CALCUL).move_to([0, 1.2, 0])
        e2 = Text("Monnaie : 30 − 25 = 5 €", font_size=40, color=ORANGE_RETENUE).move_to([0, 0.1, 0])
        self.play(Write(e1))
        self.play(FadeIn(e2, shift=DOWN * 0.2))
        self.wait(0.6)

        conclusion = Text("Malo reçoit 5 € de monnaie", font_size=42, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. En colonnes : on aligne les rangs (et les virgules).", font_size=26),
            Text("2. Une retenue se reporte toujours à gauche.", font_size=26),
            Text("3. Un entier peut s'écrire avec des zéros : 8 = 8,00.", font_size=26),
            Text("4. Sans parenthèses : la multiplication avant l'addition.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_mental()
        self.ecran_addition()
        self.ecran_soustraction()
        self.ecran_decimaux()
        self.ecran_priorite()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Le calcul »                 │ « Deux façons de calculer : dans ta
#  ~0:00      │  De tête, ou en colonnes ?    │   tête quand c'est simple, en colonnes
#             │                               │   quand les nombres sont gros. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  25 + 25 = 50                 │ « Vingt-cinq et vingt-cinq, c'est le
#  ~0:12      │  37 —— 100  (+ 63)            │   même nombre deux fois : cherche le
#             │                               │   double. Et pour aller de trente-sept
#             │                               │   à cent, suis le bond : soixante-trois. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  487 + 268 posé              │ « Pars de la droite. Sept et huit débordent
#  ~0:32      │  retenues 1 · 1              │   dix : tu poses le cinq, tu fais grimper une
#             │  = 755                        │   retenue au-dessus de la colonne d'à côté.
#             │                               │   Additionne-la avec les autres. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  704 − 268 posé              │ « Regarde le haut : quatre, on ne peut pas
#  ~0:54      │  14 − 8 = 6                   │   lui enlever huit. Alors on emprunte à la
#             │  = 436                        │   colonne voisine, le quatre devient
#             │                               │   quatorze, et là ça passe. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 4    │  3,4 + 2,5 (trait vertical)  │ « Le seul piège des décimaux : la virgule.
#  ~1:16      │  = 5,9                        │   Suis le trait vert, il tient les virgules
#             │                               │   l'une sous l'autre. Après, tu additionnes
#             │                               │   colonne par colonne comme d'habitude. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 5    │  4 + 3 × 5                    │ « Ne lis pas de gauche à droite bêtement.
#  ~1:36      │  3 × 5 = 15 → 4 + 15 = 19     │   Repère la multiplication encadrée : elle
#             │  (Pas 35 !)                   │   passe toujours en premier. Fais-la, et
#             │                               │   seulement après, ajoute le quatre. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  5 sachets à 5 €, paie 30 €   │ « À toi. Il y a deux étapes cachées ici :
#  ~1:56      │  Combien de monnaie ?         │   d'abord ce que ça coûte, ensuite ce qu'on
#             │                               │   rend. Mets pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  5 × 5 = 25                   │ « Le total d'abord : cinq fois cinq, vingt-
#  ~2:10      │  30 − 25 = 5                  │   cinq euros. La monnaie, c'est ce qui reste
#             │  5 € de monnaie               │   du billet : trente moins vingt-cinq, cinq
#             │                               │   euros. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 4 points                 │ « Trois réflexes : aligne les rangs, fais
#  ~2:28      │                               │   monter les retenues à gauche, et la
#             │                               │   multiplication avant l'addition. À
#             │                               │   bientôt ! »
