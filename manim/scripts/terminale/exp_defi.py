# exp_defi.py
# EleveAI — Maths Tle spé — paysage E6 « Exercice type bac sur l'exponentielle » (16:9),
# ceinture NOIRE. Micro du coach : exp_defi (notion fonction_exponentielle). Centre : corps-sante.
# Voix : manim/voix/terminale-exp-defi.json (validée par Frédéric le 26/11).
#
# Clé de voix → écran :
#   · 00-garde      : le titre, la question, la courbe, l'échelle (noire) ;
#   · 01-situation  : Sarah, pharmacienne (croix verte) ; le bras, la seringue, la piqûre
#                     dans le muscle, le sang qui emporte le médicament, l'élimination,
#                     la courbe qui monte puis descend (« quand le plus ? ») ;
#   · 02-idee       : le modèle C(t) = 10t e^{−t}, ce que sont C et t, C(0) = 0 à l'origine,
#                     le maximum cherché par le signe de la dérivée ;
#   · 03-theoreme   : la méthode du bac en quatre cartes dessinées (dériver, signe,
#                     tableau, limite) ;
#   · 04/04b        : question-pause n° 1 (la règle du produit, C) ;
#   · 05-appliquer  : (uv)′ = u′v + uv′, les deux termes, le facteur commun en orange,
#                     C′(t) = 10(1 − t) e^{−t} encadré ;
#   · 06-piege      : la phrase clé : trois blocs 10 × (1 − t) × e^{−t} et leurs signes ;
#   · 07/07b        : question-pause n° 2 (croissante sur [0 ; 1], A) ;
#   · 08-rediger    : C(1) = 10/e ≈ 3,68, la courbe et son sommet, le TABLEAU DE VARIATIONS
#                     tracé à la main (traits, signes, flèches) ;
#   · 09/09b        : le défi : la limite en +∞ (croissances comparées → 0, asymptote) ;
#   · 10-finale     : ce que tu as appris ; 11-abonne : la fin du 26/11.
# Code couleur : bleu = la courbe C, orange = le signe de C′, vert = juste et le maximum,
# rouge = le piège.
#
# python -m manim render -qh --disable_caching manim/scripts/terminale/exp_defi.py ExpDefiTerminale -o eleveai-maths-terminale-exp-defi --media_dir manim/scripts/terminale/media-exp-defi
# Sortie : manim/sorties/terminale/maths/analyse/exp-defi/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from exp_commun import *  # noqa: E402,F401,F403


def C(t):
    return 10 * t * math.exp(-t)


def Cp(t):
    return 10 * (1 - t) * math.exp(-t)


# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert C(0) == 0                                                            # 02
for _t in np.linspace(0, 6, 61):                                            # 05 : la dérivée
    _h = 1e-6
    assert abs((C(_t + _h) - C(_t - _h)) / (2 * _h) - Cp(_t)) < 1e-5
    assert abs(10 * math.exp(-_t) + 10 * _t * (-math.exp(-_t)) - Cp(_t)) < 1e-12
assert all(Cp(t) > 0 for t in np.linspace(0, 0.99, 50))                     # 07b : croissante
assert all(Cp(t) < 0 for t in np.linspace(1.01, 20, 50))                    #       décroissante
assert abs(C(1) - 10 / math.e) < 1e-12 and f"{10 / math.e:.2f}" == "3.68"   # 08
assert max(C(t) for t in np.linspace(0, 10, 10001)) <= C(1) + 1e-12         # le maximum
assert C(40) < 1e-10                                                        # 09b : → 0

ORANGE = ORANGE_RETENUE
NOIR = "#0f172a"
G_C = ((0, 6.0), (0, 4.4))     # le repère de C : t de 0 à 6 h, C de 0 à 4,4 mg/L


def seringue(s=1.0):
    """Une seringue horizontale, aiguille à droite : corps gradué, liquide vert, piston."""
    corps = Rectangle(width=1.8, height=0.42, stroke_color=WHITE, stroke_width=3, fill_color="#dbeafe",
                      fill_opacity=0.2)
    liquide = Rectangle(width=1.15, height=0.34, fill_color=VERT_OK, fill_opacity=0.75, stroke_width=0)
    liquide.align_to(corps, RIGHT).shift(LEFT * 0.04)
    grad = VGroup(*[Line(P(x, 0.21), P(x, 0.08), stroke_width=2, color=WHITE) for x in (-0.5, -0.2, 0.1, 0.4, 0.7)])
    tige = Line(P(-0.9, 0), P(-1.6, 0), stroke_width=6, color=GREY_B)
    tete = Line(P(-1.6, 0.25), P(-1.6, -0.25), stroke_width=8, color=GREY_B)
    collerette = Line(P(-0.9, 0.36), P(-0.9, -0.36), stroke_width=6, color=WHITE)
    embout = Polygon(P(0.9, 0.12), P(1.15, 0.05), P(1.15, -0.05), P(0.9, -0.12), fill_color=WHITE,
                     fill_opacity=1, stroke_width=0)
    aiguille = Line(P(1.15, 0), P(1.95, 0), stroke_width=2, color=GREY_A)
    return VGroup(corps, liquide, grad, tige, tete, collerette, embout, aiguille).scale(s)


def croix_pharmacie(s=1.0):
    """La croix verte des pharmacies."""
    h = Rectangle(width=0.9, height=0.3, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
    v = Rectangle(width=0.3, height=0.9, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
    return VGroup(h, v).scale(s)


def oeil_barre(s=1.0):
    """Un œil barré : « ça ne se lit pas d'un coup d'œil »."""
    blanc = Ellipse(width=1.2, height=0.6, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    iris = Circle(radius=0.2, fill_color="#1e40af", fill_opacity=1, stroke_width=0)
    pup = Circle(radius=0.08, fill_color=BLACK, fill_opacity=1, stroke_width=0)
    barre = Line(P(-0.65, -0.4), P(0.65, 0.4), stroke_width=7, color=ROUGE_ERREUR)
    return VGroup(blanc, iris, pup, barre).scale(s)


class ExpDefiTerminale(ExpBase):
    fichier_marques = "exp_defi_marques.json"
    nom_voix = "terminale-exp-defi"
    ceinture = "noire"
    titre = "Exercice type bac sur l'exponentielle"

    def frac(self, num, den, color=WHITE):
        """Une fraction posée : numérateur, trait, dénominateur."""
        trait = Line(LEFT, RIGHT, stroke_width=3, color=color)
        trait.set_width(max(num.width, den.width) + 0.16)
        return VGroup(num, trait, den).arrange(DOWN, buff=0.08)

    def courbe_C(self, g, a=0, b=6.0, color=EXP, sw=6):
        return g.courbe(C, a, b, color, sw)

    def construct(self):
        self.question_garde = [self.t("Comment étudier une fonction de bout en bout,", 36),
                               self.t("de la dérivée à la limite ?", 38, BLEU_CALCUL)]
        self.ecran_garde("Exercice type bac", ["Comment étudier", "de la dérivée"])
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question(
            "04",
            [self.t("Pour dériver", 32),
             VGroup(self.F("10t e^{−t}", 34), self.t(": quelle règle ?", 28)).arrange(RIGHT, buff=0.12)],
            [VGroup(self.F("e^{u}", 34), self.t("seule", 32)).arrange(RIGHT, buff=0.15),
             "un quotient", "un produit"],
            2, ["Pour dériver", "10 t fois e puissance moins t, quelle"],
            [("10 t, fois", VGroup(self.F("10t", 38, BLEU_CALCUL), self.t("×", 38),
                                   self.F("e^{−t}", 38, ORANGE), self.t(": un produit", 36)).arrange(RIGHT, buff=0.15)),
             ("10 t donne 10", self.F("(10t)′ = 10", 38, BLEU_CALCUL)),
             ("e puissance moins t donne", self.F("(e^{−t})′ = −e^{−t}", 38, ORANGE)),
             ("10 t.", self.t("A oublie le facteur 10t", 34, ROUGE_ERREUR))],
            figure=self.figure_q1, croix=[("10 t.", 0)])
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question(
            "07",
            [self.t("C′(t) : signe de 1 − t", 32),
             self.t("Sur quel intervalle", 32),
             self.t("C augmente-t-elle ?", 32)],
            [[("0 à", "de 0"), ("1. B", "à 1")],
             [("1 à plus", "de 1 à +∞")],
             [("0 à", "de 0"), ("10. Mets", "à 10")]],
            0, ["1 moins t. Sur", "Sur quel intervalle", "la concentration augmente"],
            [("1 moins t est positif", self.t("1 − t est positif quand t < 1", 36, ORANGE)),
             ("1, puis", self.t("croît sur [0 ; 1], décroît après", 36)),
             ("La concentration monte", self.t("monte la première heure, puis baisse", 30, BLEU_CALCUL)),
             ("10.", self.t("C confond avec le coefficient 10", 34, ROUGE_ERREUR))],
            figure=self.figure_q2, croix=[("10.", 2)])
        self.ecran_rediger()
        self.ecran_defi([
            ("Que devient", self.t("Que devient la concentration", 40)),
            ("à long terme", self.t("à long terme ?", 40, BLEU_CALCUL)),
            ("Calcule la limite", self.t("Calcule la limite de :", 36, ORANGE)),
            (None, [("10 t fois", self.F("10t e^{−t}", 50, BLEU_CALCUL)),
                    ("quand t tend", self.t("quand t → +∞", 38))]),
        ], figure=self.figure_defi, y0=2.3)
        self.ecran_correction()
        self.ecran_appris([
            ("Pour un produit", "Un produit avec l'exponentielle :\nrègle du produit, puis on factorise"),
            ("Le signe de la dérivée", "Le signe de la dérivée vient du facteur\nqui n'est pas l'exponentielle"),
            ("Et la limite", "La limite : croissances comparées"),
        ])
        self.ecran_fin_2611()

    # ── 01 : Sarah, la piqûre et le médicament dans le sang ────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        sarah = personne(PEAUX[1], "#2b1608", "#e5e7eb", longs=True, s=0.95).move_to(P(-5.2, 2.15))
        self.au_mot("Voici Sarah")
        nom = self.t("Sarah", 36, JAUNE_TITRE).next_to(sarah, DOWN, buff=0.18)
        self.play(FadeIn(sarah, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("pharmacienne")
        metier = VGroup(self.t("pharmacienne", 26, GREY_A), self.t("à l'hôpital", 26, GREY_A))
        metier.arrange(DOWN, buff=0.08).next_to(nom, DOWN, buff=0.12)
        croix = croix_pharmacie(0.7).next_to(sarah, RIGHT, buff=0.25).shift(UP * 0.4)
        self.play(FadeIn(metier[0], shift=UP * 0.1), FadeIn(croix, scale=1.5), run_time=0.4)
        self.au_mot("à l'hôpital")
        self.play(FadeIn(metier[1], shift=UP * 0.1), run_time=0.3)
        # le bras du patient, le muscle
        bras = RoundedRectangle(width=3.6, height=0.95, corner_radius=0.45, fill_color=PEAUX[3], fill_opacity=1,
                                stroke_width=0).move_to(P(0.3, 1.75))
        main = Circle(radius=0.42, fill_color=PEAUX[3], fill_opacity=1, stroke_width=0).move_to(P(2.2, 1.75))
        muscle = Ellipse(width=1.5, height=0.5, fill_color="#f87171", fill_opacity=0.7, stroke_width=0)
        muscle.move_to(P(0.0, 1.75))
        lb_patient = self.t("le patient", 24, GREY_A).next_to(bras, UP, buff=0.15).align_to(bras, RIGHT)
        self.au_mot("Un patient")
        self.play(FadeIn(VGroup(main, bras)), FadeIn(lb_patient), run_time=0.45)
        ser = seringue(0.55).rotate(-PI / 4).move_to(P(-1.0, 2.8))
        self.au_mot("une piqûre")
        self.play(FadeIn(ser, shift=DOWN * 0.2), run_time=0.35)
        self.play(ser.animate.shift(DR * 0.32), run_time=0.35)
        self.au_mot("dans le muscle")
        lb_muscle = self.t("muscle", 24, "#fecaca").move_to(P(-0.75, 1.02))
        self.play(FadeIn(muscle), FadeIn(lb_muscle), ser[1].animate.stretch(0.3, 0, about_edge=RIGHT), run_time=0.5)
        # le vaisseau sanguin
        y = 0.35
        tube = Rectangle(width=6.4, height=0.42, fill_color="#7f1d1d", fill_opacity=0.45, stroke_width=0)
        tube.move_to(P(0.9, y))
        bords = VGroup(Line(P(-2.3, y + 0.21), P(4.1, y + 0.21), color="#ef4444", stroke_width=3),
                       Line(P(-2.3, y - 0.21), P(4.1, y - 0.21), color="#ef4444", stroke_width=3))
        lb_sang = self.t("le sang", 24, "#fecaca").next_to(tube, DOWN, buff=0.1).align_to(tube, LEFT)
        lien = Arrow(P(0.0, 1.45), P(0.0, y + 0.28), color=VERT_OK, stroke_width=3, buff=0,
                           max_tip_length_to_length_ratio=0.25)
        self.au_mot("Le médicament passe")
        self.play(FadeIn(tube), Create(bords), FadeIn(lb_sang), GrowArrow(lien), run_time=0.5)
        gouttes = VGroup(*[Dot(P(-0.1 + 0.3 * i, y + (0.08 if i % 2 else -0.08)), radius=0.07, color=VERT_OK)
                           for i in range(5)])
        self.play(FadeIn(gouttes, scale=1.5), run_time=0.3)
        self.play(gouttes.animate.shift(RIGHT * 2.3), run_time=self.jusqua("puis le corps", mini=0.5))
        # l'élimination
        sortie = CurvedArrow(P(4.15, y), P(5.6, 1.2), angle=-PI / 3, color=GREY_A, stroke_width=4)
        lb_elim = self.t("éliminé", 26, GREY_A).move_to(P(5.6, 1.6))
        self.au_mot("puis le corps")
        self.play(Create(sortie), FadeIn(lb_elim), gouttes.animate.shift(RIGHT * 1.2).set_opacity(0.15),
                  run_time=0.7)
        # la question : quand le plus ? et ensuite ?
        g = Graphe(*G_C, (-3.2, -3.0), (1.2, -0.75))
        ax = self.sans_audit(g.axes())
        lt = self.t("temps", 22, GREY_A).next_to(g.G(6.0, 0), DOWN, buff=0.1).align_to(g.G(6.0, 0), RIGHT)
        lq = self.t("quantité dans le sang", 22, GREY_A).next_to(g.G(0, 4.4), RIGHT, buff=0.12)
        c = self.courbe_C(g)
        self.au_mot("à quel moment")
        self.play(Create(ax), FadeIn(lt), FadeIn(lq), Create(c), run_time=0.9)
        som = Dot(g.G(1, C(1)), radius=0.1, color=VERT_OK)
        q1 = VGroup(self.t("Quand y en a-t-il", 32, VERT_OK), self.t("le plus ?", 32, VERT_OK))
        q1.arrange(DOWN, aligned_edge=LEFT, buff=0.08).move_to(P(0, -1.1)).align_to(P(1.8, 0), LEFT)
        self.play(FadeIn(som, scale=1.8), FadeIn(q1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("ce que devient")
        fin = Arrow(g.G(3.2, 2.0), g.G(5.8, 0.6), buff=0, color=JAUNE_TITRE,
                    stroke_width=4, max_tip_length_to_length_ratio=0.18)
        q2 = self.t("Et ensuite ?", 32, JAUNE_TITRE).move_to(P(0, -2.25)).align_to(P(1.8, 0), LEFT)
        self.play(GrowArrow(fin), FadeIn(q2, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 02 : le modèle C(t) = 10t e^{−t} ───────────────────────────────────

    def ecran_idee(self):
        self.nouvel_ecran("02-idee")
        g = Graphe(*G_C, (-6.1, -2.8), (-0.9, 2.3))
        ax = self.sans_audit(g.axes())
        lt = self.t("t (heures)", 24, GREY_A).next_to(g.G(6.0, 0), DOWN, buff=0.12).align_to(g.G(6.0, 0), RIGHT)
        lc = self.t("C (mg/L)", 24, GREY_A).next_to(g.G(0, 4.4), RIGHT, buff=0.15)
        c = self.courbe_C(g)
        xl = 0.1
        self.au_mot("Le modèle")
        tit = self.col(self.t("Le modèle", 40, JAUNE_TITRE), 3.2, xl=-6.1)
        self.play(FadeIn(tit, shift=DOWN * 0.1), Create(ax), run_time=0.5)
        mod = self.col(self.F("C(t) = 10t e^{−t}", 50, BLEU_CALCUL), 2.35, xl)
        self.au_mot("10 t fois")
        self.play(Write(mod), Create(c), run_time=0.9)
        cad = self.encadrer(mod, BLEU_CALCUL)
        fs = 32
        l1 = self.col(self.t("C : la concentration (mg/L)", fs), 1.3, xl)
        self.au_mot("C est la concentration")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(lc), run_time=0.35)
        l2 = self.col(self.t("t : le temps (heures)", fs), 0.75, xl)
        self.au_mot("t le temps")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(lt), run_time=0.35)
        l2b = self.col(self.t("t ≥ 0", fs, GREY_A), 0.75, l2.get_right()[0] + 0.35)
        self.au_mot("0. En t")
        self.play(FadeIn(l2b, scale=1.2), run_time=0.3)
        l3 = self.col(self.t("C(0) = 0", 40, VERT_OK), -0.1, xl)
        o = Dot(g.G(0, 0), radius=0.11, color=VERT_OK)
        self.au_mot("0 : le médicament")
        self.play(FadeIn(l3, scale=1.2), FadeIn(o, scale=1.8), run_time=0.35)
        l3b = self.col(self.t("pas encore dans le sang", 30, GREY_A), -0.7, xl)
        self.au_mot("pas encore")
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Pour trouver le maximum")
        som = Dot(g.G(1, C(1)), radius=0.11, color=VERT_OK)
        qm = self.t("?", 40, VERT_OK).next_to(som, UR, buff=0.08)
        l4 = self.col(self.t("Le maximum ?", 36, VERT_OK), -1.4, xl)
        self.play(FadeIn(som, scale=1.8), FadeIn(qm), FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("le signe de la dérivée")
        l5 = self.col(VGroup(self.t("→ le signe de", 34), self.t("C′", 38, ORANGE)).arrange(RIGHT, buff=0.15),
                      -2.05, xl + 0.3)
        self.play(FadeIn(l5, shift=RIGHT * 0.1), run_time=0.35)
        self.insister(l5[1], 1.3)
        del cad
        self.attendre_voix(marge=0.6)

    # ── 03 : la méthode du bac, quatre cartes ──────────────────────────────

    def carte_etape(self, k, lignes, dessin, centre, color):
        cadre = RoundedRectangle(width=5.4, height=2.3, corner_radius=0.18, fill_color=FOND_CARTE, fill_opacity=1,
                                 stroke_color=color, stroke_width=3).move_to(centre)
        num = self.pastille_num(k, color).move_to(cadre.get_corner(UL) + P(0.42, -0.42))
        txt = VGroup(*[self.t(s, 30 if i == 0 else 24, WHITE if i == 0 else GREY_A) for i, s in enumerate(lignes)])
        txt.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(num, RIGHT, buff=0.2).align_to(num, UP)
        dessin.move_to(cadre.get_center() + P(1.45, -0.4))
        return VGroup(cadre, num, txt, dessin)

    def ecran_theoreme(self):
        self.nouvel_ecran("03-theoreme")
        self.titre_ecran("La méthode du bac, en quatre temps", "La méthode du bac")
        # 1 : une courbe et sa tangente
        g1 = Graphe((0, 4), (0, 4.4), (-1.1, -0.65), (1.1, 0.75))
        d1 = VGroup(self.sans_audit(g1.axes(sw=2)), g1.courbe(C, 0, 4, EXP, 4),
                    g1.droite(Cp(0.5), 0.5, C(0.5), 0.1, 0.95, ORANGE, 4))
        # 2 : une ligne de signes
        d2 = VGroup(Line(P(-1.1, 0), P(1.1, 0), color=GREY_B, stroke_width=3),
                    Line(P(0, 0.3), P(0, -0.3), color=GREY_B, stroke_width=3),
                    Text("+", font_size=40, color=ORANGE).move_to(P(-0.55, 0.3)),
                    Text("−", font_size=40, color=ORANGE).move_to(P(0.55, 0.3)))
        # 3 : un mini tableau de variations
        d3 = VGroup(Rectangle(width=2.2, height=1.2, stroke_color=GREY_B, stroke_width=2),
                    Arrow(P(-0.95, -0.4), P(-0.1, 0.35), buff=0, color=BLEU_CALCUL, stroke_width=4,
                          max_tip_length_to_length_ratio=0.3),
                    Dot(P(0, 0.42), radius=0.08, color=VERT_OK),
                    Arrow(P(0.1, 0.35), P(0.95, -0.4), buff=0, color=BLEU_CALCUL, stroke_width=4,
                          max_tip_length_to_length_ratio=0.3))
        # 4 : la courbe qui s'écrase sur l'axe
        g4 = Graphe((0, 6), (0, 4.4), (-1.1, -0.65), (1.1, 0.75))
        d4 = VGroup(self.sans_audit(g4.axes(sw=2)), g4.courbe(C, 0, 6, EXP, 4),
                    Arrow(g4.G(3.8, 1.3), g4.G(5.9, 0.35), buff=0, color=VERT_OK, stroke_width=4,
                          max_tip_length_to_length_ratio=0.3))
        cartes = [
            self.carte_etape(1, ["Dériver"], d1, P(-3.35, 1.25), BLEU_CALCUL),
            self.carte_etape(2, ["Signe de", "la dérivée"], d2, P(2.45, 1.25), ORANGE),
            self.carte_etape(3, ["Tableau de", "variations", "+ maximum"], d3, P(-3.35, -1.35), VERT_OK),
            self.carte_etape(4, ["Limite", "en +∞"], d4, P(2.45, -1.35), JAUNE_TITRE),
        ]
        for c, ext in zip(cartes, ["Un : dériver", "Deux : étudier", "Trois : dresser", "Quatre : calculer"]):
            self.au_mot(ext)
            self.play(FadeIn(c[0]), FadeIn(c[1], scale=1.3), FadeIn(c[2], shift=RIGHT * 0.1), run_time=0.35)
            self.play(Create(c[3]), run_time=0.45)
        self.au_mot("On les fait un par un")
        for c in cartes:
            self.play(Indicate(c[1], scale_factor=1.4, color=WHITE), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── les dessins des questions et du défi ───────────────────────────────

    def figure_q1(self):
        g = Graphe(*G_C, (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = self.courbe_C(g)
        self.play(Create(ax), Create(c), run_time=0.8)
        return 1.3

    def figure_q2(self):
        g = Graphe(*G_C, (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = self.courbe_C(g)
        fl = Arrow(g.G(0.05, 0.8), g.G(0.75, 3.6), buff=0, color=ORANGE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.3)
        self.play(Create(ax), Create(c), GrowArrow(fl), run_time=0.8)
        return 1.3

    def figure_defi(self):
        g = Graphe((0, 9.0), (0, 4.4), (1.6, -1.75), (6.3, 1.0))
        ax = self.sans_audit(g.axes())
        c = g.courbe(C, 0, 3.4, EXP, 6)
        suite = DashedVMobject(g.courbe(C, 3.4, 8.8, EXP, 5), num_dashes=14)
        qm = self.t("?", 48, JAUNE_TITRE).move_to(g.G(7.6, 2.6))
        self.play(Create(ax), Create(c), run_time=0.7)
        self.play(Create(suite), FadeIn(qm, scale=1.5), run_time=0.6)

    # ── 05 : dériver le produit, puis factoriser ───────────────────────────

    def ecran_appliquer(self):
        self.nouvel_ecran("05-appliquer")
        self.au_mot("Dérivons")
        tit = self.col(self.t("Dérivons", 42, JAUNE_TITRE), 3.2, xl=-6.2)
        regle = self.F("(uv)′ = u′v + uv′", 36)
        cad_r = SurroundingRectangle(regle, color=GREY_B, buff=0.2, stroke_width=2, corner_radius=0.12)
        carte = self.col(VGroup(cad_r, regle), 2.55, xl=2.4)
        self.play(FadeIn(tit, shift=DOWN * 0.1), FadeIn(carte), run_time=0.5)
        x = -6.2
        l1 = self.lg(self.F("C′(t) = 10 × e^{−t}", 40), y=1.85, x=x)
        tag1 = self.t("u′v", 28, GREY_A).next_to(l1, RIGHT, buff=0.4)
        uv1 = self.col(VGroup(self.F("u = 10t", 30, BLEU_CALCUL), self.F("u′ = 10", 30, BLEU_CALCUL)
                              ).arrange(RIGHT, buff=0.5), 1.55, xl=2.4)
        self.au_mot("10 fois e puissance moins t, plus")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), FadeIn(tag1), FadeIn(uv1), run_time=0.45)
        l1b = self.lg(self.F("+ 10t × (−e^{−t})", 40), y=1.05, x=-4.3)
        tag2 = self.t("uv′", 28, GREY_A).next_to(l1b, RIGHT, buff=0.4)
        uv2 = self.col(VGroup(self.F("v = e^{−t}", 30, ORANGE), self.F("v′ = −e^{−t}", 30, ORANGE)
                              ).arrange(RIGHT, buff=0.5), 0.85, xl=2.4)
        self.au_mot("10 t fois moins")
        self.play(FadeIn(l1b, shift=RIGHT * 0.15), FadeIn(tag2), FadeIn(uv2), run_time=0.45)
        # le facteur commun, en orange dans les deux termes
        self.au_mot("On factorise")
        l2 = self.lg(self.t("On factorise par", 34), self.F("10 e^{−t}", 38, ORANGE), y=0.05, x=x)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("10 fois e puissance moins t : C")
        anims = []
        for f in (l1[0], l1b[0]):
            i10 = f._base.find("10")
            ie = f._base.rfind("e")
            anims += [f[0][i10:i10 + 2].animate.set_color(ORANGE), f[0][ie].animate.set_color(ORANGE),
                      f[1][0].animate.set_color(ORANGE)]
        self.play(FadeIn(l2[1], scale=1.2), *anims, run_time=0.5)
        res = self.lg(self.F("C′(t) = 10(1 − t) e^{−t}", 46, VERT_OK), y=-1.15, x=x)
        self.au_mot("1 moins t, fois")
        self.play(Write(res), run_time=0.7)
        cad = self.encadrer(res)
        self.insister(VGroup(res, cad), 1.08)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège, la phrase clé ───────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre_ecran("Voilà le piège !", "Voilà le piège", ROUGE_ERREUR)
        x = -6.2
        larg = 7.3
        l1 = self.lg(self.t("Le signe de C′ ne se lit pas d'un coup d'œil", 32), y=2.25, x=x, larg=9.9)
        self.au_mot("Le signe de C prime")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.4)
        oeil = oeil_barre(0.85).move_to(P(4.6, 2.35))
        self.au_mot("coup d'œil")
        self.play(FadeIn(oeil, scale=1.3), run_time=0.35)
        l2 = self.lg(self.t("La phrase clé :", 38, JAUNE_TITRE), y=1.35, x=x)
        self.au_mot("la phrase clé")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.35)
        # les trois facteurs de C′(t), dessinés en blocs
        yb = 0.75

        def bloc(m, color):
            r = RoundedRectangle(width=m.width + 0.4, height=0.9, corner_radius=0.14, stroke_color=color,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
            return VGroup(r, m.move_to(r))

        b10 = bloc(self.F("10", 40), VERT_OK)
        b1t = bloc(self.F("(1 − t)", 40), ORANGE)
        bex = bloc(self.F("e^{−t}", 40), VERT_OK)
        fois = [self.t("×", 38) for _ in range(2)]
        rang = VGroup(b10, fois[0], b1t, fois[1], bex).arrange(RIGHT, buff=0.15)
        if rang.width > 4.8:
            rang.scale_to_fit_width(4.8)
        rang.move_to(P(0, yb)).align_to(P(1.65, 0), LEFT)
        lab = self.t("C′(t) =", 34, GREY_A).next_to(rang, UP, buff=0.25).align_to(rang, LEFT)
        signe = lambda b, s, c: self.t(s, 44, c).next_to(b, DOWN, buff=0.15)
        l3 = self.lg(self.F("e^{−t} est strictement positif,", 36, VERT_OK), y=0.45, x=x, larg=larg)
        self.au_mot("e puissance moins t est")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), FadeIn(lab), FadeIn(bex, scale=1.2), run_time=0.4)
        s_ex = signe(bex, "+", VERT_OK)
        self.au_mot("strictement positif")
        self.play(FadeIn(s_ex, scale=1.5), run_time=0.3)
        l4 = self.lg(self.t("et 10 aussi.", 36, VERT_OK), y=-0.4, x=x)
        s_10 = signe(b10, "+", VERT_OK)
        self.au_mot("10 aussi")
        self.play(FadeIn(l4, shift=RIGHT * 0.15), FadeIn(b10, scale=1.2), FadeIn(fois[0]), FadeIn(fois[1]),
                  FadeIn(s_10, scale=1.5), run_time=0.4)
        l5 = self.lg(self.t("Donc C′(t) a le signe de 1 − t.", 36, ORANGE), y=-1.25, x=x, larg=larg)
        self.au_mot("1 moins t. Sans")
        s_1t = self.t("même signe que C′", 28, ORANGE).next_to(rang, DOWN, buff=0.85)
        self.play(FadeIn(l5, shift=RIGHT * 0.15), FadeIn(b1t, scale=1.2), run_time=0.4)
        self.play(FadeIn(s_1t, shift=UP * 0.1), Indicate(b1t, color=ORANGE, scale_factor=1.15), run_time=0.5)
        l6 = VGroup(self.t("Sans cette phrase :", 36, ROUGE_ERREUR),
                    self.t("justification incomplète au bac", 36, ROUGE_ERREUR)).arrange(DOWN, aligned_edge=LEFT,
                                                                                       buff=0.12)
        l6.move_to(P(0, -2.45)).align_to(P(x, 0), LEFT)
        self.au_mot("Sans cette phrase")
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.4)
        self.insister(l6, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 08 : le maximum et le tableau de variations, tracé à la main ───────

    def ecran_rediger(self):
        self.nouvel_ecran("08-rediger")
        x = -6.2
        larg = 6.8
        g = Graphe(*G_C, (1.2, -0.15), (6.3, 3.0))
        ax = self.sans_audit(g.axes())
        c = self.courbe_C(g)
        som = Dot(g.G(1, C(1)), radius=0.11, color=VERT_OK)
        tir = VGroup(DashedLine(g.G(1, 0), g.G(1, C(1)), color=VERT_OK, stroke_width=3, dash_length=0.1),
                     DashedLine(g.G(0, C(1)), g.G(1, C(1)), color=VERT_OK, stroke_width=3, dash_length=0.1))
        self.au_mot("Le maximum est atteint")
        tit = self.lg(self.t("Le maximum", 42, JAUNE_TITRE), y=3.2, x=x)
        self.play(FadeIn(tit, shift=DOWN * 0.1), Create(ax), Create(c), run_time=0.7)
        l1 = self.lg(self.t("atteint en t = 1", 38, VERT_OK), y=2.35, x=x)
        self.au_mot("1. C de 1")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), Create(tir), FadeIn(som, scale=1.8), run_time=0.45)
        l2 = self.lg(self.F("C(1) = 10 × 1 × e^{−1}", 38), y=1.55, x=x, larg=larg)
        self.au_mot("10 fois 1 fois")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.4)
        f10 = self.frac(self.t("10", 38, VERT_OK), self.t("e", 38, VERT_OK), VERT_OK)
        l3 = self.lg(self.t("=", 38), f10, y=0.6, x=x)
        self.au_mot("10 sur e :")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.4)
        l3b = self.col(self.t("≈ 3,68 mg/L", 38, VERT_OK), 0.6, l3.get_right()[0] + 0.25)
        self.au_mot("3,68")
        self.play(FadeIn(l3b, scale=1.2), Indicate(som, scale_factor=1.8, color=VERT_OK), run_time=0.45)
        l4 = self.lg(self.t("au bout d'une heure", 30, GREY_A), y=-0.05, x=x)
        self.au_mot("au bout d'une heure")
        self.play(FadeIn(l4, shift=RIGHT * 0.1), run_time=0.3)
        # le tableau : 3 lignes (t, C′(t), C(t)), une colonne de titres
        X0, X1 = -6.2, 4.6
        Xs = -4.9                     # le trait vertical des titres
        xa, xm, xb = -4.3, -0.15, 3.9  # t = 0, t = 1, t → +∞
        Yh, y1, y2, Yb = -0.55, -1.15, -1.75, -3.35
        tr = dict(color=WHITE, stroke_width=3)
        cadre = VGroup(Rectangle(width=X1 - X0, height=Yh - Yb, **tr).move_to(P((X0 + X1) / 2, (Yh + Yb) / 2)),
                       Line(P(X0, y1), P(X1, y1), **tr), Line(P(X0, y2), P(X1, y2), **tr),
                       Line(P(Xs, Yh), P(Xs, Yb), **tr))
        tt = [self.t("t", 32), self.t("C′(t)", 30, ORANGE), self.t("C(t)", 32, BLEU_CALCUL)]
        for m, yy in zip(tt, [(Yh + y1) / 2, (y1 + y2) / 2, (y2 + Yb) / 2]):
            m.move_to(P((X0 + Xs) / 2, yy))
        ym1, ym2, ym3 = (Yh + y1) / 2, (y1 + y2) / 2, (y2 + Yb) / 2
        v0 = self.sans_audit(self.t("0", 30)).move_to(P(xa, ym1))
        vinf = self.t("+∞", 30).move_to(P(xb, ym1))
        self.au_mot("tableau de variations")
        self.play(Create(cadre), run_time=0.6)
        self.play(*[FadeIn(m) for m in tt], FadeIn(v0), FadeIn(vinf), run_time=0.35)
        # croissante
        plus = self.t("+", 40, ORANGE).move_to(P((xa + xm) / 2, ym2))
        c0 = self.sans_audit(self.t("0", 30, BLEU_CALCUL)).move_to(P(xa, Yb + 0.3))
        mt = Arrow(P(xa + 0.35, Yb + 0.35), P(xm - 0.55, y2 - 0.35), buff=0, color=BLEU_CALCUL, stroke_width=5,
                   max_tip_length_to_length_ratio=0.12)
        self.au_mot("croissante")
        self.play(FadeIn(plus, scale=1.4), FadeIn(c0), GrowArrow(mt), run_time=0.5)
        # le maximum 10/e en 1
        v1 = self.t("1", 30).move_to(P(xm, ym1))
        z = self.sans_audit(self.t("0", 30, ORANGE)).move_to(P(xm, ym2))
        fm = self.frac(self.t("10", 28, VERT_OK), self.t("e", 28, VERT_OK), VERT_OK).move_to(P(xm, y2 - 0.42))
        self.au_mot("10 sur e en 1")
        self.play(FadeIn(fm, scale=1.3), run_time=0.35)
        cfm = SurroundingRectangle(fm, color=VERT_OK, buff=0.1, stroke_width=3)
        self.au_mot("1, puis décroissante")
        self.play(FadeIn(v1, scale=1.3), FadeIn(z), Create(cfm), run_time=0.35)
        # décroissante
        moins = self.t("−", 40, ORANGE).move_to(P((xm + xb) / 2, ym2))
        dc = Arrow(P(xm + 0.55, y2 - 0.35), P(xb - 0.35, Yb + 0.35), buff=0, color=BLEU_CALCUL, stroke_width=5,
                   max_tip_length_to_length_ratio=0.12)
        self.au_mot("décroissante")
        self.play(FadeIn(moins, scale=1.4), GrowArrow(dc), run_time=0.5)
        del cfm, ym3
        self.attendre_voix(marge=0.7)

    # ── 09b : la limite en +∞ ──────────────────────────────────────────────

    def ecran_correction(self):
        self.nouvel_ecran("09b-correction")
        self.titre_ecran("Correction", "Correction")
        g = Graphe((0, 9.0), (0, 4.4), (-6.1, -2.7), (-0.6, 2.3))
        ax = self.sans_audit(g.axes())
        c = g.courbe(C, 0, 8.9, EXP, 6)
        lt = self.t("t", 26, GREY_A).next_to(g.G(9.0, 0), DOWN, buff=0.12)
        self.play(Create(ax), Create(c), FadeIn(lt), run_time=0.7)
        xl = 0.2
        fs = 38
        l1 = self.col(VGroup(self.F("10t e^{−t}", fs, BLEU_CALCUL), self.t("= 10 ×", fs),
                             self.frac(self.t("t", fs), self.F("e^{t}", fs))).arrange(RIGHT, buff=0.18), 2.15, xl)
        self.au_mot("10 fois t sur")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.col(self.t("Par croissances comparées :", 32, JAUNE_TITRE), 1.0, xl)
        self.au_mot("Par croissances")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.col(VGroup(self.frac(self.t("t", fs), self.F("e^{t}", fs)), self.t("→ 0", fs, VERT_OK)
                             ).arrange(RIGHT, buff=0.2), 0.05, xl)
        self.au_mot("0. Donc la")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        # le point qui glisse le long de la courbe, vers l'axe
        tr = ValueTracker(1.0)
        pt = always_redraw(lambda: Dot(g.G(tr.get_value(), C(tr.get_value())), radius=0.1, color=VERT_OK))
        self.add(pt)
        l4 = self.col(self.t("Donc C(t) → 0", 40, VERT_OK), -0.95, xl)
        self.au_mot("0 : le médicament")
        self.play(FadeIn(l4, scale=1.2), run_time=0.35)
        cad = SurroundingRectangle(l4, color=VERT_OK, buff=0.14, stroke_width=3)
        l5 = self.col(self.t("le médicament quitte le sang", 30, GREY_A), -1.7, xl)
        self.au_mot("le médicament finit")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(cad), tr.animate.set_value(8.8), run_time=1.0)
        pt.clear_updaters()
        asym = Line(g.G(2.5, 0.05), g.G(9.0, 0.05), color=VERT_OK, stroke_width=8)
        l6 = VGroup(self.t("l'axe des abscisses est", 30, VERT_OK), self.t("une asymptote", 30, VERT_OK))
        l6.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(l6, -2.6, xl)
        self.au_mot("asymptote")
        self.play(Create(asym), FadeIn(l6, shift=UP * 0.1), run_time=0.5)
        self.play(Indicate(asym, color=WHITE, scale_factor=1.02), run_time=0.5)
        del cad
        self.attendre_voix(marge=0.6)
