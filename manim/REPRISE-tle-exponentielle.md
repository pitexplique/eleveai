# REPRISE — série « FONCTION EXPONENTIELLE », terminale spé (26/11/2026)

6 PAYSAGES Manim (pas de short, pas de dessin animé), un par micro de `fonction_exponentielle`.
Chef d'orchestre du jour : **local_9e2edcad-b434-4220-98b9-5db7e0f2b21a** (« 26/11 ») — l'ancien
local_700b3f43 est ARCHIVÉ, ne plus lui écrire.

## ✅ Fait (commits 6146029f1 → 7ec232569, rien poussé)

| pièce | état |
|---|---|
| voix des 6 épisodes | ✅ `manim/SCRIPTS-tle-exponentielle.md`, **validées par Frédéric le 26/11** (« Oui, valide ») |
| ceintures | ✅ validées : E1 orange · E2 orange · E3 verte · E4 verte · E5 bleue · E6 noire |
| lettres des questions | E1 04=B 07=C · E2 B,A · E3 C,B · E4 A,B · E5 C,A · E6 C,A (0=A,1=B,2=C) |
| JSON des voix | ✅ `manim/voix/terminale-exp-*.json` (extracteur `manim/poste2/voix-exp-depuis-md.py`) |
| WAV | ✅ `public/sons/terminale-exp-*/` (15 chacun, 26,1 min en tout, débit −6) |
| marques | ✅ `manim/scripts/terminale/exp_*_marques.json` — ⛔ convertisseur **COMMUN** `scripts/cues2marques.py` (WinRT double « 2x », « 3 donne » à 2 instants : celui de l'espace décalait tout E4) |
| socle | ✅ `manim/scripts/terminale/exp_commun.py` (testé sur une image fixe) |
| les 6 scènes | ⏳ **RIEN d'écrit** |

## Ce que le socle offre (lire le fichier, 400 lignes)

- `formule("C′(t) = 10(1 − t)e^{−t}", fs, couleur)` → la vraie puissance (exposant en petit et
  en hauteur), **aucun « ^ » affiché** (règle Frédéric 26/11). ⚠️ Text garde un glyphe par
  ESPACE : `colorer(f, motif, couleur)` compte les espaces. Pas de LaTeX sur le poste.
- `ExpBase(AuditSynchro, MotsCales, Notion6e)` : `fichier_marques`, `nom_voix`, `ceinture`,
  `titre`, `question_garde` à poser dans la sous-classe.
- `nouvel_ecran(cle)`, `au_mot(ext, n)`, `jusqua`, `montrer((ext, mob[, mode]), …)`, `lg(…)`,
  `col(…)`, `encadrer`, `insister`, `sans_audit`, `Graphe` (+ `graduation`), `personne(...)`.
- Écrans tout faits : `ecran_garde(ext_titre, exts_question)`, `ecran_question("04", lignes,
  choix, bonne, exts, lignes_reponse, figure=fn, croix=[(ext, k)])` (joue 04-question PUIS
  04b-reponse), `ecran_copie("08-rediger", titre, ext, lignes)`, `ecran_appris(points)`,
  `ecran_fin_2611()` (fin du 26/11, à la place de fin_commune).
- À écrire par épisode : 01-situation (personne + dessin de la situation), 02-idee,
  03-theoreme, 05-appliquer, 06-piege, 09-defi, 09b-correction (à la main, avec courbes).

## Le prochain geste

1. `manim/scripts/terminale/exp_definition.py`, classe `ExpDefinitionTerminale(ExpBase)`,
   `fichier_marques = "exp_definition_marques.json"`, `nom_voix = "terminale-exp-definition"`.
   En tête : le mapping clé de voix → écran (comme convexite_derivee_seconde.py), et des
   `assert` qui recalculent chaque nombre dit (e ≈ 2,72, e² ≈ 7,39, 2e ≈ 5,44, e^−1 ≈ 0,37…).
   **Chaque mot passé à `au_mot` doit exister dans la voix** (copier depuis le JSON).
2. Dry run : `AUDIT=1 BORDS=1 python -m manim render -ql --dry_run manim/scripts/terminale/exp_definition.py ExpDefinitionTerminale`
   → 0 RETARD, 0 AUDIT-AVANCE, 0 BORD (sauf @eleveai974).
3. Aperçu `-ql` → planche (`ffmpeg` une image toutes les ~4 s) **regardée** : rien de rogné,
   exposants en hauteur, aucun « ^ », barre du compte à rebours présente, lettre allumée = voix.
4. Les 5 autres sur le même modèle.
5. HD une par une (vérifier qu'aucun autre rendu ne tourne : `tasklist | grep -i python`, et
   ≥ 2,5 Go libres) :
   `python -m manim render -qh --disable_caching manim/scripts/terminale/exp_<micro>.py <Scene> -o eleveai-maths-terminale-exp-<micro-tirets> --media_dir manim/scripts/terminale/media-exp-<micro>`
   puis `python scripts/verifier-bords-video.py <mp4>` → 0 instant.
   Sortie : `manim/sorties/terminale/maths/analyse/exp-<micro>/`.
6. R2 (dossier de la série seulement), Content-Length = taille locale ; manifeste
   (`manim/manifeste-youtube.json`, commit PAR CLÉS : `manim/outils-commit-cles.py`, champ
   `questions` avec t / choix / reponse, `centres`) ; entrées à la main dans
   `lib/videos/videos-r2.json` (⛔ JAMAIS `generer-videos-r2.mjs`) ; `COUPE_PAR_VIDEO` de
   `components/LecteurVideo.tsx` (coupe dans la pause entre « point f r » et « ou »,
   mesurée dans CHAQUE MP4) ; lignes `notion_ressources` Supabase (bouton Vidéo du coach,
   clé = microId) ; feuille bilan si la série en a.
7. Rapport final au chef : les 6 tailles R2, les lignes notion_ressources, les sha.

⛔ Jamais `git add -A`, stash, reset, push, changement de branche. Ne jamais lancer la lecture
d'une vidéo. Relève à 65 % de contexte (écrire ici, puis lancer la session suivante).


## ⏩ ÉTAT au 26/11 ~16 h 50 (relève n° 2, contexte à 78 %)

| | scène | dry run | HD | bords | R2 | coupe |
|---|---|---|---|---|---|---|
| E1 definition | ✅ 74d0d98f8 | ✅ | ✅ 289,30 s · 18 285 315 o | ✅ 0 | ✅ Content-Length = local | 4,91 |
| E2 proprietes | ✅ (commit après 2e1d37504) | ✅ | ⏳ en file | | | |
| E3 deriver | ✅ 2e1d37504 + correction 01 | ✅ | ⏳ REFAIT en file (le 1er HD avait « battements / min » hors du moniteur) | | | |
| E4 equation_inequation | ✅ 2e1d37504 | ✅ | ⏳ en file | | | |
| E5 limite | ✅ 2e1d37504 | ✅ | ⏳ en file | | | |
| E6 defi | ✅ 2e1d37504 | ✅ | ⏳ en file | | | |

- Les rendus HD tournent en arrière-plan (lancés par la session précédente) via
  `manim/poste2/rendre2.sh <micro> <Classe> qh` (attend ≥ 2,5 Go libres, aucun autre rendu, et un verrou).
  ⚠️ Avant d'en lancer un : `tasklist | grep -i python` — ne JAMAIS en lancer deux.
  Un HD fini = `manim/scripts/terminale/media-exp-<micro-tirets>/videos/exp_<micro>/1080p60/…mp4`.
- Après chaque HD : `bash manim/poste2/finir.sh <micro>` (copie dans `manim/sorties/terminale/maths/analyse/exp-<micro-tirets>/`,
  vérifie les bords, donne durée, taille et les silences de fin). La coupe = le silence « fin − 4,99 → fin − 4,83 » : **4,91** (E1 et E3).
- Puis REGARDER une planche du HD (`bash manim/poste2/cibles.sh <mp4> <sortie.png> t1 t2 …` ou ffmpeg fps=1/6 tile=4x4) :
  E2 n'a JAMAIS été vue à l'image ; E4, E5, E6 ont des retouches pas encore vues ; E3 à revoir à l'écran 01.
- R2 : `.\scripts2-videos.ps1 -Rclone "copyto <local> R2:terminale/maths/analyse/exp-<m>/<nom>.mp4"` puis
  `curl -sI https://pub-a5bab809c9be4ab6a33fe47c1aa68b5b.r2.dev/<chemin>` → Content-Length = taille locale. Envoyer aussi la miniature .png.
- Un agent préparait (pas fini à la relève) : `manim/poste2/manifeste-exp.py` (6 entrées du manifeste, instants pris du dry run),
  `manim/poste2/videos-r2-exp.json` (à copier À LA MAIN dans `lib/videos/videos-r2.json`, ⛔ jamais generer-videos-r2.mjs),
  `.tmp-ress-exp-tle.mjs` (notion_ressources : lecture, puis `ecrire`), `manim/miniature_exp_terminale.py`.
  Vérifier que ces fichiers existent et sont justes ; les finir sinon.
- `COUPE_PAR_VIDEO` (components/LecteurVideo.tsx) : ajouter les 6 ids `terminale-exp-*` (4,91 si la mesure est la même).
- Manifeste : commit PAR CLÉS (`python manim/outils-commit-cles.py manim/manifeste-youtube.json <sortie> terminale-exp-`).
- Rapport final au chef **local_fad0fe0b-b997-493e-ab73-a6c9f2e9ce8c** : 6 tailles R2, lignes notion_ressources, sha.


## ✅ SÉRIE FINIE — 26/11 ~17 h 25 (relève n° 3)

| | HD | R2 (Content-Length = local) | coupe |
|---|---|---|---|
| E1 definition | 289,30 s | 18 285 315 o | 4,91 |
| E2 proprietes | 270,92 s (refaite 2 fois d'après la planche HD : « l'après-midi » touchait les boîtes, barre bleue sur « somme », ≠ sur la barre) | 16 987 493 o | 4,91 |
| E3 deriver | 302,78 s (refait : moniteur) | 19 184 664 o | 4,91 |
| E4 equation_inequation | 279,90 s | 18 618 072 o | 4,91 |
| E5 limite | 287,22 s | 18 232 953 o | 4,91 |
| E6 defi | 283,97 s | 18 730 969 o | 4,91 |

- Les 6 planches HD ont été regardées : 0 bord, aucun « ^ », exposants en hauteur, compte à rebours, lettres BC BA CB AB CA CA.
- Miniatures `.png` et `.vignette.webp` sur R2 (`manim/poste2/r2-exp.sh <micro>` envoie et compare).
- Manifeste 84af10fd0 (par clés), videos-r2.json + COUPE_PAR_VIDEO + correction E2 8ef51effd (par clés : `manim/poste2/commit-cles-exp.sh`).
- notion_ressources : 6 lignes insérées (terminale-spe, fonction_exponentielle, micro_id exp_*, url /video/terminale-exp-*).
- Reste : push (le chef), publication YouTube (manifeste `plus_tard: true`).
