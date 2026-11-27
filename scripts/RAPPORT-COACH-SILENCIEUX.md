# Ce qui tombe en silence dans le coach

Mesure du 2026-11-27 02:05 UTC · base `https://www.eleveai.fr`
Vérificateur : `npx tsx scripts/verifier-coach-silencieux.ts` (lecture seule).
Registre R2 lu : **`origin/main` (ce que Vercel sert)** — 2191 clés.

## 0. Ce qu'on mesure

| grandeur | valeur |
| --- | ---: |
| lignes de `notion_ressources` | 2095 |
| dont `type = "video"` | 2095 |
| URL distinctes | 1786 |
| identifiants de vidéo distincts | 1783 |
| lignes sans `micro_id` (vidéo de notion) | 74 |
| clés du registre `videos-r2.json` | 2191 |

## 1. Les boutons morts

| mesure | chiffre |
| --- | ---: |
| identifiants appelés | 1783 |
| `/api/video-lecteur/<id>` non-200 | **0** |
| `/video/<id>` non-200 (3xx compris) | **0** |
| dont redirigés vers YouTube | **0** |
| appels en échec réseau | 0 |
| lignes dont l'URL ne contient pas `/video/` | 0 |

**Zéro bouton mort.** Chaque identifiant servi par le coach répond 200 sur les deux adresses.

## 2. Les hôtes

| hôte servi | lignes |
| --- | ---: |
| `www.eleveai.fr` | 2095 |

Lignes servant un hôte YouTube : **0**.
Clés nommées `youtube-*` (le piège : c'est une clé R2, pas un lien YouTube) : 35 lignes, toutes sur `www.eleveai.fr`.

## 3. Les micros fantômes

| mesure | lignes |
| --- | ---: |
| couples (matière, classe) présents en base | 14 |
| `notion_id` absent du catalogue | **1** |
| `micro_id` absent de sa notion | **2** |

**Les micros masquées sont comptées à part, et ce n'est pas un reste à traiter.** Décision du 27/11/2026 : on GARDE ces lignes. Une micro masquée peut être démasquée, et la ligne retirée serait à réécrire sans que personne se souvienne qu'elle a existé. Elles ne s'affichent pas aujourd'hui — c'est la conséquence voulue du masquage, pas une faute.

| classement à part (choix fait) | lignes |
| --- | ---: |
| `micro_id` présent mais MASQUÉ (gardé exprès) | 22 |

### Notions fantômes (1)

| classe | notion_id | micro_id | titre |
| --- | --- | --- | --- |
| premiere-spe | `exponentielle_etude` | `—` | Dériver et étudier l'exponentielle (3/3) : dérivée et tablea |

### Micros fantômes (2)

| classe | notion_id | micro_id | titre |
| --- | --- | --- | --- |
| cm1 | `masse` | `masse_mesurer` | Combien pèse ma pastèque ? #maths #cm1 |
| cm1 | `masse` | `masse_mesurer` | Où pointe l'aiguille de la balance ? — Lire une balance — ép |

### Lignes gardées sur des micros masquées, par classe

| classe | lignes |
| --- | ---: |
| stmg | 8 |
| seconde | 6 |
| cm2 | 4 |
| cm1 | 4 |

## 4. Un short servi là où l'élève attend un cours

| forme de détection | désaccords avec le registre |
| --- | ---: |
| suffixe `-short` de la clé | **113** |
| paramètre `?format=short` de l'URL | **122** |
| identifiants absents du registre (indécidable) | 0 |

⚠️ **Le format affiché ne vient d'aucune des deux formes d'URL.** `app/video/[id]/page.tsx` et `components/LienVideoModal.tsx` lisent le champ `short` de `videos-r2.json` ; `?format=short` n'est lu par aucune page. Il ne sert qu'à `estShortVideo()` (`lib/videos/lienVideo.ts`), qui décide quelle vidéo le bouton ▶ du coach propose. Un short dont l'URL n'a pas `?format=short` est donc **pris pour un cours** par ce choix : 122 ligne(s).

| couverture d'une micro servie | micros |
| --- | ---: |
| micros servies au total | 1038 |
| un paysage (avec ou sans short) | 974 |
| les deux | 943 |
| **seulement un short** (= un trou, pas une couverture) | **64** |
| seulement des identifiants hors registre | 0 |

### Micros servies par un short seul, par classe

| classe | micros |
| --- | ---: |
| seconde | 30 |
| 5e | 11 |
| terminale-spe | 5 |
| 3e | 4 |
| cm1 | 3 |
| premiere | 3 |
| stmg | 3 |
| 6e | 2 |
| premiere-spe | 2 |
| cp | 1 |

<details><summary>La liste complète (64)</summary>

- `3e/entier_arithmetique/entier_decomposer_facteur`
- `3e/entier_arithmetique/entier_nombre_premier`
- `3e/entier_arithmetique/entier_pgcd_ppcm`
- `3e/trigo_trigonometrie/trigo_tangente`
- `5e/litteral_calcul/litteral_defi`
- `5e/relatif_nombre/relatif_comparer`
- `5e/relatif_nombre/relatif_defi`
- `5e/relatif_nombre/relatif_lire`
- `5e/relatif_nombre/relatif_oppose`
- `5e/relatif_nombre/relatif_placer`
- `5e/relatif_nombre/relatif_signe`
- `5e/relatif_nombre/relatif_valeur_absolue`
- `5e/relatif_operation/relatif_addition`
- `5e/relatif_operation/relatif_operation_defi`
- `5e/relatif_operation/relatif_probleme`
- `6e/duree_temps/duree_convertir`
- `6e/duree_temps/duree_defi`
- `cm1/division/division_lien_multiplication`
- `cm1/division/division_sens`
- `cm1/tables_multiplication/tables_trous`
- `cp/calcul_mental/cp_calcul_complements_10`
- `premiere-spe/trigonometrie/trig_cos_sin`
- `premiere-spe/trigonometrie/trig_valeurs`
- `premiere/auto_lecture_graphique/auto_fct_estimer_seuil`
- `premiere/auto_resolution_graphique/auto_fct_resoudre_graphiquement`
- `premiere/auto_resolution_graphique/auto_fct_signe_graphique`
- `seconde/algorithmique_python_2de/python_boucle`
- `seconde/algorithmique_python_2de/python_simulation`
- `seconde/algorithmique_python_2de/python_variable_affectation`
- `seconde/analyse_graphique_2de/graph_image`
- `seconde/arithmetique_entiers/arith_nombre_premier`
- `seconde/developpement_factorisation_2de/devfac_choisir_forme`
- `seconde/equations_inequations_1er_degre/equation_probleme`
- `seconde/equations_inequations_1er_degre/equation_resoudre`
- `seconde/equations_inequations_1er_degre/inequation_resoudre`
- `seconde/fonction_vocabulaire_2de/fonction_antecedent`
- `seconde/fonction_vocabulaire_2de/fonction_image_formule`
- `seconde/fonction_vocabulaire_2de/fonction_resolution_graphique`
- `seconde/fonctions_affines_2de/affine_calculer_image`
- `seconde/fonctions_affines_2de/affine_determiner_expression`
- `seconde/fonctions_affines_2de/affine_forme`
- `seconde/fonctions_reference_2de/reference_carre`
- `seconde/fonctions_reference_2de/reference_cube`
- `seconde/fonctions_reference_2de/reference_inverse`
- `seconde/fonctions_reference_2de/reference_valeur_absolue`
- `seconde/geometrie_problemes_plan/geo_optimisation`
- `seconde/geometrie_problemes_plan/geo_projete_orthogonal`
- `seconde/geometrie_problemes_plan/geo_trigonometrie`
- `seconde/identites_remarquables_2de/ir_calcul_mental`
- `seconde/identites_remarquables_2de/ir_carre_somme`
- `seconde/identites_remarquables_2de/ir_difference_carres`
- `seconde/racine_carree_2de/racine_domaine`
- `seconde/racine_carree_2de/racine_simplification`
- `seconde/racine_carree_2de/racine_somme`
- `seconde/repere_coordonnees/repere_configuration`
- `seconde/signes_expression_2de/signes_resoudre_inequation`
- `stmg/auto_lecture_graphique/auto_fct_estimer_seuil`
- `stmg/auto_resolution_graphique/auto_fct_resoudre_graphiquement`
- `stmg/auto_resolution_graphique/auto_fct_signe_graphique`
- `terminale-spe/continuite_tvi/continuite_reconnaitre`
- `terminale-spe/continuite_tvi/tvi_appliquer`
- `terminale-spe/continuite_tvi/tvi_defi`
- `terminale-spe/continuite_tvi/tvi_rediger`
- `terminale-spe/continuite_tvi/tvi_unicite`

</details>

## 5. Les deux registres d'accord

| mesure | chiffre |
| --- | ---: |
| clés du registre | 2191 |
| clés du registre portant un lien `coach` | 1805 |
| dont AUCUNE ligne de `notion_ressources` ne les sert | **57** |
| identifiants servis par le coach | 1783 |
| dont ABSENTS du registre R2 | **0** |

### Clés R2 avec lien coach mais sans ligne de coach (57)

| classe visée par le lien coach | clés |
| --- | ---: |
| seconde | 23 |
| 6e | 10 |
| premiere-spe | 10 |
| 4e | 8 |
| 5e | 5 |
| 3e | 1 |

<details><summary>La liste complète (57)</summary>

- `3e-affine-defi-short-dessin-anime` (short) → `/coach/serie?classe=3e&matiere=maths&notion=affine_fonction&microId=affine_defi&display=simple`
- `4e-prop-grandeur-defi-short` (short) → `/coach/serie?classe=4e&matiere=maths&notion=grandeur_composee&microId=grandeur_defi&display=simple`
- `4e-prop-pourcentages-short-diagonale` (short) → `/coach/serie?classe=4e&matiere=maths&notion=prop_pourcentages&microId=prop_pourcentage_defi&display=simple`
- `4e-pythagore-defi-cube` → `/coach/serie?classe=4e&matiere=maths&notion=pythagore_theoreme&microId=pythagore_defi&display=simple`
- `4e-pythagore-defi-cube-short` (short) → `/coach/serie?classe=4e&matiere=maths&notion=pythagore_theoreme&microId=pythagore_defi&display=simple`
- `4e-pythagore-reciproque` → `/coach/serie?classe=4e&matiere=maths&notion=pythagore_theoreme&microId=pythagore_reciproque_conclure&display=simple`
- `4e-pythagore-reciproque-short` (short) → `/coach/serie?classe=4e&matiere=maths&notion=pythagore_theoreme&microId=pythagore_reciproque_conclure&display=simple`
- `4e-pythagore-rediger` → `/coach/serie?classe=4e&matiere=maths&notion=pythagore_theoreme&microId=pythagore_rediger&display=simple`
- `4e-pythagore-rediger-short` (short) → `/coach/serie?classe=4e&matiere=maths&notion=pythagore_theoreme&microId=pythagore_rediger&display=simple`
- `5e-frac-additionner-short` (short) → `/coach/serie?classe=5e&matiere=maths&notion=fraction_calcul&microId=fraction_additionner&display=simple`
- `5e-frac-multiplier-short` (short) → `/coach/serie?classe=5e&matiere=maths&notion=fraction_calcul&microId=fraction_multiplier&display=simple`
- `5e-frac-rationnel-short` (short) → `/coach/serie?classe=5e&matiere=maths&notion=fraction_nombre&microId=fraction_rationnel&display=simple`
- `5e-frac-simplifier-short` (short) → `/coach/serie?classe=5e&matiere=maths&notion=fraction_nombre&microId=fraction_simplifier&display=simple`
- `6e-decimal-calcul-short-01` (short) → `/coach/serie?classe=6e&matiere=maths&notion=decimal_calcul&microId=decimal_multiplier_par_01&display=simple`
- `6e-decimal-calcul-short-addition` (short) → `/coach/serie?classe=6e&matiere=maths&notion=decimal_calcul&microId=decimal_additionner&display=simple`
- `6e-decimal-calcul-short-defi` (short) → `/coach/serie?classe=6e&matiere=maths&notion=decimal_calcul&microId=decimal_calcul_defi&display=simple`
- `6e-decimal-calcul-short-dixieme` (short) → `/coach/serie?classe=6e&matiere=maths&notion=decimal_calcul&microId=decimal_multiplier&display=simple`
- `6e-decimal-calcul-short-partage` (short) → `/coach/serie?classe=6e&matiere=maths&notion=decimal_calcul&microId=decimal_diviser_par_entier&display=simple`
- `6e-decimal-nombre-short-origine` (short) → `/coach/serie?classe=6e&matiere=maths&notion=decimal_nombre&microId=decimal_lire_ecrire&display=simple`
- `6e-decimal-nombre-short-zero` (short) → `/coach/serie?classe=6e&matiere=maths&notion=decimal_nombre&microId=decimal_comparer&display=simple`
- `974-antecedent` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=fonctions_affines_2de&microId=affine_calculer_image&display=simple`
- `974-pourquoi` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=fonctions_affines_2de&microId=affine_determiner_expression&display=simple`
- `974-temperature-altitude` → `/coach/serie?classe=seconde&matiere=maths&notion=fonctions_affines_2de&display=simple`
- `arithmetique` → `/coach/serie?classe=seconde&matiere=maths&notion=arithmetique_entiers&display=simple`
- `developpement-factorisation` → `/coach/serie?classe=seconde&matiere=maths&notion=developpement_factorisation_2de&display=simple`
- `expressions-litterales` → `/coach/serie?classe=seconde&matiere=maths&notion=expressions_litterales_2de&display=simple`
- `fr-carte` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=fonctions_reference_2de&display=simple`
- `identites-remarquables` → `/coach/serie?classe=seconde&matiere=maths&notion=identites_remarquables_2de&display=simple`
- `maths-premiere-exponentielle-calculer` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=exponentielle&display=simple`
- `maths-premiere-exponentielle-etude` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=exponentielle&display=simple`
- `maths-premiere-exponentielle-resoudre` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=exponentielle&display=simple`
- `maths-premiere-second-degre-equation` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=second_degre&display=simple`
- `maths-premiere-second-degre-signe` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=second_degre&display=simple`
- `maths-premiere-suites-arith-geo` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=suites&display=simple`
- `maths-premiere-trigonometrie-cercle` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=trigonometrie&display=simple`
- `maths-premiere-trigonometrie-rouge-vert` → `/coach/serie?classe=premiere-spe&matiere=maths&notion=trigonometrie&display=simple`
- `maths-premiere-trigonometrie-short-valeurs` (short) → `/coach/serie?classe=premiere-spe&matiere=maths&notion=trigonometrie&microId=trig_valeurs&display=simple`
- `maths-premiere-trigonometrie-short-vent` (short) → `/coach/serie?classe=premiere-spe&matiere=maths&notion=trigonometrie&microId=trig_cos_sin&display=simple`
- `puissances` → `/coach/serie?classe=seconde&matiere=maths&notion=puissances_2de&display=simple`
- `reels-0999` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=reels_intervalles&display=simple`
- `reels-intervalles` → `/coach/serie?classe=seconde&matiere=maths&notion=reels_intervalles&display=simple`
- `reels-moinsx` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=reels_intervalles&display=simple`
- `repere-coordonnees` → `/coach/serie?classe=seconde&matiere=maths&notion=repere_coordonnees&display=simple`
- `youtube-16Mm-fpOCkc` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=identites_remarquables_2de&microId=ir_difference_carres&display=simple`
- `youtube-7zT0TslnJ1U` (short) → `/coach/serie?classe=6e&matiere=maths&notion=distance_segment&microId=distance_definition&display=simple`
- `youtube-8DFgt3TCoH8` → `/coach/serie?classe=6e&matiere=maths&notion=entier_nombre&display=simple`
- `youtube-9ThtdR_7raE` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=puissances_2de&microId=puiss_puissance_puissance&display=simple`
- `youtube-b-IFAbW81EE` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=racine_carree_2de&microId=racine_simplification&display=simple`
- `youtube-BsT5A1Brwxg` (short) → `/coach/serie?classe=5e&matiere=maths&notion=fraction_calcul&microId=fraction_additionner&display=simple`
- `youtube-h8veBP9mtMQ` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=racine_carree_2de&microId=racine_domaine&display=simple`
- `youtube-hiFUDrIMZrU` → `/coach/serie?classe=6e&matiere=maths&notion=decimal_nombre&display=simple`
- `youtube-ITZuhk7hvMY` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=geometrie_problemes_plan&microId=geo_optimisation&display=simple`
- `youtube-mTJVzuYWoJM` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=racine_carree_2de&microId=racine_somme&display=simple`
- `youtube-pPQUPDx3aeA` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=geometrie_problemes_plan&microId=geo_projete_orthogonal&display=simple`
- `youtube-TYBgLzC2KN8` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=identites_remarquables_2de&microId=ir_calcul_mental&display=simple`
- `youtube-uVs9h6561zU` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=identites_remarquables_2de&microId=ir_carre_somme&display=simple`
- `youtube-x_fuQDxmRew` (short) → `/coach/serie?classe=seconde&matiere=maths&notion=fonctions_affines_2de&microId=affine_forme&display=simple`

</details>

## 6. Les replis muets

**Mesuré** : 22 classes × 6 matières = 132 combinaisons qu'une adresse `/coach/serie?classe=…&matiere=…` peut produire (les valeurs inconnues sont déjà ramenées à `6e` / `maths`).

| combinaisons | nombre |
| --- | ---: |
| servies par leur propre paquet | 44 |
| **servies EN SILENCE par le paquet d'une autre classe** | **88** |

| adresse | reçoit le catalogue de | ensuite |
| --- | --- | --- |
| `?classe=a1&matiere=maths` | **6e/maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=a2&matiere=maths` | **6e/maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=b1&matiere=maths` | **6e/maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=b2&matiere=maths` | **6e/maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=c1&matiere=maths` | **6e/maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-college&matiere=maths` | **6e/maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-lycee&matiere=maths` | **6e/maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere-spe&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=terminale-spe&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=stmg&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=adulte&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=a1&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=a2&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=b1&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=b2&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=c1&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-college&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-lycee&matiere=francais` | **ce1/francais** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cp&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce1&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce2&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm1&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm2&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=6e&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=5e&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=4e&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=3e&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=seconde&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere-spe&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=terminale-spe&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=stmg&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=adulte&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=c1&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-college&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-lycee&matiere=english-maths` | **a1/english-maths** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cp&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce1&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce2&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm1&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm2&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=6e&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=5e&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=4e&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=3e&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=seconde&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere-spe&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=terminale-spe&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=stmg&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=adulte&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=c1&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-college&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-lycee&matiere=economie` | **a1/economie** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cp&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce1&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce2&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm1&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm2&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=6e&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=5e&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=4e&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=3e&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=seconde&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere-spe&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=terminale-spe&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=stmg&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=adulte&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=c1&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-college&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=pix-lycee&matiere=espagnol` | **a1/espagnol** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cp&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce1&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=ce2&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm1&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=cm2&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=6e&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=5e&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=4e&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=3e&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=seconde&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=premiere-spe&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=terminale-spe&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=stmg&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |
| `?classe=adulte&matiere=ia` | **a1/ia** | puis l'API échoue (« Chargement du tutor… » sans fin) |

### Relevé statique des `default:` et `catch` muets (hors banques de questions)

| forme | occurrences |
| --- | ---: |
| default: sert un contenu | 6 |
| catch → valeur de repli | 3 |

| fichier:ligne | forme | code |
| --- | --- | --- |
| `lib/tutor-v4/catalog.ts:123` | default: sert un contenu | `default:    return buildKnowledgeCe1Francais(); // fallback` |
| `lib/tutor-v4/catalog.ts:134` | default: sert un contenu | `default:   return buildKnowledgeA1Espagnol();` |
| `lib/tutor-v4/catalog.ts:149` | default: sert un contenu | `default:   return buildKnowledgeA1Ia();` |
| `lib/tutor-v4/catalog.ts:167` | default: sert un contenu | `default:   return buildKnowledgeA1Economie();` |
| `lib/tutor-v4/catalog.ts:178` | default: sert un contenu | `default:   return buildKnowledgeA1English();` |
| `app/coach/serie/AQuoiCaSert.tsx:29` | catch → valeur de repli | `chargerPassions(eleve).then(setPassions).catch(() => null);` |
| `app/coach/serie/BoutonVideoCompetence.tsx:30` | catch → valeur de repli | `.catch(() => ({ notion: {}, micro: {} }))` |
| `app/coach/serie/TutorV4Client.tsx:3001` | catch → valeur de repli | `const data = (await res.json().catch(() => ({}))) as {` |
| `app/coach-ia/[matiere]/page.tsx:314` | default: sert un contenu | `default:         return "text-slate-700";` |

_Mesure terminée en 190 s._
