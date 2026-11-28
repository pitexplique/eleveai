# REPRISE — Idriss le pêcheur, dessins animés CP → CE2 (paysage + short par micro), 27/11/2026

Demande de Frédéric (27/11) : des petites vidéos, même pour les petits, sur Idriss, un vrai copain pêcheur.
Choix : « Les 6, dans l'ordre », « 6 shorts et 6 paysage ». Voix des 12 dans `manim/SCRIPTS-idriss-pecheur.md`
(validées : « Oui, lance la paire 1 »). Ses réponses sur Idriss (accord du prénom, ce qu'il pêche, où il vend) : pas encore données ;
hypothèse : barque bleue, ligne + filet, marché du port, aucun lieu nommé.

## Idriss, le vrai (27/11, Frédéric)
- « Parfait pour Idriss » : accord pour le prénom. Un vrai pêcheur rencontré à Saint-Gilles (la Réunion) — à garder pour une future
  description YouTube, JAMAIS dans les vidéos (aucun lieu nommé).
- Portrait : yeux BLEUS, peau marron, TRÈS GRAND et élancé, très sympa, un très beau sourire. `idrissE` redessiné le 27/11 soir
  (≈ 390 px à s = 1 au lieu de 308 ; yeux ouverts bleus ; grand sourire avec les dents ; ciré, bob jaunes et barbe courte gardés).
- ⛔ « Ne corrige pas les anciennes, adopte le profil aux prochaines » : la paire 1 garde l'ancien Idriss, AUCUN nouveau rendu de la paire 1.
  La paysage 02 (rendue avant le nouveau portrait) garde aussi l'ancien Idriss ; le short 02 n'a pas d'Idriss.

## Le socle
- Séries : `prototypes/ti-margo/films/idriss.json` (shorts) et `idriss-paysage.json` ; épisodes nommés `<classe>-<idée>` (cp-additif…).
- `films/idriss-commun.js` relit `cp-commun.js` (la page charge `<préfixe>-commun.js`).
- `films/idriss.js` / `idriss-paysage.js` relisent les dessins CP (cp-entier*, cp-entier2/3-dessins) puis `films/idriss-dessins.js` :
  idrissE (ciré et bob jaunes, barbe courte ; salut, montre), poissonE, COUL_POISSON, crabeE (marche), mouetteE (aile), seauCoulE,
  caisseE, panierE, barqueE (rameur, mat + vergue, voile, coque, poissons), matHautE (le haut du mât), soleilMatinE.
- Films : `films/idriss-<ep>.js` (short), `films/idriss-paysage-<ep>.js` (paysage). Voix `manim/voix/idriss-<ep>-{paysage,short}.json`.
- Sorties : `manim/sorties/idriss/<num>-<ep>/eleveai-maths-idriss-<ep>-{short,paysage}.mp4`.
- Mêmes commandes que la série CP (voix -Debit -6, `ti-margo-cues.py idriss <ep>`, controle, planche, film : UNE HD à la fois).

## Leçons de la paire 1
- Short : Ti Margo petit à gauche (tiMargoCoteE) dès la fin du titre, sinon il cache le bas du tableau.
- Paysage : dessiner GRAND (poissons 124-165 px, seaux 250, crabes ×0,9 espacés de 115) ; questions : tout à x < 480.
- Ne pas écrire de gros blocs par heredoc bash (coupé) : outil d'écriture + `remplace.py`.

## État
- [x] Paire 1 `cp_probleme_additif` : voix + WAV + instants ; short « Les mouettes sur le mât » (A = 7) et paysage
  « Le retour de la barque » (Q1 B = 7 crabes, Q2 C = 10 poissons) écrits, planches contrôlées.
- ⭐ 27/11 (chef d orchestre, verdict de Frédéric) : compte à rebours 8 s partout dans Idriss (`rebours:8` dans la question, `short.js` accepte `Q.rebours`, 3 s par défaut pour les anciens films) ; pause après la question 8,4 s.
- [x] HD short 01 : 60,1 s, −19,5 dB, compteur 8 s visible (~22-30 s), ceinture blanche, fin eleveai.fr / YouTube (planche HD ok).
- [x] Miniature short 01 refaite (ardoise « 3 + 4 / = ? », plus d'emoji) ; HD paysage 01 : 126,8 s, −19,8 dB, planche ok (compteurs Q1 ~57-66 s, Q2 ~91-99 s) ; miniature paysage faite.
- Socle 27/11 soir : `idriss-dessins.js` a aussi quaiBoisE, ploufE, etalE, chatE (+ yeuxOmbreE), crevetteE, hameconE, boueeE, vagueE,
  euroE (pièces 1/2 €, billets 5/10/20/50 €), prixE (étiquette), porteMonnaieE, formuleE (formule centrée mot à mot).
  `ce1-commun.js` / `ce2-commun.js` = copies du même socle : on garde le socle CP pour les 6 paires.
- ✅ 28/11 : LES 12 VIDÉOS SONT RENDUES EN HD, contrôlées, avec miniatures (`manim/sorties/idriss/01 → 06`).
- [x] Paire 2 `cp-soustractif` (02) : short « Le goûter de la mouette » (C = 5) HD 62,0 s, −19,5 dB, miniature ;
  paysage « Le chat du port » (Q1 A = 5 coquillages, Q2 A = 6 hameçons) HD 125,4 s, −19,7 dB, planche ok, miniature.
- Voix + WAV + instants des paires 3 → 6 FAITS (les 12 voix dans `manim/voix/idriss-*`, sons dans `public/sons/idriss-*`).
- Films 03 → 06 (short + paysage) ÉCRITS le 27/11 soir (dessins ajoutés : enfantE, rubanE, droiteE, reveVaguesE, ardoisePrixE,
  balanceE, calamarE, sachetKiloE, dameE ; idrissE accepte cire/cireB/peau pour le pêcheur voisin).
- [x] 03 `cp-monnaie` : short « Pas une pièce de trop » (B) HD 59,1 s, −18,9 dB ; paysage « J'achète mon poisson » (C, B)
  HD 126,7 s, −19,1 dB (coche déplacée au-dessus de la formule, récapitulatif resserré) ; 2 miniatures.
- [x] 04 `ce1-partage` : short « Les quatre chats » (C) HD 59,6 s, −20,0 dB (8 sardines en 2 rangées de 4, chats espacés) ;
  paysage « Les trois paniers » (B, A) HD 121,2 s, −20,1 dB (« ? » sous les enfants) ; 2 miniatures.
- [x] 05 `ce1-rendre` : short « Idriss dans la lune » (B) HD 65,3 s, −18,9 dB (« 1 € de trop ! » sur cartouche sombre) ;
  paysage « Idriss rend la monnaie » (C, A) HD 119,1 s, −19,5 dB (crevettes espacées, « + 5 » dégagé) ; 2 miniatures.
- [x] 06 `ce2-kilo` : short « Le compte est pile » (B) HD 62,9 s, −19,1 dB ; paysage « La balance d'Idriss » (A, C)
  HD 132,8 s, −19,0 dB (étiquettes `etiqueteE` lisibles au lieu des petites pastilles, dessins des questions agrandis) ; 2 miniatures.
- 28/11 : `droiteE` renvoie toujours X(n) (avant, rien quand z = 0 : la paysage 05 plantait « X is not a function »).
- Leçon : `etiquette()` (pastille ronde) = 1 ou 2 chiffres seulement ; « 9 € », « 2 kg » → `prixE` / `etiqueteE` / `ecrire`.
- [x] 28/11 ~04 h, sur son « Oui, branche-les » : vignettes webp (24), R2 48 fichiers sous `<classe>/maths/idriss/0N-<ep>/`
  (cp 01-03, ce1 04-05, ce2 06 ; tailles R2 = locales) ; manifeste : 12 entrées `idriss-<ep>[-short]` à la fin, YouTube daté
  09/08 → 14/08/2027 (une paire par jour), chapitres calculés depuis les durées des voix (≥ 10 s chacun) ; videos-r2.json +
  bilans-videos.json (mes 12 clés seulement) ; coach : `brancher-videos-coach.mjs --ecrire --id …` → 12 lignes notion_ressources
  (6 micros, paysage + short ; aucune vidéo remplacée). ⚠️ Pas poussé : les boutons du coach mènent à /video/idriss-… qui n'existe en ligne qu'après le push.
- ⏭ Reste : push (avec son accord) ; refaire ou non la paysage 02 avec le nouvel Idriss ; Saint-Gilles dans une description YouTube si Frédéric le veut.
- Contrôle : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs idriss[-paysage] <ep> controle $(seq 3 4.5 135)` puis planche du dossier.
- R2, coach, manifeste YouTube : seulement sur son accord. Commit par chemin, pas de push.
