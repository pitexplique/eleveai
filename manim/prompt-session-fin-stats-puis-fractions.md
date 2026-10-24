Prompt — fin de la série STATISTIQUES, puis série FRACTIONS (24/10/2026 soir)

Colle ceci dans une nouvelle session :

---

Réponds toujours en français. Ne me pose pas de questions : tranche, avance, et liste tes choix à la fin.

**Règles** :
- Committe PAR CHEMIN : jamais `git add -A`, jamais `manim/scripts/*/media-*` ni `mb*`.
- La story Instagram n'est jamais poussée : vérifie `git log origin/main..HEAD --stat` avant chaque push.
- Ne lance jamais la lecture d'une vidéo. La qualité passe avant tout.
- Change de session à 60 % de contexte : compacte si des agents tournent, sinon ouvre une nouvelle session (voir la mémoire `changer-de-session-a-65-pourcent.md`).
- Ne montre jamais les clés R2.

## 1. Finir les statistiques (STMG 20 à 32)
Dans l'ancienne session, deux agents finissaient :
- **J1** : STMG 20-ajust-pertinence, 21-ajust-au-juge, 22-ajust-equation, 23-ajust-calculer, 24-interpoler, 25-extrapoler, 26-limites. Il refaisait ses dernières vidéos (22 à 26) et appliquait la règle de synchro.
- **J2** : STMG 27-mc-principe, 28-mc-calculer, 29-mc-comparer, 30-cv-appliquer, 31-cv-lire, 32-cv-revenir. Il refaisait les vidéos où des étiquettes arrivaient environ 1 s trop tôt.

**Vérifier qu'ils ont fini** :
- Lance `tasklist | grep -i -E "manim|python"`. Si un rendu tourne encore, attends.
- Pour chaque dossier `manim/sorties/stmg/maths/statistiques/2[0-9]-*` et `3[0-2]-*`, vérifie que la paysage et le short existent.
- Lance `python scripts/verifier-bords-video.py <mp4>` sur chaque vidéo : il doit afficher « 0 instants ».
- Fais une planche PyAV de 12 images sur 2 ou 3 vidéos.
- Si une vidéo manque ou est cassée, relance un agent pour ce morceau seulement.

**Questions-pauses et centres** (`manim/questions-stats-lycee.md`) :
- Ceux de J2 y sont déjà, mais les temps ont pu bouger avec ses re-rendus. Remesure-les par un dry run.
- Ceux de J1 n'y sont PAS. Relève-les dans ses voix (`manim/voix/stmg-stats-{ajust-*,interpoler,extrapoler,limites}*.json`) et ses scripts, puis mesure les temps par un dry run.

**Passe finale des 26 vidéos** :
- Pour les miniatures et le manifeste, imite exactement les 92 entrées stats du lycée déjà présentes dans `manim/manifeste-youtube.json` :
  - ids `stmg-stats-<slug>[-short]` ;
  - champs `microId`, `notionId`, `questions`, `centres` ;
  - chapitres mesurés par dry run.
- Outils des miniatures : `manim/miniature_essai_v2.py` et `manim/miniature_short_expression.py`.

Enchaîne ensuite, dans cet ordre :
1. `python scripts/fiches-youtube.py -stats-`
2. Envoi sur R2 : `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/r2-videos.ps1 -Envoyer > log 2>&1`, lancé depuis Bash. Jamais `2>&1` dans PowerShell.
3. `node scripts/generer-videos-r2.mjs`
4. `node scripts/brancher-videos-coach.mjs --id <les 26 ids> --ecrire`
5. Commit par chemin : scripts, voix, marques, manifeste, `questions-stats-lycee.md`, `lib/videos/*.json`.
6. **PUSH** : Frédéric l'a autorisé pour cette fin de série (« puis commit et pousse »). Vérifie d'abord la story.
7. Mets à jour la mémoire `serie-statistiques-prochaine-notion.md` : série statistiques CM1 → Terminale COMPLÈTE.

**Mesure de consommation** : départ le 24/10 à 08 h 27, quota hebdomadaire à 0 %. Note le quota hebdomadaire actuel et donne à Frédéric le bilan de la série lycée (118 vidéos).

## 2. Puis : la série FRACTIONS, du CM1 à la Terminale
Lis d'abord la mémoire `serie-fractions-cm1-terminale.md`. Elle contient :
- **Ses erreurs sur les copies** : SIMPLIFIER, puis fraction → DÉCIMAL → POURCENTAGE.
- **Les contextes et centres d'intérêt par erreur.**
- **Son énigme du gâteau** : en 6 parts au compas pour la 6e, en 5 parts dans un gâteau carré pour la 5e et la 4e.

Méthode, comme pour les statistiques, en commençant par SES classes, la 6e puis la 4e :
1. **Coach robuste** : `npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts <classe> <notions…>`. Seuil : 30 squelettes au moins, et au plus 4 répétitions sur 20 à chaque étoile. Répare ce qui est sous le seuil.
2. **Feuilles d'exercices** : vérifie celles qui existent (`lib/fiches-exercices/`, `registre.ts`) et complète celles qui manquent.
3. **Inventaire des vidéos de fractions déjà faites** (manifeste, `lib/videos/videos-r2.json`), pour ne rien refaire. La 6e « fractions, calcul » existe déjà, rendue le 05/10.
4. **Consigne vidéo** `manim/consigne-videos-fractions.md`, sur le modèle de `manim/consigne-videos-stats-lycee.md` :
   - une paysage et un short par micro ;
   - questions-pauses : 2 ou 3 par paysage (5 s), 1 par short (3 s) ; les leurres viennent de SES erreurs (simplifier en soustrayant, 3/4 = 3,4, 0,75 = 0,75 %) ;
   - centres d'intérêt : 1 à 3 par vidéo, pris dans `lib/videos/centres-interet.ts` (cuisine et animaux permis jusqu'à la 3e) ;
   - « Ce que tu as appris » en haut et centré ;
   - marge de 3 % ;
   - synchro voix/écrit à 0 s d'avance (`manim/REGLES.md`) ;
   - économie : brouillons à 8 images, final à 12, rapports courts ;
   - modules communs réutilisés d'un lot à l'autre, épisodes communs entre classes.
5. Lots de vidéos : 3 agents à la fois au plus. Écris les questions et les centres de chaque rapport dans `manim/questions-fractions.md` au fur et à mesure.

Push : 1 ou 2 fois par jour au plus, sur son signal (sauf l'autorisation de la partie 1).

## Pour plus tard (ne pas faire maintenant)
- Session de réflexion classes × pays : `manim/prompt-session-transversal-classes-pays.md`.
- Pays retenus : France, Suisse romande, Belgique, Maroc, Québec, Côte d'Ivoire, Sénégal. Les USA et l'Ontario sont retirés du site.
