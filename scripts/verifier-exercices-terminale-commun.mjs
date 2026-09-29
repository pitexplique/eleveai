// Le socle des scripts de recalcul des feuilles de TERMINALE SPÉ (29/09/2026).
//
// ⭐ POURQUOI : dix-huit feuilles écrites en une journée, par plusieurs mains.
// Tout ce qui ne dépend pas des maths de la notion vit ici — la lecture des
// appels de dessin, les règles de rendu mesurées (chacune a déjà cassé une
// feuille), la structure 8 + 8 + 4, « un dessin par exercice, 12 à 14
// imprimés », les contrôles de texte communs (`controlesCommuns`). Le script
// d'une notion ne garde que ses CALCULS, faits par un autre chemin que le
// corrigé.
//
// Usage dans un script de notion :
//   const F = feuilleTerminale({ fichier: "lib/fiches-exercices/maths-terminale-<slug>.tsx", notion: "<notionId>" });
//   F.verif("1. u(3)", calcul, 2.5);  F.dit(1, "= 2{,}5$");  const m = F.termes(1);
//   F.fin();   // règles, structure, rapport — exit 1 s'il y a une fausse
//
// Les dessins sont relus en évaluant leurs arguments (Function) dans un
// contexte qui connaît les couleurs, `termes`, `echantillon`, les constantes
// `const NOM = "…"` du fichier, et ce que le script ajoute par `contexte`.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { RACINE, controlesCommuns, lireFeuille, tex, D } from "./verifier-exercices-commun.mjs";

export { tex, D };

/** Les aides de dessin de `figures.tsx` (et les SVG maison qu'une feuille déclare en plus). */
const DESSINS = [
  "repere", "tableau", "tableauSignes", "tableauVariations", "vecteurs", "droites", "triangle", "arbre", "diagramme",
  "boite", "programme", "trace", "intervalles", "venn", "roue", "billes", "tableauProba", "droite", "de",
];

/* ── Numérique : un AUTRE chemin que le corrigé ─────────────────────────── */

/** Intégrale par Simpson (n pair). */
export function integrale(f, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}
/** Dérivée numérique centrée. */
export const derivee = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
/** Coefficient binomial exact (BigInt → Number). */
export function binome(n, k) {
  if (k < 0 || k > n) return 0;
  let r = 1n;
  for (let i = 1n; i <= BigInt(k); i++) r = (r * (BigInt(n) - i + 1n)) / i;
  return Number(r);
}
/** P(X = k) pour X ~ B(n, p). */
export const binom = (n, k, p) => binome(n, k) * p ** k * (1 - p) ** (n - k);
/** P(X ≤ k). */
export const binomCumul = (n, k, p) => Array.from({ length: k + 1 }, (_, i) => binom(n, i, p)).reduce((s, x) => s + x, 0);
/** Une racine de f sur [a, b] par dichotomie (f(a) et f(b) de signes contraires). */
export function dichotomie(f, a, b, eps = 1e-12) {
  let fa = f(a);
  for (let i = 0; i < 200 && b - a > eps; i++) {
    const m = (a + b) / 2;
    const fm = f(m);
    if (fa * fm <= 0) b = m;
    else [a, fa] = [m, fm];
  }
  return (a + b) / 2;
}

/** Exécute un programme Python (lignes du `programme(…)`) suivi d'instructions, et renvoie la sortie. */
export function executerPython(lignes, suite = "") {
  const code = [...lignes, "", suite].join("\n");
  for (const exe of ["python", "python3", "py"]) {
    const r = spawnSync(exe, ["-c", code], { encoding: "utf8" });
    if (!r.error) {
      if (r.status !== 0) throw new Error(`Python : ${r.stderr.trim().split("\n").pop()}`);
      return r.stdout.trim();
    }
  }
  return null; // pas de Python : le script le dit, sans échouer
}

/* ── La feuille ─────────────────────────────────────────────────────────── */

export function feuilleTerminale({ fichier, notion, contexte = {}, dessinsEnPlus = [] }) {
  const src = fs.readFileSync(path.join(RACINE, fichier), "utf8");
  const feuille = lireFeuille(src);
  let ok = 0;
  const ko = [];
  const avertissements = [];
  const vrai = (nom, cond, detail = "") => (cond ? ok++ : ko.push(`${nom}${detail ? " — " + detail : ""}`));
  const proche = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(b));
  const verif = (nom, a, b, eps = 1e-9) => vrai(nom, proche(a, b, eps), `${a} ≠ ${b}`);
  /** Égalité à la précision d'un arrondi affiché (0,01 → tolérance 0,005). */
  const arrondi = (nom, lu, exact, pas = 0.01) => vrai(nom, Math.abs(lu - exact) <= pas / 2 + 1e-12, `lu ${lu}, exact ${exact}`);
  const c = (k) => feuille.corrections[k - 1] ?? "";
  const e = (k) => feuille.enonces[k - 1] ?? "";
  const bloc = (k) => feuille.blocs[k - 1] ?? "";
  const dit = (k, morceau) => vrai(`${k}. le corrigé écrit « ${morceau} »`, c(k).includes(morceau));
  const enonceDit = (k, morceau) => vrai(`${k}. l'énoncé écrit « ${morceau} »`, e(k).includes(morceau));

  const constantes = Object.fromEntries([...src.matchAll(/^const ([A-Z_][A-Z0-9_]*) = "([^"]*)";/gm)].map((m) => [m[1], m[2]]));
  const echantillon = (f, de, a, yMin = -Infinity, yMax = Infinity) =>
    Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
      const x = de + k * 0.05;
      return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000];
    }).filter(([, y]) => y >= yMin && y <= yMax);
  const ctx = {
    BLEU: "#2563eb", ORANGE: "#ea580c", VERT: "#16a34a", GRIS: "#94a3b8", ROUGE: "#dc2626",
    termes: (n0, valeurs) => valeurs.map((y, i) => ({ x: n0 + i, y, label: "" })),
    echantillon,
    ecranSeulement: (x) => x,
    ...constantes,
    ...contexte,
  };
  // Les aides de dessin elles-mêmes, pour qu'un appel IMBRIQUÉ s'évalue : elles renvoient leurs arguments.
  for (const nom of [...DESSINS, ...dessinsEnPlus]) if (!(nom in ctx)) ctx[nom] = (...args) => ({ dessin: nom, args });

  /** Les appels `nom(…)` d'un texte : arguments évalués, ou positions seules (`brut`). */
  function appels(nom, texte = src, brut = false) {
    const res = [];
    const re = new RegExp(`(?<![\\w.])${nom}\\(`, "g");
    let m;
    while ((m = re.exec(texte))) {
      const debut = m.index + m[0].length;
      let prof = 1, j = debut, chaine = null;
      for (; j < texte.length && prof > 0; j++) {
        const ch = texte[j];
        if (chaine) {
          if (ch === "\\") j++;
          else if (ch === chaine) chaine = null;
          continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") chaine = ch;
        else if (ch === "(") prof++;
        else if (ch === ")") prof--;
      }
      const avant = texte.slice(Math.max(0, m.index - 12), m.index);
      if (/(function |const )$/.test(avant) || /=\s*$/.test(texte.slice(Math.max(0, m.index - 3), m.index))) continue;
      const corps = texte.slice(debut, j - 1);
      if (!corps.trim()) continue;
      if (brut) {
        res.push({ index: m.index, fin: j });
        continue;
      }
      try {
        res.push({ args: Function(...Object.keys(ctx), `return [${corps}]`)(...Object.values(ctx)), index: m.index, fin: j });
      } catch (err) {
        res.push({ args: null, erreur: String(err?.message ?? err), index: m.index, fin: j });
      }
    }
    return res;
  }
  /** Les dessins `nom` de l'exercice k, avec leur rôle (figure ou schéma). */
  const dessins = (nom, k) => {
    const b = bloc(k);
    return appels(nom, b).map((a) => {
      const avant = b.slice(0, a.index);
      return { ...a, role: avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema" };
    });
  };
  const dessin = (nom, k, role) => {
    const tous = dessins(nom, k);
    const a = role ? tous.find((x) => x.role === role) : tous[0];
    if (!a) throw new Error(`exercice ${k} : pas de ${nom}(${role ?? ""})`);
    if (!a.args) throw new Error(`exercice ${k} : ${nom}(…) illisible — ${a.erreur}`);
    return a.args;
  };
  /** Les points marqués du `repere` de l'exercice k : [{ x, y }]. */
  const termes = (k, role) => dessin("repere", k, role)[2] ?? [];
  /** Les courbes du `repere` de l'exercice k. */
  const courbes = (k, role) => dessin("repere", k, role)[1];
  /** Le `tableau(entete, ligne)` de l'exercice k, ligne en nombres quand c'en sont. */
  const nombre = (s) => {
    const t = String(s).replace(/€/g, "").replace(/\s/g, "").replace(",", ".").replace(/−/g, "-");
    const f = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(t);
    return f ? Number(f[1]) / Number(f[2]) : Number(t);
  };
  const tableauDe = (k, role) => {
    const [entete, ligne] = dessin("tableau", k, role);
    return { entete, ligne, nombres: ligne.slice(1).map(nombre), en: entete.slice(1).map(nombre) };
  };
  /** Chaque point marqué (à partir de l'indice `de`) est-il la valeur de u(x), arrondie au pas ? */
  const pointsSur = (nom, points, u, pas = 0.01) => {
    const fautes = points.filter((p) => !(Math.abs(p.y - u(p.x)) <= pas / 2 + 1e-9));
    vrai(`${nom} : ${points.length} points sur leur formule (arrondi ${pas})`, points.length > 0 && fautes.length === 0, fautes.slice(0, 3).map((p) => `(${p.x} ; ${p.y}) au lieu de ${u(p.x)}`).join(" ; "));
  };

  /** Les règles de rendu, la structure, les contrôles communs — puis le rapport. */
  function fin() {
    const series = feuille.series;

    /* ═══ règles de rendu ═══ */
    for (const a of appels("repere", series)) {
      if (!a.args) {
        vrai("repere(…) lisible par le script", false, a.erreur);
        continue;
      }
      const [cadre, courbesR, marques = [], , grand] = a.args;
      const [xmin, xmax, ymin, ymax] = cadre;
      const large = Math.max(xmax - xmin, ymax - ymin);
      vrai(`repère ${cadre} : ymin < 0, « grand » au-delà de 10 unités, 15 au plus`, ymin < 0 && (large <= 10 || grand === true) && large <= 15);
      for (const p of marques) vrai(`repère ${cadre} : point (${p.x} ; ${p.y}) dans le cadre`, p.x >= xmin && p.x <= xmax && p.y >= ymin && p.y <= ymax);
      for (const cb of courbesR) if (cb.pts) vrai(`repère ${cadre} : ligne brisée non vide dans le cadre`, cb.pts.some(([x]) => x >= xmin && x <= xmax));
    }
    for (const a of appels("tableau", series)) {
      if (!a.args) { vrai("tableau(…) lisible", false, a.erreur); continue; }
      const [entete, ligne] = a.args;
      vrai(`tableau(${entete[0]}) : entête et ligne de même longueur`, entete.length === ligne.length);
      for (const s of [...entete, ...ligne].map(String)) vrai(`tableau : texte nu, vrai signe moins (${s})`, !s.includes("$") && !/(^|\s)-\d/.test(s));
    }
    for (const a of appels("tableauVariations", series)) {
      if (!a.args) { vrai("tableauVariations(…) lisible", false, a.erreur); continue; }
      const [bornes, valeurs] = a.args;
      vrai(`tableauVariations : autant de bornes que de valeurs (${bornes.length}/${valeurs.length})`, bornes.length === valeurs.length);
      vrai("tableauVariations : quatre bornes au plus", bornes.length <= 4);
      for (const s of [...bornes, ...valeurs].map(String)) {
        vrai(`tableauVariations : « ${s} » sans $ ni tiret-moins`, !s.includes("$") && !/(^|\s)-(\d|∞)/.test(s));
        if (/∞/.test(s)) vrai(`tableauVariations : infini écrit « +∞ » ou « −∞ » (${s})`, s === "+∞" || s === "−∞");
      }
    }
    for (const a of appels("tableauSignes", series)) {
      if (!a.args) { vrai("tableauSignes(…) lisible", false, a.erreur); continue; }
      const [bornes, lignes] = a.args;
      for (const [label, signes, marques = []] of lignes) {
        vrai(`tableauSignes « ${label} » : ${bornes.length - 1} signes`, signes.length === bornes.length - 1);
        vrai(`tableauSignes « ${label} » : ${bornes.length - 2} marques`, marques.length === bornes.length - 2);
      }
    }
    for (const a of appels("diagramme", series)) {
      if (!a.args) { vrai("diagramme(…) lisible", false, a.erreur); continue; }
      const data = a.args[1];
      if (data.length >= 4) for (const x of data) vrai(`barres : « ${x.label} » ≤ 9 signes`, x.label.length <= 9);
    }
    for (const a of appels("trace", series)) if (a.args) vrai("trace : lignes de la largeur de l'entête", a.args[1].every((l) => l.length === a.args[0].length));
    for (const a of appels("programme", series)) {
      if (!a.args) { vrai("programme(…) lisible", false, a.erreur); continue; }
      const lignes = a.args[0];
      vrai("programme : pas de guillemet double ni d'antislash", lignes.every((l) => !/["\\]/.test(l)));
      vrai(`programme : lignes de 30 signes au plus (${Math.max(...lignes.map((l) => l.length))})`, lignes.every((l) => l.length <= 30));
    }
    for (const m of series.matchAll(/(?:label|proba): "([^"]*)"/g)) {
      vrai(`étiquette SVG sans $ : ${m[1]}`, !m[1].includes("$"));
      vrai(`étiquette SVG : vrai signe moins (${m[1]})`, !/(^|[\s(])-\d/.test(m[1]));
    }
    // ⛔ 12 chaînes cassées le 28/09 par une vraie fin de ligne : vues par tsc seulement.
    src.split("\n").forEach((l, i) => {
      const tr = l.trim();
      if (tr.startsWith("//") || tr.startsWith("*") || tr.startsWith("/*")) return;
      const n = (l.replace(/\\./g, "").replace(/'[^']*'/g, "").replace(/`[^`]*`/g, "").match(/"/g) ?? []).length;
      vrai(`ligne ${i + 1} : guillemets appariés (pas de fin de ligne dans une chaîne)`, n % 2 === 0);
    });
    // ⛔ 375 px : une grille « auto » prend la largeur minimale de ses enfants et fait déborder la page.
    for (const m of src.matchAll(/className="(grid[^"]*)"/g)) vrai(`grille « ${m[1]} » : grid-cols-1 et min-w-0`, /grid-cols-1/.test(m[1]) && /min-w-0/.test(m[1]));
    // ⚠️ Une formule d'un seul tenant trop longue déborde à 375 px : averti, pas bloquant (le rendu tranche).
    for (const t of feuille.textes) {
      for (const [, f] of t.matchAll(/\$([^$]+)\$/g)) {
        const visible = f
          .replace(/\\(dfrac|frac)\{([^{}]*)\}\{([^{}]*)\}/g, (_, __, a, b) => (a.length > b.length ? a : b))
          .replace(/\\(left|right|displaystyle|,|;|!|quad)/g, "")
          .replace(/\\[a-zA-Z]+/g, "x")
          .replace(/[{}\s]/g, "");
        if (visible.length > 34) avertissements.push(`formule longue (${visible.length}) : ${f.slice(0, 70)}`);
      }
    }

    /* ═══ un dessin par exercice, 12 à 14 imprimés ═══ */
    let imprimes = 0, ecran = 0;
    const noms = [...DESSINS, ...dessinsEnPlus];
    feuille.blocs.forEach((b0, i) => {
      const b = b0.slice(0, b0.search(/\n\s+micros:/) + 1 || undefined);
      const zones = appels("ecranSeulement", b, true).map((a) => [a.index, a.fin]);
      const tous = noms.flatMap((nom) => appels(nom, b, true));
      vrai(`${i + 1}. au moins un dessin (figure ou schéma)`, tous.length > 0 && /\b(figure|schema):/.test(b));
      for (const d of tous) (zones.some(([a, f]) => d.index > a && d.index < f) ? ecran++ : imprimes++);
      vrai(`${i + 1}. micros renseignées`, /micros: \["/.test(b0));
    });
    vrai(`12 à 14 dessins imprimés (${imprimes})`, imprimes >= 12 && imprimes <= 14);

    /* ═══ structure ═══ */
    const niv3 = series.split(/niveau: 3,/)[1] ?? "";
    vrai("★★★ : quatre problèmes titrés", (niv3.match(/^\s+titre: "/gm) ?? []).length === 5);
    for (const [, r] of series.matchAll(/rappel: \[([\s\S]*?)\n\s+\],/g)) {
      const n = (r.match(/^\s+"/gm) ?? []).length;
      vrai(`rappel de 2 à 4 lignes (${n})`, n >= 2 && n <= 4);
    }
    const nbEx = (src.match(/correction:/g) || []).length;
    vrai(`exactement 20 « correction: » (${nbEx})`, nbEx === 20);
    vrai("fichesCours vide (on n'écrit aucune fiche de cours)", /fichesCours: \[\]/.test(src));
    vrai("classe terminale-spe", /classe: "terminale-spe"/.test(src));
    vrai("coach de terminale", src.includes('coachHref: "/coach-ia/maths?classe=terminale-spe"'));

    /* ═══ contrôles de texte communs ═══ */
    const v = { ok: (nom, cond, detail = "") => vrai(nom, cond, detail), titre() {} };
    controlesCommuns(v, src, { notionId: notion, classe: "terminale-spe" });

    console.log(fichier);
    console.log(`dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);
    for (const a of avertissements) console.log("  ⚠️", a);
    console.log(`${ok} vérifications justes, ${ko.length} fausses`);
    ko.forEach((k) => console.log("  ✗", k));
    process.exit(ko.length ? 1 : 0);
  }

  return {
    src, feuille, c, e, bloc, vrai, verif, proche, arrondi, dit, enonceDit, appels, dessins, dessin, termes, courbes,
    tableauDe, nombre, pointsSur, fin, ctx,
  };
}
