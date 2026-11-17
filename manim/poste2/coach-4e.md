# Coach 4e : ce qu'il faudra brancher (2e poste → 1er poste, à la fusion)

Le 2e poste ne touche ni aux banques du coach, ni à `manifeste-youtube.json`, ni à
`lib/videos/*.json`. Le 1er poste branchera, après la fusion et la mise en ligne R2
(⚠️ ce poste n'a pas envoyé les fichiers : voir `videos-r2-4e.json`) :
`node scripts/brancher-videos-coach.mjs --id 4e-<micro en tirets>,4e-<micro en tirets>-short --ecrire`.

⭐ Les 20 épisodes couvrent les **30 micros de 4e**. 18 micros de 3e sont servis en plus
par les `aussi` ci-dessous : la 3e n'a RIEN à retourner dans ces familles.
Les 8 épisodes propres à la 3e (T1 à T8) sont suivis à part, dans
`manim/poste2/REPRISE-3e-sections.md`.

| Notion (`notionId`) | Micro (`microId`) | id paysage | id short | Aussi | État |
|---|---|---|---|---|---|
| `volume_solide` | `volume_lien_aire` | `4e-volume-lien-aire` | `4e-volume-lien-aire-short` | — | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `volume_solide` | `volume_pyramide` | `4e-volume-pyramide` | `4e-volume-pyramide-short` | 3e `volume_pyramide` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `volume_solide` | `volume_cone` | `4e-volume-cone` | `4e-volume-cone-short` | 3e `volume_cone` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `volume_solide` | `volume_defi` | `4e-volume-defi` | `4e-volume-defi-short` | 3e `volume_defi` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `vision_espace` | `vision_reconnaitre` | `4e-solides-reconnaitre` | `4e-solides-reconnaitre-short` | 3e `volume_solide_reconnaitre` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `vision_espace` | `vision_vues` | `4e-solides-vues` | `4e-solides-vues-short` | — | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `vision_espace` | `vision_representation` | `4e-solides-perspective` | `4e-solides-perspective-short` | 3e `volume_representation` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `vision_espace` | `patron_pyramide` | `4e-patron-pyramide` | `4e-patron-pyramide-short` | — | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `vision_espace` | `vision_section` | `4e-section-comprendre` | `4e-section-comprendre-short` | 3e `volume_section` · 3e `section_reconnaitre` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `vision_espace` | `vision_defi` | `4e-solides-defi` | `4e-solides-defi-short` | 3e `volume_geometrie_espace_defi` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_perimetre` | `aire_perimetre_comprendre` | `4e-perimetre-polygones` | `4e-perimetre-polygones-short` | 3e `aire_perimetre_comprendre` · 3e `aire_perimetre_polygone` · 4e `aire_perimetre_rectangle` · 4e `aire_perimetre_carre` · 4e `aire_perimetre_triangle` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_perimetre` | `aire_perimetre_figure` | `4e-perimetre-cercle` | `4e-perimetre-cercle-short` | 3e `aire_perimetre_cercle` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_perimetre` | `aire_perimetre_figure` | `4e-perimetre-figure-composee` | `4e-perimetre-figure-composee-short` | 3e `aire_perimetre_figure_composee` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_perimetre` | `aire_perimetre_probleme` | `4e-perimetre-probleme` | `4e-perimetre-probleme-short` | — | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_perimetre` | `aire_perimetre_defi` | `4e-perimetre-defi` | `4e-perimetre-defi-short` | 3e `aire_perimetre_defi` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_surface` | `aire_rectangle` | `4e-aire-rectangle-carre` | `4e-aire-rectangle-carre-short` | 4e `aire_carre` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_surface` | `aire_figure` | `4e-aire-disque` | `4e-aire-disque-short` | 3e `aire_disque` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_surface` | `aire_figure` | `4e-aire-figure-composee` | `4e-aire-figure-composee-short` | 3e `aire_figure_composee` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_surface` | `aire_probleme` | `4e-aire-probleme` | `4e-aire-probleme-short` | — | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |
| `aire_surface` | `aire_defi` | `4e-aire-defi` | `4e-aire-defi-short` | 3e `aire_defi` | ✅ HD + short rendus et contrôlés (17/11), bords à 0 ; ⏳ miniatures et R2 |

## Métiers (matrice)
Les 20 métiers de la série sont tous différents et aucun n'est repris de la série 5e.
À marquer `V` sur leur ligne dans `lib/matrice/metiers-college.ts` (section 4e) :
  Awen, monteuse de stands, Elsa, hydrologue, Enzo, pilote de drone, Hugo, paysagiste, Karim, architecte, Léa, technicienne en traitement de l'eau, Malo, glacier, Marc, pisciniste, Maya, dessinatrice de BD, Naïma, manipulatrice en radiologie, Nina, fabricante de tambours, Nour, géomètre-topographe, Noé, réparateur de smartphones, Ryan, imprimeur grand format, Salomé, carreleuse, Sonia, entraîneuse d'athlétisme, Thierry, éleveur, Tiago, fabricant de jeux, Yuna, animatrice 3D, Zahia, conceptrice de pistes

## Centres d'intérêt
`node scripts/verifier-centres-age.mjs manim/poste2/manifeste-4e.json` :
**0 centre hors tranche** sur les 40 vidéos (tranche 12-14 ans).
