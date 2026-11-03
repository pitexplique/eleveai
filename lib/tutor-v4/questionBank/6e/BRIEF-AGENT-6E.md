# Brief agent — règle 6e ★1-★2

Projet : C:\Users\FRED\Documents\eleveai (coach de maths, Next.js/TS). Rapport en français.

1. Lis `lib/tutor-v4/questionBank/6e/REGLES-6E.md` en entier : à ★1-★2 (champ
   `difficulty` 1 ou 2), aucun contexte (prénom, situation, métier, lieu,
   histoire), ★1 ≤ 12 mots, ★2 ≤ 15 mots, verbe d'action en tête, question
   directe, nombres en chiffres, pas de « on sait que », « celle de »,
   « ainsi que ». Les élèves faibles de 6e lisent mal. Contexte permis à ★3+.
2. Modèles déjà faits : `git show d037eed1` (aires) et `git show 543af538`
   (fractions) : énoncés nus à ★1-★2, contextes déplacés en gabarits ★3.
3. Ne touche QUE tes fichiers (+ leurs correcteurs du même nom dans
   `lib/tutor-v4/questionBank/6e/maths/correcteurs/`) : d'autres agents
   travaillent en même temps sur les autres banques.
4. Garde la variété : les `generate()` doivent toujours produire des énoncés
   variés ; les contextes intéressants passent à ★3, on ne les jette pas.
   Réponses, comparateurs, QCM (jamais deux choix de même valeur), canvas,
   hint et explication restent justes et cohérents. Figures bienvenues à ★1.
   Division : « ÷ », jamais 5/2.
5. Vérifie : `node scripts/mesure-contexte-coach-6e.mjs` (tes micros à 0 %,
   sinon faux positifs justifiés ; le script ne donne qu'une moyenne de mots :
   tire aussi les énoncés un par un pour le maximum) et
   `npx tsx scripts/verifier-correcteurs-maths-6e.ts <préfixe des micros>`.
   Relis une quinzaine d'énoncés générés avec leur réponse.
6. Une fois tout vert, COMMITE PAR CHEMIN tes seuls fichiers (jamais `git add
   .` ni `git commit -a`), sans pousser :
   `git commit -m "Coach 6e <notion> : questions simples à ★1-★2, contexte à ★3" -- <tes fichiers>`
   suivi de la ligne vide puis `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
   Si `index.lock` bloque, réessaie quelques secondes plus tard.
7. Rapport court : fichiers, % avant → après par micro, 3 exemples avant/après,
   hash du commit, problèmes.
