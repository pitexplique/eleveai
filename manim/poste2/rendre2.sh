#!/bin/bash
# rendre2.sh <micro> <Classe> <ql|qh> — attend >= 2500 Mo libres, aucun autre rendu manim, puis le verrou
micro=$1; classe=$2; q=$3; tir=${micro//_/-}
L=/c/Users/FRED/Documents/eleveai/manim/poste2/.verrou-rendu
cd /c/Users/FRED/Documents/eleveai
while true; do
  libre=$(powershell -NoProfile -Command '[math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1024)' | tr -d '\r')
  autres=$(powershell -NoProfile -Command '@(Get-CimInstance Win32_Process | Where-Object { $_.Name -eq "python.exe" -and $_.CommandLine -match "manim render" -and $_.CommandLine -notmatch "dry_run" }).Count' | tr -d '\r')
  if [ "$libre" -ge 2500 ] && [ "${autres:-1}" -eq 0 ] && mkdir "$L" 2>/dev/null; then break; fi
  sleep 30
done
trap 'rmdir "$L"' EXIT
echo "départ $(date +%T) libre=$libre"
if [ "$q" = qh ]; then
  python -m manim render -qh --disable_caching manim/scripts/terminale/exp_$micro.py $classe -o eleveai-maths-terminale-exp-$tir --media_dir manim/scripts/terminale/media-exp-$tir 2>&1 | tr '\r' '\n' | grep -E "File ready|Error|Traceback|RETARD" | tail -5
else
  python -m manim render -ql manim/scripts/terminale/exp_$micro.py $classe -o apercu-exp-$tir --media_dir manim/scripts/terminale/media-exp-$tir-ql 2>&1 | tr '\r' '\n' | grep -E "File ready|Error|Traceback" | tail -5
fi
echo "fin $(date +%T)"
