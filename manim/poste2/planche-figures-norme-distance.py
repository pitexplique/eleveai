# manim/poste2/planche-figures-norme-distance.py
# LES FIGURES DE L'ÉPISODE 9, SEULES ET EN GRAND — rendue AVANT le premier rendu.
#
# ⭐⭐ C'est la recette qui a évité DEUX TOURS COMPLETS sur l'épisode 8 : on pose les
# personnages et les schémas en grand dans une Scene à part, on rend une image en
# `-qh -s`, et on la regarde. Ça coûte quinze secondes. Les cinq défauts de figure de
# E8 (le casque-sombrero, la coche sur le poteau, v hors du plan…) ont été vus là.
# ⛔ Elle ne remplace PAS le gros plan sur le rendu : elle le précède.
#
#   PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh -s --disable_caching \
#     manim/poste2/planche-figures-norme-distance.py PlancheNormeDistance \
#     --media_dir <un dossier temporaire>

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import C_FANTOME, C_REGARD, C_VECTEUR, Repere3D  # noqa: E402
from ps_espace_norme_distance import coureur, pente, triangle345  # noqa: E402


class PlancheNormeDistance(Scene):
    def construct(self):
        # ⭐ EN GRAND : à l'échelle de l'épisode (0,68 pour la coureuse) rien ne se voit.
        # C'est exactement la leçon « un personnage ne se juge qu'EN GRAND » (E4).
        def etiq(mob, texte, buff=0.25):
            self.add(mob, Text(texte, font_size=22, color=GREY_A)
                     .next_to(mob, DOWN, buff=buff))

        # ⚠️ LA PLANCHE ELLE-MÊME SE MESURE : au premier jet, le cube, le 3-4-5 et leurs
        # légendes se chevauchaient, et on ne pouvait juger aucun des trois. Une planche
        # illisible ne prouve rien — c'est la leçon « un zéro se vérifie », appliquée à
        # l'outil qui sert à voir.
        etiq(coureur(1.45).move_to(np.array([-5.3, 0.6, 0.0])), "la coureuse, ×1,45")
        etiq(pente(1.15).move_to(np.array([0.9, 2.7, 0.0])),
             "le profil 10 / 1, à l'échelle", buff=0.35)
        etiq(triangle345(0.95).move_to(np.array([-1.9, -1.9, 0.0])), "le 3-4-5 du piège")

        # ⭐ L'ESCALIER DE COORDONNÉES, la figure propre à cette micro.
        r = Repere3D(o=np.array([4.3, -1.2, 0.0]), u=0.95, portee=3)
        esc = r.point(2, 2, 2, None, couleur=C_VECTEUR, r=0.08, escalier=True)
        fu = r.vecteur((0, 0, 0), (2, 2, 2), "u", couleur=C_VECTEUR, sw=7, fs=28, decal=UL)
        self.add(r.axes(), esc, fu)
        self.add(Text("l'escalier de coordonnées", font_size=22, color=C_FANTOME)
                 .move_to(np.array([4.9, -1.75, 0.0])))

        # ⭐ LE CUBE DU DÉFI, avec les deux diagonales — c'est la figure de l'écran 09b.
        r2 = Repere3D(o=np.array([1.1, -2.6, 0.0]), u=1.3, portee=2)
        cube = r2.cube(cote=1, rouges=("C", "G"), sw=4, fs=24)
        ac = r2.vecteur((0, 0, 0), (1, 1, 0), None, couleur=C_VECTEUR, sw=7)
        ag = r2.vecteur((0, 0, 0), (1, 1, 1), None, couleur=C_REGARD, sw=7)
        cg = DashedLine(r2.pt(1, 1, 0), r2.pt(1, 1, 1), dash_length=0.1)
        cg.set_stroke(C_FANTOME, 4)
        self.add(cube, cg, ac, ag)
        self.add(Text("le cube : A C (bleu), A G (ambre), [C G] en pointillé",
                      font_size=22, color=GREY_A).move_to(np.array([1.6, -3.3, 0.0])))
