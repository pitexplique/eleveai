# Énigmes à projeter : les règles (code et adresse : /problemes) (19/11/2026)

Hub : `/problemes` (« Énigmes à projeter », sous-titre « questions flash, avec un minuteur »).
Page : `/problemes/<classe>/<notion-slug>`. Données : `lib/problemes/<classe>/<notionId>.ts`, à déclarer dans `registre.ts`.

## Le nom
- 19/11 : d'abord « énigmes », puis Frédéric : « le mot énigme n'est pas exact » (ce sont des problèmes en contexte, plus un piège et un défi). Nom provisoire « Problèmes à projeter », puis le même jour : « remplace le mot problème à projeter par Énigmes à projeter ». ⛔ NOM AFFICHÉ : « Énigmes à projeter », tags « Énigme 1 · … », boutons « Projeter les énigmes » ; adresse et code inchangés (/problemes, lib/problemes).
- Pour Google : titres et descriptions avec les mots que les profs cherchent (questions flash, problème du jour, défi maths, diaporama à projeter). Schéma : « Théorème de Pythagore 4e : 6 énigmes à projeter en classe (défis et questions flash corrigés) ».
- Chaque page affiche « eleveai.fr » en haut à gauche, petit mais lisible du fond de la classe.

## L'écran
- Fond **ardoise par défaut** (« pb de lumière » dans les classes), blanc au choix (T).
- Lignes d'écriture en bas (L), la réponse s'y écrit quand on la montre (Espace).
- Minuteur 1, 2, 3, 5 min (M). Aucun son.

## Le contenu (6 par notion)
- Un problème **piège** (`sorte: "piege"`) et une **défi des curieux** (`sorte: "defi"`), en 5e et 6e position.
- Contextes de vie variés : les maths sont transversales. La Réunion ≈ 4 % (un problème sur ~25).
- 6e et avant : phrases courtes, un fait par phrase. Division avec « ÷ », jamais 5/2 hors fractions. Fraction en étage : `frac(3, 8)` (lib/problemes/outils.ts).
- Chaque calcul vérifié à la main **et** relu ; figure au bon rapport, sinon écrire « pas à l'échelle ».
- Espaces insécables (U+00A0) avant ? ! : ; et dans « ».
- Couleurs des dessins : seulement la palette `COULEURS` de `types.ts` (convertie pour l'ardoise).
- Micros hors programme : on les masque, on ne les supprime jamais.

## La vérification (tableau de bord élève)
- `consigne` : la question posée à l'élève, fermée.
- `verification` : `courte` (réponses acceptées + unité) ou `qcm` (3 choix). La bonne réponse tombe au hasard sur A, B ou C : sur une classe, autant de A que de B et de C.
