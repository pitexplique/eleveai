# -*- coding: utf-8 -*-
"""Contre-contrôle du MANIFESTE — série « CONTINUITÉ ET TVI », Tle spé.

    python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py

LA RÈGLE QU'IL MESURE (série espace, 26/11/2026) :

    « Une carte de choix ne doit pas être réfutable en se rappelant l'accroche —
      ni le titre — mot pour mot. »

Deux paysages de terminale sont en production avec ce défaut :
`terminale-ps-espace-angle` s'appelle « La grande diagonale d'un cube ne fait pas 45° »
alors que la carte A de sa question est « 45 degrés », et `terminale-ps-espace-defi`
porte la réponse dans son titre. Ça s'est vu à la relecture, pas à l'instrument : il n'y
en avait aucun.

CE QU'IL FAIT, ET RIEN DE PLUS
  · il lit le MANIFESTE (`manim/REPRISE-continuite-tvi.md`), source unique — ⛔ aucune
    donnée recopiée ici : une liste tenue à la main à côté d'un registre est l'accident
    déjà arrivé trois fois dans ce dépôt ;
  · pour chaque carte, il mesure la part de ses mots de contenu qu'on retrouve dans le
    titre, puis dans l'accroche, de l'épisode ;
  · il crie au-delà de 60 % — sur la BONNE carte (le titre donne la réponse) comme sur
    un LEURRE (le titre l'élimine, et il ne reste plus qu'un choix à deux).

CE QU'IL NE VOIT PAS, ET C'EST ÉCRIT ICI POUR QU'ON NE S'Y FIE PAS
  · ⛔ il compare des MOTS, pas du sens : « il n'y a aucune solution » et « le théorème
    ne conclut pas » ne partagent presque aucun mot et disent pourtant deux choses qu'un
    élève oppose. La relecture humaine reste la vraie mesure ;
  · ⛔ il ne vérifie pas que les trois propositions s'EXCLUENT : aucun instrument ne sait
    le faire, c'est écrit en toutes lettres dans la mémoire du projet ;
  · ⛔ il ne vérifie pas que l'écran `02-idee` traite un autre cas que les questions : ça
    se lit dans le manifeste, en deux minutes par épisode.
"""
import io
import re
import sys
import unicodedata
from pathlib import Path

MANIFESTE = Path(__file__).resolve().parents[1] / "REPRISE-continuite-tvi.md"
SEUIL = 0.50          # fixé par l'étalon ci-dessous, pas à vue : --etalonner

# Mots qui ne portent rien : les compter ferait sonner toutes les cartes à la fois.
VIDES = set("""a au aux avec ce cet cette ces dans de des du elle en est et il ils la
le les leur lui ma mais me même mes moi mon ne ni nos notre nous on ou où par pas peu
peut plus pour qu que quel quelle qui sa sans se ses si son sont sur ta te tes toi ton
tu un une vos votre vous y d l n s c j qu'on quand sa être avoir fait font dit disent
on-ne déjà encore aussi alors donc car comme bien tout toute tous toutes rien
""".split())


def plat(mot):
    """sans accent, sans ponctuation, en minuscules — « À » et « a » sont le même mot."""
    m = unicodedata.normalize("NFD", mot.lower())
    m = "".join(c for c in m if unicodedata.category(c) != "Mn")
    return re.sub(r"[^0-9a-z<>=+∞/,.-]", "", m)


def contenu(texte):
    """les mots de contenu d'un texte : ni vides, ni d'une seule lettre."""
    mots = [plat(m) for m in re.split(r"\s+", texte) if m]
    return {m for m in mots if m and m not in VIDES and (len(m) > 1 or m.isdigit())}


def lire_episodes(src):
    """Découpe le manifeste. ⛔ Il CRIE s'il ne retrouve pas sa structure : un parseur
    qui rend une liste vide ferait passer ce contrôle pour un succès."""
    blocs = re.split(r"\n### (E\d) · `([a-z0-9-]+)`\n", src)
    if len(blocs) < 4:
        sys.exit("⛔ aucun épisode trouvé : le manifeste a changé de forme")
    episodes = []
    for i in range(1, len(blocs), 3):
        num, ident, corps = blocs[i], blocs[i + 1], blocs[i + 2]
        t = re.search(r"\*\*Titre\*\* : \*(.+?)\*\n", corps)
        a = re.search(r"\*\*Accroche\*\* :\n\n((?:> ?.*\n)+)", corps)
        if not t or not a:
            sys.exit(f"⛔ {num} : titre ou accroche introuvable")
        accroche = "\n".join(l.lstrip("> ").rstrip() for l in a.group(1).splitlines())
        # ⚠️ LE PIED DE PAGE EST RETIRÉ DE LA MESURE, ET C'EST LA SEULE COUPE QU'ON FAIT.
        # « Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr » clôt
        # toutes les accroches de toutes les séries, mot pour mot. Son « Deux » faisait
        # crier E5 `04` à 50 % contre la carte « exactement deux » : l'instrument lisait
        # le nombre de questions comme un nombre de solutions. ⛔ Retirer du texte mesuré
        # ce qui dérange est la façon la plus simple de faire mentir un instrument : on
        # ne coupe donc QUE cette phrase-là, à la forme exacte, et la coupe s'affiche.
        accroche = re.sub(r"\n?(Une|Deux|Trois) questions?-pauses[^\n]*\n?", "\n", accroche)
        questions = []
        for q in re.finditer(r"\*\*Question (\d) \(`(\d\d)`\).*?\n(\|.+?\n)\n", corps, re.S):
            cartes = []
            for ligne in q.group(3).splitlines():
                m = re.match(r"\| (\*\*)?([ABC])(\*\*)? \| (.+?) \|(.*)\|", ligne)
                if m:
                    cartes.append((m.group(2), m.group(4).strip(), "✅" in m.group(5)))
            questions.append((q.group(2), cartes))
        episodes.append((num, ident, t.group(1), accroche, questions))
    return episodes


def segments(texte):
    """⭐⭐ LA MESURE SE FAIT SEGMENT PAR SEGMENT, ET C'EST TOUT LE SUJET.

    Première version : on comparait la carte à l'accroche ENTIÈRE. Elle a crié sur
    E2 `07` carte A (« rien : 0 n'est pas entre 2 et 8 ») à 60 %, parce que l'accroche
    écrit « −2 °C » dans une phrase, « 0 °C » dans une autre et « entre » dans une
    troisième. Trois coïncidences dans trois phrases différentes ne réfutent aucune
    carte : personne ne se souvient d'une accroche en vrac.
    Une carte réfutable l'est par UNE phrase. On coupe donc aux points, aux
    points-virgules, aux deux-points et aux puces, et on garde le pire segment."""
    return [s for s in re.split(r"[.;:!?\n•]", texte) if s.strip()]


def part(carte, texte):
    """la part des mots de la carte que le PIRE segment du texte contient."""
    mots = contenu(carte)
    if not mots:
        return 0.0, set()
    pire, vus = 0.0, set()
    for seg in segments(texte):
        dedans = mots & contenu(seg)
        if len(dedans) / len(mots) > pire:
            pire, vus = len(dedans) / len(mots), dedans
    return pire, vus


# ── L'ÉTALON ────────────────────────────────────────────────────────────────────
# ⭐⭐ « Un instrument sans étalon ne mesure rien » : un seuil choisi à vue sonne à
# tort ou se tait à tort, et on ne sait pas lequel. Les quatre cas ci-dessous sont
# RÉELS, pris dans manim/REPRISE-espace-terminale.md : deux défauts constatés à la
# relecture (avant correction) et les deux réécritures que Frédéric a validées.
# Le seuil doit les séparer. ⛔ Ce ne sont pas des données de production : c'est la
# règle graduée de cet instrument, et elle ne bouge que si les cas bougent.
ETALON = [
    ("E10 espace, AVANT", "La grande diagonale d'un cube ne fait pas 45°", "45 degrés", True),
    ("E12 short, AVANT", "En son milieu ? Non.", "au milieu de [AG]", True),
    ("E10 short, APRÈS", "Beaucoup de copies se trompent", "45 degrés", False),
    ("E12 short, APRÈS", "Pas là où on le croit.", "au milieu de [AG]", False),
]


def etalonner():
    print(f"ÉTALON — seuil {SEUIL:.0%}\n")
    faux = 0
    for nom, source, carte, doit_crier in ETALON:
        p, mots = part(carte, source)
        crie = p >= SEUIL
        etat = "OK " if crie == doit_crier else "⛔ "
        faux += crie != doit_crier
        attendu = "doit crier" if doit_crier else "doit se taire"
        print(f"  {etat}{nom:20s} {p:4.0%}  ({attendu})  « {carte} » / « {source} »")
    print(f"\n{len(ETALON)} cas, {faux} désaccord(s).")
    if faux:
        print("⛔ Le seuil ne sépare plus les cas connus : ne pas se fier aux alertes.")
    return 1 if faux else 0


# ── LA VOIX CONTRE LE MANIFESTE (--voix) ────────────────────────────────────────
# ⭐⭐ Le défaut qu'on cherche : l'écran affiche « 4 », la voix dit « quatre », et le
# `au_mot` du script Manim ira chercher un mot qui n'est pas dans les marques. Ou pire :
# la voix reformule une proposition, et l'élève lit autre chose que ce qu'il entend.
# La règle de la série est « la question dit à l'écran exactement ce que la voix dit » —
# ce mode la mesure, en comparant les mots une fois les nombres remis en chiffres.
# ⚠️ Il ne vaut QUE pour les épisodes déjà écrits dans VOIX-continuite-tvi.md : ceux qui
# manquent sont annoncés « voix pas encore écrite », jamais comptés comme bons.

VOIX = Path(__file__).resolve().parent / "VOIX-continuite-tvi.md"

CHIFFRES = {
    "zero": "0", "un": "1", "une": "1", "deux": "2", "trois": "3", "quatre": "4",
    "cinq": "5", "six": "6", "sept": "7", "huit": "8", "neuf": "9", "dix": "10",
    "onze": "11", "douze": "12", "treize": "13", "quatorze": "14", "quinze": "15",
    "seize": "16", "vingt": "20", "trente": "30",
}


SYMBOLES = set("ℝ∞[]{}<>=√≈≠⩽⩾≤≥∪∩/−–+°")


def symbolique(texte):
    """un texte d'écran qu'une voix ne peut PAS prononcer tel quel."""
    return any(c in SYMBOLES for c in texte)


def mots_compares(texte):
    """les mots d'un texte, nombres écrits en lettres remis en chiffres.

    ⭐ « f(1) » devient « f de 1 », parce que c'est ce que la voix prononce. Sans ça
    l'instrument criait sur E4 `04` carte A et E4 `07` carte B, deux cartes pourtant
    justes : il ne savait pas lire une image de fonction. ⛔ On ne range PAS ces cartes
    dans les « symboles à relire » : la correspondance « f de un » / « f(1) » est exacte
    et mécanique, donc elle se vérifie — et une carte vérifiée vaut mieux qu'une carte
    confiée à l'œil."""
    texte = re.sub(r"([a-zA-Zα-ω])\s*\(\s*(-?[\d,]+)\s*\)", r"\1 de \2", texte)
    bruts = [plat(m) for m in re.split(r"[\s'’]+", texte) if m]
    sortis = []
    for m in bruts:
        m = m.strip(",.;:!?()[]")
        if m:
            sortis.append(CHIFFRES.get(m, m))
    return sortis


def verifier_voix():
    if not VOIX.exists():
        print("⚠️ pas de VOIX-continuite-tvi.md : rien à comparer")
        return 0
    src = io.open(MANIFESTE, encoding="utf-8").read()
    voix = io.open(VOIX, encoding="utf-8").read()
    ecarts, vus, ecrits = 0, 0, 0
    arelire = []
    for num, ident, _titre, _accroche, questions in lire_episodes(src):
        entete = "\n# " + num + " · `" + ident + "`\n"
        if entete not in voix:
            print("   ⏳ " + num + " · " + ident + " — voix pas encore écrite")
            continue
        ecrits += 1
        corps = voix.split(entete, 1)[1].split("\n# ", 1)[0]
        souci = 0
        for cle, cartes in questions:
            cq = re.search(r"\*\*" + cle + r"-question\*\* : (.+)", corps)
            cr = re.search(r"\*\*" + cle + r"b-reponse\*\* : (.+)", corps)
            if not cq or not cr:
                print("   ⛔ " + num + " " + cle + " : clip de question ou de réponse absent")
                ecarts += 1
                souci += 1
                continue
            dits = mots_compares(cq.group(1))
            for lettre, texte, _bonne in cartes:
                vus += 1
                attendus = mots_compares(texte)
                trouve = any(dits[i:i + len(attendus)] == attendus
                             for i in range(len(dits) - len(attendus) + 1))
                if not trouve and symbolique(texte):
                    # ⭐⭐ FAMILLE CONNUE, ET STRUCTURELLE — pas un défaut.
                    # L'écran d'un cours de maths écrit « ]0 ; +∞[ » et « ℝ » ; la voix,
                    # elle, est LUE, donc elle dit « zéro plus l'infini, crochets
                    # ouverts » et « l'ensemble des réels ». Les deux sont justes, et
                    # aucune machine ne peut dire qu'ils désignent la même chose.
                    # ⛔ On ne fait donc PAS taire l'instrument : on le fait dire autre
                    # chose, et la ligne demande une relecture humaine.
                    arelire.append(num + " " + cle + " carte " + lettre + " : « " +
                                   texte + " »")
                elif not trouve:
                    ecarts += 1
                    souci += 1
                    print("   ⛔ " + num + " " + cle + " carte " + lettre +
                          " — l'écran dit « " + texte + " », la voix ne le reprend pas "
                          "mot pour mot")
            bonne = next(l for l, _, b in cartes if b)
            if not cr.group(1).startswith("Réponse " + bonne + "."):
                ecarts += 1
                souci += 1
                print("   ⛔ " + num + " " + cle + "b — la voix n'annonce pas « Réponse "
                      + bonne + ". »")
            if "Mets pause, et choisis !" not in cq.group(1):
                ecarts += 1
                souci += 1
                print("   ⛔ " + num + " " + cle + " — la voix ne finit pas par "
                      "« Mets pause, et choisis ! »")
        if not souci:
            symb = sum(1 for l in arelire if l.startswith(num + " "))
            print("   OK " + num + " · " + ident + " — 2 questions, " + str(6 - symb) +
                  " carte(s) reprises mot pour mot, " + str(symb) +
                  " en symboles (à relire), 2 lettres annoncées")
    print("\n" + str(ecrits) + " épisode(s) mis en voix, " + str(vus) +
          " cartes comparées, " + str(ecarts) + " écart(s).")
    if arelire:
        print("\n⚠️ " + str(len(arelire)) + " carte(s) écrite(s) en SYMBOLES à l'écran : "
              "la voix les dit en toutes lettres, et aucune machine ne peut vérifier "
              "qu'elle dit la même chose. À RELIRE une par une :")
        for ligne in arelire:
            print("   · " + ligne)
    return 1 if ecarts else 0


def main():
    if "--etalonner" in sys.argv:
        return etalonner()
    if "--voix" in sys.argv:
        return verifier_voix()
    src = io.open(MANIFESTE, encoding="utf-8").read()
    episodes = lire_episodes(src)
    alertes = 0
    cartes_vues = 0
    for num, ident, titre, accroche, questions in episodes:
        print(f"\n{num} · {ident}")
        print(f"   titre : {titre}")
        if "questions-pauses" not in accroche and "question-pause" not in accroche:
            print("   (pied de page « … questions-pauses … » retiré de la mesure)")
        if len(questions) != 2:
            sys.exit(f"⛔ {num} : {len(questions)} question(s), il en faut 2")
        for cle, cartes in questions:
            if len(cartes) != 3:
                sys.exit(f"⛔ {num} {cle} : {len(cartes)} carte(s), il en faut 3")
            if sum(1 for _, _, bonne in cartes if bonne) != 1:
                sys.exit(f"⛔ {num} {cle} : il faut exactement une bonne réponse")
            for lettre, texte, bonne in cartes:
                cartes_vues += 1
                for source, nom in ((titre, "titre"), (accroche, "accroche")):
                    p, mots = part(texte, source)
                    if p >= SEUIL:
                        alertes += 1
                        quoi = "DONNE LA RÉPONSE" if bonne else "ÉLIMINE UN LEURRE"
                        print(f"   ⛔ {cle} carte {lettre} — le {nom} {quoi} "
                              f"({p:.0%} de ses mots : {' '.join(sorted(mots))})")
            bonne = next(l for l, _, b in cartes if b)
            print(f"   {cle} : 3 cartes, bonne réponse {bonne} — "
                  f"recouvrement max "
                  f"{max(max(part(t, titre)[0], part(t, accroche)[0]) for _, t, _ in cartes):.0%}")
    print(f"\n{len(episodes)} épisodes, {cartes_vues} cartes mesurées, "
          f"{alertes} alerte(s) au-dessus de {SEUIL:.0%}.")
    print("⚠️ Un zéro ici ne veut pas dire « les cartes sont bonnes » : "
          "l'exclusion mutuelle et le « autre cas que l'idée » se relisent à la main.")
    return 1 if alertes else 0


if __name__ == "__main__":
    sys.exit(main())
