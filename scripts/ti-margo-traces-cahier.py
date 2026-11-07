# Exporte les tracés du cahier d'écriture pour le film Ti Margo « Ton cahier t'attend ».
# ⛔ Les lettres du film sont les MÊMES que celles du cahier et des vidéos, jamais une police.
#   python scripts/ti-margo-traces-cahier.py → prototypes/ti-margo-traces-cahier.js
import json
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RACINE / "manim"))
from fiche_ecriture_paliers import assembler  # noqa: E402

MOTS = ["a", "g", "r", "5", "3", "8", "l", "m", "ami", "10", "100", "ton"]


def arrondi(g):
    return {
        "traits": [[[round(x, 3), round(y, 3)] for x, y in t] for t in g["traits"]],
        "points": [[round(x, 3), round(y, 3)] for x, y in g["points"]],
        "largeur": round(g["largeur"], 3),
        "haut": round(g["haut"], 3),
        "bas": round(g["bas"], 3),
    }


def prenom():
    """« prénom » : le tracé n'a pas de « é », on pose l'accent sur le « e », dans le sens de l'écriture."""
    g = assembler("prenom")
    avant, jusque = assembler("pr")["largeur"], assembler("pre")["largeur"]
    cx = (avant + jusque) / 2 + 0.05
    g["traits"].append([(cx - 0.12, 1.28), (cx + 0.14, 1.62)])
    return g


sortie = {m: arrondi(assembler(m)) for m in MOTS}
sortie["prenom"] = arrondi(prenom())
cible = RACINE / "prototypes" / "ti-margo-traces-cahier.js"
cible.write_text("window.TRACES_CAHIER=" + json.dumps(sortie, separators=(",", ":")) + ";\n", encoding="utf-8")
print(cible, cible.stat().st_size)
