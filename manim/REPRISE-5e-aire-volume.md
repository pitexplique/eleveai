# Reprise : série 5e « Aire, volume et conversions » (2e poste, branche `poste2`)

Plan cochable : `manim/PLAN-perimetre-aire-volume.md`, section « ## 5E » (17 micros). Le 1er poste produit le CM2 et la 6e en même temps.

## Règles propres au 2e poste
- Branche `poste2` UNIQUEMENT, jamais de push : le 1er poste fusionne.
- ⛔ Ne pas toucher : `manim/manifeste-youtube.json`, `lib/videos/videos-r2.json`, `lib/videos/bilans-videos.json`, `lib/videos/mots-videos.json`, les banques du coach. Les ajouts vont dans `manim/poste2/` : `manifeste-5e.json`, `videos-r2-5e.json`, `coach-5e.md`.
- Fichiers à moi : `manim/scripts/5e/…` ou `manim/5e_…`, `manim/voix/5e-…`, médias `5e_…`.
- YouTube : rien programmé d'ici. R2 : seulement si les clés R2 de `.env.local` et le script marchent ; sinon MP4 dans `manim/sorties/` et note dans `videos-r2-5e.json`.
- Commit PAR CHEMIN (`git commit -- <chemins>`), gros lots, deux fois par jour au plus.
- Ne jamais lancer la lecture d'une vidéo : aperçu en pause.

## Les 3 notions
| notionId | Banque | Micros |
|---|---|---|
| `aire_surface` | `5e/maths/aires.bank.ts` | `aire_comprendre`, `aire_triangle`, `aire_parallelogramme`, `aire_composer`, `aire_defi` |
| `volume_solide` | `volumes.bank.ts` + `patron-prisme-cylindre.bank.ts` | `patron_prisme_cylindre`, `volume_comprendre`, `volume_pave`, `volume_prisme`, `volume_cylindre`, `volume_assemblage`, `volume_unite`, `volume_defi` |
| `grandeur_conversion` | `conversions.bank.ts` | `conversion_decimal`, `conversion_duree`, `conversion_avant_calcul`, `conversion_coherence` |

Fiches : `lib/fiches/maths-5e-aires.tsx`, `maths-5e-volumes.tsx`, `maths-5e-conversions.tsx` (pas de fiche pour le patron : la banque fait foi).

## Où on en est (15/11/2026)
- ✅ Les 34 voix écrites dans UN fichier : `manim/poste2/VOIX-5e-aire-volume.md` (tableau métiers / ceintures / lettres / centres en tête).
- ✅ **VALIDÉES par Frédéric le 15/11 (« Oui, valide les 34 »)**, `aire_comprendre` compris (il n'a pas demandé de renvoyer à la CM2 : on la fait). ⛔ Ne plus les retoucher sans lui.
- ✅ Recopiées en `manim/voix/5e-<micro en tirets>(-short).json` (34 fichiers ; clés paysage `00-garde … 10-abonne`, short `00-accroche … 05-abonne`).
- Métiers : `lib/matrice/metiers-college.ts` n'a que la 6e et la 4e → rien à marquer `V` en 5e (comme au CM2).

## Le PILOTE `aire_triangle` (15/11)
- WAV : `public/sons/5e-aire-triangle/` et `…-short/` (Julie, débit −6 : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/5e-aire-triangle.json -Debit -6`).
- Marques : `python manim/scripts/5e/aire_volume_5e_marques.py aire-triangle aire-triangle-short` → `manim/scripts/5e/5e_<slug>_marques.json` (⛔ jamais sans argument).
- Commun : `manim/scripts/5e/aire_volume_5e_commun.py` (importe le commun CM2 sans le modifier ; `Paysage5e`, les 17 personnages `awa5 ibrahim soraya leila mehdi gael tiago yuna maia hakim chloe5 fanta jonas samir lena lucie ana`, `tri`, `equerre`, `cote(..., fond=True)` = cartouche sombre pour une étiquette posée SUR une figure, `sur_fond`, `triangle_hb`, `fleurs`).
- Paysage : `manim/scripts/5e/5e_aire_triangle.py`, scène `AireTriangle5e` (verte). Dry run AUDIT=1 BORDS=1 : 0 AUDIT-AVANCE, 0 RETARD, 0 TARD, 0 BORD. Questions : 00:55 B, 01:40 A. Durée 3 min 22.
  - Questions : figure posée AVANT la question avec `avant_q=` (et non `autres_q=`, qui la pose après les choix).
  - Aperçu -ql : `manim/scripts/5e/media-5e-aire-triangle/videos/5e_aire_triangle/480p15/eleveai-maths-5e-aire-triangle.mp4` (⛔ dossier media jamais commité).
- Short : série `prototypes/ti-margo/films/5e-aire.json` (+ `5e-commun.js` = copie de `cm2-commun.js`, `5e-aire.js`, `5e-aire-cues.js`), film `films/5e-aire-triangle.js` « Le pignon de la cabane » (Q C, 6 m²). Cues : `python scripts/ti-margo-cues.py 5e-aire triangle`. Rendu : `node scripts/ti-margo-short.mjs 5e-aire triangle film` → `manim/sorties/5e/maths/aire/02-triangle/eleveai-maths-5e-aire-triangle-short.mp4`.
- ⏳ **En attente de la validation du pilote par Frédéric** (aperçu ouvert EN PAUSE). Pas de HD, pas de miniature, rien au manifeste.

## Prochaine étape (après le oui du pilote)
1. Recopier les voix validées en `manim/voix/5e-<notion>-<ep>(-short).json` (clés paysage `00-garde … 10-abonne`, short `00-accroche … 05-abonne`, comme le CM2).
2. Marquer `V` sur les 8 métiers de la matrice pris (maçonne, agriculteur, technicienne énergies renouvelables, logisticien, ingénieur de l'eau, pâtissière, pharmacien, cheffe cuisinière) — ⚠️ `lib/matrice/metiers-college.ts` est peut-être touché par le 1er poste (6e) : vérifier, sinon noter dans `coach-5e.md` pour la fusion.
3. PILOTE `aire_triangle` : WAV (Julie, débit −6), marques, script paysage Manim sur le modèle `manim/scripts/cm2/aire_cm2_commun.py` (ceintures importées de `scripts/seconde/signes_expression_2de.py`), dry run AUDIT=1 BORDS=1 (0 AUDIT-AVANCE, 0 RETARD), rendu `-ql`, planche ; short Ti Margo (`prototypes/ti-margo/LISEZ-MOI.md`, série `films/5e-aire.json`) en aperçu. Montrer à Frédéric, aperçu EN PAUSE.
4. Seulement après la validation du pilote : les 16 autres, puis HD un par un (verrou HD), `verifier-bords-video.py` = 0, miniatures (« Dessin animé » pour les shorts), entrées `manim/poste2/manifeste-5e.json`, R2 ou note, `coach-5e.md`.
5. Cocher le plan, commit par chemin, jamais de push.
