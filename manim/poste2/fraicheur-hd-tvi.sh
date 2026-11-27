#!/bin/bash
# manim/poste2/fraicheur-hd-tvi.sh
#
#   bash manim/poste2/fraicheur-hd-tvi.sh
#
# ⛔⛔ UN HD NE SAIT PAS QUE SON SCRIPT A BOUGE (lecon du 26/11, repayee le 27 sur les
# planches -ql : deux fois dans la meme journee, un artefact credible montrant un etat
# du code qui n'existait plus). On compare donc la date du MP4 de sortie a celle du
# script Manim qui l'a produit -- et, comme le fait `fraicheur-hd.sh`, a la date du
# dernier COMMIT de ce script, un script modifie mais pas encore commite comptant par
# la date de son fichier.
#
# ⭐ POURQUOI UN SECOND FICHIER plutot qu'une ligne de plus dans `fraicheur-hd.sh` :
# celui-la est code en dur pour les 12 shorts de la serie ESPACE, qui est en
# production. On n'etend pas l'outil d'une autre serie ; on ecrit le sien, sur le meme
# modele. (Meme raison que `analyse_ecrans.py` vs `espace_ecrans.py`.)
#
# ⭐ ET IL COMPARE AUSSI LA VOIX ET LE SOCLE, comme `fraicheur-planches.py` : une
# correction dans `analyse_ecrans.py` perime les CINQ HD d'un coup, et c'est le cas le
# plus facile a oublier parce qu'on pense a son episode, pas a l'outil commun.
#
# ⚠️ Il ne regarde que les DATES. Un HD frais peut etre mauvais ; un HD perime est
# forcement a refaire. Il dit « a refaire », jamais « c'est bon ».
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
SOCLE=manim/poste2/analyse_ecrans.py
printf "%-24s %-14s %-14s %-9s %s\n" "episode" "script" "mp4 HD" "duree" "etat"
perimes=0
for e in "continuite_reconnaitre|continuite-reconnaitre|terminale-continuite-reconnaitre" \
         "tvi_appliquer|tvi-appliquer|terminale-tvi-appliquer" \
         "tvi_unicite|tvi-unicite|terminale-tvi-unicite" \
         "tvi_rediger|tvi-rediger|terminale-tvi-rediger" \
         "tvi_defi|tvi-defi|terminale-tvi-defi"; do
  IFS='|' read -r py slug voix <<< "$e"
  s="manim/scripts/terminale/$py.py"
  m="manim/sorties/terminale/maths/analyse/$slug/eleveai-maths-$voix.mp4"
  j="manim/voix/$voix.json"
  # la date de reference : le plus recent du script (commit ou fichier), du socle, de la voix
  ts=$(git log -1 --format=%ct -- "$s" 2>/dev/null); ts=${ts:-0}
  for f in "$s" "$SOCLE" "$j"; do
    [ -f "$f" ] || continue
    tf=$(stat -c %Y "$f"); [ "$tf" -gt "$ts" ] && ts=$tf
  done
  if [ ! -f "$m" ]; then
    printf "%-24s %-14s %-14s %-9s %s\n" "$py" "$(date -d @$ts '+%d/%m %H:%M')" "-" "-" "PAS DE HD"
    continue
  fi
  tm=$(stat -c %Y "$m")
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$m" 2>/dev/null)
  d=$(printf "%.0f" "${d:-0}")
  if [ "$tm" -ge "$ts" ]; then etat="a jour"; else etat="!! PERIME"; perimes=$((perimes+1)); fi
  printf "%-24s %-14s %-14s %-9s %s\n" "$py" "$(date -d @$ts '+%d/%m %H:%M')" \
         "$(date -d @$tm '+%d/%m %H:%M')" "$((d/60))m$((d%60))s" "$etat"
done
echo "--- $perimes HD perime(s). La duree doit valoir celle de la voix (6 a 8 min), pas 1 min 30."
