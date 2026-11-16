# Reprise : série MASSES du CP au CM2 (session C, mardi-mercredi 17-18/11)

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
- Pilote : `manim/scripts/ce2/masse_comparer.py` / `MasseComparerCE2` (écrit, import OK ; ⏳ marques, dry run, planche -ql après les WAV).

## Métiers (neufs, 13 filles / 11 garçons ; La Réunion : 1, Malo à Saint-Pierre)
CP : Awa déménageuse, Hugo primeur, Zoé toiletteuse, Noé livreur à vélo. CE1 : Jade postière, Liam vendeur en vrac, Chloé bibliothécaire, Malo pêcheur, Lina jongleuse. CE2 : Rayan grutier, Emma torréfactrice, Anaïs fromagère (pilote), Tom chauffeur routier, Sarah sage-femme, Adam agent d'enregistrement, Louise savonnière. CM1 : Ilyes jockey, Margaux diététicienne, Enzo ornithologue, Alice cheffe de chantier, Kenza herboriste (mesurer). CM2 : Théa ingénieure en aéronautique, Mathis maréchal-ferrant, Juliette océanographe, Hamza pilote de montgolfière.

## Reste (dans l'ordre)
1. ⏳ « oui » de Frédéric sur `manim/VOIX-masses-cp-cm2.md` (corrections dans `masse_voix.py`).
2. `--ecrire` → WAV (Julie, débit −6, comme contenance) → marques (`perimetre_marques.py` : ajouter `masse:` comme `contenance:`) → dry run pilote (0 AVANCE/RETARD, BORDS) → planche -ql → HD (verrou `%TEMP%\eleveai-rendu-hd.lock`, ≥ 2,5 Go) → bords 0 → short Ti Margo (série `prototypes/ti-margo/films/ce2-masse.json`, compteur vérifié) → miniatures → manifeste (après la dernière date de la file) → fiche YouTube → vignettes → R2 → videos-r2 → coach + Supabase → commit par chemin.
3. Puis CP → CE1 → reste du CE2 → CM1 → CM2.

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
