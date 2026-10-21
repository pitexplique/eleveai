# stats5_lotd_commun.py
# EleveAI — Maths 5e (et 4e pour les épisodes communs) — série « Statistiques »,
# cycle 4, LOT D (5e 01 → 08). Les OUTILS COMMUNS des huit épisodes ; pas de
# scène ici.
#
# ⭐ Repris du cycle 3, SANS rien y modifier :
#   · MotsCales du pilote (manim/scripts/cm1/stats_graphique_lire.py) : au_mot()
#     calé sur les MOTS (marques WinRT, débit −10) ; ici les marques sont lues
#     dans manim/scripts/5e/stats5_<slug>[_short]_marques.json ;
#   · OutilsPaysage / OutilsShort du lot C de 6e (manim/scripts/6e/
#     stats6_lotc_commun.py) : colonne de droite, insister, garde, finale, page
#     de fin du 19/10 (« Entraîne-toi sur » + eleveai.fr, « Abonne-toi ! ») ;
#   · les gestes sur les tableaux (manim/scripts/cm1/stats_tableau_commun.py).
# Les figures viennent de manim/canvas_stats.py (NON modifié).

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))            # manim/
# ⛔ À LA FIN du chemin (append) : 6e/ a aussi stats_lire_tableau.py,
# stats_lire_graphique.py, stats_defi.py… ; nos modules de 5e doivent gagner.
sys.path.append(str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.append(str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.append(str(Path(__file__).resolve().parents[1] / "6e"))

from manim import *  # noqa: E402,F401,F403

from charte import *  # noqa: E402,F401,F403
from stats_graphique_lire import MotsCales  # noqa: E402,F401
from stats6_lotc_commun import OutilsPaysage, OutilsShort  # noqa: E402,F401
from stats_tableau_commun import (allumer, eteindre, fleche_colonne, fleche_ligne, remplir,  # noqa: E402,F401
                                  teinter, teinter_colonne, teinter_ligne, textes_devant)
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402,F401
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401
from canvas_stats import (AMBRE, NUIT, Barres, Camembert, Courbe, Tableau, fr, texte)  # noqa: E402,F401

DOSSIER = Path(__file__).resolve().parent


def P(x, y):
    return np.array([x, y, 0.0])


def croix(mob, color=ROUGE_ERREUR, sw=7):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(color, sw)


class MotsCales5(MotsCales):
    """MotsCales du pilote, marques lues dans manim/scripts/5e/. Une marque
    manquante lève une erreur : un calage ne retombe pas en silence sur le
    prorata des caractères."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = DOSSIER / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8"))
        return self._cache_marques

    def au_pos(self, i):
        """Comme au_mot, mais à l'INDEX i (caractère) de la phrase en cours :
        pour caler chaque nombre d'une liste « 2, 0, 3, 1… » (find() ne voit que
        le premier « 2 »)."""
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} @{i} : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)

    def positions(self, debut, n):
        """Les index des n nombres qui suivent `debut` dans la phrase en cours."""
        import re
        i0 = self._texte_voix.find(debut)
        if i0 < 0:
            raise ValueError(f"« {debut} » absent de la voix")
        return [i0 + m.start() for m in re.finditer(r"\d+", self._texte_voix[i0:])][:n]


class Paysage5(MotsCales5, OutilsPaysage, Notion6e):
    """La base d'une paysage du lot : une sous-classe fixe nom_voix,
    fichier_marques, identite, ceinture, et construct()."""

    identite = "Maths 5e — EleveAI"
    ceinture = "verte"

    def metier(self, nom, couleur=BLEU_CALCUL, fs=40):
        """Le nom du métier, dans une étiquette arrondie (renvoyé, non ajouté)."""
        t = self.t(nom, fs, couleur)
        cadre = RoundedRectangle(width=t.width + 0.5, height=t.height + 0.32, corner_radius=0.16,
                                 stroke_color=couleur, stroke_width=4, fill_color="#0b1220", fill_opacity=1)
        return VGroup(cadre, t.move_to(cadre))


class Short5(MotsCales5, OutilsShort, Short6e):
    """La base d'un short du lot (9:16, cadre 4,5 × 8)."""

