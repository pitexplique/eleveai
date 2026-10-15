# Consigne commune — CORRECTEURS des gabarits du coach de maths de 4e (08/10/2026)

Tu travailles dans C:\Users\FRED\Documents\eleveai (Next.js, TypeScript). Réponds et rapporte EN FRANÇAIS.

Lis d'abord la consigne de la 6e, `PASSATION-COACH-MATHS-6E-CONSIGNE.md` : elle vaut ici, avec les
différences ci-dessous.

## Ce qui change pour la 4e

1. **La VARIÉTÉ EST DÉJÀ FAITE** : toute la 4e a été réparée du 30/09 au 04/10 (chaque micro passe
   `mesurer-squelettes-coach.ts 4e`). Ta tâche principale : un **CORRECTEUR pour CHAQUE gabarit** de tes
   banques (clé = `id` du gabarit), dans `lib/tutor-v4/questionBank/4e/maths/correcteurs/<banque>.ts`
   (le fichier existe, vide). Il relit les nombres DANS LE TEXTE (et le canvas s'il y en a un), REFAIT le
   calcul ou le raisonnement sans passer par le gabarit, et rend la liste des problèmes (vide = juste).
   Puis tu corriges dans la banque tout ce que les correcteurs et les règles communes trouvent. Ne casse
   pas la variété : repasse la mesure à la fin. Modèle déjà fait en 4e : `correcteurs/proportionnalite.ts`,
   `ratios.ts`, `echelles.ts`.
2. **Règles de Frédéric** (06/10) : division écrite « ÷ » — la fraction reste permise là où elle est au
   programme de 4e (fractions, équations, calcul littéral, Thalès, cosinus, puissances, probabilités,
   fréquences, pourcentages, échelles ; le contrôle commun les exempte) ; unités dans `expected` quand
   l'énoncé en impose une ; aucune question ouverte en `contains_keyword` dont un mot-clé est un nombre
   seul ou un seul mot vague (→ `number_equal`, comparateur d'expression, ou QCM sur les mêmes pièges) ;
   mesures en situation à deux décimales au plus ; × 10 par la valeur des chiffres, jamais « ajouter un
   zéro ». ⭐ Cela vaut AUSSI pour les items FIGÉS de tes banques (pas seulement les gabarits) :
   convertis tout figé ouvert validé par un nombre seul ou un mot vague.
3. **Décisions de Frédéric pour la 4e** (à respecter, déjà en place) : identités remarquables SANS la
   formule a² + 2ab + b² — (x + 3)² se développe comme (x + 3)(x + 3) ; factorisation par FACTEUR COMMUN
   seulement ; comparateurs `expression_developpee` (réduite aussi), `expression_reduite`,
   `expression_factorisee` (le plus possible), `expression_equivalente` (une égalité se compare membre à
   membre) ; « 7x » et « 7*x » sont la même réponse ; trigonométrie : le cosinus seulement ; périmètres :
   unité OBLIGATOIRE dans `expected` (« 24 cm ») ; km/h ↔ m/s à ★3 ; masses volumiques au dixième ;
   médiane d'un effectif pair = moyenne des deux valeurs centrales ; tableau de valeurs sans f(x) ;
   « p = 3n + 5 » accepté.
4. Pour un correcteur d'expression littérale : évalue l'expression attendue ET celle que décrit l'énoncé
   pour plusieurs valeurs de la lettre (3 ou 4 valeurs entières), comme le font
   `lib/tutor/evaluation/expressionAlgebrique.ts` et les comparateurs `expression_*` — et vérifie la
   FORME demandée (développée = sans parenthèses, factorisée = un produit).

⛔ Ne touche QUE tes fichiers de banque et leurs `correcteurs/<banque>.ts`. Pas git, pas de serveur, ni
le moteur, ni `index.ts`, ni `correcteurs/index.ts`, ni `correcteurs/types.ts`. Pas de heredoc, sed ou
python sur les .ts : Write/Edit. Travaille PAR PETITS MORCEAUX (une micro à la fois). Ton dossier
temporaire : un sous-dossier à ton nom dans le scratchpad. Si tu manques de temps, rends ce qui est fait
et vérifié.

## Contrôles (tous doivent passer)

    npx --yes tsx@4 scripts/verifier-correcteurs-maths-6e.ts 4e <tes notions>   → tous tes gabarits ✅
    npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e <tes notions>         → toutes tes micros ✅
    npx tsc --noEmit -p .   → aucune erreur dans tes fichiers

Fabrique une faute (réponse décalée de 1, leurre égal à la réponse, expression fausse) et vérifie que tes
correcteurs l'attrapent. Relis ~8 tirages par micro, comme un professeur.

## Ton rapport (en français, court)

Gabarits couverts, vraies fautes trouvées et corrigées, dernières lignes des contrôles, doutes, 3
questions tirées telles quelles.
