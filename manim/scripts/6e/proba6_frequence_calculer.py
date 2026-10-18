# proba6_frequence_calculer.py
# EleveAI — Maths 6e — série « Probabilités », épisode 7 : calculer une
# fréquence observée (micro : proba_frequence_calculer), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau : proba6_frequence_calculer_short.py.
#
# Écrans : 00 garde · 01 les 100 lancers s'empilent en barres (histogramme du
# dé, comme la bande-annonce), le compteur des 6 monte jusqu'à 18, le tableau
# du coach se remplit · 02 fréquence = nombre de 6 sur nombre de lancers →
# 18/100 · 03 les écritures : la grille de 100 cases (18 en jaune), 0,18,
# 18 %, posé sur l'échelle · 04 la pièce, 9 piles sur 50 → 0,18 aussi ·
# 05 le piège 100/18 (plus que 1, hors de l'échelle) · 06 défi 12 faces sur
# 20 · 06b correction 0,6 · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (banque 6e/maths/probabilites.bank.ts, micro
# proba_frequence_calculer ; rendu lib/tutor-v4/components/ProbabilitesCanvas.tsx) :
#   · variante « tableau » (serieCalc) : carte blanche, en-têtes « Résultat »
#     et « Nombre de fois » sur fond ardoise clair, la case surlignée en ambre ;
#     elle se remplit quand la voix dit le nombre.
# ⭐ L'ÉCHELLE DE 0 À 1 est le fil rouge : chaque fréquence s'y pose.
# ⛔ 17/10 « pas d'écart » : aucun nombre écrit avant d'être dit. Les bornes de
# l'échelle portent des MOTS (impossible / certain) tant que la voix n'a pas dit
# « 0 » et « 1 ». Le compteur des 6 monte (demande de Frédéric) ; les autres
# barres n'ont pas de nombre.
#
# Les 100 lancers sont un VRAI tirage (graine 98) : 17, 15, 17, 17, 16, 18.
#
# Voix : manim/voix/6e-proba-frequence-calculer.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_frequence_calculer.py Proba6FrequenceCalculer -o eleveai-maths-6e-proba-frequence-calculer --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/07-frequence/.

import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de, de_qui_roule, piece_qui_tourne  # noqa: E402

# couleurs du coach (tableau)
CARTE_FOND = "#FFFFFF"
ENTETE_FOND = "#F1F5F9"
BORD_GRIS = "#CBD5E1"
TEXTE_SOMBRE = "#1E293B"
AMBRE_FOND = "#FEF3C7"
AMBRE_TEXTE = "#78350F"
GRIS_ETEINT = "#6B7280"
PILE_C = JAUNE_TITRE
FACE_C = ORANGE_RETENUE

_r = random.Random(98)
LANCERS = [_r.randint(1, 6) for _ in range(100)]


def P(x, y):
    return np.array([x, y, 0.0])


def comptes(n):
    return [LANCERS[:n].count(i) for i in range(1, 7)]


class Notion6eProba(Notion6e):
    identite = "Maths 6e — EleveAI"


# ── les dessins (paysage et short) ──────────────────────────────────────────

def tableau_coach(lignes, l1=2.4, l2=2.9, h=0.75, fs=30):
    """Le canvas « tableau » du coach : en-têtes Résultat / Nombre de fois,
    puis une ligne par résultat (le premier élément peut être un Mobject).
    Renvoie (tableau, cases de la colonne « Nombre de fois »)."""
    g, cases = VGroup(), []

    def case(x, y, w, fond):
        return Rectangle(width=w, height=h, fill_color=fond, fill_opacity=1,
                         stroke_color=BORD_GRIS, stroke_width=2).move_to(P(x, y))

    ent = VGroup(case(l1 / 2, 0, l1, ENTETE_FOND), case(l1 + l2 / 2, 0, l2, ENTETE_FOND))
    lbl = VGroup(Text("Résultat", font_size=fs - 4, color=TEXTE_SOMBRE, weight=BOLD).move_to(ent[0]),
                 Text("Nombre de fois", font_size=fs - 4, color=TEXTE_SOMBRE, weight=BOLD).move_to(ent[1]))
    g.add(ent, lbl)
    for k, res in enumerate(lignes):
        y = -(k + 1) * h
        c1, c2 = case(l1 / 2, y, l1, CARTE_FOND), case(l1 + l2 / 2, y, l2, CARTE_FOND)
        r = res if isinstance(res, Mobject) else Text(res, font_size=fs, color=TEXTE_SOMBRE, weight=BOLD)
        r.move_to(c1)
        g.add(VGroup(c1, c2, r))
        cases.append(c2)
    return g, cases


def histogramme(n_tracker, base_y, x0, pas, larg, echelle):
    """Les barres du dé (1 → 6), redessinées à chaque image ; la barre du 6 en jaune."""
    def barres():
        c = comptes(int(n_tracker.get_value()))
        g = VGroup()
        for i in range(6):
            h = max(c[i] * echelle, 0.001)
            g.add(Rectangle(width=larg, height=h, stroke_width=0, fill_opacity=0.9,
                            fill_color=JAUNE_TITRE if i == 5 else BLEU_CALCUL)
                  .move_to(P(x0 + i * pas, base_y + h / 2)))
        return g
    return always_redraw(barres)


def grille(n, prises, cote=0.36, par_ligne=10, couleur=JAUNE_TITRE, buff=0.05):
    """n cases (lignes de 10) ; les `prises` premières en couleur."""
    g = VGroup(*[Square(cote, stroke_color=WHITE, stroke_width=1.5,
                        fill_color=couleur if k < prises else "#1E293B", fill_opacity=1)
                 for k in range(n)])
    g.arrange_in_grid(cols=par_ligne, buff=buff)
    return g


def piece(pile=True, r=0.22):
    disque = Circle(radius=r, fill_color=PILE_C if pile else FACE_C, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=2)
    return VGroup(disque, Text("P" if pile else "F", font_size=int(r * 90), color=BLACK,
                               weight=BOLD).move_to(disque))


class Proba6FrequenceCalculer(Notion6eProba):
    nom_voix = "6e-proba-frequence-calculer"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés (morceaux séparés, alignés sur la base)."""
        g = VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        return g

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + P(-0.1, -0.05), mob.get_corner(UR) + P(0.1, 0.05),
                    stroke_width=sw, color=color)

    # ── l'échelle de 0 à 1 (bornes en MOTS tant que 0 et 1 ne sont pas dits) ──

    X0, X1, YE = -5.2, 2.8, -2.0

    def x_de(self, p):
        return self.X0 + (self.X1 - self.X0) * p

    def echelle(self, mots=True):
        barre = Line(P(self.X0, self.YE), P(self.X1, self.YE), stroke_width=12)
        # (le dégradé d'une Line se lit à l'envers : rouge à gauche = impossible)
        barre.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])
        bouts = VGroup(*[Line(P(x, self.YE - 0.22), P(x, self.YE + 0.22), stroke_width=5)
                         for x in (self.X0, self.X1)])
        g = VGroup(barre, bouts)
        if mots:
            g.add(self.t("impossible", 26, ROUGE_ERREUR).next_to(P(self.X0, self.YE), DOWN, buff=0.3),
                  self.t("certain", 26, VERT_OK).next_to(P(self.X1, self.YE), DOWN, buff=0.3))
        return g

    def curseur(self, p, texte, couleur=JAUNE_TITRE, fs=34):
        tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.15).rotate(PI)
        tri.move_to(P(self.x_de(p), self.YE + 0.3))
        lbl = texte if isinstance(texte, Mobject) else self.t(texte, fs, couleur)
        lbl.next_to(tri, UP, buff=0.1)
        return VGroup(tri, lbl)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La fréquence", 64, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.9)
        roule = de_qui_roule(P(-0.6, 0.55), 1.4, periode=0.16, faces=LANCERS[:40])
        self.add(roule)
        self.au_mot("ce qui s'est vraiment passé")
        q = self.t("ce qui s'est vraiment passé", 42, BLEU_CALCUL).move_to(P(-0.6, -1.15))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.play(q[-6:].animate.set_color(VERT_OK), run_time=0.3)
        self.attendre_voix(marge=1.0)
        roule.clear_updaters()

    # ── 01 : les 100 lancers ────────────────────────────────────────────────

    HB, HX0, HPAS, HLARG, HECH = -2.55, -5.6, 1.05, 0.75, 0.2

    def decor_histo(self):
        axe = Line(P(self.HX0 - 0.6, self.HB), P(self.HX0 + 5 * self.HPAS + 0.6, self.HB), stroke_width=3)
        faces = VGroup(*[de(i + 1, 0.5).move_to(P(self.HX0 + i * self.HPAS, self.HB - 0.42))
                         for i in range(6)])
        return axe, faces

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("On lance un dé")
        axe, faces = self.decor_histo()
        n = ValueTracker(0)
        hist = histogramme(n, self.HB, self.HX0, self.HPAS, self.HLARG, self.HECH)
        roule = de_qui_roule(P(1.3, 1.7), 1.0, periode=0.07, faces=LANCERS)
        self.add(roule)
        self.play(Create(axe), FadeIn(faces), run_time=0.5)
        self.add(hist)
        self.au_mot("100 fois")
        cent = self.ligne([("100", JAUNE_TITRE), ("lancers", WHITE)], 44, 0.2).move_to(P(4.4, 1.7))
        self.play(FadeIn(cent, scale=0.6), run_time=0.4)
        self.insister(cent[0], 0.3)
        # le compteur des 6, au-dessus de la barre jaune
        cpt = always_redraw(lambda: self.t(str(comptes(int(n.get_value()))[5]), 44, JAUNE_TITRE)
                            .set_opacity(1 if comptes(int(n.get_value()))[5] > 0 else 0)
                            .next_to(P(self.HX0 + 5 * self.HPAS, self.HB + comptes(int(n.get_value()))[5]
                                       * self.HECH), UP, buff=0.15))
        self.au_mot("On compte les 6")
        self.play(Indicate(faces[5], color=JAUNE_TITRE, scale_factor=1.5), run_time=0.4)
        self.add(cpt)
        self.play(n.animate.set_value(100), run_time=1.6, rate_func=linear)
        roule.clear_updaters()
        self.remove(roule)
        self.add(de(LANCERS[-1], 1.0).move_to(P(1.3, 1.7)))
        hist.clear_updaters()
        cpt.clear_updaters()
        self.hist, self.faces, self.axe, self.cpt, self.cent = hist, faces, axe, cpt, cent
        self.au_mot("il en sort 18")
        tab, cases = tableau_coach([de(6, 0.5)], 2.0, 2.9, 0.8, 28)
        tab.move_to(P(3.9, -0.2))
        self.play(FadeIn(tab, shift=LEFT * 0.2), run_time=0.4)
        n18 = self.t("18", 40, AMBRE_TEXTE).move_to(cases[0])
        self.play(cases[0].animate.set_fill(AMBRE_FOND), TransformFromCopy(cpt, n18), run_time=0.6)
        self.insister(n18, 0.3)
        self.attendre_voix(marge=1.2)

    def histo_fixe(self):
        """L'histogramme des 100 lancers, immobile, avec le 18 sur la barre du 6."""
        axe, faces = self.decor_histo()
        hist = histogramme(ValueTracker(100), self.HB, self.HX0, self.HPAS, self.HLARG, self.HECH)
        hist.clear_updaters()
        dix8 = self.t("18", 44, JAUNE_TITRE).next_to(hist[5], UP, buff=0.15)
        return VGroup(axe, faces, hist), hist, faces, dix8

    # ── 02 : la fréquence ───────────────────────────────────────────────────

    def ecran_frequence(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-frequence")
        self.titre_ecran("La fréquence du 6")
        bloc, hist, faces, dix8 = self.histo_fixe()
        self.add(bloc, dix8)
        xc = 3.4
        self.au_mot("c'est le nombre de 6")
        f1 = self.t("fréquence du 6", 36, JAUNE_TITRE).move_to(P(xc, 2.2))
        egal = self.t("=", 40).next_to(f1, DOWN, buff=0.25)
        num = self.t("nombre de 6", 38, JAUNE_TITRE)
        den = self.t("nombre de lancers", 38, BLEU_CALCUL)
        larg = max(num.width, den.width) + 0.2
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, stroke_width=4)
        frac = VGroup(num, barre, den).arrange(DOWN, buff=0.15).next_to(egal, DOWN, buff=0.25)
        self.play(FadeIn(f1), FadeIn(egal), FadeIn(num, shift=UP * 0.15), Create(barre),
                  Indicate(hist[5], color=WHITE), Indicate(dix8), run_time=0.7)
        self.au_mot("sur le nombre de lancers")
        self.play(FadeIn(den, shift=UP * 0.15),
                  *[Indicate(b, color=WHITE, scale_factor=1.1) for b in hist], run_time=0.7)
        self.au_mot("18 sur 100")
        nf = self.fraction(18, 100, 48, WHITE, color_num=JAUNE_TITRE, color_den=BLEU_CALCUL)
        eg2 = self.t("=", 44)
        ligne = VGroup(eg2, nf).arrange(RIGHT, buff=0.3).next_to(frac, DOWN, buff=0.35)
        self.play(FadeIn(eg2), TransformFromCopy(dix8, nf[0]), run_time=0.6)
        self.play(Create(nf[1]), FadeIn(nf[2], shift=UP * 0.15), run_time=0.4)
        self.insister(nf, 0.35)
        self.attendre_voix(marge=1.0)

    # ── 03 : les écritures ──────────────────────────────────────────────────

    def ecran_ecritures(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ecritures")
        self.titre_ecran("Trois écritures")
        g = grille(100, 0, 0.34, 10, buff=0.05).move_to(P(3.6, 0.65))
        nf = self.fraction(18, 100, 48, WHITE, color_num=JAUNE_TITRE, color_den=BLEU_CALCUL)
        nf.move_to(P(-4.8, 1.0))
        ech = self.echelle()
        self.play(FadeIn(nf), FadeIn(g, lag_ratio=0.01), Create(ech), run_time=0.8)
        self.play(LaggedStart(*[g[k].animate.set_fill(JAUNE_TITRE) for k in range(18)], lag_ratio=0.12),
                  run_time=1.0)
        self.au_mot("0,18")
        e1 = self.ligne([("=", WHITE), ("0,18", JAUNE_TITRE)], 52, 0.25).next_to(nf, RIGHT, buff=0.3)
        self.play(FadeIn(e1, shift=LEFT * 0.2), run_time=0.4)
        cur = self.curseur(0.0, "0,18")
        self.play(FadeIn(cur), run_time=0.2)
        self.play(cur.animate.move_to(P(self.x_de(0.18), cur.get_center()[1])), run_time=0.9)
        self.au_mot("18 %")
        e2 = self.ligne([("=", WHITE), ("18 %", JAUNE_TITRE)], 52, 0.25).next_to(e1, RIGHT, buff=0.3)
        self.play(FadeIn(e2, shift=LEFT * 0.2), run_time=0.4)
        self.play(Indicate(VGroup(*g[:18]), color=WHITE, scale_factor=1.05), run_time=0.5)
        self.insister(e2[1], 0.35)
        self.attendre_voix(marge=1.2)

    # ── 04 : avec une pièce ─────────────────────────────────────────────────

    def ecran_autre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-autre")
        self.titre_ecran("Avec une pièce")
        ech = self.echelle()
        rappel = VGroup(de(6, 0.45), self.t("0,18", 30, GRIS_ETEINT)).arrange(RIGHT, buff=0.12)
        tri = Triangle(fill_color=GRIS_ETEINT, fill_opacity=1, stroke_width=0).scale(0.15).rotate(PI)
        tri.move_to(P(self.x_de(0.18), self.YE + 0.3))
        rappel.next_to(tri, UP, buff=0.1)
        self.add(ech, tri, rappel)
        pc = piece_qui_tourne(P(-5.3, 1.75), 0.6)
        self.add(pc)
        self.au_mot("50 lancers")
        cinq = self.ligne([("50", BLEU_CALCUL), ("lancers", WHITE)], 42, 0.2).move_to(P(-2.6, 1.75))
        g = grille(50, 0, 0.34, 10, couleur=PILE_C, buff=0.05).move_to(P(3.4, 1.7))
        self.play(FadeIn(cinq, scale=0.6), FadeIn(g, lag_ratio=0.02), run_time=0.6)
        self.au_mot("9 piles")
        tab, cases = tableau_coach(["pile"], 2.0, 2.9, 0.8, 28)
        tab.move_to(P(-3.4, 0.25))
        n9 = self.t("9", 40, AMBRE_TEXTE).move_to(cases[0])
        self.play(FadeIn(tab, shift=RIGHT * 0.2),
                  LaggedStart(*[g[k].animate.set_fill(PILE_C) for k in range(9)], lag_ratio=0.15), run_time=0.9)
        self.play(cases[0].animate.set_fill(AMBRE_FOND), FadeIn(n9, scale=0.5), run_time=0.4)
        self.au_mot("9 sur 50")
        nf = self.fraction(9, 50, 48, WHITE, color_num=PILE_C, color_den=BLEU_CALCUL).move_to(P(1.9, -0.4))
        self.play(TransformFromCopy(n9, nf[0]), Create(nf[1]), TransformFromCopy(cinq[0], nf[2]), run_time=0.7)
        self.au_mot("soit 0,18")
        e1 = self.ligne([("=", WHITE), ("0,18", JAUNE_TITRE)], 52, 0.25).next_to(nf, RIGHT, buff=0.3)
        self.play(FadeIn(e1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("aussi")
        cur = self.curseur(0.0, "0,18")
        cur.add(VGroup(piece(True, 0.2)).next_to(cur[1], LEFT, buff=0.12))
        self.play(FadeIn(cur), FadeOut(VGroup(tri, rappel)), run_time=0.2)
        self.play(cur.animate.shift(RIGHT * (self.x_de(0.18) - cur[0].get_center()[0])), run_time=0.8)
        rappel2 = VGroup(de(6, 0.45)).next_to(cur[1], RIGHT, buff=0.12)
        self.play(FadeIn(rappel2, scale=0.5), Flash(P(self.x_de(0.18), self.YE), color=JAUNE_TITRE), run_time=0.5)
        self.attendre_voix(marge=1.0)
        pc.clear_updaters()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.YE = -1.3  # l'échelle monte : la chute passe dessous
        self.titre_ecran("Le piège")
        self.au_mot("diviser dans le mauvais sens")
        bon = self.fraction(18, 100, 48, WHITE, color_num=JAUNE_TITRE, color_den=BLEU_CALCUL)
        bon.move_to(P(-4.2, 1.2))
        ok = self.coche(taille=0.3).next_to(bon, RIGHT, buff=0.35)
        fl = CurvedArrow(P(-3.0, 2.0), P(-0.6, 2.0), angle=-PI / 3, color=ROUGE_ERREUR, stroke_width=5)
        sens = self.t("mauvais sens", 30, ROUGE_ERREUR).next_to(fl, UP, buff=0.1)
        self.play(FadeIn(bon), Create(ok), run_time=0.5)
        self.play(Create(fl), FadeIn(sens), run_time=0.6)
        self.au_mot("100 sur 18")
        mal = self.fraction(100, 18, 48, ROUGE_ERREUR, color_num=BLEU_CALCUL, color_den=JAUNE_TITRE)
        mal[1].set_color(ROUGE_ERREUR)
        mal.move_to(P(0.6, 1.2))
        self.play(FadeIn(mal, shift=LEFT * 0.3), run_time=0.5)
        self.insister(mal, 0.3)
        ech = self.echelle(mots=False)
        self.au_mot("plus que 1")
        un = self.t("1", 48, JAUNE_TITRE).next_to(P(self.X1, self.YE), DOWN, buff=0.3)
        self.play(Create(ech), FadeIn(un, scale=0.5), run_time=0.6)
        cur = self.curseur(0.0, self.fraction(100, 18, 26, ROUGE_ERREUR), ROUGE_ERREUR)
        self.play(FadeIn(cur), run_time=0.2)
        self.play(cur.animate.shift(RIGHT * (self.x_de(1.2) - self.x_de(0.0))), run_time=1.0,
                  rate_func=rate_functions.ease_in_quad)
        hors = Cross(cur[0], stroke_color=ROUGE_ERREUR, stroke_width=6).scale(2.2)
        self.play(Create(hors), Create(self.barrer(mal)), run_time=0.4)
        self.au_mot("toujours entre 0 et 1")
        zero = self.t("0", 48, JAUNE_TITRE).next_to(P(self.X0, self.YE), DOWN, buff=0.3)
        self.play(FadeIn(zero, scale=0.5), Indicate(ech[0], color=WHITE, scale_factor=1.05), run_time=0.5)
        ch = self.chute("Une fréquence est toujours entre 0 et 1.", color=BLEU_CALCUL, font_size=36)
        self.play(Write(ch), run_time=0.9)
        self.attendre_voix(marge=1.2)
        del self.YE

    # ── 06 : défi ───────────────────────────────────────────────────────────

    # False = face (12 sur 20)
    FACES_20 = [True, False, False, True, False, True, False, False, True, False,
                False, True, False, True, False, False, True, False, True, False]

    def rangee_pieces(self, colorer):
        g = VGroup(*[piece(p if colorer else True, 0.24) for p in self.FACES_20])
        if not colorer:
            for c in g:
                c[0].set_fill(GRIS_ETEINT)
                c[1].set_opacity(0)
        g.arrange_in_grid(rows=2, cols=10, buff=0.08)
        return g.move_to(P(3.1, 1.75))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        pc = piece_qui_tourne(P(-5.3, 1.75), 0.6)
        self.au_mot("On lance une pièce")
        self.add(pc)
        self.au_mot("20 fois")
        vingt = self.ligne([("20", BLEU_CALCUL), ("lancers", WHITE)], 42, 0.2).move_to(P(-2.7, 1.75))
        grises = self.rangee_pieces(False)
        self.play(FadeIn(vingt, scale=0.6),
                  LaggedStart(*[FadeIn(c, scale=0.5) for c in grises], lag_ratio=0.05), run_time=0.8)
        self.au_mot("12 faces")
        vraies = self.rangee_pieces(True)
        tab, cases = tableau_coach(["face"], 2.0, 2.9, 0.8, 28)
        tab.move_to(P(-3.4, -0.1))
        n12 = self.t("12", 40, AMBRE_TEXTE).move_to(cases[0])
        self.play(*[Transform(a, b) for a, b in zip(grises, vraies)], FadeIn(tab), run_time=0.7)
        self.play(cases[0].animate.set_fill(AMBRE_FOND), FadeIn(n12, scale=0.5), run_time=0.4)
        self.au_mot("Quelle est la fréquence")
        q = self.ligne([("fréquence de", WHITE), ("face", FACE_C), ("?", WHITE)], 44, 0.2).move_to(P(2.7, -0.5))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)
        pc.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        pieces = self.rangee_pieces(True)
        tab, cases = tableau_coach(["face"], 2.0, 2.9, 0.8, 28)
        tab.move_to(P(-3.4, 0.6))
        cases[0].set_fill(AMBRE_FOND)
        n12 = self.t("12", 40, AMBRE_TEXTE).move_to(cases[0])
        vingt = self.ligne([("20", BLEU_CALCUL), ("lancers", WHITE)], 36, 0.2).next_to(tab, UP, buff=0.3)
        self.add(pieces, tab, n12, vingt)
        ech = self.echelle()
        self.play(Create(ech), run_time=0.5)
        self.au_mot("12 sur 20")
        nf = self.fraction(12, 20, 52, WHITE, color_num=FACE_C, color_den=BLEU_CALCUL).move_to(P(1.4, -0.1))
        self.play(TransformFromCopy(n12, nf[0]), Create(nf[1]), TransformFromCopy(vingt[0], nf[2]),
                  *[Indicate(c, color=WHITE) for c, p in zip(pieces, self.FACES_20) if not p], run_time=0.8)
        self.au_mot("0,6")
        e1 = self.ligne([("=", WHITE), ("0,6", VERT_OK)], 56, 0.25).next_to(nf, RIGHT, buff=0.3)
        self.play(FadeIn(e1, shift=LEFT * 0.2), run_time=0.4)
        cur = self.curseur(0.0, "0,6", VERT_OK)
        self.play(FadeIn(cur), run_time=0.2)
        self.play(cur.animate.shift(RIGHT * (self.x_de(0.6) - self.x_de(0.0))), run_time=0.9)
        self.insister(e1[1], 0.35)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        num = self.t("nombre de fois", 36, JAUNE_TITRE)
        den = self.t("nombre d'essais", 36, BLEU_CALCUL)
        larg = max(num.width, den.width) + 0.2
        frac = VGroup(num, Line(LEFT * larg / 2, RIGHT * larg / 2, stroke_width=4), den).arrange(DOWN, buff=0.12)
        l1 = VGroup(self.coche(), self.t("fréquence =", 38), frac).arrange(RIGHT, buff=0.3)
        l2 = VGroup(self.coche(), self.t("entre 0 et 1, comme une probabilité", 38)).arrange(RIGHT, buff=0.3)
        VGroup(l1, l2).arrange(DOWN, aligned_edge=LEFT, buff=0.7).move_to(P(-0.8, 0.6))
        self.au_mot("La fréquence, c'est")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), FadeIn(num), Create(frac[1]), run_time=0.6)
        self.au_mot("sur le nombre d'essais")
        self.play(FadeIn(den, shift=UP * 0.15), run_time=0.4)
        self.play(Create(l1[0]), run_time=0.4)
        self.au_mot("Elle est entre 0 et 1")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(l2[0]), run_time=0.4)
        self.au_mot("L'épisode 8")
        self.play(Write(self.chute("Épisode 8 : comparer ce qu'on observe à ce qu'on calcule",
                                   color=VERT_OK, font_size=34)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_frequence()
        self.ecran_ecritures()
        self.ecran_autre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
