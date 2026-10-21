# proba_conc_inegalite.py
# EleveAI — Maths Tle spé (micro concentration_inegalite_concentration, notion
# concentration_echantillonnage) — série « Probabilités » : L'INÉGALITÉ DE
# CONCENTRATION, AVEC VOIX. Paysage 16:9, ceinture NOIRE.
# Short jumeau : proba_conc_inegalite_short.py (orange).
#
# Domaine : la SANTÉ. Métier : une pharmacienne responsable qualité qui
# contrôle la masse des comprimés (aucun nom de personne à l'écran).
# X = masse d'un comprimé (mg), E(X) = 500, V(X) = 25.
# P(|Mₙ − μ| ≥ δ) ≤ V / (n δ²) :
#   n = 50, δ = 2 → 25/200 = 0,125 ; risque ≤ 0,05 → 4n ≥ 500 → n ≥ 125 ;
#   piège (oublier le carré) : δ = 1 → n ≥ 500, quatre fois plus ;
#   défi : risque ≤ 0,01 → 4n ≥ 2500 → n ≥ 625.
#
# ⭐ Figures : la banque concentration.bank.ts n'a AUCUN canvas. On reprend la
#   carte `stat_graph` du coach en nuage de points (comme proba_conc_moyenne.py).
# ⛔ PAS D'ÉCART : l'axe n'a aucune graduation ; 498 et 502 s'écrivent quand
#   la voix les dit.
# ⭐ VRAIS TIRAGES : 40 lots de 125 comprimés (numpy, graine 974, masses
#   N(500 ; 5) arrondies au mg) : les 40 moyennes tombent entre 498 et 502.
#
# Écrans : 00 garde · 01 le contrôle qualité · 02 l'inégalité · 03 n = 50,
# δ = 2 (0,125) · 04 trouver n (125) · 05 40 vrais lots · 06 le piège (δ²) ·
# 07 défi (0,01) · 07b correction (625) · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/terminale-proba-conc-inegalite.json (débit −6), calée au mot.
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conc_inegalite.py ProbaConcInegaliteTerminale -o eleveai-maths-terminale-proba-conc-inegalite --media_dir manim/scripts/terminale/media-conc_inegalite-1s
# Sortie : manim/sorties/terminale/maths/probabilites/33-conc-inegalite/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_bienayme import delta2, valabs  # noqa: E402
from proba_conc_moyenne import (  # noqa: E402
    BATON, BLEU_NB, CHEMIN, ENCRE, PROBA, CarteNuage, P, ProbaConcMoyenneBase, frac, ind, puissance, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# ── les nombres, calculés ici ───────────────────────────────────────────────
MU, VX = 500, 25
assert VX / (50 * 2 ** 2) == 0.125
assert VX / (4 * 0.05) == 125 and VX / 0.05 == 500 and round(VX / 0.01) == 2500 and round(VX / (4 * 0.01)) == 625
_r = np.random.default_rng(974)
LOTS = [float(v) for v in _r.normal(MU, 5, (40, 125)).round(0).mean(axis=1)]
assert all(abs(m - MU) < 2 for m in LOTS)

GELULE = "#F8FAFC"
TRAIT = "#94A3B8"


def comprime(s=1.0, color=GELULE):
    """Un comprimé rond, blanc, sécable."""
    d = Circle(radius=0.2, fill_color=color, fill_opacity=1, stroke_color=TRAIT, stroke_width=2)
    l = Line(P(-0.13, 0), P(0.13, 0), color=TRAIT, stroke_width=2)
    return VGroup(d, l).scale(s)


def comprimes(n, cols, s=0.5, buff=0.05):
    return VGroup(*[comprime(s) for _ in range(n)]).arrange_in_grid(cols=cols, buff=buff)


def balance_labo(s=1.0):
    """La balance de précision du laboratoire : socle, plateau, cage de verre,
    écran (vide)."""
    socle = RoundedRectangle(width=2.8, height=0.55, corner_radius=0.1, fill_color="#E2E8F0", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(P(0, -0.9))
    ecran = RoundedRectangle(width=1.0, height=0.3, corner_radius=0.05, fill_color="#0F172A", fill_opacity=1,
                             stroke_width=0).move_to(P(0.6, -0.9))
    cage = Rectangle(width=2.4, height=1.6, fill_color="#BAE6FD", fill_opacity=0.12, stroke_color="#7DD3FC",
                     stroke_width=2).move_to(P(0, 0.2))
    plateau = Line(P(-0.6, -0.45), P(0.6, -0.45), color="#94A3B8", stroke_width=8)
    pied = Line(P(0, -0.62), P(0, -0.45), color="#94A3B8", stroke_width=6)
    return VGroup(cage, socle, ecran, pied, plateau).scale(s)


def croix_pharma(s=1.0):
    """La croix verte de la pharmacie."""
    b1 = Rectangle(width=0.36, height=1.0, fill_color="#22C55E", fill_opacity=1, stroke_width=0)
    b2 = Rectangle(width=1.0, height=0.36, fill_color="#22C55E", fill_opacity=1, stroke_width=0)
    return VGroup(b1, b2).scale(s)


class ProbaConcInegaliteBase(ProbaConcMoyenneBase):
    """Reprend les outils de l'épisode « moyenne » (titres, lignes, fin)."""

    fichier_marques = "proba_conc_inegalite_marques.json"
    nom_voix = "terminale-proba-conc-inegalite"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"

    def mn(self, fs=44, color=WHITE):
        return ind("M", "n", fs, color)

    def formule(self, fs=44):
        """P(|Mₙ − μ| ≥ δ) ≤ V / (n δ²)."""
        dedans = suite(self.mn(fs), Text("− μ", font_size=fs), buff=0.12)
        p = suite(Text("P(", font_size=fs), valabs(dedans, fs), Text("≥ δ)", font_size=fs), buff=0.1)
        bas = suite(Text("n", font_size=fs, color=BLEU_NB), delta2(fs, CHEMIN), buff=0.06)
        return suite(p, Text("≤", font_size=fs), frac(Text("V", font_size=fs, color=BLEU_NB), bas, fs), buff=0.22)

    def frac_nombres(self, haut, *bas, fs=48):
        """25 / (50 × 2²) : les morceaux du dénominateur donnés un à un."""
        return frac(self.t(haut, fs, BLEU_NB), suite(*bas, buff=0.1), fs)

    def carte_lots(self, x=None, y=0.3, larg=7.0, haut=3.6, titre=True):
        c = CarteNuage(larg=larg, haut=haut, titre="Moyenne d'un lot de 125 (mg)" if titre else None, a=496,
                       b=504, pas=0.2, r=0.07)
        return c.move_to(P(self.X_C if x is None else x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'inégalité de concentration", 54, JAUNE_TITRE).to_edge(UP, buff=0.5)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        c = self.carte_lots(x=-0.6, y=-0.55, larg=5.6, haut=2.4, titre=False)
        pts = c.nuage(LOTS, 0, color=PROBA, r=0.06)
        self.add(ech, titre, c)            # la ceinture, visible dès la 1re image
        self.play(FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.6) for p in pts], lag_ratio=0.03), run_time=1.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : le contrôle qualité ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        bal = balance_labo(1.15).move_to(P(-4.0, 0.9))
        cr = croix_pharma(0.7).move_to(P(-6.0, 2.4))
        self.titre_ecran("Le contrôle qualité", FadeIn(bal, shift=UP * 0.2), FadeIn(cr))
        self.au_mot("pharmacienne")
        metier = VGroup(self.t("pharmacienne,", 40, VERT_OK), self.t("responsable qualité", 40, VERT_OK))
        metier.arrange(DOWN, buff=0.1).move_to(P(-4.0, -1.0))
        self.play(FadeIn(metier, shift=UP * 0.15), run_time=0.6)
        self.au_mot("la bonne dose")
        un = comprime(1.6).move_to(bal[4].get_center() + UP * 0.32)
        self.play(FadeIn(un, shift=DOWN * 0.6), run_time=0.5)
        fs = 44
        self.au_mot("La masse X")
        xm = suite(self.t("X :", fs, JAUNE_TITRE), self.t("la masse d'un comprimé", 38), buff=0.25)
        self.caser(xm, 6.4).move_to(P(3.4, 1.9))
        self.play(FadeIn(xm, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("500 milligrammes")
        e = self.egal("E(X)", "500 mg", fs, cd=VERT_OK).move_to(P(3.4, 0.85))
        self.play(FadeIn(e, scale=1.4), run_time=0.5)
        self.au_mot("variance 25")
        v = self.egal("V(X)", "25", fs, cd=BLEU_NB).move_to(P(3.4, -0.15))
        self.play(FadeIn(v, scale=1.4), run_time=0.5)
        self.au_mot("pèse n comprimés")
        lot = comprimes(24, 8, s=0.55).move_to(P(-0.2, -2.45))
        nn = suite(self.t("n", fs, BLEU_NB), self.t("comprimés", 38), buff=0.2).move_to(P(3.4, -1.25))
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in lot], lag_ratio=0.03), FadeIn(nn, shift=UP * 0.15),
                  run_time=0.9)
        self.au_mot("leur moyenne")
        moy = suite(self.t("moyenne :", 38), self.mn(fs + 4, CHEMIN), buff=0.25).move_to(P(3.4, -2.25))
        self.play(FadeIn(moy, shift=UP * 0.15), run_time=0.5)
        self.insister(moy[1])
        self.attendre_voix()

    # ── 02 : l'inégalité ────────────────────────────────────────────────────

    def ecran_inegalite(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-inegalite")
        self.titre_ecran("L'inégalité de concentration")
        fs = 50
        f = self.formule(fs)
        self.caser(f, 11.5).move_to(P(-0.3, 1.4))
        p, le, fr_ = f
        self.au_mot("P de valeur")
        self.play(FadeIn(p[0], shift=UP * 0.1), FadeIn(p[1], shift=UP * 0.1), run_time=0.5)
        self.au_mot("supérieure ou égale à delta")
        self.play(FadeIn(p[2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("inférieure ou égale")
        self.play(FadeIn(le, scale=1.5), run_time=0.4)
        self.au_mot("V sur n")
        self.play(FadeIn(fr_[0]), Create(fr_[1]), FadeIn(fr_[2][0], scale=1.4), run_time=0.5)
        self.au_mot("delta au carré")
        self.play(FadeIn(fr_[2][1], scale=1.5), run_time=0.4)
        cad = SurroundingRectangle(f, color=VERT_OK, buff=0.22, stroke_width=3)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("Bienaymé-Tchebychev")
        bt = self.caser(self.t("Bienaymé-Tchebychev, appliquée à la moyenne", 40), 11.0).move_to(P(-0.6, -0.6))
        self.play(FadeIn(bt, shift=UP * 0.15), run_time=0.6)
        self.au_mot("dont la variance")
        vm = suite(self.t("V(", 50), self.mn(50, CHEMIN), self.t(")", 50), self.t("=", 50),
                   frac(self.t("V", 50, BLEU_NB), self.t("n", 50, BLEU_NB), 50), buff=0.1).move_to(P(-0.6, -2.2))
        self.play(FadeIn(vm, scale=1.3), run_time=0.6)
        self.insister(vm[4])
        self.attendre_voix()

    # ── 03 : n = 50, δ = 2 ──────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("Un premier contrôle")
        fs = 48
        self.au_mot("50 comprimés")
        lot = comprimes(50, 10, s=0.55, buff=0.07).move_to(P(3.7, 1.5))
        n50 = self.egal("n", "50", fs, cg=BLEU_NB, cd=BLEU_NB).move_to(P(-4.6, 1.9))
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in lot], lag_ratio=0.015), FadeIn(n50, shift=UP * 0.15),
                  run_time=0.9)
        self.au_mot("2 milligrammes près")
        d2 = self.egal("δ", "2 mg", fs, cg=CHEMIN, cd=CHEMIN).next_to(n50, RIGHT, buff=0.9)
        self.play(FadeIn(d2, scale=1.3), run_time=0.5)
        self.au_mot("25 sur 50")
        f1 = self.frac_nombres("25", self.t("50", fs, BLEU_NB), self.t("×", fs), puissance("2", "2", fs, CHEMIN), fs=fs)
        l1 = suite(f1, buff=0.2).move_to(P(-4.4, 0.0))
        self.play(FadeIn(f1[0]), Create(f1[1]), FadeIn(f1[2][0]), run_time=0.5)
        self.au_mot("fois 2 au carré")
        self.play(FadeIn(f1[2][1:], scale=1.4), run_time=0.4)
        self.au_mot("25 sur 200")
        f2 = frac(self.t("25", fs, BLEU_NB), self.t("200", fs), fs)
        l2 = suite(self.t("=", fs), f2, buff=0.25).next_to(l1, RIGHT, buff=0.3)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("soit 0,125")
        r = suite(self.t("=", fs), self.t("0,125", fs + 10, VERT_OK), buff=0.25).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(r, scale=1.6), run_time=0.5)
        self.insister(r[1])
        self.au_mot("au plus 12,5 %")
        risque = suite(self.t("risque :", 44), self.t("au plus 12,5 %", 52, ORANGE_RETENUE), buff=0.3)
        risque.move_to(P(-1.2, -2.2))
        self.play(FadeIn(risque, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 04 : trouver n ──────────────────────────────────────────────────────

    def ecran_trouver_n(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-trouver-n")
        self.titre_ecran("Trouver n")
        fs = 48
        trop = suite(self.t("12,5 % :", 44, ORANGE_RETENUE), self.t("trop !", 44, ROUGE_ERREUR), buff=0.2)
        trop.move_to(P(-4.3, 2.1))
        self.play(FadeIn(trop, shift=UP * 0.15), run_time=0.5)
        self.au_mot("au plus 0,05")
        voulu = suite(self.t("risque voulu :", 42), self.t("≤ 0,05", fs, VERT_OK), buff=0.25).move_to(P(2.6, 2.1))
        self.play(FadeIn(voulu, shift=UP * 0.15), run_time=0.5)
        self.au_mot("25 sur 4 n")
        f = frac(self.t("25", fs, BLEU_NB), self.t("4n", fs, BLEU_NB), fs)
        l1 = suite(f, self.t("≤", fs), self.t("0,05", fs, VERT_OK), buff=0.25).move_to(P(-3.6, 0.55))
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.5)
        self.au_mot("inférieur ou égal à 0,05")
        self.play(FadeIn(l1[1:], shift=UP * 0.15), run_time=0.4)
        self.au_mot("Donc 4 n")
        l2 = suite(self.t("4n", fs, BLEU_NB), self.t("≥", fs), buff=0.25).move_to(P(-3.6, -0.85))
        l2.align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("à 500")
        cinq = self.t("500", fs, CHEMIN).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(cinq, scale=1.4), run_time=0.4)
        self.au_mot("et n supérieur")
        l3 = suite(self.t("n", fs + 6, BLEU_NB), self.t("≥", fs + 6), buff=0.25).move_to(P(-3.6, -2.2))
        l3.align_to(l1, LEFT)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.au_mot("à 125")
        r = self.t("125", fs + 14, VERT_OK).next_to(l3, RIGHT, buff=0.25)
        self.play(FadeIn(r, scale=1.6), run_time=0.4)
        cad = SurroundingRectangle(VGroup(l3, r), color=VERT_OK, buff=0.15, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.au_mot("Elle pèsera")
        lot = comprimes(125, 25, s=0.4, buff=0.04)
        self.caser(lot, 6.2).move_to(P(2.9, -0.4))
        t125 = self.t("125 comprimés", 44, VERT_OK).next_to(lot, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in lot], lag_ratio=0.006), FadeIn(t125, shift=UP * 0.15),
                  run_time=1.0)
        self.attendre_voix()

    # ── 05 : 40 vrais lots de 125 comprimés ─────────────────────────────────

    def ecran_verif(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verif")
        c = self.carte_lots(x=-0.4, y=0.45, larg=10.4, haut=4.4)
        self.titre_ecran("40 vrais lots", FadeIn(c))
        self.au_mot("40 vrais lots")
        pts = c.nuage(LOTS, 0, color=PROBA, r=0.08)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 1.2) for p in pts], lag_ratio=0.04), run_time=1.8)
        self.au_mot("entre 498")
        y = c.y_axe()
        bande = Rectangle(width=c.x_de(502) - c.x_de(498), height=2.6, stroke_width=0, fill_color=VERT_OK,
                          fill_opacity=0.18).move_to(P(c.x_de(500), y + 1.3))
        bords = VGroup(*[DashedLine(P(c.x_de(v), y - 0.05), P(c.x_de(v), y + 2.6), color="#16A34A", stroke_width=3)
                         for v in (498, 502)])
        t498 = Text("498", font_size=30, color="#16A34A", weight=BOLD).move_to(P(c.x_de(498), y - 0.35))
        self.play(FadeIn(bande), Create(bords[0]), FadeIn(t498, scale=1.4), run_time=0.6)
        self.au_mot("et 502")
        t502 = Text("502", font_size=30, color="#16A34A", weight=BOLD).move_to(P(c.x_de(502), y - 0.35))
        self.play(Create(bords[1]), FadeIn(t502, scale=1.4), run_time=0.5)
        self.play(pts.animate.set_color("#16A34A"), run_time=0.5)
        self.au_mot("La garantie est tenue")
        ok = VGroup(self.coche(taille=0.3), self.t("La garantie est tenue.", 44, VERT_OK)).arrange(RIGHT, buff=0.3)
        ok.move_to(P(-1.0, -2.75))
        self.play(FadeIn(ok, shift=UP * 0.15), run_time=0.5)
        self.insister(ok, 0.25)
        self.attendre_voix()

    # ── 06 : le piège : oublier le carré de δ ───────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        fs = 48
        self.au_mot("oublier le carré")
        d2 = delta2(80, ROUGE_ERREUR).move_to(P(-5.2, 1.8))
        self.play(FadeIn(d2, scale=1.6), run_time=0.5)
        self.insister(d2[1])
        self.au_mot("Viser 1")
        v1 = suite(self.t("δ =", fs, CHEMIN), self.t("1 mg", fs, CHEMIN), self.t("au lieu de", 38),
                   self.t("2", fs, CHEMIN), buff=0.2).move_to(P(-1.2, 1.85))
        self.play(FadeIn(v1, shift=UP * 0.15), run_time=0.6)
        bloc = comprimes(125, 25, s=0.25, buff=0.025)
        b1 = bloc.copy().move_to(P(3.6, -0.15))
        self.play(FadeIn(b1, scale=1.1), run_time=0.4)
        self.au_mot("pas deux fois plus")
        faux = self.t("× 2 ?", 52, ROUGE_ERREUR).move_to(P(-5.3, 0.45))
        croix = VGroup(Line(faux.get_corner(UL), faux.get_corner(DR)), Line(faux.get_corner(DL), faux.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 6)
        self.play(FadeIn(faux, scale=1.3), run_time=0.4)
        self.play(Create(croix), run_time=0.3)
        self.au_mot("25 sur n")
        f = frac(self.t("25", fs, BLEU_NB), self.t("n", fs, BLEU_NB), fs)
        l1 = suite(f, self.t("≤", fs), self.t("0,05", fs, VERT_OK), buff=0.25).move_to(P(-1.7, 0.45))
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.4)
        self.au_mot("inférieur ou égal à 0,05")
        self.play(FadeIn(l1[1:], shift=UP * 0.15), run_time=0.4)
        self.au_mot("n supérieur")
        l2 = suite(self.t("n", fs + 6, BLEU_NB), self.t("≥", fs + 6), buff=0.25).move_to(P(-3.4, -1.3))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("à 500")
        r = self.t("500", fs + 14, VERT_OK).next_to(l2, RIGHT, buff=0.25)
        quatre = VGroup(*[bloc.copy() for _ in range(4)]).arrange_in_grid(rows=2, cols=2, buff=(0.15, 0.15))
        quatre.move_to(P(3.6, -0.4))
        self.play(FadeIn(r, scale=1.6), ReplacementTransform(b1, quatre[0]),
                  LaggedStart(*[FadeIn(q, shift=LEFT * 0.3) for q in quatre[1:]], lag_ratio=0.2), run_time=0.9)
        self.au_mot("Quatre fois plus")
        x4 = self.t("Quatre fois plus !", 54, ORANGE_RETENUE).move_to(P(-1.0, -2.75))
        self.play(FadeIn(x4, scale=1.3), run_time=0.5)
        self.insister(x4, 0.25)
        self.attendre_voix()

    # ── 07 : défi : risque d'au plus 0,01 ───────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        rappel = VGroup(self.egal("E(X)", "500 mg", 40, cd=VERT_OK), self.egal("V(X)", "25", 40, cd=BLEU_NB))
        rappel.arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(4.2, 2.0))
        bal = balance_labo(0.9).move_to(P(-4.4, 1.4))
        self.play(FadeIn(rappel), FadeIn(bal), run_time=0.5)
        fs = 50
        self.au_mot("2 milligrammes près")
        d2 = self.egal("δ", "2 mg", fs, cg=CHEMIN, cd=CHEMIN).move_to(P(0.2, 0.9))
        self.play(FadeIn(d2, scale=1.3), run_time=0.5)
        self.au_mot("au plus 0,01")
        rq = suite(self.t("risque", 44), self.t("≤ 0,01", fs, VERT_OK), buff=0.25).move_to(P(0.2, -0.2))
        self.play(FadeIn(rq, scale=1.3), run_time=0.5)
        self.au_mot("Combien de comprimés")
        q = self.egal("n", "?", 64, cg=ORANGE_RETENUE, cd=ORANGE_RETENUE).move_to(P(4.0, -0.2))
        self.play(FadeIn(q, scale=1.4), run_time=0.5)
        self.insister(q, 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-0.8, -2.6))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        fs = 50
        self.au_mot("25 sur 4 n")
        f = frac(self.t("25", fs, BLEU_NB), self.t("4n", fs, BLEU_NB), fs)
        l1 = suite(f, self.t("≤", fs), self.t("0,01", fs, VERT_OK), buff=0.25).move_to(P(-3.6, 1.5))
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.5)
        self.au_mot("inférieur ou égal à 0,01")
        self.play(FadeIn(l1[1:], shift=UP * 0.15), run_time=0.4)
        self.au_mot("Donc 4 n")
        l2 = suite(self.t("4n", fs, BLEU_NB), self.t("≥", fs), buff=0.25).move_to(P(-3.6, 0.1)).align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("à 2500")
        r2 = self.t("2500", fs, CHEMIN).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(r2, scale=1.4), run_time=0.4)
        self.au_mot("et n supérieur")
        l3 = suite(self.t("n", fs + 6, BLEU_NB), self.t("≥", fs + 6), buff=0.25).move_to(P(-3.6, -1.3))
        l3.align_to(l1, LEFT)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.au_mot("à 625")
        r = self.t("625", fs + 14, VERT_OK).next_to(l3, RIGHT, buff=0.25)
        self.play(FadeIn(r, scale=1.6), run_time=0.4)
        cad = SurroundingRectangle(VGroup(l3, r), color=VERT_OK, buff=0.15, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(l3, r, cad))
        self.au_mot("Elle pèsera")
        lot = comprimes(625, 50, s=0.2, buff=0.02)
        self.caser(lot, 6.4).move_to(P(3.0, 0.2))
        t = self.t("625 comprimés", 44, VERT_OK).next_to(lot, DOWN, buff=0.35)
        self.play(FadeIn(lot, scale=1.05), FadeIn(t, shift=UP * 0.15), run_time=0.8)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        fs = 44
        bas = suite(self.t("n", fs - 4, BLEU_NB), delta2(fs - 4, CHEMIN), buff=0.06)
        l1 = suite(self.t("La borne :", fs), frac(self.t("V", fs - 4, BLEU_NB), bas, fs - 4), buff=0.3)
        l2 = VGroup(self.t("Trouver n : borne ≤ risque,", fs), self.t("puis isoler n", fs))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        l3 = VGroup(self.t("2 fois plus précis :", fs, VERT_OK), self.t("4 fois plus de mesures", fs, ORANGE_RETENUE))
        l3.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, -0.1))
        for mot, l in zip(["L'inégalité de concentration", "Pour trouver n", "Deux fois plus"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_inegalite()
        self.ecran_calcul()
        self.ecran_trouver_n()
        self.ecran_verif()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaConcInegaliteTerminale(ProbaConcInegaliteBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
