# loi_normale_escalier.py
# EleveAI — Maths Tle — paysage « L'escalier et la cloche » (16:9), ceinture
# NOIRE. Idée de Frédéric (01/11/2026) : la loi binomiale B(n ; 1/2), dessinée
# en escalier centré réduit, se lisse en loi normale quand n → ∞ (théorème de
# Moivre-Laplace). Short jumeau : loi_normale_escalier_short.py.
#
# Clé de voix → écran :
#   · 00-accroche  : la planche de Galton à la fête foraine, une bille qui
#                    rebondit et tombe dans une case (pas de formule) ;
#   · 01-titre     : page de garde, l'échelle ENTIÈRE des ceintures (noire) ;
#   · 02-un-clou   : un clou → deux cases → deux marches, axe −2, 0, 2, pas = 2 ;
#   · 03-rangees   : n rangées, épreuve de Bernoulli p = 1/2, X suit B(n ; 1/2),
#                    n + 1 cases ;
#   · 04/05        : question-pause n° 1 (A : 4, B : 6, C : 16 → B) : les
#                    6 chemins vers la case du milieu, 2 parmi 4 = 6, 6/16 ;
#   · 06-curseur   : LE CURSEUR (« fais comme dans la simulation ») : la piste,
#                    le bouton qui glisse, l'escalier redessiné en direct ;
#                    arrêts à 4, 16, 64 ; σ = √n / 2 ; pas = 2 / √n ;
#   · 07-aire      : une marche surlignée, hauteur = probabilité ÷ pas, aire 1 ;
#   · 08/09        : question-pause n° 2 (A : 0,25 → √64 = 8, 2 ÷ 8 = 0,25) ;
#   · 10-limite    : le curseur file jusqu'à 1 000, l'escalier se lisse, la
#                    cloche bleue se pose, f(x) = 1/√(2π) × e^(−x²/2) ;
#   · 11-histoire  : frise 1733 Moivre, 1812 Laplace, fin du XIXe s. Galton ;
#   · 12/13        : question-pause n° 3 (B : 1/√(2π) ≈ 0,4 → e⁰ = 1) ;
#   · 14-partout   : trois vignettes (taille des élèves, erreurs de mesure,
#                    poids des paquets) + trois métiers ;
#   · 15-appris    : « Ce que tu as appris », titre en haut et centré ;
#   · 16-abonne    : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# L'escalier : B(n ; 1/2) centrée réduite, marches de largeur h = 2/√n et de
# hauteur C(n, k)/2ⁿ/h (aire totale 1), calculé en Python (lgamma).
# Vérifié en Python : C(4, 2) = 6 ; 2⁴ = 16 ; 2/√64 = 0,25 ; 1/√(2π) ≈ 0,399.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos avant chaque
#   apparition (marques mot à mot : loi_normale_escalier_marques.json).
#
# Voix : manim/voix/terminale-loi-normale-escalier.json (débit −6).
# Contrôle des bords en dry run : BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/loi_normale_escalier.py LoiNormaleEscalierTerminale -o eleveai-maths-terminale-loi-normale-escalier --media_dir manim/scripts/terminale/media-loi_normale
# Sortie : manim/sorties/terminale/maths/probabilites/loi-normale-escalier/

import math
import os
import random
import sys
from itertools import combinations
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

assert math.comb(4, 2) == 6 and 2 ** 4 == 16
assert abs(2 / math.sqrt(64) - 0.25) < 1e-12
assert f"{1 / math.sqrt(2 * math.pi):.3f}" == "0.399"

BLEU_NORMALE = "#60A5FA"
BOIS = "#A16207"
FOND_BOIS = "#2a1d10"
CLOU = "#D1D5DB"
FOND_CARTE = "#0b1220"
COULEURS_CHEMINS = [BLEU_CALCUL, VERT_OK, JAUNE_TITRE, VIOLET_ACCENT, "#F472B6", ORANGE_RETENUE]

X_MAX = 3.5          # x de −3,5 à 3,5 (en écarts-types)
N_MAX = 1000         # le bout du curseur
XL, BORD_X = 2.2, 6.6  # la colonne de droite (marge de 3 % : 0,43 du bord)


def binom_reduite(n):
    """Les marches : (x_k, hauteur) pour k = 0..n, B(n ; 1/2) centrée réduite."""
    h = 2 / math.sqrt(n)
    return h, [((k - n / 2) * h,
                math.exp(math.lgamma(n + 1) - math.lgamma(k + 1) - math.lgamma(n - k + 1) - n * math.log(2)) / h)
               for k in range(n + 1)]


def phi(x):
    return math.exp(-x * x / 2) / math.sqrt(2 * math.pi)


class Repere:
    """Le repère du graphique : x en écarts-types, y en densité."""

    def __init__(self, x0=-2.3, y0=-1.75, sx=1.086, sy=11.0):
        self.x0, self.y0, self.sx, self.sy = x0, y0, sx, sy

    def G(self, x, y):
        return P(self.x0 + x * self.sx, self.y0 + y * self.sy)

    def axe(self):
        return Line(self.G(-X_MAX, 0), self.G(X_MAX, 0), stroke_width=2, color=GREY_B)

    def graduation(self, v, texte, fs=26):
        tr = Line(self.G(v, 0) + DOWN * 0.08, self.G(v, 0) + UP * 0.08, stroke_width=2, color=GREY_B)
        t = Text(texte, font_size=fs, color=GREY_A).next_to(tr, DOWN, buff=0.08)
        return VGroup(tr, t)

    def escalier(self, n, couleur=ORANGE_RETENUE, opacite=0.25):
        """Le contour de l'escalier, fermé sur l'axe, rogné à |x| ≤ X_MAX."""
        h, marches = binom_reduite(n)
        hauts, gauche, droite = [], None, None
        for xk, yk in marches:
            a, b = max(xk - h / 2, -X_MAX), min(xk + h / 2, X_MAX)
            if a >= b:
                continue
            gauche = a if gauche is None else gauche
            droite = b
            hauts += [self.G(a, yk), self.G(b, yk)]
        pts = [self.G(gauche, 0)] + hauts + [self.G(droite, 0)]
        m = VMobject(stroke_color=couleur, stroke_width=3, fill_color=couleur, fill_opacity=opacite)
        m.set_points_as_corners(pts + [pts[0]])
        if n <= 20:
            # les cloisons entre les cases : pour n = 1, les DEUX marches se voient
            for (_, y0), (xk, yk) in zip(marches, marches[1:]):
                a = xk - h / 2
                if -X_MAX < a < X_MAX:
                    m.add(Line(self.G(a, 0), self.G(a, min(y0, yk)), stroke_width=2, color=couleur))
        return m

    def marche(self, n, k, couleur=VERT_OK):
        h, marches = binom_reduite(n)
        xk, yk = marches[k]
        r = Rectangle(width=h * self.sx, height=yk * self.sy, stroke_color=couleur, stroke_width=4,
                      fill_color=couleur, fill_opacity=0.55)
        return r.move_to(self.G(xk, yk / 2))

    def cloche(self, couleur=BLEU_NORMALE, sw=5):
        return FunctionGraph(lambda x: self.y0 + phi((x - self.x0) / self.sx) * self.sy,
                             x_range=[self.x0 - X_MAX * self.sx, self.x0 + X_MAX * self.sx],
                             color=couleur, stroke_width=sw)


class Planche(VGroup):
    """La planche de Galton : n rangées de clous (le clou du haut en `haut`),
    n + 1 cases dessous, un cadre de bois."""

    def __init__(self, n, dx, dy, haut, hcase=1.6, r_clou=0.055, cadre=True):
        super().__init__()
        self.n, self.dx, self.dy = n, dx, dy
        self.xh, self.yh = haut
        self.clous = VGroup(*[VGroup(*[Dot(self.pos_clou(r, j), radius=r_clou, color=CLOU) for j in range(r + 1)])
                              for r in range(n)])
        self.y_cases = self.yh - (n - 1) * dy - dy * 0.75
        self.y_fond = self.y_cases - hcase
        murs = VGroup(*[Line(P(self.x_case(k) - dx / 2, self.y_cases), P(self.x_case(k) - dx / 2, self.y_fond),
                             stroke_width=3, color=GREY_B) for k in range(n + 2)])
        fond = Line(P(self.x_case(0) - dx / 2, self.y_fond), P(self.x_case(n) + dx / 2, self.y_fond),
                    stroke_width=3, color=GREY_B)
        self.cases = VGroup(murs, fond)
        self.cadre = VGroup()
        if cadre:
            tout = VGroup(self.clous, self.cases)
            self.cadre = RoundedRectangle(width=tout.width + 0.5, height=tout.height + 0.75, corner_radius=0.15,
                                          stroke_color=BOIS, stroke_width=5, fill_color=FOND_BOIS, fill_opacity=1)
            self.cadre.move_to(tout).shift(UP * 0.12)
        self.add(self.cadre, self.cases, self.clous)

    def pos_clou(self, r, j):
        return P(self.xh + (j - r / 2) * self.dx, self.yh - r * self.dy)

    def x_case(self, k):
        return self.xh + (k - self.n / 2) * self.dx

    def chemin_bille(self, droites, rb=0.1, pile=0):
        """Les points d'arrêt de la bille : au-dessus de chaque clou, puis la case."""
        pts, j = [], 0
        for r in range(self.n):
            pts.append(self.pos_clou(r, j) + UP * (rb + 0.06))
            j += droites[r]
        pts.append(P(self.x_case(j), self.y_fond + rb + 0.03 + pile * 2 * rb))
        return pts, j

    def trace(self, droites, couleur, decal=0.0):
        """Le chemin dessiné (pour compter les chemins) : clou par clou, puis la case."""
        pts, j = [], 0
        for r in range(self.n):
            pts.append(self.pos_clou(r, j) + RIGHT * decal)
            j += droites[r]
        pts.append(P(self.x_case(j) + decal, self.y_cases - 0.3))
        m = VMobject(stroke_color=couleur, stroke_width=5)
        m.set_points_as_corners(pts)
        return m


def bille(couleur=ORANGE_RETENUE, r=0.1):
    return Dot(radius=r, color=couleur).set_stroke(WHITE, 1)


class LoiNormaleEscalierBase(MotsCales, Notion6e):
    fichier_marques = "loi_normale_escalier_marques.json"
    nom_voix = "terminale-loi-normale-escalier"
    identite = "Maths Tle — EleveAI"
    ceinture = "noire"

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
        if os.environ.get("BORDS"):
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

    # ── contrôle des bords en dry run (BORDS=1) ─────────────────────────────

    def play(self, *a, **k):
        super().play(*a, **k)
        if os.environ.get("BORDS"):
            self._bords()

    def _bords(self):
        mx, my = config.frame_width / 2 - 0.43, config.frame_height / 2 - 0.43
        margo = getattr(self, "_margo", None)
        for m in self.mobjects:
            if m is margo or m.width == 0:
                continue
            g, d, h, b = m.get_left()[0], m.get_right()[0], m.get_top()[1], m.get_bottom()[1]
            if g < -mx - 0.01 or d > mx + 0.01 or h > my + 0.01 or b < -my - 0.01:
                print(f"BORD {self._cle_voix} t={self.renderer.time:.1f} {type(m).__name__} "
                      f"[{g:.2f}, {d:.2f}] × [{b:.2f}, {h:.2f}]", flush=True)
            if margo is not None and margo in self.mobjects:
                if d > margo.get_left()[0] - 0.05 and b < margo.get_top()[1] + 0.05 and m.width < 9:
                    print(f"MARGO {self._cle_voix} t={self.renderer.time:.1f} {type(m).__name__} "
                          f"[{g:.2f}, {d:.2f}] × [{b:.2f}, {h:.2f}]", flush=True)

    # ── la question-pause (modèle : question_pause de 4e/frac_lotd_commun.py) ──

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

    def q_tete(self, question, choix, y_q=2.35):
        """« Question ! » + compte à rebours, la question (lignes), les 3 cartes,
        la consigne. Rien n'est joué ici."""
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[self.t(x, 32) for x in question]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        """Chaque carte À SA LETTRE, son contenu À SON NOMBRE."""
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
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.2).move_to(b[0].get_right() + LEFT * 0.35)
        self.play(b.animate.scale(1.08), Create(ok), run_time=0.2)
        self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()), run_time=0.2)
        return ok

    # ── le curseur ──────────────────────────────────────────────────────────

    def curseur(self, n, y=-2.95, xa=-5.35, xb=0.75):
        def xc(v):
            return xa + (xb - xa) * math.log(max(v, 1)) / math.log(N_MAX)
        piste = Line(P(xa, y), P(xb, y), stroke_width=7, color=GREY_D)
        rempli = always_redraw(lambda: Line(P(xa, y), P(xc(n.get_value()) + 1e-3, y), stroke_width=7,
                                            color=BLEU_CALCUL))
        bouton = always_redraw(lambda: Circle(radius=0.15, fill_color=WHITE, fill_opacity=1,
                                              stroke_color=BLEU_CALCUL, stroke_width=3)
                               .move_to(P(xc(n.get_value()), y)))
        nom = self.t("n", 32, BLEU_CALCUL).move_to(P(xa - 0.45, y))
        return piste, rempli, bouton, nom

    # ── 00 : la planche de Galton à la fête foraine ─────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.add_mascotte()
        self.dire("00-accroche")
        couleurs = [ROUGE_ERREUR, JAUNE_TITRE, BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT]
        corde = Line(P(-6.5, 3.5), P(6.5, 3.5), stroke_width=2, color=GREY_B)
        fanions = VGroup(*[Triangle(fill_color=couleurs[i % 6], fill_opacity=1, stroke_width=0)
                           .scale(0.17).rotate(PI).move_to(P(-6.2 + i * 0.775, 3.37)) for i in range(17)])
        fete = self.col(self.t("À la fête foraine", 38, JAUNE_TITRE), 2.45)
        self.au_mot("À la fête")
        self.play(Create(corde), LaggedStart(*[FadeIn(f, shift=DOWN * 0.1) for f in fanions], lag_ratio=0.04),
                  FadeIn(fete, shift=DOWN * 0.1), run_time=0.6)
        pl = Planche(6, 0.75, 0.55, (-2.0, 2.2), hcase=1.85)
        self.au_mot("une bille")
        b = bille().move_to(P(-2.0, 2.75))
        self.play(FadeIn(b, scale=2), run_time=0.3)
        self.au_mot("planche")
        self.play(FadeIn(pl.cadre), Create(pl.cases), run_time=0.5)
        self.add_foreground_mobject(b)
        self.au_mot("clous")
        self.play(LaggedStart(*[FadeIn(r, scale=1.5) for r in pl.clous], lag_ratio=0.15), run_time=0.6)
        self.au_mot("rebondit")
        rng = random.Random(7)
        droites = [1, 0, 1, 1, 0, 1]
        pts, k = pl.chemin_bille(droites)
        for p in pts[:3]:
            self.play(b.animate.move_to(p), run_time=0.24, rate_func=rate_functions.ease_in_quad)
        self.au_mot("rebondit", n=2)
        for p in pts[3:-1]:
            self.play(b.animate.move_to(p), run_time=0.24, rate_func=rate_functions.ease_in_quad)
        self.au_mot("tombe dans une case")
        self.play(b.animate.move_to(pts[-1]), run_time=0.5, rate_func=rate_functions.ease_in_quad)
        self.play(Indicate(b, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.4)
        self.au_mot("Où va-t-elle")
        ou = self.col(self.t("Où va-t-elle finir ?", 44, BLEU_CALCUL), 0.6)
        self.play(FadeIn(ou, scale=1.3), run_time=0.4)
        # d'autres billes : elles s'empilent, déjà en cloche
        piles = [0] * 7
        piles[k] = 1
        billes, anims = VGroup(), []
        for _ in range(22):
            d = [rng.randint(0, 1) for _ in range(6)]
            kk = sum(d)
            pts2, _ = pl.chemin_bille(d, pile=piles[kk])
            piles[kk] += 1
            bb = bille(BLEU_CALCUL, 0.1).move_to(pts2[-1])
            billes.add(bb)
            anims.append(FadeIn(bb, shift=DOWN * 0.6))
        self.play(LaggedStart(*anims, lag_ratio=0.12), run_time=1.6)
        self.attendre_voix(marge=0.6)
        self.remove_foreground_mobject(b)

    # ── 01 : page de garde ──────────────────────────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("01-titre")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.5), DOWN)
        self.add(ech)
        titre = self.t("L'escalier et la cloche", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("L'escalier")
        self.play(Write(titre), run_time=0.8)
        rep = Repere(x0=-0.6, y0=-1.75, sx=0.6, sy=4.5)
        esc = rep.escalier(12)
        axe = rep.axe()
        self.au_mot("loi binomiale")
        s1 = self.t("la loi binomiale", 40, ORANGE_RETENUE)
        s2 = self.t("devient la loi normale", 40, BLEU_NORMALE)
        sous = VGroup(s1, s2).arrange(RIGHT, buff=0.22).next_to(titre, DOWN, buff=0.25)
        self.play(FadeIn(s1, shift=UP * 0.15), Create(axe), FadeIn(esc, shift=UP * 0.2), run_time=0.6)
        self.au_mot("devient")
        self.play(FadeIn(s2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("loi normale")
        cl = rep.cloche()
        self.play(Create(cl), run_time=0.8)
        ident = self.t(self.identite, 26, GREY_A).next_to(sous, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 02 : un clou, deux cases, deux marches ──────────────────────────────

    def ecran_un_clou(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-un-clou")
        rep = Repere()
        G = rep.G
        axe = rep.axe()
        clou = Dot(G(0, 0.36), radius=0.08, color=CLOU)
        b = bille().move_to(G(0, 0.36) + UP * 1.0)
        self.au_mot("Un seul clou")
        self.play(Create(axe), FadeIn(clou, scale=2), FadeIn(b), run_time=0.5)
        self.play(b.animate.move_to(clou.get_center() + UP * 0.18), rate_func=rate_functions.ease_in_quad,
                  run_time=0.4)
        self.au_mot("à gauche")
        fl_g = Arrow(clou.get_center(), G(-1, 0.27), buff=0.12, color=BLEU_CALCUL, stroke_width=5)
        self.play(GrowArrow(fl_g), run_time=0.3)
        self.au_mot("à droite")
        fl_d = Arrow(clou.get_center(), G(1, 0.27), buff=0.12, color=BLEU_CALCUL, stroke_width=5)
        self.play(GrowArrow(fl_d), run_time=0.3)
        self.au_mot("une chance sur deux")
        chance = self.col(self.t("1 chance sur 2", 44, BLEU_CALCUL), 1.6)
        self.play(FadeIn(chance, scale=1.3), run_time=0.4)
        self.au_mot("Deux cases")
        cases = VGroup(*[Rectangle(width=2 * rep.sx, height=0.25 * rep.sy, stroke_color=WHITE, stroke_width=2)
                         .move_to(G(x, 0.125)) for x in (-1, 1)])
        self.play(FadeIn(cases), b.animate.move_to(G(-1, 0) + UP * 0.12), run_time=0.5)
        self.au_mot("deux marches")
        marches = rep.escalier(1)
        self.play(FadeOut(VGroup(fl_g, fl_d, b, clou)), ReplacementTransform(cases, marches), run_time=0.6)
        self.au_mot("même hauteur")
        niv = DashedLine(G(-2, 0.25), G(2, 0.25), color=JAUNE_TITRE, stroke_width=3)
        self.play(Create(niv), run_time=0.4)
        self.play(FadeOut(niv), run_time=0.3)
        self.au_mot("en 0")
        g0 = rep.graduation(0, "0")
        self.play(FadeIn(g0, scale=1.5), run_time=0.3)
        self.au_mot("moins 2")
        gm = rep.graduation(-2, "−2")
        self.play(FadeIn(gm, scale=1.5), run_time=0.3)
        self.au_mot("à 2")
        gp = rep.graduation(2, "2")
        self.play(FadeIn(gp, scale=1.5), run_time=0.3)
        self.au_mot("leur pas")
        acc = Brace(Line(G(0.03, 0.25), G(1.97, 0.25)), UP, buff=0.06, color=VERT_OK)
        pas = self.ligne(self.t("pas =", 44, VERT_OK), y=0.3)
        self.play(GrowFromCenter(acc), FadeIn(pas), run_time=0.4)
        self.au_mot("vaut 2")
        self.au_pos(self._texte_voix.rfind("2"))
        pas2 = self.ligne(self.t("pas =", 44, VERT_OK), self.t("2", 48, VERT_OK), y=0.3)
        deux = self.t("2", 36, VERT_OK).next_to(acc, UP, buff=0.08)
        self.play(ReplacementTransform(pas, pas2), FadeIn(deux, scale=1.5), run_time=0.35)
        self.insister(pas2[1], 1.4)
        self.attendre_voix(marge=0.6)

    # ── 03 : n rangées, la loi binomiale ────────────────────────────────────

    def ecran_rangees(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-rangees")
        pl = Planche(5, 0.9, 0.62, (-3.4, 2.5), hcase=1.45)
        self.play(FadeIn(pl.cadre), FadeIn(pl.cases), FadeIn(pl.clous), run_time=0.4)
        self.au_mot("Chaque rangée")
        cadre_r = SurroundingRectangle(pl.clous[2], color=JAUNE_TITRE, buff=0.14, corner_radius=0.1)
        self.play(Create(cadre_r), run_time=0.4)
        self.au_mot("épreuve de Bernoulli")
        e1 = self.col(self.t("épreuve de Bernoulli", 38, JAUNE_TITRE), 2.6)
        self.play(FadeIn(e1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("un demi")
        p12 = self.ligne(self.t("p =", 40), self.t("1/2", 44, BLEU_CALCUL), y=1.85)
        self.play(FadeIn(p12, scale=1.3), run_time=0.4)
        self.au_mot("n rangées")
        xa = pl.cadre.get_right()[0] + 0.12
        acc = Brace(Line(P(xa, pl.yh + 0.1), P(xa, pl.yh - 4 * pl.dy - 0.1)), RIGHT, buff=0.05, color=BLEU_CALCUL)
        nr = self.t("n rangées", 32, BLEU_CALCUL).next_to(acc, RIGHT, buff=0.1)
        self.play(FadeOut(cadre_r), GrowFromCenter(acc), FadeIn(nr, shift=LEFT * 0.1), run_time=0.5)
        self.au_mot("la case d'arrivée")
        b = bille().move_to(pl.pos_clou(0, 0) + UP * 0.6)
        self.add_foreground_mobject(b)
        pts, k = pl.chemin_bille([0, 1, 1, 0, 1])
        xl = self.ligne(self.t("X :", 40, JAUNE_TITRE), self.t("la case d'arrivée", 36), y=0.75)
        self.play(FadeIn(b), FadeIn(xl, shift=UP * 0.15), run_time=0.3)
        self.play(Succession(*[b.animate(run_time=0.13, rate_func=rate_functions.ease_in_quad).move_to(p)
                               for p in pts]), run_time=0.9)
        self.au_mot("loi binomiale")
        loi = self.ligne(self.t("X suit", 40), self.t("B(n ; 1/2)", 44, ORANGE_RETENUE), y=0.0)
        loi.scale_to_fit_width(min(loi.width, 3.9)).align_to(P(XL + 0.15, 0), LEFT)
        self.play(FadeIn(loi[0]), Write(loi[1]), run_time=0.7)
        cad = SurroundingRectangle(loi, color=ORANGE_RETENUE, buff=0.15, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.au_mot("n plus 1")
        acc2 = Brace(Line(P(pl.x_case(0) - pl.dx / 2, pl.y_fond), P(pl.x_case(5) + pl.dx / 2, pl.y_fond)), DOWN,
                     buff=0.08, color=VERT_OK)
        nc = self.t("n + 1 cases", 34, VERT_OK).next_to(acc2, DOWN, buff=0.06)
        nc2 = self.col(self.t("n + 1 cases", 40, VERT_OK), -0.85)
        self.play(GrowFromCenter(acc2), FadeIn(nc, scale=1.3), FadeIn(nc2, scale=1.3), run_time=0.5)
        self.attendre_voix(marge=0.6)
        self.remove_foreground_mobject(b)

    # ── 04/05 : question-pause n° 1 ─────────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-question1")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(["Avec 4 rangées, combien", "de chemins mènent", "à la case du milieu ?"],
                                                      ["4", "6", "16"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        pl = Planche(4, 1.1, 0.8, (-2.6, 2.55), hcase=1.55)
        self.au_mot("4 rangées")
        self.play(FadeIn(q[0], shift=UP * 0.15), FadeIn(pl), run_time=0.5)
        self.au_mot("combien")
        self.play(FadeIn(q[1], shift=UP * 0.15), run_time=0.3)
        self.au_mot("case du milieu")
        milieu = Rectangle(width=pl.dx, height=pl.y_cases - pl.y_fond, stroke_width=0, fill_color=JAUNE_TITRE,
                           fill_opacity=0.35).move_to(P(pl.x_case(2), (pl.y_cases + pl.y_fond) / 2))
        self.play(FadeIn(q[2], shift=UP * 0.15), FadeIn(milieu), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04-question1", t0, 1)
        # la réponse
        self.dire("05-reponse1")
        self.q_reponse(cartes, 1, pause, rebours)
        y0 = cartes.get_bottom()[1] - 0.5
        self.au_mot("2 parmi 4")
        l1 = self.ligne(self.t("2 parmi 4", 38, BLEU_CALCUL), self.t("=", 38), self.t("6", 42, VERT_OK), y=y0)
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("6 chemins")
        chemins = [c for c in combinations(range(4), 2)]
        traces = VGroup()
        for i, c in enumerate(chemins):
            d = [1 if r in c else 0 for r in range(4)]
            traces.add(pl.trace(d, COULEURS_CHEMINS[i], decal=(i - 2.5) * 0.045))
        self.play(FadeIn(l1[1:], scale=1.4), LaggedStart(*[Create(tr) for tr in traces], lag_ratio=0.15),
                  run_time=0.9)
        self.au_mot("sur 16")
        self.au_pos(self._texte_voix.find("16"))
        l2 = self.ligne(self.t("6 / 16", 42, VERT_OK), y=y0 - 0.7)
        self.play(FadeIn(l2, scale=1.4), run_time=0.35)
        self.au_mot("case du milieu")
        hb = pl.y_cases - pl.y_fond - 0.15
        barres = VGroup(*[Rectangle(width=pl.dx * 0.7, height=hb * c / 6, stroke_width=0, fill_color=ORANGE_RETENUE,
                                    fill_opacity=0.9).move_to(P(pl.x_case(k), pl.y_fond + hb * c / 12))
                          for k, c in enumerate([1, 4, 6, 4, 1])])
        self.play(FadeOut(traces), FadeOut(milieu), LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres],
                                                                lag_ratio=0.1), run_time=0.7)
        self.au_mot("la plus haute")
        self.play(barres[2].animate.set_fill(VERT_OK), Indicate(barres[2], color=VERT_OK, scale_factor=1.2),
                  run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 06 → 10 : le curseur et l'escalier (un seul décor) ─────────────────

    def ecrans_curseur(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-curseur")
        rep = Repere()
        G = rep.G
        axe = rep.axe()
        grads = VGroup(*[rep.graduation(v, s) for v, s in ((-2, "−2"), (0, "0"), (2, "2"))])
        n = ValueTracker(1)
        esc = always_redraw(lambda: rep.escalier(max(1, round(n.get_value()))))
        piste, rempli, bouton, nom = self.curseur(n)
        self.add(axe, grads, esc)
        self.play(FadeIn(VGroup(axe, grads)), run_time=0.3)
        self.au_mot("bouger le curseur")
        self.play(FadeIn(piste), FadeIn(rempli), FadeIn(bouton), FadeIn(nom), run_time=0.5)
        self.play(Indicate(bouton, color=BLEU_CALCUL, scale_factor=1.5), run_time=0.5)
        ys = 2.6
        self.au_mot("4 rangées")
        l4 = self.col(self.t("4 rangées", 42, BLEU_CALCUL), ys)
        self.play(n.animate.set_value(4), FadeIn(l4), run_time=0.8)
        self.au_mot("16 rangées")
        l16 = self.col(self.t("16 rangées", 42, BLEU_CALCUL), ys)
        self.play(n.animate.set_value(16), ReplacementTransform(l4, l16), run_time=0.85)
        self.au_mot("64 rangées")
        l64 = self.col(self.t("64 rangées", 42, BLEU_CALCUL), ys)
        self.play(n.animate.set_value(64), ReplacementTransform(l16, l64), run_time=0.9)
        self.au_mot("On centre")
        cr = self.col(self.t("centrée et réduite", 36, JAUNE_TITRE), 1.75)
        self.play(FadeIn(cr, shift=UP * 0.15), run_time=0.4)
        fs = 44
        self.au_mot("l'écart-type")
        sig = self.ligne(self.t("σ =", fs), self.t("√n", fs, BLEU_CALCUL), self.t("/ 2", fs, BLEU_CALCUL), y=0.8)
        self.play(FadeIn(sig[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("racine de n")
        self.play(FadeIn(sig[1], scale=1.4), run_time=0.3)
        self.au_mot("sur 2")
        self.play(FadeIn(sig[2], scale=1.4), run_time=0.3)
        self.au_mot("le pas des marches")
        pas = self.ligne(self.t("pas =", fs, VERT_OK), self.t("2", fs + 4, VERT_OK), self.t("/ √n", fs + 4, VERT_OK),
                         y=-0.3)
        self.play(FadeIn(pas[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("2 sur racine")
        self.play(FadeIn(pas[1], scale=1.4), run_time=0.25)
        self.au_mot("racine de n.")
        self.play(FadeIn(pas[2], scale=1.4), run_time=0.3)
        cad = SurroundingRectangle(pas, color=VERT_OK, buff=0.14, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(pas, cad), 1.15)
        self.attendre_voix(marge=0.5)

        # ── 07 : une marche, son aire ──
        self.dire("07-aire")
        self.au_mot("Chaque marche")
        self.play(FadeOut(VGroup(l64, cr, sig, pas, cad)), n.animate.set_value(16), run_time=0.5)
        m8 = rep.marche(16, 8)
        self.play(FadeIn(m8), run_time=0.3)
        self.au_mot("hauteur")
        h, marches = binom_reduite(16)
        yh = marches[8][1]
        fl = DoubleArrow(G(0.42, 0), G(0.42, yh), buff=0, color=JAUNE_TITRE, stroke_width=4, tip_length=0.18)
        fl.shift(RIGHT * 0.1)
        hl = self.ligne(self.t("hauteur =", 40, JAUNE_TITRE), y=2.4)
        self.play(GrowFromCenter(fl), FadeIn(hl, shift=UP * 0.15), run_time=0.4)
        self.au_mot("probabilité")
        hl2 = self.ligne(self.t("hauteur =", 40, JAUNE_TITRE), self.t("probabilité", 40), y=2.4)
        self.play(ReplacementTransform(hl, hl2), run_time=0.35)
        self.au_mot("divisée par le pas")
        hl3 = self.col(VGroup(hl2.copy(), self.t("÷ pas", 40, VERT_OK)).arrange(DOWN, aligned_edge=RIGHT, buff=0.12),
                       2.05)
        self.play(ReplacementTransform(hl2, hl3[0]), FadeIn(hl3[1], shift=LEFT * 0.15), run_time=0.4)
        acc = Brace(m8, DOWN, buff=0.04, color=VERT_OK)
        self.play(GrowFromCenter(acc), run_time=0.3)
        self.au_mot("l'aire totale")
        aire = self.ligne(self.t("aire totale =", 42, VERT_OK), y=0.5)
        tout = rep.escalier(16, couleur=VERT_OK, opacite=0.45)
        self.play(FadeIn(aire[0], shift=UP * 0.15), FadeOut(VGroup(m8, fl, acc)), FadeIn(tout), run_time=0.5)
        self.au_mot("1.")
        aire2 = self.ligne(self.t("aire totale =", 42, VERT_OK), self.t("1", 52, VERT_OK), y=0.5)
        self.play(ReplacementTransform(aire, aire2), run_time=0.3)
        self.insister(aire2[1], 1.5)
        self.attendre_voix(marge=0.4)

        # ── 08/09 : question-pause n° 2 ──
        self.dire("08-question2")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(["Avec 64 rangées, quel est", "le pas des marches ?"],
                                                      ["0,25", "0,5", "2"])
        self.au_mot("Question")
        self.play(FadeOut(VGroup(hl3, aire2, tout)), FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("64 rangées")
        self.play(n.animate.set_value(64), FadeIn(q[0], shift=UP * 0.15), run_time=0.7)
        self.au_mot("le pas des marches")
        self.play(FadeIn(q[1], shift=UP * 0.15), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "08-question2", t0, 0)
        self.dire("09-reponse2")
        ok = self.q_reponse(cartes, 0, pause, rebours)
        y0 = cartes.get_bottom()[1] - 0.5
        self.au_mot("Racine de 64")
        r1 = self.ligne(self.t("√64", 42, BLEU_CALCUL), self.t("=", 42), self.t("8", 44, BLEU_CALCUL), y=y0)
        self.play(FadeIn(r1[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("vaut 8")
        self.au_pos(self._texte_voix.find("8"))
        self.play(FadeIn(r1[1:], scale=1.4), run_time=0.3)
        self.au_mot("et 2 divisé")
        self.au_pos(self._texte_voix.find("2 divisé"))
        r2 = self.ligne(self.t("2 ÷ 8", 42, VERT_OK), self.t("=", 42), self.t("0,25", 46, VERT_OK), y=y0 - 0.7)
        self.play(FadeIn(r2[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("donne 0,25")
        self.au_pos(self._texte_voix.rfind("0,25"))
        h64, m64 = binom_reduite(64)
        xk = m64[32][0]
        acc = Brace(Line(G(xk - h64 / 2, m64[32][1]), G(xk + h64 / 2, m64[32][1])), UP, buff=0.05, color=VERT_OK)
        v = self.t("0,25", 30, VERT_OK).next_to(acc, UP, buff=0.06)
        self.play(FadeIn(r2[1:], scale=1.4), GrowFromCenter(acc), FadeIn(v, scale=1.4), run_time=0.4)
        self.insister(r2[2], 1.2)
        self.attendre_voix(marge=0.6)

        # ── 10 : n → ∞ : l'escalier devient la cloche ──
        self.dire("10-limite")
        self.au_mot("Quand n tend")
        ni = self.ligne(self.t("n →", 44, BLEU_CALCUL), self.t("+∞", 44, BLEU_CALCUL), y=2.6)
        # le curseur file de 64 à N_MAX PENDANT que la voix parle (un updater,
        # pour écrire « +∞ », « pas → 0 » à leurs mots sans l'arrêter)
        etat = {"t": 0.0}
        duree = 5.0

        def filer(m, dt):
            etat["t"] += dt
            s = rate_functions.ease_in_out_sine(min(1.0, etat["t"] / duree))
            m.set_value(64 * (N_MAX / 64) ** s)

        n.add_updater(filer)
        self.play(FadeOut(VGroup(tete, q, cartes, ok, r1, r2, acc, v)), FadeIn(ni[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("l'infini")
        inf = self.t("∞", 34, BLEU_CALCUL).next_to(piste, RIGHT, buff=0.15)
        self.play(FadeIn(ni[1], scale=1.4), FadeIn(inf, scale=1.4), run_time=0.3)
        self.au_mot("le pas tend")
        pz = self.ligne(self.t("pas →", 44, VERT_OK), self.t("0", 44, VERT_OK), y=1.85)
        self.play(FadeIn(pz[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("vers 0")
        self.au_pos(self._texte_voix.find("0."))
        self.play(FadeIn(pz[1], scale=1.4), run_time=0.3)
        self.au_mot("Les marches disparaissent")
        self.play(Indicate(pz, color=VERT_OK, scale_factor=1.15), run_time=0.6)
        if etat["t"] < duree:
            self.wait(duree - etat["t"] + 0.05)
        n.remove_updater(filer)
        n.set_value(N_MAX)
        self.au_mot("courbe en cloche")
        cl = rep.cloche()
        self.play(Create(cl), run_time=1.0)
        self.au_mot("loi normale")
        ln = self.col(self.t("loi normale", 44, BLEU_NORMALE), 0.95)
        self.play(FadeIn(ln, scale=1.3), run_time=0.35)
        self.au_mot("1 sur racine")
        un = Text("1", font_size=40)
        barre = Line(LEFT * 0.42, RIGHT * 0.42, stroke_width=3)
        rac = Text("√(2π)", font_size=36)
        frac = VGroup(un, barre, rac).arrange(DOWN, buff=0.08)
        fx = Text("f(x) =", font_size=40)
        expo = puissance("e", "−x²/2", 48)
        fois = Text("×", font_size=40)
        formule = VGroup(fx, frac, fois, expo).arrange(RIGHT, buff=0.15)
        formule.set_color(BLEU_NORMALE)
        self.col(formule, -0.35)
        self.play(FadeIn(fx), FadeIn(un, shift=UP * 0.1), Create(barre), run_time=0.35)
        self.au_mot("2 pi")
        self.play(FadeIn(rac, shift=UP * 0.1), run_time=0.35)
        self.au_mot("fois e puissance")
        self.play(FadeIn(fois), FadeIn(expo[0], scale=1.4), run_time=0.3)
        self.au_mot("moins x carré")
        self.play(FadeIn(expo[1], scale=1.8), run_time=0.35)
        self.play(Circumscribe(formule, color=BLEU_NORMALE), run_time=0.8)
        self.attendre_voix(marge=0.6)
        esc.clear_updaters()
        rempli.clear_updaters()
        bouton.clear_updaters()

    # ── 11 : la frise ───────────────────────────────────────────────────────

    def ecran_histoire(self):
        self.clear()
        self.add_mascotte()
        self.dire("11-histoire")
        self.au_mot("théorème")
        tit = self.t("Le théorème de Moivre-Laplace", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.8)
        yl = 0.15
        frise = Arrow(P(-6.4, yl), P(6.4, yl), buff=0, color=GREY_B, stroke_width=4, max_tip_length_to_length_ratio=0.02)
        self.play(GrowArrow(frise), run_time=0.6)
        xs = [-4.3, -0.4, 3.6]

        def jalon(x, annee, nom, quoi, dessin, c):
            pt = Dot(P(x, yl), radius=0.1, color=c)
            a = annee if isinstance(annee, Mobject) else self.t(annee, 40, c)
            a.move_to(P(x, yl + 0.55))
            d = dessin.move_to(P(x, yl + 1.75))
            no = self.t(nom, 30, WHITE, larg=3.5).move_to(P(x, yl - 0.55))
            qu = self.t(quoi, 28, c, larg=3.5).move_to(P(x, yl - 1.05))
            return pt, a, d, no, qu

        # Moivre : l'escalier ; Laplace : la cloche ; Galton : la planche
        r1 = Repere(x0=0, y0=0, sx=0.4, sy=3.2)
        d1 = VGroup(r1.axe(), r1.escalier(16))
        r2 = Repere(x0=0, y0=0, sx=0.4, sy=3.2)
        d2 = VGroup(r2.axe(), r2.cloche(sw=4))
        d3 = Planche(4, 0.32, 0.25, (0, 0), hcase=0.45, r_clou=0.035)
        for d in (d1, d2, d3):
            d.scale_to_fit_height(1.25)
        sie = VGroup(puissance("fin du XIX", "e", 36, BLEU_CALCUL), self.t("siècle", 36, BLEU_CALCUL))
        sie.arrange(RIGHT, buff=0.15)
        sie[1].align_to(sie[0][0], DOWN)
        j1 = jalon(xs[0], "1733", "Abraham de Moivre", "l'a découvert", d1, ORANGE_RETENUE)
        j2 = jalon(xs[1], "1812", "Pierre-Simon Laplace", "l'a généralisé", d2, BLEU_NORMALE)
        j3 = jalon(xs[2], sie, "Francis Galton", "a construit la planche", d3, BLEU_CALCUL)
        self.au_mot("Abraham")
        self.play(FadeIn(j1[0], scale=2), FadeIn(j1[3], shift=UP * 0.1), run_time=0.4)
        self.au_mot("découvert")
        self.play(FadeIn(j1[4]), FadeIn(j1[2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("1733")
        self.play(FadeIn(j1[1], scale=1.5), run_time=0.35)
        self.au_mot("Pierre-Simon")
        self.play(FadeIn(j2[0], scale=2), FadeIn(j2[3], shift=UP * 0.1), run_time=0.4)
        self.au_mot("généralisé")
        self.play(FadeIn(j2[4]), FadeIn(j2[2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("1812")
        self.play(FadeIn(j2[1], scale=1.5), run_time=0.35)
        self.au_mot("Francis Galton")
        self.play(FadeIn(j3[0], scale=2), FadeIn(j3[3], shift=UP * 0.1), run_time=0.4)
        self.au_mot("construit")
        self.play(FadeIn(j3[4]), FadeIn(j3[2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("fin du")
        self.play(FadeIn(j3[1], scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 12/13 : question-pause n° 3 ─────────────────────────────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        self.dire("12-question3")
        t0 = self.renderer.time
        rep = Repere()
        G = rep.G
        fond = VGroup(rep.axe(), *[rep.graduation(v, s) for v, s in ((-2, "−2"), (0, "0"), (2, "2"))],
                      rep.escalier(N_MAX, opacite=0.12).set_stroke(opacity=0.35))
        cl = rep.cloche()
        self.add(fond, cl)
        frac = VGroup(Text("1", font_size=32), Line(LEFT * 0.32, RIGHT * 0.32, stroke_width=2.5),
                      Text("√(2π)", font_size=28)).arrange(DOWN, buff=0.06)
        corps_b = VGroup(frac, Text("≈ 0,4", font_size=32)).arrange(RIGHT, buff=0.18)
        tete, q, cartes, pause, rebours = self.q_tete(["La cloche est la plus haute", "en 0. Que vaut", "cette hauteur ?"],
                                                      ["1", corps_b, "0,5"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("La cloche")
        self.play(FadeIn(q[0], shift=UP * 0.15), Indicate(cl, color=BLEU_NORMALE, scale_factor=1.03), run_time=0.5)
        self.au_mot("en 0")
        y0 = phi(0)
        vert = DashedLine(G(0, 0), G(0, y0), color=JAUNE_TITRE, stroke_width=4)
        som = Dot(G(0, y0), radius=0.09, color=JAUNE_TITRE)
        self.play(FadeIn(q[1][:3], shift=UP * 0.15), Create(vert), FadeIn(som, scale=2), run_time=0.4)
        self.au_mot("Que vaut")
        self.play(FadeIn(q[1][3:], shift=UP * 0.15), FadeIn(q[2], shift=UP * 0.15), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "12-question3", t0, 1)
        self.dire("13-reponse3")
        self.q_reponse(cartes, 1, pause, rebours)
        yb = cartes.get_bottom()[1] - 0.5
        self.au_pos(self._texte_voix.find("0,"))
        x0l = self.t("x = 0", 30, JAUNE_TITRE).next_to(som, UR, buff=0.12)
        self.play(FadeIn(x0l, scale=1.3), run_time=0.3)
        self.au_mot("e puissance 0")
        l1 = self.ligne(puissance("e", "0", 46, VERT_OK), self.t("=", 42), self.t("1", 44, VERT_OK), y=yb)
        self.play(FadeIn(l1[0][0], shift=UP * 0.15), run_time=0.25)
        self.au_pos(self._texte_voix.find("0 vaut"))
        self.play(FadeIn(l1[0][1], scale=1.5), run_time=0.25)
        self.au_mot("vaut 1")
        self.au_pos(self._texte_voix.find("1 :"))
        self.play(FadeIn(l1[1:], scale=1.4), run_time=0.3)
        self.au_mot("reste 1")
        self.au_pos(self._texte_voix.find("1 sur"))
        f2 = VGroup(Text("1", font_size=36, color=VERT_OK), Line(LEFT * 0.36, RIGHT * 0.36, stroke_width=3, color=VERT_OK),
                    Text("√(2π)", font_size=32, color=VERT_OK)).arrange(DOWN, buff=0.06)
        l2 = self.ligne(f2, self.t("≈ 0,4", 44, VERT_OK), y=yb - 0.85, buff=0.2)
        self.play(FadeIn(f2[0], shift=UP * 0.1), Create(f2[1]), run_time=0.3)
        self.au_mot("2 pi")
        self.play(FadeIn(f2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 0,4")
        self.au_pos(self._texte_voix.find("0,4"))
        hor = DashedLine(G(0, y0), G(-X_MAX, y0), color=VERT_OK, stroke_width=3)
        lab = self.t("≈ 0,4", 30, VERT_OK).next_to(G(-X_MAX, y0), UP, buff=0.1).align_to(G(-X_MAX, 0), LEFT)
        self.play(FadeIn(l2[1], scale=1.4), Create(hor), FadeIn(lab, scale=1.3), run_time=0.4)
        self.insister(l2[1], 1.3)
        self.attendre_voix(marge=0.7)

    # ── 14 : la cloche est partout ──────────────────────────────────────────

    def vignette(self, dessin, x):
        carte = RoundedRectangle(width=3.45, height=3.0, corner_radius=0.18, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, 0.55))
        rep = Repere(x0=x, y0=1.25, sx=0.38, sy=2.1)
        cl = VGroup(rep.axe().set_stroke(width=1.5), rep.cloche(sw=4))
        dessin.move_to(P(x, 0.0))
        return VGroup(carte, cl, dessin)

    def ecran_partout(self):
        self.clear()
        self.add_mascotte()
        self.dire("14-partout")
        self.au_mot("Cette cloche")
        tit = self.t("Cette cloche est partout", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        xs = [-4.4, -0.5, 3.4]
        # des élèves de tailles différentes
        tailles = [0.75, 0.95, 1.1, 0.88, 1.02]
        peaux = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a21"]
        tenues = [BLEU_CALCUL, ORANGE_RETENUE, VERT_OK, VIOLET_ACCENT, "#F472B6"]
        eleves = VGroup()
        for i, (hh, pe, te) in enumerate(zip(tailles, peaux, tenues)):
            corps = RoundedRectangle(width=0.32, height=hh, corner_radius=0.1, fill_color=te, fill_opacity=1,
                                     stroke_width=0)
            tete = Circle(radius=0.14, fill_color=pe, fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=0.03)
            eleves.add(VGroup(corps, tete))
        eleves.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        # le laboratoire : une fiole et une règle
        fiole = Polygon(P(-0.12, 0.5), P(0.12, 0.5), P(0.12, 0.15), P(0.45, -0.5), P(-0.45, -0.5), P(-0.12, 0.15),
                        stroke_color=WHITE, stroke_width=3, fill_color="#0e7490", fill_opacity=0.5)
        regle = VGroup(Rectangle(width=1.5, height=0.3, fill_color="#FDE68A", fill_opacity=1, stroke_width=0),
                       *[Line(P(-0.7 + 0.14 * i, 0.15), P(-0.7 + 0.14 * i, 0.15 - (0.14 if i % 5 == 0 else 0.08)),
                              color="#1f2937", stroke_width=2) for i in range(11)])
        labo = VGroup(fiole, regle).arrange(RIGHT, buff=0.25, aligned_edge=DOWN)
        # l'usine : des paquets sur un tapis
        tapis = VGroup(Line(P(-1.3, 0), P(1.3, 0), stroke_width=4, color=GREY_B),
                       *[Circle(radius=0.1, stroke_color=GREY_B, stroke_width=3).move_to(P(-1.1 + 0.55 * i, -0.13))
                         for i in range(5)])
        paquets = VGroup(*[Square(side_length=0.5, fill_color="#B45309", fill_opacity=1, stroke_color="#FDE68A",
                                  stroke_width=2).move_to(P(-0.8 + 0.8 * i, 0.27)) for i in range(3)])
        usine = VGroup(tapis, paquets)
        v1 = self.vignette(eleves, xs[0])
        v2 = self.vignette(labo, xs[1])
        v3 = self.vignette(usine, xs[2])
        for v in (v1, v2, v3):
            v[2].move_to(P(v[0].get_center()[0], -0.25))
        lbs = [self.t(s, 28, BLEU_CALCUL).move_to(P(x, -1.3)) for s, x in
               zip(["taille des élèves", "erreurs de mesure", "poids des paquets"], xs)]
        for v, lb, mot in zip((v1, v2, v3), lbs, ["la taille", "les erreurs", "le poids"]):
            self.au_mot(mot)
            self.play(FadeIn(v[0]), FadeIn(v[2], shift=UP * 0.15), FadeIn(lb, shift=UP * 0.1), run_time=0.4)
            self.play(Create(v[1]), run_time=0.5)
        metiers = [self.t(s, 34, VERT_OK) for s in ("Statisticiens", "Ingénieurs qualité", "Météorologues")]
        ligne = VGroup(*metiers).arrange(RIGHT, buff=0.7)
        if ligne.width > 10.2:
            ligne.scale_to_fit_width(10.2)
        ligne.move_to(P(-0.5, -2.45))
        for m, mot in zip(metiers, ["Statisticiens", "ingénieurs qualité", "météorologues"]):
            self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix(marge=0.7)

    # ── 15 : ce que tu as appris ────────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("15-appris")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 44
        b1 = VGroup(self.t("La loi binomiale se dessine en escalier.", fs))
        b2r1 = self.t("Centrée et réduite, ses marches", fs)
        b2r2 = self.t("ont un pas de", fs)
        b2b = self.t("2 / √n.", fs + 2, VERT_OK)
        b2a = VGroup(b2r1, b2r2)
        b2 = VGroup(b2r1, VGroup(b2r2, b2b).arrange(RIGHT, buff=0.18)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        b3a = self.t("Quand n tend vers l'infini,", fs)
        b3b = self.t("l'escalier devient la loi normale.", fs, BLEU_NORMALE)
        b3 = VGroup(b3a, b3b).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in (b1, b2, b3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        lignes.move_to(P(-0.4, 0.2))
        self.au_mot("La loi binomiale")
        self.play(Create(lignes[0][0]), FadeIn(b1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Centrée")
        self.play(Create(lignes[1][0]), FadeIn(b2a, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("2 sur racine")
        self.play(FadeIn(b2b, scale=1.4), run_time=0.35)
        self.au_mot("Quand n")
        self.play(Create(lignes[2][0]), FadeIn(b3a, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("l'escalier devient")
        self.play(FadeIn(b3b, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 16 : la fin (règle du 19/10, comme proba_bin_defi.py) ──────────────

    def page_abonnement(self, voix="16-abonne"):
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
        self.ecran_accroche()
        self.ecran_titre()
        self.ecran_un_clou()
        self.ecran_rangees()
        self.ecran_question1()
        self.ecrans_curseur()
        self.ecran_histoire()
        self.ecran_question3()
        self.ecran_partout()
        self.ecran_appris()
        self.page_abonnement()


class LoiNormaleEscalierTerminale(LoiNormaleEscalierBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "noire"
