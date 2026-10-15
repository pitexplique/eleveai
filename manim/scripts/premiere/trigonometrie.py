# trigonometrie.py
# EleveAI — Maths première spécialité — La trigonométrie (notionId : trigonometrie)
#
# ⭐ LE FIL, celui de la feuille d'exercices du 26/09 : UN RÉEL EST UN CHEMIN
# SUR LE CERCLE, ET LE CERCLE RÉPOND À TOUT. L'accroche le montre par le
# paradoxe : au collège un cosinus était toujours positif, et cos 3 vaut
# presque −1.
#
#   TrigoCercle → radian, enroulement, placer un réel, cos et sin, lien avec
#                 le triangle rectangle, valeurs remarquables.   (vidéo 1 sur 2)
#
# Mapping micro-compétences (notion trigonometrie) :
#   trig_radian, trig_arc           → écran 1
#   trig_enroulement                → écran 2
#   trig_cercle                     → écran 3
#   trig_cos_sin                    → écran 4
#   trig_triangle_rectangle         → écran 5
#   trig_valeurs                    → écran 6
#   trig_angles_associes, trig_grand_reel, trig_parite, trig_periodicite,
#   trig_courbes                    → ⏳ vidéo 2
#
# Script de la voix validé par Frédéric le 27/09 (« après vidéo paysage »).
# ⛔ Pas de LaTeX sur ce poste : Text + dessin, fractions et radicaux composés.
#
# Rendu (sans cache, sinon les sons sautent) :
#   python -m manim render -qh --disable_caching manim/scripts/premiere/trigonometrie.py TrigoCercle -o eleveai-maths-premiere-trigonometrie-cercle --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np
from manim import *

from charte import *
from second_degre import SecondDegreBase
from gabarit_seconde import SONS

GRIS_DOUX = GREY_B
ORANGE_ATTENTION = ORANGE_RETENUE


class TrigoBase(SecondDegreBase):
    """Les aides communes aux vidéos de trigonométrie."""

    identite = "Maths première — EleveAI"
    episode = ""
    total = 2

    # ── les nombres composés ────────────────────────────────────────────────

    def fpi(self, n, d, font_size=30, color=WHITE):
        """nπ/d, empilé : « 7π » sur « 6 ». d = 1 → « nπ » sur une ligne."""
        signe = "−" if n < 0 else ""
        n = abs(n)
        haut = f"{signe}{'' if n == 1 else n}π" if n else "0"
        if d == 1 or n == 0:
            return self.T(haut, font_size, color)
        return self.frac(self.T(haut, font_size, color), self.T(str(d), font_size, color), color=color)

    def fval(self, cle, font_size=30, color=WHITE):
        """Une valeur remarquable : 0, 1, −1, 1/2, √2/2, √3/2 (et leurs opposés)."""
        signe = "−" if cle.startswith("-") else ""
        c = cle.lstrip("-")
        if c in ("0", "1"):
            return self.T(f"{signe}{c}", font_size, color)
        if c == "1/2":
            haut = self.T(f"{signe}1", font_size, color)
        else:
            haut = self.radical(c[0], coefficient=signe, font_size=font_size, color=color)
        return self.frac(haut, self.T("2", font_size, color), color=color)

    # ── le cercle trigonométrique ───────────────────────────────────────────

    def cercle_trigo(self, centre, R, axes_lettres=True):
        """Le repère, le cercle de rayon R, et O, I, J. Rend (groupe, pos)."""
        c = np.array(centre, dtype=float)

        def pos(theta, rayon=None):
            r = R if rayon is None else rayon
            return c + np.array([r * np.cos(theta), r * np.sin(theta), 0])

        ax = Arrow(c + LEFT * (R + 0.35), c + RIGHT * (R + 0.55), buff=0, stroke_width=2.5,
                   color=GRIS_DOUX, max_tip_length_to_length_ratio=0.04)
        ay = Arrow(c + DOWN * (R + 0.35), c + UP * (R + 0.55), buff=0, stroke_width=2.5,
                   color=GRIS_DOUX, max_tip_length_to_length_ratio=0.04)
        cercle = Circle(radius=R, color=BLEU_CALCUL, stroke_width=4).move_to(c)
        g = VGroup(ax, ay, cercle)
        if axes_lettres:
            g.add(self.T("O", 24, GRIS_DOUX).next_to(c, DL, buff=0.08))
            g.add(self.T("I", 24, GRIS_DOUX).next_to(pos(0), DR, buff=0.08))
            g.add(self.T("J", 24, GRIS_DOUX).next_to(pos(PI / 2), UL, buff=0.08))
        return g, pos

    def point(self, p, couleur=ROUGE_ERREUR, rayon=0.1):
        return Dot(p, radius=rayon, color=couleur)

    def arc_parcouru(self, centre, R, theta, couleur=ORANGE_ATTENTION, decalage=0.14):
        """L'arc de I jusqu'au réel θ, un peu à l'extérieur du cercle, fléché."""
        return Arc(radius=R + decalage, start_angle=0, angle=theta, arc_center=centre,
                   color=couleur, stroke_width=6).add_tip(tip_length=0.2)

    def projections(self, centre, p, couleur):
        c = np.array(centre, dtype=float)
        v = DashedLine(p, [p[0], c[1], 0], color=couleur, stroke_width=3, dash_length=0.12)
        h = DashedLine(p, [c[0], p[1], 0], color=couleur, stroke_width=3, dash_length=0.12)
        return VGroup(v, h)


# ══════════════════════════════════════════════════════════════════════════════
#  VIDÉO 1 — LE CERCLE TRIGONOMÉTRIQUE
# ══════════════════════════════════════════════════════════════════════════════


class TrigoCercle(TrigoBase):
    episode = "1"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.dossier_voix = SONS / "premiere-trigonometrie-cercle"

    # ── écran 1 : le radian ─────────────────────────────────────────────────
    def ecran_radian(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-radian")
        titre = self.T("Le radian : un rayon posé sur le cercle", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre))

        c = np.array([-3.4, -0.5, 0])
        R = 2.1
        cercle = Circle(radius=R, color=BLEU_CALCUL, stroke_width=4).move_to(c)
        centre = Dot(c, radius=0.06, color=WHITE)
        self.play(Create(cercle), FadeIn(centre))

        # Le rayon, puis le même rayon « couché » sur le bord : l'arc de 1 rad.
        rayon = Line(c, c + RIGHT * R, color=VERT_OK, stroke_width=6)
        self.play(Create(rayon))
        ruban = Arc(radius=R, start_angle=0, angle=1, arc_center=c, color=VERT_OK, stroke_width=9)
        self.play(TransformFromCopy(rayon, ruban), run_time=1.3)
        rayon2 = Line(c, c + R * np.array([np.cos(1), np.sin(1), 0]), color=VERT_OK, stroke_width=3)
        angle1 = Arc(radius=0.55, start_angle=0, angle=1, arc_center=c, color=JAUNE_TITRE, stroke_width=4)
        lab1 = self.T("1 rad", 26, JAUNE_TITRE).move_to(c + 0.95 * np.array([np.cos(0.5), np.sin(0.5), 0]))
        self.play(Create(rayon2), Create(angle1), FadeIn(lab1))

        # Trois rayons et un peu plus : le demi-tour.
        morceaux = VGroup(*[
            Arc(radius=R, start_angle=k, angle=min(1, PI - k), arc_center=c,
                color=[VERT_OK, ORANGE_ATTENTION, VIOLET_ACCENT, ROUGE_ERREUR][k], stroke_width=9)
            for k in range(4)
        ])
        self.play(LaggedStart(*[Create(m) for m in morceaux[1:]], lag_ratio=0.5), run_time=2)
        demi = self.T("demi-tour : un peu plus de 3 rayons", 24, GRIS_DOUX).next_to(cercle, DOWN, buff=0.3)
        self.play(FadeIn(demi))

        # À droite : ce qu'il faut retenir.
        cle = self.encadre(self.T("180° = π rad", 44, JAUNE_TITRE), couleur=JAUNE_TITRE)
        cle.move_to([3.2, 1.6, 0])
        l1 = self.rang("30° =", self.fpi(1, 6, 34), font_size=34).move_to([3.2, 0.2, 0])
        l2 = self.rang("90° =", self.fpi(1, 2, 34), font_size=34).move_to([3.2, -0.95, 0])
        arc = self.T("arc = r × θ   (θ en radians)", 30, VERT_OK).move_to([3.2, -2.05, 0])
        self.play(FadeIn(cle[0]), Create(cle[1]))
        self.play(FadeIn(l1, shift=UP * 0.1))
        self.play(FadeIn(l2, shift=UP * 0.1))
        self.play(FadeIn(arc))
        self.attendre_voix()

    # ── écran 2 : l'enroulement ─────────────────────────────────────────────
    def ecran_enroulement(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-enroulement")
        titre = self.T("Enrouler la droite sur le cercle", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre))

        # ⛔ Le segment [0 ; 3] mesure 3 rayons : avec le cercle au milieu, il
        # sortait par le haut du cadre. Le cercle descend, le rayon diminue.
        c = np.array([-2.8, -1.9, 0])
        R = 1.45
        repere, pos = self.cercle_trigo(c, R)
        self.play(FadeIn(repere))

        # La droite graduée, verticale, tangente en I.
        x0 = c[0] + R
        droite = Line([x0, c[1] - 0.4, 0], [x0, c[1] + 3 * R + 0.35, 0], color=WHITE, stroke_width=3)
        graduations = VGroup()
        for k in range(0, 4):
            y = c[1] + k * R
            graduations.add(Line([x0 - 0.1, y, 0], [x0 + 0.1, y, 0], color=WHITE, stroke_width=3))
            if k:  # le 0 de la droite, c'est I : son étiquette chevauchait « I »
                graduations.add(self.T(str(k), 24, WHITE).move_to([x0 + 0.35, y, 0]))
        self.play(Create(droite), FadeIn(graduations))

        # On enroule le segment [0 ; 3] : il devient un arc de 3 radians.
        seg = Line([x0, c[1], 0], [x0, c[1] + 3 * R, 0], color=ORANGE_ATTENTION, stroke_width=7)
        seg.set_z_index(2)
        self.play(Create(seg), run_time=0.6)
        arc3 = Arc(radius=R, start_angle=0, angle=3, arc_center=c, color=ORANGE_ATTENTION, stroke_width=7)
        self.play(Transform(seg, arc3), run_time=2.2)
        points = VGroup(*[self.point(pos(k), ORANGE_ATTENTION, 0.08) for k in (1, 2, 3)])
        noms = VGroup(*[self.T(str(k), 24, ORANGE_ATTENTION).move_to(pos(k, R + 0.35)) for k in (1, 2, 3)])
        self.play(FadeIn(points), FadeIn(noms))

        l1 = self.T("x > 0 : sens inverse des aiguilles", 28, WHITE)
        l2 = self.T("x < 0 : sens des aiguilles", 28, WHITE)
        l3 = self.rang("un tour complet =", self.T("2π", 32, JAUNE_TITRE), font_size=30)
        l4 = self.rang("x  et  x + 2π  :", self.T("même point", 30, VERT_OK), font_size=30)
        droite_txt = VGroup(l1, l2, l3, l4).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([3.3, 0.15, 0])
        for l in droite_txt:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔ En « chute », la phrase passait sur le bas du cercle (planche du 27/09).
        fin = self.T("Un point du cercle a une infinité de réels.", 28, VERT_OK)
        fin.scale_to_fit_width(min(fin.width, 6.2)).move_to([3.3, -1.75, 0])
        self.play(Write(fin))
        self.attendre_voix()

    # ── écran 3 : placer un réel ────────────────────────────────────────────
    def ecran_placer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-placer")
        titre = self.T("Placer un réel : des demi-tours, plus un reste", 42, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre))

        # ⛔ À −0,6 l'étiquette de −π/3 touchait la phrase du bas (planche du 27/09).
        c = np.array([-3.0, -0.2, 0])
        R = 1.8
        repere, pos = self.cercle_trigo(c, R)
        self.play(FadeIn(repere))

        # 7π/6 = π + π/6 : un demi-tour, puis un petit sixième.
        eq = self.rang(self.fpi(7, 6, 32), "=", self.T("π", 34, ORANGE_ATTENTION), "+", self.fpi(1, 6, 32, VIOLET_ACCENT), font_size=34)
        eq.move_to([3.3, 1.5, 0])
        self.play(FadeIn(eq))
        m = self.point(pos(0), ROUGE_ERREUR)
        self.play(FadeIn(m))
        a1 = Arc(radius=R + 0.14, start_angle=0, angle=PI, arc_center=c, color=ORANGE_ATTENTION, stroke_width=6)
        self.play(Create(a1), MoveAlongPath(m, Arc(radius=R, start_angle=0, angle=PI, arc_center=c)), run_time=1.6)
        a2 = Arc(radius=R + 0.14, start_angle=PI, angle=PI / 6, arc_center=c, color=VIOLET_ACCENT, stroke_width=6)
        self.play(Create(a2), MoveAlongPath(m, Arc(radius=R, start_angle=PI, angle=PI / 6, arc_center=c)), run_time=0.9)
        n7 = self.fpi(7, 6, 26, ROUGE_ERREUR).move_to(pos(7 * PI / 6, R + 0.8))
        self.play(FadeIn(n7))
        self.play(FadeIn(self.T("en bas à gauche", 26, GRIS_DOUX).next_to(eq, DOWN, buff=0.35)))

        # −π/3 : l'autre sens.
        eq2 = self.rang(self.fpi(-1, 3, 32), ": sens des aiguilles", font_size=30).move_to([3.3, -0.55, 0])
        self.play(FadeIn(eq2))
        m2 = self.point(pos(0), BLEU_CALCUL)
        self.play(FadeIn(m2))
        a3 = Arc(radius=R + 0.14, start_angle=0, angle=-PI / 3, arc_center=c, color=BLEU_CALCUL, stroke_width=6)
        self.play(Create(a3), MoveAlongPath(m2, Arc(radius=R, start_angle=0, angle=-PI / 3, arc_center=c)), run_time=1.0)
        n3 = self.fpi(-1, 3, 26, BLEU_CALCUL).move_to(pos(-PI / 3, R + 0.55))
        self.play(FadeIn(n3))
        self.play(FadeIn(self.T("en bas à droite", 26, GRIS_DOUX).next_to(eq2, DOWN, buff=0.35)))
        self.play(Write(self.chute("La méthode : des demi-tours (π), plus un reste.", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    # ── écran 4 : cos et sin ────────────────────────────────────────────────
    def ecran_cos_sin(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-cos-sin")
        titre = self.T("cos x : l'abscisse.   sin x : l'ordonnée.", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre))

        c = np.array([-3.2, -0.55, 0])
        R = 2.0
        repere, pos = self.cercle_trigo(c, R)
        self.play(FadeIn(repere))

        theta = ValueTracker(0.9)
        m = always_redraw(lambda: self.point(pos(theta.get_value()), ROUGE_ERREUR))
        rayon = always_redraw(lambda: Line(c, pos(theta.get_value()), color=ROUGE_ERREUR, stroke_width=3))
        proj = always_redraw(lambda: self.projections(c, pos(theta.get_value()), ROUGE_ERREUR))
        pied_x = always_redraw(lambda: Line(c, [pos(theta.get_value())[0], c[1], 0], color=VERT_OK, stroke_width=7))
        pied_y = always_redraw(lambda: Line(c, [c[0], pos(theta.get_value())[1], 0], color=ORANGE_ATTENTION, stroke_width=7))
        self.play(FadeIn(rayon), FadeIn(m))
        self.play(FadeIn(proj))
        self.play(Create(pied_x), Create(pied_y))
        lab_cos = self.T("cos x", 26, VERT_OK).move_to(c + np.array([R * np.cos(0.9) / 2, -0.35, 0]))
        lab_sin = self.T("sin x", 26, ORANGE_ATTENTION).move_to(c + np.array([-0.62, R * np.sin(0.9) / 2, 0]))
        self.play(FadeIn(lab_cos), FadeIn(lab_sin))

        faits = VGroup(
            self.T("−1 ≤ cos x ≤ 1   et   −1 ≤ sin x ≤ 1", 28, WHITE),
            self.rang(self.puissance("cos", "2", 32), "x +", self.puissance("sin", "2", 32), "x = 1", font_size=32),
            self.T("les signes se lisent sur la position de M", 26, GRIS_DOUX),
        ).arrange(DOWN, buff=0.45).move_to([3.3, 0.9, 0])
        for f in faits:
            self.play(FadeIn(f, shift=RIGHT * 0.15), run_time=0.55)

        # cos 3 : presque un demi-tour, le point est presque tout à gauche.
        self.play(FadeOut(lab_cos), FadeOut(lab_sin))
        self.play(theta.animate.set_value(3), run_time=2.2)
        res = self.encadre(self.T("cos 3 ≈ −0,99", 40, VERT_OK), couleur=VERT_OK).move_to([3.3, -1.55, 0])
        self.play(FadeIn(res[0]), Create(res[1]))
        self.play(Write(self.chute("3 radians, c'est presque π : le point est presque tout à gauche.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── écran 5 : le triangle du collège ────────────────────────────────────
    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-triangle")
        titre = self.T("Et le cosinus du collège ?", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre))

        c = np.array([-4.3, -2.3, 0])
        R = 3.6
        th = 0.62
        quart = Arc(radius=R, start_angle=0, angle=PI / 2, arc_center=c, color=BLEU_CALCUL, stroke_width=4)
        ax = Line(c, c + RIGHT * (R + 0.4), color=GRIS_DOUX, stroke_width=2.5)
        ay = Line(c, c + UP * (R + 0.3), color=GRIS_DOUX, stroke_width=2.5)
        M = c + R * np.array([np.cos(th), np.sin(th), 0])
        H = np.array([M[0], c[1], 0])
        tri = Polygon(c, H, M, color=VERT_OK, fill_color=VERT_OK, fill_opacity=0.15, stroke_width=4)
        droit = Square(side_length=0.25, color=WHITE, stroke_width=2).move_to(H + np.array([-0.125, 0.125, 0]))
        self.play(Create(ax), Create(ay), Create(quart))
        self.play(Create(tri), Create(droit))
        self.play(FadeIn(self.T("O", 26, WHITE).next_to(c, DL, buff=0.08)),
                  FadeIn(self.T("H", 26, WHITE).next_to(H, DOWN, buff=0.12)),
                  FadeIn(self.T("M", 26, ROUGE_ERREUR).next_to(M, UR, buff=0.08)),
                  FadeIn(self.point(M, ROUGE_ERREUR)))
        hyp = self.T("OM = 1", 26, JAUNE_TITRE).move_to((c + M) / 2 + np.array([-0.35, 0.4, 0]))
        self.play(FadeIn(hyp))

        calc = VGroup(
            self.T("au collège :", 28, GRIS_DOUX),
            self.rang("cos x =", self.frac(self.T("OH", 30), self.T("OM", 30)), "=", self.frac(self.T("OH", 30), self.T("1", 30)), "= OH", font_size=32),
            self.T("= l'abscisse de M", 32, VERT_OK),
        ).arrange(DOWN, buff=0.4).move_to([3.4, 0.6, 0])
        for l in calc:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.6)
        self.play(Write(self.chute("Le cercle ne remplace pas le collège : il le prolonge.", color=VERT_OK)))
        self.attendre_voix()

    # ── écran 6 : les valeurs remarquables ──────────────────────────────────
    def ecran_valeurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-valeurs")
        titre = self.T("Les valeurs à connaître", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre))

        xs = [(0, 1), (1, 6), (1, 4), (1, 3), (1, 2)]
        col_x = [-2.6 + 2.0 * i for i in range(5)]
        y_x, y_astuce, y_sin, y_cos = 2.0, 0.85, -0.35, -1.55
        entetes = VGroup(self.T("x", 32, GRIS_DOUX).move_to([-4.9, y_x, 0]),
                         self.T("astuce", 26, GRIS_DOUX).move_to([-4.9, y_astuce, 0]),
                         self.T("sin x", 32, ORANGE_ATTENTION).move_to([-4.9, y_sin, 0]),
                         self.T("cos x", 32, VERT_OK).move_to([-4.9, y_cos, 0]))
        self.play(FadeIn(entetes))
        ligne_x = VGroup(*[self.fpi(n, d, 30).move_to([col_x[i], y_x, 0]) for i, (n, d) in enumerate(xs)])
        self.play(FadeIn(ligne_x))

        # L'astuce : √0/2, √1/2, √2/2, √3/2, √4/2.
        astuce = VGroup(*[
            self.frac(self.radical(str(k), font_size=26, color=GRIS_DOUX), self.T("2", 26, GRIS_DOUX), color=GRIS_DOUX).move_to([col_x[k], y_astuce, 0])
            for k in range(5)
        ])
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.1) for a in astuce], lag_ratio=0.25))
        sinus = ["0", "1/2", "r2/2", "r3/2", "1"]
        ligne_sin = VGroup(*[self.fval(v.replace("r", ""), 30, ORANGE_ATTENTION).move_to([col_x[i], y_sin, 0]) for i, v in enumerate(sinus)])
        self.play(LaggedStart(*[TransformFromCopy(astuce[i], ligne_sin[i]) for i in range(5)], lag_ratio=0.2), run_time=2)
        ligne_cos = VGroup(*[self.fval(v.replace("r", ""), 30, VERT_OK).move_to([col_x[4 - i], y_cos, 0]) for i, v in enumerate(sinus)])
        fleche = self.T("cos : la même liste, à l'envers", 26, VERT_OK).move_to([1.4, -2.45, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=LEFT * 0.2) for l in ligne_cos], lag_ratio=0.2), FadeIn(fleche), run_time=1.6)
        self.play(Write(self.chute("π/6 : petit angle, point bas, sinus petit. π/3 : c'est l'inverse.", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-defi")
        titre = self.T("Défi", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        self.play(Write(titre))
        lignes = VGroup(
            self.T("1. Convertis 150° en radians.", 36, WHITE),
            self.T("2. Place le point sur le cercle.", 36, WHITE),
            self.T("3. Signe de son cosinus ? de son sinus ?", 36, WHITE),
            self.rang("4. Donne  cos", self.fpi(1, 3, 32), " et  sin", self.fpi(1, 6, 32), ".", font_size=36),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.1, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=DOWN * 0.15), run_time=0.5)
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_ATTENTION)))
        self.attendre_voix()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        titre = self.T("Correction", 52, JAUNE_TITRE).to_edge(UP, buff=0.55)
        self.play(Write(titre))

        c = np.array([-3.4, -0.7, 0])
        R = 1.8
        repere, pos = self.cercle_trigo(c, R)
        self.play(FadeIn(repere))

        t1 = self.rang("150° =", self.frac(self.T("150π", 30), self.T("180", 30)), "=", self.fpi(5, 6, 32, ROUGE_ERREUR), font_size=32).move_to([3.0, 1.65, 0])
        self.play(FadeIn(t1))
        p = pos(5 * PI / 6)
        self.play(Create(self.arc_parcouru(c, R, 5 * PI / 6)), run_time=1.2)
        self.play(FadeIn(self.point(p)), Create(self.projections(c, p, ROUGE_ERREUR)))
        self.play(FadeIn(self.fpi(5, 6, 26, ROUGE_ERREUR).move_to(pos(5 * PI / 6, R + 0.75))))
        signes = VGroup(
            self.T("à gauche : cos < 0", 30, VERT_OK),
            self.T("en haut : sin > 0", 30, ORANGE_ATTENTION),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to([3.0, 0.25, 0])
        self.play(FadeIn(signes, shift=RIGHT * 0.15))
        egal = self.rang("cos", self.fpi(1, 3, 30), "= sin", self.fpi(1, 6, 30), "=", self.fval("1/2", 30, JAUNE_TITRE), font_size=32).move_to([3.0, -1.35, 0])
        self.play(FadeIn(egal))
        self.play(Write(self.chute("π/6 et π/3 : symétriques par rapport à la diagonale.", color=BLEU_CALCUL)))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Le cercle trigonométrique",
            accroche="cos 3 est négatif. Pourquoi ?",
            promesse="On quitte le triangle, on entre dans le cercle.",
        )
        self.page_objectifs([
            "mesurer un angle en radians",
            "placer n'importe quel réel sur le cercle trigonométrique",
            "lire cosinus et sinus, connaître les valeurs remarquables",
        ])
        self.ecran_radian()
        self.ecran_enroulement()
        self.ecran_placer()
        self.ecran_cos_sin()
        self.ecran_triangle()
        self.ecran_valeurs()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "mesurer un angle en radians : π = 180°",
                "placer un réel : des demi-tours, plus un reste",
                "cos à l'horizontale, sin à la verticale, et les valeurs",
            ],
            rappel="Retirer π n'est pas retirer un tour : un tour, c'est 2π.",
        )
        self.page_abonnement()
