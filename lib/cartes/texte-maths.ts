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
