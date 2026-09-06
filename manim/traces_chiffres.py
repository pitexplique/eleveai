# Les tracés des chiffres, LUS DANS LES SCÈNES MANIM elles-mêmes.
#
# ⭐⭐ POURQUOI ON NE LES RECOPIE PAS DANS UNE TABLE.
# Les lettres ont leur table `TRACES` dans `miniature.py`, et les scènes s'en
# servent. Les chiffres, eux, sont nés dans les scènes : leur géométrie vit dans
# `chemin_0()` … `chemin_5()`. Recopier ces courbes dans une seconde table pour
# fabriquer les fiches créerait DEUX sources pour un même geste — et le jour où
# l'une bouge (le « 5 » a changé de forme deux fois en deux jours), la fiche
# enseignerait un tracé que la vidéo ne montre plus.
# 👉 On échantillonne donc le VRAI chemin. La fiche ne peut pas diverger de la
# vidéo : elle EST la vidéo, mesurée point par point.
#
# ⚠️ Coût assumé : importer une scène importe Manim. C'est lent (quelques
# secondes) et sans conséquence — les fiches se fabriquent hors ligne.

import importlib
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent / "scripts" / "cp"))

# Combien de points par trait. 220 suffit : au-delà, PIL dessine des segments
# plus courts qu'un pixel à 300 dpi.
FINESSE = 220


def traits_du_chiffre(n: int) -> list[list[tuple[float, float]]]:
    """Le chiffre `n` en listes de points, dans le repère de la scène.

    Un chiffre = une liste de TRAITS (le « 4 » en a deux, le « 5 » un seul),
    chaque trait = une liste de points.
    """
    module = importlib.import_module(f"chiffre_{n}")
    groupe = getattr(module, f"chemin_{n}")()
    # `chemin_N` rend un VGroup pour les chiffres à plusieurs traits, un VMobject
    # nu pour les autres : on normalise.
    morceaux = list(groupe) if hasattr(groupe, "submobjects") and groupe.submobjects else [groupe]
    traits = []
    for vm in morceaux:
        if not vm.get_num_points():
            continue
        pts = [vm.point_from_proportion(t) for t in np.linspace(0, 1, FINESSE)]
        traits.append([(float(p[0]), float(p[1])) for p in pts])
    return traits


def spec_chiffre(n: int) -> dict:
    """Au format attendu par `fiche_ecriture.py`."""
    traits = traits_du_chiffre(n)
    return {"traits": traits, "point": None, "depart": traits[0][0]}
