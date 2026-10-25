# stats_cv_lire.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, épisode 31-cv-lire :
# LIRE UN NUAGE TRANSFORMÉ (micro du coach statT_cv_lire : « lire le nuage
# transformé et conjecturer une relation de linéarité »), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE (au-dessus de la verte du niveau : logarithme,
# relation exponentielle, facteur 10^a caché dans la pente — étoile 3 du coach).
# Short jumeau : stats_cv_lire_short.py (VERTE).
#
# ⭐ Décor et métier : le NUMÉRIQUE ; une INGÉNIEURE EN MICROÉLECTRONIQUE étudie
# la loi de Moore (problématique : reconnaître un modèle, prévoir une croissance).
# Centres d'intérêt : technologie-ia, sciences.
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : nombre de transistors des
# processeurs Intel (fiches techniques Intel, reprises par en.wikipedia.org
# « Transistor count », cours VLSI de Harvey Mudd, carleton.ca) : 4004 (1971) :
# 2 300 · 8086 (1978) : 29 000 · 80386 (1985) : 275 000 · Pentium (1993) :
# 3,1 millions · Pentium 4 (2000) : 42 millions · Core 2 Duo (2006) : 291 millions.
# ⭐ Calculs vérifiés en Python : x = années depuis 1970 (1, 8, 15, 23, 30, 36) ;
# z = log(y) = 3,36 · 4,46 · 5,44 · 6,49 · 7,62 · 8,46 ; moindres carrés du nuage
# (x ; z) : a = 0,14470, b = 3,24845 → z = 0,145x + 3,248 (au millième) ;
# 10^0,145 ≈ 1,396 ≈ 1,40 (+40 % par an) ; 2 × 0,145 = 0,29 ; 10^0,29 ≈ 1,950
# (≈ 2 : le doublement tous les deux ans de la loi de Moore ; log 2 / a ≈ 2,08 ans).
# ⭐ Figures du coach : `fonctionGraphique` (canvasNuagePoints : le nuage
# (x ; z = log y) et sa droite) et `tableau_donnees` (la ligne « z = log(y) »).
# ⛔ PAS D'ÉCART : chaque nombre au mot (les z non dits ne s'écrivent pas).
#
# Mapping micro → écrans : tpl_1 (nuage transformé aligné → relation de départ)
# → 03-04, question 05 · tpl_2 (le facteur 10^a caché dans la pente, le
# pourcentage) → 06-09, question 08, défi.
# Écrans : 00 garde · 01 l'ingénieure · 02 le nuage qui s'envole · 03 z = log(y) ·
# 04 ce que dit le nuage · 05 QUESTION · 06 la droite · 07 le facteur ·
# 08 QUESTION · 09 le piège · 10 défi · 10b correction · 11 ce que tu as appris ·
# 12 fin.
#
# Voix : manim/voix/stmg-stats-cv-lire.json (débit −7) ; marques :
# manim/scripts/stmg/stats_cv_lire_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_cv_lire.py StatsCvLireStmg -o eleveai-maths-stmg-stats-cv-lire --media_dir manim/scripts/stmg/media-stats-cv-lire-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/31-cv-lire/eleveai-maths-stmg-stats-cv-lire.mp4

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403

ANS = [1971, 1978, 1985, 1993, 2000, 2006]
XS = [a - 1970 for a in ANS]
TR = [2300, 29000, 275000, 3.1e6, 42e6, 291e6]
YM = [t / 1e6 for t in TR]                    # en millions
ZS = [math.log10(t) for t in TR]
A, B = 0.145, 3.248
TR_T = ["2 300", "29 000", "275 000", "3,1 M", "42 M", "291 M"]


def puce(h=1.5):
    """Une puce électronique dessinée : le boîtier, le cœur, les pattes."""
    corps = Square(1.2, fill_color="#1f2937", fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    coeur = Square(0.6, fill_color="#0ea5e9", fill_opacity=0.8, stroke_color=WHITE, stroke_width=2)
    pattes = VGroup()
    for k in range(4):
        for d in (UP, DOWN, LEFT, RIGHT):
            off = (-0.42 + 0.28 * k)
            pos = d * 0.72 + (RIGHT if d[1] != 0 else UP) * off
            pattes.add(Rectangle(width=0.08 if d[1] != 0 else 0.24, height=0.24 if d[1] != 0 else 0.08,
                                 fill_color=GREY_A, fill_opacity=1, stroke_width=0).move_to(pos))
    return VGroup(pattes, corps, coeur).scale_to_fit_height(h)


def puiss(base, exp, fs=40, couleur=WHITE):
    """« 10 puissance 0,145 » écrit avec l'exposant en haut (sans LaTeX)."""
    b = Text(base, font_size=fs, color=couleur)
    e = Text(exp, font_size=int(fs * 0.62), color=couleur).next_to(b, UR, buff=0.04).shift(DOWN * fs / 160)
    return VGroup(b, e)


class StatsCvLireBase(PaysageJ2):
    nom_voix = "stmg-stats-cv-lire"
    fichier_marques = "stats_cv_lire_marques.json"

    def nuage_y(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(XS, YM, 0, 40, 0, 300, pas_x=10, pas_y=50, fin_x=5, fin_y=25, largeur=5.6, hauteur=4.2,
                                 nom_x="Années depuis 1970 (x)", nom_y="Transistors (millions)", fs=24, centre=centre))

    def nuage_z(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(XS, ZS, 0, 40, 3, 9, pas_x=10, pas_y=1, fin_x=5, fin_y=0.5, largeur=5.6, hauteur=4.2,
                                 nom_x="Années depuis 1970 (x)", nom_y="z = log(y)", fs=24, centre=centre))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un nuage transformé", self.identite, self.ceinture)
        n = self.nuage_z(centre=P(-0.6, 0.0))
        n.scale(0.6).move_to(P(-0.6, 0.0))
        self.au_mot("Lire un nuage transformé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("est aligné")
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.5)
        self.play(Create(droite(n, A, B, BLEU_D, 4)), run_time=0.5)
        self.au_mot("la relation de départ")
        q = self.t("?", 72, AMBRE).next_to(n, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'ingénieure ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        pc = puce(1.6).move_to(P(-4.2, 1.4))
        metier = self.bloc(["Ingénieure en", "microélectronique"], 38, BLEU_CALCUL).move_to(P(-4.2, -0.5))
        self.au_mot("Une ingénieure en microélectronique")
        self.play(GrowFromCenter(pc), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("la loi de Moore")
        self.poser(self.t("La loi de Moore", 44, JAUNE_TITRE), 2.55)
        self.au_mot("le nombre de transistors")
        self.poser(self.bloc(["Le nombre de transistors", "d'un processeur Intel"], 36), 1.5)
        self.au_mot("2 300 en 1971")
        self.poser(self.ligne([("1971 :", WHITE), ("2 300", VIOLET_CLAIR)], 40), 0.3, "pop")
        self.au_mot("291 millions en 2006")
        self.poser(self.ligne([("2006 :", WHITE), ("291 millions", VIOLET_CLAIR)], 40), -0.5, "pop")
        self.play(Indicate(pc[2], color=AMBRE, scale_factor=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le nuage qui s'envole ──────────────────────────────────────────

    def ecran_nuage(self):
        self.ecran("02-nuage")
        n = self.nuage_y()
        self.play(FadeIn(n.fond), run_time=0.4)
        self.au_mot("En abscisse")
        self.poser(self.bloc(["Abscisse : années", "depuis 1970"], 34, ORANGE_V), 2.55)
        self.play(Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.2), run_time=0.4)
        self.au_mot("En ordonnée")
        self.poser(self.bloc(["Ordonnée : nombre", "de transistors"], 34, VIOLET_CLAIR), 1.35)
        self.play(Indicate(n.nom_y, color=VIOLET_H, scale_factor=1.2), run_time=0.4)
        self.au_mot("écrasé au sol")
        self.apparaitre_points(n, [0, 1, 2, 3], run_time=0.8)
        self.poser(self.t("écrasé au sol…", 36), 0.25)
        self.au_mot("puis s'envole")
        self.play(FadeIn(n.ronds[4], scale=3), run_time=0.3)
        self.play(FadeIn(n.ronds[5], scale=3), Flash(n.ronds[5], color=AMBRE), run_time=0.4)
        self.poser(self.t("… puis s'envole !", 36, AMBRE), -0.45)
        self.au_mot("il n'est pas aligné")
        self.poser(self.t("Pas aligné", 44, ROUGE_ERREUR), -1.35, "pop")
        self.attendre_voix()

    # ── 03 : z = log(y) ─────────────────────────────────────────────────────

    def ecran_log(self):
        self.ecran("03-log")
        tb = tableur([str(a) for a in ANS], [TR_T, [None] * 6], ["Transistors y", "z = log(y)"], coin="Année",
                     largeur_case=1.45, largeur_libelle=2.6, hauteur=0.85, fs=32)
        self.cadrer(tb, gauche=-6.4, droite=6.4, haut=3.3, bas=1.3)
        self.play(FadeIn(tb), run_time=0.4)
        self.au_mot("On pose z égale log de y")
        self.play(*tb.allumer_ligne(1), run_time=0.4)
        self.au_mot("Pour 2 300")
        self.play(Indicate(tb.cases[0][0][1], color=AMBRE, scale_factor=1.4), run_time=0.4)
        self.au_mot("3,36")
        self.play(remplir(tb, 1, 0, "3,36", "#15803d"), run_time=0.4)
        self.au_mot("Pour 291 millions")
        self.play(Indicate(tb.cases[0][5][1], color=AMBRE, scale_factor=1.4), run_time=0.4)
        self.au_mot("8,46")
        self.play(remplir(tb, 1, 5, "8,46", "#15803d"), *tb.eteindre(), run_time=0.4)
        self.au_mot("Avec z en ordonnée")
        n = self.cadrer(Nuage(XS, ZS, 0, 40, 3, 9, pas_x=10, pas_y=1, fin_x=5, fin_y=0.5, largeur=5.2, hauteur=2.6,
                              nom_x="Années depuis 1970 (x)", nom_y="z = log(y)", fs=22),
                        gauche=-6.4, droite=1.2, haut=0.9, bas=-3.5)
        self.play(FadeIn(n.fond), run_time=0.3)
        self.apparaitre_points(n, run_time=0.8)
        self.au_mot("presque aligné")
        self.play(Create(droite(n, A, B, BLEU_D, 4)), run_time=0.5)
        ok = self.t("Presque aligné !", 46, VERT_OK).move_to(P(3.5, -0.8))
        self.play(FadeIn(ok, scale=0.6), run_time=0.4)
        self.attendre_voix()

    # ── 04 : ce que dit le nuage ────────────────────────────────────────────

    def ecran_sens(self):
        self.ecran("04-sens")
        n = self.nuage_z()
        self.add(n.fond, n.ronds, droite(n, A, B))
        self.au_mot("Lire ce nuage")
        self.titre_col("Ce que dit le nuage", y=2.75, fs=42)
        self.au_mot("log de y est une fonction affine")
        self.poser(self.ligne([("log(y)", VERT_OK), ("est affine en x", WHITE)], 38), 1.75)
        self.au_mot("Donc y, lui, n'est pas affine")
        self.poser(self.ligne([("y", ROUGE_ERREUR), ("n'est PAS affine", WHITE)], 38), 0.95)
        self.au_mot("c'est une exponentielle")
        e = self.poser(self.ligne([("y", AMBRE), ("est une exponentielle", AMBRE)], 40), 0.1, "pop")
        self.insister(e, 1.08, 0.3)
        self.au_mot("multiplié par le même nombre")
        barres = VGroup(*[Rectangle(width=0.4, height=0.2 * 1.6 ** k, fill_color=BLEU_CALCUL, fill_opacity=1,
                                    stroke_width=0) for k in range(5)]).arrange(RIGHT, buff=0.12, aligned_edge=DOWN)
        fl = VGroup(*[self.t("×", 26, AMBRE).move_to((barres[k].get_top() + barres[k + 1].get_top()) / 2 + UP * 0.25)
                      for k in range(4)])
        g = VGroup(self.bloc(["chaque année :", "multiplié par", "le même nombre"], 32), VGroup(barres, fl)).arrange(RIGHT, buff=0.4)
        self.poser(g, -1.3)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.2), FadeIn(fl), run_time=1.0)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage_z()
        fig = VGroup(n.fond, n.ronds, droite(n, A, B))
        self.ecran_question("05-question", "05b-reponse", ["Le nuage (x ; log y) est aligné.", "Que conjecturer ?"],
                            ["y est affine en x", "y : × le même nombre", "y = a/x + b"], 1,
                            ["C'est log(y) qui est affine,", "pas y : la relation de", "départ est exponentielle."],
                            figure=fig, mot_q="Le nuage x")

    # ── 06 : la droite ──────────────────────────────────────────────────────

    def ecran_droite(self):
        self.ecran("06-droite")
        n = self.nuage_z()
        self.add(n.fond, n.ronds)
        self.au_mot("La droite des moindres carrés")
        d = droite(n, A, B)
        self.play(Create(d), run_time=0.7)
        self.au_mot("0,145 x plus 3,248")
        eq = self.ligne([("z =", WHITE), ("0,145x + 3,248", BLEU_CLAIR)], 42)
        self.poser(eq, 2.5, "pop")
        self.au_mot("arrondis au millième")
        self.poser(self.t("coefficients arrondis au millième", 28, GREY_B), 1.85)
        self.au_mot("Quand x augmente de 1")
        x1, x2 = 20, 21
        h1 = Line(n.p(x1, A * x1 + B), n.p(x2, A * x1 + B), color=ORANGE_V, stroke_width=9)
        v1 = Line(n.p(x2, A * x1 + B), n.p(x2, A * x2 + B), color=VERT_OK, stroke_width=9)
        anneau = Circle(radius=0.32, color=AMBRE, stroke_width=5).move_to(VGroup(h1, v1))
        # la LOUPE : le même triangle, agrandi, dans la colonne de droite
        o = P(1.6, -1.15)
        H = Line(o, o + RIGHT * 2.6, color=ORANGE_V, stroke_width=10)
        V = Line(o + RIGHT * 2.6, o + RIGHT * 2.6 + UP * 1.5, color=VERT_OK, stroke_width=10)
        D = Line(o + LEFT * 0.4 + DOWN * 0.23, o + RIGHT * 3.0 + UP * 1.73, color=BLEU_D, stroke_width=7)
        lien = DashedLine(anneau.get_right(), o + LEFT * 0.45, color=AMBRE, stroke_width=3)
        lx = self.ligne([("x", ORANGE_V), ("+ 1", ORANGE_V)], 42).next_to(H, DOWN, buff=0.2)
        lz = self.ligne([("z", VERT_OK), ("+ 0,145", VERT_OK)], 36).next_to(V, RIGHT, buff=0.15)
        if lz.get_right()[0] > 6.4:
            lz.scale_to_fit_width(6.4 - lz.get_left()[0])
        self.play(Create(anneau), Create(h1), run_time=0.4)
        self.play(Create(lien), Create(D), Create(H), run_time=0.5)
        self.play(FadeIn(lx, shift=UP * 0.15), run_time=0.35)
        self.au_mot("z augmente de 0,145")
        self.play(Create(v1), Create(V), run_time=0.4)
        self.play(FadeIn(lz, scale=0.7), run_time=0.35)
        self.insister(lz, 1.1, 0.3)
        self.attendre_voix()

    # ── 07 : le facteur ─────────────────────────────────────────────────────

    def ecran_facteur(self):
        self.ecran("07-facteur")
        self.au_mot("Et y")
        self.play(Write(self.t("Et y ?", 50, JAUNE_TITRE).to_edge(UP, buff=0.5)), run_time=0.5)
        self.au_mot("10 puissance 0,145")
        p = VGroup(self.t("multiplié par", 44), puiss("10", "0,145", 64, AMBRE)).arrange(RIGHT, buff=0.35).move_to(P(0, 1.3))
        self.play(FadeIn(p, shift=UP * 0.2), run_time=0.5)
        self.au_mot("environ 1,40")
        r = self.ligne([("≈", WHITE), ("1,40", VERT_OK)], 64).next_to(p, RIGHT, buff=0.3)
        g = VGroup(p, r)
        if g.width > 12:
            g.scale_to_fit_width(12)
        g.move_to(P(0, 1.3))
        self.play(FadeIn(r, scale=0.6), run_time=0.4)
        self.au_mot("Chaque année")
        barres = VGroup(*[Rectangle(width=0.7, height=0.3 * 1.4 ** k, fill_color=BLEU_CALCUL, fill_opacity=1,
                                    stroke_width=0) for k in range(6)]).arrange(RIGHT, buff=0.35, aligned_edge=DOWN)
        barres.move_to(P(-2.8, -1.3)).align_to(P(0, -2.6), DOWN)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.2), run_time=1.0)
        self.au_mot("40 %")
        t = self.t("+ 40 % par an !", 52, VERT_OK).move_to(P(3.2, -0.9))
        self.play(FadeIn(t, scale=0.6), run_time=0.4)
        self.insister(t, 1.1, 0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage_z()
        fig = VGroup(n.fond, n.ronds, droite(n, A, B))
        eq = self.ligne([("z =", WHITE), ("0,145x + 3,248", BLEU_CLAIR)], 34).next_to(n.carte, DOWN, buff=0.2)
        if eq.get_bottom()[1] < -3.5:
            fig.shift(UP * (-3.5 - eq.get_bottom()[1]))
            eq.shift(UP * (-3.5 - eq.get_bottom()[1]))
        self.ecran_question("08-question", "08b-reponse", ["Pente 0,145 : y est multiplié", "chaque année par…"],
                            ["0,145", "1,145", "1,40"], 2, ["10 puissance 0,145 ≈ 1,40.", "A et B confondent la pente", "de z et le facteur de y."],
                            figure=VGroup(fig, eq), mot_q="Avec cette pente")

    # ── 09 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("09-piege")
        self.au_mot("Le piège")
        tit = VGroup(self.t("Le piège :", 50, ROUGE_ERREUR),
                     self.t("lire la pente de z comme une hausse de y", 40, ROUGE_ERREUR)).arrange(DOWN, buff=0.15)
        tit.to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("0,145, ce n'est pas")
        f = self.ligne([("0,145", BLEU_CLAIR), ("≠", ROUGE_ERREUR), ("+ 14,5 %", ROUGE_ERREUR)], 60).move_to(P(0, 0.4))
        self.play(FadeIn(f, scale=0.7), run_time=0.5)
        self.play(Create(Line(f[2].get_left(), f[2].get_right(), color=ROUGE_ERREUR, stroke_width=7)), run_time=0.4)
        self.au_mot("Il faut d'abord calculer")
        g = VGroup(self.t("d'abord :", 44), puiss("10", "pente", 60, VERT_OK)).arrange(RIGHT, buff=0.35).move_to(P(0, -1.3))
        self.play(FadeIn(g, shift=UP * 0.2), run_time=0.5)
        self.insister(g, 1.1, 0.3)
        self.attendre_voix()

    # ── 10 : défi + correction ──────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        n = self.nuage_z()
        self.add(n.fond, n.ronds, droite(n, A, B))
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer !", y=2.75, fs=48)
        self.poser(self.ligne([("z =", WHITE), ("0,145x + 3,248", BLEU_CLAIR)], 34), 1.95)
        self.au_mot("Un : en 2 ans")
        self.poser(self.bloc(["1. En 2 ans, de combien", "z augmente-t-il ?"], 36), 1.0)
        self.au_mot("Deux : par combien")
        self.poser(self.bloc(["2. Par combien y est-il", "alors multiplié ?"], 36), -0.15)
        self.pause_defi(y=-1.25)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre_col("Correction", y=2.75, fs=48)
        n = self.nuage_z()
        self.add(n.fond, n.ronds, droite(n, A, B))
        self.au_mot("Un : 2 fois 0,145")
        self.poser(self.ligne([("1.", AMBRE), ("2 × 0,145 =", WHITE), ("0,29", VERT_OK)], 38), 1.85)
        self.au_mot("Deux : 10 puissance 0,29")
        self.poser(VGroup(self.t("2.", 38, AMBRE), puiss("10", "0,29", 44)).arrange(RIGHT, buff=0.25), 1.0)
        self.au_mot("environ 1,95")
        self.poser(self.ligne([("≈ 1,95", VERT_OK), ("≈ 2", VERT_OK)], 40), 0.25, "pop")
        self.au_mot("double environ tous les deux ans")
        barres = VGroup(*[Rectangle(width=0.35, height=0.15 * 2 ** k, fill_color=BLEU_CALCUL, fill_opacity=1,
                                    stroke_width=0) for k in range(4)]).arrange(RIGHT, buff=0.15, aligned_edge=DOWN)
        lab = self.bloc(["×2 tous les", "deux ans"], 34, AMBRE)
        self.poser(VGroup(barres, lab).arrange(RIGHT, buff=0.35), -0.85)
        self.au_mot("c'est la loi de Moore")
        lm = self.t("La loi de Moore !", 40, JAUNE_TITRE)
        self.poser(lm, -1.9, "pop")
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        n = self.nuage_z()
        d = droite(n, A, B)
        self.add(n.fond, n.ronds, d)
        lignes = self.finale_colonne(figure=VGroup(n, d), textes=[("Nuage transformé aligné :", "la NOUVELLE variable", "est affine."),
                                                                  ("z = log(y) aligné :", "relation exponentielle."),
                                                                  ("z augmente de a :", "y est multiplié", "par 10 puissance a.")])
        self.au_mot("Si le nuage transformé est aligné")
        self.montrer_ligne(lignes[0], Indicate(d, color=BLEU_CLAIR))
        self.au_mot("Avec z égale log de y")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et si z augmente de a")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_nuage()
        self.ecran_log()
        self.ecran_sens()
        self.ecran_question1()
        self.ecran_droite()
        self.ecran_facteur()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsCvLireStmg(StatsCvLireBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
