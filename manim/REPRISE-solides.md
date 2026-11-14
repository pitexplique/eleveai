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

## Reste
2. Commun `manim/scripts/ce2/solides_ce2_commun.py` (solides en perspective cavalière) ; scripts ; dry run ; aperçus -ql ; HD sous verrou ; shorts `prototypes/ti-margo/films/ce2-solides*.js` ; miniatures ; manifeste 16, 18, 20, 22, 24/01/2027 (à vérifier libres) ; R2 ; coach.
3. Voix CM1 (prisme droit, autres patrons, défi CM1 ; le reste par `aussi`), validation à deux, même chaîne (jours pairs après le 24/01/2027).
