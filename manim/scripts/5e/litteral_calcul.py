# litteral_calcul.py
# EleveAI — Maths 5e — Le calcul littéral (notionId : litteral_calcul)
# Mêmes exemples que la fiche lib/fiches/maths-5e-calcul-litteral.tsx.
#
# Mapping micro-compétences (banque calcul-litteral.bank.ts) → écrans :
# - litteral_expression_comprendre → écran 1 (anatomie de 3x + 2 ; 3x = 3 × x)
# - litteral_traduire              → écran 2 (« le double de x augmenté de 5 » → 2x + 5)
# - litteral_substituer            → écran 3 (3x − 2 pour x = 6 → 16)
# - litteral_reduire               → écran 4 (3x + 2x = 5x, boîtes « x »)
# - litteral_defi (piège)          → écran 5 (3x + 2 ≠ 5x)
# - litteral_defi (problème)       → défi + correction (âge de Léa x + 5, x = 12 → 17)
#
# Rendu : python -m manim render -qh manim/scripts/5e/litteral_calcul.py LitteralCalcul5e -o eleveai-maths-5e-litteral-calcul --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class LitteralCalcul5e(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def xbox(self, x, y, couleur, lettre="x", s=0.6):
        r = Square(side_length=s, color=WHITE, stroke_width=2).set_fill(couleur, opacity=0.85).move_to([x, y, 0])
        t = Text(lettre, font_size=28, color=WHITE).move_to([x, y, 0])
        return VGroup(r, t)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Le calcul littéral", font_size=50, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths 5e — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("3x, ça veut dire quoi au juste ?", font_size=36, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Une lettre = un nombre qu'on ne connaît pas encore.", font_size=26, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(Write(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : comprendre (anatomie de 3x + 2) ───────────────────────────

    def ecran_comprendre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire une expression")

        expr = VGroup(
            Text("3", font_size=72, color=BLEU_CALCUL),
            Text("x", font_size=72, color=WHITE),
            Text("+", font_size=72, color=WHITE),
            Text("2", font_size=72, color=VERT_OK),
        ).arrange(RIGHT, buff=0.35).move_to([0, 0.8, 0])
        self.play(Write(expr))
        self.wait(0.5)

        lbl_coef = Text("coefficient", font_size=26, color=BLEU_CALCUL).move_to([expr[0].get_x(), -0.6, 0])
        lbl_lettre = Text("la lettre", font_size=26, color=WHITE).move_to([expr[1].get_x(), -1.3, 0])
        lbl_const = Text("terme constant", font_size=26, color=VERT_OK).move_to([expr[3].get_x() + 0.3, -0.6, 0])
        self.play(Indicate(expr[0], color=BLEU_CALCUL), Write(lbl_coef))
        self.play(Indicate(expr[1], color=WHITE), Write(lbl_lettre))
        self.play(Indicate(expr[3], color=VERT_OK), Write(lbl_const))
        self.wait(1.2)

        rappel = Text("3x veut dire 3 × x", font_size=34, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(rappel))
        self.wait(2.2)

    # ── écran 2 : traduire (« le double de x augmenté de 5 ») ────────────────

    def ecran_traduire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Traduire une phrase")

        phrase = Text("« le double de x augmenté de 5 »", font_size=34, color=WHITE).move_to([0, 1.6, 0])
        self.play(Write(phrase))
        self.wait(0.6)

        d1 = Text("le double de x", font_size=30, color=BLEU_CALCUL).move_to([-2.6, 0.4, 0])
        a1 = Arrow([-2.6, 0.0, 0], [-2.6, -0.6, 0], buff=0.1, color=BLEU_CALCUL)
        r1 = Text("2x", font_size=40, color=BLEU_CALCUL).move_to([-2.6, -1.1, 0])
        self.play(Write(d1))
        self.play(GrowArrow(a1), Write(r1))
        self.wait(0.6)

        d2 = Text("augmenté de 5", font_size=30, color=VERT_OK).move_to([2.4, 0.4, 0])
        a2 = Arrow([2.4, 0.0, 0], [2.4, -0.6, 0], buff=0.1, color=VERT_OK)
        r2 = Text("+ 5", font_size=40, color=VERT_OK).move_to([2.4, -1.1, 0])
        self.play(Write(d2))
        self.play(GrowArrow(a2), Write(r2))
        self.wait(0.8)

        conclusion = Text("2x + 5", font_size=46, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 3 : substituer (3x − 2 pour x = 6) ────────────────────────────

    def ecran_substituer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Remplacer la lettre")

        expr = Text("3x - 2", font_size=52, color=WHITE).move_to([0, 1.5, 0])
        consigne = Text("pour x = 6", font_size=36, color=ORANGE_RETENUE).next_to(expr, DOWN, buff=0.4)
        self.play(Write(expr), Write(consigne))
        self.wait(0.8)

        etape1 = Text("= 3 × 6 - 2", font_size=44, color=BLEU_CALCUL).move_to([0, -0.6, 0])
        self.play(TransformFromCopy(expr, etape1))
        self.wait(0.8)

        etape2 = Text("= 18 - 2", font_size=44, color=BLEU_CALCUL).move_to([0, -1.5, 0])
        self.play(Write(etape2))
        self.wait(0.6)

        conclusion = Text("= 16", font_size=48, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 4 : réduire (3x + 2x = 5x, boîtes « x ») ──────────────────────

    def ecran_reduire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Réduire")

        calcul = Text("3x + 2x = ?", font_size=44, color=BLEU_CALCUL).move_to([0, 1.7, 0])
        self.play(Write(calcul))
        self.wait(0.5)

        boites = VGroup()
        xs3 = [-4.2, -3.5, -2.8]
        xs2 = [-1.6, -0.9]
        for x in xs3:
            boites.add(self.xbox(x, 0.2, BLEU_CALCUL))
        for x in xs2:
            boites.add(self.xbox(x, 0.2, VERT_OK))
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in boites], lag_ratio=0.15))
        self.wait(0.6)

        note = Text("même lettre → termes semblables", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.2, 0])
        self.play(Write(note))
        self.wait(0.6)

        egal = Text("= 5x", font_size=48, color=VERT_OK).move_to([2.6, 0.2, 0])
        self.play(Circumscribe(boites, color=VERT_OK), Write(egal))
        self.wait(0.6)

        coefs = Text("3 + 2 = 5 (on additionne les coefficients)", font_size=28, color=WHITE).to_edge(DOWN)
        self.play(Write(coefs))
        self.wait(2.2)

    # ── écran 5 : le piège (3x + 2 ≠ 5x) ────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Attention au piège !")

        boites = VGroup(
            self.xbox(-4.0, 0.8, BLEU_CALCUL),
            self.xbox(-3.3, 0.8, BLEU_CALCUL),
            self.xbox(-2.6, 0.8, BLEU_CALCUL),
        )
        plus = Text("+", font_size=40, color=WHITE).move_to([-1.9, 0.8, 0])
        deux = Square(side_length=0.6, color=WHITE, stroke_width=2).set_fill(GREY, opacity=0.6).move_to([-1.2, 0.8, 0])
        deux_t = Text("2", font_size=28, color=WHITE).move_to([-1.2, 0.8, 0])
        self.play(FadeIn(boites, scale=0.5), Write(plus), Create(deux), Write(deux_t))
        self.wait(0.6)

        diff = Text("pas la même chose !", font_size=30, color=ROUGE_ERREUR).move_to([0, -0.3, 0])
        self.play(Write(diff))
        self.wait(0.6)

        faux = Text("3x + 2 ≠ 5x", font_size=44, color=ROUGE_ERREUR).move_to([0, -1.3, 0])
        croix = Cross(faux, stroke_color=ROUGE_ERREUR, stroke_width=6).scale(0.5)
        self.play(Write(faux))
        self.wait(0.5)

        bon = Text("3x et 2 ne sont pas semblables → on ne réduit pas.", font_size=26, color=VERT_OK).to_edge(DOWN)
        self.play(Write(bon))
        self.wait(2.2)

    # ── écran 6 : défi (l'âge de Léa) ───────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        q1 = Text("Léa a x ans.", font_size=36, color=WHITE).move_to([0, 1.2, 0])
        q2 = Text("Écris son âge dans 5 ans,", font_size=32, color=WHITE).move_to([0, 0.5, 0])
        q3 = Text("puis calcule-le si x = 12.", font_size=32, color=BLEU_CALCUL).move_to([0, -0.1, 0])
        self.play(Write(q1), Write(q2), Write(q3))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 7 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        etape1 = Text("Son âge dans 5 ans : x + 5", font_size=36, color=WHITE).move_to([0, 1.3, 0])
        self.play(Write(etape1))
        self.wait(0.8)

        etape2 = Text("Pour x = 12 : 12 + 5", font_size=40, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        self.play(Write(etape2))
        self.wait(0.8)

        conclusion = Text("= 17 ans", font_size=48, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Une lettre = un nombre ; 3x veut dire 3 × x.", font_size=28),
            Text("2. Substituer = remplacer la lettre, puis calculer.", font_size=28),
            Text("3. On ne réduit que les termes semblables : 3x + 2x = 5x.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[Write(p) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_comprendre()
        self.ecran_traduire()
        self.ecran_substituer()
        self.ecran_reduire()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
#
# [Accueil ~0:00]   « Salut ! Le calcul littéral. Trois x, ça veut dire quoi ?
#                     Une lettre, c'est un nombre qu'on ne connaît pas encore. »
# [Écran 1 ~0:12]   « Regarde 3x + 2. Le 3, c'est le coefficient. Le x, c'est la
#                     lettre. Le 2, tout seul, c'est le terme constant. Et attention :
#                     3x veut dire 3 fois x. »
# [Écran 2 ~0:32]   « Traduisons : le double de x, c'est 2x. Augmenté de cinq, on
#                     ajoute cinq. Donc l'expression est 2x + 5. »
# [Écran 3 ~0:50]   « Remplacer la lettre : 3x − 2 pour x égale 6. On remplace x
#                     par 6 : 3 fois 6, moins 2. Ça fait 18 moins 2, donc 16. »
# [Écran 4 ~1:08]   « Réduire : 3x plus 2x. Ce sont des x, la même lettre : des
#                     termes semblables. On additionne les coefficients, 3 plus 2,
#                     ça fait 5. Donc 5x. »
# [Écran 5 ~1:28]   « Le piège : 3x plus 2. Là, 3x a une lettre, mais 2 non. Ce ne
#                     sont pas des termes semblables. On ne peut pas dire que ça
#                     fait 5x. Ça reste 3x + 2. »
# [Défi ~1:44]      « À toi ! Léa a x ans. Écris son âge dans cinq ans, puis
#                     calcule-le si x égale 12. Mets pause. »
# [Correction ~2:00] « Son âge dans cinq ans, c'est x + 5. Pour x égale 12 : 12
#                     plus 5, ça fait 17 ans. »
# [À retenir ~2:14] « On retient : une lettre, c'est un nombre. Substituer, c'est
#                     remplacer puis calculer. Et on ne réduit que les termes
#                     semblables. À bientôt ! »
