#!/bin/bash
# 5e_hd.sh <script.py> <Scene> <nom-sortie> <media_dir> <dossier-sortie>
# Rendu -qh sous verrou commun, copie dans la sortie, contrôle des bords.
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
export PYTHONIOENCODING=utf-8
L="$TEMP/eleveai-rendu-hd.lock"
until mkdir "$L" 2>/dev/null; do sleep 30; done
trap 'rmdir "$L" 2>/dev/null' EXIT
python -m manim render -qh --disable_caching "$1" "$2" -o "$3" --media_dir "$4" > "$4.hd.log" 2>&1
rc=$?
rmdir "$L" 2>/dev/null
[ $rc -ne 0 ] && { echo "ECHEC manim rc=$rc"; tail -20 "$4.hd.log"; exit 1; }
mp=$(find "$4/videos" -path "*1080p60*" -name "$3.mp4" | head -1)
mkdir -p "$5"; cp "$mp" "$5/$3.mp4"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$5/$3.mp4"
python scripts/verifier-bords-video.py "$5/$3.mp4" | tail -5
