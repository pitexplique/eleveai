# proportionnalite.py
# EleveAI — Maths CM2 — La proportionnalité (notionId : proportionnalite)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-proportionnalite.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. VARIÉTÉ
# D'ANIMATIONS + légendes distribuées.
#
# Mapping micro-compétences (banque proportionnalite.bank.ts) → écrans :
# - prop_reconnaitre → écran 1 (carnets [1,3]/[2,6], ×3 sur les deux lignes)
# - prop_tableau     → écran 2 (jus [4,8]/[2,4], ×2)
# - prop_coefficient → écran 3 (3 → 12, ×4)
# - prop_quatrieme   → écran 4 (retour à l'unité : 3 ballons 18€ → 1 → 5 = 30€)
# - prop_probleme/defi → défi + correction (4 samoussas 60 g → 10 = 150 g)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/proportionnalite.py ProportionnaliteCM2 -o eleveai-maths-cm2-proportionnalite --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class ProportionnaliteCM2(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def tableau(self, top, bot, labels=("", ""), x0=-1.6, y0=0.0, cw=1.6, ch=0.9):
        """Deux lignes de cases. Renvoie (groupe, top_cells, bot_cells)."""
        top_cells = VGroup()
        bot_cells = VGroup()
        for i in range(len(top)):
            x = x0 + i * cw
            rt = Rectangle(width=cw, height=ch, stroke_width=2, color=WHITE).move_to([x, y0 + ch / 2, 0])
            rb = Rectangle(width=cw, height=ch, stroke_width=2, color=WHITE).move_to([x, y0 - ch / 2, 0])
            tt = Text(str(top[i]), font_size=32, color=BLEU_CALCUL).move_to(rt.get_center())
            tb = Text(str(bot[i]), font_size=32, color=VERT_OK).move_to(rb.get_center())
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
        sous_titre = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("Plus de gâteaux, plus d'œufs : combien ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Un seul nombre relie tout : le coefficient.", font_size=28, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : reconnaître (carnets, ×3 sur les 2 lignes) ───────────────
    # Entrées : FadeIn tableau + CurvedArrow ; emphase : les deux ×3.

    def ecran_reconnaitre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Reconnaître")

        enonce = Text("1 carnet coûte 2 €. Et 3 carnets ?", font_size=30, color=WHITE).move_to([0, 2.1, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.2))

        grp, top, bot = self.tableau([1, 3], [2, 6], labels=("Carnets", "Prix (€)"), y0=0.4)
        self.play(FadeIn(grp))
        self.wait(0.6)

        f_top = CurvedArrow(top[0].get_top() + UP * 0.1, top[1].get_top() + UP * 0.1, angle=-TAU / 6, color=BLEU_CALCUL)
        x3_top = Text("× 3", font_size=28, color=BLEU_CALCUL).next_to(f_top, UP, buff=0.05)
        self.play(Create(f_top), Write(x3_top))
        self.wait(0.4)

        f_bot = CurvedArrow(bot[0].get_bottom() + DOWN * 0.1, bot[1].get_bottom() + DOWN * 0.1, angle=TAU / 6, color=VERT_OK)
        x3_bot = Text("× 3", font_size=28, color=VERT_OK).next_to(f_bot, DOWN, buff=0.05)
        self.play(Create(f_bot), Write(x3_bot))
        self.wait(0.8)

        conclusion = Text("Le même × 3 sur les deux lignes → c'est proportionnel",
                          font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 2 : le tableau (jus, ×2) ─────────────────────────────────────
    # Entrées : tableau + Transform de la case ? ; emphase : Circumscribe.

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Compléter le tableau")

        consigne = Text("2 verres de jus pour 4 personnes. Pour 8 personnes ?",
                        font_size=28, color=WHITE).move_to([0, 2.1, 0])
        self.play(Write(consigne))

        grp, top, bot = self.tableau([4, 8], [2, "?"], labels=("Personnes", "Verres"), y0=0.4)
        self.play(FadeIn(grp))
        self.wait(0.5)

        f = CurvedArrow(top[0].get_top() + UP * 0.1, top[1].get_top() + UP * 0.1, angle=-TAU / 6, color=ORANGE_RETENUE)
        x2 = Text("× 2", font_size=28, color=ORANGE_RETENUE).next_to(f, UP, buff=0.05)
        self.play(Create(f), Write(x2))
        note = Text("8, c'est 2 fois plus que 4 → 2 fois plus de verres", font_size=26, color=ORANGE_RETENUE).move_to([0, -1.3, 0])
        self.play(Write(note))
        self.wait(0.8)

        rep = Text("4", font_size=32, color=VERT_OK).move_to(bot[1][0].get_center())
        self.play(Transform(bot[1][1], rep), Circumscribe(bot[1], color=VERT_OK))
        conclusion = Text("2 × 2 = 4 verres", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 3 : le coefficient (3 → 12, ×4) ──────────────────────────────
    # Entrées : GrowFromCenter ; emphase : Flash.

    def ecran_coefficient(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Le coefficient")

        q = Text("On passe de 3 à 12. On multiplie par combien ?", font_size=30, color=WHITE).move_to([0, 1.8, 0])
        self.play(FadeIn(q, shift=DOWN * 0.2))

        trois = Text("3", font_size=64, color=BLEU_CALCUL).move_to([-2.2, 0.3, 0])
        douze = Text("12", font_size=64, color=VERT_OK).move_to([2.2, 0.3, 0])
        self.play(GrowFromCenter(trois), GrowFromCenter(douze))
        self.wait(0.4)

        fleche = CurvedArrow([-1.6, 0.7, 0], [1.5, 0.7, 0], angle=-TAU / 7, color=ORANGE_RETENUE)
        essai = Text("3 × 4 = 12", font_size=40, color=ORANGE_RETENUE).move_to([0, -1.0, 0])
        self.play(Create(fleche), Write(essai))
        self.play(Flash(essai, color=VERT_OK))
        self.wait(0.8)

        coeff = Text("Le coefficient est 4", font_size=42, color=VERT_OK).to_edge(DOWN)
        self.play(Write(coeff))
        self.wait(2.0)

    # ── écran 4 : retour à l'unité (3 ballons 18€ → 5) ─────────────────────
    # Entrées : tableau + Transform des cases ? ; emphase : Indicate/Circumscribe.

    def ecran_unite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le retour à l'unité")

        consigne = Text("3 ballons coûtent 18 €. Et 5 ballons ?", font_size=30, color=WHITE).move_to([0, 2.1, 0])
        self.play(Write(consigne))

        grp, top, bot = self.tableau([3, 1, 5], ["18", "?", "?"], labels=("Ballons", "Prix (€)"), y0=0.2)
        self.play(FadeIn(grp))
        self.wait(0.5)

        # 1 ballon : 18 ÷ 3 = 6
        etape1 = Text("1 ballon : 18 ÷ 3 = 6 €", font_size=30, color=ORANGE_RETENUE).move_to([0, -1.3, 0])
        n1 = Text("6", font_size=32, color=VERT_OK).move_to(bot[1][0].get_center())
        self.play(Write(etape1), Indicate(top[1], color=ORANGE_RETENUE), Transform(bot[1][1], n1))
        self.wait(1.0)

        # 5 ballons : 5 × 6 = 30
        etape2 = Text("5 ballons : 5 × 6 = 30 €", font_size=32, color=VERT_OK).to_edge(DOWN)
        n2 = Text("30", font_size=32, color=VERT_OK).move_to(bot[2][0].get_center())
        self.play(Write(etape2), Transform(bot[2][1], n2), Circumscribe(bot[2], color=VERT_OK))
        self.wait(2.2)

    # ── écran 5 : défi (samoussas) ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("À La Réunion, pour 4 samoussas,", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        q2 = Text("il faut 60 g de farce.", font_size=32, color=WHITE).move_to([0, 0.9, 0])
        q3 = Text("Combien de farce pour 10 samoussas ?", font_size=32, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        indice = Text("Indice : cherche la farce pour 1 samoussa.", font_size=28, color=ORANGE_RETENUE).move_to([0, -0.7, 0])
        self.play(Write(q1), Write(q2))
        self.play(Write(q3))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction (60 ÷ 4 = 15, × 10 = 150) ─────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        grp, top, bot = self.tableau([4, 1, 10], ["60", "?", "?"], labels=("Samoussas", "Farce (g)"), y0=0.4)
        self.play(FadeIn(grp))
        self.wait(0.4)

        e1 = Text("1 samoussa : 60 ÷ 4 = 15 g", font_size=30, color=ORANGE_RETENUE).move_to([0, -1.2, 0])
        n1 = Text("15", font_size=30, color=VERT_OK).move_to(bot[1][0].get_center())
        self.play(Write(e1), Indicate(top[1], color=ORANGE_RETENUE), Transform(bot[1][1], n1))
        self.wait(1.0)

        n2 = Text("150", font_size=30, color=VERT_OK).move_to(bot[2][0].get_center())
        self.play(Transform(bot[2][1], n2), Circumscribe(bot[2], color=VERT_OK))
        conclusion = Text("10 samoussas : 10 × 15 = 150 g", font_size=38, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Proportionnel = on multiplie par le même nombre.", font_size=27),
            Text("2. Le coefficient, c'est la valeur pour 1.", font_size=27),
            Text("3. Retour à l'unité : la valeur de 1, puis je multiplie.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_reconnaitre()
        self.ecran_tableau()
        self.ecran_coefficient()
        self.ecran_unite()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! La proportionnalité. Plus de gâteaux, plus d'œufs :
#                      combien exactement ? Un seul nombre relie tout : le coefficient. »
# [Écran 1 ~0:14]    « Un carnet coûte deux euros. Trois carnets ? On multiplie les
#                      carnets par trois. Alors on multiplie aussi le prix par trois :
#                      six euros. Le même fois trois partout : c'est proportionnel. »
# [Écran 2 ~0:34]    « Deux verres de jus pour quatre personnes. Pour huit personnes ?
#                      Huit, c'est deux fois plus que quatre. Donc deux fois plus de
#                      verres : deux fois deux, quatre verres. »
# [Écran 3 ~0:52]    « On passe de trois à douze. On multiplie par combien ? Trois
#                      fois quatre, douze. Le coefficient, c'est quatre. »
# [Écran 4 ~1:08]    « Trois ballons coûtent dix-huit euros. Et cinq ballons ? On
#                      cherche le prix d'un seul : dix-huit divisé par trois, six
#                      euros. Puis cinq ballons : cinq fois six, trente euros. »
# [Défi ~1:28]       « À toi ! Pour quatre samoussas, soixante grammes de farce.
#                      Pour dix samoussas ? Cherche d'abord pour un. Mets pause. »
# [Correction ~1:46] « Pour un samoussa : soixante divisé par quatre, quinze grammes.
#                      Pour dix samoussas : dix fois quinze, cent cinquante grammes. »
# [À retenir ~2:04]  « On retient : proportionnel, c'est multiplier par le même nombre.
#                      Le coefficient, c'est la valeur pour un. Et le retour à l'unité :
#                      la valeur de un, puis on multiplie. À bientôt ! »
