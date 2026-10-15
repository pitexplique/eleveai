# decimal_calcul_short.py
# EleveAI — Maths 6e — les CINQ shorts de « Calculer avec les décimaux »,
# un par micro du coach (Frédéric, 04/10/2026 : « il y a 5 micros donc il faut
# 5 shorts »). Voix validées le 04/10, débit −10. Tous renvoient à la vidéo
# longue (decimal_calcul.py, https://youtu.be/QFQsyW-CXw8).
#
# - ShortAdditionDecimal6e : « virgule sous virgule »  (decimal_additionner)
# - ShortDixiemeDecimal6e  : « 0,1 × 0,1 = 0,2 ? »     (decimal_multiplier)
# - ShortPar01Decimal6e    : « × 0,1, plus petit »      (decimal_multiplier_par_01)
# - ShortPartageDecimal6e  : « 4,80 € pour 4 amis »     (decimal_diviser_par_entier)
# - ShortDefiDecimal6e     : « 107,3 ? impossible »     (decimal_calcul_defi)
#
# ⛔ Zone sûre du 9:16 : rien de vital au-dessus de y = 3,0 ni sous y = −2,2.
#
# Rendu (un par classe) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/decimal_calcul_short.py ShortAdditionDecimal6e -o eleveai-maths-6e-decimal-calcul-short-addition --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Short6e
from decimal_calcul import DecimalCalcul6e, ROSE_CENTIEME


class _Dessins:
    """Les dessins de la vidéo longue, repris tels quels : mêmes couleurs de rang."""

    colonnes = DecimalCalcul6e.colonnes
    ligne = DecimalCalcul6e.ligne
    allumer = DecimalCalcul6e.allumer
    piece = DecimalCalcul6e.piece
    point_sous = DecimalCalcul6e.point_sous
    barre_parts = DecimalCalcul6e.barre_parts

    def faux(self, y):
        return self.grand("FAUX !", font_size=84, color=ROUGE_ERREUR).rotate(0.15).move_to([0, y, 0])

    def a_toi(self):
        a = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])
        self.play(Write(a))


# ── 1 : additionner — virgule sous virgule ─────────────────────────────────

class ShortAdditionDecimal6e(_Dessins, Short6e):
    nom_voix = "6e-decimal-calcul-short-addition"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = self.grand("2,8 + 1,35", font_size=84, color=BLEU_CALCUL).move_to([0, 1.5, 0])
        self.play(GrowFromCenter(a))
        self.au_mot("Combien")
        q = self.grand("= ?", font_size=80, color=JAUNE_TITRE).move_to([0, 0.0, 0])
        self.play(FadeIn(q, scale=1.4))
        self.attendre_voix(marge=0.3)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        t = self.grand("Le piège", font_size=50, color=ROUGE_ERREUR).move_to([0, 2.6, 0])
        self.play(Write(t))
        r1 = Text("2,8", font_size=72)
        r2 = Text("1,35", font_size=72)
        r2.move_to([0.2, 0.6, 0])
        r1.move_to([0, 1.6, 0]).align_to(r2, RIGHT)
        plus = Text("+", font_size=64).next_to(r2, LEFT, buff=0.35)
        self.play(FadeIn(r1), FadeIn(r2), FadeIn(plus))
        self.au_mot("on ajoute des dixièmes")
        b1 = SurroundingRectangle(r1[2], color=VIOLET_ACCENT, buff=0.08)
        b2 = SurroundingRectangle(r2[3], color=ROSE_CENTIEME, buff=0.08)
        l = VGroup(self.grand("dixièmes", font_size=32, color=VIOLET_ACCENT),
                   self.grand("sur centièmes ?", font_size=32, color=ROSE_CENTIEME)).arrange(DOWN, buff=0.1)
        l.move_to([0, -0.5, 0])
        self.play(Create(b1), Create(b2), FadeIn(l))
        self.au_mot("Et c'est faux")
        self.play(FadeIn(self.faux(-1.7), scale=2.0))
        self.attendre_voix(marge=0.3)

    def table(self):
        cols, xs, bandes = self.colonnes(["Unités", ",", "Dixièmes", "Centièmes"], 0.25, 1.1, 2.4, -1.25)
        return cols, xs, bandes

    def ecran_virgule(self):
        self.clear()
        self.margo_bas()
        self.dire("02-virgule")
        cols, xs, bandes = self.table()
        self.cols, self.xs, self.bandes = cols, xs, bandes
        self.r1 = self.ligne(xs, 1.5, "2,8 ", font_size=60)
        self.r2 = self.ligne(xs, 0.5, "1,35", font_size=60)
        plus = Text("+", font_size=56).move_to([xs[0] - 0.8, 0.5, 0])
        self.trait = Line([xs[0] - 1.0, -0.05, 0], [xs[3] + 0.55, -0.05, 0], stroke_width=3)
        self.play(FadeIn(cols))
        self.play(FadeIn(self.r1), FadeIn(self.r2), FadeIn(plus), Create(self.trait))
        self.play(Circumscribe(VGroup(self.r1[1], self.r2[1]), color=JAUNE_TITRE))
        self.au_mot("Les unités sous les unités")
        self.play(self.allumer(bandes["Unités"]))
        self.au_mot("les dixièmes sous les dixièmes")
        self.play(self.allumer(bandes["Dixièmes"]))
        self.attendre_voix(marge=0.3)

    def ecran_zero(self):
        self.dire("03-zero")
        xs = self.xs
        trou = DashedVMobject(Square(side_length=0.7, color=ORANGE_RETENUE)).move_to([xs[3], 1.5, 0])
        self.play(Create(trou))
        self.au_mot("On ajoute un zéro")
        zero = Text("0", font_size=60, color=ORANGE_RETENUE).move_to([xs[3], 1.5, 0])
        self.play(FadeOut(trou), GrowFromCenter(zero))
        self.au_mot("2 virgule 8, c'est")
        self.note = self.grand("2,8 = 2,80", font_size=44, color=ORANGE_RETENUE).move_to([0, -1.85, 0])
        self.play(Write(self.note))
        self.attendre_voix(marge=0.3)

    def ecran_calcul(self):
        self.dire("04-calcul")
        xs, yr = self.xs, -0.65
        self.au_mot("0 plus 5")
        c5 = Text("5", font_size=60, color=VERT_OK).move_to([xs[3], yr, 0])
        self.play(self.allumer(self.bandes["Centièmes"]), FadeIn(c5, shift=DOWN * 0.2))
        self.au_mot("8 plus 3")
        c1 = Text("1", font_size=60, color=VERT_OK).move_to([xs[2], yr, 0])
        self.play(self.allumer(self.bandes["Dixièmes"]), FadeIn(c1, shift=DOWN * 0.2))
        self.au_mot("je retiens 1")
        ret = Text("1", font_size=30, color=ORANGE_RETENUE).move_to([xs[0] + 0.4, 2.0, 0])
        self.play(TransformFromCopy(c1, ret))
        self.au_mot("2 plus 1 plus 1")
        c4 = Text("4", font_size=60, color=VERT_OK).move_to([xs[0], yr, 0])
        self.play(self.allumer(self.bandes["Unités"]), Indicate(ret, color=ORANGE_RETENUE))
        self.play(FadeIn(c4, shift=DOWN * 0.2))
        self.au_mot("Résultat")
        vr = Text(",", font_size=60, color=JAUNE_TITRE).move_to([xs[1], yr, 0])
        fin = self.grand("= 4,15", font_size=60, color=VERT_OK).move_to([0, -1.85, 0])
        self.play(FadeIn(vr), Transform(self.note, fin))
        self.play(Circumscribe(self.note, color=VERT_OK))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        self.a_toi()
        q = self.grand("5,6 + 2,47", font_size=76, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        self.play(FadeIn(q))
        p = self.grand("= ?", font_size=72, color=JAUNE_TITRE).move_to([0, -0.5, 0])
        self.play(GrowFromCenter(p))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_virgule()
        self.ecran_zero()
        self.ecran_calcul()
        self.ecran_defi()
        self.ecran_renvoi("06-fin")


# ── 2 : multiplier — 0,1 × 0,1, la grille de 100 carreaux ──────────────────

class ShortDixiemeDecimal6e(_Dessins, Short6e):
    nom_voix = "6e-decimal-calcul-short-dixieme"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = self.grand("0,1 × 0,1", font_size=84, color=BLEU_CALCUL).move_to([0, 1.8, 0])
        self.play(GrowFromCenter(a))
        self.au_mot("Beaucoup répondent")
        b = self.grand("= 0,2 ?", font_size=72, color=ROUGE_ERREUR).move_to([0, 0.5, 0])
        self.play(FadeIn(b))
        self.au_mot("Et c'est faux")
        self.play(FadeIn(self.faux(-1.0), scale=2.0))
        self.attendre_voix(marge=0.3)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        a = self.grand("0,1 + 0,1 = 0,2", font_size=56).move_to([0, 1.8, 0])
        self.play(Write(a))
        self.au_mot("Ça, c'est une addition")
        b = self.grand("C'est une addition !", font_size=40, color=ORANGE_RETENUE).move_to([0, 0.7, 0])
        self.play(FadeIn(b))
        self.au_mot("pas une multiplication")
        c = self.grand("0,1 × 0,1 = ?", font_size=56, color=BLEU_CALCUL).move_to([0, -0.6, 0])
        self.play(Write(c))
        self.attendre_voix(marge=0.3)

    def ecran_grille(self):
        self.clear()
        self.margo_bas()
        self.dire("02-grille")
        cote, n = 0.32, 10
        ox, oy = -1.6, 2.7
        self.carreaux = VGroup()
        for col in range(n):
            for lig in range(n):
                self.carreaux.add(Square(side_length=cote, stroke_width=1.2, stroke_color=WHITE)
                                  .move_to([ox + cote * (col + 0.5), oy - cote * (lig + 0.5), 0]))
        self.play(Create(self.carreaux), run_time=1.2)
        self.au_mot("Une colonne")
        self.col0 = VGroup(*[self.carreaux[l] for l in range(n)])
        self.label = self.grand("1 colonne = 0,1", font_size=40, color=VIOLET_ACCENT).move_to([0, -1.1, 0])
        self.play(self.col0.animate.set_fill(VIOLET_ACCENT, opacity=0.8), FadeIn(self.label))
        self.attendre_voix(marge=0.3)

    def ecran_dixieme(self):
        self.dire("03-dixieme-de-dixieme")
        self.au_mot("Un dixième de cette colonne")
        c = self.carreaux[9]
        self.play(self.col0.animate.set_fill(VIOLET_ACCENT, opacity=0.25))
        self.play(c.animate.set_fill(ORANGE_RETENUE, opacity=1))
        self.play(Indicate(c, color=ORANGE_RETENUE, scale_factor=2.0))
        l2 = self.grand("1 seul carreau", font_size=40, color=ORANGE_RETENUE).move_to(self.label)
        self.play(Transform(self.label, l2))
        self.attendre_voix(marge=0.3)

    def ecran_resultat(self):
        self.dire("04-resultat")
        self.au_mot("Le carré a 100 carreaux")
        l1 = self.grand("100 carreaux", font_size=40, color=WHITE).move_to(self.label)
        self.play(Transform(self.label, l1), Indicate(self.carreaux, color=WHITE, scale_factor=1.03))
        self.au_mot("Un carreau, c'est un centième")
        l2 = self.grand("1 carreau = 0,01", font_size=44, color=VERT_OK).move_to(self.label)
        self.play(Transform(self.label, l2))
        self.play(Circumscribe(self.label, color=VERT_OK))
        self.attendre_voix(marge=0.3)

    def ecran_methode(self):
        self.clear()
        self.margo_bas()
        self.dire("05-methode")
        a = self.grand("1 × 1 = 1", font_size=64, color=BLEU_CALCUL).move_to([0, 2.2, 0])
        self.play(Write(a))
        self.au_mot("Deux chiffres")
        g = VGroup(Text("0,1", font_size=64), Text("×", font_size=64), Text("0,1", font_size=64))
        g.arrange(RIGHT, buff=0.25).move_to([0, 0.9, 0])
        self.play(FadeIn(g))
        d = VGroup(self.point_sous(g[0][2]), self.point_sous(g[2][2]))
        self.play(FadeIn(d, scale=2))
        self.au_mot("0 virgule 01")
        r = Text("= 0,01", font_size=80, color=VERT_OK).move_to([0, -0.6, 0])
        self.play(GrowFromCenter(r))
        # r : « = » « 0 » « , » « 0 » « 1 »
        self.play(FadeIn(VGroup(self.point_sous(r[3]), self.point_sous(r[4])), scale=2))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("06-defi")
        self.a_toi()
        q = self.grand("0,2 × 0,3", font_size=80, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        self.play(FadeIn(q))
        p = self.grand("= ?", font_size=72, color=JAUNE_TITRE).move_to([0, -0.5, 0])
        self.play(GrowFromCenter(p))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_grille()
        self.ecran_dixieme()
        self.ecran_resultat()
        self.ecran_methode()
        self.ecran_defi()
        self.ecran_renvoi("07-fin")


# ── 3 : multiplier par 0,1 — ça rend plus petit ────────────────────────────

class ShortPar01Decimal6e(_Dessins, Short6e):
    nom_voix = "6e-decimal-calcul-short-01"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = VGroup(self.grand("Multiplier,", font_size=48, color=JAUNE_TITRE),
                   self.grand("plus grand ?", font_size=48, color=JAUNE_TITRE)).arrange(DOWN, buff=0.15)
        a.move_to([0, 2.2, 0])
        self.play(Write(a))
        self.au_mot("combien font")
        b = self.grand("250 × 0,1", font_size=84, color=BLEU_CALCUL).move_to([0, 0.5, 0])
        self.play(GrowFromCenter(b))
        q = self.grand("= ?", font_size=72, color=JAUNE_TITRE).move_to([0, -0.9, 0])
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.3)

    def ecran_sens(self):
        self.clear()
        self.margo_bas()
        self.dire("01-sens")
        a = self.grand("0,1 = 1 dixième", font_size=52, color=VIOLET_ACCENT).move_to([0, 2.0, 0])
        self.play(Write(a))
        self.au_mot("250 fois 0 virgule 1")
        b = VGroup(self.grand("250 × 0,1", font_size=56, color=BLEU_CALCUL),
                   self.grand("= un dixième", font_size=44),
                   self.grand("de 250", font_size=44)).arrange(DOWN, buff=0.2)
        b.move_to([0, 0.0, 0])
        self.play(FadeIn(b, shift=UP * 0.2))
        self.attendre_voix(marge=0.3)

    def ecran_partage(self):
        self.clear()
        self.margo_bas()
        self.dire("02-partage")
        tot = self.grand("250", font_size=56, color=BLEU_CALCUL).move_to([0, 2.4, 0])
        barre = self.barre_parts(10, 0, largeur=4.0, hauteur=0.8, centre=[0, 1.5, 0])
        self.play(FadeIn(tot), Create(barre))
        self.play(LaggedStart(*[r.animate.set_fill(BLEU_CALCUL, opacity=0.35) for r in barre], lag_ratio=0.08))
        self.au_mot("Une part")
        self.play(barre[0].animate.set_fill(ORANGE_RETENUE, opacity=1))
        l = self.grand("25", font_size=44, color=ORANGE_RETENUE).next_to(barre[0], DOWN, buff=0.25)
        self.play(FadeIn(l, shift=UP * 0.2))
        r = self.grand("250 ÷ 10 = 25", font_size=56, color=VERT_OK).move_to([0, -0.6, 0])
        self.play(Write(r))
        self.attendre_voix(marge=0.3)

    def ecran_tableau(self):
        self.clear()
        self.margo_bas()
        self.dire("03-tableau")
        ent, cases, xs = self.tableau_num(["Centaines", "Dizaines", "Unités"], y_ent=2.2, y_case=1.3,
                                          largeur=1.35, font_ent=22)
        ch = VGroup(*[Text(c, font_size=60).move_to([x, 1.3, 0]) for x, c in zip(xs, "250")])
        self.play(FadeIn(ent), Create(cases), FadeIn(ch))
        self.au_mot("chaque chiffre recule")
        fl = VGroup(*[CurvedArrow([xs[i] + 0.15, 0.6, 0], [xs[i + 1] - 0.15, 0.6, 0], angle=PI / 2.5,
                                  color=ORANGE_RETENUE) for i in (0, 1)])
        self.play(Create(fl))
        self.play(ch[0].animate.move_to([xs[1], 1.3, 0]), ch[1].animate.move_to([xs[2], 1.3, 0]),
                  FadeOut(ch[2], shift=RIGHT * 0.6), run_time=1.2)
        self.au_mot("250 devient 25")
        r = self.grand("250 → 25", font_size=64, color=VERT_OK).move_to([0, -0.6, 0])
        self.play(FadeOut(fl), Write(r))
        self.attendre_voix(marge=0.3)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("04-regle")
        r = VGroup(self.grand("× 0,1", font_size=72, color=BLEU_CALCUL),
                   self.grand("c'est", font_size=40),
                   self.grand("÷ 10", font_size=72, color=BLEU_CALCUL)).arrange(DOWN, buff=0.2)
        r.move_to([0, 1.4, 0])
        self.play(Write(r))
        self.play(Create(SurroundingRectangle(r, color=VERT_OK, buff=0.2)))
        self.au_mot("Le résultat est plus petit")
        p = self.grand("plus PETIT !", font_size=60, color=ROUGE_ERREUR).move_to([0, -1.1, 0])
        self.play(FadeIn(p, scale=1.4))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        self.a_toi()
        q = self.grand("40 × 0,01", font_size=80, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        self.play(FadeIn(q))
        p = self.grand("= ?", font_size=72, color=JAUNE_TITRE).move_to([0, -0.5, 0])
        self.play(GrowFromCenter(p))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_sens()
        self.ecran_partage()
        self.ecran_tableau()
        self.ecran_regle()
        self.ecran_defi()
        self.ecran_renvoi("06-fin")


# ── 4 : diviser — 4,80 € pour 4 amis ───────────────────────────────────────

XS_AMIS = [-1.65, -0.55, 0.55, 1.65]


class ShortPartageDecimal6e(_Dessins, Short6e):
    nom_voix = "6e-decimal-calcul-short-partage"

    def ami(self, x, y=-1.55, couleur=BLEU_CALCUL):
        tete = Circle(radius=0.17, color=couleur, fill_opacity=0.4, stroke_width=3).move_to([x, y + 0.42, 0])
        corps = Line([x, y + 0.25, 0], [x, y - 0.2, 0], color=couleur, stroke_width=4)
        bras = Line([x - 0.25, y + 0.1, 0], [x + 0.25, y + 0.1, 0], color=couleur, stroke_width=4)
        jambes = VGroup(Line([x, y - 0.2, 0], [x - 0.18, y - 0.5, 0], color=couleur, stroke_width=4),
                        Line([x, y - 0.2, 0], [x + 0.18, y - 0.5, 0], color=couleur, stroke_width=4))
        return VGroup(tete, corps, bras, jambes)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = self.grand("4,80 €", font_size=96, color=BLEU_CALCUL).move_to([0, 2.1, 0])
        self.play(GrowFromCenter(a))
        amis = VGroup(*[self.ami(x, y=0.4) for x in XS_AMIS])
        l = self.grand("4 amis", font_size=44).move_to([0, -0.6, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in amis], lag_ratio=0.15), FadeIn(l))
        self.au_mot("Combien pour chacun")
        q = self.grand("Chacun ?", font_size=56, color=JAUNE_TITRE).move_to([0, -1.6, 0])
        self.play(Write(q))
        self.attendre_voix(marge=0.3)

    def ecran_pieces(self):
        self.clear()
        self.margo_bas()
        self.dire("01-pieces")
        self.titre = self.grand("4,80 €", font_size=52, color=BLEU_CALCUL).move_to([0, 2.65, 0])
        self.play(FadeIn(self.titre))
        self.au_mot("4 pièces de 1 euro")
        self.euros = VGroup(*[self.piece("1 €", 0.32, JAUNE_TITRE).move_to([x, 1.8, 0]) for x in (-1.5, -0.5, 0.5, 1.5)])
        self.play(LaggedStart(*[GrowFromCenter(p) for p in self.euros], lag_ratio=0.12))
        self.au_mot("8 pièces de 10 centimes")
        self.dix = VGroup(*[self.piece("10 c", 0.22, ORANGE_RETENUE).move_to([-1.75 + 0.5 * k, 1.0, 0]) for k in range(8)])
        self.play(LaggedStart(*[GrowFromCenter(p) for p in self.dix], lag_ratio=0.08))
        self.note = self.grand("4 € + 80 c", font_size=40).move_to([0, 0.3, 0])
        self.play(FadeIn(self.note))
        self.attendre_voix(marge=0.3)

    def ecran_euros(self):
        self.dire("02-euros")
        amis = VGroup(*[self.ami(x) for x in XS_AMIS])
        self.play(FadeOut(self.note), LaggedStart(*[FadeIn(m) for m in amis], lag_ratio=0.1))
        self.au_mot("4 pièces pour 4 amis")
        self.play(*[p.animate.move_to([x, -0.1, 0]) for p, x in zip(self.euros, XS_AMIS)], run_time=1.2)
        self.au_mot("1 euro chacun")
        self.note = self.grand("1 € chacun", font_size=44, color=JAUNE_TITRE).move_to([0, 1.85, 0])
        self.play(FadeIn(self.note))
        self.attendre_voix(marge=0.3)

    def ecran_centimes(self):
        self.dire("03-centimes")
        self.au_mot("8 pièces pour 4 amis")
        anims = []
        for k, p in enumerate(self.dix):
            x = XS_AMIS[k // 2] + (-0.22 if k % 2 == 0 else 0.22)
            anims.append(p.animate.move_to([x, -0.62, 0]))
        self.play(*anims, run_time=1.4)
        self.au_mot("2 pièces chacun")
        n = self.grand("+ 20 c chacun", font_size=44, color=ORANGE_RETENUE).move_to([0, 1.05, 0])
        self.play(FadeIn(n))
        self.attendre_voix(marge=0.3)

    def ecran_resultat(self):
        self.clear()
        self.margo_bas()
        self.dire("04-resultat")
        a = VGroup(self.grand("1,20 €", font_size=96, color=VERT_OK),
                   self.grand("chacun", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.15)
        a.move_to([0, 2.0, 0])
        self.play(GrowFromCenter(a))
        self.au_mot("On écrit")
        self.r = self.grand("4,8 ÷ 4 = 1,2", font_size=60, color=BLEU_CALCUL).move_to([0, 0.2, 0])
        self.play(Write(self.r))
        self.attendre_voix(marge=0.3)

    def ecran_verif(self):
        self.dire("05-verif")
        v = self.grand("1,2 × 4 = 4,8", font_size=52, color=VERT_OK).move_to([-0.25, -1.2, 0])
        self.play(Write(v))
        self.play(Create(self.coche().next_to(v, RIGHT, buff=0.15)))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("06-defi")
        self.a_toi()
        q = self.grand("6,3 ÷ 3", font_size=84, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        self.play(FadeIn(q))
        p = self.grand("= ?", font_size=72, color=JAUNE_TITRE).move_to([0, -0.5, 0])
        self.play(GrowFromCenter(p))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_pieces()
        self.ecran_euros()
        self.ecran_centimes()
        self.ecran_resultat()
        self.ecran_verif()
        self.ecran_defi()
        self.ecran_renvoi("07-fin")


# ── 5 : défi — l'ordre de grandeur démasque 107,3 ──────────────────────────

class ShortDefiDecimal6e(_Dessins, Short6e):
    nom_voix = "6e-decimal-calcul-short-defi"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        copie = Rectangle(width=4.1, height=1.3, fill_color=WHITE, fill_opacity=0.95, stroke_width=0)
        copie.move_to([0, 1.9, 0])
        calc = Text("3,7 × 2,9 =", font_size=40, color="#1E3A8A").move_to([0, 2.15, 0])
        rep = Text("107,3", font_size=48, color="#1E3A8A").move_to([0, 1.6, 0])
        self.play(FadeIn(copie), Write(calc))
        self.au_mot("Il trouve")
        self.play(Write(rep))
        self.au_mot("Sans poser le calcul")
        q = VGroup(self.grand("Sans poser le calcul,", font_size=36, color=JAUNE_TITRE),
                   self.grand("c'est possible ?", font_size=48, color=JAUNE_TITRE)).arrange(DOWN, buff=0.2)
        q.move_to([0, -0.4, 0])
        self.play(Write(q))
        self.attendre_voix(marge=0.3)

    def ecran_arrondir(self):
        self.clear()
        self.margo_bas()
        self.dire("01-arrondir")
        t = self.grand("On arrondit", font_size=52, color=JAUNE_TITRE).move_to([0, 2.5, 0])
        self.play(Write(t))
        self.au_mot("3 virgule 7")
        a = self.grand("3,7 → 4", font_size=64, color=BLEU_CALCUL).move_to([0, 1.4, 0])
        self.play(Write(a))
        self.au_mot("2 virgule 9")
        b = self.grand("2,9 → 3", font_size=64, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        self.play(Write(b))
        self.attendre_voix(marge=0.3)

    def ecran_ordre(self):
        self.dire("02-ordre")
        c = self.grand("4 × 3 = 12", font_size=64, color=VERT_OK).move_to([0, -0.85, 0])
        self.play(Write(c))
        self.au_mot("proche de 12")
        d = self.grand("résultat ≈ 12", font_size=44, color=VERT_OK).move_to([0, -1.85, 0])
        self.play(FadeIn(d))
        self.attendre_voix(marge=0.3)

    def ecran_verdict(self):
        self.clear()
        self.margo_bas()
        self.dire("03-verdict")
        a = self.grand("107,3", font_size=100, color=ROUGE_ERREUR).move_to([0, 2.0, 0])
        self.play(FadeIn(a))
        l = self.grand("beaucoup trop grand", font_size=40, color=ROUGE_ERREUR).move_to([0, 0.9, 0])
        self.play(FadeIn(l))
        self.au_mot("C'est faux")
        self.play(Create(Cross(a, stroke_color=ROUGE_ERREUR, stroke_width=8)))
        self.au_mot("La virgule est mal placée")
        v = VGroup(self.grand("La virgule", font_size=44, color=ORANGE_RETENUE),
                   self.grand("est mal placée", font_size=44, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.15)
        v.move_to([0, -0.7, 0])
        self.play(Write(v))
        self.attendre_voix(marge=0.3)

    def ecran_correct(self):
        self.clear()
        self.margo_bas()
        self.dire("04-correct")
        a = self.grand("3,7 × 2,9", font_size=64, color=BLEU_CALCUL).move_to([0, 2.1, 0])
        b = self.grand("= 10,73", font_size=80, color=VERT_OK).move_to([0, 0.8, 0])
        self.play(FadeIn(a), GrowFromCenter(b))
        self.au_mot("Tout près de 12")
        c = self.grand("tout près de 12", font_size=44, color=VERT_OK).move_to([-0.2, -0.6, 0])
        self.play(FadeIn(c))
        self.play(Create(self.coche().next_to(c, RIGHT, buff=0.15)))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        self.a_toi()
        q = self.grand("4,9 × 5,1", font_size=76, color=BLEU_CALCUL).move_to([0, 1.3, 0])
        self.play(FadeIn(q))
        self.au_mot("environ")
        boites = VGroup()
        for t in ("2,5", "25", "250"):
            txt = Text(t, font_size=48)
            boites.add(VGroup(SurroundingRectangle(txt, color=JAUNE_TITRE, buff=0.18), txt))
        boites.arrange(RIGHT, buff=0.3).move_to([0, -0.1, 0])
        e = self.grand("environ ?", font_size=48, color=JAUNE_TITRE).move_to([0, -1.4, 0])
        self.play(LaggedStart(*[FadeIn(b, scale=0.7) for b in boites], lag_ratio=0.3), FadeIn(e))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_arrondir()
        self.ecran_ordre()
        self.ecran_verdict()
        self.ecran_correct()
        self.ecran_defi()
        self.ecran_renvoi("06-fin")
