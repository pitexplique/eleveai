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
- [ ] films paires 2 et 3 (short + paysage), planches, HD une par une.
