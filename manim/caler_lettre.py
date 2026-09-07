# ⭐⭐ CALER UN TRACÉ SUR LE MODÈLE DE FRÉDÉRIC, EN UNE COMMANDE.
#
# ── POURQUOI CE SCRIPT (07/09/2026) ──────────────────────────────────────────
# Le « l » a demandé SIX essais à l'aveugle. Puis Frédéric a envoyé un SVG, j'ai
# superposé notre tracé au sien, et UN SEUL essai a suffi. Le « r » : cinq
# essais, puis une photo. Le « s » : quatre essais ce soir, abandonné faute de
# modèle.
# 👉 La superposition n'est pas un confort, c'est ce qui sépare une convergence
# d'un yoyo. Mais je la rebricolais à la main à chaque lettre — d'où ce script.
#
# ⛔ ET CE QU'UN SVG NE DIT PAS : il donne la FORME, jamais le SENS. Mon « l »
# calé au pixel près était EN MIROIR — il montait à gauche et redescendait à
# droite. Huit vidéos fausses livrées avant que Frédéric le voie. Sur une vidéo
# dont l'objet EST le geste, l'ordre du parcours est la seule chose qui compte.
# 👉 Demander les DEUX : le SVG (la forme) et la suite des courbures (le sens).
#
# ── USAGE ────────────────────────────────────────────────────────────────────
# ⚠️ Manim mange la ligne de commande : on passe donc par des variables
# d environnement, pas par sys.argv.
#
#   LETTRE=s MODELE=/chemin/vers/s.svg python -m manim render -qh #     --disable_caching -r 1080,1920 --format png #     manim/caler_lettre.py Caler -o cale-s
#
# Il rend une image où le modèle est en GRIS et notre tracé en ROUGE par-dessus,
# et il annonce la largeur de la lettre — celle qui doit tenir dans 3,90.
# Les points de contrôle se lisent dans `manim/scripts/cp/lettre_<lettre>.py`,
# ou dans un fichier d'essai désigné par la variable MODULE.
# ⚠️ Sans MODELE, il rend simplement la lettre sur sa réglure : utile pour
# vérifier une forme avant d'avoir le modèle.
#
# ⚠️ UNE SEULE LETTRE, PLEIN CADRE. Deux fois le 07/09 j'ai empilé des variantes
# pour les comparer : elles étaient réduites 2,5× PENDANT QUE L'ÉPAISSEUR DU
# TRAIT NE BOUGEAIT PAS. Les boucles se bouchaient à cause de l'échelle de
# l'ESSAI, et j'en ai tiré une théorie entièrement fausse. Une forme se juge
# SEULE, à l'épaisseur où elle sera vue.

import importlib
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parent / "scripts" / "cp"))

from manim import *  # noqa: E402,F403

from lettre_commune import chemin_bezier, reglure  # noqa: E402

import os

LETTRE = os.environ.get("LETTRE", "l")
SVG = os.environ.get("MODELE", "")
MODULE = os.environ.get("MODULE", f"lettre_{LETTRE}")


def notre_trace(stroke_width=10, color=RED):
    """Le tracé de la lettre, quel que soit le nombre de ses traits."""
    m = importlib.import_module(MODULE)
    fabrique = getattr(m, f"chemin_{LETTRE}", None)
    if fabrique is not None:
        return fabrique(stroke_width, color)
    # Les lettres à un seul trait exposent DEPART et COURBES.
    return VGroup(chemin_bezier(m.DEPART, m.COURBES, stroke_width, color))


class Caler(Scene):
    def __init__(self, **k):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**k)

    def construct(self):
        trace = notre_trace()
        if SVG:
            modele = SVGMobject(SVG)
            modele.set_height(6.8).move_to(ORIGIN)
            modele.set_fill(GREY_C, opacity=0.9).set_stroke(width=0)
            # ⚠️ On cale notre tracé sur la BOITE du modèle, pas sur le centre du
            # cadre : une lettre à jambage ou à boucle haute n'est pas centrée
            # sur son corps.
            trace.set_height(modele.height * 0.62)
            trace.move_to(modele.get_center())
            self.add(modele, trace)
        else:
            g = VGroup(reglure(3), trace).move_to(ORIGIN)
            self.add(g)
        self.add(Dot(radius=0.10, color=GREEN).move_to(
            (trace[0] if trace.submobjects else trace).get_start()))
        print(f"LARGEUR {LETTRE} : {trace.width:.2f} pour 3.90 utiles")
        self.wait(0.1)
