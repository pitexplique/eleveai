# -*- coding: utf-8 -*-
"""AUDIT DES FLÈCHES DE VECTEUR — série « géométrie dans l'espace », terminale.

Pour chaque script d'épisode, liste les textes AFFICHÉS À L'ÉCRAN qui nomment un
vecteur et qui ne passent PAS par `self.vec` / `self.vexpr`.

⭐ Il lit l'AST, pas un grep : un `self.t("u · v = v · u", ...)` est un appel, et on
veut savoir lequel des deux outils le construit. Un grep de glyphe (« y a-t-il un ⃗
dans le fichier ? ») répond « non » même quand tout est correct, parce que la flèche
est DESSINÉE et n'est pas un caractère.

⛔⛔ CE QU'IL NE VOIT PAS, et c'est dit ici pour que personne ne s'y fie :
  · il ne lit **que** les appels `self.t`, `self.vec`, `self.vexpr`, `self.choix2`,
    `self.choix3` et `self.nomme` dont le premier argument est une chaîne LITTÉRALE. Un
    texte construit autrement lui échappe ;
  · il ne lit pas le FRANÇAIS. « la diagonale A G » et « le vecteur A G » lui sont
    identiques, et c'est pour ça que `PAS_DES_VECTEURS` existe plus bas : chaque nom
    qui n'est pas un vecteur y est inscrit AVEC SA RAISON. Deux cas seulement se
    décident sans table, parce que la notation tranche : « (A B) » est une droite et
    « [A G] » un segment ;
  · les étiquettes de FIGURE (`espace3d.Repere3D.vecteur(nom=…)`) sont comptées à part.

⚠️ SON HISTOIRE EST SA MEILLEURE MISE EN GARDE. Sa première version (22/11, matin) ne
signalait qu'un nom TOUT SEUL ou un texte portant un « · » : elle voyait 14 noms nus et
en laissait passer **douze** autres — « u + v : », « 2 u », « A G = 2 A Ω »… Un ✅ de
cette version-là aurait fait croire la série réglée. C'est le piège que la note des
entiers appelle « un instrument qui rend un chiffre plausible n'a pas prouvé qu'il
mesurait la bonne chose ».
⭐ Son ÉTALON est pris HORS du périmètre soupçonné : `espace_plan_equation` (E4),
`espace_position_relative` (E5) et `ps_espace_calculer` (E7) sont relus à la main et
justes ; tant qu'ils restent à ✅, la règle élargie ne fabrique pas de faux positifs.
"""
import ast
import pathlib
import re
import sys

RACINE = pathlib.Path(r"C:\Users\acade\Documents\eleveai\eleveai-app")
DOSSIER = RACINE / "manim" / "scripts" / "terminale"

# Un nom de vecteur : une lettre minuscule isolée parmi u, v, w, n, ou deux majuscules
# séparées par une espace (« A G », « A Ω »), ou collées (« AB »).
# ⚠️ L'APOSTROPHE EST UNE FRONTIÈRE, et il a fallu la mesurer : sans elle, le « n » de
# « n'est », « n'ont », « n'existe » sortait en nom de vecteur — quatre faux positifs sur
# le seul épisode 5, qui est pourtant juste.
NOM = re.compile(r"(?<![A-Za-zÀ-ÿ'’])(?:[uvwn]|[A-ZΩ]\s?[A-ZΩ])(?![A-Za-zÀ-ÿ'’])")
SIGNES = ("·", "‖", "⃗")

# ⚠️ Deux majuscules COLLÉES, ce sont aussi les petits mots français écrits en capitales
# pour l'emphase — « c'est LA définition » (épisode 7). Un nom de vecteur collé reste
# possible (« AB »), donc on ne retire pas la forme : on écarte les mots.
MOTS_CAPS = {"LA", "LE", "ET", "ON", "OU", "NE", "DE", "DU", "AU", "SI", "EN", "UN", "IL"}

# ⛔⛔ LA PREMIÈRE VERSION DE CET OUTIL NE VOYAIT QU'UN NOM TOUT SEUL (« A G », « u ») ou
# un texte portant un « · ». Mesuré le 22/11 en relisant à la main les 300 textes des sept
# scripts : elle laissait passer **douze** noms nus de plus que les quatorze qu'elle
# signalait — « u + v : », « k u : », « 2 u », « A G = 2 A Ω », « A C = k × A B »,
# « Le vecteur u a pour coordonnées », « les coordonnées de A B et A C », « vecteurs A B
# et A C »… ⭐ Un instrument qui rend un chiffre plausible n'a pas prouvé qu'il mesurait
# la bonne chose : un ✅ de l'ancienne version aurait fait croire la série réglée.
#
# ⭐⭐ LA RÈGLE EST DONC INVERSÉE : tout nom isolé est SUSPECT, et ce qui n'est pas un
# vecteur doit le DIRE, avec sa raison, dans la table ci-dessous. C'est le même principe
# que le `sans_audit` des épisodes, qui porte toujours sa raison à côté.
#
# ⭐ Deux cas se décident sans table, parce que la NOTATION tranche :
#   · « (A B) » et « [A G] » — la notation française d'une DROITE et d'un SEGMENT. Un
#     vecteur ne s'écrit jamais entre parenthèses ni entre crochets.
# ⛔ Tout le reste est du FRANÇAIS, que cet outil ne lit pas : « la diagonale A G » et
# « le vecteur A G » lui sont identiques. C'est la lecture à la main qui a tranché, et la
# table garde la trace de chaque décision.
PAS_DES_VECTEURS = {
    # ── des SEGMENTS et des DIAGONALES (un segment a une longueur, pas de sens) ──
    "la grande diagonale A G": "la diagonale [A G] est un segment du cube",
    # ── des FACES et des SOLIDES nommés par leurs sommets ──
    "P coupe le cube selon le rectangle B C H E, traversé en son centre":
        "B C H E est un rectangle, pas un vecteur",
    "du haut E F G H — la hauteur 1 aurait dû t'alerter":
        "E F G H est la face du haut",
    # ── des POINTS, et la lettre d'une réponse ──
    "la même norme : B et C sont": "B et C sont des points",
    # ── des choix de question dont une AUTRE ligne porte le mot « vecteurs » ──
}


def _noms_nus(txt):
    """Les noms de vecteur d'un texte, hors notation de droite « (A B) » / segment « [A G] »."""
    out = []
    for m in NOM.finditer(txt):
        a, b = m.start(), m.end()
        g = txt[a - 1] if a else ""
        d = txt[b] if b < len(txt) else ""
        if (g, d) in (("(", ")"), ("[", "]")):
            continue
        if m.group(0) in MOTS_CAPS:
            continue
        out.append(m.group(0))
    return out


def nomme_un_vecteur(txt):
    t = txt.strip()
    if not t:
        return False
    if any(s in t for s in SIGNES):
        return True
    if t in PAS_DES_VECTEURS:
        return False
    return bool(_noms_nus(t))


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
        # ⭐ Une carte de choix FLÉCHÉE se reconnaît à son `noms=` : `choix2`/`choix3`
        # passent alors chaque ligne par `vexpr` (socle, `_ligne_choix`). Sans cette
        # lecture, l'outil signalerait comme nues des cartes parfaitement fléchées —
        # le même piège que les étiquettes de figure plus bas.
        carte = f in ("choix2", "choix3")
        if carte and any(
                k.arg == "noms" and not (isinstance(k.value, ast.Tuple) and not k.value.elts)
                for k in n.keywords):
            f = "vexpr"
        for a in (n.args[:3] if carte else n.args[:1]):
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
