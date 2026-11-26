#!/bin/bash
# HD de E10 et E12 apres la reecriture des accroches du 26/11/2026.
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
for e in "ps_espace_angle_short.py|PsEspaceAngleShort|ps-espace-angle" \
         "ps_espace_defi_short.py|PsEspaceDefiShort|ps-espace-defi"; do
  IFS='|' read -r py scene micro <<< "$e"
  nom="eleveai-maths-terminale-$micro-short"
  echo "=============== $nom  --  $(date +%H:%M:%S)"
  bash manim/poste2/4e_hd.sh "manim/scripts/terminale/$py" "$scene" "$nom" \
    "manim/scripts/terminale/media-hd-$nom" \
    "manim/sorties/terminale/maths/geometrie/$micro" 1080,1920
  echo "rc=$?  fin $(date +%H:%M:%S)"
done
echo "LOT TERMINE $(date +%H:%M:%S)"
