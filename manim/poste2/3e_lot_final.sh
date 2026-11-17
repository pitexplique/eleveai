#!/bin/bash
# 3e_lot_final.sh — ⛔⛔ PLUS AUCUN RENDU DE 3e N'EST NÉCESSAIRE (17/11).
#
# Ce script avait été écrit pour réunir deux motifs de re-rendu. Les deux sont tombés, chacun
# démonté par une mesure, et il ne reste RIEN à rendre :
#
#   1. « sept MP4 périmés » — FAUX. Je les avais datés contre le COMMIT de leur script, or un
#      commit enregistre un contenu sans l'écrire (mes huit shorts : écrits 07:18:40 en une
#      passe, commités ensemble 07:32:13). Preuve :
#          python -X utf8 -I manim/poste2/verifier-fraicheur-mp4.py --serie 3e
#          → 16 MP4 : 16 prouvés à jour, 0 douteux.
#
#   2. « la coche manque à neuf scripts » — VRAI dans le source, SANS EFFET à l'image. Mesuré
#      ligne par ligne : huit des neuf sont loin sous le seuil où le ✓ mord (paysages 2,0–3,4
#      pour un seuil de 4,16 ; shorts 1,8–2,4 pour 2,70). Le neuvième dépasse, mais sur un choix
#      qui n'est jamais la bonne réponse : le ✓ ne s'y pose pas. Sur les seize MP4, l'écart va de
#      20 à 449 px, le plus serré à 73 px.
#
# ⭐ La leçon commune aux deux : « la surcharge manque » et « le MP4 est plus vieux que le commit »
#    décrivent le SOURCE ; « le ✓ touche » et « le MP4 ne correspond pas au script rendu »
#    décrivent le RÉSULTAT. Seul le résultat est un défaut, et il se mesure.
#
# Les lignes de rendu sont conservées plus bas, commentées : si un rendu redevient nécessaire,
# les chemins, les noms de scène et les dossiers de sortie sont justes, et la garde CRLF aussi.
# ⛔ Ne rien dé-commenter sans avoir d'abord mesuré le défaut à l'image.

if grep -q $'\r' "$0" 2>/dev/null; then exec bash <(tr -d '\r' < "$0") "$@"; fi

cd /c/Users/acade/Documents/eleveai/eleveai-app || exit 1
H=manim/poste2/4e_hd.sh
S=manim/scripts/4e
V=manim/sorties/3e/maths
rendu() { echo "=== $3"; bash $H "$@"; }

# ── Les 5 PAYSAGES (périmés et/ou coche à refaire) ───────────────────────────
# rendu $S/3e_volume_boule.py             VolumeBoule3e             eleveai-maths-3e-volume-boule             $S/media-hd-t1 $V/volume/31-volume-boule
# rendu $S/3e_volume_reduction_section.py VolumeReductionSection3e  eleveai-maths-3e-volume-reduction-section $S/media-hd-t2 $V/volume/32-volume-reduction-section
# rendu $S/3e_section_cylindre.py         SectionCylindre3e         eleveai-maths-3e-section-cylindre         $S/media-hd-t4 $V/sections/34-section-cylindre
# rendu $S/3e_section_sphere.py           SectionSphere3e           eleveai-maths-3e-section-sphere           $S/media-hd-t6 $V/sections/36-section-sphere
# rendu $S/3e_section_longueur.py         SectionLongueur3e         eleveai-maths-3e-section-longueur         $S/media-hd-t7 $V/sections/37-section-longueur

# ── Les 6 SHORTS (périmés et/ou coche à refaire) ─────────────────────────────
# rendu $S/3e_volume_boule_short.py             ShortVolumeBoule3e            eleveai-maths-3e-volume-boule-short             $S/media-hd-t1s $V/volume/31-volume-boule 1080,1920
# rendu $S/3e_volume_reduction_section_short.py ShortVolumeReductionSection3e eleveai-maths-3e-volume-reduction-section-short $S/media-hd-t2s $V/volume/32-volume-reduction-section 1080,1920
# rendu $S/3e_section_pave_cube_short.py        ShortSectionPaveCube3e        eleveai-maths-3e-section-pave-cube-short        $S/media-hd-t3s $V/sections/33-section-pave-cube 1080,1920
# rendu $S/3e_section_cylindre_short.py         ShortSectionCylindre3e        eleveai-maths-3e-section-cylindre-short         $S/media-hd-t4s $V/sections/34-section-cylindre 1080,1920
# rendu $S/3e_section_cone_pyramide_short.py    ShortSectionConePyramide3e    eleveai-maths-3e-section-cone-pyramide-short    $S/media-hd-t5s $V/sections/35-section-cone-pyramide 1080,1920
# rendu $S/3e_section_sphere_short.py           ShortSectionSphere3e          eleveai-maths-3e-section-sphere-short           $S/media-hd-t6s $V/sections/36-section-sphere 1080,1920

echo "=== LOT FINAL 3e TERMINE (11 rendus)"

# ─────────────────────────────────────────────────────────────────────────────
# CE QUI N'EST PAS DANS CE LOT, ET POURQUOI
#   paysages T3, T5, T8 : MP4 de 12 h 2x, postérieurs au dernier commit qui touche leur
#     script (`6d47f3b3a`, 07:32), et ils ont déjà `_carte_choix`. À jour.
#   shorts T7, T8 : MP4 de 12:19 et 12:20, et ils ont déjà la surcharge `_carte`. À jour.
#
# LES 9 SCRIPTS À CORRIGER AVANT DE LANCER (la coche)
#   paysages (surcharge `_carte_choix`, comme 3e_section_pave_cube.py) :
#     3e_volume_boule.py · 3e_volume_reduction_section.py · 3e_section_cylindre.py ·
#     3e_section_sphere.py · 3e_section_longueur.py
#   shorts (surcharge `_carte`, comme 3e_section_pave_cube_short.py) :
#     3e_volume_boule_short.py · 3e_section_cylindre_short.py ·
#     3e_section_cone_pyramide_short.py · 3e_section_sphere_short.py
#   ⚠️ En PAYSAGE la carte vient de `_carte_choix`, dans un SHORT de `_carte` : surcharger
#      l'une pour l'autre ne fait rien du tout, et ça ne se voit qu'à l'image.
#   ⚠️ Ce n'est pas la longueur du libellé qui décide, c'est la largeur de la carte :
#      on applique la surcharge partout, les libellés courts ne bougent pas.
