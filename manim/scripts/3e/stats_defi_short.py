# stats_defi_short.py
# EleveAI — Maths 3e — short jumeau de la série « Statistiques » (cycle 4),
# épisode 08 « défis ». CEINTURE VERTE (un cran sous la paysage bleue : une
# moyenne de 4 valeurs, puis un défi « objectif » à résoudre en commentaire).
# Il AMUSE : « Course de batteries ! Jusqu'où ira la moyenne ? »
#   · en HAUT, la route et ses bornes kilométriques (70 à 90 km) : chaque vélo
#     roule jusqu'à la panne et plante son fanion ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (canvas_stats.Barres) : la
#     barre du vélo pousse quand il s'arrête, sa valeur s'écrit au mot ;
#   · la moyenne, 81, se pose sur la route ET sur le diagramme ;
#   · fin : le 5e vélo « ? » : combien de km pour une moyenne de 82 ? (86).
# Données VRAISEMBLABLES (voir stats_defi.py) : 78, 84, 80, 82 → 324 ÷ 4 = 81 ;
# 82 × 5 − 324 = 86.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/3e-stats-defi-short.json ; calage :
# manim/scripts/3e/stats_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/stats_defi_short.py StatsDefiShort -o eleveai-maths-3e-stats-defi-short --media_dir manim/scripts/3e/media-defi-short
# Sortie : manim/sorties/3e/maths/statistiques/08-defi/eleveai-maths-3e-stats-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from stats4e_lotf_commun import *  # noqa: E402,F403

KM4 = [78, 84, 80, 82]
COUL = ["#38bdf8", "#f472b6", "#facc15", "#a78bfa", "#fb923c"]
Y_ROUTE = 1.05
X70, X90 = -1.85, 1.95
Y_TXT = 0.45


def x_km(k):
    return X70 + (X90 - X70) * (k - 70) / 20


def velo_mini(couleur, s=0.32):
    r1 = Circle(radius=0.3 * s, color=WHITE, stroke_width=3).move_to(P(-0.5 * s, 0))
    r2 = Circle(radius=0.3 * s, color=WHITE, stroke_width=3).move_to(P(0.5 * s, 0))
    cadre = VMobject(stroke_color=couleur, stroke_width=5).set_points_as_corners(
        [P(-0.5 * s, 0), P(-0.1 * s, 0.45 * s), P(0.4 * s, 0.45 * s), P(0.5 * s, 0), P(0, 0), P(-0.5 * s, 0)])
    return VGroup(r1, r2, cadre)


def fanion(couleur, h=0.45):
    mat = Line(ORIGIN, UP * h, color=WHITE, stroke_width=3)
    dra = Polygon(P(0, h), P(0.22, h - 0.08), P(0, h - 0.16), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(mat, dra)


class StatsDefiShort(ShortF):
    nom_voix = "3e-stats-defi-short"
    fichier_marques = "stats_defi_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Course de batteries", "verte")
        self.add(badge)
        route = Line(P(-2.2, Y_ROUTE), P(2.2, Y_ROUTE), color="#64748b", stroke_width=10)
        bornes = VGroup()
        for k in (70, 75, 80, 85, 90):
            b = VGroup(RoundedRectangle(width=0.36, height=0.3, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                                        stroke_color="#dc2626", stroke_width=3),
                       texte(k, 16, NUIT)).move_to(P(x_km(k), Y_ROUTE - 0.3))
            b[1].move_to(b[0])
            bornes.add(b)
        g = Barres(["V1", "V2", "V3", "V4", "V5"], KM4 + [0], pas=20, maxi=100, couleurs=COUL, largeur=3.2,
                   hauteur=1.9, fs=20, nom_axe="km")
        g.scale_to_fit_width(4.0).move_to(P(0, -0.15), aligned_edge=UP)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), Create(route), FadeIn(bornes), run_time=0.7)
        self.au_mot("jusqu'à la panne")
        v0 = velo_mini(COUL[0]).move_to(P(-2.0, Y_ROUTE + 0.22))
        self.play(FadeIn(v0, shift=RIGHT * 0.3), run_time=0.3)
        self.play(v0.animate.shift(RIGHT * 0.6), run_time=0.6)
        self.au_mot("Jusqu'où ira la moyenne")
        q = self.ligne([("Moyenne :", WHITE), ("?", ORANGE_RETENUE)], 34).move_to(P(0, Y_TXT))
        self.play(FadeIn(q), FadeIn(g.fond), FadeOut(v0), run_time=0.4)
        self.insister(q[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : la course ──
        self.dire("01-image")
        self.play(FadeOut(q), run_time=0.2)
        fanions = VGroup()
        for i, p in enumerate(self.nombres_apres("Premier vélo", 4)):
            v = velo_mini(COUL[i]).move_to(P(-2.4, Y_ROUTE + 0.22))
            self.add(v)
            self.au_i(p)
            f = fanion(COUL[i]).move_to(P(x_km(KM4[i]) + 0.1, Y_ROUTE + 0.25 + 0.0))
            val = g.valeur(i, fs=22)
            self.play(v.animate.move_to(P(x_km(KM4[i]), Y_ROUTE + 0.22)), GrowFromEdge(g.barres[i], DOWN),
                      FadeIn(val, scale=1.5), run_time=0.45)
            self.play(FadeIn(f, shift=DOWN * 0.15), FadeOut(v), run_time=0.2)
            fanions.add(f)
        self.au_mot("Total : 324")
        tot = self.ligne([("Total :", WHITE), ("324", BLEU_CALCUL)], 32).move_to(P(0, Y_TXT))
        self.play(FadeIn(tot), run_time=0.3)
        self.au_mot("Divisé par 4")
        d = self.ligne([("324", BLEU_CALCUL), ("÷", WHITE), ("4", BLEU_CALCUL)], 32).move_to(P(0, Y_TXT))
        self.play(FadeOut(tot), FadeIn(d), run_time=0.3)
        self.au_mot("81 kilomètres")
        r = self.ligne([("324", BLEU_CALCUL), ("÷", WHITE), ("4", BLEU_CALCUL), ("=", WHITE), ("81 km", VERT_OK)], 32)
        r.move_to(P(0, Y_TXT))
        lr = DashedLine(P(x_km(81), Y_ROUTE - 0.1), P(x_km(81), Y_ROUTE + 0.75), color=VERT_OK, stroke_width=5)
        y81 = g.y_axe(81)[1]
        lg = DashedLine(P(g.y_axe(81)[0], y81), P(g.base(4)[0] + 0.3, y81), color=VERT_OK, stroke_width=4,
                        dash_length=0.08)
        self.play(FadeOut(d), FadeIn(r), Create(lr), Create(lg), run_time=0.5)
        self.insister(r[4], 1.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Le cinquième vélo")
        v5 = velo_mini(COUL[4]).move_to(P(-2.4, Y_ROUTE + 0.22))
        self.play(FadeOut(r), v5.animate.move_to(P(-1.2, Y_ROUTE + 0.22)), run_time=0.6)
        self.au_mot("Combien de kilomètres")
        qb = self.t("?", 40, ORANGE_RETENUE).move_to(g.base(4) + UP * 0.4)
        self.play(FadeIn(qb, scale=1.6), run_time=0.3)
        self.au_mot("la moyenne des 5")
        q1 = self.ligne([("Moyenne des", WHITE), ("5", BLEU_CALCUL), (":", WHITE), ("82", ORANGE_RETENUE)], 32)
        q1.move_to(P(0, Y_TXT))
        self.au_mot("monte à 82")
        self.play(FadeIn(q1, scale=0.8), run_time=0.35)
        self.insister(q1[3], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, -2.85))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
