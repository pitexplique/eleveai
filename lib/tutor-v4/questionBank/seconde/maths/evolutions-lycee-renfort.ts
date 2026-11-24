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
type Grandeur = { quoi: string; g: "m" | "f"; u: string; v: number[] };
const GRANDEURS: Grandeur[] = [
  { quoi: "le nombre d’habitants d’une ville", g: "m", u: "habitants", v: [80000, 84000, 85000, 90000] },
  { quoi: "le chiffre d’affaires d’une pâtissière", g: "m", u: "€", v: [40000, 50000, 60000, 80000] },
  { quoi: "le nombre d’abonnés d’une vidéaste", g: "m", u: "abonnés", v: [2000, 4000, 5000, 8000] },
  { quoi: "le loyer d’un studio", g: "m", u: "€", v: [400, 500, 600, 800] },
  { quoi: "le nombre de visiteurs d’un parc naturel", g: "m", u: "visiteurs", v: [20000, 25000, 40000] },
  { quoi: "le salaire mensuel d’un technicien", g: "m", u: "€", v: [1500, 2000, 2500] },
  { quoi: "la récolte de pommes d’un verger", g: "f", u: "kg", v: [1200, 1500, 2000] },
  { quoi: "le nombre de passagers d’une compagnie aérienne", g: "m", u: "passagers", v: [10000, 20000, 50000] },
  { quoi: "la facture d’électricité d’une entreprise", g: "f", u: "€", v: [1200, 2000, 2400, 4000] },
  { quoi: "la fréquentation d’une piscine", g: "f", u: "entrées", v: [8000, 10000, 12000, 20000] },
  { quoi: "le prix d’un abonnement de téléphone", g: "m", u: "€", v: [200, 300, 400] },
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

/** « baisse de 4 % », « hausse de 21 % », « aucune évolution ». */
function evolTexte(g: number) {
  if (Math.abs(g) < 1e-9) return "aucune évolution";
  return g > 0 ? `hausse de ${fr(g)} %` : `baisse de ${fr(-g)} %`;
}

/** L'unité n'est écrite que pour € et kg (un effectif n'en a pas). */
function uniteDe(g: Grandeur) {
  const unite = g.u === "€" || g.u === "kg" ? g.u : "";
  return { unite, suffixe: unite ? " " + unite : "" };
}

/** Une valeur de départ telle que v × (1 − t²/10 000) reste entière pour un effectif. */
function departCompensation(g: Grandeur, t: number) {
  const { unite } = uniteDe(g);
  const possibles = g.v.filter((v) => unite === "€" || (v * t * t) % 10000 === 0);
  return randomChoice(possibles.length ? possibles : g.v);
}

/**
 * Piège de compensation : + t % puis − t % (ou l'inverse) ne ramène pas au départ.
 * ⛔ 23/11 (audit) : la bonne réponse n'est plus toujours le même texte, « il / elle »
 * s'accorde au sujet (« le salaire… il a baissé »), le « Vrai ou faux ? » a des choix
 * vrai / faux, et la question varie : sens, valeur finale chiffrée, taux global, rôle de l'ordre.
 * `forme` impose une famille : deux gabarits d'une même étoile ne se ressemblent plus.
 */
export function genCompensation(niveau: 2 | 3 | 4, forme?: "sens" | "chiffre") {
  const g = randomChoice(GRANDEURS);
  const t = randomChoice(niveau === 2 ? [10, 20, 50] : [10, 20, 25, 30, 40, 50]);
  const hausseDabord = Math.random() < 0.5;
  const global = -(t * t) / 100;
  const k = 1 + global / 100;
  const ordre = hausseDabord ? `augmente de ${t} %, puis baisse de ${t} %` : `baisse de ${t} %, puis augmente de ${t} %`;
  const deuxTemps = hausseDabord ? `une hausse de ${t} %, puis une baisse de ${t} %` : `une baisse de ${t} %, puis une hausse de ${t} %`;
  const pron = g.g === "m" ? "il" : "elle";
  const e = g.g === "m" ? "" : "e";
  const def = "des évolutions successives se composent en MULTIPLIANT les coefficients.";
  const methode = `coefficient global : ${fr(1 + t / 100)} × ${fr(1 - t / 100)}.`;
  const calcul = `${fr(1 + t / 100)} × ${fr(1 - t / 100)} = ${fr(k)} < 1.`;
  const conclusion = `la valeur finale vaut ${fr(100 + global)} % de la valeur de départ, soit une baisse de ${fr(-global)} %, quel que soit l’ordre : le second pourcentage ne porte pas sur la même valeur, les ${t} % ne se compensent pas.`;
  if (niveau <= 3) {
    const familles = forme === "sens" ? ["sens", "vraiFaux", "ordre"] : forme === "chiffre" ? ["valeur", "taux"] : ["sens", "vraiFaux", "ordre", "valeur", "taux"];
    const f = randomChoice(familles);
    if (f === "sens") {
      // Trois jeux de libellés : la bonne réponse change de texte d'un tirage à l'autre.
      const jeu = randomInt(1, 3);
      if (jeu === 1) {
        const bon = `${pron} a baissé`;
        return {
          text: randomChoice([
            `${cap(g.quoi)} ${ordre}. Par rapport au départ, ${pron} :`,
            `On remarque que ${g.quoi} ${ordre}. Au bout du compte, ${pron} :`,
            `Sur deux ans, ${g.quoi} ${ordre}. Par rapport à la première année, ${pron} :`,
          ]),
          format: "qcm" as const,
          choices: makeChoices(bon, [`${pron} est revenu${e} à sa valeur de départ`, `${pron} a augmenté`, "on ne peut pas savoir"]),
          expected: [bon],
          comparator: "mcq_exact" as const,
          explanation: expl(def, methode, calcul, conclusion),
        };
      }
      if (jeu === 2) {
        const bon = "elle est plus basse qu’au départ";
        return {
          text: randomChoice([
            `${cap(g.quoi)} ${ordre}. Que peut-on dire de sa valeur finale ?`,
            `Une grandeur (${g.quoi}) subit ${deuxTemps}. Comment est sa valeur finale ?`,
          ]),
          format: "qcm" as const,
          choices: makeChoices(bon, ["elle est égale à celle du départ", "elle est plus haute qu’au départ", "cela dépend de la valeur de départ"]),
          expected: [bon],
          comparator: "mcq_exact" as const,
          explanation: expl(def, methode, calcul, conclusion),
        };
      }
      const bon = "inférieure à celle du départ";
      return {
        text: randomChoice([
          `${cap(g.quoi)} ${ordre}. Sa valeur finale est :`,
          `D’une année sur l’autre, ${g.quoi} subit ${deuxTemps}. La valeur obtenue est :`,
        ]),
        format: "qcm" as const,
        choices: makeChoices(bon, ["égale à celle du départ", "supérieure à celle du départ", "impossible à dire sans la valeur de départ"]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: expl(def, methode, calcul, conclusion),
      };
    }
    if (f === "vraiFaux") {
      const bon = "Faux : on finit plus bas qu’au départ";
      return {
        text: randomChoice([
          `Vrai ou faux ? « ${cap(g.quoi)} ${ordre} : ${pron} revient à sa valeur de départ. »`,
          `Un élève affirme : « si ${g.quoi} ${ordre}, ${pron} n’a pas changé. » Vrai ou faux ?`,
          `Vrai ou faux ? « Une hausse de ${t} % et une baisse de ${t} % s’annulent. »`,
        ]),
        format: "qcm" as const,
        choices: makeChoices(bon, ["Vrai : les deux évolutions s’annulent", "Faux : on finit plus haut qu’au départ", "Vrai, mais seulement si la hausse vient en premier"]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: expl(def, methode, calcul, conclusion),
      };
    }
    if (f === "ordre") {
      const bon = `non : dans les deux cas, baisse de ${fr(-global)} %`;
      return {
        text: randomChoice([
          `${cap(g.quoi)} peut subir une hausse de ${t} % puis une baisse de ${t} %, ou l’inverse. L’ordre change-t-il le résultat ?`,
          `Vaut-il mieux une baisse de ${t} % suivie d’une hausse de ${t} %, ou une hausse de ${t} % suivie d’une baisse de ${t} % ?`,
          `Deux scénarios pour ${g.quoi} : « + ${t} % puis − ${t} % » ou « − ${t} % puis + ${t} % ». L’un des deux donne-t-il plus ?`,
        ]),
        format: "qcm" as const,
        choices: makeChoices(bon, [
          "oui : la hausse d’abord fait gagner",
          "oui : la baisse d’abord fait perdre davantage",
          "non : dans les deux cas, on revient au départ",
          `non : dans les deux cas, baisse de ${2 * t} %`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: expl(def, `les deux scénarios ont le même coefficient global : ${fr(1 + t / 100)} × ${fr(1 - t / 100)} = ${fr(1 - t / 100)} × ${fr(1 + t / 100)}.`, calcul, `l’ordre ne change rien : ${conclusion}`),
      };
    }
    if (f === "valeur") {
      const { suffixe } = uniteDe(g);
      const v0 = departCompensation(g, t);
      const v1 = Math.round(v0 * k * 100) / 100;
      const vMid = Math.round(v0 * (hausseDabord ? 1 + t / 100 : 1 - t / 100) * 100) / 100;
      const bon = `${fr(v1)}${suffixe}`;
      return {
        text: randomChoice([
          `${cap(g.quoi)} vaut ${fr(v0)}${suffixe}. Ensuite, ${pron} ${ordre}. Quelle est sa valeur finale ?`,
          `Départ : ${fr(v0)}${suffixe} (${g.quoi}). On applique ${deuxTemps}. Valeur d’arrivée ?`,
          `Au départ, ${g.quoi} vaut ${fr(v0)}${suffixe}, puis ${pron} ${ordre}. Combien vaut-${pron} maintenant ?`,
        ]),
        format: "qcm" as const,
        choices: makeChoices(bon, [
          `${fr(v0)}${suffixe}`,
          `${fr(Math.round(v0 * (1 + (t * t) / 10000) * 100) / 100)}${suffixe}`,
          `${fr(Math.round(v0 * (1 - (2 * t) / 100) * 100) / 100)}${suffixe}`,
          `${fr(vMid)}${suffixe}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: expl(def, methode, `${fr(v0)} × ${fr(k)} = ${fr(v1)}.`, `la valeur finale est ${bon}, et non ${fr(v0)}${suffixe} : ${conclusion}`),
      };
    }
    const bon = evolTexte(global);
    return {
      text: randomChoice([
        `${cap(g.quoi)} ${ordre}. Quelle est l’évolution globale ?`,
        `Une ${hausseDabord ? "hausse" : "baisse"} de ${t} % est suivie d’une ${hausseDabord ? "baisse" : "hausse"} de ${t} %. Quelle évolution unique cela représente-t-il ?`,
        `Au total, quand ${g.quoi} ${ordre}, quelle évolution globale obtient-on ?`,
      ]),
      format: "qcm" as const,
      choices: makeChoices(bon, ["aucune évolution", evolTexte(-global), `baisse de ${t} %`, `baisse de ${2 * t} %`]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation: expl(def, methode, calcul, conclusion),
    };
  }
  const f = forme === "sens" ? "coeff" : forme === "chiffre" ? "valeur" : randomChoice(["taux", "taux", "coeff", "valeur"]);
  if (f === "coeff")
    return {
      text: randomChoice([
        `${cap(g.quoi)} ${ordre}. Quel est le coefficient multiplicateur global ?`,
        `Par quel nombre unique ${g.quoi} est-${pron} multiplié${e} quand ${pron} ${ordre} ?`,
        `${cap(g.quoi)} subit ${deuxTemps}. Donne le coefficient global.`,
      ]),
      format: "short" as const,
      expected: [fr(k)],
      comparator: "number_equal" as const,
      explanation: expl(def, methode, `${fr(1 + t / 100)} × ${fr(1 - t / 100)} = ${fr(k)}.`, `le coefficient global est ${fr(k)}, inférieur à 1 : ${conclusion}`),
    };
  if (f === "valeur") {
    const { unite, suffixe } = uniteDe(g);
    const v0 = departCompensation(g, t);
    const v1 = Math.round(v0 * k * 100) / 100;
    return {
      text: randomChoice([
        `${cap(g.quoi)} vaut ${fr(v0)}${suffixe}. Ensuite, ${pron} ${ordre}. Calcule sa valeur finale.`,
        `Départ : ${fr(v0)}${suffixe} pour ${g.quoi}, qui subit ${deuxTemps}. Combien obtient-on à la fin ?`,
        `On applique ${deuxTemps} ${aGn(g.quoi)}, qui valait ${fr(v0)}${suffixe}. Quelle valeur obtient-on ?`,
      ]),
      format: "short" as const,
      expected: attendu(v1, unite),
      comparator: "number_equal" as const,
      explanation: expl(def, methode, `${fr(v0)} × ${fr(k)} = ${fr(v1)}.`, `la valeur finale est ${fr(v1)}${suffixe} : ${conclusion}`),
    };
  }
  return {
    text: randomChoice([
      `${cap(g.quoi)} ${ordre}. Quel est le taux d’évolution global, en % ? (négatif pour une baisse)`,
      `Une grandeur ${ordre}. Donne le taux d’évolution global, en %. (négatif pour une baisse)`,
      `Sur deux ans, ${g.quoi} ${ordre}. De combien de % a-t-${pron} évolué au total ? (négatif pour une baisse)`,
      `Taux global, en %, quand ${g.quoi} subit ${deuxTemps} ? (négatif pour une baisse)`,
    ]),
    format: "short" as const,
    expected: attendu(global, "%"),
    comparator: "number_equal" as const,
    explanation: expl("taux global = coefficient global − 1.", `${fr(1 + t / 100)} × ${fr(1 - t / 100)} = ${fr(k)}.`, `${fr(k)} − 1 = ${fr(global / 100)}.`, `le taux global est ${fr(global)} % : ${conclusion}`),
  };
}

/* ---------- Additif ou multiplicatif ---------- */

/** ⛔ `sens: "baisse"` pour la micro « diminution » : sans lui, le niveau 2 ou 3 peut tirer une hausse. */
export function genAddMult(niveau: 1 | 2 | 3, sens?: "baisse") {
  // ⛔ 23/11 : les taux de l'épreuve anticipée (15 %, 12 %, 3 %, 7 %, 0,5 %) en plus des taux ronds.
  const t = randomChoice([3, 5, 7, 10, 12, 15, 20, 25, 30, 50, 0.5]);
  const T = fr(t);
  const baisse = sens === "baisse" || (niveau > 1 && Math.random() < 0.5);
  const c = fr(baisse ? 1 - t / 100 : 1 + t / 100);
  const g = randomChoice(GRANDEURS);
  const verbe = baisse ? "Diminuer" : "Augmenter";
  const bon = `multiplier par ${c}`;
  return {
    text: randomChoice([
      `${verbe} une valeur de ${T} %, cela revient à :`,
      `${cap(g.quoi)} va ${baisse ? "diminuer" : "augmenter"} de ${T} %. Cela revient à :`,
      `Pour ${baisse ? "baisser" : "augmenter"} ${g.quoi} de ${T} %, on doit :`,
      `Un gestionnaire veut appliquer ${baisse ? "une baisse" : "une hausse"} de ${T} % ${aGn(g.quoi)}. Quelle opération ?`,
      `Dans un tableur, pour ${baisse ? "diminuer" : "augmenter"} une cellule de ${T} %, quelle opération faut-il faire ?`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(bon, [`${baisse ? "soustraire" : "ajouter"} ${T}`, `multiplier par ${fr(t / 100)}`, `multiplier par ${T}`, `multiplier par ${fr(baisse ? 1 + t / 100 : 1 - t / 100)}`]),
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl("une évolution en pourcentage est MULTIPLICATIVE.", `${baisse ? "baisser" : "augmenter"} de ${T} %, c’est multiplier par 1 ${baisse ? "−" : "+"} ${fr(t / 100)}.`, `1 ${baisse ? "−" : "+"} ${fr(t / 100)} = ${c}.`, `on multiplie par ${c}.`),
  };
}

/* ---------- Évolution réciproque : le coefficient 1 ÷ k ---------- */

// ⛔ 23/11 (audit) : la micro « réciproque » recevait genDepart (valeur de départ après
// DEUX évolutions) ou genCompensation : le geste « coefficient réciproque = 1 ÷ k »
// avait disparu. Couples exacts (de tête) : − 20 % ↔ + 25 %, − 50 % ↔ + 100 %, …
const RECIPROQUES: Array<{ h: boolean; a: number; b: number; niveau: number }> = [
  { h: true, a: 25, b: 20, niveau: 2 },
  { h: false, a: 20, b: 25, niveau: 2 },
  { h: true, a: 100, b: 50, niveau: 2 },
  { h: false, a: 50, b: 100, niveau: 2 },
  { h: true, a: 60, b: 37.5, niveau: 3 },
  { h: false, a: 37.5, b: 60, niveau: 3 },
  { h: true, a: 150, b: 60, niveau: 4 },
  { h: false, a: 60, b: 150, niveau: 4 },
  { h: false, a: 75, b: 300, niveau: 4 },
];

const SUJETS_RECIPROQUE: Array<{ quoi: string; g: "m" | "f" }> = [
  { quoi: "le prix d’un article", g: "m" },
  { quoi: "le cours d’une action", g: "m" },
  { quoi: "le loyer d’un local commercial", g: "m" },
  { quoi: "le nombre d’abonnés d’une vidéaste", g: "m" },
  { quoi: "la fréquentation d’un site web", g: "f" },
  { quoi: "la valeur d’une collection de cartes", g: "f" },
  { quoi: "le prix d’un billet de train", g: "m" },
  { quoi: "la production d’une usine", g: "f" },
  { quoi: "le chiffre d’affaires d’une boutique", g: "m" },
  { quoi: "le tarif d’une salle de sport", g: "m" },
  { quoi: "la consommation d’eau d’un hôtel", g: "f" },
  { quoi: "le prix du kilo de café", g: "m" },
];

/** « un vélo » → « d’un vélo » ; « la guitare » → « de la guitare ». */
function dObjet(o: string) {
  if (/^une? /.test(o)) return "d’" + o;
  if (o.startsWith("des ")) return o;
  return de(o);
}

export function genReciproque(niveau: 2 | 3 | 4) {
  const r = randomChoice(RECIPROQUES.filter((x) => x.niveau <= niveau));
  const s = randomChoice(SUJETS_RECIPROQUE);
  const pron = s.g === "m" ? "il" : "elle";
  const e = s.g === "m" ? "" : "e";
  const sens1 = r.h ? "hausse" : "baisse";
  const sens2 = r.h ? "baisse" : "hausse";
  const verbe2 = r.h ? "baisser" : "augmenter";
  const k = (r.h ? 100 + r.a : 100 - r.a) / 100;
  const kr = (r.h ? 100 - r.b : 100 + r.b) / 100;
  const A = fr(r.a);
  const B = fr(r.b);
  const explanation = expl(
    "l’évolution réciproque ramène à la valeur de départ : son coefficient est l’INVERSE 1 ÷ k du premier.",
    `${sens1} de ${A} % : k = ${fr(k)} ; on calcule 1 ÷ ${fr(k)}.`,
    `1 ÷ ${fr(k)} = ${fr(kr)}, et ${fr(k)} × ${fr(kr)} = 1.`,
    `multiplier par ${fr(kr)}, c’est une ${sens2} de ${B} % ⚠️ et non de ${A} % : la seconde évolution porte sur la NOUVELLE valeur.`,
  );
  const formes = niveau === 2 ? ["qcmTaux", "taux"] : niveau === 3 ? ["qcmTaux", "taux", "coeff", "valeurs"] : ["qcmTaux", "taux", "coeffQcm", "coeff", "valeurs"];
  const f = randomChoice(formes);
  if (f === "qcmTaux") {
    const bon = `une ${sens2} de ${B} %`;
    return {
      text: randomChoice([
        `Après une ${sens1} de ${A} %, quelle évolution ramène ${s.quoi} à sa valeur de départ ?`,
        `${cap(s.quoi)} a subi une ${sens1} de ${A} %. Pour revenir à sa valeur initiale, il faut :`,
        `${cap(s.quoi)} ${r.h ? "augmente" : "baisse"} de ${A} %. Quelle évolution annule exactement cette ${sens1} ?`,
        `Une ${sens1} de ${A} % est suivie d’une seconde évolution qui ramène au point de départ. Cette seconde évolution est :`,
        `On veut annuler une ${sens1} de ${A} % ${aGn(s.quoi)}. Quelle évolution appliquer ?`,
      ]),
      format: "qcm" as const,
      choices: makeChoices(bon, [
        `une ${sens2} de ${A} %`,
        `une ${sens1} de ${B} %`,
        r.h ? `une baisse de ${fr(100 + r.a)} %` : `une hausse de ${fr(100 - r.a)} %`,
        `une ${sens2} de ${fr(r.a * 2)} %`,
      ]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation,
    };
  }
  if (f === "taux")
    return {
      text: randomChoice([
        `${cap(s.quoi)} a ${r.h ? "augmenté" : "baissé"} de ${A} %. De quel pourcentage doit-${pron} ${verbe2} pour revenir à sa valeur de départ ?`,
        `Après une ${sens1} de ${A} %, quelle ${sens2}, en %, ramène ${s.quoi} à sa valeur initiale ?`,
        `${cap(s.quoi)} vient de subir une ${sens1} de ${A} %. Quel pourcentage de ${sens2} l’annule exactement ?`,
        `Pour effacer une ${sens1} de ${A} % ${aGn(s.quoi)}, de combien de % faut-il ${r.h ? (s.g === "m" ? "le baisser" : "la baisser") : "l’augmenter"} ensuite ?`,
      ]),
      format: "short" as const,
      expected: attendu(r.b, "%"),
      comparator: "number_equal" as const,
      explanation,
    };
  if (f === "coeff" || f === "coeffQcm") {
    const donneK = Math.random() < 0.5;
    const text = donneK
      ? randomChoice([
          `${cap(s.quoi)} a été multiplié${e} par ${fr(k)}. Par quel nombre faut-il ${s.g === "m" ? "le" : "la"} multiplier pour revenir à sa valeur de départ ?`,
          `Un coefficient multiplicateur vaut ${fr(k)}. Quel est le coefficient de l’évolution réciproque ?`,
          `Dans un tableur, une cellule a été multipliée par ${fr(k)}. Par quel nombre la multiplier pour retrouver la valeur d’origine ?`,
        ])
      : randomChoice([
          `Après une ${sens1} de ${A} %, par quel nombre faut-il multiplier pour revenir à la valeur de départ ?`,
          `${cap(s.quoi)} a subi une ${sens1} de ${A} %. Quel coefficient multiplicateur ${s.g === "m" ? "le" : "la"} ramène à sa valeur initiale ?`,
          `Quel est le coefficient multiplicateur de l’évolution réciproque d’une ${sens1} de ${A} % ?`,
        ]);
    if (f === "coeffQcm")
      return {
        text,
        format: "qcm" as const,
        choices: makeChoices(fr(kr), [fr(2 - k), fr(k), fr(Math.round(Math.abs(k - 1) * 10000) / 10000), fr(r.b / 100)]),
        expected: [fr(kr)],
        comparator: "mcq_exact" as const,
        explanation,
      };
    return { text, format: "short" as const, expected: [fr(kr)], comparator: "number_equal" as const, explanation };
  }
  const objet = randomChoice(ARTICLES_PRIX);
  const v0 = randomChoice([40, 80, 120, 160, 200, 400, 800]);
  const v1 = Math.round(v0 * k * 100) / 100;
  return {
    text: randomChoice([
      `Le prix ${dObjet(objet)} passe de ${fr(v0)} € à ${fr(v1)} €. De quel pourcentage doit-il ${verbe2} pour revenir à ${fr(v0)} € ?`,
      `${cap(objet)} coûtait ${fr(v0)} € ; après une ${sens1} de ${A} %, ${objet.startsWith("une") ? "elle" : "il"} coûte ${fr(v1)} €. Quelle ${sens2}, en %, ramène le prix à ${fr(v0)} € ?`,
      `Un magasin fait passer le prix ${dObjet(objet)} de ${fr(v0)} € à ${fr(v1)} €, puis veut revenir à l’ancien prix. Quelle ${sens2} doit-il appliquer, en % ?`,
    ]),
    format: "short" as const,
    expected: attendu(r.b, "%"),
    comparator: "number_equal" as const,
    explanation: expl(
      "l’évolution réciproque ramène à la valeur de départ : son coefficient est l’INVERSE 1 ÷ k du premier.",
      `on part de ${fr(v1)} € et on veut ${fr(v0)} € : coefficient ${fr(v0)} ÷ ${fr(v1)}.`,
      `${fr(v0)} ÷ ${fr(v1)} = ${fr(kr)} = 1 ÷ ${fr(k)}.`,
      `multiplier par ${fr(kr)}, c’est une ${sens2} de ${B} % ⚠️ et non de ${A} %.`,
    ),
  };
}

/* ---------- Coefficient en QCM, façon épreuve anticipée ---------- */

// ⛔ 23/11 : l'exercice type de l'épreuve (sujet Asie 2026) — « pour augmenter un prix de
// 15 %, je dois multiplier par » 1,15 / 1,5 / 0,15 / 15. Les pièges : le taux seul, le taux
// brut, la virgule mal placée (1,5 pour 15 % ; 1,3 pour 3 %), le sens contraire.
const PCT_EPREUVE = [3, 5, 7, 10, 12, 15, 20, 25, 30, 40, 50, 0.5];

/** La virgule mal placée : 15 % → 1,5 ; 3 % → 1,3 ; 0,5 % → 1,05 ; 25 % → 1,025. */
function virguleFausse(t: number) {
  if (t < 10) return t / 10;
  if (t < 20 && t !== 10) return (t - 10) / 10;
  return t / 1000;
}

export function genCoeffQcm(sens: "hausse" | "mixte") {
  const t = randomChoice(PCT_EPREUVE);
  const hausse = sens === "hausse" || Math.random() < 0.6;
  const g = randomChoice(GRANDEURS);
  const c = hausse ? 1 + t / 100 : 1 - t / 100;
  const bon = fr(c);
  const T = fr(t);
  const text = hausse
    ? randomChoice([
        `Pour augmenter un prix de ${T} %, je dois le multiplier par :`,
        `Augmenter une quantité de ${T} %, c’est la multiplier par :`,
        `${cap(g.quoi)} augmente de ${T} %. On obtient la nouvelle valeur en multipliant l’ancienne par :`,
        `Le coefficient multiplicateur associé à une hausse de ${T} % est :`,
        `Un commerçant augmente tous ses prix de ${T} %. Il multiplie chaque prix par :`,
        `Une hausse de ${T} % ${aGn(g.quoi)} revient à multiplier par :`,
        `Dans un tableur, on veut augmenter la cellule B2 de ${T} % avec la formule « =B2*… ». Quel nombre écrit-on ?`,
        `Sans calculatrice : ${g.quoi} est augmenté${g.g === "m" ? "" : "e"} de ${T} %. Par quel nombre est-${g.g === "m" ? "il" : "elle"} multiplié${g.g === "m" ? "" : "e"} ?`,
      ])
    : randomChoice([
        `Pour diminuer un prix de ${T} %, je dois le multiplier par :`,
        `Baisser une quantité de ${T} %, c’est la multiplier par :`,
        `${cap(g.quoi)} baisse de ${T} %. On obtient la nouvelle valeur en multipliant l’ancienne par :`,
        `Le coefficient multiplicateur associé à une baisse de ${T} % est :`,
        `Pendant les soldes, une boutique fait une remise de ${T} % sur tous ses prix. Elle multiplie chaque prix par :`,
        `Dans un tableur, on veut diminuer la cellule B2 de ${T} % avec la formule « =B2*… ». Quel nombre écrit-on ?`,
      ]);
  const vf = virguleFausse(t);
  return {
    text,
    format: "qcm" as const,
    choices: makeChoices(bon, [fr(t / 100), T, fr(hausse ? 1 + vf : 1 - vf), fr(hausse ? 1 - t / 100 : 1 + t / 100)]),
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `${hausse ? "augmenter" : "diminuer"} de t %, c’est multiplier par 1 ${hausse ? "+" : "−"} t/100.`,
      `${T} % = ${T} ÷ 100 = ${fr(t / 100)}.`,
      `1 ${hausse ? "+" : "−"} ${fr(t / 100)} = ${bon}.`,
      `on multiplie par ${bon} ⚠️ et non par ${fr(hausse ? 1 + vf : 1 - vf)} : ${T} %, c’est ${fr(t / 100)}.`,
    ),
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

const ARTICLES_PRIX = ["un vélo", "une tablette", "un casque audio", "une paire de baskets", "un sac de sport", "une guitare", "un billet de concert", "une montre connectée", "un manteau", "un lave-linge", "un smartphone", "une trottinette"];

/** Services et achats soumis à la TVA : [libellé, taux possibles]. */
const ACHATS_TVA: Array<[string, number[]]> = [
  ["un ordinateur portable", [20]],
  ["une réparation chez le garagiste", [20]],
  ["un repas au restaurant", [10]],
  ["des travaux de rénovation", [10]],
  ["un abonnement internet", [20]],
  ["un séjour à l’hôtel", [10]],
  ["un téléviseur", [20]],
  ["un billet de transport en commun", [10]],
];

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Valeur initiale en UN geste : on divise par un seul coefficient.
 * « remise » : prix avant une remise ou des soldes ; « hausse » : valeur avant une hausse
 * (salaire, population, abonnés…) ; « baisse » : valeur avant une baisse ; « ttc » : du TTC vers le HT.
 * ⛔ genDepart enchaîne deux évolutions : trop haut pour découvrir la micro.
 * ⛔ 23/11 (audit) : 4,2 à 4,7 répétitions sur 20 → 6 à 8 tournures par type, plus de contextes,
 * et une forme QCM du HT dont les pièges restent propres (jamais « 1222,2222 € »).
 */
export function genValeurInitiale(type: "remise" | "hausse" | "baisse" | "ttc", tauxImposes?: number[]) {
  if (type === "remise") {
    const objet = randomChoice(ARTICLES_PRIX);
    const il = objet.startsWith("une") ? "elle" : "il";
    const dObj = "d’" + objet;
    const t = randomChoice(tauxImposes ?? [10, 20, 25, 50]);
    const v0 = randomChoice([40, 60, 80, 100, 120, 200, 300, 400, 500, 800]);
    const c = (100 - t) / 100;
    const v1 = round2(v0 * c);
    return {
      text: randomChoice([
        `Après une remise de ${t} %, ${objet} coûte ${fr(v1)} €. Quel était son prix avant la remise ?`,
        `On paie ${objet} ${fr(v1)} € après une remise de ${t} %. Quel était le prix avant la remise ?`,
        `Pendant les soldes, le prix ${dObj} est de ${fr(v1)} €, soit ${t} % de moins qu’avant. Quel était ce prix avant les soldes ?`,
        `Prix après une remise de ${t} % : ${fr(v1)} €. Quel était le prix de départ ?`,
        `Avec sa carte de fidélité, Inès a ${t} % de réduction : elle paie ${objet} ${fr(v1)} €. Quel est le prix sans réduction ?`,
        `L’étiquette ${dObj} indique « − ${t} % : ${fr(v1)} € ». Quel est le prix barré ?`,
        `Une promotion fait baisser de ${t} % le prix ${dObj}, qui passe à ${fr(v1)} €. Combien coûtait-${il} avant ?`,
        `Le jour du « Black Friday », ${objet} est vendu${il === "elle" ? "e" : ""} ${fr(v1)} € après ${t} % de rabais. Quel était son prix normal ?`,
      ]),
      format: "short" as const,
      expected: attendu(v0, "€"),
      comparator: "number_equal" as const,
      explanation: expl("prix de départ × coefficient = prix final.", `une remise de ${t} %, c’est × ${fr(c)} ; pour remonter, on DIVISE par ${fr(c)}.`, `${fr(v1)} ÷ ${fr(c)} = ${fr(v0)}.`, `le prix de départ était ${fr(v0)} € ⚠️ ajouter ${t} % à ${fr(v1)} € ne redonne pas ce prix, car la remise porte sur l’ancien prix.`),
    };
  }
  if (type === "hausse" || type === "baisse") {
    const hausse = type === "hausse";
    const g = randomChoice(GRANDEURS);
    const t = randomChoice(tauxImposes ?? [10, 20, 25, 50]);
    const pron = g.g === "m" ? "il" : "elle";
    const v0 = randomChoice(g.v);
    const c = (hausse ? 100 + t : 100 - t) / 100;
    const v1 = round2(v0 * c);
    const unite = g.u === "€" || g.u === "kg" ? g.u : "";
    const suffixe = unite ? " " + unite : "";
    const nom = hausse ? "hausse" : "baisse";
    const text = hausse
      ? randomChoice([
          `Après une hausse de ${t} %, ${g.quoi} vaut ${fr(v1)}${suffixe}. Quelle était sa valeur avant la hausse ?`,
          `${cap(g.quoi)} a gagné ${t} % et atteint ${fr(v1)}${suffixe}. Quelle était sa valeur de départ ?`,
          `Valeur après une hausse de ${t} % : ${fr(v1)}${suffixe} (${g.quoi}). Quelle était la valeur de départ ?`,
          `En un an, ${g.quoi} a augmenté de ${t} % : ${pron} vaut maintenant ${fr(v1)}${suffixe}. Combien valait-${pron} l’an dernier ?`,
          `${cap(g.quoi)} est en hausse de ${t} % et s’établit à ${fr(v1)}${suffixe}. Retrouve sa valeur d’avant.`,
          `Une augmentation de ${t} % a porté ${g.quoi} à ${fr(v1)}${suffixe}. Quelle était sa valeur initiale ?`,
          `Un journal titre : « + ${t} % ! » ; ${g.quoi} atteint ${fr(v1)}${suffixe}. Quelle était sa valeur avant ?`,
        ])
      : randomChoice([
          `Après une baisse de ${t} %, ${g.quoi} vaut ${fr(v1)}${suffixe}. Quelle était sa valeur avant la baisse ?`,
          `${cap(g.quoi)} a perdu ${t} % et n’est plus que de ${fr(v1)}${suffixe}. Quelle était sa valeur de départ ?`,
          `En un an, ${g.quoi} a diminué de ${t} % : ${pron} vaut maintenant ${fr(v1)}${suffixe}. Combien valait-${pron} l’an dernier ?`,
          `${cap(g.quoi)} est en recul de ${t} % et s’établit à ${fr(v1)}${suffixe}. Retrouve sa valeur d’avant.`,
          `Une baisse de ${t} % a ramené ${g.quoi} à ${fr(v1)}${suffixe}. Quelle était sa valeur initiale ?`,
          `Valeur après une baisse de ${t} % : ${fr(v1)}${suffixe} (${g.quoi}). Quelle était la valeur de départ ?`,
        ]);
    return {
      text,
      format: "short" as const,
      expected: attendu(v0, unite),
      comparator: "number_equal" as const,
      explanation: expl(
        "valeur de départ × coefficient = valeur finale.",
        `une ${nom} de ${t} %, c’est × ${fr(c)} ; pour remonter, on DIVISE par ${fr(c)}.`,
        `${fr(v1)} ÷ ${fr(c)} = ${fr(v0)}.`,
        `${g.quoi} valait ${fr(v0)}${suffixe} au départ ⚠️ ${hausse ? "retirer" : "ajouter"} ${t} % à ${fr(v1)} ne redonne pas cette valeur : le pourcentage porte sur l’ancienne valeur.`,
      ),
    };
  }
  const [achat, tauxTva] = Math.random() < 0.5 ? randomChoice(ACHATS_TVA) : [randomChoice(ARTICLES_PRIX), [10, 20]];
  const t = randomChoice(tauxTva);
  const ht = randomChoice([50, 100, 150, 200, 300, 500, 1000, 1200]);
  const c = (100 + t) / 100;
  const ttc = round2(ht * c);
  const text = randomChoice([
    `${cap(achat)} coûte ${fr(ttc)} € TTC, avec une TVA de ${t} %. Quel est le prix hors taxes (HT), en € ?`,
    `Une facture indique ${fr(ttc)} € TTC pour ${achat}, avec une TVA à ${t} %. Quel est le montant HT, en € ?`,
    `Prix TTC : ${fr(ttc)} €. Taux de TVA : ${t} %. Calcule le prix HT, en €.`,
    `Pour ${achat}, on paie ${fr(ttc)} € toutes taxes comprises (TVA ${t} %). Quel est le montant hors taxes ?`,
    `Un comptable doit retrouver le montant HT ${dObjet(achat)} payé ${fr(ttc)} € TTC (TVA à ${t} %). Quel montant inscrit-il ?`,
    `La TVA de ${t} % est comprise dans les ${fr(ttc)} € payés pour ${achat}. Quel est le prix HT ?`,
  ]);
  const explanation = expl("prix TTC = prix HT × (1 + taux de TVA).", `une TVA de ${t} %, c’est × ${fr(c)} ; pour revenir au HT, on DIVISE par ${fr(c)}.`, `${fr(ttc)} ÷ ${fr(c)} = ${fr(ht)}.`, `le prix HT est ${fr(ht)} € ⚠️ retirer ${t} % du TTC ne donne pas le HT.`);
  if (Math.random() < 0.35) {
    const bon = `${fr(ht)} €`;
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(bon, [`${fr(round2(ttc * (1 - t / 100)))} €`, `${fr(round2(ttc - t))} €`, `${fr(round2(ttc * c))} €`, `${fr(round2((ttc * t) / 100))} €`]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation,
    };
  }
  return { text, format: "short" as const, expected: attendu(ht, "€"), comparator: "number_equal" as const, explanation };
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

const H_REC = "Le coefficient de l’évolution réciproque est l’INVERSE : 1 ÷ k.";

const PCT_SIMPLES = [5, 10, 20, 25, 30, 40, 50, 75];
// Taux entiers de l'épreuve anticipée (genCoeffMult arrondit au centième : pas de 0,5 % ici).
const PCT_EPREUVE_ENTIERS = [3, 5, 7, 10, 12, 15, 20, 25, 30, 50];
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
  // ⛔ 23/11 : la réciproque reçoit SON générateur (1 ÷ k), plus genCompensation ni genDepart.
  [N2, "info_evolution_reciproque", 3, () => genRetour(), H_REC],
  [N2, "info_evolution_reciproque", 3, () => genReciproque(3), H_REC],
  [N2, "info_evolution_reciproque", 4, () => genReciproque(4), H_REC],
  [N2, "info_evolution_reciproque", 4, () => genRetour(), H_REC],
  [N2, "info_evolution_reciproque", 5, () => genReciproque(4), H_REC],
  [N2, "info_evolution_reciproque", 5, () => genRetour(), H_REC],
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
  // ⛔ 23/11 : l'exercice type de l'épreuve (« augmenter de 15 %, je multiplie par ? ») en QCM.
  [CM, "auto_evo_additif_multiplicatif", 1, () => genAddMult(1), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 1, () => genCoeffMult("short", "hausse", PCT_EPREUVE_ENTIERS), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 1, () => genCoeffQcm("hausse"), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 2, () => genAddMult(2), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 2, () => genCoeffMult("short", "mixte", PCT_EPREUVE_ENTIERS), H_EVO],
  [CM, "auto_evo_additif_multiplicatif", 2, () => genCoeffQcm("mixte"), H_EVO],
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
  [CM, "auto_evo_valeur_initiale", 2, () => genValeurInitiale(randomChoice(["remise", "baisse"] as const)), H_VI],
  [CM, "auto_evo_valeur_initiale", 2, () => genValeurInitiale("hausse"), H_VI],
  [CM, "auto_evo_valeur_initiale", 3, () => genDepart(), H_VI],
  [CM, "auto_evo_valeur_initiale", 3, () => genValeurInitiale("ttc"), H_VI],
  [CM, "auto_evo_valeur_initiale", 3, () => genValeurInitiale(randomChoice(["remise", "hausse", "baisse"] as const), [5, 10, 20, 25, 40, 50]), H_VI],
  [TE, "auto_evo_calculer_taux", 2, () => genTauxEvolution(PCT_SIMPLES), H_EVO],
  [TE, "auto_evo_calculer_taux", 2, () => genCoeffVersTaux(PCT_SIMPLES), H_EVO],
  [TE, "auto_evo_calculer_taux", 3, () => genTauxEvolution(PCT_DIFF), H_EVO],
  [TE, "auto_evo_calculer_taux", 3, () => genAbsRel(3), H_ABS],
  [TE, "auto_evo_calculer_taux", 3, () => genCoeffMillieme(), H_EVO],
  [TE, "auto_evo_successives", 3, () => genSuccessives(true), H_EVO],
  [TE, "auto_evo_successives", 3, () => genSuccessives(false), H_EVO],
  [TE, "auto_evo_successives", 4, () => genTauxGlobal(), H_EVO],
  [TE, "auto_evo_successives", 4, () => genCoeffGlobal(), H_EVO],
  // ⛔ 23/11 : le geste « 1 ÷ k » revient (genDepart n'est pas une réciproque), étoiles 2 à 4.
  [TE, "auto_evo_reciproque", 2, () => genReciproque(2), H_REC],
  [TE, "auto_evo_reciproque", 3, () => genReciproque(3), H_REC],
  [TE, "auto_evo_reciproque", 3, () => genRetour(), H_REC],
  [TE, "auto_evo_reciproque", 4, () => genRetour(), H_REC],
  [TE, "auto_evo_reciproque", 4, () => genReciproque(4), H_REC],
  // ⛔ 23/11 : deux gabarits ★3 DIFFÉRENTS (le sens, puis le chiffre).
  [TE, "auto_evo_piege_compensation", 3, () => genCompensation(3, "sens"), H_EVO],
  [TE, "auto_evo_piege_compensation", 3, () => genCompensation(3, "chiffre"), H_EVO],
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
  // ⛔ 23/11 : les trois gabarits de la banque STMG (une seule phrase chacun) ne sont plus gardés.
  [EC, "auto_evo_valeur_initiale", 2, () => genValeurInitiale(randomChoice(["remise", "baisse"] as const)), H_VI],
  [EC, "auto_evo_valeur_initiale", 2, () => genValeurInitiale("hausse"), H_VI],
  [EC, "auto_evo_valeur_initiale", 2, () => genValeurInitiale("ttc"), H_VI],
  [EC, "auto_evo_valeur_initiale", 3, () => genDepart(), H_VI],
  [EC, "auto_evo_valeur_initiale", 3, () => genValeurInitiale("ttc"), H_VI],
  [EC, "auto_evo_valeur_initiale", 3, () => genValeurInitiale(randomChoice(["remise", "hausse", "baisse"] as const), [4, 5, 15, 30, 40]), H_VI],
  [EE, "auto_evo_chaine_coefficients", 2, () => genSuccessives(true), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 2, () => genSuccessives(false), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 3, () => genTauxGlobal(), H_EVO],
  [EE, "auto_evo_chaine_coefficients", 3, () => genCoeffGlobal(), H_EVO],
  [EE, "auto_evo_successives", 3, () => genSuccessives(false), H_EVO],
  [EE, "auto_evo_successives", 3, () => genTauxGlobal(), H_EVO],
  [EE, "auto_evo_reciproque", 2, () => genRetour(), H_REC],
  [EE, "auto_evo_reciproque", 2, () => genReciproque(2), H_REC],
  [EE, "auto_evo_reciproque", 3, () => genRetour(), H_REC],
  [EE, "auto_evo_reciproque", 3, () => genReciproque(3), H_REC],
  [EE, "auto_evo_piege_compensation", 2, () => genCompensation(2, "sens"), H_EVO],
  [EE, "auto_evo_piege_compensation", 2, () => genCompensation(3, "chiffre"), H_EVO],
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
