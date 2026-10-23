# La FICHE YOUTUBE posée À CÔTÉ des vidéos (Frédéric, 23/10/2026 : « pour éviter
# à chaque fois titre, description, tags et chemin, on crée la fiche YouTube dans le
# même répertoire que les vidéos paysage et shorts »).
#
# Pour chaque dossier de manim/sorties qui contient des vidéos du manifeste, écrit
# `fiche-youtube.md` : la paysage puis son short, avec le fichier à téléverser, la
# miniature, le titre, la description complète (accroche, chapitres, fiche, signature)
# et les tags, prêts à copier. La source reste `manim/manifeste-youtube.json` :
# corriger le manifeste, puis relancer.
#
#   python scripts/fiches-youtube.py            → toutes les vidéos du manifeste
#   python scripts/fiches-youtube.py -stats-    → seulement les ids qui contiennent « -stats- »

import json
import sys
from collections import defaultdict
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SORTIES = RACINE / "manim" / "sorties"
manifeste = json.loads((RACINE / "manim" / "manifeste-youtube.json").read_text(encoding="utf-8"))
signature = manifeste.get("signature", "Frédéric Lacoste — La Réunion 🌋")
filtre = sys.argv[1] if len(sys.argv) > 1 else ""


def description(v):
    lignes = [v.get("accroche", "").strip(), ""]
    if v.get("chapitres"):
        lignes += [f"{t} {titre}" for t, titre in v["chapitres"]] + [""]
    if v.get("fiche") and v["fiche"] not in v.get("accroche", ""):
        lignes.append(f"La fiche de cours : {v['fiche']}")
    if signature not in v.get("accroche", "") and v.get("type") != "short":
        lignes += ["", signature]
    # ⛔ YouTube refuse les chevrons.
    return "\n".join(lignes).replace("<", "").replace(">", "").strip()


def bloc(v):
    genre = "SHORT (vertical)" if v.get("type") == "short" else "PAYSAGE"
    fichier = SORTIES / v["fichier"]
    mini = SORTIES / v["miniature"] if v.get("miniature") else None
    out = [f"## {genre} — {v['id']}", ""]
    out.append(f"**Fichier** : `{fichier}`" + ("" if fichier.exists() else "  ⚠️ ABSENT"))
    if mini:
        out.append(f"**Miniature** : `{mini}`" + ("" if mini.exists() else "  ⚠️ ABSENTE"))
    if v.get("url"):
        out.append(f"**Déjà publiée** : {v['url']}")
    out += ["", "**Titre**", "```", v.get("titre", ""), "```", "", "**Description**", "```", description(v), "```"]
    if v.get("type") == "short" and "{{LONGUE}}" in v.get("accroche", ""):
        out.append("⚠️ Remplacer `{{LONGUE}}` par le lien de la paysage, une fois celle-ci publiée (la publier AVANT le short).")
    out += ["", "**Tags**", "```", ", ".join(v.get("tags", [])), "```", ""]
    return "\n".join(out)


par_dossier = defaultdict(list)
for v in manifeste["videos"]:
    if filtre in v["id"] and v.get("fichier"):
        par_dossier[(SORTIES / v["fichier"]).parent].append(v)

n = 0
for dossier, videos in sorted(par_dossier.items()):
    if not dossier.is_dir():
        continue
    videos.sort(key=lambda v: (v.get("type") == "short", v["id"]))
    entete = [f"# Fiche YouTube — {videos[0].get('serie', '')}", "",
              "Générée depuis `manim/manifeste-youtube.json` par `python scripts/fiches-youtube.py` : "
              "corriger le manifeste, puis relancer. Publier la paysage AVANT le short.", "", ""]
    (dossier / "fiche-youtube.md").write_text("\n".join(entete) + "\n".join(bloc(v) for v in videos), encoding="utf-8")
    n += 1
print(f"{n} fiches écrites (fiche-youtube.md dans chaque dossier de vidéos).")
