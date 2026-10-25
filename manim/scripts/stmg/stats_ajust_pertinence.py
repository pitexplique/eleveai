# stats_ajust_pertinence.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE : 20-ajust-pertinence
# (micro du coach statT_ajust_pertinence : « Apprécier la pertinence d'un
# ajustement affine pour un nuage donné »), AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE (la paysage complète du niveau : la forme, les écarts
# successifs, le piège de la calculatrice, défi corrigé). Short jumeau :
# stats_ajust_pertinence_short.py (ORANGE).
#
# ⭐ Décor et métier : la FINANCE et deux marchés qui grandissent (centres
# d'intérêt : musique, transports) ; une ANALYSTE FINANCIÈRE (problématique :
# choisir le bon modèle avant de conseiller).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 par WebSearch :
#   · abonnés payants (Premium) de Spotify au 1er trimestre, en millions :
#     2019 100 · 2020 130 · 2021 158 · 2022 182 · 2023 210 · 2024 239 · 2025 268
#     (Q1 2025 : formulaire 6-K de Spotify, sec.gov ; série : backlinko.com/spotify-users,
#     d'après les rapports trimestriels de Spotify) ; Q1 2026 : 293 (même série).
#   · voitures particulières 100 % électriques neuves immatriculées en France,
#     en milliers : 2015 17,3 · 2016 21,8 · 2017 24,9 · 2018 31,1 · 2019 42,8 ·
#     2020 110,9 (fiches-auto.fr, d'après Avere-France et CCFA ; consulté le 24/10/2026).
#   Écarts Spotify : 30, 28, 24, 28, 29, 29 ; écarts VE : 4,5 ; 3,1 ; 6,2 ; 11,7 ; 68,1.
#   Droite des moindres carrés VE (x = 0 en 2015) : y ≈ 15,35 x + 3,1 (au-dessus
#   des points de 2017 à 2019, 79,8 contre 110,9 en 2020).
# ⭐ Figure du coach : `fonctionGraphique` (Nuage de stats_lycee_h2_commun.py),
# droite BLEUE (stats_lycee_j1_commun.py). ⛔ PAS D'ÉCART : chaque nombre au mot.
#
# Mapping micro → écrans : statT_ajust_pertinence tpl_1 (le nuage : droite ou
# courbe) → 02, 05, 06, question 07 · tpl_2 (les écarts successifs, sans le
# graphique) → 03, question 04, défi (1).
# Écrans : 00 garde · 01 l'analyste · 02 Spotify · 03 les écarts · 04 QUESTION ·
# 05 les voitures électriques · 06 le piège (la calculatrice) · 07 QUESTION ·
# 08 défi · 08b correction · 09 ce que tu as appris · 10 fin (règle du 19/10).
#
# Voix : manim/voix/stmg-stats-ajust-pertinence.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_pertinence_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_ajust_pertinence.py StatsAjustPertinenceStmg -o eleveai-maths-stmg-stats-ajust-pertinence --media_dir manim/scripts/stmg/media-stats-ajust-pertinence-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/20-ajust-pertinence/eleveai-maths-stmg-stats-ajust-pertinence.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403

AN_S = [2019, 2020, 2021, 2022, 2023, 2024, 2025]
SPOT = [100, 130, 158, 182, 210, 239, 268]
AN_V = [2015, 2016, 2017, 2018, 2019, 2020]
VE = [17.3, 21.8, 24.9, 31.1, 42.8, 110.9]
A_VE, B_VE = 15.349, 3.095  # moindres carrés, x = année − 2015
G = P(-3.45, -0.3)


def note_musique(h=0.9, couleur="#22c55e"):
    """Une double croche dessinée (pas d'emoji)."""
    t1 = Ellipse(width=0.34 * h, height=0.26 * h, fill_color=couleur, fill_opacity=1, stroke_width=0)
    t2 = t1.copy().shift(RIGHT * 0.55 * h + UP * 0.12 * h)
    h1 = Line(t1.get_right() + UP * 0.02, t1.get_right() + UP * 0.8 * h, color=couleur, stroke_width=6)
    h2 = Line(t2.get_right() + UP * 0.02, t2.get_right() + UP * 0.8 * h, color=couleur, stroke_width=6)
    barre = Line(h1.get_end(), h2.get_end(), color=couleur, stroke_width=12)
    return VGroup(t1, t2, h1, h2, barre)


def voiture(l=1.6, couleur="#38bdf8"):
    """Une voiture électrique dessinée : caisse, deux roues, un éclair."""
    caisse = RoundedRectangle(width=l, height=0.38 * l, corner_radius=0.1 * l, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    toit = RoundedRectangle(width=0.55 * l, height=0.3 * l, corner_radius=0.08 * l, fill_color=couleur,
                            fill_opacity=1, stroke_width=0).next_to(caisse, UP, buff=-0.08 * l)
    roues = VGroup(*[Circle(radius=0.12 * l, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=3).move_to(caisse.get_bottom() + RIGHT * dx * l) for dx in (-0.28, 0.28)])
    eclair = Polygon(P(0.02, 0.16), P(-0.08, -0.01), P(0.0, -0.01), P(-0.04, -0.16), P(0.08, 0.03), P(0.0, 0.03),
                     fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).scale(l).move_to(caisse)
    return VGroup(toit, caisse, roues, eclair)


class StatsAjustPertinenceBase(PaysageJ1):
    nom_voix = "stmg-stats-ajust-pertinence"
    fichier_marques = "stats_ajust_pertinence_marques.json"

    def n_spot(self):
        n = Nuage(AN_S, SPOT, 2018, 2026, 0, 300, pas_x=2, pas_y=50, fin_x=1, fin_y=25, largeur=5.6, hauteur=4.2,
                  nom_x="Année", nom_y="Abonnés payants (millions)", fs=24, centre=G)
        return self.cadrer(annees(n))

    def n_ve(self):
        n = Nuage(AN_V, VE, 2014, 2021, 0, 120, pas_x=2, pas_y=20, fin_x=1, fin_y=10, largeur=5.6, hauteur=4.2,
                  nom_x="Année", nom_y="Voitures électriques (milliers)", fs=24, centre=G)
        return self.cadrer(annees(n))

    def pret(self, n):
        self.add(n.fond, *n.ronds)
        return n

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un ajustement affine est-il pertinent ?", self.identite, self.ceinture)
        a = self.n_spot().scale(0.55).move_to(P(-2.4, 0.2))
        b = self.n_ve().scale(0.55).move_to(P(2.0, 0.2))
        self.au_mot("Ajustement affine")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Ce nuage")
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("par une droite")
        self.play(Create(droite(a, 27.643, 100.929 - 27.643 * 2019)), run_time=0.6)
        self.au_mot("ou pas")
        self.play(FadeIn(b), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'analyste ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        self.au_mot("Une analyste financière")
        m = self.t("Analyste financière", 44, BLEU_CALCUL).move_to(P(-3.6, -0.9))
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.5)
        self.au_mot("conseille des investisseurs")
        l0 = self.poser(self.bloc(["Elle conseille", "des investisseurs."], 38), 2.5)
        self.au_mot("le streaming musical")
        nm = note_musique(1.2).move_to(P(-5.0, 1.3))
        l1 = self.poser(self.ligne([("•", AMBRE), ("le streaming musical", WHITE)], 38), 1.2)
        self.play(FadeIn(nm, scale=0.5), run_time=0.4)
        self.au_mot("et la voiture électrique")
        vo = voiture(1.8).move_to(P(-2.4, 1.2))
        l2 = self.poser(self.ligne([("•", AMBRE), ("la voiture électrique", WHITE)], 38), 0.4)
        self.play(FadeIn(vo, shift=RIGHT * 0.4), run_time=0.5)
        self.au_mot("chaque nuage suit-il une droite")
        q = self.poser(self.bloc(["Chaque nuage suit-il", "une droite ?"], 40, JAUNE_TITRE), -0.9, "pop")
        self.insister(q, 1.08, 0.3)
        self.attendre_voix()

    # ── 02 : Spotify ────────────────────────────────────────────────────────

    def ecran_spotify(self):
        self.ecran("02-spotify")
        n = self.n_spot()
        self.au_mot("Premier nuage")
        self.play(FadeIn(n.fond), run_time=0.5)
        t = self.poser(VGroup(note_musique(0.6), self.t("Spotify", 44, "#22c55e")).arrange(RIGHT, buff=0.25), 2.6)
        self.au_mot("au premier trimestre")
        self.poser(self.bloc(["Abonnés payants,", "au 1er trimestre"], 34), 1.55)
        self.au_mot("2019 à")
        self.play(FadeIn(lu_annee(n, 2019), scale=1.4), run_time=0.3)
        self.au_mot("2025.")
        self.play(FadeIn(lu_annee(n, 2025), scale=1.4), run_time=0.3)
        self.au_mot("100 millions")
        l = self.ligne([("100", VIOLET_CLAIR), ("→", WHITE), ("268 millions", VIOLET_CLAIR)], 38)
        self.col(l, 0.5)
        self.play(FadeIn(n.ronds[0], scale=3), FadeIn(n.lu_y(100)), FadeIn(l[0]), run_time=0.4)
        self.au_mot("268 millions")
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in range(1, 7)], lag_ratio=0.2),
                  FadeIn(n.lu_y(268)), FadeIn(l[1:]), run_time=1.0)
        self.au_mot("les points se rangent")
        d = droite(n, 27.643, 100.929 - 27.643 * 2019).set_opacity(0.6)
        self.play(Create(d), run_time=0.9)
        self.poser(self.bloc(["À l'œil : le long", "d'une droite"], 38, VERT_OK), -0.7, "pop")
        self.attendre_voix()

    # ── 03 : les écarts ─────────────────────────────────────────────────────

    def ecran_ecarts(self):
        self.ecran("03-ecarts")
        n = self.pret(self.n_spot())
        self.au_mot("je calcule les écarts")
        self.titre_col("Les écarts successifs", JAUNE_TITRE, 2.95, 40)
        c = self.col(self.ligne([("130", WHITE), ("−", WHITE), ("100", WHITE), ("=", WHITE), ("30", VERT_OK)], 40), 2.0)
        self.au_mot("130 moins")
        self.play(FadeIn(c[0]), n.allumer(1), run_time=0.3)
        self.au_mot("100, 30")
        self.play(FadeIn(c[1:3]), n.allumer(0), run_time=0.3)
        self.au_mot(", 30.")
        e0 = ecart_txt(n, 0, 1, "+30")
        self.play(FadeIn(c[3:]), FadeIn(e0, scale=1.5), run_time=0.35)
        ec = [28, 24, 28, 29, 29]
        txt = VGroup()
        for k, (v, mot, nn) in enumerate(zip(ec, ["28, 24", "24, 28", "28, 29", "29", "29"], [1, 1, 1, 1, 2])):
            self.au_mot(mot, n=nn)
            e = ecart_txt(n, k + 1, k + 2, f"+{v}", haut=(k % 2 == 1))
            txt.add(e)
            self.play(FadeIn(e, scale=1.5), run_time=0.25)
        self.play(n.eteindre(0), n.eteindre(1), run_time=0.2)
        self.au_mot("Ils restent voisins")
        row = self.poser(self.ligne([(s, VERT_OK) for s in ["30", "28", "24", "28", "29", "29"]], 36, 0.3), 1.05)
        self.au_mot("28 :")
        self.poser(self.ligne([("voisins, autour de", WHITE), ("28", VERT_OK)], 36), 0.25)
        self.au_mot("on ajoute à peu près")
        self.poser(self.bloc(["chaque année, on ajoute", "à peu près la même quantité"], 32), -0.6)
        self.au_mot("Un ajustement affine est pertinent")
        ok = self.poser(self.t("Ajustement affine : pertinent", 36, VERT_OK), -1.5, "pop")
        self.play(Create(droite(n, 27.643, 100.929 - 27.643 * 2019)), run_time=0.6)
        self.insister(ok, 1.07, 0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        tb = Tableau(["1→2", "2→3", "3→4", "4→5"], [[12, 11, 13, 12]], libelles=["Écart"], coin="",
                     largeur_case=1.15, largeur_libelle=1.5, hauteur=0.8, fs=30)
        fig = self.cadrer(tb, droite=0.4, haut=1.2, bas=-1.2)
        self.ecran_question("04-question", "04b-reponse", ["Ces écarts successifs :", "ajustement affine pertinent ?"],
                            ["oui : écarts voisins", "non : pas tous égaux", "impossible sans graphique"], 0,
                            ["Voisins suffit : un nuage réel", "n'est jamais parfaitement aligné."],
                            figure=fig, mots_q=["écarts successifs", "Un ajustement"],
                            mots_choix=["oui, les", "non, les", "impossible"], mots_ph=["Des écarts voisins", "n'est jamais"])

    # ── 05 : les voitures électriques ───────────────────────────────────────

    def ecran_electrique(self):
        self.ecran("05-electrique")
        n = self.n_ve()
        self.au_mot("Deuxième nuage")
        self.play(FadeIn(n.fond), run_time=0.5)
        self.poser(VGroup(voiture(0.9), self.t("Voitures électriques", 38, "#38bdf8")).arrange(RIGHT, buff=0.25), 2.75)
        self.au_mot("en milliers")
        self.poser(self.t("neuves, en France (milliers)", 30, GREY_A), 2.05)
        self.au_mot("17,3 en 2015")
        self.play(FadeIn(n.ronds[0], scale=3), FadeIn(n.lu_y(17.3)), run_time=0.4)
        self.au_mot("42,8 en 2019")
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in range(1, 5)], lag_ratio=0.2),
                  FadeIn(n.lu_y(42.8)), run_time=0.8)
        self.au_mot("110,9")
        self.play(FadeIn(n.ronds[5], scale=4), FadeIn(n.lu_y(110.9)), run_time=0.45)
        self.play(Flash(n.ronds[5], color=AMBRE), run_time=0.4)
        mots = ["4,5, puis", "3,1", "6,2", "11,7", "68,1"]
        vals = ["+4,5", "+3,1", "+6,2", "+11,7", "+68,1"]
        for k, (mot, v) in enumerate(zip(mots, vals)):
            self.au_mot(mot)
            e = ecart_txt(n, k, k + 1, v, ORANGE_RETENUE if k == 4 else VERT_ECART, haut=(k % 2 == 0))
            if k == 4:
                e.next_to(n.ronds[5], LEFT, buff=0.15).shift(DOWN * 0.5)
            self.play(FadeIn(e, scale=1.5), run_time=0.25)
        self.au_mot("Ils grossissent")
        self.poser(self.ligne([("4,5", WHITE), ("…", WHITE), ("68,1", ORANGE_RETENUE), (": ils grossissent", WHITE)],
                              34), 1.2)
        self.au_mot("une courbe qui se redresse")
        courbe = VMobject(color=ORANGE_RETENUE, stroke_width=5).set_points_smoothly(
            [n.p(x, y) for x, y in zip(AN_V, VE)])
        self.play(Create(courbe), run_time=1.0)
        self.poser(self.bloc(["Les points suivent", "une courbe."], 36, ORANGE_RETENUE), 0.2)
        self.au_mot("Un ajustement affine n'est pas")
        self.poser(self.t("Ajustement affine : NON pertinent", 34, ROUGE_ERREUR), -0.85, "pop")
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("06-piege")
        n = self.pret(self.n_ve())
        self.au_mot("Le piège")
        self.titre_col("Le piège :", ROUGE_ERREUR, 2.95, 46)
        self.poser(self.bloc(["croire qu'une droite", "convient toujours"], 38, ROUGE_ERREUR), 2.0)
        self.au_mot("La calculatrice trace")
        d = droite(n, A_VE, B_VE - A_VE * 2015)
        self.poser(self.bloc(["La calculatrice trace une", "droite pour N'IMPORTE", "quel nuage !"], 34), 0.6)
        self.play(Create(d), run_time=0.9)
        self.au_mot("au-dessus des points du milieu")
        r = VGroup(*[Line(n.ronds[i].get_center(), n.p(AN_V[i], A_VE * (AN_V[i] - 2015) + B_VE), color=AMBRE,
                          stroke_width=5) for i in (2, 3, 4)])
        self.play(Create(r), *[Indicate(n.ronds[i], color=AMBRE, scale_factor=1.6) for i in (2, 3, 4)], run_time=0.7)
        self.au_mot("loin sous celui de 2020")
        r5 = Line(n.ronds[5].get_center(), n.p(2020, A_VE * 5 + B_VE), color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(r5), Flash(n.ronds[5], color=ROUGE_ERREUR), run_time=0.6)
        self.au_mot("C'est à toi de juger")
        f = self.poser(self.bloc(["D'abord la FORME,", "ensuite le calcul."], 40, JAUNE_TITRE), -1.0, "pop")
        self.insister(f, 1.07, 0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        tb = Tableau(["1→2", "2→3", "3→4", "4→5"], [[5, 10, 20, 40]], libelles=["Écart"], coin="",
                     largeur_case=1.15, largeur_libelle=1.5, hauteur=0.8, fs=30)
        fig = self.cadrer(tb, droite=0.4, haut=1.2, bas=-1.2)
        self.ecran_question("07-question", "07b-reponse", ["Un nuage monte. Ses écarts :", "ajustement affine pertinent ?"],
                            ["oui : il est croissant", "non : les écarts doublent", "oui, toujours"], 1,
                            ["Croissant ne veut pas dire affine :", "la croissance s'emballe."],
                            figure=fig, mots_q=["Un nuage monte", "Un ajustement"],
                            mots_choix=["oui, car", "non, car", "oui, toujours"], mots_ph=["Croissant", "la croissance"])

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        n = self.pret(self.n_spot())
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer", JAUNE_TITRE, 2.85, 50)
        self.au_mot("2026")
        self.play(FadeIn(lu_annee(n, 2026), scale=1.4), Create(n.verticale(2026)), run_time=0.5)
        self.au_mot("293 millions")
        q1 = self.poser(self.ligne([("1.", AMBRE), ("2026 :", WHITE), ("293 millions", VIOLET_CLAIR)], 36), 1.85)
        self.au_mot("2025 ?")
        self.poser(self.t("Écart avec 2025 ?", 32), 1.2)
        self.au_mot("Le nuage reste")
        self.poser(self.t("Toujours proche d'une droite ?", 32), 0.7)
        self.au_mot("Deux : vrai ou faux")
        self.poser(self.bloc(["2. Vrai ou faux : un nuage", "croissant justifie toujours", "un ajustement affine ?"], 32),
                   -0.45)
        self.pause_defi(-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        n = Nuage(AN_S + [2026], SPOT + [293], 2018, 2026, 0, 300, pas_x=2, pas_y=50, fin_x=1, fin_y=25, largeur=5.6,
                  hauteur=4.2, nom_x="Année", nom_y="Abonnés payants (millions)", fs=24, centre=G)
        n = self.cadrer(annees(n))
        self.add(n.fond, *n.ronds[:7])
        self.titre_col("Correction", JAUNE_TITRE, 2.85, 50)
        c = self.col(self.ligne([("1.", AMBRE), ("293", WHITE), ("−", WHITE), ("268", WHITE), ("=", WHITE)], 38), 1.85)
        self.au_mot("293 moins")
        self.play(FadeIn(n.ronds[7], scale=3), FadeIn(c[:2]), run_time=0.35)
        self.au_mot("268, 25")
        self.play(FadeIn(c[2:]), run_time=0.3)
        self.au_mot("25.")
        r = self.t("25", 38, VERT_OK).next_to(c, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.4), FadeIn(ecart_txt(n, 6, 7, "+25")), run_time=0.35)
        self.au_mot("C'est voisin")
        self.poser(self.bloc(["Voisin des autres écarts :", "toujours une droite."], 32, VERT_OK), 1.0)
        self.play(Create(droite(n, 27.643, 100.929 - 27.643 * 2019)), run_time=0.6)
        self.au_mot("Deux : faux")
        self.poser(self.ligne([("2.", AMBRE), ("Faux !", ROUGE_ERREUR)], 42), 0.05, "pop")
        self.au_mot("Les voitures électriques montent")
        vo = voiture(0.8)
        self.poser(VGroup(vo, self.bloc(["montent, mais écarts", "qui grossissent : une courbe"], 30)).arrange(
            RIGHT, buff=0.25), -0.95)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        n = self.pret(self.n_spot())
        lignes = self.finale_colonne(figure=n, textes=[
            ("D'abord la forme : autour", "d'une droite, ou une courbe ?"),
            ("Les écarts successifs : voisins", "→ affine pertinent ; de plus", "en plus grands → non."),
            ("La calculatrice trace toujours", "une droite : c'est moi qui juge.")])
        self.au_mot("je regarde la forme")
        self.montrer_ligne(lignes[0], Create(droite(n, 27.643, 100.929 - 27.643 * 2019)))
        self.au_mot("Je le confirme")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et la calculatrice")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_spotify()
        self.ecran_ecarts()
        self.ecran_question1()
        self.ecran_electrique()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsAjustPertinenceStmg(StatsAjustPertinenceBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
