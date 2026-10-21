# stats_defi_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 10 :
# le défi des lettres. CEINTURE JAUNE (un cran sous la paysage orange : on ne
# décode rien, on compte et on compare deux effectifs). Il AMUSE : quelle
# lettre revient le plus souvent en français ? Devine !
#   · en HAUT le livre de Victor Hugo, d'où sortent le E et le A ;
#   · en BAS, EN MÊME TEMPS, le diagramme en bâtons du coach : le bâton du E
#     monte à 19, celui du A à 18, au mot où la voix les dit ; le E gagne de
#     justesse ; le cadenas des casseurs de codes s'ouvre ;
#   · fin : le mot ANANAS, « quelle lettre, combien de fois ? », « Réponds en
#     commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/6e-stats-defi-short.json (débit −10), WAV dans
# public/sons/6e-stats-defi-short/ ; calage mot à mot :
# manim/scripts/6e/stats_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_defi_short.py StatsDefiShort6e -o eleveai-maths-6e-stats-defi-short --media_dir manim/scripts/6e/media-defi-short
# Sortie : manim/sorties/6e/maths/statistiques/10-defi/eleveai-maths-6e-stats-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from stats_defi import cadenas  # noqa: E402
from canvas_stats import AMBRE, NUIT, Barres  # noqa: E402

Y_TXT = -0.25


def livre(larg=2.6, h=1.3):
    g = Polygon(P(-larg / 2, -h / 2), P(0, -h / 2 + 0.12), P(0, h / 2 + 0.12), P(-larg / 2, h / 2),
                fill_color="#fef3c7", fill_opacity=1, stroke_color="#d97706", stroke_width=3)
    d = g.copy().flip(UP, about_point=ORIGIN)
    lignes = VGroup(*[Line(P(x0, y), P(x0 + larg * 0.36, y + 0.03), color="#a8a29e", stroke_width=3)
                      for x0 in (-larg * 0.44, larg * 0.07) for y in np.linspace(h * 0.3, -h * 0.3, 5)])
    return VGroup(g, d, lignes)


class StatsDefiShort6e(MotsCales6, OutilsShort, Short6e):
    nom_voix = "6e-stats-defi-short"
    fichier_marques = "stats_defi_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La lettre championne", "jaune")
        self.add(badge)
        g = Barres(["E", "A"], [19, 18], pas=5, sous_pas=1, maxi=20, batons=True, couleurs=[AMBRE, "#60a5fa"],
                   largeur=2.4, hauteur=1.9, fs=26)
        g.scale_to_fit_height(2.2).move_to(P(0.1, -1.8))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Dans un texte en français")
        self.play(FadeIn(titre), run_time=0.4)
        self.au_mot("quelle lettre")
        lettres = VGroup(*[self.t(l, 64, c) for l, c in (("E", AMBRE), ("A", "#60a5fa"), ("S", "#86efac"),
                                                         ("T", "#fca5a5"))]).arrange(RIGHT, buff=0.45)
        lettres.move_to(P(0, 1.3))
        qs = VGroup(*[self.t("?", 34, ORANGE_RETENUE).next_to(l, UR, buff=0.0) for l in lettres])
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.3) for l in lettres], lag_ratio=0.2), FadeIn(qs), run_time=0.8)
        self.au_mot("Devine")
        dv = self.t("Devine !", 46, ORANGE_RETENUE).move_to(P(0, Y_TXT))
        self.play(FadeIn(dv, scale=0.6), *[Wiggle(l) for l in lettres], run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : la course du E et du A ──
        self.dire("01-image")
        self.au_mot("Dans les quatre premiers vers")
        lv = livre().move_to(P(0, 1.25))
        hugo = self.t("Victor Hugo", 30, JAUNE_TITRE).next_to(lv, DOWN, buff=0.12)
        self.play(FadeOut(VGroup(lettres, qs, dv)), FadeIn(lv, scale=0.8), run_time=0.45)
        self.au_mot("Victor Hugo")
        self.play(FadeIn(hugo, shift=UP * 0.2), FadeIn(g.fond, shift=UP * 0.2), run_time=0.45)
        vals = []
        for i, (mot, val) in enumerate([("le E, 19 fois", "19 fois"), ("Le A, 18 fois", "18 fois")]):
            self.au_mot(mot)
            l = self.t(g.categories[i], 54, [AMBRE, "#60a5fa"][i]).move_to(lv.get_center())
            self.play(l.animate.move_to(g.point(i) + UP * 0.45).scale(0.5).set_opacity(0), g.pousser(i, run_time=0.7),
                      run_time=0.7)
            self.au_mot(val)
            v = g.valeur(i, fs=26)
            self.play(FadeIn(v, scale=1.7), run_time=0.3)
            vals.append(v)
        self.add(g, *vals)  # les valeurs restent devant la carte
        self.au_mot("Le E gagne")
        gagne = self.ligne([("E", AMBRE), ("gagne, de justesse !", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(g.focus(0, 0.45), FadeOut(hugo), FadeIn(gagne, scale=0.7), run_time=0.45)
        self.insister(gagne, 1.12)
        self.au_mot("Les casseurs de codes")
        cad = cadenas(0.6).move_to(lv.get_center())
        self.play(FadeOut(lv), FadeIn(cad, scale=0.5), run_time=0.35)
        self.play(cad[0].animate.shift(UP * 0.18).rotate(0.4, about_point=cad[0].get_right()), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Dans le mot ANANAS")
        cases = VGroup()
        for l in "ANANAS":
            r = RoundedRectangle(width=0.6, height=0.7, corner_radius=0.08, fill_color="#1e293b", fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=3)
            cases.add(VGroup(r, Text(l, font_size=40, color=WHITE, font="Consolas").move_to(r)))
        cases.arrange(RIGHT, buff=0.08).move_to(P(0, 1.25))
        self.play(FadeOut(VGroup(cad, gagne)), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cases],
                                                           lag_ratio=0.12), run_time=0.7)
        self.au_mot("quelle lettre revient le plus")
        q1 = self.ligne([("Quelle lettre ?", ORANGE_RETENUE)], 36).move_to(P(0, 0.3))
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.au_mot("combien de fois")
        q2 = self.ligne([("Combien de fois ?", ORANGE_RETENUE)], 36).move_to(P(0, -0.2))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, -1.2))
        self.play(FadeOut(VGroup(g, *vals)), FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
