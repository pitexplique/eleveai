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
- [x] 26/11 après-midi, sur son « Oui, envoie » : R2 (24 fichiers, tailles vérifiées), videos-r2.json et /petits (b4fd379d2) ; manifeste (YouTube daté 31/07, 01/08, 02/08/2027), bilans et coach : 6 lignes notion_ressources (9933fd963). Pas poussé.

## Paires 7 → 12 (lire_ecrire, decomposer, ordinal, ordonner, representations, defi) — 27/11
Demande du 27/11 (test avec un enfant de CP : il adore les shorts d'une minute) : UNE paysage ET UN short par micro.
Il n'a pas vu le « TU PARIES ? » écrit → dans ces films, accroche par le DESSIN qui intrigue + une QUESTION DITE ;
pas de `PARI` (cp-commun.js) ni dans le film ni sur la miniature. Ne pas toucher aux 12 vidéos en ligne.
- [x] Voix des 12 écrites : `manim/SCRIPTS-cp-nombres-dessins-animes-3.md` (bonnes réponses 07 B A C · 08 A B B · 09 B B C ·
  10 C A B · 11 C A C · 12 A C A). ✅ Validées par Frédéric le 27/11 (« Oui, lance la paire 7 »).
- Les brouillons `manim/voix/cp-entier-lire-{paysage,short}.json` (26/11, non suivis, ancienne fin) seront écrasés par les voix validées.
- Ensuite : JSON des voix (`manim/voix/cp-entier-<ep>-{paysage,short}.json`), WAV -Debit -6, instants (séries cp-entier2 /
  cp-entier2-paysage), films `films/cp-entier2-<ep>.js` + `cp-entier2-paysage-<ep>.js`, planches -ql, HD une à la fois,
  contrôle image par image, miniatures ; sorties `manim/sorties/cp/maths/entier/07-lire` … `12-defi`.
- Nouveaux dessins : `films/cp-entier3-dessins.js` (bus, brume, arrêt, route, ticket, bulle, ondes, maison de la rue + mamie,
  faisceau de lanterne, lune, casier, bracelet, piscine), chargé par `cp-entier2.js` et `cp-entier2-paysage.js`.
- [x] 07 lire : voix + WAV + instants ; short « La porte de mamie » (`films/cp-entier2-lire.js`, 60 s, C = 41) et paysage
  « Le bus de la piscine » (`films/cp-entier2-paysage-lire.js`, 131 s, Q1 B = 32 vers 50 s, Q2 A = soixante-cinq) écrits,
  planches -ql contrôlées (maisons et numéros grossis, « vingt »/« huit » séparés, plaque du bracelet blanche, choix sur une ligne).
- [x] 07 HD : short 60,0 s (−18,8 dB), compteur visible à ~30 s ; paysage 131,3 s (−19,0 dB), compteurs Q1 ~66 s, Q2 ~98 s ;
  rien de rogné, ceinture blanche, fin eleveai.fr / YouTube ; miniatures « Quelle porte est chez mamie ? » et « Est-ce notre bus ? »
  (sans TU PARIES). Corrigé avant la HD finale de la paysage : `me('Vingt-huit',2)` (le 1er « vingt-huit » est celui du chauffeur,
  le cadre vert paraissait vide trop tôt). ⚠ Piège : `mot()` normalise, « Vingt-huit » = « vingt-huit » → préciser n.
- [x] 08 decomposer : voix JSON + WAV, "decomposer": "08" ajouté aux 2 séries, instants. Dessins ajoutés à `cp-entier3-dessins.js`
  (perleE, filDixE, boiteBijouxE, saladeE, rangTerreE, tissuE, tirelireE, billetDixE, pieceUnE, etagereE).
  Short « La tirelire » (`films/cp-entier2-decomposer.js`) : 4 billets de 10 € + 6 pièces de 1 €, B = 46 ; commentaire 20 + 9 = ?
  Paysage « La boîte à perles » (`films/cp-entier2-paysage-decomposer.js`) : 34 perles → 3 fils de 10 (cadres orange) + 4 seules (cadre bleu),
  30 + 4 = 34 ; Q1 potager (5 rangées de 10 salades + 2) → A (50 + 2) ; Q2 68 = 60 + ? sous un tissu → B (8).
  Corrigé sur les planches -ql : billets et pièces grossis, nombres 10/20/30/40 sur fond plein (le « 10 € » transparaissait),
  formule du short décalée (touchait le pied de l'étagère), fils et formules de la paysage agrandis, « vaut 30 / vaut 4 » remplacés
  par des traits pointillés vers les fils et les perles, « 8 perles » insécable.
  HD : short 59,8 s (−19,4 dB), compteur visible ~28-31 s ; paysage 118,8 s (−19,5 dB), compteurs Q1 ~62-64 s, Q2 ~90-92 s ;
  rien de rogné, ceinture blanche, fin eleveai.fr / YouTube. Miniatures « Combien dans ma tirelire ? » (🐷 💶 ?) et
  « Combien de perles ? » 💎 (pas 📿 : c'est un chapelet). Pas de R2 / manifeste / coach (attend l'accord de Frédéric).
- [x] 09 ordinal : voix JSON (texte exact du script) + WAV -Debit -6, "ordinal": "09" aux 2 séries, instants. Dessins ajoutés à
  `cp-entier3-dessins.js` (cubeE, pleineLuneE, guirlandeE, locoE, wagonE (h en option), oursonE, railsE, ordinalZE (fin « e/er »
  qui grossit), motCouleursE (mot en morceaux colorés : neu-f / neu-v-ième)). Fin d'ordinal dans la carte : « 9ᵉ », « 1ᵉʳ »
  (lettres en exposant Unicode, la carte écrit en texte brut) ; dans les choix : `9<sup>e</sup>` (innerHTML).
  Short « Le petit train de la fête » (`films/cp-entier2-ordinal.js`) : HD 63,7 s (−18,5 dB), C = le 9e, compteur ~29-31 s ;
  commentaire « 11e → ? ». Paysage « La tour qui touche la lune » (`films/cp-entier2-paysage-ordinal.js`) : HD 126,4 s (−18,6 dB),
  Q1 B (le 7e, compteur ~62-65 s), Q2 B (20e, compteur ~97-100 s) ; rien de rogné, ceinture blanche, fin eleveai.fr / YouTube.
  Miniatures « Dans quel wagon ? » (🚃🧸 ?) et « Qui touche la lune ? » 🌕. Corrigé sur les planches : train et ourson grossis,
  flèches « → » qui mordaient sur les mots, lune déplacée (sous « 4e » / « 1er »), tour de 20 cubes et « 20e » décalés à gauche
  (la carte rognait le « e »). ⚠ En paysage, la zone visible à gauche de la carte s'arrête vers x ≈ 470, pas 520.
- [x] 10 ordonner : voix JSON + WAV des paires 10, 11 ET 12 faites d'un coup ; "ordonner"/"representations"/"defi" ajoutés aux 2 séries ;
  instants des 3. Dessins ajoutés à `cp-entier3-dessins.js` : numDUE (1 ou 2 chiffres, dizaines orange / unités bleu), plaqueNumE (nombre sur
  plaque sombre : lisible sur une voile, un pot, un cerf-volant), bateauE, quaiE (lanternes), cerfVolantE, potConfitureE, carteNumE (carte
  bleu nuit ; n = null → « ? »), ventE, herbeE.
  Short « Les cartes dans le vent » (`films/cp-entier2-ordonner.js`) : 91, 9, 19 → B (9 ; 19 ; 91) ; réponse = deux échanges en arc
  (9 ↔ 91 puis 19 ↔ 91, sinon les cartes se recouvrent) ; commentaire 50, 15, 5 (cartes « ? » qui se retournent). HD 69,0 s (−18,9 dB),
  compteur ~33-35 s. Paysage « Les bateaux rentrent au port » (`films/cp-entier2-paysage-ordonner.js`) : 21, 5, 30, 12 → 5 < 12 < 21 < 30 ;
  Q1 cerfs-volants 40, 24, 14 → C (14), compteur ~62-65 s ; Q2 pots 38, 32, 35 → A (32 ; 35 ; 38), compteur ~99-102 s ; HD 131,3 s (−19,1 dB).
  Rien de rogné, ceinture blanche, fin eleveai.fr / YouTube. Miniatures « Dans quel ordre ? » (ardoise « 91 ; 9 ; 19 / ? ») et
  « Comment les ranger ? » ⛵⛵⛵. Corrigé sur les planches : cartes, bateaux, cerfs-volants et pots agrandis (trop petits à ×0,9),
  « 14 < 24 < 40 » et « 32 < 35 < 38 » desserrés, espaces avalés dans l'ardoise de la miniature (→ « ; »). Choix « 32 ; 35 ; 38 » à 58 px.
  ⚠ Piège shell : un heredoc bash avec certains contenus a été coupé (« here-document delimited by end-of-file ») : écrire les gros
  fichiers avec l'outil d'écriture, pas par `cat <<EOF`.
- [x] 11 representations : dessins ajoutés à `cp-entier3-dessins.js` (barreDixE orange, cubeUniteE bleu, costumeE = b barres + u cubes,
  rideauE, projecteurE, masqueE, ombreMasqueeE, cadreDixE + jetons, murPierresE, mainLeveeE (doigts levés 1 à 5)).
  Short « Les mains derrière le mur » (`films/cp-entier2-representations.js`) : 4 copains × 2 mains + 3 doigts → C (43) ; plaques « 10 »
  au-dessus de chaque copain puis 10, 20, 30, 40… 41, 42, 43 ; les copains sortent. HD 62,8 s (−19,0 dB), compteur ~30-33 s.
  Paysage « Le bal masqué des nombres » (`films/cp-entier2-paysage-representations.js`) : rideau, ombre masquée, 2 barres + 3 cubes
  comptés sur une plaque compteur, le masque tombe : 23 ; costumes « vingt-trois », 20 + 3, 2 cadres de dix + 3 jetons, traits vers 23.
  Q1 3 barres + 6 cubes → C (36), compteur ~57-61 s ; Q2 52 → A (5 barres, 2 cubes ; choix en 44 px), compteur ~88-92 s.
  HD 120,1 s (−19,4 dB). Miniatures « Combien de doigts ? » (🖐🖐🖐 ?) et « Qui se cache là-dessous ? » 🎭.
  Corrigé : mains ×1,9 (illisibles à ×1,1), le « 3 » bleu de 43 invisible sur le ciel bleu → plaque sombre, barre et cube du commentaire
  agrandis et visibles dès le début du « À toi » (ardoise vide 1,3 s → HD refaite), ombre et costumes agrandis, « ? » insécable.
- [ ] 12 defi : voix, WAV, instants, dessins (hibouE, foretE, brancheE, croixE, coffreE, cadenasE à roues, petitMotE) et les 2 films
  (`films/cp-entier2-defi.js`, `films/cp-entier2-paysage-defi.js`) ÉCRITS ; planches, HD, miniatures à faire.
  Branchement R2 / manifeste / coach des paires 7-12 : seulement sur l'accord de Frédéric.
