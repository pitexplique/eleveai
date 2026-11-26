# REPRISE — CP nombres entiers en dessin animé (paysage + short), nuit du 25 au 26/11/2026

Demande de Frédéric (25/11 soir) : des dessins animés CP sur la notion NOMBRES ENTIERS, en PAYSAGE et en SHORT,
pour les petits frères et sœurs de ses 6e (page /petits). « Sois poétique. » « Les questions sont essentielles. »
« Les maths doivent être un jeu. » Il laisse la nuit pour les faire. Voix validées (« Oui, lance la paire 1 »),
puis rendues plus poétiques à sa demande.

## Les scripts
`manim/SCRIPTS-cp-nombres-dessins-animes.md` (3 paires : denombre, rang, collection).
Voix poétiques de la paire 1 : `manim/voix/cp-entier-denombre-paysage.json`, `manim/voix/cp-entier-denombre-short.json`
(c'est la version à jour ; le .md garde la version d'avant pour la paire 1). Paires 2 et 3 : à écrire en JSON, ton poétique,
phrases courtes, bonnes réponses : paire 2 Q1 A, Q2 B, short B ; paire 3 Q1 B, Q2 B, short B → rééquilibrer (ex. paire 3 Q2 → mettre « il en manque un » en C).

## Le socle
- Séries : `prototypes/ti-margo/films/cp-entier.json` (shorts) et `cp-entier-paysage.json` ("format": "paysage").
- Outils de dessin communs : `films/cp-entier.js` (chargé aussi par `cp-entier-paysage.js`).
- Films : `films/cp-entier-<ep>.js` (short), `films/cp-entier-paysage-<ep>.js` (paysage).
- `short.js` accepte désormais `questions:[…]` (plusieurs questions-pauses) ; sans ce champ, `question` comme avant.
- Voix : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -6`
- Instants : `python scripts/ti-margo-cues.py cp-entier <ep>` et `python scripts/ti-margo-cues.py cp-entier-paysage <ep>`
- Contrôle : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs <série> <ep> controle 1 12 30` puis `python scripts/ti-margo-planche.py <dossier> <planche.png>`
- Film : `node scripts/ti-margo-short.mjs <série> <ep> film` — UN seul rendu à la fois (RAM).

## Règles à tenir
Compteur (barre du compte à rebours) visible ~3 s dans chaque question ; rien de rogné ; ceinture blanche ; bonne réponse
au hasard A/B/C ; peu de texte (enfants qui ne lisent pas) mais chaque nombre dit est écrit ; ne jamais lancer la lecture
d'une vidéo ; ne jamais lancer `generer-videos-r2.mjs` ; pas de push ni YouTube sans son accord ; commit PAR CHEMIN.
Fini = paysages + shorts rendus, contrôlés image par image ; R2 + page `app/petits/page.tsx` sur son OK.

## Précisions de Frédéric (25/11 soir)
- Les enfants ont 6, 7 et 8 ans (CP-CE1) : quelques mots écrits sont utiles à ceux qui commencent à lire, mais les nombres et les dessins d'abord.
- Les questions « en plein milieu des vidéos » : dans la paysage, Q1 vers la moitié du film, et non à la fin.
- Règle des 65 % : à 65 % de contexte, créer une session fille qui reprend (sans demander).

## État
- [x] voix + instants paire 1 (short et paysage)
- [x] `films/cp-entier.js` : fraise, assiette, bol, soleil couchant, pomme, pommier, ballon, cerise, étincelle, étiquette (nombre dans un rond), sautE (saut en cloche), NOMBRES_E, ardoisePaysage(tab)
- [x] short denombre écrit et contrôlé (carte de question EN BAS, l'ardoise reste visible ; compteur visible à 22,5 s)
- [x] HD du short denombre (25/11, 2e session) : 51,5 s, son ok, compteur visible, rien de rogné ; miniature faite. ⚠ Les 2 premiers rendus ont planté (« page.screenshot: Timeout 30000ms ») : `scripts/ti-margo-short.mjs` refait désormais une capture bloquée (3 essais, 60 s).
- [x] paysage denombre écrite : `films/cp-entier-paysage.js` (relit cp-entier.js par un <script> en ligne, pas eval : sinon les const sont invisibles ; cadrePaysageE, camPaysageE, miniPaysageE, phraseE, doigtE) + `films/cp-entier-paysage-denombre.js`. Planches ok. HD lancée.
- [x] voix + instants paires 2 et 3 (JSON dans manim/voix/cp-entier-{rang,collection}-{paysage,short}.json). Bonnes réponses : paire 1 B, C, short A ; paire 2 C (le chat), A (deuxième), short B (le jaune) ; paire 3 B (5), C (il en manque un), short A (5 bougies).
- [x] HD paysage denombre : 1 min 50 (109,9 s), son ok, compteurs visibles (57 s, 85 s), planche ok, miniature faite.
- [x] short rang « La course des escargots » (`films/cp-entier-rang.js`) : HD 47,4 s, son ok, planche ok, miniature faite.
- [x] paysage rang « La file du toboggan » (`films/cp-entier-paysage-rang.js`) : planches ok ; HD lancée le 26/11 vers 0 h (log : scratchpad de la 2e session, hd-paysage-rang.log). À FAIRE : vérifier le MP4 (`manim/sorties/cp/maths/entier/02-rang/eleveai-maths-cp-entier-rang-paysage.mp4`, ~1 min 39), planche du MP4, miniature (`node scripts/ti-margo-short.mjs cp-entier-paysage rang miniature`).
- [x] short collection « Les bougies » (`films/cp-entier-collection.js`) écrit, planche ok (bonne réponse A). À FAIRE : HD APRÈS la HD paysage rang, puis planche du MP4 + miniature.
- [ ] paysage collection « Une assiette pour chacun » : `films/cp-entier-paysage-collection.js` À ÉCRIRE (modèle : `cp-entier-paysage-rang.js`). Dessins prêts dans cp-entier.js : copainE (lapin, chat, souris, canard, margo, ours, cochon), assietteCraie, ballonAir, chapeauFete, etoilesE, etiquette, doigtE, phraseE.
  DUR = 00-accroche 9.51, 01-compter 7.72, 02-construire 10.32, 03-question 13.69, 03b-reponse 6.17, 04-question 15.0, 04b-reponse 5.86, 05-appris 3.85, 06-abonne 9.74.
  Idée : nuit étoilée ; 6 copains en ligne (x = 120 + k·150) arrivent à « arrivent » ; 01 : étiquettes 1 → 6 aux mots, grand « 6 » ; 02 : une assiette devant chacun aux mots « Un »… « six », étincelles à « personne n'est oublié ».
  Q1 (B, 5) : 5 enfants À GAUCHE (x < 520, la carte est à droite), choix 4/5/6 ; réponse : un ballon dans la main de chacun à « ballons », grand « 5 ».
  Q2 (C) : 4 copains, 3 chapeaux au-dessus ; choix « trop » / « oui » / « il en manque 1 » ; réponse : les 3 chapeaux tombent sur 3 têtes à « copain », le 4e a un chapeau en pointillé rouge.
  05-appris (3,85 s) : titre « Ce que tu as appris » (groupe en haut, comme rang) ; 4 copains en haut, 4 assiettes en bas reliées par des traits à « donne ».
- Pièges vus : `dit().jusque('à')` s'arrête sur « a » (même mot normalisé) ; une capture isolée (controle) d'un instant de réponse montre les choix vides (normal : ils se remplissent pendant la question) ; la carte paysage est à x ≥ 1290 px (≥ 1390 dans rang) : dessiner à gauche de l'ardoise pendant les questions.
