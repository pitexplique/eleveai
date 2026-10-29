// ─── Vérifier une réponse SANS IA, dans le navigateur ──────────────────────────
// Frédéric (29/10/2026) : « je veux pas passer par l'IA » — ça coûterait à
// chaque clic. La réponse attendue est donc ÉCRITE dans la fiche (`reponses`
// dans lib/fiches-exercices/types.ts) et ce fichier la compare à la saisie de
// l'élève EN CALCULANT : on évalue les deux expressions, et si elles ont des
// lettres (x, n, t…), on les évalue en plusieurs valeurs. Ainsi 2/4, 0,5 et
// 1/2 sont la même réponse ; e^(2x) et (e^x)² aussi ; 3(x+1) et 3x+3 aussi.
// Quand la saisie n'est pas un calcul (« isocèle », « vrai »), on compare le
// texte, sans majuscules, accents ni espaces.

/** Une réponse attendue : une sous-question, ses formes acceptées. */
export type ReponseAttendue = {
  /** « a) », « b) »… ; absent quand l'exercice n'a qu'une réponse. */
  question?: string;
  /** La réponse, ou plusieurs formes acceptées. Notation clavier : e^(2x), √(3), 3/4. */
  attendu: string | string[];
  /** Écart permis pour une valeur approchée (ex. 0.01 pour « au centième »). */
  tolerance?: number;
};

type Valeurs = Record<string, number>;

/** Évalue une saisie « calculatrice ». Lance une erreur si ce n'est pas un calcul. */
function evaluer(src: string, vars: Valeurs): number {
  const s = src
    .replace(/\s+/g, "")
    .replace(/,/g, ".")
    .replace(/[×*·]/g, "*")
    .replace(/[÷:]/g, "/")
    .replace(/[−–]/g, "-")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3");
  let i = 0;

  const FONCTIONS: Record<string, (v: number) => number> = {
    ln: Math.log,
    log: Math.log10,
    exp: Math.exp,
    sqrt: Math.sqrt,
    racine: Math.sqrt,
    cos: Math.cos,
    sin: Math.sin,
    tan: Math.tan,
  };

  function somme(): number {
    let v = produit();
    while (s[i] === "+" || s[i] === "-") {
      const op = s[i++];
      const d = produit();
      v = op === "+" ? v + d : v - d;
    }
    return v;
  }
  // Le produit, avec la multiplication implicite : 2x, 3(x+1), 2√3, 2π.
  function produit(): number {
    let v = unaire();
    for (;;) {
      if (s[i] === "*" || s[i] === "/") {
        const op = s[i++];
        const d = unaire();
        v = op === "*" ? v * d : v / d;
      } else if (i < s.length && /[0-9.(√π\p{L}]/u.test(s[i])) {
        v *= puissance();
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
  function puissance(): number {
    const base = atome();
    if (s[i] === "^") {
      i++;
      return Math.pow(base, unaire());
    }
    return base;
  }
  function atome(): number {
    const c = s[i];
    if (c === undefined) throw new Error("fin");
    if (c === "(" || c === "[") {
      i++;
      const v = somme();
      if (s[i] !== ")" && s[i] !== "]") throw new Error("parenthèse");
      i++;
      return v;
    }
    if (c === "√") {
      i++;
      return Math.sqrt(puissance());
    }
    if (c === "π") {
      i++;
      return Math.PI;
    }
    if (/[0-9.]/.test(c)) {
      let n = "";
      while (i < s.length && /[0-9.]/.test(s[i])) n += s[i++];
      const v = Number(n);
      if (Number.isNaN(v)) throw new Error("nombre");
      if (s[i] === "%") {
        i++;
        return v / 100;
      }
      return v;
    }
    if (/\p{L}/u.test(c)) {
      // Une fonction connue, sinon UNE lettre : « xy » = x × y.
      for (const nom of Object.keys(FONCTIONS)) {
        if (s.startsWith(nom, i) && (s[i + nom.length] === "(" || /[0-9x]/.test(s[i + nom.length] ?? ""))) {
          i += nom.length;
          return FONCTIONS[nom](puissance());
        }
      }
      if (s.startsWith("pi", i)) {
        i += 2;
        return Math.PI;
      }
      i++;
      if (c === "e") return Math.E;
      if (c in vars) return vars[c];
      throw new Error("lettre");
    }
    throw new Error("caractère");
  }

  const v = somme();
  if (i !== s.length) throw new Error("reste");
  return v;
}

/** « x = 3 », « S = {3} », « AB = 5 cm » → « 3 », « 3 », « 5 cm ». */
function sansMembreGauche(s: string): string {
  let t = s.trim().replace(/^S\s*=\s*/i, "").replace(/^\{(.*)\}$/, "$1");
  const egal = t.lastIndexOf("=");
  if (egal >= 0 && /^[\p{L}\s()0-9]*$/u.test(t.slice(0, egal)) && /\p{L}/u.test(t.slice(0, egal))) {
    t = t.slice(egal + 1);
  }
  return t.trim();
}

/** Les unités courantes en fin de réponse, qu'on ignore pour le calcul. */
const UNITE = /\s*(mm|cm|dm|km|m|g|kg|mg|l|cl|ml|dl|s|min|h|€|°|%|cm²|m²|km²|cm³|m³|cm2|m2|cm3|m3)\s*$/i;

function texteNormalise(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[\s.!]/g, "")
    .replace(/,/g, ".");
}

const POINTS = [0.37, 1.21, 2.73, -0.58, 3.9];
const LETTRES = "abcdfghjklmnpqrstuvwxyz".split("");

function memesValeurs(a: string, b: string, tolerance: number): boolean {
  for (const p of POINTS) {
    const vars: Valeurs = {};
    LETTRES.forEach((l, k) => (vars[l] = p + k * 0.113));
    const va = evaluer(a, vars);
    const vb = evaluer(b, vars);
    if (!Number.isFinite(va) || !Number.isFinite(vb)) {
      if (Number.isNaN(va) && Number.isNaN(vb)) continue;
      return false;
    }
    const ecart = Math.abs(va - vb);
    if (ecart > Math.max(tolerance, 1e-9 * Math.max(1, Math.abs(vb)))) return false;
  }
  return true;
}

/** La saisie de l'élève correspond-elle à l'une des formes acceptées ? */
export function saisieJuste(saisie: string, attendue: ReponseAttendue): boolean {
  if (!saisie.trim()) return false;
  const formes = Array.isArray(attendue.attendu) ? attendue.attendu : [attendue.attendu];
  const eleve = sansMembreGauche(saisie);
  return formes.some((forme) => {
    const juste = sansMembreGauche(forme);
    if (texteNormalise(eleve) === texteNormalise(juste)) return true;
    // Plusieurs valeurs (« 2 ; 5 », solutions d'une équation) : même liste, tout ordre.
    const decoupe = (t: string) => t.split(/\s*[;]\s*|\s+(?:et|ou)\s+/).filter(Boolean);
    const le = decoupe(eleve);
    const lj = decoupe(juste);
    if (lj.length > 1 || le.length > 1) {
      if (le.length !== lj.length) return false;
      const restantes = [...lj];
      return le.every((x) => {
        const k = restantes.findIndex((y) => egaux(x, y, attendue.tolerance ?? 0));
        if (k < 0) return false;
        restantes.splice(k, 1);
        return true;
      });
    }
    return egaux(eleve, juste, attendue.tolerance ?? 0);
  });
}

function egaux(a: string, b: string, tolerance: number): boolean {
  if (texteNormalise(a) === texteNormalise(b)) return true;
  try {
    return memesValeurs(a.replace(UNITE, ""), b.replace(UNITE, ""), tolerance);
  } catch {
    return false;
  }
}
