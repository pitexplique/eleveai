# -*- coding: utf-8 -*-
# manim/poste2/colonne-ne-donne-pas-la-reponse.py
#
#   python -X utf8 manim/poste2/colonne-ne-donne-pas-la-reponse.py
#   python -X utf8 manim/poste2/colonne-ne-donne-pas-la-reponse.py --etalonner
#
# ⛔⛔ POURQUOI CET OUTIL EXISTE (27/11/2026, après les WAV).
# Le dry run a sorti `AUDIT-AVANCE 07-question « 0 » +14,94 s` sur E1. Je cherchais un
# défaut de synchronisation ; j'ai trouvé autre chose. La colonne de gauche de E1 `07`
# affiche, dès la première seconde et pendant toute la pause :
#
#       rappel :
#       ln continue
#       sur ]0 ; +∞[
#
# et la bonne réponse de cette question est la carte B, « sur ]0 ; +∞[ ». **L'écran
# donne sa propre réponse, mot pour mot.** L'élève n'a pas à savoir où ln existe : il
# lui suffit de faire correspondre deux lignes.
#
# ⭐⭐ CE QUE CELA DIT DES INSTRUMENTS DE LA SÉRIE. `verifier-accroches-continuite-tvi.py`
# mesure exactement cette règle — une carte ne doit pas être décidable par ce que
# l'élève a déjà sous les yeux — mais il ne regarde que le TITRE et l'ACCROCHE, qui
# sont de la mémoire. Ici le texte est **sur le même écran, au même instant** : c'est
# le cas le plus fort de la famille, et c'était le seul angle mort.
#
# ⭐ LA RÈGLE : la colonne posée AVANT la question porte les DONNÉES de l'énoncé, jamais
# le verdict. Neuf des dix questions de la série la respectent, et c'est ce qui rend la
# dixième lisible : les données (« f(1) = 5 », « f(0) = −4 », « à la calculatrice : … »)
# laissent les trois cartes possibles ; un rappel qui énonce le résultat, non.
# ⚠️ Ce n'est PAS un défaut de synchronisation : avancer ou retarder le rappel n'y
# change rien. Il faut réécrire le rappel, ou le retirer.
#
# ⚠️ CE QU'IL NE VOIT PAS :
# ⛔ il compare des MOTS, pas du sens. Une colonne qui dirait « ln n'existe que pour
#    x strictement positif » ne partage aucun mot avec « sur ]0 ; +∞[ » et le laisserait
#    pourtant tout aussi décidable. Il confirme, il n'innocente pas.
# ⛔ il ne lit que les `self.t("…")` LITTÉRAUX posés entre `dire("0X-question")` et
#    `t0 = self.renderer.time`. Une colonne nourrie par une liste lui échappe.
# ⛔ il ne juge pas les LEURRES : que la colonne rende une mauvaise carte attirante est
#    souvent voulu (E3 `04`, arbitré par Frédéric le 27/11).

import ast
import sys
import unicodedata
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
SCRIPTS = ["continuite_reconnaitre", "tvi_appliquer", "tvi_unicite", "tvi_rediger", "tvi_defi"]
SEUIL = 0.50  # le même que verifier-accroches : la moitié des mots de contenu

VIDES = {"de", "du", "des", "la", "le", "les", "un", "une", "et", "ou", "en", "sur",
         "dans", "a", "à", "au", "aux", "est", "sont", "ce", "cette", "que", "qui",
         "pour", "par", "il", "elle", "on", "y", "n", "l", "d", "se", "pas", "plus",
         "tout", "tous", "toute", "entre", "deux", "si", "donc", "rappel", "dit",
         "copie", "hypotheses", "calculatrice"}


def plat(s):
    """Les mots de contenu d'un texte. La ponctuation tombe aux DEUX BOUTS seulement :
    « 0,13 » doit rester un nombre (leçon de la virgule finale, § 6 de la note)."""
    out = []
    for m in s.lower().replace("−", "-").split():
        m = m.strip(".,;:!?«»\"'()[]{}…-–—")
        m = "".join(c for c in unicodedata.normalize("NFD", m)
                    if unicodedata.category(c) != "Mn")
        if m and m not in VIDES:
            out.append(m)
    return out


def lit(n):
    return n.value if isinstance(n, ast.Constant) and isinstance(n.value, str) else None


def questions(src):
    """Les tuples Q04 / Q07 : (énoncé, choix, kw, bonne lettre)."""
    out = {}
    for n in ast.parse(src).body:
        if not (isinstance(n, ast.Assign) and len(n.targets) == 1):
            continue
        nom = getattr(n.targets[0], "id", None)
        if nom not in ("Q04", "Q07") or not isinstance(n.value, ast.Tuple):
            continue
        el = n.value.elts
        bonne = lit(el[-1])
        cartes = []
        for c in el[1].elts:
            cartes.append(" ".join(x for x in (lit(y) for y in c.elts) if x))
        out[nom] = (cartes, bonne)
    return out


def _textes(bout):
    out = []
    reste = bout
    while True:
        k = reste.find('self.t("')
        if k < 0:
            return out
        reste = reste[k + len('self.t("'):]
        fin = reste.find('"')
        out.append(reste[:fin])
        reste = reste[fin:]


def mesure(carte, lignes):
    """La part des mots de contenu de la carte que contient UNE SEULE ligne de la
    colonne. Ligne par ligne, et c'est tout le sujet : trois coïncidences dans trois
    lignes ne donnent rien à personne — c'est la leçon du « segment par segment »."""
    mots = plat(carte)
    if not mots:
        return 0.0, ""
    pire, ou = 0.0, ""
    for l in lignes:
        dedans = set(plat(l))
        part = sum(1 for m in mots if m in dedans) / len(mots)
        if part > pire:
            pire, ou = part, l
    return pire, ou


if "--etalonner" in sys.argv:
    # ⭐ L'étalon : le cas réel trouvé, et le cas réécrit qui doit se taire.
    cas = [("sur ]0 ; +∞[", ["rappel :", "ln continue", "sur ]0 ; +∞["], True),
           ("sur ]0 ; +∞[", ["rappel :", "une somme n'existe que là",
                             "où ses deux morceaux existent"], False),
           ("oui, au moins une", ["f continue sur [1 ; 4]", "f(1) = 5", "f(4) = 9",
                                  "f(x) = 7 ?"], False),
           ("la stricte monotonie de h", ["la copie dit :", "h continue sur [2 ; 5]",
                                          "h(2) = −1, h(5) = 6", "donc h(x) = 0 admet",
                                          "une unique solution"], False)]
    desaccords = 0
    for carte, lignes, doit_crier in cas:
        part, _ = mesure(carte, lignes)
        crie = part >= SEUIL
        etat = "OK" if crie == doit_crier else "⛔ DÉSACCORD"
        if crie != doit_crier:
            desaccords += 1
        print(f"{etat}  {part:5.0%}  « {carte} »  (doit "
              f"{'crier' if doit_crier else 'se taire'})")
    print(f"\n4 cas, {desaccords} désaccord(s). Seuil : {SEUIL:.0%}.")
    sys.exit(1 if desaccords else 0)

alertes = 0
for s in SCRIPTS:
    src = (RACINE / "manim" / "scripts" / "terminale" / f"{s}.py").read_text(encoding="utf-8")
    qs = questions(src)
    for cle, clip in (("Q04", "04-question"), ("Q07", "07-question")):
        if cle not in qs:
            continue
        cartes, bonne = qs[cle]
        lignes = [x for x in _textes(src[src.find('self.dire("%s")' % clip):
                                         src.find("t0 = self.renderer.time",
                                                  src.find('self.dire("%s")' % clip))]) if x]
        k = "ABC".find(bonne or "")
        if k < 0 or k >= len(cartes):
            print(f"⛔ {s} {cle} : bonne réponse « {bonne} » introuvable dans les cartes")
            alertes += 1
            continue
        part, ou = mesure(cartes[k], lignes)
        if not lignes:
            print(f"OK {s:24s} {cle} — aucune colonne posée avant la question")
        elif part >= SEUIL:
            print(f"⛔ {s:24s} {cle} — la colonne DONNE la réponse à {part:.0%} : "
                  f"carte {bonne} « {cartes[k]} » ≈ la ligne « {ou} »")
            alertes += 1
        else:
            print(f"OK {s:24s} {cle} — {part:.0%} de la carte {bonne} dans la colonne "
                  f"({len(lignes)} ligne(s) de données)")

print(f"\n{alertes} question(s) dont l'écran donne sa propre réponse.")
print("⚠️ Il compare des MOTS : il confirme, il n'innocente pas.")
sys.exit(1 if alertes else 0)
