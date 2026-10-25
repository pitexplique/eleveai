# stats_cv_appliquer.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, épisode 30-cv-appliquer :
# EFFECTUER UN CHANGEMENT DE VARIABLE (micro du coach statT_cv_appliquer :
# « effectuer un changement de variable donné (u², 1/t, log(y)) sur une série »),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau : pourquoi,
# z = 1/x case par case, le nuage redressé, choisir la transformation, x² ≠ 2x).
# Short jumeau : stats_cv_appliquer_short.py (ORANGE).
#
# ⭐ Décor et métier : le TAXI (transport de personnes) ; un CONTRÔLEUR DE GESTION
# d'une compagnie de taxis étudie le prix d'une course au kilomètre (problématique :
# comprendre un coût, le modéliser). Centres d'intérêt : argent-budget, transports.
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : tarifs maximaux des taxis 2026
# (arrêté du 24 décembre 2025, JO du 31/12/2025, service-public.fr « Tarifs des
# taxis ») : prise en charge 4,48 €, kilomètre 1,30 €, minimum de course 8 €.
# Prix d'une course de x km (tarif maximal, sans attente) : 4,48 + 1,30x ; prix
# PAR KILOMÈTRE : y = 4,48 / x + 1,30 — une part fixe qui se PARTAGE : y varie
# comme 1/x. Courses de 4, 5, 8, 10, 20, 25 km (toutes au-dessus du minimum de
# 8 €) : y = 2,42 · 2,20 (2,196) · 1,86 · 1,75 (1,748) · 1,52 (1,524) · 1,48
# (1,4792), au centime. z = 1/x : 0,25 · 0,2 · 0,125 · 0,1 · 0,05 · 0,04.
# Vérifié en Python : le nuage (z ; y) est aligné (moindres carrés y ≈ 4,49z + 1,30).
# Défi : 1/16 = 0,0625 ; 1,5² = 2,25.
# ⭐ Figures du coach : `fonctionGraphique` (Nuage) et `tableau_donnees`
# (canvasTableauCV : x en en-tête, y dessous, la ligne « z = 1/x »).
# ⛔ PAS D'ÉCART : chaque nombre au mot.
#
# Mapping micro → écrans : tpl_3 (z = 1/x case par case) → 03-06, question 05,
# défi (1) · tpl_2 (choisir la transformation d'après la situation) → 07,
# question 08 · tpl_4 (u = x², « x² ≠ 2x ») → 09, défi (2) · tpl_1 (log y) → 07.
# Écrans : 00 garde · 01 le contrôleur de gestion · 02 les données · 03 l'idée ·
# 04 le calcul · 05 QUESTION · 06 le nuage redressé · 07 trois familles ·
# 08 QUESTION · 09 le piège · 10 défi · 10b correction · 11 ce que tu as appris ·
# 12 fin.
#
# Voix : manim/voix/stmg-stats-cv-appliquer.json (débit −7) ; marques :
# manim/scripts/stmg/stats_cv_appliquer_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_cv_appliquer.py StatsCvAppliquerStmg -o eleveai-maths-stmg-stats-cv-appliquer --media_dir manim/scripts/stmg/media-stats-cv-appliquer-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/30-cv-appliquer/eleveai-maths-stmg-stats-cv-appliquer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403

XS = [4, 5, 8, 10, 20, 25]
YS = [2.42, 2.20, 1.86, 1.75, 1.52, 1.48]
YT = ["2,42", "2,20", "1,86", "1,75", "1,52", "1,48"]
ZS = [0.25, 0.2, 0.125, 0.1, 0.05, 0.04]
ZT = ["0,25", "0,2", "0,125", "0,1", "0,05", "0,04"]
JAUNE_TAXI = "#facc15"


def taxi(h=1.0):
    """Un taxi dessiné, de profil, avec son lumineux « TAXI »."""
    caisse = RoundedRectangle(width=2.2, height=0.55, corner_radius=0.15, fill_color=JAUNE_TAXI, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2)
    toit = Polygon(P(-0.6, 0.27), P(0.55, 0.27), P(0.35, 0.7), P(-0.4, 0.7), fill_color=JAUNE_TAXI, fill_opacity=1,
                   stroke_color=WHITE, stroke_width=2)
    vitres = VGroup(Polygon(P(-0.5, 0.3), P(-0.05, 0.3), P(-0.05, 0.62), P(-0.33, 0.62), fill_color="#bae6fd",
                            fill_opacity=1, stroke_width=0),
                    Polygon(P(0.05, 0.3), P(0.45, 0.3), P(0.29, 0.62), P(0.05, 0.62), fill_color="#bae6fd",
                            fill_opacity=1, stroke_width=0))
    roues = VGroup(*[Circle(radius=0.2, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=4).move_to(P(x, -0.3)) for x in (-0.65, 0.65)])
    signe = VGroup(RoundedRectangle(width=0.5, height=0.2, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                                    stroke_width=0),
                   Text("TAXI", font_size=12, color=BLACK, weight=BOLD)).move_to(P(0, 0.82))
    return VGroup(toit, vitres, caisse, roues, signe).scale_to_fit_height(h)


class StatsCvAppliquerBase(PaysageJ2):
    nom_voix = "stmg-stats-cv-appliquer"
    fichier_marques = "stats_cv_appliquer_marques.json"

    def nuage_xy(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(XS, YS, 0, 30, 1, 2.6, pas_x=5, pas_y=0.4, fin_x=5, fin_y=0.2, largeur=5.6,
                                 hauteur=4.2, nom_x="Longueur de la course x (km)", nom_y="Prix par km y (€)", fs=24,
                                 centre=centre))

    def nuage_zy(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(ZS, YS, 0, 0.3, 1, 2.6, pas_x=0.05, pas_y=0.4, fin_x=0.05, fin_y=0.2, largeur=5.6,
                                 hauteur=4.2, nom_x="z = 1/x", nom_y="Prix par km y (€)", fs=24, centre=centre))

    def table(self, z=None, y_bas=-0.9):
        tb = tableur([str(x) for x in XS], [YT, z or [None] * 6], ["Prix par km (€)", "z = 1/x"], coin="x (km)",
                     largeur_case=1.25, largeur_libelle=2.7, hauteur=0.9, fs=34)
        return self.cadrer(tb, gauche=-6.4, droite=6.4, haut=3.3, bas=y_bas)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Effectuer un changement de variable", self.identite, self.ceinture)
        n = self.nuage_xy(centre=P(-0.6, 0.0))
        n.scale(0.6).move_to(P(-0.6, 0.0))
        self.au_mot("Effectuer un changement")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("n'est pas aligné")
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.6)
        self.au_mot("le redresser")
        m = self.nuage_zy(centre=P(-0.6, 0.0))
        m.scale(0.6).move_to(P(-0.6, 0.0))
        n.ronds.set_z_index(5)
        self.play(*[n.ronds[i].animate.move_to(m.ronds[i]) for i in range(6)], FadeTransform(n.fond, m.fond), run_time=1.2)
        self.play(Create(droite(m, 4.48, 1.30, BLEU_D, 4)), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : le contrôleur de gestion ───────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        tx = taxi(1.3).move_to(P(-4.2, 1.4))
        metier = self.bloc(["Contrôleur", "de gestion"], 42, BLEU_CALCUL).move_to(P(-4.2, -0.4))
        self.au_mot("Un contrôleur de gestion")
        self.play(FadeIn(tx, shift=RIGHT * 0.8), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("une compagnie de taxis")
        self.poser(self.t("Une compagnie de taxis", 40, JAUNE_TITRE), 2.6)
        self.au_mot("le prix d'une course, au kilomètre")
        self.poser(self.bloc(["Le prix d'une course,", "au kilomètre"], 38), 1.6)
        self.au_mot("En 2026")
        self.poser(self.t("Tarif maximal 2026 :", 34, GREY_B), 0.5)
        self.au_mot("4,48 euros")
        self.poser(self.ligne([("4,48 €", AMBRE), ("de prise en charge", WHITE)], 36), -0.2, "pop")
        self.au_mot("1,30 euro")
        self.poser(self.ligne([("+ 1,30 €", AMBRE), ("par kilomètre", WHITE)], 36), -0.9, "pop")
        self.play(tx.animate.shift(RIGHT * 0.5), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage_xy()
        self.play(FadeIn(n.fond), run_time=0.3)
        self.au_mot("4 kilomètres")
        self.play(FadeIn(n.ronds[0], scale=3), FadeIn(n.lu_x(4), scale=1.4), run_time=0.4)
        self.poser(self.ligne([("4 km :", ORANGE_V), ("2,42 € le km", VIOLET_CLAIR)], 36), 2.6)
        self.play(FadeIn(n.lu_y(2.42)), Create(n.vers_y(0)), run_time=0.4)
        self.au_mot("25 kilomètres")
        self.play(FadeIn(n.ronds[5], scale=3), FadeIn(n.lu_x(25), scale=1.4), run_time=0.4)
        self.poser(self.ligne([("25 km :", ORANGE_V), ("1,48 € le km", VIOLET_CLAIR)], 36), 1.95)
        self.play(FadeIn(n.lu_y(1.48)), Create(n.vers_y(5)), run_time=0.4)
        self.au_mot("Plus la course est longue")
        self.apparaitre_points(n, [1, 2, 3, 4], run_time=0.7)
        self.poser(self.bloc(["Plus c'est long,", "moins le km coûte cher"], 36), 1.0)
        self.au_mot("la prise en charge se partage")
        parts = VGroup(*[Rectangle(width=0.9 / k, height=0.35, fill_color=AMBRE, fill_opacity=0.9, stroke_color=BLACK,
                                   stroke_width=2) for k in (1, 1, 1, 1)]).arrange(RIGHT, buff=0)
        lab = self.t("4,48 € partagés", 30, AMBRE)
        self.poser(VGroup(parts, lab).arrange(RIGHT, buff=0.3), 0.0)
        self.au_mot("le nuage est courbe")
        courbe = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=4).set_points_smoothly(
            [n.p(x, 4.48 / x + 1.30) for x in (3.2, 4, 5, 6.5, 8, 10, 14, 20, 25, 29)])
        self.play(Create(courbe), run_time=0.8)
        self.poser(self.bloc(["Nuage courbe :", "pas de droite possible"], 36, ROUGE_ERREUR), -1.2)
        self.attendre_voix()

    # ── 03 : l'idée ─────────────────────────────────────────────────────────

    def ecran_idee(self):
        self.ecran("03-idee")
        n = self.nuage_xy()
        self.add(n.fond, n.ronds)
        self.au_mot("L'idée")
        self.titre_col("L'idée", y=2.75)
        self.au_mot("une part fixe partagée")
        self.poser(self.bloc(["Une part fixe partagée", "entre x kilomètres…"], 36), 1.75)
        self.au_mot("varie comme 1 sur x")
        f = self.t("4,48 ÷ x", 40, AMBRE)
        self.poser(VGroup(self.t("… varie comme", 36), f).arrange(RIGHT, buff=0.25), 0.7)
        self.au_mot("z égale 1 sur x")
        z = self.t("z = 1/x", 64, VERT_OK)
        self.poser(z, -0.45, "pop")
        self.insister(z, 1.15, 0.3)
        self.au_mot("On transforme les abscisses")
        self.poser(self.ligne([("On transforme", WHITE), ("les x", ORANGE_V)], 34), -1.45)
        self.play(Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.2), run_time=0.5)
        self.au_mot("les prix, eux, ne changent pas")
        self.poser(self.ligne([("Les y (prix)", VIOLET_CLAIR), ("ne changent pas.", WHITE)], 34), -2.05)
        self.attendre_voix()

    # ── 04 : le calcul ──────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.ecran("04-calcul")
        tb = self.table()
        self.play(FadeIn(tb), run_time=0.4)
        self.au_mot("colonne par colonne")
        self.play(*tb.allumer_ligne(1), run_time=0.4)
        for j, (mot, calc) in enumerate(zip(["x égale 4", "Pour 5", "Pour 8", "Pour 10"],
                                            ["1 ÷ 4 = 0,25", "1 ÷ 5 = 0,2", "1 ÷ 8 = 0,125", "1 ÷ 10 = 0,1"])):
            self.au_mot(mot)
            self.play(Indicate(tb.tetes[j], color=ORANGE_V, scale_factor=1.25), run_time=0.3)
            c = self.t(calc, 44, VERT_OK).move_to(P(-2.6 + (j % 2) * 5.2, -1.6 - (j // 2) * 0.8))
            self.play(FadeIn(c, shift=UP * 0.15), run_time=0.3)   # nombre après nombre, au mot
            self.play(remplir(tb, 1, j, ZT[j], "#15803d"), run_time=0.3)
        self.play(*tb.eteindre(), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        tb = tableur([str(x) for x in XS], [YT, ZT[:4] + [None, None]], ["Prix/km (€)", "z = 1/x"], coin="x (km)",
                     largeur_case=1.15, largeur_libelle=2.3, hauteur=0.9, fs=34)
        self.cadrer(tb, droite=0.55)

        def montrer(s):
            s.play(*tb.allumer_colonne(4), run_time=0.4)

        def reponse(s):
            s.play(remplir(tb, 1, 4, "0,05", "#15803d"), run_time=0.4)

        self.ecran_question("05-question", "05b-reponse", ["Course de 20 km :", "que vaut z ?"],
                            ["20", "0,05", "400"], 1, ["1 ÷ 20 = 0,05.", "20, c'est x sans transformation ;", "400, c'est x au carré."],
                            figure=tb, autres_q=montrer, mot_q="Pour une course")

    # ── 06 : le nuage redressé ──────────────────────────────────────────────

    def ecran_nuage(self):
        self.ecran("06-nuage")
        tb = self.table(z=ZT[:5] + [None], y_bas=1.0)
        self.add(tb)
        self.au_mot("Pour 25 kilomètres")
        self.play(*tb.allumer_colonne(5), run_time=0.3)
        self.au_mot("0,04")
        self.play(remplir(tb, 1, 5, "0,04", "#15803d"), run_time=0.4)
        self.play(*tb.eteindre(), run_time=0.2)
        self.au_mot("Je place les points")
        n = self.cadrer(Nuage(ZS, YS, 0, 0.3, 1, 2.6, pas_x=0.05, pas_y=0.4, fin_x=0.05, fin_y=0.2, largeur=5.0,
                              hauteur=2.6, nom_x="z = 1/x", nom_y="Prix par km y (€)", fs=22),
                        gauche=-6.4, droite=1.2, haut=0.75, bas=-3.5)
        self.play(FadeIn(n.fond), run_time=0.4)
        self.apparaitre_points(n, run_time=0.9)
        self.au_mot("ils sont alignés")
        self.play(Create(droite(n, 4.48, 1.30, BLEU_D, 5)), run_time=0.6)
        ok = self.t("Alignés !", 48, VERT_OK).move_to(P(3.6, -0.6))
        self.play(FadeIn(ok, scale=0.6), run_time=0.4)
        self.au_mot("a redressé le nuage")
        r = self.bloc(["Le changement de", "variable a redressé", "le nuage."], 34, VERT_OK).move_to(P(3.4, -1.75))
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 07 : trois familles ─────────────────────────────────────────────────

    def ecran_familles(self):
        self.ecran("07-familles")
        self.au_mot("Le choix de la nouvelle variable")
        self.play(Write(self.t("Le choix dépend de la situation", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)), run_time=0.6)
        icones = [taxi(0.8),
                  VGroup(Square(0.9, fill_color="#16a34a", fill_opacity=0.6, stroke_color=WHITE),
                         self.t("x", 26).shift(DOWN * 0.62)),
                  VGroup(*[Rectangle(width=0.22, height=0.12 * 1.8 ** k, fill_color=BLEU_CALCUL, fill_opacity=1,
                                     stroke_width=0) for k in range(5)]).arrange(RIGHT, buff=0.06, aligned_edge=DOWN)]
        txts = [["Une part fixe", "qui se partage"], ["Une surface", "(un carré)"], ["Multiplié par le", "même nombre"]]
        formules = ["z = 1/x", "u = x²", "z = log(y)"]
        mots = ["Une part fixe", "Une surface", "Une quantité multipliée"]
        cols = []
        for k in range(3):
            x = -4.3 + 4.3 * k
            ic = icones[k].move_to(P(x, 1.3))
            tt = self.bloc(txts[k], 32).move_to(P(x, 0.0))
            ff = self.t(formules[k], 48, VERT_OK).move_to(P(x, -1.3))
            cols.append((ic, tt, ff))
        for (ic, tt, ff), mot in zip(cols, mots):
            self.au_mot(mot)
            self.play(FadeIn(ic, scale=0.6), FadeIn(tt, shift=UP * 0.15), run_time=0.45)
            self.play(Write(ff), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (choisir la transformation) ─────────────────────────

    def ecran_question2(self):
        car = VGroup(RoundedRectangle(width=3.2, height=1.1, corner_radius=0.2, fill_color=JAUNE_TAXI, fill_opacity=1,
                                      stroke_color=WHITE, stroke_width=3),
                     *[Square(0.42, fill_color="#bae6fd", fill_opacity=1, stroke_width=0).move_to(P(-1.1 + 0.55 * k, 0.15))
                       for k in range(5)],
                     *[Circle(radius=0.25, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                              stroke_width=4).move_to(P(x, -0.6)) for x in (-0.9, 0.9)])
        lab = self.t("Car scolaire : un coût fixe", 32, JAUNE_TITRE).next_to(car, DOWN, buff=0.45)
        eleves = VGroup(*[Circle(radius=0.14, fill_color=c, fill_opacity=1, stroke_width=0)
                          for c in ["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f87171"]]).arrange(RIGHT, buff=0.18)
        lab2 = self.t("partagé entre x élèves", 32).next_to(lab, DOWN, buff=0.2)
        eleves.next_to(lab2, DOWN, buff=0.3)
        fig = self.cadrer(VGroup(car, lab, lab2, eleves), droite=0.4, haut=2.6, bas=-2.6)
        self.ecran_question("08-question", "08b-reponse", ["Le coût d'un car scolaire se", "partage. Quel changement ?"],
                            ["z = 1/x", "u = x²", "z = log(y)"], 0,
                            ["Un coût fixe partagé :", "1/x. Le carré : une surface."],
                            figure=fig, mot_q="Le coût")

    # ── 09 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("09-piege")
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("x² ≠ 2x", 50, ROUGE_ERREUR))
                       .arrange(RIGHT, buff=0.3), 2.65)
        self.play(Write(tit), run_time=0.6)
        # le carré de côté 2,5, quadrillé (6 carreaux entiers, 3 demis, un quart)
        u = 1.0
        sq = Square(2.5 * u, stroke_color=WHITE, stroke_width=4, fill_color="#16a34a", fill_opacity=0.35)
        sq.move_to(P(-3.4, -0.2))
        grille = VGroup(*[Line(sq.get_corner(DL) + RIGHT * k * u, sq.get_corner(UL) + RIGHT * k * u, color=GREY_B,
                               stroke_width=2) for k in (1, 2)],
                        *[Line(sq.get_corner(DL) + UP * k * u, sq.get_corner(DR) + UP * k * u, color=GREY_B,
                               stroke_width=2) for k in (1, 2)])
        c1 = self.t("2,5", 34, AMBRE).next_to(sq, DOWN, buff=0.15)
        c2 = self.t("2,5", 34, AMBRE).next_to(sq, LEFT, buff=0.15)
        self.au_mot("Pour x égale 2,5")
        self.play(Create(sq), FadeIn(c1), FadeIn(c2), run_time=0.6)
        self.play(Create(grille), run_time=0.5)
        self.au_mot("2,5 fois 2,5")
        self.poser(self.t("2,5 × 2,5", 44), 1.4)
        self.au_mot("6,25")
        r = self.poser(self.ligne([("=", WHITE), ("6,25", VERT_OK)], 48), 0.5, "pop")
        self.play(Indicate(sq, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.au_mot("et non 5")
        f = self.poser(self.ligne([("et non", WHITE), ("2 × 2,5 = 5", ROUGE_ERREUR)], 40), -0.5)
        self.play(Create(Line(f[1].get_left(), f[1].get_right(), color=ROUGE_ERREUR, stroke_width=6)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : défi + correction ──────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        tx = taxi(1.0).move_to(P(-4.0, 1.2))
        sq = Square(1.5, stroke_color=WHITE, stroke_width=4, fill_color="#16a34a", fill_opacity=0.35).move_to(P(-4.0, -1.3))
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer !", y=2.75, fs=48)
        self.au_mot("Un : pour une course")
        self.play(FadeIn(tx, shift=RIGHT * 0.5), run_time=0.4)
        self.poser(VGroup(self.t("1. Course de 16 km :", 40), self.t("z = 1/x = ?", 44, VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.15), 1.45)
        self.au_mot("Deux : pour un carré")
        lab = self.t("1,5 m", 30, AMBRE).next_to(sq, DOWN, buff=0.12)
        self.poser(VGroup(self.t("2. Carré de côté 1,5 m :", 40), self.t("u = x² = ?", 44, VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.15), -0.1)
        self.play(Create(sq), FadeIn(lab), run_time=0.4)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre_col("Correction", y=2.75, fs=48)
        tx = taxi(1.0).move_to(P(-4.0, 1.2))
        sq = Square(1.5, stroke_color=WHITE, stroke_width=4, fill_color="#16a34a", fill_opacity=0.35).move_to(P(-4.0, -1.3))
        self.add(tx, sq, self.t("1,5 m", 30, AMBRE).next_to(sq, DOWN, buff=0.12))
        self.au_mot("Un : 1 divisé par 16")
        self.poser(self.ligne([("1.", AMBRE), ("1 ÷ 16 =", WHITE)], 40), 1.75)
        self.au_mot("0,0625")
        self.poser(self.t("0,0625", 52, VERT_OK), 0.95, "pop")
        self.au_mot("Deux : 1,5 fois 1,5")
        self.poser(self.ligne([("2.", AMBRE), ("1,5 × 1,5 =", WHITE), ("2,25", VERT_OK)], 40), -0.05)
        self.au_mot("et non 3")
        f = self.poser(self.ligne([("et non", WHITE), ("2 × 1,5 = 3", ROUGE_ERREUR)], 36), -0.9)
        self.play(Create(Line(f[1].get_left(), f[1].get_right(), color=ROUGE_ERREUR, stroke_width=6)), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        n = self.nuage_zy()
        d = droite(n, 4.48, 1.30, BLEU_D, 5)
        self.add(n.fond, n.ronds, d)
        lignes = self.finale_colonne(figure=VGroup(n, d), textes=[("On remplace x ou y par", "une fonction de lui-même", "pour aligner le nuage."),
                                                                  ("Choisi d'après la situation :", "1/x, x² ou log(y)."),
                                                                  ("Puis la nouvelle ligne", "du tableau, case par case.")])
        self.au_mot("Un changement de variable")
        self.montrer_ligne(lignes[0], Indicate(d, color=BLEU_CLAIR))
        self.au_mot("Je le choisis")
        self.montrer_ligne(lignes[1])
        self.au_mot("Puis je calcule")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_idee()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_nuage()
        self.ecran_familles()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsCvAppliquerStmg(StatsCvAppliquerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
