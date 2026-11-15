# Coach 5e : ce qu'il faudra brancher (2e poste → 1er poste, à la fusion)

Le 2e poste ne touche ni aux banques du coach, ni à `manifeste-youtube.json`, ni à `lib/videos/*.json`.
Le 1er poste branchera, après la fusion et la mise en ligne R2 (⚠️ ce poste n'a pas les clés R2 : voir `videos-r2-5e.json`) :
`node scripts/brancher-videos-coach.mjs --id 5e-<micro en tirets>,5e-<micro en tirets>-short --ecrire`.

| Notion (`notionId`) | Micro (`microId`) | id paysage | id short | État |
|---|---|---|---|---|
| `aire_surface` | `aire_comprendre` | `5e-aire-comprendre` | `5e-aire-comprendre-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `aire_surface` | `aire_triangle` | `5e-aire-triangle` | `5e-aire-triangle-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `aire_surface` | `aire_parallelogramme` | `5e-aire-parallelogramme` | `5e-aire-parallelogramme-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `aire_surface` | `aire_composer` | `5e-aire-composer` | `5e-aire-composer-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `aire_surface` | `aire_defi` | `5e-aire-defi` | `5e-aire-defi-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `volume_solide` | `patron_prisme_cylindre` | `5e-patron-prisme-cylindre` | `5e-patron-prisme-cylindre-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `volume_solide` | `volume_comprendre` | `5e-volume-comprendre` | `5e-volume-comprendre-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `volume_solide` | `volume_pave` | `5e-volume-pave` | `5e-volume-pave-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `volume_solide` | `volume_prisme` | `5e-volume-prisme` | `5e-volume-prisme-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `volume_solide` | `volume_cylindre` | `5e-volume-cylindre` | `5e-volume-cylindre-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `volume_solide` | `volume_assemblage` | `5e-volume-assemblage` | `5e-volume-assemblage-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 ; ⚠️ micro aussi en 6e |
| `volume_solide` | `volume_unite` | `5e-volume-unite` | `5e-volume-unite-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 ; ⚠️ micro aussi en 6e |
| `volume_solide` | `volume_defi` | `5e-volume-defi` | `5e-volume-defi-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `grandeur_conversion` | `conversion_decimal` | `5e-conversion-decimal` | `5e-conversion-decimal-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `grandeur_conversion` | `conversion_duree` | `5e-conversion-duree` | `5e-conversion-duree-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `grandeur_conversion` | `conversion_avant_calcul` | `5e-conversion-avant-calcul` | `5e-conversion-avant-calcul-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |
| `grandeur_conversion` | `conversion_coherence` | `5e-conversion-coherence` | `5e-conversion-coherence-short` | ✅ HD + short rendus et contrôlés (15/11), miniatures faites ; pas sur R2 |

## Métiers
Les 8 métiers de la matrice 5e pris dans la série (maçonne, agriculteur, technicienne en énergies renouvelables,
logisticien, ingénieur de l'eau, pâtissière, pharmacien, cheffe cuisinière) : `lib/matrice/metiers-college.ts`
n'a pas de lignes 5e, donc rien à marquer `V` pour l'instant.
