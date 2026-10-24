# stats_freq_marginale_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 09 « Fréquence marginale ».
# CEINTURE ORANGE (un cran sous la paysage verte). Il AMUSE : « devine la part
# des nuits passées par des touristes venus de l'étranger ! »
#   · en HAUT, l'hôtel, la tente et la valise, puis la fraction qui se construit ;
#   · en BAS, EN MÊME TEMPS, la ligne du tableau du coach (Étranger | Total), avec le
#     même code couleur (numérateur ambre, dénominateur bleu) ;
#   · 1 question-pause (3 s) : 10,9 %, 28,5 % ou 38,2 % ? ;
#   · fin : les campings, 13,7 sur 38,2 → « Réponds en commentaire ! » (35,9 %).
# ⭐ Données RÉELLES : voir l'en-tête de stats_freq_marginale.py (Insee, 2023).
# Centres d'intérêt : histoire-geographie, transports.
#
# Voix : manim/voix/stmg-stats-freq-marginale-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_freq_marginale_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_freq_marginale_short.py StatsFreqMarginaleShort -o eleveai-maths-stmg-stats-freq-marginale-short --media_dir manim/scripts/stmg/media-stats-freq-marginale-short
# Sortie : manim/sorties/stmg/maths/statistiques/09-freq-marginale/eleveai-maths-stmg-stats-freq-marginale-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403
from stats_freq_marginale import hotel, tente, valise  # noqa: E402

Y_IMG = 1.25


class StatsFreqMarginaleShort(ShortI2):
    nom_voix = "stmg-stats-freq-marginale-short"
    fichier_marques = "stats_freq_marginale_short_marques.json"

    def ligne_tab(self, colonnes, valeurs, titre):
        t = croise_i2(colonnes, ["Nuitées"], [valeurs], titre=titre, largeur_case=1.55, largeur_libelle=1.45,
                      hauteur=0.85, fs=28)
        return self.tab_bas(t)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Devine la part !", "orange")
        self.add(badge)
        h = hotel(1.0).move_to(P(-1.3, Y_IMG + 0.1))
        tn = tente(0.75).move_to(P(0.2, Y_IMG - 0.25))
        v = valise(0.75).move_to(P(1.45, Y_IMG - 0.3))
        t = self.ligne_tab(["Étranger", "Total"], [None, None], "Nuitées 2023 (millions)")

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(h, shift=UP * 0.2), FadeIn(tn, shift=UP * 0.2), FadeIn(t), run_time=0.6)
        self.au_mot("38,2 millions")
        self.play(remplir(t, 0, 1, "38,2"), *allumer(t, 0, 1), run_time=0.4)
        self.au_mot("Devine")
        self.play(FadeIn(v, shift=LEFT * 0.6), run_time=0.4)
        self.au_mot("quelle part")
        self.play(remplir(t, 0, 0, "?"), run_time=0.4)
        self.insister(t.cases[0][0], 1.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : la fraction ──
        self.dire("01-image")
        f = frac("10,9", "38,2", 56).move_to(P(0, Y_IMG - 0.1))
        self.play(FadeOut(VGroup(h, tn, v)), run_time=0.3)
        self.au_mot("10,9 millions")
        self.play(remplir(t, 0, 0, "10,9"), *eteindre(t), run_time=0.3)
        self.play(*num_case(t, 0, 0), FadeIn(f.num, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("sur 38,2")
        self.play(t.case(0, 1).animate.set_fill(REF).set_stroke(C_DEN, width=8), Create(f.barre),
                  FadeIn(f.den, shift=UP * 0.2), run_time=0.4)
        self.insister(f, 1.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Part de l'étranger ?"],
                                    ["10,9 %", "28,5 %", "38,2 %"], 1, ["10,9 ÷ 38,2 ≈ 28,5 %", "plus d'1 nuit sur 4 !"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : les campings, la question en commentaire ──
        self.dire("03-question")
        t2 = self.ligne_tab(["Camping", "Total"], [None, None], "Nuitées 2023 (millions)")
        tn2 = tente(1.1).move_to(P(0, Y_IMG))
        self.add(titre)
        self.play(FadeIn(t2), FadeIn(tn2, shift=UP * 0.2), run_time=0.3)
        self.au_mot("13,7 millions")
        self.play(remplir(t2, 0, 0, "13,7"), *num_case(t2, 0, 0), run_time=0.4)
        self.au_mot("sur 38,2")
        self.play(remplir(t2, 0, 1, "38,2"), t2.case(0, 1).animate.set_fill(REF).set_stroke(C_DEN, width=8),
                  run_time=0.4)
        self.au_mot("Quelle part")
        q = self.t("? %", 60, ORANGE_RETENUE).move_to(P(0, Y_IMG))
        self.play(ReplacementTransform(tn2, q), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.15))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
