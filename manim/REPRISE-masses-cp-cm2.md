# Reprise : série MASSES du CP au CM2 (session C, mardi-mercredi 17-18/11 ; relève F le 16/11 au soir)

> ⛔⛔ **16/11, Frédéric : la QUALITÉ OPTIMALE avant le rythme** (« le principale est de tout finir avec une qulité optimum », « meme si on finit fin janviert »). Le rythme de 150 vidéos/semaine ne passe JAMAIS avant : contrôles complets, compteur des shorts vérifié avant chaque film, voix validées à deux, coach robuste. Ne jamais presser la série. (À recopier en tête du prompt de la relève.)

Prompt : `docs/prompt-serie-masses-angles-cm.md` ; plan : `manim/PLAN-mardi-mercredi-17-18-11.md` (session C). Rien n'est poussé.
⛔ 16/11 Frédéric : « si la 6e n'a pas de masse tu fais pas » → PAS de vidéos 6e (aucune notion masse au coach 6e).

## Inventaire (16/11)
- Manifeste : AUCUNE vidéo masse (CP → CM2). R2 : rien. Tout est à tourner.
- Banques du coach : CP `masse_contenance` (4 micros), CE1 `masse` (7), CE2 `masse` (7), CM1 `masse` (4), CM2 `masse` (4, fichier `masses.bank.ts`). 6e : rien.
- `aussi` (même niveau, pas tourné deux fois) :
  - `ce1_masse_soupeser` ← `cp-masse-comparer` (balance à plateaux, soupeser)
  - `ce1_masse_comparer` ← `ce2-masse-comparer` (pilote : 1 kg / 900 g, plumes / cailloux)
- ⚠️ Le CM1 a 5 micros, pas 4 : `masse_mesurer` (lire une balance) manquait au plan → voix ajoutée (Kenza, herboriste).
- À tourner : 25 paysages + 25 shorts = 50 vidéos (CP 4, CE1 5, CE2 7, CM1 5, CM2 4).

## Fichiers
- Voix (source UNIQUE) : `manim/scripts/ce2/masse_voix.py` → `manim/VOIX-masses-cp-cm2.md` (récap à valider) + `manim/scripts/ce2/masse_voix.json` (choix, bonne lettre, explications : lus par les scripts et pour le manifeste). Après le « oui » : `python manim/scripts/ce2/masse_voix.py --ecrire` → `manim/voix/<id>.json`.
- Bonnes réponses : graine 1116, A 25 / B 25 / C 25, jamais deux fois la même lettre dans une paysage.
- Commun : `manim/scripts/ce2/masse_commun.py` (importe `contenance_ce2_commun` sans le modifier) : `Balance` (Roberval qui penche, `poser`, `vers`), `basculer()`, `masse_marquee`, `balance_cuisine`, `balance_electronique` (+ `afficher`), `pese_personne`, `tableau_masses` (t | kg | hg | dag | g), objets (`meule`, `part_fromage`, `sac`, `paquet`, `plumes`, `cailloux`), `anais`, base `PaysageMasse` (+ `etiquette`). Image de contrôle relue le 16/11 (balances, cadran, tableau). Les autres personnages : à ajouter épisode par épisode.
- Pilote : `manim/scripts/ce2/masse_comparer.py` / `MasseComparerCE2` ✅ (voir plus bas).

## Métiers (neufs, 13 filles / 11 garçons ; La Réunion : 1, Malo à Saint-Pierre)
CP : Awa déménageuse, Hugo primeur, Zoé toiletteuse, Noé livreur à vélo. CE1 : Jade postière, Liam vendeur en vrac, Chloé bibliothécaire, Malo pêcheur, Lina jongleuse. CE2 : Rayan grutier, Emma torréfactrice, Anaïs fromagère (pilote), Tom chauffeur routier, Sarah sage-femme, Adam agent d'enregistrement, Louise savonnière. CM1 : Ilyes jockey, Margaux diététicienne, Enzo ornithologue, Alice cheffe de chantier, Kenza herboriste (mesurer). CM2 : Théa ingénieure en aéronautique, Mathis maréchal-ferrant, Juliette océanographe, Hamza pilote de montgolfière.

## ✅ Pilote CE2 03 comparer FINI (16/11 après-midi)
- Voix validées (« Oui, lance ») ; 50 WAV dans `public/sons/*-masse-*` (Julie, −6) ; `manim/voix/*-masse-*.json` écrits.
- Paysage HD 2 min 57, 0 bord, dry run 0 alerte (sauf « 974 », normal). Q1 changée : « rien ne bouge » (B), trois choix en fs 24.
- Short Ti Margo 62,8 s : `prototypes/ti-margo/films/ce2-masse.js` (craie : `fromageCraie`, `balanceCraie`, `sacCraie`, `deuxAuPlusM`) + `ce2-masse-comparer.js` + `ce2-masse.json` (épisodes 01 → 07). ✅ Compteur contrôlé avant le film (barre visible à 32,7 s, `display=reb?'block':'none'` présent). ⚠️ `verifier-bords-video.py` ne vaut rien sur un dessin animé (décor plein cadre : 63, le short contenance validé donne 64).
  - ⛔ voixDe : écrire 1 000 / 1 800 avec une ESPACE INSÉCABLE (`1 000`), sinon « 1 000 est » casse ; `deuxAuPlusM()` puis `fusionnerNombres()` en tête du film.
- Miniatures : paysage `python manim/miniature_masse.py <id>` (registre EP à compléter), short `node scripts/ti-margo-short.mjs ce2-masse <ep> miniature`.
- Manifeste : `python manim/passe_masse.py temps|voir|manifeste` (registre EP à compléter ; pilote au 29/04/2027, `aussi` ce1_masse_comparer). Fiche YouTube, vignettes, R2, videos-r2 + bilans (seulement nos clés), coach ET Supabase `notion_ressources` (ce2 + alias `ce2-masse-comparer@ce1_masse_comparer`) : faits, vérifiés en base.

## ✅ Épisodes finis après le pilote (session D, relève du 16/11 soir)
Outils ajoutés : `perimetre_marques.py masse:<slug>:<classe>` (→ `masse_<classe>_<slug>_marques.json`), `films/cp-commun.js` (copie de ce2-commun.js), `films/cp-masse.js` (balance, sac, ballon, bille, plume, pomme, pastèque à la craie), `passe_masse.py` : champ `notion` (CP = `masse_contenance`), tags sans doublon. Scripts CP/CE1/CE2 : `manim/scripts/ce2/masse_<classe>_<slug>.py`. Rendu HD : `-o eleveai-maths-<classe>-masse-<slug> --media_dir manim/scripts/ce2/media-mas-<classe><NN>`, copie dans `manim/sorties/<classe>/maths/masse/<NN>-<slug>/` ; supprimer `_muet.mp4` après le film.
- **CP 01 lexique** (Awa) : paysage 2 min 25, dry run 0, bords 0, planche HD relue ; short 60 s, ✅ compteur contrôlé avant le film (barre pleine à 29,9 s, vide à 32,7 s, dans la carte, rien dessus) ; miniatures (« Dessin animé ») ; manifeste 30/04/2027 ; fiche, vignettes, R2, videos-r2 (nos 2 clés seulement), coach + Supabase (2 lignes `cp_masse_lexique`).

- **CP 02 comparer** (Hugo, session E 16/11) : paysage 2 min 26, dry run 0, bords 0, planche HD relue (le plateau du plus lourd descend partout). Défauts corrigés : choix des questions qui rétrécissaient seuls → `_disposer_q` du script (colonne −1,8, cartes +1,2, choix tous en 24, phrase de réponse resserrée) ; question 2 sur 4 lignes courtes ; « Mets pause, et cherche ! » remonté à y −1,6 (touchait Ti Margo). Short 63,3 s `films/cp-masse-comparer.js` (doudou, voiture en fer, goûter à la craie dans `cp-masse.js`) : ✅ compteur contrôlé avant le film (barre pleine à 30,3 s, vide à 33,1 s, dans la carte, rien dessus ; `display=reb?'block':'none'` présent). Miniatures (« Dessin animé »), manifeste 01/05/2027 (`aussi` ce1_masse_soupeser), fiche, vignettes, R2, videos-r2 (nos 2 clés), coach + Supabase (4 lignes : cp_masse_comparer ×2, ce1_masse_soupeser ×2).

- **CP 03 estimer** (Zoé toiletteuse, session G 16/11 soir) : paysage HD 2 min 16, bords 0, planche HD relue (balances de « deux par deux » et de la question 1 : le plus lourd descend). Short 60,5 s `films/cp-masse-estimer.js` (trois chats sur la branche ; à la craie dans `cp-masse.js` : `brancheCraie`/`brancheY`, `chatCraie`/`unChat`, `elephantCraie`, `fourmiCraie`, `lapinCraie`). Défauts corrigés sur les images de contrôle : sol du commentaire remonté (SOL 620 : les pattes de l'éléphant touchaient la tête de Ti Margo), fourmi agrandie et écartée de l'éléphant, fêlure de la branche plus grande, chats plus grands, feuilles de la branche raccourcies (touchaient l'oreille du matou au sol). ✅ Compteur contrôlé avant le film (barre pleine à 27,92 s, 2/3 à 28,92, 1/3 à 29,92, presque vide à 30,82, disparue à 31,0 ; dans la carte, rien dessus ; `display=reb?'block':'none'` présent). Miniatures (« Dessin animé »), manifeste 02/05/2027 (chapitres de moins de 10 s fondus : normal), fiche, vignettes, R2 (7 fichiers), videos-r2 (nos 2 clés), coach + Supabase (2 lignes `cp_masse_contenance_estimer`).

- **CP 04 défi** (Noé livreur à vélo, session G 16/11 soir) : script `masse_cp_defi.py` / `MasseDefiCP` (hérite de `MasseEstimerCPBase` ; dessins neufs dans masse_commun : `noe`, `velo_livreur`, `colis`, `sac_plein("plumes"|"billes")`, `prune`, `cerise`). Les deux pesées sur UN écran (`self.dire("03-pesee2")` sans `ecran`). Dry run 0 RETARD / 0 AUDIT-AVANCE / 0 bord ; -ql relu 5 fois, défauts corrigés : choix longs de la question 2 (`fs_choix` 24, `decal_q` 3,3, `elargir_q` 2,1 : nouveaux réglages de `_disposer_q`, CP 03 inchangé), question et phrase de réponse en lignes courtes (sinon rétrécies), sacs montrés AVANT la question (`avant_q`, sans étiquette), étiquettes de la flèche de la correction `hors_audit` (elles faisaient attendre l'écran), « Mets pause, et cherche ! » à gauche (frôlait Ti Margo). Paysage HD 2 min 22, bords 0, planche HD relue. Short `films/cp-masse-defi.js` (trois cadeaux de même taille, UNE grande balance pesée après pesée, le couvercle se pose debout contre le cadeau, un gros caillou dedans ; commentaire chat / lapin / souris ; à la craie dans `cp-masse.js` : `cadeauCraie`, `caillouCraie`, `sourisCraie`). Défauts corrigés sur les images de contrôle : balances et cadeaux trop petits, flèche coupée au bord, couvercle qui cachait le caillou, animaux trop petits. ✅ Compteur contrôlé avant le film (barre aux 2/3 à 28,38 s, au tiers à 29,38, presque vide à 30,28, disparue à 30,5 ; dans la carte, rien dessus ; `display=reb?'block':'none'` présent). Miniatures, manifeste 03/05/2027, fiche, vignettes, R2, videos-r2, coach + Supabase : voir le commit.

## ✅ CE1 (session H, 17/11)
Outils CE1 : scripts `manim/scripts/ce2/masse_ce1_<slug>.py` (héritent de `MasseEstimerCPBase`), marques `masse_ce1_<slug>_marques.json` (faites pour les 5), série short `ce1-masse` (`films/ce1-masse.json`, `ce1-masse.js` = copie de cp-masse.js + `trombone`, `etiquetteCraie` ; `ce1-commun.js` = copie de cp-commun.js ; `ce1-masse-cues.js` fait pour les 5). Rendu HD : `$TEMP/hd-masse.sh <script> <Scène> <nom> <media> <sortie>` (verrou + copie + bords). Commit : `$TEMP/commit-masse.sh <message> ce1-masse <fichiers>` (index temporaire, nos clés, puis `git reset` des chemins).
⚠️ Pièges : `au_mot` prend la dernière marque AVANT l'extrait ; certaines voix n'ont pas de marque sur « 500 plus 500 » (attendre la marque d'avant + `self.wait`). `ligne()` aligne les centres : `base_commune(ligne)` (masse_commun) remet les chiffres sur la même ligne de base. Short : « 1 gramme. 1 gramme ? » = 4 marques identiques de suite → PAS de `deuxAuPlusM`, et les deux dans le MÊME `a0(...)` ; `mot()` cherche un mot seul (« gramme », « kilogrammes »), pas « 1 gramme ». `sac()` réduit maintenant son texte pour tenir dedans (« 1 000 g »).
- **CE1 01 kg-g** (Jade postière) : paysage HD 2 min 18, dry run 0 alerte, bords 0, -ql relu 2 fois (défi : questions qui touchaient « un vélo », étiquettes de la correction trop proches, cadre « kg » qui frôlait la ligne au-dessus : corrigés). Short 61,2 s `films/ce1-masse-kg-g.js` (le chaton de « 1 g », l'étiquette barrée → « 1 kg », 10 trombones) ; dessins agrandis après le 1er contrôle. ✅ Compteur contrôlé avant le film (barre pleine à 27,35 s, 2/3 à 28,35, 1/3 à 29,35, presque vide à 30,25 ; dans la carte, rien dessus ; `display=reb?'block':'none'` présent). Miniatures, manifeste 04/05/2027, fiche, vignettes, R2 (7 fichiers), videos-r2 (nos 2 clés), coach + Supabase (2 lignes `ce1_masse_kg_g`).

## ✅ 16/11 : la BALANCE de Manim penchait À L'ENVERS — corrigée ET re-rendue (session E)
✅ CE2 03 et CP 01 re-rendus en HD (bords 0, planches relues : le plus lourd descend), temps inchangés (manifeste intact), miniatures, vignettes, R2 remplacés, videos-r2 sans changement.
Historique :
`Balance` (masse_commun.py) faisait MONTER le plateau du plus lourd (`ang = -penche*0.32`). Corrigé : `ang = penche*0.32` → penche > 0 = la GAUCHE descend, < 0 = la DROITE descend (comme la docstring). Les valeurs `penche` des scripts suivaient déjà la docstring : elles sont justes maintenant. Le short (`balanceCraie`, a > 0 = droite descend) était juste.
**À REFAIRE EN PREMIER** (dry runs déjà relancés : 0 alerte pour les trois) :
1. Pilote CE2 03 comparer : HD (`MasseComparerCE2`, `-o eleveai-maths-ce2-masse-comparer --media_dir manim/scripts/ce2/media-mas-03`), copie dans `manim/sorties/ce2/maths/masse/03-comparer/`, bords 0, planche HD relue (écrans 02, 03, 08 : le plateau du plus lourd DESCEND).
2. CP 01 lexique : HD (`MasseLexiqueCP`, `media-mas-cp01`), copie, bords, planche (écran 05 piège : la bille descend).
3. Pour les deux : `passe_masse.py temps <id>` (vérifier que les temps ne bougent pas, sinon `manifeste`), `miniature_masse.py <id>` (durée), `vignettes-videos.py`, R2 (`rclone copy` remplace les fichiers changés), `generer-videos-r2.mjs` (nos clés seulement). Coach : rien (mêmes URL).
Script du rendu HD sous verrou : voir plus bas (copie de hd.sh).

## Reste (dans l'ordre)
1. ✅ Le CP est FINI (4 paysages + 4 shorts) ; CE1 01 kg-g fini. Suite : CE1 (épisodes à tourner : `ce1_masse_kg_g`, `ce1_masse_relation_kg_g`, `ce1_masse_estimer`, `ce1_masse_probleme`, `ce1_masse_defi` ; `ce1_masse_soupeser` et `ce1_masse_comparer` sont des `aussi`) → reste du CE2 (6) → CM1 (5) → CM2 (4) : par épisode, script `manim/scripts/<classe>/masse_<slug>.py` (CE1 : dans `manim/scripts/ce2/` comme le CP, `masse_ce1_<slug>.py`) sur le modèle de `masse_cp_defi.py` / `masse_comparer.py`, marques (`perimetre_marques.py masse:<slug>:<classe>` : vérifier le dossier de sortie pour les autres classes), dry run AUDIT, -ql + planche, HD sous verrou, bords, short (série `<classe>-masse` : créer `films/<classe>-masse.json` + `<classe>-masse.js` sur le modèle de `cp-masse.*` si absents), compteur, miniatures, entrée dans `passe_masse.py` (dates après la dernière de la file, ⛔ 3 shorts/jour au plus), fiche, vignettes, R2, videos-r2, coach + Supabase (+ alias `aussi`).
2. Commit par chemin après chaque épisode ; jamais de push.

## ⭐ 16/11 soir — consignes de Frédéric (relayées par le chef) : coach robuste, pavé, dessins, compteur, phrases courtes
Voix : plafond 14 / 16 / 18 / 18 / 18 mots (CP / CE1 / CE2 / CM1 / CM2), vérifié par `masse_voix.py` : 0 phrase au-dessus. Max / moyenne : CP 14 / 5,4 ; CE1 16 / 5,0 ; CE2 18 / 5,5 ; CM1 16 / 5,5 ; CM2 17 / 5,8.
Compteur des shorts : à contrôler short par short avant `film` (barre visible, dans la carte, ~3 s, sans saut, rien dessus ; `display=reb?'block':'none'` dans `prototypes/ti-margo/short.js`) → noter ici.

### Coach masses : audit AVANT (16/11, `npx --yes tsx@4 .tmp-audit-masses.ts [préfixe] [nbEx]`, 40 tirages par gabarit, log `%TEMP%udit-masses-avant.txt`)
| Classe | Micro | Énoncés ≠ | Dessin | Pavé | Phrase max / moy | > seuil |
|---|---|---|---|---|---|---|
| CP | lexique / comparer / estimer / defi | 66 / 114 / 41 / 41 | 98 / 98 / 99 / 95 % | 0 % | 13 / 6 | 0 % |
| CE1 | comparer | 122 | 90 % | 0 % | 14 / 5,3 | 0 % |
| CE1 | kg_g | 99 | 75 % | 0 % | 12 / 5,6 | 0 % |
| CE1 | soupeser | 38 | 100 % | 0 % | 13 / 5,8 | 0 % |
| CE1 | relation_kg_g | 87 | **46 %** | 1 % | 11 / 5,7 | 0 % |
| CE1 | estimer / probleme | 95 / 102 | 98 / 86 % | 0-2 % | 13 / 5 | 0 % |
| CE1 | defi | 78 | **50 %** | 1 % | 11 / 5,6 | 0 % |
| CE2 | unites | 93 | **24 %** | 0 % | 17 / 6,9 | 0 % |
| CE2 | relations / comparer / choisir_unite | 101 / 103 / 94 | 74 / 85 / 76 % | 0-1 % | 14 / 4,5 | 0 % |
| CE2 | estimer / probleme / defi | 104 / 96 / 70 | 66 / 98 / 68 % | 0-1 % | 14 / 6,5 | 0 % |
| CM1 | comparer | 318 | 100 % | 0 % | **32** / 10,5 | **15 %** |
| CM1 | mesurer | 317 | 100 % | 0 % | **27** / 9,1 | 2 % |
| CM1 | estimer / defi / convertir | 170 / 315 / 288 | 100 % | 0 % | 19 / 8 | 0 % |
| CM2 | comparer | 397 | 100 % | 0 % | **33** / 10,7 | **17 %** |
| CM2 | estimer | 320 | 100 % | 0 % | **24** / 7,5 | 2 % |
| CM2 | defi / convertir | 399 / 450 | 100 % | 0 % | 19 / 8 | 0 % |
Partout : 0 erreur de générateur, 0 QCM à deux choix égaux, 0 QCM sans le juste, ≥ 38 énoncés différents par micro (≥ 10 ✅).
**À corriger** : (1) pavé numérique ≈ 0 % partout → viser 1 réponse sur 2 (sauf CP où presque tout est lourd/léger : pavé là où la réponse est un nombre) ; (2) dessins CE1 relation_kg_g, defi, kg_g et CE2 unites, estimer, defi, relations, choisir_unite → 100 % visé ; (3) phrases CM1 comparer / mesurer, CM2 comparer / estimer / defi → ≤ 18 mots. Travail des banques : session coach dédiée (fichiers `lib/tutor-v4/questionBank/{cp,ce1,ce2,cm1,cm2}/maths/masse*`), pas de rendu → l'APRÈS sera écrit ici.


## Outils de la session D (copiés ici pour la relève)
Rendu HD sous verrou (bash) :
```
L="$TEMP/eleveai-rendu-hd.lock"; while [ -e "$L" ]; do sleep 60; done; echo "masses <id>" > "$L"
python -m manim render -qh --disable_caching <script> <Scene> -o <nom> --media_dir <media>; rm -f "$L"
cp $(find <media> -name "<nom>.mp4" -path "*1080p60*") <sortie>/ && python scripts/verifier-bords-video.py <sortie>/<nom>.mp4
```
Film du short : même verrou autour de `node scripts/ti-margo-short.mjs <série> <ep> film`, puis `… miniature` ; effacer `_muet.mp4`.
Contrôle du compteur : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs <série> <ep> controle <t>…` aux instants cpt, cpt+1, cpt+2, cpt+2,9 (cpt = fin du clip 02-question + 0,1 s) + `python scripts/ti-margo-planche.py <dossier> <png>`.
Lignes Supabase : `node .tmp-lire-ress-masses.mjs <micro> …` (non suivi par git).
R2 : `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/r2-videos.ps1 -Rclone "copy manim/sorties/<cl>/maths/masse/<NN-slug> R2:<cl>/maths/masse/<NN-slug> --include *.{mp4,png,webp}"`.
Manifeste : relire la dernière date juste avant (`max pas_avant`), 1 paysage + 1 short par jour ; CP 02 = 01/05/2027, donc CP 03 = 02/05/2027 si personne n'a écrit après.
Commit des fichiers partagés (manifeste, videos-r2, bilans) : `python <scratch>/cles.py <chemin> <sortie> cp-masse,ce2-masse` fabrique HEAD + nos clés (copie dans `manim/outils-commit-cles.py`), puis index temporaire (`GIT_INDEX_FILE`) et `git commit`.
Aperçu de vérif sans lecture : `python <planche.py> <mp4> <png> t1 t2 …` (images à des instants choisis, 3 colonnes).
