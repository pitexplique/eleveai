# proba_conc_defi.py
# EleveAI — Maths Tle spé (micro concentration_defi, notion
# concentration_echantillonnage) — série « Probabilités » : EXERCICE TYPE BAC
# SUR LA CONCENTRATION, AVEC VOIX. Paysage 16:9, ceinture NOIRE.
# Short : proba_conc_defi_short.py.
#
# Domaine : le NUMÉRIQUE et les JEUX VIDÉO. Lina, data analyst d'un studio,
# mesure la proportion de joueurs qui finissent le premier niveau (60 %).
# Trois questions : E et V de Mₙ ; minorer P(0,55 < Mₙ < 0,65) ; la taille n.
#
# ⭐ Canvas du coach : la banque (concentration.bank.ts) n'a aucun canvas ; on
# reprend le canvas « tableau » de ProbabilitesCanvas.tsx pour la loi de Xᵢ
# (en-têtes slate-100, cases blanches, case allumée en ambre) et la droite
# graduée du coach (number_line) pour l'intervalle ]0,55 ; 0,65[.
# ⭐ VRAI tirage (numpy, graine 1) : 305 joueurs sur 500 finissent, Mₙ = 0,61.
# Nombres exacts (Python) : 0,6 × 0,4 = 0,24 ; 0,24 / 500 = 0,00048 ;
# 0,00048 / 0,05² = 0,192 ; 1 − 0,192 = 0,808 ; 0,24 / (0,05 × 0,0025) = 1 920 ;
# sans le carré 0,24 / (0,05 × 0,05) = 96 (vingt fois moins) ; défi :
# 0,24 / (0,05 × 0,01) = 480.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au moment où la voix le dit.
#
# Voix : manim/voix/terminale-proba-conc-defi.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conc_defi.py ProbaConcDefiTerminale -o eleveai-maths-terminale-proba-conc-defi --media_dir manim/scripts/terminale/media-conc_defi
# Sortie : manim/sorties/terminale/maths/probabilites/36-conc-defi/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_lgn import (  # noqa: E402
    BLEU_NB, ConcBase, P, Tableau, echelle_ceintures, fraction, indice, puissance, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402

# ── le vrai tirage et les nombres ───────────────────────────────────────────
N, PP = 500, 0.6
JOUEURS = np.random.default_rng(1).random(N) < PP      # True = finit le niveau
assert JOUEURS.sum() == 305 and JOUEURS.mean() == 0.61
assert abs(0.6 * 0.4 - 0.24) < 1e-12 and abs(0.24 / 500 - 0.00048) < 1e-12
assert abs(0.00048 / 0.05 ** 2 - 0.192) < 1e-9 and abs(1 - 0.192 - 0.808) < 1e-12
assert round(0.24 / (0.05 * 0.0025)) == 1920 and round(0.24 / (0.05 * 0.05)) == 96 and 1920 / 96 == 20
assert round(0.24 / (0.05 * 0.01)) == 480

FINIT = "#22C55E"
JOUEUR = "#475569"
ECRAN = "#1E1B4B"
PLATE = "#A16207"
INTERV = "#22C55E"


def mn(fs=44, color=WHITE):
    return indice("M", "n", fs, color)


def xi(fs=44, color=WHITE):
    return indice("X", "i", fs, color)


def fonc(lettre, sym, droite, fs=44, color=WHITE, c_d=None):
    """E(Mₙ) = 0,6 : lettre, symbole indicé, et le membre de droite."""
    g = suite(Text(f"{lettre}(", font_size=fs, color=color), sym, Text(") =", font_size=fs, color=color), buff=0.04)
    if droite is not None:
        d = droite if isinstance(droite, Mobject) else Text(droite, font_size=fs, color=c_d or color)
        g = suite(g, d, buff=0.2)
    return g


def grille_joueurs(cote=0.11, buff=0.04, cols=25):
    """Les 500 joueurs : un petit carré chacun (gris tant qu'on n'a pas joué)."""
    return VGroup(*[Square(side_length=cote, fill_color=JOUEUR, fill_opacity=1, stroke_width=0)
                    for _ in range(N)]).arrange_in_grid(rows=N // cols, cols=cols, buff=buff)


def niveau(s=1.0):
    """L'écran d'un jeu de plateforme : ciel nuit, plateformes, le héros, le drapeau d'arrivée."""
    fond = RoundedRectangle(width=5.0, height=3.0, corner_radius=0.15, fill_color=ECRAN, fill_opacity=1,
                            stroke_color="#A5B4FC", stroke_width=3)
    sol = Rectangle(width=5.0, height=0.35, fill_color=PLATE, fill_opacity=1, stroke_width=0)
    sol.align_to(fond, DOWN).align_to(fond, LEFT)
    plates = VGroup(*[Rectangle(width=w, height=0.18, fill_color=PLATE, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for x, y, w in ((-1.3, -0.55, 1.0), (0.0, -0.05, 0.9), (1.25, 0.45, 1.0))])
    etoiles = VGroup(*[Dot(P(x, y), radius=0.025, color=WHITE) for x, y in
                       ((-2.1, 1.1), (-1.0, 1.25), (0.4, 1.05), (1.6, 1.2), (-0.3, 0.75), (2.1, 0.9))])
    mat = Line(P(1.6, 0.54), P(1.6, 1.25), color=WHITE, stroke_width=3)
    drapeau = Polygon(P(1.6, 1.25), P(2.1, 1.08), P(1.6, 0.92), fill_color=FINIT, fill_opacity=1, stroke_width=0)
    heros = VGroup(Square(side_length=0.3, fill_color="#F472B6", fill_opacity=1, stroke_width=0),
                   Dot(P(0.06, 0.05), radius=0.035, color=BLACK)).move_to(P(-2.1, -1.0))
    return VGroup(fond, sol, plates, etoiles, mat, drapeau, heros).scale(s)


class Droite(VGroup):
    """La droite graduée du coach : de 0,5 à 0,7 ; graduations sans nombre,
    les nombres se posent quand la voix les dit."""

    def __init__(self, x0=-5.2, x1=4.2, y=0.0, a=0.5, b=0.7):
        super().__init__()
        self.x0, self.x1, self.y, self.a, self.b = x0, x1, y, a, b
        self.trait = Arrow(P(x0, y), P(x1 + 0.4, y), buff=0, color=WHITE, stroke_width=4,
                           max_tip_length_to_length_ratio=0.03)
        self.grad = VGroup(*[Line(P(self.x(v), y - 0.1), P(self.x(v), y + 0.1), color=WHITE, stroke_width=3)
                             for v in np.arange(0.5, 0.7001, 0.05)])
        self.add(self.trait, self.grad)

    def x(self, v):
        return self.x0 + (self.x1 - self.x0) * (v - self.a) / (self.b - self.a)

    def label(self, v, texte, fs=32, color=WHITE, bas=True):
        t = Text(texte, font_size=fs, color=color)
        return t.next_to(P(self.x(v), self.y), DOWN if bas else UP, buff=0.22)

    def intervalle(self, u, v, color=INTERV):
        bande = Rectangle(width=self.x(v) - self.x(u), height=0.34, fill_color=color, fill_opacity=0.35,
                          stroke_width=0).move_to(P((self.x(u) + self.x(v)) / 2, self.y))
        cg = Text("]", font_size=48, color=color).move_to(P(self.x(u), self.y))
        cd = Text("[", font_size=48, color=color).move_to(P(self.x(v), self.y))
        return VGroup(bande, cg, cd)

    def point(self, v, color=ORANGE_RETENUE):
        return Dot(P(self.x(v), self.y), radius=0.12, color=color)


class ProbaConcDefiBase(ConcBase):
    fichier_marques = "proba_conc_defi_marques.json"
    nom_voix = "terminale-proba-conc-defi"

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Inégalité de concentration", 54, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("un exercice type bac", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.05))
        nv = niveau(0.95).move_to(P(-0.6, -0.55))
        self.add(ech, titre, nv[:6])
        self.au_mot("exercice type bac")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), FadeIn(nv[6]), run_time=0.5)
        h = nv[6]
        pl = nv[2]
        for cible in (pl[0].get_top(), pl[1].get_top(), pl[2].get_top()):
            self.play(h.animate.move_to(cible + UP * 0.15), path_arc=-1.2, run_time=0.45)
        self.play(Flash(nv[5], color=FINIT), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : la data analyst du studio ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        nv = niveau(0.9).move_to(P(-3.85, 1.05))
        self.titre_ecran("Data analyst dans un studio de jeux vidéo", FadeIn(nv[:6]), FadeIn(nv[6]))
        self.au_mot("trop dur")
        dur = self.t("trop dur ?", 34, ROUGE_ERREUR).next_to(nv, DOWN, buff=0.15)
        self.play(FadeIn(dur, scale=1.4), Wiggle(nv[6]), run_time=0.7)
        self.au_mot("60 %")
        soix = suite(self.t("60 %", 64, FINIT), self.t("finissent le niveau 1", 36), buff=0.25).move_to(P(3.0, 2.3))
        self.caser(soix, 7.2)
        h = nv[6]
        self.play(FadeIn(soix, scale=1.2), run_time=0.5)
        self.play(h.animate.move_to(nv[5].get_center() + DOWN * 0.3), path_arc=-1.0, run_time=0.6)
        self.au_mot("n égale 500")
        g = grille_joueurs().move_to(P(3.0, 0.15))
        n5 = suite(self.t("n =", 40), self.t("500", 44, BLEU_NB), buff=0.15).next_to(g, DOWN, buff=0.25)
        self.play(FadeIn(g, lag_ratio=0.002), FadeIn(n5, shift=UP * 0.1), run_time=1.0)
        self.au_mot("X i vaut 1")
        X = -3.85
        l1 = suite(xi(40, JAUNE_TITRE), self.t("= 1 : le joueur i finit", 34), buff=0.18)
        self.caser(l1, 6.2).move_to(P(X, -1.3))
        self.play(FadeOut(dur), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("0 sinon")
        l2 = suite(xi(40, JAUNE_TITRE), self.t("= 0 sinon", 34), buff=0.18)
        l2.next_to(l1, DOWN, buff=0.3, aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("et M n")
        l3 = suite(mn(42, BLEU_NB), self.t(": la moyenne des", 34), xi(38), buff=0.15)
        l3.next_to(l2, DOWN, buff=0.3, aligned_edge=LEFT)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : question 1, E et V ─────────────────────────────────────────────

    def tab_loi(self):
        tb = Tableau(["valeur", "1", "0"], [2.6, 1.6, 1.6], lignes=1, h_ent=0.7, h=0.75, fs_ent=30, fs=36)
        return tb

    def ecran_q1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-q1")
        self.titre_ecran("Question 1 : espérance et variance")
        tb = self.tab_loi().move_to(P(-3.5, 1.85))
        lab = Text("probabilité", font_size=30, color="#1e293b", weight=BOLD).move_to(tb.cases[0][0])
        fs = 40
        self.au_mot("Bernoulli")
        ber = suite(xi(fs + 2, JAUNE_TITRE), self.t(": Bernoulli de paramètre", fs - 4), self.t("0,6", fs, BLEU_NB),
                    buff=0.15)
        self.caser(ber, 6.6).move_to(P(-3.5, 0.55))
        self.play(FadeIn(tb, shift=DOWN * 0.15), FadeIn(lab), FadeIn(ber[:2], shift=RIGHT * 0.2), run_time=0.6)
        self.play(FadeIn(ber[2], scale=1.4), FadeIn(tb.texte(0, 1, "0,6")), tb.allumer(0, 1), run_time=0.4)
        self.au_mot("espérance 0,6")
        e1 = fonc("E", xi(fs), "0,6", fs, c_d=VERT_OK).move_to(P(-3.5, -0.5))
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("variance 0,6 fois 0,4")
        v1 = fonc("V", xi(fs), "0,6 × 0,4", fs, c_d=BLEU_NB)
        self.caser(v1, 6.4).move_to(P(-3.9, -1.55))
        self.play(FadeIn(v1, shift=RIGHT * 0.2), FadeIn(tb.texte(0, 2, "0,4")), run_time=0.5)
        self.au_mot("soit 0,24")
        r24 = suite(self.t("=", fs), self.t("0,24", fs + 6, VERT_OK), buff=0.15).next_to(v1, RIGHT, buff=0.15)
        self.play(FadeIn(r24, scale=1.4), run_time=0.4)
        # Mₙ, colonne de droite
        self.au_mot("Donc E de M n")
        fl = Arrow(P(-0.4, -0.5), P(0.9, -0.5), color=JAUNE_TITRE, stroke_width=5, buff=0)
        e2 = fonc("E", mn(fs + 2, BLEU_NB), "0,6", fs + 2, c_d=VERT_OK).move_to(P(3.3, 0.4))
        self.play(GrowArrow(fl), FadeIn(e2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("V de M n")
        fr = fraction(self.t("0,24", fs + 2, VERT_OK), self.t("500", fs + 2, BLEU_NB))
        v2 = fonc("V", mn(fs + 2, BLEU_NB), fr, fs + 2).move_to(P(2.9, -1.0))
        self.play(FadeIn(v2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("0,00048")
        r = suite(self.t("=", fs + 2), self.t("0,00048", fs + 6, ORANGE_RETENUE), buff=0.3)
        r.next_to(v2, DOWN, buff=0.3).align_to(v2, LEFT).shift(RIGHT * 1.1)
        cad = SurroundingRectangle(r[1], color=ORANGE_RETENUE, buff=0.12)
        self.play(FadeIn(r, scale=1.3), Create(cad), run_time=0.5)
        self.attendre_voix()

    # ── 03 : question 2, minorer ────────────────────────────────────────────

    def ecran_q2(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-q2")
        d = Droite(y=1.75)
        self.titre_ecran("Question 2 : minorer une probabilité", FadeIn(d))
        fs = 40
        self.au_mot("0,55 et 0,65")
        it = d.intervalle(0.55, 0.65)
        l55, l65 = d.label(0.55, "0,55", 36, INTERV), d.label(0.65, "0,65", 36, INTERV)
        enc = suite(self.t("0,55 <", fs), mn(fs, BLEU_NB), self.t("< 0,65", fs), buff=0.12).move_to(P(-3.3, 0.55))
        self.play(FadeIn(it), FadeIn(l55), FadeIn(l65), FadeIn(enc, shift=UP * 0.1), run_time=0.7)
        self.au_mot("moins de 0,05 de 0,6")
        l6 = d.label(0.6, "0,6", 36, JAUNE_TITRE)
        acc = BraceBetweenPoints(P(d.x(0.6), d.y + 0.2), P(d.x(0.65), d.y + 0.2), UP, color=JAUNE_TITRE)
        a05 = self.t("0,05", 34, JAUNE_TITRE).next_to(acc, UP, buff=0.05)
        ec = suite(self.t("|", fs), mn(fs, BLEU_NB), self.t("− 0,6| < 0,05", fs), buff=0.08).move_to(P(2.8, 0.55))
        self.play(FadeIn(l6), GrowFromCenter(acc), FadeIn(a05), FadeIn(ec, shift=UP * 0.1), run_time=0.7)
        self.au_mot("Par l'inégalité")
        pr = suite(self.t("P(|", fs), mn(fs), self.t("− 0,6| ≥ 0,05)", fs), buff=0.06)
        pr[2].shift(RIGHT * 0.08)
        self.au_mot("au plus 0,00048")
        fr = fraction(self.t("0,00048", fs, ORANGE_RETENUE), puissance("0,05", "2", fs, BLEU_NB))
        ligne = self.caser(suite(pr, self.t("≤", fs + 4), fr, self.t("=", fs), self.t("0,192", fs + 6, ROUGE_ERREUR),
                                 buff=0.22), 12.4).move_to(P(-0.6, -0.75))
        self.play(FadeIn(VGroup(pr, ligne[1], fr), shift=UP * 0.1), run_time=0.7)
        self.au_mot("0,192. Donc")
        self.play(FadeIn(ligne[3]), FadeIn(ligne[4], scale=1.4), run_time=0.4)
        self.au_mot("au moins 1 moins")
        p2 = suite(self.t("P(0,55 <", fs), mn(fs), self.t("< 0,65)", fs), buff=0.08)
        res = suite(p2, self.t("≥ 1 − 0,192", fs), buff=0.2)
        res2 = suite(res, self.t("=", fs), self.t("0,808", fs + 8, VERT_OK), buff=0.22)
        self.caser(res2, 12.0).move_to(P(-0.6, -2.3))
        self.play(FadeIn(res, shift=UP * 0.1), run_time=0.6)
        self.au_mot("0,808")
        cad = SurroundingRectangle(res2[2], color=VERT_OK, buff=0.1)
        self.play(FadeIn(res2[1]), FadeIn(res2[2], scale=1.5), Create(cad), run_time=0.5)
        self.attendre_voix()

    # ── 04 : le vrai tirage ─────────────────────────────────────────────────

    def ecran_tirage(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-tirage")
        g = grille_joueurs(cote=0.13, buff=0.045).move_to(P(-3.6, 0.2))
        self.titre_ecran("Le vrai tirage, en Python", FadeIn(g))
        self.au_mot("305 joueurs")
        verts = [g[i] for i in range(N) if JOUEURS[i]]
        self.play(LaggedStart(*[c.animate.set_fill(FINIT) for c in verts], lag_ratio=0.004), run_time=1.6)
        t305 = suite(self.t("305", 60, FINIT), self.t("joueurs sur 500", 40), buff=0.25).move_to(P(3.0, 1.9))
        self.play(FadeIn(t305, scale=1.2), run_time=0.4)
        self.au_mot("M n égale 0,61")
        m = suite(mn(52, BLEU_NB), self.t("=", 52), self.t("0,61", 60, ORANGE_RETENUE), buff=0.2).move_to(P(3.0, 0.6))
        self.play(FadeIn(m, shift=UP * 0.15), run_time=0.5)
        d = Droite(x0=0.0, x1=5.2, y=-1.0)
        it = d.intervalle(0.55, 0.65)
        pt = d.point(0.61)
        self.play(FadeIn(d), FadeIn(it), run_time=0.4)
        self.play(TransformFromCopy(m[2], pt), run_time=0.5)
        self.au_mot("Bien dans")
        ok = self.t("bien dans l'intervalle", 38, VERT_OK).move_to(P(2.6, -2.1))
        self.play(FadeIn(ok, shift=UP * 0.1), Indicate(it, color=VERT_OK), run_time=0.7)
        self.attendre_voix()

    # ── 05 : question 3, la taille n ────────────────────────────────────────

    def ecran_q3(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-q3")
        self.titre_ecran("Question 3 : combien de joueurs ?")
        fs = 44
        self.au_mot("au plus 0,05")
        q = suite(self.t("probabilité d'écart ≤", fs - 4), self.t("0,05", fs, ORANGE_RETENUE), buff=0.2)
        q.move_to(P(-1.0, 2.0))
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.5)
        self.au_mot("On veut")
        den = suite(self.t("n ×", fs, BLEU_NB), self.t("0,0025", fs), buff=0.15)
        f1 = fraction(self.t("0,24", fs, VERT_OK), den)
        l1 = suite(self.t("on veut :", fs - 6, GREY_B), f1, self.t("≤", fs + 4), self.t("0,05", fs, ORANGE_RETENUE),
                   buff=0.3).move_to(P(-1.0, 0.55))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.8)
        self.au_mot("Donc n")
        f2 = fraction(self.t("0,24", fs, VERT_OK), self.t("0,05 × 0,0025", fs))
        l2 = suite(self.t("n ≥", fs + 4, BLEU_NB), f2, buff=0.3).move_to(P(-1.6, -1.05))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.8)
        self.au_mot("1 920")
        r = suite(self.t("n ≥", fs + 4, BLEU_NB), self.t("1 920 joueurs", fs + 8, ORANGE_RETENUE), buff=0.3)
        r.move_to(P(-1.0, -2.65))
        cad = SurroundingRectangle(r[1], color=ORANGE_RETENUE, buff=0.15, stroke_width=4)
        self.play(FadeIn(r, scale=1.3), Create(cad), run_time=0.6)
        self.insister(VGroup(r[1], cad), 0.25, 1.2)
        self.attendre_voix()

    # ── 06 : le piège, oublier le carré ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège : oublier le carré de δ")
        fs = 50
        self.au_mot("0,05 au carré")
        l1 = suite(puissance("0,05", "2", fs + 4, BLEU_NB), self.t("=", fs), buff=0.25).move_to(P(-3.0, 1.9))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,0025. Sans")
        r1 = self.t("0,0025", fs + 4, VERT_OK).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r1, scale=1.4), run_time=0.4)
        self.insister(l1[0][1], 0.25, 1.6)
        self.au_mot("96 joueurs")
        sans = suite(self.t("sans le carré :", 40, ROUGE_ERREUR), self.t("96 joueurs", fs, ROUGE_ERREUR), buff=0.25)
        sans.move_to(P(-2.4, 0.6))
        # un bloc = 96 joueurs ; il en faut vingt
        bloc = lambda c: Square(side_length=0.42, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
        b96 = bloc(ROUGE_ERREUR).move_to(P(-4.3, -0.9))
        e96 = self.t("96", 34, ROUGE_ERREUR).next_to(b96, LEFT, buff=0.3)
        self.play(FadeIn(sans, shift=UP * 0.1), FadeIn(b96, scale=1.5), FadeIn(e96), run_time=0.5)
        croix = self.barrer(sans[1])
        self.play(Create(croix), run_time=0.3)
        self.au_mot("vingt fois")
        vingt = VGroup(*[bloc(VERT_OK) for _ in range(20)]).arrange_in_grid(rows=2, cols=10, buff=0.08)
        vingt.move_to(P(-2.5, -2.0)).align_to(b96, LEFT)
        t20 = self.t("vingt fois trop peu", 40, JAUNE_TITRE).next_to(vingt, RIGHT, buff=0.4)
        e19 = self.t("1 920", 34, VERT_OK).next_to(vingt, LEFT, buff=0.3)
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in vingt], lag_ratio=0.05), FadeIn(t20), FadeIn(e19),
                  run_time=1.0)
        self.attendre_voix(marge=1.2)

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        nv = niveau(0.8).move_to(P(3.6, 1.0))
        self.play(FadeIn(nv), run_time=0.4)
        fs = 48
        self.au_mot("Même question")
        q1 = self.t("Même question", fs).move_to(P(-3.2, 1.8))
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("delta égale 0,1")
        q2 = suite(self.t("avec δ =", fs), self.t("0,1", fs + 6, ORANGE_RETENUE), buff=0.2).move_to(P(-3.2, 0.7))
        self.play(FadeIn(q2, scale=1.2), run_time=0.5)
        self.au_mot("Combien de joueurs")
        q3 = suite(self.t("n =", fs + 4, BLEU_NB), self.t("?", fs + 16, ORANGE_RETENUE), buff=0.25).move_to(P(-3.2, -0.5))
        self.play(FadeIn(q3, scale=1.3), run_time=0.5)
        self.insister(q3[1], 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-1.2, -2.3))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        fs = 50
        self.au_mot("0,1 au carré")
        l1 = suite(puissance("0,1", "2", fs + 4, ORANGE_RETENUE), self.t("=", fs), buff=0.25).move_to(P(-3.0, 1.7))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,01. n")
        r1 = self.t("0,01", fs + 4, BLEU_NB).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r1, scale=1.4), run_time=0.4)
        self.au_mot("n supérieur")
        f = fraction(self.t("0,24", fs, VERT_OK), self.t("0,05 × 0,01", fs))
        l2 = suite(self.t("n ≥", fs + 4, BLEU_NB), f, buff=0.3).move_to(P(-3.3, -0.3))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("480")
        r = suite(self.t("=", fs), self.t("480 joueurs", fs + 8, ORANGE_RETENUE), buff=0.25).next_to(l2, RIGHT, buff=0.3)
        cad = SurroundingRectangle(r[1], color=ORANGE_RETENUE, buff=0.15, stroke_width=4)
        self.play(FadeIn(r, scale=1.3), Create(cad), run_time=0.6)
        self.insister(VGroup(r[1], cad), 0.3, 1.2)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        fs = 50
        sig2 = puissance("σ", "2", fs + 2, BLEU_NB)
        l1 = suite(fonc("E", mn(fs), "μ", fs, c_d=VERT_OK), self.t("et", fs, GREY_B),
                   fonc("V", mn(fs), fraction(sig2, self.t("n", fs, BLEU_NB)), fs), buff=0.35)
        num = puissance("σ", "2", fs + 2, BLEU_NB)
        den = suite(self.t("n", fs, BLEU_NB), puissance("δ", "2", fs + 2, BLEU_NB), buff=0.08)
        l2 = suite(self.t("La borne :", fs, ORANGE_RETENUE), fraction(num, den), buff=0.3)
        l3 = suite(self.t("Trouver n :", fs, ORANGE_RETENUE),
                   VGroup(self.t("résoudre l'inégalité,", fs), self.t("sans oublier le carré", fs)).arrange(
                       DOWN, aligned_edge=LEFT, buff=0.12), buff=0.3)
        self.finale([l1, l2, l3], ["E de M n", "La borne", "Et pour trouver"], cle="08-finale", larg=11.6)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_q1()
        self.ecran_q2()
        self.ecran_tirage()
        self.ecran_q3()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaConcDefiTerminale(ProbaConcDefiBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
