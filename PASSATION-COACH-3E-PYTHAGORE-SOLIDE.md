# Passation : ajouter la micro « Pythagore dans un solide » au coach de 3e

Rédigée le 13/10/2026, à la fin de la série vidéo Pythagore 4e.

## Pourquoi

Frédéric a regardé le brevet 2026 (Asie, 15 juin, exercice 2) : Pythagore y est utilisé
**dans un solide**, un gobelet en tronc de cône. Le triangle rectangle OAD est caché dans le
cône (OD = 8,2 cm la génératrice, AD = 1,8 cm le rayon), et on calcule OA = 8 cm avec
OA² = OD² − AD² = 67,24 − 3,24 = 64. Ensuite viennent Thalès (OB = 20 cm) et le volume
(135π ≈ 424 cm³, gobelet ≈ 397 cm³).

Les 6 micros de 3e de la notion `pythagore_theoreme` (reconnaître, calculer l'hypoténuse,
calculer un côté, réciproque, rédiger, défi) ne contiennent **aucune** question dans
l'espace. C'est le manque à combler.

⚠️ À regarder avant d'écrire : `lib/tutor-v4/questionBank/3e/maths/sections_solides.bank.ts`
contient déjà des questions « section + Pythagore » (lignes ~840 à 2052, tags `pythagore`).
Ne pas les dupliquer : s'en inspirer, et décider si la nouvelle micro les complète ou les reprend.

## Ce qu'il faut faire

1. **Déclarer la micro** dans `lib/tutor-v4/knowledge/maths/3e/microSkills.ts`, section
   PYTHAGORE, entre `pythagore_rediger` et `pythagore_defi` :
   - `id: "pythagore_solide"`
   - `label: "Utiliser Pythagore dans un solide (cône, pyramide, pavé)"`
   - `notionId: "pythagore_theoreme"`
   - `prerequis: ["pythagore_calculer_cote", "pythagore_calculer_hypotenuse"]`
   - et mettre à jour les `prerequis` de `pythagore_defi` si c'est pertinent.
2. **La matrice** : `lib/tutor-v4/matrix/matrix3eMaths.ts` (les prérequis et l'ordre des micros, lignes ~50 et ~120).
3. **Les questions** dans `lib/tutor-v4/questionBank/3e/maths/pythagore.bank.ts`, `microId: "pythagore_solide"`,
   environ 10 comme les autres micros (fixed + **templates à générateurs**, pas des listes figées) :
   - **le cône** : hauteur, rayon, génératrice (calculer la hauteur à partir de la génératrice et du rayon, et inversement) ;
   - **la pyramide** à base carrée : la hauteur avec la demi-diagonale de la base, ou l'arête latérale ;
   - **le pavé droit** : la diagonale d'une face, puis la grande diagonale (deux Pythagore de suite) ;
   - **le cas du brevet** : le gobelet (OD = 8,2, AD = 1,8 → OA = 8), et des variantes chiffrées ;
   - une question « repérer le triangle rectangle caché » (lequel des segments est l'hypoténuse ?).
4. **Le correcteur**, si les autres micros de la notion en ont un (voir comment c'est fait en 4e :
   `lib/tutor-v4/questionBank/4e/maths/correcteurs/pythagore.ts`).

## Les règles (sa mémoire, à respecter)

- **Des questions PRÉCISES** : un cas chiffré, une seule réponse attendue ; jamais « Explique pourquoi » sans cas concret.
- **QCM** : jamais deux choix de même valeur ; corrigé au texte exact.
- **Arrondis** : dire « arrondi au dixième » quand la racine ne tombe pas juste ; préférer des triplets ou des valeurs qui tombent juste pour les premières questions.
- **Robustesse du coach** : des générateurs, pas des pools, et **mesurer les squelettes**
  (voir la mémoire « Robustesse du coach »).
- Une figure (canvas) quand le visuel sert : un cône, une pyramide ou un pavé avec le triangle rectangle mis en évidence.
- Vérifier : `npx tsc --noEmit`, puis ouvrir la mini-série dans le coach (`/coach/serie?classe=3e&matiere=maths&notion=pythagore_theoreme&microId=pythagore_solide&display=simple`) et répondre à quelques questions.
- **Commiter PAR CHEMIN** (plusieurs sessions sur le même poste) ; ne pousser qu'au signal de Frédéric.

## Après (pas dans cette session)

Une fois la micro en place : l'épisode vidéo « Le gobelet du brevet » (ceinture verte), à
ranger sur la micro `pythagore_solide` (table `notion_ressources`, classe 3e, micro_id rempli).
