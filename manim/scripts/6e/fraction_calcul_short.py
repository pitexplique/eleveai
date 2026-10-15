# fraction_calcul_short.py
# EleveAI — Maths 6e — les QUATRE shorts de « Calculer avec les fractions »,
# un par micro du coach. Voix validées par Frédéric le 05/10/2026, débit −10.
# Tous renvoient à la vidéo longue (fraction_calcul.py).
#
# - ShortQuantiteFraction6e    : « les 2/3 de 18 bonbons »   (fraction_quantite)
# - ShortAdditionnerFraction6e : « 1/2 + 1/3 = 2/5 ? »       (fraction_additionner)
# - ShortMultiplierFraction6e  : « 3 × 2/5 = 6/15 ? »        (fraction_multiplier_entier)
# - ShortDefiFraction6e        : « le gâteau de Leïla et Léo » (fraction_calcul_defi)
#
# ⛔ Zone sûre du 9:16 : rien de vital au-dessus de y = 3,0 ni sous y = −2,2.
#
# Rendu (un par classe) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/fraction_calcul_short.py ShortQuantiteFraction6e -o eleveai-maths-6e-fraction-calcul-short-quantite --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_bases import _Fractions
from gabarit_sixieme import Short6e
from fraction_calcul import FractionCalcul6e

ROSE = "#F472B6"


class _Dessins(_Fractions):
    """Les dessins de la vidéo longue, repris tels quels."""

    expr = FractionCalcul6e.expr

    def ligne(self, items, font_size=56, color=WHITE, y=0.0, largeur=3.9):
        """Une ligne de calcul centrée, bornée à la largeur du cadre vertical."""
        g = self.expr(items, font_size=font_size, color=color)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g.move_to([0, y, 0])

    def faux(self, y):
        return self.grand("FAUX !", font_size=68, color=ROUGE_ERREUR).rotate(0.15).move_to([0, y, 0])

    def a_toi(self):
        a = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])
        self.play(Write(a))

    def defi(self, items, voix="05-defi"):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        self.a_toi()
        q = self.ligne(items, font_size=64, color=BLEU_CALCUL, y=0.9)
        self.play(FadeIn(q))
        p = self.grand("= ?", font_size=72, color=JAUNE_TITRE).move_to([0, -0.6, 0])
        self.play(GrowFromCenter(p))
        self.attendre_voix(marge=2.0)


# ── 1 : une fraction d'un nombre — les 2/3 de 18 bonbons ───────────────────

class ShortQuantiteFraction6e(_Dessins, Short6e):
    nom_voix = "6e-fraction-calcul-short-quantite"

    def bonbons(self, y):
        """3 rangées de 6 : une rangée = un tiers."""
        g = VGroup()
        for r in range(3):
            g.add(VGroup(*[Circle(radius=0.2, color=WHITE, stroke_width=2, fill_color=ROSE, fill_opacity=0.9)
                           .move_to([-1.5 + 0.6 * c, -0.55 * r, 0]) for c in range(6)]))
        return g.move_to([0, y, 0])

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        b = self.bonbons(2.0)
        l = self.grand("18 bonbons", font_size=44).move_to([0, 0.95, 0])
        self.play(LaggedStart(*[GrowFromCenter(x) for r in b for x in r], lag_ratio=0.03), FadeIn(l))
        self.au_mot("Tu en donnes les 2 tiers")
        q = self.ligne(["Tu donnes les", (2, 3, JAUNE_TITRE)], font_size=44, y=-0.2)
        self.play(FadeIn(q))
        self.au_mot("Combien")
        c = self.grand("Combien ?", font_size=60, color=JAUNE_TITRE).move_to([0, -1.5, 0])
        self.play(GrowFromCenter(c))
        self.attendre_voix(marge=0.3)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        t = self.grand("Le piège", font_size=50, color=ROUGE_ERREUR).move_to([0, 2.6, 0])
        self.play(Write(t))
        self.au_mot("18 divisé par 2")
        a = self.grand("18 ÷ 2 = 9", font_size=60).move_to([0, 1.5, 0])
        self.play(Write(a))
        self.au_mot("fois 3")
        b = self.grand("9 × 3 = 27", font_size=60).move_to([0, 0.5, 0])
        self.play(Write(b))
        self.au_mot("Plus que tes 18")
        c = self.grand("27 > 18 bonbons !", font_size=48, color=ORANGE_RETENUE).move_to([0, -0.5, 0])
        self.play(FadeIn(c))
        self.au_mot("C'est faux")
        self.play(FadeIn(self.faux(-1.6), scale=2.0))
        self.attendre_voix(marge=0.3)

    def ecran_diviser(self):
        self.clear()
        self.margo_bas()
        self.dire("02-diviser")
        f = self.fraction(2, 3, font_size=52).move_to([0, 2.45, 0])
        self.play(FadeIn(f))
        self.b = self.bonbons(0.6)
        self.play(FadeIn(self.b))
        self.au_mot("le nombre du bas")
        self.play(f[2].animate.set_color(VIOLET_ACCENT), *[r.animate.shift(DOWN * 0.18 * i) for i, r in enumerate(self.b)])
        self.au_mot("18 divisé par 3")
        self.note = self.grand("18 ÷ 3 = 6", font_size=56, color=VIOLET_ACCENT).move_to([0, -0.95, 0])
        self.play(Write(self.note))
        self.au_mot("Un tiers, c'est 6")
        self.play(Indicate(self.b[0], color=VIOLET_ACCENT))
        u = self.ligne([(1, 3, VIOLET_ACCENT), ("= 6 bonbons", VIOLET_ACCENT)], font_size=44, y=-1.85)
        self.play(FadeIn(u))
        self.f = f
        self.u = u
        self.attendre_voix(marge=0.3)

    def ecran_multiplier(self):
        self.dire("03-multiplier")
        self.au_mot("le nombre du haut")
        self.play(self.f[0].animate.set_color(ORANGE_RETENUE), FadeOut(self.u))
        self.play(*[c.animate.set_fill(ORANGE_RETENUE, opacity=1) for r in self.b[:2] for c in r])
        self.au_mot("2 fois 6")
        m = self.grand("2 × 6 = 12", font_size=56, color=ORANGE_RETENUE).move_to(self.note)
        self.play(Transform(self.note, m))
        self.au_mot("Tu donnes 12")
        r = self.ligne([(2, 3, VERT_OK), ("de 18 = 12", VERT_OK)], font_size=52, y=-1.75)
        self.play(GrowFromCenter(r))
        self.attendre_voix(marge=0.3)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        f = self.fraction("haut", "bas", font_size=64).move_to([0, 1.7, 0])
        self.play(FadeIn(f))
        self.au_mot("Je divise par le bas")
        a = self.grand("1. ÷ par le bas", font_size=52, color=VIOLET_ACCENT).move_to([0, 0.0, 0])
        self.play(f[2].animate.set_color(VIOLET_ACCENT), Write(a))
        self.au_mot("Puis je multiplie")
        b = self.grand("2. × par le haut", font_size=52, color=ORANGE_RETENUE).move_to([0, -1.0, 0])
        self.play(f[0].animate.set_color(ORANGE_RETENUE), Write(b))
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_diviser()
        self.ecran_multiplier()
        self.ecran_retenir()
        self.defi([(3, 4), "de 24"])
        self.ecran_renvoi("06-fin")


# ── 2 : additionner — 1/2 + 1/3 n'est pas 2/5 ──────────────────────────────

class ShortAdditionnerFraction6e(_Dessins, Short6e):
    nom_voix = "6e-fraction-calcul-short-additionner"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = self.ligne([(1, 2), "+", (1, 3)], font_size=80, color=BLEU_CALCUL, y=1.6)
        self.play(GrowFromCenter(a))
        self.au_mot("Ça fait 2 cinquièmes")
        b = self.ligne(["=", (2, 5), "?"], font_size=80, color=ROUGE_ERREUR, y=-0.2)
        self.play(FadeIn(b, scale=1.3))
        self.attendre_voix(marge=0.3)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.au_mot("Regarde")
        b1 = self.barre_parts(2, 1, largeur=3.4, hauteur=0.6, centre=[0.3, 2.3, 0], couleur=BLEU_CALCUL)
        b2 = self.barre_parts(5, 2, largeur=3.4, hauteur=0.6, centre=[0.3, 1.4, 0], couleur=ROUGE_ERREUR)
        l1 = self.fraction(1, 2, font_size=30, color=BLEU_CALCUL).next_to(b1, LEFT, buff=0.15)
        l2 = self.fraction(2, 5, font_size=30, color=ROUGE_ERREUR).next_to(b2, LEFT, buff=0.15)
        self.play(FadeIn(b1), FadeIn(l1))
        self.play(FadeIn(b2), FadeIn(l2))
        self.au_mot("c'est moins qu'un demi")
        m = self.ligne([(2, 5, ROUGE_ERREUR), "<", (1, 2, BLEU_CALCUL)], font_size=52, y=0.45)
        self.play(Write(m))
        self.au_mot("En ajoutant")
        t = VGroup(self.grand("En ajoutant, on ne peut", font_size=34, color=ORANGE_RETENUE),
                   self.grand("pas trouver moins !", font_size=34, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.12)
        t.move_to([0, -0.75, 0])
        self.play(FadeIn(t))
        self.play(FadeIn(self.faux(-1.85), scale=2.0))
        self.attendre_voix(marge=0.3)

    def ecran_parts(self):
        self.clear()
        self.margo_bas()
        self.dire("02-parts")
        self.b1 = self.barre_parts(2, 1, largeur=3.4, hauteur=0.6, centre=[0.3, 2.2, 0], couleur=BLEU_CALCUL)
        self.b2 = self.barre_parts(3, 1, largeur=3.4, hauteur=0.6, centre=[0.3, 1.3, 0], couleur=VERT_OK)
        self.l1 = self.fraction(1, 2, font_size=30, color=BLEU_CALCUL).next_to(self.b1, LEFT, buff=0.15)
        self.l2 = self.fraction(1, 3, font_size=30, color=VERT_OK).next_to(self.b2, LEFT, buff=0.15)
        self.play(FadeIn(self.b1), FadeIn(self.l1), FadeIn(self.b2), FadeIn(self.l2))
        self.au_mot("des parts de tailles différentes")
        self.play(Indicate(self.b1[0], color=BLEU_CALCUL), Indicate(self.b2[0], color=VERT_OK))
        self.note = VGroup(self.grand("Parts de tailles", font_size=40),
                           self.grand("différentes !", font_size=40)).arrange(DOWN, buff=0.12).move_to([0, -0.2, 0])
        self.play(FadeIn(self.note))
        self.au_mot("On ne peut pas")
        n2 = self.grand("On ne peut pas les compter", font_size=32, color=ORANGE_RETENUE).move_to([0, -1.5, 0])
        self.play(FadeIn(n2))
        self.n2 = n2
        self.attendre_voix(marge=0.3)

    def ecran_sixiemes(self):
        self.dire("03-sixiemes")
        self.play(FadeOut(self.note), FadeOut(self.n2))
        self.au_mot("on coupe tout en sixièmes")
        s1 = self.barre_parts(6, 3, largeur=3.4, hauteur=0.6, centre=[0.3, 2.2, 0], couleur=BLEU_CALCUL)
        s2 = self.barre_parts(6, 2, largeur=3.4, hauteur=0.6, centre=[0.3, 1.3, 0], couleur=VERT_OK)
        self.play(FadeIn(s1), FadeOut(self.b1), FadeIn(s2), FadeOut(self.b2))
        self.au_mot("Un demi, c'est 3 sixièmes")
        e1 = self.ligne([(1, 2, BLEU_CALCUL), ("=", BLEU_CALCUL), (3, 6, BLEU_CALCUL)], font_size=48, y=0.05)
        self.play(FadeIn(e1))
        self.au_mot("Un tiers, c'est 2 sixièmes")
        e2 = self.ligne([(1, 3, VERT_OK), ("=", VERT_OK), (2, 6, VERT_OK)], font_size=48, y=-1.25)
        self.play(FadeIn(e2))
        self.attendre_voix(marge=0.3)

    def ecran_calcul(self):
        self.clear()
        self.margo_bas()
        self.dire("04-calcul")
        b = self.barre_parts(6, 0, largeur=3.6, hauteur=0.7, centre=[0, 2.2, 0])
        self.play(FadeIn(b))
        self.au_mot("3 sixièmes plus 2 sixièmes")
        self.play(*[b[i].animate.set_fill(BLEU_CALCUL, opacity=0.85) for i in range(3)])
        self.play(*[b[i].animate.set_fill(VERT_OK, opacity=0.85) for i in (3, 4)])
        a = self.ligne([(3, 6, BLEU_CALCUL), "+", (2, 6, VERT_OK)], font_size=56, y=1.05)
        self.play(Write(a))
        self.au_mot("ça fait 5 sixièmes")
        r = self.ligne(["=", (5, 6, JAUNE_TITRE)], font_size=56, y=-0.3)
        self.play(GrowFromCenter(r))
        f = self.ligne([(1, 2), "+", (1, 3), "=", (5, 6)], font_size=44, color=VERT_OK, y=-1.7)
        self.play(FadeIn(f))
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_parts()
        self.ecran_sixiemes()
        self.ecran_calcul()
        self.defi([(2, 3), "+", (1, 6)])
        self.ecran_renvoi("06-fin")


# ── 3 : multiplier par un entier — 3 × 2/5 n'est pas 6/15 ──────────────────

class ShortMultiplierFraction6e(_Dessins, Short6e):
    nom_voix = "6e-fraction-calcul-short-multiplier"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = self.ligne(["3 ×", (2, 5)], font_size=84, color=BLEU_CALCUL, y=1.6)
        self.play(GrowFromCenter(a))
        self.au_mot("Ça fait 6 quinzièmes")
        b = self.ligne(["=", (6, 15), "?"], font_size=80, color=ROUGE_ERREUR, y=-0.2)
        self.play(FadeIn(b, scale=1.3))
        self.attendre_voix(marge=0.3)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.au_mot("6 quinzièmes")
        b1 = self.barre_parts(5, 2, largeur=3.4, hauteur=0.6, centre=[0.3, 2.3, 0], couleur=BLEU_CALCUL)
        b2 = self.barre_parts(15, 6, largeur=3.4, hauteur=0.6, centre=[0.3, 1.4, 0], couleur=ROUGE_ERREUR)
        l1 = self.fraction(2, 5, font_size=30, color=BLEU_CALCUL).next_to(b1, LEFT, buff=0.15)
        l2 = self.fraction(6, 15, font_size=30, color=ROUGE_ERREUR).next_to(b2, LEFT, buff=0.15)
        self.play(FadeIn(b1), FadeIn(l1))
        self.play(FadeIn(b2), FadeIn(l2))
        self.au_mot("c'est exactement 2 cinquièmes")
        repere = DashedLine([b1[1].get_right()[0], 2.75, 0], [b1[1].get_right()[0], 0.95, 0], color=JAUNE_TITRE)
        m = self.ligne([(6, 15, ROUGE_ERREUR), "=", (2, 5, BLEU_CALCUL)], font_size=46, y=0.55)
        self.play(Create(repere), Write(m))
        self.au_mot("Prendre 3 fois plus")
        t = VGroup(self.grand("3 fois plus...", font_size=38, color=ORANGE_RETENUE),
                   self.grand("et rien gagné ?", font_size=38, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.12)
        t.move_to([0, -0.75, 0])
        self.play(FadeIn(t))
        self.au_mot("Impossible")
        self.play(FadeIn(self.faux(-1.85), scale=2.0))
        self.attendre_voix(marge=0.3)

    def ecran_ajouter(self):
        self.clear()
        self.margo_bas()
        self.dire("02-ajouter")
        a = self.ligne(["3 ×", (2, 5)], font_size=60, y=2.4)
        self.play(FadeIn(a))
        self.au_mot("c'est ajouter 3 fois")
        s = self.ligne([(2, 5, BLEU_CALCUL), "+", (2, 5, VERT_OK), "+", (2, 5, ORANGE_RETENUE)], font_size=60, y=1.2)
        self.play(Write(s), run_time=2.0)
        u1 = self.barre_parts(5, 0, largeur=3.6, hauteur=0.6, centre=[0, -0.1, 0])
        u2 = self.barre_parts(5, 0, largeur=3.6, hauteur=0.6, centre=[0, -0.9, 0])
        self.cases = list(u1) + list(u2)
        self.play(FadeIn(u1), FadeIn(u2))
        for k, c in enumerate((BLEU_CALCUL, VERT_OK, ORANGE_RETENUE)):
            self.play(self.cases[2 * k].animate.set_fill(c, opacity=0.85),
                      self.cases[2 * k + 1].animate.set_fill(c, opacity=0.85), run_time=0.45)
        self.u = VGroup(u1, u2)
        self.attendre_voix(marge=0.3)

    def ecran_compter(self):
        self.clear()
        self.margo_bas()
        self.dire("03-compter")
        self.add(self.u.move_to([0, 2.1, 0]))
        self.au_mot("2 plus 2 plus 2")
        a = self.grand("2 + 2 + 2 = 6", font_size=56, color=JAUNE_TITRE).move_to([0, 0.95, 0])
        self.play(Write(a))
        self.au_mot("Ça fait 6 cinquièmes")
        r = self.ligne(["3 ×", (2, 5), "=", (6, 5, JAUNE_TITRE)], font_size=60, y=-0.25)
        self.play(FadeIn(r))
        self.au_mot("le bas ne change pas")
        self.play(*[f[2].animate.set_color(VIOLET_ACCENT) for f in (r[1], r[3])])
        b = self.grand("le bas ne change pas", font_size=36, color=VIOLET_ACCENT).move_to([0, -1.5, 0])
        self.play(FadeIn(b))
        self.attendre_voix(marge=0.3)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        f = self.fraction("haut", "bas", font_size=64).move_to([0, 1.7, 0])
        self.play(FadeIn(f))
        self.au_mot("On multiplie le haut")
        a = self.grand("× le haut", font_size=56, color=ORANGE_RETENUE).move_to([0, 0.0, 0])
        self.play(f[0].animate.set_color(ORANGE_RETENUE), Write(a))
        self.au_mot("Le bas ne bouge pas")
        b = self.grand("le bas ne bouge pas", font_size=44, color=VIOLET_ACCENT).move_to([0, -1.0, 0])
        self.play(f[2].animate.set_color(VIOLET_ACCENT), Write(b))
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_ajouter()
        self.ecran_compter()
        self.ecran_retenir()
        self.defi(["4 ×", (2, 7)])
        self.ecran_renvoi("06-fin")


# ── 4 : défi — le gâteau de Leïla et Léo ───────────────────────────────────

class ShortDefiFraction6e(_Dessins, Short6e):
    nom_voix = "6e-fraction-calcul-short-defi"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        g = Circle(radius=1.1, color="#D97706", stroke_width=6, fill_color="#FDE68A", fill_opacity=0.9)
        g.move_to([0, 1.8, 0])
        self.play(GrowFromCenter(g))
        self.au_mot("Leïla prend")
        a = self.ligne([("Leïla :", ORANGE_RETENUE), (1, 4, ORANGE_RETENUE)], font_size=44, y=0.15)
        self.play(FadeIn(a))
        self.au_mot("Léo prend")
        b = self.ligne([("Léo :", VIOLET_ACCENT), (1, 6, VIOLET_ACCENT)], font_size=44, y=-0.85)
        self.play(FadeIn(b))
        self.au_mot("Quelle part")
        q = self.grand("Il reste quoi ?", font_size=52, color=JAUNE_TITRE).move_to([0, -1.85, 0])
        self.play(Write(q))
        self.attendre_voix(marge=0.3)

    def ecran_parts(self):
        self.clear()
        self.margo_bas()
        self.dire("01-parts")
        self.g = self.disque(12, 0, rayon=1.1, centre=[0, 1.9, 0], vide="#FDE68A")
        self.g.set_fill("#FDE68A", opacity=0.9)
        a = self.ligne([(1, 4, ORANGE_RETENUE), ("et", WHITE), (1, 6, VIOLET_ACCENT)], font_size=48, y=0.2)
        self.play(FadeIn(a))
        self.au_mot("on coupe tout le gâteau en 12")
        self.play(FadeIn(self.g))
        l = self.grand("12 parts", font_size=48, color=JAUNE_TITRE).move_to([0, -1.0, 0])
        self.play(Write(l))
        self.attendre_voix(marge=0.3)

    def ecran_pris(self):
        self.clear()
        self.margo_bas()
        self.dire("02-pris")
        self.add(self.g.scale(0.8).move_to([0, 2.25, 0]))
        self.au_mot("Un quart, c'est 3 douzièmes")
        self.play(*[self.g[i].animate.set_fill(ORANGE_RETENUE, opacity=0.95) for i in range(3)])
        a = self.ligne([(1, 4, ORANGE_RETENUE), ("=", ORANGE_RETENUE), (3, 12, ORANGE_RETENUE)], font_size=44, y=0.6)
        self.play(FadeIn(a))
        self.au_mot("Un sixième, c'est 2 douzièmes")
        self.play(*[self.g[i].animate.set_fill(VIOLET_ACCENT, opacity=0.95) for i in (3, 4)])
        b = self.ligne([(1, 6, VIOLET_ACCENT), ("=", VIOLET_ACCENT), (2, 12, VIOLET_ACCENT)], font_size=44, y=-0.55)
        self.play(FadeIn(b))
        self.au_mot("Ils ont pris")
        c = self.ligne([("3 + 2 = 5 :", JAUNE_TITRE), (5, 12, JAUNE_TITRE)], font_size=44, y=-1.75)
        self.play(Write(c))
        self.attendre_voix(marge=0.3)

    def ecran_reste(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reste")
        self.add(self.g)
        self.au_mot("Le gâteau entier")
        a = self.ligne([("entier :", WHITE), (12, 12)], font_size=40, y=0.6)
        self.play(FadeIn(a))
        self.au_mot("12 moins 5")
        b = self.ligne([(12, 12), "−", (5, 12), "=", (7, 12, VERT_OK)], font_size=44, y=-0.55)
        self.play(Write(b))
        self.au_mot("Il reste 7 douzièmes")
        self.play(*[self.g[i].animate.set_fill(VERT_OK, opacity=0.95) for i in range(5, 12)])
        c = self.ligne([("Il reste", VERT_OK), (7, 12, VERT_OK)], font_size=48, y=-1.75)
        self.play(GrowFromCenter(c))
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_parts()
        self.ecran_pris()
        self.ecran_reste()
        self.ecran_defi()
        self.ecran_renvoi("06-fin")

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        self.a_toi()
        self.au_mot("Tu prends un tiers")
        a = self.ligne([("Toi :", ORANGE_RETENUE), (1, 3, ORANGE_RETENUE)], font_size=52, y=1.3)
        self.play(FadeIn(a))
        self.au_mot("ton ami un sixième")
        b = self.ligne([("Ton ami :", VIOLET_ACCENT), (1, 6, VIOLET_ACCENT)], font_size=52, y=0.0)
        self.play(FadeIn(b))
        self.au_mot("Quelle part")
        q = self.grand("Il reste ?", font_size=64, color=JAUNE_TITRE).move_to([0, -1.3, 0])
        self.play(GrowFromCenter(q))
        self.attendre_voix(marge=2.0)
