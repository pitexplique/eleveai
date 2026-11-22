# entier_marques.py
# Série NOMBRES ENTIERS, du CM1 à la 6e (21/11/2026) : les marques mot à mot des voix PAYSAGE
# (Julie, débit −6). Copie de manim/scripts/cm2/perimetre_marques.py (même conversion), adaptée pour
# prendre la CLASSE en argument, parce que la série couvre deux classes et deux notions.
# ⛔ COPIE, pas un import : le poste 1 reprend la série Masses ce week-end, et un commun partagé ferait
#    bouger nos rendus sous nos pieds (voir manim/REGLES.md, « le SOURCE n'est pas le RÉSULTAT »).
#
#   python manim/scripts/cm1/entier_marques.py cm1:lire cm1:comparer cm1:decomposer #          cm1:arrondir cm1:multiple cm1:defi 6e:rang 6e:comparer 6e:encadrer 6e:decomposer 6e:defi
#
# ⛔ Sans argument : ne fait rien (des marques peuvent avoir été retouchées à la main).
# Voix lue : manim/voix/<classe>-entier-<slug>.json
# Sortie   : manim/scripts/cm1/entier_<classe>_<slug avec _>_marques.json
# Les shorts n'en ont pas besoin : Ti Margo en dessin animé utilise ses propres cues (<serie>-cues.js).
#
# ⚠️ Cette série est pleine de nombres à espace (12 030, 70 000 957, 6 999 999…) : c'est LE piège du lot.
#    `convertir()` regroupe les cues d'un même nombre ; relire les « sans marques » et « introuvable ».
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[2]
SLUGS = []


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
                # ⚠️ 21/11 — « CM2 » : WinRT pose DEUX frontières de mot sur un sigle lettres+chiffre
                # (« CM » puis « 2 »), les deux rapportées « CM2 ». La première marque est juste ; la
                # seconde était cherchée APRÈS elle et sortait « introuvable 07-cm2 CM2 » sur les six
                # épisodes du lot A — une fausse alerte, la marque étant bien posée à 0,336 s.
                # On regroupe donc aussi les cues identiques d'un sigle (lettres ET chiffres, sans espace).
                # ⛔ Ne touche PAS aux vraies répétitions : « 1 gramme. 1 gramme ? » passe par la branche
                # des nombres ci-dessus, et un mot répété sans chiffre (« gramme ») ne mélange pas les deux.
                sigle = " " not in mot and any(c.isdigit() for c in mot) and any(c.isalpha() for c in mot)
                while k + n < len(liste) and liste[k + n][1] == mot and (" " in mot or sigle):
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


# Corrections à la main (relancer le script les REPOSE, elles ne se perdent pas) :
# clé = (slug, clé d'écran) → (instant à partir duquel on repose, [(extrait, instant WAV), …]).
# Vide pour l'instant : à remplir si une voix de la série a une suite de cues mal regroupée.
CORRIGER = {}


def corriger(slug, res, textes):
    for (sl, cle), (t0, mots) in CORRIGER.items():
        if sl != slug:
            continue
        raw = textes[cle]
        L = [x for x in res[cle] if x[1] < t0]
        p = 0  # ⚠️ la copie du périmètre CM2 partait d'un repère en dur (« n'ajoute pas ») : inutilisable ici
        for extrait, tm in mots:
            i = raw.find(extrait, p)
            assert i >= 0, (cle, extrait)
            L.append([i, tm])
            p = i + len(extrait.split()[0])
        res[cle] = L


if not sys.argv[1:]:
    sys.exit("donner les épisodes : cm1:lire cm1:comparer … 6e:rang 6e:defi")
for arg in sys.argv[1:]:
    classe, _, slug = arg.rpartition(":")
    if not classe:
        sys.exit(f"donner la classe : cm1:{slug} ou 6e:{slug}")
    voix = RACINE / "manim" / "voix" / f"{classe}-entier-{slug}.json"
    if not voix.exists():
        sys.exit(f"voix absente : {voix}")
    with tempfile.TemporaryDirectory() as d:
        base = str(Path(d) / slug)
        subprocess.run(["powershell", "-NoProfile", "-File", str(RACINE / "scripts" / "marques_dump.ps1"), "-Fichier",
                        str(voix), "-Sortie", base, "-Debit", "-6"], check=True, capture_output=True)
        textes = json.loads(voix.read_text(encoding="utf-8"))
        res = convertir(textes, base + ".cues.tsv")
        corriger(slug, res, textes)
    sortie = ICI / f"entier_{classe}_{slug.replace('-', '_')}_marques.json"
    sortie.write_text(json.dumps(res, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{classe}:{slug}", len(res), "clips")
