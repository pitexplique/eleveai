# convexite_reconnaitre.py
# EleveAI — Maths Tle spé — paysage « Reconnaître une fonction convexe ou
# concave » (16:9), ceinture VERTE. Micro du coach : convexite_reconnaitre
# (lib/tutor-v4/questionBank/terminale-spe/maths/convexite.bank.ts +
# convexite-renfort.ts : « convexe = en creux ; concave = en bosse »).
#
# Clé de voix → écran :
#   · 00-garde       : page de garde, un creux bleu et une bosse orange, l'échelle
#                      ENTIÈRE des ceintures (verte) ;
#   · 01-situation   : Maëlle, architecte de skateparks (pictogramme) : le bowl en
#                      creux, la bosse de saut, un skateur qui roule dessus ;
#   · 02-definition  : creux, tourné vers le haut (vallée) : convexe ; bosse,
#                      tournée vers le bas (colline) : concave ;
#   · 03-cordes      : la corde qui glisse, au-dessus (convexe) / au-dessous ;
#   · 04-catalogue   : x², −x², eˣ, ln x ;
#   · 05/05b         : question-pause n° 1 (1/x sur ]0 ; +∞[ → A : convexe) ;
#   · 06-piege       : convexe ≠ croissante : x² descend puis monte (skateur) ;
#   · 07-mixte       : x³, concave sur ]−∞ ; 0], convexe sur [0 ; +∞[ ;
#   · 08/08b         : question-pause n° 2 (C : ni croissante ni positive ;
#                      contre-exemple x² − 4, sous l'axe entre −2 et 2) ;
#   · 09/09b         : le défi −eˣ (eˣ retournée : concave) et x² + 3x (convexe) ;
#   · 10-finale      : « Ce que tu as appris », titre en haut et centré ;
#   · 11-abonne      : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur (le même dans le short) : bleu = convexe / creux, orange =
# concave / bosse, vert = résultat juste, rouge = piège.
# Modèles : loi_normale_escalier.py, convexite_fonction.py (recopiés, rien
# d'importé de ce dernier).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : convexite_reconnaitre_marques.json). Audit : AUDIT=1 BORDS=1 … --dry_run.
#
# Voix : manim/voix/terminale-convexite-reconnaitre.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/convexite_reconnaitre.py ConvexiteReconnaitreTerminale -o eleveai-maths-terminale-convexite-reconnaitre --media_dir manim/scripts/terminale/media-convexite-reconnaitre
# Sortie : manim/sorties/terminale/maths/analyse/convexite-reconnaitre/

import math
import os
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
_xs = np.linspace(0.2, 5, 60)
assert all(2 / x ** 3 > 0 for x in _xs)                       # (1/x)'' > 0 : convexe
assert all(-math.exp(x) < 0 for x in np.linspace(-3, 3, 30))  # (−eˣ)'' < 0 : concave
assert 2 > 0                                                  # (x² + 3x)'' = 2 : convexe
assert (-2) ** 2 - 4 == 0 and 2 ** 2 - 4 == 0 and 0 ** 2 - 4 < 0  # x² − 4 sous l'axe
assert all(6 * x < 0 for x in (-2, -0.1)) and all(6 * x > 0 for x in (0.1, 2))  # x³

FOND_CARTE = "#0b1220"
BETON = "#64748B"
FOND_BETON = "#1e293b"
XL, BORD_X = 2.2, 6.6  # la colonne de droite (marge de 3 % : 0,43 du bord)
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE


class Graphe:
    """Un repère : [xa ; xb] × [ya ; yb] posé dans le rectangle (X0, Y0)-(X1, Y1)."""

    def __init__(self, xr, yr, bg, hd):
        (self.xa, self.xb), (self.ya, self.yb) = xr, yr
        (self.X0, self.Y0), (self.X1, self.Y1) = bg, hd

    def G(self, x, y):
        return P(self.X0 + (x - self.xa) / (self.xb - self.xa) * (self.X1 - self.X0),
                 self.Y0 + (y - self.ya) / (self.yb - self.ya) * (self.Y1 - self.Y0))

    def pente(self, m):
        """Une pente du repère, en pente de l'écran."""
        return m * (self.Y1 - self.Y0) / (self.yb - self.ya) / ((self.X1 - self.X0) / (self.xb - self.xa))

    def axes(self, sw=2, color=GREY_B):
        y0 = min(max(0, self.ya), self.yb)
        x0 = min(max(0, self.xa), self.xb)
        kw = dict(buff=0, stroke_width=sw, color=color, tip_length=0.16, max_tip_length_to_length_ratio=0.08)
        return VGroup(Arrow(self.G(self.xa, y0), self.G(self.xb, y0), **kw),
                      Arrow(self.G(x0, self.ya), self.G(x0, self.yb), **kw))

    def courbe(self, f, a, b, color=WHITE, sw=5, n=160):
        pts = []
        for x in np.linspace(a, b, n):
            y = f(x)
            assert self.ya - 1e-9 <= y <= self.yb + 1e-9, (x, y)
            pts.append(self.G(x, y))
        m = VMobject(stroke_color=color, stroke_width=sw)
        m.set_points_smoothly(pts)
        return m

    def graduation(self, v, texte, fs=26, audit=True):
        tr = Line(self.G(v, 0) + DOWN * 0.08, self.G(v, 0) + UP * 0.08, stroke_width=2, color=GREY_B)
        t = Text(texte, font_size=fs, color=GREY_A).next_to(tr, DOWN, buff=0.08)
        if not audit:
            t._pas_audit = True
        return VGroup(tr, t)


def bol(r=0.28, color=CONVEXE, sw=5):
    return Arc(radius=r, start_angle=PI, angle=PI, stroke_color=color, stroke_width=sw)


def dome(r=0.28, color=CONCAVE, sw=5):
    return Arc(radius=r, start_angle=0, angle=PI, stroke_color=color, stroke_width=sw)


def skateur(couleur=WHITE, s=1.0):
    """Un skateur de profil, la planche posée sur l'origine (pour le tourner)."""
    planche = RoundedRectangle(width=0.56, height=0.07, corner_radius=0.03, fill_color="#A16207", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.11))
    roues = VGroup(*[Dot(P(x, 0.04), radius=0.04, color=GREY_B) for x in (-0.17, 0.17)])
    kw = dict(stroke_color=couleur, stroke_width=5)
    jambes = VGroup(Line(P(-0.12, 0.15), P(-0.02, 0.4), **kw), Line(P(0.12, 0.15), P(0.04, 0.4), **kw))
    corps = Line(P(0.01, 0.4), P(0.04, 0.7), **kw)
    bras = Line(P(-0.24, 0.6), P(0.28, 0.66), **kw)
    tete = Circle(radius=0.1, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0.05, 0.84))
    casque = Arc(radius=0.11, start_angle=0, angle=PI, stroke_color=couleur, stroke_width=6).move_to(P(0.05, 0.9))
    return VGroup(planche, roues, jambes, corps, bras, tete, casque).scale(s, about_point=ORIGIN)


def pose(g, f, df, x, couleur=WHITE, s=1.0):
    """Le skateur posé sur la courbe de f en x, penché comme la piste."""
    a = math.atan(g.pente(df(x)))
    return skateur(couleur, s).rotate(a, about_point=ORIGIN).shift(g.G(x, f(x)))


def maelle(s=1.0):
    """Maëlle : tête, chignon, t-shirt violet, le plan d'un bowl à la main."""
    tete = Circle(radius=0.3, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    chignon = Circle(radius=0.16, fill_color="#1f1300", fill_opacity=1, stroke_width=0).move_to(P(0.05, 1.33))
    cheveux = Arc(radius=0.32, start_angle=0.1, angle=PI - 0.2, stroke_color="#1f1300", stroke_width=10)
    cheveux.move_to(tete.get_top() + DOWN * 0.08)
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=VIOLET_ACCENT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    plan = Rectangle(width=0.8, height=0.58, fill_color="#1d4ed8", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).move_to(P(0.5, -0.05))
    trait = VMobject(stroke_color=WHITE, stroke_width=3)
    trait.set_points_smoothly([plan.get_center() + P(-0.3 + 0.075 * i, -0.18 + 0.03 * (i - 4) ** 2)
                               for i in range(9)])
    return VGroup(corps, chignon, tete, cheveux, plan, trait).scale(s)


class ConvexiteReconnaitreBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = "convexite_reconnaitre_marques.json"
    nom_voix = "terminale-convexite-reconnaitre"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    # ── outils ──────────────────────────────────────────────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        return t

    def col(self, mob, y, xl=XL):
        """La colonne de droite : alignée à gauche sur xl, jamais près du bord."""
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:  # Ti-Margo
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, *morceaux, y, xl=XL, buff=0.15):
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff)
        return self.col(g, y, xl)

    def insister(self, mob, k=1.35, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def add_mascotte(self, scale=0.5):
        """Ti-Margo dans le coin bas-droit, à 0,45 du bord (3 % de la largeur)."""
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_pos(self, i):
        """Attend l'instant où la voix dit le mot à la position i."""
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def au_mot(self, extrait, n=1):
        """au_mot sur la n-ième occurrence de l'extrait."""
        if n == 1:
            return super().au_mot(extrait)
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def carte(self, largeur, hauteur, centre, couleur=GREY_B):
        return RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.16, stroke_color=couleur,
                                stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(centre)

    def rouler(self, g, f, df, a, b, couleur=WHITE, s=0.8, run_time=1.5, rate_func=smooth, extra=()):
        """Le skateur roule sur la courbe de f, de a à b. Renvoie le skateur posé en b."""
        u = ValueTracker(a)
        sk = always_redraw(lambda: pose(g, f, df, u.get_value(), couleur, s))
        self.add(sk)
        self.play(u.animate.set_value(b), *extra, run_time=run_time, rate_func=rate_func)
        sk.clear_updaters()
        self.remove(sk)
        fin = pose(g, f, df, b, couleur, s)
        self.add(fin)
        return fin

    # ── la question-pause (modèle : loi_normale_escalier.py) ───────────────

    def carte_choix(self, lettre, corps, largeur=4.1, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 1.15:
            ligne.scale_to_fit_width(largeur - 1.15)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix, texte_pause="Mets pause, et choisis !"):
        """« Question ! » + compte à rebours, la question (lignes), les cartes,
        la consigne. Rien n'est joué ici."""
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 32) for x in question])
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t(texte_pause, 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        """Chaque carte À SA LETTRE, son contenu À SON MOT."""
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)

    def q_reponse(self, cartes, bonne, pause, rebours):
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.2).move_to(b[0].get_right() + LEFT * 0.35)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        return ok

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Convexité", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Convexité")
        self.play(Write(titre), run_time=0.7)
        g1 = Graphe((-1.6, 1.6), (0, 2.2), (-5.4, -1.1), (-1.6, 1.3))
        g2 = Graphe((-1.6, 1.6), (0, 2.2), (0.6, -1.1), (4.4, 1.3))
        creux = g1.courbe(lambda x: 0.8 * x * x, -1.6, 1.6, CONVEXE, 7)
        bosse = g2.courbe(lambda x: 2.05 - 0.8 * x * x, -1.6, 1.6, CONCAVE, 7)
        l1 = self.t("une courbe en creux", 34, CONVEXE).next_to(g1.G(0, 0), DOWN, buff=0.25)
        l2 = self.t("une courbe en bosse", 34, CONCAVE).next_to(g2.G(0, 0), DOWN, buff=0.25)
        self.au_mot("creux")
        self.play(Create(creux), FadeIn(l1, shift=UP * 0.1), run_time=0.7)
        self.au_mot("bosse")
        self.play(Create(bosse), FadeIn(l2, shift=UP * 0.1), run_time=0.7)
        self.au_mot("laquelle")
        q = self.t("Laquelle est convexe ?", 42, WHITE).next_to(titre, DOWN, buff=0.3)
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        ident = self.t(self.identite, 26, GREY_A).next_to(q, DOWN, buff=0.15)
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : la situation : Maëlle et ses skateparks ───────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        perso = maelle(1.0).move_to(P(-4.6, 2.0))
        nom = self.t("Maëlle", 38, JAUNE_TITRE).next_to(perso, RIGHT, buff=0.4).shift(UP * 0.35)
        metier = self.t("architecte de skateparks", 32, BLEU_CALCUL).next_to(nom, DOWN, buff=0.15,
                                                                            aligned_edge=LEFT)
        self.au_mot("Maëlle")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=LEFT * 0.1), run_time=0.5)
        self.au_mot("architecte")
        self.play(FadeIn(metier, shift=LEFT * 0.1), run_time=0.4)
        # le bowl, en coupe
        gb = Graphe((-2.2, 2.2), (-0.4, 2.0), (-6.1, -2.9), (-1.3, -0.3))
        fb = lambda x: 0.42 * x * x  # noqa: E731
        dfb = lambda x: 0.84 * x  # noqa: E731
        pts = [gb.G(x, fb(x)) for x in np.linspace(-2.1, 2.1, 60)]
        beton = Polygon(*pts, gb.G(2.1, -0.4), gb.G(-2.1, -0.4), stroke_width=0, fill_color=FOND_BETON,
                        fill_opacity=1)
        piste = gb.courbe(fb, -2.1, 2.1, BETON, 8)
        self.au_mot("un bowl")
        lb = self.t("le bowl", 30, GREY_A).next_to(gb.G(0, 1.9), UP, buff=0.05)
        self.play(FadeIn(beton), Create(piste), FadeIn(lb), run_time=0.7)
        self.au_mot("courbe en creux")
        lc = self.t("en creux", 32, CONVEXE).move_to(gb.G(0, 1.05))
        self.play(piste.animate.set_stroke(CONVEXE), FadeIn(lc, scale=1.2), run_time=0.4)
        self.au_mot("le skateur descend")
        sk = self.rouler(gb, fb, dfb, -2.05, 0, run_time=0.9, rate_func=rate_functions.ease_in_quad)
        self.au_mot("remonte")
        self.remove(sk)
        sk = self.rouler(gb, fb, dfb, 0, 2.05, run_time=0.9, rate_func=rate_functions.ease_out_quad)
        self.au_mot("vers le haut")
        fl = Arrow(gb.G(2.05, fb(2.05)) + RIGHT * 0.15, gb.G(2.05, fb(2.05)) + RIGHT * 0.15 + UP * 1.3,
                   buff=0, color=CONVEXE, stroke_width=6)
        self.play(GrowArrow(fl), sk.animate.shift(UP * 0.5), run_time=0.4)
        self.play(sk.animate.shift(DOWN * 0.5), run_time=0.35)
        # la bosse de saut
        gs = Graphe((-2.2, 2.2), (-0.4, 2.0), (0.4, -2.9), (4.8, -0.3))
        fs_ = lambda x: max(0.0, 1.3 - 0.55 * x * x)  # noqa: E731
        dfs = lambda x: -1.1 * x if abs(x) < math.sqrt(1.3 / 0.55) else 0.0  # noqa: E731
        pts2 = [gs.G(x, fs_(x)) for x in np.linspace(-2.2, 2.2, 89)]
        beton2 = Polygon(*pts2, gs.G(2.2, -0.4), gs.G(-2.2, -0.4), stroke_width=0, fill_color=FOND_BETON,
                         fill_opacity=1)
        piste2 = VMobject(stroke_color=BETON, stroke_width=8).set_points_as_corners(pts2)
        self.au_mot("bosse de saut")
        ls = self.t("la bosse de saut", 30, GREY_A).next_to(gs.G(0, 1.3), UP, buff=0.3)
        self.play(FadeOut(sk), FadeIn(beton2), Create(piste2), FadeIn(ls), run_time=0.7)
        self.au_mot("l'inverse")
        self.rouler(gs, fs_, dfs, -2.1, 2.1, run_time=1.6, rate_func=linear)
        self.au_mot("dos d'âne")
        ld = self.t("en bosse", 32, CONCAVE).next_to(gs.G(0, 0), UP, buff=0.12)
        self.play(piste2.animate.set_stroke(CONCAVE), FadeIn(ld, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 02 : la définition : creux / bosse ─────────────────────────────────

    def panneau_forme(self, cx, f, couleur, haut):
        """Une carte : la courbe (blanche), le relief qu'on remplira dessous."""
        carte = self.carte(5.0, 5.5, P(cx, 0.15))
        g = Graphe((-2, 2), (-0.3, 2.6), (cx - 2.1, -0.75), (cx + 2.1, 1.95))
        c = g.courbe(f, -2, 2, WHITE, 7)
        pts = [g.G(x, f(x)) for x in np.linspace(-2, 2, 60)]
        relief = Polygon(*pts, g.G(2, -0.3), g.G(-2, -0.3), stroke_width=0, fill_color="#166534", fill_opacity=0.55)
        if haut:
            fl = Arrow(g.G(0, 0.2), g.G(0, 1.7), buff=0, color=couleur, stroke_width=7)
        else:
            fl = Arrow(g.G(0, 2.25), g.G(0, 0.75), buff=0, color=couleur, stroke_width=7)
        return carte, g, c, relief, fl

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-definition")
        for cx, f, coul, haut, k in ((-3.4, lambda x: 0.6 * x * x, CONVEXE, True, 0),
                                     (2.2, lambda x: 2.4 - 0.6 * x * x, CONCAVE, False, 1)):
            carte, g, c, relief, fl = self.panneau_forme(cx, f, coul, haut)
            mots = [("une courbe en creux", "tournée vers le haut", "comme une vallée", "convexe"),
                    ("une courbe en bosse", "tournée vers le bas", "comme une colline", "concave")][k]
            titre = self.t(mots[0], 32, coul).move_to(P(cx, 2.45))
            self.au_mot(mots[0][4:])
            self.play(FadeIn(carte), FadeIn(titre, shift=DOWN * 0.1), Create(c), run_time=0.6)
            self.play(c.animate.set_color(coul), run_time=0.3)
            self.au_mot(mots[1])
            l1 = self.t(mots[1], 28, WHITE).move_to(P(cx, -1.05))
            self.play(GrowArrow(fl), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
            self.au_mot(mots[2])
            l2 = self.t(mots[2], 28, "#4ade80").move_to(P(cx, -1.5))
            self.add(relief)
            self.bring_to_front(c, fl)
            self.play(FadeIn(relief), FadeIn(l2, shift=UP * 0.1), run_time=0.5)
            self.au_mot("fonction " + mots[3])
            l3 = self.t(mots[3], 44, coul).move_to(P(cx, -2.1))
            self.play(FadeIn(l3, scale=1.4), carte.animate.set_stroke(coul, width=5), run_time=0.4)
            self.insister(l3, 1.25)
        self.attendre_voix(marge=0.6)

    # ── 03 : la corde ──────────────────────────────────────────────────────

    def corde_vivante(self, g, f, a, b, couleur):
        """La corde de a à b (ValueTracker), ses deux points, l'écart rempli."""
        def segment():
            A, B = a.get_value(), b.get_value()
            return Line(g.G(A, f(A)), g.G(B, f(B)), color=JAUNE_TITRE, stroke_width=6)

        def points():
            return VGroup(*[Dot(g.G(v.get_value(), f(v.get_value())), radius=0.1, color=JAUNE_TITRE) for v in (a, b)])

        def ecart():
            A, B = a.get_value(), b.get_value()
            pts = [g.G(x, f(x)) for x in np.linspace(A, B, 40)]
            return Polygon(*pts, stroke_width=0, fill_color=couleur, fill_opacity=0.35)

        return always_redraw(segment), always_redraw(points), always_redraw(ecart)

    def ecran_cordes(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-cordes")
        tit = self.t("La corde", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        f1 = lambda x: 0.6 * x * x  # noqa: E731
        f2 = lambda x: 2.4 - 0.6 * x * x  # noqa: E731
        c1 = self.carte(5.0, 4.9, P(-3.4, -0.15))
        c2 = self.carte(5.0, 4.9, P(2.2, -0.15))
        g1 = Graphe((-2, 2), (-0.3, 2.6), (-5.5, -1.45), (-1.3, 1.65))
        g2 = Graphe((-2, 2), (-0.3, 2.6), (0.1, -1.45), (4.3, 1.65))
        k1 = g1.courbe(f1, -2, 2, WHITE, 7)
        self.play(FadeIn(c1), Create(k1), run_time=0.6)
        a1, b1 = ValueTracker(-1.6), ValueTracker(1.0)
        seg1, pts1, ec1 = self.corde_vivante(g1, f1, a1, b1, CONVEXE)
        self.au_mot("deux points")
        self.play(FadeIn(pts1, scale=2), run_time=0.4)
        self.au_mot("un segment")
        self.play(Create(seg1), run_time=0.5)
        self.au_mot("une corde")
        lco = self.t("une corde", 30, JAUNE_TITRE).move_to(P(-3.4, 2.0))
        self.play(FadeIn(lco, scale=1.3), run_time=0.35)
        self.au_mot("convexe")
        l1 = self.t("convexe", 38, CONVEXE).move_to(P(-3.4, -2.1))
        self.play(k1.animate.set_color(CONVEXE), FadeIn(l1, scale=1.3), c1.animate.set_stroke(CONVEXE, width=5),
                  run_time=0.4)
        self.au_mot("au-dessus")
        d1 = self.t("corde au-dessus", 30, JAUNE_TITRE).move_to(P(-3.4, 2.0))
        self.add(ec1)
        self.bring_to_front(k1, seg1, pts1)
        self.play(FadeIn(ec1), ReplacementTransform(lco, d1), run_time=0.4)
        self.play(a1.animate.set_value(-0.6), b1.animate.set_value(1.8), run_time=1.2)
        self.au_mot("concave")
        k2 = g2.courbe(f2, -2, 2, CONCAVE, 7)
        a2, b2 = ValueTracker(-1.6), ValueTracker(1.0)
        seg2, pts2, ec2 = self.corde_vivante(g2, f2, a2, b2, CONCAVE)
        l2 = self.t("concave", 38, CONCAVE).move_to(P(2.2, -2.1))
        self.play(FadeIn(c2.set_stroke(CONCAVE, width=5)), Create(k2), FadeIn(l2, scale=1.3), run_time=0.6)
        self.play(FadeIn(pts2, scale=2), Create(seg2), run_time=0.4)
        self.au_mot("au-dessous")
        d2 = self.t("corde au-dessous", 30, JAUNE_TITRE).move_to(P(2.2, 2.0))
        self.add(ec2)
        self.bring_to_front(k2, seg2, pts2)
        self.play(FadeIn(ec2), FadeIn(d2, scale=1.2), run_time=0.4)
        self.play(a2.animate.set_value(-0.4), b2.animate.set_value(1.9), run_time=1.2)
        self.attendre_voix(marge=0.6)
        for m in (seg1, pts1, ec1, seg2, pts2, ec2):
            m.clear_updaters()

    # ── 04 : le catalogue ──────────────────────────────────────────────────

    def carte_fonction(self, x, nom, f, xr, yr, a, b):
        """Une carte : le nom en haut, la mini-courbe au milieu (blanche)."""
        carte = self.carte(2.75, 3.45, P(x, -0.15))
        titre = nom.move_to(P(x, carte.get_top()[1] - 0.38))
        g = Graphe(xr, yr, (x - 1.1, -1.25), (x + 1.1, 0.95))
        ax = g.axes(sw=1.5)
        c = g.courbe(f, a, b, WHITE, 5)
        return carte, titre, ax, c

    def ecran_catalogue(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-catalogue")
        self.au_mot("Les fonctions")
        tit = self.t("Les fonctions que tu connais", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        xs = [-4.75, -1.75, 1.25, 4.25]
        cartes = [
            self.carte_fonction(xs[0], self.t("x²", 40), lambda x: x * x, (-1.7, 1.7), (-0.4, 2.9), -1.65, 1.65),
            self.carte_fonction(xs[1], self.t("−x²", 40), lambda x: -x * x, (-1.7, 1.7), (-2.9, 0.4), -1.65, 1.65),
            self.carte_fonction(xs[2], puissance("e", "x", 40), math.exp, (-2.6, 1.4), (-0.4, 4.0), -2.5, 1.35),
            self.carte_fonction(xs[3], self.t("ln x", 40), math.log, (-0.3, 4.3), (-2.6, 1.6), 0.08, 4.2),
        ]
        verdicts = [("convexe", CONVEXE, bol), ("concave", CONCAVE, dome), ("convexe", CONVEXE, bol),
                    ("concave", CONCAVE, dome)]
        mots = ["x au carré", "Moins x au carré", "L'exponentielle", "Le logarithme"]
        formes = [("un creux", 1), ("une bosse", 1), ("se creuse", 1), ("se bombe", 1)]
        rangs = [("convexe", 1), ("concave", 1), ("convexe", 2), ("concave", 2)]
        for (carte, titre, ax, c), (v, coul, icone), mot, (fm, _), (vm, n) in zip(cartes, verdicts, mots, formes,
                                                                                    rangs):
            self.au_mot(mot)
            self.play(FadeIn(carte), FadeIn(titre, shift=DOWN * 0.1), Create(ax), run_time=0.35)
            self.play(Create(c), run_time=0.5)
            self.au_mot(fm)
            ic = icone(0.32).move_to(P(carte.get_center()[0], 2.35))
            self.play(c.animate.set_color(coul), FadeIn(ic, scale=1.5), run_time=0.35)
            self.au_mot(vm, n=n)
            lab = self.t(v, 32, coul).move_to(P(carte.get_center()[0], carte.get_bottom()[1] + 0.35))
            self.play(carte.animate.set_stroke(coul, width=5), FadeIn(lab, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 05 : question-pause n° 1 : 1/x ─────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Sur ]0 ; +∞[, la courbe", "de 1/x est :"], ["convexe", "concave", "ni l'un ni l'autre"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g = Graphe((-0.4, 4.8), (-0.4, 4.4), (-6.0, -2.9), (1.2, 2.6))
        f = lambda x: 1 / x  # noqa: E731
        ax = g.axes()
        self.play(Create(ax), run_time=0.4)
        self.au_pos(self._texte_voix.find("0 à"))
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("1 sur x")
        c = g.courbe(f, 0.235, 4.7, WHITE, 6)
        lc = self.t("y = 1/x", 32, WHITE).move_to(g.G(1.6, 2.2))
        self.play(FadeIn(q[1], shift=UP * 0.1), Create(c), FadeIn(lc), run_time=0.7)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "05-question", t0, 0)
        # la réponse
        self.dire("05b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        self.au_mot("descend")
        sk = self.rouler(g, f, lambda x: -1 / (x * x), 0.7, 4.5, CONVEXE, 0.75, run_time=1.6,
                         extra=[c.animate.set_color(CONVEXE), lc.animate.set_color(CONVEXE)])
        self.au_mot("piste de bowl")
        a, b = ValueTracker(0.45), ValueTracker(3.5)
        seg, pts, ec = self.corde_vivante(g, f, a, b, CONVEXE)
        self.add(ec)
        self.bring_to_front(c, seg, pts, sk)
        self.play(FadeIn(ec), Create(seg), FadeIn(pts, scale=2), run_time=0.5)
        self.au_mot("elle est convexe")
        lv = self.t("convexe", 40, CONVEXE).move_to(g.G(3.4, 2.4))
        self.play(FadeIn(lv, scale=1.4), run_time=0.35)
        self.insister(lv, 1.3)
        self.au_mot("B confond")
        bb = cartes[1][1][0]
        croix = VGroup(Line(UL, DR), Line(UR, DL)).set_stroke(ROUGE_ERREUR, 6).scale(0.22).move_to(bb)
        err = self.col(self.t("descendre ≠ se bomber", 32, ROUGE_ERREUR), cartes.get_bottom()[1] - 0.45)
        self.play(Create(croix), cartes[1].animate.set_opacity(0.6), FadeIn(err, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)
        for m in (seg, pts, ec):
            m.clear_updaters()

    # ── 06 : le piège : convexe ≠ croissante ───────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("le piège")
        tit = self.ligne(self.t("Le piège !", 46, ROUGE_ERREUR), y=3.05)
        self.play(FadeIn(tit, scale=1.3), run_time=0.4)
        self.au_mot("Convexe ne veut pas")
        p1 = self.t("convexe", 40, CONVEXE)
        p2 = self.t("≠", 44, ROUGE_ERREUR)
        p3 = self.t("croissante", 40, WHITE)
        piege = self.ligne(p1, p2, p3, y=2.1, buff=0.25)
        self.play(FadeIn(p1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("croissante")
        self.play(FadeIn(p2, scale=1.5), FadeIn(p3, shift=UP * 0.1), run_time=0.35)
        self.play(Circumscribe(piege, color=ROUGE_ERREUR), run_time=0.6)
        g = Graphe((-2.4, 2.4), (-0.5, 5.0), (-6.0, -2.9), (1.0, 2.9))
        f = lambda x: x * x  # noqa: E731
        df = lambda x: 2 * x  # noqa: E731
        ax = g.axes()
        self.au_mot("x au carré")
        c = g.courbe(f, -2.2, 2.2, WHITE, 7)
        lx = self.t("x²", 40, WHITE).next_to(g.G(-2.2, f(-2.2)), RIGHT, buff=0.25)
        self.play(Create(ax), Create(c), FadeIn(lx), run_time=0.8)
        self.au_mot("descend")
        fd = Arrow(g.G(-2.15, 2.9), g.G(-1.05, 0.2), buff=0, color=WHITE, stroke_width=5)
        ld = self.t("descend", 30, WHITE).next_to(fd.get_end(), LEFT, buff=0.15)
        sk = self.rouler(g, f, df, -2.1, 0, run_time=0.7, rate_func=rate_functions.ease_in_quad,
                         extra=[GrowArrow(fd), FadeIn(ld)])
        self.au_mot("puis monte")
        fm = Arrow(g.G(1.05, 0.2), g.G(2.15, 2.9), buff=0, color=WHITE, stroke_width=5)
        lm = self.t("monte", 30, WHITE).next_to(fm.get_start(), RIGHT, buff=0.15)
        self.remove(sk)
        sk = self.rouler(g, f, df, 0, 2.1, run_time=0.7, rate_func=rate_functions.ease_out_quad,
                         extra=[GrowArrow(fm), FadeIn(lm)])
        self.au_mot("convexe partout")
        cp = self.col(self.t("convexe partout", 38, CONVEXE), 1.05)
        self.play(c.animate.set_color(CONVEXE), lx.animate.set_color(CONVEXE), FadeIn(cp, scale=1.3), run_time=0.45)
        self.au_mot("descend en creux")
        gauche = g.courbe(f, -2.2, 0, CONVEXE, 12)
        dc = self.col(self.t("elle descend en creux", 34, WHITE), 0.15)
        self.play(Create(gauche), FadeIn(dc, shift=UP * 0.1), run_time=0.6)
        self.play(FadeOut(gauche), run_time=0.3)
        self.au_mot("Ce qui compte")
        r1 = self.t("la forme,", 40, VERT_OK)
        r2 = self.t("pas le sens", 40, VERT_OK)
        reg = self.col(VGroup(r1, r2).arrange(DOWN, aligned_edge=LEFT, buff=0.12), -1.05)
        self.au_mot("la forme")
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("pas le sens")
        if reg.get_right()[0] > 5.6:
            reg.scale_to_fit_width(5.6 - XL).align_to(P(XL, 0), LEFT)
        cad = SurroundingRectangle(reg, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(r2, shift=UP * 0.1), Create(cad), run_time=0.4)
        self.insister(VGroup(reg, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 07 : x³, une courbe qui change de forme ───────────────────────────

    def ecran_mixte(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-mixte")
        self.au_mot("Une même courbe")
        tit = self.col(VGroup(self.t("Une courbe,", 42, JAUNE_TITRE), self.t("deux formes", 42, JAUNE_TITRE)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.85)
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        g = Graphe((-1.8, 1.8), (-4.7, 4.7), (-6.0, -2.95), (1.0, 2.95))
        f = lambda x: x ** 3  # noqa: E731
        ax = g.axes()
        gch = g.courbe(f, -1.66, 0, WHITE, 7)
        drt = g.courbe(f, 0, 1.66, WHITE, 7)
        self.au_mot("x au cube")
        lx = self.t("x³", 40, WHITE).next_to(g.G(1.66, f(1.66)), LEFT, buff=0.2)
        self.play(Create(ax), Create(gch), run_time=0.45)
        self.play(Create(drt), FadeIn(lx), run_time=0.4)
        self.au_mot("en bosse")
        ib = dome(0.3).move_to(g.G(-0.9, 0.9))
        self.play(gch.animate.set_color(CONCAVE), FadeIn(ib, scale=1.5), run_time=0.4)
        self.au_mot("0")
        o = Dot(g.G(0, 0), radius=0.11, color=JAUNE_TITRE)
        l0 = self.t("0", 28, GREY_A).next_to(g.G(0, 0), DR, buff=0.12)
        self.play(FadeIn(o, scale=2), FadeIn(l0), run_time=0.3)
        self.au_mot("en creux")
        ic = bol(0.3).move_to(g.G(0.9, -0.9))
        self.play(drt.animate.set_color(CONVEXE), lx.animate.set_color(CONVEXE), FadeIn(ic, scale=1.5),
                  run_time=0.4)
        self.au_mot("Concave sur")
        i1 = self.ligne(self.t("concave sur", 36, CONCAVE), self.t("]−∞ ; 0]", 36, WHITE), y=1.6)
        self.play(FadeIn(i1[0], shift=UP * 0.1), Indicate(gch, color=CONCAVE, scale_factor=1.05), run_time=0.45)
        self.au_pos(self._texte_voix.find("0 ;"))
        self.play(FadeIn(i1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("convexe sur")
        i2 = self.ligne(self.t("convexe sur", 36, CONVEXE), self.t("[0 ; +∞[", 36, WHITE), y=0.75)
        self.play(FadeIn(i2[0], shift=UP * 0.1), Indicate(drt, color=CONVEXE, scale_factor=1.05), run_time=0.45)
        self.au_pos(self._texte_voix.find("0, plus"))
        self.play(FadeIn(i2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("On dit toujours")
        r1 = self.t("convexe", 38, CONVEXE)
        r2 = self.t("sur un intervalle", 38, JAUNE_TITRE)
        reg = self.col(VGroup(r1, r2).arrange(DOWN, aligned_edge=LEFT, buff=0.12), -0.6)
        if reg.get_right()[0] > 5.6:
            reg.scale_to_fit_width(5.6 - XL).align_to(P(XL, 0), LEFT)
        cad = SurroundingRectangle(reg, color=JAUNE_TITRE, buff=0.15, stroke_width=3)
        self.au_mot("convexe sur un")
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("sur un intervalle")
        self.play(FadeIn(r2, shift=UP * 0.1), Create(cad), run_time=0.4)
        self.insister(VGroup(reg, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : convexe ⇒ croissante ? positive ? ───────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Une fonction est convexe", "sur tout son intervalle.", "Elle est forcément :"],
            ["croissante", "positive", "ni l'un ni l'autre"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        gi = Graphe((-2, 2), (0, 2.6), (-5.4, -1.6), (-0.6, 1.9))
        ill = gi.courbe(lambda x: 0.6 * x * x, -2, 2, CONVEXE, 8)
        li = self.t("convexe", 40, CONVEXE).next_to(gi.G(0, 0), DOWN, buff=0.35)
        self.au_mot("Une fonction")
        self.play(FadeIn(q[0], shift=UP * 0.1), Create(ill), FadeIn(li), run_time=0.6)
        self.au_mot("sur tout")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Elle est forcément")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "08-question", t0, 2)
        # la réponse : le contre-exemple x² − 4
        self.dire("08b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        g = Graphe((-3, 3), (-4.8, 5.6), (-6.0, -2.9), (1.2, 2.9))
        f = lambda x: x * x - 4  # noqa: E731
        ax = g.axes()
        c = g.courbe(f, -3, 3, CONVEXE, 7)
        self.au_mot("x au carré moins 4")
        lc = self.t("y = x² − 4", 34, CONVEXE).next_to(g.G(3, f(3)), LEFT, buff=0.3)
        self.play(FadeOut(VGroup(ill, li)), Create(ax), Create(c), run_time=0.6)
        self.au_pos(self._texte_voix.find("4 est"))
        self.wait(0.12)
        self.play(FadeIn(lc, scale=1.2), run_time=0.3)
        self.au_mot("descend")
        fd = Arrow(g.G(-3.0, 3.0), g.G(-2.0, -2.2), buff=0, color=WHITE, stroke_width=5)
        self.play(GrowArrow(fd), run_time=0.3)
        self.au_mot("puis monte")
        fm = Arrow(g.G(2.0, -2.2), g.G(3.0, 3.0), buff=0, color=WHITE, stroke_width=5)
        self.play(GrowArrow(fm), run_time=0.3)
        self.au_mot("sous l'axe")
        pts = [g.G(x, f(x)) for x in np.linspace(-2, 2, 50)]
        sous = Polygon(*pts, stroke_width=0, fill_color=ROUGE_ERREUR, fill_opacity=0.45)
        self.add(sous)
        self.bring_to_front(c)
        self.play(FadeIn(sous), run_time=0.4)
        self.au_pos(self._texte_voix.find("2 et"))
        gm = g.graduation(-2, "−2", 30)
        gm[1].next_to(g.G(-2, 0), UR, buff=0.08)
        self.play(FadeIn(gm, scale=1.5), run_time=0.2)
        self.au_pos(self._texte_voix.rfind("2"))
        gp = g.graduation(2, "2", 30)
        gp[1].next_to(g.G(2, 0), UL, buff=0.08)
        self.play(FadeIn(gp, scale=1.5), run_time=0.3)
        self.au_mot("Convexe dit")
        r1 = self.t("convexe dit la forme,", 32, VERT_OK)
        r2 = self.t("ni le sens ni le signe", 32, VERT_OK)
        reg = VGroup(r1, r2).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        r1.scale(1.2)
        r2.scale(1.2)
        reg.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        if reg.width > 3.7:
            reg.scale_to_fit_width(3.7)
        self.col(reg, (cartes[0].get_center()[1] + cartes[1].get_center()[1]) / 2)
        self.play(FadeOut(cartes[0]), FadeOut(cartes[1]), FadeIn(r1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("ni le sens")
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.35)
        self.insister(r2, 1.15)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi de Maëlle ─────────────────────────────────────────────

    def rampe(self, centre):
        """Une rampe de skate, en coupe : le profil reste muet (c'est le défi)."""
        pts = [centre + P(-1.3, -0.55), centre + P(1.3, 0.55)]
        bloc = Polygon(*pts, centre + P(1.3, -0.55), stroke_width=0, fill_color=FOND_BETON, fill_opacity=1)
        bord = Line(*pts, stroke_color=BETON, stroke_width=6)
        bord.add(Text("?", font_size=60, color=ORANGE_RETENUE).move_to(centre + P(-0.2, 0.45)))
        sol = Line(centre + P(-1.6, -0.55), centre + P(1.6, -0.55), stroke_width=3, color=GREY_B)
        return VGroup(bloc, bord, sol)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 48, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.6)
        perso = maelle(0.65).move_to(P(-5.75, 2.5))
        self.au_mot("Maëlle")
        self.play(FadeIn(perso, shift=UP * 0.2), run_time=0.4)
        c1 = self.carte(4.6, 4.3, P(-2.6, -0.55), CONCAVE)
        c2 = self.carte(4.6, 4.3, P(2.4, -0.55), CONVEXE)
        self.au_mot("une rampe")
        r = self.rampe(P(-2.6, -0.6))
        self.play(FadeIn(c1), FadeIn(r, shift=UP * 0.1), run_time=0.5)
        self.au_mot("moins exponentielle")
        h1 = VGroup(self.t("f(x) =", 38), puissance("−e", "x", 40)).arrange(RIGHT, buff=0.15)
        h1.move_to(P(-2.6, 1.15))
        self.play(FadeIn(h1, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Convexe ou concave")
        q1 = self.t("convexe ou concave ?", 28, ORANGE_RETENUE).move_to(P(-2.6, -2.2))
        self.play(FadeIn(q1, scale=1.2), run_time=0.35)
        self.au_mot("Et la courbe")
        self.play(FadeIn(c2), run_time=0.3)
        h2a = self.t("g(x) = x² +", 38)
        h2b = self.t("3x", 38)
        h2 = VGroup(h2a, h2b).arrange(RIGHT, buff=0.15).move_to(P(2.4, 1.15))
        self.au_mot("x au carré")
        self.play(FadeIn(h2a, shift=DOWN * 0.1), run_time=0.3)
        self.au_pos(self._texte_voix.find("3 x"))
        self.play(FadeIn(h2b, scale=1.3), run_time=0.3)
        q2 = self.t("?", 90, CONVEXE).move_to(P(2.4, -0.6))
        self.play(FadeIn(q2, scale=1.5), run_time=0.35)
        self.au_mot("Mets pause")
        mp = VGroup(pastille_pause(0.36), self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE))
        mp.arrange(RIGHT, buff=0.2).move_to(P(-0.8, -3.25))
        rebours = CompteARebours(5, r=0.3, fs=28).next_to(mp, RIGHT, buff=0.35)
        self.play(FadeIn(mp, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.play(FadeOut(VGroup(mp, rebours, q1, q2, r)), run_time=0.3)
        self._defi = (c1, c2, h1, h2, perso)

    # ── 09b : la correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.dire("09b-correction")
        c1, c2, h1, h2, perso = self._defi
        g1 = Graphe((-2.6, 1.6), (-4.5, 4.5), (-4.5, -1.9), (-0.7, 0.85))
        ax1 = g1.axes()
        ex = g1.courbe(math.exp, -2.6, 1.45, CONVEXE, 5)
        ex_l = puissance("e", "x", 30, CONVEXE).next_to(g1.G(1.45, math.exp(1.45)), LEFT, buff=0.15)
        self.au_mot("l'exponentielle retournée")
        self.play(Create(ax1), Create(ex), FadeIn(ex_l), run_time=0.6)
        self.au_mot("retournée")
        mex = g1.courbe(lambda x: -math.exp(x), -2.6, 1.45, WHITE, 6)
        self.play(TransformFromCopy(ex, mex), ex.animate.set_stroke(opacity=0.35), ex_l.animate.set_opacity(0.4),
                  run_time=0.9)
        self.au_mot("une bosse")
        self.play(mex.animate.set_color(CONCAVE), run_time=0.35)
        self.au_mot("concave")
        v1 = VGroup(self.t("concave", 38, CONCAVE), self.coche(VERT_OK, 0.2)).arrange(RIGHT, buff=0.2)
        v1.move_to(P(-2.6, -2.25))
        self.play(FadeIn(v1[0], scale=1.3), Create(v1[1]), run_time=0.4)
        self.insister(v1, 1.2)
        g2 = Graphe((-4.3, 1.3), (-2.8, 5.4), (0.4, -1.9), (4.4, 0.85))
        ax2 = g2.axes()
        p2 = g2.courbe(lambda x: x * x + 3 * x, -4.2, 1.2, CONVEXE, 6)
        self.au_mot("une parabole")
        self.play(Create(ax2), Create(p2), run_time=0.7)
        self.au_mot("tournée vers le haut")
        fl = Arrow(g2.G(-1.5, -2.0), g2.G(-1.5, 2.6), buff=0, color=CONVEXE, stroke_width=6)
        self.play(GrowArrow(fl), run_time=0.35)
        self.au_mot("comme x au carré")
        cx = self.t("comme x²", 28, GREY_A).next_to(fl.get_end(), UP, buff=0.08)
        self.play(FadeIn(cx, shift=UP * 0.1), run_time=0.3)
        self.au_mot("convexe")
        v2 = VGroup(self.t("convexe", 38, CONVEXE), self.coche(VERT_OK, 0.2)).arrange(RIGHT, buff=0.2)
        v2.move_to(P(2.4, -2.25))
        self.play(FadeIn(v2[0], scale=1.3), Create(v2[1]), run_time=0.4)
        self.insister(v2, 1.2)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def icone_corde(self, convexe):
        """Une mini-courbe et sa corde : creux sous la corde, bosse au-dessus."""
        g = Graphe((-1, 1), (-0.1, 1.1), (-0.45, -0.3), (0.45, 0.3))
        f = (lambda x: x * x) if convexe else (lambda x: 1 - x * x)
        coul = CONVEXE if convexe else CONCAVE
        c = g.courbe(f, -1, 1, coul, 5)
        a, b = (-0.8, 0.9) if convexe else (-0.9, 0.8)
        seg = Line(g.G(a, f(a)), g.G(b, f(b)), color=JAUNE_TITRE, stroke_width=4)
        return VGroup(c, seg)

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 40
        b1a = self.t("Convexe :", fs, CONVEXE)
        b1b = self.t("la courbe est en creux,", fs)
        b1c = self.t("sous ses cordes.", fs)
        b1 = VGroup(VGroup(self.icone_corde(True), b1a, b1b).arrange(RIGHT, buff=0.25), b1c)
        b1.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        b1c.align_to(b1a, LEFT)
        b2a = self.t("Concave :", fs, CONCAVE)
        b2b = self.t("la courbe est en bosse,", fs)
        b2c = self.t("au-dessus de ses cordes.", fs)
        b2 = VGroup(VGroup(self.icone_corde(False), b2a, b2b).arrange(RIGHT, buff=0.25), b2c)
        b2.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        b2c.align_to(b2a, LEFT)
        b3a = self.t("La convexité dit la forme,", fs, VERT_OK)
        b3b = self.t("pas le sens de variation.", fs, VERT_OK)
        b3 = VGroup(b3a, b3b).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in (b1, b2, b3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        if lignes.height > 5.6:
            lignes.scale_to_fit_height(5.6)
        lignes.move_to(P(-0.5, -0.35))
        self.au_mot("Convexe :")
        self.play(Create(lignes[0][0]), FadeIn(b1[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("sous ses cordes")
        self.play(FadeIn(b1c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Concave :")
        self.play(Create(lignes[1][0]), FadeIn(b2[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("au-dessus de ses cordes")
        self.play(FadeIn(b2c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et la convexité")
        self.play(Create(lignes[2][0]), FadeIn(b3a, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("pas le sens")
        self.play(FadeIn(b3b, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 11 : la fin (règle du 19/10, comme loi_normale_escalier.py) ───────

    def page_abonnement(self, voix="11-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_cordes()
        self.ecran_catalogue()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_mixte()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class ConvexiteReconnaitreTerminale(ConvexiteReconnaitreBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
