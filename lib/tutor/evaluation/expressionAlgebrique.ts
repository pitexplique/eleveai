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
function membreUtile(t: string): { gauche: string; droite: string | null; nom?: string } {
  const morceaux = t.split("=");
  if (morceaux.length === 1) return { gauche: t, droite: null };
  if (morceaux.length !== 2) return { gauche: t, droite: null };
  const [g, d] = morceaux;
  // « A = … », « E = … » : un nom d'expression en majuscule seul à gauche.
  if (/^\s*[A-Z]\s*$/.test(g)) return { gauche: d, droite: null, nom: g.trim().toLowerCase() };
  // ⭐ 04/10/2026 (Frédéric) : « p = 3n + 5 » pour « P = 3 × n + 5 » — une
  // minuscule seule qui n'apparaît pas à droite est aussi un nom.
  if (/^\s*[a-z]\s*$/.test(g) && !d.toLowerCase().includes(g.trim()))
    return { gauche: d, droite: null, nom: g.trim() };
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

/** Deux expressions sans signe « = » prennent-elles la même valeur partout ? */
function memeExpression(r: string, a: string): boolean {
  const lettres = [...new Set([...lettresDe(r), ...lettresDe(a)])];
  if (lettres.length > 3) return false;
  for (let k = 0; k < JEUX.length; k++) {
    const v = assigner(lettres, k);
    const x = evaluer(r, v), y = evaluer(a, v);
    if (x === null || y === null || !proche(x, y)) return false;
  }
  return true;
}

/**
 * Vrai si `reponse` et `attendue` sont la même expression ; pour une ÉGALITÉ,
 * les deux membres doivent se correspondre, dans un ordre ou dans l'autre.
 * ⛔ 03/10/2026 (signalé par l'agent des équations) : comparer « à un facteur
 * près » acceptait « x = 8 » pour la traduction « x + 3 = 11 » — même
 * solution, mais ce n'est pas une traduction. Désormais « 3 + x = 11 » et
 * « 11 = x + 3 » passent, « x = 8 » et « 2x + 6 = 22 » non.
 */
export function expressionsEquivalentes(reponse: string, attendue: string): boolean {
  const R = membreUtile(reponse);
  const A = membreUtile(attendue);
  if (R.nom && A.nom && R.nom !== A.nom) return false;
  if ((R.droite === null) !== (A.droite === null)) return false;
  if (R.droite !== null && A.droite !== null) {
    return (
      (memeExpression(R.gauche, A.gauche) && memeExpression(R.droite, A.droite)) ||
      (memeExpression(R.gauche, A.droite) && memeExpression(R.droite, A.gauche))
    );
  }
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

/**
 * Réduite (03/10/2026, signalé par l'agent des expressions de 4e) : développée,
 * ET chaque sorte de terme n'apparaît qu'UNE fois — « 3x + 2x » est équivalent
 * à 5x et sans parenthèse, mais il n'est pas réduit. La sorte d'un terme, c'est
 * ses lettres avec leurs exposants (x², x, xy, rien pour un nombre).
 */
export function estReduite(reponse: string): boolean {
  if (!estDeveloppee(reponse)) return false;
  const t = membreUtile(reponse)
    .gauche.replace(/[−–]/g, "-")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\s+/g, "")
    .toLowerCase();
  const termes = t.split(/(?<=[^+\-*^/(])(?=[+-])/).filter(Boolean);
  const vues = new Set<string>();
  for (const terme of termes) {
    // Un terme réduit : UN nombre (facultatif), puis chaque lettre UNE fois.
    // « 3x × 4x », « 3x·4x », « x*x » ne le sont pas (03/10, agent de 3e).
    // « 3*x », « 3×x » : un signe fois juste après le nombre est permis.
    const t1 = terme.replace(/^[+-]/, "").replace(/^(\d+(?:\.\d+)?)[*×·]/, "$1");
    if (/[*×·/]/.test(t1) || !/^(\d+(\.\d+)?)?([a-z](\^\d+)?)*$/.test(t1)) return false;
    const lettresTerme = t1.match(/[a-z]/g) ?? [];
    if (new Set(lettresTerme).size !== lettresTerme.length) return false;
    const exposants: Record<string, number> = {};
    for (const m of terme.matchAll(/([a-z])(?:\^(\d+))?/g)) exposants[m[1]] = (exposants[m[1]] ?? 0) + Number(m[2] ?? 1);
    const sorte = Object.keys(exposants).sort().map((l) => `${l}${exposants[l]}`).join("");
    if (vues.has(sorte)) return false;
    vues.add(sorte);
  }
  return true;
}

const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));

/**
 * Factorisée LE PLUS POSSIBLE (03/10/2026, Frédéric : « dis le plus possible ») :
 * aucune parenthèse de la réponse ne garde un facteur commun à ses termes.
 * 2(3x + 6) est refusé pour 6x + 12 (3 et 6 ont encore 3 en commun) ;
 * 2(x² + 3x) pour 2x² + 6x (x est encore en commun) ; 6(x + 2) et 2x(x + 3)
 * sont acceptés. Les coefficients décimaux ne sont pas jugés (pas de pgcd).
 */
function parenthesesSansFacteurCommun(t: string): boolean {
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== "(") continue;
    let prof = 1, j = i + 1;
    while (j < t.length && prof > 0) {
      if (t[j] === "(") prof++;
      else if (t[j] === ")") prof--;
      j++;
    }
    const dedans = t.slice(i + 1, j - 1);
    if (dedans.includes("(")) continue; // une parenthèse imbriquée : on juge les plus intérieures
    const termes = dedans.split(/(?<=[^+\-*^/])(?=[+-])/).filter(Boolean);
    if (termes.length < 2) continue;
    let g = 0, decimal = false;
    const exposants: Record<string, number>[] = [];
    for (const terme of termes) {
      const coef = /^[+-]?(\d+(?:\.\d+)?)?/.exec(terme)?.[1];
      const c = coef === undefined ? 1 : Number(coef);
      if (!Number.isInteger(c)) decimal = true;
      else g = pgcd(g, c);
      const e: Record<string, number> = {};
      for (const m of terme.matchAll(/([a-z])(?:\^(\d+))?/g)) e[m[1]] = (e[m[1]] ?? 0) + Number(m[2] ?? 1);
      exposants.push(e);
    }
    if (!decimal && g > 1) return false;
    const lettres = Object.keys(exposants[0]);
    if (lettres.some((l) => exposants.every((e) => (e[l] ?? 0) > 0))) return false;
  }
  return true;
}

/** Factorisée : au moins une parenthèse, pas de + ou − au premier niveau, et rien de plus à mettre en facteur. */
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
  return parenthesesSansFacteurCommun(t.toLowerCase().replace(/(\d),(\d)/g, "$1.$2").replace(/²/g, "^2").replace(/³/g, "^3"));
}
