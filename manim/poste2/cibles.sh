#!/bin/bash
# cibles.sh <mp4> <sortie.png> t1 t2 ... : une planche 4 colonnes des instants donnés
mp4=$1; out=$2; shift 2; d=$(mktemp -d); i=0
for t in "$@"; do i=$((i+1)); ffmpeg -loglevel error -y -ss $t -i "$mp4" -frames:v 1 -vf scale=480:-1 "$d/$(printf %02d $i).png"; done
n=$#; r=$(( (n+3)/4 ))
ffmpeg -loglevel error -y -framerate 1 -i "$d/%02d.png" -vf "tile=4x$r:padding=4" -frames:v 1 "$out"; rm -rf "$d"
