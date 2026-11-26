# exp_deriver.py
# EleveAI — Maths Tle spé — paysage E3 « Dériver avec l'exponentielle » (16:9), ceinture VERTE.
# Micro du coach : exp_deriver (notion fonction_exponentielle). Centre : sport.
# Voix : manim/voix/terminale-exp-deriver.json (validée par Frédéric le 26/11).
#
# Clé de voix → écran :
#   · 00-garde      : le titre, la question, la courbe de e puissance x, l'échelle (verte) ;
#   · 01-situation  : Malik, préparateur physique (chrono), le ballon de handball, la joueuse
#                     qui sprinte, son cœur, le moniteur cardiaque (160) et la courbe qui redescend ;
#   · 02-idee       : le modèle F(t) = 60 + 100 e puissance −0,5t, F(0) = 160 sur la courbe,
#                     la tangente en 0 = la vitesse = F′ ;
#   · 03-theoreme   : la règle (e^u)′ = u′ e^u, la flèche « on dérive l'exposant »,
#                     l'exemple e^2x et les deux courbes e^2x / 2 e^2x ;
#   · 04/04b        : question-pause n° 1 ((e^−x)′ = −e^−x : C) ;
#   · 05-appliquer  : le calcul de F′(t) = −50 e^−0,5t, F′(0) = −50, la tangente et la marche
#                     « −50 à chaque minute » sur la courbe du cœur ;
#   · 06-piege      : x e^x est un produit (deux boîtes u × v), la fausse dérivée barrée,
#                     la règle du produit, (1 + x) e^x ;
#   · 07/07b        : question-pause n° 2 ((5 e^2x)′ = 10 e^2x : B) ;
#   · 08-rediger    : les trois lignes du bac, sur une copie ;
#   · 09/09b        : le défi e^(3x+1) et e^(x²), les deux courbes ; la correction en deux colonnes ;
#   · 10-finale     : ce que tu as appris ; 11-abonne : la fin du 26/11.
# Code couleur : bleu = l'exposant u, orange = u prime, vert = juste, rouge = le piège.
# (Le « ^ » ci-dessus n'est qu'une notation de commentaire : à l'écran, formule() pose
#  de vraies puissances.)
#
# python -m manim render -qh --disable_caching manim/scripts/terminale/exp_deriver.py ExpDeriverTerminale -o eleveai-maths-terminale-exp-deriver --media_dir manim/scripts/terminale/media-exp-deriver
# Sortie : manim/sorties/terminale/maths/analyse/exp-deriver/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from exp_commun import *  # noqa: E402,F401,F403

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
F_coeur = lambda t: 60 + 100 * math.exp(-0.5 * t)          # noqa: E731
dF_coeur = lambda t: 100 * (-0.5) * math.exp(-0.5 * t)     # noqa: E731
assert F_coeur(0) == 160                                    # 02 : F(0) = 160
assert 100 * (-0.5) == -50 and dF_coeur(0) == -50           # 05 : F′(t) = −50 e^(−0,5t), F′(0) = −50
h = 1e-6
for x in np.linspace(-2, 2, 41):                            # les dérivées dites, recalculées
    d = lambda f: (f(x + h) - f(x - h)) / (2 * h)            # noqa: E731
    assert abs(d(lambda s: math.exp(2 * s)) - 2 * math.exp(2 * x)) < 1e-4 * (1 + math.exp(2 * x))
    assert abs(d(lambda s: math.exp(-s)) + math.exp(-x)) < 1e-4 * (1 + math.exp(-x))          # 04 : C
    assert abs(d(lambda s: s * math.exp(s)) - (1 + x) * math.exp(x)) < 1e-4 * (1 + math.exp(x))
    assert abs(d(lambda s: 5 * math.exp(2 * s)) - 10 * math.exp(2 * x)) < 1e-3 * (1 + math.exp(2 * x))  # 07 : B
    assert abs(d(lambda s: math.exp(3 * s + 1)) - 3 * math.exp(3 * x + 1)) < 1e-3 * (1 + math.exp(3 * x + 1))
    assert abs(d(lambda s: math.exp(s * s)) - 2 * x * math.exp(x * x)) < 1e-3 * (1 + math.exp(x * x))
assert 5 * 2 == 10

AMBRE = JAUNE_TITRE
U = BLEU_CALCUL          # l'exposant u
UP_ = ORANGE_RETENUE     # u prime


# ── les dessins de la situation ─────────────────────────────────────────────

def ballon(r=0.3):
    """Un ballon de handball : le rond et ses coutures."""
    b = Circle(radius=r, fill_color="#f59e0b", fill_opacity=1, stroke_color="#78350f", stroke_width=2)
    c1 = Arc(radius=r * 0.95, start_angle=PI / 2 + 0.5, angle=PI - 1.0, stroke_color="#78350f", stroke_width=2)
    c1.move_to(b.get_center() + LEFT * r * 0.35)
    c2 = c1.copy().rotate(PI).move_to(b.get_center() + RIGHT * r * 0.35)
    return VGroup(b, c1, c2)


def chrono(r=0.3):
    """Le chronomètre du préparateur."""
    cad = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    bout = Rectangle(width=r * 0.4, height=r * 0.3, fill_color=GREY_B, fill_opacity=1, stroke_width=0)
    bout.next_to(cad, UP, buff=0)
    aig = Line(cad.get_center(), cad.get_center() + UP * r * 0.75 + RIGHT * r * 0.3, color="#111827",
               stroke_width=3)
    return VGroup(cad, bout, aig)


def coeur(fs=60, color=ROUGE_ERREUR):
    return Text("♥", font_size=fs, color=color)


def moniteur(l=3.6, h=1.9):
    """Le moniteur cardiaque : l'écran et le tracé de l'électrocardiogramme (à gauche)."""
    ecran = RoundedRectangle(width=l, height=h, corner_radius=0.15, fill_color="#0b1f14", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    x0, y0 = -l / 2 + 0.2, 0.0
    pts = [(0, 0), (0.25, 0), (0.35, 0.15), (0.45, 0), (0.55, 0), (0.62, -0.2), (0.72, 0.65), (0.82, -0.35),
           (0.92, 0), (1.15, 0), (1.25, 0.15), (1.35, 0)]
    ecg = VMobject(stroke_color=VERT_OK, stroke_width=4)
    ecg.set_points_as_corners([P(x0 + a, y0 + b) for a, b in pts])
    return VGroup(ecran, ecg)


def vitesse(mob, n=3, color=GREY_B):
    """Les traits de vitesse derrière quelqu'un qui court."""
    g = VGroup(*[Line(LEFT * (0.5 - 0.1 * i), ORIGIN, color=color, stroke_width=4) for i in range(n)])
    g.arrange(DOWN, buff=0.18, aligned_edge=RIGHT).next_to(mob, LEFT, buff=0.12)
    return g


class ExpDeriverTerminale(ExpBase):
    fichier_marques = "exp_deriver_marques.json"
    nom_voix = "terminale-exp-deriver"
    ceinture = "verte"
    titre = "Dériver avec l'exponentielle"

    # ── outil : une formule en morceaux, révélés l'un après l'autre ─────────

    def morceaux(self, parts, fs=36, color=WHITE):
        """parts : [src ou (src, couleur, couleur_exposant)] ; renvoie VGroup des morceaux,
        chacun posé exactement là où il serait dans la formule entière."""
        norm = []
        for p in parts:
            if isinstance(p, str):
                norm.append((p, color, None))
            else:
                norm.append((p[0], p[1] if len(p) > 1 else color, p[2] if len(p) > 2 else None))
        full = formule("".join(s for s, _, _ in norm), fs)
        g = VGroup()
        off = 0
        for s, c, ce in norm:
            m = formule(s, fs, c, ce)
            k = next(i for i, ch in enumerate(m._base) if ch != " ")
            m.shift(full[0][off + k].get_center() - m[0][k].get_center())
            off += len(m._base)
            g.add(m)
        return g

    def gauche(self, mob, y, x=-6.2, larg=None):
        if larg and mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def apparait(self, *mobs, mode="glisse"):
        if mode == "pop":
            self.play(*[FadeIn(m, scale=1.3) for m in mobs], run_time=0.35)
        else:
            self.play(*[FadeIn(m, shift=RIGHT * 0.15) for m in mobs], run_time=0.35)

    def graphe_coeur(self, bg, hd, xb=8.0):
        """Le repère du cœur : t en minutes, F en battements par minute."""
        g = Graphe((0, xb), (40, 175), bg, hd)
        ax = self.sans_audit(g.axes())
        lt = self.t("t (min)", 22, GREY_A).next_to(g.G(xb, 40), UP, buff=0.1).align_to(g.G(xb, 40), RIGHT)
        lf = self.t("cœur (battements par minute)", 22, GREY_A).next_to(g.G(0, 175), RIGHT, buff=0.15)
        c = g.courbe(F_coeur, 0, xb, ROUGE_ERREUR, 5)
        return g, VGroup(ax, lt, lf), c

    def construct(self):
        self.question_garde = [self.t("Comment dériver", 38),
                               self.F("e^{u}, quand u est une fonction ?", 38, WHITE, U)]
        self.ecran_garde("Dériver avec l'exponentielle", ["Comment dériver", "e puissance u"])
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question(
            "04",
            [self.t("Quelle est la dérivée de", 32), self.F("e^{−x}  ?", 40, WHITE, U)],
            [self.F("e^{−x}", 34), self.F("−x e^{−x}", 34), self.F("−e^{−x}", 34)],
            2, ["Quelle est", "e puissance moins x ?"],
            [("u égale moins x", self.F("u = −x", 36, U)),
             ("1. La dérivée", self.F("u′ = −1", 36, UP_)),
             ("1 fois e", self.F("(e^{−x})′ = −1 × e^{−x} = −e^{−x}", 36, VERT_OK)),
             ("La réponse A", self.t("A oublie u′", 32, ROUGE_ERREUR)),
             ("La réponse B", self.t("B multiplie par u, au lieu de u′", 32, ROUGE_ERREUR))],
            figure=self.figure_q1, croix=[("La réponse A", 0), ("La réponse B", 1)])
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question(
            "07",
            [self.t("Quelle est la dérivée de", 32), self.F("5e^{2x}  ?", 40, WHITE, U)],
            [[("5 fois", self.t("5", 34)), ("2x. B", self.F("e^{2x}", 34))],
             [("10 fois", self.t("10", 34)), ("2x. C", self.F("e^{2x}", 34))],
             [("2 fois", self.t("2", 34)), ("2x. Mets", self.F("e^{2x}", 34))]],
            1, ["Quelle est", "2x ?"],
            [("5 reste devant", self.t("la constante 5 reste devant", 32)),
             ("2x est", self.F("(e^{2x})′ = 2e^{2x}", 36, WHITE, U)),
             ("10. La", self.F("5 × 2 = 10  :  (5e^{2x})′ = 10e^{2x}", 36, VERT_OK)),
             ("La réponse C", self.t("C perd le 5", 32, ROUGE_ERREUR)),
             ("la réponse A", self.t("A oublie le 2", 32, ROUGE_ERREUR))],
            figure=self.figure_q2, croix=[("La réponse C", 2), ("la réponse A", 0)])
        noir = "#0f172a"
        fs = 36
        deux = lambda a, b: VGroup(a, b).arrange(DOWN, aligned_edge=LEFT, buff=0.12)  # noqa: E731
        self.ecran_copie("08-rediger", "Au bac : trois lignes", "Au bac", [
            ("Un : on nomme", deux(self.F("On nomme u, l'exposant,", fs, noir),
                                   self.F("puis on calcule u′.", fs, noir))),
            ("Deux : on applique", deux(self.F("On applique la règle :", fs, noir),
                                        self.F("(e^{u})′ = u′ e^{u}", fs, noir, "#0369a1"))),
            ("Trois : on factorise", deux(self.F("On factorise par e^{u}, pour le signe :", fs, noir, "#0369a1"),
                                          self.F("e^{u} est toujours positif.", fs, noir, "#0369a1"))),
        ])
        self.ecran_defi([
            (None, [("Dérive f", self.t("Dérive", 40)), ("1 : tout", self.F("f(x) = e^{3x + 1}", 46, WHITE, U))]),
            ("tout 3x", self.t("tout 3x + 1 est en exposant", 32, GREY_A)),
            (None, [("Puis dérive", self.t("Puis dérive", 40)), ("g de x", self.F("g(x) = e^{x²}", 46, WHITE, U))]),
            ("x au carré est", self.t("x² est en exposant", 32, GREY_A)),
        ], figure=self.figure_defi, y0=2.3)
        self.ecran_correction()
        self.ecran_appris([
            ("La dérivée de e", self.F("(e^{u})′ = u′ e^{u}", 42, WHITE, U)),
            ("Une constante", self.t("Une constante devant reste devant.", 38)),
            ("pour un produit", VGroup(self.t("Un produit : la règle du produit,", 38),
                                       self.t("puis on factorise par l'exponentielle.", 38)
                                       ).arrange(DOWN, aligned_edge=LEFT, buff=0.1)),
        ])
        self.ecran_fin_2611()

    # ── 01 : Malik, la joueuse et son cœur ─────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        malik = personne(PEAUX[4], "#1f1307", "#047857", s=0.85).move_to(P(-5.5, 2.0))
        nom = self.t("Malik", 34, JAUNE_TITRE).next_to(malik, DOWN, buff=0.15)
        self.au_mot("Voici Malik")
        self.play(FadeIn(malik, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("préparateur")
        metier = VGroup(self.t("préparateur", 24, GREY_A), self.t("physique", 24, GREY_A)).arrange(DOWN, buff=0.06)
        metier.next_to(nom, DOWN, buff=0.1)
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        ch = chrono(0.26).next_to(malik, RIGHT, buff=0.08).shift(DOWN * 0.1)
        self.au_mot("handball")
        b = ballon(0.28).move_to(P(-3.85, 1.2))
        hb = self.t("handball", 22, GREY_A).next_to(b, DOWN, buff=0.1)
        self.play(FadeIn(b, scale=1.4), FadeIn(hb), run_time=0.4)
        # la joueuse qui sprinte
        joueuse = personne(PEAUX[1], "#3b1f0e", "#b91c1c", longs=True, s=0.85).move_to(P(-2.0, 2.0))
        traits = vitesse(joueuse)
        self.au_mot("Après un sprint")
        self.play(FadeIn(joueuse, shift=RIGHT * 0.4), Create(traits), run_time=0.5)
        self.au_mot("il suit")
        self.play(FadeIn(ch, scale=1.4), run_time=0.3)
        self.au_mot("le cœur")
        cr = coeur(44).move_to(joueuse.get_center() + DOWN * 0.15 + LEFT * 0.15)
        self.play(FadeIn(cr, scale=1.6), run_time=0.3)
        self.play(cr.animate.scale(1.3), run_time=0.15)
        self.play(cr.animate.scale(1 / 1.3), run_time=0.15)
        lj = self.t("une joueuse", 22, GREY_A).next_to(joueuse, DOWN, buff=0.15)
        self.au_mot("d'une joueuse")
        self.play(FadeIn(lj), run_time=0.3)
        # le moniteur
        mon = moniteur().move_to(P(3.7, 2.1))
        self.au_mot("À la fin de l'effort")
        self.play(FadeIn(mon[0]), Create(mon[1]), run_time=0.6)
        val = self.t("160", 60, VERT_OK).move_to(P(4.45, 2.3))
        unite = VGroup(self.t("battements", 20, VERT_OK), self.t("par minute", 20, VERT_OK)).arrange(DOWN, buff=0.04)
        unite.next_to(val, DOWN, buff=0.08)
        val.shift(UP * 0.12)
        unite.shift(UP * 0.12)
        assert unite.get_right()[0] < mon[0].get_right()[0] - 0.15 and unite.get_bottom()[1] > mon[0].get_bottom()[1] + 0.05
        self.au_mot("160 battements")
        self.play(FadeIn(val, scale=1.3), FadeIn(unite), run_time=0.4)
        self.play(Indicate(cr, color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.4)
        # la courbe qui redescend
        g, rep, c = self.graphe_coeur((-1.4, -3.0), (4.6, 0.25))
        self.au_mot("Puis il redescend")
        self.play(FadeIn(rep), run_time=0.3)
        tt = ValueTracker(0.02)
        trace = always_redraw(lambda: g.courbe(F_coeur, 0, max(tt.get_value(), 0.03), ROUGE_ERREUR, 5, n=60))
        pt = always_redraw(lambda: Dot(g.G(tt.get_value(), F_coeur(tt.get_value())), radius=0.09, color=AMBRE))
        self.add(trace, pt)
        self.play(tt.animate.set_value(8.0), run_time=self.jusqua("Malik veut", n=1), rate_func=linear)
        trace.clear_updaters()
        pt.clear_updaters()
        self.au_mot("à quelle vitesse")
        tg = g.droite(-50, 0, 160, 0, 1.6, AMBRE, 5)
        q = self.t("à quelle vitesse ?", 30, AMBRE).next_to(g.G(1.7, 150), RIGHT, buff=0.2)
        self.play(Create(tg), FadeIn(q, shift=UP * 0.1), run_time=0.5)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.6)

    # ── 02 : le modèle de Malik ────────────────────────────────────────────

    def ecran_idee(self):
        self.nouvel_ecran("02-idee")
        tit = self.titre_ecran("Le modèle de Malik", "Le modèle")
        fm = self.morceaux(["F(t) = ", "60 + ", "100", ("e^{−0,5t}", WHITE, U)], 50)
        self.gauche(fm, 2.15, larg=6.9)
        g, rep, c = self.graphe_coeur((1.1, -1.7), (5.4, 1.4))
        self.au_mot("F de t")
        self.play(FadeIn(fm[0], shift=RIGHT * 0.15), FadeIn(rep), run_time=0.4)
        self.au_mot("60 plus")
        self.apparait(fm[1])
        self.au_mot("100 fois")
        self.apparait(fm[2])
        self.au_mot("0,5 t. Ici")
        self.play(FadeIn(fm[3], shift=RIGHT * 0.15), Create(c), run_time=0.7)
        self.au_mot("Ici, t")
        l1 = self.gauche(self.t("t : le temps, en minutes", 32, GREY_A), 1.25)
        self.apparait(l1)
        self.play(Indicate(rep[1], color=WHITE), run_time=0.5)
        l2 = self.morceaux(["t = 0 :  e^{0} ", "= 1"], 38)
        self.gauche(l2, 0.35)
        self.au_mot("0, e puissance")
        self.apparait(l2[0])
        self.au_mot("1, donc")
        self.apparait(l2[1], mode="pop")
        l3 = self.morceaux(["F(0) = 60 + 100 × 1 ", ("= 160", VERT_OK)], 38)
        self.gauche(l3, -0.55, larg=6.9)
        self.au_mot("F de 0")
        self.apparait(l3[0])
        p0 = Dot(g.G(0, 160), radius=0.11, color=VERT_OK)
        e160 = self.t("160", 26, VERT_OK).next_to(p0, RIGHT, buff=0.15)
        self.au_mot("160. La")
        self.play(FadeIn(l3[1], scale=1.3), FadeIn(p0, scale=1.8), FadeIn(e160), run_time=0.35)
        self.encadrer(l3[1])
        self.au_mot("La vitesse")
        l4 = self.gauche(self.t("la vitesse du cœur qui redescend :", 32), -1.55, larg=6.9)
        tg = g.droite(-50, 0, 160, 0, 1.5, AMBRE, 5)
        self.play(FadeIn(l4, shift=RIGHT * 0.15), Create(tg), run_time=0.5)
        l5 = VGroup(self.t("c'est la dérivée", 36, AMBRE), self.F("F′", 50, AMBRE)).arrange(RIGHT, buff=0.3)
        self.gauche(l5, -2.45)
        self.au_mot("c'est la dérivée")
        self.apparait(l5[0])
        self.au_mot("F prime")
        self.apparait(l5[1], mode="pop")
        self.insister(VGroup(l5[1], tg), 1.15)
        del tit
        self.attendre_voix(marge=0.6)

    # ── 03 : la règle ──────────────────────────────────────────────────────

    def ecran_theoreme(self):
        self.nouvel_ecran("03-theoreme")
        self.titre_ecran("La règle", "La règle")
        r = self.morceaux([("(e^{u})′ = ", WHITE, U), ("u′", UP_), (" e^{u}", WHITE, U)], 64)
        r.move_to(P(-2.4, 1.65))
        self.au_mot("La dérivée de e")
        self.apparait(r[0])
        self.au_mot("u prime fois")
        self.apparait(r[1], mode="pop")
        self.au_mot("fois e puissance u")
        self.apparait(r[2])
        cad = SurroundingRectangle(r, color=VERT_OK, buff=0.2, stroke_width=3)
        self.play(Create(cad), run_time=0.35)
        x = -6.2
        l1 = self.gauche(self.F("On garde e^{u} telle quelle,", 32, VERT_OK, U), 0.3, x)
        self.au_mot("On garde")
        self.apparait(l1)
        self.play(Indicate(r[2], color=VERT_OK, scale_factor=1.15), run_time=0.5)
        l2 = VGroup(self.t("et on la multiplie par", 32, UP_), self.t("la dérivée de son exposant.", 32, UP_))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.gauche(l2, -0.6, x)
        fl = CurvedArrow(r[0][1][0].get_top() + UP * 0.08, r[1].get_top() + UP * 0.08, angle=-TAU / 4,
                         color=UP_, stroke_width=5, tip_length=0.2)
        self.au_mot("on la multiplie")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("la dérivée de son exposant")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.15), Create(fl), run_time=0.6)
        ex = self.gauche(self.t("Exemple :", 34, AMBRE), -1.85, x)
        self.au_mot("Par exemple")
        self.apparait(ex)
        e2 = self.morceaux([("(e^{2x})′ = ", WHITE, U), ("2", UP_), ("e^{2x}", WHITE, U)], 44)
        e2.next_to(ex, RIGHT, buff=0.35)
        # le dessin : e puissance 2x (bleu) et sa dérivée 2 e puissance 2x (orange), deux fois plus haute
        g = Graphe((-1.6, 0.75), (0, 9.2), (2.6, -1.85), (6.2, 1.0))
        ax = self.sans_audit(g.axes())
        c1 = g.courbe(lambda s: math.exp(2 * s), -1.6, 0.75, U, 5)
        c2 = g.courbe(lambda s: 2 * math.exp(2 * s), -1.6, 0.75, UP_, 5)
        self.au_mot("2x, c'est")
        self.play(FadeIn(e2[0], shift=RIGHT * 0.15), Create(ax), Create(c1), run_time=0.6)
        self.au_mot("2 fois")
        self.play(FadeIn(e2[1], scale=1.4), run_time=0.3)
        self.au_mot("2x.", 1)
        self.play(FadeIn(e2[2], shift=RIGHT * 0.15), Create(c2), run_time=0.6)
        self.insister(e2[1], 1.3)
        self.attendre_voix(marge=0.6)

    # ── les dessins des questions ──────────────────────────────────────────

    def figure_q1(self):
        g = Graphe((-1.5, 2.5), (0, 4.6), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(lambda s: math.exp(-s), -1.5, 2.5, U, 6)
        self.play(Create(ax), Create(c), run_time=0.8)
        return 1.3

    def figure_q2(self):
        g = Graphe((-2.0, 0.4), (0, 12), (-6.2, 1.3), (1.6, 3.2))
        ax = self.sans_audit(g.axes())
        c = g.courbe(lambda s: 5 * math.exp(2 * s), -2.0, 0.4, U, 6)
        fl = Arrow(g.G(-1.2, 3.5), g.G(0.05, 10.5), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.15)
        self.play(Create(ax), Create(c), GrowArrow(fl), run_time=0.8)
        return 1.3

    def figure_defi(self):
        g = Graphe((-1.6, 1.6), (0, 10), (2.0, -1.5), (6.2, 1.75))
        ax = self.sans_audit(g.axes())
        cf = g.courbe(lambda s: math.exp(3 * s + 1), -1.6, 0.42, U, 5)
        cg = g.courbe(lambda s: math.exp(s * s), -1.5, 1.5, UP_, 5)
        lf = self.t("f", 30, U).next_to(g.G(0.42, 9.6), LEFT, buff=0.12)
        lg_ = self.t("g", 30, UP_).next_to(g.G(1.5, 9.5), RIGHT, buff=0.12)
        self.play(Create(ax), Create(cf), Create(cg), FadeIn(lf), FadeIn(lg_), run_time=0.8)

    # ── 05 : le cœur de la joueuse ─────────────────────────────────────────

    def ecran_appliquer(self):
        self.nouvel_ecran("05-appliquer")
        tit = self.t("Appliquons au cœur de la joueuse", 38, JAUNE_TITRE)
        cr = coeur(44).next_to(tit, RIGHT, buff=0.25)
        tete = VGroup(tit, cr).to_edge(UP, buff=0.5)
        g, rep, c = self.graphe_coeur((1.8, -1.7), (6.3, 1.85), xb=6.0)
        self.au_mot("Appliquons")
        self.play(FadeIn(tete, shift=DOWN * 0.1), FadeIn(rep), Create(c), run_time=0.7)
        fs = 34
        L = 7.3
        l0 = self.morceaux(["F(t) = ", "60", " + 100", ("e^{−0,5t}", WHITE, U)], fs)
        self.gauche(l0, 2.35, larg=L)
        l1 = self.morceaux(["(60)′ = ", ("0", VERT_OK)], fs)
        self.gauche(l1, 1.55)
        self.au_mot("La constante")
        self.apparait(l0[0])
        self.au_mot("60 a pour")
        self.play(FadeIn(l0[1], shift=RIGHT * 0.15), FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("0. Pour")
        self.apparait(l1[1], mode="pop")
        self.au_mot("100 fois")
        self.apparait(l0[2])
        self.au_mot("0,5 t :")
        self.apparait(l0[3])
        lu = self.F("u = −0,5t", fs, U)
        lup = self.F("u′ = −0,5", fs, UP_)
        VGroup(lu, lup).arrange(RIGHT, buff=0.8)
        self.gauche(VGroup(lu, lup), 0.75)
        self.au_mot("0,5 t, et u")
        self.apparait(lu)
        self.au_mot("0,5. Donc")
        self.apparait(lup)
        l3 = self.morceaux(["F′(t) = ", "100 × ", "(−0,5)", (" × e^{−0,5t}", WHITE, U)], fs)
        self.gauche(l3, -0.05, larg=L)
        self.au_mot("Donc F prime")
        self.apparait(l3[0])
        self.au_mot("100 fois moins")
        self.apparait(l3[1])
        self.au_mot("0,5, fois")
        self.apparait(l3[2])
        self.au_mot("0,5 t. Soit")
        self.apparait(l3[3])
        l4 = self.gauche(self.morceaux(["F′(t) = −50", ("e^{−0,5t}", VERT_OK, U)], 40, VERT_OK), -0.95, larg=L)
        self.au_mot("50 fois")
        self.apparait(l4[0], mode="pop")
        self.au_mot("0,5 t. En")
        self.apparait(l4[1])
        self.encadrer(l4)
        l5 = self.morceaux(["F′(0) = ", ("−50", AMBRE)], 40)
        self.gauche(l5, -1.95)
        tg = g.droite(-50, 0, 160, 0, 1.7, AMBRE, 5)
        self.au_mot("0, F prime")
        self.play(FadeIn(l5[0], shift=RIGHT * 0.15), Create(tg), run_time=0.5)
        self.au_mot("50 : juste")
        self.apparait(l5[1], mode="pop")
        # la marche : chaque minute, −50
        a, b, d = g.G(0, 160), g.G(1, 160), g.G(1, 110)
        hz = DashedLine(a, b, color=AMBRE, stroke_width=3, dash_length=0.08)
        vt = Arrow(b, d, buff=0, color=AMBRE, stroke_width=5, max_tip_length_to_length_ratio=0.25)
        e50 = self.t("−50", 26, AMBRE).next_to(vt, RIGHT, buff=0.1)
        em = self.t("chaque minute", 22, AMBRE).next_to(e50, DOWN, buff=0.1, aligned_edge=LEFT)
        l6 = VGroup(self.t("le cœur perd 50 battements par minute,", 30), self.t("à chaque minute", 30))
        l6.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.gauche(l6, -2.85, larg=L)
        self.au_mot("50 battements")
        self.play(FadeIn(l6[0], shift=RIGHT * 0.15), Create(hz), GrowArrow(vt), FadeIn(e50), run_time=0.5)
        self.au_mot("à chaque minute")
        self.play(FadeIn(em), FadeIn(l6[1], shift=RIGHT * 0.15), Indicate(cr, color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège du produit ───────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre_ecran("Voilà le piège !", "Voilà le piège", ROUGE_ERREUR)
        # les deux boîtes du produit
        b1 = RoundedRectangle(width=1.0, height=1.0, corner_radius=0.12, stroke_color=WHITE, stroke_width=3,
                              fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-5.6, 1.9))
        b2 = RoundedRectangle(width=1.3, height=1.0, corner_radius=0.12, stroke_color=U, stroke_width=3,
                              fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.5, 1.9))
        x1 = self.t("x", 44).move_to(b1)
        x2 = self.F("e^{x}", 44, U).move_to(b2)
        fois = self.t("×", 44, AMBRE).move_to(P(-4.55, 1.9))
        self.au_mot("un produit")
        self.play(FadeIn(VGroup(b1, x1), shift=DOWN * 0.1), FadeIn(fois, scale=1.4),
                  FadeIn(VGroup(b2, x2), shift=DOWN * 0.1), run_time=0.5)
        xl = -1.7
        faux = self.col(self.F("(x e^{x})′ = x e^{x}", 40, ROUGE_ERREUR), 1.95, xl)
        self.au_mot("On ne dérive pas")
        self.apparait(faux)
        cx = Cross(stroke_color=ROUGE_ERREUR, stroke_width=8).scale_to_fit_height(0.5).next_to(faux, RIGHT, buff=0.3)
        self.play(Create(cx), run_time=0.35)
        regle = self.col(self.F("(uv)′ = u′v + uv′", 42, WHITE), 0.85, xl)
        lu = self.t("u", 34, AMBRE).next_to(b1, DOWN, buff=0.15)
        lv = self.t("v", 34, AMBRE).next_to(b2, DOWN, buff=0.15)
        self.au_mot("la règle du produit")
        self.play(FadeIn(lu, scale=1.3), FadeIn(lv, scale=1.3), run_time=0.35)
        self.au_mot("u prime v")
        self.apparait(regle)
        calc = self.morceaux(["(x e^{x})′ = 1 × e^{x}", " + x × e^{x}"], 40)
        self.col(calc, -0.25, xl)
        du = self.t("u′ = 1", 32, UP_).next_to(lu, DOWN, buff=0.2)
        dv = self.F("v′ = e^{x}", 32, UP_).next_to(lv, DOWN, buff=0.2)
        self.au_mot("1 fois e")
        self.play(FadeIn(calc[0], shift=RIGHT * 0.15), FadeIn(du, scale=1.3), run_time=0.35)
        self.au_mot("plus x fois")
        self.play(FadeIn(calc[1], shift=RIGHT * 0.15), FadeIn(dv, scale=1.3), run_time=0.35)
        self.au_mot("On factorise")
        self.play(Indicate(calc[0][1], color=VERT_OK, scale_factor=1.3),
                  Indicate(calc[1][1], color=VERT_OK, scale_factor=1.3), run_time=0.6)
        k_eg = calc[0]._base.find("=")
        fin = self.col(self.F("= (1 + x) e^{x}", 46, VERT_OK), -1.35, calc[0][0][k_eg].get_left()[0])
        self.au_mot("1 plus x")
        self.apparait(fin, mode="pop")
        self.encadrer(fin)
        self.attendre_voix(marge=0.6)

    # ── 09b : la correction du défi ────────────────────────────────────────

    def ecran_correction(self):
        self.nouvel_ecran("09b-correction")
        self.titre_ecran("Correction", "Correction")
        fs = 38
        xf, xg = -6.2, 0.6
        tf = self.gauche(self.t("Pour f", 36, AMBRE), 2.25, xf)
        tg_ = self.gauche(self.t("Pour g", 36, AMBRE), 2.25, xg)
        sep = Line(P(0.1, 2.5), P(0.1, -1.6), color=GREY_D, stroke_width=2)
        self.au_mot("Pour f")
        self.play(FadeIn(tf), Create(sep), run_time=0.35)
        uf = self.gauche(self.F("u = 3x + 1", fs, U), 1.35, xf)
        upf = self.gauche(self.F("u′ = 3", fs, UP_), 0.2, xf)
        ff = self.gauche(self.F("f′(x) = 3e^{3x + 1}", 44, VERT_OK, U), -0.95, xf)
        fl1 = Arrow(uf.get_bottom() + LEFT * 0.9, upf.get_top() + LEFT * (upf.width / 2 - 0.4), buff=0.08,
                    color=UP_, stroke_width=4, max_tip_length_to_length_ratio=0.3)
        df1 = self.t("on dérive", 26, UP_).next_to(fl1, RIGHT, buff=0.12)
        self.au_mot("1, et u prime")
        self.apparait(uf)
        self.au_mot("3. Donc")
        self.play(GrowArrow(fl1), FadeIn(df1), FadeIn(upf, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("1. Pour g")
        self.apparait(ff, mode="pop")
        self.encadrer(ff)
        ug = self.gauche(self.F("u = x²", fs, U), 1.35, xg)
        upg = self.gauche(self.F("u′ = 2x", fs, UP_), 0.2, xg)
        gg = self.gauche(self.F("g′(x) = 2x e^{x²}", 44, VERT_OK, U), -0.95, xg)
        fl2 = Arrow(ug.get_bottom() + LEFT * (ug.width / 2 - 0.4), upg.get_top() + LEFT * (upg.width / 2 - 0.4),
                    buff=0.08, color=UP_, stroke_width=4, max_tip_length_to_length_ratio=0.3)
        df2 = self.t("on dérive", 26, UP_).next_to(fl2, RIGHT, buff=0.12)
        self.au_mot("Pour g")
        self.apparait(tg_)
        self.au_mot("u égale x au carré")
        self.apparait(ug)
        self.au_mot("2x. Donc")
        self.play(GrowArrow(fl2), FadeIn(df2), FadeIn(upg, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("2x fois")
        self.apparait(gg, mode="pop")
        self.encadrer(gg)
        self.attendre_voix(marge=0.6)
