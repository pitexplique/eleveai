// ─── La saisie d'une réponse sur une fiche d'exercices ─────────────────────────
// Un prof (29/10/2026) : l'élève doit pouvoir ÉCRIRE sa réponse à droite de
// l'exercice et la VALIDER sans voir la correction. Frédéric : « il doit avoir
// un moyen de rentrer exponentielles etc., donc un clavier maths ».
//
// L'élève tape au clavier ordinaire ou aux touches du clavier maths, dans une
// notation « calculatrice » : e^(2x), ln(3), √(5), (x+1)/(x-1), x². Ce fichier
// donne les touches et traduit cette saisie en LaTeX pour l'APERÇU — l'élève
// voit e^{2x} écrit comme au tableau, et sait que c'est bien ce qu'il voulait.
// La vérification, elle, se fait côté serveur sur le texte tapé.

/** Une touche : ce qu'elle affiche, ce qu'elle insère, où se pose le curseur. */
export type ToucheMaths = {
  label: string;
  inserer: string;
  /** Position du curseur dans `inserer` après l'insertion (par défaut : à la fin). */
  curseur?: number;
  titre: string;
  /** La touche apparaît à partir de ce palier : 1 = jusqu'en 5e, 2 = 4e-3e, 3 = lycée. */
  des?: 1 | 2 | 3;
};

// ⭐ UN CLAVIER À LA TAILLE DE LA CLASSE (29/10/2026) : un élève de 6e qui lit
// difficilement n'a que faire de eˣ, ln ou ∪ — ces touches l'encombrent.
export const TOUCHES_MATHS: ToucheMaths[] = [
  { label: "eˣ", inserer: "e^()", curseur: 3, titre: "Exponentielle : e^(…)", des: 3 },
  { label: "ln", inserer: "ln()", curseur: 3, titre: "Logarithme népérien", des: 3 },
  { label: "√", inserer: "√()", curseur: 2, titre: "Racine carrée", des: 2 },
  { label: "xⁿ", inserer: "^()", curseur: 2, titre: "Puissance", des: 2 },
  { label: "x²", inserer: "²", titre: "Au carré", des: 2 },
  { label: "a⁄b", inserer: "()/()", curseur: 1, titre: "Fraction" },
  { label: "( )", inserer: "()", curseur: 1, titre: "Parenthèses" },
  { label: "x", inserer: "x", titre: "La lettre x" },
  { label: "×", inserer: "×", titre: "Multiplier" },
  { label: "÷", inserer: "÷", titre: "Diviser" },
  { label: "π", inserer: "π", titre: "Pi" },
  { label: "≤", inserer: "≤", titre: "Inférieur ou égal" },
  { label: "≥", inserer: "≥", titre: "Supérieur ou égal" },
  { label: "≠", inserer: "≠", titre: "Différent de", des: 2 },
  { label: "≈", inserer: "≈", titre: "Environ égal" },
  { label: "°", inserer: "°", titre: "Degré" },
  { label: ";", inserer: " ; ", titre: "Séparer plusieurs réponses" },
  { label: "∞", inserer: "∞", titre: "Infini", des: 3 },
  { label: "[ ]", inserer: "[ ; ]", curseur: 1, titre: "Intervalle", des: 3 },
  { label: "∪", inserer: " ∪ ", titre: "Union", des: 3 },
];

/** Les touches d'une classe (« 6e », « 3e », « 1re-spe », « cm2 »…). */
export function touchesPourClasse(classe: string): ToucheMaths[] {
  const palier = /^(cp|ce|cm|6e|5e)/.test(classe) ? 1 : /^(4e|3e)/.test(classe) ? 2 : 3;
  return TOUCHES_MATHS.filter((t) => (t.des ?? 1) <= palier);
}

const FONCTIONS = new Set(["ln", "exp", "log", "cos", "sin", "tan", "lim"]);

const SYMBOLES: Record<string, string> = {
  "×": "\\times ",
  "*": "\\times ",
  "÷": "\\div ",
  "≤": "\\leq ",
  "≥": "\\geq ",
  "≠": "\\neq ",
  "≈": "\\approx ",
  "π": "\\pi ",
  "∞": "\\infty ",
  "∪": "\\cup ",
  "∩": "\\cap ",
  "²": "^{2}",
  "³": "^{3}",
  "{": "\\{",
  "}": "\\}",
  "%": "\\%",
  "#": "\\#",
  "&": "\\&",
  "_": "\\_",
  "\\": "\\backslash ",
};

/** Un morceau lu : son LaTeX, et son intérieur nu quand c'est un groupe ( … ). */
type Atome = { latex: string; nu: string; espace?: boolean };

function lireLigne(src: string): string {
  let i = 0;

  function atomes(fin: string | null): Atome[] {
    const liste: Atome[] = [];
    while (i < src.length) {
      const c = src[i];
      if (fin !== null && c === fin) return liste;
      if (c === "(") {
        i++;
        const dedans = assembler(atomes(")"));
        if (src[i] === ")") i++;
        liste.push({ latex: `\\left(${dedans}\\right)`, nu: dedans });
      } else if (/[0-9]/.test(c)) {
        let n = "";
        while (i < src.length && /[0-9.,]/.test(src[i])) n += src[i++];
        const l = n.replace(/,/g, "{,}");
        liste.push({ latex: l, nu: l });
      } else if (/\p{L}/u.test(c) && c !== "π") {
        let mot = "";
        while (i < src.length && /\p{L}/u.test(src[i]) && src[i] !== "π") mot += src[i++];
        if (FONCTIONS.has(mot)) liste.push({ latex: `\\${mot} `, nu: `\\${mot} ` });
        else if (mot.length === 1 && /[a-zA-Z]/.test(mot)) liste.push({ latex: mot, nu: mot });
        else liste.push({ latex: `\\text{${mot}}`, nu: `\\text{${mot}}` });
      } else if (c === " ") {
        i++;
        liste.push({ latex: "\\ ", nu: "\\ ", espace: true });
      } else {
        i++;
        const l = SYMBOLES[c] ?? c;
        liste.push({ latex: l, nu: l });
      }
    }
    return liste;
  }

  // Les opérateurs qui prennent l'atome SUIVANT (^, √) puis la fraction, qui
  // prend celui d'avant et celui d'après.
  function assembler(liste: Atome[]): string {
    const etape: Atome[] = [];
    for (let k = 0; k < liste.length; k++) {
      const a = liste[k];
      const suivant = liste[k + 1];
      if ((a.latex === "^" || a.latex === "√") && suivant && !suivant.espace) {
        k++;
        const l = a.latex === "^" ? `^{${suivant.nu}}` : `\\sqrt{${suivant.nu}}`;
        etape.push({ latex: l, nu: l });
      } else etape.push(a);
    }
    const sortie: Atome[] = [];
    for (let k = 0; k < etape.length; k++) {
      const a = etape[k];
      const avant = sortie[sortie.length - 1];
      const apres = etape[k + 1];
      if (a.latex === "/" && avant && !avant.espace && apres && !apres.espace) {
        sortie.pop();
        k++;
        const l = `\\dfrac{${avant.nu}}{${apres.nu}}`;
        sortie.push({ latex: l, nu: l });
      } else sortie.push(a);
    }
    return sortie.map((a) => a.latex).join("");
  }

  return assembler(atomes(null));
}

/** La saisie de l'élève en LaTeX, une ligne de saisie par ligne d'aperçu. */
export function saisieEnLatex(saisie: string): string[] {
  return saisie
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim().length > 0)
    .map(lireLigne);
}
