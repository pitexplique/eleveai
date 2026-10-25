# stats_mc_principe_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 27 « La droite des moindres
# carrés ». CEINTURE ORANGE (un cran sous la paysage verte). Il AMUSE : « le
# duel des droites » :
#   · une droite horizontale traverse le nuage pile au milieu : ses écarts
#     s'annulent (somme 0)… est-ce la meilleure ? ;
#   · surprise : au carré, les écarts DESSINÉS deviennent d'énormes carrés roses
#     (18 × 18 = 324 ; somme ≈ 958,6) ; la droite des moindres carrés les écrase
#     en tout petits carrés (≈ 6) ;
#   · 1 question-pause (3 s) : un écart de 5 pèse… 5, 10 ou 25 ? ;
#   · fin : un écart de 3 et un de −3 : somme des carrés ? (réponse : 18).
# ⭐ Données RÉELLES : voir l'en-tête de stats_mc_principe.py (Fevad).
# Centres d'intérêt : argent-budget, technologie-ia.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-mc-principe-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_mc_principe_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_mc_principe_short.py StatsMcPrincipeShort -o eleveai-maths-stmg-stats-mc-principe-short --media_dir manim/scripts/stmg/media-stats-mc-principe-short
# Sortie : manim/sorties/stmg/maths/statistiques/27-mc-principe/eleveai-maths-stmg-stats-mc-principe-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403
from stats_mc_principe import XS, YS, A, B, MY  # noqa: E402

Y1, Y2 = 1.75, 1.15  # les deux lignes de texte de la bande du haut


class StatsMcPrincipeShort(ShortJ2):
    nom_voix = "stmg-stats-mc-principe-short"
    fichier_marques = "stats_mc_principe_short_marques.json"

    def nuage(self):
        n = Nuage(XS, YS, 0, 6, 50, 110, pas_x=1, pas_y=10, fin_x=1, fin_y=5, largeur=3.2, hauteur=2.9, fs=19,
                  nom_x="Rang de l'année", nom_y="Chiffre d'affaires (Md€)")
        return self.caser_bas(n)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le duel des droites", "orange")
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        n = self.nuage()

        # ── 00 : la droite horizontale, somme des écarts nulle ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.25)
        self.au_mot("Cette droite")
        d = droite(n, 0, MY, GRIS_D, 5)
        self.play(Create(d), run_time=0.6)
        self.au_mot("ses écarts s'annulent")
        r = residus(n, 0, MY, sw=4)
        sg = VGroup(*[n.etiquette(i, "+" if YS[i] > MY else "−", RIGHT, VERT_OK if YS[i] > MY else ROUGE_ERREUR, fs=30)
                      for i in range(5)])
        self.play(LaggedStart(*[Create(x) for x in r], lag_ratio=0.15), FadeIn(sg), run_time=0.8)
        self.au_mot("leur somme fait 0")
        t0 = self.haut_txt([("somme des écarts =", WHITE), ("0", AMBRE)], 30, Y1)
        self.play(FadeIn(t0, shift=DOWN * 0.1), run_time=0.35)
        self.insister(t0[1], 1.6)
        self.au_mot("Est-ce la meilleure")
        t1 = self.haut_txt([("La meilleure ?", JAUNE_TITRE)], 36, Y2)
        self.play(FadeIn(t1, scale=0.7), run_time=0.35)
        self.attendre_voix(marge=0.1)

        # ── 01 : les carrés géants, puis la droite des moindres carrés ──
        self.dire("01-image")
        self.au_mot("Non")
        self.play(FadeOut(VGroup(t0, t1, sg)), run_time=0.25)
        non = self.haut_txt([("Non !", ROUGE_ERREUR)], 44, Y1)
        self.play(FadeIn(non, scale=0.6), run_time=0.3)
        self.au_mot("Élève chaque écart au carré")
        cs = carres(n, 0, MY)
        self.play(LaggedStart(*[GrowFromEdge(c, LEFT) for c in cs], lag_ratio=0.2), run_time=1.0)
        self.au_mot("un écart de 18")
        self.play(Indicate(cs[0], color=ROSE_C, scale_factor=1.15), run_time=0.4)
        self.au_mot("18 fois 18")
        t2 = self.haut_txt([("18 × 18 =", WHITE), ("324", ROSE_CLAIR)], 32, Y2)
        self.play(FadeOut(non), FadeIn(t2[0]), run_time=0.3)
        self.au_mot("soit 324")
        self.play(FadeIn(t2[1]), run_time=0.3)
        self.au_mot("environ 958,6")
        t3 = self.haut_txt([("somme des carrés ≈", WHITE), ("958,6", ROUGE_ERREUR)], 28, Y1)
        self.play(FadeIn(t3), run_time=0.35)
        self.insister(t3[1], 1.15)
        self.au_mot("La droite des moindres carrés")
        cs2 = carres(n, A, B)
        self.play(d.animate.become(droite(n, A, B, BLEU_D, 5)), Transform(cs, cs2), FadeOut(r), FadeOut(t2), run_time=1.0)
        self.au_mot("environ 6")
        t4 = self.haut_txt([("moindres carrés :", BLEU_CLAIR), ("≈ 6", VERT_OK)], 30, Y2)
        self.play(FadeIn(t4, scale=0.7), run_time=0.35)
        self.insister(t4[1], 1.15)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Un écart de 5 pèse combien", "dans la somme des carrés ?"],
                            ["5", "10", "25"], 2, ["5 × 5 = 25"], mot_q="Un écart de 5")
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        self.au_mot("un écart de 3")
        q = self.haut_txt([("3²", ROSE_CLAIR), ("+", WHITE), ("(−3)²", ROSE_CLAIR), ("=", WHITE), ("?", ORANGE_RETENUE)], 40, Y1)
        s1 = Square(1.0, color=ROSE_C, fill_opacity=0.35)
        l1 = self.t("3", 34, AMBRE).next_to(s1, DOWN, buff=0.12)
        VGroup(s1, l1).move_to(P(-1.0, 0.1))
        self.play(GrowFromEdge(s1, DOWN), FadeIn(l1), FadeIn(q[0]), FadeIn(q[1]), run_time=0.4)
        self.au_mot("moins 3")
        s2 = Square(1.0, color=ROSE_C, fill_opacity=0.35)
        l2 = self.t("−3", 34, AMBRE).next_to(s2, DOWN, buff=0.12)
        VGroup(s2, l2).move_to(P(1.0, 0.1))
        self.play(GrowFromEdge(s2, UP), FadeIn(l2), FadeIn(q[2]), run_time=0.4)
        self.au_mot("Que vaut la somme")
        self.play(FadeIn(q[3]), FadeIn(q[4]), run_time=0.3)
        self.insister(q[4], 1.3)
        self.appel_commentaire(y=-1.3)
