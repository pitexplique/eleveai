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
  /**
   * La FORME compte, pas seulement la valeur : « fraction irréductible »,
   * « notation scientifique », « forme développée ». On compare alors le texte
   * (sans espaces ni majuscules, × = *, ^(5) = ^5) : 6/8 ne vaut plus 3/4.
   */
  exact?: boolean;
  /**
   * ⭐ LYCÉE (03/11/2026) : la liste se lit DANS L'ORDRE — coordonnées
   * « (2 ; 3 ; -1) », rangement « 1 < 4 < 9 », termes d'une suite. Sans elle,
   * « 2 ; 5 » et « 5 ; 2 » sont la même réponse (solutions d'une équation).
   */
  ordre?: boolean;
  /**
   * ⭐ LYCÉE (03/11/2026) : juste À UNE CONSTANTE PRÈS — « une primitive » :
   * x³/3, x³/3 + 2 et x³/3 − 7 sont toutes justes.
   */
  constante?: boolean;
  /**
   * ⭐ LYCÉE (03/11/2026) : juste À UN FACTEUR PRÈS — « un vecteur directeur » :
   * (2 ; -1), (-4 ; 2) et (1 ; -0,5) sont tous justes, (0 ; 0) non.
   */
  colineaire?: boolean;
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

/** Les unités courantes en fin de réponse, qu'on ignore pour le calcul — y
 *  compris les composées (km/h, g/cm³, hab/km², €/kg) et kWh. */
const UNITE =
  /\s*([\p{L}€]+\s*\/\s*\p{L}+[²³23]?|kwh|wh|kw|w|ha|mm|cm|dm|km|m|g|kg|mg|t|l|cl|ml|dl|s|min|h|ans?|jours?|€|°|%|cm²|m²|km²|dm²|mm²|cm³|m³|dm³|mm³|cm2|m2|km2|dm2|cm3|m3|dm3)\s*$/iu;

/**
 * Enlève l'unité finale, mais SEULEMENT derrière un nombre nu : « 7 140 m² »,
 * « 3/4 L », « 2π cm ». ⛔ Dans « 15 - 2t » ou « 13 - 6,5h », la lettre finale
 * est une inconnue, pas des tonnes ni des heures (trouvé sur la fiche 4e
 * « dépendance », 29/10/2026) : l'expression reste entière.
 */
function sansUnite(s: string, strict = false): string {
  // Côté élève, un MOT après un nombre se lit comme une unité : « 36 cubes »,
  // « 12 élèves », « 5 paniers » (vu sur la fiche 4e « volumes »).
  const mot = /^(\s*[-−+]?[\d\s.,]*\d)\s+\p{L}{2,}[\p{L}\s'’-]*$/u.exec(s);
  if (!strict && mot) return mot[1];
  const m = UNITE.exec(s);
  if (!m) return s;
  // Strict : une unité d'UNE lettre (m, t, h, g…) doit être séparée par un
  // espace — « 3t » collé est un produit.
  if (strict && /^\p{L}$/u.test(m[1]) && !/^\s/.test(m[0])) return s;
  const reste = s.slice(0, m.index);
  // « +50,6 % » : le signe d'une hausse fait partie du nombre (seconde, 03/11).
  return /^\s*[-−+]?[\d\s.,]+(\/[\d\s.,]+)?π?\s*$/.test(reste) ? reste : s;
}

/** « g(2) = 7 » → « g(2) » ; « 7 » → null. Le membre de gauche d'une réponse. */
function membreGauche(s: string): string | null {
  const t = s.trim().replace(/^S\s*=\s*/i, "");
  const egal = t.lastIndexOf("=");
  if (egal >= 0 && /^[\p{L}\s()0-9]*$/u.test(t.slice(0, egal)) && /\p{L}/u.test(t.slice(0, egal))) {
    return texteNormalise(t.slice(0, egal));
  }
  return null;
}

function texteNormalise(s: string): string {
  return s
    // « ]1 ; 2] U ]5 ; 7] » : le U du clavier ordinaire est la réunion.
    .replace(/([\][])\s*[uU]\s*(?=[\][])/g, "$1∪")
    .normalize("NFD")
    // ⛔ ∉ et ≠ se décomposent en ∈ et = + une barre (U+0338) : sans ce « ¬ »,
    // effacer les accents effaçait la barre, et ∉ valait ∈ (seconde, 03/11).
    .replace(/̸/g, "¬")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[\s.!]/g, "")
    .replace(/,/g, ".");
}

/** Pour `exact` : la même écriture, aux variantes de clavier près. */
function formeNormalisee(s: string): string {
  return texteNormalise(sansUnite(s))
    .replace(/[×·x](?=10)/g, "*")
    .replace(/[×·]/g, "*")
    .replace(/[−–]/g, "-")
    .replace(/÷/g, ":")
    .replace(/\^\(([^()]*)\)/g, "^$1")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3");
}

const POINTS =[0.37, 1.21, 2.73, -0.58, 3.9];
const LETTRES = "abcdfghjklmnpqrstuvwxyz".split("");

function memesValeurs(a: string, b: string, tolerance: number, constante = false): boolean {
  let decalage: number | null = null;
  for (const p of POINTS) {
    const vars: Valeurs = {};
    LETTRES.forEach((l, k) => (vars[l] = p + k * 0.113));
    const va = evaluer(a, vars);
    const vb = evaluer(b, vars);
    if (!Number.isFinite(va) || !Number.isFinite(vb)) {
      if (Number.isNaN(va) && Number.isNaN(vb)) continue;
      return false;
    }
    // À une constante près : l'écart doit être le même en chaque point.
    if (constante) decalage ??= va - vb;
    const ecart = Math.abs(va - vb - (decalage ?? 0));
    if (ecart > Math.max(tolerance, 1e-9 * Math.max(1, Math.abs(vb)))) return false;
  }
  return true;
}

/** La saisie de l'élève correspond-elle à l'une des formes acceptées ? */
export function saisieJuste(saisie: string, attendue: ReponseAttendue): boolean {
  if (!saisie.trim()) return false;
  const formes = Array.isArray(attendue.attendu) ? attendue.attendu : [attendue.attendu];
  const eleve = sansMembreGauche(saisie);
  const gaucheEleve = membreGauche(saisie);
  return formes.some((forme) => {
    // ⛔ « g(3) = 7 » ne vaut pas « g(2) = 7 » : quand l'élève ET la réponse
    // écrivent un membre de gauche, il doit être le même.
    const gaucheJuste = membreGauche(forme);
    if (gaucheEleve && gaucheJuste && gaucheEleve !== gaucheJuste) return false;
    const juste = sansMembreGauche(forme);
    if (attendue.exact) return formeNormalisee(eleve) === formeNormalisee(juste);
    if (texteNormalise(eleve) === texteNormalise(juste)) return true;
    if (attendue.colineaire) return colineaires(saisie, forme);
    // Une ÉQUATION attendue (« 2x - y + 3 = 0 ») : toute équation équivalente
    // est juste, -4x + 2y - 6 = 0 comme y = 2x + 3 (seconde, droites, 03/11).
    // ⛔ Pas « g(-3) = 0 » : une lettre suivie d'une parenthèse est une fonction.
    if (juste.includes("=") && saisie.includes("=") && !/\p{L}\s*\(/u.test(forme + saisie)) return equivalentes(saisie, forme);
    // Des intervalles : mêmes crochets, bornes comparées en valeur (et à la
    // tolérance près) — [0,47 ; 0,53] pour [0,468 ; 0,532] au centième.
    const ie = intervalles(saisie);
    const ij = intervalles(forme);
    if (ie && ij) {
      return (
        ie.length === ij.length &&
        ie.every((p, k) => {
          const q = ij[k];
          return p.g === q.g && p.d === q.d && bornesEgales(p.a, q.a, attendue.tolerance ?? 0) && bornesEgales(p.b, q.b, attendue.tolerance ?? 0);
        })
      );
    }
    // Plusieurs valeurs (« 2 ; 5 », solutions d'une équation) : même liste, tout ordre.
    // « x = 4 ou x = -1 » : le « x = » s'enlève dans CHAQUE élément.
    const decoupe = (t: string) =>
      t
        .trim()
        .replace(/^S\s*=\s*/i, "")
        .replace(/^\{(.*)\}$/, "$1")
        .replace(attendue.ordre ? /^\((.*)\)$/ : /$^/, "$1")
        .split(attendue.ordre ? /\s*[;<>≤≥]\s*/ : /\s*[;]\s*|\s+(?:et|ou)\s+/)
        .filter(Boolean)
        .map(sansMembreGauche);
    const le = decoupe(saisie);
    const lj = decoupe(forme);
    if (lj.length > 1 || le.length > 1) {
      if (le.length !== lj.length) return false;
      if (attendue.ordre) {
        // ⛔ Un encadrement : le SENS des signes compte. « 6 > √30 > 5 » (le
        // miroir) est juste, « 5 > √30 > 6 » non. Une liste sans signes « 5 ; 6 »
        // reste acceptée.
        const signesJ = forme.match(/[<>≤≥]/g) ?? [];
        const signesE = saisie.match(/[<>≤≥]/g) ?? [];
        let liste = le;
        if (signesJ.length && signesE.length) {
          const miroir = [...signesJ].reverse().map((c) => ({ "<": ">", ">": "<", "≤": "≥", "≥": "≤" })[c] ?? c);
          if (signesE.join("") === miroir.join("") && signesE.join("") !== signesJ.join("")) liste = [...le].reverse();
          else if (signesE.join("") !== signesJ.join("")) return false;
        }
        return liste.every((x, k) => egaux(x, lj[k], attendue.tolerance ?? 0));
      }
      const restantes = [...lj];
      return le.every((x) => {
        const k = restantes.findIndex((y) => egaux(x, y, attendue.tolerance ?? 0));
        if (k < 0) return false;
        restantes.splice(k, 1);
        return true;
      });
    }
    return egaux(eleve, juste, attendue.tolerance ?? 0, attendue.constante);
  });
}

function egaux(a: string, b: string, tolerance: number, constante = false): boolean {
  if (texteNormalise(a) === texteNormalise(b)) return true;
  // La réponse ATTENDUE est lue strictement (« 3t » y est 3 × t) ; celle de
  // l'élève avec indulgence (« 3t » y est 3 tonnes).
  const essais: [string, string, number][] = [[sansUnite(a), sansUnite(b, true), tolerance]];
  // « 22,5 % » = 0,225 : le pourcentage compté en centièmes. ⛔ La tolérance
  // aussi (03/11) : 0,1 point sur « 50,6 % », c'est 0,001 sur 0,506 — sinon
  // 0,45 passait.
  if (/%\s*$/.test(a) || /%\s*$/.test(b)) essais.push([a, b, tolerance / 100]);
  return essais.some(([x, y, t]) => {
    try {
      return memesValeurs(x, y, t, constante);
    } catch {
      return false;
    }
  });
}

/** Les valeurs de x, y… en un point de test (les mêmes que `memesValeurs`). */
function valeursAuPoint(p: number): Valeurs {
  const vars: Valeurs = {};
  LETTRES.forEach((l, k) => (vars[l] = p + k * 0.113));
  return vars;
}

/** « 2x - y + 3 = 0 » et « y = 2x + 3 » : (gauche − droite) proportionnels. */
function equivalentes(a: string, b: string): boolean {
  const ecart = (t: string) => {
    const [g, d, ...reste] = t.split("=");
    if (reste.length || !g.trim() || !d.trim()) throw new Error("équation");
    return (v: Valeurs) => evaluer(g, v) - evaluer(d, v);
  };
  try {
    const fa = ecart(a);
    const fb = ecart(b);
    let rapport: number | null = null;
    for (const p of POINTS) {
      const va = fa(valeursAuPoint(p));
      const vb = fb(valeursAuPoint(p));
      if (Math.abs(vb) < 1e-9) {
        if (Math.abs(va) > 1e-9) return false;
        continue;
      }
      const r = va / vb;
      if (Math.abs(r) < 1e-9) return false;
      rapport ??= r;
      if (Math.abs(r - rapport) > 1e-9 * Math.max(1, Math.abs(rapport))) return false;
    }
    return rapport !== null;
  } catch {
    return false;
  }
}

/** « (2 ; -1) » et « (-4 ; 2) » : coordonnées proportionnelles, non nulles. */
function colineaires(a: string, b: string): boolean {
  const lire = (t: string) =>
    t
      .trim()
      .replace(/^[\p{L}→⃗\s]*(?=\()/u, "")
      .replace(/^\((.*)\)$/, "$1")
      .split(/\s*;\s*/)
      .map((x) => evaluer(x, {}));
  try {
    const u = lire(a);
    const v = lire(b);
    if (u.length !== v.length || u.length < 2 || u.every((x) => Math.abs(x) < 1e-12)) return false;
    return u.every((ui, i) => v.every((vj, j) => Math.abs(ui * vj - u[j] * v[i]) < 1e-9 * Math.max(1, Math.abs(ui * vj))));
  } catch {
    return false;
  }
}

type Intervalle = { g: string; a: string; b: string; d: string };

/** « ]-∞ ; 2] ∪ [5 ; +∞[ » → ses morceaux ; null si ce n'est pas un intervalle. */
function intervalles(t: string): Intervalle[] | null {
  const morceaux = t
    .trim()
    .replace(/^S\s*=\s*/i, "")
    .replace(/([\][])\s*[uU∪]\s*(?=[\][])/g, "$1∪")
    .split("∪");
  const lus: Intervalle[] = [];
  for (const m of morceaux) {
    const r = /^\s*([\][])(.+);(.+)([\][])\s*$/.exec(m);
    if (!r) return null;
    lus.push({ g: r[1], a: r[2].trim(), b: r[3].trim(), d: r[4] });
  }
  return lus;
}

function bornesEgales(a: string, b: string, tolerance: number): boolean {
  const infini = (s: string) => {
    const t = s.replace(/\s/g, "").replace(/[−–]/g, "-");
    return /^\+?∞$/.test(t) ? "+∞" : t === "-∞" ? "-∞" : null;
  };
  if (infini(a) || infini(b)) return infini(a) === infini(b);
  return egaux(a, b, tolerance);
}
