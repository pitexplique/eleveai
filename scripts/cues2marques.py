"""Cues WinRT (tsv clé, t, texte) -> marques {clé: [[position, t], ...]}.
Les cues « nombre + mot » arrivent DEUX fois (« 8 buts », « 8 buts ») : on garde la première."""
import json, sys
voix, tsv, out = sys.argv[1:4]
textes = json.load(open(voix, encoding="utf-8"))
res, prec, pos = {}, {}, {}
for l in open(tsv, encoding="utf-8-sig"):
    l = l.rstrip("\n")
    if not l:
        continue
    cle, t, mot = l.split("\t")
    t = float(t.replace(",", "."))
    if prec.get(cle) == mot:
        continue
    prec[cle] = mot
    raw = textes[cle]
    p = pos.get(cle, 0)
    i = raw.find(mot, p)
    if i < 0:
        i = raw.find(mot.split()[0], p)
        if i < 0:
            print("introuvable", cle, mot); continue
    L = res.setdefault(cle, [])
    if not L or L[-1][0] != i:
        L.append([i, round(t, 3)])
    pos[cle] = i + len(mot.split()[0])
for k in textes:
    if k not in res:
        print("sans marques", k)
json.dump(res, open(out, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
print({k: len(v) for k, v in res.items()})
