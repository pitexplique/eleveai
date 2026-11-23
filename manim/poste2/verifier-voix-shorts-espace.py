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
    #
    # ⛔⛔ DANS CETTE SÉRIE, A À H NOMMENT LES SOMMETS AUTANT QUE LES RÉPONSES, et la
    # forme « D : 0, 1, 0 » est celle d'un sommet du cube comme celle d'un choix.
    # Mesuré sur les 12 voix de short : SIX occurrences de « <lettre> : » ne sont pas des
    # choix — quatre dans le clip `01-idee` de E2 (« B : 1, 0, 0. D : 0, 1, 0. E : 0, 0,
    # 1 », et « à l'opposé de A : 1, 1, 1 »), et deux dans des clips de réponse
    # (« De A à H : aucun pas vers B », « Réponse B : rien du tout »).
    # Aucune n'est aujourd'hui dans un clip de QUESTION, mais rien ne l'empêche : il
    # suffirait qu'une question nomme un sommet.
    # ⭐ On ne s'en sort donc PAS en excluant la lettre D, qui n'est qu'un symptôme. On
    # s'appuie sur la STRUCTURE : les trois choix forment la fin de la question, après son
    # dernier « ? » et avant « Mets pause », et ils arrivent dans l'ordre A puis B puis C.
    # Un sommet cité plus tôt dans la phrase tombe hors de ce segment.
    for ident, clips in shorts.items():
        q = clips.get("02-question", "")
        r = clips.get("02b-reponse", "")
        segment = q.rsplit("?", 1)[-1].split("Mets pause")[0]
        lettres = re.findall(r"\s*([A-H])\s:\s", segment)
        if lettres != ["A", "B", "C"]:
            erreurs.append(f"{ident} : les choix de la question se lisent {lettres or 'rien'}, "
                           f"attendu A puis B puis C")
        m = re.match(r"R[ée]ponse ([A-C])", r)
        if not m:
            erreurs.append(f"{ident} : la réponse n'annonce aucune lettre")
        elif m.group(1) not in lettres:
            erreurs.append(f"{ident} : la réponse annonce {m.group(1)}, "
                           f"qui n'est pas proposée")
        else:
            devinabilite(ident, segment, m.group(1))


# ---- 6. la devinabilité : la bonne réponse est-elle la plus longue ? ----
#
# ⭐⭐ ET CE CONTRÔLE REND UNE MARGE, JAMAIS UN VERDICT SEUL.
# La règle de la maison est « la bonne réponse ne doit pas être SEULE la plus longue ».
# Écrite telle quelle, elle est BINAIRE : elle met dans le même sac un écart de 2
# caractères et un écart de 6, qui ne sont pas le même défaut. Mesuré sur les 12 shorts :
#   · E3 géométrie — bonne « 3, moins 1, 4 » (13) contre 7 et 7 : **86 % de plus**, réel ;
#   · E6 géométrie — bonne « rien du tout » (12) contre « parallèles » (10) : **20 %**,
#     et deux caractères sur une locution courte ne se devinent pas.
# ⛔ Un seuil sans marge est un seuil qui CRIE TROP, et crier trop fait corriger des
# textes qui allaient bien — ce qui a failli arriver trois fois dans la soirée du 23/11.
# ⭐ Donc cet outil ne tranche pas : il sort une ALERTE qui porte l'écart en caractères
# ET en pourcentage, et c'est un humain qui décide. Le signaler en ERREUR rendrait le
# critère « 0 erreur » inatteignable, la leçon de `verifier-zone-margo.py`.
def devinabilite(ident, segment, bonne):
    props = [p.strip().rstrip(". ").strip()
             for p in re.split(r"\s*[A-H]\s:\s", segment)[1:]]
    if len(props) != 3:
        return
    L = [len(p) for p in props]
    i = "ABC".index(bonne)
    autres = sorted(L[:i] + L[i + 1:], reverse=True)
    if L[i] <= autres[0]:
        return                      # ni seule la plus longue, ni ex æquo au-dessus
    ecart = L[i] - autres[0]
    pour_cent = 100 * ecart / autres[0] if autres[0] else 999
    alertes.append(f"{ident} : la bonne réponse ({bonne}, {L[i]} car.) est SEULE la plus "
                   f"longue — {ecart} car. de plus que la 2ᵉ ({autres[0]}), soit "
                   f"{pour_cent:.0f} %. À juger à l'œil : l'outil ne tranche pas.")


def lire_choix(question):
    """La lecture structurelle des trois choix, isolée pour pouvoir être ÉTALONNÉE."""
    segment = question.rsplit("?", 1)[-1].split("Mets pause")[0]
    return re.findall(r"\s*([A-H])\s:\s", segment)


def etalonner_choix():
    """⭐ Le témoin du durcissement : un SOMMET cité dans la question ne doit pas être
    pris pour un choix, et un ordre cassé doit l'être. Sans ces deux cas, « 0 erreur »
    ne prouverait pas que la lecture structurelle sert à quelque chose."""
    propre = "Coordonnées du sommet H ? A : 1, 1, 0. B : 0, 0, 1. C : 0, 1, 1. Mets pause, et choisis !"
    piege = ("Dans le cube, D : 0, 1, 0 et E : 0, 0, 1. Lequel est le plus haut ? "
             "A : D. B : E. C : ni l'un ni l'autre. Mets pause, et choisis !")
    casse = "Que vaut ceci ? A : un. C : deux. B : trois. Mets pause, et choisis !"
    ok = []
    ok.append(("question simple", lire_choix(propre) == ["A", "B", "C"]))
    ok.append(("deux SOMMETS cités avant les choix", lire_choix(piege) == ["A", "B", "C"]))
    ok.append(("ordre A C B cassé", lire_choix(casse) != ["A", "B", "C"]))
    # ⭐ Les témoins de la devinabilité : elle doit crier quand la bonne dépasse SEULE,
    # et se taire quand elle est ex æquo ou plus courte. Sans le second, un outil qui
    # crierait toujours passerait pour vigilant.
    avant = len(alertes)
    devinabilite("témoin-trop-longue", " A : oui. B : non. C : oui mais pas toujours.", "C")
    crie = len(alertes) > avant
    avant = len(alertes)
    devinabilite("témoin-ex-aequo", " A : rouge. B : vert. C : jaune.", "B")
    devinabilite("témoin-plus-courte", " A : oui vraiment. B : non. C : peut-être bien.", "B")
    muet = len(alertes) == avant
    del alertes[:]                       # les témoins ne polluent pas le rapport
    ok.append(("devinabilité : crie sur une bonne SEULE la plus longue", crie))
    ok.append(("devinabilité : muette sur ex æquo et sur plus courte", muet))
    for nom, bon in ok:
        print(f"   {'✅' if bon else '⛔'} témoin : {nom}")
    return all(b for _, b in ok)


def main():
    etalon = "--etalonner" in sys.argv
    shorts = charger()
    print("GABARIT DES VOIX DE SHORT — série espace, terminale spé")
    print(f"{len(shorts)} shorts lus · {len(GABARIT)} clips attendus chacun")
    if not shorts:
        print("⛔ AUCUNE voix lue : l'outil n'a rien mesuré. Un zéro ne vaut rien ici.")
        return 1
    temoins = True
    if etalon:
        print("⚙️  ÉTALONNAGE : un clip est retiré exprès, l'outil DOIT crier.")
        temoins = etalonner_choix()
    controler(shorts, faux_expres=etalon)
    for e in erreurs:
        print("  ⛔", e)
    for a in alertes:
        print("  ⚠️ ", a)
    print(f"{len(erreurs)} erreur(s), {len(alertes)} alerte(s)")
    if etalon:
        ok = any("manquant" in e for e in erreurs) and temoins
        print("✅ étalonné : la faute plantée a bien été vue, et les témoins passent tous."
              if ok else "⛔ ÉTALONNAGE RATÉ : la faute plantée ou un témoin n'a pas tenu.")
        return 0 if ok else 1
    if not erreurs:
        print("✅ gabarit complet, aucun symbole non prononçable, aucun copier-coller")
        print("⛔ RAPPEL : ce script ne contrôle AUCUN calcul. La passe maths des six "
              "shorts du produit scalaire est `controler-maths-shorts-ps-espace.py` ; "
              "les six de la géométrie n'en ont toujours pas.")
    return 1 if erreurs else 0


if __name__ == "__main__":
    sys.exit(main())
