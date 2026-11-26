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
