#!/bin/bash
# planche-3e-short.sh <tag> <mp4> : deux planches d'un SHORT 3e
# A = milieu des 5 premiers ecrans ; B = milieu des 2 derniers + les 3 images du COMPTEUR
t=$1; mp=$2
fin=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$mp")
mapfile -t e < <(tr '\r' '\n' < "manim/scripts/4e/media-hd-$t.hd.log" | grep -a '^ECRAN' | sed 's/.*(\(.*\))/\1/')
n=${#e[@]}
mid=()
for ((i=0;i<n;i++)); do b=${e[$((i+1))]:-$fin}; mid+=( $(awk -v a=${e[$i]} -v b=$b 'BEGIN{printf "%.1f", a+(b-a)*0.62}') ); done
rep=${e[3]}   # 02b-reponse
c1=$(awk -v r=$rep 'BEGIN{printf "%.1f", r-2.8}'); c2=$(awk -v r=$rep 'BEGIN{printf "%.1f", r-1.8}'); c3=$(awk -v r=$rep 'BEGIN{printf "%.1f", r-0.8}')
bash manim/poste2/5e_planche.sh "$mp" "manim/poste2/planches-3e/$t-A.png" 5 ${mid[0]} ${mid[1]} ${mid[2]} ${mid[3]} ${mid[4]} 2>/dev/null
av=$(awk -v r=${e[6]} "BEGIN{printf \"%.1f\", r-1.0}"); bash manim/poste2/5e_planche.sh "$mp" "manim/poste2/planches-3e/$t-B.png" 3 ${mid[5]} $av ${mid[6]} $c1 $c2 $c3 2>/dev/null
