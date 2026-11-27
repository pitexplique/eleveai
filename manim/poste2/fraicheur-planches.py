# -*- coding: utf-8 -*-
# manim/poste2/fraicheur-planches.py
# UNE PLANCHE PÉRIMÉE MONTRE UN DÉFAUT DÉJÀ CORRIGÉ — ou cache un défaut tout neuf.
#
#   python -X utf8 manim/poste2/fraicheur-planches.py
#
# ⛔⛔ POURQUOI CET OUTIL EXISTE (27/11/2026, au soir)
# J'ai corrigé les glyphes ⩽ / ⩾ dans l'épisode 1, relancé le dry run — propre — et
# commité. Je n'ai JAMAIS re-rendu l'épisode. Sa planche datait d'avant la correction,
# et je l'ai relue en croyant regarder le nouveau. Le carré vide y était toujours, et
# je l'ai lu comme un glyphe. Il a fallu qu'une session sœur le reprenne au pixel.
# Mesure qui a tranché : le MP4 datait de 06:21:27, sa source de 06:22:55 — la source
# était plus récente de 88 secondes.
#
# ⭐ La leçon, et elle vaut au-delà de cette série : **« planche regardée » n'est vrai
#   que de l'artefact qu'on a effectivement reconstruit.** Un dry run propre ne
#   reconstruit rien. Entre la correction et la planche, il y a un rendu, et rien ne
#   rappelle de le faire.
#
# ⭐ Il compare chaque MP4 à TROIS dates, pas une : son script, le socle d'écran, et
#   sa voix. Une correction dans le socle périme les cinq planches d'un coup, et c'est
#   le cas le plus facile à oublier.
# ⚠️ Il ne regarde que les dates. Une planche fraîche peut être mauvaise ; une planche
#   périmée est forcément à refaire. Il dit « à refaire », jamais « c'est bon ».

import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
SOCLE = RACINE / "manim" / "poste2" / "analyse_ecrans.py"
MEDIA = RACINE / "manim" / "scripts" / "terminale" / "media" / "videos"

# script : (scène, nom de sortie -ql, voix)
EPISODES = {
    "continuite_reconnaitre": ("ContinuiteReconnaitre", "e1-ql", "terminale-continuite-reconnaitre"),
    "tvi_appliquer": ("TviAppliquer", "e2-ql", "terminale-tvi-appliquer"),
    "tvi_unicite": ("TviUnicite", "e3-ql", "terminale-tvi-unicite"),
    "tvi_rediger": ("TviRediger", "e4-ql", "terminale-tvi-rediger"),
    "tvi_defi": ("TviDefi", "e5-ql", "terminale-tvi-defi"),
}


def date(p):
    return p.stat().st_mtime if p.exists() else None


perimes = []
print(f"socle : {SOCLE.name}, modifié le "
      f"{__import__('datetime').datetime.fromtimestamp(date(SOCLE)):%d/%m %H:%M:%S}\n")

for script, (scene, sortie, voix) in EPISODES.items():
    mp4 = MEDIA / script / "480p15" / f"{sortie}.mp4"
    src = RACINE / "manim" / "scripts" / "terminale" / f"{script}.py"
    jsn = RACINE / "manim" / "voix" / f"{voix}.json"
    t_mp4 = date(mp4)
    if t_mp4 is None:
        print(f"⛔ {script:24s} aucun rendu -ql")
        perimes.append(script)
        continue
    plus_recents = [(nom, t) for nom, t in
                    (("son script", date(src)), ("le socle", date(SOCLE)), ("sa voix", date(jsn)))
                    if t is not None and t > t_mp4]
    if plus_recents:
        detail = ", ".join(f"{nom} (+{t - t_mp4:.0f} s)" for nom, t in plus_recents)
        print(f"⛔ {script:24s} PÉRIMÉ — plus récent que le rendu : {detail}")
        perimes.append(script)
    else:
        print(f"OK {script:24s} rendu postérieur à son script, au socle et à sa voix")

print(f"\n{len(perimes)} planche(s) à refaire.")
for s in perimes:
    scene, sortie, _ = EPISODES[s]
    print(f"  python -m manim render -ql --disable_caching "
          f"manim/scripts/terminale/{s}.py {scene} -o {sortie} "
          f"--media_dir manim/scripts/terminale/media")
print("⚠️ Cet outil ne regarde que les DATES. Une planche fraîche peut être mauvaise ; "
      "une planche périmée est forcément à refaire.")
sys.exit(1 if perimes else 0)
