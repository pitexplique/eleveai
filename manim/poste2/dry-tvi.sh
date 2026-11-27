#!/bin/bash
# Le dry run des 5 episodes de la serie « CONTINUITE ET TVI », terminale spe.
#
#   bash manim/poste2/dry-tvi.sh            # les cinq
#   bash manim/poste2/dry-tvi.sh tvi_defi   # un seul
#
# ⛔⛔ PYTHONIOENCODING=utf-8 : sans lui, Manim ecrit de l'Unicode sur une console
# Windows en cp1252 et le rendu meurt en UnicodeEncodeError. Le 27/11, cinq rendus ont
# echoue ainsi EN SILENCE et l'outil de planche a refabrique cinq images a partir de
# MP4 vieux de cinq heures. La meme garde vaut ici.
#
# ⚠️ `grep "^ECRAN"` SOUS-COMPTE : les signalements tombent sur les barres de
# progression de Manim, qui se terminent par \r. On eclate les \r en \n et on compte
# SANS ancre. Mesure du 27/11 : le grep ancre annoncait 14 ecrans, 0 question, 0 audit ;
# le vrai compte etait 15, 2 et 1.
#
# ⭐⭐ LE COMPTE D'ECRANS EST UN CONTROLE A PART ENTIERE : 15, pas 14, pas 11. Un
# `au_mot` introuvable arrete la scene en silence pour `verifier-avant-rendu.py`, qui ne
# lit que les appels LITTERAUX et ne voit pas un extrait passe par une liste (E4 et E5
# nourrissent leurs ecrans par des listes de couples). Le 27/11, E5 s'est arrete a 11
# ecrans sur 15 sans que le controleur statique dise quoi que ce soit.
#
# ⭐ CE QUE CES QUATRE COMPTEURS VEULENT DIRE, MAINTENANT QUE LES WAV EXISTENT :
#   MARQUES      — doit etre present. « SANS MARQUES » = fichier_marques pas pose, et
#                  alors tous les au_mot sont ESTIMES : le dry run ne mesure plus rien.
#   AUDIT-AVANCE — un nombre AFFICHE avant que la voix le dise. Doit etre 0.
#   AUDIT-ABSENT — un nombre a l'ecran que la voix ne dit jamais. Doit etre 0.
#   RETARD       — l'animation est en retard de plus de 0,3 s sur la voix. A lire une
#                  par une : c'est ce que personne n'avait encore vu avant les WAV.
#   AUDIT-TARD   — un nombre ecrit plus de 0,4 s apres son dernier dit. Informatif.
export PYTHONIOENCODING=utf-8
cd "$(dirname "$0")/../.." || exit 1
set -u
CIBLE="${1:-}"
mkdir -p manim/poste2/dry-tvi
i=0
for couple in "continuite_reconnaitre:ContinuiteReconnaitre" "tvi_appliquer:TviAppliquer" \
              "tvi_unicite:TviUnicite" "tvi_rediger:TviRediger" "tvi_defi:TviDefi"; do
  i=$((i+1))
  script="${couple%%:*}"; scene="${couple##*:}"
  [ -n "$CIBLE" ] && [ "$CIBLE" != "$script" ] && continue
  brut="manim/poste2/dry-tvi/e$i-$script.log"
  txt="manim/poste2/dry-tvi/e$i-$script.txt"
  AUDIT=1 BORDS=1 python -m manim render -ql --disable_caching --dry_run \
    "manim/scripts/terminale/$script.py" "$scene" \
    --media_dir manim/scripts/terminale/media > "$brut" 2>&1
  code=$?
  tr "\r" "\n" < "$brut" > "$txt"
  ecrans=$(grep -c "ECRAN " "$txt")
  marques=$(grep -c "MARQUES " "$txt")
  sans=$(grep -c "SANS MARQUES" "$txt")
  avance=$(grep -c "AUDIT-AVANCE" "$txt")
  absent=$(grep -c "AUDIT-ABSENT" "$txt")
  tard=$(grep -c "AUDIT-TARD" "$txt")
  retard=$(grep -c "RETARD " "$txt")
  bords=$(grep -c "BORD " "$txt")
  quest=$(grep -c "QUESTION " "$txt")
  etat="OK"
  [ "$code" -ne 0 ] && etat="ECHEC(code $code)"
  [ "$ecrans" -ne 15 ] && etat="ECHEC($ecrans ecrans, attendu 15)"
  [ "$sans" -ne 0 ] && etat="ECHEC(SANS MARQUES : fichier_marques pas pose)"
  [ "$marques" -eq 0 ] && etat="ECHEC(aucune banniere MARQUES)"
  [ "$avance" -ne 0 ] && etat="A CORRIGER($avance AUDIT-AVANCE)"
  [ "$absent" -ne 0 ] && etat="A CORRIGER($absent AUDIT-ABSENT)"
  [ "$bords" -ne 0 ] && etat="A CORRIGER($bords bords)"
  printf "E%d %-24s %-34s ecrans %2s  questions %s  bords %s  AVANCE %s  ABSENT %s  RETARD %3s  TARD %3s\n" \
    "$i" "$script" "$etat" "$ecrans" "$quest" "$bords" "$avance" "$absent" "$retard" "$tard"
done
echo "--- les RETARD, un par un (c'est ce qu'on vient mesurer) ---"
grep -h "RETARD \|AUDIT-AVANCE\|AUDIT-ABSENT\|BORD " manim/poste2/dry-tvi/*.txt | sort | uniq -c | sort -rn | head -40
