# proba_bern_esperance.py
# EleveAI — Maths STMG — série « Probabilités » : l'ESPÉRANCE D'UNE LOI DE
# BERNOULLI vaut p (micro va_bern_esperance, notion va_bernoulli), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_bern_esperance_short.py
# (ceinture jaune, une file de 300 clients dont 60 s'allument).
#
# ⭐ Les canvas du coach repris :
#   · le TABLEAU DE LOI (canvasLoi([0, 1], [1 − p, p], « Loi de Bernoulli de
#     paramètre p ») → tableau_donnees : en-tête sombre « xᵢ », ligne
#     « P(X = xᵢ) » au libellé bleu clair, cases blanches, colonne allumée en
#     jaune) ; colonnes dans l'ordre de la voix : X = 1 puis X = 0 ;
#   · la BRANCHE DOUBLE de l'arbre pondéré (carte blanche, branches grises,
#     probabilités en bleu), comme dans proba_bern_epreuve.py : S 0,2 / S barre 0,8.
# Le sens : une file de 300 clients dont 60 s'allument (aucun nombre non dit).
#
# Écrans : 00 garde · 01 l'épicerie (un client sur cinq ; X = 1 / X = 0) ·
# 02 la loi (paramètre 0,2 ; 0,2 / 0,8) · 03 le calcul (1 × 0,2 + 0 × 0,8 = 0,2,
# E(X) = p) · 04 le sens (300 clients, 60 achats) · 05 le piège (E vaut 1 ?) ·
# 06 défi (35 % sans contact, 200 clients) · 06b correction (70) · 07 ce que
# tu as appris · 08 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! »).
# ⛔ PAS D'ÉCART : chaque nombre n'apparaît que quand la voix le dit.
#
# Voix : manim/voix/stmg-proba-bern-esperance.json (débit −7).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_esperance.py ProbaBernEsperanceSTMG -o eleveai-maths-stmg-proba-bern-esperance --media_dir manim/scripts/stmg/media-bern_esperance
# Puis copier dans manim/sorties/stmg/maths/probabilites/31-bern-esperance/.

import random
import sys
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
from proba_pc_conditionnelle import ANNEAU, ENCRE, SURLIGNE, lettre, suite  # noqa: E402
from proba_bern_epreuve import ECHEC, SUCCES, BrancheDouble, client  # noqa: E402
from proba_va_esperance import TableauLoi, lab_p, lab_xi  # noqa: E402

GRIS_CLIENT = "#64748B"
SAC = "#F59E0B"


def P(x, y):
    return np.array([x, y, 0.0])


def feuille(s=0.18, couleur=SUCCES):
    """Une petite feuille (le produit éco-responsable)."""
    f = Ellipse(width=2 * s, height=s, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                stroke_width=1.5).rotate(0.6)
    nerv = Line(f.get_left(), f.get_right(), color=WHITE, stroke_width=1.2).rotate(0.6, about_point=f.get_center())
    return VGroup(f, nerv)


def client_eco(s=1.0):
    """Le client de bern_epreuve ; `allumer_eco` lui donne un sac vert et une feuille."""
    c = client(1.0)
    c[2].set_fill(SAC)
    return c.scale(s)


def allumer_eco(c, scene, run_time=0.5):
    f = feuille(0.13 * c.height / 1.27).move_to(c[2]).set_z_index(2)
    scene.play(c[2].animate.set_fill(SUCCES), FadeIn(f, scale=2.0), Flash(c[2], color=SUCCES, line_length=0.15),
               run_time=run_time)
    return f


def petit_client(h=0.34, couleur=GRIS_CLIENT):
    """Une silhouette de la file : une tête et un buste."""
    tete = Circle(radius=h * 0.2, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, h * 0.3))
    corps = RoundedRectangle(width=h * 0.6, height=h * 0.5, corner_radius=h * 0.18, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).move_to(P(0, -h * 0.2))
    return VGroup(tete, corps)


def file_clients(n_col, n_lig, pas_x, pas_y, h, graine, n_allumes):
    """La foule rangée en grille ; renvoie (grille, indices tirés au hasard à allumer)."""
    g = VGroup(*[petit_client(h).move_to(P(pas_x * (k % n_col), -pas_y * (k // n_col)))
                 for k in range(n_col * n_lig)])
    rnd = random.Random(graine)
    allumes = sorted(rnd.sample(range(n_col * n_lig), n_allumes))
    return g, allumes


def carte_sans_contact(s=1.0):
    """Une carte bancaire et les ondes du sans contact (dessinées)."""
    carte = RoundedRectangle(width=1.6, height=1.0, corner_radius=0.1, fill_color="#1D4ED8", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    puce = RoundedRectangle(width=0.32, height=0.24, corner_radius=0.04, fill_color="#FBBF24", fill_opacity=1,
                            stroke_width=0).move_to(carte.get_center() + P(-0.45, 0.05))
    bande = Rectangle(width=1.0, height=0.08, fill_color=WHITE, fill_opacity=0.7, stroke_width=0)
    bande.move_to(carte.get_center() + P(-0.15, -0.3))
    ondes = VGroup(*[Arc(radius=0.18 + 0.16 * k, start_angle=-PI / 4, angle=PI / 2, color=WHITE, stroke_width=4)
                     .move_to(carte.get_center() + P(0.95 + 0.12 * k, 0.05)) for k in range(3)])
    return VGroup(carte, puce, bande, ondes).scale(s)


def tableau_bern(coin, larg_lab=2.9, larg=1.45, h=0.72, fs=28):
    """Le tableau de loi du coach, colonnes X = 1 puis X = 0 (l'ordre de la voix)."""
    return TableauLoi([lab_xi(fs), lab_p(int(fs * 0.93))], [["1", "0"], ["0,2", "0,8"]], coin=coin,
                      larg_lab=larg_lab, larg=larg, h=h, fs=fs)


def branche_bern(echelle=0.85):
    """La branche double, avec « X = 1 » / « X = 0 » sous S et S barre."""
    a = BrancheDouble().scale(echelle)
    fs = int(26 * echelle / 0.85)
    a.x1 = Text("X = 1", font_size=fs, color=SUCCES, weight=BOLD).next_to(a.lab[0], DOWN, buff=0.08)
    a.x0 = Text("X = 0", font_size=fs, color=ECHEC, weight=BOLD).next_to(a.lab[1], DOWN, buff=0.08)
    a.x1.shift(RIGHT * (a.x1.width / 2 - a.lab[0].width / 2))
    a.x0.shift(RIGHT * (a.x0.width / 2 - a.lab[1].width / 2))
    tout = VGroup(a.depart, *a.branches, *a.lab, a.x1, a.x0)
    k = echelle / 0.85
    neuve = RoundedRectangle(width=tout.width + 1.1 * k, height=tout.height + 1.1 * k, corner_radius=0.2,
                             fill_color=WHITE, fill_opacity=1, stroke_color=a.carte.get_stroke_color(),
                             stroke_width=2).move_to(tout).shift(UP * 0.25 * k)
    a.carte.become(neuve)
    a.titre.next_to(a.carte.get_top(), DOWN, buff=0.12 * k)
    a.add(a.x1, a.x0)
    return a


class ProbaBernEsperanceBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-bern-esperance"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.3, bord=None):
        """Agrandir puis rétrécir (×1,5 puis ÷1,5), jamais de zoom de caméra."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def calcul(self, morceaux, fs=44, buff=0.16):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …]."""
        return suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'espérance d'une loi de Bernoulli", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        a = branche_bern(0.8).move_to(P(-3.4, -0.35))
        self.play(FadeIn(a.socle()), *[Create(b) for b in a.branches], FadeIn(VGroup(*a.lab)), run_time=0.6)
        self.au_mot(": p")
        res = suite(self.t("espérance", 44), self.t("=", 50), self.t("p", 66, JAUNE_TITRE, BOLD), buff=0.25)
        res.move_to(P(1.9, -0.3))
        cadre = SurroundingRectangle(res, color=JAUNE_TITRE, buff=0.22, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(res, scale=1.4), Create(cadre), Indicate(a.lab[0], color=SUCCES, scale_factor=1.5),
                  run_time=0.6)
        self.insister(res[2], 0.25)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'épicerie : un client sur cinq ────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("À l'épicerie")
        cl = VGroup(*[client_eco(1.15) for _ in range(5)]).arrange(RIGHT, buff=0.55).move_to(P(-1.0, 1.45))
        self.play(LaggedStart(*[FadeIn(c, shift=LEFT * 0.4) for c in cl], lag_ratio=0.15), run_time=0.9)
        self.au_mot("un client sur cinq")
        un5 = self.t("un client sur cinq", 38, JAUNE_TITRE).move_to(P(-1.0, 0.0))
        self.play(FadeIn(un5, shift=UP * 0.1), cl[1:].animate.set_opacity(0.45), run_time=0.5)
        self.au_mot("achète un produit")
        f = allumer_eco(cl[0], self)
        eco = self.t("éco-responsable", 34, SUCCES).next_to(un5, DOWN, buff=0.15)
        self.play(FadeIn(eco, shift=UP * 0.1), run_time=0.4)
        self.au_mot("On note X")
        self.play(FadeOut(VGroup(un5, eco)), cl[1:].animate.set_opacity(1), run_time=0.4)
        lx = self.t("X :", 44, JAUNE_TITRE, BOLD).move_to(P(-4.4, -0.75))
        self.play(FadeIn(lx, scale=1.4), run_time=0.4)
        self.au_mot("1 si le client")
        l1 = suite(self.t("1", 48, SUCCES, BOLD), self.t("si le client en achète", 34), buff=0.3)
        l1.next_to(lx, RIGHT, buff=0.45)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(VGroup(cl[0], f), color=SUCCES), run_time=0.5)
        self.au_mot("0 sinon")
        l0 = suite(self.t("0", 48, ECHEC, BOLD), self.t("sinon", 34), buff=0.3)
        l0.next_to(l1, DOWN, buff=0.35, aligned_edge=LEFT)
        self.play(FadeIn(l0, shift=UP * 0.1), *[Indicate(c, color=ECHEC, scale_factor=1.08) for c in cl[1:]],
                  run_time=0.6)
        self.attendre_voix()

    # ── 02 : la loi de Bernoulli de paramètre 0,2 ───────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-loi")
        self.titre_ecran("La loi de X")
        a = branche_bern(0.85).move_to(P(-4.6, 0.55))
        tab = tableau_bern(coin=P(-1.4, 2.3))
        self.play(FadeIn(a.socle()), *[Create(b) for b in a.branches], FadeIn(VGroup(*a.lab, a.x1, a.x0)),
                  FadeIn(tab, shift=DOWN * 0.1), run_time=0.8)
        self.au_mot("loi de Bernoulli")
        l1 = suite(self.t("loi de Bernoulli de paramètre", 30), self.t("p", 40, JAUNE_TITRE, BOLD), buff=0.2)
        l1.move_to(P(-1.4, 0.0), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("paramètre 0,2")
        l2 = suite(self.t("p", 54, JAUNE_TITRE, BOLD), self.t("=", 54), self.t("0,2", 54, VERT_OK, BOLD), buff=0.25)
        l2.next_to(l1, DOWN, buff=0.35, aligned_edge=LEFT)
        self.play(FadeIn(l2, scale=1.5), run_time=0.5)
        self.insister(l2[2], 0.25)
        self.au_mot("X égale 1")
        self.play(tab.poser(0, 0), *tab.allumer(0), Indicate(a.x1, color=SUCCES, scale_factor=1.5), run_time=0.5)
        self.au_mot("la probabilité 0,2")
        n0 = a.nombre(0, "0,2", fs=int(30 * 0.85))
        self.play(tab.poser(1, 0), FadeIn(n0, scale=1.6), run_time=0.5)
        self.insister(n0, 0.25)
        self.au_mot("et 0 avec")
        self.play(*tab.eteindre(0), tab.poser(0, 1), *tab.allumer(1), Indicate(a.x0, color=ECHEC, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("probabilité 0,8")
        n1 = a.nombre(1, "0,8", fs=int(30 * 0.85))
        self.play(tab.poser(1, 1), FadeIn(n1, scale=1.6), run_time=0.5)
        self.insister(n1, 0.25)
        self.play(*tab.eteindre(1), run_time=0.3)
        self.attendre_voix()

    def loi_complete(self, coin=P(-5.9, 2.3), branche_pos=P(3.3, 1.35), echelle=0.72):
        """Le tableau et la branche double déjà remplis (écrans qui repartent de la loi)."""
        tab = tableau_bern(coin=coin).tout()
        a = branche_bern(echelle).move_to(branche_pos)
        fs = int(30 * echelle / 0.85)
        a.add(a.nombre(0, "0,2", fs=fs), a.nombre(1, "0,8", fs=fs))
        return tab, a

    # ── 03 : le calcul : 1 × 0,2 + 0 × 0,8 = 0,2 ────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("Son espérance")
        tab, a = self.loi_complete()
        self.add(tab, a)
        x0 = -5.9
        self.au_mot("Son espérance")
        k = [("E(X)", JAUNE_TITRE), ("=", WHITE), ("1", SUCCES), ("×", WHITE), ("0,2", BLEU_CALCUL), ("+", WHITE),
             ("0", ECHEC), ("×", WHITE), ("0,8", BLEU_CALCUL), ("=", WHITE), ("0,2", VERT_OK)]
        l = self.calcul(k, 50).move_to(P(x0, -0.75), aligned_edge=LEFT)
        self.play(FadeIn(l[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 fois 0,2")
        self.play(*tab.allumer(0), Indicate(a.x1, color=SUCCES, scale_factor=1.4),
                  TransformFromCopy(tab.val[0][0], l[2]), FadeIn(l[3]), TransformFromCopy(tab.val[1][0], l[4]),
                  run_time=0.6)
        self.au_mot("plus 0 fois 0,8")
        self.play(*tab.eteindre(0), *tab.allumer(1), Indicate(a.x0, color=ECHEC, scale_factor=1.4), FadeIn(l[5]),
                  TransformFromCopy(tab.val[0][1], l[6]), FadeIn(l[7]), TransformFromCopy(tab.val[1][1], l[8]),
                  run_time=0.6)
        self.au_mot(". 0,2.")
        nul = VGroup(l[6], l[7], l[8])
        self.play(*tab.eteindre(1), nul.animate.set_opacity(0.35), run_time=0.4)
        self.play(FadeIn(l[9]), FadeIn(l[10], scale=1.8), run_time=0.4)
        self.insister(l[10], 0.25)
        self.au_mot("L'espérance d'une loi")
        res = suite(self.t("E(X)", 60, JAUNE_TITRE, BOLD), self.t("=", 60), self.t("p", 72, JAUNE_TITRE, BOLD),
                    buff=0.3).move_to(P(-2.0, -2.2))
        cadre = SurroundingRectangle(res, color=JAUNE_TITRE, buff=0.22, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(res[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("c'est p")
        self.play(FadeIn(res[2], scale=1.8), Create(cadre), run_time=0.5)
        self.insister(VGroup(res, cadre), 0.3)
        self.attendre_voix()

    # ── 04 : le sens : 300 clients, environ 60 achats ───────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sens")
        self.titre_ecran("Ça veut dire quoi ?")
        g, allumes = file_clients(30, 10, 0.33, 0.41, 0.34, 974, 60)
        g.move_to(P(-1.1, 0.75))
        self.au_mot("Sur 300 clients")
        rangs = [VGroup(*g[30 * r:30 * (r + 1)]) for r in range(10)]
        self.play(LaggedStart(*[FadeIn(r, shift=LEFT * 0.3) for r in rangs], lag_ratio=0.12), run_time=1.0)
        y = -2.35
        n300 = self.t("300 clients", 40, BLEU_CALCUL).move_to(P(-6.2, y), aligned_edge=LEFT)
        self.play(FadeIn(n300, scale=1.4), run_time=0.4)
        self.au_mot("environ 300 fois 0,2")
        k = [("≈", WHITE), ("300", BLEU_CALCUL), ("×", WHITE), ("0,2", VERT_OK)]
        l = self.calcul(k, 44).next_to(n300, RIGHT, buff=0.4)
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.5)
        self.play(LaggedStart(*[g[i].animate.set_fill(SUCCES) for i in allumes], lag_ratio=0.04), run_time=2.2)
        self.au_mot("soit 60 achats")
        r = self.calcul([("=", WHITE), ("60 achats", SUCCES)], 44).next_to(l, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.5), *[Flash(g[i], color=SUCCES, line_length=0.1, num_lines=6) for i in allumes[::6]],
                  run_time=0.6)
        self.insister(r[1], 0.25)
        self.attendre_voix()

    # ── 05 : le piège : « l'espérance vaut 1 » ──────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        tab, a = self.loi_complete()
        self.add(tab, a)
        self.au_mot("croire que l'espérance vaut 1")
        faux = suite(self.t("E(X)", 54, ROUGE_ERREUR, BOLD), self.t("=", 54, ROUGE_ERREUR),
                     self.t("1", 60, ROUGE_ERREUR, BOLD), self.t("?", 60, ROUGE_ERREUR), buff=0.25)
        faux.move_to(P(-5.9, -0.3), aligned_edge=LEFT)
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.5)
        self.au_mot("un succès vaut 1")
        self.play(*tab.allumer(0, [1]), Indicate(tab.val[0][0], color=ROUGE_ERREUR, scale_factor=1.8),
                  Indicate(a.x1, color=SUCCES, scale_factor=1.5), run_time=0.7)
        self.play(*tab.eteindre(0, [1]), run_time=0.3)
        self.au_mot("Non")
        barre = Line(faux.get_left() + LEFT * 0.1, faux.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=7)
        self.play(Create(barre), faux.animate.set_opacity(0.45), run_time=0.5)
        self.au_mot("on pondère")
        ok = self.t("on pondère par la probabilité", 40, VERT_OK).move_to(P(-5.9, -1.4), aligned_edge=LEFT)
        self.play(FadeIn(ok, shift=UP * 0.1), run_time=0.5)
        self.au_mot("par la probabilité")
        ligne_p = [tab.rect[1][0]] + [tab.case(1, j) for j in range(2)]
        self.play(*[c.animate.set_stroke(ANNEAU, 6) for c in ligne_p],
                  *[tab.case(1, j).animate.set_fill(SURLIGNE, 1) for j in range(2)],
                  Indicate(a.nombres[0], color=BLEU_CALCUL, scale_factor=1.6),
                  Indicate(a.nombres[1], color=BLEU_CALCUL, scale_factor=1.6), run_time=0.8)
        self.insister(ok, 0.25, LEFT)
        self.attendre_voix()

    # ── 06 : défi : 35 % sans contact, 200 clients ──────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("35 %")
        carte = carte_sans_contact(1.5).move_to(P(-4.3, 1.0))
        p35 = self.t("35 %", 64, JAUNE_TITRE, BOLD).next_to(carte, DOWN, buff=0.45)
        self.play(FadeIn(carte, shift=UP * 0.2), FadeIn(p35, scale=1.6), run_time=0.6)
        self.au_mot("paient sans contact")
        sc = self.t("des clients paient sans contact", 34).move_to(P(-1.6, 1.4), aligned_edge=LEFT)
        self.play(FadeIn(sc, shift=UP * 0.1), Wiggle(carte[3]), run_time=0.7)
        self.au_mot("Sur 200 clients")
        n200 = self.t("Sur 200 clients :", 40, BLEU_CALCUL).move_to(P(-1.6, 0.2), aligned_edge=LEFT)
        self.play(FadeIn(n200, scale=1.3), run_time=0.5)
        self.au_mot("combien en moyenne")
        q = suite(self.t("en moyenne", 40), self.t("?", 66, ORANGE_RETENUE, BOLD), buff=0.3)
        q.next_to(n200, DOWN, buff=0.35, aligned_edge=LEFT)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.5)
        self.insister(q[1], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        g, allumes = file_clients(20, 10, 0.3, 0.42, 0.34, 2026, 70)
        g.move_to(P(-3.6, 0.15))
        self.play(LaggedStart(*[FadeIn(VGroup(*g[20 * r:20 * (r + 1)]), shift=LEFT * 0.2) for r in range(10)],
                              lag_ratio=0.1), run_time=0.9)
        x0 = 0.2
        self.au_mot("E égale 0,35")
        l1 = self.calcul([("E", JAUNE_TITRE), ("=", WHITE), ("0,35", VERT_OK)], 54).move_to(P(x0, 1.6),
                                                                                         aligned_edge=LEFT)
        self.play(FadeIn(l1, scale=1.4), run_time=0.5)
        self.au_mot("200 fois 0,35")
        l2 = self.calcul([("200", BLEU_CALCUL), ("×", WHITE), ("0,35", VERT_OK)], 50).move_to(P(x0, 0.4),
                                                                                           aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.play(LaggedStart(*[g[i].animate.set_fill(SUCCES) for i in allumes], lag_ratio=0.04), run_time=2.0)
        self.au_mot("70 clients")
        l3 = self.calcul([("=", WHITE), ("70 clients", SUCCES)], 50).move_to(P(x0, -0.75), aligned_edge=LEFT)
        l4 = self.t("en moyenne", 40).next_to(l3, DOWN, buff=0.25, aligned_edge=LEFT).shift(RIGHT * 0.5)
        self.play(FadeIn(l3, scale=1.5), run_time=0.5)
        self.au_mot("en moyenne")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.insister(l3[1], 0.25, LEFT)
        ok = self.coche(taille=0.35).next_to(l3, RIGHT, buff=0.4)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = suite(self.t("Loi de Bernoulli de paramètre", fs), self.t("p", fs + 8, JAUNE_TITRE, BOLD),
                   self.t(":", fs), self.t("E(X) = p", fs + 6, VERT_OK, BOLD), buff=0.2)
        l2 = suite(self.t("Sur", fs), self.t("n", fs + 8, BLEU_CALCUL, BOLD), self.t("clients : environ", fs),
                   self.t("n × p", fs + 6, VERT_OK, BOLD), self.t("succès", fs), buff=0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.8)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.4, 0.6))
        for mot, l in zip(["Une loi de Bernoulli", "Sur n clients"], lignes):
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
        self.ecran_loi()
        self.ecran_calcul()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBernEsperanceSTMG(ProbaBernEsperanceBase):
    identite = "Maths STMG — EleveAI"
