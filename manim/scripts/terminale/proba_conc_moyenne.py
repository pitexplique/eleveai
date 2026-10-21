# proba_conc_moyenne.py
# EleveAI — Maths Tle spé (micro concentration_echantillon_moyenne, notion
# concentration_echantillonnage) — série « Probabilités » : LA MOYENNE D'UN
# ÉCHANTILLON, E(M) = μ ET V(M) = V/n, AVEC VOIX. Paysage 16:9, ceinture NOIRE.
# Short jumeau : proba_conc_moyenne_short.py (orange).
#
# Domaine : l'AGRICULTURE. Métier : une agricultrice de vanille à Saint-André
# qui pèse ses gousses vertes (aucun nom de personne à l'écran).
# Le piège : croire que la variance de la moyenne est V, alors qu'elle est V/n.
#
# ⭐ Figures : la banque concentration.bank.ts n'a AUCUN canvas. On reprend la
#   carte `stat_graph` du coach (loi binomiale : carte blanche, axe encre,
#   points gris ardoise, l'élément actif en ambre #f59e0b), en NUAGE DE POINTS
#   empilés : une masse = un point posé au-dessus de l'axe.
# ⛔ PAS D'ÉCART : l'axe n'a aucune graduation ; un nombre ne s'écrit qu'au
#   moment où la voix le dit.
# ⭐ VRAIS TIRAGES (numpy, graines fixes) : les 9 gousses de l'écran 02
#   (graine 976 : 10,4 … 20,5 g, moyenne 16,1 g exactement), les 40 gousses
#   seules et les 40 moyennes de 9 de l'écran 05 (graine 974).
#
# Écrans : 00 garde · 01 la vanille · 02 un vrai tirage de 9 gousses (M) ·
# 03 E(M) = E(X) · 04 V(M) = V(X)/n · 05 le sens (40 + 40 vrais tirages) ·
# 06 le piège · 07 défi (36 gousses) · 07b correction · 08 ce que tu as appris
# · 09 fin (« Entraîne-toi sur eleveai.fr » + abonnement).
#
# Voix : manim/voix/terminale-proba-conc-moyenne.json (débit −6), calée au mot
# par proba_conc_moyenne_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conc_moyenne.py ProbaConcMoyenneTerminale -o eleveai-maths-terminale-proba-conc-moyenne --media_dir manim/scripts/terminale/media-conc_moyenne-1s
# Sortie : manim/sorties/terminale/maths/probabilites/31-conc-moyenne/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, CHEMIN, ENCRE, PROBA, suite  # noqa: E402
from proba_bin_defi import MotsCales, puissance  # noqa: E402

# ── les nombres, calculés ici ───────────────────────────────────────────────
MU, VX, N = 15, 9, 9
_r = np.random.default_rng(976)
GOUSSES = [float(v) for v in np.round(_r.normal(MU, 3, 9), 1)]
M_TIRAGE = round(sum(GOUSSES) / 9, 2)
assert min(GOUSSES) == 10.4 and max(GOUSSES) == 20.5 and M_TIRAGE == 16.1
_r = np.random.default_rng(974)
SEULES = [float(v) for v in np.round(_r.normal(MU, 3, 40), 1)]
MOYENNES = [float(v) for v in np.round(_r.normal(MU, 3, (40, 9)), 1).mean(axis=1)]
_r = np.random.default_rng(31)
AUTRES_M = [float(v) for v in np.round(_r.normal(MU, 3, (3, 9)), 1).mean(axis=1)]   # 3 autres tirages
assert VX / N == 1 and VX / 36 == 0.25 and VX ** 0.5 == 3

BATON = "#64748B"       # les points du stat_graph (gris ardoise)
VERT_G = "#65A30D"      # la gousse verte
VERT_F = "#3F6212"      # son contour
LIANE = "#4D7C0F"
FEUILLE = "#84CC16"
BLEU_NB = "#60A5FA"


def P(x, y):
    return np.array([x, y, 0.0])


def frac(haut, bas, fs=44, color=WHITE, c_haut=None, c_bas=None):
    """Une fraction en Text : numérateur, trait, dénominateur."""
    h = haut if isinstance(haut, Mobject) else Text(haut, font_size=fs, color=c_haut or color)
    b = bas if isinstance(bas, Mobject) else Text(bas, font_size=fs, color=c_bas or color)
    w = max(h.width, b.width) + 0.16
    trait = Line(LEFT * w / 2, RIGHT * w / 2, color=color, stroke_width=max(2.5, fs / 16))
    h.next_to(trait, UP, buff=0.1)
    b.next_to(trait, DOWN, buff=0.1)
    return VGroup(h, trait, b)


def ind(base, indice, fs=44, color=WHITE):
    """X₁ en Text : l'indice, plus petit, posé en bas à droite."""
    b = Text(base, font_size=fs, color=color)
    i = Text(indice, font_size=int(fs * 0.6), color=color)
    i.next_to(b, RIGHT, buff=0.03).align_to(b, DOWN).shift(DOWN * 0.1 * fs / 48)
    return VGroup(b, i)


def gousse(masse=15.0, s=1.0, color=VERT_G):
    """Une gousse de vanille verte : longue, fine, un peu courbée ; sa longueur
    suit sa masse. La queue brune à gauche."""
    L = 0.11 * masse
    corps = RoundedRectangle(width=L, height=0.2, corner_radius=0.1, fill_color=color, fill_opacity=1,
                             stroke_color=VERT_F, stroke_width=2)
    corps.apply_function(lambda p: p + np.array([0, 0.06 * (p[0] / (L / 2)) ** 2, 0]))
    queue = Line(corps.get_left() + RIGHT * 0.02, corps.get_left() + LEFT * 0.16 + UP * 0.1,
                 color="#78350F", stroke_width=4)
    return VGroup(queue, corps).scale(s)


def liane(s=1.0):
    """La liane de vanille sur son tuteur : feuilles, une grappe de gousses."""
    tuteur = Line(P(0, -1.6), P(0, 1.6), color="#92400E", stroke_width=10)
    tige = VMobject(stroke_color=LIANE, stroke_width=6)
    tige.set_points_smoothly([P(0.05, -1.5), P(-0.35, -0.8), P(0.35, -0.1), P(-0.3, 0.6), P(0.2, 1.4)])
    feuilles = VGroup(*[Ellipse(width=0.6, height=0.28, fill_color=FEUILLE, fill_opacity=1, stroke_color=LIANE,
                                stroke_width=2).rotate(a).move_to(P(x, y))
                        for x, y, a in ((-0.55, -0.9, 0.5), (0.6, -0.15, -0.4), (-0.55, 0.55, 0.4), (0.45, 1.25, -0.3))])
    grappe = VGroup(*[gousse(m, 0.75).rotate(-PI / 2 + d) for m, d in ((15, 0.1), (17, 0.0), (13, -0.1), (16, 0.05))])
    grappe.arrange(RIGHT, buff=0.05).move_to(P(0.75, 0.0) + DOWN * 0.1)
    return VGroup(tuteur, tige, feuilles, grappe).scale(s)


def balance(s=1.0):
    """Une balance de cuisine : plateau, corps, écran (vide)."""
    corps = RoundedRectangle(width=2.2, height=0.75, corner_radius=0.12, fill_color="#E2E8F0", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    plateau = RoundedRectangle(width=2.5, height=0.12, corner_radius=0.05, fill_color="#94A3B8", fill_opacity=1,
                               stroke_width=0).next_to(corps, UP, buff=0.08)
    ecran = RoundedRectangle(width=1.2, height=0.4, corner_radius=0.06, fill_color="#0F172A", fill_opacity=1,
                             stroke_width=0).move_to(corps)
    return VGroup(corps, plateau, ecran).scale(s)


# ── la carte `stat_graph` du coach, en nuage de points empilés ──────────────

class CarteNuage(VGroup):
    """Carte blanche, une ou deux rangées ; chaque rangée a son axe (sans
    graduation) et son mot à gauche. Une valeur = un point posé au-dessus de
    l'axe, empilé par classes de largeur `pas`."""

    A, B = 8.0, 22.0

    def __init__(self, larg=6.4, haut=3.0, rangees=("",), titre=None, pas=0.5, r=0.075, marge_bas=0.85, fs_mot=26,
                 a=None, b=None):
        super().__init__()
        self.A = self.A if a is None else a
        self.B = self.B if b is None else b
        self.larg, self.haut, self.pas, self.r = larg, haut, pas, r
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.add(self.carte)
        self.titre = None
        haut_utile = haut - 0.35
        if titre:
            self.titre = Text(titre, font_size=24, color=ENCRE, weight=BOLD)
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.16)
            self.add(self.titre)
            haut_utile -= 0.45
        g = 0.35 if not rangees[0] else 2.05
        self.x0, self.x1 = -larg / 2 + g, larg / 2 - 0.3
        k = len(rangees)
        self.axes, self.mots, self.ys = VGroup(), VGroup(), []
        for i, mot in enumerate(rangees):
            y = -haut / 2 + marge_bas + (k - 1 - i) * (haut_utile - marge_bas + 0.35) / k
            self.ys.append(y)
            self.axes.add(Line(P(self.x0, y), P(self.x1, y), color=ENCRE, stroke_width=2.5))
            if mot:
                lignes = VGroup(*[Text(m, font_size=fs_mot, color=ENCRE) for m in mot.split("\n")])
                lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.05)
                lignes.next_to(P(-larg / 2 + 0.2, y + 0.35), RIGHT, buff=0).align_to(P(-larg / 2 + 0.2, 0), LEFT)
                self.mots.add(lignes)
        self.add(self.axes, self.mots)

    def x_de(self, v):
        a = self.axes[0].get_start()[0]
        b = self.axes[0].get_end()[0]
        return a + (v - self.A) / (self.B - self.A) * (b - a)

    def y_axe(self, i=0):
        return self.axes[i].get_center()[1]

    def nuage(self, valeurs, i=0, color=BATON, r=None):
        """Les points empilés (dans l'ordre des valeurs : le n-ième point d'une
        classe se pose au n-ième étage)."""
        r = r or self.r
        piles, pts = {}, VGroup()
        for v in valeurs:
            c = round(v / self.pas)
            h = piles.get(c, 0)
            piles[c] = h + 1
            pts.add(Dot(P(self.x_de(c * self.pas), self.y_axe(i) + r + 0.02 + 2.1 * r * h), radius=r, color=color))
        return pts

    def repere(self, v, texte=None, i=0, color=CHEMIN, fs=26, dessous=True):
        """Un triangle sous l'axe à la valeur v, et sa valeur écrite (quand la
        voix la dit)."""
        y = self.y_axe(i)
        tri = Triangle(color=color, fill_color=color, fill_opacity=1).scale(0.12)
        tri.move_to(P(self.x_de(v), y - 0.17))
        g = VGroup(tri)
        if texte:
            t = Text(texte, font_size=fs, color=color, weight=BOLD)
            t.next_to(tri, DOWN, buff=0.05)
            g.add(t)
        return g

    def ligne_centre(self, v=MU, color=CHEMIN, i0=0, i1=None):
        """Le trait vertical pointillé à la valeur v, sur les rangées i0 … i1."""
        i1 = i0 if i1 is None else i1
        ecart = (self.ys[0] - self.ys[1] - 0.15) if len(self.ys) > 1 else 1.5
        haut = self.y_axe(i0) + ecart
        bas = self.y_axe(i1) - 0.05
        return DashedLine(P(self.x_de(v), bas), P(self.x_de(v), haut), color=color, stroke_width=3, dash_length=0.1)

    def fleche_ecart(self, centre, ecart, y, texte, color=PROBA, fs=24):
        """Une double flèche de centre − écart à centre + écart, et son nom."""
        a = Arrow(P(self.x_de(centre), y), P(self.x_de(centre - ecart), y), buff=0, color=color,
                  stroke_width=5, max_tip_length_to_length_ratio=0.25, tip_length=0.16)
        b = Arrow(P(self.x_de(centre), y), P(self.x_de(centre + ecart), y), buff=0, color=color,
                  stroke_width=5, max_tip_length_to_length_ratio=0.25, tip_length=0.16)
        if not texte:
            return VGroup(a, b)
        t = Text(texte, font_size=fs, color=color, weight=BOLD).next_to(b, UP, buff=0.06)
        return VGroup(a, b, t)


class ProbaConcMoyenneBase(MotsCales, Notion6e):
    """Toutes les scènes ; la sous-classe ne change que identité et ceinture."""

    fichier_marques = "proba_conc_moyenne_marques.json"
    nom_voix = "terminale-proba-conc-moyenne"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
    X_G = -3.3          # le centre de la colonne de gauche
    LARG_G = 6.6
    X_C = 3.55          # le centre de la carte, à droite

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def titre_ecran(self, texte, *avec, font_size=40):
        t = Text(texte, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t), *avec, run_time=0.8)
        return t

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=None):
        larg = larg or self.LARG_G
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def ligne(self, *objs, y=0.0, x=None, buff=0.18, larg=None):
        g = self.caser(suite(*objs, buff=buff), larg)
        return g.move_to(P(self.X_G if x is None else x, y))

    def egal(self, gauche, droite, fs=44, cg=WHITE, cd=WHITE):
        """« V(M) = V(X) / n » : gauche, =, droite (Text ou mobject)."""
        g = gauche if isinstance(gauche, Mobject) else self.t(gauche, fs, cg)
        d = droite if isinstance(droite, Mobject) else self.t(droite, fs, cd)
        return suite(g, self.t("=", fs), d, buff=0.22)

    def carte1(self, y=0.2):
        return CarteNuage(larg=6.4, haut=3.4, titre="Masse d'une gousse (g)").move_to(P(self.X_C, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La moyenne d'un échantillon", 52, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("son espérance, sa variance", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        c = CarteNuage(larg=5.6, haut=2.4, rangees=("", "")).move_to(P(-0.6, -0.6))
        pts1 = c.nuage(SEULES[:24], 0)
        pts2 = c.nuage(MOYENNES[:24], 1, color=PROBA)
        self.add(ech, titre, c)            # la ceinture, visible dès la 1re image
        self.au_mot("son espérance")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.6) for p in pts1], lag_ratio=0.05), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.6) for p in pts2], lag_ratio=0.05), run_time=1.0)
        self.attendre_voix(marge=1.0)

    # ── 01 : la vanille de Saint-André ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        lia = liane(1.25).move_to(P(-5.0, 0.4))
        self.titre_ecran("La vanille de Saint-André", FadeIn(lia, shift=UP * 0.2))
        self.au_mot("agricultrice")
        metier = self.t("agricultrice", 40, VERT_OK).next_to(lia, DOWN, buff=0.35)
        self.play(FadeIn(metier, shift=UP * 0.15), run_time=0.5)
        self.au_mot("gousses vertes")
        g = gousse(15, 1.6).move_to(P(-0.6, 1.6))
        self.play(TransformFromCopy(lia[3][1], g), run_time=0.7)
        self.au_mot("revenu")
        bal = balance(1.0).move_to(P(-0.6, 0.55))
        self.play(FadeIn(bal, shift=UP * 0.2), g.animate.next_to(bal[1], UP, buff=0.04), run_time=0.6)
        fs = 44
        self.au_mot("La masse X")
        xm = suite(self.t("X :", fs, JAUNE_TITRE), self.t("la masse d'une gousse", 38), buff=0.25)
        self.caser(xm, 6.0).move_to(P(3.6, 1.75))
        self.play(FadeIn(xm, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("15 grammes")
        e = self.egal("E(X)", "15 g", fs, cd=VERT_OK).move_to(P(3.7, 0.65))
        self.play(FadeIn(e, scale=1.4), run_time=0.5)
        self.au_mot("variance 9")
        v = self.egal("V(X)", "9", fs, cd=BLEU_NB).move_to(P(3.7, -0.35))
        self.play(FadeIn(v, scale=1.4), run_time=0.5)
        self.au_mot("Peser toute la récolte")
        tas = VGroup(*[gousse(14 + (k % 5), 0.5).rotate(0.25 * ((k * 7) % 5 - 2)) for k in range(24)])
        tas.arrange_in_grid(rows=3, cols=8, buff=0.06)
        self.caser(tas, 4.6).move_to(P(-0.4, -2.2))
        self.play(LaggedStart(*[FadeIn(p, scale=1.3) for p in tas], lag_ratio=0.02), run_time=0.8)
        self.au_mot("Impossible")
        croix = VGroup(Line(tas.get_corner(UL), tas.get_corner(DR)), Line(tas.get_corner(DL), tas.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 7)
        self.play(Create(croix), run_time=0.4)
        self.au_mot("Elle tire 9")
        neuf = VGroup(*[tas[k] for k in range(9)])
        reste = VGroup(*[tas[k] for k in range(9, 24)])
        cible = VGroup(*[gousse(15, 0.55) for _ in range(9)]).arrange_in_grid(rows=3, cols=3, buff=0.12)
        cible.move_to(P(3.2, -2.2))
        neuf_t = self.t("9 gousses", 40, BLEU_NB).move_to(P(5.3, -1.45))
        self.play(FadeOut(croix), reste.animate.set_opacity(0.25),
                  *[Transform(neuf[k], cible[k]) for k in range(9)], FadeIn(neuf_t, shift=RIGHT * 0.2), run_time=0.9)
        self.attendre_voix()

    # ── 02 : un vrai tirage de 9 gousses ────────────────────────────────────

    def ecran_tirage(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tirage")
        c = self.carte1()
        rangs = VGroup(*[gousse(m, 1.25) for m in GOUSSES])
        for k, g in enumerate(rangs):
            g.move_to(P(0, 2.5 - 0.33 * k)).align_to(P(-6.3, 0), LEFT)
        self.titre_ecran("Un vrai tirage", FadeIn(c))
        self.play(LaggedStart(*[FadeIn(g, shift=RIGHT * 0.4) for g in rangs], lag_ratio=0.08), run_time=0.9)
        self.au_mot("varient")
        pts = c.nuage(GOUSSES, 0)
        self.play(*[TransformFromCopy(g[1], p) for g, p in zip(rangs, pts)], run_time=0.6)
        kmin, kmax = GOUSSES.index(min(GOUSSES)), GOUSSES.index(max(GOUSSES))
        self.au_mot("de 10,4")
        rmin = c.repere(min(GOUSSES), "10,4", color=PROBA)
        self.play(FadeIn(rmin, shift=UP * 0.1), pts[kmin].animate.set_color(PROBA).scale(1.4),
                  rangs[kmin].animate.set_color(PROBA), run_time=0.5)
        self.au_mot("20,5")
        rmax = c.repere(max(GOUSSES), "20,5", color=PROBA)
        self.play(FadeIn(rmax, shift=UP * 0.1), pts[kmax].animate.set_color(PROBA).scale(1.4),
                  rangs[kmax].animate.set_color(PROBA), run_time=0.5)
        fs = 42
        self.au_mot("leur moyenne M")
        num = suite(ind("X", "1", fs), self.t("+", fs), ind("X", "2", fs), self.t("+ … +", fs), ind("X", "9", fs),
                    buff=0.14)
        f = frac(num, self.t("9", fs, BLEU_NB), fs)
        mf = suite(self.t("M", fs + 4, CHEMIN), self.t("=", fs), f, buff=0.25)
        self.caser(mf).move_to(P(self.X_G, -1.55))
        self.play(FadeIn(mf[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("la somme des 9")
        self.play(FadeIn(num, shift=UP * 0.15), rangs.animate.set_opacity(0.6), run_time=0.6)
        self.au_mot("divisée par 9")
        self.play(Create(f[1]), FadeIn(f[2], scale=1.5), run_time=0.5)
        self.au_mot("16,1 grammes")
        res = suite(self.t("M", fs + 4, CHEMIN), self.t("=", fs), self.t("16,1 g", fs + 8, CHEMIN), buff=0.25)
        res.move_to(P(self.X_G, -3.05))
        rm = c.repere(M_TIRAGE, "16,1", color=CHEMIN)
        rm[1].next_to(rm[0], DOWN, buff=0.05)
        self.play(FadeIn(res, scale=1.4), GrowFromCenter(rm), run_time=0.6)
        self.insister(res[2])
        self.attendre_voix()

    # ── 03 : E(M) = E(X) ────────────────────────────────────────────────────

    def ecran_esperance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-esperance")
        c = self.carte1()
        pts = c.nuage(GOUSSES, 0).set_opacity(0.35)
        rm = c.repere(M_TIRAGE, color=CHEMIN)
        self.titre_ecran("Première propriété", FadeIn(c), FadeIn(pts), FadeIn(rm))
        self.au_mot("M change")
        autres = VGroup(*[c.repere(m, color=CHEMIN) for m in AUTRES_M])
        self.play(LaggedStart(*[GrowFromCenter(a) for a in autres], lag_ratio=0.5), run_time=1.4)
        fs = 44
        self.au_mot("variable aléatoire")
        va = suite(self.t("M :", fs, CHEMIN), self.t("une variable aléatoire", 40), buff=0.25)
        self.caser(va).move_to(P(self.X_G, 1.4))
        self.play(FadeIn(va, shift=UP * 0.15), run_time=0.5)
        self.au_mot("E de M")
        e = self.egal("E(M)", "E(X)", fs + 6, cg=CHEMIN, cd=VERT_OK).move_to(P(self.X_G, -0.1))
        self.play(FadeIn(e[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("E de X")
        self.play(FadeIn(e[2], scale=1.4), run_time=0.4)
        cad = SurroundingRectangle(e, color=VERT_OK, buff=0.18, stroke_width=3)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("15 grammes")
        lc = c.ligne_centre(MU, color=VERT_OK)
        r15 = c.repere(MU, "15", color=VERT_OK)
        r15[0].set_opacity(0)
        r15[1].shift(DOWN * 0.2)
        quinze = self.egal("E(M)", "15 g", fs, cg=CHEMIN, cd=VERT_OK).move_to(P(self.X_G, -1.75))
        self.play(Create(lc), FadeIn(r15[1], scale=1.5), FadeIn(quinze, shift=UP * 0.15), run_time=0.7)
        self.au_mot("comme une gousse seule")
        self.play(pts.animate.set_opacity(1), Indicate(lc, color=VERT_OK), run_time=0.7)
        self.insister(quinze[2])
        self.attendre_voix()

    # ── 04 : V(M) = V(X) / n ────────────────────────────────────────────────

    def ecran_variance(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-variance")
        c = CarteNuage(larg=6.6, haut=4.2, rangees=("une\ngousse", "la\nmoyenne"), fs_mot=27, a=10, b=20)
        c.move_to(P(self.X_C, 0.3))
        self.titre_ecran("Deuxième propriété", FadeIn(c))
        fs = 46
        self.au_mot("V de M")
        f = frac(self.t("V(X)", fs, BLEU_NB), self.t("n", fs, BLEU_NB), fs)
        vm = self.egal("V(M)", f, fs, cg=CHEMIN).move_to(P(self.X_G, 1.5))
        self.play(FadeIn(vm[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("V de X divisé")
        self.play(FadeIn(f[0], shift=DOWN * 0.1), Create(f[1]), run_time=0.4)
        self.au_mot("par n")
        self.play(FadeIn(f[2], scale=1.6), run_time=0.4)
        cad = SurroundingRectangle(vm, color=VERT_OK, buff=0.18, stroke_width=3)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("9 divisé par 9")
        f2 = frac("9", "9", fs, c_haut=BLEU_NB, c_bas=BLEU_NB)
        l2 = self.ligne(self.t("V(M)", fs, CHEMIN), self.t("=", fs), f2, y=-0.6, buff=0.22)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("vaut 1")
        un = suite(self.t("=", fs), self.t("1", fs + 12, VERT_OK), buff=0.22).next_to(l2, RIGHT, buff=0.22)
        self.play(FadeIn(un, scale=1.6), run_time=0.4)
        self.insister(un[1])
        self.au_mot("L'écart-type passe")
        lc = c.ligne_centre(MU, color=VERT_OK, i0=0, i1=1)
        et = self.t("écart-type", 40, PROBA).move_to(P(self.X_G, -2.3))
        self.play(Create(lc), FadeIn(et, shift=UP * 0.15), run_time=0.5)
        self.au_mot("3 grammes")
        f3 = c.fleche_ecart(MU, 3, c.y_axe(0) + 0.45, "3 g", color=PROBA, fs=32)
        trois = self.t("3 g", 44, PROBA).next_to(et, DOWN, buff=0.2).shift(LEFT * 1.0)
        self.play(GrowFromCenter(f3[:2]), FadeIn(f3[2]), FadeIn(trois, scale=1.4), run_time=0.6)
        self.au_mot("1 gramme")
        f1 = c.fleche_ecart(MU, 1, c.y_axe(1) + 0.45, "1 g", color=VERT_OK, fs=32)
        fl = Arrow(LEFT, RIGHT, color=WHITE, stroke_width=6).scale(0.6).next_to(trois, RIGHT, buff=0.2)
        un_g = self.t("1 g", 44, VERT_OK).next_to(fl, RIGHT, buff=0.2)
        self.play(GrowFromCenter(f1[:2]), FadeIn(f1[2]), GrowArrow(fl), FadeIn(un_g, scale=1.4), run_time=0.6)
        self.insister(VGroup(f1, un_g))
        self.attendre_voix()

    # ── 05 : le sens : 40 gousses seules, 40 moyennes de 9 (vrais tirages) ──

    def carte2(self, larg=10.4, haut=5.0, y=-0.05, x=-0.55):
        return CarteNuage(larg=larg, haut=haut, rangees=("40 gousses\nseules", "40 moyennes\nde 9 gousses"),
                          r=0.07, fs_mot=28 if larg > 8 else 24).move_to(P(x, y))

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        c = self.carte2()
        mots = c.mots
        c.remove(mots)
        self.titre_ecran("40 vrais tirages", FadeIn(c))
        p1 = c.nuage(SEULES, 0)
        p2 = c.nuage(MOYENNES, 1, color=PROBA)
        self.au_mot("En haut")
        self.play(FadeIn(mots[0], shift=RIGHT * 0.2), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.8) for p in p1], lag_ratio=0.04), run_time=1.6)
        self.au_mot("loin de 15")
        lc = c.ligne_centre(MU, color=VERT_OK, i0=0, i1=1)
        r15 = Text("15", font_size=30, color=VERT_OK, weight=BOLD).move_to(P(c.x_de(MU), c.y_axe(1) - 0.6))
        etal = c.fleche_ecart(MU, 6, c.y_axe(0) - 0.32, "", color=ROUGE_ERREUR)[:2]
        self.play(Create(lc), FadeIn(r15, scale=1.4), GrowFromCenter(etal), run_time=0.7)
        self.au_mot("En bas")
        self.play(FadeIn(mots[1], shift=RIGHT * 0.2), FadeOut(etal), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.8) for p in p2], lag_ratio=0.04), run_time=1.6)
        self.au_mot("se serrent")
        serre = c.fleche_ecart(MU, 2.4, c.y_axe(1) - 0.27, "", color=VERT_OK)[:2]
        self.play(GrowFromCenter(serre), Indicate(p2, color=VERT_OK, scale_factor=1.15), run_time=0.8)
        self.au_mot("Faire la moyenne concentre")
        fin = self.t("Faire la moyenne concentre.", 40, VERT_OK).move_to(P(-1.2, -3.2))
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.5)
        self.insister(fin, 0.25)
        self.attendre_voix()

    # ── 06 : le piège : V(M) = V(X) ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        c = self.carte2(larg=6.6, haut=4.2, y=0.15, x=self.X_C)
        p1 = c.nuage(SEULES, 0)
        p2 = c.nuage(MOYENNES, 1, color=PROBA)
        self.titre_ecran("Le piège", FadeIn(VGroup(c, p1, p2)))
        fs = 48
        self.au_mot("écrire V de M")
        faux = self.egal("V(M)", "9", fs + 4, cg=ROUGE_ERREUR, cd=ROUGE_ERREUR).move_to(P(self.X_G, 1.5))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.5)
        self.au_mot("une seule gousse")
        self.play(p1.animate.set_color(ROUGE_ERREUR), Indicate(c.mots[0], color=ROUGE_ERREUR), run_time=0.6)
        self.au_mot("Faux")
        croix = VGroup(Line(faux.get_corner(UL), faux.get_corner(DR)), Line(faux.get_corner(DL), faux.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 7)
        self.play(Create(croix), run_time=0.4)
        self.au_mot("La moyenne varie")
        self.play(p1.animate.set_color(BATON).set_opacity(0.35), p2.animate.set_color(VERT_OK),
                  Indicate(c.mots[1], color=VERT_OK), run_time=0.7)
        self.au_mot("On divise par n")
        f = frac(self.t("V(X)", fs, BLEU_NB), self.t("n", fs, BLEU_NB), fs)
        bon = self.ligne(self.t("V(M)", fs, VERT_OK), self.t("=", fs), f, y=-0.3, buff=0.22)
        self.play(FadeIn(bon, shift=UP * 0.15), run_time=0.5)
        self.au_mot("9 divisé par 9")
        f2 = frac("9", "9", fs, c_haut=BLEU_NB, c_bas=BLEU_NB)
        l2 = self.ligne(self.t("V(M)", fs, VERT_OK), self.t("=", fs), f2, y=-2.3, x=self.X_G - 0.6, buff=0.22)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot(", 1.")
        un = suite(self.t("=", fs), self.t("1", fs + 14, VERT_OK), buff=0.22).next_to(l2, RIGHT, buff=0.22)
        self.play(FadeIn(un, scale=1.6), run_time=0.4)
        cad = SurroundingRectangle(un[1], color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(un[1], cad))
        self.attendre_voix()

    # ── 07 : défi : 36 gousses ──────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        rappel = VGroup(self.egal("E(X)", "15 g", 40, cd=VERT_OK), self.egal("V(X)", "9", 40, cd=BLEU_NB))
        rappel.arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(P(3.9, 1.3))
        self.play(FadeIn(rappel), run_time=0.4)
        self.au_mot("36 gousses")
        tas = VGroup(*[gousse(15, 0.62) for _ in range(36)]).arrange_in_grid(rows=6, cols=6, buff=(0.12, 0.14))
        self.caser(tas, 5.2).move_to(P(-3.4, 0.9))
        trente6 = self.t("36 gousses", 48, BLEU_NB).next_to(tas, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(g, scale=1.4) for g in tas], lag_ratio=0.02),
                  FadeIn(trente6, shift=UP * 0.15), run_time=1.0)
        self.au_mot("Quelle est la variance")
        q = self.egal("V(M)", "?", 60, cg=ORANGE_RETENUE, cd=ORANGE_RETENUE).move_to(P(3.9, -0.6))
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.insister(q, 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-0.8, -2.75))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        fs = 50
        self.au_mot("V de M")
        f = frac("9", "36", fs, c_haut=BLEU_NB, c_bas=BLEU_NB)
        l1 = self.ligne(self.t("V(M)", fs, CHEMIN), self.t("=", fs), f, y=1.5, x=-2.6, buff=0.25)
        self.play(FadeIn(l1[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("9 divisé par 36")
        self.play(FadeIn(f, scale=1.3), run_time=0.5)
        self.au_mot("0,25")
        r = suite(self.t("=", fs), self.t("0,25", fs + 12, VERT_OK), buff=0.25).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r, scale=1.6), run_time=0.5)
        cad = SurroundingRectangle(r[1], color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r[1], cad))
        self.au_mot("l'espérance ne bouge pas")
        e = self.ligne(self.t("E(M)", fs, CHEMIN), self.t("=", fs), y=-0.5, x=-3.4, buff=0.25)
        self.play(FadeIn(e, shift=UP * 0.15), run_time=0.4)
        self.au_mot("15 grammes")
        q = self.t("15 g", fs + 8, VERT_OK).next_to(e, RIGHT, buff=0.25)
        self.play(FadeIn(q, scale=1.5), run_time=0.4)
        self.au_mot("Agricultrice")
        lia = liane(0.85).move_to(P(4.6, -0.4))
        mot = VGroup(self.t("Agricultrice :", 40, VERT_OK), self.t("prévoir avec des chiffres", 40))
        mot.arrange(RIGHT, buff=0.25).move_to(P(-1.0, -2.6))
        self.play(FadeIn(lia, shift=UP * 0.2), FadeIn(mot, shift=UP * 0.15), run_time=0.7)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        fs = 44
        l1 = suite(self.t("E(M) = E(X)", fs, VERT_OK), self.t(": le même centre", fs), buff=0.25)
        l2 = suite(self.t("V(M) =", fs, VERT_OK), frac("V(X)", "n", fs - 4, color=VERT_OK), buff=0.25)
        l3 = VGroup(self.t("n grand : la moyenne se concentre", fs),
                    self.t("autour de l'espérance", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, -0.1))
        for mot, l in zip(["L'espérance", "Sa variance", "Et plus n"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
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
        self.ecran_tirage()
        self.ecran_esperance()
        self.ecran_variance()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaConcMoyenneTerminale(ProbaConcMoyenneBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
