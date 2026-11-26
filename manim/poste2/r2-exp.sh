#!/bin/bash
# r2-exp.sh <micro> : envoie MP4 + miniature + vignette d'un épisode exp dans SON dossier R2, puis compare Content-Length et taille locale
micro=$1; tir=${micro//_/-}; cd /c/Users/FRED/Documents/eleveai
D=manim/sorties/terminale/maths/analyse/exp-$tir; C=terminale/maths/analyse/exp-$tir
for ext in mp4 png vignette.webp; do
  n=eleveai-maths-terminale-exp-$tir.$ext
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts/r2-videos.ps1 -Rclone "copyto $D/$n R2:$C/$n" >/dev/null 2>&1
  loc=$(stat -c %s $D/$n); dist=$(curl -sI "https://pub-a5bab809c9be4ab6a33fe47c1aa68b5b.r2.dev/$C/$n" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-length"{print $2}')
  [ "$loc" = "$dist" ] && ok=OK || ok=ÉCART; echo "$ok $n local=$loc R2=$dist"
done
