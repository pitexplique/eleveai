// Le socle des scripts de recalcul des quatre feuilles « Modélisation
// quadratique » de première sans spé (28/09/2026) : quad-parabole,
// quad-sommet-axe, quad-variations, quad-racines-signe.
//
// Chaque script de feuille ne garde que ses CALCULS (recalcul indépendant de
// chaque résultat annoncé, et des données de ses dessins) ; ce module fait le
// reste, identique d'une feuille à l'autre :
//  - il RELIT chaque `figure:` et `schema:` du source et l'évalue avec des
//    doublures des aides (parabole, tableauVariations, tableauSignes, tableau,
//    diagramme, droite, intervalles, ecranSeulement, et) ;
//  - il contrôle les RÈGLES DE RENDU mesurées à 375 px : ymin < 0, 15 unités
//    au plus, `grand` au-delà de 10, étiquettes nues et courtes qui ne tombent
//    ni sur une graduation ni sur un autre point, axe de symétrie au bon
//    endroit, sommet dans le cadre, tableaux de signes refaits case par case,
//    10 à 14 dessins imprimés, jamais le même dessin dans l'énoncé et le corrigé ;
//  - il joue les contrôles communs (`verifier-exercices-commun.mjs`) : 20
//    corrigés, 8 + 8 + 4, dollars appariés, pas de LaTeX hors formule, micros
//    connues, toutes couvertes, aucune d'une autre notion ;
//  - il vérifie l'en-tête « Micro-compétences : … N/N » et l'absence de tout
//    discriminant (hors programme en première sans spé).
// Il finit sur « N vérifications justes, K fausses » et sort en 1 si K > 0.

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, evalTex, Q, egal } from "./verifier-exercices-commun.mjs";

const AIDES = ["parabole", "tableauVariations", "tableauSignes", "tableau", "diagramme", "droite", "intervalles", "ecranSeulement", "et"];

export function lancerQuad({ nom, fichier, notionId, calculs }) {
  const src = fs.readFileSync(path.join(RACINE, fichier), "utf8");
  let ok = 0;
  const ko = [];
  const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
  const verif = (quoi, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${quoi} : ${a} ≠ ${b}`));
  const vrai = (quoi, cond) => (cond ? ok++ : ko.push(`${quoi} : faux`));

  const feuille = lireFeuille(src);
  const c = (k) => feuille.corrections[k - 1] ?? "";
  const e = (k) => feuille.enonces[k - 1] ?? "";
  /** Le résultat est-il ÉCRIT dans le corrigé (antislashs simples, comme à l'écran) ? */
  const dit = (k, t) => vrai(`${k}. le corrigé écrit « ${t} »`, c(k).includes(t));
  const ditEnonce = (k, t) => vrai(`${k}. l'énoncé écrit « ${t} »`, e(k).includes(t));
  /** « a = b = c » écrit tel quel dans le corrigé k, et tous les membres égaux,
   *  recalculés en fractions exactes par la lecture LaTeX du module commun. */
  const egalites = (k, texte) => {
    let tous = false;
    try {
      const vals = texte.split(" = ").map((m) => evalTex(m, Q(0)));
      tous = vals.every((x) => egal(x, vals[0]));
    } catch (err) {
      ko.push(`${k}. ${texte} illisible : ${err.message}`);
      return;
    }
    vrai(`${k}. ${texte} (membres égaux : ${tous} ; écrit : ${c(k).includes(texte)})`, tous && c(k).includes(texte));
  };

  /* ── Les dessins, relus et évalués ─────────────────────────────────────── */
  const doublure = (type) => (...args) => ({ type, args });
  const aplatir = (d, ecran = false) =>
    d.type === "ecranSeulement" ? aplatir(d.args[0], true) : d.type === "et" ? d.args.flatMap((x) => aplatir(x, ecran)) : [{ ...d, ecran }];
  const S = {};
  const dessins = [];
  for (const m of src.matchAll(/\n\s+(schema|figure): /g)) {
    let i = m.index + m[0].length;
    const debut = i;
    let prof = 0;
    let chaine = null;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (chaine) {
        if (ch === "\\") i++;
        else if (ch === chaine) chaine = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") chaine = ch;
      else if ("([{".includes(ch)) prof++;
      else if (")]}".includes(ch)) prof--;
      else if (ch === "," && prof === 0) break;
    }
    const numero = (src.slice(0, m.index).match(/\benonce:/g) || []).length;
    const role = m[1];
    const fn = new Function(...AIDES, "ORANGE", "BLEU", "VERT", `return (${src.slice(debut, i)});`);
    const valeur = fn(...AIDES.map(doublure), "#ea580c", "#2563eb", "#16a34a");
    S[numero] ??= { figure: [], schema: [] };
    for (const d of aplatir(valeur)) {
      S[numero][role].push(d);
      dessins.push({ ...d, numero, role });
    }
  }
  /** Le i-ème dessin de ce type, dans ce rôle, pour l'exercice n. */
  const dessin = (n, role, type, i = 0) => {
    const d = (S[n]?.[role] ?? []).filter((x) => x.type === type)[i];
    if (!d) throw new Error(`exercice ${n} : pas de ${type} n° ${i + 1} en ${role}`);
    return d;
  };
  /** La fonction d'une courbe `q` d'un repère. */
  const fq = (q) => (x) => q[0] * x * x + q[1] * x + q[2];
  /** La i-ème courbe du repère de l'exercice n est-elle la fonction F (21 abscisses) ? */
  const courbeEst = (n, role, i, F, quoi = "") => {
    const q = dessin(n, role, "parabole").args[1][i].q;
    const g = fq(q);
    const [x0, x1] = dessin(n, role, "parabole").args[0];
    const faux = Array.from({ length: 21 }, (_, k) => x0 + ((x1 - x0) * k) / 20).find((x) => !proche(g(x), F(x)));
    vrai(`${n}. la courbe ${i + 1} du repère (${role}) est ${quoi || "celle du modèle"}${faux === undefined ? "" : ` — diffère en x = ${faux}`}`, faux === undefined);
  };
  /** Le tableau de variations de l'exercice n a-t-il ces bornes, et les valeurs de F ? */
  const variationsDe = (n, role, F, bornes) => {
    const t = dessin(n, role, "tableauVariations");
    const nb = (v) => (typeof v === "number" ? v : Number(String(v).replace(/−/g, "-").replace(",", ".")));
    const b = t.args[0].map(nb);
    vrai(`${n}. tableau de variations : bornes ${b.join(" ; ")}`, b.length === bornes.length && b.every((x, k) => proche(x, bornes[k])));
    t.args[1].forEach((v, k) => verif(`${n}. tableau de variations : valeur en ${b[k]}`, nb(v), F(b[k])));
    // Le sens : une parabole ne change de sens qu'au sommet. Les flèches du
    // canvas se déduisent des valeurs ; on vérifie que F est bien monotone
    // sur chaque morceau (grille de 40 pas).
    for (let k = 0; k + 1 < b.length; k++) {
      const monte = F(b[k + 1]) > F(b[k]);
      let prec = F(b[k]);
      let bon = true;
      for (let j = 1; j <= 40; j++) {
        const y = F(b[k] + ((b[k + 1] - b[k]) * j) / 40);
        if (monte ? y < prec - 1e-12 : y > prec + 1e-12) bon = false;
        prec = y;
      }
      vrai(`${n}. tableau de variations : F monotone sur [${b[k]} ; ${b[k + 1]}]`, bon);
    }
  };

  try {
    calculs({ S, dessin, fq, courbeEst, variationsDe, verif, vrai, dit, ditEnonce, egalites, c, e, proche });
  } catch (err) {
    ko.push(`le recalcul plante : ${err.message}`);
  }

  /* ── Règles de rendu ───────────────────────────────────────────────────── */
  const nu = (quoi, texte) => {
    vrai(`${quoi} : texte nu, sans $`, !String(texte).includes("$"));
    if (typeof texte === "number") return; // l'aide l'écrit elle-même avec « − »
    vrai(`${quoi} : vrai signe moins`, !/(^|[\s(])-\d/.test(String(texte)));
  };
  const nombre = (s) => {
    if (typeof s === "number") return s;
    const t = s.replace(/\$/g, "").replace(/−/g, "-").replace(/\{,\}/g, ".").replace(/,/g, ".").replace(/\s/g, "");
    if (t === "-∞") return -Infinity;
    if (t === "+∞") return Infinity;
    const f = t.match(/^(-?)\\dfrac\{(\d+)\}\{(\d+)\}$/);
    if (f) return (f[1] ? -1 : 1) * (+f[2] / +f[3]);
    return +t;
  };
  /** Un libellé `$…$` de facteur en fonction JS, ou null (« $f(x)$ » : la ligne du produit). */
  const expression = (label, variable) => {
    const t = label
      .replace(/\$/g, "")
      .replace(/−/g, "-")
      .replace(/\{,\}/g, ".")
      .replace(new RegExp(variable, "g"), "V")
      .replace(/(\d|\))\s*(?=[V(])/g, "$1*")
      .replace(/V\s*(?=\()/g, "V*");
    try {
      const f = new Function("V", `return ${t};`);
      return Number.isFinite(f(1.2345)) ? f : null;
    } catch {
      return null;
    }
  };

  let imprimes = 0;
  for (const d of dessins) {
    const ou = `ex ${d.numero} (${d.role}, ${d.type})`;
    if (!d.ecran) imprimes++;
    if (d.type === "parabole") {
      const [cadre, courbes, marques = [], options = {}] = d.args;
      const [xmin, xmax, ymin, ymax] = cadre;
      const grand = options.grand === true;
      vrai(`${ou} : cadre en entiers`, cadre.every(Number.isInteger));
      vrai(`${ou} : ymin < 0`, ymin < 0);
      vrai(`${ou} : 15 unités au plus par axe`, xmax - xmin <= 15 && ymax - ymin <= 15);
      vrai(`${ou} : plus de 10 unités sur un axe, donc grand = true`, grand || (xmax - xmin <= 10 && ymax - ymin <= 10));
      for (const co of courbes) {
        vrai(`${ou} : courbe écrite en clair (q ou pts)`, Array.isArray(co.q) || Array.isArray(co.pts));
        if (co.q && co.q[0] !== 0) {
          // Le sommet, retrouvé par la symétrie : f(x) = c pour x = 0 et x = −b/a.
          const xs = (0 + -co.q[1] / co.q[0]) / 2;
          const ys = fq(co.q)(xs);
          vrai(`${ou} : le sommet (${xs} ; ${ys}) de la parabole est dans le cadre`, xs >= xmin && xs <= xmax && ys >= ymin && ys <= ymax);
        }
      }
      const premiere = courbes.find((co) => co.q && co.q[0] !== 0);
      if (options.axe !== undefined) verif(`${ou} : l'axe tracé passe par le sommet`, options.axe, (0 + -premiere.q[1] / premiere.q[0]) / 2);
      if (options.horizontale !== undefined) vrai(`${ou} : horizontale dans le cadre`, options.horizontale > ymin && options.horizontale < ymax);
      // Les pixels, comme le canvas les calcule.
      const W = grand ? 272 : 215;
      const H = grand ? 272 : 200;
      const sx = (x) => ((x - xmin) / (xmax - xmin)) * W;
      const sy = (y) => H - ((y - ymin) / (ymax - ymin)) * H;
      const xAxe = ymin <= 0 && ymax >= 0 ? sy(0) : H;
      const yAxe = xmin <= 0 && xmax >= 0 ? sx(0) : 0;
      const boites = [];
      const pasX = Math.max(1, Math.ceil(22 / (W / (xmax - xmin))));
      for (let x = xmin; x <= xmax; x++) {
        if (!(x === 0 || (x - xmin) % pasX === 0)) continue;
        const cx = Math.min(W - 10, Math.max(10, sx(x))) + (x === 0 && sx(x) > 10 ? 8 : 0);
        const l = 7 * String(x).length;
        boites.push({ quoi: `graduation ${x}`, x0: cx - l / 2, x1: cx + l / 2, y0: xAxe + 7, y1: xAxe + 20 });
      }
      const pasY = Math.max(1, Math.ceil(16 / (H / (ymax - ymin))));
      for (let y = ymin; y <= ymax; y++) {
        if (y === 0 || (y - ymin) % pasY !== 0) continue;
        const cy = Math.min(H - 7, Math.max(7, sy(y)));
        const l = 7 * String(y).length;
        const gauche = yAxe > 26;
        boites.push({ quoi: `graduation ${y}`, x0: gauche ? yAxe - 6 - l : yAxe + 6, x1: gauche ? yAxe - 6 : yAxe + 6 + l, y0: cy - 6, y1: cy + 6 });
      }
      for (const p of marques) {
        const quoi = `${ou} : point (${p.x} ; ${p.y})`;
        vrai(`${quoi} dans le cadre`, p.x >= xmin && p.x <= xmax && p.y >= ymin && p.y <= ymax);
        const surQ = courbes.some((co) => co.q && proche(fq(co.q)(p.x), p.y));
        const surPts = courbes.some((co) => co.pts && co.pts.some(([u, v]) => proche(u, p.x) && proche(v, p.y)));
        const surH = options.horizontale !== undefined && proche(options.horizontale, p.y) && courbes.some((co) => co.q && proche(fq(co.q)(p.x), p.y));
        vrai(`${quoi} sur une courbe tracée`, surQ || surPts || surH);
        if (!p.label) continue;
        nu(quoi, p.label);
        vrai(`${quoi} : étiquette courte (4 signes au plus)`, [...p.label].length <= 4);
        const lx = sx(p.x);
        const ly = sy(p.y);
        const boite = { x0: lx + 8, x1: lx + 8 + 8 * [...p.label].length, y0: ly - 19, y1: ly - 5 };
        vrai(`${quoi} : l'étiquette tient dans le dessin`, boite.x0 >= 0 && boite.x1 <= W && boite.y0 >= 0 && boite.y1 <= H);
        const touche = (b) => boite.x0 < b.x1 && b.x0 < boite.x1 && boite.y0 < b.y1 && b.y0 < boite.y1;
        const g = boites.find(touche);
        vrai(`${quoi} : l'étiquette « ${p.label} » ne tombe pas sur une graduation${g ? ` (${g.quoi})` : ""}`, !g);
        const autre = marques.find((q) => q !== p && touche({ x0: sx(q.x) - 5, x1: sx(q.x) + 5, y0: sy(q.y) - 5, y1: sy(q.y) + 5 }));
        vrai(`${quoi} : l'étiquette « ${p.label} » ne tombe pas sur un autre point`, !autre);
      }
    }
    if (d.type === "tableauVariations") {
      const [bornes, valeurs, label = "f", variable = "x"] = d.args;
      vrai(`${ou} : trois intervalles au plus`, bornes.length <= 4);
      vrai(`${ou} : autant de valeurs que de bornes`, bornes.length === valeurs.length);
      [...bornes, ...valeurs, label, variable].forEach((t) => nu(ou, t));
    }
    if (d.type === "tableauSignes") {
      const [bornes, lignes, variable = "x"] = d.args;
      bornes.forEach((t) => vrai(`${ou} : borne « ${t} » avec le vrai signe moins`, !/^-/.test(String(t))));
      const b = bornes.map(nombre);
      vrai(`${ou} : bornes croissantes`, b.every((x, k) => k === 0 || x > b[k - 1]));
      const tests = b.slice(0, -1).map((g, k) => (g === -Infinity ? b[k + 1] - 1 : b[k + 1] === Infinity ? g + 1 : (g + b[k + 1]) / 2));
      const interieures = b.slice(1, -1);
      const facteurs = [];
      const Sg = (v) => (v > 0 ? "+" : "-");
      for (const [label, signes, marques = interieures.map(() => "")] of lignes) {
        const f = expression(label, variable);
        let s, z;
        if (f) {
          s = tests.map((t) => Sg(f(t)));
          z = interieures.map((x) => (Math.abs(f(x)) < 1e-9 ? "0" : ""));
          facteurs.push({ s, z });
        } else {
          s = tests.map((_, k) => Sg(facteurs.reduce((p, l) => p * (l.s[k] === "+" ? 1 : -1), 1)));
          z = interieures.map((_, k) => (facteurs.some((l) => l.z[k] === "0") ? "0" : ""));
        }
        vrai(`${ou}, ${label} : signes ${signes.join("")} (calcul ${s.join("")})`, s.join() === signes.join());
        vrai(`${ou}, ${label} : zéros ${marques.join("|")} (calcul ${z.join("|")})`, z.join() === marques.join());
        vrai(`${ou}, ${label} : ${signes.length} signes pour ${tests.length} intervalles`, signes.length === tests.length && marques.length === interieures.length);
      }
      vrai(`${ou} : au moins un facteur relu`, facteurs.length > 0);
    }
    if (d.type === "tableau") {
      const [entete, ligne] = d.args;
      vrai(`${ou} : entete.length === ligne.length`, entete.length === ligne.length);
      [...entete, ...ligne].forEach((t) => nu(ou, t));
    }
    if (d.type === "diagramme") {
      const [type, data] = d.args;
      data.forEach((x) => nu(ou, x.label));
      if (type !== "camembert" && data.length >= 4) data.forEach((x) => vrai(`${ou} : « ${x.label} » en 9 signes au plus`, [...x.label].length <= 9));
    }
    if (d.type === "droite") {
      const [min, max] = d.args;
      vrai(`${ou} : dix graduations au plus`, max - min <= 10);
      if (Math.max(Math.abs(min), Math.abs(max)) >= 1000) vrai(`${ou} : 6 étiquettes au plus`, max - min + 1 <= 6);
    }
    if (d.type === "intervalles") {
      const [min, max, ivs, step = 1] = d.args;
      vrai(`${ou} : dix graduations au plus`, (max - min) / step <= 10);
      if (Math.max(Math.abs(min), Math.abs(max)) >= 1000) vrai(`${ou} : 6 étiquettes au plus`, (max - min) / step + 1 <= 6);
      ivs.forEach((iv) => iv.label && nu(ou, iv.label));
    }
  }
  vrai(`${imprimes} dessins imprimés (10 à 14 visés)`, imprimes >= 10 && imprimes <= 14);
  for (const [n, r] of Object.entries(S)) {
    const f = r.figure.map((x) => JSON.stringify([x.type, x.args]));
    const dup = r.schema.find((x) => f.includes(JSON.stringify([x.type, x.args])));
    vrai(`ex ${n} : jamais le même dessin dans l'énoncé et le corrigé`, !dup);
  }

  /* ── Le texte ──────────────────────────────────────────────────────────── */
  const adapt = { ok: (quoi, cond, detail = "") => (cond ? ok++ : ko.push(`${quoi}${detail ? " — " + detail : ""}`)), titre: () => {} };
  controlesCommuns(adapt, src, { notionId, classe: "premiere" });
  const interdits = feuille.textes.filter((t) => /discriminant|\\Delta|Δ|4ac/i.test(t));
  vrai(`aucun discriminant dans la feuille${interdits[0] ? ` (« ${interdits[0].slice(0, 60)} »)` : ""}`, interdits.length === 0);
  const rappels = [...feuille.series.matchAll(/rappel: \[([\s\S]*?)\n\s*\],/g)].map((m) => (m[1].match(/^\s*"/gm) ?? []).length);
  vrai(`trois rappels de 2 à 4 lignes (${rappels.join(", ")})`, rappels.length === 3 && rappels.every((n) => n >= 2 && n <= 4));
  const niveau3 = feuille.series.split(/niveau: 3,/)[1] ?? "";
  vrai("chaque problème a son titre", (niveau3.match(/^\s*titre: "/gm) ?? []).length === 1 + 4);
  // L'en-tête « Micro-compétences : id (1, 2), … N/N. »
  const parExercice = feuille.blocs.map((b) => [...(b.match(/micros: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]));
  const entete = src.slice(src.indexOf("// Micro-compétences"), src.indexOf("\nimport")).replace(/\n\/\/ ?/g, " ");
  const ids = [...new Set(parExercice.flat())];
  for (const id of ids) {
    const annonce = (entete.match(new RegExp(`${id} \\(([^)]*)\\)`))?.[1] ?? "").split(",").map((s) => Number(s.trim()));
    const reel = parExercice.flatMap((l, k) => (l.includes(id) ? [k + 1] : []));
    vrai(`en-tête : ${id} (${annonce.join(", ")}) = exercices ${reel.join(", ")}`, annonce.join() === reel.join());
  }
  vrai(`en-tête : « ${ids.length}/${ids.length} »`, entete.includes(`${ids.length}/${ids.length}`));

  console.log(`\n${nom}`);
  console.log(`${imprimes} dessins imprimés, ${dessins.length - imprimes} à l'écran seulement`);
  console.log(`${ok} vérifications justes, ${ko.length} fausses`);
  ko.forEach((k) => console.log("  ✗", k));
  process.exit(ko.length ? 1 : 0);
}
