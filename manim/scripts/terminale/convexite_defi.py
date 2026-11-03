# convexite_defi.py
# EleveAI — Maths Tle spé — paysage « Convexité : un exercice de bac » (16:9),
# ceinture BLEUE. Micro du coach : convexite_defi (lib/tutor-v4/questionBank/
# terminale-spe/maths/convexite.bank.ts). Short jumeau : convexite_defi_short.py.
#
# Clé de voix → écran :
#   · 00-garde       : page de garde, l'échelle ENTIÈRE des ceintures (bleue) ;
#   · 01-situation   : Awa, gestionnaire de production d'un atelier de vélos
#                      électriques ; les barres du coût d'un vélo en plus qui
#                      baissent (orange) puis remontent (bleu) ;
#   · 02-enonce      : la copie du bac : C(q) = q³ − 12q² + 60q, 4 questions ;
#   · 03-derivees    : C'(q) = 3q² − 24q + 60 (coût marginal, la tangente qui
#                      glisse), C''(q) = 6q − 24 ;
#   · 04/04b         : question-pause n° 1 (C'' s'annule en 4 → B) ;
#   · 05-convexite   : tableau de signes de C'', concave [0 ; 4], convexe [4 ; 10] ;
#   · 06-inflexion   : C(4) = 64 − 192 + 240 = 112, I(4 ; 112) ;
#   · 07/07b         : question-pause n° 2 (C' minimal en 4 → B), la courbe de C' ;
#   · 08-interpreter : C'(4) = 12, 1 200 € par vélo, les barres ;
#   · 08b-piege      : C et C' l'une sous l'autre, le minimum de C' aligné sur I ;
#   · 09/09b         : le défi (imprimerie 3D, q³ − 9q² + 30q) et sa correction,
#                      I(3 ; 36), C'(3) = 3 ;
#   · 10-finale      : « Ce que tu as appris », titre en haut et centré ;
#   · 11-abonne      : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
# Code couleur : orange = concave / bosse / C'' ≤ 0 ; bleu = convexe / creux /
# C'' ≥ 0 ; vert = résultat juste ; rouge = piège.
#
# Modèles : loi_normale_escalier.py, convexite_fonction.py (recopiés, rien importé).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : convexite_defi_marques.json). Audit : AUDIT=1 BORDS=1 … --dry_run.
#
# Voix : manim/voix/terminale-convexite-defi.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/convexite_defi.py ConvexiteDefiTerminale -o eleveai-maths-terminale-convexite-defi --media_dir manim/scripts/terminale/media-convexite-defi
# Sortie : manim/sorties/terminale/maths/analyse/convexite-defi/

import os
import re
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
from signes_expression_2de import Tableau, echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402


def C(q):
    return q ** 3 - 12 * q ** 2 + 60 * q


def Cp(q):
    return 3 * q ** 2 - 24 * q + 60


def D(q):
    """Le défi : l'imprimerie 3D."""
    return q ** 3 - 9 * q ** 2 + 30 * q


def Dp(q):
    return 3 * q ** 2 - 18 * q + 30


# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert C(4) == 112 and 64 - 192 + 240 == 112 and Cp(4) == 12 and 6 * 4 - 24 == 0
assert all(Cp(q) > 0 for q in np.linspace(0, 10, 101))            # C monte toujours
assert all(6 * q - 24 < 0 for q in (0, 3.9)) and all(6 * q - 24 > 0 for q in (4.1, 10))
assert 12 * 1000 / 10 == 1200                                      # 12 milliers pour 10 vélos
assert D(3) == 36 and 27 - 81 + 90 == 36 and Dp(3) == 3 and 27 - 54 + 30 == 3 and 6 * 3 - 18 == 0
assert min(Cp(q) for q in np.linspace(0, 10, 1001)) == Cp(4)

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6  # la colonne de droite (marge de 3 % : 0,43 du bord)
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
TANGENTE = "#FDE68A"


class Graphe:
    """Un repère : [xa ; xb] × [ya ; yb] posé dans le rectangle (X0, Y0)-(X1, Y1)."""

    def __init__(self, xr, yr, bg, hd):
        (self.xa, self.xb), (self.ya, self.yb) = xr, yr
        (self.X0, self.Y0), (self.X1, self.Y1) = bg, hd

    def G(self, x, y):
        return P(self.X0 + (x - self.xa) / (self.xb - self.xa) * (self.X1 - self.X0),
                 self.Y0 + (y - self.ya) / (self.yb - self.ya) * (self.Y1 - self.Y0))

    def axes(self, sw=2, color=GREY_B):
        kw = dict(buff=0, stroke_width=sw, color=color, tip_length=0.16, max_tip_length_to_length_ratio=0.08)
        return VGroup(Arrow(self.G(self.xa, 0), self.G(self.xb, 0), **kw),
                      Arrow(self.G(0, self.ya), self.G(0, self.yb), **kw))

    def courbe(self, f, a, b, color=WHITE, sw=5, n=120):
        pts = []
        for x in np.linspace(a, b, n):
            y = f(x)
            assert self.ya - 1e-9 <= y <= self.yb + 1e-9, (x, y)
            pts.append(self.G(x, y))
        m = VMobject(stroke_color=color, stroke_width=sw)
        m.set_points_smoothly(pts)
        return m

    def deux_parties(self, f, a, i, b, sw=5):
        """La courbe orange (bosse) jusqu'à l'inflexion i, puis bleue (creux)."""
        return VGroup(self.courbe(f, a, i, CONCAVE, sw), self.courbe(f, i, b, CONVEXE, sw))

    def tangente(self, f, fp, x0, demi=1.4, color=TANGENTE, sw=4):
        a, b = x0 - demi, x0 + demi
        return Line(self.G(a, f(x0) + fp(x0) * (a - x0)), self.G(b, f(x0) + fp(x0) * (b - x0)),
                    color=color, stroke_width=sw)


def velo(s=1.0, color=WHITE, batterie=VERT_OK):
    """Un vélo électrique schématique : deux roues, le cadre, la batterie."""
    r = 0.36
    ar, av = P(-0.62, 0), P(0.62, 0)
    pedalier, selle, guidon = P(-0.05, 0), P(-0.28, 0.6), P(0.42, 0.68)
    roues = VGroup(Circle(radius=r, stroke_color=color, stroke_width=4).move_to(ar),
                   Circle(radius=r, stroke_color=color, stroke_width=4).move_to(av))
    cadre = VMobject(stroke_color=color, stroke_width=4)
    cadre.set_points_as_corners([ar, selle, pedalier, ar])
    avant = VMobject(stroke_color=color, stroke_width=4)
    avant.set_points_as_corners([selle + RIGHT * 0.05 + DOWN * 0.05, guidon + DOWN * 0.12, av])
    tube = Line(pedalier, guidon + DOWN * 0.12, stroke_color=color, stroke_width=4)
    bat = RoundedRectangle(width=0.36, height=0.13, corner_radius=0.04, fill_color=batterie, fill_opacity=1,
                           stroke_width=0).move_to((pedalier + guidon) / 2 + DOWN * 0.08)
    bat.rotate(np.arctan2(guidon[1] - pedalier[1], guidon[0] - pedalier[0]))
    sel = Line(selle + LEFT * 0.14 + UP * 0.05, selle + RIGHT * 0.12 + UP * 0.05, stroke_color=color, stroke_width=6)
    gui = Line(guidon + DOWN * 0.12, guidon + RIGHT * 0.18 + UP * 0.02, stroke_color=color, stroke_width=5)
    return VGroup(roues, cadre, avant, tube, bat, sel, gui).scale(s)


def gestionnaire(s=1.0):
    """Awa : tête, cheveux en chignon, tenue d'atelier, une tablette de suivi."""
    tete = Circle(radius=0.32, fill_color="#7a4a24", fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    chignon = Circle(radius=0.2, fill_color="#1f1209", fill_opacity=1, stroke_width=0).move_to(P(0, 1.45))
    cheveux = Arc(radius=0.34, start_angle=0.2, angle=PI - 0.4, stroke_color="#1f1209", stroke_width=10)
    cheveux.move_to(tete.get_top() + DOWN * 0.08)
    corps = RoundedRectangle(width=1.05, height=1.25, corner_radius=0.3, fill_color="#0f766e", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    poche = RoundedRectangle(width=0.4, height=0.28, corner_radius=0.05, stroke_color="#99f6e4", stroke_width=2)
    poche.move_to(P(-0.2, -0.05))
    tab = RoundedRectangle(width=0.62, height=0.5, corner_radius=0.05, fill_color="#1e293b", fill_opacity=1,
                           stroke_color=GREY_B, stroke_width=2).move_to(P(0.42, -0.05))
    barres = VGroup(*[Rectangle(width=0.07, height=h, fill_color=c, fill_opacity=1, stroke_width=0)
                      for h, c in [(0.3, CONCAVE), (0.2, CONCAVE), (0.12, VERT_OK), (0.2, CONVEXE), (0.32, CONVEXE)]])
    barres.arrange(RIGHT, buff=0.03, aligned_edge=DOWN).move_to(tab).align_to(tab.get_bottom() + UP * 0.07, DOWN)
    return VGroup(corps, poche, tete, chignon, cheveux, tab, barres).scale(s)


def imprimante3d(s=1.0):
    """Une imprimante 3D : le cadre, la buse, une pièce qui monte."""
    cadre = RoundedRectangle(width=1.6, height=1.5, corner_radius=0.08, stroke_color=GREY_B, stroke_width=4)
    barre = Line(P(-0.7, 0.35), P(0.7, 0.35), stroke_color=GREY_B, stroke_width=4)
    buse = Polygon(P(-0.12, 0.35), P(0.12, 0.35), P(0, 0.12), fill_color=ORANGE_RETENUE, fill_opacity=1,
                   stroke_width=0)
    plateau = Line(P(-0.6, -0.55), P(0.6, -0.55), stroke_color=WHITE, stroke_width=5)
    piece = Polygon(P(-0.3, -0.55), P(0.3, -0.55), P(0.2, -0.05), P(-0.2, -0.05), fill_color=VIOLET_ACCENT,
                    fill_opacity=1, stroke_width=0)
    return VGroup(cadre, barre, buse, plateau, piece).scale(s)


class ConvexiteDefiBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = "convexite_defi_marques.json"
    nom_voix = "terminale-convexite-defi"
    identite = "Maths Tle — EleveAI"
    ceinture = "bleue"

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

    def lg(self, *morceaux, y, x=-6.2, buff=0.15):
        """Une ligne de calcul à gauche, alignée sur x."""
        return VGroup(*morceaux).arrange(RIGHT, buff=buff).move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def insister(self, mob, k=1.35, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def pastille_num(self, k, color=BLEU_CALCUL, r=0.22):
        """Le numéro d'une question : la voix le dit en lettres."""
        n = Text(str(k), font_size=28, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

    def entete(self, k, texte, color=JAUNE_TITRE):
        """« Question un » : la pastille et le titre, en haut à gauche."""
        g = VGroup(self.pastille_num(k, color, 0.26), self.t(texte, 40, color)).arrange(RIGHT, buff=0.22)
        return g.move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)

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
        """au_mot sur la n-ième occurrence de l'extrait ; si l'extrait contient
        un nombre (« moins 12 »), on attend le NOMBRE, pas le mot d'avant."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        m = re.search(r"\d", extrait)
        self.au_pos(i + (m.start() if m else 0))

    # ── la question-pause (modèle : convexite_fonction.py) ─────────────────

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

    def q_tete(self, question, choix):
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
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        """Chaque carte À SA LETTRE, son contenu À SON MOT."""
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            j = i + 4
            m = re.search(r"\d", voix[j:j + 14])
            self.au_pos(j + m.start() if m else j)  # « q égale 4 » : à son NOMBRE
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

    # ── les repères ─────────────────────────────────────────────────────────

    def repere(self, g, nx="q", ny="C(q)", fs=26):
        ax = g.axes()
        lx = self.t(nx, fs, GREY_A).next_to(g.G(g.xb, 0), DOWN, buff=0.1).align_to(g.G(g.xb, 0), RIGHT)
        ly = self.t(ny, fs, GREY_A).next_to(g.G(0, g.yb), RIGHT, buff=0.12)
        return VGroup(ax, lx, ly)

    def graphe_C(self, bg, hd):
        return Graphe((0, 10.8), (0, 430), bg, hd)

    def graphe_Cp(self, bg, hd):
        return Graphe((0, 10.8), (0, 130), bg, hd)

    def barres(self, x0, x1, y0, h120, largeur=0.34):
        """Les barres du coût d'un vélo en plus : C'(q) pour q = 0, 1, …, 10."""
        pas = (x1 - x0) / 10
        b = VGroup()
        for q in range(11):
            h = Cp(q) * h120 / 120
            couleur = CONCAVE if q < 4 else (VERT_OK if q == 4 else CONVEXE)
            b.add(Rectangle(width=largeur, height=h, stroke_width=0, fill_color=couleur, fill_opacity=0.9)
                  .move_to(P(x0 + q * pas, y0 + h / 2)))
        return b

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Convexité : un exercice de bac", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Convexité")
        self.play(Write(titre), run_time=0.9)
        l1a = self.t("Fabriquer un vélo de plus coûte", 34)
        l1b = self.t("de moins en moins…", 34, CONCAVE)
        l2 = self.t("… puis de plus en plus.", 34, CONVEXE)
        bloc = VGroup(l1a, l1b, l2).arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, 1.45))
        bloc.align_to(P(-1.7, 0), LEFT)
        g = Graphe((0, 10.4), (0, 420), (-6.0, -1.25), (-2.6, 2.15))
        ax = g.axes(sw=2)
        bosse, creux = g.deux_parties(C, 0, 4, 10, sw=6)
        v = velo(0.5).move_to(P(-4.3, 1.75))
        self.au_mot("Fabriquer")
        self.play(FadeIn(l1a, shift=UP * 0.1), Create(ax), FadeIn(v, shift=RIGHT * 0.3), run_time=0.5)
        self.au_mot("de moins en moins")
        self.play(FadeIn(l1b, shift=UP * 0.1), Create(bosse), run_time=0.8)
        self.au_mot("puis de plus")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(creux), run_time=0.8)
        self.au_mot("À quel moment")
        q = self.t("À quel moment ça bascule ?", 40, JAUNE_TITRE).move_to(P(0, -0.05)).align_to(P(-1.7, 0), LEFT)
        I = Dot(g.G(4, C(4)), radius=0.11, color=JAUNE_TITRE)
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.au_mot("bascule")
        self.play(FadeIn(I, scale=2.5), Flash(I, color=JAUNE_TITRE, line_length=0.2), run_time=0.6)
        ident = self.t(self.identite, 26, GREY_A).next_to(q, DOWN, buff=0.25)
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : la situation : Awa et l'atelier ───────────────────────────────

    def atelier(self):
        """Le bâtiment de l'atelier (toit en dents de scie) et un vélo dedans."""
        mur = Rectangle(width=2.6, height=1.5, stroke_color=GREY_B, stroke_width=3)
        toit = VMobject(stroke_color=GREY_B, stroke_width=3)
        toit.set_points_as_corners([P(-1.3, 0.75), P(-1.3, 1.25), P(-0.43, 0.75), P(-0.43, 1.25), P(0.43, 0.75),
                                    P(0.43, 1.25), P(1.3, 0.75)])
        porte = Rectangle(width=0.5, height=0.8, stroke_color=GREY_B, stroke_width=2).move_to(P(0.85, -0.35))
        v = velo(0.62).move_to(P(-0.35, -0.3))
        return VGroup(mur, toit, porte, v)

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        awa = gestionnaire(1.05).move_to(P(-5.0, 0.9))
        nom = self.t("Awa", 40, JAUNE_TITRE).next_to(awa, DOWN, buff=0.2)
        self.au_mot("Voici Awa")
        self.play(FadeIn(awa, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("gère la production")
        met = VGroup(self.t("gestionnaire", 30, BLEU_CALCUL), self.t("de production", 30, BLEU_CALCUL))
        met.arrange(DOWN, buff=0.08).next_to(nom, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.4)
        at = self.atelier().move_to(P(-1.75, 1.0))
        lat = VGroup(self.t("atelier de vélos", 28, GREY_A), self.t("électriques", 28, GREY_A))
        lat.arrange(DOWN, buff=0.08).next_to(at, DOWN, buff=0.2)
        self.au_mot("atelier de vélos")
        self.play(Create(at[:3]), FadeIn(at[3], shift=RIGHT * 0.4), FadeIn(lat), run_time=0.7)
        # les barres : coût de chaque vélo en plus
        x0, x1, y0 = 1.05, 6.05, -1.75
        b = self.barres(x0, x1, y0, 3.55)
        for k in range(5, 11):
            b[k].set_fill(CONVEXE)
        b[4].set_fill(CONCAVE)
        base = Line(P(x0 - 0.35, y0), P(x1 + 0.35, y0), stroke_width=2, color=GREY_B)
        tit = self.t("coût de chaque vélo en plus", 28, GREY_A).move_to(P((x0 + x1) / 2, 2.55))
        self.au_mot("Au début")
        self.play(Create(base), run_time=0.4)
        self.au_mot("chaque vélo en plus coûte moins")
        self.play(FadeIn(tit), LaggedStart(*[GrowFromEdge(b[k], DOWN) for k in range(5)], lag_ratio=0.25),
                  run_time=1.2)
        fl1 = Arrow(P(1.3, 0.45), P(2.75, -0.9), buff=0, color=CONCAVE, stroke_width=5)
        m1 = self.t("moins cher", 30, CONCAVE).move_to(P(1.65, 0.95))
        self.au_mot("moins cher")
        self.play(GrowArrow(fl1), FadeIn(m1, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("heures supplémentaires")
        h1 = self.t("heures supplémentaires", 28, CONVEXE).move_to(P(-3.4, -2.45))
        self.play(FadeIn(h1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus de stock")
        h2 = self.t("plus de stock", 28, CONVEXE).move_to(P(-4.7, -3.0))
        self.play(FadeIn(h2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus de place")
        h3 = self.t("plus de place", 28, CONVEXE).move_to(P(-1.9, -3.0))
        self.play(FadeIn(h3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("chaque vélo en plus coûte plus")
        self.play(LaggedStart(*[GrowFromEdge(b[k], DOWN) for k in range(5, 11)], lag_ratio=0.2), run_time=1.1)
        fl2 = Arrow(P(3.6, -0.6), P(5.0, 0.9), buff=0, color=CONVEXE, stroke_width=5)
        m2 = self.t("plus cher", 30, CONVEXE).move_to(P(4.0, 1.45))  # au-dessus de la flèche, loin de « moins cher »
        self.au_mot("plus cher")
        self.play(GrowArrow(fl2), FadeIn(m2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 02 : l'énoncé ──────────────────────────────────────────────────────

    def ecran_enonce(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-enonce")
        self.au_mot("L'énoncé")
        tit = self.t("L'énoncé", 46, JAUNE_TITRE).move_to(P(0, 3.25)).align_to(P(-6.2, 0), LEFT)
        copie = RoundedRectangle(width=7.9, height=5.85, corner_radius=0.15, stroke_color=GREY_B, stroke_width=2,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-2.2, -0.25))
        self.play(Write(tit), FadeIn(copie), run_time=0.6)
        fs = 31
        x = -5.85
        a = self.lg(self.t("Coût total :", fs, GREY_A), self.t("C(q) = q³", fs, BLEU_CALCUL),
                    self.t("− 12q²", fs, BLEU_CALCUL), self.t("+ 60q", fs, BLEU_CALCUL), y=2.1, x=x)
        g = self.graphe_C((2.85, -1.55), (6.3, 2.6))
        rep = self.repere(g)
        courbe = g.courbe(C, 0, 10, WHITE, 5)
        self.au_mot("Le coût total")
        self.play(FadeIn(a[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("C de q")
        self.play(FadeIn(a[1], shift=UP * 0.1), Create(rep), run_time=0.4)
        self.au_mot("moins 12")
        self.play(FadeIn(a[2], scale=1.2), run_time=0.3)
        self.au_mot("plus 60")
        self.play(FadeIn(a[3], scale=1.2), Create(courbe), run_time=1.0)
        b = self.lg(self.t("en milliers d'euros", 30, GREY_A), y=1.45, x=x)
        self.au_mot("en milliers")
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        c = self.lg(self.t("q : nombre de dizaines de vélos", 30, GREY_A), y=0.9, x=x)
        self.au_mot("pour q dizaines")
        self.play(FadeIn(c, shift=UP * 0.1), run_time=0.3)
        d = self.lg(self.t("0 ≤ q ≤", 32), self.t("10", 32), y=0.33, x=x)
        self.au_mot("entre 0")
        self.play(FadeIn(d[0], shift=UP * 0.1), run_time=0.3)
        self.au_pos(self._texte_voix.find("10"))
        self.play(FadeIn(d[1], scale=1.3), run_time=0.25)
        qs = [("Un :", 1, "Calcule C''(q)."), ("Deux :", 2, "Étudie la convexité de C."),
              ("Trois :", 3, "Trouve le point d'inflexion."), ("Quatre :", 4, "Interprète.")]
        for i, (mot, k, txt) in enumerate(qs):
            y = -0.55 - 0.68 * i
            num = self.pastille_num(k).move_to(P(x + 0.22, y))
            l = self.t(txt, 32).next_to(num, RIGHT, buff=0.25)
            self.au_mot(mot)
            self.play(FadeIn(num, scale=1.5), FadeIn(l, shift=RIGHT * 0.15), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 03 : question 1, les dérivées ──────────────────────────────────────

    def ecran_derivees(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-derivees")
        fs = 36
        ent = self.entete(1, "Question")
        g = self.graphe_C((1.75, -1.6), (6.3, 2.75))
        rep = self.repere(g)
        courbe = g.courbe(C, 0, 10, WHITE, 5)
        self.au_mot("Question un")
        self.play(FadeIn(ent, shift=DOWN * 0.15), FadeIn(rep), FadeIn(courbe), run_time=0.45)
        a = self.lg(self.t("C'(q) =", fs, BLEU_CALCUL), self.t("3q²", fs), self.t("− 24q", fs), self.t("+ 60", fs),
                    y=2.2)
        self.au_mot("C prime de q")
        self.play(FadeIn(a[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 q au carré")
        self.play(FadeIn(a[1], scale=1.2), run_time=0.3)
        self.au_mot("moins 24")
        self.play(FadeIn(a[2], scale=1.2), run_time=0.3)
        self.au_mot("plus 60")
        self.play(FadeIn(a[3], scale=1.2), run_time=0.3)
        # le coût marginal : la tangente glisse le long de la courbe
        m1 = self.lg(self.t("C'(q) :", 34, BLEU_CALCUL), self.t("le coût marginal", 34, TANGENTE), y=1.35)
        q = ValueTracker(0.8)
        tg = always_redraw(lambda: g.tangente(C, Cp, q.get_value(), 1.0))
        pt = always_redraw(lambda: Dot(g.G(q.get_value(), C(q.get_value())), radius=0.09, color=TANGENTE))
        self.au_mot("C prime, c'est")
        self.play(FadeIn(m1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("coût marginal")
        self.play(FadeIn(m1[1], shift=UP * 0.1), FadeIn(tg), FadeIn(pt), run_time=0.4)
        self.play(q.animate.set_value(4.0), run_time=0.7, rate_func=linear)
        m2 = self.lg(self.t("= le coût d'un vélo en plus", 32, TANGENTE), y=0.75, x=-5.5)
        v = velo(0.4).next_to(m2, RIGHT, buff=0.3)
        self.au_mot("le coût d'un vélo")
        self.play(FadeIn(m2, shift=UP * 0.1), FadeIn(v, shift=RIGHT * 0.2), q.animate.set_value(8.2),
                  run_time=1.4, rate_func=linear)
        b = self.lg(self.t("C''(q) =", fs + 4, VERT_OK), self.t("6q", fs + 4, VERT_OK), self.t("− 24", fs + 4, VERT_OK),
                    y=-0.6)
        self.au_mot("Puis C seconde")
        self.play(FadeIn(b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 q")
        self.play(FadeIn(b[1], scale=1.2), run_time=0.3)
        self.au_mot("moins 24", n=2)
        self.play(FadeIn(b[2], scale=1.2), run_time=0.3)
        cad = SurroundingRectangle(b, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.6)
        tg.clear_updaters()
        pt.clear_updaters()

    # ── 04 / 04b : question-pause n° 1 (C'' s'annule en 4) ─────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-question")
        t0 = self.renderer.time
        q0 = VGroup(self.t("C''(q) =", 32, VERT_OK), self.t("6q", 32), self.t("− 24", 32)).arrange(RIGHT, buff=0.15)
        tete, q, cartes, pause, rebours = self.q_tete([q0, "Elle s'annule en :"], ["24", "4", "6"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g = Graphe((0, 10.8), (-30, 42), (-6.0, -3.15), (1.2, 0.85))
        ax = g.axes()
        lx = self.t("q", 26, GREY_A).next_to(g.G(10.8, 0), DOWN, buff=0.1)
        ly = self.t("C''(q)", 26, VERT_OK).next_to(g.G(0, 42), RIGHT, buff=0.12)
        droite = g.courbe(lambda x: 6 * x - 24, 0, 10.5, WHITE, 5, n=2)
        self.au_mot("C seconde")
        self.play(FadeIn(q[0][0], shift=UP * 0.1), Create(ax), FadeIn(lx), FadeIn(ly), run_time=0.4)
        self.au_mot("6 q")
        self.play(FadeIn(q[0][1], scale=1.2), run_time=0.25)
        self.au_mot("moins 24")
        self.play(FadeIn(q[0][2], scale=1.2), Create(droite), run_time=0.6)
        self.au_mot("Elle s'annule")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04-question", t0, 1)
        # la réponse
        self.dire("04b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 38
        e1 = self.lg(self.t("6q", fs), self.t("− 24", fs), self.t("= 0", fs), y=3.0)
        e2 = self.lg(self.t("6q = 24", fs), y=2.4)
        e3 = self.lg(self.t("q = 4", fs + 4, VERT_OK), y=1.75)
        self.au_mot("6 q moins 24")
        self.play(FadeIn(e1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("moins 24")
        self.play(FadeIn(e1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("égale 0")
        self.play(FadeIn(e1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("donc 6 q")
        self.play(FadeIn(e2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("donc q égale")
        self.au_pos(self._texte_voix.rfind("4"))
        neg = g.courbe(lambda x: 6 * x - 24, 0, 4, CONCAVE, 6, n=2)
        pos = g.courbe(lambda x: 6 * x - 24, 4, 10.5, CONVEXE, 6, n=2)
        z = Dot(g.G(4, 0), radius=0.11, color=VERT_OK)
        lz = self.t("4", 32, VERT_OK).next_to(z, DOWN, buff=0.15)
        self.play(FadeIn(e3, scale=1.3), FadeIn(neg), FadeIn(pos), FadeOut(droite), FadeIn(z, scale=2),
                  FadeIn(lz), run_time=0.4)
        self.insister(e3, 1.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : question 2, la convexité ──────────────────────────────────────

    def ecran_convexite(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-convexite")
        ent = self.entete(2, "Question")
        g = self.graphe_C((1.9, -1.6), (6.3, 2.75))
        rep = self.repere(g)
        bosse, creux = g.deux_parties(C, 0, 4, 10, sw=6)
        blanc = g.courbe(C, 0, 10, WHITE, 5)
        self.au_mot("Question deux")
        self.play(FadeIn(ent, shift=DOWN * 0.15), FadeIn(rep), FadeIn(blanc), run_time=0.45)
        tab = Tableau(["0", "4", "10"], centre_x=-2.45, y_haut=2.55, larg_lab=1.9, pas=2.2, h=0.78, fs=32,
                      marge=0.55)
        lignes = VGroup(tab.ligne(0, "q"), tab.ligne(1, "C''(q)", VERT_OK), tab.ligne(2, "C"))
        self.au_mot("6 q moins 24 est")
        self.play(FadeIn(lignes), run_time=0.4)
        self.au_mot("négatif")
        moins = tab.case(1, 1, "−")
        self.play(FadeIn(moins, scale=1.5), run_time=0.3)
        self.au_mot("entre 0")
        self.play(FadeIn(tab.valeur(0), scale=1.4), run_time=0.25)
        self.au_mot("et 4")
        zero = tab.case(1, 2, "0")
        self.play(FadeIn(tab.valeur(1, JAUNE_TITRE), scale=1.4), FadeIn(zero, scale=1.4), run_time=0.25)
        self.au_mot("positif")
        plus = tab.case(1, 3, "+")
        self.play(FadeIn(plus, scale=1.5), run_time=0.3)
        self.au_mot("et 10")
        self.play(FadeIn(tab.valeur(2), scale=1.4), run_time=0.25)
        self.au_mot("concave")
        cc = self.t("concave", 30, CONCAVE).move_to(P(tab.x(1), tab.y(2)))
        self.play(FadeIn(cc, scale=1.2), FadeIn(bosse), run_time=0.45)
        c1 = self.lg(self.t("C est concave sur", 36), self.t("[0 ; 4]", 38, CONCAVE), y=-0.65, x=-6.1)
        self.play(FadeIn(c1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 0 à 4")
        self.play(FadeIn(c1[1], scale=1.3), run_time=0.3)
        self.au_mot("et convexe")
        cv = self.t("convexe", 30, CONVEXE).move_to(P(tab.x(3), tab.y(2)))
        c2 = self.lg(self.t("C est convexe sur", 36), self.t("[4 ; 10]", 38, CONVEXE), y=-1.45, x=-6.1)
        self.play(FadeIn(cv, scale=1.2), FadeIn(creux), FadeOut(blanc), FadeIn(c2[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("de 4 à 10")
        self.play(FadeIn(c2[1], scale=1.3), run_time=0.3)
        self.insister(VGroup(c1[1], c2[1]), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 06 : question 3, le point d'inflexion ──────────────────────────────

    def mini_signes(self, x, y, fs=34):
        """« −  0  + » : orange, puis bleu (C'' change de signe)."""
        g = VGroup(self.t("−", fs + 6, CONCAVE), self.t("0", fs, JAUNE_TITRE), self.t("+", fs + 6, CONVEXE))
        g.arrange(RIGHT, buff=0.35).move_to(P(0, y)).align_to(P(x, 0), LEFT)
        for m in g:
            m._pas_audit = True
        return g

    def ecran_inflexion(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-inflexion")
        ent = self.entete(3, "Question")
        g = self.graphe_C((1.3, -1.7), (6.3, 2.75))
        rep = self.repere(g)
        bosse, creux = g.deux_parties(C, 0, 4, 10, sw=6)
        self.au_mot("Question trois")
        self.play(FadeIn(ent, shift=DOWN * 0.15), FadeIn(rep), FadeIn(bosse), FadeIn(creux), run_time=0.45)
        fs = 36
        a = self.lg(self.t("C''(q) s'annule en", fs), self.t("4", fs + 2, JAUNE_TITRE), y=2.2)
        self.au_mot("C seconde")
        self.play(FadeIn(a[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 en")
        self.play(FadeIn(a[1], scale=1.4), run_time=0.25)
        self.au_mot("en changeant")
        sg = self.mini_signes(-5.6, 1.5)
        lsg = self.t("change de signe", 30, GREY_A).next_to(sg, RIGHT, buff=0.4)
        self.play(FadeIn(sg[0], shift=RIGHT * 0.1), FadeIn(sg[1]), FadeIn(sg[2], shift=LEFT * 0.1), FadeIn(lsg),
                  run_time=0.4)
        b = self.lg(self.t("C(4) =", fs), self.t("64", fs), self.t("− 192", fs), self.t("+ 240", fs), y=0.55)
        self.au_mot("C de 4")
        self.play(FadeIn(b[0], shift=UP * 0.1), run_time=0.3)
        for m, mot in zip(b[1:], ["64", "192", "240"]):
            self.au_mot(mot)
            self.play(FadeIn(m, scale=1.25), run_time=0.25)
        c = self.lg(self.t("=", fs + 4), self.t("112", fs + 4, VERT_OK), y=-0.2, x=-5.1)
        self.au_mot("112")
        self.play(FadeIn(c, scale=1.3), run_time=0.3)
        self.au_mot("Le point d'inflexion")
        I = Dot(g.G(4, C(4)), radius=0.12, color=JAUNE_TITRE)
        lI = self.t("I", 34, JAUNE_TITRE).next_to(I, UL, buff=0.08)
        self.play(FadeIn(I, scale=2.5), FadeIn(lI), Flash(I, color=JAUNE_TITRE, line_length=0.25), run_time=0.6)
        self.au_mot("de coordonnées")
        vx = DashedLine(g.G(4, C(4)), g.G(4, 0), color=JAUNE_TITRE, stroke_width=2.5)
        vy = DashedLine(g.G(4, C(4)), g.G(0, C(4)), color=JAUNE_TITRE, stroke_width=2.5)
        self.play(Create(vx), Create(vy), run_time=0.4)
        d = self.lg(self.t("I(4 ; 112)", fs + 6, JAUNE_TITRE), y=-1.3)
        cad = SurroundingRectangle(d, color=JAUNE_TITRE, buff=0.15, stroke_width=3)
        l4 = self.t("4", 26, JAUNE_TITRE).next_to(g.G(4, 0), DOWN, buff=0.12)
        l112 = self.t("112", 26, JAUNE_TITRE).next_to(g.G(0, C(4)), LEFT, buff=0.1)
        self.au_mot("4 et")
        self.play(FadeIn(l4, scale=1.4), run_time=0.25)
        self.au_mot("112", n=2)
        self.play(FadeIn(l112, scale=1.4), FadeIn(d, scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(d, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 07 / 07b : question-pause n° 2 (C' minimal en 4) ───────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(["Le coût marginal C'", "est le plus bas quand :"],
                                                      ["q = 0", "q = 4", "q = 10"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g = self.graphe_C((-5.9, -3.0), (1.3, 2.75))
        rep = self.repere(g)
        bosse, creux = g.deux_parties(C, 0, 4, 10, sw=6)
        self.play(FadeIn(rep), FadeIn(bosse), FadeIn(creux), run_time=0.4)
        qv = ValueTracker(0.6)
        tg = always_redraw(lambda: g.tangente(C, Cp, qv.get_value(), 1.0))
        pt = always_redraw(lambda: Dot(g.G(qv.get_value(), C(qv.get_value())), radius=0.09, color=TANGENTE))
        self.au_mot("Le coût marginal")
        self.play(FadeIn(q[0], shift=UP * 0.1), FadeIn(tg), FadeIn(pt), run_time=0.35)
        self.au_mot("est le plus bas")
        self.play(FadeIn(q[1], shift=UP * 0.1), qv.animate.set_value(9.2), run_time=1.1, rate_func=linear)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07-question", t0, 1)
        # la réponse : la courbe de C' sous celle de C
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        tg.clear_updaters()
        pt.clear_updaters()
        gh = self.graphe_C((-5.9, 0.75), (1.3, 3.25))
        gb = self.graphe_Cp((-5.9, -2.9), (1.3, 0.2))
        rh = self.repere(gh, ny="C")
        bh = gh.deux_parties(C, 0, 4, 10, sw=5)
        rb = self.repere(gb, ny="C'")
        self.play(FadeOut(VGroup(tg, pt)), ReplacementTransform(rep, rh), ReplacementTransform(VGroup(bosse, creux), bh),
                  FadeIn(rb), run_time=0.6)
        dec = gb.courbe(Cp, 0, 4, CONCAVE, 6)
        cro = gb.courbe(Cp, 4, 10, CONVEXE, 6)
        self.au_mot("décroît")
        self.play(Create(dec), run_time=0.7)
        self.au_mot("puis croît")
        self.play(Create(cro), run_time=0.7)
        self.au_mot("son minimum")
        mn = Dot(gb.G(4, Cp(4)), radius=0.12, color=VERT_OK)
        self.play(FadeIn(mn, scale=2.5), run_time=0.3)
        self.au_mot("en 4")
        l4 = self.t("4", 28, VERT_OK).next_to(gb.G(4, 0), DOWN, buff=0.1)
        self.play(FadeIn(l4, scale=1.4), run_time=0.25)
        self.au_mot("au point d'inflexion")
        I = Dot(gh.G(4, C(4)), radius=0.11, color=JAUNE_TITRE)
        lien = DashedLine(gh.G(4, C(4)), gb.G(4, Cp(4)), color=JAUNE_TITRE, stroke_width=3)
        self.play(FadeIn(I, scale=2.5), Create(lien), run_time=0.5)
        self.play(Flash(I, color=JAUNE_TITRE, line_length=0.2), Flash(mn, color=VERT_OK, line_length=0.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 08 : question 4, interpréter ───────────────────────────────────────

    def ecran_interpreter(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-interpreter")
        ent = self.entete(4, "Question")
        x0, x1, y0 = -5.6, -0.2, -2.3
        b = self.barres(x0, x1, y0, 4.3, largeur=0.36)
        b[4].set_fill(GREY_B)
        base = Line(P(x0 - 0.4, y0), P(x1 + 0.4, y0), stroke_width=2, color=GREY_B)
        tit = self.t("coût de chaque vélo en plus", 28, GREY_A).move_to(P((x0 + x1) / 2, 2.45))
        self.au_mot("Question quatre")
        self.play(FadeIn(ent, shift=DOWN * 0.15), Create(base), FadeIn(tit),
                  LaggedStart(*[GrowFromEdge(r, DOWN) for r in b], lag_ratio=0.08), run_time=1.0)
        fs = 34
        a = self.ligne(self.t("À", fs), self.t("40", fs, VERT_OK), self.t("vélos :", fs), y=2.25)
        l40 = self.t("40 vélos", 28, VERT_OK).next_to(b[4], DOWN, buff=0.15)
        self.au_mot("40")
        self.play(FadeIn(a, shift=UP * 0.1), FadeIn(l40, scale=1.3), b[4].animate.set_fill(VERT_OK), run_time=0.4)
        self.au_mot("le vélo en plus")
        self.play(Indicate(b[4], color=VERT_OK, scale_factor=1.25), run_time=0.6)
        c = self.ligne(self.t("C'(4) =", fs, BLEU_CALCUL), self.t("12", fs + 4, VERT_OK), y=1.45)
        self.au_mot("C prime de 4")
        self.play(FadeIn(c[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("égale 12")
        self.au_pos(self._texte_voix.find("12"))
        self.play(FadeIn(c[1], scale=1.3), run_time=0.25)
        d1 = self.ligne(self.t("soit 12 000 €", fs), y=0.75)
        d2 = self.ligne(self.t("pour dix vélos de plus,", 30, GREY_A), y=0.2)
        self.au_mot("soit 12 000")
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("pour dix")
        self.play(FadeIn(d2, shift=UP * 0.1), run_time=0.3)
        e = self.ligne(self.t("1 200 € par vélo", fs, VERT_OK), y=-0.55)
        cad = SurroundingRectangle(e, color=VERT_OK, buff=0.14, stroke_width=3)
        l1200 = self.t("1 200 €", 28, VERT_OK).next_to(l40, DOWN, buff=0.1)
        self.au_mot("1 200")
        self.play(FadeIn(e, scale=1.2), Create(cad), FadeIn(l1200, scale=1.3), run_time=0.45)
        self.insister(VGroup(e, cad), 1.08)
        self.au_mot("Avant 40")
        f1 = Arrow(b[0].get_top() + UP * 0.25, b[3].get_top() + UP * 0.25 + LEFT * 0.1, buff=0,
                   color=CONCAVE, stroke_width=5)
        g1 = self.ligne(self.t("avant 40 vélos :", 30, CONCAVE), self.t("il baisse", 30, CONCAVE), y=-1.45)
        self.play(FadeIn(g1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("baisse")
        self.play(GrowArrow(f1), FadeIn(g1[1], shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("après")
        f2 = Arrow(b[5].get_top() + UP * 0.25 + RIGHT * 0.1, b[9].get_top() + UP * 0.3, buff=0,
                   color=CONVEXE, stroke_width=5)
        g2 = self.ligne(self.t("après :", 30, CONVEXE), self.t("il remonte", 30, CONVEXE), y=-2.0)
        self.play(FadeIn(g2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("remonte")
        self.play(GrowArrow(f2), FadeIn(g2[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08b : le piège ─────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-piege")
        tete = VGroup(Triangle(fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).scale(0.22),
                      self.t("Voilà le piège !", 44, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25)
        tete.move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        gh = self.graphe_C((-5.9, 0.35), (0.4, 2.65))
        gb = self.graphe_Cp((-5.9, -3.2), (0.4, -0.35))
        rh = self.repere(gh, ny="coût total C")
        rb = self.repere(gb, ny="coût marginal C'")
        ch = gh.deux_parties(C, 0, 4, 10, sw=5)
        cb = gb.courbe(Cp, 0, 10, WHITE, 5)
        self.au_mot("Voilà le piège")
        self.play(FadeIn(tete, shift=DOWN * 0.15), FadeIn(rh), FadeIn(ch), FadeIn(rb), FadeIn(cb), run_time=0.5)
        xl = 1.0
        r1 = self.ligne(self.t("Le point d'inflexion n'est pas", 32), y=2.45, xl=xl)
        r2 = VGroup(self.t("là où le coût total", 32, ROUGE_ERREUR), self.t("est le plus bas.", 32, ROUGE_ERREUR))
        r2.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(r2, 1.7, xl)
        I = Dot(gh.G(4, C(4)), radius=0.11, color=JAUNE_TITRE)
        self.au_mot("Le point d'inflexion")
        self.play(FadeIn(r1, shift=UP * 0.1), FadeIn(I, scale=2.5), run_time=0.4)
        self.au_mot("là où")
        croix = VGroup(Line(UL, DR), Line(UR, DL)).set_stroke(ROUGE_ERREUR, 6).scale(0.18)
        croix.next_to(I, UL, buff=0.05)
        self.play(FadeIn(r2, shift=UP * 0.1), Create(croix), run_time=0.4)
        self.au_mot("monte tout le temps")
        r3 = VGroup(self.t("Le coût total", 32), self.t("monte tout le temps.", 32)).arrange(DOWN, aligned_edge=LEFT,
                                                                                         buff=0.12)
        self.col(r3, 0.55, xl)
        fl = Arrow(gh.G(1.0, 140), gh.G(8.2, 400), buff=0, color=WHITE, stroke_width=4)
        self.play(FadeIn(r3, shift=UP * 0.1), GrowArrow(fl), run_time=0.6)
        self.au_mot("C'est le coût")
        r4 = self.ligne(self.t("C'est le coût d'un vélo en plus", 32, VERT_OK), y=-0.55, xl=xl)
        r5 = self.ligne(self.t("qui est le plus bas.", 32, VERT_OK), y=-1.05, xl=xl)
        mn = Dot(gb.G(4, Cp(4)), radius=0.12, color=VERT_OK)
        lien = DashedLine(gh.G(4, C(4)), gb.G(4, Cp(4)), color=JAUNE_TITRE, stroke_width=3)
        self.play(FadeIn(r4, shift=UP * 0.1), Create(lien), run_time=0.5)
        self.au_mot("qui est le plus bas")
        self.play(FadeIn(r5, shift=UP * 0.1), FadeIn(mn, scale=2.5), cb.animate.set_color(GREY_B), run_time=0.4)
        self.play(Flash(mn, color=VERT_OK, line_length=0.25), Indicate(r5, color=VERT_OK), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        t0 = self.renderer.time
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.5), self.t("À toi de jouer !", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3)
        tete.to_edge(UP, buff=0.55)
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.45)
        imp = imprimante3d(1.5).move_to(P(-4.4, 0.7))
        limp = self.t("une imprimerie 3D", 32, VIOLET_ACCENT).next_to(imp, DOWN, buff=0.25)
        piece = imp[4]
        self.au_mot("imprimerie 3D")
        self.play(FadeIn(imp, shift=UP * 0.2), FadeIn(limp), run_time=0.5)
        self.play(piece.animate.stretch(1.25, 1, about_edge=DOWN), imp[2].animate.shift(UP * 0.08), run_time=0.5)
        fs = 46
        fx = VGroup(self.t("C(q) = q³", fs, BLEU_CALCUL), self.t("− 9q²", fs, BLEU_CALCUL),
                    self.t("+ 30q", fs, BLEU_CALCUL)).arrange(RIGHT, buff=0.2).move_to(P(1.9, 1.3))
        self.au_mot("C de q")
        self.play(FadeIn(fx[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("moins 9")
        self.play(FadeIn(fx[1], scale=1.2), run_time=0.3)
        self.au_mot("plus 30")
        self.play(FadeIn(fx[2], scale=1.2), run_time=0.3)
        cad = SurroundingRectangle(fx, color=BLEU_CALCUL, buff=0.22, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        c1 = self.t("Trouve le point d'inflexion,", 36).move_to(P(1.9, 0.0))
        c2 = self.t("et le coût marginal le plus bas.", 36).move_to(P(1.9, -0.6))
        self.au_mot("Trouve")
        self.play(FadeIn(c1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("et le coût")
        self.play(FadeIn(c2, shift=UP * 0.1), run_time=0.35)
        pause = VGroup(pastille_pause(0.42), self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE))
        pause.arrange(RIGHT, buff=0.25).move_to(P(-0.9, -2.2))
        rebours = CompteARebours(5, r=0.38, fs=34).next_to(pause, RIGHT, buff=0.45)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION 09-defi t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f})", flush=True)
        self.wait(0.4)

    # ── 09b : la correction ────────────────────────────────────────────────

    def montrer(self, ligne, mots):
        """Chaque morceau de la ligne à SON mot (mot = texte, (texte, n) ou position)."""
        for m, w in zip(ligne, mots):
            if w is None:
                pass
            elif isinstance(w, int):
                self.au_pos(w)
            elif isinstance(w, tuple):
                self.au_mot(*w)
            else:
                self.au_mot(w)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.25)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        v = self._texte_voix
        self.au_mot("Correction")
        tit = self.t("Correction", 44, VERT_OK).move_to(P(0, 3.25)).align_to(P(-6.2, 0), LEFT)
        gh = Graphe((0, 6.6), (0, 90), (2.2, 0.45), (5.6, 2.95))  # 5,6 : le « q » ne touche pas Ti-Margo
        gb = Graphe((0, 6.6), (0, 40), (2.2, -1.95), (5.6, -0.15))
        rh = self.repere(gh, ny="C", fs=24)
        rb = self.repere(gb, ny="C'", fs=24)
        self.play(Write(tit), FadeIn(rh), FadeIn(rb), run_time=0.5)
        fs = 32
        x = -6.2
        a = self.lg(self.t("C'(q) =", fs, BLEU_CALCUL), self.t("3q²", fs), self.t("− 18q", fs), self.t("+ 30", fs),
                    y=2.35, x=x)
        self.montrer(a, ["C prime de q", "3 q", "moins 18", "plus 30"])
        b = self.lg(self.t("C''(q) =", fs, VERT_OK), self.t("6q", fs, VERT_OK), self.t("− 18", fs, VERT_OK),
                    y=1.65, x=x)
        self.montrer(b, ["C seconde", "6 q", ("moins 18", 2)])
        c = self.lg(self.t("s'annule en", fs), self.t("3", fs + 2, JAUNE_TITRE), y=0.95, x=x)
        self.montrer(c, ["elle s'annule", "3 en"])
        sg = self.mini_signes(c.get_right()[0] + 0.45, 0.95, 30)
        cbas = gh.deux_parties(D, 0, 3, 6.3, sw=5)
        self.au_mot("en changeant")
        self.play(FadeIn(sg), Create(cbas), run_time=0.7)
        d = self.lg(self.t("C(3) =", fs), self.t("27", fs), self.t("− 81", fs), self.t("+ 90", fs),
                    self.t("= 36", fs, VERT_OK), y=0.2, x=x)
        self.montrer(d, ["C de 3", "27", "81", "90", "36"])
        e = self.lg(self.t("I(3 ; 36)", fs + 6, JAUNE_TITRE), y=-0.6, x=x + 0.1)
        cad = SurroundingRectangle(e, color=JAUNE_TITRE, buff=0.13, stroke_width=3)
        I = Dot(gh.G(3, D(3)), radius=0.11, color=JAUNE_TITRE)
        lI = self.t("I", 30, JAUNE_TITRE).next_to(I, UL, buff=0.06)
        self.au_mot("Le point d'inflexion")
        self.play(FadeIn(I, scale=2.5), FadeIn(lI), run_time=0.35)
        self.au_mot("3 et 36")
        self.play(FadeIn(e, scale=1.2), Create(cad), run_time=0.4)
        f = self.lg(self.t("C'(3) =", fs, BLEU_CALCUL), self.t("27", fs), self.t("− 54", fs), self.t("+ 30", fs),
                    self.t("= 3", fs + 4, VERT_OK), y=-1.45, x=x)
        f[-1].shift(RIGHT * 0.2)  # le cadre de « = 3 » ne colle pas au « 30 »
        lf = self.lg(self.t("le coût marginal le plus bas", 30, VERT_OK), y=-2.1, x=x)
        self.au_mot("Et le coût marginal")
        cp = gb.courbe(Dp, 0, 6.3, WHITE, 5)
        self.play(FadeIn(lf, shift=UP * 0.1), Create(cp), run_time=0.7)
        i27 = v.find("27", v.find("C prime de 3"))
        self.montrer(f, ["C prime de 3", i27, "54", ("plus 30", 2), v.rfind("3")])
        mn = Dot(gb.G(3, Dp(3)), radius=0.11, color=VERT_OK)
        lien = DashedLine(gh.G(3, D(3)), gb.G(3, Dp(3)), color=JAUNE_TITRE, stroke_width=3)
        cad2 = SurroundingRectangle(f[-1], color=VERT_OK, buff=0.1, stroke_width=3)
        self.play(FadeIn(mn, scale=2.5), Create(lien), Create(cad2), run_time=0.5)
        self.play(Flash(mn, color=VERT_OK, line_length=0.2), run_time=0.5)
        self.attendre_voix(marge=0.7)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 38
        b1a = self.t("Dans un exercice de bac :", fs)
        etapes = [self.t("C''", fs, VERT_OK), self.t("son signe", fs), self.t("la convexité", fs, CONVEXE),
                  self.t("le point d'inflexion", fs, JAUNE_TITRE)]
        fleches = [self.t("→", fs, GREY_A) for _ in range(3)]
        chaine = VGroup(etapes[0], fleches[0], etapes[1], fleches[1], etapes[2], fleches[2], etapes[3])
        chaine.arrange(RIGHT, buff=0.2)
        b1 = VGroup(b1a, chaine).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        b2a = VGroup(self.t("En économie :", fs), self.t("le point d'inflexion du coût total,", fs)).arrange(RIGHT, buff=0.2)
        b2b = self.t("c'est là où le coût marginal est le plus bas.", fs, VERT_OK)
        b2 = VGroup(b2a, b2b).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in (b1, b2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.75)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.3, 0.45))
        self.au_mot("Dans un exercice")
        self.play(Create(lignes[0][0]), FadeIn(b1a, shift=RIGHT * 0.2), run_time=0.45)
        mots = ["C seconde", "son signe", "la convexité", "puis le point"]
        for k, mot in enumerate(mots):
            self.au_mot(mot)
            anims = [FadeIn(etapes[k], shift=RIGHT * 0.15)] + ([FadeIn(fleches[k - 1])] if k else [])
            self.play(*anims, run_time=0.3)
        self.au_mot("Et en économie")
        self.play(Create(lignes[1][0]), FadeIn(b2a[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("le point d'inflexion du")
        self.play(FadeIn(b2a[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est là où")
        self.play(FadeIn(b2b, shift=RIGHT * 0.2), run_time=0.45)
        self.attendre_voix(marge=0.8)

    # ── 11 : la fin (règle du 19/10, comme les modèles) ────────────────────

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
        self.ecran_enonce()
        self.ecran_derivees()
        self.ecran_question1()
        self.ecran_convexite()
        self.ecran_inflexion()
        self.ecran_question2()
        self.ecran_interpreter()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class ConvexiteDefiTerminale(ConvexiteDefiBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "bleue"
