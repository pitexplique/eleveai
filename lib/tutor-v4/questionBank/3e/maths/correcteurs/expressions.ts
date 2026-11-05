// LECTURE D'EXPRESSIONS POUR LES CORRECTEURS DE 3e (05/11/2026).
//
// Un petit interprète indépendant des gabarits : il lit « (x − 3)(x + 3) »,
// « 2n + 1 », « √7 », « $\dfrac{a+c}{b}$ », et les évalue. Deux écritures sont
// égales si elles valent la même chose sur plusieurs valeurs tirées des lettres.

export type Env = Record<string, number>;

/** Enlève les $ et transforme \dfrac{A}{B} en ((A)/(B)), imbriqués compris. */
function aplatir(src: string): string {
  let s = src.replace(/\$/g, "").replace(/\\times/g, "×").replace(/\\div/g, "÷").replace(/\\,/g, "");
  for (;;) {
    const i = s.search(/\\d?frac\{/);
    if (i < 0) return s;
    const debut = s.indexOf("{", i);
    const lireGroupe = (o: number): [string, number] => {
      let n = 0;
      for (let k = o; k < s.length; k++) {
        if (s[k] === "{") n++;
        if (s[k] === "}" && --n === 0) return [s.slice(o + 1, k), k + 1];
      }
      throw new Error(`accolade non fermée : ${src}`);
    };
    const [num, apres] = lireGroupe(debut);
    const [den, fin] = lireGroupe(apres);
    s = `${s.slice(0, i)}((${num})/(${den}))${s.slice(fin)}`;
  }
}

/** Valeur d'une expression. Lève une erreur si elle est illisible. */
export function evaluer(src: string, env: Env): number {
  const s = aplatir(src).replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/,/g, ".").replace(/[*·]/g, "×");
  let i = 0;
  const estAtome = (c: string | undefined) => !!c && /[\d(√\p{L}]/u.test(c);

  function atome(): number {
    const c = s[i];
    if (c === "(") {
      i++;
      const v = somme();
      if (s[i++] !== ")") throw new Error(`parenthèse non fermée : ${src}`);
      return v;
    }
    if (c === "√") {
      i++;
      return Math.sqrt(puissance());
    }
    const m = s.slice(i).match(/^\d+(?:\.\d+)?/);
    if (m) {
      i += m[0].length;
      return Number(m[0]);
    }
    if (c && /\p{L}/u.test(c)) {
      i++;
      if (c === "π") return Math.PI;
      if (!(c in env)) throw new Error(`lettre inconnue « ${c} » dans : ${src}`);
      return env[c];
    }
    throw new Error(`expression illisible : ${src}`);
  }
  function puissance(): number {
    let v = atome();
    for (;;) {
      if (s[i] === "²") (i++, (v = v * v));
      else if (s[i] === "³") (i++, (v = v * v * v));
      else if (s[i] === "^") {
        i++;
        v = v ** atome();
      } else return v;
    }
  }
  function unaire(): number {
    if (s[i] === "-") {
      i++;
      return -unaire();
    }
    if (s[i] === "+") {
      i++;
      return unaire();
    }
    return puissance();
  }
  function produit(): number {
    let v = unaire();
    for (;;) {
      if (s[i] === "×") {
        i++;
        v *= unaire();
      } else if (s[i] === "÷" || s[i] === "/") {
        i++;
        v /= unaire();
      } else if (estAtome(s[i])) v *= puissance();
      else return v;
    }
  }
  function somme(): number {
    let v = produit();
    for (;;) {
      if (s[i] === "+") {
        i++;
        v += produit();
      } else if (s[i] === "-") {
        i++;
        v -= produit();
      } else return v;
    }
  }
  const v = somme();
  if (i !== s.length) throw new Error(`fin illisible (${s.slice(i)}) dans : ${src}`);
  return v;
}

/** Les lettres d'une écriture (hors commandes LaTeX). */
export const lettresDe = (src: string) => [...new Set(aplatir(src).match(/\p{L}/gu) ?? [])].filter((c) => c !== "π");

const PRESQUE = (a: number, b: number) => Math.abs(a - b) < 1e-7 * (1 + Math.abs(a) + Math.abs(b));

/** Vraies, sur 12 tirages de valeurs (non nulles, pour les dénominateurs), les deux écritures sont égales ? */
export function egales(a: string, b: string): boolean {
  const ls = [...new Set([...lettresDe(a), ...lettresDe(b)])];
  for (let k = 0; k < 12; k++) {
    const env: Env = Object.fromEntries(ls.map((l) => [l, (Math.floor(Math.random() * 17) + 2) * (Math.random() < 0.5 ? 1 : -1) + Math.random() / 7]));
    let x: number;
    let y: number;
    try {
      x = evaluer(a, env);
      y = evaluer(b, env);
    } catch {
      return false;
    }
    if (!PRESQUE(x, y)) return false;
  }
  return true;
}

/** Évalue un énoncé-choix si possible ; `null` s'il n'est pas lisible. */
export function essai(src: string, env: Env): number | null {
  try {
    return evaluer(src, env);
  } catch {
    return null;
  }
}

export const memeEnsemble = (a: number[], b: number[]) => {
  const x = [...a].sort((u, v) => u - v);
  const y = [...b].sort((u, v) => u - v);
  return x.length === y.length && x.every((v, i) => PRESQUE(v, y[i]));
};
