# Reprise — série SOLIDES ET ESPACE (CE2 puis CM1)

Plan : `manim/PLAN-perimetre-aire-volume.md`, blocs « Solides et espace » du CE2 (5) et du CM1 (6).
⛔ Vidéo commune dans la classe la PLUS BASSE : reconnaître, faces/arêtes/sommets, patron du cube et défi CE2 servent au CM1 par `aussi`. En CM1, seulement ce qui va plus loin : prisme droit, autres patrons, défi CM1.
Paysage Manim (solides en perspective cavalière, arêtes cachées en pointillés), short dessin animé Ti Margo. Voix validée À DEUX avant tout rendu. RAM : verrou `%TEMP%\eleveai-rendu-hd.lock`, un seul HD sur le PC (la session Contenance CE2 rend aussi), aperçus `-ql` scène par scène, ≥ 2,5 Go libres. Commit PAR CHEMIN, pas de push.
La session Contenance CE2 tient `manim/REPRISE-pav-ce2.md` : ne pas y toucher.

## Session 1 (14/11) — voix CE2 ✅ VALIDÉES (« Oui, valide les 10 »), ceintures et centres acceptés avec
✅ WAV `public/sons/ce2-solides-<ep>[-short]/` (Julie, débit −6 : `scripts/generer-voix.ps1 -Fichier … -Debit -6`). ✅ Marques : `python manim/scripts/ce2/perimetre_marques.py solides:reconnaitre solides:decrire solides:pyramide solides:patron solides:defi` → `manim/scripts/ce2/solides_<ep>_marques.json` (0 introuvable). ⚠️ `perimetre_marques.py` (forme `notion:ép.`) est une modif NON commitée de la session Contenance CE2 : ne pas la committer.
Fichiers : `manim/voix/ce2-solides-{reconnaitre,decrire,pyramide,patron,defi}[-short].json`.
Bonnes réponses tirées au hasard (5 A, 5 B, 5 C sur la série) :

| Ép. | Micro | Métier / décor | Questions | Short | Ceintures (proposées) | Centres (proposés) |
|---|---|---|---|---|---|---|
| 01 reconnaitre | `ce2_solide_reconnaitre` | Jade, magasin de jouets | A, B | sac mystère, cône, C | blanche / short blanche | jeux-defis ; short cuisine |
| 02 decrire | `ce2_solide_decrire` | Hugo, logisticien (étiquettes = faces, scotch = arêtes, coins = sommets) | B, C | gommettes sur le dé, C | jaune / blanche | transports, argent-budget ; short jeux-defis |
| 03 pyramide | `ce2_solide_faces_pyramide` | Amina, archéologue (maquette de pyramide d'Égypte) | C, A | pots de peinture, A | jaune / blanche | histoire-geographie ; short art-design |
| 04 patron | `ce2_solide_patron` | Théo, designer d'emballages | B, A | dé en ligne = tunnel, B | orange / jaune | art-design ; short jeux-defis |
| 05 defi | `ce2_solide_defi` | Lou, créatrice de lampes (fil sur les arêtes) | C, B | cube en spaghettis, A | bleue / orange | sciences, construction ; short cuisine |

Réunion : aucune dans ces 5 (≈ 1 sur 25).
⚠️ Banque CE2 (`solides.bank.ts`, gabarit `faces_pyramide` vers la ligne 732) : « Combien de triangles a une pyramide à base triangulaire ? » attend 3, alors que la base est aussi un triangle (4). La voix évite la question (on demande « combien de faces », ou « combien de triangles MONTENT vers la pointe »). À signaler / corriger à part.

## Session 2 (14/11) — production CE2
✅ Commun `manim/scripts/ce2/solides_ce2_commun.py` (base `PaysageSolidesCE2` ← `PaysagePerimetreCE2`) : `Solide` en cavalière (faces vues pleines, arêtes cachées en pointillés, `face`/`arete_ab`/`sommet`/`sur_face`, `shift` qui déplace aussi les sommets projetés), `cube`, `pave`, `pyramide(n, cote, h)`, `Cylindre`, `Cone`, `Boule`, `rouler`, `Patron` (croix, ligne, bloc ; `plier`, `recaler`), personnages Jade, Hugo, Amina, Théo, Lou ; `rep_lignes`, `etiquette`, `compter`.
✅ Scripts `manim/scripts/ce2/solides_{reconnaitre,decrire,pyramide,patron,defi}.py` (scènes `Solides<Ep>CE2`) : dry run `AUDIT=1 BORDS=1` = 0 alerte sur les 5.
✅ Aperçus -ql relus : 01 propre ; 02 et 03 corrigés (réponses des questions-pauses sur 2-4 lignes courtes, plus sur la case C ; finale du 03 : pyramide surlignée à la bonne place). 04 et 05 : à relire.
✅ HD 01 `manim/sorties/ce2/maths/solides/01-reconnaitre/` (bords 0). HD suivants un par un : `bash hd.sh solides_<ep>.py Solides<Ep>CE2 eleveai-maths-ce2-solides-<ep> manim/scripts/ce2/media-sol-0N manim/sorties/ce2/maths/solides/0N-<ep>` puis `python scripts/verifier-bords-video.py <mp4>`.
✅ Shorts : `prototypes/ti-margo/films/ce2-solides{,.json,-cues.js,-decrire,-pyramide,-patron,-defi}.js` (moteur 3D cavalier JS, `plierPatron`, `dessinerPatron` ; ⚠️ pas de fonction globale `sac` : conflit avec personnage.js). Images de contrôle relues pour les 5. Rendu : `node scripts/ti-margo-short.mjs ce2-solides <ep> film` puis `… miniature`, supprimer le `_muet.mp4`.
✅ Miniatures paysage : `python manim/miniature_solides_ce2.py`. Manifeste : `python manim/passe_solides_ce2.py temps` puis `manifeste` (dates 16, 18, 20, 22, 24/01/2027, vérifiées le 14/11 : 1 paysage ces jours-là).
Reste : HD 02 → 05, films des 5 shorts, miniatures, temps + manifeste, fiches YouTube (`python scripts/fiches-youtube.py ce2-solides-`), R2 + `generer-videos-r2.mjs` (ne garder que nos clés), coach (`node scripts/brancher-videos-coach.mjs --classe ce2 --notion solides --tout`), plan coché, commits par chemin.

## CM1 (session mère) — voix ✅ VALIDÉES 14/11 (« Oui, valide les 6 »), ceintures et centres acceptés avec
✅ WAV `public/sons/cm1-solides-<ép>[-short]/` (Julie, débit −6) ; ✅ marques `python manim/scripts/cm1/aire_marques.py solides:prisme solides:patron solides:defi` → `manim/scripts/cm1/solides_<ép>_marques.json` (0 introuvable ; ⚠️ jamais sans argument).
Questions (index) : 01 prisme → 05 rép 1, 08 rép 0 ; 02 patron → 05 rép 1, 08 rép 2 ; 03 défi → 05 rép 0, 07 rép 1. Shorts : 01 C, 02 C, 03 A.
Production : à la suite du CE2, par la session « Solides CE2 : production » (sorties `manim/sorties/cm1/maths/solides/0N-<ép>/`, scripts `manim/scripts/cm1/solides_<ép>.py`, films `prototypes/ti-margo/films/cm1-solides*.js`).
Seulement ce qui va plus loin que le CE2. Les autres micros CM1 prennent les vidéos CE2 par `aussi` : `solide_reconnaitre` ← `ce2_solide_reconnaitre` ; `solide_sommet_arete_face` et `solide_face` ← `ce2_solide_decrire` (+ `ce2_solide_faces_pyramide` pour les faces).
Fichiers : `manim/voix/cm1-solides-{prisme,patron,defi}[-short].json`. Bonnes réponses tirées (3 A, 3 B, 3 C) :

| Ép. | Micro | Métier / décor | Questions | Short | Ceintures (proposées) | Centres (proposés) |
|---|---|---|---|---|---|---|
| 01 prisme | `solide_prisme` | Sacha, guide de montagne (tente = prisme à base triangulaire) | B, A | la tente n'est pas une pyramide, C | verte / jaune | sport, nature-ecologie ; short nature-ecologie |
| 02 patron | `solide_patron` | Rose, créatrice de jeux de société (11 patrons du cube, pavé, pyramide, cylindre, dé : faces opposées = 7) | B, C | dé mal numéroté, C | verte / jaune | jeux-defis, art-design ; short jeux-defis |
| 03 defi | `solide_defi` | Ilan, créateur de décors de jeux vidéo (cubes cachés, étages) | A, B | pyramide de caisses, A | bleue / orange | jeux-video, construction ; short construction |
Manifeste : jours pairs après le 24/01/2027 (26, 28, 30/01, à vérifier libres). 