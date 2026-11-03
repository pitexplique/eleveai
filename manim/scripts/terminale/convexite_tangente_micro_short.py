# convexite_tangente_micro_short.py
# EleveAI — Maths Tle spé — short « Convexité et tangentes » (9:16), ceinture
# BLANCHE. Paysage jumelle : convexite_tangente.py (micro convexite_tangente).
#   · 00 : la nuit, une route qui monte et qui descend, la voiture ;
#   · 01 : EN HAUT la voiture et ses phares (le faisceau), EN BAS la courbe et
#          sa tangente qui glisse, À LA MÊME ABSCISSE (un trait relie les deux) :
#          creux = convexe (bleu), la route au-dessus du faisceau ; bosse =
#          concave (orange), la route sous le faisceau ;
#   · 02 : question-pause « au sommet, les phares éclairent ? » (B : le ciel),
#          compte à rebours de 3 s ;
#   · 03 : eˣ et la droite y = x + 1, « quel minimum pour e^0,5 ? » (réponse
#          1,5, NON affichée) ; réponds en commentaire ;
#   · 04 : « Entraîne-toi sur eleveai.fr ».
# Code couleur de la paysage : bleu = convexe / creux, orange = concave / bosse,
# jaune = le faisceau = la tangente, vert = résultat juste.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-convexite-tangente-short.json (débit −6), calée
# par convexite_tangente_micro_short_marques.json (nom distinct : une autre session
# écrit convexite_tangente_short_marques.json pour SON short).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/convexite_tangente_micro_short.py ConvexiteTangenteShort -o eleveai-maths-terminale-convexite-tangente-short --media_dir manim/scripts/terminale/media-convexite-tangente-short
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
from convexite_tangente import CONCAVE, CONVEXE, FAISCEAU, GOUDRON, Graphe, voiture  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

LARGEUR_MAX = 4.0
FOND_CARTE = "#0b1220"
XA, XB = -2.0, 2.0          # la route et la courbe : la même abscisse
S_AUTO = 0.5                # la voiture, réduite


def route(x):
    """La route (en haut) : un creux en x = −1, une bosse en x = 1."""
    return 1.35 - 0.45 * math.cos(math.pi * (x + 1) / 2)


def pente_route(x):
    return 0.45 * math.pi / 2 * math.sin(math.pi * (x + 1) / 2)


def courbe(x):
    """La courbe (en bas) : la même forme, convexe sur [−2 ; 0], concave sur [0 ; 2]."""
    return -1.2 - 0.6 * math.cos(math.pi * (x + 1) / 2)


def pente_courbe(x):
    return 0.6 * math.pi / 2 * math.sin(math.pi * (x + 1) / 2)


assert route(-1) < route(-1.5) and route(1) > route(1.5)
assert f"{math.exp(0.5):.3f}" == "1.649" and 0.5 + 1 == 1.5


def trace(f, a, b, color, sw=5):
    m = VMobject(stroke_color=color, stroke_width=sw)
    m.set_points_smoothly([P(x, f(x)) for x in np.linspace(a, b, 70)])
    return m


class ConvexiteTangenteShort(AuditSynchro, MotsCales, Short6e):
    fichier_marques = "convexite_tangente_micro_short_marques.json"
    nom_voix = "terminale-convexite-tangente-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, audit=True):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        if not audit:
            t._pas_audit = True
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_mot(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def au_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    # ── la voiture, ses phares, la tangente en bas ──────────────────────────

    def auto(self, x):
        a = math.atan(pente_route(x))
        return voiture(s=S_AUTO).rotate(a, about_point=ORIGIN).shift(P(x, route(x)))

    def faisceau(self, x):
        a = math.atan(pente_route(x))
        c = P(x, route(x))
        d, n = P(math.cos(a), math.sin(a)), P(-math.sin(a), math.cos(a))
        h = c + 0.46 * S_AUTO * d + 0.23 * S_AUTO * n
        L, tache = None, VGroup()
        ts = np.arange(0.05, 3.0, 0.005)
        xs, ys = h[0] + ts * d[0], h[1] + ts * d[1]
        dedans = np.cumprod((xs <= 2.05) & (ys <= 2.3)).astype(bool)
        sous = dedans & (ys <= 1.35 - 0.45 * np.cos(np.pi * (xs + 1) / 2))
        if sous.any():
            k = int(np.argmax(sous))
            L, p = ts[k], P(xs[k], ys[k])
            tache = Ellipse(width=0.32, height=0.1, fill_color=FAISCEAU, fill_opacity=0.8, stroke_width=0)
            tache.rotate(math.atan(pente_route(p[0]))).move_to(p)
        if L is None:
            L = max(0.2, min((2.05 - h[0]) / max(math.cos(a), 0.3), (2.3 - h[1]) / max(math.sin(a), 0.05)))

        def rot(v, b):
            return P(v[0] * math.cos(b) - v[1] * math.sin(b), v[0] * math.sin(b) + v[1] * math.cos(b))
        cone = Polygon(h, h + L * rot(d, 0.14), h + L * rot(d, -0.14), stroke_width=0, fill_color=FAISCEAU,
                       fill_opacity=0.25)
        rayon = Line(h, h + L * d, stroke_width=2.5, color=FAISCEAU, stroke_opacity=0.9)
        return VGroup(cone, rayon, tache)

    def tangente(self, x):
        m = pente_courbe(x)
        a, b = max(XA - 0.05, x - 0.85), min(XB + 0.05, x + 0.85)
        ln = Line(P(a, courbe(x) + m * (a - x)), P(b, courbe(x) + m * (b - x)), color=FAISCEAU, stroke_width=4)
        return VGroup(ln, Dot(P(x, courbe(x)), radius=0.06, color=FAISCEAU))

    def lien(self, x):
        return DashedLine(P(x, route(x) - 0.06), P(x, courbe(x) + 0.1), color=GREY_B, stroke_width=1.5,
                          dash_length=0.06).set_opacity(0.6)

    def segment(self, f, a, b, color, sw):
        return trace(f, a, b, color, sw)

    def construct(self):
        self.margo_bas()
        titre = self.t("Convexité et tangentes", 36, JAUNE_TITRE).move_to(P(0, 3.5))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.95))
        self.add(titre, badge)

        # ── 00 : la nuit, la route qui monte et qui descend ──
        self.dire("00-accroche")
        rng = np.random.default_rng(3)
        etoiles = VGroup(*[Dot(P(x, y), radius=0.018 + 0.015 * rng.random(), color=WHITE).set_opacity(0.8)
                           for x, y in zip(rng.uniform(-1.9, 1.9, 12), rng.uniform(2.05, 2.4, 12))])
        sol = Polygon(*[P(x, route(x)) for x in np.linspace(XA, XB, 60)], P(XB, 0.75), P(XA, 0.75),
                      fill_color="#14261a", fill_opacity=1, stroke_width=0)
        chaussee = self.segment(route, XA, XB, GOUDRON, 8)
        xv = ValueTracker(-1.7)
        car = always_redraw(lambda: self.auto(xv.get_value()))
        self.au_mot("La nuit")
        self.play(LaggedStart(*[FadeIn(e, scale=2) for e in etoiles], lag_ratio=0.05), FadeIn(sol), run_time=0.5)
        self.au_mot("une route")
        self.play(Create(chaussee), FadeIn(car), run_time=0.6)
        self.au_mot("qui monte")
        self.play(xv.animate.set_value(-1.5), run_time=0.6)
        self.au_mot("où éclairent")
        ques = self.t("Où éclairent tes phares ?", 32, FAISCEAU, largeur=3.7).move_to(P(0, -1.0))
        self.play(FadeIn(ques, scale=1.2), run_time=0.4)
        self.insister(ques, 1.05)
        self.attendre_voix(marge=0.2)

        # ── 01 : le creux (convexe), puis la bosse (concave), synchrones ──
        self.dire("01-image")
        axe = Arrow(P(XA - 0.05, -2.02), P(XB + 0.1, -2.02), buff=0, stroke_width=2, color=GREY_B, tip_length=0.12)
        grise = self.segment(courbe, XA, XB, GREY_B, 5)
        self.au_mot("Dans un creux")
        self.play(FadeOut(ques), Create(axe), Create(grise), xv.animate.set_value(-1.0), run_time=0.9,
                  rate_func=rate_functions.ease_out_sine)
        creux = self.segment(route, -1.9, -0.1, CONVEXE, 8)
        self.add(creux)
        self.bring_to_front(car)
        self.au_mot("éclairent la route")
        beam = always_redraw(lambda: self.faisceau(xv.get_value()))
        tg = always_redraw(lambda: self.tangente(xv.get_value()))
        lien = always_redraw(lambda: self.lien(xv.get_value()))
        self.add(beam, lien, tg)
        self.bring_to_front(car)
        self.play(FadeIn(beam), FadeIn(tg), FadeIn(lien), run_time=0.4)
        self.au_mot("au-dessus de leur faisceau")
        c1 = self.deux("creux : la route est", "au-dessus du faisceau", 28, CONVEXE, 0.3)
        self.play(FadeIn(c1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("courbe convexe")
        cvx = self.segment(courbe, XA, 0, CONVEXE, 6)
        c2 = self.deux("courbe convexe :", "au-dessus de sa tangente", 26, CONVEXE, -2.5)
        self.play(Create(cvx), FadeIn(c2, shift=UP * 0.1), run_time=0.6)
        self.bring_to_front(tg)
        self.au_mot("Sur une bosse")
        self.play(FadeOut(c1), FadeOut(c2), xv.animate.set_value(1.0), run_time=1.4,
                  rate_func=rate_functions.ease_in_out_sine)
        self.au_mot("éclairent le ciel")
        c3 = self.deux("bosse : les phares", "éclairent le ciel", 28, CONCAVE, 0.3)
        self.play(FadeIn(c3, shift=UP * 0.1), etoiles.animate.set_color(FAISCEAU), run_time=0.4)
        self.au_mot("passe dessous")
        bosse = self.segment(route, 0.1, 1.9, CONCAVE, 8)
        self.play(Create(bosse), run_time=0.5)
        self.bring_to_front(car)
        self.au_mot("courbe concave")
        ccv = self.segment(courbe, 0, XB, CONCAVE, 6)
        c4 = self.deux("courbe concave :", "sous sa tangente", 26, CONCAVE, -2.5)
        self.play(Create(ccv), FadeIn(c4, shift=UP * 0.1), run_time=0.6)
        self.bring_to_front(tg)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause : au sommet, les phares éclairent ? ──
        self.dire("02-question")
        t0 = self.renderer.time
        bas = VGroup(axe, grise, cvx, ccv, c3, c4)
        tg.clear_updaters()
        lien.clear_updaters()
        beam.clear_updaters()
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=26)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, 0.25))
        self.play(FadeOut(bas), FadeOut(tg), FadeOut(lien), FadeOut(beam), FadeIn(tete, shift=DOWN * 0.15),
                  run_time=0.4)
        self.au_mot("Au sommet")
        q1 = self.t("Au sommet d'une colline,", 26).move_to(P(0, -0.16))
        q2 = self.t("les phares éclairent :", 26).move_to(P(0, -0.5))
        self.play(FadeIn(q1, shift=UP * 0.1), Indicate(car, color=CONCAVE, scale_factor=1.3), run_time=0.45)
        self.au_mot("les phares")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.35)
        cartes = VGroup(*[self.carte(l, c) for l, c in zip("ABC", ["la route", "le ciel", "le bas-côté"])])
        cartes.arrange(DOWN, buff=0.1).move_to(P(0, -1.52))
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.2)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).move_to(P(0, -2.6))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=1", flush=True)

        # ── 02b : la réponse : le ciel ──
        self.dire("02b-reponse")
        b = cartes[1]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK),
                  cartes[0].animate.set_opacity(0.3), cartes[2].animate.set_opacity(0.3), FadeOut(pause),
                  FadeOut(rebours), run_time=0.25)
        ok = self.coche(VERT_OK, 0.16).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        self.au_mot("la route passe sous")
        bosse2 = self.segment(route, 1.0, 1.95, CONCAVE, 10)
        ex1 = self.t("la route passe sous", 28, CONCAVE).move_to(P(0, -0.16))
        ex2 = self.t("le faisceau", 28, CONCAVE).move_to(P(0, -0.5))
        self.play(FadeOut(q1), FadeOut(q2), FadeIn(ex1, shift=UP * 0.1), Indicate(bosse2, color=CONCAVE,
                  scale_factor=1.05), run_time=0.6)
        self.au_mot("le faisceau :")
        self.play(FadeIn(ex2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("part vers le ciel")
        beam2 = self.faisceau(1.0)
        self.add(beam2)
        self.bring_to_front(car)
        self.play(FadeIn(beam2), Flash(etoiles[5], color=FAISCEAU, line_length=0.15), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.remove(bosse2)

        # ── 03 : à toi : eˣ ≥ x + 1, quel minimum pour e^0,5 ? ──
        self.dire("03-commentaire")
        car.clear_updaters()
        haut = VGroup(etoiles, sol, chaussee, creux, bosse, car, beam2)
        self.au_mot("À toi")
        toi = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 2.15))
        self.play(FadeOut(haut), FadeOut(VGroup(tete, ex1, ex2, cartes, ok)), FadeIn(toi, scale=1.2), run_time=0.45)
        g = Graphe((-2.3, 1.1), (-1.4, 3.1), (-1.95, -1.45), (1.95, 1.7))
        ce = g.courbe(math.exp, -2.3, 1.1, CONVEXE, 5)
        le = puissance("e", "x", 32, CONVEXE).next_to(g.G(1.1, math.exp(1.1)), LEFT, buff=0.12)
        self.au_mot("exponentielle de x")
        axes = g.axes()
        self.play(Create(axes), Create(ce), FadeIn(le), run_time=0.6)
        self.au_pos(self._texte_voix.find("1", self._texte_voix.find("x plus 1")))
        tgx = g.droite(1, 0, 1, -2.3, 1.1, FAISCEAU, 4)
        ly = self.t("y = x + 1", 26, FAISCEAU).move_to(g.G(-0.85, -0.95))
        self.play(Create(tgx), FadeIn(ly), run_time=0.5)
        q3 = self.t("Quel minimum", 30, ORANGE_RETENUE)
        e05 = puissance("e", "0,5", 34, ORANGE_RETENUE)
        q4 = VGroup(self.t("pour", 30, ORANGE_RETENUE), e05, self.t("?", 30, ORANGE_RETENUE)).arrange(RIGHT, buff=0.12)
        qq = VGroup(q3, q4).arrange(RIGHT, buff=0.15)
        if qq.width > LARGEUR_MAX:
            qq.scale_to_fit_width(LARGEUR_MAX)
        qq.move_to(P(0, -1.95))
        self.au_mot("Quel minimum")
        self.play(FadeIn(q3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("0,5")
        v = g.vers_x(0.5, 1.5)
        g05 = self.t("0,5", 22, GREY_A).next_to(g.G(0.5, 0), DOWN, buff=0.08)
        pt = Dot(g.G(0.5, 1.5), radius=0.07, color=FAISCEAU)
        inter = self.t("?", 30, FAISCEAU).next_to(pt, LEFT, buff=0.12)
        self.play(FadeIn(q4, shift=UP * 0.1), Create(v), FadeIn(g05), FadeIn(pt, scale=2), FadeIn(inter),
                  run_time=0.5)
        self.insister(VGroup(pt, inter), 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.7).move_to(P(0, -2.5))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 04 : la fin ──
        self.fin_short("04-abonne", [titre, toi, badge, axes, ce, le, tgx, ly, qq, v, g05, pt, inter, appel])

    def deux(self, a, b, fs, color, y):
        """Une légende sur deux lignes, centrée en y."""
        return VGroup(self.t(a, fs, color), self.t(b, fs, color)).arrange(DOWN, buff=0.08).move_to(P(0, y))

    def carte(self, lettre, corps, largeur=3.4, fs=26):
        rond = Circle(radius=0.17, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.22)
        cadre = RoundedRectangle(width=largeur, height=0.46, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)
