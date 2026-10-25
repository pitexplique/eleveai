Prompt — suite au 26/10/2026 : ce qu'il faut CORRIGER et ce qu'il faut CONTINUER

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (mémoire de Frédéric, MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `mb*`, `*.cues.tsv`) ; story Instagram jamais poussée (`git log origin/main..HEAD --stat` avant chaque push) ; push 1 à 2 fois par jour, sur son signal ; ne jamais lancer la lecture d'une vidéo ; changer de session à 60 % de contexte ; 3 agents à la fois au plus ; ⛔ coach CM1/CM2 : AUCUNE question « open », et la moitié des gabarits avec une figure.

**Le plan** (mémoire `plan-deux-mois-videos-et-pays.md`) : vidéos + matrices des pays finies vers fin décembre 2026, ~300 $ ; coût mesuré 8 à 10 centimes par vidéo. Situer l'avancement en une ligne au début.

## Où on en est (25/10 soir, tout est poussé, dernier commit `5f418431`)
- Vidéos fractions : 6e (22), 5e (18), 4e (24) EN LIGNE (R2 + coach + manifeste) ; questions/centres dans `manim/questions-fractions.md` ; consigne `manim/consigne-videos-fractions.md`.
- Coach fractions : 6e `fraction_egale` (nouvelle), 4e `fraction_decimal` renforcée, CM1 (9 micros) et CM2 (13 micros) réparés. Feuilles d'exercices fractions CM1 (1) et CM2 (3).
- Pays : Québec, Maroc, Sénégal, Suisse romande, Belgique (FWB), Côte d'Ivoire branchés ; pages `/pays` INDEXÉES + 54 adresses au sitemap ; accueil : chaque pays montre ses classes (grisées sans matrice), la classe française correspondante et ses vidéos ; titre de l'accueil « Vidéos, coach, automatismes, fiches d'exercices ».

## À CORRIGER
1. **Vidéos CM non validées sur R2** : le lot CM I (arrêté) a rendu `manim/sorties/{cm1,cm2}/maths/fractions/01-lire/`, `02-representer/` (paysage + short) et `03-droite/` (paysage). Elles sont parties sur R2 avec l'envoi de la 5e mais sont RETIRÉES de `lib/videos/videos-r2.json` ; elles y reviennent à chaque `node scripts/generer-videos-r2.mjs` tant qu'elles restent dans les sorties → soit les valider (bords, planche, questions) et les finir avec le lot CM, soit les déplacer hors de `manim/sorties/` avant toute génération de la table.
2. **Petits défauts vidéo laissés** : 5e 02-simplifier dure 5:23 ; textes de réponse petits en 5e 08 et 09 ; 6e 04-decimal « dépasse 1 » 0,79 s après la voix ; 5e 09 question 2 à 0,42 s.
3. **Accueil** : les classes qui correspondent au CE1 et au CE2 (Suisse 5-6H, Belgique P2-P3, Québec 2e-3e année, Côte d'Ivoire CE1-CE2) n'affichent AUCUNE vidéo (nous n'avons pas de vidéos CE) ; le CP n'en a que 2 → afficher un message (« Vidéos bientôt : en attendant, le coach ») plutôt qu'une rangée vide, ou montrer les vidéos de la classe voisine.
4. **`/evaluation`** affiche encore l'ancien concours « Disponible le 1er juin » : le retirer du menu ou le rediriger vers « Faire le point » du coach (demander à Frédéric s'il y tient).
5. **Fichiers non commités d'une autre session** : `lib/fiches-exercices/chargeurs.ts` et `registre.ts` (entrées « analyse graphique » 2de/1re spé, blocs STMG déplacés) — ne pas les committer sans savoir d'où ils viennent.

## À CONTINUER (dans l'ordre)
1. **Vidéos CM fractions** (en pause sur sa demande, à reprendre sur son signal) : lots CM I (01-04 communs CM1/CM2, à finir), CM J (05-equivalente, 06-decimale, 07-defi communs ; 08-unite, 09-superieure-1 CM1), CM K (CM2 10 à 15) — consigne section CM, module `manim/scripts/cm1/frac_cm_commun.py`. Puis passe finale (modèle `a5aee451` / `1a1c0864`).
2. **Fiches de cours fractions** manquantes : CM1 (notion `fraction`), CM2 (`fraction_mixte`, `fraction_calcul`).
3. **3e puis lycée** pour les fractions (`fraction_rationnel` 3e ; rappels 2de, pourcentages STMG) : coach → feuilles → vidéos.
4. **Puis la notion suivante : la PROPORTIONNALITÉ**, CM1 → Tle, même méthode (coach robuste → feuilles → inventaire → consigne → lots de vidéos), en commençant par ses classes, 6e et 4e.
5. **Matrices des pays** : Belgique S4-S5, Côte d'Ivoire série C, Maroc primaire, Sénégal élémentaire, trous communs (volume pyramide/cône, polygones réguliers, angle inscrit, séries en classes).
6. **Publication YouTube** des 64 vidéos fractions (manuel, playlists Cycle 4 + CRPE).
7. **Google** : rappeler à Frédéric de soumettre `https://www.eleveai.fr/sitemap.xml` dans la Search Console (https://search.google.com/search-console → Sitemaps).
