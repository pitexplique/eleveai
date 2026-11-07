// Renfort proportions et évolutions du lycée : 2de, 1re (tronc commun), STMG (28/10/2026).
//
// Mesure du 27/10 (scripts/mesurer-squelettes-coach.ts) : 1 à 13 squelettes
// par micro (souvent UN seul gabarit), 13 à 19 répétitions sur 20. On branche
// les générateurs de la 4e (pourcentages, évolutions : 18 situations, plusieurs
// tournures) et des générateurs propres au lycée : proportion de proportion,
// variation absolue / relative, indices base 100, piège de compensation,
// écritures d’une proportion. Ni question « open » : QCM ou réponse courte.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  attendu,
  genAppliquerCoeff,
  genCoeffMillieme,
  genCoeffMult,
  genCoeffVersTaux,
  genDepart,
  genNouvelleValeur,
  genPourcentage,
  genRetour,
  genSuccessives,
  genTauxEvolution,
  genTauxGlobal,
  makeChoices,
} from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fr(n: number) {
  return (Math.round(n * 10000) / 10000).toLocaleString("fr-FR", { maximumFractionDigits: 4 }).replace(/ /g, " ");
}

/** « de le prix » → « du prix », « de les » → « des ». */
function de(gn: string) {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  return "de " + gn;
}

/** « à le loyer » → « au loyer », « à les » → « aux ». */
function aGn(gn: string) {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* ---------- Proportions : écritures, proportion de proportion ---------- */

const POPULATIONS = [
  { tout: "salariés d’une start-up", partie: "sont des ingénieures", sous: "travaillent en télétravail" },
  { tout: "élèves du lycée", partie: "sont internes", sous: "font du sport en club" },
  { tout: "clients d’une banque", partie: "ont moins de 30 ans", sous: "utilisent l’application mobile" },
  { tout: "visiteurs du musée Stella Matutina", partie: "sont des touristes", sous: "viennent d’Europe" },
  { tout: "abonnés d’une chaîne de cuisine", partie: "regardent sur téléphone", sous: "activent les sous-titres" },
  { tout: "patients d’une clinique", partie: "sont venus en urgence", sous: "repartent le jour même" },
  { tout: "électeurs d’une commune", partie: "ont voté", sous: "ont voté blanc" },
  { tout: "spectateurs d’un festival", partie: "ont acheté leur billet en ligne", sous: "ont payé un tarif réduit" },
  { tout: "agriculteurs d’un département", partie: "cultivent des céréales", sous: "sont en agriculture biologique" },
  { tout: "apprentis d’un CFA", partie: "préparent un CAP", sous: "sont des filles" },
  { tout: "joueuses d’une ligue de handball", partie: "ont moins de 18 ans", sous: "sont licenciées depuis 5 ans" },
  { tout: "passagers d’un vol Paris–Montréal", partie: "voyagent en classe éco", sous: "ont un bagage en soute" },
  { tout: "commandes d’une boutique en ligne", partie: "sont livrées à domicile", sous: "arrivent en moins de 48 h" },
  { tout: "étudiants d’une université", partie: "sont boursiers", sous: "ont un job étudiant" },
];

const FORMES: Array<[string, number]> = [
  ["1/2", 50], ["1/4", 25], ["3/4", 75], ["1/5", 20], ["2/5", 40], ["3/5", 60], ["1/8", 12.5], ["3/8", 37.5], ["1/10", 10], ["7/20", 35], ["9/25", 36], ["11/50", 22],
];

export function genFormes() {
  const g = randomChoice(POPULATIONS);
  const [f, p] = randomChoice(FORMES);
  const d = fr(p / 100);
  const t = randomInt(1, 4);
  if (t === 1)
    return {
      text: randomChoice([
        `${f} des ${g.tout} ${g.partie}. Écris cette proportion en pourcentage.`,
        `Parmi les ${g.tout}, la proportion de ceux qui ${g.partie} est ${f}. Combien cela fait-il en % ?`,
        `Une statisticienne note que ${f} des ${g.tout} ${g.partie}. Traduis en pourcentage.`,
      ]),
      format: "short" as const,
      expected: attendu(p, "%"),
      comparator: "number_equal" as const,
      explanation: expl("une proportion s’écrit en fraction, en décimal ou en pourcentage.", "on calcule la fraction, puis × 100.", `${f} = ${d} = ${fr(p)} %.`, `${fr(p)} % des ${g.tout} ${g.partie}.`),
    };
  if (t === 2)
    return {
      text: randomChoice([
        `La proportion des ${g.tout} qui ${g.partie} est ${fr(p)} %. Écris-la sous forme décimale.`,
        `${fr(p)} % des ${g.tout} ${g.partie}. Quelle est cette proportion en écriture décimale ?`,
        `Dans un tableur, on veut saisir « ${fr(p)} % » sous forme décimale (${g.tout}). Quel nombre tape-t-on ?`,
      ]),
      format: "short" as const,
      expected: [d],
      comparator: "number_equal" as const,
      explanation: expl("p % = p/100.", "on divise par 100.", `${fr(p)} ÷ 100 = ${d}.`, `la proportion vaut ${d}.`),
    };
  if (t === 3)
    return {
      text: randomChoice([
        `Une proportion vaut ${d}. Quel pourcentage cela représente-t-il ?`,
        `La part des ${g.tout} qui ${g.partie} vaut ${d}. Écris-la en pourcentage.`,
        `Un tableur affiche ${d} pour la proportion des ${g.tout} qui ${g.partie}. Combien de % ?`,
      ]),
      format: "short" as const,
      expected: attendu(p, "%"),
      comparator: "number_equal" as const,
      explanation: expl("p % = p/100.", "on multiplie par 100.", `${d} × 100 = ${fr(p)}.`, `${d} = ${fr(p)} %.`),
    };
  return {
    text: randomChoice([
      `${fr(p)} % des ${g.tout} ${g.partie}. Quelle fraction est égale à cette proportion ?`,
      `Quelle fraction des ${g.tout} ${g.partie}, sachant que c’est ${fr(p)} % d’entre eux ?`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(f, FORMES.map((x) => x[0])),
    expected: [f],
    comparator: "mcq_exact" as const,
    explanation: expl("p % = p/100.", "on écrit p/100 et on simplifie.", `${fr(p)}/100 = ${f}.`, `${fr(p)} % = ${f}.`),
  };
}

/** Partie, tout ou proportion, avec un effectif. */
export function genPartieTout(type: "taux" | "partie" | "total") {
  const g = randomChoice(POPULATIONS);
  const p = randomChoice([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75, 80]);
  const N = randomChoice([200, 400, 500, 800, 1000, 1200, 2000, 2400]);
  const k = (N * p) / 100;
  if (type === "taux")
    return {
      text: randomChoice([
        `Sur ${fr(N)} ${g.tout}, ${fr(k)} ${g.partie}. Quelle proportion, en %, cela représente-t-il ?`,
        `${fr(k)} des ${fr(N)} ${g.tout} ${g.partie}. Calcule leur proportion en pourcentage.`,
        `Il y a ${fr(N)} ${g.tout} ; ${fr(k)} d’entre eux ${g.partie}. Quel pourcentage ${g.partie} ?`,
      ]),
      format: "short" as const,
      expected: attendu(p, "%"),
      comparator: "number_equal" as const,
      explanation: expl("proportion = partie ÷ tout.", "on divise, puis × 100.", `${fr(k)} ÷ ${fr(N)} = ${fr(p / 100)}.`, `cela représente ${fr(p)} %.`),
    };
  if (type === "partie")
    return {
      text: randomChoice([
        `Il y a ${fr(N)} ${g.tout} ; ${fr(p)} % d’entre eux ${g.partie}. Combien sont-ils ?`,
        `${fr(p)} % des ${fr(N)} ${g.tout} ${g.partie}. Calcule leur effectif.`,
        `Sur ${fr(N)} ${g.tout}, combien ${g.partie}, sachant que c’est ${fr(p)} % ?`,
      ]),
      format: "short" as const,
      expected: attendu(k),
      comparator: "number_equal" as const,
      explanation: expl("partie = proportion × tout.", `${fr(p)} % = ${fr(p / 100)}.`, `${fr(p / 100)} × ${fr(N)} = ${fr(k)}.`, `ils sont ${fr(k)}.`),
    };
  return {
    text: randomChoice([
      `${fr(k)} ${g.tout} ${g.partie}, ce qui représente ${fr(p)} % de l’ensemble. Combien y a-t-il de ${g.tout} en tout ?`,
      `On compte ${fr(k)} ${g.tout} qui ${g.partie}, soit ${fr(p)} % du total. Quel est le total ?`,
      `${fr(p)} % des ${g.tout} ${g.partie} : ils sont ${fr(k)}. Retrouve l’effectif total.`,
    ]),
    format: "short" as const,
    expected: attendu(N),
    comparator: "number_equal" as const,
    explanation: expl("tout = partie ÷ proportion.", `${fr(p)} % = ${fr(p / 100)}.`, `${fr(k)} ÷ ${fr(p / 100)} = ${fr(N)}.`, `il y en a ${fr(N)} en tout.`),
  };
}

/** Proportion de proportion : p1 % de la population, dont p2 % ; ou l’inverse. */
export function genPctDePct(niveau: 2 | 3 | 4) {
  const g = randomChoice(POPULATIONS);
  const p1 = randomChoice([20, 40, 50, 60, 80]);
  const p2 = randomChoice([10, 25, 30, 50, 75]);
  const p = (p1 * p2) / 100;
  if (niveau === 4 && Math.random() < 0.5) {
    return {
      text: `${p1} % des ${g.tout} ${g.partie}, et ${fr(p)} % de l’ensemble ${g.partie} ET ${g.sous}. Parmi ceux qui ${g.partie}, quel pourcentage ${g.sous} ?`,
      format: "short" as const,
      expected: attendu(p2, "%"),
      comparator: "number_equal" as const,
      explanation: expl("la proportion d’une partie dans le tout est le produit des proportions.", `on cherche p tel que ${p1} % × p = ${fr(p)} %.`, `${fr(p / 100)} ÷ ${fr(p1 / 100)} = ${fr(p2 / 100)}.`, `${p2} % d’entre eux ${g.sous}.`),
    };
  }
  const t = randomInt(1, 5);
  const text =
    t === 4
      ? `Une enquête : ${p1} % des ${g.tout} ${g.partie}, et parmi eux ${p2} % ${g.sous}. Quelle part de tous les ${g.tout}, en % ?`
      : t === 5
      ? `Arbre : ${g.tout} → ${p1} % ${g.partie} → dont ${p2} % ${g.sous}. Proportion finale par rapport à l’ensemble, en % ?`
      : t === 1
      ? `${p1} % des ${g.tout} ${g.partie}. Parmi eux, ${p2} % ${g.sous}. Quel pourcentage de l’ensemble des ${g.tout} est concerné par les deux ?`
      : t === 2
        ? `Parmi les ${g.tout}, ${p1} % ${g.partie} ; ${p2} % de ces derniers ${g.sous}. Quelle proportion, en %, de l’ensemble cela représente-t-il ?`
        : `On sait que ${p1} % des ${g.tout} ${g.partie} et que ${p2} % d’entre eux ${g.sous}. Calcule cette proportion par rapport à tous les ${g.tout}, en %.`;
  return {
    text,
    format: "short" as const,
    expected: attendu(p, "%"),
    comparator: "number_equal" as const,
    explanation: expl("une proportion d’une proportion se calcule en multipliant les proportions.", `${p2} % de ${p1} %.`, `${fr(p1 / 100)} × ${fr(p2 / 100)} = ${fr(p / 100)}.`, `cela représente ${fr(p)} % de l’ensemble.`),
  };
}

/* ---------- Variation absolue / relative ---------- */

// ⛔ La Réunion ≈ 4 % des contextes : ces réservoirs servent à toute la filière.
// Toutes les valeurs sont des multiples de 100 : un effectif reste entier avec un taux entier.
const GRANDEURS = [
  { quoi: "le nombre d’habitants d’une ville", u: "habitants", v: [80000, 84000, 85000, 90000] },
  { quoi: "le chiffre d’affaires d’une pâtissière", u: "€", v: [40000, 50000, 60000, 80000] },
  { quoi: "le nombre d’abonnés d’une vidéaste", u: "abonnés", v: [2000, 4000, 5000, 8000] },
  { quoi: "le loyer d’un studio", u: "€", v: [400, 500, 600, 800] },
  { quoi: "le nombre de visiteurs d’un parc naturel", u: "visiteurs", v: [20000, 25000, 40000] },
  { quoi: "le salaire mensuel d’un technicien", u: "€", v: [1500, 2000, 2500] },
  { quoi: "la récolte de pommes d’un verger", u: "kg", v: [1200, 1500, 2000] },
  { quoi: "le nombre de passagers d’une compagnie aérienne", u: "passagers", v: [10000, 20000, 50000] },
];

export function genAbsRel(niveau: 2 | 3 | 4) {
  const g = randomChoice(GRANDEURS);
  const v0 = randomChoice(g.v);
  const t = randomChoice(niveau === 2 ? [10, 20, 25, 50] : [5, 12, 15, 30, 35, -10, -20, -25]);
  const v1 = v0 * (1 + t / 100);
  const abs = v1 - v0;
  const unite = g.u === "€" || g.u === "kg" ? g.u : "";
  const type = niveau === 2 ? randomChoice(["abs", "rel"]) : randomChoice(["abs", "rel", "qcm"]);
  const suffixe = unite ? " " + unite : "";
  // ⛔ Pas de « est passé » : le sujet peut être féminin (la récolte de pommes…).
  const intro = randomChoice([
    `${cap(g.quoi)} passe de ${fr(v0)} à ${fr(v1)}${suffixe}.`,
    `En un an, ${g.quoi} passe de ${fr(v0)} à ${fr(v1)}${suffixe}.`,
    `Valeur de départ : ${fr(v0)}${suffixe} ; valeur d’arrivée : ${fr(v1)}${suffixe} (${g.quoi}).`,
  ]);
  if (type === "abs")
    return {
      text: `${intro} Quelle est la variation absolue${unite ? `, en ${unite}` : ""} ?`,
      format: "short" as const,
      expected: attendu(abs, unite),
      comparator: "number_equal" as const,
      explanation: expl("variation absolue = valeur d’arrivée − valeur de départ.", "on soustrait.", `${fr(v1)} − ${fr(v0)} = ${fr(abs)}.`, `la variation absolue est ${fr(abs)}${unite ? " " + unite : ""}.`),
    };
  if (type === "rel")
    return {
      text: `${intro} Quelle est la variation relative, en % ?`,
      format: "short" as const,
      expected: attendu(t, "%"),
      comparator: "number_equal" as const,
      explanation: expl("variation relative = (arrivée − départ) ÷ départ.", "on divise la variation absolue par la valeur de départ.", `${fr(abs)} ÷ ${fr(v0)} = ${fr(t / 100)}.`, `la variation relative est ${t > 0 ? "+" : ""}${fr(t)} %.`),
    };
  const bon = `${t > 0 ? "+" : ""}${fr(t)} %`;
  return {
    text: `${intro} Quelle est la variation relative ?`,
    format: "qcm" as const,
    choices: makeChoices(bon, [`${t > 0 ? "+" : ""}${fr(abs)}`, `${fr(-t)} %`, `${fr(Math.round((abs / v1) * 1000) / 10)} %`, `${fr(t / 100)} %`]),
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl("variation relative = (arrivée − départ) ÷ départ.", "on divise par la valeur de DÉPART.", `${fr(abs)} ÷ ${fr(v0)} = ${fr(t / 100)}.`, `la variation relative est ${bon}.`),
  };
}

/* ---------- Piège de compensation ---------- */

export function genCompensation(niveau: 2 | 3 | 4) {
  const g = randomChoice(GRANDEURS);
  const t = randomChoice([10, 20, 25, 30, 40, 50]);
  const hausseDabord = Math.random() < 0.5;
  const global = -(t * t) / 100;
  const ordre = hausseDabord ? `augmente de ${t} %, puis baisse de ${t} %` : `baisse de ${t} %, puis augmente de ${t} %`;
  if (niveau <= 3) {
    const bon = "elle a baissé";
    return {
      text: randomChoice([
        `${cap(g.quoi)} ${ordre}. Par rapport au départ, la valeur :`,
        `Une grandeur (${g.quoi}) ${ordre}. Que peut-on dire de sa valeur finale ?`,
        `On remarque que ${g.quoi} ${ordre}. Par rapport au départ, sa valeur :`,
        `Vrai ou faux ? « ${cap(g.quoi)} ${ordre} : on revient au point de départ. » Que se passe-t-il vraiment ?`,
      ]),
      format: "qcm" as const,
      choices: makeChoices(bon, ["elle est revenue au départ", "elle a augmenté", "on ne peut pas savoir"]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation: expl("des évolutions successives se composent en MULTIPLIANT les coefficients.", `coefficient global : ${fr(1 + t / 100)} × ${fr(1 - t / 100)}.`, `= ${fr(1 + global / 100)} < 1.`, `la valeur a baissé de ${fr(-global)} % : les ${t} % ne se compensent pas.`),
    };
  }
  return {
    text: randomChoice([
      `${cap(g.quoi)} ${ordre}. Quel est le taux d’évolution global, en % ?`,
      `Une grandeur ${ordre}. Donne le taux d’évolution global, en %.`,
    ]),
    format: "short" as const,
    expected: attendu(global, "%"),
    comparator: "number_equal" as const,
    explanation: expl("taux global = coefficient global − 1.", `${fr(1 + t / 100)} × ${fr(1 - t / 100)} = ${fr(1 + global / 100)}.`, `${fr(1 + global / 100)} − 1 = ${fr(global / 100)}.`, `le taux global est ${fr(global)} %.`),
  };
}

/* ---------- Additif ou multiplicatif ---------- */

/** ⛔ `sens: "baisse"` pour la micro « diminution » : sans lui, le niveau 2 ou 3 peut tirer une hausse. */
export function genAddMult(niveau: 1 | 2 | 3, sens?: "baisse") {
  const t = randomChoice([5, 10, 20, 25, 30, 50]);
  const baisse = sens === "baisse" || (niveau > 1 && Math.random() < 0.5);
  const c = fr(baisse ? 1 - t / 100 : 1 + t / 100);
  const g = randomChoice(GRANDEURS);
  const verbe = baisse ? "Diminuer" : "Augmenter";
  const bon = `multiplier par ${c}`;
  return {
    text: randomChoice([
      `${verbe} une valeur de ${t} %, cela revient à :`,
      `${cap(g.quoi)} va ${baisse ? "diminuer" : "augmenter"} de ${t} %. Cela revient à :`,
      `Pour ${baisse ? "baisser" : "augmenter"} ${g.quoi} de ${t} %, on doit :`,
      `Un gestionnaire veut appliquer ${baisse ? "une baisse" : "une hausse"} de ${t} % ${aGn(g.quoi)}. Quelle opération ?`,
      `Dans un tableur, pour ${baisse ? "diminuer" : "augmenter"} une cellule de ${t} %, quelle opération faut-il faire ?`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(bon, [`${baisse ? "soustraire" : "ajouter"} ${t}`, `multiplier par ${fr(t / 100)}`, `multiplier par ${t}`, `multiplier par ${fr(baisse ? 1 + t / 100 : 1 - t / 100)}`]),
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl("une évolution en pourcentage est MULTIPLICATIVE.", `${baisse ? "baisser" : "augmenter"} de ${t} %, c’est multiplier par 1 ${baisse ? "−" : "+"} ${fr(t / 100)}.`, `1 ${baisse ? "−" : "+"} ${fr(t / 100)} = ${c}.`, `on multiplie par ${c}.`),
  };
}

/* ---------- Un seul geste : baisse, valeur initiale, coefficient global ---------- */

/** Nouvelle valeur après une BAISSE. ⛔ genNouvelleValeur peut tirer une hausse : il ne convient pas à la micro « diminution ». */
export function genApresBaisse(taux: number[]) {
  const g = randomChoice(GRANDEURS);
  const v0 = randomChoice(g.v);
  const t = randomChoice(taux);
  const v1 = (v0 * (100 - t)) / 100;
  const c = (100 - t) / 100;
  const unite = g.u === "€" || g.u === "kg" ? g.u : "";
  const suffixe = unite ? " " + unite : "";
  return {
    text: randomChoice([
      `${cap(g.quoi)} vaut ${fr(v0)}${suffixe} et baisse de ${t} %. Quelle est sa nouvelle valeur ?`,
      `${cap(g.quoi)} diminue de ${t} % à partir de ${fr(v0)}${suffixe}. Calcule sa nouvelle valeur.`,
      `Départ : ${fr(v0)}${suffixe} (${g.quoi}). Après une baisse de ${t} %, combien obtient-on ?`,
      `On prévoit une baisse de ${t} % sur ${g.quoi}, qui vaut ${fr(v0)}${suffixe}. Que devient cette valeur ?`,
    ]),
    format: "short" as const,
    expected: attendu(v1, unite),
    comparator: "number_equal" as const,
    explanation: expl("une baisse de t % revient à multiplier par 1 − t/100.", `baisser de ${t} %, c’est multiplier par ${fr(c)}.`, `${fr(v0)} × ${fr(c)} = ${fr(v1)}.`, `la nouvelle valeur est ${fr(v1)}${suffixe}.`),
  };
}

const ARTICLES_PRIX = ["un vélo", "une tablette", "un casque audio", "une paire de baskets", "un sac de sport", "une guitare", "un billet de concert", "une montre connectée"];

/**
 * Valeur initiale en UN geste : on divise par un seul coefficient.
 * « remise » : prix avant une remise ; « hausse » : valeur avant une hausse ; « ttc » : du TTC vers le HT.
 * ⛔ genDepart enchaîne deux évolutions : trop haut pour découvrir la micro.
 */
export function genValeurInitiale(type: "remise" | "hausse" | "ttc") {
  if (type === "remise") {
    const objet = randomChoice(ARTICLES_PRIX);
    const t = randomChoice([10, 20, 25, 50]);
    const v0 = randomChoice([40, 60, 80, 100, 120, 200, 300, 400]);
    const c = (100 - t) / 100;
    const v1 = (v0 * (100 - t)) / 100;
    return {
      text: randomChoice([
        `Après une remise de ${t} %, ${objet} coûte ${fr(v1)} €. Quel était son prix avant la remise ?`,
        `On paie ${objet} ${fr(v1)} € après une remise de ${t} %. Quel était le prix avant la remise ?`,
        `Pendant les soldes, le prix ${de(objet).replace(/^de un/, "d’un")} est de ${fr(v1)} €, soit ${t} % de moins qu’avant. Quel était ce prix avant les soldes ?`,
        `Prix après une remise de ${t} % : ${fr(v1)} €. Quel était le prix de départ ?`,
      ]),
      format: "short" as const,
      expected: attendu(v0, "€"),
      comparator: "number_equal" as const,
      explanation: expl("prix de départ × coefficient = prix final.", `une remise de ${t} %, c’est × ${fr(c)} ; pour remonter, on DIVISE par ${fr(c)}.`, `${fr(v1)} ÷ ${fr(c)} = ${fr(v0)}.`, `le prix de départ était ${fr(v0)} € ⚠️ ajouter ${t} % à ${fr(v1)} € ne redonne pas ce prix, car la remise porte sur l’ancien prix.`),
    };
  }
  if (type === "hausse") {
    const g = randomChoice(GRANDEURS);
    const t = randomChoice([10, 20, 25, 50]);
    const v0 = randomChoice(g.v);
    const c = (100 + t) / 100;
    const v1 = (v0 * (100 + t)) / 100;
    const unite = g.u === "€" || g.u === "kg" ? g.u : "";
    const suffixe = unite ? " " + unite : "";
    return {
      text: randomChoice([
        `Après une hausse de ${t} %, ${g.quoi} vaut ${fr(v1)}${suffixe}. Quelle était sa valeur avant la hausse ?`,
        `${cap(g.quoi)} a gagné ${t} % et atteint ${fr(v1)}${suffixe}. Quelle était sa valeur de départ ?`,
        `Valeur après une hausse de ${t} % : ${fr(v1)}${suffixe} (${g.quoi}). Quelle était la valeur de départ ?`,
      ]),
      format: "short" as const,
      expected: attendu(v0, unite),
      comparator: "number_equal" as const,
      explanation: expl("valeur de départ × coefficient = valeur finale.", `une hausse de ${t} %, c’est × ${fr(c)} ; pour remonter, on DIVISE par ${fr(c)}.`, `${fr(v1)} ÷ ${fr(c)} = ${fr(v0)}.`, `la valeur de départ était ${fr(v0)}${suffixe}.`),
    };
  }
  const objet = randomChoice(ARTICLES_PRIX);
  const t = randomChoice([10, 20]);
  const ht = randomChoice([50, 100, 150, 200, 300, 500, 1000]);
  const c = (100 + t) / 100;
  const ttc = (ht * (100 + t)) / 100;
  return {
    text: randomChoice([
      `${cap(objet)} coûte ${fr(ttc)} € TTC, avec une TVA de ${t} %. Quel est son prix hors taxes (HT), en € ?`,
      `Une facture indique ${fr(ttc)} € TTC, avec une TVA à ${t} %. Quel est le montant HT, en € ?`,
      `Prix TTC : ${fr(ttc)} €. Taux de TVA : ${t} %. Calcule le prix HT, en €.`,
    ]),
    format: "short" as const,
    expected: attendu(ht, "€"),
    comparator: "number_equal" as const,
    explanation: expl("prix TTC = prix HT × (1 + taux de TVA).", `une TVA de ${t} %, c’est × ${fr(c)} ; pour revenir au HT, on DIVISE par ${fr(c)}.`, `${fr(ttc)} ÷ ${fr(c)} = ${fr(ht)}.`, `le prix HT est ${fr(ht)} € ⚠️ retirer ${t} % du TTC ne donne pas le HT.`),
  };
}

/** Deux évolutions enchaînées : le coefficient global, produit des deux coefficients. */
export function genCoeffGlobal() {
  const g = randomChoice(GRANDEURS);
  const a = randomChoice([10, 20, 25, 30, 50]);
  const b = randomChoice([10, 20, 25, 30, 50]);
  const h1 = Math.random() < 0.5;
  const h2 = Math.random() < 0.5;
  const c1 = h1 ? 100 + a : 100 - a;
  const c2 = h2 ? 100 + b : 100 - b;
  const cg = (c1 * c2) / 10000;
  const e1 = `${h1 ? "hausse" : "baisse"} de ${a} %`;
  const e2 = `${h2 ? "hausse" : "baisse"} de ${b} %`;
  return {
    text: randomChoice([
      `Une ${e1} est suivie d’une ${e2}. Quel est le coefficient multiplicateur global ?`,
      `${cap(g.quoi)} subit une ${e1}, puis une ${e2}. Par quel nombre sa valeur de départ est-elle multipliée au total ?`,
      `Dans un tableur, on multiplie une cellule par ${fr(c1 / 100)}, puis par ${fr(c2 / 100)}. Par quel nombre unique aurait-on pu la multiplier ?`,
      `On applique ${aGn(g.quoi)} une ${e1} puis une ${e2}. Donne le coefficient global.`,
    ]),
    format: "short" as const,
    expected: [fr(cg)],
    comparator: "number_equal" as const,
    explanation: expl("des évolutions successives se composent en MULTIPLIANT les coefficients.", `${e1} : × ${fr(c1 / 100)} ; ${e2} : × ${fr(c2 / 100)}.`, `${fr(c1 / 100)} × ${fr(c2 / 100)} = ${fr(cg)}.`, `le coefficient global est ${fr(cg)}.`),
  };
}

/* ---------- Indices base 100 ---------- */

const SERIES_INDICE = [
  { quoi: "le prix moyen du m² dans une grande ville", u: "€", v0: [2000, 2500, 3000] },
  { quoi: "le nombre de visiteurs d’un musée national", u: "", v0: [400000, 500000] },
  { quoi: "le prix du litre de gazole", u: "€", v0: [1.2, 1.5, 1.6] },
  { quoi: "le chiffre d’affaires d’une coopérative laitière", u: "€", v0: [200000, 250000, 400000] },
  { quoi: "le nombre d’apprentis d’un CFA", u: "", v0: [800, 1000, 1200] },
  { quoi: "le loyer moyen d’un T2", u: "€", v0: [500, 600, 800] },
  { quoi: "le prix du kilo de tomates", u: "€", v0: [2, 2.5, 4] },
  { quoi: "le nombre d’abonnés au réseau de bus", u: "", v0: [20000, 25000, 40000] },
  { quoi: "le prix d’un billet d’avion long-courrier", u: "€", v0: [600, 800, 900] },
  { quoi: "la consommation d’électricité d’une commune", u: "MWh", v0: [5000, 8000, 10000] },
];

/** Deux indices dont aucun n'est 100 : le taux se calcule comme pour des valeurs, l'écart n'est pas un pourcentage. */
function genDeuxIndices() {
  const s = randomChoice(SERIES_INDICE);
  const a0 = randomChoice([2015, 2016, 2018]);
  const a1 = a0 + randomInt(1, 3);
  const a2 = a1 + randomInt(1, 3);
  let i1 = 120;
  let t = 25;
  // Le second indice tombe juste, et l'écart des indices diffère toujours du taux (i1 ≠ 100).
  for (let essai = 0; essai < 100; essai++) {
    i1 = randomChoice([80, 90, 110, 120, 125, 130, 140, 150, 160, 180, 200, 250]);
    t = randomChoice([-20, -10, 10, 20, 25, 50]);
    if ((i1 * t) % 100 === 0) break;
  }
  const i2 = (i1 * (100 + t)) / 100;
  const ecart = i2 - i1;
  const signe = (n: number) => `${n > 0 ? "+" : ""}${fr(n)} %`;
  const explanation = expl("un indice est proportionnel à la grandeur : le taux entre deux indices se calcule comme entre deux valeurs.", "taux = (indice d’arrivée − indice de départ) ÷ indice de départ.", `(${i2} − ${i1}) ÷ ${i1} = ${fr(ecart)} ÷ ${i1} = ${fr(t / 100)}.`, `l’évolution est de ${signe(t)} ⚠️ et non de ${signe(ecart)} : l’écart ne se lit en % que depuis l’indice 100.`);
  if (Math.random() < 0.3) {
    const bon = signe(t);
    return {
      text: `L’indice ${de(s.quoi)} passe de ${i1} en ${a1} à ${i2} en ${a2} (base 100 en ${a0}). Quelle est l’évolution entre ${a1} et ${a2} ?`,
      format: "qcm" as const,
      choices: makeChoices(bon, [signe(ecart), signe(i2 - 100), signe(-t), signe(Math.round((ecart / i2) * 1000) / 10)]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation,
    };
  }
  return {
    text: randomChoice([
      `Base 100 en ${a0} : l’indice ${de(s.quoi)} vaut ${i1} en ${a1} et ${i2} en ${a2}. Quel est le taux d’évolution entre ${a1} et ${a2}, en % ? (négatif pour une baisse)`,
      `${cap(s.quoi)} : indice ${i1} en ${a1}, indice ${i2} en ${a2} (base 100 en ${a0}). De combien de % la valeur évolue-t-elle entre ces deux années ? (négatif pour une baisse)`,
      `Entre ${a1} et ${a2}, l’indice ${de(s.quoi)} passe de ${i1} à ${i2}. Quel taux d’évolution cela représente-t-il, en % ? (négatif pour une baisse)`,
      `Tableau d’indices ${de(s.quoi)} : ${a0} → 100 ; ${a1} → ${i1} ; ${a2} → ${i2}. Taux d’évolution de ${a1} à ${a2}, en % ? (négatif pour une baisse)`,
    ]),
    format: "short" as const,
    expected: attendu(t, "%"),
    comparator: "number_equal" as const,
    explanation,
  };
}

export function genIndice(type: "interpreter" | "calculer" | "vers_taux" | "comparer" | "deux_indices") {
  if (type === "deux_indices") return genDeuxIndices();
  const s = randomChoice(SERIES_INDICE);
  const a0 = randomChoice([2018, 2019, 2020]);
  const a1 = a0 + randomInt(2, 6);
  const t = randomChoice([4, 8, 12, 15, 20, 25, -5, -10, -15]);
  const I = 100 + t;
  if (type === "interpreter" || type === "vers_taux") {
    const text =
      type === "interpreter"
        ? randomChoice([
            `L’indice ${de(s.quoi)}, base 100 en ${a0}, vaut ${I} en ${a1}. Quel est le taux d’évolution entre ${a0} et ${a1}, en % ?`,
            `Base 100 en ${a0} : en ${a1}, ${s.quoi} a pour indice ${I}. Quelle est son évolution, en % ?`,
            `Une économiste publie l’indice ${de(s.quoi)} : 100 en ${a0}, ${I} en ${a1}. Quelle évolution en % ?`,
            `Indice ${I} en ${a1} pour ${s.quoi} (base 100 : ${a0}). Interprète : quel taux d’évolution, en % ?`,
          ])
        : randomChoice([
            `Indice ${I} en ${a1} (base 100 en ${a0}) pour ${s.quoi}. Donne le taux d’évolution correspondant, en %.`,
            `${cap(s.quoi)} : indice ${a1} = ${I}, base 100 en ${a0}. Traduis cet indice en taux d’évolution, en %.`,
            `Passer de l’indice 100 (${a0}) à l’indice ${I} (${a1}) pour ${s.quoi}, c’est une évolution de combien de % ?`,
            `Tableau d’indices ${de(s.quoi)} : ${a0} → 100 ; ${a1} → ${I}. Taux d’évolution global, en % ?`,
          ]);
    return {
      text,
      format: "short" as const,
      expected: attendu(t, "%"),
      comparator: "number_equal" as const,
      explanation: expl("un indice base 100 : I = 100 × valeur ÷ valeur de base.", "taux = I − 100, en %.", `${I} − 100 = ${t}.`, `${s.quoi} a évolué de ${t > 0 ? "+" : ""}${t} %.`),
    };
  }
  if (type === "calculer") {
    const v0 = randomChoice(s.v0);
    const v1 = (v0 * I) / 100;
    return {
      text: randomChoice([
        `${cap(s.quoi)} vaut ${fr(v0)}${s.u ? " " + s.u : ""} en ${a0} et ${fr(v1)}${s.u ? " " + s.u : ""} en ${a1}. Calcule l’indice de ${a1}, base 100 en ${a0}.`,
        `En prenant ${a0} comme base 100, quel est l’indice de ${a1} pour ${s.quoi} (${fr(v0)} puis ${fr(v1)}${s.u ? " " + s.u : ""}) ?`,
        `Un analyste suit ${s.quoi} : ${fr(v0)} en ${a0}, ${fr(v1)} en ${a1}. Indice de ${a1}, base 100 en ${a0} ?`,
        `Complète le tableau d’indices ${de(s.quoi)} : ${a0} → ${fr(v0)} (indice 100) ; ${a1} → ${fr(v1)} (indice ?).`,
      ]),
      format: "short" as const,
      expected: attendu(I),
      comparator: "number_equal" as const,
      explanation: expl("I = 100 × valeur ÷ valeur de base.", `on divise par la valeur de ${a0}, puis × 100.`, `100 × ${fr(v1)} ÷ ${fr(v0)} = ${I}.`, `l’indice de ${a1} est ${I}.`),
    };
  }
  const autre = randomChoice(SERIES_INDICE.filter((x) => x !== s));
  const J = 100 + randomChoice([3, 6, 10, 18, 22, -8]);
  if (J === I) return genIndice("interpreter");
  const bon = I > J ? s.quoi : autre.quoi;
  return {
    text: `Base 100 en ${a0}. En ${a1}, l’indice ${de(s.quoi)} vaut ${I} et celui ${de(autre.quoi)} vaut ${J}. Lequel a le plus augmenté (ou le moins baissé) en pourcentage ?`,
    format: "qcm" as const,
    choices: [s.quoi, autre.quoi, "on ne peut pas comparer"],
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl("deux indices de même base se comparent directement : I − 100 est le taux d’évolution.", "on compare les indices.", `${I} − 100 = ${I - 100} % ; ${J} − 100 = ${J - 100} %.`, `c’est ${bon}.`),
  };
}

/* ---------- Gabarits et fusion ---------- */

function tplLycee(niveau: "seconde" | "premiere" | "stmg", notionId: string, microId: string, difficulty: number, rang: number, generate: () => any, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${niveau}_renfort_${microId}_${difficulty}_${rang}`,
    niveau,
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [notionId, "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

/**
 * Les micros renforcées perdent leurs anciens gabarits et leurs items « open » ; les autres ne bougent pas.
 * `garder` : ids d'anciens gabarits qui posent un geste que le renfort n'a pas, et qui restent donc servis.
 */
export function fusionnerRenfort(anciens: TutorBankItemV4[], renfort: TutorBankItemV4[], garder: readonly string[] = []): TutorBankItemV4[] {
  const renforcees = new Set(renfort.map((i) => `${i.notionId}/${i.microId}`));
  return [
    ...anciens.filter((i) => !renforcees.has(`${i.notionId}/${i.microId}`) || (i.kind === "fixed" && (i as any).format !== "open") || garder.includes(i.id)),
    ...renfort,
  ];
}

const H_PROP = "Proportion = partie ÷ tout ; p % = p/100.";
const H_EVO = "Hausse de t % : × (1 + t/100) ; baisse : × (1 − t/100).";
const H_ABS = "Variation relative = (arrivée − départ) ÷ départ.";
const H_VI = "Pour remonter à la valeur de départ, on DIVISE par le coefficient multiplicateur.";
// ⛔ « indice − 100 » n'est le taux que depuis l'année de base : l'aide le dit, c'est tout le piège.
const H_IND = "Depuis l’année de base (indice 100), le taux d’évolution vaut indice − 100.";
const H_IND_CALC = "Indice = 100 × valeur ÷ valeur de l’année de base.";
const H_IND_TAUX = "Entre deux indices qui ne partent pas de 100 : taux = (arrivée − départ) ÷ départ. L’écart seul n’est pas un pourcentage.";
const H_IND_COMP = "Deux indices de même base se comparent directement.";

const PCT_SIMPLES = [5, 10, 20, 25, 30, 40, 50, 75];
const PCT_DIFF = [5, 12, 15, 35, 45, 60];

type Ligne = [string, string, number, () => any, string];

function construire(niveau: "seconde" | "premiere" | "stmg", lignes: Ligne[]) {
  const rangs = new Map<string, number>();
  return lignes.map(([notion, micro, d, g, h]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return tplLycee(niveau, notion, micro, d, r, g, h);
  });
}

const N2 = "information_chiffree_evolutions";
export const renfortSeconde = construire("seconde", [
  [N2, "info_proportion", 2, () => genPourcentage(["partie", "taux"], PCT_SIMPLES), H_PROP],
  [N2, "info_proportion", 2, () => genFormes(), H_PROP],
  [N2, "info_proportion", 3, () => genPourcentage(["partie", "taux"], PCT_DIFF), H_PROP],
  [N2, "info_proportion", 3, () => genFormes(), H_PROP],
  [N2, "info_proportion", 4, () => genPourcentage(["total"], PCT_SIMPLES), H_PROP],
  [N2, "info_proportion", 4, () => genPartieTout("total"), H_PROP],
  [N2, "info_pourcentage_de_pourcentage", 2, () => genPctDePct(2), H_PROP],
  [N2, "info_pourcentage_de_pourcentage", 3, () => genPctDePct(3), H_PROP],
  [N2, "info_pourcentage_de_pourcentage", 4, () => genPctDePct(4), H_PROP],
  [N2, "info_variation_absolue_relative", 2, () => genAbsRel(2), H_ABS],
  [N2, "info_variation_absolue_relative", 3, () => genAbsRel(3), H_ABS],
  [N2, "info_variation_absolue_relative", 4, () => genAbsRel(4), H_ABS],
  [N2, "info_taux_evolution", 2, () => genTauxEvolution(PCT_SIMPLES), H_EVO],
  [N2, "info_taux_evolution", 2, () => genCoeffMult("short", "mixte", PCT_SIMPLES), H_EVO],
  [N2, "info_taux_evolution", 3, () => genNouvelleValeur(PCT_DIFF), H_EVO],
  [N2, "info_taux_evolution", 3, () => genCoeffVersTaux(PCT_SIMPLES), H_EVO],
  [N2, "info_taux_evolution", 4, () => genTauxEvolution(PCT_DIFF), H_EVO],
  [N2, "info_taux_evolution", 4, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [N2, "info_taux_evolution", 4, () => genCoeffMillieme(), H_EVO],
  [N2, "info_evolutions_successives", 3, () => genSuccessives(true), H_EVO],
  [N2, "info_evolutions_successives", 3, () => genSuccessives(false), H_EVO],
  [N2, "info_evolutions_successives", 4, () => genTauxGlobal(), H_EVO],
  [N2, "info_evolutions_successives", 4, () => genCompensation(4), H_EVO],
  // ⛔ genCoeffMillieme n'a qu'un seul coefficient : rangé dans « taux d'évolution ».
  [N2, "info_evolutions_successives", 5, () => genCoeffGlobal(), H_EVO],
  [N2, "info_evolutions_successives", 5, () => genTauxGlobal(), H_EVO],
  [N2, "info_evolution_reciproque", 3, () => genRetour(), H_EVO],
  [N2, "info_evolution_reciproque", 3, () => genCompensation(3), H_EVO],
  [N2, "info_evolution_reciproque", 4, () => genDepart(), H_EVO],
  [N2, "info_evolution_reciproque", 4, () => genRetour(), H_EVO],
  [N2, "info_evolution_reciproque", 5, () => genDepart(), H_EVO],
  [N2, "info_evolution_reciproque", 5, () => genRetour(), H_EVO],
]);

const AP = "auto_proportion";
const PT = "auto_partie_tout";
const CM = "auto_coefficient_multiplicateur";
const TE = "auto_taux_evolution";
export const renfortPremiere = construire("premiere", [
  [AP, "auto_prop_calculer", 2, () => genPourcentage(["taux"], PCT_SIMPLES), H_PROP],
  [AP, "auto_prop_calculer", 2, () => genPartieTout("taux"), H_PROP],
  [AP, "auto_prop_formes", 2, () => genFormes(), H_PROP],
  [AP, "auto_prop_formes", 2, () => genFormes(), H_PROP],
  [AP, "auto_prop_appliquer", 2, () => genPourcentage(["partie"], PCT_SIMPLES), H_PROP],
  [AP, "auto_prop_appliquer", 2, () => genPartieTout("partie"), H_PROP],
  [PT, "auto_prop_partie_connaissant_tout", 3, () => genPourcentage(["partie"], PCT_DIFF), H_PROP],
  [PT, "auto_prop_partie_connaissant_tout", 3, () => genPourcentage(["partie", "fraction"], PCT_SIMPLES), H_PROP],
  [PT, "auto_prop_tout_connaissant_partie", 4, () => genPourcentage(["total"], PCT_SIMPLES), H_PROP],
  [PT, "auto_prop_tout_connaissant_partie", 4, () => genPartieTout("total"), H_PROP],
  [PT, "auto_prop_pourcentage_de_pourcentage", 4, () => genPctDePct(3), H_PROP],
  [PT, "auto_prop_pourcentage_de_pourcentage", 4, () => genPctDePct(4), H_PROP],
  [CM, "auto_evo_additif_multiplicatif", 1, () => genAddMult(1), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 1, () => genCoeffMult("short", "hausse", PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 2, () => genAddMult(2), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 2, () => genCoeffMult("short", "mixte", PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_diminution", 1, () => genCoeffMult("short", "baisse", PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_diminution", 1, () => genAddMult(2, "baisse"), H_EVO],
  [CM, "auto_evo_diminution", 2, () => genCoeffMult("short", "baisse", PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_diminution", 2, () => genApresBaisse(PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_diminution", 3, () => genCoeffMult("short", "baisse", PCT_DIFF), H_EVO],
  [CM, "auto_evo_diminution", 3, () => genApresBaisse(PCT_DIFF), H_EVO],
  [CM, "auto_evo_valeur_finale", 2, () => genNouvelleValeur(PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_valeur_finale", 2, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [CM, "auto_evo_valeur_finale", 3, () => genNouvelleValeur(PCT_DIFF), H_EVO],
  [CM, "auto_evo_valeur_finale", 3, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [CM, "auto_evo_valeur_initiale", 2, () => genValeurInitiale("remise"), H_VI],
  [CM, "auto_evo_valeur_initiale", 2, () => genValeurInitiale("hausse"), H_VI],
  [CM, "auto_evo_valeur_initiale", 3, () => genDepart(), H_VI],
  [CM, "auto_evo_valeur_initiale", 3, () => genValeurInitiale("ttc"), H_VI],
  [TE, "auto_evo_calculer_taux", 2, () => genTauxEvolution(PCT_SIMPLES), H_EVO],
  [TE, "auto_evo_calculer_taux", 2, () => genCoeffVersTaux(PCT_SIMPLES), H_EVO],
  [TE, "auto_evo_calculer_taux", 3, () => genTauxEvolution(PCT_DIFF), H_EVO],
  [TE, "auto_evo_calculer_taux", 3, () => genAbsRel(3), H_ABS],
  [TE, "auto_evo_calculer_taux", 3, () => genCoeffMillieme(), H_EVO],
  [TE, "auto_evo_successives", 3, () => genSuccessives(true), H_EVO],
  [TE, "auto_evo_successives", 3, () => genSuccessives(false), H_EVO],
  [TE, "auto_evo_successives", 4, () => genTauxGlobal(), H_EVO],
  [TE, "auto_evo_successives", 4, () => genCoeffGlobal(), H_EVO],
  [TE, "auto_evo_reciproque", 4, () => genRetour(), H_EVO],
  [TE, "auto_evo_reciproque", 4, () => genDepart(), H_EVO],
  [TE, "auto_evo_piege_compensation", 3, () => genCompensation(3), H_EVO],
  [TE, "auto_evo_piege_compensation", 3, () => genCompensation(3), H_EVO],
  [TE, "auto_evo_piege_compensation", 4, () => genCompensation(4), H_EVO],
  [TE, "auto_evo_piege_compensation", 4, () => genTauxGlobal(), H_EVO],
]);

const SP = "auto_proportion";
const EC = "auto_evo_coefficient";
const EE = "auto_evo_enchainees";
const ET = "auto_evo_taux";
const IN = "auto_indice";
export const renfortStmg = construire("stmg", [
  [SP, "auto_prop_calculer", 1, () => genPourcentage(["taux"], PCT_SIMPLES), H_PROP],
  [SP, "auto_prop_calculer", 1, () => genPartieTout("taux"), H_PROP],
  [SP, "auto_prop_calculer", 2, () => genPourcentage(["taux"], PCT_DIFF), H_PROP],
  [SP, "auto_prop_calculer", 2, () => genPartieTout("taux"), H_PROP],
  [SP, "auto_prop_formes", 1, () => genFormes(), H_PROP],
  [SP, "auto_prop_formes", 1, () => genFormes(), H_PROP],
  [SP, "auto_prop_formes", 2, () => genFormes(), H_PROP],
  [SP, "auto_prop_formes", 2, () => genFormes(), H_PROP],
  [SP, "auto_prop_appliquer", 1, () => genPourcentage(["partie"], PCT_SIMPLES), H_PROP],
  [SP, "auto_prop_appliquer", 1, () => genPourcentage(["partie", "aide"], [10, 20, 25, 50]), H_PROP],
  [SP, "auto_prop_appliquer", 2, () => genPourcentage(["partie"], PCT_DIFF), H_PROP],
  [SP, "auto_prop_appliquer", 2, () => genPourcentage(["total"], PCT_SIMPLES), H_PROP],
  [SP, "auto_prop_de_proportion", 2, () => genPctDePct(2), H_PROP],
  [SP, "auto_prop_de_proportion", 2, () => genPctDePct(3), H_PROP],
  [SP, "auto_prop_de_proportion", 3, () => genPctDePct(3), H_PROP],
  [SP, "auto_prop_de_proportion", 3, () => genPctDePct(4), H_PROP],
  [EC, "auto_evo_additif_multiplicatif", 1, () => genAddMult(1), H_EVO],
  [EC, "auto_evo_additif_multiplicatif", 1, () => genCoeffMult("short", "hausse", PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_additif_multiplicatif", 2, () => genAddMult(2), H_EVO],
  [EC, "auto_evo_additif_multiplicatif", 2, () => genCoeffMult("short", "mixte", PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_additif_multiplicatif", 3, () => genAddMult(3), H_EVO],
  [EC, "auto_evo_additif_multiplicatif", 3, () => genCoeffMult("qcm", "mixte", PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_diminution", 1, () => genCoeffMult("short", "baisse", PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_diminution", 1, () => genAddMult(2, "baisse"), H_EVO],
  [EC, "auto_evo_diminution", 2, () => genCoeffMult("short", "baisse", PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_diminution", 2, () => genApresBaisse(PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_diminution", 3, () => genCoeffMult("short", "baisse", PCT_DIFF), H_EVO],
  [EC, "auto_evo_diminution", 3, () => genApresBaisse(PCT_DIFF), H_EVO],
  [EC, "auto_evo_valeur_finale", 1, () => genNouvelleValeur([10, 20, 25, 50]), H_EVO],
  [EC, "auto_evo_valeur_finale", 1, () => genAppliquerCoeff([10, 20, 25, 50]), H_EVO],
  [EC, "auto_evo_valeur_finale", 2, () => genNouvelleValeur(PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_valeur_finale", 2, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [EC, "auto_evo_valeur_finale", 3, () => genNouvelleValeur(PCT_DIFF), H_EVO],
  [EC, "auto_evo_valeur_finale", 3, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  // ⛔ Le geste simple d'abord : une remise, une hausse, puis TTC → HT. Les deux évolutions (genDepart) viennent à ★3 ;
  // la réciproque (genRetour) a sa micro. Les gabarits de la banque STMG restent servis : voir `garder`.
  [EC, "auto_evo_valeur_initiale", 2, () => genValeurInitiale("remise"), H_VI],
  [EC, "auto_evo_valeur_initiale", 2, () => genValeurInitiale("hausse"), H_VI],
  [EC, "auto_evo_valeur_initiale", 3, () => genDepart(), H_VI],
  [EC, "auto_evo_valeur_initiale", 3, () => genValeurInitiale("ttc"), H_VI],
  [EE, "auto_evo_chaine_coefficients", 2, () => genSuccessives(true), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 2, () => genSuccessives(false), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 3, () => genTauxGlobal(), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 3, () => genCoeffGlobal(), H_EVO],
  [EE, "auto_evo_successives", 3, () => genSuccessives(false), H_EVO],
  [EE, "auto_evo_successives", 3, () => genTauxGlobal(), H_EVO],
  [EE, "auto_evo_reciproque", 2, () => genRetour(), H_EVO],
  [EE, "auto_evo_reciproque", 2, () => genDepart(), H_EVO],
  [EE, "auto_evo_reciproque", 3, () => genRetour(), H_EVO],
  [EE, "auto_evo_reciproque", 3, () => genDepart(), H_EVO],
  [EE, "auto_evo_piege_compensation", 2, () => genCompensation(2), H_EVO],
  [EE, "auto_evo_piege_compensation", 2, () => genCompensation(3), H_EVO],
  [EE, "auto_evo_piege_compensation", 3, () => genCompensation(4), H_EVO],
  [EE, "auto_evo_piege_compensation", 3, () => genTauxGlobal(), H_EVO],
  [ET, "auto_evo_absolue_relative", 2, () => genAbsRel(2), H_ABS],
  [ET, "auto_evo_absolue_relative", 2, () => genAbsRel(3), H_ABS],
  [ET, "auto_evo_absolue_relative", 3, () => genAbsRel(3), H_ABS],
  [ET, "auto_evo_absolue_relative", 3, () => genAbsRel(4), H_ABS],
  [ET, "auto_evo_calculer_taux", 2, () => genTauxEvolution(PCT_SIMPLES), H_EVO],
  [ET, "auto_evo_calculer_taux", 2, () => genCoeffVersTaux(PCT_SIMPLES), H_EVO],
  [ET, "auto_evo_calculer_taux", 3, () => genTauxEvolution(PCT_DIFF), H_EVO],
  [ET, "auto_evo_calculer_taux", 3, () => genAbsRel(3), H_ABS],
  [ET, "auto_evo_calculer_taux", 3, () => genCoeffMillieme(), H_EVO],
  // ⛔ Chaque générateur d'indices dans sa micro : `interpreter` et `vers_taux` ne calculent aucun indice,
  // `comparer` n'interprète pas. Les gabarits de la banque STMG complètent : voir `garder`.
  [IN, "auto_indice_interpreter", 1, () => genIndice("interpreter"), H_IND],
  [IN, "auto_indice_interpreter", 1, () => genIndice("vers_taux"), H_IND],
  [IN, "auto_indice_interpreter", 2, () => genIndice("interpreter"), H_IND],
  [IN, "auto_indice_calculer", 2, () => genIndice("calculer"), H_IND_CALC],
  [IN, "auto_indice_calculer", 3, () => genIndice("calculer"), H_IND_CALC],
  [IN, "auto_indice_vers_taux", 2, () => genIndice("vers_taux"), H_IND],
  [IN, "auto_indice_vers_taux", 3, () => genIndice("deux_indices"), H_IND_TAUX],
  [IN, "auto_indice_comparer", 3, () => genIndice("comparer"), H_IND_COMP],
  [IN, "auto_indice_comparer", 3, () => genIndice("comparer"), H_IND_COMP],
]);
