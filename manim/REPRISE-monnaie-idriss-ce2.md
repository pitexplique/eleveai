# REPRISE — Monnaie CE2 avec Idriss le pêcheur (5 micros, 10 dessins animés), 28/11/2026

Voix VALIDÉES par Frédéric (« OK CE2, lance ») : `manim/SCRIPTS-monnaie-idriss.md` section CE2 + `manim/voix/idriss-ce2-<ep>-{paysage,short}.json`.
⛔ Ne changer aucune voix sans lui. ⛔ `ce2-kilo` (06) existe déjà : n'y pas toucher.
Règles communes aux 3 sessions (CP, CE1, CE2) : note `monnaie-idriss-regles-communes.md` du dossier de notes partagé
(verrou HD `hd-verrou.txt` du même dossier ; UNE seule HD à la fois ; rien sous 2,5 Go libres ; fichiers de cues partagés, voir `alerte-cues-partages.md`).

| Num | Épisode | Short (bonne réponse) | Paysage (Q1, Q2) |
|---|---|---|---|
| 19 | ce2-virgule | « Le zéro oublié » (C 4,09 €) | « L'ardoise des prix » (A 5,20 € ; B 2,05 €) |
| 20 | ce2-constituer | « Le filet neuf » (B il manque 1 €) | « Le beau thon » (C 10 pièces ; A le tas A) |
| 21 | ce2-additionner | « La glace et les appâts » (A 6,10 €) | « Le panier de la dame » (C 6,70 € ; B 2,30 €) |
| 22 | ce2-rendre | « Idriss a-t-il bien rendu ? » (A c'est juste) | « La monnaie au centime près » (C 0,80 € ; C 7,65 €) |
| 23 | ce2-defi | « La lampe d'Idriss » (A il manque 10 c) | « Le grand défi du marché » (A le premier ; B 3,50 €) |

## Fichiers (écrits par la session CE2 seulement)
- Films : `prototypes/ti-margo/films/idriss-ce2-<ep>.js` (short) et `idriss-paysage-ce2-<ep>.js` (paysage), modèle `ce2-kilo`, `rebours:8`.
- Dessins : `films/idriss-dessins-ce2.js`. ⚠️ Tous les fichiers de dessins sont chargés dans la MÊME page : les noms CE2 finissent
  donc par `Ce2E` (le CP a déjà `tasE`, le CE1 `lampeE`, `sacGlaceE`, `filetE`, `cornetE`…). Dessins : `prixVCe2E` (prix à virgule :
  euros bleus `EUR_CE2`, virgule blanche grasse, centimes orange `CEN_CE2` ; renvoie le x de chaque caractère pour entourer un chiffre),
  `calculVCe2E` (une ligne de calcul en prix), `ardoiseVCe2E` (petite ardoise avec un prix), `argentCe2E` ('10€', '50c'), `tasCe2E`,
  `flotteurCe2E`, `lampeCe2E` (allume), `sacGlaceCe2E`, `appatsCe2E`, `filetCe2E`, `citronCe2E`, `cornetCe2E`, `craieCe2E`,
  `mainIdrissCe2E` (la main du bras « montre »), `barreCe2E`, `plaqueCe2E`, `droitePrixCe2E` + `bondCe2E` (rendre la monnaie).
- WAV : `public/sons/idriss-ce2-<ep>-{paysage,short}/` (débit −6) ; instants dans `idriss-cues.js` / `idriss-paysage-cues.js` (partagés).
- Sorties : `manim/sorties/idriss/<num>-ce2-<ep>/`.

## Leçons
- `mot(clip,'a')` attrape aussi « à » et « a » (« Il a écrit », « Lequel a ») : compter le bon rang pour le choix A (`tq('A',2)`…).
- Les mots avec apostrophe sont UN mot dans les cues : `mot(clip,"l'ardoise")`, pas 'ardoise'.
- `phraseE(txt, ts)` : autant d'instants que de morceaux séparés par des espaces.

## État (28/11, fin de la 1re session CE2)
- [x] 10 WAV + instants (vérifiés présents dans les deux fichiers de cues).
- [x] 10 films écrits ; les 10 se chargent sans erreur (contrôle à 5, 15, 25 s).
- [x] 28/11 (2e session CE2) : planches -ql 19 → 22 (short + paysage) contrôlées et CORRIGÉES (scratchpad, non gardées) :
      19 short : « 9 c → 09 » sur plaque sombre (illisible sur la mer), ardoise du crabe décalée ; « À toi » : « ?,?? € » au lieu d'une virgule seule.
      19 paysage : 345 c / = 3,45 € ne se chevauchent plus ; « , [ ][ ] 2 chiffres » agrandi ; pièces Q1 plus grandes ; « 5 c → 05 » loin du chapeau ;
         Idriss ne montre plus (bras sur « A : 2,50 € ») ; « euros , centimes » séparés ; carte sans mot seul (espaces insécables).
      20 short : billets/pièces agrandis et espacés, 50 c au 2e « cinquante » (paraissait avec le prix), calcul hors de la tête d'Idriss.
      20 paysage : tas A/B/C et pièces de 20 c agrandis ; cartes en espaces insécables (« 2 € ? », « 8,40 € »).
      21 short : « + » entre les deux ardoises, formule 2 + 3 + 1 = 6 hors de la tête d'Idriss, ⭐ le « 1 » de l'euro de plus en JAUNE.
      21 paysage : ardoises 6,40/3,30 séparées ; Q1/Q2 agrandies (animaux, formules, encadré « A : 1,130 € ») ; « 130 c = 1 € et 30 c » insécable.
      22 short : droite des prix 3,90 → 4 → 5 € déplacée (passait sur Idriss), argent agrandi.
      22 paysage : droites et bonds agrandis partout ; « rend‑on ? » insécable.
      ⚠️ Un contrôle qui SAUTE directement dans la 2e question peut montrer les choix de la 1re : artefact du saut, pas du film.
- [x] Miniatures shorts : `miniCe2E` (gabarit A DANS le film, zone sûre 215 → 1700, « Dessin animé ») dans `idriss-dessins-ce2.js`, les 5 shorts l'utilisent ;
      23 : titre « Assez pour la lampe ? » (le 20 garde « Assez d'argent ? »). ⚠️ `miniatures-shorts-grille.py` exige une entrée du MANIFESTE : pas utilisé (manifeste = accord de Frédéric).
- [ ] 23 (short + paysage) : planches -ql à LIRE (déjà faites, à refaire après correction) puis corriger.
- [ ] Planches -ql image par image (toute la durée, pas de 2 à 3 s) : compteur 8 s visible, bonne réponse du script, chaque nombre dit
      est écrit, virgule et deux chiffres lisibles, rien de coupé ni serré ; corriger ce qui chevauche.
      `CONTROLE=<dossier> node scripts/ti-margo-short.mjs idriss[-paysage] ce2-<ep> controle $(seq 3 3 135)` puis
      `python scripts/ti-margo-planche.py <dossier> <planche.png>`.
- [ ] HD une à la fois sous le verrou (`node scripts/ti-margo-short.mjs idriss[-paysage] ce2-<ep> film`), planche HD.
- [ ] Miniatures (`... miniature`) + gabarit A « Dessin animé » (`scripts/miniatures-shorts-grille.py`, n'ajouter QUE nos lignes au JSON partagé).
- R2, manifeste, coach, YouTube : NON sans l'accord de Frédéric. Pas de push. Ne jamais lancer la lecture d'une vidéo.
