// ⛔ 14/11/2026 — JAMAIS DEUX CHOIX DE MÊME VALEUR dans un QCM (règle de Frédéric,
// 08/10). Mesuré au CM1 : « 5,3 » et « 5,30 », « 4 » et « 4,0 », « 2/24 » et
// « 1/12 », « 42/6 » et « 49/7 » proposés ensemble. Les outils qui fabriquent les
// choix sont trop nombreux pour être tous corrigés : ce filtre passe à l'entrée
// des banques (index CM1, CM2) et retire, quand la bonne réponse est un NOMBRE
// (entier, décimal, fraction, avec ou sans unité), tout piège qui vaut la bonne
// réponse ou un piège déjà gardé. Une question dont la réponse est en mots
// (« elles sont égales ») n'est pas touchée : là, deux fractions égales sont
// proposées exprès.
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function valeur(s: string): string | null {
  const t = String(s).trim().replace(/\s+/g, " ");
  const f = /^(\d+)\s*\/\s*(\d+)\s*([^\d]*)$/.exec(t);
  if (f && Number(f[2]) !== 0) return `${(Number(f[1]) / Number(f[2])).toFixed(6)}|${f[3]}`;
  const d = /^(\d+(?:[.,]\d+)?)\s*([^\d]*)$/.exec(t);
  if (d) return `${Number(d[1].replace(",", ".")).toFixed(6)}|${d[2]}`;
  return null;
}

function nettoyer<Q extends { choices?: string[]; expected?: string[] }>(q: Q): Q {
  if (!q.choices || !q.expected?.length) return q;
  const bonne = q.choices.find((c) => q.expected!.includes(c));
  if (bonne === undefined || valeur(bonne) === null) return q;
  const vus = new Set<string>([valeur(bonne)!]);
  const garde: string[] = [];
  for (const c of q.choices) {
    if (c === bonne) { garde.push(c); continue; }
    const v = valeur(c);
    if (v !== null && vus.has(v)) continue;
    if (v !== null) vus.add(v);
    garde.push(c);
  }
  return garde.length === q.choices.length || garde.length < 2 ? q : { ...q, choices: garde };
}

export function choixDistinctsParValeur(bank: TutorBankItemV4[]): TutorBankItemV4[] {
  return bank.map((item) => {
    if (item.kind === "fixed") return nettoyer(item as never) as TutorBankItemV4;
    const gen = item.generate;
    return { ...item, generate: (...a: Parameters<typeof gen>) => nettoyer(gen(...a) as never) } as TutorBankItemV4;
  });
}
