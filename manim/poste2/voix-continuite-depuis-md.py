# -*- coding: utf-8 -*-
# manim/poste2/voix-continuite-depuis-md.py
# Série « CONTINUITÉ ET TVI », terminale spé (27/11/2026).
#
# Les voix des 5 épisodes sont écrites dans UN fichier : `VOIX-continuite-tvi.md`.
# Les recopier à la main dans 5 JSON, c'est 5 occasions de changer un mot sans le voir.
# ⛔ Après extraction, ne plus éditer les JSON : on corrige le .md et on relance.
#
#   python -X utf8 manim/poste2/voix-continuite-depuis-md.py          → écrit ce qui manque
#   python -X utf8 manim/poste2/voix-continuite-depuis-md.py --tout   → réécrit tout
#   python -X utf8 manim/poste2/voix-continuite-depuis-md.py --liste  → n'écrit rien
#
# ⭐ Recopié de `voix-espace-depuis-md.py`, pas importé : la convention terminale
# (« recopiés, rien importé ») vaut d'un chapitre à l'autre, et cette série en est un
# autre. Deux différences avec l'original, toutes deux par SOUSTRACTION :
#   · aucun short à extraire — les 5 shorts de cette notion existent déjà et ne sont pas
#     produits ici, donc pas de découpe « ### Short » ;
#   · un contrôle de plus : les 15 clips du gabarit doivent être là, tous, et dans
#     l'ordre. ⛔ Un clip manquant ne se voit nulle part ailleurs : la scène Manim
#     l'appellerait, `dire()` rendrait 0,0 sans rien dire, et l'écran passerait en
#     silence. C'est exactement la famille du repli muet.

import json
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
SOURCE = RACINE / "manim" / "poste2" / "VOIX-continuite-tvi.md"
SORTIE = RACINE / "manim" / "voix"

CLIPS = ["00-garde", "01-situation", "02-idee", "03-theoreme", "04-question",
         "04b-reponse", "05-appliquer", "06-piege", "07-question", "07b-reponse",
         "08-rediger", "09-defi", "09b-correction", "10-finale", "11-abonne"]

DEBUT = re.compile(r"^# (E\d+) · `([a-z0-9-]+)`", re.M)
LIGNE = re.compile(r"^- \*\*([0-9a-z-]+)\*\* : (.+)$", re.M)

texte = SOURCE.read_text(encoding="utf-8")
bornes = [(m.group(1), m.group(2), m.start()) for m in DEBUT.finditer(texte)]
if not bornes:
    sys.exit("⛔ aucun épisode trouvé dans " + str(SOURCE))

ecrits, sautes, defauts = [], [], 0
for i, (num, ident, debut) in enumerate(bornes):
    fin = bornes[i + 1][2] if i + 1 < len(bornes) else len(texte)
    voix = {cle: val.strip() for cle, val in LIGNE.findall(texte[debut:fin])}

    manquants = [c for c in CLIPS if c not in voix]
    enplus = [c for c in voix if c not in CLIPS]
    if manquants:
        print(f"⛔ {num} {ident} : clip(s) manquant(s) — {', '.join(manquants)}")
        defauts += 1
    if enplus:
        print(f"⛔ {num} {ident} : clip(s) hors gabarit — {', '.join(enplus)}")
        defauts += 1
    if list(voix) != CLIPS and not manquants and not enplus:
        print(f"⛔ {num} {ident} : les 15 clips ne sont pas dans l'ordre du gabarit")
        defauts += 1
    if manquants or enplus:
        continue

    cible = SORTIE / f"{ident}.json"
    if "--liste" in sys.argv:
        print(f"   {num} {ident} : {len(voix)} clips, "
              f"{sum(len(v) for v in voix.values())} caractères")
        continue
    if cible.exists() and "--tout" not in sys.argv:
        sautes.append(cible.name)
        continue
    cible.write_text(json.dumps(voix, ensure_ascii=False, indent=2) + "\n",
                     encoding="utf-8")
    ecrits.append(cible.name)

if ecrits:
    print(f"✅ {len(ecrits)} écrit(s) : {', '.join(ecrits)}")
if sautes:
    print(f"⏭️  {len(sautes)} déjà là (--tout pour réécrire) : {', '.join(sautes)}")
print(f"{len(bornes)} épisode(s) lus, {defauts} défaut(s) de gabarit.")
sys.exit(1 if defauts else 0)
