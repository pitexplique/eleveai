# proba_cond_defi.py
# EleveAI — Maths Tle spé (micro proba_conditionnelle_defi, notion
# probabilites_conditionnelles) — série « Probabilités » : UN EXERCICE TYPE BAC
# AVEC LES PROBABILITÉS CONDITIONNELLES, AVEC VOIX.
# Paysage 16:9, ceinture NOIRE. Short jumeau : proba_cond_defi_short.py (orange).
#
# Domaine : la MÉTÉO et la GÉOGRAPHIE. Métier : une prévisionniste de
# Météo-France La Réunion décide de l'alerte fortes pluies quand un cyclone
# approche (les écoles ferment ou non).
#
# ⭐ La figure du coach (banque terminale-spe/maths/probabilites-conditionnelles,
#   `arbre_proba` « Arbre pondéré », arbreABCanvas / canvasArbre) : carte
#   blanche, point de départ, branches grises, l'étiquette d'un nœud intérieur
#   AU-DESSUS du nœud, celle d'une feuille À DROITE, la probabilité au milieu
#   de la branche, en bleu ; le chemin calculé s'allume en orange. De GAUCHE à
#   DROITE, comme le coach. Le piège : les DEUX arbres (A puis F / F puis A).
# ⛔ PAS D'ÉCART : un nombre ne s'écrit que quand la voix le dit.
#   Nombres (Python, fractions exactes) : P(A) = 0,25 ; P_A(F) = 0,8 ;
#   P_Ā(F) = 0,2 · P(A ∩ F) = 0,2 · P(Ā ∩ F) = 0,15 · P(F) = 0,35 ·
#   P_F(A) = 4/7 ≈ 0,571 · défi P(A ∩ F̄) = 0,05 · short P_F̄(A) = 1/13 ≈ 0,077.
#
# Écrans : 00 garde · 01 la situation (cyclone, alerte, 80 % / 20 %) · 02 Q1
# l'arbre · 03 Q2 un chemin · 04 Q3 les probabilités totales · 05 Q4 inverser
# la condition · 06 le piège (deux arbres) · 07 défi (fausse alerte) · 07b
# correction · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/terminale-proba-cond-defi.json (débit −6), calée mot à mot
# par proba_cond_defi_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_cond_defi.py ProbaCondDefiTerminale -o eleveai-maths-terminale-proba-cond-defi --media_dir manim/scripts/terminale/media-cond_defi-1s
# Sortie : manim/sorties/terminale/maths/probabilites/05-cond-defi/

import sys
from fractions import Fraction
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
from proba_pc_conditionnelle import (  # noqa: E402
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, frac_obj, lettre, p_cond, suite,
)
from proba_bin_defi import MotsCales  # noqa: E402

PA, PFA, PFAB = Fraction(1, 4), Fraction(4, 5), Fraction(1, 5)
P_AF = PA * PFA
P_ABF = (1 - PA) * PFAB
P_F = P_AF + P_ABF
P_FA = P_AF / P_F
P_AFB = PA * (1 - PFA)
assert (P_AF, P_ABF, P_F, P_AFB) == (Fraction(1, 5), Fraction(3, 20), Fraction(7, 20), Fraction(1, 20))
assert f"{float(P_FA):.3f}" == "0.571"

CHEMIN2 = "#22D3EE"     # le 2e chemin vers F (cyan)
PLUIE = "#38BDF8"     # F, la forte pluie (bleu ciel)
PROBA_C = "#93C5FD"   # les probabilités recopiées dans les calculs
NUAGE = "#CBD5E1"
ALERTE = "#F97316"
ILE = "#16A34A"
OCEAN = "#0C4A6E"


def P(x, y):
    return np.array([x, y, 0.0])


# ── l'écriture : P(A ∩ F), P(A ∩ F̄), P(F) en Text ───────────────────────────

def p_inter(a="A", f="F", barre_a=False, barre_f=False, fs=40, color=WHITE):
    """P(A ∩ F) avec, au besoin, une barre sur A ou sur F."""
    return suite(Text("P(", font_size=fs, color=color), lettre(a, fs, color, barre_a),
                 Text("∩", font_size=fs, color=color), lettre(f, fs, color, barre_f),
                 Text(")", font_size=fs, color=color), buff=0.06)


def p_simple(x="F", fs=40, color=WHITE):
    return Text(f"P({x})", font_size=fs, color=color)


# ── les dessins : l'île, le cyclone, le nuage, l'alerte ─────────────────────

def ile(s=1.0):
    """La Réunion : une île ronde, un peu allongée, et ses deux sommets."""
    pts = [P(1.15 * np.cos(t) + 0.08 * np.cos(3 * t), 0.85 * np.sin(t) + 0.06 * np.sin(2 * t))
           for t in np.linspace(0, TAU, 40, endpoint=False)]
    terre = Polygon(*pts, fill_color=ILE, fill_opacity=1, stroke_color="#14532D", stroke_width=3)
    terre.rotate(-0.35)
    pic1 = Triangle(fill_color="#78350F", fill_opacity=1, stroke_width=0).scale(0.22).move_to(P(-0.2, 0.08))
    pic2 = Triangle(fill_color="#92400E", fill_opacity=1, stroke_width=0).scale(0.17).move_to(P(0.45, -0.18))
    return VGroup(terre, pic1, pic2).scale(s)


def cyclone(s=1.0):
    """Un cyclone vu du satellite : deux bras en spirale autour de l'œil."""
    bras = VGroup()
    for k in range(2):
        f = ParametricFunction(lambda t: P(0.12 * np.exp(0.33 * t) * np.cos(t + k * PI),
                                           0.12 * np.exp(0.33 * t) * np.sin(t + k * PI)),
                               t_range=[0, 2.0 * PI], color=WHITE, stroke_width=9)
        f.set_stroke(opacity=0.9)
        bras.add(f)
    oeil = Circle(radius=0.1, fill_color=OCEAN, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    voile = Circle(radius=0.95, fill_color=WHITE, fill_opacity=0.12, stroke_width=0)
    return VGroup(voile, bras, oeil).scale(s)


def nuage(s=1.0, pluie=True, couleur=NUAGE):
    bulles = VGroup(Circle(radius=0.32).move_to(P(-0.38, 0)), Circle(radius=0.45).move_to(P(0.05, 0.15)),
                    Circle(radius=0.33).move_to(P(0.45, 0)), Rectangle(width=1.1, height=0.3).move_to(P(0.03, -0.15)))
    bulles.set_fill(couleur, 1).set_stroke(width=0)
    g = VGroup(bulles)
    if pluie:
        gouttes = VGroup(*[Line(P(x, -0.42), P(x - 0.1, -0.78), color=PLUIE, stroke_width=5)
                           for x in (-0.4, -0.1, 0.2, 0.5)])
        g.add(gouttes)
    return g.scale(s)


def panneau_alerte(s=1.0, couleur=ALERTE):
    tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3).scale(0.55)
    pt = Text("!", font_size=48, color=ENCRE, weight=BOLD).move_to(tri.get_center() + DOWN * 0.08)
    return VGroup(tri, pt).scale(s)


def jour(alerte=False, s=1.0):
    """Une case de calendrier ; un jour d'alerte porte le petit panneau."""
    c = RoundedRectangle(width=0.8, height=0.8, corner_radius=0.08, fill_color=WHITE, fill_opacity=1,
                         stroke_color=ALERTE if alerte else BORD, stroke_width=4 if alerte else 2)
    haut = Rectangle(width=0.8, height=0.18, fill_color=ALERTE if alerte else "#94A3B8", fill_opacity=1,
                     stroke_width=0).align_to(c, UP)
    g = VGroup(c, haut)
    if alerte:
        g.add(panneau_alerte(0.5).move_to(c.get_center() + DOWN * 0.07))
    return g.scale(s)


# ── l'ARBRE PONDÉRÉ du coach (arbre_proba), de GAUCHE à DROITE ──────────────

class ArbreAF(VGroup):
    """Carte blanche, point de départ, deux nœuds puis quatre feuilles.
    Branches : 0 → N1, 1 → N̄1, 2 N1 → F1, 3 N1 → F̄1, 4 N̄1 → F1, 5 N̄1 → F̄1.
    `premier` / `second` : les lettres (A puis F, ou F puis A pour l'arbre
    inversé du piège). Les branches et les étiquettes sont prêtes ; les nombres
    se posent quand la voix les dit (`nombre(k, texte)`)."""

    def __init__(self, premier="A", second="F", dx=2.3, dy1=1.2, dy2=0.6, fs=34, titre="Arbre pondéré", pad=1.9, decal=0.6, **kw):
        super().__init__(**kw)
        self.racine = P(0, 0)
        self.noeuds = [P(dx, dy1), P(dx, -dy1)]
        self.feuilles = [P(2 * dx, dy1 + dy2), P(2 * dx, dy1 - dy2), P(2 * dx, -dy1 + dy2), P(2 * dx, -dy1 - dy2)]
        bouts = [(self.racine, self.noeuds[0]), (self.racine, self.noeuds[1]),
                 (self.noeuds[0], self.feuilles[0]), (self.noeuds[0], self.feuilles[1]),
                 (self.noeuds[1], self.feuilles[2]), (self.noeuds[1], self.feuilles[3])]
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in bouts]
        self.depart = Dot(self.racine, radius=0.07, color=ENCRE)
        self.lab_noeuds = []
        for k, b in enumerate([False, True]):
            m = lettre(premier, fs, ENCRE, b).next_to(self.noeuds[k], UP, buff=0.1)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab_noeuds.append(VGroup(fond, m))
        self.lab_feuilles = []
        for k, b in enumerate([False, True, False, True]):
            self.lab_feuilles.append(lettre(second, fs, ENCRE, b).next_to(self.feuilles[k], RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab_noeuds, *self.lab_feuilles)
        self.carte = RoundedRectangle(width=tout.width + pad, height=tout.height + 1.2, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3 + RIGHT * decal)
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD) if titre else VGroup()
        if titre:
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.12).align_to(self.carte, LEFT).shift(RIGHT * 0.25)
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab_noeuds, *self.lab_feuilles)
        self.nombres = [None] * 6

    def squelette(self):
        """Le dessin sans rien : carte, titre, départ (les branches viennent après)."""
        return VGroup(self.carte, self.titre, self.depart)

    def niveau(self, k):
        """Les branches et étiquettes du niveau 1 (k = 0) ou d'un nœud du niveau 2 (k = 1 : N1, k = 2 : N̄1)."""
        if k == 0:
            return [self.branches[0], self.branches[1]], [self.lab_noeuds[0], self.lab_noeuds[1]]
        i = 2 if k == 1 else 4
        f = 0 if k == 1 else 2
        return [self.branches[i], self.branches[i + 1]], [self.lab_feuilles[f], self.lab_feuilles[f + 1]]

    def nombre(self, k, texte, fs=30, color=PROBA):
        """Le nombre de la branche k, au milieu, du côté extérieur (au-dessus
        pour une branche qui monte, au-dessous pour une qui descend)."""
        t = Text(texte, font_size=fs, color=color, weight=BOLD)
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        m = (a + b) / 2
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (d[1] > 0) != (n[1] > 0):
            n = -n
        if abs(d[1]) < 1e-6:
            n = UP
        t.move_to(m)
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.shift(n * (demi + 0.08))
        self.nombres[k] = t
        return t

    def bout(self, f, texte, fs=30, color=CHEMIN):
        """Le produit d'un chemin, écrit au bout de la feuille f."""
        t = Text(texte, font_size=fs, color=color, weight=BOLD)
        return t.next_to(self.lab_feuilles[f], RIGHT, buff=0.3)

    def allumer(self, ks, color=CHEMIN, sw=9):
        return [self.branches[k].animate.set_stroke(color, sw, opacity=1) for k in ks]

    def eteindre_sauf(self, ks, op=0.2):
        """Les branches hors de ks et leurs nombres s'estompent, comme les étiquettes hors chemin."""
        anims = []
        for k, br in enumerate(self.branches):
            if k not in ks:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
                if self.nombres[k] is not None:
                    anims.append(self.nombres[k].animate.set_opacity(op + 0.1))
        garde_n = {0} if any(k in (0, 2, 3) for k in ks) else set()
        garde_n |= {1} if any(k in (1, 4, 5) for k in ks) else set()
        for k, m in enumerate(self.lab_noeuds):
            if k not in garde_n:
                anims.append(m[1].animate.set_opacity(op))
        gardees = {{2: 0, 3: 1, 4: 2, 5: 3}[k] for k in ks if k >= 2}
        for k, m in enumerate(self.lab_feuilles):
            if k not in gardees:
                anims.append(m.animate.set_opacity(op))
        return anims

    def rallumer(self):
        anims = [br.animate.set_stroke(BRANCHE, 4, opacity=1) for br in self.branches]
        anims += [n.animate.set_opacity(1) for n in self.nombres if n is not None]
        anims += [m[1].animate.set_opacity(1) for m in self.lab_noeuds]
        anims += [m.animate.set_opacity(1) for m in self.lab_feuilles]
        return anims

    def poser_tout(self, textes=("0,25", "0,75", "0,8", "0,2", "0,2", "0,8")):
        """Tous les nombres de l'énoncé, déjà posés (un écran qui repart de l'arbre complet)."""
        g = VGroup(*[self.nombre(k, t) for k, t in enumerate(textes)])
        self.add(g)
        return g


class ProbaCondDefiBase(MotsCales, Notion6e):
    """Toutes les scènes ; la sous-classe ne change que identité et ceinture."""

    fichier_marques = "proba_cond_defi_marques.json"
    nom_voix = "terminale-proba-cond-defi"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
    X_G = -3.55         # le centre de la colonne des calculs (à gauche)
    LARG_G = 6.1        # sa largeur utile
    C_ARBRE = P(3.55, 0.35)
    S_ARBRE = 0.95

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def titre_ecran(self, texte, *avec, font_size=40):
        t = Text(texte, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t), *avec, run_time=0.8)
        return t

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=None):
        larg = larg or self.LARG_G
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def ligne(self, *objs, y=0.0, x=None, buff=0.18, larg=None):
        g = self.caser(suite(*objs, buff=buff), larg)
        return g.move_to(P(self.X_G if x is None else x, y))

    def gauche(self, mob, y, x=None):
        """Aligné à gauche sur le bord de la colonne des calculs."""
        self.caser(mob)
        return mob.move_to(P((self.X_G - self.LARG_G / 2) if x is None else x, y), aligned_edge=LEFT)

    def arbre(self, complet=True, **kw):
        a = ArbreAF(**kw).scale(self.S_ARBRE).move_to(self.C_ARBRE)
        if complet:
            a.poser_tout()
        return a

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Probabilités conditionnelles", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        sous = self.t("un exercice type bac", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        a = ArbreAF(titre=None).scale(0.62).move_to(P(-0.6, -0.75))
        self.add(ech, titre, a.carte, a.depart)   # la ceinture, visible dès la 1re image
        self.au_mot("exercice type bac")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        for k in range(3):
            brs, labs = a.niveau(k)
            self.play(*[Create(b) for b in brs], *[FadeIn(l, scale=1.3) for l in labs], run_time=0.45)
        self.play(*a.allumer([0, 2]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation : le cyclone, l'alerte, la pluie ──────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        mer = Circle(radius=2.05, fill_color=OCEAN, fill_opacity=1, stroke_color="#38BDF8", stroke_width=3)
        mer.move_to(P(-4.3, 0.15))
        terre = ile(1.0).move_to(mer.get_center() + P(-0.35, -0.45))
        cy = cyclone(1.0).move_to(mer.get_center() + P(0.85, 0.85))
        cy.add_updater(lambda m, dt: m.rotate(-1.4 * dt))
        self.titre_ecran("Alerte fortes pluies", FadeIn(mer), FadeIn(terre))
        self.au_mot("prévisionniste")
        metier = self.t("prévisionniste météo", 34, BLEU_CALCUL).next_to(mer, DOWN, buff=0.3)
        self.play(FadeIn(metier, shift=UP * 0.15), run_time=0.5)
        self.au_mot("cyclone")
        self.play(FadeIn(cy, scale=0.4), run_time=0.6)
        self.play(cy.animate.shift(P(-0.35, -0.3)), run_time=0.8)
        self.au_mot("l'alerte fortes pluies")
        al = panneau_alerte(1.0).move_to(P(0.4, 2.0))
        lib = self.t("alerte fortes pluies", 34, ALERTE).next_to(al, RIGHT, buff=0.3)
        self.play(GrowFromCenter(al), FadeIn(lib, shift=LEFT * 0.15), run_time=0.6)
        self.insister(al, 0.25)
        self.au_mot("un jour sur quatre")
        jours = VGroup(*[jour(alerte=(k == 2), s=0.9) for k in range(4)]).arrange(RIGHT, buff=0.18)
        un4 = self.t("1 jour sur 4", 40, ALERTE)
        bloc = self.caser(VGroup(jours, un4).arrange(RIGHT, buff=0.35), 6.4).move_to(P(2.6, 0.7))
        self.play(LaggedStart(*[FadeIn(j, shift=DOWN * 0.15) for j in jours], lag_ratio=0.15), run_time=0.7)
        self.play(FadeIn(un4, scale=1.4), Indicate(jours[2], color=ALERTE), run_time=0.5)
        self.au_mot("Après une alerte")
        r1 = VGroup(panneau_alerte(0.55), Arrow(LEFT, RIGHT, color=WHITE, stroke_width=5).scale(0.4),
                    nuage(0.75)).arrange(RIGHT, buff=0.25)
        r1.move_to(P(1.4, -0.75))
        self.play(FadeIn(r1[0], scale=1.4), GrowArrow(r1[1]), FadeIn(r1[2], shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("80 %")
        q80 = self.t("80 %", 54, PLUIE).next_to(r1, RIGHT, buff=0.35)
        self.play(FadeIn(q80, scale=1.8), run_time=0.4)
        self.au_mot("sans alerte")
        sans = VGroup(panneau_alerte(0.55, couleur="#64748B"),
                      Line(LEFT, RIGHT, color=ROUGE_ERREUR, stroke_width=6).scale(0.4).rotate(-0.8))
        sans[1].move_to(sans[0])
        r2 = VGroup(sans, Arrow(LEFT, RIGHT, color=WHITE, stroke_width=5).scale(0.4), nuage(0.75))
        r2.arrange(RIGHT, buff=0.25).move_to(P(1.4, -2.35))
        self.play(FadeIn(r2[0], scale=1.4), GrowArrow(r2[1]), FadeIn(r2[2], shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("20 %")
        q20 = self.t("20 %", 54, PLUIE).next_to(r2, RIGHT, buff=0.35)
        self.play(FadeIn(q20, scale=1.8), run_time=0.4)
        self.attendre_voix()
        cy.clear_updaters()

    # ── 02 : question 1 : l'arbre ───────────────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        a = self.arbre(complet=False)
        self.titre_ecran("Question 1 : l'arbre", FadeIn(a.squelette()))
        fs = 36
        la = suite(self.t("A :", fs + 4, ALERTE), self.t("l'alerte est donnée", fs), buff=0.2)
        lf = suite(self.t("F :", fs + 4, PLUIE), self.t("il pleut fortement", fs), buff=0.2)
        self.gauche(la, 1.4)
        self.gauche(lf, -0.6)
        ia = panneau_alerte(0.75).next_to(la, DOWN, buff=0.3).align_to(la, LEFT).shift(RIGHT * 0.3)
        il = nuage(0.7).next_to(lf, DOWN, buff=0.3).align_to(lf, LEFT).shift(RIGHT * 0.3)
        self.au_mot("A : l'alerte")
        brs, labs = a.niveau(0)
        self.play(FadeIn(la, shift=RIGHT * 0.2), FadeIn(ia, scale=1.3), Create(brs[0]), FadeIn(labs[0], scale=1.4),
                  run_time=0.6)
        self.au_mot("0,25 ;")
        self.play(FadeIn(a.nombre(0, "0,25"), scale=1.7), run_time=0.4)
        self.au_mot("A barre")
        self.play(Create(brs[1]), FadeIn(labs[1], scale=1.4), run_time=0.4)
        self.au_mot("0,75")
        self.play(FadeIn(a.nombre(1, "0,75"), scale=1.7), run_time=0.4)
        self.au_mot("Puis F")
        self.play(FadeIn(lf, shift=RIGHT * 0.2), FadeIn(il, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("Après A :")
        brs, labs = a.niveau(1)
        self.play(*[Create(b) for b in brs], *[FadeIn(l, scale=1.4) for l in labs],
                  Indicate(a.lab_noeuds[0][1], color=ALERTE), run_time=0.6)
        self.au_mot("0,8 ;")
        self.play(FadeIn(a.nombre(2, "0,8"), scale=1.7), run_time=0.4)
        self.au_mot("F barre, 0,2. Après")
        self.play(FadeIn(a.nombre(3, "0,2"), scale=1.7), run_time=0.4)
        self.au_mot("Après A barre")
        brs, labs = a.niveau(2)
        self.play(*[Create(b) for b in brs], *[FadeIn(l, scale=1.4) for l in labs],
                  Indicate(a.lab_noeuds[1][1], color=ALERTE), run_time=0.6)
        self.au_mot("F, 0,2 ;")
        self.play(FadeIn(a.nombre(4, "0,2"), scale=1.7), run_time=0.4)
        self.au_mot("F barre, 0,8.")
        self.play(FadeIn(a.nombre(5, "0,8"), scale=1.7), run_time=0.4)
        self.attendre_voix()

    # ── 03 : question 2 : un chemin ─────────────────────────────────────────

    def ecran_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-chemin")
        a = self.arbre()
        self.titre_ecran("Question 2 : un chemin", FadeIn(a))
        fs = 44
        self.au_mot("l'alerte est donnée et")
        q = suite(panneau_alerte(0.6), self.t("et", 38), nuage(0.6), buff=0.3)
        self.gauche(q, 1.75, x=self.X_G - 1.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("P de A inter F")
        pi = p_inter(fs=fs + 4)
        self.gauche(pi, 0.45)
        self.play(FadeIn(pi, scale=1.3), run_time=0.5)
        self.au_mot("le chemin A puis F")
        self.play(*a.allumer([0, 2]), *a.eteindre_sauf([0, 2]), run_time=0.8)
        self.au_mot("On multiplie")
        l2 = suite(self.t("=", fs), self.t("0,25", fs, PROBA_C), self.t("×", fs), self.t("0,8", fs, PROBA_C), buff=0.22)
        self.gauche(l2, -0.8, x=pi.get_left()[0] + 0.3)
        self.play(FadeIn(l2[0]), run_time=0.3)
        self.au_mot("0,25 fois")
        self.play(TransformFromCopy(a.nombres[0], l2[1]), Indicate(a.nombres[0], color=CHEMIN), run_time=0.5)
        self.au_mot("0,8, égale")
        self.play(FadeIn(l2[2]), TransformFromCopy(a.nombres[2], l2[3]), Indicate(a.nombres[2], color=CHEMIN),
                  run_time=0.5)
        self.au_mot("égale 0,2")
        l3 = suite(self.t("=", fs), self.t("0,2", fs + 12, CHEMIN), buff=0.22)
        self.gauche(l3, -2.0, x=l2.get_left()[0])
        b0 = a.bout(0, "0,2")
        self.play(FadeIn(l3[0]), FadeIn(l3[1], scale=1.8), run_time=0.5)
        self.play(TransformFromCopy(l3[1], b0), run_time=0.5)
        cad = SurroundingRectangle(l3[1], color=CHEMIN, buff=0.12, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(l3[1], cad))
        self.attendre_voix()

    # ── 04 : question 3 : les probabilités totales ──────────────────────────

    def ecran_totales(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-totales")
        a = self.arbre()
        self.titre_ecran("Question 3 : P(F)", FadeIn(a))
        fs = 40
        self.au_mot("qu'il pleuve fortement")
        q = suite(self.t("Forte pluie :", 38), p_simple("F", 44, PLUIE), self.t("?", 44, PLUIE), buff=0.2)
        self.gauche(q, 1.8)
        self.play(FadeIn(q, shift=UP * 0.15), Indicate(a.lab_feuilles[0], color=PLUIE),
                  Indicate(a.lab_feuilles[2], color=PLUIE), run_time=0.6)
        self.au_mot("Deux chemins")
        self.play(*a.allumer([0, 2]), *a.allumer([1, 4], CHEMIN2), *a.eteindre_sauf([0, 2, 1, 4]), run_time=0.8)
        self.au_mot("A, F : 0,2")
        l1 = suite(lettre("A", fs, CHEMIN), self.t(", F :", fs, CHEMIN), self.t("0,2", fs, CHEMIN), buff=0.2)
        self.gauche(l1, 0.75)
        b0 = a.bout(0, "0,2")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(b0, scale=1.6), run_time=0.5)
        self.au_mot("A barre, F")
        l2 = suite(lettre("A", fs, CHEMIN2, barre=True), self.t(", F :", fs, CHEMIN2), self.t("0,75", fs, PROBA_C),
                   self.t("×", fs), self.t("0,2", fs, PROBA_C), buff=0.2)
        self.gauche(l2, -0.4)
        self.play(FadeIn(l2[:2], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("0,75 fois")
        self.play(TransformFromCopy(a.nombres[1], l2[2]), run_time=0.4)
        self.au_mot("fois 0,2")
        self.play(FadeIn(l2[3]), TransformFromCopy(a.nombres[4], l2[4]), run_time=0.4)
        self.au_mot("égale 0,15")
        r2 = suite(self.t("=", fs), self.t("0,15", fs + 4, CHEMIN2), buff=0.15).next_to(l2, RIGHT, buff=0.15)
        b2 = a.bout(2, "0,15", color=CHEMIN2)
        self.play(FadeIn(r2, scale=1.5), run_time=0.4)
        self.play(TransformFromCopy(r2[1], b2), run_time=0.5)
        self.au_mot("Probabilités totales")
        pt = self.t("probabilités totales", 30, BLEU_CALCUL)
        self.gauche(pt, -1.35)
        self.play(FadeIn(pt, shift=UP * 0.1), run_time=0.4)
        self.au_mot("P de F égale")
        l3 = suite(p_simple("F", fs + 4), self.t("=", fs + 4), self.t("0,2", fs + 4, CHEMIN), self.t("+", fs + 4),
                   self.t("0,15", fs + 4, CHEMIN2), self.t("=", fs + 4), self.t("0,35", fs + 14, PLUIE), buff=0.18)
        self.gauche(l3, -2.35)
        self.play(FadeIn(l3[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,2 plus")
        self.play(TransformFromCopy(b0, l3[2]), FadeIn(l3[3]), run_time=0.4)
        self.au_mot("plus 0,15")
        self.play(TransformFromCopy(b2, l3[4]), run_time=0.4)
        self.au_mot("égale 0,35")
        self.play(FadeIn(l3[5]), FadeIn(l3[6], scale=1.8), run_time=0.5)
        cad = SurroundingRectangle(l3[6], color=PLUIE, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(l3[6], cad))
        self.attendre_voix()

    # ── 05 : question 4 : inverser la condition ─────────────────────────────

    def ecran_inversion(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-inversion")
        a = self.arbre()
        b0, b2 = a.bout(0, "0,2"), a.bout(2, "0,15", color=CHEMIN2)
        self.titre_ecran("Question 4 : inverser", FadeIn(a), FadeIn(b0), FadeIn(b2))
        fs = 42
        self.au_mot("il a plu fortement")
        q = suite(nuage(0.6), self.t("il a plu :", 36), panneau_alerte(0.6), self.t("?", 44, ALERTE), buff=0.25)
        self.gauche(q, 1.8)
        self.play(FadeIn(q[:2], shift=UP * 0.15), run_time=0.5)
        self.au_mot("Probabilité que l'alerte")
        self.play(FadeIn(q[2:], scale=1.4), run_time=0.4)
        self.au_mot("On cherche")
        pf = p_cond("F", "A", fs + 6, WHITE, c_cond=PLUIE, c_cible=ALERTE)
        self.gauche(pf, 0.45)
        self.play(FadeIn(pf, scale=1.4), run_time=0.5)
        self.insister(pf[1], 0.25)
        self.au_mot("les deux chemins vers F")
        self.play(*a.allumer([0, 2]), *a.allumer([1, 4], CHEMIN2), *a.eteindre_sauf([0, 2, 1, 4]), run_time=0.8)
        self.au_mot("P de A inter F, divisé")
        fr = frac_obj(p_inter(fs=fs - 4, color=CHEMIN), p_simple("F", fs - 4, PLUIE))
        l1 = suite(self.t("=", fs), fr, buff=0.25).next_to(pf, RIGHT, buff=0.25)
        self.play(FadeIn(l1[0]), FadeIn(fr[0], shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("divisé par P de F")
        self.play(Create(fr[1]), FadeIn(fr[2], shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,2 divisé par 0,35")
        f2 = frac_obj(self.t("0,2", fs, CHEMIN), self.t("0,35", fs, PLUIE))
        l2 = suite(self.t("=", fs), f2, buff=0.25)
        self.gauche(l2, -1.5, x=l1.get_left()[0])
        self.play(FadeIn(l2[0]), TransformFromCopy(b0, f2[0]), run_time=0.5)
        self.play(Create(f2[1]), FadeIn(f2[2], scale=1.4), Indicate(b0, color=CHEMIN), Indicate(b2, color=CHEMIN2),
                  run_time=0.6)
        self.au_mot("environ 0,571")
        r = suite(self.t("≈", fs + 4), self.t("0,571", fs + 8, ALERTE), buff=0.2).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(r[0]), FadeIn(r[1], scale=1.8), *a.allumer([1, 4], BRANCHE, 4), run_time=0.6)
        cad = SurroundingRectangle(r[1], color=ALERTE, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r[1], cad))
        self.attendre_voix()

    # ── 06 : le piège : les deux arbres ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = ArbreAF().scale(0.72).move_to(P(-3.5, 0.7))
        g.poser_tout()
        d = ArbreAF("F", "A", titre="Arbre inversé").scale(0.72).move_to(P(3.2, 0.7))
        self.titre_ecran("Le piège", FadeIn(g), FadeIn(d))
        fs = 46
        self.au_mot("confondre")
        pa = p_cond("A", "F", fs, WHITE, c_cond=ALERTE, c_cible=PLUIE)
        pf = p_cond("F", "A", fs, WHITE, c_cond=PLUIE, c_cible=ALERTE)
        pa.move_to(P(-4.6, -2.45))
        pf.move_to(P(1.6, -2.45))
        self.play(FadeIn(pa, shift=UP * 0.15), run_time=0.4)
        self.au_mot("et P indice F de A")
        self.play(FadeIn(pf, shift=UP * 0.15), run_time=0.4)
        self.au_mot("P indice A de F, 0,8")
        v8 = suite(self.t("=", fs), self.t("0,8", fs + 6, PLUIE), buff=0.18).next_to(pa, RIGHT, buff=0.2)
        self.play(*g.allumer([2]), *g.eteindre_sauf([0, 2]), Indicate(g.nombres[2], color=CHEMIN, scale_factor=1.5),
                  FadeIn(v8, scale=1.5), run_time=0.8)
        self.au_mot("après une alerte")
        self.play(Indicate(g.lab_noeuds[0][1], color=ALERTE, scale_factor=1.5), run_time=0.6)
        self.au_mot("P indice F de A, environ")
        n571 = d.nombre(2, "0,571", fs=36)
        v5 = suite(self.t("≈", fs), self.t("0,571", fs + 6, ALERTE), buff=0.18).next_to(pf, RIGHT, buff=0.2)
        self.play(*d.allumer([2]), *d.eteindre_sauf([0, 2]), run_time=0.6)
        self.au_mot("environ 0,571")
        self.play(FadeIn(v5, scale=1.5), FadeIn(n571, scale=1.6), run_time=0.6)
        self.au_mot("quand il pleut")
        self.play(Indicate(d.lab_noeuds[0][1], color=PLUIE, scale_factor=1.5), run_time=0.6)
        self.au_mot("Inverser la condition")
        neq = self.t("≠", 80, ROUGE_ERREUR).move_to(P(-0.25, -2.45))
        self.play(GrowFromCenter(neq), run_time=0.5)
        self.insister(neq, 0.25)
        self.attendre_voix(marge=1.2)

    # ── 07 : défi : la fausse alerte ────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre()
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Une fausse alerte")
        fa = self.t("Une fausse alerte", 46, ORANGE_RETENUE)
        self.gauche(fa, 1.7)
        self.play(FadeIn(fa, shift=UP * 0.15), run_time=0.5)
        self.au_mot("l'alerte est donnée")
        ic = suite(panneau_alerte(0.6), self.t("mais", 34), nuage(0.6, pluie=False), buff=0.3)
        self.gauche(ic, 0.6)
        self.play(FadeIn(ic[0], scale=1.4), *a.allumer([0], ORANGE_RETENUE), run_time=0.5)
        self.au_mot("il ne pleut pas")
        self.play(FadeIn(ic[1:], shift=LEFT * 0.1), *a.allumer([3], ORANGE_RETENUE), run_time=0.5)
        self.au_mot("Quelle est sa probabilité")
        q = suite(p_inter(barre_f=True, fs=48), self.t("= ?", 48, ORANGE_RETENUE), buff=0.2)
        self.gauche(q, -0.7)
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.insister(q[1], 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 44, ORANGE_RETENUE)
        self.gauche(pause, -2.2)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        a = self.arbre()
        self.titre_ecran("Correction", FadeIn(a))
        fs = 46
        self.au_mot("Le chemin A puis F barre")
        pi = p_inter(barre_f=True, fs=fs + 2)
        self.gauche(pi, 1.5)
        self.play(FadeIn(pi, shift=UP * 0.15), *a.allumer([0, 3], ORANGE_RETENUE), *a.eteindre_sauf([0, 3]),
                  run_time=0.8)
        self.au_mot("0,25 fois")
        l2 = suite(self.t("=", fs), self.t("0,25", fs, PROBA_C), self.t("×", fs), self.t("0,2", fs, PROBA_C), buff=0.22)
        self.gauche(l2, 0.25, x=pi.get_left()[0] + 0.3)
        self.play(FadeIn(l2[0]), TransformFromCopy(a.nombres[0], l2[1]), run_time=0.5)
        self.au_mot("fois 0,2")
        self.play(FadeIn(l2[2]), TransformFromCopy(a.nombres[3], l2[3]), run_time=0.5)
        self.au_mot("égale 0,05")
        l3 = suite(self.t("=", fs), self.t("0,05", fs + 12, ORANGE_RETENUE), buff=0.22)
        self.gauche(l3, -1.0, x=l2.get_left()[0])
        b1 = a.bout(1, "0,05", color=ORANGE_RETENUE)
        self.play(FadeIn(l3[0]), FadeIn(l3[1], scale=1.8), run_time=0.5)
        self.play(TransformFromCopy(l3[1], b1), run_time=0.5)
        cad = SurroundingRectangle(l3[1], color=ORANGE_RETENUE, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.au_mot("5 % des jours")
        cinq = self.t("5 % des jours", 40, ORANGE_RETENUE)
        self.gauche(cinq, -2.3)
        self.play(FadeIn(cinq, shift=UP * 0.15), run_time=0.5)
        self.insister(VGroup(l3[1], cad))
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 42
        l1 = suite(self.t("Un chemin :", fs, CHEMIN), self.t("on multiplie", fs), buff=0.3)
        l2 = suite(self.t("Totales :", fs, PLUIE), self.t("on additionne les chemins", fs), buff=0.3)
        l3 = suite(self.t("Inverser :", fs, ALERTE), p_cond("F", "A", fs + 2), self.t("=", fs),
                   frac_obj(p_inter(fs=fs - 6), p_simple("F", fs - 6)), buff=0.25)
        l4 = suite(self.t("Ne pas confondre", fs, ROUGE_ERREUR), p_cond("A", "F", fs + 2), self.t("et", fs),
                   p_cond("F", "A", fs + 2), buff=0.25)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, -0.25))
        for mot, l in zip(["Un chemin", "Les probabilités totales", "Inverser", "Et ne pas confondre"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10, modèle proba_au_moins_un.py) ──────────

    def page_abonnement(self, voix="09-abonne"):
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
        self.ecran_arbre()
        self.ecran_chemin()
        self.ecran_totales()
        self.ecran_inversion()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaCondDefiTerminale(ProbaCondDefiBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
