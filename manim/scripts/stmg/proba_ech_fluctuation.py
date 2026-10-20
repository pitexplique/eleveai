# proba_ech_fluctuation.py
# EleveAI — Maths STMG — série « Probabilités » : la FLUCTUATION
# D'ÉCHANTILLONNAGE observée sur des simulations (micro : va_ech_fluctuation,
# notion va_echantillonnage), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_ech_fluctuation_short.py (ceinture jaune).
#
# Méthode de la série (proba_bern_epreuve.py) : une classe Base porte toutes
# les scènes ; la sous-classe ne change que l'identité.
#
# ⭐ Canvas du coach repris : la banque (variables-aleatoires.bank.ts, item
# stmg_va_ech_fluctuation_tpl_1) montre un `stat_graph` « batons » sur carte
# blanche : un bâton gris par échantillon, la valeur écrite au-dessus en encre
# sombre. La vidéo pose ces BÂTONS (0,09 / 0,12 / 0,10 / 0,08) quand la voix
# dit le nombre, puis les fréquences tombent sur un AXE en colonnes de points :
# 100 points (un VRAI tirage figé, p = 0,1 : 99 dedans, 1 dehors), la bande p ± 0,05.
#
# Écrans : 00 garde · 01 la marque bio, 10 %, 400 personnes · 02 100
# échantillons, les bâtons, les 100 points qui tombent · 03 marge 1/√n,
# √400 = 20, 0,05 · 04 au moins 95 % entre 0,05 et 0,15 · 05 le sens · 06 le
# piège (hors de l'intervalle : rare, pas impossible) · 07 défi n = 2 500 · 07b correction 0,02 ·
# 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/stmg-proba-ech-fluctuation.json (débit −7).
# Rendu (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_ech_fluctuation.py ProbaEchFluctuationSTMG -o eleveai-maths-stmg-proba-ech-fluctuation --media_dir manim/scripts/stmg/media-va_ech_fluctuation
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/34-ech-fluctuation/.

import random
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
from proba_pc_conditionnelle import BORD, ENCRE, frac, suite  # noqa: E402

BANDE = "#38BDF8"        # la bande p ± 0,05
POINT = "#E2E8F0"        # une fréquence simulée
DEDANS = "#22C55E"       # dans la bande
DEHORS = "#EF4444"       # hors de la bande
BATON = "#64748B"        # le bâton du stat_graph (gris ardoise)
FEUILLE = "#16A34A"
FLACON = "#F5D0FE"


def P(x, y):
    return np.array([x, y, 0.0])


# ── un VRAI tirage : 100 fréquences k / 400 d'échantillons de 400, p = 0,1 ─
# Les 4 premières sont celles que dit la voix (0,09 · 0,12 · 0,10 · 0,08) ;
# les 96 autres sont un tirage binomial(400 ; 0,1) réel, figé ici pour que la
# vidéo ne dépende pas de la version de numpy :
#   numpy.random.default_rng(7).binomial(400, 0.1, 96)
# Résultat : 99 fréquences dans [0,05 ; 0,15], UNE dehors (k = 62 : 0,155).
# (Avec p = 0,1 et n = 400, la marge 1/√n est large : la propriété dit
# « AU MOINS 95 % », et ici presque toutes y sont.)

PREMIERS = [36, 48, 40, 32]
TIRES = [47, 39, 32, 48, 44, 42, 35, 43, 40, 36, 34, 38, 43, 48, 49, 38, 37, 43, 38, 46, 49, 42, 32, 48,
         42, 29, 35, 50, 38, 36, 37, 38, 47, 33, 40, 37, 40, 43, 35, 33, 49, 34, 45, 41, 41, 52, 45, 41,
         37, 38, 44, 44, 36, 23, 38, 38, 45, 50, 62, 41, 43, 39, 35, 37, 38, 52, 38, 45, 37, 48, 30, 36,
         39, 41, 30, 43, 41, 46, 39, 37, 49, 43, 43, 43, 35, 38, 35, 42, 42, 39, 42, 35, 37, 46, 41, 41]
K = PREMIERS + TIRES


def dedans(k):
    """Dans l'intervalle FERMÉ [0,05 ; 0,15], soit 20 ≤ k ≤ 60."""
    return 20 <= k <= 60


# ── l'axe des fréquences et ses colonnes de points ──────────────────────────

class AxeFreq(VGroup):
    """Un axe de 0,02 à 0,18 (graduations tous les 0,01, aucun nombre écrit).
    self.x(v) : l'abscisse écran de v ; self.case(k, rang) : la place du
    rang-ième point de la colonne k / 400."""

    V0, V1 = 0.02, 0.18

    def __init__(self, x0=-6.2, x1=4.2, y=-2.0, pas=0.17):
        super().__init__()
        self.x0, self.x1, self.y, self.pas = x0, x1, y, pas
        self.ligne = Arrow(P(x0 - 0.3, y), P(x1 + 0.45, y), buff=0, color=WHITE, stroke_width=4,
                           tip_length=0.22, max_tip_length_to_length_ratio=0.05)
        self.grad = VGroup()
        for i in range(17):
            v = self.V0 + i * 0.01
            h = 0.3 if i % 5 == 3 else 0.16
            self.grad.add(Line(self.pt(v, -h / 2), self.pt(v, h / 2), color=WHITE, stroke_width=2))
        self.add(self.ligne, self.grad)

    def x(self, v):
        return self.x0 + (self.x1 - self.x0) * (v - self.V0) / (self.V1 - self.V0)

    def pt(self, v, dy=0.0):
        return P(self.x(v), self.y + dy)

    def case(self, k, rang):
        return self.pt(k / 400, 0.16 + rang * self.pas)

    def bande(self, a, b, color=BANDE, h=2.7, opacite=0.16):
        r = Rectangle(width=self.x(b) - self.x(a), height=h, fill_color=color, fill_opacity=opacite,
                      stroke_color=color, stroke_width=3)
        return r.move_to(P((self.x(a) + self.x(b)) / 2, self.y + h / 2 - 0.05))

    def borne(self, v, texte, color=BANDE, fs=30):
        return Text(texte, font_size=fs, color=color).move_to(self.pt(v, -0.5))

    def marque_p(self, color=JAUNE_TITRE, fs=34):
        tick = Line(self.pt(0.10, -0.25), self.pt(0.10, 0.25), color=color, stroke_width=5)
        return VGroup(tick, Text("p", font_size=fs, color=color).move_to(self.pt(0.10, -0.5)))


class Nuage(VGroup):
    """Les 100 points, chacun à sa place finale (colonne k, rang dans la colonne)."""

    def __init__(self, axe, ks=K, r=0.075):
        super().__init__()
        hauteur = {}
        self.ks = list(ks)
        for k in self.ks:
            rang = hauteur.get(k, 0)
            hauteur[k] = rang + 1
            self.add(Dot(axe.case(k, rang), radius=r, color=POINT))

    def colorier(self):
        for d, k in zip(self, self.ks):
            d.set_color(DEDANS if dedans(k) else DEHORS)
        return self

    def dehors(self):
        return VGroup(*[d for d, k in zip(self, self.ks) if not dedans(k)])

    def interieur(self):
        return VGroup(*[d for d, k in zip(self, self.ks) if dedans(k)])


# ── la marque bio : un flacon et sa feuille ─────────────────────────────────

def feuille(s=1.0, color=FEUILLE):
    f = Ellipse(width=0.5, height=0.24, fill_color=color, fill_opacity=1, stroke_width=0).rotate(0.6)
    n = Line(P(-0.18, -0.13), P(0.18, 0.13), color="#BBF7D0", stroke_width=2)
    return VGroup(f, n).scale(s)


def flacon(s=1.0):
    """Un flacon de crème rose, son bouchon, son étiquette verte et sa feuille."""
    corps = RoundedRectangle(width=0.9, height=1.3, corner_radius=0.2, fill_color=FLACON, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(P(0, -0.2))
    col = Rectangle(width=0.36, height=0.18, fill_color="#E9D5FF", fill_opacity=1, stroke_width=0)
    col.move_to(P(0, 0.54))
    bouchon = RoundedRectangle(width=0.56, height=0.32, corner_radius=0.06, fill_color="#A21CAF",
                               fill_opacity=1, stroke_width=0).move_to(P(0, 0.78))
    etiq = RoundedRectangle(width=0.7, height=0.5, corner_radius=0.08, fill_color="#DCFCE7", fill_opacity=1,
                            stroke_color=FEUILLE, stroke_width=2).move_to(P(0, -0.3))
    return VGroup(corps, col, bouchon, etiq, feuille(0.9).move_to(etiq)).scale(s)


def personne(color="#94A3B8", s=1.0):
    tete = Circle(radius=0.1, fill_color=color, fill_opacity=1, stroke_width=0).move_to(P(0, 0.13))
    corps = Arc(radius=0.15, start_angle=0, angle=PI, fill_color=color, fill_opacity=1,
                stroke_width=0).move_to(P(0, -0.08))
    return VGroup(tete, corps).scale(s)


class Foule(VGroup):
    """lignes × colonnes silhouettes grises ; allumer(idx) les colore en rose
    (celles qui CLIQUENT)."""

    def __init__(self, lignes=20, colonnes=20, pas=0.2, s=0.55, graine=3):
        super().__init__()
        for i in range(lignes):
            for j in range(colonnes):
                self.add(personne(s=s).move_to(P(j * pas, -i * pas)))
        self.move_to(ORIGIN)
        self.ordre = list(range(lignes * colonnes))
        random.Random(graine).shuffle(self.ordre)

    def lot(self, n):
        return VGroup(*[self[i] for i in self.ordre[:n]])


def pub(s=1.0):
    """Un écran de téléphone : la pub du flacon et son bouton « clic »."""
    tel = RoundedRectangle(width=1.6, height=2.8, corner_radius=0.22, fill_color="#0F172A", fill_opacity=1,
                           stroke_color="#94A3B8", stroke_width=4)
    ecran = RoundedRectangle(width=1.36, height=2.4, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0)
    fl = flacon(0.85).move_to(P(0, 0.35))
    bouton = RoundedRectangle(width=1.0, height=0.36, corner_radius=0.16, fill_color="#A21CAF", fill_opacity=1,
                              stroke_width=0).move_to(P(0, -0.8))
    return VGroup(tel, ecran, fl, bouton).scale(s)


def curseur(s=1.0):
    """Une flèche de souris, dessinée."""
    f = Polygon(P(0, 0), P(0, -0.5), P(0.13, -0.38), P(0.24, -0.6), P(0.32, -0.56), P(0.21, -0.34),
                P(0.38, -0.34), fill_color=WHITE, fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
    return f.scale(s)


# ── le stat_graph « bâtons » du coach (carte blanche) ───────────────────────

class CarteBatons(VGroup):
    """Carte blanche, axe de base, une place par bâton ; baton(i, v, texte)
    renvoie (trait, point, valeur) à poser quand la voix dit le nombre."""

    def __init__(self, n=4, larg=5.2, haut=2.6, vmax=0.17):
        super().__init__()
        self.n, self.larg, self.haut, self.vmax = n, larg, haut, vmax
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.titre = Text("Fréquences de clic", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.base_y = -haut / 2 + 0.3
        self.axe = Line(P(-larg / 2 + 0.3, self.base_y), P(larg / 2 - 0.3, self.base_y), color=ENCRE,
                        stroke_width=2)
        self.add(self.carte, self.titre, self.axe)

    def baton(self, i, v, texte, fs=24):
        o = self.carte.get_center()
        slot = (self.larg - 0.6) / self.n
        x = o[0] - self.larg / 2 + 0.3 + slot * (i + 0.5)
        y0 = o[1] + self.base_y
        h = v / self.vmax * (self.haut - 1.05)
        trait = Line(P(x, y0), P(x, y0 + h), color=BATON, stroke_width=7)
        pt = Dot(P(x, y0 + h), radius=0.08, color=BATON)
        val = Text(texte, font_size=fs, color=ENCRE, weight=BOLD).next_to(pt, UP, buff=0.1)
        return VGroup(trait, pt, val)


class ProbaEchFluctuationBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-ech-fluctuation"
    identite = "Maths — EleveAI"
    Y_AXE = -2.3

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_left() + LEFT * 0.1, mob.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                    stroke_width=sw)

    def un_sur_racine(self, fs=36, color=WHITE, n="n"):
        return frac("1", f"√{n}", fs, color)

    def axe_nuage(self, opacite=1.0):
        axe = AxeFreq(y=self.Y_AXE)
        nuage = Nuage(axe)
        nuage.set_opacity(opacite)
        return axe, nuage

    def tomber(self, dots, run_time=5.0, lag=0.06):
        """Les points tombent un à un sur leur colonne."""
        return LaggedStart(*[FadeIn(d, shift=DOWN * 1.6) for d in dots], lag_ratio=lag, run_time=run_time)

    def fleches(self, axe, e, texte, dy=-0.6, color=ORANGE_RETENUE, fs=30):
        """Deux flèches de p vers p − e et p + e, SOUS l'axe, et leur nombre."""
        g = Arrow(axe.pt(0.10, dy), axe.pt(0.10 - e, dy), buff=0, color=color, stroke_width=4,
                  tip_length=0.18, max_tip_length_to_length_ratio=0.3)
        d = Arrow(axe.pt(0.10, dy), axe.pt(0.10 + e, dy), buff=0, color=color, stroke_width=4,
                  tip_length=0.18, max_tip_length_to_length_ratio=0.3)
        if not texte:
            return VGroup(g), VGroup(d)
        lg = self.t(texte, fs, color).next_to(g, DOWN, buff=0.1)
        ld = self.t(texte, fs, color).next_to(d, DOWN, buff=0.1)
        return VGroup(g, lg), VGroup(d, ld)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La fluctuation d'échantillonnage", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -3.0))
        axe = AxeFreq(x0=-5.6, x1=3.8, y=-1.9, pas=0.15)
        nuage = Nuage(axe, r=0.065)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(axe), run_time=1.0)
        self.play(self.tomber(nuage, run_time=2.4, lag=0.03))
        self.attendre_voix(marge=0.8)

    # ── 01 : la marque bio, 10 %, 400 personnes ─────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Une marque de cosmétiques bio")
        fl = flacon(1.6).move_to(P(-5.2, 0.6))
        self.play(FadeIn(fl, shift=UP * 0.3), run_time=0.6)
        self.au_mot("annonce")
        tel = pub(1.1).move_to(P(-2.4, 0.6))
        cur = curseur(1.0).move_to(tel[3].get_center() + P(0.9, -0.6))
        self.play(FadeIn(tel, shift=LEFT * 0.3), FadeIn(cur), run_time=0.6)
        self.au_mot("10 %")
        dix = self.t("10 %", 72, JAUNE_TITRE).move_to(P(-3.8, -1.9))
        self.play(cur.animate.move_to(tel[3].get_center() + P(0.12, -0.2)), run_time=0.4)
        self.play(FadeIn(dix, scale=1.8), Flash(tel[3], color=JAUNE_TITRE), tel[3].animate.set_fill("#F0ABFC"),
                  run_time=0.5)
        self.au_mot("cliquent")
        cl = self.t("cliquent", 36, "#F0ABFC").next_to(dix, RIGHT, buff=0.35)
        self.play(FadeIn(cl, shift=LEFT * 0.15), run_time=0.4)
        self.insister(dix)
        self.au_mot("400 personnes")
        foule = Foule().move_to(P(3.0, 0.75))
        n400 = self.t("400 personnes", 38, BLEU_CALCUL).next_to(foule, DOWN, buff=0.3)
        self.play(FadeIn(foule, lag_ratio=0.002), FadeIn(n400, scale=1.4), run_time=0.9)
        self.play(LaggedStart(*[p.animate.set_color("#F0ABFC") for p in foule.lot(40)], lag_ratio=0.08),
                  run_time=1.6)
        self.attendre_voix()

    # ── 02 : 100 échantillons simulés, les fréquences changent ──────────────

    def ecran_simuler(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-simuler")
        self.titre_ecran("On simule")
        carte = CarteBatons(larg=5.4, haut=2.45).move_to(P(2.6, 1.6))
        axe, nuage = self.axe_nuage()
        self.play(FadeIn(carte), FadeIn(axe), run_time=0.6)
        self.au_mot("100 échantillons")
        l1 = self.t("100 échantillons", 44, JAUNE_TITRE)
        l2 = self.t("de 400 personnes", 36, BLEU_CALCUL)
        bloc = VGroup(l1, l2).arrange(DOWN, buff=0.2, aligned_edge=LEFT).move_to(P(-4.0, 1.75))
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("de 400 personnes")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        for i, mot in enumerate(["0,09", "0,12", "0,10", "0,08"]):
            self.au_mot(mot)
            b = carte.baton(i, K[i] / 400, mot)
            d = nuage[i]
            self.play(Create(b[0]), FadeIn(b[1]), FadeIn(b[2], scale=1.5), FadeIn(d, shift=DOWN * 1.6),
                      run_time=0.45)
        self.wait(0.3)
        self.play(self.tomber(nuage[4:], run_time=6.0, lag=0.05))
        self.attendre_voix(marge=0.6)

    # ── 03 : la marge 1/√n ─────────────────────────────────────────────────

    def ecran_intervalle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-intervalle")
        self.titre_ecran("La marge de fluctuation")
        axe, nuage = self.axe_nuage(0.55)
        self.add(axe, nuage)
        x0 = -6.0
        self.au_mot("1 sur racine de n")
        l1 = suite(self.t("marge =", 44), self.un_sur_racine(40, ORANGE_RETENUE), buff=0.25)
        l1.move_to(P(x0, 2.2), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(l1[1], 0.25)
        self.au_mot("Racine de 400")
        l2 = self.t("√400 =", 44).move_to(P(x0 + 5.6, 2.2), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est 20")
        v20 = self.t("20", 44, BLEU_CALCUL).next_to(l2, RIGHT, buff=0.2)
        self.play(FadeIn(v20, scale=1.8), run_time=0.4)
        self.au_mot("vaut 0,05")
        l3 = suite(self.t("marge =", 44), self.t("0,05", 52, ORANGE_RETENUE), buff=0.25)
        l3.move_to(P(x0, 1.1), aligned_edge=LEFT)
        cad = SurroundingRectangle(l3[1], color=ORANGE_RETENUE, buff=0.12)
        fg, fd = self.fleches(axe, 0.05, "0,05")
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Create(cad), GrowArrow(fg[0]), GrowArrow(fd[0]), FadeIn(fg[1]), FadeIn(fd[1]), run_time=0.6)
        self.insister(VGroup(l3[1], cad), 0.25)
        self.attendre_voix()

    # ── 04 : au moins 95 % entre 0,05 et 0,15 ───────────────────────────────

    def ecran_proportion(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-proportion")
        self.titre_ecran("Où tombent les fréquences ?")
        axe, nuage = self.axe_nuage()
        self.add(axe, nuage)
        bande = axe.bande(0.05, 0.15)
        self.au_mot("Au moins 95 %")
        pc = suite(self.t("au moins", 38), self.t("95 %", 60, DEDANS), buff=0.25).move_to(P(-4.3, 1.9))
        self.play(FadeIn(pc, shift=RIGHT * 0.2), FadeIn(bande), run_time=0.6)
        self.insister(pc[1], 0.25)
        self.au_mot("p moins 0,05")
        mp = axe.marque_p()
        moins = self.t("p − 0,05", 40, BANDE).move_to(P(0.6, 1.9))
        self.play(Create(mp[0]), FadeIn(mp[1]), FadeIn(moins, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("p plus 0,05")
        plus = self.t("p + 0,05", 40, BANDE).next_to(moins, RIGHT, buff=0.7)
        self.play(FadeIn(plus, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("entre 0,05")
        b1 = axe.borne(0.05, "0,05")
        l2 = suite(self.t("entre", 40), self.t("0,05", 48, BANDE), buff=0.25).move_to(P(-4.0, 1.0))
        self.play(FadeIn(b1, scale=1.6), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("et 0,15")
        b2 = axe.borne(0.15, "0,15")
        l3 = suite(self.t("et", 40), self.t("0,15", 48, BANDE), buff=0.25).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(b2, scale=1.6), FadeIn(l3, shift=RIGHT * 0.15), run_time=0.5)
        self.play(Indicate(bande, color=BANDE, scale_factor=1.04), run_time=0.6)
        self.au_mot("Ici, presque toutes")
        ici = self.t("Ici : presque toutes", 38, DEDANS).to_edge(RIGHT, buff=0.4).set_y(1.0)
        self.play(FadeIn(ici, shift=LEFT * 0.15), *[d.animate.set_color(DEDANS) for d in nuage.interieur()],
                  *[d.animate.set_color(DEHORS) for d in nuage.dehors()], run_time=0.8)
        self.attendre_voix()

    # ── 05 : le sens ────────────────────────────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        self.titre_ecran("Ce que ça veut dire")
        axe, nuage = self.axe_nuage()
        nuage.colorier()
        bande = axe.bande(0.05, 0.15)
        mp = axe.marque_p()
        self.add(axe, bande, nuage, mp)
        mot = self.t("la fluctuation d'échantillonnage", 46, BLEU_CALCUL).move_to(P(-0.6, 1.9))
        cadre = SurroundingRectangle(mot, color=BLEU_CALCUL, buff=0.22)
        self.play(Write(mot), run_time=1.0)
        self.play(Create(cadre), run_time=0.4)
        self.au_mot("d'un échantillon à l'autre")
        anneau = Circle(radius=0.14, color=JAUNE_TITRE, stroke_width=5).move_to(nuage[0])
        self.play(Create(anneau), run_time=0.25)
        for i in range(1, 12):
            self.play(anneau.animate.move_to(nuage[i]), run_time=0.2)
        self.au_mot("rarement de plus de")
        self.play(FadeOut(anneau), run_time=0.2)
        fg, fd = self.fleches(axe, 0.05, None, dy=2.8, color=ORANGE_RETENUE)
        lg = self.un_sur_racine(28, ORANGE_RETENUE).next_to(fg[0], UP, buff=0.1)
        ld = self.un_sur_racine(28, ORANGE_RETENUE).next_to(fd[0], UP, buff=0.1)
        self.play(GrowArrow(fg[0]), GrowArrow(fd[0]), run_time=0.5)
        self.au_mot("1 sur racine de n")
        self.play(FadeIn(lg, scale=1.5), FadeIn(ld, scale=1.5), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        axe, nuage = self.axe_nuage()
        bande = axe.bande(0.05, 0.15)
        bornes = VGroup(axe.borne(0.05, "0,05"), axe.borne(0.15, "0,15"))
        self.add(axe, bande, bornes, nuage)
        self.play(*[d.animate.set_color(DEDANS) for d in nuage.interieur()], run_time=0.5)
        self.au_mot("croire qu'une fréquence")
        faux = self.t("Hors de l'intervalle : impossible ?", 40, ROUGE_ERREUR).move_to(P(-0.6, 2.3))
        self.play(FadeIn(faux, shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("C'est rare")
        rare = nuage.dehors()[0]
        anneau = Circle(radius=0.22, color=DEHORS, stroke_width=5).move_to(rare)
        self.play(Create(self.barrer(faux)), faux.animate.set_opacity(0.5),
                  rare.animate.set_color(DEHORS).scale(1.6), Create(anneau), run_time=0.6)
        self.play(Flash(rare, color=DEHORS, line_length=0.2), run_time=0.5)
        self.au_mot("au plus une fois sur vingt")
        r1 = suite(self.t("rare :", 40, DEHORS), self.t("au plus", 38), self.t("1 fois sur 20", 46, DEHORS),
                   buff=0.25).move_to(P(-2.0, 1.5))
        self.play(FadeIn(r1, shift=UP * 0.15), run_time=0.5)
        self.insister(r1[2], 0.25)
        self.au_mot("mais ça peut arriver")
        r2 = self.t("mais ça peut arriver", 40, ORANGE_RETENUE).move_to(P(3.0, 0.8))
        fl = Arrow(r2.get_bottom() + DOWN * 0.05, anneau.get_top() + UP * 0.05, buff=0.05, color=ORANGE_RETENUE,
                   stroke_width=4, tip_length=0.18)
        self.play(FadeIn(r2, shift=LEFT * 0.15), GrowArrow(fl), run_time=0.6)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        grille = VGroup(*[Dot(P(j * 0.072, -i * 0.072), radius=0.026, color="#F0ABFC")
                          for i in range(50) for j in range(50)]).move_to(P(-4.2, 0.1))
        self.play(FadeIn(grille, lag_ratio=0.0005), run_time=1.2)
        self.au_mot("2 500 personnes")
        n = self.t("2 500 personnes", 44, BLEU_CALCUL).move_to(P(1.6, 1.5))
        self.play(FadeIn(n, shift=RIGHT * 0.2), Indicate(grille, color=WHITE, scale_factor=1.04), run_time=0.7)
        self.insister(n, 0.3)
        self.au_mot("quelle est la marge")
        q = suite(self.t("marge =", 48), self.un_sur_racine(42, WHITE), self.t("=", 48),
                  self.t("?", 60, ORANGE_RETENUE), buff=0.25).move_to(P(1.6, 0.0))
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.6)
        self.insister(q[3], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        axe = AxeFreq(y=self.Y_AXE)
        ancienne = DashedVMobject(axe.bande(0.05, 0.15, GREY_B, opacite=0.0), num_dashes=60)
        mp = axe.marque_p()
        self.add(axe, ancienne, mp)
        x0 = -6.0
        self.au_mot("Racine de 2 500")
        l1 = self.t("√2 500 =", 46).move_to(P(x0, 2.3), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est 50")
        v50 = self.t("50", 46, BLEU_CALCUL).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(v50, scale=1.8), run_time=0.4)
        self.au_mot("1 sur 50")
        l2 = suite(self.t("marge =", 46), frac("1", "50", 40), self.t("=", 46), buff=0.25)
        l2.move_to(P(x0, 1.15), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("0,02")
        r = self.t("0,02", 54, VERT_OK).next_to(l2, RIGHT, buff=0.4)
        cad = SurroundingRectangle(r, color=VERT_OK, buff=0.12)
        fg, fd = self.fleches(axe, 0.02, "0,02", color=VERT_OK)
        bande = axe.bande(0.08, 0.12, VERT_OK, opacite=0.22)
        self.play(FadeIn(r, scale=1.8), Create(cad), run_time=0.5)
        self.play(FadeIn(bande), GrowArrow(fg[0]), GrowArrow(fd[0]), FadeIn(fg[1]), FadeIn(fd[1]),
                  FadeOut(mp[1]), run_time=0.6)
        self.insister(VGroup(r, cad), 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = suite(self.t("La fréquence", fs), self.t("fluctue", fs, BLEU_CALCUL),
                   self.t("d'un échantillon à l'autre", fs), buff=0.2)
        l2 = suite(self.t("Au moins", fs), self.t("95 %", fs + 6, DEDANS), self.t("des fréquences :", fs), buff=0.2)
        l3 = suite(self.t("à moins de", fs), self.un_sur_racine(fs - 4, ORANGE_RETENUE), self.t("de", fs),
                   self.t("p", fs + 6, JAUNE_TITRE), buff=0.22)
        l23 = VGroup(l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l23)])
        lignes[1][0].align_to(l2, UP).shift(DOWN * 0.15)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.8)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.5, 0.75))
        axe = AxeFreq(x0=-5.4, x1=3.2, y=-2.6, pas=0.13)
        nuage = Nuage(axe, r=0.055)
        bande = axe.bande(0.05, 0.15, h=2.0)
        self.au_mot("La fréquence fluctue")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(axe), run_time=0.6)
        self.play(self.tomber(nuage, run_time=2.0, lag=0.03))
        self.play(Create(lignes[0][0]), run_time=0.4)
        self.au_mot("Au moins 95 %")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeIn(bande), nuage.animate.colorier(), run_time=0.6)
        self.au_mot("à moins de 1 sur racine de n")
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(lignes[1][0]), run_time=0.4)
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
        self.ecran_simuler()
        self.ecran_intervalle()
        self.ecran_proportion()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaEchFluctuationSTMG(ProbaEchFluctuationBase):
    identite = "Maths STMG — EleveAI"
