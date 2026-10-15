# prop_pourcentages_short.py
# EleveAI — Maths 4e — les CINQ shorts des pourcentages, un par micro
# (Frédéric, 03/10/2026). Voix validées le 03/10, débit −7 :
# manim/voix/4e-prop-pourcentages-short-<nom>.json.
#   - ShortPctTaux4e        : 18 sur 25 = 72 %                 (prop_pourcentage)
#   - ShortPctMental4e      : 30 % de 70 € = 3 × 7 = 21 €       (prop_pourcentage_mental)
#                             ⛔ Frédéric : « remplace par 30 % de 70 euros » (au lieu de 15 %)
#   - ShortPctCoefficient4e : + 5 % → × 1,05, pas × 0,05        (prop_coeff_multiplicateur)
#   - ShortPctEvolution4e   : 800 → 1 000 abonnés = + 25 %      (prop_evolution)
#   - ShortPctDefi4e        : + 10 % puis + 10 % = + 21 %       (prop_pourcentage_defi)
# Tous renvoient à la vidéo longue (prop_pourcentages.py, https://youtu.be/4aBnDf5iXTA).
# ⛔ La voix correspond aux écrits : chaque nombre dit est écrit (`au_mot`).
#
# Rendu (un par classe) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_pourcentages_short.py ShortPctTaux4e -o eleveai-maths-4e-prop-pourcentages-short-taux --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from prop_ratio_short import Short4e

BLEU_P = "#3B82F6"
VERT_P = "#22C55E"
ROUGE_P = "#EF4444"
FONCE = "#1E293B"


class ShortPct4e(Short4e):
    """Les dessins des shorts de pourcentages."""

    def barre10(self, valeur, y, pris=0, cw=0.4, couleur=BLEU_P):
        """La barre de dix cases, chacune valant `valeur` ; les `pris` premières colorées."""
        g = VGroup()
        for i in range(10):
            r = Rectangle(width=cw, height=0.5, stroke_width=2, stroke_color=WHITE)
            r.set_fill(couleur if i < pris else FONCE, opacity=0.95)
            g.add(VGroup(r, Text(str(valeur), font_size=18, color=WHITE, weight=BOLD).move_to(r)))
        return g.arrange(RIGHT, buff=0).move_to([0, y, 0])

    def colorer(self, barre, k, couleur=BLEU_P):
        return [barre[i][0].animate.set_fill(couleur, opacity=1) for i in range(k)]

    def grille100(self, k, y, cote=0.28, couleur=BLEU_P):
        g = VGroup(*[Square(side_length=cote, stroke_width=1, color=GREY_B)
                     .set_fill(couleur if i < k else GREY_E, opacity=0.9 if i < k else 0.5) for i in range(100)])
        return g.arrange_in_grid(rows=10, cols=10, buff=0).move_to([0, y, 0])

    def barre_val(self, v, ech, couleur, y, x0=-1.9):
        b = Rectangle(width=v * ech, height=0.45, stroke_width=2, stroke_color=WHITE).set_fill(couleur, opacity=0.9)
        return b.move_to([0, y, 0]).align_to(np.array([x0, 0, 0]), LEFT)

    def etiquette(self, texte, couleur, font_size=40):
        t = Text(texte, font_size=font_size, color=BLACK, weight=BOLD)
        fond = RoundedRectangle(width=t.width + 0.35, height=t.height + 0.28, corner_radius=0.12,
                                stroke_width=0).set_fill(couleur, opacity=1)
        return VGroup(fond, t.move_to(fond))


# ═════════════════════════════════════════════════════════════════════════════
class ShortPctTaux4e(ShortPct4e):
    nom_voix = "4e-prop-pourcentages-short-taux"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        copie = VGroup(Rectangle(width=3.0, height=2.0, stroke_width=0).set_fill(WHITE, opacity=1),
                       Text("18 / 25", font_size=64, color=ROUGE_P, weight=BOLD))
        copie[1].move_to(copie[0])
        copie.rotate(0.06).move_to([0, 1.6, 0])
        self.play(FadeIn(copie, shift=DOWN * 0.3))
        self.au_mot("Ça fait combien")
        self.play(Write(self.ligne("= ? %", -0.4, JAUNE_TITRE, 80)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        f = self.ligne("18 % ?", 2.2, WHITE, 80)
        self.play(Write(f))
        self.au_mot("Mais 18 %")
        self.play(Create(self.barrer(f)))
        self.play(Write(self.ligne("18 % = 18 sur 100", 0.8, ROUGE_P, 40)))
        self.au_mot("pas 18 sur 25")
        self.play(Write(self.ligne("pas 18 sur 25 !", -0.2, ORANGE_RETENUE, 44)))
        self.attendre_voix(marge=0.4)

    def ecran_cent(self):
        self.clear()
        self.margo_bas()
        self.dire("02-cent")
        self.play(Write(self.ligne("Sur 100", 2.6, JAUNE_TITRE, 52)))
        a = self.fraction(18, 25, font_size=60).move_to([-1.2, 1.1, 0])
        b = self.fraction("?", 100, font_size=60).move_to([1.2, 1.1, 0])
        fl = Arrow([-0.5, 1.1, 0], [0.45, 1.1, 0], buff=0, color=BLEU_CALCUL)
        self.play(FadeIn(a), GrowArrow(fl), FadeIn(b))
        self.au_mot("je multiplie par 4")
        x4 = Text("× 4", font_size=36, color=BLEU_CALCUL).next_to(fl, DOWN, buff=0.75)
        self.play(Write(x4))
        self.au_mot("18 fois 4")
        b2 = self.fraction(72, 100, font_size=60, color_num=VERT_OK).move_to(b)
        self.play(Transform(b, b2))
        self.play(Write(self.ligne("18 × 4 = 72", -0.9, VERT_OK, 50)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        g = self.grille100(0, 1.3)
        self.add(g)
        self.play(LaggedStart(*[g[i].animate.set_fill(VERT_P, opacity=0.95) for i in range(72)], lag_ratio=0.01))
        self.au_mot("72 sur 100")
        self.play(Write(self.ligne("72 %", -0.55, VERT_OK, 90)))
        self.au_mot("Avec la calculatrice")
        self.play(Write(self.ligne("18 ÷ 25 × 100 = 72", -1.6, GREY_B, 34)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_cent()
        self.ecran_reponse()
        self.defi("04-defi", [("12 matchs sur 20", "12 matchs gagnés", WHITE, 46), ("sur 20", "sur 20", WHITE, 46),
                              ("Quel pourcentage", "% de victoires ?", JAUNE_TITRE, 44)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPctMental4e(ShortPct4e):
    nom_voix = "4e-prop-pourcentages-short-mental"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(GrowFromCenter(self.ligne("30 %", 2.2, BLEU_CALCUL, 110)))
        self.play(Write(self.ligne("de 70 €", 0.9, WHITE, 70)))
        self.au_mot("De tête, en 5 secondes")
        self.play(Write(self.ligne("de tête, 5 secondes", -0.4, JAUNE_TITRE, 40)))
        self.au_mot("Tu y arrives")
        self.play(Write(self.ligne("Tu y arrives ?", -1.4, ORANGE_RETENUE, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_decoupe(self):
        self.clear()
        self.margo_bas()
        self.dire("01-decoupe")
        self.play(Write(self.ligne("L'astuce", 2.6, JAUNE_TITRE, 52)))
        self.au_mot("30 %, c'est 3 fois 10 %")
        b = self.barre10(7, 1.2)
        self.play(FadeIn(b))
        self.play(*self.colorer(b, 3))
        self.play(Write(self.ligne("30 % = 3 × 10 %", -0.1, BLEU_CALCUL, 50)))
        self.attendre_voix(marge=0.4)

    def ecran_dix(self):
        self.clear()
        self.margo_bas()
        self.dire("02-dix")
        self.play(Write(self.ligne("10 % de 70 €", 2.6, JAUNE_TITRE, 48)))
        n = Text("70", font_size=130).move_to([-0.6, 1.0, 0])
        self.play(FadeIn(n))
        self.au_mot("j'enlève le zéro")
        self.play(n[1].animate.set_color(ROUGE_ERREUR))
        self.play(FadeOut(n[1], shift=DOWN * 0.5))
        self.au_mot("7 euros")
        self.play(Write(Text("€", font_size=110, color=VERT_OK).next_to(n[0], RIGHT, buff=0.2)), n[0].animate.set_color(VERT_OK))
        self.play(Write(self.ligne("10 % = 7 €", -0.6, VERT_OK, 56)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        b = self.barre10(7, 2.4)
        self.add(b)
        self.au_mot("3 fois 7")
        self.play(*self.colorer(b, 3, VERT_P))
        self.play(Write(self.ligne("3 × 7 = 21 €", 1.1, VERT_OK, 62)))
        self.au_mot("Pas besoin de calculatrice")
        self.play(Write(self.ligne("sans calculatrice !", -0.2, JAUNE_TITRE, 42)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_decoupe()
        self.ecran_dix()
        self.ecran_reponse()
        self.defi("04-defi", [("30 % de 90 euros", "30 % de 90 €", BLEU_CALCUL, 60), ("Combien font", "= ?", JAUNE_TITRE, 70)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPctCoefficient4e(ShortPct4e):
    nom_voix = "4e-prop-pourcentages-short-coefficient"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(FadeIn(self.etiquette("Abonnement : 40 €", WHITE, 24).move_to([0, 2.5, 0])))
        self.au_mot("augmente de 5 %")
        self.play(GrowFromCenter(self.etiquette("+ 5 %", VERT_P, 54).move_to([0, 1.3, 0])))
        self.au_mot("Par quoi faut-il multiplier")
        self.play(Write(self.ligne("× quoi ?", 0.1, JAUNE_TITRE, 56)))
        self.au_mot("Par 0 virgule 05")
        self.play(Write(self.ligne("× 0,05 ?", -1.0, ORANGE_RETENUE, 56)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        f = self.ligne("40 × 0,05 = 2 €", 2.2, WHITE, 50)
        self.play(Write(f))
        self.au_mot("Ce n'est que la hausse")
        self.play(Write(self.ligne("= la hausse seulement", 1.1, ORANGE_RETENUE, 38)))
        self.au_mot("pas le nouveau prix")
        self.play(Create(self.barrer(f)))
        self.play(Write(self.ligne("pas le nouveau prix !", 0.1, ROUGE_ERREUR, 40)))
        self.attendre_voix(marge=0.4)

    def ecran_coef(self):
        self.clear()
        self.margo_bas()
        self.dire("02-coef")
        cent = Rectangle(width=3.4, height=0.55, stroke_width=2, stroke_color=WHITE).set_fill(BLEU_P, opacity=0.9)
        cinq = Rectangle(width=0.4, height=0.55, stroke_width=2, stroke_color=WHITE).set_fill(VERT_P, opacity=0.9)
        barre = VGroup(cent, cinq).arrange(RIGHT, buff=0).move_to([0, 2.4, 0])
        l100 = Text("100 %", font_size=24, color=WHITE, weight=BOLD).move_to(cent)
        self.au_mot("On garde le prix entier")
        self.play(FadeIn(cent), FadeIn(l100))
        self.au_mot("on ajoute 5 %")
        l5 = Text("+5 %", font_size=22, color=VERT_OK).next_to(cinq, UP, buff=0.12)
        self.play(GrowFromEdge(cinq, LEFT), FadeIn(l5))
        self.au_mot("105 %, c'est 1 virgule 05")
        self.play(Write(self.ligne("105 % = 1,05", 1.2, VERT_OK, 56)))
        self.au_mot("part toujours de 1")
        self.play(Write(self.ligne("le coefficient part de 1", 0.0, JAUNE_TITRE, 36)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        # ⚠️ À LA VERTICALE : côte à côte, « 40 € → 42 € » dépassait le cadre
        # de 4,5 (vu sur la planche).
        a = self.etiquette("40 €", GREY_B, 56).move_to([0, 2.5, 0])
        fl = Arrow([0, 2.0, 0], [0, 0.9, 0], buff=0, color=VERT_OK, stroke_width=6)
        k = Text("× 1,05", font_size=40, color=VERT_OK).next_to(fl, RIGHT, buff=0.2)
        b = self.etiquette("42 €", VERT_OK, 56).move_to([0, 0.4, 0])
        self.play(FadeIn(a))
        self.au_mot("40 fois 1 virgule 05")
        self.play(GrowArrow(fl), Write(k))
        self.au_mot("42 euros")
        self.play(GrowFromCenter(b))
        self.au_mot("Une seule multiplication")
        self.play(Write(self.ligne("une seule multiplication", -0.8, JAUNE_TITRE, 34)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_coef()
        self.ecran_reponse()
        self.defi("04-defi", [("Une baisse de 15 %", "− 15 %", ROUGE_P, 80), ("quel est le coefficient", "coefficient ?", JAUNE_TITRE, 50)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPctEvolution4e(ShortPct4e):
    nom_voix = "4e-prop-pourcentages-short-evolution"
    ECH = 0.0037

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("800 → 1 000", 2.3, WHITE, 64)))
        self.play(FadeIn(self.ligne("abonnés", 1.4, GREY_B, 38)))
        self.au_mot("plus 20 %")
        self.play(Write(self.ligne("+ 20 % ?", 0.3, BLEU_CALCUL, 60)))
        self.au_mot("ou plus 25 %")
        self.play(Write(self.ligne("+ 25 % ?", -0.8, ORANGE_RETENUE, 60)))
        self.attendre_voix(marge=0.4)

    def barres(self):
        b1 = self.barre_val(800, self.ECH, BLEU_P, 2.4)
        b2 = self.barre_val(1000, self.ECH, BLEU_P, 1.6)
        gain = self.barre_val(200, self.ECH, VERT_P, 1.6, x0=-1.9 + 800 * self.ECH)
        l1 = Text("800", font_size=24, color=WHITE, weight=BOLD).move_to(b1)
        l2 = Text("1 000", font_size=24, color=WHITE, weight=BOLD).move_to(b2[0] if False else b2).shift(LEFT * 0.35)
        return b1, b2, gain, l1, l2

    def ecran_gain(self):
        self.clear()
        self.margo_bas()
        self.dire("01-gain")
        b1, b2, gain, l1, l2 = self.barres()
        self.play(FadeIn(b1), FadeIn(l1), FadeIn(b2), FadeIn(l2))
        self.au_mot("Elle gagne 200")
        self.play(FadeIn(gain))
        self.play(Write(self.ligne("+ 200", 0.6, VERT_OK, 56)))
        self.au_mot("200 sur combien")
        self.play(Write(self.ligne("200 sur combien ?", -0.6, JAUNE_TITRE, 44)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("02-piege")
        self.play(Write(self.ligne("Le piège", 2.6, JAUNE_TITRE, 52)))
        self.au_mot("diviser par 1 000")
        f = self.ligne("200 ÷ 1 000 = 20 %", 1.3, WHITE, 44)
        self.play(Write(f))
        self.au_mot("C'est faux")
        self.play(Create(self.barrer(f)))
        self.play(FadeIn(self.ligne("FAUX !", 0.0, ROUGE_ERREUR, 80).rotate(0.12), scale=1.8))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        b1, b2, gain, l1, l2 = self.barres()
        self.add(b1, l1, b2, l2, gain)
        self.au_mot("la valeur de départ")
        self.play(Indicate(b1, color=JAUNE_TITRE, scale_factor=1.08))
        self.play(Write(self.ligne("÷ le DÉPART", 0.8, JAUNE_TITRE, 44)))
        self.au_mot("200 sur 800")
        self.play(Write(self.ligne("200 ÷ 800 × 100", -0.2, WHITE, 44)))
        self.au_mot("25 %")
        self.play(Write(self.ligne("= + 25 %", -1.2, VERT_OK, 70)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_gain()
        self.ecran_piege()
        self.ecran_reponse()
        self.defi("04-defi", [("Un prix passe de 50", "50 € → 40 €", WHITE, 60),
                              ("De combien de pour cent", "baisse en % ?", JAUNE_TITRE, 52)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPctDefi4e(ShortPct4e):
    # ⭐ 03/10/2026, Frédéric : « short 5 : +10 % puis −10 % » — une hausse
    # suivie d'une baisse, décryptée pas à pas (son idée de youtuber : le
    # piège des pourcentages successifs). Remplace « +10 % puis +10 % ».
    nom_voix = "4e-prop-pourcentages-short-defi"
    ECH = 0.02

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("Un prix", 2.6, JAUNE_TITRE, 50)))
        self.au_mot("augmente de 10 %")
        self.play(GrowFromCenter(self.etiquette("+ 10 %", VERT_P, 46).move_to([0, 1.5, 0])))
        self.au_mot("puis baisse de 10 %")
        self.play(GrowFromCenter(self.etiquette("puis − 10 %", ROUGE_P, 40).move_to([0, 0.4, 0])))
        self.au_mot("On revient au prix de départ")
        self.play(Write(self.ligne("retour au départ ?", -0.8, ORANGE_RETENUE, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        f = self.ligne("+ 10 − 10 = 0 ?", 2.0, WHITE, 60)
        self.play(Write(f))
        self.au_mot("ça s'annule")
        self.play(Write(self.ligne("« ça s'annule »", 0.9, GREY_B, 44)))
        self.au_mot("Et c'est faux")
        self.play(Create(self.barrer(f)))
        self.play(FadeIn(self.ligne("FAUX !", -0.4, ROUGE_ERREUR, 90).rotate(0.12), scale=1.8))
        self.attendre_voix(marge=0.4)

    def barres3(self, avec_deltas=True):
        ys = [2.5, 1.55, 0.6]
        vals = [(100, GREY_B), (110, VERT_P), (99, ROUGE_P)]
        b = [self.barre_val(v, self.ECH, c, y) for (v, c), y in zip(vals, ys)]
        l = [Text(f"{v} €", font_size=30, color=c).move_to([0, y, 0]).align_to(np.array([-1.9 + 110 * self.ECH + 0.2, 0, 0]), LEFT)
             for (v, c), y in zip(vals, ys)]
        ref = DashedLine([-1.9 + 100 * self.ECH, 2.85, 0], [-1.9 + 100 * self.ECH, 0.25, 0], color=WHITE, stroke_width=2)
        return b, l, ref

    def ecran_pas_a_pas(self):
        self.clear()
        self.margo_bas()
        self.dire("02-pas-a-pas")
        b, l, ref = self.barres3()
        self.au_mot("Prenons 100 euros")
        self.play(FadeIn(b[0]), FadeIn(l[0]), Create(ref))
        self.au_mot("Plus 10 % de 100")
        self.play(Write(self.ligne("+ 10 % de 100 = + 10 €", -0.4, VERT_OK, 34)))
        self.au_mot("Le prix passe à 110")
        self.play(GrowFromEdge(b[1], LEFT), FadeIn(l[1]))
        self.au_mot("mais de 110")
        self.play(Write(self.ligne("− 10 % de 110 = − 11 €", -1.15, ROUGE_P, 34)))
        self.au_mot("Le prix tombe à 99")
        self.play(GrowFromEdge(b[2], LEFT), FadeIn(l[2]))
        self.play(Indicate(l[2], color=ROUGE_P))
        self.attendre_voix(marge=0.4)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("03-pourquoi")
        self.play(Write(self.ligne("Pourquoi ?", 2.6, JAUNE_TITRE, 52)))
        self.au_mot("On a gagné 10 euros")
        self.play(Write(self.ligne("gagné : + 10 €", 1.6, VERT_OK, 46)))
        self.au_mot("on en a perdu 11")
        self.play(Write(self.ligne("perdu : − 11 €", 0.8, ROUGE_P, 46)))
        self.au_mot("1 virgule 1, fois 0 virgule 9")
        self.play(Write(self.ligne("1,1 × 0,9 = 0,99", -0.25, WHITE, 52)))
        self.au_mot("On perd 1 %")
        self.play(GrowFromCenter(self.ligne("− 1 %", -1.35, ROUGE_P, 80)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_pas_a_pas()
        self.ecran_pourquoi()
        self.defi("04-defi", [("Plus 50 %, puis moins 50 %", "+ 50 % puis − 50 %", WHITE, 46),
                              ("Combien de pour cent", "% perdu ?", JAUNE_TITRE, 56)])
        self.ecran_renvoi("05-fin")
