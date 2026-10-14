# expression_comprendre.py
# EleveAI — Maths 3e — Expression littérale, épisode 1 : comprendre à quoi sert
# une lettre (notionId : litteral_calcul, micro : litteral_comprendre), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau. Paysage ceinture VERTE, même structure que les épisodes de
# 5e et 4e (scripts/5e/expression_comprendre.py, scripts/4e/expression_reduire.py).
# Short jumeau (ceinture blanche) : expression_comprendre_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : trois nombres qui se suivent = trois colonnes.
# Avec des nombres : des billes (4, 5, 6) ; la colonne de 6 donne une bille à
# celle de 4 → trois colonnes de 5 = 3 × 5. Avec la lettre : trois barres « n »
# (JAUNES) coiffées de petits cubes « 1 » (ORANGE) ; le cube de la 3e passe sur
# la 1re → trois barres de n + 1 = 3 × (n + 1).
# Couleurs : COEFFICIENT VERT, TERME CONSTANT ORANGE, LETTRE JAUNE, faux ROUGE.
#
# Défi : deux impairs qui se suivent, 2n + 1 et 2n + 3 → 4n + 4 = 4 × (n + 1).
#
# Voix : manim/voix/3e-expression-comprendre.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/expression_comprendre.py ExpressionComprendre3e -o eleveai-maths-3e-expression-comprendre --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/01-comprendre/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_COEF = VERT_OK
COUL_CONST = ORANGE_RETENUE
COUL_LETTRE = JAUNE_TITRE
BILLE = "#60A5FA"
LETTRES = "nxa"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def colorier(texte, font_size=60):
    """Une expression coloriée : coefficient VERT (nombre collé à une lettre ou
    suivi de « × ( »), lettre JAUNE, terme constant ORANGE."""
    m = Text(texte, font_size=font_size, color=WHITE)
    s = texte.replace(" ", "")
    if len(s) != len(m):
        return m
    i = 0
    while i < len(s):
        c = s[i]
        if c in "0123456789":
            j = i
            while j < len(s) and s[j] in "0123456789":
                j += 1
            coef = j < len(s) and (s[j] in LETTRES or s[j:j + 2] == "×(")
            for k in range(i, j):
                m[k].set_color(COUL_COEF if coef else COUL_CONST)
            i = j
            continue
        if c in LETTRES:
            m[i].set_color(COUL_LETTRE)
        i += 1
    return m


class ExpressionComprendre3e(Notion3e):
    nom_voix = "3e-expression-comprendre"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def expr(self, texte, font_size=60):
        return colorier(texte, font_size)

    def valeur(self, texte, font_size=38):
        """« n = 4 » : la lettre JAUNE, la valeur en blanc."""
        m = self.t(texte, font_size)
        m[0].set_color(COUL_LETTRE)
        return m

    def ligne(self, morceaux, buff=0.26):
        return VGroup(*morceaux).arrange(RIGHT, buff=buff)

    def insister(self, mob, f=1.5):
        self.play(mob.animate.scale(f), run_time=0.5)
        self.play(mob.animate.scale(1 / f), run_time=0.5)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    # ── les dessins ─────────────────────────────────────────────────────────

    def colonne(self, nb, base, r=0.17, pas=0.4, color=BILLE):
        """Une colonne de `nb` billes posée sur le point `base`."""
        return VGroup(*[Circle(radius=r, fill_color=color, fill_opacity=1, stroke_color=WHITE,
                               stroke_width=1.5).move_to(base + UP * (r + k * pas))
                        for k in range(nb)])

    def sur_colonne(self, col, base, k, r=0.17, pas=0.4):
        return base + UP * (r + k * pas)

    def cube(self, cote=0.42):
        c = Square(side_length=cote, fill_color=COUL_CONST, fill_opacity=0.9, stroke_color=WHITE,
                   stroke_width=2)
        return VGroup(c, Text("1", font_size=22, color=BLACK).move_to(c))

    def barre(self, base, cubes=0, h=1.7, w=0.62, cote=0.42):
        """Une barre « n » (JAUNE) posée sur `base`, coiffée de `cubes` cubes « 1 »."""
        rect = Rectangle(width=w, height=h, fill_color=COUL_LETTRE, fill_opacity=0.28,
                         stroke_color=COUL_LETTRE, stroke_width=3).move_to(base + UP * h / 2)
        lbl = Text("n", font_size=36, color=COUL_LETTRE).move_to(rect)
        pile = VGroup()
        for k in range(cubes):
            pile.add(self.cube(cote).move_to(rect.get_top() + UP * (cote / 2 + k * cote)))
        return VGroup(VGroup(rect, lbl), pile)

    def place_cube(self, barre, cote=0.42):
        """La place du prochain cube sur une barre."""
        k = len(barre[1])
        return barre[0][0].get_top() + UP * (cote / 2 + k * cote)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Comprendre une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("À quoi sert")
        q = self.ligne([self.t("À quoi sert une", 46, BLEU_CALCUL), self.t("lettre", 46, COUL_LETTRE),
                        self.t("?", 46, BLEU_CALCUL)], buff=0.24).move_to(P(-0.6, 0.6))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.insister(q[1])
        self.au_mot("À prouver")
        r = self.t("À prouver qu'une règle marche pour tous les nombres.", 34).move_to(P(-0.6, -0.4))
        self.play(FadeIn(r, shift=UP * 0.2))
        self.attendre_voix(marge=1.5)

    # ── 01 : le constat ─────────────────────────────────────────────────────

    def ecran_constat(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-constat")
        self.titre_ecran("Trois nombres qui se suivent")
        bases = [P(-6.0, -1.0), P(-5.45, -1.0), P(-4.9, -1.0)]
        cols = VGroup(*[self.colonne(n, b) for n, b in zip((4, 5, 6), bases)])
        nums = VGroup(*[self.t(str(n), 32).next_to(b, DOWN, buff=0.25) for n, b in zip((4, 5, 6), bases)])
        ys = [1.7, 0.5, -0.7]
        sommes = [("4 + 5 + 6", "= 15"), ("10 + 11 + 12", "= 33"), ("20 + 21 + 22", "= 63")]
        exprs, res = VGroup(), VGroup()
        for (e, r), y in zip(sommes, ys):
            me = self.t(e, 46)
            me.move_to(P(0, y)).align_to(P(1.0, y), RIGHT)
            mr = self.t(r, 46, BLEU_CALCUL)
            mr.move_to(P(0, y)).align_to(P(1.25, y), LEFT)
            exprs.add(me)
            res.add(mr)

        self.au_mot("4, 5, 6")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in cols], lag_ratio=0.3),
                  FadeIn(nums), Write(exprs[0]), run_time=1.4)
        self.au_mot(": 15")
        self.play(FadeIn(res[0], shift=LEFT * 0.2))
        self.au_mot("Puis 10")
        self.play(Write(exprs[1]))
        self.au_mot(": 33")
        self.play(FadeIn(res[1], shift=LEFT * 0.2))
        self.au_mot("Puis 20")
        self.play(Write(exprs[2]))
        self.au_mot(": 63")
        self.play(FadeIn(res[2], shift=LEFT * 0.2))
        self.au_mot("15, 33, 63")
        for r in res:
            self.play(r[1:].animate.scale(1.5), run_time=0.3)
            self.play(r[1:].animate.scale(1 / 1.5), run_time=0.3)
        self.au_mot("toujours un multiple de 3")
        marques = VGroup()
        for r in res:
            c = self.coche().next_to(r, RIGHT, buff=0.45)
            m = self.t("multiple de 3", 30, VERT_OK).next_to(c, RIGHT, buff=0.2)
            marques.add(VGroup(c, m))
        self.play(LaggedStart(*[AnimationGroup(Create(m[0]), FadeIn(m[1], shift=RIGHT * 0.2))
                                for m in marques], lag_ratio=0.35), run_time=1.5)
        self.au_mot("Coïncidence")
        self.play(Write(self.chute("Coïncidence ?", color=BLEU_CALCUL, font_size=42)))
        self.attendre_voix()

    # ── 02 : les exemples ne prouvent rien ──────────────────────────────────

    def ecran_exemples(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-exemples")
        self.titre_ecran("Des exemples ne prouvent rien")
        cartes = VGroup()
        for k in range(32):
            fond = RoundedRectangle(width=0.62, height=0.62, corner_radius=0.08, stroke_color=VERT_OK,
                                    stroke_width=2, fill_color=VERT_OK, fill_opacity=0.12)
            cartes.add(VGroup(fond, self.coche(taille=0.16).move_to(fond)))
        cartes.arrange_in_grid(4, 8, buff=0.14).move_to(P(-3.6, 0.6))
        etc = self.t("…", 60, VERT_OK).next_to(cartes, RIGHT, buff=0.2).align_to(cartes, DOWN)
        self.au_mot("tester mille")
        compteur = self.t("1 000 exemples", 40, VERT_OK).move_to(P(3.0, 1.8))
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cartes], lag_ratio=0.08),
                  FadeIn(compteur), run_time=2.2)
        self.play(FadeIn(etc))
        self.au_mot("le mille et unième")
        fond = RoundedRectangle(width=1.3, height=1.3, corner_radius=0.12, stroke_color=COUL_CONST,
                                stroke_width=4, fill_color=COUL_CONST, fill_opacity=0.15).move_to(P(3.0, 0.1))
        q = VGroup(fond, self.t("?", 72, COUL_CONST).move_to(fond))
        lbl = self.t("le 1 001e ?", 36, COUL_CONST).next_to(fond, DOWN, buff=0.3)
        self.play(GrowFromCenter(q), FadeIn(lbl))
        self.insister(q)
        self.au_mot("Il faut un calcul")
        self.play(Write(self.chute("Il faut un calcul pour TOUS les nombres à la fois.",
                                   color=VERT_OK, font_size=36)))
        self.attendre_voix()

    # ── 03 : la lettre ──────────────────────────────────────────────────────

    def ecran_lettre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lettre")
        self.titre_ecran("Une lettre pour le premier nombre")
        bases = [P(-6.3, -1.4), P(-4.8, -1.4), P(-3.3, -1.4)]
        noms = ["n", "n + 1", "n + 2"]
        barres = [self.barre(b, k) for k, b in enumerate(bases)]
        lbls = [self.expr(nm, 30).next_to(b, DOWN, buff=0.25) for nm, b in zip(noms, bases)]
        lbls[1].shift(RIGHT * 0.0)
        mots = ["J'appelle n", "Le suivant", "Le troisième"]
        for mot, b, l in zip(mots, barres, lbls):
            self.au_mot(mot)
            self.play(FadeIn(b[0], shift=UP * 0.2), FadeIn(l))
            if len(b[1]):
                self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in b[1]], lag_ratio=0.3),
                          run_time=0.7)
        self.au_mot("Une lettre, c'est")
        d = self.ligne([self.t("Une lettre", 38, COUL_LETTRE), self.t("= un nombre quelconque", 38, BLEU_CALCUL)],
                       buff=0.2).move_to(P(1.6, 1.7))
        self.play(FadeIn(d, shift=UP * 0.2))
        self.au_mot("n peut valoir 4")
        l1 = self.ligne([self.valeur("n = 4"), self.t("→   4, 5, 6", 38)], buff=0.3)
        l1.move_to(P(0.5, 0.5)).align_to(P(-1.8, 0), LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2))
        self.au_mot("10, ou")
        l2 = self.ligne([self.valeur("n = 10"), self.t("→   10, 11, 12", 38)], buff=0.3)
        l2.move_to(P(0.5, -0.4)).align_to(P(-1.8, 0), LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2))
        self.au_mot("n'importe quel entier")
        l3 = self.ligne([self.valeur("n ="), self.t("n'importe quel entier", 38, BLEU_CALCUL)], buff=0.3)
        l3.move_to(P(0.5, -1.3)).align_to(P(-1.8, 0), LEFT)
        self.play(FadeIn(l3, shift=RIGHT * 0.2))
        self.play(*[Indicate(b[0], color=COUL_LETTRE) for b in barres])
        self.attendre_voix()

    # ── 04 : le calcul ──────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-calcul")
        self.titre_ecran("Le calcul pour tous les nombres")
        bases = [P(-6.2, -1.6), P(-5.0, -1.6), P(-3.8, -1.6)]
        barres = [self.barre(b, k) for k, b in enumerate(bases)]
        self.add(*barres)
        x0 = -2.2
        self.au_mot("La somme")
        l1 = self.expr("n + (n + 1) + (n + 2)", 50).move_to(P(0, 2.1)).align_to(P(x0, 0), LEFT)
        self.play(Write(l1[0]), Indicate(barres[0][0], color=COUL_LETTRE))
        self.au_mot("plus n plus 1")
        self.play(Write(l1[1:7]), Indicate(barres[1], color=COUL_LETTRE))
        self.au_mot("plus n plus 2")
        self.play(Write(l1[7:]), Indicate(barres[2], color=COUL_LETTRE))
        self.au_mot("Je réduis")
        l2 = self.ligne([self.t("=", 50), self.expr("3n + 3", 50)], buff=0.25)
        l2.move_to(P(0, 0.9)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(l2[0]))
        self.au_mot(": 3 n plus 3")
        self.play(Write(l2[1][0:2]), *[Indicate(b[0], color=COUL_LETTRE) for b in barres])
        self.play(Write(l2[1][2:]), *[Indicate(b[1], color=COUL_CONST) for b in barres[1:]])
        self.au_mot("Je factorise")
        c = barres[2][1][-1]
        cible = self.place_cube(barres[0])
        self.play(c.animate.move_to(cible), run_time=1.2)
        barres[2][1].remove(c)
        barres[0][1].add(c)
        self.au_mot("3 fois, parenthèse")
        l3 = self.ligne([self.t("=", 50), self.expr("3 × (n + 1)", 50)], buff=0.25)
        l3.move_to(P(0, -0.3)).align_to(P(x0, 0), LEFT)
        accolades = VGroup(*[self.expr("n + 1", 26).next_to(b[0], DOWN, buff=0.25) for b in barres])
        self.play(Write(l3), FadeIn(accolades))
        self.insister(l3[1])
        self.au_mot("C'est 3 fois un entier")
        m = self.ligne([self.t("3 × un entier", 40, COUL_COEF), self.t("= un multiple de 3", 40, VERT_OK)],
                       buff=0.2).move_to(P(0, -1.5)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(m, shift=UP * 0.2))
        self.au_mot("Pour tous les n")
        self.play(Write(self.chute("Pour tous les n.", color=COUL_LETTRE, font_size=42)))
        self.attendre_voix()

    # ── 05 : lire l'expression ──────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-lire")
        self.titre_ecran("Lire l'expression")
        e = self.expr("3 × (n + 1)", 80).move_to(P(-0.6, 2.0))
        self.play(Write(e))
        self.au_mot("3 fois, parenthèse")
        self.insister(e)
        self.au_mot("le nombre du milieu")
        trois = VGroup(self.expr("n", 40), self.expr("n + 1", 40), self.expr("n + 2", 40)).arrange(RIGHT, buff=1.0)
        trois.move_to(P(-0.6, 0.8))
        cadre = SurroundingRectangle(trois[1], color=BLEU_CALCUL, buff=0.12)
        self.play(FadeIn(trois))
        self.play(Create(cadre), Indicate(e[2:7], color=BLEU_CALCUL))
        self.au_mot("multiplié par 3")
        txt = self.ligne([self.t("le milieu", 36, BLEU_CALCUL), self.t("× 3", 36, COUL_COEF)], buff=0.2)
        txt.next_to(e, RIGHT, buff=0.5)
        self.play(FadeIn(txt, shift=LEFT * 0.2))
        # les billes
        bases = [P(-5.9, -2.6), P(-5.3, -2.6), P(-4.7, -2.6)]
        cols = [self.colonne(n, b, r=0.15, pas=0.34) for n, b in zip((4, 5, 6), bases)]
        self.au_mot("pour 4, 5, 6")
        nums = VGroup(*[self.t(str(n), 30).move_to(b + UP * 2.35) for n, b in zip((4, 5, 6), bases)])
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in cols], lag_ratio=0.3), FadeIn(nums),
                  run_time=1.2)
        self.au_mot("le milieu est 5")
        self.play(Indicate(VGroup(cols[1], nums[1]), color=BLEU_CALCUL))
        b = cols[2][-1]
        self.play(b.animate.move_to(self.sur_colonne(cols[0], bases[0], 4, r=0.15, pas=0.34)),
                  run_time=1.2)
        cols[2].remove(b)
        cols[0].add(b)
        nouv = VGroup(*[self.t("5", 30, BLEU_CALCUL).move_to(n) for n in nums])
        self.play(ReplacementTransform(nums, nouv))
        self.au_mot("et 3 fois 5")
        calc = self.t("4 + 5 + 6 = 3 × 5 = 15", 46).move_to(P(0.2, -1.6))
        calc[6:9].set_color(COUL_COEF)
        calc[-2:].set_color(VERT_OK)
        self.play(Write(calc[:6]))
        self.play(Write(calc[6:10]))
        self.au_mot(", 15")
        self.play(Write(calc[10:]))
        self.insister(calc[-2:])
        self.attendre_voix(marge=2.0)

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("5 x ne veut pas dire")
        haut = self.ligne([self.expr("5x", 64), self.t("≠", 64, ROUGE_ERREUR), self.expr("5 + x", 64)], buff=0.4)
        haut.move_to(P(-0.6, 2.2))
        self.play(Write(haut[0]))
        self.au_mot("5 plus x")
        self.play(FadeIn(haut[1], scale=1.5), Write(haut[2]))
        self.insister(haut[1])
        xg, xd = -3.7, 2.7
        sep = DashedLine(P(-0.6, 1.4), P(-0.6, -3.0), color=GREY_B, dash_length=0.15)
        self.au_mot("c'est 5 fois x")
        g1 = self.ligne([self.expr("5x", 48), self.t("=", 48), self.expr("5 × x", 48)], buff=0.2).move_to(P(xg, 0.9))
        g1[2][0].set_color(COUL_COEF)
        self.play(Create(sep), Write(g1))
        self.au_mot("Pour x égale 2")
        vx = self.valeur("x = 2", 40).move_to(P(-0.6, -3.35))
        fond = SurroundingRectangle(vx, color=COUL_LETTRE, buff=0.15)
        self.play(FadeIn(vx), Create(fond))
        # dessins : un sac « x » = 2 billes
        def sac(pos):
            r = RoundedRectangle(width=0.62, height=0.42, corner_radius=0.1, stroke_color=COUL_LETTRE,
                                 stroke_width=2.5).move_to(pos)
            bs = VGroup(*[Circle(radius=0.11, fill_color=BILLE, fill_opacity=1, stroke_width=0)
                          .move_to(pos + RIGHT * dx) for dx in (-0.14, 0.14)])
            return VGroup(r, bs)
        sacs = VGroup(*[sac(P(xg - 1.6 + 0.8 * k, -0.4)) for k in range(5)])
        self.au_mot("5 x vaut 10")
        r1 = self.ligne([self.t("5 × 2 =", 48), self.t("10", 48, VERT_OK)], buff=0.2).move_to(P(xg, -1.5))
        r1[0][0].set_color(COUL_COEF)
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.2) for s in sacs], lag_ratio=0.2), Write(r1), run_time=1.4)
        self.insister(r1[1])
        self.au_mot("5 plus x vaut 7")
        d1 = self.ligne([self.expr("5 + x", 48), self.t("=", 48), self.t("5 + 2 =", 48), self.t("7", 48, ROUGE_ERREUR)],
                        buff=0.2).move_to(P(xd, -1.5))
        d1[2][0].set_color(COUL_CONST)
        billes5 = VGroup(*[Circle(radius=0.13, fill_color=BILLE, fill_opacity=1, stroke_width=0)
                           for _ in range(5)]).arrange(RIGHT, buff=0.12)
        grp = VGroup(billes5, self.t("+", 40), sac(ORIGIN)).arrange(RIGHT, buff=0.25).move_to(P(xd, -0.4))
        g2 = self.ligne([self.expr("5 + x", 48)], buff=0.2).move_to(P(xd, 0.9))
        self.play(FadeIn(g2), FadeIn(grp, shift=DOWN * 0.2), Write(d1), run_time=1.4)
        self.insister(d1[3])
        self.attendre_voix(marge=2.5)

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Prouve que")
        l1 = self.t("Prouve : deux nombres impairs qui se suivent,", 36, BLEU_CALCUL).move_to(P(-0.6, 2.3))
        self.play(FadeIn(l1))
        self.au_mot("multiple de 4")
        l2 = self.ligne([self.t("leur somme est toujours un", 36, BLEU_CALCUL),
                         self.t("multiple de 4", 36, VERT_OK)], buff=0.2).move_to(P(-0.6, 1.65))
        self.play(FadeIn(l2))
        self.au_mot("Indice")
        ind = self.t("Indice :", 36, COUL_CONST).move_to(P(-5.0, 0.6))
        self.play(FadeIn(ind))
        self.au_mot("2 n plus 1 et")
        e1 = self.expr("2n + 1", 52).move_to(P(-2.6, 0.6))
        b1 = VGroup(self.barre(P(-3.25, -2.2), 0, h=1.5), self.barre(P(-2.55, -2.2), 0, h=1.5),
                    VGroup(*[self.cube().move_to(P(-1.95, -2.2 + 0.21 + 0.42 * k)) for k in range(1)]))
        self.play(Write(e1), FadeIn(b1, shift=UP * 0.2))
        self.au_mot("2 n plus 3")
        et = self.t("et", 36).move_to(P(-0.8, 0.6))
        e2 = self.expr("2n + 3", 52).move_to(P(1.0, 0.6))
        b2 = VGroup(self.barre(P(0.35, -2.2), 0, h=1.5), self.barre(P(1.05, -2.2), 0, h=1.5),
                    VGroup(*[self.cube().move_to(P(1.65, -2.2 + 0.21 + 0.42 * k)) for k in range(3)]))
        self.play(FadeIn(et), Write(e2), FadeIn(b2, shift=UP * 0.2))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        x0 = -1.4
        bx = [-6.3, -5.25, -4.2, -3.15]
        barres = [self.barre(P(x, -1.9), 0, h=1.5) for x in bx]
        cubes = VGroup(*[self.cube().move_to(P(-2.25, -1.9 + 0.21 + 0.42 * k)) for k in range(4)])
        self.au_mot("2 n plus 1, plus")
        l1 = self.expr("(2n + 1) + (2n + 3)", 50).move_to(P(0, 2.1)).align_to(P(x0, 0), LEFT)
        self.play(Write(l1), FadeIn(VGroup(*barres)), FadeIn(cubes), run_time=1.5)
        self.au_mot(": 4 n plus 4")
        l2 = self.ligne([self.t("=", 50), self.expr("4n + 4", 50)], buff=0.25)
        l2.move_to(P(0, 0.9)).align_to(P(x0, 0), LEFT)
        self.play(Write(l2), *[Indicate(b[0], color=COUL_LETTRE) for b in barres], Indicate(cubes, color=COUL_CONST))
        self.au_mot("Je factorise")
        self.play(*[c.animate.move_to(self.place_cube(b)) for c, b in zip(cubes, barres)], run_time=1.3)
        self.au_mot("4 fois, parenthèse")
        l3 = self.ligne([self.t("=", 50), self.expr("4 × (n + 1)", 50)], buff=0.25)
        l3.move_to(P(0, -0.3)).align_to(P(x0, 0), LEFT)
        etiq = VGroup(*[self.expr("n + 1", 22).next_to(b[0], DOWN, buff=0.2) for b in barres])
        self.play(Write(l3), FadeIn(etiq))
        cadre = SurroundingRectangle(l3[1], color=VERT_OK, buff=0.15)
        self.play(Create(cadre))
        self.insister(VGroup(l3[1], cadre), 1.3)
        self.au_mot("Un multiple de 4")
        self.play(Write(self.chute("Un multiple de 4, pour tous les n.", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.5)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Une lettre nomme", "Une lettre nomme un nombre quelconque."),
            ("On écrit le calcul", "On écrit le calcul, on le réduit."),
            ("Et on lit", "On lit l'expression pour prouver une règle."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 32)).arrange(RIGHT, buff=0.3)
                          for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : calculer la valeur d'une expression", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_constat()
        self.ecran_exemples()
        self.ecran_lettre()
        self.ecran_calcul()
        self.ecran_lire()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
