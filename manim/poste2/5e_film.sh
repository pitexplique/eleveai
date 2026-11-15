#!/bin/bash
# 5e_film.sh <série> <épisode> : rendu du short Ti Margo sous le verrou HD commun
cd /c/Users/acade/Documents/eleveai/eleveai-app
L="$TEMP/eleveai-rendu-hd.lock"
until mkdir "$L" 2>/dev/null; do sleep 20; done
trap 'rmdir "$L" 2>/dev/null' EXIT
node scripts/ti-margo-short.mjs "$1" "$2" film > "$TEMP/film-$1-$2.log" 2>&1; rc=$?
rmdir "$L" 2>/dev/null
tail -3 "$TEMP/film-$1-$2.log"; echo rc=$rc
