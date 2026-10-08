import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { estFactorisee } from "@/lib/tutor/evaluation/expressionAlgebrique";
import {
  avecReglesLitteral,
  cFactoriser,
  donnees,
  equiv,
  expressionsLitterales,
  facteurCommunSeulement,
  lettreAttendue,
  normaliser,
  plusLongue,
  poly,
  polyEgaux,
  qcmExpression,
  qcmUnique,
  reponseExpression,
  reponseNombre,
  texteLisible,
  type Poly,
} from "./expressions-litterales";

// LES CORRECTEURS DE factorisation.bank.ts (08/10/2026, voir 6e/maths/correcteurs/types.ts).
// Chacun relit la SOMME écrite dans le texte (ou la situation « k groupes de
// l … et b … »), cherche lui-même le facteur commun (plus grand diviseur des
// coefficients, lettres présentes dans tous les termes), et juge la réponse :
// même expression, factorisée le plus possible, par un FACTEUR COMMUN seulement
// (décision de Frédéric : pas d'identité remarquable en 4e). Vide = juste.

type Q = TutorGeneratedQuestionV4;

const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));

/** Le facteur commun d'une somme : plus grand diviseur des coefficients, lettres communes (plus petit exposant). */
export function facteurCommun(P: Poly): { G: number; lettres: string } {
  const monos = [...P.entries()];
  const G = monos.reduce((g, [, c]) => pgcd(g, Math.round(Math.abs(c))), 0);
  const exps = monos.map(([k]) => Object.fromEntries([...k.matchAll(/([a-z])(\d+)/g)].map((m) => [m[1], Number(m[2])])) as Record<string, number>);
  let lettres = "";
  for (const l of Object.keys(exps[0] ?? {}).sort()) {
    const e = Math.min(...exps.map((x) => x[l] ?? 0));
    if (e > 0) lettres += e === 1 ? l : `${l}^${e}`;
  }
  return { G, lettres };
}

const estPremier = (n: number) => n > 1 && [...Array(n).keys()].slice(2).every((d) => n % d !== 0);

/** La somme à factoriser : la plus longue expression du texte sans parenthèse. */
function sommeDuTexte(t: string): string | null {
  const es = expressionsLitterales(t).filter((e) => !/[()]/.test(e) && /[+\-−]/.test(e.replace(/^[−-]/, "")));
  if (!es.length) return null;
  return es.reduce((a, b) => (normaliser(b).length > normaliser(a).length ? b : a));
}

/** Quel est le facteur commun ? (le plus grand, ou l'unique quand il n'y en a qu'un). */
function cLeFacteurCommun(q: Q): string[] {
  const t = texteLisible(q.text);
  const S = sommeDuTexte(q.text);
  const P = S ? poly(S) : null;
  if (!S || !P) return ["somme introuvable"];
  const { G, lettres } = facteurCommun(P);
  const plusGrand = /plus grand|au maximum/.test(t);
  const p: string[] = [];
  let juste: string;
  if (plusGrand) juste = `${G}${lettres}`;
  else if (G > 1 && lettres) return [`${S} : le nombre ${G} et la lettre ${lettres} sont communs — la question est ambiguë`];
  else if (lettres) juste = lettres;
  else {
    if (!estPremier(G)) p.push(`${S} : ${G} n'est pas premier, plusieurs facteurs communs possibles`);
    juste = String(G);
  }
  if (/^\d+$/.test(juste)) return [...p, ...reponseNombre(q, Number(juste), `facteur commun de ${S}`)];
  if (q.comparator !== "expression_equivalente") p.push(`comparateur ${q.comparator} pour un facteur en lettre`);
  if (!equiv(String(q.expected[0]), juste)) p.push(`attendu « ${q.expected[0]} », le facteur commun de ${S} est ${juste}`);
  return p;
}

/** Une situation « k groupes de l … et b … » : la somme écrite (s'il y en a une), puis la factorisation. */
function cFactoriserSituation(q: Q): string[] {
  const l = lettreAttendue(q);
  const t = texteLisible(q.text);
  const premiere = t.split(/(?<=\.)\s+/)[0];
  const d = l ? donnees(premiere, l) : [];
  if (!(d.length === 3 && d[1] === l)) return cFactoriser(q); // pas de situation : la somme du texte
  const juste = `${d[0]}(${l} + ${d[2]})`;
  const S = sommeDuTexte(q.text);
  const p = S && !equiv(S, juste) ? [`la somme écrite « ${S} » ne correspond pas à la situation (${juste})`] : [];
  p.push(...reponseExpression(q, juste, "situation"));
  if (!facteurCommunSeulement(String(q.expected[0]))) p.push(`attendu « ${q.expected[0]} » : pas une factorisation par facteur commun`);
  return p;
}

/** L'aire écrite comme « L × (…) » : la réponse commence bien par cette longueur. */
function cFactoriserAire(q: Q): string[] {
  const t = texteLisible(q.text);
  const L = t.match(/sous la forme ([a-z]) × \(…\)/)?.[1];
  const p = L && !normaliser(String(q.expected[0])).startsWith(`${L}(`) ? [`la réponse ne commence pas par ${L}`] : [];
  return [...p, ...cFactoriser(q)];
}

/** « e = prop » : la factorisation proposée est-elle juste (même expression, factorisée au maximum) ? */
function cFactorisationProposee(q: Q): string[] {
  const t = texteLisible(q.text);
  const m =
    t.match(/([^:\s][^:]*?) = ([^ ]*\(.+?\))(?: \?|\. | est)/) ??
    t.match(/factorise (.+?) et (?:obtient|trouve) (.+?)\. /) ??
    t.match(/dans (.+?), \S+ écrit (.+?)\. /) ??
    t.match(/factoriser (.+?), \S+ écrit (.+?)\. /) ??
    t.match(/factorise (.+?) en (.+?)\. /);
  if (!m) return ["égalité illisible"];
  const e = m[1].replace(/^.*(?:Vrai ou faux : |La factorisation |On propose : |Est-il exact que |que )/, "").trim();
  const prop = m[2].trim();
  if (!poly(e) || !poly(prop)) return [`égalité illisible : ${e} = ${prop}`];
  const egal = equiv(e, prop);
  const p: string[] = [];
  if (egal && !estFactorisee(prop)) p.push(`${prop} vaut bien ${e} mais n'est pas factorisée au maximum : oui ou non est ambigu`);
  const vrai = egal && estFactorisee(prop);
  return [...p, ...qcmUnique(q, (c) => c === (vrai ? (q.choices?.includes("vrai") ? "vrai" : "oui") : q.choices?.includes("faux") ? "faux" : "non"))];
}

/** QCM : une seule proposition égale à la somme, et elle est factorisée au maximum. */
function cQcmFactorisation(q: Q): string[] {
  const S = sommeDuTexte(q.text);
  if (!S) return ["somme introuvable"];
  const p = qcmExpression(q, S);
  if (!estFactorisee(String(q.expected[0]))) p.push(`la bonne proposition « ${q.expected[0]} » n'est pas factorisée au maximum`);
  return p;
}

/** Corriger une factorisation fausse : la proposition est bien fausse, la réponse est la bonne factorisation. */
function cCorrigerFactorisation(q: Q): string[] {
  const t = texteLisible(q.text);
  const m = t.match(/([^()=]+?) (?:=|et obtient) ([^=]+?\))(?=[ .,])/);
  const e = m ? expressionsLitterales(m[1]).pop() : undefined;
  const faux = m ? expressionsLitterales(m[2])[0] : undefined;
  if (!e || !faux || !/\(/.test(faux)) return ["égalité illisible"];
  const p = equiv(e, faux) ? [`${e} = ${faux} est juste : il n'y a pas d'erreur`] : [];
  p.push(...reponseExpression(q, e, `bonne factorisation de ${e}`));
  if (!facteurCommunSeulement(String(q.expected[0]))) p.push(`attendu « ${q.expected[0]} » : pas une factorisation par facteur commun`);
  return p;
}

/** Facteur négatif : toutes les écritures acceptées valent la somme, et le facteur est celui demandé. */
function cFacteurNegatif(q: Q): string[] {
  const t = texteLisible(q.text);
  const S = sommeDuTexte(q.text);
  const P = S ? poly(S) : null;
  if (!S || !P) return ["somme introuvable"];
  const p: string[] = [];
  // le facteur voulu : imposé par l'énoncé, ou le plus grand (nombre, ou nombre et lettre), précédé de −
  const impose = t.match(/(?:mettant|Mets|forme|veut|prenant) (−\d*[a-z]?|−) (?:en facteur|× \(…\)|devant|comme facteur)/)?.[1];
  let f: string;
  if (impose) f = impose === "−" ? "−1" : impose;
  else {
    const { G, lettres } = facteurCommun(P);
    const avecLettre = !/nombre négatif/.test(t);
    f = `−${G === 1 && avecLettre && lettres ? "" : G}${avecLettre ? lettres : ""}`;
  }
  // la situation (« chaque erreur coûte 4 points… ») donne la somme
  const l = lettreAttendue(q);
  if (l && /coûte|baisse|descend|retire|perd|recule/.test(t)) {
    const d = donnees(t.split(/(?<=\.)\s+/).slice(0, 2).join(" ").replace(/ (?:La|Sa|Son|On) .*$/, ""), l);
    if (d.length === 3 && d[1] === l && !equiv(S, `-${d[0]}(${l} + ${d[2]})`)) p.push(`la somme ${S} ne correspond pas à la situation`);
  }
  const e0 = String(q.expected[0]);
  const fNorm = normaliser(f);
  if (!normaliser(e0).startsWith(`${fNorm}(`)) p.push(`attendu « ${e0} » : le facteur devant la parenthèse n'est pas ${f}`);
  if (!estFactorisee(e0)) p.push(`attendu « ${e0} » : il reste un facteur commun dans la parenthèse`);
  const mauvaises = q.expected.filter((x) => !polyEgaux(poly(x), P));
  if (mauvaises.length) p.push(`${mauvaises.length} écriture(s) acceptée(s) ne valent pas ${S} : ${mauvaises.slice(0, 2).join(" | ")}`);
  // une écriture acceptée doit garder le facteur demandé (pas 9(−2b² + …) pour −9)
  const autresFacteurs = q.expected.filter((x) => {
    const s = normaliser(x);
    return !s.startsWith(`${fNorm}(`) && !s.startsWith(`${fNorm}*`) && !s.startsWith(`(${fNorm})`) && !s.endsWith(`(${fNorm})`) && !(fNorm === "-1" && s.startsWith("-("));
  });
  if (autresFacteurs.length) p.push(`écritures acceptées sans le facteur ${f} : ${autresFacteurs.slice(0, 2).join(" | ")}`);
  return p;
}

/** QCM à facteur négatif : une seule proposition égale à la somme. */
function cQcmNegatif(q: Q): string[] {
  const S = sommeDuTexte(q.text);
  if (!S) return ["somme introuvable"];
  const f = texteLisible(q.text).match(/(?:mettre|avec) (−\d*[a-z]?) en facteur/)?.[1];
  const p = f && !normaliser(String(q.expected[0])).startsWith(`${normaliser(f)}(`) ? [`la bonne proposition n'a pas ${f} en facteur`] : [];
  return [...p, ...qcmExpression(q, S)];
}

export const CORRECTEURS: CorrecteursMaths = avecReglesLitteral({
  litteral_facteur_commun_tpl_1: cLeFacteurCommun,
  litteral_facteur_commun_tpl_2: cLeFacteurCommun,
  litteral_facteur_commun_tpl_3: cLeFacteurCommun,
  litteral_factoriser_simple_tpl_1: cFactoriserSituation,
  litteral_factoriser_simple_tpl_2: cFactoriser,
  litteral_factoriser_simple_tpl_3: cFactoriserAire,
  litteral_factoriser_verifier_tpl_1: cFactorisationProposee,
  litteral_factoriser_verifier_tpl_2: cFactorisationProposee,
  litteral_factoriser_verifier_tpl_3: cQcmFactorisation,
  litteral_litteral_factorisation_defi_open_erreur_1: cCorrigerFactorisation,
  litteral_litteral_factorisation_defi_tpl_reunion_1: cFactoriserSituation,
  litteral_factorisation_defi_tpl_double_1: cFactoriser,
  litteral_factorisation_defi_tpl_erreur_1: cFactorisationProposee,
  litteral_factorisation_defi_tpl_contexte_1: cFactoriserSituation,
  litteral_factorisation_defi_tpl_negatif_impose: cFacteurNegatif,
  litteral_factorisation_defi_tpl_negatif_max: cFacteurNegatif,
  litteral_factorisation_defi_tpl_negatif_qcm: cQcmNegatif,
});
