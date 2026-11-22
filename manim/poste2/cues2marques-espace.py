# manim/poste2/cues2marques-espace.py
# Convertisseur de cues de la série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026).
#
# ⛔ `scripts/cues2marques.py` (le script COMMUN, qu'on ne touche pas) jette toute cue dont
# le texte est identique à la précédente :
#
#     if prec.get(cle) == mot: continue
#
# Sa raison est écrite dans sa docstring : les cues « nombre + mot » arrivent DEUX fois
# (« 8 buts », « 8 buts »), et il faut garder la première. ⭐⭐ MESURÉ sur la voix de E1,
# générée au débit −6 : **0 cue identique au MÊME instant** (le doublon WinRT ne se produit
# pas ici) et **20 cues identiques à un instant DIFFÉRENT** — autrement dit 20 marques
# réelles jetées. C'est le profil d'une voix de géométrie dans l'espace : « moins 1, 1, 0 »,
# « 1, 1, 1 », « zéro plus zéro plus 25 ». Un `au_mot` qui vise la deuxième occurrence prend
# alors silencieusement la marque d'avant — le piège n° 4 de la série des entiers.
#
# ⭐ La règle corrigée, ici : on ne jette une cue que si elle répète le texte de la
# précédente **au même instant** (à 5 ms près). Une répétition plus tard dans la phrase est
# un mot de plus, et elle garde sa place.
#
# ⚠️ On ne modifie PAS le script commun : les séries puissances et suites ont fait pareil.
# Les autres séries ont peut-être, elles, de vrais doublons WinRT — à mesurer chez elles.
#
#   python manim/poste2/cues2marques-espace.py <voix.json> <cues.tsv> <sortie_marques.json>
#   python manim/poste2/cues2marques-espace.py --comparer <voix.json> <marques.json>
#       → compare le fichier produit par marques_dump.ps1, le script commun et celui-ci
#
# Contrôles intégrés (⛔ il refuse d'écrire si l'un échoue) :
#   · une marque par cue conservée, aucune perdue en silence ;
#   · les positions strictement croissantes dans chaque clip ;
#   · le texte de la voix porte bien le mot de la cue à la position écrite.

import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ⭐⭐ LA RÈGLE, MESURÉE et non supposée. Sur les 657 cues de E1 :
#   · 30 cues contiennent une ESPACE (« 2 moins », « 4 égale ») et elles arrivent TOUTES
#     par paires jumelles, à 0,14–0,36 s d'écart : c'est la double émission WinRT du cas
#     « nombre + mot », celle que le script commun a raison de jeter. 0 cue groupée sans
#     jumelle, donc la règle ne perd rien.
#   · 5 cues identiques consécutives sont des JETONS SIMPLES (« 0 », « 0 » dans « 0, 0, 5 » ;
#     « 1 », « 1 » dans « moins 1, 1, 0 ») à 0,45–0,61 s d'écart : ce sont de VRAIS mots de
#     plus, et le script commun les jette.
# ⛔ Ma première version croyait pouvoir trancher sur l'ÉCART DE TEMPS (doublon = même
# instant). Faux, et la mesure l'a dit tout de suite : un doublon groupé est émis deux fois
# à 0,16 s d'écart, parce que la deuxième émission marque le MOT et la première le NOMBRE.
# Cette version-là perdait 74 marques au lieu de 20 — une cue mal placée fait échouer en
# cascade toutes les suivantes du clip.
def doublon_groupe(mot):
    """Vrai si cette cue répétée est la seconde émission d'une cue « nombre + mot »."""
    return " " in mot


def lire_cues(tsv):
    cues = []
    for l in open(tsv, encoding="utf-8-sig"):
        l = l.rstrip("\n")
        if not l:
            continue
        cle, t, mot = l.split("\t")
        cues.append((cle, float(t.replace(",", ".")), mot))
    return cues


def convertir(textes, cues, garder_repetitions=True):
    """Renvoie (marques, pertes). `garder_repetitions=False` reproduit le script commun."""
    res, pos, prec = {}, {}, {}
    pertes = []
    for cle, t, mot in cues:
        pt = prec.get(cle)
        if pt and pt[0] == mot:
            if not garder_repetitions:
                continue                            # la règle du script commun
            if doublon_groupe(mot):                 # la seconde émission d'un « nombre + mot »
                continue
        prec[cle] = (mot, t)
        raw = textes[cle]
        p = pos.get(cle, 0)
        i = raw.find(mot, p)
        if i < 0:
            i = raw.find(mot.split()[0], p)
            if i < 0:
                pertes.append((cle, mot, "introuvable dans le texte"))
                continue
        L = res.setdefault(cle, [])
        if L and L[-1][0] == i:
            pertes.append((cle, mot, f"deux cues sur la même position {i}"))
            continue
        L.append([i, round(t, 3)])
        pos[cle] = i + len(mot.split()[0])
    return res, pertes


def controler(textes, marques):
    fautes = []
    for cle, L in marques.items():
        raw = textes[cle]
        for (i1, _), (i2, _) in zip(L, L[1:]):
            if i2 <= i1:
                fautes.append(f"{cle} : positions non croissantes ({i1} puis {i2})")
        for i, t in L:
            if not (0 <= i < len(raw)):
                fautes.append(f"{cle} : position {i} hors du texte")
            if t < 0:
                fautes.append(f"{cle} : instant négatif")
    for cle in textes:
        if cle not in marques:
            fautes.append(f"{cle} : aucune marque")
    return fautes


if sys.argv[1] == "--comparer":
    voix, marq = sys.argv[2], sys.argv[3]
    textes = json.loads(Path(voix).read_text(encoding="utf-8"))
    cues = lire_cues(marq + ".cues.tsv")
    ps1 = json.loads(Path(marq).read_text(encoding="utf-8-sig"))  # ⚠️ marques_dump.ps1 écrit AVEC un BOM
    commun, _ = convertir(textes, cues, garder_repetitions=False)
    corrige, pertes = convertir(textes, cues, garder_repetitions=True)
    print(f"{len(cues)} cues · marques par clip :\n")
    print(f"{'clip':18} {'cues':>5} {'marques_dump.ps1':>17} {'script commun':>14} {'corrigé':>8}")
    for cle in textes:
        n = sum(1 for c in cues if c[0] == cle)
        print(f"{cle:18} {n:5} {len(ps1.get(cle, [])):17} "
              f"{len(commun.get(cle, [])):14} {len(corrige.get(cle, [])):8}")
    tot = (len(cues), sum(len(v) for v in ps1.values()),
           sum(len(v) for v in commun.values()), sum(len(v) for v in corrige.values()))
    print(f"\n{'TOTAL':18} {tot[0]:5} {tot[1]:17} {tot[2]:14} {tot[3]:8}")
    print(f"\nle script commun perd {tot[0] - tot[2]} marques, la version corrigée {tot[0] - tot[3]}")
    for c in ("ps1", "commun", "corrige"):
        m = {"ps1": ps1, "commun": commun, "corrige": corrige}[c]
        f = controler(textes, m)
        print(f"  {c:8} : {'✅ positions croissantes, toutes les clés servies' if not f else '⛔ ' + ' | '.join(f[:3])}")
    for cle, mot, pourquoi in pertes:
        print(f"  ⚠️  {cle} / « {mot} » : {pourquoi}")
    sys.exit(0)

voix, tsv, out = sys.argv[1:4]
textes = json.loads(Path(voix).read_text(encoding="utf-8"))
marques, pertes = convertir(textes, lire_cues(tsv))
fautes = controler(textes, marques)
for cle, mot, pourquoi in pertes:
    print(f"  ⚠️  {cle} / « {mot} » : {pourquoi}")
if fautes:
    for f in fautes:
        print("  ⛔", f)
    sys.exit("⛔ rien écrit : les marques ne passent pas leurs propres contrôles")
Path(out).write_text(json.dumps(marques, ensure_ascii=False, separators=(",", ":")),
                     encoding="utf-8")
print(f"✅ {sum(len(v) for v in marques.values())} marques sur {len(marques)} clips → {out}")
