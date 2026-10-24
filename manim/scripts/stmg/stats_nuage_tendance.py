# stats_nuage_tendance.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE : DÉCRIRE LA TENDANCE D'UN NUAGE (micros du coach : 1re info_nuage_tendance,
# STMG statT_nuage_tendance ; « croissante, décroissante, alignement »), AVEC VOIX.
# ÉPISODE COMMUN : 1re 13-nuage-tendance ⇄ STMG 19-nuage-tendance (une voix, un
# script, deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 1re VERTE (la paysage complète : allure générale,
# trois cas, « pas alignés », point isolé, estimer, comparer) ; STMG BLEUE (la
# même vidéo porte l'esprit critique que le BO de terminale STMG exige et que
# sa banque pose en étoile 3 : une tendance ne prouve pas une cause).
# Short jumeau : stats_nuage_tendance_short.py (ORANGE).
#
# ⭐ Décor et métier : la GÉOGRAPHIE des pays où l'on parle français (centres
# d'intérêt : histoire-geographie, meteo-climat) ; un GÉOGRAPHE prépare un atlas
# (problématique : décrire un lien, prévoir prudemment, juger une affirmation).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : température moyenne annuelle (°C),
# https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature (consulté
# le 24/10/2026) : Libreville 25,9 · Abidjan 26,6 · Dakar 25,1 · Antananarivo
# 17,9 · Rabat 17,5 · Marseille 15,8 · Montréal 7,0 · Paris 12,3 · Bruxelles 10,5 ;
# Tunis 18,4 · Kinshasa 25,3 · Ottawa 6,8. Latitudes (nord ou sud), arrondies au
# degré : 0 · 5 · 15 · 19 (S) · 34 · 43 · 46 · 49 · 51 ; Tunis 37, Kinshasa 4 (S),
# Ottawa 45. Antananarivo : environ 1 280 m d'altitude (« près de 1 300 m »).
# ⭐ Figure du coach : `fonctionGraphique` (Nuage de stats_lycee_h2_commun.py).
# Les trois vignettes « croissante / décroissante / pas de tendance » sont des
# SCHÉMAS sans nombres. ⛔ PAS D'ÉCART : chaque nombre au mot.
#
# Mapping micro → écrans : info_nuage_tendance_figure / statT tpl_1 → 03-05 ·
# « exactement alignés » (diagnostic STMG) → question 05, 06 · statT tpl_2
# (la CAUSE) → 07, défi (2) · info_nuage_tendance_estimer → question 08 ·
# info_nuage_tendance_comparer → défi (1).
# Écrans : 00 garde · 01 le géographe · 02 les données · 03 la tendance · 04 les
# trois cas · 05 QUESTION · 06 les écarts (Montréal, Antananarivo) · 07 le piège
# (cause) · 08 QUESTION (Tunis) · 09 défi · 09b correction · 10 ce que tu as
# appris · 11 fin (règle du 19/10).
#
# Voix : manim/voix/lycee-stats-nuage-tendance.json (débit −7) ; marques :
# manim/scripts/stmg/stats_nuage_tendance_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_nuage_tendance.py StatsNuageTendancePremiere -o eleveai-maths-premiere-commun-stats-nuage-tendance --media_dir manim/scripts/stmg/media-stats-nuage-tendance-1re
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_nuage_tendance.py StatsNuageTendanceStmg -o eleveai-maths-stmg-stats-nuage-tendance --media_dir manim/scripts/stmg/media-stats-nuage-tendance-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/13-nuage-tendance/eleveai-maths-premiere-commun-stats-nuage-tendance.mp4
#           manim/sorties/stmg/maths/statistiques/19-nuage-tendance/eleveai-maths-stmg-stats-nuage-tendance.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403

VILLES = ["Libreville", "Abidjan", "Dakar", "Antananarivo", "Rabat", "Marseille", "Montréal", "Paris", "Bruxelles"]
LAT = [0, 5, 15, 19, 34, 43, 46, 49, 51]
TEMP = [25.9, 26.6, 25.1, 17.9, 17.5, 15.8, 7.0, 12.3, 10.5]
# les villes ajoutées : Tunis (question 08), Kinshasa et Ottawa (défi)
EXTRA_V, EXTRA_X, EXTRA_Y = ["Tunis", "Kinshasa", "Ottawa"], [37, 4, 45], [18.4, 25.3, 6.8]
G = P(-3.45, -0.3)


def globe(r=1.0):
    """Un globe : disque bleu, équateur, deux parallèles et le méridien."""
    d = Circle(radius=r, fill_color="#1d4ed8", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    eq = Line(P(-r, 0), P(r, 0), color=AMBRE, stroke_width=5)
    par = VGroup(*[Line(P(-r * np.cos(a), r * np.sin(a)), P(r * np.cos(a), r * np.sin(a)), color="#93c5fd",
                        stroke_width=2) for a in (0.6, -0.6)])
    mer = Ellipse(width=0.8 * r, height=2 * r, stroke_color="#93c5fd", stroke_width=2)
    return VGroup(d, par, mer, eq)


def vignette(sens, l=2.2, h=1.6):
    """Un SCHÉMA de nuage (sans nombres) : 'monte', 'descend' ou 'aucune'."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.15, fill_color=WHITE, fill_opacity=1,
                             stroke_color=GRILLE, stroke_width=3)
    ax = VGroup(Line(P(-l / 2 + 0.2, -h / 2 + 0.2), P(l / 2 - 0.15, -h / 2 + 0.2), color=NUIT, stroke_width=3),
                Line(P(-l / 2 + 0.2, -h / 2 + 0.2), P(-l / 2 + 0.2, h / 2 - 0.15), color=NUIT, stroke_width=3))
    rng = np.random.default_rng({"monte": 3, "descend": 5, "aucune": 11}[sens])
    pts = VGroup()
    for k in range(9):
        u = (k + 0.5) / 9
        if sens == "aucune":
            v = rng.uniform(0.1, 0.9)
        else:
            v = (u if sens == "monte" else 1 - u) * 0.75 + 0.1 + rng.uniform(-0.09, 0.09)
        pts.add(Dot(P(-l / 2 + 0.35 + u * (l - 0.6), -h / 2 + 0.3 + v * (h - 0.55)), radius=0.06,
                    fill_color=ROUGE_PT))
    return VGroup(cadre, ax, pts)


class StatsNuageTendanceBase(PaysageH2):
    nom_voix = "lycee-stats-nuage-tendance"
    fichier_marques = "stats_nuage_tendance_marques.json"

    def nuage(self, extra=0, centre=G, fs=24):
        xs, ys = LAT + EXTRA_X[:extra], TEMP + EXTRA_Y[:extra]
        return self.cadrer(Nuage(xs, ys, 0, 60, 0, 30, pas_x=10, pas_y=5, fin_x=2, fin_y=1, largeur=5.6, hauteur=4.2,
                     nom_x="Latitude (°)", nom_y="Température moyenne (°C)", fs=fs, centre=centre))

    def nuage_pret(self, extra=0):
        n = self.nuage(extra)
        self.add(n.fond, *n.ronds[:9])
        return n

    def nom(self, n, i, txt=None, d=UR):
        return n.etiquette(i, txt or (VILLES + EXTRA_V)[i], d, fs=19)

    def fleche_tendance(self, n):
        a = Arrow(n.p(0, 28.5), n.p(56, 7.5), buff=0, color=VERT_OK, stroke_width=10,
                  max_tip_length_to_length_ratio=0.06)
        return a.set_opacity(0.55)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Décrire la tendance d'un nuage", self.identite, self.ceinture)
        vs = VGroup(*[vignette(s, 2.3, 1.7) for s in ("monte", "descend", "aucune")]).arrange(RIGHT, buff=0.45)
        vs.move_to(P(-0.6, 0.15))
        self.au_mot("Décrire la tendance")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        for v, mot in zip(vs, ["montent", "descendent", "dans tous les sens"]):
            self.au_mot(mot)
            self.play(FadeIn(v[:2]), LaggedStart(*[FadeIn(p, scale=0.3) for p in v[2]], lag_ratio=0.08),
                      run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : le géographe ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        g = globe(1.25).move_to(P(-4.2, 1.2))
        self.au_mot("Un géographe")
        metier = self.t("Géographe", 46, BLEU_CALCUL).move_to(P(-4.2, -0.6))
        self.play(GrowFromCenter(g), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("un atlas")
        atlas = self.col(self.bloc(["Un atlas des pays", "où l'on parle français"], 40, JAUNE_TITRE), 2.2)
        self.play(FadeIn(atlas, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("la température moyenne")
        l1 = self.col(self.bloc(["La température moyenne", "dépend-elle…"], 38), 0.7)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("de sa distance à l'équateur")
        l2 = self.col(self.t("… de la distance à l'équateur ?", 38), -0.45)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(g[3], color=AMBRE, scale_factor=1.1), run_time=0.6)
        self.au_mot("de sa latitude")
        c = g[0].get_center()
        rr = g[0].width / 2
        rayon_eq = Line(c, c + RIGHT * rr, color=WHITE, stroke_width=3)
        rayon_v = Line(c, c + rr * np.array([np.cos(0.75), np.sin(0.75), 0]), color=WHITE, stroke_width=3)
        ang = Angle(rayon_eq, rayon_v, radius=0.45, color=AMBRE, stroke_width=5)
        lat = self.col(self.t("la latitude", 42, AMBRE), -1.4)
        self.play(Create(rayon_eq), Create(rayon_v), Create(ang), FadeIn(lat, shift=UP * 0.2), run_time=0.8)
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.5)
        self.au_mot("9 villes")
        l0 = self.col(self.ligne([("9", AMBRE), ("villes", WHITE)], 44), 2.5)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("de Libreville")
        e0 = self.nom(n, 0, d=DR)
        self.play(FadeIn(n.ronds[0], scale=3), FadeIn(e0), run_time=0.4)
        self.au_mot("à Bruxelles")
        e8 = self.nom(n, 8, d=UP)
        self.play(FadeIn(n.ronds[8], scale=3), FadeIn(e8), run_time=0.4)
        self.au_mot("à 51 degrés")
        self.play(FadeIn(n.lu_x(51), scale=1.5), Create(n.vers_x(8)), run_time=0.45)
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in range(1, 8)], lag_ratio=0.15), run_time=1.0)
        self.au_mot("En abscisse")
        l1 = self.col(self.bloc(["Abscisse : la latitude,", "en degrés (nord ou sud)"], 34, ORANGE_V), 1.25)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.3), run_time=0.6)
        self.au_mot("En ordonnée")
        l2 = self.col(self.bloc(["Ordonnée : la température", "moyenne de l'année (°C)"], 34, VIOLET_CLAIR), -0.05)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(n.nom_y, color=VIOLET_H, scale_factor=1.2), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la tendance ────────────────────────────────────────────────────

    def ecran_tendance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tendance")
        n = self.nuage_pret()
        self.au_mot("de gauche à droite")
        bal = Line(n.p(0, 0), n.p(0, 30), color=AMBRE, stroke_width=6)
        self.add(bal)
        self.play(bal.animate.move_to(n.p(60, 15)), run_time=1.6, rate_func=linear)
        self.play(FadeOut(bal), run_time=0.2)
        self.au_mot("Libreville : 25,9")
        v0 = self.ligne([("Libreville :", WHITE), ("25,9 °C", VIOLET_CLAIR)], 36)
        self.col(v0, 2.5)
        self.play(n.allumer(0), FadeIn(n.lu_y(25.9)), FadeIn(v0, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Bruxelles : 10,5")
        v8 = self.col(self.ligne([("Bruxelles :", WHITE), ("10,5 °C", VIOLET_CLAIR)], 36), 1.8)
        self.play(n.allumer(8), FadeIn(n.lu_y(10.5)), FadeIn(v8, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("les points descendent")
        fl = self.fleche_tendance(n)
        self.play(GrowArrow(fl), run_time=1.0)
        self.au_mot("la tendance est décroissante")
        d = self.col(self.t("Tendance décroissante", 44, VERT_OK), 0.75)
        self.play(FadeIn(d, scale=0.7), run_time=0.45)
        self.insister(d, 1.1, 0.3)
        self.au_mot("Quand la latitude augmente")
        r1 = self.col(self.ligne([("latitude", ORANGE_V), ("↗", ORANGE_V)], 40), -0.35)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("la température a tendance à diminuer")
        r2 = self.col(self.ligne([("température", VIOLET_CLAIR), ("↘", VIOLET_CLAIR), ("(en tendance)", GREY_B)], 40),
                      -1.15)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 04 : les trois cas ──────────────────────────────────────────────────

    def ecran_vocabulaire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-vocabulaire")
        self.play(Write(self.t("Trois cas possibles", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)), run_time=0.6)
        vs = VGroup(*[vignette(s, 3.4, 2.5) for s in ("monte", "descend", "aucune")]).arrange(RIGHT, buff=0.9)
        vs.move_to(P(-0.2, 0.55))
        noms = [("croissante", VERT_OK), ("décroissante", VERT_OK), ("pas de tendance nette", ORANGE_RETENUE)]
        for v, (txt, c), mot, sens in zip(vs, noms, ["Les points montent", "Ils descendent", "Ils partent"],
                                          [UR, DR, None]):
            self.au_mot(mot)
            lab = self.t(txt, 32, c).next_to(v, DOWN, buff=0.3)
            if lab.width > v.width + 0.6:
                lab = VGroup(*[self.t(x, 32, c) for x in ("pas de tendance", "nette")]).arrange(DOWN, buff=0.08)
                lab.next_to(v, DOWN, buff=0.3)
            anims = [FadeIn(v[:2]), LaggedStart(*[FadeIn(p, scale=0.3) for p in v[2]], lag_ratio=0.06)]
            self.play(*anims, run_time=0.7)
            if sens is not None:
                a = Arrow(v[0].get_corner(DL if sens is UR else UL) + (UR if sens is UR else DR) * 0.3,
                          v[0].get_corner(sens) - sens * 0.3, buff=0, color=VERT_OK, stroke_width=7)
                self.play(GrowArrow(a), FadeIn(lab, shift=UP * 0.15), run_time=0.5)
            else:
                self.play(FadeIn(lab, shift=UP * 0.15), Wiggle(v[2]), run_time=0.6)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()
        fig = VGroup(n.fond, *n.ronds[:9])

        def reponse(s):
            s.play(GrowArrow(self.fleche_tendance(n)), run_time=0.7)

        self.ecran_question("05-question", "05b-reponse", ["Quelle phrase décrit", "ce nuage ?"],
                            ["tendance croissante", "tendance décroissante", "points exactement alignés"], 1,
                            ["Ils descendent, sans être alignés :", "pas une droite parfaite."],
                            figure=fig, autres_r=reponse, mot_q="Quelle phrase")

    # ── 06 : les écarts ─────────────────────────────────────────────────────

    def ecran_ecarts(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-ecarts")
        n = self.nuage_pret()
        fl = self.fleche_tendance(n)
        self.add(fl)
        self.au_mot("regarde Montréal")
        e6 = self.nom(n, 6, d=DL)
        self.play(n.allumer(6), FadeIn(e6), run_time=0.45)
        self.au_mot("46 degrés de latitude")
        l1 = self.col(self.ligne([("Montréal :", WHITE), ("46°", ORANGE_V)], 38), 2.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(n.lu_x(46), scale=1.4), Create(n.vers_x(6)), run_time=0.5)
        self.au_mot("seulement 7 degrés Celsius")
        l1b = self.ligne([("→", WHITE), ("7 °C", VIOLET_CLAIR)], 38).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), FadeIn(n.lu_y(7)), Create(n.vers_y(6)), run_time=0.5)
        self.au_mot("que Marseille")
        e5 = self.nom(n, 5, d=UL)
        l2 = self.col(self.ligne([("Marseille :", WHITE), ("43°", ORANGE_V)], 38), 1.75)
        self.play(n.allumer(5), FadeIn(e5), run_time=0.4)
        self.au_mot("à 43 degrés")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(n.ronds[5], color=AMBRE, scale_factor=1.8), run_time=0.4)
        self.au_mot("Et Antananarivo")
        e3 = self.nom(n, 3, d=DL)
        self.play(n.allumer(3), FadeIn(e3), run_time=0.45)
        self.au_mot("près de 1 300 mètres")
        mont = Polygon(P(0, 0), P(0.55, 0.75), P(1.1, 0), fill_color="#a16207", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2)
        l3 = self.ligne([("Antananarivo :", WHITE), ("≈ 1 300 m", AMBRE)], 36)
        l3 = self.col(VGroup(mont, l3).arrange(RIGHT, buff=0.25), 0.85)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Un point isolé")
        r = self.col(self.bloc(["Un point isolé ne casse pas", "la tendance : on décrit", "l'allure générale."], 36,
                               VERT_OK), -0.6)
        self.play(FadeIn(r, shift=UP * 0.2), fl.animate.set_opacity(0.9), run_time=0.6)
        self.play(fl.animate.set_opacity(0.55), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le piège (la cause) ────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        n = self.nuage_pret()
        self.add(self.fleche_tendance(n))
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("conclure à une cause", 40, ROUGE_ERREUR)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.1), 2.65)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("varient ensemble")
        l1 = self.col(self.bloc(["Latitude et température", "varient ensemble"], 36, VERT_OK), 1.25)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("ce qui cause quoi")
        l2 = self.col(self.ligne([("≠", ROUGE_ERREUR), ("« l'une cause l'autre »", WHITE)], 36), 0.3)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("l'altitude, l'océan ou les vents")
        aut = self.col(self.ligne([("altitude", AMBRE), ("·", WHITE), ("océan", BLEU_CALCUL), ("·", WHITE),
                                   ("vents", GREY_A)], 38), -0.5)
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in aut], lag_ratio=0.25), run_time=0.9)
        self.au_mot("Une tendance décrit")
        r = self.col(self.bloc(["Une tendance décrit,", "elle ne prouve pas."], 38, JAUNE_TITRE), -1.45)
        self.play(FadeIn(r, scale=0.8), run_time=0.5)
        self.insister(r, 1.07, 0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (Tunis) ─────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage(extra=1)
        fig = VGroup(n.fond, *n.ronds[:9])
        v = n.verticale(37)

        def montrer(s):
            s.play(Create(v), FadeIn(n.lu_x(37), scale=1.4), run_time=0.6)

        def reponse(s):
            s.play(FadeIn(n.ronds[9], scale=3), FadeIn(self.nom(n, 9, d=UR)), run_time=0.45)
            s.play(FadeIn(n.lu_y(18.4)), Create(n.vers_y(9)), run_time=0.45)

        self.ecran_question("08-question", "08b-reponse", ["Tunis : 37° de latitude.", "Température plausible ?"],
                            ["26 °C", "18 °C", "8 °C"], 1,
                            ["En vrai : 18,4 °C. 26 : l'équateur ;", "8 : plus froid que Paris, plus au nord."],
                            figure=fig, autres_q=montrer, autres_r=reponse, mot_q="Tunis est")

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        n = self.nuage_pret(extra=3)
        self.add(n.ronds[9], self.nom(n, 9, d=UR))
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Kinshasa est à 4")
        q1 = self.col(self.ligne([("1.", AMBRE), ("Kinshasa", WHITE), ("4°", ORANGE_V)], 38), 1.65)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), Create(n.verticale(4)), run_time=0.5)
        self.au_mot("Ottawa à 45")
        q1b = self.col(self.ligne([("ou", WHITE), ("Ottawa", WHITE), ("45°", ORANGE_V)], 38), 1.1)
        self.play(FadeIn(q1b, shift=RIGHT * 0.2), Create(n.verticale(45)), run_time=0.5)
        self.au_mot("la plus chaude")
        q1c = self.col(self.t("La plus chaude ?", 36), 0.5)
        self.play(FadeIn(q1c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Deux : vrai ou faux")
        q2 = self.col(self.bloc(["2. Vrai ou faux : la latitude", "est la seule cause", "de la température ?"], 34),
                      -0.75)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -2.05)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        n = self.nuage_pret(extra=3)
        self.add(n.ronds[9], self.fleche_tendance(n))
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Un : Kinshasa")
        l1 = self.col(self.ligne([("1.", AMBRE), ("Kinshasa", VERT_OK), ("(près de l'équateur)", WHITE)], 34), 1.7)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Create(n.verticale(4)), run_time=0.5)
        self.au_mot("En vrai : 25,3")
        self.play(FadeIn(n.ronds[10], scale=3), FadeIn(self.nom(n, 10, d=UR)), run_time=0.4)
        l2 = self.col(self.ligne([("25,3 °C", VIOLET_CLAIR), ("contre", WHITE)], 36), 1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("6,8 à Ottawa")
        l2b = self.col(self.ligne([("6,8 °C", VIOLET_CLAIR), ("à Ottawa", WHITE)], 36), 0.45)
        self.play(FadeIn(n.ronds[11], scale=3), FadeIn(self.nom(n, 11, d=DR)), FadeIn(l2b), run_time=0.45)
        self.au_mot("Deux : faux")
        l3 = self.col(self.ligne([("2.", AMBRE), ("Faux !", ROUGE_ERREUR)], 42), -0.25)
        self.play(FadeIn(l3, scale=0.7), run_time=0.4)
        self.au_mot("Une tendance montre")
        l4 = self.col(self.bloc(["Elle montre ce qui varie", "ensemble, pas la seule cause."], 34), -1.0)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Antananarivo le prouve")
        self.play(n.allumer(3), FadeIn(self.nom(n, 3, d=DL)), run_time=0.45)
        self.au_mot("son altitude")
        l5 = self.col(self.t("Antananarivo : l'altitude !", 32, AMBRE), -1.8)
        self.play(FadeIn(l5, shift=UP * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        n = self.nuage_pret()
        lignes = self.finale_colonne(figure=n, textes=[("L'allure générale, de gauche", "à droite : croissante,", "décroissante, ou rien."),
                                      ("Pas forcément alignés ; un point", "isolé ne change pas la tendance."),
                                      ("Une tendance décrit un lien,", "elle ne prouve pas une cause.")])
        self.au_mot("je regarde son allure générale")
        self.montrer_ligne(lignes[0], GrowArrow(self.fleche_tendance(n)))
        self.au_mot("Les points ne sont pas forcément")
        self.montrer_ligne(lignes[1], n.allumer(6))
        self.au_mot("Enfin")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_tendance()
        self.ecran_vocabulaire()
        self.ecran_question1()
        self.ecran_ecarts()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsNuageTendancePremiere(StatsNuageTendanceBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"


class StatsNuageTendanceStmg(StatsNuageTendanceBase):
    """Même vidéo pour la STMG : identité et ceinture seulement."""

    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
