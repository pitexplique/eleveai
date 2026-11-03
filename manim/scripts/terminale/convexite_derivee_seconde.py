# convexite_derivee_seconde.py
# EleveAI — Maths Tle spé — paysage « Dérivée seconde et convexité » (16:9),
# ceinture VERTE. Micro du coach : convexite_derivee_seconde (notion
# convexite_fonction, lib/tutor-v4/questionBank/terminale-spe/maths/convexite.bank.ts).
# Centres : espace, sciences. Short jumeau : convexite_derivee_seconde_short.py.
#
# Clé de voix → écran :
#   · 00-garde      : page de garde, la question, l'échelle ENTIÈRE (verte) ;
#   · 01-situation  : Karim, ingénieur d'une agence spatiale ; la fusée décolle
#                     et la courbe de la distance se trace EN MÊME TEMPS (creux) ;
#   · 02-idee       : la tangente glisse, de plus en plus raide ; sa pente f'
#                     se trace dessous (croissante) ; f' croît quand f'' ≥ 0 ;
#   · 03-theoreme   : la règle f'' ≥ 0 / f'' ≤ 0 ; f'' = l'accélération ;
#   · 04/04b        : question-pause n° 1 (x³ → f'' = 6x : B) ;
#   · 05-appliquer  : x³ − 3x², f', f'' = 6x − 6, tableau de signes, conclusion ;
#   · 06-piege      : signe de f' (monte / descend) ≠ signe de f'' (creux / bosse) ;
#   · 07/07b        : question-pause n° 2 (f'' = 6x − 12 : convexe sur [2 ; +∞[) ;
#   · 08-rediger    : la rédaction du bac en 3 lignes, sur une copie ;
#   · 09/09b        : le défi eˣ − x², f'' = eˣ − 2, bascule en ln 2 ≈ 0,69 ;
#   · 10-finale     : « Ce que tu as appris », titre en haut et centré ;
#   · 11-abonne     : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur (paysage ET short) : bleu = convexe / creux / f'' ≥ 0,
# orange = concave / bosse / f'' ≤ 0, vert = résultat juste, rouge = piège.
# Modèles : loi_normale_escalier.py, convexite_fonction.py (recopiés, rien importé).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : convexite_derivee_seconde_marques.json). Audit : AUDIT=1 BORDS=1 … --dry_run.
#
# Voix : manim/voix/terminale-convexite-derivee-seconde.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/convexite_derivee_seconde.py ConvexiteDeriveeSecondeTerminale -o eleveai-maths-terminale-convexite-derivee-seconde --media_dir manim/scripts/terminale/media-convexite-derivee-seconde
# Sortie : manim/sorties/terminale/maths/analyse/convexite-derivee-seconde/

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
from signes_expression_2de import Tableau, echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402


def f1(x):
    return x ** 3 - 3 * x ** 2


def f3(x):
    return math.exp(x) - x * x


# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert all(6 * x - 6 < 0 for x in (-5, 0, 0.9)) and all(6 * x - 6 > 0 for x in (1.1, 3))
assert all(6 * x - 12 > 0 for x in (2.1, 5)) and all(6 * x - 12 < 0 for x in (0, 1.9))
assert f"{math.log(2):.2f}".replace(".", ",") == "0,69"
assert all(math.exp(x) - 2 < 0 for x in (-1, 0.6)) and all(math.exp(x) - 2 > 0 for x in (0.7, 2))
assert min(math.exp(x) - 2 * x for x in np.linspace(-3, 3, 601)) > 0   # f' > 0 : eˣ − x² croît

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6  # la colonne de droite (marge de 3 % : 0,43 du bord)
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
SECONDE = VIOLET_ACCENT   # f''
PEAU, CHEVEUX = "#8d5524", "#1f1307"


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

    def droite(self, m, x0, y0, a, b, color=WHITE, sw=4):
        return Line(self.G(a, y0 + m * (a - x0)), self.G(b, y0 + m * (b - x0)), color=color, stroke_width=sw)


def bol(r=0.28, color=CONVEXE, sw=5):
    return Arc(radius=r, start_angle=PI, angle=PI, stroke_color=color, stroke_width=sw)


def dome(r=0.28, color=CONCAVE, sw=5):
    return Arc(radius=r, start_angle=0, angle=PI, stroke_color=color, stroke_width=sw)


def karim(s=1.0):
    """Le pictogramme : tête, cheveux courts, casque-micro, combinaison bleue, badge."""
    tete = Circle(radius=0.32, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Arc(radius=0.33, start_angle=0.25, angle=PI - 0.5, stroke_color=CHEVEUX, stroke_width=11)
    cheveux.move_to(tete.get_top() + DOWN * 0.07)
    casque = Arc(radius=0.4, start_angle=0.05, angle=PI - 0.1, stroke_color=GREY_B, stroke_width=4).move_to(
        tete.get_center() + UP * 0.2)
    ecouteur = RoundedRectangle(width=0.1, height=0.2, corner_radius=0.04, fill_color=GREY_B, fill_opacity=1,
                                stroke_width=0).move_to(tete.get_right() + RIGHT * 0.03)
    micro = Line(ecouteur.get_bottom(), tete.get_center() + P(0.12, -0.24), stroke_width=3, color=GREY_B)
    corps = RoundedRectangle(width=1.05, height=1.25, corner_radius=0.3, fill_color="#1e40af", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    badge = RoundedRectangle(width=0.26, height=0.18, corner_radius=0.03, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(P(-0.22, 0.3))
    etoile = Star(5, outer_radius=0.09, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(P(0.22, 0.3))
    return VGroup(corps, badge, etoile, tete, cheveux, casque, ecouteur, micro).scale(s)


def fusee(s=1.0):
    """La fusée : corps blanc, pointe rouge, hublot, ailerons ; la flamme en [0]."""
    corps = RoundedRectangle(width=0.44, height=1.3, corner_radius=0.12, fill_color="#E5E7EB", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    pointe = Polygon(P(-0.22, 0.6), P(0.22, 0.6), P(0, 1.05), fill_color=ROUGE_ERREUR, fill_opacity=1,
                     stroke_width=0)
    hublot = Circle(radius=0.11, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_color=GREY_D,
                    stroke_width=2).move_to(P(0, 0.25))
    ail_g = Polygon(P(-0.22, -0.2), P(-0.22, -0.65), P(-0.45, -0.7), fill_color=ROUGE_ERREUR, fill_opacity=1,
                    stroke_width=0)
    ail_d = ail_g.copy().flip(UP, about_point=ORIGIN)
    flamme = VGroup(Polygon(P(-0.17, -0.65), P(0.17, -0.65), P(0, -1.25), fill_color=ORANGE_RETENUE,
                            fill_opacity=1, stroke_width=0),
                    Polygon(P(-0.09, -0.65), P(0.09, -0.65), P(0, -1.0), fill_color=JAUNE_TITRE, fill_opacity=1,
                            stroke_width=0))
    return VGroup(flamme, ail_g, ail_d, corps, pointe, hublot).scale(s)


class ConvexiteDeriveeSecondeBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = "convexite_derivee_seconde_marques.json"
    nom_voix = "terminale-convexite-derivee-seconde"
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

    def ex(self, fs=36, color=WHITE):
        """eˣ en Text."""
        return puissance("e", "x", fs, color)

    def insister(self, mob, k=1.35, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def sans_audit(self, mob):
        """Les nombres d'une figure qu'on LIT (graduations, numéros) : pas d'audit."""
        for f in mob.get_family():
            f._pas_audit = True
        return mob

    def pastille_num(self, k, color=BLEU_CALCUL, r=0.24):
        n = Text(str(k), font_size=30, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

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

    def t_pos(self, i):
        """L'instant (absolu) où la voix dit le mot à la position i."""
        m = self._marques().get(self._cle_voix) or []
        return self._debut_voix + max([x[1] for x in m if x[0] <= i] or [0.0])

    def t_mot(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        return self.t_pos(i)

    def jusqua(self, extrait, n=1, marge=0.1, mini=0.4):
        """La durée d'une animation qui doit finir juste avant `extrait`."""
        return max(mini, self.t_mot(extrait, n) - self.renderer.time - marge)

    def au_pos(self, i):
        """Attend l'instant où la voix dit le mot à la position i."""
        reste = self.t_pos(i) - self.renderer.time
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
        if pause.width < 3.5:  # rétrécie à cause de Ti-Margo : deux lignes
            pause = VGroup(self.t("Mets pause,", 32, ORANGE_RETENUE), self.t("et choisis !", 32, ORANGE_RETENUE))
            pause.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            pause.move_to(P(0, cartes.get_bottom()[1] - 0.2), aligned_edge=UP).align_to(P(XL, 0), LEFT)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes, morceaux=None):
        """Chaque carte À SA LETTRE, son contenu À SON MOT. `morceaux[k]` : pour
        un contenu en plusieurs pièces, la liste des extraits (un par pièce)."""
        voix = self._texte_voix
        for k, (c, L) in enumerate(zip(cartes, "ABC")):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            if morceaux and morceaux[k]:
                for piece, extrait in zip(c[1][1], morceaux[k]):
                    self.au_pos(voix.find(extrait, i))
                    self.play(FadeIn(piece, shift=RIGHT * 0.15), run_time=0.2)
            else:
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
        titre = self.t("Dérivée seconde et convexité", 54, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Dérivée seconde")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        g = Graphe((0, 3), (0, 9), (-3.4, -1.75), (0.6, 1.0))
        c = g.courbe(lambda x: x * x, 0, 3, WHITE, 6)
        ax = g.axes()
        self.au_mot("Ça monte")
        q1 = self.t("Ça monte.", 40, WHITE).move_to(P(2.9, 0.6))
        self.play(Create(ax), FadeIn(q1, shift=UP * 0.15), Create(c), run_time=1.0)
        self.au_mot("Mais est-ce")
        q2 = VGroup(self.t("Mais est-ce que ça monte", 38, BLEU_CALCUL),
                    self.t("de plus en plus vite ?", 38, BLEU_CALCUL)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        q2.next_to(q1, DOWN, buff=0.3).align_to(q1, LEFT)
        if q2.get_right()[0] > BORD_X:
            q2.scale_to_fit_width(BORD_X - q2.get_left()[0]).align_to(q1, LEFT)
        self.play(FadeIn(q2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("de plus en plus")
        self.play(FadeIn(q2[1], shift=UP * 0.1), c.animate.set_color(CONVEXE), run_time=0.5)
        self.attendre_voix(marge=0.9)

    # ── 01 : Karim et la fusée ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        k = karim(1.0).move_to(P(-4.95, 0.55))
        self.au_mot("Voici Karim")
        nom = self.t("Karim", 36, JAUNE_TITRE).next_to(k, DOWN, buff=0.2)
        self.play(FadeIn(k, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("ingénieur")
        metier = VGroup(self.t("ingénieur", 26, GREY_A), self.t("agence spatiale", 26, GREY_A))
        metier.arrange(DOWN, buff=0.08).next_to(nom, DOWN, buff=0.12)
        self.play(FadeIn(metier[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("agence spatiale")
        self.play(FadeIn(metier[1], shift=UP * 0.1), run_time=0.3)
        # le pas de tir et la fusée
        xf, y_sol = -2.55, -2.55
        sol = Line(P(-3.6, y_sol), P(-1.5, y_sol), stroke_width=4, color=GREY_B)
        tour = VGroup(Line(P(-3.25, y_sol), P(-3.25, -0.6), stroke_width=4, color=GREY_D),
                      *[Line(P(-3.25, y_sol + 0.3 * i), P(-3.0, y_sol + 0.3 * i + 0.3), stroke_width=2,
                             color=GREY_D) for i in range(6)])
        fu = fusee(0.95)
        y_bas = y_sol + 0.02 - fu[1:].get_bottom()[1] + fu.get_center()[1]
        fu.move_to(P(xf, y_bas))
        fu[0].set_opacity(0)
        self.au_mot("Au décollage")
        self.play(Create(sol), FadeIn(tour), FadeIn(fu, shift=UP * 0.2), run_time=0.5)
        self.play(fu[0].animate.set_opacity(1), run_time=0.3)
        # le graphique : temps → distance
        g = Graphe((0, 3.25), (0, 10), (0.2, -1.9), (5.0, 2.75))
        ax = g.axes()
        lt = self.t("temps", 26, GREY_A).next_to(g.G(3.25, 0), DOWN, buff=0.12).align_to(g.G(3.25, 0), RIGHT)
        ld = self.t("distance parcourue", 26, GREY_A).next_to(g.G(0, 10), RIGHT, buff=0.15)
        self.au_mot("il suit la distance")
        self.play(Create(ax), FadeIn(lt), FadeIn(ld), run_time=0.6)
        tt = ValueTracker(0.001)
        haut = 4.2 / 9  # la fusée monte de 4,2 quand la distance va de 0 à 9

        def d(t):
            return t * t

        fu.add_updater(lambda m: m.move_to(P(xf, y_bas + haut * d(tt.get_value()))))
        trace = always_redraw(lambda: g.courbe(d, 0, max(tt.get_value(), 0.01), WHITE, 6, n=40))
        point = always_redraw(lambda: Dot(g.G(tt.get_value(), d(tt.get_value())), radius=0.09, color=JAUNE_TITRE))
        lien = always_redraw(lambda: DashedLine(fu.get_center(), g.G(tt.get_value(), d(tt.get_value())),
                                                stroke_width=2, color=GREY_D, dash_length=0.1))
        self.add(trace, point, lien)
        self.au_mot("Elle augmente")
        self.play(tt.animate.set_value(1.5), run_time=self.jusqua("de plus en plus"), rate_func=linear)
        self.au_mot("de plus en plus")
        self.play(tt.animate.set_value(3.0), run_time=self.jusqua("la fusée accélère"), rate_func=linear)
        self.au_mot("la fusée accélère")
        acc = self.t("la fusée accélère", 32, JAUNE_TITRE).move_to(P(2.6, 3.3))
        self.play(FadeIn(acc, shift=UP * 0.1), run_time=0.4)
        fu.clear_updaters()
        trace.clear_updaters()
        point.clear_updaters()
        self.remove(lien)
        self.au_mot("se creuse")
        lc = VGroup(bol(0.26), self.t("la courbe se creuse", 28, CONVEXE)).arrange(RIGHT, buff=0.18)
        lc.move_to(P(0, -1.15)).align_to(P(1.4, 0), LEFT)
        self.play(trace.animate.set_color(CONVEXE), FadeIn(lc, shift=UP * 0.1), run_time=0.5)
        self.play(Indicate(trace, color=CONVEXE, scale_factor=1.04), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 02 : l'idée : la tangente glisse, sa pente f' croît ────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        g1 = Graphe((0, 3.2), (0, 10.5), (-6.1, 0.35), (-1.0, 3.2))
        g2 = Graphe((0, 3.2), (0, 7.0), (-6.1, -2.95), (-1.0, -0.45))
        ax1 = g1.axes()
        c = g1.courbe(lambda x: x * x, 0, 3.15, CONVEXE, 6)
        lf = self.t("f", 34, CONVEXE).next_to(g1.G(3.15, 9.9), RIGHT, buff=0.12)
        xl = -0.2
        self.au_mot("Courbe en creux")
        l1 = self.ligne(bol(0.28), self.t("Courbe en creux", 36, CONVEXE), y=2.65, xl=xl, buff=0.2)
        self.play(Create(ax1), Create(c), FadeIn(lf), FadeIn(l1, shift=UP * 0.1), run_time=0.8)
        u = ValueTracker(0.3)

        def tangente(v, color=JAUNE_TITRE, sw=6):
            return g1.droite(2 * v, v, v * v, v - 0.45, v + 0.45, color, sw)

        tg = always_redraw(lambda: tangente(u.get_value()))
        pt = always_redraw(lambda: Dot(g1.G(u.get_value(), u.get_value() ** 2), radius=0.08, color=JAUNE_TITRE))
        self.au_mot("les tangentes")
        self.play(FadeIn(tg), FadeIn(pt), run_time=0.3)
        self.au_mot("de plus en plus raides")
        l2 = self.col(self.t("tangentes de plus en plus raides", 34), 1.85, xl)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        fantomes = VGroup()
        etapes = [0.9, 1.5, 2.1, 2.7]
        duree = self.jusqua("Leur pente") / len(etapes)
        for v in etapes:
            fantomes.add(tangente(u.get_value(), BLEU_CALCUL, 3).set_opacity(0.6))
            self.add(fantomes[-1])
            self.play(u.animate.set_value(v), run_time=duree, rate_func=linear)
        # la pente f' se trace dessous, au même x
        self.au_mot("Leur pente")
        ax2 = g2.axes()
        l3 = self.ligne(self.t("leur pente :", 34), y=1.0, xl=xl)
        self.play(Create(ax2), FadeIn(l3, shift=UP * 0.1), u.animate.set_value(0.3), FadeOut(fantomes),
                  run_time=0.5)
        self.au_mot("f prime")
        l3b = self.ligne(self.t("leur pente :", 34), self.t("f'", 40, WHITE), y=1.0, xl=xl)
        lfp = self.t("f'", 34, WHITE).next_to(g2.G(2.7, 5.4), UP + LEFT * 0.2, buff=0.1)
        self.play(ReplacementTransform(l3, l3b), FadeIn(lfp), run_time=0.35)
        trace = always_redraw(lambda: Line(g2.G(0.3, 0.6), g2.G(u.get_value() + 1e-3, 2 * u.get_value() + 2e-3),
                                           color=WHITE, stroke_width=5))
        pt2 = always_redraw(lambda: Dot(g2.G(u.get_value(), 2 * u.get_value()), radius=0.08, color=JAUNE_TITRE))
        lien = always_redraw(lambda: DashedLine(g1.G(u.get_value(), u.get_value() ** 2),
                                                g2.G(u.get_value(), 2 * u.get_value()), stroke_width=2,
                                                color=GREY_C, dash_length=0.1))
        self.add(trace, pt2, lien)
        self.play(u.animate.set_value(2.7), run_time=self.jusqua("Donc f est convexe"), rate_func=linear)
        for m in (tg, pt, trace, pt2, lien):
            m.clear_updaters()
        self.au_mot("Donc f est convexe")
        l4 = self.ligne(self.t("f convexe", 36, CONVEXE), y=0.0, xl=xl)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.au_mot("quand f prime")
        l4b = self.ligne(self.t("f convexe", 36, CONVEXE), self.t("quand f' est croissante", 34), y=0.0, xl=xl)
        self.play(ReplacementTransform(l4, l4b), Indicate(trace, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.6)
        self.au_mot("Et f prime")
        l5 = self.ligne(self.t("f' croît quand", 34), y=-0.85, xl=xl)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.au_mot("f seconde")
        l5b = self.ligne(self.t("f' croît quand", 34), self.t("f''", 40, SECONDE), y=-0.85, xl=xl)
        self.play(ReplacementTransform(l5, l5b), run_time=0.3)
        self.au_mot("est positive")
        l5c = self.ligne(self.t("f' croît quand", 34), self.t("f''", 40, SECONDE), self.t("≥ 0", 40, CONVEXE),
                         y=-0.85, xl=xl)
        self.remove(l5b)
        self.add(l5c[:2])
        cad = SurroundingRectangle(l5c, color=CONVEXE, buff=0.15, stroke_width=3)
        self.play(FadeIn(l5c[2], scale=1.4), Create(cad), run_time=0.4)
        self.insister(VGroup(l5c, cad), 1.12, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 03 : la règle ──────────────────────────────────────────────────────

    def carte_courbe(self, x, f, color):
        carte = RoundedRectangle(width=2.9, height=2.15, corner_radius=0.16, stroke_color=color, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, -1.6))
        g = Graphe((-1.6, 1.6), (-2.8, 2.8), (x - 1.15, -2.5), (x + 1.15, -0.7))
        return carte, g.axes(sw=1.5), g.courbe(f, -1.5, 1.5, color, 6)

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("La règle")
        tit = self.t("La règle", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.6)
        fs = 34
        r1a = self.lg(self.t("Si", fs), self.t("f''(x) ≥ 0", fs + 2, SECONDE), self.t("sur un intervalle,", fs), y=2.2)
        r1b = self.lg(self.t("f est convexe sur cet intervalle.", fs, CONVEXE), bol(0.25), y=1.6, buff=0.25)
        r2a = self.lg(self.t("Si", fs), self.t("f''(x) ≤ 0,", fs + 2, SECONDE), y=0.85)
        r2b = self.lg(self.t("f est concave.", fs, CONCAVE), dome(0.25), y=0.25, buff=0.25)
        r2b[1].shift(DOWN * 0.1)
        k1 = self.carte_courbe(-4.7, lambda x: 1.1 * x * x - 1.4, CONVEXE)
        k2 = self.carte_courbe(-1.5, lambda x: -1.1 * x * x + 1.4, CONCAVE)
        self.au_mot("Si f seconde")
        self.play(FadeIn(r1a, shift=RIGHT * 0.15), FadeIn(k1[0]), Create(k1[1]), run_time=0.5)
        self.au_mot("f est convexe")
        self.play(FadeIn(r1b, shift=RIGHT * 0.15), Create(k1[2]), run_time=0.6)
        self.au_mot("Si f seconde", n=2)
        self.play(FadeIn(r2a, shift=RIGHT * 0.15), FadeIn(k2[0]), Create(k2[1]), run_time=0.5)
        self.au_mot("f est concave")
        self.play(FadeIn(r2b, shift=RIGHT * 0.15), Create(k2[2]), run_time=0.6)
        # pour Karim
        self.au_mot("Pour Karim")
        pk = self.t("Pour Karim :", 34, JAUNE_TITRE).move_to(P(3.9, 2.2))
        fu = fusee(0.8).move_to(P(3.4, -0.75))
        self.play(FadeIn(pk, shift=UP * 0.1), FadeIn(fu, shift=UP * 0.2), run_time=0.45)
        self.au_mot("f seconde, c'est")
        acc = VGroup(self.t("f''", 40, SECONDE), self.t("=", 36)).arrange(RIGHT, buff=0.15)
        acc.next_to(pk, DOWN, buff=0.3)
        self.play(FadeIn(acc, shift=UP * 0.1), run_time=0.3)
        self.au_mot("l'accélération")
        mot = self.t("l'accélération", 36, JAUNE_TITRE).next_to(acc, DOWN, buff=0.15)
        fl = Arrow(P(4.5, -1.6), P(4.5, 0.3), buff=0, color=JAUNE_TITRE, stroke_width=6,
                   max_tip_length_to_length_ratio=0.2)
        self.play(FadeIn(mot, scale=1.2), GrowArrow(fl), fu.animate.shift(UP * 0.35), run_time=0.5)
        self.play(Indicate(fu[0], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04/04b : question-pause n° 1 (x³) ──────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-question")
        t0 = self.renderer.time
        fs = 32
        q0 = self.t("f(x) = x³", fs + 2, WHITE)
        q1 = VGroup(self.t("Que vaut", fs), self.t("f''(x) ?", fs + 2, SECONDE)).arrange(RIGHT, buff=0.15)
        tete, q, cartes, pause, rebours = self.q_tete([q0, q1], ["3x²", "6x", "6"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g = Graphe((-1.75, 1.75), (-5.4, 5.4), (-5.6, 0.25), (-1.4, 3.3))
        c = g.courbe(lambda x: x ** 3, -1.72, 1.72, WHITE, 6)
        lc = self.t("x³", 34).next_to(g.G(1.72, 5.09), RIGHT, buff=0.12)
        self.au_mot("f de x")
        self.play(FadeIn(q[0], shift=UP * 0.1), Create(g.axes()), run_time=0.4)
        self.play(Create(c), FadeIn(lc), run_time=0.6)
        self.au_mot("Que vaut")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04-question", t0, 1)
        # la réponse
        self.dire("04b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 36
        self.au_mot("On dérive deux fois")
        d0 = self.lg(self.t("On dérive deux fois :", fs, JAUNE_TITRE), y=-0.35, x=-6.1)
        self.play(FadeIn(d0, shift=UP * 0.1), run_time=0.35)
        d1 = self.lg(self.t("f'(x) =", fs), self.t("3x²", fs), y=-1.1, x=-5.6)
        d2 = self.lg(self.t("f''(x) =", fs, SECONDE), self.t("6x", fs + 4, VERT_OK), y=-1.85, x=-5.6)
        self.au_mot("f prime de x")
        self.play(FadeIn(d1[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("3 x au carré")
        self.play(FadeIn(d1[1], scale=1.3), run_time=0.3)
        self.au_mot("f seconde de x")
        self.play(FadeIn(d2[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("6 x")
        self.play(FadeIn(d2[1], scale=1.3), run_time=0.3)
        cad = SurroundingRectangle(d2, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        # A : on s'est arrêté à f'
        self.au_mot("A s'arrête")
        croix = Cross(cartes[0], stroke_color=ROUGE_ERREUR, stroke_width=5).scale(0.6)
        pa = self.lg(self.t("A s'arrête à la première dérivée.", 32, ROUGE_ERREUR), y=-2.65, x=-6.1)
        if pa.get_right()[0] > 1.6:
            pa.scale_to_fit_width(1.6 + 6.1).align_to(P(-6.1, 0), LEFT)
        self.play(cartes[0].animate.set_opacity(1), Create(croix), FadeIn(pa, shift=UP * 0.1),
                  d1.animate.set_color(ROUGE_ERREUR), run_time=0.5)
        self.play(d1.animate.set_color(WHITE), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 05 : appliquer sur x³ − 3x² ────────────────────────────────────────

    def mot_case(self, tab, r, k, texte, color, fs=25):
        return self.t(texte, fs, color).move_to(P(tab.x(k), tab.y(r)))

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        fs = 36
        g = Graphe((-1.0, 3.3), (-4.6, 2.0), (0.6, -1.9), (5.3, 3.1))
        ax = g.axes()
        self.au_mot("Appliquons")
        tit = self.lg(self.t("Appliquons", 40, JAUNE_TITRE), y=3.25)
        self.play(FadeIn(tit, shift=DOWN * 0.1), Create(ax), run_time=0.45)
        a1 = self.lg(self.t("f(x) = x³", fs), self.t("− 3x²", fs), y=2.55)
        c_g = g.courbe(f1, -0.95, 1, WHITE, 6)
        c_d = g.courbe(f1, 1, 3.18, WHITE, 6)
        self.au_mot("f de x")
        self.play(FadeIn(a1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 x au carré")
        self.play(FadeIn(a1[1], scale=1.2), Create(c_g), run_time=0.6)
        self.play(Create(c_d), run_time=0.5)
        a2 = self.lg(self.t("f'(x) =", fs), self.t("3x²", fs), self.t("− 6x", fs), y=1.9)
        self.au_mot("f prime")
        self.play(FadeIn(a2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 x au carré moins 6")
        self.play(FadeIn(a2[1], scale=1.2), run_time=0.3)
        self.au_mot("6 x. f")
        self.play(FadeIn(a2[2], scale=1.2), run_time=0.3)
        a3 = self.lg(self.t("f''(x) =", fs, SECONDE), self.t("6x − 6", fs, SECONDE), y=1.25)
        self.au_mot("f seconde")
        self.play(FadeIn(a3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 x moins 6")
        self.play(FadeIn(a3[1], scale=1.2), run_time=0.3)
        # le tableau de signes de f''
        tab = Tableau(["−∞", "1", "+∞"], centre_x=-3.3, y_haut=0.7, larg_lab=1.4, pas=2.1, h=0.65, fs=30,
                      marge=0.45)
        lignes = VGroup(tab.ligne(0, "x"), tab.ligne(1, "f''(x)", SECONDE), tab.ligne(2, "f"))
        self.au_mot("6 x moins 6 est")
        self.play(FadeIn(lignes), FadeIn(tab.valeur(0)), FadeIn(tab.valeur(2)),
                  Indicate(a3[1], color=SECONDE, scale_factor=1.15), run_time=0.5)
        moins = tab.case(1, 1, "−")
        self.au_mot("négatif")
        self.play(FadeIn(moins, scale=1.4), run_time=0.3)
        self.au_mot("1, positif")
        un = tab.valeur(1, JAUNE_TITRE)
        zero = tab.case(1, 2, "0")
        I = Dot(g.G(1, -2), radius=0.12, color=JAUNE_TITRE)
        self.play(FadeIn(un, scale=1.4), FadeIn(zero, scale=1.4), FadeIn(I, scale=2.5), run_time=0.35)
        self.au_mot("positif")
        plus = tab.case(1, 3, "+")
        self.play(FadeIn(plus, scale=1.4), run_time=0.3)
        # la conclusion
        r1 = self.lg(self.t("f est concave sur", 34, CONCAVE), self.t("]−∞ ; 1]", 34, CONCAVE), y=-1.85)
        r2 = self.lg(self.t("f est convexe sur", 34, CONVEXE), self.t("[1 ; +∞[", 34, CONVEXE), y=-2.55)
        self.au_mot("concave sur")
        cc = self.mot_case(tab, 2, 1, "concave", CONCAVE)
        self.play(FadeIn(cc, scale=1.2), FadeIn(r1[0], shift=RIGHT * 0.1), c_g.animate.set_color(CONCAVE),
                  run_time=0.4)
        self.au_mot("infini, 1")
        self.au_pos(self._texte_voix.find("1, et"))
        self.play(FadeIn(r1[1], scale=1.2), run_time=0.3)
        self.au_mot("convexe sur")
        cv = self.mot_case(tab, 2, 3, "convexe", CONVEXE)
        self.play(FadeIn(cv, scale=1.2), FadeIn(r2[0], shift=RIGHT * 0.1), c_d.animate.set_color(CONVEXE),
                  run_time=0.4)
        self.au_mot("plus l'infini")
        self.play(FadeIn(r2[1], scale=1.2), run_time=0.3)
        self.play(Flash(I, color=JAUNE_TITRE, line_length=0.25), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : signe de f' ≠ signe de f'' ─────────────────────────

    def panneau(self, cx, couleur):
        carte = RoundedRectangle(width=5.0, height=3.75, corner_radius=0.16, stroke_color=couleur, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(cx, -0.85))
        g = Graphe((-1.0, 3.25), (-4.6, 2.2), (cx - 2.1, -2.5), (cx + 2.1, -0.15))
        return carte, g

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        tit = self.t("Le piège !", 48, ROUGE_ERREUR).to_edge(UP, buff=0.65)
        self.play(FadeIn(tit, scale=1.3), run_time=0.45)
        self.insister(tit, 1.2)
        fs = 36
        e1 = VGroup(self.t("On étudie le signe de", fs), self.t("f''", fs + 6, SECONDE)).arrange(RIGHT, buff=0.18)
        e2 = VGroup(self.t("pas celui de", fs, ROUGE_ERREUR), self.t("f'", fs + 6, ROUGE_ERREUR)).arrange(RIGHT,
                                                                                                           buff=0.18)
        ligne = VGroup(e1, self.t(",", fs), e2).arrange(RIGHT, buff=0.12).move_to(P(-0.3, 2.3))
        self.au_mot("On étudie")
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("pas celui")
        barre = Line(e2.get_left(), e2.get_right(), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(ligne[1]), FadeIn(e2, shift=UP * 0.1), run_time=0.35)
        self.play(Create(barre), run_time=0.3)
        # panneau de gauche : le signe de f' (monte / descend)
        k1, g1 = self.panneau(-3.45, GREY_B)
        k2, g2 = self.panneau(2.25, SECONDE)
        h1 = VGroup(self.t("signe de", 30), self.t("f'", 36, WHITE)).arrange(RIGHT, buff=0.12)
        h1.move_to(P(-3.45, 0.62))
        h2 = VGroup(self.t("signe de", 30), self.t("f''", 36, SECONDE)).arrange(RIGHT, buff=0.12)
        h2.move_to(P(2.25, 0.62))
        c1 = g1.courbe(f1, -0.95, 3.18, WHITE, 5)
        self.au_mot("Le signe de f prime")
        self.play(FadeIn(k1), FadeIn(h1), Create(g1.axes(sw=1.5)), Create(c1), run_time=0.7)

        def fleche(gr, a, b, color):
            return Arrow(gr.G(a, f1(a)), gr.G(b, f1(b)), buff=0.05, color=color, stroke_width=6,
                         max_tip_length_to_length_ratio=0.3).shift(UP * 0.28)

        self.au_mot("monte")
        m1 = VGroup(fleche(g1, -0.85, -0.15, VERT_OK), fleche(g1, 2.35, 3.05, VERT_OK))
        lm = self.t("monte", 28, VERT_OK)
        ldn = self.t("descend", 28, ROUGE_ERREUR)
        VGroup(lm, ldn).arrange(RIGHT, buff=0.6).move_to(P(-3.45, 0.15))
        self.play(LaggedStart(*[GrowArrow(a) for a in m1], lag_ratio=0.3), FadeIn(lm), run_time=0.5)
        self.au_mot("descend")
        d1 = fleche(g1, 0.4, 1.6, ROUGE_ERREUR)
        self.play(GrowArrow(d1), FadeIn(ldn), run_time=0.45)
        # panneau de droite : le signe de f'' (creux / bosse)
        c2g = g2.courbe(f1, -0.95, 1, WHITE, 5)
        c2d = g2.courbe(f1, 1, 3.18, WHITE, 5)
        self.au_mot("Le signe de f seconde")
        self.play(FadeIn(k2), FadeIn(h2), Create(g2.axes(sw=1.5)), Create(c2g), Create(c2d), run_time=0.7)
        lb = VGroup(bol(0.18), self.t("se creuse", 28, CONVEXE)).arrange(RIGHT, buff=0.12)
        lo = VGroup(dome(0.18), self.t("se bombe", 28, CONCAVE)).arrange(RIGHT, buff=0.12)
        VGroup(lo, lb).arrange(RIGHT, buff=0.45).move_to(P(2.25, 0.15))
        self.au_mot("se creuse")
        self.play(c2d.animate.set_color(CONVEXE), FadeIn(lb), run_time=0.45)
        self.au_mot("se bombe")
        self.play(c2g.animate.set_color(CONCAVE), FadeIn(lo), run_time=0.45)
        self.play(Indicate(h2, color=SECONDE, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 07/07b : question-pause n° 2 (f'' = 6x − 12) ──────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-question")
        t0 = self.renderer.time
        fs = 32
        q0 = self.sans_audit(self.t("f''(x) = 6x − 12", fs + 2, SECONDE))  # glyphes calés à la main
        choix = [VGroup(Text("]−∞ ;", font_size=fs), Text("2]", font_size=fs)).arrange(RIGHT, buff=0.12),
                 VGroup(Text("[2 ;", font_size=fs), Text("+∞[", font_size=fs)).arrange(RIGHT, buff=0.12),
                 VGroup(Text("[0 ;", font_size=fs), Text("+∞[", font_size=fs)).arrange(RIGHT, buff=0.12)]
        tete, q, cartes, pause, rebours = self.q_tete([q0, "Sur quel intervalle", "f est-elle convexe ?"], choix)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        tab = Tableau(["−∞", "2", "+∞"], centre_x=-3.35, y_haut=2.2, larg_lab=1.4, pas=2.1, h=0.75, fs=32,
                      marge=0.45)
        lignes = VGroup(tab.ligne(0, "x"), tab.ligne(1, "f''(x)", SECONDE), tab.ligne(2, "f"))
        self.au_mot("f seconde")
        self.play(FadeIn(q[0][:7], shift=UP * 0.1), FadeIn(lignes), FadeIn(tab.valeur(0)), FadeIn(tab.valeur(2)),
                  run_time=0.45)
        self.au_mot("6 x moins 12")
        self.play(FadeIn(q[0][7:9], scale=1.2), run_time=0.3)
        self.au_mot("12. Sur")
        self.play(FadeIn(q[0][9:], scale=1.2), run_time=0.3)
        self.au_mot("Sur quel")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("convexe")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes, [["de moins", "2. B"], ["2 à plus", "plus l'infini"], ["0 à plus", "plus l'infini"]])
        self.q_pause(pause, rebours, "07-question", t0, 1)
        # la réponse : le tableau se remplit
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        l1 = self.lg(self.t("6x", 36, SECONDE), self.t("− 12 > 0", 36, SECONDE), self.t("quand", 34),
                     self.t("x > 2", 38, VERT_OK), y=-0.7, x=-6.1)
        l1[1].shift(LEFT * 0.05)
        self.au_mot("6 x moins 12")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(q[0], color=SECONDE, scale_factor=1.08), run_time=0.45)
        self.au_mot("12 est positif")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("positif")
        plus = tab.case(1, 3, "+")
        cv = self.mot_case(tab, 2, 3, "convexe", CONVEXE)
        self.play(FadeIn(plus, scale=1.4), FadeIn(cv, scale=1.2), run_time=0.35)
        self.au_mot("quand x")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus grand que 2")
        self.au_pos(self._texte_voix.find("2."))
        self.play(FadeIn(l1[3], scale=1.3), FadeIn(tab.valeur(1, JAUNE_TITRE), scale=1.4),
                  FadeIn(tab.case(1, 2, "0"), scale=1.4), run_time=0.35)
        cad = SurroundingRectangle(l1[3], color=VERT_OK, buff=0.1, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.au_mot("A, c'est")
        moins = tab.case(1, 1, "−")
        cc = self.mot_case(tab, 2, 1, "concave", CONCAVE)
        self.play(FadeIn(moins, scale=1.4), cartes[0].animate.set_opacity(1), run_time=0.35)
        self.au_mot("concave")
        la = self.lg(self.t("A : là où f est concave", 34, CONCAVE), y=-1.55, x=-6.1)
        self.play(FadeIn(cc, scale=1.2), FadeIn(la, shift=UP * 0.1),
                  cartes[0][0].animate.set_stroke(CONCAVE, width=5), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08 : la rédaction du bac, sur une copie ────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        encre, bleu_c, orange_c = "#1f2937", "#0369A1", "#C2410C"
        self.au_mot("Au bac")
        tit = self.t("Au bac : trois lignes", 46, JAUNE_TITRE).to_edge(UP, buff=0.55)
        copie = RoundedRectangle(width=11.2, height=5.2, corner_radius=0.12, fill_color="#F5F1E6", fill_opacity=1,
                                 stroke_width=0).move_to(P(-0.55, -0.55))
        reglure = VGroup(*[Line(P(-6.0, y), P(4.9, y), stroke_width=1.5, color="#BFD3E6")
                           for y in np.arange(1.55, -2.9, -0.55)])
        marge = Line(P(-5.25, 1.95), P(-5.25, -3.05), stroke_width=2.5, color="#E11D48")
        self.play(Write(tit), FadeIn(copie), Create(reglure), Create(marge), run_time=0.8)
        fs = 34

        def tx(s, c=encre, f=fs):
            return Text(s, font_size=f, color=c)

        def num(k, y):
            return self.pastille_num(k, BLEU_CALCUL).move_to(P(-5.65, y))

        l1a = self.lg(tx("f est deux fois dérivable,"), y=1.25, x=-5.0)
        l1b = self.lg(tx("et on calcule"), tx("f''(x).", c="#6D28D9"), y=0.7, x=-5.0)
        l2 = self.lg(tx("On étudie le signe de"), tx("f''(x).", c="#6D28D9"), y=-0.4, x=-5.0)
        l3a = self.lg(tx("On conclut :"), y=-1.5, x=-5.0)
        l3b = self.lg(tx("convexe là où f'' ≥ 0,", c=bleu_c), y=-2.05, x=-4.6)
        l3c = self.lg(tx("concave là où f'' ≤ 0.", c=orange_c), y=-2.6, x=-4.6)
        n1, n2, n3 = num(1, 1.25), num(2, -0.4), num(3, -1.5)
        etapes = [("Un :", n1, l1a), ("on calcule", None, l1b), ("Deux :", n2, l2), ("Trois :", n3, l3a),
                  ("convexe là où", None, l3b), ("concave là où", None, l3c)]
        for mot, n, l in etapes:
            self.au_mot(mot)
            anims = [FadeIn(l, shift=RIGHT * 0.15)] + ([FadeIn(n, scale=1.5)] if n is not None else [])
            self.play(*anims, run_time=0.45)
        self.play(Indicate(VGroup(l3b, l3c), color=JAUNE_TITRE, scale_factor=1.04), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi eˣ − x² ───────────────────────────────────────────────

    def fx_defi(self, fs, color=WHITE):
        return VGroup(self.t("f(x) =", fs, color), self.ex(fs + 4, color), self.t("− x²", fs, color)).arrange(
            RIGHT, buff=0.15)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        t0 = self.renderer.time
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.5), self.t("À toi de jouer !", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3)
        tete.to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.45)
        fx = self.fx_defi(60, BLEU_CALCUL).move_to(P(1.6, 1.55))
        self.au_mot("f de x")
        self.play(FadeIn(fx[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("exponentielle")
        self.play(FadeIn(fx[1], scale=1.3), run_time=0.3)
        self.au_mot("moins x au carré")
        self.play(FadeIn(fx[2], scale=1.3), run_time=0.3)
        cad = SurroundingRectangle(fx, color=BLEU_CALCUL, buff=0.22, stroke_width=3)
        # le dessin du défi : la courbe, blanche, sans réponse
        carte = RoundedRectangle(width=4.6, height=3.4, corner_radius=0.16, stroke_color=GREY_B, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.9, 0.15))
        g = Graphe((-1.6, 2.4), (-2.6, 6.0), (-5.9, -1.35), (-1.9, 1.65))
        c = g.courbe(f3, -1.55, 2.35, WHITE, 6)
        pq = self.t("?", 60, ORANGE_RETENUE).move_to(P(-5.3, 1.15))
        self.play(Create(cad), FadeIn(carte), Create(g.axes(sw=1.5)), run_time=0.4)
        self.play(Create(c), run_time=0.8)
        self.au_mot("Étudie")
        cons = self.t("Étudie la convexité de f.", 40).move_to(P(2.1, 0.25))
        self.play(FadeIn(cons, shift=UP * 0.1), FadeIn(pq, scale=1.5), run_time=0.4)
        pause = VGroup(pastille_pause(0.42), self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE))
        pause.arrange(RIGHT, buff=0.25).move_to(P(-1.2, -2.45))
        rebours = CompteARebours(5, r=0.38, fs=34).next_to(pause, RIGHT, buff=0.45)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION 09-defi t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f})", flush=True)
        self.wait(0.4)

    # ── 09b : la correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        fs = 34
        L2N = math.log(2)
        g = Graphe((-1.6, 2.6), (-2.6, 6.5), (0.9, -1.9), (5.4, 3.1))
        c_g = g.courbe(f3, -1.55, L2N, WHITE, 6)
        c_d = g.courbe(f3, L2N, 2.55, WHITE, 6)
        self.au_mot("Correction")
        tit = self.lg(self.t("Correction", 42, JAUNE_TITRE), y=3.25, x=-6.1)
        lf = self.fx_defi(28, GREY_A).move_to(P(4.0, -2.55))
        self.play(FadeIn(tit, shift=DOWN * 0.1), Create(g.axes()), FadeIn(lf), run_time=0.5)
        self.play(Create(c_g), Create(c_d), run_time=0.8)
        L1 = self.lg(self.t("f'(x) =", fs), self.ex(fs + 4), self.t("− 2x", fs), y=2.45, x=-6.1)
        L2 = self.lg(self.t("f''(x) =", fs, SECONDE), self.ex(fs + 4, SECONDE), self.t("− 2", fs, SECONDE),
                     y=1.75, x=-6.1)
        L3 = self.lg(self.t("f''(x) > 0", fs, SECONDE), self.t("quand", fs), self.ex(fs + 4), self.t("> 2", fs),
                     y=1.05, x=-6.1)
        L4 = self.lg(self.t("donc quand x >", fs), self.t("ln 2", fs + 2, VERT_OK), self.t("≈ 0,69", fs + 2, VERT_OK),
                     y=0.35, x=-6.1)
        self.au_mot("f prime de x")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("exponentielle")
        self.play(FadeIn(L1[1], scale=1.3), run_time=0.3)
        self.au_mot("2 x. f")
        self.play(FadeIn(L1[2], scale=1.2), run_time=0.3)
        self.au_mot("f seconde de x")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("exponentielle", n=2)
        self.play(FadeIn(L2[1], scale=1.3), run_time=0.3)
        self.au_mot("2. Elle")
        self.play(FadeIn(L2[2], scale=1.2), run_time=0.3)
        self.au_mot("Elle est positive")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("quand exponentielle")
        self.play(FadeIn(L3[1:3], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("plus grande que 2")
        self.au_pos(self._texte_voix.find("2, donc"))
        self.play(FadeIn(L3[3], scale=1.2), run_time=0.3)
        self.au_mot("donc quand x")
        self.play(FadeIn(L4[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("2, environ")
        xl2 = self.t("ln 2", 28, VERT_OK).next_to(g.G(L2N, 0), DOWN, buff=0.15)
        trait = DashedLine(g.G(L2N, 0), g.G(L2N, f3(L2N)), color=VERT_OK, stroke_width=3)
        self.play(FadeIn(L4[1], scale=1.3), Create(trait), FadeIn(xl2), run_time=0.4)
        self.au_mot("environ 0,69")
        self.au_pos(self._texte_voix.find("0,69"))
        I = Dot(g.G(L2N, f3(L2N)), radius=0.12, color=JAUNE_TITRE)
        self.play(FadeIn(L4[2], scale=1.3), FadeIn(I, scale=2.5), run_time=0.4)
        cad = SurroundingRectangle(L4[1:], color=VERT_OK, buff=0.1, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        # la conclusion, la courbe se colore
        L5 = self.lg(self.t("f est concave sur", fs, CONCAVE), self.t("]−∞ ; ln 2]", fs, CONCAVE), y=-0.75, x=-6.1)
        L6 = self.lg(self.t("f est convexe sur", fs, CONVEXE), self.t("[ln 2 ; +∞[", fs, CONVEXE), y=-1.45, x=-6.1)
        self.au_mot("f est concave sur")
        self.play(FadeIn(L5[0], shift=RIGHT * 0.1), c_g.animate.set_color(CONCAVE), run_time=0.4)
        self.au_mot("2, et")
        self.play(FadeIn(L5[1], scale=1.2), run_time=0.3)
        self.au_mot("convexe sur")
        self.play(FadeIn(L6[0], shift=RIGHT * 0.1), c_d.animate.set_color(CONVEXE), run_time=0.4)
        self.au_mot("2, plus")
        self.play(FadeIn(L6[1], scale=1.2), run_time=0.3)
        self.play(Flash(I, color=JAUNE_TITRE, line_length=0.25), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 44
        b1 = VGroup(self.t("f'' positive :", fs, SECONDE), self.t("f est convexe.", fs, CONVEXE), bol(0.3))
        b2 = VGroup(self.t("f'' négative :", fs, SECONDE), self.t("f est concave.", fs, CONCAVE), dome(0.3))
        for b in (b1, b2):
            b.arrange(RIGHT, buff=0.25)
        b2[2].shift(DOWN * 0.12)
        b3a = self.t("On étudie le signe de f'',", fs)
        b3b = self.t("pas celui de f'.", fs, ROUGE_ERREUR)
        b3 = VGroup(b3a, b3b).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in (b1, b2, b3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        lignes.move_to(P(-0.4, 0.1))
        self.au_mot("f seconde positive")
        self.play(Create(lignes[0][0]), FadeIn(b1[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("f est convexe")
        self.play(FadeIn(b1[1:], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("f seconde négative")
        self.play(Create(lignes[1][0]), FadeIn(b2[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("f est concave")
        self.play(FadeIn(b2[1:], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et on étudie")
        self.play(Create(lignes[2][0]), FadeIn(b3a, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("pas celui")
        self.play(FadeIn(b3b, shift=RIGHT * 0.2), run_time=0.4)
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
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question1()
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class ConvexiteDeriveeSecondeTerminale(ConvexiteDeriveeSecondeBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
