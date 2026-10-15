# Prompt de passage — PILOTE probabilités : épisode 1 de 9 classes (18 vidéos)

À coller dans une NOUVELLE session (écrit le 15/10/2026). D'autres sessions publient la 3e et la 4e (`manim/prompt-probabilites-4e.md`). Ne pas toucher à leurs fichiers.

```
PILOTE de la série PROBABILITÉS d'EleveAI : 2 vidéos par classe (1 paysage + son short jumeau) pour 9 classes = 18 vidéos.
But : savoir QUELLES CLASSES font le plus de vues avant de produire les ~300 vidéos. Seules les classes gagnantes auront ensuite leur série complète.
Choix de Frédéric (15/10) : le pilote porte sur la PREMIÈRE MICRO de la (première) notion de probabilités de chaque classe → c'est directement l'ÉPISODE 1 de la future série de la classe (rien n'est perdu si la classe gagne).
Réponds en français. Contexte : manim/test-classes-probabilites.md (règles du test + tableau de suivi), manim/series-multiclasses.md (prompt maître : on en suit les étapes, mais pour UNE micro par classe), mémoires serie-probabilites-cm1-terminale, shorts-amusent-paysages-apprennent, ceinture-de-difficulte-sur-les-videos, script-video-se-valide-a-deux, la-voix-correspond-aux-ecrits, publier-les-videos-sur-youtube.

LES 9 PILOTES : CM1, CM2, 6e, 5e, Seconde, Première (tronc commun), Première spé, STMG, Terminale spé (3e et 4e : séries complètes déjà faites = référence).
- Pour chaque classe, relever la première notion de probabilités dans lib/tutor-v4/knowledge/maths/<classe>/notions.ts (ordre du coach), puis SA PREMIÈRE MICRO dans microSkills.ts. Montrer le tableau (classe, notion, micro, libellé) avant d'écrire quoi que ce soit.
- Ceintures des paysages : CM1 blanche, CM2 blanche, 6e blanche, 5e jaune, 2de bleue, 1re bleue, 1re spé marron, STMG bleue, Tle spé noire (ordre : blanche, jaune, orange, verte, bleue, marron, noire ; 3e = verte, 4e = orange). Shorts : blanche si tout se voit sur le dessin, jaune dès qu'il y a un calcul, plus haut au lycée si besoin. Échelle ENTIÈRE des 7 ceintures partout.
- Débit des voix : CM1-CM2 −10, 6e-5e −8, lycée −6/−7.
- Le COACH est déjà robuste pour toutes ces micros (réparé le 15/10, mesure au vert partout) : l'étape 0 se limite à vérifier la mesure.
- Les épisodes 1 de la 3e et de la 4e (manim/scripts/3e/proba_vocabulaire*.py, manim/scripts/4e/proba_*) servent de RÉFÉRENCE : même format (paysage ≈ 2-3 min, short ≈ 30 s, même gabarit, même structure). Ici on PEUT dire « épisode 1 » puisque c'en est un.

POUR QUE LE TEST SOIT JUSTE
- Chaque pilote est l'ÉPISODE 1 de sa classe (titre « … — épisode 1 · Maths <classe> » comme la 3e) ; à la fin, au lieu d'annoncer l'épisode 2 : « La suite arrive pour ta classe : dis-le en commentaire si tu la veux ! ».
- Toutes les classes au même rythme et au même format, pour comparer des épisodes 1 entre eux.
- Titres construits pareil : « <accroche-piège> — <titre de la micro> — épisode 1 · Maths <classe> ». Miniatures sur le même modèle (miniature_essai_v2.py, _piege3 + échelle des ceintures).
- Chaque description renvoie à la bande-annonce https://youtu.be/unumlzio13U.

ÉTAPES
- Étape 0 — tableau des 9 premières micros (voir plus haut) + vérification de la mesure (npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts <classe> <notionId> ; toutes les classes sont dans la table BANQUES). Normalement tout est au vert.
- Étape 1 — plan : pour chaque classe, la situation concrète de la paysage et le jeu du short. Exemples PRATIQUES et LUDIQUES (jeux de société, cartes, kermesse, bonbons, billes, météo, sport) ; La Réunion seulement quand c'est naturel. Chaque classe monte d'un cran : l'élève de terminale ne doit pas voir une vidéo de 5e.
- Étape 2 — voix : coller les 18 voix EN ENTIER et ATTENDRE mon « go ». La voix = l'écrit (chaque nombre dit est écrit au moment où il est dit). Probabilité en fraction, dite « 1 sur 6 ». Au lycée, notations P(A), P_A(B), « parmi les… sachant que… » écrites en Text (pas de LaTeX).
- Étape 3 — rendu après « go » : un agent par classe en parallèle. Modèles : manim/scripts/5e/expression_comprendre.py (paysage), manim/scripts/4e/expression_reduire_short.py (short), dessins de manim/scripts/annonce/annonce_probabilites*.py et manim/scripts/3e/proba_*.py. Contrôle image PyAV obligatoire. Rien ne chevauche Ti-Margo, aucun nom de personne à l'écran.
  Fichiers : manim/voix/<classe>-proba-<micro>.json et -short.json ; manim/scripts/<classe>/proba_<micro>.py et _short.py ; sorties manim/sorties/<classe>/maths/probabilites/01-<micro>/ (c'est l'épisode 1). Dossier de scripts : créer manim/scripts/<classe>/ si absent (cm1, cm2, seconde, premiere, premiere-spe, stmg, terminale-spe).
- Étape 4 — miniatures, manifeste (ids « <classe>-proba-<micro> » et « -short », chapitres au dry run, {{LONGUE}} dans les shorts), aperçu (port 3900, à l'arrêt).
- Étape 5 — publication : un pilote par jour, même heure, paysage puis short le même jour. Outil : copier .tmp-publier-proba.js → .tmp-publier-pilote.js, et le branchement → .tmp-ressource-pilote.mjs (chaque micro sur sa classe). Après chaque lien : remplir la ligne de manim/test-classes-probabilites.md (ids, date).
- Étape 6 — à J+7 et J+14 de chaque pilote, me demander les vues (paysage / short), la durée moyenne regardée et les abonnés gagnés, et les noter dans le tableau. Après le dernier J+14 : proposer les classes gagnantes.

PARTAGE AVEC LES AUTRES SESSIONS
- Ne PAS modifier les fichiers 3e et 4e de probabilités ni leurs outils (.tmp-publier-proba*.js, .tmp-ressource-probabilites*.mjs).
- manim/manifeste-youtube.json, miniature_essai_v2.py, miniature_short_expression.py sont communs : ajouts seulement, en RELISANT le fichier juste avant d'écrire ; manifeste en JSON.stringify(m,null,2) + saut de ligne final.
- Commit PAR CHEMIN (jamais git add -A), PAS de push : je pousse une ou deux fois par jour à mon signal.
- Ne jamais lancer la lecture d'une vidéo. Ne jamais parler de quota YouTube. Pas de < ni > dans les textes YouTube.

Commence par l'étape 0.
```
