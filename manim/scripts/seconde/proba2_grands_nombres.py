# proba2_grands_nombres.py
# EleveAI — Maths 2de — série « Probabilités », épisode 14 : la loi des grands
# nombres (micro : echantillon_loi_grands_nombres), AVEC VOIX. Paysage 16:9,
# CEINTURE BLEUE. Short jumeau : proba2_grands_nombres_short.py (ceinture jaune).
#
# Le dessin : une PUNAISE (pointe en haut / pointe en bas) et LA COURBE de la
# fréquence de « pointe en haut » qui oscille puis se stabilise. La série de
# lancers est FIXÉE (graine 75) : 7 sur 10 (0,7), 62 sur 100 (0,62), 604 sur
# 1 000 (0,604) : exactement les fréquences dites.
#
# Écrans : 00 garde · 01 la punaise · 02 on répète : 10, 100, 1 000 lancers ·
# 03 la loi (l'entonnoir) · 04 estimer : environ 0,6 · 05 prévoir 3 000 sur
# 5 000 · 06 le piège (la loupe : ça fluctue encore) · 07 défi maternité ·
# 07b correction · 08 ce que tu as appris · 09 fin.
#
# ⭐ Canvas du coach : la banque de la micro (seconde/maths/echantillonnage.bank.ts)
# n'a PAS de canvas ; on reprend le canvas « tableau » de ProbabilitesCanvas.tsx
# (comme l'épisode 6e « répéter ») : en-têtes slate-100, cases blanches, case
# en ambre, et la formule du coach « fréquence = succès / total ».
# ⛔ PAS D'ÉCART : aucun nombre à l'écran avant d'être dit (pas de 0 ni de 1
# sur l'axe ; « 62 » et « 604 » ne s'écrivent pas : la voix ne les dit pas).
#
# Voix : manim/voix/seconde-proba-grands-nombres.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_grands_nombres.py Proba2GrandsNombres -o eleveai-maths-seconde-proba-grands-nombres --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/14-grands-nombres/.

import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# le canvas « tableau » du coach (ProbabilitesCanvas.tsx)
T_BORD = "#e2e8f0"       # slate-200
T_ENTETE = "#f1f5f9"     # slate-100
T_ENCRE = "#1e293b"      # slate-800
T_AMBRE = "#fef3c7"      # amber-100
T_AMBRE_TXT = "#78350f"  # amber-900
COUL_F = BLEU_CALCUL     # la courbe des fréquences
COUL_P = VERT_OK         # la probabilité (la ligne pointillée)
P_PUNAISE = 0.6          # la hauteur de la ligne « probabilité » (environ 0,6)


def P(x, y):
    return np.array([x, y, 0.0])


# ── les lancers : une série fixée (graine 75) ───────────────────────────────
# 7 « pointe en haut » sur les 10 premiers, 62 sur 100, 604 sur 1 000.

def lancers():
    r = np.random.default_rng(75)
    b1 = np.array([1] * 7 + [0] * 3)
    r.shuffle(b1)
    b2 = np.array([1] * 55 + [0] * 35)
    r.shuffle(b2)
    b3 = np.array([1] * 542 + [0] * 358)
    r.shuffle(b3)
    return np.concatenate([b1, b2, b3])


def frequences():
    s = lancers()
    return np.cumsum(s) / np.arange(1, len(s) + 1)


def frequences_longues():
    """Les mêmes 1 000 lancers, puis 4 000 de plus (pour la loupe du piège : aucun nombre affiché)."""
    r = np.random.default_rng(76)
    b4 = np.array([1] * 2400 + [0] * 1600)
    r.shuffle(b4)
    s = np.concatenate([lancers(), b4])
    return np.cumsum(s) / np.arange(1, len(s) + 1)


def punaise(pointe_en_haut=True, s=1.0):
    """Une punaise vue de côté : la tête rouge (disque aplati + dôme) et la pointe.
    Pointe en haut : posée sur sa tête ; pointe en bas : couchée, pointe au sol."""
    tete = RoundedRectangle(width=1.0, height=0.22, corner_radius=0.1, fill_color="#DC2626",
                            fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    dome = Ellipse(width=0.5, height=0.36, fill_color="#B91C1C", fill_opacity=1, stroke_color=WHITE,
                   stroke_width=2).next_to(tete, UP, buff=-0.08)
    pointe = Line(tete.get_bottom(), tete.get_bottom() + DOWN * 0.75, color="#CBD5E1", stroke_width=6)
    g = VGroup(pointe, dome, tete)
    if pointe_en_haut:
        g.rotate(PI)
    else:
        g.rotate(-1.15)
    return g.scale(s)


def frac_txt(num, den, fs=40, color=WHITE):
    """Une fraction écrite (sans LaTeX) : numérateur, barre, dénominateur."""
    n = Text(str(num), font_size=fs, color=color, weight=BOLD)
    d = Text(str(den), font_size=fs, color=color, weight=BOLD)
    larg = max(n.width, d.width) + 0.12
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3)
    return VGroup(n, barre, d).arrange(DOWN, buff=0.07)


class NotionSeconde2(Notion6e):
    identite = "Maths 2de — EleveAI"


class Proba2GrandsNombres(NotionSeconde2):
    nom_voix = "seconde-proba-grands-nombres"

    # ── outils ──────────────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=36, buff=0.18):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    # ── la courbe : x = nombre de lancers (1, 10, 100, 1 000 régulièrement
    #    espacés), y = fréquence de « pointe en haut » (de 0 à 1, sans nombre) ─

    GX0, GX1 = -5.7, 0.2
    GY0, GY1 = -2.45, 1.75

    def gx(self, n):
        return self.GX0 + (self.GX1 - self.GX0) * math.log10(n) / 3

    def gy(self, f):
        return self.GY0 + (self.GY1 - self.GY0) * f

    def gp(self, n, f):
        return P(self.gx(n), self.gy(f))

    def axes_courbe(self):
        ax = Arrow(P(self.GX0, self.GY0), P(self.GX1 + 0.7, self.GY0), buff=0, stroke_width=4,
                   color=WHITE, max_tip_length_to_length_ratio=0.04)
        ay = Line(P(self.GX0, self.GY0), P(self.GX0, self.GY1), stroke_width=4, color=WHITE)
        lx = self.t("lancers", 24).next_to(ax.get_end(), RIGHT, buff=0.12)
        ly = self.t("fréquence de « pointe en haut »", 24, COUL_F)
        ly.next_to(P(self.GX0, self.GY1), UP, buff=0.15).align_to(P(self.GX0 - 0.2, 0), LEFT)
        return VGroup(ax, ay, lx, ly)

    def ligne_proba(self):
        return DashedLine(P(self.GX0, self.gy(P_PUNAISE)), P(self.GX1 + 0.4, self.gy(P_PUNAISE)),
                          dash_length=0.15, color=COUL_P, stroke_width=4)

    def courbe(self, f, n0, n1, color=COUL_F, sw=4):
        pts = [self.gp(n, f[n - 1]) for n in range(n0, n1 + 1)]
        c = VMobject(stroke_color=color, stroke_width=sw)
        c.set_points_as_corners(pts)
        return c

    def graduation(self, n, texte):
        tr = Line(P(self.gx(n), self.GY0 - 0.12), P(self.gx(n), self.GY0 + 0.12), stroke_width=4)
        lb = self.t(texte, 26, JAUNE_TITRE).next_to(tr, DOWN, buff=0.1)
        return tr, lb

    def point_val(self, n, f, texte, haut=0.42):
        pt = Dot(self.gp(n, f), radius=0.1, color=JAUNE_TITRE)
        lb = self.t(texte, 30, JAUNE_TITRE).move_to(self.gp(n, f) + UP * haut)
        fond = BackgroundRectangle(lb, color=BLACK, fill_opacity=0.85, buff=0.06)
        return pt, VGroup(fond, lb)

    # ── le tableau du coach ─────────────────────────────────────────────────

    TX, TY = 4.15, 2.15      # centre haut du tableau
    TW = (2.0, 2.5)
    TH_ENT, TH = 0.95, 0.62

    def tableau(self):
        """Le canvas « tableau » : en-têtes gris clair, 3 lignes blanches vides."""
        g = VGroup()
        x_g = self.TX - sum(self.TW) / 2
        entetes = [("Nombre", "de lancers"), ("Fréquence de", "« pointe en haut »")]
        cases = []
        x = x_g
        for (a, b), w in zip(entetes, self.TW):
            r = Rectangle(width=w, height=self.TH_ENT, fill_color=T_ENTETE, fill_opacity=1,
                          stroke_color=T_BORD, stroke_width=2).move_to(P(x + w / 2, self.TY - self.TH_ENT / 2))
            txt = VGroup(Text(a, font_size=24, color=T_ENCRE, weight=BOLD),
                         Text(b, font_size=24, color=T_ENCRE, weight=BOLD)).arrange(DOWN, buff=0.06)
            if txt.width > w - 0.15:
                txt.scale_to_fit_width(w - 0.15)
            g.add(r, txt.move_to(r))
            x += w
        for i in range(3):
            ligne = []
            x = x_g
            y = self.TY - self.TH_ENT - self.TH * (i + 0.5)
            for w in self.TW:
                r = Rectangle(width=w, height=self.TH, fill_color=WHITE, fill_opacity=1,
                              stroke_color=T_BORD, stroke_width=2).move_to(P(x + w / 2, y))
                g.add(r)
                ligne.append(r)
                x += w
            cases.append(ligne)
        return g, cases

    def remplir(self, case, texte, ambre=False):
        return Text(texte, font_size=32, color=T_AMBRE_TXT if ambre else T_ENCRE, weight=BOLD).move_to(case)

    def surligner(self, case, on=True):
        return case.animate.set_fill(T_AMBRE if on else WHITE, 1)

    def punaise_qui_tombe(self, cible, pointe_en_haut, s=1.0, run_time=0.8):
        """La punaise tombe en tournoyant et se pose (le bas de la figure sur `cible`)."""
        pn = punaise(pointe_en_haut, s)
        pn.next_to(cible, UP, buff=0)
        fin = pn.copy()
        pn.shift(UP * 2.2).rotate(2.4)
        self.play(Transform(pn, fin, path_arc=-2.4), run_time=run_time, rate_func=rate_functions.ease_in_quad)
        return pn

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La loi des grands nombres", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        sol = Line(P(-5.4, -0.4), P(-2.6, -0.4), color=GREY_B, stroke_width=4)
        self.add(sol)
        self.punaise_qui_tombe(P(-4.0, -0.4), True, 1.1, 0.7)
        # une courbe qui oscille puis se resserre (sans nombre)
        xs = np.linspace(0, 1, 160)
        pts = [P(-1.6 + 5.0 * x, 0.35 + 1.0 * math.exp(-4.2 * x) * math.sin(26 * x)) for x in xs]
        c = VMobject(stroke_color=COUL_F, stroke_width=5).set_points_as_corners(pts)
        ref = DashedLine(P(-1.6, 0.35), P(3.4, 0.35), dash_length=0.15, color=COUL_P, stroke_width=4)
        self.au_mot("plus on répète")
        self.play(Create(ref), Create(c), run_time=1.5)
        self.au_mot("plus on s'approche")
        mot = self.t("plus on s'approche", 38, COUL_P).next_to(ref, DOWN, buff=0.9)
        self.play(FadeIn(mot, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : la punaise ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Une punaise")
        sol = Line(P(-5.4, -0.2), P(3.6, -0.2), color=GREY_B, stroke_width=4)
        self.play(Create(sol), run_time=0.4)
        self.au_mot("pointe en haut")
        haut = self.punaise_qui_tombe(P(-3.2, -0.2), True, 1.3, 0.6)
        lh = self.t("pointe en haut", 34, JAUNE_TITRE).next_to(P(-3.2, -0.2), DOWN, buff=0.3)
        self.play(FadeIn(lh, shift=UP * 0.15), run_time=0.3)
        self.au_mot("ou pointe en bas")
        bas = self.punaise_qui_tombe(P(1.6, -0.2), False, 1.3, 0.6)
        lb = self.t("pointe en bas", 34, ORANGE_RETENUE).next_to(P(1.6, -0.2), DOWN, buff=0.3)
        self.play(FadeIn(lb, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Personne ne connaît")
        q = self.ligne([("probabilité", WHITE), ("?", ORANGE_RETENUE)], 44, 0.25).move_to(P(-1.0, -1.75))
        self.play(FadeIn(q, shift=UP * 0.15), Circumscribe(haut, color=JAUNE_TITRE), run_time=0.5)
        self.insister(q[1], 0.3)
        self.au_mot("Comment l'estimer")
        self.play(Write(self.chute("Comment l'estimer ?", color=ORANGE_RETENUE, font_size=40)), run_time=0.8)
        self.attendre_voix()

    # ── 02 : on répète : 10, 100, 1 000 lancers ─────────────────────────────

    def palier(self, n, n_prec, ligne, txt_n, txt_f, ex_n, ex_f, run, extra=None):
        f, cases = self.f, self.cases
        self.au_mot(ex_n)
        c = self.courbe(f, n_prec, n)
        tr, lb = self.graduation(n, txt_n)
        nn = self.remplir(cases[ligne][0], txt_n)
        self.play(FadeIn(nn, scale=0.6), Create(tr), FadeIn(lb), run_time=0.3)
        self.play(Create(c), run_time=run, rate_func=linear)
        if extra:
            extra()
        self.au_mot(ex_f)
        pt, val = self.point_val(n, f[n - 1], txt_f)
        vv = self.remplir(cases[ligne][1], txt_f, ambre=True)
        self.play(FadeIn(pt, scale=0.5), FadeIn(val), self.surligner(cases[ligne][1]), FadeIn(vv), run_time=0.4)
        self.insister(val, 0.25)
        self.play(self.surligner(cases[ligne][1], False), vv.animate.set_color(T_ENCRE), run_time=0.2)
        return VGroup(c, tr, lb, nn, pt, val, vv)

    def ecran_repeter(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-repeter")
        self.titre = self.titre_ecran("On répète")
        self.f = f = frequences()
        axes = self.axes_courbe()
        tab, cases = self.tableau()
        self.cases = cases
        self.au_mot("On la lance beaucoup")
        self.play(Create(axes[0]), Create(axes[1]), FadeIn(axes[2:]), FadeIn(tab), run_time=0.7)

        def sept():
            self.au_mot("7 fois")
            l7 = self.t("7 fois pointe en haut", 32, JAUNE_TITRE).move_to(P(self.TX, -1.2))
            self.play(FadeIn(l7, shift=UP * 0.15), run_time=0.35)
            self.sept = l7

        g1 = self.palier(10, 1, 0, "10", "0,7", "10 lancers", "0,7", 0.9, sept)
        self.play(FadeOut(self.sept), run_time=0.2)
        g2 = self.palier(100, 10, 1, "100", "0,62", "100 lancers", "0,62", 1.0)
        g3 = self.palier(1000, 100, 2, "1 000", "0,604", "1 000 lancers", "0,604", 1.2)
        self.attendre_voix()
        self.fig = VGroup(axes, tab, g1, g2, g3)

    # ── 03 : la loi (l'entonnoir) ───────────────────────────────────────────

    def ecran_loi(self):
        self.dire("03-loi")
        titre = self.t("Plus on répète…", 40, JAUNE_TITRE).to_edge(UP)
        tab = self.fig[1]
        nums = VGroup(*[self.fig[i][j] for i in (2, 3, 4) for j in (3, 6)])
        self.play(Transform(self.titre, titre), FadeOut(tab), FadeOut(nums), run_time=0.5)
        self.au_mot("Plus le nombre de lancers")
        fl = Arrow(P(self.gx(3), self.GY0 + 0.35), P(self.gx(900), self.GY0 + 0.35), buff=0, color=JAUNE_TITRE,
                   stroke_width=8, max_tip_length_to_length_ratio=0.06)
        self.play(GrowArrow(fl), run_time=0.7)
        self.au_mot("plus la fréquence se stabilise")
        haut = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=4)
        bas = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=4)
        ns = np.logspace(0.55, 3, 60)
        haut.set_points_smoothly([self.gp(n, P_PUNAISE + 0.62 / math.sqrt(n)) for n in ns])
        bas.set_points_smoothly([self.gp(n, P_PUNAISE - 0.62 / math.sqrt(n)) for n in ns])
        self.play(Create(haut), Create(bas), FadeOut(fl), run_time=1.1)
        courbe = VGroup(self.fig[2][0], self.fig[3][0], self.fig[4][0])
        self.play(courbe.animate.set_stroke(width=6), run_time=0.4)
        self.au_mot("Elle s'approche de la probabilité")
        ld = self.ligne_proba()
        prob = self.t("probabilité", 32, COUL_P).next_to(ld.get_end(), RIGHT, buff=0.25)
        self.play(Create(ld), run_time=0.6)
        self.play(FadeIn(prob, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("c'est la loi")
        loi = VGroup(self.t("la loi des", 40, JAUNE_TITRE), self.t("grands nombres", 40, JAUNE_TITRE))
        loi.arrange(DOWN, buff=0.12).move_to(P(4.1, 1.55))
        cadre = SurroundingRectangle(loi, color=JAUNE_TITRE, buff=0.22, stroke_width=4, corner_radius=0.12)
        self.play(FadeIn(loi, scale=0.7), Create(cadre), run_time=0.6)
        self.insister(VGroup(loi, cadre), 0.3)
        self.attendre_voix()
        self.ld, self.prob, self.entonnoir = ld, prob, VGroup(haut, bas)

    # ── 04 : estimer : environ 0,6 ──────────────────────────────────────────

    def ecran_estimer(self):
        self.dire("04-estimer")
        titre = self.t("Estimer une probabilité", 40, JAUNE_TITRE).to_edge(UP)
        self.play(Transform(self.titre, titre), run_time=0.5)
        self.au_mot("On estime donc")
        l1 = self.ligne([("probabilité", COUL_P), ("≈", WHITE), ("fréquence", COUL_F)], 34, 0.2)
        l1.move_to(P(3.3, -0.95))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("d'un grand nombre d'essais")
        l2 = self.t("sur un grand nombre d'essais", 28, WHITE).next_to(l1, DOWN, buff=0.2)
        g3 = self.fig[4]
        self.play(FadeIn(l2, shift=UP * 0.15), Indicate(g3[5], color=JAUNE_TITRE), run_time=0.6)
        self.au_mot("environ 0,6")
        six = self.t("≈ 0,6", 36, COUL_P).next_to(self.prob, RIGHT, buff=0.2)
        self.play(FadeIn(six, scale=0.5), self.ld.animate.set_stroke(width=7), run_time=0.5)
        self.insister(six, 0.3)
        self.play(Create(SurroundingRectangle(VGroup(self.prob, six), color=COUL_P, buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 05 : prévoir : 3 000 sur 5 000 ──────────────────────────────────────

    def ecran_prevoir(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-prevoir")
        self.titre_ecran("Prévoir")
        self.au_mot("sur 5 000 lancers")
        x0, larg, y = -5.0, 9.0, 0.9
        blocs = VGroup(*[Rectangle(width=larg / 10, height=0.9, fill_color="#1E293B", fill_opacity=1,
                                   stroke_color=GREY_B, stroke_width=2).move_to(P(x0 + larg / 10 * (k + 0.5), y))
                         for k in range(10)])
        tout = self.ligne([("5 000", JAUNE_TITRE), ("lancers", WHITE)], 38).next_to(blocs, UP, buff=0.3)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in blocs], lag_ratio=0.06),
                  FadeIn(tout, shift=DOWN * 0.15), run_time=0.8)
        self.au_mot("environ 0,6 fois 5 000")
        six = VGroup(*blocs[:6])
        calc = self.ligne([("0,6", COUL_P), ("×", WHITE), ("5 000", JAUNE_TITRE)], 48, 0.25).move_to(P(-1.6, -1.2))
        self.play(six.animate.set_fill(COUL_P, 0.85), FadeIn(calc, shift=UP * 0.15), run_time=0.6)
        self.insister(calc[0], 0.3)
        self.au_mot("soit 3 000")
        acc = Brace(six, DOWN, color=COUL_P)
        trois = self.t("3 000", 40, COUL_P).next_to(acc, DOWN, buff=0.1)
        res = self.ligne([("=", WHITE), ("3 000", COUL_P)], 48, 0.25).next_to(calc, RIGHT, buff=0.25)
        self.play(GrowFromCenter(acc), FadeIn(trois), FadeIn(res, scale=0.6), run_time=0.6)
        self.play(Create(SurroundingRectangle(res[1], color=COUL_P, buff=0.1)), run_time=0.3)
        self.au_mot("fois pointe en haut")
        mots = self.t("fois pointe en haut", 34, WHITE).next_to(calc, DOWN, buff=0.35).align_to(calc, LEFT)
        pn = punaise(True, 0.55).next_to(mots, RIGHT, buff=0.3)
        self.play(FadeIn(mots, shift=UP * 0.15), FadeIn(pn, shift=DOWN * 0.3), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège : ça fluctue encore ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("croire que")
        l1 = self.ligne([("fréquence", COUL_F), ("=", WHITE), ("probabilité", COUL_P)], 44, 0.3).move_to(P(-0.8, 1.75))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("exactement")
        ex = self.t("exactement ?", 36, ORANGE_RETENUE).next_to(l1, RIGHT, buff=0.35)
        self.play(FadeIn(ex, scale=0.6), run_time=0.3)
        self.insister(l1[1], 0.3)
        barre = self.barrer(l1[1])
        self.play(Create(barre), run_time=0.3)
        self.au_mot("Elle s'en approche")
        presque = self.t("≈", 44, VERT_OK).move_to(l1[1])
        self.play(FadeOut(barre),
                  Transform(l1[1], presque), FadeOut(ex), run_time=0.5)
        # la loupe : la fin de la courbe, très agrandie verticalement
        f = frequences_longues()
        x0, x1, yc, k = -5.2, 3.0, -0.75, 55.0
        n0, n1 = 300, len(f)
        cadre = RoundedRectangle(width=x1 - x0 + 0.6, height=2.9, corner_radius=0.2, stroke_color=GREY_B,
                                 stroke_width=3).move_to(P((x0 + x1) / 2, yc))
        loupe = self.t("à la loupe", 26, GREY_B).next_to(cadre, UP, buff=0.08).align_to(cadre, LEFT)
        ld = DashedLine(P(x0, yc), P(x1, yc), dash_length=0.15, color=COUL_P, stroke_width=4)
        pts = [P(x0 + (x1 - x0) * (n - n0) / (n1 - n0), yc + k * (f[n - 1] - P_PUNAISE)) for n in range(n0, n1 + 1, 5)]
        c = VMobject(stroke_color=COUL_F, stroke_width=4).set_points_as_corners(pts)
        self.play(Create(cadre), FadeIn(loupe), Create(ld), run_time=0.5)
        self.play(Create(c), run_time=1.6, rate_func=linear)
        self.au_mot("mais elle continue de fluctuer")
        flu = self.t("elle fluctue encore un peu", 32, ORANGE_RETENUE).next_to(cadre, DOWN, buff=0.2)
        self.play(FadeIn(flu, shift=UP * 0.15), Wiggle(c, scale_value=1.05), run_time=0.9)
        self.attendre_voix()

    # ── 07 : défi : la maternité ────────────────────────────────────────────

    def bebe(self, couleur, s=1.0):
        corps = RoundedRectangle(width=0.5, height=0.62, corner_radius=0.22, fill_color=couleur, fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=2)
        tete = Circle(radius=0.2, fill_color="#FDE6C8", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).next_to(corps, UP, buff=-0.06)
        return VGroup(corps, tete).scale(s)

    def bebes(self):
        couleurs = ["#F472B6", "#60A5FA", "#F472B6", "#F472B6", "#60A5FA", "#60A5FA", "#F472B6", "#60A5FA",
                    "#F472B6", "#60A5FA"]
        return VGroup(*[self.bebe(c, 0.9) for c in couleurs]).arrange(RIGHT, buff=0.3).move_to(P(-0.8, 1.55))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        b = self.bebes()
        self.au_mot("Sur 2 000 naissances")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in b], lag_ratio=0.08), run_time=0.8)
        l1 = self.ligne([("2 000", JAUNE_TITRE), ("naissances", WHITE)], 40).move_to(P(-0.8, 0.35))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("une maternité")
        lieu = self.t("une maternité de Saint-Pierre", 28, GREY_B).next_to(l1, DOWN, buff=0.15)
        self.play(FadeIn(lieu), run_time=0.4)
        self.au_mot("1 030 filles")
        filles = VGroup(*[x for x in b if x[0].get_fill_color().to_hex().upper() == "#F472B6"])
        l2 = self.ligne([("1 030", "#F472B6"), ("filles", "#F472B6")], 40).move_to(P(-0.8, -0.85))
        self.play(FadeIn(l2, shift=UP * 0.15), *[x.animate.shift(UP * 0.2) for x in filles], run_time=0.5)
        self.insister(l2[0], 0.3)
        self.au_mot("Estime la probabilité")
        q = self.ligne([("P(fille)", WHITE), ("≈", WHITE), ("?", ORANGE_RETENUE)], 44, 0.25).move_to(P(-0.8, -1.85))
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.insister(q[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        self.add(self.bebes())
        self.au_mot("1 030 sur 2 000")
        fr = frac_txt("1 030", "2 000", 44, "#F472B6")
        fr[2].set_color(JAUNE_TITRE)
        lb = self.t("fréquence :", 36, COUL_F)
        g = VGroup(lb, fr).arrange(RIGHT, buff=0.3).move_to(P(-1.8, -0.4))
        self.play(FadeIn(lb), FadeIn(fr, scale=0.6), run_time=0.5)
        self.au_mot("environ 0,515")
        res = self.ligne([("≈", WHITE), ("0,515", VERT_OK)], 48, 0.25).next_to(fr, RIGHT, buff=0.35)
        self.play(FadeIn(res, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(res[1], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(res[1], 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = VGroup(self.ligne([("On répète beaucoup :", JAUNE_TITRE), ("la fréquence", COUL_F)], fs),
                    self.ligne([("se rapproche de la", WHITE), ("probabilité", COUL_P)], fs))
        l1.arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        l2 = self.ligne([("Estimer", COUL_P), ("une probabilité inconnue", WHITE)], fs)
        l3 = self.ligne([("Prévoir", COUL_P), ("un effectif", WHITE)], fs)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        for l in lignes:
            l[0].align_to(l[1], UP).shift(DOWN * 0.12)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, 0.35))
        for mot, l in zip(["Quand on répète", "estimer une probabilité", "prévoir un effectif"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 15")
        self.play(Write(self.chute("Épisode 15 : simuler", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
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
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_repeter()
        self.ecran_loi()
        self.ecran_estimer()
        self.ecran_prevoir()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
