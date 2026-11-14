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

## Reste (session 2 = production CE2)
Modèle à suivre : `manim/scripts/ce2/perimetre_rectangle.py` (+ `perimetre_ce2_commun.py`, base `PaysagePerimetreCE2` ← `PaysageCalculPose` de `6e/calcul_pose_commun.py` : `dire`, `au_mot`, `question_pause`, `garde`, `ligne`, `rep_bas`, `hors_audit`…). Leçons de synchro : `manim/REPRISE-pav-ce2.md` (sessions 3-6) et `REPRISE-pav-cm1.md`. Outils de rendu (`hd.sh` verrou mkdir, `images.py`, `planche.py`, `mots.py`) : copies dans `side-session-notes/local_78d7aa78-…` (dossier partagé de la session Contenance/Périmètre CE2).
Questions (index de la bonne réponse) : 01 → 05 rép 0, 09 rép 1 ; 02 → 05 rép 1, 08 rép 2 ; 03 → 05 rép 2, 08 rép 0 ; 04 → 05 rép 1, 07 rép 0 ; 05 → 04 rép 2, 06 rép 1. Shorts : 01 C, 02 C, 03 A, 04 B, 05 A.
2. Commun `manim/scripts/ce2/solides_ce2_commun.py` (solides en perspective cavalière) ; scripts ; dry run ; aperçus -ql ; HD sous verrou ; shorts `prototypes/ti-margo/films/ce2-solides*.js` ; miniatures ; manifeste 16, 18, 20, 22, 24/01/2027 (à vérifier libres) ; R2 ; coach.
3. Voix CM1 (prisme droit, autres patrons, défi CM1 ; le reste par `aussi`), validation à deux, même chaîne (jours pairs après le 24/01/2027).

## CM1 (session mère) — voix écrites 14/11, EN ATTENTE de validation
Seulement ce qui va plus loin que le CE2. Les autres micros CM1 prennent les vidéos CE2 par `aussi` : `solide_reconnaitre` ← `ce2_solide_reconnaitre` ; `solide_sommet_arete_face` et `solide_face` ← `ce2_solide_decrire` (+ `ce2_solide_faces_pyramide` pour les faces).
Fichiers : `manim/voix/cm1-solides-{prisme,patron,defi}[-short].json`. Bonnes réponses tirées (3 A, 3 B, 3 C) :

| Ép. | Micro | Métier / décor | Questions | Short | Ceintures (proposées) | Centres (proposés) |
|---|---|---|---|---|---|---|
| 01 prisme | `solide_prisme` | Sacha, guide de montagne (tente = prisme à base triangulaire) | B, A | la tente n'est pas une pyramide, C | verte / jaune | sport, nature-ecologie ; short nature-ecologie |
| 02 patron | `solide_patron` | Rose, créatrice de jeux de société (11 patrons du cube, pavé, pyramide, cylindre, dé : faces opposées = 7) | B, C | dé mal numéroté, C | verte / jaune | jeux-defis, art-design ; short jeux-defis |
| 03 defi | `solide_defi` | Ilan, créateur de décors de jeux vidéo (cubes cachés, étages) | A, B | pyramide de caisses, A | bleue / orange | jeux-video, construction ; short construction |
Manifeste : jours pairs après le 24/01/2027 (26, 28, 30/01, à vérifier libres). WAV + marques CM1 : `aire_marques.py solides:<ép>` (à vérifier) après validation.
