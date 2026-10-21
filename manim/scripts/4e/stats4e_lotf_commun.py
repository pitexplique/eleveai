# stats4e_lotf_commun.py
# EleveAI — Maths 4e / 3e — série « Statistiques », cycle 4 : les OUTILS
# COMMUNS du lot F (21/10/2026) : 4e 06-moyenne, 07-mediane, 08-etendue
# (épisodes communs avec la 3e : 04-moyenne, 05-mediane, 06-etendue), et 3e
# 07-interpreter, 08-defi. Pas de scène ici.
#
# ⭐ Repris sans les modifier :
#   · MotsCales du pilote (cm1/stats_graphique_lire.py) : au_mot() calé sur les
#     MOTS (marques WinRT, débit −10). Ici, les marques sont lues À CÔTÉ DU
#     SCRIPT DE LA SCÈNE (4e/ ou 3e/), et au_mot(extrait, n) vise la n-ième
#     occurrence (« 2 plus 1 plus 0 plus 4 plus 2… » répète ses nombres) ;
#   · OutilsPaysage / OutilsShort du lot C de 6e (6e/stats6_lotc_commun.py) ;
#   · AxePoints, la droite graduée du coach (`number_line`) avec points empilés,
#     du lot E (4e/stats4e_lote_commun.py).
# Les figures viennent de manim/canvas_stats.py (NON modifié).

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))            # manim/
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402,F401,F403

from charte import *  # noqa: E402,F401,F403
from canvas_stats import (AMBRE, ENCRE, GRILLE, NUIT, ORANGE_Q, Barres, Camembert, Courbe,  # noqa: E402,F401
                          Tableau, carte_autour, fr, texte)
from stats_graphique_lire import MotsCales  # noqa: E402,F401
from stats_tableau_commun import allumer, eteindre, remplir, teinter, textes_devant  # noqa: E402,F401
from stats6_lotc_commun import OutilsPaysage, OutilsShort, croix  # noqa: E402,F401
from stats4e_lote_commun import AxePoints  # noqa: E402,F401
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402,F401
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401


def P(x, y):
    return np.array([x, y, 0.0])


class MotsCalesF(MotsCales):
    """Les marques sont lues à côté du fichier de la SCÈNE ; une marque
    manquante lève une erreur (pas de retour silencieux au prorata)."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            dossier = Path(sys.modules[type(self).__module__].__file__).resolve().parent
            self._cache_marques = json.loads((dossier / self.fichier_marques).read_text(encoding="utf-8"))
        return self._cache_marques

    def nombres_apres(self, debut, k):
        """Les positions des k nombres qui suivent `debut` dans la phrase en cours
        (une liste « 4, 2, 0, 3… » : chaque nombre a sa marque)."""
        import re
        i0 = self._texte_voix.find(debut)
        if i0 < 0:
            raise ValueError(f"« {debut} » absent de la voix")
        pos = [m.start() + i0 for m in re.finditer(r"\d+(,\d+)?", self._texte_voix[i0:])][:k]
        if len(pos) < k:
            raise ValueError(f"moins de {k} nombres après « {debut} »")
        return pos

    def au_i(self, i):
        """Attend la marque du mot qui commence à la position i de la phrase."""
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} @{i} : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)

    def au_mot(self, extrait, n=1):
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


class PaysageF(MotsCalesF, OutilsPaysage, Notion6e):
    """La base d'une paysage du lot F : une sous-classe par classe ne change
    que `identite` et `ceinture`."""

    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    def metier(self, nom, couleur=BLEU_CALCUL, fs=40):
        return self.t(nom, fs, couleur)


class ShortF(MotsCalesF, OutilsShort, Short6e):
    """La base d'un short du lot F (9:16, cadre 4,5 × 8)."""


# ── les petits dessins du lot ───────────────────────────────────────────────

def ballon(r=0.3):
    """Un ballon de football : disque blanc, pentagone noir au centre, cinq taches."""
    disque = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=2)
    penta = RegularPolygon(5, fill_color=NUIT, fill_opacity=1, stroke_width=0).scale(0.36 * r)
    taches = VGroup()
    for k in range(5):
        a = PI / 2 + k * TAU / 5
        t = RegularPolygon(5, fill_color=NUIT, fill_opacity=1, stroke_width=0).scale(0.22 * r)
        t.move_to(P(0.78 * r * np.cos(a), 0.78 * r * np.sin(a)))
        taches.add(t)
    return VGroup(disque, penta, taches)


def maillot(numero="10", couleur="#1d4ed8", s=1.0):
    """Un maillot de football vu de dos, avec son numéro."""
    pts = [(-0.35, 0.62), (-0.82, 0.38), (-1.0, 0.0), (-0.72, -0.12), (-0.6, 0.12), (-0.6, -0.85),
           (0.6, -0.85), (0.6, 0.12), (0.72, -0.12), (1.0, 0.0), (0.82, 0.38), (0.35, 0.62), (0.0, 0.48)]
    corps = Polygon(*[P(x * s, y * s) for x, y in pts], fill_color=couleur, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    num = Text(numero, font_size=int(70 * s), color=WHITE, weight=BOLD).move_to(P(0, -0.22 * s))
    return VGroup(corps, num)


def trophee(s=1.0, couleur="#facc15"):
    """Une coupe dorée : vasque, anses, pied, socle."""
    vasque = Polygon(P(-0.5 * s, 0.6 * s), P(0.5 * s, 0.6 * s), P(0.28 * s, -0.05 * s), P(-0.28 * s, -0.05 * s),
                     fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    anses = VGroup(*[Arc(radius=0.2 * s, start_angle=PI / 2 * k, angle=PI, color=couleur, stroke_width=6)
                     .move_to(P(sg * 0.52 * s, 0.38 * s)) for k, sg in ((1, -1), (-1, 1))])
    pied = Rectangle(width=0.12 * s, height=0.4 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pied.move_to(P(0, -0.25 * s))
    socle = Rectangle(width=0.6 * s, height=0.18 * s, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    socle.move_to(P(0, -0.52 * s))
    return VGroup(anses, vasque, pied, socle)


def ordinateur(s=1.0, contenu=None):
    """Un ordinateur portable : écran sombre (contenu posé dessus), clavier."""
    ecran = RoundedRectangle(width=2.4 * s, height=1.5 * s, corner_radius=0.08 * s, fill_color="#0b1220",
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=4)
    base = Polygon(P(-1.45 * s, -0.8 * s), P(1.45 * s, -0.8 * s), P(1.25 * s, -0.95 * s), P(-1.25 * s, -0.95 * s),
                   fill_color="#64748b", fill_opacity=1, stroke_width=0)
    g = VGroup(ecran, base)
    ecran.move_to(P(0, 0))
    base.next_to(ecran, DOWN, buff=0.02)
    if contenu is not None:
        contenu.scale_to_fit_width(2.0 * s).move_to(ecran)
        if contenu.height > 1.25 * s:
            contenu.scale_to_fit_height(1.25 * s).move_to(ecran)
        g.add(contenu)
    return g


def personne(couleur="#38bdf8", peau="#c68642", r=0.3, cheveux="#1f2937", longs=False):
    """Un personnage simple : tête, cheveux, buste arrondi."""
    tete = Circle(radius=r, fill_color=peau, fill_opacity=1, stroke_width=0)
    chev = Arc(radius=r * 1.02, start_angle=0.15, angle=PI - 0.3, color=cheveux, stroke_width=10 * r / 0.3)
    buste = Ellipse(width=2.4 * r, height=1.9 * r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    buste.next_to(tete, DOWN, buff=0.06 * r)
    g = VGroup(buste, tete, chev)
    if longs:
        for sg in (-1, 1):
            g.add(Line(P(sg * r * 0.95, 0.1 * r), P(sg * r * 1.0, -0.9 * r), color=cheveux,
                       stroke_width=12 * r / 0.3))
    return g
