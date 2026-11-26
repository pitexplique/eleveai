#!/usr/bin/env bash
# manim/poste2/voix-exp-tous-les-wav.sh
# WAV + marques des 6 paysages « fonction exponentielle », terminale spé (26/11/2026).
# Copie de voix-espace-tous-les-wav.sh (même débit −6 aux DEUX étapes).
# ⛔ MAIS le convertisseur est le COMMUN (scripts/cues2marques.py), pas celui de l'espace :
#   mesuré le 26/11, WinRT émet ici « 2x », « 2x » et « 3 donne », « 3 donne » à deux
#   instants DIFFÉRENTS (le nombre, puis le mot). Le convertisseur de l'espace les garde
#   comme deux mots, et toute la fin du clip glisse (149 alertes, E4 05-appliquer perdu).
#   Le commun jette la répétition : 0 mot introuvable sur les 6 voix.
#   bash manim/poste2/voix-exp-tous-les-wav.sh            # tout ce qui manque
#   bash manim/poste2/voix-exp-tous-les-wav.sh --refaire  # tout, même l'existant
set -u
cd "$(dirname "$0")/../.." || exit 1
EPISODES="
terminale-exp-definition:exp_definition
terminale-exp-proprietes:exp_proprietes
terminale-exp-deriver:exp_deriver
terminale-exp-equation-inequation:exp_equation_inequation
terminale-exp-limite:exp_limite
terminale-exp-defi:exp_defi
"
for ligne in $EPISODES; do
  voix="${ligne%%:*}"
  script="${ligne##*:}"
  marques="manim/scripts/terminale/${script}_marques.json"
  if [ -f "$marques" ] && [ "${1:-}" != "--refaire" ]; then
    echo "= $voix : deja fait"; continue
  fi
  echo "--- $voix -> $marques"
  powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier "manim/voix/$voix.json" -Debit -6 \
    > /dev/null 2>&1 < /dev/null || { echo "  ERREUR synthese"; continue; }
  powershell -NoProfile -File scripts/marques_dump.ps1 -Fichier "manim/voix/$voix.json" \
    -Sortie "$marques" -Debit -6 > /dev/null 2>&1 < /dev/null || { echo "  ERREUR marques"; continue; }
  python -X utf8 scripts/cues2marques.py "manim/voix/$voix.json" \
    "$marques.cues.tsv" "$marques" < /dev/null || echo "  ERREUR conversion"
done
echo "termine."
