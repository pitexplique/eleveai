# expression_identites.py
# EleveAI — Maths 3e — Expression littérale, épisode 6 : les identités remarquables
# (notionId : litteral_calcul, micro : litteral_identite), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau. Paysage ceinture VERTE, même structure que l'épisode 1
# de 5e (scripts/5e/expression_comprendre.py). Short jumeau (ceinture blanche) :
# expression_identites_short.py (le carré x + 3 découpé en 4 morceaux).
#
# ⭐ LE DESSIN QUI PORTE TOUT : le CARRÉ DE CÔTÉ x + 3 découpé : x² (BLEU),
# 9 (VERT) et les DEUX rectangles 3x (ORANGE), « ceux qu'on oublie ».
# Code couleur des trois identités : a² BLEU, 2ab ORANGE, b² VERT ; lettre JAUNE.
#
# Défi : (x − 4)² = x² − 8x + 16 ; x² − 36 = (x − 6)(x + 6).
#
# Voix : manim/voix/3e-expression-identites.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/expression_identites.py ExpressionIdentites3e -o eleveai-maths-3e-expression-identites --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/06-identites/.

import sys
from pathlib import Path
from types import SimpleNamespace

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

W = "#FFFFFF"
C_A2 = BLEU_CALCUL      # a², x²
C_2AB = ORANGE_RETENUE  # 2ab, les rectangles 3x
C_B2 = VERT_OK          # b², le petit carré 9
LETTRES = "xab"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def ex(morceaux, font_size=48, sep=" "):
    """UNE ligne de texte (donc une seule ligne de base), coloriée par morceaux.
    Renvoie un VGroup de morceaux (chacun un VGroup de glyphes). Dans un morceau
    BLANC, les lettres x, a, b sont JAUNES."""
    texte = sep.join(t for t, _ in morceaux)
    m = Text(texte, font_size=font_size, color=W)
    parts, k = VGroup(), 0
    for t, c in morceaux:
        s = t.replace(" ", "")
        g = VGroup(*m[k:k + len(s)])
        for gl, ch in zip(g, s):
            if c == W:
                if ch in LETTRES:
                    gl.set_color(JAUNE_TITRE)
            else:
                gl.set_color(c)
        parts.add(g)
        k += len(s)
    assert k == len(m), (texte, k, len(m))
    return parts


def carre_decoupe(coin, a, b, fs=34, fs_lbl=32):
    """Le carré de côté x + 3 : contour, deux coupes, quatre morceaux à remplir
    (grand x², rectangle haut-droite, rectangle bas-gauche, petit 9)."""
    x0, y0 = coin
    big = Rectangle(width=a, height=a).move_to(P(x0 + a / 2, y0 - a / 2))
    r1 = Rectangle(width=b, height=a).move_to(P(x0 + a + b / 2, y0 - a / 2))
    r2 = Rectangle(width=a, height=b).move_to(P(x0 + a / 2, y0 - a - b / 2))
    pt = Rectangle(width=b, height=b).move_to(P(x0 + a + b / 2, y0 - a - b / 2))
    for r in (big, r1, r2, pt):
        r.set_stroke(width=0).set_fill(W, 0)
    contour = Square(side_length=a + b, stroke_color=W, stroke_width=4).move_to(P(x0 + (a + b) / 2, y0 - (a + b) / 2))
    coupes = VGroup(Line(P(x0 + a, y0), P(x0 + a, y0 - a - b)),
                    Line(P(x0, y0 - a), P(x0 + a + b, y0 - a))).set_stroke(W, 2.5)
    lx = Text("x", font_size=fs_lbl, color=JAUNE_TITRE)
    lbl = VGroup(lx.copy().move_to(P(x0 + a / 2, y0 + 0.28)),
                 Text("3", font_size=fs_lbl, color=W).move_to(P(x0 + a + b / 2, y0 + 0.28)),
                 lx.copy().move_to(P(x0 - 0.28, y0 - a / 2)),
                 Text("3", font_size=fs_lbl, color=W).move_to(P(x0 - 0.28, y0 - a - b / 2)))
    t_big = Text("x²", font_size=fs + 8, color=W).move_to(big)
    t_r1 = Text("3x", font_size=fs, color=W).move_to(r1)
    t_r2 = Text("3x", font_size=fs, color=W).move_to(r2)
    t_pt = Text("9", font_size=fs, color=W).move_to(pt)
    return SimpleNamespace(big=big, r1=r1, r2=r2, pt=pt, contour=contour, coupes=coupes, lbl=lbl,
                           t_big=t_big, t_r1=t_r1, t_r2=t_r2, t_pt=t_pt,
                           tout=VGroup(big, r1, r2, pt, contour, coupes, lbl, t_big, t_r1, t_r2, t_pt))


def remplir_tout(c):
    c.big.set_fill(C_A2, 0.45)
    c.pt.set_fill(C_B2, 0.45)
    c.r1.set_fill(C_2AB, 0.45)
    c.r2.set_fill(C_2AB, 0.45)


class ExpressionIdentites3e(Notion3e):
    nom_voix = "3e-expression-identites"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, f=1.5):
        self.play(mob.animate.scale(f), run_time=0.5)
        self.play(mob.animate.scale(1 / f), run_time=0.5)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def carte(self, ligne, color=GREY_B):
        return SurroundingRectangle(ligne, color=color, buff=0.28, corner_radius=0.15,
                                    stroke_width=3, fill_color="#1E293B", fill_opacity=1)

    def clignoter(self, c, fois=2):
        """Les deux rectangles 3x : ils s'allument et leur « 3x » grandit puis rétrécit."""
        for _ in range(fois):
            self.play(c.r1.animate.set_fill(C_2AB, 0.95), c.r2.animate.set_fill(C_2AB, 0.95),
                      c.t_r1.animate.scale(1.5), c.t_r2.animate.scale(1.5), run_time=0.45)
            self.play(c.r1.animate.set_fill(C_2AB, 0.45), c.r2.animate.set_fill(C_2AB, 0.45),
                      c.t_r1.animate.scale(1 / 1.5), c.t_r2.animate.scale(1 / 1.5), run_time=0.45)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les identités remarquables", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        q = ex([("(x + 3)²", W), ("=", W), ("x² + 9", BLEU_CALCUL), ("?", BLEU_CALCUL)], 80)
        q.move_to(P(-0.6, 0.4))
        self.au_mot("x plus 3")
        self.play(Write(q[0]))
        self.au_mot("x au carré plus 9")
        self.play(FadeIn(q[1]), FadeIn(q[2]))
        self.play(FadeIn(q[3]))
        self.insister(q[3], 1.6)
        self.attendre_voix(marge=1.5)

    # ── 01 : le carré découpé ───────────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-carre")
        self.titre_ecran("Un carré de côté x + 3")
        c = carre_decoupe((-6.0, 2.3), 2.6, 1.2)
        self.add(c.big, c.r1, c.r2, c.pt)
        self.play(Create(c.contour), FadeIn(c.lbl), run_time=1.0)
        self.au_mot("Je le découpe")
        self.play(Create(c.coupes), run_time=0.9)
        xc = 2.2
        self.au_mot("un carré x sur x")
        self.play(c.big.animate.set_fill(C_A2, 0.45))
        self.au_mot("aire x au carré")
        l1 = ex([("x × x", W), ("=", W), ("x²", C_A2)], 48).move_to(P(xc, 1.8))
        self.play(FadeIn(c.t_big), Write(l1))
        self.au_mot("Un petit carré 3 sur 3")
        self.play(c.pt.animate.set_fill(C_B2, 0.45))
        self.au_mot("aire 9")
        l2 = ex([("3 × 3", W), ("=", W), ("9", C_B2)], 48).move_to(P(xc, 0.8))
        self.play(FadeIn(c.t_pt), Write(l2))
        self.au_mot("Et deux rectangles")
        self.play(c.r1.animate.set_fill(C_2AB, 0.45), c.r2.animate.set_fill(C_2AB, 0.45))
        self.au_mot("3 x chacun")
        l3 = ex([("x × 3", W), ("=", W), ("3x", C_2AB), (", deux fois", C_2AB)], 48, sep=" ")
        l3.move_to(P(xc, -0.2))
        self.play(FadeIn(c.t_r1), FadeIn(c.t_r2), Write(l3))
        self.au_mot("Ceux qu'on oublie")
        self.play(Write(self.chute("Ceux qu'on oublie !", color=ORANGE_RETENUE, font_size=44)), run_time=0.8)
        self.clignoter(c)
        self.attendre_voix()

    # ── 02 : (a + b)² ───────────────────────────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-somme")
        self.titre_ecran("La première identité")
        c = carre_decoupe((-6.3, 2.3), 2.2, 1.0, fs=30, fs_lbl=30)
        remplir_tout(c)
        self.add(c.tout)
        xc = 1.9
        self.au_mot("L'aire totale")
        r = ex([("(x + 3)²", W), ("=", W), ("x²", C_A2), ("+", W), ("6x", C_2AB), ("+", W), ("9", C_B2)], 46)
        r.move_to(P(xc, 2.2))
        self.play(Write(r[0:2]))
        self.au_mot("x au carré plus 6 x")
        self.play(TransformFromCopy(c.t_big, r[2]), run_time=0.8)
        self.play(FadeIn(r[3]), TransformFromCopy(VGroup(c.t_r1, c.t_r2), r[4]), run_time=0.9)
        self.au_mot("plus 9")
        self.play(FadeIn(r[5]), TransformFromCopy(c.t_pt, r[6]), run_time=0.8)
        faux = ex([("et pas", ROUGE_ERREUR), ("x² + 9", ROUGE_ERREUR)], 36).move_to(P(xc, 1.35))
        self.play(FadeIn(faux[0]), FadeIn(faux[1]))
        self.play(Create(self.barrer(faux[1])), run_time=0.5)

        self.au_mot("C'est la première identité")
        idt = ex([("(a + b)²", W), ("=", W), ("a²", C_A2), ("+", W), ("2ab", C_2AB), ("+", W), ("b²", C_B2)], 46)
        idt.move_to(P(xc + 0.2, -0.4))
        fond = self.carte(idt, BLEU_CALCUL)
        self.play(FadeIn(fond), Write(idt[0]))
        self.au_mot("égale a au carré")
        self.play(Write(idt[1:3]))
        self.au_mot("plus 2 a b")
        self.play(Write(idt[3:5]))
        self.au_mot("plus b au carré")
        self.play(Write(idt[5:]))
        self.au_mot("Le 2 a b, ce sont")
        self.play(Write(self.chute("2ab = 2 × x × 3 = 6x : les deux rectangles", color=ORANGE_RETENUE, font_size=34)))
        self.play(Indicate(idt[4], color=C_2AB, scale_factor=1.3))
        self.clignoter(c, 1)
        self.attendre_voix()

    # ── 03 : (a − b)² ───────────────────────────────────────────────────────

    def ecran_difference(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-difference")
        self.titre_ecran("La deuxième identité")
        idt = ex([("(a − b)²", W), ("=", W), ("a²", C_A2), ("−", C_2AB), ("2ab", C_2AB), ("+", W), ("b²", C_B2)], 56)
        idt.move_to(P(-0.6, 1.9))
        fond = self.carte(idt, BLEU_CALCUL)
        self.au_mot("a moins b, au carré")
        self.play(FadeIn(fond), Write(idt[0]))
        self.au_mot("égale a au carré")
        self.play(Write(idt[1:3]))
        self.au_mot("moins 2 a b")
        self.play(Write(idt[3:5]))
        self.insister(idt[3], 1.8)
        self.au_mot("plus b au carré")
        self.play(Write(idt[5:]))

        e = ex([("(x − 5)²", W), ("=", W), ("x²", C_A2), ("−", C_2AB), ("10x", C_2AB), ("+", W), ("25", C_B2)], 60, sep="  ")
        e.move_to(P(-0.6, 0.0))
        d1 = ex([("2 × x × 5", W), ("=", W), ("10x", C_2AB)], 34).move_to(P(-2.4, -1.25))
        d2 = ex([("5²", W), ("=", W), ("25", C_B2)], 34).move_to(P(2.0, -1.25))
        self.au_mot("x moins 5, au carré")
        self.play(Write(e[0]))
        self.au_mot("x au carré moins 10 x")
        self.play(Write(e[1:3]))
        self.play(Write(e[3:5]), FadeIn(d1))
        self.au_mot("plus 25")
        self.play(Write(e[5:]), FadeIn(d2))
        cadre = SurroundingRectangle(e[2:], color=VERT_OK, buff=0.15)
        self.play(Create(cadre))
        self.play(Write(self.chute("Le signe − tombe sur le double produit, pas sur b².",
                                   color=ORANGE_RETENUE, font_size=32)))
        self.attendre_voix()

    # ── 04 : (a − b)(a + b) ─────────────────────────────────────────────────

    def ecran_produit(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-produit")
        self.titre_ecran("La troisième identité")
        idt = ex([("(a − b)(a + b)", W), ("=", W), ("a²", C_A2), ("−", W), ("b²", C_B2)], 56)
        idt.move_to(P(-0.6, 1.9))
        fond = self.carte(idt, BLEU_CALCUL)
        self.au_mot("a moins b, fois a plus b")
        self.play(FadeIn(fond), Write(idt[0]))
        self.au_mot("égale a au carré moins b au carré")
        self.play(Write(idt[1:]))

        self.au_mot("x moins 5, fois x plus 5")
        e = ex([("(x − 5)(x + 5)", W)], 60).move_to(P(-0.6, 0.35))
        self.play(Write(e))
        self.au_mot(": x au carré moins 25")
        dev = ex([("=", W), ("x²", C_A2), ("+ 5x", C_2AB), ("− 5x", C_2AB), ("− 25", C_B2)], 60, sep="   ")
        dev.move_to(P(-0.6, -0.85))
        self.play(Write(dev), run_time=1.4)
        self.au_mot("Les termes en x s'annulent")
        self.play(Indicate(dev[2], color=C_2AB), Indicate(dev[3], color=C_2AB))
        self.au_mot("moins 5 x plus 5 x")
        petit = ex([("−5x + 5x", C_2AB), ("=", W), ("0", C_2AB)], 40).move_to(P(-0.6, -2.0))
        self.play(Write(petit[0]))
        milieu = (dev[2].get_center() + dev[3].get_center()) / 2
        self.play(dev[2].animate.move_to(milieu), dev[3].animate.move_to(milieu), run_time=0.9)
        self.play(FadeOut(dev[2], scale=0.2), FadeOut(dev[3], scale=0.2), run_time=0.5)
        self.au_mot(", 0.")
        self.play(Write(petit[1:]))
        reste = VGroup(dev[0], dev[1], dev[4])
        cible = VGroup(dev[0].copy(), dev[1].copy(), dev[4].copy()).arrange(RIGHT, buff=0.4).move_to(P(-0.6, -0.85))
        self.play(*[m.animate.move_to(p) for m, p in zip(reste, cible)], run_time=0.8)
        cadre = SurroundingRectangle(VGroup(dev[1], dev[4]), color=VERT_OK, buff=0.12)
        self.play(Create(cadre))
        self.attendre_voix()

    # ── 05 : calcul mental ──────────────────────────────────────────────────

    def ecran_calcul_mental(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calcul-mental")
        self.titre_ecran("Un tour de calcul mental")
        l1 = ex([("21 × 19 = (", W), ("20", C_A2), (" + ", W), ("1", C_B2), (")(", W), ("20", C_A2),
                 (" − ", W), ("1", C_B2), (")", W)], 60, sep="")
        l1.move_to(P(-0.6, 2.0))
        self.au_mot("21 fois 19")
        self.play(Write(l1[0][:5]))
        self.au_mot("c'est 20 plus 1")
        self.play(Write(VGroup(l1[0][5:], l1[1:])), run_time=1.6)
        self.au_mot("20 au carré moins 1 au carré")
        l2 = ex([("=", W), ("20²", C_A2), ("−", W), ("1²", C_B2)], 60).move_to(P(-0.6, 0.8))
        l2.align_to(l1[0][5], LEFT)
        rappel = ex([("(a − b)(a + b)", W), ("=", W), ("a²", C_A2), ("−", W), ("b²", C_B2)], 30)
        rappel.move_to(P(-0.6, -2.5))
        self.play(Write(l2), FadeIn(rappel))
        self.au_mot("400 moins 1")
        l3 = ex([("=", W), ("400", C_A2), ("−", W), ("1", C_B2)], 60).move_to(P(-0.6, -0.4))
        l3.align_to(l2, LEFT)
        self.play(Write(l3))
        self.au_mot(", 399.")
        l4 = ex([("=", W), ("399", VERT_OK)], 72).move_to(P(-0.6, -1.5))
        l4.align_to(l2, LEFT)
        self.play(Write(l4))
        cadre = SurroundingRectangle(l4[1], color=VERT_OK, buff=0.15)
        self.play(Create(cadre))
        self.insister(VGroup(l4[1], cadre), 1.5)
        self.attendre_voix()

    # ── 06 : factoriser ─────────────────────────────────────────────────────

    def ecran_factoriser(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-factoriser")
        self.titre_ecran("Dans l'autre sens : factoriser")
        g = ex([("(a − b)(a + b)", W)], 44).move_to(P(-4.0, 1.3))
        d = ex([("a² − b²", W)], 44).move_to(P(2.6, 1.3))
        f_dev = CurvedArrow(g.get_top() + UP * 0.2, d.get_top() + UP * 0.2, angle=-0.5, color=GREY_B)
        l_dev = self.t("développer", 28, GREY_B).next_to(f_dev, UP, buff=0.05)
        f_fac = CurvedArrow(d.get_bottom() + DOWN * 0.25, g.get_bottom() + DOWN * 0.25, angle=-0.5, color=VERT_OK,
                            stroke_width=6)
        l_fac = self.t("factoriser", 32, VERT_OK).next_to(f_fac, DOWN, buff=0.05)
        self.play(FadeIn(g), FadeIn(d), Create(f_dev), FadeIn(l_dev), run_time=1.0)
        self.au_mot("elles factorisent")
        self.play(Create(f_fac), FadeIn(l_fac), run_time=1.0)

        l1 = ex([("x² − 49", W), ("=", W), ("x² − 7²", W), ("=", W), ("(x − 7)(x + 7)", VERT_OK)], 48, sep="  ")
        l1.move_to(P(-0.8, -0.85))
        self.au_mot("x au carré moins 49")
        self.play(Write(l1[0]))
        self.au_mot("x au carré moins 7 au carré")
        self.play(Write(l1[1:3]))
        self.au_mot("donc x moins 7")
        self.play(Write(l1[3:]))
        self.play(Create(SurroundingRectangle(l1[4], color=VERT_OK, buff=0.12)))

        l2 = ex([("x² + 6x + 9", W), ("=", W), ("(x + 3)²", VERT_OK)], 48, sep="  ")
        l2.move_to(P(-0.8, -1.95)).align_to(l1, LEFT)
        self.au_mot("Et x au carré plus 6 x plus 9")
        self.play(Write(l2[0]))
        self.au_mot("x plus 3, au carré")
        aide = ex([("car", ORANGE_RETENUE), ("6x = 2 × x × 3", ORANGE_RETENUE), ("et", ORANGE_RETENUE),
                   ("9 = 3²", ORANGE_RETENUE)], 30).next_to(l2, DOWN, buff=0.3).align_to(l2, LEFT)
        self.play(Write(l2[1:]), FadeIn(aide))
        self.play(Create(SurroundingRectangle(l2[2], color=VERT_OK, buff=0.12)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Développe")
        q1 = VGroup(self.t("1. Développe :", 40, BLEU_CALCUL), ex([("(x − 4)²", W)], 72)[0]).arrange(RIGHT, buff=0.5)
        q1.move_to(P(-0.6, 1.4))
        self.play(FadeIn(q1[0]))
        self.au_mot("x moins 4")
        self.play(Write(q1[1]))
        self.au_mot("Puis factorise")
        q2 = VGroup(self.t("2. Factorise :", 40, BLEU_CALCUL), ex([("x² − 36", W)], 72)[0]).arrange(RIGHT, buff=0.5)
        q2.move_to(P(-0.6, -0.2)).align_to(q1, LEFT)
        self.play(FadeIn(q2[0]))
        self.au_mot("x au carré moins 36")
        self.play(Write(q2[1]))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        l1 = ex([("(x − 4)²", W), ("=", W), ("x²", C_A2), ("−", C_2AB), ("8x", C_2AB), ("+", W), ("16", C_B2)], 58, sep="  ")
        l1.move_to(P(-0.8, 1.9))
        d1 = ex([("2 × x × 4 = 8x", C_2AB), ("et", W), ("4² = 16", C_B2)], 32).move_to(P(-0.8, 0.95))
        self.au_mot("x moins 4, au carré")
        self.play(Write(l1[0]))
        self.au_mot("x au carré moins 8 x")
        self.play(Write(l1[1:5]), FadeIn(d1[0]))
        self.au_mot("plus 16")
        self.play(Write(l1[5:]), FadeIn(d1[1:]))
        b1 = SurroundingRectangle(l1[2:], color=VERT_OK, buff=0.15)
        self.play(Create(b1))

        l2 = ex([("x² − 36", W), ("=", W), ("(x − 6)(x + 6)", VERT_OK)], 58, sep="  ").move_to(P(-0.8, -0.55))
        d2 = ex([("car", W), ("36 = 6²", C_B2)], 32).move_to(P(-0.8, -1.5))
        self.au_mot("x au carré moins 36")
        self.play(Write(l2[0]))
        self.au_mot("x moins 6, fois")
        self.play(Write(l2[1:]), FadeIn(d2))
        b2 = SurroundingRectangle(l2[2], color=VERT_OK, buff=0.15)
        self.play(Create(b2))
        self.attendre_voix(marge=1.5)

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ('x plus 3, au carré', '(x + 3)² ≠ x² + 9'),
            ('il manque les deux', 'Il manque les 2 rectangles.'),
            ('Les trois identités', 'Les 3 identités servent à développer et à factoriser.'),
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
        self.au_mot('Tu as fini')
        self.play(Write(self.chute("Série de 3e finie : les défis t'attendent sur le coach !", color=VERT_OK, font_size=34)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_carre()
        self.ecran_somme()
        self.ecran_difference()
        self.ecran_produit()
        self.ecran_calcul_mental()
        self.ecran_factoriser()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
