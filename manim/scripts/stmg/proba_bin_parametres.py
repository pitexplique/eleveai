# proba_bin_parametres.py
# EleveAI — Maths STMG — série « Probabilités » : les PARAMÈTRES d'une loi
# binomiale, n et p (micro vaT_bin_parametres, notion
# va_binomiale_reconnaitre), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_bin_parametres_short.py (ceinture jaune, les graines de
# vanille : « p = 0,8 ? Non ! 0,2 »).
#
# ⭐ La banque n'a pas de canvas pour cette micro (QCM « n et p ») ; la micro
# voisine vaT_bin_arbre dessine l'ARBRE DE BERNOULLI du coach
# (canvasArbreBernoulli : carte blanche, branches grises, probabilités en
# bleu). On en reprend la BRANCHE DOUBLE (une épreuve : succès S / échec
# S barre), posée quand la voix dit le nombre, et la même branche « retournée »
# dans le piège (le succès devient « intact », 0,95).
#
# Écrans : 00 garde · 01 le livreur (12 colis, 0,05, X compte les abîmés) ·
# 02 n = 12 (accolade sur les 12 colis) · 03 p = 0,05 (branche S = abîmé) ·
# 04 B(12 ; 0,05) · 05 le piège (S = intact, 0,95) · 06 défi (30 graines de
# vanille, 80 %) · 06b correction (n = 30, p = 0,2) · 07 ce que tu as appris ·
# 08 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-proba-bin-parametres.json (débit −7).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_parametres.py ProbaBinParametresSTMG -o eleveai-maths-stmg-proba-bin-parametres --media_dir manim/scripts/stmg/media-bin_parametres
# Puis copier dans manim/sorties/stmg/maths/probabilites/41-bin-parametres/.

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
from proba_pc_conditionnelle import ENCRE, PROBA, lettre, suite  # noqa: E402
from proba_bern_epreuve import ECHEC, SUCCES, BrancheDouble  # noqa: E402
from proba_ech_distance import colis  # noqa: E402
from proba_bern_arbre import pot, pousse  # noqa: E402

COUL_N = "#38BDF8"      # n : bleu ciel
COUL_P = "#FACC15"      # p : jaune
CAMION = "#2563EB"
VITRE = "#BAE6FD"
ROUE = "#1E293B"
POT_NON = "#F97316"     # la graine qui ne germe pas (ce que X compte)

# les colis abîmés de la tournée : toujours les mêmes (purement visuels)
ABIMES = {4, 9}


def P(x, y):
    return np.array([x, y, 0.0])


def camion(s=1.0):
    """Une camionnette de livraison vue de côté, nez à droite."""
    caisse = RoundedRectangle(width=2.6, height=1.5, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                              stroke_color="#94A3B8", stroke_width=2).move_to(P(-0.55, 0.15))
    bande = Rectangle(width=2.6, height=0.22, fill_color=CAMION, fill_opacity=1, stroke_width=0).move_to(P(-0.55, -0.2))
    cabine = Polygon(P(0.75, -0.6), P(0.75, 0.55), P(1.35, 0.55), P(1.75, -0.05), P(1.75, -0.6),
                     fill_color=CAMION, fill_opacity=1, stroke_color="#1E3A8A", stroke_width=2)
    vitre = Polygon(P(0.88, 0.0), P(0.88, 0.42), P(1.3, 0.42), P(1.6, 0.0), fill_color=VITRE, fill_opacity=1,
                    stroke_width=0)
    roues = VGroup(*[VGroup(Circle(radius=0.3, fill_color=ROUE, fill_opacity=1, stroke_color="#64748B",
                                   stroke_width=3),
                            Circle(radius=0.11, fill_color="#94A3B8", fill_opacity=1, stroke_width=0)).move_to(P(x, -0.62))
                     for x in (-1.25, 1.2)])
    return VGroup(caisse, bande, cabine, vitre, roues).scale(s)


def rangee_colis(h=0.62, buff=0.14, abimes=()):
    """Les 12 colis en une rangée (abimes : indices des colis fendus)."""
    return VGroup(*[colis(h, k in abimes) for k in range(12)]).arrange(RIGHT, buff=buff)


def loi_B(n, p, fs=60, c_n=COUL_N, c_p=COUL_P):
    """« B(n ; p) » : le B, la parenthèse, n en bleu, « ; », p en jaune."""
    morceaux = [Text("B", font_size=fs, color=WHITE, weight=BOLD), Text("(", font_size=fs),
                Text(n, font_size=fs, color=c_n, weight=BOLD), Text(";", font_size=fs),
                Text(p, font_size=fs, color=c_p, weight=BOLD), Text(")", font_size=fs)]
    g = VGroup(*morceaux).arrange(RIGHT, buff=0.1)
    morceaux[3].shift(RIGHT * fs * 0.004)
    morceaux[4].shift(RIGHT * fs * 0.009)
    morceaux[5].shift(RIGHT * fs * 0.009)
    for m in morceaux[1:]:
        m.align_to(morceaux[0], DOWN)
    morceaux[1].shift(DOWN * fs * 0.003)
    morceaux[5].shift(DOWN * fs * 0.003)
    morceaux[3].shift(DOWN * fs * 0.002)
    return g


def egal(gauche, droite, fs=56, c_g=WHITE, c_d=VERT_OK):
    """« n = 12 » : trois Text sur une ligne."""
    return suite(Text(gauche, font_size=fs, color=c_g, weight=BOLD), Text("=", font_size=fs),
                 Text(droite, font_size=fs, color=c_d, weight=BOLD), buff=0.25)


class GrillePots(VGroup):
    """Les 30 pots de graines (6 × 5). Les pots de `pas_germe` ne germent pas."""

    PAS_GERME = (3, 8, 16, 21, 25, 28)

    def __init__(self, s=0.42, pas_x=0.78, pas_y=0.82, **kw):
        super().__init__(**kw)
        self.pots = VGroup()
        for k in range(30):
            self.pots.add(pot(s).move_to(P(pas_x * (k % 6 - 2.5), pas_y * (2 - k // 6))))
        self.sans = VGroup(*[self.pots[k] for k in self.PAS_GERME])
        self.add(self.pots)

    def les_pousses(self):
        """Les pousses des pots qui germent, À LEUR PLACE ACTUELLE (après placement)."""
        return VGroup(*[pousse(self.pots[k]) for k in range(30) if k not in self.PAS_GERME])


class ProbaBinParametresBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-bin-parametres"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def mot_branche(self, a, k, mob):
        """Un mot (et son dessin) à droite de la carte, à la hauteur de la lettre k."""
        mob.next_to(a.carte, RIGHT, buff=0.2)
        mob.set_y(a.lab[k].get_y())
        return mob

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les paramètres d'une loi binomiale", 50, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        bn = self.t("n", 110, COUL_N).move_to(P(-2.3, -0.2))
        et = self.t("et", 50).move_to(P(-0.6, -0.25))
        bp = self.t("p", 110, COUL_P).move_to(P(1.1, -0.1))
        cn = SurroundingRectangle(bn, color=COUL_N, buff=0.3, stroke_width=5)
        cp = SurroundingRectangle(bp, color=COUL_P, buff=0.3, stroke_width=5)
        cp.match_height(cn).set_y(cn.get_y())
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.au_mot("n et p")
        self.play(FadeIn(bn, scale=1.6), Create(cn), run_time=0.45)
        self.play(FadeIn(et), FadeIn(bp, scale=1.6), Create(cp), run_time=0.45)
        self.attendre_voix(marge=1.0)

    # ── 01 : le livreur et ses 12 colis ─────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le livreur")
        cam = camion(0.85).move_to(P(-7.8, 1.85))
        sol = Line(P(-6.8, 1.05), P(6.8, 1.05), color="#475569", stroke_width=4)
        self.play(FadeIn(sol), run_time=0.3)
        self.play(cam.animate.move_to(P(-4.6, 1.85)), run_time=0.9, rate_func=rate_functions.ease_out_cubic)
        self.au_mot("dépose 12 colis")
        rang = rangee_colis().move_to(P(-0.2, 0.15))
        depart = cam[0].get_center()
        self.play(LaggedStart(*[FadeIn(c, target_position=depart, scale=0.4) for c in rang], lag_ratio=0.08),
                  run_time=1.2)
        self.au_mot("12 colis")
        n12 = self.t("12 colis", 40, COUL_N).next_to(rang, DOWN, buff=0.3)
        self.play(FadeIn(n12, scale=1.5), run_time=0.4)
        self.au_mot("arrive abîmé")
        fendus = [colis(rang[k][0].height, True).move_to(rang[k]) for k in sorted(ABIMES)]
        self.play(*[Transform(rang[k], f) for k, f in zip(sorted(ABIMES), fendus)],
                  *[Wiggle(rang[k]) for k in sorted(ABIMES)], run_time=0.6)
        lp = suite(colis(0.45, True), self.t("abîmé :", 38), buff=0.2).move_to(P(-4.0, -1.35))
        self.play(FadeIn(lp, shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,05")
        v = self.t("0,05", 50, COUL_P).next_to(lp, RIGHT, buff=0.25)
        self.play(FadeIn(v, scale=1.8), run_time=0.4)
        self.insister(v, 0.25)
        self.au_mot("indépendamment")
        ind = self.t("indépendamment", 34, BLEU_CALCUL).next_to(v, RIGHT, buff=0.7)
        self.play(FadeIn(ind, shift=LEFT * 0.15), run_time=0.4)
        self.au_mot("X compte")
        lx = suite(self.t("X", 44, JAUNE_TITRE), self.t("compte les colis abîmés", 38), buff=0.22)
        lx.move_to(P(-1.2, -2.45))
        self.play(FadeIn(lx, shift=UP * 0.1), *[Indicate(rang[k], color=ECHEC, scale_factor=1.3)
                                                 for k in sorted(ABIMES)], run_time=0.7)
        self.attendre_voix()

    # ── 02 : n, le nombre d'épreuves ────────────────────────────────────────

    def ecran_n(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-n")
        self.titre_ecran("Le paramètre n")
        rang = rangee_colis(abimes=ABIMES).move_to(P(-0.2, 0.7))
        self.add(rang)
        self.au_mot("le nombre d'épreuves")
        l1 = suite(self.t("n", 54, COUL_N), self.t("= nombre d'épreuves répétées", 38), buff=0.2)
        l1.move_to(P(-0.2, 2.25))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.play(LaggedStart(*[Indicate(c, color=COUL_N, scale_factor=1.25) for c in rang], lag_ratio=0.1),
                  run_time=1.2)
        self.au_mot("ici, 12 colis")
        acc = Brace(rang, DOWN, color=COUL_N)
        n12 = self.t("12 colis", 40, COUL_N).next_to(acc, DOWN, buff=0.15)
        self.play(GrowFromCenter(acc), FadeIn(n12, scale=1.4), run_time=0.5)
        self.au_mot("n égale 12")
        eq = egal("n", "12", 72, COUL_N, VERT_OK).move_to(P(-0.6, -1.95))
        self.play(FadeIn(eq[:2]), TransformFromCopy(n12, eq[2]), run_time=0.6)
        cad = SurroundingRectangle(eq, color=COUL_N, buff=0.2, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(eq, cad), 0.25)
        self.attendre_voix()

    # ── 03 : p, la probabilité du succès = ce que X compte ──────────────────

    def ecran_p(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-p")
        self.titre_ecran("Le paramètre p")
        a = BrancheDouble().scale(0.9).move_to(P(-5.0, 0.35))
        self.play(FadeIn(a.socle()), *[Create(b) for b in a.branches], FadeIn(VGroup(*a.lab)), run_time=0.8)
        x0 = -0.45
        self.au_mot("la probabilité du succès")
        l1 = suite(self.t("p", 50, COUL_P), self.t("= probabilité du succès", 34), buff=0.2)
        l1.move_to(P(x0, 2.25), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(a.lab[0], color=SUCCES, scale_factor=1.6), run_time=0.7)
        self.au_mot("ce que X compte")
        l2 = suite(self.t("succès", 34, SUCCES), self.t("= ce que", 34), self.t("X", 38, JAUNE_TITRE),
                   self.t("compte", 34), buff=0.2)
        l2.move_to(P(x0, 1.2), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("un colis abîmé")
        mot = self.mot_branche(a, 0, suite(colis(0.45, True), self.t("abîmé", 34, SUCCES), buff=0.15))
        self.play(FadeIn(mot, shift=LEFT * 0.2), Indicate(a.lab[0], color=SUCCES, scale_factor=1.6), run_time=0.6)
        self.au_mot("p égale 0,05")
        eq = egal("p", "0,05", 72, COUL_P, VERT_OK).move_to(P(x0, -0.75), aligned_edge=LEFT)
        nb = a.nombre(0, "0,05", fs=30)
        self.play(FadeIn(eq[:2]), run_time=0.3)
        self.au_mot("0,05.")
        self.play(FadeIn(eq[2], scale=1.8), FadeIn(nb, scale=1.6), run_time=0.5)
        cad = SurroundingRectangle(eq, color=COUL_P, buff=0.2, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(nb, 0.25)
        self.attendre_voix()

    # ── 04 : la loi B(12 ; 0,05) ────────────────────────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-loi")
        l1 = suite(self.t("X", 54, JAUNE_TITRE), self.t("suit la loi binomiale", 46), buff=0.25).move_to(P(-0.4, 2.1))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        loi = loi_B("12", "0,05", 96).move_to(P(-0.4, 0.15))
        self.au_mot("B de 12")
        self.play(FadeIn(loi[0], scale=1.5), FadeIn(loi[1]), run_time=0.4)
        self.play(FadeIn(loi[2], scale=1.6), run_time=0.35)
        self.au_mot("0,05")
        self.play(FadeIn(loi[3]), FadeIn(loi[4], scale=1.6), FadeIn(loi[5]), run_time=0.45)
        fn = Arrow(loi[2].get_bottom() + DOWN * 0.15, loi[2].get_bottom() + DOWN * 1.05, color=COUL_N, buff=0)
        fp = Arrow(loi[4].get_bottom() + DOWN * 0.15, loi[4].get_bottom() + DOWN * 1.05, color=COUL_P, buff=0)
        ln = self.t("n", 54, COUL_N).next_to(fn, DOWN, buff=0.1)
        lp = self.t("p", 54, COUL_P).next_to(fp, DOWN, buff=0.1)
        lp.set_y(ln.get_y())
        self.play(GrowArrow(fn), GrowArrow(fp), FadeIn(ln), FadeIn(lp), run_time=0.5)
        self.insister(loi, 0.3)
        self.attendre_voix()

    # ── 05 : le piège : on compte les intacts ───────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        rang = rangee_colis(0.42, 0.12, ABIMES).move_to(P(-0.6, 2.6))
        # à gauche, le rappel de l'écran 03 (abîmés, 0,05) ; à droite, le piège
        ag = BrancheDouble().scale(0.9).move_to(P(-4.6, -0.05))
        ad = BrancheDouble().scale(0.9).move_to(P(1.6, -0.05))
        tg = suite(self.t("X", 32, JAUNE_TITRE), self.t("compte les abîmés", 30), buff=0.15)
        tg.next_to(ag.carte, UP, buff=0.2)
        mg = self.mot_branche(ag, 0, suite(colis(0.42, True), self.t("abîmé", 32, SUCCES), buff=0.12))
        ng = ag.nombre(0, "0,05", fs=28)
        gauche = VGroup(ag, tg, mg, ng)
        self.play(FadeIn(rang), FadeIn(gauche), run_time=0.6)
        self.play(gauche.animate.set_opacity(0.45), run_time=0.4)
        self.au_mot("les colis intacts")
        intacts = [rang[k] for k in range(12) if k not in ABIMES]
        td = suite(self.t("X", 32, JAUNE_TITRE), self.t("compte les intacts", 30), buff=0.15)
        td.next_to(ad.carte, UP, buff=0.2)
        self.play(*[c.animate.set_stroke(SUCCES, 4) for c in [i[0] for i in intacts]],
                  *[rang[k].animate.set_opacity(0.3) for k in sorted(ABIMES)], FadeIn(td, shift=DOWN * 0.1),
                  run_time=0.6)
        self.au_mot("le succès serait")
        self.play(FadeIn(ad.socle()), *[Create(b) for b in ad.branches], FadeIn(VGroup(*ad.lab)), run_time=0.6)
        md = self.mot_branche(ad, 0, suite(colis(0.42), self.t("intact", 32, SUCCES), buff=0.12))
        self.play(FadeIn(md, shift=LEFT * 0.2), Indicate(ad.lab[0], color=SUCCES, scale_factor=1.6), run_time=0.6)
        self.au_mot("p vaudrait 0,95")
        nd = ad.nombre(0, "0,95", fs=28)
        eq = egal("p", "0,95", 56, COUL_P, VERT_OK).next_to(ad.carte, DOWN, buff=0.3)
        self.play(FadeIn(eq[:2]), run_time=0.3)
        self.au_mot("0,95")
        self.play(FadeIn(eq[2], scale=1.8), FadeIn(nd, scale=1.6), run_time=0.5)
        self.insister(nd, 0.25)
        self.au_mot("p dépend")
        ch = self.chute("p dépend de ce que X compte", color=JAUNE_TITRE, font_size=40)
        self.play(Write(ch), gauche.animate.set_opacity(1), run_time=0.9)
        self.attendre_voix()

    # ── 06 : défi : 30 graines de vanille ───────────────────────────────────

    def grille(self):
        g = GrillePots().move_to(P(-4.0, 0.05))
        return g

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        g = self.grille()
        self.au_mot("On sème")
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.2) for p in g.pots], lag_ratio=0.03), run_time=1.0)
        self.au_mot("30 graines")
        n30 = self.t("30 graines de vanille", 34, COUL_N).next_to(g, DOWN, buff=0.3)
        self.play(FadeIn(n30, scale=1.3), run_time=0.4)
        x0 = 0.3
        self.au_mot("80 %")
        l1 = suite(self.t("80 %", 46, VERT_OK), self.t("germent", 38), buff=0.2).move_to(P(x0, 2.1), aligned_edge=LEFT)
        pousses = g.les_pousses()
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[GrowFromPoint(p, p.get_bottom()) for p in pousses],
                                                           lag_ratio=0.03), run_time=1.0)
        self.au_mot("X compte les graines")
        l2 = VGroup(suite(self.t("X", 44, JAUNE_TITRE), self.t("compte les graines", 38), buff=0.2),
                    self.t("qui ne germent pas", 38, POT_NON)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        l2.move_to(P(x0, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("qui ne germent pas")
        self.play(FadeIn(l2[1], shift=UP * 0.1), *[Indicate(p, color=POT_NON, scale_factor=1.35) for p in g.sans],
                  run_time=0.7)
        self.au_mot("Quels sont n et p")
        q = suite(egal("n", "?", 58, COUL_N, ORANGE_RETENUE), egal("p", "?", 58, COUL_P, ORANGE_RETENUE), buff=1.0)
        q.move_to(P(x0, -0.95), aligned_edge=LEFT)
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.play(Wiggle(q[0][2]), Wiggle(q[1][2]), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        g = self.grille()
        pousses = g.les_pousses()
        self.add(g, pousses)
        self.au_mot("n égale 30")
        eq_n = egal("n", "30", 60, COUL_N, VERT_OK).move_to(P(-4.0, -2.55))
        self.play(FadeIn(eq_n, scale=1.3), LaggedStart(*[Indicate(p, color=COUL_N, scale_factor=1.15)
                                                         for p in g.pots], lag_ratio=0.02), run_time=0.9)
        a = BrancheDouble().scale(0.85).move_to(P(1.1, 0.75))
        self.au_mot("Le succès")
        self.play(FadeIn(a.socle()), *[Create(b) for b in a.branches], FadeIn(VGroup(*a.lab)), run_time=0.6)
        self.au_mot("ne germe pas")
        mot = self.mot_branche(a, 0, self.t("ne germe pas", 32, SUCCES))
        self.play(FadeIn(mot, shift=LEFT * 0.2), Indicate(a.lab[0], color=SUCCES, scale_factor=1.6),
                  *[Indicate(p, color=POT_NON, scale_factor=1.35) for p in g.sans], run_time=0.7)
        self.au_mot("p égale 0,2")
        nb = a.nombre(0, "0,2", fs=28)
        eq_p = egal("p", "0,2", 60, COUL_P, VERT_OK).next_to(a.carte, DOWN, buff=0.4)
        self.play(FadeIn(eq_p, scale=1.3), FadeIn(nb, scale=1.6), run_time=0.5)
        self.insister(nb, 0.25)
        ok = self.coche(taille=0.35).next_to(eq_p, RIGHT, buff=0.5)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = suite(self.t("n", fs + 8, COUL_N), self.t("= nombre d'épreuves", fs), buff=0.2)
        l2 = suite(self.t("p", fs + 8, COUL_P), self.t("= probabilité de ce que", fs), self.t("X", fs + 4, JAUNE_TITRE),
                   self.t("compte", fs), buff=0.2)
        l3 = suite(self.t("On change ce qu'on compte :", fs), self.t("p", fs + 8, COUL_P), self.t("devient", fs),
                   self.t("1 − p", fs + 6, VERT_OK), buff=0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.65)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.5, 0.3))
        for mot, l in zip(["n est le nombre", "p est la probabilité", "Change ce qu'on compte"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("1 moins p")
        self.insister(l3[3], 0.3)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
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
        self.ecran_n()
        self.ecran_p()
        self.ecran_loi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBinParametresSTMG(ProbaBinParametresBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
