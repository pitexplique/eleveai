#!/usr/bin/env bash
# manim/poste2/voix-ps-espace-shorts-wav.sh
# Les WAV et les marques des SIX SHORTS du produit scalaire (E7 a E12), terminale spe.
#
# POURQUOI UN SECOND FICHIER plutot qu'une ligne de plus dans
# `voix-espace-tous-les-wav.sh` : ce script-la est PARTAGE (il porte les 12 paysages de la
# serie), et la session qui produit les shorts de la geometrie (E1 a E6) ecrit au meme
# moment dans le meme dossier. Deux ecrivains ne touchent jamais le meme fichier : chaque
# moitie a donc son lanceur, et les deux appellent exactement la meme chaine.
#
# ⚠️ -Debit -6 aux DEUX etapes, repris tel quel du lanceur des paysages. Les defauts sont
#    -18 pour generer-voix.ps1 et -10 pour marques_dump.ps1 : avec deux debits differents,
#    les marques datent une AUTRE voix que le WAV, tous les `au_mot` glissent, et AUCUN
#    outil ne le dit.
# ⚠️ -Hauteur 6 est le defaut des deux : ne pas y toucher.
# ⛔ On passe par `cues2marques-espace.py`, jamais par le convertisseur commun : celui-ci
#    jette les vraies repetitions de chiffres, qui sont partout dans une voix de geometrie
#    dans l'espace (« 1, 1, 1 », « un tiers, un tiers, un tiers »).
#
#   bash manim/poste2/voix-ps-espace-shorts-wav.sh            # tout ce qui manque
#   bash manim/poste2/voix-ps-espace-shorts-wav.sh --refaire  # tout, meme l'existant
#
# Les WAV sortent dans public/sons/<voix>/ (ignore par git). Les marques vont dans
# manim/scripts/terminale/<script>_marques.json, du nom du script Manim du short.
set -u
cd "$(dirname "$0")/../.." || exit 1

# voix -> nom du script Manim du short (donc du fichier de marques)
SHORTS="
terminale-ps-espace-calculer-short:ps_espace_calculer_short
terminale-ps-espace-orthogonalite-short:ps_espace_orthogonalite_short
terminale-ps-espace-norme-distance-short:ps_espace_norme_distance_short
terminale-ps-espace-angle-short:ps_espace_angle_short
terminale-ps-espace-plan-normal-short:ps_espace_plan_normal_short
terminale-ps-espace-defi-short:ps_espace_defi_short
"

for ligne in $SHORTS; do
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
