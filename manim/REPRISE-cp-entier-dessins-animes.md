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
- [x] paysage rang « La file du toboggan » : HD 98,8 s, son ok, compteurs visibles, miniature faite.
- [x] short collection « Les bougies » : HD 49,3 s, son ok, compteur visible, miniature faite.
- [x] paysage collection « Une assiette pour chacun » (`films/cp-entier-paysage-collection.js`) : HD faite le 26/11 : 96,3 s, son ok, compteurs visibles (Q1 ~46 s, Q2 ~73 s), rien de rogné, miniature faite (« Assez de chapeaux ? TU PARIES ? »). Corrigé avant la HD finale : « 5 enfants, 5 ballons. » (espace insécable, sinon « 5 » restait seul en fin de ligne).
- [x] LES 6 VIDÉOS SONT RENDUES EN HD.
- Frédéric (26/11) : « les vidéos sont pour les CP » → les brancher au coach CP (micros cp_entier_denombre, cp_entier_rang, cp_entier_construire_collection) : manifeste + R2 + notion_ressources + push.
- [x] 26/11 ~04 h, sur son « Oui, branche-les » : manifeste (ids cp-entier-{denombre,rang,collection}[-short], YouTube daté 23-25/07/2027), R2 (12 fichiers + vignettes webp, seulement cp/maths/entier), videos-r2.json + bilans (mes 6 entrées seulement : 42c1a8c48), push, puis `brancher-videos-coach.mjs --classe cp --notion nombre_entier --ecrire` : 6 lignes notion_ressources, /api/notion-videos les renvoie.
- [ ] RESTE : Frédéric regarde les vidéos (voix des paires 2 et 3 pas relues par lui) ; page /petits non touchée (sa question : « pourquoi une page /petits ? »).
- Pièges vus : `dit().jusque('à')` s'arrête sur « a » (même mot normalisé) ; une capture isolée (controle) d'un instant de réponse montre les choix vides (normal : ils se remplissent pendant la question) ; la carte paysage est à x ≥ 1290 px (≥ 1390 dans rang) : dessiner à gauche de l'ardoise pendant les questions.
- [x] 26/11 matin, Frédéric « CORRIGE » : shorts = carte à droite sous l'ardoise, Ti Margo petit à gauche (`carteCoteE`, `tiMargoCoteE`) ; paysage denombre « Des pommes. Combien ? » (120e94c82) ; HD + R2 des 3 shorts et de la paysage denombre.
- [x] 26/11 midi : les 3 PAYSAGES finissent par « Entraîne-toi sur eleveai.fr, ou sur YouTube @eleveai974 » (voix 6,1 s + 1,5 s), ni pouce, ni abonnement, ni cloche ; HD + R2 au même chemin ; coupe du lecteur 5,05 s (arrêt après « point f r »). Les 3 SHORTS gardent l'ancienne fin (« modifie les PROCHAINS shorts comme ça »).

## Paires 4-5-6 (comparer, dizaine_unite, droite) — 26/11 après-midi
Voix validées par Frédéric le 26/11 (`manim/SCRIPTS-cp-nombres-dessins-animes-2.md`). Séries À PART `cp-entier2` (shorts) et
`cp-entier2-paysage` (paysages), dessins nouveaux dans `films/cp-entier2-dessins.js`. Fin NOUVELLE partout (shorts compris) :
« Entraîne-toi sur eleveai.fr / ou sur YouTube @eleveai974 ». Sorties `manim/sorties/cp/maths/entier/0N-<ép>/`.
- [x] 04 comparer, short « Les écureuils » : 55,5 s, bonne réponse C (7 et 7 : autant). Paysage « Qui en a le plus ? » : 126,2 s, Q1 B (le rouge, 8 > 5), Q2 A (7 < 9, vers le 9).
- [x] 05 dizaine, short « Le pari des billes » : 61,4 s, bonne réponse A (non, 53 > 35). Paysage « Les paquets de dix » : 122,5 s, Q1 C (25), Q2 B (les bouquets de 10).
- [x] 06 droite, short « La fusée » : 54,2 s, bonne réponse B (8). Paysage « La piste de la grenouille » : 108,9 s, Q1 A (6), Q2 C (le point bleu = 9).
- Contrôle HD des 6 : son ok (−19 dB en moyenne), compteur visible ~3 s à chaque question, rien de rogné, carte à droite et Ti Margo visible dans les shorts, fin eleveai.fr / YouTube, miniatures ok.
- Corrigé après la 1re HD : paysage dizaine (« 5 unités » et « de 10 » insécables ; 4 bouquets et 6 tulipes séparés et loin de la carte) ; paysage droite (le « 9 » vert écrit sous la piste, il touchait le « 10 »). Ces deux HD sont refaites.
- [ ] RESTE, sur l'OK de Frédéric seulement : R2, coach (modèle du commit 42c1a8c48, ids `cp-entier-<ép>` et `cp-entier-<ép>-short`), page /petits.
