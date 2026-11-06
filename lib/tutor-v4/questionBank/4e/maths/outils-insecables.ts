// LES ÉNONCÉS QUI TIENNENT À 375 PX (06/11/2026), pour les banques des thèmes à trois pays.
//
// Une capture du 05/11 a montré « NH = / 21 cm » et « ? » seul à la ligne : la coupure se
// fait aux espaces ordinaires. On pose donc des insécables autour de « = », avant la
// ponctuation haute et entre un nombre et son unité ; dans une formule, `\nobreak` autour
// de la relation. Les correcteurs relisent le texte par `texteLu`, qui les retire.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { fabriqueGabarits } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const NBSP = " ";

const horsFormule = (s: string) =>
  s
    .replace(/ ([?!:;»])/g, `${NBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ = /g, `${NBSP}=${NBSP}`)
    .replace(/(\d) (mm|cm|dm|km|m|kg|g|L|dL|°C|min|h|s|Go|%)(?![\p{L}\d])/gu, `$1${NBSP}$2`)
    // L'unité juste après une formule : « $3v$ km ».
    .replace(/^ (mm|cm|dm|km|m|kg|g|L|dL|°C|min|h|s|Go|%)(?![\p{L}\d])/u, `${NBSP}$1`);

const dansFormule = (s: string) => s.replace(/ (=|\\le|\\ge|<|>) /g, " \\nobreak $1 \\nobreak ");

export const insecables = (t: string) =>
  t
    .split(/(\$[^$]*\$)/)
    .map((s, i) => (i % 2 ? dansFormule(s) : horsFormule(s)))
    .join("");

/** `fabriqueGabarits`, et le texte de chaque tirage passe par `insecables`. */
export function fabriqueInsecable(notionId: string, tags: string[]) {
  const tpl = fabriqueGabarits("4e", notionId, tags);
  return (microId: string, n: number, difficulty: number, hint: string, generate: () => Record<string, unknown>): TutorBankItemV4 =>
    tpl(microId, n, difficulty, hint, () => {
      const q = generate();
      return { ...q, text: insecables(String(q.text)) };
    });
}

/** Le texte tel que l'auteur l'a écrit : ce que lisent les correcteurs. */
export const texteLu = (q: TutorGeneratedQuestionV4) => String(q.text).replace(/ /g, " ").replace(/\\nobreak /g, "");

/** La longueur écrite « XY = 12 cm » ou « [XY] mesure 12 cm ». */
export function longueurNommee(t: string, nom: string) {
  const m = t.match(new RegExp(`(?:\\b${nom} = |\\[${nom}\\] mesure )(\\d+(?:,\\d+)?) ?(mm|cm|dm|km|m)(?![\\p{L}\\d])`, "u"));
  return m ? { v: Number(m[1].replace(",", ".")), u: m[2] } : undefined;
}
