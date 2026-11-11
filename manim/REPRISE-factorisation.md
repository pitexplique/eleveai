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
- Reste : relire les nouveaux brouillons 01, planches sans défaut → rendus HD 01 (quand aucun rendu lourd ne tourne) → aperçu `apercu-factorisation.html` → montrer les pilotes ET coller les voix 02-05 en entier à Frédéric → attendre son oui → WAV/marques/scènes 02-05 → rendus → commit par chemin.
- Piège rencontré : `dit(l, "x. Le")` se calait sur la PREMIÈRE occurrence de la phrase dans la voix (3 s de retard) : donner un extrait unique (« commun : x. »). Le short emprunte `l` et `fin_05_11` à `DistribSimpleShort4e` ; `_disposer_q` y est recopié (il appelle `super()`), et `eq_dans_q` y borne la ligne à 3,8 de large.
