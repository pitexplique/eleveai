// lib/tarifs.ts
//
// UN SEUL ENDROIT POUR LES PRIX (grille du 01/09/2026).
//
// Ils vivaient en trois exemplaires : la carte de `/tarifs`, la FAQ de la même
// page, et la description que Google affiche dans ses résultats. La grille a
// changé quatre fois depuis juin, et à chaque fois un des trois est resté en
// arrière — la SERP a annoncé « 4,90 €/mois » des semaines après que la carte
// eut cessé de le dire. ⛔ Ne recopier un prix nulle part : l'importer.
//
// ─────────────────────────────────────────────────────────────────────────────
// LA GRILLE : DEUX FORMULES POUR LES FAMILLES, ET RIEN À PAYER POUR PERSONNE
// D'AUTRE.
//
//   • Mensuel   2,50 € par mois, sans engagement
//   • Annuel   19,90 € pour l'ANNÉE SCOLAIRE
//   • Enseignant  0 € — gratuit à titre personnel, vérifié sur son adresse
//     académique (`ac-*.fr`)
//
// ⭐ L'ÉLÈVE NE PAIE JAMAIS, ET CE N'EST PAS UNE LIGNE DE LA GRILLE : c'est ce
// qui la gouverne. Le coach, les exercices, les parcours, les cahiers et les
// évaluations restent ouverts sans compte payant. Ce qui se paie est la fenêtre
// du PARENT — voir, garder, savoir quoi reprendre.
//
// ⚠️⚠️ CE QUI A DISPARU LE 01/09/2026, ET IL FAUT LE SAVOIR AVANT DE LIRE UNE
// VIEILLE PAGE : **L'ÉCHELLE DES PAYEURS N'EXISTE PLUS.** Pendant dix jours, le
// site a raconté « plus le payeur est large, moins l'élève coûte » avec trois
// barreaux — famille, classe, établissement. Les trois sont tombés :
//   — l'ÉTABLISSEMENT le 29/08, puis déclaré INTERDIT le 31/08 (Frédéric : « on
//     n'a pas le droit de vendre à un établissement en tant que contractuel en
//     CDI, c'est du pénal ») ;
//   — la CLASSE le 01/09, avec la nouvelle grille : il n'y a plus de tarif de
//     groupe, plus de remise, plus de « prix d'un livre ».
// ⛔ Il ne reste donc qu'UN payeur, la famille, et DEUX façons de payer. Toute
// phrase du site qui parle d'échelle, de payeur plus large, de tarif de groupe
// ou de « 25 % de moins » décrit un modèle mort. Elles ont été retirées le
// 01/09 ; si une réapparaît, c'est une page qu'on a oublié de relire.
//
// ⭐ L'ENSEIGNANT EST GRATUIT, ET C'EST LA SIMPLIFICATION DU 01/09. Les cinq
// grilles mortes du 22/08 butaient toutes sur la même question — comment le
// professeur paie-t-il, et avec l'argent de qui ? Elle ne se pose plus : il ne
// paie pas. ⚠️ Sa gratuité est PERSONNELLE et ne se propage pas : les familles
// de ses élèves paient l'abonnement comme les autres. Un professeur ne débloque
// rien pour sa classe, il obtient son propre outil.
//
// ⚠️⚠️ L'ARITHMÉTIQUE DE L'OFFRE ANNUELLE NE DIT PAS « DEUX MOIS OFFERTS », ET
// C'EST À VÉRIFIER AVANT DE L'ÉCRIRE. Deux mois offerts sur 2,50 € feraient
// 25 € par an. À 19,90 €, l'économie réelle vaut 10,10 €, soit QUATRE mois —
// l'annuel est donc plus généreux que la formule ne le dit. `MOIS_OFFERTS` le
// calcule au lieu de le supposer ; c'est ce nombre-là qui s'affiche.
// ⛔ Ne jamais réécrire « deux mois offerts » à la main : ou bien l'annuel passe
// à 25 € et la phrase redevient vraie, ou bien la phrase suit le calcul.
//
// ⚠️⚠️ « PAR AN » N'EST PAS « SUR L'ANNÉE SCOLAIRE », et la différence est
// contractuelle. L'abonnement annuel couvre une ANNÉE SCOLAIRE, pas douze mois
// glissants : souscrit en janvier, il s'arrête à la fin de l'année scolaire en
// cours, il ne court pas jusqu'au janvier suivant. C'est une mention
// obligatoire (`PERIODE_ANNUELLE`), elle s'affiche partout où le prix annuel
// s'affiche, et elle est reprise à l'article 8 des CGV.
//
// ⚠️⚠️ LE PIÈGE D'UNITÉ, ET IL A DÉJÀ COÛTÉ UN FACTEUR DOUZE : Frédéric s'est
// trompé une fois le 22/08 — « ça fait un euro par élève et par mois en gros »,
// alors que c'était par an. La grille tient maintenant deux nombres proches
// dans deux unités (2,50 € par MOIS, 19,90 € par AN) : ⛔ NE JAMAIS ÉCRIRE UN
// MONTANT SANS SON UNITÉ, pas même dans un commentaire.
//
// ⛔ ET AUCUN TAUX NE S'ÉCRIT À LA MAIN. « 25 % de moins » vivait en dur dans
// quatre fichiers le 01/09 — /tarifs, /espace-profs, la FAQ tarifs et le
// llms.txt — et aucun n'aurait suivi un changement de grille. Les pourcentages
// se calculent ici (`REDUCTION_ANNUEL_POURCENT`, `MOIS_OFFERTS`), comme les
// prix.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// ⭐⭐ LA GRILLE DE RÉOUVERTURE — TRANCHÉE LE 01/09/2026, PAS ENCORE EN VIGUEUR.
//
// ⛔⛔ CES DEUX MONTANTS NE SONT PAS LE PRIX D'AUJOURD'HUI. Les constantes
// ci-dessous n'ont pas bougé : le site affiche 2,50 €/mois et 19,90 €/année
// scolaire tant que `VENTE.ouverte` est à false. Ce bloc est une DÉCISION prise
// d'avance, écrite ici pour ne pas se rejouer.
//
//   • Mensuel  4,95 € par mois          (contre 2,50 € aujourd'hui)
//   • Annuel  39,90 € par ANNÉE SCOLAIRE (contre 19,90 € aujourd'hui)
//
// ⚠️ LE MONTANT NE S'ÉCRIT JAMAIS SANS SON UNITÉ, pas même ici : les deux
// nombres sont proches et vivent dans deux unités différentes. C'est le piège
// qui a déjà coûté un facteur douze le 22/08.
//
// ⭐ POURQUOI 4,95 ET PAS MOINS, ET C'EST CONTRE-INTUITIF. Le marché relevé le
// 01/09 : Kartable 14,99 €/mois, Schoolmouv 14,99 €/mois, Maxicours « à partir
// de 4,95 €/mois » AVEC engagement. 4,95 € sans engagement est donc le plancher
// du marché, pas un prix cher. À 2,50 € on est six fois sous Kartable, et un
// parent qui achète de la réassurance lit « projet perso, il n'y a rien dedans »
// avant de lire « bonne affaire ». ⚠️ Entre 2 € et 5 €, l'élasticité est quasi
// nulle : le parent vient de voir 14,99 € ailleurs, les deux prix déclenchent la
// même décision. On double la recette par abonné sans rien perdre en conversion.
// ⚠️ Et la marche ne se descend pas : à 2,50 € on ne peut plus monter sans se
// renier, à 4,95 € on reste le moins cher du marché pendant des années.
//
// ⭐ 39,90 € N'EST PAS UN CHOIX LIBRE, IL EST CONTRAINT PAR `MOIS_OFFERTS`.
// Vérifié au calcul avant d'être décidé — c'est le seul montant annuel qui garde
// l'offre inchangée dans ce qu'elle promet :
//   douze mois au tarif mensuel  59,40 €   économie  19,50 €
//   MOIS_OFFERTS  4  (identique à aujourd'hui)   REDUCTION  33 %  (contre 34 %)
//   RAPPORT_IXL   6  (contre 12) — et 6 est CRÉDIBLE là où 12 ne l'est pas.
//     Il a valu 20 le 22/08 (illisible), 10 le 01/09 au matin, 12 le soir. La
//     trajectoire va dans le bon sens : plus le rapport baisse, plus il se croit.
// ⛔ Ne pas « arrondir » l'annuel à 39 € ou 45 € sans relancer ce calcul :
// `MOIS_OFFERTS` et `REDUCTION_ANNUEL_POURCENT` sont dérivés, et une grille qui
// n'offre plus que trois mois affaiblit l'argument sans que personne le voie.
//
// **COMMENT LA METTRE EN VIGUEUR, LE JOUR VENU** : changer les deux littéraux de
// `PRIX_MENSUEL` et `PRIX_ANNUEL` ci-dessous, et rien d'autre. Tout le reste est
// calculé ou importé — `scripts/verifier-tarifs.ts` confirme qu'aucun prix n'est
// écrit à la main dans les 234 fichiers de vitrine. Puis relire ce bloc et le
// supprimer, pour qu'il ne reste pas à décrire un futur devenu le présent.
// ⚠️ Ce jour-là seulement se rouvre la question de la gratuité enseignant, qui
// n'est toujours pas branchée dans l'inscription (report décidé, pas un oubli).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ⭐ 2,50 € PAR MOIS, SANS ENGAGEMENT — par FOYER, jamais par enfant, sur une
 * seule adresse courriel. Le frère d'à côté ne coûte rien de plus.
 *
 * C'est le prix d'entrée, celui qui se compare à la vie courante : un café.
 * ⚠️ Il se dit toujours AU MOIS. « 30 € par an » est le même montant et le
 * mauvais nombre — c'est celui qui fait renoncer.
 */
export const PRIX_MENSUEL = 2.5;

/**
 * ⭐ 19,90 € POUR L'ANNÉE SCOLAIRE — la formule à recommander.
 *
 * ⚠️ ET ELLE NE SE DIT PAS « PAR AN » TOUT COURT : voir `PERIODE_ANNUELLE`.
 * Un abonnement annuel souscrit en janvier ne court pas jusqu'au janvier
 * suivant, il s'arrête avec l'année scolaire. Le taire, c'est vendre onze mois
 * pour cinq — et c'est le genre de silence qui se retrouve en litige.
 */
export const PRIX_ANNUEL = 19.9;

/**
 * La période que couvre l'abonnement annuel. ⛔ MENTION OBLIGATOIRE : elle
 * s'affiche partout où `PRIX_ANNUEL` s'affiche, sans exception.
 */
export const PERIODE_ANNUELLE =
  "sur l'année scolaire, et non sur douze mois glissants";

/** Ce que coûterait une année entière payée au mois : 30 €. Sert au calcul. */
export const ANNUEL_AU_TARIF_MENSUEL = PRIX_MENSUEL * 12;

/** L'économie réelle de la formule annuelle : 10,10 €. */
export const ECONOMIE_ANNUELLE = ANNUEL_AU_TARIF_MENSUEL - PRIX_ANNUEL;

/**
 * ⭐ COMBIEN DE MOIS L'ANNUEL FAIT-IL ÉCONOMISER — quatre, et non deux.
 *
 * ⛔ IL SE CALCULE. La grille du 01/09 annonçait « deux mois offerts » ; deux
 * mois de 2,50 € feraient 25 € par an, pas 19,90 €. L'offre est plus généreuse
 * que sa propre formule, et c'est le calcul qui a raison. Écrire « deux » à la
 * main, c'est publier un argument commercial plus faible que la vérité, et le
 * publier faux.
 */
export const MOIS_OFFERTS = Math.round(ECONOMIE_ANNUELLE / PRIX_MENSUEL);

/** « 34 % de moins qu'au mois » — calculé, jamais recopié. */
export const REDUCTION_ANNUEL_POURCENT = Math.round(
  (1 - PRIX_ANNUEL / ANNUEL_AU_TARIF_MENSUEL) * 100,
);

/**
 * Ce que l'annuel revient par mois : 1,66 €.
 * ⚠️ À n'afficher qu'À CÔTÉ du prix annuel, jamais seul — c'est un montant
 * qu'on ne facture pas, et affiché seul il devient une troisième formule.
 */
export const ANNUEL_EQUIVALENT_MENSUEL = PRIX_ANNUEL / 12;

/**
 * ⭐ L'ENSEIGNANT NE PAIE RIEN, ET SA GRATUITÉ NE SE PROPAGE PAS.
 *
 * ⚠️ LES DEUX MOITIÉS NE SE SÉPARENT JAMAIS. « Gratuit pour les enseignants »
 * dit seul se lit « gratuit pour ma classe », et c'est ce qu'un professeur
 * annoncera à ses familles de bonne foi. Ce qui est gratuit, c'est SON compte à
 * lui, à titre personnel. Les familles de ses élèves s'abonnent comme les
 * autres — ce qu'elles achètent est leur propre fenêtre, pas l'accès de
 * l'enfant, qui n'a jamais rien coûté.
 */
export const ENSEIGNANT = {
  gratuit: true,
  /** Ce qui ouvre la gratuité, et la seule chose qui l'ouvre. */
  verification: "une adresse académique en ac-*.fr",
  /** ⛔ Ne pas étendre sans décision : @education.gouv.fr, @ac-…-outremer, les
      académies d'outre-mer en `ac-reunion.fr` passent déjà par la règle. */
  perimetre:
    "le compte du professeur, à titre personnel — les familles de ses élèves s'abonnent comme les autres",
};

/**
 * L'adresse ouvre-t-elle la gratuité enseignant ?
 *
 * ⚠️ LA REGEX EST VOLONTAIREMENT ÉTROITE. `ac-reunion.fr`, `ac-paris.fr`,
 * `ac-aix-marseille.fr` passent ; `ac-truc.fr.pirate.com` et
 * `moi@monac-perso.fr` ne passent pas — d'où l'ancrage et le tiret exigé après
 * `ac`. ⛔ Une vérification par simple `includes("ac-")` ouvrirait le compte
 * gratuit à n'importe quel domaine contenant ces trois caractères.
 *
 * ⚠️ ELLE NE PROUVE RIEN À ELLE SEULE : elle dit que l'adresse a la bonne
 * forme, pas que la personne la relève. Le jour où la gratuité se branche pour
 * de bon, c'est un courriel de confirmation qui fait foi, pas cette fonction.
 */
export function estAdresseAcademique(courriel: string): boolean {
  return /^[^\s@]+@ac-[a-z0-9-]+\.fr$/i.test(courriel.trim());
}

/**
 * « 12 € », « 2 000 € » — un seul format d'écriture pour toute l'application.
 *
 * ⚠️ Le groupement se fait à la main, PAS avec `toLocaleString("fr-FR")` : le
 * formatage local dépend de la bibliothèque ICU présente, qui n'est pas la même
 * au rendu serveur et dans le navigateur. Un « 1 260 » d'un côté et un « 1,260 »
 * de l'autre, c'est un écart d'hydratation — et il ne se voit pas à la relecture.
 */
export function euros(montantEuros: number): string {
  const groupe = String(Math.trunc(montantEuros)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${groupe} €`;
}

/**
 * « 0,40 € » — pour les montants sous l'euro, qui ne se tronquent pas.
 * `euros()` afficherait « 0 € », ce qui est faux et se remarque.
 */
export function centimes(montantEuros: number): string {
  return `${montantEuros.toFixed(2).replace(".", ",")} €`;
}

/**
 * Le bon des deux, choisi tout seul : « 5 € » pour un compte rond, « 2,50 € »
 * sinon. ⚠️ Les deux prix de la grille du 01/09 ont des centimes : c'est
 * `centimes()` qui sort de cette fonction dans les deux cas, et c'est voulu —
 * « 19,9 € » ne s'écrit pas.
 */
export function montant(valeur: number): string {
  return Number.isInteger(valeur) ? euros(valeur) : centimes(valeur);
}

/**
 * « 34 % » — avec une ESPACE FINE INSÉCABLE (U+202F) avant le signe.
 *
 * ⚠️ CE DÉFAUT NE SE VOIT QUE DANS LE NAVIGATEUR, ET SEULEMENT EN ÉTROIT.
 * Écrit avec une espace ordinaire, « 34 % de moins » se coupait en « 34 » à la
 * fin d'une ligne et « % de moins » au début de la suivante, en 375 px, dans
 * l'encadré du prix annuel — c'est-à-dire à l'endroit le plus lu de la page.
 * Le code était juste, le rendu non.
 *
 * ⛔ RÉSERVÉ À L'AFFICHAGE. Ne pas s'en servir dans `/llms.txt` ni dans un
 * JSON-LD : ce sont des sorties lues par des machines, et un caractère
 * d'espacement exotique n'y apporte rien qu'un risque d'analyse.
 * ⚠️ Le caractère est écrit en littéral, pas calculé : `toLocaleString` dépend
 * de la bibliothèque ICU présente, qui n'est pas la même au rendu serveur et
 * dans le navigateur — c'est un écart d'hydratation, et il ne se voit pas à la
 * relecture.
 */
export function pourcent(valeur: number): string {
  return `${valeur} %`;
}
