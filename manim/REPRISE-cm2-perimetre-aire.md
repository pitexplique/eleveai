# Reprise : série PÉRIMÈTRE + AIRE du CM2

Plan cochable : `manim/PLAN-perimetre-aire-volume.md`, section « ## CM2 ». Banques : `lib/tutor-v4/questionBank/cm2/maths/perimetres.bank.ts`, `aires.bank.ts`, `aires-unites.bank.ts`. Rien n'est poussé (c'est le chef d'orchestre qui pousse).

## Règles de la série
- Un CRAN AU-DESSUS du CM1 (déjà fait : `manim/REPRISE-pav-cm1.md`) : nombres à virgule, conversions avant de calculer, cm² / dm² / m² (et km²), conversions d'aires (× 100), triangle rectangle = moitié d'un rectangle, côté retrouvé à partir du périmètre ou de l'aire, découpage ET retrait. On ne redit pas le CM1.
- CM2 a sa propre vidéo `perimetre_comprendre` (le CM1 renvoyait au CE2) : elle travaille tour / surface, unités, même tour pour deux formes.
- Paysage en Manim, short en DESSIN ANIMÉ Ti Margo (CM2 < 4e).
- Voix validée À DEUX avant tout rendu. ⛔ Le 14/11, aucun WAV ni rendu : deux sessions Longueurs occupent le rendu HD du seul PC.
- La Réunion : une seule mention sur 24 voix (aire_unites : « La Réunion fait environ 2 500 kilomètres carrés »).

## Les 24 voix (`manim/voix/`) — ✅ VALIDÉES par Frédéric le 14/11/2026 (« Oui, valide les 24 »), ceintures comprises ; ni WAV ni rendu encore
| Ép. | Micro | Fichiers | Métier / décor | Questions paysage | Short (réponse) | Ceinture | Centres proposés |
|---|---|---|---|---|---|---|---|
| P1 | `perimetre_comprendre` | `cm2-perimetre-comprendre(-short)` | Noah, régisseur de concerts (scène 8 × 5, ruban 26 m ; carré 6,5 m, même tour) | B, C | 20 allumettes, enclos long / carré : A | jaune | musique, cinema-series |
| P2 | `perimetre_triangle` | `cm2-perimetre-triangle(-short)` | Maëlle, voilière (4 + 3,5 + 2,5 = 10 m ; équilatéral 1,5 × 3 ; convertir 80 cm / 1 m) | B, A | cerf-volant 60 + 60 + 1 m = 220 cm : C | verte | bateaux, sport |
| P3 | `perimetre_quadrilatere` | `cm2-perimetre-quadrilatere(-short)` | Rayan, jardinier de stade (100 × 64 → 328 m ; carré 12,5 × 4) | A, B | 2 tours de basket 28 × 15 = 172 m : A | verte | football, handball-volley |
| P4 | `perimetre_polygone` | `cm2-perimetre-polygone(-short)` | Inaya, créatrice de bijoux (hexagone 1,2 × 6 = 7,2 cm ; 5 côtés à virgule = 10 ; L sur quadrillage = 12) | B, A | train de 4 biscuits : 100 cm, pas 160 : A | verte | art-design, mode |
| P5 | `perimetre_defi` | `cm2-perimetre-defi(-short)` | Malo, technicien en robotique (fil de robot tondeuse 61 m → 2 rouleaux ; largeur = moitié du tour − longueur ; carré 34 ÷ 4) | B, A | grillage 36 m, enclos carré : 9 m : C | bleue | technologie-ia, nature-ecologie |
| A1 | `aire_comprendre` | `cm2-aire-comprendre(-short)` | Elsa, couturière de patchwork (3 × 4 et 2 × 6 = 12 ; demi-carrés ; tours 14 et 16) | A, C | serviettes de plage 3 × 4 / 2 × 6 : C | jaune | art-design, mode |
| A2 | `aire_unites` | `cm2-aire-unites(-short)` | Tom, imprimeur (timbre 6 cm², affiche 20 dm², bâche 12 m², La Réunion ≈ 2 500 km²) | C, A | tapis de 4 cm² livré au lieu de 4 m² : B | verte | art-design, photo |
| A3 | `aire_convertir_unites` | `cm2-aire-convertir-unites(-short)` | Kenzo, vitrier (3 dm² = 300 cm² ; 1 m² = 100 dm² = 10 000 cm²) | C, B | album d'autocollants 1 dm² = 100 cm² : C | bleue | construction, sciences |
| A4 | `aire_carre_rectangle` | `cm2-aire-carre-rectangle(-short)` | Yasmine, installatrice de panneaux solaires (toit 8 × 5 ; panneau 2 × 1,5 = 3 m² ; carré 6 × 6 ; 50 cm = 0,5 m) | C, B | mur 3 × 2,5 = 7,5 m² : B | verte | nature-ecologie, sciences |
| A5 | `aire_triangle_rectangle` | `cm2-aire-triangle-rectangle(-short)` | Baptiste, chef traiteur (sandwich 12 × 8 = 96 → 48 ; tarte 600 → 150) | A, C | toast 10 × 10 coupé en diagonale : 50 : C | verte | cuisine |
| A6 | `aire_composer` | `cm2-aire-composer(-short)` | Nadia, soigneuse animalière (L = 24 + 12 ; flamants 60 − 8 ; défi rectangle + triangle = 30) | B, A | gazon 30 − bac à sable 4 = 26 : B | verte | animaux, nature-ecologie |
| A7 | `aire_defi` | `cm2-aire-defi(-short)` | Romane, conceptrice de skateparks (48 ÷ 6 = 8 ; carré de 25 → 5 ; 9 × 4 et 6 × 6 même aire, tours 26 / 24 ; 44 m² → 5 pots) | A, B | 24 dalles sur 4 m : 6 m : C | bleue | sport, construction |

- Places des bonnes réponses tirées au hasard (graine 1114) : 12 A, 12 B, 12 C ; jamais deux fois la même lettre de suite dans une paysage ; leurres = erreurs typiques (oubli de doubler, L × l pour le périmètre, 5,10 au lieu de 6, ÷ 4 pour le côté d'un carré d'aire connue, × 10 au lieu de × 100, oubli du ÷ 2…).
- Shorts : ceinture blanche, 1 question-pause, question chiffrée en commentaire, fin « éleveai point f r » courte.
- Métiers : la matrice (`npx tsx scripts/metiers-pour-video.ts cm2 perimetre|aire`) ne propose que 3 métiers (éleveuse, carreleur, jardinière), déjà pris au CM1 : métiers choisis hors matrice, 6 filles / 6 garçons, aucun repris du CM1 ou du CE2. Pas de lignes CM2 dans `metiers-college.ts` : rien à marquer.
- Clés : paysage `00-garde … 10-abonne` (comme le CM1) ; short `00-accroche, 01-…, 02-question, 02b-reponse, 03-ouf, 04-commentaire, 05-abonne` (seule la clé 01 change de nom selon l'épisode).

## Prochaine étape (voix validées ; attendre que le rendu HD soit libre)
1. Voix figées : ne plus les retoucher sans lui.
2. WAV (Julie, débit −6) dans `public/sons/cm2-<notion>-<ep>[-short]/` ; marques : adapter `manim/scripts/cm1/aire_marques.py` (ou une copie `manim/scripts/cm2/`) aux noms `cm2-…` ; ⚠️ jamais sans argument.
3. Scripts `manim/scripts/cm2/perimetre_<ep>.py` et `aire_<ep>.py` sur le modèle CM1 (`perimetre_cm1_commun.py`, `aire_cm1_commun.py`, mixin `PhraseAGauche`) ; personnages à ajouter : noah, maelle, rayan, inaya, malo, elsa, tom, kenzo, yasmine, baptiste, nadia, romane. Puis la chaîne habituelle : dry run AUDIT=1 BORDS=1 → planche -ql → UN HD sous verrou `%TEMP%\eleveai-rendu-hd.lock` (≥ 2,5 Go libres) → `verifier-bords-video.py` = 0 → short Ti Margo (séries `films/cm2-perimetre.json`, `cm2-aire.json`) → miniatures « Dessin animé » → manifeste (dates libres après la série Longueurs) → fiche YouTube, R2, coach.
4. Commit PAR CHEMIN, jamais de push.

## AIRE CM2 — session « aire » du 14/11 (passée la main à 63 % de contexte)
Notes et outils : `side-session-notes/local_e931467e-2c23-4163-86c5-b91473d4ac99/` (`CONSIGNE-paysages-aire-cm2.md`, `CONSIGNE-shorts-aire-cm2.md`, `dry.sh <fichier> <Scène>` → `dry-aire_<ep>.log`, `apercu.sh`, `planche.sh`, `hd.sh <fichier.py> <Scène> <nom> <media> <sortie>` (verrou HD + 2,5 Go ; lancer avec `PYTHONIOENCODING=utf-8`), `entrees_aire.py <ep>` (upsert des 2 entrées du manifeste depuis `ep-<ep>.json` à écrire + le dry log ; modèle des `ep-*.json` : `side-session-notes/local_1c77ab8e-…/ep-mesurer.json`)).
- ✅ WAV des 14 voix `public/sons/cm2-aire-<ep>[-short]/` (Julie −6) ; ✅ marques `python manim/scripts/cm2/aire_marques_cm2.py <ep>` → `manim/scripts/cm2/aire_<ep>_marques.json` (⛔ jamais sans argument).
- ✅ Commun `manim/scripts/cm2/aire_cm2_commun.py` (importe le commun CM1 sans le modifier ; `PaysageAireCM2`, `PaysageAireCM2G` = PhraseAGauche ; `elsa tom kenzo yasmine baptiste nadia romane`, `m2()`, `TRIANGLE_C`).
- ✅ Miniatures paysage : `python manim/miniature_aire_cm2.py <ep>` (les 7 entrées `EP` écrites ; relire l'accroche contre le script final ; durée lue dans le mp4, donc APRÈS le HD).
- Shorts : série `prototypes/ti-margo/films/cm2-aire.json` + cues des 7 + `cm2-aire.js` ; `films/cm2-commun.js` = copie de `cm1-commun.js` (chargée pour toutes les séries `cm2-*`, la session périmètre s'en sert aussi).
  - ✅ 01 comprendre « Duel de serviettes » 68,7 s, Q 00:16, C ; ✅ 02 unites « Le tapis-timbre » 74,5 s, Q 00:21, B ; ✅ 03 convertir-unites « 1 dm² = ? cm² » 74,9 s, Q 00:21, C ; ✅ 04 carre-rectangle « Le mur à repeindre » 73,6 s, Q 00:16, B ; ✅ 05 triangle-rectangle « Le duel des toasts » 78,4 s, Q 00:18, C. Film + miniature « Dessin animé » dans `manim/sorties/cm2/maths/aire/0N-<ep>/`. ⏳ 06 composer et 07 defi : sous-agents en cours.
  - ⚠️ La barre du compte à rebours de la question n'apparaît sur aucune image des shorts (socle `short.js`, `display=''` qui laisse le `display:none` du CSS) : sans doute TOUS les shorts ; à regarder à part, sans le toucher ici.
- ⏳ Paysages : 7 scripts `manim/scripts/cm2/aire_<ep>.py` (scènes `AireComprendreCM2`, `AireUnitesCM2`, `AireConvertirUnitesCM2`, `AireCarreRectangleCM2`, `AireTriangleRectangleCM2`, `AireComposerCM2`, `AireDefiCM2`) écrits par des sous-agents : dry run AUDIT puis aperçu -ql relu en cours. AUCUN HD encore.

### Prochaine étape (session fille)
1. Pour chaque paysage : relire `dry-aire_<ep>.log` (0 AUDIT-AVANCE / RETARD / BORD / TARD), sinon refaire `dry.sh` ; jeter un œil à la planche ; puis HD : `PYTHONIOENCODING=utf-8 bash <notes>/hd.sh aire_<ep>.py <Scène> eleveai-maths-cm2-aire-<ep-tirets> manim/scripts/cm2/media-aire-0N manim/sorties/cm2/maths/aire/0N-<ep-tirets>` (en arrière-plan, un seul à la fois), puis `python scripts/verifier-bords-video.py <mp4>` = 0.
2. Miniature paysage, `ep-<ep>.json` (titres, accroches, chapitres sur les clés d'écran, tags, questions = texte de la voix, centres du tableau ci-dessus, short : titre, accroche, tags, question avec son instant), `python <notes>/entrees_aire.py <ep>` (relit le manifeste juste avant ; vérifier le diff : seules nos 2 entrées), `python scripts/fiches-youtube.py cm2-aire-<ep>`, R2 du seul dossier (`r2-videos.ps1 -Rclone "copy … R2:cm2/maths/aire/0N-<ep> --include *.{mp4,png,webp}"`), `node scripts/generer-videos-r2.mjs` (ne garder que nos clés dans `lib/videos/videos-r2.json` et `bilans-videos.json`), coach `node scripts/brancher-videos-coach.mjs --id cm2-aire-<ep>,cm2-aire-<ep>-short --ecrire`.
3. Dates : APRÈS les 5 dates du périmètre CM2 (relire cette reprise / le manifeste) et après Longueurs (CM1 finit le 24/02/2027 ; CE2 à relire), ≤ 2 paysages et 5 vidéos par jour ; 1 paysage + 1 short par jour.
4. Cocher le plan `manim/PLAN-perimetre-aire-volume.md` (CM2 aire), mémoire `serie-perimetre-aire-cm2.md`, commit PAR CHEMIN, jamais de push.
