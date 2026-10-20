# proba_ech_rare.py
# EleveAI — Maths STMG — série « Probabilités » : décider si une observation
# est FRÉQUENTE ou RARE dans le cadre du modèle (micro : va_ech_rare_ou_frequent,
# notion va_echantillonnage), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_ech_rare_short.py (ceinture jaune).
#
# Méthode de la série (proba_bern_epreuve.py) : une classe Base porte toutes
# les scènes ; la sous-classe ne change que l'identité.
#
# ⭐ Canvas du coach : la banque (variables-aleatoires.bank.ts, items
# stmg_va_ech_rare_tpl_1 et _tpl_2) n'a AUCUN canvas pour cette micro (QCM
# « courante ou rare ? », « peut-on douter de l'annonce ? »). La figure est
# l'AXE DES FRÉQUENCES et sa BANDE (modèle : seconde/proba2_interpreter.py),
# ici un axe de 0,35 à 0,85 sans loupe (l'écart 0,51 / 0,55 s'y lit en grand) :
# la fréquence observée tombe sur l'axe, VERTE « fréquent » dans la bande,
# ROUGE « rare » dehors. Contexte écologie : une enseigne, des clients et
# leurs sacs réutilisables.
#
# Écrans : 00 garde · 01 l'enseigne, 60 %, 400 clients, 204 · 02 204 / 400
# = 0,51 · 03 la bande 0,6 ± 0,05 : [0,55 ; 0,65] · 04 0,51 dehors : rare,
# on doute · 05 douter n'est pas prouver (une fois sur vingt) · 06 le piège :
# n = 25, marge 0,2 · 07 défi 228 / 400 · 07b correction 0,57 fréquent ·
# 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/stmg-proba-ech-rare.json (débit −7).
# Rendu (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_ech_rare.py ProbaEchRareSTMG -o eleveai-maths-stmg-proba-ech-rare --media_dir manim/scripts/stmg/media-va_ech_rare
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/36-ech-rare/.

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
from proba_pc_conditionnelle import frac, suite  # noqa: E402

BANDE = "#38BDF8"        # la bande de l'intervalle
FREQUENT = "#22C55E"     # dans la bande : fréquent
RARE = "#EF4444"         # hors de la bande : rare
SAC = "#16A34A"          # le sac réutilisable
SAC_CLAIR = "#BBF7D0"
GRIS_CLIENT = "#94A3B8"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : l'enseigne, le sac, les clients ───────────────────────────

def feuille(s=1.0, color=SAC_CLAIR):
    f = Ellipse(width=0.5, height=0.24, fill_color=color, fill_opacity=1, stroke_width=0).rotate(0.6)
    n = Line(P(-0.18, -0.13), P(0.18, 0.13), color=SAC, stroke_width=2)
    return VGroup(f, n).scale(s)


def sac(s=1.0, color=SAC):
    """Un sac réutilisable : un cabas vert, ses deux anses, une feuille."""
    corps = Polygon(P(-0.42, 0.25), P(0.42, 0.25), P(0.36, -0.45), P(-0.36, -0.45), fill_color=color,
                    fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    a1 = Arc(radius=0.17, start_angle=0, angle=PI, color=color, stroke_width=6).move_to(P(-0.17, 0.38))
    a2 = Arc(radius=0.17, start_angle=0, angle=PI, color=color, stroke_width=6).move_to(P(0.17, 0.38))
    return VGroup(a1, a2, corps, feuille(0.75).move_to(P(0, -0.1))).scale(s)


def enseigne(s=1.0):
    """Un magasin vu de face : façade, store rayé vert, vitrine, porte, et un
    panneau avec une feuille (aucun nom)."""
    facade = Rectangle(width=3.2, height=2.2, fill_color="#F1F5F9", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).move_to(P(0, -0.3))
    panneau = RoundedRectangle(width=2.4, height=0.55, corner_radius=0.1, fill_color=SAC, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 1.15))
    logo = VGroup(feuille(1.1, WHITE), sac(0.45, "#15803D").set_stroke(WHITE, 1))
    logo.arrange(RIGHT, buff=0.25).move_to(panneau)
    store = VGroup(*[Polygon(P(-1.6 + 0.4 * k, 0.8), P(-1.2 + 0.4 * k, 0.8), P(-1.2 + 0.4 * k, 0.5),
                             P(-1.6 + 0.4 * k, 0.5), fill_color=SAC if k % 2 == 0 else WHITE, fill_opacity=1,
                             stroke_width=0) for k in range(8)])
    vitrine = Rectangle(width=1.5, height=1.0, fill_color="#BAE6FD", fill_opacity=1, stroke_color="#64748B",
                        stroke_width=2).move_to(P(-0.65, -0.35))
    porte = Rectangle(width=0.8, height=1.45, fill_color="#78350F", fill_opacity=1, stroke_width=0)
    porte.move_to(P(0.95, -0.67))
    poignee = Dot(P(0.7, -0.65), radius=0.04, color=JAUNE_TITRE)
    return VGroup(facade, store, panneau, logo, vitrine, porte, poignee).scale(s)


def bulle(contenu, sens=-1, color=WHITE, fond_c="#0F172A"):
    """Une bulle de parole autour de `contenu` ; sa pointe part du bas, vers
    la gauche (sens = −1) ou vers la droite (sens = +1)."""
    fond = RoundedRectangle(width=contenu.width + 0.6, height=contenu.height + 0.45, corner_radius=0.25,
                            fill_color=fond_c, fill_opacity=1, stroke_color=color, stroke_width=3)
    fond.move_to(contenu)
    bx = fond.get_center()[0] + (fond.width / 2 - 0.55) * sens
    by = fond.get_bottom()[1]
    tri = Polygon(P(bx - 0.2, by), P(bx + 0.2, by), P(bx + 0.35 * sens, by - 0.45),
                  fill_color=fond_c, fill_opacity=1, stroke_color=color, stroke_width=3)
    cache = Line(P(bx - 0.18, by), P(bx + 0.18, by), color=fond_c, stroke_width=6)
    return VGroup(tri, fond, cache, contenu)


def personne(color=GRIS_CLIENT, s=1.0):
    tete = Circle(radius=0.1, fill_color=color, fill_opacity=1, stroke_width=0).move_to(P(0, 0.13))
    corps = Arc(radius=0.15, start_angle=0, angle=PI, fill_color=color, fill_opacity=1,
                stroke_width=0).move_to(P(0, -0.08))
    return VGroup(tete, corps).scale(s)


def client(avec_sac=True, s=1.0, color="#CBD5E1"):
    """Un client debout (tête, corps, jambes) ; avec ou sans son sac."""
    tete = Circle(radius=0.17, fill_color=color, fill_opacity=1, stroke_width=0).move_to(P(0, 0.55))
    corps = RoundedRectangle(width=0.42, height=0.6, corner_radius=0.15, fill_color=color, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    jambes = VGroup(Line(P(-0.1, -0.25), P(-0.13, -0.7), color=color, stroke_width=7),
                    Line(P(0.1, -0.25), P(0.13, -0.7), color=color, stroke_width=7))
    g = VGroup(jambes, corps, tete)
    if avec_sac:
        g.add(sac(0.42).move_to(P(0.36, -0.15)))
    return g.scale(s)


class Foule(VGroup):
    """lignes × colonnes silhouettes grises ; lot(n) : n d'entre elles (ordre
    fixe), celles qui rapportent leur sac et passent au vert."""

    def __init__(self, lignes=20, colonnes=20, pas=0.2, s=0.55, graine=5):
        super().__init__()
        for i in range(lignes):
            for j in range(colonnes):
                self.add(personne(s=s).move_to(P(j * pas, -i * pas)))
        self.move_to(ORIGIN)
        self.ordre = list(range(lignes * colonnes))
        random.Random(graine).shuffle(self.ordre)

    def lot(self, n):
        return VGroup(*[self[i] for i in self.ordre[:n]])


# ── l'axe des fréquences, de 0,3 à 0,9, et sa bande ─────────────────────────

class AxeFreq(VGroup):
    """Un axe des fréquences de 0,35 à 0,85 (graduations tous les 0,05, aucun
    nombre écrit d'office). self.pt(v) : le point de la fréquence v."""

    V0, V1 = 0.35, 0.85

    def __init__(self, x0=-6.2, x1=4.4, y=-1.4, fs=30, h=0.5):
        super().__init__()
        self.x0, self.x1, self.y, self.fs, self.h = x0, x1, y, fs, h
        self.ligne = Arrow(P(x0 - 0.3, y), P(x1 + 0.45, y), buff=0, color=WHITE, stroke_width=4,
                           tip_length=0.22, max_tip_length_to_length_ratio=0.05)
        self.grad = VGroup()
        for i in range(int(round((self.V1 - self.V0) / 0.05)) + 1):
            v = self.V0 + i * 0.05
            g = 0.15 if round(v * 100) % 10 == 0 else 0.09
            self.grad.add(Line(self.pt(v) + DOWN * g, self.pt(v) + UP * g, color=WHITE, stroke_width=2))
        self.add(self.ligne, self.grad)

    def pt(self, v, dy=0.0):
        return P(self.x0 + (self.x1 - self.x0) * (v - self.V0) / (self.V1 - self.V0), self.y + dy)

    def bande(self, a, b, color=BANDE, opacite=0.4):
        r = Rectangle(width=self.pt(b)[0] - self.pt(a)[0], height=self.h, fill_color=color,
                      fill_opacity=opacite, stroke_color=color, stroke_width=3)
        return r.move_to((self.pt(a) + self.pt(b)) / 2)

    def borne(self, v, texte, color=BANDE, fs=None):
        t = Text(texte, font_size=fs or self.fs, color=color)
        return t.move_to(self.pt(v) + DOWN * (self.h / 2 + 0.2 + t.height / 2))

    def marque(self, v, texte, color=JAUNE_TITRE, fs=None):
        """Le trait de la proportion annoncée et sa valeur, SOUS l'axe."""
        tick = Line(self.pt(v, -0.32), self.pt(v, 0.32), color=color, stroke_width=6)
        t = Text(texte, font_size=fs or self.fs, color=color, weight=BOLD)
        t.move_to(self.pt(v) + DOWN * (self.h / 2 + 0.68 + t.height / 2))
        return VGroup(tick, t)

    def jalon(self, v, texte, color, fs=None, haut=0.95):
        """Une fréquence posée : un point sur l'axe et sa valeur au-dessus."""
        d = Dot(self.pt(v), radius=0.13, color=color).set_stroke(WHITE, 2)
        t = Text(texte, font_size=(fs or self.fs) + 6, color=color, weight=BOLD)
        t.move_to(self.pt(v) + UP * haut)
        tige = DashedLine(t.get_bottom() + DOWN * 0.05, d.get_top(), stroke_width=2, color=color,
                          dash_length=0.06)
        return VGroup(d, t, tige)


class ProbaEchRareBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-ech-rare"
    identite = "Maths — EleveAI"
    Y_AXE = -1.4

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def axe_bande(self, bornes=True, marque=True):
        """L'axe, la bande [0,55 ; 0,65], ses bornes et la marque 0,6 (rappel)."""
        a = AxeFreq(y=self.Y_AXE)
        b = a.bande(0.55, 0.65)
        g = VGroup(b, a)
        a.bornes = VGroup(a.borne(0.55, "0,55"), a.borne(0.65, "0,65"))
        a.p = a.marque(0.60, "0,6")
        if bornes:
            g.add(a.bornes)
        if marque:
            g.add(a.p)
        return a, b, g

    def poser(self, a, v, texte, color):
        """La fréquence tombe d'en haut sur l'axe, puis sa valeur au-dessus."""
        j = a.jalon(v, texte, color)
        d0 = j[0].copy().move_to(a.pt(v) + UP * 1.6)
        self.play(FadeIn(d0, scale=0.5), run_time=0.3)
        self.play(d0.animate.move_to(j[0]), run_time=0.4, rate_func=rate_functions.ease_in_quad)
        self.remove(d0)
        self.add(j[0])
        self.play(FadeIn(j[1], shift=UP * 0.15), Create(j[2]), Flash(j[0], color=color, line_length=0.2),
                  run_time=0.4)
        return j

    def verdict(self, j, texte, color, fs=40):
        m = self.t(texte, fs, color).next_to(j[1], UP, buff=0.2)
        m.set_stroke(BLACK, 0)
        self.play(FadeIn(m, scale=0.6), run_time=0.35)
        self.insister(m, 0.25, 1.35)
        return m

    def annonce(self, s=0.7, fs=40):
        """La petite enseigne et sa bulle « 60 % » (rappel de l'annonce)."""
        e = enseigne(s)
        b = bulle(self.t("60 %", fs, JAUNE_TITRE), sens=-1)
        b.next_to(e, UP, buff=0.45).shift(RIGHT * 0.6)
        return VGroup(e, b)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Fréquent ou rare ?", 58, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -3.0))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        s = sac(2.0).move_to(P(-0.6, 0.2))
        self.play(FadeIn(s, shift=UP * 0.3), run_time=0.5)
        f = self.t("fréquent ?", 46, FREQUENT).move_to(P(-4.0, 0.2))
        r = self.t("rare ?", 46, RARE).move_to(P(2.6, 0.2))
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.35)
        self.play(FadeIn(r, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("douter")
        d = self.t("douter du modèle ?", 40, ORANGE_RETENUE).move_to(P(-0.6, -1.5))
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.4)
        self.insister(d, 0.25, 1.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'enseigne, 60 %, 400 clients, 204 ─────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Les sacs réutilisables")
        e = enseigne(1.2).move_to(P(-4.6, -1.0))
        self.play(FadeIn(e, shift=UP * 0.3), run_time=0.6)
        c60 = self.t("60 %", 60, JAUNE_TITRE)
        cmot = self.t("rapportent leurs sacs", 28, WHITE)
        contenu = VGroup(c60, cmot).arrange(DOWN, buff=0.15)
        bu = bulle(contenu, sens=-1).move_to(P(-2.1, 1.45))
        self.au_mot("60 %")
        self.play(FadeIn(VGroup(*bu[:3]), scale=0.6), FadeIn(c60, scale=1.6), run_time=0.5)
        self.insister(c60, 0.25, 1.3)
        self.au_mot("rapportent leurs sacs")
        self.play(FadeIn(cmot, shift=UP * 0.1), run_time=0.4)
        # trois clients entrent dans le magasin, leur sac à la main
        porte = e[5].get_center()
        cl = VGroup(*[client(True, 0.8) for _ in range(3)]).arrange(RIGHT, buff=0.45).move_to(P(1.0, -1.6))
        self.play(FadeIn(cl, shift=LEFT * 0.4), run_time=0.4)
        self.play(LaggedStart(*[c.animate.move_to(P(porte[0], -1.3)).scale(0.6).set_opacity(0) for c in cl],
                              lag_ratio=0.35), run_time=1.6)
        self.remove(cl)
        self.au_mot("400 clients")
        foule = Foule().move_to(P(2.6, 0.75))
        n400 = self.t("400 clients", 38, BLEU_CALCUL).next_to(foule, DOWN, buff=0.3)
        self.play(FadeIn(foule, lag_ratio=0.002), FadeIn(n400, scale=1.4), run_time=0.9)
        self.au_mot("204")
        lot = foule.lot(204)
        n204 = suite(self.t("204", 40, SAC_CLAIR), sac(0.45), buff=0.2).next_to(n400, DOWN, buff=0.25)
        self.play(LaggedStart(*[p.animate.set_color(FREQUENT) for p in lot], lag_ratio=0.01), run_time=1.6)
        self.play(FadeIn(n204, scale=1.4), run_time=0.4)
        self.insister(n204[0], 0.25, 1.35)
        self.situation = (foule, n400, n204)
        self.attendre_voix()

    # ── 02 : la fréquence observée ──────────────────────────────────────────

    def ecran_frequence(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-frequence")
        self.titre_ecran("La fréquence observée")
        foule = Foule().move_to(P(-3.6, 0.3))
        for p in foule.lot(204):
            p.set_color(FREQUENT)
        self.play(FadeIn(foule), run_time=0.5)
        self.au_mot("204 sur 400")
        f = frac("204", "400", 60, WHITE, FREQUENT, BLEU_CALCUL).move_to(P(1.2, 0.3))
        self.play(FadeIn(f[0], shift=UP * 0.2), GrowFromCenter(f[1]), run_time=0.45)
        self.play(FadeIn(f[2], shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("0,51")
        r = suite(self.t("=", 64), self.t("0,51", 72, JAUNE_TITRE), buff=0.3).next_to(f, RIGHT, buff=0.35)
        self.play(FadeIn(r[0]), FadeIn(r[1], scale=1.8), run_time=0.5)
        self.insister(r[1])
        self.attendre_voix()

    # ── 03 : la bande 0,6 ± 0,05 ────────────────────────────────────────────

    def ecran_intervalle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-intervalle")
        self.titre_ecran("Si l'annonce est vraie")
        a = AxeFreq(y=self.Y_AXE)
        self.play(Create(a.ligne), FadeIn(a.grad), run_time=0.7)
        self.au_mot("95 % des cas")
        cas = suite(self.t("dans", 38), self.t("95 % des cas", 42, JAUNE_TITRE), buff=0.2).move_to(P(-0.9, 2.2))
        self.play(FadeIn(cas, shift=DOWN * 0.2), run_time=0.45)
        self.insister(cas[1], 0.25, 1.25)
        self.au_mot("0,6 moins")
        p = a.marque(0.60, "0,6")
        self.play(Create(p[0]), FadeIn(p[1], scale=1.5), run_time=0.45)
        gauche = suite(self.t("0,6", 40), self.t("−", 40), self.t("0,05", 40, ORANGE_RETENUE), buff=0.15)
        gauche.move_to(P(-3.6, 0.9))
        self.play(FadeIn(gauche, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("0,6 plus")
        droite = suite(self.t("0,6", 40), self.t("+", 40), self.t("0,05", 40, ORANGE_RETENUE), buff=0.15)
        droite.move_to(P(1.9, 0.9))
        self.play(FadeIn(droite, shift=LEFT * 0.2), run_time=0.45)
        self.au_mot(": entre 0,55")
        b = a.bande(0.6, 0.6).stretch_to_fit_width(0.02)
        self.add(b)
        self.bring_to_front(a, p)
        self.play(Transform(b, a.bande(0.55, 0.65)), run_time=0.7)
        self.bring_to_front(a, p)
        b1 = a.borne(0.55, "0,55")
        f1 = Arrow(gauche.get_bottom(), a.pt(0.55, 0.3), buff=0.12, color=ORANGE_RETENUE, stroke_width=4,
                   max_tip_length_to_length_ratio=0.15)
        self.play(GrowArrow(f1), FadeIn(b1, scale=1.4), run_time=0.45)
        self.au_mot("0,65.")
        b2 = a.borne(0.65, "0,65")
        f2 = Arrow(droite.get_bottom(), a.pt(0.65, 0.3), buff=0.12, color=ORANGE_RETENUE, stroke_width=4,
                   max_tip_length_to_length_ratio=0.15)
        self.play(GrowArrow(f2), FadeIn(b2, scale=1.4), run_time=0.45)
        self.insister(VGroup(b, b1, b2), 0.3, 1.2)
        self.attendre_voix()

    # ── 04 : 0,51 est dehors : rare, on doute ───────────────────────────────

    def ecran_decision(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-decision")
        self.titre_ecran("Fréquent ou rare ?")
        a, b, g = self.axe_bande()
        self.add(g)
        j = self.poser(a, 0.51, "0,51", RARE)
        self.au_mot("en dehors")
        fl = DoubleArrow(a.pt(0.51, 0.45), a.pt(0.55, 0.45), buff=0.02, color=RARE, stroke_width=4,
                         tip_length=0.15, max_tip_length_to_length_ratio=0.4)
        dehors = self.t("en dehors", 32, RARE).next_to(j[0], DOWN, buff=0.9).shift(LEFT * 0.6)
        self.play(GrowFromCenter(fl), Indicate(b, color=RARE, scale_factor=1.08), FadeIn(dehors), run_time=0.55)
        self.au_mot("c'est rare")
        m = self.verdict(j, "rare", RARE, 48)
        self.au_mot("si le modèle est vrai")
        cond = self.t("si le modèle est vrai", 32, WHITE).next_to(m, RIGHT, buff=0.35)
        self.play(FadeIn(cond, shift=LEFT * 0.15), run_time=0.4)
        self.au_mot("On doute")
        an = self.annonce(0.7).move_to(P(4.3, 1.75))
        self.play(FadeIn(an, shift=LEFT * 0.3), run_time=0.5)
        q = self.t("?", 72, ORANGE_RETENUE).next_to(an[1], RIGHT, buff=0.15)
        doute = self.t("on doute de l'annonce", 34, ORANGE_RETENUE).next_to(an, DOWN, buff=0.2).shift(LEFT * 0.3)
        self.play(FadeIn(q, scale=2.0), FadeIn(doute, shift=UP * 0.15), run_time=0.45)
        self.play(Wiggle(an[1]), run_time=0.7)
        self.attendre_voix()

    # ── 05 : douter n'est pas prouver ───────────────────────────────────────

    def ecran_prudence(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-prudence")
        self.titre_ecran("Attention")
        a, b, g = self.axe_bande()
        self.add(g)
        pr = suite(self.t("douter", 46, ORANGE_RETENUE), self.t("≠", 50), self.t("prouver", 46, RARE), buff=0.35)
        pr.move_to(P(-0.9, 2.2))
        self.play(FadeIn(pr, shift=DOWN * 0.2), run_time=0.5)
        self.insister(pr[1], 0.25, 1.4)
        self.au_mot("Une observation rare")
        # vingt observations : dix-neuf dans la bande, une dehors
        hauteurs = {0.56: 1, 0.57: 2, 0.58: 3, 0.59: 3, 0.60: 3, 0.61: 3, 0.62: 2, 0.63: 1, 0.64: 1}
        pts = []
        for v, h in hauteurs.items():
            for k in range(h):
                pts.append(Dot(a.pt(v, 0.45 + 0.24 * k), radius=0.1, color=FREQUENT))
        rouge = Dot(a.pt(0.69, 0.45), radius=0.1, color=RARE)
        ordre = pts[:11] + [rouge] + pts[11:]
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 1.2) for d in ordre], lag_ratio=0.15), run_time=2.4)
        self.au_mot("une fois sur vingt")
        u = self.t("environ 1 fois sur 20", 40, ORANGE_RETENUE).move_to(P(-0.9, 1.2))
        self.play(FadeIn(u, shift=UP * 0.15), Flash(rouge, color=RARE, line_length=0.25), run_time=0.5)
        self.play(rouge.animate.scale(1.8), run_time=0.3)
        self.play(rouge.animate.scale(1 / 1.8), run_time=0.3)
        self.attendre_voix()

    # ── 06 : le piège : un très petit échantillon ───────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        a = AxeFreq(y=self.Y_AXE)
        p = a.marque(0.60, "0,6")
        j = a.jalon(0.51, "0,51", RARE)
        self.add(a, p, j)
        self.au_mot("très petit échantillon")
        petite = Foule(5, 5, pas=0.36, s=1.0, graine=2).move_to(P(-3.9, 1.75))
        piege = self.t("très petit échantillon", 34, RARE).next_to(petite, DOWN, buff=0.3)
        self.play(FadeIn(petite, lag_ratio=0.05), FadeIn(piege, shift=UP * 0.15), run_time=0.7)
        self.au_mot("Sur 25 clients")
        n25 = self.t("25 clients", 40, BLEU_CALCUL).next_to(petite, RIGHT, buff=0.45)
        self.play(FadeIn(n25, scale=1.4), run_time=0.4)
        self.au_mot("la marge serait 0,2")
        b = a.bande(0.6, 0.6).stretch_to_fit_width(0.02)
        self.add(b)
        self.bring_to_front(a, p, j)
        y = -0.95
        fg = Arrow(a.pt(0.6, y - 0.05) + DOWN * 0.0, a.pt(0.4, y - 0.05), buff=0, color=ORANGE_RETENUE,
                   stroke_width=4, tip_length=0.2, max_tip_length_to_length_ratio=0.2)
        fd = Arrow(a.pt(0.6, y - 0.05), a.pt(0.8, y - 0.05), buff=0, color=ORANGE_RETENUE,
                   stroke_width=4, tip_length=0.2, max_tip_length_to_length_ratio=0.2)
        fg.shift(DOWN * 0.0)
        VGroup(fg, fd).move_to(P(a.pt(0.6)[0], a.y - 1.6))
        lg = self.t("0,2", 36, ORANGE_RETENUE).next_to(fg, DOWN, buff=0.12)
        ld = self.t("0,2", 36, ORANGE_RETENUE).next_to(fd, DOWN, buff=0.12)
        self.play(GrowArrow(fg), GrowArrow(fd), Transform(b, a.bande(0.4, 0.8)), run_time=0.8)
        self.bring_to_front(a, p, j)
        self.play(FadeIn(lg, scale=1.4), FadeIn(ld, scale=1.4), run_time=0.4)
        self.insister(VGroup(lg, ld), 0.25, 1.3)
        self.au_mot("presque tout")
        self.play(j[0].animate.set_color(FREQUENT), j[1].animate.set_color(FREQUENT),
                  j[2].animate.set_color(FREQUENT), run_time=0.5)
        nm = self.t("« normal »", 48, FREQUENT).move_to(P(1.8, 0.2))
        self.play(FadeIn(nm, scale=1.5), Indicate(b, color=FREQUENT, scale_factor=1.04), run_time=0.6)
        self.attendre_voix()

    # ── 07 : le défi ────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-defi")
        self.titre_ecran("À toi de jouer")
        a, b, g = self.axe_bande()
        self.add(g)
        self.au_mot("400 clients")
        n400 = self.t("400 clients", 40, BLEU_CALCUL).move_to(P(-4.0, 2.2))
        self.play(FadeIn(n400, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("228")
        n228 = suite(self.t("228", 44, SAC_CLAIR), self.t("rapportent leurs sacs", 36), sac(0.5), buff=0.25)
        n228.next_to(n400, RIGHT, buff=0.7)
        self.play(FadeIn(n228, shift=LEFT * 0.2), run_time=0.45)
        self.insister(n228[0], 0.25, 1.35)
        self.au_mot("Fréquent ou rare")
        q = suite(self.t("Fréquent", 44, FREQUENT), self.t("ou", 40), self.t("rare", 44, RARE),
                  self.t("?", 52, ORANGE_RETENUE), buff=0.25).move_to(P(-0.9, 0.9))
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        dq = Dot(a.pt(0.6, 0.0) + UP * 0.9, radius=0.13, color=ORANGE_RETENUE)
        self.play(FadeIn(dq), run_time=0.2)
        self.play(dq.animate.shift(LEFT * 1.5), run_time=0.5)
        self.play(dq.animate.shift(RIGHT * 3.0), run_time=0.7)
        self.play(dq.animate.shift(LEFT * 1.5), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36).shift(DOWN * 0.35)))
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a, b, g = self.axe_bande()
        self.add(g)
        self.au_mot("228 sur 400")
        f = frac("228", "400", 52, WHITE, SAC_CLAIR, BLEU_CALCUL).move_to(P(-4.6, 1.7))
        self.play(FadeIn(f[0], shift=UP * 0.2), GrowFromCenter(f[1]), FadeIn(f[2], shift=DOWN * 0.2),
                  run_time=0.5)
        self.au_mot("0,57")
        r = suite(self.t("=", 56), self.t("0,57", 60, FREQUENT), buff=0.25).next_to(f, RIGHT, buff=0.3)
        self.play(FadeIn(r, scale=1.5), run_time=0.4)
        j = self.poser(a, 0.57, "0,57", FREQUENT)
        self.au_mot("Entre 0,55")
        self.play(Indicate(VGroup(b, a.bornes), color=FREQUENT, scale_factor=1.08), run_time=0.7)
        self.au_mot("fréquent")
        m = self.verdict(j, "fréquent", FREQUENT, 48)
        self.au_mot("Rien ne contredit")
        an = self.annonce(0.7).move_to(P(4.2, 1.2))
        ok = self.coche(taille=0.3).next_to(an[1], RIGHT, buff=0.25)
        self.play(FadeIn(an, shift=LEFT * 0.3), run_time=0.5)
        self.play(Create(ok), run_time=0.4)
        del m
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 42
        l1 = VGroup(suite(self.t("Dans l'intervalle :", fs, BANDE), self.t("observation fréquente,", fs, FREQUENT),
                          buff=0.18), self.t("le modèle tient", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        l2 = VGroup(suite(self.t("En dehors :", fs, BANDE), self.t("observation rare,", fs, RARE), buff=0.18),
                    self.t("on doute du modèle", fs, ORANGE_RETENUE)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        l3 = self.t("Douter n'est pas prouver", fs)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3, aligned_edge=UP) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        for l in lignes:
            l[0].shift(DOWN * 0.15)
        if lignes.width > 12.2:
            lignes.scale_to_fit_width(12.2)
        lignes.move_to(P(-0.4, 0.5))
        for mot, l in zip(["Dans l'intervalle", "En dehors", "Douter n'est pas prouver"], lignes):
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
        self.ecran_frequence()
        self.ecran_intervalle()
        self.ecran_decision()
        self.ecran_prudence()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaEchRareSTMG(ProbaEchRareBase):
    identite = "Maths STMG — EleveAI"
