# -*- coding: utf-8 -*-
# manim/poste2/lire-avance-tvi.py
#
#   python -X utf8 manim/poste2/lire-avance-tvi.py            # le classement
#   python -X utf8 manim/poste2/lire-avance-tvi.py --detail    # chaque nombre
#
# ⭐⭐ POURQUOI CET OUTIL. Le dry run des 5 épisodes, une fois les WAV faits, sort
# **163 `AUDIT-AVANCE`**. Lus un par un, ils ne disent rien : ce sont 163 nombres. Lus
# par LIGNE D'ÉCRAN, ils disent qu'une poignée de lignes porte presque tout — parce
# qu'une ligne entière paraît d'un coup, posée à l'instant de son PREMIER mot, et que
# ses derniers nombres sont alors à l'écran avant d'être dits.
#
# ⭐ C'est le diagnostic de la série espace, transposé : « une ligne qui finit par un
# nombre se pose à l'instant de CE nombre » (`espace_ecrans.py`, `au_fin`). L'unité de
# travail n'est pas le nombre, c'est la LIGNE.
#
# ⚠️ Le délai retenu par ligne est le MAXIMUM, pas la moyenne : c'est l'avance du
# nombre le plus en avance, donc ce que l'élève voit de pire.
# ⛔ Il ne lit que les journaux déjà produits ; il ne rend rien. Relancer
# `bash manim/poste2/dry-tvi.sh` d'abord.

import re
import sys
from collections import defaultdict
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
DOSSIER = RACINE / "manim" / "poste2" / "dry-tvi"
LIGNE = re.compile(r"AUDIT-AVANCE (\S+) « (.+?) » \((.*?)\) ([\d.]+) s")

detail = "--detail" in sys.argv
if not DOSSIER.exists():
    sys.exit("⛔ aucun journal : lancer d'abord bash manim/poste2/dry-tvi.sh")

total = 0
for txt in sorted(DOSSIER.glob("*.txt")):
    par_ligne = defaultdict(list)
    for m in LIGNE.finditer(txt.read_text(encoding="utf-8", errors="replace")):
        clip, nb, extrait, d = m.group(1), m.group(2), m.group(3), float(m.group(4))
        par_ligne[(clip, extrait)].append((nb, d))
        total += 1
    if not par_ligne:
        print(f"✅ {txt.stem} : 0 AUDIT-AVANCE")
        continue
    n = sum(len(v) for v in par_ligne.values())
    print(f"\n=== {txt.stem} — {n} AUDIT-AVANCE sur {len(par_ligne)} ligne(s) d'écran")
    for (clip, extrait), nbs in sorted(par_ligne.items(),
                                       key=lambda kv: -max(d for _, d in kv[1])):
        pire = max(d for _, d in nbs)
        print(f"  {pire:6.2f} s  {clip:16s} {len(nbs)} nb  « {extrait} »")
        if detail:
            for nb, d in sorted(nbs, key=lambda x: -x[1]):
                print(f"            · « {nb} » +{d:.2f} s")

print(f"\n{total} AUDIT-AVANCE en tout.")
print("⭐ L'unité de correction est la LIGNE : la poser à la FIN de ce que la voix en "
      "dit (au_fin) retire d'un coup tous les nombres de cette ligne.")
