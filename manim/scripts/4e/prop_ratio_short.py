# prop_ratio_short.py
# EleveAI — Maths 4e — les CINQ shorts des ratios, un par micro-compétence
# (Frédéric, 02/10/2026 : « fais un short pour chaque micro »). Voix validées
# le 02/10, débit −7 : manim/voix/4e-prop-ratio-short-<nom>.json.
#   - ShortRatioSimplifier4e : le sirop 2 : 10 = 1 : 5        (prop_rapport)
#   - ShortRatioQuotients4e  : le béton 2 : 5, 40 kg → 100 kg  (prop_ratio_quotients)
#   - ShortRatioTrois4e      : 1 : 2 : 4, 12 kg de sable       (prop_ratio_trois)
#   - ShortRatioPartager4e   : 60 € selon 2 : 3 → 24 et 36     (prop_ratio_partager)
#   - ShortRatioEcart4e      : filles : garçons = 4 : 3, écart 5 (prop_ratio_defi)
# Tous renvoient à la vidéo longue (prop_ratio.py).
# ⛔ « Ta voix doit correspondre aux écrits » (Frédéric, 02/10) : chaque nombre
# dit par la voix est écrit à l'écran au moment où elle le dit (`au_mot`).
# Cadre vertical 4,5 × 8 : rien de vital au-dessus de y = 3,0 ni sous y = −2,2.
#
# Rendu (un par classe) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_ratio_short.py ShortRatioSimplifier4e -o eleveai-maths-4e-prop-ratio-short-simplifier --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e

BLEU_P = "#3B82F6"
JAUNE_P = "#FACC15"
VERT_M = "#22C55E"
GRIS_P = "#94A3B8"
BRUN = "#A16207"


class Short4e(Short6e):
    """Le short parlé de la 6e, pour la 4e, avec la barre des parts."""

    def cases(self, n, couleur, cw=0.5, h=0.5, textes=None, font_size=22):
        g = VGroup()
        for i in range(n):
            r = Rectangle(width=cw, height=h, stroke_width=2.5, color=WHITE).set_fill(couleur, opacity=0.9)
            g.add(r)
        g.arrange(RIGHT, buff=0)
        if textes:
            for r, t in zip(g, textes):
                r.add(Text(t, font_size=font_size, color=BLACK, weight=BOLD).move_to(r))
        return g

    def barrer(self, mob):
        return Cross(mob, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.9)

    def fraction(self, num, den, font_size=40, color=WHITE, color_num=None):
        """Une fraction écrite (pas de LaTeX sur ce poste) : la barre est un trait."""
        n = Text(str(num), font_size=font_size, color=color_num or color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        return VGroup(n, Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5), d).arrange(DOWN, buff=0.08)

    def ligne(self, texte, y, color=WHITE, font_size=40):
        return self.grand(texte, font_size=font_size, color=color).move_to([0, y, 0])

    def defi(self, voix, lignes, mot_final=None):
        """L'écran « À toi ! » : la question écrite, ligne par ligne, au fil de la voix."""
        self.clear()
        self.margo_bas()
        self.dire(voix)
        self.play(Write(self.ligne("À toi !", 2.5, JAUNE_TITRE, 56)))
        y = 1.4
        for mot, texte, couleur, taille in lignes:
            if mot:
                self.au_mot(mot)
            t = self.ligne(texte, y, couleur, taille)
            self.play(FadeIn(t, shift=UP * 0.15))
            y -= 0.95
        self.attendre_voix(marge=2.0)


# ═════════════════════════════════════════════════════════════════════════════
class ShortRatioSimplifier4e(Short4e):
    nom_voix = "4e-prop-ratio-short-simplifier"

    def verre(self, couleur):
        v = Polygon([-0.16, 0.22, 0], [0.16, 0.22, 0], [0.12, -0.22, 0], [-0.12, -0.22, 0],
                    stroke_width=2, color=WHITE).set_fill(couleur, opacity=0.95)
        return v

    def rang_verres(self, n_sirop, n_eau, y):
        g = VGroup(*[self.verre(VERT_M) for _ in range(n_sirop)],
                   *[self.verre("#BAE6FD") for _ in range(n_eau)]).arrange(RIGHT, buff=0.06)
        if g.width > 4.1:
            g.scale_to_fit_width(4.1)
        return g.move_to([0, y, 0])

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("Sirop de menthe", 2.6, JAUNE_TITRE, 46)))
        self.au_mot("2 verres de sirop")
        a = self.rang_verres(2, 10, 1.75)
        la = self.ligne("2 sirop pour 10 eau", 1.15, WHITE, 32)
        self.play(FadeIn(a), FadeIn(la))
        self.au_mot("Ou 1 verre")
        ou = self.ligne("ou", 0.55, GREY_B, 30)
        b = self.rang_verres(1, 5, -0.05)
        lb = self.ligne("1 sirop pour 5 eau", -0.65, WHITE, 32)
        self.play(FadeIn(ou), FadeIn(b), FadeIn(lb))
        self.au_mot("Lequel est le plus sucré")
        self.play(Write(self.ligne("Le plus sucré ?", -1.55, BLEU_CALCUL, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        a = self.ligne("2 pour 10 ?", 2.2, ROUGE_ERREUR, 64)
        self.play(FadeIn(a, scale=1.3))
        self.au_mot("plus de sirop")
        self.play(Write(self.ligne("plus de sirop…", 0.9, WHITE, 40)))
        self.au_mot("aussi plus d'eau")
        self.play(Write(self.ligne("… mais plus d'eau !", -0.2, ORANGE_RETENUE, 40)))
        self.attendre_voix(marge=0.4)

    def ecran_simplifier(self):
        self.clear()
        self.margo_bas()
        self.dire("02-simplifier")
        self.play(Write(self.ligne("On simplifie", 2.6, JAUNE_TITRE, 48)))
        self.au_mot("2 pour 10")
        r = self.ligne("2 : 10", 1.5, WHITE, 70)
        self.play(Write(r))
        self.au_mot("je divise les deux")
        d = self.ligne("÷ 2      ÷ 2", 0.55, BLEU_CALCUL, 36)
        self.play(FadeIn(d, shift=DOWN * 0.15))
        self.au_mot("J'obtiens 1 pour 5")
        s = self.ligne("1 : 5", -0.45, VERT_OK, 70)
        self.play(GrowFromCenter(s))
        self.au_mot("le même goût")
        self.play(Write(self.ligne("même goût !", -1.5, VERT_OK, 44)))
        self.attendre_voix(marge=0.4)

    def ecran_faux(self):
        self.clear()
        self.margo_bas()
        self.dire("03-faux")
        self.play(Write(self.ligne("On divise,", 2.5, VERT_OK, 46)))
        self.play(Write(self.ligne("on ne soustrait pas", 1.8, VERT_OK, 40)))
        self.au_mot("Enlever 1")
        f = VGroup(self.ligne("2 − 1 = 1", 0.7, WHITE, 40), self.ligne("10 − 1 = 9", -0.1, WHITE, 40))
        self.play(Write(f))
        self.au_mot("donne 1 pour 9")
        r = self.ligne("1 : 9", -1.1, ROUGE_ERREUR, 60)
        self.play(Write(r))
        self.au_mot("Ce n'est plus")
        self.play(Create(self.barrer(r)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_simplifier()
        self.ecran_faux()
        self.defi("04-defi", [("Simplifie", "Simplifie", WHITE, 44), ("12 pour 18", "12 : 18", BLEU_CALCUL, 80)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortRatioQuotients4e(Short4e):
    nom_voix = "4e-prop-ratio-short-quotients"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("Un béton", 2.6, JAUNE_TITRE, 48)))
        self.au_mot("ciment pour sable")
        self.play(Write(self.ligne("ciment : sable = 2 : 5", 1.6, WHITE, 38)))
        self.au_mot("J'ai 40 kilos")
        self.play(FadeIn(self.ligne("40 kg de ciment", 0.5, GREY_B, 42)))
        self.au_mot("Combien de sable")
        self.play(Write(self.ligne("Combien de sable ?", -0.7, BLEU_CALCUL, 44)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.play(Write(self.ligne("Le piège", 2.6, JAUNE_TITRE, 48)))
        self.au_mot("5 moins 2")
        self.play(Write(self.ligne("5 − 2 = 3", 1.5, WHITE, 52)))
        self.au_mot("on trouve 43")
        f = self.ligne("40 + 3 = 43 kg", 0.3, ROUGE_ERREUR, 52)
        self.play(Write(f))
        self.au_mot("C'est faux")
        self.play(Create(self.barrer(f)))
        self.play(FadeIn(self.ligne("FAUX !", -1.0, ROUGE_ERREUR, 72).rotate(0.12), scale=1.8))
        self.attendre_voix(marge=0.4)

    def ecran_part(self):
        self.clear()
        self.margo_bas()
        self.dire("02-part")
        self.play(Write(self.ligne("Des parts égales", 2.6, JAUNE_TITRE, 44)))
        self.au_mot("Ciment sur 2")
        eg = VGroup(self.fraction("ciment", 2, font_size=36, color_num=GRIS_P), Text("=", font_size=40),
                    self.fraction("sable", 5, font_size=36, color_num=JAUNE_P)).arrange(RIGHT, buff=0.25)
        eg.move_to([0, 1.5, 0])
        self.play(Write(eg))
        self.au_mot("Le ciment, c'est 2 parts")
        c = self.cases(2, GRIS_P, cw=0.75, h=0.6).move_to([0, 0.2, 0])
        self.play(FadeIn(c))
        self.au_mot("40 divisé par 2")
        self.play(Write(self.ligne("40 ÷ 2 = 20 kg", -0.75, BLEU_CALCUL, 46)))
        self.au_mot("une part vaut 20")
        self.play(*[FadeIn(Text("20", font_size=24, color=BLACK, weight=BOLD).move_to(x)) for x in c])
        self.play(Write(self.ligne("1 part = 20 kg", -1.65, VERT_OK, 42)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.play(Write(self.ligne("Le sable : 5 parts", 2.5, JAUNE_TITRE, 44)))
        s = self.cases(5, JAUNE_P, cw=0.7, h=0.6, textes=["20"] * 5).move_to([0, 1.3, 0])
        self.play(LaggedStart(*[FadeIn(x) for x in s], lag_ratio=0.2))
        self.au_mot("5 fois 20")
        r = self.ligne("5 × 20 = 100 kg", 0.1, VERT_OK, 52)
        self.play(Write(r))
        self.play(Circumscribe(r, color=VERT_OK))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_part()
        self.ecran_reponse()
        self.defi("04-defi", [("x pour y", "x : y = 3 : 4", WHITE, 52), ("y vaut 28", "y = 28", BLEU_CALCUL, 60),
                              ("Combien vaut x", "x = ?", JAUNE_TITRE, 60)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortRatioTrois4e(Short4e):
    nom_voix = "4e-prop-ratio-short-trois"

    def barre3(self, y, textes=None):
        noms = [("ciment", 1, GRIS_P), ("sable", 2, JAUNE_P), ("gravier", 4, BRUN)]
        g = VGroup()
        etiq = VGroup()
        for nom, n, c in noms:
            t = [textes] * n if textes else None
            r = self.cases(n, c, cw=0.55, h=0.55, textes=t, font_size=20)
            g.add(r)
        g.arrange(RIGHT, buff=0).move_to([0, y, 0])
        # ⚠️ Le ciment n'a qu'UNE case : son nom et celui du sable se
        # chevauchaient dessous (vu sur la planche). Ciment AU-DESSUS, les deux
        # autres en dessous.
        for i, ((nom, _, c), r) in enumerate(zip(noms, g)):
            etiq.add(Text(nom, font_size=20, color=c).next_to(r, UP if i == 0 else DOWN, buff=0.12))
        return g, etiq

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("3 nombres", 2.4, BLEU_CALCUL, 64)))
        self.au_mot("Un seul nombre connu")
        self.play(Write(self.ligne("1 seul connu", 1.0, WHITE, 52)))
        self.au_mot("les deux autres")
        self.play(Write(self.ligne("→ les 2 autres", -0.2, VERT_OK, 52)))
        self.au_mot("Regarde")
        self.play(FadeIn(self.ligne("Regarde !", -1.4, JAUNE_TITRE, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_donnee(self):
        self.clear()
        self.margo_bas()
        self.dire("01-donnee")
        self.play(Write(self.ligne("Un béton", 2.6, JAUNE_TITRE, 48)))
        self.au_mot("ciment, sable, gravier")
        self.play(Write(self.ligne("ciment : sable : gravier", 1.7, WHITE, 32)))
        self.au_mot("1 pour 2 pour 4")
        self.play(Write(self.ligne("= 1 : 2 : 4", 1.1, WHITE, 48)))
        g, e = self.barre3(0.0)
        self.play(FadeIn(g), FadeIn(e))
        self.au_mot("12 kilos de sable")
        self.play(Write(self.ligne("sable : 12 kg", -1.3, BLEU_CALCUL, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_part(self):
        self.clear()
        self.margo_bas()
        self.dire("02-part")
        self.play(Write(self.ligne("Le sable : 2 parts", 2.5, JAUNE_TITRE, 44)))
        g, e = self.barre3(1.3)
        self.add(g, e)
        self.play(Indicate(g[1], color=JAUNE_P))
        self.au_mot("12 divisé par 2")
        self.play(Write(self.ligne("12 ÷ 2 = 6 kg", 0.0, BLEU_CALCUL, 50)))
        self.au_mot("une part vaut 6")
        self.play(Write(self.ligne("1 part = 6 kg", -1.1, VERT_OK, 48)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        g, e = self.barre3(2.3, textes="6")
        self.play(FadeIn(g), FadeIn(e))
        self.au_mot("Le ciment, 1 part")
        self.play(Write(self.ligne("ciment : 6 kg", 1.0, GRIS_P, 44)))
        self.au_mot("Le gravier, 4 parts")
        self.play(Write(self.ligne("gravier : 4 × 6 = 24 kg", 0.1, "#D6A35C", 38)))
        self.au_mot("Un seul nombre")
        self.play(Write(self.ligne("1 nombre → tout !", -1.1, VERT_OK, 48)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_donnee()
        self.ecran_part()
        self.ecran_reponse()
        self.defi("04-defi", [("2 pour 3 pour 5", "ratio 2 : 3 : 5", WHITE, 46),
                              ("la troisième", "la 3e vaut 40", BLEU_CALCUL, 46),
                              ("Trouve les deux autres", "les 2 autres ?", JAUNE_TITRE, 50)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortRatioPartager4e(Short4e):
    nom_voix = "4e-prop-ratio-short-partager"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("Une cagnotte", 2.6, JAUNE_TITRE, 48)))
        self.play(GrowFromCenter(self.ligne("60 €", 1.5, WHITE, 90)))
        self.au_mot("selon le ratio 2 pour 3")
        self.play(Write(self.ligne("ratio 2 : 3", 0.3, BLEU_CALCUL, 54)))
        self.au_mot("30 euros chacun")
        self.play(Write(self.ligne("30 € chacun ?", -0.9, ORANGE_RETENUE, 52)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        f = self.ligne("30 € et 30 €", 2.3, WHITE, 52)
        self.play(Write(f))
        self.play(Create(self.barrer(f)))
        self.au_mot("c'est le ratio 1 pour 1")
        self.play(Write(self.ligne("= ratio 1 : 1", 1.2, ROUGE_ERREUR, 48)))
        self.au_mot("l'un a 2 parts")
        a = self.cases(2, BLEU_CALCUL, cw=0.7, h=0.6).move_to([0, -0.1, 0])
        self.play(FadeIn(a))
        self.au_mot("l'autre 3 parts")
        b = self.cases(3, VERT_OK, cw=0.7, h=0.6).move_to([0, -1.0, 0])
        self.play(FadeIn(b))
        self.attendre_voix(marge=0.4)

    def ecran_parts(self):
        self.clear()
        self.margo_bas()
        self.dire("02-parts")
        a = self.cases(2, BLEU_CALCUL, cw=0.7, h=0.6)
        b = self.cases(3, VERT_OK, cw=0.7, h=0.6)
        VGroup(a, b).arrange(RIGHT, buff=0).move_to([0, 2.4, 0])
        self.add(a, b)
        self.au_mot("2 plus 3")
        self.play(Write(self.ligne("2 + 3 = 5 parts", 1.2, WHITE, 48)))
        self.au_mot("60 divisé par 5")
        self.play(Write(self.ligne("60 ÷ 5 = 12 €", 0.1, BLEU_CALCUL, 52)))
        self.play(*[FadeIn(Text("12", font_size=22, color=BLACK, weight=BOLD).move_to(x)) for x in [*a, *b]])
        self.play(Write(self.ligne("1 part = 12 €", -1.0, VERT_OK, 48)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        a = self.cases(2, BLEU_CALCUL, cw=0.7, h=0.6, textes=["12"] * 2).move_to([-0.8, 2.4, 0])
        b = self.cases(3, VERT_OK, cw=0.7, h=0.6, textes=["12"] * 3).move_to([-0.45, 1.5, 0])
        a.align_to(b, LEFT)
        self.add(a, b)
        self.au_mot("2 parts : 24")
        self.play(Write(Text("24 €", font_size=36, color=BLEU_CALCUL).next_to(a, RIGHT, buff=0.3)))
        self.au_mot("3 parts : 36")
        self.play(Write(Text("36 €", font_size=36, color=VERT_OK).next_to(b, RIGHT, buff=0.3)))
        self.au_mot("Je vérifie")
        self.play(Write(self.ligne("24 + 36 = 60 €", 0.1, VERT_OK, 50)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_parts()
        self.ecran_reponse()
        self.defi("04-defi", [("Partage 90 euros", "Partage 90 €", WHITE, 54),
                              ("1 pour 2 pour 3", "ratio 1 : 2 : 3", BLEU_CALCUL, 48)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortRatioEcart4e(Short4e):
    nom_voix = "4e-prop-ratio-short-ecart"

    def barres(self, y, textes=False):
        f = self.cases(4, "#F472B6", cw=0.6, h=0.55, textes=["5"] * 4 if textes else None)
        g = self.cases(3, BLEU_CALCUL, cw=0.6, h=0.55, textes=["5"] * 3 if textes else None)
        x0 = -0.45
        f.move_to([0, y, 0]).align_to(np.array([x0, 0, 0]), LEFT)
        g.move_to([0, y - 0.75, 0]).align_to(np.array([x0, 0, 0]), LEFT)
        lf = Text("filles", font_size=24, color="#F472B6").next_to(f, LEFT, buff=0.2)
        lg = Text("garçons", font_size=24, color=BLEU_CALCUL).next_to(g, LEFT, buff=0.2)
        return f, g, VGroup(lf, lg)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("Dans un club", 2.6, JAUNE_TITRE, 46)))
        self.au_mot("filles pour garçons")
        self.play(Write(self.ligne("filles : garçons = 4 : 3", 1.6, WHITE, 34)))
        self.au_mot("5 filles de plus")
        self.play(Write(self.ligne("5 filles de plus", 0.6, BLEU_CALCUL, 44)))
        self.au_mot("Combien de membres")
        self.play(Write(self.ligne("Combien en tout ?", -0.6, ORANGE_RETENUE, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        f = self.ligne("5 garçons ?", 2.2, WHITE, 56)
        self.play(Write(f))
        self.au_mot("Non")
        self.play(Create(self.barrer(f)))
        self.au_mot("5, c'est l'écart")
        self.play(Write(self.ligne("5 = l'écart", 0.6, VERT_OK, 60)))
        self.attendre_voix(marge=0.4)

    def ecran_ecart(self):
        self.clear()
        self.margo_bas()
        self.dire("02-ecart")
        f, g, l = self.barres(2.4)
        self.play(FadeIn(f), FadeIn(g), FadeIn(l))
        self.au_mot("4 moins 3")
        cadre = SurroundingRectangle(f[3], color=JAUNE_TITRE, buff=0.05, stroke_width=4)
        self.play(Create(cadre))
        self.play(Write(self.ligne("4 − 3 = 1 part", 0.6, WHITE, 46)))
        self.au_mot("une part vaut 5")
        self.play(Write(self.ligne("1 part = 5", -0.5, VERT_OK, 56)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        f, g, l = self.barres(2.4, textes=True)
        self.add(f, g, l)
        self.au_mot("Les filles, 4 parts")
        self.play(Write(self.ligne("filles : 4 × 5 = 20", 0.75, "#F472B6", 40)))
        self.au_mot("Les garçons, 3 parts")
        self.play(Write(self.ligne("garçons : 3 × 5 = 15", -0.05, BLEU_CALCUL, 40)))
        self.au_mot("En tout, 35")
        self.play(Write(self.ligne("en tout : 35", -0.95, VERT_OK, 52)))
        self.au_mot("20 moins 15")
        self.play(FadeIn(self.ligne("20 − 15 = 5", -1.85, GREY_B, 38)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_ecart()
        self.ecran_reponse()
        self.defi("04-defi", [("2 pour 5", "ratio 2 : 5", WHITE, 52), ("l'écart vaut 21", "écart = 21", BLEU_CALCUL, 52),
                              ("Combien en tout", "Combien en tout ?", JAUNE_TITRE, 44)])
        self.ecran_renvoi("05-fin")
