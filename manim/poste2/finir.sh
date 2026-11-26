#!/bin/bash
# finir.sh <micro> : copie le HD dans sorties, vérifie les bords, donne durée, taille et la pause « point f r » / « ou »
micro=$1; tir=${micro//_/-}; cd /c/Users/FRED/Documents/eleveai
src=$(find manim/scripts/terminale/media-exp-$tir/videos -name "eleveai-maths-terminale-exp-$tir.mp4" -path "*1080p60*" | head -1)
D=manim/sorties/terminale/maths/analyse/exp-$tir; mkdir -p $D; cp "$src" $D/; f=$D/eleveai-maths-terminale-exp-$tir.mp4
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); echo "$micro durée=$dur taille=$(stat -c %s $f)"
PYTHONIOENCODING=utf-8 python scripts/verifier-bords-video.py $f 2>&1 | tail -1
d0=$(python -c "print(max(0,$dur-9))")
ffmpeg -hide_banner -ss $d0 -i $f -af silencedetect=noise=-40dB:d=0.1 -f null - 2>&1 | grep -oE "silence_(start|end): [0-9.]+" | awk -v d0=$d0 -v dur=$dur '{split($0,a,": "); t=a[2]+d0; printf "%s %.2f (fin−%.2f)\n", a[1], t, dur-t}'
