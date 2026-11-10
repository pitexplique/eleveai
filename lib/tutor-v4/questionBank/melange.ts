// LE MÉLANGE DES BANQUES — un vrai tirage au hasard (Fisher-Yates).
//
// POURQUOI (10/11/2026). Presque toutes les banques mélangeaient avec
// `tableau.sort(() => Math.random() - 0.5)`. Ce tri ne tire PAS au hasard : un
// algorithme de tri ne s'attend pas à un comparateur qui change d'avis, et les
// permutations n'ont plus toutes la même chance. Mesuré sur 10 000 tirages de
// `makeChoices` (4e, proportionnalité) : la bonne réponse tombait en 1re place
// 35 % du temps et en 4e 32 %, au lieu de 25 % partout. Sur cinq pièges écrits,
// le dernier n'était retenu qu'une fois sur deux, au lieu de trois sur cinq.
//
// ⚠️ La place de la bonne réponse ne se voyait pas chez l'élève : le moteur
// (questionPairBuilder, `shuffleChoices`) remélange tous les QCM avant de les
// afficher. Le défaut touchait ce qui se tire DANS les gabarits : quels pièges
// sortent, quelles valeurs, quels points.
//
// `melangeEnPlace` a le même comportement que l'ancien `.sort(...)` : elle
// mélange le tableau LUI-MÊME et le renvoie. Celui qui copiait avant
// (`[...t].sort(...)`) copie toujours (`melangeEnPlace([...t])`).

export function melangeEnPlace<T>(t: T[]): T[] {
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}
