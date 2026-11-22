// scripts/verifier-figures-espace-terminale.mjs
//
// VÉRIFIER LES FIGURES DE L'ESPACE EN LES RENDANT (22/11/2026).
//
//   node scripts/verifier-figures-espace-terminale.mjs [sortie.html]
//
// Pourquoi un instrument de plus. `scripts/apercu-canvas.mjs` est l'étalon du
// dépôt pour juger un dessin au rendu, et il reste la bonne porte — mais il
// charge `lib/canvas/CanvasRenderer`, qui charge aujourd'hui
// `TableauDonneesCanvas` → `TexteMath` → `katex/dist/katex.min.css`. jiti rend
// la main à Node sur ce `.css`, et Node s'arrête : `ERR_UNKNOWN_FILE_EXTENSION`.
// L'outil est donc hors service pour TOUS les canvas, pas seulement les miens.
// Plutôt que de retoucher un script partagé qu'une autre session utilise peut-
// être, celui-ci ne charge que `Repere3dCanvas` (dont le seul import est un
// type) et ne regarde que les figures de l'espace en terminale.
//
// Ce qu'il mesure, sur TOUTES les figures réellement servies par les trois
// banques (pas sur un échantillon écrit à la main) :
//
//   1. LES DÉBORDEMENTS. Un SVG coupe ce qui dépasse de son `viewBox`, sans un
//      mot. Même estimation de largeur que l'étalon (0,55 × la police par
//      caractère), même tolérance de 2 px.
//   2. LA TAILLE DU TEXTE À L'ÉCRAN. Un dessin de 320 px ramené dans un bloc
//      de 250 px divise toutes ses lettres. Seuil de l'étalon : 11 px.
//   3. ⭐ LES NOMS QUI SE TOUCHENT — le défaut qu'aucun outil du dépôt ne
//      voit. `Repere3dCanvas` pose chaque étiquette à 7 px en haut à droite de
//      son point, sans réglage : deux points dont les projections cavalières
//      sont proches donnent deux noms empilés. Ni `verifier-latex` (qui lit le
//      LaTeX), ni `apercu-canvas` (qui mesure la taille des lettres et les
//      débordements) ne mesurent une collision.
//   4. LA SANTÉ DE LA FIGURE : pas de coordonnée NaN, pas de segment qui
//      pointe vers un point inexistant, pas deux points portant le même nom,
//      et une étendue non nulle (une figure plate est une figure fausse).
//
// Sortie 1 dès qu'un défaut est trouvé. En plus, un fichier HTML autonome pour
// regarder les dessins — parce qu'aucune de ces quatre mesures ne dit si un
// dessin AIDE.

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const ici = dirname(fileURLToPath(import.meta.url));
const racine = resolve(ici, "..");

const jiti = createJiti(import.meta.url, {
  alias: { "@": racine },
  interopDefault: true,
  jsx: true,
});

const React = await jiti.import("react", { default: true });
const { renderToStaticMarkup } = await jiti.import("react-dom/server");
globalThis.React = React;

const Repere3dCanvas = await jiti.import("@/lib/canvas/Repere3dCanvas", { default: true });

const { geometrieEspaceBank } = await jiti.import(
  "@/lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace.bank",
);
const { produitScalaireEspaceBank } = await jiti.import(
  "@/lib/tutor-v4/questionBank/terminale-spe/maths/produit-scalaire-espace.bank",
);
const { geometrieEspaceConcoursBank } = await jiti.import(
  "@/lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace-concours.bank",
);

const BANQUES = [
  ["geometrie-espace", geometrieEspaceBank],
  ["produit-scalaire-espace", produitScalaireEspaceBank],
  ["geometrie-espace-concours", geometrieEspaceConcoursBank],
];

/** Un gabarit se juge sur plusieurs tirages : une figure peut être juste neuf
 *  fois et plate la dixième. */
const TIRAGES = 12;

const LARGEUR_CARACTERE = 0.55;
const MARGE_DEBORDEMENT = 2;
const POLICE_MINI = 11;
/** LES LARGEURS RÉELLES DU BLOC OÙ CES DESSINS VONT — celles du coach, pas
 *  celles des fiches. Dans `app/coach/serie/TutorV4Client.tsx`, le dessin est
 *  posé dans un `<div className="mb-5 overflow-x-auto rounded-2xl bg-slate-50
 *  p-3">`, et `Repere3dCanvas` ajoute son propre `p-3` sous un plafond de
 *  360 px. Sur un téléphone de 375 px, il reste donc à peu près 280 px au SVG ;
 *  340 px sur une tablette ; 400 px sur un écran, où le plafond de 360 px
 *  prend le relais. ⛔ Le cadre de 250 px de `apercu-canvas.mjs` est celui
 *  d'une carte de fiche sur trois colonnes : il n'existe pas ici. */
const CADRES = [280, 340, 400];
/** Deux étiquettes plus proches que ça, à l'écran, se chevauchent. Une lettre
 *  de 13 px fait ~7 px de large et ~10 px de haut ; 14 px de distance est le
 *  minimum pour que deux noms de une ou deux lettres restent séparés. */
const ECART_NOMS_MINI = 14;

const problemes = [];
const vus = [];

/** Rend des paires { figure, texte } : le texte de l'énoncé qui VA AVEC cette
 *  figure — pour un gabarit, celui du même tirage, sans quoi on comparerait un
 *  dessin aux nombres d'un autre tirage. */
function figuresDeLItem(item) {
  if (item.kind === "template") {
    const sorties = [];
    for (let k = 0; k < TIRAGES; k += 1) {
      try {
        const q = item.generate();
        if (q && q.canvas) sorties.push({ figure: q.canvas, texte: String(q.text ?? "") });
      } catch (e) {
        problemes.push(`${item.id} — generate() a levé : ${e.message}`);
      }
    }
    return sorties;
  }
  return item.canvas ? [{ figure: item.canvas, texte: String(item.text ?? "") }] : [];
}

function verifierStructure(nom, figure) {
  const points = figure.points ?? [];
  const segments = figure.segments ?? [];
  for (const [i, p] of points.entries()) {
    for (const c of ["x", "y", "z"]) {
      if (!Number.isFinite(p[c])) problemes.push(`${nom} — point ${i} : ${c} = ${p[c]}`);
    }
  }
  for (const [i, s] of segments.entries()) {
    if (!points[s.de] || !points[s.a]) {
      problemes.push(`${nom} — segment ${i} pointe vers un point inexistant (${s.de} → ${s.a})`);
    }
  }
  const noms = points.map((p) => p.label).filter(Boolean);
  const doubles = noms.filter((n, i) => noms.indexOf(n) !== i);
  if (doubles.length) {
    problemes.push(`${nom} — deux points portent le même nom : ${[...new Set(doubles)].join(", ")}`);
  }
  // Étendue : la projection cavalière du nuage de points ne doit pas être un
  // point (toutes les coordonnées égales) — ce serait une figure vide.
  const proj = points.map((p) => [
    p.x + 0.5 * p.y * Math.cos(Math.PI / 6),
    p.z + 0.5 * p.y * Math.sin(Math.PI / 6),
  ]);
  if (proj.length) {
    const dx = Math.max(...proj.map((q) => q[0])) - Math.min(...proj.map((q) => q[0]));
    const dy = Math.max(...proj.map((q) => q[1])) - Math.min(...proj.map((q) => q[1]));
    if (dx < 1e-9 && dy < 1e-9) problemes.push(`${nom} — tous les points se projettent au même endroit`);
  }
}

function verifierRendu(nom, html) {
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(html);
  if (!vb) {
    problemes.push(`${nom} — aucun viewBox : le dessin ne s'est pas rendu`);
    return null;
  }
  const largeur = Number(vb[1]);
  const textes = [];
  for (const t of html.matchAll(/<text([^>]*)>([^<]*)<\/text>/g)) {
    const attrs = t[1];
    const texte = t[2].replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    if (!texte.trim()) continue;
    const x = Number(/\bx="([\d.-]+)"/.exec(attrs)?.[1] ?? 0);
    const y = Number(/\by="([\d.-]+)"/.exec(attrs)?.[1] ?? 0);
    const police = Number(/font-size="([\d.]+)"/.exec(attrs)?.[1] ?? 15);
    const large = texte.length * police * LARGEUR_CARACTERE;
    if (x < -MARGE_DEBORDEMENT || x + large > largeur + MARGE_DEBORDEMENT) {
      problemes.push(
        `${nom} — « ${texte} » occupe [${x.toFixed(0)} ; ${(x + large).toFixed(0)}] dans un cadre de ${largeur.toFixed(0)} px`,
      );
    }
    textes.push({ texte, x, y, police });
  }

  // 3. Les noms qui se touchent.
  for (let i = 0; i < textes.length; i += 1) {
    for (let j = i + 1; j < textes.length; j += 1) {
      const d = Math.hypot(textes[i].x - textes[j].x, textes[i].y - textes[j].y);
      if (d < ECART_NOMS_MINI) {
        problemes.push(
          `${nom} — « ${textes[i].texte} » et « ${textes[j].texte} » sont à ${d.toFixed(0)} px l'un de l'autre (minimum ${ECART_NOMS_MINI})`,
        );
      }
    }
  }

  // 2. La taille du texte dans le bloc le plus serré.
  const polices = textes.map((t) => t.police);
  const policeMax = polices.length ? Math.max(...polices) : 0;
  for (const cadre of CADRES) {
    const echelle = Math.min(1, (cadre - 24) / largeur);
    const effective = policeMax * echelle;
    if (effective && effective < POLICE_MINI) {
      problemes.push(`${nom} — ${effective.toFixed(1)} px de texte dans un bloc de ${cadre} px`);
    }
  }
  return { largeur, policeMax };
}

/* =========================================================
   5. LA FIGURE DIT-ELLE LA MÊME CHOSE QUE L'ÉNONCÉ ?
   =========================================================
   Les quatre mesures ci-dessus contrôlent qu'un dessin est LISIBLE. Aucune ne
   contrôle qu'il est JUSTE. Or quatre-vingt-quatorze figures ont été posées à
   la main, chacune en recopiant les nombres de son énoncé : une transposition
   (« B(4 ; 6 ; 3) » dessiné en (4 ; 3 ; 6)) donne un dessin crédible et faux,
   et rien ne le dit.
   On relit donc l'énoncé et on vérifie trois choses :
     - tout triplet de coordonnées écrit dans l'énoncé est un point de la
       figure (sauf pour les figures de plan, où les nombres de l'énoncé sont
       les coefficients d'une équation) ;
     - si l'énoncé porte une équation de plan, les quatre coins du morceau de
       plan la vérifient — c'est ce contrôle qui a trouvé, le 22/11/2026, que
       l'arrondi à deux décimales sortait les coins du plan ;
     - si l'énoncé porte une représentation paramétrique, les points de la
       droite dessinée vérifient ce système.
*/

/**
 * LES SEULS ITEMS OÙ UN TRIPLET DE L'ÉNONCÉ N'EST VOLONTAIREMENT PAS DESSINÉ,
 * et pourquoi. Toute exception est ici, en clair : une liste courte qu'on relit
 * vaut mieux qu'une règle molle qui laisse passer de vraies fautes.
 */
const TRIPLETS_NON_DESSINES = {
  // « Le point (5 ; 2 ; 8) appartient-il à la droite … ? » — placer ce point à
  // côté de la droite RÉPOND à la question. On ne dessine que la droite.
  terminale_spe_esp_droite_fixed_6: "le point testé donnerait la réponse",
  // « plan passant par A(1 ; 2 ; 3) et admettant u(1 ; 0 ; 1) et v(0 ; 1 ; 1)
  // pour vecteurs directeurs » : u et v ENGENDRENT le morceau de plan dessiné,
  // ils n'en sont ni des points ni des arêtes. Le plan tracé est bien celui
  // qu'ils définissent (normale u ∧ v).
  terminale_spe_geo_concours_18: "u et v engendrent le plan, ils n'y sont pas tracés",
};

/** Les formules vivent entre deux « $ ». ⛔ Retirer les « $ » colle la formule
 *  au mot français qui la précède et casse toute lecture. */
const morceauxMaths = (texte) => texte.split("$").filter((_, i) => i % 2 === 1);
const sansEspaces = (s) => s.replace(/\\,/g, "").replace(/\s+/g, "");

/** « 2x + 3y - z + 1 = 0 », « x + y + z = 3 », « z = 2 » → [a, b, c, d]. */
function lireEquationDePlan(texte) {
  const motif = /^((?:[+-]?\d*[xyz])+(?:[+-]\d+)?)=([+-]?\d+)$/;
  for (const morceau of morceauxMaths(texte)) {
    const m = motif.exec(sansEspaces(morceau));
    if (!m) continue;
    const coef = { x: 0, y: 0, z: 0 };
    let cte = 0;
    for (const tok of m[1].matchAll(/([+-]?)(\d*)([xyz])|([+-]\d+)/g)) {
      if (tok[4]) {
        cte += Number(tok[4]);
        continue;
      }
      coef[tok[3]] += (tok[1] === "-" ? -1 : 1) * (tok[2] === "" ? 1 : Number(tok[2]));
    }
    return [coef.x, coef.y, coef.z, cte - Number(m[2])];
  }
  return null;
}

/** « x = 1 + 2t ; y = t ; z = 2 + 3t » → { a: [1,0,2], u: [2,1,3] }. */
function lireDroiteParametrique(texte) {
  const brut = sansEspaces(morceauxMaths(texte).join(";"))
    .replace(/\\begin\{cases\}|\\end\{cases\}/g, "")
    .replace(/\\\\/g, ";")
    .replace(/\\in\\mathbb\{R\}/g, "")
    .replace(/\\?;/g, ";");
  const valeurs = {};
  for (const v of ["x", "y", "z"]) {
    const m = new RegExp(v + "=([+-]?[\\d]*[+-]?[\\d]*t?)(?:;|$)").exec(brut);
    if (!m || !m[1].includes("t")) return null;
    // « 2+3t » → origine 2, direction 3 ; « -t » → 0 et -1 ; « 4t » → 0 et 4.
    // ⚠️ LE PIÈGE, TROUVÉ LE 22/11/2026 : sans le `(?=[+-])`, « 4t » se lisait
    // « origine 4, direction 1 », et l'instrument accusait deux figures
    // parfaitement justes. Une origine n'existe que si un signe la suit.
    const e = /^(?:([+-]?\d+)(?=[+-]))?([+-]?\d*)t$/.exec(m[1]);
    if (!e) return null;
    const dir = e[2] === "" || e[2] === "+" ? 1 : e[2] === "-" ? -1 : Number(e[2]);
    valeurs[v] = [e[1] ? Number(e[1]) : 0, dir];
  }
  return {
    a: [valeurs.x[0], valeurs.y[0], valeurs.z[0]],
    u: [valeurs.x[1], valeurs.y[1], valeurs.z[1]],
  };
}

function verifierFidelite(nom, texte, figure) {
  const points = figure.points ?? [];
  const equation = lireEquationDePlan(texte);
  if (equation) {
    const [a, b, c, d] = equation;
    if (a || b || c) {
      const dessus = points.filter((p) => Math.abs(a * p.x + b * p.y + c * p.z + d) < 1e-9).length;
      if (dessus < 4) {
        problemes.push(
          `${nom} — l'énoncé dit ${a}x + ${b}y + ${c}z + ${d} = 0, et seulement ${dessus} point(s) de la figure vérifient cette équation (les 4 coins du morceau de plan le doivent)`,
        );
      }
    }
    return; // les nombres de l'énoncé sont des coefficients, pas des points
  }

  const droite = lireDroiteParametrique(texte);
  if (droite) {
    const { a, u } = droite;
    const hors = points.filter((p) => {
      const w = [p.x - a[0], p.y - a[1], p.z - a[2]];
      const croix = [
        w[1] * u[2] - w[2] * u[1],
        w[2] * u[0] - w[0] * u[2],
        w[0] * u[1] - w[1] * u[0],
      ];
      return Math.hypot(...croix) > 1e-9;
    });
    // Une figure « droite + plan » porte aussi les quatre coins du plan : on
    // exige seulement qu'AU MOINS deux points soient sur la droite annoncée.
    if (points.length - hors.length < 2) {
      problemes.push(
        `${nom} — l'énoncé donne la droite (${a.join(" ; ")}) + t(${u.join(" ; ")}), et ${points.length - hors.length} point(s) seulement de la figure sont dessus`,
      );
    }
    return;
  }

  // Sinon : des points. Tout triplet écrit dans l'énoncé doit être dessiné.
  const trips = [];
  for (const m of texte.matchAll(/\(\s*(-?\d+)\s*\\,;\s*\\?,?\s*(-?\d+)\s*\\,;\s*\\?,?\s*(-?\d+)\s*\)/g)) {
    trips.push([Number(m[1]), Number(m[2]), Number(m[3])]);
  }
  if (!trips.length) return;
  const dessines = new Set(points.map((p) => `${p.x},${p.y},${p.z}`));
  // ⚠️ UN TRIPLET N'EST PAS TOUJOURS UN POINT. « de vecteur normal n(2 ; −1 ;
  // 3) » donne une DIRECTION : sur la figure, elle n'est pas un point, elle est
  // la direction d'un segment (et sa longueur est choisie pour le dessin). On
  // accepte donc aussi un triplet colinéaire à un segment tracé — sans quoi
  // l'instrument accuse une figure juste, ce qu'il a fait le 22/11/2026.
  const directions = (figure.segments ?? [])
    .map((s) => [points[s.de], points[s.a]])
    .filter(([p, q]) => p && q)
    .map(([p, q]) => [q.x - p.x, q.y - p.y, q.z - p.z]);
  const colineaire = (t) =>
    directions.some((d) => {
      const croix = [
        t[1] * d[2] - t[2] * d[1],
        t[2] * d[0] - t[0] * d[2],
        t[0] * d[1] - t[1] * d[0],
      ];
      return Math.hypot(...croix) < 1e-9 && Math.hypot(...d) > 1e-9;
    });
  const absents = trips.filter((t) => !dessines.has(t.join(",")) && !colineaire(t));
  // ⛔ LA RÈGLE EST « CHACUN », PAS « AU MOINS UN » — étalonnage du 22/11/2026.
  // Une première version ne criait que si AUCUN triplet n'était dessiné. On a
  // alors transposé exprès un point (B(4 ; 6 ; 3) dessiné en (4 ; 3 ; 6)) :
  // l'instrument n'a rien vu, parce que A, lui, était juste. « Un point
  // présent » ne prouve rien sur les autres.
  const permis = TRIPLETS_NON_DESSINES[nom.split(" / ")[1].replace(/ \[\d+\]$/, "")];
  if (permis) return;
  if (absents.length) {
    problemes.push(
      `${nom} — ${absents.map((t) => `(${t.join(" ; ")})`).join(" ")} : écrit dans l'énoncé, absent de la figure`,
    );
  }
}

let total = 0;
let avecFigure = 0;
for (const [fichier, banque] of BANQUES) {
  for (const item of banque) {
    total += 1;
    const figures = figuresDeLItem(item);
    if (!figures.length) continue;
    avecFigure += 1;
    // Un gabarit peut rendre douze fois la même figure : on ne garde que les
    // formes distinctes, sinon le rapport se noie.
    const distinctes = [...new Map(figures.map((f) => [JSON.stringify(f.figure), f])).values()];
    for (const [k, { figure, texte }] of distinctes.entries()) {
      const nom = `${fichier} / ${item.id}${distinctes.length > 1 ? ` [${k + 1}]` : ""}`;
      if (figure.kind !== "repere3d") continue;
      verifierStructure(nom, figure);
      verifierFidelite(nom, texte, figure);
      const html = renderToStaticMarkup(React.createElement(Repere3dCanvas, { figure }));
      const mesure = verifierRendu(nom, html);
      vus.push({ nom, html, mesure, titre: figure.titre ?? "" });
    }
  }
}

const sortie = resolve(process.cwd(), process.argv[2] ?? "apercu-figures-espace.html");
writeFileSync(
  sortie,
  `<!doctype html><meta charset="utf-8"><title>Figures de l'espace — terminale spé</title>
<style>
 body{font:15px/1.5 system-ui,sans-serif;margin:0;padding:24px;background:#f8fafc;color:#0f172a}
 h1{font-size:20px}
 .bloc{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin:0 0 16px}
 h2{font-size:14px;margin:0 0 8px;font-family:ui-monospace,monospace;color:#334155}
 .vues{display:flex;gap:16px;flex-wrap:wrap}
 figure{margin:0}
 figcaption{font-size:11px;color:#64748b;margin-bottom:4px}
 .cadre{border:1px dashed #cbd5e1}
</style>
<h1>${vus.length} figures de la géométrie dans l'espace, terminale spé</h1>
${vus
  .map(
    (v) => `<section class="bloc"><h2>${v.nom}</h2><div class="vues">${CADRES.map(
      (c) =>
        `<figure><figcaption>${c} px</figcaption><div class="cadre" style="width:${c}px">${v.html}</div></figure>`,
    ).join("")}</div></section>`,
  )
  .join("\n")}
`,
  "utf8",
);

console.log(`\n${total} items dans les trois banques de l'espace`);
console.log(`${avecFigure} items portent une figure · ${vus.length} figures distinctes rendues`);
console.log(`aperçu : ${sortie}`);

if (problemes.length) {
  console.error(`\n⛔ ${problemes.length} défaut(s) :`);
  for (const p of problemes) console.error(`  · ${p}`);
  process.exitCode = 1;
} else {
  console.log("\n✅ Aucun débordement, aucun texte trop petit, aucun nom superposé.");
}
