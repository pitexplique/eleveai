# decimal_nombre_short.py
# EleveAI — Maths 6e — les deux shorts des nombres décimaux. Voix validées le 01/10/2026.
# - ShortZeroDecimal6e    : « 0,45 ou 0,5 ? » (micro decimal_comparer)
#                           manim/voix/6e-decimal-nombre-short-zero.json
# - ShortOrigineDecimal6e : « 12 cm et un petit bout » — d'où viennent les
#                           décimaux (micro decimal_lire_ecrire)
#                           manim/voix/6e-decimal-nombre-short-origine.json
# Tous deux renvoient à la vidéo longue (decimal_nombre.py).
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/decimal_nombre_short.py ShortZeroDecimal6e -o eleveai-maths-6e-decimal-nombre-short-zero --media_dir manim/scripts/6e/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/decimal_nombre_short.py ShortOrigineDecimal6e -o eleveai-maths-6e-decimal-nombre-short-origine --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e


class ShortZeroDecimal6e(Short6e):
    nom_voix = "6e-decimal-nombre-short-zero"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = self.grand("0,45", font_size=110, color=BLEU_CALCUL).move_to([0, 2.0, 0])
        ou = self.grand("ou", font_size=44).move_to([0, 0.9, 0])
        b = self.grand("0,5", font_size=110, color=BLEU_CALCUL).move_to([0, -0.2, 0])
        self.play(GrowFromCenter(a))
        self.play(FadeIn(ou), GrowFromCenter(b))
        self.au_mot("lequel est")
        q = self.grand("Le plus grand ?", font_size=46, color=JAUNE_TITRE).move_to([0, -1.6, 0])
        self.play(Write(q))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        a = self.grand("0,45 ?", font_size=100, color=ROUGE_ERREUR).move_to([0, 2.0, 0])
        self.play(FadeIn(a, scale=1.3))
        self.au_mot("Parce que 45")
        r = self.grand("« 45 > 5 »", font_size=56).move_to([0, 0.6, 0])
        self.play(Write(r))
        self.au_mot("Et c'est faux")
        f = self.grand("FAUX !", font_size=90, color=ROUGE_ERREUR).rotate(0.15).move_to([0, -1.0, 0])
        self.play(FadeIn(f, scale=2.0))
        self.attendre_voix(marge=0.4)

    def ecran_zero(self):
        self.clear()
        self.margo_bas()
        self.dire("02-zero")
        t = self.grand("L'astuce", font_size=50, color=JAUNE_TITRE).move_to([0, 2.5, 0])
        self.play(Write(t))
        # ⛔ Un « 0 » posé à côté de « 0,5 » n'avait ni la taille ni la ligne
        # de base des autres chiffres : on écrit « 0,50 » d'un bloc et on
        # n'en montre d'abord que les trois premiers caractères.
        plein = Text("0,50", font_size=110).move_to([0, 0.9, 0])
        n, zero = VGroup(plein[0], plein[1], plein[2]), plein[3].set_color(ORANGE_RETENUE)
        self.play(FadeIn(n))
        self.au_mot("0 virgule 5, c'est")
        self.play(GrowFromCenter(zero))
        self.play(Flash(zero, color=ORANGE_RETENUE, line_length=0.35))
        self.au_mot("Ça ne change rien")
        m = VGroup(self.grand("0,5 = 0,50", font_size=48, color=VERT_OK),
                   self.grand("le même nombre", font_size=36, color=VERT_OK)).arrange(DOWN, buff=0.2)
        m.move_to([0, -1.0, 0])
        self.play(FadeIn(m, shift=UP * 0.2))
        self.attendre_voix(marge=0.4)

    def ecran_compare(self):
        self.clear()
        self.margo_bas()
        self.dire("03-compare")
        l1 = VGroup(self.grand("0,50", font_size=64, color=VERT_OK),
                    self.grand("50 centièmes", font_size=34, color=VERT_OK)).arrange(DOWN, buff=0.1)
        l2 = VGroup(self.grand("0,45", font_size=64, color=ROUGE_ERREUR),
                    self.grand("45 centièmes", font_size=34, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.1)
        l1.move_to([0, 2.3, 0])
        l2.move_to([0, 0.9, 0])
        self.play(FadeIn(l1, shift=RIGHT * 0.3))
        self.play(FadeIn(l2, shift=RIGHT * 0.3))
        self.au_mot("0 virgule 5 est le plus grand")
        r = self.grand("0,5 > 0,45", font_size=80, color=VERT_OK).move_to([0, -0.8, 0])
        self.play(GrowFromCenter(r))
        self.play(Circumscribe(r, color=VERT_OK))
        self.attendre_voix(marge=0.4)

    def ecran_droite(self):
        self.clear()
        self.margo_bas()
        self.dire("04-droite")
        dr, pt = self.droite(0.4, 0.6, 4, {0.4: "0,4", 0.6: "0,6"}, longueur=3.6,
                             centre=(0, 0.6), font_size=28)
        self.play(Create(dr[0]), Create(dr[1]), FadeIn(dr[2]))
        a = self.point(pt, 0.45, "0,45", color=ROUGE_ERREUR, font_size=30)
        b = self.point(pt, 0.5, "0,5", color=VERT_OK, font_size=30, haut=False)
        b[1].shift(DOWN * 0.45)
        self.play(FadeIn(a, scale=0.5))
        self.au_mot("0 virgule 5 est à droite")
        self.play(FadeIn(b, scale=0.5))
        fl = Arrow(pt(0.45) + UP * 1.2, pt(0.55) + UP * 1.2, color=VERT_OK, buff=0)
        self.play(GrowArrow(fl))
        self.au_mot("C'est lui le plus grand")
        r = self.grand("à droite = plus grand", font_size=38, color=VERT_OK).move_to([0, -1.6, 0])
        self.play(Write(r))
        self.attendre_voix(marge=0.4)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        a = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.4, 0])
        self.play(Write(a))
        q = VGroup(self.grand("0,52", font_size=80, color=BLEU_CALCUL),
                   self.grand("ou", font_size=40),
                   self.grand("0,507", font_size=80, color=BLEU_CALCUL)).arrange(DOWN, buff=0.2)
        q.move_to([0, 0.5, 0])
        self.play(FadeIn(q))
        self.au_mot("le plus petit")
        p = self.grand("le plus PETIT ?", font_size=44, color=JAUNE_TITRE).move_to([0, -1.6, 0])
        self.play(Write(p))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_zero()
        self.ecran_compare()
        self.ecran_droite()
        self.ecran_defi()
        self.ecran_renvoi("06-fin")


class ShortOrigineDecimal6e(Short6e):
    nom_voix = "6e-decimal-nombre-short-origine"

    # la règle du short : 12 → 13 cm sur 3,6 unités, en haut du cadre
    Y0 = 0.6

    def x(self, cm):
        return -1.8 + 3.6 * (cm - 12)

    def regle(self):
        y0 = self.Y0
        fond = Rectangle(width=4.2, height=1.1, stroke_width=2, color=GREY_B,
                         fill_color=GREY_E, fill_opacity=0.6).move_to([0, y0 - 0.55, 0])
        ticks = VGroup(*[Line([self.x(c), y0, 0], [self.x(c), y0 - 0.5, 0], stroke_width=4) for c in (12, 13)])
        # ⛔ « 12 cm » sous la graduation sortait du cadre de 4,5 : le nombre
        # seul sous le trait, l'unité au milieu.
        lbl = VGroup(*[Text(str(c), font_size=30).move_to([self.x(c), y0 - 0.8, 0]) for c in (12, 13)])
        cm = Text("cm", font_size=24, color=GREY_B).move_to([0, y0 - 0.85, 0])
        return VGroup(fond, ticks, lbl, cm)

    def mm(self):
        y0 = self.Y0
        return VGroup(*[Line([self.x(12 + k / 10), y0, 0], [self.x(12 + k / 10), y0 - 0.3, 0], stroke_width=2.5)
                        for k in range(1, 10)])

    def crayon(self):
        y0 = self.Y0
        bout = self.x(12.4)
        corps = Rectangle(width=bout - 0.5 + 2.6, height=0.45, stroke_width=0,
                          fill_color=ORANGE_RETENUE, fill_opacity=1)
        corps.move_to([(-2.6 + bout - 0.5) / 2, y0 + 0.45, 0])
        pointe = Polygon([bout - 0.5, y0 + 0.67, 0], [bout - 0.5, y0 + 0.23, 0], [bout, y0 + 0.45, 0],
                         stroke_width=0, fill_color="#f5d6a0", fill_opacity=1)
        mine = Polygon([bout - 0.16, y0 + 0.52, 0], [bout - 0.16, y0 + 0.38, 0], [bout, y0 + 0.45, 0],
                       stroke_width=0, fill_color=GREY_D, fill_opacity=1)
        return VGroup(corps, pointe, mine)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(self.grand("12 cm", font_size=64, color=BLEU_CALCUL),
                   self.grand("et un petit bout", font_size=40, color=BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        t.move_to([0, 2.4, 0])
        self.play(FadeIn(t))
        self.play(FadeIn(self.regle()), FadeIn(self.crayon(), shift=RIGHT * 0.4))
        self.au_mot("Comment écrire")
        q = self.grand("Comment l'écrire ?", font_size=44, color=JAUNE_TITRE).move_to([0, -1.5, 0])
        self.play(Write(q))
        self.attendre_voix(marge=0.4)

    def ecran_coupe(self):
        self.clear()
        self.margo_bas()
        self.dire("01-coupe")
        regle, crayon = self.regle(), self.crayon()
        self.add(regle, crayon)
        t = self.grand("On coupe en 10", font_size=48, color=JAUNE_TITRE).move_to([0, 2.4, 0])
        self.play(Write(t))
        mm = self.mm()
        self.play(LaggedStart(*[Create(m) for m in mm], lag_ratio=0.15))
        self.au_mot("Chaque morceau")
        a = self.grand("1 morceau = 1 dixième", font_size=36, color=BLEU_CALCUL).move_to([0, -1.2, 0])
        self.play(FadeIn(a))
        self.au_mot("Sur ta règle")
        b = self.grand("= 1 millimètre", font_size=36, color=BLEU_CALCUL).move_to([0, -1.9, 0])
        self.play(FadeIn(b))
        self.attendre_voix(marge=0.4)

    def ecran_compte(self):
        self.clear()
        self.margo_bas()
        self.dire("02-compte")
        self.add(self.regle(), self.crayon(), self.mm())
        y0 = self.Y0
        for k in range(4):
            seg = Line([self.x(12 + k / 10) + 0.02, y0 - 0.12, 0], [self.x(12 + (k + 1) / 10) - 0.02, y0 - 0.12, 0],
                       color=VERT_OK, stroke_width=12)
            n = Text(str(k + 1), font_size=30, color=VERT_OK).move_to([self.x(12 + (k + 0.5) / 10), y0 + 1.2, 0])
            self.play(Create(seg), FadeIn(n), run_time=0.5)
        self.au_mot("Le crayon mesure")
        r = self.grand("12,4 cm", font_size=96, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(GrowFromCenter(r))
        self.play(Flash(r, color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_virgule(self):
        self.clear()
        self.margo_bas()
        self.dire("03-virgule")
        n = Text("12,4", font_size=120).move_to([0, 1.3, 0])
        self.play(FadeIn(n, scale=1.2))
        # n : 0 « 1 », 1 « 2 », 2 « , », 3 « 4 »
        self.play(n[2].animate.set_color(JAUNE_TITRE).scale(1.4), run_time=0.6)
        self.au_mot("À gauche")
        g = self.grand("12 cm entiers", font_size=34, color=BLEU_CALCUL).move_to([-0.6, -0.4, 0])
        fg = Arrow(g.get_top(), VGroup(n[0], n[1]).get_bottom(), color=BLEU_CALCUL, buff=0.1)
        self.play(VGroup(n[0], n[1]).animate.set_color(BLEU_CALCUL), FadeIn(g), GrowArrow(fg))
        self.au_mot("À droite")
        d = self.grand("4 dixièmes", font_size=34, color=VERT_OK).move_to([0.8, -1.4, 0])
        fd = Arrow(d.get_top(), n[3].get_bottom(), color=VERT_OK, buff=0.1)
        self.play(n[3].animate.set_color(VERT_OK), FadeIn(d), GrowArrow(fd))
        self.attendre_voix(marge=0.4)

    def ecran_encore(self):
        self.clear()
        self.margo_bas()
        self.dire("04-encore")
        t = self.grand("Pas assez précis ?", font_size=44, color=JAUNE_TITRE).move_to([0, 2.6, 0])
        self.play(Write(t))
        # un dixième, agrandi, recoupé en 10
        bloc = Rectangle(width=4.0, height=0.8, color=BLEU_CALCUL, fill_opacity=0.3).move_to([0, 1.2, 0])
        lb = self.grand("1 dixième", font_size=30, color=BLEU_CALCUL).next_to(bloc, DOWN, buff=0.2)
        self.play(GrowFromCenter(bloc), FadeIn(lb))
        self.au_mot("On recoupe")
        traits = VGroup(*[Line([-2.0 + 0.4 * k, 0.8, 0], [-2.0 + 0.4 * k, 1.6, 0], color=ORANGE_RETENUE, stroke_width=3)
                          for k in range(1, 10)])
        self.play(LaggedStart(*[Create(tr) for tr in traits], lag_ratio=0.12))
        self.au_mot("ce sont les centièmes")
        lc = self.grand("10 centièmes", font_size=34, color=ORANGE_RETENUE)
        lc.move_to(lb)
        self.play(Transform(lb, lc))
        self.au_mot("Les nombres décimaux, c'est ça")
        r = VGroup(self.grand("On coupe en 10,", font_size=38, color=VERT_OK),
                   self.grand("puis encore en 10", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.15)
        r.move_to([0, -1.3, 0])
        self.play(FadeIn(r, shift=UP * 0.2))
        self.attendre_voix(marge=0.4)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        a = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.4, 0])
        self.play(Write(a))
        q = VGroup(self.grand("Une gomme :", font_size=40),
                   self.grand("3 cm et 7 mm", font_size=56, color=BLEU_CALCUL)).arrange(DOWN, buff=0.25)
        q.move_to([0, 0.9, 0])
        self.play(FadeIn(q))
        self.au_mot("Comment l'écrire")
        p = self.grand("= ? cm", font_size=64, color=JAUNE_TITRE).move_to([0, -0.8, 0])
        self.play(GrowFromCenter(p))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_coupe()
        self.ecran_compte()
        self.ecran_virgule()
        self.ecran_encore()
        self.ecran_defi()
        self.ecran_renvoi("06-fin")
