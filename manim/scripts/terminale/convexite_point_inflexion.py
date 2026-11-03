# convexite_point_inflexion.py
# EleveAI — Maths Tle spé — paysage « Point d'inflexion » (16:9), ceinture VERTE.
# Micro du coach : convexite_point_inflexion (banque terminale-spe/maths/
# convexite.bank.ts). Short jumeau : convexite_point_inflexion_short.py.
#
# Clé de voix → écran :
#   · 00-garde       : page de garde, l'échelle ENTIÈRE des ceintures (verte) ;
#   · 01-situation   : Inès, chargée de promotion dans un label de musique : la
#                      courbe en S des écoutes cumulées (creux bleu, bosse
#                      orange) et, dessous, les barres des écoutes du jour ;
#   · 02-definition  : le point d'inflexion I, aligné sur la plus haute barre ;
#   · 03-tangente    : la tangente glisse et TRAVERSE la courbe en I ;
#   · 04-methode     : f et f'' l'une sous l'autre : f'' s'annule en changeant
#                      de signe (− orange, + bleu) ;
#   · 05-appliquer   : x³ − 3x², f'' = 6x − 6, tableau de signes, I(1 ; −2) ;
#   · 06/06b         : question-pause n° 1 (f'' = 6x − 12 → B : 2) ;
#   · 07-piege       : x⁴, f'' = 12x² ≥ 0 : la tangente glisse, jamais traversée ;
#   · 08/08b         : question-pause n° 2 (12x² en 0 → B : non) ;
#   · 09/09b         : défi x³ − 6x² + 5 → I(2 ; −11), corrigé ;
#   · 10-finale      : « Ce que tu as appris », titre en haut et centré ;
#   · 11-abonne      : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
# Code couleur (paysage ET short) : bleu = convexe / creux / f'' ≥ 0, orange =
# concave / bosse / f'' ≤ 0, vert = résultat juste, rouge = piège, violet = la
# tangente, jaune = le point d'inflexion.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : convexite_point_inflexion_marques.json).
#
# Voix : manim/voix/terminale-convexite-point-inflexion.json (débit −6).
# AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/terminale/convexite_point_inflexion.py ConvexitePointInflexionTerminale
# python -m manim render -qh --disable_caching manim/scripts/terminale/convexite_point_inflexion.py ConvexitePointInflexionTerminale -o eleveai-maths-terminale-convexite-point-inflexion --media_dir manim/scripts/terminale/media-convexite-point-inflexion
# Sortie : manim/sorties/terminale/maths/analyse/convexite-point-inflexion/

import math
import os
import re
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import Tableau, echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402


def f1(x):
    return x ** 3 - 3 * x ** 2


def f3(x):
    return x ** 3 - 6 * x ** 2 + 5


# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert f1(1) == -2 and 1 - 3 == -2 and 6 * 1 - 6 == 0
assert all(6 * x - 6 < 0 for x in (-5, 0, 0.9)) and all(6 * x - 6 > 0 for x in (1.1, 3))
assert 6 * 2 - 12 == 0 and all(6 * x - 12 < 0 for x in (0, 1.9)) and all(6 * x - 12 > 0 for x in (2.1, 5))
assert all(12 * x ** 2 > 0 for x in (-1, -0.1, 0.1, 1))     # x⁴ : + | + autour de 0
assert f3(2) == -11 and 8 - 24 + 5 == -11

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6  # la colonne de droite (marge de 3 % : 0,43 du bord)
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
TANGENTE = VIOLET_ACCENT
POINT_I = JAUNE_TITRE
PEAU = "#8d5524"


def ecoutes(t):
    """Les écoutes cumulées (sur 1), jour t de 0 à 20 ; inflexion au jour 10."""
    return 1 / (1 + math.exp(-(t - 10) / 2.5))


def du_jour(t):
    """Les écoutes du jour : la dérivée de la courbe en S (pic au jour 10)."""
    c = ecoutes(t)
    return c * (1 - c) / 2.5


assert max(range(1, 21), key=du_jour) == 10


class Graphe:
    """Un repère : [xa ; xb] × [ya ; yb] posé dans le rectangle (X0, Y0)-(X1, Y1)."""

    def __init__(self, xr, yr, bg, hd):
        (self.xa, self.xb), (self.ya, self.yb) = xr, yr
        (self.X0, self.Y0), (self.X1, self.Y1) = bg, hd

    def G(self, x, y):
        return P(self.X0 + (x - self.xa) / (self.xb - self.xa) * (self.X1 - self.X0),
                 self.Y0 + (y - self.ya) / (self.yb - self.ya) * (self.Y1 - self.Y0))

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

    def droite(self, m, x0, y0, a, b, color=TANGENTE, sw=4):
        return Line(self.G(a, y0 + m * (a - x0)), self.G(b, y0 + m * (b - x0)), color=color, stroke_width=sw)

    def tangente(self, x0, y0, m, L=2.4, color=TANGENTE, sw=5):
        """La tangente en (x0, y0), de pente m, longueur L À L'ÉCRAN (centrée)."""
        a, b = self.G(x0, y0), self.G(x0 + 1, y0 + m)
        d = (b - a) / np.linalg.norm(b - a)
        return Line(a - d * L / 2, a + d * L / 2, color=color, stroke_width=sw)

    def entre(self, f, m, x0, y0, a, b, color, op=0.35, n=60):
        """La zone entre la courbe et la tangente (x0, y0) de pente m, sur [a ; b]."""
        haut = [self.G(x, f(x)) for x in np.linspace(a, b, n)]
        bas = [self.G(x, y0 + m * (x - x0)) for x in np.linspace(b, a, n)]
        return Polygon(*haut, *bas, stroke_width=0, fill_color=color, fill_opacity=op)


def bol(r=0.28, color=CONVEXE, sw=5):
    return Arc(radius=r, start_angle=PI, angle=PI, stroke_color=color, stroke_width=sw)


def dome(r=0.28, color=CONCAVE, sw=5):
    return Arc(radius=r, start_angle=0, angle=PI, stroke_color=color, stroke_width=sw)


def note_musique(s=1.0, color=JAUNE_TITRE):
    """Une croche dessinée : tête ovale, hampe, crochet."""
    tete = Ellipse(width=0.34, height=0.24, fill_color=color, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(tete.get_right() + LEFT * 0.03, tete.get_right() + LEFT * 0.03 + UP * 0.8, color=color,
                 stroke_width=5)
    crochet = CubicBezier(hampe.get_end(), hampe.get_end() + P(0.12, -0.12), hampe.get_end() + P(0.32, -0.2),
                          hampe.get_end() + P(0.22, -0.5), stroke_color=color, stroke_width=5)
    return VGroup(tete, hampe, crochet).scale(s)


def disque(s=1.0):
    """Un vinyle : disque noir, sillons gris, étiquette jaune."""
    d = Circle(radius=0.5, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    sillons = VGroup(*[Circle(radius=r, stroke_color=GREY_D, stroke_width=1.5) for r in (0.42, 0.34, 0.27)])
    eti = Circle(radius=0.16, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    trou = Dot(radius=0.03, color=BLACK)
    return VGroup(d, sillons, eti, trou).scale(s)


def ines(s=1.0):
    """Inès, chargée de promotion : tête, cheveux, casque audio, veste."""
    corps = RoundedRectangle(width=1.05, height=1.2, corner_radius=0.32, fill_color=VIOLET_ACCENT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.0))
    cheveux = Circle(radius=0.4, fill_color="#1f130a", fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    nuque = RoundedRectangle(width=0.8, height=0.55, corner_radius=0.2, fill_color="#1f130a", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.72))
    tete = Circle(radius=0.31, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.93))
    frange = Arc(radius=0.33, start_angle=0.35, angle=PI - 0.7, stroke_color="#1f130a", stroke_width=9)
    frange.move_to(tete.get_top() + DOWN * 0.07)
    arceau = Arc(radius=0.43, start_angle=0.1, angle=PI - 0.2, stroke_color=GREY_A, stroke_width=7).move_to(P(0, 1.2))
    ecouteurs = VGroup(*[RoundedRectangle(width=0.16, height=0.3, corner_radius=0.06, fill_color=BLEU_CALCUL,
                                          fill_opacity=1, stroke_width=0).move_to(P(dx, 0.92)) for dx in (-0.4, 0.4)])
    return VGroup(corps, nuque, cheveux, tete, frange, arceau, ecouteurs).scale(s)


class ConvexitePointInflexionBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = "convexite_point_inflexion_marques.json"
    nom_voix = "terminale-convexite-point-inflexion"
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

    def lg(self, *morceaux, y, x=-6.2, buff=0.15):
        """Une ligne de calcul à gauche, alignée sur x."""
        return VGroup(*morceaux).arrange(RIGHT, buff=buff).move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def insister(self, mob, k=1.35, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def sans_audit(self, mob):
        """Les données d'une figure qu'on LIT (graduations, signes) : pas d'audit."""
        for f in mob.get_family():
            f._pas_audit = True
        return mob

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

    def au_fin(self, extrait, n=1):
        """Attend le DERNIER nombre de l'extrait (« 6 x moins 12 » : le 12)."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        m = list(re.finditer(r"\d+(?:,\d+)?", extrait))[-1]
        self.au_pos(i + m.start())

    def _bords(self):
        super()._bords()
        margo = getattr(self, "_margo", None)
        if margo is None or margo not in self.mobjects:
            return
        for m in self.mobjects:
            if m is margo or m.width == 0 or m.width > 9:
                continue
            g, d, b, h = m.get_left()[0], m.get_right()[0], m.get_bottom()[1], m.get_top()[1]
            if d > margo.get_left()[0] - 0.05 and b < margo.get_top()[1] + 0.05:
                print(f"MARGO {self._cle_voix} t={self.renderer.time:.1f} {type(m).__name__} "
                      f"[{g:.2f}, {d:.2f}] × [{b:.2f}, {h:.2f}]", flush=True)

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

    def q_tete(self, question, choix, larg_carte=4.1):
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
        cartes = VGroup(*[self.carte_choix(l, c, larg_carte) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        # sur deux lignes, à taille normale : à côté de Ti-Margo, une seule ligne
        # serait rétrécie à ~18 pt par col()
        pause = VGroup(self.t("Mets pause,", 32, ORANGE_RETENUE), self.t("et choisis !", 32, ORANGE_RETENUE))
        pause.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(pause, 0)
        pause.align_to(P(0, cartes.get_bottom()[1] - 0.22), UP)
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

    def croix(self, mob, color=ROUGE_ERREUR, sw=5):
        """Une croix rouge DESSINÉE sur un objet (une carte fausse)."""
        c = mob.get_center()
        r = min(mob.height, 0.5) / 2
        return VGroup(Line(c + P(-r, -r), c + P(r, r), color=color, stroke_width=sw),
                      Line(c + P(-r, r), c + P(r, -r), color=color, stroke_width=sw))

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Point d'inflexion", 60, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Point d'inflexion")
        self.play(Write(titre), run_time=0.8)
        g = Graphe((0, 20), (0, 1), (-3.4, -1.4), (1.6, 0.9))
        gauche = g.courbe(ecoutes, 0, 10, CONVEXE, 6)
        droite = g.courbe(ecoutes, 10, 20, CONCAVE, 6)
        pi = Dot(g.G(10, 0.5), radius=0.1, color=POINT_I)
        n1 = note_musique(0.9).move_to(P(-4.6, -0.1))
        n2 = note_musique(0.7, BLEU_CALCUL).move_to(P(2.9, -0.3))
        chanson = self.t("Une chanson qui buzze :", 34, GREY_A).next_to(titre, DOWN, buff=0.28)
        self.au_mot("Une chanson")
        self.play(FadeIn(chanson, shift=UP * 0.15), FadeIn(n1, shift=UP * 0.3), Create(gauche), run_time=0.8)
        self.au_mot("qui buzze")
        self.play(FadeIn(n2, shift=UP * 0.3), Create(droite), run_time=0.7)
        q = self.t("à quel moment le buzz commence-t-il à ralentir ?", 36, BLEU_CALCUL, larg=12.4)
        q.next_to(chanson, DOWN, buff=0.18)
        self.au_mot("à quel moment")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("ralentir")
        self.play(FadeIn(pi, scale=2.5), Flash(pi, color=POINT_I, line_length=0.2), run_time=0.6)
        ident = self.t(self.identite, 26, GREY_A).next_to(q, DOWN, buff=0.15)
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 → 02 : Inès, les écoutes de la chanson ─────────────────────────

    def ecrans_ines(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        # Inès et son métier (colonne de droite)
        perso = ines(1.0).move_to(P(3.2, 2.2))
        nom = self.t("Inès", 38, JAUNE_TITRE).next_to(perso, RIGHT, buff=0.35).shift(UP * 0.35)
        self.au_mot("Voici Inès")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=LEFT * 0.15), run_time=0.5)
        met1 = self.t("chargée de promotion", 32, WHITE)
        met2 = VGroup(self.t("label de musique", 32, WHITE), disque(0.55)).arrange(RIGHT, buff=0.2)
        self.col(met1, 0.95)
        self.col(met2, 0.3)
        self.au_mot("chargée de promotion")
        self.play(FadeIn(met1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("label de musique")
        self.play(FadeIn(met2[0], shift=UP * 0.1), FadeIn(met2[1], scale=0.5), run_time=0.4)
        self.play(Rotate(met2[1], -PI), run_time=0.6)
        # les deux repères, alignés : écoutes cumulées en haut, du jour en bas
        gh = Graphe((0, 21), (0, 1.12), (-6.2, 0.45), (1.3, 3.2))
        gb = Graphe((0, 21), (0, 0.112), (-6.2, -2.95), (1.3, -0.55))
        axh, axb = gh.axes(), gb.axes()
        lh = self.t("écoutes cumulées", 26, GREY_A).next_to(gh.G(0, 1.12), RIGHT, buff=0.15)
        lb = self.t("écoutes du jour", 26, GREY_A).next_to(gb.G(0, 0.112), RIGHT, buff=0.15)
        jh = self.t("jours", 24, GREY_A).next_to(gh.G(21, 0), UP, buff=0.1).align_to(gh.G(21, 0), RIGHT)
        jb = self.t("jours", 24, GREY_A).next_to(gb.G(21, 0), DOWN, buff=0.1).align_to(gb.G(21, 0), RIGHT)  # sous l'axe : pas sur les barres
        self.au_mot("Elle suit les écoutes")
        self.play(Create(axh), Create(axb), FadeIn(lh), FadeIn(lb), run_time=0.6)
        self.au_mot("jour après jour")
        self.play(FadeIn(jh), FadeIn(jb), run_time=0.3)
        lw = (gb.X1 - gb.X0) / 21 * 0.7
        barres = VGroup(*[Rectangle(width=lw, height=max(0.01, gb.G(0, du_jour(k))[1] - gb.Y0), stroke_width=0,
                                    fill_color=CONVEXE if k <= 10 else CONCAVE, fill_opacity=0.9)
                          .move_to(gb.G(k, 0), DOWN) for k in range(1, 21)])
        creux = gh.courbe(ecoutes, 0, 10, CONVEXE, 6)
        bosse = gh.courbe(ecoutes, 10, 20, CONCAVE, 6)
        self.au_mot("Au début")
        self.play(Create(creux, rate_func=linear),
                  LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres[:10]], lag_ratio=0.5), run_time=2.6)
        self.au_mot("la courbe se creuse")
        lc = VGroup(bol(0.24), self.t("se creuse", 32, CONVEXE)).arrange(RIGHT, buff=0.15)
        lc.move_to(gh.G(4.6, 0.5))  # le bol ne touche pas l'axe
        self.play(FadeIn(lc, shift=UP * 0.1), Indicate(creux, color=CONVEXE, scale_factor=1.04), run_time=0.6)
        self.au_mot("Puis les écoutes")
        self.play(Create(bosse, rate_func=linear),
                  LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres[10:]], lag_ratio=0.5), run_time=2.6)
        self.au_mot("la courbe se bombe")
        lbo = VGroup(dome(0.24), self.t("se bombe", 32, CONCAVE)).arrange(RIGHT, buff=0.15)
        lbo.move_to(gh.G(17.5, 0.62))
        self.play(FadeIn(lbo, shift=UP * 0.1), Indicate(bosse, color=CONCAVE, scale_factor=1.04), run_time=0.6)
        self.attendre_voix(marge=0.4)

        # ── 02 : le point d'inflexion, aligné sur la plus haute barre ──
        self.dire("02-definition")
        self.au_mot("passe du creux")
        self.play(Indicate(lc, scale_factor=1.25), run_time=0.45)
        self.au_mot("à la bosse")
        self.play(Indicate(lbo, scale_factor=1.25), run_time=0.45)
        I = Dot(gh.G(10, 0.5), radius=0.12, color=POINT_I)
        self.au_mot("point d'inflexion")
        lpi = self.t("point d'inflexion", 30, POINT_I).next_to(I, DR, buff=0.15)  # sous la bosse, loin de « se creuse »
        pi2 = self.col(self.t("point d'inflexion", 38, POINT_I), -0.45)
        self.play(FadeIn(I, scale=2.5), FadeIn(lpi), FadeOut(VGroup(met1, met2)), FadeIn(pi2, shift=UP * 0.1),
                  run_time=0.5)
        self.play(Flash(I, color=POINT_I, line_length=0.25), run_time=0.5)
        self.au_mot("le jour où")
        pic = barres[9]
        vert = DashedLine(gh.G(10, 0.5), pic.get_top(), color=POINT_I, stroke_width=3)
        self.play(Create(vert), pic.animate.set_fill(POINT_I), run_time=0.6)
        self.au_mot("le plus d'écoutes nouvelles")
        lp = self.col(VGroup(self.t("le plus d'écoutes", 32), self.t("nouvelles", 32))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.35)
        self.play(FadeIn(lp, shift=UP * 0.1), run_time=0.4)
        self.insister(pic, 1.25)
        self.au_mot("Juste après")
        self.play(LaggedStart(*[Indicate(b, color=CONCAVE, scale_factor=1.15) for b in barres[10:15]],
                              lag_ratio=0.25), run_time=1.0)
        self.au_mot("le buzz ralentit")
        lr = self.col(self.t("le buzz ralentit", 34, CONCAVE), -2.25)
        self.play(FadeIn(lr, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 03 : la courbe traverse sa tangente ────────────────────────────────

    def ecran_tangente(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tangente")
        g = Graphe((0, 20.5), (-0.05, 1.12), (-6.2, -2.7), (1.6, 3.0))
        ax = g.axes()
        creux = g.courbe(ecoutes, 0, 10, CONVEXE, 6)
        bosse = g.courbe(ecoutes, 10, 20, CONCAVE, 6)
        I = Dot(g.G(10, 0.5), radius=0.12, color=POINT_I)
        self.add(ax, creux, bosse, I)
        self.play(FadeIn(VGroup(ax, creux, bosse, I)), run_time=0.3)
        u = ValueTracker(4.0)

        def tg():
            x0 = u.get_value()
            return g.tangente(x0, ecoutes(x0), du_jour(x0), 3.0)

        tangente = always_redraw(tg)
        contact = always_redraw(lambda: Dot(g.G(u.get_value(), ecoutes(u.get_value())), radius=0.08, color=WHITE))
        self.play(Create(tangente), FadeIn(contact), run_time=0.5)
        self.au_mot("il se passe")
        self.play(u.animate.set_value(10), run_time=2.2, rate_func=rate_functions.ease_in_out_sine)
        tangente.clear_updaters()
        contact.clear_updaters()
        self.au_mot("la courbe traverse")
        lt2 = self.col(VGroup(self.t("la courbe traverse", 30, POINT_I), self.t("sa tangente", 30, POINT_I))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.5)
        self.play(FadeIn(lt2[0], shift=UP * 0.1), Flash(I, color=POINT_I, line_length=0.3), run_time=0.4)
        self.au_mot("sa tangente")
        ntg = self.t("tangente", 30, TANGENTE).next_to(g.G(14.2, 0.5 + du_jour(10) * 4.2), UP, buff=0.12).shift(LEFT * 0.5)
        self.play(FadeIn(lt2[1], shift=UP * 0.1), FadeIn(ntg, shift=LEFT * 0.1), run_time=0.4)
        self.insister(lt2, 1.12)
        m, y0 = du_jour(10), 0.5
        z_bas = g.entre(ecoutes, m, 10, y0, 10, 14.2, CONCAVE)
        z_haut = g.entre(ecoutes, m, 10, y0, 5.8, 10, CONVEXE)
        self.au_mot("au-dessous")
        l_bas = self.col(VGroup(self.t("d'un côté :", 32), self.t("au-dessous", 34, CONCAVE)).arrange(RIGHT, buff=0.15),
                         0.25)
        self.play(FadeIn(z_bas), FadeIn(l_bas, shift=UP * 0.1), run_time=0.5)
        self.au_mot("au-dessus")
        l_haut = self.col(VGroup(self.t("de l'autre :", 32), self.t("au-dessus", 34, CONVEXE)).arrange(RIGHT, buff=0.15),
                          -0.45)
        self.play(FadeIn(z_haut), FadeIn(l_haut, shift=UP * 0.1), run_time=0.5)
        self.play(Indicate(VGroup(z_bas, z_haut), scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 04 : la méthode : f'' s'annule en changeant de signe ───────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        cube = lambda x: x ** 3  # noqa: E731
        gf = Graphe((-1.35, 1.35), (-2.5, 2.5), (-6.0, 0.55), (-0.6, 3.2))
        gs = Graphe((-1.35, 1.35), (-8.5, 8.5), (-6.0, -3.0), (-0.6, -0.35))
        axf, axs = gf.axes(), gs.axes()
        cf_g = gf.courbe(cube, -1.33, 0, WHITE, 6)
        cf_d = gf.courbe(cube, 0, 1.33, WHITE, 6)
        nf = self.t("f", 34).next_to(gf.G(1.33, 2.35), LEFT, buff=0.15)
        self.au_mot("Pour le trouver")
        self.play(Create(axf), run_time=0.3)
        self.play(Create(cf_g), Create(cf_d), FadeIn(nf), run_time=0.7)
        self.au_mot("par le calcul")
        pc = self.col(self.t("Par le calcul :", 38, JAUNE_TITRE), 2.6)
        self.play(FadeIn(pc, shift=UP * 0.1), run_time=0.4)
        self.au_mot("on regarde f seconde")
        s_g = gs.courbe(lambda x: 6 * x, -1.33, 0, WHITE, 6)
        s_d = gs.courbe(lambda x: 6 * x, 0, 1.33, WHITE, 6)
        ns = self.t("f''", 34).next_to(gs.G(1.33, 8.0), LEFT, buff=0.15)
        r1 = self.col(self.t("on regarde f''", 32), 1.85)
        self.play(Create(axs), FadeIn(r1, shift=UP * 0.1), run_time=0.4)
        self.play(Create(s_g), Create(s_d), FadeIn(ns), run_time=0.7)
        self.au_mot("Un point d'inflexion")
        I = Dot(gf.G(0, 0), radius=0.11, color=POINT_I)
        r2 = self.col(self.t("Point d'inflexion :", 34, POINT_I), 0.85, xl=1.9)
        self.play(FadeIn(I, scale=2.5), FadeIn(r2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("s'annule")
        z = Dot(gs.G(0, 0), radius=0.11, color=POINT_I)
        vert = DashedLine(gf.G(0, 0), gs.G(0, 0), color=POINT_I, stroke_width=3)
        r3 = self.col(self.t("f'' s'annule", 32), 0.15, xl=1.9)
        self.play(FadeIn(z, scale=2.5), Create(vert), FadeIn(r3, shift=UP * 0.1), run_time=0.45)
        self.au_mot("en changeant de signe")
        moins = self.sans_audit(self.t("−", 56, CONCAVE)).move_to(gs.G(-0.75, -1.8))
        plus = self.sans_audit(self.t("+", 56, CONVEXE)).move_to(gs.G(0.75, 1.8))
        r4 = self.col(self.t("en changeant de signe", 30), -0.55, xl=1.9)
        self.play(FadeIn(moins, scale=1.5), FadeIn(plus, scale=1.5), FadeIn(r4, shift=UP * 0.1),
                  s_g.animate.set_color(CONCAVE), s_d.animate.set_color(CONVEXE),
                  cf_g.animate.set_color(CONCAVE), cf_d.animate.set_color(CONVEXE), run_time=0.6)
        cad = SurroundingRectangle(VGroup(r2, r3, r4), color=POINT_I, buff=0.12, stroke_width=3, corner_radius=0.12)
        self.play(Create(cad), run_time=0.4)
        self.play(Indicate(VGroup(r2, r3, r4), color=POINT_I, scale_factor=1.04), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 05 : l'exemple x³ − 3x² et son point d'inflexion I(1 ; −2) ────────

    def tab_signes(self, valeurs, centre_x, y_haut, signes, fs=30):
        """Le tableau de signe de f'' : la ligne x et la ligne f''(x)."""
        tab = Tableau(valeurs, centre_x=centre_x, y_haut=y_haut, larg_lab=1.6, pas=1.6, h=0.62, fs=fs, marge=0.45)
        lignes = VGroup(tab.ligne(0, "x"), tab.ligne(1, "f''(x)"))
        bouts = self.sans_audit(VGroup(tab.valeur(0), tab.valeur(2)))
        cases = [tab.case(1, k, s) for k, s in zip((1, 2, 3), signes)]
        cases[0].set_color(CONCAVE if signes[0] == "−" else CONVEXE)
        cases[2].set_color(CONCAVE if signes[2] == "−" else CONVEXE)
        for c in cases:
            self.sans_audit(c)
        return tab, lignes, bouts, cases

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        fs = 38
        g = Graphe((-1.0, 3.3), (-4.6, 2.0), (0.6, -1.9), (5.3, 3.1))
        ax = g.axes()
        self.play(Create(ax), run_time=0.4)
        a1 = self.lg(self.t("f(x) =", fs), self.t("x³", fs), self.t("− 3x²", fs), y=3.0)
        c_g = g.courbe(f1, -0.95, 1, WHITE, 6)
        c_d = g.courbe(f1, 1, 3.18, WHITE, 6)
        self.au_mot("f de x")
        self.play(FadeIn(a1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("x au cube")
        self.play(FadeIn(a1[1], scale=1.2), run_time=0.3)
        self.au_pos(self._texte_voix.find("3 x"))
        self.play(FadeIn(a1[2], scale=1.2), Create(c_g), run_time=0.6)
        self.play(Create(c_d), run_time=0.5)
        a2 = self.lg(self.t("f''(x) =", fs, VERT_OK), self.t("6x − 6", fs, VERT_OK), y=2.25)
        self.au_mot("f seconde")
        self.play(FadeIn(a2[0], shift=UP * 0.1), run_time=0.3)
        self.au_fin("6 x moins 6")
        self.play(FadeIn(a2[1], scale=1.2), run_time=0.3)
        a3 = self.lg(self.t("s'annule en", fs), self.t("x = 1", fs, POINT_I), y=1.5)
        self.au_mot("s'annule")
        self.play(FadeIn(a3[0], shift=UP * 0.1), run_time=0.3)
        self.au_pos(self._texte_voix.find("1."))
        self.play(FadeIn(a3[1], scale=1.3), run_time=0.3)
        tab, lignes, bouts, (moins, zero, plus) = self.tab_signes(["−∞", "1", "+∞"], -3.3, 0.95, "−0+")
        un = tab.valeur(1, POINT_I)
        self.au_pos(self._texte_voix.find("1,"))
        self.play(FadeIn(lignes), FadeIn(bouts), FadeIn(un, scale=1.4), run_time=0.4)
        self.au_mot("négative")
        self.play(FadeIn(moins, scale=1.4), c_g.animate.set_color(CONCAVE), run_time=0.35)
        self.au_mot("après 1")
        self.play(FadeIn(zero, scale=1.4), run_time=0.3)
        self.au_mot("positive")
        self.play(FadeIn(plus, scale=1.4), c_d.animate.set_color(CONVEXE), run_time=0.35)
        self.au_mot("change de signe")
        self.play(Indicate(moins, scale_factor=1.6), Indicate(plus, scale_factor=1.6), run_time=0.6)
        b1 = self.lg(self.t("f(1) =", fs), self.t("1 − 3", fs), self.t("= −2", fs, POINT_I), y=-0.85)
        self.au_pos(self._texte_voix.find("de 1") + 3)
        self.play(FadeIn(b1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 moins 3")
        self.au_pos(self._texte_voix.find("3,"))
        self.play(FadeIn(b1[1], scale=1.2), run_time=0.3)
        self.au_pos(self._texte_voix.find("2."))
        self.play(FadeIn(b1[2], scale=1.2), run_time=0.3)
        self.au_mot("Le point d'inflexion")
        I = Dot(g.G(1, -2), radius=0.12, color=POINT_I)
        self.play(FadeIn(I, scale=2.5), Flash(I, color=POINT_I, line_length=0.25), run_time=0.5)
        self.au_mot("1 et moins 2")
        b2 = self.lg(self.t("I(1 ; −2)", fs + 6, VERT_OK), y=-1.8)
        cad = SurroundingRectangle(b2, color=VERT_OK, buff=0.14, stroke_width=3)
        px = DashedLine(g.G(1, -2), g.G(1, 0), color=POINT_I, stroke_width=3)
        py = DashedLine(g.G(1, -2), g.G(0, -2), color=POINT_I, stroke_width=3)
        gx = self.t("1", 28, POINT_I).next_to(g.G(1, 0), UP, buff=0.1)
        gy = self.t("−2", 28, POINT_I).next_to(g.G(0, -2), LEFT, buff=0.1)
        li = self.t("I", 34, POINT_I).next_to(I, DR, buff=0.08)
        self.play(FadeIn(b2, scale=1.2), Create(cad), Create(px), Create(py), FadeIn(gx), FadeIn(gy), FadeIn(li),
                  run_time=0.5)
        tg = g.droite(-3, 1, -2, 0.3, 1.7, TANGENTE, 5)
        self.play(Create(tg), run_time=0.5)
        self.insister(VGroup(b2, cad), 1.15, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 06/06b : question-pause n° 1 (f'' = 6x − 12) ──────────────────────

    def mini_s(self, bg=(-6.0, 0.25), hd=(-1.2, 3.1)):
        """Une courbe en S (concave puis convexe), sans graduation : le point
        d'inflexion marqué, son abscisse inconnue."""
        g = Graphe((0.2, 3.7), (-0.3, 3.6), bg, hd)
        cube = lambda x: (x - 2) ** 3 - 1.2 * (x - 2) + 1.8  # noqa: E731
        c_g = g.courbe(cube, 0.5, 2, CONCAVE, 6)
        c_d = g.courbe(cube, 2, 3.5, CONVEXE, 6)
        I = Dot(g.G(2, 1.8), radius=0.11, color=POINT_I)
        return g, g.axes(), c_g, c_d, I

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-question")
        t0 = self.renderer.time
        l0 = VGroup(self.t("f''(x) =", 34, VERT_OK), self.t("6x − 12", 34, VERT_OK)).arrange(RIGHT, buff=0.15)
        tete, q, cartes, pause, rebours = self.q_tete(
            [l0, "Quelle est l'abscisse", "du point d'inflexion ?"], ["12", "2", "6"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g, ax, c_g, c_d, I = self.mini_s()
        # l'axe des x décalé sous la courbe : l'abscisse de I se lit dessous
        self.au_mot("f seconde")
        self.play(FadeIn(q[0][0], shift=UP * 0.1), Create(ax), run_time=0.4)
        self.au_fin("6 x moins 12")
        self.play(FadeIn(q[0][1], scale=1.2), Create(c_g), Create(c_d), run_time=0.7)
        self.au_mot("Quelle est l'abscisse")
        dx = DashedLine(I.get_center(), g.G(2, 0), color=POINT_I, stroke_width=3)
        qm = self.t("?", 44, POINT_I).next_to(g.G(2, 0), DOWN, buff=0.12)
        self.play(FadeIn(q[1], shift=UP * 0.1), FadeIn(I, scale=2.5), run_time=0.4)
        self.au_mot("du point d'inflexion")
        self.play(FadeIn(q[2], shift=UP * 0.1), Create(dx), FadeIn(qm, scale=1.5), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "06-question", t0, 1)
        # la réponse
        self.dire("06b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 36
        r1 = self.lg(self.t("6x − 12 = 0", fs), self.t("quand x = 2", fs, VERT_OK), y=-0.45)
        self.au_fin("6 x moins 12 égale 0")
        self.play(FadeIn(r1[0], shift=UP * 0.1), run_time=0.35)
        self.au_fin("x égale 2")
        deux = self.t("2", 44, VERT_OK).move_to(qm)
        self.play(FadeIn(r1[1], scale=1.2), ReplacementTransform(qm, deux), run_time=0.4)
        tab, lignes, bouts, (moins, zero, plus) = self.tab_signes(["−∞", "2", "+∞"], -3.3, -0.95, "−0+")
        self.au_mot("le signe change")
        self.play(FadeIn(lignes), FadeIn(bouts), FadeIn(tab.valeur(1, VERT_OK)), FadeIn(moins), FadeIn(zero),
                  FadeIn(plus), run_time=0.45)
        self.play(Indicate(moins, scale_factor=1.6), Indicate(plus, scale_factor=1.6), run_time=0.5)
        self.au_mot("A et C")
        xa, xc = self.croix(cartes[0][1][0]), self.croix(cartes[2][1][0])
        e1 = VGroup(self.t("A et C lisent", 30, ROUGE_ERREUR), self.t("les nombres", 30, ROUGE_ERREUR))
        e1.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(e1, 0)
        e1.align_to(P(0, cartes.get_bottom()[1] - 0.25), UP)
        self.play(Create(xa), Create(xc), FadeIn(e1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("sans résoudre")
        e2 = self.col(self.t("sans résoudre", 30, ROUGE_ERREUR), 0)
        e2.align_to(P(0, e1.get_bottom()[1] - 0.08), UP)
        self.play(FadeIn(e2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège x⁴ ───────────────────────────────────────────────────

    def x4(self, fs, color=WHITE):
        return puissance("x", "4", fs, color)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        fs = 38
        tri = Triangle(color=ROUGE_ERREUR, stroke_width=5).scale(0.28)
        ex = self.t("!", 30, ROUGE_ERREUR).move_to(tri.get_center() + DOWN * 0.04)
        tit = VGroup(VGroup(tri, ex), self.t("Voilà le piège !", 44, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25)
        tit.move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Voilà le piège")
        self.play(FadeIn(tit, shift=DOWN * 0.15), run_time=0.45)
        self.au_mot("f seconde nulle")
        p1 = self.lg(self.t("f'' nulle", fs, ROUGE_ERREUR), self.t("ne suffit pas", fs, ROUGE_ERREUR), y=2.4)
        self.play(FadeIn(p1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ne suffit pas")
        self.play(FadeIn(p1[1], scale=1.2), run_time=0.3)
        self.insister(p1, 1.1)
        g = Graphe((-1.3, 1.3), (-0.45, 2.9), (0.9, -1.9), (5.3, 3.1))
        ax = g.axes()
        quatre = lambda x: x ** 4  # noqa: E731
        c = g.courbe(quatre, -1.28, 1.28, WHITE, 6)
        a1 = self.lg(self.t("f(x) =", fs), self.x4(fs), y=1.5)
        self.au_mot("f de x")
        self.play(FadeIn(a1[0], shift=UP * 0.1), Create(ax), run_time=0.35)
        self.au_fin("puissance 4")
        self.play(FadeIn(a1[1], scale=1.2), Create(c), run_time=0.7)
        a2 = self.lg(self.t("f''(x) =", fs, VERT_OK), self.t("12x²", fs, VERT_OK), y=0.75)
        self.au_mot("f seconde de x")
        self.play(FadeIn(a2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 x au carré")
        self.play(FadeIn(a2[1], scale=1.2), run_time=0.3)
        tab, lignes, bouts, (p_g, zero, p_d) = self.tab_signes(["−∞", "0", "+∞"], -3.3, 0.2, "+0+")
        self.au_mot("s'annule en 0")
        self.au_pos(self._texte_voix.find("0,"))
        self.play(FadeIn(lignes), FadeIn(bouts), FadeIn(tab.valeur(1, POINT_I), scale=1.4), FadeIn(zero, scale=1.4),
                  run_time=0.4)
        self.au_mot("positive des deux côtés")
        self.play(FadeIn(p_g, scale=1.4), FadeIn(p_d, scale=1.4), c.animate.set_color(CONVEXE), run_time=0.45)
        self.play(Indicate(p_g, scale_factor=1.6), Indicate(p_d, scale_factor=1.6), run_time=0.5)
        # la tangente glisse : la courbe ne la traverse jamais
        u = ValueTracker(-1.0)
        tangente = always_redraw(lambda: g.tangente(u.get_value(), u.get_value() ** 4, 4 * u.get_value() ** 3, 2.0))
        self.au_mot("La courbe reste en creux")
        b1 = self.lg(bol(0.24), self.t("la courbe reste en creux", 32, CONVEXE), y=-1.5)
        self.play(FadeIn(b1, shift=UP * 0.1), Create(tangente), run_time=0.4)
        self.play(u.animate.set_value(1.0), run_time=1.3, rate_func=rate_functions.ease_in_out_sine)
        tangente.clear_updaters()
        self.au_mot("pas de point d'inflexion")
        b2 = self.lg(self.t("pas de point d'inflexion", 36, ROUGE_ERREUR), y=-2.15)
        self.play(FadeIn(b2, scale=1.2), run_time=0.4)
        self.insister(b2, 1.12)
        self.attendre_voix(marge=0.6)

    # ── 08/08b : question-pause n° 2 (12x² en 0) ──────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-question")
        t0 = self.renderer.time
        l0 = VGroup(self.t("f''(x) =", 34, VERT_OK), self.t("12x²", 34, VERT_OK)).arrange(RIGHT, buff=0.15)
        f0 = VGroup(self.t("seulement si", 32), self.t("f(0) = 0", 32)).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        tete, q, cartes, pause, rebours = self.q_tete(
            [l0, "Y a-t-il un point", "d'inflexion en 0 ?"], ["oui", "non", f0])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g = Graphe((-1.3, 1.3), (-1.5, 21), (-6.0, 0.35), (-1.2, 3.1))
        ax = g.axes()
        c = g.courbe(lambda x: 12 * x * x, -1.29, 1.29, WHITE, 6)
        nc = self.t("f''", 34).next_to(g.G(1.29, 20), LEFT, buff=0.15)
        self.au_mot("f seconde")
        self.play(FadeIn(q[0][0], shift=UP * 0.1), Create(ax), run_time=0.4)
        self.au_mot("12 x au carré")
        self.play(FadeIn(q[0][1], scale=1.2), Create(c), FadeIn(nc), run_time=0.7)
        self.au_mot("Y a-t-il")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.35)
        self.au_fin("en 0")
        z = Dot(g.G(0, 0), radius=0.11, color=POINT_I)
        self.play(FadeIn(q[2], shift=UP * 0.1), FadeIn(z, scale=2.5), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "08-question", t0, 1)
        # la réponse
        self.dire("08b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 36
        self.au_mot("ne change pas de signe")
        pg = self.sans_audit(self.t("+", 56, CONVEXE)).move_to(g.G(-0.65, 12))
        pd = self.sans_audit(self.t("+", 56, CONVEXE)).move_to(g.G(0.65, 12))
        r1 = self.lg(self.t("12x²", fs, VERT_OK), self.t("ne change pas de signe", fs), y=-0.55)
        self.play(FadeIn(r1, shift=UP * 0.1), FadeIn(pg, scale=1.5), FadeIn(pd, scale=1.5),
                  c.animate.set_color(CONVEXE), run_time=0.45)
        self.au_mot("la courbe reste convexe")
        r2 = self.lg(bol(0.24), self.t("la courbe reste convexe", fs, CONVEXE), y=-1.4)
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("sans inflexion")
        r3 = self.lg(self.t("sans inflexion", fs + 4, VERT_OK), y=-2.25)
        cad = SurroundingRectangle(r3, color=VERT_OK, buff=0.14, stroke_width=3)
        self.play(FadeIn(r3, scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(r3, cad), 1.12)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi x³ − 6x² + 5 ─────────────────────────────────────────

    def ecrans_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        fs = 36
        tit = self.t("À toi de jouer !", 46, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        g = Graphe((-1.2, 5.4), (-28, 7), (0.9, -1.9), (5.3, 3.1))
        ax = g.axes()
        c_g = g.courbe(f3, -1.15, 2, WHITE, 6)
        c_d = g.courbe(f3, 2, 5.35, WHITE, 6)
        a1 = self.lg(self.t("f(x) =", fs + 4), self.t("x³", fs + 4), self.t("− 6x²", fs + 4), self.t("+ 5", fs + 4),
                     y=2.3)
        self.au_mot("f de x")
        self.play(FadeIn(a1[0], shift=UP * 0.1), Create(ax), run_time=0.35)
        self.au_mot("x au cube")
        self.play(FadeIn(a1[1], scale=1.2), run_time=0.3)
        self.au_fin("moins 6")
        self.play(FadeIn(a1[2], scale=1.2), Create(c_g), run_time=0.6)
        self.au_fin("plus 5")
        self.play(FadeIn(a1[3], scale=1.2), Create(c_d), run_time=0.6)
        self.au_mot("Trouve les coordonnées")
        tr = VGroup(self.t("Trouve les coordonnées", fs), self.t("du point d'inflexion.", fs))
        tr.arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, 1.1)).align_to(P(-6.2, 0), LEFT)
        mystere = VGroup(self.t("I(", 34, POINT_I), self.t("?", 38, POINT_I), self.t(";", 34, POINT_I),
                         self.t("?", 38, POINT_I), self.t(")", 34, POINT_I)).arrange(RIGHT, buff=0.1)
        rond = Circle(radius=0.13, stroke_color=POINT_I, stroke_width=4).move_to(g.G(2, -11))
        mystere.next_to(rond, RIGHT, buff=0.2)
        self.play(FadeIn(tr[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("du point d'inflexion")
        self.play(FadeIn(tr[1], shift=UP * 0.1), Create(rond), FadeIn(mystere, scale=1.2), run_time=0.45)
        self.au_mot("Mets pause")
        mp = VGroup(pastille_pause(0.4), self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        mp.move_to(P(0, -0.6)).align_to(P(-6.2, 0), LEFT)
        rebours = CompteARebours(5, r=0.38, fs=34).move_to(P(-3.6, -1.85))
        self.play(FadeIn(mp, scale=0.9), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.correction(tit, tr, mp, rebours, a1, g, c_g, c_d, mystere, rond)

    # ── 09b : la correction du défi ────────────────────────────────────────

    def correction(self, tit, tr, mp, rebours, a1, g, c_g, c_d, mystere, rond):
        self.dire("09b-correction")
        self.au_mot("Correction")
        cor = self.t("Correction", 46, VERT_OK).move_to(tit).align_to(tit, LEFT)
        self.play(FadeOut(VGroup(tr, mp, rebours)), ReplacementTransform(tit, cor),
                  a1.animate.scale(0.9).move_to(P(0, 2.5)).align_to(P(-6.2, 0), LEFT), run_time=0.5)
        fs = 34
        b1 = self.lg(self.t("f'(x) =", fs, BLEU_CALCUL), self.t("3x²", fs), self.t("− 12x", fs), y=1.85)
        self.au_mot("f prime")
        self.play(FadeIn(b1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 x au carré")
        self.play(FadeIn(b1[1], scale=1.2), run_time=0.3)
        self.au_fin("moins 12 x")
        self.play(FadeIn(b1[2], scale=1.2), run_time=0.3)
        b2 = self.lg(self.t("f''(x) =", fs, VERT_OK), self.t("6x − 12", fs, VERT_OK), y=1.2)
        self.au_mot("f seconde")
        self.play(FadeIn(b2[0], shift=UP * 0.1), run_time=0.3)
        self.au_fin("6 x moins 12")
        self.play(FadeIn(b2[1], scale=1.2), run_time=0.3)
        tab, lignes, bouts, (moins, zero, plus) = self.tab_signes(["−∞", "2", "+∞"], -3.3, 0.75, "−0+", fs=28)
        self.au_mot("s'annule en 2")
        self.au_pos(self._texte_voix.find("2 et"))
        self.play(FadeIn(lignes), FadeIn(bouts), FadeIn(tab.valeur(1, POINT_I), scale=1.4), FadeIn(zero, scale=1.4),
                  run_time=0.4)
        self.au_mot("négative avant")
        self.play(FadeIn(moins, scale=1.4), c_g.animate.set_color(CONCAVE), run_time=0.35)
        self.au_mot("positive après")
        self.play(FadeIn(plus, scale=1.4), c_d.animate.set_color(CONVEXE), run_time=0.35)
        b3 = self.lg(self.t("f(2) =", fs), self.t("8 − 24", fs), self.t("+ 5", fs), self.t("= −11", fs, POINT_I),
                     y=-1.0)
        self.au_mot("f de 2")
        self.play(FadeIn(b3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 moins 24")
        self.au_pos(self._texte_voix.find("24"))
        self.play(FadeIn(b3[1], scale=1.2), run_time=0.3)
        self.au_fin("plus 5")
        self.play(FadeIn(b3[2], scale=1.2), run_time=0.3)
        self.au_fin("égale moins 11")
        self.play(FadeIn(b3[3], scale=1.2), run_time=0.3)
        self.au_mot("Le point d'inflexion")
        I = Dot(g.G(2, -11), radius=0.12, color=POINT_I)
        self.play(FadeOut(mystere), FadeOut(rond), FadeIn(I, scale=2.5), Flash(I, color=POINT_I, line_length=0.25),
                  run_time=0.5)
        self.au_mot("2 et moins 11")
        b4 = self.lg(self.t("I(2 ; −11)", fs + 10, VERT_OK), y=-1.95)
        cad = SurroundingRectangle(b4, color=VERT_OK, buff=0.14, stroke_width=3)
        li = self.t("I(2 ; −11)", 30, VERT_OK).next_to(I, RIGHT, buff=0.25)
        tg = g.tangente(2, -11, -12, 2.6)
        self.play(FadeIn(b4, scale=1.2), Create(cad), FadeIn(li), Create(tg), run_time=0.5)
        self.insister(VGroup(b4, cad), 1.15, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 38
        p1a = self.t("Point d'inflexion :", fs + 2, POINT_I)
        p1b = VGroup(self.t("la courbe change de convexité", fs), bol(0.22), dome(0.22)).arrange(RIGHT, buff=0.2)
        p1b[2].shift(DOWN * 0.1)
        b1 = VGroup(p1a, p1b).arrange(RIGHT, buff=0.25)
        p2a = self.t("Par le calcul :", fs + 2, VERT_OK)
        p2b = self.t("f'' s'annule", fs)
        p2c = self.t("et change de signe.", fs)
        b2 = VGroup(p2a, p2b, p2c).arrange(RIGHT, buff=0.22)
        p3a = self.t("Et là, la courbe traverse", fs)
        p3b = self.t("sa tangente.", fs, TANGENTE)
        b3 = VGroup(p3a, p3b).arrange(RIGHT, buff=0.2)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3) for b in (b1, b2, b3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.75)
        if lignes.width > 12.2:
            lignes.scale_to_fit_width(12.2)
        lignes.move_to(P(-0.2, 0.3))
        self.au_mot("Un point d'inflexion")
        self.play(Create(lignes[0][0]), FadeIn(p1a, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("change de convexité")
        self.play(FadeIn(p1b, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Par le calcul")
        self.play(Create(lignes[1][0]), FadeIn(p2a, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("f seconde s'annule")
        self.play(FadeIn(p2b, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("et change de signe")
        self.play(FadeIn(p2c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et là")
        self.play(Create(lignes[2][0]), FadeIn(p3a, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("sa tangente")
        self.play(FadeIn(p3b, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 11 : la fin (règle du 19/10) ───────────────────────────────────────

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
        self.ecrans_ines()
        self.ecran_tangente()
        self.ecran_methode()
        self.ecran_appliquer()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecrans_defi()
        self.ecran_appris()
        self.page_abonnement()


class ConvexitePointInflexionTerminale(ConvexitePointInflexionBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
