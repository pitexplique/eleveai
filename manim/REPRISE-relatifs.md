# Reprise : série OPÉRATIONS SUR LES RELATIFS 4e (07/11/2026)

Notion `relatif_operation`, 7 micros, une paysage Manim et un short dessin animé Ti Margo 3D par micro.
Formule décidée par Frédéric le 07/11 : paysages habituelles, shorts en dessin animé.

## Déroulé validé à trois étapes
1. Voix des 14 vidéos soumises à Frédéric : `manim/voix/4e-relatif-<slug>[-short].json`. ⏳ EN ATTENTE DE SON OUI.
2. Un short et une paysage pilotes, contrôlés et montrés ; temps de rendu mesuré. Arrêt jusqu'à son oui.
3. Le reste sans redemander : rendu, contrôle, défauts mineurs, miniatures (« Film d'animation 3D » sur les shorts), manifeste, R2, coach.

## Robustesse du coach : À FAIRE À LA FIN DE LA SÉRIE (Frédéric, 07/11)
Mesuré le 07/11 sur la banque telle quelle (modifications non commitées du 03/11, chantier « ★1-★2 sans contexte » resté en cours, voir `coach-6e-4e-simple-a-1-2-etoiles`).
- Correcteurs : 51 gabarits justes sur 500 tirages. Fiches d'exercices : 1 417 vérifications justes, 0 fausse. Renouvellement : vert. 0 question `open`.
- ❌ Squelettes : 5 micros sur 7 au-dessus du seuil de 4 répétitions sur 20. `relatif_addition` ★1 7,0 ★2 6,4 ; `relatif_soustraction` ★1 6,0 ★2 5,5 ; `relatif_multiplication` ★1 6,5 ★2 4,3 ; `relatif_division` ★2 5,3 ; `relatif_probleme` ★2 8,4. `relatif_calcul` et `relatif_operation_defi` passent.
- Remède attendu : plus de tournures de calcul à ★1-★2 dans `operations-relatifs.bank.ts`, puis committer ce chantier. Mesure : `npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e relatif_operation`.
- `verifier-demarrage.ts 4e maths` et `verifier-generateurs.mjs 4e maths` n'ont rien affiché de filtré sur cette notion : à relancer à ce moment-là.

## Épisodes
| NN | slug | micro | ceinture paysage | ceinture short | centres | métier (paysage) | short |
|---|---|---|---|---|---|---|---|
| 01 | addition | relatif_addition | jaune | jaune | jeux-video | Inès, conceptrice de jeux vidéo | L'ascenseur fou |
| 02 | soustraction | relatif_soustraction | orange | orange | meteo-climat | Mathis, météorologue | La montgolfière |
| 03 | multiplication | relatif_multiplication | orange | orange | nature-ecologie, sciences | Léa, glaciologue | Le film à l'envers |
| 04 | division | relatif_division | orange | orange | animaux | Nour, biologiste marine | Le trésor |
| 05 | calcul | relatif_calcul | verte | verte | technologie-ia | Sami, ingénieur en robotique | Le jeu des 3 portes |
| 06 | probleme | relatif_probleme | verte | orange | sport, nature-ecologie | Clara, guide de haute montagne | Le gecko dans la neige |
| 07 | defi | relatif_operation_defi | verte | orange | histoire-geographie | Lou, historienne des sciences | Les dalles à moins 1 |

## Fichiers propres à la série
- Shorts : `prototypes/ti-margo-relatifs.html`, `scripts/ti-margo-relatifs-video.mjs` (copies de `ti-margo-vues*`, à créer après le oui sur les voix).
- Paysages : `manim/scripts/4e/relatif_<slug>.py`, sorties `manim/sorties/4e/maths/relatifs/NN-<slug>/`.

## Ne pas toucher
`prototypes/ti-margo-3d.html`, `prototypes/ti-margo-vues.html`, `scripts/ti-margo-video.mjs`, `scripts/ti-margo-vues-video.mjs` (session Triangles 6e) ; la banque `operations-relatifs.bank.ts` (modifications d'une autre session). Manifeste : ajouter des entrées, jamais le réécrire. Rien sur YouTube sans son ordre. Ne pas pousser.


## Fichiers des shorts (07/11) : le socle commun

Migré sur le socle de la session Ti Margo (`a7e85d3c`), voir `prototypes/ti-margo/LISEZ-MOI.md` :
- scènes : `prototypes/ti-margo/films/relatifs.js` (`FILMS.<épisode>`, `poserDroite`, `poserMiniature`) ;
- réglages : `films/relatifs.json` ; instants : `python scripts/ti-margo-cues.py relatifs <épisode>` ;
- rendu : `node scripts/ti-margo-short.mjs relatifs <épisode> film` (ou `controle`, `miniature`, `mix`).

Décor retenu : la droite graduée sur un PORTIQUE au-dessus de Ti Margo (il ne cache aucun nombre), triangle vert sur sa position, panneau du bas (petite droite, formule, bandeau à l'endroit / à l'envers).

Ne pas réécrire `#panneau` ni le zoom du bon choix dans `short.js` : ces deux réglages sont surchargés dans `relatifs.js`.

Voix : Frédéric a dit « lance les vidéos » sans relecture détaillée. Une correction reste possible tant que l'épisode n'est pas rendu.
