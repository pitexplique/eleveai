# proba_bin_intervalle.py
# EleveAI — Maths Tle spé (micro binomiale_intervalle, notion loi_binomiale)
# — série « Probabilités » : LA PROBABILITÉ D'UN INTERVALLE AVEC LA LOI
# BINOMIALE, AVEC VOIX. Paysage 16:9, ceinture NOIRE. Short jumeau :
# proba_bin_intervalle_short.py (ceinture ORANGE).
#
# ⭐ La figure est le `stat_graph` « bâtons » du coach (binomialeBatonsCanvas
# de la banque loi-binomiale : carte blanche, axe sombre, un bâton gris par
# valeur de k avec son point, étiquettes 0, 1, 2… sous l'axe, bâton actif en
# orange #F59E0B), ici pour B(20 ; 0,3). Les hauteurs sont les VRAIES
# probabilités (math.comb). ⛔ PAS D'ÉCART : aucune valeur au-dessus des
# bâtons (la voix ne les dit pas) ; seuls les nombres dits s'écrivent.
# Couleurs : l'intervalle [4 ; 8] en orange (actif du coach), ce que la
# calculatrice cumule en bleu, ce qu'on enlève en rouge estompé.
#
# Écrans : 00 garde · 01 le lycée, le car, B(20 ; 0,3) · 02 la question
# P(4 ≤ X ≤ 8) · 03 la méthode : cumulées, P(X ≤ 8) − P(X ≤ 3) · 04 le calcul
# à la calculatrice (0,887 ; 0,107 ; 0,780) · 05 pourquoi 3 et pas 4 · 06 le
# piège (− P(X ≤ 4)) · 07 défi P(X ≥ 5) · 07b correction (1 − 0,238 ≈ 0,762)
# · 08 ce que tu as appris · 09 fin (« Entraîne-toi sur eleveai.fr »).
#
# Voix : manim/voix/terminale-proba-bin-intervalle.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_bin_intervalle.py ProbaBinIntervalleTerminale -o eleveai-maths-terminale-proba-bin-intervalle --media_dir manim/scripts/terminale/media-bin_intervalle
# Sortie : manim/sorties/terminale/maths/probabilites/15-bin-intervalle/.

import sys
from math import comb
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, CHEMIN, ENCRE, suite  # noqa: E402
from proba_bin_calculer import calculatrice, client  # noqa: E402

N, PR = 20, 0.3
LOI = [comb(N, k) * PR ** k * (1 - PR) ** (N - k) for k in range(N + 1)]


def cumul(k):
    return sum(LOI[:k + 1])


# Les nombres dits par la voix, vérifiés ici (arrondis au millième).
assert f"{cumul(8):.3f}" == "0.887" and f"{cumul(3):.3f}" == "0.107"
assert f"{cumul(8) - cumul(3):.3f}" == "0.780"
assert f"{cumul(4):.3f}" == "0.238" and f"{1 - cumul(4):.3f}" == "0.762"

BATON = "#64748B"       # le bâton du stat_graph (gris ardoise)
ACTIF = CHEMIN          # le bâton actif du coach (#F59E0B)
CUMUL = "#2563EB"       # ce que la calculatrice cumule
ENLEVE = "#DC2626"      # ce qu'on enlève
CUMUL_T = "#60A5FA"     # les mêmes, en texte sur fond sombre
ENLEVE_T = "#F87171"
BLEU_NB = "#60A5FA"
CAR_J = "#FACC15"       # le car jaune


def P(x, y):
    return np.array([x, y, 0.0])


def autocar(s=1.0):
    """Un car scolaire jaune, vu de côté : caisse, vitres, roues."""
    caisse = RoundedRectangle(width=3.0, height=1.25, corner_radius=0.18, fill_color=CAR_J, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2)
    vitres = VGroup(*[RoundedRectangle(width=0.42, height=0.4, corner_radius=0.05, fill_color="#BAE6FD",
                                       fill_opacity=1, stroke_width=0).move_to(P(-1.1 + i * 0.55, 0.22))
                      for i in range(4)])
    pare = RoundedRectangle(width=0.36, height=0.55, corner_radius=0.05, fill_color="#BAE6FD", fill_opacity=1,
                            stroke_width=0).move_to(P(1.2, 0.15))
    bande = Rectangle(width=2.9, height=0.08, fill_color=ENCRE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.2))
    roues = VGroup(*[VGroup(Circle(radius=0.24, fill_color=ENCRE, fill_opacity=1, stroke_color=GREY_B,
                                   stroke_width=3),
                            Dot(radius=0.07, color=GREY_B)).move_to(P(x, -0.62)) for x in (-0.85, 0.85)])
    return VGroup(caisse, vitres, pare, bande, roues).scale(s)


class CarteBatons(VGroup):
    """Le stat_graph « bâtons » du coach : carte blanche, titre, axe, un
    bâton par k (trait + point), étiquettes k sous l'axe.
    bat[k] : VGroup(trait, point) ; eti[k] : l'étiquette."""

    def __init__(self, larg=11.4, haut=3.6, vmax=0.2, titre="Loi binomiale B(20 ; 0,3)", fs_eti=18,
                 fs_titre=24, sw=7, kmax=N):
        super().__init__()
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.titre = Text(titre, font_size=fs_titre, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        y0 = -haut / 2 + 0.45
        self.axe = Line(P(-larg / 2 + 0.3, y0), P(larg / 2 - 0.3, y0), color=ENCRE, stroke_width=2)
        slot = (larg - 0.6) / (kmax + 1 + (1 if kmax < N else 0))
        hmax = haut - 0.45 - 0.3 - self.titre.height - 0.25
        self.bat, self.eti, self.x = [], [], []
        for k in range(kmax + 1):
            x = -larg / 2 + 0.3 + slot * (k + 0.5)
            h = LOI[k] / vmax * hmax
            trait = Line(P(x, y0), P(x, y0 + max(h, 0.001)), color=BATON, stroke_width=sw)
            pt = Dot(P(x, y0 + h), radius=0.055 * sw / 7, color=BATON)
            self.bat.append(VGroup(trait, pt))
            e = Text(str(k), font_size=fs_eti, color=ENCRE, weight=BOLD)
            if e.width > 0.78 * slot:   # « 10 », « 11 »… ne se touchent pas
                e.scale_to_fit_width(0.78 * slot)
            self.eti.append(e.move_to(P(x, y0 - 0.22)))
            self.x.append(x)
        self.add(self.carte, self.titre, self.axe, *self.bat, *self.eti)
        if kmax < N:   # la suite, invisible à cette taille : « … »
            self.suite = Text("…", font_size=fs_eti + 4, color=ENCRE, weight=BOLD)
            self.suite.move_to(P(-larg / 2 + 0.3 + slot * (kmax + 1.5), y0 - 0.22))
            self.add(self.suite)
            self.eti.append(self.suite)
        self.kmax = kmax

    def socle(self):
        return VGroup(self.carte, self.titre, self.axe, *self.eti)

    def pousser(self, ks=None, run_time=1.2):
        """Les bâtons montent du bas (de gauche à droite)."""
        ks = range(self.kmax + 1) if ks is None else ks
        return LaggedStart(*[GrowFromEdge(self.bat[k], DOWN) for k in ks], lag_ratio=0.12, run_time=run_time)

    def colorer(self, ks, couleur, op=1.0):
        ks = [k for k in ks if k <= self.kmax]
        return [self.bat[k].animate.set_color(couleur).set_opacity(op) for k in ks]

    def poser(self, ks, couleur, op=1.0):
        for k in ks:
            self.bat[k].set_color(couleur).set_opacity(op)
        return self

    def bande(self, a, b, color=ACTIF, op=0.16):
        """Une bande pâle derrière les bâtons a à b (étiquettes comprises) :
        l'intervalle, bornes comprises."""
        xs = [self.bat[k][0].get_start()[0] for k in (0, 1, a, b)]   # la place réelle (après move_to)
        dx = (xs[1] - xs[0]) / 2
        haut = self.titre.get_bottom()[1] - 0.08
        bas = self.eti[0].get_bottom()[1] - 0.06
        r = Rectangle(width=xs[3] - xs[2] + 2 * dx * 0.92, height=haut - bas, fill_color=color,
                      fill_opacity=op, stroke_color=color, stroke_width=2.5)
        return r.move_to(P((xs[2] + xs[3]) / 2, (haut + bas) / 2))


def le(gauche, droite, fs=40, color=WHITE):
    """« P(X ≤ 8) » et compagnie, en un seul Text."""
    return Text(f"P({gauche} ≤ {droite})", font_size=fs, color=color)


class ProbaBinIntervalleBase(Notion6e):
    nom_voix = "terminale-proba-bin-intervalle"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
    X_F = -1.2          # le centre de la zone des formules (sous la carte)
    LARG_F = 9.6
    Y1, Y2, Y3 = -1.45, -2.35, -3.25

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=None):
        larg = larg or self.LARG_F
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def ligne(self, *objs, y=None, x=None, buff=0.2):
        g = self.caser(suite(*objs, buff=buff))
        return g.move_to(P(self.X_F if x is None else x, self.Y1 if y is None else y))

    def carte(self, **kw):
        """La carte de la vidéo : en haut, les formules dessous."""
        c = CarteBatons(**kw)
        return c.move_to(P(-0.9, 1.15))

    def barrer(self, mob, sw=6, color=ROUGE_ERREUR):
        return Line(mob.get_left() + LEFT * 0.08, mob.get_right() + RIGHT * 0.08, color=color, stroke_width=sw)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Loi binomiale", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("la probabilité d'un intervalle", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.05))
        c = CarteBatons(larg=9.0, haut=2.7, fs_eti=15, fs_titre=20, sw=6).move_to(P(-0.6, -0.55))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(c.socle()), run_time=0.9)
        self.au_mot("intervalle")
        bd = c.bande(4, 8)
        self.play(FadeIn(sous, shift=UP * 0.15), c.pousser(run_time=1.0), run_time=1.0)
        self.play(FadeIn(bd), *c.colorer(range(4, 9), ACTIF), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 01 : le lycée, le car ───────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le car du lycée")
        car = autocar(1.15).move_to(P(-3.9, 1.65))
        self.play(FadeIn(car, shift=RIGHT * 1.5), run_time=0.8)
        self.au_mot("30 %")
        trente = self.t("30 % des élèves", 42, JAUNE_TITRE).next_to(car, RIGHT, buff=0.6)
        self.play(FadeIn(trente[:3], scale=1.8), run_time=0.5)
        self.play(FadeIn(trente[3:], shift=LEFT * 0.15), run_time=0.4)
        self.au_mot("On en interroge 20")
        gens = VGroup(*[client("#94A3B8", 0.5) for _ in range(20)]).arrange_in_grid(2, 10, buff=(0.22, 0.3))
        gens.move_to(P(-2.4, -0.55))
        vingt = self.t("20 élèves au hasard", 38).next_to(gens, RIGHT, buff=0.5)
        self.play(LaggedStart(*[FadeIn(g, shift=DOWN * 0.3) for g in gens], lag_ratio=0.06),
                  FadeIn(vingt[:2], scale=1.8), run_time=1.2)
        self.play(FadeIn(vingt[2:], shift=LEFT * 0.15), run_time=0.4)
        self.au_mot("X compte")
        xc = self.t("X : le nombre d'élèves qui viennent en car", 34).move_to(P(self.X_F, -2.2))
        self.caser(xc)
        self.play(FadeIn(xc, shift=UP * 0.15), run_time=0.6)
        self.au_mot("X suit B")
        loi = suite(self.t("X suit", 44), self.t("B(20 ; 0,3)", 48, BLEU_CALCUL), buff=0.25).move_to(P(self.X_F, -3.2))
        self.play(FadeIn(loi[0]), Write(loi[1]), run_time=0.9)
        cadre = SurroundingRectangle(loi, color=BLEU_CALCUL, buff=0.18, stroke_width=3)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la question : P(4 ≤ X ≤ 8) ──────────────────────────────────────

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-question")
        self.titre_ecran("La question")
        c = self.carte()
        self.play(FadeIn(c.socle()), c.pousser(run_time=1.2), run_time=1.2)
        self.au_mot("entre 4 et 8")
        q = self.ligne(self.t("entre", 40), self.t("4", 46, ACTIF), self.t("et", 40), self.t("8", 46, ACTIF),
                       self.t("élèves", 40), buff=0.22)
        bd = c.bande(4, 8)
        self.play(FadeIn(q, shift=UP * 0.15), FadeIn(bd), *c.colorer(range(4, 9), ACTIF), run_time=0.7)
        self.au_mot("bornes comprises")
        bc = self.t("bornes comprises", 34, ACTIF).next_to(q, RIGHT, buff=0.4)
        if bc.get_right()[0] > 4.6:
            VGroup(q, bc).shift(LEFT * (bc.get_right()[0] - 4.6))
        self.play(FadeIn(bc, shift=LEFT * 0.15), *[Indicate(c.bat[k], color=ACTIF, scale_factor=1.3) for k in (4, 8)],
                  *[Indicate(c.eti[k], color=ACTIF, scale_factor=1.8) for k in (4, 8)], run_time=0.8)
        self.au_mot("On cherche P")
        pq = le("4 ≤ X", "8", 56, ACTIF).move_to(P(self.X_F, self.Y2 - 0.35))
        self.play(Write(pq), run_time=1.0)
        cad = SurroundingRectangle(pq, color=ACTIF, buff=0.16, stroke_width=3)
        self.play(Create(cad), run_time=0.4)
        self.insister(VGroup(pq, cad))
        self.attendre_voix()

    # ── 03 : la méthode : P(X ≤ 8) − P(X ≤ 3) ───────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-methode")
        self.titre_ecran("La méthode")
        c = self.carte()
        self.add(c)
        self.au_mot("La calculatrice")
        calc = calculatrice(0.24)
        cum = self.t("probabilités cumulées :", 38, BLEU_NB)
        pk = le("X", "k", 42, BLEU_NB)
        l1 = self.ligne(calc, cum, pk, buff=0.35)
        self.play(FadeIn(calc, shift=UP * 0.2), run_time=0.5)
        self.au_mot("probabilités cumulées")
        self.play(FadeIn(cum, shift=RIGHT * 0.15), run_time=0.5)
        self.play(LaggedStart(*[c.bat[k].animate.set_color(CUMUL) for k in range(N + 1)], lag_ratio=0.15),
                  run_time=1.4)
        self.au_mot("P de X inférieur ou égal à k")
        self.play(FadeIn(pk, scale=1.4), *c.colorer(range(N + 1), BATON), run_time=0.6)
        # P(4 ≤ X ≤ 8) = P(X ≤ 8) − P(X ≤ 3)
        gauche = le("4 ≤ X", "8", 44, ACTIF)
        eg = self.t("=", 44)
        p8 = le("X", "8", 44, CUMUL_T)
        moins = self.t("−", 44)
        p3 = le("X", "3", 44, ENLEVE_T)
        l2 = self.ligne(gauche, eg, p8, moins, p3, y=self.Y2 - 0.3, buff=0.25)
        self.au_mot("On écrit")
        self.play(FadeIn(gauche, shift=UP * 0.15), FadeIn(eg), run_time=0.5)
        self.au_mot("P de X inférieur ou égal à 8")
        self.play(FadeIn(p8, scale=1.4), *c.colorer(range(9), CUMUL), run_time=0.7)
        self.au_mot("moins P de X")
        self.play(FadeIn(moins), FadeIn(p3, scale=1.4), *c.colorer(range(4), ENLEVE, 0.35), run_time=0.7)
        bd = c.bande(4, 8)
        self.play(FadeIn(bd), *c.colorer(range(4, 9), ACTIF), Indicate(gauche, color=ACTIF), run_time=0.7)
        self.attendre_voix()

    # ── 04 : le calcul à la calculatrice ────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-calcul")
        self.titre_ecran("À la calculatrice")
        calc = calculatrice(0.72).move_to(P(-4.95, -0.55))
        ecran = calc[1]
        c = CarteBatons(larg=8.9, haut=2.95, fs_eti=15, fs_titre=21, sw=6).move_to(P(1.15, 1.32))
        self.play(FadeIn(calc, shift=UP * 0.2), FadeIn(c), run_time=0.6)
        xs = 0.3
        fs = 44

        def sur_ecran(haut, val):
            h = Text(haut, font_size=20, color=BLACK).move_to(ecran.get_center() + UP * 0.25)
            v = Text(val, font_size=40, color=BLACK).move_to(ecran.get_center() + DOWN * 0.17)
            v.align_to(ecran.get_right() + LEFT * 0.15, RIGHT)
            return VGroup(h, v)

        lignes = []
        for k, val, col_b, col_t, y, op in ((8, "0,887", CUMUL, CUMUL_T, -0.75, 1.0),
                                             (3, "0,107", ENLEVE, ENLEVE_T, -1.68, 0.35)):
            self.au_mot(f"P de X inférieur ou égal à {k}")
            e = sur_ecran(f"P(X ≤ {k})", val)
            gauche = le("X", str(k), fs, col_t)
            l = suite(gauche, self.t("≈", fs), self.t(val, fs + 4, col_t), buff=0.25).move_to(P(xs, y))
            if k == 3:
                l.align_to(lignes[0], LEFT)
            self.play(FadeIn(e[0]), FadeIn(gauche, shift=UP * 0.15),
                      *c.colorer(range(k + 1), col_b, op), run_time=0.6)
            self.au_mot(f"environ {val}")
            self.play(FadeIn(e[1], shift=LEFT * 0.2), run_time=0.4)
            self.play(FadeIn(l[1]), TransformFromCopy(e[1], l[2]), run_time=0.6)
            lignes.append(l)
            if k == 8:
                self.wait(0.3)
                self.play(FadeOut(e), run_time=0.3)
        bd = c.bande(4, 8)
        self.au_mot("La différence")
        res = le("4 ≤ X", "8", fs, ACTIF)
        l3 = suite(res, self.t("≈", fs), self.t("0,887", fs, CUMUL_T), self.t("−", fs),
                   self.t("0,107", fs, ENLEVE_T), buff=0.22)
        l3.move_to(P(xs, -2.65)).align_to(lignes[0], LEFT)
        self.play(FadeIn(res, shift=UP * 0.15), FadeIn(l3[1]), FadeIn(bd), *c.colorer(range(4, 9), ACTIF),
                  run_time=0.6)
        self.play(TransformFromCopy(lignes[0][2], l3[2]), FadeIn(l3[3]), TransformFromCopy(lignes[1][2], l3[4]),
                  run_time=0.7)
        self.au_mot("environ 0,780")
        fin = self.t("0,780", fs + 8, ACTIF).move_to(VGroup(l3[2:]).get_center()).next_to(l3[1], RIGHT, buff=0.35)
        self.play(ReplacementTransform(VGroup(*l3[2:]), fin), run_time=0.6)
        cad = SurroundingRectangle(fin, color=ACTIF, buff=0.12, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.play(VGroup(fin, cad).animate.scale(1.2), run_time=0.3)
        self.play(VGroup(fin, cad).animate.scale(1 / 1.2), run_time=0.3)
        self.attendre_voix()

    def carte_resultat(self):
        """La carte telle que l'écran 04 la laisse : 0 à 3 enlevés, 4 à 8 allumés."""
        c = self.carte()
        c.poser(range(4), ENLEVE, 0.35).poser(range(4, 9), ACTIF)
        bd = c.bande(4, 8)
        return c, bd

    # ── 05 : pourquoi 3, et pas 4 ───────────────────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-pourquoi")
        c, bd = self.carte_resultat()
        self.add(c, bd)
        self.titre_ecran("Pourquoi 3 ?")
        on, trois, et, quatre = (self.t("On enlève", 40), self.t("3,", 46, ENLEVE_T), self.t("et pas", 40),
                                 self.t("4", 46, ACTIF))
        l1 = self.ligne(on, trois, et, quatre, buff=0.22)
        self.au_mot("On enlève 3")
        self.play(FadeIn(on, shift=UP * 0.15), FadeIn(trois, scale=1.6),
                  Indicate(c.eti[3], color=ENLEVE, scale_factor=2.0), run_time=0.6)
        self.au_mot("et pas 4")
        self.play(FadeIn(et), FadeIn(quatre, scale=1.6), Indicate(c.eti[4], color=ACTIF, scale_factor=2.0),
                  Indicate(c.bat[4], color=ACTIF, scale_factor=1.3), run_time=0.6)
        self.au_mot("sinon")
        l2 = self.ligne(self.t("sinon, on enlèverait aussi", 36), self.t("X = 4", 42, ENLEVE_T),
                        y=self.Y2, buff=0.25)
        self.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("X égale 4")
        self.play(FadeIn(l2[1], scale=1.5), c.bat[4].animate.set_color(ENLEVE).set_opacity(0.35), run_time=0.5)
        self.au_mot("qui fait partie")
        l3 = self.ligne(self.coche(ACTIF, 0.25), self.t("qui fait partie de l'intervalle", 36, ACTIF),
                        y=self.Y3, buff=0.3)
        self.play(c.bat[4].animate.set_color(ACTIF).set_opacity(1), FadeIn(l3[1], shift=UP * 0.15),
                  Indicate(bd, color=ACTIF, scale_factor=1.02), run_time=0.6)
        self.play(Create(l3[0]), run_time=0.3)
        self.attendre_voix()

    # ── 06 : le piège : − P(X ≤ 4) ──────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        c = self.carte()
        self.add(c)
        self.titre_ecran("Le piège")
        fs = 46
        p8, moins, p4 = le("X", "8", fs, CUMUL_T), self.t("−", fs), le("X", "4", fs, ENLEVE_T)
        l1 = self.ligne(p8, moins, p4, buff=0.25, y=self.Y1 - 0.05)
        self.au_mot("P de X inférieur ou égal à 8")
        self.play(FadeIn(p8, shift=UP * 0.15), *c.colorer(range(9), CUMUL), run_time=0.6)
        self.au_mot("moins P de X")
        self.play(FadeIn(moins), FadeIn(p4, scale=1.4), *c.colorer(range(5), ENLEVE, 0.35), run_time=0.6)
        self.play(*c.colorer(range(5, 9), ACTIF), run_time=0.4)
        self.au_mot("On perdrait")
        croix = VGroup(Line(l1.get_corner(UL), l1.get_corner(DR)), Line(l1.get_corner(DL), l1.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 7)
        perdu = self.ligne(self.t("On perdrait le cas", 40, ROUGE_ERREUR), self.t("X = 4", 46, ROUGE_ERREUR),
                           y=self.Y2 - 0.2, buff=0.25)
        self.play(Create(croix), FadeIn(perdu[0], shift=UP * 0.15), run_time=0.6)
        self.au_mot("X égale 4")
        anneau = Circle(radius=0.32, color=ROUGE_ERREUR, stroke_width=5).move_to(c.eti[4])
        self.play(FadeIn(perdu[1], scale=1.5), Create(anneau), Wiggle(c.bat[4]), run_time=0.7)
        self.insister(perdu[1])
        self.attendre_voix()

    # ── 07 : défi : P(X ≥ 5) ────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP, buff=0.32)))
        c = self.carte()
        self.play(FadeIn(c), run_time=0.5)
        self.au_mot("Calcule")
        cal = self.t("Calcule", 44)
        p5 = Text("P(X ≥ 5)", font_size=52, color=ACTIF)
        l1 = self.ligne(cal, p5, buff=0.3, y=self.Y1 - 0.05)
        self.play(FadeIn(cal, shift=UP * 0.15), run_time=0.4)
        self.au_mot("supérieur ou égal à 5")
        bd = c.bande(5, N)
        self.play(FadeIn(p5, scale=1.4), FadeIn(bd), *c.colorer(range(5, N + 1), ACTIF), run_time=0.6)
        self.insister(p5, 0.25)
        self.au_mot("sachant que")
        sa = self.t("sachant que", 38)
        p4 = le("X", "4", 42, CUMUL_T)
        ap, v = self.t("≈", 42), self.t("0,238", 44, CUMUL_T)
        l2 = self.ligne(sa, p4, ap, v, y=self.Y2 - 0.1, buff=0.25)
        self.play(FadeIn(sa, shift=UP * 0.15), run_time=0.4)
        self.au_mot("inférieur ou égal à 4")
        self.play(FadeIn(p4, scale=1.3), *c.colorer(range(5), CUMUL), run_time=0.5)
        self.au_mot("environ 0,238")
        self.play(FadeIn(ap), FadeIn(v, scale=1.6), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(self.X_F, self.Y3 - 0.05))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 07b : correction : 1 − 0,238 ────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        c = self.carte()
        c.poser(range(5, N + 1), ACTIF)
        bd = c.bande(5, N)
        self.add(c, bd)
        self.titre_ecran("Correction")
        fs = 42
        self.au_mot("Le contraire")
        co = self.t("Le contraire de", 38)
        x5 = Text("X ≥ 5,", font_size=fs + 2, color=ACTIF)
        cest = self.t("c'est", 38)
        x4 = Text("X ≤ 4", font_size=fs + 2, color=CUMUL_T)
        l1 = self.ligne(co, x5, cest, x4, y=self.Y1 - 0.05, buff=0.22)
        self.play(FadeIn(co, shift=UP * 0.15), FadeIn(x5, scale=1.4), run_time=0.6)
        self.au_mot("c'est X inférieur")
        bd4 = c.bande(0, 4, color=CUMUL)
        self.play(FadeIn(cest), FadeIn(x4, scale=1.4), FadeIn(bd4), *c.colorer(range(5), CUMUL), run_time=0.6)
        self.au_mot("1 moins 0,238")
        p5 = Text("P(X ≥ 5)", font_size=fs, color=ACTIF)
        eg, un, moins, v = self.t("=", fs), self.t("1", fs + 4), self.t("−", fs), self.t("0,238", fs, CUMUL_T)
        ap, res = self.t("≈", fs), self.t("0,762", fs + 8, ACTIF)
        l2 = self.ligne(p5, eg, un, moins, v, ap, res, y=self.Y2 - 0.35, buff=0.24)
        self.play(FadeIn(VGroup(p5, eg), shift=UP * 0.15), FadeIn(un, scale=1.6), run_time=0.5)
        self.play(FadeIn(moins), FadeIn(v, scale=1.4), run_time=0.4)
        self.au_mot("environ 0,762")
        self.play(FadeIn(ap), FadeIn(res, scale=1.8), run_time=0.5)
        cad = SurroundingRectangle(res, color=ACTIF, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(res, cad))
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 46
        # P(a ≤ X ≤ b) = P(X ≤ b) − P(X ≤ a − 1)
        a1 = le("a ≤ X", "b", fs, ACTIF)
        a2, a3, a4, a5 = self.t("=", fs), le("X", "b", fs, CUMUL_T), self.t("−", fs), le("X", "a − 1", fs, ENLEVE_T)
        l1 = suite(a1, a2, a3, a4, a5, buff=0.25)
        # P(X ≥ a) = 1 − P(X ≤ a − 1)
        b1 = Text("P(X ≥ a)", font_size=fs, color=ACTIF)
        b2, b3, b4, b5 = self.t("=", fs), self.t("1", fs + 2), self.t("−", fs), le("X", "a − 1", fs, CUMUL_T)
        l2 = suite(b1, b2, b3, b4, b5, buff=0.25)
        c1, c2 = self.coche(), self.coche()
        g1, g2 = VGroup(c1, l1).arrange(RIGHT, buff=0.35), VGroup(c2, l2).arrange(RIGHT, buff=0.35)
        tout = VGroup(g1, g2).arrange(DOWN, aligned_edge=LEFT, buff=1.5)
        if tout.width > 11.2:
            tout.scale_to_fit_width(11.2)
        tout.move_to(P(-0.6, 0.1))
        self.au_mot("P de a inférieur")
        self.play(FadeIn(a1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("c'est P de X inférieur ou égal à b")
        self.play(FadeIn(a2), FadeIn(a3, scale=1.3), run_time=0.6)
        self.au_mot("moins P de X inférieur ou égal à a moins 1")
        self.play(FadeIn(a4), FadeIn(a5, scale=1.3), run_time=0.6)
        self.play(Create(c1), Indicate(a5, color=ENLEVE_T, scale_factor=1.15), run_time=0.6)
        self.au_mot("Et P de X supérieur")
        self.play(FadeIn(b1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("c'est 1 moins")
        self.play(FadeIn(b2), FadeIn(b3, scale=1.6), FadeIn(b4), run_time=0.5)
        self.au_mot("1 moins P de X")
        self.wait(0.4)
        self.play(FadeIn(b5, scale=1.3), run_time=0.6)
        self.play(Create(c2), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10, modèle proba_au_moins_un.py) ───────────

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
        self.ecran_question()
        self.ecran_methode()
        self.ecran_calcul()
        self.ecran_pourquoi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaBinIntervalleTerminale(ProbaBinIntervalleBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
