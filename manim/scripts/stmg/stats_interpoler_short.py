# stats_interpoler_short.py
# EleveAI — Maths STMG — short jumeau de 24-interpoler. CEINTURE ORANGE (un
# cran sous la paysage verte). Il AMUSE : « Et en 2012 ? »
#   · en HAUT, la petite ville et les chiffres ; EN MÊME TEMPS, en bas, les
#     relevés tous les 5 ans, puis la droite et le point de 2012 entre eux ;
#   · surprise : l'estimation (65) colle au vrai chiffre de l'Insee (65,2) ;
#   · 1 question-pause (3 s) : interpoler, c'est entre / après / avant ? ;
#   · fin : population en 2007 avec y = 0,35 x + 60,8 ? (63,25 ≈ 63,3 ; vrai 63,6).
# ⭐ Données RÉELLES : voir l'en-tête de stats_interpoler.py.
#
# Voix : manim/voix/stmg-stats-interpoler-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_interpoler_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_interpoler_short.py StatsInterpolerShort -o eleveai-maths-stmg-stats-interpoler-short --media_dir manim/scripts/stmg/media-stats-interpoler-short
# Sortie : manim/sorties/stmg/maths/statistiques/24-interpoler/eleveai-maths-stmg-stats-interpoler-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403
from stats_interpoler import A, B, POP, XS, immeubles  # noqa: E402

Y_IMG = 1.7


class StatsInterpolerShort(ShortJ1):
    nom_voix = "stmg-stats-interpoler-short"
    fichier_marques = "stats_interpoler_short_marques.json"

    def nuage(self):
        n = Nuage(XS, POP, 0, 25, 58, 70, pas_x=5, pas_y=4, fin_x=5, fin_y=2, largeur=3.1, hauteur=2.6, fs=19,
                  nom_x="Années depuis 2000", nom_y="Population (millions)")
        return self.caser_nuage(n)

    def zone(self, n):
        a, b = n.p(0, n.ymin), n.p(20, n.ymax)
        return Rectangle(width=b[0] - a[0], height=b[1] - a[1], fill_color=VERT_OK, fill_opacity=0.18,
                         stroke_width=0).move_to((a + b) / 2)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Et entre les points ?", "orange")
        self.add(badge)
        n = self.nuage()
        v = immeubles(0.7).move_to(P(-1.5, Y_IMG))

        # ── 00 : deux relevés ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(v, shift=UP * 0.2), run_time=0.6)
        garder = [badge, titre, self.mobjects[0]]
        self.au_mot("tous les 5 ans")
        self.play(LaggedStart(*[FadeIn(r, scale=2) for r in n.ronds], lag_ratio=0.2), run_time=0.8)
        t0 = self.ligne([("60,5 M", VIOLET_CLAIR), ("en 2000", WHITE)], 28).move_to(P(0.55, Y_IMG + 0.25))
        t1 = self.ligne([("67,4 M", VIOLET_CLAIR), ("en 2020", WHITE)], 28).move_to(P(0.55, Y_IMG - 0.25))
        self.reveler([(t0[0], "60,5"), (t0[1], "2000,"), (t1[0], "67,4"), (t1[1], "2020.")])
        self.au_mot("2012 ?")
        q = self.ligne([("2012 : ?", ORANGE_RETENUE)], 34).move_to(P(0.65, Y_IMG))
        self.play(FadeOut(VGroup(t0, t1)), FadeIn(q, scale=0.7), Create(n.verticale(12)), run_time=0.45)
        self.attendre_voix(marge=0.1)

        # ── 01 : la droite, entre les points ──
        self.dire("01-image")
        self.au_mot("La droite")
        self.play(FadeIn(self.zone(n)), Create(droite(n, A, B, sw=5)), run_time=0.6)
        self.au_mot("65 millions")
        p = point_droite(n, A, B, 12)
        hz = lecture(n, A, B, 12)[1]
        q2 = self.ligne([("2012 :", WHITE), ("≈ 65 M", BLEU_CLAIR)], 30)
        q2.scale_to_fit_width(min(q2.width, 2.6)).move_to(P(0.65, Y_IMG + 0.25))
        self.play(FadeIn(p, scale=2), Create(hz), FadeOut(q), FadeIn(q2), run_time=0.5)
        self.au_mot("65,2")
        vrai = Dot(n.p(12, 65.24), radius=0.08, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        q3 = self.ligne([("Insee :", WHITE), ("65,2 M", VERT_OK)], 30)
        q3.scale_to_fit_width(min(q3.width, 2.6)).move_to(P(0.65, Y_IMG - 0.3))
        self.play(FadeIn(vrai, scale=3), FadeIn(q3), run_time=0.4)
        self.au_mot("Bien vu")
        self.play(Flash(vrai, color=VERT_OK), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Interpoler, c'est", "estimer une valeur…"],
                            ["entre les relevés", "après le dernier relevé", "avant le premier"], 0,
                            ["Entre les relevés :", "l'estimation la plus sûre."], mot_q="Interpoler",
                            mots_choix=["entre les", "après le", "avant le"], mots_ph=["Entre les relevés", "c'est là"])
        self.vider(garder)

        # ── 03 : 2007, en commentaire ──
        self.dire("03-question")
        n2 = self.nuage()
        self.play(FadeIn(n2), Create(droite(n2, A, B, sw=5)), run_time=0.5)
        eq = self.ligne([("y =", WHITE), ("0,35", AMBRE), ("x +", WHITE), ("60,8", VIOLET_CLAIR)], 32)
        eq.move_to(P(0, Y_IMG + 0.25))
        self.reveler([(eq[0], "y égale"), (eq[1:3], "0,35 x"), (eq[3], "60,8,")])
        self.au_mot("2007")
        t = self.ligne([("2007 :", WHITE), ("? millions", ORANGE_RETENUE)], 32).move_to(P(0, Y_IMG - 0.3))
        self.play(FadeIn(t), Create(n2.verticale(7)), run_time=0.45)
        self.insister(t[1], 1.3)
        self.play(FadeOut(eq), t.animate.move_to(P(0, Y_IMG + 0.25)), run_time=0.3)
        self.appel_commentaire(y=Y_IMG - 0.42)
