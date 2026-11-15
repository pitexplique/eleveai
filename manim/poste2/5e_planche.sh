#!/bin/bash
# 5e_planche.sh <mp4> <sortie.png> <cols> t1 t2 ... : une planche d'images (640 px de large chacune)
mp=$1; out=$2; cols=$3; shift 3
d=$(mktemp -d); k=0
for t in "$@"; do k=$((k+1)); ffmpeg -v error -ss $t -i "$mp" -frames:v 1 -vf "scale=640:-2,drawtext=text='$t':x=8:y=8:fontsize=22:fontcolor=yellow:box=1:boxcolor=black" -y $d/$(printf %02d $k).png; done
rows=$(( (k+cols-1)/cols ))
ffmpeg -v error -i $d/%02d.png -filter_complex "tile=${cols}x${rows}:padding=4" -frames:v 1 -y "$out"
rm -rf $d; echo "$out"
