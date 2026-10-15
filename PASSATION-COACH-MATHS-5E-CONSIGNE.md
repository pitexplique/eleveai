# Consigne commune — gabarits variés ET corrigés pour le coach de maths de 5e (09/10/2026)

Tu travailles dans C:\Users\FRED\Documents\eleveai (Next.js, TypeScript). Réponds et rapporte EN FRANÇAIS.

Lis d'abord `PASSATION-COACH-MATHS-6E-CONSIGNE.md` : elle vaut ici À LA LETTRE (même travail : la 5e est
dans l'état où était la 6e). Mesuré le 09/10 : 107 micros de 5e sur 108 sous le seuil, 10 squelettes en
médiane. Il faut donc les DEUX : la VARIÉTÉ (situations × tournures × prénoms, générateurs, jamais de
figé ajouté) ET un CORRECTEUR par gabarit dans `lib/tutor-v4/questionBank/5e/maths/correcteurs/<banque>.ts`
(le fichier existe, vide). La 6e (`6e/maths/`) et la 4e (`4e/maths/`) sont faites : prends leurs banques
et leurs correcteurs comme modèles, et importe les prénoms et `de()` de `6e/maths/entiers.bank.ts`.

## Règles accumulées (6e et 4e, à appliquer dès le départ)

- Division « ÷ », jamais a/b hors des notions où la fraction est au programme (fractions, calcul littéral,
  équations, probabilités, pourcentages, échelles) ; le contrôle commun le vérifie.
- × 10 par la valeur des chiffres, jamais « ajouter un zéro ».
- Unités dans `expected` quand l'énoncé en impose une (« 24 cm », « 12 cm² ») ; périmètres : OBLIGATOIRE.
- Mesures en situation : deux décimales au plus ; prix toujours à deux décimales (« 91,20 € »).
- **Aucune question ouverte à mots-clés**, ni dans les gabarits ni dans les items FIGÉS de tes banques :
  une question ouverte est PRÉCISE (un cas chiffré, une seule réponse jugée par `number_equal` ou un
  comparateur d'expression), sinon c'est un QCM sur les mêmes pièges. Jamais « Explique pourquoi » corrigé
  au mot-clé.
- **QCM** : une seule proposition juste ; jamais deux choix de même valeur (« 2/4 » et « 1/2 », « 0,4 » et
  « 40 % », un carré parmi les leurres d'un rectangle, une égalité vraie mais « inutile ») ; « 32 » n'est
  pas « 32 000 ».
- « Vrai ou faux ? » se répond par vrai / faux, pas oui / non.
- Signe moins des relatifs : « − » (pas le tiret), jamais « + −3 » sans parenthèses.
- Figures : calculées à partir des mesures de l'énoncé (un angle de 118° dessiné obtus), mêmes noms de
  points que le texte ; le correcteur relit le canvas.
- Élisions (« d'Inès », « qu'Elio ») ; pas La Réunion par défaut (un ou deux contextes sur quinze).
- Programme de 5e (cycle 4) : relatifs (repérage, comparaison, addition, soustraction), fractions
  (égalité, comparaison, addition/soustraction de dénominateurs multiples), calcul littéral (substituer,
  réduire, distributivité simple), proportionnalité et pourcentages, statistiques (moyenne, fréquences),
  premières probabilités, symétrie centrale, parallélogramme, triangles (somme des angles, inégalité
  triangulaire), angles (alternes-internes, correspondants), aires et volumes (prisme droit, cylindre).

⛔⛔ JAMAIS de `taskkill`, `Stop-Process` ni `kill` sur des processus node : d'autres sessions et des
serveurs de développement tournent sur le même poste (un agent l'a fait le 09/10). Si une commande se
bloque, attends ou relance-la, sans rien tuer.

⛔ Ne touche QUE tes banques et leurs correcteurs. Pas git, pas de serveur, ni le moteur, ni les index, ni
`types.ts`. Write/Edit seulement (pas de sed/python/heredoc sur les .ts). PAR PETITS MORCEAUX : une micro à
la fois, contrôle après chacune. Dossier temporaire : un sous-dossier à ton nom dans le scratchpad. Le
réseau a coupé plusieurs fois ces derniers jours : écris tôt, contrôle souvent. Si tu manques de temps,
rends ce qui est fait et vérifié.

## Contrôles

    npx --yes tsx@4 scripts/verifier-correcteurs-maths-6e.ts 5e <tes notions>   → tous tes gabarits ✅
    npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 5e <tes notions>         → toutes tes micros ✅
    npx tsc --noEmit -p .   → aucune erreur dans tes fichiers

Fabrique des fautes pour vérifier tes correcteurs ; relis ~8 tirages par micro.

## Rapport (en français, court)

Avant/après par micro (squelettes, pire répétition), ce que vérifient les correcteurs, vraies fautes
corrigées, dernières lignes des contrôles, doutes, 3 questions tirées.
