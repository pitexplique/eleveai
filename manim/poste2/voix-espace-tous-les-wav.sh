#!/usr/bin/env bash
# manim/poste2/voix-espace-tous-les-wav.sh
# Les WAV et les marques des 12 episodes de la serie « espace », terminale spe.
#
# ⛔ A NE LANCER QU'APRES le « oui » de Frederic sur les voix (fait le 22/11/2026).
# ⚠️ -Debit -6 aux DEUX etapes : marques_dump.ps1 a pour defaut -10 et generer-voix.ps1
#    -18. Avec deux debits differents, les marques datent une AUTRE voix que le WAV et
#    tous les au_mot glissent, sans qu'aucun outil ne le dise.
# ⚠️ -Hauteur 6 est le defaut des deux : ne pas y toucher.
#
#   bash manim/poste2/voix-espace-tous-les-wav.sh            # tout ce qui manque
#   bash manim/poste2/voix-espace-tous-les-wav.sh --refaire  # tout, meme l'existant
#
# Les WAV sortent dans public/sons/<voix>/ (ignore par git, .gitignore ligne 123).
# Les marques vont dans manim/scripts/terminale/<script>_marques.json, du nom du
# script Manim de l'episode, et passent par le convertisseur CORRIGE de la serie
# (manim/poste2/cues2marques-espace.py) : le commun perd les vraies repetitions
# de chiffres, qui sont partout dans une voix de geometrie dans l'espace.
set -u
cd "$(dirname "$0")/../.." || exit 1

# voix -> nom du script Manim (donc du fichier de marques)
EPISODES="
terminale-espace-vecteurs:espace_vecteurs
terminale-espace-repere-coordonnees:espace_repere_coordonnees
terminale-espace-droite-parametrique:espace_droite_parametrique
terminale-espace-plan-equation:espace_plan_equation
terminale-espace-position-relative:espace_position_relative
terminale-espace-defi:espace_defi
terminale-ps-espace-calculer:ps_espace_calculer
terminale-ps-espace-orthogonalite:ps_espace_orthogonalite
terminale-ps-espace-norme-distance:ps_espace_norme_distance
terminale-ps-espace-angle:ps_espace_angle
terminale-ps-espace-plan-normal:ps_espace_plan_normal
terminale-ps-espace-defi:ps_espace_defi
"

for ligne in $EPISODES; do
  voix="${ligne%%:*}"
  script="${ligne##*:}"
  marques="manim/scripts/terminale/${script}_marques.json"
  if [ -f "$marques" ] && [ "${1:-}" != "--refaire" ]; then
    echo "= $voix : deja fait"
    continue
  fi
  echo "--- $voix -> $marques"
  powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier "manim/voix/$voix.json" -Debit -6 \
    > /dev/null 2>&1 || { echo "  ERREUR synthese"; continue; }
  powershell -NoProfile -File scripts/marques_dump.ps1 -Fichier "manim/voix/$voix.json" \
    -Sortie "$marques" -Debit -6 > /dev/null 2>&1 || { echo "  ERREUR marques"; continue; }
  python -X utf8 manim/poste2/cues2marques-espace.py "manim/voix/$voix.json" \
    "$marques.cues.tsv" "$marques" || echo "  ERREUR conversion"
done
echo "termine."
