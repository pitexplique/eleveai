# volume_marques_6e.py
# Série VOLUME ET SOLIDES de la 6e (15/11/2026, copie de cm2/aire_marques_cm2.py) : marques mot à mot des voix (Julie, débit −6).
#   python manim/scripts/6e/volume_marques_6e.py volume:unite volume:unite-short vision:vues
# ⛔ JAMAIS sans argument.
# Voix manim/voix/6e-<notion>-<slug>.json → manim/scripts/6e/<notion>_<slug avec _>_marques.json
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[2]
SLUGS = []  # ⛔ toujours nommer les épisodes


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


# « perimetre:triangle » : une autre notion du CM1 (voix cm1-perimetre-triangle.json → perimetre_triangle_marques.json).
if not sys.argv[1:]:
    sys.exit("⛔ nommer les épisodes (volume:unite …)")
for arg in sys.argv[1:]:
    notion, _, slug = arg.rpartition(":")
    notion = notion or "volume"
    voix = RACINE / "manim" / "voix" / f"6e-{notion}-{slug}.json"
    with tempfile.TemporaryDirectory() as d:
        base = str(Path(d) / slug)
        subprocess.run(["powershell", "-NoProfile", "-File", str(RACINE / "scripts" / "marques_dump.ps1"), "-Fichier",
                        str(voix), "-Sortie", base, "-Debit", "-6"], check=True, capture_output=True)
        res = convertir(json.loads(voix.read_text(encoding="utf-8")), base + ".cues.tsv")
    sortie = ICI / f"{notion}_{slug.replace('-', '_')}_marques.json"
    sortie.write_text(json.dumps(res, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(slug, len(res), "clips")
