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
- ✅ Short rendu : 65 s, 1080 × 1920, avec son ; images contrôlées (cotes sur cartouche, « 6 m² » écarté de « 3 m »). Paysage -ql : `verifier-bords-video.py` = 0.
- Aperçu pour Frédéric : `manim/sorties/5e/maths/aire/02-triangle/apercu.html` (+ copie du -ql), servi par la config `sorties-video` de `.claude/launch.json` (port 3900) → `http://localhost:3900/5e/maths/aire/02-triangle/apercu.html`. Vidéos SANS autoplay (en pause). ⛔ Une page `file:///` ne charge pas les vidéos dans le volet : passer par ce serveur.
- ✅ Commit 586ffab01 (47 fichiers, par chemin, pas poussé).
- ✅ **Pilote VALIDÉ par Frédéric le 15/11 (« Oui, lance la suite »).** HD fait : 202,65 s, `verifier-bords` = 0.

## Production de la série Aire (15/11, après le oui du pilote)
Outils du poste (dans le dépôt) : `manim/poste2/5e_hd.sh <script.py> <Scène> <nom> <media_dir> <sortie>` (verrou
`%TEMP%/eleveai-rendu-hd.lock`, `-qh --disable_caching`, copie, durée, `verifier-bords`), `manim/poste2/5e_film.sh 5e-aire <ep>`
(short sous le même verrou), `manim/poste2/5e_planche.sh <mp4> <png> <colonnes> t1 t2 …` (planche à relire avec Read).
Chaîne d'un micro : WAV (2 fichiers) → marques → `ti-margo-cues.py 5e-aire <ep>` → script paysage → dry run AUDIT=1 BORDS=1
jusqu'à 0 AVANCE / RETARD / TARD / BORD (les `AUDIT-ABSENT « 974 »` et « 2400 » sont normaux) → HD → planche aux fins
d'écran (temps `ECRAN … t=` du dry run, moins 1 s) → corriger → HD à nouveau ; short : film JS → `CONTROLE=<dir> node
scripts/ti-margo-short.mjs 5e-aire <ep> controle t…` → images relues → `5e_film.sh`.
Leçons : `au_mot("extrait")` attend la FIN de l'extrait (extraits courts, finissant au mot à montrer ; `au_mot(x, n)` = n-ième) ;
un texte n'écrit que des mots DITS (« Soraya coupe », pas « Elle coupe ») ; une figure de question longue à poser se pose AVANT
`question_gauche` (sinon TARD sur le 1er mot) ; `couper={i: (début, fin)}` pour toute ligne de réponse qui commence par un nombre.
Dans les shorts, `pgPoly pgTrait pgLigne pgEtiquette` sont dans `films/5e-aire.js` (le seul fichier chargé avec le film) ;
Ti Margo cache le bas du milieu-gauche de l'ardoise : dessins en haut, ou à DROITE jusqu'en bas.

| Micro | Paysage (scène) | État paysage | Short | État short |
|---|---|---|---|---|
| A1 aire_comprendre | `5e_aire_comprendre.py` `AireComprendre5e` (jaune, Q 01:05 A, 01:55 C) | ✅ HD 230 s, bords 0, planche relue | `5e-aire-comprendre.js` « La pizza carrée » (B) | ✅ rendu 66,8 s |
| A2 aire_triangle | pilote | ✅ HD 202,65 s | « Le pignon de la cabane » (C) | ✅ |
| A3 aire_parallelogramme | `5e_aire_parallelogramme.py` `AireParallelogramme5e` (verte, Q 01:02 C, 01:47 B) | ✅ HD 213 s, bords 0 ; 2e HD relu à 52 s (cote « 4 cm » flottante corrigée) | `5e-aire-parallelogramme.js` « Le coup de ciseaux » (A) | ✅ rendu |
| A4 aire_composer | `5e_aire_composer.py` `AireComposer5e` (verte, Q 01:06 A, 01:53 B) | ✅ HD 221 s, bords 0 ; 3e HD relu (question 01 écartée, trait de coupe effacé, piège descendu, Q2 remontée) | `5e-aire-composer.js` « La pancarte maison » (C) | ✅ rendu |
| A5 aire_defi | — | ⏳ WAV, marques, cues FAITS ; script à écrire (Mehdi menuisier, bleue, B·C) | « Le tapis trop large » (A) | ⏳ |

✅ **Compteur des shorts (15/11)** : le rebours de 3 s ne s'affichait dans AUCUN short (bug du socle `short.js` l. 135,
`''` au lieu de `'block'`). Le chef d'orchestre a corrigé le socle. Décision de Frédéric : « on refait les shorts de 5° mais pas
les autres ». Les 4 shorts Aire sont refaits et contrôlés sur le MP4 : barre entière, carte dans le cadre, « Mets pause » visible.
⭐ Pour chaque nouveau short : contrôler le compteur sur le MP4 (début de 02-question + durée + 0,1 s, pendant 3 s).
⚠️ Ne jamais arrêter une file de rendus en plein film : le node orphelin échoue au mixage du son et laisse le verrou pris.

⚠️ Vérifier au début de la session suivante : `ls manim/sorties/5e/maths/aire/0*/` (chaque dossier : paysage + short + `_muet.mp4`),
et `python scripts/verifier-bords-video.py` sur les deux HD relancés. Les MP4 et WAV sont ignorés par git (normal).

## Prochaine étape (session suivante)
1. Contrôles ci-dessus ; puis A5 `aire_defi` (paysage + short).
2. Série Volume (8 micros), puis Conversions (4) : même chaîne. Nouvelle série de shorts : `films/5e-volume.json`
   (+ `5e-volume.js`, cues), `films/5e-conversion.json` (voir le tableau en tête de `VOIX-5e-aire-volume.md`).
3. Miniatures (« Dessin animé » pour les shorts), `manim/poste2/manifeste-5e.json`, R2 si `.env.local` a les clés
   (sinon noter dans `manim/poste2/videos-r2-5e.json`), `coach-5e.md`, cocher le plan. Commit par chemin, jamais de push.
4. Aperçu pour Frédéric : comme le pilote (`manim/sorties/…/apercu.html` servi par la config `sorties-video`, port 3900), EN PAUSE.

### Prompt de reprise (à coller dans une nouvelle session)
« 2e poste, branche `poste2`, série 5e Aire, volume, conversions. Lis `manim/REPRISE-5e-aire-volume.md` en entier, puis
`manim/poste2/VOIX-5e-aire-volume.md` (voix validées : ne pas les retoucher). Fais les contrôles de la section « Production »,
puis enchaîne `aire_defi`, les 8 Volume et les 4 Conversions avec la chaîne décrite, un HD à la fois, planche relue avant
chaque HD final. Ne pousse jamais ; commit par chemin ; ne touche ni aux fichiers partagés ni aux fichiers des autres sessions
(`manim/scripts/premiere/`, `terminale/`…). Au-delà de 65 % de contexte, mets cette reprise à jour et demande une nouvelle session. »
