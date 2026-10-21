# stats_graphique_defi_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 08 : un défi avec un diagramme en barres. CEINTURE JAUNE (un cran
# sous la paysage verte : on lit trois barres et on compare). Il AMUSE :
# « Quel jour aller au cinéma pour être presque seul dans la salle ? »
#   · en HAUT, la salle de cinéma : 30 fauteuils (1 fauteuil = 10 entrées)
#     qui se remplissent en même temps que la barre du jour s'allume ;
#   · en BAS, le diagramme du coach (manim/canvas_stats.py) : samedi 300,
#     dimanche 250, jeudi 80 s'écrivent au mot ;
#   · fin : l'écart samedi – jeudi marqué « ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
#
# Voix : manim/voix/cm-stats-graphique-defi-short.json (débit −10), WAV dans
# public/sons/cm-stats-graphique-defi-short/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_defi_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_graphique_defi_short.py StatsGraphiqueDefiShort -o eleveai-maths-cm1-stats-graphique-defi-short --media_dir manim/scripts/cm1/media-graphique-defi-short
# Sorties : manim/sorties/cm1/maths/statistiques/08-graphique-defi/eleveai-maths-cm1-stats-graphique-defi-short.mp4
#           manim/sorties/cm2/maths/statistiques/08-graphique-defi/eleveai-maths-cm2-stats-graphique-defi-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_graphique_completer import MotsCalesDossier, P  # noqa: E402
from stats_graphique_defi import ENTREES, JOURS, VIOLET, bobine  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, Barres  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

Y_SALLE, Y_TXT = 1.78, 1.1
HAUT_CARTE = 0.68
VIDE, PLEIN = "#334155", "#a78bfa"


class StatsGraphiqueDefiShort(MotsCalesDossier, Short6e):
    nom_voix = "cm-stats-graphique-defi-short"
    fichier_marques = "stats_graphique_defi_short_marques.json"

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
        g = Barres(JOURS, ENTREES, pas=100, sous_pas=50, maxi=300, couleurs=[VIOLET] * 5, nom_axe="Entrées",
                   largeur=3.0, hauteur=2.3, fs=22)
        return g.move_to(P(0.05, HAUT_CARTE - g.height / 2))

    def salle(self):
        """30 fauteuils en 3 rangées de 10 (1 fauteuil = 10 entrées)."""
        f = VGroup(*[RoundedRectangle(width=0.27, height=0.17, corner_radius=0.05, fill_color=VIDE, fill_opacity=1,
                                      stroke_color="#94a3b8", stroke_width=1.5) for _ in range(30)])
        f.arrange_in_grid(rows=3, cols=10, buff=(0.07, 0.08))
        return f.move_to(P(0, Y_SALLE))

    def remplir(self, salle, n):
        """Les n premiers fauteuils occupés (depuis le premier rang), les autres vides."""
        return AnimationGroup(*[s.animate.set_fill(PLEIN if k < n else VIDE) for k, s in enumerate(salle)],
                              lag_ratio=0.01)

    def val(self, g, i):
        v = g.valeur(i, fs=22)
        gauche = g.axe_y.get_center()[0] + 0.08
        if v.get_left()[0] < gauche:
            v.shift(RIGHT * (gauche - v.get_left()[0]))
        return v

    def construct(self):
        self.margo_bas()
        titre = self.borne(VGroup(bobine(0.22), self.t("Au cinéma", 46, JAUNE_TITRE)).arrange(RIGHT, buff=0.2),
                           0.6).move_to(P(0, 3.45))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.62))
        self.add(badge, titre)
        g = self.graphe()
        salle = self.salle()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(g.fond), FadeIn(salle), run_time=0.3)
        self.au_mot("Quel jour")
        q = self.borne(self.t("Quel jour, presque seul ?", 34, ORANGE_RETENUE)).move_to(P(0, Y_TXT))
        self.play(FadeIn(q, shift=UP * 0.2), g.pousser(run_time=0.9))
        self.au_mot("presque seul")
        self.play(self.remplir(salle, 1), run_time=0.4)
        self.insister(q, 1.12)
        self.attendre_voix(marge=0.1)

        # ── 01 : samedi plein, jeudi vide ──
        self.dire("01-image")
        self.au_mot("Regarde les barres")
        self.play(FadeOut(q), LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.06) for b in g.barres],
                                          lag_ratio=0.15), run_time=0.7)
        lignes = {}
        for i, mot, nom in [(3, "samedi, 300", "Samedi"), (4, "Dimanche, 250", "Dimanche"),
                            (1, "seulement 80", "Jeudi")]:
            self.au_mot(mot)
            v = self.val(g, i)
            lg = self.borne(VGroup(self.t(nom + " :", 34), self.t(str(ENTREES[i]), 36, PLEIN))
                            .arrange(RIGHT, buff=0.2)).move_to(P(0, Y_TXT))
            anims = [g.focus(i, 0.35), FadeIn(v, scale=1.8), self.remplir(salle, ENTREES[i] // 10)]
            if lignes:
                anims.append(self.changer(list(lignes.values())[-1], lg))
            else:
                anims.append(FadeIn(lg, shift=UP * 0.2))
            self.play(*anims, run_time=0.6)
            lignes[i] = lg
        self.au_mot("la salle est presque vide")
        vide = self.borne(self.t("La salle est presque vide !", 32, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(self.changer(lignes[1], vide), run_time=0.4)
        self.play(Indicate(salle[:8], color=WHITE, scale_factor=1.2), run_time=0.6)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Combien d'entrées de plus")
        qq = self.borne(self.t("Samedi : combien de plus ?", 32)).move_to(P(0, Y_TXT))
        self.play(self.changer(vide, qq), g.estomper([1, 3], 0.35), self.remplir(salle, 30), run_time=0.5)
        self.au_mot("que le jeudi")
        xg = g.barres[3].get_left()[0] + 0.1
        niveau = DashedLine(g.barres[1].get_corner(UR), P(xg, g.point(1)[1]), color=AMBRE, stroke_width=5,
                            dash_length=0.1)
        ecart = DoubleArrow(P(xg, g.point(1)[1]), P(xg, g.point(3)[1]), buff=0, color=ORANGE_RETENUE,
                            stroke_width=6, tip_length=0.14, max_tip_length_to_length_ratio=0.3)
        point_q = self.t("?", 48, ORANGE_RETENUE).set_stroke(WHITE, 4, background=True)
        point_q.next_to(ecart, LEFT, buff=0.08)
        self.play(Create(niveau), GrowFromCenter(ecart), FadeIn(point_q, scale=1.6), run_time=0.5)
        self.insister(point_q, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(self.changer(qq, appel), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
