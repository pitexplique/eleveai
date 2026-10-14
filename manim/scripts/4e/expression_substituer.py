# expression_substituer.py
# EleveAI — Maths 4e — Expression littérale, épisode 3 : calculer une expression
# (notionId : litteral_expression, micro : litteral_expression_substituer),
# AVEC VOIX. Paysage ceinture ORANGE ; short jumeau (ceinture blanche) :
# expression_substituer_short.py (le thermomètre à −3, le piège de (−3)²).
#
# ⭐ 13/10/2026 : série « expression littérale » 4e, une paysage PAR MICRO + son
# short jumeau. Même structure que l'épisode 3 de 5e, mais niveau 4e : DEUX
# lettres à la fois, les priorités avec les carrés, les négatifs.
#
# ⭐ LE DESSIN : l'étal du marché, mangues à 2 € et ananas à 3 €. Prix 2x + 3y.
# x (JAUNE) et y (BLEU) : deux lettres, deux couleurs. Coefficient VERT, terme
# constant ORANGE, faux ROUGE. Les parenthèses d'un négatif en ORANGE, agrandies
# puis rétrécies.
#
# Écrans : 00 garde · 01 le marché · 02 deux lettres · 03 les priorités
# (1. carrés 2. × 3. +) · 04 un négatif · 05 le piège du carré · 06 défi
# (3a − b, a = 2, b = −4) + correction · 07 « Ce que tu sais faire
# maintenant » · 08 abonnement.
#
# Voix : manim/voix/4e-expression-substituer.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/expression_substituer.py ExpressionSubstituer4e -o eleveai-maths-4e-expression-substituer --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/03-substituer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_reconnaitre import P, Notion4e, echelle_ceintures  # noqa: E402  (pose aussi les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402

MOINS = "−"  # U+2212
COUL_COEF = VERT_OK
COUL_CONST = ORANGE_RETENUE
COUL_X = JAUNE_TITRE
COUL_Y = BLEU_CALCUL
PAREN = ORANGE_RETENUE
MANGUE = "#FBBF24"
ANANAS = "#D9A23A"
FEUILLE = "#22C55E"


class ExpressionSubstituer4e(Notion4e):
    nom_voix = "4e-expression-substituer"

    # ── outils ──────────────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40):
        """Une ligne faite de morceaux (texte, couleur) ; l'espace grandit avec la taille."""
        buff = max(0.26, font_size * 0.0045)
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def colorie(self, texte, font_size, couleurs, defaut=WHITE):
        """UN seul Text (même ligne de base) ; couleurs = {indice de glyphe: couleur}.
        ⚠️ Les espaces ne comptent pas comme glyphes."""
        m = self.t(texte, font_size, defaut)
        for i, c in couleurs.items():
            m[i].set_color(c)
        return m

    def gonfler(self, mob, f=1.5, duree=0.45):
        """Pour insister : agrandir puis rétrécir."""
        self.play(mob.animate.scale(f), run_time=duree)
        self.play(mob.animate.scale(1 / f), run_time=duree)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def etiquette(self, texte, color):
        lbl = self.t(texte, 32, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def neg(self, n, font_size, color=WHITE):
        """« (−3) » : les parenthèses en ORANGE, le nombre dans sa couleur."""
        m = self.t(f"({MOINS}{n})", font_size, color)
        m[0].set_color(PAREN)
        m[-1].set_color(PAREN)
        return m

    # ── les dessins ─────────────────────────────────────────────────────────

    def mangue(self, s=1.0):
        corps = Ellipse(width=0.95, height=0.68, fill_color=MANGUE, fill_opacity=1,
                        stroke_color="#B45309", stroke_width=2).rotate(0.35)
        joue = Ellipse(width=0.4, height=0.28, fill_color="#F97316", fill_opacity=0.8,
                       stroke_width=0).move_to(P(0.18, -0.05)).rotate(0.35)
        feuille = Ellipse(width=0.34, height=0.13, fill_color=FEUILLE, fill_opacity=1,
                          stroke_width=0).rotate(0.6).move_to(P(0.36, 0.33))
        return VGroup(corps, joue, feuille).scale(s)

    def ananas(self, s=1.0):
        corps = Ellipse(width=0.72, height=1.0, fill_color=ANANAS, fill_opacity=1,
                        stroke_color="#7C4A03", stroke_width=2)
        motif = VGroup()
        for k in (-0.24, 0.0, 0.24):
            motif.add(Line(P(k - 0.2, -0.32), P(k + 0.2, 0.32), stroke_color="#7C4A03", stroke_width=1.5))
            motif.add(Line(P(k + 0.2, -0.32), P(k - 0.2, 0.32), stroke_color="#7C4A03", stroke_width=1.5))
        couronne = VGroup(*[
            Polygon(P(dx - 0.09, 0.45), P(dx + 0.09, 0.45), P(dx * 1.8, 0.45 + h),
                    fill_color=FEUILLE, fill_opacity=1, stroke_color="#15803D", stroke_width=1.5)
            for dx, h in [(-0.12, 0.32), (0.0, 0.45), (0.12, 0.32)]])
        return VGroup(couronne, corps, motif).scale(s)

    def etal(self):
        """L'étal : un auvent rayé, deux poteaux, une table."""
        x0, x1, n = -5.8, 3.8, 10
        w = (x1 - x0) / n
        auvent = VGroup(*[Polygon(P(x0 + i * w, 2.75), P(x0 + (i + 1) * w, 2.75),
                                  P(x0 + (i + 1) * w, 2.3), P(x0 + i * w, 2.3),
                                  fill_color="#DC2626" if i % 2 == 0 else WHITE, fill_opacity=0.9,
                                  stroke_width=0) for i in range(n)])
        poteaux = VGroup(Line(P(x0 + 0.2, 2.3), P(x0 + 0.2, -0.75)), Line(P(x1 - 0.2, 2.3), P(x1 - 0.2, -0.75)))
        poteaux.set_stroke("#A16207", 6)
        table = Rectangle(width=x1 - x0 + 0.2, height=0.32, fill_color="#92400E", fill_opacity=1,
                          stroke_color="#78350F", stroke_width=2).move_to(P((x0 + x1) / 2, -0.75))
        return VGroup(poteaux, auvent, table)

    def podium(self):
        """L'ordre des priorités : trois cases qui s'allument une à une."""
        g = VGroup()
        for i, txt in enumerate(["1. les carrés", "2. les ×", "3. les +"]):
            c = RoundedRectangle(width=3.4, height=0.82, corner_radius=0.14, stroke_color=GREY_B,
                                 stroke_width=3, fill_color=BLEU_CALCUL, fill_opacity=0)
            lbl = self.t(txt, 30, GREY_B).move_to(c)
            g.add(VGroup(c, lbl).move_to(P(-4.75, 1.75 - 1.1 * i)))
        return g

    def allumer(self, pod, i):
        anims = []
        for j, (c, lbl) in enumerate(pod):
            on = j == i
            anims += [c.animate.set_fill(BLEU_CALCUL, 0.35 if on else 0).set_stroke(BLEU_CALCUL if on else GREY_B),
                      lbl.animate.set_color(WHITE if on else GREY_B)]
        self.play(*anims, run_time=0.4)
        if i is not None:
            self.gonfler(pod[i], f=1.15, duree=0.25)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Que vaut")
        q = self.colorie("Que vaut   2x + 3y   ?", 46,
                         {7: COUL_COEF, 8: COUL_X, 9: WHITE, 10: COUL_COEF, 11: COUL_Y}, BLEU_CALCUL)
        q.move_to(P(-0.6, 0.85))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.au_mot("pour x égale 2")
        v = self.colorie("pour x = 2 et y = 5", 42, {4: COUL_X, 5: COUL_X, 6: COUL_X,
                                                      9: COUL_Y, 10: COUL_Y, 11: COUL_Y})
        v.move_to(P(-0.6, -0.15))
        self.play(FadeIn(v[0:7], shift=UP * 0.2))
        self.au_mot("et y égale 5")
        self.play(FadeIn(v[7:12], shift=UP * 0.2))
        self.gonfler(q[7:12], f=1.3)
        self.attendre_voix(marge=1.5)

    # ── 01 : le marché ──────────────────────────────────────────────────────

    def ecran_marche(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-marche")
        self.titre_ecran("Au marché")
        etal = self.etal()
        self.play(FadeIn(etal), run_time=0.8)
        self.au_mot("les mangues")
        mangues = VGroup(*[self.mangue(0.85).move_to(P(x, y)) for x, y in
                           [(-4.1, -0.3), (-3.25, -0.3), (-2.4, -0.3), (-3.7, 0.3), (-2.85, 0.3)]])
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in mangues], lag_ratio=0.15))
        self.au_mot("2 euros")
        e1 = self.etiquette("2 € la mangue", COUL_COEF).move_to(P(-3.25, -1.5))
        self.play(GrowFromCenter(e1))
        self.au_mot("les ananas")
        ananas = VGroup(*[self.ananas(0.9).move_to(P(x, 0.0)) for x in (0.2, 1.2, 2.2)])
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.3) for a in ananas], lag_ratio=0.15))
        self.au_mot("3 euros")
        e2 = self.etiquette("3 € l'ananas", COUL_COEF).move_to(P(1.2, -1.5))
        self.play(GrowFromCenter(e2))
        self.au_mot("Pour x mangues")
        nx = self.t("x mangues", 40, COUL_X).move_to(P(-3.25, 1.3))
        self.play(FadeIn(nx, shift=DOWN * 0.2))
        self.au_mot("et y ananas")
        ny = self.t("y ananas", 40, COUL_Y).move_to(P(1.2, 1.3))
        self.play(FadeIn(ny, shift=DOWN * 0.2))
        self.au_mot("je paie")
        prix = self.colorie("prix = 2x + 3y", 56, {5: COUL_COEF, 6: COUL_X, 8: COUL_COEF, 9: COUL_Y})
        prix.move_to(P(-1.0, -2.75))
        self.play(Write(prix))
        self.gonfler(prix[5:10], f=1.3)
        self.attendre_voix()

    # ── 02 : deux lettres ───────────────────────────────────────────────────

    def ecran_deux_lettres(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-deux-lettres")
        self.titre_ecran("Je remplace chaque lettre")
        expr = self.t("2x + 3y", 110).move_to(P(-0.6, 0.6))
        for i, c in [(0, COUL_COEF), (1, COUL_X), (3, COUL_COEF), (4, COUL_Y)]:
            expr[i].set_color(c)
        self.add(expr)
        self.au_mot("2 mangues")
        vx = self.t("x = 2", 44, COUL_X)
        mx = VGroup(*[self.mangue(0.6) for _ in range(2)]).arrange(RIGHT, buff=0.12)
        gx = VGroup(vx, mx).arrange(RIGHT, buff=0.35).move_to(P(-3.9, 2.25))
        self.play(FadeIn(mx, shift=DOWN * 0.2), FadeIn(vx))
        self.au_mot("5 ananas")
        vy = self.t("y = 5", 44, COUL_Y)
        ay = VGroup(*[self.ananas(0.55) for _ in range(5)]).arrange(RIGHT, buff=0.1)
        gy = VGroup(vy, ay).arrange(RIGHT, buff=0.35).move_to(P(2.0, 2.25))
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.2) for a in ay], lag_ratio=0.12), FadeIn(vy))

        self.au_mot("Je remplace")
        self.play(expr[1].animate.set_color(ROUGE_ERREUR), expr[4].animate.set_color(ROUGE_ERREUR))
        deux = self.t("2", 110, COUL_X).scale(44 / 110).move_to(vx[-1])
        cinq = self.t("5", 110, COUL_Y).scale(44 / 110).move_to(vy[-1])
        self.play(FadeOut(expr[1], shift=UP * 1.0), FadeOut(expr[4], shift=UP * 1.0))
        self.play(deux.animate.scale(110 / 44).move_to(expr[1]),
                  cinq.animate.scale(110 / 44).move_to(expr[4]), run_time=1.0)

        self.au_mot("en remettant les signes fois")
        final = self.ligne([("2", COUL_COEF), ("×", WHITE), ("2", COUL_X), ("+", WHITE),
                            ("3", COUL_COEF), ("×", WHITE), ("5", COUL_Y)], 96).move_to(P(-0.6, 0.6))
        self.play(expr[0].animate.move_to(final[0]), deux.animate.move_to(final[2]),
                  expr[2].animate.move_to(final[3]), expr[3].animate.move_to(final[4]),
                  cinq.animate.move_to(final[6]))
        self.play(GrowFromCenter(final[1]), GrowFromCenter(final[5]))
        self.gonfler(VGroup(final[1], final[5]), duree=0.4)
        gauche = VGroup(expr[0], final[1], deux)
        droite = VGroup(expr[3], final[5], cinq)
        self.au_mot("2 fois 2, plus")
        self.play(Indicate(gauche, color=WHITE, scale_factor=1.15))
        self.au_mot("3 fois 5")
        self.play(Indicate(droite, color=WHITE, scale_factor=1.15))
        self.au_mot("4 plus 15")
        l2 = self.ligne([("=", WHITE), ("4", WHITE), ("+", WHITE), ("15", WHITE)], 80)
        l2.set_y(-0.9).shift(RIGHT * (final[0].get_left()[0] - l2[1].get_left()[0]))
        self.play(FadeIn(l2[0]), TransformFromCopy(gauche, l2[1]), FadeIn(l2[2]), TransformFromCopy(droite, l2[3]))
        self.au_mot("19 euros")
        l3 = self.ligne([("=", WHITE), ("19 €", VERT_OK)], 80).set_y(-2.3).align_to(l2, LEFT)
        self.play(FadeIn(l3[0]), TransformFromCopy(VGroup(l2[1], l2[2], l2[3]), l3[1]))
        self.play(Circumscribe(l3[1], color=VERT_OK))
        self.attendre_voix()

    # ── 03 : les priorités ──────────────────────────────────────────────────

    def ecran_priorites(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-priorites")
        self.titre_ecran("Les priorités ne changent pas")
        pod = self.podium()
        self.play(FadeIn(pod))
        self.au_mot("d'abord les carrés")
        self.allumer(pod, 0)
        self.au_mot("puis les multiplications")
        self.allumer(pod, 1)
        self.au_mot("puis les additions")
        self.allumer(pod, 2)
        self.au_mot("x au carré plus 3 x")
        self.allumer(pod, None)
        expr = self.t("x² + 3x", 72).move_to(P(-0.6, 1.75))
        for i, c in [(0, COUL_X), (3, COUL_COEF), (4, COUL_X)]:
            expr[i].set_color(c)
        self.play(Write(expr))
        self.au_mot("pour x égale 4")
        val = self.t("pour x = 4", 50, COUL_X).next_to(expr, RIGHT, buff=0.7)
        self.play(FadeIn(val, shift=LEFT * 0.2))
        l1 = self.ligne([("=", WHITE), ("4²", COUL_X), ("+", WHITE), ("3", COUL_COEF), ("×", WHITE),
                         ("4", COUL_X)], 72).move_to(P(0.4, 0.45))
        l1[1][1].set_color(WHITE)
        self.play(FadeIn(VGroup(l1[0], l1[2], l1[3], l1[4])),
                  TransformFromCopy(val[-1], l1[1][0]), FadeIn(l1[1][1]),
                  TransformFromCopy(val[-1], l1[5]))
        self.au_mot("4 au carré")
        self.allumer(pod, 0)
        self.play(Indicate(l1[1], color=BLEU_CALCUL, scale_factor=1.3))
        self.au_mot("16. 3")
        l2 = self.ligne([("=", WHITE), ("16", WHITE), ("+", WHITE), ("12", WHITE)], 72)
        l2.set_y(-0.85).align_to(l1, LEFT)
        self.play(FadeIn(l2[0]), TransformFromCopy(l1[1], l2[1]))
        self.au_mot("3 fois 4")
        self.allumer(pod, 1)
        prod = VGroup(l1[3], l1[4], l1[5])
        self.play(Indicate(prod, color=BLEU_CALCUL, scale_factor=1.2))
        self.au_mot("12. 16")
        self.play(FadeIn(l2[2]), TransformFromCopy(prod, l2[3]))
        self.au_mot("16 plus 12")
        self.allumer(pod, 2)
        self.au_mot("28")
        l3 = self.ligne([("=", WHITE), ("28", VERT_OK)], 72).set_y(-2.15).align_to(l1, LEFT)
        self.play(FadeIn(l3[0]), TransformFromCopy(VGroup(l2[1], l2[2], l2[3]), l3[1]))
        self.play(Circumscribe(l3[1], color=VERT_OK))
        self.attendre_voix()

    # ── 04 : un nombre négatif ──────────────────────────────────────────────

    def ecran_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-negatif")
        self.titre_ecran("Un nombre négatif")
        self.au_mot("toujours des parenthèses")
        regle = self.ligne([("Un négatif : toujours entre", BLEU_CALCUL), ("(   )", PAREN)], 38)
        regle.move_to(P(-0.6, 2.45))
        self.play(FadeIn(regle[0], shift=UP * 0.2), GrowFromCenter(regle[1]))
        self.gonfler(regle[1])
        self.au_mot("5 moins 2 x")
        expr = self.t(f"5 {MOINS} 2x", 64).move_to(P(-4.3, 1.25))
        for i, c in [(0, COUL_CONST), (2, COUL_COEF), (3, COUL_X)]:
            expr[i].set_color(c)
        self.play(Write(expr))
        self.au_mot("pour x égale moins 3")
        val = self.t(f"pour x = {MOINS}3", 50, COUL_X).next_to(expr, RIGHT, buff=0.8)
        self.play(FadeIn(val, shift=LEFT * 0.2))
        self.au_mot("5 moins 2 fois")
        n3 = self.neg(3, 64, COUL_X)
        l1 = self.ligne([("=", WHITE), ("5", COUL_CONST), (MOINS, WHITE), ("2", COUL_COEF),
                         ("×", WHITE)], 64)
        VGroup(*l1, n3).arrange(RIGHT, buff=0.29)
        VGroup(l1, n3).move_to(P(-1.8, 0.0)).align_to(expr, LEFT)
        self.play(FadeIn(l1))
        self.au_mot("parenthèse, moins 3")
        self.play(GrowFromCenter(n3[0]), GrowFromCenter(n3[-1]), TransformFromCopy(val[-2:], n3[1:3]))
        parens = VGroup(n3[0], n3[-1])
        self.gonfler(parens)
        self.au_mot("2 fois moins 3")
        prod = VGroup(l1[3], l1[4], n3)
        self.play(Indicate(prod, color=BLEU_CALCUL, scale_factor=1.15))
        self.au_mot("moins 6")
        n6 = self.neg(6, 64, BLEU_CALCUL)
        l2 = self.ligne([("=", WHITE), ("5", COUL_CONST), (MOINS, WHITE)], 64)
        VGroup(*l2, n6).arrange(RIGHT, buff=0.29)
        VGroup(l2, n6).set_y(-1.2).align_to(l1, LEFT)
        self.play(FadeIn(l2), TransformFromCopy(prod, n6))
        self.au_mot("5 moins, moins 6")
        deux_moins = VGroup(l2[2], n6[1])
        self.play(Indicate(deux_moins, color=ROUGE_ERREUR, scale_factor=1.6))
        self.au_mot("c'est 5 plus 6")
        l3 = self.ligne([("=", WHITE), ("5", COUL_CONST), ("+", BLEU_CALCUL), ("6", BLEU_CALCUL)], 64)
        l3.set_y(-2.4).align_to(l1, LEFT)
        self.play(FadeIn(l3[0]), FadeIn(l3[1]), TransformFromCopy(deux_moins, l3[2]), FadeIn(l3[3]))
        self.gonfler(l3[2])
        self.au_mot("11")
        r = self.ligne([("=", WHITE), ("11", VERT_OK)], 64).next_to(l3, RIGHT, buff=0.29)
        self.play(FadeIn(r))
        self.play(Circumscribe(r[1], color=VERT_OK))
        self.attendre_voix()

    # ── 05 : le piège du carré ──────────────────────────────────────────────

    def ecran_carre_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-carre-negatif")
        self.titre_ecran("Le piège du carré")
        self.au_mot("x au carré, pour")
        expr = self.t("x²", 72, COUL_X)
        expr[1].set_color(WHITE)
        val = self.t(f"pour x = {MOINS}3", 50, COUL_X)
        haut = VGroup(expr, val).arrange(RIGHT, buff=0.7).move_to(P(-0.6, 2.2))
        self.play(Write(expr))
        self.play(FadeIn(val, shift=LEFT * 0.2))
        sep = DashedLine(P(-0.2, 1.4), P(-0.2, -2.6), color=GREY_B)
        self.au_mot("Parenthèse, moins 3, au carré")
        c1 = self.t(f"({MOINS}3)²", 84, COUL_X).move_to(P(-3.6, 0.65))
        c1[0].set_color(PAREN)
        c1[3].set_color(PAREN)
        c1[4].set_color(WHITE)
        self.play(GrowFromCenter(c1[0]), GrowFromCenter(c1[3]), TransformFromCopy(val[-2:], c1[1:3]),
                  FadeIn(c1[4]), Create(sep))
        self.gonfler(VGroup(c1[0], c1[3]))
        self.au_mot("moins 3 fois moins 3")
        c2 = VGroup(self.t("=", 52), self.neg(3, 52, COUL_X), self.t("×", 52), self.neg(3, 52, COUL_X))
        c2.arrange(RIGHT, buff=0.24).move_to(P(-3.6, -0.6))
        self.play(FadeIn(c2, shift=DOWN * 0.2))
        self.au_mot("plus 9")
        c3 = self.t("= +9", 72, VERT_OK).move_to(P(-3.6, -1.85))
        self.play(TransformFromCopy(c2, c3))
        self.play(Circumscribe(c3, color=VERT_OK))
        self.au_mot("Sans parenthèses")
        f1 = self.t(f"{MOINS}3²", 84, ROUGE_ERREUR).move_to(P(2.4, 0.65))
        self.play(FadeIn(f1, shift=LEFT * 0.2))
        self.au_mot("moins 9")
        f2 = self.t(f"= {MOINS}9", 72, ROUGE_ERREUR).move_to(P(2.4, -0.6))
        self.play(FadeIn(f2))
        self.au_mot("c'est faux")
        self.play(Create(self.barrer(VGroup(f1, f2))))
        self.play(FadeIn(self.t("faux", 52, ROUGE_ERREUR).move_to(P(2.4, -1.85))))
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def expr_defi(self, font_size):
        e = self.t(f"3a {MOINS} b", font_size)
        for i, c in [(0, COUL_COEF), (1, COUL_X), (3, COUL_Y)]:
            e[i].set_color(c)
        return e

    def val_defi(self, font_size):
        return self.colorie(f"pour a = 2 et b = {MOINS}4", font_size,
                            {4: COUL_X, 5: COUL_X, 6: COUL_X, 9: COUL_Y, 10: COUL_Y, 11: COUL_Y, 12: COUL_Y})

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Calcule 3 a moins b")
        expr = self.expr_defi(110).move_to(P(-0.9, 1.3))
        self.play(Write(expr))
        q = self.t("= ?", 80, BLEU_CALCUL).next_to(expr, RIGHT, buff=0.6)
        self.play(FadeIn(q))
        self.au_mot("pour a égale 2")
        val = self.val_defi(52).move_to(P(-0.6, -0.35))
        self.play(FadeIn(val[0:7], shift=UP * 0.2))
        self.au_mot("et b égale moins 4")
        self.play(FadeIn(val[7:13], shift=UP * 0.2))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        expr = self.expr_defi(64)
        val = self.val_defi(44)
        VGroup(expr, val).arrange(RIGHT, buff=0.8).move_to(P(-0.8, 2.1))
        self.add(expr, val)
        self.au_mot("3 fois 2, moins")
        l1 = self.ligne([("=", WHITE), ("3", COUL_COEF), ("×", WHITE), ("2", COUL_X), (MOINS, WHITE)], 64)
        n4 = self.neg(4, 64, COUL_Y)
        VGroup(*l1, n4).arrange(RIGHT, buff=0.29)
        VGroup(l1, n4).move_to(P(-2.0, 0.75))
        self.play(FadeIn(VGroup(l1[0], l1[1], l1[2], l1[4])), TransformFromCopy(val[6], l1[3]))
        self.au_mot("parenthèse, moins 4")
        self.play(GrowFromCenter(n4[0]), GrowFromCenter(n4[-1]), TransformFromCopy(val[11:13], n4[1:3]))
        self.gonfler(VGroup(n4[0], n4[-1]))
        self.au_mot("6 moins, moins 4")
        l2 = self.ligne([("=", WHITE), ("6", WHITE), (MOINS, WHITE)], 64)
        m4 = self.neg(4, 64, COUL_Y)
        VGroup(*l2, m4).arrange(RIGHT, buff=0.29)
        VGroup(l2, m4).set_y(-0.5).align_to(l1, LEFT)
        self.play(FadeIn(l2[0]), TransformFromCopy(VGroup(l1[1], l1[2], l1[3]), l2[1]),
                  FadeIn(l2[2]), TransformFromCopy(n4, m4))
        deux_moins = VGroup(l2[2], m4[1])
        self.play(Indicate(deux_moins, color=ROUGE_ERREUR, scale_factor=1.6))
        self.au_mot("c'est 6 plus 4")
        l3 = self.ligne([("=", WHITE), ("6", WHITE), ("+", BLEU_CALCUL), ("4", BLEU_CALCUL)], 64)
        l3.set_y(-1.75).align_to(l1, LEFT)
        self.play(FadeIn(l3[0]), FadeIn(l3[1]), TransformFromCopy(deux_moins, l3[2]), FadeIn(l3[3]))
        self.au_mot("10")
        r = self.ligne([("=", WHITE), ("10", VERT_OK)], 64).next_to(l3, RIGHT, buff=0.29)
        self.play(FadeIn(r))
        self.play(Circumscribe(r[1], color=VERT_OK))
        self.attendre_voix()

    # ── 07 : ce que tu as appris (règle du 13/10 : des affirmations) ─────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ('On remplace chaque', 'On remplace chaque lettre par sa valeur.'),
            ('On respecte', 'On respecte les priorités, carrés compris.'),
            ('Et un négatif', 'Un négatif se protège par des parenthèses.'),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 32)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.6, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(Create(l[0]), FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute('Épisode 4 : réduire une expression', color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_marche()
        self.ecran_deux_lettres()
        self.ecran_priorites()
        self.ecran_negatif()
        self.ecran_carre_negatif()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
