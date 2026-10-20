# proba_ech_taille.py
# EleveAI — Maths STMG — série « Probabilités » : la TAILLE DE L'ÉCHANTILLON
# et la précision (micro : va_ech_taille, notion va_echantillonnage), AVEC
# VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_ech_taille_short.py
# (ceinture jaune).
#
# Méthode de la série (proba_bern_epreuve.py) : une classe Base porte toutes
# les scènes ; la sous-classe ne change que l'identité.
#
# ⭐ La banque du coach (variables-aleatoires.bank.ts, stmg_va_ech_taille_fix_1
# et _tpl_1) n'a AUCUN canvas pour cette micro (QCM « par 9 / par 3… » et
# réponse numérique). La figure est celle de la série échantillonnage
# (proba_ech_fluctuation.py) : la FOULE des sondés (silhouettes) et la BANDE de
# marge autour de p sur un axe. Ici on VOIT le k² : un carré de personnes
# devient 4 carrés (×4), 9 carrés (×9), 25 carrés (×25), pendant que la bande
# rétrécit de moitié, d'un tiers, d'un cinquième.
#
# Écrans : 00 garde · 01 le sondage (énergies renouvelables), 400 personnes,
# 1/√400 = 0,05 · 02 deux fois plus précis : 0,025 ; deux fois plus de
# personnes ? · 03 1/√n = 0,025, √n = 40, n = 1 600 : 4 carrés · 04 la règle
# (marge ÷ k → taille × k²) · 05 ÷ 3 → 9 carrés, 400 × 9 = 3 600 · 06 le piège
# (doubler : ÷ environ 1,4) · 07 défi (100, 0,1 → 0,02) · 07b correction
# (÷ 5, × 25, 2 500) · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/stmg-proba-ech-taille.json (débit −7).
# Rendu (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_ech_taille.py ProbaEchTailleSTMG -o eleveai-maths-stmg-proba-ech-taille --media_dir manim/scripts/stmg/media-va_ech_taille
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/37-ech-taille/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import frac, suite  # noqa: E402

BANDE = "#38BDF8"        # la bande de marge autour de p
SONDE = "#93C5FD"        # le premier carré de sondés
NOUVEAU = "#86EFAC"      # les carrés ajoutés
CADRE = "#64748B"        # le contour d'un carré de personnes
MAT = "#CBD5E1"
PALE = "#1E3A8A"         # le panneau solaire


def P(x, y):
    return np.array([x, y, 0.0])


# ── la foule : des carrés de personnes ──────────────────────────────────────

def personne(color=SONDE, s=1.0):
    """Une silhouette : une tête et des épaules (largeur 0,3 à s = 1)."""
    tete = Circle(radius=0.1, fill_color=color, fill_opacity=1, stroke_width=0).move_to(P(0, 0.13))
    corps = Arc(radius=0.15, start_angle=0, angle=PI, fill_color=color, fill_opacity=1,
                stroke_width=0).move_to(P(0, -0.08))
    return VGroup(tete, corps).scale(s)


class Bloc(VGroup):
    """Un CARRÉ de personnes : n × n silhouettes dans un cadre arrondi."""

    def __init__(self, cote=1.6, color=SONDE, n=5, **kw):
        super().__init__(**kw)
        pas = cote / n
        self.cadre = RoundedRectangle(width=cote, height=cote, corner_radius=min(0.12, cote * 0.08),
                                      fill_color=color, fill_opacity=0.08, stroke_color=CADRE, stroke_width=2)
        self.gens = VGroup()
        for i in range(n):
            for j in range(n):
                x = -cote / 2 + pas * (j + 0.5)
                y = cote / 2 - pas * (i + 0.5)
                self.gens.add(personne(color, pas * 0.72 / 0.3).move_to(P(x, y)))
        self.add(self.cadre, self.gens)


def cases(k, centre, taille=3.6, buff=0.12):
    """Les centres et le côté des k × k cases d'un carré de côté `taille`
    (ligne par ligne, la case 0 en haut à gauche)."""
    cote = (taille - (k - 1) * buff) / k
    x0 = centre[0] - taille / 2 + cote / 2
    y0 = centre[1] + taille / 2 - cote / 2
    pts = [P(x0 + j * (cote + buff), y0 - i * (cote + buff)) for i in range(k) for j in range(k)]
    return pts, cote


def accolade(mob, cote, texte, fs=32, color=JAUNE_TITRE):
    """Une accolade sur le côté `cote` (UP ou LEFT) et sa lettre."""
    b = Brace(mob, direction=cote, color=color, buff=0.1)
    t = Text(texte, font_size=fs, color=color).next_to(b, cote, buff=0.1)
    return VGroup(b, t)


# ── l'axe des fréquences et la bande de marge ───────────────────────────────

class AxeMarge(VGroup):
    """Un axe horizontal, p au milieu ; bande(m) : le rectangle p ± m et ses
    deux flèches SOUS l'axe ; etiquette(m, texte) : le nombre sous la flèche
    de droite. `u` = unités d'écran par unité de fréquence."""

    def __init__(self, cx=-0.9, y=-2.2, long=9.0, u=52.0, mot=True):
        super().__init__()
        self.cx, self.y, self.u = cx, y, u
        self.ligne = Arrow(P(cx - long / 2, y), P(cx + long / 2, y), buff=0, color=WHITE, stroke_width=4,
                           tip_length=0.22, max_tip_length_to_length_ratio=0.05)
        tick = Line(P(cx, y - 0.22), P(cx, y + 0.22), color=JAUNE_TITRE, stroke_width=5)
        lp = Text("p", font_size=32, color=JAUNE_TITRE).next_to(tick, UP, buff=0.08)
        self.p = VGroup(tick, lp)
        self.add(self.ligne, self.p)
        if mot:
            self.mot = Text("marge", font_size=26, color=BANDE).next_to(self.ligne, LEFT, buff=0.15)
            self.add(self.mot)

    def bande(self, m, color=BANDE):
        w = 2 * m * self.u
        r = Rectangle(width=w, height=0.5, fill_color=color, fill_opacity=0.22, stroke_color=color,
                      stroke_width=3).move_to(P(self.cx, self.y))
        yf = self.y - 0.5
        g = Arrow(P(self.cx, yf), P(self.cx - w / 2, yf), buff=0, color=ORANGE_RETENUE, stroke_width=4,
                  tip_length=0.16, max_tip_length_to_length_ratio=0.35)
        d = Arrow(P(self.cx, yf), P(self.cx + w / 2, yf), buff=0, color=ORANGE_RETENUE, stroke_width=4,
                  tip_length=0.16, max_tip_length_to_length_ratio=0.35)
        return VGroup(r, g, d)

    def bande_vide(self, m, color=WHITE):
        """Le contour en pointillés d'une bande espérée."""
        w = 2 * m * self.u
        r = DashedVMobject(Rectangle(width=w, height=0.62, stroke_color=color, stroke_width=3),
                           num_dashes=max(12, int(w * 6)))
        return r.move_to(P(self.cx, self.y))

    def etiquette(self, m, texte, fs=30, color=ORANGE_RETENUE):
        t = Text(texte, font_size=fs, color=color)
        return t.move_to(P(self.cx + m * self.u / 2, self.y - 0.85))


# ── les énergies renouvelables : une éolienne et un panneau solaire ─────────

class Eolienne(VGroup):
    """Mât, nacelle et trois pales ; tourner() ajoute l'updater des pales."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        mat = Polygon(P(-0.08, 0), P(0.08, 0), P(0.04, 2.2), P(-0.04, 2.2), fill_color=WHITE, fill_opacity=1,
                      stroke_width=0)
        self.moyeu = Dot(P(0, 2.2), radius=0.1, color=MAT)
        pales = VGroup()
        for a in range(3):
            pale = Polygon(P(0, 0), P(0.1, 0.25), P(0.04, 1.2), P(-0.05, 0.3), fill_color=WHITE, fill_opacity=1,
                           stroke_color=MAT, stroke_width=1).shift(P(0, 2.2))
            pale.rotate(a * 2 * PI / 3 + 0.3, about_point=P(0, 2.2))
            pales.add(pale)
        self.pales = pales
        self.add(mat, pales, self.moyeu)
        self.scale(s)

    def tourner(self, vitesse=1.6):
        self.pales.add_updater(lambda m, dt: m.rotate(-vitesse * dt, about_point=self.moyeu.get_center()))


def panneau(s=1.0):
    """Un panneau solaire incliné sur son pied."""
    cadre = Polygon(P(-0.9, 0), P(0.9, 0), P(0.6, 0.8), P(-0.6, 0.8), fill_color=PALE, fill_opacity=1,
                    stroke_color=MAT, stroke_width=2)
    lignes = VGroup(*[Line(P(-0.9 + 0.3 * k, 0), P(-0.6 + 0.2 * k, 0.8), color=BANDE,
                           stroke_width=1.5) for k in range(1, 6)])
    h = Line(P(-0.75, 0.4), P(0.75, 0.4), color=BANDE, stroke_width=1.5)
    pied = Line(P(0, 0), P(0, -0.5), color=MAT, stroke_width=5)
    return VGroup(pied, cadre, lignes, h).scale(s)


C_FOULE = P(-4.3, 0.65)     # le centre de la zone de la foule (carré de 3,6)
C_GRILLE = P(-4.0, 0.75)    # la grille quand elle porte ses accolades (carré de 3,2)


class ProbaEchTailleBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-ech-taille"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_left() + LEFT * 0.1, mob.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                    stroke_width=sw)

    def un_sur_racine(self, n, fs=40, color=WHITE):
        return frac("1", f"√{n}", fs, color)

    def grandir(self, bloc, k, nouveaux_lag=0.12, run_time=1.4, centre=C_FOULE, taille=3.6):
        """Le carré `bloc` file dans la case 0 d'une grille k × k ; les autres
        cases se remplissent de carrés verts, un à un. Renvoie la grille."""
        pts, cote = cases(k, centre, taille)
        neufs = [Bloc(cote, NOUVEAU).move_to(p) for p in pts[1:]]
        self.play(bloc.animate.scale_to_fit_width(cote).move_to(pts[0]), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in neufs], lag_ratio=nouveaux_lag), run_time=run_time)
        return VGroup(bloc, *neufs)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La taille de l'échantillon", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.95))
        bloc = Bloc(1.9).move_to(P(-4.4, -0.55))
        axe = AxeMarge(cx=1.0, y=-0.55, long=6.4, u=40, mot=False)
        b = axe.bande(0.05)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.play(FadeIn(bloc, scale=0.6), FadeIn(axe), FadeIn(b), run_time=0.6)
        self.au_mot("deux fois plus précis")
        sous = self.t("deux fois plus précis", 40, BLEU_CALCUL).move_to(P(-0.6, 1.0))
        self.play(FadeIn(sous, shift=UP * 0.15), Transform(b, axe.bande(0.025)), run_time=0.7)
        self.au_mot("combien de données")
        q = self.t("?", 90, ORANGE_RETENUE).move_to(P(-2.8, -0.55))
        self.play(FadeIn(q, scale=2), Wiggle(bloc), run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : le sondage, 400 personnes, marge 0,05 ──────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un sondage")
        eo = Eolienne(0.72).move_to(P(2.6, 1.3))
        pan = panneau(0.9).move_to(P(4.6, 0.3))
        self.play(FadeIn(eo, shift=UP * 0.2), FadeIn(pan, shift=UP * 0.2), run_time=0.6)
        eo.tourner()
        self.au_mot("400 personnes")
        bloc = Bloc(2.6).move_to(C_FOULE)
        n400 = self.t("400 personnes", 34, BLEU_CALCUL).next_to(bloc, DOWN, buff=0.25)
        self.play(FadeIn(bloc.cadre), LaggedStart(*[FadeIn(g, scale=0.3) for g in bloc.gens], lag_ratio=0.03),
                  FadeIn(n400, scale=1.4), run_time=1.0)
        self.au_mot("énergies renouvelables")
        self.play(Indicate(pan, color=JAUNE_TITRE), run_time=0.8)
        self.au_mot("Sa marge de fluctuation")
        axe = AxeMarge()
        b = axe.bande(0.05)
        self.play(FadeIn(axe), run_time=0.4)
        self.play(FadeIn(b[0]), GrowArrow(b[1]), GrowArrow(b[2]), run_time=0.6)
        self.au_mot("1 sur racine de 400")
        x0 = -1.4
        l1 = suite(self.t("marge =", 44), self.un_sur_racine(400, 40, BLEU_CALCUL), buff=0.25)
        l1.move_to(P(x0, -0.75), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("0,05")
        eg = self.t("=", 44).next_to(l1, RIGHT, buff=0.25)
        v = self.t("0,05", 52, ORANGE_RETENUE).next_to(eg, RIGHT, buff=0.25)
        lab = axe.etiquette(0.05, "0,05")
        self.play(FadeIn(eg), FadeIn(v, scale=1.8), FadeIn(lab, scale=1.6), run_time=0.5)
        self.insister(v)
        self.attendre_voix()

    # ── 02 : deux fois plus précis : 0,025 ; deux fois plus de monde ? ──────

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-question")
        bloc = Bloc(2.6).move_to(C_FOULE)
        n400 = self.t("400 personnes", 34, BLEU_CALCUL).next_to(bloc, DOWN, buff=0.25)
        axe = AxeMarge()
        b = axe.bande(0.05)
        lab = axe.etiquette(0.05, "0,05")
        self.add(bloc, n400, axe, b, lab)
        self.titre_ecran("Deux fois plus précis ?")
        x0 = -1.4
        self.au_mot("deux fois plus petite")
        k = [self.t("marge", 44), self.t("÷ 2", 48, JAUNE_TITRE), self.t("=", 44), self.t("0,025", 52, ORANGE_RETENUE)]
        l1 = suite(*k, buff=0.25).move_to(P(x0, 1.7), aligned_edge=LEFT)
        self.play(FadeIn(VGroup(k[0], k[1]), shift=RIGHT * 0.2), Transform(b, axe.bande(0.025)),
                  FadeOut(lab), run_time=0.9)
        self.au_mot("0,025")
        lab2 = axe.etiquette(0.025, "0,025", fs=28)
        self.play(FadeIn(k[2]), FadeIn(k[3], scale=1.8), FadeIn(lab2, scale=1.6), run_time=0.5)
        self.insister(k[3])
        self.au_mot("deux fois plus de personnes")
        pts, cote = cases(2, C_FOULE)
        self.play(bloc.animate.scale_to_fit_width(cote).move_to(pts[0]), FadeOut(n400), run_time=0.6)
        fant = DashedVMobject(RoundedRectangle(width=cote, height=cote, corner_radius=0.12,
                                               stroke_color=ORANGE_RETENUE, stroke_width=3), num_dashes=36)
        fant.move_to(pts[1])
        qm = self.t("?", 72, ORANGE_RETENUE).move_to(pts[1])
        q = VGroup(self.t("deux fois plus", 40, ORANGE_RETENUE),
                   self.t("de personnes ?", 40, ORANGE_RETENUE)).arrange(DOWN, buff=0.15, aligned_edge=LEFT)
        q.move_to(P(x0, 0.0), aligned_edge=LEFT)
        self.play(Create(fant), FadeIn(qm, scale=1.6), FadeIn(q, shift=RIGHT * 0.2), run_time=0.7)
        self.play(Wiggle(qm), run_time=0.6)
        self.attendre_voix()

    # ── 03 : le calcul : n = 1 600, quatre fois plus ────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        pts, cote = cases(2, C_FOULE)
        bloc = Bloc(cote).move_to(pts[0])
        axe = AxeMarge()
        b = axe.bande(0.025)
        lab = axe.etiquette(0.025, "0,025", fs=28)
        self.add(bloc, axe, b, lab)
        self.titre_ecran("Le calcul")
        x0 = -1.4
        self.au_mot("1 sur racine de n")
        l1 = suite(self.un_sur_racine("n", 40), self.t("=", 44), self.t("0,025", 48, ORANGE_RETENUE), buff=0.25)
        l1.move_to(P(x0, 1.85), aligned_edge=LEFT)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 0,025")
        self.play(FadeIn(l1[1:], shift=RIGHT * 0.15), Indicate(lab, color=ORANGE_RETENUE), run_time=0.5)
        self.au_mot("racine de n égale 40")
        l2 = suite(self.t("√n", 44), self.t("=", 44), self.t("40", 48, BLEU_CALCUL), buff=0.25)
        l2.move_to(P(x0, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(l2[:2], shift=RIGHT * 0.2), run_time=0.4)
        self.play(FadeIn(l2[2], scale=1.8), run_time=0.4)
        self.au_mot("Donc n égale")
        l3 = suite(self.t("n", 48), self.t("=", 48), self.t("1 600", 56, VERT_OK), buff=0.25)
        l3.move_to(P(x0, -0.25), aligned_edge=LEFT)
        self.play(FadeIn(l3[:2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("1 600")
        grille = self.grandir(bloc, 2, nouveaux_lag=0.3, run_time=0.9)
        n1600 = self.t("1 600", 34, VERT_OK).next_to(grille, DOWN, buff=0.18)
        self.play(FadeIn(l3[2], scale=1.8), FadeIn(n1600, scale=1.4), run_time=0.5)
        self.au_mot("Quatre fois plus")
        q4 = self.t("4 fois plus", 44, VERT_OK).move_to(P(x0, -1.2), aligned_edge=LEFT)
        self.play(FadeIn(q4, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(g, color=VERT_OK, scale_factor=1.08) for g in grille], lag_ratio=0.35),
                  run_time=1.4)
        self.au_mot("pas deux fois plus")
        p2 = self.t("2 fois plus", 40, ROUGE_ERREUR).next_to(q4, RIGHT, buff=0.6)
        self.play(FadeIn(p2, shift=RIGHT * 0.15), run_time=0.4)
        self.play(Create(self.barrer(p2)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la règle : marge ÷ k → taille × k² ─────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-regle")
        centre, taille = C_GRILLE, 3.2
        pts, cote = cases(4, centre, taille)
        bloc = Bloc(cote).move_to(pts[0])
        axe = AxeMarge()
        b = axe.bande(0.05)
        self.add(bloc, axe, b)
        self.titre_ecran("La règle")
        x0 = -1.4
        self.au_mot("diviser la marge par k")
        l1 = suite(self.t("marge", 46), self.t("÷ k", 52, JAUNE_TITRE), buff=0.3).move_to(P(x0, 1.7), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Transform(b, axe.bande(0.025)), run_time=0.9)
        self.au_mot("multiplier la taille")
        l2 = self.t("taille de l'échantillon", 42).move_to(P(x0, 0.55), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        grille = self.grandir(bloc, 4, nouveaux_lag=0.06, run_time=1.0, centre=centre, taille=taille)
        self.au_mot("k au carré")
        k2 = self.t("× k²", 72, JAUNE_TITRE).move_to(P(x0 + 2.4, -0.6))
        cad = SurroundingRectangle(k2, color=JAUNE_TITRE, buff=0.18, stroke_width=4)
        ag = accolade(grille, LEFT, "k")
        ab = accolade(grille, DOWN, "k")
        self.play(FadeIn(k2, scale=1.6), Create(cad), FadeIn(ag), FadeIn(ab), run_time=0.6)
        self.insister(VGroup(k2, cad))
        self.attendre_voix(marge=1.5)

    # ── 05 : diviser par 3 : 9 fois plus, 3 600 ─────────────────────────────

    def ecran_exemple(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-exemple")
        bloc = Bloc(2.6).move_to(C_FOULE)
        axe = AxeMarge()
        b = axe.bande(0.05)
        self.add(bloc, axe, b)
        self.titre_ecran("Diviser la marge par 3")
        x0 = -1.4
        self.au_mot("Diviser par 3")
        l1 = suite(self.t("marge", 46), self.t("÷ 3", 52, JAUNE_TITRE), buff=0.3).move_to(P(x0, 1.7), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Transform(b, axe.bande(0.05 / 3)), run_time=0.9)
        self.au_mot("9 fois plus")
        grille = self.grandir(bloc, 3, nouveaux_lag=0.12, run_time=1.2, centre=C_GRILLE, taille=3.2)
        ag = accolade(grille, LEFT, "3")
        ab = accolade(grille, DOWN, "3")
        l2 = self.t("9 fois plus", 48, VERT_OK).move_to(P(x0, 0.6), aligned_edge=LEFT)
        self.play(FadeIn(ag), FadeIn(ab), FadeIn(l2, scale=1.4), run_time=0.5)
        self.insister(l2)
        self.au_mot("400 fois 9")
        k = [self.t("400 × 9", 48), self.t("=", 48), self.t("3 600", 56, VERT_OK)]
        l3 = suite(*k, buff=0.25).move_to(P(x0, -0.5), aligned_edge=LEFT)
        self.play(FadeIn(k[0], shift=RIGHT * 0.2), Indicate(grille[0], color=SONDE), run_time=0.5)
        self.au_mot("3 600")
        self.play(FadeIn(k[1]), FadeIn(k[2], scale=1.8), run_time=0.5)
        self.insister(k[2])
        self.attendre_voix()

    # ── 06 : le piège : doubler ne divise que par environ 1,4 ───────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        pts, cote = cases(2, C_FOULE)
        bloc = Bloc(cote).move_to(pts[0])
        axe = AxeMarge()
        b = axe.bande(0.05)
        self.add(bloc, axe, b)
        self.titre_ecran("Le piège")
        x0 = -1.4
        self.au_mot("doubler l'échantillon")
        l1 = self.t("doubler l'échantillon", 42).move_to(P(x0, 1.7), aligned_edge=LEFT)
        deux = Bloc(cote, NOUVEAU).move_to(pts[1])
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(deux, scale=0.4), run_time=0.7)
        self.au_mot("divise la marge par 2")
        l2 = suite(self.t("marge", 44, ROUGE_ERREUR), self.t("÷ 2 ?", 48, ROUGE_ERREUR), buff=0.25)
        l2.move_to(P(x0, 0.65), aligned_edge=LEFT)
        espoir = axe.bande_vide(0.025, ROUGE_ERREUR)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Create(espoir), run_time=0.7)
        self.au_mot("Doubler ne la divise")
        self.play(Transform(b, axe.bande(0.05 / np.sqrt(2))), run_time=1.2)
        self.play(Create(self.barrer(l2)), l2.animate.set_opacity(0.5), run_time=0.5)
        self.au_mot("environ 1,4")
        l3 = suite(self.t("marge", 44), self.t("÷ environ 1,4", 48, ORANGE_RETENUE), buff=0.25)
        l3.move_to(P(x0, -0.45), aligned_edge=LEFT)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(l3[1])
        self.attendre_voix()

    # ── 07 : défi : 100 personnes, 0,1 → 0,02 ───────────────────────────────

    def axe_defi(self):
        return AxeMarge(u=26.0)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        x0 = -1.4
        self.au_mot("100 personnes")
        bloc = Bloc(2.4).move_to(C_FOULE)
        n100 = self.t("100 personnes", 34, BLEU_CALCUL).next_to(bloc, DOWN, buff=0.25)
        self.play(FadeIn(bloc, scale=0.5), FadeIn(n100, scale=1.4), run_time=0.6)
        self.au_mot("marge de 0,1")
        axe = self.axe_defi()
        b = axe.bande(0.1)
        lab = axe.etiquette(0.1, "0,1")
        l1 = suite(self.t("marge :", 44), self.t("0,1", 50, ORANGE_RETENUE), buff=0.25)
        l1.move_to(P(x0, 1.75), aligned_edge=LEFT)
        self.play(FadeIn(axe), FadeIn(b), FadeIn(lab, scale=1.5), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("Combien de personnes")
        q = suite(self.t("?", 60, ORANGE_RETENUE), self.t("personnes", 44, ORANGE_RETENUE), buff=0.25)
        q.move_to(P(x0, 0.6), aligned_edge=LEFT)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("marge de 0,02")
        fl = self.t("→", 48).next_to(l1, RIGHT, buff=0.3)
        v2 = self.t("0,02", 50, VERT_OK).next_to(fl, RIGHT, buff=0.3)
        cible = axe.bande_vide(0.02, VERT_OK)
        self.play(FadeIn(fl), FadeIn(v2, scale=1.8), Create(cible), run_time=0.6)
        self.insister(q[0])
        self.au_mot("Mets pause")
        mp = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(x0, -0.6), aligned_edge=LEFT)
        self.play(Write(mp), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        bloc = Bloc(2.4).move_to(C_FOULE)
        n100 = self.t("100 personnes", 34, BLEU_CALCUL).next_to(bloc, DOWN, buff=0.25)
        axe = self.axe_defi()
        b = axe.bande(0.1)
        cible = axe.bande_vide(0.02, VERT_OK)
        self.add(bloc, n100, axe, b, cible)
        self.titre_ecran("Correction")
        x0 = -1.4
        self.au_mot("Diviser par 5")
        l1 = suite(self.t("marge", 46), self.t("÷ 5", 52, JAUNE_TITRE), buff=0.3).move_to(P(x0, 1.75), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Transform(b, axe.bande(0.02)), run_time=0.9)
        self.au_mot("multiplier par 25")
        l2 = suite(self.t("taille", 46), self.t("× 25", 52, JAUNE_TITRE), buff=0.3).move_to(P(x0, 0.65), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeOut(n100), run_time=0.4)
        grille = self.grandir(bloc, 5, nouveaux_lag=0.05, run_time=1.4, centre=C_GRILLE, taille=3.2)
        ag = accolade(grille, LEFT, "5")
        ab = accolade(grille, DOWN, "5")
        self.play(FadeIn(ag), FadeIn(ab), run_time=0.4)
        self.au_mot("100 fois 25")
        k = [self.t("100 × 25", 46), self.t("=", 46), self.t("2 500", 54, VERT_OK)]
        l3 = suite(*k, buff=0.25).move_to(P(x0, -0.45), aligned_edge=LEFT)
        self.play(FadeIn(k[0], shift=RIGHT * 0.2), Indicate(grille[0], color=SONDE), run_time=0.5)
        self.au_mot("2 500 personnes")
        pers = self.t("personnes", 44, VERT_OK).next_to(k[2], DOWN, buff=0.25)
        self.play(FadeIn(k[1]), FadeIn(k[2], scale=1.8), FadeIn(pers, shift=LEFT * 0.1), run_time=0.5)
        ok = self.coche(taille=0.32).next_to(pers, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 46
        l1 = suite(self.t("marge =", fs), self.un_sur_racine("n", fs - 4, BLEU_CALCUL), buff=0.22)
        l2 = suite(self.t("marge", fs), self.t("÷ k", fs + 4, JAUNE_TITRE), self.t(":", fs),
                   self.t("n", fs), self.t("× k²", fs + 4, JAUNE_TITRE), buff=0.22)
        l3 = self.t("La précision coûte cher !", fs, VERT_OK)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to(P(-0.8, 0.3))
        for mot, l in zip(["La marge vaut", "Pour la diviser par k", "La précision"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.6)

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
        self.ecran_question()
        self.ecran_calcul()
        self.ecran_regle()
        self.ecran_exemple()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaEchTailleSTMG(ProbaEchTailleBase):
    identite = "Maths STMG — EleveAI"
