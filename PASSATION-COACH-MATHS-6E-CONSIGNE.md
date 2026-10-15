# Consigne commune — gabarits variés ET corrigés pour le coach de maths de 6e (06/10/2026)

Tu travailles dans C:\Users\FRED\Documents\eleveai (Next.js, TypeScript). Réponds et rapporte EN FRANÇAIS.

## Le problème (mesuré)

Frédéric (enseignant, statisticien) : ses élèves voient revenir les mêmes questions. Mesuré le 05/10 :
176 micros de maths de 6e sur 177 sous le seuil, **9 squelettes en médiane par micro**. Les gabarits
(`kind: "template"`, `generate()`) changent les NOMBRES mais gardent la même PHRASE : « Quel nombre est le
plus grand : 607 ou 683 ? » et « … 305 ou 445 ? » sont la même question pour l'élève.

Le coach (lib/tutor-v4/questionPairBuilder.ts) : en mode simple, il garde les items de la micro à l'étoile
EXACTE de l'élève (`difficulty`) ; un gabarit pèse 3, un item figé 1 ; un figé vu est retiré de la séance.

L'instrument : `npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 6e <notionId>` — squelette = phrase +
bonne réponse, nombres remplacés par « # ». Seuils : ≥ 30 squelettes par micro ET ≤ 4 répétitions sur 20
à CHAQUE étoile servie (il faut ~40 à 60 squelettes À CHAQUE ÉTOILE où la micro a des items).

## Ce que tu fais, dans TES fichiers de banque

1. **Des GÉNÉRATEURS, jamais du figé** (décision de Frédéric) : n'ajoute pas d'items `fixed`. Réécris le
   `generate()` des gabarits existants (garde `id`, `microId`, `difficulty`, `notionId`) et/ou ajoute des
   gabarits (nouvel `id` unique), pour que CHAQUE étoile servie de chaque micro atteigne le seuil.
2. Chaque gabarit compose une **SITUATION** (table de 12-20 contextes de la vie d'un enfant de 11 ans :
   sport, cuisine, voyage, vélo, jardin, bricolage, magasin, musique, animaux, nature, sciences… ; ⛔ pas
   La Réunion par défaut : un ou deux contextes parmi quinze) × une **TOURNURE** (3-5 façons de poser la
   question : « Combien… ? », « Quel est… ? », « Calcule… », ordre des données, tableau décrit en phrase)
   × des **PRÉNOMS** variés (filles et garçons, origines diverses, au moins 20). Pour les micros de calcul
   pur (« Calcule 3,5 × 10 », « Compare 2/3 et 3/4 ») : varie la FORME (nombre de termes, place de
   l'inconnue, consigne : « Calcule », « Donne la valeur de », « Que vaut… ? », « Complète »), et mets une
   partie des tirages en situation courte. Les nombres restent tirés au hasard, plausibles pour le contexte.
3. **Le CORRECTEUR** (exigé par Frédéric) : dans `lib/tutor-v4/questionBank/6e/maths/correcteurs/<ta
   banque>.ts`, une entrée par `id` de gabarit de ta banque (TOUS les gabarits, même ceux déjà au seuil) :
   `(q) => string[]` (lis `correcteurs/types.ts`). Il relit les NOMBRES DANS LE TEXTE que voit l'élève (et
   le canvas s'il y en a un), REFAIT le calcul ou le raisonnement indépendamment du gabarit, et rend la
   liste des problèmes (vide = juste) : la réponse attendue est la bonne ; en QCM, aucun leurre n'est aussi
   juste ; l'unité est la bonne ; les nombres sont plausibles. Un correcteur qui rend toujours `[]` est
   refusé : fabrique exprès une faute (réponse décalée de 1, leurre égal à la réponse) et vérifie qu'il
   l'attrape. Ne copie pas la formule du gabarit : recalcule à partir du texte.
4. Français impeccable : accords (un/une, pluriels), élisions (« d'Inès », « qu'il »), unités, virgule
   décimale française (réutilise le formateur du fichier s'il existe), espaces des milliers comme le
   fichier. Phrases courtes : ses élèves de 6e LISENT DIFFICILEMENT.
5. Garde les conventions du fichier : `format`, `choices`, `expected`, `comparator`, `explanation`,
   `hint`, `tags`, canvas éventuels (cohérents avec les nombres ET les noms de points). Comparateur juste :
   un nombre → `number_equal` (avec l'unité dans `expected` si l'énoncé en impose une : « 24 cm ») ; pas de
   `contains_keyword` pour une réponse numérique. Une question OUVERTE à mots-clés dont un mot-clé est un
   nombre seul (« 1 », « 2 ») accepte toute réponse qui contient ce chiffre : convertis-la en QCM sur les
   mêmes pièges (fait pour les décimaux et les fractions le 06/10). Une mesure en situation : deux
   chiffres après la virgule au plus.
6. ⛔⛔ **DIVISION : LE SIGNE « : » OU « ÷ », JAMAIS LA BARRE DE FRACTION** (Frédéric, 06/10/2026) :
   « les élèves ne savent pas que 5/2 signifie 5 : 2 ». Dans toute notion qui n'est PAS une notion de
   fractions, une division s'écrit avec le signe de division du fichier (« : » ou « ÷ » — garde celui que
   le fichier emploie déjà, sinon « ÷ »), dans l'énoncé, les propositions, la réponse ET l'explication.
   Jamais « 5/2 », « 12/4 » ni « a/b » pour dire « a divisé par b ». Une réponse non entière s'écrit en
   décimal (2,5), pas en fraction. Le correcteur le vérifie : aucune barre « / » entre deux nombres hors
   des notions de fractions (attention aux dates et aux unités « km/h », qui restent permises). La fraction
   n'est écrite que là où elle est l'OBJET d'étude : fractions, fractions-calcul, probabilités,
   pourcentages (25/100), fractions décimales (`decimal_nombre`), abscisses (`demi_droite_graduee`) et
   ÉCHELLES (`prop_echelle` : « l'échelle 1/200 » est gardée, Frédéric le 06/10 — dis à chaque fois ce
   qu'elle veut dire : « 1 cm sur le plan représente 200 cm en vrai ») — et c'est là qu'on apprend que
   5/2 = 5 ÷ 2. Partout ailleurs : durée « trois quarts d'heure » (pas « 3/4 h ») ; « × 0,1 » (pas
   « × 1/10 »). Le contrôle commun refuse toute barre entre deux nombres hors de ces notions.
7. Programme de 6e (cycle 3, BO en vigueur) : pas de nombres relatifs, pas de calcul littéral au-delà de
   ce que le fichier fait déjà, fractions simples.

⛔ Ne touche QUE tes fichiers de banque et leurs fichiers `correcteurs/<banque>.ts`. Pas git, pas de
serveur, ni le moteur, ni `index.ts`, ni `correcteurs/index.ts`, ni `correcteurs/types.ts`. ⛔ Pas de
heredoc bash ni de sed/python sur les .ts : outils Write/Edit.

⛔ **MÉTHODE DE TRAVAIL IMPOSÉE** (des agents ont planté, bloqués sans rien écrire) : travaille PAR PETITS
MORCEAUX. Une micro à la fois : réécris ses gabarits avec Edit (jamais un gros Write de tout un fichier
de banque), écris leurs correcteurs, passe les deux contrôles sur cette micro, puis passe à la suivante.
Ne lis pas un fichier de 2 000 lignes d'un coup : Grep, puis lis les lignes utiles. Ton dossier
temporaire : un sous-dossier à ton nom dans le scratchpad (d'autres agents y travaillent).

Si tu manques de temps, rends ce qui est fait et vérifié : mieux vaut 6 micros justes que 15 à moitié.

## Contrôles (tous doivent passer)

    npx --yes tsx@4 scripts/verifier-correcteurs-maths-6e.ts <ta notion>   → tous tes gabarits ✅
    npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 6e <ta notion>        → toutes tes micros ✅
    npx tsc --noEmit -p .   → aucune erreur dans tes fichiers (filtre sur le nom de ta banque)

Puis tire ~10 questions de chaque micro (petit script tsx dans ton dossier temporaire) et RELIS-LES comme
un professeur : justesse, plausibilité, une seule bonne réponse, phrase lisible par un enfant de 11 ans.

D'autres agents travaillent en même temps sur d'AUTRES banques de 6e : si un contrôle échoue à cause d'un
fichier qui n'est pas le tien, relance une ou deux minutes plus tard, puis signale-le simplement.

## Ton rapport (en français, court)

Tableau avant/après par micro (squelettes, pire répétition sur 20), ce que vérifient tes correcteurs et la
faute fabriquée qu'ils ont attrapée, la dernière ligne de chaque contrôle, tes doutes, et 3 questions
tirées telles quelles.
