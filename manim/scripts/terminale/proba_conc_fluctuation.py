# proba_conc_fluctuation.py
# EleveAI — Maths Tle spé (micro concentration_fluctuation, notion
# concentration_echantillonnage) — série « Probabilités » : FLUCTUATION
# D'ÉCHANTILLONNAGE EN TERMINALE, AVEC VOIX. Paysage 16:9, ceinture NOIRE.
# Short : proba_conc_fluctuation_short.py.
#
# Domaine : le SPORT. Enzo, analyste de données d'un club de handball, suit le
# taux de réussite aux tirs d'une joueuse (p = 0,7, 20 tirs par match). Un
# match à 11 sur 20 : est-ce grave ? L'inégalité de concentration répond.
#
# ⭐ Canvas du coach : la banque (concentration.bank.ts) n'a aucun canvas ; on
# reprend le `stat_graph` « barres » (StatGraphCanvas.tsx : carte blanche,
# axes encre #0f172a, barres gris ardoise #94a3b8 bordées #334155, barre
# active bordée d'ambre #f59e0b, valeur écrite au-dessus en encre).
# ⭐ VRAI tirage (numpy, graine 4788, tir par tir) : 10 matchs de 20 tirs →
# 14, 15, 11, 13, 12, 15, 15, 17, 13, 12 ; puis 10 saisons de 400 tirs.
# Nombres exacts : 0,7 × 0,3 = 0,21 ; 0,21 / (20 × 0,0225) = 0,4667 ;
# 0,21 / (400 × 0,0225) = 0,0233 ; la vraie probabilité P(|F₂₀ − 0,7| ≥ 0,15)
# avec B(20 ; 0,7) = 0,2204 ; défi : 0,21 / (400 × 0,0025) = 0,21.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au moment où la voix le dit.
#
# Voix : manim/voix/terminale-proba-conc-fluctuation.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conc_fluctuation.py ProbaConcFluctuationTerminale -o eleveai-maths-terminale-proba-conc-fluctuation --media_dir manim/scripts/terminale/media-conc_fluct
# Sortie : manim/sorties/terminale/maths/probabilites/35-conc-fluctuation/

import sys
from math import comb
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_lgn import (  # noqa: E402
    BLEU_NB, BORD, ENCRE, ConcBase, P, Tableau, echelle_ceintures, fraction, indice, puissance, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402

# ── le vrai tirage ──────────────────────────────────────────────────────────
PP = 0.7
_r = np.random.default_rng(4788)
TIRS = _r.random((10, 20)) < PP            # 10 matchs, 20 tirs, True = réussi
MATCHS = TIRS.sum(axis=1)
SAISONS = (_r.random((10, 400)) < PP).sum(axis=1)
F_MATCH = MATCHS / 20
F_SAISON = SAISONS / 400
assert list(MATCHS) == [14, 15, 11, 13, 12, 15, 15, 17, 13, 12]
assert abs(F_SAISON - PP).max() < 0.15
assert f"{0.7 * 0.3:.2f}" == "0.21"
assert f"{0.21 / (20 * 0.0225):.2f}" == "0.47" and f"{0.21 / (400 * 0.0225):.3f}" == "0.023"
VRAIE = sum(comb(20, k) * PP ** k * (1 - PP) ** (20 - k) for k in range(21) if abs(k / 20 - PP) >= 0.15 - 1e-9)
assert f"{VRAIE:.2f}" == "0.22"
assert abs(0.21 / (400 * 0.0025) - 0.21) < 1e-12

BARRE = "#94a3b8"
BARRE_BORD = "#334155"
AMBRE = "#f59e0b"
LIGNE_P = "#16A34A"
BALLON_B = "#2563EB"
BALLON_R = "#DC2626"
REUSSI = "#22C55E"
RATE = "#EF4444"


class CarteBarres(VGroup):
    """Le stat_graph « barres » du coach : une barre par échantillon, à la
    VRAIE hauteur de sa fréquence (axe de 0 à 1, sans graduation chiffrée)."""

    def __init__(self, freqs, larg=6.6, haut=4.4, titre="Fréquence de tirs réussis", bas="matchs"):
        super().__init__()
        self.freqs = list(freqs)
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.titre = Text(titre, font_size=24, color=ENCRE, weight=BOLD).next_to(self.carte.get_top(), DOWN,
                                                                                 buff=0.15)
        self.x0, self.x1 = -larg / 2 + 0.45, larg / 2 - 0.85
        self.y0, self.y1 = -haut / 2 + 0.6, haut / 2 - 0.65
        self.ax = Line(P(self.x0, self.y0), P(self.x1 + 0.2, self.y0), color=ENCRE, stroke_width=3)
        self.ay = Line(P(self.x0, self.y0), P(self.x0, self.y1), color=ENCRE, stroke_width=3)
        self.lbas = Text(bas, font_size=22, color=ENCRE).next_to(self.ax, DOWN, buff=0.1)
        n = len(self.freqs)
        self.slot = (self.x1 - self.x0) / n
        self.barres = VGroup()
        for i, f in enumerate(self.freqs):
            h = (self.y1 - self.y0) * f
            b = Rectangle(width=self.slot * 0.62, height=h, fill_color=BARRE, fill_opacity=1,
                          stroke_color=BARRE_BORD, stroke_width=1.5)
            b.move_to(P(self.x0 + self.slot * (i + 0.5), self.y0 + h / 2))
            self.barres.add(b)
        self.add(self.carte, self.titre, self.ax, self.ay, self.lbas, self.barres)

    def gy(self, f):
        return self.carte.get_center()[1] + self.y0 + (self.y1 - self.y0) * f

    def gx(self, x):
        return self.carte.get_center()[0] + x

    def ligne(self, v, color=LIGNE_P):
        return DashedLine(P(self.gx(self.x0), self.gy(v)), P(self.gx(self.x1 + 0.15), self.gy(v)),
                          dash_length=0.13, color=color, stroke_width=4)

    def etiquette(self, ligne, texte, color=LIGNE_P, fs=28):
        return Text(texte, font_size=fs, color=color, weight=BOLD).next_to(ligne, RIGHT, buff=0.1)

    def valeur(self, i, texte, fs=26, color=ENCRE):
        t = Text(texte, font_size=fs, color=color, weight=BOLD)
        return t.next_to(self.barres[i], UP, buff=0.08)

    def bande(self, v, d, color=AMBRE, opacite=0.25):
        r = Rectangle(width=self.x1 + 0.15 - self.x0, height=self.gy(v + d) - self.gy(v - d),
                      fill_color=color, fill_opacity=opacite, stroke_width=0)
        return r.move_to(P(self.gx((self.x0 + self.x1 + 0.15) / 2), self.gy(v)))

    def activer(self, i, color=AMBRE):
        return self.barres[i].animate.set_stroke(color, 4)

    def pousser(self, run_time=1.2):
        """Les barres poussent depuis l'axe, l'une après l'autre."""
        return LaggedStart(*[GrowFromEdge(b, DOWN) for b in self.barres], lag_ratio=0.12, run_time=run_time)


def ballon(s=1.0):
    """Le ballon de handball : blanc, deux bandes colorées."""
    c = Circle(radius=0.4, fill_color=WHITE, fill_opacity=1, stroke_color="#0F172A", stroke_width=2)
    a = Arc(radius=0.4, start_angle=PI * 0.15, angle=PI * 0.7, color=BALLON_B, stroke_width=6)
    b = Arc(radius=0.4, start_angle=PI * 1.15, angle=PI * 0.7, color=BALLON_R, stroke_width=6)
    m = ArcBetweenPoints(P(-0.38, 0.1), P(0.38, 0.1), angle=-PI / 3, color="#0F172A", stroke_width=2)
    return VGroup(c, a, b, m).scale(s)


def but(s=1.0):
    """La cage : poteaux blancs et rouges, filet en grille."""
    w, h = 3.0, 2.0
    filet = VGroup(*[Line(P(-w / 2 + w * i / 10, -h / 2), P(-w / 2 + w * i / 10, h / 2)) for i in range(1, 10)],
                   *[Line(P(-w / 2, -h / 2 + h * j / 6), P(w / 2, -h / 2 + h * j / 6)) for j in range(1, 6)])
    filet.set_stroke("#CBD5E1", 1.2, opacity=0.6)
    cadre = VGroup(Line(P(-w / 2, -h / 2), P(-w / 2, h / 2)), Line(P(-w / 2, h / 2), P(w / 2, h / 2)),
                   Line(P(w / 2, h / 2), P(w / 2, -h / 2)))
    cadre.set_stroke(WHITE, 8)
    rayures = VGroup(*[Line(P(-w / 2, -h / 2 + k * 0.4), P(-w / 2, -h / 2 + k * 0.4 + 0.2)) for k in range(5)],
                     *[Line(P(w / 2, -h / 2 + k * 0.4), P(w / 2, -h / 2 + k * 0.4 + 0.2)) for k in range(5)])
    rayures.set_stroke(BALLON_R, 8)
    return VGroup(filet, cadre, rayures).scale(s)


def pastilles(tirs, r=0.11, buff=0.06):
    """Les 20 tirs d'un match : pastille verte = réussi, rouge = raté."""
    return VGroup(*[Circle(radius=r, fill_color=REUSSI if t else RATE, fill_opacity=1, stroke_width=0)
                    for t in tirs]).arrange_in_grid(rows=2, cols=10, buff=buff)


def fn(fs=44, color=WHITE, ind="n"):
    return indice("F", ind, fs, color)


def esp_fn(fs=44, lettre="E", droite="p", color=WHITE):
    return suite(Text(f"{lettre}(", font_size=fs, color=color), fn(fs, color),
                 Text(f") = {droite}" if droite else ") =", font_size=fs, color=color), buff=0.04)


def borne(fs=44, color=WHITE, num="p(1 − p)", n="n", d="δ", c_num=None):
    """p(1 − p) / (n δ²) en Text."""
    nu = Text(num, font_size=fs, color=c_num or color)
    de = suite(Text(n, font_size=fs, color=color), puissance(d, "2", fs, color), buff=0.08)
    return fraction(nu, de, color=color)


class ProbaConcFluctuationBase(ConcBase):
    fichier_marques = "proba_conc_fluctuation_marques.json"
    nom_voix = "terminale-proba-conc-fluctuation"

    def carte_matchs(self, x=3.15, y=0.15, larg=6.8, haut=4.7):
        return CarteBarres(F_MATCH, larg=larg, haut=haut).move_to(P(x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Fluctuation d'échantillonnage", 54, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("un match raté, est-ce grave ?", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.05))
        c = CarteBarres(F_MATCH, larg=5.6, haut=3.0, titre="", bas="").move_to(P(-0.6, -0.55))
        self.add(ech, titre, VGroup(c.carte, c.ax, c.ay))
        self.au_mot("un match raté")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(c.pousser(1.4))
        self.play(c.activer(2), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'analyste du club de handball ─────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        cage = but(1.0).move_to(P(-4.0, 1.2))
        self.titre_ecran("L'analyste d'un club de handball", FadeIn(cage, shift=UP * 0.2))
        self.au_mot("analyste de données")
        ana = self.t("analyste de données", 36, BLEU_NB).move_to(P(-4.0, -0.4))
        self.play(FadeIn(ana, shift=UP * 0.1), run_time=0.5)
        self.au_mot("composer l'équipe")
        joueurs = VGroup(*[Circle(radius=0.17, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                           for c in [BALLON_B] * 7]).arrange(RIGHT, buff=0.15).next_to(ana, DOWN, buff=0.35)
        self.play(LaggedStart(*[FadeIn(j, scale=0.3) for j in joueurs], lag_ratio=0.1), run_time=0.7)
        self.au_mot("réussit 70 %")
        b = ballon(0.7).move_to(P(-0.2, -1.8))
        self.play(FadeIn(b, scale=0.5), run_time=0.3)
        self.play(b.animate.move_to(cage.get_center() + P(0.6, 0.2)).scale(0.7), path_arc=0.6, run_time=0.6)
        sept = suite(self.t("70 %", 66, REUSSI), self.t("de tirs réussis", 40), buff=0.3).move_to(P(2.9, 1.6))
        self.play(FadeIn(sept, scale=1.3), run_time=0.5)
        self.au_mot("p égale")
        pp = suite(self.t("p =", 50), self.t("0,7", 56, BLEU_NB), buff=0.2).move_to(P(2.9, 0.4))
        self.play(FadeIn(pp, shift=UP * 0.15), run_time=0.5)
        self.insister(pp[1], 0.25)
        self.au_mot("20 fois")
        vingt = self.t("20 tirs par match", 42).move_to(P(2.9, -0.8))
        pts = pastilles(TIRS[0], r=0.15, buff=0.08).next_to(vingt, DOWN, buff=0.3)
        for c in pts:
            c.set_fill("#64748B")
        self.play(FadeIn(vingt, shift=UP * 0.1), LaggedStart(*[FadeIn(c, scale=0.3) for c in pts], lag_ratio=0.04),
                  run_time=1.0)
        self.attendre_voix()

    # ── 02 : dix matchs simulés ─────────────────────────────────────────────

    def ecran_fluctue(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-fluctue")
        c = self.carte_matchs()
        fixes = VGroup(c.carte, c.titre, c.ax, c.ay, c.lbas)
        self.titre_ecran("Dix matchs, simulés en Python", FadeIn(fixes))
        X = -4.0
        etat = {"pts": None, "lbl": None}

        def match(i, extrait, mot):
            self.au_mot(extrait)
            pts = pastilles(TIRS[i], r=0.15, buff=0.08).move_to(P(X, 1.3))
            lbl = suite(self.t(mot, 52, REUSSI), self.t("sur 20", 40), buff=0.2).next_to(pts, DOWN, buff=0.35)
            v = c.valeur(i, str(MATCHS[i]))
            anims = [LaggedStart(*[FadeIn(p, scale=0.3) for p in pts], lag_ratio=0.03), GrowFromEdge(c.barres[i], DOWN),
                     FadeIn(lbl, shift=UP * 0.1)]
            if etat["pts"] is not None:
                anims.append(FadeOut(VGroup(etat["pts"], etat["lbl"])))
            self.play(*anims, run_time=0.8)
            self.play(FadeIn(v, scale=1.5), run_time=0.25)
            etat["pts"], etat["lbl"] = pts, lbl

        match(0, "14 tirs", "14")
        match(1, "puis 15", "15")
        match(2, "puis 11", "11")
        self.au_mot("La fréquence change")
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in c.barres[3:]], lag_ratio=0.15), run_time=1.2)
        self.au_mot("fluctuation d'échantillonnage")
        mots = VGroup(self.t("fluctuation", 46, JAUNE_TITRE), self.t("d'échantillonnage", 46, JAUNE_TITRE))
        mots.arrange(DOWN, buff=0.1).move_to(P(X, -1.9))
        cad = SurroundingRectangle(mots, color=JAUNE_TITRE, buff=0.2, corner_radius=0.12)
        self.play(FadeIn(mots, shift=UP * 0.15), Create(cad), run_time=0.7)
        self.play(*[Indicate(b, color=AMBRE, scale_factor=1.08) for b in c.barres], run_time=0.8)
        self.attendre_voix()

    # ── 03 : l'écart à p ────────────────────────────────────────────────────

    def ecran_ecart(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ecart")
        c = self.carte_matchs()
        self.titre_ecran("Au troisième match", FadeIn(c))
        X = -4.1
        self.au_mot("11 sur 20")
        onze = suite(self.t("11", 56, RATE), self.t("sur 20", 42), buff=0.2).move_to(P(X, 1.9))
        self.play(FadeIn(onze, shift=UP * 0.1), c.activer(2), run_time=0.5)
        self.au_mot("fréquence 0,55")
        fq = suite(self.t("fréquence", 40), self.t("0,55", 50, AMBRE), buff=0.25).move_to(P(X, 1.0))
        self.play(FadeIn(fq, shift=UP * 0.1), run_time=0.5)
        self.au_mot("L'écart à p")
        lp = c.ligne(PP)
        ep = c.etiquette(lp, "p")
        self.play(Create(lp), FadeIn(ep), run_time=0.6)
        self.au_mot("0,7 moins")
        calc = suite(self.t("0,7", 46, LIGNE_P), self.t("−", 46), self.t("0,55", 46, AMBRE), buff=0.2)
        calc.move_to(P(X, -0.1))
        self.play(FadeIn(calc, shift=UP * 0.1), run_time=0.5)
        self.au_mot("soit 0,15")
        res = suite(self.t("=", 46), self.t("0,15", 54, ORANGE_RETENUE), buff=0.2).next_to(calc, DOWN, buff=0.2)
        haut = np.array([c.barres[2].get_center()[0], c.gy(PP), 0])
        bas = c.barres[2].get_top()
        fl = DoubleArrow(bas, haut, buff=0, color=ORANGE_RETENUE, stroke_width=5, tip_length=0.15)
        self.play(FadeIn(res, scale=1.4), GrowFromCenter(fl), run_time=0.6)
        self.insister(res[1], 0.25)
        self.au_mot("L'entraîneur")
        inq = self.t("l'entraîneur s'inquiète…", 34, RATE).move_to(P(X, -1.85))
        self.play(FadeIn(inq, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("calcule")
        cal = self.t("l'analyste calcule !", 38, BLEU_NB).move_to(P(X, -2.65))
        self.play(FadeIn(cal, scale=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 04 : espérance, variance, inégalité ─────────────────────────────────

    def ecran_inegalite(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-inegalite")
        c = CarteBarres(F_MATCH, larg=5.4, haut=4.3).move_to(P(4.0, 0.55))
        lp = c.ligne(PP)
        ep = c.etiquette(lp, "p")
        X, fs = -3.3, 44
        l1 = suite(fn(fs + 4, JAUNE_TITRE), self.t(": fréquence sur n tirs", fs - 4), buff=0.15).move_to(P(X, 2.25))
        self.titre_ecran("L'inégalité de concentration", FadeIn(VGroup(c, lp, ep)), FadeIn(l1, shift=RIGHT * 0.2))
        self.au_mot("pour espérance p")
        l2 = esp_fn(fs).move_to(P(X, 1.3))
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(lp, color=LIGNE_P), run_time=0.6)
        self.au_mot("pour variance")
        # V(Fₙ) = p(1 − p) / n
        v_frac = fraction(self.t("p(1 − p)", fs), self.t("n", fs))
        l3 = suite(esp_fn(fs, "V", None), v_frac, buff=0.2).move_to(P(X, 0.1))
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("L'inégalité de concentration")
        pr = suite(self.t("P(|", fs), fn(fs), self.t("− p| ≥ δ)", fs), buff=0.06)
        pr[2].shift(RIGHT * 0.1)
        bo = borne(fs)
        ineg = suite(pr, self.t("≤", fs + 4), bo, buff=0.25)
        self.caser(ineg, 6.0).move_to(P(X, -1.65))
        cad = SurroundingRectangle(ineg, color=JAUNE_TITRE, buff=0.25, corner_radius=0.12)
        self.play(FadeIn(pr, shift=UP * 0.15), Create(cad), run_time=0.6)
        self.au_mot("d'au moins delta")
        bd = c.bande(PP, 0.15)
        self.play(FadeIn(bd), c.activer(2), c.activer(7), run_time=0.6)
        self.au_mot("delta : p fois")
        self.play(FadeIn(ineg[1]), FadeIn(bo, shift=UP * 0.15), run_time=0.7)
        self.au_mot("delta carré")
        self.insister(bo[2][1], 0.25, 1.4)
        self.attendre_voix()

    # ── 05 : le calcul, sur un match ────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calcul")
        self.titre_ecran("Le calcul, sur un match")
        fs = 46
        l1 = suite(self.t("p(1 − p) =", fs), self.t("0,7 × 0,3", fs, BLEU_NB), buff=0.25)
        self.au_mot("0,7 fois 0,3")
        l1.move_to(P(-2.4, 2.1))
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("soit 0,21")
        r21 = suite(self.t("=", fs), self.t("0,21", fs + 6, VERT_OK), buff=0.2).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r21, scale=1.4), run_time=0.4)
        self.au_mot("n égale 20")
        n20 = suite(self.t("n =", fs), self.t("20", fs, BLEU_NB), buff=0.2).move_to(P(-4.4, 0.95))
        self.play(FadeIn(n20, shift=UP * 0.1), run_time=0.4)
        self.au_mot("delta égale 0,15")
        d15 = suite(self.t("δ =", fs), self.t("0,15", fs, BLEU_NB), buff=0.2).next_to(n20, RIGHT, buff=1.0)
        self.play(FadeIn(d15, shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,21 sur 20")
        pr = suite(self.t("P(|", fs), fn(fs), self.t("− 0,7| ≥ 0,15)", fs), buff=0.06)
        pr[2].shift(RIGHT * 0.1)
        fr = fraction(self.t("0,21", fs, VERT_OK), self.t("20 × 0,0225", fs, BLEU_NB))
        env = self.t("≈", fs + 4)
        r47 = self.t("0,47", fs + 12, ORANGE_RETENUE)
        ligne = self.caser(suite(pr, self.t("≤", fs + 4), fr, env, r47, buff=0.25), 12.6).move_to(P(-0.5, -0.45))
        self.play(FadeIn(VGroup(pr, ligne[1]), shift=UP * 0.1), FadeIn(fr, shift=UP * 0.1), run_time=0.7)
        self.au_mot("environ 0,47")
        self.play(FadeIn(env), FadeIn(r47, scale=1.6), run_time=0.5)
        self.insister(r47, 0.25)
        # la jauge : une probabilité d'au plus 0,47, rien d'exclu
        self.au_mot("Un tel écart")
        y = -2.1
        fond = Rectangle(width=8.0, height=0.42, stroke_color=WHITE, stroke_width=2).move_to(P(-1.6, y))
        plein = Rectangle(width=8.0 * 0.4667, height=0.42, fill_color=ORANGE_RETENUE, fill_opacity=0.85,
                          stroke_width=0).align_to(fond, LEFT).align_to(fond, DOWN)
        self.play(Create(fond), GrowFromEdge(plein, LEFT), run_time=0.7)
        self.au_mot("un match raté")
        hz = self.t("un match raté : peut-être un simple hasard", 38, JAUNE_TITRE).move_to(P(-1.2, -3.0))
        self.play(FadeIn(hz, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 06 : sur une saison ─────────────────────────────────────────────────

    def ecran_taille(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-taille")
        cm = CarteBarres(F_MATCH, larg=5.9, haut=3.9, titre="Sur 20 tirs").move_to(P(-3.45, 0.85))
        lm = cm.ligne(PP)
        self.titre_ecran("Et sur une saison ?", FadeIn(VGroup(cm, lm)))
        self.au_mot("400 tirs")
        cs = CarteBarres(F_SAISON, larg=5.9, haut=3.9, titre="Sur 400 tirs", bas="saisons").move_to(P(3.05, 0.85))
        self.play(FadeIn(VGroup(cs.carte, cs.titre, cs.ax, cs.ay, cs.lbas), shift=LEFT * 0.2), run_time=0.6)
        self.insister(cs.titre, 0.25, 1.3)
        self.au_mot("Même écart")
        bm, bs = cm.bande(PP, 0.15), cs.bande(PP, 0.15)
        self.play(FadeIn(bm), FadeIn(bs), run_time=0.5)
        self.au_mot("0,21 sur 400")
        fs = 46
        fr = fraction(self.t("0,21", fs, VERT_OK), self.t("400 × 0,0225", fs, BLEU_NB))
        env = self.t("≈", fs + 4)
        r = self.t("0,023", fs + 10, ORANGE_RETENUE)
        ligne = suite(self.t("borne :", fs - 4), fr, env, r, buff=0.3).move_to(P(-1.0, -2.45))
        self.play(FadeIn(VGroup(ligne[0], fr), shift=UP * 0.15), run_time=0.6)
        self.au_mot("environ 0,023")
        self.play(FadeIn(env), FadeIn(r, scale=1.6), run_time=0.5)
        self.au_mot("Dix saisons")
        self.play(cs.pousser(1.4))
        self.au_mot("autour de 0,7")
        ls = cs.ligne(PP)
        e7 = cs.etiquette(ls, "0,7", fs=26)
        self.play(Create(ls), FadeIn(e7), run_time=0.5)
        self.play(Indicate(cs.barres, color=VERT_OK, scale_factor=1.05), run_time=0.8)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        self.titre_ecran("Le piège")
        fs = 46
        self.au_mot("lire 0,47")
        faux = suite(self.t("0,47", fs + 6, ORANGE_RETENUE), self.t("= la probabilité de l'écart", fs), buff=0.25)
        faux.move_to(P(-0.8, 2.0))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Ce n'est qu'un majorant")
        croix = self.barrer(faux[1])
        maj = suite(self.t("0,47", fs + 6, ORANGE_RETENUE), self.t(": seulement un majorant", fs), buff=0.25)
        maj.move_to(P(-0.8, 0.9))
        # deux barres : la borne, la vraie valeur
        L, x0 = 8.0, -4.4
        b1 = Rectangle(width=L * 0.4667, height=0.55, fill_color=ORANGE_RETENUE, fill_opacity=0.9, stroke_width=0)
        b1.move_to(P(x0 + L * 0.4667 / 2, -0.55))
        t1 = self.t("borne", 34, ORANGE_RETENUE).next_to(b1, LEFT, buff=0.25)
        self.play(Create(croix), FadeIn(maj, shift=UP * 0.1), GrowFromEdge(b1, LEFT), FadeIn(t1), run_time=0.8)
        self.au_mot("La vraie probabilité")
        b2 = Rectangle(width=L * VRAIE, height=0.55, fill_color=VERT_OK, fill_opacity=0.9, stroke_width=0)
        b2.move_to(P(x0 + L * VRAIE / 2, -1.95))
        t2 = self.t("vraie", 34, VERT_OK).next_to(b2, LEFT, buff=0.25)
        v22 = self.t("≈ 0,22", 50, VERT_OK).next_to(b2, RIGHT, buff=0.3)
        loi = self.t("(loi binomiale)", 34, BLEU_NB).next_to(v22, RIGHT, buff=0.35)
        self.play(FadeIn(t2, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("loi binomiale")
        self.play(FadeIn(loi, shift=UP * 0.1), run_time=0.4)
        self.au_mot("environ 0,22")
        self.play(GrowFromEdge(b2, LEFT), FadeIn(v22, scale=1.4), run_time=0.6)
        self.insister(v22, 0.25)
        self.attendre_voix(marge=1.2)

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        cs = CarteBarres(F_SAISON, larg=5.4, haut=3.8, titre="Sur 400 tirs", bas="saisons").move_to(P(3.9, 0.6))
        X, fs = -3.0, 44
        self.au_mot("400 tirs")
        q1 = suite(self.t("Sur", fs), self.t("400 tirs", fs, BLEU_NB), buff=0.2).move_to(P(X, 2.0))
        self.play(FadeIn(q1, shift=UP * 0.1), FadeIn(cs), run_time=0.6)
        self.au_mot("majore")
        q2 = self.t("majore la probabilité", fs).move_to(P(X, 1.05))
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("au moins 0,05")
        q3 = suite(self.t("d'un écart ≥", fs), self.t("0,05", fs, ORANGE_RETENUE), buff=0.2).move_to(P(X, 0.1))
        bd = cs.bande(PP, 0.05)
        self.play(FadeIn(q3, shift=UP * 0.1), FadeIn(bd), run_time=0.5)
        self.au_mot("et 0,7")
        q4 = suite(self.t("avec", fs), self.t("0,7", fs, VERT_OK), buff=0.2).move_to(P(X, -0.85))
        ls = cs.ligne(PP)
        self.play(FadeIn(q4, shift=UP * 0.1), Create(ls), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-1.2, -2.45))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        fs = 50
        self.au_mot("0,05 au carré")
        l1 = suite(puissance("0,05", "2", fs + 4, ORANGE_RETENUE), self.t("=", fs), buff=0.25).move_to(P(-2.6, 1.7))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,0025. 0,21")
        r1 = self.t("0,0025", fs, BLEU_NB).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r1, scale=1.4), run_time=0.4)
        self.au_mot("0,21 sur 400")
        fr = fraction(self.t("0,21", fs, VERT_OK), self.t("400 × 0,0025", fs, BLEU_NB))
        l2 = suite(fr, self.t("=", fs), self.t("0,21", fs + 8, VERT_OK), buff=0.3).move_to(P(-1.6, -0.2))
        self.play(FadeIn(fr, shift=UP * 0.1), run_time=0.6)
        self.play(FadeIn(l2[1]), FadeIn(l2[2], scale=1.5), run_time=0.5)
        self.au_mot("Au plus")
        conc = suite(self.t("probabilité ≤", fs), self.t("0,21", fs + 8, ORANGE_RETENUE), buff=0.3).move_to(P(-1.4, -2.2))
        cad = SurroundingRectangle(conc, color=ORANGE_RETENUE, buff=0.18, stroke_width=4)
        self.play(FadeIn(conc, shift=UP * 0.15), Create(cad), run_time=0.6)
        self.insister(VGroup(conc, cad), 0.3, 1.15)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        fs = 46
        l1 = VGroup(self.t("La fréquence fluctue", fs), self.t("d'un échantillon à l'autre", fs)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12)
        l2 = suite(esp_fn(fs, droite="p", color=WHITE), self.t("et", fs, GREY_B), esp_fn(fs, "V", None),
                   fraction(self.t("p(1 − p)", fs, BLEU_NB), self.t("n", fs, BLEU_NB)), buff=0.3)
        l3 = suite(self.t("n grand :", fs, ORANGE_RETENUE), fn(fs), self.t("se concentre autour de p", fs),
                   buff=0.2)
        self.finale([l1, l2, l3], ["La fréquence", "Espérance p", "Et plus n"], cle="09-finale", larg=11.6)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fluctue()
        self.ecran_ecart()
        self.ecran_inegalite()
        self.ecran_calcul()
        self.ecran_taille()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")


class ProbaConcFluctuationTerminale(ProbaConcFluctuationBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
