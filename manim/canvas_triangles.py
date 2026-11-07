# canvas_triangles.py
# LES FIGURES DE LA SÉRIE « TRIANGLES » 6e (07/11/2026), notions triangle_figure et
# triangle_propriete. S'importe APRÈS prop_commun et canvas_angles.
# ⛔ Rien n'est ajouté à la scène : tout est RENVOYÉ. ⛔ Pas de LaTeX : que des Text.
# ⭐ Vraies mesures : un arc marqué 40° ouvre 40° ; un triangle construit avec des
# longueurs a ces longueurs (à l'échelle choisie).
#
#   f = Tri(A, B, C, noms=("A","B","C"), fs=46, sw=7)
#     f.fond f.cotes (AB, BC, CA) f.dots f.lettres ; f.cote("A","B") ; f.pt("A") ; f.mesure("A")
#   Tri.par_cotes(a, b, c, echelle, centre)  (côtés BC=a, CA=b, AB=c ; A en haut)
#   Tri.par_angles(ang_A, ang_B, base, centre)
#   arc_angle(sommet, p1, p2, r=0.55, couleur) · coin_droit(sommet, p1, p2)
#   codage(a, b, n=1, couleur) : n petits traits au milieu d'un côté

import numpy as np
from manim import *

from canvas_angles import ARC, COTE, SOMMET


def _pt(p):
    return np.array([p[0], p[1], 0.0], dtype=float)


class Tri(VGroup):
    def __init__(self, a, b, c, noms=None, fs=46, sw=7, couleur=COTE, fond=0.1, r_point=0.09, **kw):
        super().__init__(**kw)
        self.sommets = [_pt(a), _pt(b), _pt(c)]
        self.noms = list(noms) if noms else ["", "", ""]
        self.fond = Polygon(*self.sommets, fill_color=couleur, fill_opacity=fond, stroke_width=0)
        self.cotes = VGroup(*[Line(self.sommets[i], self.sommets[(i + 1) % 3], color=couleur, stroke_width=sw)
                              for i in range(3)])
        self.dots = VGroup(*[Dot(p, radius=r_point, color=SOMMET) for p in self.sommets])
        self.add(self.fond, self.cotes, self.dots)
        self.lettres = VGroup()
        self.centre_ = sum(self.sommets) / 3
        if noms:
            for p, n in zip(self.sommets, noms):
                t = Text(n, font_size=fs, color=WHITE, weight=BOLD)
                d = p - self.centre_
                t.move_to(p + d / np.linalg.norm(d) * (0.3 + fs / 150))
                self.lettres.add(t)
            self.add(self.lettres)

    def _i(self, nom):
        return self.noms.index(nom)

    def pt(self, nom):
        return self.sommets[self._i(nom)]

    def lettre(self, nom):
        return self.lettres[self._i(nom)]

    def point(self, nom):
        return self.dots[self._i(nom)]

    def cote(self, n1, n2):
        i, j = self._i(n1), self._i(n2)
        return self.cotes[i] if (i + 1) % 3 == j else self.cotes[j]

    def mesure(self, nom):
        i = self._i(nom)
        u = self.sommets[(i + 1) % 3] - self.sommets[i]
        v = self.sommets[(i + 2) % 3] - self.sommets[i]
        return float(np.degrees(np.arccos(np.dot(u, v) / np.linalg.norm(u) / np.linalg.norm(v))))

    @classmethod
    def par_cotes(cls, a, b, c, echelle=1.0, centre=ORIGIN, **kw):
        """B en bas à gauche, C en bas à droite, A au-dessus : BC=a, CA=b, AB=c."""
        x = (a * a + c * c - b * b) / (2 * a)
        y = float(np.sqrt(max(0.0, c * c - x * x)))
        A, B, C = np.array([x, y, 0.0]) * echelle, np.zeros(3), np.array([a, 0.0, 0.0]) * echelle
        d = _pt(centre) - (A + B + C) / 3
        return cls(A + d, B + d, C + d, **kw)

    @classmethod
    def par_angles(cls, ang_b, ang_c, base=4.0, centre=ORIGIN, **kw):
        """Base BC horizontale, angles vrais en B et C ; A au-dessus."""
        ab, ac = np.deg2rad(ang_b), np.deg2rad(ang_c)
        x = base * np.tan(ac) / (np.tan(ab) + np.tan(ac)) if abs(ang_b - 90) > 1e-6 and abs(ang_c - 90) > 1e-6 else (0 if ang_b == 90 else base)
        y = (x * np.tan(ab)) if abs(ang_b - 90) > 1e-6 else (base * np.tan(ac))
        A, B, C = np.array([x, y, 0.0]), np.zeros(3), np.array([base, 0.0, 0.0])
        d = _pt(centre) - (A + B + C) / 3
        return cls(A + d, B + d, C + d, **kw)


def arc_angle(sommet, p1, p2, r=0.55, couleur=ARC, sw=6):
    s, a, b = _pt(sommet), _pt(p1), _pt(p2)
    t1, t2 = np.arctan2(*(a - s)[[1, 0]]), np.arctan2(*(b - s)[[1, 0]])
    d = (t2 - t1 + PI) % TAU - PI
    return Arc(radius=r, start_angle=t1, angle=d, arc_center=s, stroke_color=couleur, stroke_width=sw)


def coin_droit(sommet, p1, p2, c=0.3, couleur=ARC, sw=5):
    s = _pt(sommet)
    u, v = _pt(p1) - s, _pt(p2) - s
    u, v = u / np.linalg.norm(u), v / np.linalg.norm(v)
    m = VMobject(stroke_color=couleur, stroke_width=sw)
    m.set_points_as_corners([s + u * c, s + (u + v) * c, s + v * c])
    return m


def codage(a, b, n=1, couleur=WHITE, lg=0.17, ecart=0.1, sw=5):
    """Les n petits traits identiques qui disent : même longueur."""
    a, b = _pt(a), _pt(b)
    u = (b - a) / np.linalg.norm(b - a)
    v = np.array([-u[1], u[0], 0.0])
    m = (a + b) / 2
    return VGroup(*[Line(m + u * ecart * (k - (n - 1) / 2) - v * lg, m + u * ecart * (k - (n - 1) / 2) + v * lg,
                         color=couleur, stroke_width=sw) for k in range(n)])


class FinTriangles:
    """L'écran de fin du 05/11 (manim/REGLES.md) : ce que dit la voix est écrit,
    « Un pouce · Un commentaire · La cloche » en plus. À mettre AVANT PaysageProp."""

    def page_abonnement(self, voix):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        P_ = lambda x, y: np.array([x, y, 0.0])  # noqa: E731
        entraine = self.t("Entraîne-toi sur", 46, "#facc15").move_to(P_(0, 2.75))
        site = self.t("eleveai.fr", 62, "#60a5fa").move_to(P_(0, 1.75))
        site.sans_synchro = True
        cadre = SurroundingRectangle(site, color="#60a5fa", buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, "#22c55e").move_to(P_(0, 0.2))
        poignee = self.t("@eleveai974", 48, "#22c55e").move_to(P_(0, -0.7))
        poignee.sans_synchro = True
        g1, p1, g2, p2, g3 = (self.t("Un pouce", 38), self.t("·", 38, "#94a3b8"), self.t("Un commentaire", 38),
                              self.t("·", 38, "#94a3b8"), self.t("La cloche", 38))
        gestes = VGroup(g1, p1, g2, p2, g3).arrange(RIGHT, buff=0.28).move_to(P_(-0.9, -2.2))
        g2.align_to(g1, UP)
        g3.align_to(g1, UP)
        self.au_mot("Entraîne-toi")
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("pouce")
        self.play(FadeIn(g1, scale=1.3), run_time=0.25)
        self.au_mot("commentaire")
        self.play(FadeIn(p1), FadeIn(g2, scale=1.3), run_time=0.25)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.35)
        self.au_mot("cloche")
        self.play(FadeIn(p2), FadeIn(g3, scale=1.3), run_time=0.25)
        self.play(Flash(poignee, color="#22c55e", line_length=0.3), run_time=0.5)
        self.attendre_voix(marge=1.4)
