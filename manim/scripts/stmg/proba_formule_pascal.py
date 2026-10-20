# proba_formule_pascal.py
# EleveAI — Maths STMG — série « Probabilités », lot LOI BINOMIALE :
# LA FORMULE DE PASCAL (micro vaT_formule_pascal, notion
# va_binomiale_coefficients), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_formule_pascal_short.py
# (ceinture jaune, « 4 + 6 = 10, et c'est une formule de probabilités ! »).
#
# ⭐ La figure est le TRIANGLE DE PASCAL du coach (`canvasTrianglePascal` de la
# banque STMG : un « tableau_donnees » titré « Triangle de Pascal », en-tête
# n \ k sombre, colonne des n en bleu ciel, case allumée en jaune), ici lignes
# 0 à 5 (0 à 6 pour le défi). Les deux voisins s'allument, une flèche descend
# vers le nombre en dessous. ⛔ PAS D'ÉCART : les cases restent VIDES ; un
# nombre ne s'écrit dans sa case qu'au moment où la voix le dit.
# Le « pourquoi » : l'ARBRE à 5 niveaux (arbre_proba du coach, S / E), dessiné
# en entier mais estompé, réduit à son PREMIER NŒUD : S → reste 1 succès sur
# 4 niveaux, « 1 parmi 4 » ; E → reste 2 succès sur 4 niveaux, « 2 parmi 4 ».
#
# Écrans : 00 garde · 01 4 et 6 côte à côte, 10 en dessous · 02 la formule
# générale puis 1 parmi 4 + 2 parmi 4 = 2 parmi 5, 4 + 6 = 10 · 03 pourquoi :
# le premier niveau de l'arbre · 04 une ligne à partir de la précédente, sans
# arbre · 05 le piège : deux nombres non voisins · 06 défi (2 parmi 5, 3 parmi
# 5 → 3 parmi 6) · 06b correction (10 + 10 = 20) · 07 ce que tu as appris ·
# 08 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-proba-formule-pascal.json (débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_formule_pascal.py ProbaFormulePascalSTMG -o eleveai-maths-stmg-proba-formule-pascal --media_dir manim/scripts/stmg/media-vaT_formule_pascal
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_formule_pascal_short.py ShortProbaFormulePascal -o eleveai-maths-stmg-proba-formule-pascal-short --media_dir manim/scripts/stmg/media-vaT_formule_pascal
# Puis copier dans manim/sorties/stmg/maths/probabilites/44-formule-pascal/.

import sys
from itertools import product
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import (ANNEAU, BORD, BRANCHE, ENCRE, ENTETE, LIBELLE, PROBA,  # noqa: E402
                                     SURLIGNE, suite)

S_COUL = "#15803D"      # « S » (succès) sur la carte blanche
E_COUL = "#B91C1C"      # « E » (échec) sur la carte blanche
VOISIN = SURLIGNE       # les deux voisins : jaune du coach
DESSOUS = "#BBF7D0"     # le nombre en dessous : vert clair
DESSOUS_BORD = "#16A34A"
FAUX_FOND = "#FECACA"   # le piège : rouge clair
FAUX_BORD = "#DC2626"
FLECHE = "#F59E0B"      # la flèche qui descend


def P(x, y):
    return np.array([x, y, 0.0])


# ── « k parmi n » : n au-dessus de k, entre grandes parenthèses ─────────────

def binome(n, k, fs=40, color=WHITE, c_par=None):
    """Le coefficient binomial écrit comme au lycée : deux Text empilés et
    deux parenthèses DESSINÉES (des arcs), jamais « C(n,k) »."""
    r = fs / 40
    haut = Text(str(n), font_size=fs, color=color)
    bas = Text(str(k), font_size=fs, color=color)
    pile = VGroup(haut, bas).arrange(DOWN, buff=0.14 * r)
    h = pile.height + 0.22 * r
    c = c_par or color
    pg = ArcBetweenPoints(P(0, h / 2), P(0, -h / 2), angle=1.0, color=c, stroke_width=3.2 * r)
    pd = ArcBetweenPoints(P(0, h / 2), P(0, -h / 2), angle=-1.0, color=c, stroke_width=3.2 * r)
    pg.next_to(pile, LEFT, buff=0.07 * r)
    pd.next_to(pile, RIGHT, buff=0.07 * r)
    return VGroup(pg, haut, bas, pd)


def barre_rouge(mob, marge=0.15):
    return Line(mob.get_corner(DL) + P(-marge, -0.05), mob.get_corner(UR) + P(marge, 0.05), color=ROUGE_ERREUR,
                stroke_width=8)


# ── le TRIANGLE DE PASCAL du coach (tableau_donnees) ────────────────────────

class TablePascal(VGroup):
    """Carte blanche « Triangle de Pascal » : en-tête n \\ k (slate-800), une
    colonne de libellés n (bleu ciel), puis les cases k ⩽ n seulement — d'où la
    forme en escalier. Les cases sont VIDES : `valeur` fabrique le nombre d'une
    case, à poser quand la voix le dit."""

    def __init__(self, nmax=5, w=0.8, h=0.56, fs=26, titre=True, **kw):
        super().__init__(**kw)
        self.nmax, self.w, self.h, self.fs = nmax, w, h, fs
        self.case, self.lab_n, self.lab_k = {}, {}, {}
        coin = Rectangle(width=w, height=h, fill_color=ENTETE, fill_opacity=1, stroke_color=BORD, stroke_width=1.5)
        coin.move_to(P(0, 0))
        tc = Text("n \\ k", font_size=int(fs * 0.62), color=WHITE, weight=BOLD).move_to(coin)
        self.coin = VGroup(coin, tc)
        grille = [self.coin]
        for k in range(nmax + 1):
            r = Rectangle(width=w, height=h, fill_color=ENTETE, fill_opacity=1, stroke_color=BORD, stroke_width=1.5)
            r.move_to(P((k + 1) * w, 0))
            self.lab_k[k] = VGroup(r, Text(str(k), font_size=fs, color=WHITE, weight=BOLD).move_to(r))
            grille.append(self.lab_k[k])
        for n in range(nmax + 1):
            r = Rectangle(width=w, height=h, fill_color=LIBELLE, fill_opacity=1, stroke_color=BORD, stroke_width=1.5)
            r.move_to(P(0, -(n + 1) * h))
            self.lab_n[n] = VGroup(r, Text(str(n), font_size=fs, color=ENCRE, weight=BOLD).move_to(r))
            grille.append(self.lab_n[n])
            for k in range(n + 1):
                c = Rectangle(width=w, height=h, fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=1.5)
                c.move_to(P((k + 1) * w, -(n + 1) * h))
                self.case[(n, k)] = c
                grille.append(c)
        self.grille = VGroup(*grille)
        self.titre = Text("Triangle de Pascal", font_size=int(fs * 0.85), color=ENCRE, weight=BOLD)
        self.titre.next_to(self.grille, UP, buff=0.16)
        contenu = VGroup(self.grille, self.titre) if titre else self.grille
        self.carte = RoundedRectangle(width=contenu.width + 0.45, height=contenu.height + 0.4, corner_radius=0.18,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(contenu)
        self.add(self.carte, self.grille)
        if titre:
            self.add(self.titre)
        self.vals = {}

    def valeur(self, n, k, texte, color=ENCRE, k_fs=1.0):
        t = Text(str(texte), font_size=int(self.fs * k_fs), color=color, weight=BOLD)
        if t.width > self.case[(n, k)].width * 0.85:
            t.scale_to_fit_width(self.case[(n, k)].width * 0.85)
        t.move_to(self.case[(n, k)])
        self.vals[(n, k)] = t
        return t

    def allumer(self, n, k, fond=VOISIN, bord=ANNEAU):
        """Animation : la case passe en couleur (anneau épais)."""
        c = self.case[(n, k)]
        return c.animate.set_fill(fond, 1).set_stroke(bord, 5)

    def eteindre(self, n, k):
        c = self.case[(n, k)]
        return c.animate.set_fill(WHITE, 1).set_stroke(BORD, 1.5)

    def fleche(self, depart, arrivee, color=FLECHE):
        """La flèche qui part des voisins (une case ou un groupe) vers la case du dessous."""
        a = depart.get_bottom() if isinstance(depart, Mobject) else depart
        b = self.case[arrivee].get_center() + UP * self.h * 0.28
        return Arrow(a + DOWN * 0.02, b, buff=0.0, color=color, stroke_width=6, max_tip_length_to_length_ratio=0.45,
                     tip_length=0.16)

    def voisins(self, n, k):
        """Le cadre autour de deux cases voisines (n, k) et (n, k + 1)."""
        g = VGroup(self.case[(n, k)], self.case[(n, k + 1)])
        return SurroundingRectangle(g, color=FLECHE, buff=0.05, stroke_width=5, corner_radius=0.06)


# ── l'ARBRE à 5 niveaux, réduit à son premier nœud ──────────────────────────

class Arbre5(VGroup):
    """Carte blanche du coach (arbre_proba) : un départ, 5 niveaux, 32
    chemins. Le premier niveau est dessiné en grand (S en vert, E en rouge) ;
    les 4 niveaux suivants, fins et gris, restent en arrière-plan : on ne les
    lit pas, on les ENCADRE (« 4 niveaux »)."""

    def __init__(self, x0=-6.0, dx=1.28, y_haut=1.95, y_bas=-2.7, **kw):
        super().__init__(**kw)
        pas = (y_haut - y_bas) / 31
        self.pos = {(): P(x0, (y_haut + y_bas) / 2)}
        feuilles = list(product((True, False), repeat=5))
        for i, f in enumerate(feuilles):
            self.pos[f] = P(x0 + 5 * dx, y_haut - i * pas)
        for L in (4, 3, 2, 1):
            for c in product((True, False), repeat=L):
                a, b = self.pos[c + (True,)], self.pos[c + (False,)]
                self.pos[c] = P(x0 + L * dx, (a[1] + b[1]) / 2)
        self.pos[()] = P(x0, (self.pos[(True,)][1] + self.pos[(False,)][1]) / 2)
        # les nœuds du premier niveau : S et E dans une pastille blanche
        self.noeud = {}
        for g in (True, False):
            t = Text("S" if g else "E", font_size=34, color=S_COUL if g else E_COUL, weight=BOLD)
            rond = Circle(radius=0.3, fill_color=WHITE, fill_opacity=1, stroke_color=S_COUL if g else E_COUL,
                          stroke_width=3)
            self.noeud[(g,)] = VGroup(rond, t).move_to(self.pos[(g,)])
        self.depart = Dot(self.pos[()], radius=0.08, color=ENCRE)
        self.prem = {}
        for g in (True, False):
            u, v = self.pos[()], self.pos[(g,)]
            d = (v - u) / np.linalg.norm(v - u)
            self.prem[(g,)] = Line(u + d * 0.1, v - d * 0.32, color=BRANCHE, stroke_width=5)
        self.fines = {True: VGroup(), False: VGroup()}
        for c, v in self.pos.items():
            if len(c) < 2:
                continue
            u = self.pos[c[:-1]]
            if len(c) == 2:
                d = (v - u) / np.linalg.norm(v - u)
                u = u + d * 0.32
            self.fines[c[0]].add(Line(u, v, color="#94A3B8", stroke_width=1.6))
        tout = VGroup(self.depart, *self.prem.values(), *self.noeud.values(), *self.fines.values())
        self.carte = RoundedRectangle(width=tout.width + 0.7, height=tout.height + 1.05, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3)
        self.titre = Text("Arbre à 5 niveaux", font_size=24, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.12)
        self.add(self.carte, *self.fines.values(), *self.prem.values(), self.depart, *self.noeud.values())

    def cadre(self, g, texte="4 niveaux"):
        """Le cadre bleu autour des 4 niveaux qui suivent S (g=True) ou E."""
        f = self.fines[g]
        r = RoundedRectangle(width=f.width + 0.3, height=f.height + 0.22, corner_radius=0.14, stroke_color=PROBA,
                             stroke_width=4, fill_color=PROBA, fill_opacity=0.08).move_to(f)
        t = Text(texte, font_size=26, color=PROBA, weight=BOLD)
        fond = RoundedRectangle(width=t.width + 0.25, height=t.height + 0.18, corner_radius=0.08, fill_color=WHITE,
                                fill_opacity=0.95, stroke_color=PROBA, stroke_width=2)
        lab = VGroup(fond, t.move_to(fond)).move_to(f).shift(RIGHT * 0.35)
        return VGroup(r, lab)


def arbre_barre(s=1.0):
    """Un petit arbre (trois branches) barré : « sans arbre »."""
    o = P(0, 0)
    br = VGroup(*[Line(o, P(0.6, y), color=WHITE, stroke_width=4) for y in (0.35, -0.35)],
                *[Line(P(0.6, y0), P(1.15, y0 + dy), color=WHITE, stroke_width=3)
                  for y0 in (0.35, -0.35) for dy in (0.18, -0.18)])
    br.move_to(o)
    x = VGroup(Line(br.get_corner(UL) + P(-0.1, 0.1), br.get_corner(DR) + P(0.1, -0.1), color=ROUGE_ERREUR,
                    stroke_width=7),
               Line(br.get_corner(DL) + P(-0.1, -0.1), br.get_corner(UR) + P(0.1, 0.1), color=ROUGE_ERREUR,
                    stroke_width=7))
    return VGroup(br, x).scale(s)


class ProbaFormulePascalBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-formule-pascal"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=6.2):
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def tableau(self, nmax=5, centre=None, valeurs=()):
        """Le triangle du coach, à gauche ; `valeurs` = nombres DÉJÀ dits,
        posés d'emblée (liste de (n, k, texte))."""
        if nmax == 5:
            tb = TablePascal(5, w=0.88, h=0.64, fs=30)
            centre = centre if centre is not None else P(-3.55, -0.3)
        else:
            tb = TablePascal(nmax, w=0.82, h=0.56, fs=27)
            centre = centre if centre is not None else P(-3.3, -0.05)
        tb.shift(centre - tb.carte.get_center())
        for n, k, x in valeurs:
            tb.add(tb.valeur(n, k, x))
        return tb

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La formule de Pascal", 58, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        tb = TablePascal(5, w=0.8, h=0.56, fs=26).scale(0.6)
        tb.move_to(P(-0.6, 0.15))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.3),
                  run_time=1.1)
        cad = tb.voisins(4, 1)
        self.play(tb.allumer(4, 1), tb.allumer(4, 2), Create(cad), run_time=0.5)
        fl = tb.fleche(cad, (5, 2))
        self.play(GrowArrow(fl), run_time=0.4)
        self.play(tb.allumer(5, 2, DESSOUS, DESSOUS_BORD), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 01 : 4 et 6 côte à côte, 10 en dessous ──────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Dans le triangle de Pascal")
        tb = self.tableau()
        self.play(FadeIn(tb, shift=UP * 0.3), run_time=0.6)
        self.au_mot("4 et 6")
        v4, v6 = tb.valeur(4, 1, "4"), tb.valeur(4, 2, "6")
        r1 = suite(self.t("4", 64, JAUNE_TITRE), self.t("et", 40), self.t("6", 64, JAUNE_TITRE), buff=0.3)
        r1.move_to(P(2.6, 1.75))
        self.play(tb.allumer(4, 1), tb.allumer(4, 2), FadeIn(v4, scale=1.8), FadeIn(v6, scale=1.8),
                  FadeIn(r1, scale=1.4), run_time=0.6)
        self.au_mot("côte à côte")
        cad = tb.voisins(4, 1)
        cote = self.t("côte à côte", 38, FLECHE).move_to(P(2.6, 0.95))
        self.play(Create(cad), FadeIn(cote, shift=UP * 0.1), run_time=0.5)
        self.au_mot("ligne 4")
        l4 = self.t("sur la ligne 4", 34).move_to(P(2.6, 0.35))
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(tb.lab_n[4][1], color=PROBA, scale_factor=1.4), run_time=0.6)
        self.au_mot("Juste en dessous")
        fl = tb.fleche(cad, (5, 2))
        gf = Arrow(P(1.4, -0.15), P(1.4, -1.45), buff=0, color=FLECHE, stroke_width=7)
        des = self.t("juste en dessous", 32).move_to(P(3.5, -0.5))
        self.play(GrowArrow(fl), GrowArrow(gf), FadeIn(des, shift=DOWN * 0.1), run_time=0.6)
        self.au_mot("ligne 5")
        l5 = self.t("sur la ligne 5", 32).move_to(P(3.5, -1.1))
        self.play(FadeIn(l5, shift=UP * 0.1), Indicate(tb.lab_n[5][1], color=PROBA, scale_factor=1.4), run_time=0.5)
        self.au_mot(": 10")
        v10 = tb.valeur(5, 2, "10")
        dix = self.t("10", 72, VERT_OK).move_to(P(1.4, -2.05))
        self.play(tb.allumer(5, 2, DESSOUS, DESSOUS_BORD), FadeIn(v10, scale=1.8), FadeIn(dix, scale=1.8),
                  run_time=0.5)
        self.insister(dix)
        self.attendre_voix()

    # ── 02 : la formule, puis 1 parmi 4 + 2 parmi 4 = 2 parmi 5 ─────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        self.titre_ecran("La formule de Pascal")
        tb = self.tableau(valeurs=[(4, 1, "4"), (4, 2, "6"), (5, 2, "10")])
        self.play(FadeIn(tb), run_time=0.5)
        x0 = 3.35
        g = [binome("n", "k", 36), self.t("+", 44), binome("n", "k + 1", 36), self.t("=", 44),
             binome("n + 1", "k + 1", 36)]
        lg = self.caser(suite(*g, buff=0.22), 5.6).move_to(P(x0, 1.65))
        self.au_mot("« k parmi n »")
        self.play(FadeIn(g[0], scale=1.5), run_time=0.5)
        self.au_mot("plus « k plus 1 parmi n »")
        self.play(FadeIn(g[1]), FadeIn(g[2], scale=1.5), run_time=0.5)
        self.au_mot("égale « k plus 1")
        self.play(FadeIn(g[3]), FadeIn(g[4], scale=1.5), run_time=0.5)
        cg = SurroundingRectangle(lg, color=BLEU_CALCUL, buff=0.18, stroke_width=3, corner_radius=0.12)
        self.play(Create(cg), run_time=0.4)
        # l'exemple, case par case
        e = [binome(4, 1, 40, JAUNE_TITRE), self.t("+", 46), binome(4, 2, 40, JAUNE_TITRE), self.t("=", 46),
             binome(5, 2, 40, VERT_OK)]
        le = suite(*e, buff=0.32).move_to(P(x0, 0.05))
        self.au_mot("« 1 parmi 4 »")
        self.play(FadeIn(e[0], scale=1.5), tb.allumer(4, 1), run_time=0.5)
        self.au_mot("« 2 parmi 4 »")
        self.play(FadeIn(e[1]), FadeIn(e[2], scale=1.5), tb.allumer(4, 2), run_time=0.5)
        n4 = self.t("4", 52, JAUNE_TITRE).next_to(e[0], DOWN, buff=0.35)
        pl = self.t("+", 46).match_x(e[1]).match_y(n4)
        n6 = self.t("6", 52, JAUNE_TITRE).match_x(e[2]).match_y(n4)
        self.au_mot("4 plus 6")
        self.play(TransformFromCopy(tb.vals[(4, 1)], n4), run_time=0.45)
        self.play(FadeIn(pl), TransformFromCopy(tb.vals[(4, 2)], n6), run_time=0.45)
        self.au_mot("égale « 2 parmi 5 »")
        cad = tb.voisins(4, 1)
        fl = tb.fleche(cad, (5, 2))
        self.play(FadeIn(e[3]), FadeIn(e[4], scale=1.5), Create(cad), GrowArrow(fl),
                  tb.allumer(5, 2, DESSOUS, DESSOUS_BORD), run_time=0.6)
        self.au_mot("», 10")
        eg = self.t("=", 46).match_x(e[3]).match_y(n4)
        n10 = self.t("10", 52, VERT_OK).match_x(e[4]).match_y(n4)
        self.play(FadeIn(eg), TransformFromCopy(tb.vals[(5, 2)], n10), run_time=0.5)
        self.insister(n10)
        self.attendre_voix()

    # ── 03 : pourquoi ? le premier niveau de l'arbre ────────────────────────

    def bloc_reste(self, g, nb):
        """« S au début : reste 1 succès sur 4 niveaux » (mots + nombres dits)."""
        c = S_COUL if g else E_COUL
        tag = VGroup(Circle(radius=0.27, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                     Text("S" if g else "E", font_size=30, color=WHITE, weight=BOLD))
        l1 = suite(tag, self.t("au début :", 30), buff=0.18)
        l2 = suite(self.t("reste", 32), self.t(f"{nb} succès", 32, JAUNE_TITRE), buff=0.15)
        l3 = suite(self.t("sur", 32), self.t("4 niveaux", 32, "#60A5FA"), buff=0.15)
        return VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.14)

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-pourquoi")
        self.titre_ecran("Pourquoi ?")
        a = Arbre5()
        self.au_mot("l'arbre à 5 niveaux")
        self.play(FadeIn(a.carte), FadeIn(a.titre), run_time=0.4)
        self.play(Create(a.prem[(True,)]), Create(a.prem[(False,)]), FadeIn(a.depart), run_time=0.4)
        self.play(FadeIn(a.noeud[(True,)], scale=0.5), FadeIn(a.noeud[(False,)], scale=0.5),
                  Create(a.fines[True]), Create(a.fines[False]), run_time=1.0)
        self.play(Indicate(a.titre, color=PROBA, scale_factor=1.3), run_time=0.5)
        self.au_mot("un chemin avec 2 succès")
        h = suite(self.t("Chemins avec", 34), self.t("2 succès", 40, JAUNE_TITRE), buff=0.18).move_to(P(3.85, 2.3))
        self.play(FadeIn(h, shift=UP * 0.15), run_time=0.5)
        self.au_mot("par un succès ou")
        self.play(a.prem[(True,)].animate.set_stroke(S_COUL, 9),
                  Indicate(a.noeud[(True,)][1], color=S_COUL, scale_factor=1.4), run_time=0.5)
        self.au_mot("par un échec")
        self.play(a.prem[(False,)].animate.set_stroke(E_COUL, 9),
                  Indicate(a.noeud[(False,)][1], color=E_COUL, scale_factor=1.4), run_time=0.5)
        # S d'abord : on estompe la moitié E
        self.au_mot("S'il commence par un succès")
        self.play(VGroup(a.prem[(False,)], a.noeud[(False,)], a.fines[False]).animate.set_opacity(0.2),
                  Indicate(a.noeud[(True,)][1], color=S_COUL, scale_factor=1.4), run_time=0.5)
        self.au_mot("il reste 1 succès")
        cs = a.cadre(True)
        bs = self.bloc_reste(True, 1)
        bs.move_to(P(2.75, a.pos[(True,)][1] + 0.1), aligned_edge=LEFT)
        self.play(Create(cs[0]), FadeIn(cs[1]), FadeIn(bs[0], shift=RIGHT * 0.15), run_time=0.5)
        self.play(FadeIn(bs[1], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("sur 4 niveaux")
        self.play(FadeIn(bs[2], shift=RIGHT * 0.15), Indicate(cs[1][1], color=PROBA, scale_factor=1.3), run_time=0.5)
        self.au_mot("« 1 parmi 4 »")
        b1 = binome(4, 1, 44, JAUNE_TITRE).move_to(P(1.85, bs.get_center()[1]))
        self.play(FadeIn(b1, scale=1.6), run_time=0.4)
        self.insister(b1)
        # sinon : E d'abord
        self.au_mot("Sinon")
        self.play(VGroup(a.prem[(False,)], a.noeud[(False,)], a.fines[False]).animate.set_opacity(1),
                  a.fines[True].animate.set_opacity(0.25), cs[0].animate.set_stroke(opacity=0.25),
                  cs[1].animate.set_opacity(0.25), run_time=0.5)
        self.play(Indicate(a.noeud[(False,)][1], color=E_COUL, scale_factor=1.4), run_time=0.4)
        self.au_mot("2 succès sur 4")
        ce = a.cadre(False)
        be = self.bloc_reste(False, 2)
        be.move_to(P(2.75, a.pos[(False,)][1] + 0.2), aligned_edge=LEFT)
        self.play(Create(ce[0]), FadeIn(ce[1]), FadeIn(be[0], shift=RIGHT * 0.15), FadeIn(be[1], shift=RIGHT * 0.15),
                  run_time=0.5)
        self.play(FadeIn(be[2], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("« 2 parmi 4 »")
        b2 = binome(4, 2, 44, JAUNE_TITRE).move_to(P(1.85, be.get_center()[1]))
        self.play(FadeIn(b2, scale=1.6), a.fines[True].animate.set_opacity(1),
                  cs[0].animate.set_stroke(opacity=1), cs[1].animate.set_opacity(1), run_time=0.4)
        self.insister(b2)
        self.attendre_voix()

    # ── 04 : une ligne à partir de la précédente, sans arbre ────────────────

    def ecran_utiliser(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-utiliser")
        self.titre_ecran("Ligne après ligne")
        tb = self.tableau(valeurs=[(4, 1, "4"), (4, 2, "6"), (5, 2, "10")])
        self.play(FadeIn(tb), run_time=0.4)
        x0 = 2.9
        hau = self.t("la précédente", 38, JAUNE_TITRE).move_to(P(x0, 1.7))
        fl = Arrow(P(x0, 1.3), P(x0, 0.35), buff=0, color=FLECHE, stroke_width=7)
        bas = self.t("une ligne", 38, VERT_OK).move_to(P(x0, -0.05))
        self.au_mot("calculer une ligne")
        self.play(*[tb.allumer(5, k, DESSOUS, DESSOUS_BORD) for k in range(6)], FadeIn(bas, shift=UP * 0.1),
                  Indicate(tb.lab_n[5][1], color=PROBA, scale_factor=1.3), run_time=0.5)
        self.au_mot("la précédente")
        self.play(*[tb.allumer(4, k) for k in range(5)], FadeIn(hau, shift=DOWN * 0.1),
                  Indicate(tb.lab_n[4][1], color=PROBA, scale_factor=1.3), run_time=0.5)
        fls = [tb.fleche(VGroup(tb.case[(4, k)], tb.case[(4, k + 1)]), (5, k + 1)) for k in range(4)]
        self.play(GrowArrow(fl), LaggedStart(*[GrowArrow(f) for f in fls], lag_ratio=0.3), run_time=1.0)
        self.au_mot("sans arbre")
        sa = self.t("sans arbre", 40, ROUGE_ERREUR).move_to(P(x0 - 0.5, -1.3))
        ic = arbre_barre(0.9).next_to(sa, RIGHT, buff=0.35)
        self.play(FadeIn(sa, shift=UP * 0.1), FadeIn(ic[0]), run_time=0.4)
        self.play(Create(ic[1]), run_time=0.4)
        self.attendre_voix()

    # ── 05 : le piège : deux nombres qui ne sont pas côte à côte ───────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège : pas côte à côte")
        tb = self.tableau(valeurs=[(4, 1, "4"), (4, 2, "6"), (5, 2, "10")])
        self.play(FadeIn(tb), run_time=0.4)
        x0 = 3.0
        self.au_mot("additionner deux nombres")
        self.play(tb.allumer(4, 1, FAUX_FOND, FAUX_BORD), tb.allumer(4, 3, FAUX_FOND, FAUX_BORD), run_time=0.5)
        self.au_mot("pas côte à côte")
        trou = SurroundingRectangle(tb.case[(4, 2)], color=FAUX_BORD, buff=0.03, stroke_width=4)
        trou.set_stroke(opacity=1)
        pc = self.t("pas côte à côte !", 40, ROUGE_ERREUR).move_to(P(x0, 1.6))
        self.play(FadeIn(pc, shift=UP * 0.1), run_time=0.4)
        self.play(Create(DashedVMobject(trou, num_dashes=14)), Wiggle(tb.vals[(4, 2)]), run_time=0.6)
        e = [binome(4, 1, 44, "#FCA5A5"), self.t("+", 50), binome(4, 3, 44, "#FCA5A5"), self.t("=", 50),
             self.t("?", 60, ROUGE_ERREUR)]
        le = suite(*e, buff=0.32).move_to(P(x0, 0.15))
        self.au_mot("« 1 parmi 4 »")
        self.play(FadeIn(e[0], scale=1.5), Indicate(tb.case[(4, 1)], color=FAUX_BORD), run_time=0.5)
        self.au_mot("plus « 3 parmi 4 »")
        self.play(FadeIn(e[1]), FadeIn(e[2], scale=1.5), Indicate(tb.case[(4, 3)], color=FAUX_BORD), run_time=0.5)
        self.au_mot("rien d'utile")
        self.play(FadeIn(e[3]), FadeIn(e[4], scale=1.8), run_time=0.4)
        br = barre_rouge(le)
        ru = self.t("rien d'utile !", 46, ROUGE_ERREUR).rotate(0.08).move_to(P(x0, -1.35))
        self.play(Create(br), le.animate.set_opacity(0.55), run_time=0.4)
        self.play(FadeIn(ru, scale=1.8), run_time=0.4)
        self.insister(ru, 0.25)
        self.attendre_voix()

    # ── 06 : défi : 2 parmi 5 et 3 parmi 5 valent 10 ; 3 parmi 6 ? ─────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb = self.tableau(6)
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.5)
        x0 = 2.6
        l1 = suite(binome(5, 2, 40, JAUNE_TITRE), self.t("=", 46), self.t("10", 50, JAUNE_TITRE), buff=0.3)
        l2 = suite(binome(5, 3, 40, JAUNE_TITRE), self.t("=", 46), self.t("10", 50, JAUNE_TITRE), buff=0.3)
        l3 = suite(binome(6, 3, 40, ORANGE_RETENUE), self.t("=", 46), self.t("?", 56, ORANGE_RETENUE), buff=0.3)
        for l, y in ((l1, 1.85), (l2, 0.35), (l3, -1.15)):
            l.move_to(P(x0, y), aligned_edge=LEFT).shift(LEFT * 0.9)
        self.au_mot("« 2 parmi 5 »")
        self.play(FadeIn(l1[0], scale=1.5), tb.allumer(5, 2), run_time=0.5)
        self.au_mot("« 3 parmi 5 »")
        self.play(FadeIn(l2[0], scale=1.5), tb.allumer(5, 3), run_time=0.5)
        self.au_mot("valent 10")
        a, b = tb.valeur(5, 2, "10"), tb.valeur(5, 3, "10")
        self.play(FadeIn(l1[1:]), FadeIn(l2[1:]), FadeIn(a, scale=1.8), FadeIn(b, scale=1.8), run_time=0.5)
        self.au_mot("« 3 parmi 6 »")
        q = tb.valeur(6, 3, "?", ORANGE_RETENUE)
        self.play(FadeIn(l3, scale=1.3), tb.allumer(6, 3, "#FED7AA", ORANGE_RETENUE), FadeIn(q, scale=1.8),
                  Indicate(tb.lab_n[6][1], color=PROBA, scale_factor=1.3), run_time=0.6)
        self.insister(l3[2])
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        tb = self.tableau(6, valeurs=[(5, 2, "10"), (5, 3, "10")])
        self.play(FadeIn(tb), run_time=0.4)
        x0 = 3.0
        e = [binome(5, 2, 40, JAUNE_TITRE), self.t("+", 46), binome(5, 3, 40, JAUNE_TITRE)]
        le = suite(*e, buff=0.32).move_to(P(x0, 1.6))
        self.au_mot("« 2 parmi 5 » plus")
        self.play(FadeIn(e[0], scale=1.5), tb.allumer(5, 2), run_time=0.45)
        self.play(FadeIn(e[1]), FadeIn(e[2], scale=1.5), tb.allumer(5, 3), run_time=0.45)
        cad = tb.voisins(5, 2)
        self.play(Create(cad), run_time=0.3)
        self.au_mot("10 plus 10")
        m = [self.t("10", 52, JAUNE_TITRE), self.t("+", 46), self.t("10", 52, JAUNE_TITRE), self.t("=", 46),
             self.t("20", 60, VERT_OK)]
        lm = suite(*m, buff=0.25)
        lm.shift(P(e[0].get_center()[0] - m[0].get_center()[0], 0.2 - lm.get_center()[1]))
        self.play(TransformFromCopy(tb.vals[(5, 2)], m[0]), run_time=0.4)
        self.play(FadeIn(m[1]), TransformFromCopy(tb.vals[(5, 3)], m[2]), run_time=0.4)
        self.au_mot(", 20")
        fl = tb.fleche(cad, (6, 3))
        v20 = tb.valeur(6, 3, "20")
        self.play(FadeIn(m[3]), FadeIn(m[4], scale=1.8), GrowArrow(fl), run_time=0.45)
        self.play(tb.allumer(6, 3, DESSOUS, DESSOUS_BORD), TransformFromCopy(m[4], v20), run_time=0.5)
        self.au_mot("Donc")
        r = suite(binome(6, 3, 44, VERT_OK), self.t("=", 50), self.t("20", 60, VERT_OK), buff=0.3).move_to(P(x0, -1.2))
        self.play(FadeIn(r[0], scale=1.5), run_time=0.45)
        self.au_mot("vaut 20")
        self.play(FadeIn(r[1]), FadeIn(r[2], scale=1.8), run_time=0.4)
        cr = SurroundingRectangle(r, color=VERT_OK, buff=0.18, stroke_width=4)
        ok = self.coche(taille=0.32).next_to(cr, LEFT, buff=0.3)
        self.play(Create(cr), run_time=0.35)
        self.play(Create(ok), run_time=0.35)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = VGroup(suite(self.t("Deux voisins", fs, JAUNE_TITRE), self.t("d'une ligne s'additionnent", fs), buff=0.15),
                    suite(self.t("pour donner", fs), self.t("le nombre en dessous", fs, VERT_OK), buff=0.15))
        l1.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l2 = suite(self.t("C'est la", fs), self.t("formule de Pascal", fs, BLEU_CALCUL), buff=0.15)
        l3 = VGroup(self.t("Elle se comprend avec", fs),
                    self.t("le premier niveau de l'arbre", fs, "#60A5FA")).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, -0.1))
        for mot, l in zip(["Deux voisins", "c'est la formule", "Elle se comprend"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
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
        self.ecran_formule()
        self.ecran_pourquoi()
        self.ecran_utiliser()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaFormulePascalSTMG(ProbaFormulePascalBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
