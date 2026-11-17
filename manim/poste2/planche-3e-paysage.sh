#!/bin/bash
# planche-3e-paysage.sh <tag> <mp4> : deux planches 4 colonnes (7 ecrans chacune), au milieu de chaque ecran
t=$1; mp=$2
fin=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$mp")
mapfile -t e < <(tr '\r' '\n' < "manim/scripts/4e/media-hd-$t.hd.log" | grep -a '^ECRAN' | sed 's/.*(\(.*\))/\1/')
n=${#e[@]}; mid=()
for ((i=0;i<n;i++)); do b=${e[$((i+1))]:-$fin}; mid+=( $(awk -v a=${e[$i]} -v b=$b 'BEGIN{printf "%.1f", a+(b-a)*0.62}') ); done
bash manim/poste2/5e_planche.sh "$mp" "manim/poste2/planches-3e/$t-A.png" 4 ${mid[0]} ${mid[1]} ${mid[2]} ${mid[3]} ${mid[4]} ${mid[5]} ${mid[6]} 2>/dev/null
bash manim/poste2/5e_planche.sh "$mp" "manim/poste2/planches-3e/$t-B.png" 4 ${mid[7]} ${mid[8]} ${mid[9]} ${mid[10]} ${mid[11]} ${mid[12]} ${mid[13]} 2>/dev/null
