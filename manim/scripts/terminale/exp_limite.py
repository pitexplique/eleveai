# exp_limite.py
# EleveAI — Maths Tle spé — paysage E5 « Limites avec l'exponentielle » (16:9), ceinture BLEUE.
# Micro du coach : exp_limite (notion fonction_exponentielle). Centre : jeux-video.
# Voix : manim/voix/terminale-exp-limite.json (validée par Frédéric le 26/11).
#
# Clé de voix → écran :
#   · 00-garde      : le titre, la question (la course vers l'infini), la courbe, l'échelle (bleue) ;
#   · 01-situation  : Yanis, concepteur de niveaux, sa manette ; l'écran du jeu : le héros (x³)
#                     contre le monstre (e puissance x), les jauges de force au niveau 2 ;
#   · 02-idee       : les deux limites de base sur la courbe, l'asymptote y = 0 en −∞ ;
#   · 03-theoreme   : les croissances comparées (eˣ/xⁿ → +∞, xⁿeˣ → 0 en −∞), la course
#                     de x², x³ et eˣ sur un repère ;
#   · 04/04b        : question-pause n° 1 (1/eˣ → 0, C) ;
#   · 05-appliquer  : niveau 2 (8 contre 7,39) puis niveau 10 (22 026 contre 1 000) en barres ;
#   · 06-piege      : eˣ − x, forme indéterminée, on factorise par x ; l'écart qui grandit ;
#   · 07/07b        : question-pause n° 2 (x e⁻ˣ → 0, A) ;
#   · 08-rediger    : les trois temps de la rédaction, sur une copie ;
#   · 09/09b        : le défi eˣ/(x + 1) → +∞ ;
#   · 10-finale     : ce que tu as appris ; 11-abonne : la fin du 26/11.
# Code couleur : bleu = les ennemis (eˣ), vert = le joueur (x³), ambre = ce qu'on regarde,
#                rouge = le piège.
#
# ⚠️ « 22 026 » et « 1 000 » : l'audit colle les chiffres (« 22026 ») et ne les retrouve plus
#   dans la voix (« 22 026 ») : ces deux textes sont marqués sans audit, et posés à la main
#   sur le mot exact (au_mot("22 026"), au_mot("1 000")).
#
# python -m manim render -qh --disable_caching manim/scripts/terminale/exp_limite.py ExpLimiteTerminale -o eleveai-maths-terminale-exp-limite --media_dir manim/scripts/terminale/media-exp-limite
# Sortie : manim/sorties/terminale/maths/analyse/exp-limite/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from exp_commun import *  # noqa: E402,F401,F403

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert 2 ** 3 == 8 and 8 > math.exp(2)                         # au niveau 2, le joueur est devant
assert f"{math.exp(2):.2f}" == "7.39"
assert round(math.exp(10)) == 22026 and 10 ** 3 == 1000         # au niveau 10
assert math.exp(10) > 10 ** 3
assert math.exp(40) / 40 ** 3 > 1e11                            # eˣ/x³ → +∞
assert 1 / math.exp(40) < 1e-15                                 # 1/eˣ → 0
assert 40 * math.exp(-40) < 1e-15                               # x e⁻ˣ → 0
assert all(abs((math.exp(x) - x) - x * (math.exp(x) / x - 1)) < 1e-9 for x in (1.0, 2.5, 7.0))
assert all(abs(math.exp(x) / (x + 1) - (math.exp(x) / x) * (x / (x + 1))) < 1e-9 for x in (1.0, 3.0, 9.0))
assert abs(40 / 41 - 1) < 0.03                                  # x/(x + 1) → 1
assert (-30) ** 3 * math.exp(-30) > -1e-8                       # xⁿ eˣ → 0 en −∞

AMBRE = JAUNE_TITRE
JOUEUR = VERT_OK
ENNEMI = BLEU_CALCUL


# ── les dessins du jeu ──────────────────────────────────────────────────────

def manette(s=1.0):
    """Une manette de jeu : le corps, les poignées, la croix, quatre boutons."""
    gris = "#334155"
    corps = RoundedRectangle(width=1.9, height=0.85, corner_radius=0.38, fill_color=gris, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    poignees = VGroup(*[Circle(radius=0.34, fill_color=gris, fill_opacity=1, stroke_color=GREY_B,
                               stroke_width=2).move_to(P(dx, -0.3)) for dx in (-0.62, 0.62)])
    croix = VGroup(Rectangle(width=0.4, height=0.12, fill_color=GREY_A, fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.12, height=0.4, fill_color=GREY_A, fill_opacity=1, stroke_width=0)
                   ).move_to(P(-0.5, 0.05))
    boutons = VGroup(*[Circle(radius=0.075, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.5 + dx, 0.05 + dy))
                       for c, (dx, dy) in zip(("#22c55e", "#ef4444", "#3b82f6", "#facc15"),
                                              ((0, 0.14), (0.14, 0), (-0.14, 0), (0, -0.14)))])
    return VGroup(poignees, corps, croix, boutons).scale(s)


def heros(s=1.0):
    """Le joueur (vert) : tête, corps, jambes, épée levée."""
    tete = Circle(radius=0.2, fill_color=PEAUX[3], fill_opacity=1, stroke_width=0).move_to(P(0, 0.72))
    casque = Arc(radius=0.21, start_angle=0.1, angle=PI - 0.2, stroke_color=JOUEUR, stroke_width=8).move_to(P(0, 0.84))
    corps = RoundedRectangle(width=0.5, height=0.55, corner_radius=0.1, fill_color=JOUEUR, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.22))
    jambes = VGroup(Line(P(-0.12, -0.05), P(-0.18, -0.45), stroke_width=7, color="#166534"),
                    Line(P(0.12, -0.05), P(0.18, -0.45), stroke_width=7, color="#166534"))
    lame = Line(P(0.32, 0.3), P(0.72, 1.0), stroke_width=7, color=GREY_A)
    garde = Line(P(0.22, 0.42), P(0.44, 0.26), stroke_width=6, color=AMBRE)
    return VGroup(jambes, corps, tete, casque, lame, garde).scale(s)


def ennemi(s=1.0):
    """Un ennemi (bleu) : un monstre rond à piques, yeux et sourcils fâchés."""
    piques = VGroup(*[Triangle(fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).scale(0.16)
                      .move_to(P(0.36 * math.cos(a), 0.36 * math.sin(a) + 0.08)).rotate(a - PI / 2)
                      for a in (PI / 2 - 0.7, PI / 2, PI / 2 + 0.7)])
    corps = Circle(radius=0.42, fill_color=ENNEMI, fill_opacity=1, stroke_width=0)
    yeux = VGroup(*[VGroup(Circle(radius=0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                           Circle(radius=0.045, fill_color=BLACK, fill_opacity=1, stroke_width=0)
                           ).move_to(P(dx, 0.06)) for dx in (-0.15, 0.15)])
    sourcils = VGroup(Line(P(-0.27, 0.24), P(-0.06, 0.16), stroke_width=5, color=BLACK),
                      Line(P(0.27, 0.24), P(0.06, 0.16), stroke_width=5, color=BLACK))
    bouche = ArcBetweenPoints(P(-0.14, -0.2), P(0.14, -0.2), angle=-PI / 2, stroke_color=BLACK, stroke_width=4)
    return VGroup(piques, corps, yeux, sourcils, bouche).scale(s)


class ExpLimiteTerminale(ExpBase):
    fichier_marques = "exp_limite_marques.json"
    nom_voix = "terminale-exp-limite"
    ceinture = "bleue"
    titre = "Limites avec l'exponentielle"

    # ── outils de cette scène : fraction et limite (sans LaTeX) ────────────

    def frac(self, num, den, fs=36, color=WHITE):
        """Une vraie fraction : numérateur, trait, dénominateur (texte, formule ou mobjet)."""
        n = num if isinstance(num, Mobject) else self.F(num, fs, color)
        d = den if isinstance(den, Mobject) else self.F(den, fs, color)
        w = max(n.width, d.width) + 0.16
        barre = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3, color=color)
        n.next_to(barre, UP, buff=0.1)
        d.next_to(barre, DOWN, buff=0.1)
        return VGroup(n, barre, d)

    def lim(self, sous, *corps, fs=36, color=WHITE):
        """« lim » avec « x → +∞ » en petit dessous, puis le reste de la ligne."""
        l = Text("lim", font_size=fs, color=color)
        s = Text(sous, font_size=int(fs * 0.55), color=color)
        tete = VGroup(l, s).arrange(DOWN, buff=0.06)
        return VGroup(tete, *corps).arrange(RIGHT, buff=0.18)

    def un_cache(self, fs=36, color=WHITE):
        """Un « 1 » invisible : il prend sa place, et n'apparaît que quand la voix le dit."""
        u = Text("1", font_size=fs, color=color)
        u.set_opacity(0)
        return u

    # ── la scène ───────────────────────────────────────────────────────────

    def construct(self):
        self.question_garde = [self.t("Qui gagne la course vers l'infini :", 38),
                               self.t("l'exponentielle, ou les puissances de x ?", 38, BLEU_CALCUL)]
        self.ecran_garde("Limites avec", ["Qui gagne", "l'exponentielle, ou"])
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question(
            "04",
            [self.t("Quand x → +∞,", 36),
             VGroup(self.t("vers quoi tend", 36), self.frac("1", "e^{x}", 38),
                    self.t("?", 38)).arrange(RIGHT, buff=0.2)],
            ["+∞", "1", "0"],
            2, ["Quand x tend", "1 sur e"],
            [("Le dénominateur", self.F("e^{x} devient immense", 34, ENNEMI)),
             ("1 divisé", self.t("1 ÷ immense = tout petit", 34)),
             ("0. La réponse", self.t("→ la limite est 0", 38, VERT_OK)),
             ("La réponse A", VGroup(self.t("A oublie qu'on divise", 34, ROUGE_ERREUR),
                                    self.t("par l'exponentielle", 34, ROUGE_ERREUR)
                                    ).arrange(DOWN, aligned_edge=LEFT, buff=0.08))],
            figure=self.figure_q1, croix=[("La réponse A", 0)])
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question(
            "07",
            [self.t("Quand x → +∞,", 36), self.t("vers quoi tend", 36),
             VGroup(self.F("x e^{−x}", 42), self.t("?", 38)).arrange(RIGHT, buff=0.2)],
            ["0", "+∞", "1"],
            0, ["Quand x tend", "vers quoi", "x fois"],
            [("c'est x divisé", VGroup(self.F("x e^{−x} =", 36), self.frac("x", "e^{x}", 34))
              .arrange(RIGHT, buff=0.18)),
             ("Par croissances", VGroup(self.t("croissances comparées :", 34, AMBRE),
                                       self.t("l'exponentielle l'emporte en bas", 34, AMBRE)
                                       ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)),
             ("0. La réponse", self.t("→ le quotient tend vers 0", 36, VERT_OK)),
             ("La réponse B", self.t("B ne regarde que le facteur x", 30, ROUGE_ERREUR))],
            figure=self.figure_q2, croix=[("La réponse B", 1)])
        fs = 34
        noir = "#0f172a"
        self.ecran_copie("08-rediger", "Au bac : on nomme l'argument", "Au bac", [
            ("on repère", VGroup(self.t("On repère la forme,", fs, noir),
                                 self.t("et on dit si elle est indéterminée.", fs, noir)
                                 ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
            ("on factorise", VGroup(self.t("On factorise, ou on réécrit,", fs, noir),
                                    VGroup(self.t("pour faire apparaître", fs, noir),
                                           self.frac("e^{x}", "x^{n}", fs, noir)).arrange(RIGHT, buff=0.2)
                                    ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
            ("on conclut", VGroup(self.t("On conclut en écrivant :", fs, noir),
                                  self.t("« par croissances comparées ».", fs, noir)
                                  ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)),
        ])
        self.ecran_defi_e5()
        self.ecran_correction()
        self.ecran_appris([
            ("e puissance x tend", self.F("e^{x} → +∞  en +∞", 40)),
            ("0 en moins", self.F("e^{x} → 0  en −∞", 40)),
            ("l'emporte", VGroup(self.t("en +∞, l'exponentielle l'emporte", 38, BLEU_CALCUL),
                                 self.t("sur toute puissance de x", 38, BLEU_CALCUL)
                                 ).arrange(DOWN, aligned_edge=LEFT, buff=0.1)),
            ("devant une forme", VGroup(self.t("forme indéterminée :", 38),
                                        self.t("on factorise avant de conclure", 38)
                                        ).arrange(DOWN, aligned_edge=LEFT, buff=0.1)),
        ])
        self.ecran_fin_2611()

    # ── 01 : Yanis et son jeu ──────────────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        yanis = personne(PEAUX[1], "#1f1307", "#7c3aed", s=0.95).move_to(P(-4.7, 1.85))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 36, JAUNE_TITRE).next_to(yanis, DOWN, buff=0.2)
        self.play(FadeIn(yanis, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("concepteur de niveaux")
        metier = VGroup(self.t("concepteur de niveaux", 22, GREY_A),
                        self.t("de jeux vidéo", 22, GREY_A)).arrange(DOWN, buff=0.06).next_to(nom, DOWN, buff=0.12)
        self.play(FadeIn(metier[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("jeux vidéo")
        pad = manette(0.95).next_to(metier, DOWN, buff=0.35)
        self.play(FadeIn(metier[1]), FadeIn(pad, shift=UP * 0.15), run_time=0.45)
        # l'écran du jeu
        ecran = RoundedRectangle(width=7.4, height=4.3, corner_radius=0.2, fill_color="#0f172a", fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=4).move_to(P(2.0, 0.6))
        sol = Line(P(-1.4, -0.35), P(5.4, -0.35), color="#475569", stroke_width=5)
        self.au_mot("Dans son jeu")
        self.play(FadeIn(ecran), Create(sol), run_time=0.45)
        niv_x = self.t("niveau x", 34, AMBRE).move_to(P(2.0, 2.45))
        self.au_mot("au niveau x")
        self.play(FadeIn(niv_x, shift=DOWN * 0.1), run_time=0.35)
        h = heros(1.25).move_to(P(0.2, 0.45)).align_to(P(0, -0.35), DOWN)
        lh = self.t("joueur : x³", 32, JOUEUR).move_to(P(0.3, -0.85))
        self.au_mot("la force du joueur")
        self.play(FadeIn(h, shift=UP * 0.2), run_time=0.4)
        self.au_mot("x au cube")
        self.play(FadeIn(lh, shift=UP * 0.1), run_time=0.35)
        m = ennemi(1.3).move_to(P(3.8, 0.4)).align_to(P(0, -0.35), DOWN)
        le = VGroup(self.t("ennemis :", 32, ENNEMI), self.F("e^{x}", 36, ENNEMI)).arrange(RIGHT, buff=0.15)
        le.move_to(P(3.8, -0.85))
        self.au_mot("celle des ennemis")
        self.play(FadeIn(m, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("e puissance x")
        self.play(FadeIn(le, shift=UP * 0.1), run_time=0.35)
        # les jauges de force au niveau 2 (8 contre 7,39 : même échelle, nombres non dits ici)
        k = 0.2
        cadre_j = VGroup(*[Rectangle(width=8 * k + 0.4, height=0.26, stroke_color=GREY_B, stroke_width=2)
                           .move_to(P(cx, 1.95)) for cx in (0.3, 3.8)])
        jh = Rectangle(width=8 * k, height=0.2, fill_color=JOUEUR, fill_opacity=1, stroke_width=0)
        jh.move_to(cadre_j[0]).align_to(cadre_j[0].get_left() + RIGHT * 0.03, LEFT)
        je = Rectangle(width=math.exp(2) * k, height=0.2, fill_color=ENNEMI, fill_opacity=1, stroke_width=0)
        je.move_to(cadre_j[1]).align_to(cadre_j[1].get_left() + RIGHT * 0.03, LEFT)
        niv2 = self.t("niveau 2", 34, AMBRE).move_to(niv_x)
        self.au_mot("2, le joueur")
        self.play(FadeOut(niv_x), FadeIn(niv2), FadeIn(cadre_j), run_time=0.35)
        self.play(GrowFromEdge(jh, LEFT), GrowFromEdge(je, LEFT), run_time=0.6)
        self.au_mot("est devant")
        devant = self.t("le joueur est devant !", 28, JOUEUR).move_to(P(2.0, -1.28))
        self.play(FadeIn(devant, shift=UP * 0.1), Indicate(jh, color=WHITE), run_time=0.5)
        self.au_mot("Mais Yanis")
        self.play(Indicate(yanis, color=AMBRE, scale_factor=1.05), run_time=0.5)
        self.au_mot("qui gagne")
        q = self.t("niveaux très grands : qui gagne ?", 34, AMBRE).move_to(P(2.0, -2.45))
        fl = Arrow(P(-1.0, -3.15), P(5.0, -3.15), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.05)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("très grands")
        self.play(GrowArrow(fl), Indicate(q, color=WHITE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 02 : les deux limites de base ──────────────────────────────────────

    def ecran_idee(self):
        self.nouvel_ecran("02-idee")
        g = Graphe((-5.0, 1.7), (-0.6, 5.6), (-6.3, -2.8), (-0.8, 2.7))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -5.0, 1.7, EXP, 6)
        lc = self.F("y = e^{x}", 32, EXP).next_to(g.G(0, 5.2), LEFT, buff=0.25)
        self.au_mot("D'abord")
        tit = self.col(self.t("Les deux limites de base", 40, JAUNE_TITRE), 3.2, xl=0.1)
        self.play(FadeIn(tit, shift=DOWN * 0.1), Create(ax), Create(c), FadeIn(lc), run_time=0.8)
        xl = 0.1
        l1 = self.col(self.lim("x→+∞", self.F("e^{x} = +∞", 40, ENNEMI), fs=40), 1.9, xl)
        f1 = Arrow(g.G(0.6, 2.6), g.G(1.5, 5.3), buff=0, color=AMBRE, stroke_width=6,
                   max_tip_length_to_length_ratio=0.2)
        self.au_mot("Quand x tend vers plus")
        self.play(FadeIn(l1, shift=UP * 0.1), GrowArrow(f1), run_time=0.5)
        l2 = self.col(self.lim("x→−∞", self.F("e^{x} =", 40, ENNEMI), fs=40), 0.55, xl)
        zero = self.t("0", 40, VERT_OK).next_to(l2, RIGHT, buff=0.18)
        self.au_mot("Quand x tend vers moins")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("0. La courbe")
        self.play(FadeIn(zero, scale=1.4), run_time=0.3)
        # le point qui glisse vers la gauche, collé à l'axe
        tt = ValueTracker(0.5)
        pt = always_redraw(lambda: Dot(g.G(tt.get_value(), math.exp(tt.get_value())), radius=0.1, color=AMBRE))
        self.au_mot("La courbe s'approche")
        self.add(pt)
        self.play(tt.animate.set_value(-4.8), run_time=self.jusqua("sans jamais", mini=0.8), rate_func=smooth)
        pt.clear_updaters()
        self.au_mot("sans jamais")
        l3 = self.col(self.t("sans jamais toucher l'axe", 32, GREY_A), -0.55, xl)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(pt, scale_factor=1.8), run_time=0.5)
        asy = DashedLine(g.G(-5.0, 0), g.G(1.7, 0), color=AMBRE, stroke_width=5, dash_length=0.15)
        self.au_mot("la droite")
        self.play(Create(asy), run_time=0.6)
        l4 = self.col(self.t("y = 0 : asymptote en −∞", 38, AMBRE), -1.45, xl)
        self.au_mot("0 est une")
        self.play(FadeIn(l4, scale=1.2), run_time=0.4)
        cad = self.encadrer(l4, AMBRE)
        del cad
        self.attendre_voix(marge=0.6)

    # ── 03 : les croissances comparées ─────────────────────────────────────

    def ecran_theoreme(self):
        self.nouvel_ecran("03-theoreme")
        self.titre_ecran("Les croissances comparées", "Les croissances")
        x = -6.2
        l1 = self.lg(self.t("Pour tout entier naturel n :", 36), y=2.25, x=x)
        self.au_mot("Pour tout")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.4)
        l2 = self.lg(self.lim("x→+∞", self.frac("e^{x}", "x^{n}", 40, ENNEMI), self.t("= +∞", 40, ENNEMI),
                              fs=40), y=1.05, x=x)
        self.au_mot("e puissance x divisé")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.5)
        cad = SurroundingRectangle(l2, color=ENNEMI, buff=0.15, stroke_width=3)
        self.au_mot("quand x tend")
        self.play(Create(cad), run_time=0.4)
        # la course : x², x³, eˣ sur [0 ; 6,6]
        g = Graphe((0, 6.6), (0, 760), (2.5, -1.85), (6.45, 1.75))
        ax = self.sans_audit(g.axes())
        c2 = g.courbe(lambda t: t ** 2, 0, 6.6, GREY_B, 4)
        c3 = g.courbe(lambda t: t ** 3, 0, 6.6, JOUEUR, 5)
        ce = g.courbe(np.exp, 0, 6.6, EXP, 6)
        n2 = self.t("x²", 26, GREY_B).next_to(g.G(6.6, 43.6), UP, buff=0.08).shift(LEFT * 0.15)
        n3 = self.t("x³", 26, JOUEUR).next_to(g.G(6.6, 287.5), UP, buff=0.08).shift(LEFT * 0.15)
        ne = self.F("e^{x}", 30, EXP).next_to(g.G(6.1, 446), LEFT, buff=0.2)
        self.au_mot("En plus l'infini")
        self.play(Create(ax), Create(c2), Create(c3), FadeIn(n2), FadeIn(n3), run_time=0.8)
        self.au_mot("l'emporte")
        self.play(Create(ce), FadeIn(ne), run_time=0.8)
        l3 = self.lg(self.t("l'exponentielle l'emporte", 34, BLEU_CALCUL), y=-0.35, x=x)
        l3b = self.lg(self.t("sur toute puissance de x", 34, BLEU_CALCUL), y=-0.9, x=x)
        self.play(FadeIn(l3, shift=RIGHT * 0.15), FadeIn(l3b, shift=RIGHT * 0.15),
                  Indicate(ce, color=AMBRE, scale_factor=1.03), run_time=0.6)
        l4 = self.lim("x→−∞", self.F("x^{n} e^{x} =", 38, AMBRE), fs=38, color=AMBRE)
        l4 = self.lg(l4, y=-2.1, x=x)
        zero = self.t("0", 38, AMBRE).next_to(l4, RIGHT, buff=0.18)
        self.au_mot("Et en moins")
        self.play(FadeIn(l4, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("0.")
        self.play(FadeIn(zero, scale=1.4), run_time=0.3)
        self.encadrer(VGroup(l4, zero), AMBRE)
        self.attendre_voix(marge=0.6)

    # ── les dessins des questions ──────────────────────────────────────────

    def figure_q1(self):
        g = Graphe((-0.6, 4.2), (-0.15, 1.9), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(lambda t: math.exp(-t), -0.6, 4.2, AMBRE, 6)
        m = ennemi(0.55).move_to(P(-0.4, 2.7))
        self.play(Create(ax), Create(c), FadeIn(m, scale=1.3), run_time=0.8)
        return 1.3

    def figure_q2(self):
        g = Graphe((0, 7.5), (-0.04, 0.42), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(lambda t: t * math.exp(-t), 0, 7.5, AMBRE, 6)
        h = heros(0.45).move_to(P(-0.6, 2.75))
        m = ennemi(0.5).move_to(P(0.6, 2.75))
        self.play(Create(ax), Create(c), FadeIn(h, scale=1.3), FadeIn(m, scale=1.3), run_time=0.8)
        return 1.3

    # ── 05 : niveau 2, puis niveau 10 ──────────────────────────────────────

    def ecran_appliquer(self):
        self.nouvel_ecran("05-appliquer")
        yanis = personne(PEAUX[1], "#1f1307", "#7c3aed", s=0.5).move_to(P(-6.0, 2.6))
        nom = self.t("Yanis", 30, JAUNE_TITRE).next_to(yanis, RIGHT, buff=0.2)
        pad = manette(0.5).next_to(nom, RIGHT, buff=0.3)
        self.au_mot("Revenons à Yanis")
        self.play(FadeIn(yanis, shift=UP * 0.15), FadeIn(nom), FadeIn(pad), run_time=0.5)
        base = -2.45
        # deux petits graphiques séparés, chacun à SA propre échelle, un trait vertical entre eux
        sol2 = Line(P(-6.3, base), P(-3.85, base), color=GREY_B, stroke_width=3)
        sol10 = Line(P(-3.25, base), P(-0.35, base), color=GREY_B, stroke_width=3)
        separe = DashedLine(P(-3.55, base - 0.5), P(-3.55, 1.9), color=GREY_C, stroke_width=3, dash_length=0.12)

        def barre(xc, hauteur, couleur):
            return Rectangle(width=0.72, height=hauteur, fill_color=couleur, fill_opacity=0.9,
                             stroke_width=0).move_to(P(xc, base + hauteur / 2))

        k2 = 0.4                               # niveau 2 : 1 unité de force = 0,4
        bj2, be2 = barre(-5.55, 8 * k2, JOUEUR), barre(-4.6, math.exp(2) * k2, ENNEMI)
        k10 = 4.75 / math.exp(10)              # niveau 10 : une autre échelle
        bj10, be10 = barre(-2.35, 1000 * k10, JOUEUR), barre(-1.25, math.exp(10) * k10, ENNEMI)
        ih2 = heros(0.42).next_to(bj2, UP, buff=0.08)
        ie2 = ennemi(0.45).next_to(be2, UP, buff=0.08)
        ih10 = heros(0.42).next_to(bj10, UP, buff=0.08)
        ie10 = ennemi(0.45).next_to(be10, UP, buff=0.08)
        n2 = self.t("niveau 2", 30, AMBRE).move_to(P(sol2.get_center()[0], base - 0.35))
        n10 = self.t("niveau 10", 30, AMBRE).move_to(P(sol10.get_center()[0], base - 0.35))
        xl = 0.4
        fs = 36
        self.au_mot("2, le joueur")
        self.play(Create(sol2), FadeIn(n2), Create(separe), run_time=0.4)
        l1 = self.col(self.t("2³ =", fs, JOUEUR), 2.55, xl)
        self.au_mot("2 au cube")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l1b = self.t("8", fs, JOUEUR).next_to(l1, RIGHT, buff=0.15)
        self.au_mot("8, et")
        self.play(FadeIn(l1b, scale=1.4), GrowFromEdge(bj2, DOWN), FadeIn(ih2), run_time=0.45)
        l2 = self.col(self.F("e^{2} ≈", fs, ENNEMI), 1.8, xl)
        self.au_mot("2 vaut")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l2b = self.t("7,39", fs, ENNEMI).next_to(l2, RIGHT, buff=0.15)
        self.au_mot("7,39")
        self.play(FadeIn(l2b, scale=1.4), GrowFromEdge(be2, DOWN), FadeIn(ie2), run_time=0.45)
        self.play(Indicate(bj2, color=WHITE, scale_factor=1.05), run_time=0.4)
        l3 = self.col(self.lim("x→+∞", self.frac("e^{x}", "x³", 36, AMBRE), self.t("= +∞", 36, AMBRE),
                               fs=36, color=AMBRE), 0.75, xl)
        self.au_mot("Mais e puissance")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        self.au_mot("10, e puissance")
        self.play(Create(sol10), FadeIn(n10), run_time=0.3)
        l4 = self.col(self.F("e^{10} ≈", fs, ENNEMI), -0.4, xl)
        self.au_mot("10 vaut")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        l4b = self.sans_audit(self.t("22 026", fs, ENNEMI)).next_to(l4, RIGHT, buff=0.15)
        self.au_mot("22 026")
        self.play(FadeIn(l4b, scale=1.4), GrowFromEdge(be10, DOWN), FadeIn(ie10), run_time=0.6)
        l5 = self.col(self.sans_audit(self.t("joueur : 10³ = 1 000", fs, JOUEUR)), -1.1, xl)
        self.au_mot("1 000")
        self.play(FadeIn(l5, shift=UP * 0.1), GrowFromEdge(bj10, DOWN), FadeIn(ih10), run_time=0.45)
        self.au_mot("Les ennemis")
        l6 = self.col(self.t("les ennemis l'emportent !", 36, ENNEMI), -1.73, xl)
        self.play(FadeIn(l6, shift=UP * 0.1), Indicate(be10, color=WHITE, scale_factor=1.04), run_time=0.5)
        self.insister(ie10, 1.3)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège eˣ − x ───────────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre_ecran("Voilà le piège !", "Voilà le piège", ROUGE_ERREUR)
        x = -6.2
        l1 = self.lg(self.t("En +∞ :", 36), y=2.45, x=x)
        self.au_mot("En plus l'infini")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.3)
        f1 = self.F("e^{x} − x", 40, ENNEMI).next_to(l1, RIGHT, buff=0.25)
        # le dessin : eˣ et la droite y = x, l'écart qui grandit
        g = Graphe((0, 3.1), (0, 23), (2.7, -1.85), (6.45, 2.5))
        ax = self.sans_audit(g.axes())
        ce = g.courbe(np.exp, 0, 3.1, EXP, 5)
        cd = g.courbe(lambda t: t, 0, 3.1, GREY_B, 4)
        ne = self.F("e^{x}", 28, EXP).next_to(g.G(2.85, 17.3), LEFT, buff=0.15)
        nd = self.t("x", 28, GREY_B).next_to(g.G(3.1, 3.1), UP, buff=0.1)
        self.au_mot("e puissance x moins x")
        self.play(FadeIn(f1, shift=RIGHT * 0.15), Create(ax), Create(ce), Create(cd), FadeIn(ne), FadeIn(nd),
                  run_time=0.7)
        l2 = self.lg(self.t("donne  +∞ − (+∞)", 36, AMBRE), y=1.85, x=x)
        self.au_mot("plus l'infini moins plus")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.4)
        l3 = self.lg(self.t("forme indéterminée !", 38, ROUGE_ERREUR), y=1.25, x=x)
        self.au_mot("forme indéterminée")
        self.play(FadeIn(l3, scale=1.2), run_time=0.35)
        self.insister(l3, 1.12)
        l4 = self.lg(self.t("✗ on ne conclut pas tout de suite", 28, GREY_A), y=0.7, x=x)
        self.au_mot("On ne conclut")
        self.play(FadeIn(l4, shift=RIGHT * 0.15), run_time=0.35)
        # on factorise par x
        a = self.F("e^{x} − x = x × (", 38)
        fr = self.frac("e^{x}", "x", 36, ENNEMI)
        b = self.t("− 1 )", 38)
        lf = self.lg(a, fr, b, y=-0.25, x=x, buff=0.15)
        self.au_mot("On factorise par x")
        tf = self.t("on factorise par x", 32, AMBRE).next_to(lf, UP, buff=0.08).align_to(P(x, 0), LEFT)
        self.play(FadeOut(l4), FadeIn(tf), run_time=0.3)
        self.au_mot("x fois")
        self.play(FadeIn(a, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("e puissance x sur x, moins")
        self.play(FadeIn(fr, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("1. e puissance")
        self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.3)
        l6 = self.lg(self.frac("e^{x}", "x", 30, ENNEMI), self.t("→ +∞", 34, ENNEMI), y=-1.4, x=x)
        self.au_mot("e puissance x sur x tend")
        self.play(FadeIn(l6, shift=RIGHT * 0.15), run_time=0.4)
        l7 = self.lg(self.t("donc la parenthèse → +∞", 32), y=-2.3, x=x)
        self.au_mot("donc la parenthèse")
        self.play(FadeIn(l7, shift=RIGHT * 0.15), run_time=0.35)
        l8 = self.lg(self.t("et le produit → +∞", 36, VERT_OK), y=-2.95, x=x)
        ecart = VGroup(*[Line(g.G(t, t), g.G(t, math.exp(t)), color=VERT_OK, stroke_width=4)
                         for t in (1.0, 2.0, 2.9)])
        self.au_mot("et le produit")
        self.play(FadeIn(l8, shift=RIGHT * 0.15), Create(ecart), run_time=0.5)
        self.encadrer(l8)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi (le « 1 » du dénominateur n'arrive qu'avec la voix) ──

    def ecran_defi_e5(self):
        t0 = self.nouvel_ecran("09-defi")
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.5), self.t("À toi de jouer !", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3)
        tete.to_edge(UP, buff=0.5)
        h = heros(1.0).move_to(P(3.0, 0.5))
        m = ennemi(1.5).move_to(P(5.0, 0.6))
        pq = self.t("?", 60, AMBRE).next_to(m, UP, buff=0.15)
        self.play(FadeIn(tete, shift=DOWN * 0.2), FadeIn(h, scale=1.2), FadeIn(m, scale=1.2), run_time=0.45)
        l1 = self.t("Quand x → +∞, vers quoi tend", 40).move_to(P(0, 1.8)).align_to(P(-6.1, 0), LEFT)
        self.au_mot("Quand x tend")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.35)
        un = self.un_cache(52)
        fr = self.frac(self.F("e^{x}", 52, ENNEMI), VGroup(self.t("x +", 52), un).arrange(RIGHT, buff=0.18), 52)
        fr.move_to(P(0, 0.2)).align_to(P(-5.4, 0), LEFT)
        pt = self.t("?", 52).next_to(fr, RIGHT, buff=0.3)
        self.au_mot("e puissance x, divisé")
        self.play(FadeIn(fr, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("1 ? Mets")
        self.play(un.animate.set_opacity(1), FadeIn(pt), FadeIn(pq, scale=1.3), run_time=0.3)
        pause = VGroup(pastille_pause(0.42), self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE))
        pause.arrange(RIGHT, buff=0.25).move_to(P(-1.2, -2.6))
        rebours = CompteARebours(5, r=0.38, fs=34).next_to(pause, RIGHT, buff=0.45)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION 09-defi t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f})", flush=True)
        self.wait(0.4)

    # ── 09b : la correction du défi ────────────────────────────────────────

    def ecran_correction(self):
        self.nouvel_ecran("09b-correction")
        self.titre_ecran("Correction", "Correction")
        x = -6.2
        l1 = self.lg(self.frac(self.t("+∞", 38), self.t("+∞", 38), 38),
                     self.t(": forme indéterminée", 38, ROUGE_ERREUR), y=2.0, x=x)
        self.au_mot("On a plus l'infini sur")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("une forme indéterminée")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), run_time=0.35)
        fs = 44
        un1, un2 = self.un_cache(fs), self.un_cache(fs)
        f1 = self.frac(self.F("e^{x}", fs, ENNEMI), VGroup(self.t("x +", fs), un1).arrange(RIGHT, buff=0.14), fs)
        f2 = self.frac("e^{x}", "x", fs, ENNEMI)
        f3 = self.frac(self.t("x", fs), VGroup(self.t("x +", fs), un2).arrange(RIGHT, buff=0.14), fs)
        eg = self.lg(f1, self.t("=", fs), f2, self.t("×", fs), f3, y=0.4, x=x, buff=0.25)
        self.au_mot("On écrit le quotient")
        self.play(FadeIn(eg, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("1. Par")
        self.play(un1.animate.set_opacity(1), un2.animate.set_opacity(1), run_time=0.3)
        a2 = self.t("→ +∞", 36, ENNEMI).next_to(f2, DOWN, buff=0.3)
        cc = self.t("par croissances comparées", 32, AMBRE).next_to(a2, DOWN, buff=0.12).align_to(P(x, 0), LEFT)
        self.au_mot("Par croissances")
        self.play(FadeIn(a2, shift=DOWN * 0.1), FadeIn(cc), run_time=0.4)
        a3 = self.t("→", 36, VERT_OK).next_to(f3, DOWN, buff=0.3).shift(LEFT * 0.2)
        a3b = self.t("1", 36, VERT_OK).next_to(a3, RIGHT, buff=0.15)
        self.au_mot("Et x sur x")
        self.play(FadeIn(a3, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("1. Le produit")
        self.play(FadeIn(a3b, scale=1.4), run_time=0.3)
        res = self.lg(self.t("le produit tend vers +∞", 38, VERT_OK), y=-2.2, x=x)
        g = Graphe((0, 4.5), (0, 18.5), (2.7, -1.85), (6.45, 2.3))
        ax = self.sans_audit(g.axes())
        c = g.courbe(lambda t: math.exp(t) / (t + 1), 0, 4.5, EXP, 6)
        fl = Arrow(g.G(3.0, 8.0), g.G(4.1, 16.5), buff=0, color=VERT_OK, stroke_width=5,
                   max_tip_length_to_length_ratio=0.2)
        self.au_mot("Le produit")
        self.play(FadeIn(res, shift=UP * 0.1), Create(ax), Create(c), run_time=0.6)
        self.encadrer(res)
        self.play(GrowArrow(fl), run_time=0.4)
        self.attendre_voix(marge=0.6)
