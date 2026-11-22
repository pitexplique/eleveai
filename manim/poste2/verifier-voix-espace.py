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
#   5. les questions sans leur réponse (`04` sans `04b`, `09-defi` sans `09b-correction`).

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
        textes.setdefault(texte.strip(), []).append(f"{ident}/{clip}")

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
