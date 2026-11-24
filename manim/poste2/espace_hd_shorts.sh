#!/bin/bash
# espace_hd_shorts.sh — EleveAI, 2e poste (24/11/2026).
#
# Rend en HD les SHORTS écrits de la série « géométrie dans l'espace », terminale spé.
# Frédéric a regardé les six planches le 23/11 à 18:57 et a autorisé les rendus ;
# ils n'avaient jamais été lancés. Le 24/11 : « lance les dernières vidéos ».
#
# ⛔ Un seul rendu HD à la fois sur la machine : `4e_hd.sh` prend le verrou commun
#    `$TEMP/eleveai-rendu-hd.lock` et ATTEND son tour (il ne tue jamais un rendu).
# ⚠️ Un short de cette série est en 9:16 (`ShortSeconde` pose frame 4,5 x 8,0) : on
#    passe « 1080,1920 », sans quoi le rendu sort en paysage et tout déborde.
# ⛔ Le short vit dans le MÊME dossier que son paysage, suffixé « -short » (convention
#    relevée sur terminale-suite-integrale-short).
#
# Lancer en arrière-plan (compter ~15 min par short) :
#   bash manim/poste2/espace_hd_shorts.sh
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
export PYTHONIOENCODING=utf-8

# script|scène|nom du MP4|dossier de sortie (sous manim/sorties)
LOT="
espace_vecteurs_short|EspaceVecteursShort|eleveai-maths-terminale-espace-vecteurs-short|terminale/maths/geometrie/espace-vecteurs
espace_repere_coordonnees_short|EspaceRepereCoordonneesShort|eleveai-maths-terminale-espace-repere-coordonnees-short|terminale/maths/geometrie/espace-repere-coordonnees
espace_droite_parametrique_short|EspaceDroiteParametriqueShort|eleveai-maths-terminale-espace-droite-parametrique-short|terminale/maths/geometrie/espace-droite-parametrique
espace_plan_equation_short|EspacePlanEquationShort|eleveai-maths-terminale-espace-plan-equation-short|terminale/maths/geometrie/espace-plan-equation
espace_position_relative_short|EspacePositionRelativeShort|eleveai-maths-terminale-espace-position-relative-short|terminale/maths/geometrie/espace-position-relative
espace_defi_short|EspaceDefiShort|eleveai-maths-terminale-espace-defi-short|terminale/maths/geometrie/espace-defi
"

n=0
total=$(printf '%s' "$LOT" | tr -d '\r' | grep -c '[^[:space:]]')
echo "=== RENDUS HD : $total SHORTS DE LA SERIE ESPACE (terminale spe) ==="
date '+depart : %H:%M:%S'
# ⛔ `<<<` et non un tube : derrière un tube la boucle tourne dans un SOUS-SHELL et le
# `exit 1` n'arrêterait que lui — le lot continuerait à l'aveugle.
while IFS='|' read -r script scene nom sortie; do
  [ -z "${script:-}" ] && continue
  n=$((n + 1))
  echo
  echo "--- [$n/$total] $nom"
  # ⛔⛔ « < /dev/null » : sans lui manim lit l'ENTREE STANDARD de la boucle — le lot
  # lui-même — et avale le début de la ligne suivante (panne vécue le 17/11 sur la 4e).
  bash manim/poste2/4e_hd.sh "manim/scripts/terminale/$script.py" "$scene" "$nom" \
       "manim/scripts/terminale/media-hd-$nom" "manim/sorties/$sortie" "1080,1920" < /dev/null || {
    echo "⛔ ECHEC sur $nom — on s'arrête là plutôt que d'enchaîner à l'aveugle"; exit 1; }
  date '+  fini a %H:%M:%S'
# ⛔ `tr -d '\r'` : git livre ce fichier en CRLF, et le retour chariot finirait dans le
# DERNIER champ lu, donc dans le chemin de sortie. On purge à la lecture.
done <<< "$(printf '%s' "$LOT" | tr -d '\r')"
echo
echo "=== LOT TERMINE ==="
date '+%H:%M:%S'
echo "Ensuite : les entrees de registre des shorts, puis"
echo "  node scripts/brancher-videos-coach.mjs --classe terminale-spe --tout"
