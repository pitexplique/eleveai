# triangle_marques.py
# Série TRIANGLES 6e : les marques mot à mot des voix paysage (Julie, débit −6).
#   python manim/scripts/6e/triangle_marques.py nommer sommet-cote ...   (sans argument : les 9)
# Sortie : manim/scripts/6e/triangle_<slug avec _>_marques.json
# Même format que scripts/cues2marques.py, qui perd les mots répétés (« 5 centimètres,
# 5 centimètres, 5 centimètres ») : ici, seules les cues répétées « nombre + mot » sont retirées.
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[2]
SLUGS = ["nommer", "sommet-cote", "type-cote", "type-angle", "defi", "somme-angle", "angle-manquant",
         "possible-ou-non", "propriete-defi"]


def convertir(textes, tsv):
    """« 180 degrés » arrive 3 fois de suite (cent, quatre-vingt, degrés), « 40 degrés » 2 fois,
    pour UNE occurrence dite. Une suite de cues identiques compte donc pour autant d'occurrences
    qu'il y en a, collées, dans le texte (« 5 centimètres, 5 centimètres, 5 centimètres » : 3)."""
    cues = {}
    for l in open(tsv, encoding="utf-8-sig"):
        l = l.rstrip("\n")
        if l:
            cle, t, mot = l.split("\t")
            cues.setdefault(cle, []).append((float(t.replace(",", ".")), mot.strip()))
    res = {}
    for cle, raw in textes.items():
        L, p, k = [], 0, 0
        liste = cues.get(cle, [])
        if not liste:
            print("sans marques", cle)
        while k < len(liste):
            mot = liste[k][1]
            n = 1
            premier = mot.split()[0]
            if premier[0].isdigit():  # « 180 », « 180 », « 180 moins » : une seule occurrence dite
                while k + n < len(liste) and liste[k + n][1].split()[0] == premier:
                    n += 1
                motif = re.compile(rf"(?<![0-9]){premier}(?![0-9])")
                m_ = motif.search(raw, p)
                # « partagent 14. 14 divisé », « 6 et 6 » : le même nombre est VRAIMENT dit deux fois
                # de suite. La dernière cue du groupe appartient à la seconde occurrence.
                m2 = motif.search(raw, m_.end()) if m_ else None
                if n >= 2 and m2 and re.fullmatch(r"\W*(et)?\W*", raw[m_.end():m2.start()]):
                    n -= 1
                mot = max((x[1] for x in liste[k:k + n]), key=len)
                i = m_.start() if m_ else -1
            else:
                while k + n < len(liste) and liste[k + n][1] == mot and " " in mot:
                    n += 1
                i = raw.find(mot, p)
            if i < 0:
                i = raw.find(premier, p)
            if i < 0:
                print("introuvable", cle, mot)
                k += n
                continue
            occ, q = [i], i + len(mot)
            while " " in mot:
                j = q
                while j < len(raw) and not raw[j].isalnum():
                    j += 1
                if raw.startswith(mot, j):
                    occ.append(j)
                    q = j + len(mot)
                else:
                    break
            occ = occ[:n]
            for u, pos_ in enumerate(occ):
                tm = liste[k + u * n // len(occ)][0]
                if not L or L[-1][0] != pos_:
                    L.append([pos_, round(tm, 3)])
            p = occ[-1] + len(mot.split()[0])
            k += n
        res[cle] = L
    return res


for slug in sys.argv[1:] or SLUGS:
    voix = RACINE / "manim" / "voix" / f"6e-triangle-{slug}.json"
    with tempfile.TemporaryDirectory() as d:
        base = str(Path(d) / slug)
        subprocess.run(["powershell", "-NoProfile", "-File", str(RACINE / "scripts" / "marques_dump.ps1"), "-Fichier",
                        str(voix), "-Sortie", base, "-Debit", "-6"], check=True, capture_output=True)
        res = convertir(json.loads(voix.read_text(encoding="utf-8")), base + ".cues.tsv")
    sortie = ICI / f"triangle_{slug.replace('-', '_')}_marques.json"
    sortie.write_text(json.dumps(res, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(slug, len(res), "clips")
