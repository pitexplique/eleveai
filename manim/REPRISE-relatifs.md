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


## ✅ FORMAT VALIDÉ par Frédéric le 07/11 : la suite se fait sans redemander

Pilotes de l'épisode 03 rendus et validés (`manim/sorties/4e/maths/relatifs/03-multiplication/`), code au commit `78f50864`. Validation du format seulement : il a regardé les pilotes et dit « oui ».

**Reste à faire, dans cet ordre :**
1. Les 12 autres vidéos (6 paysages, 6 shorts), épisodes 01, 02, 04, 05, 06, 07. Une par une, contrôle complet à chaque fois.
2. Passe finale sur les 14, épisode 03 compris : miniatures paysage, vignettes webp, manifeste (AJOUTER sans réécrire, voir la mémoire du manifeste), `python scripts/fiches-youtube.py relatif`, R2, `COUPE_FIN` recalée dans `components/LecteurVideo.tsx` (mesurer la phrase de fin de la paysage et du short).
3. Branchement au coach : `node scripts/brancher-videos-coach.mjs --id <ids> --ecrire` écrit en production. Le faire après le push, et le push se fait le soir sur son ordre.
4. Robustesse du coach (section plus haut) : plus de tournures de calcul à ★1-★2, mesure avec `npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e relatif_operation`. La banque a des modifs non commitées d'une autre session : regarder le diff avant de committer.
5. Rapport final : décisions, ce qui reste à écouter. Rien sur YouTube sans son ordre. `Validé : non` reste dans chaque `publication.md` tant qu'il ne l'a pas dit.

**Paysage : modèle** `manim/scripts/4e/relatif_multiplication.py`, outils dans `relatif_commun.py` (`PaysageRel`, `F`, `signe`, `TableSignes`, `Glacier`, `Frise`, `Droite`).
Chaîne : `scripts/generer-voix.ps1 -Fichier <voix.json> -Debit -6`, puis `scripts/marques_dump.ps1 -Fichier <voix.json> -Sortie <tmp> -Debit -6`, puis `python manim/scripts/4e/equation_commun.py <voix.json> <tmp>.cues.tsv <script>_marques.json`, puis `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD ; filtrer avec `tr '' '
' | grep -E "AUDIT-AVANCE|RETARD|BORD|Error|Traceback"`), brouillon `-ql` et planche regardée, UN rendu `-qh --disable_caching --media_dir manim/scripts/4e/media-rel-NN`, copie vers `manim/sorties/4e/maths/relatifs/NN-<slug>/`, `python scripts/verifier-bords-video.py <mp4>` = 0, planche finale regardée.
Défauts trouvés sur le pilote, à éviter d'emblée :
- une formule dans une carte de largeur 6 : font 42 à 46, pas 50-56 ;
- une formule encadrée à droite de l'écran : limite x ≈ 6,68, cadre et zoom compris ;
- un mot devant une formule (« Alors, ») : décaler `mis_sur_egal` pour lui laisser sa place ;
- un texte à côté de flèches « +5 » : colonne à x ≥ 3,65 ;
- une droite graduée : prendre toute la largeur disponible (x de −5 à 5, fs 34).

**Short : modèle** `FILMS.multiplication` dans `prototypes/ti-margo/films/relatifs.js`. Ajouter `FILMS.<épisode>` au même fichier. `poserDroite` et `poserMiniature` y sont déjà.
Chaîne : voix, `python scripts/ti-margo-cues.py relatifs <épisode>`, `CONTROLE=<dossier> node scripts/ti-margo-short.mjs relatifs <épisode> controle t1 t2…` et images regardées, `… miniature`, `… film` (3 à 4 min, en arrière-plan), contrôle des durées vidéo et son, planche finale, `publication.md` à côté du mp4 (`Validé : non`, modèle dans le dossier 03). Effacer `_muet.mp4` à la fin (il sert au mode `mix`).
Ton validé : Ti Margo complice, gag sur les maths, un défi et pas un mini-cours.

**Consigne du 07/11 (la miniature du « Défi du mur » a la plus forte progression de la chaîne) :**
- Miniature : Ti Margo en dessin plein cadre, un PARI en gros (« TU PARIES ? » ou une variante), la ceinture, la mention « Film d'animation 3D » en bas. Le modèle : `manim/sorties/ti-margo/defi-mur/`, et la miniature de l'épisode 03.
- Accroche : relire le clip 00 de chacune des 6 voix de short et y mettre le pari (comme « Tu paries que non ? » sur le 03), AVANT de générer la voix. Recaler les phrases sur les nouveaux instants.
- Décors et situations VARIÉS d'un short à l'autre (ascenseur, montgolfière, trésor, 3 portes, neige, dalles) : ne pas réutiliser le studio du 03. `poserDroite` n'est bon que si l'épisode a une droite graduée.

**Pièges :**
- `TableSignes` et autres groupes : un objet créé mais pas encore dans le groupe ne suit pas `move_to`.
- `manim/sorties/apercu.html` : une seule page, à réécrire pour les dernières vidéos, ouverte sur http://localhost:3900/apercu.html avec `preview_start {url}`. `preview_start {name:"sorties-video"}` a donné un 3901 mort, le serveur de 3900 tourne déjà.
- Le socle `short.js` / `personnage.js` est partagé avec les Triangles 6e : ne pas y changer un rendu. Surcharger dans `relatifs.js` (déjà fait pour `#panneau` et le zoom du bon choix).
- `manim/scripts/4e/media-rel-NN/` n'est pas ignoré par git : ne pas l'ajouter. Le supprimer une fois le mp4 copié.
- Commit PAR CHEMIN, pas de push sans son ordre.
