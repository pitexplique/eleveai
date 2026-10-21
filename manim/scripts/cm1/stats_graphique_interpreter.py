# stats_graphique_interpreter.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 07 :
# INTERPRÉTER UN DIAGRAMME EN BARRES (micro du coach : `graphique_interpreter`,
# CM1 et CM2 ; canvas `stat_graph` barres, axe gradué + petits traits), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : lire des barres sur des petits traits (450,
# 350…), trouver la plus haute, voir une tendance, comparer « 3 fois plus » ;
# rien au-delà du niveau du CM. Short jumeau : stats_graphique_interpreter_short.py
# (blanche).
#
# ⭐ Décor et métier : la MÉTÉO et l'agriculture ; une PRÉVISIONNISTE MÉTÉO
# mesure la pluie dans une ville de l'Est de La Réunion (ordre de grandeur des
# normales Météo-France de l'Est, arrondies au CM : 400, 450, 350, 250, 150,
# 100 mm de janvier à juin).
# ⭐ La figure est CELLE DU COACH (manim/canvas_stats.py, Barres) : axe gradué
# de 100 en 100 avec un PETIT TRAIT à 50 ; le geste de lecture se voit
# (pointillé ambre du haut de la barre jusqu'à l'axe), puis la valeur s'écrit
# au-dessus de la barre au mot où la voix la dit.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au mot où la voix le dit.
#
# Micro → écrans : graphique_interpreter = 03 (la plus haute), 04 (la
# tendance), 05 (comparer : 3 fois plus), 06 (piège : ne pas conclure au-delà
# des données), 07 défi, 07b correction.
# Écrans : 00 garde · 01 la prévisionniste · 02 lire les barres · 03 le maximum ·
# 04 la tendance · 05 comparer · 06 le piège · 07 défi · 07b correction ·
# 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/cm-stats-graphique-interpreter.json (débit −10), WAV dans
# public/sons/cm-stats-graphique-interpreter/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_interpreter_marques.json (marques.ps1).
# ⭐ UNE voix, UN script, DEUX rendus (seule l'identité change).
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_interpreter.py StatsGraphiqueInterpreterCM1 -o eleveai-maths-cm1-stats-graphique-interpreter --media_dir manim/scripts/cm1/media-graphique-interpreter
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_interpreter.py StatsGraphiqueInterpreterCM2 -o eleveai-maths-cm2-stats-graphique-interpreter --media_dir manim/scripts/cm1/media-graphique-interpreter-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/07-graphique-interpreter/ et
#           manim/sorties/cm2/maths/statistiques/07-graphique-interpreter/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, Barres  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_graphique_completer import OutilsStats, P, croix, ile  # noqa: E402

MOIS = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin"]
MOIS_VOIX = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"]
PLUIE = [400, 450, 350, 250, 150, 100]
BLEU_PLUIE = "#60a5fa"


def nuage(echelle=1.0, couleur="#cbd5e1"):
    """Un nuage : quatre ronds fondus."""
    g = VGroup(*[Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                 for x, y, r in [(-0.55, -0.1, 0.38), (-0.1, 0.18, 0.5), (0.45, 0.02, 0.42), (0.0, -0.18, 0.36)]])
    return g.scale(echelle)


def gouttes(n=7, largeur=1.4, couleur=BLEU_PLUIE):
    """Des gouttes de pluie en quinconce (petits traits penchés)."""
    g = VGroup()
    for k in range(n):
        x = -largeur / 2 + largeur * k / max(1, n - 1)
        y = -0.25 * (k % 2)
        g.add(Line(P(x + 0.06, y + 0.12), P(x - 0.06, y - 0.12), color=couleur, stroke_width=6))
    return g


def cyclone(r=0.6, couleur="#e2e8f0"):
    """Le symbole du cyclone : un rond et deux bras en spirale."""
    centre = Circle(radius=0.18 * r / 0.6, stroke_color=couleur, stroke_width=6)
    bras = VGroup(Arc(radius=r, start_angle=0, angle=PI * 0.75, color=couleur, stroke_width=7),
                  Arc(radius=r, start_angle=PI, angle=PI * 0.75, color=couleur, stroke_width=7))
    bras[0].shift(LEFT * r * 0.5)
    bras[1].shift(RIGHT * r * 0.5)
    return VGroup(centre, bras)


def canne(h=1.2):
    """Trois tiges de canne à sucre, avec leurs nœuds et une feuille."""
    g = VGroup()
    for k, dx in enumerate([-0.25, 0, 0.25]):
        hh = h * (0.85 + 0.15 * (k == 1))
        tige = Line(P(dx, 0), P(dx, hh), color="#84cc16", stroke_width=7)
        noeuds = VGroup(*[Line(P(dx - 0.07, y), P(dx + 0.07, y), color="#3f6212", stroke_width=4)
                          for y in np.linspace(0.25, hh - 0.15, 3)])
        feuille = ArcBetweenPoints(P(dx, hh), P(dx + 0.35 * (1 if k != 0 else -1), hh - 0.3), angle=-0.8,
                                   color="#22c55e", stroke_width=5)
        g.add(VGroup(tige, noeuds, feuille))
    return g


def maison(larg=0.9):
    murs = Square(side_length=larg, fill_color="#fde68a", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    toit = Polygon(P(-larg * 0.62, larg / 2), P(larg * 0.62, larg / 2), P(0, larg * 1.05), fill_color="#dc2626",
                   fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    porte = Rectangle(width=larg * 0.25, height=larg * 0.42, fill_color="#7c2d12", fill_opacity=1,
                      stroke_width=0).move_to(P(0, -larg / 2 + larg * 0.21))
    return VGroup(murs, toit, porte)


def alerte(c=0.5):
    tri = Triangle(fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_color=WHITE, stroke_width=3).scale(c)
    ex = Text("!", font_size=int(60 * c / 0.5), color=NUIT, weight=BOLD).move_to(tri.get_center() + DOWN * 0.08 * c)
    return VGroup(tri, ex)


class StatsGraphiqueInterpreterBase(OutilsStats, Notion6e):
    nom_voix = "cm-stats-graphique-interpreter"
    fichier_marques = "stats_graphique_interpreter_marques.json"
    identite = "Maths CM1 — EleveAI"
    G = P(-3.3, -0.4)

    def graphe(self, centre=None):
        return Barres(MOIS, PLUIE, pas=100, sous_pas=50, maxi=500, couleurs=[BLEU_PLUIE] * 6,
                      nom_axe="Pluie (mm)", titre="Pluie par mois", largeur=5.0, hauteur=4.0, fs=28,
                      centre=self.G if centre is None else centre)

    def graphe_pret(self, valeurs=True):
        """Le diagramme posé d'un coup, avec les valeurs déjà dites au-dessus."""
        g = self.graphe()
        self.add(g)
        g.vals = VGroup(*[g.valeur(i, fs=26) for i in range(6)])
        if valeurs:
            self.add(g.vals)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Interpréter un diagramme en barres", 50, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.85))
        g = Barres([""] * 6, PLUIE, pas=100, maxi=500, couleurs=[BLEU_PLUIE] * 6, largeur=3.6, hauteur=2.2, fs=24,
                   centre=P(-0.6, 0.15))
        for nb in g.nombres.values():
            nb.set_opacity(0)
        nu = nuage(0.8).move_to(P(2.6, 1.0))
        pluie = gouttes(5, 0.9).next_to(nu, DOWN, buff=0.15)
        self.au_mot("Ce diagramme")
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.6)
        self.play(g.pousser(run_time=0.9))
        self.au_mot("la saison des pluies")
        self.play(FadeIn(nu, shift=DOWN * 0.2), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.3) for d in pluie], lag_ratio=0.15), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : la prévisionniste météo ────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une prévisionniste météo")
        nu = nuage(1.1).move_to(P(-4.0, 2.2))
        pluie = gouttes(7, 1.5).next_to(nu, DOWN, buff=0.2)
        metier = self.t("Prévisionniste météo", 42, BLEU_CALCUL).move_to(P(-3.6, 0.35))
        self.play(FadeIn(nu, shift=DOWN * 0.2), Write(metier), run_time=0.7)
        self.au_mot("mesure la pluie")
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.3) for d in pluie], lag_ratio=0.12), run_time=0.7)
        self.au_mot("l'Est de La Réunion")
        carte = ile(1.2).move_to(P(3.0, 1.9))
        nom = self.t("La Réunion", 36, VERT_OK).next_to(carte, UP, buff=0.2)
        est = Dot(carte.get_right() + LEFT * 0.25 + UP * 0.1, radius=0.13, color=ROUGE_ERREUR)
        lest = self.t("l'Est", 34, ROUGE_ERREUR).next_to(carte, RIGHT, buff=0.25).match_y(est)
        self.play(DrawBorderThenFill(carte), FadeIn(nom), run_time=0.7)
        self.play(GrowFromCenter(est), FadeIn(lest, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("aider les agriculteurs")
        cn = canne(1.2).move_to(P(-4.0, -1.85))
        agri = self.t("les agriculteurs", 34).next_to(cn, RIGHT, buff=0.35)
        self.play(GrowFromEdge(cn, DOWN), FadeIn(agri, shift=LEFT * 0.2), run_time=0.7)
        self.au_mot("prévenir les habitants")
        ms = VGroup(maison(0.75), alerte(0.42)).arrange(RIGHT, buff=0.25).move_to(P(2.3, -1.8))
        hab = self.t("les habitants", 34).next_to(ms, RIGHT, buff=0.3)
        self.play(FadeIn(ms[0], shift=UP * 0.2), FadeIn(hab, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("grosses pluies")
        self.play(GrowFromCenter(ms[1]), run_time=0.35)
        self.play(Indicate(ms[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 02 : lire les barres ────────────────────────────────────────────────

    def ecran_barres(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-barres")
        g = self.graphe()
        self.add(g)
        unite = self.col(self.t("en millimètres (mm)", 36, BLEU_CALCUL), 2.5)
        lignes = VGroup()
        for i, (m, v) in enumerate(zip(MOIS_VOIX, PLUIE)):
            self.au_mot(m)
            tr = g.vers_axe(i)
            self.play(g.focus(i, 0.35), Create(tr), run_time=0.35)
            if i == 0:
                self.play(FadeIn(unite, shift=RIGHT * 0.2), run_time=0.25)
            val = g.valeur(i, fs=26)
            lg = self.ligne([(MOIS_VOIX[i] + " :", WHITE), (str(v), BLEU_PLUIE)], 34)
            lignes.add(lg)
            self.col(lg, 1.85 - 0.6 * i)
            self.play(FadeIn(val, scale=1.6), FadeIn(lg, shift=RIGHT * 0.2), FadeOut(tr), run_time=0.3)
        self.play(g.rallumer(), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le mois le plus pluvieux ───────────────────────────────────────

    def ecran_max(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-max")
        g = self.graphe_pret()
        self.au_mot("Le mois le plus pluvieux")
        q = self.col(self.t("Le mois le plus pluvieux ?", 40, JAUNE_TITRE), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("La barre la plus haute")
        haute = self.col(self.t("La barre la plus haute", 38), 1.3)
        self.play(FadeIn(haute, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05) for b in g.barres], lag_ratio=0.15),
                  run_time=0.9)
        self.au_mot("février")
        fl = g.monter(1)
        res = self.col(self.ligne([("Février :", WHITE), ("450", BLEU_PLUIE), ("mm", WHITE)], 48), 0.1)
        self.play(g.focus(1, 0.35), GrowArrow(fl), FadeIn(res[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("avec 450")
        tr = g.vers_axe(1)
        self.play(Create(tr), FadeIn(res[1:], scale=1.5), run_time=0.5)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(g.vals[1], 1.5, 0.3)
        self.attendre_voix()

    # ── 04 : la tendance ────────────────────────────────────────────────────

    def ecran_tendance(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-tendance")
        g = self.graphe_pret()
        self.au_mot("je vois une histoire")
        hist = self.col(self.t("Une histoire", 46, JAUNE_TITRE), 2.6)
        self.play(Write(hist), run_time=0.5)
        self.au_mot("de février à juin")
        self.play(g.estomper([1, 2, 3, 4, 5], 0.3), run_time=0.4)
        self.au_mot("les barres descendent")
        hauts = [g.vals[i].get_top() + UP * 0.12 for i in (1, 5)]
        fl = Arrow(hauts[0], hauts[1], buff=0, color=ORANGE_RETENUE, stroke_width=8,
                   max_tip_length_to_length_ratio=0.1)
        desc = self.col(self.t("Les barres descendent", 38), 1.6)
        self.play(GrowArrow(fl), FadeIn(desc, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("La pluie diminue")
        dim = self.col(self.t("La pluie diminue.", 38, ORANGE_RETENUE), 0.85)
        self.play(FadeIn(dim, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Au début de l'année")
        self.play(g.estomper([0, 1, 2], 0.3), FadeOut(fl), run_time=0.4)
        accol = Brace(VGroup(*g.vals[0:3]), UP, buff=0.08, color=JAUNE_TITRE)
        ete = self.col(self.t("Au début de l'année : l'été", 36, JAUNE_TITRE), -0.05)
        self.play(FadeIn(accol), FadeIn(ete, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("la saison des pluies")
        cy = cyclone(0.42).move_to(P(1.45, -1.2))
        sais = VGroup(self.t("la saison des pluies", 36), self.t("et des cyclones", 36))
        sais.arrange(DOWN, aligned_edge=LEFT, buff=0.12).next_to(cy, RIGHT, buff=0.35)
        self.play(FadeIn(sais[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("des cyclones")
        self.play(FadeIn(sais[1], shift=RIGHT * 0.2), FadeIn(cy, scale=0.5), run_time=0.4)
        self.play(Rotate(cy, -TAU, run_time=1.2, rate_func=smooth))
        self.attendre_voix()

    # ── 05 : comparer (3 fois plus) ─────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-comparer")
        g = self.graphe_pret()
        self.au_mot("En février")
        self.play(g.estomper([1, 4], 0.25), run_time=0.4)
        phrase = self.col(self.ligne([("Février", WHITE), ("=", WHITE), ("3", JAUNE_TITRE), ("fois", WHITE),
                                      ("mai", WHITE)], 44), 2.2)
        self.play(FadeIn(phrase[0], shift=RIGHT * 0.2), Indicate(g.barres[1], color=WHITE, scale_factor=1.05),
                  run_time=0.4)
        self.au_mot("3 fois plus")
        h0 = g.barres[4].height
        x1 = g.barres[1].get_center()[0]
        pile = VGroup()
        for k in range(3):
            c = g.barres[4].copy().set_fill(BLEU_PLUIE, opacity=0.6).set_stroke(JAUNE_TITRE, 5)
            pile.add(c.move_to(P(x1, g.base(1)[1] + h0 * (k + 0.5))))
        self.play(FadeIn(phrase[1:3], scale=1.4), TransformFromCopy(g.barres[4], pile[0]), run_time=0.35)
        self.play(TransformFromCopy(g.barres[4], pile[1]), run_time=0.25)
        self.play(TransformFromCopy(g.barres[4], pile[2]), run_time=0.25)
        self.au_mot("qu'en mai")
        self.play(FadeIn(phrase[3:], shift=RIGHT * 0.2), Indicate(g.barres[4], color=WHITE), run_time=0.4)
        calc = self.ligne([("150", BLEU_PLUIE), ("×", WHITE), ("3", JAUNE_TITRE), ("=", WHITE), ("450", BLEU_PLUIE)],
                          54, 0.25)
        self.col(calc, 0.6)
        self.au_mot("150 fois 3")
        self.play(FadeIn(calc[:3], shift=RIGHT * 0.2), Indicate(g.vals[4], color=AMBRE, scale_factor=1.4),
                  run_time=0.5)
        self.au_mot("égale 450")
        self.play(FadeIn(calc[3:], shift=RIGHT * 0.2), Indicate(g.vals[1], color=AMBRE, scale_factor=1.4),
                  run_time=0.5)
        cadre = SurroundingRectangle(calc, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(calc, cadre), 1.12, 0.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def calendrier(self):
        """Les 12 mois en cases : les 6 du diagramme en bleu, les 6 autres « ? »."""
        cases = VGroup()
        for k in range(12):
            vu = k < 6
            r = RoundedRectangle(width=0.4, height=0.5, corner_radius=0.06, stroke_color=WHITE, stroke_width=2,
                                 fill_color=BLEU_PLUIE if vu else "#334155", fill_opacity=1)
            lettre = "JFMAMJJASOND"[k]
            t = Text(lettre if vu else "?", font_size=24, color=NUIT if vu else "#cbd5e1", weight=BOLD).move_to(r)
            cases.add(VGroup(r, t))
        return cases.arrange(RIGHT, buff=0.06)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.3)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("les barres descendent")
        hauts = [g.vals[i].get_top() + UP * 0.12 for i in (1, 5)]
        fl = Arrow(hauts[0], hauts[1], buff=0, color=ORANGE_RETENUE, stroke_width=8,
                   max_tip_length_to_length_ratio=0.1)
        d1 = self.col(self.t("« Les barres descendent,", 36), 2.4)
        self.play(GrowArrow(fl), FadeIn(d1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("donc qu'il ne pleuvra plus")
        d2 = self.col(self.t("donc il ne pleuvra plus. »", 36, ORANGE_RETENUE), 1.75)
        self.play(FadeIn(d2, shift=RIGHT * 0.2), run_time=0.4)
        x = croix(VGroup(d1, d2), sw=6)
        self.play(Create(x), run_time=0.4)
        self.au_mot("six mois")
        cal = self.col(self.calendrier(), 0.55)
        six = self.col(self.ligne([("Seulement", WHITE), ("6", JAUNE_TITRE), ("mois", WHITE)], 38), -0.3)
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cal[:6]], lag_ratio=0.1), FadeIn(six), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cal[6:]], lag_ratio=0.1), run_time=0.6)
        self.au_mot("Je ne conclus")
        ok = VGroup(self.coche(VERT_OK, 0.28), VGroup(self.t("Je ne conclus que", 36, VERT_OK),
                                                       self.t("sur ce que je vois.", 36, VERT_OK))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.12)).arrange(RIGHT, buff=0.3)
        self.col(ok, -1.5)
        self.play(FadeIn(ok, shift=UP * 0.2), Indicate(cal[:6], color=WHITE, scale_factor=1.08), run_time=0.6)
        self.insister(ok, 1.08, 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Combien de millimètres")
        q = VGroup(self.t("Combien de millimètres", 38), self.t("de pluie en tout,", 38))
        self.col(q.arrange(DOWN, aligned_edge=LEFT, buff=0.15), 1.25)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("de janvier à mars")
        q2 = self.col(self.t("de janvier à mars ?", 38, BLEU_PLUIE), 0.25)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), g.estomper([0, 1, 2], 0.3), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -0.9)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe_pret()
        self.play(g.estomper([0, 1, 2], 0.3), run_time=0.01)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.5)
        somme = self.ligne([("400", BLEU_PLUIE), ("+", WHITE), ("450", BLEU_PLUIE), ("+", WHITE), ("350", BLEU_PLUIE)],
                           56, 0.25)
        self.col(somme, 1.1)
        for k, (mot, idx) in enumerate([("400 plus", [0, 1]), ("450 plus", [2, 3]), ("350, égale", [4])]):
            self.au_mot(mot)
            self.play(*[FadeIn(somme[j], scale=1.5) for j in idx], Indicate(g.vals[k], color=AMBRE, scale_factor=1.4),
                      run_time=0.4)
        self.au_mot("1 200")
        tot = self.ligne([("=", WHITE), ("1 200", VERT_OK), ("mm", WHITE)], 56, 0.25)
        tot.next_to(somme, DOWN, buff=0.4).align_to(somme, LEFT)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.4)
        cadre = SurroundingRectangle(VGroup(somme, tot), color=VERT_OK, buff=0.22, corner_radius=0.15, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(tot[1], 1.4, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Plus haute,", "plus basse :", "je compare."),
                              ("Les barres montent", "ou descendent ?"),
                              ("Je dis ce que", "ça raconte, sans", "aller plus loin.")], fs=34)
        self.au_mot("la barre la plus haute")
        self.play(FadeIn(lignes[0][1][0], shift=RIGHT * 0.2), g.focus(1, 0.4), run_time=0.5)
        self.au_mot("et la plus basse")
        self.play(FadeIn(lignes[0][1][1], shift=RIGHT * 0.2), g.focus(5, 0.4), run_time=0.4)
        self.au_mot("Je compare")
        self.play(FadeIn(lignes[0][1][2], shift=RIGHT * 0.2), Create(lignes[0][0]), g.estomper([1, 5], 0.4),
                  run_time=0.5)
        self.au_mot("Je regarde si")
        fl = Arrow(g.vals[1].get_top() + UP * 0.12, g.vals[5].get_top() + UP * 0.12, buff=0, color=ORANGE_RETENUE,
                   stroke_width=7, max_tip_length_to_length_ratio=0.1)
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), g.rallumer(), GrowArrow(fl), run_time=0.7)
        self.play(Create(lignes[1][0]), run_time=0.3)
        self.au_mot("Puis je dis")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("sans aller plus loin")
        self.play(Create(lignes[2][0]), run_time=0.4)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_barres()
        self.ecran_max()
        self.ecran_tendance()
        self.ecran_comparer()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsGraphiqueInterpreterCM1(StatsGraphiqueInterpreterBase):
    identite = "Maths CM1 — EleveAI"


class StatsGraphiqueInterpreterCM2(StatsGraphiqueInterpreterBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
