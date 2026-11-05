# Reprise — série PUISSANCES (état au 04/11/2026 soir, session « rendus 5 → 10 »)

Lire d'abord `manim/prompt-session-puissances.md` (découpage, ordre de travail) et `manim/brief-agent-puissances.md` (brief des agents de rendu, ⛔ « corrige toujours les défauts mineurs »).

## Voix (`manim/voix/4e-puissance-<slug>[-short].json`)
| Ép. | Slug | Ceintures | Voix | Rendu |
|---|---|---|---|---|
| 1 | comprendre | 4e/3e blanche, short blanche | VALIDÉE | ✅ FINI (paysage 4e + 3e, short), revu |
| 2 | calculer | 4e/3e jaune, short blanche | VALIDÉE | ✅ FINI, revu |
| 3 | dix | 4e/3e jaune, short blanche | VALIDÉE | ✅ FINI, revu |
| 4 | zero-negatif | 4e orange / 2de jaune (écran 04b 2de seulement), short blanche | VALIDÉE | ✅ FINI (4e, seconde, short), revu |
| 5 | notation-scientifique | 4e/3e/2de (4e verte, 3e/2de jaune), short blanche | VALIDÉE | ✅ FINI (4e, 3e, seconde, short), revu ; short corrigé (marges) et re-rendu 04/11 18 h |
| 6 | comparer | 4e verte, short blanche | VALIDÉE | ✅ FINI (4e, short), revu ; paysage corrigée (flèche sur l'exposant) et re-rendue 05/11 1 h |
| 7 | calcul | 4e/3e verte, short blanche | VALIDÉE | 1er agent figé à 23 h 55 (scripts écrits, aucun HD) ; agent de reprise lancé 05/11 2 h |
| 8 | produit-quotient | 2de verte, short blanche (voix 2de-puissance-…) | VALIDÉE | ✅ FINI (seconde, short), revu ; corrigé (ligne du short dans la carte, une taille par explication) et re-rendu 05/11 1 h 20 |
| 9 | puissance-puissance | 2de verte, PAYSAGE SEULE (voix 2de-puissance-puissance-puissance) | VALIDÉE | agent lancé 05/11 0 h 57 |
| 10 | enchainer | 2de orange, short blanche (voix 2de-puissance-enchainer) | VALIDÉE | ✅ FINI (seconde, short), revu 05/11 2 h : rien à corriger (« Réponse B » du short portée par la carte allumée, comme ép. 6) |
| 11 → 13 | | | à écrire | — |

Sorties : `manim/sorties/<classe>/maths/puissances/NN-<slug>/`. Rapports des agents : `manim/rapports-puissances.md`.

## Passage de main (05/11, vers 2 h 40, session « rendus 5 → 10 » à 59 % de contexte)
- Revus par la session principale : ép. 5, 6, 8, 10. Commits 1b54a618 (5, 6, 8) + celui de l'ép. 10. Rien de poussé.
- EN COURS, lancés par la session qui passe la main : ép. 7 (agent de reprise, le 1er s'était figé à 23 h 55 ; 4e + short rendus vers 2 h 33, reste la 3e) et ép. 9 (rendu HD en attente du verrou depuis 1 h 47). Fini = section dans `manim/rapports-puissances.md` + mp4 + verrou libre. Si plus aucun fichier ne bouge pendant 30 min, l'agent est figé : relancer depuis ses scripts, avec la même consigne.
- Reste : planches de 7 et 9 regardées (défauts repérés jusqu'ici : texte collé au bord d'une carte, deux tailles dans une explication, cercle qui mord sur la base d'un exposant) ; aperçu port 3900 de la DERNIÈRE vidéo, en pause ; commit par chemin de 7 et 9 (scripts + `_marques.json` ; ni `.cues.tsv`, ni `media-puiss-*`, ni mp4, ni WAV).
- Avec Frédéric, le matin : voix 11, 12, 13, puis passe finale.

## Reste à faire
- Contrôler chaque rendu soi-même (planche ffmpeg de 6 images), corriger tout défaut mineur.
- Ép. 5 : lancer un agent (modèle de prompt : celui de l'ép. 4, paysage 3 classes `PuissanceNotationScientifique4e/3e/2de`).
- Faire valider la voix 6, écrire 7 → 13 (ép. 9 : paysage seule ; ép. 13 : a⁰ = 1 dans les règles).
- Aperçu port 3900 de la DERNIÈRE vidéo seulement, en pause.
- Passe finale (miniatures, manifeste SANS le réécrire en entier, R2, coach, bilans), commit PAR CHEMIN, pas de push avant le soir.

## Notes de la session précédente (04/11, à ~60 % de contexte)
- Toutes les voix 1 → 10 sont VALIDÉES. Reste à écrire 11 (défi 4e), 12 (défi 3e), 13 (résumé 1re/STMG « Les puissances en 5 règles », avec a⁰ = 1 ; short « 2³ × 2⁴ = 4⁷ ? »), à faire valider une par une.
- Agents en cours au moment du passage : ép. 2, ép. 3, ép. 5 (rapports dans `manim/rapports-puissances.md`) ; lancer 6 → 10 au fur et à mesure (3 agents au plus). Prompt type : celui de l'ép. 5 (classes, ceintures, sorties, dessins écran par écran, « corrige toujours les défauts mineurs »). Fichiers 2de : dossier et nom `seconde` (`eleveai-maths-seconde-…`), comme les vidéos de seconde existantes.
- Les voix 2de s'appellent `manim/voix/2de-puissance-<slug>.json` ; leurs sorties vont dans le dossier 2de de `manim/sorties/` (suivre l'usage existant).
- Ép. 9 : PAYSAGE SEULE (le short `puissances-parenthese` en ligne est gardé).

## Modèle de prompt d'agent (celui de l'ép. 5, à adapter)
> Lis et applique `manim/brief-agent-puissances.md` (« corrige toujours les défauts mineurs », mots répétés de `cues2marques.py`). Modèles finis : `manim/scripts/4e/puissance_zero_negatif.py` (paysage commune, dont 2de) et `puissance_zero_negatif_short.py`.
> Tes vidéos : épisode NN, slug `<slug>` (Python `puissance_<slug_underscore>`). Voix validées : `manim/voix/<4e|2de>-puissance-<slug>[-short].json`. PAYSAGE d'abord, puis SHORT.
> PAYSAGE : base + une sous-classe par classe (`Puissance<Slug>4e/3e/2de`, identité « Maths <classe> — EleveAI », ceinture du tableau). Sorties `manim/sorties/<4e|3e|seconde>/maths/puissances/NN-<slug>/eleveai-maths-<4e|3e|seconde>-puissance-<slug>.mp4`. Micros : voir `manim/prompt-session-puissances.md` § 1.
> Dessins écran par écran (un par clé de voix, qui bouge ; code couleur bleu base / orange exposant / vert juste / rouge piège ; pictogramme + métier écrit) ; questions-pauses 5 s.
> SHORT ceinture blanche, identité 4e (ou 2de), `…_short.py`, classe `Puissance<Slug>Short` : en HAUT l'image concrète qui bouge, en BAS les maths en même temps ; question-pause 3 s ; question en commentaire puis l'abonne.
> D'autres agents rendent en même temps : verrou HD obligatoire. Rapport court à la fin.
