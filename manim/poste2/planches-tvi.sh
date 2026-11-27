#!/bin/bash
# Les 5 planches -ql de la serie continuite + TVI.
# -ql seulement : aucun HD, le verrou de rendu HD n'est pas pris.
#
# ⛔⛔ LECON DU 27/11 : la premiere version de ce script testait `-f "$mp4"`.
# Les 5 rendus Manim avaient echoue (UnicodeEncodeError : la console Windows est en
# cp1252 et Manim ecrit de l'Unicode), et `planche-video.py` a fabrique 5 planches a
# partir des MP4 DEJA PRESENTS -- dont trois dataient de cinq heures plus tot. Les
# planches avaient l'air normales, et montraient un etat du code qui n'existait plus.
# Une planche ne sait pas que son script a bouge, exactement comme un HD.
# D'ou les deux gardes ci-dessous : PYTHONIOENCODING, et le MP4 doit etre PLUS RECENT
# que son script, sinon on s'arrete.
export PYTHONIOENCODING=utf-8
cd "$(dirname "$0")/../.." || exit 1
set -u
rm -rf planches-tvi; mkdir -p planches-tvi
i=0; echecs=0
for couple in "continuite_reconnaitre:ContinuiteReconnaitre" "tvi_appliquer:TviAppliquer" \
              "tvi_unicite:TviUnicite" "tvi_rediger:TviRediger" "tvi_defi:TviDefi"; do
  i=$((i+1))
  script="${couple%%:*}"; scene="${couple##*:}"
  src="manim/scripts/terminale/$script.py"
  mp4="manim/scripts/terminale/media/videos/$script/480p15/e$i-ql.mp4"
  echo "=== E$i  $script  $scene ==="
  rm -f "$mp4"                      # jamais de MP4 herite
  if ! python -m manim render -ql --disable_caching "$src" "$scene" \
       -o "e$i-ql" --media_dir manim/scripts/terminale/media 2>&1 | tail -3; then
    echo "ECHEC E$i : le rendu Manim a rendu un code non nul"; echecs=$((echecs+1)); continue
  fi
  if [ ! -f "$mp4" ]; then
    echo "ECHEC E$i : aucun MP4 produit"; echecs=$((echecs+1)); continue
  fi
  if [ "$src" -nt "$mp4" ]; then
    echo "ECHEC E$i : le MP4 est PLUS VIEUX que son script -- planche perimee, refusee"
    echecs=$((echecs+1)); continue
  fi
  python scripts/planche-video.py "$mp4" "planches-tvi/planche-e$i.png" 4 2>&1 | tail -2
  echo "OK E$i  (mp4 $(stat -c %y "$mp4" | cut -d. -f1))"
done
echo "=== TERMINE : $echecs echec(s) ==="
ls -la planches-tvi/
