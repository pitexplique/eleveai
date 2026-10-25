# stats_extrapoler.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE : 25-extrapoler
# (micro du coach statT_extrapoler : « Extrapoler une valeur inconnue à l'aide
# d'un ajustement affine »), AVEC VOIX. Paysage 16:9. CEINTURE VERTE (prolonger,
# vérifier, reconnaître, le seuil, le piège du trop loin, défi corrigé).
# Short jumeau : stats_extrapoler_short.py (ORANGE).
#
# ⭐ Décor et métier : l'AUTOMOBILE et la fin du diesel (centres d'intérêt :
# transports, nature-ecologie) ; un RESPONSABLE DES VENTES chez un constructeur
# (problématique : prévoir pour décider de la production).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 par WebSearch : part du diesel
# (gazole) dans les immatriculations de voitures particulières neuves en France,
# d'après le CCFA (Comité des constructeurs français d'automobiles) :
#   2012 73 % (le pic, ornikar.com et ccfa.fr) · 2016 52,1 % (europe1.fr) ·
#   2018 39 % (ornikar.com, d'après le CCFA) · 2019 34,1 % et 2020 30,6 %
#   (connaissancedesenergies.org, AFP, d'après le CCFA) · 2024 7 % (ccfa.fr,
#   « le diesel ne représentait plus que 7 % des ventes »).
#   x = années depuis 2012 (0, 4, 6, 7, 8). Moindres carrés (calculés) :
#   a ≈ −5,452, b ≈ 73,02 → y = −5,5 x + 73. x = 12 (2024) → 7 (vrai 7 %) ;
#   y = 10 → x ≈ 11,45 → rang 12 (2024) ; x = 18 (2030) → −26 ; x = 10 → 18 ;
#   y = 0 → x ≈ 13,27 → rang 14 (2026) → −4 %.
# ⭐ Figure du coach : `fonctionGraphique`, droite BLEUE prolongée en pointillé
# au-delà des relevés, verticale ORANGE, horizontale VIOLETTE. ⛔ PAS D'ÉCART.
#
# Mapping micro → écrans : statT_extrapoler tpl_1 (valeur au-delà) → 03, 04,
# défi (1) · tpl_2 (le seuil, premier rang entier) → 06, défi (2) · reconnaître
# (statT_interpoler tpl_2, côté extrapolation) → question 05 · vers statT_limites
# → 07, question 08.
# Écrans : 00 garde · 01 le responsable des ventes · 02 les données · 03
# extrapoler 2024 · 04 vérifier · 05 QUESTION · 06 le seuil de 10 % · 07 le
# piège (trop loin) · 08 QUESTION · 09 défi · 09b correction · 10 ce que tu as
# appris · 11 fin.
#
# Voix : manim/voix/stmg-stats-extrapoler.json (débit −7) ; marques :
# manim/scripts/stmg/stats_extrapoler_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_extrapoler.py StatsExtrapolerStmg -o eleveai-maths-stmg-stats-extrapoler --media_dir manim/scripts/stmg/media-stats-extrapoler-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/25-extrapoler/eleveai-maths-stmg-stats-extrapoler.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403

XS = [0, 4, 6, 7, 8]
DIESEL = [73, 52.1, 39, 34.1, 30.6]
A, B = -5.5, 73.0
G = P(-3.45, -0.3)


def pompe(h=1.6, couleur="#facc15"):
    """Une pompe à carburant dessinée."""
    corps = RoundedRectangle(width=0.7 * h, height=h, corner_radius=0.08 * h, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    ecran = Rectangle(width=0.45 * h, height=0.25 * h, fill_color="#1f2937", fill_opacity=1, stroke_width=0)
    ecran.move_to(corps.get_top() + DOWN * 0.25 * h)
    tuyau = VMobject(color=WHITE, stroke_width=6).set_points_smoothly(
        [corps.get_right() + UP * 0.2 * h, corps.get_right() + RIGHT * 0.25 * h + UP * 0.1 * h,
         corps.get_right() + RIGHT * 0.3 * h + DOWN * 0.3 * h])
    lab = Text("DIESEL", font_size=30, color="#1f2937", weight=BOLD)
    lab.scale_to_fit_width(0.55 * h).move_to(corps).shift(DOWN * 0.15 * h)
    return VGroup(corps, ecran, tuyau, lab)


class StatsExtrapolerBase(PaysageJ1):
    nom_voix = "stmg-stats-extrapoler"
    fichier_marques = "stats_extrapoler_marques.json"

    def nuage(self, loin=False):
        if loin:
            n = Nuage(XS, DIESEL, 0, 20, -30, 80, pas_x=2, pas_y=10, fin_x=1, fin_y=10, largeur=5.6, hauteur=4.2,
                      nom_x="Années depuis 2012", nom_y="Part du diesel (%)", fs=24, centre=G)
        else:
            n = Nuage(XS, DIESEL, 0, 14, 0, 80, pas_x=2, pas_y=10, fin_x=1, fin_y=5, largeur=5.6, hauteur=4.2,
                      nom_x="Années depuis 2012", nom_y="Part du diesel (%)", fs=24, centre=G)
        return self.cadrer(n)

    def droites(self, n):
        """La droite, pleine sur les relevés (0 à 8), en pointillé au-delà."""
        plein = droite(n, A, B, x0=0, x1=8)
        apres = DashedLine(n.p(8, A * 8 + B), plein.get_end(), color=BLEU_D, stroke_width=6)
        fin = droite(n, A, B, x0=8)
        apres = DashedLine(fin.get_start(), fin.get_end(), color=BLEU_D, stroke_width=6, dash_length=0.12)
        return plein, apres

    def pret(self, loin=False, ligne=True):
        n = self.nuage(loin)
        self.add(n.fond, *n.ronds)
        if ligne:
            self.add(*self.droites(n))
        return n

    def zero(self, n):
        return DashedLine(n.p(0, 0), n.p(n.xmax, 0), color=ROUGE_ERREUR, stroke_width=5, dash_length=0.12)

    def eq(self, fs=38):
        return self.ligne([("y =", WHITE), ("−5,5", AMBRE), ("x +", WHITE), ("73", VIOLET_CLAIR)], fs, 0.15)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Extrapoler une valeur", self.identite, self.ceinture)
        n = self.nuage().scale(0.62).move_to(P(-0.6, 0.1))
        plein, apres = self.droites(n)
        self.au_mot("Extrapoler")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(n.fond), FadeIn(n.ronds),
                  run_time=0.7)
        self.play(Create(plein), run_time=0.5)
        self.au_mot("au-delà des relevés")
        self.play(Create(apres), run_time=0.8)
        self.au_mot("Jusqu'où")
        q = Text("?", font_size=44, color=ORANGE_RETENUE).move_to(n.p(13, 25))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 01 : le responsable des ventes ──────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        self.au_mot("Un responsable des ventes")
        p = pompe(1.8).move_to(P(-3.8, 1.0))
        m = self.t("Responsable des ventes", 40, BLEU_CALCUL).move_to(P(-3.4, -0.9))
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(m, shift=UP * 0.2), run_time=0.6)
        self.au_mot("quels moteurs produire")
        self.poser(self.bloc(["Chez un constructeur :", "quels moteurs produire ?"], 38), 2.4)
        self.au_mot("la part du diesel")
        self.poser(self.bloc(["La part du diesel dans les", "voitures neuves va-t-elle", "continuer de baisser ?"], 36,
                             JAUNE_TITRE), 0.75)
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.3)
        self.au_mot("comité des constructeurs")
        self.poser(self.t("Source : CCFA (constructeurs)", 30, GREY_A), 2.9)
        txts = [("73 %", "en 2012"), ("52,1 %", "en 2016"), ("39 %", "en 2018"), ("34,1 %", "en 2019"),
                ("30,6 %", "en 2020")]
        mots = [("73 %", "2012,"), ("52,1 %", "2016,"), ("39 %", "2018,"), ("34,1 %", "2019 et"), ("30,6 %", "2020.")]
        cases = [self.ligne([(v, VIOLET_CLAIR), (a, WHITE)], 32) for v, a in txts]
        grille = VGroup(VGroup(*cases[:3]).arrange(DOWN, aligned_edge=LEFT, buff=0.12),
                        VGroup(*cases[3:]).arrange(DOWN, aligned_edge=LEFT, buff=0.12))
        grille.arrange(RIGHT, aligned_edge=UP, buff=0.5)
        self.col(grille, 1.75)
        for i, ((m1, m2), t) in enumerate(zip(mots, cases)):
            self.reveler([(VGroup(t[0], n.ronds[i]), m1), (t[1], m2)])
        l = self.col(self.ligne([("x", ORANGE_V), (": années depuis", WHITE), ("2012", WHITE)], 34), 0.55)
        self.au_mot("En abscisse")
        self.play(FadeIn(l[:2]), Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.2), run_time=0.5)
        self.reveler([(l[2], "2012. La")])
        self.au_mot("La droite d'ajustement")
        self.play(Create(self.droites(n)[0]), run_time=0.7)
        e = self.col(self.eq(44), -0.35)
        self.au_mot("y égale")
        self.play(FadeIn(e[0]), run_time=0.2)
        self.reveler([(e[1:3], "moins 5,5"), (e[3], "73.")])
        self.play(Create(self.encadrer(e)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : extrapoler 2024 ────────────────────────────────────────────────

    def ecran_extrapoler(self):
        self.ecran("03-extrapoler")
        n = self.pret(ligne=False)
        plein, apres = self.droites(n)
        self.add(plein)
        self.au_mot("2024 ?")
        self.poser(self.ligne([("2024 :", WHITE), ("? %", ORANGE_RETENUE)], 38), 2.75)
        self.au_mot("2024 est au-delà")
        self.play(Create(n.verticale(8, GREY_B)), run_time=0.4)
        self.au_mot("Prolonger la droite")
        self.play(Create(apres), run_time=0.8)
        t = self.poser(self.bloc(["Au-delà des relevés :", "EXTRAPOLER"], 38, ORANGE_RETENUE), 1.8, "pop")
        self.insister(t[1], 1.15, 0.3)
        l1 = self.col(self.ligne([("y =", WHITE), ("−5,5", AMBRE), ("×", WHITE), ("12", ORANGE_V), ("+", WHITE),
                                  ("73", VIOLET_CLAIR)], 38), 0.55)
        l2 = self.col(self.ligne([("y =", WHITE), ("−66", WHITE), ("+", WHITE), ("73", VIOLET_CLAIR), ("=", WHITE),
                                  ("7 %", VIOLET_CLAIR)], 38), -0.3)
        v, h = lecture(n, A, B, 12)
        self.reveler([(VGroup(l1[:3]), "Moins 5,5 fois"), (VGroup(l1[3], n.lu_x(12), v), "12, moins"),
                      (l2[:2], "66, plus"), (VGroup(l1[4:], l2[2:4]), "73 :")])
        self.au_mot("7 %.")
        self.play(FadeIn(l2[4:], scale=1.3), FadeIn(point_droite(n, A, B, 12), scale=2), Create(h),
                  FadeIn(n.lu_y(7)), run_time=0.5)
        self.attendre_voix()

    # ── 04 : vérifier ───────────────────────────────────────────────────────

    def ecran_verifier(self):
        self.ecran("04-verifier")
        n = self.pret()
        self.add(point_droite(n, A, B, 12))
        self.au_mot("Et en vrai")
        self.poser(self.t("Et en vrai ?", 42, JAUNE_TITRE), 2.75)
        vrai = Dot(n.p(12, 7), radius=0.11, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        l = self.col(self.ligne([("2024 (CCFA) :", WHITE), ("7 %", VERT_OK)], 38), 1.95)
        self.reveler([(l[0], "2024, le"), (VGroup(l[1], vrai), "7 % des")])
        self.play(Flash(vrai, color=VERT_OK), run_time=0.4)
        self.au_mot("Prévision réussie")
        self.poser(self.t("Prévision réussie !", 40, VERT_OK), 1.15, "pop")
        self.au_mot("4 ans après")
        fl = DoubleArrow(n.p(8, 62), n.p(12, 62), buff=0, color=ORANGE_RETENUE, stroke_width=5,
                         max_tip_length_to_length_ratio=0.15)
        self.play(GrowFromCenter(fl), run_time=0.4)
        self.poser(self.bloc(["4 ans après le dernier relevé :", "un pari plus risqué", "qu'une interpolation"], 32),
                   -0.05)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()
        a, b = n.p(0, n.ymin), n.p(8, n.ymax)
        z = Rectangle(width=b[0] - a[0], height=b[1] - a[1], fill_color=VERT_OK, fill_opacity=0.15,
                      stroke_width=0).move_to((a + b) / 2)
        fig = VGroup(n.fond, z, *n.ronds, *self.droites(n))
        self.ecran_question("05-question", "05b-reponse", ["Relevés de 2012 à 2020.", "Laquelle est une extrapolation ?"],
                            ["la part en 2015", "la part en 2023", "la part en 2019"], 1,
                            ["2023 : après le dernier relevé.", "2015 est entre, 2019 en est un."],
                            figure=fig, mots_q=["2020. Laquelle", "Laquelle"], mots_choix=["2015.", "2023.", "2019."],
                            mots_ph=["2023 est", "2019 en"])

    # ── 06 : le seuil de 10 % ───────────────────────────────────────────────

    def ecran_seuil(self):
        self.ecran("06-seuil")
        n = self.pret()
        self.au_mot("10 % ?")
        self.poser(self.ligne([("Moins de", WHITE), ("10 %", VIOLET_CLAIR), ("à partir de quand ?", WHITE)], 34), 2.85)
        self.play(Create(n.horizontale(10)), FadeIn(n.lu_y(10)), run_time=0.5)
        l1 = self.col(self.ligne([("−5,5x +", WHITE), ("73 =", WHITE), ("10", VIOLET_CLAIR)], 38), 2.0)
        self.reveler([(l1[0], "moins 5,5 x"), (l1[1], "73 égale"), (l1[2], "10, donc")])
        l2 = self.col(self.ligne([("x =", ORANGE_V), ("63 ÷", WHITE), ("5,5", WHITE), ("≈ 11,5", ORANGE_V)], 38), 1.15)
        p = point_droite(n, A, B, 63 / 5.5)
        dl = DashedLine(n.p(63 / 5.5, 10), n.p(63 / 5.5, 0), color=ORANGE_V, stroke_width=5, dash_length=0.1)
        self.reveler([(l2[:2], "63 divisé"), (l2[2], "5,5, environ"), (VGroup(l2[3], p, dl), "11,5.")])
        self.au_mot("La droite descend")
        self.poser(self.bloc(["La droite descend : sous 10 %", "juste après 11,5"], 32), 0.25)
        r = self.col(self.ligne([("rang", WHITE), ("12", ORANGE_V), ("→", WHITE), ("2024", VERT_OK)], 40), -0.7)
        self.reveler([(VGroup(r[:2], n.lu_x(12)), "12 :"), (r[2:], "2024.")])
        self.insister(r, 1.1, 0.3)
        self.attendre_voix()

    # ── 07 : le piège (trop loin) ───────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("07-piege")
        n = self.pret(loin=True)
        self.add(self.zero(n))
        self.au_mot("Le piège")
        self.titre_col("Le piège :", ROUGE_ERREUR, 2.95, 46)
        self.poser(self.t("prolonger trop loin", 40, ROUGE_ERREUR), 2.2)
        l0 = self.col(self.ligne([("2030 :", WHITE), ("x = 18", ORANGE_V)], 36), 1.4)
        self.reveler([(l0[0], "2030,"), (VGroup(l0[1], n.lu_x(18), n.verticale(18)), "18. Moins")])
        l = self.col(self.ligne([("−99", WHITE), ("+ 73 =", WHITE), ("−26 %", "#f87171")], 38), 0.6)
        p = point_droite(n, A, B, 18, ROUGE_ERREUR)
        self.reveler([(l[0], "99, plus"), (l[1], "73 :"), (VGroup(l[2], p), "26 %")])
        self.play(Flash(p, color=ROUGE_ERREUR), run_time=0.4)
        self.au_mot("c'est impossible")
        self.poser(self.t("Un pourcentage négatif : impossible !", 30, ROUGE_ERREUR), -0.2)
        self.au_mot("Plus on s'éloigne")
        self.poser(self.bloc(["Plus on s'éloigne des relevés,", "moins on peut croire la droite."], 32,
                             JAUNE_TITRE), -1.05, "pop")
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage(loin=True)
        fig = VGroup(n.fond, *n.ronds, *self.droites(n), self.zero(n), point_droite(n, A, B, 18, ROUGE_ERREUR))
        self.ecran_question("08-question", "08b-reponse", ["Le modèle annonce −26 %", "de diesel en 2030.", "Que conclure ?"],
                            ["le calcul est faux", "trop loin : modèle dépassé", "moins de 0 voiture diesel"],
                            1, ["Le calcul est juste : c'est le", "modèle qui ne tient plus."],
                            figure=fig, mots_q=["26 %", "2030.", "Que conclure"],
                            mots_choix=["le calcul", "on est allé", "il y aura"],
                            mots_ph=["Le calcul est juste", "modèle qui"])

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        n = self.pret(loin=True)
        self.add(self.zero(n))
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer", JAUNE_TITRE, 2.85, 50)
        self.au_mot("2022 ?")
        self.poser(self.ligne([("1.", AMBRE), ("Prévision pour 2022 ?", WHITE)], 36), 1.8)
        b = self.col(self.bloc(["2. À partir de quelle année", "un pourcentage négatif ?"], 34), 0.8)
        self.reveler([(b[0], "Deux :"), (b[1], "un pourcentage négatif")])
        self.pause_defi(-0.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        n = self.pret(loin=True)
        self.add(self.zero(n))
        self.titre_col("Correction", JAUNE_TITRE, 2.85, 50)
        l1 = self.col(self.ligne([("1.", AMBRE), ("x = 10 :", ORANGE_V), ("−55", WHITE), ("+ 73", WHITE),
                                  ("= 18 %", VIOLET_CLAIR)], 32), 2.05)
        v, h = lecture(n, A, B, 10)
        self.reveler([(l1[:2], "10. Moins"), (l1[2], "55, plus"), (l1[3], "73 :"), (VGroup(l1[4], v, h), "18 %")])
        l2 = self.col(self.ligne([("2.", AMBRE), ("y = 0 :", WHITE), ("73 ÷", WHITE), ("5,5", WHITE),
                                  ("≈ 13,3", ORANGE_V)], 34), 1.15)
        p0 = point_droite(n, A, B, 73 / 5.5)
        self.reveler([(l2[:2], "0 pour"), (l2[2], "73 divisé"), (l2[3], "5,5, environ"), (VGroup(l2[4], p0), "13,3.")])
        l3 = self.col(self.ligne([("rang", WHITE), ("14", ORANGE_V), ("→ 2026 :", WHITE), ("−4 %", "#f87171")], 36), 0.35)
        p = point_droite(n, A, B, 14, ROUGE_ERREUR)
        dl = DashedLine(n.p(14, -4), n.p(14, n.ymin), color=ORANGE_V, stroke_width=5, dash_length=0.1)
        self.reveler([(VGroup(l3[:2], dl), "14, en"), (l3[2], "2026,"), (VGroup(l3[3], p), "4 %")])
        self.au_mot("impossible")
        self.poser(self.t("impossible !", 40, ROUGE_ERREUR), -0.45, "pop")
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        n = self.nuage()
        self.add(n.fond, *n.ronds)
        lignes = self.finale_colonne(figure=n, textes=[
            ("Extrapoler : prolonger la droite", "au-delà des relevés (avant", "ou après)."),
            ("Même calcul : je remplace x.",),
            ("La confiance baisse avec la", "distance ; un résultat impossible :", "on est allé trop loin.")])
        self.add(*self.droites(n))  # après le recadrage de la figure
        self.au_mot("Extrapoler, c'est")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le calcul est le même")
        self.montrer_ligne(lignes[1], *[Create(m) for m in lecture(n, A, B, 12)])
        self.au_mot("Mais la confiance")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_extrapoler()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_seuil()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsExtrapolerStmg(StatsExtrapolerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
