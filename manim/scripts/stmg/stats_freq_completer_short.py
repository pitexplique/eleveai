# stats_freq_completer_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 11 « Compléter un tableau
# avec des fréquences ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « 1 755 000 voitures neuves : devine combien étaient électriques ! »
#   · en HAUT, la voiture électrique et l'indice « 16,8 % » ;
#   · en BAS, EN MÊME TEMPS, la ligne du tableau du coach (Électriques | Total) :
#     le total en bleu (la référence), la case cherchée en orange ;
#   · 1 question-pause (3 s) : 168 000, 295 000 ou 16 800 ? ;
#   · fin : 2023, 1 817 000 voitures dont 16,7 % → « Réponds en commentaire ! »
#     (≈ 303 000).
# ⭐ Données RÉELLES : voir l'en-tête de stats_freq_completer.py (SDES, 2024).
# Centres d'intérêt : transports, technologie-ia.
#
# Voix : manim/voix/stmg-stats-freq-completer-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_freq_completer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_freq_completer_short.py StatsFreqCompleterShort -o eleveai-maths-stmg-stats-freq-completer-short --media_dir manim/scripts/stmg/media-stats-freq-completer-short
# Sortie : manim/sorties/stmg/maths/statistiques/11-freq-completer/eleveai-maths-stmg-stats-freq-completer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403
from stats_freq_completer import voiture  # noqa: E402

Y_IMG = 1.25


class StatsFreqCompleterShort(ShortI2):
    nom_voix = "stmg-stats-freq-completer-short"
    fichier_marques = "stats_freq_completer_short_marques.json"

    def ligne_tab(self, annee):
        t = croise_i2(["Électriques", "Total"], [annee], [[None, None]], titre="Voitures neuves", largeur_case=2.1,
                      largeur_libelle=1.1, hauteur=0.85, fs=28)
        return self.tab_bas(t)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Combien d'électriques ?", "orange")
        self.add(badge)
        v = voiture(2.0).move_to(P(0, Y_IMG))
        t = self.ligne_tab("2024")

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(v, shift=RIGHT * 0.6), FadeIn(t), run_time=0.6)
        self.play(remplir(t, 0, 1, "1 755 000"), t.case(0, 1).animate.set_fill(REF).set_stroke(C_DEN, width=8),
                  run_time=0.4)
        self.au_mot("Devine combien")
        self.play(remplir(t, 0, 0, "?"), run_time=0.4)
        self.insister(t.cases[0][0], 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'indice ──
        self.dire("01-image")
        self.au_mot("16,8 %")
        pc = self.t("16,8 %", 52, AMBRE).move_to(P(0.5, Y_IMG))
        self.play(v.animate.scale(0.5).move_to(P(-1.35, Y_IMG)), FadeIn(pc, scale=0.6), run_time=0.5)
        self.insister(pc, 1.08)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Combien d'électriques ?"],
                                    ["≈ 168 000", "≈ 295 000", "≈ 16 800"], 1,
                                    ["1 755 000 × 0,168 ≈ 295 000", "Ministère : 295 600 !"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : 2023, la question en commentaire ──
        self.dire("03-question")
        t2 = self.ligne_tab("2023")
        v2 = voiture(1.1).move_to(P(-1.3, Y_IMG))
        self.add(titre)
        self.play(FadeIn(t2), FadeIn(v2, shift=RIGHT * 0.4), run_time=0.3)
        self.au_mot("1 817 000")
        self.play(remplir(t2, 0, 1, "1 817 000"), t2.case(0, 1).animate.set_fill(REF).set_stroke(C_DEN, width=8),
                  run_time=0.4)
        self.au_mot("16,7 %")
        pc2 = self.t("16,7 %", 52, AMBRE).move_to(P(0.6, Y_IMG))
        self.play(FadeIn(pc2, scale=0.6), run_time=0.4)
        self.au_mot("Combien")
        self.play(remplir(t2, 0, 0, "?"), run_time=0.4)
        self.insister(t2.cases[0][0], 1.3)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.15))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
