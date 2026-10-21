# proba_va_defi.py
# EleveAI — Maths Tle spé (micro va_defi, notion variable_aleatoire) — série
# « Probabilités » : UN EXERCICE TYPE BAC AVEC UNE VARIABLE ALÉATOIRE, AVEC VOIX.
# Paysage 16:9, ceinture NOIRE. Short jumeau : proba_va_defi_short.py (orange).
#
# Domaine : la MUSIQUE. Métier : un ingénieur du son, producteur d'un jeune
# groupe de maloya, négocie les contrats : vendre le titre à un label (700 €
# sûrs) ou garder le streaming (X, risqué).
#
# ⭐ Les figures du coach (banque terminale-spe/maths/variables-aleatoires) :
#   · le TABLEAU DE LOI (`probabilites` variant « tableau » : en-tête sombre
#     « xᵢ | valeurs », ligne « P(X = xᵢ) » à libellé bleu clair, cases
#     blanches, colonne allumée en jaune) — repris de stmg/proba_va_esperance.py,
#     avec une 3e ligne « xᵢ × P » qui se remplit pour l'espérance ;
#   · le `stat_graph` « bâtons » sur un axe à l'échelle (premiere/
#     proba_va_variance.py : BatonsReels) pour comparer les deux contrats :
#     700 € sûrs, l'espérance 850 €, l'écart-type 750 €.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit que quand la voix le dit.
#   Nombres (Python, fractions exactes) : X ∈ {500 ; 800 ; 1 000 ; 4 000},
#   P = 0,5 / 0,25 / 0,2 / 0,05 · produits 250 / 200 / 200 / 200 · E = 850 ·
#   E(X²) = 1 285 000 · 850² = 722 500 · V = 562 500 · σ = 750 · moyenne des
#   valeurs (le piège) 1 575 · défi : E(2X) = 1 700, σ(2X) = 1 500 · short :
#   P(X > 900) = 0,25.
#
# Écrans : 00 garde · 01 la situation (casque, ravanne, streaming) · 02 Q1 la
# loi · 03 Q2 l'espérance · 04 Q3 variance et écart-type · 05 Q4 les deux
# contrats · 06 le piège (moyenne des valeurs) · 07 défi (2X) · 07b correction
# · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/terminale-proba-va-defi.json (débit −6), calée mot à mot
# par proba_va_defi_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_va_defi.py ProbaVaDefiTerminale -o eleveai-maths-terminale-proba-va-defi --media_dir manim/scripts/terminale/media-va_defi-1s
# Sortie : manim/sorties/terminale/maths/probabilites/26-va-defi/

import sys
from fractions import Fraction
from math import isqrt
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, ENCRE, SURLIGNE, ANNEAU, suite  # noqa: E402
from proba_va_esperance import TableauLoi, avec_indice, lab_p, lab_xi  # noqa: E402
from proba_va_variance import BatonsReels  # noqa: E402
from proba_bin_defi import MotsCales, puissance  # noqa: E402

VALS = [500, 800, 1000, 4000]
PROBS = [Fraction(1, 2), Fraction(1, 4), Fraction(1, 5), Fraction(1, 20)]
assert sum(PROBS) == 1
PRODS = [v * p for v, p in zip(VALS, PROBS)]
E = sum(PRODS)
E2 = sum(p * v * v for v, p in zip(VALS, PROBS))
V = E2 - E * E
SIGMA = isqrt(int(V))
assert PRODS == [250, 200, 200, 200] and E == 850 and E2 == 1285000 and V == 562500 and SIGMA ** 2 == V == 750 ** 2
assert Fraction(sum(VALS), 4) == 1575 and PROBS[2] + PROBS[3] == Fraction(1, 4)

T_VALS = ["500", "800", "1 000", "4 000"]
T_PROBS = ["0,5", "0,25", "0,2", "0,05"]
T_PRODS = ["250", "200", "200", "200"]
NIVEAUX = ["peu", "correctes", "beaucoup", "un tube"]
COUL_N = ["#94A3B8", "#3B82F6", "#22C55E", "#F97316"]   # du gris (peu d'écoutes) à l'orange (le tube)
SUR = "#22C55E"         # le contrat sûr
RISQUE = "#F97316"      # le streaming
BOIS = "#92400E"
PEAU = "#FDE68A"


def P(x, y):
    return np.array([x, y, 0.0])


def e_x2(fs=40, color=WHITE):
    """« E(X²) » en Text, le 2 en exposant."""
    a = Text("E(X", font_size=fs, color=color)
    d = Text("2", font_size=int(fs * 0.6), color=color).next_to(a, RIGHT, buff=0.03).align_to(a, UP).shift(UP * 0.08)
    b = Text(")", font_size=fs, color=color).next_to(d, RIGHT, buff=0.03).align_to(a, DOWN)
    return VGroup(a, d, b)


def ex_carre(fs=40, color=WHITE, prefixe="− "):
    """« − E(X)² » : le carré posé en exposant après la parenthèse."""
    a = Text(prefixe + "E(X)", font_size=fs, color=color)
    d = Text("2", font_size=int(fs * 0.6), color=color).next_to(a, RIGHT, buff=0.03).align_to(a, UP).shift(UP * 0.08)
    return VGroup(a, d)


def racine(texte, fs=40, color=WHITE):
    """√ suivi du nombre, avec la barre au-dessus."""
    r = Text("√", font_size=fs, color=color)
    n = Text(texte, font_size=fs, color=color).next_to(r, RIGHT, buff=0.04)
    barre = Line(n.get_corner(UL) + UP * 0.08 + LEFT * 0.06, n.get_corner(UR) + UP * 0.08, color=color,
                 stroke_width=3)
    return VGroup(r, n, barre)


# ── les dessins : le casque, la ravanne, le téléphone ───────────────────────

def casque(s=1.0, couleur="#E2E8F0"):
    arceau = Arc(radius=0.75, start_angle=0.15, angle=PI - 0.3, color=couleur, stroke_width=10)
    g = RoundedRectangle(width=0.36, height=0.62, corner_radius=0.14, fill_color="#334155", fill_opacity=1,
                         stroke_color=couleur, stroke_width=4).move_to(P(-0.74, -0.05))
    d = g.copy().move_to(P(0.74, -0.05))
    return VGroup(arceau, g, d).scale(s)


def ravanne(s=1.0):
    """La ravanne du maloya : un grand cadre de bois, la peau tendue."""
    bord = Circle(radius=0.8, fill_color=BOIS, fill_opacity=1, stroke_color="#451A03", stroke_width=3)
    peau = Circle(radius=0.66, fill_color=PEAU, fill_opacity=1, stroke_width=0)
    reflet = Arc(radius=0.48, start_angle=1.9, angle=1.0, color=WHITE, stroke_width=4).set_opacity(0.6)
    return VGroup(bord, peau, reflet).scale(s)


def telephone(s=1.0):
    """Un téléphone qui joue le titre : le bouton lecture et des barres d'écoute."""
    corps = RoundedRectangle(width=0.95, height=1.75, corner_radius=0.14, fill_color="#0F172A", fill_opacity=1,
                             stroke_color="#94A3B8", stroke_width=4)
    ecran = RoundedRectangle(width=0.78, height=1.45, corner_radius=0.06, fill_color="#1E293B", fill_opacity=1,
                             stroke_width=0)
    play = Triangle(fill_color=SUR, fill_opacity=1, stroke_width=0).rotate(-PI / 2).scale(0.17).move_to(P(0, 0.3))
    barres = VGroup(*[Rectangle(width=0.1, height=h, fill_color=COUL_N[1], fill_opacity=1, stroke_width=0)
                      for h in (0.2, 0.38, 0.28, 0.46, 0.32)]).arrange(RIGHT, buff=0.05, aligned_edge=DOWN)
    barres.move_to(P(0, -0.35))
    return VGroup(corps, ecran, play, barres).scale(s)


def onde(s=1.0, couleur=BLEU_CALCUL):
    """Trois arcs de son."""
    return VGroup(*[Arc(radius=0.18 + 0.17 * k, start_angle=-0.6, angle=1.2, color=couleur, stroke_width=5)
                    for k in range(3)]).scale(s)


class CarteLoi(VGroup):
    """Le stat_graph « bâtons » du coach, une carte par contrat : carte blanche,
    titre de couleur, axe, un bâton gris à pastille par valeur, de hauteur
    proportionnelle à sa probabilité (la même échelle pour les deux cartes)."""

    def __init__(self, vals, probs, titre, couleur, larg=6.6, haut=3.3):
        super().__init__()
        carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.18, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=BORD, stroke_width=2)
        self.titre = Text(titre, font_size=30, color=couleur, weight=BOLD).next_to(carte.get_top(), DOWN, buff=0.14)
        y0 = carte.get_bottom()[1] + 0.6
        g = carte.get_left()[0] + 0.3
        axe = Line(P(g, y0), P(carte.get_right()[0] - 0.3, y0), color=ENCRE, stroke_width=2.5)
        self.fond = VGroup(carte, axe)
        slot = (larg - 0.6) / len(vals)
        hmax = haut - 1.35
        self.batons, self.etiq = VGroup(), VGroup()
        for k, (v, p) in enumerate(zip(vals, probs)):
            x = g + slot * (k + 0.5)
            tr = Line(P(x, y0), P(x, y0 + p * hmax), color="#64748B", stroke_width=10)
            pt = Dot(P(x, y0 + p * hmax), radius=0.09, color="#64748B").set_stroke(ENCRE, 1.5)
            self.batons.add(VGroup(tr, pt))
            self.etiq.add(Text(v, font_size=26, color=ENCRE, weight=BOLD).move_to(P(x, y0 - 0.3)))
        self.add(self.fond, self.titre, self.batons, self.etiq)


class ProbaVaDefiBase(MotsCales, Notion6e):
    """Toutes les scènes ; la sous-classe ne change que identité et ceinture."""

    fichier_marques = "proba_va_defi_marques.json"
    nom_voix = "terminale-proba-va-defi"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
    X_G = -6.4          # le bord gauche des lignes de calcul
    LARG = 11.4         # leur largeur utile (Ti-Margo reste libre en bas à droite)

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def titre_ecran(self, texte, *avec, font_size=40):
        t = Text(texte, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t), *avec, run_time=0.8)
        return t

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=None):
        larg = larg or self.LARG
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def gauche(self, mob, y, x=None, larg=None):
        self.caser(mob, larg)
        return mob.move_to(P(self.X_G if x is None else x, y), aligned_edge=LEFT)

    def calcul(self, morceaux, fs=40, buff=0.16):
        """Une ligne de calcul ; morceaux = [(texte ou Mobject, couleur), …]."""
        return suite(*[m if isinstance(m, Mobject) else self.t(m, fs, c) for m, c in morceaux], buff=buff)

    def tableau(self, lignes=2, compact=False):
        fs = 30 if compact else 34
        labs = [lab_xi(fs), lab_p(fs - 2)] + ([avec_indice("x × P", 0, fs - 2)] if lignes == 3 else [])
        vals = [T_VALS, T_PROBS] + ([T_PRODS] if lignes == 3 else [])
        if compact:
            return TableauLoi(labs, vals, coin=P(-5.4, 2.35), larg_lab=2.8, larg=1.7, h=0.68, fs=fs)
        return TableauLoi(labs, vals, coin=P(-6.3, 2.3), larg_lab=3.0, larg=2.0, h=0.9, fs=fs)

    def niveaux(self, tab, fs=28):
        """Les mots au-dessus des colonnes : peu, correctes, beaucoup, un tube."""
        return VGroup(*[Text(m, font_size=fs, color=c).next_to(tab.rect[0][j + 1], UP, buff=0.1)
                        for j, (m, c) in enumerate(zip(NIVEAUX, COUL_N))])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Variable aléatoire", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        sous = self.t("un exercice type bac", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        r = ravanne(0.9).move_to(P(-2.4, -0.7))
        c = casque(1.0).move_to(P(-0.6, -0.55))
        tel = telephone(0.85).move_to(P(1.3, -0.7))
        self.add(ech, titre, c)   # la ceinture, visible dès la 1re image
        self.au_mot("exercice type bac")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(FadeIn(r, shift=RIGHT * 0.3), FadeIn(tel, shift=LEFT * 0.3), run_time=0.6)
        self.play(Wiggle(r), run_time=0.8)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        c = casque(1.6).move_to(P(-4.4, 1.1))
        self.titre_ecran("Le titre du groupe", FadeIn(c, shift=DOWN * 0.2))
        self.au_mot("ingénieur du son")
        l1 = self.t("ingénieur du son", 36, BLEU_CALCUL).next_to(c, DOWN, buff=0.35)
        on = onde(1.0).next_to(c, RIGHT, buff=0.15)
        self.play(FadeIn(l1, shift=UP * 0.15), Create(on), run_time=0.6)
        self.au_mot("maloya")
        r = ravanne(1.35).move_to(P(-0.2, 1.1))
        l2 = self.t("maloya", 36, PEAU).next_to(r, DOWN, buff=0.35)
        self.play(FadeIn(r, scale=0.6), FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.play(Wiggle(r, scale_value=1.15), run_time=0.7)
        self.au_mot("contrats")
        ct = VGroup(Rectangle(width=0.75, height=1.0, fill_color=WHITE, fill_opacity=1, stroke_color=BORD),
                    *[Line(P(-0.25, 0.3 - 0.17 * k), P(0.25, 0.3 - 0.17 * k), color="#94A3B8", stroke_width=3)
                      for k in range(4)]).scale(1.3).move_to(P(-2.3, -1.2))
        self.play(FadeIn(ct, shift=UP * 0.2), run_time=0.5)
        self.au_mot("streaming")
        tel = telephone(1.35).move_to(P(4.0, 1.1))
        l3 = self.t("streaming", 36, COUL_N[1]).next_to(tel, DOWN, buff=0.35)
        self.play(FadeIn(tel, shift=LEFT * 0.3), FadeIn(l3, shift=UP * 0.15), run_time=0.6)
        self.play(*[b.animate.stretch(1.6, 1, about_edge=DOWN) for b in tel[3]], run_time=0.5)
        self.au_mot("X : ce qu'il")
        x = suite(self.t("X :", 46, JAUNE_TITRE), self.t("le revenu du titre la 1re année", 40), buff=0.25)
        self.caser(x, 10.5).move_to(P(-0.6, -2.55))
        self.play(FadeIn(x, shift=UP * 0.15), run_time=0.6)
        self.au_mot("selon ses écoutes")
        self.play(Indicate(tel, color=COUL_N[1], scale_factor=1.15), run_time=0.7)
        self.attendre_voix()

    # ── 02 : question 1 : la loi ────────────────────────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-loi")
        tab = self.tableau()
        self.titre_ecran("Question 1 : la loi de X", FadeIn(tab.fonds), FadeIn(tab.labs))
        niv = self.niveaux(tab)
        tel = telephone(0.8).move_to(P(5.55, 1.4))
        self.add(tel)
        reperes = [("Peu d'écoutes", "500 euros", "avec 0,5"), ("Écoutes correctes", "800 euros", "0,25"),
                   ("Beaucoup", "1 000 euros", "0,2. Un"), ("Un tube", "4 000 euros", "0,05")]
        for j, (m0, m1, m2) in enumerate(reperes):
            self.au_mot(m0)
            hauts = [0.35, 0.6, 0.85, 1.35][j]
            self.play(FadeIn(niv[j], shift=DOWN * 0.1),
                      *[b.animate.stretch_to_fit_height(hauts * h0, about_edge=DOWN)
                        for b, h0 in zip(tel[3], (0.2, 0.38, 0.28, 0.46, 0.32))],
                      run_time=0.4)
            self.au_mot(m1)
            self.play(tab.poser(0, j), *tab.allumer(j, [1]), run_time=0.4)
            self.au_mot(m2)
            self.play(tab.poser(1, j), run_time=0.35)
            self.play(*tab.eteindre(j, [1]), run_time=0.2)
        self.au_mot("Somme des probabilités")
        s = self.calcul([("0,5", BLEU_CALCUL), ("+", WHITE), ("0,25", BLEU_CALCUL), ("+", WHITE), ("0,2", BLEU_CALCUL),
                         ("+", WHITE), ("0,05", BLEU_CALCUL), ("=", WHITE), ("1", VERT_OK)], 44)
        self.gauche(s, -0.6, x=-6.3)
        self.play(*[TransformFromCopy(tab.val[1][j], s[2 * j]) for j in range(4)],
                  *[FadeIn(s[2 * j + 1]) for j in range(3)], run_time=0.8)
        self.au_mot(": 1.")
        self.play(FadeIn(s[7]), FadeIn(s[8], scale=2.0), run_time=0.4)
        cad = SurroundingRectangle(s[8], color=VERT_OK, buff=0.12, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix()

    # ── 03 : question 2 : l'espérance ───────────────────────────────────────

    def ecran_esperance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-esperance")
        tab = self.tableau(lignes=3).tout(lignes=[0, 1])
        self.titre_ecran("Question 2 : l'espérance", FadeIn(tab), FadeIn(self.niveaux(tab)))
        self.au_mot("Chaque valeur")
        regle = self.calcul([("chaque valeur", WHITE), ("×", JAUNE_TITRE), ("sa probabilité", BLEU_CALCUL)], 40)
        self.gauche(regle, -1.15, x=-6.3)
        self.play(FadeIn(regle, shift=UP * 0.1), Indicate(tab.labs[2], color=JAUNE_TITRE), run_time=0.6)
        for j, mot in enumerate(["250", "200, 200 et", "200 et", "200."]):
            self.au_mot(mot)
            anims = tab.eteindre(j - 1) if j else []
            self.play(*anims, *tab.allumer(j), FadeIn(tab.val[2][j], scale=1.8), run_time=0.4)
        self.au_mot("On additionne")
        self.play(*tab.eteindre(3), run_time=0.2)
        self.play(*[tab.case(2, j).animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5) for j in range(4)],
                  run_time=0.4)
        self.au_mot("E de X égale")
        ex = self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE), ("850 €", JAUNE_TITRE)], 64)
        self.gauche(ex, -2.3, x=-6.3)
        self.play(FadeIn(ex[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("850 euros")
        cad = SurroundingRectangle(ex, color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(ex[2], scale=1.8), run_time=0.5)
        self.play(Create(cad), run_time=0.3)
        self.insister(ex[2], 0.25)
        self.attendre_voix()

    # ── 04 : question 3 : la variance et l'écart-type ───────────────────────

    def ecran_variance(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-variance")
        tab = self.tableau(compact=True).tout()
        self.titre_ecran("Question 3 : la variance", FadeIn(tab))
        fs = 38
        x0 = -6.3
        self.au_mot("V de X égale E")
        f = self.calcul([("V(X)", JAUNE_TITRE), ("=", WHITE), (e_x2(fs), WHITE), (ex_carre(fs), WHITE)], fs)
        self.gauche(f, 0.35, x=x0)
        self.play(FadeIn(f[:3], shift=UP * 0.1), run_time=0.5)
        self.au_mot("moins E de X au carré")
        self.play(FadeIn(f[3], shift=LEFT * 0.1), run_time=0.4)
        # E(X²) = 0,5 × 500² + 0,25 × 800²  /  + 0,2 × 1 000² + 0,05 × 4 000² = 1 285 000
        def terme(j, plus):
            m = ([("+", WHITE)] if plus else []) + [(T_PROBS[j], BLEU_CALCUL), ("×", WHITE),
                                                  (puissance(T_VALS[j], "2", fs), WHITE)]
            return m
        la = self.calcul([(e_x2(fs), WHITE), ("=", WHITE)] + terme(0, False) + terme(1, True), fs, buff=0.15)
        self.gauche(la, -0.45, x=x0)
        lb = self.calcul(terme(2, True) + terme(3, True) + [("=", WHITE), ("1 285 000", VERT_OK)], fs, buff=0.15)
        lb.next_to(la, DOWN, buff=0.3).align_to(la, LEFT).shift(RIGHT * 0.6)
        self.au_mot("E de X carré : 0,5")
        self.play(FadeIn(la[:2], shift=UP * 0.1), run_time=0.4)
        morceaux = [la[2:5], la[5:9], lb[0:4], lb[4:8]]
        for j, mot in enumerate(["0,5 fois", "0,25 fois", "0,2 fois", "0,05 fois"]):
            self.au_mot(mot)
            self.play(*tab.allumer(j), FadeIn(morceaux[j], shift=UP * 0.1), run_time=0.4)
            self.play(*tab.eteindre(j), run_time=0.15)
        self.au_mot("1 285 000")
        self.play(FadeIn(lb[8]), FadeIn(lb[9], scale=1.5), run_time=0.5)
        self.au_mot("Moins 850")
        l4 = self.calcul([("V(X)", JAUNE_TITRE), ("=", WHITE), ("1 285 000", VERT_OK), ("−", WHITE),
                          (puissance("850", "2", fs, JAUNE_TITRE), WHITE)], fs)
        self.gauche(l4, -2.05, x=x0)
        self.play(TransformFromCopy(lb[9], l4[2]), FadeIn(l4[3:], shift=UP * 0.1), run_time=0.5)
        self.au_mot("V de X égale 562")
        r4 = self.calcul([("=", WHITE), ("562 500", ORANGE_RETENUE)], fs).next_to(l4, RIGHT, buff=0.15)
        self.play(FadeIn(l4[:2]), FadeIn(r4, scale=1.4), run_time=0.5)
        self.au_mot("L'écart-type")
        l5 = self.calcul([("σ(X)", JAUNE_TITRE), ("=", WHITE), (racine("562 500", fs), WHITE)], fs)
        self.gauche(l5, -2.95, x=x0)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.au_mot("750 euros")
        r5 = self.calcul([("=", WHITE), ("750 €", RISQUE)], fs + 8).next_to(l5, RIGHT, buff=0.2)
        self.play(FadeIn(r5, scale=1.6), run_time=0.5)
        cad = SurroundingRectangle(r5[1], color=RISQUE, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r5[1], cad))
        self.attendre_voix()

    # ── 05 : question 4 : deux contrats ─────────────────────────────────────

    def ecran_contrats(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-contrats")
        sur = CarteLoi(["700"], [1.0], "Label", SUR, larg=3.4).move_to(P(-4.55, 0.55))
        ris = CarteLoi(T_VALS, [float(p) for p in PROBS], "Streaming", RISQUE, larg=6.6).move_to(P(1.25, 0.55))
        self.titre_ecran("Question 4 : deux contrats", FadeIn(sur.fond), FadeIn(ris.fond))
        fs = 36
        self.au_mot("Un label")
        self.play(FadeIn(sur.titre, scale=1.4), run_time=0.5)
        self.au_mot("700 euros")
        v1 = self.t("700 € sûrs", fs + 4, SUR).next_to(sur.fond, DOWN, buff=0.25)
        self.play(GrowFromEdge(sur.batons, DOWN), FadeIn(sur.etiq, scale=1.4), FadeIn(v1, scale=1.3), run_time=0.6)
        self.au_mot("Ou le streaming")
        self.play(FadeIn(ris.titre, scale=1.4), LaggedStart(*[GrowFromEdge(b, DOWN) for b in ris.batons],
                                                                     lag_ratio=0.15),
                  FadeIn(ris.etiq), run_time=0.8)
        self.au_mot("850 euros")
        v2 = self.calcul([("E = 850 €", RISQUE)], fs + 4)
        v3 = self.calcul([("σ = 750 €", RISQUE)], fs + 4)
        VGroup(v2, v3).arrange(RIGHT, buff=0.8).next_to(ris.fond, DOWN, buff=0.25)
        self.play(FadeIn(v2, scale=1.3), run_time=0.5)
        self.au_mot("écart-type de 750")
        self.play(FadeIn(v3, scale=1.3), run_time=0.5)
        self.insister(v3, 0.25)
        self.au_mot("une fois sur deux")
        self.play(ris.batons[0].animate.set_color(ROUGE_ERREUR), Indicate(ris.etiq[0], color=ROUGE_ERREUR,
                                                                        scale_factor=1.5), run_time=0.6)
        self.au_mot("500 euros seulement")
        u2 = Text("1 fois sur 2 : 500 €", font_size=26, color=ROUGE_ERREUR, weight=BOLD)
        u2.next_to(ris.batons[0][1], RIGHT, buff=0.2)
        self.play(FadeIn(u2, shift=LEFT * 0.1), run_time=0.4)
        self.au_mot("Besoin d'argent")
        a1 = suite(self.coche(SUR, 0.26), self.t("argent tout de suite", 30, SUR), buff=0.2)
        a1.next_to(v1, DOWN, buff=0.3)
        self.play(Create(a1[0]), FadeIn(a1[1], shift=UP * 0.1), sur.fond.animate.set_stroke(SUR, 8), run_time=0.6)
        self.au_mot("Beaucoup de titres")
        a2 = suite(self.coche(RISQUE, 0.26), self.t("beaucoup de titres", 30, RISQUE), buff=0.2)
        a2.next_to(VGroup(v2, v3), DOWN, buff=0.3)
        self.play(Create(a2[0]), FadeIn(a2[1], shift=UP * 0.1), ris.fond.animate.set_stroke(RISQUE, 8), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège : la moyenne des valeurs ──────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau().tout()
        self.titre_ecran("Le piège", FadeIn(tab), FadeIn(self.niveaux(tab)))
        fs = 44
        self.au_mot("la moyenne des valeurs")
        q = self.t("La moyenne des valeurs ?", 40, ORANGE_RETENUE)
        self.gauche(q, -0.05, x=-6.3)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.5)
        l = self.calcul([("(500", WHITE), ("+", WHITE), ("800", WHITE), ("+", WHITE), ("1 000", WHITE), ("+", WHITE),
                         ("4 000)", WHITE), ("÷", WHITE), ("4", WHITE), ("=", WHITE), ("1 575 €", ROUGE_ERREUR)], fs)
        self.gauche(l, -0.95, x=-6.3, larg=11.4)
        for mot, i, j in (("500 plus", 0, None), ("800 plus", 2, 1), ("1 000 plus", 4, 3), ("4 000, divisé", 6, 5)):
            self.au_mot(mot)
            anims = [TransformFromCopy(tab.val[0][i // 2], l[i])]
            if j is not None:
                anims.append(FadeIn(l[j]))
            self.play(*anims, run_time=0.35)
        self.au_mot("divisé par 4")
        self.play(FadeIn(l[7:9], scale=1.4), run_time=0.35)
        self.au_mot("1 575")
        self.play(FadeIn(l[9]), FadeIn(l[10], scale=1.8), run_time=0.45)
        self.au_mot("Faux")
        barre = Line(l.get_left() + LEFT * 0.1, l.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        faux = self.t("Faux !", 50, ROUGE_ERREUR).next_to(l, DOWN, buff=0.35).align_to(l, LEFT)
        self.play(Create(barre), FadeIn(faux, scale=1.6), run_time=0.5)
        self.au_mot("Le tube est rare")
        rare = self.t("Le tube est rare :", 38, COUL_N[3]).next_to(faux, RIGHT, buff=0.6)
        self.play(FadeIn(rare, shift=UP * 0.1), *tab.allumer(3, [1]), run_time=0.5)
        self.au_mot("0,05.")
        p05 = self.t("0,05", 46, BLEU_CALCUL).next_to(rare, RIGHT, buff=0.2)
        self.play(TransformFromCopy(tab.val[1][3], p05), run_time=0.5)
        self.insister(p05, 0.25)
        self.attendre_voix()

    # ── 07 : défi : tous les revenus doublent ───────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)))
        tab = self.tableau().tout()
        self.play(FadeIn(tab), run_time=0.5)
        self.au_mot("passe à la radio")
        radio = VGroup(RoundedRectangle(width=1.3, height=0.85, corner_radius=0.12, fill_color="#475569",
                                        fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                       Circle(radius=0.26, fill_color="#0F172A", fill_opacity=1, stroke_color=WHITE,
                              stroke_width=2).shift(LEFT * 0.3),
                       *[Line(P(0.15, 0.2 - 0.13 * k), P(0.48, 0.2 - 0.13 * k), color=WHITE, stroke_width=2)
                         for k in range(4)],
                       Line(P(0.4, 0.42), P(0.62, 0.85), color=WHITE, stroke_width=3))
        radio.move_to(P(5.5, 0.1))
        self.play(FadeIn(radio, shift=LEFT * 0.3), Create(onde(0.7).next_to(radio, UP, buff=0.0).shift(LEFT * 0.2)),
                  run_time=0.6)
        self.au_mot("tous les revenus doublent")
        x2 = self.t("× 2", 46, ORANGE_RETENUE).next_to(tab.rect[0][4], RIGHT, buff=0.25)
        self.play(FadeIn(x2, scale=1.5), *[Indicate(tab.val[0][j], color=ORANGE_RETENUE) for j in range(4)],
                  run_time=0.7)
        self.au_mot("Quels sont")
        q1 = self.calcul([("E(2X)", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)], 52)
        q2 = self.calcul([("σ(2X)", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)], 52)
        self.gauche(q1, -0.65, x=-6.3)
        q2.next_to(q1, RIGHT, buff=1.2)
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("l'écart-type")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE)
        self.gauche(pause, -2.2, x=-6.3)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        tab = self.tableau().tout()
        self.titre_ecran("Correction", FadeIn(tab))
        fs = 46
        self.au_mot("E de 2 X")
        l1 = self.calcul([("E(2X)", WHITE), ("=", WHITE), ("2", ORANGE_RETENUE), ("×", WHITE), ("850", JAUNE_TITRE),
                          ("=", WHITE), ("1 700 €", ORANGE_RETENUE)], fs)
        self.gauche(l1, -0.4, x=-6.3)
        self.play(FadeIn(l1[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("2 fois 850")
        self.play(FadeIn(l1[2:5], scale=1.3), run_time=0.4)
        self.au_mot("1 700")
        self.play(FadeIn(l1[5]), FadeIn(l1[6], scale=1.6), run_time=0.45)
        self.au_mot("La variance")
        l2 = self.calcul([("V(2X)", WHITE), ("=", WHITE), ("4", ORANGE_RETENUE), ("×", WHITE), ("V(X)", WHITE)], fs - 6)
        self.gauche(l2, -1.4, x=-6.3)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("donc l'écart-type")
        l3 = self.calcul([("σ(2X)", WHITE), ("=", WHITE), ("2", ORANGE_RETENUE), ("×", WHITE), ("σ(X)", WHITE)], fs)
        self.gauche(l3, -2.4, x=-6.3)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.au_mot("1 500")
        r3 = self.calcul([("=", WHITE), ("1 500 €", ORANGE_RETENUE)], fs).next_to(l3, RIGHT, buff=0.2)
        self.play(FadeIn(r3, scale=1.6), run_time=0.45)
        cad = VGroup(SurroundingRectangle(l1[6], color=ORANGE_RETENUE, buff=0.1, stroke_width=4),
                     SurroundingRectangle(r3[1], color=ORANGE_RETENUE, buff=0.1, stroke_width=4))
        self.play(Create(cad), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 44
        l1 = suite(self.t("La loi :", fs, BLEU_CALCUL), self.t("des probabilités de somme 1", fs), buff=0.3)
        l2 = suite(self.t("E(X) :", fs, JAUNE_TITRE), self.t("somme des valeurs × probabilités", fs),
                   buff=0.3)
        l3 = suite(self.t("σ(X) :", fs, RISQUE), self.t("racine de la variance, le risque", fs), buff=0.3)
        l4 = suite(self.t("Pour choisir :", fs, VERT_OK), self.t("l'espérance et le risque", fs), buff=0.3)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        lignes.move_to(P(-0.7, -0.2))
        for mot, l in zip(["La loi", "L'espérance", "L'écart-type", "Pour choisir"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10, modèle proba_au_moins_un.py) ──────────

    def page_abonnement(self, voix="09-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_loi()
        self.ecran_esperance()
        self.ecran_variance()
        self.ecran_contrats()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaVaDefiTerminale(ProbaVaDefiBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
