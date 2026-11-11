# Brief commun — agents de rendu, série SUITES du lycée (une paysage + un short Manim par épisode), 10/11/2026

Réponds en français. Dépôt `C:\Users\FRED\Documents\eleveai` (Windows ; Git Bash et PowerShell). D'autres agents et d'autres sessions travaillent dans le dépôt en même temps : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire. Avance à PETITS PAS : les commandes longues (WAV, dry run, rendus) partent en ARRIÈRE-PLAN, jamais plus de 2 minutes au premier plan. Note de reprise de la série : `manim/REPRISE-suites.md`.

## À lire d'abord, EN ENTIER
`manim/REGLES.md` (questions-pauses, ceintures, synchro 0 s, bords, « Ce que tu as appris », phrase de fin), puis les MODÈLES lycée finis :
- `manim/scripts/terminale/convexite_reconnaitre.py` + `convexite_reconnaitre_short.py` (+ `convexite_shorts_commun.py`) et leurs `*_marques.json` : structure, calage mot à mot, `AuditSynchro`, `CompteARebours`, pastille de pause, `echelle_ceintures`, identité « Maths 1re — EleveAI », écran de fin ;
- `manim/scripts/terminale/loi_normale_escalier.py` + `_short.py` (le premier modèle de ces outils) ;
- `manim/scripts/terminale/continuite_tvi.py` (le modèle lycée que Frédéric adore : accroche concrète, sans formule) ;
- la banque de TA micro (voir ta mission) et son `*-renfort.ts` : mêmes notations, mêmes erreurs typiques que le coach. La vidéo prépare EXACTEMENT ce que le coach demande.
⛔ Ne modifie aucun module commun d'une autre série ni le script d'un autre épisode.

## Module commun de la série
`manim/scripts/premiere/suites_commun.py` : créé par l'agent du PILOTE (épisode 01), réutilisé ensuite par tous les épisodes (importé, jamais recopié). Il contient au moins : la classe de base paysage et la classe de base short (calage, audit, bords, garde avec ceinture, question-pause, défi, « Ce que tu as appris », écran de fin), la ligne des termes u₀, u₁, u₂… en cases avec les flèches « + r » ou « × q » qui sautent d'une case à l'autre, et le nuage de points des termes (axes n et uₙ, points qui apparaissent un à un). Après le pilote, un agent qui a besoin d'un nouvel outil le met dans SON script, pas dans le module commun.

## Voix
`manim/voix/<classe>-suite-<slug>.json` et `…-short.json`. N'y change RIEN sans le dire, sauf erreur factuelle ou mot que la synthèse prononce mal (signale-le dans ton rapport). Débit −6 (comme les autres vidéos lycée) : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -6`, WAV dans `public/sons/<nom>/`. Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` (fais comme le modèle convexité).

## Noms
- Scripts : `manim/scripts/<dossier>/suite_<slug_underscore>.py` et `suite_<slug_underscore>_short.py` (dossier = `premiere`, `premiere-spe` → `premiere`, `terminale`). Mets le dossier du script EN TÊTE de `sys.path`.
- Classes : `Suite<Slug>` + classe (ex. `SuiteArithReconnaitre1re`) et `Suite<Slug>Short`.
- Sorties : `manim/sorties/<classe>/maths/suites/NN-<slug>/eleveai-maths-<classe>-suite-<slug>[-short].mp4` (classe = `premiere`, `premiere-spe` ou `terminale`) ; media_dir `manim/scripts/<dossier>/media-suite-<slug>[-short]` (le tien, pour que le cache des textes ne soit pas partagé).

## Règles du lot (lycée, 16-18 ans)
- Ceinture : paysage VERTE (défis : BLEUE), short BLANCHE ; échelle ENTIÈRE sur la page de garde et sous le titre du short.
- Un dessin par écran, qui BOUGE : les termes dans leurs cases, la flèche « + 30 » qui saute de case en case, l'écart qui s'allume, le nuage de points qui se pose point par point, le motif de carreaux qui grandit d'une étape à l'autre. Code couleur constant dans toute la série : bleu = les termes uₙ, orange = la raison (r ou q) et les écarts, vert = résultat juste, rouge = piège.
- La situation : le métier est un pictogramme simple + le prénom + le métier écrit ; l'image concrète (haie d'arbres, silo, coureuse…) est DESSINÉE, schématique et lisible.
- Pas de LaTeX sur le poste : tout en `Text` ; écris uₙ, u₀, uₙ₊₁ en caractères Unicode (indices ₀₁₂ₙ), qⁿ, ≥, ≤, −∞. Décimaux à la française (virgule).
- Questions-pauses : écran « Question ! », 3 boutons A / B / C, compte à rebours 5 s en paysage, 3 s en short, puis la bonne réponse s'allume (agrandir puis rétrécir) + la phrase d'explication de la voix. La lettre juste est celle de la voix.
- Short 9:16 : en HAUT l'image concrète qui bouge, en BAS les termes / le nuage qui se remplissent EN MÊME TEMPS (synchrones, l'œil descend tout droit). Il finit sur la question en commentaire, puis la fin standard.
- Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre ou un mot n'apparaît qu'au moment où la voix le dit. « Ce que tu as appris » : titre en haut, centré. Marge de 3 % sur les quatre côtés. Écran de fin identique aux modèles (gestes de la phrase de fin du 05/11 écrits).
- ⛔ Corrige TOUJOURS les défauts mineurs (texte serré, léger chevauchement, retard) et re-rends : jamais « laissé tel quel ».

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran (`scripts/planche-video.py`) → UN SEUL rendu HD par vidéo (`PYTHONIOENCODING=utf-8`, `-qh --disable_caching`, en arrière-plan ; s'il existe un verrou de rendu HD partagé dans les modèles, respecte-le) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur les questions, la correction, « Ce que tu as appris »). Paysage d'abord, puis le short.

⛔ Ne lance JAMAIS la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2, coach, YouTube : la session principale s'en charge. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.
Commit local PAR CHEMIN à la fin (scripts, `_marques.json`, voix si corrigée ; ni `.cues.tsv`, ni `media-*`, ni mp4, ni WAV), message en français, terminé par `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. ⛔ Pas de push, jamais `git add -A`.

## Rapport final COURT
Commit, fichiers créés, durées, ceintures, centres (liste fermée `lib/videos/centres-interet.ts`), métier, liste `questions` JSON (t "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, chapitres (MM:SS par dry run / renderer.time) de la paysage, résultat des bords, ce que tu as vu sur les planches et corrigé, soucis restants, mots changés dans la voix.
