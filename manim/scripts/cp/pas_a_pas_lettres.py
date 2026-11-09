# « La belle écriture — pas à pas » : les 20 lettres déjà tracées, en PAYSAGE LENT.
#
# ── POURQUOI CE FICHIER EXISTE (08/11/2026) ───────────────────────────────────
# ⭐⭐ La suite des 10 chiffres (`pas_a_pas_chiffres.py`, gabarit validé le 03/11).
# Frédéric, en 6e : un élève avec AESH et deux élèves d'ULIS qui ne savaient pas
# écrire. Les chiffres les ont fait écrire : « pour une fois ils étaient fiers ».
# Même déroulé, MÊME MÉTHODE en 3 pictos, même lenteur (voix à −28), mêmes
# questions à DEUX choix et 8 s pour répondre : elles font réussir.
#
# ⭐ CE QUI CHANGE PAR RAPPORT AUX CHIFFRES :
#   · la question 3 n'est plus « combien » : c'est un MOT avec son dessin
#     (« Quel mot commence par m ? »). e, u, y : le mot CONTIENT la lettre
#     (« Dans quel mot il y a la lettre u ? »), comme dans leurs scènes ;
#   · le leurre de la question 3 ne contient PAS la lettre du tout ;
#   · la réglure garde ses trois interlignes, plus deux sous la ligne pour les
#     lettres à jambage (f, g, p, q, y) : la jambe sait où elle va ;
#   · le « i » lève le crayon pour son POINT : un trait de plus, un petit rond.
#
# ⛔ Les tracés viennent des scènes `lettre_<x>.py` (`chemin_<x>`) : la vidéo, le
# short et le cahier montrent le même geste. Les dessins des mots aussi
# (la liste `dessins = [...]` de chaque scène, dans l'ordre de `MOTS_EN_<X>`).
# ⛔ Les MORCEAUX sont coupés sur les proportions MESURÉES des chemins (relevé du
# 08/11 : sommets, creux, points les plus à gauche, 400 points par trait).
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   python manim/scripts/cp/pas_a_pas_lettres.py            → écrit les 20 JSON de voix
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/cp-pas-a-pas-lettre-m.json -Debit -28
#   python -m manim render -qh --disable_caching manim/scripts/cp/pas_a_pas_lettres.py PasAPasLettreM \
#       -o eleveai-francais-cp-pas-a-pas-lettre-m --media_dir manim/scripts/cp/media-pap-m
# ⛔ TOUJOURS --disable_caching (sinon les sons sautent sans un mot).
# ⛔ Rendus PARALLÈLES : un --media_dir CHACUN (cache Text partagé → ParseError SVG).

import importlib
import json
import re
import sys
import wave
from pathlib import Path

import numpy as np
from manim import *

ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[2]
sys.path.insert(0, str(ICI.parents[1]))  # manim/
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "seconde"))
from charte import *  # noqa: F403,E402
from mascotte import MascotteMargouillat  # noqa: E402

from chiffre_commune import main_ouverte  # noqa: E402
from lettre_commune import (  # noqa: E402
    EPS, angle_main, page_de_garde, poser_stylo, stylo_neuf, verifier,
)
from signes_expression_2de import echelle_ceintures  # noqa: E402

HAUT = 11.0

LETTRES = list("acdefghiklmnopqrstuy")
# Les lettres qu'on trouve DANS le mot (format « u comme dans… » de leurs scènes).
DANS_LE_MOT = set("euy")
# Les lettres à jambage : deux interlignes de plus sous la ligne.
JAMBAGE = set("fgpqy")

# ── LES MORCEAUX DU TRACÉ ─────────────────────────────────────────────────────
# (phrase, trait, fin) : le crayon va jusqu'à la proportion `fin` du trait.
# `trait = None` = LEVER DE CRAYON : on le repose au début du trait suivant.
# Les phrases suivent la clé `03-depart` de `manim/voix/cp-lettre-<x>.json`,
# coupées là où le chemin change de geste (relevé du 08/11) :
MORCEAUX = {
    # a : sommet 0,135 ; le rond touche le bas à 0,48 ; remonte au départ 0,65 ;
    # le fût touche la ligne à 0,84.
    "a": [("Je tourne vers la gauche, et je descends.", 0, 0.48),
          ("Je remonte, et je ferme le rond.", 0, 0.65),
          ("Je redescends tout droit, jusqu'à la ligne.", 0, 0.84),
          ("Et je sors vers la droite, par un petit creux.", 0, 1.0)],
    # c : en haut à gauche à 0,25 ; le bas du rond à 0,70.
    "c": [("Je monte un peu, et je tourne vers la gauche.", 0, 0.25),
          ("Je descends en faisant un beau rond.", 0, 0.70),
          ("Je reviens vers la droite, et je remonte un peu pour finir.", 0, 1.0)],
    # d : le demi-rond le plus à gauche à 0,51 ; le fût touche la ligne à 0,82.
    "d": [("Je fais un demi-rond : je tourne vers la gauche, et je descends.", 0, 0.55),
          ("Je reviens vers la droite.", 0, 1.0),
          ("Attention : je lève le crayon ! Je le repose tout en haut.", None, 0),
          ("Je descends tout droit, jusqu'à la ligne.", 1, 0.82),
          ("Et je finis par le petit creux posé sur la ligne.", 1, 1.0)],
    # e : monte jusqu'à 0,28 ; boucle, point le plus à gauche 0,565 ; croise
    # son trait vers 0,68, en bas.
    "e": [("Je monte en biais, vers la droite.", 0, 0.28),
          ("Je fais une boucle vers la gauche, et je redescends.", 0, 0.65),
          ("Je croise le trait, je tourne en bas, et je sors.", 0, 1.0)],
    # f : en haut à 0,29 ; boucle jusqu'à 0,37 ; passe la ligne à 0,60 ; la
    # petite boucle du bas revient sur la ligne à 0,93.
    "f": [("Je monte par un creux, tout en haut.", 0, 0.29),
          ("Je fais une grande boucle vers la gauche.", 0, 0.37),
          ("Je redescends presque droit, et je passe sous la ligne.", 0, 0.70),
          ("Je fais une petite boucle vers la droite, qui revient sur la ligne.", 0, 0.93),
          ("Et je sors par un dernier creux.", 0, 1.0)],
    # g : le bas du rond à 0,63 ; la jambe à 0,45 du 2e trait (sous la ligne).
    "g": [("Je fais un rond : je tourne vers la gauche, et je passe par le bas.", 0, 0.63),
          ("Je remonte, et je reviens au point vert.", 0, 1.0),
          ("Attention : je lève le crayon ! Je le repose un peu plus haut.", None, 0),
          ("Je descends tout droit, bien droit, sous la ligne.", 1, 0.45),
          ("Je fais une grande boucle vers la gauche, qui remonte se poser sur la ligne.", 1, 1.0)],
    # h : en haut 0,34 ; boucle 0,43 ; la ligne 0,71 ; quitte son trait à 0,76 ;
    # le pont redescend à 0,943.
    "h": [("Je monte en biais, tout en haut.", 0, 0.34),
          ("Je fais la grande boucle vers la gauche.", 0, 0.43),
          ("Je redescends tout droit, jusqu'à la ligne.", 0, 0.71),
          ("Je remonte sur le même trait, sans lever le crayon.", 0, 0.76),
          ("Je fais un beau pont, et je redescends.", 0, 0.943),
          ("Et je finis par le petit creux posé sur la ligne.", 0, 1.0)],
    # i : sommet 0,42 ; la ligne 0,83 ; puis le point (2e trait).
    "i": [("Je monte en biais, jusqu'en haut.", 0, 0.42),
          ("Je redescends jusqu'à la ligne.", 0, 0.83),
          ("Et je sors vers la droite.", 0, 1.0),
          ("Attention : je lève le crayon ! Je le repose au-dessus.", None, 0),
          ("Je fais le point, tout petit.", 1, 1.0)],
    # k : en haut 0,31 ; boucle 0,37 ; la ligne 0,655 ; quitte son trait 0,73 ;
    # la petite boucle revient toucher le trait à 0,865.
    "k": [("Je monte par un creux, tout en haut.", 0, 0.31),
          ("Je fais une grande boucle vers la gauche.", 0, 0.37),
          ("Je redescends tout droit, jusqu'à la ligne.", 0, 0.655),
          ("Je remonte sur le même trait, sans lever le crayon.", 0, 0.73),
          ("Je fais une petite boucle vers la droite, qui revient toucher le trait.", 0, 0.865),
          ("La jambe descend : une voûte, puis un creux posé sur la ligne.", 0, 1.0)],
    # l : en haut 0,43 ; boucle 0,55 ; croise le trait et arrive en bas à 0,86.
    "l": [("Je monte en biais, tout en haut.", 0, 0.43),
          ("Je tourne à gauche pour faire la grande boucle.", 0, 0.55),
          ("Je redescends tout droit, et je croise le trait.", 0, 0.86),
          ("Et je finis par une belle courbe posée sur la ligne.", 0, 1.0)],
    # m : crosse et ligne 0,21 ; 1er pont redescend 0,547 ; 2e pont 0,91.
    "m": [("Je fais la crosse vers la gauche, et je descends.", 0, 0.21),
          ("Je remonte sur le même trait, je fais un premier pont, et je redescends.", 0, 0.547),
          ("Je remonte encore, je fais un deuxième pont, et je redescends.", 0, 0.91),
          ("Et je finis par le petit creux posé sur la ligne.", 0, 1.0)],
    # n : crosse et ligne 0,312 ; quitte son trait 0,44 ; le pont redescend 0,865.
    "n": [("Je fais une crosse vers la gauche, comme un bâton de pèlerin, et je descends tout droit.", 0, 0.312),
          ("Je remonte sur le même trait, sans lever le crayon.", 0, 0.44),
          ("Je fais un grand pont, et je redescends.", 0, 0.865),
          ("Et je finis par un petit creux posé sur la ligne.", 0, 1.0)],
    # o : le bas 0,54 ; referme le rond en haut 0,925.
    "o": [("Je tourne vers la gauche, et je descends.", 0, 0.54),
          ("Je fais le tour, et je remonte fermer le rond.", 0, 0.925),
          ("Et je sors par le haut, vers la droite.", 0, 1.0)],
    # p : en haut 0,245 ; le fût sous la ligne au bout du 1er trait ; la voûte
    # redescend sur la ligne à 0,715 du 2e.
    "p": [("Je monte par un trait bien courbé, jusqu'en haut.", 0, 0.245),
          ("Je redescends tout droit, jusque sous la ligne.", 0, 1.0),
          ("Attention : je lève le crayon ! Je le repose en haut.", None, 0),
          ("Je fais une belle voûte, et je redescends.", 1, 0.715),
          ("Et je finis par un petit creux posé sur la ligne.", 1, 1.0)],
    # q : TROIS tracés (lettre_q.py, Frédéric le 08/09) — rond, fût, attache.
    "q": [("Je fais un rond : je tourne vers la gauche, et je passe par le bas.", 0, 0.63),
          ("Je remonte, et je reviens au point vert.", 0, 1.0),
          ("Attention : je lève le crayon ! Je le repose un peu plus haut.", None, 0),
          ("Je descends tout droit, jusque sous la ligne.", 1, 1.0),
          ("Je lève encore le crayon ! Je le repose sur le point vert.", None, 0),
          ("Je descends doucement par un creux, jusqu'à toucher la ligne.", 2, 1.0)],
    # r : en haut 0,26 ; la petite boucle finit à 0,49 ; redescend à 0,80.
    "r": [("Je monte par un trait bien courbé.", 0, 0.26),
          ("Tout en haut, je fais une petite boucle vers la gauche.", 0, 0.49),
          ("Je file à l'horizontale, et je redescends.", 0, 0.80),
          ("Et je finis par le petit creux posé sur la ligne.", 0, 1.0)],
    # s : en haut 0,33 ; la boucle 0,45 ; le bas 0,855.
    "s": [("Je monte par un creux, tout en haut.", 0, 0.33),
          ("Je fais une petite boucle vers la gauche.", 0, 0.45),
          ("Je repars vers la droite, et je redescends en arrondi.", 0, 0.855),
          ("Et je finis par un dernier creux vers la gauche, posé sur la ligne.", 0, 1.0)],
    # t : le fût tourne à 0,70 ; puis la barre (2e trait).
    "t": [("Je descends tout droit, jusqu'en bas.", 0, 0.70),
          ("Je finis par un petit creux posé sur la ligne.", 0, 1.0),
          ("Attention : je lève le crayon ! Je le repose à gauche du trait.", None, 0),
          ("Je trace la barre, bien droite, vers la droite.", 1, 1.0)],
    # u : sommets 0,235 et 0,685 ; la ligne 0,463.
    "u": [("Je monte en biais, jusqu'en haut.", 0, 0.235),
          ("Je redescends en arrondi, jusqu'à la ligne.", 0, 0.463),
          ("Je remonte, jusqu'en haut.", 0, 0.685),
          ("Je redescends tout droit, et je sors vers la droite.", 0, 1.0)],
    # y : sommets 0,168 et 0,48 ; la ligne 0,325 ; la boucle du bas finit à 0,85.
    "y": [("Je monte en biais, jusqu'en haut.", 0, 0.168),
          ("Je redescends en arrondi, jusqu'à la ligne.", 0, 0.325),
          ("Je remonte, jusqu'en haut.", 0, 0.48),
          ("Je descends sous la ligne, et je fais une boucle vers la gauche.", 0, 0.85),
          ("Et je remonte vers la droite.", 0, 1.0)],
}

# ⭐ LE LEURRE DE LA QUESTION 2 SE VOIT TOUT DE SUITE : forme très différente.
LEURRE = {"a": "l", "c": "k", "d": "m", "e": "p", "f": "o", "g": "m", "h": "o",
          "i": "m", "k": "o", "l": "m", "m": "l", "n": "f", "o": "k", "p": "o",
          "q": "l", "r": "k", "s": "m", "t": "o", "u": "f", "y": "o"}

# Question 3 : le BON mot est le 4e de la liste de la scène (pas encore montré) ;
# le LEURRE est un mot d'une autre lettre qui NE CONTIENT PAS la lettre.
MOT_Q3 = 3
LEURRE_MOT = {"a": "kiwi", "c": "lune", "d": "pomme", "e": "robot", "f": "lapin",
              "g": "lit", "h": "soleil", "i": "tomate", "k": "rose", "l": "moto",
              "m": "sac", "n": "robot", "o": "lit", "p": "sac", "q": "lune",
              "r": "dé", "s": "moto", "t": "main", "u": "pomme", "y": "lapin"}

# Le POINT du i (lettre_i.py : un objet à part, pas un trait de `chemin_i`).
RAYON_POINT_I = 0.05


def lettre_mod(x):
    return importlib.import_module(f"lettre_{x}")


def mots_de(x):
    """[(mot, position de la lettre), …] dans l'ordre de la scène."""
    m = lettre_mod(x)
    liste = getattr(m, f"MOTS_EN_{x.upper()}")
    return [(e, 0) if isinstance(e, str) else tuple(e) for e in liste]


def fonctions_dessins(x):
    """Les noms des fonctions de dessin, dans l'ordre des mots (liste `dessins`
    du construct de la scène : les noms mentent souvent, « lune_dessine » est
    le cadeau du c — c'est l'ORDRE qui fait foi)."""
    src = (ICI / f"lettre_{x}.py").read_text(encoding="utf-8")
    bloc = re.search(r"dessins\s*=\s*\[(.*?)\]", src, re.S).group(1)
    return re.findall(r"(\w+_dessine)\(\)", bloc)


def dessin_du_mot(mot):
    for x in LETTRES:
        for (m, _), f in zip(mots_de(x), fonctions_dessins(x)):
            if m == mot:
                return getattr(lettre_mod(x), f)()
    raise KeyError(mot)


def chemin(x, **kw) -> VGroup:
    """Les TRAITS d'une lettre, dans l'ordre de la main (VGroup, un par trait)."""
    c = getattr(lettre_mod(x), f"chemin_{x}")(**kw)
    traits = ([t for t in c.submobjects if t.get_num_points()]
              if c.submobjects and not c.get_num_points() else [c])
    g = VGroup(*traits)
    if x == "i":
        # ⭐ Le point se TRACE : un tout petit rond, que le trait épais remplit.
        centre = lettre_mod("i").POSITION_POINT
        p = Circle(radius=RAYON_POINT_I, stroke_width=kw.get("stroke_width", 10),
                   color=kw.get("color", WHITE)).set_fill(opacity=0)
        p.rotate(PI / 2).move_to(centre)
        g.add(p)
    return g


def reglure(x) -> VGroup:
    """La réglure À LA TAILLE DE LA LETTRE (contrôle du « i », 08/11) : avec les
    trois interlignes des scènes partout, un « i » ne prenait qu'un septième de
    l'écran. Une lettre courte (a, i, m…) a la ligne d'écriture et UN interligne
    au-dessus ; une lettre à boucle (l, h, f…) les trois ; une jambe gagne les
    interlignes qu'elle traverse sous la ligne. Largeur : la lettre + une marge."""
    c = chemin(x)
    haut = 3 if c.get_top()[1] > 1.5 else 2
    bas = int(np.floor(c.get_bottom()[1])) if c.get_bottom()[1] < -0.3 else 0
    demi = max(1.75, c.width / 2 + 1.2)
    cx = c.get_center()[0]
    g = VGroup()
    for y in range(bas, haut + 1):
        forte = y == 0
        g.add(Line([cx - demi, y, 0], [cx + demi, y, 0], stroke_width=3 if forte else 1.5,
                   stroke_color=GREY_B if forte else GREY_D))
    return g


def dire_lettre(x):
    return f"le {x}"


def bon_a_droite(x: str, q: int) -> bool:
    """La bonne réponse change de côté : jamais toujours à gauche."""
    return (LETTRES.index(x) + q) % 2 == 0


def voix_lettre(x):
    return json.loads((RACINE / "manim" / "voix" / f"cp-lettre-{x}.json").read_text(encoding="utf-8"))


def voix(x: str) -> dict:
    vl = voix_lettre(x)
    cherchons = next(v for k, v in vl.items() if k.endswith("-cherchons"))
    comme = next(v for k, v in vl.items() if k.endswith(f"-{x}-comme"))
    mots = mots_de(x)
    bon = mots[MOT_Q3][0]
    faux = LEURRE_MOT[x]
    choix3 = f"{faux}, ou {bon}" if bon_a_droite(x, 3) else f"{bon}, ou {faux}"
    cote2 = "celle de droite" if bon_a_droite(x, 2) else "celle de gauche"
    v = {
        "00-bonjour": f"Bonjour ! Aujourd'hui, on écrit la lettre {x}.",
        "01-courage": "Tu vas y arriver. On va doucement, et c'est très bien comme ça.",
        "02-methode": "Voici ma méthode.",
        "03-methode-1": "Un : je pose mon crayon sur le point vert.",
        "04-methode-2": "Deux : je suis la flèche, tout doucement.",
        "05-methode-3": "Trois : quand j'ai fini, je colorie mon étoile.",
        "06-q1": "Question ! Pour commencer, où je pose mon crayon ? Sur le point vert, ou sur le point rouge ?",
        "07-q1-rep": "Sur le point vert ! Bravo, tu as retenu la méthode.",
        "08-regarde": "Regarde bien le crayon. Je le pose sur le point vert.",
    }
    for k, (phrase, _, _) in enumerate(MORCEAUX[x]):
        v[f"09-morceau-{k}"] = phrase
    v.update({
        "12-entier": "Encore une fois, en entier. Doucement.",
        "13-doigt": f"À toi ! Lève ton doigt, et trace {dire_lettre(x)} en l'air avec moi.",
        "14-doigt-bravo": "Super ! Ton doigt connaît le chemin.",
        "15-plus-vite": "Maintenant, un peu plus vite.",
        "16-q2": f"Question ! Laquelle est la lettre {x} ? Celle de gauche, ou celle de droite ?",
        "17-q2-rep": f"C'est {cote2} ! Bravo, tu la reconnais déjà.",
        "18-cherchons": cherchons,
        "18-comme": comme,
    })
    for k in range(3):
        v[f"18-mot-{k}"] = mots[k][0]
    if x in DANS_LE_MOT:
        v["20-q3"] = f"Question ! Dans quel mot il y a la lettre {x} ? {choix3[0].upper()}{choix3[1:]} ?"
    elif x == "q":
        v["20-q3"] = f"Question ! Quel mot commence par q u ? {choix3[0].upper()}{choix3[1:]} ?"
    else:
        v["20-q3"] = f"Question ! Quel mot commence par la lettre {x} ? {choix3[0].upper()}{choix3[1:]} ?"
    v["21-q3-rep"] = f"{bon[0].upper()}{bon[1:]} ! Bravo, tu as trouvé la lettre {x}."
    v.update({
        "22-fiche": f"Maintenant, prends ta fiche et ton crayon. Pars du point vert, et écris {dire_lettre(x)}, doucement.",
        "23-bravo": "Tu as très bien travaillé aujourd'hui. Bravo à toi !",
        "24-abonne": ("Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, "
                      "laisse un commentaire, abonne-toi et active la cloche !"),
    })
    return v


# ── LES COULEURS ET LES PETITS DESSINS ────────────────────────────────────────
ORANGE = "#F97316"
VERT_POINT = "#22C55E"


def fleche_methode() -> VGroup:
    return Arrow(LEFT * 0.5, RIGHT * 0.5, color=ORANGE, stroke_width=10, buff=0,
                 max_tip_length_to_length_ratio=0.45)


def etoile_contour(r=0.42) -> Star:
    return Star(5, outer_radius=r, inner_radius=r * 0.45, color=JAUNE_TITRE,
                stroke_width=6).set_fill(opacity=0)


class _PasAPasLettre(Scene):
    x = "a"
    vertical = False
    gaucher = False

    # ── la voix ──────────────────────────────────────────────────────────────
    def dire(self, nom: str) -> float:
        chemin_wav = RACINE / "public" / "sons" / f"cp-pas-a-pas-lettre-{self.x}" / f"{nom}.wav"
        self.add_sound(str(chemin_wav))
        print(f"TEMPS {nom} {self.renderer.time:.2f}", flush=True)
        with wave.open(str(chemin_wav), "rb") as w:
            return w.getnframes() / float(w.getframerate())

    def texte(self, t, taille=40, couleur=WHITE, nom="texte", largeur_max=12.0):
        """⛔ Une phrase trop longue passe sur DEUX LIGNES, jamais à l'échelle."""
        m = Text(t, font_size=taille, color=couleur)
        if m.width > largeur_max:
            mots = t.split(" ")

            def cout(i):
                g, d = " ".join(mots[:i]), " ".join(mots[i:])
                # ⛔ Une ligne coupée après la virgule restait plus large que la
                # limite et touchait la petite lettre du coin (g, lot 1 du 08/11).
                trop = any(Text(s, font_size=taille).width > largeur_max for s in (g, d))
                return abs(len(g) - len(d)) - (8 if g[-1] in ",:!." else 0) + (1000 if trop else 0)
            i = min(range(1, len(mots)), key=cout)
            if cout(i) >= 500 and taille > 34:
                # ⛔ Aucune coupe en deux lignes ne tient (g, n) : la police baisse
                # un peu plutôt que de déborder ou de passer à trois lignes.
                return self.texte(t, taille - 2, couleur, nom, largeur_max)
            m = VGroup(Text(" ".join(mots[:i]), font_size=taille, color=couleur),
                       Text(" ".join(mots[i:]), font_size=taille, color=couleur)
                       ).arrange(DOWN, buff=0.2)
        for ligne in (m if isinstance(m, VGroup) and not isinstance(m, Text) else [m]):
            verifier(ligne, nom)
        return m

    def mot_avec_dessin(self, mot, pos, taille_mot=48, hauteur_dessin=1.1,
                        colorier=True, vertical=False):
        t = Text(mot, font_size=taille_mot, color=WHITE)
        if colorier:
            for i in (pos if isinstance(pos, tuple) else (pos,)):
                t[i].set_color(JAUNE_TITRE)
        d = dessin_du_mot(mot)
        d.height = hauteur_dessin
        # ⛔ À la Q3 (dessins de 1,9 de haut), une clé de 2,6 × la hauteur faisait
        # 5 unités de large à côté d'une petite lune (c, contrôle du 08/11).
        if d.width > (1.8 if vertical else 2.6) * hauteur_dessin:
            d.width = (1.8 if vertical else 2.6) * hauteur_dessin
        g = VGroup(d, t).arrange(DOWN, buff=0.35) if vertical else VGroup(t, d).arrange(RIGHT, buff=0.5)
        if vertical:
            # ⛔ La boîte de la goutte s'arrête 0,31 AU-DESSUS du bas de sa courbe :
            # les « tt » de « goutte » touchaient le dessin (g, contrôle du 08/11).
            # On mesure le vrai bas sur la courbe, et le mot descend d'autant.
            bas = min(m.point_from_proportion(a)[1] for m in d.family_members_with_points()
                      if len(m.points) for a in np.linspace(0, 1, 120))
            if bas < d.get_bottom()[1] - 0.01:
                t.shift(DOWN * (d.get_bottom()[1] - bas))
                g.move_to(ORIGIN)
        else:
            # ⛔ Même défaut à gauche pour la lune : « lune » touchait son dessin
            # (u, « u comme dans… », contrôle du 09/11). Le dessin part d'autant.
            gauche = min(m.point_from_proportion(a)[0] for m in d.family_members_with_points()
                         if len(m.points) for a in np.linspace(0, 1, 120))
            if gauche < d.get_left()[0] - 0.05:
                d.shift(RIGHT * (d.get_left()[0] - gauche))
                g.move_to(ORIGIN)
        return g, t

    # ── la question à deux choix ─────────────────────────────────────────────
    def question(self, clip_q, clip_rep, gauche, droite, bon_droite, titre_q, y_choix=-0.6,
                 a_la_reponse=None, x_choix=3.0):
        titre = self.texte("Question !", 64, JAUNE_TITRE, "titre question").to_edge(UP, buff=0.5)
        sous = self.texte(titre_q, 40, WHITE, "question").next_to(titre, DOWN, buff=0.3)
        gauche.move_to(LEFT * x_choix + UP * y_choix)
        droite.move_to(RIGHT * x_choix + UP * y_choix)
        # ⭐ « Bravo ! » viendra SOUS les choix : s'il finirait trop bas (sous la
        # barre du lecteur), les choix montent d'autant, dès leur arrivée.
        h_bravo = Text("Bravo !", font_size=72).height
        bas_bravo = min(SurroundingRectangle(c, buff=0.3, stroke_width=8, corner_radius=0.2).get_bottom()[1]
                        for c in (gauche, droite)) - 0.25 - h_bravo
        if bas_bravo < -config.frame_height / 2 + 0.6:
            for c in (gauche, droite):
                c.shift(UP * (-config.frame_height / 2 + 0.6 - bas_bravo))
        assert max(gauche.get_top()[1], droite.get_top()[1]) + 0.35 < sous.get_bottom()[1], \
            f"les choix touchent la question ({clip_q})"
        for c in (gauche, droite):
            verifier(c, "choix")
        d = self.dire(clip_q)
        self.play(FadeIn(titre, scale=1.3), run_time=0.4)
        self.play(FadeIn(sous), FadeIn(gauche, shift=UP * 0.2), FadeIn(droite, shift=UP * 0.2),
                  run_time=0.6)
        self.wait(max(0.2, d - 1.0))
        # ⭐ 8 s POUR RÉPONDRE : un élève lent doit avoir le temps de choisir.
        barre = Rectangle(width=8.0, height=0.22, stroke_width=0).set_fill(BLEU_CALCUL, 1)
        barre.to_edge(DOWN, buff=0.6)
        pause = self.texte("À toi de choisir !", 34, BLEU_CALCUL, "pause").next_to(barre, UP, buff=0.2)
        self.play(FadeIn(barre), FadeIn(pause), run_time=0.3)
        self.play(barre.animate.stretch(0.01, 0, about_edge=LEFT), run_time=7.7, rate_func=linear)
        self.play(FadeOut(barre), FadeOut(pause), run_time=0.3)
        bon, faux = (droite, gauche) if bon_droite else (gauche, droite)
        cadre = SurroundingRectangle(bon, color=VERT_OK, buff=0.3, stroke_width=8, corner_radius=0.2)
        # ⛔ « Bravo ! » SOUS les choix, plus entre eux : contrôle du lot 1 (08/11),
        # entre un « m » large et son cadre il touchait le cadre (Q2 du i et du m).
        bravo = self.texte("Bravo !", 72, VERT_OK, "bravo")
        bravo.next_to(VGroup(gauche, droite, cadre), DOWN, buff=0.25).set_x(0)
        if bravo.get_bottom()[1] < -config.frame_height / 2 + 0.2:
            bravo.move_to(UP * y_choix)
        assert not any(
            bravo.get_left()[0] < c.get_right()[0] and bravo.get_right()[0] > c.get_left()[0]
            and bravo.get_bottom()[1] < c.get_top()[1] and bravo.get_top()[1] > c.get_bottom()[1]
            for c in (gauche, droite, cadre)), f"« Bravo ! » chevauche un choix ({clip_rep})"
        assert bravo.get_bottom()[1] > -config.frame_height / 2 + 0.55,             f"« Bravo ! » trop près du bas ({clip_rep}) : {bravo.get_bottom()[1]:.2f} cadre {cadre.get_bottom()[1]:.2f} g {gauche.get_bottom()[1]:.2f} d {droite.get_bottom()[1]:.2f} h {bravo.height:.2f}"
        d = self.dire(clip_rep)
        # ⛔ PAS `set_opacity` : il remplit les tracés creux (lettre, tomate, sac
        # devenaient des formes pleines, contrôle du lot 1 du 08/11). On n'estompe
        # que ce qui est déjà visible : le trait, et le remplissage s'il y en a un.
        terne = faux.copy()
        for s in terne.family_members_with_points():
            s.set_stroke(opacity=0.25 * s.get_stroke_opacity())
            if s.get_fill_opacity() > 0:
                s.set_fill(opacity=0.25 * s.get_fill_opacity())
        anims = [Create(cadre), Transform(faux, terne)]
        if a_la_reponse is not None:
            # ⛔ Construite ICI, après le placement des choix : préparée avant,
            # `.animate` gardait l'ancienne place et la lettre sautait au centre.
            anims.append(a_la_reponse())
        self.play(*anims, run_time=0.6)
        self.play(FadeIn(bravo, scale=1.4), run_time=0.4)
        self.wait(max(0.3, d - 1.0) + 0.4)
        self.play(*[FadeOut(m) for m in (titre, sous, gauche, droite, cadre, bravo)], run_time=0.5)

    def construct(self):
        x = self.x
        margo = MascotteMargouillat().scale(0.9).to_edge(RIGHT, buff=0.9).shift(DOWN * 0.4)

        # ── 0. LA GARDE ──────────────────────────────────────────────────────
        garde, garde_main = page_de_garde(
            self, x, chemin(x, stroke_width=12), MascotteMargouillat(),
            notion="Les lettres, pas à pas",
        )
        # ── 1. BONJOUR + ENCOURAGEMENT ───────────────────────────────────────
        grand = chemin(x, stroke_width=16, color=JAUNE_TITRE)
        grand.height = 3.0
        if grand.width > 5.0:
            grand.width = 5.0
        titre = self.texte(f"La lettre {x}", 60, BLEU_CALCUL, "titre").to_edge(UP, buff=0.6)
        grand.move_to(LEFT * 2.0 + DOWN * 0.2)
        ceinture = echelle_ceintures("blanche", largeur=0.6).scale(0.6).to_corner(DL, buff=0.4)
        self.play(FadeOut(garde), FadeOut(garde_main), FadeIn(titre), FadeIn(grand),
                  FadeIn(margo), FadeIn(ceinture), run_time=0.3)
        self.wait(self.dire("00-bonjour"))
        courage = self.texte("Tu vas y arriver !", 52, VERT_OK, "courage").move_to(DOWN * 2.35)
        d = self.dire("01-courage")
        self.play(FadeIn(courage, scale=1.2), run_time=0.5)
        self.wait(max(0.2, d - 0.5) + 0.3)
        self.play(*[FadeOut(m) for m in (titre, grand, courage, ceinture)],
                  margo.animate.scale(0.7).to_corner(DR, buff=0.4))

        # ── 2. LA MÉTHODE, en trois images (les mêmes que sur la fiche) ─────
        t_meth = self.texte("Ma méthode", 60, JAUNE_TITRE, "méthode").to_edge(UP, buff=0.6)
        d = self.dire("02-methode")
        self.play(FadeIn(t_meth), run_time=0.4)
        self.wait(max(0.1, d - 0.4))
        pictos = [Dot(radius=0.32, color=VERT_POINT), fleche_methode(), etoile_contour()]
        phrases = ["1. Je pose mon crayon sur le point vert.",
                   "2. Je suis la flèche, tout doucement.",
                   "3. Quand j'ai fini, je colorie mon étoile."]
        lignes = VGroup()
        for p, ph in zip(pictos, phrases):
            t = self.texte(ph, 40, WHITE, "ligne de méthode")
            case = Rectangle(width=1.1, height=0.9, stroke_opacity=0).move_to(p)
            lignes.add(VGroup(VGroup(case, p), t).arrange(RIGHT, buff=0.4))
        lignes.arrange(DOWN, buff=0.7, aligned_edge=LEFT).next_to(t_meth, DOWN, buff=0.8)
        for ligne, clip in zip(lignes, ["03-methode-1", "04-methode-2", "05-methode-3"]):
            d = self.dire(clip)
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.5)
            self.play(Indicate(ligne[0][1], scale_factor=1.3), run_time=0.6)
            self.wait(max(0.2, d - 1.1) + 0.3)
        self.wait(0.6)
        self.play(FadeOut(t_meth), FadeOut(lignes), FadeOut(margo))

        # ── 3. QUESTION 1 : le point vert ────────────────────────────────────
        vert = VGroup(Dot(radius=0.6, color=VERT_POINT),
                      self.texte("vert", 40, VERT_POINT, "vert")).arrange(DOWN, buff=0.3)
        rouge = VGroup(Dot(radius=0.6, color=ROUGE_ERREUR),
                       self.texte("rouge", 40, ROUGE_ERREUR, "rouge")).arrange(DOWN, buff=0.3)
        self.question("06-q1", "07-q1-rep", vert, rouge, False,
                      "Où je pose mon crayon pour commencer ?")

        # ── 4. LE GESTE, PAR MORCEAUX ────────────────────────────────────────
        lignes_r = reglure(x)
        forme = chemin(x, stroke_width=16 * 1.35)
        bloc = VGroup(lignes_r, forme)
        # ⭐ La plus grande lettre possible entre la consigne (2 lignes au plus,
        # jusqu'à y = 2,2) et le bas du cadre.
        echelle = min(5.8 / bloc.height, 11.0 / bloc.width, 3.0)
        bloc.scale(echelle)
        bloc.move_to(DOWN * 0.75)
        # ⛔ Contrôle du lot 1 (08/11) : le haut du f (et le crayon, 0,66 au-dessus
        # de sa pointe) mordait sur une consigne de deux lignes. Plafond = le bas
        # d'une consigne de deux lignes ; la lettre rapetisse s'il le faut.
        bas_consigne = self.texte("Je fais une grande boucle vers la gauche, puis je redescends jusqu'en bas.",
                                  40, nom="mesure", largeur_max=HAUT).to_edge(UP, buff=0.55).get_bottom()[1]
        plafond = bas_consigne - 0.25
        # 0,95 et non 0,7 : à 0,7 le crayon passait à 5 px de « gauche » (f).
        marge_stylo = 0.95 + forme.get_stroke_width() / 100 / 2

        def haut_utile():
            return max(lignes_r.get_top()[1], forme.get_top()[1] + marge_stylo)
        for _ in range(60):
            if haut_utile() > plafond:
                bloc.shift(DOWN * (haut_utile() - plafond))
            if bloc.get_bottom()[1] >= -3.85:
                break
            bloc.scale(0.97, about_point=[bloc.get_center()[0], plafond, 0])
        assert bloc.get_bottom()[1] > -3.86, f"réglure hors cadre : {bloc.get_bottom()[1]:.2f}"
        assert haut_utile() <= plafond + 0.01, f"lettre sous la consigne : {haut_utile():.2f} > {plafond:.2f}"
        modele = forme.copy().set_stroke(color=GREY_D)
        les_traits = list(forme.submobjects)
        rappel = chemin(x, stroke_width=8, color=JAUNE_TITRE)
        rappel.height = 0.9 if rappel.height > 1.5 else 0.6
        rappel.to_corner(UL, buff=0.5)
        self.play(Create(lignes_r), FadeIn(modele), FadeIn(rappel), run_time=1.0)
        point = Dot(les_traits[0].get_start(), radius=0.16, color=VERT_POINT)

        avances = [ValueTracker(0.0) for _ in les_traits]
        dessins = VGroup()
        for t, a in zip(les_traits, avances):
            m = VMobject(stroke_width=16 * 1.35, stroke_color=WHITE).set_fill(opacity=0)

            def maj(mm, t=t, a=a):
                v = a.get_value()
                if v <= EPS:
                    mm.set_points(np.zeros((0, 3)))
                else:
                    mm.become(t.copy().set_stroke(color=WHITE).pointwise_become_partial(t, 0, min(v, 1)))
            m.add_updater(maj)
            dessins.add(m)
        self.add(dessins)

        modele_stylo = stylo_neuf()
        stylo = stylo_neuf()
        courant = {"k": 0}
        a_main = angle_main(self.gaucher)
        stylo.add_updater(lambda m: poser_stylo(
            m, modele_stylo, les_traits[courant["k"]], avances[courant["k"]].get_value(), a_main))

        consigne = self.texte(" ", 40)
        d = self.dire("08-regarde")
        self.play(FadeIn(point, scale=2.5), run_time=0.6)
        self.add(stylo)
        self.play(Flash(point, color=VERT_POINT, flash_radius=0.5), run_time=0.8)
        self.wait(max(0.2, d - 1.4) + 0.4)

        points_verts = []
        for k, (phrase, trait, fin) in enumerate(MORCEAUX[x]):
            nouvelle = self.texte(phrase, 40, BLEU_CALCUL, "morceau", HAUT).to_edge(UP, buff=0.55)
            assert nouvelle.get_left()[0] > rappel.get_right()[0] + 0.3, f"consigne sur la lettre du coin ({nouvelle.get_left()[0]:.2f} / {rappel.get_right()[0]:.2f}) : {phrase}"
            assert nouvelle.get_bottom()[1] >= plafond + 0.12, f"consigne sur la lettre : {phrase}"
            d = self.dire(f"09-morceau-{k}")
            self.play(FadeOut(consigne), FadeIn(nouvelle), run_time=0.3)
            consigne = nouvelle
            if trait is None:
                # ⛔ LE LEVER SE MONTRE : le crayon disparait, puis réapparait au
                # départ du trait suivant, marqué d'un nouveau point vert.
                courant["k"] += 1
                stylo.suspend_updating()
                p2 = Dot(les_traits[courant["k"]].get_start(), radius=0.16, color=VERT_POINT)
                points_verts.append(p2)
                self.play(stylo.animate.shift(UP * 0.8).set_opacity(0), run_time=0.8)
                self.play(FadeIn(p2, scale=2.5), run_time=0.5)
                stylo.set_opacity(1)
                stylo.resume_updating()
                self.wait(max(0.3, d - 1.6))
            else:
                courant["k"] = trait
                self.play(avances[trait].animate.set_value(fin), run_time=max(2.5, d - 0.3),
                          rate_func=linear)
                if x == "i" and trait == 1:
                    # ⭐ Le point vert, plus gros que le point du i, le cachait.
                    self.play(FadeOut(points_verts.pop()), run_time=0.3)
            self.wait(0.9)

        self.play(FadeOut(consigne), FadeOut(stylo))
        stylo.clear_updaters()

        def retracer(duree, avec_stylo=True):
            for a in avances:
                a.set_value(0)
            courant["k"] = 0
            if avec_stylo:
                stylo.add_updater(lambda m: poser_stylo(
                    m, modele_stylo, les_traits[courant["k"]], avances[courant["k"]].get_value(), a_main))
                self.add(stylo)
            # ⭐ Le temps se partage SELON LA LONGUEUR des traits : le point du i
            # ne prend pas la moitié du tracé.
            longueurs = [sum(np.linalg.norm(t.point_from_proportion(min((i + 1) / 40, 1 - EPS))
                                            - t.point_from_proportion(max(i / 40, EPS)))
                             for i in range(40)) for t in les_traits]
            longueurs = [max(l, 0.12 * sum(longueurs)) for l in longueurs]
            tot = sum(longueurs)
            for k, a in enumerate(avances):
                courant["k"] = k
                if k:
                    self.wait(0.4)  # le lever de crayon
                self.play(a.animate.set_value(1), run_time=duree * longueurs[k] / tot, rate_func=linear)
            if avec_stylo:
                stylo.clear_updaters()
                self.play(FadeOut(stylo), run_time=0.3)

        t_ent = self.texte("En entier, doucement.", 40, BLEU_CALCUL, "entier").to_edge(UP, buff=0.55)
        d = self.dire("12-entier")
        self.play(FadeIn(t_ent), run_time=0.3)
        self.wait(max(0.2, d - 0.3))
        retracer(8.0)
        self.play(FadeOut(t_ent))

        # Le doigt en l'air.
        doigt = main_ouverte(1).scale(1.8).to_edge(LEFT, buff=1.4).shift(DOWN * 0.4)
        # ⛔ Jamais sur la LETTRE (la réglure, elle, peut passer dessous), et
        # jamais hors du cadre (essai du « i » : la main sortait à gauche).
        ecart = doigt.get_right()[0] - (forme.get_left()[0] - 0.4)
        if ecart > 0:
            doigt.shift(LEFT * min(ecart, doigt.get_left()[0] + config.frame_width / 2 - 0.3))
        t_doigt = self.texte(f"À toi ! Trace le {x} en l'air avec ton doigt.", 40,
                             JAUNE_TITRE, "doigt", HAUT).to_edge(UP, buff=0.55)
        d = self.dire("13-doigt")
        self.play(FadeIn(t_doigt), FadeIn(doigt, shift=UP * 0.3), run_time=0.5)
        self.wait(max(0.2, d - 0.5))
        retracer(7.0)
        t_bravo = self.texte("Super ! Ton doigt connaît le chemin.", 40, VERT_OK,
                             "doigt bravo", HAUT).to_edge(UP, buff=0.55)
        d = self.dire("14-doigt-bravo")
        self.play(FadeOut(t_doigt), FadeIn(t_bravo), run_time=0.4)
        self.wait(max(0.2, d - 0.4) + 0.3)
        self.play(FadeOut(t_bravo), FadeOut(doigt))

        t_vite = self.texte("Un peu plus vite !", 40, BLEU_CALCUL, "vite").to_edge(UP, buff=0.55)
        d = self.dire("15-plus-vite")
        self.play(FadeIn(t_vite), run_time=0.3)
        self.wait(max(0.1, d - 0.3))
        for duree in (2.4, 1.5):
            retracer(duree, avec_stylo=False)
            self.wait(0.4)
        self.play(*[FadeOut(m) for m in (t_vite, dessins, modele, lignes_r, point, *points_verts)])
        dessins.clear_updaters()
        self.remove(dessins)

        # ── 5. QUESTION 2 : laquelle est la lettre ? ─────────────────────────
        bon_d = bon_a_droite(x, 2)
        vrai = chemin(x, stroke_width=14)
        faux = chemin(LEURRE[x], stroke_width=14)
        # ⭐ MÊME ÉCHELLE pour les deux : un « a » ne devient pas aussi haut qu'un « l ».
        s = 2.8 / max(vrai.height, faux.height)
        vrai.scale(s)
        faux.scale(s)
        g, dr = (faux, vrai) if bon_d else (vrai, faux)
        self.question("16-q2", "17-q2-rep", g, dr, bon_d, f"Laquelle est la lettre {x} ?")

        # ── 6. LES MOTS ──────────────────────────────────────────────────────
        mots = mots_de(x)
        dans = x in DANS_LE_MOT
        # ⭐ Le q emmène toujours son u (voix de lettre_q : « q u comme… »).
        tete = "qu" if x == "q" else x
        t_mots = Text(f"{tete} comme dans…" if dans else f"{tete} comme…", font_size=60, color=WHITE)
        for i in range(len(tete)):
            t_mots[i].set_color(JAUNE_TITRE)
        t_mots.to_edge(UP, buff=0.6)
        verifier(t_mots, "titre des mots")
        if x == "q":
            mots = [(m, (0, 1)) for m, _ in mots]
        lignes_m = VGroup(*[self.mot_avec_dessin(m, p, 56, 1.25)[0] for m, p in mots[:3]])
        lignes_m.arrange(DOWN, buff=0.55, aligned_edge=LEFT).next_to(t_mots, DOWN, buff=0.7)
        lignes_m.set_x(0)
        verifier(lignes_m, "mots")
        assert lignes_m.get_bottom()[1] > -3.8, "mots hors cadre"
        dc = self.dire("18-cherchons")
        self.wait(dc + 0.3)
        d = self.dire("18-comme")
        self.play(FadeIn(t_mots, shift=DOWN * 0.3), run_time=0.5)
        self.wait(max(0.2, d - 0.5) + 0.3)
        for k, ligne in enumerate(lignes_m):
            dm = self.dire(f"18-mot-{k}")
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.4)
            self.play(ligne.animate.scale(1.15), run_time=0.35)
            self.wait(0.5)
            self.play(ligne.animate.scale(1 / 1.15), run_time=0.3)
            self.wait(max(0.3, dm - 1.55) + 0.5)
        self.wait(0.8)
        self.play(FadeOut(t_mots), FadeOut(lignes_m))

        # ── 7. QUESTION 3 : quel mot ? ───────────────────────────────────────
        bon_d = bon_a_droite(x, 3)
        mot_bon, pos_bon = mots[MOT_Q3]
        c_bon, t_bon = self.mot_avec_dessin(mot_bon, pos_bon, 56, 1.9, colorier=False, vertical=True)
        c_faux, _ = self.mot_avec_dessin(LEURRE_MOT[x], 0, 56, 1.9, colorier=False, vertical=True)
        assert x not in LEURRE_MOT[x], f"le leurre {LEURRE_MOT[x]} contient {x}"
        g, dr = (c_faux, c_bon) if bon_d else (c_bon, c_faux)
        if dans:
            titre_q = f"Dans quel mot il y a la lettre {x} ?"
        elif x == "q":
            titre_q = "Quel mot commence par qu ?"
        else:
            titre_q = f"Quel mot commence par {x} ?"
        # ⭐ À la réponse, la lettre s'allume DANS le bon mot : on voit pourquoi.
        allume = lambda: AnimationGroup(*[t_bon[i].animate.set_color(JAUNE_TITRE)  # noqa: E731
                                          for i in (pos_bon if isinstance(pos_bon, tuple) else (pos_bon,))])
        # Les choix s'écartent, et montent (−0,6, plus −1,0) : « Bravo ! », dessous,
        # finissait à 30 px du bas, sous la barre du lecteur YouTube (contrôle du 08/11).
        self.question("20-q3", "21-q3-rep", g, dr, bon_d, titre_q, y_choix=-0.6,
                      a_la_reponse=allume, x_choix=4.0)

        # ── 8. LA FICHE ──────────────────────────────────────────────────────
        png = RACINE / "public" / "fiches-ecriture" / "mon-cahier-paliers" / f"cahier-ecriture-lettre-{x}.png"
        fiche = ImageMobject(str(png)).set_height(6.6)
        t_fiche = VGroup(
            self.texte("Prends ta fiche", 52, JAUNE_TITRE, "fiche 1"),
            self.texte("et ton crayon.", 52, JAUNE_TITRE, "fiche 2"),
            self.texte("Pars du point vert,", 40, WHITE, "fiche 3"),
            self.texte(f"et écris le {x},", 40, WHITE, "fiche 4"),
            self.texte("doucement.", 40, WHITE, "fiche 5"),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        Group(fiche, t_fiche).arrange(RIGHT, buff=0.7).move_to(ORIGIN)
        assert t_fiche.get_right()[0] < config.frame_width / 2 - 0.3, "texte de la fiche hors cadre"
        d = self.dire("22-fiche")
        self.play(FadeIn(fiche, shift=RIGHT * 0.3), FadeIn(t_fiche), FadeOut(rappel), run_time=0.6)
        self.wait(max(0.3, d - 0.6) + 0.8)
        self.play(FadeOut(fiche), FadeOut(t_fiche))

        # ── 9. BRAVO + FIN ───────────────────────────────────────────────────
        margo = MascotteMargouillat().scale(1.0).to_edge(RIGHT, buff=1.0)
        t_b = VGroup(self.texte("Tu as très bien travaillé", 54, VERT_OK, "bravo 1"),
                     self.texte("aujourd'hui.", 54, VERT_OK, "bravo 2"),
                     self.texte("Bravo à toi !", 64, JAUNE_TITRE, "bravo 3")
                     ).arrange(DOWN, buff=0.3).move_to(LEFT * 2.2)
        d = self.dire("23-bravo")
        self.play(FadeIn(margo), FadeIn(t_b, scale=0.9), run_time=0.6)
        self.wait(max(0.3, d - 0.6) + 0.5)
        self.play(FadeOut(t_b))
        # ⛔ Fin du 05/11 (manim/REGLES.md) : voix = écrit.
        site = self.texte("eleveai.fr", 64, WHITE, "site")
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.25, stroke_width=6, corner_radius=0.2)
        fin = VGroup(
            self.texte("Entraîne-toi sur", 44, BLEU_CALCUL, "fin 1"),
            VGroup(site, cadre),
            self.texte("Et si ça t'a aidé :", 40, WHITE, "fin 2"),
            self.texte("mets un pouce, laisse un commentaire,", 36, WHITE, "fin 3", 9.0),
            self.texte("abonne-toi et active la cloche !", 44, JAUNE_TITRE, "fin 4", 9.0),
            self.texte("@eleveai974", 34, GREY_B, "fin 5"),
        ).arrange(DOWN, buff=0.3).move_to(LEFT * 2.2)
        assert fin.get_left()[0] > -config.frame_width / 2 + 0.3, "fin hors cadre à gauche"
        assert fin.get_right()[0] < margo.get_left()[0] - 0.1, "fin sur Ti Margo"
        assert fin.get_top()[1] < 3.8 and fin.get_bottom()[1] > -3.8, "fin hors cadre"
        d = self.dire("24-abonne")
        self.play(FadeIn(fin), run_time=0.5)
        self.wait(max(0.3, d - 0.5) + 1.5)


# Une classe par lettre : PasAPasLettreA … PasAPasLettreY.
for _x in LETTRES:
    globals()[f"PasAPasLettre{_x.upper()}"] = type(
        f"PasAPasLettre{_x.upper()}", (_PasAPasLettre,), {"x": _x})


if __name__ == "__main__":
    for x in LETTRES:
        assert x not in LEURRE_MOT[x]
        f = RACINE / "manim" / "voix" / f"cp-pas-a-pas-lettre-{x}.json"
        f.write_text(json.dumps(voix(x), ensure_ascii=False, indent=2), encoding="utf-8")
        print(f)
