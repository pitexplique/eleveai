# miniature_exp_terminale.py
# LES 6 MINIATURES de la série « FONCTION EXPONENTIELLE », terminale spé (26/11/2026).
# Copie de `miniature_espace_terminale.py` : même charte, mêmes helpers d'exposants, même
# endroit d'écriture (à côté du MP4, chemin que le manifeste déclare).
#
#   python manim/miniature_exp_terminale.py [filtre]
#
# ⚠️ « EN N MIN » est LU dans le MP4 (`minutes()`), jamais écrit à la main. Relancer ce script
# après chaque nouveau rendu HD : les MP4 arrivent un par un.
# ⛔ Pas de MP4, pas de miniature (le nom et la durée en dépendent).
# ⛔⛔ Chaque ligne de maths vient de la VOIX de son épisode (`manim/SCRIPTS-tle-exponentielle.md`,
# passes maths recalculées) : une formule fausse en couverture est pire qu'une formule absente.
# ⛔ Jamais de « ^ » à l'image : dans le code, « e^{x} » est une BALISE, dessinée comme un vrai
# exposant (plus petit, monté) par `ecrire()`. Le chapeau n'est jamais affiché.
# ⭐ La ceinture varie d'un épisode à l'autre (orange, orange, verte, verte, bleue, noire) :
# c'est celle de la scène et du manifeste.

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
DOSSIER = "terminale/maths/analyse"
BADGE = "MATHS · TLE SPÉ"

# slug du dossier et du nom de fichier · titre sur DEUX lignes · ceinture · la maths (bleu) ·
# la ligne du bas : « + … » ou « = … » la met en VERT (ce qui est juste), sinon en ROUGE (le piège).
EP = [
    ("exp-definition",
     ["COMPRENDRE LA FONCTION", "EXPONENTIELLE"], "orange",
     "f' = f  et  f(0) = 1", "+ une seule fonction : e^{x}"),
    ("exp-proprietes",
     ["COMPRENDRE LES PROPRIÉTÉS", "DE L'EXPONENTIELLE"], "orange",
     "e^{2} × e^{3} = e^{5}", "e^{a} + e^{b} : pas de règle !"),
    ("exp-deriver",
     ["COMPRENDRE LA DÉRIVÉE", "DE L'EXPONENTIELLE"], "verte",
     "(e^{u})' = u' × e^{u}", "+ (e^{2x})' = 2e^{2x}"),
    ("exp-equation-inequation",
     ["RÉSOUDRE UNE ÉQUATION", "AVEC L'EXPONENTIELLE"], "verte",
     "e^{2x} = e^{x + 3}", "+ 2x = x + 3, donc x = 3"),
    ("exp-limite",
     ["COMPRENDRE LES LIMITES", "DE L'EXPONENTIELLE"], "bleue",
     "e^{x} ÷ x^{n} → +∞", "+ l'exponentielle gagne toujours"),
    ("exp-defi",
     ["L'EXERCICE TYPE BAC", "SUR L'EXPONENTIELLE"], "noire",
     "C(t) = 10t e^{−t}", "+ maximum 10 ÷ e, en t = 1"),
]

# ⚠️ Arial Black n'a ni indices ni exposants Unicode : on écrit « x^{2} » et « u_{n} »,
# dessinés plus petits et montés (ou abaissés), dans la couleur de la ligne.
#
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


def acc_paysage(haut, bas, y0, ceinture):
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
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (1280, 10)))
    faites = 0
    for slug, titre, ceinture, haut, bas in EP:
        nom = f"eleveai-maths-terminale-{slug}"
        if filtre and filtre not in nom:
            continue
        dossier = SORTIES / DOSSIER / slug
        mp4 = dossier / f"{nom}.mp4"
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
            "accroche": acc_paysage(haut, bas, 352, ceinture),
            "dossier": f"{DOSSIER}/{slug}",
        })
        faites += 1
    print(f"\n{faites} miniature(s) faite(s) sur {len(EP)}")


if __name__ == "__main__":
    main()
