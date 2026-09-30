# Suivi 6e (30/09)

## Registre fiches de cours (lib/fiches/registre.ts)
"maths/6e/stat-enquete": { titre: "Mener une enquête et faire un tableau", resume: "Poser une bonne question, noter les réponses et les compter dans un tableau d'effectifs." },
"maths/6e/proba-frequence": { titre: "La fréquence : lancer pour de vrai", resume: "Compter ce qui sort vraiment, le comparer au calcul, et voir l'écart se réduire quand on répète." },

## Registre feuilles (lib/fiches-exercices/registre.ts)

## Doutes pour Frédéric
- proba_frequence : la banque fait calculer 1/4, 1/6 ; fiche voisine dit « pas de favorables/possibles en 6e » → écrit « 1 chance sur 4 », « 0,25 ».
- stat_enquete : tableau « mangues / letchis » (seul double entrée de la banque) gardé.
- proba_frequence historique : Ishango, Buffon 4040/2048, Pearson 24000/0,5005 — de mémoire, à vérifier.
- outil : scripts/apercu-canvas.mjs plante sur l'import CSS KaTeX (TexteMath via TableauSignesCanvas).

## Fiches cours lot nombres (rapport)
"maths/6e/demi-droite-graduee": { titre: "La demi-droite graduée", resume: "Lire l'abscisse d'un point, placer un décimal ou une fraction, graduer un segment." },
"maths/6e/decimal-calcul": { titre: "Calculer avec les décimaux", resume: "Additionner, multiplier, diviser des nombres à virgule, et multiplier par 0,1." },
"maths/6e/fraction-calcul": { titre: "Calculer avec les fractions", resume: "Prendre une fraction d'un nombre, ajouter des fractions, multiplier par un entier." },
"maths/6e/algebre-probleme": { titre: "Problèmes à nombres cachés et motifs", resume: "Dessiner un problème en barres pour trouver un nombre caché, et prolonger un motif." },
Doutes : 5/4+2/3, 7/2−3/5, 3,7×2,9 (banque/BO) difficiles ; % dans calcul décimal (banque) ; mangues/letchis/goyave en algèbre ; exemple B demi-droite : 1,5 affiché pour 3/2 ; historique à vérifier (Descartes 1637, Napier ~1617, Fibonacci 1202, barres Singapour 1980).

## Fiches cours lot grandeurs (rapport)
"maths/6e/prop-echelle": { titre: "Les échelles", resume: "Lire ce que vaut 1 cm du plan en vrai, multiplier pour aller vers la réalité, diviser pour revenir au plan." },
"maths/6e/duree-temps": { titre: "Horaires et durées", resume: "Un horaire dit quand, une durée dit combien de temps : on compte par 60 et on passe par l'heure ronde." },
"maths/6e/aire-unite": { titre: "L'aire et ses unités", resume: "L'aire mesure l'intérieur d'une figure : on compte des carreaux, et 1 dm² vaut 100 cm²." },
Doutes : banque durées = Diagonale des Fous + emprunt 76 mois (pas du monde d'un enfant) ; aires : pas de tableau de conversion (BO), km² présenté seulement ; historique à vérifier (Cassini 1/86 400, base 60 Babylone, heure décimale Révolution, m² Révolution).
Canvas illisibles en carte (à signaler) : echelle 9,1 px, frise durée 8,6 px, double_horloge 7,4 px ; schema_barre déborde > 8 parts chiffrées.

## Mode classe : FicheCoursClient ignore slides[] → champ `tiMargo` ajouté (types.ts + slidesDepuisFiche.tsx), à committer avec TiMargoBulle.tsx.
## Serveur 3300 : hydratation lente pendant que les agents écrivent → mesurer APRÈS, serveur redémarré.

## Lot A entiers (feuilles) : 0 fausses ×3, tsc propre
"maths/6e/entier-nombre": { titre: "Les nombres entiers : 20 exercices corrigés", resume: "Écrire un nombre en chiffres et en lettres, trouver le chiffre et le nombre de centaines, comparer et ranger, décomposer, encadrer, lire une droite graduée. Des planètes, des stades de rugby, des vélos, des bouchons à recycler, un chèque, un comptage d'oiseaux et un compteur de voiture." },
"maths/6e/entier-calcul-mental": { titre: "Le calcul mental : 20 exercices corrigés", resume: "Passer par la dizaine, arrondir puis corriger, couper un nombre en morceaux, regrouper, double et moitié, fois et divisé par 10, 100, 1 000, ordre de grandeur. Une recette de crêpes, une équipe de volley, une sortie au parc animalier, des tours de piste, une pyramide de nombres et une tirelire." },
"maths/6e/entier-calcul-pose": { titre: "Le calcul posé : 20 exercices corrigés", resume: "Poser une addition et une soustraction avec retenues, une multiplication par un ou deux chiffres, une division en potence, puis vérifier par l'opération inverse et l'ordre de grandeur. Une bibliothèque, un club de foot, une forêt après la tempête, des cagettes de pommes, une classe de neige, un apiculteur et les perles de Mia." },
Doutes : soustraction « casser une dizaine » vs compensation ; diviseurs à 2 chiffres (banque : 1 chiffre) ; « −0 » dans la potence ; orthographe traditionnelle des nombres ; Jupiter 778 Mkm.

## Lot G aires (feuilles) : 0 fausses ×4, 14 imprimés chacune, tsc propre
"maths/6e/aire-longueur": { titre: "Les longueurs : 20 exercices corrigés", resume: "Mesurer à la règle, connaître les unités du mm au km, convertir avec le tableau, comparer, calculer un reste ou un total. Une chenille, un saut en longueur, une pelote de laine, un trajet à vélo, une course d'orientation, un bambou, une guirlande." },
"maths/6e/aire-perimetre": { titre: "Les périmètres : 20 exercices corrigés", resume: "Suivre le tour d'une figure, calculer le périmètre d'un carré, d'un rectangle, d'un triangle ou d'une figure en L, retrouver un côté, coller des morceaux. Une cabane à oiseaux, un poulailler, un terrain de handball, un jardin partagé, une guirlande lumineuse, les tables de la fête." },
"maths/6e/aire-unite": { titre: "L'aire et ses unités : 20 exercices corrigés", resume: "Dire ce qu'est une aire, compter des carreaux et des demi-carreaux, choisir entre mm², cm², dm², m² et km², passer des m² aux dm² et des dm² aux cm² avec le carré découpé en cent. Un studio, une nappe, un carreau de faïence, un bac potager, une mosaïque, une salle de jeux." },
"maths/6e/aire-surface": { titre: "Les aires : 20 exercices corrigés", resume: "Calculer l'aire d'un rectangle et d'un carré, retrouver un côté, comparer des aires, découper une figure en L, en U ou en croix, enlever un trou. Un tapis, une terrasse, un mur à peindre, un panneau d'affichage, une chambre à parqueter, un jardin, une salle de bain, un enclos." },
Doutes : demi-carreaux (découpage/recollement, absent de la banque) ; côté d'un carré depuis son aire (100 m² → 10 m) ; escargot 4 mm/s en défi.

## Lot B décimaux (feuilles) : 0 fausses ×3, tsc propre
"maths/6e/demi-droite-graduee": { titre: "La demi-droite graduée : 20 exercices corrigés", resume: "Lire l'abscisse d'un point, placer un nombre décimal, placer une fraction (plus grande que 1 comprise), graduer un segment de longueur donnée. Un sentier, une frise du XXe siècle, une balance de cuisine, une clôture, un thermomètre, un ruban, un saut en longueur." },
"maths/6e/decimal-nombre": { titre: "Les nombres décimaux : 20 exercices corrigés", resume: "Lire et écrire un décimal, le rang d'un chiffre, comparer et ranger, arrondir à l'unité, au dixième, au centième, encadrer et intercaler. Un lancer de poids, le prix du gazole, un compteur de vélo, une course de 100 m, des fruits sur la balance, la pluie de la semaine." },
"maths/6e/decimal-calcul": { titre: "Calculer avec les nombres décimaux : 20 exercices corrigés", resume: "Additionner et soustraire virgule sous virgule, multiplier, multiplier par 0,1, 0,01, 0,001, diviser par un entier en continuant après la virgule, contrôler avec un ordre de grandeur. Des courses au marché, une recette de crêpes, un relais, une sortie au parc, des tomates du potager, l'eau de la douche." },
Doutes : décimal × décimal (2,5 × 1,4) ; 10 ÷ 3 arrondi en ★★ ; 450 ÷ 24 (diviseur à 2 chiffres) ; « cases » pour intervalles ; dates 1914/1945/1969, fièvre 38 °C.

## Réécriture des fiches de juin (30/09)
- Lot fractions/%/proportionnalité : 3/3 ✓ au débordement (pourcentages +290 → 0), Ti Margo 6 clés, tsc propre.
  Doutes : fraction d'une quantité retirée de fraction-nombre (c'est fraction_calcul) ; 2/3 ≈ 0,67 dans la banque ; garder « N × p ÷ 100 » ? ; tailles 140/170 cm modèles ; historique (Égyptiens, %, marchands italiens) à vérifier.
- ⚠️ scripts/mesurer-mode-classe.mjs (autre session) : prend le badge « Propriété k / k » pour le compteur et s'arrête → ne lit que quelques diapos. À signaler, pas à nous.
- Lot nombres (entiers, décimaux, calcul mental, calcul posé) : 4/4 ✓ (calcul mental +107 → 0), Ti Margo 6 clés, 6/6 micros.
  Doutes : décimaux ne parlent plus de calcul (c'est decimal_calcul) et couvrent enfin arrondir/encadrer ; 4,23 × 10 et 645 ÷ 10 dans le calcul mental (banque) ; « emprunt » plus nommé dans la soustraction posée (reste sur le dessin).
  ⚠️ tsc : 14 erreurs dans lib/tutor-v4/questionBank/4e/maths/puissances.bank.ts (autre session).
- Lot grandeurs (longueurs, périmètres, aires, volumes) : 4/4 ✓ (périmètres +224, aires +174, volumes +190 → 0), Ti Margo 6 clés.
  Doutes : conversions d'aire retirées de aire-surface (c'est aire-unite) ; tableau de conversion des longueurs (7 colonnes) remplacé par barre + droites — y tient-il ? ; L × l × h gardée (défis de la banque), pas de litres.
  À vérifier à l'œil : calcul_pose (7 + 3 + 7 + 3 ; 7 × 7) sur la page réelle.
- Lot données/probas/algo/cercle : 4/4 ✓ (algo +499, données +340, cercle +416, probas +273 → 0), Ti Margo 6 clés, tsc propre.
  Doutes : « lire un tableau » est à stat_enquete ; probabilité en fraction en 6e ? ; ⭐ cercle : juin posait la corde de 8 m sur un DIAMÈTRE (16 m) — corrigé sur un rayon ; Archimède « entre 3,140 et 3,143 » ; algo : le carré en 8 blocs retiré (débordait).
- Lot géométrie (angles, triangles, quadrilatères, symétrie) : 4/4 ✓ (triangles +401, symétrie +341, quadrilatères +322 → 0), Ti Margo 6 clés, tsc propre.
  Doutes : 180° et triangle possible retirés de triangle-figure (fiche triangle-propriete) ; idem parallèles/diagonales → quadrilatere-propriete ; « obtusangle », « triangle aigu » (banque) ; « panneau attention = losange » retiré (inexact).
  ⭐ Corrigé : losange et carré de juin codés 1-3-5-3 traits (= côtés différents) → un trait par côté.
  Canvas partagés à réparer un jour : triangle (showAngles sans mesure = aucun arc), quadrilatere (noms des diagonales au même milieu, codage des côtés égaux faux).
