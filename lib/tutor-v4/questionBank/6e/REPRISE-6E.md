# Reprise — règle 6e ★1-★2 : ✅ TERMINÉE le 03/11/2026

Règle : `REGLES-6E.md`. Brief des agents : `BRIEF-AGENT-6E.md`.
Mesure : `node scripts/mesure-contexte-coach-6e.mjs` → 141 micros sur 147 à 0 % ;
les 6 restantes sont des faux positifs (« Scratch », « euros » en proportionnalité).
Correcteurs : `npx tsx scripts/verifier-correcteurs-maths-6e.ts` → 715 gabarits justes.

Commits du 03/11 après-midi (pas tous poussés) : entiers `033e6c31`, volumes +
algorithmique `c41d84e5`, calcul mental + posé `5b255c70`, triangles `7a6f4b84`,
angles + cercle `1860d66b` ; le matin : fractions, données, probabilités,
décimaux, pourcentages, aires, etc.

## À surveiller (non bloquant)
- Notation Ĉ (`$\widehat{C}$`) nouvelle en 6e (triangles) : déjà utilisée en 4e
  (cosinus), pas encore vue dans le navigateur en 6e.
- Angles ★2 : « ABC = 40° » sans chapeau pour tenir en 15 mots (à valider).
- Quelques gabarits ★3 hérités à 26-33 mots (triangles, cercle_proportionnel_tpl_1,
  cercle_ensemble_tpl_1).
- Algorithmique : les lignes du programme comptent comme la figure (énoncés 14-23 mots).
