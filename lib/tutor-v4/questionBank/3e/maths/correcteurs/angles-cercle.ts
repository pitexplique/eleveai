import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { degresDe, longueursDe, reponseDegres, reponseLongueur, reponsePi, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE angles-cercle.bank.ts (05/11/2026) : ils relisent angles, longueurs
// et noms dans le TEXTE, et refont le calcul. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const surDegres = (f: (v: number[]) => number) => (q: Q) => {
  const d = degresDe(q.text);
  return d.length ? reponseDegres(q, f(d)) : ["angles illisibles"];
};
const surLongueurs = (f: (v: number[]) => number) => (q: Q) => {
  const l = longueursDe(q.text);
  return l.length ? reponseLongueur(q, f(l.map((m) => m.v)), l[0].u) : ["longueurs illisibles"];
};

function angleCentreOuInscrit(q: Q) {
  const nom = String(q.expected[0]);
  const auCentre = /au centre/.test(q.text) && !/inscrit/.test(q.text);
  const sommet = nom[1];
  if (auCentre && sommet !== "O") return ["le sommet d’un angle au centre est O"];
  if (!auCentre && (sommet === "O" || nom.includes("O"))) return ["un angle inscrit n’a pas O pour point"];
  return [];
}

function comparerOuDiviser(q: Q) {
  if (/plus grand|mesure le plus/.test(q.text)) {
    const c = q.text.match(/\$\\widehat\{[A-Z]O[A-Z]\}\$/)?.[0];
    return c ? reponseQcm(q, `${c}, le double de l’autre`) : ["angle au centre illisible"];
  }
  return reponseQcm(q, "2");
}

function repartition(q: Q) {
  const n = Number(q.text.match(/porte (\d+) /)?.[1]);
  const k = Number(q.text.match(/par (\d+) intervalles/)?.[1]);
  return n && k ? reponseDegres(q, ((360 / n) * k) / 2) : ["nombre et intervalles illisibles"];
}

function angleEgal(q: Q) {
  const p = q.text.match(/([A-Z]), ([A-Z]), ([A-Z]),? (?:et )?([A-Z])/);
  return p ? reponseQcm(q, `${p[1]}${p[4]}${p[2]}`) : ["ordre des points illisible"];
}

function natureDemi(q: Q) {
  const d = q.text.match(/\[([A-Z])([A-Z])\]/);
  if (!d) return ["diamètre illisible"];
  const tri = q.text.match(/triangle ([A-Z]{3})/)?.[1] ?? "";
  const seuls = [...q.text.matchAll(/\b[A-Z]\b/g)].map((m) => m[0]);
  const m = [...tri.split(""), ...seuls].find((x) => x !== d[1] && x !== d[2]);
  return m ? reponseQcm(q, `rectangle en ${m}`) : ["troisième point illisible"];
}

function reciproque(q: Q) {
  const l = longueursDe(q.text);
  const noms = [...q.text.matchAll(/([A-Z])([A-Z]) = /g)];
  if (l.length !== 3 || noms.length !== 3) return ["longueurs illisibles"];
  const [z, x, y] = l.map((m) => m.v);
  const A = noms[1][0].slice(0, 2);
  const B = noms[2][0].slice(0, 2);
  const H = noms[0][0].slice(0, 2);
  const juste = x * x + y * y === z * z ? `Oui : ${A}² + ${B}² = ${H}²` : `Non : ${A}² + ${B}² ≠ ${H}²`;
  return reponseQcm(q, juste);
}

function positionPlan(q: Q) {
  const l = longueursDe(q.text);
  if (l.length !== 2) return ["longueurs illisibles"];
  const distanceDabord = /^Un plan se trouve/.test(q.text);
  const [R, d] = distanceDabord ? [l[1].v, l[0].v] : [l[0].v, l[1].v];
  const juste = d < R ? "Le plan coupe la sphère selon un cercle" : d === R ? "Le plan touche la sphère en un seul point" : "Le plan ne touche pas la sphère";
  return reponseQcm(q, juste);
}

function plusGrandeSection(q: Q) {
  const l = longueursDe(q.text);
  if (l.length !== 3) return ["longueurs illisibles"];
  return l[1].v < l[2].v ? reponseQcm(q, "Celle du plan P") : ["P doit être le plus proche"];
}

function rayonSection(q: Q) {
  const [R, d] = longueursDe(q.text);
  return R && d ? reponseLongueur(q, Math.sqrt(R.v ** 2 - d.v ** 2), R.u) : ["longueurs illisibles"];
}

function aireSection(q: Q) {
  const [R, d] = longueursDe(q.text);
  return R && d ? reponsePi(q, R.v ** 2 - d.v ** 2, `${R.u}²`) : ["longueurs illisibles"];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  angle_inscrit_centre_tpl_1: surDegres(([c]) => c / 2),
  angle_inscrit_centre_tpl_2: surDegres(([i]) => 2 * i),
  angle_inscrit_centre_tpl_3: angleCentreOuInscrit,
  angle_inscrit_centre_tpl_4: comparerOuDiviser,
  angle_inscrit_centre_tpl_5: repartition,
  angle_inscrit_centre_tpl_6: surDegres(([b]) => 180 - 2 * b),
  angle_inscrit_centre_tpl_7: surDegres(([b]) => (180 - 2 * b) / 2),
  angle_inscrit_centre_tpl_8: surDegres(([x]) => 180 - x),

  angles_inscrits_meme_arc_tpl_1: surDegres(([i]) => i),
  angles_inscrits_meme_arc_tpl_2: (q) => reponseQcm(q, "Ils sont égaux"),
  angles_inscrits_meme_arc_tpl_3: angleEgal,
  angles_inscrits_meme_arc_tpl_4: surDegres(([x, y]) => 180 - x - y),
  angles_inscrits_meme_arc_tpl_5: surDegres(([i]) => i),
  angles_inscrits_meme_arc_tpl_6: surDegres(([i]) => 3 * i),
  angles_inscrits_meme_arc_tpl_7: surDegres(([i, x]) => 180 - i - x),
  angles_inscrits_meme_arc_tpl_8: surDegres(([x, y]) => 360 - x - y),

  triangle_demi_cercle_tpl_1: (q) => (/diam/.test(q.text) ? reponseDegres(q, 90) : ["pas de diamètre"]),
  triangle_demi_cercle_tpl_2: natureDemi,
  triangle_demi_cercle_tpl_3: surDegres(([x]) => 90 - x),
  triangle_demi_cercle_tpl_4: surLongueurs(([h]) => h / 2),
  triangle_demi_cercle_tpl_5: surLongueurs(([z, x]) => Math.sqrt(z * z - x * x)),
  triangle_demi_cercle_tpl_6: surLongueurs(([x, y]) => Math.hypot(x, y)),
  triangle_demi_cercle_tpl_7: reciproque,
  triangle_demi_cercle_tpl_8: surLongueurs(([x, y]) => Math.hypot(x, y) / 2),

  section_sphere_tpl_1: (q) => (/sphère/.test(q.text) ? reponseQcm(q, "un cercle") : ["pas de sphère"]),
  section_sphere_tpl_2: surLongueurs(([R]) => R),
  section_sphere_tpl_3: positionPlan,
  section_sphere_tpl_4: plusGrandeSection,
  section_sphere_tpl_5: rayonSection,
  section_sphere_tpl_6: rayonSection,
  section_sphere_tpl_7: rayonSection,
  section_sphere_tpl_8: aireSection,
});
