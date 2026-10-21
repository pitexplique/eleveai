# stats4e_lote_commun.py
# EleveAI — Maths 4e — série « Statistiques », cycle 4 : les OUTILS COMMUNS du
# lot E (21/10/2026) : 03-effectif, 04-frequence, 05-donnee-defi,
# 09-interpreter, 10-probleme, 11-defi. Pas de scène ici.
#
# ⭐ Repris du cycle 3 (sans les modifier) :
#   · MotsCales du pilote (manim/scripts/cm1/stats_graphique_lire.py) : au_mot()
#     calé sur les MOTS (marques WinRT, débit −10), lus ici dans
#     manim/scripts/4e/stats_<slug>[_short]_marques.json ;
#   · OutilsPaysage / OutilsShort du lot C de 6e (stats6_lotc_commun.py) :
#     colonne de droite, garde, « Ce que tu as appris », page de fin du 19/10 ;
#   · remplir / textes_devant / teinter des tableaux (cm1/stats_tableau_commun.py).
# Les figures viennent de manim/canvas_stats.py (NON modifié). Ce qui lui manque
# est ajouté ICI : AxePoints, la droite graduée du coach (`number_line`) avec des
# points empilés (étendue, médiane, dispersion).

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))            # manim/
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from manim import *  # noqa: E402,F401

from charte import *  # noqa: E402,F401
from canvas_stats import (AMBRE, ENCRE, GRILLE, NUIT, ORANGE_Q, Barres, Camembert, Courbe,  # noqa: E402,F401
                          Tableau, carte_autour, fr, texte)
from stats_graphique_lire import MotsCales  # noqa: E402,F401
from stats_tableau_commun import remplir, teinter, textes_devant  # noqa: E402,F401
from stats6_lotc_commun import OutilsPaysage, OutilsShort, croix  # noqa: E402,F401
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402,F401
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401


def P(x, y):
    return np.array([x, y, 0.0])


class MotsCales4(MotsCales):
    """MotsCales du pilote, les marques lues dans manim/scripts/4e/. Une marque
    manquante lève une erreur : pas de retour silencieux au prorata."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8"))
        return self._cache_marques

    def au_mot(self, extrait, n=1):
        """Comme le pilote, mais `n` vise la n-ième occurrence de l'extrait
        (une liste « 7, 6, 8, 7… » répète ses nombres)."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix : {self._texte_voix[:60]}…")
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        if not marques:
            raise ValueError(f"pas de marques pour {getattr(self, '_cle_voix', None)}")
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class Paysage4e(MotsCales4, OutilsPaysage, Notion4e):
    """La base d'une paysage du lot E."""


class Short4e(MotsCales4, OutilsShort, Short6e):
    """La base d'un short du lot E."""


# ── la droite graduée du coach, avec des points empilés ─────────────────────

class AxePoints(VGroup):
    """Une droite graduée sur carte blanche (`number_line` du coach), et des
    points posés au-dessus de leurs valeurs (empilés quand une valeur revient).

    mini, maxi, pas : la graduation (un nombre tous les `pas`) ; sous_pas : un
    petit trait sans nombre. valeurs : la série (non ajoutée : points(i)).
    couleur : la couleur des points. nom : écrit à droite de l'axe (unité).
    Morceaux : .carte .axe .traits {v} .nombres {v} .ronds[i] (Dot, un par valeur,
    dans l'ordre de la série) .nom
    Gestes (renvoyés, non ajoutés) : x(v) · rond_en(v, k) · accolade(a, b, txt)
    · repere(v, txt, couleur) (trait vertical + étiquette).
    """

    def __init__(self, valeurs, mini, maxi, pas, sous_pas=None, longueur=6.0, couleur="#3b82f6", fs=28,
                 nom=None, rayon=0.13, centre=ORIGIN, hauteur_carte=None, titre=None, **kw):
        super().__init__(**kw)
        self.mini, self.maxi, self.L, self.r, self.fs = mini, maxi, longueur, rayon, fs
        self.valeurs = list(valeurs)
        self.axe = Arrow(P(-0.25, 0), P(longueur + 0.45, 0), buff=0, color=NUIT, stroke_width=5,
                         max_tip_length_to_length_ratio=0.04, tip_length=0.2)
        self.traits, self.nombres = {}, {}
        v = mini
        while v <= maxi + 1e-9:
            self.traits[v] = Line(P(self.x0(v), -0.14), P(self.x0(v), 0.14), color=NUIT, stroke_width=4)
            self.nombres[v] = texte(v, fs, ENCRE).next_to(P(self.x0(v), -0.14), DOWN, buff=0.12)
            v = round(v + pas, 9)
        if sous_pas:
            v = mini
            while v <= maxi + 1e-9:
                if v not in self.traits:
                    self.traits[v] = Line(P(self.x0(v), -0.08), P(self.x0(v), 0.08), color=NUIT, stroke_width=3)
                v = round(v + sous_pas, 9)
        self.ref = Line(P(self.x0(mini), 0), P(self.x0(maxi), 0), stroke_width=0)
        self.add(self.axe, *self.traits.values(), *self.nombres.values(), self.ref)
        self.nom = None
        if nom:
            self.nom = texte(nom, fs, ENCRE).next_to(self.axe, RIGHT, buff=0.12)
            self.add(self.nom)
        # les points : empilés par valeur, dans l'ordre de la série
        vus = {}
        self.ronds = VGroup()
        for val in self.valeurs:
            k = vus.get(val, 0)
            vus[val] = k + 1
            self.ronds.add(Dot(P(self.x0(val), 0.38 + k * 2.3 * rayon), radius=rayon, fill_color=couleur,
                               fill_opacity=1, stroke_color=NUIT, stroke_width=2))
        haut = 0.38 + (max(vus.values()) if vus else 1) * 2.3 * rayon
        cadre = Rectangle(width=longueur + 0.9, height=haut + 0.75, stroke_width=0).move_to(
            P(longueur / 2 + 0.1, (haut - 0.75) / 2))
        if hauteur_carte:
            cadre.stretch_to_fit_height(hauteur_carte).align_to(P(0, -0.75), DOWN)
        self.titre = None
        if titre:
            self.titre = texte(titre, int(fs * 1.05), NUIT).next_to(cadre, UP, buff=0.05)
            cadre = VGroup(cadre, self.titre)
        self.carte = carte_autour(cadre, marge=0.25)
        self.add_to_back(self.carte)
        if self.titre is not None:
            self.add(self.titre)
        self.add(self.ronds)
        self.ronds.set_opacity(1)
        self.move_to(centre)

    def x0(self, v):
        """L'abscisse de v à la construction (avant tout déplacement)."""
        return (v - self.mini) / (self.maxi - self.mini) * self.L

    def x(self, v):
        """Le point de l'axe à la valeur v (suit la figure si elle bouge)."""
        a, b = self.ref.get_start(), self.ref.get_end()
        return a + (b - a) * (v - self.mini) / (self.maxi - self.mini)

    def _ech(self):
        return np.linalg.norm(self.ref.get_end() - self.ref.get_start()) / self.L

    @property
    def fond(self):
        return VGroup(*[m for m in self.submobjects if m is not self.ronds])

    def accolade(self, a, b, txt, couleur=AMBRE, fs=None, dessous=False):
        """Une double flèche de a à b au-dessus (ou au-dessous) des points, et son texte."""
        y = (max(r.get_top()[1] for r in self.ronds) + 0.3) if not dessous else self.x(a)[1] - 0.95 * self._ech()
        fl = DoubleArrow(P(self.x(a)[0], y, ), P(self.x(b)[0], y), buff=0, color=couleur, stroke_width=6,
                         tip_length=0.18, max_tip_length_to_length_ratio=0.2)
        t = texte(txt, fs or self.fs + 2, couleur).scale(self._ech())
        t.next_to(fl, DOWN if dessous else UP, buff=0.1)
        return VGroup(fl, t)

    def repere(self, v, txt=None, couleur=VERT_OK, haut=None):
        """Un trait vertical pointillé à la valeur v, et son étiquette au-dessus."""
        h = haut if haut is not None else (max(r.get_top()[1] for r in self.ronds) + 0.35)
        base = self.x(v)
        tr = DashedLine(P(base[0], base[1] - 0.2), P(base[0], h), color=couleur, stroke_width=5, dash_length=0.1)
        g = VGroup(tr)
        if txt:
            g.add(texte(txt, self.fs, couleur).scale(self._ech()).next_to(tr, UP, buff=0.08))
        return g
