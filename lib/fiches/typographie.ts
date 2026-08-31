// ─── L'espace insécable, posée au rendu et non dans les fiches ─────────────────
//
// ⛔ LE DÉFAUT, VU PAR FRÉDÉRIC LE 31/08/2026 sur `/fiches-cours/francais/cm1/
// ecriture-produire`, à 375 px : « Tu dis « d'abord », « et après », « mais à la
// fin ». » se coupait entre `après` et son guillemet fermant, qui se retrouvait
// seul en début de ligne.
//
// La règle française demande une espace INSÉCABLE après « , avant », et avant
// les signes doubles ; ? ! ainsi que devant les deux-points. Aucune des 226
// fiches n'en contenait une seule — vérifié par comptage : 0 occurrence de
// U+00A0 dans les 227 fichiers de `lib/fiches`.
//
// ⭐ MESURÉ AVANT D'ÉCRIRE, ET C'EST LA MESURE QUI A CHOISI LA MÉTHODE.
// Le source compte 29 670 endroits où l'insécable manque. Ce chiffre ne veut
// rien dire : il compte des endroits, pas des défauts. Un texte qui tient sur sa
// ligne n'a aucun besoin d'insécable, et personne ne voit rien.
// Le seul chiffre qui compte est celui des coupures RÉELLEMENT produites par le
// navigateur. Mesuré en parcourant le DOM et en comparant la position verticale
// des deux côtés de chaque espace à risque — tops différents = la ligne s'est
// coupée là. Échantillon systématique d'une fiche sur quinze, 16 pages sur 226,
// à 375 px :
//
//   occurrences à risque ............ 4 254
//   coupures fautives ...............    91   soit 2,14 %
//   moyenne par fiche ...............   5,7   (IC 95 % : 3,2 – 8,2)
//   projection sur les 226 fiches ... ~1 285 coupures visibles
//
//   et par signe : «  33 · »  20 · :  24 · ?  12 · ;  2 · !  0
//
// Le guillemet fait 58 % du défaut à lui seul — c'est bien ce que Frédéric avait
// vu. Trois pages sur seize sont à zéro : le défaut n'est pas uniforme, il suit
// la densité de guillemets.
//
// ⭐⭐ POURQUOI AU RENDU ET NON DANS LES 226 FICHES. Trois raisons, dans l'ordre
// où elles pèsent :
//   • une insécable est INVISIBLE dans le source. Réécrire les fiches produirait
//     un diff de 29 670 caractères que personne ne peut relire, et où une faute
//     glissée passerait sans être vue ;
//   • il faudrait recommencer à chaque fiche écrite — or le chantier CM1 et le
//     chantier maths écrivent en ce moment même ;
//   • ici, une seule fonction couvre tout ce qui est déjà écrit ET tout ce qui
//     le sera. Les fiches restent lisibles à la relecture, en espaces normales.
//
// ⚠️ IDEMPOTENTE : U+00A0 n'appartient pas aux classes remplacées, repasser le
// texte une seconde fois ne change rien. C'est ce qui permet de l'appliquer sans
// se demander si elle l'a déjà été.

/** L'espace insécable, U+00A0. Nommée pour qu'elle soit visible dans le code —
 *  c'est justement le caractère qu'on ne voit pas. */
export const INSECABLE = " ";

/**
 * Pose les espaces insécables françaises dans un texte destiné à l'élève.
 *
 * ⚠️ N'AJOUTE JAMAIS D'ESPACE MANQUANTE, et ne corrige donc pas `quoi?` écrit
 * sans espace. Ce serait modifier le texte de la fiche, pas sa typographie —
 * deux chantiers différents, et celui-là se règle à l'écriture.
 *
 * ⚠️ Ne touche pas aux RETOURS À LA LIGNE : seules les espaces et tabulations
 * sont remplacées. Une fin de ligne suivie de `:` reste une fin de ligne.
 *
 * Les `https://` et autres `10:30` ne portent pas d'espace avant leur deux-points
 * et sortent donc intacts.
 */
export function insecables(texte: string): string {
  if (!texte) return texte;
  return (
    texte
      // Après le guillemet ouvrant : « puis le mot, soudés.
      .replace(/«[ \t]+/g, `«${INSECABLE}`)
      // Avant le guillemet fermant et les signes doubles. Une suite d'espaces
      // devient UNE insécable — deux espaces avant un `?` étaient déjà une faute.
      .replace(/[ \t]+(?=[»;?!:])/g, INSECABLE)
  );
}

/**
 * La même chose, en profondeur, sur un objet de données de diapo.
 *
 * ⭐ POURQUOI UNE TRAVERSÉE PLUTÔT QUE VINGT APPELS. Le mode classe rend le
 * texte BRUT à une quinzaine d'endroits (`section.phrase`, `carte.texte`,
 * `etape`, `enonce`, `correction`…), et une section de plus demain en ajouterait
 * un seizième qu'on oublierait. Transformer la donnée une fois, à l'entrée du
 * composant, couvre les sections existantes et celles à venir.
 *
 * ⛔ NE DESCEND PAS DANS LES ÉLÉMENTS REACT. `contenu` et `schema` sont des
 * `ReactNode` : des dessins, des canvas, du JSX déjà construit. On les reconnait
 * à `$$typeof` et on les rend tels quels — les recopier casserait le rendu, et
 * un canvas dessine son texte lui-même, sans jamais couper de ligne.
 */
export function typographier<T>(valeur: T): T {
  if (typeof valeur === "string") return insecables(valeur) as unknown as T;
  if (Array.isArray(valeur)) return valeur.map(typographier) as unknown as T;
  if (valeur && typeof valeur === "object") {
    if ("$$typeof" in (valeur as object)) return valeur;
    const sortie: Record<string, unknown> = {};
    for (const [cle, v] of Object.entries(valeur as object)) {
      sortie[cle] = typographier(v);
    }
    return sortie as unknown as T;
  }
  return valeur;
}
