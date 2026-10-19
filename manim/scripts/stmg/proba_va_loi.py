# proba_va_loi.py
# EleveAI — Maths STMG ET Maths 1re spé — variables aléatoires :
# DRESSER LA LOI DE PROBABILITÉ (micros : va_dresser_loi en STMG, va_loi en
# 1re spé), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_va_loi_short.py.
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (18/10, « pour vendre en pack ») :
# ProbaVaLoiBase porte toutes les scènes ; ProbaVaLoiSTMG et
# ProbaVaLoiPremiereSpe ne changent que l'identité de la page de garde.
#
# ⭐ La figure est CELLE DU COACH : le TABLEAU DE LOI (`tableau_donnees` de
# canvasLoi, banque stmg/maths/variables-aleatoires) : en-tête sombre « xᵢ »
# et les valeurs, libellé bleu clair « P(X = xᵢ) », cases blanches, colonne
# allumée en jaune.
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent, au moment où ils sont dits.
#
# Écrans : 00 garde · 01 deux pièces, X = nombre de piles · 02 étape 1 : les
# valeurs 0, 1, 2 · 03 étape 2 : les 4 issues en cartes, 0,25 chacune ·
# 04 étape 3 : les cartes se regroupent par valeur de X (0 : FF ; 1 : PF et FP ;
# 2 : PP), 0,25 + 0,25 = 0,5 · 05 le tableau de loi se remplit · 06 la somme
# = 1, coche · 07 le piège : « un tiers chacun ? » barré, les deux cartes du
# « 1 pile » grossissent · 08 défi · 08b correction (8 issues, PPP seule,
# 1 sur 8 = 0,125) · 09 ce que tu as appris · 10 fin (« Entraîne-toi sur
# eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-loi.json (débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_loi.py ProbaVaLoiSTMG -o eleveai-maths-stmg-proba-va-loi --media_dir manim/scripts/stmg/media-va_loi
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_loi.py ProbaVaLoiPremiereSpe -o eleveai-maths-premiere-proba-va-loi --media_dir manim/scripts/stmg/media-va_loi
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_loi_short.py ShortProbaVaLoi -o eleveai-maths-stmg-proba-va-loi-short --media_dir manim/scripts/stmg/media-va_loi
# (le short n'affiche aucune classe : un seul rendu, copié sous les deux noms,
#  …-stmg-…-short.mp4 et …-premiere-…-short.mp4)
# Puis copier dans manim/sorties/stmg/maths/probabilites/24-va-loi/ et
# manim/sorties/premiere/maths/probabilites/24-va-loi/.

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
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, ENTETE, ETEINT, LIBELLE, SURLIGNE, frac, suite  # noqa: E402

OR = "#EAB308"
OR_FONCE = "#A16207"
CARTE = "#1E293B"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def piece(face="PILE", r=0.85):
    """Une pièce dorée, son anneau, et le mot (PILE, FACE, P ou F)."""
    disque = Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color=OR_FONCE, stroke_width=4)
    anneau = Circle(radius=r * 0.8, fill_opacity=0, stroke_color=OR_FONCE, stroke_width=3)
    k = 34 if len(face) > 1 else 70
    mot = Text(face, font_size=int(r * k), color="#422006", weight=BOLD)
    return VGroup(disque, anneau, mot)


def carte_issue(code, r=0.32):
    """Une issue en carte : une petite pièce par lettre (P ou F)."""
    pieces = VGroup(*[piece(c, r) for c in code]).arrange(RIGHT, buff=0.12)
    fond = RoundedRectangle(width=pieces.width + 0.5, height=pieces.height + 0.4, corner_radius=0.16,
                            fill_color=CARTE, fill_opacity=1, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, pieces.move_to(fond))


def x_i(prefixe="", suffixe="", fs=30, color=WHITE, weight=BOLD):
    """« xᵢ » (ou « P(X = xᵢ) ») : le i dessiné en indice."""
    x = Text("x", font_size=fs, color=color, weight=weight)
    i = Text("i", font_size=int(fs * 0.62), color=color, weight=weight)
    i.next_to(x, RIGHT, buff=0.03).align_to(x, DOWN).shift(DOWN * fs * 0.004)
    morceaux = VGroup(x, i)
    if prefixe:
        pre = Text(prefixe, font_size=fs, color=color, weight=weight)
        pre.next_to(x, LEFT, buff=0.1)
        # la ligne de base : le « X » du préfixe sur le pied du « x »
        pre.shift(UP * (x.get_bottom()[1] - pre[2].get_bottom()[1]))
        morceaux.add_to_back(pre)
        if suffixe:
            suf = Text(suffixe, font_size=fs, color=color, weight=weight)
            suf.next_to(i, RIGHT, buff=0.05).match_y(pre[1])
            morceaux.add(suf)
    return morceaux


class TableauLoi(VGroup):
    """Le tableau de loi du coach : « xᵢ » puis les valeurs (en-tête sombre),
    « P(X = xᵢ) » (libellé bleu clair) puis les probabilités (cases blanches).
    Les nombres sont prêts mais NON affichés : `poser(r, j)` les écrit."""

    def __init__(self, valeurs, probas, larg_lab=3.2, larg=2.2, h_ent=0.8, h=0.85, fs=30, **kw):
        super().__init__(**kw)
        n = len(valeurs)
        xs = [larg_lab / 2] + [larg_lab + larg * (j + 0.5) for j in range(n)]
        ws = [larg_lab] + [larg] * n
        ys, hs = [-h_ent / 2, -h_ent - h / 2], [h_ent, h]
        self.rect = [[None] * (n + 1) for _ in range(2)]
        fonds = VGroup()
        for r in range(2):
            for c in range(n + 1):
                coul = ENTETE if r == 0 else (LIBELLE if c == 0 else WHITE)
                rc = Rectangle(width=ws[c], height=hs[r], fill_color=coul, fill_opacity=1, stroke_color=BORD,
                               stroke_width=2).move_to(P(xs[c], ys[r]))
                self.rect[r][c] = rc
                fonds.add(rc)
        self.lab = VGroup(x_i(fs=fs, color=WHITE).move_to(self.rect[0][0]),
                          x_i("P(X = ", ")", fs=fs, color=ENCRE).move_to(self.rect[1][0]))
        self.val = [[Text(str(v), font_size=int(fs * 1.2), color=WHITE, weight=BOLD).move_to(self.rect[0][j + 1])
                     for j, v in enumerate(valeurs)],
                    [Text(str(p), font_size=int(fs * 1.2), color=ENCRE, weight=BOLD).move_to(self.rect[1][j + 1])
                     for j, p in enumerate(probas)]]
        for m in [*self.lab, *self.val[0], *self.val[1]]:
            m.set_z_index(3)
        self.fonds = fonds
        self.add(fonds, self.lab)
        self.posees = VGroup()

    def poser(self, r, j):
        self.posees.add(self.val[r][j])
        return FadeIn(self.val[r][j], scale=1.6)

    def tout_poser(self):
        for r in range(2):
            for t in self.val[r]:
                self.posees.add(t)
                self.add(t)
        return self

    def colonne(self, j):
        return VGroup(self.rect[0][j + 1], self.rect[1][j + 1])

    def allumer_ligne(self, r):
        """La ligne r s'allume en jaune (cases de valeurs), comme le coach."""
        anims = []
        for c in range(1, len(self.rect[r])):
            anims.append(self.rect[r][c].animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5).set_z_index(1))
            if r == 0:
                anims.append(self.val[0][c - 1].animate.set_color(ENCRE))
        return anims

    def eteindre_ligne(self, r):
        anims = []
        for c in range(1, len(self.rect[r])):
            coul = ENTETE if r == 0 else WHITE
            anims.append(self.rect[r][c].animate.set_fill(coul, 1).set_stroke(BORD, 2).set_z_index(0))
            if r == 0:
                anims.append(self.val[0][c - 1].animate.set_color(WHITE))
        return anims


# ── la scène ────────────────────────────────────────────────────────────────

VALEURS = [0, 1, 2]
PROBAS = ["0,25", "0,5", "0,25"]
ISSUES = ["PP", "PF", "FP", "FF"]
X_DE = {"PP": 2, "PF": 1, "FP": 1, "FF": 0}


class ProbaVaLoiBase(Notion6e):
    nom_voix = "stmg-premiere-spe-proba-va-loi"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def lancer(self, pieces, hauteur=0.9):
        """Les pièces sautent en tournant (aplaties, retournées) et retombent."""
        self.play(*[p.animate.shift(UP * hauteur).stretch(0.06, 1) for p in pieces], run_time=0.16,
                  rate_func=rate_functions.ease_out_quad)
        self.play(*[p.animate.stretch(1 / 0.06, 1) for p in pieces], run_time=0.1)
        self.play(*[p.animate.stretch(0.06, 1) for p in pieces], run_time=0.1)
        self.play(*[p.animate.shift(DOWN * hauteur).stretch(1 / 0.06, 1) for p in pieces], run_time=0.16,
                  rate_func=rate_functions.ease_in_quad)

    def tableau(self, centre, echelle=1.0, posees=False):
        tb = TableauLoi(VALEURS, PROBAS)
        if posees:
            tb.tout_poser()
        tb.scale(echelle).move_to(centre)
        if not posees:
            # les nombres, prêts mais absents, suivent l'échelle et la place
            for r in range(2):
                for j, v in enumerate(tb.val[r]):
                    v.scale(echelle).move_to(tb.rect[r][j + 1])
        return tb

    def cartes_rangee(self, y=1.6, s=1.0):
        cartes = VGroup(*[carte_issue(c).scale(s) for c in ISSUES]).arrange(RIGHT, buff=0.55)
        cartes.move_to(P(-0.6, y))
        return cartes

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Dresser la loi de probabilité", 50, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("d'une variable aléatoire", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        tb = self.tableau(P(-0.6, -0.55), 0.9)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("d'une variable")
        self.play(FadeIn(sous, shift=UP * 0.15), *tb.allumer_ligne(1), run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : deux pièces ; X = nombre de piles ──────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("On lance deux pièces")
        p1 = piece("PILE", 1.1).move_to(P(-2.6, 0.8))
        p2 = piece("FACE", 1.1).move_to(P(1.4, 0.8))
        self.play(FadeIn(p1, scale=0.5), FadeIn(p2, scale=0.5), run_time=0.5)
        self.lancer([p1, p2])
        self.lancer([p1, p2], 0.6)
        self.au_mot("X est le nombre")
        lx = suite(self.t("X", 64, JAUNE_TITRE, BOLD), self.t("=", 56), self.t("nombre de piles", 52, BLEU_CALCUL),
                   buff=0.3).move_to(P(-0.6, -1.4))
        cadre = SurroundingRectangle(lx, color=JAUNE_TITRE, buff=0.25, stroke_width=3)
        self.play(Write(lx), run_time=0.8)
        self.play(Create(cadre), Circumscribe(p1, Circle, color=JAUNE_TITRE), run_time=0.8)
        self.attendre_voix()

    # ── 02 : étape 1 : les valeurs ──────────────────────────────────────────

    def ecran_valeurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-valeurs")
        self.titre_ecran("Étape 1 : les valeurs possibles")
        boites = VGroup()
        for mot, x in (("0 pile", -4.2), ("1 pile", -0.6), ("2 piles", 3.0)):
            tx = self.t(mot, 44, WHITE, BOLD)
            fond = RoundedRectangle(width=2.8, height=1.2, corner_radius=0.18, fill_color=CARTE, fill_opacity=1,
                                    stroke_color=BLEU_CALCUL, stroke_width=3)
            boites.add(VGroup(fond, tx.move_to(fond)).move_to(P(x, 1.3)))
        for mot, b in zip(("0 pile", "1 pile", "2 piles"), boites):
            self.au_mot(mot)
            self.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)
        self.au_mot("X prend")
        debut = suite(self.t("X", 56, JAUNE_TITRE, BOLD), self.t("prend les valeurs", 44), buff=0.25)
        nombres = [self.t(c, 60, VERT_OK, BOLD) for c in ("0", "1", "2")]
        lig = suite(debut, nombres[0], self.t(",", 50), nombres[1], self.t("et", 44), nombres[2], buff=0.3)
        lig[2].align_to(nombres[0], DOWN)
        lig.move_to(P(-0.6, -1.3))
        self.play(FadeIn(debut, shift=UP * 0.15), run_time=0.5)
        for ex, k in (("valeurs 0", 0), ("1 et 2", 1), ("et 2", 2)):
            self.au_mot(ex)
            anims = [FadeIn(nombres[k], scale=1.6), Indicate(boites[k], color=VERT_OK, scale_factor=1.08)]
            if k == 1:
                anims.append(FadeIn(lig[2]))
            if k == 2:
                anims.append(FadeIn(lig[4]))
            self.play(*anims, run_time=0.4)
        self.attendre_voix()

    # ── 03 : étape 2 : les 4 issues, 0,25 chacune ───────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-issues")
        self.titre_ecran("Étape 2 : les issues")
        cartes = self.cartes_rangee(1.3, 1.35)
        for mot, c in zip(("Pile pile", "pile face", "face pile", "face face"), cartes):
            self.au_mot(mot)
            self.play(FadeIn(c, shift=DOWN * 0.3, scale=0.8), run_time=0.4)
        self.au_mot("4 issues")
        quatre = self.t("4 issues", 56, JAUNE_TITRE, BOLD).move_to(P(-0.6, -1.0))
        self.play(FadeIn(quatre, scale=0.6), run_time=0.4)
        self.insister(quatre, 0.3)
        self.au_mot("chacune")
        quarts = VGroup(*[self.t("0,25", 48, VERT_OK, BOLD).next_to(c, DOWN, buff=0.3) for c in cartes])
        self.play(quatre.animate.move_to(P(-0.6, -2.4)), run_time=0.4)
        self.au_mot("probabilité de 0,25")
        self.play(LaggedStart(*[FadeIn(q, scale=1.5) for q in quarts], lag_ratio=0.15), run_time=0.8)
        self.attendre_voix()

    # ── 04 : étape 3 : les cartes se regroupent par valeur de X ─────────────

    def ecran_probas(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-probas")
        self.titre_ecran("Étape 3 : les probabilités")
        cartes = self.cartes_rangee(1.95, 1.2)
        quarts = VGroup(*[self.t("0,25", 38, VERT_OK, BOLD).next_to(c, DOWN, buff=0.22) for c in cartes])
        self.add(cartes, quarts)
        paquets = {code: VGroup(c, q) for code, c, q in zip(ISSUES, cartes, quarts)}
        # trois zones : X = 0 à gauche, X = 1 au milieu, X = 2 à droite
        zones = {0: [-5.3], 1: [-2.1, 0.5], 2: [3.6]}
        etiq = {v: suite(self.t("X", 40, JAUNE_TITRE, BOLD), self.t("=", 36), self.t(str(v), 40, JAUNE_TITRE, BOLD),
                         buff=0.15).move_to(P(np.mean(zones[v]), 0.05)) for v in (0, 1, 2)}
        y_carte = -1.3

        def ranger(code, x):
            g = paquets[code]
            return g.animate.move_to(P(x, y_carte - 0.45))

        self.au_mot("X égale 2")
        self.play(FadeIn(etiq[2], scale=1.4), run_time=0.4)
        self.au_mot("pile pile, 0,25")
        self.play(ranger("PP", zones[2][0]), run_time=0.7)
        self.play(Indicate(quarts[0], color=VERT_OK, scale_factor=1.5), run_time=0.5)
        self.au_mot("X égale 0")
        self.play(FadeIn(etiq[0], scale=1.4), run_time=0.4)
        self.au_mot("face face, 0,25")
        self.play(ranger("FF", zones[0][0]), run_time=0.7)
        self.play(Indicate(quarts[3], color=VERT_OK, scale_factor=1.5), run_time=0.5)
        self.au_mot("X égale 1")
        self.play(FadeIn(etiq[1], scale=1.4), run_time=0.4)
        self.au_mot("pile face ou")
        self.play(ranger("PF", zones[1][0]), ranger("FP", zones[1][1]), run_time=0.8)
        self.au_mot("plus 0,25")
        plus = self.t("+", 40, WHITE).move_to(P(np.mean(zones[1]), quarts[1].get_center()[1]))
        self.play(FadeIn(plus, scale=1.6), run_time=0.35)
        self.au_mot("égale 0,5")
        v05 = self.t("0,5", 60, VERT_OK, BOLD)
        res = VGroup(self.t("=", 56).next_to(v05, LEFT, buff=0.4), v05)
        res.move_to(P(np.mean(zones[1]), -3.4))
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.5)
        self.insister(res[1], 0.3)
        self.attendre_voix()

    # ── 05 : le tableau de loi se remplit ───────────────────────────────────

    def mini_groupes(self, tb, s=0.5):
        """Au-dessus de chaque colonne, les cartes qui donnent cette valeur."""
        g = VGroup()
        for j, codes in enumerate((["FF"], ["PF", "FP"], ["PP"])):
            m = VGroup(*[carte_issue(c).scale(s) for c in codes]).arrange(RIGHT, buff=0.1)
            m.next_to(tb.rect[0][j + 1], UP, buff=0.2)
            g.add(m)
        return g

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tableau")
        self.titre_ecran("La loi de X")
        tb = self.tableau(P(-0.6, -0.1), 1.2)
        mg = self.mini_groupes(tb, 0.62)
        self.play(FadeIn(tb, shift=UP * 0.2), FadeIn(mg, shift=DOWN * 0.2), run_time=0.7)
        self.au_mot("valeurs 0")
        self.play(tb.poser(0, 0), run_time=0.35)
        self.au_mot("1, 2 sur")
        self.play(tb.poser(0, 1), run_time=0.35)
        self.au_mot("2 sur la")
        self.play(tb.poser(0, 2), run_time=0.35)
        self.au_mot("première ligne")
        self.play(*tb.allumer_ligne(0), run_time=0.5)
        self.au_mot("probabilités 0,25")
        self.play(*tb.eteindre_ligne(0), *tb.allumer_ligne(1), run_time=0.4)
        self.play(tb.poser(1, 0), run_time=0.35)
        self.au_mot("0,5 et")
        self.play(tb.poser(1, 1), run_time=0.35)
        self.au_mot("et 0,25")
        self.play(tb.poser(1, 2), run_time=0.35)
        self.au_mot("C'est la loi")
        cadre = SurroundingRectangle(VGroup(*tb.fonds), color=VERT_OK, buff=0.12, stroke_width=5)
        mot = suite(self.t("C'est la loi de", 44), self.t("X", 52, JAUNE_TITRE, BOLD), buff=0.2)
        mot.next_to(cadre, DOWN, buff=0.55)
        self.play(*tb.eteindre_ligne(1), Create(cadre), Write(mot), run_time=0.8)
        self.attendre_voix()

    # ── 06 : la somme fait 1 ────────────────────────────────────────────────

    def ecran_verif(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-verif")
        self.titre_ecran("On vérifie")
        tb = self.tableau(P(-0.6, 1.55), 0.9, posees=True)
        self.play(FadeIn(tb), run_time=0.5)
        fs = 60
        termes = [self.t(p, fs, VERT_OK, BOLD) for p in PROBAS]
        plus = [self.t("+", fs) for _ in range(2)]
        eg = self.t("=", fs)
        un = self.t("1", 72, JAUNE_TITRE, BOLD)
        lig = suite(termes[0], plus[0], termes[1], plus[1], termes[2], eg, un, buff=0.3)
        for m in (plus[0], plus[1], eg):
            m.match_y(termes[1]).shift(UP * 0.08)
        lig.move_to(P(-0.6, -0.6))
        self.au_mot("0,25 plus")
        self.play(TransformFromCopy(tb.val[1][0], termes[0]), run_time=0.6)
        self.au_mot("plus 0,5")
        self.play(FadeIn(plus[0]), TransformFromCopy(tb.val[1][1], termes[1]), run_time=0.6)
        self.au_mot("plus 0,25,")
        self.play(FadeIn(plus[1]), TransformFromCopy(tb.val[1][2], termes[2]), run_time=0.6)
        self.au_mot("égale 1")
        self.play(FadeIn(eg), FadeIn(un, scale=1.6), run_time=0.5)
        ok = self.coche(taille=0.32).next_to(lig, RIGHT, buff=0.45)
        self.play(Create(ok), run_time=0.4)
        self.insister(un, 0.3)
        self.au_mot("Une loi")
        regle = VGroup(self.t("Une loi de probabilité", 40, BLEU_CALCUL),
                       self.t("fait toujours 1 au total", 40)).arrange(DOWN, buff=0.15)
        regle.move_to(P(-0.9, -2.5))
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.7)
        self.attendre_voix()

    # ── 07 : le piège : un tiers chacun ? ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        self.titre_ecran("Le piège")
        xs = (-4.2, -0.6, 3.0)
        noms = VGroup(*[self.t(m, 46, WHITE, BOLD).move_to(P(x, 2.1)) for m, x in zip(("0 pile", "1 pile", "2 piles"), xs)])
        tiers = VGroup(*[suite(frac(1, 3, 52, ORANGE_RETENUE), self.t("?", 52, ORANGE_RETENUE), buff=0.15)
                         .move_to(P(x, 0.85)) for x in xs])
        self.au_mot("croire que")
        self.play(FadeIn(noms, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("même chance")
        meme = self.t("même chance ?", 44, ORANGE_RETENUE).move_to(P(-0.6, -0.4))
        self.play(FadeIn(meme, shift=UP * 0.15), run_time=0.5)
        self.au_mot("un tiers")
        chacun = self.t("un tiers chacun ?", 44, ORANGE_RETENUE).move_to(P(-0.6, -0.4))
        self.play(LaggedStart(*[FadeIn(f, scale=1.4) for f in tiers], lag_ratio=0.2),
                  ReplacementTransform(meme, chacun), run_time=0.8)
        self.au_mot("Non !")
        bloc = VGroup(tiers, chacun)
        barre = Line(bloc.get_corner(DL) + P(-0.3, -0.1), bloc.get_corner(UR) + P(0.3, 0.1), color=ROUGE_ERREUR,
                     stroke_width=8)
        non = self.t("Non !", 64, ROUGE_ERREUR, BOLD).move_to(P(4.6, -0.4))
        self.play(Create(barre), bloc.animate.set_opacity(0.4), FadeIn(non, scale=1.6), run_time=0.5)
        self.au_mot("Un seul pile")
        deux = VGroup(carte_issue("PF"), carte_issue("FP")).scale(1.25).arrange(RIGHT, buff=0.45).move_to(P(-3.4, -2.2))
        self.play(Indicate(noms[1], color=JAUNE_TITRE, scale_factor=1.3), FadeIn(deux, shift=UP * 0.2), run_time=0.6)
        self.au_mot("deux façons")
        self.insister(deux, 0.35)
        facons = self.t("2 façons", 50, JAUNE_TITRE, BOLD).next_to(deux, RIGHT, buff=0.5).shift(UP * 0.35)
        self.play(FadeIn(facons, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("deux fois")
        fois = self.t("2 fois plus probable", 40, VERT_OK).next_to(facons, DOWN, buff=0.25, aligned_edge=LEFT)
        self.play(FadeIn(fois, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("trois pièces")
        ps = [piece(f, 0.8).move_to(P(x, 1.3)) for f, x in (("PILE", -3.0), ("FACE", -0.6), ("PILE", 1.8))]
        self.play(*[FadeIn(p, scale=0.5) for p in ps], run_time=0.4)
        self.lancer(ps, 0.7)
        self.au_mot("Quelle est")
        q = VGroup(self.t("Probabilité d'obtenir", 44),
                   suite(self.t("exactement", 44), self.t("3 piles", 52, JAUNE_TITRE, BOLD), self.t("?", 48), buff=0.22))
        q.arrange(DOWN, buff=0.2).move_to(P(-0.6, -0.75))
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("exactement")
        self.play(FadeIn(q[1], shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 08b : correction : 8 issues, une seule PPP ──────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        codes = ["PPP", "PPF", "PFP", "PFF", "FPP", "FPF", "FFP", "FFF"]
        cartes = VGroup(*[carte_issue(c, 0.33) for c in codes]).arrange_in_grid(2, 4, buff=(0.45, 0.3))
        cartes.move_to(P(-0.6, 1.55))
        self.au_mot("8 issues")
        self.play(LaggedStart(*[FadeIn(c, scale=0.7) for c in cartes], lag_ratio=0.08), run_time=1.0)
        huit = self.t("8 issues équiprobables", 40).move_to(P(-0.6, -0.4))
        self.play(FadeIn(huit, shift=UP * 0.15), run_time=0.4)
        self.au_mot("une seule")
        anneau = SurroundingRectangle(cartes[0], color=JAUNE_TITRE, buff=0.08, stroke_width=6)
        self.play(cartes[1:].animate.set_opacity(0.3), Create(anneau), run_time=0.6)
        self.au_mot("pile, pile, pile")
        self.insister(VGroup(cartes[0], anneau), 0.35)
        self.au_mot("P de X")
        fs = 56
        p3 = self.t("P(X = 3)", fs, WHITE)
        p3[2].set_color(JAUNE_TITRE)
        eg = self.t("=", fs)
        f8 = frac(1, 8, 58, WHITE, VERT_OK, VERT_OK)
        eg2 = self.t("=", fs)
        res = self.t("0,125", 64, VERT_OK, BOLD)
        lig = suite(p3, eg, f8, eg2, res, buff=0.4).move_to(P(-0.9, -2.0))
        for m in (eg, eg2, res):
            m.match_y(f8)
        p3.match_y(f8).shift(DOWN * 0.03)
        self.play(FadeIn(p3, shift=UP * 0.15), run_time=0.5)
        self.au_mot("1 sur 8")
        self.play(FadeIn(eg), TransformFromCopy(cartes[0], f8[0]), GrowFromCenter(f8[1]),
                  TransformFromCopy(cartes, f8[2]), run_time=0.8)
        self.au_mot("soit 0,125")
        self.play(FadeIn(eg2), FadeIn(res, scale=0.6), run_time=0.5)
        self.insister(res, 0.35)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = suite(self.t("Les valeurs de", fs), self.t("X", fs + 4, JAUNE_TITRE, BOLD),
                   buff=0.18)
        l2 = suite(self.t("La probabilité de chaque valeur,", fs),
                   self.t("dans un tableau", fs, BLEU_CALCUL), buff=0.18)
        l3 = suite(self.t("On vérifie : le total fait", fs),
                   self.t("1", fs + 6, JAUNE_TITRE, BOLD), buff=0.18)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 12.4:
            lignes.scale_to_fit_width(12.4)
        lignes.move_to(P(-0.4, 0.6))
        for mot, l in zip(["les valeurs, puis", "la probabilité de chaque", "on vérifie que"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        ch = suite(self.t("Prochaine vidéo :", 36, VERT_OK), self.t("l'espérance", 36), buff=0.22)
        ch.move_to(P(-0.9, -2.6))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 10 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="10-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre : la voix ne parle plus du coach."""
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
        self.ecran_valeurs()
        self.ecran_issues()
        self.ecran_probas()
        self.ecran_tableau()
        self.ecran_verif()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")


class ProbaVaLoiSTMG(ProbaVaLoiBase):
    identite = "Maths STMG — EleveAI"


class ProbaVaLoiPremiereSpe(ProbaVaLoiBase):
    identite = "Maths 1re spé — EleveAI"
