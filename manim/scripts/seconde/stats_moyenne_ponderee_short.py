# stats_moyenne_ponderee_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 03 « Calculer une moyenne
# pondérée » (micro stat_moyenne_ponderee). CEINTURE ORANGE (un cran sous la
# paysage verte : la pondération se VOIT sur une balance, sans calcul long).
# Il AMUSE : « Sa moyenne de carrière, c'est la moyenne des trois ? Devine ! »
#   · en HAUT, les trois moyennes de Victor Wembanyama ;
#   · en BAS, la balance (droite graduée du coach avec des poids) : chaque
#     saison pose un poids aussi lourd que son nombre de matchs ; le point
#     d'équilibre n'est pas 23,6 (moyenne simple) mais 23,4 (le vrai chiffre) ;
#   · une question-pause (3 s) : 10 matchs à 30, 90 matchs à 20 → 21 ;
#   · fin : avec 22 matchs à 23,8, la nouvelle moyenne au dixième ? (23,5).
# Données réelles : voir stats_moyenne_ponderee.py (Wikipédia, Career statistics).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-moyenne-ponderee-short.json (débit −10) ; calage :
# manim/scripts/seconde/stats_moyenne_ponderee_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_moyenne_ponderee_short.py StatsMoyennePondereeShort -o eleveai-maths-seconde-stats-moyenne-ponderee-short --media_dir manim/scripts/seconde/media-stats-moyenne-ponderee-short
# Sortie : manim/sorties/seconde/maths/statistiques/03-moyenne-ponderee/eleveai-maths-seconde-stats-moyenne-ponderee-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403
from stats_moyenne_ponderee import COUL_SAISON, Balance, ballon_basket  # noqa: E402

Y_AXE = -1.65


class StatsMoyennePondereeShort(Short2de):
    nom_voix = "2de-stats-moyenne-ponderee-short"
    fichier_marques = "stats_moyenne_ponderee_short_marques.json"

    def balance(self):
        bal = Balance([(21.4, 71, "21,4", COUL_SAISON[0]), (24.3, 46, "24,3", COUL_SAISON[1]),
                       (25.0, 64, "25", COUL_SAISON[2])], mini=21, maxi=26, x0=-1.7, longueur=3.4, y=Y_AXE,
                      k=0.016, fs=26, fmt_n=str, larg_bloc=0.36)
        bal.etiq_v[1].shift(LEFT * 0.16)    # 24,3 et 25 sont proches : on écarte leurs étiquettes
        bal.etiq_v[2].shift(RIGHT * 0.16)
        return bal

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La moyenne piège", "orange")

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        b = ballon_basket(0.26)
        nom = self.t("Victor Wembanyama", 30, JAUNE_TITRE)
        VGroup(b, nom).arrange(RIGHT, buff=0.18)
        self.borne(VGroup(b, nom), 0.5).move_to(P(0, 1.75))
        self.play(Write(titre), FadeIn(badge), FadeIn(b, shift=DOWN * 0.3), FadeIn(nom), run_time=0.7)
        puces = VGroup()
        for k, (ext, v) in enumerate([("21,4 points", "21,4"), ("24,3", "24,3"), ("25.", "25")]):
            self.au_mot(ext)
            p = self.t(v, 36, COUL_SAISON[k]).move_to(P(-1.3 + 1.3 * k, 0.95))
            puces.add(p)
            self.play(FadeIn(p, scale=1.4), run_time=0.3)
        self.au_mot("la moyenne des trois")
        q = self.borne(self.ligne([("Moyenne de carrière :", WHITE), ("?", ORANGE_RETENUE)], 30)).move_to(P(0, 0.25))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Devine")
        self.insister(q[1], 1.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : la balance ──
        self.dire("01-image")
        bal = self.balance()
        self.play(FadeOut(q), Create(bal.axe), FadeIn(bal.graduations), run_time=0.5)
        pas = self.borne(self.t("Pas si vite !", 34, ORANGE_RETENUE)).move_to(P(0, 0.25))
        self.play(FadeIn(pas, scale=0.7), run_time=0.3)
        for k, ext in enumerate(["71,", "46,", "64."]):
            self.au_mot(ext)
            self.play(GrowFromEdge(bal.blocs[k], DOWN), FadeIn(bal.etiq_n[k]), FadeIn(bal.etiq_v[k]),
                      Indicate(puces[k], color=COUL_SAISON[k]), run_time=0.45)
        self.au_mot("n'est pas 23,6")
        faux = bal.repere(23.57, txt="23,6 ?", haut=1.9, fs=24)
        self.play(FadeOut(pas), Create(faux[0]), FadeIn(faux[1]), run_time=0.5)
        self.au_mot("mais 23,4")
        piv = bal.pivot(23.41, txt="23,4", fs=30, buff_txt=0.45)
        self.play(FadeIn(piv, shift=UP * 0.3), FadeOut(faux), run_time=0.5)
        self.insister(piv, 1.3)
        self.au_mot("son vrai chiffre")
        vrai = self.borne(self.ligne([("Carrière :", WHITE), ("23,4", VERT_OK)], 34)).move_to(P(0, 0.25))
        self.play(FadeIn(vrai, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        t0 = self.question_short("02-question", "02b-reponse", ["10 matchs à 30 points,", "90 matchs à 20 points ?"],
                                 ["25", "21", "50"], 1,
                                 [("2 100 ÷ 100 = 21", VERT_OK, "divisé par 100"),
                                  ("25 : sans les poids", ROUGE_CLAIR, "25 oublie")],
                                 efface=[b, nom, puces, vrai])
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("22 matchs")
        self.play(FadeOut(VGroup(puces, vrai)), run_time=0.3)
        bloc = Rectangle(width=0.3, height=22 * 0.016, fill_color=AMBRE, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P(bal.x(23.8), Y_AXE), aligned_edge=DOWN)
        l1 = self.borne(self.ligne([("+ 22 matchs à", WHITE), ("23,8", AMBRE)], 30)).move_to(P(0, 0.95))
        self.play(GrowFromEdge(bloc, DOWN), FadeIn(l1, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("nouvelle moyenne")
        q2 = self.borne(self.ligne([("Nouvelle moyenne :", WHITE), ("?", ORANGE_RETENUE)], 30)).move_to(P(0, 0.3))
        self.play(FadeIn(q2, scale=0.8), run_time=0.35)
        self.insister(q2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, 1.65))
        self.play(FadeIn(appel, scale=0.7), FadeOut(VGroup(b, nom)), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
