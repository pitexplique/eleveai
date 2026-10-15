# Consigne commune — générateurs À CORRECTEUR pour le coach de français de 6e (05/10/2026)

Tu travailles dans C:\Users\FRED\Documents\eleveai (Next.js, TypeScript). Réponds et rapporte EN FRANÇAIS.

## Le problème (mesuré)

Frédéric (enseignant, statisticien) : ses élèves de 6e « tombent sur la même question mais avec des choix
différents » — « Léa observait le margouillat. Il ne bougeait plus. Que reprend « Il » ? », « Le vieux chêne
dominait la cour… ». Les questions « ne sont pas assez robustes, pas assez variées » ; « varier les prénoms
aussi ».

Le coach de français de 6e tire ses questions dans des listes écrites main
(lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, fonction `questionParMicro` /
`questionForNotion` : chaque micro → un pool `QcmItem[]` de 12 à 20 énoncés). Mesuré : 105 micros sur 123
sous le seuil, 12 à 20 phrases par micro. Le moteur évite désormais une phrase déjà vue (corrigé ce matin),
mais il ne peut pas inventer : il faut des GÉNÉRATEURS.

## Ce que tu fais

Tu remplis UN fichier : `lib/tutor-v4/questionBank/6e/francais/generateurs/<ta famille>.ts`
(il existe, avec `export const GENERATEURS: GenerateursFrancais = {};`). Lis d'abord
`generateurs/types.ts` : chaque entrée, clé = `microId` EXACT de la 6e, est
`{ generer(): QuestionFrancais, corriger(q): string[] }`.

1. **Lis l'existant** pour chacune de tes micros : son libellé et sa notion dans
   `lib/tutor-v4/knowledge/francais/6e/microSkills.ts`, puis le pool qui la sert aujourd'hui dans
   buildCycle3FrancaisBank.ts (suis l'aiguillage `questionParMicro` puis `questionForNotion` ; le pool
   générique d'une notion peut servir plusieurs micros). Garde l'OBJECTIF de la micro (BO de 6e, cycle 3) :
   le générateur pose la même compétence, autrement et beaucoup plus souvent neuf.
2. **`generer()`** compose la question à partir de TABLES : prénoms (mixtes, variés — Léa, Inès, Noah,
   Maël, Yanis, Chloé, Kenji, Aïcha, Lucas, Zoé, Hugo, Sofia, Malo, Nora… au moins 20, filles ET garçons,
   origines diverses), objets/animaux/lieux/situations (au moins 15, la vie d'un enfant de 11 ans : école,
   sport, cuisine, voyage, animaux, nature, mer, montagne, musique, jeux, sciences ; ⛔ pas La Réunion par
   défaut : un ou deux contextes réunionnais parmi quinze, pas plus), et TOURNURES de la consigne (3 à 5
   façons de poser la même question). La bonne réponse est CALCULÉE à partir des données tirées, jamais
   recopiée. Les leurres aussi sont construits (2 à 4, distincts, plausibles, clairement faux).
   Pour les micros de « savoir » (culture, oral, écriture, méthodes) où l'on ne peut pas calculer : une table
   d'au moins 40 FAITS justes (couples notion/définition, œuvre/genre, situation/bonne attitude…) et 3-4
   tournures qui les interrogent dans les deux sens (donner la notion → demander l'exemple, et l'inverse),
   avec les leurres pris parmi les autres faits de la table.
3. **`corriger(q)`** relit la question TIRÉE sans faire confiance au générateur et rend la liste des
   problèmes (tableau vide = juste). Il doit refaire le raisonnement sur le TEXTE que lit l'élève, par
   exemple : la bonne réponse figure dans l'extrait cité ; le pronom s'accorde avec UN SEUL groupe du texte
   (sinon l'énoncé est ambigu → problème) ; aucun leurre n'est aussi une bonne réponse (un leurre qui est
   aussi au masculin singulier dans une question d'accord, un synonyme accepté…) ; la forme verbale attendue
   est bien celle du temps demandé ; l'accord du participe est bien celui de la règle ; le fait interrogé
   est bien dans la table et le leurre n'a pas la même réponse. Un correcteur qui rend toujours `[]` est
   refusé : il doit attraper au moins une faute que tu fabriques exprès (essaie-le).
4. **Français impeccable** : accords, élisions (l'arbre, d'Inès), majuscules, guillemets français « … »
   avec espaces insécables comme le fichier existant, ponctuation (pas d'espace avant la virgule, espace
   avant « ? »/« ! »/« : » comme dans l'existant). Phrases courtes : ses élèves de 6e LISENT DIFFICILEMENT.
   `methode` : une phrase simple qui explique comment trouver (pas la réponse recopiée).
5. Couvre TOUTES les micros de ta liste (les « _defi » compris : un défi mélange les générateurs des autres
   micros de sa notion, à une étoile plus exigeante — par exemple deux phrases au lieu d'une).

⛔ Ne touche QUE ton fichier `generateurs/<famille>.ts` (tu peux créer des fichiers voisins
`generateurs/<famille>-tables.ts` si le tien devient trop long). Pas git, pas de serveur, pas d'autre
fichier : ni le moteur, ni buildCycle3FrancaisBank.ts, ni index.ts, ni types.ts. ⛔ Pas de heredoc bash
ni de sed sur les .ts : outils Write/Edit. Six autres agents écrivent en même temps les autres familles :
si un contrôle échoue sur un fichier qui n'est pas le tien, relance une ou deux minutes plus tard, puis
signale-le simplement.

## Contrôles avant de rendre (tous doivent passer)

    npx --yes tsx@4 scripts/verifier-correcteurs-francais-6e.ts <ta famille>   → toutes tes micros ✅
       (500 tirages par micro passés au correcteur + règles communes ; ≥ 40 questions distinctes)
    npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 6e-francais <tes notions>  → tes micros ✅
       (≥ 30 squelettes, ≤ 4 répétitions sur 20 à chaque étoile)
    npx tsc --noEmit -p .   → aucune erreur dans tes fichiers (filtre la sortie sur « generateurs/ »)

Puis tire toi-même ~15 questions de CHAQUE micro (petit script tsx dans ton dossier temporaire qui importe
ton fichier par chemin absolu) et RELIS-LES comme un professeur de français : justesse, une seule bonne
réponse, phrase naturelle, lisible par un élève de 11 ans qui lit mal.

## Ton rapport (en français, court)

Tableau avant/après par micro (squelettes ; questions distinctes), ce que vérifie ton correcteur et la faute
fabriquée qu'il a attrapée, la dernière ligne de chaque contrôle, et tout doute (une micro que tu n'as pas
su générer, une réponse discutable). Cite 3 questions tirées de ton choix, telles quelles.
