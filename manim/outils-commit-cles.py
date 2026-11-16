# Fabrique, pour un fichier JSON partagé, la version « HEAD + NOS clés seulement » (les autres modifs de la
# copie de travail sont laissées de côté). Écrit le résultat dans <sortie> ; vérifie que le format est reproduit.
#   python cles.py <chemin> <sortie> <préfixe>[,<préfixe>…]
import json, subprocess, sys

chemin, sortie, prefixes = sys.argv[1], sys.argv[2], tuple(sys.argv[3].split(","))
travail_txt = open(chemin, encoding="utf-8").read()
head_txt = subprocess.run(["git", "show", f"HEAD:{chemin}"], capture_output=True, encoding="utf-8", check=True).stdout
travail, head = json.loads(travail_txt), json.loads(head_txt)


def formats():
    for ind in (None, 1, 2):
        for sep in ((",", ":"), (",", ": ")):
            yield dict(indent=ind, separators=sep, ensure_ascii=False)


def trouver(obj, txt):
    for f in formats():
        s = json.dumps(obj, **f)
        for fin in ("", "\n"):
            if s + fin == txt:
                return f, fin
    raise SystemExit(f"format introuvable pour {chemin}")


fmt, fin = trouver(travail, travail_txt)
ours = lambda k: isinstance(k, str) and k.startswith(prefixes)

if isinstance(travail, dict) and "videos" in travail and isinstance(travail["videos"], list):
    hv = {v["id"]: v for v in head["videos"]}
    res = []
    for v in travail["videos"]:
        if ours(v["id"]):
            res.append(v)
        elif v["id"] in hv:
            res.append(hv[v["id"]])
    vus = {v["id"] for v in res}
    for v in head["videos"]:  # une vidéo de HEAD retirée par une autre session : on la garde
        if v["id"] not in vus:
            res.append(v)
    out = dict(travail); out.update({k: head[k] for k in head if k != "videos"}); out["videos"] = res
    nous = [v["id"] for v in res if ours(v["id"])]
else:
    out = {}
    for k, v in travail.items():
        if ours(k):
            out[k] = v
        elif k in head:
            out[k] = head[k]
    for k in head:
        if k not in out:
            out[k] = head[k]
    nous = [k for k in out if ours(k)]
open(sortie, "w", encoding="utf-8", newline="").write(json.dumps(out, **fmt) + fin)
print(chemin, "nos clés :", nous)
