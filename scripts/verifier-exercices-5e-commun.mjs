// Le socle des scripts de recalcul des feuilles d'exercices de 5e (29/09/2026).
//
// ⭐ POURQUOI : dix-huit feuilles de 5e d'un coup, écrites en partie par des
// agents. Chaque script de notion ne garde que ses CALCULS (et la relecture de
// ses dessins) ; les règles de rendu apprises les 28-29/09 — qui ont chacune
// cassé une feuille — vivent ici, une seule fois :
//   · un dessin par exercice (figure ou schéma), 12 à 14 IMPRIMÉS ;
//   · aucune fin de ligne dans une chaîne "…" (guillemets appariés par ligne) ;
//   · texte NU et vrai signe moins « − » dans les dessins ;
//   · tableau() : entête et ligne de même longueur ; barres : libellés ≤ 9 ;
//   · repere() : ymin < 0, `grand` au-delà de 10 unités, 15 au plus ;
//   · toute grille : `grid-cols-1 min-w-0` ;
//   · droiteRel() : onze nombres écrits au plus, points et sauts dans le cadre ;
//   · chaque appel de dessin est RELISIBLE (arguments écrits en clair) ;
//   · 8 + 8 + 4, quatre problèmes titrés, rappels de 2 à 4 lignes ;
//   · et les contrôles de texte communs (`controlesCommuns`, classe 5e) :
//     dollars appariés, micros de la notion toutes servies, etc.
// Le script finit sur « N vérifications justes, K fausses » (exit 1 si K > 0).
//
// Usage dans un script de notion :
//   import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
//   const f = ouvrir("lib/fiches-exercices/maths-5e-<slug>.tsx", "<notionId>", ["droiteRel", "table", …]);
//   f.dit(3, "morceau exact du corrigé"); f.verif("nom", calculé, attendu); …
//   f.fin();

import fs from "node:fs";
import path from "node:path";
import { RACINE, controlesCommuns, lireFeuille, tex, D } from "./verifier-exercices-commun.mjs";

/** Les aides de `lib/fiches-exercices/figures.tsx`, reconnues d'office. */
const DESSINS_COMMUNS = ["repere", "vecteurs", "droites", "triangle", "intervalles", "venn", "arbre", "de", "roue", "billes", "tableauProba", "boite", "diagramme", "programme", "trace", "tableau", "droite", "tableauSignes", "tableauVariations"];

/** Un nombre écrit comme dans la feuille : `2{,}5`, `-3`, `1\,250`. */
export const t = (x) => tex(D(Number(x).toFixed(10)));

// `classe` (29/09 au soir) : le même socle sert la 6e — « 5e » par défaut, les
// dix-huit scripts de 5e ne changent pas.
export function ouvrir(fichier, notionId, dessinsLocaux = [], classe = "5e") {
  const src = fs.readFileSync(path.join(RACINE, fichier), "utf8");
  const feuille = lireFeuille(src);
  const DESSINS = [...new Set([...DESSINS_COMMUNS, ...dessinsLocaux])];
  let ok = 0;
  const ko = [];
  const vrai = (nom, cond, detail = "") => (cond ? ok++ : ko.push(`${nom}${detail ? " — " + detail : ""}`));
  const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
  const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
  const c = (k) => feuille.corrections[k - 1] ?? "";
  const e = (k) => feuille.enonces[k - 1] ?? "";
  const bloc = (k) => feuille.blocs[k - 1] ?? "";
  const dit = (k, morceau) => vrai(`${k}. le corrigé écrit « ${morceau} »`, c(k).includes(morceau));
  const enonceDit = (k, morceau) => vrai(`${k}. l'énoncé écrit « ${morceau} »`, e(k).includes(morceau));

  // Les constantes de couleur (`const ROUGE = "#dc2626";`) servent d'arguments.
  const constantes = { BLEU: "#2563eb", ORANGE: "#ea580c", ...Object.fromEntries([...src.matchAll(/^const ([A-Z_][A-Z0-9_]*) = "([^"]*)";/gm)].map((m) => [m[1], m[2]])) };

  /** Les appels `nom(…)` d'un texte : arguments ÉVALUÉS (brut = false) ou seulement leur place. */
  function appels(nom, texte = feuille.series, brut = false) {
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
      if (texte.slice(Math.max(0, m.index - 9), m.index) === "function ") continue;
      const corps = texte.slice(debut, j - 1);
      if (brut) {
        res.push({ index: m.index, fin: j, corps });
        continue;
      }
      try {
        res.push({ args: Function(...Object.keys(constantes), `return [${corps}]`)(...Object.values(constantes)), index: m.index, fin: j });
      } catch {
        res.push({ args: null, index: m.index, fin: j, corps });
      }
    }
    return res;
  }
  /** Les dessins `nom(…)` de l'exercice k, avec leur rôle (figure ou schéma). */
  const dessins = (nom, k) => {
    const b = bloc(k);
    return appels(nom, b).map((a) => {
      const avant = b.slice(0, a.index);
      return { ...a, role: avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema" };
    });
  };
  /** Les arguments du premier dessin `nom(…)` de l'exercice k (de ce rôle, si donné). */
  const dessin = (nom, k, role) => {
    const tous = dessins(nom, k);
    const a = role ? tous.find((x) => x.role === role) : tous[0];
    if (!a) throw new Error(`exercice ${k} : pas de ${nom}(${role ?? ""})`);
    if (!a.args) throw new Error(`exercice ${k} : ${nom}(…) illisible — écrire ses arguments en clair`);
    return a.args;
  };
  /** Exécute un bloc de recalcul ; une exception compte pour une faute (jamais un plantage muet). */
  const essai = (nom, f) => {
    try {
      f();
    } catch (err) {
      ko.push(`${nom} : ${err?.message ?? err}`);
    }
  };

  function fin() {
    const series = feuille.series;
    /* ═══ chaque appel de dessin est relisible ═══ */
    for (const nom of DESSINS) for (const a of appels(nom)) vrai(`${nom}(…) relisible (arguments en clair)`, a.args !== null, (a.corps ?? "").slice(0, 80));

    /* ═══ règles de rendu ═══ */
    const lus = (nom) => appels(nom).filter((a) => a.args);
    for (const { args: [, data] } of lus("diagramme")) if (data.length >= 4) for (const x of data) vrai(`barres : « ${x.label} » ≤ 9 signes`, x.label.length <= 9);
    for (const { args: [entete, ligne] } of lus("tableau")) vrai(`tableau(${entete[0]}) : entête et ligne de même longueur`, entete.length === ligne.length);
    for (const { args: [entete, lignes] } of lus("trace")) vrai("trace : lignes de la largeur de l'entête", lignes.every((l) => l.length === entete.length));
    for (const { args: [cadre, , , , grand] } of lus("repere")) {
      const [xmin, xmax, ymin, ymax] = cadre;
      const large = Math.max(xmax - xmin, ymax - ymin);
      vrai(`repère ${cadre} : ymin < 0, grand au-delà de 10, 15 au plus`, ymin < 0 && (large <= 10 || grand === true) && large <= 15);
    }
    for (const { args: [lignes] } of lus("programme")) vrai("programme : ni guillemet double ni antislash, 30 signes au plus", lignes.every((l) => !/["\\]/.test(l) && l.length <= 30));
    for (const { args } of lus("droiteRel")) {
      const [min, max, pas, points, opts = {}] = args;
      const nombres = opts.nombres ?? pas;
      let n = 0;
      for (let k = 0; min + k * pas <= max + 1e-9; k++) {
        const v = min + k * pas;
        if (Math.abs(v / nombres - Math.round(v / nombres)) < 1e-6) n++;
      }
      vrai(`droiteRel [${min} ; ${max}] : ${n} nombres écrits, 11 au plus`, n <= 11 && n >= 2);
      for (const p of points) vrai(`droiteRel [${min} ; ${max}] : point ${p.value} dans le cadre`, p.value >= min && p.value <= max);
      for (const s of opts.sauts ?? []) vrai(`droiteRel [${min} ; ${max}] : saut ${s.de} → ${s.vers} dans le cadre`, [s.de, s.vers].every((v) => v >= min && v <= max));
    }
    for (const { args } of lus("axeVertical")) {
      const [min, max, pas, points, fleches = []] = args;
      const n = Math.round((max - min) / pas) + 1;
      vrai(`axeVertical [${min} ; ${max}] : ${n} graduations, 14 au plus`, n <= 14);
      for (const p of points) vrai(`axeVertical : point ${p.value} dans le cadre`, p.value >= min && p.value <= max);
      for (const f of fleches) vrai(`axeVertical : flèche ${f.de} → ${f.vers} dans le cadre`, [f.de, f.vers].every((v) => v >= min && v <= max));
      // ⛔ MESURÉ LE 29/09 : « après la montée : 4 » touchait la première flèche (x = 206).
      if (fleches.length) for (const p of points) vrai(`axeVertical : « ${p.label} » s'arrête avant les flèches`, 78 + p.label.length * 8.5 <= 212);
    }
    // Texte NU et vrai signe moins dans TOUT ce qu'un dessin écrit.
    for (const nom of DESSINS)
      for (const { args } of lus(nom)) {
        const textes = [];
        const cueille = (x) => (typeof x === "string" ? textes.push(x) : Array.isArray(x) ? x.forEach(cueille) : x && typeof x === "object" ? Object.entries(x).forEach(([cle, v]) => !/^(color|couleur)$/.test(cle) && cueille(v)) : null);
        if (nom !== "programme") cueille(args);
        for (const s of textes) {
          vrai(`${nom} : texte nu, sans $ (${s.slice(0, 40)})`, !s.includes("$"));
          vrai(`${nom} : vrai signe moins « − » (${s.slice(0, 40)})`, !/(^|[\s(=;:])-\d/.test(s));
        }
      }
    src.split("\n").forEach((l, i) => {
      const tr = l.trim();
      if (tr.startsWith("//") || tr.startsWith("*") || tr.startsWith("/*")) return;
      const n = (l.replace(/\\./g, "").replace(/'"'/g, "").match(/"/g) ?? []).length;
      vrai(`ligne ${i + 1} : guillemets appariés (pas de fin de ligne dans une chaîne)`, n % 2 === 0);
    });
    for (const m of src.matchAll(/className=\{?[`"](\s*grid[^`"]*)[`"]/g)) vrai(`grille « ${m[1].trim()} » : grid-cols-1 et min-w-0 (pas de débordement à 375 px)`, /grid-cols-1/.test(m[1]) && /min-w-0/.test(m[1]));

    /* ═══ un dessin par exercice, 12 à 14 imprimés ═══ */
    let imprimes = 0, ecran = 0;
    feuille.blocs.forEach((b0, i) => {
      const coupe = b0.search(/\n\s+micros:/);
      const b = coupe > 0 ? b0.slice(0, coupe) : b0;
      const zones = appels("ecranSeulement", b, true).map((a) => [a.index, a.fin]);
      const tous = DESSINS.flatMap((nom) => appels(nom, b, true));
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
    vrai(`classe ${classe}, coach de ${classe}`, src.includes(`classe: "${classe}"`) && src.includes(`coachHref: "/coach-ia/maths?classe=${classe}"`));

    /* ═══ contrôles de texte communs ═══ */
    const v = { ok: (nom, cond, detail = "") => vrai(nom, cond, detail), titre() {} };
    controlesCommuns(v, src, { notionId, classe });

    console.log(fichier);
    console.log(`dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);
    console.log(`${ok} vérifications justes, ${ko.length} fausses`);
    ko.forEach((k) => console.log("  ✗", k));
    process.exit(ko.length ? 1 : 0);
  }

  return { src, feuille, c, e, bloc, vrai, verif, proche, dit, enonceDit, appels, dessins, dessin, essai, constantes, fin };
}
