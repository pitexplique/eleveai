# proba_bin_calculer.py
# EleveAI — Maths STMG (micro vaT_bin_pk, notion va_binomiale_calcul) ET
# Maths Tle spé (micro binomiale_calculer, notion loi_binomiale) — série
# « Probabilités » : CALCULER P(X = k) AVEC LA LOI BINOMIALE, AVEC VOIX.
# Paysage 16:9. Short jumeau : proba_bin_calculer_short.py.
#
# ⭐⭐ UNE voix, UN script, DEUX rendus : ProbaBinCalculerBase porte toutes les
# scènes ; les sous-classes ne changent que l'identité et la ceinture
# (STMG BLEUE, Tle spé NOIRE). La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE DE BERNOULLI du coach (`arbre_proba` : carte
# blanche, branches grises, lettres S / E aux nœuds, probabilités en bleu,
# chemin allumé en orange), ici à QUATRE niveaux (16 chemins), de GAUCHE à
# DROITE comme au coach (carte à gauche) ; les calculs se construisent dans la
# colonne de droite. Les 6 chemins à deux succès s'allument un à un. Le coefficient « 2 parmi 4 » s'écrit comme au
# lycée : 4 au-dessus de 2 entre grandes parenthèses dessinées.
# Nombres des branches en GRAND (lisibles au téléphone), posés SUR la branche
# avec un fond blanc : 0,3 / 0,7 au premier niveau (dès l'écran 03, une fois
# dits), puis sur le chemin suivi au moment où la voix les dit.
# ⛔ PAS D'ÉCART : aucun 1, 4, 6, 4, 1 du triangle (non dit).
#
# Écrans : 00 garde · 01 la boutique de vélos (0,3, 4 clients, B(4 ; 0,3)) ·
# 02 un chemin S S E E : 0,3² × 0,7² = 0,09 × 0,49 = 0,0441 · 03 combien de
# chemins ? « 2 parmi 4 » = 6 · 04 P(X = 2) = 6 × 0,0441 = 0,2646, puis la
# formule · 05 la calculatrice · 06 le piège (un seul chemin) · 07 défi
# P(X = 1) · 07b correction (4 × 0,3 × 0,7³ = 0,4116) · 08 ce que tu as appris
# · 09 fin (« Entraîne-toi sur eleveai.fr » + abonnement).
#
# Voix : manim/voix/stmg-terminale-proba-bin-calculer.json (débit −7).
# Rendus (media à soi) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_calculer.py ProbaBinCalculerSTMG -o eleveai-maths-stmg-proba-bin-calculer --media_dir manim/scripts/stmg/media-bin_calculer
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_calculer.py ProbaBinCalculerTerminale -o eleveai-maths-terminale-proba-bin-calculer --media_dir manim/scripts/stmg/media-bin_calculer
# Sorties : manim/sorties/stmg/maths/probabilites/40-bin-calculer/ et
# manim/sorties/terminale/maths/probabilites/13-bin-calculer/.

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
from proba_pc_conditionnelle import (  # noqa: E402
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, pastille, suite,
)

BLEU_NB = "#60A5FA"     # les nombres recopiés dans les calculs
MUR = "#0E7490"         # la façade de la boutique
STORE_A = "#F97316"     # le store rayé
CADENAS = "#FACC15"     # l'antivol


def P(x, y):
    return np.array([x, y, 0.0])


def puissance(base, exposant, fs=48, color=WHITE, c_exp=None):
    """0,3² en Text : l'exposant, plus petit, posé en haut à droite."""
    b = Text(base, font_size=fs, color=color)
    e = Text(exposant, font_size=int(fs * 0.6), color=c_exp or color)
    e.next_to(b, RIGHT, buff=0.04).align_to(b, UP).shift(UP * 0.13 * fs / 48)
    return VGroup(b, e)


def binom(n, k, fs=44, color=WHITE):
    """« k parmi n » comme au lycée : n au-dessus de k, entre deux grandes
    parenthèses DESSINÉES (deux arcs)."""
    hn = Text(str(n), font_size=fs, color=color)
    hk = Text(str(k), font_size=fs, color=color)
    pile = VGroup(hn, hk).arrange(DOWN, buff=0.1 * fs / 44)
    h = pile.height + 0.22 * fs / 44
    w = max(hn.width, hk.width) / 2 + 0.12 * fs / 44
    c = pile.get_center()
    sw = max(2.5, fs / 12)
    g = ArcBetweenPoints(c + P(-w, h / 2), c + P(-w, -h / 2), angle=0.75, color=color, stroke_width=sw)
    d = ArcBetweenPoints(c + P(w, h / 2), c + P(w, -h / 2), angle=-0.75, color=color, stroke_width=sw)
    return VGroup(g, pile, d)


def p_egal(k, fs=44, color=WHITE):
    """« P(X = k) »."""
    return Text(f"P(X = {k})", font_size=fs, color=color)


# ── les dessins : l'antivol, le client, la boutique, la calculatrice ───────

def cadenas(s=1.0, color=CADENAS):
    anse = Arc(radius=0.2, start_angle=0, angle=PI, color=GREY_B, stroke_width=7).move_to(P(0, 0.27))
    corps = RoundedRectangle(width=0.56, height=0.44, corner_radius=0.08, fill_color=color, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5).move_to(P(0, -0.05))
    trou = Dot(P(0, -0.02), radius=0.05, color=ENCRE)
    return VGroup(anse, corps, trou).scale(s)


def client(couleur, s=1.0):
    tete = Circle(radius=0.16, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0, 0.55))
    corps = RoundedRectangle(width=0.42, height=0.5, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5).move_to(P(0, 0.12))
    j1 = Line(P(-0.1, -0.12), P(-0.14, -0.48), color=WHITE, stroke_width=6)
    j2 = Line(P(0.1, -0.12), P(0.14, -0.48), color=WHITE, stroke_width=6)
    return VGroup(tete, corps, j1, j2).scale(s)


def velo(s=1.0, color=WHITE):
    r1 = Circle(radius=0.28, color=color, stroke_width=4).move_to(P(-0.42, 0))
    r2 = Circle(radius=0.28, color=color, stroke_width=4).move_to(P(0.42, 0))
    cadre = VMobject(stroke_color=color, stroke_width=4)
    cadre.set_points_as_corners([P(-0.42, 0), P(-0.08, 0.36), P(0.3, 0.36), P(0.42, 0), P(0.0, 0.0), P(-0.08, 0.36)])
    guidon = Line(P(0.3, 0.36), P(0.36, 0.52), color=color, stroke_width=4)
    selle = Line(P(-0.18, 0.44), P(0.0, 0.44), color=color, stroke_width=5)
    return VGroup(r1, r2, cadre, guidon, selle).scale(s)


def boutique(s=1.0):
    """La boutique de vélos : façade, store rayé, vitrine avec un vélo, porte."""
    mur = Rectangle(width=4.0, height=2.6, fill_color=MUR, fill_opacity=1, stroke_color=WHITE,
                    stroke_width=2).move_to(P(0, 0))
    bandes = VGroup(*[Polygon(P(-2.1 + k * 0.42, 1.3), P(-2.1 + (k + 1) * 0.42, 1.3),
                              P(-2.1 + (k + 1) * 0.42, 1.0), P(-2.1 + k * 0.42, 1.0),
                              fill_color=STORE_A if k % 2 == 0 else WHITE, fill_opacity=1, stroke_width=0)
                      for k in range(10)])
    vitrine = Rectangle(width=2.0, height=1.25, fill_color="#BAE6FD", fill_opacity=0.9, stroke_color=WHITE,
                        stroke_width=2).move_to(P(-0.75, 0.05))
    v = velo(0.95, ENCRE).move_to(vitrine)
    porte = Rectangle(width=0.9, height=1.75, fill_color="#164E63", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).move_to(P(1.2, -0.42))
    poignee = Dot(P(0.9, -0.45), radius=0.05, color=CADENAS)
    return VGroup(mur, bandes, vitrine, v, porte, poignee).scale(s)


def calculatrice(s=1.0):
    """Une calculatrice : le corps, l'écran (vide), les touches."""
    corps = RoundedRectangle(width=3.2, height=4.6, corner_radius=0.25, fill_color="#1F2937", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    ecran = RoundedRectangle(width=2.7, height=1.45, corner_radius=0.1, fill_color="#D9F99D", fill_opacity=1,
                             stroke_color=BLACK, stroke_width=2).move_to(P(0, 1.35))
    touches = VGroup()
    for i in range(4):
        for j in range(4):
            touches.add(RoundedRectangle(width=0.52, height=0.38, corner_radius=0.06,
                                         fill_color="#F97316" if j == 3 else "#475569", fill_opacity=1,
                                         stroke_width=0).move_to(P(-0.96 + j * 0.64, -0.05 - i * 0.55)))
    return VGroup(corps, ecran, touches).scale(s)


# ── l'ARBRE DE BERNOULLI du coach, à quatre niveaux, de GAUCHE à DROITE ─────

FEUILLES = [a + b + c + d for a in "se" for b in "se" for c in "se" for d in "se"]   # S d'abord (en haut)
DEUX_S = [f for f in FEUILLES if f.count("s") == 2]     # ssee, sese, sees, esse, eses, eess
UN_S = [f for f in FEUILLES if f.count("s") == 1]       # seee, esee, eese, eees


class ArbreBin(VGroup):
    """Carte blanche du coach : quatre épreuves, S (succès) / E (échec), de
    gauche à droite, S au-dessus. Les nœuds sont nommés par leur chemin :
    "s", "se", "ssee"… branches[c] : la branche qui ARRIVE au nœud c ;
    lab[c] : sa lettre. Les probabilités sont des étiquettes POSÉES SUR la
    branche (fond blanc), assez grandes pour un téléphone."""

    def __init__(self, dx=1.3, pas=0.385, fs=24, r=0.2, **kw):
        super().__init__(**kw)
        self.pas = pas
        self.pos = {}
        for i, f in enumerate(FEUILLES):
            self.pos[f] = P(4 * dx, (7.5 - i) * pas)
        for niv in (3, 2, 1, 0):
            for c in sorted({f[:niv] for f in FEUILLES}):
                self.pos[c] = P(niv * dx, (self.pos[c + "s"][1] + self.pos[c + "e"][1]) / 2)
        self.cles = [c for c in self.pos if c]
        self.branches, self.lab = {}, {}
        for c in sorted(self.cles, key=len):
            a, b = self.pos[c[:-1]], self.pos[c]
            u = (b - a) / np.linalg.norm(b - a)
            debut = a + u * (0.07 if len(c) == 1 else r)
            self.branches[c] = Line(debut, b - u * r, color=BRANCHE, stroke_width=3.5)
            self.lab[c] = Text("S" if c[-1] == "s" else "E", font_size=fs, color=ENCRE, weight=BOLD).move_to(b)
        self.depart = Dot(self.pos[""], radius=0.07, color=ENCRE)
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values())
        self.carte = RoundedRectangle(width=tout.width + 1.75, height=tout.height + 0.4, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(RIGHT * 0.55)
        self.nombres = {}
        self.marques = {}
        self.add(self.carte, *self.branches.values(), self.depart, *self.lab.values())

    def socle(self):
        return VGroup(self.carte, self.depart)

    def niveau(self, n):
        return [c for c in self.cles if len(c) == n]

    def construire(self, n, run_time=0.5):
        cs = self.niveau(n)
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.4) for c in cs], run_time=run_time * 0.4))

    def nombre(self, c, texte, fs=26):
        """La probabilité de la branche c, en bleu gras, posée SUR la branche
        (au milieu) avec un fond blanc : lisible sans chevaucher les voisines.
        self.k : l'échelle de l'arbre (le texte la suit)."""
        k = getattr(self, "k", 1.0)
        t = Text(texte, font_size=fs * k, color=PROBA, weight=BOLD)
        fond = RoundedRectangle(width=t.width + 0.1 * k, height=t.height + 0.09 * k, corner_radius=0.05 * k,
                                fill_color=WHITE, fill_opacity=1, stroke_color=PROBA, stroke_width=1.2)
        g = VGroup(fond, t.move_to(fond)).move_to(self.branches[c].get_center())
        self.nombres[c] = g
        return g

    def marque(self, f, color=CHEMIN):
        """Le rond orange à droite de la feuille f : « ce chemin compte »."""
        k = getattr(self, "k", 1.0)
        m = Dot(self.lab[f].get_center() + RIGHT * 0.36 * k, radius=0.1 * k, color=color)
        self.marques[f] = m
        return m

    @staticmethod
    def chemin(f):
        return [f[:k] for k in range(1, len(f) + 1)]

    def etat(self, feuilles=None, op=0.18):
        """Allume les chemins menant aux feuilles données ; estompe le reste."""
        on = None if feuilles is None else {c for f in feuilles for c in self.chemin(f)}
        anims = []
        for c in self.cles:
            allume = on is None or c in on
            br = self.branches[c]
            if on is None:
                anims.append(br.animate.set_stroke(BRANCHE, 3.5, opacity=1))
            elif allume:
                anims.append(br.animate.set_stroke(CHEMIN, 8, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 3.5, opacity=op))
            anims.append(self.lab[c].animate.set_opacity(1 if allume else op))
            if c in self.nombres and self.nombres[c] in self.submobjects:
                anims.append(self.nombres[c].animate.set_opacity(1 if allume else op))
        return anims

    def figer(self, feuilles, op=0.18):
        """Le même état qu'`etat`, posé d'emblée."""
        for c in self.cles:
            on = any(c in self.chemin(f) for f in feuilles)
            self.lab[c].set_opacity(1 if on else op)
            self.branches[c].set_stroke(CHEMIN if on else BRANCHE, 8 if on else 3.5, opacity=1 if on else op)
            if c in self.nombres:
                self.nombres[c].set_opacity(1 if on else op)
        return self

    def premiers(self):
        """Les probabilités du PREMIER niveau : 0,3 sur S, 0,7 sur E."""
        return [self.nombre("s", "0,3", 32), self.nombre("e", "0,7", 32)]


class ProbaBinCalculerBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que identité et ceinture."""

    nom_voix = "stmg-terminale-proba-bin-calculer"
    identite = "Maths — EleveAI"
    ceinture = "bleue"
    X_C = 3.55          # le centre de la colonne des calculs (à droite de l'arbre)
    LARG_C = 6.0        # sa largeur utile en haut
    X_B, LARG_B = 2.7, 4.1     # en bas (Ti-Margo dans le coin)
    YS = (2.15, 1.1, 0.05, -1.0, -2.05, -3.05)

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def rang(self, i, *objs, buff=0.18, x=None):
        """La ligne i de la colonne de droite (0 = en haut), bornée en largeur."""
        g = suite(*objs, buff=buff)
        bas = self.YS[i] < -1.5
        larg = self.LARG_B if bas else self.LARG_C
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g.move_to(P(x if x is not None else (self.X_B if bas else self.X_C), self.YS[i]))

    def arbre(self, echelle=1.0, gauche=-6.95, y=-0.3):
        """L'arbre de la vidéo, de gauche à droite, carte collée à gauche."""
        a = ArbreBin().scale(echelle)
        a.k = echelle
        a.shift(P(gauche - a.carte.get_left()[0], y - a.carte.get_center()[1]))
        return a

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Loi binomiale", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("calculer P(X = k)", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.95))
        a = ArbreBin().scale(0.4).move_to(P(-0.6, -0.3))
        a.remove(*a.branches.values(), *a.lab.values())
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a.socle()), run_time=0.9)
        self.au_mot("Calculer")
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.4)
        for n in (1, 2, 3, 4):
            self.play(a.construire(n, 0.35))
        self.play(*a.etat(DEUX_S), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : la boutique de vélos ───────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La boutique de vélos")
        bq = boutique(0.95).move_to(P(-3.9, 0.85))
        self.au_mot("boutique de vélos")
        self.play(FadeIn(bq, shift=UP * 0.2), run_time=0.7)
        self.au_mot("achète un antivol")
        cad = cadenas(1.3).move_to(P(1.6, 1.75))
        mot = self.t("antivol", 38, CADENAS).next_to(cad, RIGHT, buff=0.3)
        self.play(FadeIn(cad, scale=1.6), FadeIn(mot, shift=LEFT * 0.15), run_time=0.6)
        self.au_mot("0,3")
        trois = self.t("0,3", 60, JAUNE_TITRE).next_to(mot, RIGHT, buff=0.45)
        self.play(FadeIn(trois, scale=1.8), run_time=0.5)
        self.insister(trois, 0.25)
        self.au_mot("indépendamment")
        ind = self.t("indépendamment des autres", 32, VERT_OK).move_to(P(3.0, 0.85))
        self.play(FadeIn(ind, shift=UP * 0.15), run_time=0.5)
        self.au_mot("4 clients")
        couleurs = ["#38BDF8", "#A78BFA", "#F472B6", "#34D399"]
        gens = VGroup(*[client(c, 0.9) for c in couleurs]).arrange(RIGHT, buff=0.35).move_to(P(-3.9, -1.55))
        quatre = self.t("4 clients", 40, WHITE).move_to(P(-3.9, -2.75))
        self.play(LaggedStart(*[FadeIn(g, shift=RIGHT * 0.8) for g in gens], lag_ratio=0.2),
                  FadeIn(quatre[0], scale=1.8), run_time=1.0)
        self.play(FadeIn(quatre[1:]), run_time=0.3)
        self.au_mot("X compte")
        xc = VGroup(self.t("X : le nombre", 36), self.t("d'antivols vendus", 36)).arrange(DOWN, buff=0.1)
        xc.move_to(P(2.4, -0.4))
        self.play(FadeIn(xc, shift=UP * 0.15), run_time=0.6)
        self.au_mot("X suit B")
        loi = suite(self.t("X suit", 44), self.t("B(4 ; 0,3)", 48, BLEU_CALCUL), buff=0.25).move_to(P(2.4, -1.75))
        self.play(FadeIn(loi[0]), Write(loi[1]), run_time=0.9)
        cadre = SurroundingRectangle(loi, color=BLEU_CALCUL, buff=0.18, stroke_width=3)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 02 : un chemin S S E E ──────────────────────────────────────────────

    def mot_chemin(self, f, fs=44):
        return suite(*[self.t("S" if c == "s" else "E", fs, BLEU_NB if c == "s" else ORANGE_RETENUE)
                       for c in f], buff=0.18)

    def ecran_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-chemin")
        self.titre_ecran("Un chemin")
        a = self.arbre()
        self.add(a.socle())
        for n in (1, 2, 3, 4):
            self.play(a.construire(n, 0.45))
        f = "ssee"
        ch = a.chemin(f)
        mc = self.rang(0, self.mot_chemin(f))[0]
        p3 = puissance("0,3", "2", 50, BLEU_NB)
        fois = self.t("×", 46)
        p7 = puissance("0,7", "2", 50, BLEU_NB)
        l1 = self.rang(1, p3, fois, p7, buff=0.25)
        self.au_mot("succès, succès, échec")
        for k, c in enumerate(ch):
            self.play(*a.etat([f[:k + 1]]), FadeIn(mc[k], scale=1.5), run_time=0.4)
        self.au_mot("0,3 au carré")
        n3 = [a.nombre(c, "0,3") for c in ch[:2]]
        self.play(*[FadeIn(n, scale=1.6) for n in n3], TransformFromCopy(n3[0], p3[0]), run_time=0.6)
        self.play(FadeIn(p3[1], scale=1.8), run_time=0.3)
        self.au_mot("fois 0,7")
        n7 = [a.nombre(c, "0,7") for c in ch[2:]]
        self.play(*[FadeIn(n, scale=1.6) for n in n7], FadeIn(fois), TransformFromCopy(n7[0], p7[0]),
                  run_time=0.6)
        a.add(*n3, *n7)
        self.au_mot("0,7 au carré")
        self.play(FadeIn(p7[1], scale=1.8), run_time=0.3)
        r09, x2, r49 = self.t("0,09", 50, BLEU_NB), self.t("×", 46), self.t("0,49", 50, BLEU_NB)
        eg1 = self.t("=", 46)
        l2 = self.rang(2, eg1, r09, x2, r49, buff=0.25)
        res = self.rang(3, self.t("=", 46), self.t("0,0441", 56, JAUNE_TITRE), buff=0.25)
        self.au_mot("0,09")
        self.play(FadeIn(eg1), TransformFromCopy(p3, r09), run_time=0.6)
        self.au_mot("fois 0,49")
        self.play(FadeIn(x2), TransformFromCopy(p7, r49), run_time=0.6)
        self.au_mot("0,0441")
        self.play(FadeIn(res[0]), FadeIn(res[1], scale=1.8), run_time=0.5)
        self.insister(res[1])
        b = pastille("0,0441", 20).next_to(a.lab[f], RIGHT, buff=0.12)
        self.play(TransformFromCopy(res[1], b), run_time=0.6)
        self.attendre_voix()

    # ── 03 : combien de chemins ? « 2 parmi 4 » ─────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-compter")
        a = self.arbre()
        a.add(*a.premiers())
        a.figer(["ssee"])
        self.add(a)
        self.titre_ecran("Combien de chemins ?")
        q = VGroup(self.t("Combien de chemins", 40), self.t("avec 2 succès ?", 40, BLEU_NB)).arrange(DOWN, buff=0.12)
        q.move_to(P(self.X_C, 1.7))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        marques = [a.marque(f) for f in DEUX_S]
        for k, f in enumerate(DEUX_S):
            self.play(*a.etat(DEUX_S[:k + 1]), FadeIn(marques[k], scale=2.0), run_time=0.38)
        self.au_mot("coefficient binomial")
        bn = binom(4, 2, 50, ORANGE_RETENUE)
        nom = self.t("« 2 parmi 4 »", 40, ORANGE_RETENUE)
        eg = self.t("=", 50)
        six = self.t("6 chemins", 50, VERT_OK)
        l2 = self.rang(3, bn, eg, six, buff=0.3, x=self.X_C - 0.2).shift(UP * 0.35)
        nom.move_to(P(self.X_C, self.YS[2] + 0.25))
        self.play(FadeIn(bn, scale=1.4), run_time=0.5)
        self.au_mot("2 parmi 4")
        self.play(FadeIn(nom, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("6 chemins")
        self.play(FadeIn(eg), FadeIn(six, scale=1.6), *[Flash(m, color=CHEMIN, line_length=0.12, flash_radius=0.18)
                                                         for m in marques], run_time=0.6)
        self.insister(six)
        self.attendre_voix()

    # ── 04 : P(X = 2) = 6 × 0,0441, puis la formule ─────────────────────────

    def arbre_six(self):
        a = self.arbre()
        a.add(*a.premiers())
        a.figer(DEUX_S)
        for f in DEUX_S:
            a.add(a.marque(f))
        return a

    def formule(self, fs=40):
        """P(X = k) = (n k) × p^k × (1 − p)^(n − k), en morceaux."""
        pk = self.t("P(X = k)", fs)
        eg = self.t("=", fs)
        bn = binom("n", "k", fs, ORANGE_RETENUE)
        f1 = self.t("×", fs)
        pp = puissance("p", "k", fs + 4, BLEU_NB)
        f2 = self.t("×", fs)
        qq = puissance("(1 − p)", "n − k", fs, BLEU_NB)
        return suite(pk, eg, bn, f1, pp, f2, qq, buff=0.2)

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-formule")
        a = self.arbre_six()
        self.add(a)
        self.titre_ecran("La formule")
        px = p_egal(2, 46)
        eg1, fois = self.t("=", 46), self.t("×", 46)
        six = self.t("6", 54, ORANGE_RETENUE)
        un = self.t("0,0441", 48, BLEU_NB)
        self.rang(0, px, eg1, six, fois, un, buff=0.22)
        res = self.rang(1, self.t("=", 48), self.t("0,2646", 58, VERT_OK), buff=0.22)
        self.au_mot("P de X égale 2")
        self.play(FadeIn(px, shift=UP * 0.15), run_time=0.5)
        self.au_mot("6 fois")
        self.play(FadeIn(eg1), FadeIn(six, scale=1.8), *[Indicate(a.marques[f], color=CHEMIN, scale_factor=1.8)
                                                         for f in DEUX_S], run_time=0.6)
        self.play(FadeIn(fois), run_time=0.2)
        self.au_mot("0,0441, soit")
        self.play(FadeIn(un, shift=UP * 0.15), run_time=0.4)
        self.au_mot("0,2646")
        self.play(FadeIn(res[0]), FadeIn(res[1], scale=1.8), run_time=0.5)
        cad = SurroundingRectangle(res[1], color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(res[1], cad))
        fo = self.formule(46)
        pk, eg, bn, f1, pp, f2, qq = fo
        self.rang(2, pk, eg, buff=0.2).shift(DOWN * 0.15)
        self.rang(3, bn, f1, pp, f2, qq, buff=0.2).shift(DOWN * 0.3)
        self.au_mot("La formule")
        self.play(FadeIn(VGroup(pk, eg), shift=UP * 0.15), run_time=0.5)
        self.au_mot("k parmi n")
        self.play(FadeIn(bn, scale=1.4), Indicate(six, color=ORANGE_RETENUE), run_time=0.6)
        self.au_mot("fois p puissance k")
        self.play(FadeIn(f1), FadeIn(pp[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("puissance k")
        self.play(FadeIn(pp[1], scale=1.8), run_time=0.3)
        self.au_mot("fois 1 moins p")
        self.play(FadeIn(f2), FadeIn(qq[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("puissance n moins k")
        self.play(FadeIn(qq[1], scale=1.8), run_time=0.4)
        self.play(Indicate(VGroup(pp, f2, qq), color=BLEU_NB, scale_factor=1.08), Indicate(un, color=BLEU_NB),
                  run_time=0.7)
        self.attendre_voix()

    # ── 05 : la calculatrice ────────────────────────────────────────────────

    def ecran_calculatrice(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calculatrice")
        self.titre_ecran("À la calculatrice")
        c = calculatrice(0.95).move_to(P(-3.3, -0.45))
        ecran = c[1]
        self.play(FadeIn(c, shift=UP * 0.2), run_time=0.6)
        rap = suite(p_egal(2, 46), self.t("=", 46), self.t("0,2646", 52, VERT_OK), buff=0.25).move_to(P(2.6, 0.5))
        self.au_mot("la loi binomiale")
        l1 = Text("loi binomiale", font_size=26, color=BLACK).move_to(ecran.get_center() + UP * 0.35)
        self.play(Write(l1), FadeIn(rap[:2], shift=UP * 0.15), run_time=0.6)
        self.au_mot("0,2646")
        val = Text("0,2646", font_size=50, color=BLACK).move_to(ecran.get_center() + DOWN * 0.22)
        val.align_to(ecran.get_right() + LEFT * 0.18, RIGHT)
        self.play(FadeIn(val, shift=LEFT * 0.2), run_time=0.4)
        self.insister(val, 0.25)
        ok = self.coche(taille=0.35).next_to(rap, DOWN, buff=0.45)
        self.play(TransformFromCopy(val, rap[2]), run_time=0.6)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège : un seul chemin ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        a = self.arbre()
        a.add(*a.premiers())
        a.figer(["ssee"])
        self.add(a)
        self.titre_ecran("Le piège")
        self.au_mot("oublier")
        ou = self.t("Oublier", 48, ROUGE_ERREUR)
        bn = binom(4, 2, 46, ORANGE_RETENUE)
        self.rang(0, ou, bn, buff=0.4).shift(DOWN * 0.1)
        self.play(FadeIn(ou, shift=UP * 0.15), run_time=0.4)
        self.au_mot("coefficient binomial")
        croix = VGroup(Line(bn.get_corner(UL), bn.get_corner(DR)), Line(bn.get_corner(DL), bn.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 8)
        self.play(FadeIn(bn, scale=1.3), run_time=0.4)
        self.play(Create(croix), run_time=0.4)
        self.au_mot("0,0441, c'est")
        b = pastille("0,0441", 20).next_to(a.lab["ssee"], RIGHT, buff=0.12)
        un = self.rang(1, self.t("0,0441", 52, BLEU_NB)).shift(DOWN * 0.2)
        seul = self.rang(2, self.t("un seul chemin", 46, ROUGE_ERREUR)).shift(DOWN * 0.15)
        self.play(FadeIn(b, scale=1.5), FadeIn(un, scale=1.5), run_time=0.5)
        self.au_mot("un seul chemin")
        self.play(FadeIn(seul, shift=UP * 0.15), Indicate(b, color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("Il y en a 6")
        marques = [a.marque(f) for f in DEUX_S]
        six = self.rang(3, self.t("Il y en a 6 !", 52, VERT_OK)).shift(DOWN * 0.2)
        self.play(*a.etat(DEUX_S), LaggedStart(*[FadeIn(m, scale=2.0) for m in marques], lag_ratio=0.12),
                  FadeIn(six, scale=1.4), run_time=0.9)
        self.insister(six)
        self.attendre_voix()

    # ── 07 : défi : P(X = 1) ────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre()
        a.add(*a.premiers())
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Calcule")
        q = self.rang(1, self.t("Calcule", 50), p_egal(1, 58, ORANGE_RETENUE), buff=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q[1], 0.25)
        self.au_mot("Mets pause")
        pause = VGroup(self.t("Mets pause,", 46, ORANGE_RETENUE), self.t("et cherche !", 46, ORANGE_RETENUE))
        pause.arrange(DOWN, buff=0.12).move_to(P(self.X_C, -0.4))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        a = self.arbre()
        a.add(*a.premiers())
        self.add(a)
        self.titre_ecran("Correction")
        fs = 46
        self.au_mot("1 parmi 4")
        bn = binom(4, 1, 44, ORANGE_RETENUE)
        eg = self.t("=", fs)
        quatre = self.t("4 chemins", fs, VERT_OK)
        self.rang(0, bn, eg, quatre, buff=0.25)
        self.play(FadeIn(bn, scale=1.4), run_time=0.4)
        marques = [a.marque(f) for f in UN_S]
        for k, f in enumerate(UN_S):
            self.play(*a.etat(UN_S[:k + 1]), FadeIn(marques[k], scale=2.0), run_time=0.35)
        self.au_mot("4 chemins")
        self.play(FadeIn(eg), FadeIn(quatre, scale=1.5), run_time=0.5)
        # 4 × 0,3 × 0,7³
        q4, x1, p3, x2, p7 = (self.t("4", fs + 4, ORANGE_RETENUE), self.t("×", fs), self.t("0,3", fs, BLEU_NB),
                              self.t("×", fs), puissance("0,7", "3", fs, BLEU_NB))
        l2 = self.rang(1, p_egal(1, fs), self.t("=", fs), q4, x1, p3, x2, p7, buff=0.18)
        ch = a.chemin("seee")
        nb = [a.nombre(c, "0,7") for c in ch[1:]]
        self.au_mot("4 fois 0,3")
        self.play(FadeIn(l2[:2]), FadeIn(q4, scale=1.6), FadeIn(x1), run_time=0.4)
        self.au_mot("0,3 fois 0,7")
        self.play(Indicate(a.nombres["s"], color=CHEMIN, scale_factor=1.4), TransformFromCopy(a.nombres["s"][1], p3),
                  FadeIn(x2), run_time=0.5)
        self.au_mot("0,7 au cube. 0,7")
        self.play(*[FadeIn(n, scale=1.6) for n in nb], FadeIn(p7[0]), run_time=0.5)
        self.play(FadeIn(p7[1], scale=1.8), run_time=0.3)
        a.add(*nb)
        self.au_mot("0,7 au cube : 0,343")
        c3 = self.rang(2, puissance("0,7", "3", fs, BLEU_NB), self.t("=", fs), self.t("0,343", fs, JAUNE_TITRE),
                       buff=0.2)
        self.play(TransformFromCopy(p7, c3[0]), run_time=0.5)
        self.au_mot("0,343. 4")
        self.play(FadeIn(c3[1]), FadeIn(c3[2], scale=1.6), run_time=0.4)
        l3 = self.rang(3, self.t("=", fs), self.t("4", fs + 4, ORANGE_RETENUE), self.t("×", fs),
                       self.t("0,3", fs, BLEU_NB), self.t("×", fs), self.t("0,343", fs, JAUNE_TITRE), buff=0.2)
        fin = self.rang(4, self.t("=", fs), self.t("0,4116", fs + 10, VERT_OK), buff=0.22)
        self.au_mot("4 fois 0,3 fois 0,343")
        self.play(FadeIn(l3[:5], shift=UP * 0.1), run_time=0.5)
        self.play(TransformFromCopy(c3[2], l3[5]), run_time=0.5)
        self.au_mot("0,4116")
        self.play(FadeIn(fin[0]), FadeIn(fin[1], scale=1.8), run_time=0.5)
        cad = SurroundingRectangle(fin[1], color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(fin[1], cad))
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fo = self.formule(60)
        if fo.width > 11.5:
            fo.scale_to_fit_width(11.5)
        fo.move_to(P(-0.3, 1.25))
        pk, eg, bn, f1, pp, f2, qq = fo
        lab1 = VGroup(self.coche(ORANGE_RETENUE), self.t("le nombre de chemins", 34, ORANGE_RETENUE))
        lab1.arrange(RIGHT, buff=0.25)
        lab2 = VGroup(self.coche(BLEU_NB), self.t("la probabilité d'un chemin", 34, BLEU_NB))
        lab2.arrange(RIGHT, buff=0.25)
        lab1.move_to(P(-3.2, -0.55))
        lab2.move_to(P(1.2, -1.6))
        fl1 = Arrow(lab1[1].get_top(), bn.get_bottom(), buff=0.12, color=ORANGE_RETENUE, stroke_width=4)
        cible = VGroup(pp, f2, qq)
        acc = Brace(cible, DOWN, buff=0.12, color=BLEU_NB)
        fl2 = Arrow(lab2[1].get_top(), acc.get_bottom(), buff=0.1, color=BLEU_NB, stroke_width=4)
        self.au_mot("P de X égale k")
        self.play(FadeIn(VGroup(pk, eg), shift=UP * 0.15), run_time=0.5)
        self.au_mot("le nombre de chemins")
        self.play(FadeIn(lab1[1], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("k parmi n")
        self.play(FadeIn(bn, scale=1.4), GrowArrow(fl1), run_time=0.6)
        self.play(Create(lab1[0]), run_time=0.3)
        self.au_mot("la probabilité d'un chemin")
        self.play(FadeIn(f1), FadeIn(lab2[1], shift=RIGHT * 0.2), GrowFromCenter(acc), GrowArrow(fl2), run_time=0.6)
        self.play(Create(lab2[0]), run_time=0.3)
        self.au_mot("p puissance k")
        self.play(FadeIn(pp, shift=UP * 0.1), run_time=0.5)
        self.au_mot("1 moins p")
        self.play(FadeIn(f2), FadeIn(qq, shift=UP * 0.1), run_time=0.6)
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
        self.ecran_chemin()
        self.ecran_compter()
        self.ecran_formule()
        self.ecran_calculatrice()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaBinCalculerSTMG(ProbaBinCalculerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"


class ProbaBinCalculerTerminale(ProbaBinCalculerBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
