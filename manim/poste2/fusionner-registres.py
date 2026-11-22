# Fusionne un registre JSON à clés (ou le manifeste, liste `videos` indexée par `id`) EN PLEIN MERGE,
# par RÉUNION des clés et non en choisissant un côté. Fusion à trois côtés, clé par clé :
#   - clé touchée d'un seul côté            → ce côté gagne
#   - clé ajoutée d'un seul côté            → gardée
#   - clé supprimée d'un côté, intacte      → supprimée
#   - clé touchée des DEUX côtés et différente → CONFLIT RÉEL, affiché, rien n'est écrit
# Le format du fichier est reproduit à l'identique (sinon : refus).
#   python manim/poste2/fusionner-registres.py <chemin>            # rapport seulement
#   python manim/poste2/fusionner-registres.py <chemin> --ecrire   # écrit la fusion
# ⛔ Ne vaut QUE pour un JSON dont `json.dumps` reproduit le texte : `scripts/miniatures-shorts-grille.json`
#    se tient à la main et doit être fusionné textuellement.
import json, subprocess, sys

chemin = sys.argv[1]
ecrire = "--ecrire" in sys.argv[2:]


def etape(n):
    o = subprocess.run(["git", "show", f":{n}:{chemin}"], capture_output=True, encoding="utf-8")
    return o.stdout if o.returncode == 0 else None


def formats():
    for ind in (None, 1, 2, 3, 4):
        for sep in ((",", ":"), (",", ": ")):
            yield dict(indent=ind, separators=sep, ensure_ascii=False)


def trouver(obj, txt):
    for f in formats():
        for fin in ("", "\n"):
            if json.dumps(obj, **f) + fin == txt:
                return f, fin
    raise SystemExit(f"⛔ format introuvable pour {chemin} : fusion textuelle obligatoire")


txt_base, txt_nous, txt_eux = etape(1), etape(2), etape(3)
base, nous, eux = (json.loads(t) if t else {} for t in (txt_base, txt_nous, txt_eux))
fmt, fin = trouver(nous, txt_nous)

manifeste = isinstance(nous, dict) and isinstance(nous.get("videos"), list)
if manifeste:
    enveloppe = {k: v for k, v in nous.items() if k != "videos"}
    autres_eux = {k: v for k, v in eux.items() if k != "videos"}
    d = lambda o: {v["id"]: v for v in o.get("videos", [])}
    b, n, e = d(base), d(nous), d(eux)
else:
    b, n, e = base, nous, eux

conflits, resultat, origine = [], {}, {}
for k in list(n) + [k for k in e if k not in n]:
    vb, vn, ve = b.get(k), n.get(k), e.get(k)
    dans_n, dans_e = k in n, k in e
    if dans_n and dans_e:
        if vn == ve:
            resultat[k], origine[k] = vn, "identique"
        elif vb == vn:
            resultat[k], origine[k] = ve, "main"          # seul main a touché
        elif vb == ve:
            resultat[k], origine[k] = vn, "poste2"        # seul poste2 a touché
        else:
            conflits.append(k)
    elif dans_n:
        if k in b and vb == vn:
            origine[k] = "supprimée par main"             # main l'a retirée, intacte chez nous
        else:
            resultat[k], origine[k] = vn, "ajout poste2"
    else:
        if k in b and vb == ve:
            origine[k] = "supprimée par poste2"
        else:
            resultat[k], origine[k] = ve, "ajout main"

# l'ordre : celui de main (le tronc), nos ajouts à la fin
ordre = [k for k in e if k in resultat] + [k for k in n if k in resultat and k not in e]
resultat = {k: resultat[k] for k in ordre}

import collections
print(f"### {chemin}")
print(f"  base={len(b)}  poste2={len(n)}  main={len(e)}  →  fusion={len(resultat)}")
print("  provenance :", dict(collections.Counter(origine[k] for k in origine)))
for etiq in ("supprimée par main", "supprimée par poste2"):
    perdues = [k for k in origine if origine[k] == etiq]
    if perdues:
        print(f"  {etiq} : {len(perdues)} → {perdues[:10]}")
if conflits:
    print(f"  ⛔ CONFLITS RÉELS ({len(conflits)}) : {conflits}")
    raise SystemExit(1)

if ecrire:
    if manifeste:
        out = dict(autres_eux)
        out.update(enveloppe)   # notre programmation de dates / signature
        for k in autres_eux:
            if autres_eux[k] != enveloppe.get(k) and base.get(k) == enveloppe.get(k):
                out[k] = autres_eux[k]
        out["videos"] = list(resultat.values())
    else:
        out = resultat
    txt = json.dumps(out, **fmt) + fin
    assert json.loads(txt) == out
    open(chemin, "w", encoding="utf-8", newline="").write(txt)
    print("  ✅ écrit")
