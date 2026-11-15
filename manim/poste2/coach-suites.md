# Brancher au coach les 4 dernières vidéos de la série SUITES (épisodes 39 à 42)

Écrit par le **2e poste** le 15/11/2026, branche `poste2`. Le 1er poste ajoute les lignes `notion_ressources` de Supabase à partir de ce tableau : **c'est ÇA qui fait apparaître le bouton « Vidéo » du coach.**

⚠️ Attention aux deux sens du mot « classe » : la colonne **classe (coach)** est celle de `lib/tutor-v4/knowledge/maths/<classe>/microSkills.ts` et des lignes Supabase ; le **préfixe de fichier** des épisodes 41 et 42 est `terminale`, pas `terminale-spe` (c'est la convention du manifeste et de R2 depuis l'épisode 28).

## Les 8 vidéos (4 paysages + 4 shorts)

| Ép. | classe (coach) | notion_id | micro_id | id de la vidéo | Titre |
|---|---|---|---|---|---|
| 39 | `premiere` | `expo_fonction_lecture` | `expo_fct_prolonger_suite` | `premiere-suite-expo-prolonger` | Un os vieux de 8 595 ans : combien reste-t-il de carbone 14 ? — Prolonger une suite géométrique par la fonction exponentielle — épisode 39 · Maths 1re |
| 39 | `premiere` | `expo_fonction_lecture` | `expo_fct_prolonger_suite` | `premiere-suite-expo-prolonger-short` | Un zoom entre deux crans : quelle distance ? 🧪 — 1re #Shorts |
| 40 | `premiere-spe` | `exponentielle` | `exp_suite_geo` | `premiere-spe-suite-exp-geo` | 400 mg dans le sang : de combien le médicament baisse-t-il chaque heure ? — L'exponentielle cache une suite géométrique — épisode 40 · Maths 1re spé |
| 40 | `premiere-spe` | `exponentielle` | `exp_suite_geo` | `premiere-spe-suite-exp-geo-short` | Le son d'une guitare : il perd combien par seconde ? 🧪 — 1re spé #Shorts |
| 41 | `terminale-spe` | `primitive_integrale` | `integrale_suite` | `terminale-suite-integrale` | Le béton d'une rampe de skatepark : quelle aire sous y = xⁿ ? — Une suite définie par une intégrale — épisode 41 · Maths Tle spé |
| 41 | `terminale-spe` | `primitive_integrale` | `integrale_suite` | `terminale-suite-integrale-short` | Quatre aires qui rétrécissent : où vont-elles ? 🧪 — Tle spé #Shorts |
| 42 | `terminale-spe` | `algorithmique_python` | `python_suite` | `terminale-suite-python` | L'erreur d'un modèle d'IA : trois tours de boucle en Python — Programmer les termes d'une suite — épisode 42 · Maths Tle spé |
| 42 | `terminale-spe` | `algorithmique_python` | `python_suite` | `terminale-suite-python-short` | Une info qui circule : combien de partages après 3 tours ? 🧪 — Tle spé #Shorts |

Libellés des micros, vérifiés dans `microSkills.ts` (à reprendre tels quels si une colonne de libellé est demandée) :
- `expo_fct_prolonger_suite` : « Relier une suite géométrique et la fonction exponentielle qui la prolonge » (`lib/tutor-v4/knowledge/maths/premiere/microSkills.ts:344`)
- `exp_suite_geo` : « Reconnaître que la suite (eⁿᵃ) est géométrique » (`premiere-spe/microSkills.ts:440`)
- `integrale_suite` : « Étudier une suite d'intégrales (variations, limite, récurrence) » (`terminale-spe/microSkills.ts:411`)
- `python_suite` : « Programmer les termes d'une suite » (`terminale-spe/microSkills.ts:712`)

## ⚠️ Deux micros de la liste de départ n'ont PAS de vidéo neuve, et n'en ont pas besoin

La demande de départ parlait de 6 micros. Deux sont **déjà servis** par les entrées `aussi` du manifeste (découpage « vidéo COMMUNE » du 10/11, table de `manim/REPRISE-suites.md`) :

| Micro Tle spé | Déjà servi par |
|---|---|
| `suite_calculer_termes` | ép. 18 `premiere-spe-suite-termes` + son short |
| `suite_explicite_recurrence` | ép. 19 `premiere-spe-suite-recurrence` + son short |

Les 4 entrées `aussi` sont bien dans `manim/manifeste-youtube.json`, et `scripts/brancher-videos-coach.mjs:134` les déplie en lignes `notion_ressources` (`id` devient `<id>@<microId>`). **Rien à tourner de plus : il suffit que la passe de branchement tourne.** Seul inconvénient connu : un élève de terminale voit « Maths 1re spé » en haut de l'écran. Si Frédéric veut deux vidéos propres en Tle, c'est une demi-heure de voix + deux rendus, et c'est un chantier à part.
