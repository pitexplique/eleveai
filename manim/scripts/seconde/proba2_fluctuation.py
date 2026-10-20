# proba2_fluctuation.py
# EleveAI — Maths 2de — série « Probabilités », épisode 13 : la fluctuation
# d'échantillonnage (micro : echantillon_fluctuation, notion
# echantillonnage_simulation), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba2_fluctuation_short.py (ceinture jaune).
#
# Écrans : 00 garde · 01 le marché : 25 % de letchis très sucrés, trois clients
# en goûtent 100 · 02 22, 29, 24 → 0,22 ; 0,29 ; 0,24 posées sur l'axe · 03 la
# fluctuation · 04 [p − 1/√n ; p + 1/√n], √100 = 10, 1/10 = 0,1 · 05 p = 0,25 :
# [0,15 ; 0,35], les trois clients dedans · 06 le piège « 0,29 : il ment » ·
# 07 défi n = 400 · 07b correction [0,20 ; 0,30] · 08 ce que tu as appris · 09 fin.
#
# ⭐ Figures : la banque du coach (echantillonnage.bank.ts) n'a PAS de canvas
# pour cette micro ; elle écrit l'intervalle [p − 1/√n ; p + 1/√n] et prend des
# tailles carrées (100, 400…). La vidéo dessine donc :
#   · le CAGEOT de 100 letchis (10 × 10), les très sucrés allumés en or ;
#   · un AXE de 0 à 1, l'intervalle en BANDE colorée, chaque fréquence observée
#     posée dessus (un repère de la couleur de son client) quand la voix la dit.
#
# Voix : manim/voix/seconde-proba-fluctuation.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_fluctuation.py Proba2Fluctuation -o eleveai-maths-seconde-proba-fluctuation --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/13-fluctuation/.

import importlib.util
import random
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402


def _charger(nom, chemin):
    """Un module chargé par son CHEMIN EXACT (des homonymes existent ailleurs)."""
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_modele = _charger("proba_modele_2de_fl", ICI / "proba_modele.py")
_signes = _charger("signes_expression_2de_fl", ICI / "signes_expression_2de.py")

frac_txt = _modele.frac_txt
echelle_ceintures = _signes.echelle_ceintures

LETCHI = "#DC2626"        # un letchi ordinaire (rouge)
LETCHI_BORD = "#7F1D1D"
SUCRE = "#FBBF24"          # un letchi TRÈS sucré (or)
SUCRE_BORD = "#FEF3C7"
BANDE = "#38BDF8"          # l'intervalle de fluctuation
CLIENTS = ["#F472B6", "#A78BFA", "#34D399"]   # client 1, 2, 3


def P(x, y):
    return np.array([x, y, 0.0])


def dec(x):
    """0.25 → « 0,25 »."""
    return f"{x:.2f}".replace(".", ",")


class NotionSeconde13(Notion6e):
    identite = "Maths 2de — EleveAI"


# ── le cageot de letchis ────────────────────────────────────────────────────

class Cageot(VGroup):
    """lignes × colonnes letchis rouges dans un cageot ; self.fruits[k].
    allumer(k) : k letchis TRÈS sucrés (or), éparpillés (graine fixe)."""

    def __init__(self, cell=0.26, lignes=10, colonnes=10, graine=0, bord=WHITE):
        super().__init__()
        self.cell = cell
        self.fruits = VGroup()
        r = cell * 0.4
        for i in range(lignes):
            for j in range(colonnes):
                c = Circle(radius=r, fill_color=LETCHI, fill_opacity=1, stroke_color=LETCHI_BORD,
                           stroke_width=max(1.0, cell * 6))
                c.move_to(P(j * cell, -i * cell))
                self.fruits.add(c)
        self.fruits.move_to(ORIGIN)
        self.boite = RoundedRectangle(width=colonnes * cell + 0.16, height=lignes * cell + 0.16,
                                      corner_radius=0.08, stroke_color=bord, stroke_width=3,
                                      fill_color="#3B2A1A", fill_opacity=1)
        self.add(self.boite, self.fruits)
        self.ordre = list(range(lignes * colonnes))
        random.Random(graine).shuffle(self.ordre)

    def lot(self, k):
        return [self.fruits[i] for i in self.ordre[:k]]

    def allumer(self, k, run_time=1.2):
        anims = [f.animate.set_fill(SUCRE, 1).set_stroke(SUCRE_BORD) for f in self.lot(k)]
        return LaggedStart(*anims, lag_ratio=0.15, run_time=run_time)

    def eteindre_tout(self):
        for f in self.fruits:
            f.set_fill(LETCHI, 1).set_stroke(LETCHI_BORD)

    def poser(self, k):
        self.eteindre_tout()
        for f in self.lot(k):
            f.set_fill(SUCRE, 1).set_stroke(SUCRE_BORD)


# ── l'axe de 0 à 1, la bande, les repères ───────────────────────────────────

class Axe(VGroup):
    """Un axe gradué de 0 à 1 (graduations tous les 0,1, seuls 0 et 1 écrits).
    self.x(v) : l'abscisse écran de la valeur v."""

    def __init__(self, x0=-6.2, x1=5.6, y=-1.4, fs=32):
        super().__init__()
        self.x0, self.x1, self.y = x0, x1, y
        self.ligne = Arrow(P(x0 - 0.3, y), P(x1 + 0.6, y), buff=0, color=WHITE, stroke_width=4,
                           tip_length=0.22, max_tip_length_to_length_ratio=0.05)
        self.grad = VGroup()
        for k in range(11):
            h = 0.32 if k in (0, 10) else 0.18
            self.grad.add(Line(P(self.x(k / 10), y - h / 2), P(self.x(k / 10), y + h / 2), color=WHITE,
                               stroke_width=3 if k in (0, 10) else 2))
        self.zero = Text("0", font_size=fs).next_to(P(x0, y), DOWN, buff=0.25)
        self.un = Text("1", font_size=fs).next_to(P(x1, y), DOWN, buff=0.25)
        self.add(self.ligne, self.grad, self.zero, self.un)

    def x(self, v):
        return self.x0 + (self.x1 - self.x0) * v

    def pt(self, v, dy=0.0):
        return P(self.x(v), self.y + dy)

    def bande(self, a, b, color=BANDE, h=0.62, opacite=0.35):
        r = Rectangle(width=self.x(b) - self.x(a), height=h, fill_color=color, fill_opacity=opacite,
                      stroke_color=color, stroke_width=3)
        return r.move_to(P((self.x(a) + self.x(b)) / 2, self.y))

    def borne(self, v, color=BANDE, fs=32, bas=True):
        """Le nombre v écrit sous (ou sur) l'axe, à son abscisse."""
        t = Text(dec(v), font_size=fs, color=color)
        return t.move_to(P(self.x(v), self.y + (-0.62 if bas else 0.62)))

    def repere(self, v, color, label=None, haut=0.75, dx=0.0, fs=32):
        """Un repère posé sur l'axe : un point + une tige + l'étiquette au-dessus.
        `haut` = hauteur de l'étiquette, `dx` = décalage de l'étiquette."""
        d = Dot(self.pt(v), radius=0.11, color=color)
        g = VGroup(d)
        if label is not None:
            t = Text(label, font_size=fs, color=color).move_to(self.pt(v, haut) + P(dx, 0))
            tige = Line(self.pt(v, 0.1), t.get_bottom() + P(0, -0.06), color=color, stroke_width=2.5)
            g.add(tige, t)
        return g


class Proba2Fluctuation(NotionSeconde13):
    nom_voix = "seconde-proba-fluctuation"

    OBS = [0.22, 0.29, 0.24]           # les trois fréquences observées
    COMPTES = [22, 29, 24]
    # placement des étiquettes sur l'axe : (hauteur, décalage) — 0,22 / 0,29 / 0,24
    ETIQ = [(0.8, -0.6), (0.8, 0.55), (1.45, 0.0)]

    # ── petits outils ───────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.35, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def legende_sucre(self, fs=30):
        d = Circle(radius=0.12, fill_color=SUCRE, fill_opacity=1, stroke_color=SUCRE_BORD, stroke_width=2)
        return VGroup(d, self.t("très sucré", fs, SUCRE)).arrange(RIGHT, buff=0.2)

    def un_sur_racine(self, fs=36, color=WHITE, n="n"):
        """« 1/√n » en fraction écrite."""
        return frac_txt("1", f"√{n}", fs, color)

    def intervalle(self, fs=40, color=WHITE):
        """[ p − 1/√n ; p + 1/√n ] en morceaux : self-indexable [0..6]."""
        g = VGroup(self.t("[", fs + 10, color), self.t("p −", fs, color), self.un_sur_racine(fs - 4, color),
                   self.t(";", fs, color), self.t("p +", fs, color), self.un_sur_racine(fs - 4, color),
                   self.t("]", fs + 10, color))
        return g.arrange(RIGHT, buff=0.18)

    def axe_avec_clients(self, y=-1.6, labels=True):
        """L'axe et les trois repères des clients (posés d'office)."""
        axe = Axe(y=y)
        reps = VGroup(*[axe.repere(v, c, dec(v) if labels else None, h, dx)
                        for v, c, (h, dx) in zip(self.OBS, CLIENTS, self.ETIQ)])
        return axe, reps

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La fluctuation d'échantillonnage", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        cag = VGroup(*[Cageot(0.17, graine=10 + k, bord=c) for k, c in enumerate(CLIENTS)])
        cag.arrange(RIGHT, buff=0.7).move_to(P(-0.6, 0.15))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(cag), run_time=1.0)
        self.au_mot("le hasard")
        for c, k in zip(cag, (20, 31, 26)):
            self.play(c.allumer(k, run_time=0.7))
        self.au_mot("jamais deux fois")
        self.play(*[Wiggle(c, scale_value=1.08) for c in cag], run_time=0.8)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Au marché")
        grand = Cageot(0.3, graine=1).move_to(P(-3.6, 0.2))
        self.play(FadeIn(grand, shift=UP * 0.2), run_time=0.6)
        self.au_mot("25 %")
        pc = self.t("25 %", 72, SUCRE).move_to(P(-3.6, -2.55))
        self.play(FadeIn(pc, scale=0.5), grand.allumer(25, run_time=1.2))
        self.au_mot("très sucrés")
        leg = self.legende_sucre(34).next_to(pc, RIGHT, buff=0.5)
        self.play(FadeIn(leg, shift=LEFT * 0.2), run_time=0.4)
        self.insister(pc, 0.3, 1.3)
        self.au_mot("Trois clients")
        petits = VGroup(*[Cageot(0.15, graine=20 + k, bord=c) for k, c in enumerate(CLIENTS)])
        petits.arrange(RIGHT, buff=0.45).move_to(P(2.6, 0.55))
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in petits], lag_ratio=0.3), run_time=1.0)
        self.au_mot("100")
        cents = VGroup(*[self.t("100", 36, c).next_to(p, DOWN, buff=0.3) for p, c in zip(petits, CLIENTS)])
        self.play(LaggedStart(*[FadeIn(x, scale=0.5) for x in cents], lag_ratio=0.25), run_time=0.7)
        self.attendre_voix()

    # ── 02 : trois échantillons, trois fréquences ───────────────────────────

    def ecran_resultats(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-resultats")
        self.titre_ecran("Trois échantillons")
        cag = VGroup(*[Cageot(0.22, graine=20 + k, bord=c) for k, c in enumerate(CLIENTS)])
        for c, x in zip(cag, (-4.3, -1.0, 2.3)):
            c.move_to(P(x, 1.5))
        axe = Axe(y=-1.75)
        self.play(FadeIn(cag), FadeIn(axe), run_time=0.6)
        nbs = VGroup()
        for k, mot in enumerate(["22 letchis", "Le deuxième, 29", "Le troisième, 24"]):
            self.au_mot(mot)
            n = self.t(str(self.COMPTES[k]), 40, CLIENTS[k]).next_to(cag[k], DOWN, buff=0.25)
            nbs.add(n)
            self.play(cag[k].allumer(self.COMPTES[k], run_time=1.0), FadeIn(n, scale=0.5))
        self.au_mot("Trois échantillons")
        self.play(*[Wiggle(c, scale_value=1.06) for c in cag], run_time=0.7)
        for k, mot in enumerate(["0,22", "0,29", "0,24"]):
            self.au_mot(mot)
            h, dx = self.ETIQ[k]
            r = axe.repere(self.OBS[k], CLIENTS[k], mot, h, dx)
            src = nbs[k].copy()
            self.play(ReplacementTransform(src, r[2]), GrowFromCenter(r[0]), Create(r[1]), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la fluctuation ─────────────────────────────────────────────────

    def ecran_fluctuation(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-fluctuation")
        self.titre_ecran("C'est normal")
        axe, reps = self.axe_avec_clients(y=-1.2)
        self.add(axe, reps)
        self.au_mot("d'un échantillon à l'autre")
        autres = [0.27, 0.19, 0.31, 0.25, 0.21, 0.28, 0.23, 0.33, 0.26]
        balle = Dot(axe.pt(0.24), radius=0.14, color=WHITE)
        self.add(balle)
        traces = VGroup()
        for v in autres:
            self.play(balle.animate.move_to(axe.pt(v)), run_time=0.22, rate_func=smooth)
            tr = Dot(axe.pt(v), radius=0.08, color=GREY_B)
            traces.add(tr)
            self.add(tr)
        self.play(FadeOut(balle), run_time=0.2)
        self.au_mot("la fréquence change")
        fl = DoubleArrow(axe.pt(0.18, -0.65), axe.pt(0.34, -0.65), buff=0, color=BLEU_CALCUL,
                         stroke_width=4, tip_length=0.2)
        self.play(GrowFromCenter(fl), run_time=0.5)
        self.au_mot("fluctuation d'échantillonnage")
        mot = self.t("la fluctuation d'échantillonnage", 48, BLEU_CALCUL).move_to(P(-0.6, 1.6))
        cadre = SurroundingRectangle(mot, color=BLEU_CALCUL, buff=0.25)
        self.play(Write(mot), run_time=1.0)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(mot, cadre), 0.3, 1.12)
        self.attendre_voix()

    # ── les flèches ± autour de p ───────────────────────────────────────────

    def fleches(self, axe, p, e, label_fn, dy=0.55, color=ORANGE_RETENUE):
        """Deux flèches de p vers p − e et p + e, au-dessus de l'axe, et leurs
        étiquettes (label_fn() → un Mobject neuf)."""
        g = Arrow(axe.pt(p, dy), axe.pt(p - e, dy), buff=0, color=color, stroke_width=4,
                  tip_length=0.18, max_tip_length_to_length_ratio=0.3)
        d = Arrow(axe.pt(p, dy), axe.pt(p + e, dy), buff=0, color=color, stroke_width=4,
                  tip_length=0.18, max_tip_length_to_length_ratio=0.3)
        lg = label_fn().next_to(g, UP, buff=0.12)
        ld = label_fn().next_to(d, UP, buff=0.12)
        return VGroup(g, lg), VGroup(d, ld)

    def marque_p(self, axe, label="p", color=WHITE, fs=34):
        tick = Line(axe.pt(0.25, -0.3), axe.pt(0.25, 0.3), color=color, stroke_width=5)
        t = self.t(label, fs, color).move_to(axe.pt(0.25, -0.62))
        return VGroup(tick, t)

    # ── 04 : l'intervalle de fluctuation ────────────────────────────────────

    def ecran_intervalle(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-intervalle")
        self.titre_ecran("Où tombe la fréquence ?")
        axe = Axe(y=-1.4)
        self.play(FadeIn(axe), run_time=0.5)
        self.au_mot("taille n")
        taille = VGroup(self.t("taille", 34), self.t("n", 40, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        taille.move_to(P(-5.0, 1.95))
        self.play(FadeIn(taille, shift=RIGHT * 0.2), run_time=0.4)
        f = self.intervalle(40).move_to(P(0.2, 1.95))
        mp = self.marque_p(axe)
        fg, fd = self.fleches(axe, 0.25, 0.1, lambda: self.un_sur_racine(28, ORANGE_RETENUE))
        self.au_mot("p moins 1")
        self.play(FadeIn(f[0:3], shift=DOWN * 0.15), Create(mp), run_time=0.6)
        self.play(GrowArrow(fg[0]), FadeIn(fg[1]), run_time=0.6)
        self.au_mot("et p plus")
        self.play(FadeIn(f[3:], shift=DOWN * 0.15), run_time=0.6)
        self.play(GrowArrow(fd[0]), FadeIn(fd[1]), run_time=0.6)
        bande = axe.bande(0.15, 0.35)
        self.play(FadeIn(bande), run_time=0.5)
        self.insister(f, 0.3, 1.15)
        self.au_mot("n égale 100")
        l1 = self.t("n = 100", 40, BLEU_CALCUL).move_to(P(-4.6, 0.85))
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("racine de 100")
        l2 = self.t("√100 =", 40).next_to(l1, RIGHT, buff=1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est 10")
        l2b = self.t("10", 40, BLEU_CALCUL).next_to(l2, RIGHT, buff=0.2)
        self.play(FadeIn(l2b, scale=0.5), run_time=0.3)
        self.au_mot("1 sur 10")
        fr = frac_txt("1", "10", 34, WHITE)
        eg = self.t("=", 40)
        l3 = VGroup(fr, eg).arrange(RIGHT, buff=0.2).next_to(l2b, RIGHT, buff=1.0)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("0,1")
        r = self.t("0,1", 44, ORANGE_RETENUE).next_to(l3, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=0.5), run_time=0.3)
        self.play(Create(SurroundingRectangle(r, color=ORANGE_RETENUE, buff=0.12)), run_time=0.3)
        n1 = self.t("0,1", 30, ORANGE_RETENUE).move_to(fg[1])
        n2 = self.t("0,1", 30, ORANGE_RETENUE).move_to(fd[1])
        self.play(Transform(fg[1], n1), Transform(fd[1], n2), run_time=0.6)
        self.insister(VGroup(fg[1], fd[1]), 0.3, 1.3)
        self.attendre_voix()

    # ── 05 : p = 0,25 → [0,15 ; 0,35] ───────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calcul")
        self.titre_ecran("Avec les letchis")
        axe = Axe(y=-1.4)
        mp = self.marque_p(axe)
        fg, fd = self.fleches(axe, 0.25, 0.1, lambda: self.t("0,1", 30, ORANGE_RETENUE))
        self.add(axe, mp, fg, fd)
        self.au_mot("p égale")
        l1 = self.t("p = 0,25", 44, WHITE).move_to(P(-4.2, 1.7))
        l1[2:].set_color(SUCRE)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        p25 = self.t("0,25", 28, SUCRE).move_to(mp[1])
        self.play(Transform(mp[1], p25), run_time=0.5)
        self.insister(mp[1], 0.3, 1.4)
        self.au_mot("0,15")
        bande = axe.bande(0.15, 0.35)
        b1 = axe.borne(0.15, BANDE, 32)
        intv = VGroup(self.t("[", 50, BANDE), self.t("0,15", 44, BANDE), self.t(";", 44, BANDE),
                      self.t("0,35", 44, BANDE), self.t("]", 50, BANDE)).arrange(RIGHT, buff=0.2)
        intv.move_to(P(1.6, 1.7))
        self.play(FadeIn(b1, scale=0.5), FadeIn(intv[:3], shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("0,35")
        b2 = axe.borne(0.35, BANDE, 32)
        self.play(FadeIn(b2, scale=0.5), FadeIn(intv[3:], shift=DOWN * 0.15), FadeIn(bande), run_time=0.6)
        self.play(Create(SurroundingRectangle(intv, color=BANDE, buff=0.18)), run_time=0.4)
        self.au_mot("Les trois clients")
        self.play(FadeOut(VGroup(fg, fd)), run_time=0.3)
        reps = VGroup(*[axe.repere(v, c, dec(v), h, dx) for v, c, (h, dx) in zip(self.OBS, CLIENTS, self.ETIQ)])
        self.play(LaggedStart(*[FadeIn(r, shift=DOWN * 0.4) for r in reps], lag_ratio=0.3), run_time=1.0)
        self.au_mot("dedans")
        ok = self.coche(taille=0.32).next_to(bande, RIGHT, buff=0.35).shift(UP * 0.5)
        self.play(Indicate(bande, color=VERT_OK, scale_factor=1.08), Create(ok), run_time=0.7)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        axe = Axe(y=-1.4)
        bande = axe.bande(0.15, 0.35)
        bornes = VGroup(axe.borne(0.15, BANDE, 32), axe.borne(0.35, BANDE, 32))
        self.add(axe, bande, bornes)
        self.au_mot("0,29")
        r = axe.repere(0.29, CLIENTS[1], "0,29", 0.75, 0.45)
        self.play(FadeIn(r, shift=DOWN * 0.4), run_time=0.5)
        self.insister(r[2], 0.3, 1.4)
        self.au_mot("le vendeur ment")
        faux = VGroup(self.t("0,29", 44, CLIENTS[1]), self.t("→", 44),
                      self.t("le vendeur ment ?", 44, ROUGE_ERREUR)).arrange(RIGHT, buff=0.3)
        faux.move_to(P(-0.6, 1.5))
        self.play(FadeIn(faux, shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("est dans l'intervalle")
        self.play(Create(self.barrer(faux[2])), run_time=0.4)
        self.play(Indicate(bande, color=BANDE, scale_factor=1.1), Flash(r[0], color=VERT_OK), run_time=0.8)
        self.au_mot("fluctuation normale")
        bon = VGroup(self.t("fluctuation normale", 44, VERT_OK), self.coche(taille=0.3)).arrange(RIGHT, buff=0.3)
        bon.next_to(faux, DOWN, buff=0.55)
        self.play(FadeIn(bon[0], shift=UP * 0.15), run_time=0.5)
        self.play(Create(bon[1]), run_time=0.4)
        self.insister(bon[0], 0.3, 1.2)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("400 letchis")
        cag = Cageot(0.13, 20, 20, graine=4).move_to(P(-4.0, 0.3))
        self.play(FadeIn(cag, shift=UP * 0.2), run_time=0.6)
        n = self.t("n = 400", 48, BLEU_CALCUL).move_to(P(1.2, 1.4))
        self.play(FadeIn(n, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(n, 0.3, 1.2)
        self.au_mot("entre quelles valeurs")
        q = VGroup(self.t("[", 56, WHITE), self.t("?", 50, ORANGE_RETENUE), self.t(";", 50, WHITE),
                   self.t("?", 50, ORANGE_RETENUE), self.t("]", 56, WHITE)).arrange(RIGHT, buff=0.3)
        q.move_to(P(1.2, 0.0))
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(q, 0.3, 1.2)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        axe = Axe(y=-1.4)
        ancienne = DashedVMobject(axe.bande(0.15, 0.35, GREY_B, opacite=0.0), num_dashes=40)
        mp = self.marque_p(axe)
        self.add(axe, ancienne, mp)
        self.au_mot("Racine de 400")
        l1 = self.t("√400 =", 42).move_to(P(-4.6, 1.75))
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est 20")
        l1b = self.t("20", 42, BLEU_CALCUL).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l1b, scale=0.5), run_time=0.3)
        self.au_mot("1 sur 20")
        l2 = VGroup(frac_txt("1", "20", 34, WHITE), self.t("=", 42)).arrange(RIGHT, buff=0.2)
        l2.next_to(l1b, RIGHT, buff=1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("0,05")
        r = self.t("0,05", 44, ORANGE_RETENUE).next_to(l2, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=0.5), run_time=0.3)
        fg, fd = self.fleches(axe, 0.25, 0.05, lambda: self.t("0,05", 30, ORANGE_RETENUE))
        fg[1].shift(LEFT * 0.4)
        fd[1].shift(RIGHT * 0.4)
        self.play(GrowArrow(fg[0]), GrowArrow(fd[0]), FadeIn(fg[1]), FadeIn(fd[1]), run_time=0.6)
        self.au_mot("Entre 0,20")
        bande = axe.bande(0.20, 0.30)
        b1 = axe.borne(0.20, BANDE, 32).shift(LEFT * 0.12)
        intv = VGroup(self.t("[", 52, VERT_OK), self.t("0,20", 46, VERT_OK), self.t(";", 46, VERT_OK),
                      self.t("0,30", 46, VERT_OK), self.t("]", 52, VERT_OK)).arrange(RIGHT, buff=0.2)
        intv.move_to(P(-0.6, 0.45))
        self.play(FadeIn(b1, scale=0.5), FadeIn(intv[:3], shift=DOWN * 0.15), FadeOut(mp[1]), run_time=0.5)
        self.au_mot("et 0,30")
        b2 = axe.borne(0.30, BANDE, 32).shift(RIGHT * 0.12)
        self.play(FadeIn(b2, scale=0.5), FadeIn(intv[3:], shift=DOWN * 0.15), FadeIn(bande), run_time=0.6)
        self.play(Create(SurroundingRectangle(intv, color=VERT_OK, buff=0.18)), run_time=0.4)
        self.insister(bande, 0.3, 1.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = VGroup(self.t("la fréquence change d'un échantillon à l'autre :", fs),
                    self.t("c'est la fluctuation", fs, BLEU_CALCUL)).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        l2 = VGroup(self.t("le plus souvent dans", fs), self.intervalle(fs, BANDE)).arrange(RIGHT, buff=0.3)
        l3 = VGroup(self.t("plus n est grand,", fs), self.t("plus l'intervalle est étroit", fs, VERT_OK)
                    ).arrange(RIGHT, buff=0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.85)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.5, 0.25))
        for mot, l in zip(["La fréquence change", "Elle tombe le plus souvent", "Plus n est grand"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 14")
        self.play(Write(self.chute("Épisode 14 : la loi des grands nombres", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre (modèle : stmg/proba_au_moins_un.py)."""
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
        self.ecran_resultats()
        self.ecran_fluctuation()
        self.ecran_intervalle()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
