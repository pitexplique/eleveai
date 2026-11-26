#!/bin/bash
# Un HD ne sait pas que son script a bouge (lecon du 26/11/2026) : on compare la date du
# MP4 de sortie a celle du dernier commit du script Manim qui l'a produit.
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
printf "%-28s %-17s %-17s %s\n" "micro" "script (commit)" "mp4 de sortie" "etat"
for e in "espace-vecteurs|espace_vecteurs_short" \
         "espace-repere-coordonnees|espace_repere_coordonnees_short" \
         "espace-droite-parametrique|espace_droite_parametrique_short" \
         "espace-plan-equation|espace_plan_equation_short" \
         "espace-position-relative|espace_position_relative_short" \
         "espace-defi|espace_defi_short" \
         "ps-espace-norme-distance|ps_espace_norme_distance_short" \
         "ps-espace-orthogonalite|ps_espace_orthogonalite_short" \
         "ps-espace-plan-normal|ps_espace_plan_normal_short" \
         "ps-espace-angle|ps_espace_angle_short" \
         "ps-espace-calculer|ps_espace_calculer_short" \
         "ps-espace-defi|ps_espace_defi_short"; do
  IFS='|' read -r micro py <<< "$e"
  s="manim/scripts/terminale/$py.py"
  m="manim/sorties/terminale/maths/geometrie/$micro/eleveai-maths-terminale-$micro-short.mp4"
  ts=$(git log -1 --format=%ct -- "$s")
  # un script modifie mais pas encore commite compte par sa date de fichier
  tf=$(stat -c %Y "$s"); [ "$tf" -gt "$ts" ] && ts=$tf
  if [ ! -f "$m" ]; then etat="PAS DE SORTIE"; tm=0; else tm=$(stat -c %Y "$m"); fi
  [ -f "$m" ] && { [ "$tm" -ge "$ts" ] && etat="a jour" || etat="!! PERIME"; }
  printf "%-28s %-17s %-17s %s\n" "$micro" "$(date -d @$ts '+%d/%m %H:%M')" \
         "$([ "$tm" -gt 0 ] && date -d @$tm '+%d/%m %H:%M' || echo '-')" "$etat"
done
