# trigonometrie_rouge_vert.py
# EleveAI — Maths première spécialité — La trigonométrie, leçon « rouge et vert »
#
# ⭐ LE PLAN DE FRÉDÉRIC (28/09/2026) : « présenter le cercle trigonométrique en
# dessin d'abord, en mettant l'axe des cosinus en rouge et l'axe des sinus en
# vert, en disant que le rayon vaut 1 » — SA convention de classe. Puis le
# radian par la longueur d'arc (2πR du CM2), l'enroulement de la droite, les
# valeurs remarquables en tournant, le triangle rectangle et cos² + sin² = 1,
# les angles négatifs, et le signe du cosinus par le vent.
# ⛔ La résolution de cos x = a est SORTIE (Frédéric, 28/09 : pas au BO 2026).
# Script validé le 28/09 (« je valide, crée la vidéo paysage »).
#
# Mapping micro-compétences (notion trigonometrie) :
#   01 dessin → trig_cercle        02 radian → trig_radian, trig_arc
#   03 enroulement → trig_enroulement   04 valeurs → trig_valeurs, trig_cos_sin
#   05 triangle → trig_triangle_rectangle   06 négatifs → trig_parite
#   07 vent → trig_cos_sin (signe du cosinus)
#
# Rendu (sans cache, sinon les sons sautent) :
#   python -m manim render -qh --disable_caching manim/scripts/premiere/trigonometrie_rouge_vert.py TrigoRougeVert -o eleveai-maths-premiere-trigonometrie-rouge-vert --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np
from manim import *

from charte import *
from gabarit_seconde import SONS
from trigonometrie import GRIS_DOUX, ORANGE_ATTENTION, TrigoBase

C_COS = ROUGE_ERREUR  # la convention de classe de Frédéric : cos en rouge…
C_SIN = VERT_OK       # … et sin en vert

C0 = np.array([-3.3, -0.35, 0])  # le cercle des écrans « standard »
R0 = 2.35


class TrigoRougeVert(TrigoBase):
    episode = ""

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.dossier_voix = SONS / "premiere-trigonometrie-rouge-vert"

    # ── le cercle rouge et vert ─────────────────────────────────────────────
    def pos(self, theta, rayon=None, c=C0, R=R0):
        r = R if rayon is None else rayon
        return c + np.array([r * np.cos(theta), r * np.sin(theta), 0])

    def cercle_rv(self, c=C0, R=R0, lettres=True):
        ax = Arrow(c + LEFT * (R + 0.35), c + RIGHT * (R + 0.6), buff=0, stroke_width=5, color=C_COS,
                   max_tip_length_to_length_ratio=0.04)
        ay = Arrow(c + DOWN * (R + 0.35), c + UP * (R + 0.5), buff=0, stroke_width=5, color=C_SIN,
                   max_tip_length_to_length_ratio=0.04)
        cercle = Circle(radius=R, color=BLEU_CALCUL, stroke_width=4).move_to(c)
        g = VGroup(ax, ay, cercle)
        if lettres:
            g.add(self.T("cos", 24, C_COS).next_to(ax.get_end(), DOWN, buff=0.12))
            g.add(self.T("sin", 24, C_SIN).next_to(ay.get_end(), RIGHT, buff=0.12))
            g.add(self.T("O", 22, GRIS_DOUX).next_to(c, DL, buff=0.06))
        return g

    def projections_vivantes(self, theta, c=C0, R=R0):
        """Le point, son rayon, et ses DEUX projections colorées, qui suivent θ."""
        P = lambda: self.pos(theta.get_value(), c=c, R=R)
        rayon = always_redraw(lambda: Line(c, P(), color=WHITE, stroke_width=3))
        pr = always_redraw(lambda: Line(c, [P()[0], c[1], 0], color=C_COS, stroke_width=9))
        ps = always_redraw(lambda: Line(c, [c[0], P()[1], 0], color=C_SIN, stroke_width=9))
        tr = always_redraw(lambda: DashedLine(P(), [P()[0], c[1], 0], color=GRIS_DOUX, stroke_width=2, dash_length=0.1))
        ts = always_redraw(lambda: DashedLine(P(), [c[0], P()[1], 0], color=GRIS_DOUX, stroke_width=2, dash_length=0.1))
        pt = always_redraw(lambda: self.point(P(), JAUNE_TITRE, 0.11))
        return VGroup(tr, ts, pr, ps, rayon, pt)

    def lecture(self, n, d, cos_cle, sin_cle, y=0.6, x=3.35):
        """cos(nπ/d) = …  /  sin(nπ/d) = …  — rouge, puis vert."""
        l1 = self.rang("cos(", self.fpi(n, d, 30), ") =", self.fval(cos_cle, 32, C_COS), font_size=38, color=C_COS, buff=0.1)
        l2 = self.rang("sin(", self.fpi(n, d, 30), ") =", self.fval(sin_cle, 32, C_SIN), font_size=38, color=C_SIN, buff=0.1)
        return VGroup(l1, l2).arrange(DOWN, buff=0.55, aligned_edge=LEFT).move_to([x, y, 0])

    def lecture_vivante(self, theta, y=0.6, x=3.35):
        """Pendant que le point tourne, les valeurs approchées défilent
        (Frédéric, 27/09 : « quand tu bouges le point, la valeur change »)."""
        def f():
            t = theta.get_value()
            fr = lambda v: f"{v:.2f}".replace(".", ",").replace("-", "−")
            return VGroup(self.T(f"cos ≈ {fr(np.cos(t))}", 38, C_COS),
                          self.T(f"sin ≈ {fr(np.sin(t))}", 38, C_SIN)).arrange(DOWN, buff=0.7, aligned_edge=LEFT).move_to([x, y, 0])
        return always_redraw(f)

    def etiquette(self, n, d, couleur=WHITE, font_size=26):
        """L'angle écrit près de son point. π/6, π/4, π/3 sont à 15° : π/4 plus loin."""
        if d == 2 and abs(n) == 1:  # au sommet et au pied, l'axe vert passe : on se pose à côté
            return self.fpi(n, d, font_size, couleur).move_to(self.pos(n * PI / d) + np.array([0.5, -0.4 * n, 0]))
        dec = 0.78 if abs(n) == 1 and d == 4 else 0.42
        return self.fpi(n, d, font_size, couleur).move_to(self.pos(n * PI / d, R0 + dec))

    def titre(self, texte, font_size=44):
        t = self.T(texte, font_size, JAUNE_TITRE).to_edge(UP, buff=0.45)
        if t.width > config.frame_width - 1.0:
            t.scale_to_fit_width(config.frame_width - 1.0)
        self.play(Write(t))
        return t

    # ── la garde : le dessin se fait PENDANT que la voix le dit ─────────────
    def garde_dessinee(self):
        """Frédéric, 28/09 : « il faut que tes propos aillent avec les dessins ».
        Plus de « cos(−x) = cos(x) : pourquoi ? » en accroche : on entend « un
        cercle de rayon 1 » et le cercle se trace, « un axe rouge » et l'axe
        rouge apparaît, « un axe vert » et l'axe vert apparaît. Un clip de voix
        par morceau de dessin, pour que chacun tombe sur sa phrase."""
        self.clear()
        self.add_mascotte(scale=0.8)
        c = np.array([-3.0, -0.85, 0])
        R = 2.0
        titre = self.T("Le cercle trigonométrique", 54, JAUNE_TITRE).to_edge(UP, buff=0.6)
        ident = self.T("Maths première — EleveAI", 28, WHITE).next_to(titre, DOWN, buff=0.25)
        self.add(titre, ident)  # à l'image dès la première seconde

        self.dire("00-garde")  # « La trigonométrie. Un cercle de rayon 1. »
        cercle = Circle(radius=R, color=BLEU_CALCUL, stroke_width=5).move_to(c)
        rayon = Line(c, c + R * np.array([np.cos(PI / 4), np.sin(PI / 4), 0]), color=JAUNE_TITRE, stroke_width=5)
        l0 = self.T("un cercle de rayon 1", 36, BLEU_CALCUL).move_to([3.2, 1.0, 0])
        self.play(Create(cercle), FadeIn(l0, shift=LEFT * 0.2), run_time=1.6)
        self.play(Create(rayon), FadeIn(self.T("1", 30, JAUNE_TITRE).move_to(c + np.array([0.45, 1.0, 0]))), run_time=0.6)
        self.attendre_voix(marge=0.2)

        self.dire("00-garde-b")  # « Un axe rouge pour le cosinus. »
        ax = Arrow(c + LEFT * (R + 0.3), c + RIGHT * (R + 0.55), buff=0, stroke_width=6, color=C_COS,
                   max_tip_length_to_length_ratio=0.05)
        l1 = self.T("un axe rouge : cosinus", 36, C_COS).move_to([3.2, 0.1, 0])
        self.play(GrowArrow(ax), FadeIn(l1, shift=LEFT * 0.2), run_time=1.0)
        self.attendre_voix(marge=0.2)

        self.dire("00-garde-c")  # « Un axe vert pour le sinus. »
        ay = Arrow(c + DOWN * (R + 0.3), c + UP * (R + 0.45), buff=0, stroke_width=6, color=C_SIN,
                   max_tip_length_to_length_ratio=0.05)
        l2 = self.T("un axe vert : sinus", 36, C_SIN).move_to([3.2, -0.8, 0])
        self.play(GrowArrow(ay), FadeIn(l2, shift=LEFT * 0.2), run_time=1.0)
        self.attendre_voix(marge=0.2)

        self.dire("00-garde-d")  # « Avec ce seul dessin, tu vas retrouver toutes les valeurs. »
        # ⛔ Sur une ligne, la phrase passait sous Ti-Margo : deux lignes.
        fin = VGroup(self.T("Avec ce seul dessin :", 30, WHITE), self.T("toutes les valeurs.", 30, WHITE)).arrange(DOWN, buff=0.15).move_to([3.0, -1.95, 0])
        self.play(Write(fin))
        self.attendre_voix()

    # ── écran 1 : le dessin ─────────────────────────────────────────────────
    def ecran_dessin(self):
        """⛔ Frédéric, 28/09 : « il faut que tout aille de pair, synchronisé
        absolument ». La voix est découpée en SEPT clips, un par geste : chaque
        dessin part avec sa phrase et attend qu'elle finisse. La flèche orange
        n'apparaît que sur « sens inverse des aiguilles… positifs », la bleue que
        sur « sens des aiguilles… négatifs »."""
        self.clear()
        self.add_mascotte()
        c, R = C0, R0

        self.dire("01-dessin")    # « D'abord, le dessin. On trace un repère. »
        self.titre("D'abord, le dessin", 46)
        self.attendre_voix(marge=0.2)

        self.dire("01-dessin-b")  # « L'axe horizontal, en rouge : l'axe des cosinus. »
        ax = Arrow(c + LEFT * (R + 0.35), c + RIGHT * (R + 0.6), buff=0, stroke_width=5, color=C_COS,
                   max_tip_length_to_length_ratio=0.04)
        t1 = self.T("axe des cosinus", 34, C_COS).move_to([3.3, 1.6, 0])
        self.play(GrowArrow(ax), FadeIn(t1, shift=LEFT * 0.2))
        self.attendre_voix(marge=0.2)

        self.dire("01-dessin-c")  # « L'axe vertical, en vert : l'axe des sinus. »
        ay = Arrow(c + DOWN * (R + 0.35), c + UP * (R + 0.5), buff=0, stroke_width=5, color=C_SIN,
                   max_tip_length_to_length_ratio=0.04)
        t2 = self.T("axe des sinus", 34, C_SIN).move_to([3.3, 0.75, 0])
        self.play(GrowArrow(ay), FadeIn(t2, shift=LEFT * 0.2))
        self.attendre_voix(marge=0.2)

        self.dire("01-dessin-d")  # « Un cercle de centre O, de rayon 1. La clé de tout. »
        cercle = Circle(radius=R, color=BLEU_CALCUL, stroke_width=4).move_to(c)
        self.play(Create(cercle), run_time=1.4)
        rayon = Line(c, self.pos(PI / 4), color=JAUNE_TITRE, stroke_width=5)
        r1 = self.T("rayon = 1", 26, JAUNE_TITRE).move_to(c + np.array([2.05, 2.1, 0]))  # hors du cercle, au bout du rayon
        self.play(Create(rayon), FadeIn(r1))
        cle = self.encadre(self.T("rayon = 1 : la clé de tout", 34, JAUNE_TITRE), couleur=JAUNE_TITRE).move_to([3.3, -0.4, 0])
        self.play(FadeIn(cle[0]), Create(cle[1]))
        self.attendre_voix(marge=0.2)

        self.dire("01-dessin-e")  # « On part toujours du point I, à droite. »
        i = self.point(self.pos(0), WHITE, 0.12)
        self.play(FadeIn(i), FadeIn(self.T("I", 26, WHITE).next_to(i, UR, buff=0.06)), Flash(i, color=WHITE, line_length=0.2))
        self.attendre_voix(marge=0.2)

        self.dire("01-dessin-f")  # « Sens inverse des aiguilles : les angles sont positifs. »
        plus = Arc(radius=0.9, start_angle=0.15, angle=1.25, arc_center=c, color=ORANGE_ATTENTION,
                   stroke_width=5).add_tip(tip_length=0.22)
        t_plus = self.T("sens inverse des aiguilles : angles positifs", 24, ORANGE_ATTENTION).move_to([3.05, -1.4, 0])
        self.play(Create(plus), FadeIn(t_plus), run_time=1.5)
        self.attendre_voix(marge=0.2)

        self.dire("01-dessin-g")  # « L'autre sens, celui des aiguilles : les angles sont négatifs. »
        moins = Arc(radius=0.9, start_angle=-0.15, angle=-1.25, arc_center=c, color=BLEU_CALCUL,
                    stroke_width=5).add_tip(tip_length=0.22)
        t_moins = self.T("sens des aiguilles : angles négatifs", 24, BLEU_CALCUL).move_to([3.05, -2.0, 0])
        self.play(Create(moins), FadeIn(t_moins), run_time=1.5)
        self.attendre_voix()

    # ── écran 2 : degré et radian ───────────────────────────────────────────
    def ecran_radian(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-radian")
        self.titre("Le radian mesure la longueur de l'arc", 42)
        self.play(FadeIn(self.cercle_rv()))
        x0 = 3.0
        cm2 = VGroup(self.T("au CM2 :", 26, GRIS_DOUX), self.T("périmètre = 2 × π × R", 32, WHITE)).arrange(RIGHT, buff=0.25).move_to([x0, 2.3, 0])
        self.play(FadeIn(cm2))
        r1 = self.T("R = 1  →  un tour = 2π ≈ 6,28", 32, JAUNE_TITRE).move_to([x0, 1.55, 0])
        self.play(FadeIn(r1))
        tour = Arc(radius=R0 + 0.12, start_angle=0, angle=TAU, arc_center=C0, color=ORANGE_ATTENTION, stroke_width=6)
        self.play(Create(tour), run_time=1.6)
        self.play(FadeOut(tour))
        table = VGroup(*[
            self.rang(self.T(deg, 32, WHITE), "=", self.fpi(n, d, 30, JAUNE_TITRE), font_size=32)
            for deg, n, d in [("360°", 2, 1), ("180°", 1, 1), ("90°", 1, 2), ("30°", 1, 6)]
        ]).arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to([1.35, -0.35, 0])
        self.play(LaggedStart(*[FadeIn(t, shift=RIGHT * 0.15) for t in table], lag_ratio=0.3), run_time=1.6)
        # π/6 : l'arc, puis le même arc DÉROULÉ en segment.
        arc = Arc(radius=R0, start_angle=0, angle=PI / 6, arc_center=C0, color=ORANGE_ATTENTION, stroke_width=9)
        self.play(Create(arc), FadeIn(self.etiquette(1, 6, ORANGE_ATTENTION)))
        long = R0 * PI / 6
        seg = Line([4.2 - long / 2, 0.1, 0], [4.2 + long / 2, 0.1, 0], color=ORANGE_ATTENTION, stroke_width=9)
        self.play(TransformFromCopy(arc, seg), run_time=1.4)
        self.play(FadeIn(self.rang("longueur", self.fpi(1, 6, 26, ORANGE_ATTENTION), "≈ 0,52",
                                   font_size=28, color=ORANGE_ATTENTION).next_to(seg, DOWN, buff=0.3)))
        self.play(Write(self.chute("Sur le cercle de rayon 1, l'angle en radians EST la longueur de l'arc.", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    # ── écran 3 : l'enroulement ─────────────────────────────────────────────
    def enrouler(self, c, R, signe, couleur):
        """Le cercle, la droite graduée tangente en I, et l'enroulement de
        [0 ; 3] (signe = +1, vers le haut) ou de [−3 ; 0] (signe = −1, vers le
        bas). Rend le groupe dessiné, pour pouvoir l'effacer ensuite."""
        fig = self.cercle_rv(c, R)
        self.play(FadeIn(fig), run_time=0.6)
        x0 = c[0] + R
        droite = Line([x0, c[1] - signe * 0.3, 0], [x0, c[1] + signe * (3 * R + 0.3), 0], color=WHITE, stroke_width=3)
        grad = VGroup()
        for k in range(0, 4):
            y = c[1] + signe * k * R
            grad.add(Line([x0 - 0.1, y, 0], [x0 + 0.1, y, 0], color=WHITE, stroke_width=3))
            if k:  # le 0 de la droite, c'est I
                grad.add(self.T(("" if signe > 0 else "−") + str(k), 24, WHITE).move_to([x0 + 0.4, y, 0]))
        self.play(Create(droite), FadeIn(grad), run_time=0.8)
        seg = Line([x0, c[1], 0], [x0, c[1] + signe * 3 * R, 0], color=couleur, stroke_width=7)
        self.play(Create(seg), run_time=0.6)
        self.play(Transform(seg, Arc(radius=R, start_angle=0, angle=signe * 3, arc_center=c, color=couleur,
                                     stroke_width=7)), run_time=2.2)
        P = lambda t, r=R: c + np.array([r * np.cos(t), r * np.sin(t), 0])
        points = VGroup(*[self.point(P(signe * k), couleur, 0.08) for k in (1, 2, 3)])
        noms = VGroup(*[self.T(("" if signe > 0 else "−") + str(k), 24, couleur).move_to(P(signe * k, R + 0.38))
                        for k in (1, 2, 3)])
        self.play(FadeIn(points), FadeIn(noms))
        return VGroup(fig, droite, grad, seg, points, noms)

    def ecran_enroulement(self):
        """⭐ Frédéric, 28/09 : l'enroulement « on peut le faire côté positif ou
        négatif ». Les deux, de la même façon : [0 ; 3] vers le haut, dans le
        sens inverse des aiguilles ; puis la figure remonte et [−3 ; 0]
        s'enroule vers le bas, dans l'autre sens.
        ⛔ Trois rayons de droite graduée : R = 1,2, sinon elle sort du cadre."""
        self.clear()
        self.add_mascotte()
        self.dire("03-enroulement")
        self.titre("Enrouler la droite sur le cercle", 44)
        R = 1.2
        txt = VGroup(
            self.T("positifs : sens inverse des aiguilles", 28, ORANGE_ATTENTION),
            self.T("négatifs : sens des aiguilles", 28, BLEU_CALCUL),
            self.rang("un tour =", self.T("2π", 30, JAUNE_TITRE), font_size=28),
            self.rang("x  et  x + 2π :", self.T("même point", 28, VERT_OK), font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([3.1, 0.6, 0])

        haut = self.enrouler(np.array([-3.2, -1.75, 0]), R, +1, ORANGE_ATTENTION)
        self.play(FadeIn(txt[0], shift=RIGHT * 0.15), run_time=0.5)
        self.wait(0.8)
        self.play(FadeOut(haut), run_time=0.5)
        self.enrouler(np.array([-3.2, 0.95, 0]), R, -1, BLEU_CALCUL)  # ⛔ à 1,3, « sin » passait sous le titre
        self.play(FadeIn(txt[1], shift=RIGHT * 0.15), run_time=0.5)
        for l in txt[2:]:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.5)
        fin = self.T("Un point du cercle : une infinité de réels.", 28, VERT_OK)
        fin.scale_to_fit_width(min(fin.width, 6.0)).move_to([3.1, -1.55, 0])
        self.play(Write(fin))
        self.attendre_voix()

    # ── écran 4 : les valeurs remarquables, en tournant ─────────────────────
    def ecran_valeurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-valeurs")
        self.titre("cos sur le rouge, sin sur le vert", 44)
        self.play(FadeIn(self.cercle_rv()))
        theta = ValueTracker(0.0)
        self.play(FadeIn(self.projections_vivantes(theta)))
        arrets = [(0, 1, "1", "0"), (1, 6, "3/2", "1/2"), (1, 4, "2/2", "2/2"), (1, 3, "1/2", "3/2"), (1, 2, "0", "1")]
        aff = None
        for n, d, co, si in arrets:
            cible = n * PI / d
            if cible > 0:
                self.remove(aff)
                vivant = self.lecture_vivante(theta)
                self.add(vivant)
                self.play(theta.animate.set_value(cible), run_time=1.3)
                self.remove(vivant)
                self.add(self.point(self.pos(cible), WHITE, 0.07), self.etiquette(n, d))
            aff = self.lecture(n, d, co, si)
            self.play(FadeIn(aff), run_time=0.4)
            self.wait(1.4)
        self.play(Write(self.chute("L'angle grandit : le rouge raccourcit, le vert s'allonge.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── écran 4 bis : le tableau des valeurs remarquables ───────────────────
    def ecran_tableau(self):
        """⭐ Frédéric, 28/09 : « il manque un écran sur les valeurs remarquables ».
        Le récapitulatif, juste après le point qui tourne : la ligne √0/2 … √4/2
        donne les sinus (en VERT), la même ligne à l'envers les cosinus (en
        ROUGE) — sa convention de classe, tenue jusque dans le tableau."""
        self.clear()
        self.add_mascotte()
        self.dire("04b-tableau")
        self.titre("Les valeurs remarquables, en une ligne", 42)
        cols = [-3.4 + 1.65 * i for i in range(5)]
        ys = {"x": 2.0, "astuce": 0.9, "sin": -0.3, "cos": -1.5}
        entetes = VGroup(
            self.T("x", 32, WHITE).move_to([-5.6, ys["x"], 0]),
            self.T("astuce", 26, GRIS_DOUX).move_to([-5.6, ys["astuce"], 0]),
            self.T("sin x", 32, C_SIN).move_to([-5.6, ys["sin"], 0]),
            self.T("cos x", 32, C_COS).move_to([-5.6, ys["cos"], 0]),
        )
        traits = VGroup(*[Line([-6.4, y, 0], [4.3, y, 0], color=GRIS_DOUX, stroke_width=1.5)
                          for y in (1.45, 0.3, -0.9)])
        self.play(FadeIn(entetes), Create(traits))
        angles = VGroup(*[self.fpi(n, d, 32).move_to([cols[i], ys["x"], 0])
                          for i, (n, d) in enumerate([(0, 1), (1, 6), (1, 4), (1, 3), (1, 2)])])
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.1) for a in angles], lag_ratio=0.25))
        astuces = VGroup(*[self.frac(self.radical(str(k), font_size=32, color=ORANGE_ATTENTION),
                                     self.T("2", 32, ORANGE_ATTENTION), color=ORANGE_ATTENTION).move_to([cols[k], ys["astuce"], 0])
                           for k in range(5)])
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.1) for a in astuces], lag_ratio=0.35), run_time=2.2)
        ronds = VGroup(*[Circle(radius=0.22, color=JAUNE_TITRE, stroke_width=3).move_to(a[0][0][-1].get_center())
                         for a in astuces])
        self.play(LaggedStart(*[Create(r) for r in ronds], lag_ratio=0.3), run_time=1.5)
        self.play(FadeOut(ronds))
        cles = ["0", "1/2", "2/2", "3/2", "1"]
        sinus = VGroup(*[self.fval(v, 32, C_SIN).move_to([cols[i], ys["sin"], 0]) for i, v in enumerate(cles)])
        self.play(LaggedStart(*[TransformFromCopy(astuces[i], sinus[i]) for i in range(5)], lag_ratio=0.3), run_time=2.4)
        cosinus = VGroup(*[self.fval(cles[4 - i], 32, C_COS).move_to([cols[i], ys["cos"], 0]) for i in range(5)])
        envers = self.T("cos : la même ligne, à l'envers", 28, C_COS).move_to([-0.1, -2.35, 0])  # ⛔ à droite, il sortait du cadre
        self.play(LaggedStart(*[TransformFromCopy(sinus[4 - i], cosinus[i]) for i in range(5)], lag_ratio=0.3),
                  FadeIn(envers), run_time=2.4)
        self.play(Write(self.chute("Plus l'angle est grand : le vert s'allonge, le rouge raccourcit.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── écran 5 : le triangle rectangle et cos² + sin² = 1 ──────────────────
    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-triangle")
        self.titre("Le triangle du collège est dans le cercle", 42)
        self.play(FadeIn(self.cercle_rv()))
        M = self.pos(PI / 6)
        H = np.array([M[0], C0[1], 0])
        tri = Polygon(C0, H, M, color=WHITE, fill_color=BLEU_CALCUL, fill_opacity=0.18, stroke_width=3)
        droit = Square(side_length=0.22, color=WHITE, stroke_width=2).move_to(H + np.array([-0.11, 0.11, 0]))
        oh = Line(C0, H, color=C_COS, stroke_width=9)
        hm = Line(H, M, color=C_SIN, stroke_width=9)
        self.play(Create(tri), Create(droit))
        self.play(Create(oh), Create(hm))
        self.play(FadeIn(self.T("M", 26, WHITE).next_to(M, UR, buff=0.06)), FadeIn(self.point(M, JAUNE_TITRE, 0.1)),
                  FadeIn(self.T("H", 26, WHITE).next_to(H, DOWN, buff=0.14)),
                  FadeIn(self.T("1", 28, JAUNE_TITRE).move_to((C0 + M) / 2 + np.array([-0.15, 0.3, 0]))))

        x0 = 3.3
        l1 = self.rang("cos x =", self.frac(self.T("OH", 30), self.T("OM", 30)), "= OH", font_size=34, color=C_COS).move_to([x0, 2.2, 0])
        l2 = self.rang("sin x =", self.frac(self.T("HM", 30), self.T("OM", 30)), "= HM", font_size=34, color=C_SIN).move_to([x0, 1.0, 0])
        self.play(FadeIn(l1, shift=LEFT * 0.15))
        self.play(FadeIn(l2, shift=LEFT * 0.15))
        pyth = self.rang(self.puissance("OH", "2", 32), "+", self.puissance("HM", "2", 32), "=", self.puissance("OM", "2", 32),
                         "= 1", font_size=32).move_to([x0, -0.05, 0])
        self.play(FadeIn(pyth))
        formule = self.encadre(self.rang(self.puissance("cos", "2", 36, C_COS), self.T("x +", 36),
                                         self.puissance("sin", "2", 36, C_SIN), self.T("x = 1", 36), font_size=36),
                               couleur=JAUNE_TITRE).move_to([x0, -1.05, 0])
        self.play(FadeIn(formule[0]), Create(formule[1]))
        verif = self.T("π/6 :  3/4 + 1/4 = 1", 28, GRIS_DOUX).move_to([x0, -2.0, 0])
        self.play(FadeIn(verif))
        self.attendre_voix()

    # ── écran 6 : les angles négatifs ───────────────────────────────────────
    def ecran_negatifs(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-negatifs")
        self.titre("Et les angles négatifs ?", 46)
        self.play(FadeIn(self.cercle_rv()))
        theta = ValueTracker(0.0)
        self.play(FadeIn(self.projections_vivantes(theta)))
        arrets = [(1, 6, "3/2", "-1/2"), (1, 4, "2/2", "-2/2"), (1, 3, "1/2", "-3/2"), (1, 2, "0", "-1")]
        aff = None
        for n, d, co, si in arrets:
            cible = -n * PI / d
            jumeau = self.point(self.pos(-cible), GRIS_DOUX, 0.07)  # même abscisse, en haut
            self.remove(aff)
            self.play(theta.animate.set_value(cible), FadeIn(jumeau), run_time=1.0)
            self.add(self.point(self.pos(cible), WHITE, 0.07), self.etiquette(-n, d))
            aff = self.lecture(-n, d, co, si, y=1.25)
            self.play(FadeIn(aff), run_time=0.4)
            self.wait(1.5)
        regles = VGroup(
            self.encadre(self.T("cos(−x) = cos(x)", 38, C_COS), couleur=C_COS),
            self.encadre(self.T("sin(−x) = −sin(x)", 38, C_SIN), couleur=C_SIN),
        ).arrange(DOWN, buff=0.3).move_to([3.35, -1.35, 0])
        self.play(FadeIn(regles[0][0]), Create(regles[0][1]))
        self.play(FadeIn(regles[1][0]), Create(regles[1][1]))
        self.attendre_voix()

    # ── écran 7 : le vent ───────────────────────────────────────────────────
    def ecran_vent(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-vent")
        self.titre("Quand le cosinus est-il positif ?", 44)
        self.play(FadeIn(self.cercle_rv()))
        c, R = C0, R0
        toi = Arrow(c + LEFT * 0.2, c + RIGHT * 1.3, buff=0, color=WHITE, stroke_width=8,
                    max_tip_length_to_length_ratio=0.25)
        self.play(GrowArrow(toi), FadeIn(self.T("tu avances", 24, WHITE).next_to(toi.get_end(), UP, buff=0.18)))
        theta = ValueTracker(PI / 6)
        vent = always_redraw(lambda: Arrow(c, self.pos(theta.get_value(), R * 0.92), buff=0, color=BLEU_CALCUL,
                                           stroke_width=8, max_tip_length_to_length_ratio=0.15))
        nom = always_redraw(lambda: self.T("le vent", 24, BLEU_CALCUL).move_to(self.pos(theta.get_value() + 0.5, R * 0.55)))
        self.play(GrowArrow(vent), FadeIn(nom))
        verdicts = [
            (PI / 6, "π/6 : le vent t'aide", "cos > 0", C_COS),
            (PI / 2, "π/2 : il souffle de côté", "cos = 0", WHITE),
            (2 * PI / 3, "2π/3 : il te freine", "cos < 0", GRIS_DOUX),
        ]
        for i, (t, phrase, signe, coul) in enumerate(verdicts):
            if i:
                self.play(theta.animate.set_value(t), run_time=1.3)
            g = VGroup(self.T(phrase, 30, WHITE), self.T(signe, 38, coul)).arrange(DOWN, buff=0.18).move_to([3.3, 1.9 - i * 1.3, 0])
            self.play(FadeIn(g, shift=LEFT * 0.15))
            self.wait(2.0)
        droite = Arc(radius=R + 0.14, start_angle=-PI / 2, angle=PI, arc_center=c, color=C_COS, stroke_width=9)
        gauche = Arc(radius=R + 0.14, start_angle=PI / 2, angle=PI, arc_center=c, color=GRIS_DOUX, stroke_width=9)
        self.play(Create(droite), Create(gauche), run_time=1.2)
        # ⛔ En « chute », la phrase touchait le pied de l'axe vert : elle passe à droite.
        bilan = VGroup(self.T("à droite : cos > 0", 30, C_COS), self.T("à gauche : cos < 0", 30, GRIS_DOUX)).arrange(DOWN, buff=0.15).move_to([3.3, -2.0, 0])
        self.play(Write(bilan))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-defi")
        self.play(Write(self.T("Défi", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)))
        lignes = VGroup(
            self.rang("1.  cos(", self.fpi(-1, 3, 32), ") = ?", font_size=40, color=C_COS),
            self.rang("2.  sin(", self.fpi(-1, 3, 32), ") = ?", font_size=40, color=C_SIN),
            self.rang("3.  cos(", self.fpi(3, 4, 32), ") : positif ou négatif ?", font_size=40),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to([0, 0.2, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=DOWN * 0.15), run_time=0.5)
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-correction")
        self.play(Write(self.T("Correction", 52, JAUNE_TITRE).to_edge(UP, buff=0.5)))
        self.play(FadeIn(self.cercle_rv()))
        theta = ValueTracker(-PI / 3)
        self.play(FadeIn(self.projections_vivantes(theta)), FadeIn(self.etiquette(-1, 3)))
        c1 = self.rang("cos(", self.fpi(-1, 3, 28), ") = cos(", self.fpi(1, 3, 28), ") =", self.fval("1/2", 30, C_COS),
                       font_size=34, color=C_COS)
        c2 = self.rang("sin(", self.fpi(-1, 3, 28), ") =", self.fval("-3/2", 30, C_SIN), font_size=34, color=C_SIN)
        VGroup(c1, c2).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([3.3, 1.3, 0])
        self.play(FadeIn(c1))
        self.play(FadeIn(c2))
        self.play(theta.animate.set_value(3 * PI / 4), run_time=1.6)
        self.add(self.etiquette(3, 4))
        c3 = self.rang("cos(", self.fpi(3, 4, 28), ") < 0 : à gauche", font_size=34, color=GRIS_DOUX).move_to([3.3, -0.9, 0])
        self.play(FadeIn(c3))
        self.attendre_voix()

    def construct(self):
        self.garde_dessinee()
        self.page_objectifs([
            "dessiner le cercle, mesurer en radians, y placer un réel",
            "lire cos et sin des valeurs remarquables, lien avec le triangle",
            "passer à l'angle opposé, et le signe du cosinus",
        ])
        self.ecran_dessin()
        self.ecran_radian()
        self.ecran_enroulement()
        self.ecran_valeurs()
        self.ecran_tableau()
        self.ecran_triangle()
        self.ecran_negatifs()
        self.ecran_vent()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "rayon 1 ; le radian mesure l'arc ; chaque réel s'enroule",
                "cos sur le rouge, sin sur le vert ; cos² x + sin² x = 1",
                "cos(−x) = cos x, sin(−x) = −sin x ; cos > 0 à droite",
            ],
            rappel="cos(−x) = cos(x) : on peut enlever le moins. Pas pour le sinus.",
        )
        self.page_abonnement()
