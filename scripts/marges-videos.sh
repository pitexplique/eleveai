#!/bin/sh
# Ajoute une marge noire de 3 % autour des vidéos (image réduite à 94 %, centrée),
# sans toucher au son. Frédéric, 24/10/2026 : les figures des cycles 3 et 4 étaient
# collées au bord. Les originaux sont gardés dans manim/sorties/_avant-marges/.
#   sh scripts/marges-videos.sh <fichiers.mp4…>
cd "$(dirname "$0")/.."
for f in "$@"; do
  b="manim/sorties/_avant-marges/${f#manim/sorties/}"
  [ -f "$b" ] && { echo "déjà fait : $f"; continue; }
  mkdir -p "$(dirname "$b")"; cp "$f" "$b"
  wh=$(python -c "import av,sys;s=av.open(sys.argv[1]).streams.video[0];print(s.width,s.height)" "$b")
  W=${wh% *}; H=${wh#* }
  w=$(( (W*94/100)/2*2 )); h=$(( (H*94/100)/2*2 ))
  ffmpeg -loglevel error -y -i "$b" -vf "scale=$w:$h,pad=$W:$H:($W-$w)/2:($H-$h)/2:black" \
    -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -c:a copy -movflags +faststart "$f" \
    && echo "OK $f" || { cp "$b" "$f"; echo "ÉCHEC (original remis) $f"; }
done
