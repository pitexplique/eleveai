# stats_freq_interpreter.py
# EleveAI — Maths STMG — série « Statistiques », épisode 12 « INTERPRÉTER UNE
# FRÉQUENCE DANS LA PRESSE » (micro du coach don_freq_interpreter :
# « Interpréter une fréquence conditionnelle dans une formulation de la
# presse », notion donnees_frequences). AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE : la paysage complète du niveau (« p % des A sont des B » : A
# = référence = dénominateur ; la phrase retournée ; la marginale prise pour une
# conditionnelle). Short jumeau : stats_freq_interpreter_short.py (ORANGE).
#
# ⭐ Décor et métier : la SÉCURITÉ ROUTIÈRE (santé publique) ; un JOURNALISTE DE
# DONNÉES relit un titre de presse (problématique : juger une affirmation).
# Ton sobre : « bien lire ces chiffres, c'est aussi mieux protéger ».
# Centres d'intérêt : corps-sante, transports.
# ⭐ DONNÉES RÉELLES (lues le 24/10/2026) : ONISR, « Bilan 2023 de la sécurité
# routière », France métropolitaine,
# https://www.onisr.securite-routiere.gouv.fr/etat-de-linsecurite-routiere/bilans-annuels-de-la-securite-routiere/bilan-2023-de-la-securite-routiere
# 706 usagers de deux-roues motorisés tués, dont 92 % d'hommes ; 1 512
# occupants de véhicules de tourisme tués, dont 71 % d'hommes ; au total 3 167
# tués, 77,6 % d'hommes. Cases déduites (arrondies à l'unité) : Deux-roues
# 650 | 56 | 706 ; Voiture 1 074 | 438 | 1 512 ; Total 1 724 | 494 | 2 218.
# Fréquences : 650/706 = 92,1 % · 1 074/1 512 = 71,0 % · 650/1 724 = 37,7 % ·
# 1 724/2 218 = 77,7 % · 56/494 = 11,3 % · 56/706 = 7,9 %.
#
# Mapping micro → écrans (banque stmg donnees-croisees) : tpl_1 (sur quelle
# population ce pourcentage est-il calculé ?) → 03, question 04, 07 · tpl_2
# (quelle phrase est exacte ? leurres : populations échangées, marginale) →
# 05 piège, question 06, défi.
# Écrans : 00 garde · 01 le journaliste et le titre · 02 le tableau · 03 la
# règle (650 ÷ 706) · 04 QUESTION (population de référence) · 05 le piège (la
# phrase retournée) · 06 QUESTION (quelle phrase ?) · 07 la marginale · 08 défi
# · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/stmg-stats-freq-interpreter.json (débit −7) ; marques :
# manim/scripts/stmg/stats_freq_interpreter_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_freq_interpreter.py StatsFreqInterpreterStmg -o eleveai-maths-stmg-stats-freq-interpreter --media_dir manim/scripts/stmg/media-stats-freq-interpreter-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/12-freq-interpreter/eleveai-maths-stmg-stats-freq-interpreter.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403

COLONNES = ["Hommes", "Femmes", "Total"]
LIGNES = ["Deux-roues", "Voiture", "Total"]
VALS = [["650", "56", "706"], ["1 074", "438", "1 512"], ["1 724", "494", "2 218"]]
TITRE = "Tués sur la route, 2023"
PAPIER = "#f8fafc"


def une(lignes, fs=30, largeur=None, barre=False):
    """Un titre de journal : carte claire, bandeau « LE JOURNAL », texte sombre.
    barre=True : le titre est barré en rouge (phrase fausse)."""
    tete = Text("LE JOURNAL", font_size=int(fs * 0.6), color=GREY_D, weight=BOLD)
    corps = VGroup(*[Text(s, font_size=fs, color="#0f172a") for s in lignes]).arrange(DOWN, aligned_edge=LEFT,
                                                                                         buff=0.08)
    contenu = VGroup(tete, Line(LEFT, RIGHT, color=GREY_C, stroke_width=2), corps).arrange(DOWN, aligned_edge=LEFT,
                                                                                             buff=0.12)
    contenu[1].set_width(max(corps.width, tete.width)).align_to(contenu, LEFT)
    w = (largeur or contenu.width + 0.5)
    fond = RoundedRectangle(width=w, height=contenu.height + 0.4, corner_radius=0.12, fill_color=PAPIER,
                            fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    contenu.move_to(fond).align_to(fond.get_left() + RIGHT * 0.25, LEFT)
    g = VGroup(fond, contenu)
    g.corps = corps
    return g


def moto(l=1.8):
    """Un deux-roues motorisé (scooter) de profil."""
    roues = VGroup(*[Circle(radius=0.17 * l, stroke_color=WHITE, stroke_width=4, fill_color="#111827",
                            fill_opacity=1).move_to(P(x * l, 0)) for x in (-0.33, 0.33)])
    corps = Polygon(P(-0.38 * l, 0.12 * l), P(0.05 * l, 0.12 * l), P(0.22 * l, 0.42 * l), P(0.3 * l, 0.42 * l),
                    P(0.36 * l, 0.12 * l), P(0.4 * l, 0.05 * l), P(-0.4 * l, 0.05 * l),
                    fill_color="#ef4444", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    selle = RoundedRectangle(width=0.32 * l, height=0.07 * l, corner_radius=0.03 * l, fill_color="#111827",
                             fill_opacity=1, stroke_width=0).move_to(P(-0.18 * l, 0.17 * l))
    guidon = Line(P(0.26 * l, 0.42 * l), P(0.2 * l, 0.55 * l), color=WHITE, stroke_width=5)
    return VGroup(corps, selle, guidon, roues)


class StatsFreqInterpreterBase(PaysageI2):
    nom_voix = "stmg-stats-freq-interpreter"
    fichier_marques = "stats_freq_interpreter_marques.json"

    def tableau(self, centre=None, **kw):
        opts = dict(titre=TITRE, largeur_case=1.6, largeur_libelle=2.3, hauteur=0.86, fs=32)
        opts.update(kw)
        t = croise_i2(COLONNES, LIGNES, VALS, **opts)
        return self.placer_tab(t) if centre is None else t.move_to(centre)

    def tab_pret(self):
        t = self.tableau()
        self.add(t)
        return t

    def den_case(self, t, r, c):
        return t.case(r, c).animate.set_fill(REF).set_stroke(C_DEN, width=8)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Interpréter une fréquence", self.identite, self.ceinture)
        u = une(["« 92 % des … »"], 40).move_to(P(-1.6, 0.15))
        q = self.t("de qui ?", 54, ORANGE_RETENUE).next_to(u, RIGHT, buff=0.5)
        self.au_mot("Interpréter une fréquence")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("« 92 % des")
        self.play(FadeIn(u, shift=UP * 0.2), run_time=0.5)
        self.au_mot("92 % de qui")
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.insister(q, 1.2, 0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : le journaliste et le titre ─────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        m = moto(2.4).move_to(P(-4.3, 1.8))
        self.au_mot("706 personnes")
        nb = VGroup(self.t("706", 60, JAUNE_TITRE), self.t("tués à deux-roues", 34),
                    self.t("motorisé, en 2023", 34)).arrange(DOWN, buff=0.12)
        nb.move_to(P(-4.3, -0.3))
        self.play(FadeIn(m, shift=RIGHT * 0.3), FadeIn(nb, scale=0.8), run_time=0.6)
        self.au_mot("Un journaliste de données")
        metier = self.col(self.t("Journaliste de données", 42, BLEU_CALCUL), 2.8, xl=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("relit un titre")
        u = une(["« 92 % des tués", "à deux-roues motorisé", "sont des hommes »"], 38)
        self.col(u, 1.15, xl=0.6)
        self.play(FadeIn(u, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Que dit exactement")
        q = self.col(self.t("Que dit ce pourcentage ?", 36, AMBRE), -0.75, xl=0.6)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Bien lire ces chiffres")
        p = self.calc(self.t("Bien lire, c'est mieux protéger.", 32, VERT_OK), -1.45, xl=0.6)
        self.play(FadeIn(p, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        t = self.tableau()
        self.au_mot("Voici son tableau")
        self.play(FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Sécurité routière")
        src = self.col(self.t("Source : Sécurité routière", 32, GREY_A), 2.6)
        self.play(FadeIn(src), run_time=0.4)
        self.au_mot("En ligne")
        l1 = self.col(self.ligne([("En ligne :", AMBRE), ("le véhicule", WHITE)], 36), 1.75)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(VGroup(*[x[1] for x in t.libelles[:2]]), color=AMBRE), run_time=0.6)
        self.au_mot("En colonne")
        l2 = self.col(self.ligne([("En colonne :", AMBRE), ("hommes ou femmes", WHITE)], 36), 1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(VGroup(*[x[1] for x in t.tetes[:2]]), color=AMBRE), run_time=0.6)
        self.au_mot("650 hommes")
        self.play(*allumer(t, 0, 0), run_time=0.4)
        self.au_mot("56 femmes")
        self.play(*allumer(t, 0, 1), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-methode")
        t = self.tab_pret()
        self.au_mot("La règle")
        r = self.calc(self.ligne([("« 92 % des", WHITE), ("A", C_DEN), ("sont des", WHITE), ("B", AMBRE), ("»", WHITE)], 42), 2.75)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("les A forment")
        ra = self.calc(self.ligne([("A", C_DEN), ("= la référence", WHITE)], 38), 2.0)
        self.play(FadeIn(ra, shift=RIGHT * 0.2), Indicate(r[1], color=C_DEN, scale_factor=1.5), run_time=0.5)
        self.au_mot("la ligne, 706")
        self.play(*ref_ligne(t, 0), self.den_case(t, 0, 2), run_time=0.5)
        f = frac("650", "706", 50)
        ligne = egal(f, ("≈", WHITE), ("92,1 %", VERT_OK), fs=48)
        self.calc(ligne, 0.55)
        self.au_mot("C'est le dénominateur")
        self.play(Create(f.barre), FadeIn(f.den, shift=UP * 0.2), run_time=0.4)
        self.au_mot("650 divisé par 706")
        self.play(*num_case(t, 0, 0), FadeIn(f.num, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("égale 92,1 %")
        self.play(FadeIn(ligne[1:], scale=0.7), run_time=0.4)
        self.au_mot("Le titre est juste")
        ok = VGroup(self.coche(VERT_OK, 0.3), self.t("Le titre est juste.", 36, VERT_OK)).arrange(RIGHT, buff=0.2)
        self.calc(ok, -0.9)
        self.play(Create(ok[0]), FadeIn(ok[1], shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (la population de référence) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret()

        def montrer():
            self.play(*ref_ligne(t, 1), run_time=0.3)
            self.play(*num_case(t, 1, 0), self.den_case(t, 1, 2), run_time=0.4)

        self.question_pause("04-question", "04b-reponse", ["« 71 % des automobilistes", "tués sont des hommes » :",
                                                            "la référence ?"],
                            ["les hommes tués", "les automobilistes tués", "tous les tués"], 1,
                            ["1 074 ÷ 1 512 ≈ 71 %", "A inverse ; C : marginale"],
                            x0=self.XL + 0.3, largeur=4.9, ys=(0.7, -0.15, -1.0), geste=montrer)

    # ── 05 : le piège (la phrase retournée) ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        t = self.tab_pret()
        self.au_mot("Le piège")
        tit = self.calc(self.bloc(["Le piège :", "retourner la phrase"], 42, ROUGE_ERREUR), 2.75)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("« 92 % des hommes")
        u = une(["« 92 % des hommes tués", "étaient à deux-roues »"], 36)
        self.calc(u, 1.3)
        self.play(FadeIn(u, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Faux")
        x = croix(u.corps, sw=7)
        self.play(Create(x), run_time=0.4)
        self.au_mot("c'est la colonne")
        self.play(*ref_colonne(t, 0), self.den_case(t, 2, 0), run_time=0.5)
        f = frac("650", "1 724", 46)
        ligne = egal(f, ("≈", WHITE), ("37,7 %", VERT_OK), fs=44)
        self.calc(ligne, -0.15)
        self.play(Create(f.barre), FadeIn(f.den, shift=UP * 0.2), run_time=0.4)
        self.au_mot("650 divisé par 1 724")
        self.play(*num_case(t, 0, 0), FadeIn(f.num, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("égale 37,7 %")
        self.play(FadeIn(ligne[1:], scale=0.7), run_time=0.4)
        self.insister(ligne[2], 1.25, 0.25)
        self.au_mot("Même case")
        m = self.calc(self.bloc(["même case, autre population,", "autre nombre"], 34, JAUNE_TITRE), -1.4)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (quelle phrase est exacte ?) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.question_large("06-question", "06b-reponse", ["Quelle phrase est exacte ?"],
                            ["37,7 % des tués à deux-roues sont des hommes.",
                             "37,7 % des hommes tués étaient à deux-roues.",
                             "37,7 % des tués sont des hommes."], 1,
                            ["37,7 % = 650 ÷ 1 724 : les hommes tués",
                             "A échange les populations ; C = marginale"], ys=(1.3, 0.2, -0.9), y_bas=-1.95)

    # ── 07 : la marginale ───────────────────────────────────────────────────

    def ecran_marginale(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-marginale")
        t = self.tab_pret()
        self.au_mot("« 78 % des tués")
        u = une(["« 78 % des tués", "sont des hommes »"], 32)
        self.calc(u, 2.4)
        self.play(FadeIn(u, shift=UP * 0.2), run_time=0.5)
        self.au_mot("tous les tués")
        self.play(self.den_case(t, 2, 2), run_time=0.4)
        self.au_mot("fréquence marginale")
        nom = self.calc(self.t("fréquence marginale", 38, JAUNE_TITRE), 1.05)
        self.play(FadeIn(nom, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("1 724 divisé par 2 218")
        f = frac("1 724", "2 218", 44)
        ligne = egal(f, ("≈", WHITE), ("77,7 %", VERT_OK), fs=42)
        self.calc(ligne, -0.3)
        self.play(*num_case(t, 2, 0), FadeIn(f, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 77,7 %")
        self.play(FadeIn(ligne[1:], scale=0.7), run_time=0.4)
        self.au_mot("près de 78 %")
        pr = self.calc(self.t("≈ 78 %", 40, VERT_OK), -1.45)
        self.play(FadeIn(pr, scale=0.7), run_time=0.4)
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.tab_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : calcule")
        q1 = self.col(self.bloc(["1. Calcule 56 ÷ 494,", "et écris la phrase juste."], 36), 1.7)
        q1[0][:2].set_color(AMBRE)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : parmi")
        q2 = self.col(self.bloc(["2. Parmi les tués à deux-roues,", "quelle part de femmes ?"], 36), 0.3)
        q2[0][:2].set_color(AMBRE)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.pause_defi(-1.1)), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        t = self.tab_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("56 divisé par 494")
        f1 = frac("56", "494", 40)
        l1 = egal(f1, ("≈", WHITE), ("11,3 %", VERT_OK), fs=40)
        g1 = self.calc(VGroup(self.t("1.", 40, AMBRE), l1).arrange(RIGHT, buff=0.25), 1.75)
        self.play(*ref_colonne(t, 1), run_time=0.3)
        self.play(*num_case(t, 0, 1), self.den_case(t, 2, 1), FadeIn(g1[0]), FadeIn(f1), run_time=0.5)
        self.au_mot("égale 11,3 %")
        self.play(FadeIn(l1[1:], scale=0.7), run_time=0.4)
        self.au_mot("11,3 % des femmes tuées")
        u = self.bloc(["« 11,3 % des femmes tuées", "étaient à deux-roues motorisé »"], 32, VERT_OK)
        self.calc(u, 0.6)
        self.play(FadeIn(u, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Deux : 56")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*ref_ligne(t, 0), run_time=0.3)
        f2 = frac("56", "706", 40)
        l2 = egal(f2, ("≈", WHITE), ("7,9 %", VERT_OK), fs=40)
        g2 = self.calc(VGroup(self.t("2.", 40, AMBRE), l2).arrange(RIGHT, buff=0.25), -0.8)
        self.play(*num_case(t, 0, 1), self.den_case(t, 0, 2), FadeIn(g2[0]), FadeIn(f2), run_time=0.5)
        self.au_mot("égale 7,9 %")
        self.play(FadeIn(l2[1:], scale=0.7), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        t = self.placer_tab(self.tableau(), haut=2.7)
        self.add(t)
        lignes = self.finale([("« p % des A sont des B » :", "A = le dénominateur"),
                              ("Retourner la phrase", "change le nombre"),
                              ("Part de tous :", "fréquence marginale")], [1.75, 0.2, -1.35], fs=38)
        self.au_mot("Dans « p % des A")
        self.montrer_ligne(lignes[0], *ref_ligne(t, 0), self.den_case(t, 0, 2))
        self.au_mot("Retourner la phrase")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et une part de tous")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_marginale()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsFreqInterpreterStmg(StatsFreqInterpreterBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
