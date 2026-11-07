# Prompt de reprise : publication YouTube des Puissances, micro (ab)ⁿ et (a/b)ⁿ

État au 07/11/2026, passage de main à 84 % de contexte, à la demande de Frédéric (« fait ouvrir session fille »).
Rien ne tourne dans la session qui passe la main. Répondre en français. Commit PAR CHEMIN, push seulement sur sa demande.

## 1. Publication YouTube de la série Puissances : armée, rien à relancer
Détail complet : `manim/REPRISE-puissances.md`, section « État au 06/11 ».
- Frédéric a validé le plan le 06/11. 26 vidéos sur 33 partent seules, une paysage et son short par jour, du mar. 10/11 au lun. 23/11.
- La tâche automatique programme la veille à 12 h 30 Réunion : premier envoi lun. 09/11, pour le 10/11.
- Les 7 jumelles restent sur R2 (`meme_video_que`, plus jamais publiées). Coach : 41 lignes sur /video/<id>, inchangées.
- ⏳ Après le 23/11 : contrôler les 26 `url` au manifeste et `manim/sorties/publication-auto.log`, puis committer ces `url`.
  ⛔ Le manifeste contient des modifications non commitées d'autres sessions : `git hash-object` + `git update-index --cacheinfo`, puis `git commit` SANS chemin (`-- chemin` prend la copie de travail). Note mémoire `manifeste-partage-modifs-non-commitees`.
- ⏳ Frédéric, dans Studio : « Vidéo similaire » des 12 shorts = leur paysage (l'API ne le fait pas).
- Les shorts en dessin animé sont un autre chantier : `manim/prompt-reprise-shorts-puissances-dessin-anime.md`.

## 2. Micro de seconde (ab)ⁿ et (a/b)ⁿ : FAITE
Question de Frédéric : (2/3)³ est-il au programme de 3e ou de seconde ? Réponse donnée :
- (a/b)ⁿ n'est écrit explicitement dans aucun texte français lu.
- **Seconde 2019 :** « règles de calcul sur les puissances entières relatives » et calculs avec écritures fractionnaires, donc la place naturelle est la seconde.
- **Cycle 4 :** arrêté du 18/02/2026, BO n° 10 du 05/03/2026 : 5e rentrée 2026 (carré, cube), 4e rentrée 2027 (dont aⁿ × bⁿ), 3e rentrée 2028.
- **Seconde 2026 :** BO n° 14 du 02/04/2026, texte PAS lu (le site du BO répond 403) ; une présentation de l'inspection dit « Nombres et calculs : pas de changement ». À ne pas présenter comme lu.
- **Hors France :** le Maroc écrit (a/b)ⁿ en toutes lettres (2AC) ; Belgique, Suisse, Côte d'Ivoire demandent des bases fractionnaires.
- Note mémoire : `nouveaux-programmes-2026-puissances`.

Frédéric a répondu « Oui, ajoute-la ». Commit `0b25d81f`, non poussé :
- `lib/tutor-v4/questionBank/puissances-meme-exposant.ts` (générateurs), `seconde/maths/puissances-renfort.ts`, micro `puiss_meme_exposant` (★2 à ★4), 596 squelettes.
- 10 fichiers de `lib/programmes-pays/` ; 6 lignes repassent en « complete ».
- Pas vu à l'écran : le navigateur intégré refuse localhost. Contrôlé par 100 000 tirages, KaTeX sur 1 082 formules, types, et la page répond 200.

Feuille d'exercices : Frédéric a répondu « Oui, prépare-la » le 07/11. FAITE : `/fiches-exercices/maths/seconde/puissance-produit-fraction`, 20 exercices, PDF. La micro n'a toujours ni vidéo, ni short.

## 3. Ce qui reste à part
- La session « Coach 5e : puissances du nouveau programme » est distincte : ne pas la reprendre.
- Rappels : 4e (aⁿ × bⁿ) à prévoir pour la rentrée 2027 ; `knowledge/maths/4e/bo-objectifs.ts` suit encore l'ancien texte.
