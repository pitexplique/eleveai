# -*- coding: utf-8 -*-
# manim/poste2/reperes-croissants-tvi.py
#
#   python -X utf8 manim/poste2/reperes-croissants-tvi.py
#
# ⛔⛔ POURQUOI CET OUTIL EXISTE (27/11/2026, après les WAV). Le dry run de E4 a sorti
# `RETARD 05-appliquer « la continuité se démontre » : 38,64 s`. Le repère était posé
# APRÈS les quatre lignes de la copie, alors que la phrase qu'il vise est dite dans la
# PREMIÈRE phrase du clip. Il regardait 38 secondes en arrière.
#
# ⭐⭐ LA RÈGLE QU'IL MESURE : **les repères d'un écran sont CROISSANTS dans le texte de
# la voix.** Un écran se construit dans l'ordre où la voix parle. Un repère qui pointe
# en arrière ne fait pas attendre — `au_pos` ne recule pas, il imprime un RETARD et
# continue — donc le bloc paraît trop tôt, et c'est tout ce qu'on en voit.
#
# ⭐ IL TRAVAILLE SANS RENDU, SUR LA SOURCE. C'est son intérêt : avant les WAV, les
# `au_mot` sont estimés au prorata des caractères et **aucun RETARD ne sort du dry
# run** — le défaut dort. Celui-ci le voit sur le texte, marques ou pas.
#
# ⚠️⚠️ CE QU'IL NE VOIT PAS, et c'est le même angle mort que `verifier-avant-rendu.py` :
# il ne lit que les appels **littéraux** `au_mot("…")` / `au_fin("…")`. E4 et E5
# nourrissent une partie de leurs écrans par des LISTES de couples (texte, mot-clé) :
# ces repères-là lui sont invisibles. ⛔ Le compte de `RETARD` au dry run reste donc le
# contrôle de vérité ; celui-ci est le contrôle qui prévient AVANT le rendu.
# ⚠️ Il ne juge pas non plus la DURÉE des animations entre deux repères : un retard de
# moins d'une seconde est le plus souvent une animation un peu longue, pas un repère
# mal placé. Il signale l'ordre, pas le tempo.

import ast
import json
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
EPISODES = {
    "continuite_reconnaitre": "terminale-continuite-reconnaitre",
    "tvi_appliquer": "terminale-tvi-appliquer",
    "tvi_unicite": "terminale-tvi-unicite",
    "tvi_rediger": "terminale-tvi-rediger",
    "tvi_defi": "terminale-tvi-defi",
}
CUES = {"au_mot", "au_fin"}


def voix(nom):
    d = json.loads((RACINE / "manim" / "voix" / f"{nom}.json").read_text(encoding="utf-8"))
    items = d if isinstance(d, list) else d.get("clips", d)
    if isinstance(items, list):
        return {c["id"]: c["texte"] for c in items}
    return items


def litteral(n):
    return n.value if isinstance(n, ast.Constant) and isinstance(n.value, str) else None


ennuis = 0
inconnus = 0
for script, nom_voix in EPISODES.items():
    textes = voix(nom_voix)
    src = (RACINE / "manim" / "scripts" / "terminale" / f"{script}.py").read_text(encoding="utf-8")
    arbre = ast.parse(src)
    # On parcourt chaque méthode dans l'ordre du source : un `dire("xx")` ouvre un clip,
    # les repères qui suivent appartiennent à ce clip.
    alertes = []
    for fonc in [n for n in ast.walk(arbre) if isinstance(n, ast.FunctionDef)]:
        clip, dernier, dernier_txt = None, -1, None
        for n in ast.walk(fonc):
            if not (isinstance(n, ast.Call) and isinstance(n.func, ast.Attribute)):
                continue
            nom, args = n.func.attr, n.args
            if nom == "dire" and args and litteral(args[0]):
                clip, dernier, dernier_txt = litteral(args[0]), -1, None
                continue
            if nom not in CUES or not args or clip is None:
                continue
            ex = litteral(args[0])
            if ex is None:
                continue
            txt = textes.get(clip, "")
            i = txt.find(ex)
            if i < 0:
                alertes.append(f"   ⛔ l.{n.lineno} {clip} : « {ex} » ABSENT de la voix")
                ennuis += 1
                continue
            fin = i + len(ex) if nom == "au_fin" else i
            if dernier >= 0 and fin < dernier:
                recul = dernier - fin
                alertes.append(
                    f"   ⛔ l.{n.lineno} {clip} : « {ex} » (pos {fin}) RECULE de "
                    f"{recul} caractères — le repère d'avant était « {dernier_txt} » "
                    f"(pos {dernier})")
                ennuis += 1
            dernier, dernier_txt = max(dernier, fin), ex
    n_lit = sum(src.count(f"self.{c}(\"") for c in CUES)
    print(f"{'OK' if not alertes else '⛔'} {script:24s} {n_lit} repère(s) littéral(aux) lu(s)")
    for a in alertes:
        print(a)

print(f"\n{ennuis} repère(s) qui reculent ou qui manquent.")
print("⚠️ Les repères passés par une LISTE (E4, E5) sont invisibles à cet outil : le "
      "compte de RETARD au dry run reste le contrôle de vérité.")
sys.exit(1 if ennuis else 0)
