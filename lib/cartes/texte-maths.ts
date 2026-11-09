// ─── Les libellés des cartes mentales, lisibles sans LaTeX ────────────────────
// Les micros du coach arrivent en texte simple (scripts/generer-bilans-videos.mjs)
// avec des restes de notation : « (a+b)^2 », « a^(x+y) », « P_A(B) ».
// ⭐ 09/11/2026 : on les affiche en vrais exposants et indices (<sup>, <sub>) dans
// les bulles, et en caractères Unicode (², ⁿ…) là où il faut du texte brut
// (titre de la page, mode classe).

// Les morceaux d'un libellé : du texte, un exposant ou un indice.
export type Morceau = { t: "txt" | "sup" | "sub"; v: string };

// ^(…), ^{…}, ^2, ^-1, ^x ; _{…}, _A
const NOTATION = /\^\(([^()]+)\)|\^\{([^{}]+)\}|\^(-?\d+|[a-zA-Z])|_\{([^{}]+)\}|_([A-Za-z0-9])/g;

export function morceaux(texte: string): Morceau[] {
  const out: Morceau[] = [];
  let dernier = 0;
  for (const m of texte.matchAll(NOTATION)) {
    if (m.index! > dernier) out.push({ t: "txt", v: texte.slice(dernier, m.index) });
    const sup = m[1] ?? m[2] ?? m[3];
    out.push(sup !== undefined ? { t: "sup", v: sup } : { t: "sub", v: (m[4] ?? m[5])! });
    dernier = m.index! + m[0].length;
  }
  if (dernier < texte.length) out.push({ t: "txt", v: texte.slice(dernier) });
  return out;
}

// ⭐ 09/11 soir — les bulles remplies coupaient mal : « 3,5 / m », « ÷ / 2. »,
// « π / × 15 », « 60 / 000 ». Des espaces insécables tiennent ensemble : un
// nombre et son unité, les tranches de mille, un signe et ce qui le précède,
// un signe et le DERNIER opérande s'il est court (« ÷ 2. » en fin de phrase) ;
// une chaîne de calcul peut toujours se couper après un signe.
const NB = " ";
const UNITES = "mm|cm|dm|km|m|mL|cL|dL|L|mg|g|kg|t|h|min|s|€|%|°|ha|ans?";
export function insecables(s: string): string {
  return s
    .replace(/\([^()]{1,10}\)/g, (p) => p.replace(/ /g, NB)) // « (x + 2) » d'un bloc
    .replace(/([=×÷+−≈≠<>≤≥]) (?=[^\s]{1,4}(?:$| [:;?!→])|[^\s]{1,3}[.,;](?:\s|$))/g, `$1${NB}`)
    .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NB}`)
    .replace(new RegExp(`(\\d) (?=(?:${UNITES})(?![A-Za-zÀ-ÿ]))`, "g"), `$1${NB}`)
    .replace(/ (?=[=×÷+−≈≠<>≤≥:;?!→»])/g, NB)
    .replace(/« /g, `«${NB}`)
    .replace(/× (?=10\^)/g, `×${NB}`) // « 4,5 × 10⁴ » d'un bloc
    .replace(/ (\S{1,8})$/, `${NB}$1`); // pas de mot court seul en dernière ligne
}

const EXPOSANTS: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻", "+": "⁺", n: "ⁿ", x: "ˣ", k: "ᵏ", t: "ᵗ", i: "ⁱ", a: "ᵃ", y: "ʸ", p: "ᵖ", r: "ʳ", "(": "⁽", ")": "⁾" };

// Le même libellé en texte brut : « (a+b)^2 » → « (a+b)² ». Un exposant qu'Unicode
// ne sait pas écrire garde sa notation « ^(…) ».
export function enClair(texte: string): string {
  return morceaux(texte)
    .map(({ t, v }) => {
      if (t === "txt") return v;
      // Pas d'indices majuscules en Unicode : « P_A(B) » reste tel quel.
      if (t === "sub") return v.length === 1 ? `_${v}` : `_{${v}}`;
      const u = [...v].map((c) => EXPOSANTS[c]);
      return u.every(Boolean) ? u.join("") : `^(${v})`;
    })
    .join("");
}
