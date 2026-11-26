# exp_equation_inequation.py
# EleveAI — Maths Tle spé — paysage E4 « Équations et inéquations avec l'exponentielle » (16:9),
# ceinture VERTE. Micro du coach : exp_equation_inequation (notion fonction_exponentielle).
# Centre : musique. Voix : manim/voix/terminale-exp-equation-inequation.json (validée le 26/11).
#
# Clé de voix → écran :
#   · 00-garde      : le titre, la question, la courbe de e puissance x, l'échelle (verte) ;
#   · 01-situation  : Léa, programmatrice radio (micro, panneau « ON AIR », console) ; deux
#                     titres (♪ bleu, ♪ rose), leurs écoutes e^{2x} et e^{x + 3} (tout x + 3 en
#                     exposant), deux barres de départ, les deux courbes et le « ? » du croisement ;
#   · 02-idee       : e^{2x} = e^{x + 3} ; la courbe croissante : a ≠ b donne e^{a} ≠ e^{b} ;
#                     exponentielles égales ⟹ exposants égaux (les exposants s'allument) ;
#   · 03-theoreme   : les règles e^{A} = e^{B} ⟺ A = B, e^{A} < e^{B} ⟺ A < B, sur la courbe ;
#   · 04/04b        : question-pause n° 1 (e^{x + 1} = e^{4} : x = 3, A) ;
#   · 05-appliquer  : 2x = x + 3, x = 3 ; les deux courbes se croisent à 3 semaines, e⁶ ≈ 403 ;
#   · 06-piege      : e^{x} = 0, e^{x} = −2 : aucune solution (la courbe ne touche jamais y = 0
#                     ni y = −2) ; e^{x} = 1 = e^{0} donne x = 0 ;
#   · 07/07b        : question-pause n° 2 (e^{x} < e^{2} : ]−∞ ; 2[, B) ;
#   · 08-rediger    : les trois lignes du bac, sur une copie ;
#   · 09/09b        : le défi e^{2x} > e^{x + 3} : x > 3, S = ]3 ; +∞[ (zone verte sur le graphe) ;
#   · 10-finale     : ce que tu as appris ; 11-abonne : la fin du 26/11.
# Code couleur : bleu = titre 1 (e^{2x}), rose = titre 2 (e^{x + 3}), vert = juste, rouge = le piège.
# ⛔ Exposant somme : TOUT l'exposant en hauteur, self.F("e^{x + 3}").
#
# python -m manim render -qh --disable_caching manim/scripts/terminale/exp_equation_inequation.py ExpEquationInequationTerminale -o eleveai-maths-terminale-exp-equation-inequation --media_dir manim/scripts/terminale/media-exp-equation-inequation
# Sortie : manim/sorties/terminale/maths/analyse/exp-equation-inequation/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from exp_commun import *  # noqa: E402,F401,F403

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert math.exp(2 * 0) < math.exp(0 + 3)                      # 01 : le premier part plus bas
assert 4 - 1 == 3 and 4 + 1 == 5                               # 04 : x + 1 = 4 ; leurres 4 et 5
assert 3 == 2 * 3 - 3 and math.isclose(math.exp(2 * 3), math.exp(3 + 3))   # 05 : x = 3
assert round(math.exp(6)) == 403                               # 05 : e⁶ ≈ 403 mille
assert math.exp(0) == 1                                        # 06 : 1 = e⁰
assert all(math.exp(x) > 0 for x in np.linspace(-20, 20, 401))  # 06 : jamais 0 ni −2
assert all((math.exp(x) < math.exp(2)) == (x < 2) for x in np.linspace(-5, 5, 201))     # 07
assert all((math.exp(2 * x) > math.exp(x + 3)) == (x > 3) for x in np.linspace(0, 6, 241))  # 09

AMBRE = JAUNE_TITRE
ROSE = "#ec4899"
T1 = lambda x: math.exp(2 * x)      # le titre 1, en milliers d'écoutes
T2 = lambda x: math.exp(x + 3)      # le titre 2


def micro_radio(s=1.0):
    """Un micro de radio : la tête grillagée, le pied, le socle."""
    tete = RoundedRectangle(width=0.5, height=0.8, corner_radius=0.24, fill_color=GREY_B, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.75))
    grille = VGroup(*[Line(P(-0.2, 0.55 + 0.13 * i), P(0.2, 0.55 + 0.13 * i), stroke_width=1.5, color=GREY_D)
                      for i in range(4)])
    pied = Line(P(0, 0.35), P(0, -0.55), stroke_width=6, color=GREY_C)
    socle = RoundedRectangle(width=0.8, height=0.14, corner_radius=0.06, fill_color=GREY_C, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.6))
    return VGroup(pied, socle, tete, grille).scale(s)


def on_air(s=1.0):
    """Le panneau rouge « ON AIR » d'un studio."""
    cadre = RoundedRectangle(width=1.5, height=0.55, corner_radius=0.1, fill_color="#7f1d1d", fill_opacity=1,
                             stroke_color=ROUGE_ERREUR, stroke_width=3)
    txt = Text("ON AIR", font_size=26, color="#fecaca", weight=BOLD).move_to(cadre)
    return VGroup(cadre, txt).scale(s)


def console(s=1.0):
    """Une table de mixage : quatre glissières, deux bleues, deux roses."""
    plateau = RoundedRectangle(width=1.9, height=0.9, corner_radius=0.1, fill_color="#1f2937", fill_opacity=1,
                               stroke_color=GREY_B, stroke_width=2)
    rails = VGroup()
    for i, (c, h) in enumerate(((BLEU_CALCUL, 0.15), (BLEU_CALCUL, -0.1), (ROSE, 0.05), (ROSE, -0.15))):
        x = -0.6 + 0.4 * i
        rails.add(VGroup(Line(P(x, -0.3), P(x, 0.3), stroke_width=2, color=GREY_C),
                         Rectangle(width=0.2, height=0.1, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, h))))
    return VGroup(plateau, rails).scale(s)


def note(color, s=1.0):
    """Une croche dessinée."""
    tete = Ellipse(width=0.3, height=0.22, fill_color=color, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(P(0.13, 0.03), P(0.13, 0.6), stroke_width=4, color=color)
    drapeau = Line(P(0.13, 0.6), P(0.33, 0.38), stroke_width=4, color=color)
    return VGroup(tete, hampe, drapeau).scale(s)


class ExpEquationInequationTerminale(ExpBase):
    fichier_marques = "exp_equation_inequation_marques.json"
    nom_voix = "terminale-exp-equation-inequation"
    ceinture = "verte"
    titre = "Équations et inéquations avec l'exponentielle"

    def construct(self):
        self.question_garde = [self.t("Comment trouver x,", 38),
                               self.t("quand il est caché dans l'exposant ?", 38, BLEU_CALCUL)]
        self.ecran_garde("Équations et inéquations", ["Comment trouver", "quand il est"])
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question(
            "04",
            [self.t("Résous :", 32), self.F("e^{x + 1} = e^{4}", 40),
             self.t("Que vaut x ?", 32)],
            ["3", "4", "5"],
            0, ["Résous", "4. Que vaut", "Que vaut"],
            [("4, donc", self.F("x + 1 = 4", 38, BLEU_CALCUL)),
             ("3. La réponse B", self.t("donc  x = 3", 40, VERT_OK)),
             ("1. La réponse C", self.t("B oublie le « + 1 »", 34, ROUGE_ERREUR)),
             ("1, au lieu", self.t("C ajoute 1 au lieu de l'enlever", 34, ROUGE_ERREUR))],
            figure=self.figure_q1, croix=[("1. La réponse C", 1), ("1, au lieu", 2)])
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question(
            "07",
            [self.t("Résous l'inéquation :", 32), self.F("e^{x} < e^{2}", 40)],
            [[("2, exclu", self.t("]2 ; +∞[", 32))],
             [("2, exclu", self.t("]−∞ ; 2[", 32))],
             "aucune"],
            1, ["Résous", "2. Quelles"],
            [("L'inégalité garde", self.t("l'inégalité garde son sens", 34, AMBRE)),
             ("2 donne", self.F("e^{x} < e^{2}  donne  x < 2", 38, BLEU_CALCUL)),
             ("2, exclu", self.t("S = ]−∞ ; 2[", 40, VERT_OK)),
             ("La réponse A", self.t("A retourne l'inégalité !", 34, ROUGE_ERREUR))],
            figure=self.figure_q2, croix=[("La réponse A", 0)])
        fs = 38
        noir = "#0f172a"

        def bloc(*lignes):
            return VGroup(*[x if isinstance(x, Mobject) else self.t(x, fs, noir) for x in lignes]
                          ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)

        self.ecran_copie("08-rediger", "Au bac : trois lignes", "Au bac", [
            ("on écrit les deux", bloc("On écrit les deux membres",
                                       "comme e puissance quelque chose :",
                                       self.F("e^{A} = e^{B}   ou   e^{A} < e^{B}", fs + 2, noir))),
            ("on cite", bloc("On cite la propriété :",
                             "exp est strictement croissante.")),
            ("on résout", bloc("On résout sur les exposants,",
                               "et on donne l'ensemble S.")),
        ], marge=0.7)
        self.ecran_defi([
            ("À partir de quand", self.t("À partir de quand le premier titre", 36)),
            ("dépasse-t-il", self.t("dépasse-t-il le second ?", 36)),
            ("Résous", self.t("Résous :", 36, AMBRE)),
            (None, [("2x plus grand", self.F("e^{2x}", 56, BLEU_CALCUL)), ("plus grand", self.t(">", 56)),
                    ("3. Mets", self.F("e^{x + 3}", 56, ROSE))]),
        ], figure=self.figure_defi, y0=2.3)
        self.ecran_correction()
        self.ecran_appris([
            ("e puissance A égale", self.F("e^{A} = e^{B}  revient à  A = B", 46)),
            ("Une inégalité", VGroup(self.t("une inégalité entre exponentielles", 44),
                                     self.t("garde son sens", 44, AMBRE)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)),
            ("e puissance x égale un", VGroup(self.F("e^{x} = un nombre négatif ou nul :", 44),
                                              self.t("aucune solution", 44, ROUGE_ERREUR)
                                              ).arrange(DOWN, aligned_edge=LEFT, buff=0.1)),
        ])
        self.ecran_fin_2611()

    # ── outils de la scène ─────────────────────────────────────────────────

    def graphe_titres(self, bg, hd, xb=3.4, yb=950):
        """Le repère des écoutes (milliers) des deux titres sur [0 ; xb] semaines."""
        g = Graphe((0, xb), (0, yb), bg, hd)
        ax = self.sans_audit(g.axes())
        c1 = g.courbe(T1, 0, xb, BLEU_CALCUL, 5)
        c2 = g.courbe(T2, 0, xb, ROSE, 5)
        return g, ax, c1, c2

    def lea(self, s=1.0):
        return personne(PEAUX[1], "#2b1608", "#7c3aed", longs=True, s=s)

    # ── 01 : Léa et les deux titres ────────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        lea = self.lea(0.95).move_to(P(-4.8, 2.1))
        self.au_mot("Voici Léa")
        nom = self.t("Léa", 36, JAUNE_TITRE).next_to(lea, DOWN, buff=0.18)
        self.play(FadeIn(lea, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("programmatrice")
        metier = self.t("programmatrice radio", 22, GREY_A).next_to(nom, DOWN, buff=0.1)
        mic = micro_radio(0.9).move_to(P(-3.3, 1.95))
        self.play(FadeIn(metier, shift=UP * 0.1), FadeIn(mic, shift=UP * 0.2), run_time=0.45)
        self.au_mot("radio")
        air = on_air(0.9).move_to(P(-1.6, 2.95))
        tab = console(0.9).move_to(P(-1.6, 1.55))
        self.play(FadeIn(air, scale=1.2), FadeIn(tab, shift=UP * 0.15), run_time=0.45)
        self.play(Indicate(air[0], color=ROUGE_ERREUR, scale_factor=1.08), run_time=0.4)

        # les deux titres : ♪ bleu, ♪ rose
        n1 = note(BLEU_CALCUL, 1.0)
        n2 = note(ROSE, 1.0)
        r1 = VGroup(n1, self.t("premier titre", 30, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        r2 = VGroup(n2, self.t("second titre", 30, ROSE)).arrange(RIGHT, buff=0.2)
        r1.move_to(P(0, -0.55)).align_to(P(-6.2, 0), LEFT)
        r2.move_to(P(0, -1.5)).align_to(P(-6.2, 0), LEFT)
        g, ax, c1, c2 = self.graphe_titres((0.5, -1.8), (6.3, 2.6))
        ls = self.t("semaines", 24, GREY_A).next_to(g.G(1.7, 0), DOWN, buff=0.12)
        le = self.t("écoutes (milliers)", 24, GREY_A).next_to(g.G(0, 950), RIGHT, buff=0.15)
        self.au_mot("Deux titres")
        self.play(FadeIn(r1, shift=RIGHT * 0.15), FadeIn(r2, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("streaming")
        self.play(Create(ax), FadeIn(ls), FadeIn(le), run_time=0.5)
        f1 = self.F("e^{2x}", 46, BLEU_CALCUL).next_to(r1, RIGHT, buff=0.45)
        f2 = self.F("e^{x + 3}", 46, ROSE).next_to(r2, RIGHT, buff=0.45)
        f2.align_to(f1, LEFT)
        self.au_mot("2x milliers")
        self.play(FadeIn(f1, scale=1.3), Create(c1), run_time=0.7)
        self.au_mot("3 milliers")
        self.play(FadeIn(f2, scale=1.3), Create(c2), run_time=0.7)
        self.au_mot("tout x plus 3")
        expo = f2[1][0]
        fl = Arrow(expo.get_bottom() + DOWN * 0.75 + RIGHT * 0.9, expo.get_bottom() + DOWN * 0.05, buff=0,
                   color=AMBRE, stroke_width=4, max_tip_length_to_length_ratio=0.25)
        ntout = self.t("tout x + 3 en exposant", 26, AMBRE).next_to(fl.get_start(), DOWN, buff=0.08)
        ntout.align_to(P(-6.2, 0), LEFT)
        self.play(GrowArrow(fl), FadeIn(ntout), Indicate(expo, color=AMBRE, scale_factor=1.4), run_time=0.6)
        # le départ : deux barres, la bleue plus basse
        self.au_mot("Le premier part plus bas")
        b1 = Rectangle(width=0.35, height=0.7 / 20, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        b2 = Rectangle(width=0.35, height=0.7, fill_color=ROSE, fill_opacity=1, stroke_width=0)
        xb = VGroup(f1, f2, ntout).get_right()[0] + 0.45      # à droite de TOUT ce qui est à gauche
        b1.align_to(f1, DOWN).align_to(P(xb, 0), LEFT)
        b2.align_to(f2, DOWN).align_to(P(xb, 0), LEFT)
        dep = self.t("départ", 22, GREY_A).next_to(VGroup(b1), UP, buff=0.5)
        self.play(GrowFromEdge(b1, DOWN), GrowFromEdge(b2, DOWN), FadeIn(dep), run_time=0.5)
        self.au_mot("grimpe plus vite")
        fv = Arrow(g.G(2.6, 430), g.G(3.0, 860), buff=0, color=BLEU_CALCUL, stroke_width=6,
                   max_tip_length_to_length_ratio=0.2)
        self.play(GrowArrow(fv), Indicate(c1, color=WHITE, scale_factor=1.02), run_time=0.6)
        self.au_mot("Quand va-t-il")
        pt = Dot(g.G(3, math.exp(6)), radius=0.11, color=AMBRE)
        q = self.t("?", 56, AMBRE).move_to(g.G(3.2, 170))
        h = DashedLine(g.G(3, 0), g.G(3, math.exp(6)), color=AMBRE, stroke_width=3, dash_length=0.1)
        self.play(FadeIn(pt, scale=1.8), Create(h), FadeIn(q, scale=1.5), run_time=0.5)
        self.insister(q, 1.3)
        self.attendre_voix(marge=0.6)

    # ── 02 : exponentielles égales, exposants égaux ────────────────────────

    def ecran_idee(self):
        self.nouvel_ecran("02-idee")
        self.au_mot("On cherche x")
        tit = self.col(self.t("On cherche x tel que :", 38, JAUNE_TITRE), 3.2, xl=-6.2)
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        a = self.F("e^{2x}", 52, BLEU_CALCUL)
        eg = self.t("=", 52)
        b = self.F("e^{x + 3}", 52, ROSE)
        eq = VGroup(a, eg, b).arrange(RIGHT, buff=0.3).move_to(P(2.3, 3.15))
        self.au_mot("2x égale")
        self.play(FadeIn(a, scale=1.3), FadeIn(eg), run_time=0.35)
        self.au_mot("3. L'exponentielle")
        self.play(FadeIn(b, scale=1.3), run_time=0.35)
        # la courbe croissante : deux exposants différents → deux hauteurs différentes
        g = Graphe((-1.6, 1.5), (0, 4.6), (-6.0, -2.9), (-1.0, 2.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -1.6, 1.5, BLEU_CALCUL, 6)
        self.au_mot("strictement croissante")
        fl = Arrow(g.G(-1.3, 1.2), g.G(1.0, 4.0), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.15)
        xl = 0.2
        l1 = self.col(self.t("exp est strictement croissante", 34), 1.9, xl)
        self.play(Create(ax), Create(c), FadeIn(l1, shift=UP * 0.1), run_time=0.7)
        self.play(GrowArrow(fl), run_time=0.4)

        def repere(x, nom, color):
            y = math.exp(x)
            v = DashedLine(g.G(x, 0), g.G(x, y), color=color, stroke_width=3, dash_length=0.1)
            hz = DashedLine(g.G(x, y), g.G(-1.6, y), color=color, stroke_width=3, dash_length=0.1)
            d = Dot(g.G(x, y), radius=0.08, color=color)
            lx = self.t(nom, 28, color).next_to(g.G(x, 0), DOWN, buff=0.1)
            ly = self.F(f"e^{{{nom}}}", 28, color).next_to(g.G(-1.6, y), LEFT, buff=0.1)
            return VGroup(v, d, lx), VGroup(hz, ly)

        ra, ra2 = repere(-0.7, "a", AMBRE)
        rb, rb2 = repere(1.05, "b", VERT_OK)
        self.au_mot("deux exposants différents")
        l2 = self.col(self.t("deux exposants différents a ≠ b", 32, AMBRE), 1.2, xl)
        self.play(Create(ra), Create(rb), FadeIn(l2, shift=UP * 0.1), run_time=0.6)
        self.au_mot("deux résultats différents")
        l3 = self.col(self.t("→ deux résultats différents", 32, AMBRE), 0.5, xl)
        l3b = self.col(self.F("e^{a} ≠ e^{b}", 38, AMBRE), -0.15, xl + 0.5)
        self.play(Create(ra2), Create(rb2), FadeIn(l3, shift=UP * 0.1), FadeIn(l3b, shift=UP * 0.1), run_time=0.6)
        self.au_mot("Donc, si")
        l4 = self.col(self.t("Donc : exponentielles égales", 30, VERT_OK), -0.95, xl)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.au_mot("les exposants sont égaux")
        l5 = self.col(self.t("⟹ exposants égaux", 34, VERT_OK), -1.6, xl)
        self.play(FadeIn(l5, scale=1.2), run_time=0.35)
        self.encadrer(VGroup(l4, l5))
        self.play(Indicate(a[1], color=AMBRE, scale_factor=1.6), Indicate(b[1], color=AMBRE, scale_factor=1.6),
                  run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 03 : les règles ────────────────────────────────────────────────────

    def ecran_theoreme(self):
        self.nouvel_ecran("03-theoreme")
        self.titre_ecran("Les règles", "Les règles")
        x = -6.2
        self.au_mot("pour tous réels")
        l0 = self.lg(self.t("pour tous réels A et B :", 34, GREY_A), y=2.3, x=x)
        self.play(FadeIn(l0, shift=RIGHT * 0.15), run_time=0.35)
        e1 = self.F("e^{A} = e^{B}", 44, BLEU_CALCUL)
        s1 = self.t("si et seulement si", 30, GREY_A)
        r1 = self.t("A = B", 44, BLEU_CALCUL)
        l1 = self.lg(e1, s1, r1, y=1.3, x=x, buff=0.3, larg=8.2)
        self.au_mot("e puissance A égale")
        self.play(FadeIn(e1, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("si et seulement si A")
        self.play(FadeIn(s1), FadeIn(r1, shift=RIGHT * 0.15), run_time=0.35)
        # la courbe et deux réels A < B
        g = Graphe((-1.6, 1.3), (0, 3.9), (2.6, -1.75), (6.3, 1.9))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -1.6, 1.3, BLEU_CALCUL, 6)
        e2 = self.F("e^{A} < e^{B}", 44, VERT_OK)
        s2 = self.t("si et seulement si", 30, GREY_A)
        r2 = self.t("A < B", 44, VERT_OK)
        l2 = self.lg(e2, s2, r2, y=0.1, x=x, buff=0.3, larg=8.2)
        self.au_mot("Et e puissance A")
        self.play(FadeIn(e2, shift=RIGHT * 0.15), Create(ax), Create(c), run_time=0.6)

        def repere(xv, nom):
            y = math.exp(xv)
            return VGroup(DashedLine(g.G(xv, 0), g.G(xv, y), color=VERT_OK, stroke_width=3, dash_length=0.1),
                          DashedLine(g.G(xv, y), g.G(0, y), color=VERT_OK, stroke_width=3, dash_length=0.1),
                          Dot(g.G(xv, y), radius=0.08, color=VERT_OK),
                          self.t(nom, 26, VERT_OK).next_to(g.G(xv, 0), DOWN, buff=0.1))

        ra, rb = repere(-1.1, "A"), repere(0.9, "B")
        self.play(Create(ra), Create(rb), run_time=0.5)
        self.au_mot("si et seulement si A est")
        self.play(FadeIn(s2), FadeIn(r2, shift=RIGHT * 0.15), run_time=0.35)
        del l1, l2
        self.au_mot("L'inégalité garde")
        l3 = self.lg(self.t("L'inégalité garde son sens", 38, AMBRE), y=-1.1, x=x, larg=8.2)
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("parce que")
        l4 = self.lg(self.t("parce que exp est croissante", 34), y=-1.9, x=x, larg=8.2)
        fl = Arrow(g.G(-1.3, 0.9), g.G(0.8, 3.2), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.15)
        self.play(FadeIn(l4, shift=RIGHT * 0.15), GrowArrow(fl), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── les dessins des questions ──────────────────────────────────────────

    def figure_q1(self):
        g = Graphe((-2.5, 1.6), (-0.4, 5.2), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -2.5, 1.6, BLEU_CALCUL, 6)
        fl = Arrow(g.G(-1.6, 1.5), g.G(1.0, 4.6), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.15)
        self.play(Create(ax), Create(c), GrowArrow(fl), run_time=0.8)
        return 1.3

    def figure_q2(self):
        g = Graphe((-2.5, 1.6), (-0.4, 5.2), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -2.5, 1.6, BLEU_CALCUL, 6)
        fl = Arrow(g.G(-2.2, 0.9), g.G(1.3, 0.9), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.1)
        self.play(Create(ax), Create(c), GrowArrow(fl), run_time=0.8)
        return 1.3

    def figure_defi(self):
        g, ax, c1, c2 = self.graphe_titres((2.7, -1.6), (6.3, 1.7))
        n1 = note(BLEU_CALCUL, 0.7).next_to(g.G(3.4, 898), LEFT, buff=0.15)
        n2 = note(ROSE, 0.7).next_to(g.G(3.4, math.exp(6.4)), DOWN, buff=0.12).shift(LEFT * 0.25)
        q = self.t("?", 48, AMBRE).move_to(g.G(1.9, 600))
        self.play(Create(ax), Create(c1), Create(c2), FadeIn(n1), FadeIn(n2), FadeIn(q, scale=1.4), run_time=0.8)

    # ── 05 : le croisement des deux titres ─────────────────────────────────

    def ecran_appliquer(self):
        self.nouvel_ecran("05-appliquer")
        self.au_mot("Revenons à Léa")
        tit = self.col(self.t("Revenons à Léa", 40, JAUNE_TITRE), 3.2, xl=-6.2)
        lea = self.lea(0.5).move_to(P(-1.2, 3.0))
        g, ax, c1, c2 = self.graphe_titres((-6.2, -2.6), (-0.6, 2.3))
        ls = self.t("semaines", 22, GREY_A).next_to(g.G(1.5, 0), DOWN, buff=0.12)
        self.play(FadeIn(tit, shift=DOWN * 0.1), FadeIn(lea), Create(ax), FadeIn(ls), run_time=0.6)
        self.play(Create(c1), Create(c2), run_time=0.7)
        xl = 0.3
        fs = 38
        l1 = self.col(VGroup(self.F("e^{2x}", 44, BLEU_CALCUL), self.t("=", 44),
                             self.F("e^{x + 3}", 44, ROSE)).arrange(RIGHT, buff=0.22), 2.2, xl)
        self.au_mot("2x égale")
        self.play(FadeIn(l1[:2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 donne")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.col(self.t("donne   2x = x + 3", fs), 1.3, xl)
        self.au_mot("2x égale", 2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.play(Indicate(l1[0][1], color=AMBRE, scale_factor=1.5), Indicate(l1[2][1], color=AMBRE, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("On enlève x")
        l3 = self.col(self.t("− x des deux côtés", 30, GREY_A), 0.55, xl)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("3. Au bout")
        l4 = self.col(self.t("x = 3", 48, VERT_OK), -0.3, xl)
        self.play(FadeIn(l4, scale=1.3), run_time=0.35)
        self.encadrer(l4)
        self.au_mot("3 semaines")
        y6 = math.exp(6)
        pt = Dot(g.G(3, y6), radius=0.11, color=AMBRE)
        v = DashedLine(g.G(3, 0), g.G(3, y6), color=AMBRE, stroke_width=3, dash_length=0.1)
        hz = DashedLine(g.G(3, y6), g.G(0, y6), color=AMBRE, stroke_width=3, dash_length=0.1)
        l3s = self.t("3", 28, AMBRE).next_to(g.G(3, 0), DOWN, buff=0.1)
        l5 = self.col(self.t("3 semaines : autant d'écoutes", 32, AMBRE), -1.2, xl)
        self.play(Create(v), FadeIn(pt, scale=1.8), FadeIn(l3s), FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.au_mot("6 milliers")
        e6 = self.F("e^{6}", 40, AMBRE)
        l6 = self.col(e6, -2.05, xl)
        self.play(FadeIn(e6, scale=1.3), Create(hz), run_time=0.4)
        self.au_mot("403")
        l6b = self.t("≈ 403 milliers", 38, AMBRE).next_to(e6, RIGHT, buff=0.2).align_to(e6[0], DOWN)
        self.play(FadeIn(l6b, scale=1.3), run_time=0.35)
        self.insister(pt, 1.6)
        del l6
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège, le signe de l'autre membre ──────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre_ecran("Voilà le piège !", "Voilà le piège", ROUGE_ERREUR)
        g = Graphe((-2.6, 1.3), (-2.7, 3.8), (2.6, -1.8), (6.3, 2.3))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -2.6, 1.3, BLEU_CALCUL, 6)
        x = -6.2
        fs = 42
        a0 = self.F("e^{x} = 0", fs, ROUGE_ERREUR)
        a2 = self.F("e^{x} = −2", fs, ROUGE_ERREUR)
        self.lg(a0, a2, y=2.15, x=x, buff=1.2)
        y0 = Line(g.G(-2.6, 0), g.G(1.3, 0), color=ROUGE_ERREUR, stroke_width=5)
        ym2 = DashedLine(g.G(-2.6, -2), g.G(1.3, -2), color=ROUGE_ERREUR, stroke_width=4, dash_length=0.12)
        self.au_mot("0, ou")
        self.play(FadeIn(a0, shift=RIGHT * 0.15), Create(ax), Create(c), Create(y0), run_time=0.6)
        self.au_mot("2, n'a")
        self.play(FadeIn(a2, shift=RIGHT * 0.15), Create(ym2), run_time=0.45)
        self.au_mot("aucune solution")
        l2 = self.lg(self.t("aucune solution, car", 36, ROUGE_ERREUR), y=1.25, x=x)
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.35)
        def marque_x(mob):
            k = 0.16
            c0 = mob.get_right() + RIGHT * 0.4
            return VGroup(Line(c0 + P(-k, -k), c0 + P(k, k), color=ROUGE_ERREUR, stroke_width=6),
                          Line(c0 + P(-k, k), c0 + P(k, -k), color=ROUGE_ERREUR, stroke_width=6))

        cx = VGroup(marque_x(a0), marque_x(a2))
        self.play(Create(cx), run_time=0.35)
        self.au_mot("toujours strictement")
        p = self.F("e^{x} > 0", 42, VERT_OK).next_to(l2, RIGHT, buff=0.3).align_to(l2, DOWN)
        self.play(FadeIn(p, shift=RIGHT * 0.15), Indicate(c, color=VERT_OK, scale_factor=1.03), run_time=0.6)
        self.au_mot("Avant de résoudre")
        l3 = self.lg(self.t("Avant de résoudre : regarde le signe", 34, AMBRE), y=0.35, x=x, larg=8.4)
        l3b = self.lg(self.t("de l'autre membre", 34, AMBRE), y=-0.25, x=x, larg=8.4)
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("de l'autre membre")
        self.play(FadeIn(l3b, shift=RIGHT * 0.15), run_time=0.35)
        e1 = self.F("e^{x} = 1", fs, BLEU_CALCUL)
        ec = self.t("on écrit", 30, GREY_A)
        e0 = self.F("1 = e^{0}", fs, BLEU_CALCUL)
        self.lg(e1, ec, e0, y=-1.2, x=x, buff=0.3, larg=8.4)
        self.au_mot("1, on écrit")
        self.play(FadeIn(e1, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("on écrit 1")
        self.play(FadeIn(ec), run_time=0.25)
        self.au_mot("0 : x")
        self.play(FadeIn(e0, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("0.")
        l5 = self.lg(self.t("donc  x = 0", 44, VERT_OK), y=-2.15, x=x)
        p0 = Dot(g.G(0, 1), radius=0.1, color=VERT_OK)
        self.play(FadeIn(l5, scale=1.2), FadeIn(p0, scale=1.8), run_time=0.4)
        self.encadrer(l5)
        self.attendre_voix(marge=0.6)

    # ── 09b : la correction du défi ────────────────────────────────────────

    def ecran_correction(self):
        self.nouvel_ecran("09b-correction")
        self.titre_ecran("Correction", "Correction")
        g, ax, c1, c2 = self.graphe_titres((-6.2, -2.6), (-0.6, 2.4))
        ls = self.t("semaines", 22, GREY_A).next_to(g.G(1.5, 0), DOWN, buff=0.12)   # loin du « ] » en x = 3
        self.play(Create(ax), Create(c1), Create(c2), FadeIn(ls), run_time=0.7)
        xl = 0.3
        self.au_mot("La fonction est")
        l1 = self.col(self.t("exp est strictement croissante :", 32), 2.5, xl)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("l'inégalité garde")
        l2 = self.col(self.t("l'inégalité garde son sens", 32, AMBRE), 1.95, xl)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        a = self.t("2x >", 42)
        b = self.t("x + 3", 42)
        l3 = self.col(VGroup(a, b).arrange(RIGHT, buff=0.2), 1.3, xl)
        self.au_mot("2x plus grand")
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3. On enlève")
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On enlève x")
        mx = self.t("− x", 34, GREY_A).next_to(l3, RIGHT, buff=0.35)
        self.play(FadeIn(mx), run_time=0.25)
        self.au_mot("3. Les solutions")
        l4 = self.col(self.t("x > 3", 46, VERT_OK), 0.6, xl)
        self.play(FadeIn(l4, scale=1.3), run_time=0.35)
        self.au_mot("3, exclu")
        l5 = self.col(self.t("S = ]3 ; +∞[", 44, VERT_OK), -0.15, xl)
        zone = Rectangle(width=g.G(3.4, 0)[0] - g.G(3, 0)[0], height=0.16, fill_color=VERT_OK, fill_opacity=0.7,
                         stroke_width=0).move_to((g.G(3, 0) + g.G(3.4, 0)) / 2 + UP * 0.08)
        v = DashedLine(g.G(3, 0), g.G(3, math.exp(6)), color=VERT_OK, stroke_width=3, dash_length=0.1)
        crochet = self.t("]", 34, VERT_OK).next_to(g.G(3, 0), DOWN, buff=0.08)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(zone), Create(v), FadeIn(crochet), run_time=0.5)
        self.encadrer(l5)
        self.au_mot("3 semaines")
        l6 = self.col(VGroup(self.t("Après 3 semaines,", 36, BLEU_CALCUL),
                             self.t("le premier titre est devant", 36, BLEU_CALCUL)
                             ).arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.25, xl)
        dev = Arrow(g.G(3.1, 450), g.G(3.3, 820), buff=0, color=BLEU_CALCUL, stroke_width=6,
                    max_tip_length_to_length_ratio=0.25)
        self.play(FadeIn(l6, shift=UP * 0.1), GrowArrow(dev), Indicate(c1, color=WHITE, scale_factor=1.02),
                  run_time=0.6)
        self.attendre_voix(marge=0.6)
