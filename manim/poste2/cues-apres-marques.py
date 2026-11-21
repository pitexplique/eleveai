"""Ce que `marquesEntiers()` laisse comme marques dans un `<serie>-cues.js`, clip par clip.

    python -X utf8 manim/poste2/cues-apres-marques.py prototypes/ti-margo/films/<serie>-cues.js

⭐ POURQUOI CET OUTIL EXISTE (piège n° 16 de la série NOMBRES ENTIERS, payé le 21/11/2026)
WinRT pose UNE marque par MOT DIT : « 7 305 », dit en cinq mots, donne CINQ marques « 7 305 ».
`marquesEntiers()` (dans `prototypes/ti-margo/films/<serie>.js`) les ramène à UNE seule, dont le
texte perd ses espaces : la marque s'appelle « 7305 ». Et quand un mot est collé au nombre
(« 35 billes »), elle le SÉPARE en deux marques.

Conséquence : un `mot('00-accroche', '35 billes')` est introuvable, la page du film ne démarre
jamais, et `scripts/ti-margo-short.mjs` meurt sur un **TimeoutError de 120 s** qui ne dit pas
pourquoi. La vraie cause est en PREMIÈRE ligne de sa sortie : `ERREUR PAGE … mot introuvable`.

Donc : avant d'écrire un film, on lit ici la liste EXACTE des marques telles que le film les verra,
et on choisit ses `mot(...)` et ses `dit(...)` dessus. Le compte des marques d'un clip donne aussi
directement combien de jetons une suite de `dit()` doit consommer.
⚠️ `norme()` de `voixDe` efface tout ce qui n'est pas alphanumérique : écrire « 7 305 » dans le film
   retrouve bien la marque « 7305 ». C'est l'OFFSET et le DÉCOUPAGE qui changent, pas l'écriture.
"""
import json
import re
import sys
from pathlib import Path

ESP = "[\\s  ]"  # espace ordinaire, fine insécable, insécable


def apres_marques(liste):
    """La même transformation que `marquesEntiers()` de films/<serie>.js."""
    res, i = [], 0
    while i < len(liste):
        s = liste[i][1].strip()
        j = i
        while j + 1 < len(liste) and liste[j + 1][1].strip() == s:
            j += 1
        m = re.match(r"^(\d[\d\s  ]*)" + ESP + r"([a-zà-ÿ'’]+)$", s, re.I)
        if m and j > i:  # « 35 billes » répété : le nombre au 1er instant, le mot au dernier
            res.append([liste[i][0], re.sub(ESP + "+", "", m.group(1))])
            res.append([liste[j][0], m.group(2)])
        else:
            nombre = re.fullmatch("[\\d\\s  ]+", s)
            res.append([liste[i][0], re.sub(ESP + "+", "", s) if nombre else s])
        i = j + 1
    return res


def main(chemin):
    src = Path(chemin).read_text(encoding="utf-8")
    cues = json.loads(src[src.index("=") + 1:].rstrip().rstrip(";"))
    for ep, clips in cues.items():
        for cle, liste in clips.items():
            res = apres_marques(liste)
            print(f"-- {ep} / {cle}  ({len(res)} marques)")
            print("   " + " | ".join(f"{t}:{w}" for t, w in res))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    main(sys.argv[1])
