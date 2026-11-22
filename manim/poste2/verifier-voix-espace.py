# manim/poste2/verifier-voix-espace.py
# Contrôle des voix de la série « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026).
#
# ⛔ Ce script ne juge PAS les maths : la passe maths se fait à la main, clip par clip,
# dans `manim/poste2/VOIX-espace-terminale.md` (c'est là qu'était l'erreur « 6 032 a
# 3 centaines » de la série des entiers : aucun outil ne l'aurait vue).
# Il vérifie ce qu'un humain relit mal : la complétude, les symboles qui se lisent mal
# à haute voix, et les copier-coller d'un épisode à l'autre.
#
#   python manim/poste2/verifier-voix-espace.py
#
# Ce qu'il mesure :
#   1. les 15 clips du gabarit, ni un de plus ni un de moins, aucun vide ;
#   2. ⭐ aucun symbole non prononçable : une voix est LUE, « $x^2$ » ou « = » ne se dit pas ;
#   3. ⚠️ les clips `04-question` et `07-question` trop longs — la question s'affiche à
#      l'écran, et au-delà de trois lignes les cartes de choix descendent sur Ti Margo
#      (piège n° 33 de `manim/REPRISE-entiers-cm1-6e.md`) ;
#   4. ⛔ un texte identique dans deux épisodes : le signe d'un copier-coller non relu ;
#   5. les questions sans leur réponse (`04` sans `04b`) ;
#   6. ⭐⭐ la PLACE de la bonne réponse : A, B ou C tirée au hasard, jamais deux fois
#      la même lettre de suite dans un épisode, environ un tiers de chaque sur la série
#      (manim/REGLES.md, Frédéric 09/11/2026) — et la cohérence entre la lettre annoncée
#      et la proposition qui porte cette lettre.

import json
import re
import sys
from pathlib import Path

# ⚠️ La console Windows est en cp1252 : SANS cette ligne, le script plante sur son
# premier « ⛔ » — autrement dit il ne plante QUE quand il a quelque chose à dire.
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RACINE = Path(__file__).resolve().parents[2]
VOIX = RACINE / "manim" / "voix"

EPISODES = [
    "terminale-espace-vecteurs",
    "terminale-espace-repere-coordonnees",
    "terminale-espace-droite-parametrique",
    "terminale-espace-plan-equation",
    "terminale-espace-position-relative",
    "terminale-espace-defi",
    "terminale-ps-espace-calculer",
    "terminale-ps-espace-orthogonalite",
    "terminale-ps-espace-norme-distance",
    "terminale-ps-espace-angle",
    "terminale-ps-espace-plan-normal",
    "terminale-ps-espace-defi",
]

GABARIT = [
    "00-garde", "01-situation", "02-idee", "03-theoreme",
    "04-question", "04b-reponse", "05-appliquer", "06-piege",
    "07-question", "07b-reponse", "08-rediger",
    "09-defi", "09b-correction", "10-finale", "11-abonne",
]

# Caractères qui ne se prononcent pas, ou qui trahissent du LaTeX resté dans la voix.
INTERDITS = "$\\=×÷√≤≥≠²³°^_{}|<>[]⟹⟺→+*"
# ⚠️ « , » et « ; » et « : » sont permis : ils font les pauses. « — » aussi.

LONGUEUR_QUESTION = 320   # au-delà, la question ne tient pas en trois lignes à l'écran
LONGUEUR_CLIP = 900       # au-delà, le clip dure trop longtemps pour un seul écran
PROSE_MAXI = 30           # mots de prose par phrase (lettres seules et nombres exclus)

erreurs, alertes = [], []
textes = {}

for ident in EPISODES:
    f = VOIX / f"{ident}.json"
    if not f.exists():
        erreurs.append(f"{ident} : fichier absent ({f})")
        continue
    voix = json.loads(f.read_text(encoding="utf-8"))

    manquants = [c for c in GABARIT if c not in voix]
    surplus = [c for c in voix if c not in GABARIT]
    if manquants:
        erreurs.append(f"{ident} : clips manquants {manquants}")
    if surplus:
        erreurs.append(f"{ident} : clips hors gabarit {surplus}")
    if list(voix) != [c for c in GABARIT if c in voix]:
        alertes.append(f"{ident} : les clips ne sont pas dans l'ordre du gabarit")

    for clip, texte in voix.items():
        if not texte.strip():
            erreurs.append(f"{ident} / {clip} : texte vide")
            continue
        mauvais = sorted({c for c in texte if c in INTERDITS})
        if mauvais:
            erreurs.append(f"{ident} / {clip} : symbole non prononçable {mauvais}")
        if re.search(r"\d\.\d", texte):
            erreurs.append(f"{ident} / {clip} : décimale au point, il faut une virgule")
        if clip.endswith("question") and len(texte) > LONGUEUR_QUESTION:
            alertes.append(f"{ident} / {clip} : {len(texte)} caractères — question longue, "
                           "vérifier qu'elle tient en trois lignes à l'écran")
        if len(texte) > LONGUEUR_CLIP:
            alertes.append(f"{ident} / {clip} : {len(texte)} caractères")
        # ⚠️ longueur de SOUFFLE : on compte les mots de PROSE, en retirant les lettres
        # seules et les nombres — un décompte brut punirait « A B C D E F G H », qui ne
        # coûte aucun souffle. Plafond de la série : 30 mots de prose par phrase.
        for phrase in re.split(r"(?<=[.!?])\s+", texte):
            prose = [m for m in phrase.split()
                     if len(re.sub(r"[^A-Za-zÀ-ÿ]", "", m)) >= 2
                     and not re.fullmatch(r"[\d,.]+", m)]
            if len(prose) > PROSE_MAXI:
                alertes.append(f"{ident} / {clip} : une phrase de {len(prose)} mots de prose "
                               f"(plafond {PROSE_MAXI}) — « {phrase[:60]}… »")
        textes.setdefault(texte.strip(), []).append(f"{ident}/{clip}")

# -------------------------------------------------------------------------------------
# ⭐⭐ LA PLACE DE LA BONNE RÉPONSE (manim/REGLES.md, Frédéric 09/11/2026)
# Le 09/11, sur 899 questions du manifeste, la bonne réponse était B 57 % du temps : un
# élève qui répond toujours la même lettre gagnait trop souvent. Depuis : place tirée au
# hasard, jamais deux fois la même lettre de suite dans une vidéo, ~1/3 de A, B et C sur
# la série. ⛔ J'ai écrit ces 12 voix avec 24 bonnes réponses en A sans le voir : ce
# contrôle existe pour que cela ne se reproduise pas en silence.
OPTIONS = re.compile(r"A : (.+?)\. B : (.+?)\. C : (.+?)\. Mets pause")
LETTRE = re.compile(r"^Réponse ([ABC])")

lettres = {}
for ident in EPISODES:
    f = VOIX / f"{ident}.json"
    if not f.exists():
        continue
    voix = json.loads(f.read_text(encoding="utf-8"))
    suite = []
    for q, r in (("04-question", "04b-reponse"), ("07-question", "07b-reponse")):
        if q not in voix or r not in voix:
            continue
        choix = OPTIONS.search(voix[q])
        if not choix:
            erreurs.append(f"{ident} / {q} : les trois choix A, B, C ne se lisent pas "
                           "(il faut « A : … . B : … . C : … . Mets pause »)")
            continue
        m = LETTRE.match(voix[r].strip())
        if not m:
            erreurs.append(f"{ident} / {r} : ne commence pas par « Réponse A/B/C »")
            continue
        lettre = m.group(1)
        suite.append(lettre)
        lettres[lettre] = lettres.get(lettre, 0) + 1
        # ⭐ si la réponse cite sa valeur juste après la lettre, elle doit être CELLE de la
        # proposition portant cette lettre : c'est ce qui attrape un déplacement de lettre
        # fait à moitié (la question réordonnée, la réponse pas suivie).
        cite = re.match(r"^Réponse [ABC], ([^.!]{1,40})", voix[r].strip())
        if cite:
            attendu = choix.group("ABC".index(lettre) + 1).strip().lower()
            dit_ = cite.group(1).strip().lower()
            if not attendu.startswith(dit_[: min(len(dit_), 12)]):
                erreurs.append(f"{ident} / {r} : dit « {dit_} » pour la lettre {lettre}, "
                               f"mais la proposition {lettre} est « {attendu[:40]} »")
    if len(suite) == 2 and suite[0] == suite[1]:
        erreurs.append(f"{ident} : les deux questions ont la bonne réponse en {suite[0]} "
                       "— deux fois la même lettre de suite dans une vidéo")

total = sum(lettres.values())
if total:
    print("   place de la bonne réponse : " + " · ".join(
        f"{k} {lettres.get(k, 0)}" for k in "ABC") + f"  (sur {total} questions)")
    for k in "ABC":
        n = lettres.get(k, 0)
        if not (total / 3 - 2 <= n <= total / 3 + 2):
            erreurs.append(f"la lettre {k} porte la bonne réponse {n} fois sur {total} "
                           f"— il en faut environ un tiers ({total // 3})")

for texte, lieux in textes.items():
    autres = {l.split("/")[0] for l in lieux}
    if len(lieux) > 1 and len(autres) > 1 and not texte.startswith("Entraîne-toi"):
        erreurs.append(f"texte identique dans {lieux} : « {texte[:70]}… »")

print(f"{len(EPISODES)} épisodes · {len(GABARIT)} clips attendus chacun")
for e in erreurs:
    print("  ⛔", e)
for a in alertes:
    print("  ⚠️ ", a)
if not erreurs:
    print("✅ gabarit complet, aucun symbole non prononçable, aucun copier-coller entre épisodes")
    print("⛔ RAPPEL : ce script ne contrôle AUCUN calcul. La passe maths est manuelle,")
    print("   clip par clip, dans manim/poste2/VOIX-espace-terminale.md.")
sys.exit(1 if erreurs else 0)
