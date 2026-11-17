"""Verifie que chaque chaine passee a au_mot() existe dans la voix du MEME ecran.

Usage : python verif_aumot.py <script.py> <nom-voix>
On suit le flux : dire("xx") / ecran("xx") / question_gauche("xx", ...) ouvre un ecran,
et chaque au_mot("...") qui suit est cherche dans le texte de cet ecran.
"""
import json
import re
import sys
from pathlib import Path

script, voix = sys.argv[1], sys.argv[2]
textes = json.loads(Path("manim/voix/%s.json" % voix).read_text(encoding="utf-8"))
src = Path(script).read_text(encoding="utf-8")

OUVRE = r'(?:self\.dire|self\.ecran|self\.question_gauche|self\.ecran_question)\(\s*"([^"]*)"'
AUMOT = r'self\.au_mot\(\s*"([^"]*)"(?:\s*,\s*(\d+))?'

cle = None
mauvais = []
for m in re.finditer(OUVRE + "|" + AUMOT, src):
    if m.group(1) is not None:
        cle = m.group(1)
        continue
    extrait, n = m.group(2), int(m.group(3) or 1)
    t = textes.get(cle, "")
    if t.count(extrait) < n:
        ligne = src[: m.start()].count("\n") + 1
        mauvais.append("L%d [%s] << %s >> (n=%d) : %d occurrence(s)"
                       % (ligne, cle, extrait, n, t.count(extrait)))

print("\n".join(mauvais) if mauvais else "OK : tous les au_mot sont dans leur voix")
sys.exit(1 if mauvais else 0)
