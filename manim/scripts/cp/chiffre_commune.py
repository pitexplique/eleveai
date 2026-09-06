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
# ⭐ Les mêmes dessins, les mêmes rangs : seule l'étiquette change. C'est ce qui
# permet de comparer une vidéo française et une vidéo anglaise dans le plan
# d'expérience — si les images différaient, on ne saurait pas ce qu'on mesure.
OBJETS_EN = [
    ("apples", pomme),
    ("stars", etoile),
    ("candles", bougie),
    ("wheels", roue),
    ("fish", poisson),
]

OBJETS = [
    ("pommes", pomme),
    ("étoiles", etoile),
    ("bougies", bougie),
    ("roues", roue),
    ("poissons", poisson),
]


# ─── ⭐⭐ LE RÉFÉRENT CORPOREL ────────────────────────────────────────────────
# Frédéric, 05/09/2026 : « le chiffre 5 doit être comme les 5 doigts de la
# main », puis « 2 comme tes deux mains ».
# ⭐ Pourquoi c'est plus fort que cinq pommes : les pommes, il faut les avoir
# sous les yeux. La main, l'enfant l'a TOUJOURS AVEC LUI — c'est le seul
# référent qu'il peut convoquer en pleine dictée, sans matériel.
# ⚠️ ET C'EST POURQUOI IL ARRIVE EN CONCLUSION, PAS À LA PLACE DES OBJETS.
# Les cinq objets restent identiques d'un chiffre à l'autre : c'est cette
# constance qui laisse comparer six pommes à quatre pommes. La main, elle, ne
# vaut que pour SON chiffre — la mettre dans la liste casserait la comparaison.
# ⛔ ET ÇA NE SE GÉNÉRALISE PAS AUX DIX CHIFFRES. 1 (un nez), 2 (deux mains),
# 5 (cinq doigts), 10 (dix doigts) ont un référent corporel vrai. 3, 4, 6, 7, 8
# et 9 n'en ont AUCUN. On n'en invente pas : un faux repère s'apprend aussi bien
# qu'un vrai, et se désapprend beaucoup moins facilement.
def main_ouverte(doigts: int = 5, gauche: bool = False) -> VGroup:
    """Une main de face, `doigts` doigts levés. `gauche` la retourne.

    ⭐⭐ SILHOUETTE PLEINE, ET C'EST UNE CORRECTION MESURÉE AU RENDU. Première
    version en contour seul : les doigts et la paume se chevauchent, donc leurs
    bords traversaient l'intérieur de la main en traits parasites, et le pouce
    flottait comme une anse détachée. Rempli d'une seule couleur, tout se fond
    en une forme unique — c'est la leçon déjà payée trois fois (l'iris du « i »,
    l'oreille du « o », la plume du « u ») : **une silhouette fermée se lit, un
    faisceau de traits non.**
    ⚠️ Les écarts entre doigts sont donc devenus structurels : sans eux, la
    silhouette n'a plus de doigts du tout, juste une palette. 0,07 d'espace pour
    0,17 de doigt — mesuré au rendu, pas choisi à vue.
    ⭐ `gauche` existe pour les DEUX mains du chiffre 2 : deux mains droites
    côte à côte ne sont pas deux mains, c'est la même deux fois.
    """
    plein = dict(stroke_width=0, fill_opacity=1, fill_color=ORANGE_RETENUE)
    paume = RoundedRectangle(width=0.92, height=0.80, corner_radius=0.22, **plein)

    g = VGroup(paume)
    # Majeur le plus long, comme une vraie main — l'index et l'annulaire
    # l'encadrent, l'auriculaire est nettement plus court.
    hauteurs = (0.60, 0.74, 0.68, 0.50)
    for k, h in enumerate(hauteurs[: max(0, min(4, doigts))]):
        d = RoundedRectangle(width=0.17, height=h, corner_radius=0.085, **plein)
        d.move_to(np.array([-0.345 + k * 0.24, 0.34 + h / 2, 0]))
        g.add(d)
    # ⭐ Le POUCE part sur le côté et REMONTE : c'est ce qui fait lire « main »
    # plutôt que « peigne ». Il n'apparait qu'au cinquième doigt.
    if doigts >= 5:
        pouce = RoundedRectangle(width=0.17, height=0.50, corner_radius=0.085, **plein)
        pouce.rotate(52 * DEGREES).move_to(np.array([-0.56, 0.26, 0]))
        g.add(pouce)
    if gauche:
        g.flip(UP)
    return g


def referent_corporel(n: int, langue: str = "fr") -> tuple[VGroup, tuple[str, ...]] | None:
    """Le dessin et sa légende EN LIGNES, ou None si le chiffre n'en a pas.

    ⛔ La légende arrive DÉJÀ COUPÉE, elle n'est pas une chaîne unique.
    « comme les doigts de ta main ! » mesurait 5,33 pour 3,90 utiles en 9:16 et
    `verifier()` a arrêté le rendu — comme il doit. Au-delà de ~15 signes, une
    ligne ne tient pas dans un portrait : on coupe à la main, jamais à l'échelle.
    """
    if n == 2:
        mains = VGroup(
            main_ouverte(5, gauche=True), main_ouverte(5)
        ).arrange(RIGHT, buff=0.50)
        return mains, (("comme tes", "deux mains !") if langue == "fr"
                       else ("like your", "two hands!"))
    if n == 5:
        return VGroup(main_ouverte(5)), (
            ("comme les doigts", "de ta main !") if langue == "fr"
            else ("like the fingers", "on your hand!")
        )
    # ⛔ 1 (un nez) attend son dessin ; 3, 4, 6, 7, 8, 9 n'ont AUCUN référent
    # corporel vrai, et on n'en invente pas.
    return None
