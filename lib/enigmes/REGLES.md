# Énigmes à projeter : les règles (19/11/2026)

Hub : `/enigmes` (« Énigmes à projeter », sous-titre « questions flash, avec un minuteur »).
Page : `/enigmes/<classe>/<notion-slug>`. Données : `lib/enigmes/<classe>/<notionId>.ts`, à déclarer dans `registre.ts`.

## Le nom
- « Énigmes » (Frédéric : « j'aime le mot énigme ») ; Bing, 19/11 : « énigme mathématique » 16 600 résultats contre 8 970 pour « questions flash », déjà pris par les sites de rituels.

## L'écran
- Fond **ardoise par défaut** (« pb de lumière » dans les classes), blanc au choix (T).
- Lignes d'écriture en bas (L), la réponse s'y écrit quand on la montre (Espace).
- Minuteur 1, 2, 3, 5 min (M). Aucun son.

## Le contenu (6 par notion)
- Une énigme **piège** (`sorte: "piege"`) et une **défi des curieux** (`sorte: "defi"`), en 5e et 6e position.
- Contextes de vie variés : les maths sont transversales. La Réunion ≈ 4 % (une énigme sur ~25).
- 6e et avant : phrases courtes, un fait par phrase. Division avec « ÷ », jamais 5/2 hors fractions. Fraction en étage : `frac(3, 8)` (lib/enigmes/outils.ts).
- Chaque calcul vérifié à la main **et** relu ; figure au bon rapport, sinon écrire « pas à l'échelle ».
- Espaces insécables (U+00A0) avant ? ! : ; et dans « ».
- Couleurs des dessins : seulement la palette `COULEURS` de `types.ts` (convertie pour l'ardoise).
- Micros hors programme : on les masque, on ne les supprime jamais.

## La vérification (tableau de bord élève)
- `consigne` : la question posée à l'élève, fermée.
- `verification` : `courte` (réponses acceptées + unité) ou `qcm` (3 choix). La bonne réponse tombe au hasard sur A, B ou C : sur une classe, autant de A que de B et de C.
