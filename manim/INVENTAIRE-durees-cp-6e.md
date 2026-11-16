# Inventaire — série DURÉES du CP à la 6e (session B, 16/11)

36 micros au coach (CP 5, CE1 8, CE2 6, CM1 6, CM2 6, 6e 5). Notion `duree` du CP au CM2, `duree_temps` en 6e.

## Ce qui existe déjà
- 6e : 2 shorts au manifeste et sur R2 : `6e-duree-temps-short-diagonale` (micro `duree_defi`, passer minuit) et `6e-duree-temps-short-hugo-deck-diagonale` (micro `duree_convertir`, h min s en secondes). Aucune paysage 6e.
- 5e : `5e-conversion-duree` + son short (notion `grandeur_conversion`) : peut servir la 6e `duree_convertir` par `aussi` (à revoir à l'œil avant).
- CP, CE1, CE2, CM1, CM2 : AUCUNE vidéo de durée. `manim/scripts/cm2/duree.py` = vieux prototype muet de juillet (`e2aebd23`), jamais au manifeste : on ne le reprend pas.

## Proposition : une vidéo par NIVEAU de difficulté, rangée dans la classe la plus basse
| Vidéo (classe où elle vit) | Contenu | Sert aussi (`aussi`) |
|---|---|---|
| CP `cp_duree_lire_heure` | heure entière (la petite aiguille montre, la grande sur 12) | — |
| CP `cp_duree_placer_aiguilles` | placer pour une heure entière | — |
| CP `cp_duree_jour_semaine` | matin, midi, soir, nuit | — |
| CP `cp_duree_ordonner` | ranger les moments d'une journée | — |
| CP `cp_duree_defi` | défi | — |
| CE1 `ce1_duree_lire_heure_demi` | et demie, et quart, moins le quart | — |
| CE1 `ce1_duree_positionner_aiguilles` | placer demi et quarts | — |
| CE1 `ce1_duree_matin_apres_midi` | 3 h ou 15 h ? | — |
| CE1 `ce1_duree_unites_h_min` | 1 h = 60 min | — |
| CE1 `ce1_duree_calculer_simple` | durée écoulée en heures entières | — |
| CE1 `ce1_duree_ajouter` | ajouter, enlever des durées | — |
| CE1 `ce1_duree_calendrier` | jours, semaines, mois | — |
| CE1 `ce1_duree_defi` | défi | — |
| CE2 `ce2_duree_lire_heure` | lire à la minute, de 0 h à 24 h | **CM1 `duree_lire`** |
| CE2 `ce2_duree_positionner_aiguilles` | placer à la minute | **CM1 + CM2 `duree_positionner_aiguilles`** |
| CE2 `ce2_duree_convertir` | h ↔ min (1 h 30 = 90 min) | — |
| CE2 `ce2_duree_calculer` | durée écoulée, bonds sur la frise | — |
| CE2 `ce2_duree_probleme` | une ou deux étapes | — |
| CE2 `ce2_duree_defi` | défi | — |
| CM1 `duree_convertir` | h, min, s ; jour, semaine | — |
| CM1 `duree_calculer` ⭐ PILOTE | bonds sur la frise (+ 15 min, + 1 h), on passe l'heure ; jamais de soustraction posée | — |
| CM1 `duree_probleme` | horaires, plusieurs étapes simples | — |
| CM1 `duree_defi` | défi | — |
| CM2 `duree_lire` | h min s, chronomètre, 24 h | — |
| CM2 `duree_convertir` | 1 h = 3600 s, conversions mêlées | — |
| CM2 `duree_calculer` | passer midi ou minuit, h min s | — |
| CM2 `duree_probleme` | plusieurs étapes | — |
| CM2 `duree_defi` | défi | — |
| 6e `duree_calculer` | calcul posé en h et min (retenue de 60) | — |
| 6e `duree_convertir` | short Hugo Deck (déjà fait) ; paysage = `aussi` 5e `conversion-duree` | 5e → 6e |
| 6e `duree_decimale` | 1,5 h = 1 h 30, 0,25 h = 15 min | — |
| 6e `duree_probleme` | tableaux d'horaires | — |
| 6e `duree_defi` | paysage seule (short Diagonale déjà fait) | — |

**À tourner : 32 paysages + 31 shorts** (3 micros branchées par `aussi`, 2 shorts 6e déjà faits, 1 paysage 6e par `aussi` 5e).

## Ce que Frédéric tranche
1. CE2 « lire l'heure » sert aussi le CM1, et CE2 « placer les aiguilles » sert le CM1 ET le CM2 ? (le CM2 garde sa vidéo « lire » à lui, avec les secondes et le chronomètre)
2. La paysage 5e « conversion des durées » sert la 6e `duree_convertir` ?
3. Ordre : pilote CM1 `duree_calculer` d'abord (consigne), puis CP → CE1 → CE2 → CM1 → CM2 → 6e ?

## Choix techniques
- Commun horloge + frise + tableau h | min | s : `manim/scripts/cp/duree_commun.py` (importé par toutes les classes), horloge « belle, pas bébé » pour ses 6e. Le CM1 l'importe par `manim/scripts/cm1/duree_cm1_commun.py`.
- Voix : toutes dans un seul fichier `manim/voix/RECAP-durees-cp-6e.md`, validées avant le moindre WAV.
