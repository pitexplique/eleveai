// Comparer deux EXPRESSIONS ALGÉBRIQUES tapées au clavier (30/09/2026).
//
// ⛔ POURQUOI. Le calcul littéral du coach était corrigé par `contains_keyword` :
// « la réponse CONTIENT-elle 3x + 6 ? ». Mesuré le 30/09 sur la 4e : « 3x + 67 »
// passait pour « Développe 3(x + 2) », comme « 3x + 6 + 5 ». Environ 70 questions
// de 4e. Frédéric a choisi une vraie comparaison : deux expressions sont
// équivalentes si elles prennent la même valeur pour plusieurs valeurs des
// lettres — et, quand la consigne demande une FORME, la réponse doit l'avoir :
//   · « développée » : aucune parenthèse (3(x + 2) n'est pas développé) ;
//   · « factorisée »  : un produit, pas une somme au premier niveau.
//
// Ce que l'élève tape et qu'on lit : 3x, 3*x, 3×x, 3·x, 2(x+1), (x+1)(x-2),
// x², x^2, x³, −, virgule ou point décimal, « A = 3x + 6 » (on garde le membre
// de droite), des égalités « 2x + 5 = 17 » (comparées à un facteur près :
// 17 = 2x + 5 est la même équation).
// ⚠️ La lettre « x » est TOUJOURS une inconnue, jamais un signe « fois ».

type Valeurs = Record<string, number>;

/** Découpe et évalue une expression ; `null` si elle ne se lit pas. */
function evaluer(texte: string, v: Valeurs): number | null {
  const s = texte
    .replace(/[−–]/g, "-")
    .replace(/[×·*]/g, "*")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\s+/g, "")
    .toLowerCase();
  let i = 0;
  const voir = () => s[i];
  const expr = (): number => {
    let r = terme();
    while (voir() === "+" || voir() === "-") {
      const op = s[i++];
      const t = terme();
      r = op === "+" ? r + t : r - t;
    }
    return r;
  };
  const terme = (): number => {
    let r = unaire();
    for (;;) {
      if (voir() === "*") {
        i++;
        r *= unaire();
      } else if (voir() === "/" || voir() === ":") {
        i++;
        r /= unaire();
      } else if (voir() !== undefined && /[0-9.a-z(]/.test(voir())) {
        // multiplication implicite : 3x, 2(x + 1), (x + 1)(x - 2), x(x + 3)
        r *= puissance();
      } else return r;
    }
  };
  const unaire = (): number => {
    if (voir() === "-") {
      i++;
      return -unaire();
    }
    if (voir() === "+") {
      i++;
      return unaire();
    }
    return puissance();
  };
  const puissance = (): number => {
    const b = atome();
    if (voir() === "^") {
      i++;
      const e = unaire();
      return Math.pow(b, e);
    }
    return b;
  };
  const atome = (): number => {
    const c = voir();
    if (c === "(") {
      i++;
      const r = expr();
      if (s[i++] !== ")") throw new Error("parenthèse");
      return r;
    }
    const m = /^\d+(?:\.\d+)?|^\.\d+/.exec(s.slice(i));
    if (m) {
      i += m[0].length;
      return Number(m[0]);
    }
    if (c !== undefined && /[a-z]/.test(c)) {
      i++;
      if (!(c in v)) throw new Error("lettre");
      return v[c];
    }
    throw new Error("symbole");
  };
  try {
    const r = expr();
    if (i !== s.length || !Number.isFinite(r)) return null;
    return r;
  } catch {
    return null;
  }
}

/** « A = 3x + 6 » → « 3x + 6 » ; une égalité entre deux expressions est gardée. */
function membreUtile(t: string): { gauche: string; droite: string | null } {
  const morceaux = t.split("=");
  if (morceaux.length === 1) return { gauche: t, droite: null };
  if (morceaux.length !== 2) return { gauche: t, droite: null };
  const [g, d] = morceaux;
  // « A = … », « E = … » : un nom d'expression en majuscule seul à gauche.
  if (/^\s*[A-Z]\s*$/.test(g)) return { gauche: d, droite: null };
  return { gauche: g, droite: d };
}

const lettresDe = (t: string) => [...new Set((t.toLowerCase().match(/[a-z]/g) ?? []))];

/** Des valeurs peu « rondes », pour qu'une coïncidence soit invraisemblable. */
const JEUX: number[][] = [
  [1.7, 2.3, -1.9],
  [-2.6, 0.7, 3.1],
  [3.3, -1.4, 0.45],
  [0.35, 4.2, -2.2],
];

function assigner(lettres: string[], k: number): Valeurs {
  const v: Valeurs = {};
  lettres.forEach((l, j) => (v[l] = JEUX[k][j % 3] + j * 0.13));
  return v;
}

const proche = (a: number, b: number) => Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a), Math.abs(b));

/** Vrai si `reponse` et `attendue` sont la même expression (ou la même égalité, à un facteur près). */
export function expressionsEquivalentes(reponse: string, attendue: string): boolean {
  const R = membreUtile(reponse);
  const A = membreUtile(attendue);
  if ((R.droite === null) !== (A.droite === null)) return false;
  const lettres = [...new Set([...lettresDe(reponse), ...lettresDe(attendue)])];
  if (lettres.length > 3) return false;
  let facteur: number | null = null;
  for (let k = 0; k < JEUX.length; k++) {
    const v = assigner(lettres, k);
    const r = A.droite === null ? evaluer(R.gauche, v) : diff(R, v);
    const a = A.droite === null ? evaluer(A.gauche, v) : diff(A, v);
    if (r === null || a === null) return false;
    if (A.droite === null) {
      if (!proche(r, a)) return false;
    } else {
      // Une égalité : L − R à un facteur non nul près (17 = 2x + 5 ⇔ 2x + 5 = 17).
      if (proche(a, 0)) {
        if (!proche(r, 0)) return false;
        continue;
      }
      const f = r / a;
      if (proche(f, 0)) return false;
      if (facteur === null) facteur = f;
      else if (!proche(f, facteur)) return false;
    }
  }
  return true;
}

function diff(m: { gauche: string; droite: string | null }, v: Valeurs): number | null {
  const g = evaluer(m.gauche, v);
  const d = evaluer(m.droite ?? "0", v);
  return g === null || d === null ? null : g - d;
}

/** Développée : ni parenthèse, ni produit de parenthèses. */
export function estDeveloppee(reponse: string): boolean {
  return !/[()]/.test(membreUtile(reponse).gauche);
}

/** Factorisée : au moins une parenthèse, et pas de + ou − au premier niveau (hors signe de tête). */
export function estFactorisee(reponse: string): boolean {
  const t = membreUtile(reponse).gauche.replace(/[−–]/g, "-").replace(/\s+/g, "");
  if (!t.includes("(")) return false;
  let prof = 0;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === "(") prof++;
    else if (c === ")") prof--;
    else if ((c === "+" || c === "-") && prof === 0 && i > 0 && !/[*×·^(]/.test(t[i - 1])) return false;
  }
  return true;
}
