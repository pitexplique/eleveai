# Brief commun — agents de rendu, série PROPORTIONNALITÉ, lot 2 (échelles)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé).

## À lire d'abord, EN ENTIER
`manim/consigne-videos-proportionnalite.md` (surtout « Noms et sorties » pour les épisodes COMMUNS et « ⭐ Leçons du pilote et du lot 1 »), ce qu'elle demande de lire (dont `manim/REGLES.md`), puis les MODÈLES finis : `manim/scripts/6e/prop_tableau.py` + `_short.py`, `prop_unite.py` + `_short.py`, `prop_coefficient_short.py`, leurs `*_marques.json`, la base `manim/scripts/6e/prop_commun.py`, le module `manim/canvas_proportion.py` (API en en-tête ; `EchelleCarte` n'a encore servi dans AUCUNE vidéo : vérifie-la sur tes planches, contourne ses défauts dans ton script et signale-les). Modèle « une voix, un script, deux rendus » : en-tête et classes de `manim/scripts/stmg/proba_probaC_notation.py`.
⛔ Ne modifie NI `canvas_proportion.py` NI `prop_commun.py`.

## Voix
VALIDÉE par Frédéric (fichier donné dans ta mission). N'y change rien sauf erreur factuelle (dis-le). Vérifie par WebSearch les chiffres RÉELS cités dans ta voix (source + date en en-tête du script) ; s'il y en a un faux, corrige la phrase au plus juste et signale-le. WAV avec `scripts/generer-voix.ps1` (débit −10), rangés comme ceux du lot 1 (`public/sons/<nom-de-la-voix>/`).

## Épisode COMMUN 6e/4e (si ta mission le dit)
Un script `manim/scripts/6e/prop_<slug>.py` avec deux sous-classes `Prop<Slug>6e` / `Prop<Slug>4e` qui ne changent que l'identité (« Maths 6e — EleveAI » / « Maths 4e — EleveAI ») ; la voix ne cite aucune classe. Deux rendus HD de la paysage (un par classe). Le short n'affiche pas la classe : rends-le UNE fois et copie-le sous les deux noms. Sorties : `manim/sorties/6e/maths/proportionnalite/<NN>-<slug>/eleveai-maths-6e-prop-<slug>[-short].mp4` et la même chose sous `4e`.

## Règles du lot
Ceintures : paysage verte, short blanche (échelle entière). ⛔ Pas de produit en croix (6e et épisodes communs) ; « ÷ » pour une division. Unités écrites partout (cm sur le plan, m ou km en vrai). Montre le geste : plan court en bleu, réalité longue en vert (comme le canvas `echelle` du coach), l'opération écrite sur la flèche (× 10, ÷ 10).

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE → UN SEUL rendu HD par vidéo → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur questions, correction, « Ce que tu as appris »).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres, sources des chiffres réels, liste `questions` JSON (t "MM:SS" mesuré sur le rendu, question, choix, reponse 0/1/2, explication) pour chaque vidéo (une seule liste pour les paysages 6e et 4e d'un épisode commun si les t sont identiques, sinon les deux), résultat des bords, ce que tu as vu sur les planches, état d'`EchelleCarte`, soucis restants.
