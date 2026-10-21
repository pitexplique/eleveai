# stats_lire_graphique_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 06 :
# lire un graphique. CEINTURE BLANCHE. Il AMUSE : « En deux semaines, la
# récolte de letchis est multipliée par combien ? »
#   · en HAUT, les cagettes de letchis (1 cagette = 100 kg) qui arrivent en
#     même temps que la barre de la semaine pousse ;
#   · en BAS, le diagramme du coach (manim/canvas_stats.py) : semaine 1 = 200,
#     semaine 3 = 600 ; TROIS barres de la semaine 1 s'empilent exactement sur
#     celle de la semaine 3 ;
#   · fin : la semaine 2 (450), l'écart avec la semaine 1 marqué « ? »,
#     « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
#
# Voix : manim/voix/6e-stats-lire-graphique-short.json (débit −10), WAV dans
# public/sons/6e-stats-lire-graphique-short/ ; calage mot à mot :
# manim/scripts/6e/stats_lire_graphique_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_lire_graphique_short.py StatsLireGraphiqueShort6e -o eleveai-maths-6e-stats-lire-graphique-short --media_dir manim/scripts/6e/media-lire-graphique-short
# Sortie : manim/sorties/6e/maths/statistiques/06-lire-graphique/eleveai-maths-6e-stats-lire-graphique-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from stats_graphique_completer import MotsCalesDossier, P  # noqa: E402
from stats_lire_graphique import COUL, ROUGE_LETCHI, grappe  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, Barres  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

Y_CAG, Y_TXT = 1.78, 1.12
HAUT_CARTE = 0.68


def cagette(larg=0.55):
    """Une cagette en bois pleine de letchis."""
    bois = Rectangle(width=larg, height=larg * 0.55, fill_color="#a16207", fill_opacity=1, stroke_color="#fde68a",
                     stroke_width=2)
    fruits = VGroup(*[Circle(radius=larg * 0.1, fill_color=ROUGE_LETCHI, fill_opacity=1, stroke_width=0)
                      .move_to(bois.get_top() + RIGHT * larg * (k - 1.5) * 0.24 + DOWN * larg * 0.02)
                      for k in range(4)])
    return VGroup(fruits, bois)


class StatsLireGraphiqueShort6e(MotsCalesDossier, Short6e):
    nom_voix = "6e-stats-lire-graphique-short"
    fichier_marques = "stats_lire_graphique_short_marques.json"
    dossier_marques = Path(__file__).resolve().parent
    interpoler = True  # une marque WinRT manque dans « 600. 200 fois 3, égale 600 » (retirée du json)

    def t(self, s, fs=36, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def insister(self, mob, k=1.3, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def changer(self, ancien, nouveau):
        return AnimationGroup(FadeOut(ancien, shift=UP * 0.2), FadeIn(nouveau, shift=UP * 0.2))

    def graphe(self):
        g = Barres(["Sem. 1", "Sem. 2", "Sem. 3"], [200, 450, 600], pas=100, maxi=700, couleurs=COUL[:3],
                   nom_axe="Masse (kg)", largeur=2.8, hauteur=2.4, fs=22)
        return g.move_to(P(0.05, HAUT_CARTE - g.height / 2))

    def val(self, g, i):
        v = g.valeur(i, fs=24)
        gauche = g.axe_y.get_center()[0] + 0.08
        if v.get_left()[0] < gauche:
            v.shift(RIGHT * (gauche - v.get_left()[0]))
        return v

    def ligne(self, a, b, coul=AMBRE, fs=34):
        return VGroup(self.t(a, fs), self.t(b, fs + 2, coul)).arrange(RIGHT, buff=0.2)

    def cagettes(self, n, x0=None):
        c = VGroup(*[cagette() for _ in range(n)]).arrange(RIGHT, buff=0.1)
        return c.move_to(P(0, Y_CAG))

    def construct(self):
        self.margo_bas()
        titre = self.borne(VGroup(grappe(4, 0.14), self.t("Les letchis", 46, JAUNE_TITRE)).arrange(RIGHT, buff=0.2),
                           0.6).move_to(P(0, 3.45))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        self.add(badge, titre)
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(g.fond), run_time=0.3)
        self.au_mot("En deux semaines")
        q1 = self.borne(self.t("En 2 semaines :", 36)).move_to(P(0, Y_CAG))
        self.play(FadeIn(q1, shift=DOWN * 0.2), Indicate(VGroup(g.etiquettes[0], g.etiquettes[2]), color=AMBRE),
                  run_time=0.5)
        self.au_mot("multipliée par combien")
        q2 = self.borne(self.t("× combien ?", 44, ORANGE_RETENUE)).move_to(P(0, Y_TXT))
        self.play(FadeIn(q2, scale=1.5), run_time=0.4)
        self.insister(q2, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : semaine 1, semaine 3, trois fois plus ──
        self.dire("01-image")
        self.au_mot("Semaine 1")
        c2 = self.cagettes(2)
        self.play(FadeOut(VGroup(q1, q2)), g.pousser(0, run_time=0.6), FadeIn(c2, shift=DOWN * 0.3))
        self.au_mot("200 kilogrammes")
        v0 = self.val(g, 0)
        l1 = self.borne(self.ligne("Semaine 1 :", "200 kg")).move_to(P(0, Y_TXT))
        self.play(FadeIn(v0, scale=1.8), FadeIn(l1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Semaine 3")
        c6 = self.cagettes(6)
        self.play(g.pousser(2, run_time=0.6), Transform(c2, c6[:2]), FadeIn(c6[2:], shift=DOWN * 0.3), run_time=0.6)
        self.au_mot("600. 200")
        v2 = self.val(g, 2)
        l3 = self.borne(self.ligne("Semaine 3 :", "600 kg")).move_to(P(0, Y_TXT))
        self.play(FadeIn(v2, scale=1.8), self.changer(l1, l3), run_time=0.3)
        self.au_mot("200 fois 3")
        h0 = g.barres[0].height
        x2 = g.barres[2].get_center()[0]
        pile = VGroup()
        for k in range(3):
            c = g.barres[0].copy().set_fill(COUL[0], opacity=0.85).set_stroke(ORANGE_RETENUE, 5)
            pile.add(c.move_to(P(x2, g.base(2)[1] + h0 * (k + 0.5))))
        calc = VGroup(self.t("200 × 3 =", 36), self.t("600", 38, AMBRE)).arrange(RIGHT, buff=0.2)
        self.borne(calc).move_to(P(0, Y_TXT))
        self.play(self.changer(l3, calc[0]), LaggedStart(*[TransformFromCopy(g.barres[0], p) for p in pile],
                                                         lag_ratio=0.5), run_time=0.7)
        self.au_mot("égale 600")
        self.play(FadeIn(calc[1], scale=1.6), run_time=0.3)
        self.au_mot("trois fois plus")
        trois = self.borne(self.t("3 fois plus !", 42, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(self.changer(calc, trois), Indicate(pile, color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.5)
        self.insister(trois, 1.15)
        self.au_mot("Les cueilleurs")
        self.play(LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.2) for c in c6[2:]], Indicate(c2),
                              lag_ratio=0.1), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("En semaine 2")
        self.play(FadeOut(VGroup(pile, trois, c2, c6[2:]), shift=UP * 0.1), g.pousser(1, run_time=0.7))
        self.au_mot("450 kilogrammes")
        v1 = self.val(g, 1)
        l2 = self.borne(self.ligne("Semaine 2 :", "450 kg")).move_to(P(0, Y_CAG))
        self.play(FadeIn(v1, scale=1.8), FadeIn(l2, shift=DOWN * 0.2), g.estomper([0, 1], 0.35), run_time=0.4)
        self.au_mot("Combien de plus")
        q = self.borne(self.t("Combien de plus qu'en semaine 1 ?", 30)).move_to(P(0, Y_TXT))
        xg = g.barres[1].get_left()[0] + 0.12
        niveau = DashedLine(g.barres[0].get_corner(UR), P(xg, g.point(0)[1]), color=AMBRE, stroke_width=5,
                            dash_length=0.1)
        ecart = DoubleArrow(P(xg, g.point(0)[1]), P(xg, g.point(1)[1]), buff=0, color=ORANGE_RETENUE,
                            stroke_width=6, tip_length=0.14, max_tip_length_to_length_ratio=0.3)
        point_q = self.t("?", 48, ORANGE_RETENUE).set_stroke(WHITE, 4, background=True)
        point_q.next_to(ecart, RIGHT, buff=0.08)
        self.play(FadeIn(q, shift=UP * 0.2), Create(niveau), GrowFromCenter(ecart), FadeIn(point_q, scale=1.6),
                  run_time=0.5)
        self.insister(point_q, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(self.changer(q, appel), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
