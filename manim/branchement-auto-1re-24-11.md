# Branchement des automatismes de 1re (et STMG) sur des vidéos déjà faites — 24/11

Frédéric (24/11) : « oui, branche-les ». Aucun rendu, aucune vidéo nouvelle.
On relie au coach de 1re (`classe = premiere`) et de STMG (même id de micro) des vidéos
déjà faites pour le collège, la 2de ou la série « bases ».
Table : `notion_ressources` (bouton Vidéo du coach). Script : `.tmp-ress-branchement-auto-1re.mjs`.
Les 62 vidéos répondent en 200 sur R2 (contrôle dans le script, avant insertion).

Avant : 1re 26 / 66 micros avec vidéo ; STMG 20 / 55.

## Correspondances branchées

| Micro de 1re | Vidéo(s) | Classe d'origine | Raison |
|---|---|---|---|
| `auto_num_fractions_comparer` | `4e-frac-comparer` + short | 4e | « 5/8 ou 7/12 » : comparer des fractions simples, le geste exact. |
| `auto_num_fractions_operations` | `bases-fractions`, shorts `bases-fractions-ordre`, `bases-fractions-additionner` | bases (lycée) | Leçon complète des opérations ; le short « ordre » est le piège du brevet (priorité). |
| `auto_num_ecritures` | `4e-frac-decimal` + short, short `bases-fractions-ecritures` | 4e, bases | Fraction → décimal → pourcentage. STMG (« scientifique ») : + `seconde-puissance-notation-scientifique`. |
| `auto_num_calcul_mental` | `bases-pourcentages-calcul-mental` + short | bases | Pourcentage de tête, méthode des 10 %. |
| `auto_num_vraisemblance` | `4e-prop-grandeur-coherence` + short | 4e | Vérifier un résultat par son unité, sans calculer (piscine). 1re seulement (pas de micro en STMG). |
| `auto_num_conversions` | `4e-prop-grandeur-convertir` + short | 4e | Conversions d'aires et de vitesses (Usain Bolt). |
| `auto_alg_developper` | `4e-litteral-developper`, `4e-distrib-reduire` + short | 4e | « Développer et réduire » : le libellé même. |
| `auto_alg_identites` | `4e-identites-developper` + short, short `ir-double-produit` | 4e, 2de | Développer (a + b)², le double produit oublié. |
| `auto_alg_factoriser_commun` | `4e-litteral-factoriser`, `4e-facto-maximum` + short | 4e | 2x² + 6x = 2x(x + 3) : le cas ax² + bx du libellé. |
| `auto_alg_factoriser_identite` | `3e-identites-factoriser` + short, short `ir-difference` | 3e, 2de | x² − 9 = (x − 3)(x + 3). |
| `auto_alg_equation_premier_degre` | `4e-equation-resoudre-reduction` + short | 4e | « Quand x apparaît deux fois » : ax + b = cx + d. |
| `auto_alg_equation_carre` | `3e-equation-resolution` | 3e | Paysage « le produit nul et x² = a ». |
| `auto_alg_inequation` | `equations-inequations`, short `eq-retournement` | 2de | Inéquation du 1er degré, le signe qui se retourne. |
| `auto_alg_produit_nul` | `premiere-degre2-forme-factorisee`, `3e-equation-resolution` | 1re/STMG, 3e | La paysage 1re n'était branchée qu'à la notion de spé `quad_racines_signe`. |
| `auto_alg_signe_premier_degre` | `seconde-signes-expression` | 2de | Signe de ax + b, puis tableau de signes. |
| `auto_alg_signe_factorisee` | `premiere-degre2-forme-factorisee`, `seconde-signes-expression` | 1re/STMG, 2de | Signe d'un produit de facteurs du 1er degré. |
| STMG `auto_alg_tableau_signes` | `seconde-signes-expression` + short dauphin | 2de | Dresser un tableau de signes. |
| `auto_alg_application_formule` | `3e-expression-substituer` + short, short `4e-expression-substituer-short` | 3e, 4e | Distance de freinage (formule de physique) ; piège (−3)². |
| `auto_fct_image_antecedent` | `fonction-vocabulaire`, `3e-affine-graphique`, short `fv-lecture` | 2de, 3e | Lire image et antécédent sur une courbe / une droite. |
| `auto_fct_reperer_graphique` | 1re : `premiere-commun-stats-lire-graphique` ; STMG : `stmg-stats-lire-graphique` | 1re, STMG | « Regarde l'axe ! » : origine, graduations, échelle. Paysage seulement. |
| `auto_fct_estimer_seuil` | short `3e-affine-graphique-short` | 3e | « Quand ton forfait sera vide » : lire un seuil sur la droite. |
| `auto_fct_resoudre_graphiquement` | short `fv-lecture` | 2de | Sa micro de 2de est `fonction_resolution_graphique`. |
| `auto_fct_signe_graphique` | short `seconde-signes-expression-short-dauphin` | 2de | Sous l'eau −, dans l'air + : le signe lu sur la courbe. |
| `auto_fct_lineaire_affine` | `3e-affine-reconnaitre` + short | 3e | Reconnaître une fonction affine. 1re seulement (pas de micro en STMG). |
| `auto_fct_tracer_droite` | `3e-affine-tracer` + short | 3e | Deux points suffisent pour tracer. |
| `auto_fct_lire_equation_reduite` | `3e-affine-ordonnee-origine`, `3e-affine-coeff-directeur` | 3e | b lu sur l'axe vertical ; a lu en carreaux. |
| `auto_fct_coefficient_directeur` | `3e-affine-coeff-directeur`, `3e-affine-expression` + short | 3e | « Sans l'expression, deux points suffisent » ; a = 90 ÷ 3. |
| STMG `auto_fct_equation_deux_points` | `3e-affine-expression` + short | 3e | L'équation réduite à partir de deux points : le geste exact. |
| `auto_stat_moyenne` | `seconde-stats-moyenne` + short, `seconde-stats-moyenne-ponderee` + short | 2de | Moyenne, puis moyenne pondérée (données regroupées). 1re seulement. |
| `auto_stat_mediane` | `seconde-stats-mediane-quartiles` + short | 2de | Médiane (le short : la médiane ne bouge pas). |
| `auto_stat_quartiles` | `seconde-stats-mediane-quartiles` | 2de | Q1 au rang 8, pas 7,5. |
| `auto_stat_interpreter_indicateurs` | `seconde-stats-interpreter` + short | 2de | « Salaire moyen : la plupart gagnent ça ? Faux ». |
| `auto_stat_boites` | `stmg-stats-boite` + short | STMG | Boîte à moustaches, même programme d'automatismes. |

## Laissées dehors (pas de vidéo exacte, ou doute)

| Micro de 1re | Pourquoi |
|---|---|
| `auto_num_comparer_difference` | Aucune vidéo ne compare par la différence a − b. |
| `auto_num_comparer_quotient` | Idem pour le quotient. |
| `auto_num_ordre_grandeur` | `4e-prop-grandeur-coherence` vérifie par l'unité, pas par l'ordre de grandeur. |
| `auto_alg_equation_quotient` | Aucune vidéo sur a/x = b. |
| `auto_alg_litteral` | `5e-litteral-calcul` trop « collège » pour la 1re. |
| `auto_fct_appartenance_courbe` | `fv-image` calcule une image, pas l'appartenance d'un point. |
| `auto_fct_variations_graphique` | Aucune vidéo de tableau de variations lu sur une courbe (la paysage 2de « Analyse graphique » n'est que sur YouTube). |
| `auto_fct_lire_croissance` | `bases-fonctions-combien` (doublement) : doute, non branchée. |
| `auto_stat_lire_histogramme` | Aucune vidéo d'histogramme. |

Doutes notés, non branchés : `fv-dissymetrie` (antécédent de 9 par x² : ±3) pour `auto_alg_equation_carre` ;
`eq-balance` (2x + 3 = 11) pour `auto_alg_equation_premier_degre` ; short `3e-affine-coeff-directeur-short`.

À signaler : `auto_alg_isoler_variable` (1re et STMG) pointe vers YouTube (`youtu.be/j-vrDltO9vA`),
alors que la même vidéo existe sur R2 (`seconde-isoler-une-lettre`). Non changé ici.
