# miniature_espace_terminale.py
# LES 12 MINIATURES de la série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (23/11/2026).
# Copie adaptée de `miniature_suites.py`, qui l'était de `miniature_distributivite.py` :
# même charte, mêmes helpers d'indices/exposants, même endroit d'écriture.
#
#   python manim/miniature_espace_terminale.py [filtre]
#
# ⭐ POURQUOI ELLES EXISTENT. Les 12 vidéos étaient rendues, vérifiées et inscrites au
# registre, et aucune n'avait de miniature. Mesuré dans `scripts/publier-youtube.mjs` :
# ce n'est PAS un verrou pour une vidéo PAYSAGE — le filtre de la l. 802 ne porte que sur
# les shorts (`v.type !== "short" || ... || cheminMiniature(...)`), et `poserMiniature`
# rend « absente » sans rien interrompre. Une paysage sans miniature part donc quand
# même, avec la vignette que YouTube fabrique tout seul.
# ⛔ MAIS les 12 SHORTS de la série, eux, ne partiront jamais sans la leur : pour un
# short le filtre mord. Les miniatures sont donc nécessaires de toute façon, et c'est
# pour ça que Frédéric a tranché « on les fait » plutôt que « on publie tel quel ».
#
# ⚠️ OÙ ELLES VONT, ET POURQUOI LÀ. `cheminMiniature` cherche dans `manim/miniatures/`
# PUIS dans `manim/sorties/` ; le registre déclare
# `terminale/maths/geometrie/<slug>/<nom>.png`. `construire()` écrit à côté de la vidéo
# dès qu'on lui passe `dossier` — c'est le choix de Frédéric du 25/09 (« comme ça la
# vidéo est avec sa miniature »), et c'est ce chemin-là que le registre déclare déjà.
# ⛔ Le dossier doit EXISTER, sinon `construire` ne sauve rien et ne dit rien : les 12
# dossiers existent, puisqu'ils contiennent les 12 MP4.
#
# ⚠️ « EN N MIN » est LU dans le MP4 (`minutes()`), jamais écrit à la main : les douze
# durées vont de 5 min 02 à 7 min 00, et une durée recopiée se périme au premier
# re-rendu. Relancer ce script après tout nouveau rendu HD.
#
# ⛔⛔ CE QUI S'ÉCRIT ICI NE S'INVENTE PAS. Chaque ligne de maths vient de la VOIX de son
# épisode (`manim/voix/terminale-*.json`, clip `02-idee` le plus souvent), pas d'un
# souvenir : une miniature est la première chose que l'élève lit, et une formule fausse
# en couverture est pire qu'une formule absente. La passe maths des douze voix a été
# exécutée par un script (`controler-maths-voix-espace.py`), donc ces nombres-là sont
# déjà contrôlés à la source.

import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_puissances import minutes  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
DOSSIER = "terminale/maths/geometrie"
BADGE = "MATHS · TLE SPÉ"

# ⭐ Les douze ceintures sont VERTES : c'est la ceinture de la série (`ceinture = "verte"`
# dans les douze scripts Manim et dans les douze entrées du registre). Une miniature qui
# annoncerait une autre ceinture contredirait la vidéo qu'elle couvre.
CEINTURE = "verte"

# slug du dossier et du nom de fichier · titre sur DEUX lignes · la maths (bleu) ·
# la ligne du bas : « + … » ou « = … » la met en VERT (ce qui est juste), sinon en ROUGE
# (ce qui est le piège). C'est la convention de `acc_paysage`, héritée des suites.
EP = [
    ("espace-vecteurs",
     ["COMPRENDRE LES VECTEURS", "DANS L'ESPACE"],
     "~{AB} (3 ; 4 ; 0)", "+ arrivée moins départ"),
    ("espace-repere-coordonnees",
     ["COMPRENDRE LES COORDONNÉES", "DANS L'ESPACE"],
     "M (x ; y ; z)", "+ le milieu, c'est une moyenne"),
    ("espace-droite-parametrique",
     ["COMPRENDRE LA DROITE", "PARAMÉTRIQUE"],
     "x = 1 + 2t", "+ un point et une direction"),
    ("espace-plan-equation",
     ["COMPRENDRE L'ÉQUATION", "D'UN PLAN"],
     "a x + b y + c z + d = 0", "+ une équation, un plan entier"),
    ("espace-position-relative",
     ["COMPRENDRE LES POSITIONS", "RELATIVES"],
     "ni sécantes, ni parallèles", "+ non coplanaires : ça existe"),
    ("espace-defi",
     ["L'EXERCICE DE L'ESPACE", "AU BAC"],
     "un cube, un repère", "+ quatre questions qui s'enchaînent"),
    ("ps-espace-calculer",
     ["COMPRENDRE LE PRODUIT", "SCALAIRE DANS L'ESPACE"],
     "x x' + y y' + z z'", "+ le résultat est un NOMBRE"),
    ("ps-espace-orthogonalite",
     ["DÉMONTRER UNE", "ORTHOGONALITÉ"],
     "~{u} · ~{v} = 0", "pour un plan, il en faut DEUX"),
    ("ps-espace-norme-distance",
     ["COMPRENDRE LES NORMES", "ET LES DISTANCES"],
     "√(x^{2} + y^{2} + z^{2})", "la racine ne se distribue pas"),
    ("ps-espace-angle",
     ["CALCULER UN ANGLE", "DANS L'ESPACE"],
     "cos θ = 1 / √3", "la diagonale ne fait pas 45°"),
    ("ps-espace-plan-normal",
     ["COMPRENDRE LE VECTEUR", "NORMAL À UN PLAN"],
     "2x − y + 3z − 5 = 0", "+ la normale ~{n} : (2 ; −1 ; 3)"),
    ("ps-espace-defi",
     ["L'EXERCICE TYPE BAC", "AVEC PRODUIT SCALAIRE"],
     "une normale, une équation", "+ puis une distance"),
]

# ⚠️ Arial Black n'a ni indices ni exposants Unicode : on écrit « x^{2} » et « u_{n} »,
# dessinés plus petits et montés (ou abaissés), dans la couleur de la ligne.
#
# ⭐⭐ ET « ~{u} » : LA FLÈCHE DES VECTEURS (Frédéric, 23/11). Ces miniatures parlent de
# vecteurs, et un « u » nu n'est pas un vecteur. Ce n'était pas une remarque de forme :
# la planche de l'orthogonalité annonçait « u · v = 0 », qui se lit comme un produit de
# deux NOMBRES — donc l'un des deux est nul. C'est exactement la confusion que l'épisode
# combat, écrite sur sa propre couverture.
# ⛔ La flèche ne peut pas venir d'une notation : ici on dessine avec PIL, sans LaTeX. Et
# surtout pas du caractère combinant U+20D7 — `ariblk.ttf` ne le compose pas, il
# disparaîtrait SANS TRACE, comme les dollars du LaTeX avalé. Elle est donc TRACÉE :
# barre + pointe, posées sur le sommet RÉEL de l'encre (`textbbox`), pour que la flèche
# de `~{n}` et celle de `~{AB}` tombent à la même hauteur quelle que soit la lettre.
# ⛔ Les accolades portent le groupe ENTIER : « ~{AB} » met UNE flèche sur les deux
# lettres, comme on l'écrit au tableau — pas une flèche par lettre.
# ⛔ Et un POINT n'est pas un vecteur : « M (x ; y ; z) » reste sans flèche.
JETON = re.compile(r"([_^~])\{([^}]*)\}")


def morceaux(txt):
    out, i = [], 0
    for m in JETON.finditer(txt):
        if m.start() > i:
            out.append((txt[i:m.start()], ""))
        out.append((m.group(2), m.group(1)))
        i = m.end()
    if i < len(txt):
        out.append((txt[i:], ""))
    return out


def _ep(t):
    """L'épaisseur de la flèche, et la marge qu'elle prend de chaque côté de la lettre."""
    return max(3, round(t * 0.06))


def largeur(d, txt, t):
    f, fe = police("ariblk.ttf", t), police("ariblk.ttf", int(t * 0.6))
    total = 0
    for s, e in morceaux(txt):
        if e == "~":
            # ⚠️ la flèche déborde de la lettre : sa marge compte dans la largeur, sinon
            # `ajuste` croirait la ligne plus courte qu'elle n'est et la laisserait
            # passer sous Ti-Margo.
            total += d.textlength(s, font=f) + 2 * _ep(t)
        elif e:
            total += d.textlength(s, font=fe) + int(t * 0.04)
        else:
            total += d.textlength(s, font=f)
    return total


def ecrire(d, x, y, txt, t, c):
    f, fe = police("ariblk.ttf", t), police("ariblk.ttf", int(t * 0.6))
    for s, e in morceaux(txt):
        if e == "~":
            ep = _ep(t)
            x += ep
            d.text((x, y), s, font=f, fill=c)
            w = d.textlength(s, font=f)
            if s.strip():
                sommet = d.textbbox((x, y), s, font=f)[1]   # le haut réel de l'encre
                yf = sommet - max(8, round(t * 0.17))
                x0, x1 = x - ep, x + w + ep
                p = max(9, round(t * 0.18))
                d.line([(x0, yf), (x1 - p * 0.5, yf)], fill=c, width=ep)
                d.polygon([(x1, yf),
                           (x1 - p * 0.7, yf - p * 0.45),
                           (x1 - p * 0.7, yf + p * 0.45)], fill=c)
            x += w + ep
        elif e:
            x += int(t * 0.02)
            d.text((x, y + (int(t * 0.5) if e == "_" else -int(t * 0.12))), s, font=fe, fill=c)
            x += d.textlength(s, font=fe) + int(t * 0.02)
        else:
            d.text((x, y), s, font=f, fill=c)
            x += d.textlength(s, font=f)


def ajuste(d, txt, t, lmax):
    while t > 30 and largeur(d, txt, t) > lmax:
        t -= 2
    return t


def acc_paysage(haut, bas, y0):
    """La maths en bleu, la ligne du bas en vert (juste) ou en rouge (le piège), et
    l'échelle des ceintures. ⚠️ `lmax` = 860 : au-delà, le texte passerait sous Ti-Margo,
    qui occupe toute la colonne de droite de la miniature."""
    def f(d):
        lmax = 860
        th = ajuste(d, haut, 92, lmax)
        vert = bas.startswith(("=", "+ "))
        texte = bas[2:] if bas.startswith("+ ") else bas
        tb = ajuste(d, texte, 58, lmax)
        ecrire(d, 56, y0, haut, th, BLEU)
        ecrire(d, 60, y0 + th + 40, texte, tb, VERT if vert else ROUGE)
        echelle(d, 690, 592, CEINTURE, s=0.5)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (1280, 10)))
    faites = 0
    for slug, titre, haut, bas in EP:
        nom = f"eleveai-maths-terminale-{slug}"
        if filtre and filtre not in nom:
            continue
        dossier = SORTIES / DOSSIER / slug
        mp4 = dossier / f"{nom}.mp4"
        # ⛔ ON NE FABRIQUE PAS UNE MINIATURE SANS SA VIDÉO : le nom du PNG doit être
        # celui que le registre déclare, et la durée se lit dans le MP4. Sans lui, on
        # écrirait une couverture pour une vidéo qui n'existe pas.
        if not mp4.exists():
            print(f"⛔ {nom} : MP4 absent, miniature non faite")
            continue
        # ⚠️ Un titre trop long serait rétréci en silence par `titre()` : on le mesure
        # AVANT, comme la série le fait pour chaque bloc de ses écrans.
        for ligne in titre:
            if sonde.textlength(ligne, font=police("ariblk.ttf", 72)) > 880:
                print(f"⚠️ {nom} : titre large — « {ligne} »")
        construire_paysage(nom, {
            "badge": BADGE,
            "duree": f"EN {minutes(mp4)} MIN",
            "titre": titre,
            "accroche": acc_paysage(haut, bas, 352),
            "dossier": f"{DOSSIER}/{slug}",
        })
        faites += 1
    print(f"\n{faites} miniature(s) faite(s) sur {len(EP)}")


if __name__ == "__main__":
    main()
