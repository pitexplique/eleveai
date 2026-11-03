# Règles des questions du coach — 6e

Décidé le 03/11/2026 par Frédéric, après les fractions : ses élèves faibles
butent sur les contextes au début, et plusieurs lui ont dit ne pas comprendre
les phrases. **On apprend d'abord le geste mathématique nu ; le contexte vient
quand le geste est su.**

## Par étoile

| Étoile | Contexte | Longueur de l'énoncé | Exemple |
|---|---|---|---|
| ★1 | **Aucun** : pas de prénom, pas de situation, pas de métier, pas de prix | **12 mots au plus**, une phrase | « Calcule 3/4 + 1/4. » |
| ★2 | **Aucun** | **15 mots au plus**, deux phrases courtes au plus | « Compare 2/3 et 3/4. Écris < ou >. » |
| ★3 | Autorisé : **une** situation simple | 25 mots au plus, une information par phrase | « Léa mange 2/8 d'une pizza. Quelle fraction reste-t-il ? » |
| ★4-★5 | Problèmes, défis, plusieurs étapes | libre, mais phrases courtes | — |

- Les unités qui SONT la notion (cm, m², m³, °, h-min, €  en proportionnalité)
  restent permises à ★1-★2, sans histoire autour : « Un rectangle mesure 4 m
  sur 10 m. Calcule son aire. », pas « Le potager de Maëlle… ».
- Les visuels (figure, droite graduée, diagramme, grille) sont encouragés dès
  ★1 : ils remplacent la lecture, ils ne l'ajoutent pas.
- À ★3 et plus, les contextes suivent les règles habituelles : variés, des
  métiers, La Réunion ≈ 1 fois sur 25.

## Écrire pour un élève qui lit mal

- Le verbe d'action en tête : Calcule, Écris, Compare, Place, Range, Colorie.
- Une question directe à la fin : « Combien… ? », « Quelle fraction… ? ».
- Nombres en chiffres, jamais en lettres (sauf si la micro porte sur l'écriture
  en lettres).
- Pas de tournures de lecture : « celle de », « ainsi que », « lequel »,
  « on sait que », négations, subordonnées, parenthèses.
- Seuls les mots de maths de la notion ; pas de mot rare de la vie courante.
- Le QCM ne doit pas se lire plus long que la question.

## Vérifier

```bash
node scripts/mesure-contexte-coach-6e.mjs
```

Le script tire chaque gabarit ★1-★2 plusieurs fois et donne, par micro, la part
d'énoncés avec contexte et la longueur moyenne. Une banque est conforme à
**0 % de contexte** et sous les longueurs du tableau. Le repérage du contexte
est approximatif (prénoms, mots d'histoire) : lire les exemples qu'il cite.

Première application : fractions 6e (`543af538`, `0b099ce1`, `f10674bf`).
