# Prompt de passage — série PROBABILITÉS, lot 4e

À coller dans une NOUVELLE session (écrit le 15/10/2026). La session d'origine publie en ce moment les 16 vidéos de 3e : ne pas toucher à ses fichiers (voir « Partage avec l'autre session »).

```
Série PROBABILITÉS d'EleveAI, lot du jour : 4e (pour MA classe de 4e, je leur montrerai les vidéos).
Réponds en français. Tout le contexte : manim/series-multiclasses.md (section « Le prompt maître », à suivre étape par étape avec [CLASSE] = 4e), mémoires serie-probabilites-cm1-terminale, shorts-amusent-paysages-apprennent, ceinture-de-difficulte-sur-les-videos, script-video-se-valide-a-deux, la-voix-correspond-aux-ecrits, publier-les-videos-sur-youtube.

LE LOT 4e = 13 micros = 26 vidéos (une paysage + un short par micro, défis compris)
- Notion proba_experience (lib/tutor-v4/questionBank/4e/maths/probabilites.bank.ts) :
  proba_vocabulaire, proba_issue, proba_evenement, proba_equiprobabilite, proba_calculer_fraction, proba_convertir, proba_comparer, proba_defi
- Notion proba_frequence (lib/tutor-v4/questionBank/4e/maths/frequences.bank.ts) :
  proba_frequence_calculer, proba_frequence_comparer, proba_frequence_repeter, proba_frequence_echantillon, proba_frequence_defi
- Ordre des micros = celui de lib/tutor-v4/knowledge/maths/4e/microSkills.ts.

LA 3e EST DÉJÀ FAITE : LA RÉUTILISER, PAS LA RECOPIER
- 16 vidéos de 3e rendues (pas encore toutes en ligne) : scènes manim/scripts/3e/proba_*.py et *_short.py, voix manim/voix/3e-proba-*.json, sorties manim/sorties/3e/maths/probabilites/, entrées « 3e-proba-* » du manifeste.
- Micros communes 4e/3e : vocabulaire, issue, evenement, equiprobabilite, calculer (3e proba_calculer ↔ 4e proba_calculer_fraction), defi.
  → reprendre le CODE des dessins (dé, roue, sac, cartes, bonbons, arbre) et la structure des scènes, mais PAS les mêmes situations ni les mêmes phrases : la 4e est un cran EN DESSOUS de la 3e (pas d'arbre à deux épreuves, pas d'événement contraire formalisé). Un élève qui regarde les deux doit voir l'idée grandir, pas la même vidéo.
- Micros propres à la 4e (rien à reprendre, à créer) : proba_convertir (fraction ↔ décimal ↔ pourcentage), proba_comparer (quel jeu est le plus favorable ?), et les 5 micros fréquences (fréquence observée, la comparer à la probabilité, répéter l'expérience, taille de l'échantillon — histogramme du dé 600 lancers de manim/scripts/annonce/annonce_probabilites.py).
- Dessins validés à réutiliser : manim/scripts/annonce/annonce_probabilites.py et annonce_probabilites_short.py.
- Consigne de rendu de la 3e, à adapter (chemins 3e → 4e, ceintures) : C:\Users\FRED\AppData\Local\Temp\claude\C--Users-FRED-Documents-eleveai\1418b1ff-2e82-4d09-8b86-740d4cbbca04\scratchpad\consigne_proba3e.md (si elle n'existe plus : elle est résumée dans la mémoire serie-probabilites-cm1-terminale).

RÉGLAGES 4e
- Classe Manim : class Notion4e(Notion6e) avec identite = "Maths 4e — EleveAI" ; shorts sur Short6e + margo_bas.
- Ceintures : paysages ORANGE (comme la série expression littérale 4e) ; shorts blanche si tout se voit sur le dessin, jaune dès qu'il y a un calcul ou une règle. ⛔ Pas tout en blanche : « les faibles auront du mal ». Échelle ENTIÈRE des 7 ceintures partout (shorts : echelle_ceintures("<c>").scale_to_fit_width(config.frame_width*0.7).move_to(P(0,2.3))).
- Voix : débit −7, script scripts/generer-voix.ps1. Fichiers manim/voix/4e-proba-<micro>.json et -short.json.
- Scènes : manim/scripts/4e/proba_<micro>.py et _short.py ; sorties manim/sorties/4e/maths/probabilites/<NN-micro>/.
- Exemples PRATIQUES et LUDIQUES : jeux (dé, petits chevaux, jeu de l'oie, cartes), kermesse, tombola, bonbons, billes, pile ou face, météo ; La Réunion seulement quand c'est naturel.
- Paysage : situation concrète d'abord (jamais une formule), méthode, pièges, défi « Mets pause, et cherche ! », correction, « Ce que tu as appris », épisode suivant, abonnement. Short : il AMUSE (pari, surprise) et finit par une question « Réponds en commentaire ! ».
- Chaque description renvoie à la bande-annonce https://youtu.be/unumlzio13U (comme les 3e).

DÉROULÉ
- Étape 0 : mesurer les deux notions (npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e proba_experience, puis 4e proba_frequence). Seuil : ≥ 30 squelettes par micro, ≤ 4 répétitions sur 20 à chaque étoile. Réparer ce qui est sous le seuil comme la 3e (commit dd5e9f75 : générateurs SITUATION × TOURNURE, ids gardés, tsc), tableau avant/après.
- Étape 1 : plan (situation de la paysage + jeu du short pour chacune des 13 micros), en disant ce qui vient de la 3e.
- Étape 2 : coller TOUTES les voix en entier et ATTENDRE mon « go ».
- Étapes 3 à 6 comme le prompt maître (agents en parallèle, contrôle image PyAV obligatoire, miniatures, manifeste, aperçu, publication une à une, branchement coach).
- Outils de publication : copier .tmp-publier-proba.js → .tmp-publier-proba-4e.js et .tmp-ressource-probabilites.mjs → .tmp-ressource-probabilites-4e.mjs (classe 4e, notions proba_experience ET proba_frequence).

PARTAGE AVEC L'AUTRE SESSION (elle publie la 3e en même temps)
- Ne PAS modifier : .tmp-publier-proba.js, .tmp-ressource-probabilites.mjs, les fichiers 3e (scènes, voix, sorties).
- manim/manifeste-youtube.json est commun : n'y ajouter les entrées « 4e-proba-* » qu'à l'étape 4, par un script qui RELIT le fichier juste avant d'écrire (jamais une version gardée en mémoire), JSON.stringify(m,null,2) + saut de ligne final.
- Même chose pour miniature_essai_v2.py et miniature_short_expression.py : ajouts seulement, relire juste avant.
- manim/sorties/apercu.html : ne le régénérer qu'avec les vidéos 4e, à la fin.
- Commit PAR CHEMIN (jamais git add -A) ; PAS de push : je pousse une ou deux fois par jour à mon signal.
- Ne jamais lancer la lecture d'une vidéo. Ne jamais parler de quota YouTube. Pas de < ni > dans les textes YouTube.

Commence par l'étape 0.
```
