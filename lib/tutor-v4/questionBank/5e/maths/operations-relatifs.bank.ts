import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function signed(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}

function withParens(n: number): string {
  return `(${signed(n)})`;
}

function asExpectedNumber(n: number): string[] {
  return [String(n), signed(n)];
}

function expl(calcul: string) {
  return (
    "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
    "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : le résultat obtenu est la bonne réponse."
  );
}

// ⭐ 09/10/2026 — DES SITUATIONS ET DES FORMES, PAS UNE PHRASE. Mesuré le 09/10 :
// 8 à 19 squelettes par micro, jusqu'à 18 répétitions sur 20. Chaque gabarit
// varie la consigne (Calcule, Que vaut, Complète, en mots…), la place de
// l'inconnue, le nombre de termes, et met une partie des tirages en situation
// (températures, ascenseur, compte, jeu, plongée, golf…) avec des prénoms.
// Correcteurs : correcteurs/operations-relatifs.ts. ⛔ Signe « − » partout
// (`vraiMoins`, en bas du fichier) ; un négatif après une opération est entre
// parenthèses : « 5 + (−3) ».
import { PRENOMS, pick, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";
import { rel as relSigne, par, attendus, vraiMoins, choix, randInt, nonNul, deux, il, Il, pl, VILLES } from "./nombres-relatifs.bank";

/** Un relatif écrit : « −7 » ; un positif s'écrit « 7 », parfois « +7 ». (Pour un QCM, utiliser `relSigne`, stable.) */
const rel = (n: number, plus = Math.random() < 0.3) => relSigne(n, plus);

type Terme = { op: "+" | "−"; v: number };
/** « −3 + (−4) − (+2) » : premier terme, puis chaque terme (négatif entre parenthèses, positif parfois « (+5) »). */
function ecrire(premier: number, termes: Terme[]) {
  return [rel(premier, Math.random() < 0.25), ...termes.map((t) => `${t.op} ${par(t.v, Math.random() < 0.25)}`)].join(" ");
}
const shuffleTermes = (t: Terme[]) => [...t].sort(() => Math.random() - 0.5);
const valeurDe = (premier: number, termes: Terme[]) => termes.reduce((s, t) => (t.op === "+" ? s + t.v : s - t.v), premier);
/** Huit consignes pour un calcul écrit. */
function consigne(expr: string, p: Prenom) {
  return choix([
    `Calcule : ${expr}`,
    `Que vaut ${expr} ?`,
    `Complète : ${expr} = …`,
    `${p.nom} calcule ${expr}. Quel résultat doit-${il(p)} trouver ?`,
    `${p.nom} a écrit ${expr} au tableau. Combien cela fait-il ?`,
    `Quel est le résultat de ${expr} ? ${p.nom} vérifie de tête.`,
    `${p.nom} doit donner la valeur de ${expr}. Que trouve-t-${il(p)} ?`,
    `Aide ${p.nom} à effectuer ${expr}.`,
    `${p.nom} complète son cahier : ${expr} = …`,
    `Dans l’exercice ${de(p.nom)}, il faut calculer ${expr}. Quel est le résultat ?`,
  ]);
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Minuscule en tête de phrase… sauf devant un prénom. */
const bas = (s: string) => (PRENOMS.some((p) => s.startsWith(p.nom)) ? s : s.charAt(0).toLowerCase() + s.slice(1));

/** Une grandeur qui évolue : point de départ, hausses et baisses, question finale (10 situations). */
type Evolution = {
  u: string;
  /** Contraintes sur les valeurs successives (plongée : toujours sous l'eau). */
  ok?: (x: number) => boolean;
  depart: (p: Prenom, s: number) => string;
  hausse: (p: Prenom, a: number) => string;
  baisse: (p: Prenom, a: number) => string;
  questions: (p: Prenom) => string[];
};
const EVOLUTIONS: Evolution[] = [
  {
    u: "°C",
    ok: (x) => x >= -12 && x <= 30,
    depart: (_p, s) => `Ce matin, à ${choix(VILLES)}, il fait ${rel(s)} °C.`,
    hausse: (_p, a) => `la température monte de ${a} °C`,
    baisse: (_p, a) => `la température baisse de ${a} °C`,
    questions: () => ["Quelle température fait-il à la fin ?", "Quelle est la nouvelle température ?"],
  },
  {
    u: "",
    ok: (x) => x >= -5 && x <= 12,
    depart: (p, s) => `${p.nom} est au niveau ${rel(s)} d’un immeuble.`,
    hausse: (p, a) => `${il(p)} monte de ${pl(a, "étage")}`,
    baisse: (p, a) => `${il(p)} descend de ${pl(a, "étage")}`,
    questions: (p) => [`À quel niveau arrive-t-${il(p)} ?`, `À quel niveau est-${il(p)} à la fin ?`],
  },
  {
    u: "€",
    depart: (p, s) => `Le compte ${de(p.nom)} est à ${rel(s)} €.`,
    hausse: (p, a) => `${p.nom} reçoit ${a} €`,
    baisse: (p, a) => `${p.nom} paie ${a} €`,
    questions: () => ["Quel est le nouveau solde ?", "Combien y a-t-il sur le compte à la fin ?"],
  },
  {
    u: "",
    depart: (p, s) => `Au jeu, ${p.nom} a ${rel(s)} points.`,
    hausse: (p, a) => `${il(p)} gagne ${pl(a, "point")}`,
    baisse: (p, a) => `${il(p)} perd ${pl(a, "point")}`,
    questions: (p) => [`Combien de points a-t-${il(p)} à la fin ?`, "Quel est son score final ?"],
  },
  {
    u: "m",
    ok: (x) => x <= -1 && x >= -40,
    depart: (p, s) => `${p.nom} plonge : ${il(p)} est à l’altitude ${rel(s)} m.`,
    hausse: (p, a) => `${il(p)} remonte de ${a} m`,
    baisse: (p, a) => `${il(p)} descend de ${a} m`,
    questions: (p) => [`À quelle altitude est-${il(p)} ensuite ?`, "Quelle est sa nouvelle altitude ?"],
  },
  {
    u: "",
    ok: (x) => Math.abs(x) <= 12,
    depart: (p, s) => `Au golf, ${p.nom} est à ${rel(s)} par rapport au par.`,
    hausse: (p, a) => `au trou suivant, ${il(p)} joue ${pl(a, "coup")} de plus que le par`,
    baisse: (p, a) => `au trou suivant, ${il(p)} joue ${pl(a, "coup")} de moins que le par`,
    questions: (p) => [`Où en est-${il(p)} par rapport au par ?`, "Quel est son total par rapport au par ?"],
  },
  {
    u: "°C",
    ok: (x) => x <= 8 && x >= -25,
    depart: (p, s) => `Le congélateur ${de(p.nom)} est à ${rel(s)} °C.`,
    hausse: (_p, a) => `pendant une coupure, la température monte de ${a} °C`,
    baisse: (_p, a) => `le moteur repart et la température baisse de ${a} °C`,
    questions: () => ["Quelle température affiche-t-il ensuite ?", "À quelle température est-il à la fin ?"],
  },
  {
    u: "°C",
    depart: (p, s) => `Au refuge où dort ${p.nom}, il fait ${rel(s)} °C au lever du jour.`,
    hausse: (_p, a) => `la température monte de ${a} °C dans la matinée`,
    baisse: (_p, a) => `la température baisse de ${a} °C`,
    questions: () => ["Quelle température fait-il alors ?", "Quelle est la température à la fin ?"],
  },
  {
    u: "",
    ok: (x) => x >= -4 && x <= 4,
    depart: (p, s) => `Dans le parking, ${p.nom} est au niveau ${rel(s)}.`,
    hausse: (p, a) => `${il(p)} monte de ${pl(a, "niveau")}`,
    baisse: (p, a) => `${il(p)} descend de ${pl(a, "niveau")}`,
    questions: (p) => [`À quel niveau arrive-t-${il(p)} ?`, `À quel niveau ${p.nom} est-${il(p)} à la fin ?`],
  },
  {
    u: "€",
    depart: (p, s) => `La cagnotte du club ${de(p.nom)} est à ${rel(s)} €.`,
    hausse: (_p, a) => `le club reçoit un don de ${a} €`,
    baisse: (_p, a) => `le club paie ${a} € de matériel`,
    questions: () => ["Combien y a-t-il dans la cagnotte à la fin ?", "Quel est le nouveau solde de la cagnotte ?"],
  },
];

/** Une évolution tirée : départ s, `k` changements (hausses ou baisses) ; valeurs plausibles. */
function evolutionTiree(k: number, maxVal: number, maxPas: number) {
  for (;;) {
    const p = pick(PRENOMS);
    const e = choix(EVOLUTIONS);
    const s = nonNul(maxVal);
    const pas = Array.from({ length: k }, () => nonNul(maxPas));
    const suite = pas.reduce<number[]>((acc, a) => [...acc, acc[acc.length - 1] + a], [s]);
    if (e.ok && !suite.every(e.ok)) continue;
    if (k > 1 && pas.every((a) => a > 0)) continue;
    const phrases = pas.map((a, i) => {
      const ph = a > 0 ? e.hausse(p, a) : e.baisse(p, -a);
      return i === 0 ? `${cap(ph)}.` : `${choix(["Puis", "Ensuite,", "Plus tard,"])} ${bas(ph)}.`;
    });
    const fin = suite[suite.length - 1];
    return {
      p,
      e,
      s,
      pas,
      fin,
      text: `${e.depart(p, s)} ${phrases.join(" ")} ${choix(e.questions(p))}`,
      calcul: ecrire(s, pas.map((a) => ({ op: "+" as const, v: a }))),
    };
  }
}

/** Une variation entre deux valeurs (6 situations) : « passe de s à e, de combien a-t-elle monté ? », ou un écart. */
function variationTiree() {
  const p = pick(PRENOMS);
  const e1 = (s: number, e: number, m: string, d: string) => (e > s ? m : d);
  const accord = (mot: string) => (p.f ? `${mot}e` : mot);
  const sits = [
    () => {
      const s = nonNul(15);
      let e = nonNul(15);
      while (e === s) e = nonNul(15);
      return { s, e, u: "°C", t: `À ${choix(VILLES)}, la température passe de ${rel(s)} °C à ${rel(e)} °C. De combien de degrés a-t-elle ${e1(s, e, "monté", "baissé")} ?` };
    },
    () => {
      const s = randInt(-5, 8);
      let e = randInt(-5, 8);
      while (e === s) e = randInt(-5, 8);
      return { s, e, u: "", t: `${p.nom} passe du niveau ${rel(s)} au niveau ${rel(e)} de l’immeuble. De combien d’étages est-${il(p)} ${e1(s, e, accord("monté"), accord("descendu"))} ?` };
    },
    () => {
      const s = nonNul(80);
      let e = nonNul(80);
      while (e === s) e = nonNul(80);
      return { s, e, u: "€", t: `Le compte ${de(p.nom)} passe de ${rel(s)} € à ${rel(e)} €. De combien d’euros a-t-il ${e1(s, e, "augmenté", "diminué")} ?` };
    },
    () => {
      const s = -randInt(1, 30);
      let e = -randInt(1, 30);
      while (e === s) e = -randInt(1, 30);
      return { s, e, u: "m", t: `${p.nom} plonge et passe de l’altitude ${rel(s)} m à ${rel(e)} m. De combien de mètres est-${il(p)} ${e1(s, e, accord("remonté"), accord("descendu"))} ?` };
    },
    () => {
      const [v1, v2] = deux(VILLES);
      const s = nonNul(15);
      let e = nonNul(15);
      while (e === s) e = nonNul(15);
      return { s, e, u: "°C", t: `À ${v1}, il fait ${rel(s)} °C ; à ${v2}, il fait ${rel(e)} °C. Quel est l’écart de température entre les deux villes ?` };
    },
    () => {
      const s = nonNul(30);
      let e = nonNul(30);
      while (e === s) e = nonNul(30);
      return { s, e, u: "", t: `Au jeu, ${p.nom} passe de ${rel(s)} points à ${rel(e)} points. Combien de points a-t-${il(p)} ${e1(s, e, "gagnés", "perdus")} ?` };
    },
  ];
  const r = choix(sits)();
  return { ...r, ecart: Math.abs(r.e - r.s), calcul: `${rel(Math.max(r.s, r.e))} − ${par(Math.min(r.s, r.e), true)}` };
}

const operationsRelatifsBrut: TutorBankItemV4[] = [
  // =========================
  // RELATIF_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "relatif_addition_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 3 + 2",
    format: "short",
    expected: ["5", "+5"],
    comparator: "number_equal",
    hint: "Additionne deux nombres positifs.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("3 + 2 = 5.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : -4 + (-3)",
    format: "short",
    expected: ["-7"],
    comparator: "number_equal",
    hint: "Quand les deux nombres sont négatifs, on additionne les distances à 0 et on garde le signe -.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-4 + (-3) = -7.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : -5 + 2",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Les signes sont différents : on soustrait les distances à 0.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-5 + 2 = -3 car 5 - 2 = 3 et le résultat garde le signe du nombre qui a la plus grande distance à 0.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 + (-10)",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Additionner un nombre négatif revient à reculer sur la droite graduée.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("7 + (-10) = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : +(+2) + (-2)",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Un nombre et son opposé ont une somme nulle.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("+(+2) + (-2) = 2 + (-2) = 0.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition", "parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de -6 + 9 ?",
    format: "qcm",
    choices: ["-15", "-3", "3", "15"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Les signes sont différents : on soustrait 9 et 6.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 + 9 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si les deux termes ont le même signe ou non.",
    tags: ["relatif", "addition", "template"],
    // 09/10/2026 : deux termes jusqu'à 20 ; 8 consignes, le terme manquant, ou une situation (10) à un changement.
    generate: () => {
      const p = pick(PRENOMS);
      const forme = Math.random();
      if (forme < 0.2) {
        const ev = evolutionTiree(1, 15, 12);
        return {
          text: ev.text,
          format: "short",
          expected: attendus(ev.fin, ev.e.u),
          comparator: "number_equal",
          explanation: expl(`On traduit par une addition : ${ev.calcul} = ${rel(ev.fin)}.`),
        };
      }
      const a = nonNul(20);
      const b = nonNul(20);
      const expr = ecrire(a, [{ op: "+", v: b }]);
      if (forme < 0.35) {
        return {
          text: choix([
            `Complète : ${rel(a)} + … = ${rel(a + b)}`,
            `${p.nom} cherche le nombre caché : ${rel(a)} + … = ${rel(a + b)}`,
            `Quel nombre faut-il ajouter à ${rel(a)} pour obtenir ${rel(a + b)} ?`,
          ]),
          format: "short",
          expected: attendus(b),
          comparator: "number_equal",
          explanation: expl(`${rel(a)} + ${par(b, true)} = ${rel(a + b)} : le nombre cherché est ${rel(b)}.`),
        };
      }
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(a + b),
        comparator: "number_equal",
        explanation: expl(
          (a < 0) === (b < 0)
            ? `Même signe : on ajoute les distances à 0 (${Math.abs(a)} + ${Math.abs(b)}) et on garde le signe. ${expr} = ${rel(a + b)}.`
            : `Signes contraires : on soustrait les distances à 0 et on garde le signe de celui qui est le plus loin de 0. ${expr} = ${rel(a + b)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_2_simple",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    hint: "Sur la droite graduée : ajouter un positif, c’est avancer ; ajouter un négatif, c’est reculer.",
    tags: ["relatif", "addition", "template"],
    // 09/10/2026 : deux termes jusqu'à 9 ; 8 consignes ou une situation (10) à un changement.
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.3) {
        const ev = evolutionTiree(1, 9, 9);
        return {
          text: ev.text,
          format: "short",
          expected: attendus(ev.fin, ev.e.u),
          comparator: "number_equal",
          explanation: expl(`On part de ${rel(ev.s)} et on ajoute ${par(ev.pas[0], true)} : ${ev.calcul} = ${rel(ev.fin)}.`),
        };
      }
      const a = nonNul(9);
      const b = nonNul(9);
      const expr = ecrire(a, [{ op: "+", v: b }]);
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(a + b),
        comparator: "number_equal",
        explanation: expl(`On part de ${rel(a)} sur la droite graduée et on ${b > 0 ? "avance" : "recule"} de ${Math.abs(b)} : ${expr} = ${rel(a + b)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_3_quatre",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 3,
    theme: "neutral",
    hint: "Regroupe les positifs d’un côté, les négatifs de l’autre, puis fais le bilan.",
    tags: ["relatif", "addition", "template"],
    // 09/10/2026 : somme de quatre relatifs — liste en situation (4), calcul écrit (8 consignes) ou évolution à 3 changements.
    generate: () => {
      const p = pick(PRENOMS);
      const v = [nonNul(15), -randInt(1, 15), nonNul(15), randInt(1, 15)].sort(() => Math.random() - 0.5);
      const total = v.reduce((s, x) => s + x, 0);
      const forme = Math.random();
      if (forme < 0.25) {
        const ev = evolutionTiree(3, 15, 10);
        return {
          text: ev.text,
          format: "short",
          expected: attendus(ev.fin, ev.e.u),
          comparator: "number_equal",
          explanation: expl(`On traduit par une somme : ${ev.calcul} = ${rel(ev.fin)}.`),
        };
      }
      if (forme < 0.6) {
        const sit = choix([
          { u: "", t: `Au jeu, ${p.nom} marque en quatre manches : ${v.map((x) => rel(x)).join(" ; ")}. Quel est son total ?` },
          { u: "°C", t: `La température a varié ainsi pendant quatre jours : ${v.map((x) => `${rel(x)} °C`).join(" ; ")}. Quelle est la variation totale ?` },
          { u: "€", t: `Le compte ${de(p.nom)} a connu ces mouvements : ${v.map((x) => `${rel(x)} €`).join(" ; ")}. Quel est le bilan ?` },
          { u: "", t: `Au golf, ${p.nom} note ses écarts au par sur quatre trous : ${v.map((x) => rel(x)).join(" ; ")}. Quel est son total ?` },
        ]);
        return {
          text: sit.t,
          format: "short",
          expected: attendus(total, sit.u),
          comparator: "number_equal",
          explanation: expl(
            `Positifs : ${v.filter((x) => x > 0).join(" + ") || "aucun"}. Négatifs : ${v.filter((x) => x < 0).map((x) => rel(x)).join(" ; ")}. Total : ${rel(total)}.`,
          ),
        };
      }
      const expr = ecrire(v[0], v.slice(1).map((x) => ({ op: "+" as const, v: x })));
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(total),
        comparator: "number_equal",
        explanation: expl(`On regroupe : positifs ${v.filter((x) => x > 0).join(" + ")}, négatifs ${v.filter((x) => x < 0).map((x) => par(x)).join(" + ")}. ${expr} = ${rel(total)}.`),
      };
    },
  },

  // =========================
  // RELATIF_SOUSTRACTION
  // =========================
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 5 - 2",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Soustraire 2, c’est reculer de 2.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("5 - 2 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : -2 - 3",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Partir de -2 puis encore reculer de 3 donne un nombre plus petit.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 - 3 = -2 + (-3) = -5.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "sans_parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 4 - (-3)",
    format: "short",
    expected: ["7", "+7"],
    comparator: "number_equal",
    hint: "Soustraire un nombre négatif revient à ajouter son opposé.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("4 - (-3) = 4 + 3 = 7.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : -5 - (-2)",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Soustraire un négatif revient à ajouter un positif.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-5 - (-2) = -5 + 2 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : +(+2) - (-2)",
    format: "short",
    expected: ["4", "+4"],
    comparator: "number_equal",
    hint: "Le double signe -(-2) devient +2.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("+(+2) - (-2) = 2 + 2 = 4.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : -(-2)",
    format: "short",
    expected: ["2", "+2"],
    comparator: "number_equal",
    hint: "L’opposé d’un nombre négatif est un nombre positif.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-(-2) = +2.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de -7 - (-4) ?",
    format: "qcm",
    choices: ["-11", "-3", "3", "11"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Soustraire un négatif revient à ajouter.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-7 - (-4) = -7 + 4 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la soustraction par une addition de l’opposé.",
    tags: ["relatif", "soustraction", "template"],
    // 09/10/2026 : a − b jusqu'à 20 ; 8 consignes, un terme manquant (2 places), ou « ajouter l'opposé » à compléter.
    generate: () => {
      const p = pick(PRENOMS);
      const a = nonNul(20);
      const b = nonNul(20);
      const r = a - b;
      const forme = Math.random();
      if (forme < 0.15)
        return {
          text: choix([
            `Soustraire un nombre, c’est ajouter son opposé. Complète : ${rel(a)} − ${par(b, true)} = ${rel(a)} + …`,
            `${p.nom} transforme la soustraction en addition. Complète : ${rel(a)} − ${par(b, true)} = ${rel(a)} + …`,
          ]),
          format: "short",
          expected: attendus(-b),
          comparator: "number_equal",
          explanation: expl(`Soustraire ${par(b, true)}, c’est ajouter son opposé ${par(-b, true)} : ${rel(a)} − ${par(b, true)} = ${rel(a)} + ${par(-b, true)} = ${rel(r)}.`),
        };
      if (forme < 0.35) {
        const trouDevant = Math.random() < 0.5;
        return {
          text: trouDevant
            ? choix([`Complète : … − ${par(b, true)} = ${rel(r)}`, `${p.nom} cherche le nombre caché : … − ${par(b, true)} = ${rel(r)}`])
            : choix([`Complète : ${rel(a)} − … = ${rel(r)}`, `Quel nombre faut-il soustraire à ${rel(a)} pour obtenir ${rel(r)} ?`]),
          format: "short",
          expected: attendus(trouDevant ? a : b),
          comparator: "number_equal",
          explanation: expl(`${rel(a)} − ${par(b, true)} = ${rel(r)} : le nombre cherché est ${rel(trouDevant ? a : b)}.`),
        };
      }
      const expr = ecrire(a, [{ op: "−", v: b }]);
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(r),
        comparator: "number_equal",
        explanation: expl(`On ajoute l’opposé : ${expr} = ${rel(a)} + ${par(-b, true)} = ${rel(r)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_2_simple",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustraire un nombre, c’est ajouter son opposé.",
    tags: ["relatif", "soustraction", "template"],
    // 09/10/2026 : a − b jusqu'à 9 (8 consignes) ou une variation en situation (6) : « passe de s à e ».
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.3) {
        const v = variationTiree();
        return {
          text: v.t,
          format: "short",
          expected: v.u ? [`${v.ecart} ${v.u}`, String(v.ecart)] : [String(v.ecart)],
          comparator: "number_equal",
          explanation: expl(`L’écart se calcule en soustrayant la plus petite valeur de la plus grande : ${v.calcul} = ${v.ecart}.`),
        };
      }
      const a = nonNul(9);
      const b = nonNul(9);
      const expr = ecrire(a, [{ op: "−", v: b }]);
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(a - b),
        comparator: "number_equal",
        explanation: expl(`On ajoute l’opposé de ${par(b, true)} : ${expr} = ${rel(a)} + ${par(-b, true)} = ${rel(a - b)}.`),
      };
    },
  },

  // =========================
  // RELATIF_CALCUL
  // =========================
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : -2 + 5 - 3",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Calcule étape par étape de gauche à droite.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 + 5 = 3 puis 3 - 3 = 0.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : -4 - 3 + 10",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Attention à -4 - 3.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-4 - 3 = -7 puis -7 + 10 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul", "sans_parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : +(+2) + (-3) - (-4)",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Remplace chaque écriture à double signe par une écriture simple.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("+(+2) + (-3) - (-4) = 2 - 3 + 4 = -1 + 4 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le résultat de -6 - (-2) + 1 ?",
    format: "qcm",
    choices: ["-9", "-5", "-3", "3"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Commence par transformer la soustraction du négatif.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 - (-2) + 1 = -6 + 2 + 1 = -4 + 1 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Simplifie d’abord les écritures avec parenthèses, puis calcule.",
    tags: ["relatif", "calcul", "template"],
    // 09/10/2026 : quatre termes jusqu'à 15, additions et soustractions mêlées ; 10 consignes ou un terme manquant.
    generate: () => {
      const p = pick(PRENOMS);
      const premier = nonNul(15);
      const termes: Terme[] = Array.from({ length: 3 }, () => ({ op: choix(["+", "−"] as const), v: nonNul(15) }));
      const r = valeurDe(premier, termes);
      const expr = ecrire(premier, termes);
      if (Math.random() < 0.2) {
        const k = randInt(0, 2);
        const avecTrou = [rel(premier), ...termes.map((t, i) => `${t.op} ${i === k ? "…" : par(t.v, true)}`)].join(" ");
        return {
          text: choix([`Complète : ${avecTrou} = ${rel(r)}`, `${p.nom} a effacé un nombre : ${avecTrou} = ${rel(r)}. Quel nombre faut-il écrire ?`]),
          format: "short",
          expected: attendus(termes[k].v),
          comparator: "number_equal",
          explanation: expl(`On vérifie avec le nombre trouvé : ${expr} = ${rel(r)}. Le nombre effacé est ${rel(termes[k].v)}.`),
        };
      }
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(r),
        comparator: "number_equal",
        explanation: expl(
          `On transforme chaque soustraction en addition de l’opposé : ${[rel(premier), ...termes.map((t) => `+ ${par(t.op === "+" ? t.v : -t.v, true)}`)].join(" ")} = ${rel(r)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_2_trois",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule de gauche à droite, en transformant chaque soustraction en addition de l’opposé.",
    tags: ["relatif", "calcul", "template"],
    // 09/10/2026 : trois termes jusqu'à 12 (10 consignes) ou une situation (10) à deux changements.
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.25) {
        const ev = evolutionTiree(2, 12, 9);
        return {
          text: ev.text,
          format: "short",
          expected: attendus(ev.fin, ev.e.u),
          comparator: "number_equal",
          explanation: expl(`On traduit la situation par un calcul : ${ev.calcul} = ${rel(ev.fin)}.`),
        };
      }
      const premier = nonNul(12);
      const termes: Terme[] = Array.from({ length: 2 }, () => ({ op: choix(["+", "−"] as const), v: nonNul(12) }));
      const r = valeurDe(premier, termes);
      const expr = ecrire(premier, termes);
      const r1 = valeurDe(premier, termes.slice(0, 1));
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(r),
        comparator: "number_equal",
        explanation: expl(`De gauche à droite : ${ecrire(premier, termes.slice(0, 1))} = ${rel(r1)}, puis ${rel(r1)} ${termes[1].op} ${par(termes[1].v, true)} = ${rel(r)}.`),
      };
    },
  },

  // =========================
  // RELATIF_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Le matin, la température est de -2 °C. Elle baisse encore de 3 °C pendant la nuit suivante. Quelle est la nouvelle température ?",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Baisser de 3 °C, c’est soustraire 3.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 - 3 = -5. La nouvelle température est donc -5 °C.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "temperature"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "sport",
    text: "Dans un jeu, un joueur perd 4 points puis gagne 7 points. Quelle est la variation totale de son score ?",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Perdre 4 points correspond à -4 et gagner 7 points à +7.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-4 + 7 = 3. La variation totale est de +3 points.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "sport"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un plongeur est à -6 m. Il remonte de 2 m puis redescend de 5 m. À quelle profondeur se trouve-t-il ?",
    format: "short",
    expected: ["-9"],
    comparator: "number_equal",
    hint: "Remonter correspond à ajouter, redescendre à soustraire.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 + 2 - 5 = -4 - 5 = -9. Le plongeur est à -9 m.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un compte est à -8 €. On ajoute 5 €. Quel est le nouveau solde ?",
    format: "qcm",
    choices: ["-13 €", "-3 €", "3 €", "13 €"],
    expected: ["-3 €"],
    comparator: "mcq_exact",
    hint: "On calcule -8 + 5.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-8 + 5 = -3. Le nouveau solde est de -3 €.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "qcm"],
  },

  // =========================
  // RELATIF_DEFIS_OPS
  // =========================
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Calcule : -2 - 3",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Pars de -2 sur la droite graduée puis recule encore de 3.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("À partir de -2, soustraire 3 revient à reculer de 3 unités vers la gauche. On arrive à -5, qui est négatif.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "defi", "short", "sans_parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : -(+3) - (-5)",
    format: "short",
    expected: ["2", "+2"],
    comparator: "number_equal",
    hint: "Commence par simplifier -(+3).",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-(+3) = -3 et -(-5) = +5, donc -3 + 5 = 2.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "defi", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel calcul donne 4 ?",
    format: "qcm",
    choices: ["-2 - 2", "-2 + 2", "-2 - (-6)", "-2 + (-6)"],
    expected: ["-2 - (-6)"],
    comparator: "mcq_exact",
    hint: "Teste mentalement chaque écriture.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 - (-6) = -2 + 6 = 4.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Transforme d’abord les doubles signes, puis calcule.",
    tags: ["relatif", "defi", "template"],
    // 09/10/2026 : « trouve l'erreur » — un calcul avec « − (−b) » et un résultat faux (l'erreur classique :
    // soustraire −b comme si c'était b) ; QCM, une seule proposition juste ; 5 tournures × prénoms.
    generate: () => {
      const p = pick(PRENOMS);
      const premier = nonNul(15);
      const b = -randInt(2, 12);
      const autres: Terme[] = Math.random() < 0.5 ? [] : [{ op: choix(["+", "−"] as const), v: nonNul(10) }];
      const termes: Terme[] = shuffleTermes([{ op: "−", v: b }, ...autres]);
      const juste = valeurDe(premier, termes);
      // L'erreur : « − (−b) » lu « − b ».
      const faux = juste + 2 * b;
      const expr = ecrire(premier, termes);
      const leurres = [faux, -juste, juste + (juste > 0 ? -1 : 1) * randInt(1, 3)].filter((x, i, t) => x !== juste && t.indexOf(x) === i);
      while (leurres.length < 3) leurres.push(juste + randInt(4, 9) * (leurres.length % 2 ? 1 : -1));
      const choixUniques = [...new Set([juste, ...leurres])].slice(0, 4);
      return {
        text: choix([
          `${p.nom} écrit : ${expr} = ${rel(faux)}. Quel est le bon résultat ?`,
          `${p.nom} a trouvé ${expr} = ${rel(faux)}. C’est faux. Quel est le bon résultat ?`,
          `Sur la copie ${de(p.nom)} : ${expr} = ${rel(faux)}. Le professeur barre. Que fallait-il trouver ?`,
          `${p.nom} s’est trompé${p.f ? "e" : ""} : ${expr} = ${rel(faux)}. Corrige le résultat.`,
          `Dans ce calcul ${de(p.nom)}, le résultat est faux : ${expr} = ${rel(faux)}. Quel est le bon ?`,
        ]),
        format: "qcm",
        choices: choixUniques.sort(() => Math.random() - 0.5).map((x) => relSigne(x)),
        expected: [relSigne(juste)],
        comparator: "mcq_exact",
        explanation: expl(
          `L’erreur : soustraire ${par(b)}, c’est AJOUTER ${-b}. ${expr} = ${[rel(premier), ...termes.map((t) => `+ ${par(t.op === "+" ? t.v : -t.v, true)}`)].join(" ")} = ${rel(juste)}.`,
        ),
      };
    },
  },
    /* =========================
     QUESTIONS OUVERTES — OPÉRATIONS RELATIFS
  ========================= */
  {
    kind: "fixed",
    id: "relatif_addition_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Calcule : -5 + 2",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Imagine un déplacement sur une droite graduée.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("On part de -5 et on avance de 2 unités vers la droite : on arrive à -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "short", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Calcule : 4 - (-3)",
    format: "short",
    expected: ["7", "+7"],
    comparator: "number_equal",
    hint: "Soustraire un nombre négatif revient à ajouter son opposé.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("Soustraire -3 revient à ajouter +3. Donc 4 - (-3) = 4 + 3 = 7.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "short", "soustraction"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Calcule : -6 - (-2) + 1",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Commence par transformer -(-2) en +2.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 - (-2) + 1 = -6 + 2 + 1 = -4 + 1 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "short", "calcul"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "reunion",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un plongeur est à -6 m. Il remonte de 2 m, puis redescend de 5 m. À quelle position est-il ?",
    format: "short",
    expected: ["-9", "-9 m"],
    comparator: "number_equal",
    hint: "Remonter correspond à ajouter ; redescendre correspond à soustraire.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("On calcule -6 + 2 - 5. Le plongeur remonte à -4 m, puis redescend à -9 m.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "short", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un élève écrit : -7 - (-4) = -11. Quel est le bon résultat ?",
    format: "qcm",
    choices: ["-3", "-11", "3", "11"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Il a oublié que soustraire un négatif revient à ajouter.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("L’élève a traité -(-4) comme -4. Or soustraire -4 revient à ajouter 4 : -7 - (-4) = -7 + 4 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "qcm", "defi", "erreur"],
  },

  // =========================
  // TOP-UP — RELATIF_ADDITION (+2)
  // =========================
  {
    kind: "fixed",
    id: "relatif_addition_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : -8 + 8",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Deux nombres opposés.",
    explanation: expl("-8 + 8 = 0 car ce sont deux nombres opposés."),
    tags: ["relatif", "addition"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Même signe : on additionne les distances. Signes différents : on soustrait.",
    tags: ["relatif", "addition", "template"],
    // 09/10/2026 : l'addition dite en mots (6 tournures × prénoms), deux relatifs jusqu'à 30.
    generate: () => {
      const p = pick(PRENOMS);
      const a = nonNul(30);
      const b = nonNul(30);
      const text = choix([
        `Ajoute ${rel(a)} à ${rel(b)}.`,
        `Calcule la somme de ${rel(a)} et de ${rel(b)}.`,
        `${p.nom} additionne ${rel(a)} et ${rel(b)}. Que trouve-t-${il(p)} ?`,
        `Quelle est la somme de ${rel(a)} et de ${rel(b)} ?`,
        `On ajoute ${rel(a)} à ${rel(b)}. Quel nombre obtient-on ? ${p.nom} répond.`,
        `${p.nom} doit ajouter ${rel(a)} à ${rel(b)}. Quel résultat doit-${il(p)} écrire ?`,
      ]);
      return {
        text,
        format: "short",
        expected: attendus(a + b),
        comparator: "number_equal",
        explanation: expl(`${rel(b)} + ${par(a, true)} = ${rel(a + b)}.`),
      };
    },
  },

  // =========================
  // TOP-UP — RELATIF_SOUSTRACTION (+1)
  // =========================
  {
    kind: "template",
    id: "relatif_soustraction_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Soustraire un nombre, c’est ajouter son opposé.",
    tags: ["relatif", "soustraction", "template"],
    // 09/10/2026 : la soustraction dite en mots (6 tournures) ou une variation en situation (6).
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.35) {
        const v = variationTiree();
        return {
          text: v.t,
          format: "short",
          expected: v.u ? [`${v.ecart} ${v.u}`, String(v.ecart)] : [String(v.ecart)],
          comparator: "number_equal",
          explanation: expl(`On soustrait la plus petite valeur de la plus grande : ${v.calcul} = ${v.ecart}.`),
        };
      }
      const a = nonNul(25);
      const b = nonNul(25);
      const t = choix([
        { t: `Soustrais ${rel(b)} de ${rel(a)}.`, r: a - b },
        { t: `Calcule la différence de ${rel(a)} et de ${rel(b)}.`, r: a - b },
        { t: `Au nombre ${rel(a)}, on soustrait ${rel(b)}. Quel nombre obtient-on ? ${p.nom} calcule.`, r: a - b },
        { t: `${p.nom} enlève ${rel(b)} à ${rel(a)}. Que trouve-t-${il(p)} ?`, r: a - b },
        { t: `Quelle est la différence de ${rel(a)} et de ${rel(b)} ? ${p.nom} la cherche.`, r: a - b },
        { t: `${p.nom} doit soustraire ${rel(b)} de ${rel(a)}. Quel résultat doit-${il(p)} écrire ?`, r: a - b },
      ]);
      return {
        text: t.t,
        format: "short",
        expected: attendus(t.r),
        comparator: "number_equal",
        explanation: expl(`${rel(a)} − ${par(b, true)} = ${rel(a)} + ${par(-b, true)} = ${rel(t.r)}.`),
      };
    },
  },

  // =========================
  // TOP-UP — RELATIF_CALCUL (+4)
  // =========================
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 5 - 8 + 2",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "De gauche à droite.",
    explanation: expl("5 - 8 = -3 puis -3 + 2 = -1."),
    tags: ["relatif", "calcul"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : -3 - (-7) - 2",
    format: "short",
    expected: ["2", "+2"],
    comparator: "number_equal",
    hint: "Soustraire -7 revient à ajouter 7.",
    explanation: expl("-3 - (-7) - 2 = -3 + 7 - 2 = 4 - 2 = 2."),
    tags: ["relatif", "calcul", "parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le résultat de -10 + 4 - (-3) ?",
    format: "qcm",
    choices: ["-3", "-9", "3", "-17"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Transforme -(-3).",
    explanation: expl("-10 + 4 - (-3) = -10 + 4 + 3 = -6 + 3 = -3."),
    tags: ["relatif", "calcul", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule de gauche à droite.",
    tags: ["relatif", "calcul", "template"],
    // 09/10/2026 : deux parenthèses à calculer d'abord, « (a + b) − (c − d) » (10 consignes).
    generate: () => {
      const p = pick(PRENOMS);
      const g1 = { premier: nonNul(12), termes: [{ op: choix(["+", "−"] as const), v: nonNul(12) }] };
      const g2 = { premier: nonNul(12), termes: [{ op: choix(["+", "−"] as const), v: nonNul(12) }] };
      const op = choix(["+", "−"] as const);
      const v1 = valeurDe(g1.premier, g1.termes);
      const v2 = valeurDe(g2.premier, g2.termes);
      const r = op === "+" ? v1 + v2 : v1 - v2;
      const expr = `(${ecrire(g1.premier, g1.termes)}) ${op} (${ecrire(g2.premier, g2.termes)})`;
      return {
        text: consigne(expr, p),
        format: "short",
        expected: attendus(r),
        comparator: "number_equal",
        explanation: expl(`On calcule d’abord chaque parenthèse : ${rel(v1)} et ${rel(v2)}. Puis ${rel(v1)} ${op} ${par(v2, true)} = ${rel(r)}.`),
      };
    },
  },

  // =========================
  // TOP-UP — RELATIF_PROBLEME (+5)
  // =========================
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un ascenseur est au niveau -2. Il monte de 5 étages. À quel niveau arrive-t-il ?",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Monter, c’est ajouter.",
    explanation: expl("-2 + 5 = 3. L’ascenseur arrive au niveau 3."),
    tags: ["relatif", "probleme"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "La température passe de -3 °C à 4 °C. De combien de degrés a-t-elle augmenté ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Différence : 4 - (-3).",
    explanation: expl("Variation = 4 - (-3) = 4 + 3 = 7 °C."),
    tags: ["relatif", "probleme", "temperature"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un compte est à -12 €. On dépense encore 4 €. Quel est le nouveau solde ?",
    format: "qcm",
    choices: ["-16 €", "-8 €", "8 €", "16 €"],
    expected: ["-16 €"],
    comparator: "mcq_exact",
    hint: "Dépenser, c’est soustraire.",
    explanation: expl("-12 - 4 = -16. Le nouveau solde est -16 €."),
    tags: ["relatif", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_x3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "Au Piton des Neiges, il fait -2 °C. La température baisse de 6 °C la nuit. Quelle est la température minimale ?",
    format: "short",
    expected: ["-8"],
    comparator: "number_equal",
    hint: "Baisser, c’est soustraire.",
    explanation: expl("-2 - 6 = -8. La température minimale est -8 °C."),
    tags: ["relatif", "probleme", "reunion", "temperature"],
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Gagner = +, perdre = -.",
    tags: ["relatif", "probleme", "template", "sport"],
    // 09/10/2026 : une situation (10) à trois changements, ou une variation « passe de … à … » (6).
    generate: () => {
      if (Math.random() < 0.35) {
        const v = variationTiree();
        return {
          text: v.t,
          format: "short",
          expected: v.u ? [`${v.ecart} ${v.u}`, String(v.ecart)] : [String(v.ecart)],
          comparator: "number_equal",
          explanation: expl(`On soustrait la plus petite valeur de la plus grande : ${v.calcul} = ${v.ecart}.`),
        };
      }
      const ev = evolutionTiree(3, 20, 15);
      return {
        text: ev.text,
        format: "short",
        expected: attendus(ev.fin, ev.e.u),
        comparator: "number_equal",
        explanation: expl(`Une hausse s’ajoute, une baisse se retranche : ${ev.calcul} = ${rel(ev.fin)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_2_deux_etapes",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le calcul : le départ, puis + pour une hausse, − pour une baisse.",
    tags: ["relatif", "probleme", "template"],
    // 09/10/2026 : une situation (10) à deux changements × 2 questions × prénoms.
    generate: () => {
      const ev = evolutionTiree(2, 15, 12);
      return {
        text: ev.text,
        format: "short",
        expected: attendus(ev.fin, ev.e.u),
        comparator: "number_equal",
        explanation: expl(`On traduit la situation par un calcul : ${ev.calcul} = ${rel(ev.fin)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_3_depart",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Remonte le temps : une baisse s’annule en ajoutant, une hausse en soustrayant.",
    tags: ["relatif", "probleme", "template", "raisonnement"],
    // 09/10/2026 : retrouver la valeur de départ (5 situations × hausse ou baisse × prénoms).
    generate: () => {
      const p = pick(PRENOMS);
      const accord = (mot: string) => (p.f ? `${mot}e` : mot);
      const sit = choix([
        { u: "°C", h: (a: number) => `La température a monté de ${a} °C.`, b: (a: number) => `La température a baissé de ${a} °C.`, fin: (e: number) => `Il fait maintenant ${rel(e)} °C.`, q: "Quelle température faisait-il avant ?", max: 15 },
        { u: "€", h: (a: number) => `${p.nom} a reçu ${a} €.`, b: (a: number) => `${p.nom} a payé ${a} €.`, fin: (e: number) => `Son compte est maintenant à ${rel(e)} €.`, q: "Combien y avait-il sur le compte avant ?", max: 60 },
        { u: "", h: (a: number) => `${p.nom} est ${accord("monté")} de ${pl(a, "étage")}.`, b: (a: number) => `${p.nom} est ${accord("descendu")} de ${pl(a, "étage")}.`, fin: (e: number) => `${Il(p)} est maintenant au niveau ${rel(e)}.`, q: `De quel niveau est-${il(p)} ${accord("parti")} ?`, max: 6 },
        { u: "", h: (a: number) => `Au jeu, ${p.nom} a gagné ${pl(a, "point")}.`, b: (a: number) => `Au jeu, ${p.nom} a perdu ${pl(a, "point")}.`, fin: (e: number) => `${Il(p)} a maintenant ${rel(e)} points.`, q: `Combien de points avait-${il(p)} avant ?`, max: 25 },
        { u: "m", h: (a: number) => `En plongée, ${p.nom} est ${accord("remonté")} de ${a} m.`, b: (a: number) => `En plongée, ${p.nom} est ${accord("descendu")} de ${a} m.`, fin: (e: number) => `${Il(p)} est maintenant à l’altitude ${rel(e)} m.`, q: `À quelle altitude était-${il(p)} avant ?`, max: 20 },
      ]);
      const plonge = sit.u === "m";
      const depart = plonge ? -randInt(2, 30) : nonNul(sit.max);
      const a = randInt(1, sit.max);
      let hausse = Math.random() < 0.5;
      // Le plongeur reste sous l'eau.
      if (plonge && hausse && depart + a > -1) hausse = false;
      const e = depart + (hausse ? a : -a);
      return {
        text: `${hausse ? sit.h(a) : sit.b(a)} ${sit.fin(e)} ${sit.q}`,
        format: "short",
        expected: attendus(depart, sit.u),
        comparator: "number_equal",
        explanation: expl(
          hausse
            ? `Pour revenir au départ, on enlève la hausse : ${rel(e)} − ${a} = ${rel(depart)}.`
            : `Pour revenir au départ, on rajoute la baisse : ${rel(e)} + ${a} = ${rel(depart)}.`,
        ),
      };
    },
  },

  // =========================
  // TOP-UP — RELATIF_OPERATION_DEFI (+5)
  // =========================
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule : -5 - (-8) + (-2) - 1",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Transforme les doubles signes puis calcule.",
    explanation: expl("-5 - (-8) + (-2) - 1 = -5 + 8 - 2 - 1 = 3 - 2 - 1 = 0."),
    tags: ["relatif", "operation_defi", "calcul"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le résultat de (-3) + (-3) + (-3) ?",
    format: "qcm",
    choices: ["-9", "-6", "9", "0"],
    expected: ["-9"],
    comparator: "mcq_exact",
    hint: "Trois fois -3.",
    explanation: expl("(-3) + (-3) + (-3) = -9."),
    tags: ["relatif", "operation_defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à -6 pour obtenir 0 ?",
    format: "short",
    expected: ["6", "+6"],
    comparator: "number_equal",
    hint: "C’est l’opposé de -6.",
    explanation: expl("Il faut ajouter l’opposé de -6, soit +6 : -6 + 6 = 0."),
    tags: ["relatif", "operation_defi"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Soustraire un nombre, c’est ajouter son opposé. Complète : 5 - (-3) = 5 + ...",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Quel est l’opposé de -3 ?",
    explanation: expl("L’opposé de -3 est +3. Donc 5 - (-3) = 5 + 3 = 8."),
    tags: ["relatif", "operation_defi", "short"],
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Simplifie les écritures à double signe.",
    tags: ["relatif", "operation_defi", "template", "calcul"],
    // 09/10/2026 : un programme de calcul à trois étapes (ajouter, soustraire, ajouter l'opposé) sur un relatif ;
    // 4 présentations × prénoms.
    generate: () => {
      const p = pick(PRENOMS);
      const depart = nonNul(12);
      const etapes = Array.from({ length: 3 }, () => {
        const sorte = choix(["Ajoute", "Soustrais", "Ajoute l’opposé de"] as const);
        const v = nonNul(10);
        return { sorte, v, effet: sorte === "Soustrais" || sorte === "Ajoute l’opposé de" ? -v : v };
      });
      const fin = etapes.reduce((s, e) => s + e.effet, depart);
      const programme = etapes.map((e) => `${e.sorte} ${rel(e.v)}.`).join(" ");
      return {
        text: choix([
          `Voici le programme de calcul ${de(p.nom)} : « Choisis un nombre. ${programme} » ${p.nom} choisit ${rel(depart)}. Quel nombre obtient-${il(p)} ?`,
          `Programme de calcul : « Choisis un nombre. ${programme} » ${p.nom} choisit ${rel(depart)}. Quel est le résultat ?`,
          `${p.nom} invente un programme : « Choisis un nombre. ${programme} » ${Il(p)} le teste en choisissant ${rel(depart)}. Que trouve-t-${il(p)} ?`,
          `On applique à ${rel(depart)} le programme ${de(p.nom)} : « ${programme} » Quel nombre obtient-on ?`,
        ]),
        format: "short",
        expected: attendus(fin),
        comparator: "number_equal",
        explanation: expl(
          `${rel(depart)} ${etapes.map((e) => `+ ${par(e.effet, true)}`).join(" ")} = ${rel(fin)}. Soustraire un nombre, c’est ajouter son opposé.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_2_trou",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais le calcul à l’envers : pour retrouver un terme d’une somme, on soustrait.",
    tags: ["relatif", "operation_defi", "template"],
    // 09/10/2026 : le nombre manquant d'une addition ou d'une soustraction (4 places) × 6 tournures × prénoms.
    generate: () => {
      const p = pick(PRENOMS);
      const a = nonNul(20);
      const b = nonNul(20);
      const sorte = randInt(0, 3);
      const [ecritTrou, rep, r] =
        sorte === 0
          ? [`${rel(a)} + … = ${rel(a + b)}`, b, a + b]
          : sorte === 1
            ? [`… + ${par(b, true)} = ${rel(a + b)}`, a, a + b]
            : sorte === 2
              ? [`${rel(a)} − … = ${rel(a - b)}`, b, a - b]
              : [`… − ${par(b, true)} = ${rel(a - b)}`, a, a - b];
      const text = choix([
        `Complète : ${ecritTrou}`,
        `${p.nom} cherche le nombre caché : ${ecritTrou}`,
        `Quel nombre faut-il écrire à la place des points ? ${ecritTrou}`,
        `${p.nom} a effacé un nombre de son calcul : ${ecritTrou}. Lequel ?`,
        `Retrouve le nombre manquant dans l’égalité ${de(p.nom)} : ${ecritTrou}`,
        `${p.nom} dit : « Il manque un nombre : ${ecritTrou}. » Quel est ce nombre ?`,
      ]);
      return {
        text,
        format: "short",
        expected: attendus(rep),
        comparator: "number_equal",
        explanation: expl(
          `On fait le calcul à l’envers : le nombre manquant est ${rel(rep)}. Vérification : ${ecritTrou.replace("…", par(rep, true)).replace(/^\((.*?)\)/, "$1")}, et le résultat est bien ${rel(r)}.`,
        ),
      };
    },
  },
];

// ⛔ 09/10/2026 : le vrai signe moins « − » partout (énoncés, choix, réponses, aides, explications).
export const operationsRelatifsBank: TutorBankItemV4[] = vraiMoins(operationsRelatifsBrut);