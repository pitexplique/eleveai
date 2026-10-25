# stats_extrapoler_short.py
# EleveAI — Maths STMG — short jumeau de 25-extrapoler. CEINTURE ORANGE (un cran
# sous la paysage verte). Il AMUSE : « Le diesel va-t-il disparaître ? »
#   · en HAUT, la pompe DIESEL et les nombres ; EN MÊME TEMPS, en bas, la droite
#     se prolonge en pointillé au-delà du dernier point (2020) jusqu'à 2024 ;
#   · 1 question-pause (3 s) : −5,5 × 12 + 73 ? (7 % ; leurres 139 %, 67,5 %) ;
#     surprise : en vrai, en 2024, 7 % !
#   · fin : et en 2030 (x = 18) ? possible ? (−26 % : impossible).
# ⭐ Données RÉELLES : voir l'en-tête de stats_extrapoler.py.
#
# Voix : manim/voix/stmg-stats-extrapoler-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_extrapoler_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_extrapoler_short.py StatsExtrapolerShort -o eleveai-maths-stmg-stats-extrapoler-short --media_dir manim/scripts/stmg/media-stats-extrapoler-short
# Sortie : manim/sorties/stmg/maths/statistiques/25-extrapoler/eleveai-maths-stmg-stats-extrapoler-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403
from stats_extrapoler import A, B, DIESEL, XS, pompe  # noqa: E402

Y_IMG = 1.7


class StatsExtrapolerShort(ShortJ1):
    nom_voix = "stmg-stats-extrapoler-short"
    fichier_marques = "stats_extrapoler_short_marques.json"

    def nuage(self, loin=False):
        if loin:
            n = Nuage(XS, DIESEL, 0, 20, -30, 80, pas_x=4, pas_y=20, fin_x=2, fin_y=10, largeur=3.1, hauteur=2.6,
                      fs=19, nom_x="Années depuis 2012", nom_y="Diesel (%)")
        else:
            n = Nuage(XS, DIESEL, 0, 14, 0, 80, pas_x=2, pas_y=20, fin_x=1, fin_y=10, largeur=3.1, hauteur=2.6,
                      fs=19, nom_x="Années depuis 2012", nom_y="Diesel (%)")
        return self.caser_nuage(n)

    def droites(self, n):
        plein = droite(n, A, B, x0=0, x1=8, sw=5)
        fin = droite(n, A, B, x0=8)
        return plein, DashedLine(fin.get_start(), fin.get_end(), color=BLEU_D, stroke_width=5, dash_length=0.1)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le diesel disparaît ?", "orange")
        self.add(badge)
        n = self.nuage()
        pm = pompe(0.95).move_to(P(-1.6, Y_IMG))
        plein, apres = self.droites(n)

        # ── 00 : 2012 → 2020, l'équation ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(pm, shift=UP * 0.2), run_time=0.6)
        garder = [badge, titre, self.mobjects[0]]
        t0 = self.ligne([("73 %", VIOLET_CLAIR), ("en 2012", WHITE)], 28).move_to(P(0.55, Y_IMG + 0.25))
        t1 = self.ligne([("30,6 %", VIOLET_CLAIR), ("en 2020", WHITE)], 28).move_to(P(0.55, Y_IMG - 0.25))
        self.reveler([(VGroup(t0[0], n.ronds[0]), "73 %"), (t0[1], "2012,"), (VGroup(t1[0], *n.ronds[1:]), "30,6 %"),
                      (t1[1], "2020.")])
        eq = self.ligne([("y =", WHITE), ("−5,5", AMBRE), ("x +", WHITE), ("73", VIOLET_CLAIR)], 32)
        eq.scale_to_fit_width(min(eq.width, 2.75)).move_to(P(0.55, Y_IMG))
        self.au_mot("y égale")
        self.play(FadeOut(VGroup(t0, t1)), FadeIn(eq[0]), Create(plein), run_time=0.5)
        self.reveler([(eq[1:3], "moins 5,5"), (eq[3], "73.")])
        self.au_mot("2024 ?")
        self.play(eq.animate.move_to(P(0.55, Y_IMG + 0.3)), run_time=0.3)
        t2 = self.ligne([("2024 :", WHITE), ("?", ORANGE_RETENUE)], 32).move_to(P(0.55, Y_IMG - 0.3))
        self.play(FadeIn(t2), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : prolonger ──
        self.dire("01-image")
        self.au_mot("Je prolonge la droite")
        self.play(Create(apres), run_time=0.9)
        self.au_mot("c'est extrapoler")
        t3 = self.ligne([("EXTRAPOLER", ORANGE_RETENUE)], 30)
        t3.scale_to_fit_width(min(t3.width, 2.6)).move_to(P(0.6, Y_IMG - 0.3))
        self.play(FadeOut(t2), FadeIn(t3, scale=0.7), run_time=0.35)
        self.au_mot("12.")
        self.play(FadeIn(n.lu_x(12), scale=1.4), Create(lecture(n, A, B, 12)[0]), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["−5,5 × 12 + 73 = ?"], ["7 %", "139 %", "67,5 %"], 0,
                            ["C'est 7 %.", "En vrai, en 2024 : 7 % !"], mot_q="73, ça",
                            mots_choix=["7 %.", "139 %", "67,5 %"], mots_ph=["7 %. Et", "7 % !"])
        self.vider(garder)

        # ── 03 : 2030, en commentaire ──
        self.dire("03-question")
        n2 = self.nuage(loin=True)
        p2, a2 = self.droites(n2)
        zero = DashedLine(n2.p(0, 0), n2.p(20, 0), color=ROUGE_ERREUR, stroke_width=4, dash_length=0.1)
        self.play(FadeIn(n2), Create(p2), Create(a2), Create(zero), run_time=0.6)
        self.au_mot("2030,")
        t5 = self.ligne([("2030 :", WHITE), ("x = 18", ORANGE_V), ("→", WHITE), ("?", ORANGE_RETENUE)], 32)
        t5.move_to(P(0, Y_IMG + 0.25))
        self.play(FadeIn(t5[0]), run_time=0.25)
        self.reveler([(VGroup(t5[1:], n2.verticale(18)), "18 ?")])
        self.au_mot("est-ce possible")
        t6 = self.ligne([("Possible ?", ORANGE_RETENUE)], 32).move_to(P(0, Y_IMG - 0.3))
        self.play(FadeIn(t6, scale=0.7), run_time=0.35)
        self.play(FadeOut(t6), run_time=0.2)
        self.appel_commentaire(y=Y_IMG - 0.42)
