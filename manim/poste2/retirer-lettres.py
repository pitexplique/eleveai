# -*- coding: utf-8 -*-
# manim/poste2/retirer-lettres.py
# RETIRE LES MARQUES `self.lettres(...)` DEVENUES INUTILES après la passe « valeurs en
# chiffres » — et rend l'audit à la série.
#
#   python -X utf8 manim/poste2/retirer-lettres.py <script.py> [--garder 101,245] [--ecrire]
#
# ⭐⭐ POURQUOI UN OUTIL, ET PAS UN `sed`. `self.lettres(` enveloppe une EXPRESSION qui
# contient elle-même des parenthèses, souvent sur plusieurs lignes :
#     self.col(self.lettres(self.t("g(1) = −1", 38, ROUGE_ERREUR)), 0.7)
# Une expression régulière coupe à la première parenthèse fermante et casse le fichier.
# Ici on compte les parenthèses, en sautant celles qui sont DANS une chaîne — « g(1) »
# en contient deux.
#
# ⛔ Sans `--ecrire` il ne fait qu'AFFICHER. On lit la liste avant de laisser écrire.
# ⚠️ `--garder` prend les numéros de ligne des marques LÉGITIMES : celles dont le
# nombre n'est vraiment pas dit par la voix (une formule de page de garde, une
# graduation, un identifiant comme « 974 »). On les trouve avec :
#     AUDIT=1 AUDIT_TOUT=1 … --dry_run    (voir la docstring de EcransAnalyse.lettres)

import io
import sys
from pathlib import Path

MARQUE = "self.lettres("


def fin_appel(s, i):
    """L'index du ')' qui ferme l'appel ouvert à l'index i, chaînes ignorées."""
    prof, j, quote = 0, i, None
    while j < len(s):
        c = s[j]
        if quote:
            if c == "\\":
                j += 2
                continue
            if c == quote:
                quote = None
        elif c in "\"'":
            quote = c
        elif c == "(":
            prof += 1
        elif c == ")":
            prof -= 1
            if prof == 0:
                return j
        j += 1
    raise ValueError("parenthèse non fermée")


def main(chemin, garder, ecrire):
    s = io.open(chemin, encoding="utf-8").read()
    retires = gardes = 0
    i = 0
    while True:
        i = s.find(MARQUE, i)
        if i < 0:
            break
        ligne = s.count("\n", 0, i) + 1
        ouvre = i + len(MARQUE) - 1
        ferme = fin_appel(s, ouvre)
        dedans = s[ouvre + 1:ferme]
        apercu = " ".join(dedans.split())[:64]
        if ligne in garder:
            print(f"  = l.{ligne:<4} GARDÉE   {apercu}")
            gardes += 1
            i = ferme
            continue
        print(f"  − l.{ligne:<4} retirée   {apercu}")
        s = s[:i] + dedans + s[ferme + 1:]
        retires += 1
        # on ne bouge pas i : le texte a rétréci, la prochaine marque peut être avant
    print(f"\n{retires} marque(s) retirée(s), {gardes} gardée(s).")
    if ecrire:
        io.open(chemin, "w", encoding="utf-8").write(s)
        print(f"écrit : {chemin}")
    else:
        print("⚠️ rien écrit (ajouter --ecrire)")
    return 0


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    garder = set()
    for a in sys.argv[1:]:
        if a.startswith("--garder"):
            garder = {int(x) for x in a.split("=", 1)[1].split(",")} if "=" in a else set()
    if "--garder" in sys.argv:
        garder = {int(x) for x in sys.argv[sys.argv.index("--garder") + 1].split(",")}
        args = [a for a in args if a != sys.argv[sys.argv.index("--garder") + 1]]
    sys.exit(main(Path(args[0]), garder, "--ecrire" in sys.argv))
