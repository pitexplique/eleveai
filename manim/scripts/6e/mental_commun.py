# mental_commun.py
# EleveAI — série « Calcul mental » 6e (11/11/2026) : les OUTILS COMMUNS aux 6
# paysages (mental_<slug>.py). Pas de scène ici. Base : PaysageDecimal
# (decimal_commun.py), elle-même PaysageProp + FinTriangles.
#
# ⭐ Bonds : la droite des bonds, la figure de la série. On y voit le calcul de
#   tête : 56 → 60 → 64, chaque bond étiqueté (« + 4 »), le nombre rond entouré.
#   Les nombres se posent AU MOT (tic(), bond()), jamais avant la voix.
# ⭐ tableau_score() : le panneau d'affichage (basket, jeu vidéo).
# ⭐ Les personnages des 6 épisodes (enzo, chloe, hugo, maelys, jade, nathan).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F401,F403

VERT_D = "#34d399"
ROND = "#22d3ee"  # le nombre rond, toujours de cette couleur


class Bonds(VGroup):
    """Une droite de vmin à vmax, de x0 à x1, à la hauteur y. Rien n'est posé que
    le trait : tic(v) et bond(a, b, txt) RENVOIENT les morceaux, la scène les joue
    au mot. .x(v) : l'abscisse de v."""

    def __init__(self, vmin, vmax, x0=-6.0, x1=0.0, y=0.0, fs=36, h=0.6):
        super().__init__()
        self.vmin, self.vmax, self.x0, self.x1, self.y0, self.fs, self.h = vmin, vmax, x0, x1, y, fs, h
        self.trait = Line(P(x0 - 0.35, y), P(x1 + 0.35, y), color=WHITE, stroke_width=5)
        self.add(self.trait)

    def x(self, v):
        return self.x0 + (v - self.vmin) / (self.vmax - self.vmin) * (self.x1 - self.x0)

    def pt(self, v):
        return P(self.x(v), self.y0)

    def tic(self, v, couleur=WHITE, txt=None, fs=None):
        """Le trait et le nombre dessous ; .nombre pour l'entourer."""
        t = Line(self.pt(v) + DOWN * 0.16, self.pt(v) + UP * 0.16, color=couleur, stroke_width=5)
        n = Text(txt or str(v), font_size=fs or self.fs, color=couleur, weight=BOLD).next_to(t, DOWN, buff=0.12)
        g = VGroup(t, n)
        g.nombre = n
        return g

    def bond(self, a, b, txt, couleur=AMBRE_D, fs=None, haut=None):
        """La flèche courbe de a à b (au-dessus) et son étiquette (« + 4 »)."""
        hauteur = haut if haut is not None else min(0.85, 0.3 + abs(self.x(b) - self.x(a)) * 0.2)
        dep, arr = self.pt(a) + UP * 0.2, self.pt(b) + UP * 0.2
        ang = -2 * np.arctan(2 * hauteur / max(0.01, abs(arr[0] - dep[0])))
        fl = CurvedArrow(dep, arr, angle=ang if b > a else -ang, color=couleur, stroke_width=6, tip_length=0.22)
        et = Text(txt, font_size=fs or int(self.fs * 0.95), color=couleur, weight=BOLD)
        et.move_to(P((dep[0] + arr[0]) / 2, self.y0 + 0.2 + hauteur + 0.32))
        g = VGroup(fl, et)
        g.fleche, g.etiquette = fl, et
        return g

    def rond(self, tic, couleur=ROND):
        """Le cercle autour d'un nombre rond (60, 100…)."""
        return Circle(radius=max(tic.nombre.width, tic.nombre.height) / 2 + 0.16, color=couleur,
                      stroke_width=5).move_to(tic.nombre)


def tableau_score(equipes, s=1.0):
    """Le panneau d'affichage : [("BLEUS", "#3b82f6"), ("ROUGES", "#ef4444")].
    Seuls les noms et les cases sont posés ; .case[i] : la case du score de l'équipe i
    (la scène y met le nombre au mot), .nom[i]."""
    g = VGroup()
    cadre = RoundedRectangle(width=2.6 * s * len(equipes) + 0.3 * s, height=1.9 * s, corner_radius=0.15 * s,
                             fill_color="#0b1220", fill_opacity=1, stroke_color="#94a3b8", stroke_width=4)
    g.add(cadre)
    g.case, g.nom = VGroup(), VGroup()
    for i, (nom, c) in enumerate(equipes):
        x = cadre.get_left()[0] + 0.15 * s + 1.3 * s + 2.6 * s * i
        n = hors_audit(Text(nom, font_size=int(28 * s), color=c, weight=BOLD)).move_to(P(x, cadre.get_top()[1] - 0.35 * s))
        case = RoundedRectangle(width=2.2 * s, height=1.0 * s, corner_radius=0.1 * s, fill_color="#111827",
                                fill_opacity=1, stroke_color=c, stroke_width=3).move_to(P(x, cadre.get_center()[1] - 0.25 * s))
        g.nom.add(n)
        g.case.add(case)
        g.add(n, case)
    return g


def score(case, v, couleur="#fde047", fs=60):
    """Le nombre (au mot) dans une case du panneau."""
    t = Text(str(v), font_size=fs, color=couleur, weight=BOLD)
    if t.width > case.width * 0.86:
        t.scale_to_fit_width(case.width * 0.86)
    return t.move_to(case)


def ballon(s=1.0):
    b = Circle(radius=0.36 * s, fill_color="#f97316", fill_opacity=1, stroke_color="#7c2d12", stroke_width=3)
    lignes = VGroup(Line(b.get_top(), b.get_bottom(), color="#7c2d12", stroke_width=3),
                    Line(b.get_left(), b.get_right(), color="#7c2d12", stroke_width=3),
                    Arc(radius=0.36 * s, start_angle=-0.9, angle=1.8, arc_center=b.get_center() + LEFT * 0.52 * s,
                        color="#7c2d12", stroke_width=3),
                    Arc(radius=0.36 * s, start_angle=PI - 0.9, angle=1.8, arc_center=b.get_center() + RIGHT * 0.52 * s,
                        color="#7c2d12", stroke_width=3))
    return VGroup(b, lignes)


def enzo(s=1.0):
    """Enzo, arbitre de basket : maillot rayé noir et blanc, sifflet."""
    p = visage(personne(peau="#c68642", tenue=WHITE, cheveux="#111827", s=s))
    c = p.corps
    bas, haut = c.get_bottom()[1], c.get_top()[1]
    raies = VGroup()
    for k in range(-2, 3):
        x = c.get_center()[0] + k * 0.27 * s
        raies.add(Line(P(x, haut - 0.02), P(x * 1.0 + k * 0.05 * s, bas + 0.02), color="#111827", stroke_width=9 * s))
    cordon = Line(p.tete.get_bottom() + LEFT * 0.12 * s, c.get_center() + UP * 0.15 * s, color="#ef4444", stroke_width=3)
    sifflet = RoundedRectangle(width=0.26 * s, height=0.13 * s, corner_radius=0.04 * s, fill_color="#cbd5e1",
                               fill_opacity=1, stroke_width=0).move_to(c.get_center() + UP * 0.12 * s)
    p.add(raies, cordon, sifflet)
    return p


class PaysageMental(PaysageDecimal):
    """La base des paysages de la série : ceinture verte, fin du 05/11."""

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours (5, 4, 3…) n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    def jouer_tic(self, bd, v, mot=None, couleur=WHITE, run_time=0.3, **kw):
        if mot:
            self.au_mot(mot)
        t = bd.tic(v, couleur, **kw)
        self.play(Create(t[0]), FadeIn(t[1], shift=UP * 0.1), run_time=run_time)
        return t

    def jouer_bond(self, bd, a, b, txt, mot=None, couleur=AMBRE_D, run_time=0.5, **kw):
        if mot:
            self.au_mot(mot)
        g = bd.bond(a, b, txt, couleur, **kw)
        self.play(Create(g.fleche), FadeIn(g.etiquette, scale=1.3), run_time=run_time)
        return g

    def ligne_mots(self, morceaux, mots, y, fs=36, xl=None, buff=0.18):
        """ligne_au_mot avec les couleurs : morceaux = [(texte, couleur)…]."""
        return self.ligne_au_mot(morceaux, mots, y, fs=fs, xl=xl, buff=buff)

    def etapes(self, bd, morceaux, y, fs=38, xl=-5.6, gestes=None, couleurs=None):
        """Une ligne de calcul posée morceau par morceau, chacun à son mot, avec ses gestes
        sur la droite des bonds. morceaux = [(texte, mot)…] ; le dernier est en vert."""
        gestes = gestes or {}
        n = len(morceaux)
        cs = couleurs or [WHITE] * (n - 1) + [VERT_OK]
        lg = self.ligne([(m, c) for (m, _), c in zip(morceaux, cs)], fs, buff=0.18)
        self.col(lg, y, xl=xl)
        for i, (m, mot) in enumerate(morceaux):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(lg[i], shift=UP * 0.1), *gestes.get(i, []), run_time=0.3)
        return lg

    def barrer(self, m, couleur=ROUGE_ERREUR):
        return Line(m.get_corner(DL) + LEFT * 0.06, m.get_corner(UR) + RIGHT * 0.06, color=couleur, stroke_width=7)
