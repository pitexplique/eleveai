# Reprise : les 11 shorts puissances en dessin animé (session du 07/11)

Réponds en français. Les films, mp4 et miniatures existent et les planches ont été relues. Il reste un contrôle final, un commit et le rapport.

## Déjà fait
- Socle et ép. 02 : commit `a6e47edb`. Films 03 à 13 : voir le commit suivant dans `git log -- prototypes/ti-margo/films/`.
- Tout est dans `prototypes/ti-margo/films/puissances*.js` ; sorties `manim/sorties/<4e|seconde|3e|premiere>/maths/puissances/dessin-anime/NN-<ep>/`.
- Lancé en dernier, sans doute terminé quand tu lis ceci : le re-rendu des 8 films à cartes empilées (`puissances` : dix, zero-negatif, notation-scientifique, comparer, calcul, defi ; `puissances-3e` : defi ; `puissances-1re` : cinq-regles), pour deux retouches : `.choix` plus étroites (`puissances-commun.js`), virgule relevée (ép. 05).

## À faire
1. Vérifie que ces 8 mp4 sont datés d'après 10 h le 07/11 (fichiers `…-short-dessin-anime.mp4`). Sinon, relance en arrière-plan : `node scripts/ti-margo-short.mjs <série> <ép> film` (n'en relance aucun qui tourne encore).
2. Regarde : `python scripts/ti-margo-planche.py <mp4> <planche.png> 24` au moins sur 05 (virgule de 0,000 007) et 04 (la bonne réponse grossit sans sortir de la carte ; le trou se referme). Corrige tout défaut, même mineur.
3. Aperçu : `manim/sorties/apercu.html`, port 3900 (`preview_start` nom `sorties-video`), la DERNIÈRE vidéo finie seule, à l'arrêt, jamais d'autoplay.
4. Commit PAR CHEMIN de tes seuls fichiers, sans push, sans stash, sans changer de branche.
5. Rapport en français, en quelques lignes, à la session qui a commandé le travail (`local_e3fee464-a74b-4ff1-bcfe-cb527825fe0f`) et à Frédéric : commits, durées, phrases signalées ci-dessous, « je n'entends pas le son : rien n'a été écouté ».

## Durées (avant re-rendu, la durée ne change pas)
02 calculer 56,2 s · 03 dix 62,8 · 04 zero-negatif 61,8 · 05 notation-scientifique 67,3 · 06 comparer 61,2 · 07 calcul 58,1 · 08 produit-quotient 69,5 · 10 enchainer 64,1 · 11 defi 63,7 · 12 defi 3e 69,3 · 13 cinq-regles 71,9.

## Titres et gags
02 SOS calculatrice (clé anglaise lâchée au « Non ! ») · 03 Le compteur fou (l'écran s'étire et pousse Ti Margo) · 04 Le grand trou (le 0 rouge se referme au « 1 ») · 05 La longue banderole (les 9 zéros s'envolent en ballons) · 06 Le grand duel (le petit 2 met le gros 9 K.-O.) · 07 Le jeu des anneaux (buzzer « Perdu ! ») · 08 Le coffre-fort (le trousseau de 128 clés fait plier Ti Margo) · 10 La machine à simplifier (elle fume et crache un tout petit 8) · 11 Le pari de la balance (la pile de centimes sort du cadre, la liasse s'envole) · 12 Le tampon (FAUX se retourne en JUSTE) · 13 Le contrat (la tour 16 384 écrase le bureau).

## Phrases à signaler à Frédéric (voix NON modifiées)
- Ép. 05, question : « Et 3 millions ? » : le choix C, 30 × 10⁵, vaut aussi 3 millions. Il n'est faux que parce que ce n'est pas la notation scientifique, et la question ne le précise pas.
- Ép. 06 : « L'exposant décide d'abord » n'est vrai qu'en notation scientifique (nombre entre 1 et 10 devant). Tous les cas du film respectent cette condition.
- À écouter : ép. 04 « 1 000 000 puissance 0 » (2,3 s sur 7 rangs, peut-être lu chiffre à chiffre) ; ép. 05 « 0,000 007 » (idem).
- Ép. 08 : le panneau final écrit « 2^? clés », la voix dit « avec une puissance ».
- Ép. 13 : sortie en `premiere` seulement ; le Manim existait aussi en `stmg`, à copier si Frédéric le veut.

## Limites
Rien n'est décidé sur le remplacement des shorts Manim programmés : à Frédéric de trancher, avant le premier envoi. Ne touche ni `manim/manifeste-youtube.json`, ni R2, ni coach, ni YouTube. Pas de push. `_muet.mp4` traîne dans chaque dossier de sortie (ignoré par git), comme pour le pilote.
