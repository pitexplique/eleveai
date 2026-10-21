# stats_graphique_completer_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 06 : compléter un diagramme en barres. CEINTURE BLANCHE. Il AMUSE :
# « En 2010, deux fois plus d'habitants qu'en 1954 ? Trois fois plus ? »
#   · en HAUT, La Réunion et la question (× 2 ? × 3 ?) ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (manim/canvas_stats.py) :
#     la barre de 1954, puis celle de 2010 ; TROIS barres de 1954 s'empilent
#     sur celle de 2010 et s'arrêtent juste en dessous (810 000 < 820 000) ;
#   · fin : la barre de 1974, l'écart avec 1954 marqué « ? », « Réponds en
#     commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit (les
# nombres de l'axe sont des étiquettes). Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/cm-stats-graphique-completer-short.json (débit −10), WAV
# dans public/sons/cm-stats-graphique-completer-short/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_completer_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_graphique_completer_short.py StatsGraphiqueCompleterShort -o eleveai-maths-cm1-stats-graphique-completer-short --media_dir manim/scripts/cm1/media-graphique-completer-short
# Sorties : manim/sorties/cm1/maths/statistiques/06-graphique-completer/eleveai-maths-cm1-stats-graphique-completer-short.mp4
#           manim/sorties/cm2/maths/statistiques/06-graphique-completer/eleveai-maths-cm2-stats-graphique-completer-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_graphique_completer import MotsCalesDossier, P, ile  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, Barres  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

Y_MED, Y_TXT = 1.75, 1.15  # deux lignes de texte au-dessus du diagramme
HAUT_CARTE = 0.68          # le haut de la carte du diagramme
BLEU_B, JAUNE_B = "#93c5fd", "#fcd34d"


class StatsGraphiqueCompleterShort(MotsCalesDossier, Short6e):
    nom_voix = "cm-stats-graphique-completer-short"
    fichier_marques = "stats_graphique_completer_short_marques.json"

    def t(self, s, fs=36, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def insister(self, mob, k=1.3, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def graphe(self):
        g = Barres(["1954", "1974", "2010"], [270000, 480000, 820000], pas=300000, sous_pas=100000, maxi=900000,
                   couleurs=[BLEU_B, BLEU_B, JAUNE_B], largeur=2.7, hauteur=2.4, fs=22)
        return g.move_to(P(0.05, HAUT_CARTE - g.height / 2))

    def val(self, g, i):
        """La valeur au-dessus de la barre i, sans mordre sur l'axe ni sortir de la carte."""
        v = g.valeur(i, fs=22)
        gauche = g.axe_y.get_center()[0] + 0.08
        if v.get_left()[0] < gauche:
            v.shift(RIGHT * (gauche - v.get_left()[0]))
        droite = g.carte.get_right()[0] - 0.08
        if v.get_right()[0] > droite:
            v.shift(LEFT * (v.get_right()[0] - droite))
        return v

    def ligne_hab(self, a, b, fs=36):
        return VGroup(self.t(a, fs), self.t(b, fs + 2, JAUNE_TITRE)).arrange(RIGHT, buff=0.25)

    def changer(self, ancien, nouveau):
        """Une ligne de texte en remplace une autre (fondu, jamais superposé)."""
        return AnimationGroup(FadeOut(ancien, shift=UP * 0.2), FadeIn(nouveau, shift=UP * 0.2))

    def construct(self):
        self.margo_bas()
        nom = self.t("La Réunion", 46, JAUNE_TITRE)
        titre = self.borne(VGroup(ile(0.28), nom).arrange(RIGHT, buff=0.2), 0.6).move_to(P(0, 3.45))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        self.add(badge)
        g = self.graphe()

        # ── 00 : l'accroche, deux fois plus ? trois fois plus ? ──
        self.dire("00-accroche")
        self.add(titre, g.fond)
        self.au_mot("En 1954")
        self.play(g.pousser(0, run_time=0.6), Indicate(g.etiquettes[0], color=AMBRE))
        self.au_mot("270 000")
        v0 = self.val(g, 0)
        l1 = self.borne(self.ligne_hab("1954 :", "270 000")).move_to(P(0, Y_MED))
        self.play(FadeIn(v0, scale=1.8), FadeIn(l1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("Et en 2010")
        l2 = VGroup(self.t("2010 :", 36), self.t("× 2 ?", 38, BLEU_CALCUL), self.t("× 3 ?", 38, ORANGE_RETENUE))
        self.borne(l2.arrange(RIGHT, buff=0.3)).move_to(P(0, Y_TXT))
        q = self.t("?", 40, ORANGE_RETENUE).move_to(l2[1])
        self.play(FadeIn(l2[0], shift=UP * 0.2), FadeIn(q, scale=1.5), Indicate(g.etiquettes[2], color=AMBRE),
                  run_time=0.4)
        self.au_mot("Deux fois plus")
        self.play(FadeOut(q), FadeIn(l2[1], scale=1.5), run_time=0.35)
        self.au_mot("Trois fois plus")
        self.play(FadeIn(l2[2], scale=1.5), run_time=0.35)
        self.insister(l2[1:], 1.12)
        self.attendre_voix(marge=0.1)

        # ── 01 : 2010, et trois barres de 1954 empilées ──
        self.dire("01-image")
        self.au_mot("En 2010")
        self.play(FadeOut(l2[1:]), g.pousser(2, run_time=0.8))
        self.au_mot("820 000")
        v2 = self.val(g, 2)
        l2b = self.borne(self.ligne_hab("2010 :", "820 000")).move_to(P(0, Y_TXT))
        self.play(FadeIn(v2, scale=1.8), FadeOut(l2[0]), FadeIn(l2b, shift=UP * 0.2), run_time=0.4)
        self.au_mot("La barre est")
        h0 = g.barres[0].height
        x2 = g.barres[2].get_center()[0]
        pile = VGroup()
        for k in range(3):
            c = g.barres[0].copy().set_fill(BLEU_B, opacity=0.85).set_stroke(ORANGE_RETENUE, 5)
            cible = c.copy().move_to(P(x2, g.base(2)[1] + h0 * (k + 0.5)))
            pile.add(cible)
            self.play(TransformFromCopy(g.barres[0], cible), run_time=0.45)
        self.au_mot("trois fois plus haute")
        l2c = self.borne(self.ligne_hab("un peu plus de", "× 3 !")).move_to(P(0, Y_TXT))
        self.play(self.changer(l2b, l2c), Indicate(pile, color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.5)
        self.au_mot("270 000 fois 3")
        calc = VGroup(self.t("270 000 × 3 =", 34), self.t("810 000", 36, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        self.borne(calc).move_to(P(0, Y_MED))
        self.play(self.changer(l1, calc[0]), run_time=0.45)
        self.au_mot("810 000")
        # le petit bout qui dépasse : de 810 000 à 820 000
        haut_pile = pile[2].get_top()
        bout = Line(P(x2 + 0.42, haut_pile[1]), P(x2 + 0.42, g.barres[2].get_top()[1]), color=VERT_OK,
                    stroke_width=8)
        y_bout = (haut_pile[1] + g.barres[2].get_top()[1]) / 2
        fl_bout = Arrow(P(x2 + 0.75, y_bout + 0.55), P(x2 + 0.36, y_bout), buff=0, color=VERT_OK, stroke_width=6,
                        tip_length=0.18, max_tip_length_to_length_ratio=0.4)
        bout = VGroup(bout, fl_bout)
        self.play(FadeIn(calc[1], scale=1.6), Create(bout), run_time=0.4)
        self.insister(calc[1], 1.2)
        self.play(Indicate(bout, color=VERT_OK, scale_factor=2.0), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question, 1974 ──
        self.dire("02-question")
        self.au_mot("En 1974")
        self.play(FadeOut(VGroup(pile, bout, calc, l2c), shift=UP * 0.1), g.pousser(1, run_time=0.7))
        self.au_mot("480 000")
        v1 = self.val(g, 1)
        l3 = self.borne(self.ligne_hab("1974 :", "480 000")).move_to(P(0, Y_MED))
        self.play(FadeIn(v1, scale=1.8), FadeIn(l3, shift=DOWN * 0.2), g.estomper([0, 1], 0.35), run_time=0.4)
        self.au_mot("Combien de plus")
        q = self.borne(self.t("Combien de plus qu'en 1954 ?", 32)).move_to(P(0, Y_TXT))
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
