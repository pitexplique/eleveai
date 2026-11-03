# convexite_tangente.py
# EleveAI — Maths Tle spé — paysage « Convexité et tangentes » (16:9),
# ceinture VERTE. Micro du coach : convexite_tangente (lib/tutor-v4/
# questionBank/terminale-spe/maths/convexite.bank.ts : « au-dessus / au-dessous
# de ses tangentes », eˣ ≥ x + 1, ln x ≤ x − 1, la courbe traverse sa tangente
# au point d'inflexion). Short jumeau : convexite_tangente_micro_short.py.
#
# Clé de voix → écran :
#   · 00-garde        : page de garde, l'échelle ENTIÈRE (verte), e^0,1 = ? ;
#   · 01-situation    : Thomas, ingénieur en éclairage automobile ; la nuit, la
#                       voiture au fond d'une cuvette (les phares éclairent la
#                       route), puis en haut d'une bosse (le faisceau part vers
#                       le ciel) : le faisceau = la tangente à la route ;
#   · 02-propriete    : convexe → au-dessus de ses tangentes (une tangente
#                       glisse), concave → au-dessous ;
#   · 03-exponentielle: eˣ convexe, tangente en 0 : y = x + 1, eˣ ≥ x + 1 ;
#   · 04-estimer      : e^0,1 ≥ 1,1 ; la calculatrice : ≈ 1,105 (zoom) ;
#   · 05/05b          : question-pause n° 1 (e^0,2 ≥ 1,2 → A ; ≈ 1,221) ;
#   · 06-logarithme   : ln concave, tangente en 1 : y = x − 1, ln x ≤ x − 1 ;
#   · 07-piege        : le sens de l'inégalité ; au point d'inflexion (x³ en 0)
#                       la courbe TRAVERSE sa tangente ;
#   · 08/08b          : question-pause n° 2 (ln 1,5 ≤ 0,5 → B ; ≈ 0,405) ;
#   · 09-rediger      : les deux lignes du bac ;
#   · 10/10b          : le défi x² ≥ 2x − 1 et sa correction, (x − 1)² ≥ 0 ;
#   · 11-finale       : « Ce que tu as appris », titre en haut et centré ;
#   · 12-abonne       : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur (paysage ET short) : bleu = convexe / creux, orange = concave /
# bosse, jaune = le faisceau = la tangente, vert = résultat juste, rouge = piège.
# Modèles : loi_normale_escalier.py (structure) ; convexite_fonction.py (dessins,
# recopiés ici, rien n'en est importé).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : convexite_tangente_marques.json). Audit : AUDIT=1 BORDS=1 … --dry_run.
#
# Voix : manim/voix/terminale-convexite-tangente.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/convexite_tangente.py ConvexiteTangenteTerminale -o eleveai-maths-terminale-convexite-tangente --media_dir manim/scripts/terminale/media-convexite-tangente
# Sortie : manim/sorties/terminale/maths/analyse/convexite-tangente/

import math
import os
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
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert f"{math.exp(0.1):.3f}" == "1.105" and 0.1 + 1 == 1.1
assert f"{math.exp(0.2):.3f}" == "1.221" and math.exp(0.2) >= 1.2
assert f"{math.log(1.5):.3f}" == "0.405" and math.log(1.5) <= 0.5
assert all(math.exp(x) >= x + 1 for x in np.linspace(-5, 5, 101))
assert all(math.log(x) <= x - 1 + 1e-12 for x in np.linspace(0.05, 6, 120))
assert all(abs((x * x - 2 * x + 1) - (x - 1) ** 2) < 1e-12 for x in np.linspace(-3, 3, 13))

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6  # la colonne de droite (marge de 3 % : 0,43 du bord)
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
FAISCEAU = JAUNE_TITRE
NUIT = "#0f172a"
GOUDRON = "#64748B"


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

    def droite(self, m, x0, y0, a, b, color=FAISCEAU, sw=4):
        return Line(self.G(a, y0 + m * (a - x0)), self.G(b, y0 + m * (b - x0)), color=color, stroke_width=sw)

    def vers_x(self, x, y, color=GREY_B):
        return DashedLine(self.G(x, y), self.G(x, max(self.ya, min(0, self.yb))), color=color, stroke_width=2,
                          dash_length=0.08)


# ── la route de nuit (écran 01) : un creux en x = −3, une bosse en x = 3 ────

XC_ROUTE, L_ROUTE, A_ROUTE, Y_ROUTE = -3.0, 6.0, 0.95, -0.9


def route(x):
    return Y_ROUTE - A_ROUTE * math.cos(math.pi * (x - XC_ROUTE) / L_ROUTE)


def pente_route(x):
    return A_ROUTE * math.pi / L_ROUTE * math.sin(math.pi * (x - XC_ROUTE) / L_ROUTE)


def voiture(couleur="#DC2626", s=1.0):
    """Une voiture de profil, roues posées sur l'origine, l'avant vers la droite."""
    caisse = RoundedRectangle(width=0.95, height=0.24, corner_radius=0.07, fill_color=couleur, fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.21))
    toit = Polygon(P(-0.3, 0.32), P(0.18, 0.32), P(0.08, 0.5), P(-0.22, 0.5), fill_color=couleur, fill_opacity=1,
                   stroke_width=0)
    vitre = Polygon(P(-0.2, 0.35), P(0.12, 0.35), P(0.05, 0.47), P(-0.16, 0.47), fill_color="#93C5FD",
                    fill_opacity=0.9, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.1, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
                     .move_to(P(x, 0.1)) for x in (-0.28, 0.28)])
    phare = Dot(P(0.46, 0.23), radius=0.045, color=JAUNE_TITRE)
    return VGroup(caisse, toit, vitre, roues, phare).scale(s, about_point=ORIGIN)


def ingenieur(s=1.0):
    """Thomas : tête, chemise, et un phare dans la main (des rayons)."""
    tete = Circle(radius=0.3, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Arc(radius=0.32, start_angle=0.2, angle=PI - 0.4, stroke_color="#1f1308", stroke_width=10)
    cheveux.move_to(tete.get_top() + DOWN * 0.07)
    buste = RoundedRectangle(width=1.0, height=1.15, corner_radius=0.3, fill_color=BLEU_CALCUL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    phare = VGroup(Circle(radius=0.17, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                   *[Line(P(0.22, 0), P(0.42, 0), stroke_width=3, color=JAUNE_TITRE).rotate(a, about_point=ORIGIN)
                     for a in (-0.45, 0, 0.45)]).move_to(P(0.55, 0.1))
    return VGroup(buste, tete, cheveux, phare).scale(s)


def calculatrice(s=1.0, barree=False):
    corps = RoundedRectangle(width=0.7, height=1.0, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    ecran = Rectangle(width=0.52, height=0.22, fill_color="#86EFAC", fill_opacity=1, stroke_width=0)
    ecran.move_to(corps.get_top() + DOWN * 0.2)
    touches = VGroup(*[Square(0.11, fill_color=GREY_B, fill_opacity=1, stroke_width=0) for _ in range(9)])
    touches.arrange_in_grid(3, 3, buff=0.06).move_to(corps.get_center() + DOWN * 0.15)
    g = VGroup(corps, ecran, touches)
    if barree:
        g.add(Line(corps.get_corner(UL) + P(-0.1, 0.1), corps.get_corner(DR) + P(0.1, -0.1), color=ROUGE_ERREUR,
                   stroke_width=7))
    return g.scale(s)


class ConvexiteTangenteBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = "convexite_tangente_marques.json"
    nom_voix = "terminale-convexite-tangente"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    # ── outils ──────────────────────────────────────────────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
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

    def pastille_num(self, k, color=BLEU_CALCUL, r=0.24):
        """Le numéro d'une ligne de rédaction (pas un nombre dit)."""
        n = Text(str(k), font_size=30, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

    def ineg(self, gauche, signe, droite, fs=48, color=VERT_OK):
        """eˣ ≥ x + 1 : gauche (Text ou Mobject), le signe, la droite."""
        g = gauche if isinstance(gauche, Mobject) else self.t(gauche, fs, color)
        return VGroup(g, self.t(signe, fs, color), self.t(droite, fs, color)).arrange(RIGHT, buff=0.2)

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
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    def au_mot(self, extrait, n=1):
        """au_mot sur la n-ième occurrence de l'extrait."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def au_nb(self, contexte, nb, n=1):
        """Attend le NOMBRE nb dit juste après la n-ième occurrence de contexte."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(contexte, i + 1)
            if i < 0:
                raise ValueError(f"« {contexte} » (n = {n}) absent de la voix")
        j = self._texte_voix.find(nb, i)
        assert j >= 0, (contexte, nb)
        self.au_pos(j)

    def _bords(self):
        super()._bords()
        margo = getattr(self, "_margo", None)
        if margo is None or margo not in self.mobjects:
            return
        for m in self.mobjects:
            if m is margo or m.width == 0 or m.width > 9:
                continue
            if m.get_right()[0] > margo.get_left()[0] - 0.05 and m.get_bottom()[1] < margo.get_top()[1] + 0.05:
                print(f"MARGO {getattr(self, '_cle_voix', '?')} t={self.renderer.time:.1f} {type(m).__name__} "
                      f"x[{m.get_left()[0]:.2f}, {m.get_right()[0]:.2f}] y[{m.get_bottom()[1]:.2f}, "
                      f"{m.get_top()[1]:.2f}]", flush=True)

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
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 34) for x in question])
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes, nombre):
        """Chaque carte À SA LETTRE, son contenu (« ≥ 1,2 ») À SON NOMBRE."""
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.au_pos(voix.find(nombre, i))
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)

    def explication(self, a, b, c, color):
        """La phrase d'explication de la réponse, en haut à gauche du graphique."""
        g = VGroup(self.t(a, 36, color), self.t(b, 34), self.t(c, 34)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        return g.move_to(P(0, 2.4)).align_to(P(-5.9, 0), LEFT)

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
        titre = self.t("Convexité et tangentes", 58, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        calc = calculatrice(0.9, barree=True).move_to(P(-5.55, 1.05))
        sans = self.t("Sans calculatrice :", 38).next_to(calc, RIGHT, buff=0.3)
        self.au_mot("Sans calculatrice")
        self.play(FadeIn(calc, scale=1.3), FadeIn(sans, shift=RIGHT * 0.15), run_time=0.5)
        e01 = puissance("e", "0,1", 64, BLEU_CALCUL)
        egal = self.t("= ?", 56, BLEU_CALCUL)
        q = VGroup(e01, egal).arrange(RIGHT, buff=0.25).next_to(sans, RIGHT, buff=0.35)
        g = Graphe((-2.2, 1.3), (-0.6, 3.6), (3.1, 0.1), (6.1, 2.25))
        ax = g.axes()
        ce = g.courbe(math.exp, -2.2, 1.27, CONVEXE, 5)
        self.au_mot("exponentielle")
        self.play(Create(ax), Create(ce), run_time=0.7)
        self.au_mot("0,1")
        self.play(FadeIn(e01, scale=1.3), FadeIn(egal), run_time=0.4)
        self.insister(q, 1.15)
        l1 = self.t("Les maths, ça sert à rien…", 38, GREY_A).move_to(P(-1.6, -0.25))
        self.au_mot("Les maths")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = self.t("… sauf à donner une réponse sûre", 38, VERT_OK).move_to(P(-1.6, -0.95))
        self.au_mot("sauf")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        l3 = self.t("avec une simple droite.", 38, FAISCEAU).move_to(P(-1.6, -1.6))
        tg = g.droite(1, 0, 1, -1.6, 1.3, FAISCEAU, 5)
        self.au_mot("simple droite")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(tg), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : Thomas, la voiture de nuit, la cuvette et la bosse ────────────

    def faisceau(self, x):
        """Le cône des phares de la voiture posée en x, et la tache sur la route."""
        a = math.atan(pente_route(x))
        c = P(x, route(x))
        d, n = P(math.cos(a), math.sin(a)), P(-math.sin(a), math.cos(a))
        h = c + 0.46 * d + 0.23 * n
        L, tache = None, VGroup()
        ts = np.arange(0.08, 4.0, 0.01)
        xs, ys = h[0] + ts * d[0], h[1] + ts * d[1]
        ok = xs <= 6.2
        sous = ok & (ys <= Y_ROUTE - A_ROUTE * np.cos(np.pi * (xs - XC_ROUTE) / L_ROUTE))
        if sous.any():
            k = int(np.argmax(sous))
            L, p = ts[k], P(xs[k], ys[k])
            tache = Ellipse(width=0.55, height=0.16, fill_color=FAISCEAU, fill_opacity=0.75, stroke_width=0)
            tache.rotate(math.atan(pente_route(p[0]))).move_to(p)
        if L is None:
            L = min(3.2, (6.2 - h[0]) / max(math.cos(a), 0.3))

        def rot(v, b):
            return P(v[0] * math.cos(b) - v[1] * math.sin(b), v[0] * math.sin(b) + v[1] * math.cos(b))
        cone = Polygon(h, h + L * rot(d, 0.13), h + L * rot(d, -0.13), stroke_width=0, fill_color=FAISCEAU,
                       fill_opacity=0.22)
        rayon = Line(h, h + L * d, stroke_width=3, color=FAISCEAU, stroke_opacity=0.85)
        return VGroup(cone, rayon, tache)

    def auto(self, x):
        a = math.atan(pente_route(x))
        return voiture().rotate(a, about_point=ORIGIN).shift(P(x, route(x)))

    def tangente_route(self, x, a, b, color=FAISCEAU):
        m = pente_route(x)
        return DashedLine(P(a, route(x) + m * (a - x)), P(b, route(x) + m * (b - x)), color=color, stroke_width=3,
                          dash_length=0.12)

    def segment_route(self, a, b, color, sw=12):
        m = VMobject(stroke_color=color, stroke_width=sw)
        m.set_points_smoothly([P(x, route(x)) for x in np.linspace(a, b, 60)])
        return m

    def ecran_situation(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("01-situation")
        thomas = ingenieur(0.8).move_to(P(-5.55, 2.5))
        nom = self.t("Thomas", 42, BLEU_CALCUL).move_to(P(0, 2.9)).align_to(P(-4.75, 0), LEFT)
        metier = self.t("ingénieur en éclairage automobile", 32).move_to(P(0, 2.25)).align_to(P(-4.75, 0), LEFT)
        self.au_mot("Thomas")
        self.play(FadeIn(thomas, shift=UP * 0.2), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("ingénieur")
        self.play(FadeIn(metier, shift=RIGHT * 0.15), run_time=0.45)
        # la nuit : étoiles, lune, la route, le sol
        rng = np.random.default_rng(5)
        etoiles = VGroup(*[Dot(P(x, y), radius=0.025 + 0.02 * rng.random(), color=WHITE).set_opacity(0.8)
                           for x, y in zip(rng.uniform(3.3, 5.2, 16), rng.uniform(2.0, 3.35, 16))])
        lune = Circle(radius=0.3, fill_color="#FEF9C3", fill_opacity=1, stroke_width=0).move_to(P(5.75, 3.0))
        sol = Polygon(*[P(x, route(x)) for x in np.linspace(-6.2, 6.2, 80)], P(6.2, -2.3), P(-6.2, -2.3),
                      fill_color="#14261a", fill_opacity=1, stroke_width=0)
        chaussee = self.segment_route(-6.2, 6.2, GOUDRON)
        xv = ValueTracker(-5.6)
        car = always_redraw(lambda: self.auto(xv.get_value()))
        self.au_mot("La nuit")
        self.play(LaggedStart(*[FadeIn(e, scale=2) for e in etoiles], lag_ratio=0.05), FadeIn(lune),
                  FadeIn(sol), Create(chaussee), FadeIn(car), run_time=0.6)
        self.bring_to_front(margo)
        self.au_mot("au fond d'une cuvette")
        self.play(xv.animate.set_value(-3.0), run_time=1.3, rate_func=rate_functions.ease_out_sine)
        creux = self.segment_route(-4.6, -1.4, CONVEXE)
        self.play(FadeIn(creux), run_time=0.3)
        self.bring_to_front(car)
        self.au_mot("éclairent la route")
        beam = always_redraw(lambda: self.faisceau(xv.get_value()))
        self.add(beam)
        self.bring_to_front(car)
        l_creux = self.t("dans la cuvette : la route est éclairée", 30, CONVEXE).move_to(P(-2.6, -2.75))
        self.play(FadeIn(beam), FadeIn(l_creux, shift=UP * 0.1), run_time=0.45)
        self.play(Flash(beam[2].get_center(), color=FAISCEAU, line_length=0.2), run_time=0.5)
        self.au_mot("en haut d'une bosse")
        self.play(xv.animate.set_value(2.6), run_time=1.4, rate_func=rate_functions.ease_in_out_sine)
        self.au_mot("éclairent le ciel")
        l_b1 = self.t("en haut de la bosse :", 30, CONCAVE)
        l_b2 = self.t("le faisceau part vers le ciel", 30, CONCAVE)
        l_bosse = VGroup(l_b1, l_b2).arrange(DOWN, buff=0.12).move_to(P(3.2, 1.3))
        self.play(FadeIn(l_bosse, shift=DOWN * 0.1), etoiles.animate.set_color(FAISCEAU), run_time=0.5)
        self.au_mot("plonge sous le faisceau")
        bosse = self.segment_route(3.0, 6.2, CONCAVE)
        self.play(Create(bosse), run_time=0.8)
        self.bring_to_front(car)
        self.au_mot("c'est la tangente")
        t1 = self.tangente_route(2.6, 0.4, 6.2)
        t2 = self.tangente_route(-3.0, -5.6, -0.4)
        cap = self.t("Le faisceau des phares = la tangente à la route", 32, FAISCEAU).move_to(P(-0.6, -3.3))
        self.play(Create(t1), Create(t2), FadeIn(cap, shift=UP * 0.1), run_time=0.7)
        self.insister(cap, 1.08)
        self.attendre_voix(marge=0.6)
        car.clear_updaters()
        beam.clear_updaters()

    # ── 02 : la propriété, une tangente qui glisse ─────────────────────────

    def panneau(self, signe, x0, x1, color, nom, regle, mot_nom, mot_regle):
        k = 0.7 * signe
        yr = (-0.8, 3.2) if signe > 0 else (-3.2, 0.8)
        g = Graphe((-2, 2), yr, (x0, -1.7), (x1, 2.3))
        f = lambda x: k * x * x  # noqa: E731
        c = g.courbe(f, -2, 2, color, 6)
        xm = (x0 + x1) / 2
        l1 = self.t(nom, 34, color).move_to(P(xm, -2.2))
        r1, r2 = regle
        l2 = VGroup(self.t(r1, 30), self.t(r2, 30)).arrange(DOWN, buff=0.08).move_to(P(xm, -2.9))
        u = ValueTracker(-1.4)
        tg = always_redraw(lambda: g.droite(2 * k * u.get_value(), u.get_value(), f(u.get_value()),
                                            u.get_value() - 0.9, u.get_value() + 0.9, FAISCEAU, 5))
        pt = always_redraw(lambda: Dot(g.G(u.get_value(), f(u.get_value())), radius=0.08, color=FAISCEAU))
        self.au_mot(mot_nom)
        self.play(Create(g.axes()), Create(c), FadeIn(l1, shift=UP * 0.1), run_time=0.8)
        self.au_mot(mot_regle)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(tg), FadeIn(pt), run_time=0.35)
        traces = VGroup()
        for v in (-0.6, 0.3, 1.4):
            self.play(u.animate.set_value(v), run_time=0.75, rate_func=rate_functions.ease_in_out_sine)
            tr = g.droite(2 * k * v, v, f(v), v - 0.9, v + 0.9, FAISCEAU, 2).set_stroke(opacity=0.5)
            traces.add(tr)
            self.add(tr)
        self.play(Indicate(c, color=color, scale_factor=1.03), run_time=0.6)
        tg.clear_updaters()
        pt.clear_updaters()

    def ecran_propriete(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-propriete")
        tit = self.t("En maths, c'est pareil", 44, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au_mot("En maths")
        self.play(Write(tit), run_time=0.6)
        self.panneau(1, -6.0, -0.9, CONVEXE, "f convexe", ("courbe au-dessus", "de ses tangentes"),
                     "convexe", "au-dessus")
        self.panneau(-1, 0.3, 5.1, CONCAVE, "f concave", ("courbe au-dessous", "de ses tangentes"),
                     "concave", "au-dessous")
        self.attendre_voix(marge=0.6)

    # ── 03 : l'exponentielle et sa tangente en 0 ───────────────────────────

    def graphe_exp(self):
        return Graphe((-2.6, 1.7), (-1.8, 4.2), (-6.0, -2.6), (0.9, 3.1))

    def ecran_exponentielle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-exponentielle")
        g = self.graphe_exp()
        ce = g.courbe(math.exp, -2.6, 1.4, CONVEXE, 6)
        le = puissance("e", "x", 40, CONVEXE).next_to(g.G(1.4, math.exp(1.4)), LEFT, buff=0.15)
        l1 = VGroup(self.t("L'exponentielle", 38), self.t("est convexe", 38, CONVEXE)).arrange(DOWN, buff=0.1,
                                                                                         aligned_edge=LEFT)
        self.col(l1, 2.75)
        self.au_mot("L'exponentielle")
        self.play(Create(g.axes()), FadeIn(l1[0], shift=RIGHT * 0.1), run_time=0.4)
        self.play(Create(ce), FadeIn(le), run_time=0.8)
        self.au_mot("est convexe")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.1), Indicate(ce, color=CONVEXE, scale_factor=1.03), run_time=0.6)
        self.au_nb("abscisse 0", "0")
        p0 = Dot(g.G(0, 1), radius=0.09, color=FAISCEAU)
        l2 = self.ligne(self.t("Tangente en 0 :", 36), y=1.7)
        self.play(FadeIn(p0, scale=2.5), FadeIn(l2, shift=RIGHT * 0.1), run_time=0.4)
        self.au_nb("x plus 1", "1")
        tg = g.droite(1, 0, 1, -2.6, 1.7, FAISCEAU, 5)
        l3 = self.ligne(self.t("y = x + 1", 44, FAISCEAU), y=1.0)
        self.play(Create(tg), FadeIn(l3, scale=1.3), run_time=0.6)
        self.au_mot("La courbe est au-dessus")
        l4 = self.ligne(self.t("La courbe est au-dessus.", 34), y=0.1)
        fl = VGroup(*[Arrow(g.G(x, x + 1), g.G(x, math.exp(x)), buff=0.04, color=CONVEXE, stroke_width=4,
                            max_tip_length_to_length_ratio=0.3) for x in (-2.0, -1.1, 1.0)])
        self.play(FadeIn(l4, shift=RIGHT * 0.1), LaggedStart(*[GrowArrow(f) for f in fl], lag_ratio=0.2),
                  run_time=0.7)
        iq = self.ineg(puissance("e", "x", 52, VERT_OK), "≥", "x + 1")
        pour = self.t("pour tout réel x :", 32)
        bloc = VGroup(pour, iq).arrange(DOWN, buff=0.2)
        bloc.scale_to_fit_width(min(bloc.width, 3.6))
        self.col(bloc, -1.15, XL + 0.35)
        self.au_mot("pour tout réel")
        self.play(FadeIn(pour, shift=UP * 0.1), run_time=0.35)
        self.au_mot("exponentielle de x")
        self.play(FadeIn(iq[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("supérieure ou égale")
        self.play(FadeIn(iq[1], scale=1.3), run_time=0.3)
        self.au_nb("x plus 1", "1", n=2)
        cad = SurroundingRectangle(bloc, color=VERT_OK, buff=0.18, stroke_width=3)
        self.play(FadeIn(iq[2], scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(bloc, cad), 1.08, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 04 : e^0,1 ≥ 1,1, et la calculatrice : ≈ 1,105 ─────────────────────

    def ecran_estimer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-estimer")
        tit = self.t("Retour à la question", 44, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.6)
        g = Graphe((-0.06, 0.24), (0.9, 1.3), (-6.0, -2.3), (0.6, 2.3))
        ce = g.courbe(math.exp, -0.06, 0.24, CONVEXE, 6)
        tg = g.droite(1, 0, 1, -0.06, 0.24, FAISCEAU, 4)
        loupe = self.t("zoom autour de 0", 26, GREY_A).next_to(g.G(0.0, 1.3), RIGHT, buff=0.2).shift(DOWN * 0.1)
        loupe._pas_audit = True
        le = puissance("e", "x", 36, CONVEXE).next_to(g.G(0.24, math.exp(0.24)), LEFT, buff=0.2)
        lt = self.t("tangente", 28, FAISCEAU).next_to(g.G(0.22, 1.22), DOWN, buff=0.45)
        self.play(Create(g.axes()), FadeIn(loupe), run_time=0.4)
        self.play(Create(ce), Create(tg), FadeIn(le), FadeIn(lt), run_time=0.8)
        self.au_mot("Exponentielle de 0,1")
        self.au_pos(self._texte_voix.find("0,1"))
        v = g.vers_x(0.1, 1.1)
        g01 = self.t("0,1", 28, GREY_A).next_to(g.G(0.1, 0.9), DOWN, buff=0.12)
        e01 = puissance("e", "0,1", 48, WHITE)
        l1a = VGroup(e01, self.t("≥", 46)).arrange(RIGHT, buff=0.18)
        l1b = self.t("0,1", 46)
        l1c = self.t("+ 1", 46)
        self.ligne(l1a, l1b, l1c, y=1.9, xl=1.9, buff=0.22)
        self.play(Create(v), FadeIn(g01, scale=1.3), FadeIn(e01, shift=UP * 0.1), run_time=0.35)
        self.au_mot("supérieure")
        self.play(FadeIn(l1a[1], scale=1.3), run_time=0.25)
        self.au_nb("égale à", "0,1")
        self.play(FadeIn(l1b, shift=LEFT * 0.1), run_time=0.25)
        self.au_nb("plus 1", "1")
        self.play(FadeIn(l1c, shift=LEFT * 0.1), run_time=0.25)
        self.au_mot("1,1")
        pt = Dot(g.G(0.1, 1.1), radius=0.06, color=VERT_OK)
        g11 = self.t("1,1", 30, VERT_OK).next_to(pt, RIGHT, buff=0.15).shift(DOWN * 0.12)
        e01b = puissance("e", "0,1", 48, VERT_OK)
        e01b[1]._pas_audit = True  # e^0,1 : déjà dit, on le recopie
        l2 = self.ligne(e01b, self.t("≥", 46, VERT_OK), self.t("1,1", 50, VERT_OK),
                        y=0.85, xl=1.9)
        cad = SurroundingRectangle(l2, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(pt, scale=2), FadeIn(g11), FadeIn(l2, shift=UP * 0.1), Create(cad), run_time=0.45)
        self.au_mot("La calculatrice")
        calc = calculatrice(0.75).move_to(P(2.3, -0.45))
        self.play(FadeIn(calc, shift=UP * 0.15), run_time=0.35)
        self.au_mot("1,105")
        pc = Dot(g.G(0.1, math.exp(0.1)), radius=0.045, color=CONVEXE)
        g1105 = self.t("1,105", 30, CONVEXE).next_to(pc, LEFT, buff=0.15).shift(UP * 0.15)
        val = self.t("≈ 1,105", 46, VERT_OK).next_to(calc, RIGHT, buff=0.35)
        ok = self.coche(VERT_OK, 0.26).next_to(val, RIGHT, buff=0.25)
        self.play(FadeIn(pc, scale=2), FadeIn(g1105), FadeIn(val, scale=1.3), run_time=0.4)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("la tangente avait vu juste")
        f1 = self.t("La tangente avait vu juste,", 32, FAISCEAU)
        f2 = self.t("et de très près.", 32, FAISCEAU)
        fin = VGroup(f1, f2).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(fin, -1.45, 1.9)
        self.play(FadeIn(f1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("de très près")
        ecart = Line(g.G(0.1, 1.1), g.G(0.1, math.exp(0.1)), color=VERT_OK, stroke_width=6)
        self.play(FadeIn(f2, shift=UP * 0.1), Create(ecart), run_time=0.35)
        self.insister(VGroup(pt, pc, ecart), 1.6, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : question-pause n° 1 : e^0,2 ───────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-question")
        t0 = self.renderer.time
        q2 = VGroup(puissance("e", "0,2", 38), self.t("est :", 34)).arrange(RIGHT, buff=0.15)
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Avec la même tangente,", q2], ["≥ 1,2", "≤ 1,2", "= 1,2"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g = Graphe((-1.6, 1.2), (-0.7, 3.4), (-6.1, -2.6), (1.0, 3.1))
        ce = g.courbe(math.exp, -1.6, 1.2, CONVEXE, 6)
        tg = g.droite(1, 0, 1, -1.6, 1.2, FAISCEAU, 5)
        le = puissance("e", "x", 36, CONVEXE).next_to(g.G(1.2, math.exp(1.2)), LEFT, buff=0.15)
        self.au_mot("la même tangente")
        self.play(FadeIn(q[0], shift=UP * 0.1), Create(g.axes()), Create(ce), FadeIn(le), run_time=0.6)
        self.play(Create(tg), run_time=0.4)
        self.au_mot("0,2")
        v = g.vers_x(0.2, math.exp(0.2))
        g02 = self.t("0,2", 28, GREY_A).next_to(g.G(0.2, 0), DOWN, buff=0.12)
        self.play(FadeIn(q[1], shift=UP * 0.1), Create(v), FadeIn(g02), run_time=0.4)
        self.q_montrer_choix(cartes, "1,2")
        self.q_pause(pause, rebours, "05-question", t0, 0)
        self.dire("05b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        self.au_mot("convexe")
        ex1, ex2, ex3 = self.explication("Convexe :", "au-dessus", "de la tangente", CONVEXE)
        self.play(Indicate(ce, color=CONVEXE, scale_factor=1.03), FadeIn(ex1, shift=RIGHT * 0.1), run_time=0.6)
        self.au_mot("au-dessus")
        self.play(FadeIn(ex2, shift=RIGHT * 0.1), FadeIn(ex3, shift=RIGHT * 0.1), run_time=0.35)
        fl = VGroup(*[Arrow(g.G(x, x + 1), g.G(x, math.exp(x)), buff=0.04, color=CONVEXE, stroke_width=4,
                            max_tip_length_to_length_ratio=0.3) for x in (-1.3, 0.95)])
        self.play(LaggedStart(*[GrowArrow(f) for f in fl], lag_ratio=0.2), run_time=0.5)
        self.au_mot("1,221")
        e02 = puissance("e", "0,2", 44, VERT_OK)
        e02[1]._pas_audit = True  # rappel de la question
        val = self.ligne(e02, self.t("≈ 1,221", 44, VERT_OK),
                         y=cartes.get_bottom()[1] - 0.6)
        self.play(FadeIn(val, scale=1.3), run_time=0.4)
        self.insister(val, 1.2)
        self.attendre_voix(marge=0.6)

    # ── 06 : le logarithme et sa tangente en 1 ─────────────────────────────

    def ecran_logarithme(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-logarithme")
        g = Graphe((-0.3, 4.4), (-2.6, 3.5), (-6.0, -2.6), (0.9, 3.1))
        c = g.courbe(math.log, 0.085, 4.3, CONCAVE, 6)
        lc = self.t("ln x", 36, CONCAVE).next_to(g.G(4.3, math.log(4.3)), DOWN, buff=0.2)
        l1 = VGroup(self.t("Le logarithme", 38), self.t("est concave", 38, CONCAVE)).arrange(DOWN, buff=0.1,
                                                                                    aligned_edge=LEFT)
        self.col(l1, 2.75)
        self.au_mot("Le logarithme")
        self.play(Create(g.axes()), FadeIn(l1[0], shift=RIGHT * 0.1), run_time=0.4)
        self.play(Create(c), FadeIn(lc), run_time=0.8)
        self.au_mot("est concave")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.1), Indicate(c, color=CONCAVE, scale_factor=1.03), run_time=0.6)
        self.au_nb("abscisse 1", "1")
        p1 = Dot(g.G(1, 0), radius=0.09, color=FAISCEAU)
        g1 = self.t("1", 28, GREY_A).next_to(g.G(1, 0), DOWN, buff=0.15)
        l2 = self.ligne(self.t("Tangente en 1 :", 36), y=1.7)
        self.play(FadeIn(p1, scale=2.5), FadeIn(g1), FadeIn(l2, shift=RIGHT * 0.1), run_time=0.4)
        self.au_nb("x moins 1", "1")
        tg = g.droite(1, 1, 0, -0.3, 4.4, FAISCEAU, 5)
        lt = self.t("y = x − 1", 30, FAISCEAU).next_to(g.G(3.6, 2.6), UL, buff=0.15)  # au-dessus de la droite, pas dessus
        l3 = self.ligne(self.t("y = x − 1", 44, FAISCEAU), y=1.0)
        self.play(Create(tg), FadeIn(lt), FadeIn(l3, scale=1.3), run_time=0.6)
        self.au_mot("La courbe est au-dessous")
        l4 = self.ligne(self.t("La courbe est au-dessous.", 34), y=0.1)
        fl = VGroup(*[Arrow(g.G(x, x - 1), g.G(x, math.log(x)), buff=0.04, color=CONCAVE, stroke_width=4,
                            max_tip_length_to_length_ratio=0.3) for x in (0.3, 2.5, 3.8)])
        self.play(FadeIn(l4, shift=RIGHT * 0.1), LaggedStart(*[GrowArrow(f) for f in fl], lag_ratio=0.2),
                  run_time=0.7)
        pour = VGroup(self.t("pour tout x", 32), self.t("strictement positif :", 32)).arrange(DOWN, buff=0.08)
        iq = self.ineg("ln x", "≤", "x − 1")
        bloc = VGroup(pour, iq).arrange(DOWN, buff=0.2)
        bloc.scale_to_fit_width(min(bloc.width, 3.5))
        self.col(bloc, -0.95, XL + 0.3)
        self.au_mot("pour tout x")
        self.play(FadeIn(pour, shift=UP * 0.1), run_time=0.35)
        self.au_mot("logarithme de x")
        self.play(FadeIn(iq[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("inférieur ou égal")
        self.play(FadeIn(iq[1], scale=1.3), run_time=0.3)
        self.au_nb("x moins 1", "1", n=2)
        cad = SurroundingRectangle(bloc, color=VERT_OK, buff=0.18, stroke_width=3)
        self.play(FadeIn(iq[2], scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(bloc, cad), 1.08, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : le sens, et le point d'inflexion ───────────────────

    def mini(self, xc, f, df, x0, color, a=-1.3, b=1.3, yr=(-1.5, 1.9)):
        g = Graphe((a, b), yr, (xc - 1.7, -1.0), (xc + 1.7, 2.0))
        c = g.courbe(f, a, b, color, 6)
        tg = g.droite(df(x0), x0, f(x0), max(a, x0 - 0.9), min(b, x0 + 0.9), FAISCEAU, 4)
        pt = Dot(g.G(x0, f(x0)), radius=0.08, color=FAISCEAU)
        cadre = RoundedRectangle(width=3.9, height=3.4, corner_radius=0.15, stroke_color=GREY_D, stroke_width=2)
        cadre.move_to(P(xc, 0.5))
        return g, VGroup(cadre, c), VGroup(tg, pt)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        tit = self.t("Voilà le piège !", 46, ROUGE_ERREUR).to_edge(UP, buff=0.5)
        self.au_mot("Voilà le piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.45)
        self.au_mot("Le sens de l'inégalité")
        sous = self.t("Le sens de l'inégalité dépend de la forme.", 32).next_to(tit, DOWN, buff=0.2)
        self.play(FadeIn(sous, shift=UP * 0.1), run_time=0.4)
        xs = (-4.25, 0.0, 4.25)
        g1, c1, t1 = self.mini(xs[0], lambda x: x * x, lambda x: 2 * x, 0.5, CONVEXE, yr=(-0.6, 1.8))
        g2, c2, t2 = self.mini(xs[1], lambda x: -x * x, lambda x: -2 * x, 0.5, CONCAVE, yr=(-1.8, 0.6))
        g3, c3, t3 = self.mini(xs[2], lambda x: x ** 3, lambda x: 3 * x * x, 0.0, WHITE, a=-1.2, b=1.2,
                               yr=(-1.75, 1.75))
        self.au_mot("Convexe")
        n1 = self.t("convexe", 32, CONVEXE).move_to(P(xs[0], -1.5))
        self.play(FadeIn(c1), FadeIn(t1), FadeIn(n1), run_time=0.5)
        self.au_mot("supérieur ou égal")
        r1 = self.t("f(x) ≥ tangente", 32, CONVEXE).move_to(P(xs[0], -2.1))
        self.play(FadeIn(r1, scale=1.3), run_time=0.35)
        self.insister(r1[4], 1.6)
        self.au_mot("Concave")
        n2 = self.t("concave", 32, CONCAVE).move_to(P(xs[1], -1.5))
        self.play(FadeIn(c2), FadeIn(t2), FadeIn(n2), run_time=0.5)
        self.au_mot("inférieur ou égal")
        r2 = self.t("f(x) ≤ tangente", 32, CONCAVE).move_to(P(xs[1], -2.1))
        self.play(FadeIn(r2, scale=1.3), run_time=0.35)
        self.insister(r2[4], 1.6)
        self.au_mot("point d'inflexion")
        n3 = self.t("point d'inflexion", 32, ROUGE_ERREUR).move_to(P(xs[2] - 0.3, -1.5))
        self.play(FadeIn(c3), FadeIn(t3), FadeIn(n3), run_time=0.5)
        self.au_mot("traverse")
        gauche = g3.courbe(lambda x: x ** 3, -1.2, 0, ROUGE_ERREUR, 7)
        droite = g3.courbe(lambda x: x ** 3, 0, 1.2, ROUGE_ERREUR, 7)
        r3 = self.t("la courbe traverse", 26, ROUGE_ERREUR).move_to(P(xs[2] - 0.45, -2.1))  # décollé de r2
        self.play(Create(gauche), run_time=0.5)
        self.play(Create(droite), FadeIn(r3), Flash(t3[1], color=ROUGE_ERREUR), run_time=0.6)
        self.au_mot("aucune inégalité")
        r4 = self.t("aucune inégalité ne tient", 30, ROUGE_ERREUR).move_to(P(1.6, -2.75))
        self.play(FadeIn(r4, shift=UP * 0.1), run_time=0.4)
        self.insister(r4, 1.1)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : ln 1,5 ──────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-question")
        t0 = self.renderer.time
        q1 = VGroup(self.t("ln(1,5)", 38), self.t("est :", 34)).arrange(RIGHT, buff=0.15)
        tete, q, cartes, pause, rebours = self.q_tete([q1], ["≥ 0,5", "≤ 0,5", "= 0,5"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        g = Graphe((0.2, 2.6), (-1.7, 1.7), (-6.1, -2.6), (1.0, 3.1))
        c = g.courbe(math.log, 0.2, 2.6, CONCAVE, 6)
        lc = self.t("ln x", 34, CONCAVE).next_to(g.G(2.6, math.log(2.6)), DOWN, buff=0.25)
        tg = g.droite(1, 1, 0, 0.3, 2.6, FAISCEAU, 5)
        self.au_mot("Logarithme")
        self.play(Create(g.axes()), Create(c), FadeIn(lc), run_time=0.6)
        self.play(Create(tg), run_time=0.4)
        self.au_mot("1,5")
        v = g.vers_x(1.5, 0.5)
        g15 = self.t("1,5", 28, GREY_A).next_to(g.G(1.5, 0), DOWN, buff=0.12)
        self.play(FadeIn(q[0], shift=UP * 0.1), Create(v), FadeIn(g15), run_time=0.4)
        self.q_montrer_choix(cartes, "0,5")
        self.q_pause(pause, rebours, "08-question", t0, 1)
        self.dire("08b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("concave")
        ex1, ex2, ex3 = self.explication("Concave :", "au-dessous", "de la tangente", CONCAVE)
        self.play(Indicate(c, color=CONCAVE, scale_factor=1.03), FadeIn(ex1, shift=RIGHT * 0.1), run_time=0.6)
        self.au_mot("au-dessous")
        self.play(FadeIn(ex2, shift=RIGHT * 0.1), FadeIn(ex3, shift=RIGHT * 0.1), run_time=0.35)
        fl = VGroup(*[Arrow(g.G(x, x - 1), g.G(x, math.log(x)), buff=0.04, color=CONCAVE, stroke_width=4,
                            max_tip_length_to_length_ratio=0.3) for x in (0.4, 2.3)])
        p_t = Dot(g.G(1.5, 0.5), radius=0.07, color=FAISCEAU)
        p_c = Dot(g.G(1.5, math.log(1.5)), radius=0.07, color=CONCAVE)
        self.play(LaggedStart(*[GrowArrow(f) for f in fl], lag_ratio=0.2), FadeIn(p_t, scale=2), FadeIn(p_c, scale=2),
                  run_time=0.5)
        self.au_nb("x moins 1", "1")
        lt = self.t("y = x − 1", 30, FAISCEAU).next_to(g.G(2.3, 1.3), UL, buff=0.15)
        self.play(FadeIn(lt, scale=1.3), run_time=0.35)
        self.au_mot("0,405")
        ln15 = self.t("ln(1,5)", 40, VERT_OK, audit=False)  # rappel de la question
        val = self.ligne(ln15, self.t("≈ 0,405", 40, VERT_OK), y=cartes.get_bottom()[1] - 0.6)
        self.play(FadeIn(val, scale=1.3), run_time=0.4)
        self.insister(val, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 09 : la rédaction du bac ───────────────────────────────────────────

    def rang(self, morceaux, y, color=WHITE, fs=34, x=-5.3, larg=8.3):
        g = VGroup(*[m if isinstance(m, Mobject) else self.t(m, fs, color) for m in morceaux])
        g.arrange(RIGHT, buff=0.15)
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-rediger")
        tit = self.t("Au bac : deux lignes suffisent", 44, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au_mot("Au bac")
        self.play(Write(tit), run_time=0.7)
        g = Graphe((-2.2, 1.5), (-1.4, 4.4), (3.5, -1.6), (6.4, 2.5))
        ce = g.courbe(math.exp, -2.2, 1.45, CONVEXE, 5)
        r1 = self.rang(["La fonction exponentielle est convexe sur ℝ,"], 2.05)
        r2 = self.rang(["donc sa courbe est au-dessus de chacune"], 1.45)
        r3 = self.rang(["de ses tangentes, en particulier de sa"], 0.85)
        r4a = self.t("tangente en 0, d'équation", 34)
        r4b = self.t("y = x + 1.", 34, FAISCEAU)
        r4 = self.rang([r4a, r4b], 0.25)
        n1 = self.pastille_num(1).move_to(P(-5.85, r1.get_center()[1]))
        e = puissance("e", "x", 38, VERT_OK)
        r5 = self.rang([self.t("Donc, pour tout réel x,", 32, VERT_OK), e, self.t("≥", 34, VERT_OK),
                        self.t("x + 1.", 34, VERT_OK)], -0.85)
        n2 = self.pastille_num(2, VERT_OK).move_to(P(-5.85, r5.get_center()[1]))
        self.au_mot("La fonction exponentielle")
        self.play(FadeIn(n1, scale=1.5), FadeIn(r1, shift=RIGHT * 0.15), Create(g.axes()), Create(ce), run_time=0.7)
        self.au_mot("donc sa courbe")
        tgs = VGroup(*[g.droite(math.exp(u), u, math.exp(u), u - 0.8, u + 0.6, FAISCEAU, 2).set_stroke(opacity=0.5)
                       for u in (-1.4, 0.8)])
        self.play(FadeIn(r2, shift=RIGHT * 0.15), LaggedStart(*[Create(t) for t in tgs], lag_ratio=0.3),
                  run_time=0.6)
        self.au_mot("de ses tangentes")
        self.play(FadeIn(r3, shift=RIGHT * 0.15), run_time=0.45)
        self.au_nb("tangente en 0", "0")
        p0 = Dot(g.G(0, 1), radius=0.08, color=FAISCEAU)
        self.play(FadeIn(r4a, shift=RIGHT * 0.15), FadeIn(p0, scale=2), run_time=0.45)
        self.au_nb("x plus 1", "1")
        tg = g.droite(1, 0, 1, -2.2, 1.5, FAISCEAU, 5)
        self.play(FadeIn(r4b, scale=1.2), Create(tg), run_time=0.5)
        self.au_mot("Donc, pour tout")
        self.play(FadeIn(n2, scale=1.5), FadeIn(r5[0], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("exponentielle de x")
        self.play(FadeIn(r5[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("supérieure")
        self.play(FadeIn(r5[2], scale=1.3), run_time=0.3)
        self.au_nb("x plus 1", "1", n=2)
        cad = SurroundingRectangle(VGroup(n2, r5), color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(r5[3], shift=RIGHT * 0.1), Create(cad), run_time=0.4)
        self.insister(VGroup(r5, cad, n2), 1.06, 0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : le défi x² ≥ 2x − 1 ───────────────────────────────────────────

    def graphe_carre(self):
        g = Graphe((-1.2, 3.0), (-2.5, 6.0), (-6.0, -2.6), (0.9, 2.9))
        c = g.courbe(lambda x: x * x, -1.2, 2.4, CONVEXE, 6)
        lc = self.t("x²", 34, CONVEXE).next_to(g.G(2.4, 5.76), LEFT, buff=0.15)
        tg = g.droite(2, 1, 1, -0.6, 2.4, FAISCEAU, 5)
        p1 = Dot(g.G(1, 1), radius=0.08, color=FAISCEAU)
        return g, c, lc, tg, p1

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-defi")
        t0 = self.renderer.time
        tete = VGroup(pastille_pause(0.42), self.t("À toi de jouer !", 42, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        self.col(tete, 3.1, 1.6)
        rebours = CompteARebours(5, r=0.3, fs=28)
        self.au_mot("À toi de jouer")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.45)
        g, c, lc, tg, p1 = self.graphe_carre()
        l1 = self.ligne(self.t("f(x) = x²", 44, CONVEXE), y=2.3, xl=1.6)
        self.au_mot("f de x")
        self.play(Create(g.axes()), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.play(Create(c), FadeIn(lc), run_time=0.6)
        self.au_nb("abscisse 1", "1")
        l2 = self.ligne(self.t("Tangente en 1 :", 34), y=1.65, xl=1.6)
        self.play(FadeIn(p1, scale=2.5), FadeIn(l2, shift=RIGHT * 0.1), run_time=0.4)
        l3 = self.ligne(self.t("y = 2x", 40, FAISCEAU), self.t("− 1", 40, FAISCEAU), y=1.05, xl=1.6)
        self.au_nb("égale 2 x", "2")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.3)
        self.au_nb("2 x moins 1", "1")
        self.play(Create(tg), FadeIn(l3[1], scale=1.3), run_time=0.5)
        self.au_mot("Montre que")
        l4 = VGroup(self.t("Montre que,", 32), self.t("pour tout réel x :", 32)).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(l4, 0.18, 1.6)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("x au carré est")
        iq = VGroup(self.t("x²", 50), self.t("≥", 50), self.t("2x", 50), self.t("− 1", 50)).arrange(RIGHT, buff=0.2)
        self.col(iq, -0.9, 2.2)
        self.play(FadeIn(iq[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("supérieur ou égal")
        self.play(FadeIn(iq[1], scale=1.3), run_time=0.3)
        self.au_nb("égal à 2", "2")
        self.play(FadeIn(iq[2], scale=1.2), run_time=0.3)
        self.au_nb("2 x moins 1", "1", n=2)
        cad = SurroundingRectangle(iq, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        self.play(FadeIn(iq[3], scale=1.2), Create(cad), run_time=0.4)
        pause = self.col(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -1.72, 2.45)
        rebours.move_to(P(1.95, -1.72))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION 10-defi t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f})", flush=True)
        self.wait(0.4)

    # ── 10b : la correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("10b-correction")
        g, c, lc, tg, p1 = self.graphe_carre()
        self.add(g.axes(), c, lc, tg, p1)
        tit = self.col(self.t("Correction", 42, JAUNE_TITRE), 3.15, 1.6)
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        self.au_pos(self._texte_voix.find("2"))
        l1 = self.ligne(self.t("f''(x) = 2,", 38), y=2.4, xl=1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("positif")
        l1b = self.t("positif :", 36, VERT_OK).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l1b, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("f est convexe")
        l2 = self.ligne(self.t("f est convexe sur ℝ.", 36, CONVEXE), y=1.75, xl=1.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.1), Indicate(c, color=CONVEXE, scale_factor=1.03), run_time=0.6)
        self.au_nb("abscisse 1", "1")
        l3 = VGroup(self.t("Courbe au-dessus de", 32), self.t("sa tangente en 1.", 32)).arrange(DOWN, aligned_edge=LEFT,
                                                                                               buff=0.1)
        self.col(l3, 0.95, 1.6)
        fl = VGroup(*[Arrow(g.G(x, 2 * x - 1), g.G(x, x * x), buff=0.04, color=CONVEXE, stroke_width=4,
                            max_tip_length_to_length_ratio=0.3) for x in (-0.4, 2.2)])
        self.play(FadeIn(l3, shift=RIGHT * 0.1), LaggedStart(*[GrowArrow(f) for f in fl], lag_ratio=0.2),
                  run_time=0.6)
        l4 = self.ligne(self.t("Donc", 36, VERT_OK), self.t("x² ≥", 40, VERT_OK), self.t("2x", 40, VERT_OK),
                        self.t("− 1", 40, VERT_OK), y=0.1, xl=1.6)
        self.au_mot("Donc x au carré")
        self.play(FadeIn(l4[:2], shift=UP * 0.1), run_time=0.35)
        self.au_nb("égal à 2", "2")
        self.play(FadeIn(l4[2], scale=1.2), run_time=0.3)
        self.au_nb("2 x moins 1", "1")
        cad = SurroundingRectangle(l4, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(l4[3], scale=1.2), Create(cad), run_time=0.4)
        self.au_mot("Vérification")
        l5 = self.ligne(self.t("Vérification :", 34, JAUNE_TITRE), y=-0.6, xl=1.6)
        self.play(FadeIn(l5, shift=RIGHT * 0.1), run_time=0.35)
        l6a = self.t("x² − 2x", 38)
        l6c = self.t("+ 1", 38)
        l6b = self.t("= (x − 1)²", 38, VERT_OK)
        self.ligne(l6a, l6c, l6b, y=-1.15, xl=1.6)
        self.au_nb("moins 2 x", "2")
        self.play(FadeIn(l6a, shift=RIGHT * 0.1), run_time=0.3)
        self.au_nb("2 x plus 1", "1")
        self.play(FadeIn(l6c, shift=RIGHT * 0.1), run_time=0.25)
        self.au_nb("x moins 1 au carré", "1")
        ecarts = VGroup(*[Line(g.G(x, 2 * x - 1), g.G(x, x * x), color=VERT_OK, stroke_width=6)
                          for x in (-0.6, 0.2, 1.8, 2.3)])
        self.play(FadeIn(l6b, shift=RIGHT * 0.1), LaggedStart(*[Create(e) for e in ecarts], lag_ratio=0.15),
                  FadeOut(fl), run_time=0.6)
        self.au_mot("toujours positif")
        l7 = self.ligne(self.t("toujours positif ou nul", 34, VERT_OK), y=-1.68, xl=1.6)
        self.play(FadeIn(l7, scale=1.2), run_time=0.4)
        self.play(Indicate(l7, color=JAUNE_TITRE, scale_factor=1.02), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("11-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 40
        b1 = VGroup(self.t("Convexe :", fs, CONVEXE), self.t("la courbe est au-dessus de ses tangentes.", fs))
        b1.arrange(RIGHT, buff=0.2)
        b2 = VGroup(self.t("Concave :", fs, CONCAVE), self.t("au-dessous.", fs)).arrange(RIGHT, buff=0.2)
        b3a = self.t("Une tangente donne alors une inégalité,", fs, FAISCEAU)
        b3b = self.t("et une estimation sûre sans calculatrice.", fs, VERT_OK)
        b3 = VGroup(b3a, b3b).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in (b1, b2, b3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        lignes.move_to(P(-0.4, 0.3))
        self.au_mot("Convexe")
        self.play(Create(lignes[0][0]), FadeIn(b1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Concave")
        self.play(Create(lignes[1][0]), FadeIn(b2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Une tangente")
        self.play(Create(lignes[2][0]), FadeIn(b3a, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("et une estimation")
        self.play(FadeIn(b3b, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 12 : la fin (règle du 19/10, identique aux modèles) ────────────────

    def page_abonnement(self, voix="12-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK, audit=False).move_to(P(0, -1.6))
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
        self.ecran_propriete()
        self.ecran_exponentielle()
        self.ecran_estimer()
        self.ecran_question1()
        self.ecran_logarithme()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class ConvexiteTangenteTerminale(ConvexiteTangenteBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
