#!/usr/bin/env bash
# Refaire les WAV et les marques de DEUX shorts seulement (E10 et E12), accroches reecrites
# le 26/11/2026. ⛔ Ne PAS lancer voix-ps-espace-shorts-wav.sh --refaire : il refait les six,
# et un WAV refait perime le HD de son short meme si son texte n'a pas bouge.
# ⚠️ -Debit -6 aux DEUX etapes : avec deux debits differents, les marques datent une AUTRE
#    voix que le WAV, tous les `au_mot` glissent, et AUCUN outil ne le dit.
set -u
cd "$(dirname "$0")/../.." || exit 1
for ligne in terminale-ps-espace-angle-short:ps_espace_angle_short \
             terminale-ps-espace-defi-short:ps_espace_defi_short; do
  voix="${ligne%%:*}"; script="${ligne##*:}"
  marques="manim/scripts/terminale/${script}_marques.json"
  echo "--- $voix -> $marques  ($(date +%H:%M:%S))"
  powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier "manim/voix/$voix.json" -Debit -6 \
    > /dev/null 2>&1 || { echo "  ERREUR synthese"; continue; }
  powershell -NoProfile -File scripts/marques_dump.ps1 -Fichier "manim/voix/$voix.json" \
    -Sortie "$marques" -Debit -6 > /dev/null 2>&1 || { echo "  ERREUR marques"; continue; }
  python -X utf8 manim/poste2/cues2marques-espace.py "manim/voix/$voix.json" \
    "$marques.cues.tsv" "$marques" || echo "  ERREUR conversion"
done
echo "termine $(date +%H:%M:%S)"
