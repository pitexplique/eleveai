# proba2_reunion.py
# EleveAI — Maths 2de — série « Probabilités », épisode 5 : A ∩ B et A ∪ B
# (micro : proba_reunion_intersection), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba2_reunion_short.py (ceinture jaune).
#
# Le dessin : les 32 cartes en GRILLE 4 × 8 (lignes = couleurs ♥ ♦ ♣ ♠,
# colonnes = 7, 8, 9, 10, V, D, R, As). A = la rangée cœur (cadre bleu),
# B = les colonnes figures V, D, R (cadre orange) ; A ∩ B = les 3 cartes au
# croisement (vert) ; A ∪ B = 17 cartes ; dans le piège, les 3 cartes comptées
# deux fois clignotent.
#
# Écrans : 00 garde · 01 la situation · 02 A ∩ B · 03 A ∪ B · 04 « ou »
# inclusif · 05 le piège 8 + 12 · 06 défi C ∩ B · 06b correction · 07 ce que
# tu as appris · 08 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! »).
#
# ⭐ Canvas du coach repris : les questions de la micro s'écrivent avec des
# ENSEMBLES d'issues ({2 ; 4 ; 6}, A ∩ B, A ∪ B) et, pour le calcul, le
# canvas « tableau » de ProbabilitesCanvas.tsx. Ici l'univers est un jeu de
# cartes : la grille joue le rôle de la liste des issues, et les cases
# allumées reprennent la convention du coach (surlignage ambre/couleur).
#
# Voix : manim/voix/seconde-proba-reunion.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_reunion.py Proba2Reunion -o eleveai-maths-seconde-proba-reunion --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/05-reunion-intersection/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

CARTE_ROUGE = "#DC2626"
CARTE_NOIRE = "#111827"
VALEURS = ["7", "8", "9", "10", "V", "D", "R", "As"]
# ♥ et ♦ côte à côte : les rouges forment un seul bloc (défi C).
ENSEIGNES = [("♥", CARTE_ROUGE), ("♦", CARTE_ROUGE), ("♣", CARTE_NOIRE), ("♠", CARTE_NOIRE)]
FIGURES = (4, 5, 6)          # colonnes V, D, R
COEUR = 0                    # la rangée cœur
COUL_A = BLEU_CALCUL
COUL_B = ORANGE_RETENUE
COUL_INTER = VERT_OK
COUL_C = "#F43F5E"
ETEINT = 0.2


def P(x, y):
    return np.array([x, y, 0.0])


def frac_txt(num, den, fs=40, color=WHITE):
    """Une fraction écrite (sans LaTeX) : numérateur, barre, dénominateur."""
    n = Text(str(num), font_size=fs, color=color, weight=BOLD)
    d = Text(str(den), font_size=fs, color=color, weight=BOLD)
    larg = max(n.width, d.width) + 0.12
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3)
    return VGroup(n, barre, d).arrange(DOWN, buff=0.07)


def carte(valeur, enseigne, couleur, w=0.72, h=0.95, police=17):
    """Une carte à jouer : coin (valeur + enseigne) en haut à gauche, enseigne au centre."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=2)
    coin = VGroup(Text(valeur, font_size=police, color=couleur, weight=BOLD),
                  Text(enseigne, font_size=police, color=couleur)).arrange(DOWN, buff=0.02)
    coin.move_to(fond.get_corner(UL) + P(0.05 + coin.width / 2, -0.05 - coin.height / 2))
    centre = Text(enseigne, font_size=int(police * 2.0), color=couleur)
    centre.move_to(fond.get_center() + P(0.06, -0.1))
    return VGroup(fond, coin, centre)


class Grille(VGroup):
    """Les 32 cartes en 4 × 8. self.c[r][k] : la carte de la ligne r, colonne k."""

    def __init__(self, centre, w=0.72, h=0.95, dx=0.82, dy=1.05, police=17):
        super().__init__()
        self.c = []
        self.dx, self.dy = dx, dy
        for r, (ens, coul) in enumerate(ENSEIGNES):
            ligne = []
            for k, v in enumerate(VALEURS):
                c = carte(v, ens, coul, w, h, police).move_to(centre + P((k - 3.5) * dx, (1.5 - r) * dy))
                ligne.append(c)
                self.add(c)
            self.c.append(ligne)

    def toutes(self):
        return [(r, k) for r in range(4) for k in range(8)]

    def groupe(self, cases):
        return VGroup(*[self.c[r][k] for r, k in cases])

    def allumer(self, cases):
        """Animations : les cartes de `cases` pleines, les autres éteintes."""
        on = set(cases)
        return [self.c[r][k].animate.set_opacity(1 if (r, k) in on else ETEINT) for r, k in self.toutes()]

    def poser(self, cases):
        """Même chose, sans animation."""
        on = set(cases)
        for r, k in self.toutes():
            self.c[r][k].set_opacity(1 if (r, k) in on else ETEINT)

    def cadre_lignes(self, r0, r1, color, sw=6):
        g = VGroup(*[self.c[r][k] for r in range(r0, r1 + 1) for k in range(8)])
        return SurroundingRectangle(g, color=color, buff=0.06, stroke_width=sw, corner_radius=0.08)

    def cadre_colonnes(self, k0, k1, color, sw=6):
        g = VGroup(*[self.c[r][k] for r in range(4) for k in range(k0, k1 + 1)])
        return SurroundingRectangle(g, color=color, buff=0.1, stroke_width=sw, corner_radius=0.08)

    def halo(self, r, k, color, sw=6):
        return SurroundingRectangle(self.c[r][k], color=color, buff=0.03, stroke_width=sw, corner_radius=0.07)


# Les ensembles d'issues.
CASES_A = [(COEUR, k) for k in range(8)]
CASES_B = [(r, k) for r in range(4) for k in FIGURES]
CASES_INTER = [(COEUR, k) for k in FIGURES]
CASES_B_SEUL = [(r, k) for r in range(1, 4) for k in FIGURES]
CASES_UNION = CASES_A + CASES_B_SEUL
CASES_C_INTER_B = [(r, k) for r in (0, 1) for k in FIGURES]


class NotionSeconde2(Notion6e):
    identite = "Maths 2de — EleveAI"


C_GRILLE = P(-3.3, -0.15)
PX = 1.45                    # bord gauche du panneau des maths (à droite de la grille)


class Proba2Reunion(NotionSeconde2):
    nom_voix = "seconde-proba-reunion"

    # ── outils ──────────────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=36, buff=0.18):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def panneau(self, mob, y, largeur=5.4):
        """Pose une ligne du panneau de droite, calée à gauche."""
        if mob.width > largeur:
            mob.scale_to_fit_width(largeur)
        return mob.move_to(P(0, y)).align_to(P(PX, 0), LEFT)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.3, height=lbl.height + 0.22, corner_radius=0.1,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def proba(self, quoi, fs=38, color=WHITE):
        return self.t(f"P({quoi}) =", fs, color)

    def grille(self):
        return Grille(C_GRILLE)

    def cadres_AB(self, g):
        """Les cadres et les étiquettes de A (rangée cœur) et de B (figures)."""
        ca = g.cadre_lignes(COEUR, COEUR, COUL_A)
        cb = g.cadre_colonnes(FIGURES[0], FIGURES[-1], COUL_B)
        ta = self.etiquette("A", COUL_A, 30).next_to(ca, RIGHT, buff=0.15)
        tb = self.etiquette("B", COUL_B, 30).next_to(cb, UP, buff=0.12)
        return ca, ta, cb, tb

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Inter et union", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        inter = self.ligne([("A", COUL_A), ("∩", WHITE), ("B", COUL_B)], 72, 0.25).move_to(P(-3.3, 0.6))
        union = self.ligne([("A", COUL_A), ("∪", WHITE), ("B", COUL_B)], 72, 0.25).move_to(P(2.1, 0.6))
        self.au_mot("A inter B")
        self.play(FadeIn(inter, scale=0.6), run_time=0.4)
        self.au_mot("A union B")
        self.play(FadeIn(union, scale=0.6), run_time=0.4)
        self.au_mot("et, ou")
        et = self.t("ET", 54, COUL_INTER).next_to(inter, DOWN, buff=0.35)
        ou = self.t("OU", 54, JAUNE_TITRE).next_to(union, DOWN, buff=0.35)
        self.play(FadeIn(et, shift=UP * 0.2), run_time=0.3)
        self.play(FadeIn(ou, shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un jeu de 32 cartes")
        g = self.grille()
        self.au_mot("On tire une carte")
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in g], lag_ratio=0.03), run_time=1.4)
        self.au_mot("32 cartes")
        n32 = self.panneau(self.ligne([("32", JAUNE_TITRE), ("cartes", WHITE)], 40), 1.8)
        self.play(FadeIn(n32, shift=UP * 0.15), run_time=0.4)
        self.insister(n32[0], 0.3)

        ca, ta, cb, tb = self.cadres_AB(g)
        self.au_mot("A : « la carte")
        la = self.panneau(self.ligne([("A :", COUL_A), ("« la carte est un cœur »", WHITE)], 32), 0.75)
        self.play(*g.allumer(CASES_A), Create(ca), FadeIn(ta), FadeIn(la, shift=UP * 0.15), run_time=0.7)
        self.au_mot("B : « la carte")
        lb = self.panneau(self.ligne([("B :", COUL_B), ("« la carte est une figure »", WHITE)], 32), -0.25)
        self.play(*g.allumer(CASES_B), Create(cb), FadeIn(tb), FadeIn(lb, shift=UP * 0.15), run_time=0.7)
        noms = [("valet", 4), ("dame", 5), ("roi", 6)]
        mots = self.ligne([("valet,", COUL_B), ("dame", COUL_B), ("ou", WHITE), ("roi", COUL_B)], 30, 0.15)
        self.panneau(mots, -1.05)
        mots.shift(RIGHT * 0.6)
        for (nom, k), m in zip(noms, (mots[0], mots[1], VGroup(mots[2], mots[3]))):
            self.au_mot(nom)
            col = g.groupe([(r, k) for r in range(4)])
            self.play(FadeIn(m, scale=0.6), Indicate(col, color=COUL_B, scale_factor=1.08), run_time=0.4)
        self.play(*g.allumer(g.toutes()), run_time=0.4)
        self.attendre_voix()

    # ── 02 : A ∩ B ──────────────────────────────────────────────────────────

    def ecran_inter(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-inter")
        self.titre_ecran("A ∩ B : ET")
        g = self.grille()
        ca, ta, cb, tb = self.cadres_AB(g)
        self.add(g, ca, ta, cb, tb)
        self.au_mot("A inter B")
        h = self.panneau(self.ligne([("A", COUL_A), ("∩", WHITE), ("B", COUL_B)], 54, 0.2), 1.8)
        self.play(FadeIn(h, scale=0.6), run_time=0.4)
        self.au_mot("un cœur ET")
        et = self.panneau(self.ligne([("un cœur", COUL_A), ("ET", COUL_INTER), ("une figure", COUL_B)], 36), 0.8)
        self.play(FadeIn(et, shift=UP * 0.15), *g.allumer(CASES_INTER), run_time=0.6)
        self.insister(et[1], 0.3)
        halos = VGroup()
        for mot, k in [("Valet, dame", 4), ("dame et roi", 5), ("roi de cœur", 6)]:
            self.au_mot(mot)
            hl = g.halo(COEUR, k, COUL_INTER)
            halos.add(hl)
            self.play(Create(hl), g.c[COEUR][k].animate.scale(1.25), run_time=0.3)
            self.play(g.c[COEUR][k].animate.scale(1 / 1.25), run_time=0.2)
        self.au_mot("3 cartes")
        trois = self.panneau(self.ligne([("3", COUL_INTER), ("cartes", WHITE)], 40), -0.2)
        self.play(FadeIn(trois, shift=UP * 0.15), run_time=0.4)
        self.insister(trois[0], 0.3)
        self.au_mot("P de A inter B")
        pq = self.panneau(self.proba("A ∩ B", 40), -1.45)
        self.play(FadeIn(pq, shift=UP * 0.15), run_time=0.4)
        self.au_mot("3 sur 32")
        f = frac_txt(3, 32, 40, COUL_INTER).next_to(pq, RIGHT, buff=0.3)
        self.play(FadeIn(f, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(f, color=COUL_INTER, buff=0.12)), run_time=0.3)
        self.attendre_voix()

    # ── 03 : A ∪ B ──────────────────────────────────────────────────────────

    def ecran_union(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-union")
        self.titre_ecran("A ∪ B : OU")
        g = self.grille()
        ca, ta, cb, tb = self.cadres_AB(g)
        self.add(g, ca, ta, cb, tb)
        self.au_mot("A union B")
        h = self.panneau(self.ligne([("A", COUL_A), ("∪", WHITE), ("B", COUL_B)], 54, 0.2), 1.8)
        self.play(FadeIn(h, scale=0.6), run_time=0.4)
        self.au_mot("un cœur OU")
        ou = self.panneau(self.ligne([("un cœur", COUL_A), ("OU", JAUNE_TITRE), ("une figure", COUL_B)], 36), 0.85)
        self.play(FadeIn(ou, shift=UP * 0.15), run_time=0.5)
        self.insister(ou[1], 0.3)
        self.au_mot("ou les deux")
        deux = self.panneau(self.t("ou les deux", 30, JAUNE_TITRE), 0.3)
        self.play(FadeIn(deux, shift=UP * 0.15), run_time=0.3)

        self.au_mot("8 cœurs")
        huit = self.panneau(self.ligne([("8", COUL_A), ("cœurs", COUL_A)], 38), -0.45)
        self.play(*g.allumer(CASES_A), FadeIn(huit, shift=UP * 0.15), run_time=0.6)
        self.au_mot("plus les 9 figures")
        neuf = self.ligne([("+", WHITE), ("9", COUL_B), ("figures", COUL_B)], 38).next_to(huit, RIGHT, buff=0.25)
        self.play(*g.allumer(CASES_UNION), FadeIn(neuf, shift=UP * 0.15), run_time=0.6)
        self.au_mot("qui ne sont pas des cœurs")
        self.play(*[Indicate(g.c[r][k], color=COUL_B, scale_factor=1.12) for r, k in CASES_B_SEUL], run_time=0.6)
        self.au_mot("17 cartes")
        dixsept = self.panneau(self.ligne([("=", WHITE), ("17", JAUNE_TITRE), ("cartes", WHITE)], 38), -1.25)
        self.play(FadeIn(dixsept, shift=UP * 0.15), Indicate(g.groupe(CASES_UNION), color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.6)
        self.au_mot("17 sur 32")
        pq = self.proba("A ∪ B", 36)
        f = frac_txt(17, 32, 36, VERT_OK)
        res = VGroup(pq, f).arrange(RIGHT, buff=0.25)
        self.panneau(res, -2.2)
        self.play(FadeIn(res, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(f, color=VERT_OK, buff=0.1)), run_time=0.3)
        self.attendre_voix()

    # ── 04 : « ou » inclusif ────────────────────────────────────────────────

    def ecran_ou(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ou")
        self.titre_ecran("Le « ou » des maths")
        g = self.grille()
        ca, ta, cb, tb = self.cadres_AB(g)
        g.poser(CASES_UNION)
        self.add(g, ca, ta, cb, tb)
        self.au_mot("« ou » est inclusif")
        l1 = self.panneau(self.ligne([("« ou »", JAUNE_TITRE), ("est inclusif", WHITE)], 40), 1.6)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("la dame de cœur")
        dame = g.c[COEUR][5]
        hl = g.halo(COEUR, 5, COUL_INTER)
        l2 = self.panneau(self.ligne([("la dame de cœur", CARTE_ROUGE), ("est dans", WHITE)], 34), 0.5)
        l2[0].set_color("#F87171")
        self.play(Create(hl), FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.play(dame.animate.scale(1.5), hl.animate.scale(1.5), run_time=0.35)
        self.play(dame.animate.scale(1 / 1.5), hl.animate.scale(1 / 1.5), run_time=0.35)
        self.au_mot("dans A union B")
        l3 = self.panneau(self.ligne([("A", COUL_A), ("∪", WHITE), ("B", COUL_B)], 48, 0.2), -0.5)
        self.play(FadeIn(l3, scale=0.6), run_time=0.4)
        self.au_mot("même si")
        l4 = VGroup(self.t("même si elle est", 36, WHITE), self.t("dans les deux", 36, JAUNE_TITRE))
        l4.arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.panneau(l4, -1.6)
        self.play(FadeIn(l4, shift=UP * 0.15), Indicate(ca, color=COUL_A), Indicate(cb, color=COUL_B), run_time=0.6)
        self.attendre_voix()

    # ── 05 : le piège 8 + 12 ────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        g = self.grille()
        ca, ta, cb, tb = self.cadres_AB(g)
        self.add(g, ca, ta, cb, tb)
        self.au_mot("additionner 8")
        huit = self.t("8", 48, COUL_A)
        ha = VGroup(*[g.halo(r, k, COUL_A, 5) for r, k in CASES_A])
        self.play(*g.allumer(CASES_A), Create(ha), run_time=0.4)
        calc = self.ligne([(huit, None)], 48)
        self.panneau(calc, 1.6)
        self.play(FadeIn(huit, scale=0.6), run_time=0.3)
        self.au_mot("et 12")
        plus = self.ligne([("+", WHITE), ("12", COUL_B)], 48).next_to(huit, RIGHT, buff=0.25)
        hb = VGroup(*[SurroundingRectangle(g.c[r][k], color=COUL_B, buff=0.1, stroke_width=5, corner_radius=0.08)
                     for r, k in CASES_B])
        self.play(*g.allumer(CASES_UNION), Create(hb), FadeIn(plus, scale=0.6), run_time=0.4)
        self.au_mot("pour A union B")
        pour = self.panneau(self.ligne([("pour", WHITE), ("A", COUL_A), ("∪", WHITE), ("B", COUL_B), ("?", ORANGE_RETENUE)], 36), 0.7)
        self.play(FadeIn(pour, shift=UP * 0.15), run_time=0.3)
        self.au_mot("20, c'est trop")
        vingt = self.ligne([("=", WHITE), ("20", ROUGE_ERREUR)], 48).next_to(plus, RIGHT, buff=0.25)
        self.play(FadeIn(vingt, scale=0.6), run_time=0.3)
        self.play(Create(self.barrer(vingt[1])), run_time=0.3)
        self.au_mot("les 3 figures de cœur")
        x2 = VGroup()
        for k in FIGURES:
            lb = self.etiquette("× 2", ROUGE_ERREUR, 20)
            lb[1].set_color(WHITE)
            x2.add(lb.move_to(g.c[COEUR][k].get_bottom() + P(0, 0.05)).set_z_index(3))
        trop = self.panneau(self.ligne([("3", ROUGE_ERREUR), ("figures de cœur", WHITE)], 34), -0.4)
        self.play(FadeIn(trop, shift=UP * 0.15), FadeIn(x2, scale=0.5), run_time=0.4)
        inter = g.groupe(CASES_INTER)
        self.au_mot("comptées deux fois")
        deux = self.panneau(self.t("comptées deux fois", 34, ROUGE_ERREUR), -1.3)
        self.play(FadeIn(deux, shift=UP * 0.15), run_time=0.3)
        for _ in range(3):  # elles clignotent
            self.play(inter.animate.set_opacity(0.15), run_time=0.18)
            self.play(inter.animate.set_opacity(1), run_time=0.18)
        self.attendre_voix()

    # ── 06 : défi C ∩ B ─────────────────────────────────────────────────────

    def cadres_CB(self, g):
        cc = g.cadre_lignes(0, 1, COUL_C)
        cb = g.cadre_colonnes(FIGURES[0], FIGURES[-1], COUL_B)
        tc = self.etiquette("C", COUL_C, 30).next_to(cc, RIGHT, buff=0.15)
        tb = self.etiquette("B", COUL_B, 30).next_to(cb, UP, buff=0.12)
        return cc, tc, cb, tb

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        g = self.grille()
        self.au_mot("Même jeu")
        self.play(FadeIn(g, shift=DOWN * 0.2), run_time=0.6)
        cc, tc, cb, tb = self.cadres_CB(g)
        self.au_mot("C : « la carte")
        lc = self.panneau(self.ligne([("C :", COUL_C), ("« la carte est rouge »", WHITE)], 34), 1.5)
        self.play(*g.allumer([(r, k) for r in (0, 1) for k in range(8)]), Create(cc), FadeIn(tc),
                  FadeIn(lc, shift=UP * 0.15), run_time=0.7)
        self.au_mot("Combien de cartes")
        self.play(*g.allumer(g.toutes()), Create(cb), FadeIn(tb), run_time=0.5)
        q1 = self.panneau(self.t("Combien de cartes dans", 34), 0.4)
        q2 = self.panneau(self.ligne([("C", COUL_C), ("∩", WHITE), ("B", COUL_B), ("?", ORANGE_RETENUE)], 54, 0.2), -0.6)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("C inter B")
        self.play(FadeIn(q2, scale=0.6), run_time=0.4)
        self.insister(q2[3], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        g = self.grille()
        cc, tc, cb, tb = self.cadres_CB(g)
        self.add(g, cc, tc, cb, tb)
        self.au_mot("Les figures rouges")
        l1 = self.panneau(self.t("les figures rouges", 36, WHITE), 1.6)
        self.play(*g.allumer(CASES_C_INTER_B), FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        halos = VGroup()
        for mot, r in [("cœur et", 0), ("et carreau", 1)]:
            self.au_mot(mot)
            h = VGroup(*[g.halo(r, k, COUL_INTER) for k in FIGURES])
            halos.add(h)
            self.play(Create(h), *[Indicate(g.c[r][k], color=COUL_INTER, scale_factor=1.15) for k in FIGURES],
                      run_time=0.45)
        self.au_mot("3 chacun")
        l2 = self.panneau(self.ligne([("3", VERT_OK), ("chacun", WHITE)], 36), 0.6)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("6 cartes")
        l3 = self.panneau(self.ligne([("6", VERT_OK), ("cartes", WHITE)], 40), -0.4)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.insister(l3[0], 0.3)
        self.au_mot("6 sur 32")
        pq = self.proba("C ∩ B", 38)
        f = frac_txt(6, 32, 38, VERT_OK)
        res = VGroup(pq, f).arrange(RIGHT, buff=0.25)
        self.panneau(res, -1.6)
        self.play(FadeIn(res, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(f, color=VERT_OK, buff=0.1)), run_time=0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 42
        l1 = self.ligne([("Inter", WHITE), ("∩", WHITE), ("= ET :", COUL_INTER), ("les deux à la fois", WHITE)], fs, 0.18)
        l2 = self.ligne([("Union", WHITE), ("∪", WHITE), ("= OU :", JAUNE_TITRE), ("l'un, l'autre, ou les deux", WHITE)], fs, 0.18)
        l3 = self.ligne([("On ne compte jamais", WHITE), ("deux fois", ROUGE_ERREUR), ("la même issue", WHITE)], fs, 0.18)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.75)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, 0.4))
        for mot, l in zip(["Inter, c'est ET", "Union, c'est OU", "On ne compte jamais"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 6")
        self.play(Write(self.chute("Épisode 6 : la formule de la réunion", color=VERT_OK, font_size=36)))
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
        self.ecran_inter()
        self.ecran_union()
        self.ecran_ou()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
