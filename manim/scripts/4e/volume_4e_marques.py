# volume_4e_marques.py
# Série 4e + 3e « Périmètre, aire, volume, solides » (2e poste, 15/11/2026) : les marques mot à mot
# des voix (Julie, débit −6). Copie de manim/scripts/5e/aire_volume_5e_marques.py (même conversion),
# autres chemins : voix manim/voix/4e-<slug>.json ou 3e-<slug>.json.
#   python manim/scripts/4e/volume_4e_marques.py 4e-volume-pyramide 4e-volume-pyramide-short
# Sortie : manim/scripts/4e/<slug avec _>_marques.json
# ⛔ JAMAIS sans argument (ne fait rien) : toujours nommer les épisodes, préfixe de classe compris.
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[2]
sys.path.insert(0, str(ICI.parent / "5e"))

# ⚠️ aire_volume_5e_marques.py traite sys.argv au niveau du module (sa boucle finale) : on l'importe
# avec un sys.argv VIDE, sinon il essaierait de produire « 5e-<mon slug> » et planterait.
_argv = sys.argv[1:]
sys.argv = sys.argv[:1]
from aire_volume_5e_marques import convertir  # noqa: E402
sys.argv = [sys.argv[0], *_argv]

for slug in sys.argv[1:]:
    voix = RACINE / "manim" / "voix" / f"{slug}.json"
    if not voix.exists():
        print("voix absente", voix)
        continue
    with tempfile.TemporaryDirectory() as d:
        base = str(Path(d) / slug)
        subprocess.run(["powershell", "-NoProfile", "-File", str(RACINE / "scripts" / "marques_dump.ps1"),
                        "-Fichier", str(voix), "-Sortie", base, "-Debit", "-6"], check=True, capture_output=True)
        res = convertir(json.loads(voix.read_text(encoding="utf-8")), base + ".cues.tsv")
    sortie = ICI / f"{slug.replace('-', '_')}_marques.json"
    sortie.write_text(json.dumps(res, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(slug, len(res), "clips")
