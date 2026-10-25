# stats_mc_comparer.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, épisode 29-mc-comparer :
# COMPARER DEUX DROITES D'AJUSTEMENT (micro du coach statT_mc_comparer :
# « comparer deux droites d'ajustement à l'aide de la somme des carrés des
# écarts »), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du
# niveau : deux sommes au tableur, la règle, le point aberrant, défi).
# Short jumeau : stats_mc_comparer_short.py (ORANGE).
#
# ⭐ Décor et métier : le TOURISME et le TRANSPORT AÉRIEN ; une ANALYSTE DU TRAFIC
# AÉRIEN prépare l'avenir des aéroports de Paris (problématique : choisir un
# modèle, juger un relevé exceptionnel). Centres d'intérêt : transports.
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : passagers de Paris Aéroport
# (Paris-CDG + Paris-Orly), communiqués du Groupe ADP (via air-journal.fr,
# tourmag.com, AMF/dila.gouv.fr), en millions : 2015 : 95,4 · 2016 : 97,2 ·
# 2017 : 101,5 · 2018 : 105,3 · 2019 : 108,0 · 2020 : 33,1 (−69,4 %, Covid-19).
# ⭐ Calculs vérifiés en Python : x = 1..5 ; moindres carrés y = 3,33x + 91,49,
# arrondie D1 : y = 3,3x + 91,5 → écarts 0,6 ; −0,9 ; 0,1 ; 0,6 ; 0 → carrés
# 0,36 ; 0,81 ; 0,01 ; 0,36 ; 0 → somme 1,54 · D2 (au jugé) : y = 3,2x + 92,1 →
# écarts 0,1 ; −1,3 ; −0,2 ; 0,4 ; −0,1 → carrés 0,01 ; 1,69 ; 0,04 ; 0,16 ;
# 0,01 → somme 1,91 · 2020 (x = 6) : D1 prévoit 111,3 ; écart −78,2 ; carré
# 6 115,24 ; somme 6 116,78 · D3 : y = 3x + 92 → écarts 0,4 ; −0,8 ; 0,5 ; 1,3 ;
# 1 → carrés 0,16 ; 0,64 ; 0,25 ; 1,69 ; 1 → somme 3,74.
# ⭐ Figures du coach : `fonctionGraphique` (Nuage, droites `affine`) et
# `tableau_donnees` (le tableur des écarts). ⛔ PAS D'ÉCART : chaque nombre au mot.
#
# Mapping micro → écrans : tpl_1 et tpl_3 (deux droites, la plus petite somme ;
# « passer par des points ne garantit rien ») → 02-06, question 05, défi ·
# tpl_2 (le point aberrant) → 07-09, question 08.
# Écrans : 00 garde · 01 l'analyste · 02 deux droites · 03 la somme de D1 ·
# 04 la somme de D2 · 05 QUESTION · 06 la règle · 07 2020 · 08 QUESTION ·
# 09 le piège · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/stmg-stats-mc-comparer.json (débit −7) ; marques :
# manim/scripts/stmg/stats_mc_comparer_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_mc_comparer.py StatsMcComparerStmg -o eleveai-maths-stmg-stats-mc-comparer --media_dir manim/scripts/stmg/media-stats-mc-comparer-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/29-mc-comparer/eleveai-maths-stmg-stats-mc-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403

XS = [1, 2, 3, 4, 5]
YS = [95.4, 97.2, 101.5, 105.3, 108.0]
D1 = (3.3, 91.5)
D2 = (3.2, 92.1)
D3 = (3.0, 92.0)
E1, C1 = ["0,6", "−0,9", "0,1", "0,6", "0"], ["0,36", "0,81", "0,01", "0,36", "0"]
E2, C2 = ["0,1", "−1,3", "−0,2", "0,4", "−0,1"], ["0,01", "1,69", "0,04", "0,16", "0,01"]
E3, C3 = ["0,4", "−0,8", "0,5", "1,3", "1"], ["0,16", "0,64", "0,25", "1,69", "1"]
Y20 = 33.1
ANNEES = ["2015", "2016", "2017", "2018", "2019"]


def avion(h=1.0):
    """Un avion de ligne dessiné, vu de dessus."""
    fus = RoundedRectangle(width=0.32, height=2.0, corner_radius=0.16, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    ailes = Polygon(P(-1.1, -0.05), P(0, 0.45), P(1.1, -0.05), P(1.1, -0.25), P(0, 0.05), P(-1.1, -0.25),
                    fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    queue = Polygon(P(-0.45, -0.95), P(0, -0.7), P(0.45, -0.95), P(0.45, -1.05), P(-0.45, -1.05),
                    fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    return VGroup(ailes, queue, fus).scale_to_fit_height(h).rotate(-PI / 4)


class StatsMcComparerBase(PaysageJ2):
    nom_voix = "stmg-stats-mc-comparer"
    fichier_marques = "stats_mc_comparer_marques.json"

    def nuage(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(XS, YS, 0, 6, 90, 115, pas_x=1, pas_y=5, fin_x=1, fin_y=1, largeur=5.6, hauteur=4.2,
                                 nom_x="Rang de l'année", nom_y="Passagers (millions)", fs=24, centre=centre))

    def nuage20(self, centre=P(-3.4, -0.25)):
        """Le nuage avec 2020 : l'axe des y descend jusqu'à 0."""
        return self.cadrer(Nuage(XS + [6], YS + [Y20], 0, 7, 0, 120, pas_x=1, pas_y=20, fin_x=1, fin_y=10, largeur=5.6,
                                 hauteur=4.4, nom_x="Rang de l'année", nom_y="Passagers (millions)", fs=24,
                                 centre=centre))

    def table(self, nom, ecarts=None, carres_=None):
        vide = [None] * 5
        tb = tableur(["1", "2", "3", "4", "5"], [[str(y).replace(".", ",") if y != 108.0 else "108" for y in YS],
                                                 ecarts or vide, carres_ or vide],
                     ["Observé", f"Écart {nom}", f"Carré {nom}"], coin="x", largeur_case=1.3, largeur_libelle=2.2,
                     hauteur=0.85, fs=34)
        return self.cadrer(tb, droite=0.55, haut=3.3, bas=-0.4)

    def somme(self, tb, nom, v, couleur=VERT_OK):
        s = self.ligne([(f"Somme {nom}", WHITE), ("=", WHITE), (v, couleur)], 42)
        return s.next_to(tb, DOWN, buff=0.5).align_to(tb, LEFT).shift(RIGHT * 0.3)

    def remplir_ligne(self, tb, r, vals, mots, couleur, n=None):
        for j, (v, m) in enumerate(zip(vals, mots)):
            self.au_mot(m, (n or [1] * 5)[j])
            self.play(remplir(tb, r, j, v, couleur), run_time=0.25)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer deux droites d'ajustement", self.identite, self.ceinture)
        n = self.nuage(centre=P(-0.6, 0.0))
        n.scale(0.6).move_to(P(-0.6, 0.0))
        self.au_mot("Comparer deux droites")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.5)
        self.au_mot("Deux droites")
        self.play(Create(droite(n, *D1)), Create(droite(n, *D2, GRIS_D)), run_time=0.8)
        self.au_mot("laquelle garder")
        q = self.t("?", 72, AMBRE).next_to(n, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'analyste ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        av = avion(1.7).move_to(P(-4.2, 1.4))
        metier = self.bloc(["Analyste du", "trafic aérien"], 40, BLEU_CALCUL).move_to(P(-4.2, -0.4))
        self.au_mot("Une analyste du trafic aérien")
        self.play(FadeIn(av, shift=UR * 0.5), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("des aéroports de Paris")
        self.poser(self.bloc(["L'avenir des", "aéroports de Paris"], 38, JAUNE_TITRE), 2.4)
        self.au_mot("Le Groupe ADP")
        self.poser(self.t("Groupe ADP : passagers", 32, GREY_B), 1.4)
        ys = [0.75, 0.15, -0.45, -1.05, -1.65]
        for an, v, y, mot in zip(ANNEES, ["95,4", "97,2", "101,5", "105,3", "108"], ys,
                                 ["95,4", "97,2", "101,5", "105,3", "108 millions"]):
            self.au_mot(mot)
            self.poser(self.ligne([(f"{an} :", WHITE), (f"{v} millions", VIOLET_CLAIR)], 32), y, run_time=0.25)
        self.attendre_voix()

    # ── 02 : deux droites ───────────────────────────────────────────────────

    def ecran_deux(self):
        self.ecran("02-deux")
        n = self.nuage()
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.4)
        self.au_mot("le rang de l'année")
        self.play(*[Indicate(n.nx[v], color=ORANGE_V, scale_factor=1.6) for v in XS], run_time=0.5)
        self.au_mot("D1 : y égale 3,3 x")
        self.poser(self.ligne([("D1 : y =", BLEU_CLAIR), ("3,3x + 91,5", BLEU_CLAIR)], 40), 2.6, "pop")
        self.play(Create(droite(n, *D1)), run_time=0.6)
        self.au_mot("celle de la calculatrice")
        self.poser(self.t("la calculatrice, arrondie", 30, GREY_B), 2.0)
        self.au_mot("D2 : y égale 3,2 x")
        self.poser(self.ligne([("D2 : y =", GREY_A), ("3,2x + 92,1", GREY_A)], 40), 1.15, "pop")
        self.play(Create(droite(n, *D2, GRIS_D)), run_time=0.6)
        self.au_mot("tracée au jugé")
        self.poser(self.t("tracée au jugé, à la règle", 30, GREY_B), 0.55)
        self.au_mot("À l'œil")
        oe = self.poser(self.bloc(["À l'œil :", "impossible de choisir !"], 38, AMBRE), -0.6, "pop")
        self.play(Wiggle(n.ronds), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la somme de D1 ─────────────────────────────────────────────────

    def ecran_d1(self):
        self.ecran("03-d1")
        tb = self.table("D1")
        self.play(FadeIn(tb), run_time=0.4)
        self.au_mot("Le juge")
        self.titre_col("Le juge :", y=2.75)
        self.poser(self.bloc(["la somme des carrés", "des écarts"], 38, ROSE_CLAIR), 1.75)
        self.au_mot("Au tableur, pour D1")
        self.poser(self.ligne([("D1 :", BLEU_CLAIR), ("y = 3,3x + 91,5", BLEU_CLAIR)], 34), 0.75)
        self.play(*tb.allumer_ligne(1), run_time=0.3)
        self.remplir_ligne(tb, 1, E1, ["sont 0,6", "moins 0,9", "0,1,", "0,6 et", "et 0."], "#b45309")
        self.play(*tb.eteindre(), *tb.allumer_ligne(2), run_time=0.3)
        self.remplir_ligne(tb, 2, C1, ["0,36,", "0,81", "0,01", "0,36 et", "et 0."], ROSE_C, n=[1, 1, 1, 1, 2])
        self.au_mot("Somme : 1,54")
        s = self.somme(tb, "D1", "1,54")
        self.play(FadeIn(s, scale=0.7), *tb.eteindre(), run_time=0.4)
        self.insister(s[2], 1.4)
        self.attendre_voix()

    # ── 04 : la somme de D2 ─────────────────────────────────────────────────

    def ecran_d2(self):
        self.ecran("04-d2")
        tb = self.table("D2")
        self.add(tb)
        rappel = self.col(self.ligne([("Somme D1 =", WHITE), ("1,54", VERT_OK)], 34), 2.75)
        self.add(rappel)  # un rappel de l'écran précédent, déjà dit
        self.au_mot("Pour D2")
        self.poser(self.ligne([("D2 :", GREY_A), ("y = 3,2x + 92,1", GREY_A)], 34), 1.95)
        self.play(*tb.allumer_ligne(1), run_time=0.3)
        self.remplir_ligne(tb, 1, E2, ["sont 0,1", "moins 1,3", "moins 0,2", "0,4 et", "et moins 0,1"], "#b45309")
        self.play(*tb.eteindre(), *tb.allumer_ligne(2), run_time=0.3)
        self.remplir_ligne(tb, 2, C2, ["carrés : 0,01", "1,69", "0,04", "0,16", "et 0,01"], ROSE_C)
        self.au_mot("Somme : 1,91")
        s = self.somme(tb, "D2", "1,91", AMBRE)
        self.play(FadeIn(s, scale=0.7), *tb.eteindre(), run_time=0.4)
        self.insister(s[2], 1.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()
        d1, d2 = droite(n, *D1), droite(n, *D2, GRIS_D)
        fig = VGroup(n.fond, n.ronds, d2, d1)

        def reponse(s):
            s.play(d1.animate.set_stroke(width=10), d2.animate.set_opacity(0.3), run_time=0.5)

        self.ecran_question("05-question", "05b-reponse", ["Quelle droite ajuste", "le mieux le nuage ?"],
                            ["D1, somme 1,54", "D2, somme 1,91", "aucune : trop proches"], 0,
                            ["La plus PETITE", "somme gagne :", "1,54 < 1,91."], figure=fig, autres_r=reponse,
                            mot_q="Quelle droite")

    # ── 06 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.ecran("06-regle")
        n = self.nuage()
        self.add(n.fond, n.ronds)
        d2 = droite(n, *D2, GRIS_D)
        self.add(d2, droite(n, *D1))
        self.au_mot("La règle")
        self.titre_col("La règle", y=2.75)
        self.au_mot("je garde celle")
        r = self.poser(self.bloc(["Je garde la droite dont", "la somme des carrés", "est la plus PETITE."], 36, VERT_OK), 1.55)
        self.insister(r, 1.05, 0.3)
        self.au_mot("D2 colle presque parfaitement")
        self.play(d2.animate.set_stroke(width=9), run_time=0.4)
        self.play(*[Indicate(n.ronds[i], color=AMBRE, scale_factor=1.8) for i in (0, 2, 3, 4)], run_time=0.6)
        self.au_mot("un seul la fait perdre")
        rr = residus(n, *D2, idx=[1])
        cc = carres(n, *D2, idx=[1])
        self.play(Create(rr), n.allumer(1), run_time=0.4)
        self.au_mot("moins 1,3")
        self.poser(self.ligne([("écart :", WHITE), ("−1,3", AMBRE)], 38), 0.0)
        self.au_mot("pèse 1,69")
        self.play(GrowFromEdge(cc[0], LEFT), run_time=0.4)
        self.poser(self.ligne([("carré :", WHITE), ("1,69", ROSE_CLAIR)], 38), -0.75, "pop")
        self.attendre_voix()

    # ── 07 : 2020 ───────────────────────────────────────────────────────────

    def ecran_aberrant(self):
        self.ecran("07-aberrant")
        n = self.nuage20()
        self.add(n.fond, *n.ronds[:5])
        d1 = droite(n, *D1)
        self.add(d1)
        self.au_mot("voici 2020")
        self.titre_col("2020 : la crise sanitaire", ROUGE_ERREUR, y=2.75, fs=40)
        self.au_mot("33,1 millions")
        self.play(FadeIn(n.ronds[5], scale=4), FadeIn(n.lu_y(33.1)), Create(n.vers_y(5)),
                  FadeIn(self.col(self.ligne([("2020 :", WHITE), ("33,1 millions", VIOLET_CLAIR)], 36), 1.85)), run_time=0.4)
        self.play(Flash(n.ronds[5], color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("D1 prévoyait 111,3")
        pr = Dot(n.p(6, 111.3), radius=0.1, fill_color=BLEU_D, stroke_color=WHITE, stroke_width=2)
        self.play(FadeIn(pr, scale=2), run_time=0.4)
        self.poser(self.ligne([("D1 prévoyait", WHITE), ("111,3", BLEU_CLAIR)], 36), 1.1)
        self.au_mot("L'écart : moins 78,2")
        rr = Line(n.ronds[5].get_center(), pr.get_center(), color=AMBRE, stroke_width=6)
        self.play(Create(rr), run_time=0.5)
        self.poser(self.ligne([("écart :", WHITE), ("−78,2", AMBRE)], 38), 0.3)
        self.au_mot("Son carré : environ 6 115")
        c = abs(rr.get_length())
        sq = Square(c, stroke_color=ROSE_C, stroke_width=4, fill_color=ROSE_C, fill_opacity=0.35)
        sq.move_to(rr.get_center() + LEFT * c / 2)
        self.play(GrowFromEdge(sq, RIGHT), run_time=0.8)
        s = self.poser(self.ligne([("carré ≈", WHITE), ("6 115", ROUGE_ERREUR)], 46), -0.6, "pop")
        self.insister(s[1], 1.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage20()
        d1 = droite(n, *D1)
        rr = Line(n.ronds[5].get_center(), n.p(6, 111.3), color=AMBRE, stroke_width=6)
        fig = VGroup(n.fond, n.ronds, d1, rr)
        self.ecran_question("08-question", "08b-reponse", ["Avec ce 6e point, la somme", "des carrés de D1…"],
                            ["change à peine", "diminue", "explose : plus de 6 116"], 2,
                            ["Un grand écart", "pèse énormément :", "il écrase les autres."],
                            figure=fig, mot_q="Avec ce sixième point")

    # ── 09 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("09-piege")
        n = self.nuage20()
        self.add(n.fond, n.ronds, droite(n, *D1))
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("calculer sans réfléchir", 40, ROUGE_ERREUR))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.65)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Un relevé exceptionnel")
        self.play(Circumscribe(n.ronds[5], Circle, color=AMBRE), run_time=0.7)
        self.poser(self.bloc(["Un relevé exceptionnel", "se discute avant", "de se calculer."], 38, JAUNE_TITRE), 1.0)
        self.au_mot("le retire de l'ajustement")
        self.play(n.ronds[5].animate.set_opacity(0.25), run_time=0.5)
        self.poser(self.ligne([("2020 :", WHITE), ("retiré", AMBRE)], 38), -0.35)
        self.au_mot("le signale dans son rapport")
        self.poser(self.ligne([("… et signalé", WHITE), ("dans le rapport", WHITE)], 34), -1.1)
        self.attendre_voix()

    # ── 10 : défi + correction ──────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        tb = self.table("D3", carres_=["?"] * 5)
        self.au_mot("À toi de jouer")
        self.play(FadeIn(tb), run_time=0.4)
        self.titre_col("À toi de jouer !", y=2.75, fs=48)
        self.au_mot("D3 : y égale")
        self.poser(self.ligne([("D3 : y =", WHITE), ("3x + 92", BLEU_CLAIR)], 40), 1.85, "pop")
        self.remplir_ligne(tb, 1, E3, ["sont 0,4", "moins 0,8", "0,5", "1,3 et", "et 1."], "#b45309")
        self.au_mot("Calcule sa somme")
        self.poser(self.bloc(["Calcule sa somme", "des carrés des écarts."], 36), 0.85)
        self.au_mot("Fait-elle mieux que D1")
        self.poser(self.ligne([("Mieux que D1", WHITE), ("(1,54)", VERT_OK), ("?", WHITE)], 36, ), -0.2)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tb = self.table("D3", ecarts=E3, carres_=["?"] * 5)
        self.add(tb)
        self.titre_col("Correction", y=2.75, fs=48)
        self.remplir_ligne(tb, 2, C3, ["carrés : 0,16", "0,64", "0,25", "1,69", "et 1."], ROSE_C)
        self.au_mot("Somme : 3,74")
        s = self.somme(tb, "D3", "3,74", AMBRE)
        self.play(FadeIn(s, scale=0.7), run_time=0.4)
        self.au_mot("3,74 est plus grand que 1,54")
        self.poser(self.ligne([("3,74", AMBRE), (">", WHITE), ("1,54", VERT_OK)], 48), 1.6, "pop")
        self.au_mot("D1 reste la meilleure")
        self.poser(self.bloc(["D1 reste", "la meilleure."], 40, VERT_OK), 0.5)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        n = self.nuage20()
        d1 = droite(n, *D1)
        self.add(n.fond, n.ronds, d1)
        lignes = self.finale_colonne(figure=VGroup(n, d1), textes=[("Pour chaque droite :", "la somme des carrés", "des écarts."),
                                                                   ("La plus petite somme", "désigne la meilleure."),
                                                                   ("Un point aberrant pèse", "très lourd : on le discute.")])
        self.au_mot("Pour comparer deux droites")
        self.montrer_ligne(lignes[0])
        self.au_mot("La plus petite somme")
        self.montrer_ligne(lignes[1], Indicate(d1, color=BLEU_CLAIR))
        self.au_mot("Et un point aberrant")
        self.montrer_ligne(lignes[2], Circumscribe(n.ronds[5], Circle, color=AMBRE))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_deux()
        self.ecran_d1()
        self.ecran_d2()
        self.ecran_question1()
        self.ecran_regle()
        self.ecran_aberrant()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsMcComparerStmg(StatsMcComparerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
