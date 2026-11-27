#!/usr/bin/env bash
# manim/poste2/voix-continuite-tous-les-wav.sh
# Les WAV et les marques des 5 episodes de la serie « CONTINUITE ET TVI », terminale spe.
#
# ⛔⛔ A NE LANCER QU'APRES LE « OUI » DE FREDERIC SUR LES VOIX. Pas fait au 27/11/2026.
#    Un WAV enregistre perime le rendu de son episode, et rien ne le signale. Tant que
#    les titres et les accroches ne sont pas relus, le texte se corrige pour rien ; le
#    WAV, non.
#
# ⚠️ -Debit -6 aux DEUX etapes : marques_dump.ps1 a pour defaut -10 et generer-voix.ps1
#    -18. Avec deux debits differents, les marques datent une AUTRE voix que le WAV et
#    tous les au_mot glissent, sans qu'aucun outil ne le dise.
# ⚠️ -Hauteur 6 est le defaut des deux : ne pas y toucher.
#
#   bash manim/poste2/voix-continuite-tous-les-wav.sh            # ce qui manque
#   bash manim/poste2/voix-continuite-tous-les-wav.sh --refaire  # tout, meme l'existant
#
# ⚠️ --refaire REFAIT LES CINQ : un WAV refait, meme a texte identique, est un fichier
#    neuf, et il perime le rendu de son episode. Pour ne reprendre qu'un episode,
#    passer son nom de voix en second argument.
#
# Les WAV sortent dans public/sons/<voix>/ (ignore par git). Les marques vont dans
# manim/scripts/terminale/<script>_marques.json, du nom du script Manim de l'episode.
#
# ⭐ APRES CE SCRIPT, ET PAS AVANT : poser `fichier_marques = "<script>_marques.json"`
#    dans chaque classe de scene. Tant qu'il vaut None, le socle le DIT a chaque rendu
#    (« SANS MARQUES — les au_mot sont ESTIMES au prorata »), et les planches ne jugent
#    que la mise en page. ⛔ Il faut alors REFAIRE dry run et planches : la
#    synchronisation n'a ete verifiee par personne.
#
# ⚠️ Le convertisseur : on prend celui de la serie espace (cues2marques-espace.py), qui
#    garde les repetitions de chiffres que le commun (scripts/cues2marques.py) jette.
#    Une voix d'analyse dit « f de 1 vaut 1 plus 3 moins 5 » : les repetitions y sont
#    partout. ⛔ Ne pas modifier le commun : d'autres series ont de vrais doublons.
set -u
cd "$(dirname "$0")/../.." || exit 1

# voix -> nom du script Manim (donc du fichier de marques)
EPISODES="
terminale-continuite-reconnaitre:continuite_reconnaitre
terminale-tvi-appliquer:tvi_appliquer
terminale-tvi-unicite:tvi_unicite
terminale-tvi-rediger:tvi_rediger
terminale-tvi-defi:tvi_defi
"

CIBLE="${2:-}"
for ligne in $EPISODES; do
  voix="${ligne%%:*}"
  script="${ligne##*:}"
  [ -n "$CIBLE" ] && [ "$CIBLE" != "$voix" ] && continue
  marques="manim/scripts/terminale/${script}_marques.json"
  if [ -f "$marques" ] && [ "${1:-}" != "--refaire" ]; then
    echo "= $voix : deja fait"
    continue
  fi
  if [ ! -f "manim/voix/$voix.json" ]; then
    echo "  ERREUR : manim/voix/$voix.json absent — relancer voix-continuite-depuis-md.py"
    continue
  fi
  echo "--- $voix -> $marques"
  powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier "manim/voix/$voix.json" -Debit -6 \
    > /dev/null 2>&1 || { echo "  ERREUR synthese"; continue; }
  powershell -NoProfile -File scripts/marques_dump.ps1 -Fichier "manim/voix/$voix.json" \
    -Sortie "$marques" -Debit -6 > /dev/null 2>&1 || { echo "  ERREUR marques"; continue; }
  python -X utf8 manim/poste2/cues2marques-espace.py "manim/voix/$voix.json" \
    "$marques.cues.tsv" "$marques" || echo "  ERREUR conversion"
done
echo "termine."
