"""Le contrôle qui tourne AVANT le dry run : la synchro et « voix = écrit », sur le SOURCE.

    python -X utf8 manim/poste2/verifier-avant-rendu.py <script.py> <NomDeLaScene>

Ce qu'il vérifie, et pourquoi chacun a déjà coûté un aller-retour (série NOMBRES ENTIERS, 21/11/2026) :

1. Chaque `au_mot("…")` existe bien dans la voix de SON écran.
2. ⭐⭐ Il y a une marque **à l'offset EXACT** de l'extrait. Sinon `au_mot` prend silencieusement la
   marque d'AVANT et tout l'écran glisse — c'est le piège n° 4 du lot A, payé trois fois (A2, A3, A5).
   Aucun autre instrument ne le voit : le dry run est propre, et le défaut est à l'image.
3. Deux `au_mot` consécutifs séparés de moins de 0,6 s → RETARD probable (piège n° 5).
4. ⭐⭐ Chaque **ligne de question**, chaque **ligne d'explication** et chaque **libellé de choix**
   passés à `question_gauche` est dans la voix **MOT POUR MOT** — la règle de REGLES.md « chaque mot
   dit est écrit à l'écran ». C'est le piège n° 13bis : sur A6, trois questions paraphrasaient la
   voix, et ni l'audit de synchro, ni BORDS, ni la planche ne pouvaient le voir. La ligne est jolie
   et fausse.
   Il lit les listes par AST, donc il comprend `"Dans " + nb(7306) + ","`.

⛔ CE QU'IL NE DIT PAS : il lit le SOURCE, pas le RÉSULTAT. Il ne sait rien de ce qui est réellement
   affiché — chevauchements, étiquettes qui se touchent, figure sortie de son cadre, emoji qui ne se
   rend pas. **La planche reste obligatoire, écran par écran, avant ET après le HD.**
⛔ IL NE LIT PAS NON PLUS LES MATHS de la voix. Une phrase de correction peut être parfaitement
   synchronisée, écrite mot pour mot… et fausse (« 6 032 a 3 centaines », B2, 21/11). La passe maths
   sur la voix est une relecture humaine, avant tout rendu.

⚠️ Il attend une scène dont la classe expose `_textes()` et `_marques()` (toutes les séries à voix
   marquée). Pour un script sans marques, l'ancien `manim/poste2/verif-au-mot.py` (qui ne vérifie
   que le point 1, et prend le NOM DE LA VOIX en 2ᵉ argument) reste utilisable.

Code de retour 1 s'il y a au moins un problème : utilisable dans un enchaînement.
"""
import ast
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
FIN = " "  # l'espace fine insécable des nombres à espace (nb() dans les communs)


def charger(chemin, classe):
    """Importe le script d'épisode et rend sa classe de scène (sans rien rendre)."""
    import importlib.util
    ici = Path(chemin).resolve().parent
    for p in (ici, RACINE / "manim" / "scripts" / "cm1", RACINE / "manim"):
        if str(p) not in sys.path:
            sys.path.insert(0, str(p))
    spec = importlib.util.spec_from_file_location(Path(chemin).stem, chemin)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = mod
    spec.loader.exec_module(mod)
    return getattr(mod, classe)


def texte_de(n):
    """La chaîne réellement écrite à l'écran, y compris « "Dans " + nb(7306) + "," »."""
    if isinstance(n, ast.Constant) and isinstance(n.value, str):
        return n.value
    if isinstance(n, ast.BinOp) and isinstance(n.op, ast.Add):
        g, d = texte_de(n.left), texte_de(n.right)
        return None if g is None or d is None else g + d
    if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "nb" and n.args:
        v = n.args[0]
        if isinstance(v, ast.Constant):
            return f"{v.value:,}".replace(",", FIN)
    return None


def synchro(src, textes, marques):
    """Points 1 à 3 : les `au_mot` et leurs marques, dans l'ordre du fichier."""
    jetons = []
    for i, l in enumerate(src.splitlines(), 1):
        if l.lstrip().startswith("#"):
            continue
        for m in re.finditer(r"self\.(?:ecran|dire)\(\s*[\"']([^\"']+)[\"']", l):
            jetons.append((i, "cle", m.group(1)))
        for m in re.finditer(r"self\.question_gauche\(\s*[\"']([^\"']+)[\"']", l):
            jetons.append((i, "cle", m.group(1)))
        for m in re.finditer(r"self\.au_mot\(\s*[\"'](.+?)[\"']\s*(?:,\s*(\d+)\s*)?\)", l):
            jetons.append((i, "mot", (m.group(1), int(m.group(2) or 1))))

    cle, pb, prec = None, 0, None
    for ligne, typ, val in jetons:
        if typ == "cle":
            cle, prec = val, None
            if cle not in textes:
                print(f"[X] l.{ligne} cle « {cle} » absente de la voix")
                pb += 1
            continue
        extrait, n = val
        if cle is None:
            print(f"[X] l.{ligne} au_mot sans ecran : {extrait}")
            pb += 1
            continue
        txt = textes[cle]
        i = -1
        for _ in range(n):
            i = txt.find(extrait, i + 1)
            if i < 0:
                break
        if i < 0:
            print(f"[X] l.{ligne} [{cle}] « {extrait} » (n={n}) ABSENT de la voix")
            pb += 1
            continue
        M = marques.get(cle) or []
        avant = max([t for p, t in M if p <= i] or [0.0])
        if not [t for p, t in M if p == i]:
            suivante = min([p for p, _ in M if p > i] or [len(txt)])
            print(f"[!] l.{ligne} [{cle}] « {extrait} » : PAS de marque a l'offset {i} "
                  f"(on prendra celle d'avant, t = {avant:.2f} s ; marque suivante a l'offset {suivante})")
            pb += 1
        if prec is not None and avant - prec[1] < 0.6:
            print(f"[!] l.{ligne} [{cle}] « {extrait} » a {avant:.2f} s suit « {prec[0]} » "
                  f"({prec[1]:.2f} s) de {avant - prec[1]:.2f} s < 0,6 s -> RETARD probable")
            pb += 1
        prec = (extrait, avant)
    return pb


def voix_egale_ecrit(src, textes):
    """Point 4 : questions, explications et choix, mot pour mot dans la voix."""
    pb = 0
    print("-- lignes de question, explications et choix (voix = ecrit) --")
    for n in ast.walk(ast.parse(src)):
        if not (isinstance(n, ast.Call) and getattr(n.func, "attr", "") == "question_gauche"):
            continue
        cq, cr = n.args[0].value, n.args[1].value
        vq, vr = textes[cq].replace(FIN, " "), textes[cr].replace(FIN, " ")
        for quoi, idx, voix, nomv in (("question", 2, vq, cq), ("explication", 5, vr, cr)):
            for el in n.args[idx].elts:
                s = texte_de(el)
                if s is None:
                    print(f"[?] [{nomv}] {quoi} : ligne non lisible par l'outil -> a relire a la main")
                    pb += 1
                    continue
                net = s.replace(FIN, " ").strip().rstrip(" :.,?").strip()
                if net and net not in voix:
                    print(f"[X] [{nomv}] {quoi} << {s} >> n'est PAS dans la voix mot pour mot")
                    pb += 1
        for el in n.args[3].elts:  # self.choix("…") : le libellé est dit par la voix de la question
            s = texte_de(el.args[0]) if isinstance(el, ast.Call) and el.args else None
            if s is None:
                print(f"[?] [{cq}] choix non lisible par l'outil -> a relire a la main")
                pb += 1
            elif s.replace(FIN, " ").strip().rstrip(" .") not in vq:
                print(f"[X] [{cq}] choix << {s} >> n'est PAS dit par la voix")
                pb += 1
    return pb


def main(chemin, classe):
    C = charger(chemin, classe)
    o = C.__new__(C)
    textes, marques = C._textes(o), C._marques(o)
    src = Path(chemin).read_text(encoding="utf-8")
    pb = synchro(src, textes, marques) + voix_egale_ecrit(src, textes)
    print("\n" + ("OK - 0 probleme" if pb == 0 else f"[X] {pb} probleme(s)"))
    return pb


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    sys.exit(1 if main(sys.argv[1], sys.argv[2]) else 0)
