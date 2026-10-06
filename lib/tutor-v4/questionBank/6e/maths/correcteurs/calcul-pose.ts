import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { reglesEcriture } from "./entiers";
import { corrigerCalcul, nombresDecimaux, val, evaluer } from "./calcul-mental";

// Rempli par la réparation du 06/10/2026 (voir types.ts).
// Le calcul posé : on relit le texte (écriture ou situation) ET le canvas.

const proche = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/** Le canvas : résultat caché, et ses nombres sont ceux de l'énoncé. */
function verifierCanvas(q: TutorGeneratedQuestionV4): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  const p: string[] = [];
  if (c.kind !== "calcul_pose") return ["canvas inattendu"];
  if (c.display?.showResult !== false) p.push("le canvas affiche le résultat");
  if (c.display?.showRetenues) p.push("le canvas affiche des retenues");
  if (c.result !== undefined || c.division?.quotient !== undefined || c.division?.reste !== undefined)
    p.push("le canvas contient la réponse");
  const lus = nombresDecimaux(q.text);
  for (const n of (c.numbers ?? []).map(val)) if (!lus.some((x) => proche(x, n))) p.push(`le canvas montre ${n}, absent de l'énoncé`);
  const signe = { addition: "+", soustraction: "−", multiplication: "×", division: "÷" }[c.operation as string];
  // En calcul écrit, l'opération du canvas est celle du texte.
  if (/[+−×÷]/.test(q.text) && signe && !q.text.includes(signe)) p.push(`le canvas pose une ${c.operation}, pas l'énoncé`);
  return p;
}

/** Un calcul posé (écrit ou en situation) + son canvas. */
function corrigerPose(sens: "somme" | "difference" | "produit" | "quotient", entier = true) {
  const base = corrigerCalcul(sens, { entier });
  return (q: TutorGeneratedQuestionV4) => [...base(q), ...verifierCanvas(q)];
}

const OUI = /^(oui|vrai|juste)/i;

/** « A-t-il raison ? » : refait l'opération lue dans le texte et compare au résultat annoncé. */
function corrigerVraiFaux(q: TutorGeneratedQuestionV4): string[] {
  const p = [...reglesEcriture(q), ...verifierCanvas(q)];
  const m = q.text.match(/([+−×])/);
  const n = nombresDecimaux(q.text);
  if (!m || n.length !== 3) return [...p, `il faut « a ${m?.[1] ?? "?"} b » et un résultat annoncé, lu : ${n.join(", ")}`];
  const [a, b, annonce] = n;
  const juste = m[1] === "+" ? a + b : m[1] === "−" ? a - b : a * b;
  const vrai = proche(juste, annonce);
  if (OUI.test(q.expected[0]) !== vrai) p.push(`réponse attendue « ${q.expected[0]} » alors que ${a} ${m[1]} ${b} = ${juste} (annoncé ${annonce})`);
  const c = q.choices ?? [];
  if (c.length !== 2 || c.filter((x) => OUI.test(x)).length !== 1) p.push("il faut exactement une proposition « oui » et une « non »");
  return p;
}

/** QCM d'égalités : une seule VRAIE, et elle utilise l'opération attendue. */
export function corrigerEgalites(operationAttendue: RegExp) {
  return (q: TutorGeneratedQuestionV4): string[] => {
    const p = [...reglesEcriture(q), ...verifierCanvas(q)];
    const vraie = (e: string) => {
      const [g, d] = e.split("=");
      return d !== undefined && proche(evaluer(g), evaluer(d));
    };
    const vraies = (q.choices ?? []).filter(vraie);
    if (vraies.length !== 1) p.push(`${vraies.length} égalités vraies : ${vraies.join(" | ")}`);
    if (!vraie(q.expected[0])) p.push(`l'égalité attendue « ${q.expected[0]} » est fausse`);
    if (!operationAttendue.test(q.expected[0])) p.push(`l'égalité attendue n'utilise pas la bonne opération : ${q.expected[0]}`);
    // L'égalité attendue reprend les nombres de l'énoncé.
    const lus = nombresDecimaux(q.text);
    for (const x of nombresDecimaux(q.expected[0])) if (!lus.some((y) => proche(x, y))) p.push(`${x} n'est pas un nombre de l'énoncé`);
    return p;
  };
}

/** Le gabarit annonce « avec » ou « sans » retenue : on la cherche colonne par colonne. */
function retenue(op: "addition" | "soustraction", attendue: boolean) {
  return (q: TutorGeneratedQuestionV4): string[] => {
    const n = nombresDecimaux(q.text).filter((x) => x > 0);
    const [a, b] = [Math.max(n[0], n[1]), Math.min(n[0], n[1])];
    const da = String(a).split("").reverse().map(Number);
    const db = String(b).split("").reverse().map(Number);
    const il_y_a = op === "addition" ? da.some((d, i) => d + (db[i] ?? 0) >= 10) : da.some((d, i) => d < (db[i] ?? 0));
    return il_y_a === attendue ? [] : [`${a} ${op === "addition" ? "+" : "−"} ${b} ${attendue ? "n'a pas" : "a"} de retenue`];
  };
}
const et = (...fs: ((q: TutorGeneratedQuestionV4) => string[])[]) => (q: TutorGeneratedQuestionV4) => fs.flatMap((f) => f(q));

/** Division euclidienne : dividende et diviseur relus, quotient / reste / « combien en faut-il ». */
function corrigerEuclide(q: TutorGeneratedQuestionV4): string[] {
  const p = [...reglesEcriture(q), ...verifierCanvas(q)];
  const n = nombresDecimaux(q.text);
  if (n.length !== 2) return [...p, `il faut le dividende et le diviseur, lu : ${n.join(", ")}`];
  const A = Math.max(...n);
  const D = Math.min(...n);
  if (D < 2 || !Number.isInteger(A)) return [...p, "division impossible à relire"];
  const quo = Math.floor(A / D);
  const r = A % D;
  const lignes = q.text.split("\n");
  const question = lignes.length > 1 ? lignes[lignes.length - 1] : q.text.split(/\.\s/).pop()!;
  let juste: number;
  let quoi: string;
  if (/faut-il/.test(question)) {
    juste = quo + (r > 0 ? 1 : 0);
    quoi = "nombre de groupes pour tout ranger";
  } else if (/reste|incomplète|hors des|à côté|sans équipe/.test(question)) {
    juste = r;
    quoi = "reste";
  } else {
    juste = quo;
    quoi = "quotient";
  }
  if (val(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste} (${quoi} de ${A} ÷ ${D} = ${quo} reste ${r})`);
  return p;
}

const INVERSE: Record<string, string> = { "+": "−", "−": "+", "×": "÷", "÷": "×" };
/** Vérifier par l'opération inverse : l'égalité attendue est vraie et utilise l'inverse de l'opération du texte. */
function corrigerInverse(q: TutorGeneratedQuestionV4): string[] {
  const m = q.text.match(/\d\s([+−×÷])\s\d/);
  if (!m) return ["opération du texte illisible"];
  return corrigerEgalites(new RegExp(`\\s\\${INVERSE[m[1]]}\\s`))(q);
}

/** Ordre de grandeur : une seule proposition est proche (à 30 % près) du résultat exact. */
function corrigerOrdreGrandeur(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const n = nombresDecimaux(q.text);
  const op = q.text.match(/\d\s([+−×])\s\d/)?.[1];
  if (!op || n.length !== 2) return [...p, `calcul illisible : ${n.join(", ")}`];
  const [a, b] = n;
  const exact = op === "+" ? a + b : op === "−" ? a - b : a * b;
  const proches = (q.choices ?? []).filter((c) => Math.abs(val(c) - exact) <= 0.3 * exact);
  if (proches.length !== 1) p.push(`${proches.length} propositions proches de ${exact} : ${proches.join(" | ")}`);
  if (Math.abs(val(q.expected[0]) - exact) > 0.3 * exact) p.push(`la réponse attendue ${q.expected[0]} est loin de ${exact}`);
  return p;
}

/** Choisir l'opération : le sens se lit aux mots de la situation. */
function corrigerChoisirOperation(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const t = q.text;
  const n = nombresDecimaux(t);
  let juste: string;
  if (/partage|répartis|boîtes de|équipes égales/.test(t)) {
    juste = "division";
    if (n.length === 2 && Math.max(...n) % Math.min(...n) !== 0) p.push("partage qui ne tombe pas juste");
  } else if (/dans chaque|rangées de|l’un\b|l’une\b/.test(t)) juste = "multiplication";
  else if (/reste|restent|écart|distribue/.test(t)) juste = "soustraction";
  else if (/donne|puis|total|parcourue/.test(t)) juste = "addition";
  else return [...p, "sens de la situation illisible"];
  if (q.expected[0] !== juste) p.push(`opération attendue ${q.expected[0]}, relue ${juste}`);
  if ((q.choices ?? []).length !== 4) p.push("il faut les quatre opérations");
  return p;
}

/** Deux étapes : « n objets à prix l'unité » puis monnaie rendue sur un billet, ou un autre achat. */
function corrigerDeuxEtapes(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const n = nombresDecimaux(q.text);
  if (n.length !== 3) return [...p, `il faut trois nombres, lu : ${n.join(", ")}`];
  const [k, prix, x] = n;
  let juste: number;
  if (/rend/.test(q.text)) {
    juste = x - k * prix;
    if (juste <= 0) p.push("le billet ne suffit pas");
  } else juste = k * prix + x;
  if (val(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  if (!q.expected.some((e) => /€/.test(e))) p.push("l'unité € manque dans les réponses acceptées");
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  "6e_entier_division_posee_tpl_1_sans_reste": corrigerPose("quotient"),
  "6e_entier_division_posee_tpl_2_avec_reste": corrigerEuclide,
  "6e_entier_division_posee_tpl_3_verification": corrigerEgalites(/ × .* \+ /),
  "6e_entier_division_posee_tpl_4_interpreter_reste": corrigerEuclide,
  "6e_entier_calcul_verifier_tpl_1_soustraction": corrigerInverse,
  "6e_entier_calcul_verifier_tpl_2_estimation_qcm": corrigerOrdreGrandeur,
  "6e_entier_calcul_verifier_tpl_3_inverse_etoile_2": corrigerInverse,
  "6e_entier_calcul_verifier_tpl_4_corriger_etoile_5": corrigerPose("somme"),
  "6e_entier_calcul_pose_defi_tpl_1_probleme_partage": corrigerEuclide,
  "6e_entier_calcul_pose_defi_tpl_2_choisir_operation": corrigerChoisirOperation,
  "6e_entier_calcul_pose_defi_tpl_3_comparer_etoile_3": corrigerPose("difference"),
  "6e_entier_calcul_pose_defi_tpl_4_deux_etapes_etoile_4": corrigerDeuxEtapes,
  "6e_entier_addition_posee_tpl_1_sans_retenue": et(corrigerPose("somme"), retenue("addition", false)),
  "6e_entier_addition_posee_tpl_2_avec_retenue": et(corrigerPose("somme"), retenue("addition", true)),
  "6e_entier_addition_posee_tpl_3_trouver_erreur": corrigerVraiFaux,
  "6e_entier_soustraction_posee_tpl_1_sans_retenue": et(corrigerPose("difference"), retenue("soustraction", false)),
  "6e_entier_soustraction_posee_tpl_2_avec_retenue": et(corrigerPose("difference"), retenue("soustraction", true)),
  "6e_entier_soustraction_posee_tpl_3_verifier_addition": corrigerEgalites(/^[\d  ]+ \+ [\d  ]+ = [\d  ]+$/),
  "6e_entier_soustraction_posee_tpl_4_trouver_nombre_depart": corrigerPose("somme"),
  "6e_entier_multiplication_posee_tpl_1_un_chiffre": corrigerPose("produit"),
  "6e_entier_multiplication_posee_tpl_2_avec_retenue": corrigerPose("produit"),
  "6e_entier_multiplication_posee_tpl_3_par_10_100": corrigerPose("produit"),
  "6e_entier_multiplication_posee_tpl_4_probleme_repetition": corrigerPose("produit"),
  "6e_entier_addition_posee_tpl_4_nombre_decimal_simples": corrigerPose("somme", false),
};
