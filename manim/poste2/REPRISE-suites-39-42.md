# Reprise — FIN de la série SUITES du lycée (épisodes 39 à 42), 2e poste, 15/11/2026

Branche `poste2`, **rien poussé**. Commits par chemin uniquement. Une autre session du même poste produit la 5e : ses fichiers (`manim/scripts/5e/*`, `manim/REPRISE-5e-*`, `manim/poste2/apercu-pilote-5e-*`) ne sont pas touchés ici. Le verrou `%TEMP%\eleveai-rendu-hd.lock` est partagé avec elle : un seul rendu HD à la fois sur la machine.

## Ce qui a été produit

| Ép. | Classe | Micro | Scripts | Paysage | Short | État |
|---|---|---|---|---|---|---|
| 39 | 1re | `expo_fct_prolonger_suite` | `manim/scripts/premiere/suite_expo_prolonger[_short].py` | 5 min 15 | 1 min 30 | ✅ accepté (`bd1576d37` + `3e803f7e7`) |
| 40 | 1re spé | `exp_suite_geo` | `manim/scripts/premiere/suite_exp_geo[_short].py` | 5 min 26 | 1 min 28 | ✅ accepté (`914716db5` + `4a7b216bf`) |
| 41 | Tle spé | `integrale_suite` | `manim/scripts/terminale/suite_integrale[_short].py` | 5 min 55 | 1 min 14 | ✅ accepté (`40cc6859e`) |
| 42 | Tle spé | `python_suite` | `manim/scripts/terminale/suite_python[_short].py` | 4 min 58 | 1 min 13 | ✅ accepté (`5571f9206`) |

**Les 8 vidéos sont rendues, relues deux fois (par leur agent, puis par la session principale sur une planche de contrôle) et à 0 bord** — dry run `AUDIT=1 BORDS=1` sans aucune avance ni retard, et `verifier-bords-video.py` à « 0 instants » sur chacun des 8 MP4.

Retouches demandées par la session principale après relecture des planches, toutes faites et re-rendues : ép. 39, la carte-réponse recouvrait « ⏸ Question ! » aux deux corrections et deux textes entraient dans un repère ; ép. 40, l'étiquette « × eᵃ » du saut se posait sur la formule, et le passage « À toi de jouer ! » → « Correction » laissait une image aux lettres déformées.

Ceintures : paysage verte, short blanche. Lettres justes : 39 B/A + C · 40 C/B + A · 41 A/C + B · 42 B/A + C (4 A, 4 B, 4 C sur le lot, jamais deux fois la même lettre de suite dans une vidéo). La Réunion : 0 fois.

**Voix** : les 8 fichiers `manim/voix/` validés par Frédéric le 15/11 (commit `a54689491`) sont rendus **sans aucun mot changé**, les 4 agents le confirment.

## Les fichiers de fusion, dans `manim/poste2/`
- `manifeste-suites.json` — les 8 entrées au format du manifeste, `pas_avant` **vide** (le 1er poste datera). Chapitres et instants des questions **mesurés pour les 4 épisodes** sur les MP4 finaux. Contrôlé : aucun champ vide, `pas_avant` vide partout, 3 choix distincts par question, chaque question tombe sur un chapitre, aucun chapitre sous 10 s (le plus court : 14 s), et **4 bonnes réponses A, 4 B, 4 C** sur les 12 questions du lot.
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
1. Envoi R2 depuis un poste qui a les clés (voir ci-dessus).
2. Côté 1er poste, après la fusion : dater les `pas_avant`, fabriquer les miniatures, ajouter les entrées au manifeste partagé et à `lib/videos/*.json`, créer les lignes `notion_ressources` d'après `coach-suites.md`, puis YouTube.

## Deux décisions qui attendent Frédéric
1. **Les shorts dépassent la fourchette du brief** (45 s à 1 min 15) : 1 min 30 (39), 1 min 27 (40), 1 min 14 (41). Les voix validées sont plus denses que l'estimation. Laisser, ou resserrer les respirations et re-rendre ?
2. **Deux micros de la demande de départ n'ont pas de vidéo neuve** : `suite_calculer_termes` et `suite_explicite_recurrence` sont déjà servis par les entrées `aussi` des ép. 18 et 19 (voir `coach-suites.md`). Le coach les couvre ; seul inconvénient, un élève de terminale y voit « Maths 1re spé » en haut de l'écran.
