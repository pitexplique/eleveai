# manim/poste2/verifier-voix-shorts-espace.py
# LE GABARIT DES VOIX DE SHORT de la serie « GEOMETRIE DANS L'ESPACE » (23/11/2026).
#
# POURQUOI, et c'est mesure : `verifier-voix-espace.py` ne lit QUE les 12 paysages.
# Il annonce « 12 episodes · 15 clips attendus chacun » et un `grep -i short` dessus ne
# rend aucune ligne. Les DOUZE shorts de la serie -- les six de la geometrie comme les six
# du produit scalaire -- n'ont donc aucun controle de gabarit, de symboles ni de
# copier-coller. Son « ✅ » est juste, sur un perimetre qui n'est pas celui qu'on croit.
#
# ⭐ Ce script est deliberement ecrit pour LES DOUZE, pas pour mes six : la regle est la
# meme des deux cotes, et un controle qui ne regarderait que la moitie qu'on a ecrite
# soi-meme est precisement l'etalon pris DANS le perimetre soupconne.
# ⛔ Il ne LIT que : il ne corrige rien et n'ecrit dans aucun fichier.
#
#   python -X utf8 manim/poste2/verifier-voix-shorts-espace.py
#   python -X utf8 manim/poste2/verifier-voix-shorts-espace.py --etalonner
#
# Les quatre controles, repris tels quels de celui des paysages :
#   1. le gabarit : 6 clips, les bons noms, dans le bon ordre ;
#   2. aucun symbole non prononcable -- une voix est LUE a haute voix ;
#   3. aucun texte identique dans deux shorts (copier-coller non relu), ni entre un short
#      et le paysage de son propre episode -- un short PREND UNE IDEE, il ne recopie pas ;
#   4. la longueur de phrase, en mots de PROSE (lettres seules et nombres retires),
#      plafond 30, en alerte et non en erreur.
# ⭐ Et un cinquieme, propre aux shorts : la question doit proposer A, B et C, et la
#    reponse doit annoncer l'une de ces trois lettres.

import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RACINE = Path(__file__).resolve().parents[2]
VOIX = RACINE / "manim" / "voix"

GABARIT = ["00-accroche", "01-idee", "02-question", "02b-reponse", "03-commentaire", "04-abonne"]

# ⚠️ Recopie a l'identique de `verifier-voix-espace.py` : une seule regle pour la serie.
INTERDITS = "$\\=×÷√≤≥≠²³°^_{}|<>[]⟹⟺→+*"

erreurs, alertes = [], []


def mots_de_prose(phrase):
    """Les mots, sans les lettres seules (A, B, G...) ni les nombres : un decompte brut
    punit l'epellation des coordonnees, pas la longueur reelle."""
    out = []
    for m in re.findall(r"[^\s]+", phrase):
        m = m.strip(".,;:!?«»()").strip()
        if not m or len(m) == 1 or re.fullmatch(r"[\d\s,.]+", m):
            continue
        out.append(m)
    return out


def charger():
    shorts = {}
    for f in sorted(VOIX.glob("terminale-*espace*-short.json")):
        shorts[f.stem] = json.loads(f.read_text(encoding="utf-8"))
    return shorts


def controler(shorts, faux_expres=False):
    # ---- 1. le gabarit ----
    for ident, clips in shorts.items():
        noms = list(clips)
        if faux_expres and ident == sorted(shorts)[0]:
            noms = noms[:-1]                      # on enleve un clip : l'outil DOIT crier
        manquants = [c for c in GABARIT if c not in noms]
        surplus = [c for c in noms if c not in GABARIT]
        if manquants:
            erreurs.append(f"{ident} : clip(s) manquant(s) {manquants}")
        if surplus:
            erreurs.append(f"{ident} : clip(s) inattendu(s) {surplus}")
        if [c for c in noms if c in GABARIT] != [c for c in GABARIT if c in noms]:
            erreurs.append(f"{ident} : les clips ne sont pas dans l'ordre du gabarit")

    # ---- 2. les symboles non prononcables ----
    for ident, clips in shorts.items():
        for clip, texte in clips.items():
            mauvais = sorted({c for c in texte if c in INTERDITS})
            if mauvais:
                erreurs.append(f"{ident} / {clip} : symbole non prononçable {mauvais}")

    # ---- 3. les copier-collers ----
    #
    # ⛔⛔ LE CLIP D'ABONNEMENT EST COMMUN À TOUTE LA SÉRIE, ET C'EST VOULU.
    # « Entraîne-toi sur éleveai point f r. Et abonne-toi ! » est identique dans les 24
    # voix — c'est la signature de la maison, pas un copier-coller non relu.
    # ⚠️ Premier jet de cet outil : je l'avais exempté par sa LONGUEUR (« moins de 40
    # caractères »). Elle en fait 49. Résultat : **23 faux positifs sur 23 signalements**,
    # tous sur ce seul clip — et dans ce bruit, une vraie récidive serait passée
    # inaperçue. C'est la leçon de `verifier-zone-margo.py` : un faux positif STRUCTUREL
    # rend le critère « 0 erreur » inatteignable, donc inutile.
    # ⭐ On l'exempte donc par son NOM, qui est une propriété stable, et non par un seuil
    # de caractères, qui est une coïncidence.
    COMMUNS = ("-abonne",)
    vus = {}
    for ident, clips in shorts.items():
        for clip, texte in clips.items():
            cle = texte.strip()
            if clip.endswith(COMMUNS) or len(cle) < 40:
                continue
            if cle in vus:
                erreurs.append(f"{ident} / {clip} : texte identique à {vus[cle]}")
            else:
                vus[cle] = f"{ident} / {clip}"
    # et entre un short et le paysage de SON episode
    for ident, clips in shorts.items():
        pays = VOIX / (ident.replace("-short", "") + ".json")
        if not pays.exists():
            alertes.append(f"{ident} : paysage introuvable ({pays.name}) — comparaison sautée")
            continue
        textes_pays = {v.strip() for v in json.loads(pays.read_text(encoding="utf-8")).values()}
        for clip, texte in clips.items():
            if clip.endswith(COMMUNS):      # même raison : la signature de la maison
                continue
            if len(texte.strip()) >= 40 and texte.strip() in textes_pays:
                erreurs.append(f"{ident} / {clip} : recopié mot pour mot de son paysage "
                               f"— un short PREND une idée, il ne résume pas")

    # ---- 4. la longueur des phrases ----
    for ident, clips in shorts.items():
        for clip, texte in clips.items():
            for phrase in re.split(r"(?<=[.!?])\s+", texte):
                n = len(mots_de_prose(phrase))
                if n > 30:
                    alertes.append(f"{ident} / {clip} : {n} mots de prose (plafond 30)")

    # ---- 5. la question et sa lettre ----
    for ident, clips in shorts.items():
        q = clips.get("02-question", "")
        r = clips.get("02b-reponse", "")
        lettres = re.findall(r"\s([A-D])\s:\s", q)
        if sorted(lettres) != ["A", "B", "C"]:
            erreurs.append(f"{ident} : la question propose {lettres or 'rien'}, "
                           f"attendu A, B et C")
        m = re.match(r"R[ée]ponse ([A-C])", r)
        if not m:
            erreurs.append(f"{ident} : la réponse n'annonce aucune lettre")
        elif m.group(1) not in lettres:
            erreurs.append(f"{ident} : la réponse annonce {m.group(1)}, "
                           f"qui n'est pas proposée")


def main():
    etalon = "--etalonner" in sys.argv
    shorts = charger()
    print("GABARIT DES VOIX DE SHORT — série espace, terminale spé")
    print(f"{len(shorts)} shorts lus · {len(GABARIT)} clips attendus chacun")
    if not shorts:
        print("⛔ AUCUNE voix lue : l'outil n'a rien mesuré. Un zéro ne vaut rien ici.")
        return 1
    if etalon:
        print("⚙️  ÉTALONNAGE : un clip est retiré exprès, l'outil DOIT crier.")
    controler(shorts, faux_expres=etalon)
    for e in erreurs:
        print("  ⛔", e)
    for a in alertes:
        print("  ⚠️ ", a)
    print(f"{len(erreurs)} erreur(s), {len(alertes)} alerte(s)")
    if etalon:
        ok = any("manquant" in e for e in erreurs)
        print("✅ étalonné : la faute plantée a bien été vue." if ok
              else "⛔ ÉTALONNAGE RATÉ : le clip retiré n'a pas été signalé.")
        return 0 if ok else 1
    if not erreurs:
        print("✅ gabarit complet, aucun symbole non prononçable, aucun copier-coller")
        print("⛔ RAPPEL : ce script ne contrôle AUCUN calcul. La passe maths des six "
              "shorts du produit scalaire est `controler-maths-shorts-ps-espace.py` ; "
              "les six de la géométrie n'en ont toujours pas.")
    return 1 if erreurs else 0


if __name__ == "__main__":
    sys.exit(main())
