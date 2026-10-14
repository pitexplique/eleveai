# expression_comprendre.py
# EleveAI — Maths 4e — Expression littérale, épisode 1 : comprendre une expression
# (notionId : litteral_expression, micro : litteral_expression_comprendre), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 4e, une paysage PAR MICRO + son
# short jumeau (ceinture blanche, expression_comprendre_short.py).
# Paysage ceinture ORANGE.
#
# ⭐ LE DESSIN QUI PORTE TOUT : le vendeur de stylos de Saint-Denis (2 € le
# stylo, 3 € d'envoi), puis les TERMES découpés par des cadres qui se SÉPARENT ;
# avec un moins, le signe part avec son cadre.
# Couleurs : coefficient VERT, terme constant ORANGE, lettre JAUNE, faux ROUGE.
#
# Voix : manim/voix/4e-expression-comprendre.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/expression_comprendre.py ExpressionComprendre4e -o eleveai-maths-4e-expression-comprendre --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/01-comprendre/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

COUL_COEF = VERT_OK
COUL_CONST = ORANGE_RETENUE
COUL_LETTRE = JAUNE_TITRE
CARTON = "#B7793F"
STYLOS = ["#3B82F6", "#EF4444", "#22C55E", "#A855F7"]
LETTRES = "xayz²"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class DessinsExpression:
    """Les dessins et les écritures partagés par la paysage et le short."""

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def expr(self, texte, font_size=60):
        """Une expression coloriée : coefficient VERT, lettre JAUNE, terme constant ORANGE."""
        m = Text(texte, font_size=font_size, color=WHITE)
        s = texte.replace(" ", "")
        if len(s) != len(m):
            return m
        i = 0
        while i < len(s):
            c = s[i]
            if c.isdigit():
                j = i
                while j < len(s) and s[j].isdigit():
                    j += 1
                coul = COUL_COEF if j < len(s) and s[j] in LETTRES and s[j] != "²" else COUL_CONST
                for k in range(i, j):
                    m[k].set_color(coul)
                i = j
                continue
            if c in LETTRES:
                m[i].set_color(COUL_LETTRE)
            i += 1
        return m

    def lab(self, texte, font_size, color, lettre=None):
        """Une étiquette d'un seul Text (les deux-points restent à leur place) ;
        `lettre` colorie en JAUNE chaque glyphe égal à ce caractère."""
        m = self.t(texte, font_size, color)
        s = texte.replace(" ", "")
        if lettre:
            for i, c in enumerate(s):
                if c == lettre:
                    m[i].set_color(COUL_LETTRE)
        return m

    def ligne(self, morceaux, font_size=40, buff=0.22):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, f=1.5):
        self.play(mob.animate.scale(f), run_time=0.45)
        self.play(mob.animate.scale(1 / f), run_time=0.45)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def cadre(self, mob, color, buff=0.16):
        return SurroundingRectangle(mob, color=color, buff=buff, stroke_width=4, corner_radius=0.12)

    def stylo(self, couleur, h=1.2):
        w = h * 0.16
        corps = RoundedRectangle(width=w, height=h * 0.62, corner_radius=w * 0.3,
                                 fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
        bouchon = RoundedRectangle(width=w * 1.1, height=h * 0.2, corner_radius=w * 0.3,
                                   fill_color="#1F2937", fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
        bouchon.next_to(corps, UP, buff=0)
        agrafe = Line(bouchon.get_top() + RIGHT * w * 0.55, bouchon.get_top() + RIGHT * w * 0.55 + DOWN * h * 0.25,
                      stroke_width=2.5, color="#D1D5DB")
        bas = corps.get_bottom()
        pointe = Polygon(bas + LEFT * w / 2, bas + RIGHT * w / 2, bas + DOWN * h * 0.18,
                         fill_color="#E5E7EB", fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
        return VGroup(corps, bouchon, agrafe, pointe)

    def stylos(self, n=4, h=1.2):
        return VGroup(*[self.stylo(STYLOS[i % len(STYLOS)], h).rotate(-0.12)
                        for i in range(n)]).arrange(RIGHT, buff=h * 0.16)

    def colis(self, s=1.0):
        boite = Rectangle(width=1.5 * s, height=1.1 * s, fill_color=CARTON, fill_opacity=1,
                          stroke_color=WHITE, stroke_width=2)
        rabat = Polygon(boite.get_corner(UL), boite.get_corner(UR),
                        boite.get_corner(UR) + UP * 0.28 * s + LEFT * 0.25 * s,
                        boite.get_corner(UL) + UP * 0.28 * s + RIGHT * 0.25 * s,
                        fill_color="#D19A5E", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        scotch = Rectangle(width=0.22 * s, height=1.1 * s, fill_color="#FDE68A", fill_opacity=0.9,
                           stroke_width=0).move_to(boite)
        fleche = Arrow(LEFT * 0.35 * s, RIGHT * 0.35 * s, buff=0, color=WHITE, stroke_width=4,
                       max_tip_length_to_length_ratio=0.4).move_to(boite.get_center() + DOWN * 0.3 * s + RIGHT * 0.38 * s)
        return VGroup(rabat, boite, scotch, fleche)

    def etiquette(self, texte, color, font_size=34):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))


class ExpressionComprendre4e(DessinsExpression, Notion4e):
    nom_voix = "4e-expression-comprendre"

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Comprendre une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Que veut dire")
        q = VGroup(self.t("Que veut dire", 46, BLEU_CALCUL), self.expr("7a − 2", 56),
                   self.t("?", 46, BLEU_CALCUL)).arrange(RIGHT, buff=0.3)
        q.move_to(P(-0.6, 0.3))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.insister(q[1])
        self.attendre_voix(marge=1.5)

    # ── 01 : les stylos ─────────────────────────────────────────────────────

    def ecran_stylos(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-stylos")
        self.titre_ecran("Le vendeur de stylos de Saint-Denis")
        self.au_mot("des stylos")
        st = self.stylos(4, 1.3).move_to(P(-3.8, 1.35))
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.3) for s in st], lag_ratio=0.2))
        self.au_mot("2 euros pièce")
        e1 = self.etiquette("2 € le stylo", COUL_COEF).next_to(st, DOWN, buff=0.4)
        self.play(GrowFromCenter(e1))
        self.au_mot("3 euros de frais")
        c = self.colis(1.15).move_to(P(1.4, 1.3))
        e2 = self.etiquette("3 € d'envoi", COUL_CONST).next_to(c, DOWN, buff=0.4)
        e2.set_y(e1.get_y())
        self.play(FadeIn(c, shift=LEFT * 0.4))
        self.play(GrowFromCenter(e2))
        self.au_mot("Pour x stylos")
        nx = self.ligne([("x", COUL_LETTRE), ("stylos", WHITE)], 34, 0.15).next_to(st, UP, buff=0.22)
        self.play(FadeIn(nx, shift=DOWN * 0.2))
        self.insister(nx[0])
        self.au_mot("le prix est")
        prix = self.expr("prix = 2x + 3", 72).move_to(P(-0.8, -1.25))
        prix[3].set_color(WHITE)
        self.play(FadeIn(prix[0:5]))
        self.au_mot("2 x plus 3")
        self.play(Write(prix[5:]))
        self.play(Indicate(prix[5:7], color=COUL_COEF), Indicate(e1, color=COUL_COEF))
        self.play(Indicate(prix[8], color=COUL_CONST), Indicate(e2, color=COUL_CONST))
        self.au_mot("Une seule formule")
        self.play(Write(self.chute("Une seule formule pour tous les nombres de stylos.",
                                   color=BLEU_CALCUL, font_size=34)))
        self.attendre_voix()

    # ── 02 : les termes ─────────────────────────────────────────────────────

    def ecran_termes(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-termes")
        self.titre_ecran("Les termes")
        self.au_mot("Une expression est faite")
        e = self.expr("2x + 3", 120).move_to(P(-0.6, 1.1))
        self.play(Write(e))
        self.au_mot("séparés par des plus")
        self.play(Indicate(e[2], color=BLEU_CALCUL, scale_factor=1.8))
        self.au_mot("il y a deux termes")
        t1 = VGroup(e[0:2], self.cadre(e[0:2], COUL_COEF))
        t2 = VGroup(e[3], self.cadre(e[3], COUL_CONST))
        self.play(Create(t1[1]), Create(t2[1]))
        self.play(t1.animate.shift(LEFT * 1.1), t2.animate.shift(RIGHT * 1.1),
                  e[2].animate.set_opacity(0.45), run_time=1.0)
        deux = self.t("2 termes", 36, BLEU_CALCUL).move_to(P(-0.6, 2.45))
        self.play(FadeIn(deux, shift=DOWN * 0.2))
        self.au_mot("2 x, et 3")
        self.play(Indicate(t1, color=COUL_COEF))
        self.play(Indicate(t2, color=COUL_CONST))
        self.au_mot("2 x, c'est 2 fois x")
        d = self.expr("2x = 2 × x", 44).next_to(t1, DOWN, buff=0.6)
        d[3].set_color(COUL_COEF)
        self.play(FadeIn(d, shift=UP * 0.2))
        self.au_mot("son coefficient est 2")
        co = self.lab("coefficient : 2", 40, COUL_COEF).next_to(d, DOWN, buff=0.45)
        self.play(FadeIn(co))
        self.insister(co[-1])
        self.au_mot("Le 3 est le terme constant")
        k = self.lab("terme constant : 3", 40, COUL_CONST)
        k.next_to(t2, DOWN, buff=0.6)
        k.set_y(co.get_y())
        self.play(FadeIn(k))
        self.insister(k[-1])
        self.attendre_voix()

    # ── 03 : avec un moins ──────────────────────────────────────────────────

    def ecran_moins(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-moins")
        self.titre_ecran("Avec un moins")
        self.au_mot("le signe reste collé")
        self.play(Write(self.chute("Le signe − reste collé à son terme.", color=BLEU_CALCUL, font_size=36)))
        self.au_mot("Dans 7 a moins 2")
        e = self.expr("7a − 2", 120).move_to(P(-0.6, 1.1))
        self.play(Write(e))
        self.au_mot("les termes sont")
        t1 = VGroup(e[0:2], self.cadre(e[0:2], COUL_COEF))
        e[2].set_color(COUL_CONST)
        t2 = VGroup(e[2:4], self.cadre(e[2:4], COUL_CONST))
        self.play(Create(t1[1]), Create(t2[1]), e[2].animate.set_color(COUL_CONST))
        self.play(t1.animate.shift(LEFT * 1.1), t2.animate.shift(RIGHT * 1.1), run_time=1.0)
        self.insister(e[2], 1.8)
        self.au_mot("7 a et moins 2")
        n1 = self.expr("7a", 40).next_to(t1, DOWN, buff=0.35)
        n2 = self.t("−2", 40, COUL_CONST).next_to(t2, DOWN, buff=0.35)
        self.play(FadeIn(n1), FadeIn(n2))
        self.au_mot("Le coefficient de a est 7")
        co = self.lab("coefficient de a : 7", 40, COUL_COEF, lettre="a").move_to(P(-0.6, -1.0))
        self.play(FadeIn(co))
        self.insister(co[-1])
        self.au_mot("Le terme constant est moins 2")
        k = self.lab("terme constant : −2", 40, COUL_CONST).move_to(P(-0.6, -1.75))
        self.play(FadeIn(k))
        self.insister(k[-2:])
        self.attendre_voix()

    # ── 04 : coefficients cachés ────────────────────────────────────────────

    def ecran_caches(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-caches")
        self.titre_ecran("Des coefficients cachés")
        sep = DashedLine(P(-0.7, 2.4), P(-0.7, -1.9), color=GRAY, stroke_width=2)
        self.add(sep)
        # à gauche : x
        self.au_mot("x tout seul")
        x1 = self.t("x", 130, COUL_LETTRE).move_to(P(-3.9, 1.0))
        self.play(Write(x1))
        self.au_mot("c'est 1 fois x")
        un = self.t("1", 130, COUL_COEF).set_opacity(0.45)
        self.play(x1.animate.shift(RIGHT * 0.4))
        un.next_to(x1, LEFT, buff=0.08).align_to(x1, DOWN)
        self.play(FadeIn(un, scale=1.6))
        self.insister(un)
        eq1 = self.expr("x = 1 × x", 44).move_to(P(-3.9, -0.45))
        eq1[2].set_color(COUL_COEF)
        self.play(FadeIn(eq1, shift=UP * 0.2))
        self.au_mot("son coefficient est 1")
        c1 = self.lab("coefficient : 1", 38, COUL_COEF).move_to(P(-3.9, -1.3))
        self.play(FadeIn(c1))
        self.insister(c1[-1])
        # à droite : −x
        self.au_mot("Moins x")
        x2 = self.t("−x", 130).move_to(P(2.2, 1.0))
        x2[1].set_color(COUL_LETTRE)
        self.play(Write(x2))
        self.au_mot("c'est moins 1 fois x")
        un2 = self.t("1", 130, COUL_COEF).set_opacity(0.45)
        self.play(x2[1].animate.shift(RIGHT * 0.75), x2[0].animate.set_color(COUL_COEF))
        un2.next_to(x2[1], LEFT, buff=0.08).align_to(x2[1], DOWN)
        self.play(FadeIn(un2, scale=1.6))
        self.insister(VGroup(x2[0], un2))
        eq2 = self.expr("−x = −1 × x", 44).move_to(P(2.2, -0.45))
        eq2[3:5].set_color(COUL_COEF)
        self.play(FadeIn(eq2, shift=UP * 0.2))
        self.au_mot("son coefficient est moins 1")
        c2 = self.lab("coefficient : −1", 38, COUL_COEF).move_to(P(2.2, -1.3))
        self.play(FadeIn(c2))
        self.insister(c2[-2:])
        self.attendre_voix()

    # ── 05 : somme ou produit ───────────────────────────────────────────────

    def ecran_somme_produit(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-somme-produit")
        self.titre_ecran("Somme ou produit ?")
        xs = [-4.6, -0.9, 2.8]
        self.au_mot("3 plus x est une somme")
        e1 = self.t("3 + x", 80).move_to(P(xs[0], 1.6))
        e1[0].set_color(COUL_CONST)
        e1[2].set_color(COUL_LETTRE)
        self.play(Write(e1))
        s1 = VGroup(self.t("somme", 36, BLEU_CALCUL), self.t("on ajoute", 28)).arrange(DOWN, buff=0.15)
        s1.move_to(P(xs[0], 0.25))
        self.play(FadeIn(s1, shift=UP * 0.2))
        self.au_mot("3 x est un produit")
        e2 = self.expr("3x", 80).move_to(P(xs[1], 1.6))
        self.play(Write(e2))
        s2 = VGroup(self.t("produit", 36, VIOLET_ACCENT),
                    self.expr("3 × x", 28)).arrange(DOWN, buff=0.15)
        s2[1][0].set_color(COUL_COEF)
        s2.move_to(P(xs[1], 0.25))
        self.play(FadeIn(s2, shift=UP * 0.2))
        self.au_mot("Et x au carré")
        e3 = self.expr("x²", 80).move_to(P(xs[2], 1.6))
        self.play(Write(e3))
        self.au_mot("c'est x fois x")
        s3 = VGroup(s2[0].copy(), self.expr("x × x", 28)).arrange(DOWN, buff=0.15)
        s3.move_to(P(xs[2], 0.25))
        self.play(FadeIn(s3, shift=UP * 0.2))
        self.au_mot("Pour x égale 5")
        x5 = self.t("Pour x = 5 :", 38).move_to(P(xs[1], -0.95))
        x5[4:7].set_color(COUL_LETTRE)
        self.play(FadeIn(x5))
        self.insister(x5[4:7])
        vals = [("3 plus x vaut 8", "3 + 5 = 8"), ("3 x vaut 15", "3 × 5 = 15"),
                ("x au carré vaut 25", "5 × 5 = 25")]
        for x, (mot, txt) in zip(xs, vals):
            self.au_mot(mot)
            v = self.t(txt, 36, BLEU_CALCUL).move_to(P(x, -1.85))
            self.play(Write(v), run_time=0.8)
            self.insister(v[-2:] if txt.endswith(("15", "25")) else v[-1])
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("3 x fois 2")
        a = self.expr("3x × 2", 90).move_to(P(-2.6, 1.55))
        a[3].set_color(COUL_COEF)
        self.play(Write(a))
        self.au_mot("ne fait pas 5 x")
        faux = self.t("= 5x", 90, ROUGE_ERREUR).next_to(a, RIGHT, buff=0.4)
        faux[0].set_color(WHITE)
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux[1:])))
        self.au_mot("C'est 3 fois x fois 2")
        b = self.t("3x × 2 = 3 × x × 2 = 6x", 56).move_to(P(-0.6, -0.1))
        # glyphes : 3 x × 2 = 3 × x × 2 = 6 x  (0 … 12)
        for i in (0, 3, 5, 9, 11):
            b[i].set_color(COUL_COEF)
        for i in (1, 7, 12):
            b[i].set_color(COUL_LETTRE)
        self.play(Write(b[0:10]))
        self.au_mot("donc 6 x")
        self.play(Write(b[10:]))
        self.insister(b[11:])
        self.play(Circumscribe(b[11:], color=VERT_OK))
        self.au_mot("Dans un produit")
        self.play(Write(self.chute("Dans un produit, on multiplie les nombres : 3 × 2 = 6.",
                                   color=BLEU_CALCUL, font_size=34)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Dans 4 x plus 7")
        self.play(Write(self.expr("4x + 7", 90).move_to(P(-3.9, 1.5))))
        self.au_mot("quel est le coefficient")
        self.play(FadeIn(self.t("1. Le coefficient ?", 36, COUL_COEF).move_to(P(-3.9, 0.2))))
        self.au_mot("Quel est le terme constant")
        self.play(FadeIn(self.t("2. Le terme constant ?", 36, COUL_CONST).move_to(P(-3.9, -0.55))))
        self.au_mot("Et dans 5 moins y")
        self.play(Write(self.expr("5 − y", 90).move_to(P(2.9, 1.5))))
        self.au_mot("coefficient de y")
        q3 = self.lab("3. Le coefficient de y ?", 36, COUL_COEF, lettre="y")
        self.play(FadeIn(q3.move_to(P(2.9, 0.2))))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        e1 = self.expr("4x + 7", 90).move_to(P(-3.9, 1.5))
        e2 = self.expr("5 − y", 90).move_to(P(2.9, 1.5))
        self.add(e1, e2)
        self.au_mot("le coefficient est 4")
        self.play(Create(self.cadre(e1[0:2], COUL_COEF)))
        r1 = self.lab("1. Le coefficient : 4", 36, COUL_COEF).move_to(P(-3.9, 0.2))
        self.play(FadeIn(r1))
        self.insister(r1[-1])
        self.au_mot("le terme constant est 7")
        self.play(Create(self.cadre(e1[3], COUL_CONST)))
        r2 = self.lab("2. Le terme constant : 7", 36, COUL_CONST).move_to(P(-3.9, -0.55))
        self.play(FadeIn(r2))
        self.insister(r2[-1])
        self.au_mot("le terme en y est moins y")
        self.play(Create(self.cadre(e2[1:3], COUL_COEF)), e2[1].animate.set_color(COUL_COEF))
        ty = self.expr("−y = −1 × y", 40).move_to(P(2.9, 0.2))
        ty[3:5].set_color(COUL_COEF)
        self.play(FadeIn(ty))
        self.au_mot("son coefficient est moins 1")
        r3 = self.lab("3. Coefficient de y : −1", 36, COUL_COEF, lettre="y").move_to(P(2.9, -0.55))
        self.play(FadeIn(r3))
        self.insister(r3[-2:])
        self.attendre_voix()

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ('Une expression se découpe', 'Une expression se découpe en termes.'),
            ('et le signe reste collé', 'Le signe reste collé à son terme.'),
            ('Un coefficient peut', 'Un coefficient peut être caché, ou négatif.'),
            ('Et une somme', "Une somme n'est pas un produit."),
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
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute('Épisode 2 : traduire une phrase', color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_stylos()
        self.ecran_termes()
        self.ecran_moins()
        self.ecran_caches()
        self.ecran_somme_produit()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
