# Mission commune — agents de rendu, FIN de la série SUITES (épisodes 39 à 42), 15/11/2026

Réponds en français. Dépôt `C:\Users\acade\Documents\eleveai\eleveai-app`, branche `poste2`.
**Les voix sont déjà écrites et VALIDÉES par Frédéric le 15/11.** Tu ne les réécris pas : tu les génères, tu les cales, tu rends.

⛔ Une autre session travaille sur la 5e dans le même dépôt : ne touche qu'à TES fichiers.
⛔ Ne modifie PAS `manim/scripts/premiere/suites_commun.py` (importé, jamais recopié, jamais corrigé : si tu as besoin d'un outil, mets-le dans TON script ; si tu trouves un défaut du module commun, écris-le dans ton rapport).
⛔ Ne modifie PAS `manim/manifeste-youtube.json`, `lib/videos/*.json`, les banques du coach, `manim/passe_suites.py`, `manim/miniature_suites.py`. Pas de miniature, pas de manifeste, pas de R2, pas de coach, pas de YouTube : la session principale s'en charge.
⛔ Pas de push. Jamais `git add -A`. Commit local PAR CHEMIN à la fin.
⛔ Ne lance JAMAIS la lecture d'une vidéo (aperçus en pause, images extraites au ffmpeg).

## À lire d'abord, EN ENTIER
1. `manim/REGLES.md` (questions-pauses, ceintures, synchro 0 s, bords 3 %, « Ce que tu as appris » titre en haut centré, phrase de fin du 05/11).
2. Le GABARIT le plus récent de la série, épisode 36 : `manim/scripts/terminale/suite_limite_comparaison.py` + `_short.py` + leurs `*_marques.json`.
3. `manim/scripts/premiere/suites_commun.py` : `PaysageSuites`, `ShortSuites`, `LigneTermes`, `NuageTermes`, `poser_question`, `defi_pause`, `finale`, `fin`, `fin_short`, `appel_commentaire`, `garde`, `entete`.
4. TA voix : `manim/voix/<prefixe>-suite-<slug>.json` et `…-short.json`. Compte les clés : un écran par idée, les clés `NN-question` / `NNb-reponse` sont les questions-pauses, `NN-defi` / `NNb-correction` le défi, `NN-finale` « Ce que tu as appris », `NN-abonne` l'écran de fin.
5. La banque du coach de ta micro (indiquée dans ta mission) : mêmes notations, mêmes erreurs typiques.
6. Les 2 ou 3 épisodes voisins de ta classe, pour ne pas répéter un dessin.

## Noms (à respecter au caractère)
| Ép. | Voix (préfixe) | Script | Classe paysage | Classe short | Sortie |
|---|---|---|---|---|---|
| 39 | `premiere-suite-expo-prolonger` | `manim/scripts/premiere/suite_expo_prolonger.py` + `_short.py` | `SuiteExpoProlonger1re` | `SuiteExpoProlongerShort` | `manim/sorties/premiere/maths/suites/39-expo-prolonger/eleveai-maths-premiere-suite-expo-prolonger[-short].mp4` |
| 40 | `premiere-spe-suite-exp-geo` | `manim/scripts/premiere/suite_exp_geo.py` + `_short.py` | `SuiteExpGeo1reSpe` | `SuiteExpGeoShort` | `manim/sorties/premiere-spe/maths/suites/40-exp-geo/eleveai-maths-premiere-spe-suite-exp-geo[-short].mp4` |
| 41 | `terminale-suite-integrale` | `manim/scripts/terminale/suite_integrale.py` + `_short.py` | `SuiteIntegraleTle` | `SuiteIntegraleShort` | `manim/sorties/terminale/maths/suites/41-integrale/eleveai-maths-terminale-suite-integrale[-short].mp4` |
| 42 | `terminale-suite-python` | `manim/scripts/terminale/suite_python.py` + `_short.py` | `SuitePythonTle` | `SuitePythonShort` | `manim/sorties/terminale/maths/suites/42-python/eleveai-maths-terminale-suite-python[-short].mp4` |

`media_dir` = `manim/scripts/<dossier>/media-suite-<slug>[-short]` (le tien, pour que le cache des textes ne soit pas partagé). Mets le dossier du script EN TÊTE de `sys.path`.

## Règles du lot (lycée, 16-18 ans)
- Ceinture : paysage VERTE, short BLANCHE ; échelle ENTIÈRE sur la page de garde et sous le titre du short.
- Identité en haut : « Maths 1re — EleveAI » (39), « Maths 1re spé — EleveAI » (40), « Maths Tle spé — EleveAI » (41, 42).
- Un dessin par écran, qui BOUGE. Code couleur constant de la série : **bleu = les termes uₙ**, **orange = la raison / les écarts**, **vert = juste**, **rouge = piège**.
- La situation : pictogramme simple du métier + prénom + métier écrit ; l'image concrète est DESSINÉE, schématique, lisible.
- Pas de LaTeX : tout en `Text`, indices Unicode (u₀ u₁ u₂ uₙ uₙ₊₁ xⁿ eˣ ∫ ≤ ≥ −∞). Décimaux à la française (virgule) — SAUF le code Python de l'ép. 42, qui garde le point (`0.8`).
- Questions-pauses : écran « ⏸ Question ! », 3 boutons A / B / C, compte à rebours **5 s en paysage, 3 s en short**, puis la bonne réponse s'allume (agrandir puis rétrécir) + la phrase d'explication de la voix. **La lettre juste est celle de la voix** (tableau ci-dessous).
- Short 9:16 : en HAUT l'image concrète qui bouge, en BAS les termes / le nuage qui se remplissent EN MÊME TEMPS. Il finit sur la question en commentaire, puis la fin standard.
- Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre ou un mot n'apparaît qu'au moment où la voix le dit. Marge de 3 % sur les quatre côtés.
- ⛔ Corrige TOUJOURS les défauts mineurs (texte serré, chevauchement, bord coupé, retard) et re-rends : jamais « laissé tel quel ». Frédéric projette en classe.

## Lettres justes (ne les change pas)
| Ép. | Paysage | Short |
|---|---|---|
| 39 | `05-question` → **B**, `08-question` → **A** | **C** |
| 40 | `06-question` → **C**, `09-question` → **B** | **A** |
| 41 | `04-question` → **A**, `08-question` → **C** | **B** |
| 42 | `05-question` → **B**, `08-question` → **A** | **C** |

## Ordre obligatoire (le même pour tous)
1. Voix : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -6` → WAV dans `public/sons/<nom>/`. En arrière-plan.
2. Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` (comme le gabarit 36) → `<script>_marques.json`.
3. `AUDIT=1 BORDS=1 python -m manim render --dry_run …` : **0 AUDIT-AVANCE, 0 RETARD, 0 BORD**. Corriger en brouillon coûte une minute, refaire un rendu HD en coûte dix.
4. Planche basse déf de 8 images (`-ql`, `scripts/planche-video.py`), **REGARDÉE écran par écran**.
5. **UN SEUL rendu HD à la fois sur ce poste** : `PYTHONIOENCODING=utf-8`, `-qh --disable_caching`, en arrière-plan, **sous le verrou `%TEMP%\eleveai-rendu-hd.lock`** (mkdir pour prendre, rmdir pour rendre — la session 5e utilise le même). Au moins **2,5 Go libres** avant de lancer ; si moins, attends.
6. `python scripts/verifier-bords-video.py <mp4>` = « 0 instants ».
7. Planche finale de 12 images regardée (zoom sur les questions, la correction, « Ce que tu as appris »). Images extraites au ffmpeg aux passages à risque : **une image ne doit jamais mélanger deux états**.
8. Paysage d'abord, puis le short.

## Commit (à la fin, par chemin)
`git commit -- manim/scripts/<dossier>/suite_<slug>.py manim/scripts/<dossier>/suite_<slug>_marques.json manim/scripts/<dossier>/suite_<slug>_short.py manim/scripts/<dossier>/suite_<slug>_short_marques.json`
Ni `.cues.tsv`, ni `media-*`, ni mp4, ni WAV. Message en français, terminé par `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

## Rapport final COURT
Commit, fichiers créés, **durées mesurées** (paysage et short, en secondes), liste `questions` au format du manifeste (`t` "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, **chapitres** (MM:SS) de la paysage, résultat des bords, ce que tu as vu sur les planches et corrigé, soucis restants, mots changés dans la voix (signale-les, ne les change que sur erreur factuelle ou mot mal prononcé).
