# Reprise — règle 6e ★1-★2 (03/11/2026)

Arrêté proprement (quota à 93 %). Règle : `REGLES-6E.md`. Mesure :
`node scripts/mesure-contexte-coach-6e.mjs` (+ `npx tsx scripts/verifier-correcteurs-maths-6e.ts <préfixe>`).

## Fait et commité (pas poussé)
- Fractions (3 banques), données, probabilités, décimaux, pourcentages,
  proportionnalité, aires, périmètres, longueurs, et, par l'autre session,
  algèbre, symétrie, quadrilatères, distances, demi-droite, échelles, durées,
  bissectrice, vision dans l'espace, médiatrice.

## Reste à faire (encore du contexte à ★1-★2)
- `volumes.bank.ts` : volume_comparer 62 %, volume_lire 25 %, volume_unite, volume_compter.
- `entiers.bank.ts` : entier_comparer 51 %, entier_rang 38 %, decomposer, encadrer, defi.
- `calcul-mental.bank.ts` : calcul_mental_defi 59 %, addition, multiplication, stratégie, soustraction, division.
- `calcul-pose.bank.ts` : calcul_verifier 32 %, multiplication_posee 19 %.
- `triangles.bank.ts` : tous les micros (10 à 25 %, « Sur le cahier de X, le triangle… »).
- `angles.bank.ts` : angle_tracer, angle_comparer, angle_droit (6 à 11 %).
- `cercle.bank.ts` et `algorithmique.bank.ts` : à vérifier.

## ⚠️ Modifications NON commitées, interrompues en cours
- `calcul-pose.bank.ts` + `correcteurs/calcul-pose.ts` : un agent ajoutait les
  correcteurs de 5 gabarits ★3 ; à vérifier avec le vérificateur avant commit.
- `algorithmique.bank.ts` + `correcteurs/algorithmique.ts` : passe précédente
  (07 h 25) + agent interrompu ; à vérifier avant commit.
- Le script de mesure tourne sans erreur de syntaxe sur l'état actuel.
