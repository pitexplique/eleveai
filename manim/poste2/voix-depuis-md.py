# voix-depuis-md.py
# Série 4e + 3e « Périmètre, aire, volume, solides » (2e poste, 15/11/2026).
#
# Les 54 voix sont écrites dans UN fichier relu et validé par Frédéric
# (manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md). Les recopier à la main dans 54
# fichiers JSON, c'est 54 occasions de changer un mot sans le voir. Ce script les
# extrait tels quels : le fichier validé reste la source de vérité.
#
#   python manim/poste2/voix-depuis-md.py            → écrit les JSON manquants
#   python manim/poste2/voix-depuis-md.py --tout     → réécrit tout (⛔ écrase)
#   python manim/poste2/voix-depuis-md.py --liste    → liste sans rien écrire
#
# Sortie : manim/voix/<id>.json et manim/voix/<id>-short.json
# ⛔ Après extraction, ne plus éditer les JSON : corriger le .md et relancer.

import json
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
SOURCE = RACINE / "manim" / "poste2" / "VOIX-4e-3e-perimetre-aire-volume.md"
SORTIE = RACINE / "manim" / "voix"

texte = SOURCE.read_text(encoding="utf-8")

# Un épisode commence par « # X · `id` » ou « ## X · `id` » (le pilote a un seul #).
DEBUT = re.compile(r"^#{1,3} ((?:P|A|V|S|T)\d) · `([a-z0-9-]+)`", re.M)
LIGNE = re.compile(r"^- \*\*([0-9a-z-]+)\*\* : (.+)$", re.M)

bornes = [(m.group(1), m.group(2), m.start()) for m in DEBUT.finditer(texte)]
if not bornes:
    sys.exit("aucun épisode trouvé dans " + str(SOURCE))

ecrits, sautes = [], []
for i, (num, ident, debut) in enumerate(bornes):
    fin = bornes[i + 1][2] if i + 1 < len(bornes) else len(texte)
    bloc = texte[debut:fin]
    # deux sections : « ### Paysage » et « ### Short … »
    parts = re.split(r"^### (Paysage|Short[^\n]*)$", bloc, flags=re.M)
    sections = {}
    for j in range(1, len(parts), 2):
        nom = "short" if parts[j].startswith("Short") else "paysage"
        sections[nom] = parts[j + 1]
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
            print(f"{num:3} {cible.name:42} {len(voix)} répliques")
            continue
        cible.write_text(json.dumps(voix, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        ecrits.append((num, cible.name, len(voix)))

for num, nom, n in ecrits:
    print(f"{num:3} {nom:42} {n} répliques")
print(f"\n{len(ecrits)} fichiers écrits, {len(sautes)} déjà présents (--tout pour les réécrire).")
