# litteral_calcul.py
# EleveAI — Maths 5e — Le calcul littéral (notionId : litteral_calcul), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-5e-calcul-litteral.tsx et la
# banque du coach (3x + 1 = 10, 3(x + 2)).
#
# ⭐ 09/10/2026 : première vidéo du fil « calcul littéral » qui traverse le
# collège et le lycée (5e → 4e → 3e, automatismes de 1re et de STMG).
# Voix validée par Frédéric : manim/voix/5e-litteral-calcul.json (débit −8).
#
# ⭐ LE DESSIN QUI PORTE TOUT : le SAC de x billes et la BILLE seule. Il fait
# voir pourquoi 3x + 2x = 5x, pourquoi 3x + 2 ne se réduit pas, et pourquoi
# 3(x + 2) = 3x + 6. Frédéric adore les schémas de billes.
#
# Mapping micro-compétences (coach 5e, notion litteral_calcul) → écrans :
# - litteral_expression_comprendre → 01-lettre (7n, coefficient, terme constant)
# - litteral_traduire              → 02-traduire (le double de x augmenté de 5)
# - litteral_substituer            → 03-substituer (x = 6, puis x = −3)
# - litteral_reduire               → 04-reduire (sacs, 3x + 2, 2x et x²)
# - litteral_tester                → 05-tester (3x + 1 = 10)
# - litteral_distributivite        → 06-developper (3(x + 2))
# - litteral_defi                  → 07-defi + correction (programme de calcul)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/litteral_calcul.py LitteralCalcul5e -o eleveai-maths-5e-litteral-calcul --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

SAC = "#8B5E3C"
BILLE = "#60A5FA"

OBJECTIFS = [
    "Lire et traduire une expression",
    "Remplacer la lettre par un nombre",
    "Réduire une expression",
    "Tester une égalité, et développer",
]


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


class LitteralCalcul5e(Notion5e):
    nom_voix = "5e-litteral-calcul"

    # ── les dessins ─────────────────────────────────────────────────────────

    def sac(self, h=0.75):
        corps = RoundedRectangle(width=h * 0.85, height=h, corner_radius=0.16,
                                 fill_color=SAC, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        noeud = Line(corps.get_top() + LEFT * 0.12, corps.get_top() + RIGHT * 0.12,
                     stroke_width=5, color=WHITE)
        x = Text("x", font_size=int(h * 40), color=WHITE).move_to(corps.get_center() + DOWN * 0.04)
        return VGroup(corps, noeud, x)

    def bille(self, r=0.14):
        return Circle(radius=r, fill_color=BILLE, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)

    def rangee(self, n_sacs, n_billes=0, buff=0.14):
        g = VGroup(*[self.sac() for _ in range(n_sacs)], *[self.bille() for _ in range(n_billes)])
        return g.arrange(RIGHT, buff=buff)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=5, color=color)

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    # ── 00 : la page de garde, PARLÉE ───────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Le calcul littéral", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        q = self.t("1 place de cinéma = 7 €.  Et pour n places ?", 34, BLEU_CALCUL).next_to(identite, DOWN, buff=0.45)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))

        lignes = []
        for mot, txt, y in [("2 places", "2 places : 14 €", 0.6),
                            ("10 places", "10 places : 70 €", -0.15),
                            ("Et pour n'importe quel", "n places : ?", -0.9)]:
            self.au_mot(mot)
            l = self.t(txt, 36).move_to([-3.2, y, 0])
            self.play(FadeIn(l, shift=RIGHT * 0.2))
            lignes.append(l)

        self.au_mot("Une seule écriture")
        sept_n = self.t("7n", 110, VERT_OK).move_to([2.6, -0.15, 0])
        self.play(GrowFromCenter(sept_n))
        self.play(Circumscribe(sept_n, color=VERT_OK))
        self.au_mot("C'est ça")
        self.play(Write(self.chute("C'est ça, le calcul littéral.", color=JAUNE_TITRE, font_size=34)))
        self.attendre_voix()

    # ── 01 : la lettre ──────────────────────────────────────────────────────

    def ecran_lettre(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-lettre")
        self.titre_ecran("1. Une lettre, c'est un nombre")

        self.play(FadeIn(self.t("un nombre qu'on ne connaît pas encore,", 30).move_to([-0.6, 2.2, 0])))
        self.play(FadeIn(self.t("ou qui peut changer", 30).move_to([-0.6, 1.65, 0])))

        self.au_mot("7 n, ça veut dire")
        e = self.t("7n  =  7 × n", 56, BLEU_CALCUL).move_to([-0.6, 0.65, 0])
        self.play(Write(e))
        self.au_mot("le signe fois disparaît")
        self.play(FadeIn(self.t("le signe × disparaît", 30, ORANGE_RETENUE).move_to([-0.6, -0.15, 0])))

        self.au_mot("Dans l'expression")
        self.play(*[FadeOut(m) for m in self.mobjects if isinstance(m, Text) and m.get_y() < 2.9])
        expr = self.t("3x + 2", 110).move_to([-0.6, 0.6, 0])
        self.play(Write(expr))
        self.au_mot("le 3 collé")
        c = self.t("coefficient", 32, VERT_OK).move_to([-3.4, -1.3, 0])
        fc = Arrow(c.get_top(), expr[0].get_bottom(), buff=0.12, color=VERT_OK)
        self.play(expr[0].animate.set_color(VERT_OK), GrowArrow(fc), FadeIn(c))
        self.au_mot("Le 2, tout seul")
        k = self.t("terme constant", 32, ORANGE_RETENUE).move_to([2.2, -1.3, 0])
        fk = Arrow(k.get_top(), expr[3].get_bottom(), buff=0.12, color=ORANGE_RETENUE)
        self.play(expr[3].animate.set_color(ORANGE_RETENUE), GrowArrow(fk), FadeIn(k))
        self.attendre_voix()

    # ── 02 : traduire ───────────────────────────────────────────────────────

    def ecran_traduire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-traduire")
        self.titre_ecran("2. Traduire une phrase")

        self.au_mot("Le double de x augmenté")
        ph = self.t("« le double de x augmenté de 5 »", 36, BLEU_CALCUL).move_to([-0.6, 2.2, 0])
        self.play(Write(ph))
        self.au_mot("Le double de x, c'est")
        self.play(FadeIn(self.t("le double de x  →  2x", 34).move_to([-0.6, 1.3, 0])))
        self.au_mot("Augmenté de 5 : on ajoute")
        self.play(FadeIn(self.t("augmenté de 5  →  + 5", 34).move_to([-0.6, 0.6, 0])))
        self.au_mot("On obtient")
        bon = self.t("2x + 5", 80, VERT_OK).move_to([-2.8, -0.7, 0])
        self.play(GrowFromCenter(bon))
        self.au_mot("Attention")
        faux = self.t("2(x + 5)", 70, ORANGE_RETENUE).move_to([2.4, -0.7, 0])
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux)))
        self.au_mot("Là, on doublerait")
        self.play(Write(self.chute("Là, on doublerait aussi le 5.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 03 : substituer ─────────────────────────────────────────────────────

    def ecran_substituer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-substituer")
        self.titre_ecran("3. Remplacer la lettre par un nombre")

        self.au_mot("Calculons")
        self.play(Write(self.t("3x − 2   pour   x = 6", 40, BLEU_CALCUL).move_to([-0.6, 2.2, 0])))
        self.au_mot("Je remplace x par 6")
        self.play(FadeIn(self.t("3 × 6 − 2", 40).move_to([-3.0, 1.35, 0])))
        self.au_mot("18 moins 2")
        self.play(FadeIn(self.t("=  18 − 2  =  16", 40, VERT_OK).move_to([1.4, 1.35, 0])))

        self.au_mot("Et avec un nombre négatif")
        self.play(Write(self.t("2x + 5   pour   x = −3", 40, BLEU_CALCUL).move_to([-0.6, 0.2, 0])))
        self.au_mot("devient")
        calc = self.t("2 × (−3) + 5", 40).move_to([-3.0, -0.65, 0])
        self.play(FadeIn(calc))
        parens = VGroup(calc[2], calc[5])
        self.play(Indicate(parens, color=ORANGE_RETENUE, scale_factor=1.6))
        self.au_mot("Moins 6 plus 5")
        self.play(FadeIn(self.t("=  −6 + 5  =  −1", 40, VERT_OK).move_to([1.6, -0.65, 0])))
        self.au_mot("on n'oublie jamais")
        self.play(Write(self.chute("Avec un négatif : toujours des parenthèses.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 04 : réduire ────────────────────────────────────────────────────────

    def ecran_reduire(self):
        self.clear()
        m = self.add_mascotte()
        self.dire("04-reduire")
        titre = self.titre_ecran("4. Réduire")

        self.au_mot("3 sacs de x billes")
        r3 = self.rangee(3).move_to([-4.3, 1.7, 0])
        self.play(LaggedStart(*[FadeIn(s, scale=0.6) for s in r3], lag_ratio=0.2))
        self.au_mot("plus 2 sacs")
        plus = self.t("+", 44).next_to(r3, RIGHT, buff=0.3)
        r2 = self.rangee(2).next_to(plus, RIGHT, buff=0.3)
        self.play(FadeIn(plus), LaggedStart(*[FadeIn(s, scale=0.6) for s in r2], lag_ratio=0.2))
        self.au_mot("ça fait 5 sacs")
        eg = self.t("=", 44).next_to(r2, RIGHT, buff=0.3)
        r5 = self.rangee(5).next_to(eg, RIGHT, buff=0.3)
        self.play(FadeIn(eg), TransformFromCopy(VGroup(*r3, *r2), r5))
        self.au_mot("3 x plus 2 x égale")
        f1 = self.t("3x + 2x = 5x", 48, VERT_OK).move_to([-0.6, 0.65, 0])
        self.play(Write(f1))

        self.au_mot("Mais 3 x plus 2")
        r = VGroup(self.rangee(3), self.t("+", 44), self.rangee(0, 2)).arrange(RIGHT, buff=0.3).move_to([-3.2, -0.6, 0])
        self.play(FadeIn(r))
        faux = self.t("5x", 56, ORANGE_RETENUE).move_to([1.6, -0.6, 0])
        ne = self.t("≠", 56, ORANGE_RETENUE).next_to(faux, LEFT, buff=0.3)
        self.play(FadeIn(ne), FadeIn(faux))
        self.au_mot("Le 2 n'est pas un sac")
        self.play(Indicate(r[2], color=BILLE, scale_factor=1.5))
        self.au_mot("3 x plus 2 reste")
        self.play(Write(self.t("3x + 2 reste 3x + 2", 40, ORANGE_RETENUE).move_to([-0.6, -1.7, 0])))

        self.au_mot("Autre piège")
        self.play(*[FadeOut(o) for o in self.mobjects if o is not m and o is not titre])
        self.au_mot("x plus x, ça fait")
        a = self.t("x + x = 2x", 60, VERT_OK).move_to([-3.2, 1.3, 0])
        self.play(Write(a))
        self.au_mot("Mais x fois x")
        b = self.t("x × x = x²", 60, BLEU_CALCUL).move_to([2.4, 1.3, 0])
        self.play(Write(b))
        self.au_mot("Ce n'est pas pareil")
        self.play(Write(self.t("2x  ≠  x²", 70, ORANGE_RETENUE).move_to([-0.6, 0.0, 0])))
        self.au_mot("pour x égale 3")
        self.play(FadeIn(self.t("pour x = 3 :   2x = 6    mais    x² = 9", 40).move_to([-0.6, -1.3, 0])))
        self.attendre_voix()

    # ── 05 : tester ─────────────────────────────────────────────────────────

    def ecran_tester(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tester")
        self.titre_ecran("5. Tester une égalité")

        self.au_mot("3 x plus 1 égale 10")
        eq = self.t("3x + 1 = 10 ?", 60, BLEU_CALCUL).move_to([-0.6, 2.15, 0])
        self.play(Write(eq))

        self.au_mot("pour x égale 3")
        self.play(FadeIn(self.t("x = 3", 40, JAUNE_TITRE).move_to([-5.0, 1.05, 0])))
        self.au_mot("À gauche : 3 fois 3")
        self.play(FadeIn(self.t("gauche : 3 × 3 + 1 = 10", 36).move_to([-0.9, 1.05, 0])))
        self.au_mot("À droite : 10")
        self.play(FadeIn(self.t("droite : 10", 36).move_to([4.1, 1.05, 0])))
        self.au_mot("Les deux côtés sont égaux")
        v = VGroup(self.coche(), self.t("vraie pour x = 3", 38, VERT_OK)).arrange(RIGHT, buff=0.25).move_to([-0.6, 0.25, 0])
        self.play(FadeIn(v, shift=UP * 0.15))

        self.au_mot("Et pour x égale 2")
        self.play(FadeIn(self.t("x = 2", 40, JAUNE_TITRE).move_to([-5.0, -0.85, 0])))
        self.au_mot("À gauche : 3 fois 2")
        self.play(FadeIn(self.t("gauche : 3 × 2 + 1 = 7", 36).move_to([-0.9, -0.85, 0])))
        self.au_mot("7 n'est pas égal")
        f = self.t("7 ≠ 10 : fausse pour x = 2", 38, ROUGE_ERREUR).move_to([-0.6, -1.7, 0])
        self.play(FadeIn(f, shift=UP * 0.15))
        self.attendre_voix()

    # ── 06 : développer ─────────────────────────────────────────────────────

    def ecran_developper(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-developper")
        self.titre_ecran("6. Développer")

        expr = self.t("3(x + 2)", 80, BLEU_CALCUL).move_to([-0.6, 1.45, 0])
        self.play(Write(expr))

        self.au_mot("Ça veut dire 3 sacs")
        paquets = VGroup()
        for _ in range(3):
            contenu = self.rangee(1, 2, buff=0.1)
            cadre = SurroundingRectangle(contenu, color=GRAY_B, buff=0.14, corner_radius=0.12)
            paquets.add(VGroup(cadre, contenu))
        paquets.arrange(RIGHT, buff=0.45).move_to([-0.6, 0.15, 0])
        self.play(LaggedStart(*[FadeIn(p, scale=0.7) for p in paquets], lag_ratio=0.3))

        self.au_mot("En tout : 3 fois x billes")
        f1 = CurvedArrow(expr[0].get_top() + UP * 0.05, expr[2].get_top() + UP * 0.05, angle=-PI / 2, color=VERT_OK)
        self.play(Create(f1), *[Indicate(p[1][0], color=VERT_OK) for p in paquets])
        self.play(FadeIn(self.t("3 × x = 3x", 40, VERT_OK).move_to([-3.4, -0.9, 0])))
        self.au_mot("et 3 fois 2 billes")
        f2 = CurvedArrow(expr[0].get_top() + UP * 0.05, expr[4].get_top() + UP * 0.05, angle=-PI / 2, color=ORANGE_RETENUE)
        self.play(Create(f2), *[Indicate(VGroup(p[1][1], p[1][2]), color=ORANGE_RETENUE) for p in paquets])
        self.play(FadeIn(self.t("3 × 2 = 6", 40, ORANGE_RETENUE).move_to([1.6, -0.9, 0])))
        self.au_mot("3 x plus 6")
        r = self.t("3(x + 2) = 3x + 6", 56, VERT_OK).move_to([-0.9, -1.85, 0])
        self.play(Write(r))

        self.au_mot("Le piège")
        faux = self.t("3x + 2", 40, ORANGE_RETENUE).move_to([4.4, -1.85, 0])
        self.play(FadeIn(faux), Create(self.barrer(faux)))
        self.au_mot("Le 3 multiplie tout")
        self.play(Write(self.chute("Le 3 multiplie TOUT ce qu'il y a dans la parenthèse.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        y = 2.0
        for mot, txt in [("Choisis un nombre", "Choisis un nombre."), ("Ajoute 3", "Ajoute 3."),
                         ("Multiplie le résultat", "Multiplie le résultat par 2."), ("Enlève 6", "Enlève 6.")]:
            self.au_mot(mot)
            self.play(FadeIn(self.t(txt, 36).move_to([-0.6, y, 0]), shift=RIGHT * 0.2))
            y -= 0.7
        self.au_mot("Tu retombes toujours")
        self.play(Write(self.t("Tu retombes sur le DOUBLE de ton nombre !", 34, VERT_OK).move_to([-0.6, y - 0.1, 0])))
        self.au_mot("Pourquoi")
        self.play(FadeIn(self.t("Pourquoi ?  Appelle ton nombre x.", 34, BLEU_CALCUL).move_to([-0.6, y - 0.85, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        y = 2.2
        for mot, gauche, droite, c in [("Je choisis x", "je choisis", "x", WHITE),
                                       ("J'ajoute 3", "+ 3", "x + 3", WHITE),
                                       ("Je multiplie par 2", "× 2", "2(x + 3)", WHITE),
                                       ("Je développe", "je développe", "2x + 6", BLEU_CALCUL),
                                       ("J'enlève 6", "− 6", "2x + 6 − 6 = 2x", VERT_OK)]:
            self.au_mot(mot)
            g = self.t(gauche, 32, GRAY_B).move_to([-3.6, y, 0])
            d = self.t(droite, 40, c).move_to([0.8, y, 0])
            self.play(FadeIn(g), Write(d), run_time=0.8)
            y -= 0.75
        self.au_mot("C'est bien le double")
        self.play(Write(self.chute("Le double de x, pour TOUS les nombres d'un coup.", color=VERT_OK)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_lettre()
        self.ecran_traduire()
        self.ecran_substituer()
        self.ecran_reduire()
        self.ecran_tester()
        self.ecran_developper()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Une lettre est un nombre : 3x veut dire 3 × x",
                "On ne réduit que ce qui se ressemble",
                "Développer : le nombre multiplie TOUT",
            ],
            rappel="Piège : 3x + 2 ne fait pas 5x, et 2x n'est pas x².",
            voix="08-finale",
        )
        self.page_abonnement(voix="09-abonne")
