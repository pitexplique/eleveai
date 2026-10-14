# expression_substituer.py
# EleveAI — Maths 3e — Expression littérale, épisode 2 : calculer la valeur d'une
# expression (notionId : litteral_calcul, micro : litteral_substituer), AVEC VOIX.
# Paysage ceinture VERTE ; short jumeau (ceinture blanche) :
# expression_substituer_short.py (les deux bandes de freinage, 25 m et 100 m).
#
# ⭐ 13/10/2026 : série « expression littérale » 3e, une paysage PAR MICRO + son
# short jumeau (même structure que les épisodes de 5e et de 4e).
#
# ⭐ LE DESSIN : une voiture freine et laisse une bande de freinage. d = v² ÷ 100
# (« ÷ », jamais « / ») : à 50 km/h, 25 m ; à 100 km/h, 100 m — la bande est
# 4 fois plus longue, côte à côte avec une échelle en mètres.
# Lettre JAUNE, résultat VERT, piège ORANGE (parenthèses d'un négatif, × 4),
# faux ROUGE (le tampon du contre-exemple).
#
# Écrans : 00 garde · 01 la formule de freinage · 02 vitesse doublée · 03 un
# négatif (2a − 5, a = −3) · 04 le carré d'un négatif · 05 vérifier : le
# contre-exemple (x² + 1 > 2x) · 06 défi (3x² − 2x, x = −2) + correction ·
# 07 « Ce que tu sais faire maintenant » · 08 abonnement.
#
# Voix : manim/voix/3e-expression-substituer.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/expression_substituer.py ExpressionSubstituer3e -o eleveai-maths-3e-expression-substituer --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/02-substituer/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

MOINS = "−"  # U+2212
COUL_X = JAUNE_TITRE
PAREN = ORANGE_RETENUE
CARROSSERIE = "#38BDF8"
ROUTE = "#6B7280"
TRACE = "#111827"


def P(x, y):
    return np.array([x, y, 0.0])


def voiture(x, y_sol, s=1.0, couleur=CARROSSERIE):
    """Une voiture vue de côté, tournée vers la droite ; le bas des roues en (x, y_sol)."""
    caisse = RoundedRectangle(width=1.3, height=0.34, corner_radius=0.1, fill_color=couleur,
                              fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.36))
    cabine = Polygon(P(-0.42, 0.53), P(0.22, 0.53), P(0.06, 0.8), P(-0.3, 0.8),
                     fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    vitre = Polygon(P(-0.3, 0.57), P(0.14, 0.57), P(0.03, 0.75), P(-0.24, 0.75),
                    fill_color="#E0F2FE", fill_opacity=0.9, stroke_width=0)
    phare = Circle(radius=0.05, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(P(0.6, 0.4))
    roues = VGroup(*[Circle(radius=0.14, fill_color="#1F2937", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=3).move_to(P(dx, 0.14)) for dx in (-0.38, 0.38)])
    return VGroup(caisse, cabine, vitre, phare, roues).scale(s, about_point=ORIGIN).shift(P(x, y_sol))


def route(x_g, x_d, y, h=0.6):
    """La route : une bande grise, un bord pointillé blanc."""
    r = Rectangle(width=x_d - x_g, height=h, fill_color=ROUTE, fill_opacity=1,
                  stroke_width=0).move_to(P((x_g + x_d) / 2, y))
    bord = DashedLine(P(x_g, y - h / 2 + 0.05), P(x_d, y - h / 2 + 0.05), color=WHITE,
                      stroke_width=2, dash_length=0.18)
    return VGroup(r, bord)


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


# La route de la paysage : 100 m = 8 unités, freinage à partir de X0.
X0 = -4.6
ECH = 0.08


class ExpressionSubstituer3e(Notion3e):
    nom_voix = "3e-expression-substituer"

    # ── outils ──────────────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=None):
        """Une ligne faite de morceaux (texte, couleur)."""
        if buff is None:
            buff = max(0.24, font_size * 0.0045)
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def gonfler(self, mob, f=1.5, duree=0.45):
        """Pour insister : agrandir puis rétrécir."""
        self.play(mob.animate.scale(f), run_time=duree)
        self.play(mob.animate.scale(1 / f), run_time=duree)

    def gonfler_chacun(self, mobs, f=1.5, duree=0.45):
        """Chaque morceau grossit sur place (les parenthèses ne s'écartent pas)."""
        self.play(*[m.animate.scale(f) for m in mobs], run_time=duree)
        self.play(*[m.animate.scale(1 / f) for m in mobs], run_time=duree)

    def neg(self, n, font_size, color=COUL_X):
        """« (−3) » : les parenthèses en ORANGE, le nombre dans sa couleur."""
        m = self.t(f"({MOINS}{n})", font_size, color)
        m[0].set_color(PAREN)
        m[-1].set_color(PAREN)
        return m

    def valeur(self, lettre, nombre, font_size):
        """« pour x = −3 » : la lettre et le nombre en JAUNE, le reste en blanc."""
        m = self.t(f"pour {lettre} = {nombre}", font_size, WHITE)
        m[4].set_color(COUL_X)
        m[6:].set_color(COUL_X)
        return m

    def carre(self, base, font_size, color=COUL_X, paren=False):
        """« 50² » ou « (−3)² » : la base dans sa couleur, le ² en blanc."""
        txt = f"({MOINS}{base})²" if paren else f"{base}²"
        m = self.t(txt, font_size, color)
        m[-1].set_color(WHITE)
        if paren:
            m[0].set_color(PAREN)
            m[-2].set_color(PAREN)
        return m

    def freiner(self, car, longueur, y, duree=2.0):
        """La voiture glisse de `longueur` et laisse sa trace : même rythme pour les deux."""
        trace = Line(P(X0, y), P(X0 + longueur, y), stroke_color=TRACE, stroke_width=12)
        self.play(car.animate(rate_func=rate_functions.ease_out_cubic).shift(RIGHT * longueur),
                  Create(trace, rate_func=rate_functions.ease_out_cubic), run_time=duree)
        return trace

    def mesure(self, longueur, y):
        return DoubleArrow(P(X0, y), P(X0 + longueur, y), buff=0, stroke_width=3, color=WHITE,
                           tip_length=0.18, max_tip_length_to_length_ratio=0.2)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer la valeur d'une expression", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        expr = self.ligne([("2a", WHITE), (MOINS, WHITE), ("5", WHITE)], 60).move_to(P(-0.6, 0.9))
        expr[0][1].set_color(COUL_X)
        self.play(Write(expr))
        self.au_mot("Et si la valeur")
        q = self.ligne([("Et si la valeur est", BLEU_CALCUL), ("négative", ORANGE_RETENUE), ("?", BLEU_CALCUL)], 44)
        q.move_to(P(-0.6, -0.3))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.gonfler(q[1], f=1.3)
        self.attendre_voix(marge=1.5)

    # ── 01 : la formule de freinage ─────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-formule")
        self.titre_ecran("La distance de freinage")
        y_r = 1.35
        rte = route(-5.2, 4.6, y_r)
        self.play(FadeIn(rte), run_time=0.6)
        self.au_mot("roule à v")
        car = voiture(X0, y_r - 0.22)
        vit = self.ligne([("v", COUL_X), ("km/h", WHITE)], 30, buff=0.12).move_to(P(-6.1, y_r))
        self.play(FadeIn(car, shift=RIGHT * 0.6), FadeIn(vit), run_time=1.0)
        self.au_mot("Sa distance de freinage")
        L = 25 * ECH
        trace = self.freiner(car, L, y_r - 0.1)
        fl = self.mesure(L, y_r - 0.6)
        d_lbl = self.t("d", 34).next_to(fl, DOWN, buff=0.12)
        self.play(GrowFromCenter(fl), FadeIn(d_lbl))
        self.au_mot("en mètres")
        unit = self.t("(en m)", 26, GREY_B).next_to(d_lbl, RIGHT, buff=0.15)
        self.play(FadeIn(unit))

        self.au_mot("v au carré")
        f = self.ligne([("d", WHITE), ("=", WHITE), ("v²", COUL_X), ("÷", WHITE), ("100", WHITE)], 56)
        f[2][1].set_color(WHITE)
        f.move_to(P(-0.8, -0.3))
        self.play(Write(f[0:3]))
        self.au_mot("divisé par 100")
        self.play(Write(f[3:]))
        cadre = SurroundingRectangle(f, color=BLEU_CALCUL, buff=0.2)
        self.play(Create(cadre))

        self.au_mot("À 50 kilomètres")
        v50 = self.ligne([("50", COUL_X), ("km/h", WHITE)], 30, buff=0.12).move_to(vit)
        self.play(ReplacementTransform(vit, v50))
        self.gonfler(v50[0])
        self.au_mot("50 au carré")
        l1 = self.ligne([("d", WHITE), ("=", WHITE)], 48)
        c50 = self.carre(50, 48)
        r1 = self.ligne([("÷", WHITE), ("100", WHITE)], 48)
        ligne1 = VGroup(*l1, c50, *r1).arrange(RIGHT, buff=0.24).move_to(P(-3.2, -1.45))
        self.play(FadeIn(VGroup(l1, r1)), TransformFromCopy(v50[0], c50[0:2]), FadeIn(c50[2]))
        self.au_mot("2 500")
        l2 = self.ligne([("=", WHITE), ("2 500", WHITE), ("÷", WHITE), ("100", WHITE)], 48)
        l2.next_to(ligne1, DOWN, buff=0.45).align_to(ligne1[1], LEFT)
        self.play(FadeIn(l2[0]), TransformFromCopy(c50, l2[1]), FadeIn(l2[2:]))
        self.au_mot("25 mètres")
        r = self.ligne([("=", WHITE), ("25 m", VERT_OK)], 48).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(r[0]), TransformFromCopy(l2, r[1]))
        d25 = self.t("25 m", 34, VERT_OK).move_to(d_lbl).align_to(d_lbl, LEFT)
        self.play(ReplacementTransform(d_lbl, d25), FadeOut(unit), Indicate(trace, color=VERT_OK))
        self.play(Circumscribe(r[1], color=VERT_OK))
        self.attendre_voix()

    # ── 02 : vitesse doublée ────────────────────────────────────────────────

    def ecran_double(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-double")
        self.titre_ecran("Deux fois plus vite")
        y1, y2 = 2.25, 1.0
        L25, L100 = 25 * ECH, 100 * ECH
        r1, r2 = route(-5.2, 4.6, y1), route(-5.2, 4.6, y2)
        car1 = voiture(X0 + L25, y1 - 0.22)
        tr1 = Line(P(X0, y1 - 0.1), P(X0 + L25, y1 - 0.1), stroke_color=TRACE, stroke_width=12)
        v1 = self.ligne([("50", COUL_X), ("km/h", WHITE)], 30, buff=0.12).move_to(P(-6.1, y1))
        e1 = self.t("25 m", 32, VERT_OK).move_to(P(X0 + L25 + 1.95, y1 + 0.05))
        # l'échelle en mètres, sous la deuxième route
        y_e = 0.2
        regle = VGroup(Line(P(X0, y_e), P(X0 + L100, y_e), stroke_width=3, color=GREY_B))
        for k in range(5):
            regle.add(Line(P(X0 + k * 25 * ECH, y_e - 0.1), P(X0 + k * 25 * ECH, y_e + 0.1),
                           stroke_width=3, color=GREY_B))
            regle.add(self.t(f"{25 * k}", 22, GREY_B).move_to(P(X0 + k * 25 * ECH, y_e - 0.3)))
        regle.add(self.t("m", 22, GREY_B).move_to(P(X0 + L100 + 0.45, y_e - 0.3)))
        self.play(FadeIn(VGroup(r1, r2, tr1, car1, v1, e1, regle)), run_time=0.8)

        self.au_mot("à 100 kilomètres")
        v2 = self.ligne([("100", COUL_X), ("km/h", WHITE)], 30, buff=0.12).move_to(P(-6.1, y2))
        car2 = voiture(X0, y2 - 0.22)
        self.play(FadeIn(car2, shift=RIGHT * 0.6), FadeIn(v2), run_time=1.0)
        self.au_mot("100 au carré")
        l1 = self.ligne([("d", WHITE), ("=", WHITE)], 48)
        c100 = self.carre(100, 48)
        rr = self.ligne([("÷", WHITE), ("100", WHITE)], 48)
        ligne1 = VGroup(*l1, c100, *rr).arrange(RIGHT, buff=0.24).move_to(P(-3.0, -0.75))
        self.play(FadeIn(VGroup(l1, rr)), TransformFromCopy(v2[0], c100[0:3]), FadeIn(c100[3]))
        self.au_mot("10 000")
        l2 = self.ligne([("=", WHITE), ("10 000", WHITE), ("÷", WHITE), ("100", WHITE)], 48)
        l2.next_to(ligne1, DOWN, buff=0.4).align_to(ligne1[1], LEFT)
        self.play(FadeIn(l2[0]), TransformFromCopy(c100, l2[1]), FadeIn(l2[2:]))
        self.au_mot("100 mètres")
        r = self.ligne([("=", WHITE), ("100 m", VERT_OK)], 48).next_to(l2, RIGHT, buff=0.3)
        tr2 = Line(P(X0, y2 - 0.1), P(X0 + L100, y2 - 0.1), stroke_color=TRACE, stroke_width=12)
        e2 = self.t("100 m", 32, VERT_OK).move_to(P(X0 + L100 + 1.95, y2 + 0.05))
        self.play(FadeIn(r[0]), TransformFromCopy(l2, r[1]),
                  car2.animate(rate_func=rate_functions.ease_out_cubic).shift(RIGHT * L100),
                  Create(tr2, rate_func=rate_functions.ease_out_cubic), run_time=2.0)
        self.play(FadeIn(e2))

        self.au_mot("La vitesse double")
        fl = Arrow(P(-6.1, y1 - 0.3), P(-6.1, y2 + 0.3), buff=0, color=ORANGE_RETENUE, stroke_width=4)
        x2 = self.t("× 2", 30, ORANGE_RETENUE).next_to(fl, RIGHT, buff=0.08)
        self.play(GrowArrow(fl), FadeIn(x2))
        self.gonfler(x2)
        self.au_mot("multipliée par 4")
        # quatre bandes de 25 m, côte à côte, sous la trace de 100 m
        y_q = y2 - 0.45
        quatre = VGroup(*[Rectangle(width=L25 - 0.04, height=0.14, stroke_width=0,
                                    fill_color=ORANGE_RETENUE if k % 2 == 0 else "#FDBA74", fill_opacity=1)
                          .move_to(P(X0 + (k + 0.5) * L25, y_q)) for k in range(4)])
        self.play(LaggedStart(*[TransformFromCopy(tr1, q) for q in quatre], lag_ratio=0.25), run_time=1.4)
        x4 = self.ligne([("25 m", VERT_OK), ("× 4", ORANGE_RETENUE), ("=", WHITE), ("100 m", VERT_OK)], 48)
        x4.next_to(l2, DOWN, buff=0.45).align_to(ligne1, LEFT)
        self.play(FadeIn(x4))
        self.gonfler(x4[1])
        self.au_mot("Le carré change tout")
        self.play(c100[3].animate.set_color(ORANGE_RETENUE))
        self.gonfler(c100[3], f=1.8)
        self.attendre_voix()

    # ── 03 : un nombre négatif ──────────────────────────────────────────────

    def ecran_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-negatif")
        self.titre_ecran("Un nombre négatif")
        self.au_mot("des parenthèses")
        regle = self.ligne([("Un négatif : toujours entre", BLEU_CALCUL), ("(   )", PAREN)], 38)
        regle.move_to(P(-0.6, 2.4))
        self.play(FadeIn(regle[0], shift=UP * 0.2), GrowFromCenter(regle[1]))
        self.gonfler(regle[1])
        self.au_mot("2 a moins 5")
        expr = self.ligne([("2a", WHITE), (MOINS, WHITE), ("5", WHITE)], 64).move_to(P(-4.2, 1.15))
        expr[0][1].set_color(COUL_X)
        self.play(Write(expr))
        self.au_mot("pour a égale moins 3")
        val = self.valeur("a", f"{MOINS}3", 50).next_to(expr, RIGHT, buff=0.8)
        self.play(FadeIn(val, shift=LEFT * 0.2))
        self.au_mot("2 fois, parenthèse")
        l1 = self.ligne([("=", WHITE), ("2", WHITE), ("×", WHITE)], 64, buff=0.3)
        n3 = self.neg(3, 64)
        fin = self.ligne([(MOINS, WHITE), ("5", WHITE)], 64, buff=0.3)
        VGroup(*l1, n3, *fin).arrange(RIGHT, buff=0.42).move_to(P(-2.0, -0.1)).align_to(expr, LEFT)
        self.play(FadeIn(l1))
        self.au_mot("parenthèse, moins 3")
        self.play(GrowFromCenter(n3[0]), GrowFromCenter(n3[-1]), TransformFromCopy(val[-2:], n3[1:3]))
        self.gonfler_chacun([n3[0], n3[-1]])
        self.au_mot(", moins 5.")
        self.play(FadeIn(fin))
        self.au_mot("Moins 6")
        prod = VGroup(l1[1], l1[2], n3)
        l2 = self.ligne([("=", WHITE), (f"{MOINS}6", BLEU_CALCUL), (MOINS, WHITE), ("5", WHITE)], 64, buff=0.42)
        l2.set_y(-1.35).align_to(l1, LEFT)
        self.play(Indicate(prod, color=BLEU_CALCUL, scale_factor=1.1))
        self.play(FadeIn(l2[0]), TransformFromCopy(prod, l2[1]), FadeIn(l2[2:]))
        self.au_mot("moins 11")
        r = self.ligne([("=", WHITE), (f"{MOINS}11", VERT_OK)], 64, buff=0.42).set_y(-2.6).align_to(l1, LEFT)
        self.play(FadeIn(r[0]), TransformFromCopy(VGroup(l2[1:]), r[1]))
        self.play(Circumscribe(r[1], color=VERT_OK))
        self.attendre_voix()

    # ── 04 : le carré d'un négatif ──────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-carre")
        self.titre_ecran("Le carré d'un négatif")
        self.au_mot("x au carré, pour")
        expr = self.t("x²", 72, COUL_X)
        expr[1].set_color(WHITE)
        val = self.valeur("x", f"{MOINS}3", 50)
        VGroup(expr, val).arrange(RIGHT, buff=0.8).move_to(P(-0.8, 2.1))
        self.play(Write(expr))
        self.play(FadeIn(val, shift=LEFT * 0.2))
        self.au_mot("parenthèse, moins 3, au carré")
        c1 = self.carre(3, 84, paren=True)
        eg = self.t("=", 84)
        haut = VGroup(eg, c1).arrange(RIGHT, buff=0.5).move_to(P(-3.0, 1.0))
        self.play(FadeIn(eg), GrowFromCenter(c1[0]), GrowFromCenter(c1[3]),
                  TransformFromCopy(val[-2:], c1[1:3]), FadeIn(c1[4]))
        self.gonfler_chacun([c1[0], c1[3]])
        self.au_mot("c'est moins 3 fois moins 3")
        c2 = VGroup(self.t("=", 64), self.neg(3, 64), self.t("×", 64), self.neg(3, 64)).arrange(RIGHT, buff=0.35)
        c2.next_to(haut, DOWN, buff=0.4).align_to(haut, LEFT)
        self.play(FadeIn(c2, shift=DOWN * 0.2))
        self.au_mot("plus 9")
        c3 = self.t("= +9", 80, VERT_OK).next_to(c2, DOWN, buff=0.4).align_to(haut, LEFT)
        self.play(TransformFromCopy(c2, c3))
        self.play(Circumscribe(c3, color=VERT_OK))
        self.au_mot("Un carré n'est jamais négatif")
        self.play(Write(self.chute("Un carré n'est jamais négatif.", color=VERT_OK, font_size=40)))
        self.gonfler(c3[1:], f=1.4)
        self.attendre_voix()

    # ── 05 : vérifier, le contre-exemple ────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifier")
        self.titre_ecran("Calculer pour vérifier")
        self.au_mot("x au carré plus 1")
        aff = self.ligne([("x² + 1", WHITE), (">", BLEU_CALCUL), ("2x", WHITE)], 50)
        aff[0][0].set_color(COUL_X)
        aff[2][1].set_color(COUL_X)
        tj = self.t("toujours ?", 36, ORANGE_RETENUE)
        bulle_txt = VGroup(aff, tj).arrange(RIGHT, buff=0.5).move_to(P(-0.6, 2.25))
        bulle = RoundedRectangle(width=bulle_txt.width + 0.7, height=bulle_txt.height + 0.45,
                                 corner_radius=0.25, stroke_color=BLEU_CALCUL, stroke_width=3).move_to(bulle_txt)
        self.play(Create(bulle), Write(aff[0]))
        self.au_mot("vaut toujours plus que")
        self.play(FadeIn(aff[1]), FadeIn(tj))
        self.au_mot("2 x.")
        self.play(Write(aff[2]))

        xl, xa, xb, xc = -6.5, -4.4, -0.5, 2.6   # bords gauches : x · x² + 1 · 2x · verdict
        self.au_mot("Pour x égale 3")
        ya = 0.8
        lx = self.t("x = 3", 42, COUL_X).move_to(P(0, ya)).align_to(P(xl, 0), LEFT)
        self.play(FadeIn(lx, shift=RIGHT * 0.2))
        self.au_mot("10 et 6")
        a = self.ligne([("3² + 1", WHITE), ("=", WHITE), ("10", BLEU_CALCUL)], 42).move_to(P(0, ya)).align_to(P(xa, 0), LEFT)
        a[0][0].set_color(COUL_X)
        b = self.ligne([("2 × 3", WHITE), ("=", WHITE), ("6", BLEU_CALCUL)], 42).move_to(P(0, ya)).align_to(P(xb, 0), LEFT)
        b[0][-1].set_color(COUL_X)
        self.play(FadeIn(a))
        self.play(FadeIn(b))
        self.au_mot("vrai")
        v = VGroup(self.t("10 > 6", 42, VERT_OK), self.coche()).arrange(RIGHT, buff=0.25).move_to(P(0, ya)).align_to(P(xc, 0), LEFT)
        self.play(FadeIn(v[0]), Create(v[1]))

        yb = -0.45
        self.au_mot("Pour x égale 1")
        lx2 = self.t("x = 1", 42, COUL_X).move_to(P(0, yb)).align_to(P(xl, 0), LEFT)
        self.play(FadeIn(lx2, shift=RIGHT * 0.2))
        self.au_mot("2 et 2")
        a2 = self.ligne([("1² + 1", WHITE), ("=", WHITE), ("2", BLEU_CALCUL)], 42).move_to(P(0, yb))
        a2[0][0].set_color(COUL_X)
        a2.align_to(a, LEFT)
        b2 = self.ligne([("2 × 1", WHITE), ("=", WHITE), ("2", BLEU_CALCUL)], 42).move_to(P(0, yb)).align_to(P(xb, 0), LEFT)
        b2[0][-1].set_color(COUL_X)
        self.play(FadeIn(a2))
        self.play(FadeIn(b2))
        self.au_mot("Égaux")
        eg = self.t("2 = 2", 42, ROUGE_ERREUR).move_to(P(0, yb)).align_to(v, LEFT)
        croix = VGroup(Line(P(-0.18, -0.18), P(0.18, 0.18)), Line(P(-0.18, 0.18), P(0.18, -0.18)))
        croix.set_stroke(ROUGE_ERREUR, 6).next_to(eg, RIGHT, buff=0.3)
        self.play(FadeIn(eg))
        self.gonfler(eg)
        self.play(Create(croix))

        self.au_mot("Un seul exemple")
        mot = self.t("FAUX : un contre-exemple suffit", 44, ROUGE_ERREUR)
        cadre = SurroundingRectangle(mot, color=ROUGE_ERREUR, buff=0.25, stroke_width=6)
        tampon = VGroup(cadre, mot).rotate(4 * DEGREES).move_to(P(-1.0, -1.95))
        self.play(FadeIn(tampon, scale=1.6), run_time=0.5)
        self.play(Indicate(VGroup(lx2, a2, b2, eg), color=ROUGE_ERREUR, scale_factor=1.05))
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def expr_defi(self, font_size):
        e = self.t(f"3x² {MOINS} 2x", font_size)
        e[1].set_color(COUL_X)
        e[5].set_color(COUL_X)
        return e

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Calcule 3 x au carré")
        expr = self.expr_defi(100)
        q = self.t("= ?", 80, BLEU_CALCUL)
        VGroup(expr, q).arrange(RIGHT, buff=0.6).move_to(P(-0.8, 1.3))
        self.play(Write(expr))
        self.play(FadeIn(q))
        self.au_mot("pour x égale moins 2")
        val = self.valeur("x", f"{MOINS}2", 52).move_to(P(-0.8, -0.3))
        self.play(FadeIn(val, shift=UP * 0.2))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        expr = self.expr_defi(56)
        val = self.valeur("x", f"{MOINS}2", 44)
        VGroup(expr, val).arrange(RIGHT, buff=0.8).move_to(P(-0.8, 2.3))
        self.add(expr, val)
        fs = 46
        xg = -5.9

        self.au_mot("x au carré :")
        a = self.ligne([("x²", WHITE), ("=", WHITE)], fs)
        a[0][0].set_color(COUL_X)
        a2 = self.carre(2, fs, paren=True)
        a3 = self.ligne([("=", WHITE), ("4", BLEU_CALCUL)], fs)
        L1 = VGroup(*a, a2, *a3).arrange(RIGHT, buff=0.3).move_to(P(0, 1.1)).align_to(P(xg, 0), LEFT)
        self.play(FadeIn(a))
        self.au_mot("parenthèse, moins 2")
        self.play(GrowFromCenter(a2[0]), GrowFromCenter(a2[3]), TransformFromCopy(val[-2:], a2[1:3]), FadeIn(a2[4]))
        self.gonfler_chacun([a2[0], a2[3]])
        self.au_mot(", 4.")
        self.play(FadeIn(a3))

        self.au_mot("3 fois 4")
        b = self.ligne([("3x²", WHITE), ("=", WHITE), ("3 × 4", WHITE)], fs)
        b[0][1].set_color(COUL_X)
        b[2][-1].set_color(BLEU_CALCUL)
        b3 = self.ligne([("=", WHITE), ("12", BLEU_CALCUL)], fs)
        L2 = VGroup(*b, *b3).arrange(RIGHT, buff=0.3).move_to(P(0, 0.05)).align_to(L1, LEFT)
        self.play(FadeIn(b[0:2]), FadeIn(b[2][0:2]), TransformFromCopy(a3[1], b[2][2]))
        self.au_mot(": 12")
        self.play(FadeIn(b3))

        self.au_mot("Moins 2 fois moins 2")
        c = self.ligne([(f"{MOINS}2x", WHITE), ("=", WHITE), (f"{MOINS}2", WHITE), ("×", WHITE)], fs)
        c[0][2].set_color(COUL_X)
        cn = self.neg(2, fs)
        c3 = self.ligne([("=", WHITE), ("+4", BLEU_CALCUL)], fs)
        L3 = VGroup(*c, cn, *c3).arrange(RIGHT, buff=0.3).move_to(P(0, -1.0)).align_to(L1, LEFT)
        self.play(FadeIn(c), FadeIn(cn))
        self.au_mot("plus 4")
        self.play(FadeIn(c3))

        self.au_mot("12 plus 4")
        d = self.ligne([("3x² − 2x", WHITE), ("=", WHITE), ("12", BLEU_CALCUL), ("+", WHITE), ("4", BLEU_CALCUL)], fs)
        d[0][1].set_color(COUL_X)
        d[0][5].set_color(COUL_X)
        d3 = self.ligne([("=", WHITE), ("16", VERT_OK)], fs)
        L4 = VGroup(*d, *d3).arrange(RIGHT, buff=0.3).move_to(P(0, -2.2)).align_to(L1, LEFT)
        self.play(FadeIn(d[0:2]), TransformFromCopy(b3[1], d[2]), FadeIn(d[3]), TransformFromCopy(c3[1], d[4]))
        self.au_mot(": 16")
        self.play(FadeIn(d3))
        self.play(Circumscribe(d3[1], color=VERT_OK))
        self.attendre_voix()

    # ── 07 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Une formule se calcule", "Une formule se calcule en remplaçant la lettre."),
            ("Un négatif se protège", "Un négatif se protège par des parenthèses."),
            ("Et un seul contre-exemple", "Un seul contre-exemple prouve qu'une affirmation est fausse."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 32)).arrange(RIGHT, buff=0.3)
                          for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.5, 0.6))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : réduire", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_formule()
        self.ecran_double()
        self.ecran_negatif()
        self.ecran_carre()
        self.ecran_verifier()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
