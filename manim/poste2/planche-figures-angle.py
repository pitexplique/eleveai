# manim/poste2/planche-figures-angle.py
# LES FIGURES DE L'ÉPISODE 10, SEULES ET EN GRAND — rendue AVANT le premier rendu.
#
# ⭐⭐ La recette qui a évité DEUX TOURS COMPLETS sur E8, puis sur E9 : on pose les
# personnages et les schémas en grand dans une Scene à part, on rend une image en
# `-qh -s`, et on la REGARDE. Ça coûte quinze secondes. Le 3-4-5 faux de 13 %, la queue
# de cheval détachée et le [C G] invisible de E9 ont tous été vus là, et par rien
# d'autre. ⛔ Elle ne remplace PAS le gros plan sur le rendu : elle le précède.
#
# ⚠️ LA PLANCHE ELLE-MÊME SE MESURE : au premier jet de celle de E9, les figures se
# chevauchaient — et une planche illisible ne prouve rien. Les cotes ci-dessous ont été
# vérifiées par `mesure-ps-espace-angle.py`, qui mesure aussi cette scène.
#
#   PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh -s --disable_caching \
#     manim/poste2/planche-figures-angle.py PlancheAngle --media_dir <dossier temporaire>

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import C_REGARD, C_VECTEUR, Repere3D  # noqa: E402
from ps_espace_angle import (INCL01, coin, ravi, soleil,  # noqa: E402
                             toit_panneau)


class PlancheAngle(Scene):
    def construct(self):
        def etiq(mob, texte, buff=0.25):
            self.add(mob, Text(texte, font_size=21, color=GREY_A)
                     .next_to(mob, DOWN, buff=buff))

        # ⭐ EN GRAND : à l'échelle de l'épisode (0,66 pour Ravi) rien ne se voit, et
        # c'est exactement la leçon « un personnage ne se juge qu'EN GRAND » (E4).
        # ⛔ Ce qu'on regarde sur Ravi : l'épaule est-elle DANS le torse (pas de trou
        # noir, pas d'articulation au milieu du buste) ? les deux bras sont-ils
        # dissymétriques ? la tête est-elle NUE ? le panneau se lit-il comme un panneau ?
        etiq(ravi(1.40).move_to(np.array([-5.1, 0.5, 0.0])), "Ravi, ×1,40", buff=0.35)

        # ⭐ LE SCHÉMA DU PANNEAU : l'angle dessiné entre la direction du soleil (ambre)
        # et la perpendiculaire au panneau (rose) doit VALOIR les 30° annoncés, et le
        # panneau doit être perpendiculaire à sa normale. Les deux sont vérifiés par une
        # assertion du module ; ici on vérifie que ça se LIT.
        tp = toit_panneau(INCL01, 1.25).move_to(np.array([-1.0, 1.7, 0.0]))
        sol = soleil(1.0).move_to(tp.get_center() + tp.d_sol * 2.7)
        etiq(VGroup(tp, sol), f"le panneau à {INCL01}° du soleil", buff=0.30)

        # ⭐ LES TROIS SIGNES de l'écran 03, à la taille où ils seront lus.
        trois = VGroup()
        for d, mot in ((50, "aigu"), (90, "droit"), (130, "obtus")):
            g = coin(d, r=0.90, sw=6, r_arc=0.34)
            trois.add(VGroup(g, Text(f"{mot} ({d}°)", font_size=21, color=GREY_A)
                             .next_to(g, DOWN, buff=0.22)))
        # ⚠️ 3,05 ET NON 3,6 : au premier jet, « obtus (130°) » SORTAIT du cadre à
        # droite. Une planche coupée ne prouve rien (leçon de la planche de E9, dont les
        # figures se chevauchaient).
        trois.arrange(RIGHT, buff=0.85).move_to(np.array([3.05, 2.0, 0.0]))
        self.add(trois)

        # ⭐ LE SUPPLÉMENTAIRE (écran 06) : les DEUX arcs doivent se distinguer. Au même
        # rayon ils se touchent au sommet commun et on lit un seul angle — c'est pour ça
        # que `coin(oppose=True)` les met à deux rayons différents.
        g6 = coin(60, r=1.15, r_arc=0.40, oppose=True).move_to(np.array([-1.3, -2.1, 0.0]))
        etiq(g6, "v et son oppose : 60° ambre, le supplementaire 120° rouge", buff=0.30)

        # ⭐ LE CUBE DU DÉFI : AG (ambre), AB (bleu), l'arc de l'angle, et les noms « D »
        # et « F » ÉCARTÉS. ⛔ Ce qu'on regarde : les deux lettres sont-elles traversées
        # par un fût OU posées sur une arête ? (sur E9, le premier remède avait créé le
        # second défaut).
        r2 = Repere3D(o=np.array([3.0, -2.6, 0.0]), u=1.3, portee=2)
        cube = r2.cube(cote=1, rouges=("B", "G"), sw=4, fs=24)
        for lettre, off in (("D", np.array([-0.30, 0.30, 0.0])),
                            ("F", np.array([0.30, -0.30, 0.0]))):
            for sub in cube.submobjects:
                if isinstance(sub, Text) and sub.text == lettre:
                    sub.move_to(cube.sommet(lettre) + off)
        ag = r2.vecteur((0, 0, 0), (1, 1, 1), None, couleur=C_REGARD, sw=7)
        ab = r2.vecteur((0, 0, 0), (1, 0, 0), None, couleur=C_VECTEUR, sw=7)
        d = r2.pt(1, 1, 1) - r2.pt(0, 0, 0)
        arc = Arc(radius=0.46, start_angle=0, angle=math.atan2(d[1], d[0]),
                  color=C_REGARD, stroke_width=5).move_arc_center_to(r2.pt(0, 0, 0))
        self.add(cube, ag, ab, arc)
        self.add(Text("le cube : A G (ambre), A B (bleu), l'arc SANS valeur",
                      font_size=21, color=GREY_A).move_to(np.array([3.0, -3.35, 0.0])))
