# prop_pourcentages_short_diagonale.py
# EleveAI — Maths 4e — short « Sans Cilaos : plus dur ou plus facile ? ».
# Voix validée par Frédéric le 09/10/2026 (« go ») :
#   manim/voix/4e-prop-pourcentages-short-diagonale.json, Julie, débit −8.
# Micro : 4e `prop_pourcentage_defi`.
#
# Tracé 2026 sans Cilaos (presse, 09/10) : 175 → 180 km, 10 500 → 10 200 m D+.
# 5 ÷ 175 = 300 ÷ 10 500 = 1/35 ≈ 0,029 → +2,9 % et −2,9 % : le MÊME taux.
# Question d'avis : plus dur ou plus facile ?
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_pourcentages_short_diagonale.py ShortDiagonalePourcentages4e -o eleveai-maths-4e-prop-pourcentages-short-diagonale --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_diagonale import ShortDiagonale


class ShortDiagonalePourcentages4e(ShortDiagonale):
    nom_voix = "4e-prop-pourcentages-short-diagonale"

    def ecran_cilaos(self):
        self.dire("00-accroche")
        self.bandeau()
        c = self.grand("Cilaos", font_size=70, color=WHITE).move_to([0, 1.0, 0])
        self._zone = None
        self.zone(c)
        self.au_mot("ne passe plus")
        barre = Line(c.get_corner(DL) + LEFT * 0.1, c.get_corner(UR) + RIGHT * 0.1,
                     color=ROUGE_ERREUR, stroke_width=9)
        n = self.grand("nouveau tracé", font_size=40, color=JAUNE_TITRE).move_to([0, -0.4, 0])
        self.play(Create(barre), FadeIn(n, shift=UP * 0.2))
        self._zone.add(barre, n)
        self.attendre_voix(marge=0.3)

    def ecran_variation(self, voix, titre, avant, apres, vmax, ecart, couleur_ecart, mot_apres, mot_ecart):
        self.dire(voix)
        t = self.grand(titre, font_size=40, color=JAUNE_TITRE).move_to([0, 2.1, 0])
        b1 = self.barre(avant[0], vmax, avant[1], BLEU_CALCUL, 1.0)
        l1 = Text("avant", font_size=20, color=WHITE).next_to(b1[0], UP, buff=0.06).align_to([-1.8, 0, 0], LEFT)
        self.zone(t, l1, b1)
        self.au_mot(mot_apres)
        b2 = self.barre(apres[0], vmax, apres[1], couleur_ecart, -0.1)
        l2 = Text("2026", font_size=20, color=WHITE).next_to(b2[0], UP, buff=0.06).align_to([-1.8, 0, 0], LEFT)
        # ⚠️ Animer la barre ENTIÈRE : animer b2[0] seul l'ajoutait à part, et
        # il restait à l'écran après le FadeOut du groupe (brouillon du 09/10).
        self.play(GrowFromEdge(b2, LEFT), FadeIn(l2))
        self._zone.add(b2, l2)
        self.au_mot(mot_ecart)
        e = self.grand(ecart, font_size=58, color=couleur_ecart).move_to([0, -1.3, 0])
        self.play(FadeIn(e, scale=1.3))
        self._zone.add(e)
        self.attendre_voix(marge=0.3)

    def ecran_calcul(self, voix, division, taux, couleur):
        self.dire(voix)
        d = self.grand(division, font_size=52).move_to([0, 1.5, 0])
        self.zone(d)
        self.au_mot("environ")
        r = self.grand("≈ 0,029", font_size=56, color=BLEU_CALCUL).move_to([0, 0.45, 0])
        self.play(Write(r))
        self.au_mot("Soit")
        p = self.grand(taux, font_size=70, color=couleur).move_to([0, -0.9, 0])
        self.play(GrowFromCenter(p))
        self.play(Circumscribe(p, color=couleur))
        self._zone.add(r, p)
        self.attendre_voix(marge=0.3)

    def ecran_meme(self):
        self.dire("05-meme")
        p1 = self.grand("+2,9 %", font_size=60, color=VERT_OK).move_to([0, 1.5, 0])
        l1 = Text("plus long", font_size=26, color=WHITE).next_to(p1, DOWN, buff=0.1)
        p2 = self.grand("−2,9 %", font_size=60, color=ROUGE_ERREUR).move_to([0, -0.3, 0])
        l2 = Text("de montée", font_size=26, color=WHITE).next_to(p2, DOWN, buff=0.1)
        self.zone(p1, l1, p2, l2)
        self.play(Indicate(p1, color=VERT_OK), Indicate(p2, color=ROUGE_ERREUR))
        self.au_mot("plus long")
        m = self.grand("le même !", font_size=44, color=JAUNE_TITRE).move_to([0, -1.75, 0])
        self.play(FadeIn(m, scale=1.3))
        self._zone.add(m)
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.margo_bas()
        self._margo = list(self.mobjects)
        self.ecran_cilaos()
        self.ecran_variation("01-distance", "La distance", (175, "175 km"), (180, "180 km"), 180,
                             "+5 km", VERT_OK, "à 180", "5 kilomètres de plus")
        self.ecran_calcul("02-calcul-distance", "5 ÷ 175", "+2,9 %", VERT_OK)
        self.ecran_variation("03-montee", "La montée", (10500, "10 500 m"), (10200, "10 200 m"), 10500,
                             "−300 m", ROUGE_ERREUR, "à 10200", "300 mètres")
        self.ecran_calcul("04-calcul-montee", "300 ÷ 10 500", "−2,9 %", ROUGE_ERREUR)
        self.ecran_meme()
        self.ecran_regle("06-regle", ["un pourcentage", "= variation", "÷ départ"])
        self.ecran_question("07-question", ["Plus dur", "ou plus facile,", "sans Cilaos ?"],
                            fin="Écris ton avis en commentaire !")
        self.ecran_fin()
