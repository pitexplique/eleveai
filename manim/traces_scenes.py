# Les tracés des glyphes, LUS DANS LES SCÈNES MANIM elles-mêmes.
#
# ⭐⭐ POURQUOI ON NE LES RECOPIE PAS DANS UNE TABLE.
# Recopier les courbes d'un geste dans une seconde table crée DEUX sources pour
# un même tracé — et le jour où l'une bouge (le « 5 » a changé de forme deux
# fois en deux jours), la fiche enseigne un geste que la vidéo ne montre plus.
# 👉 On échantillonne donc le VRAI chemin. La fiche ne peut pas diverger de la
# vidéo : elle EST la vidéo, mesurée point par point.
#
# ⛔⛔ CE FICHIER NE COUVRAIT QUE LES CHIFFRES, ET ÇA A COÛTÉ DIX FICHES.
# Les lettres continuaient de lire la table `TRACES` de `miniature.py`, remplie
# À LA MAIN — elle s'est arrêtée aux six voyelles. Au 07/09 : SEIZE lettres
# avaient une vidéo, SIX avaient une fiche. Les dix autres (c d h l m n p r s t)
# diffusaient un écran « Télécharge ta fiche ! » qui ne menait à rien.
# ⚠️ Le sitemap, lui, était innocent : il dérive déjà ses routes du registre.
# C'est la table recopiée, en bout de chaîne, qui bloquait tout.
# 👉 DEPUIS, LETTRES ET CHIFFRES PASSENT PAR LE MÊME LECTEUR. Une lettre neuve
# a sa fiche du jour où sa scène existe, sans que personne ait à y penser.
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
    return _echantillonner(getattr(module, f"chemin_{n}")())


def _echantillonner(groupe) -> list[list[tuple[float, float]]]:
    """Un VGroup ou un VMobject nu → des listes de points."""
    # `chemin_X` rend un VGroup pour les glyphes à plusieurs traits, un VMobject
    # nu pour les autres : on normalise.
    morceaux = (list(groupe) if hasattr(groupe, "submobjects") and groupe.submobjects
                else [groupe])
    traits = []
    for vm in morceaux:
        if not vm.get_num_points():
            continue
        pts = [vm.point_from_proportion(t) for t in np.linspace(0, 1, FINESSE)]
        traits.append([(float(p[0]), float(p[1])) for p in pts])
    return traits


def traits_de_la_lettre(lettre: str) -> list[list[tuple[float, float]]]:
    """La lettre en listes de points, lue dans `lettre_<x>.py`.

    Même contrat que pour les chiffres : une lettre = une liste de TRAITS (le
    « t » en a deux, le « s » un seul), chaque trait = une liste de points.
    """
    module = importlib.import_module(f"lettre_{lettre}")
    return _echantillonner(getattr(module, f"chemin_{lettre}")())


def spec_chiffre(n: int) -> dict:
    """Au format attendu par `fiche_ecriture.py`."""
    return _spec(traits_du_chiffre(n))


def spec_lettre(lettre: str) -> dict:
    """Idem, pour une lettre.

    ⛔⛔ LE POINT DU « i » N'EST PAS DANS LE CHEMIN, ET C'EST VOULU : le corps
    du « i » se trace d'un geste, on LÈVE le crayon, puis on pose le point. Un
    « i » dont le point est attaché n'est plus un « i ». La scène le range donc
    dans un objet à part, `POSITION_POINT`.
    ⚠️ Ma première version de ce lecteur rendait `point: None` pour tout le
    monde : la fiche du « i » — DÉJÀ PUBLIÉE — a perdu son point, et ça ne s'est
    pas vu dans le code. C'est la comparaison au pixel avec la version de HEAD
    qui l'a montré : 20,2 px de déplacement, soit 1,71 mm, quand les cinq autres
    lettres restaient sous 0,19 mm (de l'anticrénelage).
    👉 Le « j » aura le même besoin. Il est déjà servi : on lit l'attribut.
    """
    module = importlib.import_module(f"lettre_{lettre}")
    point = getattr(module, "POSITION_POINT", None)
    return _spec(_echantillonner(getattr(module, f"chemin_{lettre}")()),
                 None if point is None else (float(point[0]), float(point[1])))


def _spec(traits: list[list[tuple[float, float]]],
          point: tuple[float, float] | None = None) -> dict:
    return {"traits": traits, "point": point, "depart": traits[0][0]}
