# stats_limites.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE : 26-limites
# (micro du coach statT_limites : « Discuter les limites d'une extrapolation »),
# AVEC VOIX. Paysage 16:9. CEINTURE BLEUE (l'esprit critique que le BO de
# terminale STMG exige : valeur impossible, premier rang entier, un VRAI cas où
# l'extrapolation échoue, mesure de l'erreur). Short jumeau : stats_limites_short.py (ORANGE).
#
# ⭐ Décor et métier : le NUMÉRIQUE, l'équipement en smartphone (centres
# d'intérêt : reseaux-sociaux, technologie-ia) ; une CHARGÉE D'ÉTUDES MARKETING
# d'un opérateur (problématique : juger une prévision).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 par WebSearch : part des Français
# (12 ans et plus) qui possèdent un smartphone, Baromètre du numérique
# (Crédoc / Arcep / CGE ; présentation Arcep 2019,
# https://www.arcep.fr/uploads/tx_gspublication/presentation-barometre-num-2019.pdf) :
# 2011 17 · 2012 28 · 2013 39 · 2014 46 · 2015 58 · 2016 65 · 2017 73 · 2018 75 ·
# 2019 77 ; 2020 84 et 2022 87 (Baromètre du numérique 2022, Arcom/Arcep ;
# economie.gouv.fr, themedialeader.com). Pas d'édition 2021.
#   x = années depuis 2011 (0 à 5 pour l'ajustement 2011-2016). Moindres carrés
#   (calculés) : a ≈ 9,63, b ≈ 18,10 → y = 9,6 x + 18,1.
#   x = 8 (2019) → 94,9 (vrai 77) ; x = 9 (2020) → 104,5 (vrai 84) ; x = 11 (2022)
#   → 123,7 (vrai 87) ; y = 100 → x ≈ 8,53 → premier rang entier 9 (2020).
#   L'extrapolation ÉCHOUE pour de vrai : la saturation (plafond de 100 %).
# ⭐ Figure du coach : `fonctionGraphique`, droite BLEUE, verticale ORANGE,
# horizontale VIOLETTE ; zone impossible (> 100 %) en rouge pâle. ⛔ PAS D'ÉCART.
#
# Mapping micro → écrans : statT_limites tpl_1 (premier rang entier où la
# prévision devient impossible) → 03, question 04 · tpl_2 (pourquoi rejeter une
# prévision : impossible, pas mal calculée) → 05, 06, question 07, défi.
# Écrans : 00 garde · 01 la chargée d'études · 02 les données · 03 la prévision
# impossible · 04 QUESTION · 05 la réalité · 06 le piège · 07 QUESTION · 08 défi ·
# 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/stmg-stats-limites.json (débit −7) ; marques :
# manim/scripts/stmg/stats_limites_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_limites.py StatsLimitesStmg -o eleveai-maths-stmg-stats-limites --media_dir manim/scripts/stmg/media-stats-limites-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/26-limites/eleveai-maths-stmg-stats-limites.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403

XS = [0, 1, 2, 3, 4, 5]
SMART = [17, 28, 39, 46, 58, 65]
XV, YV = [8, 9, 11], [77, 84, 87]   # la réalité après 2016 (2019, 2020, 2022)
A, B = 9.6, 18.1
G = P(-3.45, -0.3)


def telephone(h=1.6, couleur="#a78bfa"):
    """Un smartphone dessiné (pas d'emoji)."""
    corps = RoundedRectangle(width=0.5 * h, height=h, corner_radius=0.08 * h, fill_color="#111827", fill_opacity=1,
                             stroke_color=couleur, stroke_width=5)
    ecran = RoundedRectangle(width=0.42 * h, height=0.8 * h, corner_radius=0.04 * h, fill_color=couleur,
                             fill_opacity=0.85, stroke_width=0).move_to(corps).shift(UP * 0.03 * h)
    bulles = VGroup(*[RoundedRectangle(width=0.28 * h, height=0.08 * h, corner_radius=0.03 * h, fill_color=WHITE,
                                       fill_opacity=1, stroke_width=0).move_to(ecran.get_top() + DOWN * (0.15 + 0.15 * k) * h
                                                                               + RIGHT * (0.05 if k % 2 else -0.05) * h)
                      for k in range(4)])
    return VGroup(corps, ecran, bulles)


class StatsLimitesBase(PaysageJ1):
    nom_voix = "stmg-stats-limites"
    fichier_marques = "stats_limites_marques.json"

    def nuage(self):
        n = Nuage(XS, SMART, 0, 12, 0, 130, pas_x=2, pas_y=20, fin_x=1, fin_y=10, largeur=5.6, hauteur=4.2,
                  nom_x="Années depuis 2011", nom_y="Français avec un smartphone (%)", fs=24, centre=G)
        return self.cadrer(n)

    def droites(self, n):
        plein = droite(n, A, B, x0=0, x1=5)
        fin = droite(n, A, B, x0=5)
        return plein, DashedLine(fin.get_start(), fin.get_end(), color=BLEU_D, stroke_width=6, dash_length=0.12)

    def interdit(self, n):
        """La zone impossible, au-dessus de 100 %, et la ligne des 100 %."""
        a, b = n.p(0, 100), n.p(12, 130)
        z = Rectangle(width=b[0] - a[0], height=b[1] - a[1], fill_color=ROUGE_ERREUR, fill_opacity=0.15,
                      stroke_width=0).move_to((a + b) / 2)
        l = DashedLine(n.p(0, 100), n.p(12, 100), color=ROUGE_ERREUR, stroke_width=5, dash_length=0.12)
        return VGroup(z, l)

    def vrais(self, n, k=3):
        return VGroup(*[Dot(n.p(x, y), radius=0.1 * n._k(), fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
                        for x, y in zip(XV[:k], YV[:k])])

    def pret(self, ligne=True, interdit=False):
        n = self.nuage()
        self.add(n.fond)
        if interdit:
            self.add(self.interdit(n))
        self.add(*n.ronds)
        if ligne:
            self.add(*self.droites(n))
        return n

    def eq(self, fs=38):
        return self.ligne([("y =", WHITE), ("9,6", AMBRE), ("x +", WHITE), ("18,1", VIOLET_CLAIR)], fs, 0.15)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les limites d'une extrapolation", self.identite, self.ceinture)
        n = self.nuage().scale(0.62).move_to(P(-0.6, 0.1))
        plein, apres = self.droites(n)
        self.au_mot("Les limites")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(n.fond), FadeIn(n.ronds),
                  run_time=0.7)
        self.au_mot("Une droite")
        self.play(Create(plein), run_time=0.4)
        self.au_mot("pour toujours")
        self.play(Create(apres), FadeIn(self.interdit(n)), run_time=0.8)
        self.attendre_voix(marge=0.8)

    # ── 01 : la chargée d'études ────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        self.au_mot("Une chargée d'études marketing")
        tel = telephone(2.0).move_to(P(-3.7, 1.0))
        m = self.t("Chargée d'études marketing", 36, BLEU_CALCUL).move_to(P(-3.3, -0.9))
        self.play(FadeIn(tel, shift=UP * 0.3), FadeIn(m, shift=UP * 0.2), run_time=0.6)
        self.au_mot("un opérateur de téléphonie")
        self.poser(self.bloc(["Elle travaille pour un", "opérateur de téléphonie."], 38), 2.45)
        self.au_mot("2016,")
        self.poser(self.bloc(["2016 : combien de Français", "auront un smartphone", "dans quelques années ?"], 36,
                             JAUNE_TITRE), 0.8)
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.3)
        self.au_mot("baromètre du numérique")
        self.poser(self.t("Baromètre du numérique (Crédoc, Arcep)", 28, GREY_A), 2.9)
        mots = ["17 %", "28,", "39,", "46,", "58,", "65 % en 2016"]
        lig = VGroup(*[self.t(v, 36, VIOLET_CLAIR) for v in ["17", "28", "39", "46", "58", "65 %"]]).arrange(RIGHT, buff=0.32)
        self.col(lig, 2.25)
        for i, (mot, t) in enumerate(zip(mots, lig)):
            self.au_mot(mot)
            self.play(FadeIn(n.ronds[i], scale=3), FadeIn(t, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Presque une droite")
        self.play(Create(self.droites(n)[0]), run_time=0.7)
        self.poser(self.t("Presque une droite !", 38, VERT_OK), 1.45)
        e = self.col(self.eq(44), 0.55)
        self.au_mot("y égale")
        self.play(FadeIn(e[0]), run_time=0.2)
        self.reveler([(e[1:3], "9,6 x"), (e[3], "18,1,")])
        self.play(Create(self.encadrer(e)), run_time=0.4)
        l = self.col(self.ligne([("x", ORANGE_V), (": années depuis", WHITE), ("2011", WHITE)], 34), -0.4)
        self.reveler([(l[:2], "avec x"), (l[2], "2011.")])
        self.attendre_voix()

    # ── 03 : la prévision impossible ────────────────────────────────────────

    def ecran_prevision(self):
        self.ecran("03-prevision")
        n = self.pret(ligne=False)
        plein, apres = self.droites(n)
        self.add(plein)
        self.au_mot("Elle extrapole")
        self.play(Create(apres), run_time=0.8)
        l0 = self.col(self.ligne([("2020 :", WHITE), ("x = 9", ORANGE_V)], 38), 2.6)
        v, h = lecture(n, A, B, 9)
        self.reveler([(l0[0], "2020,"), (VGroup(l0[1], n.lu_x(9), v), "9. 9,6")])
        l = self.col(self.ligne([("86,4 +", WHITE), ("18,1 =", WHITE), ("104,5 %", "#f87171")], 40), 1.75)
        p = point_droite(n, A, B, 9, ROUGE_ERREUR)
        self.reveler([(l[0], "86,4,"), (l[1], "18,1 :"), (VGroup(l[2], p, h), "104,5 %")])
        self.au_mot("100 % des")
        self.play(FadeIn(self.interdit(n)), run_time=0.4)
        self.poser(self.t("Plus de 100 % des Français ?", 34), 0.9)
        self.au_mot("Impossible")
        i = self.poser(self.t("Impossible !", 46, ROUGE_ERREUR), 0.05, "pop")
        self.insister(i, 1.15, 0.3)
        self.au_mot("100 %.")
        self.poser(self.bloc(["Une part de la population ne", "dépasse jamais 100 %."], 32, JAUNE_TITRE), -0.95)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()
        fig = VGroup(n.fond, self.interdit(n), *n.ronds, *self.droites(n))

        def reponse(s):
            p8, p9 = point_droite(n, A, B, 8), point_droite(n, A, B, 9, ROUGE_ERREUR)
            s.play(FadeIn(p8, scale=2), FadeIn(p9, scale=2), run_time=0.4)

        self.ecran_question("04-question", "04b-reponse", ["À partir de quel rang entier", "la droite dépasse 100 % ?"],
                            ["8", "9", "100"], 1,
                            ["(100 − 18,1) ÷ 9,6 ≈ 8,5", "rang 8 → 94,9 ;", "rang 9 → 104,5."],
                            figure=fig, autres_r=reponse, mots_q=["À partir", "100 % ?"],
                            mots_choix=["8. B", "9. C", "100. Mets"], mots_ph=["8,5.", "94,9", "104,5."])

    # ── 05 : la réalité ─────────────────────────────────────────────────────

    def ecran_realite(self):
        self.ecran("05-realite")
        n = self.pret(interdit=True)
        v = self.vrais(n)
        self.au_mot("Et en vrai")
        self.poser(self.t("Et en vrai ?", 42, JAUNE_TITRE), 2.85)
        for k, (m1, m2, txt) in enumerate(zip(["77 %", "84 %", "87 %"], ["2019,", "2020,", "2022."],
                                              [("77 %", "en 2019"), ("84 %", "en 2020"), ("87 %", "en 2022")])):
            t = self.col(self.ligne([(txt[0], VERT_OK), (txt[1], WHITE)], 34), 2.15 - 0.55 * k)
            self.reveler([(VGroup(t[0], v[k]), m1), (t[1], m2)])
        self.au_mot("Les points s'aplatissent")
        courbe = VMobject(color=VERT_OK, stroke_width=5).set_points_smoothly(
            [n.p(x, y) for x, y in zip(XS + XV, SMART + YV)])
        self.play(Create(courbe), run_time=1.0)
        self.au_mot("presque tout le monde est équipé")
        self.poser(self.bloc(["Presque tous équipés :", "peu de nouveaux acheteurs"], 32), 0.05)
        self.au_mot("La tendance a changé")
        self.poser(self.bloc(["La tendance a changé :", "la droite ne vaut plus."], 36, ROUGE_ERREUR), -1.05, "pop")
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("06-piege")
        n = self.pret(interdit=True)
        self.add(self.vrais(n))
        self.au_mot("Le piège")
        self.titre_col("Le piège :", ROUGE_ERREUR, 2.95, 46)
        self.poser(self.bloc(["croire qu'une tendance", "dure toujours"], 38, ROUGE_ERREUR), 1.95)
        self.au_mot("Une droite monte sans fin")
        self.play(Indicate(self.droites(n)[1], color=BLEU_CLAIR), run_time=0.6)
        l1 = self.col(self.ligne([("plafond :", WHITE), ("100 %", "#f87171")], 36), 0.85)
        self.reveler([(l1[0], "des plafonds"), (l1[1], "100 %, et")])
        self.play(Indicate(self.interdit(n)[1], color=ROUGE_ERREUR), run_time=0.5)
        l2 = self.col(self.ligne([("plancher :", WHITE), ("0", "#f87171")], 36), 0.2)
        self.reveler([(l2[0], "des planchers"), (l2[1], "zéro")])
        self.play(Indicate(n.axe_x, color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("Plus on prolonge loin")
        self.poser(self.bloc(["Plus on prolonge loin des", "données, plus le risque", "d'erreur grandit."], 34,
                             JAUNE_TITRE), -0.9, "pop")
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage()
        p = point_droite(n, A, B, 11, ROUGE_ERREUR)
        fig = VGroup(n.fond, self.interdit(n), *n.ronds, *self.droites(n), self.vrais(n), p)
        self.ecran_question("07-question", "07b-reponse", ["2022 : la droite dit 123,7 %,", "la réalité 87 %. Pourquoi ?"],
                            ["la calculatrice s'est trompée", "la tendance a changé", "le baromètre a mal compté"], 1,
                            ["Calcul juste, relevés justes :", "la tendance a changé après 2016."],
                            figure=fig, mots_q=["123,7 %", "87 %"],
                            mots_choix=["la calculatrice", "la tendance a changé, on", "le baromètre"],
                            mots_ph=["Le calcul est juste", "2016."])

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        n = self.pret(interdit=True)
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer", JAUNE_TITRE, 2.85, 50)
        self.au_mot("2019 ?")
        self.poser(self.ligne([("1.", AMBRE), ("2019 : prévision ?", WHITE)], 36), 1.9)
        l = self.col(self.ligne([("Réalité :", WHITE), ("77 %", VERT_OK)], 34), 1.3)
        self.reveler([(l[0], "Compare"), (VGroup(l[1], self.vrais(n, 1)[0]), "77 %")])
        b = self.col(self.bloc(["2. En 2022 : de combien de", "points la droite se trompe ?"], 32), 0.4)
        self.reveler([(b[0], "2022,"), (b[1], "de combien")])
        self.pause_defi(-0.7)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        n = self.pret(interdit=True)
        v = self.vrais(n)
        self.add(v)
        self.titre_col("Correction", JAUNE_TITRE, 2.85, 50)
        l1 = self.col(self.ligne([("1.", AMBRE), ("x = 8 :", ORANGE_V), ("76,8 +", WHITE), ("18,1", WHITE)], 34), 2.1)
        self.reveler([(l1[:2], "8. 76"), (l1[2], "76,8 plus"), (l1[3], "18,1 :")])
        r = self.col(self.ligne([("=", WHITE), ("94,9 %", BLEU_CLAIR)], 34), 1.55, xl=1.5)
        p8 = point_droite(n, A, B, 8)
        self.reveler([(VGroup(r, p8), "94,9 %")])
        e8 = Line(p8.get_center(), v[0].get_center(), color=AMBRE, stroke_width=6)
        l2 = self.col(self.ligne([("contre", WHITE), ("77 %", VERT_OK), (": ≈ 18 points d'écart", WHITE)], 30), 1.0)
        self.reveler([(l2[:2], "77 % en vrai"), (VGroup(l2[2], e8), "18 points")])
        l3 = self.col(self.ligne([("2.", AMBRE), ("123,7 −", WHITE), ("87 =", WHITE), ("36,7 points", "#f87171")], 34), 0.3)
        p11 = point_droite(n, A, B, 11, ROUGE_ERREUR)
        e11 = Line(p11.get_center(), v[2].get_center(), color=ROUGE_ERREUR, stroke_width=6)
        self.reveler([(l3[:2], "123,7 moins"), (l3[2], "87 :"), (VGroup(l3[3], p11, e11), "36,7")])
        self.au_mot("2016,")
        self.poser(self.bloc(["Plus on s'éloigne de 2016,", "plus l'erreur grandit."], 32, JAUNE_TITRE), -0.65)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        n = self.nuage()
        self.add(n.fond, *n.ronds)
        lignes = self.finale_colonne(figure=n, textes=[
            ("Extrapoler suppose que la tendance", "continue : rien ne le garantit."),
            ("Le résultat est-il possible ?", "Ni négatif, ni au-delà d'un", "maximum comme 100 %."),
            ("Loin des données : moins", "de confiance dans le modèle.")])
        self.add(self.interdit(n), *self.droites(n))  # après le recadrage de la figure
        self.au_mot("Une extrapolation suppose")
        self.montrer_ligne(lignes[0], FadeIn(self.vrais(n)))
        self.au_mot("Je vérifie que le résultat")
        self.play(Create(lignes[1][0]), FadeIn(lignes[1][1][:2], shift=RIGHT * 0.2),
                  Indicate(self.interdit(n)[1], color=ROUGE_ERREUR), run_time=0.6)
        self.au_mot("100 %.")
        self.play(FadeIn(lignes[1][1][2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("Et plus je vais loin")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_prevision()
        self.ecran_question1()
        self.ecran_realite()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsLimitesStmg(StatsLimitesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
