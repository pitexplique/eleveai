# stats_interpreter_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 09 :
# interpréter un graphique. CEINTURE JAUNE (un cran sous la paysage orange :
# on ne fait que VOIR le piège de l'axe, sans le démontrer). Il AMUSE :
# « Ça explose ! » dit le journal… regarde bien l'axe.
#   · en HAUT la télévision, son bandeau « ÇA EXPLOSE ! » et une explosion ;
#   · en BAS, EN MÊME TEMPS, le graphique du coach à l'axe TRONQUÉ (nombres
#     cachés) : trois fois plus haute ?! puis 980 se révèle, 1 000 et 1 040
#     s'écrivent au mot, « seulement 40 de plus », le bandeau se fait barrer ;
#   · fin : « si l'axe partait de 0 : trois fois plus haute ? Oui ou non ? ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/6e-stats-interpreter-short.json (débit −10), WAV dans
# public/sons/6e-stats-interpreter-short/ ; calage mot à mot :
# manim/scripts/6e/stats_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_interpreter_short.py StatsInterpreterShort6e -o eleveai-maths-6e-stats-interpreter-short --media_dir manim/scripts/6e/media-interpreter-short
# Sortie : manim/sorties/6e/maths/statistiques/09-interpreter/eleveai-maths-6e-stats-interpreter-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from stats_interpreter import ANS, C_BAR, INSCRITS, bandeau_jt, tele  # noqa: E402
from canvas_stats import AMBRE, Barres  # noqa: E402

Y_TXT = -0.05


class StatsInterpreterShort6e(MotsCales6, OutilsShort, Short6e):
    nom_voix = "6e-stats-interpreter-short"
    fichier_marques = "stats_interpreter_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Au journal télé", "jaune")
        self.add(badge)
        tv = tele(3.9, 1.85).move_to(P(0, 1.3))
        tv[0].set_opacity(0)  # pas de pied : la place est comptée
        b = bandeau_jt("ÇA EXPLOSE !", tv[2].width).move_to(tv[2].get_bottom() + UP * 0.3)
        boum = Star(10, outer_radius=0.55, inner_radius=0.28, fill_color="#facc15", fill_opacity=1,
                    stroke_color="#f97316", stroke_width=4).move_to(tv[2].get_center() + UP * 0.25)
        g = Barres(ANS, INSCRITS, pas=20, mini=980, maxi=1060, couleurs=C_BAR, largeur=2.6, hauteur=1.7, fs=24)
        for nb in g.nombres.values():
            nb.set_opacity(0)
        g.scale_to_fit_height(2.3).move_to(P(0.1, -1.62))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Ça explose")
        self.play(FadeIn(titre), FadeIn(tv[1:], scale=0.9), run_time=0.35)
        self.play(GrowFromCenter(boum), FadeIn(b, shift=LEFT * 0.4), run_time=0.4)
        self.play(Rotate(boum, PI / 5), run_time=0.3)
        self.au_mot("Regarde bien ce graphique")
        self.play(FadeIn(g.fond, shift=UP * 0.2), run_time=0.35)
        self.play(g.pousser(run_time=0.7))
        self.add(g)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'axe commence à 980 ──
        self.dire("01-image")
        self.au_mot("trois fois plus haute")
        h = g.barres[0].height
        x = g.barres[1].get_right()[0] + 0.18
        y0 = g.barres[0].get_bottom()[1]
        pile = VGroup(*[Rectangle(width=0.2, height=h, stroke_color=ORANGE_RETENUE, stroke_width=4).move_to(
            P(x, y0 + h * (k + 0.5))) for k in range(3)])
        t3 = self.ligne([("3 fois", ORANGE_RETENUE), ("plus haute ?!", WHITE)], 32).move_to(P(0, Y_TXT))
        self.play(LaggedStart(*[Create(r) for r in pile], lag_ratio=0.4), FadeIn(t3, shift=UP * 0.2), run_time=0.8)
        self.au_mot("Mais l'axe commence à 980")
        nb = g.nombre(980)
        self.au_mot("980")
        self.play(nb.animate.set_opacity(1).set_color(ROUGE_ERREUR), FadeOut(pile), run_time=0.3)
        self.play(nb.animate.scale(2.0), run_time=0.3)
        self.play(nb.animate.scale(0.5), run_time=0.3)
        ax = self.ligne([("l'axe part de", WHITE), ("980", ROUGE_ERREUR), ("!", ROUGE_ERREUR)], 32).move_to(P(0, Y_TXT))
        self.play(FadeOut(t3), FadeIn(ax), run_time=0.3)
        self.au_mot("1 000, puis")
        v0 = g.valeur(0, fs=24)
        self.play(FadeIn(v0, scale=1.6), run_time=0.3)
        self.au_mot("1 040")
        v1 = g.valeur(1, fs=24)
        self.play(FadeIn(v1, scale=1.6), run_time=0.3)
        self.au_mot("Seulement 40 de plus")
        s40 = self.ligne([("seulement", WHITE), ("40", VERT_OK), ("de plus", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(FadeOut(ax), FadeIn(s40, scale=0.7), run_time=0.35)
        self.insister(s40[1], 1.5)
        self.au_mot("Le graphique trompe")
        xx = croix(b, sw=6)
        self.play(Create(xx), boum.animate.set_opacity(0), run_time=0.4)
        tr = self.t("Il trompe !", 40, ROUGE_ERREUR).move_to(tv[2].get_center() + UP * 0.35)
        self.play(FadeIn(tr, scale=1.5), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Si l'axe partait de 0")
        q1 = self.ligne([("Axe depuis", WHITE), ("0", VERT_OK), (":", WHITE)], 34).move_to(P(0, 0.35))
        self.play(FadeOut(s40), FadeOut(VGroup(tv[1:], b, boum, xx, tr)), FadeIn(q1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("trois fois plus haute")
        q2 = self.ligne([("3 fois", ORANGE_RETENUE), ("plus haute ?", WHITE)], 34).move_to(P(0, -0.15))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Oui ou non")
        on = self.t("Oui ou non ?", 46, ORANGE_RETENUE).move_to(P(0, 1.4))
        self.play(FadeIn(on, scale=0.6), run_time=0.35)
        self.insister(on, 1.15)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, 0.75))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
