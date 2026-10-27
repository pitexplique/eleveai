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

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* ---------- Proportions : écritures, proportion de proportion ---------- */

const POPULATIONS = [
  { tout: "salariés d’une start-up de Saint-Denis", partie: "sont des ingénieures", sous: "travaillent en télétravail" },
  { tout: "élèves du lycée", partie: "sont internes", sous: "font du sport en club" },
  { tout: "clients d’une banque", partie: "ont moins de 30 ans", sous: "utilisent l’application mobile" },
  { tout: "visiteurs du musée Stella Matutina", partie: "sont des touristes", sous: "viennent d’Europe" },
  { tout: "abonnés d’une chaîne de cuisine", partie: "regardent sur téléphone", sous: "activent les sous-titres" },
  { tout: "patients d’une clinique", partie: "sont venus en urgence", sous: "repartent le jour même" },
  { tout: "électeurs d’une commune", partie: "ont voté", sous: "ont voté blanc" },
  { tout: "spectateurs d’un festival", partie: "ont acheté leur billet en ligne", sous: "ont payé un tarif réduit" },
  { tout: "agriculteurs de l’île", partie: "cultivent la canne", sous: "sont en agriculture biologique" },
  { tout: "apprentis d’un CFA", partie: "préparent un CAP", sous: "sont des filles" },
  { tout: "joueuses d’une ligue de handball", partie: "ont moins de 18 ans", sous: "sont licenciées depuis 5 ans" },
  { tout: "passagers d’un vol Paris–Saint-Denis", partie: "voyagent en classe éco", sous: "ont un bagage en soute" },
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

const GRANDEURS = [
  { quoi: "le nombre d’habitants de Saint-Pierre", u: "habitants", v: [80000, 84000, 85000, 90000] },
  { quoi: "le chiffre d’affaires d’une pâtissière", u: "€", v: [40000, 50000, 60000, 80000] },
  { quoi: "le nombre d’abonnés d’une vidéaste", u: "abonnés", v: [2000, 4000, 5000, 8000] },
  { quoi: "le loyer d’un studio", u: "€", v: [400, 500, 600, 800] },
  { quoi: "le nombre de touristes au Piton de la Fournaise", u: "touristes", v: [20000, 25000, 40000] },
  { quoi: "le salaire mensuel d’un technicien", u: "€", v: [1500, 2000, 2500] },
  { quoi: "la production de letchis d’une exploitation", u: "kg", v: [1200, 1500, 2000] },
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
  const intro = randomChoice([
    `${cap(g.quoi)} passe de ${fr(v0)} à ${fr(v1)}${g.u === "€" ? " €" : ""}.`,
    `En un an, ${g.quoi} est passé de ${fr(v0)} à ${fr(v1)}${g.u === "€" ? " €" : ""}.`,
    `Valeur de départ : ${fr(v0)} ; valeur d’arrivée : ${fr(v1)} (${g.quoi}).`,
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
        `Un client remarque que ${g.quoi} ${ordre}. Par rapport au départ :`,
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

export function genAddMult(niveau: 1 | 2 | 3) {
  const t = randomChoice([5, 10, 20, 25, 30, 50]);
  const baisse = niveau > 1 && Math.random() < 0.5;
  const c = fr(baisse ? 1 - t / 100 : 1 + t / 100);
  const g = randomChoice(GRANDEURS);
  const verbe = baisse ? "Diminuer" : "Augmenter";
  const bon = `multiplier par ${c}`;
  return {
    text: randomChoice([
      `${verbe} une valeur de ${t} %, cela revient à :`,
      `${cap(g.quoi)} va ${baisse ? "diminuer" : "augmenter"} de ${t} %. Cela revient à :`,
      `Pour ${baisse ? "baisser" : "augmenter"} ${g.quoi} de ${t} %, on doit :`,
      `Un gestionnaire veut appliquer ${baisse ? "une baisse" : "une hausse"} de ${t} % à ${g.quoi}. Quelle opération ?`,
      `Dans un tableur, pour ${baisse ? "diminuer" : "augmenter"} une cellule de ${t} %, on la multiplie… ou pas ? Choisis :`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(bon, [`${baisse ? "soustraire" : "ajouter"} ${t}`, `multiplier par ${fr(t / 100)}`, `multiplier par ${t}`, `multiplier par ${fr(baisse ? 1 + t / 100 : 1 - t / 100)}`]),
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl("une évolution en pourcentage est MULTIPLICATIVE.", `${baisse ? "baisser" : "augmenter"} de ${t} %, c’est multiplier par 1 ${baisse ? "−" : "+"} ${fr(t / 100)}.`, `1 ${baisse ? "−" : "+"} ${fr(t / 100)} = ${c}.`, `on multiplie par ${c}.`),
  };
}

/* ---------- Indices base 100 ---------- */

const SERIES_INDICE = [
  { quoi: "le prix moyen du m² à Saint-Denis", u: "€", v0: [2000, 2500, 3000] },
  { quoi: "le nombre de touristes à La Réunion", u: "", v0: [400000, 500000] },
  { quoi: "le prix du litre de gazole", u: "€", v0: [1.2, 1.5, 1.6] },
  { quoi: "le chiffre d’affaires d’une coopérative de vanille", u: "€", v0: [200000, 250000, 400000] },
  { quoi: "le nombre d’apprentis d’un CFA", u: "", v0: [800, 1000, 1200] },
  { quoi: "le loyer moyen d’un T2", u: "€", v0: [500, 600, 800] },
  { quoi: "le prix du kilo de tomates", u: "€", v0: [2, 2.5, 4] },
  { quoi: "le nombre d’abonnés au réseau de bus", u: "", v0: [20000, 25000, 40000] },
  { quoi: "le prix d’un billet d’avion pour Paris", u: "€", v0: [600, 800, 900] },
  { quoi: "la consommation d’électricité d’une commune", u: "MWh", v0: [5000, 8000, 10000] },
];

export function genIndice(type: "interpreter" | "calculer" | "vers_taux" | "comparer") {
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
            `Base 100 en ${a0} : en ${a1}, ${s.quoi} a pour indice ${I}. De combien de % a-t-il évolué ?`,
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

/** Les micros renforcées perdent leurs anciens gabarits et leurs items « open » ; les autres ne bougent pas. */
export function fusionnerRenfort(anciens: TutorBankItemV4[], renfort: TutorBankItemV4[]): TutorBankItemV4[] {
  const renforcees = new Set(renfort.map((i) => `${i.notionId}/${i.microId}`));
  return [
    ...anciens.filter((i) => !renforcees.has(`${i.notionId}/${i.microId}`) || (i.kind === "fixed" && (i as any).format !== "open")),
    ...renfort,
  ];
}

const H_PROP = "Proportion = partie ÷ tout ; p % = p/100.";
const H_EVO = "Hausse de t % : × (1 + t/100) ; baisse : × (1 − t/100).";
const H_ABS = "Variation relative = (arrivée − départ) ÷ départ.";
const H_IND = "Indice base 100 : taux d’évolution = indice − 100.";

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
  [N2, "info_evolutions_successives", 3, () => genSuccessives(true), H_EVO],
  [N2, "info_evolutions_successives", 3, () => genSuccessives(false), H_EVO],
  [N2, "info_evolutions_successives", 4, () => genTauxGlobal(), H_EVO],
  [N2, "info_evolutions_successives", 4, () => genCompensation(4), H_EVO],
  [N2, "info_evolutions_successives", 5, () => genCoeffMillieme(), H_EVO],
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
  [CM, "auto_evo_diminution", 1, () => genAddMult(2), H_EVO],
  [CM, "auto_evo_diminution", 2, () => genCoeffMult("short", "baisse", PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_diminution", 2, () => genNouvelleValeur(PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_diminution", 3, () => genCoeffMult("short", "baisse", PCT_DIFF), H_EVO],
  [CM, "auto_evo_diminution", 3, () => genNouvelleValeur(PCT_DIFF), H_EVO],
  [CM, "auto_evo_valeur_finale", 2, () => genNouvelleValeur(PCT_SIMPLES), H_EVO],
  [CM, "auto_evo_valeur_finale", 2, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [CM, "auto_evo_valeur_finale", 3, () => genNouvelleValeur(PCT_DIFF), H_EVO],
  [CM, "auto_evo_valeur_finale", 3, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [CM, "auto_evo_valeur_initiale", 3, () => genDepart(), H_EVO],
  [CM, "auto_evo_valeur_initiale", 3, () => genRetour(), H_EVO],
  [TE, "auto_evo_calculer_taux", 2, () => genTauxEvolution(PCT_SIMPLES), H_EVO],
  [TE, "auto_evo_calculer_taux", 2, () => genCoeffVersTaux(PCT_SIMPLES), H_EVO],
  [TE, "auto_evo_calculer_taux", 3, () => genTauxEvolution(PCT_DIFF), H_EVO],
  [TE, "auto_evo_calculer_taux", 3, () => genAbsRel(3), H_ABS],
  [TE, "auto_evo_successives", 3, () => genSuccessives(true), H_EVO],
  [TE, "auto_evo_successives", 3, () => genSuccessives(false), H_EVO],
  [TE, "auto_evo_successives", 4, () => genTauxGlobal(), H_EVO],
  [TE, "auto_evo_successives", 4, () => genCoeffMillieme(), H_EVO],
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
  [EC, "auto_evo_diminution", 1, () => genAddMult(2), H_EVO],
  [EC, "auto_evo_diminution", 2, () => genCoeffMult("short", "baisse", PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_diminution", 2, () => genNouvelleValeur(PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_diminution", 3, () => genCoeffMult("short", "baisse", PCT_DIFF), H_EVO],
  [EC, "auto_evo_diminution", 3, () => genNouvelleValeur(PCT_DIFF), H_EVO],
  [EC, "auto_evo_valeur_finale", 1, () => genNouvelleValeur([10, 20, 25, 50]), H_EVO],
  [EC, "auto_evo_valeur_finale", 1, () => genAppliquerCoeff([10, 20, 25, 50]), H_EVO],
  [EC, "auto_evo_valeur_finale", 2, () => genNouvelleValeur(PCT_SIMPLES), H_EVO],
  [EC, "auto_evo_valeur_finale", 2, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [EC, "auto_evo_valeur_finale", 3, () => genNouvelleValeur(PCT_DIFF), H_EVO],
  [EC, "auto_evo_valeur_finale", 3, () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]), H_EVO],
  [EC, "auto_evo_valeur_initiale", 2, () => genDepart(), H_EVO],
  [EC, "auto_evo_valeur_initiale", 2, () => genRetour(), H_EVO],
  [EC, "auto_evo_valeur_initiale", 3, () => genDepart(), H_EVO],
  [EC, "auto_evo_valeur_initiale", 3, () => genRetour(), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 2, () => genSuccessives(true), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 2, () => genSuccessives(false), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 3, () => genTauxGlobal(), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 3, () => genCoeffMillieme(), H_EVO],
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
  [IN, "auto_indice_interpreter", 1, () => genIndice("interpreter"), H_IND],
  [IN, "auto_indice_interpreter", 1, () => genIndice("vers_taux"), H_IND],
  [IN, "auto_indice_interpreter", 2, () => genIndice("interpreter"), H_IND],
  [IN, "auto_indice_interpreter", 2, () => genIndice("comparer"), H_IND],
  [IN, "auto_indice_calculer", 2, () => genIndice("calculer"), H_IND],
  [IN, "auto_indice_calculer", 2, () => genIndice("interpreter"), H_IND],
  [IN, "auto_indice_calculer", 3, () => genIndice("calculer"), H_IND],
  [IN, "auto_indice_calculer", 3, () => genIndice("vers_taux"), H_IND],
  [IN, "auto_indice_vers_taux", 3, () => genIndice("vers_taux"), H_IND],
  [IN, "auto_indice_vers_taux", 3, () => genIndice("interpreter"), H_IND],
  [IN, "auto_indice_comparer", 3, () => genIndice("comparer"), H_IND],
  [IN, "auto_indice_comparer", 3, () => genIndice("comparer"), H_IND],
]);
