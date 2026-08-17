// L'EMPREINTE D'UNE QUESTION — sa carte d'identité de contenu.
//
// Deux tirages d'un même gabarit sont la même question s'ils posent le même
// énoncé avec les mêmes propositions. L'ORDRE des propositions ne compte pas :
// le moteur les mélange à l'affichage, et un même QCM présenté dans deux ordres
// reste un seul exercice pour l'élève. D'où le tri avant le hachage.
//
// C'est la même clé que celle de scripts/mesurer-vivier.ts, et c'est voulu :
// ce que l'instrument compte comme « une question distincte » doit être
// exactement ce que le moteur refuse de reservir. Deux définitions
// divergentes, et la mesure ne dirait plus rien du produit.
//
// POURQUOI CE FICHIER (17/08/2026). La fonction vivait à l'intérieur de
// questionPairBuilder, en privé. Deux besoins l'ont fait sortir :
//   - les gabarits doivent pouvoir tirer AILLEURS que dans ce qui a déjà été
//     servi, donc calculer eux-mêmes l'empreinte des cas de leur réservoir ;
//   - la mémoire des questions vues doit survivre à la séance, donc voyager
//     jusqu'au navigateur et revenir.
// Un module sans dépendance, que tout le monde peut importer.

/** Hachage court et stable. Pas cryptographique : il ne protège rien. */
export function hashString(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

/** Empreinte de contenu : énoncé + propositions triées. */
export function contentFingerprint(text: string, choices?: string[]): string {
  const c = choices ? [...choices].sort().join("~") : "";
  return hashString(`${text}||${c}`);
}

/* L'empreinte voyage à l'intérieur de l'id généré (`…__fp<hash>__…`) : elle
   suit ainsi `recentQuestionIds` sans qu'on ait à changer le type de session,
   ni l'API, ni ce que le client stocke. */
const FP_MARKER = /__fp([0-9a-z]+)__/;

export function extractFingerprint(id: string): string | null {
  const m = id.match(FP_MARKER);
  return m ? m[1] : null;
}

/**
 * L'identifiant tel qu'on le GARDE pour se souvenir d'une question.
 *
 * Un id généré porte l'horloge et un aléa (`…__fp3k9__1755123456_4821`) pour
 * être unique à l'affichage. Conservé tel quel, il rendrait la mémoire
 * inutilisable : la même question revue demain s'écrirait autrement, et
 * s'empilerait au lieu de se reconnaître. On coupe donc après l'empreinte.
 *
 * Un item figé, lui, n'a que son id : il est déjà stable, on n'y touche pas.
 *
 * Deux effets : la même question vue trois fois n'occupe qu'une entrée, et la
 * comparaison par préfixe du moteur (`id + "_"`) continue de fonctionner.
 */
export function idPourMemoire(id: string): string {
  const m = id.match(/^(.*__fp[0-9a-z]+__)/);
  return m ? m[1] : id;
}
