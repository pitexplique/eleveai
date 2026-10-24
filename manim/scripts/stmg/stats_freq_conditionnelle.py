# stats_freq_conditionnelle.py
# EleveAI — Maths STMG — série « Statistiques », épisode 10 « FRÉQUENCE
# CONDITIONNELLE » (micro du coach don_freq_conditionnelle : « Calculer une
# fréquence conditionnelle », notion donnees_frequences). AVEC VOIX. Paysage.
# CEINTURE VERTE : la paysage complète du niveau (« parmi » → dénominateur, le
# sens ligne / colonne, comparer des fréquences et pas des effectifs).
# Short jumeau : stats_freq_conditionnelle_short.py (ORANGE).
#
# ⭐ Décor et métier : le SPORT ; un ANALYSTE DE DONNÉES de la fédération de
# handball (problématique : comparer deux sports de tailles très différentes).
# Centres d'intérêt : sport, corps-sante.
# ⭐ DONNÉES RÉELLES (lues le 24/10/2026) : Insee, « Licences sportives et autres
# titres de participation par fédération agréée en 2025 » (source INJEP-MEDES),
# https://www.insee.fr/fr/statistiques/2408252 : football 2 372,1 milliers de
# licences annuelles, 10,5 % féminines ; handball 602,2 milliers, 39,8 % ;
# rugby 419,5 milliers, 14,0 % (short). Cases déduites (milliers, à l'unité) :
# Football 249 | 2 123 | 2 372 ; Handball 240 | 362 | 602 ; Total 489 | 2 485
# | 2 974. (240 ÷ 602 = 39,9 % sur les milliers arrondis ; l'Insee donne 39,8 %.)
# Fréquences : 249/2 372 = 10,5 % · 240/602 = 39,9 % · 249/489 = 50,9 % ·
# 362/2 485 = 14,6 % · 2 123/2 372 = 89,5 % · 240/489 = 49,1 % ; leurres :
# 240/2 974 = 8,1 % (total), 240/489 = 49,1 % (l'autre sens).
#
# Mapping micro → écrans (banque stmg donnees-croisees) : tpl_1 (« parmi » →
# dénominateur, ligne ou colonne) → 04, question 05, 07, question 08, défi ·
# tpl_2 (comparer deux groupes : le plus gros effectif n'a pas le plus fort
# taux) → 03 piège, 06 verdict.
# Écrans : 00 garde · 01 l'analyste · 02 le tableau · 03 le piège des effectifs
# · 04 la méthode (249 ÷ 2 372) · 05 QUESTION (handball) · 06 verdict · 07 le
# sens (249 ÷ 489) · 08 QUESTION (quel dénominateur ?) · 09 défi · 09b
# correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/stmg-stats-freq-conditionnelle.json (débit −7) ; marques :
# manim/scripts/stmg/stats_freq_conditionnelle_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_freq_conditionnelle.py StatsFreqConditionnelleStmg -o eleveai-maths-stmg-stats-freq-conditionnelle --media_dir manim/scripts/stmg/media-stats-freq-conditionnelle-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/10-freq-conditionnelle/eleveai-maths-stmg-stats-freq-conditionnelle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403

COLONNES = ["Femmes", "Hommes", "Total"]
LIGNES = ["Football", "Handball", "Total"]
VALS = [["249", "2 123", "2 372"], ["240", "362", "602"], ["489", "2 485", "2 974"]]
TITRE = "Licences 2025 (en milliers)"


def ballon_foot(r=0.6):
    """Un ballon de football : blanc, un pentagone noir au centre et cinq autour."""
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_D, stroke_width=3)
    p = RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.32)
    autour = VGroup(*[RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.2)
                      .move_to(b.get_center() + r * 0.78 * np.array([np.cos(a), np.sin(a), 0]))
                      for a in np.linspace(PI / 2, PI / 2 + TAU, 5, endpoint=False)])
    return VGroup(b, p, autour)


def ballon_hand(r=0.5):
    """Un ballon de handball : bleu, deux coutures."""
    b = Circle(radius=r, fill_color="#2563eb", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    c1 = ArcBetweenPoints(b.get_left() + UP * 0.2 * r, b.get_right() + UP * 0.2 * r, angle=-PI / 3,
                          color=ORANGE_RETENUE, stroke_width=5)
    c2 = ArcBetweenPoints(b.get_top(), b.get_bottom(), angle=PI / 3, color=WHITE, stroke_width=4)
    return VGroup(b, c1, c2)


class StatsFreqConditionnelleBase(PaysageI2):
    nom_voix = "stmg-stats-freq-conditionnelle"
    fichier_marques = "stats_freq_conditionnelle_marques.json"

    def tableau(self, trous=(), centre=None, **kw):
        opts = dict(titre=TITRE, largeur_case=1.7, largeur_libelle=2.0, hauteur=0.86, fs=32)
        opts.update(kw)
        t = croise_i2(COLONNES, LIGNES, VALS, trous=trous, **opts)
        return self.placer_tab(t) if centre is None else t.move_to(centre)

    def tab_pret(self, trous=()):
        t = self.tableau(trous)
        self.add(t)
        return t

    def den_case(self, t, r, c):
        return t.case(r, c).animate.set_fill(REF).set_stroke(C_DEN, width=8)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fréquence conditionnelle", self.identite, self.ceinture)
        bf = ballon_foot(0.55).move_to(P(-3.0, 0.15))
        bh = ballon_hand(0.5).move_to(P(-1.5, 0.15))
        f = frac("?", "parmi qui ?", 54).move_to(P(1.6, 0.15))
        self.au_mot("Fréquence conditionnelle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(bf), FadeIn(bh), run_time=0.7)
        self.au_mot("Parmi qui")
        self.play(FadeIn(f, scale=0.8), run_time=0.5)
        self.insister(f.den, 1.25, 0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'analyste ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        bf = ballon_foot(0.8).move_to(P(-5.2, 1.3))
        bh = ballon_hand(0.55).move_to(P(-5.2, -0.9))
        self.au_mot("le football compte")
        l1 = self.t("plus de 2 millions", 38).next_to(bf, RIGHT, buff=0.4)
        self.play(FadeIn(bf, shift=RIGHT * 0.3), run_time=0.4)
        self.au_mot("plus de 2 millions")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("le handball")
        l2 = self.t("environ 600 000", 38).next_to(bh, RIGHT, buff=0.4).align_to(l1, LEFT)
        self.play(FadeIn(bh, shift=RIGHT * 0.3), run_time=0.4)
        self.au_mot("environ 600 000")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Un analyste de données")
        metier = self.col(self.t("Analyste de données", 42, BLEU_CALCUL), 2.7, xl=1.6)
        lieu = self.col(self.t("fédération de handball", 32), 2.0, xl=1.6)
        self.play(FadeIn(metier, shift=UP * 0.2), FadeIn(lieu), run_time=0.5)
        self.au_mot("quel sport attire")
        q = self.col(self.bloc(["Quel sport attire", "le plus les filles", "et les femmes ?"], 36, AMBRE), 0.2, xl=1.6)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        t = self.tableau()
        self.au_mot("Voici son tableau")
        self.play(FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Au football : 249")
        self.play(*allumer(t, 0, 0), run_time=0.4)
        self.au_mot("sur 2 372")
        self.play(*allumer(t, 0, 2), run_time=0.4)
        self.au_mot("Au handball : 240")
        self.play(*allumer(t, 1, 0), run_time=0.4)
        self.au_mot("sur 602")
        self.play(*allumer(t, 1, 2), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le piège des effectifs ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-piege")
        t = self.tab_pret()
        self.au_mot("le football a plus de licenciées")
        self.play(*allumer(t, 0, 0), *allumer(t, 1, 0), run_time=0.4)
        self.au_mot("249 contre 240")
        c = self.calc(self.ligne([("249", AMBRE), (">", WHITE), ("240", AMBRE)], 50), 2.4)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("plus féminin")
        q = self.calc(self.t("donc plus féminin ?", 38, ORANGE_RETENUE), 1.5)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Attention")
        x = croix(q, sw=6)
        self.play(Create(x), run_time=0.4)
        self.au_mot("la même taille")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*allumer(t, 0, 2), *allumer(t, 1, 2), run_time=0.4)
        tailles = self.calc(self.ligne([("2 372", C_DEN), ("≠", WHITE), ("602", C_DEN)], 46), 0.55)
        self.play(FadeIn(tailles, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(tailles, 1.15, 0.25)
        self.au_mot("Il faut comparer des parts")
        bon = self.calc(self.bloc(["Comparer des PARTS,", "pas des effectifs"], 40, VERT_OK), -0.75)
        self.play(FadeIn(bon, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        t = self.tab_pret()
        self.au_mot("Parmi les licences de football")
        q = self.calc(VGroup(self.ligne([("parmi", AMBRE), ("le football,", WHITE)], 38),
                             self.t("part de femmes ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.65)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Le mot « parmi »")
        self.play(Indicate(q[0][0], color=AMBRE, scale_factor=1.4), run_time=0.6)
        self.au_mot("la ligne football")
        self.play(*ref_ligne(t, 0), run_time=0.5)
        ref = self.calc(self.ligne([("référence :", C_DEN), ("la ligne", WHITE)], 36), 1.65)
        self.play(FadeIn(ref, shift=RIGHT * 0.2), run_time=0.4)
        f = frac("249", "2 372", 50)
        ligne = egal(f, ("≈", WHITE), ("10,5 %", VERT_OK), fs=48)
        self.calc(ligne, 0.3)
        self.au_mot("C'est le dénominateur")
        self.play(self.den_case(t, 0, 2), Create(f.barre), FadeIn(f.den, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Le numérateur")
        self.play(*num_case(t, 0, 0), FadeIn(f.num, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("égale 10,5 %")
        self.play(FadeIn(ligne[1:], scale=0.7), run_time=0.4)
        self.insister(ligne[2], 1.3, 0.25)
        self.au_mot("C'est une fréquence conditionnelle")
        nom = self.calc(self.bloc(["fréquence", "conditionnelle"], 38, JAUNE_TITRE), -1.15)
        self.play(FadeIn(nom, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (handball) ──────────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret()

        def montrer():
            self.play(*ref_ligne(t, 1), run_time=0.3)
            self.play(*num_case(t, 1, 0), self.den_case(t, 1, 2), run_time=0.4)

        self.question_pause("05-question", "05b-reponse", ["Parmi les licences de", "handball, part de femmes ?"],
                            ["49,1 %", "39,9 %", "8,1 %"], 1, ["240 ÷ 602 ≈ 39,9 %", "A : ÷ 489 ; C : ÷ 2 974"],
                            x0=self.XL + 0.3, largeur=4.9, ys=(1.0, 0.1, -0.8), geste=montrer)

    # ── 06 : verdict ────────────────────────────────────────────────────────

    def ecran_verdict(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-verdict")
        titre = self.t("Verdict", 50, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(titre), run_time=0.5)
        L = 9.0  # 100 % = 9 unités
        x0 = -4.2
        bf = ballon_foot(0.4).move_to(P(x0 - 0.9, 1.2))
        bh = ballon_hand(0.36).move_to(P(x0 - 0.9, -0.6))
        cadres = VGroup(*[Rectangle(width=L, height=0.8, stroke_color=GREY_B, stroke_width=2).move_to(P(x0 + L / 2, y))
                          for y in (1.2, -0.6)])
        self.play(FadeIn(bf), FadeIn(bh), Create(cadres), run_time=0.5)
        barres = []
        for k, (p, txt, y, mot) in enumerate([(0.105, "10,5 %", 1.2, "10,5 % de femmes"),
                                              (0.399, "39,9 %", -0.6, "39,9 % au handball")]):
            self.au_mot(mot)
            b = Rectangle(width=L * p, height=0.8, fill_color="#f472b6", fill_opacity=1, stroke_width=0)
            b.move_to(P(x0, y), aligned_edge=LEFT)
            v = self.t(txt, 42, "#f9a8d4").next_to(b, RIGHT, buff=0.25)
            self.play(GrowFromEdge(b, LEFT), FadeIn(v, shift=RIGHT * 0.2), run_time=0.6)
            barres.append((b, v))
        self.au_mot("presque quatre fois")
        r = self.t("presque 4 fois plus féminin !", 44, VERT_OK).move_to(P(-0.4, -2.2))
        self.play(FadeIn(r, scale=0.7), run_time=0.5)
        self.insister(barres[1][1], 1.3, 0.25)
        self.au_mot("moins de licenciées")
        n = self.t("(avec 240 licenciées, contre 249)", 30, GREY_A).next_to(r, DOWN, buff=0.2)
        self.play(FadeIn(n, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le sens ────────────────────────────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-sens")
        t = self.tab_pret()
        self.au_mot("Attention au sens")
        tit = self.calc(self.t("Attention au sens !", 44, ORANGE_RETENUE), 2.8)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Parmi les femmes")
        q = self.calc(VGroup(self.ligne([("parmi", AMBRE), ("les femmes,", WHITE)], 38),
                             self.t("part du foot ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.85)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("la colonne femmes")
        self.play(*ref_colonne(t, 0), run_time=0.5)
        f = frac("249", "489", 50)
        ligne = egal(f, ("≈", WHITE), ("50,9 %", VERT_OK), fs=48)
        self.calc(ligne, 0.35)
        self.play(self.den_case(t, 2, 0), Create(f.barre), FadeIn(f.den, shift=UP * 0.2), run_time=0.5)
        self.au_mot("249 divisé par 489")
        self.play(*num_case(t, 0, 0), FadeIn(f.num, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("égale 50,9 %")
        self.play(FadeIn(ligne[1:], scale=0.7), run_time=0.4)
        self.au_mot("Même case")
        m = self.calc(self.bloc(["même case,", "autre dénominateur,", "autre phrase !"], 36, JAUNE_TITRE), -1.2)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (quel dénominateur ?) ───────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret()

        def montrer():
            self.play(*ref_colonne(t, 1), run_time=0.3)
            self.play(*num_case(t, 1, 1), self.den_case(t, 2, 1), run_time=0.4)

        self.question_pause("08-question", "08b-reponse", ["Parmi les hommes, part du", "handball : dénominateur ?"],
                            ["602", "2 485", "2 974"], 1, ["362 ÷ 2 485 ≈ 14,6 %", "A : la ligne (l'autre sens)"],
                            x0=self.XL + 0.3, largeur=4.9, ys=(1.0, 0.1, -0.8), geste=montrer)

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.tab_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : parmi")
        q1 = self.col(self.bloc(["1. Parmi le football,", "part d'hommes ?"], 38), 1.7)
        q1[0][:2].set_color(AMBRE)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : parmi")
        q2 = self.col(self.bloc(["2. Parmi les femmes,", "part du handball ?"], 38), 0.25)
        q2[0][:2].set_color(AMBRE)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.pause_defi(-1.15)), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        t = self.tab_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("2 123 divisé par 2 372")
        f1 = frac("2 123", "2 372", 40)
        l1 = egal(f1, ("≈", WHITE), ("89,5 %", VERT_OK), fs=40)
        g1 = self.calc(VGroup(self.t("1.", 40, AMBRE), l1).arrange(RIGHT, buff=0.25), 1.6)
        self.play(*ref_ligne(t, 0), run_time=0.3)
        self.play(*num_case(t, 0, 1), self.den_case(t, 0, 2), FadeIn(g1[0]), FadeIn(f1), run_time=0.5)
        self.au_mot("égale 89,5 %")
        self.play(FadeIn(l1[1:], scale=0.7), run_time=0.4)
        self.au_mot("89,5 plus 10,5")
        k = self.calc(self.ligne([("89,5 + 10,5 = 100", WHITE)], 34), 0.55)
        ok = self.coche(VERT_OK, 0.26).next_to(k, RIGHT, buff=0.25)
        self.play(FadeIn(k, shift=RIGHT * 0.2), Create(ok), run_time=0.5)
        self.au_mot("Deux : 240")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*ref_colonne(t, 0), run_time=0.3)
        f2 = frac("240", "489", 40)
        l2 = egal(f2, ("≈", WHITE), ("49,1 %", VERT_OK), fs=40)
        g2 = self.calc(VGroup(self.t("2.", 40, AMBRE), l2).arrange(RIGHT, buff=0.25), -0.6)
        self.play(*num_case(t, 1, 0), self.den_case(t, 2, 0), FadeIn(g2[0]), FadeIn(f2), run_time=0.5)
        self.au_mot("égale 49,1 %")
        self.play(FadeIn(l2[1:], scale=0.7), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        t = self.placer_tab(self.tableau(), haut=2.7)
        self.add(t)
        lignes = self.finale([("conditionnelle :", "dans une sous-population"),
                              ("« parmi … »", "= le dénominateur"),
                              ("Comparer des parts,", "pas des effectifs")], [1.75, 0.2, -1.35], fs=38)
        self.au_mot("Une fréquence conditionnelle")
        self.montrer_ligne(lignes[0], *ref_ligne(t, 1))
        self.au_mot("Ce qui suit « parmi »")
        self.montrer_ligne(lignes[1], self.den_case(t, 1, 2))
        self.au_mot("Et pour comparer")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_verdict()
        self.ecran_sens()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsFreqConditionnelleStmg(StatsFreqConditionnelleBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
