// Le socle des six scripts de recalcul du chapitre « Dérivation » (1re sans
// spé, BOP1DE, 28/09/2026) : une feuille par notion du coach — der-graphique,
// der-nombre-derive, der-formules, der-polynome, der-signe, der-variations.
// Chaque script de notion ne garde que ses CALCULS ; ici vivent la lecture des
// dessins, le contrôle des nombres annoncés et les RÈGLES DE RENDU mesurées à
// 375 px.
//
// ⭐ LES DESSINS SONT ÉVALUÉS, PAS RECOPIÉS : chaque `figure:` et `schema:` du
// source est rejoué avec des aides factices (`repere`, `tableau`,
// `tableauSignes`, `tableauVariations`, `diagramme`, `deux`, `ecranSeulement`)
// qui rendent leurs arguments. Une tangente qui n'a pas la pente annoncée, un
// point marqué à côté de sa courbe, un tableau de variations dont une flèche
// monte quand f′ est négative : ça se voit.
//
// ⭐ LES DÉRIVÉES SONT REFAITES PAR UN AUTRE CHEMIN : taux d'accroissement
// symétrique sur la fonction elle-même, jamais les formules du cours. Une
// dérivée écrite dans le corrigé (« f'(x) = 6x^2 - 12x + 1 ») est LUE et
// évaluée en neuf points (`evalTexReel`), puis comparée à ce taux.

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, evalTexReel, outilsSignes } from "./verifier-exercices-commun.mjs";

const AIDES = ["repere", "tableau", "diagramme", "tableauVariations", "tableauSignes", "deux"];

/** `1\,728` → 1728 ; `0{,}25` → 0.25 ; `−3` → −3. */
export const lireNombre = (t) => Number(String(t).replace(/\\,/g, "").replace(/\{,\}/g, ".").replace(/,/g, ".").replace(/−/g, "-"));

/** Le nombre dérivé par taux d'accroissement symétrique : un AUTRE chemin que les formules. */
export const d = (F, x, h = 1e-5) => (F(x + h) - F(x - h)) / (2 * h);

/** Un polynôme donné par ses coefficients, du plus haut degré au plus bas. */
export const poly = (...coefs) => (x) => coefs.reduce((s, c) => s * x + c, 0);

const XS = [-3, -2, -1, -0.5, 0, 0.5, 1, 2, 3, 4, 7];

export function ouvrir(fichier, notionId) {
  const src = fs.readFileSync(path.join(RACINE, fichier), "utf8");
  const f = lireFeuille(src);
  let justes = 0;
  const fausses = [];
  const v = {
    ok(nom, condition, detail = "") {
      if (condition) justes++;
      else fausses.push(`${nom}${detail ? " — " + detail : ""}`);
    },
    titre() {},
  };
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const proche = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(b));
  const vrai = (nom, cond, detail = "") => v.ok(nom, cond, detail);
  const vaut = (nom, a, b, eps = 1e-6) => v.ok(nom, proche(a, b, eps), `${a} ≠ ${b}`);
  const dit = (k, ...phrases) => phrases.forEach((p) => v.ok(`${k}. « ${p} »`, c(k).includes(p), "absent du corrigé"));
  const ditEnonce = (k, ...phrases) => phrases.forEach((p) => v.ok(`${k}. énoncé « ${p} »`, e(k).includes(p), "absent de l'énoncé"));

  /** « f'(2) = 8 » écrit dans le corrigé k, et le dernier membre ÉGAL au calcul. */
  const annonce = (k, phrase, calcul, { ou = "correction", eps = 1e-6 } = {}) => {
    const texte = ou === "enonce" ? e(k) : c(k);
    const membres = phrase.split(/ = | \\approx /);
    const n = lireNombre(membres[membres.length - 1].trim());
    v.ok(`${k}. « ${phrase} » (calcul : ${+calcul.toFixed(6)})`, texte.includes(phrase) && proche(n, calcul, eps), texte.includes(phrase) ? `FAUX : ${n}` : "absent");
  };

  /** Une expression LaTeX en x (ou en `variable`), évaluée en décimal. */
  // ⚠️ `\times` contient un t et un m : on le remplace AVANT de renommer la variable.
  const lire = (tex, variable = "x") => (x) => evalTexReel(variable === "x" ? tex : tex.replace(/\\times/g, "*").replace(new RegExp(variable, "g"), "x"), x);

  /** « f'(x) = … » écrit dans le corrigé k, et … est bien la dérivée de F (taux d'accroissement, 11 points). */
  const derivee = (k, gauche, droite, F, { variable = "x", ou = "correction" } = {}) => {
    const texte = ou === "enonce" ? e(k) : c(k);
    const phrase = `${gauche} = ${droite}`;
    const G = lire(droite, variable);
    const faux = XS.find((x) => !proche(G(x), d(F, x), 1e-5));
    v.ok(`${k}. ${phrase}`, texte.includes(phrase) && faux === undefined, !texte.includes(phrase) ? "absent" : `diffère en x = ${faux}`);
  };

  /** Deux écritures égales (développée / factorisée), toutes deux écrites dans la feuille. */
  const identite = (k, a, b, { variable = "x" } = {}) => {
    const A = lire(a, variable);
    const B = lire(b, variable);
    const faux = XS.find((x) => !proche(A(x), B(x), 1e-9));
    const ecrits = (e(k) + c(k)).includes(a) && (e(k) + c(k)).includes(b);
    v.ok(`${k}. ${a} ≡ ${b}`, ecrits && faux === undefined, !ecrits ? "une écriture absente" : `diffère en x = ${faux}`);
  };

  /** Deux écritures DIFFÉRENTES (le piège d'un « vérifier » qui échoue). */
  const differentes = (k, a, b, { variable = "x" } = {}) => {
    const A = lire(a, variable);
    const B = lire(b, variable);
    v.ok(`${k}. ${a} ≢ ${b}`, XS.some((x) => !proche(A(x), B(x), 1e-9)));
  };

  /* ── Les dessins, rejoués ── */
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
      else if (")]}".includes(ch)) {
        if (prof === 0) break;
        prof--;
      } else if (ch === "," && prof === 0) break;
    }
    const k = (src.slice(0, m.index).match(/\benonce:/g) || []).length;
    const texte = src.slice(debut, i);
    const stub = (type) => (...args) => ({ type, args, ecran: false });
    const fn = new Function(...AIDES, "ecranSeulement", "ORANGE", "BLEU", "VERT", `return (${texte});`);
    const racine = fn(...AIDES.map(stub), (x) => ({ ...x, ecran: true }), "#ea580c", "#2563eb", "#16a34a");
    // `deux(a, b)` : deux dessins sous un même corrigé — on les aplatit.
    const feuilles = [];
    const aplatir = (n, ecran) => {
      if (n.type === "deux") n.args.forEach((x) => aplatir(x, ecran || n.ecran));
      else feuilles.push({ ...n, ecran: ecran || n.ecran });
    };
    aplatir(racine, false);
    feuilles.forEach((x, j) => dessins.push({ k, role: m[1], rang: j, ...x, texte }));
  }
  const dessin = (k, role = "figure", type = "repere", rang = 0) => {
    const d = dessins.filter((x) => x.k === k && x.role === role && x.type === type)[rang];
    if (!d) throw new Error(`exercice ${k} : pas de ${type} en ${role}`);
    return d;
  };

  /** La fonction tracée par la courbe i d'un repère. */
  const fonctionDe = (cb) => {
    if (cb.q) return (x) => cb.q[0] * x * x + cb.q[1] * x + cb.q[2];
    if (cb.p) return poly(...cb.p);
    return (x) => {
      const pts = cb.pts;
      for (let j = 0; j + 1 < pts.length; j++) {
        const [x0, y0] = pts[j];
        const [x1, y1] = pts[j + 1];
        if (x0 !== x1 && x >= Math.min(x0, x1) && x <= Math.max(x0, x1)) return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
      }
      return NaN;
    };
  };
  const courbe = (k, role, i) => fonctionDe(dessin(k, role).args[1][i]);

  /** La courbe i du repère est-elle F (onze points) ? */
  const estLaCourbe = (k, role, i, F, nom = "f") => {
    const G = courbe(k, role, i);
    const faux = XS.find((x) => !proche(G(x), F(x), 1e-9));
    v.ok(`${k}. ${role} : la courbe ${i + 1} est ${nom}`, faux === undefined, `diffère en x = ${faux}`);
  };

  /** La droite i du repère est-elle la tangente à F au point d'abscisse a ? */
  const tangente = (k, role, i, F, a, nom = "") => {
    const cb = dessin(k, role).args[1][i];
    const droite = cb.q && cb.q[0] === 0;
    const [m, p] = droite ? [cb.q[1], cb.q[2]] : [NaN, NaN];
    v.ok(`${k}. ${role} : tangente ${nom || i + 1} en ${a}, pente ${m}`, droite && proche(m, d(F, a), 1e-5), droite ? `pente de f : ${d(F, a)}` : "pas une droite");
    v.ok(`${k}. ${role} : tangente ${nom || i + 1} en ${a}, point de contact`, droite && proche(m * a + p, F(a), 1e-9), `${m * a + p} ≠ ${F(a)}`);
  };

  /** Le tableau de variations (aide locale : bornes, signes, valeurs) dit-il F ?
   *  Valeur à chaque borne, signe de F′ au milieu de chaque morceau, F′ nulle
   *  aux bornes intérieures (le « 0 » que l'aide écrit). */
  const variations = (k, F, role = "schema", rang = 0) => {
    const t = dessin(k, role, "tableauVariations", rang);
    const [bornes, signes, valeurs] = t.args;
    const fautes = [];
    bornes.forEach((b, i) => {
      if (!proche(F(b), valeurs[i], 1e-9)) fautes.push(`F(${b}) = ${F(b)} ≠ ${valeurs[i]}`);
      if (i > 0 && i < bornes.length - 1 && !proche(d(F, b), 0, 1e-5) && Math.abs(d(F, b)) > 1e-5) fautes.push(`F′(${b}) ≠ 0`);
    });
    for (let i = 0; i + 1 < bornes.length; i++) {
      for (const r of [0.25, 0.5, 0.75]) {
        const x = bornes[i] + r * (bornes[i + 1] - bornes[i]);
        const s = d(F, x) > 0 ? "+" : "-";
        if (s !== signes[i]) fautes.push(`signe de F′ en ${x} : ${s}, écrit ${signes[i]}`);
      }
    }
    v.ok(`${k}. ${role} : le tableau de variations dit la fonction (${bornes.join(" ; ")})`, fautes.length === 0, fautes.slice(0, 2).join(" ; "));
  };

  const signes = outilsSignes(v, f);

  /* ── Les règles de rendu (mesurées à 375 px le 28/09) ── */
  const controlesRendu = () => {
    for (const d of dessins) {
      const ou = `${d.k}. ${d.role}${d.rang ? ` (${d.rang + 1})` : ""}`;
      const json = JSON.stringify(d.args);
      if (d.type !== "tableauSignes") {
        vrai(`${ou} : texte NU (pas de $)`, !json.includes("$"));
        // Les CHAÎNES seules (pas les nombres, que les aides écrivent avec « − »).
        const chaines = [];
        const collecte = (x) => (typeof x === "string" ? chaines.push(x) : x && typeof x === "object" ? Object.values(x).forEach(collecte) : null);
        collecte(d.args);
        const fautif = chaines.find((s) => /-\d/.test(s));
        vrai(`${ou} : vrai signe moins « − » dans les étiquettes`, !fautif, fautif);
      }
      if (d.type === "tableau") vrai(`${ou} : tableau, entête et ligne de même longueur`, d.args[0].length === d.args[1].length, `${d.args[0].length} / ${d.args[1].length}`);
      if (d.type === "diagramme" && d.args[1].length >= 4)
        d.args[1].forEach((x) => vrai(`${ou} : « ${x.label} » en 9 signes au plus (4 barres ou plus)`, [...x.label].length <= 9));
      if (d.type === "tableauVariations") {
        const [b, s, val] = d.args;
        vrai(`${ou} : tableau de variations, 4 bornes au plus, longueurs cohérentes`, b.length <= 4 && b.length === val.length && s.length === b.length - 1);
        // Une flèche monte quand f′ est positive : les valeurs le disent aussi.
        s.forEach((sg, i) => vrai(`${ou} : flèche ${i + 1} (${sg}) cohérente avec ${val[i]} → ${val[i + 1]}`, sg === "+" ? val[i] < val[i + 1] : val[i] > val[i + 1]));
      }
      if (d.type === "tableauSignes") {
        const [b, lignes] = d.args;
        vrai(`${ou} : bornes du tableau de signes, vrai « − »`, b.every((x) => x.includes("$") || !/-/.test(x)));
        lignes.forEach(([lab, sg, mq = []]) => vrai(`${ou} : ligne « ${lab} », ${b.length - 1} signes et ${b.length - 2} marques`, sg.length === b.length - 1 && mq.length === b.length - 2));
      }
      if (d.type === "repere") reperePixels(d, ou);
    }
    // Pas le même dessin dans l'énoncé et le corrigé.
    for (const d of dessins.filter((x) => x.role === "figure")) {
      for (const s of dessins.filter((x) => x.k === d.k && x.role === "schema"))
        vrai(`${d.k}. la figure et le schéma diffèrent`, JSON.stringify(s.args) !== JSON.stringify(d.args) || s.type !== d.type);
    }
    const imprimes = dessins.filter((x) => !x.ecran).length;
    vrai(`${imprimes} dessins imprimés (10 à 14 attendus)`, imprimes >= 10 && imprimes <= 14);
    return { imprimes, ecran: dessins.filter((x) => x.ecran).length };
  };

  /** Le repère : cadre, `grand`, courbes EN CLAIR et sans trou, points sur leur
   *  courbe, et chaque étiquette loin des graduations, des autres points, des bords. */
  function reperePixels(d, ou) {
    const [cadre, courbes = [], marques = [], , grand = false] = d.args;
    const [xmin, xmax, ymin, ymax] = cadre;
    vrai(`${ou} : cadre entier`, cadre.every(Number.isInteger));
    vrai(`${ou} : ymin < 0`, ymin < 0);
    vrai(`${ou} : xmin < 0 (l'axe des ordonnées n'est pas le bord)`, xmin < 0);
    const dx = xmax - xmin;
    const dy = ymax - ymin;
    if (dx > 10 || dy > 10) vrai(`${ou} : plus de 10 unités, donc grand = true`, grand === true);
    vrai(`${ou} : 15 unités au plus par axe (${dx} × ${dy})`, dx <= 15 && dy <= 15);
    // EN CLAIR : chaque `q:`, `p:`, `pts:` est suivi de nombres écrits.
    const cles = (d.texte.match(/\b(q|p|pts): /g) ?? []).length;
    const clairs = (d.texte.match(/\b(q|p): \[-?[\d.]+(, -?[\d.]+)*\]|\bpts: \[(\[-?[\d.]+, -?[\d.]+\](, )?)+\]/g) ?? []).length;
    vrai(`${ou} : courbes écrites en clair`, cles === clairs, `${clairs} / ${cles}`);
    const fs = courbes.map(fonctionDe);
    courbes.forEach((cb, i) => {
      if (cb.p) {
        // L'aide ne garde que les points proches du cadre : une courbe qui sort
        // puis rentre serait reliée par une CORDE. Les points gardés doivent se suivre.
        const gardes = Array.from({ length: 121 }, (_, j) => xmin + ((xmax - xmin) * j) / 120).map((x) => fs[i](x)).map((y) => y >= ymin - 1 && y <= ymax + 1);
        const debut = gardes.indexOf(true);
        const fin = gardes.lastIndexOf(true);
        vrai(`${ou} : courbe ${i + 1} sans trou dans le cadre`, debut >= 0 && gardes.slice(debut, fin + 1).every(Boolean));
      }
      if (cb.pts) vrai(`${ou} : ligne ${i + 1} dans le cadre`, cb.pts.every(([x, y]) => x >= xmin && x <= xmax && y >= ymin && y <= ymax));
    });
    const surPts = (cb, p) =>
      cb.pts.some(([x0, y0], j) => {
        const q = cb.pts[j + 1];
        if (!q) return x0 === p.x && y0 === p.y;
        const [x1, y1] = q;
        const croix = (x1 - x0) * (p.y - y0) - (y1 - y0) * (p.x - x0);
        return Math.abs(croix) < 1e-9 && p.x >= Math.min(x0, x1) && p.x <= Math.max(x0, x1) && p.y >= Math.min(y0, y1) && p.y <= Math.max(y0, y1);
      });
    for (const p of marques) {
      vrai(`${ou} : point (${p.x} ; ${p.y}) dans le cadre`, p.x > xmin && p.x < xmax && p.y > ymin && p.y < ymax);
      vrai(`${ou} : point (${p.x} ; ${p.y}) sur une courbe tracée`, courbes.some((cb, i) => (cb.pts ? surPts(cb, p) : proche(fs[i](p.x), p.y, 1e-9))));
    }
    const W = grand ? 272 : 215;
    const H = grand ? 272 : 200;
    const sx = (x) => ((x - xmin) / dx) * W;
    const sy = (y) => H - ((y - ymin) / dy) * H;
    const axeX = sy(0);
    const axeY = sx(0);
    const boites = [];
    const pasX = Math.max(1, Math.ceil(22 / (W / dx)));
    for (let x = xmin; x <= xmax; x++) {
      if (!(x === 0 || (x - xmin) % pasX === 0)) continue;
      const t = String(x).length * 7;
      const cx = Math.min(W - 10, Math.max(10, sx(x))) + (x === 0 && sx(x) > 10 ? 8 : 0);
      boites.push({ nom: `graduation ${x}`, x0: cx - t / 2, x1: cx + t / 2, y0: axeX + 6, y1: axeX + 19 });
    }
    const pasY = Math.max(1, Math.ceil(16 / (H / dy)));
    const aGauche = axeY > 26;
    for (let y = ymin; y <= ymax; y++) {
      if (y === 0 || (y - ymin) % pasY !== 0) continue;
      const t = String(y).length * 7;
      const cy = Math.min(H - 7, Math.max(7, sy(y)));
      boites.push({ nom: `graduation ${y}`, x0: aGauche ? axeY - 6 - t : axeY + 6, x1: aGauche ? axeY - 6 : axeY + 6 + t, y0: cy - 6, y1: cy + 6 });
    }
    const touche = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
    marques.forEach((p, i) => {
      if (!p.label) return;
      const bx = sx(p.x) + 8;
      const by = sy(p.y) - 8;
      const lab = { x0: bx, x1: bx + [...p.label].length * 8.5, y0: by - 11, y1: by + 2 };
      vrai(`${ou} : l'étiquette « ${p.label} » tient dans le cadre`, lab.x1 <= W + 2 && lab.y0 >= -2);
      const g = boites.find((b) => touche(lab, b));
      vrai(`${ou} : l'étiquette « ${p.label} » ne tombe sur aucune graduation`, !g, g?.nom);
      const autre = marques.find((q, j) => j !== i && touche(lab, { x0: sx(q.x) - 5, x1: sx(q.x) + 5, y0: sy(q.y) - 5, y1: sy(q.y) + 5 }));
      vrai(`${ou} : l'étiquette « ${p.label} » ne tombe sur aucun autre point`, !autre, autre ? `(${autre.x} ; ${autre.y})` : "");
    });
  }

  /** La fin : socle commun, en-tête des micros, 20 corrigés, rendu, bilan. */
  const fin = (nom) => {
    let bilan = { imprimes: 0, ecran: 0 };
    try {
      bilan = controlesRendu();
    } catch (err) {
      v.ok("les contrôles de rendu s'exécutent", false, String(err?.message ?? err));
    }
    controlesCommuns(v, src, { notionId, classe: "premiere" });
    const nb = (src.match(/correction:/g) ?? []).length;
    v.ok("exactement 20 `correction:`", nb === 20, `${nb}`);
    // Chaque exercice a ses micros, et l'en-tête les annonce exercice par exercice.
    const parExercice = src
      .slice(src.indexOf("series: ["))
      .split(/\n\s+enonce:/)
      .slice(1)
      .map((t) => [...(t.match(/micros: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]));
    parExercice.forEach((l, j) => v.ok(`exercice ${j + 1} : au moins une micro`, l.length > 0));
    const entete = src.slice(src.indexOf("// Micro-compétences"), src.indexOf("\nimport")).replace(/\n\/\/ ?/g, " ");
    const ids = [...new Set(parExercice.flat())];
    for (const id of ids) {
      const annonceE = (new RegExp(`${id} \\(([^)]*)\\)`).exec(entete)?.[1] ?? "").split(",").map((s) => Number(s.trim()));
      const reel = parExercice.flatMap((l, j) => (l.includes(id) ? [j + 1] : []));
      v.ok(`en-tête : ${id} (${reel.join(", ")})`, JSON.stringify(annonceE) === JSON.stringify(reel), `annoncé ${annonceE.join(", ")}`);
    }
    v.ok(`en-tête : « ${ids.length}/${ids.length} »`, entete.includes(`${ids.length}/${ids.length}.`));
    console.log(`${nom} — ${justes} vérifications justes, ${fausses.length} fausses (${bilan.imprimes} dessins imprimés, ${bilan.ecran} à l'écran seulement)`);
    fausses.forEach((x) => console.log("  ✗", x));
    process.exit(fausses.length ? 1 : 0);
  };

  /** Le calcul d'un exercice : une exception compte pour une fausse, la suite continue. */
  const exercice = (k, corps) => {
    try {
      corps();
    } catch (err) {
      v.ok(`${k}. le recalcul s'exécute`, false, String(err?.message ?? err));
    }
  };

  return { src, f, v, c, e, dit, ditEnonce, vrai, vaut, proche, annonce, derivee, identite, differentes, lire, dessins, dessin, courbe, estLaCourbe, tangente, variations, signes, exercice, fin };
}
