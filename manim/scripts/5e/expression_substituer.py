# expression_substituer.py
# EleveAI — Maths 5e — Expression littérale, épisode 3 : calculer une expression
# en remplaçant la lettre (notionId : litteral_calcul, micro : litteral_substituer),
# AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau (modèle Pythagore 4e). Paysage ceinture JAUNE, comme
# l'épisode 1 (expression_comprendre.py), dont on reprend le dessin.
#
# ⭐ LE DESSIN QUI PORTE TOUT : toujours la barquette de letchis (3 €) et le sac
# (2 €). Cette fois on en achète 7 : le x SORT (rouge), le 7 (jaune) prend sa
# place, et le signe × caché REVIENT (agrandi puis rétréci). Puis la
# multiplication d'abord : 3 × 7 = 21, 21 + 2 = 23 €.
# Coefficient VERT, terme constant ORANGE, lettre et valeur JAUNE (épisode 1).
#
# Écrans : 00 garde · 01 marché (7 barquettes + 1 sac) · 02 remplacer · 03 la
# multiplication d'abord · 04 un autre exemple (3x − 2, x = 6) · 05 un négatif
# (2x + 5, x = −3, parenthèses) · 06 piège (3x ≠ 34) · 07 défi (4x − 5, x = 2)
# + correction · 08 « Ce que tu sais faire maintenant » · 09 abonnement.
#
# Voix : manim/voix/5e-expression-substituer.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/expression_substituer.py ExpressionSubstituer5e -o eleveai-maths-5e-expression-substituer --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/expression-litterale/03-substituer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from expression_comprendre import *  # noqa: F401,F403 (Notion5e, P, couleurs, charte, manim)
from expression_comprendre import ExpressionComprendre5e, COUL_COEF, COUL_CONST, P
from signes_expression_2de import echelle_ceintures

MOINS = "−"  # U+2212


class ExpressionSubstituer5e(ExpressionComprendre5e):
    nom_voix = "5e-expression-substituer"

    def ligne(self, morceaux, font_size=40):
        """Comme l'épisode 1, mais l'espace grandit avec la taille du texte."""
        buff = max(0.26, font_size * 0.0045)
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def gonfler(self, mob, f=1.5, duree=0.45):
        """Pour insister : agrandir puis rétrécir."""
        self.play(mob.animate.scale(f), run_time=duree)
        self.play(mob.animate.scale(1 / f), run_time=duree)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Si je connais x")
        q = self.ligne([("Si je connais", BLEU_CALCUL), ("x", JAUNE_TITRE), (", que vaut", BLEU_CALCUL),
                        ("3x + 2", WHITE), ("?", BLEU_CALCUL)], 44)
        q[2].next_to(q[1], RIGHT, buff=0.06)
        q[3].next_to(q[2], RIGHT, buff=0.26)
        q[4].next_to(q[3], RIGHT, buff=0.2)
        q.move_to(P(-0.3, 0.3))
        q[3][0].set_color(COUL_COEF)
        q[3][1].set_color(JAUNE_TITRE)
        q[3][3].set_color(COUL_CONST)
        self.play(FadeIn(q, shift=UP * 0.2))
        self.au_mot("que vaut 3 x plus 2")
        self.gonfler(q[3])
        self.attendre_voix(marge=1.5)

    # ── 01 : le marché, 7 barquettes ────────────────────────────────────────

    def ecran_marche(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-marche")
        self.titre_ecran("Retour au marché de Saint-Pierre")
        b = self.barquette(1.2).move_to(P(-3.6, 0.3))
        self.play(FadeIn(b, shift=DOWN * 0.3))
        self.au_mot("3 euros la barquette")
        e1 = self.etiquette("3 € la barquette", COUL_COEF).next_to(b, DOWN, buff=0.4)
        self.play(GrowFromCenter(e1))
        self.au_mot("et 2 euros le sac")
        s = self.sac(1.0).move_to(P(1.4, 0.4))
        e2 = self.etiquette("2 € le sac", COUL_CONST).next_to(s, DOWN, buff=0.4)
        self.play(FadeIn(s, shift=DOWN * 0.3))
        self.play(GrowFromCenter(e2))
        self.au_mot("Le prix, c'est")
        prix = self.ligne([("prix =", WHITE), ("3x", COUL_COEF), ("+ 2", COUL_CONST)], 50).move_to(P(-0.6, 2.25))
        prix[1][1].set_color(JAUNE_TITRE)
        self.play(Write(prix))
        self.au_mot("j'achète 7 barquettes")
        rangee = VGroup(*[self.barquette(0.55) for _ in range(7)]).arrange(RIGHT, buff=0.15)
        rangee.move_to(P(-2.6, 0.6))
        s2 = self.sac(0.75).next_to(rangee, RIGHT, buff=0.7)
        self.play(FadeOut(e1), FadeOut(e2), ReplacementTransform(b, rangee[0]), s.animate.become(s2))
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in rangee[1:]], lag_ratio=0.2))
        n7 = self.t("7 barquettes", 40, JAUNE_TITRE).next_to(rangee, DOWN, buff=0.45)
        un = self.t("1 sac", 40, COUL_CONST).next_to(s, DOWN, buff=0.45).align_to(n7, DOWN)
        self.play(FadeIn(n7, shift=UP * 0.2), FadeIn(un, shift=UP * 0.2))
        self.gonfler(n7[0])
        self.au_mot("Combien je paie")
        self.play(Write(self.chute("Combien je paie ?", color=BLEU_CALCUL, font_size=40)))
        self.attendre_voix()

    # ── 02 : remplacer x par 7 ──────────────────────────────────────────────

    def ecran_remplacer(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-remplacer")
        self.titre_ecran("Je remplace x par 7")
        expr = self.t("3x + 2", 120).move_to(P(-0.6, 0.8))
        expr[0].set_color(COUL_COEF)
        expr[1].set_color(JAUNE_TITRE)
        expr[3].set_color(COUL_CONST)
        self.play(Write(expr))
        val = self.t("x = 7", 50, JAUNE_TITRE).move_to(P(-4.6, 2.3))
        self.play(FadeIn(val, shift=RIGHT * 0.2))
        # le x sort, le 7 glisse à sa place
        self.play(expr[1].animate.set_color(ROUGE_ERREUR))
        sept = self.t("7", 120, JAUNE_TITRE).move_to(val[2])
        sept.scale(50 / 120)
        self.play(FadeOut(expr[1], shift=UP * 1.2))
        self.play(sept.animate.scale(120 / 50).move_to(expr[1]), run_time=1.0)
        # le signe × caché revient
        self.au_mot("le signe fois caché revient")
        final = self.ligne([("3", COUL_COEF), ("×", WHITE), ("7", JAUNE_TITRE),
                            ("+", WHITE), ("2", COUL_CONST)], 120).move_to(P(-0.6, 0.8))
        self.play(expr[0].animate.move_to(final[0]), sept.animate.move_to(final[2]),
                  expr[2].animate.move_to(final[3]), expr[3].animate.move_to(final[4]))
        self.play(GrowFromCenter(final[1]))
        self.gonfler(final[1], duree=0.5)
        self.au_mot("3 x devient 3 fois 7")
        dev = self.ligne([("3x", COUL_COEF), ("devient", WHITE), ("3 ×", COUL_COEF), ("7", JAUNE_TITRE)], 44)
        dev[0][1].set_color(JAUNE_TITRE)
        dev.move_to(P(-0.6, -1.0))
        self.play(FadeIn(dev, shift=UP * 0.2))
        self.au_mot("Le prix : 3 fois 7, plus 2")
        self.play(Write(self.chute("Le prix : 3 × 7 + 2", color=BLEU_CALCUL, font_size=40)))
        self.attendre_voix()

    # ── 03 : la multiplication d'abord ──────────────────────────────────────

    def ecran_priorite(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-priorite")
        self.titre_ecran("La multiplication d'abord")
        l1 = self.ligne([("3", COUL_COEF), ("×", WHITE), ("7", JAUNE_TITRE),
                         ("+", WHITE), ("2", COUL_CONST)], 96).move_to(P(-0.6, 1.5))
        self.add(l1)
        self.au_mot("la multiplication d'abord")
        prod = VGroup(l1[0], l1[1], l1[2])
        soul = Line(prod.get_corner(DL) + DOWN * 0.2, prod.get_corner(DR) + DOWN * 0.2,
                    stroke_width=8, color=BLEU_CALCUL)
        self.play(Create(soul))
        self.play(Indicate(prod, color=BLEU_CALCUL, scale_factor=1.2))
        self.au_mot("3 fois 7 : 21")
        l2 = self.ligne([("=", WHITE), ("21", BLEU_CALCUL), ("+", WHITE), ("2", COUL_CONST)], 96)
        l2.set_y(-0.1).shift(RIGHT * (l1[0].get_left()[0] - l2[1].get_left()[0]))
        self.play(FadeIn(l2[0]), TransformFromCopy(prod, l2[1]))
        self.play(FadeIn(l2[2]), FadeIn(l2[3]))
        self.au_mot("Plus 2 : 23")
        l3 = self.ligne([("=", WHITE), ("23 €", VERT_OK)], 96).set_y(-1.7).align_to(l2, LEFT)
        self.play(FadeIn(l3[0]), TransformFromCopy(VGroup(l2[1], l2[2], l2[3]), l3[1]))
        self.au_mot("Je paie 23 euros")
        rangee = VGroup(*[self.barquette(0.42) for _ in range(7)]).arrange(RIGHT, buff=0.12)
        rangee.add(self.sac(0.5).next_to(rangee, RIGHT, buff=0.45))
        rangee.move_to(P(-1.6, -3.15))
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in rangee], lag_ratio=0.1),
                  Circumscribe(l3[1], color=VERT_OK))
        self.gonfler(l3[1], f=1.3)
        self.attendre_voix()

    # ── 04 : un autre exemple ───────────────────────────────────────────────

    def ecran_exemple(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-exemple")
        self.titre_ecran("Un autre exemple")
        self.au_mot("3 x moins 2")
        expr = self.t(f"3x {MOINS} 2", 72).move_to(P(-3.6, 2.0))
        expr[0].set_color(COUL_COEF)
        expr[1].set_color(JAUNE_TITRE)
        expr[3].set_color(COUL_CONST)
        self.play(Write(expr))
        self.au_mot("pour x égale 6")
        val = self.t("pour x = 6", 52, JAUNE_TITRE).next_to(expr, RIGHT, buff=0.9)
        self.play(FadeIn(val, shift=LEFT * 0.2))
        self.au_mot("Je remplace")
        l1 = self.ligne([("=", WHITE), ("3", COUL_COEF), ("×", WHITE), ("6", JAUNE_TITRE),
                         (MOINS, WHITE), ("2", COUL_CONST)], 72).move_to(P(-2.0, 0.6))
        self.play(FadeIn(VGroup(l1[0], l1[1], l1[2], l1[4], l1[5])), TransformFromCopy(val[-1], l1[3]))
        self.gonfler(l1[2])
        self.au_mot("18 moins 2")
        l2 = self.ligne([("=", WHITE), ("18", BLEU_CALCUL), (MOINS, WHITE), ("2", COUL_CONST)], 72)
        l2.align_to(l1, LEFT).set_y(-0.7)
        self.play(FadeIn(l2[0]), TransformFromCopy(VGroup(l1[1], l1[2], l1[3]), l2[1]), FadeIn(l2[2:]))
        self.au_mot("16")
        l3 = self.ligne([("=", WHITE), ("16", VERT_OK)], 72)
        l3.align_to(l1, LEFT).set_y(-2.0)
        self.play(FadeIn(l3))
        self.play(Circumscribe(l3[1], color=VERT_OK))
        self.attendre_voix()

    # ── 05 : avec un nombre négatif ─────────────────────────────────────────

    def ecran_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-negatif")
        self.titre_ecran("Avec un nombre négatif")
        self.au_mot("2 x plus 5")
        expr = self.t("2x + 5", 64).move_to(P(-4.0, 2.15))
        expr[0].set_color(COUL_COEF)
        expr[1].set_color(JAUNE_TITRE)
        expr[3].set_color(COUL_CONST)
        self.play(Write(expr))
        self.au_mot("pour x égale moins 3")
        val = self.t(f"pour x = {MOINS}3", 50, JAUNE_TITRE).next_to(expr, RIGHT, buff=0.9)
        self.play(FadeIn(val, shift=LEFT * 0.2))
        self.au_mot("Je remplace avec des parenthèses")
        l1 = self.ligne([("2", COUL_COEF), ("×", WHITE), (f"({MOINS}3)", JAUNE_TITRE),
                         ("+", WHITE), ("5", COUL_CONST)], 72).move_to(P(-1.2, 0.85))
        parens = VGroup(l1[2][0], l1[2][3]).set_color(ORANGE_RETENUE)
        self.play(FadeIn(VGroup(l1[0], l1[1], l1[3], l1[4])), TransformFromCopy(val[-2:], l1[2][1:3]))
        self.au_mot("parenthèse, moins 3")
        self.play(GrowFromCenter(parens[0]), GrowFromCenter(parens[1]))
        self.play(parens.animate.scale(1.5), run_time=0.5)
        self.play(parens.animate.scale(1 / 1.5), run_time=0.5)
        self.au_mot("2 fois moins 3, c'est")
        m = f"({MOINS}3)"
        cal = self.ligne([("2 ×", BLEU_CALCUL), (m, BLEU_CALCUL), ("=", WHITE), (m, BLEU_CALCUL),
                          ("+", WHITE), (m, BLEU_CALCUL)], 44).move_to(P(-1.6, -0.55))
        self.play(FadeIn(VGroup(cal[0], cal[1], cal[2])))
        self.au_mot("moins 3 plus moins 3")
        self.play(FadeIn(VGroup(cal[3], cal[4], cal[5]), shift=RIGHT * 0.2))
        self.au_mot(": moins 6")
        r6 = self.t(f"= {MOINS}6", 44, BLEU_CALCUL).next_to(cal, RIGHT, buff=0.26)
        self.play(FadeIn(r6))
        self.au_mot("Moins 6 plus 5")
        l3 = self.ligne([(f"{MOINS}6", BLEU_CALCUL), ("+", WHITE), ("5", COUL_CONST)], 64)
        l3.move_to(P(-2.4, -1.85))
        self.play(TransformFromCopy(r6[1:], l3[0]), FadeIn(l3[1:]))
        self.au_mot(": moins 1")
        r1 = self.t(f"= {MOINS}1", 64, VERT_OK).next_to(l3, RIGHT, buff=0.3)
        self.play(FadeIn(r1))
        self.play(Circumscribe(r1, color=VERT_OK))
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("Pour x égale 4")
        self.play(FadeIn(self.t("x = 4", 52, JAUNE_TITRE).move_to(P(-4.8, 1.8))))
        self.au_mot("3 x ne vaut pas 34")
        faux = self.t("3x = 34", 64, ROUGE_ERREUR).move_to(P(-1.2, 1.8))
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux)))
        self.play(FadeIn(self.t("on ne colle pas 3 et 4", 30, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.4)))
        self.au_mot("On remet toujours")
        regle = self.t("On remet toujours le signe ×", 38, BLEU_CALCUL).move_to(P(-0.6, 0.4))
        self.play(FadeIn(regle, shift=UP * 0.2))
        self.gonfler(regle[-1])
        self.au_mot("3 fois 4, 12")
        bon = self.ligne([("3x =", WHITE), ("3 × 4", VERT_OK), ("=", WHITE), ("12", VERT_OK)], 64)
        bon.move_to(P(-0.6, -1.1))
        self.play(Write(bon))
        self.play(Circumscribe(bon, color=VERT_OK))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Calcule 4 x moins 5")
        expr = self.t(f"4x {MOINS} 5", 110).move_to(P(-0.6, 1.2))
        expr[0].set_color(COUL_COEF)
        expr[1].set_color(JAUNE_TITRE)
        expr[3].set_color(COUL_CONST)
        self.play(Write(expr))
        self.au_mot("pour x égale 2")
        val = self.t("pour x = 2", 56, JAUNE_TITRE).move_to(P(-0.6, -0.4))
        self.play(FadeIn(val, shift=UP * 0.2))
        q = self.t("= ?", 80, BLEU_CALCUL).next_to(expr, RIGHT, buff=0.4)
        self.play(FadeIn(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        expr = self.t(f"4x {MOINS} 5", 72).move_to(P(-3.6, 2.0))
        expr[0].set_color(COUL_COEF)
        expr[1].set_color(JAUNE_TITRE)
        expr[3].set_color(COUL_CONST)
        val = self.t("pour x = 2", 52, JAUNE_TITRE).next_to(expr, RIGHT, buff=0.9)
        self.add(expr, val)
        self.au_mot("Je remplace x par 2")
        self.play(Indicate(val, color=JAUNE_TITRE))
        self.au_mot("4 fois 2, moins 5")
        l1 = self.ligne([("=", WHITE), ("4", COUL_COEF), ("×", WHITE), ("2", JAUNE_TITRE),
                         (MOINS, WHITE), ("5", COUL_CONST)], 72).move_to(P(-2.0, 0.6))
        self.play(FadeIn(VGroup(l1[0], l1[1], l1[2], l1[4], l1[5])), TransformFromCopy(val[-1], l1[3]))
        self.gonfler(l1[2])
        self.au_mot("8 moins 5")
        l2 = self.ligne([("=", WHITE), ("8", BLEU_CALCUL), (MOINS, WHITE), ("5", COUL_CONST)], 72)
        l2.align_to(l1, LEFT).set_y(-0.7)
        self.play(FadeIn(l2[0]), TransformFromCopy(VGroup(l1[1], l1[2], l1[3]), l2[1]), FadeIn(l2[2:]))
        self.au_mot(": 3.")
        l3 = self.ligne([("=", WHITE), ("3", VERT_OK)], 72)
        l3.align_to(l1, LEFT).set_y(-2.0)
        self.play(FadeIn(l3))
        self.play(Circumscribe(l3[1], color=VERT_OK))
        self.attendre_voix()

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Pour remplacer", "Pour remplacer la lettre, on remet le signe ×"),
            ("On fait la multiplication", "La multiplication d'abord"),
            ("Et un nombre négatif", "Un nombre négatif entre parenthèses : (−2)"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 34)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 10.0:  # ne pas toucher Ti-Margo (coin bas-droit)
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("Épisode 4 : réduire une expression", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_marche()
        self.ecran_remplacer()
        self.ecran_priorite()
        self.ecran_exemple()
        self.ecran_negatif()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
