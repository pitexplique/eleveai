# Ce que les chiffres 4 à 9 partagent : cinq objets, et une façon de les grouper.
#
# ⭐⭐ POURQUOI LES MÊMES CINQ OBJETS D'UN CHIFFRE À L'AUTRE.
# Les vidéos « 1 », « 2 » et « 3 » avaient chacune ses propres dessins, et
# l'argument était juste : la variété DANS un chiffre enseigne que le nombre ne
# dépend pas de l'objet compté. Cet argument tient toujours — les cinq objets
# restent différents à l'intérieur d'une vidéo.
# ⭐ Mais un second argument s'y ajoute à partir de quatre : la CONSTANCE d'un
# chiffre à l'autre laisse l'enfant COMPARER. Six pommes à côté de quatre
# pommes, ça se voit ; six pommes à côté de quatre bougies, non. C'est ce qui
# construit l'ordre des nombres, et c'est le programme du CP.
#
# ⚠️ Les objets sont volontairement SIMPLES et PETITS : à neuf exemplaires dans
# un cadre 9:16, un dessin détaillé devient une tache. On a déjà payé cette
# leçon trois fois (l'iris du « i », l'oreille du « o », la plume du « u »).

import sys
from pathlib import Path

import numpy as np
from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from charte import *  # noqa: F403,E402


def groupe(n: int, faire, ecart: float = 0.46, par_rang: int = 5) -> VGroup:
    """`n` exemplaires, en rangées de `par_rang` au plus.

    ⛔ UNE SEULE RANGÉE NE MARCHE PAS AU-DELÀ DE CINQ. Neuf objets alignés
    mesurent plus que la largeur utile du portrait (3,90) et `verifier()`
    arrêterait le rendu — ce qu'il doit faire. Deux rangées gardent chaque objet
    lisible au lieu de tout rétrécir.
    ⭐ Et une rangée de cinq maximum, c'est aussi la façon dont on compte à la
    main : cinq doigts, puis on recommence.
    """
    g = VGroup()
    rangs = [
        VGroup(*[faire() for _ in range(min(par_rang, n - i * par_rang))])
        for i in range((n + par_rang - 1) // par_rang)
    ]
    for r in rangs:
        r.arrange(RIGHT, buff=ecart * 0.5)
        g.add(r)
    g.arrange(DOWN, buff=ecart * 0.4)
    return g


# ─── Les cinq objets ──────────────────────────────────────────────────────────
def pomme() -> VGroup:
    fruit = Circle(radius=0.17, stroke_color=ROUGE_ERREUR, stroke_width=4)
    fruit.set_fill(opacity=0)
    queue = Line(np.array([0.01, 0.16, 0]), np.array([0.04, 0.30, 0]),
                 stroke_color=VERT_OK, stroke_width=3)
    return VGroup(fruit, queue)


def etoile() -> VGroup:
    r, p = 0.20, 0.085
    pts = []
    for k in range(10):
        a = PI / 2 + k * PI / 5
        d = r if k % 2 == 0 else p
        pts.append(np.array([d * np.cos(a), d * np.sin(a), 0]))
    return VGroup(Polygon(*pts, stroke_color=JAUNE_TITRE, stroke_width=3)
                  .set_fill(opacity=0))


def bougie() -> VGroup:
    corps = Rectangle(width=0.13, height=0.38, stroke_color=BLEU_CALCUL,
                      stroke_width=3)
    corps.set_fill(opacity=0)
    flamme = Ellipse(width=0.11, height=0.18, stroke_color=ORANGE_RETENUE,
                     stroke_width=3)
    flamme.set_fill(opacity=0).shift(UP * 0.30)
    return VGroup(corps, flamme)


def roue() -> VGroup:
    jante = Circle(radius=0.17, stroke_color=WHITE, stroke_width=4)
    jante.set_fill(opacity=0)
    rayons = VGroup(
        *[Line(np.array([0.15 * np.cos(a), 0.15 * np.sin(a), 0]),
               np.array([-0.15 * np.cos(a), -0.15 * np.sin(a), 0]),
               stroke_color=GREY_B, stroke_width=2)
          for a in (0, PI / 3, 2 * PI / 3)]
    )
    return VGroup(jante, rayons)


def poisson() -> VGroup:
    corps = Ellipse(width=0.38, height=0.19, stroke_color=BLEU_CALCUL,
                    stroke_width=3)
    corps.set_fill(opacity=0)
    queue = Polygon(np.array([-0.19, 0, 0]), np.array([-0.32, 0.11, 0]),
                    np.array([-0.32, -0.11, 0]),
                    stroke_color=BLEU_CALCUL, stroke_width=3).set_fill(opacity=0)
    oeil = Dot(np.array([0.11, 0.04, 0]), radius=0.025)
    return VGroup(corps, queue, oeil)


# ⭐ L'ORDRE NE CHANGE PAS D'UN CHIFFRE À L'AUTRE : c'est ce qui permet de
# comparer. Le mot au pluriel accompagne chaque objet.
OBJETS = [
    ("pommes", pomme),
    ("étoiles", etoile),
    ("bougies", bougie),
    ("roues", roue),
    ("poissons", poisson),
]
