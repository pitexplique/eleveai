# -*- coding: utf-8 -*-
"""AUDIT DES FLÈCHES DE VECTEUR — série « géométrie dans l'espace », terminale.

Pour chaque script d'épisode, liste les textes AFFICHÉS À L'ÉCRAN qui nomment un
vecteur et qui ne passent PAS par `self.vec` / `self.vexpr`.

⭐ Il lit l'AST, pas un grep : un `self.t("u · v = v · u", ...)` est un appel, et on
veut savoir lequel des deux outils le construit. Un grep de glyphe (« y a-t-il un ⃗
dans le fichier ? ») répond « non » même quand tout est correct, parce que la flèche
est DESSINÉE et n'est pas un caractère.

⛔ Ce qu'il ne voit pas, et c'est dit ici pour que personne ne s'y fie : les étiquettes
de FIGURE posées par `espace3d.Repere3D.vecteur(nom=…)`, qui sont comptées à part.
"""
import ast
import pathlib
import re
import sys

RACINE = pathlib.Path(r"C:\Users\acade\Documents\eleveai\eleveai-app")
DOSSIER = RACINE / "manim" / "scripts" / "terminale"

# Un nom de vecteur : une lettre minuscule isolée parmi u, v, w, n, ou deux majuscules
# séparées par une espace (« A G », « A Ω »), ou collées (« AB »).
NOM = re.compile(r"(?<![A-Za-zÀ-ÿ])(?:[uvwn]|[A-ZΩ]\s?[A-ZΩ])(?![A-Za-zÀ-ÿ])")
# Un texte ne « nomme un vecteur » que s'il porte aussi une marque d'opération vectorielle
# ou s'il est réduit au nom seul : sinon « un nombre » ferait un faux positif sur « n ».
SIGNES = ("·", "‖", "⃗")


def nomme_un_vecteur(txt):
    t = txt.strip()
    if not t:
        return False
    if any(s in t for s in SIGNES):
        return True
    # « A G », « u », « A B =» : le texte EST (presque) le nom
    noyau = t.rstrip(" :=,.")
    return bool(NOM.fullmatch(noyau))


def textes(chemin):
    """Les appels `self.t(...)`, `self.vec(...)`, `self.vexpr(...)` avec leur 1er arg."""
    src = chemin.read_text(encoding="utf-8")
    arbre = ast.parse(src)
    out = []
    for n in ast.walk(arbre):
        if not isinstance(n, ast.Call):
            continue
        f = getattr(n.func, "attr", None)
        if f not in ("t", "vec", "vexpr", "choix2", "choix3", "nomme"):
            continue
        for a in (n.args[:3] if f in ("choix2", "choix3") else n.args[:1]):
            if isinstance(a, ast.Constant) and isinstance(a.value, str):
                out.append((f, a.value, n.lineno))
    # Les étiquettes de FIGURE : `r.vecteur(depart, arrivee, "u", …)`.
    # ⚠️ Depuis le 22/11, `Repere3D.vecteur` dessine la flèche de l'étiquette PAR DÉFAUT
    # (`fleche_nom=True`). Une étiquette n'est donc nue que si l'appel passe
    # explicitement `fleche_nom=False`. ⛔ Sans cette lecture-là, l'outil signalait des
    # étiquettes parfaitement correctes — un instrument périmé qui rend un chiffre
    # plausible, exactement ce que la note des entiers met en garde.
    fig = []
    for n in ast.walk(arbre):
        if isinstance(n, ast.Call) and getattr(n.func, "attr", "") == "vecteur":
            nue = any(k.arg == "fleche_nom" and isinstance(k.value, ast.Constant)
                      and k.value.value is False for k in n.keywords)
            if not nue:
                continue
            nom = (n.args[2].value if len(n.args) >= 3
                   and isinstance(n.args[2], ast.Constant) else "<variable>")
            fig.append((nom, n.lineno))
    return out, fig


sys.stdout.reconfigure(encoding="utf-8")
scripts = sorted(list(DOSSIER.glob("espace_*.py")) + list(DOSSIER.glob("ps_espace_*.py")))
print("AUDIT DES FLÈCHES — %d scripts d'épisode trouvés\n" % len(scripts))
total_nus, total_fleches = 0, 0
for sc in scripts:
    appels, fig = textes(sc)
    nus = [(l, v) for f, v, l in appels if f in ("t", "choix2", "choix3")
           and nomme_un_vecteur(v)]
    flech = [v for f, v, l in appels if f in ("vec", "vexpr")]
    nommes = [v for f, v, l in appels if f == "nomme"]
    total_nus += len(nus)
    total_fleches += len(flech) + len(nommes)
    etat = "✅" if not nus else "⛔"
    print("%s %-34s  fléchés : %3d   NUS : %3d   étiquettes de figure : %d"
          % (etat, sc.name, len(flech) + len(nommes), len(nus), len(fig)))
    for l, v in nus[:6]:
        print("      l.%-5d « %s »" % (l, v if len(v) < 58 else v[:55] + "…"))
    if len(nus) > 6:
        print("      … et %d autres" % (len(nus) - 6))
    for v, l in fig:
        print("      [figure] l.%-5d étiquette « %s » (lettre nue au bout d'une flèche)"
              % (l, v))

print("\nTOTAL : %d textes de vecteur fléchés, %d NUS" % (total_fleches, total_nus))
