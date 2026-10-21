# proba_conc_bienayme.py
# EleveAI — Maths Tle spé (micro concentration_inegalite_bienayme, notion
# concentration_echantillonnage) — série « Probabilités » : L'INÉGALITÉ DE
# BIENAYMÉ-TCHEBYCHEV, AVEC VOIX. Paysage 16:9, ceinture NOIRE.
# Short jumeau : proba_conc_bienayme_short.py (orange).
#
# Domaine : le CINÉMA. Métier : un exploitant de salle (aucun nom à l'écran).
# X = nombre d'entrées à la séance de 20 h, E(X) = 120, V(X) = 400.
# Fourchette 70 … 170 : |X − 120| ≥ 50, δ = 50 → borne 400/2500 = 0,16.
# Le piège : la borne n'est pas la probabilité, c'est un MAJORANT, souvent
# large (300 séances simulées : 8 dehors, 0,027 ; δ = 10 → borne 4 > 1).
#
# ⭐ Figures : la banque concentration.bank.ts n'a AUCUN canvas. On reprend la
#   carte `stat_graph` du coach (carte blanche, axe encre, points gris
#   ardoise, l'élément actif en ambre), en nuage de points empilés comme dans
#   proba_conc_moyenne.py : une séance = un point.
# ⛔ PAS D'ÉCART : l'axe n'a aucune graduation ; 70, 120, 170 s'écrivent
#   quand la voix les dit.
# ⭐ VRAI TIRAGE : 300 séances simulées (numpy, graine 974) avec un modèle
#   d'espérance 120 et de variance 400 (loi normale arrondie à l'entier) :
#   8 séances dehors, 8/300 ≈ 0,027.
#
# Écrans : 00 garde · 01 le cinéma · 02 l'écart |X − 120| ≥ 50 · 03 l'inégalité
# (0,16) · 04 300 séances simulées · 05 le piège (majorant ; δ = 10 → 4) ·
# 06 pourquoi l'utiliser (84 %) · 07 défi (80 à 160) · 07b correction (0,25)
# · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/terminale-proba-conc-bienayme.json (débit −6), calée au mot.
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conc_bienayme.py ProbaConcBienaymeTerminale -o eleveai-maths-terminale-proba-conc-bienayme --media_dir manim/scripts/terminale/media-conc_bienayme-1s
# Sortie : manim/sorties/terminale/maths/probabilites/32-conc-bienayme/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_moyenne import (  # noqa: E402
    BATON, BLEU_NB, BORD, CHEMIN, ENCRE, PROBA, CarteNuage, MotsCales, P, ProbaConcMoyenneBase, frac,
    puissance, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# ── les nombres, calculés ici ───────────────────────────────────────────────
MU, VX, D = 120, 400, 50
_r = np.random.default_rng(974)
SEANCES = [int(v) for v in np.round(_r.normal(MU, 20, 300))]
DEHORS = [v for v in SEANCES if abs(v - MU) >= D]
assert len(DEHORS) == 8 and f"{8 / 300:.3f}" == "0.027"
assert VX / D ** 2 == 0.16 and VX / 10 ** 2 == 4 and VX / 40 ** 2 == 0.25 and 1 - 0.16 == 0.84
assert VX / 100 ** 2 == 0.04

ROUGE_S = "#B91C1C"     # les fauteuils
ECRAN = "#E0F2FE"


# ── les dessins : la salle de cinéma, le pop-corn ───────────────────────────

def salle(rangs=4, places=9, s=1.0):
    """L'écran (lumineux) et les rangées de fauteuils rouges, vues de dos."""
    ecran = RoundedRectangle(width=4.2, height=1.3, corner_radius=0.08, fill_color=ECRAN, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(P(0, 1.3))
    halo = ecran.copy().set_fill(opacity=0).set_stroke("#7DD3FC", 10, opacity=0.35).scale(1.04)
    fauteuils = VGroup()
    for r in range(rangs):
        for k in range(places):
            f = RoundedRectangle(width=0.36, height=0.3, corner_radius=0.07, fill_color=ROUGE_S, fill_opacity=1,
                                 stroke_color="#7F1D1D", stroke_width=1.5)
            f.move_to(P((k - (places - 1) / 2) * 0.44 * (1 + 0.04 * r), -0.1 - 0.42 * r))
            fauteuils.add(f)
    return VGroup(halo, ecran, fauteuils).scale(s)


def spectateur(f, color="#FCD34D"):
    """Une tête posée sur un fauteuil."""
    return Circle(radius=f.width * 0.32, fill_color=color, fill_opacity=1, stroke_width=0).move_to(
        f.get_top() + UP * f.width * 0.12)


def popcorn(s=1.0):
    """Le cornet de pop-corn rayé rouge et blanc."""
    cornet = Polygon(P(-0.38, 0.4), P(0.38, 0.4), P(0.28, -0.45), P(-0.28, -0.45), fill_color=WHITE,
                     fill_opacity=1, stroke_color=WHITE, stroke_width=1)
    raies = VGroup(*[Polygon(P(-0.38 + 0.19 * k, 0.4), P(-0.38 + 0.19 * k + 0.095, 0.4),
                             P(-0.28 + 0.14 * k + 0.07, -0.45), P(-0.28 + 0.14 * k, -0.45),
                             fill_color="#DC2626", fill_opacity=1, stroke_width=0) for k in range(4)])
    grains = VGroup(*[Circle(radius=0.13, fill_color="#FEF3C7", fill_opacity=1, stroke_color="#F59E0B",
                             stroke_width=1.5).move_to(P(x, y))
                      for x, y in ((-0.25, 0.48), (0.0, 0.55), (0.25, 0.48), (-0.12, 0.66), (0.13, 0.67))])
    return VGroup(grains, cornet, raies).scale(s)


def valabs(dedans, fs=44, color=WHITE):
    """|…| en Text autour d'un mobject (ou d'un texte)."""
    d = dedans if isinstance(dedans, Mobject) else Text(dedans, font_size=fs, color=color)
    g = Text("|", font_size=fs, color=color)
    dr = g.copy()
    return suite(g, d, dr, buff=0.08)


def delta2(fs=44, color=WHITE):
    """δ² : l'exposant posé en haut à droite."""
    return puissance("δ", "2", fs, color)


class ProbaConcBienaymeBase(ProbaConcMoyenneBase):
    """Reprend les outils de l'épisode « moyenne » (titres, lignes, fin)."""

    fichier_marques = "proba_conc_bienayme_marques.json"
    nom_voix = "terminale-proba-conc-bienayme"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"

    def carte(self, x=None, y=0.1, larg=6.6, haut=3.6, titre=True):
        c = CarteNuage(larg=larg, haut=haut, titre="Entrées par séance" if titre else None, a=40, b=200, pas=2,
                       r=0.04)
        return c.move_to(P(self.X_C if x is None else x, y))

    def marque(self, c, v, texte, color=ENCRE, fs=26):
        """Une valeur sous l'axe : petit trait + nombre (quand la voix le dit)."""
        y = c.y_axe()
        tr = Line(P(c.x_de(v), y - 0.1), P(c.x_de(v), y + 0.1), color=color, stroke_width=3)
        t = Text(texte, font_size=fs, color=color, weight=BOLD).move_to(P(c.x_de(v), y - 0.32))
        return VGroup(tr, t)

    def formule(self, fs=44, gauche="X − μ", d="δ", haut=None, bas=None, cg=WHITE):
        """P(|X − μ| ≥ δ) ≤ V(X) / δ²  (ou avec des nombres)."""
        p = suite(Text("P(", font_size=fs, color=cg), valabs(gauche, fs, cg),
                  Text(f"≥ {d})", font_size=fs, color=cg), buff=0.1)
        h = haut if haut is not None else Text("V(X)", font_size=fs, color=BLEU_NB)
        b = bas if bas is not None else delta2(fs, BLEU_NB)
        return suite(p, Text("≤", font_size=fs), frac(h, b, fs), buff=0.22)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'inégalité de", 52, JAUNE_TITRE).to_edge(UP, buff=0.45)
        titre2 = self.t("Bienaymé-Tchebychev", 56, JAUNE_TITRE).next_to(titre, DOWN, buff=0.15)
        identite = self.t(self.identite, 28).next_to(titre2, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        c = self.carte(x=-0.6, y=-0.75, larg=5.6, haut=2.2, titre=False)
        pts = c.nuage(SEANCES, 0, color=BATON, r=0.03)
        self.add(ech, titre, titre2, c)    # la ceinture, visible dès la 1re image
        self.play(FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.6) for p in pts], lag_ratio=0.005), run_time=1.4)
        self.play(*[p.animate.set_color(ROUGE_ERREUR).scale(1.5) for p, v in zip(pts, SEANCES) if abs(v - MU) >= D],
                  run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 01 : le cinéma ──────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        sa = salle(s=1.0).move_to(P(-3.6, 0.7))
        self.titre_ecran("Le cinéma", FadeIn(sa, shift=UP * 0.2))
        self.au_mot("exploitant de cinéma")
        metier = self.t("exploitant de cinéma", 40, VERT_OK).next_to(sa, DOWN, buff=0.3)
        self.play(FadeIn(metier, shift=UP * 0.15), run_time=0.5)
        self.au_mot("remplit les salles")
        fauteuils = sa[2]
        tetes = VGroup(*[spectateur(f) for i, f in enumerate(fauteuils) if (i * 7) % 10 < 7])
        self.play(LaggedStart(*[FadeIn(h, scale=1.6) for h in tetes], lag_ratio=0.03), run_time=1.0)
        self.au_mot("pop-corn")
        pc = popcorn(1.1).next_to(metier, DOWN, buff=0.35).shift(LEFT * 1.4)
        self.play(FadeIn(pc, shift=UP * 0.3), run_time=0.5)
        fs = 44
        self.au_mot("X, le nombre")
        xm = suite(self.t("X :", fs, JAUNE_TITRE), self.t("le nombre d'entrées", 38), buff=0.25)
        self.caser(xm, 6.0).move_to(P(3.5, 1.9))
        self.play(FadeIn(xm, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("séance de 20")
        xm2 = self.t("à la séance de 20 h", 34).next_to(xm, DOWN, buff=0.15).align_to(xm[1], LEFT)
        self.play(FadeIn(xm2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("espérance 120")
        e = self.egal("E(X)", "120", fs, cd=VERT_OK).move_to(P(3.5, 0.55))
        self.play(FadeIn(e, scale=1.4), run_time=0.5)
        self.au_mot("variance 400")
        v = self.egal("V(X)", "400", fs, cd=BLEU_NB).move_to(P(3.5, -0.4))
        self.play(FadeIn(v, scale=1.4), run_time=0.5)
        self.au_mot("70 à 170")
        fo = suite(self.t("de", 40), self.t("70", 48, CHEMIN), self.t("à", 40), self.t("170", 48, CHEMIN),
                   self.t("spectateurs", 40), buff=0.2)
        self.caser(fo, 6.2).move_to(P(3.3, -1.35))
        self.play(FadeIn(fo, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Quel risque")
        q = self.t("Risque d'en sortir ?", 44, ORANGE_RETENUE).move_to(P(2.6, -2.45))
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.insister(q, 0.25)
        self.attendre_voix()

    # ── 02 : l'écart |X − 120| ≥ 50 ─────────────────────────────────────────

    def ecran_ecart(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-ecart")
        c = self.carte(x=-0.4, y=0.75, larg=9.6, haut=3.8)
        self.titre_ecran("Sortir de la fourchette", FadeIn(c))
        m70, m170 = self.marque(c, 70, "70", CHEMIN), self.marque(c, 170, "170", CHEMIN)
        self.play(FadeIn(m70), FadeIn(m170), run_time=0.4)
        self.au_mot("s'écarter de 120")
        m120 = self.marque(c, MU, "120", VERT_OK)
        lc = c.ligne_centre(MU, color=VERT_OK)
        self.play(FadeIn(m120, scale=1.4), Create(lc), run_time=0.5)
        self.au_mot("au moins 50")
        y = c.y_axe() + 0.55
        fd = c.fleche_ecart(MU, D, y, "", color=CHEMIN)
        cinq = VGroup(*[Text("50", font_size=28, color=CHEMIN, weight=BOLD).next_to(f, UP, buff=0.06) for f in fd])
        zones = VGroup(
            Rectangle(width=c.x_de(70) - c.x_de(40), height=1.5, stroke_width=0, fill_color=ROUGE_ERREUR,
                      fill_opacity=0.18).move_to(P((c.x_de(70) + c.x_de(40)) / 2, c.y_axe() + 0.75)),
            Rectangle(width=c.x_de(200) - c.x_de(170), height=1.5, stroke_width=0, fill_color=ROUGE_ERREUR,
                      fill_opacity=0.18).move_to(P((c.x_de(170) + c.x_de(200)) / 2, c.y_axe() + 0.75)))
        self.play(GrowFromCenter(fd), FadeIn(cinq, scale=1.4), FadeIn(zones), run_time=0.7)
        fs = 52
        self.au_mot("valeur absolue")
        va = valabs("X − 120", fs)
        l1 = suite(va, self.t("≥", fs), self.t("50", fs, CHEMIN), buff=0.25).move_to(P(-2.0, -2.2))
        self.play(FadeIn(va, shift=UP * 0.15), run_time=0.6)
        self.au_mot("supérieure ou égale à 50")
        self.play(FadeIn(l1[1:], shift=UP * 0.15), run_time=0.5)
        self.au_mot("L'écart delta")
        dd = self.egal("δ", "50", fs, cg=CHEMIN, cd=CHEMIN).next_to(l1, RIGHT, buff=1.0)
        self.play(FadeIn(dd, scale=1.4), run_time=0.5)
        self.insister(dd)
        self.attendre_voix()

    # ── 03 : l'inégalité ────────────────────────────────────────────────────

    def ecran_inegalite(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-inegalite")
        self.titre_ecran("L'inégalité de Bienaymé-Tchebychev", font_size=38)
        fs = 46
        f = self.formule(fs)
        self.caser(f, 11.0).move_to(P(-0.4, 1.6))
        p, le, fr_ = f
        self.au_mot("P de valeur")
        self.play(FadeIn(p[0], shift=UP * 0.1), FadeIn(p[1], shift=UP * 0.1), run_time=0.5)
        self.au_mot("supérieure ou égale à delta")
        self.play(FadeIn(p[2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("inférieure ou égale")
        self.play(FadeIn(le, scale=1.5), run_time=0.4)
        self.au_mot("V de X sur")
        self.play(FadeIn(fr_[0]), Create(fr_[1]), run_time=0.4)
        self.au_mot("delta au carré")
        self.play(FadeIn(fr_[2], scale=1.5), run_time=0.4)
        cad = SurroundingRectangle(f, color=VERT_OK, buff=0.2, stroke_width=3)
        self.play(Create(cad), run_time=0.4)
        fs2 = 50
        self.au_mot("400 sur 50")
        f1 = frac(self.t("400", fs2, BLEU_NB), puissance("50", "2", fs2, CHEMIN), fs2)
        l2 = suite(self.t("Ici :", 44), f1, buff=0.3).move_to(P(-3.6, -1.0))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("400 sur 2500")
        f2 = frac(self.t("400", fs2, BLEU_NB), self.t("2500", fs2, CHEMIN), fs2)
        l3 = suite(self.t("=", fs2), f2, buff=0.25).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.5)
        self.au_mot("soit 0,16")
        r = suite(self.t("=", fs2), self.t("0,16", fs2 + 10, VERT_OK), buff=0.25).next_to(l3, RIGHT, buff=0.3)
        self.play(FadeIn(r, scale=1.6), run_time=0.5)
        self.insister(r[1])
        self.au_mot("au plus 16 %")
        risque = suite(self.t("risque :", 44), self.t("au plus 16 %", 50, VERT_OK), buff=0.3).move_to(P(-1.2, -2.75))
        self.play(FadeIn(risque, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 04 : 300 séances simulées ───────────────────────────────────────────

    def ecran_simulation(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-simulation")
        c = self.carte(x=-0.4, y=0.5, larg=10.6, haut=4.4)
        m = VGroup(self.marque(c, 70, "70", CHEMIN), self.marque(c, MU, "120", VERT_OK),
                   self.marque(c, 170, "170", CHEMIN))
        self.titre_ecran("300 séances simulées", FadeIn(c), FadeIn(m))
        self.au_mot("Simulons 300")
        pts = c.nuage(SEANCES, 0, color=BATON, r=0.05)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 1.2) for p in pts], lag_ratio=0.006), run_time=3.0)
        self.au_mot("Seulement 8")
        rouges = VGroup(*[p for p, v in zip(pts, SEANCES) if abs(v - MU) >= D])
        self.play(*[p.animate.set_color(ROUGE_ERREUR).scale(1.6) for p in rouges], run_time=0.6)
        self.play(Indicate(rouges, color=ROUGE_ERREUR, scale_factor=1.3), run_time=0.6)
        fs = 48
        self.au_mot("8 sur 300")
        f = frac(self.t("8", fs, ROUGE_ERREUR), self.t("300", fs), fs)
        l1 = suite(f, buff=0.2).move_to(P(-5.7, -2.6))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("environ 0,027")
        r = suite(self.t("≈", fs), self.t("0,027", fs + 6, ROUGE_ERREUR), buff=0.2).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(r, scale=1.5), run_time=0.5)
        self.au_mot("Bien moins")
        cmp_ = suite(self.t("bien moins que", 36), self.t("0,16", fs, VERT_OK), buff=0.25)
        cmp_.next_to(r, RIGHT, buff=0.45)
        self.play(FadeIn(cmp_, shift=LEFT * 0.15), run_time=0.5)
        self.insister(cmp_[1])
        self.attendre_voix()

    # ── 05 : le piège : la borne n'est pas la probabilité ───────────────────

    def jauge(self, x=4.3, y0=-2.35, h=4.0):
        """La jauge des probabilités : un tube vertical, 0 en bas, 1 en haut
        (aucun nombre écrit d'avance)."""
        tube = RoundedRectangle(width=0.55, height=h, corner_radius=0.12, stroke_color=WHITE, stroke_width=3)
        tube.move_to(P(x, y0 + h / 2))
        self._j = (x, y0, h)
        return tube

    def niveau(self, p, color, larg=1.1):
        x, y0, h = self._j
        return Line(P(x - larg / 2, y0 + p * h), P(x + larg / 2, y0 + p * h), color=color, stroke_width=6)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        tube = self.jauge()
        self.titre_ecran("Le piège", Create(tube))
        x, y0, h = self._j
        fs = 50
        self.au_mot("dire que la probabilité")
        faux = suite(self.t("P", fs, ROUGE_ERREUR), self.t("=", fs, ROUGE_ERREUR), self.t("0,16", fs, ROUGE_ERREUR),
                     buff=0.2).move_to(P(-3.4, 1.7))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Non")
        croix = VGroup(Line(faux.get_corner(UL), faux.get_corner(DR)), Line(faux.get_corner(DL), faux.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 7)
        self.play(Create(croix), run_time=0.4)
        self.au_mot("c'est un majorant")
        bon = suite(self.t("P", fs), self.t("≤", fs, VERT_OK), self.t("0,16", fs, VERT_OK), buff=0.2)
        bon.next_to(faux, DOWN, buff=0.45)
        maj = self.t("un majorant", 40, VERT_OK).next_to(bon, RIGHT, buff=0.4)
        n16 = self.niveau(0.16, VERT_OK)
        t16 = Text("0,16", font_size=30, color=VERT_OK, weight=BOLD).next_to(n16, RIGHT, buff=0.12)
        self.play(FadeIn(bon, shift=UP * 0.15), FadeIn(maj), Create(n16), FadeIn(t16), run_time=0.6)
        self.au_mot("bien plus petite")
        vrai = Rectangle(width=0.45, height=0.027 * h, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
        vrai.move_to(P(x, y0 + 0.027 * h / 2))
        fl = Text("la vraie", font_size=30, color=ROUGE_ERREUR, weight=BOLD).next_to(P(x - 0.3, y0 + 0.06), LEFT,
                   buff=0.2)
        self.play(GrowFromEdge(vrai, DOWN), FadeIn(fl, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("écart de 10")
        d10 = self.egal("δ", "10", 46, cg=CHEMIN, cd=CHEMIN).move_to(P(-4.6, -0.75))
        self.play(FadeIn(d10, scale=1.3), run_time=0.4)
        self.au_mot("400 sur 100")
        f = frac(self.t("400", 46, BLEU_NB), self.t("100", 46, CHEMIN), 46)
        l2 = suite(self.t("borne :", 42), f, buff=0.25).next_to(d10, RIGHT, buff=0.6)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot(": 4.")
        r4 = suite(self.t("=", 46), self.t("4", 64, ORANGE_RETENUE), buff=0.2).next_to(l2, RIGHT, buff=0.2)
        haut = Arrow(P(x, y0 + 0.2), P(x, 2.95), color=ORANGE_RETENUE, buff=0, stroke_width=8)
        t4 = Text("4", font_size=40, color=ORANGE_RETENUE, weight=BOLD).next_to(haut.get_end(), RIGHT, buff=0.15)
        self.play(FadeIn(r4, scale=1.5), GrowArrow(haut), FadeIn(t4), run_time=0.7)
        self.au_mot("jamais 1")
        n1 = self.niveau(1.0, WHITE)
        t1 = Text("1", font_size=32, color=WHITE, weight=BOLD).next_to(n1, RIGHT, buff=0.12)
        self.play(Create(n1), FadeIn(t1, scale=1.5), Indicate(t1), run_time=0.6)
        self.au_mot("ne dit rien")
        rien = self.t("cette borne ne dit rien", 42, ORANGE_RETENUE).move_to(P(-2.4, -2.3))
        self.play(FadeIn(rien, shift=UP * 0.15), haut.animate.set_opacity(0.35), t4.animate.set_opacity(0.35),
                  run_time=0.6)
        self.attendre_voix()

    # ── 06 : pourquoi l'utiliser ────────────────────────────────────────────

    def ecran_utile(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-utile")
        c = self.carte(y=0.9, haut=3.2)
        pts = c.nuage(SEANCES, 0, color=BATON, r=0.04)
        self.titre_ecran("Pourquoi l'utiliser ?", FadeIn(c), FadeIn(pts))
        self.au_mot("sans connaître la loi")
        voile = c.carte.copy().set_fill(WHITE, 0.9).set_stroke(width=0)
        q = Text("?", font_size=110, color=PROBA, weight=BOLD).move_to(c.carte)
        loi = self.t("la loi de X : inconnue", 40).move_to(P(-3.4, 1.6))
        self.play(FadeIn(voile), FadeIn(q, scale=2), FadeIn(loi, shift=UP * 0.15), run_time=0.7)
        self.au_mot("l'espérance et la variance")
        ev = VGroup(self.egal("E(X)", "120", 44, cd=VERT_OK), self.egal("V(X)", "400", 44, cd=BLEU_NB))
        ev.arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(-3.6, 0.0))
        self.play(FadeIn(ev, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("suffisent")
        coches = VGroup(*[self.coche().next_to(e, LEFT, buff=0.3) for e in ev])
        self.play(Create(coches), run_time=0.5)
        self.au_mot("une garantie")
        sa = salle(rangs=3, places=9, s=0.62).move_to(P(2.7, -2.2))
        self.play(FadeOut(VGroup(voile, q)), FadeIn(sa, shift=UP * 0.2), run_time=0.6)
        self.au_mot("au moins 84 %")
        g = VGroup(self.t("au moins 84 %", 52, VERT_OK), self.t("des séances", 40), self.t("dans la fourchette", 40))
        g.arrange(DOWN, buff=0.12).move_to(P(-3.3, -2.15))
        fauteuils = sa[2]
        tetes = VGroup(*[spectateur(f, VERT_OK) for f in fauteuils])
        self.play(FadeIn(g[0], scale=1.4), LaggedStart(*[FadeIn(h, scale=1.5) for h in tetes], lag_ratio=0.02),
                  run_time=0.9)
        self.play(FadeIn(g[1:], shift=UP * 0.1), run_time=0.4)
        self.insister(g[0])
        self.attendre_voix()

    # ── 07 : défi : 80 à 160 spectateurs ────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        rappel = VGroup(self.egal("E(X)", "120", 40, cd=VERT_OK), self.egal("V(X)", "400", 40, cd=BLEU_NB))
        rappel.arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(-4.4, 1.8))
        c = self.carte(x=2.6, y=0.95, larg=7.4, haut=3.0)
        self.play(FadeIn(rappel), FadeIn(c), run_time=0.5)
        self.au_mot("80 à 160")
        m = VGroup(self.marque(c, 80, "80", ORANGE_RETENUE), self.marque(c, 160, "160", ORANGE_RETENUE))
        fo = suite(self.t("de", 42), self.t("80", 50, ORANGE_RETENUE), self.t("à", 42),
                   self.t("160", 50, ORANGE_RETENUE), self.t("spectateurs", 42), buff=0.2).move_to(P(-1.0, -1.05))
        zone = Rectangle(width=c.x_de(160) - c.x_de(80), height=1.6, stroke_width=0, fill_color=VERT_OK,
                         fill_opacity=0.18).move_to(P(c.x_de(120), c.y_axe() + 0.8))
        self.play(FadeIn(m, scale=1.4), FadeIn(zone), FadeIn(fo, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Quel majorant")
        q = self.t("Quel majorant pour le risque d'en sortir ?", 42, ORANGE_RETENUE)
        self.caser(q, 11.5).move_to(P(-0.6, -2.0))
        self.play(FadeIn(q, scale=1.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-1.0, -3.0))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        c = self.carte(x=3.6, y=1.2, larg=6.6, haut=3.0, titre=False)
        self.titre_ecran("Correction", FadeIn(c))
        fs = 50
        self.au_mot("L'écart delta")
        dd = self.egal("δ", "40", fs, cg=CHEMIN, cd=CHEMIN).move_to(P(-4.0, 1.4))
        fd = c.fleche_ecart(MU, 40, c.y_axe() + 0.6, "", color=CHEMIN)
        q40 = VGroup(*[Text("40", font_size=28, color=CHEMIN, weight=BOLD).next_to(f, UP, buff=0.06) for f in fd])
        self.play(FadeIn(dd, scale=1.4), GrowFromCenter(fd), FadeIn(q40), run_time=0.6)
        self.au_mot("400 sur 40")
        f1 = frac(self.t("400", fs, BLEU_NB), puissance("40", "2", fs, CHEMIN), fs)
        l1 = suite(f1, buff=0.2).move_to(P(-4.6, -0.9))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("400 sur 1600")
        f2 = frac(self.t("400", fs, BLEU_NB), self.t("1600", fs, CHEMIN), fs)
        l2 = suite(self.t("=", fs), f2, buff=0.25).next_to(l1, RIGHT, buff=0.3)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("soit 0,25")
        r = suite(self.t("=", fs), self.t("0,25", fs + 10, VERT_OK), buff=0.25).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(r, scale=1.6), run_time=0.5)
        cad = SurroundingRectangle(r[1], color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r[1], cad))
        self.au_mot("au plus 25 %")
        risque = suite(self.t("risque :", 44), self.t("au plus 25 %", 50, VERT_OK), buff=0.3).move_to(P(-1.2, -2.75))
        self.play(FadeIn(risque, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        fs = 44
        l1 = self.t("Repérer l'espérance μ et l'écart δ", fs)
        l2 = suite(self.t("Calculer", fs), frac(self.t("V(X)", fs - 4, BLEU_NB), delta2(fs - 4, BLEU_NB), fs - 4),
                   buff=0.3)
        l3 = VGroup(self.t("Un majorant,", fs, VERT_OK), self.t("pas la probabilité", fs, ORANGE_RETENUE))
        l3.arrange(RIGHT, buff=0.25)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, -0.1))
        for mot, l in zip(["Repérer", "Calculer", "Et retenir"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ecart()
        self.ecran_inegalite()
        self.ecran_simulation()
        self.ecran_piege()
        self.ecran_utile()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaConcBienaymeTerminale(ProbaConcBienaymeBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
