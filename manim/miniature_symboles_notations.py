# miniature_symboles_notations.py
# LA MINIATURE de « Symboles et notations » (04/10/2026, série « Les bases »).
# ⛔ FICHIER À PART : emprunte `miniature_essai_v2.py` sans y toucher.
# ⭐ Cinq symboles en gros, chacun avec sa lecture dessous : la vidéo promet
# qu'un symbole n'est qu'une phrase en raccourci, la miniature le montre.
# ⛔ Arial Black n'a pas ∀ ∃ ∈ Σ ⇒ : les symboles passent par Cambria Math
# (cambria.ttc, index 1), les lectures restent en Arial Black.
#
# Usage :  python manim/miniature_symboles_notations.py
# Sorties : à côté des vidéos, dans manim/sorties/bases/maths/{paysage,shorts}/fr/symboles-notations/

import shutil
import sys
from pathlib import Path

from PIL import ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, FONTS, NAVY, RACINE, ROUGE, VERT, police
import miniature_essai_v2 as paysage
import miniature_short as short

ORANGE = (217, 119, 20)
VIOLET = (109, 40, 217)

CINQ = [
    ("∀", "pour tout", BLEU),
    ("∃", "il existe", VERT),
    ("∈", "appartient", ORANGE),
    ("⇒", "implique", ROUGE),
    ("Σ", "somme", VIOLET),
]


def acc_paysage(d):
    """Les cinq symboles côte à côte, leur lecture dessous. Bande utile :
    y 356 → 600, x 58 → 920."""
    fs = ImageFont.truetype(str(FONTS / "cambria.ttc"), 150, index=1)
    fl = police("ariblk.ttf", 28)
    for i, (s, lecture, coul) in enumerate(CINQ):
        cx = 120 + i * 175
        w = d.textlength(s, font=fs)
        d.text((cx - w / 2, 330), s, font=fs, fill=coul)
        wl = d.textlength(lecture, font=fl)
        # VU AU RENDU : à 560 la lecture flottait loin de son symbole.
        d.text((cx - wl / 2, 478), lecture, font=fl, fill=NAVY)


def maths(taille):
    return ImageFont.truetype(str(FONTS / "cambria.ttc"), taille, index=1)


def centre(d, y, txt, f, fill):
    d.text((540 - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=fill)


def acc_ligne(d):
    """La ligne qui fait peur, sur deux lignes, en grand."""
    centre(d, 780, "∀ n ∈ ℕ,", maths(130), NAVY)
    centre(d, 960, "Σ k = n(n+1)/2", maths(120), NAVY)
    centre(d, 1180, "?", police("ariblk.ttf", 150), ORANGE)


def acc_reciproque(d):
    """La flèche qui marche, puis la même retournée, barrée."""
    f = maths(100)
    centre(d, 800, "x = 3 ⇒ x² = 9", f, VERT)
    centre(d, 1020, "x² = 9 ⇒ x = 3", f, ROUGE)
    w = d.textlength("x² = 9 ⇒ x = 3", font=f)
    x0, x1 = 540 - w / 2, 540 + w / 2
    d.line([(x0, 1150), (x1, 1035)], fill=ROUGE, width=12)
    d.line([(x0, 1035), (x1, 1150)], fill=ROUGE, width=12)


def acc_lettres(d):
    """∀ et ∃, en très grand."""
    f = maths(380)
    d.text((140, 700), "∀", font=f, fill=BLEU)
    d.text((590, 700), "∃", font=f, fill=VERT)


SHORTS = {
    "ligne": (["CETTE LIGNE", "TE FAIT PEUR ?"], 84, "lis-la en 30 s", acc_ligne),
    "reciproque": (["LE PIÈGE", "DE LA FLÈCHE"], 96, "vrai dans un seul sens", acc_reciproque),
    "lettres": (["DES LETTRES", "À L'ENVERS ?"], 90, "un A et un E retournés", acc_lettres),  # VU AU RENDU : ∀ ∃ en carrés en Arial Black
}


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    paysage.construire("eleveai-maths-bases-symboles-notations", {
        "badge": "LES BASES", "duree": sys.argv[1] if len(sys.argv) > 1 else "EN 7 MIN",
        "titre": ["SYMBOLES ET", "NOTATIONS EN MATHS"],
        "accroche": acc_paysage,
    })
    dst = RACINE / "manim/sorties/bases/maths/shorts/fr/symboles-notations"
    dst.mkdir(parents=True, exist_ok=True)
    for cle, (titre, taille, sous, acc) in SHORTS.items():
        nom = f"eleveai-maths-bases-symboles-short-{cle}"
        short.construire(nom, {
            "badge": "LES BASES", "titre": titre, "taille": taille,
            "sous": sous, "taille_sous": 56, "couleur_sous": ORANGE,
            "accroche": acc, "dossier": "bases/maths/fr",
        })
        shutil.copy(short.SORTIE / "bases/maths/fr" / f"{nom}.png", dst / f"{nom}.png")
        print(dst / f"{nom}.png")


if __name__ == "__main__":
    main()
