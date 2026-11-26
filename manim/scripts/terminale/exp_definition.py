# exp_definition.py
# EleveAI — Maths Tle spé — paysage E1 « La fonction exponentielle » (16:9), ceinture ORANGE.
# Micro du coach : exp_definition (notion fonction_exponentielle). Centre : reseaux-sociaux.
# Voix : manim/voix/terminale-exp-definition.json (validée par Frédéric le 26/11).
#
# Clé de voix → écran :
#   · 00-garde      : le titre, la question, la courbe de e puissance x, l'échelle (orange) ;
#   · 01-situation  : Inès, community manager ; sa vidéo, les spectateurs qui la partagent
#                     (1 → 2 → 4 → 8) et la courbe des vues qui se creuse ;
#   · 02-idee       : f = les vues ; la tangente (vitesse) a la pente de la hauteur ; f′ = f,
#                     f(0) = 1 → la fonction exponentielle, notée e puissance x ;
#   · 03-theoreme   : ce qu'il faut savoir (ℝ, dérivée, e⁰ = 1, e ≈ 2,72, > 0, croissante) ;
#   · 04/04b        : question-pause n° 1 (eˣ = 0 : aucune solution, B) ;
#   · 05-appliquer  : la tangente en 0, y = x + 1, la courbe au-dessus ;
#   · 06-piege      : e² = e × e ≈ 7,39 ≠ 2e ≈ 5,44 (deux barres) ;
#   · 07/07b        : question-pause n° 2 (e² < e³, C) ;
#   · 08-rediger    : les trois propriétés, sur une copie ;
#   · 09/09b        : le défi e⁻¹, e⁰, e¹ rangés (0,37 ; 1 ; 2,72) ;
#   · 10-finale     : ce que tu as appris ; 11-abonne : la fin du 26/11.
# Code couleur : bleu = la courbe, ambre = ce qu'on regarde, vert = juste, rouge = le piège.
#
# python -m manim render -qh --disable_caching manim/scripts/terminale/exp_definition.py ExpDefinitionTerminale -o eleveai-maths-terminale-exp-definition --media_dir manim/scripts/terminale/media-exp-definition
# Sortie : manim/sorties/terminale/maths/analyse/exp-definition/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from exp_commun import *  # noqa: E402,F401,F403

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert f"{math.e:.2f}" == "2.72"
assert f"{math.exp(2):.2f}" == "7.39" and f"{2 * math.e:.2f}" == "5.44"
assert f"{math.exp(-1):.2f}" == "0.37"
assert all(math.exp(x) >= x + 1 for x in np.linspace(-3, 3, 601))   # au-dessus de la tangente
assert math.exp(-1) < 1 < math.e                                     # le rangement du défi

AMBRE = JAUNE_TITRE


def telephone(s=1.0):
    """Un téléphone : la coque, l'écran, le triangle « lecture »."""
    coque = RoundedRectangle(width=1.3, height=2.3, corner_radius=0.2, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    ecran = RoundedRectangle(width=1.1, height=1.85, corner_radius=0.08, fill_color="#1e3a8a", fill_opacity=1,
                             stroke_width=0)
    lecture = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.22).rotate(-PI / 2)
    coeur = Text("♥", font_size=26, color=ROUGE_ERREUR).move_to(P(0.33, -0.7))
    return VGroup(coque, ecran, lecture, coeur).scale(s)


class ExpDefinitionTerminale(ExpBase):
    fichier_marques = "exp_definition_marques.json"
    nom_voix = "terminale-exp-definition"
    ceinture = "orange"
    titre = "La fonction exponentielle"

    def construct(self):
        self.question_garde = [self.t("Quelle fonction grandit exactement", 38),
                               self.t("à la vitesse de sa propre valeur ?", 38, BLEU_CALCUL)]
        self.ecran_garde("La fonction exponentielle", ["Quelle fonction", "à la vitesse"])
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question(
            "04",
            [self.t("Combien de solutions", 34), VGroup(self.t("pour", 34), self.F("e^{x} = 0  ?", 40)).arrange(RIGHT, buff=0.2)],
            [[("une,", "une :"), ("0. B", self.F("x = 0", 32))], "aucune",
             [("une,", "une :"), ("1. Mets", self.F("x = 1", 32))]],
            1, ["Combien", "0 a-t-elle"],
            [("toujours strictement", self.F("e^{x} : toujours strictement positif", 34, BLEU_CALCUL)),
             ("0. L'équation", self.t("il ne vaut jamais 0", 36)),
             ("aucune solution", self.t("→ aucune solution", 38, VERT_OK)),
             ("La réponse A", self.t("A confond avec", 34, ROUGE_ERREUR)),
             ("1, et pas", self.F("e^{0} = 1, et pas 0", 36, ROUGE_ERREUR))],
            figure=self.figure_q1, croix=[("La réponse A", 0)])
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question(
            "07",
            [self.t("La fonction est", 32), self.t("strictement croissante.", 32, BLEU_CALCUL),
             VGroup(self.t("Compare", 32), self.F("e^{2}", 38), self.t("et", 32),
                    self.F("e^{3}", 38)).arrange(RIGHT, buff=0.18)],
            [[("e puissance 2", self.F("e^{2}", 34)), ("plus grand", self.F("> e^{3}", 34))],
             [("ils sont", self.F("e^{2} = e^{3}", 34))],
             [("e puissance 2", self.F("e^{2}", 34)), ("plus petit", self.F("< e^{3}", 34))]],
            2, ["La fonction", "strictement croissante", "3 ?"],
            [("3, et une", self.t("2 < 3", 40, AMBRE)),
             ("garde l'ordre", self.t("une fonction croissante garde l'ordre", 32)),
             ("Donc e puissance 2", self.F("donc  e^{2} < e^{3}", 40, VERT_OK)),
             ("Pas besoin", self.t("Pas besoin de calculatrice !", 32, GREY_A))],
            figure=self.figure_q2)
        fs = 34
        noir = "#0f172a"
        self.ecran_copie("08-rediger", "Au bac : on cite les propriétés", "Au bac", [
            ("pour tout réel", VGroup(self.t("Pour tout réel x,", fs, noir),
                                      self.F("e^{x} est strictement positif.", fs, noir)
                                      ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
            ("la dérivée de e", self.F("La dérivée de e^{x} est e^{x}.", fs, noir)),
            ("la dérivée est donc", VGroup(self.F("Donc la dérivée est strictement positive :", fs, noir),
                                           self.t("exp est strictement croissante sur ℝ.", fs, noir)
                                           ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
        ])
        self.ecran_defi([
            ("Donne une valeur", self.t("Donne une valeur approchée de :", 40)),
            (None, [("1, de e", self.F("e^{−1}", 56, BLEU_CALCUL)), ("0 et de", self.F("e^{0}", 56, BLEU_CALCUL)),
                    ("1. Puis", self.F("e^{1}", 56, BLEU_CALCUL))]),
            ("Puis range", self.t("Puis range-les du plus petit au plus grand.", 36, AMBRE)),
            ("du plus petit", self.figure_defi()),
        ], y0=2.3)
        self.ecran_correction()
        self.ecran_appris([
            ("égale à sa dérivée", self.t("la fonction égale à sa dérivée", 38)),
            ("0. Elle est", self.F("e^{0} = 1", 40)),
            ("toujours strictement", self.F("e^{x} > 0  toujours", 40)),
            ("strictement croissante", self.t("strictement croissante sur ℝ", 38)),
            ("2,72", self.t("e ≈ 2,72", 40, BLEU_CALCUL)),
        ])
        self.ecran_fin_2611()

    # ── 01 : Inès et la vidéo qui tourne ───────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        ines = personne(PEAUX[2], "#3b1f0e", "#be185d", longs=True, s=0.95).move_to(P(-4.9, 1.75))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 36, JAUNE_TITRE).next_to(ines, DOWN, buff=0.2)
        self.play(FadeIn(ines, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("community manager")
        metier = self.t("community manager", 24, GREY_A).next_to(nom, DOWN, buff=0.12)
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        self.au_mot("réseaux sociaux")
        bulles = VGroup(*[VGroup(Circle(radius=0.2, fill_color=c, fill_opacity=1, stroke_width=0),
                                 Text(s, font_size=20, color=WHITE, weight=BOLD))
                          for c, s in (("#2563eb", "f"), ("#db2777", "◎"), ("#111827", "♪"))])
        for b in bulles:
            b[1].move_to(b[0])
        bulles.arrange(RIGHT, buff=0.15).next_to(metier, DOWN, buff=0.2)
        self.play(LaggedStart(*[FadeIn(b, scale=1.4) for b in bulles], lag_ratio=0.2), run_time=0.5)
        tel = telephone(0.8).move_to(P(-2.0, 1.75))
        self.au_mot("Une de ses vidéos")
        self.play(FadeIn(tel, shift=UP * 0.2), run_time=0.4)
        self.au_mot("tourner")
        self.play(Rotate(tel[2], angle=2 * PI), Indicate(tel[3], scale_factor=1.6), run_time=0.6)
        # les spectateurs : 1 → 2 → 4 → 8
        gens = []
        col = [PEAUX[i % 5] for i in range(16)]
        niveaux = [[P(-2.0, 0.2)], [P(-2.8, -0.55), P(-1.2, -0.55)],
                   [P(-3.25 + 0.75 * i, -1.35) for i in range(4)],
                   [P(-3.5 + 0.42 * i, -2.15) for i in range(8)]]
        self.au_mot("Chaque spectateur")
        traits = VGroup()
        points = []
        for k, niv in enumerate(niveaux):
            pts = VGroup(*[Circle(radius=0.13 - 0.015 * k, fill_color=col[(k * 3 + i) % 16], fill_opacity=1,
                                  stroke_color=WHITE, stroke_width=1).move_to(p) for i, p in enumerate(niv)])
            gens.append(pts)
            if k == 0:
                lien = VGroup(Line(tel.get_bottom(), niv[0], stroke_width=2, color=GREY_C))
            else:
                lien = VGroup(*[Line(niveaux[k - 1][i // 2], p, stroke_width=2, color=GREY_C)
                                for i, p in enumerate(niv)])
            traits.add(lien)
            points.append(pts)
        self.play(Create(traits[0]), FadeIn(points[0], scale=1.5), run_time=0.4)
        self.au_mot("la montre")
        self.play(Create(traits[1]), FadeIn(points[1], scale=1.5), run_time=0.4)
        self.au_mot("à d'autres")
        self.play(Create(traits[2]), FadeIn(points[2], scale=1.5), run_time=0.35)
        self.play(Create(traits[3]), FadeIn(points[3], scale=1.5), run_time=0.35)
        # la courbe des vues
        g = Graphe((0, 3.0), (0, 20), (0.3, -2.4), (5.6, 2.1))
        ax = self.sans_audit(g.axes())
        lj = self.t("jours", 26, GREY_A).next_to(g.G(3.0, 0), DOWN, buff=0.12).align_to(g.G(3.0, 0), RIGHT)
        lv = self.t("vues", 26, GREY_A).next_to(g.G(0, 20), RIGHT, buff=0.15)
        self.au_mot("Alors, plus")
        self.play(Create(ax), FadeIn(lj), FadeIn(lv), run_time=0.5)
        tt = ValueTracker(0.01)
        trace = always_redraw(lambda: g.courbe(np.exp, 0, max(tt.get_value(), 0.02), EXP, 6, n=50))
        pt = always_redraw(lambda: Dot(g.G(tt.get_value(), math.exp(tt.get_value())), radius=0.09, color=AMBRE))
        self.add(trace, pt)
        self.play(tt.animate.set_value(2.0), run_time=self.jusqua("plus elle en gagne"), rate_func=linear)
        self.au_mot("plus elle en gagne")
        self.play(tt.animate.set_value(2.98), run_time=1.0, rate_func=linear)
        trace.clear_updaters()
        pt.clear_updaters()
        phrase = VGroup(self.t("plus de vues", 30, AMBRE), self.t("→ elle en gagne plus vite", 30, AMBRE))
        phrase.arrange(DOWN, aligned_edge=LEFT, buff=0.1).move_to(P(2.95, 2.95))
        self.play(FadeIn(phrase, shift=UP * 0.1), Indicate(trace, color=AMBRE, scale_factor=1.03), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 02 : f′ = f et f(0) = 1 ────────────────────────────────────────────

    def ecran_idee(self):
        self.nouvel_ecran("02-idee")
        g = Graphe((-1.0, 2.0), (0, 7.6), (-6.0, -2.9), (-0.9, 2.9))
        ax = self.sans_audit(g.axes())
        lj = self.t("x (jours)", 24, GREY_A).next_to(g.G(2.0, 0), DOWN, buff=0.12).align_to(g.G(2.0, 0), RIGHT)
        lv = self.t("vues (millions)", 24, GREY_A).next_to(g.G(0, 7.6), RIGHT, buff=0.15)
        c = g.courbe(np.exp, -1.0, 2.0, EXP, 6)
        fs = 34
        self.au_mot("Traduisons")
        tit = self.col(self.t("Traduisons", 40, JAUNE_TITRE), 3.25, xl=0.1)
        self.play(FadeIn(tit, shift=DOWN * 0.1), Create(ax), FadeIn(lj), FadeIn(lv), run_time=0.5)
        self.au_mot("On appelle")
        l1 = self.col(self.t("f(x) = nombre de vues", fs), 2.45, xl=0.1)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(c), run_time=0.7)
        self.au_mot("au bout de x jours")
        l1b = self.col(self.t("en millions, au bout de x jours", fs, GREY_A), 1.9, xl=0.1)
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("La vitesse")
        l2 = self.col(self.t("vitesse de croissance = f′", fs), 1.15, xl=0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        # la tangente : pente = hauteur
        x0 = 1.3
        y0 = math.exp(x0)
        tg = g.droite(y0, x0, y0, x0 - 0.75, x0 + 0.55, AMBRE, 5)
        pt = Dot(g.G(x0, y0), radius=0.09, color=AMBRE)
        h = DashedLine(g.G(x0, 0), g.G(x0, y0), color=AMBRE, stroke_width=3, dash_length=0.1)
        self.au_mot("elle est égale")
        self.play(Create(tg), FadeIn(pt), Create(h), run_time=0.6)
        self.au_mot("f prime égale f")
        l3 = self.col(self.F("f′ = f", 44, AMBRE), 0.35, xl=0.1)
        self.play(FadeIn(l3, scale=1.3), run_time=0.35)
        self.play(Indicate(h, color=WHITE), Indicate(tg, color=WHITE), run_time=0.6)
        self.au_mot("au départ")
        p0 = Dot(g.G(0, 1), radius=0.1, color=VERT_OK)
        self.play(FadeIn(p0, scale=1.8), run_time=0.3)
        self.au_mot("1. Une seule")
        l4 = self.col(self.t("f(0) = 1", 44, VERT_OK), -0.45, xl=0.1)
        self.play(FadeIn(l4, scale=1.3), run_time=0.35)
        self.au_mot("Une seule fonction")
        l5 = self.col(self.t("Une seule fonction vérifie les deux :", fs), -1.3, xl=0.1)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.au_mot("la fonction exponentielle")
        l6 = self.col(self.t("la fonction exponentielle", 38, BLEU_CALCUL), -1.95, xl=0.1)
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.35)
        self.au_mot("On la note")
        l7 = self.col(self.F("x ↦ e^{x}", 54, BLEU_CALCUL), -2.85, xl=0.3)
        self.play(Write(l7), run_time=0.6)
        cad = self.encadrer(l7, BLEU_CALCUL)
        self.insister(VGroup(l7, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 03 : ce qu'il faut savoir ──────────────────────────────────────────

    def ecran_theoreme(self):
        self.nouvel_ecran("03-theoreme")
        self.titre_ecran("Ce qu'il faut savoir", "Ce qu'il faut savoir")
        g = Graphe((-2.0, 1.4), (0, 4.4), (2.6, -1.6), (5.9, 2.4))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -2.0, 1.4, EXP, 6)
        fs = 36
        x = -6.2
        l1 = self.lg(self.t("exp est définie sur ℝ (tous les réels)", fs), y=2.2, x=x, larg=8.3)
        self.au_mot("définie sur")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), Create(ax), Create(c), run_time=0.8)
        l2 = self.lg(self.F("(e^{x})′ = e^{x}", 42, BLEU_CALCUL), self.t("sa dérivée, c'est elle-même", 30, GREY_A),
                     y=1.35, x=x, buff=0.35, larg=8.3)
        self.au_mot("Sa dérivée")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.4)
        l3 = self.lg(self.F("e^{0} = 1", 42), y=0.5, x=x)
        p0 = Dot(g.G(0, 1), radius=0.09, color=VERT_OK)
        self.au_mot("1. Le nombre")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), FadeIn(p0, scale=1.8), run_time=0.4)
        l4 = self.lg(self.t("e ≈ 2,72", 42, AMBRE), y=-0.3, x=x)
        p1 = Dot(g.G(1, math.e), radius=0.09, color=AMBRE)
        h1 = DashedLine(g.G(1, 0), g.G(1, math.e), color=AMBRE, stroke_width=3, dash_length=0.1)
        self.au_mot("2,72")
        self.play(FadeIn(l4, shift=RIGHT * 0.15), Create(h1), FadeIn(p1, scale=1.8), run_time=0.45)
        l5 = self.lg(self.F("e^{x} > 0  pour tout x", 40, VERT_OK), y=-1.1, x=x)
        self.au_mot("toujours strictement")
        sous = g.G(-2.0, 0)
        zone = Rectangle(width=g.G(1.4, 0)[0] - sous[0], height=0.12, fill_color=VERT_OK, fill_opacity=0.5,
                         stroke_width=0).move_to(P((g.G(1.4, 0)[0] + sous[0]) / 2, g.G(0, 0)[1] + 0.08))
        self.play(FadeIn(l5, shift=RIGHT * 0.15), FadeIn(zone), run_time=0.4)
        self.play(Indicate(c, color=VERT_OK, scale_factor=1.03), run_time=0.6)
        l6 = self.lg(self.t("dérivée > 0 :", 36), self.t("strictement croissante", 36, BLEU_CALCUL),
                     y=-1.9, x=x, larg=8.3)
        self.au_mot("Sa dérivée est donc")
        self.play(FadeIn(l6[0], shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("strictement croissante")
        self.play(FadeIn(l6[1], shift=RIGHT * 0.15), run_time=0.35)
        fl = Arrow(g.G(-1.6, 1.4), g.G(0.9, 3.6), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.15)
        self.play(GrowArrow(fl), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── les dessins des questions ──────────────────────────────────────────

    def figure_q1(self):
        g = Graphe((-3.0, 1.3), (-0.4, 3.8), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -3.0, 1.3, EXP, 6)
        self.play(Create(ax), Create(c), run_time=0.8)
        return 1.3

    def figure_q2(self):
        g = Graphe((-0.3, 3.2), (0, 25), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -0.3, 3.2, EXP, 6)
        fl = Arrow(g.G(0.6, 6), g.G(2.2, 20), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.15)
        self.play(Create(ax), Create(c), GrowArrow(fl), run_time=0.8)
        return 1.3

    def figure_defi(self):
        """Trois cases vides sur une droite : l'ordre à trouver (posé au mot, pas rangé)."""
        axe = Arrow(P(-5.6, -1.85), P(1.6, -1.85), buff=0, color=GREY_B, stroke_width=3,
                    max_tip_length_to_length_ratio=0.04)
        cases = VGroup(*[VGroup(RoundedRectangle(width=1.0, height=0.8, corner_radius=0.1, stroke_color=AMBRE,
                                                 stroke_width=3), self.t("?", 40, AMBRE)).move_to(P(x, -1.2))
                         for x in (-4.4, -2.0, 0.4)])
        signes = VGroup(*[self.t("<", 44, AMBRE).move_to(P(x, -1.2)) for x in (-3.2, -0.8)])
        g = VGroup(axe, cases, signes)
        g._fixe = True
        return g

    # ── 05 : la tangente en 0 ──────────────────────────────────────────────

    def ecran_appliquer(self):
        self.nouvel_ecran("05-appliquer")
        g = Graphe((-2.6, 1.6), (-1.6, 5.0), (-6.2, -2.9), (-0.4, 2.6))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -2.6, 1.6, EXP, 6)
        self.au_mot("0. La courbe")
        tit = self.col(self.t("Appliquons : la tangente en 0", 38, JAUNE_TITRE), 3.2, xl=-6.2)
        self.play(FadeIn(tit, shift=DOWN * 0.1), Create(ax), Create(c), run_time=0.8)
        p0 = Dot(g.G(0, 1), radius=0.1, color=AMBRE)
        self.au_mot("La courbe passe")
        self.play(FadeIn(p0, scale=1.8), run_time=0.3)
        fs = 36
        xl = 0.3
        l1 = self.col(self.t("Point : (0 ; 1)", fs, AMBRE), 2.2, xl)
        self.au_mot("1. La pente")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = self.col(VGroup(self.t("pente :", fs), self.F("f′(0) = e^{0}", fs)).arrange(RIGHT, buff=0.18), 1.3, xl)
        self.au_mot("La pente")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l2b = self.col(self.t("= 1", fs, AMBRE), 1.3, l2.get_right()[0] + 0.15)
        self.au_mot("1. La tangente")
        self.play(FadeIn(l2b, scale=1.3), run_time=0.3)
        tg = g.droite(1, 0, 1, -2.5, 1.5, VERT_OK, 5)
        self.au_mot("La tangente a donc")
        self.play(Create(tg), run_time=0.6)
        l3 = self.col(self.t("y = x + 1", 46, VERT_OK), 0.3, xl)
        self.au_mot("1. Près")
        self.play(FadeIn(l3, scale=1.3), run_time=0.35)
        cad = self.encadrer(l3)
        self.au_mot("Près de 0")
        loupe = Circle(radius=0.75, color=AMBRE, stroke_width=4).move_to(g.G(0, 1))
        l4 = self.col(VGroup(self.t("près de 0 : la courbe", 32), self.t("colle à la droite", 32)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.08), -0.75, xl)
        self.play(Create(loupe), FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.au_mot("toujours au-dessus")
        l5 = self.col(self.t("et reste toujours au-dessus", 32, BLEU_CALCUL), -1.6, xl)
        ecart = VGroup(*[Line(g.G(x, x + 1), g.G(x, math.exp(x)), color=BLEU_CALCUL, stroke_width=3)
                         for x in (-2.2, -1.5, 1.0, 1.35)])
        self.play(FadeIn(l5, shift=UP * 0.1), FadeOut(loupe), Create(ecart), run_time=0.5)
        self.play(Indicate(c, color=AMBRE, scale_factor=1.02), run_time=0.6)
        del cad
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège e² ≠ 2e ──────────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre_ecran("Voilà le piège !", "Voilà le piège", ROUGE_ERREUR)
        x = -6.2
        l1 = self.lg(self.F("e^{x}", 46, BLEU_CALCUL), self.t("≠", 46, ROUGE_ERREUR), self.t("e × x", 46),
                     y=2.1, x=x, buff=0.3)
        self.au_mot("ce n'est pas")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.4)
        self.play(Indicate(l1[1], color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.5)
        l2 = self.lg(self.F("e^{2} = e × e", 42, BLEU_CALCUL), y=0.9, x=x)
        self.au_mot("e fois e")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.35)
        l2b = self.col(self.t("≈ 7,39", 42, BLEU_CALCUL), 0.9, l2.get_right()[0] + 0.2)
        self.au_mot("7,39")
        l3 = self.lg(self.t("2 × e", 42, ROUGE_ERREUR), y=-0.3, x=x)
        # les barres
        base = -2.6
        k = 0.62
        b1 = Rectangle(width=1.1, height=7.39 * k, fill_color=BLEU_CALCUL, fill_opacity=0.85, stroke_width=0)
        b1.move_to(P(2.6, base + 7.39 * k / 2))
        b2 = Rectangle(width=1.1, height=5.44 * k, fill_color=ROUGE_ERREUR, fill_opacity=0.85, stroke_width=0)
        b2.move_to(P(4.3, base + 5.44 * k / 2))
        sol = Line(P(1.7, base), P(5.2, base), color=GREY_B, stroke_width=3)
        e1 = self.F("e^{2}", 34, BLEU_CALCUL).next_to(b1, DOWN, buff=0.15)
        e2 = self.t("2e", 34, ROUGE_ERREUR).next_to(b2, DOWN, buff=0.15)
        self.play(FadeIn(l2b, scale=1.3), Create(sol), GrowFromEdge(b1, DOWN), run_time=0.5)
        self.play(FadeIn(e1), run_time=0.2)
        self.au_mot("2 fois e")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.35)
        l3b = self.col(self.t("≈ 5,44", 42, ROUGE_ERREUR), -0.3, l3.get_right()[0] + 0.2)
        self.au_mot("5,44")
        self.play(FadeIn(l3b, scale=1.3), GrowFromEdge(b2, DOWN), FadeIn(e2), run_time=0.5)
        self.au_mot("L'exponentielle")
        l4 = self.lg(self.t("une puissance, pas un produit", 36, JAUNE_TITRE), y=-1.6, x=x, larg=7.4)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.insister(l4, 1.12)
        self.attendre_voix(marge=0.6)

    # ── 09b : la correction du défi ────────────────────────────────────────

    def ecran_correction(self):
        self.nouvel_ecran("09b-correction")
        self.titre_ecran("Correction", "Correction")
        g = Graphe((-1.8, 1.4), (0, 4.2), (-6.1, -2.7), (-1.2, 2.3))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -1.8, 1.4, EXP, 6)
        self.play(Create(ax), Create(c), run_time=0.6)
        fs = 38
        xl = 0.0

        def repere(x, color):
            y = math.exp(x)
            return VGroup(DashedLine(g.G(x, 0), g.G(x, y), color=color, stroke_width=3, dash_length=0.1),
                          Dot(g.G(x, y), radius=0.09, color=color))

        r1, r2, r3 = repere(-1, BLEU_CALCUL), repere(0, BLEU_CALCUL), repere(1, BLEU_CALCUL)
        l1 = self.col(self.F("e^{−1} ≈ 0,37", fs), 2.25, xl)
        self.au_mot("0,37")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(r1), run_time=0.4)
        l2 = self.col(self.F("e^{0} = 1", fs), 1.35, xl)
        self.au_mot("1. e puissance")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(r2), run_time=0.4)
        l3 = self.col(self.F("e^{1} = e ≈ 2,72", fs), 0.45, xl)
        self.au_mot("2,72")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(r3), run_time=0.4)
        self.au_mot("La fonction est croissante")
        l4 = self.col(self.t("−1 < 0 < 1  donne :", 34, GREY_A), -0.5, xl)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        l5 = self.col(self.F("e^{−1} < e^{0} < e^{1}", 42, VERT_OK), -1.35, xl)
        self.au_mot("le même ordre")
        self.play(FadeIn(l5, scale=1.2), run_time=0.4)
        cad = self.encadrer(l5)
        self.au_mot("les trois sont positifs")
        l6 = self.col(self.t("tous les trois > 0", 34, VERT_OK), -2.3, xl)
        self.play(FadeIn(l6, shift=UP * 0.1), Indicate(r1[1], scale_factor=2), run_time=0.5)
        del cad
        self.attendre_voix(marge=0.6)
