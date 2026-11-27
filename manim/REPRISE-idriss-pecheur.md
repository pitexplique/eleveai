# REPRISE — Idriss le pêcheur, dessins animés CP → CE2 (paysage + short par micro), 27/11/2026

Demande de Frédéric (27/11) : des petites vidéos, même pour les petits, sur Idriss, un vrai copain pêcheur.
Choix : « Les 6, dans l'ordre », « 6 shorts et 6 paysage ». Voix des 12 dans `manim/SCRIPTS-idriss-pecheur.md`
(validées : « Oui, lance la paire 1 »). Ses réponses sur Idriss (accord du prénom, ce qu'il pêche, où il vend) : pas encore données ;
hypothèse : barque bleue, ligne + filet, marché du port, aucun lieu nommé.

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
- [x] Paire 2 `cp-soustractif` (02) : voix + WAV + instants ; short « Le goûter de la mouette » (C = 5) HD 62,0 s, −19,5 dB, planche ok, miniature ;
  paysage « Le chat du port » (Q1 A = 5 coquillages, Q2 A = 6 hameçons) planches ok, HD lancée.
- [ ] Paire 3 `cp-monnaie` (03) : voix + WAV + instants faits ; short écrit (B), paysage à écrire.
- [ ] Paires 4 → 6 (voix dans le SCRIPTS ; épisodes 04-06 déjà déclarés dans les deux séries JSON).
- R2, coach, manifeste YouTube : seulement sur son accord. Commit par chemin, pas de push.
