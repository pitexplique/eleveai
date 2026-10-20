# proba_bin_defi.py
# EleveAI — Maths Tle spé (micro binomiale_defi, notion loi_binomiale) — série
# « Probabilités » : UN EXERCICE TYPE BAC AVEC LA LOI BINOMIALE, AVEC VOIX.
# Paysage 16:9, ceinture NOIRE. Short jumeau : proba_bin_defi_short.py (orange).
#
# ⭐ Les figures du coach (banque terminale-spe/maths/loi-binomiale.bank.ts) :
#   · `arbre_proba` (schéma de Bernoulli : carte blanche, branches grises,
#     S / E aux nœuds, probabilités en bleu, chemin allumé en orange) ;
#   · `stat_graph` « batons » (Loi binomiale B(n ; p) : carte blanche, axe,
#     un bâton par valeur de k, la valeur écrite au-dessus en encre grasse).
#   Le diagramme en bâtons porte tout l'exercice : « aucun » = le bâton 0,
#   « au moins deux » = les bâtons à partir de 2, le contraire = 0 et 1.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit que quand la voix le dit (les bâtons
#   n'ont de valeur ou d'étiquette que pour 0 et 1, dits par la voix).
#   Probabilités calculées en Python : 0,97⁵⁰ = 0,21807 ; 50 × 0,03 × 0,97⁴⁹ =
#   0,33721 ; 1 − les deux = 0,44472 ; 1 − 0,21807 = 0,78193 ; 50 × 0,03 = 1,5.
#
# Écrans : 00 garde · 01 l'usine de panneaux solaires · 02 la loi B(50 ; 0,03)
# · 03 aucun défectueux · 04 au moins deux (par le contraire) · 05 l'espérance
# · 06 le piège · 07 défi (au moins un) · 07b correction · 08 ce que tu as
# appris · 09 fin (« Entraîne-toi sur eleveai.fr » + abonnement).
#
# Voix : manim/voix/terminale-proba-bin-defi.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_bin_defi.py ProbaBinDefiTerminale -o eleveai-maths-terminale-proba-bin-defi --media_dir manim/scripts/terminale/media-bin_defi
# Sortie : manim/sorties/terminale/maths/probabilites/16-bin-defi/

import sys
from math import comb
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
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, suite,
)

N, PP = 50, 0.03
LOI = [comb(N, k) * PP ** k * (1 - PP) ** (N - k) for k in range(N + 1)]
P0, P1 = LOI[0], LOI[1]
assert f"{P0:.3f}" == "0.218" and f"{P1:.3f}" == "0.337"
assert f"{1 - P0 - P1:.3f}" == "0.445" and f"{1 - P0:.3f}" == "0.782"

BLEU_NB = "#60A5FA"     # les nombres recopiés dans les calculs
BATON = "#64748B"       # le bâton du stat_graph (gris ardoise)
CELLULE = "#1E3A8A"     # le panneau solaire
GRILLE = "#93C5FD"
CADRE_P = "#CBD5E1"
DEFAUT = "#EF4444"
MUR = "#475569"


def P(x, y):
    return np.array([x, y, 0.0])


# ── ⭐ au_mot() CALÉ SUR LES MOTS, pas au prorata des caractères ─────────────
# « 0,97 puissance 49 » s'écrit en 18 caractères mais se dit en trois
# secondes : l'estimation au prorata du gabarit dérivait d'une seconde ou plus
# sur l'écran 04. Les instants de chaque mot sont relus dans
# proba_bin_defi_marques.json (et _short_marques.json), produits par le MÊME
# moteur WinRT (Julie, débit −6, hauteur +6) avec IncludeWordBoundaryMetadata :
# [[position du mot dans la phrase, instant en s], …].

import json  # noqa: E402


class MotsCales:
    fichier_marques = None

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8")) if ch.exists() else {}
        return self._cache_marques

    def dire(self, nom, dossier=None):
        self._cle_voix = nom
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        if not marques or not self._duree_voix:
            return super().au_mot(extrait)
        i = self._texte_voix.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {self._texte_voix[:60]}…")
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)


def puissance(base, exposant, fs=44, color=WHITE, c_exp=None):
    """0,97⁵⁰ en Text : l'exposant, plus petit, posé en haut à droite."""
    b = Text(base, font_size=fs, color=color)
    e = Text(exposant, font_size=int(fs * 0.6), color=c_exp or color)
    e.next_to(b, RIGHT, buff=0.04).align_to(b, UP).shift(UP * 0.13 * fs / 48)
    return VGroup(b, e)


def p_de(texte, fs=40, color=WHITE):
    return Text(f"P({texte})", font_size=fs, color=color)


# ── les dessins : le panneau solaire, l'usine ───────────────────────────────

def panneau(s=1.0, defectueux=False):
    """Un panneau solaire : cadre clair, cellules bleues (4 × 3). Défectueux :
    bord rouge et une fissure."""
    w, h = 0.9, 0.62
    fond = Rectangle(width=w, height=h, fill_color=CELLULE, fill_opacity=1,
                     stroke_color=DEFAUT if defectueux else CADRE_P, stroke_width=4 if defectueux else 2)
    traits = VGroup(*[Line(P(-w / 2 + w * i / 4, -h / 2), P(-w / 2 + w * i / 4, h / 2)) for i in (1, 2, 3)],
                    *[Line(P(-w / 2, -h / 2 + h * j / 3), P(w / 2, -h / 2 + h * j / 3)) for j in (1, 2)])
    traits.set_stroke(GRILLE, 1.2, opacity=0.8)
    g = VGroup(fond, traits)
    if defectueux:
        f = VMobject(stroke_color=DEFAUT, stroke_width=4)
        f.set_points_as_corners([P(-0.25, 0.31), P(-0.05, 0.08), P(-0.15, -0.02), P(0.12, -0.31)])
        g.add(f)
    return g.scale(s)


def lot_panneaux(lignes=5, colonnes=10, s=0.42, buff=0.08):
    """Le lot de 50 panneaux, en grille."""
    return VGroup(*[panneau(s) for _ in range(lignes * colonnes)]).arrange_in_grid(
        rows=lignes, cols=colonnes, buff=buff)


def usine(s=1.0):
    """L'usine : toit en dents de scie, cheminée, porte."""
    corps = Rectangle(width=3.2, height=1.6, fill_color=MUR, fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).move_to(P(0, -0.3))
    dents = VGroup(*[Polygon(P(-1.6 + k * 0.8, 0.5), P(-1.6 + k * 0.8, 1.05), P(-0.8 + k * 0.8, 0.5),
                             fill_color="#64748B", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                     for k in range(4)])
    vitres = VGroup(*[Line(P(-1.6 + k * 0.8, 0.52), P(-1.6 + k * 0.8, 1.02), color="#BAE6FD", stroke_width=5)
                      for k in range(4)])
    chem = Rectangle(width=0.32, height=1.0, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).move_to(P(1.25, 1.0))
    porte = Rectangle(width=0.6, height=0.85, fill_color="#1E293B", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).move_to(P(0, -0.68))
    soleil = VGroup(Circle(radius=0.28, fill_color="#FACC15", fill_opacity=1, stroke_width=0),
                    *[Line(P(0.36, 0), P(0.52, 0), color="#FACC15", stroke_width=4).rotate(a, about_point=ORIGIN)
                      for a in np.arange(0, TAU, TAU / 8)]).move_to(P(-1.9, 1.75))
    return VGroup(soleil, chem, dents, vitres, corps, porte).scale(s)


# ── le stat_graph « bâtons » du coach : la loi B(50 ; 0,03) ─────────────────

class CarteBatons(VGroup):
    """Carte blanche du coach, titre, axe, un bâton par k = 0 … KMAX (puis
    « … »). Les bâtons sont à la VRAIE hauteur de P(X = k). Aucune valeur,
    aucune étiquette : elles se posent quand la voix les dit."""

    KMAX = 6

    def __init__(self, larg=5.6, haut=4.5, titre=True):
        super().__init__()
        self.larg, self.haut = larg, haut
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.add(self.carte)
        self.titre = None
        if titre:
            self.titre = Text("Loi binomiale B(50 ; 0,03)", font_size=24, color=ENCRE, weight=BOLD)
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.16)
            self.add(self.titre)
        x0, x1 = -larg / 2 + 0.6, larg / 2 - 0.35
        self.y0 = -haut / 2 + 0.8
        self.axe = Line(P(x0, self.y0), P(x1, self.y0), color=ENCRE, stroke_width=2.5)
        self.slot = (x1 - x0 - 0.45) / (self.KMAX + 1)
        self.x0 = x0
        hmax = haut - (2.15 if titre else 1.2)
        self.batons = VGroup()
        for k in range(self.KMAX + 1):
            x = x0 + self.slot * (k + 0.5)
            h = max(LOI[k] / P1 * hmax, 0.02)
            tr = Line(P(x, self.y0), P(x, self.y0 + h), color=BATON, stroke_width=8)
            pt = Dot(P(x, self.y0 + h), radius=0.075, color=BATON)
            self.batons.add(VGroup(tr, pt))
        self.etc = Text("…", font_size=26, color=ENCRE).move_to(P(x1 - 0.2, self.y0 + 0.2))
        self.add(self.axe, self.batons, self.etc)

    def xk(self, k):
        """L'abscisse (réelle, après déplacement) de la place k, même non entière."""
        return self.batons[0][0].get_start()[0] + self.slot * k

    def sommet(self, k):
        return self.batons[k][1].get_center()

    def valeur(self, k, texte, fs=25, color=ENCRE):
        t = Text(texte, font_size=fs, color=color, weight=BOLD)
        return t.next_to(self.batons[k][1], UP, buff=0.1)

    def etiquette(self, k, texte=None, fs=28, color=ENCRE):
        t = Text(str(k) if texte is None else texte, font_size=fs, color=color, weight=BOLD)
        return t.move_to(P(self.batons[k][0].get_start()[0], self.axe.get_center()[1] - 0.25))

    def accolade(self, k0, k1, texte, color=CHEMIN, fs=28):
        """Une accolade sous les bâtons k0 … k1 (jusqu'aux « … » si k1 = None)."""
        a = self.batons[k0][0].get_start()[0] - self.slot * 0.35
        b = (self.etc.get_right()[0] if k1 is None else self.batons[k1][0].get_start()[0] + self.slot * 0.35)
        y = self.axe.get_center()[1] - 0.12
        ligne = Line(P(a, y), P(b, y))
        acc = Brace(ligne, DOWN, buff=0.04, color=color, sharpness=1.2)
        t = Text(texte, font_size=fs, color=color, weight=BOLD).next_to(acc, DOWN, buff=0.04)
        return VGroup(acc, t)

    def colorier(self, ks, color, sw=10, autres=None):
        """Anime : les bâtons ks prennent la couleur ; les autres s'estompent
        (autres = opacité) ou restent tels quels (autres = None)."""
        anims = []
        for k in range(self.KMAX + 1):
            tr, pt = self.batons[k]
            if k in ks:
                anims += [tr.animate.set_stroke(color, sw, opacity=1), pt.animate.set_color(color).set_opacity(1)]
            elif autres is not None:
                anims += [tr.animate.set_stroke(BATON, 7, opacity=autres), pt.animate.set_color(BATON).set_opacity(autres)]
        if self.KMAX in ks:
            anims.append(self.etc.animate.set_opacity(1).set_color(color))
        elif autres is not None:
            anims.append(self.etc.animate.set_opacity(autres).set_color(ENCRE))
        return anims

    def poser(self, ks, color, sw=10, autres=0.25):
        """Le même état que `colorier`, posé d'emblée."""
        for k in range(self.KMAX + 1):
            tr, pt = self.batons[k]
            if k in ks:
                tr.set_stroke(color, sw, opacity=1)
                pt.set_color(color).set_opacity(1)
            else:
                tr.set_stroke(BATON, 7, opacity=autres)
                pt.set_color(BATON).set_opacity(autres)
        if self.KMAX in ks:
            self.etc.set_color(color).set_opacity(1)
        else:
            self.etc.set_color(ENCRE).set_opacity(autres)
        return self


# ── l'ARBRE DE BERNOULLI du coach, de GAUCHE à DROITE ───────────────────────

class ArbreUne(VGroup):
    """Une épreuve : départ, branche S en haut, E en bas (carte blanche)."""

    def __init__(self, s=1.0):
        super().__init__()
        self.depart = Dot(P(0, 0), radius=0.07, color=ENCRE)
        self.ns, self.ne = P(2.0, 0.85), P(2.0, -0.85)
        self.bs = Line(P(0.07, 0.03), self.ns + P(-0.22, -0.09), color=BRANCHE, stroke_width=3.5)
        self.be = Line(P(0.07, -0.03), self.ne + P(-0.22, 0.09), color=BRANCHE, stroke_width=3.5)
        self.ls = Text("S", font_size=30, color=ENCRE, weight=BOLD).move_to(self.ns)
        self.le = Text("E", font_size=30, color=ENCRE, weight=BOLD).move_to(self.ne)
        tout = VGroup(self.depart, self.bs, self.be, self.ls, self.le)
        self.carte = RoundedRectangle(width=tout.width + 2.6, height=tout.height + 0.8, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(RIGHT * 0.95)
        self.add(self.carte, self.bs, self.be, self.depart, self.ls, self.le)
        self.scale(s)

    def nombre(self, branche, texte, fs=26):
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        br = self.bs if branche == "s" else self.be
        d = UP if branche == "s" else DOWN
        return t.next_to(br.get_center(), d + LEFT * 0.6, buff=0.12)


class Chaine(VGroup):
    """Un CHEMIN de l'arbre, de gauche à droite : E — E — E … E, chaque
    branche portant son nombre. Les nœuds 1, 2, 3 puis « … » puis le dernier."""

    def __init__(self, lettre="E", pas=1.35, fs=30):
        super().__init__()
        self.depart = Dot(P(0, 0), radius=0.07, color=ENCRE)
        xs = [pas * (i + 1) for i in range(3)] + [pas * 4 + 0.9]
        self.noeuds = VGroup(*[Text(lettre, font_size=fs, color=ENCRE, weight=BOLD).move_to(P(x, 0)) for x in xs])
        self.branches = VGroup()
        gauche = [0.07] + [x + 0.22 for x in xs[:3]]
        for i, x in enumerate(xs):
            if i == 3:
                a = xs[2] + 0.22 + 0.75
                self.trou = Text("…", font_size=fs, color=ENCRE).move_to(P((xs[2] + a) / 2 + 0.12, 0))
                self.branches.add(Line(P(a, 0), P(x - 0.22, 0), color=BRANCHE, stroke_width=3.5))
            else:
                self.branches.add(Line(P(gauche[i], 0), P(x - 0.22, 0), color=BRANCHE, stroke_width=3.5))
        tout = VGroup(self.depart, self.noeuds, self.branches, self.trou)
        self.carte = RoundedRectangle(width=tout.width + 0.7, height=1.7, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2).move_to(tout)
        self.add(self.carte, self.depart, self.branches, self.trou, self.noeuds)

    def nombres(self, texte, fs=28):
        return VGroup(*[Text(texte, font_size=fs, color=PROBA, weight=BOLD).next_to(b, UP, buff=0.1)
                        for b in self.branches])


class ProbaBinDefiBase(MotsCales, Notion6e):
    """Toutes les scènes ; la sous-classe ne change que identité et ceinture."""

    fichier_marques = "proba_bin_defi_marques.json"
    nom_voix = "terminale-proba-bin-defi"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
    X_G = -3.15         # le centre de la colonne des calculs (à gauche)
    LARG_G = 6.8        # sa largeur utile
    X_C = 3.6           # le centre de la carte des bâtons (à droite)

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def titre_ecran(self, texte, *avec, font_size=40):
        """Le titre, écrit VITE (0,8 s ; Write prend 2 s sur un titre long) et
        en même temps que les premiers objets : les premiers mots de la voix
        tombent dès 0,1 s."""
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

    def carte(self, y=0.3):
        return CarteBatons().move_to(P(self.X_C, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Loi binomiale", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("un exercice type bac", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        c = CarteBatons(larg=4.6, haut=2.7, titre=False).move_to(P(-0.6, -0.55))
        self.add(ech, titre, VGroup(c.carte, c.axe, c.etc))   # la ceinture, visible dès la 1re image
        self.au_mot("exercice type bac")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in c.batons], lag_ratio=0.15), run_time=1.2)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'usine de panneaux solaires ───────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        u = usine(1.2).move_to(P(-4.3, 1.05))
        self.titre_ecran("L'usine de panneaux solaires", FadeIn(u, shift=UP * 0.2))
        self.au_mot("3 %")
        d = panneau(1.3, defectueux=True).move_to(P(-5.6, -1.75))
        trois = self.t("3 %", 64, DEFAUT).next_to(d, RIGHT, buff=0.35)
        mot = self.t("défectueux", 42, DEFAUT).next_to(trois, RIGHT, buff=0.25)
        self.play(FadeIn(d, scale=1.6), FadeIn(trois, scale=1.8), run_time=0.5)
        self.play(FadeIn(mot, shift=LEFT * 0.15), run_time=0.3)
        self.insister(trois, 0.25)
        self.au_mot("50 panneaux")
        lot = lot_panneaux(s=0.5).move_to(P(3.0, 1.0))
        cinq = self.t("50 panneaux", 42, BLEU_NB).next_to(lot, UP, buff=0.22)
        self.play(LaggedStart(*[FadeIn(p, scale=1.4) for p in lot], lag_ratio=0.02),
                  FadeIn(cinq, shift=DOWN * 0.1), run_time=1.2)
        self.au_mot("tirages avec remise")
        rem = self.t("tirages avec remise", 40, VERT_OK).next_to(lot, DOWN, buff=0.35)
        self.play(FadeIn(rem, shift=UP * 0.15), run_time=0.5)
        self.au_mot("X compte")
        xc = suite(self.t("X :", 44, JAUNE_TITRE), self.t("le nombre de panneaux défectueux", 40), buff=0.25)
        self.caser(xc, 9.6).move_to(P(-1.0, -2.85))
        self.play(FadeIn(xc, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix()

    # ── 02 : question 1, la loi de X ────────────────────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-loi")
        conds = VGroup(*[self.t(m, 44) for m in ("50 épreuves", "identiques", "indépendantes")])
        conds.arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to(P(-3.9, 0.8))
        coches = VGroup(*[self.coche(taille=0.28).next_to(c, LEFT, buff=0.35) for c in conds])
        conds[0][:2].set_color(BLEU_NB)
        a = ArbreUne(1.25).move_to(P(2.9, 0.85))
        self.titre_ecran("Question 1 : la loi de X", FadeIn(a.carte), FadeIn(a.depart))
        for mot, i in (("50 épreuves", 0), ("identiques", 1), ("indépendantes", 2)):
            self.au_mot(mot)
            self.play(FadeIn(conds[i], shift=RIGHT * 0.2), Create(coches[i]), run_time=0.5)
        self.au_mot("succès")
        self.play(Create(a.bs), Create(a.be), run_time=0.5)
        self.play(FadeIn(a.ls, scale=1.4), FadeIn(a.le, scale=1.4), run_time=0.3)
        defe = Text("défectueux", font_size=26, color=ENCRE).next_to(a.ls, RIGHT, buff=0.18)
        self.play(FadeIn(defe, shift=LEFT * 0.1), a.bs.animate.set_stroke(CHEMIN, 7), run_time=0.5)
        self.au_mot("p égale")
        n03 = a.nombre("s", "0,03")
        pp = suite(self.t("p =", 46), self.t("0,03", 50, BLEU_NB), buff=0.2).next_to(a.carte, DOWN, buff=0.35)
        self.play(FadeIn(n03, scale=1.6), FadeIn(pp, shift=UP * 0.15), run_time=0.6)
        self.au_mot("X suit B")
        loi = suite(self.t("X suit", 46), self.t("B(50 ; 0,03)", 50, BLEU_CALCUL), buff=0.3).move_to(P(-1.0, -2.55))
        self.play(FadeIn(loi[0]), Write(loi[1]), run_time=0.9)
        cadre = SurroundingRectangle(loi, color=BLEU_CALCUL, buff=0.18, stroke_width=3)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 03 : question 2, aucun défectueux ───────────────────────────────────

    def ecran_zero(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-zero")
        ch = Chaine(pas=1.3, fs=38)
        self.caser(ch, 7.0).move_to(P(self.X_G, 1.35))
        c = self.carte()
        self.titre_ecran("Question 2 : aucun défectueux", FadeIn(c), FadeIn(ch.carte), FadeIn(ch.depart))
        self.au_mot("aucun panneau")
        self.play(LaggedStart(*[Succession(Create(b), FadeIn(n, scale=1.4)) for b, n in zip(ch.branches, ch.noeuds)],
                              lag_ratio=0.25), FadeIn(ch.trou), run_time=0.9)
        self.play(ch.branches.animate.set_stroke(CHEMIN, 7), run_time=0.25)
        self.au_mot("P de X égale 0")
        px = p_de("X = 0", 50)
        eg = self.t("=", 50)
        p97 = puissance("0,97", "50", 54, BLEU_NB)
        env = self.t("≈", 50)
        res = self.t("0,218", 58, VERT_OK)
        l1 = self.ligne(px, eg, p97, env, res, y=-1.0, buff=0.25)
        e0 = c.etiquette(0)
        self.play(FadeIn(px, shift=UP * 0.15), FadeIn(e0, scale=1.6), *c.colorier([0], CHEMIN, autres=0.3),
                  run_time=0.6)
        self.au_mot("0,97 puissance")
        nb = ch.nombres("0,97")
        self.play(FadeIn(eg), LaggedStart(*[FadeIn(n, scale=1.5) for n in nb], lag_ratio=0.15),
                  TransformFromCopy(nb[0], p97[0]), run_time=0.8)
        self.au_mot("puissance 50")
        acc = Brace(ch.noeuds, DOWN, buff=0.12, color=CHEMIN)
        cin = self.t("50", 34, CHEMIN).next_to(acc, DOWN, buff=0.06)
        self.play(GrowFromCenter(acc), FadeIn(cin, scale=1.5), TransformFromCopy(cin, p97[1]), run_time=0.6)
        self.au_mot("environ 0,218")
        v0 = c.valeur(0, "0,218")
        self.play(FadeIn(env), FadeIn(res, scale=1.8), run_time=0.5)
        self.play(TransformFromCopy(res, v0), run_time=0.6)
        cad = SurroundingRectangle(res, color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(res, cad))
        self.attendre_voix()

    # ── 04 : question 3, au moins deux, par le contraire ────────────────────

    def ecran_au_moins_deux(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-au-moins-deux")
        self.titre_ecran("Question 3 : au moins deux")
        c = self.carte()
        self.add(c)
        fs = 42
        self.au_mot("au moins deux")
        q = p_de("X ≥ 2", fs + 2, CHEMIN)
        l1 = self.ligne(q, self.t("=", fs), self.t("1 −", fs), p_de("X ≤ 1", fs, VERT_OK), y=1.95, buff=0.22)
        acc2 = c.accolade(2, None, "X ≥ 2")
        self.play(FadeIn(l1[0], shift=UP * 0.15), *c.colorier(list(range(2, c.KMAX + 1)), CHEMIN), run_time=0.6)
        self.play(FadeIn(acc2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("le contraire")
        acc1 = c.accolade(0, 1, "X ≤ 1", color=VERT_OK)
        self.play(*c.colorier([0, 1], VERT_OK, autres=0.25), FadeOut(acc2), FadeIn(acc1, shift=UP * 0.1),
                  run_time=0.7)
        self.au_mot("1 moins P de X inférieur")
        self.play(FadeIn(l1[1:3], shift=UP * 0.1), run_time=0.4)
        self.au_mot("inférieur ou égal à 1")
        self.play(FadeIn(l1[3], scale=1.3), run_time=0.5)
        # P(X = 1) = 50 × 0,03 × 0,97⁴⁹ ≈ 0,337
        self.au_mot("P de X égale 1")
        l2 = self.ligne(p_de("X = 1", fs), self.t("=", fs), self.t("50", fs, BLEU_NB), self.t("×", fs),
                        self.t("0,03", fs, BLEU_NB), self.t("×", fs), puissance("0,97", "49", fs + 2, BLEU_NB),
                        y=0.75, buff=0.18)
        self.play(FadeIn(l2[:2], shift=UP * 0.15), Indicate(c.batons[1], color=VERT_OK, scale_factor=1.3),
                  run_time=0.6)
        for ex, morceaux in (("50 fois", l2[2:4]), ("0,03 fois", l2[4:6]), ("0,97 puissance", l2[6][0]),
                             ("puissance 49", l2[6][1])):
            self.au_mot(ex)
            self.play(FadeIn(morceaux, scale=1.5), run_time=0.35)
        self.au_mot("environ 0,337")
        r1 = suite(self.t("≈", fs), self.t("0,337", fs + 4, VERT_OK), buff=0.2)
        r1.next_to(l2[1], DOWN, buff=0.4, aligned_edge=LEFT)
        v1 = c.valeur(1, "0,337")
        self.play(FadeIn(r1, scale=1.5), run_time=0.4)
        self.play(TransformFromCopy(r1[1], v1), run_time=0.5)
        # 1 − 0,218 − 0,337 ≈ 0,445
        self.au_mot("Donc 1 moins")
        l3 = self.ligne(self.t("1 −", fs + 4), self.t("0,218", fs + 4, VERT_OK), self.t("−", fs + 4),
                        self.t("0,337", fs + 4, VERT_OK), y=-1.3, buff=0.22)
        self.play(FadeIn(l3[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("0,218 moins")
        v0 = c.valeur(0, "0,218")
        self.play(FadeIn(l3[1], scale=1.5), FadeIn(v0, scale=1.5), run_time=0.4)
        self.au_mot("moins 0,337")
        self.play(FadeIn(l3[2]), TransformFromCopy(r1[1], l3[3]), run_time=0.5)
        self.au_mot("environ 0,445")
        r3 = suite(self.t("≈", fs + 4), self.t("0,445", fs + 16, CHEMIN), buff=0.22)
        r3.next_to(l3, DOWN, buff=0.35)
        acc2b = c.accolade(2, None, "X ≥ 2")
        self.play(FadeIn(r3[0]), FadeIn(r3[1], scale=1.8), FadeOut(acc1), FadeIn(acc2b),
                  *c.colorier(list(range(2, c.KMAX + 1)), CHEMIN, autres=0.25), run_time=0.7)
        cad = SurroundingRectangle(r3[1], color=CHEMIN, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r3[1], cad))
        self.attendre_voix(marge=1.5)

    # ── 05 : question 4, l'espérance ────────────────────────────────────────

    def ecran_esperance(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-esperance")
        self.titre_ecran("Question 4 : l'espérance")
        lot = lot_panneaux(s=0.55).move_to(P(self.X_G, 1.3))
        c = self.carte()
        self.play(FadeIn(lot), FadeIn(c), run_time=0.6)
        fs = 50
        self.au_mot("50 fois")
        l1 = self.ligne(self.t("E(X)", fs), self.t("=", fs), self.t("50", fs, BLEU_NB), self.t("×", fs),
                        self.t("0,03", fs, BLEU_NB), self.t("=", fs), self.t("1,5", fs + 8, VERT_OK), y=-0.8,
                        buff=0.22)
        self.play(FadeIn(l1[:3], shift=UP * 0.15), Indicate(lot, color=BLEU_NB, scale_factor=1.04), run_time=0.6)
        self.au_mot("0,03 :")
        self.play(FadeIn(l1[3:5], scale=1.4), run_time=0.4)
        self.au_mot("1,5 panneau")
        self.play(FadeIn(l1[5]), FadeIn(l1[6], scale=1.8), run_time=0.5)
        # 1,5 panneau défectueux : un panneau entier, puis la moitié d'un autre
        p1, p2 = lot[0], lot[1]
        rouge1 = panneau(0.55, defectueux=True).move_to(p1)
        demi = Rectangle(width=p2.width / 2, height=p2.height, fill_color=DEFAUT, fill_opacity=0.75,
                         stroke_width=0).align_to(p2, LEFT).align_to(p2, UP)
        x15 = c.xk(1.5)
        tri = Triangle(color=VERT_OK, fill_color=VERT_OK, fill_opacity=1).scale(0.13).move_to(
            P(x15, c.axe.get_center()[1] - 0.2))
        e15 = Text("1,5", font_size=28, color=VERT_OK, weight=BOLD).next_to(tri, DOWN, buff=0.06)
        fond = BackgroundRectangle(e15, color=WHITE, fill_opacity=1, buff=0.04)
        self.play(ReplacementTransform(p1, rouge1), FadeIn(demi), GrowFromCenter(tri), FadeIn(fond), FadeIn(e15),
                  run_time=0.6)
        deux = VGroup(rouge1, p2, demi)
        self.play(deux.animate.scale(2.0, about_edge=UL), run_time=0.35)
        self.play(deux.animate.scale(0.5, about_edge=UL), run_time=0.35)
        self.au_mot("en moyenne")
        moy = VGroup(self.t("1,5 panneau défectueux", 40, VERT_OK), self.t("en moyenne par lot", 40, VERT_OK))
        moy.arrange(DOWN, buff=0.12).move_to(P(self.X_G, -2.45))
        self.play(FadeIn(moy, shift=UP * 0.15), run_time=0.6)
        self.insister(l1[6])
        self.attendre_voix()

    # ── 06 : le piège de la question 3 ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        c = self.carte()
        self.add(c)
        fs = 42
        self.au_mot("question 3")
        q = self.ligne(self.t("Question 3 :", 42), p_de("X ≥ 2", 46, CHEMIN), y=1.7)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("calculer 1 moins")
        faux = self.ligne(self.t("1 −", fs + 8, ROUGE_ERREUR), p_de("X = 1", fs + 8, ROUGE_ERREUR), y=0.35, buff=0.2)
        e1 = c.etiquette(1)
        reste = [0] + list(range(2, c.KMAX + 1))
        self.play(FadeIn(faux, shift=UP * 0.15), FadeIn(e1, scale=1.5), run_time=0.5)
        self.play(*c.colorier(reste, ROUGE_ERREUR, autres=0.15), run_time=0.7)
        self.au_mot("On oublierait")
        oub = self.ligne(self.t("On oublierait", 44), p_de("X = 0", 48, ROUGE_ERREUR), y=-1.2, buff=0.25)
        self.play(FadeIn(oub[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("X égale 0")
        e0 = c.etiquette(0, color=ROUGE_ERREUR)
        cercle = SurroundingRectangle(c.batons[0], color=ROUGE_ERREUR, buff=0.1, stroke_width=5, corner_radius=0.1)
        self.play(FadeIn(oub[1], scale=1.4), FadeIn(e0, scale=1.6), Create(cercle), run_time=0.5)
        croix = VGroup(Line(faux.get_corner(UL), faux.get_corner(DR)), Line(faux.get_corner(DL), faux.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 7)
        self.play(Create(croix), Indicate(c.batons[0], color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.6)
        self.attendre_voix(marge=1.6)

    # ── 07 : défi : au moins un ─────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)))
        c = self.carte()
        self.play(FadeIn(c), run_time=0.5)
        self.au_mot("au moins un")
        q = VGroup(self.t("Au moins un panneau", 50), self.t("défectueux ?", 50)).arrange(DOWN, buff=0.18)
        q[0][:9].set_color(ORANGE_RETENUE)
        q.move_to(P(self.X_G, 0.9))
        self.play(FadeIn(q, shift=UP * 0.15), *c.colorier(list(range(1, c.KMAX + 1)), ORANGE_RETENUE), run_time=0.6)
        self.insister(q, 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-1.4, -2.45))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        c = self.carte()
        self.add(c)
        fs = 50
        self.au_mot("au moins un")
        m1 = self.t("au moins un", 48, ORANGE_RETENUE)
        fl = Arrow(LEFT, RIGHT, color=WHITE, stroke_width=6).scale(0.55)
        m0 = self.t("aucun", 48, VERT_OK)
        mots = self.ligne(m1, fl, m0, y=1.4, buff=0.3)
        acc1 = c.accolade(1, None, "au moins un", color=ORANGE_RETENUE)
        self.play(FadeIn(m1, shift=UP * 0.15),
                  *c.colorier(list(range(1, c.KMAX + 1)), ORANGE_RETENUE, autres=0.25), FadeIn(acc1), run_time=0.6)
        self.au_mot("aucun")
        self.play(GrowArrow(fl), FadeIn(m0, shift=LEFT * 0.1), *c.colorier([0], VERT_OK, sw=12), run_time=0.6)
        self.play(Indicate(c.batons[0], color=VERT_OK, scale_factor=1.3), run_time=0.4)
        self.au_mot("1 moins 0,218")
        l1 = self.ligne(self.t("1 −", fs), self.t("0,218", fs, VERT_OK), self.t("≈", fs),
                        self.t("0,782", fs + 8, ORANGE_RETENUE), y=-0.6, buff=0.25)
        v0 = c.valeur(0, "0,218", color=ENCRE)
        self.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(v0, scale=1.5), run_time=0.4)
        self.play(TransformFromCopy(v0, l1[1]), run_time=0.5)
        self.au_mot("environ 0,782")
        self.play(FadeIn(l1[2]), FadeIn(l1[3], scale=1.8), run_time=0.5)
        cad = SurroundingRectangle(l1[3], color=ORANGE_RETENUE, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(l1[3], cad))
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 44
        l1 = self.t("Justifier la loi : les trois conditions", fs)
        l2 = suite(self.t("Aucun :", fs, VERT_OK), puissance("(1 − p)", "n", fs + 2, BLEU_NB), buff=0.3)
        l3 = suite(self.t("Au moins :", fs, ORANGE_RETENUE), self.t("passer par le contraire", fs), buff=0.3)
        l4 = suite(self.t("Espérance :", fs, VERT_OK), self.t("n × p", fs + 2, BLEU_NB), buff=0.3)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, -0.1))
        for mot, l in zip(["Justifier", "Aucun", "Au moins", "Et l'espérance"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10, modèle proba_au_moins_un.py) ──────────

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
        self.ecran_loi()
        self.ecran_zero()
        self.ecran_au_moins_deux()
        self.ecran_esperance()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaBinDefiTerminale(ProbaBinDefiBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
