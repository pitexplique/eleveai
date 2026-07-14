# prop_proportionnalite.py
# EleveAI — Maths 5e — La proportionnalité (notionId : prop_proportionnalite)
# Mêmes exemples que la fiche lib/fiches/maths-5e-proportionnalite.tsx.
#
# Mapping micro-compétences (banque proportionnalite.bank.ts) → écrans :
# - prop_reconnaitre           → écran 1 (tableau cahiers, ×2 sur les 2 lignes)
# - prop_coeff / prop_table    → écran 2 (retour à l'unité : 1 cahier = 4 €)
# - prop_quatrieme             → écran 2 (9 cahiers → 36 €)
# - prop_pourcentage           → écran 3 (30 % de 200 = 60)
# - prop_coeff_multiplicateur  → écran 4 (hausse 20 % → ×1,2 : 50 € → 60 €)
# - prop_rapport / prop_probleme / prop_defi → défi + correction (riz : 4 pers 300 g → 10 pers)
#
# Rendu : python -m manim render -qh manim/scripts/5e/prop_proportionnalite.py PropProportionnalite5e -o eleveai-maths-5e-prop-proportionnalite --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class PropProportionnalite5e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def tableau(self, top, bot, labels=("", ""), x0=-2.0, y0=0.0, cw=1.5, ch=0.85):
        top_cells = VGroup()
        bot_cells = VGroup()
        for i in range(len(top)):
            x = x0 + i * cw
            rt = Rectangle(width=cw, height=ch, stroke_width=2, color=WHITE).move_to([x, y0 + ch / 2, 0])
            rb = Rectangle(width=cw, height=ch, stroke_width=2, color=WHITE).move_to([x, y0 - ch / 2, 0])
            tt = Text(str(top[i]), font_size=30, color=BLEU_CALCUL).move_to(rt.get_center())
            tb = Text(str(bot[i]), font_size=30, color=VERT_OK).move_to(rb.get_center())
            top_cells.add(VGroup(rt, tt))
            bot_cells.add(VGroup(rb, tb))
        lbl_t = Text(labels[0], font_size=24, color=WHITE).next_to(top_cells, LEFT, buff=0.35)
        lbl_b = Text(labels[1], font_size=24, color=WHITE).next_to(bot_cells, LEFT, buff=0.35)
        return VGroup(top_cells, bot_cells, lbl_t, lbl_b), top_cells, bot_cells

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("La proportionnalité", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 5e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("2 fois plus de cahiers, 2 fois plus cher ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Un seul nombre relie tout : le coefficient.", font_size=26, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : reconnaître (×2 sur les deux lignes) ──────────────────────

    def ecran_reconnaitre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Reconnaître")

        grp, top, bot = self.tableau([3, 6], [9, 18], labels=("Cahiers", "Prix (€)"), y0=0.6)
        self.play(FadeIn(grp))
        self.wait(0.6)

        f_top = CurvedArrow(top[0].get_top() + UP * 0.1, top[1].get_top() + UP * 0.1, angle=-TAU / 6, color=BLEU_CALCUL)
        x2_top = Text("× 2", font_size=26, color=BLEU_CALCUL).next_to(f_top, UP, buff=0.05)
        self.play(Create(f_top), Write(x2_top))
        self.wait(0.4)

        f_bot = CurvedArrow(bot[0].get_bottom() + DOWN * 0.1, bot[1].get_bottom() + DOWN * 0.1, angle=TAU / 6, color=VERT_OK)
        x2_bot = Text("× 2", font_size=26, color=VERT_OK).next_to(f_bot, DOWN, buff=0.05)
        self.play(Create(f_bot), Write(x2_bot))
        self.wait(0.8)

        conclusion = Text("Même coefficient → c'est proportionnel", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : retour à l'unité (3 cahiers 12 € → 9 cahiers) ─────────────

    def ecran_unite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Compléter le tableau")

        consigne = Text("3 cahiers coûtent 12 €. Et 9 cahiers ?", font_size=30, color=WHITE).move_to([0, 2.1, 0])
        self.play(Write(consigne))

        grp, top, bot = self.tableau([3, 1, 9], ["12", "?", "?"], labels=("Cahiers", "Prix (€)"), y0=0.2)
        self.play(FadeIn(grp))
        self.wait(0.5)

        # retour à l'unité : 12 ÷ 3 = 4
        etape1 = Text("1 cahier : 12 ÷ 3 = 4 €", font_size=30, color=ORANGE_RETENUE).move_to([0, -1.4, 0])
        nouveau1 = Text("4", font_size=30, color=VERT_OK).move_to(bot[1][0].get_center())
        self.play(Write(etape1), Transform(bot[1][1], nouveau1), Indicate(top[1], color=ORANGE_RETENUE))
        self.wait(1.0)

        # ×9 : 9 cahiers = 36
        etape2 = Text("9 cahiers : 9 × 4 = 36 €", font_size=30, color=VERT_OK).to_edge(DOWN)
        nouveau2 = Text("36", font_size=30, color=VERT_OK).move_to(bot[2][0].get_center())
        self.play(Write(etape2), Transform(bot[2][1], nouveau2), Circumscribe(bot[2], color=VERT_OK))
        self.wait(2.2)

    # ── écran 3 : pourcentage (30 % de 200) ─────────────────────────────────

    def ecran_pourcentage(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Un pourcentage")

        enonce = Text("30 % des 200 élèves viennent à vélo.", font_size=32, color=WHITE).move_to([0, 1.7, 0])
        self.play(Write(enonce))
        self.wait(0.6)

        etape = Text("30 %  =  × 0,3", font_size=40, color=BLEU_CALCUL).move_to([0, 0.4, 0])
        self.play(Write(etape))
        self.wait(0.8)

        calcul = Text("0,3 × 200 = 60", font_size=44, color=VERT_OK).move_to([0, -0.9, 0])
        self.play(Write(calcul))
        self.wait(0.8)

        conclusion = Text("60 élèves viennent à vélo", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : hausse (50 € + 20 %) ──────────────────────────────────────

    def ecran_hausse(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Augmenter de 20 %")

        enonce = Text("Un prix de 50 € augmente de 20 %.", font_size=32, color=WHITE).move_to([0, 1.7, 0])
        self.play(Write(enonce))
        self.wait(0.6)

        etape = Text("+ 20 %  →  × 1,2", font_size=40, color=ORANGE_RETENUE).move_to([0, 0.4, 0])
        piege = Text("(100 % + 20 % = 120 % = 1,2)", font_size=26, color=WHITE).next_to(etape, DOWN, buff=0.3)
        self.play(Write(etape), FadeIn(piege))
        self.wait(0.8)

        calcul = Text("50 × 1,2 = 60 €", font_size=44, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(Write(calcul))
        self.wait(0.8)

        conclusion = Text("Nouveau prix : 60 €", font_size=32, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : défi (recette de riz) ─────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("Pour 4 personnes, il faut 300 g de riz.", font_size=32, color=WHITE).move_to([0, 1.2, 0])
        q2 = Text("Quelle quantité pour 10 personnes ?", font_size=34, color=BLEU_CALCUL).move_to([0, 0.4, 0])
        grp, _, _ = self.tableau([4, 10], ["300", "?"], labels=("Personnes", "Riz (g)"), y0=-1.2)
        self.play(Write(q1), Write(q2))
        self.play(FadeIn(grp))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etape1 = Text("1 personne : 300 ÷ 4 = 75 g", font_size=34, color=ORANGE_RETENUE).move_to([0, 1.3, 0])
        self.play(Write(etape1))
        self.wait(0.8)

        etape2 = Text("10 personnes : 75 × 10", font_size=38, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        self.play(Write(etape2))
        self.wait(0.6)

        conclusion = Text("= 750 g", font_size=48, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Proportionnel = on multiplie par le même coefficient.", font_size=26),
            Text("2. Retour à l'unité : la valeur de 1, puis je multiplie.", font_size=26),
            Text("3. Un pourcentage est une proportionnalité : 30 % = × 0,3.", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_reconnaitre()
        self.ecran_unite()
        self.ecran_pourcentage()
        self.ecran_hausse()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! La proportionnalité. Deux fois plus de cahiers,
#                     deux fois plus cher ? Un seul nombre relie tout : le
#                     coefficient. »
# [Écran 1 ~0:12]   « Regarde le tableau : de 3 à 6 cahiers, on multiplie par
#                     deux. Le prix, de 9 à 18 euros, aussi par deux. Même
#                     coefficient sur les deux lignes : c'est proportionnel. »
# [Écran 2 ~0:32]   « 3 cahiers coûtent 12 euros, et 9 cahiers ? On revient à
#                     l'unité : 1 cahier, c'est 12 divisé par 3, donc 4 euros.
#                     Puis 9 cahiers, 9 fois 4 : 36 euros. »
# [Écran 3 ~0:54]   « Les pourcentages, c'est de la proportionnalité. 30 %, ça
#                     veut dire fois 0,3. Donc 0,3 fois 200, ça fait 60 élèves. »
# [Écran 4 ~1:12]   « Augmenter de 20 %, attention : on ne multiplie pas par 0,2,
#                     mais par 1,2. Cent pour cent plus vingt, ça fait cent vingt
#                     pour cent, donc 1,2. 50 fois 1,2 : 60 euros. »
# [Défi ~1:32]      « À toi ! Pour 4 personnes, 300 grammes de riz. Et pour 10
#                     personnes ? Mets pause. »
# [Correction ~1:48] « On revient à l'unité : 1 personne, 300 divisé par 4, ça
#                     fait 75 grammes. Pour 10 personnes, 75 fois 10 : 750
#                     grammes. »
# [À retenir ~2:04] « On retient : proportionnel, on multiplie par le même
#                     coefficient. Le retour à l'unité, c'est la valeur de 1. Et un
#                     pourcentage, c'est une proportionnalité. À bientôt ! »
