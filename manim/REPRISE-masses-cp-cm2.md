# Reprise : série MASSES du CP au CM2 (session C, mardi-mercredi 17-18/11)

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

## Reste (dans l'ordre)
1. CP 02 comparer (script écrit, `masse_cp_comparer.py`, à auditer) → CP 03-04 → CE1 (5) → reste du CE2 (6) → CM1 (5) → CM2 (4) : par épisode, script `manim/scripts/<classe>/masse_<slug>.py` sur le modèle du pilote, marques (`perimetre_marques.py masse:<slug>` : vérifier le dossier de sortie pour les autres classes), dry run, -ql + planche, HD sous verrou, bords, short (série `<classe>-masse`), miniatures, entrée dans `passe_masse.py` (dates après la dernière de la file, ⛔ 3 shorts/jour au plus), fiche, vignettes, R2, videos-r2, coach + Supabase (+ alias `aussi` : `cp-masse-comparer@ce1_masse_soupeser`).
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
