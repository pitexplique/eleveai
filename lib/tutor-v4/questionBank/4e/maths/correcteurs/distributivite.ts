import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  avecReglesLitteral,
  cFactoriser,
  cibleNonReduite,
  cReduire,
  donnees,
  equiv,
  expressionsLitterales,
  lettreAttendue,
  normaliser,
  plusLongue,
  poly,
  qcmUnique,
  reponseExpression,
  texteLisible,
} from "./expressions-litterales";

// LES CORRECTEURS DE distributivite.bank.ts (08/10/2026, voir 6e/maths/correcteurs/types.ts).
// Les outils (lecture des expressions du texte, polynômes, forme réduite ou
// factorisée) sont dans expressions-litterales.ts. Chaque correcteur relit
// l'expression à développer — ou la SITUATION (« 4 cartons de a + 5 romans ») —
// la développe et la réduit lui-même, et compare. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const premierePhrase = (t: string) => texteLisible(t).split(/(?<=[.;])\s+(?=[A-ZÀ-Ý])/)[0];

/** « k groupes de (l + b) » ou « k groupes de l … et b … » → k(l + b). */
function cSituationSimple(q: Q): string[] {
  const l = lettreAttendue(q);
  if (!l) return ["lettre introuvable"];
  const d = donnees(premierePhrase(q.text), l);
  let juste: string | null = null;
  if (d.length === 2 && d[1].includes("+")) juste = `${d[0]}(${d[1]})`;
  else if (d.length === 3 && d[1] === l) juste = `${d[0]}(${l} + ${d[2]})`;
  if (!juste) return [`situation illisible : ${d.join(", ")}`];
  const p: string[] = [];
  const annonce = texteLisible(q.text).match(/vaut (\d+\([a-z] \+ \d+\))/)?.[1];
  if (annonce && !equiv(annonce, juste)) p.push(`l'énoncé annonce ${annonce}, la situation donne ${juste}`);
  return [...p, ...reponseExpression(q, juste, "situation")];
}

/** « k sections de l + b mètres, puis c mètres » → k(l + b) + c. */
function cGroupesPlusReste(q: Q): string[] {
  const l = lettreAttendue(q);
  if (!l) return ["lettre introuvable"];
  const d = donnees(premierePhrase(q.text), l);
  if (d.length !== 3 || !d[1].includes("+")) return [`situation illisible : ${d.join(", ")}`];
  return reponseExpression(q, `${d[0]}(${d[1]}) + ${d[2]}`, "situation");
}

/** « k1 cartons de l + b … et k2 cartons de l + d … » → k1(l + b) + k2(l + d). */
function cDeuxGroupes(q: Q): string[] {
  const l = lettreAttendue(q);
  if (!l) return ["lettre introuvable"];
  const d = donnees(premierePhrase(q.text), l);
  if (d.length !== 4 || !d[1].includes("+") || !d[3].includes("+")) return [`situation illisible : ${d.join(", ")}`];
  return reponseExpression(q, `${d[0]}(${d[1]}) + ${d[2]}(${d[3]})`, "situation");
}

/** « k zones de l arbustes et b arbres ; une tempête abat c arbres » → k(l + b) ± c. */
function cGroupesPuisChangement(q: Q): string[] {
  const l = lettreAttendue(q);
  if (!l) return ["lettre introuvable"];
  const t = texteLisible(q.text);
  const d = donnees(t.replace(/ (?:Exprime|Écris|Quelle|Donne) .*$/, ""), l);
  if (d.length !== 4 || d[1] !== l) return [`situation illisible : ${d.join(", ")}`];
  const [k, , b, c] = d.map(Number);
  const moins = /relâche|guérissent|abat|retire|vend|partent/.test(t);
  const plus = /ajoute|en plus/.test(t);
  if (moins === plus) return ["on ne sait pas si l'on ajoute ou si l'on retire"];
  const p: string[] = [];
  if (moins && c >= k * b) p.push(`on retire ${c}, plus que les ${k * b} présents`);
  if (/\bsous la forme ([a-z])[a-z] \+ ([a-z])\b/.test(t)) {
    const m = t.match(/sous la forme ([a-z])([a-z]) \+ ([a-z])\b/)!;
    if (m[1] === m[2] || m[3] === m[2]) p.push(`« sous la forme ${m[1]}${m[2]} + ${m[3]} » : la lettre ${m[2]} sert deux fois`);
  }
  return [...p, ...reponseExpression(q, `${k}(${l} + ${b}) ${moins ? "-" : "+"} ${c}`, "situation")];
}

/** L'aire d'un rectangle : longueur × largeur, lues dans le texte. */
function cAire(q: Q): string[] {
  const t = texteLisible(q.text);
  const m =
    t.match(/longueur (.+?) et pour largeur (.+?) \(en/) ??
    t.match(/dimensions (.+?) sur (.+?) \(en/) ??
    t.match(/vaut \((.+?)\)\((.+?)\)\./) ??
    t.match(/côtés mesurent (.+?) et (.+?) \(en/);
  if (!m) return cReduire(q);
  return reponseExpression(q, `(${m[1]})(${m[2]})`, "aire");
}

/** Le périmètre d'un rectangle : 2 × (longueur + largeur). */
function cPerimetre(q: Q): string[] {
  const t = texteLisible(q.text);
  const m =
    t.match(/longueur (.+?) et pour largeur (.+?) \(en/) ??
    t.match(/mesure (.+?) et sa largeur (.+?) \(en/) ??
    t.match(/dimensions (.+?) sur (.+?) \(en/) ??
    t.match(/côtés mesurent (.+?) et (.+?) \(en/);
  if (!m) return ["dimensions illisibles"];
  return reponseExpression(q, `2(${m[1]}) + 2(${m[2]})`, "périmètre");
}

// ─── Reconnaître ───────────────────────────────────────────────────────────

/** Développée : plus aucune parenthèse. */
const developpee = (e: string) => !/[()]/.test(e);
/** Produit de deux parenthèses. */
const doubleParenthese = (e: string) => (normaliser(e).match(/\(/g) ?? []).length === 2 && /\)\*?\(/.test(normaliser(e));
/** Produit : pas de + ou − au premier niveau (le signe de tête mis à part). */
function estProduit(e: string): boolean {
  const s = normaliser(e).replace(/^-/, "");
  let prof = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") prof++;
    else if (s[i] === ")") prof--;
    else if ((s[i] === "+" || s[i] === "-") && prof === 0 && i > 0 && s[i - 1] !== "*" && s[i - 1] !== "(") return false;
  }
  return true;
}

function cReconnaitreQcm(q: Q): string[] {
  const t = texteLisible(q.text);
  const c = q.choices ?? [];
  if (c.some((x) => !poly(x))) return ["proposition illisible"];
  // la liste écrite dans l'énoncé est celle des propositions
  const liste = t.match(/(?:: |Parmi )(.+?)(?:\. Laquelle|\. Pour laquelle|, (?:quelle|laquelle|une seule)| \?)/)?.[1]?.split(" ; ") ?? [];
  if (liste.length !== c.length || liste.some((x) => !c.includes(x.trim()))) return [`la liste de l'énoncé (${liste.join(" ; ")}) n'est pas celle des propositions`];
  let juste: (x: string) => boolean;
  if (/double distributivité|quatre produits|produit de deux parenthèses/.test(t)) juste = doubleParenthese;
  else if (/déjà développée|n’a plus rien à développer|forme développée|une somme, sans parenthèse/.test(t)) juste = developpee;
  else if (/faut-il développer|produit à développer|parenthèse à distribuer|pas encore développée/.test(t)) juste = (x) => !developpee(x);
  else return ["question non reconnue"];
  return qcmUnique(q, juste);
}

/** Oui / non : « est-elle déjà développée ? », « faut-il encore développer ? ». */
function cDevelopeeOuiNon(q: Q): string[] {
  const t = texteLisible(q.text);
  const E = plusLongue(q.text);
  if (!E) return ["expression introuvable"];
  let oui: boolean;
  if (/déjà développée|une forme développée/.test(t)) oui = developpee(E);
  else if (/encore développer|parenthèse à distribuer/.test(t)) oui = !developpee(E);
  else return ["question non reconnue"];
  return qcmUnique(q, (c) => c === (oui ? "oui" : "non"));
}

function cSommeOuProduit(q: Q): string[] {
  const E = plusLongue(q.text);
  if (!E) return ["expression introuvable"];
  return qcmUnique(q, (c) => c === (estProduit(E) ? "un produit" : "une somme (ou une différence)"));
}

// ─── Défis ─────────────────────────────────────────────────────────────────

/** Une égalité proposée par un élève : juste ou fausse ? */
function cEgaliteProposee(q: Q): string[] {
  const t = texteLisible(q.text);
  const m = t.match(/(\S*\([^()]+\)) = (.+?)(?: \?|\. )/) ?? t.match(/développer (\S*\([^()]+\)), \S+ écrit (.+?)\. /) ?? t.match(/développé (\S*\([^()]+\)) et a trouvé (.+?)\. /);
  if (!m || !poly(m[1]) || !poly(m[2])) return ["égalité illisible"];
  const vrai = equiv(m[1], m[2]);
  return qcmUnique(q, (c) => c === (vrai ? (q.choices?.includes("vrai") ? "vrai" : "oui") : q.choices?.includes("faux") ? "faux" : "non"));
}

/** Justifier k(l ± b) = kl ± kb : l'égalité est vraie, et la bonne phrase fait les deux produits. */
function cJustification(q: Q): string[] {
  const t = texteLisible(q.text);
  const es = expressionsLitterales(q.text);
  const E = es.find((e) => /\(/.test(e));
  const R = es.find((e) => !/\(/.test(e) && /\d/.test(e));
  if (!E || !R) return ["égalité illisible"];
  const p = equiv(E, R) ? [] : [`l'égalité ${E} = ${R} est fausse`];
  const juste = (c: string) => {
    const m = c.match(/^(-?\d+) multiplie chacun des deux termes : \(?(-?\d+)\)? × ([a-z]) et \(?(-?\d+)\)? × \(?(-?\d+)\)?$/);
    return !!m && equiv(`${m[2]}${m[3]} + ${m[4]} * (${m[5]})`, R) && equiv(`${m[1]}(${m[3]} + ${m[5]})`, E);
  };
  if (!/[a-z]/.test(t)) p.push("lettre absente");
  return [...p, ...qcmUnique(q, juste)];
}

/** Corriger l'erreur d'un élève : la proposition est bien fausse, la réponse est le bon développement. */
function cCorrigerErreur(q: Q): string[] {
  const t = texteLisible(q.text);
  const m = t.match(/(\S*\([^()]+\)(?:\([^()]+\))?) = (.+?)(?:\. |, | est faux)/);
  if (!m || !poly(m[1]) || !poly(m[2])) return ["égalité illisible"];
  const p = equiv(m[1], m[2]) ? [`l'égalité ${m[1]} = ${m[2]} est juste : il n'y a pas d'erreur à corriger`] : [];
  return [...p, ...reponseExpression(q, m[1], `bon développement de ${m[1]}`)];
}

/** Développer : l'expression du texte (cReduire), et elle a bien des parenthèses. */
function cDevelopper(q: Q): string[] {
  const E = cibleNonReduite(q.text);
  if (!E || !/\(/.test(E)) return [`aucune parenthèse à développer (${E})`];
  // « Un carré a pour côté 5 - t. Développe … son aire (5 - t)² » : l'aire est bien celle de ce côté
  const cote = texteLisible(q.text).match(/carré a pour côté (.+?)\. .*?aire (.+?)\.$/);
  if (cote && !equiv(`(${cote[1]})^2`, cote[2])) return [`l'aire ${cote[2]} n'est pas celle d'un carré de côté ${cote[1]}`];
  return cReduire(q);
}

export const CORRECTEURS: CorrecteursMaths = avecReglesLitteral({
  // simple
  litteral_distributivite_simple_tpl_formel_1: cDevelopper,
  litteral_distributivite_simple_tpl_formel_2: cDevelopper,
  litteral_distributivite_simple_tpl_signe_1: cDevelopper,
  litteral_distributivite_simple_tpl_nature_1: cSituationSimple,
  litteral_distributivite_simple_tpl_maison_1: cSituationSimple,
  litteral_distributivite_simple_tpl_achat_1: cSituationSimple,
  litteral_distributivite_simple_tpl_qcm_1: cDevelopper,
  // double
  litteral_distributivite_double_tpl_formel_1: cDevelopper,
  litteral_distributivite_double_tpl_formel_2: cDevelopper,
  litteral_distributivite_double_tpl_formel_3: cDevelopper,
  litteral_distributivite_double_tpl_formel_4: cDevelopper,
  litteral_distributivite_double_tpl_coeff_1: cAire,
  litteral_distributivite_double_tpl_purecoeff_1: cDevelopper,
  litteral_distributivite_double_open_2: cDevelopper,
  // réduire
  litteral_litteral_distributivite_reduire_tpl_formel_1: cDevelopper,
  litteral_litteral_distributivite_reduire_tpl_formel_2: cDevelopper,
  litteral_litteral_distributivite_reduire_tpl_batiment_1: cGroupesPlusReste,
  litteral_distributivite_reduire_tpl_deux_parentheses_1: cDevelopper,
  litteral_distributivite_reduire_tpl_soustraction_1: cDevelopper,
  litteral_distributivite_reduire_tpl_negatif_1: cDevelopper,
  litteral_distributivite_reduire_tpl_trois_termes_1: cDevelopper,
  litteral_distributivite_reduire_tpl_mixte_1: cDevelopper,
  // factorisation (notion litteral_factorisation, écrite ici)
  litteral_distributivite_facto_tpl_simple_1: cFactoriserSituation,
  litteral_distributivite_facto_tpl_simple_2: cFactoriser,
  litteral_distributivite_facto_tpl_coeff_1: cFactoriser,
  litteral_distributivite_facto_tpl_verif_1: cFactoriser,
  // reconnaître
  litteral_litteral_distributivite_reconnaitre_tpl_1: cReconnaitreQcm,
  litteral_litteral_distributivite_reconnaitre_tpl_2: cReconnaitreQcm,
  litteral_distributivite_reconnaitre_tpl_3: cDevelopeeOuiNon,
  litteral_distributivite_reconnaitre_tpl_4: cReconnaitreQcm,
  litteral_distributivite_reconnaitre_tpl_5: cSommeOuProduit,
  // défis
  litteral_distributivite_defi_tpl_justification_1: cJustification,
  litteral_distributivite_defi_tpl_erreur_1: cEgaliteProposee,
  litteral_distributivite_defi_tpl_signe_1: cEgaliteProposee,
  litteral_distributivite_defi_open_erreur_1: cCorrigerErreur,
  litteral_distributivite_defi_tpl_maison_1: cDeuxGroupes,
  litteral_distributivite_defi_tpl_nature_1: cGroupesPuisChangement,
  litteral_distributivite_defi_tpl_aire_1: cAire,
  litteral_distributivite_defi_tpl_perimetre_1: cPerimetre,
});

/** Factoriser une dépense « k fois (l + b) » : la somme écrite correspond à la situation. */
function cFactoriserSituation(q: Q): string[] {
  const t = texteLisible(q.text);
  const l = lettreAttendue(q);
  const p: string[] = [];
  if (l && /achètent|achète|loue|kits/.test(t)) {
    const d = donnees(premierePhrase(q.text), l);
    const S = plusLongue(q.text);
    if (d.length !== 3 || d[1] !== l) p.push(`situation illisible : ${d.join(", ")}`);
    else if (!S || !equiv(S, `${d[0]}(${l} + ${d[2]})`)) p.push(`la somme écrite « ${S} » ne correspond pas à la situation`);
  }
  return [...p, ...cFactoriser(q)];
}
