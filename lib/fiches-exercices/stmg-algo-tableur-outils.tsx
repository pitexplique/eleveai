// ─── Outils des feuilles STMG « algorithmique, tableur, logique » (05/11/2026) ──
//
// ⭐ POURQUOI CE FICHIER.
//   · `feuille` : la feuille de calcul dessinée (colonnes A, B, C…, lignes
//     numérotées). Elle vient de `maths-premiere-info-tableur.tsx`, où elle reste
//     privée. Texte NU : le `$` d'une référence absolue s'y écrit tel quel.
//   · `abs` : une référence absolue DANS UNE PHRASE. ⛔ `TexteMath` coupe le texte
//     sur chaque `$`, sans échappement : « =B3*$D$1 » écrit tel quel avalerait ses
//     dollars. On passe donc par KaTeX, avec `\textdollar`, qui n'est pas un `$`
//     pour le découpage. Rendu contrôlé dans KaTeX : « =B3*$D$1 ».
//   · `liste`, `somme`, `produit`, `parTaux` : les écritures justes d'une même
//     réponse (une liste Python, une formule écrite dans un autre ordre).

import type { ReactNode } from "react";

type Cellule = string | number;
const affiche = (v: Cellule) => (typeof v === "number" ? String(v).replace(".", ",") : v);

/**
 * Une FEUILLE DE CALCUL : colonnes A, B, C…, lignes numérotées à partir de 1.
 * Une case qui commence par « = » est une formule (écrite en bleu).
 * `surligne` : des cellules (« B3 »). `barre` : la barre de formule [cellule, formule].
 * ⛔ Texte NU, 5 colonnes au plus ; une feuille large défile sur téléphone.
 */
export const feuille = (lignes: Cellule[][], opts: { surligne?: string[]; barre?: [string, string] } = {}): ReactNode => {
  const nbCol = Math.max(...lignes.map((l) => l.length));
  const lettres = Array.from({ length: nbCol }, (_, j) => String.fromCharCode(65 + j));
  const surligne = opts.surligne ?? [];
  return (
    <div className="mx-auto w-full max-w-[24rem] print:max-w-[16rem]">
      {opts.barre ? (
        <div className="mb-1 flex items-center gap-2 rounded border border-slate-300 bg-white px-2 py-0.5 font-mono text-[13px] print:text-[9px]">
          <span className="font-bold text-slate-500">{opts.barre[0]}</span>
          <span className="italic text-slate-400">fx</span>
          <span className="font-semibold text-blue-700">{opts.barre[1]}</span>
        </div>
      ) : null}
      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full border-collapse text-center font-mono text-[12px] sm:text-[13px] print:text-[9px]">
          <thead>
            <tr>
              <th className="w-5 border border-slate-300 bg-slate-100" />
              {lettres.map((l) => (
                <th key={l} className="border border-slate-300 bg-slate-100 px-0.5 py-0.5 font-semibold text-slate-600">
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lignes.map((ligne, i) => (
              <tr key={i}>
                <th className="border border-slate-300 bg-slate-100 px-0.5 py-0.5 font-semibold text-slate-600">{i + 1}</th>
                {lettres.map((col, j) => {
                  const val = ligne[j] ?? "";
                  const on = surligne.includes(`${col}${i + 1}`);
                  const formule = typeof val === "string" && val.startsWith("=");
                  return (
                    <td
                      key={j}
                      className={`whitespace-nowrap border border-slate-300 px-0.5 py-0.5 sm:px-1.5 ${formule ? "text-blue-700" : "text-slate-800"} ${i === 0 ? "font-semibold" : ""} ${on ? "bg-amber-100 font-bold" : ""}`}
                    >
                      {affiche(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/** Une formule avec des `$`, à écrire dans une phrase : `Réponse : ${abs("=B3*$D$1")}.` */
export const abs = (formule: string) => "$\\texttt{" + formule.replace(/\$/g, "\\textdollar ").replace(/,/g, "{,}") + "}$";

/**
 * Les écritures justes d'une liste d'entiers, à donner avec `ordre: true`.
 * `n` : éléments à la suite, Python ou points-virgules, crochets ou non.
 */
export const liste = (...n: number[]) => [n.join(" ; "), `[${n.join(", ")}]`, n.join(", "), `[${n.join(" ; ")}]`];

/* ─── Les FORMULES acceptées (`exact: true`, donc seules les formes listées passent) ─
   ⭐ Relecture du 05/11 : une formule se donne aussi sans « = » (`B3*C3`), et
   « D3=B3*C3 » passe alors tout seul : le correcteur enlève le membre de gauche. */

/** Chaque formule, avec et sans son « = ». */
export const formule = (...formes: string[]) => [...new Set(formes.flatMap((f) => (f.startsWith("=") ? [f, f.slice(1)] : [f])))];

/** Les seules formes qui écrivent le « = » : quand l'exercice porte sur cet oubli. */
export const avecEgal = (formes: string[]) => formes.filter((f) => f.startsWith("="));

// Une référence encore relative : ni dollar devant, ni dollar entre lettre et chiffre.
const RELATIVE = /(?<![$A-Z])([A-Z])(\d+)/;
const deplier = (f: string, variante: (col: string, lig: string) => string): string[] => {
  const m = RELATIVE.exec(f);
  if (!m) return [f];
  const debut = f.slice(0, m.index);
  const fin = f.slice(m.index + m[0].length);
  // On pose un marqueur « § » sur le morceau traité, pour passer à la référence suivante.
  return [`${m[1]}§${m[2]}`, variante(m[1], m[2])].flatMap((r) => deplier(debut + r + fin, variante));
};
const nettoyer = (fs: string[]) => [...new Set(fs.map((f) => f.replace(/§/g, "")))];

/**
 * Pour une formule à écrire puis recopier VERS LE BAS : figer la COLONNE d'une
 * référence ne change rien ($B2 suit la ligne). =$B2*1,05 est donc juste.
 */
export const bas = (formes: string[]) => nettoyer(formes.flatMap((f) => deplier(f, (c, l) => `$${c}§${l}`)));

/** Vers la DROITE : c'est figer la LIGNE qui ne change rien (B$2 suit la colonne). */
export const droite = (formes: string[]) => nettoyer(formes.flatMap((f) => deplier(f, (c, l) => `${c}$${l}`)));

/** La somme de cellules : tout ordre, et SOMME pour qui la connaît (non demandée). */
export const somme = (a: string, b: string, c: string) =>
  formule(
    `=${a}+${b}+${c}`,
    `=${a}+${c}+${b}`,
    `=${b}+${a}+${c}`,
    `=${b}+${c}+${a}`,
    `=${c}+${a}+${b}`,
    `=${c}+${b}+${a}`,
    `=SOMME(${a}:${c})`,
    `=SOMME(${a};${b};${c})`,
  );

/** Un produit de deux termes, dans les deux sens. */
export const produit = (a: string, b: string) => formule(`=${a}*${b}`, `=${b}*${a}`);

/** Un nombre en écriture de tableur français : 1.05 → « 1,05 ». */
const fr = (x: number) => String(Number(x.toFixed(6))).replace(".", ",");
/** 1,5 s'écrit aussi 1,50. */
const avecZero = (s: string) => (/,\d$/.test(s) ? [s, s + "0"] : [s]);

/** Toutes les écritures de « c, plus ou moins t % de c », t en pourcentage (t < 0 : baisse). */
const evolution = (c: string, t: number) => {
  const taux = Math.abs(t);
  const s = t > 0 ? "+" : "-";
  const coefs = [...avecZero(fr(1 + t / 100)), `${100 + t}%`];
  const parts = [...avecZero(fr(taux / 100)), `${taux}%`];
  return formule(
    ...coefs.flatMap((k) => [`=${c}*${k}`, `=${k}*${c}`]),
    ...parts.flatMap((r) => [
      `=${c}${s}${c}*${r}`,
      `=${c}${s}${r}*${c}`,
      `=${c}*(1${s}${r})`,
      `=(1${s}${r})*${c}`,
      ...(t > 0 ? [`=${r}*${c}+${c}`, `=${c}*${r}+${c}`, `=${c}*(${r}+1)`, `=(${r}+1)*${c}`] : []),
    ]),
  );
};

/** Une hausse de t % de la cellule c : =B2*1,05, =B2*105%, =B2+B2*0,05, =B2*(1+5%)… */
export const hausse = (c: string, t: number) => evolution(c, t);

/** Une baisse de t % de la cellule c : =D2*0,85, =D2*85%, =D2-D2*0,15… */
export const baisse = (c: string, t: number) => evolution(c, -t);

/**
 * Une hausse dont le TAUX est rangé dans une cellule figée : =B2*(1+$D$1), =B2+B2*$D$1…
 * D$1 et $D$1, B2 et $B2 sont justes ; =B2*(1+D1) et =$B$2*(1+$D$1) restent refusés.
 */
export const hausseParCellule = (c: string, col: string, lig: number) =>
  formule(
    ...[c, "$" + c].flatMap((x) =>
      ["$" + col + "$" + lig, col + "$" + lig].flatMap((t) => [
        `=${x}*(1+${t})`,
        `=(1+${t})*${x}`,
        `=${x}*(${t}+1)`,
        `=(${t}+1)*${x}`,
        `=${x}+${x}*${t}`,
        `=${x}+${t}*${x}`,
        `=${t}*${x}+${x}`,
        `=${x}*${t}+${x}`,
      ]),
    ),
  );

/**
 * « =B2*$D$1 » à recopier VERS LE BAS : seule la LIGNE du taux doit être figée.
 * D$1, $D$1 et $B2 sont donc justes aussi ; =B2*D1 et =$B$2*$D$1 restent refusés.
 */
export const parTaux = (cellule: string, col: string, lig: number) =>
  [cellule, "$" + cellule].flatMap((c) => ["$" + col + "$" + lig, col + "$" + lig].flatMap((t) => produit(c, t)));

/* ─── Les réponses par un mot : avec ou sans article, comme l'élève les tape ─── */

export const cellule = (c: string) => [c, `cellule ${c}`, `la cellule ${c}`, `en ${c}`];
export const COURBE = ["courbe", "une courbe", "la courbe", "graphique en courbe", "diagramme en courbe"];
export const CIRCULAIRE = ["circulaire", "diagramme circulaire", "un diagramme circulaire", "le diagramme circulaire", "camembert", "un camembert", "le camembert"];
export const BARRES = ["barres", "barre", "en barres", "diagramme en barres", "un diagramme en barres", "le diagramme en barres", "diagramme à barres", "diagramme en barre", "un diagramme à barres", "des barres"];
