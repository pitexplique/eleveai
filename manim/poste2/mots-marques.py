# -*- coding: utf-8 -*-
"""Les mots MARQUÉS d'une voix, à leur offset exact : ce que `au_mot()` peut viser.

    python -X utf8 manim/poste2/mots-marques.py <id-de-voix> [clip]

⭐ POURQUOI (série NOMBRES ENTIERS, 21/11/2026)
`au_mot("…")` cherche l'extrait dans le texte de l'écran, prend son OFFSET DE CARACTÈRE et exige
une marque à CET offset exact — sinon il prend silencieusement la marque d'AVANT (le piège n° 4,
payé trois fois). Lire le fichier de marques à la main ne suffit pas : il ne contient que des
couples [offset, instant], sans le mot. Cet outil recolle les deux, et imprime pour chaque clip
la liste des débuts d'extrait possibles, avec leur instant. On y choisit ses `au_mot`.
"""
import json
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
nom = sys.argv[1]
filtre = sys.argv[2] if len(sys.argv) > 2 else None
voix = json.loads((RACINE / "manim" / "voix" / f"{nom}.json").read_text(encoding="utf-8"))
slug = nom.replace("6e-entier-", "").replace("cm1-entier-", "").replace("cm2-entier-", "")
cls = "6e" if nom.startswith("6e") else ("cm2" if nom.startswith("cm2") else "cm1")
marq = json.loads((RACINE / "manim" / "scripts" / "cm1"
                   / f"entier_{cls}_{slug}_marques.json").read_text(encoding="utf-8"))
for cle, txt in voix.items():
    if filtre and filtre not in cle:
        continue
    print(f"== {cle}")
    for off, t in marq.get(cle, []):
        mot = txt[off:off + 28].split("\n")[0]
        print(f"   {t:6.2f}  [{off:3d}] {mot!r}")
