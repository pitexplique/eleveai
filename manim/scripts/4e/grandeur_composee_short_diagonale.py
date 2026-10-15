# grandeur_composee_short_diagonale.py
# EleveAI — Maths 4e — short « 7,7 km/h : le vainqueur est lent ? ».
# Voix validée par Frédéric le 09/10/2026 (« go ») :
#   manim/voix/4e-grandeur-composee-short-diagonale.json, Julie, débit −8.
# Micro : 4e `grandeur_defi` (notion grandeur_composee).
#
# 180 km en 23 h 31 min (Chassagne, 2025) ; 31 min ≈ 0,5 h → 23,5 h.
# 180 ÷ 23,5 ≈ 7,66 → 7,7 km/h. 10 200 ÷ 23,5 ≈ 434 m de montée par heure.
# Question : à 7,7 km/h, combien de km en 2 h ? (7,7 × 2 = 15,4 km.)
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/grandeur_composee_short_diagonale.py ShortDiagonaleVitesse4e -o eleveai-maths-4e-grandeur-composee-short-diagonale --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_diagonale import ShortDiagonale


class ShortDiagonaleVitesse4e(ShortDiagonale):
    nom_voix = "4e-grandeur-composee-short-diagonale"

    def ecran_course(self):
        self.dire("01-course")
        self.bandeau()
        depart = Dot([-1.9, 1.6, 0], color=WHITE)
        arrivee = Dot([1.9, 1.6, 0], color=WHITE)
        chemin = Line(depart.get_center(), arrivee.get_center(), color=BLEU_CALCUL, stroke_width=4)
        coureur = Dot(depart.get_center(), radius=0.12, color=ORANGE_RETENUE)
        km = self.grand("180 km", font_size=60, color=BLEU_CALCUL).move_to([0, 0.75, 0])
        self.zone(depart, arrivee, chemin, km)
        self.play(FadeIn(coureur, scale=2))
        self.au_mot("Le vainqueur")
        temps = self.grand("23 h 31 min", font_size=56, color=WHITE).move_to([0, -0.5, 0])
        self.play(coureur.animate.move_to(arrivee), Write(temps), run_time=2.2, rate_func=linear)
        self._zone.add(coureur, temps)
        self.attendre_voix(marge=0.3)

    def ecran_heures(self):
        self.dire("02-heures")
        q = self.grand("Sa vitesse ?", font_size=50, color=JAUNE_TITRE).move_to([0, 1.7, 0])
        self.zone(q)
        self.au_mot("31 minutes")
        cercle = Circle(radius=0.7, color=WHITE, stroke_width=3).move_to([0, 0.55, 0])
        moitie = Sector(radius=0.7, angle=-PI, start_angle=PI / 2, color=ORANGE_RETENUE,
                        fill_opacity=0.8).move_arc_center_to(cercle.get_center())
        egal = self.grand("31 min ≈ 0,5 h", font_size=38, color=ORANGE_RETENUE).move_to([0, -0.5, 0])
        self.ajouter(cercle)
        self.play(Create(moitie), FadeIn(egal, shift=LEFT * 0.2))
        self._zone.add(moitie, egal)
        self.au_mot("23,5 heures")
        h = self.grand("23,5 h", font_size=62, color=WHITE).move_to([0, -1.5, 0])
        self.play(GrowFromCenter(h))
        self._zone.add(h)
        self.attendre_voix(marge=0.3)

    def ecran_calcul(self):
        self.dire("03-calcul")
        c = self.grand("180 ÷ 23,5", font_size=56).move_to([0, 1.0, 0])
        self.zone(c)
        self.au_mot("environ")
        r = self.grand("≈ 7,7 km/h", font_size=62, color=VERT_OK).move_to([0, -0.2, 0])
        self.play(Write(r))
        self.play(Circumscribe(r, color=VERT_OK))
        self._zone.add(r)
        self.attendre_voix(marge=0.3)

    def ecran_lent(self):
        self.dire("04-lent")
        v = self.grand("7,7 km/h", font_size=48, color=VERT_OK).move_to([0, 1.9, 0])
        self.zone(v)
        self.au_mot("à peine")
        # Sans nombre : la voix n'en dit pas pour la marche rapide.
        b1 = Rectangle(width=3.0, height=0.42, stroke_width=0, fill_color="#7f8c8d",
                       fill_opacity=0.85).move_to([-1.8 + 1.5, 0.75, 0])
        l1 = Text("quelqu'un qui marche vite", font_size=20, color=WHITE).next_to(b1, UP, buff=0.08).align_to([-1.8, 0, 0], LEFT)
        b2 = Rectangle(width=3.6, height=0.42, stroke_width=0, fill_color=VERT_OK,
                       fill_opacity=0.85).move_to([0, -0.35, 0])
        l2 = Text("le vainqueur", font_size=20, color=WHITE).next_to(b2, UP, buff=0.08).align_to([-1.8, 0, 0], LEFT)
        self.play(GrowFromEdge(b1, LEFT), FadeIn(l1))
        self.play(GrowFromEdge(b2, LEFT), FadeIn(l2))
        self._zone.add(b1, l1, b2, l2)
        self.au_mot("Lent ?")
        lent = self.grand("Lent ?", font_size=58, color=ORANGE_RETENUE).move_to([0, -1.5, 0])
        self.play(FadeIn(lent, scale=1.4))
        self._zone.add(lent)
        self.attendre_voix(marge=0.3)

    def ecran_montee(self):
        self.dire("05-montee")
        pts = [[-2.0, -0.9, 0], [-1.2, 0.9, 0], [-0.5, -0.3, 0], [0.4, 1.4, 0],
               [1.2, 0.0, 0], [2.0, 1.0, 0]]
        montagnes = VMobject(color=VERT_OK, stroke_width=5).set_points_as_corners(pts)
        self.zone()
        self.play(Create(montagnes), run_time=1.4)
        self.au_mot("10200")
        d = self.grand("10 200 m de montée", font_size=40, color=VERT_OK).move_to([0, -1.5, 0])
        self.play(Write(d))
        self._zone.add(montagnes, d)
        self.attendre_voix(marge=0.3)

    def ecran_heure(self):
        self.dire("06-heure")
        c = self.grand("10 200 ÷ 23,5", font_size=48).move_to([0, 2.0, 0])
        self.zone(c)
        self.au_mot("environ")
        r = self.grand("≈ 434 m par heure", font_size=44, color=VERT_OK).move_to([0, 1.1, 0])
        self.play(Write(r))
        self._zone.add(r)
        self.au_mot("Toutes les heures")
        # 24 petites marches : une par heure ; la nuit en bleu sombre.
        marches = VGroup()
        for i in range(24):
            nuit = i < 8 or i >= 20
            m = Rectangle(width=0.13, height=0.12 + 0.045 * i, stroke_width=0,
                          fill_color="#3b5b8a" if nuit else VERT_OK, fill_opacity=0.9)
            marches.add(m)
        marches.arrange(RIGHT, buff=0.03, aligned_edge=DOWN).move_to([0, -0.6, 0])
        self.play(LaggedStart(*[GrowFromEdge(m, DOWN) for m in marches], lag_ratio=0.08), run_time=2.0)
        self._zone.add(marches)
        self.au_mot("La nuit aussi")
        nuit = Text("la nuit aussi", font_size=26, color="#8fb3e8").next_to(marches, DOWN, buff=0.15)
        self.play(FadeIn(nuit))
        self._zone.add(nuit)
        self.au_mot("24 heures")
        h = self.grand("presque 24 h", font_size=36, color=JAUNE_TITRE).next_to(nuit, DOWN, buff=0.2)
        self.play(FadeIn(h, scale=1.2))
        self._zone.add(h)
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.margo_bas()
        self._margo = list(self.mobjects)
        self.accroche_sauf_a()
        self.ecran_course()
        self.ecran_heures()
        self.ecran_calcul()
        self.ecran_lent()
        self.ecran_montee()
        self.ecran_heure()
        self.ecran_regle("07-regle", ["vitesse", "= distance ÷ temps", "… mais elle", "ne dit pas tout"])
        self.ecran_question("08-question", ["à 7,7 km/h,", "combien de km", "en 2 heures ?"])
        self.ecran_fin()
