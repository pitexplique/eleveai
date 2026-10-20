# proba_bin_reconnaitre.py
# EleveAI — Maths STMG (micro vaT_bin_reconnaitre, notion
# va_binomiale_reconnaitre) ET Maths Tle spé (micro binomiale_reconnaitre,
# notion loi_binomiale) — lot « Loi binomiale » :
# RECONNAÎTRE UNE LOI BINOMIALE, AVEC VOIX. Paysage 16:9.
#
# ⭐⭐ UNE voix, UN script, DEUX rendus : ProbaBinReconnaitreBase porte toutes
# les scènes ; les sous-classes ne changent que l'identité et la ceinture
# (STMG BLEUE, Tle spé NOIRE). La voix ne cite aucune classe.
#
# ⭐ La figure centrale est l'ARBRE du coach (`arbre_proba` « Schéma de
# Bernoulli » de la banque Tle : carte blanche, branches grises, succès S /
# échec E, probabilités en bleu au milieu des branches, chemin allumé en
# orange). Trois niveaux dessinés, puis les pointillés jusqu'au 10e appel.
# Les micros n'ont pas d'autre canvas (la STMG n'en a aucun).
# ⛔ PAS D'ÉCART : aucun nombre de ventes n'est écrit (la voix n'en dit aucun) ;
# dans le piège, le premier appel qui vend est MONTRÉ, pas numéroté.
#
# Écrans : 00 garde · 01 le centre d'appels (0,2, indépendant, 10 appels, X)
# · 02 les trois conditions · 03 X suit B(10 ; 0,2) · 04 l'arbre, 10 niveaux,
# schéma de Bernoulli · 05 le piège du premier succès · 06 défi (5 lancers de
# dé, nombre de 6) · 06b correction B(5 ; 1/6) · 07 ce que tu as appris ·
# 08 fin (« Entraîne-toi sur eleveai.fr » + abonnement).
#
# Voix : manim/voix/stmg-terminale-proba-bin-reconnaitre.json (débit −7).
# Rendus (media à soi) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_reconnaitre.py ProbaBinReconnaitreSTMG -o eleveai-maths-stmg-proba-bin-reconnaitre --media_dir manim/scripts/stmg/media-vaT_bin_reconnaitre
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_reconnaitre.py ProbaBinReconnaitreTerminale -o eleveai-maths-terminale-proba-bin-reconnaitre --media_dir manim/scripts/stmg/media-vaT_bin_reconnaitre
# Sorties : manim/sorties/stmg/maths/probabilites/38-bin-reconnaitre/ et
# manim/sorties/terminale/maths/probabilites/11-bin-reconnaitre/.

import sys
from itertools import product
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, CHEMIN, ENCRE, PROBA, frac, lettre, suite  # noqa: E402
from proba_totales import panneau  # noqa: E402
from annonce_probabilites import de  # noqa: E402

C_S = VERT_OK            # S (succès, vente) écrit en clair
C_E = ROUGE_ERREUR       # E (échec)
TEL = "#334155"          # le corps du téléphone
ECRAN = "#0EA5E9"        # l'écran qui sonne
PEAU = "#F5D0A9"
PROBA_C = "#60A5FA"     # le bleu des probabilités, lisible sur fond noir
VENTES = [False, False, True, False, False, False, True, False, False, False]   # un exemple, jamais compté


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : téléphone, conseiller ─────────────────────────────────────

def telephone(s=1.0):
    """Un smartphone : corps sombre, écran bleu, petit haut-parleur."""
    corps = RoundedRectangle(width=0.62, height=1.05, corner_radius=0.1, fill_color=TEL, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    ecran = RoundedRectangle(width=0.5, height=0.78, corner_radius=0.05, fill_color=ECRAN, fill_opacity=1,
                             stroke_width=0).shift(DOWN * 0.04)
    hp = Line(P(-0.08, 0.45), P(0.08, 0.45), color=GREY_B, stroke_width=2)
    return VGroup(corps, ecran, hp).scale(s)


def issue_tel(t, vente):
    """Ce qui s'affiche sur l'écran du téléphone t : un panneau (vente) ou une croix."""
    e = t[1]
    if vente:
        m = panneau(e.width / 1.25).move_to(e)
    else:
        d = e.width * 0.3
        c = e.get_center()
        m = VGroup(Line(c + P(-d, d), c + P(d, -d), color=WHITE, stroke_width=5),
                   Line(c + P(-d, -d), c + P(d, d), color=WHITE, stroke_width=5))
    return m


def colorer_tel(t, vente):
    return t[1].animate.set_fill(C_S if vente else "#64748B")


def ondes(t, n=2):
    """Les ondes de la sonnerie, à droite du téléphone."""
    c = t.get_right() + RIGHT * 0.05
    return VGroup(*[Arc(radius=0.18 + 0.14 * k, start_angle=-0.6, angle=1.2, color=JAUNE_TITRE,
                        stroke_width=3).move_arc_center_to(c) for k in range(n)])


def conseiller(s=1.0):
    """Un conseiller au casque : tête, buste, arceau, écouteur, micro."""
    buste = Ellipse(width=1.5, height=1.0, fill_color="#2563EB", fill_opacity=1, stroke_width=0).move_to(P(0, -0.85))
    buste = Intersection(buste, Rectangle(width=2, height=0.55).move_to(P(0, -0.62)), fill_color="#2563EB",
                         fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.42, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.05))
    cheveux = Intersection(Circle(radius=0.44).move_to(P(0, 0.08)), Rectangle(width=1, height=0.4).move_to(P(0, 0.4)),
                           fill_color="#3F2A1D", fill_opacity=1, stroke_width=0)
    arceau = Arc(radius=0.5, start_angle=0.15, angle=PI - 0.3, color="#111827", stroke_width=7).move_to(P(0, 0.33))
    ecout = VGroup(*[RoundedRectangle(width=0.16, height=0.3, corner_radius=0.06, fill_color="#111827",
                                      fill_opacity=1, stroke_width=0).move_to(P(sg * 0.47, 0.03)) for sg in (-1, 1)])
    micro = VGroup(Line(P(0.45, -0.05), P(0.18, -0.3), color="#111827", stroke_width=4),
                   Dot(P(0.16, -0.31), radius=0.05, color="#111827"))
    yeux = VGroup(*[Dot(P(sg * 0.14, 0.08), radius=0.04, color="#111827") for sg in (-1, 1)])
    sourire = Arc(radius=0.14, start_angle=PI + 0.5, angle=PI - 1.0, color="#111827", stroke_width=3).move_to(P(0, -0.13))
    return VGroup(buste, tete, cheveux, yeux, sourire, arceau, ecout, micro).scale(s)


def loi_B(n_obj, p_obj, fs=50, color=WHITE):
    """« B(n ; p) » avec des objets pour n et p (p peut être une fraction)."""
    b = Text("B", font_size=fs, color=color, weight=BOLD)
    po = Text("(", font_size=fs, color=color)
    pv = Text(";", font_size=fs, color=color)
    pf = Text(")", font_size=fs, color=color)
    g = VGroup(b, po, n_obj, pv, p_obj, pf)
    for m, (gauche, buff) in zip(g[1:], ((b, 0.06), (po, 0.06), (n_obj, 0.16), (pv, 0.22), (p_obj, 0.08))):
        m.next_to(gauche, RIGHT, buff=buff)
    hauteur = max(n_obj.height, p_obj.height)
    for par in (po, pf):
        par.stretch_to_fit_height(max(par.height, hauteur * 1.15)).set_y(p_obj.get_y())
    for m in (b, n_obj, pv):
        m.set_y(p_obj.get_y())
    pv.shift(DOWN * fs * 0.002)
    return g


# ── l'ARBRE du coach (« Schéma de Bernoulli ») : 3 niveaux, puis … 10e appel ──

class ArbreSE(VGroup):
    """Carte blanche du coach ; un nœud = le chemin qui y mène (tuple de
    booléens, True = S). Trois niveaux dessinés, puis des pointillés au bout de
    chaque feuille et la colonne « 10e appel ». Tout est construit et placé ;
    `ProbaBinReconnaitreBase.arbre` retire ce qui n'est pas encore posé."""

    def __init__(self, dx=1.5, h=0.66, fs=31, fs_nb=28, **kw):
        super().__init__(**kw)
        self.pos = {(): P(0, 0)}
        for L in (1, 2, 3):
            for c in product((True, False), repeat=L):
                i = int("".join("0" if g else "1" for g in c), 2)
                bloc = 2 ** (3 - L)
                ys = [(3.5 - j) * h for j in range(i * bloc, (i + 1) * bloc)]
                self.pos[c] = P(L * dx, sum(ys) / len(ys))
        self.branches, self.lab, self.nb = {}, {}, {}
        for c, v in self.pos.items():
            if not c:
                continue
            u = self.pos[c[:-1]]
            d = (v - u) / np.linalg.norm(v - u)
            debut = u + d * (0.12 if len(c) == 1 else 0.28)
            fin = v - d * 0.28
            self.branches[c] = Line(debut, fin, color=BRANCHE, stroke_width=4)
            self.lab[c] = Text("S" if c[-1] else "E", font_size=fs, color=ENCRE).move_to(v)
            t = Text("0,2" if c[-1] else "0,8", font_size=fs_nb, color=PROBA, weight=BOLD)
            n = np.array([-d[1], d[0], 0.0])
            if (n[1] < 0) == c[-1]:
                n = -n
            demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
            t.move_to((debut + fin) / 2 + n * (demi + 0.05))
            self.nb[c] = t
        self.depart = Dot(self.pos[()], radius=0.07, color=ENCRE)
        # les pointillés au bout des 8 feuilles, puis la colonne du 10e appel
        x_fin = 4.55 * dx
        self.suite_pts = VGroup(*[DashedLine(self.pos[c] + RIGHT * 0.3, P(x_fin - 0.45, self.pos[c][1]),
                                             color=BRANCHE, dash_length=0.08, stroke_width=3)
                                  for c in product((True, False), repeat=3)])
        self.pts_fin = VGroup(*[Text("…", font_size=fs, color=ENCRE).move_to(P(x_fin, self.pos[c][1]))
                               for c in product((True, False), repeat=3)])
        y = -3.5 * h - 0.62
        self.entetes = VGroup(*[Text(m, font_size=19, color=BRANCHE).move_to(P((L - 0.5) * dx, y))
                                for L, m in ((1, "1er appel"), (2, "2e appel"), (3, "3e appel"))])
        self.entete10 = Text("10e appel", font_size=19, color=BRANCHE, weight=BOLD).move_to(P(x_fin - 0.2, y))
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values(), *self.nb.values(), self.entetes,
                      self.suite_pts, self.pts_fin, self.entete10)
        self.carte = RoundedRectangle(width=tout.width + 0.9, height=tout.height + 1.05, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.28)
        self.titre = Text("Arbre pondéré", font_size=21, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.12)
        self.add(self.carte, self.titre, self.depart, self.entetes, self.suite_pts, self.pts_fin, self.entete10,
                 *self.branches.values(), *self.lab.values(), *self.nb.values())
        self.vus = set()

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def niveau(self, L):
        return [c for c in self.pos if len(c) == L]

    def tout_poser(self, nombres=True):
        for c in self.pos:
            if c:
                self.add(self.branches[c], self.lab[c])
                self.vus.add(("b", c))
                if nombres:
                    self.add(self.nb[c])
                    self.vus.add(("n", c))
        self.add(self.entetes, self.suite_pts, self.pts_fin, self.entete10)
        return self

    def pousser(self, L, run_time=0.8):
        cs = self.niveau(L)
        self.vus |= {("b", c) for c in cs}
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.4) for c in cs], run_time=run_time * 0.4))

    def nombres(self, g=None):
        """Les nombres de TOUS les niveaux (g=True : les 0,2 ; False : les 0,8), marqués posés."""
        cs = [c for c in self.pos if c and (g is None or c[-1] == g)]
        self.vus |= {("n", c) for c in cs}
        return [self.nb[c] for c in cs]

    def etat(self, chemins=None, op=0.18):
        """Allume les chemins (orange épais) et estompe le reste ; None : tout normal."""
        on_b = set() if chemins is None else {ch[:k] for ch in chemins for k in range(1, len(ch) + 1)}
        anims = []
        for c, br in self.branches.items():
            if ("b", c) not in self.vus:
                continue
            if chemins is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif c in on_b:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            on = chemins is None or c in on_b
            anims.append(self.lab[c].animate.set_opacity(1 if on else op))
            if ("n", c) in self.vus:
                anims.append(self.nb[c].animate.set_opacity(1 if on else op))
        return anims


class ProbaBinReconnaitreBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que identité et ceinture."""

    nom_voix = "stmg-terminale-proba-bin-reconnaitre"
    identite = "Maths — EleveAI"
    ceinture = "bleue"
    POS = dict(centre=P(-3.3, -0.6), echelle=0.88)

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def titre_ecran(self, texte, *anims, font_size=40, run_time=0.6):
        """Le titre s'écrit VITE, avec ce que la voix dit dès son premier mot."""
        t = Text(texte, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t), *anims, run_time=run_time)
        return t

    def arbre(self, centre=None, echelle=None, complet=True, nombres=True):
        centre = self.POS["centre"] if centre is None else centre
        echelle = self.POS["echelle"] if echelle is None else echelle
        a = ArbreSE().scale(echelle).move_to(centre)
        a.remove(*a.branches.values(), *a.lab.values(), *a.nb.values(), a.entetes, a.suite_pts, a.pts_fin,
                 a.entete10)
        if complet:
            a.tout_poser(nombres)
        return a

    def rangee_tel(self, s=0.75, buff=0.22, centre=P(-1.2, -0.9)):
        return VGroup(*[telephone(s) for _ in range(10)]).arrange(RIGHT, buff=buff).move_to(centre)

    def resultats(self, tels, anims_seules=False):
        """Chaque téléphone affiche son issue (exemple fixe VENTES)."""
        marques = [issue_tel(t, v) for t, v in zip(tels, VENTES)]
        anims = [colorer_tel(t, v) for t, v in zip(tels, VENTES)] + [FadeIn(m, scale=0.5) for m in marques]
        return anims, marques

    def b_ecrit(self, n, p, fs=56, color=WHITE):
        """« X suit B(n ; p) » ; p : texte ou objet (fraction)."""
        n_obj = self.t(n, fs, JAUNE_TITRE)
        p_obj = p if isinstance(p, Mobject) else self.t(p, fs, PROBA_C)
        b = loi_B(n_obj, p_obj, fs, color)
        return suite(self.t("X", fs, color), self.t("suit", int(fs * 0.8), color), b, buff=0.3), n_obj, p_obj

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Reconnaître une loi binomiale", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.95))
        cons = conseiller(1.1).move_to(P(-4.3, -0.3))
        tels = VGroup(*[telephone(0.6) for _ in range(5)]).arrange(RIGHT, buff=0.3).move_to(P(1.0, -0.3))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(cons, shift=UP * 0.2),
                  run_time=0.9)
        anims = [colorer_tel(t, v) for t, v in zip(tels, (False, True, False, False, True))]
        marques = [issue_tel(t, v) for t, v in zip(tels, (False, True, False, False, True))]
        self.play(LaggedStart(*[FadeIn(t, shift=LEFT * 0.3) for t in tels], lag_ratio=0.15), run_time=0.7)
        self.play(*anims, *[FadeIn(m, scale=0.5) for m in marques], run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : le centre d'appels ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un centre d'appels")
        self.au_mot("Un centre d'appels")
        cons = conseiller(1.15).move_to(P(-5.4, 1.45))
        pan = panneau(1.3).next_to(cons, RIGHT, buff=0.45)
        self.play(FadeIn(cons, shift=UP * 0.2), run_time=0.5)
        self.au_mot("panneaux solaires")
        self.play(FadeIn(pan, scale=0.5), run_time=0.4)
        self.au_mot("Chaque appel")
        t1 = telephone(0.9).move_to(P(-1.7, 1.45))
        on = ondes(t1)
        self.play(FadeIn(t1, shift=UP * 0.2), Create(on), run_time=0.5)
        self.au_mot("une vente")
        v = suite(panneau(0.55), self.t("vente :", 38, C_S), buff=0.2).next_to(t1, RIGHT, buff=0.5).shift(UP * 0.25)
        self.play(t1[1].animate.set_fill(C_S), FadeIn(issue_tel(t1, True), scale=0.5), FadeOut(on),
                  FadeIn(v, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("0,2,")
        p02 = self.t("0,2", 54, JAUNE_TITRE).next_to(v, RIGHT, buff=0.25)
        self.play(FadeIn(p02, scale=1.8), run_time=0.35)
        self.insister(p02, 0.15)
        self.au_mot("quel que soit")
        ind = self.t("quel que soit l'appel précédent", 32, BLEU_CALCUL)
        ind.next_to(VGroup(v, p02), DOWN, buff=0.3).align_to(v, LEFT)
        self.play(FadeIn(ind, shift=UP * 0.15), run_time=0.5)
        self.au_mot("10 appels")
        tels = self.rangee_tel()
        dix = suite(self.t("10", 50, JAUNE_TITRE), self.t("appels", 38), buff=0.2).move_to(P(-1.2, -2.05))
        seps = VGroup(*[DashedLine(P((tels[k].get_x() + tels[k + 1].get_x()) / 2, -0.25),
                                   P((tels[k].get_x() + tels[k + 1].get_x()) / 2, -1.55),
                                   color=BLEU_CALCUL, dash_length=0.08, stroke_width=2) for k in range(9)])
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.3) for t in tels], lag_ratio=0.08), FadeIn(dix),
                  Create(seps), run_time=0.8)
        self.au_mot("X compte")
        anims, _ = self.resultats(tels)
        x = suite(self.t("X", 44, JAUNE_TITRE), self.t("compte le nombre de ventes", 36), buff=0.25)
        x.move_to(P(-1.2, -2.85))
        self.play(*anims, FadeIn(x, shift=UP * 0.15), run_time=0.8)
        ventes = [t for t, vv in zip(tels, VENTES) if vv]
        self.play(*[Indicate(t, color=C_S, scale_factor=1.25) for t in ventes], run_time=0.6)
        self.attendre_voix()

    # ── 02 : les trois conditions ───────────────────────────────────────────

    def case(self):
        return RoundedRectangle(width=0.5, height=0.5, corner_radius=0.08, stroke_color=WHITE, stroke_width=3)

    def cocher(self, boite):
        c = self.coche(taille=0.2).move_to(boite)
        self.play(Create(c), boite.animate.set_stroke(VERT_OK), run_time=0.4)
        return c

    def ecran_conditions(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-conditions")
        xg, ys = -6.2, (1.75, 0.0, -1.75)
        boites = [self.case().move_to(P(xg + 0.25, y)) for y in ys]
        self.titre_ecran("Trois conditions", LaggedStart(*[Create(b) for b in boites], lag_ratio=0.25))
        # ① une même épreuve à deux issues, p = 0,2
        self.au_mot("Une même épreuve")
        l1 = VGroup(self.t("Une même épreuve", 36), self.t("à deux issues", 36)).arrange(DOWN, aligned_edge=LEFT,
                                                                                         buff=0.1)
        l1.next_to(boites[0], RIGHT, buff=0.35)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("vente ou pas")
        tv, tn = telephone(0.75), telephone(0.75)
        paire = VGroup(tv, tn).arrange(RIGHT, buff=0.5).move_to(P(1.6, ys[0]))
        self.play(FadeIn(paire, shift=UP * 0.2), run_time=0.3)
        self.play(colorer_tel(tv, True), FadeIn(issue_tel(tv, True), scale=0.5), colorer_tel(tn, False),
                  FadeIn(issue_tel(tn, False), scale=0.5), run_time=0.5)
        self.au_mot("p égale 0,2")
        p = suite(self.t("p", 44, PROBA_C), self.t("=", 44), self.t("0,2", 48, JAUNE_TITRE), buff=0.18)
        p.next_to(paire, RIGHT, buff=0.6)
        self.play(FadeIn(p, scale=1.5), Indicate(tv, color=C_S, scale_factor=1.15), run_time=0.5)
        self.cocher(boites[0])
        # ② répétée 10 fois, indépendante
        self.au_mot("Répétée 10 fois")
        l2 = VGroup(suite(self.t("Répétée", 36), self.t("10", 44, JAUNE_TITRE), self.t("fois,", 36), buff=0.18),
                    self.t("de façon indépendante", 36, BLEU_CALCUL)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        l2.next_to(boites[1], RIGHT, buff=0.35)
        tels = VGroup(*[telephone(0.42) for _ in range(10)]).arrange(RIGHT, buff=0.12).move_to(P(2.55, ys[1]))
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2),
                  LaggedStart(*[FadeIn(t, shift=DOWN * 0.2) for t in tels], lag_ratio=0.08), run_time=0.9)
        self.au_mot("de façon indépendante")
        seps = VGroup(*[DashedLine(P((tels[k].get_x() + tels[k + 1].get_x()) / 2, ys[1] + 0.4),
                                   P((tels[k].get_x() + tels[k + 1].get_x()) / 2, ys[1] - 0.4),
                                   color=BLEU_CALCUL, dash_length=0.06, stroke_width=2) for k in range(9)])
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), Create(seps), run_time=0.6)
        self.cocher(boites[1])
        # ③ X compte le nombre de succès
        self.au_mot("Et X compte")
        l3 = VGroup(suite(self.t("X", 40, JAUNE_TITRE), self.t("compte le nombre", 36), buff=0.2),
                    self.t("de succès", 36, C_S)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        l3.next_to(boites[2], RIGHT, buff=0.35)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.5)
        anims, _ = self.resultats(tels)
        self.play(*anims, run_time=0.6)
        ventes = [t for t, v in zip(tels, VENTES) if v]
        self.play(*[Indicate(t, color=C_S, scale_factor=1.4) for t in ventes], run_time=0.5)
        self.cocher(boites[2])
        self.attendre_voix()

    # ── 03 : la conclusion : X suit B(10 ; 0,2) ─────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-conclusion")
        mots = ["même épreuve", "10 fois, indépendante", "compte les succès"]
        recap = VGroup(*[suite(self.coche(taille=0.16), self.t(m, 30), buff=0.2) for m in mots])
        recap.arrange(RIGHT, buff=0.6).move_to(P(-0.5, 2.15))
        if recap.width > 12.6:
            recap.scale_to_fit_width(12.6)
        self.titre_ecran("La loi binomiale", LaggedStart(*[FadeIn(r, shift=DOWN * 0.15) for r in recap],
                                                          lag_ratio=0.25), run_time=0.8)
        self.au_mot("la loi binomiale")
        lb = self.t("loi binomiale", 54, JAUNE_TITRE).move_to(P(-0.6, 1.0))
        self.play(FadeIn(lb, scale=1.4), run_time=0.5)
        self.au_mot("paramètres")
        par = self.t("de paramètres", 36).move_to(P(-2.6, -0.05))
        self.play(FadeIn(par, shift=UP * 0.1), run_time=0.4)
        self.au_mot("10 et")
        n10 = self.t("10", 50, JAUNE_TITRE).next_to(par, RIGHT, buff=0.4)
        self.play(FadeIn(n10, scale=1.6), run_time=0.4)
        self.au_mot("et 0,2")
        et = self.t("et", 36).next_to(n10, RIGHT, buff=0.3)
        p02 = self.t("0,2", 50, PROBA_C).next_to(et, RIGHT, buff=0.3)
        self.play(FadeIn(et), FadeIn(p02, scale=1.6), run_time=0.4)
        self.au_mot("On écrit")
        ligne, n_obj, p_obj = self.b_ecrit("10", "0,2", 64)
        ligne.move_to(P(-0.6, -1.5))
        self.play(FadeIn(ligne[0]), FadeIn(ligne[1]), run_time=0.4)
        self.au_mot("B de 10")
        b = ligne[2]
        self.play(FadeIn(VGroup(b[0], b[1])), TransformFromCopy(n10, n_obj), run_time=0.5)
        self.au_mot("virgule 0,2")
        self.play(FadeIn(b[3]), TransformFromCopy(p02, p_obj), FadeIn(b[5]), run_time=0.5)
        cadre = SurroundingRectangle(ligne, color=JAUNE_TITRE, buff=0.25, stroke_width=5, corner_radius=0.12)
        ln = self.t("n", 32, JAUNE_TITRE).next_to(cadre, DOWN, buff=0.15).set_x(n_obj.get_x())
        lp = self.t("p", 32, PROBA_C).next_to(cadre, DOWN, buff=0.15).set_x(p_obj.get_x()).align_to(ln, UP)
        self.play(Create(cadre), FadeIn(ln, shift=UP * 0.1), FadeIn(lp, shift=UP * 0.1), run_time=0.6)
        self.insister(VGroup(ligne, cadre), 0.3)
        self.attendre_voix()

    # ── 04 : l'arbre : 10 niveaux, la même branche ──────────────────────────

    XD = 0.7   # le bord gauche de la colonne de droite

    def legende(self):
        cS = suite(self.t("S", 36, C_S), self.t(": vente", 32), buff=0.15)
        cE = suite(self.t("E", 36, C_E), self.t(": pas de vente", 32), buff=0.15)
        return VGroup(cS, cE).arrange(DOWN, aligned_edge=LEFT, buff=0.25)

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-arbre")
        a = self.arbre(complet=False)
        dix = suite(self.t("10", 60, JAUNE_TITRE), self.t("niveaux", 42), buff=0.25)
        dix.move_to(P(self.XD, 2.0), aligned_edge=LEFT)
        a.add(a.entete10)
        self.titre_ecran("L'arbre : un schéma de Bernoulli", FadeIn(a.socle()), FadeIn(a.entete10))
        self.au_mot("10 niveaux")
        self.play(FadeIn(dix, shift=LEFT * 0.2), Indicate(a.entete10, color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(Succession(*[a.pousser(L, 0.4) for L in (1, 2, 3)]), FadeIn(a.entetes, lag_ratio=0.4), run_time=1.1)
        a.add(a.suite_pts, a.pts_fin)
        self.play(Create(a.suite_pts), FadeIn(a.pts_fin), Indicate(a.entete10, color=CHEMIN, scale_factor=1.4),
                  run_time=0.6)
        self.au_mot("la même branche")
        leg = self.legende().move_to(P(self.XD, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(leg, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("succès 0,2")
        n2 = a.nombres(True)
        a.add(*n2)
        self.play(*[FadeIn(n, scale=1.6) for n in n2], Indicate(leg[0], color=C_S), run_time=0.6)
        self.au_mot("échec 0,8")
        n8 = a.nombres(False)
        a.add(*n8)
        self.play(*[FadeIn(n, scale=1.6) for n in n8], Indicate(leg[1], color=C_E), run_time=0.6)
        self.au_mot("schéma de Bernoulli")
        sb = VGroup(self.t("Schéma", 44, JAUNE_TITRE), self.t("de Bernoulli", 44, JAUNE_TITRE))
        sb.arrange(DOWN, buff=0.1).move_to(P(self.XD, -1.0), aligned_edge=LEFT)
        cadre = SurroundingRectangle(sb, color=JAUNE_TITRE, buff=0.22, stroke_width=4, corner_radius=0.12)
        self.play(FadeIn(sb, scale=1.3), Create(cadre), run_time=0.6)
        self.attendre_voix()

    # ── 05 : le piège : le numéro du premier succès ─────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        a = self.arbre()
        self.add(a)
        tels = VGroup(*[telephone(0.48) for _ in range(10)]).arrange(RIGHT, buff=0.14)
        tels.move_to(P(self.XD, 2.05), aligned_edge=LEFT)
        self.titre_ecran("Le piège : le premier succès", FadeIn(tels, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("le numéro")
        q = VGroup(suite(self.t("X", 38, ORANGE_RETENUE), self.t(": le numéro", 32), buff=0.15),
                   self.t("du premier appel qui vend", 32)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        q.move_to(P(self.XD, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("premier appel")
        anims, _ = self.resultats(tels)
        self.play(*anims, run_time=0.6)
        k = VENTES.index(True)
        fl = Arrow(tels[k].get_bottom() + DOWN * 0.55, tels[k].get_bottom() + DOWN * 0.05, color=ORANGE_RETENUE,
                   buff=0, stroke_width=7, max_tip_length_to_length_ratio=0.45)
        chemin = tuple(VENTES[:k + 1])
        self.play(GrowArrow(fl), *a.etat([chemin]), *[tels[j].animate.set_opacity(0.35) for j in range(k + 1, 10)],
                  run_time=0.7)
        self.play(Indicate(tels[k], color=C_S, scale_factor=1.5), Indicate(a.lab[chemin], color=CHEMIN,
                                                                          scale_factor=1.8), run_time=0.6)
        self.au_mot("Ce n'est pas un nombre")
        ns = suite(self.t("un nombre de succès", 32), self.t("?", 36, ORANGE_RETENUE), buff=0.12)
        ns.move_to(P(self.XD, -0.4), aligned_edge=LEFT)
        self.play(FadeIn(ns, shift=UP * 0.1), run_time=0.4)
        barre = Line(ns.get_left() + LEFT * 0.1, ns.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), ns.animate.set_opacity(0.55), run_time=0.4)
        self.au_mot("ce n'est pas une loi")
        pas = VGroup(self.t("Pas une loi", 38, ROUGE_ERREUR), self.t("binomiale !", 38, ROUGE_ERREUR))
        pas.arrange(DOWN, aligned_edge=LEFT, buff=0.08).move_to(P(self.XD + 0.3, -1.6), aligned_edge=LEFT)
        self.play(FadeIn(pas, scale=1.3), run_time=0.5)
        self.play(pas.animate.scale(1.25, about_edge=LEFT), run_time=0.25)
        self.play(pas.animate.scale(1 / 1.25, about_edge=LEFT), run_time=0.25)
        self.attendre_voix()

    # ── 06 : défi : 5 lancers de dé ─────────────────────────────────────────

    def des(self, cote=0.9, faces=(3, 6, 1, 5, 2), buff=0.35):
        return VGroup(*[de(f, cote) for f in faces]).arrange(RIGHT, buff=buff)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("On lance 5 fois")
        ds = self.des().move_to(P(-0.6, 1.5))
        cinq = suite(self.t("5", 50, JAUNE_TITRE), self.t("lancers d'un dé équilibré", 36), buff=0.2)
        cinq.move_to(P(-0.6, 0.35))
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.6, scale=0.4) for d in ds], lag_ratio=0.15),
                  FadeIn(cinq, shift=UP * 0.1), run_time=1.0)
        self.au_mot("X compte le nombre de 6")
        x = suite(self.t("X", 44, JAUNE_TITRE), self.t("compte le nombre de", 36), de(6, 0.6), buff=0.22)
        x.move_to(P(-0.6, -0.65))
        self.play(FadeIn(x, shift=UP * 0.15), Create(SurroundingRectangle(ds[1], color=C_S, buff=0.1, stroke_width=5)), run_time=0.7)
        self.au_mot("Quelle loi")
        q = suite(self.t("Quelle loi suit", 42, BLEU_CALCUL), self.t("X", 44, JAUNE_TITRE), self.t("?", 44, BLEU_CALCUL),
                  buff=0.2).move_to(P(-0.6, -1.65))
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        ds = self.des(0.7, buff=0.25).move_to(P(-0.6, 2.05))
        self.add(ds)
        self.au_mot("5 épreuves")
        l1 = suite(self.t("5", 46, JAUNE_TITRE), self.t("épreuves identiques et indépendantes", 34), buff=0.2)
        l1.move_to(P(-0.6, 1.0))
        seps = VGroup(*[DashedLine(P((ds[k].get_x() + ds[k + 1].get_x()) / 2, 2.5),
                                   P((ds[k].get_x() + ds[k + 1].get_x()) / 2, 1.6),
                                   color=BLEU_CALCUL, dash_length=0.06, stroke_width=2) for k in range(4)])
        self.play(FadeIn(l1, shift=UP * 0.1), Create(seps), run_time=0.7)
        self.au_mot("succès : obtenir 6")
        l2 = suite(self.t("succès :", 36, C_S), self.t("obtenir", 34), de(6, 0.55), buff=0.2).move_to(P(-0.6, 0.05))
        self.play(FadeIn(l2, shift=UP * 0.1), Create(SurroundingRectangle(ds[1], color=C_S, buff=0.08, stroke_width=5)), run_time=0.6)
        self.au_mot("p égale 1 sur 6")
        f = frac(1, 6, 44, PROBA_C)
        l3 = suite(self.t("p", 44, PROBA_C), self.t("=", 44), f, buff=0.2).move_to(P(-0.6, -0.9))
        self.play(FadeIn(l3, scale=1.4), run_time=0.5)
        self.au_mot("X suit B de 5")
        ligne, n_obj, p_obj = self.b_ecrit("5", frac(1, 6, 44, PROBA_C), 58)
        ligne.move_to(P(-0.6, -2.6))
        b = ligne[2]
        self.play(FadeIn(ligne[0]), FadeIn(ligne[1]), FadeIn(VGroup(b[0], b[1])), TransformFromCopy(l1[0], n_obj),
                  run_time=0.6)
        self.au_mot("virgule 1 sur 6")
        self.play(FadeIn(b[3]), TransformFromCopy(f, p_obj), FadeIn(b[5]), run_time=0.6)
        cadre = SurroundingRectangle(ligne, color=VERT_OK, buff=0.22, stroke_width=5, corner_radius=0.12)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(ligne, cadre), 0.3)
        self.attendre_voix(marge=0.8)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = self.t("La même épreuve de Bernoulli", fs)
        l2 = suite(self.t("répétée", fs), self.t("n", fs, JAUNE_TITRE), self.t("fois, de façon indépendante", fs),
                   buff=0.15)
        l3 = suite(self.t("X", fs, JAUNE_TITRE), self.t("compte les succès", fs, C_S), buff=0.2)
        b, _, _ = self.b_ecrit("n", "p", 44)
        l4 = suite(b, self.t("(loi binomiale)", 30), buff=0.4)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.1))
        for mot, l in zip(["Même épreuve", "répétée n fois", "et X compte", "X suit la loi"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.insister(lignes[3][1][0][2], 0.3)
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
        self.ecran_conditions()
        self.ecran_conclusion()
        self.ecran_arbre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBinReconnaitreSTMG(ProbaBinReconnaitreBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"


class ProbaBinReconnaitreTerminale(ProbaBinReconnaitreBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
