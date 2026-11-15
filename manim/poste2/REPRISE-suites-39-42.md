# Reprise — FIN de la série SUITES du lycée (épisodes 39 à 42), 2e poste, 15/11/2026

Branche `poste2`, **rien poussé**. Commits par chemin uniquement. Une autre session du même poste produit la 5e : ses fichiers (`manim/scripts/5e/*`, `manim/REPRISE-5e-*`, `manim/poste2/apercu-pilote-5e-*`) ne sont pas touchés ici. Le verrou `%TEMP%\eleveai-rendu-hd.lock` est partagé avec elle : un seul rendu HD à la fois sur la machine.

## Ce qui a été produit

| Ép. | Classe | Micro | Scripts | Paysage | Short | État |
|---|---|---|---|---|---|---|
| 39 | 1re | `expo_fct_prolonger_suite` | `manim/scripts/premiere/suite_expo_prolonger[_short].py` | 5 min 15 | 1 min 30 | rendu, bords 0 ; **3 chevauchements renvoyés** à son agent (re-rendu du paysage) |
| 40 | 1re spé | `exp_suite_geo` | `manim/scripts/premiere/suite_exp_geo[_short].py` | 5 min 26 | 1 min 27 | rendu, bords 0 ; **1 chevauchement + 1 titre à vérifier** renvoyés (re-rendu du paysage) |
| 41 | Tle spé | `integrale_suite` | `manim/scripts/terminale/suite_integrale[_short].py` | 5 min 55 | 1 min 14 | ✅ accepté, planche relue, bords 0 |
| 42 | Tle spé | `python_suite` | `manim/scripts/terminale/suite_python[_short].py` | 4 min 58 | — | rendus HD définitifs en cours (l'agent a retouché après ses planches) |

Commits des agents : `bd1576d37` (39), `914716db5` (40), `40cc6859e` (41). Ceintures : paysage verte, short blanche. Lettres justes : 39 B/A + C · 40 C/B + A · 41 A/C + B · 42 B/A + C (4 A, 4 B, 4 C sur le lot, jamais deux fois la même lettre de suite dans une vidéo). La Réunion : 0 fois.

**Voix** : les 8 fichiers `manim/voix/` validés par Frédéric le 15/11 (commit `a54689491`) sont rendus **sans aucun mot changé**, les 4 agents le confirment.

## Les fichiers de fusion, dans `manim/poste2/`
- `manifeste-suites.json` — les 8 entrées au format du manifeste, `pas_avant` **vide** (le 1er poste datera). Chapitres et instants des questions mesurés pour 39, 40 et 41 ; **il manque ceux de l'ép. 42**.
- `videos-r2-suites.json` — les 8 entrées R2, `youtube` et `coach` à `null`.
- `coach-suites.md` — les lignes `notion_ressources` à créer (classe, notion_id, micro_id, id, titre), les 4 couples vérifiés dans `microSkills.ts`.
- `defauts-signales-suites.md` — 6 défauts repérés et **non corrigés** (règle reçue : noter, pas corriger).
- `mission-agents-suites-fin.md` — la mission commune des agents de rendu.
- `planche-39…png`, `planche-40…png`, `planche-41…png`, `planche-42…png` — les planches de contrôle (dernière image de chaque écran), **non suivies par git** (`.gitignore` exclut les PNG) : elles sont sur le disque, pas dans le dépôt.

## ⛔ L'ENVOI R2 N'A PAS PU ÊTRE FAIT : les clés ne sont pas sur ce poste
`.env.local` contient Supabase, Resend, OpenAI et les mots de passe, mais **ni `R2_ACCESS_KEY_ID`, ni `R2_SECRET_ACCESS_KEY`, ni `R2_ENDPOINT`**, dont `scripts/r2-videos.ps1` a besoin.
**Les 8 MP4 restent donc dans `manim/sorties/`** :
- `premiere/maths/suites/39-expo-prolonger/`
- `premiere-spe/maths/suites/40-exp-geo/`
- `terminale/maths/suites/41-integrale/`
- `terminale/maths/suites/42-python/`
`manim/sorties/` est dans `.gitignore` : **ces vidéos ne partiront pas avec les commits.** Il faut les envoyer depuis le poste qui a les clés, ou ajouter les clés ici.

## Ce qui reste à faire
1. Les re-rendus du 39 et du 40, et les deux rendus du 42 ; relire les planches finales.
2. Verser dans `manifeste-suites.json` les chapitres et les instants de l'ép. 42 (et re-vérifier ceux du 39 et du 40 si les re-rendus changent les durées).
3. Envoi R2 depuis un poste qui a les clés (voir ci-dessus).
4. Côté 1er poste, après la fusion : dater les `pas_avant`, fabriquer les miniatures, ajouter les entrées au manifeste partagé et à `lib/videos/*.json`, créer les lignes `notion_ressources` d'après `coach-suites.md`, puis YouTube.

## Deux décisions qui attendent Frédéric
1. **Les shorts dépassent la fourchette du brief** (45 s à 1 min 15) : 1 min 30 (39), 1 min 27 (40), 1 min 14 (41). Les voix validées sont plus denses que l'estimation. Laisser, ou resserrer les respirations et re-rendre ?
2. **Deux micros de la demande de départ n'ont pas de vidéo neuve** : `suite_calculer_termes` et `suite_explicite_recurrence` sont déjà servis par les entrées `aussi` des ép. 18 et 19 (voir `coach-suites.md`). Le coach les couvre ; seul inconvénient, un élève de terminale y voit « Maths 1re spé » en haut de l'écran.
