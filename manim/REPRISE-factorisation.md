# Reprise : série FACTORISATION 4e (11/11/2026)

Suite directe de la série DISTRIBUTIVITÉ 4e (`manim/REPRISE-distributivite.md`, finie). Même format : une paysage Manim + un short MANIM par épisode (en 4e, pas de dessin animé), modules et structure de `manim/scripts/4e/distrib_*.py` (`PaysageRel` de `relatif_commun.py`, `ShortEq`…). Règles : `manim/REGLES.md`.

Notion du coach `litteral_factorisation` (banque `lib/tutor-v4/questionBank/4e/maths/factorisation.bank.ts`), 4 micros : `litteral_facteur_commun`, `litteral_factoriser_simple`, `litteral_factoriser_verifier`, `litteral_factorisation_defi`. La micro défi est riche (nombre ET lettre en facteur, erreurs, situations, facteur négatif ★5) : elle porte deux épisodes (04 et 05). **10 vidéos.**
⛔ Pas d'identités remarquables (3e, décision du 30/09). Paysage « toute la notion » déjà en ligne : `4e-litteral-factoriser` (6x + 15 = 3(2x + 5), x² + 4x, le piège 3(2x + 15), le rectangle découpé) : ne pas reprendre ses exemples.

## Épisodes (prévus le 11/11)
| NN | slug | micro | ceinture paysage / short | métier, domaine | QCM (paysage ; short) |
|---|---|---|---|---|---|
| 01 | commun | litteral_facteur_commun | jaune / jaune | Inès, logisticienne (transports) | A, B ; A |
| 02 | simple | litteral_factoriser_simple | jaune / jaune | à choisir (développeuse : moins d'opérations dans son programme) | C, A ; C |
| 03 | verifier | litteral_factoriser_verifier | orange / orange | à choisir (game designer : la formule des points) | A, B ; C |
| 04 | maximum | litteral_factorisation_defi (nombre ET lettre, le plus grand facteur) | orange / orange | à choisir (aire d'un rectangle : 2x² + 6x = 2x(x + 3)) | B, C ; C |
| 05 | defi | litteral_factorisation_defi (erreurs, situation, facteur négatif) | verte / orange | à choisir | B, A ; B |
Lettres tirées au hasard le 11/11 (5 A, 5 B, 5 C, jamais deux fois de suite dans une vidéo). Métiers : `npx tsx scripts/metiers-pour-video.ts 4e litteral_factorisation` (logisticienne, game designer, développeuse), marquer `V` dans `lib/matrice/metiers-college.ts` à la passe finale.

## Fichiers
- Voix : `manim/voix/4e-facto-<slug>.json` et `…-short.json`. Marques : `manim/scripts/4e/facto_<slug>_marques.json`. Scripts : `manim/scripts/4e/facto_<slug>.py`, `facto_<slug>_short.py`.
- Sorties : `manim/sorties/4e/maths/factorisation/NN-<slug>/eleveai-maths-4e-facto-<slug>[-short].mp4`.
- Aperçu à part : `manim/sorties/apercu-factorisation.html` (⛔ jamais `apercu.html`, partagé).
- Marques : `powershell -File scripts/generer-voix.ps1 -Fichier <voix.json> -Debit -6`, puis `scripts/marques_dump.ps1 -Fichier <voix.json> -Sortie <cues.tsv> -Debit -6`, puis `python manim/scripts/4e/equation_commun.py <voix.json> <cues.tsv> <marques.json>`.

## ⛔ Rendus
Trois séries tournent en parallèle sur ce poste (factorisation, calcul posé 6e, calcul mental 6e), plus les suites lycée. Avant chaque rendu HD : `tasklist | grep -iE "manim|python"`, attendre qu'aucun rendu lourd ne tourne.

## État
- 11/11 : voix du pilote 01 (paysage + short) **VALIDÉES par Frédéric (« Oui, lance le pilote »)**. WAV dans `public/sons/4e-facto-commun[-short]/`, marques `facto_commun[_short]_marques.json`.
- Scènes écrites : `manim/scripts/4e/facto_commun.py` (`FactoCommun4e`, questions à 01:05 A et 02:04 B) et `facto_commun_short.py` (`FactoCommunShort4e`, « Le nombre caché », question à 00:24 A). Les deux dry runs d'audit sont propres (0 avance, 0 retard, 0 bord).
- 11/11 soir : brouillon -ql de la paysage relu (5 planches), 7 défauts corrigés : palettes posées sur un seul camion (`vider_caisse`), lignes du chargement collées, « Dans » sur « 6x + 9 », la table de 6 qui croisait la phrase, rectangles serrés, mini-camions près de Ti-Margo, « Et pas 10 : » collé ; les 2 questions ont maintenant une figure à gauche (`figure_q`, `XL = 0.6`). Short : « Le 7 est caché / dans les trois : » sur 2 lignes plus grandes, cartes à 72 % (la 3e ligne de réponse touchait Ti-Margo). Les deux audits refaits : propres. Un 2e brouillon -ql de la paysage tournait au moment de la relève (`manim/scripts/4e/media-facto-01-ql/`) ; le short est à rebrouillonner (`-ql -r 540,960`, media `media-facto-01s-ql`).
- **Voix 02 à 05 écrites en brouillon** (`manim/voix/4e-facto-{simple,verifier,maximum,defi}[-short].json`), PAS encore montrées à Frédéric, pas de WAV. Shorts : « Le raccourci », « Tu le crois ? », « Tout sortir », 05 sans titre. Réponses : 02 C, A ; C — 03 A, B ; C — 04 B, C ; C — 05 B, A ; B (conformes au tirage). Métiers : Maya développeuse, Tom game designer, Camille paysagiste (nouveau), Malik comptable d'un club de foot (nouveau).
- 11/11 matin (session de relève) : 2e brouillons relus, 5 défauts de plus corrigés. Paysage : « et 10 palettes d'eau » rétréci (maxw 5 → 7), « Dans6x + 9, » collé (les trois morceaux posés ensemble, `arrange`), écart trop large après « x palettes de riz, ». Short : « 14, 21 et 35. » au ras des bords (largeur 3,5), « de15x + 35? » collé (`Eq` au lieu de `E`, l'insistance porte sur toute la ligne), lignes égalisées. Audits refaits : propres. Planches finales propres. Rendus HD 01 lancés (script qui attend qu'il reste au plus 1 rendu -qh sur le poste). Voix 02-05 collées à Frédéric, en attente de son oui.
- 11/11 midi : **voix 02-05 VALIDÉES par Frédéric (« Oui, génère-les »)**, titre du short 05 : « L'erreur cachée ». WAV et marques 02-05 faits (commit `cfc0d313`). **Pilote 01 rendu en HD** : `manim/sorties/4e/maths/factorisation/01-commun/` (paysage 3 min 20, short 1 min 04), 0 bord, planche finale propre, montré dans `apercu-factorisation.html`. Épisodes 02-05 confiés à 4 agents (brief : dossier de notes `local_75cb9990…/brief-agents-factorisation-02-05.md`). ⛔ RAM : au plus 2 rendus facto à la fois, chaque lancement passe par `attendre-son-tour.sh` (même dossier : bloque sous 4 Go libres et tant qu'un `PAUSE-*.txt` existe ; pause posée à midi pour le calcul mental 6e, à retirer sur son feu vert).
- Reste (ancien) : relire les nouveaux brouillons 01, planches sans défaut → rendus HD 01 (quand aucun rendu lourd ne tourne) → aperçu `apercu-factorisation.html` → montrer les pilotes ET coller les voix 02-05 en entier à Frédéric → attendre son oui → WAV/marques/scènes 02-05 → rendus → commit par chemin.
- Piège rencontré : `dit(l, "x. Le")` se calait sur la PREMIÈRE occurrence de la phrase dans la voix (3 s de retard) : donner un extrait unique (« commun : x. »). Le short emprunte `l` et `fin_05_11` à `DistribSimpleShort4e` ; `_disposer_q` y est recopié (il appelle `super()`), et `eq_dans_q` y borne la ligne à 3,8 de large.
- 11/11 17 h 25 : arrêt à 87 % d'usage hebdo (rendus coupés). 12/11 : consigne de Frédéric « finis 04 et 05 seulement, puis arrête-toi ».

## ⏸ ÉTAT au 12/11 ~5 h : reprendre ICI samedi 14/11 à 9 h
**FINIS (HD, audit 0/0/0, bords 0, planches relues par le chef d'orchestre, dans `apercu-factorisation.html`)** :
- 01 commun : paysage 3 min 20 (A 01:05, B 02:04), short « Le nombre caché » 1 min 04 (A 00:24).
- 04 maximum : paysage 3 min 42 (B 01:06, C 02:22), short « Tout sortir » 1 min 16 (C 00:23). Commit `13240bf8` (1re version dans `2e27f97f`).
- 05 defi : paysage 4 min 08 (B 00:47, A 02:25), short « L'erreur cachée » 1 min 21 (B 00:32). Commits `3f8aefac` + `883353f8` (« Donc » décollé du cadre, `finale_colonne` à interligne régulier).
**EN COURS (agents arrêtés le 12/11 ; scripts écrits, committés dans `2e27f97f` en version de travail)** :
- 02 simple (`facto_simple.py` FactoSimple4e / `facto_simple_short.py` FactoSimpleShort4e, Maya développeuse, « Le raccourci ») : audits faits, brouillon -ql du short regardé ; le brouillon -ql de la paysage était à refaire et regarder. Rien en HD. Lettres attendues : C, A ; short C.
- 03 verifier (`facto_verifier.py` FactoVerifier4e / `facto_verifier_short.py`, Tom game designer, « Tu le crois ? ») : short audit propre (C) ; paysage : 3 objets hors cadre à l'écran 03 corrigés (commit de reprise du 12/11), audit à refaire, puis les deux brouillons -ql. Rien en HD. Lettres attendues : A, B ; short C.
**Pour reprendre 02 et 03** : un agent par épisode avec le brief `brief-agents-factorisation-02-05.md` (dossier de notes `C:\Users\FRED\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\side-session-notes\local_75cb9990-a032-4499-b290-fba692c17b77\`), en lui disant de PARTIR du script existant (chaîne : dry run → -ql + planches → HD). Dry runs et -ql : préfixer par `bash <dossier>/attendre-son-tour.sh &&` (4 Go libres, ≤ 2 rendus facto, pas de `PAUSE-*.txt`). HD : `bash <dossier>/hd-verrou.sh python -m manim render -qh …` (prend aussi le verrou partagé `C:/Users/FRED/AppData/Local/Temp/eleveai-rendu-hd.lock`, un seul -qh à la fois sur le poste). Puis le chef d'orchestre relit LUI-MÊME les planches HD (il a renvoyé 6 défauts sur 04 et 2 sur 05 que les agents disaient propres : réponses des questions minuscules, « Ce que tu as appris » minuscule, textes collés aux cadres).
**Ensuite (passe finale de la série)** : métiers `V` dans `lib/matrice/metiers-college.ts`, miniatures, manifeste YouTube EN AJOUT, R2. Rien poussé par cette session (c'est la session « Contextez hebdomadaire et vidéos » qui pousse).
