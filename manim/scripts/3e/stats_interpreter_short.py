# stats_interpreter_short.py
# EleveAI — Maths 3e — short jumeau de la série « Statistiques » (cycle 4),
# épisode 07 « interpréter des indicateurs ». CEINTURE ORANGE (un cran sous la
# paysage verte : on VOIT la moyenne bondir et la médiane rester sage, aucun
# calcul à faire). Il AMUSE : « Et si le patron entrait ? »
#   · en HAUT, six salariés ; puis le patron entre, avec son gros salaire ;
#   · en BAS, EN MÊME TEMPS, la droite graduée du coach (`number_line`,
#     AxePoints) : un point par salaire ; le repère vert de la MOYENNE bondit
#     de 2 000 à 2 600 quand le point du patron tombe à 6 200, le repère orange
#     de la MÉDIANE glisse seulement de 1 950 à 2 000 ;
#   · fin : un footballeur à 100 000 € entre aussi : la médiane des 8 ? (2 050).
# Données (voir stats_interpreter.py) : 1 800, 1 900, 1 900, 2 000, 2 100,
# 2 300 (moyenne 2 000, médiane 1 950) + 6 200 (moyenne 2 600, médiane 2 000).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/3e-stats-interpreter-short.json ; calage :
# manim/scripts/3e/stats_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/stats_interpreter_short.py StatsInterpreterShort -o eleveai-maths-3e-stats-interpreter-short --media_dir manim/scripts/3e/media-interpreter-short
# Sortie : manim/sorties/3e/maths/statistiques/07-interpreter/eleveai-maths-3e-stats-interpreter-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from stats4e_lotf_commun import *  # noqa: E402,F403

SIX = [1800, 1900, 1900, 2000, 2100, 2300]
Y_PERS = 1.5
Y_TXT = 0.72
C_MOY, C_MED = VERT_OK, ORANGE_RETENUE


def repere_bas(ax, v, couleur, txt):
    """Un repère sous l'axe : petit triangle qui pointe vers la valeur, et son texte."""
    x = ax.x(v)
    tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.11).move_to(x + DOWN * 0.62)
    t = texte(txt, 20, couleur).next_to(tri, DOWN, buff=0.05)
    return VGroup(tri, t)


def repere_haut(ax, v, couleur, txt, h=1.05):
    x = ax.x(v)
    tr = DashedLine(x + UP * 0.05, x + UP * h, color=couleur, stroke_width=4, dash_length=0.07)
    t = texte(txt, 20, couleur).next_to(tr, UP, buff=0.04)
    return VGroup(tr, t)


class StatsInterpreterShort(ShortF):
    nom_voix = "3e-stats-interpreter-short"
    fichier_marques = "stats_interpreter_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le patron arrive", "orange")
        self.add(badge)
        ax = AxePoints([v / 1000 for v in SIX + [6200]], 1, 7, 1, sous_pas=0.5, longueur=3.4, couleur="#93c5fd",
                       fs=22, nom="k€", rayon=0.09, hauteur_carte=2.5, centre=ORIGIN)
        ax.scale_to_fit_width(4.15).move_to(P(0, -1.15))
        pers = VGroup(*[personne(c, p, 0.16) for c, p in zip(["#38bdf8", "#a78bfa", "#34d399", "#f472b6",
                                                               "#fbbf24", "#60a5fa"],
                                                              ["#8d5524", "#c68642", "#e0ac69", "#8d5524",
                                                               "#f1c27d", "#c68642"])]).arrange(RIGHT, buff=0.18)
        pers.move_to(P(-0.45, Y_PERS))

        # ── 00 : six salariés ──
        self.dire("00-accroche")
        self.play(Write(titre), LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in pers], lag_ratio=0.1),
                  FadeIn(ax.fond), run_time=0.8)
        self.au_mot("entre 1 800")
        t1 = self.ligne([("de", WHITE), ("1 800", BLEU_CALCUL)], 30).move_to(P(-0.9, Y_TXT))
        self.play(FadeIn(t1), *[FadeIn(ax.ronds[i], shift=DOWN * 0.3) for i in range(6)], run_time=0.5)
        self.au_mot("et 2 300")
        t2 = self.ligne([("à", WHITE), ("2 300 €", BLEU_CALCUL)], 30).next_to(t1, RIGHT, buff=0.2)
        self.play(FadeIn(t2), run_time=0.3)
        self.au_mot("2 000 euros")
        moy = repere_bas(ax, 2.0, C_MOY, "moyenne 2 000")
        t3 = self.ligne([("Moyenne :", C_MOY), ("2 000 €", C_MOY)], 32).move_to(P(0, Y_TXT))
        self.play(FadeOut(VGroup(t1, t2)), FadeIn(t3), FadeIn(moy, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Et si le patron")
        t4 = self.ligne([("Et si le patron entrait", WHITE), ("?", ORANGE_RETENUE)], 30).move_to(P(0, Y_TXT))
        self.play(FadeOut(t3), FadeIn(t4), run_time=0.35)
        self.insister(t4[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : le patron ──
        self.dire("01-image")
        patron = VGroup(personne("#dc2626", "#f1c27d", 0.24, "#1f2937"),
                        Text("€", font_size=30, color=JAUNE_TITRE, weight=BOLD)).arrange(RIGHT, buff=0.04)
        patron.move_to(P(3.0, Y_PERS + 0.1))
        self.play(FadeOut(t4), patron.animate.move_to(P(1.75, Y_PERS + 0.1)), run_time=0.6)
        self.au_mot("6 200 euros")
        t5 = self.ligne([("Le patron :", WHITE), ("6 200 €", ROUGE_ERREUR)], 30).move_to(P(0, Y_TXT))
        self.play(FadeIn(t5), FadeIn(ax.ronds[6], shift=DOWN * 0.5), ax.ronds[6].animate.set_fill(ROUGE_ERREUR),
                  run_time=0.45)
        self.au_mot("La moyenne grimpe")
        moy2 = repere_bas(ax, 2.6, C_MOY, "moyenne 2 600")
        t6 = self.ligne([("Moyenne :", C_MOY), ("2 600 € !", C_MOY)], 32).move_to(P(0, Y_TXT))
        self.au_mot("2 600 euros")
        self.play(FadeOut(t5), FadeIn(t6), Transform(moy, moy2), run_time=0.6)
        self.insister(t6, 1.15)
        self.au_mot("La médiane, elle")
        med = repere_haut(ax, 1.95, C_MED, "médiane")
        t7 = self.ligne([("Médiane :", C_MED)], 32).move_to(P(0, Y_TXT))
        self.play(FadeOut(t6), FadeIn(t7), run_time=0.3)
        self.au_mot("de 1 950")
        v1 = self.t("1 950", 32, C_MED).next_to(t7, RIGHT, buff=0.2)
        self.borne(VGroup(t7, v1)).move_to(P(0, Y_TXT))
        self.play(FadeIn(v1), Create(med[0]), FadeIn(med[1]), run_time=0.35)
        self.au_mot("à 2 000")
        v2 = self.ligne([("→", WHITE), ("2 000", C_MED)], 32).next_to(v1, RIGHT, buff=0.15)
        med2 = repere_haut(ax, 2.0, C_MED, "médiane")
        self.borne(VGroup(t7, v1, v2)).move_to(P(0, Y_TXT))
        self.play(FadeIn(v2), Transform(med, med2), run_time=0.4)
        self.au_mot("Une seule valeur extrême")
        fin = self.borne(self.t("Une valeur extrême tire la moyenne !", 26, VERT_OK)).move_to(P(0, -2.75))
        self.play(FadeIn(fin, scale=0.8), Indicate(ax.ronds[6], color=ROUGE_ERREUR, scale_factor=2), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("un footballeur")
        foot = VGroup(maillot("10", "#16a34a", 0.32), ballon(0.12)).arrange(RIGHT, buff=0.05)
        foot.move_to(P(-0.6, Y_PERS + 0.1))
        self.play(FadeOut(VGroup(t7, v1, v2, fin)), FadeOut(pers), patron.animate.move_to(P(1.2, Y_PERS + 0.1)),
                  FadeIn(foot, scale=0.5), run_time=0.5)
        self.au_mot("100 000 euros")
        cent = self.t("100 000 € !", 32, JAUNE_TITRE).move_to(P(0, Y_TXT))
        hors = Arrow(ax.x(6.6) + UP * 0.45, ax.x(7) + UP * 0.45 + RIGHT * 0.3, buff=0, color=JAUNE_TITRE,
                     stroke_width=5)
        self.play(FadeIn(cent, scale=1.4), GrowArrow(hors), run_time=0.4)
        self.au_mot("la médiane des 8")
        q = self.ligne([("Médiane des", WHITE), ("8", BLEU_CALCUL), ("salaires :", WHITE), ("?", ORANGE_RETENUE)], 30)
        q.move_to(P(0, Y_TXT))
        self.play(FadeOut(cent), FadeIn(q), FadeOut(med), run_time=0.35)
        self.insister(q[3], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, -2.75))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
