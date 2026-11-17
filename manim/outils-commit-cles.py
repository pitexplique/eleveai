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
    # (17/11, relève L) l'ORDRE de HEAD est gardé (la copie de travail d'une autre session peut l'avoir changé,
    # cf. 7b7a55f1) : nos vidéos déjà dans HEAD sont remplacées sur place, les nouvelles ajoutées à la fin.
    tv = {v["id"]: v for v in travail["videos"]}
    res = [tv[v["id"]] if ours(v["id"]) and v["id"] in tv else v for v in head["videos"]]
    vus = {v["id"] for v in res}
    for v in travail["videos"]:
        if ours(v["id"]) and v["id"] not in vus:
            res.append(v)
    out = dict(travail); out.update({k: head[k] for k in head if k != "videos"}); out["videos"] = res
    nous = [v["id"] for v in res if ours(v["id"])]
else:
    out = {}  # (17/11) l'ordre de HEAD, nos clés remplacées sur place, les nouvelles à la fin
    for k, v in head.items():
        out[k] = travail[k] if ours(k) and k in travail else v
    for k, v in travail.items():
        if ours(k) and k not in out:
            out[k] = v
    nous = [k for k in out if ours(k)]
open(sortie, "w", encoding="utf-8", newline="").write(json.dumps(out, **fmt) + fin)
print(chemin, "nos clés :", nous)
