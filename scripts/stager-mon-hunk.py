# Stage UNIQUEMENT les hunks d'un fichier partage qui portent un slug donne.
#
# ⛔ POURQUOI CE SCRIPT (29/08/2026). `git add lib/fiches/registre.ts` prend le
# fichier tel qu'il est et emporte les lignes non commitees des autres sessions.
# La parade documentee — patch applique a l'index — ne suffit pas non plus si
# l'on applique le patch ENTIER : le 29/08, `git diff -U0` rendait deux hunks, et
# le second etait une entree `maths/4e/prop-echelle` de la session maths. Elle est
# partie dans l'index avant d'etre rattrapee.
#
# Usage : python scripts/stager-mon-hunk.py <fichier> <slug>
import subprocess, sys, tempfile, os

fichier, slug = sys.argv[1], sys.argv[2]
diff = subprocess.run(["git", "diff", "-U0", "--", fichier],
                      capture_output=True, text=True, encoding="utf-8").stdout
lignes = diff.splitlines(keepends=True)
entete = lignes[:4]
hunks, cur = [], None
for l in lignes[4:]:
    if l.startswith("@@"):
        if cur:
            hunks.append(cur)
        cur = [l]
    elif cur is not None:
        cur.append(l)
if cur:
    hunks.append(cur)

miens = [h for h in hunks if any(slug in x for x in h)]
autres = len(hunks) - len(miens)
if not miens:
    sys.exit(f"⛔ aucun hunk ne porte « {slug} »")
print(f"{len(hunks)} hunk(s) — {len(miens)} a moi, {autres} laisse(s) intact(s)")

patch = "".join(entete) + "".join("".join(h) for h in miens)
chemin = os.path.join(tempfile.gettempdir(), "mon-hunk.patch")
with open(chemin, "w", encoding="utf-8", newline="") as f:
    f.write(patch)
subprocess.run(["git", "apply", "--cached", "--unidiff-zero", chemin], check=True)
print("applique a l'index")

# ⛔ ET LE CONTROLE QUI MANQUAIT, PAYE LE 29/08 : L'INDEX PEUT SORTIR AVEC UNE
# CLE EN DOUBLE. `git diff -U0` aligne parfois une insertion en REEMETTANT le
# bloc d'ancrage : le hunk dit alors « ajoute dix lignes » la ou l'arbre n'en
# ajoutait que cinq, et `git apply --cached` ecrit les deux. L'arbre de travail
# reste juste, l'index non — et rien ne le signale, parce que TypeScript ne
# refuse pas une cle repetee dans un objet type `Record<string, …>`.
# On relit donc l'index apres coup, et on refuse de rendre la main s'il double.
import re

contenu = subprocess.run(["git", "show", f":{fichier}"],
                         capture_output=True, text=True, encoding="utf-8").stdout
cles = re.findall(r'^  "([^"]+)": \{', contenu, re.M)
doublons = sorted({c for c in cles if cles.count(c) > 1})
if doublons:
    subprocess.run(["git", "restore", "--staged", fichier], check=True)
    sys.exit(f"⛔ l'index sortait avec {len(doublons)} cle(s) en double : {doublons}\n"
             f"   index remis a HEAD. Reprends l'insertion a un autre point d'ancrage.")
print(f"index verifie : {len(cles)} cles, aucune en double")
