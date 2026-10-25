# stats_ajust_calculer.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE : 23-ajust-calculer
# (micro du coach statT_ajust_calculer : « Utiliser l'équation d'un ajustement
# affine pour calculer une valeur »), AVEC VOIX. Paysage 16:9. CEINTURE VERTE
# (la paysage complète : prévoir y, remonter à x, le piège estimation/observation,
# défi corrigé). Short jumeau : stats_ajust_calculer_short.py (ORANGE).
#
# ⭐ Décor et métier : l'ÉNERGIE ÉOLIENNE (centres d'intérêt : nature-ecologie,
# sciences) ; un CHARGÉ DE MISSION ÉNERGIE d'une région (problématique :
# prévoir, planifier).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 par WebSearch : puissance éolienne
# installée en France en fin d'année, en GW (connaissancedesenergies.org, fiche
# « Parc éolien français », d'après RTE et l'AIE) : 2017 13,50 · 2018 14,90 ·
# 2019 16,43 · 2020 17,51 · 2021 18,74 · 2022 21,12 · 2023 22,483 ; fin 2024 :
# « a dépassé 24 GW » selon RTE. Arrondis au dixième : 13,5 · 14,9 · 16,4 · 17,5 ·
# 18,7 · 21,1 · 22,5. x = rang de l'année (1 = 2017). Moindres carrés (calculés) :
# a ≈ 1,489, b ≈ 11,843 → y = 1,5 x + 11,8 (arrondi au dixième, comme la banque).
#   x = 4 → 17,8 (relevé 17,5) ; x = 6 → 20,8 ; x = 8 → 23,8 (vrai : > 24) ;
#   x = 9 → 25,3 ; y = 26,8 → x = 10 (2026) ; y = 23,8 → x = 8 ; y > 35 → x ≥ 16 (2032).
# ⭐ Figure du coach : `fonctionGraphique`, droite BLEUE, verticale ORANGE et
# horizontale VIOLETTE (misesEnEvidence). ⛔ PAS D'ÉCART.
#
# Mapping micro → écrans : statT_ajust_calculer tpl_1 (remplacer x) → 03,
# question 04, 05, défi (1) · tpl_2 (résoudre a x + b = cible) → 06, question 07,
# défi (2).
# Écrans : 00 garde · 01 le chargé de mission · 02 les données et l'équation ·
# 03 prévoir y · 04 QUESTION · 05 le piège · 06 remonter à x · 07 QUESTION ·
# 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/stmg-stats-ajust-calculer.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_calculer_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_ajust_calculer.py StatsAjustCalculerStmg -o eleveai-maths-stmg-stats-ajust-calculer --media_dir manim/scripts/stmg/media-stats-ajust-calculer-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/23-ajust-calculer/eleveai-maths-stmg-stats-ajust-calculer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403

RANGS = [1, 2, 3, 4, 5, 6, 7]
EOL = [13.5, 14.9, 16.4, 17.5, 18.7, 21.1, 22.5]
A, B = 1.5, 11.8
G = P(-3.45, -0.3)


def eolienne(h=2.0, couleur=WHITE):
    """Une éolienne dessinée : mât, nacelle, trois pales."""
    mat = Polygon(P(-0.04, 0), P(0.04, 0), P(0.025, 0.75), P(-0.025, 0.75), fill_color=couleur, fill_opacity=1,
                  stroke_width=0).scale(h, about_point=ORIGIN)
    moyeu = P(0, 0.77 * h)
    pales = VGroup(*[Polygon(P(0, 0), P(0.07, 0.08), P(0.0, 0.42), P(-0.05, 0.06), fill_color=couleur,
                             fill_opacity=1, stroke_width=0).scale(h, about_point=ORIGIN).rotate(a, about_point=ORIGIN)
                     .shift(moyeu) for a in (0, 2 * PI / 3, 4 * PI / 3)])
    rond = Circle(radius=0.04 * h, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(moyeu)
    g = VGroup(mat, pales, rond)
    g.pales = pales
    g.rond = rond
    return g


class StatsAjustCalculerBase(PaysageJ1):
    nom_voix = "stmg-stats-ajust-calculer"
    fichier_marques = "stats_ajust_calculer_marques.json"

    def nuage(self, grand=False):
        if grand:
            n = Nuage(RANGS, EOL, 0, 18, 10, 40, pas_x=2, pas_y=5, fin_x=1, fin_y=2.5, largeur=5.6, hauteur=4.2,
                      nom_x="Rang de l'année (1 = 2017)", nom_y="Puissance éolienne (GW)", fs=24, centre=G)
        else:
            n = Nuage(RANGS, EOL, 0, 11, 10, 30, pas_x=1, pas_y=5, fin_x=1, fin_y=1, largeur=5.6, hauteur=4.2,
                      nom_x="Rang de l'année (1 = 2017)", nom_y="Puissance éolienne (GW)", fs=24, centre=G)
        return self.cadrer(n)

    def pret(self, grand=False, ligne=True):
        n = self.nuage(grand)
        self.add(n.fond, *n.ronds)
        if ligne:
            self.add(droite(n, A, B))
        return n

    def eq(self, fs=38):
        return self.ligne([("y =", WHITE), ("1,5", AMBRE), ("x +", WHITE), ("11,8", VIOLET_CLAIR)], fs, 0.15)

    def lire(self, n, x, y_txt):
        """Le geste du coach : verticale orange de x à la droite, horizontale violette, pastilles."""
        v, h = lecture(n, A, B, x)
        p = point_droite(n, A, B, x)
        self.play(FadeIn(n.lu_x(x), scale=1.4), Create(v), run_time=0.5)
        self.play(FadeIn(p, scale=2), run_time=0.2)
        self.play(Create(h), FadeIn(n.lu_y(y_txt) if isinstance(y_txt, str) else n.lu_y(y_txt), scale=1.3),
                  run_time=0.5)
        return VGroup(v, h, p)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer avec une droite d'ajustement", self.identite, self.ceinture)
        n = self.nuage().scale(0.6).move_to(P(-2.4, 0.1))
        e = self.ligne([("y =", WHITE), ("a", AMBRE), ("x +", WHITE), ("b", VIOLET_CLAIR)], 64).move_to(P(2.8, 0.3))
        self.au_mot("Calculer avec")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(n.fond), FadeIn(n.ronds),
                  run_time=0.7)
        self.au_mot("Une équation")
        self.play(Create(droite(n, A, B)), Write(e), run_time=0.7)
        self.au_mot("et tu prévois")
        v, h = lecture(n, A, B, 10)
        self.play(Create(v), Create(h), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : le chargé de mission ───────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        self.au_mot("Un chargé de mission")
        e1 = eolienne(2.4).move_to(P(-4.4, 0.9))
        e2 = eolienne(1.7).move_to(P(-2.7, 0.6))
        m = self.t("Chargé de mission énergie", 36, BLEU_CALCUL).move_to(P(-3.3, -1.0))
        self.play(FadeIn(e1, shift=UP * 0.3), FadeIn(e2, shift=UP * 0.3), FadeIn(m, shift=UP * 0.2), run_time=0.6)
        self.play(Rotate(e1.pales, -TAU / 3, about_point=e1.rond.get_center()), Rotate(e2.pales, -TAU / 3, about_point=e2.rond.get_center()),
                  run_time=1.0)
        self.au_mot("travaille pour une région")
        self.poser(self.bloc(["Il travaille", "pour une région."], 38), 2.45)
        self.au_mot("la puissance totale du parc")
        self.poser(self.bloc(["La puissance du parc", "éolien français (GW)"], 38, JAUNE_TITRE), 1.0)
        self.play(Rotate(e1.pales, -TAU / 3, about_point=e1.rond.get_center()), Rotate(e2.pales, -TAU / 3, about_point=e2.rond.get_center()),
                  run_time=1.0)
        self.au_mot("d'après RTE")
        self.poser(self.bloc(["Source : RTE, gestionnaire", "du réseau électrique"], 30, GREY_A), -0.35)
        self.attendre_voix()

    # ── 02 : les données et l'équation ──────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.3)
        l1 = self.col(self.ligne([("x = 1", ORANGE_V), ("→ 2017", WHITE)], 34), 2.7)
        l2 = self.col(self.ligne([("x = 7", ORANGE_V), ("→ 2023", WHITE)], 34), 2.1)
        self.reveler([(VGroup(l1[0], n.ronds[0]), "1 pour"), (l1[1], "2017,"),
                      (VGroup(l2[0], *n.ronds[1:]), "7 pour"), (l2[1], "2023. En")])
        l3 = self.col(self.ligne([("13,5 GW", VIOLET_CLAIR), ("→", WHITE), ("22,5 GW", VIOLET_CLAIR)], 34), 1.3)
        self.reveler([(VGroup(l3[0], n.lu_y(13.5)), "13,5 gigawatts"), (VGroup(l3[1:], n.lu_y(22.5)), "22,5 en")])
        self.au_mot("La calculatrice")
        self.play(Create(droite(n, A, B)), run_time=0.7)
        e = self.col(self.eq(44), 0.15)
        self.au_mot("y égale")
        self.play(FadeIn(e[0]), run_time=0.2)
        self.reveler([(e[1:3], "1,5 x"), (e[3], "11,8.")])
        self.play(Create(self.encadrer(e)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : prévoir y ──────────────────────────────────────────────────────

    def ecran_calculer(self):
        self.ecran("03-calculer")
        n = self.pret()
        l0 = self.col(self.ligne([("2020 :", WHITE), ("x = 4", ORANGE_V)], 36), 2.75)
        self.reveler([(l0[0], "2020,"), (l0[1], "4 ? Je")])
        l1 = self.col(self.ligne([("y =", WHITE), ("1,5", AMBRE), ("×", WHITE), ("4", ORANGE_V), ("+", WHITE),
                                  ("11,8", VIOLET_CLAIR)], 40), 1.85)
        l2 = self.col(self.ligne([("y =", WHITE), ("6", WHITE), ("+", WHITE), ("11,8", VIOLET_CLAIR), ("=", WHITE),
                                  ("17,8 GW", VIOLET_CLAIR)], 40), 1.0)
        self.reveler([(l1[0], "Je remplace"), (l1[1:3], "1,5 fois"), (l1[3], "4, 6"), (l2[:2], "6, plus"),
                      (VGroup(l1[4:], l2[2:4]), "11,8 :"), (l2[4:], "17,8 gigawatts")])
        self.insister(l2[5], 1.15, 0.3)
        v, h = lecture(n, A, B, 4)
        self.au_mot("je monte de 4")
        self.play(FadeIn(n.lu_x(4), scale=1.4), Create(v), run_time=0.5)
        self.play(FadeIn(point_droite(n, A, B, 4), scale=2), run_time=0.2)
        self.au_mot("17,8.")
        self.play(Create(h), FadeIn(n.lu_y(17.8), scale=1.3), run_time=0.4)
        self.poser(self.t("Graphique et calcul : d'accord !", 32, VERT_OK), -0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()
        fig = VGroup(n.fond, *n.ronds, droite(n, A, B))

        def reponse(s):
            v, h = lecture(n, A, B, 6)
            s.play(Create(v), Create(h), FadeIn(n.lu_y(20.8)), run_time=0.5)

        self.ecran_question("04-question", "04b-reponse", ["y = 1,5x + 11,8 :", "que prévoit-elle pour x = 6 ?"],
                            ["20,8", "19,3", "26,7"], 0,
                            ["1,5 × 6 + 11,8 = 20,8.", "B additionne, C multiplie tout par 1,5."],
                            figure=fig, autres_r=reponse, mots_q=["11,8, que", "6 ?"],
                            mots_choix=["20,8.", "19,3.", "26,7."], mots_ph=["20,8. B", "tout par 1,5"])

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("05-piege")
        n = self.pret()
        self.au_mot("Le piège")
        self.titre_col("Le piège :", ROUGE_ERREUR, 2.95, 46)
        self.poser(self.t("estimation ≠ valeur observée", 36, ROUGE_ERREUR), 2.15)
        p = point_droite(n, A, B, 4)
        l1 = self.col(self.ligne([("Droite (2020) :", WHITE), ("17,8", BLEU_CLAIR)], 36), 0.85)
        self.reveler([(VGroup(l1, p), "17,8, mais")])
        l2 = self.col(self.ligne([("Relevé réel :", WHITE), ("17,5", "#f87171")], 36), 0.15)
        self.au_mot("17,5.")
        self.play(n.allumer(3), FadeIn(l2), run_time=0.3)
        ec = Line(n.ronds[3].get_center(), p.get_center(), color=AMBRE, stroke_width=6)
        self.play(Create(ec), run_time=0.3)
        self.au_mot("La droite résume la tendance")
        self.play(Create(residus(n, A, B)), run_time=0.6)
        self.poser(self.bloc(["La droite résume la tendance :", "elle ne passe pas par", "chaque point."], 32,
                             JAUNE_TITRE), -1.05, "pop")
        self.attendre_voix()

    # ── 06 : remonter à x ───────────────────────────────────────────────────

    def ecran_remonter(self):
        self.ecran("06-remonter")
        n = self.pret()
        self.au_mot("Et dans l'autre sens")
        self.poser(self.t("Dans l'autre sens :", 40, JAUNE_TITRE), 2.9)
        self.au_mot("26,8 gigawatts")
        self.poser(self.ligne([("y = 26,8", VIOLET_CLAIR), ("→ x = ?", ORANGE_V)], 38), 2.2)
        self.play(Create(n.horizontale(26.8)), FadeIn(n.lu_y(26.8)), run_time=0.6)
        l1 = self.col(self.ligne([("1,5x +", WHITE), ("11,8 =", WHITE), ("26,8", VIOLET_CLAIR)], 38), 1.4)
        self.reveler([(l1[0], "1,5 x plus"), (l1[1], "11,8 égale"), (l1[2], "26,8.")])
        l2 = self.col(self.ligne([("− 11,8 :", WHITE), ("1,5x =", WHITE), ("15", WHITE)], 38), 0.65)
        self.reveler([(l2[0], "11,8 : 1,5"), (l2[1], "1,5 x égale 15"), (l2[2], "15. Je")])
        l3 = self.col(self.ligne([("÷ 1,5 :", WHITE), ("x = 10", ORANGE_V)], 40), -0.1)
        self.reveler([(l3[0], "1,5 : x")])
        self.au_mot("10, c'est")
        p = point_droite(n, A, B, 10)
        v = DashedLine(n.p(10, 26.8), n.p(10, n.ymin), color=ORANGE_V, stroke_width=5, dash_length=0.1)
        self.play(FadeIn(l3[1]), FadeIn(p, scale=2), Create(v), FadeIn(n.lu_x(10), scale=1.4), run_time=0.5)
        self.au_mot("2026.")
        r = self.poser(self.ligne([("x = 10", ORANGE_V), ("→", WHITE), ("en 2026", VERT_OK)], 40), -0.95, "pop")
        self.insister(r, 1.1, 0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage()
        fig = VGroup(n.fond, *n.ronds, droite(n, A, B), n.horizontale(23.8))

        def reponse(s):
            v = DashedLine(n.p(8, 23.8), n.p(8, n.ymin), color=ORANGE_V, stroke_width=5, dash_length=0.1)
            s.play(Create(v), FadeIn(n.lu_x(8), scale=1.4), run_time=0.5)

        self.ecran_question("07-question", "07b-reponse", ["Pour quel x la droite", "atteint-elle 23,8 GW ?"],
                            ["x = 8", "x = 47,5", "x = 15,9"], 0,
                            ["(23,8 − 11,8) ÷ 1,5 = 8.", "B calcule y ; C oublie d'enlever 11,8."],
                            figure=fig, autres_r=reponse, mots_q=["Pour quelle", "23,8 gigawatts"],
                            mots_choix=["8. B", "47,5.", "15,9."], mots_ph=["1,5 : 8", "11,8."])

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        n = self.pret(grand=True)
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer", JAUNE_TITRE, 2.85, 50)
        l1 = self.col(self.ligne([("1.", AMBRE), ("2025,", WHITE), ("x = 9 : y = ?", VIOLET_CLAIR)], 36), 1.9)
        self.reveler([(l1[0], "Un :"), (l1[1], "2025,"), (VGroup(l1[2], n.verticale(9)), "9 ?")])
        b = self.col(self.bloc(["2. À partir de quel rang", "la droite dépasse 35 GW ?", "En quelle année ?"], 32), 0.6)
        self.reveler([(b[0], "Deux :"), (VGroup(b[1], n.horizontale(35)), "35 gigawatts"), (b[2], "Et en quelle")])
        self.pause_defi(-0.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        n = self.pret(grand=True)
        self.titre_col("Correction", JAUNE_TITRE, 2.85, 50)
        l1 = self.col(self.ligne([("1.", AMBRE), ("1,5 ×", WHITE), ("9", ORANGE_V), ("+ 11,8", WHITE)], 36), 2.05)
        self.reveler([(l1[:2], "1,5 fois"), (l1[2], "9, 13,5"), (l1[3], "11,8 : 25")])
        r = self.col(self.ligne([("=", WHITE), ("25,3 GW", VIOLET_CLAIR)], 36), 1.45, xl=1.5)
        v, h = lecture(n, A, B, 9)
        self.au_mot("25,3")
        self.play(FadeIn(r, scale=1.3), Create(v), Create(h), run_time=0.5)
        l2 = self.col(self.ligne([("2.", AMBRE), ("(35 −", WHITE), ("11,8)", WHITE), ("÷ 1,5", WHITE)], 36), 0.7)
        self.reveler([(l2[:2], "35 moins"), (l2[2], "11,8, 23"), (l2[3], "1,5 : environ")])
        l3 = self.col(self.ligne([("≈ 15,5", WHITE), ("→ rang", WHITE), ("16", ORANGE_V)], 36), 0.0)
        self.reveler([(l3[0], "15,5."), (VGroup(l3[1:], n.horizontale(35)), "16 :")])
        self.au_mot("2032")
        p = point_droite(n, A, B, 16)
        self.play(FadeIn(p, scale=2), Create(DashedLine(n.p(16, A * 16 + B), n.p(16, n.ymin), color=ORANGE_V,
                                                         stroke_width=5, dash_length=0.1)), run_time=0.5)
        self.poser(self.ligne([("en 2032", VERT_OK), ("(si la tendance continue)", GREY_A)], 32), -0.75, "pop")
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        n = self.nuage()
        self.add(n.fond, *n.ronds)
        lignes = self.finale_colonne(figure=n, textes=[
            ("Prévoir y : je remplace x", "dans l'équation."),
            ("Quand y atteint une valeur :", "j'enlève b, je divise par a."),
            ("Le résultat est une estimation,", "pas une valeur observée.")])
        self.add(droite(n, A, B))  # après le recadrage de la figure
        self.au_mot("Pour prévoir y")
        v, h = lecture(n, A, B, 4)
        self.montrer_ligne(lignes[0], Create(v), Create(h))
        self.au_mot("Pour savoir quand")
        self.montrer_ligne(lignes[1], Create(n.horizontale(26.8)))
        self.au_mot("Et le résultat")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_calculer()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_remonter()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsAjustCalculerStmg(StatsAjustCalculerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
