#!/bin/bash
# Lot HD des 6 shorts du produit scalaire (E7-E12). Sequentiel : le verrou de rendu est unique.
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
LOT=(
  "ps_espace_norme_distance_short.py|PsEspaceNormeDistanceShort|ps-espace-norme-distance"
  "ps_espace_orthogonalite_short.py|PsEspaceOrthogonaliteShort|ps-espace-orthogonalite"
  "ps_espace_plan_normal_short.py|PsEspacePlanNormalShort|ps-espace-plan-normal"
  "ps_espace_angle_short.py|PsEspaceAngleShort|ps-espace-angle"
  "ps_espace_calculer_short.py|PsEspaceCalculerShort|ps-espace-calculer"
  "ps_espace_defi_short.py|PsEspaceDefiShort|ps-espace-defi"
)
i=0
for e in "${LOT[@]}"; do
  i=$((i+1))
  IFS='|' read -r py scene micro <<< "$e"
  nom="eleveai-maths-terminale-$micro-short"
  echo "=============================================================="
  echo "[$i/6] $nom  --  $(date +%H:%M:%S)"
  bash manim/poste2/4e_hd.sh \
    "manim/scripts/terminale/$py" \
    "$scene" \
    "$nom" \
    "manim/scripts/terminale/media-hd-$nom" \
    "manim/sorties/terminale/maths/geometrie/$micro" \
    1080,1920
  echo "[$i/6] rc=$?  fin $(date +%H:%M:%S)"
done
echo "=============================================================="
echo "LOT TERMINE $(date +%H:%M:%S)"
