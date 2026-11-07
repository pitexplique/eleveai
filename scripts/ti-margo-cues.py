# Shorts dessin animé Ti Margo : rassemble les instants de chaque mot des voix d'une série
# dans prototypes/ti-margo/films/<série>-cues.js, lu par la page du film.
#   python scripts/ti-margo-cues.py <série> <épisode> [<épisode> …]
# La voix de chaque épisode est décrite par le champ "voix" de films/<série>.json
# (voix Julie, débit −6, par marques_dump.ps1).
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
FILMS = RACINE / "prototypes" / "ti-margo" / "films"

serie, *episodes = sys.argv[1:]
config = json.loads((FILMS / f"{serie}.json").read_text(encoding="utf-8"))
SORTIE = FILMS / f"{serie}-cues.js"

deja = {}
if SORTIE.exists():
    m = re.search(r"window\.CUES=(\{.*\});", SORTIE.read_text(encoding="utf-8"), re.S)
    if m:
        deja = json.loads(m.group(1))

with tempfile.TemporaryDirectory() as dossier:
    for ep in episodes:
        voix = RACINE / "manim" / "voix" / (config["voix"].replace("{ep}", ep) + ".json")
        base = str(Path(dossier) / ep)
        subprocess.run(["powershell", "-NoProfile", "-File", str(RACINE / "scripts" / "marques_dump.ps1"),
                        "-Fichier", str(voix), "-Sortie", base, "-Debit", "-6"], check=True, capture_output=True)
        clips = {}
        for ligne in open(base + ".cues.tsv", encoding="utf-8-sig"):
            p = ligne.rstrip("\n").split("\t")
            if len(p) == 3:
                l = clips.setdefault(p[0], [])
                t = round(float(p[1].replace(",", ".")), 3)
                if not l or l[-1][0] != t:
                    l.append([t, p[2]])
        deja[ep] = clips

SORTIE.write_text("window.CUES=" + json.dumps(deja, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
print("écrit", SORTIE, list(deja))
