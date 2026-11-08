# Brief commun — agents de rendu, « Repérer sur une demi-droite graduée » (6e, une paysage par micro ; + CM1/CM2 decimal_droite)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé). Frédéric en a besoin pour sa classe de 6e vers 10 h : vise un rendu HD fini en 3 h au plus.

## À lire d'abord, EN ENTIER
`manim/brief-agent-proportionnalite-lot4.md` (ordre obligatoire, règles, rapport) : il s'applique tel quel SAUF ce qui suit. Puis `manim/consigne-videos-proportionnalite.md` (leçons du pilote, ce qu'elle demande de lire) et `manim/REGLES.md` EN ENTIER (ceintures, questions-pauses, centres, « Ce que tu as appris » en haut et centré, rien de rogné, synchro, AUDIT, maths transversales, phrase de fin « Entraîne-toi sur éleveai point f r. Et abonne-toi… » telle qu'écrite dans REGLES).
Modèles : la paysage de notion existante `manim/scripts/6e/demi_droite_graduee.py` (+ ses 4 shorts `demi_droite_graduee_short.py`, voix `manim/voix/6e-demi-droite-*.json`) — son geste du SAUT (flèche courbe d'un trait au suivant) est À GARDER ; la vidéo récente `manim/scripts/6e/frac_decimal_v2.py` (+ `_marques.json`, droite graduée avec fraction au-dessus et décimal dessous, synchro par jetons, piège du dénominateur dans `_attente`) ; une paysage 6e récente de la série proportionnalité (`manim/scripts/6e/prop_tableau.py`) pour la garde, la ceinture, les questions-pauses, la fin. Canvas du coach à imiter : `lib/canvas/DroiteGraduee*.tsx`. Banque du coach : `lib/tutor-v4/questionBank/6e/maths/demi-droite.bank.ts` (et pour la CM : `lib/tutor-v4/questionBank/cm1/maths/decimaux.bank.ts`, `cm2/maths/nombres-decimaux.bank.ts`, micro `decimal_droite`) : la vidéo travaille EXACTEMENT ce que la micro demande, avec des nombres du même genre.
⛔ Ne modifie aucun fichier existant (copie dans TON script ce dont tu as besoin).

## La voix : tu l'écris toi-même
Frédéric a dit (19/10) de ne pas attendre sa validation : écris `manim/voix/<nom>.json` au format des voix existantes, puis enchaîne. Il la relira après. Règles :
- On n'ouvre PAS sur les maths : une situation concrète d'abord (une question qui intrigue), puis « Ce que tu vas apprendre ».
- Ses 6e lisent difficilement : phrases COURTES, un seul nombre nouveau à la fois, beaucoup de visuel ; chaque nombre dit est écrit à l'écran ; « virgule » dite pour 2,3 (« deux virgule trois »).
- 2 à 3 questions-pauses (QCM à 3 choix, leurre = erreur classique ci-dessous), un défi + sa correction, « Ce que tu as appris », phrase de fin.
- Erreurs classiques (les leurres) : compter les TRAITS au lieu des SAUTS (ou partir de 1 au lieu de 0) ; croire que le pas vaut toujours 1 (ou 0,1) sans le calculer ; lire 2,3 comme « 2 puis 3 traits de 1 » ; placer 3/4 au 3e trait d'une droite graduée en dixièmes ; graduer avec des sauts inégaux ; oublier l'origine.
- Durée libre (≈ 3 à 4 min) : la compréhension prime.
- UN centre d'intérêt et UN métier par épisode (liste fermée `lib/videos/centres-interet.ts`), celui de ta mission ; pas de La Réunion. Chiffres réels vérifiés par WebSearch si tu en cites (source + date en en-tête du script).

## Ceintures
Lire : blanche. Placer un décimal : jaune. Placer une fraction : orange. Graduer : orange. CM1/CM2 : voir ta mission.

## Ordre obligatoire, interdits, rapport
Ceux de `brief-agent-proportionnalite-lot4.md` (WAV via `scripts/generer-voix.ps1`, débit −10, dans `public/sons/<nom-de-la-voix>/` ; marques par `scripts/cues2marques.py` ; AUDIT dry run ; planches regardées ; UN rendu HD ; `scripts/verifier-bords-video.py` = 0 instants). ⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Un seul rendu à la fois de ton côté. Rapport final COURT : fichiers, durée, ceinture, centre/métier, la voix en entier (texte brut, écran par écran), `questions` JSON (t "MM:SS" mesuré), bords, planches vues, soucis restants.
