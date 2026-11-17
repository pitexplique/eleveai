#!/bin/bash
# 3e_dry.sh <script.py> <Scene> <derniere-cle-voix> [resolution]
# Dry run AUDIT=1 BORDS=1, filtre les messages, et VERIFIE que le dernier ecran est atteint
# (une exception Python passait inapercue derriere la barre de progression).
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
export PYTHONIOENCODING=utf-8
S=$(mktemp)
if [ "${4:-}" != "" ]; then
  AUDIT=1 BORDS=1 python -m manim render --dry_run -r "$4" "$1" "$2" > "$S" 2>&1
else
  AUDIT=1 BORDS=1 python -m manim render --dry_run "$1" "$2" > "$S" 2>&1
fi
rc=$?
tr '\r' '\n' < "$S" | grep -aE "AUDIT|RETARD|TARD|BORD|LOIN|INTRA|ECART|SANS-|QUESTION" | sort | uniq -c
if ! tr '\r' '\n' < "$S" | grep -aq "ECRAN $3 "; then
  echo "⛔ L'ecran « $3 » n'a PAS ete atteint (rc=$rc) :"
  tr '\r' '\n' < "$S" | grep -aE "Error|Exception|^Traceback|raise " | tail -6
  tr '\r' '\n' < "$S" | grep -aE "^(ECRAN)" | tail -2
else
  echo "✅ dry run complet jusqu'a « $3 » (rc=$rc)"
fi
rm -f "$S"
