# loi_normale_escalier_short.py
# EleveAI — Maths Tle — short « l'escalier devient la loi normale ».
# Ceinture NOIRE. Idée de Frédéric (01/11/2026) : la loi binomiale, dessinée en
# escalier, se lisse et devient la cloche de la loi normale (Moivre-Laplace).
#   · 00 : la planche de Galton, un clou, deux cases → deux marches de pas 2 ;
#   · 01 : LE CURSEUR n bouge, comme dans la simulation : 4, puis 16 rangées ;
#   · 02 : question-pause « avec 300 rangées ? » + compte à rebours de 3 s ;
#   · 03 : le curseur file jusqu'à 300, l'escalier se lisse, la cloche bleue
#          se pose dessus, et sa formule s'écrit ;
#   · 04 : « avec 100 rangées, quel est le pas ? » (réponse 2/√100 = 0,2) ;
#   · 05 : « Entraîne-toi sur eleveai.fr ».
# L'escalier : B(n ; 1/2) centrée réduite, marches de largeur h = 2/√n, de
# hauteur C(n, k)/2ⁿ/h (aire totale 1). Calculé en Python (lgamma).
# ⛔ Pas de LaTeX sur le poste : la formule est en Text.
#
# Voix : manim/voix/terminale-loi-normale-escalier-short.json (débit −6),
# calée par loi_normale_escalier_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/loi_normale_escalier_short.py ShortLoiNormaleEscalierTerminale -o eleveai-maths-terminale-loi-normale-escalier-short --media_dir manim/scripts/terminale/media-loi_normale-s

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.0
BLEU_NORMALE = "#60A5FA"
# le repère du graphique
X_MAX = 3.5          # x de −3,5 à 3,5
Y_MAX = 0.42         # densité de 0 à 0,42
X0, Y0 = 0.0, -0.35  # pied de l'axe des x, au centre
SX = 3.9 / (2 * X_MAX)
SY = 2.25 / Y_MAX
# le curseur (échelle logarithmique : 4 et 16 ne sont pas tassés contre 1)
Y_CURSEUR = -0.95
XC0, XC1 = -1.75, 1.75
N_MAX = 300

assert abs(2 / math.sqrt(100) - 0.2) < 1e-12


def G(x, y):
    """Un point du graphique (x en écarts-types, y en densité)."""
    return P(X0 + x * SX, Y0 + y * SY)


def binom_reduite(n):
    """Les marches : (x_k, hauteur) pour k = 0..n, B(n ; 1/2) centrée réduite."""
    h = 2 / math.sqrt(n)
    return h, [((k - n / 2) * h,
                 math.exp(math.lgamma(n + 1) - math.lgamma(k + 1) - math.lgamma(n - k + 1) - n * math.log(2)) / h)
                for k in range(n + 1)]


def escalier(n):
    """Le contour de l'escalier, fermé sur l'axe, rogné à |x| ≤ X_MAX."""
    h, marches = binom_reduite(n)
    hauts, gauche, droite = [], None, None
    for xk, yk in marches:
        a, b = max(xk - h / 2, -X_MAX), min(xk + h / 2, X_MAX)
        if a >= b:
            continue
        gauche = a if gauche is None else gauche
        droite = b
        hauts += [G(a, yk), G(b, yk)]
    # les bords tombent à pic sur l'axe (sinon, pour n = 1, un trapèze)
    pts = [G(gauche, 0)] + hauts + [G(droite, 0)]
    m = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=3, fill_color=ORANGE_RETENUE, fill_opacity=0.25)
    m.set_points_as_corners(pts + [pts[0]])
    if n <= 20:
        # les cloisons entre les cases : pour n = 1, les DEUX marches se voient
        for (_, y0), (xk, yk) in zip(marches, marches[1:]):
            a = xk - h / 2
            if -X_MAX < a < X_MAX:
                m.add(Line(G(a, 0), G(a, min(y0, yk)), stroke_width=2, color=ORANGE_RETENUE))
    return m


def phi(x):
    return math.exp(-x * x / 2) / math.sqrt(2 * math.pi)


def x_curseur(n):
    return XC0 + (XC1 - XC0) * math.log(n) / math.log(N_MAX)


class ShortLoiNormaleEscalierTerminale(MotsCales, Short6e):
    fichier_marques = "loi_normale_escalier_short_marques.json"
    nom_voix = "terminale-loi-normale-escalier-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "noire"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def cap(self, g, larg=LARGEUR_MAX):
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def insister(self, mob, k=1.4, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, *morceaux, y):
        g = VGroup(*morceaux).arrange(RIGHT, buff=0.15, aligned_edge=UP)
        return self.cap(g).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre = self.t("L'escalier et la cloche", 40, JAUNE_TITRE).move_to(P(0, 3.45))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.9))
        self.add(titre, badge)

        # ── 00 : un clou, deux cases : deux marches de pas 2 ──
        self.dire("00-accroche")
        axe = Line(G(-X_MAX, 0), G(X_MAX, 0), stroke_width=2, color=GREY_B)
        clou = Dot(G(0, 0.36), radius=0.07, color=GREY_B)
        bille = Dot(P(0, 2.35), radius=0.1, color=ORANGE_RETENUE)
        self.play(Create(axe), FadeIn(clou, scale=2), FadeIn(bille), run_time=0.5)
        self.au_mot("bille tombe")
        self.play(bille.animate.move_to(clou.get_center() + UP * 0.17), rate_func=rate_functions.ease_in_quad,
                  run_time=0.6)
        self.au_mot("à gauche")
        fl_g = Arrow(clou.get_center(), G(-1, 0.22), buff=0.12, color=BLEU_CALCUL, stroke_width=4)
        self.play(GrowArrow(fl_g), run_time=0.35)
        self.au_mot("à droite")
        fl_d = Arrow(clou.get_center(), G(1, 0.22), buff=0.12, color=BLEU_CALCUL, stroke_width=4)
        self.play(GrowArrow(fl_d), run_time=0.35)
        self.au_mot("une chance sur deux")
        chance = self.t("1 chance sur 2", 42, BLEU_CALCUL).move_to(P(0, -1.6))
        self.play(FadeIn(chance, scale=1.3), run_time=0.4)
        self.au_mot("Un seul clou")
        cases = VGroup(*[Rectangle(width=2 * SX, height=0.25 * SY, stroke_color=WHITE, stroke_width=2)
                         .move_to(G(x, 0.125)) for x in (-1, 1)])
        self.play(FadeIn(cases), run_time=0.4)
        self.au_mot("deux cases")
        self.play(bille.animate.move_to(G(-1, 0.03) + UP * 0.1), run_time=0.5)
        self.insister(cases, 1.08)
        self.au_mot("deux marches")
        marches = escalier(1)
        self.play(FadeOut(VGroup(fl_g, fl_d, bille, clou)), ReplacementTransform(cases, marches), run_time=0.6)
        self.au_mot("de pas 2")
        acc = Brace(Line(G(0.03, 0), G(1.97, 0)), DOWN, buff=0.06, color=VERT_OK)
        pas = self.t("pas = 2", 40, VERT_OK).move_to(P(0, -1.6))
        self.play(GrowFromCenter(acc), ReplacementTransform(chance, pas), run_time=0.5)
        self.insister(pas, 1.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : le curseur bouge : 4 rangées, 16 rangées ──
        self.dire("01-rangees")
        n = ValueTracker(1)
        piste = Line(P(XC0, Y_CURSEUR), P(XC1, Y_CURSEUR), stroke_width=6, color=GREY_D)
        rempli = always_redraw(lambda: Line(P(XC0, Y_CURSEUR), P(x_curseur(n.get_value()), Y_CURSEUR),
                                            stroke_width=6, color=BLEU_CALCUL))
        bouton = always_redraw(lambda: Circle(radius=0.13, fill_color=WHITE, fill_opacity=1, stroke_color=BLEU_CALCUL,
                                              stroke_width=3).move_to(P(x_curseur(n.get_value()), Y_CURSEUR)))
        self.au_mot("Ajoute des rangées")
        self.play(FadeOut(VGroup(acc, pas)), FadeIn(piste), FadeIn(rempli), FadeIn(bouton), run_time=0.5)
        escal = always_redraw(lambda: escalier(max(1, round(n.get_value()))))
        self.remove(marches)
        self.add(escal)
        self.au_mot("4 rangées")
        l4 = self.ligne(self.t("4 rangées", 34, BLEU_CALCUL), y=-1.45)
        self.play(n.animate.set_value(4), FadeIn(l4), run_time=0.8)
        self.au_mot("5 cases")
        c5 = self.t("5 cases", 34, ORANGE_RETENUE).move_to(P(0, -1.95))
        self.play(FadeIn(c5, scale=1.3), run_time=0.3)
        self.au_mot("16 rangées")
        l16 = self.ligne(self.t("16 rangées", 34, BLEU_CALCUL), y=-1.45)
        self.play(n.animate.set_value(16), ReplacementTransform(l4, l16), FadeOut(c5), run_time=1.0)
        self.au_mot("17 cases")
        c17 = self.t("17 cases", 34, ORANGE_RETENUE).move_to(P(0, -1.95))
        self.play(FadeIn(c17, scale=1.3), run_time=0.3)
        self.au_mot("leur pas vaut")
        pas_n = self.ligne(self.t("pas =", 34, VERT_OK), y=-2.45)
        self.play(FadeIn(pas_n), run_time=0.3)
        self.au_mot("2 sur racine de n")
        pas_n2 = self.ligne(self.t("pas =", 34, VERT_OK), self.t("2 / √n", 38, VERT_OK), y=-2.45)
        self.play(ReplacementTransform(pas_n, pas_n2), run_time=0.4)
        self.insister(pas_n2[1], 1.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause : 300 rangées, ça dessine quoi ? ──
        self.dire("02-question")
        self.au_mot("300 rangées")
        l300 = self.ligne(self.t("300 rangées :", 34, BLEU_CALCUL), y=-1.45)
        quoi = self.t("ça dessine quoi ?", 34, ORANGE_RETENUE).move_to(P(0, -1.95))
        self.play(FadeOut(VGroup(l16, c17, pas_n2)), FadeIn(l300), run_time=0.4)
        self.au_mot("dessiner quoi")
        self.play(FadeIn(quoi, scale=1.3), run_time=0.3)
        self.au_mot("Mets pause")
        mp = self.t("Mets pause et cherche !", 36, ORANGE_RETENUE).move_to(P(0, -2.45))
        self.play(FadeIn(mp, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.1)
        for k in (3, 2, 1):
            c = Text(str(k), font_size=90, color=ORANGE_RETENUE).move_to(G(-2.6, 0.3))
            self.play(FadeIn(c, scale=1.6), run_time=0.25)
            self.wait(0.5)
            self.play(FadeOut(c), run_time=0.25)

        # ── 03 : le curseur file à 300 ; l'escalier devient la cloche ──
        self.dire("03-revelation")
        self.au_mot("Les marches disparaissent")
        self.play(FadeOut(VGroup(quoi, mp)), n.animate.set_value(N_MAX), run_time=2.3,
                  rate_func=rate_functions.ease_in_out_sine)
        self.au_mot("loi binomiale")
        binom = self.t("loi binomiale", 36, ORANGE_RETENUE).move_to(P(0, -1.45))
        self.play(ReplacementTransform(l300, binom), run_time=0.4)
        self.au_mot("courbe lisse")
        self.insister(binom, 1.15)
        self.au_mot("La cloche")
        cloche = FunctionGraph(lambda x: Y0 + phi((x - X0) / SX) * SY, x_range=[X0 - X_MAX * SX, X0 + X_MAX * SX],
                               color=BLEU_NORMALE, stroke_width=5)
        self.play(Create(cloche), run_time=0.9)
        self.au_mot("loi normale")
        normale = self.t("loi normale", 36, BLEU_NORMALE).move_to(P(0, -1.92))
        self.play(FadeIn(normale, scale=1.3), run_time=0.35)
        self.au_mot("1 sur racine de 2 pi")
        un = Text("1", font_size=40)
        barre = Line(LEFT * 0.42, RIGHT * 0.42, stroke_width=3)
        rac = Text("√(2π)", font_size=36)
        frac = VGroup(un, barre, rac).arrange(DOWN, buff=0.08)
        fx = Text("f(x) =", font_size=40)
        debut = VGroup(fx, frac).arrange(RIGHT, buff=0.15)
        expo = puissance("e", "−x²/2", 48)
        fois = Text("×", font_size=40)
        formule = VGroup(fx, frac, fois, expo).arrange(RIGHT, buff=0.15)
        self.cap(formule, 3.6)
        if formule.height > 0.66:
            formule.scale_to_fit_height(0.66)
        formule.move_to(P(0, -2.55))
        self.play(FadeIn(VGroup(fx, frac), shift=UP * 0.1), run_time=0.45)
        self.au_mot("fois e puissance")
        self.play(FadeIn(fois), FadeIn(expo[0], scale=1.4), run_time=0.35)
        self.au_mot("moins x carré sur 2")
        self.play(FadeIn(expo[1], scale=1.8), run_time=0.35)
        self.play(Circumscribe(formule, color=BLEU_NORMALE), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # ── 04 : avec 100 rangées, quel est le pas ? ──
        self.dire("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 42, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(ReplacementTransform(titre, et), FadeOut(VGroup(binom, normale, formule)), run_time=0.4)
        self.au_mot("100 rangées")
        l100 = self.ligne(self.t("100 rangées :", 34, BLEU_CALCUL), y=-1.45)
        self.play(n.animate.set_value(100), FadeIn(l100), run_time=0.9)
        self.au_mot("quel est le pas")
        q = self.ligne(self.t("pas = ?", 40, ORANGE_RETENUE), y=-1.95)
        self.play(FadeIn(q, scale=1.4), run_time=0.35)
        self.insister(q, 1.2)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 38, VERT_OK).move_to(P(0, -2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        escal.clear_updaters()
        rempli.clear_updaters()
        bouton.clear_updaters()
        self.fin_short("05-abonne", [et, badge, axe, escal, cloche, piste, rempli, bouton, l100, q, appel])

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)
