# stats_graphique_interpreter_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 07 : interpréter un diagramme en barres. CEINTURE BLANCHE. Il AMUSE :
# « Combien de pluie peut tomber en un seul jour ? »
#   · en HAUT, le nuage et les phrases (février dans l'Est, puis Foc-Foc) ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (manim/canvas_stats.py) : la
#     pluie tombe sur chaque barre pendant qu'elle pousse ; la barre d'UN JOUR
#     à Foc-Foc dépasse de loin celle d'UN MOIS ;
#   · fin : le niveau de 450 reporté sur la grande barre, « combien de fois ? »,
#     « Réponds en commentaire ! ».
# Donnée réelle : record du monde de pluie en 24 h, 1 825 mm à Foc-Foc (Cilaos),
# 7-8 janvier 1966 (cyclone Denise, Météo-France / OMM).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
#
# Voix : manim/voix/cm-stats-graphique-interpreter-short.json (débit −10), WAV
# dans public/sons/cm-stats-graphique-interpreter-short/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_interpreter_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_graphique_interpreter_short.py StatsGraphiqueInterpreterShort -o eleveai-maths-cm1-stats-graphique-interpreter-short --media_dir manim/scripts/cm1/media-graphique-interpreter-short
# Sorties : manim/sorties/cm1/maths/statistiques/07-graphique-interpreter/eleveai-maths-cm1-stats-graphique-interpreter-short.mp4
#           manim/sorties/cm2/maths/statistiques/07-graphique-interpreter/eleveai-maths-cm2-stats-graphique-interpreter-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_graphique_completer import MotsCalesDossier, P  # noqa: E402
from stats_graphique_interpreter import BLEU_PLUIE, gouttes, nuage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, Barres  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

Y_MED, Y_TXT = 1.75, 1.15
HAUT_CARTE = 0.68


class StatsGraphiqueInterpreterShort(MotsCalesDossier, Short6e):
    nom_voix = "cm-stats-graphique-interpreter-short"
    fichier_marques = "stats_graphique_interpreter_short_marques.json"

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
        g = Barres(["1 mois", "1 jour"], [450, 1825], pas=500, maxi=2000, couleurs=[BLEU_PLUIE, "#1d4ed8"],
                   nom_axe="Pluie (mm)", largeur=2.7, hauteur=2.5, fs=24)
        return g.move_to(P(0.05, HAUT_CARTE - g.height / 2))

    def pluie_sur(self, g, i, run_time):
        """Des gouttes tombent sur la barre i pendant qu'elle pousse."""
        d = gouttes(4, g.barres[i].width * 0.8).move_to(P(g.barres[i].get_center()[0], HAUT_CARTE - 0.35))
        return AnimationGroup(GrowFromEdge(g.barres[i], DOWN),
                              Succession(FadeIn(d, run_time=0.15),
                                         d.animate(run_time=run_time - 0.3).shift(DOWN * 1.4).set_opacity(0)),
                              run_time=run_time)

    def val(self, g, i):
        v = g.valeur(i, fs=24)
        gauche = g.axe_y.get_center()[0] + 0.08
        if v.get_left()[0] < gauche:
            v.shift(RIGHT * (gauche - v.get_left()[0]))
        return v

    def construct(self):
        self.margo_bas()
        titre = self.borne(VGroup(nuage(0.45), self.t("Record de pluie", 42, JAUNE_TITRE)).arrange(RIGHT, buff=0.2),
                           0.5).move_to(P(0, 3.45))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        self.add(badge, titre)
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(g.fond), run_time=0.3)
        self.au_mot("Combien de pluie")
        q = self.borne(VGroup(self.t("Combien de pluie", 34), self.t("en un seul jour ?", 34, BLEU_PLUIE))
                       .arrange(DOWN, buff=0.12)).move_to(P(0, (Y_MED + Y_TXT) / 2))
        self.play(FadeIn(q[0], shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("en un seul jour")
        self.play(FadeIn(q[1], shift=DOWN * 0.2), Indicate(g.etiquettes[1], color=AMBRE), run_time=0.4)
        self.insister(q[1], 1.12)
        self.attendre_voix(marge=0.1)

        # ── 01 : un mois dans l'Est, un jour à Foc-Foc ──
        self.dire("01-image")
        self.au_mot("Dans une ville de l'Est")
        l1 = self.borne(self.t("Dans l'Est, en février :", 32)).move_to(P(0, Y_MED))
        self.play(self.changer(q, l1), run_time=0.4)
        self.au_mot("450 millimètres")
        v0 = self.val(g, 0)
        self.play(self.pluie_sur(g, 0, 1.0), run_time=1.0)
        self.play(FadeIn(v0, scale=1.8), run_time=0.3)
        self.au_mot("en un mois entier")
        l2 = self.borne(self.t("en un mois entier", 34, BLEU_PLUIE)).move_to(P(0, Y_TXT))
        self.play(FadeIn(l2, shift=UP * 0.2), Indicate(g.etiquettes[0], color=AMBRE), run_time=0.4)
        self.au_mot("À Foc-Foc")
        l3 = self.borne(self.t("À Foc-Foc, près de Cilaos", 32)).move_to(P(0, Y_MED))
        self.play(self.changer(l1, l3), FadeOut(l2), run_time=0.4)
        self.au_mot("en janvier 1966")
        l4 = self.borne(self.ligne2("en janvier", "1966", BLEU_CALCUL)).move_to(P(0, Y_TXT))
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.35)
        self.au_mot("1 825 millimètres")
        v1 = self.val(g, 1)
        self.play(self.pluie_sur(g, 1, 1.4), run_time=1.4)
        self.play(FadeIn(v1, scale=1.8), run_time=0.3)
        self.au_mot("en un seul jour")
        l5 = self.borne(self.t("en un seul jour !", 36, BLEU_PLUIE)).move_to(P(0, Y_TXT))
        self.play(self.changer(l4, l5), Indicate(g.etiquettes[1], color=AMBRE), run_time=0.4)
        self.insister(VGroup(g.barres[1], v1), 1.08)
        self.au_mot("C'est le record du monde")
        rec = self.borne(self.t("Record du monde !", 40, JAUNE_TITRE)).move_to(P(0, Y_MED))
        self.play(self.changer(l3, rec), run_time=0.4)
        self.play(Flash(v1, color=JAUNE_TITRE, line_length=0.25), run_time=0.5)
        self.insister(rec, 1.12)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("1 825 millimètres")
        l6 = self.borne(self.ligne2("1 825 mm, c'est environ", "", WHITE)).move_to(P(0, Y_MED))
        self.play(self.changer(rec, l6), FadeOut(l5), Indicate(v1, color=AMBRE, scale_factor=1.3), run_time=0.45)
        self.au_mot("combien de fois 450")
        l7 = self.borne(self.ligne2("combien de fois", "450 ?", BLEU_PLUIE)).move_to(P(0, Y_TXT))
        niveau = DashedLine(g.barres[0].get_corner(UR), P(g.barres[1].get_right()[0] + 0.1, g.point(0)[1]),
                            color=AMBRE, stroke_width=5, dash_length=0.1)
        fois = self.t("× ?", 40, ORANGE_RETENUE).set_stroke(WHITE, 4, background=True)
        fois.next_to(g.barres[1], LEFT, buff=0.08).shift(UP * 0.4)
        self.play(FadeIn(l7, shift=UP * 0.2), Create(niveau), Indicate(v0, color=AMBRE, scale_factor=1.3),
                  run_time=0.5)
        self.play(FadeIn(fois, scale=1.6), run_time=0.3)
        self.insister(fois, 1.3)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(self.changer(l7, appel), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)

    def ligne2(self, a, b, couleur):
        morceaux = [self.t(a, 32)] + ([self.t(b, 34, couleur)] if b else [])
        return VGroup(*morceaux).arrange(RIGHT, buff=0.2)
