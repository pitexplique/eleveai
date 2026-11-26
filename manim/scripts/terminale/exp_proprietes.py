# exp_proprietes.py
# EleveAI — Maths Tle spé — paysage E2 « Les propriétés de l'exponentielle » (16:9), ceinture ORANGE.
# Micro du coach : exp_proprietes (notion fonction_exponentielle). Centre : sciences.
# Voix : manim/voix/terminale-exp-proprietes.json (validée par Frédéric le 26/11).
#
# Clé de voix → écran :
#   · 00-garde      : le titre, la question (sans calculatrice), la courbe, l'échelle (orange) ;
#   · 01-situation  : Camille, technicienne de labo ; l'erlenmeyer, trois boîtes de Petri
#                     (matin × e², après-midi × e³) et la grande flèche « × ? » de la journée ;
#   · 02-idee       : e² × e³ : deux puis trois cases « e », regroupées en cinq → e⁵ ; 2 + 3 = 5 ;
#   · 03-theoreme   : les quatre règles (produit, quotient, inverse, puissance) et leurs étiquettes ;
#   · 04/04b        : question-pause n° 1 (e⁵ ÷ e² = e³ : B) ;
#   · 05-appliquer  : le soir, la pipette dilue ; e⁵ × e⁻³ = e² sur la droite des exposants ;
#   · 06-piege      : eᵃ + eᵇ ≠ eᵃ⁺ᵇ ; e + e = 2e ≈ 5,44 contre e² ≈ 7,39 (deux barres) ;
#   · 07/07b        : question-pause n° 2 ((eˣ)² × e⁻ˣ = eˣ : A) ;
#   · 08-rediger    : les trois étapes, sur une copie ;
#   · 09/09b        : le défi e⁴ × e⁻¹ / e² = e ≈ 2,72, sur la droite des exposants ;
#   · 10-finale     : ce que tu as appris ; 11-abonne : la fin du 26/11.
# Code couleur : bleu = les exposants qui s'additionnent, rose = ceux qui se soustraient,
#                vert = juste, rouge = le piège.
#
# python -m manim render -qh --disable_caching manim/scripts/terminale/exp_proprietes.py ExpProprietesTerminale -o eleveai-maths-terminale-exp-proprietes --media_dir manim/scripts/terminale/media-exp-proprietes
# Sortie : manim/sorties/terminale/maths/analyse/exp-proprietes/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from exp_commun import *  # noqa: E402,F401,F403

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert 2 + 3 == 5                                                   # 02 : e² × e³ = e⁵
assert math.isclose(math.exp(2) * math.exp(3), math.exp(5))
assert 5 - 2 == 3 and math.isclose(math.exp(5) / math.exp(2), math.exp(3))   # 04b
assert 5 - 3 == 2 and math.isclose(math.exp(5) * math.exp(-3), math.exp(2))  # 05
assert math.isclose(math.exp(-3), 1 / math.exp(3))
assert f"{2 * math.e:.2f}" == "5.44" and f"{math.exp(2):.2f}" == "7.39"     # 06
assert all(math.isclose(math.exp(x) ** 2 * math.exp(-x), math.exp(x)) for x in np.linspace(-2, 2, 41))  # 07b
assert 4 - 1 == 3 and 3 - 2 == 1                                    # 09b
assert math.isclose(math.exp(4) * math.exp(-1) / math.exp(2), math.e) and f"{math.e:.2f}" == "2.72"

AMBRE = JAUNE_TITRE
ROSE = "#f472b6"          # les exposants qui se soustraient
LEVURE = "#facc15"


def boite_petri(r=0.7, n=10, graine=0):
    """Une boîte de Petri vue de dessus : le bord, la gélose, les levures (petits ovales)."""
    rng = np.random.default_rng(graine)
    bord = Circle(radius=r, stroke_color="#cbd5e1", stroke_width=4, fill_color="#fde68a", fill_opacity=0.12)
    rebord = Circle(radius=r * 0.9, stroke_color="#94a3b8", stroke_width=1.5)
    lev = VGroup()
    for _ in range(n):
        a = rng.uniform(0, 2 * PI)
        d = r * 0.75 * math.sqrt(rng.uniform(0, 1))
        e = Ellipse(width=0.13, height=0.09, fill_color=LEVURE, fill_opacity=1, stroke_width=0)
        lev.add(e.rotate(rng.uniform(0, PI)).move_to(P(d * math.cos(a), d * math.sin(a))))
    return VGroup(bord, rebord, lev)


def erlenmeyer(s=1.0):
    """Un erlenmeyer : le verre, le liquide doré, quelques bulles."""
    verre = Polygon(P(-0.15, 0.8), P(0.15, 0.8), P(0.15, 0.3), P(0.6, -0.6), P(-0.6, -0.6), P(-0.15, 0.3),
                    stroke_color=WHITE, stroke_width=3)
    liquide = Polygon(P(-0.35, -0.1), P(0.35, -0.1), P(0.58, -0.58), P(-0.58, -0.58),
                      fill_color="#fbbf24", fill_opacity=0.55, stroke_width=0)
    bulles = VGroup(*[Circle(radius=0.05, fill_color=LEVURE, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for x, y in ((-0.2, -0.4), (0.1, -0.3), (0.25, -0.48), (-0.05, -0.2))])
    return VGroup(liquide, verre, bulles).scale(s)


def pipette(s=1.0):
    """Une pipette : le tube de verre, la poire rouge, une goutte."""
    tube = Rectangle(width=0.12, height=0.9, stroke_color=WHITE, stroke_width=2).move_to(P(0, 0))
    poire = Circle(radius=0.16, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).move_to(P(0, 0.58))
    return VGroup(tube, poire).scale(s)


class ExpProprietesTerminale(ExpBase):
    fichier_marques = "exp_proprietes_marques.json"
    nom_voix = "terminale-exp-proprietes"
    ceinture = "orange"
    titre = "Les propriétés de l'exponentielle"

    # ── outils de la scène ─────────────────────────────────────────────────

    def frac(self, num, den, fs=36, color=WHITE):
        """Une vraie fraction : numérateur, trait, dénominateur (texte, formule ou mobjet)."""
        n = num if isinstance(num, Mobject) else self.F(num, fs, color)
        d = den if isinstance(den, Mobject) else self.F(den, fs, color)
        w = max(n.width, d.width) + 0.16
        barre = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3, color=color)
        n.next_to(barre, UP, buff=0.1)
        d.next_to(barre, DOWN, buff=0.1)
        return VGroup(n, barre, d)

    def facteur(self, color=BLEU_CALCUL):
        """Une case « e » : un facteur e."""
        c = RoundedRectangle(width=0.62, height=0.62, corner_radius=0.1, stroke_color=color, stroke_width=3,
                             fill_color=FOND_CARTE, fill_opacity=1)
        return VGroup(c, Text("e", font_size=34, color=WHITE).move_to(c))

    def fleche(self, a, b, color, sw=6):
        return Arrow(a, b, buff=0, color=color, stroke_width=sw, max_tip_length_to_length_ratio=0.12)

    def etiquette(self, texte, color):
        """Une étiquette (pastille arrondie) pour nommer une règle."""
        t = self.t(texte, 28, color)
        c = SurroundingRectangle(t, buff=0.14, corner_radius=0.14, color=color, stroke_width=2.5,
                                 fill_color=FOND_CARTE, fill_opacity=1)
        return VGroup(c, t)

    def axe_exposants(self, x0, unite, y, n, xfin):
        """La droite des exposants : une flèche et des traits (sans nombres : on les dit)."""
        axe = Arrow(P(x0 - 0.3, y), P(xfin, y), buff=0, color=GREY_B, stroke_width=3,
                    max_tip_length_to_length_ratio=0.04)
        traits = VGroup(*[Line(P(x0 + k * unite, y + 0.09), P(x0 + k * unite, y - 0.09), color=GREY_B,
                               stroke_width=3) for k in range(n + 1)])
        return VGroup(axe, traits)

    # ── la scène ───────────────────────────────────────────────────────────

    def construct(self):
        self.question_garde = [self.t("Comment calculer", 38),
                               self.t("avec des puissances de e,", 38, BLEU_CALCUL),
                               self.t("sans calculatrice ?", 38)]
        self.ecran_garde("Les propriétés", ["Comment calculer", "avec des puissances", "sans calculatrice"])
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question(
            "04",
            [self.t("Que vaut", 36),
             VGroup(self.frac("e^{5}", "e^{2}", 40), self.t("?", 40)).arrange(RIGHT, buff=0.25)],
            [[("2,5", self.F("e^{2,5}", 34))], [("3. C", self.F("e^{3}", 34))], [("7. Mets", self.F("e^{7}", 34))]],
            1, ["Que vaut", "2 ? A"],
            [("Pour une division", VGroup(self.t("Division : on soustrait", 34, ROSE),
                                          self.t("les exposants", 34, ROSE)).arrange(DOWN, aligned_edge=LEFT,
                                                                                     buff=0.08)),
             ("3. La réponse", self.F("e^{5 − 2} = e^{3}", 44, VERT_OK)),
             ("divise les exposants", self.t("✗  A divise les exposants", 32, ROUGE_ERREUR)),
             ("C les additionne", self.t("✗  C les additionne", 32, ROUGE_ERREUR))],
            figure=self.figure_q1)
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question(
            "07",
            [self.t("Simplifie :", 36), self.F("(e^{x})² × e^{−x}", 44)],
            [self.F("e^{x}", 36), self.F("e^{x²}", 36), [("1. Mets", self.t("1", 34))]],
            0, ["Simplifie", "e puissance x, le tout"],
            [("2x : on double", VGroup(self.F("(e^{x})² = e^{2x}", 40, BLEU_CALCUL),
                                       self.t("on double l'exposant", 30, GREY_A)
                                       ).arrange(DOWN, aligned_edge=LEFT, buff=0.1)),
             ("2x moins x", self.F("e^{2x} × e^{−x} = e^{2x − x}", 38, ROSE)),
             ("Il reste", VGroup(self.t("Il reste", 38, VERT_OK), self.F("e^{x}", 46, VERT_OK)
                                 ).arrange(RIGHT, buff=0.25)),
             ("La réponse B", self.t("✗  B met le carré sur x", 32, ROUGE_ERREUR))],
            figure=self.figure_q2)
        fs = 34
        noir = "#0f172a"
        self.ecran_copie("08-rediger", "Au bac : chaque étape, sa règle", "Au bac", [
            ("on transforme", VGroup(self.t("On transforme les puissances", fs, noir),
                                     VGroup(self.t("de puissances :", fs, noir),
                                            self.F("(e^{a})^{n} = e^{na}", fs + 2, "#1d4ed8")
                                            ).arrange(RIGHT, buff=0.25)
                                     ).arrange(DOWN, aligned_edge=LEFT, buff=0.14)),
            ("on regroupe", VGroup(self.t("On regroupe produits et quotients", fs, noir),
                                   self.t("en un seul exposant :", fs, noir),
                                   self.F("e^{a} × e^{b} ÷ e^{c} = e^{a + b − c}", fs + 2, "#1d4ed8")
                                   ).arrange(DOWN, aligned_edge=LEFT, buff=0.14)),
            ("on simplifie", self.t("On simplifie cet exposant.", fs, noir)),
        ])
        self.ecran_defi_e2()
        self.ecran_correction()
        self.ecran_appris([
            ("on additionne", VGroup(self.t("Produit : on additionne les exposants", 38),
                                     self.F("e^{a} × e^{b} = e^{a + b}", 38, BLEU_CALCUL)
                                     ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
            ("on les soustrait", VGroup(self.t("Quotient : on les soustrait", 38),
                                        self.F("e^{a} ÷ e^{b} = e^{a − b}", 38, ROSE)
                                        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
            ("1 sur", VGroup(self.F("e^{−a} =", 40), self.frac("1", "e^{a}", 36)).arrange(RIGHT, buff=0.2)),
            ("Et une somme", VGroup(self.t("Une somme de puissances de e", 38, ROUGE_ERREUR),
                                    self.t("ne se simplifie pas comme un produit", 38, ROUGE_ERREUR)
                                    ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
        ])
        self.ecran_fin_2611()

    # ── 01 : Camille et ses levures ────────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        camille = personne(PEAUX[3], "#7c2d12", "#e2e8f0", longs=True, s=0.95).move_to(P(-5.2, 2.0))
        self.au_mot("Voici Camille")
        nom = self.t("Camille", 36, JAUNE_TITRE).next_to(camille, DOWN, buff=0.2)
        self.play(FadeIn(camille, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("technicienne")
        metier = VGroup(self.t("technicienne", 24, GREY_A), self.t("de laboratoire", 24, GREY_A))
        metier.arrange(DOWN, buff=0.06).next_to(nom, DOWN, buff=0.12)
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        self.au_mot("laboratoire de biologie")
        flacon = erlenmeyer(1.25).move_to(P(-5.2, -1.85))
        self.play(FadeIn(flacon, shift=UP * 0.2), run_time=0.45)
        # les trois boîtes de Petri : la culture grossit
        b1 = boite_petri(0.55, 5, 1).move_to(P(-2.3, 0.9))
        b2 = boite_petri(0.72, 18, 2).move_to(P(0.75, 0.9))
        b3 = boite_petri(0.88, 60, 3).move_to(P(4.65, 0.9))
        self.au_mot("fait pousser des levures")
        self.play(FadeIn(b1, scale=0.6), run_time=0.45)
        self.play(LaggedStart(*[Indicate(l, color=WHITE, scale_factor=1.8) for l in b1[2]], lag_ratio=0.15),
                  run_time=0.6)
        f1 = self.fleche(b1.get_right() + RIGHT * 0.15, b2.get_left() + LEFT * 0.15, BLEU_CALCUL)
        f2 = self.fleche(b2.get_right() + RIGHT * 0.15, b3.get_left() + LEFT * 0.15, BLEU_CALCUL)
        m1 = self.t("le matin", 24, GREY_A).next_to(f1, DOWN, buff=0.2)
        m2 = self.t("l'après-midi", 24, GREY_A).next_to(f2, DOWN, buff=0.2)
        e1 = self.F("× e^{2}", 42, BLEU_CALCUL).next_to(f1, UP, buff=0.25)
        e2 = self.F("× e^{3}", 42, BLEU_CALCUL).next_to(f2, UP, buff=0.25)
        self.au_mot("Le matin")
        self.play(GrowArrow(f1), FadeIn(m1), run_time=0.45)
        self.au_mot("2. L'après-midi")
        self.play(FadeIn(e1, scale=1.3), FadeIn(b2, scale=0.6), GrowArrow(f2), FadeIn(m2), run_time=0.5)
        self.au_mot("3. Par combien")
        self.play(FadeIn(e2, scale=1.3), FadeIn(b3, scale=0.6), run_time=0.5)
        arc = CurvedArrow(b1.get_bottom() + DOWN * 0.1, b3.get_bottom() + DOWN * 0.1, angle=TAU / 7,
                          color=AMBRE, stroke_width=5)
        q = self.t("× ?", 46, AMBRE).move_to(P(0.75, -1.45))
        j = self.t("sur toute la journée", 28, AMBRE).next_to(q, DOWN, buff=0.12)
        self.au_mot("toute la journée")
        self.play(Create(arc), FadeIn(q, scale=1.3), FadeIn(j), run_time=0.7)
        self.insister(q, 1.25)
        self.attendre_voix(marge=0.6)

    # ── 02 : deux facteurs e, puis trois : cinq ────────────────────────────

    def ecran_idee(self):
        self.nouvel_ecran("02-idee")
        self.au_mot("Sur la journée")
        tit = self.lg(self.t("Sur la journée, on multiplie :", 38, JAUNE_TITRE), y=3.1)
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        p1 = self.F("e^{2}", 50, BLEU_CALCUL)
        p2 = self.F("× e^{3}", 50, BLEU_CALCUL)
        l1 = self.lg(p1, p2, y=2.05, buff=0.2)
        self.au_mot("2, fois")
        self.play(FadeIn(p1, scale=1.2), run_time=0.3)
        self.au_mot("3. e puissance 2")
        self.play(FadeIn(p2, scale=1.2), run_time=0.3)
        # e² = e × e
        r2 = self.lg(self.F("e^{2} =", 40), y=0.85)
        c2 = VGroup(*[self.facteur() for _ in range(2)]).arrange(RIGHT, buff=0.13)
        c2.next_to(r2, RIGHT, buff=0.3)
        self.au_mot("2, ce sont")
        self.play(FadeIn(r2, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("deux facteurs")
        self.play(LaggedStart(*[FadeIn(c, scale=1.4) for c in c2], lag_ratio=0.3), run_time=0.5)
        # e³ = e × e × e
        r3 = self.lg(self.F("e^{3} =", 40), y=-0.35)
        c3 = VGroup(*[self.facteur() for _ in range(3)]).arrange(RIGHT, buff=0.13)
        c3.next_to(r3, RIGHT, buff=0.3).align_to(c2, LEFT)
        self.au_mot("3, ce sont")
        self.play(FadeIn(r3, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("trois facteurs")
        self.play(LaggedStart(*[FadeIn(c, scale=1.4) for c in c3], lag_ratio=0.3), run_time=0.6)
        # les cinq, ensemble
        cinq = VGroup(*[self.facteur() for _ in range(5)]).arrange(RIGHT, buff=0.13)
        cinq.move_to(P(0, -1.75)).align_to(P(-6.2, 0), LEFT)
        lc = self.t("cinq facteurs e", 30, GREY_A).next_to(cinq, DOWN, buff=0.2).align_to(cinq, LEFT)
        self.au_mot("En tout")
        self.play(*[TransformFromCopy(a, b) for a, b in zip(list(c2) + list(c3), cinq)], run_time=0.8)
        self.au_mot("cinq facteurs")
        self.play(FadeIn(lc, shift=UP * 0.1), run_time=0.3)
        r5 = self.F("= e^{5}", 52, VERT_OK).next_to(cinq, RIGHT, buff=0.35)
        self.au_mot("5. Les")
        self.play(FadeIn(r5, scale=1.3), run_time=0.35)
        self.au_mot("s'additionnent")
        d = VGroup(self.t("Les exposants", 36, BLEU_CALCUL), self.t("s'additionnent :", 36, BLEU_CALCUL),
                   self.t("2 + 3 = 5", 48, AMBRE)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.col(d, 0.6, xl=1.6)
        self.play(FadeIn(d, shift=UP * 0.1), run_time=0.45)
        cad = self.encadrer(d[2], AMBRE)
        self.insister(VGroup(d[2], cad), 1.12)
        self.attendre_voix(marge=0.6)

    # ── 03 : les quatre règles ─────────────────────────────────────────────

    def ecran_theoreme(self):
        self.nouvel_ecran("03-theoreme")
        self.titre_ecran("Les règles, pour tous réels a et b", "Les règles")
        fs = 42
        x = -6.2

        def regle(gauche, droite, y, ext_g, ext_d, tag, color):
            ligne = VGroup(gauche, droite).arrange(RIGHT, buff=0.2)
            ligne.move_to(P(0, y)).align_to(P(x, 0), LEFT)
            et = self.etiquette(tag, color).move_to(P(0, y)).align_to(P(0.6, 0), LEFT)
            fl = self.fleche(ligne.get_right() + RIGHT * 0.2, et.get_left() + LEFT * 0.1, color, sw=4)
            self.au_mot(ext_g)
            self.play(FadeIn(gauche, shift=RIGHT * 0.15), run_time=0.35)
            self.au_mot(ext_d)
            self.play(FadeIn(droite, shift=RIGHT * 0.15), run_time=0.35)
            self.play(GrowArrow(fl), FadeIn(et, shift=RIGHT * 0.1), run_time=0.4)

        regle(self.F("e^{a} × e^{b}", fs, BLEU_CALCUL), self.F("= e^{a + b}", fs, BLEU_CALCUL), 2.2,
              "e puissance a, fois", "égale e puissance a plus", "produit : on additionne", BLEU_CALCUL)
        regle(self.frac("e^{a}", "e^{b}", 38, ROSE), self.F("= e^{a − b}", fs, ROSE), 0.85,
              "divisé par", "égale e puissance a moins", "quotient : on soustrait", ROSE)
        regle(self.F("e^{−a} =", fs), self.frac("1", "e^{a}", 38), -0.6,
              "e puissance moins a", "1 sur e", "l'inverse", GREY_A)
        regle(self.F("(e^{a})^{n}", fs, AMBRE), self.F("= e^{na}", fs, AMBRE), -1.8,
              "le tout puissance n", "égale e puissance n", "puissance : on multiplie", AMBRE)
        self.attendre_voix(marge=0.6)

    # ── les dessins des questions ──────────────────────────────────────────

    def figure_q1(self):
        """Une grande culture, divisée : une plus petite (aucun nombre)."""
        b1 = boite_petri(0.85, 40, 7).move_to(P(-4.7, 2.25))
        b2 = boite_petri(0.5, 6, 8).move_to(P(-0.9, 2.25))
        fl = self.fleche(b1.get_right() + RIGHT * 0.2, b2.get_left() + LEFT * 0.2, ROSE)
        div = self.t("÷", 44, ROSE).next_to(fl, UP, buff=0.12)
        self.play(FadeIn(b1, scale=0.7), GrowArrow(fl), FadeIn(div), FadeIn(b2, scale=0.7), run_time=0.8)
        return 1.3

    def figure_q2(self):
        g = Graphe((-1.6, 1.6), (0, 5.2), (-6.2, 1.3), (-1.2, 3.2))
        ax = self.sans_audit(g.axes())
        c1 = g.courbe(np.exp, -1.6, 1.6, BLEU_CALCUL, 6)
        c2 = g.courbe(lambda x: math.exp(-x), -1.6, 1.6, ROSE, 6)
        self.play(Create(ax), Create(c1), Create(c2), run_time=0.8)
        return 1.3

    # ── 05 : le soir, la dilution ──────────────────────────────────────────

    def ecran_appliquer(self):
        self.nouvel_ecran("05-appliquer")
        self.au_mot("Appliquons")
        tit = self.lg(self.t("Appliquons", 42, JAUNE_TITRE), y=3.2)
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        camille = personne(PEAUX[3], "#7c2d12", "#e2e8f0", longs=True, s=0.7).move_to(P(-5.4, 1.45))
        boite = boite_petri(0.78, 45, 11).move_to(P(-3.0, 1.0))
        pip = pipette(1.0).move_to(P(-3.0, 2.45))
        self.au_mot("Le soir")
        self.play(FadeIn(camille, shift=UP * 0.15), FadeIn(boite, scale=0.7), run_time=0.5)
        self.au_mot("dilue sa culture")
        ls = VGroup(self.t("le soir :", 28, GREY_A), self.t("on dilue", 28, GREY_A)).arrange(DOWN, buff=0.06)
        ls.next_to(camille, DOWN, buff=0.15)
        self.play(FadeIn(pip, shift=DOWN * 0.3), FadeIn(ls), run_time=0.4)
        gouttes = VGroup(*[Circle(radius=0.07, fill_color="#7dd3fc", fill_opacity=1, stroke_width=0)
                           .move_to(P(-3.0, 1.9)) for _ in range(3)])
        lev = boite[2]
        self.play(LaggedStart(*[g.animate.move_to(P(-3.0 + 0.25 * (k - 1), 1.1)).set_opacity(0)
                                for k, g in enumerate(gouttes)], lag_ratio=0.3),
                  *[lev[i].animate.set_opacity(0.15) for i in range(0, len(lev)) if i % 5 != 0],
                  run_time=0.9)
        xl = 0.3
        fs = 38
        l1 = self.col(VGroup(self.t("dilution :", fs, ROSE), self.F("× e^{−3}", 44, ROSE)).arrange(RIGHT, buff=0.2),
                      2.25, xl)
        self.au_mot("3. Sur la journée")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = self.col(self.t("Sur la journée entière :", 34), 1.35, xl)
        self.au_mot("journée entière")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        a = self.F("e^{5}", 46, BLEU_CALCUL)
        b = self.F("× e^{−3}", 46, ROSE)
        c = self.F("= e^{2}", 46, VERT_OK)
        l3 = self.col(VGroup(a, b, c).arrange(RIGHT, buff=0.2), 0.4, xl)
        l4 = self.col(self.t("5 − 3 = 2", 38, AMBRE), -0.5, xl)
        # la droite des exposants
        x0, u = -6.0, 1.0
        axe = self.axe_exposants(x0, u, -2.3, 5, -0.5)
        fb = self.fleche(P(x0, -0.9), P(x0 + 5 * u, -0.9), BLEU_CALCUL)
        tb = self.t("+5", 32, BLEU_CALCUL).move_to(P(x0 + 2.5 * u, -0.55))
        fr = self.fleche(P(x0 + 5 * u, -1.6), P(x0 + 2 * u, -1.6), ROSE)
        tr = self.t("−3", 32, ROSE).move_to(P(x0 + 3.5 * u, -1.25))
        pointe = DashedLine(P(x0 + 2 * u, -1.6), P(x0 + 2 * u, -2.3), color=VERT_OK, stroke_width=3,
                            dash_length=0.08)
        t2 = self.t("2", 32, VERT_OK).move_to(P(x0 + 2 * u, -2.65))
        self.au_mot("5 fois")
        self.play(FadeIn(a, scale=1.2), Create(axe), GrowArrow(fb), FadeIn(tb), run_time=0.5)
        self.au_mot("3 donne")
        self.play(FadeIn(b, scale=1.2), GrowArrow(fr), FadeIn(tr), run_time=0.45)
        self.au_mot("2. Et")
        self.play(FadeIn(c, scale=1.2), FadeIn(l4, shift=UP * 0.1), Create(pointe), FadeIn(t2, scale=1.4),
                  run_time=0.45)
        l5 = self.col(VGroup(self.t("multiplier par", 34), self.F("e^{−3}", 40, ROSE)).arrange(RIGHT, buff=0.2),
                      -1.4, xl)
        l6 = self.col(VGroup(self.t("= diviser par", 34), self.F("e^{3}", 40, ROSE)).arrange(RIGHT, buff=0.2),
                      -2.2, xl)
        self.au_mot("puissance moins 3, c'est")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.au_mot("c'est diviser")
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.35)
        cad = self.encadrer(VGroup(l5, l6), ROSE)
        del cad
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège de la somme ──────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre_ecran("Voilà le piège !", "Voilà le piège", ROUGE_ERREUR)
        x = -6.2
        l1 = self.lg(self.F("e^{a} + e^{b}", 46), self.t("≠", 48, ROUGE_ERREUR), self.F("e^{a + b}", 46),
                     y=2.1, x=x, buff=0.3)
        self.au_mot("ce n'est pas")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.4)
        self.play(Indicate(l1[1], color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.5)
        ok = self.t("✓ pour un produit", 34, VERT_OK)
        non = self.t("✗ pas pour une somme", 34, ROUGE_ERREUR)
        l2 = self.lg(ok, non, y=1.05, x=x, buff=0.5)
        self.au_mot("pour un produit")
        self.play(FadeIn(ok, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("pas pour une somme")
        self.play(FadeIn(non, shift=RIGHT * 0.15), run_time=0.3)
        a = self.F("e^{1} + e^{1}", 42)
        b = self.t("= 2e", 42, ROUGE_ERREUR)
        c = self.t("≈ 5,44", 42, ROUGE_ERREUR)
        l3 = self.lg(a, b, c, y=-0.15, x=x, buff=0.25)
        d = self.F("e^{2}", 46, BLEU_CALCUL)
        e = self.t("≈ 7,39", 42, BLEU_CALCUL)
        l4 = self.lg(d, e, y=-1.35, x=x, buff=0.25)
        # les barres
        base, k = -2.9, 0.45  # barres sous « pas pour une somme » (planche HD 26/11)
        sol = Line(P(1.7, base), P(5.2, base), color=GREY_B, stroke_width=3)
        b2 = Rectangle(width=1.1, height=5.44 * k, fill_color=ROUGE_ERREUR, fill_opacity=0.85, stroke_width=0)
        b2.move_to(P(2.6, base + 5.44 * k / 2))
        b1 = Rectangle(width=1.1, height=7.39 * k, fill_color=BLEU_CALCUL, fill_opacity=0.85, stroke_width=0)
        b1.move_to(P(4.3, base + 7.39 * k / 2))
        e2 = self.t("2e", 34, ROUGE_ERREUR).next_to(b2, DOWN, buff=0.15)
        e1 = self.F("e^{2}", 34, BLEU_CALCUL).next_to(b1, DOWN, buff=0.15)
        self.au_mot("1 plus e")
        self.play(FadeIn(a, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("2 fois e")
        self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("5,44")
        self.play(FadeIn(c, scale=1.3), Create(sol), GrowFromEdge(b2, DOWN), FadeIn(e2), run_time=0.5)
        self.au_mot("Alors que")
        self.play(FadeIn(d, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("7,39")
        self.play(FadeIn(e, scale=1.3), GrowFromEdge(b1, DOWN), FadeIn(e1), run_time=0.5)
        ne = self.t("≠", 60, ROUGE_ERREUR).move_to(P(2.6, base + 5.44 * k + 0.45))  # au-dessus de la barre rouge, sans toucher la bleue
        self.play(FadeIn(ne, scale=1.5), run_time=0.35)
        self.insister(VGroup(l3, l4), 1.08)
        del l2
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi_e2(self):
        fs = 58
        n1 = self.F("e^{4}", fs, BLEU_CALCUL)
        n2 = self.F("× e^{−1}", fs, ROSE)
        num = VGroup(n1, n2).arrange(RIGHT, buff=0.2)
        den = self.F("e^{2}", fs, ROSE)
        w = num.width + 0.3
        barre = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=4, color=WHITE)
        num.next_to(barre, UP, buff=0.15)
        den.next_to(barre, DOWN, buff=0.15)
        fr = VGroup(n1, n2, barre, den)
        VGroup(num, barre, den).move_to(P(-2.6, 0.05))
        fr._fixe = True
        fr._etapes = ["4, fois", "1, le tout", "le tout divisé", "2. Mets"]

        def figure():
            b = boite_petri(0.95, 30, 21).move_to(P(3.6, 0.3))
            self.play(FadeIn(b, scale=0.7), run_time=0.4)

        self.ecran_defi([
            ("Simplifie", self.t("Simplifie :", 44)),
            (None, fr),
        ], figure=figure, y0=2.3)

    # ── 09b : la correction du défi ────────────────────────────────────────

    def ecran_correction(self):
        self.nouvel_ecran("09b-correction")
        self.titre_ecran("Correction", "Correction")
        x = -6.2
        fs = 40
        self.au_mot("En haut")
        l1 = self.lg(self.t("En haut :", 34, GREY_A), y=2.25, x=x)
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.3)
        a = self.F("e^{4} ×", fs, BLEU_CALCUL)
        b = self.F("e^{−1}", fs, ROSE)
        self.lg(a, b, y=1.45, x=x, buff=0.2)
        l3 = self.lg(self.t("4 − 1 = 3", fs, AMBRE), self.F("→  e^{3}", fs), y=0.6, x=x, buff=0.35)
        l4 = self.lg(self.t("puis", 34, GREY_A), self.F("÷ e^{2}", fs, ROSE), y=-0.3, x=x, buff=0.25)
        l5 = self.lg(self.t("3 − 2 = 1", fs, AMBRE), y=-1.15, x=x)
        r1 = self.F("e^{1} = e", 44, VERT_OK)
        r2 = self.t("≈ 2,72", 44, VERT_OK)
        l6 = self.lg(r1, r2, y=-2.1, x=x, buff=0.25)
        # la droite des exposants, à droite
        x0, u = 1.2, 1.1
        axe = self.axe_exposants(x0, u, -1.6, 4, 6.3)
        f1 = self.fleche(P(x0, 0.9), P(x0 + 4 * u, 0.9), BLEU_CALCUL)
        t1 = self.t("+4", 32, BLEU_CALCUL).move_to(P(x0 + 2 * u, 1.25))
        f2 = self.fleche(P(x0 + 4 * u, 0.1), P(x0 + 3 * u, 0.1), ROSE)
        t2 = self.t("−1", 32, ROSE).move_to(P(x0 + 3.5 * u, 0.45))
        f3 = self.fleche(P(x0 + 3 * u, -0.7), P(x0 + 1 * u, -0.7), ROSE)
        t3 = self.t("−2", 32, ROSE).move_to(P(x0 + 2 * u, -0.35))
        pointe = DashedLine(P(x0 + u, -0.7), P(x0 + u, -1.6), color=VERT_OK, stroke_width=3, dash_length=0.08)
        tf = self.t("1", 32, VERT_OK).move_to(P(x0 + u, -1.95))
        self.au_mot("4 fois")
        self.play(FadeIn(a, shift=RIGHT * 0.15), Create(axe), GrowArrow(f1), FadeIn(t1), run_time=0.5)
        self.au_mot("1 : 4")
        self.play(FadeIn(b, shift=RIGHT * 0.15), GrowArrow(f2), FadeIn(t2), run_time=0.4)
        self.au_mot("3, donc")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("2 : 3")
        self.play(FadeIn(l4, shift=RIGHT * 0.15), GrowArrow(f3), FadeIn(t3), run_time=0.45)
        self.au_mot("1. Le résultat")
        self.play(FadeIn(l5, shift=RIGHT * 0.15), Create(pointe), FadeIn(tf, scale=1.4), run_time=0.45)
        self.au_mot("c'est-à-dire")
        self.play(FadeIn(r1, scale=1.2), run_time=0.35)
        self.au_mot("2,72")
        self.play(FadeIn(r2, scale=1.2), run_time=0.35)
        cad = self.encadrer(l6)
        del cad
        self.attendre_voix(marge=0.6)
