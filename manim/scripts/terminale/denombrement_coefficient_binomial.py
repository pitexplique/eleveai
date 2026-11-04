# denombrement_coefficient_binomial.py
# EleveAI — Maths Tle spé — paysage « Les coefficients binomiaux » (16:9),
# ceinture VERTE. Micro du coach : denombrement_coefficient_binomial
# (lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank.ts : k parmi
# n = n!/(k!(n − k)!), valeurs 0, 1, 2 parmi n, symétrie, 2ⁿ parties).
# Short jumeau : denombrement_coefficient_binomial_short.py.
#
# Clé de voix → écran :
#   · 00-accroche   : le clavier de piano, 12 notes, 3 enfoncées = un accord ;
#   · 01-titre      : page de garde, l'échelle ENTIÈRE (verte) ;
#   · 02-metier     : Nadia, compositrice de musiques de films ;
#   · 03-ordre      : do-mi-sol = sol-mi-do, sans ordre, 3 parmi 12 ;
#   · 04-calcul     : cases 12 × 11 × 10 = 1 320, chaque accord compté 6 fois,
#                     1 320 ÷ 6 = 220 ;
#   · 05-formule    : n!/(k!(n − k)!), 12!/(3! × 9!) = 220, 0, 1, 2 parmi n ;
#   · 06/06b        : question-pause n° 1 (2 parmi 5 : A, 10, les 10 segments) ;
#   · 07-symetrie   : 3 jouées = 9 laissées, 3 parmi 12 = 9 parmi 12 ;
#   · 08/08b        : question-pause n° 2 (18 parmi 20 : B, 190) ;
#   · 09-parties    : jouée ou pas, 2¹² = 4 096, 2ⁿ parties = somme des k parmi n ;
#   · 10-piege      : la mélodie (ordre, 1 320) contre l'accord (220) ;
#   · 11/11b        : question-pause n° 3 (parties d'un ensemble à 5 : B, 32) ;
#   · 12-appris     : « Ce que tu as appris », titre en haut et centré ;
#   · 13-abonne     : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur : bleu = l'ordre compte, orange = sans ordre / combinaison,
# vert = résultat juste, rouge = piège. Outils (question-pause, au_mot, bords,
# fin) : la base de denombrement_arrangement_combinaison.py (même lot).
# ⛔ Pas de LaTeX : tout en Text. ⛔ Rien avant que la voix le dise (marques :
#   denombrement_coefficient_binomial_marques.json). Audit : AUDIT=1 BORDS=1.
#
# Voix : manim/voix/terminale-denombrement-coefficient-binomial.json (−6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/denombrement_coefficient_binomial.py DenombrementCoefficientBinomialTerminale -o eleveai-maths-terminale-denombrement-coefficient-binomial --media_dir manim/scripts/terminale/media-denombrement-coefficient-binomial
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-coefficient-binomial/

import math
import random
import sys
from itertools import combinations, permutations
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from denombrement_arrangement_combinaison import (  # noqa: E402
    BORD_X, ORDRE, SANS_ORDRE, XL, DenombrementArrangementCombinaisonBase, frac, lasso, parmi, personne, txt)
from proba_bin_defi import P, puissance  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

assert math.comb(12, 3) == 220 == 12 * 11 * 10 // 6 and 12 * 11 * 10 == 1320
assert math.comb(12, 9) == 220 and math.comb(5, 2) == 10 and math.comb(20, 18) == 190 == 20 * 19 // 2
assert 2 ** 12 == 4096 == sum(math.comb(12, k) for k in range(13)) and 2 ** 5 == 32

BLANCHES = [0, 2, 4, 5, 7, 9, 11]
NOIRES = {1: 0, 3: 1, 6: 3, 8: 4, 10: 5}  # demi-ton → touche blanche à sa gauche
NOMS = {0: "Do", 2: "Ré", 4: "Mi", 5: "Fa", 7: "Sol", 9: "La", 11: "Si"}
DO_MI_SOL = [0, 4, 7]


class Piano(VGroup):
    """Une octave : 7 touches blanches, 5 noires. self.touche[d] = la touche
    du demi-ton d (0 = do … 11 = si)."""

    def __init__(self, centre=ORIGIN, w=0.62, h=2.0):
        super().__init__()
        self.w, self.h = w, h
        self.touche = {}
        x0 = centre[0] - 3.5 * w
        for i, d in enumerate(BLANCHES):
            r = Rectangle(width=w, height=h, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_D, stroke_width=2)
            r.move_to(P(x0 + (i + 0.5) * w, centre[1]))
            self.touche[d] = r
            self.add(r)
        for d, i in NOIRES.items():
            r = Rectangle(width=w * 0.6, height=h * 0.62, fill_color="#111827", fill_opacity=1, stroke_color=GREY_D,
                          stroke_width=1.5)
            r.move_to(P(x0 + (i + 1) * w, centre[1] + h * 0.19))
            self.touche[d] = r
            self.add(r)

    def allumer(self, ds, couleur=SANS_ORDRE):
        return [self.touche[d].animate.set_fill(couleur, 1) for d in ds]

    def eteindre(self, ds):
        return [self.touche[d].animate.set_fill(WHITE if d in BLANCHES else "#111827", 1) for d in ds]

    def nom(self, d, fs=26, color=WHITE):
        return txt(NOMS[d], fs, color).next_to(self.touche[d], DOWN, buff=0.12)


def ondes(point, couleur=SANS_ORDRE, n=3):
    return VGroup(*[Arc(radius=0.15 + 0.12 * k, start_angle=PI / 2 - 0.6, angle=1.2, color=couleur,
                        stroke_width=3).move_arc_center_to(point) for k in range(n)])


def portee(largeur=3.6, ecart=0.18):
    return VGroup(*[Line(P(0, k * ecart), P(largeur, k * ecart), stroke_width=2, color=GREY_B) for k in range(5)])


def note(couleur, r=0.11):
    tete = Ellipse(width=2.6 * r, height=1.8 * r, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.35)
    queue = Line(tete.get_right() + LEFT * 0.03, tete.get_right() + LEFT * 0.03 + UP * 0.6, stroke_width=3,
                 color=couleur)
    return VGroup(tete, queue)


def clap(s=1.0):
    corps = Rectangle(width=1.0, height=0.65, fill_color="#1f2937", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2)
    haut = Rectangle(width=1.0, height=0.2, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    haut.next_to(corps, UP, buff=0.04)
    bandes = VGroup(*[Line(P(-0.4 + 0.25 * k, 0), P(-0.3 + 0.25 * k, 0.2), stroke_width=5, color=BLACK)
                      for k in range(4)]).move_to(haut)
    VGroup(haut, bandes).rotate(0.25, about_point=corps.get_corner(UL))
    return VGroup(corps, haut, bandes).scale(s)


def muet(m):
    """Écriture redite (pas un nombre prononcé à cet instant) : hors audit."""
    for x in m.get_family():
        if isinstance(x, Text):
            x._pas_audit = True
    return m


class DenombrementCoefficientBinomialBase(DenombrementArrangementCombinaisonBase):
    fichier_marques = "denombrement_coefficient_binomial_marques.json"
    nom_voix = "terminale-denombrement-coefficient-binomial"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    # ── 00 : le piano, 12 notes, un accord ─────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.add_mascotte()
        self.dire("00-accroche")
        pi = Piano(P(-2.6, 0.35), w=0.68, h=2.3)
        self.au_mot("piano")
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in pi], lag_ratio=0.05), run_time=0.6)
        l12 = self.t("12 notes différentes", 40, BLEU_CALCUL).move_to(P(-2.6, 2.75))
        self.au_mot("12 notes")
        ordre = sorted(pi.touche)
        self.play(FadeIn(l12, shift=DOWN * 0.1),
                  LaggedStart(*[Indicate(pi.touche[d], color=BLEU_CALCUL, scale_factor=1.0) for d in ordre],
                              lag_ratio=0.08), run_time=0.9)
        self.au_mot("octave")
        br = Brace(pi, DOWN, buff=0.1, color=GREY_B)
        oc = self.t("une octave", 30, GREY_A).next_to(br, DOWN, buff=0.08)
        self.play(GrowFromCenter(br), FadeIn(oc), run_time=0.4)
        self.au_mot("3 en même")
        on = VGroup(*[ondes(pi.touche[d].get_top() + UP * 0.1) for d in DO_MI_SOL])
        l3 = self.col(self.t("3 notes en même temps", 36, SANS_ORDRE), 1.2, 1.4)
        self.play(*pi.allumer(DO_MI_SOL), FadeIn(on, shift=UP * 0.15), FadeIn(l3, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("un accord")
        acc = self.col(self.t("= un accord", 44, SANS_ORDRE), 0.45, 1.4)
        self.play(FadeIn(acc, scale=1.3), run_time=0.4)
        self.insister(acc, 1.1)
        self.au_mot("Combien")
        q = self.t("Combien d'accords de 3 notes ?", 42, BLEU_CALCUL).move_to(P(-0.4, -2.85))
        self.play(FadeIn(q[:16], shift=UP * 0.1), FadeOut(oc), FadeOut(br), run_time=0.4)
        self.au_mot("3 notes")
        self.play(FadeIn(q[16:], scale=1.2), run_time=0.3)
        self.insister(q, 1.06)
        self.attendre_voix(marge=0.6)

    # ── 01 : page de garde ─────────────────────────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("01-titre")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Les coefficients binomiaux", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.au_mot("coefficients")
        self.play(Write(titre), FadeIn(ident), run_time=0.6)
        pi = Piano(P(-3.6, -0.55), w=0.42, h=1.4)
        self.play(FadeIn(pi), *pi.allumer(DO_MI_SOL), run_time=0.4)
        self.au_mot("Compter")
        sous = self.t("Compter les façons de choisir k éléments parmi n", 36).move_to(P(0, 1.6))
        self.play(FadeIn(sous, shift=UP * 0.1), run_time=0.45)
        self.au_pos(self._texte_voix.rfind("n"))
        bn = parmi("n", "k", 72).move_to(P(1.4, -0.55))
        lb = self.t("« k parmi n »", 32, SANS_ORDRE).next_to(bn, RIGHT, buff=0.4)
        self.play(FadeIn(bn, scale=1.4), FadeIn(lb), run_time=0.45)
        self.attendre_voix(marge=0.9)

    # ── 02 : Nadia, compositrice de musiques de films ──────────────────────

    def ecran_metier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-metier")
        nad = personne("#BE185D", peau="#c68642", longs=True, s=1.5).move_to(P(-4.9, 1.3))
        nom = self.t("Nadia", 48, SANS_ORDRE).move_to(P(0, 2.2)).align_to(P(-3.4, 0), LEFT)
        met = self.t("compositrice de musiques de films", 36).move_to(P(0, 1.45)).align_to(P(-3.4, 0), LEFT)
        self.au_mot("Nadia")
        self.play(FadeIn(nad, shift=UP * 0.2), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("compositrice")
        self.play(FadeIn(met, shift=RIGHT * 0.15), run_time=0.4)
        cl = clap(0.9).next_to(met, RIGHT, buff=0.35)
        self.au_mot("films")
        self.play(FadeIn(cl, scale=1.3), run_time=0.35)
        # la scène angoissante : un écran de cinéma, la nuit, un éclair
        ecran = RoundedRectangle(width=3.6, height=2.0, corner_radius=0.1, fill_color="#0f172a", fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=3).move_to(P(-4.3, -1.35))
        lune = Circle(radius=0.22, fill_color="#FEF9C3", fill_opacity=1, stroke_width=0).move_to(P(-5.6, -0.65))
        maison = VGroup(Rectangle(width=0.9, height=0.7, fill_color="#334155", fill_opacity=1, stroke_width=0),
                        Triangle(fill_color="#475569", fill_opacity=1, stroke_width=0).scale(0.55))
        maison[1].next_to(maison[0], UP, buff=0)
        maison.move_to(P(-3.6, -1.75))
        eclair = Polygon(P(-4.6, -0.5), P(-4.85, -1.05), P(-4.65, -1.05), P(-4.9, -1.6), P(-4.4, -0.95),
                         P(-4.6, -0.95), fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
        la = self.t("une scène angoissante", 30, GREY_A).next_to(ecran, DOWN, buff=0.12)
        self.au_mot("angoissante")
        self.play(FadeIn(ecran), FadeIn(lune), FadeIn(maison), FadeIn(la), run_time=0.45)
        self.play(FadeIn(eclair, scale=1.4), Flash(eclair, color=JAUNE_TITRE, line_length=0.2), run_time=0.4)
        pi = Piano(P(1.2, -0.9), w=0.5, h=1.6)
        etr = [0, 1, 6]
        le = self.t("un accord étrange", 32, VIOLET_ACCENT).next_to(pi, DOWN, buff=0.2)
        self.au_mot("accord étrange")
        self.play(FadeIn(pi), run_time=0.3)
        self.play(*pi.allumer(etr, VIOLET_ACCENT), FadeIn(le), run_time=0.4)
        self.au_mot("combien")
        q = self.t("Combien d'accords", 36, BLEU_CALCUL)
        self.col(q, 0.35, 3.4)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.au_mot("3 notes")
        q2 = self.col(self.t("de 3 notes ?", 36, BLEU_CALCUL), -0.2, 3.4)
        q2.align_to(q, LEFT)
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 03 : do-mi-sol = sol-mi-do : sans ordre ────────────────────────────

    def ecran_ordre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ordre")
        pi = Piano(P(-3.7, 1.15), w=0.6, h=2.0)
        l1 = self.ligne(self.t("Un accord :", 36, SANS_ORDRE), self.t("3 notes jouées ensemble", 36), y=2.6, xl=0.0)
        self.au_mot("accord")
        self.play(FadeIn(pi), FadeIn(l1[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("3 notes")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.1), run_time=0.35)
        noms = [pi.nom(d, 28, SANS_ORDRE) for d in DO_MI_SOL]
        r1 = [self.t(x, 40, SANS_ORDRE) for x in ("Do,", "mi,", "sol")]
        r2 = [self.t(x, 40, SANS_ORDRE) for x in ("sol,", "mi,", "do")]
        R1 = VGroup(*r1).arrange(RIGHT, buff=0.2).move_to(P(0, 1.5)).align_to(P(0.2, 0), LEFT)
        R2 = VGroup(*r2).arrange(RIGHT, buff=0.2).move_to(P(0, 0.75)).align_to(P(0.2, 0), LEFT)
        for k, (mot, d) in enumerate(zip(("Do", "mi", "sol"), DO_MI_SOL)):
            self.au_mot(mot)
            self.play(*pi.allumer([d]), FadeIn(noms[k], shift=UP * 0.1), FadeIn(r1[k], scale=1.3),
                      FadeIn(ondes(pi.touche[d].get_top() + UP * 0.1), run_time=0.3), run_time=0.3)
        for k, (mot, d) in enumerate(zip(("sol", "mi", "do"), DO_MI_SOL[::-1])):
            self.au_mot(mot, n=2 if mot != "do" else 1)
            self.play(Indicate(pi.touche[d], color=JAUNE_TITRE, scale_factor=1.0), Indicate(noms[2 - k]),
                      FadeIn(r2[k], scale=1.3), run_time=0.3)
        self.au_mot("même accord")
        acc = VGroup(self.t("le même", 32, SANS_ORDRE), self.t("accord", 32, SANS_ORDRE)).arrange(DOWN, buff=0.08)
        br = Brace(VGroup(R1, R2), RIGHT, buff=0.2, color=SANS_ORDRE)
        acc.next_to(br, RIGHT, buff=0.15)
        self.play(GrowFromCenter(br), FadeIn(acc, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("L'ordre ne compte pas")
        o1 = self.t("L'ordre ne compte pas,", 38, SANS_ORDRE).move_to(P(0, -0.8)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(o1, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("pas de répétition")
        o2 = self.t("pas de répétition.", 38, SANS_ORDRE).next_to(o1, RIGHT, buff=0.25)
        rep = VGroup(self.t("Do, do, mi", 30, GREY_A), self.t("impossible", 28, ROUGE_ERREUR))
        rep.arrange(RIGHT, buff=0.2).next_to(o2, DOWN, buff=0.15)
        barre = Line(rep[0].get_left(), rep[0].get_right(), color=ROUGE_ERREUR, stroke_width=4)
        self.play(FadeIn(o2, shift=RIGHT * 0.1), FadeIn(rep), Create(barre), run_time=0.45)
        self.au_mot("combinaison")
        c1 = self.t("C'est une combinaison :", 40).move_to(P(0, -2.25)).align_to(P(-6.3, 0), LEFT)
        bn = parmi(12, 3, 52).next_to(c1, RIGHT, buff=0.35)
        self.play(FadeIn(c1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("3 parmi")
        self.play(FadeIn(bn[0]), FadeIn(bn[2]), FadeIn(bn[1][1], scale=1.3), run_time=0.3)
        self.au_mot("12")
        self.play(FadeIn(bn[1][0], scale=1.3), run_time=0.3)
        self.insister(bn, 1.2)
        self.attendre_voix(marge=0.6)

    # ── 04 : avec l'ordre 1 320, puis ÷ 6 : 220 ────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-calcul")
        h = self.t("D'abord, avec l'ordre :", 40, ORDRE).move_to(P(0, 2.8)).align_to(P(-6.3, 0), LEFT)
        self.au_mot("avec")
        self.play(FadeIn(h, shift=RIGHT * 0.1), run_time=0.4)
        cases = VGroup(*[Square(1.1, stroke_color=ORDRE, stroke_width=4) for _ in range(3)])
        cases.arrange(RIGHT, buff=0.65).move_to(P(-4.0, 1.4))
        tits = VGroup(*[self.t(x, 24, GREY_A, audit=False).next_to(c, UP, buff=0.1)
                        for x, c in zip(("1re note", "2e note", "3e note"), cases)])
        self.play(Create(cases), FadeIn(tits), run_time=0.4)
        vals = ["12", "11", "10"]
        fois = [self.t("×", 40, ORDRE).move_to((cases[k].get_right() + cases[k + 1].get_left()) / 2) for k in range(2)]
        for k, (ctx, nb) in enumerate((("12 fois", "12"), ("11 fois", "11"), ("11 fois", "10"))):
            self.au_nb(ctx, nb)
            v = self.t(vals[k], 46, ORDRE).move_to(cases[k])
            anims = [FadeIn(v, scale=1.4)] + ([FadeIn(fois[k - 1])] if k else [])
            self.play(*anims, run_time=0.25)
        self.au_mot("1 320")
        r = self.t("= 1 320", 46, ORDRE, audit=False).next_to(cases, RIGHT, buff=0.35)
        self.play(FadeIn(r, scale=1.3), run_time=0.35)
        # les 6 ordres d'un même accord
        noms = {0: "do", 4: "mi", 7: "sol"}
        rows = VGroup(*[self.t(" ".join(noms[d] for d in p), 28, ORDRE, audit=False) for p in permutations(DO_MI_SOL)])
        rows.arrange_in_grid(rows=3, cols=2, buff=(0.5, 0.22)).move_to(P(-3.6, -1.2))
        self.au_mot("chaque accord")
        self.play(LaggedStart(*[FadeIn(x, shift=RIGHT * 0.1) for x in rows], lag_ratio=0.12), run_time=0.7)
        las = lasso(rows, buff=0.12)
        self.au_mot("3 factorielle")
        c3 = self.t("compté 3! fois", 34, SANS_ORDRE).move_to(P(0, -0.7)).align_to(P(-0.6, 0), LEFT)
        self.play(Create(las), FadeIn(c3, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("6 fois")
        c6 = self.t("= 6 fois", 34, SANS_ORDRE).next_to(c3, RIGHT, buff=0.2)
        self.play(FadeIn(c6, scale=1.3), run_time=0.3)
        e = [self.t("1 320", 42, audit=False), self.t("÷ 6", 42), self.t("= 220 accords", 42, VERT_OK)]
        VGroup(*e).arrange(RIGHT, buff=0.2).move_to(P(0, -1.6)).align_to(P(-1.2, 0), LEFT)
        self.au_mot("1 320", n=2)
        self.play(FadeIn(e[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("par", "6")
        self.play(FadeIn(e[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("220")
        self.play(FadeIn(e[2], scale=1.3), run_time=0.35)
        self.insister(e[2], 1.12)
        self.attendre_voix(marge=0.6)

    # ── 05 : la formule, 12!/(3! × 9!) = 220, les trois valeurs ────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-formule")
        bn = parmi("n", "k", 52)
        eg = self.t("=", 48)
        den = VGroup(self.t("k!", 46), self.t("× (n − k)!", 46)).arrange(RIGHT, buff=0.15)
        fr = frac(self.t("n!", 46), den, 46)
        VGroup(bn, eg, fr).arrange(RIGHT, buff=0.3).move_to(P(-2.6, 2.1))
        self.au_mot("k parmi")
        self.play(FadeIn(bn, scale=1.3), run_time=0.35)
        self.au_mot("n factorielle")
        self.play(FadeIn(eg), FadeIn(fr[0], scale=1.2), run_time=0.3)
        self.au_mot("k factorielle")
        self.play(Create(fr[1]), FadeIn(den[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois n moins")
        self.play(FadeIn(den[1], shift=UP * 0.1), run_time=0.3)
        cad = SurroundingRectangle(VGroup(bn, eg, fr), color=SANS_ORDRE, buff=0.2, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        ici = self.t("Ici :", 38, JAUNE_TITRE)
        den2 = VGroup(self.t("3!", 42), self.t("× 9!", 42)).arrange(RIGHT, buff=0.15)
        f2 = frac(self.t("12!", 42), den2, 42)
        r2 = VGroup(self.t("=", 44), parmi(12, 3, 44), self.t("= 220", 46, VERT_OK)).arrange(RIGHT, buff=0.25)
        muet(r2[1])
        VGroup(ici, f2, r2).arrange(RIGHT, buff=0.3).move_to(P(0, 0.1)).align_to(P(-6.3, 0), LEFT)
        self.au_mot("Ici")
        self.play(FadeIn(ici), run_time=0.25)
        self.au_mot("12 factorielle")
        self.play(FadeIn(f2[0], scale=1.2), run_time=0.3)
        self.au_mot("3 factorielle")
        self.play(Create(f2[1]), FadeIn(den2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("9 factorielle")
        self.play(FadeIn(den2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("220")
        self.play(FadeIn(r2, scale=1.2), run_time=0.35)
        self.au_mot("Trois valeurs")
        tv = self.t("Trois valeurs à connaître :", 36, JAUNE_TITRE).move_to(P(0, -1.3)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(tv, shift=RIGHT * 0.1), run_time=0.35)
        specs = [("0 parmi", 0, "1", "0 parmi n égale 1"), ("1 parmi", 1, "n", "1 parmi n égale n"),
                 ("2 parmi", 2, None, "")]
        xs = (-5.4, -2.8, 0.0)
        for (mot, k, val, mot_val), x in zip(specs, xs):
            b = parmi("n", k, 42)
            self.au_mot(mot)
            b.move_to(P(x, -2.5))
            self.play(FadeIn(b[0]), FadeIn(b[2]), FadeIn(b[1][1], scale=1.3), run_time=0.25)
            self.play(FadeIn(b[1][0]), run_time=0.15)
            if val:
                r = VGroup(self.t("=", 40), self.t(val, 42, VERT_OK)).arrange(RIGHT, buff=0.2).next_to(b, RIGHT,
                                                                                                    buff=0.2)
                self.au_pos(self._texte_voix.find(mot_val) + len(mot_val) - 1)
                self.play(FadeIn(r, scale=1.3), run_time=0.25)
            else:
                f = frac(self.t("n × (n − 1)", 38, VERT_OK), self.t("2", 38, VERT_OK), 38, VERT_OK)
                r = VGroup(self.t("=", 40), f).arrange(RIGHT, buff=0.2).next_to(b, RIGHT, buff=0.2)
                self.au_nb("2 parmi", "1")
                self.play(FadeIn(r[0]), FadeIn(f[0], shift=UP * 0.1), run_time=0.25)
                self.au_mot("sur 2")
                self.au_pos(self._texte_voix.rfind("2"))
                self.play(Create(f[1]), FadeIn(f[2], scale=1.3), run_time=0.25)
        self.attendre_voix(marge=0.6)

    # ── 06 : question-pause n° 1 : 2 parmi 5 = 10 ──────────────────────────

    def ligne_parmi(self, n, k, fs=34):
        """« Combien vaut (n k) ? » : une ligne de question."""
        return VGroup(self.t("Combien vaut", fs), parmi(n, k, fs), self.t("?", fs)).arrange(RIGHT, buff=0.18)

    def montrer_parmi(self, b, mot_k, mot_n, autres=()):
        self.au_mot(mot_k)
        self.play(FadeIn(b[0]), FadeIn(b[2]), FadeIn(b[1][1], scale=1.3), *autres, run_time=0.25)
        self.au_mot(mot_n)
        self.play(FadeIn(b[1][0], scale=1.3), run_time=0.2)

    def ecran_question1(self):
        c0 = P(-3.4, -0.1)
        pts = [c0 + 1.7 * P(math.cos(PI / 2 + k * TAU / 5), math.sin(PI / 2 + k * TAU / 5)) for k in range(5)]
        dots = VGroup(*[Dot(p, radius=0.16, color=SANS_ORDRE) for p in pts])

        def dessin(q):
            self.au_mot("Combien")
            self.play(FadeIn(q[0][0], shift=UP * 0.1), run_time=0.3)
            self.montrer_parmi(q[0][1], "2 parmi", "5", [FadeIn(q[0][2])])
            self.play(LaggedStart(*[GrowFromCenter(d) for d in dots], lag_ratio=0.1), run_time=0.4)

        q, cartes, pause, rebours = self.question("06-question", [self.ligne_parmi(5, 2)], ["10", "20", "25"], 0,
                                                  dessin)
        self.dire("06b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        f = frac(self.t("5 × 4", 40), self.t("2", 40))
        r = VGroup(f, self.t("= 10", 44, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(-3.4, 2.45))
        self.au_mot("5 fois")
        self.play(FadeIn(f[0][0], shift=UP * 0.1), run_time=0.2)
        self.au_nb("5 fois", "4")
        self.play(FadeIn(f[0][1:], shift=UP * 0.1), run_time=0.2)
        self.au_mot("sur 2")
        self.au_pos(self._texte_voix.find("2", self._texte_voix.find("sur 2")))
        self.play(Create(f[1]), FadeIn(f[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("10")
        segs = VGroup(*[Line(pts[i], pts[j], color=SANS_ORDRE, stroke_width=4) for i, j in combinations(range(5), 2)])
        self.add(segs)
        self.bring_to_front(dots)
        self.play(FadeIn(r[1], scale=1.4), LaggedStart(*[Create(s) for s in segs], lag_ratio=0.1), run_time=0.7)
        self.au_mot("20")
        e1 = self.t("20 : en comptant l'ordre", 32, ROUGE_ERREUR).move_to(P(-3.4, -2.3))
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("25")
        e2a = self.t("25 :", 32, ROUGE_ERREUR)
        e2 = VGroup(e2a, puissance("5", "2", 32, ROUGE_ERREUR)).arrange(RIGHT, buff=0.15).move_to(P(-3.4, -2.85))
        self.play(FadeIn(e2a, shift=UP * 0.1), run_time=0.25)
        self.au_mot("5 puissance")
        self.play(FadeIn(e2[1][0]), run_time=0.2)
        self.au_pos(self._texte_voix.rfind("2"))
        self.play(FadeIn(e2[1][1], scale=1.4), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 07 : la symétrie : 3 jouées = 9 laissées ───────────────────────────

    def ecran_symetrie(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-symetrie")
        tit = self.t("Une astuce", 44, JAUNE_TITRE).move_to(P(0, 3.0)).align_to(P(-6.3, 0), LEFT)
        self.au_mot("astuce")
        self.play(Write(tit), run_time=0.4)
        pi = Piano(P(-3.4, 1.0), w=0.62, h=2.0)
        self.play(FadeIn(pi), run_time=0.3)
        self.au_mot("3 notes")
        l3 = self.col(self.t("3 notes qu'on joue", 36, SANS_ORDRE), 1.6, 0.6)
        self.play(*pi.allumer(DO_MI_SOL), FadeIn(l3, shift=RIGHT * 0.1), run_time=0.35)
        self.au_nb("choisir les", "9")
        autres = [d for d in range(12) if d not in DO_MI_SOL]
        l9 = self.col(self.t("9 qu'on ne joue pas", 36, BLEU_CALCUL), 0.85, 0.6)
        self.play(*[pi.touche[d].animate.set_fill("#BAE6FD" if d in BLANCHES else "#1D4ED8", 1) for d in autres],
                  FadeIn(l9, shift=RIGHT * 0.1), run_time=0.4)
        b1, b2 = parmi(12, 3, 48), parmi(12, 9, 48, BLEU_CALCUL)
        eg, r = self.t("=", 48), self.t("= 220", 50, VERT_OK)
        VGroup(b1, eg, b2, r).arrange(RIGHT, buff=0.3).move_to(P(-2.6, -1.25))
        self.montrer_parmi(b1, "3 parmi", "12 égale")
        self.au_mot("égale")
        self.play(FadeIn(eg), run_time=0.15)
        self.montrer_parmi(b2, "9 parmi", "12 :")
        self.au_mot("220")
        self.play(FadeIn(r, scale=1.3), run_time=0.3)
        self.au_mot("symétrie")
        sy = self.t("La symétrie :", 38, JAUNE_TITRE)
        g1, g2 = parmi("n", "k", 36), parmi("n", "n − k", 36, BLEU_CALCUL)
        eg2 = self.t("=", 40)
        VGroup(sy, g1, eg2, g2).arrange(RIGHT, buff=0.3).move_to(P(0, -2.6)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(sy, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("k parmi")
        self.play(FadeIn(g1, scale=1.2), run_time=0.25)
        self.au_mot("égale n moins")
        self.play(FadeIn(eg2), FadeIn(g2, scale=1.2), run_time=0.3)
        cad = SurroundingRectangle(VGroup(g1, eg2, g2), color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : 18 parmi 20 = 190 ───────────────────────

    def ecran_question2(self):
        ronds = VGroup(*[Circle(radius=0.19, fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                         for _ in range(20)]).arrange_in_grid(rows=2, cols=10, buff=0.18).move_to(P(-3.4, 0.4))

        def dessin(q):
            self.au_mot("Combien")
            self.play(FadeIn(q[0][0], shift=UP * 0.1), FadeIn(ronds), run_time=0.3)
            self.montrer_parmi(q[0][1], "18 parmi", "20", [FadeIn(q[0][2])])
            self.play(*[c.animate.set_fill(SANS_ORDRE) for c in ronds[:18]], run_time=0.35)

        q, cartes, pause, rebours = self.question("08-question", [self.ligne_parmi(20, 18)], ["380", "190", "20"], 1,
                                                  dessin)
        self.dire("08b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("symétrie")
        l2 = self.t("garder les orange = choisir les bleus", 28, BLEU_CALCUL, larg=4.4).next_to(ronds, DOWN, buff=0.3)
        self.play(*[c.animate.set_fill(BLEU_CALCUL) for c in ronds[18:]], FadeIn(l2), run_time=0.35)
        b1, b2 = parmi(20, 18, 44), parmi(20, 2, 44, BLEU_CALCUL)
        eg = self.t("=", 44)
        VGroup(b1, eg, b2).arrange(RIGHT, buff=0.3).move_to(P(-3.4, -1.65))
        self.montrer_parmi(b1, "18 parmi", "20 égale")
        self.play(FadeIn(eg), run_time=0.12)
        self.montrer_parmi(b2, "2 parmi", "20 :")
        f = frac(self.t("20 × 19", 38), self.t("2", 38))
        r = VGroup(self.t("=", 40), f, self.t("= 190", 44, VERT_OK)).arrange(RIGHT, buff=0.2)
        r.next_to(b2, RIGHT, buff=0.3)
        self.au_mot("20 fois")
        self.play(FadeIn(r[0]), FadeIn(f[0][:2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("19")
        self.play(FadeIn(f[0][2:], shift=UP * 0.1), run_time=0.2)
        self.au_nb("19, sur", "2")
        self.play(Create(f[1]), FadeIn(f[2]), run_time=0.2)
        self.au_mot("190")
        self.play(FadeIn(r[2], scale=1.3), run_time=0.3)
        pb = VGroup(self.t("Pas besoin de calculer", 32, VERT_OK), self.t("20!", 34, VERT_OK))
        pb.arrange(RIGHT, buff=0.2).move_to(P(-3.4, -2.75))
        self.au_mot("Pas besoin")
        self.play(FadeIn(pb[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 factorielle")
        self.play(FadeIn(pb[1], scale=1.3), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 09 : jouée ou pas : 2¹² = 4 096 parties ────────────────────────────

    def ecran_parties(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-parties")
        pi = Piano(P(-3.6, 1.5), w=0.6, h=1.9)
        t1 = self.col(self.t("Un ensemble de notes", 34), 2.3, 0.4)
        t2 = self.col(self.t("de n'importe quelle taille,", 34), 1.75, 0.4)
        self.au_mot("ensemble")
        self.play(FadeIn(pi), FadeIn(t1, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("n'importe")
        self.play(FadeIn(t2, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("0 à")
        t3 = self.col(self.t("de 0 à 12 notes", 34, SANS_ORDRE), 1.2, 0.4)
        self.play(FadeIn(t3[:4], shift=RIGHT * 0.1), run_time=0.2)
        self.au_mot("12 notes")
        self.play(FadeIn(t3[4:], shift=RIGHT * 0.1), run_time=0.2)
        self.au_mot("chaque note")
        rng = random.Random(4)
        allumees = []
        for _ in range(3):
            ds = [d for d in range(12) if rng.random() < 0.4]
            self.play(*pi.eteindre(allumees), *pi.allumer(ds), run_time=0.2)
            allumees = ds
            self.wait(0.05)
        self.au_mot("jouée ou pas")
        jo = self.t("jouée ou pas : 2 choix", 34, SANS_ORDRE)
        self.col(jo, 0.55, 0.4)
        self.play(FadeIn(jo[:11], shift=RIGHT * 0.1), run_time=0.25)
        self.au_mot("2 choix")
        deux = [self.t("2", 40) for _ in range(5)]
        row = VGroup(deux[0], self.t("×", 40), deux[1], self.t("×", 40), deux[2], self.t("× … ×", 40), deux[3])
        row.arrange(RIGHT, buff=0.15).move_to(P(0, -0.45)).align_to(P(-6.3, 0), LEFT)
        br = Brace(row, DOWN, buff=0.1, color=GREY_B)
        bl = muet(self.t("12 fois", 28, GREY_A)).next_to(br, DOWN, buff=0.06)
        self.play(FadeIn(jo[11:], scale=1.2), LaggedStart(*[FadeIn(m, shift=UP * 0.1) for m in row],
                                                             lag_ratio=0.1), run_time=0.5)
        self.play(GrowFromCenter(br), FadeIn(bl), run_time=0.3)
        self.au_mot("2 puissance")
        p12 = puissance("2", "12", 44, SANS_ORDRE)
        r = VGroup(self.t("=", 42), p12).arrange(RIGHT, buff=0.2).next_to(row, RIGHT, buff=0.25)
        self.play(FadeIn(r[0]), FadeIn(p12[0]), run_time=0.25)
        self.au_nb("2 puissance", "12")
        self.play(FadeIn(p12[1], scale=1.4), run_time=0.25)
        self.au_mot("4 096")
        r2 = self.t("= 4 096 ensembles", 42, VERT_OK, audit=False).next_to(r, RIGHT, buff=0.25)
        self.play(FadeIn(r2, scale=1.2), run_time=0.35)
        self.insister(r2, 1.08)
        self.au_mot("Un ensemble à n")
        g = VGroup(self.t("Un ensemble à n éléments a", 36), puissance("2", "n", 40, VERT_OK), self.t("parties.", 36))
        g.arrange(RIGHT, buff=0.18).move_to(P(0, -1.75)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(g[0], shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("2 puissance n")
        self.play(FadeIn(g[1], scale=1.3), run_time=0.25)
        self.au_mot("parties")
        cad = SurroundingRectangle(g, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(g[2]), Create(cad), run_time=0.3)
        self.au_mot("somme")
        fs = 30
        som = VGroup(parmi("n", 0, fs), self.t("+", fs), parmi("n", 1, fs), self.t("+ … +", fs), parmi("n", "n", fs),
                     self.t("=", fs), puissance("2", "n", fs + 4, VERT_OK))
        muet(som)
        som.arrange(RIGHT, buff=0.18).move_to(P(0, -2.75)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(som[:5], shift=UP * 0.1), run_time=0.35)
        self.au_mot("k parmi n")
        self.play(FadeIn(som[5:], scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : le piège : la mélodie (1 320) et l'accord (220) ───────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-piege")
        tri = Triangle(fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).scale(0.32)
        tri.add(txt("!", 30, WHITE, weight=BOLD).move_to(tri.get_center() + DOWN * 0.06))
        pg = VGroup(tri, self.t("Le piège !", 50, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.45)
        self.au_mot("piège")
        self.play(FadeIn(pg, scale=1.3), run_time=0.45)
        ou = VGroup(self.t("Oublier de diviser par", 38, ROUGE_ERREUR), self.t("k!", 40, ROUGE_ERREUR))
        ou.arrange(RIGHT, buff=0.2).move_to(P(0, 2.15))
        self.au_mot("Oublier")
        self.play(FadeIn(ou[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("k factorielle")
        self.play(FadeIn(ou[1], scale=1.3), run_time=0.25)
        # la mélodie, à gauche
        st1 = portee().move_to(P(-3.6, 0.2))
        y0 = st1[0].get_y()
        haut = [0.0, 0.36, 0.63]  # do, mi, sol (lignes / interlignes)
        m1 = self.t("1 320", 46, ORDRE, audit=False)
        m2 = self.t("mélodies", 38, ORDRE)
        VGroup(m1, m2).arrange(RIGHT, buff=0.2).move_to(P(-3.6, -1.15))
        self.au_mot("1 320")
        self.play(FadeIn(m1, scale=1.3), Create(st1), run_time=0.4)
        self.au_mot("mélodies")
        self.play(FadeIn(m2, shift=RIGHT * 0.1), run_time=0.3)
        notes1 = [note(ORDRE).move_to(P(-4.9 + 1.2 * k, y0 + h + 0.25)) for k, h in enumerate(haut)]
        self.au_mot("jouées")
        self.play(FadeIn(notes1[0], scale=1.4), run_time=0.25)
        self.au_mot("après")
        self.play(FadeIn(notes1[1], scale=1.4), run_time=0.25)
        self.au_mot("l'autre")
        fl = Arrow(P(-5.3, -0.5), P(-1.9, -0.5), buff=0, color=ORDRE, stroke_width=4,
                   max_tip_length_to_length_ratio=0.08)
        self.play(FadeIn(notes1[2], scale=1.4), GrowArrow(fl), run_time=0.3)
        self.au_mot("l'ordre compte")
        oc = self.t("l'ordre compte", 32, ORDRE).next_to(VGroup(m1, m2), DOWN, buff=0.2)
        self.play(FadeIn(oc, scale=1.2), run_time=0.3)
        # l'accord, à droite
        st2 = portee(2.4).move_to(P(2.4, 0.2))
        self.au_mot("Un accord")
        notes2 = VGroup(*[note(SANS_ORDRE).move_to(P(2.4, y0 + h + 0.25)) for h in haut])
        a1 = self.t("un accord :", 38, SANS_ORDRE)
        self.play(Create(st2), FadeIn(notes2, shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("220")
        a2 = self.t("220", 46, VERT_OK)
        VGroup(a1, a2).arrange(RIGHT, buff=0.2).move_to(P(2.4, -1.15))
        self.play(FadeIn(a1), FadeIn(a2, scale=1.4), run_time=0.35)
        self.insister(a2, 1.2)
        self.attendre_voix(marge=0.6)

    # ── 11 : question-pause n° 3 : les parties d'un ensemble à 5 ───────────

    def ecran_question3(self):
        lettres = VGroup(*[VGroup(Circle(radius=0.3, fill_color=c, fill_opacity=1, stroke_width=0),
                                  self.t(l, 30, BLACK)) for l, c in
                           zip("abcde", [ROUGE_ERREUR, JAUNE_TITRE, VERT_OK, BLEU_CALCUL, VIOLET_ACCENT])])
        for g in lettres:
            g[1].move_to(g[0])
        lettres.arrange(RIGHT, buff=0.3).move_to(P(-3.4, 0.6))
        ens = Ellipse(width=lettres.width + 0.9, height=1.4, stroke_color=WHITE, stroke_width=3).move_to(lettres)

        def dessin(q):
            self.au_mot("5 éléments")
            self.play(FadeIn(q[0], shift=UP * 0.1), Create(ens), LaggedStart(*[FadeIn(x, scale=0.5) for x in lettres],
                                                                             lag_ratio=0.1), run_time=0.5)
            self.au_mot("parties")
            self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)

        q, cartes, pause, rebours = self.question("11-question", ["Un ensemble à 5 éléments", "a combien de parties ?"],
                                                  ["25", "32", "31"], 1, dessin)
        self.dire("11b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        p5 = puissance("2", "5", 46, VERT_OK)
        r = VGroup(p5, self.t("= 32", 46, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(-3.4, 2.4))
        self.au_mot("2 puissance")
        self.play(FadeIn(p5[0]), run_time=0.2)
        self.au_nb("puissance", "5")
        self.play(FadeIn(p5[1], scale=1.4), run_time=0.2)
        self.au_mot("32")
        self.play(FadeIn(r[1], scale=1.3), run_time=0.3)
        self.au_mot("partie vide")
        vide = Ellipse(width=1.2, height=0.7, stroke_color=SANS_ORDRE, stroke_width=4).move_to(P(-5.0, -1.4))
        lv = self.t("la partie vide", 28, SANS_ORDRE).next_to(vide, DOWN, buff=0.12)
        self.play(Create(vide), FadeIn(lv), run_time=0.35)
        self.au_mot("l'ensemble entier")
        tout = lettres.copy().scale(0.55).move_to(P(-1.9, -1.4))
        et = Ellipse(width=tout.width + 0.4, height=0.7, stroke_color=SANS_ORDRE, stroke_width=4).move_to(tout)
        le = self.t("l'ensemble entier", 28, SANS_ORDRE).next_to(et, DOWN, buff=0.12)
        self.play(Create(et), TransformFromCopy(lettres, tout), FadeIn(le), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 12 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("12-appris")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 36
        a = [parmi("n", "k", fs), self.t("compte les façons de choisir k éléments parmi n, sans ordre.", fs)]
        den = VGroup(self.t("k!", fs), self.t("× (n − k)!", fs)).arrange(RIGHT, buff=0.12)
        b = [self.t("Il vaut", fs), frac(self.t("n!", fs), den, fs)]
        c = [parmi("n", "k", fs), self.t("=", fs), parmi("n", "n − k", fs)]
        d = [self.t("Un ensemble à n éléments a", fs), puissance("2", "n", fs + 4, VERT_OK), self.t("parties.", fs)]
        blocs = [VGroup(*x).arrange(RIGHT, buff=0.2) for x in (a, b, c, d)]
        lignes = VGroup(*[VGroup(self.coche(), bl).arrange(RIGHT, buff=0.3) for bl in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        if lignes.width > 11.8:
            lignes.scale_to_fit_width(11.8)
        lignes.move_to(P(-0.4, -0.3))
        self.au_mot("k parmi n")
        self.play(Create(lignes[0][0]), FadeIn(a[0], scale=1.2), run_time=0.35)
        self.au_mot("compte")
        self.play(FadeIn(a[1], shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("Il vaut")
        self.play(Create(lignes[1][0]), FadeIn(b[0]), FadeIn(b[1][0]), run_time=0.35)
        self.au_mot("sur k")
        self.play(Create(b[1][1]), FadeIn(den, shift=UP * 0.1), run_time=0.35)
        self.au_mot("k parmi n égale")
        self.play(Create(lignes[2][0]), FadeIn(VGroup(*c), shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("Et un ensemble")
        self.play(Create(lignes[3][0]), FadeIn(d[0], shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("2 puissance")
        self.play(FadeIn(d[1], scale=1.3), FadeIn(d[2]), run_time=0.3)
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_accroche()
        self.ecran_titre()
        self.ecran_metier()
        self.ecran_ordre()
        self.ecran_calcul()
        self.ecran_formule()
        self.ecran_question1()
        self.ecran_symetrie()
        self.ecran_question2()
        self.ecran_parties()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_appris()
        self.page_abonnement()


class DenombrementCoefficientBinomialTerminale(DenombrementCoefficientBinomialBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
