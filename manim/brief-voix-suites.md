# Brief commun — écrire les VOIX de la série SUITES du lycée (10/11/2026)

Réponds en français. Dépôt `C:\Users\FRED\Documents\eleveai`. Tu écris SEULEMENT des fichiers JSON de voix dans `manim/voix/` : rien d'autre (pas de WAV, pas de script, pas de rendu, pas de commit).

## Le modèle VALIDÉ par Frédéric (lis-le d'abord, c'est le ton et la structure à suivre)
`manim/voix/premiere-suite-arith-reconnaitre.json` (paysage) et `manim/voix/premiere-suite-arith-reconnaitre-short.json` (short). Lis aussi `manim/REGLES.md` (sections : phrase de fin, ceintures, transversales, questions-pauses, synchro) et, pour un exemple lycée plus long, `manim/voix/terminale-convexite-defi.json`.

## Structure d'une PAYSAGE (clés numérotées, mêmes noms de clés que le modèle)
- `00-garde` : le nom de la notion + SA QUESTION, en une ou deux phrases. Ni formule ni objectif.
- `01-situation` : une situation CONCRÈTE portée par une personne et son MÉTIER (prénom + métier), dans un domaine de vie. L'accroche ne parle pas de maths (modèle : la paysage TVI que Frédéric adore).
- 2 à 4 écrans de méthode (une idée par écran), avec les MÊMES tournures et notations que le coach.
- 2 ou 3 questions-pauses : clé `NN-question` (« Question ! … A : … B : … C : … Mets pause, et choisis ! ») puis `NNb-reponse` (« Réponse X. » + UNE phrase d'explication). Leurres = erreurs typiques de la micro (celles du coach).
- un écran « Voilà le piège ! ».
- `NN-defi` (« À toi de jouer ! … Mets pause, et cherche ! ») + `NNb-correction`.
- `NN-finale` : « Ce que tu as appris. » + 2 ou 3 phrases.
- `NN-abonne` : EXACTEMENT « Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche ! »
Durée visée : 2 min 30 à 4 min.

## Structure d'un SHORT
`00-garde` (nom + un PARI : « Tu paries que… ? »), `01-situation` (un autre domaine que la paysage), 1 ou 2 écrans courts, UNE question-pause (`NN-question` / `NNb-reponse`), `NN-commentaire` (une question CHIFFRÉE qui finit par « Réponds en commentaire ! »), `NN-abonne` EXACTEMENT « Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche ! ». Un défi, pas un mini-cours. 45 s à 1 min 15.

## Règles
- La voix dit EXACTEMENT ce qui sera écrit à l'écran : chaque nombre dit sera écrit. Écris les nombres en chiffres, à la française (9,5), « moins 3 » pour −3. Les notations se disent comme on les lit : « u indice n », « u indice n plus 1 », « u de n », « q puissance n », « la limite de u indice n quand n tend vers plus l'infini ». Aucune formule que la voix ne puisse dire mot à mot.
- QCM : tire au HASARD la place de la bonne réponse (A, B ou C) AVANT d'écrire, jamais deux fois la même lettre de suite dans une vidéo, et sur ton lot environ un tiers de A, de B, de C. Ne range pas les choix dans l'ordre croissant. Jamais deux choix de même valeur.
- Les maths sont TRANSVERSALES : un domaine de vie, un métier et une problématique DIFFÉRENTS à chaque vidéo (décider, prévoir, contrôler, choisir, juger une affirmation, évaluer un risque). Filles et garçons, métiers accessibles et réels. Domaines déjà pris par l'épisode 01 : agriculture (haies, silo), course à pied (marathon). La Réunion : au plus UNE fois sur tout ton lot, et seulement si ça sert.
- Ton : concret, respectueux, plein d'élan, jamais moralisateur. Élèves de 16-18 ans.
- Les réponses doivent être JUSTES : refais chaque calcul (deux fois). Une suite indexée « à partir de 0 » ou « de 1 » : dis-le toujours.
- La vidéo prépare EXACTEMENT ce que le coach demande : lis la banque et le `*-renfort.ts` de chaque micro (types de questions, étoiles, pièges) avant d'écrire.
- Chaque épisode : 2 fichiers, `manim/voix/<prefixe>-suite-<slug>.json` et `…-short.json`.

## À rendre (rapport final COURT, en français)
Pour chaque épisode : fichiers, ceinture (paysage verte, défi bleue, short blanche), métier et prénom, centres (1 à 3 dans la liste fermée `lib/videos/centres-interet.ts`), lettres justes des questions (paysage et short), réponse de la question en commentaire, et ce que le coach demande que la vidéo couvre. Signale tout doute de contenu.
