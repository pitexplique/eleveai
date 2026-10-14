# expression_reduire.py
# EleveAI — Maths 4e — Expression littérale, épisode 4 : réduire une expression
# (notionId : litteral_expression, micro : litteral_expression_reduire), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau. Paysage ceinture ORANGE, même structure que l'épisode 1
# de 5e (scripts/5e/expression_comprendre.py). Short jumeau (ceinture blanche) :
# expression_reduire_short.py (le rectangle 3x sur 2x découpé en 6 carrés).
#
# ⭐ LE DESSIN QUI PORTE TOUT : des BOÎTES DE TRI, une par famille (« x² »,
# « x », « nombres »). Chaque terme est une carte, son signe collé devant ; la
# carte vole dans sa boîte, puis la boîte se réduit en UNE seule carte.
# Couleurs : COEFFICIENT VERT, TERME CONSTANT ORANGE, LETTRE JAUNE, faux ROUGE.
#
# Défi : 7y − 3 + 2y − y + 8 → 8y + 5.
#
# Voix : manim/voix/4e-expression-reduire.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/expression_reduire.py ExpressionReduire4e -o eleveai-maths-4e-expression-reduire --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/expression-litterale/04-reduire/.

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
# Le bord des boîtes et des cartes, une couleur par famille.
FAM_CARRE = "#C084FC"
FAM_X = JAUNE_TITRE
FAM_NB = ORANGE_RETENUE
FOND_CARTE = "#1E293B"
SAC = "#8B5E3C"
BILLE = "#60A5FA"
LETTRES = "xya²"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def colorier(texte, font_size=60):
    """Une expression coloriée : coefficient VERT (avec son signe collé),
    lettre JAUNE, terme constant ORANGE (avec son signe collé)."""
    m = Text(texte, font_size=font_size, color=WHITE)
    s = texte.replace(" ", "")
    if len(s) != len(m):
        return m
    # repère, pour chaque caractère non blanc, s'il suit immédiatement un « − »
    i = 0
    while i < len(s):
        c = s[i]
        if c in "0123456789":
            j = i
            while j < len(s) and s[j] in "0123456789":
                j += 1
            coul = COUL_COEF if j < len(s) and s[j] in "xya" else COUL_CONST
            for k in range(i, j):
                m[k].set_color(coul)
            i = j
            continue
        if c in LETTRES:
            m[i].set_color(COUL_LETTRE)
        i += 1
    # un signe moins COLLÉ à son nombre (« −4x », « −2 ») prend sa couleur
    pos = 0
    for k, c in enumerate(texte):
        if c == " ":
            continue
        if c == "−" and k + 1 < len(texte) and texte[k + 1] in "0123456789":
            m[pos].set_color(m[pos + 1].get_color())
        pos += 1
    return m


class ExpressionReduire4e(Notion4e):
    nom_voix = "4e-expression-reduire"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def expr(self, texte, font_size=60):
        return colorier(texte, font_size)

    def ligne(self, morceaux, buff=0.28):
        return VGroup(*morceaux).arrange(RIGHT, buff=buff)

    def insister(self, mob, f=1.5):
        self.play(mob.animate.scale(f), run_time=0.5)
        self.play(mob.animate.scale(1 / f), run_time=0.5)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    # ── les dessins : cartes et boîtes ──────────────────────────────────────

    def carte(self, texte, fam, font_size=44):
        """Un terme sur une carte ; le bord dit sa famille, le signe est collé."""
        e = self.expr(texte, font_size)
        fond = RoundedRectangle(width=max(e.width + 0.4, 1.0), height=e.height + 0.36, corner_radius=0.12,
                                fill_color=FOND_CARTE, fill_opacity=1, stroke_color=fam, stroke_width=3)
        return VGroup(fond, e.move_to(fond))

    def icone(self, fam):
        if fam == FAM_CARRE:
            g = VGroup(*[Circle(radius=0.07, fill_color=BILLE, fill_opacity=1, stroke_width=0)
                         for _ in range(9)]).arrange_in_grid(3, 3, buff=0.05)
            return VGroup(SurroundingRectangle(g, color=FAM_CARRE, buff=0.05, stroke_width=2), g)
        if fam == FAM_X:
            corps = RoundedRectangle(width=0.36, height=0.42, corner_radius=0.08, fill_color=SAC,
                                     fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
            return VGroup(corps, Text("x", font_size=18, color=COUL_LETTRE).move_to(corps))
        return VGroup(*[Circle(radius=0.08, fill_color=BILLE, fill_opacity=1, stroke_width=0)
                        for _ in range(2)]).arrange(RIGHT, buff=0.06)

    def boite(self, nom, fam, centre, largeur=3.0, hauteur=2.0, avec_icone=True):
        cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2,
                                 stroke_color=fam, stroke_width=4, fill_color=fam, fill_opacity=0.08)
        cadre.move_to(centre)
        lbl = self.t(nom, 32, fam)
        tete = VGroup(lbl, self.icone(fam)).arrange(RIGHT, buff=0.18) if avec_icone else VGroup(lbl)
        tete.next_to(cadre.get_top(), DOWN, buff=0.15)
        return VGroup(cadre, tete)

    def ranger(self, cartes, boite, buff=0.15):
        """Les places des cartes dans le bas de la boîte (sans les bouger)."""
        cible = VGroup(*[c.copy() for c in cartes]).arrange(RIGHT, buff=buff)
        zone = boite[0]
        if cible.width > zone.width - 0.3:
            cible.scale_to_fit_width(zone.width - 0.3)
        cible.move_to(zone.get_center() + DOWN * 0.3)
        return cible

    def voler(self, cartes, boite, run_time=1.2):
        cible = self.ranger(cartes, boite)
        self.play(*[c.animate.move_to(p).scale(p.width / c.width) for c, p in zip(cartes, cible)],
                  run_time=run_time)

    def tirer(self, morceaux, cartes, boite, run_time=1.3):
        """Chaque terme de l'expression s'envole, en carte, dans sa boîte ;
        il reste pâle dans l'expression."""
        cible = self.ranger(cartes, boite)
        for c, p in zip(cartes, cible):
            c.scale(p.width / c.width).move_to(p)
        self.play(*[TransformFromCopy(m, c) for m, c in zip(morceaux, cartes)],
                  *[m.animate.set_opacity(0.35) for m in morceaux], run_time=run_time)

    def fusionner(self, cartes, texte, fam, boite):
        """Toutes les cartes d'une boîte deviennent une seule carte."""
        une = self.carte(texte, fam).move_to(boite[0].get_center() + DOWN * 0.3)
        self.play(ReplacementTransform(VGroup(*cartes), une), run_time=0.9)
        return une

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Réduire une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("2 x plus 5")
        q = self.ligne([self.expr("2x + 5 + 3x − 7", 64), self.t("= ?", 64, BLEU_CALCUL)], buff=0.35)
        q.move_to(P(-0.6, 0.4))
        self.play(FadeIn(q[0], shift=UP * 0.2))
        self.au_mot("ça se simplifie")
        self.play(FadeIn(q[1]))
        self.insister(q[1][1])
        self.attendre_voix(marge=1.5)

    # ── 01 : les familles ───────────────────────────────────────────────────

    def ecran_familles(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-familles")
        self.titre_ecran("Des familles de termes")
        defi = self.ligne([self.t("Termes semblables", 36, BLEU_CALCUL), self.t("=", 36),
                           self.t("même partie littérale", 36, COUL_LETTRE)], buff=0.25).move_to(P(-0.6, 2.45))
        self.play(FadeIn(defi, shift=DOWN * 0.2))
        b2 = self.boite("x²", FAM_CARRE, P(-4.6, -0.7), largeur=3.5, hauteur=2.5)
        b1 = self.boite("x", FAM_X, P(-0.8, -0.7), largeur=3.7, hauteur=2.5)
        b0 = self.boite("nombres", FAM_NB, P(3.0, -0.7), largeur=3.5, hauteur=2.5)
        self.au_mot("ils sont de la même famille")
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in (b2, b1, b0)], lag_ratio=0.25))
        self.au_mot("3 x et moins 5 x")
        cx = VGroup(self.carte("3x", FAM_X, 52), self.carte("− 5x", FAM_X, 52)).arrange(RIGHT, buff=0.5).move_to(P(-0.8, 1.35))
        self.play(FadeIn(cx[0], shift=DOWN * 0.2))
        self.play(FadeIn(cx[1], shift=DOWN * 0.2))
        self.au_mot("la famille des x")
        self.voler(cx, b1)
        self.au_mot("2 et 7")
        cn = VGroup(self.carte("2", FAM_NB, 52), self.carte("7", FAM_NB, 52)).arrange(RIGHT, buff=0.5).move_to(P(3.0, 1.35))
        self.play(FadeIn(cn, shift=DOWN * 0.2))
        self.au_mot("les nombres")
        self.voler(cn, b0)
        self.au_mot("Mais x et x au carré")
        c1 = self.carte("x", FAM_X, 52).move_to(P(-3.6, 1.35))
        c2 = self.carte("x²", FAM_CARRE, 52).move_to(P(-2.2, 1.35))
        self.play(FadeIn(c1, shift=DOWN * 0.2), FadeIn(c2, shift=DOWN * 0.2))
        self.au_mot("deux familles différentes")
        cible1 = self.ranger([*cx, c1], b1)
        self.play(*[c.animate.move_to(p).scale(p.width / c.width) for c, p in zip([*cx, c1], cible1)],
                  c2.animate.move_to(b2[0].get_center() + DOWN * 0.3), run_time=1.2)
        self.play(Write(self.chute("x et x² : deux familles différentes.", color=ROUGE_ERREUR, font_size=36)))
        self.attendre_voix()

    # ── 02 : regrouper ──────────────────────────────────────────────────────

    def ecran_regrouper(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regrouper")
        self.titre_ecran("On réduit famille par famille")
        e = self.expr("2x + 5 + 3x − 7", 64).move_to(P(-0.6, 2.4))
        self.play(Write(e))
        bx = self.boite("x", FAM_X, P(-3.4, 0.2), largeur=3.6)
        bn = self.boite("nombres", FAM_NB, P(1.4, 0.2), largeur=3.6)
        self.play(FadeIn(bx), FadeIn(bn))
        cx = [self.carte("2x", FAM_X), self.carte("+ 3x", FAM_X)]
        cn = [self.carte("+ 5", FAM_NB), self.carte("− 7", FAM_NB)]
        self.au_mot("2 x plus 3 x")
        self.tirer([e[0:2], e[4:7]], cx, bx)
        lx = self.expr("2x + 3x = 5x", 40).next_to(bx, DOWN, buff=0.25)
        self.play(Write(lx))
        self.au_mot(": 5 x.")
        ux = self.fusionner(cx, "5x", FAM_X, bx)
        self.insister(ux)
        self.au_mot("5 moins 7")
        self.tirer([e[2:4], e[7:9]], cn, bn)
        ln = self.expr("5 − 7 = −2", 40).next_to(bn, DOWN, buff=0.25)
        self.play(Write(ln))
        self.au_mot(": moins 2.")
        un = self.fusionner(cn, "−2", FAM_NB, bn)
        self.insister(un)
        self.au_mot("Le résultat")
        res = self.ligne([self.expr("2x + 5 + 3x − 7", 52), self.t("=", 52), self.expr("5x − 2", 52)], buff=0.35)
        res.move_to(P(-0.8, -2.6))
        self.play(Write(res))
        boite = SurroundingRectangle(res[2], color=VERT_OK, buff=0.15)
        self.play(Create(boite))
        self.insister(VGroup(res[2], boite), 1.3)
        self.attendre_voix(marge=1.5)

    # ── 03 : coefficients négatifs ──────────────────────────────────────────

    def ecran_negatifs(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-negatifs")
        self.titre_ecran("Des coefficients négatifs")
        self.au_mot("4 a moins a")
        l1 = self.ligne([self.expr("4a − a", 56), self.t("=", 56), self.expr("4a − 1a", 56),
                         self.t("=", 56), self.expr("3a", 56)], buff=0.3).move_to(P(-0.8, 2.2))
        self.play(Write(l1[0]))
        self.au_mot("4 a moins 1 a")
        self.play(Write(l1[1:3]))
        self.insister(l1[2][3], 1.8)
        self.au_mot(": 3 a.")
        self.play(Write(l1[3:]))
        self.au_mot("Et 2 x moins 6 x")
        l2 = self.ligne([self.expr("2x − 6x", 56), self.t("=", 56), self.expr("−4x", 56)], buff=0.3)
        l2.move_to(P(-0.8, 1.0))
        self.play(Write(l2[0]))
        # la droite graduée, de −5 à 3
        x0, y0, u = -4.8, -2.0, 1.0
        axe = NumberLine(x_range=[-5, 3, 1], length=8 * u, include_numbers=False,
                         color=WHITE, stroke_width=3).move_to(P(x0 + 4 * u, y0))
        nums = VGroup(*[self.t(str(v).replace("-", "−"), 26).next_to(axe.n2p(v), DOWN, buff=0.18)
                        for v in range(-5, 4)])
        self.au_mot("2 moins 6")
        calc = self.expr("2 − 6", 48)
        for k in range(len(calc)):
            calc[k].set_color(COUL_COEF)
        calc.move_to(P(-2.2, 0.0))
        self.play(Create(axe), FadeIn(nums), Write(calc))
        d = Dot(axe.n2p(2), radius=0.12, color=COUL_COEF)
        self.play(GrowFromCenter(d))
        fl = CurvedArrow(axe.n2p(2) + UP * 0.2, axe.n2p(-4) + UP * 0.2, angle=0.5, color=ROUGE_ERREUR)
        lfl = self.t("− 6", 32, ROUGE_ERREUR).next_to(fl, UP, buff=0.05)
        self.play(Create(fl), FadeIn(lfl), d.animate.move_to(axe.n2p(-4)), run_time=1.4)
        self.au_mot(", moins 4.")
        r = self.t("= −4", 48, COUL_COEF).next_to(calc, RIGHT, buff=0.25)
        self.play(Write(r), Indicate(d, color=COUL_COEF, scale_factor=1.8))
        self.au_mot("On obtient")
        self.play(Write(l2[1:]))
        self.insister(l2[2])
        self.attendre_voix()

    # ── 04 : avec des carrés ────────────────────────────────────────────────

    def ecran_carres(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-carres")
        self.titre_ecran("Avec des carrés")
        b2 = self.boite("x²", FAM_CARRE, P(-3.4, -0.3), largeur=3.6)
        b1 = self.boite("x", FAM_X, P(1.4, -0.3), largeur=3.6)
        self.au_mot("3 x au carré, plus")
        e = self.expr("3x² + 2x + x²", 64).move_to(P(-0.8, 2.3))
        c1 = self.carte("3x²", FAM_CARRE)
        c2 = self.carte("+ 2x", FAM_X)
        c3 = self.carte("+ x²", FAM_CARRE)
        self.play(Write(e[0:3]), FadeIn(b2), FadeIn(b1))
        self.au_mot("plus 2 x,")
        self.play(Write(e[3:6]))
        self.au_mot("plus x au carré.")
        self.play(Write(e[6:9]))
        self.au_mot("Les x au carré ensemble")
        self.tirer([e[0:3], e[6:9]], [c1, c3], b2)
        self.au_mot(": 3 plus 1")
        l2 = self.t("3 + 1 = 4x²", 40, COUL_COEF)
        l2[-2:].set_color(COUL_LETTRE)
        l2.next_to(b2, DOWN, buff=0.25)
        self.play(Write(l2[:-2]))
        self.au_mot(", 4 x au carré.")
        self.play(FadeIn(l2[-2:]))
        u2 = self.fusionner([c1, c3], "4x²", FAM_CARRE, b2)
        self.insister(u2)
        self.au_mot("Le 2 x reste seul")
        self.tirer([e[3:6]], [c2], b1)
        self.play(Indicate(c2, color=FAM_X, scale_factor=1.3))
        self.au_mot("Le résultat")
        res = self.ligne([self.expr("3x² + 2x + x²", 52), self.t("=", 52), self.expr("4x² + 2x", 52)], buff=0.35)
        res.move_to(P(-0.8, -2.8))
        self.play(Write(res))
        boite = SurroundingRectangle(res[2], color=VERT_OK, buff=0.15)
        self.play(Create(boite))
        self.insister(VGroup(res[2], boite), 1.3)
        self.attendre_voix(marge=1.2)

    # ── 05 : le périmètre ───────────────────────────────────────────────────

    def ecran_perimetre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-perimetre")
        self.titre_ecran("À quoi ça sert ?")
        # côtés x = 3, x + 2 = 5, 2x = 6, à l'échelle 0,7
        A = P(-6.2, 0.5)
        B = A + P(4.2, 0)
        C = A + P(1.1667, 1.7466)
        cx, cx2, c2x = "#F472B6", BLEU_CALCUL, VERT_OK
        sx, sx2, s2x = Line(A, C, color=cx, stroke_width=7), Line(C, B, color=cx2, stroke_width=7), \
            Line(A, B, color=c2x, stroke_width=7)
        self.au_mot("Un triangle")
        fond = Polygon(A, B, C, stroke_width=0, fill_color=WHITE, fill_opacity=0.08)
        self.play(FadeIn(fond), Create(VGroup(sx, sx2, s2x)), run_time=1.0)
        self.au_mot("côtés x")
        lx = self.t("x", 36, cx).move_to((A + C) / 2 + P(-0.35, 0.15))
        self.play(FadeIn(lx), Indicate(sx, color=cx))
        self.au_mot("x plus 2, et")
        lx2 = self.t("x + 2", 36, cx2).move_to((C + B) / 2 + P(0.6, 0.25))
        self.play(FadeIn(lx2), Indicate(sx2, color=cx2))
        self.au_mot("et 2 x")
        l2x = self.t("2x", 36, c2x).next_to(s2x, DOWN, buff=0.15)
        self.play(FadeIn(l2x), Indicate(s2x, color=c2x))
        self.au_mot("Son périmètre")
        # le triangle se déplie en un segment
        y = -1.3
        x0 = -6.2
        seg = [Line(P(x0, y), P(x0 + 2.1, y), color=cx, stroke_width=9),
               Line(P(x0 + 2.1, y), P(x0 + 5.6, y), color=cx2, stroke_width=9),
               Line(P(x0 + 5.6, y), P(x0 + 9.8, y), color=c2x, stroke_width=9)]
        ticks = VGroup(*[Line(P(v, y - 0.15), P(v, y + 0.15), color=WHITE, stroke_width=3)
                         for v in (x0, x0 + 2.1, x0 + 5.6, x0 + 9.8)])
        ls = VGroup(self.t("x", 32, cx), self.t("x + 2", 32, cx2), self.t("2x", 32, c2x))
        for l, s in zip(ls, seg):
            l.next_to(s, DOWN, buff=0.2)
        pe = self.ligne([self.t("P =", 48), self.t("x", 48, cx), self.t("+", 48), self.t("x + 2", 48, cx2),
                         self.t("+", 48), self.t("2x", 48, c2x)], buff=0.22).move_to(P(2.5, 1.6))
        self.play(TransformFromCopy(sx, seg[0]), TransformFromCopy(sx2, seg[1]), TransformFromCopy(s2x, seg[2]),
                  FadeIn(ticks), run_time=1.6)
        self.play(FadeIn(ls), Write(pe), run_time=1.4)
        self.au_mot("Réduit")
        red = self.ligne([self.t("P =", 56), self.expr("4x + 2", 56)], buff=0.25).move_to(P(2.5, 0.5))
        self.play(Write(red))
        boite = SurroundingRectangle(red[1], color=VERT_OK, buff=0.15)
        self.play(Create(boite))
        self.insister(VGroup(red[1], boite), 1.3)
        self.au_mot("Plus court")
        self.play(Write(self.chute("Plus court, et plus facile à calculer.", color=BLEU_CALCUL, font_size=38)))
        self.attendre_voix()

    # ── 06 : deux pièges ────────────────────────────────────────────────────

    def ecran_pieges(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-pieges")
        self.titre_ecran("Deux pièges")
        xg, xd = -4.1, 1.9
        sep = DashedLine(P(-1.3, 2.6), P(-1.3, -3.0), color=GREY_B, dash_length=0.15)
        self.add(sep)
        self.au_mot("2 x plus 3 ne fait pas")
        f1 = self.ligne([self.expr("2x + 3", 54), self.t("=", 54, ROUGE_ERREUR), self.t("5x", 54, ROUGE_ERREUR)])
        f1.move_to(P(xg, 2.0))
        self.play(Write(f1[0]))
        self.au_mot("5 x :")
        self.play(FadeIn(f1[1:]))
        self.play(Create(self.barrer(f1[1:])))
        self.au_mot("ce n'est pas la même famille")
        cartes = VGroup(self.carte("2x", FAM_X, 48), self.carte("3", FAM_NB, 48)).arrange(RIGHT, buff=1.2)
        cartes.move_to(P(xg, 0.4))
        neq = self.t("≠", 56, ROUGE_ERREUR).move_to(cartes.get_center())
        fam = VGroup(self.t("pas la même", 32, ROUGE_ERREUR), self.t("famille", 32, ROUGE_ERREUR))
        fam.arrange(DOWN, buff=0.12).next_to(cartes, DOWN, buff=0.35)
        self.play(FadeIn(cartes, shift=UP * 0.2), FadeIn(neq))
        self.play(FadeIn(fam))
        bon1 = self.ligne([self.t("reste", 36, VERT_OK), self.expr("2x + 3", 44)], buff=0.2)
        bon1.next_to(fam, DOWN, buff=0.4)
        self.play(FadeIn(bon1))

        self.au_mot("Et 3 x fois 2 x")
        f2 = self.ligne([self.expr("3x × 2x", 54), self.t("=", 54, ROUGE_ERREUR), self.t("6x", 54, ROUGE_ERREUR)])
        f2.move_to(P(xd, 2.0))
        self.play(Write(f2[0]))
        self.au_mot("ne fait pas 6 x,")
        self.play(FadeIn(f2[1:]))
        self.play(Create(self.barrer(f2[1:])))
        self.au_mot("mais 6 x au carré")
        c = 0.8
        cases = VGroup(*[Square(side_length=c, stroke_color=WHITE, stroke_width=2, fill_color=FAM_CARRE,
                                fill_opacity=0.35) for _ in range(6)]).arrange_in_grid(2, 3, buff=0)
        cases.move_to(P(xd - 0.1, 0.6))
        lab3 = self.expr("3x", 34).next_to(cases, DOWN, buff=0.12)
        lab2 = self.expr("2x", 34).next_to(cases, LEFT, buff=0.12)
        self.play(FadeIn(cases, lag_ratio=0.15), FadeIn(lab3), FadeIn(lab2), run_time=1.0)
        x2s = VGroup(*[self.expr("x²", 30).move_to(q) for q in cases])
        self.play(LaggedStart(*[FadeIn(m) for m in x2s], lag_ratio=0.12))
        bon = self.ligne([self.expr("3x × 2x", 44), self.t("=", 44), self.expr("6x²", 44)], buff=0.2)
        bon.move_to(P(xd, -1.4))
        self.play(Write(bon))
        self.insister(bon[2])
        self.au_mot("x fois x")
        q0 = cases[0]
        self.play(q0.animate.set_fill(FAM_CARRE, 0.9), Indicate(x2s[0], color=WHITE, scale_factor=1.6))
        xx = self.ligne([self.expr("x × x", 40), self.t("=", 40), self.expr("x²", 40)], buff=0.2).move_to(P(xd, -2.3))
        self.play(Write(xx))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Réduis")
        self.play(FadeIn(self.t("Réduis :", 40, BLEU_CALCUL).move_to(P(-0.6, 1.9))))
        e = self.expr("7y − 3 + 2y − y + 8", 84).move_to(P(-0.6, 0.6))
        self.au_mot("7 y moins 3")
        self.play(Write(e[0:4]))
        self.au_mot("plus 2 y")
        self.play(Write(e[4:7]))
        self.au_mot("moins y")
        self.play(Write(e[7:9]))
        self.au_mot("plus 8")
        self.play(Write(e[9:11]))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        e = self.expr("7y − 3 + 2y − y + 8", 60).move_to(P(-0.8, 2.3))
        self.add(e)
        by = self.boite("y", FAM_X, P(-3.4, 0.2), largeur=4.0, avec_icone=False)
        bn = self.boite("nombres", FAM_NB, P(1.4, 0.2), largeur=3.6, avec_icone=False)
        self.add(by, bn)
        cy = [self.carte("7y", FAM_X), self.carte("+ 2y", FAM_X), self.carte("− y", FAM_X)]
        cn = [self.carte("− 3", FAM_NB), self.carte("+ 8", FAM_NB)]
        self.au_mot("Les y")
        self.tirer([e[0:2], e[4:7], e[7:9]], cy, by)
        self.au_mot("7 plus 2 moins 1")
        ly = self.t("7 + 2 − 1 = 8y", 40, COUL_COEF)
        ly[-1].set_color(COUL_LETTRE)
        ly.next_to(by, DOWN, buff=0.25)
        self.play(Write(ly[:-1]))
        self.au_mot("8 y.")
        self.play(FadeIn(ly[-1]))
        uy = self.fusionner(cy, "8y", FAM_X, by)
        self.insister(uy)
        self.au_mot("Les nombres")
        self.tirer([e[2:4], e[9:11]], cn, bn)
        self.au_mot("moins 3 plus 8")
        ln = self.expr("−3 + 8 = 5", 40).next_to(bn, DOWN, buff=0.25)
        self.play(Write(ln))
        self.au_mot(", 5.")
        un = self.fusionner(cn, "5", FAM_NB, bn)
        self.insister(un)
        self.au_mot("Le résultat")
        res = self.ligne([self.expr("7y − 3 + 2y − y + 8", 48), self.t("=", 48), self.expr("8y + 5", 48)], buff=0.3)
        res.move_to(P(-0.8, -2.6))
        self.play(Write(res))
        boite = SurroundingRectangle(res[2], color=VERT_OK, buff=0.15)
        self.play(Create(boite))
        self.insister(VGroup(res[2], boite), 1.3)
        self.attendre_voix(marge=1.5)

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ('Des termes semblables', 'Des termes semblables : la même famille.'),
            ('On réduit famille', 'On réduit famille par famille, négatifs et carrés compris.'),
            ('Et on ne mélange', 'On ne mélange jamais les familles.'),
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
        self.au_mot('La suite')
        self.play(Write(self.chute('La suite : développer', color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_familles()
        self.ecran_regrouper()
        self.ecran_negatifs()
        self.ecran_carres()
        self.ecran_perimetre()
        self.ecran_pieges()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
