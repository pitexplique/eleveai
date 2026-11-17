#!/bin/bash
# 4e_hd_shorts.sh — EleveAI, 2e poste (17/11/2026).
#
# Re-rend en HD les 20 SHORTS de 4e après la correction de la poignée cachée
# (Ti-Margo retiré de l'écran 04-commentaire), et contrôle chacun dans la foulée.
#
# ⛔ À ne lancer QUE lorsque les sessions 3e ont fini : chaque rendu prend le verrou
#    commun `%TEMP%/eleveai-rendu-hd.lock`, un seul rendu HD à la fois sur la machine.
#    `4e_hd.sh` attend le verrou tout seul (il ne tue jamais un rendu en cours).
#
# Chaque épisode : rendu -qh en 1080×1920, copie dans sa sortie, durée, contrôle des
# bords (fait par `4e_hd.sh`), puis contrôle de la zone de Ti-Margo sur le MP4 FINAL.
#
# Lancer en arrière-plan (compter ~2 h) :  bash manim/poste2/4e_hd_shorts.sh
set -u
cd /c/Users/acade/Documents/eleveai/eleveai-app
export PYTHONIOENCODING=utf-8

# épisode|scène|dossier de sortie|nom du MP4|clé de log|résolution (vide = paysage)
LOT="
4e_volume_lien_aire_short|ShortVolumeLienAire4e|4e/maths/volume/11-volume-lien-aire|eleveai-maths-4e-volume-lien-aire-short|v1-short|1080,1920
4e_volume_pyramide_short|ShortVolumePyramide4e|4e/maths/volume/12-volume-pyramide|eleveai-maths-4e-volume-pyramide-short|4e-volume-pyramide-short|1080,1920
4e_volume_cone_short|ShortVolumeCone4e|4e/maths/volume/13-volume-cone|eleveai-maths-4e-volume-cone-short|v3-short|1080,1920
4e_volume_defi_short|ShortVolumeDefi4e|4e/maths/volume/14-volume-defi|eleveai-maths-4e-volume-defi-short|v4-short|1080,1920
4e_solides_reconnaitre_short|ShortSolidesReconnaitre4e|4e/maths/solides/15-solides-reconnaitre|eleveai-maths-4e-solides-reconnaitre-short|s1-short|1080,1920
4e_solides_vues_short|ShortSolidesVues4e|4e/maths/solides/16-solides-vues|eleveai-maths-4e-solides-vues-short|s2-short|1080,1920
4e_solides_perspective_short|ShortSolidesPerspective4e|4e/maths/solides/17-solides-perspective|eleveai-maths-4e-solides-perspective-short|s3-short|1080,1920
4e_patron_pyramide_short|ShortPatronPyramide4e|4e/maths/solides/18-patron-pyramide|eleveai-maths-4e-patron-pyramide-short|s4-short|1080,1920
4e_section_comprendre_short|ShortSectionComprendre4e|4e/maths/solides/19-section-comprendre|eleveai-maths-4e-section-comprendre-short|s5-short|1080,1920
4e_solides_defi_short|ShortSolidesDefi4e|4e/maths/solides/20-solides-defi|eleveai-maths-4e-solides-defi-short|s6-short|1080,1920
4e_perimetre_polygones_short|ShortPerimetrePolygones4e|4e/maths/perimetre/21-perimetre-polygones|eleveai-maths-4e-perimetre-polygones-short|p1-short|1080,1920
4e_perimetre_cercle_short|ShortPerimetreCercle4e|4e/maths/perimetre/22-perimetre-cercle|eleveai-maths-4e-perimetre-cercle-short|p2-short|1080,1920
4e_perimetre_figure_composee_short|ShortPerimetreFigureComposee4e|4e/maths/perimetre/23-perimetre-figure-composee|eleveai-maths-4e-perimetre-figure-composee-short|p3-short|1080,1920
4e_perimetre_probleme_short|ShortPerimetreProbleme4e|4e/maths/perimetre/24-perimetre-probleme|eleveai-maths-4e-perimetre-probleme-short|p4-short|1080,1920
4e_perimetre_defi_short|ShortPerimetreDefi4e|4e/maths/perimetre/25-perimetre-defi|eleveai-maths-4e-perimetre-defi-short|p5-short|1080,1920
4e_aire_rectangle_carre_short|ShortAireRectangleCarre4e|4e/maths/aire/26-aire-rectangle-carre|eleveai-maths-4e-aire-rectangle-carre-short|a1-short|1080,1920
4e_aire_disque_short|ShortAireDisque4e|4e/maths/aire/27-aire-disque|eleveai-maths-4e-aire-disque-short|a2-short|1080,1920
4e_aire_figure_composee_short|ShortAireFigureComposee4e|4e/maths/aire/28-aire-figure-composee|eleveai-maths-4e-aire-figure-composee-short|a3-short|1080,1920
4e_aire_probleme_short|ShortAireProbleme4e|4e/maths/aire/29-aire-probleme|eleveai-maths-4e-aire-probleme-short|a4-short|1080,1920
4e_aire_defi_short|ShortAireDefi4e|4e/maths/aire/30-aire-defi|eleveai-maths-4e-aire-defi-short|a5-short|1080,1920
4e_solides_perspective|SolidesPerspective4e|4e/maths/solides/17-solides-perspective|eleveai-maths-4e-solides-perspective|s3|
"

n=0
echo "=== RE-RENDU HD DE LA 4e : 20 SHORTS + 1 PAYSAGE ==="
# ⛔ `<<<` et non un tube : derrière un tube, la boucle tourne dans un SOUS-SHELL,
# et le `exit 1` en cas d'échec n'arrêterait que lui — le lot continuerait à l'aveugle.
while IFS='|' read -r script scene dossier nom cle res; do
  [ -z "${script:-}" ] && continue
  n=$((n + 1))
  echo
  echo "--- [$n/21] $nom"
  bash manim/poste2/4e_hd.sh "manim/scripts/4e/$script.py" "$scene" "$nom" \
       "manim/scripts/4e/media-hd-$cle" "manim/sorties/$dossier" ${res:+"$res"} || {
    echo "⛔ ECHEC sur $nom — on s'arrête là plutôt que d'enchaîner à l'aveugle"; exit 1; }
  python manim/poste2/verifier-zone-margo.py "manim/sorties/$dossier/$nom.mp4" --pas 0.4 \
    | sed -n '2p'
done <<< "$LOT"
echo
echo "=== LOT TERMINE ==="
echo "Ensuite : python manim/poste2/manifeste-4e.py, puis python manim/poste2/apercu-serie.py"
