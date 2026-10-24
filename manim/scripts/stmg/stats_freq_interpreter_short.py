# stats_freq_interpreter_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 12 « Interpréter une
# fréquence dans la presse ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE (vrai ou faux ?) : « 92 % des tués à deux-roues sont des hommes,
# donc 92 % des hommes tués étaient à deux-roues ? Pas si vite ! »
#   · en HAUT, le titre du journal, puis la phrase retournée, barrée ;
#   · en BAS, EN MÊME TEMPS, le tableau du coach : 650 sur 706 (la ligne) contre
#     650 sur 1 724 (la colonne), même code couleur que la paysage ;
#   · 1 question-pause (3 s) : 92,1 %, 37,7 % ou 29,3 % ? ;
#   · fin : les femmes, 56 sur 494 → « Réponds en commentaire ! » (11,3 %).
# ⭐ Données RÉELLES : voir l'en-tête de stats_freq_interpreter.py (ONISR 2023).
# Centres d'intérêt : corps-sante, transports.
#
# Voix : manim/voix/stmg-stats-freq-interpreter-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_freq_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_freq_interpreter_short.py StatsFreqInterpreterShort -o eleveai-maths-stmg-stats-freq-interpreter-short --media_dir manim/scripts/stmg/media-stats-freq-interpreter-short
# Sortie : manim/sorties/stmg/maths/statistiques/12-freq-interpreter/eleveai-maths-stmg-stats-freq-interpreter-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403
from stats_freq_interpreter import une  # noqa: E402


class StatsFreqInterpreterShort(ShortI2):
    nom_voix = "stmg-stats-freq-interpreter-short"
    fichier_marques = "stats_freq_interpreter_short_marques.json"

    def tab(self, colonnes, vals):
        t = croise_i2(colonnes, ["Deux-roues", "Total"], vals, titre="Tués sur la route, 2023", largeur_case=1.5,
                      largeur_libelle=1.85, hauteur=0.8, fs=28)
        return self.tab_bas(t, haut=-0.5, bas=-2.75)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Vrai ou faux ?", "orange")
        self.add(badge)
        u1 = self.borne(une(["« 92 % des tués", "à deux-roues motorisé", "sont des hommes »"], 32)).move_to(P(0, 1.5))
        t = self.tab(["Hommes", "Total"], [[None, None], [None, None]])

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(u1, shift=DOWN * 0.2), FadeIn(t), run_time=0.6)
        self.au_mot("Donc 92 %")
        u2 = self.borne(self.bloc(["Donc 92 % des hommes tués", "étaient à deux-roues ?"], 30, AMBRE)).move_to(P(0, 0.05))
        self.play(FadeIn(u2, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Pas si vite")
        x = croix(u2, sw=6)
        self.play(Create(x), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : les nombres ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(u2, x)), run_time=0.3)
        self.au_mot("650 hommes")
        self.play(remplir(t, 0, 0, "650"), *num_case(t, 0, 0), run_time=0.4)
        self.au_mot("sur 706")
        self.play(*ref_ligne(t, 0), run_time=0.2)
        self.play(remplir(t, 0, 1, "706"), self.den(t, 0, 1), run_time=0.4)
        self.au_mot("1 724 hommes tués")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*ref_colonne(t, 0), run_time=0.2)
        self.play(remplir(t, 1, 0, "1 724"), self.den(t, 1, 0), *num_case(t, 0, 0), run_time=0.4)
        self.insister(t.cases[1][0], 1.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Parmi les hommes tués,", "part à deux-roues ?"],
                                    ["92,1 %", "37,7 %", "29,3 %"], 1, ["650 ÷ 1 724 ≈ 37,7 %"],
                                    ys=(-0.05, -0.9, -1.75), y_bas=-2.5)
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : les femmes, la question en commentaire ──
        self.dire("03-question")
        t2 = self.tab(["Femmes"], [[None], [None]])
        self.add(titre)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("56 tuées")
        self.play(remplir(t2, 0, 0, "56"), *num_case(t2, 0, 0), run_time=0.4)
        self.au_mot("sur 494")
        self.play(remplir(t2, 1, 0, "494"), self.den(t2, 1, 0), run_time=0.4)
        self.au_mot("Quelle part")
        q = self.t("? %", 64, ORANGE_RETENUE).move_to(P(0, 1.3))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)

    def den(self, t, r, c):
        return t.case(r, c).animate.set_fill(REF).set_stroke(C_DEN, width=8)

    def bloc(self, lignes, fs=30, color=WHITE):
        return VGroup(*[self.t(s, fs, color) for s in lignes]).arrange(DOWN, buff=0.08)
