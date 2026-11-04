# Session PUISSANCES — 4e → 2de → automatismes 1re/STMG

Écrit le 04/11/2026. Frédéric : « puissance ok mais de 4e à seconde, regarde jusqu'où va le programme »,
puis « il y a une micro en première automatisme, sans doute résumé seconde, 3e et 4e ».
Ses classes sont la 6e et la 4e : la série commence par la 4e.

## 1. Le programme (relevé au coach + BO)

| Classe | Notion (lib/tutor-v4/knowledge/maths/…) | Micros | Vidéos existantes |
|---|---|---|---|
| 4e | `puissance_ecriture` (8) | puissance_comprendre, puissance_calculer, puissance_exposant_negatif, puissance_dix, puissance_notation_scientifique, puissance_comparer, puissance_calcul, puissance_defi | aucune |
| 3e | `entier_puissance` (6) | entier_puissance_comprendre, entier_puissance_calculer, entier_puissance_dix, entier_puissance_ecriture_scientifique, entier_puissance_calcul, entier_puissance_defi | aucune |
| 2de | `puissances_2de` (6) | puiss_calcul, puiss_produit_quotient, puiss_puissance_puissance, puiss_exposant_negatif, puiss_expression_composee, puiss_notation_scientifique | paysage de notion `puissances` (EN LIGNE) + short `puissances-parenthese` sur puiss_puissance_puissance (EN LIGNE) → on les GARDE |
| 1re + STMG | `auto_fractions_puissances` | auto_num_puissances (« Effectuer des opérations sur les puissances ») | aucune |

- 4e : le BO dit « exposants entiers, positifs ou négatifs » → micro dédiée à l'exposant négatif (4e-A-calcul-2, 4e-A-calcul-3).
- 3e : consolide la 4e, rien de neuf.
- 2de : les RÈGLES générales sur aⁿ (produit, quotient, puissance de puissance) ; `puiss_expression_composee` vient du contrôle commun de mars 2025 : B = (7⁴ × 7⁻⁵) / (7³)⁴ sous la forme 7ⁿ.
- Après la 2de : plus de chapitre puissances, seulement l'automatisme `auto_num_puissances` (1re, STMG) = RÉSUMÉ 4e/3e/2de.
- Hors série (lot suivant possible) : 4e `ordre_grandeur` (5 micros : préfixes nano→giga, associer, estimer, vraisemblance, défi), sans vidéo.

## 2. Découpage validé dans le principe : 13 épisodes, une paysage + un short chacun (≈ 26 vidéos)

Épisodes COMMUNS quand les micros se recoupent (modèle : échelles communes 6e/4e de la proportionnalité) : une voix, une ceinture par classe.

1. Comprendre aⁿ : ce n'est pas a × n — 4e/3e, blanche
2. Calculer une puissance : piège (−2)⁴ contre −2⁴ — 4e/3e
3. Les puissances de 10 : compter les zéros — 4e/3e
4. Puissance ZÉRO puis exposant négatif — 4e/2de. ⛔ Décidé le 04/11 (Frédéric : « ça doit apparaître dans une vidéo, à toi de voir ») :
   paysage = la table qui DESCEND 10³ = 1 000 → 10² → 10¹ = 10 → 10⁰ = 1 → 10⁻¹ = 0,1 → 10⁻³ = 0,001 (÷ 10 à chaque ligne),
   refaite avec 2 (8, 4, 2, 1, puis 0,5) pour montrer que a⁰ = 1 quelle que soit la base ; puis a⁻ⁿ = 1/aⁿ.
   Question-pause : « 7⁰ = 0 ? ». Ceinture 2de : ajouter 5³ ÷ 5³ = 1 = 5⁰.
   SHORT = le piège de la puissance zéro : « 2026⁰ = ? » (réponse 1, surprise), question en commentaire : « Combien vaut 1 000 000⁰ ? »
   (⛔ jamais 0⁰ : pas défini au collège).
5. La notation scientifique — 4e/3e/2de
6. Comparer en notation scientifique : l'exposant décide d'abord, la mantisse ensuite — 4e
7. Calculer avec des puissances de 10 — 4e/3e
8. Produit et quotient de même base — 2de
9. Puissance d'une puissance — 2de (short existant gardé : seulement la paysage)
10. Enchaîner les règles : (7⁴ × 7⁻⁵)/(7³)⁴ — 2de, orange
11. Défi 4e
12. Défi 3e
13. « Les puissances en 5 règles » — RÉSUMÉ commun 1re + STMG (`auto_num_puissances`), jaune :
    aⁿ = n facteurs ; a⁰ = 1 ; aᵐ × aⁿ = aᵐ⁺ⁿ (quotient : soustraction) ; (aᵐ)ⁿ = aᵐˣⁿ ; a⁻ⁿ = 1/aⁿ ;
    notation scientifique = ordre de grandeur ; finir sur un enchaînement. Short : « 2³ × 2⁴ = 4⁷ ? »

## 3. Ordre de travail

1. ROBUSTESSE du coach d'abord : `scripts/mesurer-squelettes-coach.ts` sur puissance_ecriture (4e),
   entier_puissance (3e), puissances_2de (2de), auto_num_puissances (1re, STMG) ; seuil 30/micro,
   ≤ 4 répétitions sur 20 ; réparer le rouge.
   ⚠️ Déjà vu : en 1re, `auto_num_puissances` n'a qu'UN gabarit
   (lib/tutor-v4/questionBank/premiere/maths/automatismes-calcul.bank.ts:233, « (aᵐ)ⁿ × a^q »).
   STMG en a 3 (…/stmg/maths/automatismes-calcul.bank.ts:305, 361, 636). → enrichir la 1re
   (produit, quotient, exposant négatif, puissances de 10, notation scientifique).
   Coach collège : simple à ★1-★2, contexte à partir de ★3.
2. Voix : les écrire, coller la voix EN ENTIER à Frédéric et S'ARRÊTER (script validé à deux).
3. Rendus : agents neufs à brief court, 3 au plus ; sorties `manim/sorties/4e/maths/puissances/NN-<slug>/`
   (épisodes 2de/1re dans leur classe) ; aperçu port 3900 de la DERNIÈRE vidéo seulement, en pause.
4. Passe finale : miniatures, manifeste (ne jamais réécrire `manim/manifeste-youtube.json` en entier :
   modifs non commitées d'autres sessions), R2, coach (scripts/brancher-videos-coach.mjs), bilans.
5. Commit PAR CHEMIN ; pas de push avant le soir.

## 4. Règles vidéo à respecter (manim/REGLES.md)

Ceinture affichée ; questions-pauses (2-3 par paysage, 1 par short) ; on n'ouvre pas sur les maths
(situation concrète d'abord) ; contextes variés et métiers (astronomie, virus, informatique, monnaie,
mémoire d'un téléphone…), La Réunion ≈ 1 sur 25 seulement ; la voix = ce qui est écrit à l'écran ;
« Ce que tu as appris » titre en haut et centré ; phrase de fin « Entraîne-toi sur éleveai point f r.
Et abonne-toi » ; short qui finit par une question en commentaire ; agrandir puis rétrécir pour insister.
