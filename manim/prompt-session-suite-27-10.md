Prompt — suite au 27/10/2026 : finir les FRACTIONS CM (on s'arrête au CM)

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (mémoire de Frédéric, MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `mb*`, `*.cues.tsv`) ; story Instagram jamais poussée (`git log origin/main..HEAD --stat` avant chaque push) ; push sur son signal ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus ; changer de session à 60 % ; coach CM1/CM2 : aucune question « open ».

⛔ 26/10, Frédéric : « on s'arrête à CM » → finir les CM, NE PAS lancer la 3e, le lycée ni la proportionnalité (coach 3e `fraction_rationnel` tout rouge, 8-10 squelettes/micro : noté pour plus tard).

## Fait le 26/10 (poussé)
- Table R2 : un dossier avec `.brouillon` reste hors table (`bc4d7ef6`) ; `.brouillon` posé dans `manim/sorties/{cm1,cm2}/maths/fractions/`.
- Accueil : « vidéos bientôt + Ouvrir le coach » si une classe a < 4 vidéos ; `/evaluation` → `/parcours` (`3c8ef8e3`).
- Fichiers pays : micros fractions CM branchées (Belgique primaire, Suisse cycle 2, Côte d'Ivoire primaire ; Québec déjà) (`e07d1868`).
- Défauts vidéo 6e 04, 5e 08, 5e 09 corrigés, renvoyés sur R2 (`a0fdb0bd`).
- Lot CM I FINI : 01-lire, 02-representer, 03-droite, 04-comparer, paysage + short, CM1 + CM2 (`274230e1`).

## ⏳ 26/10 soir : 3 agents relancés (« continue »), Frédéric parti
- Lot CM J (reprise 05-09), lot CM K (CM2 10-15, scripts `manim/scripts/cm2/frac_*`, aide `frac_cmk_commun.py`), fiches de cours CM1 `fraction` + CM2 `fraction_mixte` / `fraction_calcul`.
- Chaque agent commite PAR CHEMIN ce qui est fini, sans pousser. Si la session s'est fermée : `git log origin/main..HEAD --oneline`, `git status --short manim/scripts/cm1 manim/scripts/cm2 manim/voix lib/fiches app/fiches-cours`, `ls manim/sorties/{cm1,cm2}/maths/fractions/*/` → reprendre ce qui n'est pas commité (vérifier chaque mp4 avant).

- ⚠️ Nuit du 26/10 : réseau instable, agents coupés 3 fois. ✅ Fiches de cours CM FAITES (`6703e07b`). Sur le disque, NON commités : lot J 05-09 (mp4 CM1 + CM2 présents, à vérifier), lot K 10-11 (HD rendus, short 10 à re-rendre), 12-15 à faire.

- ⏸ 27/10 (son cours) : agents ARRÊTÉS à sa demande. Lot J : 06-decimale commité (`2b371fef`) ; bords des 16 mp4 05-09 = 0 instant ; 05, 07, 08, 09 encore à vérifier (planche) et commiter. Lot K : 10-11 rendus (short 10 à re-rendre ?), 12-15 à faire. Relancer des agents NEUFS (brief court).
- ✅ 27/10 POUSSÉ `2be48906` : lecteur du site coupé 3,6 s avant « Et abonne-toi ! » → écran « À toi ! » (coach de la micro / Revoir), sur retour de ses élèves.

- ⏸ 27/10 midi, ARRÊT (« je continue ce soir ») : lot J COMMITÉ sauf 08-unite (05 `88fc5cb2`, 06 `2b371fef`, 07 `47c93842`, 09 `bd0eefa3`, questions `95b730ad`). 08-unite : paysage OK ; short = coche ✓ qui touchait « pastèque » → choix passés de 28 à 25 dans `frac_unite_short.py` (dry run propre), RE-RENDRE le short HD (commande l. 23 du script), vérifier, commiter les 6 fichiers du 08. Lot K : 10-mixte-ecrire COMMITÉ (`a4b7a39f`) ; 11-mixte-regrouper : short bon, paysage HD interrompu → re-rendre, vérifier, commiter ; 12-15 à faire.

## À faire, dans l'ordre
1. **Lot CM J** (interrompu, NON commité) : scripts `manim/scripts/cm1/frac_{equivalente,decimale,defi,unite,superieure_1}*.py` + `frac_cmj_commun.py`, voix `manim/voix/cm-frac-{equivalente,decimale,defi,unite,superieure-1}*.json`. Rendus présents : 05, 06, 07 (paysage + short, CM1 + CM2) NON VÉRIFIÉS ; 08-unite (CM1) rendu HD peut-être inachevé, short défi re-rendu peut-être ; 09-superieure-1 en brouillon. Reprendre : vérifier chaque mp4 (`python scripts/verifier-bords-video.py`, planche PyAV, dry run 0 retard), finir 08 et 09, recopier questions/centres dans `manim/questions-fractions.md`, committer par chemin.
2. **Lot CM K** (CM2 seul) : 10-mixte-ecrire, 11-mixte-regrouper, 12-encadrer, 13-additionner, 14-produit-entier, 15-quantite (consigne `manim/consigne-videos-fractions.md`, section CM ; base `frac_cm_commun.py`).
3. **Fiches de cours fractions** : CM1 `fraction` (banque `lib/tutor-v4/questionBank/cm1/maths/fractions.bank.ts`), CM2 `fraction_mixte` (`fractions-superieures.bank.ts`) et `fraction_calcul` (`fractions-calcul.bank.ts`) ; règles `lib/fiches/REGLES.md`, modèle `maths-cm2-fractions.tsx`.
4. **Passe finale CM** (modèle `a5aee451`) : miniatures + vignettes (celles de 01-03 sont périmées), manifeste, envoi R2, RETIRER les `.brouillon`, `node scripts/generer-videos-r2.mjs`, branchement coach (notion_ressources), puis vérifier que les vidéos CM apparaissent sur `/pays/<pays>` (Québec, Belgique, Suisse, Côte d'Ivoire) via les micros.
5. Rappeler à Frédéric : soumettre `https://www.eleveai.fr/sitemap.xml` dans la Search Console.
