# stats_freq_conditionnelle_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 10 « Fréquence
# conditionnelle ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « football ou handball, quel sport est le plus féminin ? »
#   · en HAUT, les deux ballons (le football grossit : le piège) ;
#   · en BAS, EN MÊME TEMPS, le tableau du coach (Femmes | Total) : le plus gros
#     effectif (249) n'est pas le plus fort taux ;
#   · 1 question-pause (3 s) : football, handball ou pareil ? ;
#   · fin : le rugby, 59 sur 420 milliers → « Réponds en commentaire ! » (14 %).
# ⭐ Données RÉELLES : voir l'en-tête de stats_freq_conditionnelle.py (Insee,
# licences 2025 ; rugby 419,5 milliers dont 14,0 % de femmes → 59 sur 420).
# Centres d'intérêt : sport, corps-sante.
#
# Voix : manim/voix/stmg-stats-freq-conditionnelle-short.json (débit −7) ;
# marques : manim/scripts/stmg/stats_freq_conditionnelle_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_freq_conditionnelle_short.py StatsFreqConditionnelleShort -o eleveai-maths-stmg-stats-freq-conditionnelle-short --media_dir manim/scripts/stmg/media-stats-freq-conditionnelle-short
# Sortie : manim/sorties/stmg/maths/statistiques/10-freq-conditionnelle/eleveai-maths-stmg-stats-freq-conditionnelle-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403
from stats_freq_conditionnelle import ballon_foot, ballon_hand  # noqa: E402

ROSE = "#f472b6"


class StatsFreqConditionnelleShort(ShortI2):
    nom_voix = "stmg-stats-freq-conditionnelle-short"
    fichier_marques = "stats_freq_conditionnelle_short_marques.json"

    def tab(self, lignes, vals):
        t = croise_i2(["Femmes", "Total"], lignes, vals, titre="Licences (milliers)", largeur_case=1.45,
                      largeur_libelle=1.75, hauteur=0.8, fs=28)
        return self.tab_bas(t, haut=-0.35)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le plus féminin ?", "orange")
        self.add(badge)
        bf = ballon_foot(0.55).move_to(P(-0.9, 1.25))
        bh = ballon_hand(0.45).move_to(P(0.9, 1.25))
        t = self.tab(["Football", "Handball"], [[None, None], [None, None]])

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(t), FadeIn(bf, scale=0.6), run_time=0.5)
        self.au_mot("handball")
        self.play(FadeIn(bh, scale=0.6), run_time=0.3)
        self.au_mot("Le football a plus")
        self.play(bf.animate.scale(1.25), run_time=0.4)
        self.au_mot("attention au piège")
        self.play(bf.animate.scale(1 / 1.25), Wiggle(bh), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : les nombres ──
        self.dire("01-image")
        self.au_mot("249 milliers")
        self.play(remplir(t, 0, 0, "249"), *allumer(t, 0, 0), run_time=0.4)
        self.au_mot("sur 2 372")
        self.play(remplir(t, 0, 1, "2 372"), run_time=0.4)
        self.au_mot("Handball : 240")
        self.play(remplir(t, 1, 0, "240"), *allumer(t, 1, 0), run_time=0.4)
        self.au_mot("sur 602")
        self.play(remplir(t, 1, 1, "602"), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)

        ecran = self.question_short("02-question", "02b-reponse", ["Le plus féminin ?"],
                                    ["le football", "le handball", "pareil"], 1,
                                    ["10,5 % contre 39,9 % :", "des parts, pas des effectifs !"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : le rugby, la question en commentaire ──
        self.dire("03-question")
        t2 = self.tab(["Rugby"], [[None, None]])
        ballon = Ellipse(width=1.3, height=0.8, fill_color="#92400e", fill_opacity=1, stroke_color=WHITE,
                         stroke_width=3).move_to(P(0, 1.25))
        couture = Line(ballon.get_left() + RIGHT * 0.3, ballon.get_right() + LEFT * 0.3, color=WHITE, stroke_width=3)
        couture.move_to(ballon)
        self.add(titre)
        self.play(FadeIn(t2), FadeIn(VGroup(ballon, couture), shift=UP * 0.2), run_time=0.3)
        self.au_mot("420 milliers")
        self.play(remplir(t2, 0, 1, "420"), t2.case(0, 1).animate.set_fill(REF).set_stroke(C_DEN, width=8),
                  run_time=0.4)
        self.au_mot("dont 59 milliers")
        self.play(remplir(t2, 0, 0, "59"), *num_case(t2, 0, 0), run_time=0.4)
        self.au_mot("Quelle part")
        q = self.t("? %", 60, ORANGE_RETENUE).move_to(P(0, 1.25))
        self.play(FadeOut(couture), ReplacementTransform(ballon, q), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.25))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
