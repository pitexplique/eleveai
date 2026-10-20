# proba_bern_representer.py
# EleveAI — Maths STMG — série « Probabilités », épisode 33 : REPRÉSENTER les
# fréquences observées par un NUAGE DE POINTS et un HISTOGRAMME (micro :
# va_bern_representer, notion va_bernoulli), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_bern_representer_short.py
# (ceinture jaune).
#
# ⭐ Canvas du coach repris (lib/tutor-v4/questionBank/stmg/maths/
# variables-aleatoires.bank.ts, gabarits stmg_va_bern_representer_tpl_1 et
# _2) : `stat_graph` en `barres` (lib/tutor-v4/components/StatGraphCanvas.tsx) :
# carte blanche arrondie, axes encre #0f172a, barres grises #94a3b8 bordées
# #334155, barre « active » bordée ambre #f59e0b. Aucun effectif écrit sur les
# barres (la voix n'en dit aucun).
#
# ⭐ Les données : un VRAI tirage fixé (graine 524) de 100 fréquences
# d'échantillons de 50 avec p = 0,3 : exactement 92 entre 0,2 et 0,4, un seul
# point à 0,46 (le plus haut), trois au-dessus de 0,4 (0,42 / 0,44 / 0,46).
# Le short reprend les mêmes 100 points.
#
# Écrans : 00 garde · 01 le site, 100 échantillons de 50 visiteurs, p = 0,3,
# 100 fréquences · 02 le nuage se construit point par point, droite y = 0,3 ·
# 03 la bande 0,2 – 0,4 · 04 les points tombent dans l'histogramme, barre la
# plus haute autour de 0,3 · 05 les deux graphiques côte à côte · 06 le piège
# du point isolé 0,46 · 07 défi (92 sur 100) · 07b correction 92 % · 08 ce
# que tu as appris · 09 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! »).
#
# Voix : manim/voix/stmg-proba-bern-representer.json (débit −7).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_representer.py ProbaBernRepresenterSTMG -o eleveai-maths-stmg-proba-bern-representer --media_dir manim/scripts/stmg/media-bern_representer
# Puis copier dans manim/sorties/stmg/maths/probabilites/33-bern-representer/.

import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI.parent / "seconde"))
sys.path.insert(0, str(ICI.parent / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import frac, suite  # noqa: E402

ACHAT = "#22C55E"       # un visiteur qui achète
POINT = "#60A5FA"       # une fréquence dans le nuage
ISOLE = "#EF4444"       # le point isolé 0,46
BANDE = "#22C55E"       # la bande 0,2 – 0,4
# le canvas « stat_graph » du coach
C_ENCRE = "#0F172A"
C_BARRE = "#94A3B8"
C_BORD = "#334155"
C_ACTIF = "#F59E0B"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les 100 fréquences (graine 524 : 92 entre 0,2 et 0,4, un seul 0,46) ────
K50 = [int(k) for k in np.random.default_rng(524).binomial(50, 0.3, 100)]
FREQ = [k / 50 for k in K50]
I_ISOLE = FREQ.index(0.46)
assert sum(1 for f in FREQ if 0.2 - 1e-9 <= f <= 0.4 + 1e-9) == 92
assert max(FREQ) == 0.46 and FREQ.count(0.46) == 1
assert sum(1 for f in FREQ if f > 0.4 + 1e-9) == 3

# Les classes de l'histogramme (largeur 0,04 ; 0,40 rangé avec 0,36 – 0,40 pour
# que « entre 0,2 et 0,4 » soit exactement les cinq barres du milieu).
BORNES = [0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40, 0.44, 0.48]
CENTRALES = [1, 2, 3, 4, 5]     # les classes de 0,2 à 0,4
HAUTE = 3                       # la classe 0,28 – 0,32 : la plus haute


def classe(f):
    if abs(f - 0.40) < 1e-9:
        return 5
    for i in range(len(BORNES) - 1):
        if BORNES[i] - 1e-9 <= f < BORNES[i + 1] - 1e-9:
            return i
    raise ValueError(f)


EFF = [0] * (len(BORNES) - 1)
for _f in FREQ:
    EFF[classe(_f)] += 1
assert max(EFF) == EFF[HAUTE] and sum(EFF[i] for i in CENTRALES) == 92


# ── les dessins ─────────────────────────────────────────────────────────────

def visiteur(couleur=GREY_B, s=1.0):
    """Une petite silhouette : tête ronde et buste arrondi (épisode 32)."""
    tete = Circle(radius=0.11, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.17))
    buste = RoundedRectangle(width=0.3, height=0.2, corner_radius=0.09, fill_color=couleur, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.07))
    return VGroup(tete, buste).scale(s)


def site_vente(larg=4.2, haut=2.8):
    """La fenêtre du site de vente de l'épisode 32 (bouton vert « Acheter »)."""
    fond = RoundedRectangle(width=larg, height=haut, corner_radius=0.16, fill_color="#F8FAFC", fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=2)
    barre = Rectangle(width=larg - 0.04, height=0.42, fill_color="#CBD5E1", fill_opacity=1, stroke_width=0)
    barre.align_to(fond, UP).shift(DOWN * 0.02)
    adresse = RoundedRectangle(width=larg * 0.6, height=0.24, corner_radius=0.1, fill_color=WHITE,
                               fill_opacity=1, stroke_width=0).move_to(barre)
    article = RoundedRectangle(width=1.4, height=1.4, corner_radius=0.12, fill_color="#FDE68A", fill_opacity=1,
                               stroke_color="#F59E0B", stroke_width=2)
    article.move_to(fond).shift(LEFT * larg * 0.22 + DOWN * 0.2)
    sac = VGroup(RoundedRectangle(width=0.75, height=0.65, corner_radius=0.08, fill_color="#F97316",
                                  fill_opacity=1, stroke_width=0),
                 Arc(radius=0.2, start_angle=0, angle=PI, color="#9A3412", stroke_width=5).shift(UP * 0.33))
    sac.move_to(article)
    lignes = VGroup(*[RoundedRectangle(width=w, height=0.13, corner_radius=0.06, fill_color="#94A3B8",
                                       fill_opacity=1, stroke_width=0) for w in (1.5, 1.1)])
    lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.16).move_to(fond).shift(RIGHT * larg * 0.2 + UP * 0.35)
    bouton = RoundedRectangle(width=1.5, height=0.48, corner_radius=0.12, fill_color=ACHAT, fill_opacity=1,
                              stroke_width=0)
    bouton.next_to(lignes, DOWN, buff=0.35).align_to(lignes, LEFT)
    mot = Text("Acheter", font_size=24, color=WHITE, weight=BOLD).move_to(bouton)
    g = VGroup(fond, barre, adresse, article, sac, lignes, bouton, mot)
    g.bouton = VGroup(bouton, mot)
    return g


class Nuage(VGroup):
    """Le repère du nuage : en abscisse le numéro de l'échantillon (1 à 100),
    en ordonnée sa fréquence (de 0,1 à 0,5, SANS graduation chiffrée : seuls
    0,2 / 0,3 / 0,4 s'écrivent, quand la voix les dit)."""

    def __init__(self, o=P(-5.4, -2.3), W=10.0, H=4.4, v0=0.1, v1=0.5, r=0.055, fs=26, **kw):
        super().__init__(**kw)
        self.o, self.W, self.H, self.v0, self.v1, self.r, self.fs = o, W, H, v0, v1, r, fs
        self.axe_x = Arrow(o, o + RIGHT * (W + 0.35), buff=0, color=WHITE, stroke_width=3,
                           max_tip_length_to_length_ratio=0.03)
        self.axe_y = Arrow(o, o + UP * (H + 0.35), buff=0, color=WHITE, stroke_width=3,
                           max_tip_length_to_length_ratio=0.06)
        self.titre_x = Text("numéro de l'échantillon", font_size=fs, color=GREY_A)
        self.titre_x.move_to(P(o[0] + W / 2, o[1] - 0.62))
        self.titre_y = Text("fréquence", font_size=fs, color=GREY_A)
        self.titre_y.next_to(self.axe_y.get_end(), RIGHT, buff=0.15)
        self.lab1 = Text("1", font_size=fs, color=WHITE).next_to(P(self.x(1), o[1]), DOWN, buff=0.15)
        self.lab100 = Text("100", font_size=fs, color=WHITE).next_to(P(self.x(100), o[1]), DOWN, buff=0.15)
        self.tic1 = Line(P(self.x(1), o[1] - 0.07), P(self.x(1), o[1] + 0.07), color=WHITE, stroke_width=2)
        self.tic100 = Line(P(self.x(100), o[1] - 0.07), P(self.x(100), o[1] + 0.07), color=WHITE, stroke_width=2)
        self.add(self.axe_x, self.axe_y)
        self.pts = VGroup(*[Dot(self.pt(i), radius=r, color=POINT) for i in range(100)])

    def x(self, numero):
        return self.o[0] + 0.15 + (numero - 1) / 99 * (self.W - 0.35)

    def y(self, v):
        return self.o[1] + (v - self.v0) / (self.v1 - self.v0) * self.H

    def pt(self, i):
        """La position du point de l'échantillon i (0 à 99)."""
        return P(self.x(i + 1), self.y(FREQ[i]))

    def droite(self, v, texte, color=JAUNE_TITRE, tirets=False, fs=None, sw=4):
        """La droite horizontale y = v et son nombre à gauche de l'axe."""
        a, b = P(self.o[0], self.y(v)), P(self.o[0] + self.W, self.y(v))
        trait = DashedLine(a, b, color=color, stroke_width=sw, dash_length=0.12) if tirets else \
            Line(a, b, color=color, stroke_width=sw)
        lbl = Text(texte, font_size=fs or self.fs + 4, color=color, weight=BOLD).next_to(a, LEFT, buff=0.15)
        return VGroup(trait, lbl)

    def bande(self, va=0.2, vb=0.4, color=BANDE, opacity=0.14):
        return Rectangle(width=self.W, height=self.y(vb) - self.y(va), stroke_width=0, fill_color=color,
                         fill_opacity=opacity).move_to(P(self.o[0] + self.W / 2, (self.y(va) + self.y(vb)) / 2))


class Histo(VGroup):
    """L'histogramme, dessiné comme le canvas `stat_graph` « barres » du coach :
    carte blanche, axes encre, barres grises bordées. Abscisse = fréquence ;
    seuls 0,2 / 0,3 / 0,4 s'écrivent."""

    def __init__(self, centre=P(3.2, 0.0), W=5.6, H=4.4, fs=24, titre=True, **kw):
        super().__init__(**kw)
        self.carte = RoundedRectangle(width=W, height=H, corner_radius=0.22, fill_color=WHITE, fill_opacity=1,
                                      stroke_color="#E2E8F0", stroke_width=2).move_to(centre)
        g, d = centre[0] - W / 2 + 0.4, centre[0] + W / 2 - 0.3
        self.bas = centre[1] - H / 2 + 0.75
        haut = centre[1] + H / 2 - (0.85 if titre else 0.35)
        self.g, self.d, self.v0, self.v1 = g, d, 0.14, 0.50
        self.axe_x = Line(P(g, self.bas), P(d, self.bas), color=C_ENCRE, stroke_width=3)
        self.axe_y = Line(P(g, self.bas), P(g, haut), color=C_ENCRE, stroke_width=3)
        self.u = (haut - self.bas - 0.1) / max(EFF)
        self.barres = VGroup()
        for i, e in enumerate(EFF):
            x0, x1 = self.x(BORNES[i]), self.x(BORNES[i + 1])
            b = Rectangle(width=x1 - x0, height=max(e, 0.001) * self.u, fill_color=C_BARRE, fill_opacity=1,
                          stroke_color=C_BORD, stroke_width=1.5)
            b.move_to(P((x0 + x1) / 2, self.bas + e * self.u / 2))
            self.barres.add(b)
        self.labels = {}
        self.tics = {}
        for v, s in ((0.2, "0,2"), (0.3, "0,3"), (0.4, "0,4")):
            self.tics[s] = Line(P(self.x(v), self.bas - 0.08), P(self.x(v), self.bas + 0.04), color=C_ENCRE,
                                stroke_width=3)
            self.labels[s] = Text(s, font_size=fs, color=C_ENCRE, weight=BOLD).next_to(
                P(self.x(v), self.bas), DOWN, buff=0.16)
        self.titre = Text("Fréquences observées", font_size=fs, color=C_ENCRE, weight=BOLD)
        self.titre.move_to(P(centre[0], centre[1] + H / 2 - 0.35))
        self.add(self.carte, self.axe_x, self.axe_y)
        if titre:
            self.add(self.titre)
        self.compte = [0] * len(EFF)

    def x(self, v):
        return self.g + 0.1 + (v - self.v0) / (self.v1 - self.v0) * (self.d - self.g - 0.2)

    def brique(self, i_ech):
        """Le petit carré de l'échantillon i_ech, à sa place dans sa classe."""
        c = classe(FREQ[i_ech])
        j = self.compte[c]
        self.compte[c] += 1
        x0, x1 = self.x(BORNES[c]), self.x(BORNES[c + 1])
        return Rectangle(width=(x1 - x0) * 0.9, height=self.u * 0.86, fill_color=POINT, fill_opacity=1,
                         stroke_width=0).move_to(P((x0 + x1) / 2, self.bas + (j + 0.5) * self.u))

    def actives(self, idx, color=C_ACTIF, sw=4):
        return [self.barres[i].animate.set_stroke(color, sw) for i in idx]


class ProbaBernRepresenterBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-bern-representer"
    identite = "Maths — EleveAI"

    # ── petits outils ───────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def reste_avant(self, extrait):
        """Le temps qui reste avant que la voix n'arrive à `extrait`."""
        i = self._texte_voix.find(extrait)
        return self._debut_voix + self._duree_voix * i / len(self._texte_voix) - self.renderer.time

    def construire_nuage(self, nu, duree):
        """Le nuage se construit POINT PAR POINT : les trois premiers lentement
        (pointillés depuis les axes), puis les autres de plus en plus vite."""
        t0 = self.renderer.time
        for i in range(3):
            p = nu.pts[i]
            vx = DashedLine(P(p.get_x(), nu.o[1]), p.get_center(), color=GREY_B, stroke_width=2, dash_length=0.08)
            hy = DashedLine(P(nu.o[0], p.get_y()), p.get_center(), color=GREY_B, stroke_width=2, dash_length=0.08)
            self.play(Create(vx), Create(hy), run_time=0.35)
            self.play(GrowFromCenter(p), run_time=0.25)
            self.play(FadeOut(vx), FadeOut(hy), run_time=0.2)
        reste = max(1.6, duree - (self.renderer.time - t0))
        self.play(LaggedStart(*[GrowFromCenter(p) for p in nu.pts[3:]], lag_ratio=0.35,
                              rate_func=rate_functions.ease_in_quad), run_time=reste)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Représenter des fréquences", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("nuage de points et histogramme", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        nu = Nuage(o=P(-5.6, -1.75), W=4.6, H=2.2, r=0.04)
        hi = Histo(centre=P(2.4, -0.55), W=3.6, H=2.5, titre=False)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.au_mot("nuage de points")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(nu), run_time=0.5)
        self.play(LaggedStart(*[GrowFromCenter(p) for p in nu.pts], lag_ratio=0.05), run_time=1.0)
        self.au_mot("histogramme")
        self.play(FadeIn(hi), run_time=0.3)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in hi.barres], lag_ratio=0.15), run_time=0.8)
        self.attendre_voix(marge=1.0)

    # ── 01 : 100 échantillons de 50 visiteurs, p = 0,3 ──────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un site de vente en ligne")
        site = site_vente(3.6, 2.3).move_to(P(-4.6, 1.6))
        self.play(FadeIn(site, shift=UP * 0.2), run_time=0.6)
        # 100 échantillons : une grille de 10 × 10 cartes, chacune une petite foule.
        cartes = VGroup(*[RoundedRectangle(width=0.42, height=0.34, corner_radius=0.05, fill_color="#1E293B",
                                           fill_opacity=1, stroke_color=BLEU_CALCUL, stroke_width=1.5)
                          for _ in range(100)]).arrange_in_grid(10, 10, buff=(0.1, 0.1))
        cartes.move_to(P(2.7, 0.55))
        for c in cartes:
            c.add(visiteur(GREY_B, 0.55).move_to(c))
        self.au_mot("100 échantillons")
        l100 = self.t("100 échantillons", 38, JAUNE_TITRE).next_to(cartes, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in cartes], lag_ratio=0.01), run_time=1.0)
        self.play(FadeIn(l100, scale=1.4), run_time=0.4)
        self.au_mot("50 visiteurs")
        # un échantillon s'ouvre : 50 visiteurs, dont 15 acheteurs (au hasard)
        foule = VGroup(*[visiteur(GREY_B, 0.9) for _ in range(50)]).arrange_in_grid(5, 10, buff=(0.1, 0.12))
        foule.move_to(P(-4.6, -1.7))
        cadre = SurroundingRectangle(foule, color=BLEU_CALCUL, buff=0.12, stroke_width=3)
        l50 = self.t("de 50 visiteurs", 34, BLEU_CALCUL).next_to(cadre, UP, buff=0.12)
        self.play(Indicate(cartes[0], color=JAUNE_TITRE, scale_factor=2.0),
                  TransformFromCopy(cartes[0], VGroup(foule, cadre)), run_time=0.8)
        self.play(FadeIn(l50, shift=UP * 0.1), run_time=0.4)
        self.au_mot("p égale 0,3")
        lp = suite(self.t("p", 48, JAUNE_TITRE), self.t("=", 48), self.t("0,3", 48, VERT_OK), buff=0.2)
        lp.move_to(P(-1.35, 1.6))
        acheteurs = [2, 5, 9, 11, 16, 18, 23, 27, 30, 34, 37, 41, 44, 46, 49]
        self.play(FadeIn(lp, scale=1.5),
                  LaggedStart(*[foule[k].animate.set_color(ACHAT) for k in acheteurs], lag_ratio=0.06),
                  run_time=1.0)
        self.au_mot("100 fréquences")
        # chaque carte devient UN point : sa fréquence
        pts = VGroup(*[Dot(c.get_center(), radius=0.08, color=POINT) for c in cartes])
        lf = self.t("100 fréquences", 36, POINT).move_to(l100)
        self.play(ReplacementTransform(cartes, pts), ReplacementTransform(l100, lf), run_time=0.9)
        self.insister(lf, 0.25)
        self.attendre_voix()

    # ── 02 : le nuage se construit ; 03 : la bande 0,2 – 0,4 ─────────────────

    def ecran_nuage(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-nuage")
        titre = self.titre_ecran("Le nuage de points")
        nu = Nuage()
        self.nu = nu
        self.au_mot("en abscisse")
        self.play(GrowArrow(nu.axe_x), FadeIn(nu.titre_x, shift=UP * 0.1), run_time=0.6)
        self.au_mot("de 1 à 100")
        self.play(Create(nu.tic1), FadeIn(nu.lab1, scale=1.5), run_time=0.35)
        self.play(Create(nu.tic100), FadeIn(nu.lab100, scale=1.5), run_time=0.35)
        self.au_mot("En ordonnée")
        self.play(GrowArrow(nu.axe_y), FadeIn(nu.titre_y, shift=RIGHT * 0.1), run_time=0.6)
        self.au_mot("sa fréquence")
        self.construire_nuage(nu, self.reste_avant("y égale 0,3") - 0.2)
        self.au_mot("y égale 0,3")
        d3 = nu.droite(0.3, "0,3")
        eq = self.t("y = 0,3", 32, JAUNE_TITRE).next_to(d3[0].get_end(), UP, buff=0.12).align_to(d3[0], RIGHT)
        self.play(Create(d3[0]), FadeIn(d3[1], scale=1.5), FadeIn(eq, shift=LEFT * 0.1), run_time=0.8)
        self.insister(d3[1], 0.25)
        self.attendre_voix(marge=0.4)

        self.dire("03-lire-nuage")
        self.play(FadeOut(titre), run_time=0.3)
        t2 = self.titre_ecran("Lire le nuage")
        self.au_mot("se dispersent")
        self.play(*[p.animate.shift(UP * 0.12 * np.sign(FREQ[i] - 0.3)) for i, p in enumerate(nu.pts)],
                  run_time=0.35, rate_func=there_and_back)
        self.au_mot("autour de la droite")
        self.play(Indicate(d3[0], color=JAUNE_TITRE, scale_factor=1.0), run_time=0.6)
        self.au_mot("La plupart")
        bande = nu.bande()
        self.play(FadeIn(bande), run_time=0.4)
        self.au_mot("entre 0,2")
        d2 = nu.droite(0.2, "0,2", BANDE, tirets=True)
        self.play(Create(d2[0]), FadeIn(d2[1], scale=1.5), run_time=0.5)
        self.au_mot("0,4")
        d4 = nu.droite(0.4, "0,4", BANDE, tirets=True)
        self.play(Create(d4[0]), FadeIn(d4[1], scale=1.5), run_time=0.5)
        dehors = [p for i, p in enumerate(nu.pts) if not (0.2 - 1e-9 <= FREQ[i] <= 0.4 + 1e-9)]
        dedans = [p for i, p in enumerate(nu.pts) if 0.2 - 1e-9 <= FREQ[i] <= 0.4 + 1e-9]
        self.play(*[p.animate.set_color(BANDE) for p in dedans], *[p.animate.set_opacity(0.35) for p in dehors],
                  run_time=0.6)
        self.attendre_voix()
        self.nuage_complet = VGroup(nu, nu.titre_x, nu.titre_y, nu.lab1, nu.lab100, nu.tic1, nu.tic100,
                                    d2, d3, d4, nu.pts)
        self.lignes = (d2, d3, d4, bande, eq)

    # ── 04 : l'histogramme ──────────────────────────────────────────────────

    def ecran_histo(self):
        self.dire("04-histogramme")
        nu = self.nu
        d2, d3, d4, bande, eq = self.lignes
        self.clear()
        self.add_mascotte()
        self.add(self.nuage_complet)
        titre = self.titre_ecran("L'histogramme")
        self.play(*[p.animate.set_color(POINT).set_opacity(1) for p in nu.pts], run_time=0.3)
        self.play(self.nuage_complet.animate.scale(0.5).move_to(P(-4.1, 0.2)), run_time=0.8)
        hi = Histo(centre=P(2.25, 0.05), W=5.9, H=5.0)
        self.hi = hi
        self.play(FadeIn(hi), run_time=0.4)
        self.au_mot("on compte")
        briques = [hi.brique(i) for i in range(100)]
        self.play(LaggedStart(*[TransformFromCopy(nu.pts[i], briques[i], path_arc=-0.6) for i in range(100)],
                              lag_ratio=0.06), run_time=min(4.0, max(2.0, self.reste_avant("intervalle") + 0.5)))
        self.au_mot("intervalle")
        self.play(*[FadeIn(b) for b in hi.barres], *[FadeOut(b) for b in briques], run_time=0.6)
        self.au_mot("La barre la plus haute")
        self.play(*hi.actives([HAUTE]), run_time=0.4)
        self.insister(hi.barres[HAUTE], 0.25)
        self.au_mot("autour de 0,3")
        self.play(Create(hi.tics["0,3"]), FadeIn(hi.labels["0,3"], scale=1.6), run_time=0.5)
        self.insister(hi.labels["0,3"], 0.25)
        self.attendre_voix()
        self.titre_histo = titre

    # ── 05 : les deux graphiques disent la même chose ───────────────────────

    def ecran_sens(self):
        self.dire("05-sens")
        nu, hi = self.nu, self.hi
        d2, d3, d4, bande, eq = self.lignes
        self.play(FadeOut(self.titre_histo), run_time=0.3)
        self.titre_ecran("Deux graphiques, un même message")
        self.au_mot("Les deux graphiques")
        self.play(Indicate(self.nuage_complet, color=WHITE, scale_factor=1.05),
                  Indicate(hi, color=WHITE, scale_factor=1.05), run_time=0.8)
        fl = self.t("Les fréquences fluctuent,", 34)
        ce = suite(self.t("mais se concentrent autour de", 34), self.t("p", 42, JAUNE_TITRE), buff=0.18)
        tout = VGroup(fl, ce).arrange(RIGHT, buff=0.2)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        tout.move_to(P(-0.8, -2.65))
        self.au_mot("les fréquences fluctuent")
        self.play(FadeIn(fl, shift=UP * 0.1), run_time=0.4)
        self.play(*[p.animate.shift(UP * 0.1 * np.sign(FREQ[i] - 0.3)) for i, p in enumerate(nu.pts)],
                  run_time=0.3, rate_func=there_and_back)
        self.au_mot("mais se concentrent")
        b2 = Rectangle(width=d2[0].get_length(), height=d4[0].get_y() - d2[0].get_y(), stroke_width=0,
                       fill_color=BANDE, fill_opacity=0.18).move_to((d2[0].get_center() + d4[0].get_center()) / 2)
        self.play(FadeIn(b2), *hi.actives(CENTRALES, BANDE, 4), FadeIn(ce[0], shift=UP * 0.1), run_time=0.6)
        self.au_mot("autour de p")
        self.play(FadeIn(ce[1], scale=1.6), run_time=0.4)
        self.play(Indicate(d3[0], color=JAUNE_TITRE, scale_factor=1.0), *hi.actives([HAUTE], C_ACTIF, 5),
                  run_time=0.6)
        self.insister(ce[1], 0.25)
        self.attendre_voix()

    # ── 06 : le piège : lire un point isolé ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        nu = Nuage(o=P(-5.5, -2.4), W=8.0, H=4.3)
        d3 = nu.droite(0.3, "0,3")
        self.play(FadeIn(VGroup(nu, nu.titre_y)), FadeIn(nu.pts), Create(d3[0]), FadeIn(d3[1]), run_time=0.7)
        x0 = 3.05
        faux = VGroup(self.t("Lire un", 36, ROUGE_ERREUR), self.t("point isolé", 36, ROUGE_ERREUR)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(x0, 1.9), aligned_edge=LEFT)
        p = nu.pts[I_ISOLE]
        self.au_mot("un point isolé")
        self.play(FadeIn(faux, shift=UP * 0.1), *[q.animate.set_opacity(0.25) for q in nu.pts if q is not p],
                  p.animate.set_color(ISOLE).scale(2.2), run_time=0.6)
        self.au_mot("0,46")
        cer = Circle(radius=0.3, color=ISOLE, stroke_width=4).move_to(p)
        l46 = self.t("0,46", 36, ISOLE).next_to(cer, RIGHT, buff=0.12)
        self.play(Create(cer), FadeIn(l46, scale=1.6), run_time=0.5)
        self.insister(l46, 0.25)
        self.au_mot("il est rare")
        rare = VGroup(self.t("un échantillon :", 30, ISOLE), self.t("rare", 42, ORANGE_RETENUE)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(x0, 0.45), aligned_edge=LEFT)
        self.play(FadeIn(rare, shift=UP * 0.1), Wiggle(VGroup(p, cer)), run_time=0.6)
        self.au_mot("on regarde l'ensemble")
        barre = Line(faux.get_corner(DL) + LEFT * 0.1, faux.get_corner(UR) + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=6)
        self.play(*[q.animate.set_opacity(1) for q in nu.pts], Create(barre), faux.animate.set_opacity(0.45),
                  run_time=0.6)
        ok = VGroup(self.t("l'ensemble", 38, VERT_OK), self.t("du nuage", 38, VERT_OK)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(x0, -1.25), aligned_edge=LEFT)
        cad = SurroundingRectangle(nu.pts, color=VERT_OK, buff=0.15, stroke_width=4)
        self.play(Create(cad), FadeIn(ok, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 07 : défi : 92 sur 100 ──────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        hi = Histo(centre=P(-3.1, 0.15), W=6.2, H=4.8)
        self.au_mot("Sur l'histogramme")
        self.play(FadeIn(hi), LaggedStart(*[GrowFromEdge(b, DOWN) for b in hi.barres], lag_ratio=0.1),
                  run_time=0.9)
        x0 = 0.9
        self.au_mot("92 fréquences")
        l1 = suite(self.t("92", 56, JAUNE_TITRE), self.t("fréquences", 36), buff=0.2)
        l1.move_to(P(x0, 1.9), aligned_edge=LEFT)
        self.play(FadeIn(l1, scale=1.4), run_time=0.5)
        self.au_mot("sur 100")
        l2 = suite(self.t("sur", 36), self.t("100", 56, JAUNE_TITRE), buff=0.2)
        l2.next_to(l1, DOWN, buff=0.25).align_to(l1, LEFT)
        self.play(FadeIn(l2, scale=1.4), run_time=0.4)
        self.au_mot("entre 0,2")
        l3 = suite(self.t("entre", 36), self.t("0,2", 44, BANDE), self.t("et", 36), self.t("0,4", 44, BANDE),
                   buff=0.18)
        l3.next_to(l2, DOWN, buff=0.25).align_to(l1, LEFT)
        self.play(FadeIn(l3[:2], shift=UP * 0.1), Create(hi.tics["0,2"]), FadeIn(hi.labels["0,2"], scale=1.5),
                  run_time=0.4)
        self.au_mot("et 0,4")
        self.play(FadeIn(l3[2:], shift=UP * 0.1), Create(hi.tics["0,4"]), FadeIn(hi.labels["0,4"], scale=1.5),
                  *hi.actives(CENTRALES, C_ACTIF, 5), run_time=0.5)
        self.au_mot("Quelle proportion")
        q = suite(self.t("proportion", 40), self.t("=", 44), self.t("?", 60, ORANGE_RETENUE), buff=0.22)
        q.next_to(l3, DOWN, buff=0.5).align_to(l1, LEFT)
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.insister(q[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction : 92 % ─────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        # les 100 échantillons, un carré chacun : vert entre 0,2 et 0,4
        carres = VGroup(*[Square(side_length=0.38, fill_color=GREY_D, fill_opacity=1, stroke_color=GREY_B,
                                 stroke_width=1) for _ in range(100)]).arrange_in_grid(10, 10, buff=0.07)
        carres.move_to(P(-3.4, -0.3))
        dedans = [carres[i] for i in range(100) if 0.2 - 1e-9 <= FREQ[i] <= 0.4 + 1e-9]
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in carres], lag_ratio=0.01), run_time=0.8)
        x0 = 0.6
        self.au_mot("92 sur 100")
        k = [self.t("proportion", 40), self.t("=", 48), frac("92", "100", 46, WHITE, VERT_OK, JAUNE_TITRE)]
        l1 = suite(*k, buff=0.25).move_to(P(x0, 0.9), aligned_edge=LEFT)
        self.play(LaggedStart(*[c.animate.set_fill(BANDE) for c in dedans], lag_ratio=0.01),
                  FadeIn(l1, shift=UP * 0.1), run_time=1.0)
        self.au_mot("92 %")
        l2 = suite(self.t("=", 48), self.t("92 %", 64, VERT_OK), buff=0.25)
        l2.next_to(l1, DOWN, buff=0.45).align_to(k[1], LEFT)
        self.play(FadeIn(l2, scale=1.6), run_time=0.5)
        self.insister(l2[1])
        self.au_mot("des échantillons")
        l3 = self.t("des échantillons", 36).next_to(l2, DOWN, buff=0.3).align_to(l1, LEFT)
        ok = self.coche(taille=0.35).next_to(l2, RIGHT, buff=0.5)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(ok), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = suite(self.t("Nuage de points ou histogramme :", fs, JAUNE_TITRE), self.t("la fluctuation", fs),
                   buff=0.18)
        l2 = suite(self.t("Les fréquences se concentrent autour de", fs), self.t("p", fs + 8, JAUNE_TITRE),
                   buff=0.18)
        l3 = suite(self.t("On regarde l'ensemble,", fs, VERT_OK), self.t("pas un point isolé", fs, ROUGE_ERREUR),
                   buff=0.18)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 12.2:
            lignes.scale_to_fit_width(12.2)
        lignes.move_to(P(-0.4, 0.4))
        for mot, l in zip(["Nuage de points", "Les fréquences se concentrent", "On regarde l'ensemble"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
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
        self.ecran_nuage()
        self.ecran_histo()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaBernRepresenterSTMG(ProbaBernRepresenterBase):
    identite = "Maths STMG — EleveAI"
