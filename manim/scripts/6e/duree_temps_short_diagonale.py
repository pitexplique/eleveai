# duree_temps_short_diagonale.py
# EleveAI — Maths 6e — short « Départ jeudi 22 h : il arrive quand ? ».
# Voix validée par Frédéric le 09/10/2026 (« go ») :
#   manim/voix/6e-duree-temps-short-diagonale.json, Julie, débit −10.
# Micro : 6e `duree_defi` (« passer minuit, lire un tableau d'horaires »).
#
# Départ jeudi 22 h (Grand Raid 2026), durée du vainqueur 2025 : 23 h 31 min.
# 22 h + 23 h 31 = 45 h 31 = 24 h + 21 h 31 → vendredi 21 h 31.
# Question : 40 h de course → 62 h = 48 h + 14 h → samedi 14 h.
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/duree_temps_short_diagonale.py ShortDiagonaleDuree6e -o eleveai-maths-6e-duree-temps-short-diagonale --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_diagonale import ShortDiagonale


class ShortDiagonaleDuree6e(ShortDiagonale):
    nom_voix = "6e-duree-temps-short-diagonale"

    def ecran_depart(self):
        self.dire("00-accroche")
        self.bandeau()
        d = VGroup(self.grand("Départ", font_size=44, color=WHITE),
                   self.grand("jeudi 22 h", font_size=60, color=JAUNE_TITRE)).arrange(DOWN, buff=0.2)
        d.move_to([0, 1.2, 0])
        self._zone = None
        self.zone(d)
        self.play(Indicate(d[1], color=JAUNE_TITRE))
        self.attendre_voix(marge=0.3)

    def ecran_course(self):
        self.dire("01-course")
        self.au_mot("23 heures")
        c = self.grand("+ 23 h 31 min", font_size=52, color=BLEU_CALCUL).move_to([0, -0.3, 0])
        self.play(Write(c))
        self._zone.add(c)
        self.attendre_voix(marge=0.3)

    def ecran_question_arrivee(self):
        self.dire("02-question")
        q = self.grand("Arrivée : ?", font_size=56, color=ORANGE_RETENUE).move_to([0, -1.5, 0])
        self.play(FadeIn(q, scale=1.3))
        self._zone.add(q)
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.dire("03-piege")
        c = self.grand("22 + 23 = 45", font_size=52).move_to([0, 1.5, 0])
        self.zone(c)
        self.au_mot("45 heures 31")
        f = self.grand("45 h 31", font_size=66, color=ROUGE_ERREUR).move_to([0, 0.2, 0])
        self.play(Write(f))
        self.au_mot("Ça n'existe pas")
        barre = Line(f.get_corner(DL), f.get_corner(UR), color=ROUGE_ERREUR, stroke_width=8)
        n = self.grand("ça n'existe pas !", font_size=38, color=ROUGE_ERREUR).move_to([0, -1.1, 0])
        self.play(Create(barre), FadeIn(n, scale=1.2))
        self._zone.add(f, barre, n)
        self.attendre_voix(marge=0.3)

    def ecran_calcul(self):
        self.dire("04-calcul")
        a = self.grand("45 h 31", font_size=56).move_to([0, 1.6, 0])
        self.zone(a)
        self.au_mot("c'est")
        b = self.grand("= 24 h + 21 h 31", font_size=46).move_to([0, 0.6, 0])
        self.play(Write(b))
        vingt_quatre = b[1:3]
        self.play(Indicate(vingt_quatre, color=JAUNE_TITRE))
        # ⚠️ La tranche s'est ajoutée à part : sinon elle reste après le FadeOut.
        self.remove(vingt_quatre)
        self._zone.add(b)
        self.attendre_voix(marge=0.3)

    def ecran_minuit(self):
        self.dire("05-minuit")
        # La frise des deux jours : jeudi | minuit | vendredi.
        y = -0.7
        g, m, dr = -2.0, -0.6, 2.0
        axe = Line([g, y, 0], [dr, y, 0], color=WHITE, stroke_width=3)
        tic = Line([m, y - 0.2, 0], [m, y + 0.2, 0], color=JAUNE_TITRE, stroke_width=4)
        lj = Text("jeudi", font_size=22, color=WHITE).move_to([(g + m) / 2, y - 0.35, 0])
        lv = Text("vendredi", font_size=22, color=WHITE).move_to([(m + dr) / 2, y - 0.35, 0])
        lm = Text("minuit", font_size=22, color=JAUNE_TITRE).next_to(tic, UP, buff=0.1)
        self.play(Create(axe))
        self.au_mot("on passe minuit")
        self.play(Create(tic), FadeIn(lm), FadeIn(lj))
        self.au_mot("on change de jour")
        self.play(FadeIn(lv, shift=LEFT * 0.2), Flash(tic.get_center(), color=JAUNE_TITRE))
        self._zone.add(axe, tic, lj, lv, lm)
        self.attendre_voix(marge=0.3)

    def ecran_reponse(self):
        self.dire("06-reponse")
        r = VGroup(self.grand("vendredi", font_size=50, color=VERT_OK),
                   self.grand("21 h 31", font_size=64, color=VERT_OK)).arrange(DOWN, buff=0.15)
        r.move_to([0, 1.2, 0])
        # Le calcul (les deux premiers) laisse sa place ; la frise reste.
        calcul, frise = list(self._zone)[:2], list(self._zone)[2:]
        self.play(*[FadeOut(m) for m in calcul])
        self._zone = VGroup(*frise)
        self.play(GrowFromCenter(r))
        self.play(Circumscribe(r, color=VERT_OK))
        self._zone.add(r)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.margo_bas()
        self._margo = list(self.mobjects)
        self.ecran_depart()
        self.ecran_course()
        self.ecran_question_arrivee()
        self.ecran_piege()
        self.ecran_calcul()
        self.ecran_minuit()
        self.ecran_reponse()
        self.ecran_regle("07-regle", ["Plus de 24 h ?", "on enlève 24", "et on avance", "d'un jour"])
        self.ecran_question("08-question", ["un coureur met 40 h.", "Il arrive quel jour,", "à quelle heure ?"])
        self.ecran_fin()
