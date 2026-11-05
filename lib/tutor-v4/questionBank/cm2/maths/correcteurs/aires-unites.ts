import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { nombres, num, reponse, texte, type Q } from "./outils";

// LES CORRECTEURS DE aires-unites.bank.ts. Vide = juste.

/** L'unité qui convient à un objet, relue d'après un mot de l'énoncé. */
const MOTS: [RegExp, string][] = [
  [/timbre|carte à jouer|gomme|pièce de monnaie|ticket|post-it|carré de chocolat|photo d/, "cm²"],
  [/feuille de cahier|livre de poche|ardoise|assiette|sous-main|tablette|boîte à chaussures|plateau repas/, "dm²"],
  [/chambre|salle de classe|cour de récréation|garage|terrain de tennis|tatami|tableau de classe/, "m²"],
  [/une île|grande ville|département|forêt immense|parc national|grand lac|un pays|mer intérieure/, "km²"],
];
const uniteAdaptee = (q: Q) => {
  const m = MOTS.find(([r]) => r.test(q.text));
  return m ? texte(q, m[1]) : ["objet inconnu"];
};
const COTES: Record<string, string[]> = { "1 cm²": ["1 cm"], "1 dm²": ["10 cm"], "1 m²": ["1 m", "10 dm"] };
const coteUnite = (q: Q) => {
  const m = q.text.match(/1 (?:cm|dm|m)²/);
  if (!m) return ["unité illisible"];
  const ok = (q.choices ?? []).filter((c) => COTES[m[0]].includes(c));
  return ok.length === 1 ? texte(q, ok[0]) : [`${ok.length} justes`];
};
const grille = (q: Q) => {
  const f = q.canvas as any;
  if (f.grid.filledCells.length !== 100) return ["grille incomplète"];
  return reponse(q, f.grid.rows * f.grid.cols, "cm²");
};
/** Une aire possible : la bonne est celle dont l'unité convient à l'objet. */
const airePossible = (q: Q) => {
  const m = MOTS.find(([r]) => r.test(q.text));
  const u = m?.[1] ?? (/table d|serviette/.test(q.text) ? (/serviette/.test(q.text) ? "dm²" : "m²") : null);
  if (!u) return ["objet inconnu"];
  const e = String(q.expected[0]);
  if (!e.endsWith(u)) return [`${e} : l'unité devrait être ${u}`];
  return [];
};
const ORDRE = ["1 cm²", "1 dm²", "1 m²", "1 km²"];
const plusGrande = (q: Q) => {
  const l = ORDRE.filter((u) => q.text.includes(u));
  const j = /plus grande/.test(q.text) ? l[l.length - 1] : l[0];
  return texte(q, j);
};
const aireCarre = (q: Q) => {
  const m = q.text.match(/(\d+) (cm|dm|m|km)/);
  if (!m) return ["côté illisible"];
  return reponse(q, Number(m[1]) ** 2, `${m[2]}²`);
};
const dalles = (q: Q) => {
  const [L, l] = nombres(q.text);
  return reponse(q, L * l, "dalles");
};
const carresDm = (q: Q) => reponse(q, nombres(q.text)[0] / 100);

/* convertir : on relit les unités et on compte en carrés de 1 cm². */
const EN_CM2: Record<string, number> = { "cm²": 1, "dm²": 100, "m²": 10000 };
const conversion = (q: Q) => {
  const m = q.text.match(/([\d ,]*\d) (cm²|dm²|m²)(?: = …)? (?:en )?(cm²|dm²|m²)?/);
  const u = q.text.match(/(?:…|en) (cm²|dm²|m²)/);
  if (!m || !u) return ["conversion illisible"];
  return reponse(q, (num(m[1]) * EN_CM2[m[2]]) / EN_CM2[u[1]], u[1]);
};
const colorie = (q: Q) => reponse(q, (q.canvas as any).grid.filledCells.length, "cm²");
const compare = (q: Q) => {
  const m = q.text.match(/^(.+?) a une aire de (\d+) dm²\. (.+?) a une aire de ([\d ]+) cm²/);
  if (!m) return ["énoncé illisible"];
  const a = Number(m[2]) * 100;
  const b = num(m[4]);
  return texte(q, a > b ? m[1] : b > a ? m[3] : "Ils ont la même aire");
};
const carreaux = (q: Q) => {
  const m = q.text.match(/de (\d+) m²/);
  if (!m) return ["aire illisible"];
  return reponse(q, Number(m[1]) * 100, "carreaux");
};
const mur = (q: Q) => {
  const m = q.text.match(/colle (\d+) .+? de (\d+) cm²/);
  if (!m) return ["énoncé illisible"];
  return reponse(q, (Number(m[1]) * Number(m[2])) / 100, "dm²");
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  aire_unites_tpl_1: uniteAdaptee,
  aire_unites_tpl_2: coteUnite,
  aire_unites_tpl_3: grille,
  aire_unites_tpl_4: airePossible,
  aire_unites_tpl_5: plusGrande,
  aire_unites_tpl_6: aireCarre,
  aire_unites_tpl_7: uniteAdaptee,
  aire_unites_tpl_8: dalles,
  aire_unites_tpl_9: carresDm,
  aire_convertir_unites_tpl_1: conversion,
  aire_convertir_unites_tpl_2: conversion,
  aire_convertir_unites_tpl_3: colorie,
  aire_convertir_unites_tpl_4: conversion,
  aire_convertir_unites_tpl_5: conversion,
  aire_convertir_unites_tpl_6: conversion,
  aire_convertir_unites_tpl_7: compare,
  aire_convertir_unites_tpl_8: carreaux,
  aire_convertir_unites_tpl_9: mur,
});
