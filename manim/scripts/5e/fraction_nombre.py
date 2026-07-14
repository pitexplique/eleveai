# fraction_nombre.py
# EleveAI — Maths 5e — Les fractions (notionId : fraction_nombre)
# Mêmes exemples que la fiche lib/fiches/maths-5e-fractions.tsx.
#
# Mapping micro-compétences (banque fractions.bank.ts) → écrans :
# - fraction_egale        → écran 1 (1/2 = 2/4, deux barres)
# - fraction_simplifier   → écran 2 (6/8 = 3/4)
# - fraction_comparer     → écran 3 (1/2 vs 3/4)
# - fraction_additionner  → écran 4 (1/2 + 1/3 = 5/6, même dénominateur)
# - fraction_multiplier   → écran 5 (2/3 × 3/4 = 6/12 = 1/2, modèle d'aire)
# - fraction_diviser      → écran 5 (note : diviser = multiplier par l'inverse)
# - fraction_quantite / _inverse / _oppose / _rationnel → à retenir + fiche
# - fraction_defi         → défi + correction (3/4 + 1/6 = 11/12)
#
# Rendu : python -m manim render -qh manim/scripts/5e/fraction_nombre.py FractionNombre5e -o eleveai-maths-5e-fraction-nombre --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class FractionNombre5e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def barre(self, n, d, width=6.0, height=0.8, x=0.0, y=0.0, couleur=BLEU_CALCUL):
        """Barre de fraction : d cases, n colorées."""
        cells = VGroup()
        cw = width / d
        x0 = x - width / 2
        for i in range(d):
            c = Rectangle(width=cw, height=height, stroke_width=2, color=WHITE)
            c.move_to([x0 + cw * (i + 0.5), y, 0])
            if i < n:
                c.set_fill(couleur, opacity=0.85)
            cells.add(c)
        return cells

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les fractions", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 5e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("3/4, c'est 3 parts sur 4. Mais 6/8 alors ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Simplifier · comparer · calculer", font_size=28, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : fractions égales (1/2 = 2/4) ──────────────────────────────

    def ecran_egales(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Des fractions égales")

        b1 = self.barre(1, 2, y=1.3)
        l1 = Text("1/2", font_size=34, color=BLEU_CALCUL).next_to(b1, LEFT, buff=0.4)
        self.play(Create(b1), Write(l1))
        self.wait(0.6)

        b2 = self.barre(2, 4, y=0.0)
        l2 = Text("2/4", font_size=34, color=VERT_OK).next_to(b2, LEFT, buff=0.4)
        self.play(Create(b2), Write(l2))
        self.wait(0.8)

        rappel = DashedLine([0, 1.9, 0], [0, -0.6, 0], color=ORANGE_RETENUE, stroke_width=3)
        note = Text("la même part est coloriée", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.2, 0])
        self.play(Create(rappel), Write(note))
        self.wait(1.0)

        conclusion = Text("1/2 = 2/4   (× 2 en haut ET en bas)", font_size=34, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : simplifier (6/8 = 3/4) ────────────────────────────────────

    def ecran_simplifier(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Simplifier")

        b1 = self.barre(6, 8, y=1.2)
        l1 = Text("6/8", font_size=34, color=BLEU_CALCUL).next_to(b1, LEFT, buff=0.4)
        self.play(Create(b1), Write(l1))
        self.wait(0.8)

        etape = Text("On divise en haut ET en bas par 2", font_size=30, color=ORANGE_RETENUE).move_to([0, 0.1, 0])
        self.play(Write(etape))
        self.wait(0.8)

        b2 = self.barre(3, 4, y=-1.0)
        l2 = Text("3/4", font_size=34, color=VERT_OK).next_to(b2, LEFT, buff=0.4)
        self.play(TransformFromCopy(b1, b2), Write(l2))
        self.wait(0.8)

        conclusion = Text("6/8 = 3/4", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Circumscribe(b2, color=VERT_OK))
        self.wait(2.2)

    # ── écran 3 : comparer (1/2 vs 3/4) ─────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Comparer")

        b1 = self.barre(1, 2, y=1.2)
        l1 = Text("1/2", font_size=34, color=BLEU_CALCUL).next_to(b1, LEFT, buff=0.4)
        b2 = self.barre(3, 4, y=0.0, couleur=VERT_OK)
        l2 = Text("3/4", font_size=34, color=VERT_OK).next_to(b2, LEFT, buff=0.4)
        self.play(Create(b1), Write(l1))
        self.play(Create(b2), Write(l2))
        self.wait(0.8)

        note = Text("1/2 = 2/4 : on compare 2/4 et 3/4", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.2, 0])
        self.play(Write(note))
        self.wait(1.0)

        conclusion = Text("3/4 > 1/2", font_size=42, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Indicate(b2, color=VERT_OK))
        self.wait(2.2)

    # ── écran 4 : additionner (1/2 + 1/3 = 5/6) ─────────────────────────────

    def ecran_additionner(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Additionner")

        calcul = Text("1/2 + 1/3 = ?", font_size=38, color=BLEU_CALCUL).move_to([0, 1.9, 0])
        self.play(Write(calcul))
        self.wait(0.6)

        etape = Text("Même dénominateur (6) : 1/2 = 3/6  et  1/3 = 2/6", font_size=28, color=WHITE).move_to([0, 1.0, 0])
        self.play(Write(etape))

        b1 = self.barre(3, 6, y=0.1)
        l1 = Text("3/6", font_size=30, color=BLEU_CALCUL).next_to(b1, LEFT, buff=0.4)
        b2 = self.barre(2, 6, y=-1.0, couleur=VERT_OK)
        l2 = Text("2/6", font_size=30, color=VERT_OK).next_to(b2, LEFT, buff=0.4)
        self.play(Create(b1), Write(l1))
        self.play(Create(b2), Write(l2))
        self.wait(0.8)

        conclusion = Text("3/6 + 2/6 = 5/6", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : multiplier (2/3 × 3/4 = 6/12 = 1/2, modèle d'aire) ─────────

    def ecran_multiplier(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Multiplier")

        calcul = Text("2/3 × 3/4", font_size=38, color=BLEU_CALCUL).move_to([-3.6, 1.4, 0])
        self.play(Write(calcul))

        # carré partagé en 3 colonnes (tiers) × 4 lignes (quarts)
        s = 3.2
        x0, y0 = 0.4, -1.6
        carre = Square(side_length=s, stroke_width=3, color=WHITE).move_to([x0 + s / 2, y0 + s / 2, 0])
        cols, rows = 3, 4
        cw, ch = s / cols, s / rows
        cells = VGroup()
        for r in range(rows):
            for c in range(cols):
                cell = Rectangle(width=cw, height=ch, stroke_width=1.5, color=GREY)
                cell.move_to([x0 + cw * (c + 0.5), y0 + ch * (r + 0.5), 0])
                if c < 2 and r < 3:  # 2 tiers × 3 quarts = 6 cases
                    cell.set_fill(VERT_OK, opacity=0.8)
                cells.add(cell)
        self.play(Create(carre), Create(cells))
        self.wait(0.8)

        compte = Text("6 cases sur 12", font_size=30, color=ORANGE_RETENUE).move_to([-3.4, -0.2, 0])
        self.play(Write(compte))
        self.wait(0.8)

        conclusion = Text("= 6/12 = 1/2", font_size=38, color=VERT_OK).move_to([-3.4, -1.4, 0])
        self.play(Write(conclusion))
        self.wait(1.4)

        note = Text("Diviser ? On multiplie par l'inverse.", font_size=26, color=BLEU_CALCUL).to_edge(DOWN)
        self.play(FadeIn(note, shift=UP * 0.2))
        self.wait(2.0)

    # ── écran 6 : défi (3/4 + 1/6) ──────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("À La Réunion, Enzo mange 3/4 d'un gâteau le midi,", font_size=30, color=WHITE).move_to([0, 1.5, 0])
        q2 = Text("puis 1/6 le soir.", font_size=30, color=WHITE).move_to([0, 0.95, 0])
        q3 = Text("Quelle quantité en tout ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.2, 0])

        b1 = self.barre(3, 4, width=4.2, height=0.6, y=-0.9)
        b2 = self.barre(1, 6, width=4.2, height=0.6, y=-1.7, couleur=VERT_OK)
        self.play(Write(q1), Write(q2))
        self.play(Write(q3), Create(b1), Create(b2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etape = Text("Même dénominateur (12) :", font_size=32, color=WHITE).move_to([0, 1.9, 0])
        self.play(Write(etape))

        b1 = self.barre(9, 12, y=0.9)
        l1 = Text("3/4 = 9/12", font_size=30, color=BLEU_CALCUL).next_to(b1, DOWN, buff=0.2)
        self.play(Create(b1), Write(l1))
        self.wait(0.6)

        b2 = self.barre(2, 12, y=-0.9, couleur=VERT_OK)
        l2 = Text("1/6 = 2/12", font_size=30, color=VERT_OK).next_to(b2, DOWN, buff=0.2)
        self.play(Create(b2), Write(l2))
        self.wait(0.8)

        conclusion = Text("9/12 + 2/12 = 11/12", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. En haut ET en bas par le même nombre → fraction égale.", font_size=26),
            Text("2. Additionner : même dénominateur, puis les numérateurs.", font_size=26),
            Text("3. Multiplier : haut × haut, bas × bas. Diviser : × l'inverse.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_egales()
        self.ecran_simplifier()
        self.ecran_comparer()
        self.ecran_additionner()
        self.ecran_multiplier()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Les fractions. Trois quarts, c'est trois parts sur
#                     quatre. Mais six huitièmes, ça vaut quoi ? On regarde. »
# [Écran 1 ~0:12]   « Un demi et deux quarts : regarde, la même part est
#                     coloriée. Ce sont deux fractions égales. On passe de l'une à
#                     l'autre en multipliant en haut ET en bas par deux. »
# [Écran 2 ~0:30]   « Simplifier six huitièmes ? On divise en haut et en bas par
#                     deux. Ça donne trois quarts. Même part coloriée, écriture
#                     plus simple. »
# [Écran 3 ~0:48]   « Qui est le plus grand, un demi ou trois quarts ? Un demi,
#                     c'est deux quarts. Donc on compare deux quarts et trois
#                     quarts : trois quarts gagne. »
# [Écran 4 ~1:04]   « Un demi plus un tiers. On ne peut pas additionner tout de
#                     suite : on met au même dénominateur, six. Un demi devient
#                     trois sixièmes, un tiers devient deux sixièmes. Trois plus
#                     deux, cinq sixièmes. »
# [Écran 5 ~1:24]   « Multiplier deux tiers par trois quarts. On partage le carré
#                     en tiers dans un sens, en quarts dans l'autre. On colorie
#                     deux tiers sur trois quarts : six cases sur douze. Six
#                     douzièmes, c'est un demi. Et diviser ? On multiplie par
#                     l'inverse. »
# [Défi ~1:44]      « À toi ! Enzo mange trois quarts d'un gâteau, puis un
#                     sixième. Combien en tout ? Mets pause. »
# [Correction ~2:00] « Même dénominateur, douze. Trois quarts, c'est neuf
#                     douzièmes. Un sixième, c'est deux douzièmes. Neuf plus deux,
#                     onze douzièmes. »
# [À retenir ~2:16] « On retient : en haut et en bas par le même nombre pour une
#                     fraction égale ; même dénominateur pour additionner ; et pour
#                     multiplier, haut fois haut, bas fois bas. À bientôt ! »
