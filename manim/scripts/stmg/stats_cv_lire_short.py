# stats_cv_lire_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 31 « Lire un nuage
# transformé ». CEINTURE VERTE (un cran sous la paysage bleue).
# Il AMUSE : « la puce qui double » :
#   · EN HAUT, une puce se couvre de transistors (des carrés qui se multiplient) ;
#     EN BAS, au même instant, le nuage des transistors Intel reste au sol puis
#     s'envole ;
#   · surprise : avec z = log(y), les points s'ALIGNENT (même facteur chaque
#     année : environ 1,40) ;
#   · 1 question-pause (3 s) : affine, exponentiel ou constant ? ;
#   · fin : ×2 tous les deux ans : par combien en 10 ans ? (réponse : 32).
# ⭐ Données RÉELLES : voir l'en-tête de stats_cv_lire.py (Intel).
# Centres d'intérêt : technologie-ia, sciences.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-cv-lire-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_cv_lire_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_cv_lire_short.py StatsCvLireShort -o eleveai-maths-stmg-stats-cv-lire-short --media_dir manim/scripts/stmg/media-stats-cv-lire-short
# Sortie : manim/sorties/stmg/maths/statistiques/31-cv-lire/eleveai-maths-stmg-stats-cv-lire-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403
from stats_cv_lire import XS, YM, ZS, A, B, puce  # noqa: E402

Y_IMG, Y_T = 1.45, 1.88


class StatsCvLireShort(ShortJ2):
    nom_voix = "stmg-stats-cv-lire-short"
    fichier_marques = "stats_cv_lire_short_marques.json"

    def nuage(self, z=False):
        if z:
            n = Nuage(XS, ZS, 0, 40, 3, 9, pas_x=10, pas_y=1, fin_x=5, fin_y=1, largeur=3.2, hauteur=2.6, fs=19,
                      nom_x="Années depuis 1970", nom_y="z = log(y)")
        else:
            n = Nuage(XS, YM, 0, 40, 0, 300, pas_x=10, pas_y=100, fin_x=5, fin_y=50, largeur=3.2, hauteur=2.6, fs=19,
                      nom_x="Années depuis 1970", nom_y="Transistors (millions)")
        return self.caser_bas(n)

    def droite_txt(self, m, y):
        """Un texte à droite de la puce, sans jamais approcher le bord droit."""
        if m.width > 2.6:
            m.scale_to_fit_width(2.6)
        return m.move_to(P(0.75, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La puce qui double", "verte")
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        n = self.nuage()
        pc = puce(0.85).move_to(P(-1.35, Y_IMG - 0.1))

        def grains(k):
            """k transistors (carrés) sur la puce."""
            c = pc[2]
            m = int(np.ceil(np.sqrt(k)))
            s = c.width / m
            g = VGroup(*[Square(s * 0.8, fill_color=AMBRE, fill_opacity=1, stroke_width=0).move_to(
                c.get_corner(UL) + RIGHT * s * (i % m + 0.5) + DOWN * s * (i // m + 0.5)) for i in range(k)])
            return g

        # ── 00 : au sol, puis l'envol ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(pc), run_time=0.25)
        self.au_mot("2 300 transistors")
        g = grains(1)
        t1 = self.droite_txt(self.ligne([("1971 :", WHITE), ("2 300", VIOLET_CLAIR)], 28), Y_T)
        self.play(FadeIn(g), FadeIn(t1), FadeIn(n.ronds[0], scale=3), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in (1, 2, 3)], lag_ratio=0.2),
                  Transform(g, grains(4)), run_time=0.7)
        self.au_mot("291 millions")
        t2 = self.droite_txt(self.ligne([("2006 :", WHITE), ("291 M", VIOLET_CLAIR)], 28), Y_T - 0.55)
        self.play(FadeIn(t2), Transform(g, grains(36)), FadeIn(n.ronds[4], scale=3), FadeIn(n.ronds[5], scale=3),
                  run_time=0.6)
        self.au_mot("la courbe s'envole")
        courbe = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=4).set_points_smoothly(
            [n.p(x, min(300, 10 ** (A * x + B) / 1e6)) for x in (0, 10, 20, 25, 30, 33, 35.5, 36.5)])
        self.play(Create(courbe), Flash(n.ronds[5], color=AMBRE), run_time=0.8)
        self.attendre_voix(marge=0.1)

        # ── 01 : avec log(y), ça s'aligne ──
        self.dire("01-image")
        self.au_mot("avec z égale log de y")
        m = self.nuage(z=True)
        zt = self.droite_txt(self.ligne([("y", VIOLET_CLAIR), ("→", WHITE), ("z = log(y)", VERT_OK)], 30), Y_T)
        self.play(FadeOut(VGroup(t1, t2, courbe)), FadeIn(zt), run_time=0.35)
        n.ronds.set_z_index(5)
        self.play(*[n.ronds[i].animate.move_to(m.ronds[i]) for i in range(6)], FadeTransform(n.fond, m.fond), run_time=1.2)
        self.au_mot("s'alignent")
        self.play(Create(droite(m, A, B, BLEU_D, 5)), run_time=0.6)
        self.au_mot("le même facteur")
        f = self.droite_txt(self.ligne([("× 1,40", AMBRE), ("par an", WHITE)], 32), Y_T - 0.55)
        self.au_mot("environ 1,40")
        self.play(FadeIn(f, scale=0.6), run_time=0.4)
        self.insister(f[0], 1.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Le nuage (x ; log y)", "est aligné. y est donc…"],
                            ["affine", "exponentiel", "constant"], 1, ["C'est log(y)", "qui est affine."], mot_q="Le nuage")
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        self.au_mot("multiplié par 2")
        barres = VGroup(*[Rectangle(width=0.4, height=0.1 * 2 ** k, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
                          for k in range(5)]).arrange(RIGHT, buff=0.18, aligned_edge=DOWN).move_to(P(0, -0.4))
        lab = self.ligne([("× 2", AMBRE), ("tous les 2 ans", WHITE)], 32).move_to(P(0, 1.15))
        self.play(FadeIn(lab), LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.2), run_time=0.9)
        self.au_mot("en 10 ans")
        q = self.ligne([("En 10 ans :", WHITE), ("× ?", ORANGE_RETENUE)], 40).move_to(P(0, 1.85))
        self.play(FadeIn(q, shift=DOWN * 0.1), run_time=0.4)
        self.insister(q[1], 1.25)
        self.appel_commentaire(y=-1.7)
