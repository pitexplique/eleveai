# stats_ajust_au_juge_short.py
# EleveAI — Maths STMG — short jumeau de 21-ajust-au-juge. CEINTURE JAUNE
# (un cran sous la paysage verte : on VOIT la règle, sans calcul). Il AMUSE :
#   · en HAUT, le chariot du e-commerce et le mot du moment (« Trop haut ! ») ;
#     EN MÊME TEMPS, en bas, la règle bleue glisse ou tourne dans le nuage ;
#   · « pile au milieu » : les écarts jaunes apparaissent des deux côtés ;
#   · 1 question-pause (3 s) : une droite au-dessus de tous les points convient-elle ? ;
#   · fin : (2014 ; 55) et (2019 ; 102) : de combien monte-t-elle par an ? (9,4).
# ⭐ Données RÉELLES : voir l'en-tête de stats_ajust_au_juge.py.
#
# Voix : manim/voix/stmg-stats-ajust-au-juge-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_au_juge_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_ajust_au_juge_short.py StatsAjustAuJugeShort -o eleveai-maths-stmg-stats-ajust-au-juge-short --media_dir manim/scripts/stmg/media-stats-ajust-au-juge-short
# Sortie : manim/sorties/stmg/maths/statistiques/21-ajust-au-juge/eleveai-maths-stmg-stats-ajust-au-juge-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403
from stats_ajust_au_juge import A_J, ANS, B_J, ECOM, D, chariot  # noqa: E402

Y_IMG = 1.7


class StatsAjustAuJugeShort(ShortJ1):
    nom_voix = "stmg-stats-ajust-au-juge-short"
    fichier_marques = "stats_ajust_au_juge_short_marques.json"

    def nuage(self):
        n = Nuage(ANS, ECOM, 2012, 2020, 40, 120, pas_x=2, pas_y=20, fin_x=1, fin_y=10, largeur=3.1, hauteur=2.6,
                  fs=19, nom_x="Année", nom_y="Milliards d'€")
        return self.caser_nuage(annees(n))

    def mot(self, txt, couleur, ancien=None):
        t = self.ligne([(txt, couleur)], 36).move_to(P(0, Y_IMG - 0.45))
        anims = [FadeIn(t, scale=0.7)] + ([FadeOut(ancien)] if ancien is not None else [])
        self.play(*anims, run_time=0.3)
        return t

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Où poser la règle ?", "jaune")
        self.add(badge)
        n = self.nuage()
        ch = chariot(0.6).move_to(P(-1.55, Y_IMG + 0.15))

        # ── 00 : le e-commerce ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(ch, shift=RIGHT * 0.3), run_time=0.6)
        garder = [badge, titre, self.mobjects[0]]
        self.au_mot("56,8 milliards")
        t0 = self.ligne([("56,8", VIOLET_CLAIR), ("en 2014", WHITE)], 30).move_to(P(0.6, Y_IMG + 0.25))
        self.play(FadeIn(n.ronds[0], scale=3), FadeIn(t0[0]), run_time=0.4)
        self.au_mot("2014,")
        self.play(FadeIn(t0[1]), run_time=0.25)
        self.au_mot("103,4")
        t1 = self.ligne([("103,4", VIOLET_CLAIR), ("en 2019", WHITE)], 30).move_to(P(0.6, Y_IMG - 0.3))
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in range(1, 6)], lag_ratio=0.2), FadeIn(t1[0]),
                  run_time=0.7)
        self.au_mot("2019.")
        self.play(FadeIn(t1[1]), run_time=0.25)
        self.attendre_voix(marge=0.1)
        self.play(FadeOut(VGroup(t0, t1)), run_time=0.25)

        # ── 01 : la règle bouge ──
        self.dire("01-image")
        self.au_mot("Trop haut")
        d = D(n, A_J, B_J + 22, sw=5)
        m = self.mot("Trop haut !", ROUGE_ERREUR)
        self.play(Create(d), run_time=0.4)
        self.au_mot("Trop bas")
        m = self.mot("Trop bas !", ROUGE_ERREUR, m)
        self.play(Transform(d, D(n, A_J, B_J - 20, sw=5)), run_time=0.5)
        self.au_mot("Trop penché")
        m = self.mot("Trop penché !", ROUGE_ERREUR, m)
        self.play(Transform(d, D(n, 17.0, 38.0, sw=5)), run_time=0.5)
        self.au_mot("pile au milieu")
        m = self.mot("Pile au milieu !", VERT_OK, m)
        self.play(Transform(d, D(n, A_J, B_J, sw=5)), run_time=0.6)
        self.au_mot("des points des deux côtés")
        self.play(Create(residus(n, A_J, B_J - A_J * 2014)), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Une droite passe au-dessus", "de tous les points.",
                                                           "Convient-elle ?"],
                            ["oui", "non", "oui, si elle a la bonne pente"], 1,
                            ["Elle doit passer au milieu :", "il faut la descendre."],
                            mots_q=["Une droite", "de tous les points", "Convient-elle"],
                            mots_choix=["oui. B", "non. C", "oui, si"], mots_ph=["Elle doit", "il faut"])
        self.vider(garder)

        # ── 03 : la pente, en commentaire ──
        self.dire("03-question")
        n2 = self.nuage()
        d2 = D(n2, A_J, B_J, sw=5)
        self.play(FadeIn(n2), Create(d2), run_time=0.5)
        self.au_mot("2014 et")
        p1 = point_droite(n2, A_J, B_J - A_J * 2014, 2014)
        t5 = self.ligne([("2014 :", WHITE), ("55", VIOLET_CLAIR)], 28).move_to(P(-1.05, Y_IMG + 0.2))
        self.play(FadeIn(p1, scale=2), FadeIn(t5), run_time=0.4)
        self.au_mot("2019.")
        p2 = point_droite(n2, A_J, B_J - A_J * 2014, 2019)
        t6 = self.ligne([("2019 :", WHITE), ("102", VIOLET_CLAIR)], 28).move_to(P(1.05, Y_IMG + 0.2))
        self.play(FadeIn(p2, scale=2), FadeIn(t6), run_time=0.4)
        self.au_mot("De combien monte-t-elle")
        t7 = self.ligne([("+ ? par an", ORANGE_RETENUE)], 38).move_to(P(0, Y_IMG - 0.4))
        self.play(FadeIn(t7, scale=0.7), run_time=0.35)
        self.insister(t7, 1.25)
        self.play(FadeOut(VGroup(t5, t6)), t7.animate.move_to(P(0, Y_IMG + 0.2)), run_time=0.35)
        self.appel_commentaire(y=Y_IMG - 0.42)
