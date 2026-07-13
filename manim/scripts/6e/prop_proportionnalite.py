# prop_proportionnalite.py
# EleveAI — Maths 6e — La proportionnalité (notionId : prop_proportionnalite)
# Mêmes exemples que la fiche lib/fiches/maths-6e-proportionnalite.tsx.
#
# Mapping micro-compétences (banque proportionnalite.bank.ts) → écrans :
# - prop_reconnaitre → écran 1 (table cahiers, toujours ×2) + écran 4 (piège : ×, pas +)
# - prop_coeff       → écran 1 (le coefficient = 2)
# - prop_unite       → écran 2 (passage par l'unité) + écran 3 (recette)
# - prop_direct      → écran 2 (trouver la 4e valeur)
# - prop_table       → écran 2 et 3 (compléter la case « ? »)
# - prop_defi        → défi + correction (crêpes)
#
# Rendu : python -m manim render -qh manim/scripts/6e/prop_proportionnalite.py PropProportionnalite6e -o eleveai-maths-6e-prop-proportionnalite --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class PropProportionnalite6e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def table_prop(self, labels, top, bot, center=ORIGIN, cw=1.15, ch=0.85, lw=2.4):
        """Tableau de proportionnalité (2 lignes) : renvoie (groupe, top_mobs, bot_mobs)."""
        n = len(top)
        x0 = -(lw + n * cw) / 2
        cells = VGroup()
        textes = VGroup()
        top_mobs, bot_mobs = [], []
        for ri, (lab, vals, y) in enumerate(
            [(labels[0], top, ch / 2), (labels[1], bot, -ch / 2)]
        ):
            lc = Rectangle(width=lw, height=ch, stroke_width=2, color=BLEU_CALCUL).move_to([x0 + lw / 2, y, 0])
            cells.add(lc)
            textes.add(Text(lab, font_size=22, color=BLEU_CALCUL).move_to(lc.get_center()))
            for ci, v in enumerate(vals):
                cx = x0 + lw + ci * cw + cw / 2
                cell = Rectangle(width=cw, height=ch, stroke_width=2, color=WHITE).move_to([cx, y, 0])
                cells.add(cell)
                col = ORANGE_RETENUE if str(v) == "?" else WHITE
                m = Text(str(v), font_size=30, color=col).move_to(cell.get_center())
                textes.add(m)
                (top_mobs if ri == 0 else bot_mobs).append(m)
        grp = VGroup(cells, textes).move_to(center)
        return grp, top_mobs, bot_mobs

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("La proportionnalité", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 6e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("3 cahiers = 6 €. Et 5 cahiers ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.wait(2.0)

    # ── écran 1 : le coefficient (toujours ×2) ─────────────────────────────

    def ecran_coefficient(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le coefficient")

        grp, top, bot = self.table_prop(
            ["Cahiers", "Prix (€)"], ["1", "2", "3"], ["2", "4", "6"], center=[0.4, 0.4, 0]
        )
        self.play(FadeIn(grp))
        self.wait(0.6)

        fleches = VGroup()
        for t_m, b_m in zip(top, bot):
            fleches.add(Arrow(t_m.get_bottom() + [0.35, 0, 0], b_m.get_top() + [0.35, 0, 0],
                              color=ORANGE_RETENUE, buff=0.05, stroke_width=3, max_tip_length_to_length_ratio=0.35))
        x2 = Text("× 2", font_size=30, color=ORANGE_RETENUE).next_to(grp, RIGHT, buff=0.5)
        self.play(LaggedStart(*[Create(f) for f in fleches], lag_ratio=0.2), Write(x2))
        self.wait(1.4)

        conclusion = Text("On multiplie toujours par 2 : le coefficient", font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : passage par l'unité (3 cahiers = 6 €, et 5 ?) ─────────────

    def ecran_unite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Passer par l'unité")

        grp, top, bot = self.table_prop(
            ["Cahiers", "Prix (€)"], ["1", "3", "5"], ["?", "6", "?"], center=[0, 0.8, 0]
        )
        self.play(FadeIn(grp))
        self.wait(0.6)

        c1 = Text("1 cahier : 6 ÷ 3 = 2 €", font_size=32, color=BLEU_CALCUL).move_to([0, -0.7, 0])
        self.play(Write(c1))
        r_unite = Text("2", font_size=30, color=VERT_OK).move_to(bot[0].get_center())
        self.play(Transform(bot[0], r_unite))
        self.wait(1.2)

        c2 = Text("5 cahiers : 5 × 2 = 10 €", font_size=32, color=BLEU_CALCUL).move_to([0, -1.4, 0])
        self.play(Write(c2))
        r5 = Text("10", font_size=30, color=VERT_OK).move_to(bot[2].get_center())
        self.play(Transform(bot[2], r5))
        self.wait(2.2)

    # ── écran 3 : recette (4 pers → 200 g, et 6 ?) ─────────────────────────

    def ecran_recette(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Une recette")

        grp, top, bot = self.table_prop(
            ["Personnes", "Riz (g)"], ["1", "4", "6"], ["?", "200", "?"], center=[0, 0.8, 0], lw=2.7
        )
        self.play(FadeIn(grp))
        self.wait(0.6)

        c1 = Text("1 personne : 200 ÷ 4 = 50 g", font_size=32, color=BLEU_CALCUL).move_to([0, -0.7, 0])
        self.play(Write(c1))
        r_unite = Text("50", font_size=28, color=VERT_OK).move_to(bot[0].get_center())
        self.play(Transform(bot[0], r_unite))
        self.wait(1.2)

        c2 = Text("6 personnes : 6 × 50 = 300 g", font_size=32, color=BLEU_CALCUL).move_to([0, -1.4, 0])
        self.play(Write(c2))
        r6 = Text("300", font_size=26, color=VERT_OK).move_to(bot[2].get_center())
        self.play(Transform(bot[2], r6))
        self.wait(2.2)

    # ── écran 4 : le piège (×, pas +) ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le piège")

        grp, top, bot = self.table_prop(
            ["Objets", "Prix (€)"], ["1", "2", "3"], ["2", "3", "4"], center=[0, 0.6, 0]
        )
        self.play(FadeIn(grp))
        self.wait(0.6)

        note1 = Text("Ici on AJOUTE 1 à chaque fois...", font_size=30, color=BLEU_CALCUL).move_to([0, -0.7, 0])
        self.play(Write(note1))
        self.wait(1.0)

        croix = Cross(grp, stroke_color=ROUGE_ERREUR, stroke_width=6).scale(0.55)
        note2 = Text("Ce n'est PAS proportionnel !", font_size=32, color=ROUGE_ERREUR).move_to([0, -1.4, 0])
        self.play(Create(croix), Write(note2))
        self.wait(1.2)

        conclusion = Text("Proportionnel = on MULTIPLIE (pas +)", font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        q1 = Text("Pour 10 crêpes, il faut 250 g de farine.", font_size=34, color=WHITE).move_to([0, 0.7, 0])
        q2 = Text("Combien pour 20 crêpes ?", font_size=36, color=BLEU_CALCUL).move_to([0, 0.0, 0])
        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(titre))
        self.play(Write(q1))
        self.play(Write(q2))
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction (×2 → 500 g) ──────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("20 crêpes = 2 × 10 crêpes", font_size=34, color=BLEU_CALCUL).move_to([0, 1.2, 0])
        self.play(Write(e1))
        self.wait(1.0)

        e2 = Text("Donc 2 × 250 g", font_size=34, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        self.play(Write(e2))
        self.wait(0.8)

        conclusion = Text("= 500 g de farine", font_size=42, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Proportionnel = toujours × le même nombre.", font_size=28),
            Text("2. Le passage par l'unité : je cherche pour 1.", font_size=28),
            Text("3. Multiplier, jamais additionner.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_coefficient()
        self.ecran_unite()
        self.ecran_recette()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
