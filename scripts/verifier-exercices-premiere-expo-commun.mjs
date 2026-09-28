// Le socle des sept scripts de recalcul du chapitre « Variation exponentielle »
// (1re sans spé, BOP1VE, 28/09/2026) : suites géométriques, x ↦ aˣ, taux
// moyen, modéliser, seuil. Chaque script de notion ne garde que ses CALCULS ;
// ici vivent la lecture des dessins, le contrôle des nombres annoncés dans les
// corrigés et les RÈGLES DE RENDU mesurées à 375 px.
//
// ⭐ LES DESSINS SONT ÉVALUÉS, PAS RECOPIÉS : chaque `figure:` et `schema:` du
// source est rejoué avec des aides factices (`repere`, `tableau`, `diagramme`,
// `tableauVariations`, `ecranSeulement`) qui rendent leurs arguments. Un point
// dessiné à côté de sa suite, une courbe qui n'est pas celle de aˣ : ça se voit.
//
// ⭐ UN NOMBRE ANNONCÉ SE LIT À SA PLACE : `res(k, calcul, "1{,}44")` exige que
// le corrigé k écrive ce nombre (pas collé à d'autres chiffres), et qu'il soit
// ÉGAL au calcul — ou son arrondi au dernier chiffre écrit, mais alors précédé
// de « \approx » ou de « environ ». Un « = » devant une valeur arrondie est une
// faute.

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns } from "./verifier-exercices-commun.mjs";

const AIDES = ["repere", "tableau", "diagramme", "tableauVariations"];

/** `1\,728` → 1728 ; `0{,}25` → 0.25 ; `-3{,}5` → −3,5. */
export const lireNombre = (t) => Number(String(t).replace(/\\,/g, "").replace(/\{,\}/g, ".").replace(/,/g, ".").replace(/−/g, "-"));

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
  const proche = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(b));

  /** Le corrigé (ou l'énoncé) k écrit-il `tex`, égal au calcul — ou son arrondi précédé de ≈ ? */
  const res = (k, calcul, tex, { ou = "correction" } = {}) => {
    const texte = ou === "enonce" ? e(k) : c(k);
    const n = lireNombre(tex);
    const dec = (/\{,\}(\d+)/.exec(tex)?.[1] ?? "").length;
    const exact = proche(calcul, n);
    const arrondi = Math.abs(calcul - n) <= 0.5 * 10 ** -dec + 1e-9;
    const echap = tex.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const occ = [...texte.matchAll(new RegExp(`(?<![\\d,}])${echap}(?![\\d{])`, "g"))];
    const avecApprox = occ.some((m) => /\\approx\s*[+-]?\s*$|environ \$?[+-]?\s*$|arrondi[^.]*\$\s*$/i.test(texte.slice(Math.max(0, m.index - 30), m.index)));
    v.ok(
      `${k}. ${tex} (calcul : ${+calcul.toFixed(6)})`,
      occ.length > 0 && (exact || (arrondi && avecApprox)),
      occ.length === 0 ? `absent ${ou === "enonce" ? "de l'énoncé" : "du corrigé"}` : exact ? "" : arrondi ? "arrondi écrit sans ≈" : "FAUX",
    );
  };
  const dit = (k, ...phrases) => phrases.forEach((p) => v.ok(`${k}. « ${p} »`, c(k).includes(p), "absent du corrigé"));
  const vrai = (nom, cond, detail = "") => v.ok(nom, cond, detail);
  const vaut = (nom, a, b, eps = 1e-9) => v.ok(nom, proche(a, b, eps), `${a} ≠ ${b}`);

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
    const stub = (type) => (...args) => ({ type, args, ecran: false });
    const fn = new Function(...AIDES, "ecranSeulement", "ORANGE", "BLEU", "VERT", `return (${src.slice(debut, i)});`);
    const d = fn(...AIDES.map(stub), (x) => ({ ...x, ecran: true }), "#ea580c", "#2563eb", "#16a34a");
    dessins.push({ k, role: m[1], ...d, texte: src.slice(debut, i) });
  }
  const dessin = (k, role = "figure") => {
    const d = dessins.find((x) => x.k === k && x.role === role);
    if (!d) throw new Error(`exercice ${k} : pas de ${role}`);
    return d;
  };

  /** Chaque point de la courbe i du repère suit-il f (à `tol` près : les points sont écrits arrondis) ? */
  const courbeSuit = (k, role, i, fx, nom, tol = 0.006) => {
    const d = dessin(k, role);
    const pts = d.args[1][i]?.pts ?? [];
    const faux = pts.filter(([x, y]) => Math.abs(fx(x) - y) > tol);
    v.ok(`${k}. ${role} : la courbe ${i + 1} est ${nom} (${pts.length} points)`, pts.length >= 2 && faux.length === 0, faux.length ? `(${faux[0]}) : attendu ${fx(faux[0][0])}` : "aucun point");
  };
  /** Les points marqués du repère suivent-ils la suite u (à `tol` près) ? */
  const pointsSuivent = (k, role, un, nom, tol = 0.006) => {
    const d = dessin(k, role);
    const marques = d.args[2] ?? [];
    const faux = marques.filter((p) => Math.abs(un(p.x) - p.y) > tol);
    v.ok(`${k}. ${role} : les ${marques.length} points marqués sont ${nom}`, marques.length >= 1 && faux.length === 0, faux.length ? `(${faux[0].x} ; ${faux[0].y}) : attendu ${un(faux[0].x)}` : "aucun point");
  };

  /* ── Les règles de rendu (mesurées à 375 px le 28/09) ── */
  const controlesRendu = () => {
    for (const d of dessins) {
      const ou = `${d.k}. ${d.role}`;
      const json = JSON.stringify(d.args);
      vrai(`${ou} : texte NU (pas de $)`, !json.includes("$"));
      vrai(`${ou} : vrai signe moins « − » dans les étiquettes`, !/"[^"]*-\d[^"]*"/.test(json.replace(/"#[0-9a-f]{6}"/g, "")));
      if (d.type === "tableau") vrai(`${ou} : tableau, entête et ligne de même longueur`, d.args[0].length === d.args[1].length, `${d.args[0].length} / ${d.args[1].length}`);
      if (d.type === "diagramme" && d.args[1].length >= 4)
        d.args[1].forEach((x) => vrai(`${ou} : « ${x.label} » en 9 signes au plus (4 barres ou plus)`, [...x.label].length <= 9));
      if (d.type === "tableauVariations") vrai(`${ou} : tableau de variations, 4 bornes au plus`, d.args[0].length <= 4 && d.args[0].length === d.args[1].length);
      if (d.type === "repere") reperePixels(d, ou);
    }
    // Pas le même dessin dans l'énoncé et le corrigé.
    for (const d of dessins.filter((x) => x.role === "figure")) {
      const s = dessins.find((x) => x.k === d.k && x.role === "schema");
      if (s) vrai(`${d.k}. la figure et le schéma diffèrent`, JSON.stringify(s.args) !== JSON.stringify(d.args) || s.type !== d.type);
    }
    const imprimes = dessins.filter((x) => !x.ecran).length;
    vrai(`${imprimes} dessins imprimés (10 à 14 attendus)`, imprimes >= 10 && imprimes <= 14);
    return { imprimes, ecran: dessins.filter((x) => x.ecran).length };
  };

  /** Le repère, en pixels : cadre, `grand`, courbes dans le cadre, et chaque
   *  étiquette de point loin des graduations, des autres points et des bords. */
  function reperePixels(d, ou) {
    const [cadre, courbes = [], marques = [], , grand = false] = d.args;
    const [xmin, xmax, ymin, ymax] = cadre;
    vrai(`${ou} : cadre entier`, cadre.every(Number.isInteger));
    vrai(`${ou} : ymin < 0`, ymin < 0);
    vrai(`${ou} : xmin < 0 (l'axe des ordonnées n'est pas le bord)`, xmin < 0);
    const dx = xmax - xmin;
    const dy = ymax - ymin;
    if (dx > 10 || dy > 10) vrai(`${ou} : plus de 10 unités, donc grand = true`, grand === true);
    vrai(`${ou} : 16 unités au plus par axe (${dx} × ${dy})`, dx <= 16 && dy <= 16);
    for (const cb of courbes) {
      const pts = cb.pts ?? [];
      vrai(`${ou} : courbe écrite en clair (pts)`, pts.length >= 2);
      const hors = pts.filter(([x, y]) => x < xmin || x > xmax || y < ymin || y > ymax);
      vrai(`${ou} : courbe dans le cadre`, hors.length === 0, hors.length ? `(${hors[0]})` : "");
    }
    for (const p of marques) vrai(`${ou} : point (${p.x} ; ${p.y}) dans le cadre`, p.x > xmin && p.x < xmax && p.y > ymin && p.y < ymax);
    const W = grand ? 272 : 215;
    const H = grand ? 272 : 200;
    const sx = (x) => ((x - xmin) / dx) * W;
    const sy = (y) => H - ((y - ymin) / dy) * H;
    const axeX = sy(0);
    const axeY = sx(0);
    // Les graduations écrites (même règle que le canvas : pas adaptatif).
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
    // L'en-tête annonce, micro par micro, les exercices qui la travaillent.
    const parExercice = src
      .slice(src.indexOf("series: ["))
      .split(/\n\s+enonce:/)
      .slice(1)
      .map((t) => [...(t.match(/micros: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]));
    const entete = src.slice(src.indexOf("// Micro-compétences"), src.indexOf("\nimport")).replace(/\n\/\/ ?/g, " ");
    const ids = [...new Set(parExercice.flat())];
    for (const id of ids) {
      const annonce = (new RegExp(`${id} \\(([^)]*)\\)`).exec(entete)?.[1] ?? "").split(",").map((s) => Number(s.trim()));
      const reel = parExercice.flatMap((l, j) => (l.includes(id) ? [j + 1] : []));
      v.ok(`en-tête : ${id} (${reel.join(", ")})`, JSON.stringify(annonce) === JSON.stringify(reel), `annoncé ${annonce.join(", ")}`);
    }
    v.ok(`en-tête : « ${ids.length}/${ids.length} »`, entete.includes(`${ids.length}/${ids.length}.`));
    console.log(`${nom} — ${justes} vérifications justes, ${fausses.length} fausses (${bilan.imprimes} dessins imprimés, ${bilan.ecran} à l'écran seulement)`);
    fausses.forEach((x) => console.log("  ✗", x));
    process.exit(fausses.length ? 1 : 0);
  };

  return { src, f, v, c, e, res, dit, vrai, vaut, proche, dessins, dessin, courbeSuit, pointsSuivent, fin };
}
