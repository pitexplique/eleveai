# Rendu EN LOT de toutes les vidéos Manim d'une classe.
# Trouve chaque script manim/scripts/<classe>/<notionId>.py, y lit le nom de la
# scène (class ...(Scene)) et rend au bon nom (-o eleveai-<matiere>-<classe>-<notionId>).
# Pensé pour tourner la nuit : lance, récupère les mp4 au réveil.
#
# Usage :
#   python manim/render_all.py 6e            → rendu FINAL 1080p60 de toute la 6e
#   python manim/render_all.py 6e --draft    → brouillon 480p (rapide, pour vérifier)
#   python manim/render_all.py 6e fraction   → seulement les scripts contenant "fraction"
#
# Matière : "maths" par défaut (--matiere xxx pour changer).

import re
import subprocess
import sys
from pathlib import Path

# La console Windows est en cp1252 : on force l'UTF-8 pour les flèches/emojis.
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

RACINE = Path(__file__).resolve().parents[1]


def scene_name(fichier: Path) -> str | None:
    texte = fichier.read_text(encoding="utf-8")
    m = re.search(r"class\s+(\w+)\s*\(\s*Scene\s*\)", texte)
    return m.group(1) if m else None


def main():
    args = [a for a in sys.argv[1:]]
    draft = "--draft" in args
    args = [a for a in args if a != "--draft"]

    matiere = "maths"
    if "--matiere" in args:
        i = args.index("--matiere")
        matiere = args[i + 1]
        del args[i:i + 2]

    classe = args[0] if args else "6e"
    filtre = args[1] if len(args) > 1 else None

    quality = "-ql" if draft else "-qh"
    dossier = RACINE / "manim" / "scripts" / classe
    media = f"manim/scripts/{classe}/media"

    scripts = sorted(p for p in dossier.glob("*.py") if p.name != "__init__.py")
    if filtre:
        scripts = [p for p in scripts if filtre in p.stem]

    if not scripts:
        print(f"Aucun script dans {dossier}" + (f" contenant « {filtre} »" if filtre else ""))
        return

    print(f"== Rendu {'BROUILLON' if draft else 'FINAL'} de {len(scripts)} vidéo(s) — {classe} ==\n")
    ok, rate = [], []
    for i, script in enumerate(scripts, 1):
        scene = scene_name(script)
        if not scene:
            print(f"[{i}/{len(scripts)}] ⚠️  {script.name} : pas de classe Scene trouvée, ignoré.")
            rate.append(script.name)
            continue
        notion = script.stem  # ex. entier_nombre
        oname = f"eleveai-{matiere}-{classe}-{notion.replace('_', '-')}"
        print(f"[{i}/{len(scripts)}] {script.name} → {scene} → {oname}.mp4")
        cmd = [
            sys.executable, "-m", "manim", "render", quality,
            f"manim/scripts/{classe}/{script.name}", scene,
            "-o", oname, "--media_dir", media,
        ]
        res = subprocess.run(cmd, cwd=RACINE)
        (ok if res.returncode == 0 else rate).append(oname)

    print("\n== Terminé ==")
    print(f"✅ {len(ok)} rendue(s)" + (f" · ❌ {len(rate)} échec(s) : {', '.join(rate)}" if rate else ""))


if __name__ == "__main__":
    main()
