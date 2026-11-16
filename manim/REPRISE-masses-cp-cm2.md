# Reprise : série MASSES du CP au CM2 (session C, mardi-mercredi 17-18/11)

Prompt : `docs/prompt-serie-masses-angles-cm.md` ; plan : `manim/PLAN-mardi-mercredi-17-18-11.md` (session C). Rien n'est poussé.
⛔ 16/11 Frédéric : « si la 6e n'a pas de masse tu fais pas » → PAS de vidéos 6e (aucune notion masse au coach 6e).

## Inventaire (16/11)
- Manifeste : AUCUNE vidéo masse (CP → CM2). R2 : rien. Tout est à tourner.
- Banques du coach : CP `masse_contenance` (4 micros), CE1 `masse` (7), CE2 `masse` (7), CM1 `masse` (4), CM2 `masse` (4, fichier `masses.bank.ts`). 6e : rien.
- `aussi` (même niveau, pas tourné deux fois) :
  - `ce1_masse_soupeser` ← `cp-masse-comparer` (balance à plateaux, soupeser)
  - `ce1_masse_comparer` ← `ce2-masse-comparer` (pilote : 1 kg / 900 g, plumes / cailloux)
- À tourner : 24 paysages + 24 shorts = 48 vidéos (CP 4, CE1 5, CE2 7, CM1 4, CM2 4).

## Fichiers
- Voix (source UNIQUE) : `manim/scripts/ce2/masse_voix.py` → `manim/VOIX-masses-cp-cm2.md` (récap à valider) + `manim/scripts/ce2/masse_voix.json` (choix, bonne lettre, explications : lus par les scripts et pour le manifeste). Après le « oui » : `python manim/scripts/ce2/masse_voix.py --ecrire` → `manim/voix/<id>.json`.
- Bonnes réponses : graine 1116, A 24 / B 24 / C 24, jamais deux fois la même lettre dans une paysage.
- Commun : `manim/scripts/ce2/masse_commun.py` (importe `contenance_ce2_commun` sans le modifier) : `Balance` (Roberval qui penche, `poser`, `vers`), `basculer()`, `masse_marquee`, `balance_cuisine`, `balance_electronique` (+ `afficher`), `pese_personne`, `tableau_masses` (t | kg | hg | dag | g), objets (`meule`, `part_fromage`, `sac`, `paquet`, `plumes`, `cailloux`), `anais`, base `PaysageMasse` (+ `etiquette`). Image de contrôle relue le 16/11 (balances, cadran, tableau). Les autres personnages : à ajouter épisode par épisode.
- Pilote : `manim/scripts/ce2/masse_comparer.py` / `MasseComparerCE2` (écrit, import OK ; ⏳ marques, dry run, planche -ql après les WAV).

## Métiers (neufs, 13 filles / 11 garçons ; La Réunion : 1, Malo à Saint-Pierre)
CP : Awa déménageuse, Hugo primeur, Zoé toiletteuse, Noé livreur à vélo. CE1 : Jade postière, Liam vendeur en vrac, Chloé bibliothécaire, Malo pêcheur, Lina jongleuse. CE2 : Rayan grutier, Emma torréfactrice, Anaïs fromagère (pilote), Tom chauffeur routier, Sarah sage-femme, Adam agent d'enregistrement, Louise savonnière. CM1 : Ilyes jockey, Margaux diététicienne, Enzo ornithologue, Alice cheffe de chantier. CM2 : Théa ingénieure en aéronautique, Mathis maréchal-ferrant, Juliette océanographe, Hamza pilote de montgolfière.

## Reste (dans l'ordre)
1. ⏳ « oui » de Frédéric sur `manim/VOIX-masses-cp-cm2.md` (corrections dans `masse_voix.py`).
2. `--ecrire` → WAV (Julie, débit −6, comme contenance) → marques (`perimetre_marques.py` : ajouter `masse:` comme `contenance:`) → dry run pilote (0 AVANCE/RETARD, BORDS) → planche -ql → HD (verrou `%TEMP%\eleveai-rendu-hd.lock`, ≥ 2,5 Go) → bords 0 → short Ti Margo (série `prototypes/ti-margo/films/ce2-masse.json`, compteur vérifié) → miniatures → manifeste (après la dernière date de la file) → fiche YouTube → vignettes → R2 → videos-r2 → coach + Supabase → commit par chemin.
3. Puis CP → CE1 → reste du CE2 → CM1 → CM2.
