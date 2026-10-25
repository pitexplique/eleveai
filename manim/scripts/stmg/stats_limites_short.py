# stats_limites_short.py
# EleveAI — Maths STMG — short jumeau de 26-limites. CEINTURE ORANGE (un cran
# sous la paysage bleue). Il AMUSE : « Jusqu'où prolonger ? » (la droite annonce plus de 100 %)
#   · en HAUT, le smartphone et les pourcentages ; EN MÊME TEMPS, en bas, la
#     droite se prolonge et entre dans la zone rouge (> 100 %), pendant que les
#     vrais points (77, 84, 87) s'aplatissent dessous ;
#   · 1 question-pause (3 s) : 104,5 % des Français équipés, possible ? (leurre :
#     « si certains ont deux smartphones » : on compte des personnes) ;
#   · fin : de combien de points la droite se trompe en 2020 ? (104,5 − 84 = 20,5).
# ⭐ Données RÉELLES : voir l'en-tête de stats_limites.py.
#
# Voix : manim/voix/stmg-stats-limites-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_limites_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_limites_short.py StatsLimitesShort -o eleveai-maths-stmg-stats-limites-short --media_dir manim/scripts/stmg/media-stats-limites-short
# Sortie : manim/sorties/stmg/maths/statistiques/26-limites/eleveai-maths-stmg-stats-limites-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403
from stats_limites import A, B, SMART, XS, XV, YV, telephone  # noqa: E402

Y_IMG = 1.7


class StatsLimitesShort(ShortJ1):
    nom_voix = "stmg-stats-limites-short"
    fichier_marques = "stats_limites_short_marques.json"

    def nuage(self):
        n = Nuage(XS, SMART, 0, 12, 0, 130, pas_x=2, pas_y=20, fin_x=1, fin_y=10, largeur=3.1, hauteur=2.6, fs=19,
                  nom_x="Années depuis 2011", nom_y="Avec smartphone (%)")
        return self.caser_nuage(n)

    def interdit(self, n):
        a, b = n.p(0, 100), n.p(12, 130)
        z = Rectangle(width=b[0] - a[0], height=b[1] - a[1], fill_color=ROUGE_ERREUR, fill_opacity=0.15,
                      stroke_width=0).move_to((a + b) / 2)
        return VGroup(z, DashedLine(n.p(0, 100), n.p(12, 100), color=ROUGE_ERREUR, stroke_width=4, dash_length=0.1))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Jusqu'où prolonger ?", "orange")
        self.add(badge)
        n = self.nuage()
        tel = telephone(0.95).move_to(P(-1.7, Y_IMG))

        # ── 00 : 2011 → 2016 ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(n.fond), FadeIn(tel, shift=UP * 0.2), run_time=0.6)
        garder = [badge, titre, self.mobjects[0]]
        t0 = self.ligne([("17 %", VIOLET_CLAIR), ("en 2011", WHITE)], 30).move_to(P(0.55, Y_IMG + 0.25))
        t1 = self.ligne([("65 %", VIOLET_CLAIR), ("en 2016", WHITE)], 30).move_to(P(0.55, Y_IMG - 0.25))
        self.reveler([(VGroup(t0[0], n.ronds[0]), "17 %"), (t0[1], "2011,"), (VGroup(t1[0], *n.ronds[1:]), "65 %"),
                      (t1[1], "2016.")])
        self.au_mot("Presque une droite")
        plein = droite(n, A, B, x0=0, x1=5, sw=5)
        self.play(Create(plein), run_time=0.5)
        self.au_mot("Prolongeons-la")
        fin = droite(n, A, B, x0=5)
        apres = DashedLine(fin.get_start(), fin.get_end(), color=BLEU_D, stroke_width=5, dash_length=0.1)
        self.play(FadeOut(VGroup(t0, t1)), Create(apres), run_time=0.9)
        self.attendre_voix(marge=0.1)

        # ── 01 : la droite dans le mur ──
        self.dire("01-image")
        self.au_mot("104,5 %")
        p = point_droite(n, A, B, 9, ROUGE_ERREUR)
        u = self.ligne([("2020 :", WHITE), ("104,5 % !", "#f87171")], 30)
        u.scale_to_fit_width(min(u.width, 2.65)).move_to(P(0.65, Y_IMG + 0.25))
        self.play(FadeIn(self.interdit(n)), FadeIn(p, scale=2), FadeIn(u), run_time=0.5)
        self.play(Flash(p, color=ROUGE_ERREUR), run_time=0.35)
        self.au_mot("84 %")
        v = VGroup(*[Dot(n.p(x, y), radius=0.08, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
                     for x, y in zip(XV, YV)])
        u2 = self.ligne([("En vrai :", WHITE), ("84 %", VERT_OK)], 30)
        u2.scale_to_fit_width(min(u2.width, 2.65)).move_to(P(0.65, Y_IMG - 0.3))
        self.play(FadeIn(v[1], scale=3), FadeIn(u2), run_time=0.4)
        self.au_mot("Les points s'aplatissent")
        self.play(FadeIn(v[0], scale=3), FadeIn(v[2], scale=3), run_time=0.4)
        courbe = VMobject(color=VERT_OK, stroke_width=4).set_points_smoothly(
            [n.p(x, y) for x, y in zip(XS + XV, SMART + YV)])
        self.play(Create(courbe), run_time=0.8)
        self.au_mot("dans le mur")
        self.play(Indicate(self.interdit(n)[1], color=ROUGE_ERREUR), Wiggle(tel), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["104,5 % des Français", "équipés, c'est…"],
                            ["possible", "impossible", "possible : 2 smartphones"], 1,
                            ["On compte des personnes :", "jamais plus de 100 %."], mot_q="104,5",
                            mots_choix=["possible. B", "impossible", "possible, si"], mots_ph=["On compte", "100 %."])
        self.vider(garder)

        # ── 03 : l'erreur, en commentaire ──
        self.dire("03-question")
        n2 = self.nuage()
        p2 = point_droite(n2, A, B, 9, ROUGE_ERREUR)
        vr = Dot(n2.p(9, 84), radius=0.08, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        self.play(FadeIn(n2), FadeIn(self.interdit(n2)), Create(droite(n2, A, B, sw=5)), run_time=0.5)
        self.au_mot("104,5 %")
        t5 = self.ligne([("Droite :", WHITE), ("104,5 %", "#f87171")], 30).move_to(P(0, Y_IMG + 0.25))
        self.play(FadeIn(t5), FadeIn(p2, scale=2), run_time=0.35)
        self.au_mot("84 %")
        t6 = self.ligne([("Réalité :", WHITE), ("84 %", VERT_OK)], 30).move_to(P(0, Y_IMG - 0.3))
        self.play(FadeIn(t6), FadeIn(vr, scale=3), Create(Line(p2.get_center(), vr.get_center(), color=AMBRE,
                                                               stroke_width=5)), run_time=0.4)
        self.au_mot("De combien de points")
        t7 = self.ligne([("Écart :", WHITE), ("? points", ORANGE_RETENUE)], 34).move_to(P(0, Y_IMG + 0.25))
        self.play(FadeOut(VGroup(t5, t6)), FadeIn(t7), run_time=0.35)
        self.insister(t7[1], 1.3)
        self.appel_commentaire(y=Y_IMG - 0.42)
