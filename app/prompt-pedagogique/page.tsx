// app/prompt-pedagogique/page.tsx
//
// ⭐ RENOMMÉE LE 08/08/2026 — c'était `/optimiseur`, et son titre disait encore
// « Valeria — Optimiseur de prompt (V1) ».
//
// Deux problèmes dans ce seul titre : « Valeria » est une offre de conseil qui
// n'a plus rien à voir avec EleveAI (ses deux pages sont parties le même jour),
// et « optimiseur de prompt » ne dit pas ce que ça fait à quelqu'un qui n'est
// pas du métier. Frédéric, 08/08 : « un prof ou un élève tape un prompt et ça
// l'optimise pour qu'il soit parfaitement pédagogique ».
//
// ⭐ ET ÇA REMET UNE CHIP EN JEU. « Écrire un prompt pédagogique » avait été
// RETIRÉE des actions du professeur la veille, faute d'outil derrière — c'était
// le seul des quatre outils du point 12 sans équivalent en ligne, et j'avais
// refusé de le brancher sur une page approchante. Il existait, sous un autre
// nom. Voir lib/matrice/actions.ts.
//
// ⚠️ POUR ÉLÈVES ET PROFS, pas seulement pour les profs (Frédéric). Un élève
// qui demande quelque chose à une IA gagne autant à savoir le formuler.
//
// ⚠️ LES ROUTES D'API RESTENT `/api/optimiseur/*`. Elles ne sont jamais vues
// par personne, cinq appels du client en dépendent, et les renommer n'aurait
// rien apporté qu'un risque. Un chemin public et un chemin interne n'ont pas
// à porter le même nom.

import OptimiseurClient from "./OptimiseurClient";

export { metadata } from "./metadata";

export default function PromptPedagogiquePage() {
  return <OptimiseurClient />;
}
