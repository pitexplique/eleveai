# stats_interpoler.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE : 24-interpoler
# (micro du coach statT_interpoler : « Interpoler une valeur inconnue à l'aide
# d'un ajustement affine »), AVEC VOIX. Paysage 16:9. CEINTURE VERTE (calculer
# une interpolation, la vérifier, la reconnaître, le piège de x = l'année,
# défi corrigé). Short jumeau : stats_interpoler_short.py (ORANGE).
#
# ⭐ Décor et métier : la DÉMOGRAPHIE de la France (centres d'intérêt :
# histoire-geographie) ; une URBANISTE prépare écoles, logements et transports
# (problématique : estimer ce qu'on n'a pas mesuré).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : population de la France au
# 1er janvier, Insee, Bilan démographique 2025, tableau POP1 « Population au
# 1er janvier et composantes de l'évolution démographique » (fichier
# https://www.insee.fr/fr/statistiques/fichier/8721185/1_Pop_annu_compo_evol.xlsx,
# champ France hors Mayotte jusqu'en 2013) : 2000 60 508 150 · 2005 62 730 537 ·
# 2010 64 612 939 · 2015 66 422 469 · 2020 67 441 850 ; contrôles : 2012
# 65 241 241 · 2017 66 774 482 · 2018 66 992 159 (en millions : 60,5 · 62,7 ·
# 64,6 · 66,4 · 67,4 ; 65,2 ; 66,8 ; 67,0).
#   x = années depuis 2000. Moindres carrés (calculés) : y ≈ 0,350 x + 60,82
#   → y = 0,35 x + 60,8. x = 12 → 65 (vrai 65,2) ; x = 18 → 67,1 (vrai 67,0) ;
#   x = 17 → 66,75 ≈ 66,8 (vrai 66,8). Piège : x = 2012 → 765 ; x = 2018 → 767,1.
# ⭐ Figure du coach : `fonctionGraphique`, droite BLEUE, verticale ORANGE,
# horizontale VIOLETTE. ⛔ PAS D'ÉCART.
#
# Mapping micro → écrans : statT_interpoler tpl_1 (calculer en x intérieur)
# → 03, 04, question 07, défi (1) · tpl_2 (reconnaître une interpolation, y
# compris « avant le premier relevé = extrapolation ») → question 05, défi (2).
# Écrans : 00 garde · 01 l'urbaniste · 02 les données · 03 interpoler 2012 ·
# 04 vérifier (Insee) · 05 QUESTION · 06 le piège (x ≠ l'année) · 07 QUESTION ·
# 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/stmg-stats-interpoler.json (débit −7) ; marques :
# manim/scripts/stmg/stats_interpoler_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_interpoler.py StatsInterpolerStmg -o eleveai-maths-stmg-stats-interpoler --media_dir manim/scripts/stmg/media-stats-interpoler-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/24-interpoler/eleveai-maths-stmg-stats-interpoler.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403

XS = [0, 5, 10, 15, 20]
POP = [60.5, 62.7, 64.6, 66.4, 67.4]
A, B = 0.35, 60.8
G = P(-3.45, -0.3)


def immeubles(h=1.6):
    """Une petite ville dessinée (l'urbanisme)."""
    tours = VGroup()
    for x, hh, c in [(-0.6, 0.9, "#60a5fa"), (-0.2, 1.4, "#93c5fd"), (0.25, 1.1, "#3b82f6"), (0.65, 0.7, "#bfdbfe")]:
        r = Rectangle(width=0.36, height=hh, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        r.move_to(P(x, hh / 2))
        fen = VGroup(*[Square(0.07, fill_color="#fef08a", fill_opacity=1, stroke_width=0).move_to(
            P(x + dx, y)) for dx in (-0.08, 0.08) for y in np.arange(0.2, hh - 0.1, 0.22)])
        tours.add(VGroup(r, fen))
    return tours.scale(h / 1.4)


def frise(annees, couleurs, largeur=5.6):
    """Une frise du temps : 1995 … 2030, les relevés en vert entre 2000 et 2020."""
    x0, x1 = 1993, 2032
    X = lambda a: (a - x0) / (x1 - x0) * largeur - largeur / 2  # noqa: E731
    axe = Arrow(P(-largeur / 2 - 0.1, 0), P(largeur / 2 + 0.2, 0), buff=0, color=WHITE, stroke_width=4)
    zone = Rectangle(width=X(2020) - X(2000), height=0.5, fill_color=VERT_OK, fill_opacity=0.35, stroke_width=0)
    zone.move_to(P((X(2000) + X(2020)) / 2, 0))
    rel = VGroup(*[Dot(P(X(a), 0), radius=0.08, color=ROUGE_PT) for a in range(2000, 2021, 5)])
    lab = VGroup(Text("2000", font_size=24).next_to(P(X(2000), 0), DOWN, buff=0.3),
                 Text("2020", font_size=24).next_to(P(X(2020), 0), DOWN, buff=0.3))
    marques = VGroup(*[VGroup(Triangle(fill_color=c, fill_opacity=1, stroke_width=0).scale(0.12).rotate(PI)
                              .move_to(P(X(a), 0.45)), Text(str(a), font_size=26, color=c).move_to(P(X(a), 0.85)))
                       for a, c in zip(annees, couleurs)])
    return VGroup(zone, axe, rel, lab, marques)


class StatsInterpolerBase(PaysageJ1):
    nom_voix = "stmg-stats-interpoler"
    fichier_marques = "stats_interpoler_marques.json"

    def nuage(self, centre=G):
        n = Nuage(XS, POP, 0, 25, 58, 70, pas_x=5, pas_y=2, fin_x=1, fin_y=1, largeur=5.6, hauteur=4.2,
                  nom_x="Années depuis 2000", nom_y="Population (millions)", fs=24, centre=centre)
        return self.cadrer(n)

    def pret(self, ligne=True):
        n = self.nuage()
        self.add(n.fond, *n.ronds)
        if ligne:
            self.add(droite(n, A, B))
        return n

    def zone(self, n):
        """La bande verte des relevés, de x = 0 à x = 20 (là où l'on interpole)."""
        a, b = n.p(0, n.ymin), n.p(20, n.ymax)
        return Rectangle(width=b[0] - a[0], height=b[1] - a[1], fill_color=VERT_OK, fill_opacity=0.18,
                         stroke_width=0).move_to((a + b) / 2)

    def eq(self, fs=38):
        return self.ligne([("y =", WHITE), ("0,35", AMBRE), ("x +", WHITE), ("60,8", VIOLET_CLAIR)], fs, 0.15)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Interpoler une valeur", self.identite, self.ceinture)
        n = self.nuage().scale(0.62).move_to(P(-0.6, 0.1))
        self.au_mot("Interpoler")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(n.fond), FadeIn(n.ronds),
                  run_time=0.7)
        self.au_mot("entre deux relevés")
        self.play(FadeIn(self.zone(n)), Create(droite(n, A, B)), run_time=0.6)
        self.au_mot("entre les points")
        q = Text("?", font_size=40, color=ORANGE_RETENUE).move_to(n.p(12, A * 12 + B + 1.6))
        self.play(FadeIn(point_droite(n, A, B, 12), scale=2), FadeIn(q, shift=DOWN * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'urbaniste ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        self.au_mot("Une urbaniste")
        v = immeubles(1.8).move_to(P(-3.6, 0.9))
        m = self.t("Urbaniste", 48, BLEU_CALCUL).move_to(P(-3.6, -0.9))
        self.play(LaggedStart(*[GrowFromEdge(t, DOWN) for t in v], lag_ratio=0.2), FadeIn(m, shift=UP * 0.2),
                  run_time=0.8)
        self.au_mot("les écoles")
        self.poser(self.bloc(["Elle prépare les écoles,", "les logements, les transports."], 36), 2.45)
        self.au_mot("la population de la France")
        self.poser(self.bloc(["Il lui faut la population", "de la France."], 38, JAUNE_TITRE), 1.0)
        l = self.col(self.ligne([("Mais : un relevé tous les", WHITE), ("5 ans", ORANGE_V)], 34), -0.25)
        self.reveler([(l[0], "un relevé"), (l[1], "5 ans")])
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.3)
        self.au_mot("d'après l'Insee")
        self.poser(self.t("Au 1er janvier (Insee)", 34, GREY_A), 2.85)
        mots = ["60,5 millions", "62,7", "64,6", "66,4", "67,4 millions"]
        vals = ["60,5", "62,7", "64,6", "66,4", "67,4"]
        lig = VGroup(*[self.t(v, 36, VIOLET_CLAIR) for v in vals]).arrange(RIGHT, buff=0.32)
        self.col(lig, 2.2)
        for i, (mot, t) in enumerate(zip(mots, lig)):
            self.au_mot(mot)
            self.play(FadeIn(n.ronds[i], scale=3), FadeIn(t, shift=UP * 0.15), run_time=0.3)
        l = self.col(self.ligne([("x", ORANGE_V), (": années depuis", WHITE), ("2000", WHITE)], 34), 1.4)
        self.au_mot("En abscisse")
        self.play(FadeIn(l[:2]), Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.2), run_time=0.5)
        self.reveler([(l[2], "2000. La")])
        self.au_mot("La droite d'ajustement")
        self.play(Create(droite(n, A, B)), run_time=0.7)
        e = self.col(self.eq(44), 0.4)
        self.au_mot("y égale")
        self.play(FadeIn(e[0]), run_time=0.2)
        self.reveler([(e[1:3], "0,35 x"), (e[3], "60,8.")])
        self.play(Create(self.encadrer(e)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : interpoler 2012 ────────────────────────────────────────────────

    def ecran_interpoler(self):
        self.ecran("03-interpoler")
        n = self.pret()
        self.au_mot("2012 ?")
        self.poser(self.ligne([("2012 :", WHITE), ("? millions", ORANGE_RETENUE)], 38), 2.75)
        self.au_mot("entre 2000 et 2020")
        self.play(FadeIn(self.zone(n)), run_time=0.5)
        self.au_mot("c'est interpoler")
        t = self.poser(self.bloc(["Entre les relevés :", "INTERPOLER"], 38, VERT_OK), 1.8, "pop")
        self.insister(t[1], 1.15, 0.3)
        l1 = self.col(self.ligne([("y =", WHITE), ("0,35", AMBRE), ("×", WHITE), ("12", ORANGE_V), ("+", WHITE),
                                  ("60,8", VIOLET_CLAIR)], 38), 0.55)
        l2 = self.col(self.ligne([("y =", WHITE), ("4,2", WHITE), ("+", WHITE), ("60,8", VIOLET_CLAIR), ("=", WHITE),
                                  ("65", VIOLET_CLAIR)], 38), -0.3)
        v, h = lecture(n, A, B, 12)
        self.reveler([(l1[0], "Je remplace"), (l1[1:3], "0,35 fois"), (VGroup(l1[3], n.lu_x(12), v), "12, 4,2"),
                      (l2[:2], "4,2, plus"), (VGroup(l1[4:], l2[2:4]), "60,8 :")])
        self.au_mot("65 millions")
        self.play(FadeIn(l2[4:], scale=1.3), FadeIn(point_droite(n, A, B, 12), scale=2), Create(h),
                  FadeIn(n.lu_y(65)), run_time=0.5)
        self.attendre_voix()

    # ── 04 : vérifier ───────────────────────────────────────────────────────

    def ecran_verifier(self):
        self.ecran("04-verifier")
        n = self.pret()
        self.add(self.zone(n), point_droite(n, A, B, 12))
        self.poser(self.ligne([("Estimation :", WHITE), ("point bleu", BLEU_CLAIR)], 36), 2.6)
        l = self.col(self.ligne([("Insee :", WHITE), ("65,2", VERT_OK), ("en 2012", WHITE)], 38), 1.85)
        vrai = Dot(n.p(12, 65.24), radius=0.1, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        self.reveler([(l[0], "l'Insee"), (VGroup(l[1], vrai), "65,2 millions"), (l[2], "2012.")])
        self.au_mot("0,2 million")
        self.poser(self.ligne([("Écart :", WHITE), ("0,2 million", AMBRE)], 38), 1.1)
        self.play(Flash(vrai, color=VERT_OK), run_time=0.4)
        self.au_mot("Entre les relevés")
        self.poser(self.bloc(["Entre les relevés, la", "tendance est bien connue"], 34), 0.15)
        self.au_mot("l'interpolation est l'estimation la plus fiable")
        f = self.poser(self.bloc(["Interpolation :", "l'estimation la plus fiable"], 36, VERT_OK), -0.95, "pop")
        self.insister(f, 1.06, 0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        fr_ = frise([2012, 2030, 1995], [VERT_OK, ORANGE_RETENUE, ORANGE_RETENUE])
        self.cadrer(fr_, droite=0.3, haut=1.2, bas=-1.0)
        zone, axe, rel, lab, marques = fr_
        jouer = lambda m: (lambda sc: sc.play(FadeIn(m, shift=DOWN * 0.1), run_time=0.25))  # noqa: E731
        self.ecran_question("05-question", "05b-reponse", ["Relevés de 2000 à 2020.", "Laquelle est une interpolation ?"],
                            ["la population en 2012", "la population en 2030", "la population en 1995"], 0,
                            ["2012 est entre les relevés ;", "1995, avant : on en sort aussi."],
                            figure=VGroup(zone, axe, rel), mots_q=["2020. Laquelle", "Laquelle"],
                            gestes_q={0: [("2000 à", jouer(lab[0])), ("2020. Laquelle", jouer(lab[1]))]},
                            mots_choix=["2012.", "2030.", "1995."], gestes_choix=[jouer(m) for m in marques],
                            mots_ph=["2012 est", "1995 avant"])

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("06-piege")
        n = self.pret()
        self.au_mot("Le piège")
        self.titre_col("Le piège :", ROUGE_ERREUR, 2.95, 46)
        self.poser(self.t("remplacer x par l'année", 38, ROUGE_ERREUR), 2.2)
        l0 = self.col(self.ligne([("x", ORANGE_V), ("= années depuis", WHITE), ("2000", WHITE)], 36), 1.35)
        self.au_mot("x compte les années")
        self.play(FadeIn(l0[:2]), Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.2), run_time=0.5)
        self.reveler([(l0[2], "2000. Pour")])
        l = self.col(self.ligne([("2012", WHITE), ("→", WHITE), ("x = 12", VERT_OK)], 40), 0.55)
        self.reveler([(l[:2], "2012, x"), (l[2], "12, pas")])
        faux = self.ligne([("(pas", "#f87171"), ("x = 2012", "#f87171"), (")", "#f87171")], 32, 0.1)
        self.col(faux, -0.1)
        self.reveler([(faux, "pas 2012")])
        l3 = self.col(self.ligne([("x = 2012", WHITE), ("→", WHITE), ("765", "#f87171")], 36), -0.85)
        self.reveler([(l3[:2], "Avec 2012"), (l3[2], "765")])
        self.au_mot("absurde")
        a = self.poser(self.t("765 millions d'habitants ? absurde !", 32, ROUGE_ERREUR), -1.55, "pop")
        self.insister(a, 1.08, 0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage()
        fig = VGroup(n.fond, *n.ronds, droite(n, A, B))

        def reponse(s):
            v, h = lecture(n, A, B, 18)
            s.play(Create(v), Create(h), FadeIn(n.lu_y(67.1)), run_time=0.5)

        self.ecran_question("07-question", "07b-reponse", ["y = 0,35x + 60,8 :", "population en 2018 ?"],
                            ["67,1 millions", "767,1 millions", "61,15 millions"], 0,
                            ["x = 18 : 6,3 + 60,8 = 67,1.", "Le vrai chiffre : 67 millions."],
                            figure=fig, autres_r=reponse, mots_q=["60,8, quelle", "2018 ?"],
                            mots_choix=["67,1 millions", "767,1", "61,15"], mots_ph=["67,1. B", "67 millions"])

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        n = self.pret()
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer", JAUNE_TITRE, 2.85, 50)
        self.au_mot("2017.")
        self.poser(self.ligne([("1.", AMBRE), ("Population en 2017 ?", WHITE)], 36), 1.8)
        b = self.col(self.bloc(["2. Et en 2030 : interpolation", "ou extrapolation ?"], 34), 0.8)
        self.reveler([(b[0], "2030,"), (b[1], "ou une extrapolation")])
        self.pause_defi(-0.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        n = self.pret()
        self.titre_col("Correction", JAUNE_TITRE, 2.85, 50)
        self.au_mot("17. 0")
        self.poser(self.ligne([("1.", AMBRE), ("x = 17", ORANGE_V)], 36), 2.1)
        l1 = self.col(self.ligne([("5,95 +", WHITE), ("60,8", WHITE), ("≈", WHITE), ("66,8", VIOLET_CLAIR)], 36), 1.4)
        v, h = lecture(n, A, B, 17)
        self.reveler([(l1[0], "5,95"), (l1[1], "60,8 :"), (VGroup(l1[2:], v, h), "66,8 millions. Le")])
        self.au_mot("66,8 millions !")
        self.poser(self.ligne([("Insee :", WHITE), ("66,8", VERT_OK), ("!", VERT_OK)], 36), 0.7)
        self.play(FadeIn(Dot(n.p(17, 66.77), radius=0.1, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2),
                         scale=3), run_time=0.35)
        self.au_mot("2030 est")
        self.poser(self.ligne([("2.", AMBRE), ("2030 : après le dernier relevé", WHITE)], 32), -0.15)
        self.au_mot("c'est une extrapolation")
        self.poser(self.t("→ une EXTRAPOLATION", 36, ORANGE_RETENUE), -0.85, "pop")
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        n = self.nuage()
        self.add(n.fond, *n.ronds)
        lignes = self.finale_colonne(figure=n, textes=[
            ("Interpoler : estimer entre le", "premier et le dernier relevé."),
            ("Je remplace x par la bonne", "valeur (pas forcément l'année)."),
            ("C'est l'estimation la plus", "fiable : on reste dans les données.")])
        self.add(droite(n, A, B))  # après le recadrage de la figure
        self.au_mot("Interpoler, c'est")
        self.montrer_ligne(lignes[0], FadeIn(self.zone(n)))
        self.au_mot("Je remplace x")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et c'est l'estimation")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_interpoler()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsInterpolerStmg(StatsInterpolerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
