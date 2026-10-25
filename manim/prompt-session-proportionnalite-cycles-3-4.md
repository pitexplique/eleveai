Prompt — série PROPORTIONNALITÉ, cycle 3 (CM1, CM2, 6e) puis cycle 4 (5e, 4e, 3e) — 25/10/2026

Colle ceci dans une nouvelle session :

---

Réponds toujours en français. Ne me pose pas de questions, sauf celle de l'étape 0 : tranche, avance, et liste tes choix à la fin. La qualité passe avant tout : je montre ces vidéos à mes élèves.

## Règles de travail
- **Commits** : committe PAR CHEMIN. Jamais `git add -A`, jamais `manim/scripts/*/media-*` ni `mb*`. Plusieurs sessions partagent le poste : ne touche à aucun fichier de la série fractions, qui tourne dans une autre session.
- **Push** : 1 à 2 fois par jour au plus, sur mon signal. Vérifie toujours `git log origin/main..HEAD --stat` avant : la story Instagram n'est jamais poussée.
- **Vidéos** : ne lance jamais leur lecture.
- **Changement de session** : à 60 % de contexte. Compacte si des agents tournent, sinon ouvre une nouvelle session, avec mémoire et prompt de reprise. Voir la mémoire `changer-de-session-a-65-pourcent.md`.
- **Agents** : 3 à la fois au plus. Écris dans un fichier, au fur et à mesure, ce que contiennent leurs rapports (questions, centres).

## À lire d'abord
- Mémoire : `serie-statistiques-prochaine-notion.md` (la méthode qui a marché), `serie-fractions-cm1-terminale.md` (la chaîne fraction → décimal → pourcentage, qui prépare la proportionnalité), `proportionnalite-4e-micros-graphique-et-relation.md` (déjà fait en 4e), `varier-les-contextes-de-vie.md`, `questions-pauses-dans-les-videos.md`, `schemas-de-billes-multiplication-division.md`, `division-signe-diviser-pas-de-fraction.md`.
- Règles vidéo : `manim/REGLES.md` EN ENTIER, surtout les questions-pauses, les centres d'intérêt, « Ce que tu as appris » en haut et centré, rien de rogné (marge de 3 %), la SYNCHRO à 0 s d'avance et l'AUDIT avant tout rendu HD.
- Modèles de consignes : `manim/consigne-videos-stats-cycle3.md`, `manim/consigne-videos-stats-cycle4.md`, `manim/consigne-videos-stats-lycee.md`.

## Étape 0 — me demander UNE chose
« Quelle erreur sur la proportionnalité vois-tu revenir le plus sur les copies ? » Ma réponse fera les accroches et les leurres. N'invente jamais ces erreurs. Pendant que j'y réfléchis, avance sur les étapes 1 à 3.

## Étape 1 — Inventaire (sans rien produire)
- Micros de proportionnalité de chaque classe du CM1 à la 3e : `lib/tutor-v4/knowledge/maths/<classe>/microSkills.ts`. Notions probables : proportionnalité, pourcentages, échelles, vitesse, grandeurs quotients, fonction linéaire en 3e.
- Vidéos qui existent déjà dans `manim/manifeste-youtube.json` et `lib/videos/videos-r2.json`, pour ne rien refaire. Par exemple : 4e proportionnalité (2 micros, paysage du 04/10), fractions 6e, pourcentages éventuels.
- Feuilles d'exercices dans `lib/fiches-exercices/` et `registre.ts`.
- Rends un tableau : classe → micros → coach (OK / à réparer) → feuille (oui / non) → vidéos (faites / à faire), avec le total de vidéos à faire.

## Étape 2 — Coach robuste d'abord
`npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts <classe> <notions…>`. Seuil : 30 squelettes au moins, et au plus 4 répétitions sur 20 à chaque étoile. Répare ce qui est sous le seuil avec des générateurs, pas des listes figées. Vérifie TypeScript (`npx tsc --noEmit -p .`), puis committe par chemin.

## Étape 3 — Feuilles d'exercices manquantes
Une feuille A4 recto verso par micro ou par notion, sur le modèle des feuilles de statistiques du cycle 3 et du cycle 4. Vérifie-les avec `scripts/verifier-exercices-*.mjs`.

## Étape 4 — Vidéos (une paysage et un short par micro)
Écris `manim/consigne-videos-proportionnalite.md`, sur le modèle des consignes stats, avec ce qui suit.
- **Épisodes communs** entre classes voisines (CM2 et 6e, 5e et 4e, 4e et 3e) : une voix, un script, deux rendus, comme pour 1re et STMG en statistiques.
- **Module commun** `manim/canvas_proportion.py`, en lecture seule pour les agents. Il contient le tableau de proportionnalité avec ses flèches × k et ÷ k, le passage par l'unité, les produits en croix (en 4e), le graphique droite passant par l'origine, l'échelle de carte et le schéma de billes. Le premier lot le construit et le valide, les suivants l'importent.
- **Ordre des lots** : d'abord 6e et 4e, mes classes. Commence par un PILOTE (un épisode de 6e) que je teste avant de lancer les autres. Puis CM1, CM2, 5e et 3e.

**Mes recommandations, à inscrire dans la consigne :**
1. **Montrer avant de calculer.** Pour reconnaître une situation de proportionnalité, il faut voir d'abord des contre-exemples réels : l'âge et la taille, le prix d'un forfait avec abonnement. Pas de règle avant d'avoir vu.
2. **Plusieurs méthodes, un même problème.** Passage par l'unité, coefficient, linéarité (additionner deux colonnes), produit en croix seulement en 4e. Chaque épisode dit laquelle il travaille, et l'élève choisit.
3. **La chaîne de la série fractions en fil rouge** : fraction → décimal → pourcentage. Un pourcentage, c'est une proportion sur 100. Fais le lien avec la série fractions sans dupliquer ses vidéos.
4. **Leurres des questions-pauses** : mes erreurs (étape 0), plus les classiques. Ajouter au lieu de multiplier (« 3 pour 5 € donc 6 pour 8 € »), garder une situation non proportionnelle, inverser le coefficient, confondre +20 % puis −20 % avec un retour au départ, multiplier une échelle à l'envers.
5. **Grandeurs et unités** : vitesse en km/h, prix au kilo, débit, recette, conversion de monnaie, échelle de carte. Unités écrites partout, avec « ÷ » et jamais 5/2 hors fractions.
6. **Centres d'intérêt et métiers** : 1 à 3 centres par vidéo, pris dans la liste fermée `lib/videos/centres-interet.ts`. Cuisine et animaux sont permis au cycle 3 et au cycle 4. Un métier différent par épisode, filles et garçons en alternance. Quelques pistes :
   - cuisine : recette pour 4 refaite pour 6, pâtissière ;
   - sport : vitesse d'un sprinteur, foulées, analyste sportif ;
   - argent-budget : prix au kilo, soldes, change, caissière, banquier ;
   - transports : consommation d'essence, horaires de train, conductrice ;
   - histoire-géographie : échelle d'une carte, cartographe ;
   - jeux vidéo : points d'expérience par niveau, game designer ;
   - musique : tempo (BPM), DJ ;
   - nature-écologie : eau consommée, déchets, ingénieure ;
   - espace : vitesse de la lumière, ingénieur.

   Données réelles vérifiées par WebSearch, avec la source et la date dans l'en-tête du script. Footballeurs possibles, avec des chiffres vérifiés.
7. **Shorts** : un jeu ou une surprise, une question-pause de 3 s, et une question chiffrée en commentaire pour finir. Idée : le prix au kilo des petits paquets contre le grand paquet (« le plus gros n'est pas toujours le moins cher au kilo »).
8. **Économie et qualité** (règles du 24-25/10) :
   - audit automatique de synchro et contrôle des bords en dry run AVANT tout rendu HD ;
   - planches de brouillon à 8 images en basse définition ;
   - UN SEUL rendu HD, puis `python scripts/verifier-bords-video.py <mp4>`, qui doit afficher « 0 instants » ;
   - planche finale de 12 images ;
   - rapports courts, sans recopier la voix.

## Étape 5 — Passe finale de chaque lot
Imite la passe finale des statistiques :
1. miniatures avec `manim/miniature_essai_v2.py` et `manim/miniature_short_expression.py` ;
2. entrées au manifeste (ids `<classe>-prop-<slug>[-short]`, champs `microId`, `notionId`, `questions`, `centres`, chapitres par dry run, titres de 100 caractères au plus) ;
3. `python scripts/fiches-youtube.py -prop-` ;
4. envoi sur R2 : `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/r2-videos.ps1 -Envoyer > log 2>&1`, depuis Bash, jamais `2>&1` dans PowerShell ;
5. `node scripts/generer-videos-r2.mjs`, puis `node scripts/brancher-videos-coach.mjs --id <ids> --ecrire` ;
6. commit par chemin.

⚠️ L'envoi R2 synchronise tout `manim/sorties` : ne committe dans `lib/videos/videos-r2.json` que les entrées de proportionnalité.

## Rapport pour moi à chaque étape
Court : ce qui est fait, ce qui reste, et les choix faits sans moi.
