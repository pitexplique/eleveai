# manim/poste2/voix-exp-depuis-md.py
# Série « FONCTION EXPONENTIELLE », terminale spé (26/11/2026), 6 paysages.
# Copie de voix-espace-depuis-md.py : seule la SOURCE change.
# Source de vérité : manim/SCRIPTS-tle-exponentielle.md (validé par Frédéric le 26/11).
# ⛔ Après extraction, ne plus éditer les JSON : on corrige le .md et on relance.
#
#   python -X utf8 manim/poste2/voix-exp-depuis-md.py          → écrit les JSON manquants
#   python -X utf8 manim/poste2/voix-exp-depuis-md.py --tout   → réécrit tout (⛔ écrase)
#   python -X utf8 manim/poste2/voix-exp-depuis-md.py --liste  → liste sans rien écrire

import json
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
SOURCE = RACINE / "manim" / "SCRIPTS-tle-exponentielle.md"
SORTIE = RACINE / "manim" / "voix"

texte = SOURCE.read_text(encoding="utf-8")

DEBUT = re.compile(r"^# (E\d+) · `([a-z0-9-]+)`", re.M)
LIGNE = re.compile(r"^- \*\*([0-9a-z-]+)\*\* : (.+)$", re.M)

bornes = [(m.group(1), m.group(2), m.start()) for m in DEBUT.finditer(texte)]
if not bornes:
    sys.exit("aucun épisode trouvé dans " + str(SOURCE))

ecrits, sautes = [], []
for i, (num, ident, debut) in enumerate(bornes):
    fin = bornes[i + 1][2] if i + 1 < len(bornes) else len(texte)
    bloc = texte[debut:fin]
    parts = re.split(r"^### (Short[^\n]*)$", bloc, flags=re.M)
    sections = {"paysage": parts[0]}
    for j in range(1, len(parts), 2):
        sections["short"] = parts[j + 1]
    for nom, corps in sections.items():
        cible = SORTIE / (f"{ident}.json" if nom == "paysage" else f"{ident}-short.json")
        voix = {cle: val.strip() for cle, val in LIGNE.findall(corps)}
        if not voix:
            print(f"⚠️  {num} {nom} : aucune réplique trouvée")
            continue
        if cible.exists() and "--tout" not in sys.argv:
            sautes.append(cible.name)
            continue
        if "--liste" in sys.argv:
            print(f"{num:3} {cible.name:44} {len(voix)} répliques")
            continue
        cible.write_text(json.dumps(voix, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        ecrits.append((num, cible.name, len(voix)))

for num, nom, n in ecrits:
    print(f"{num:3} {nom:44} {n} répliques")
if "--liste" not in sys.argv:
    print(f"\n{len(ecrits)} fichiers écrits, {len(sautes)} déjà présents (--tout pour les réécrire).")
