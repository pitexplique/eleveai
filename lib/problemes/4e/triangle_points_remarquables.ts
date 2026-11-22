// Énigmes à projeter — 4e, notion triangle_points_remarquables (hors
// programme français, gardée pour /pays). Le château d'eau des trois villages
// (médiatrices), le kiosque du jardin (bissectrices), le carton en équilibre
// (centre de gravité aux deux tiers), le champ partagé (médiane), piège du
// triangle obtus, défi des guirlandes du triangle rectangle.
// Figures au bon rapport : coordonnées calculées ci-dessous. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const SB = S.replace(` fill="none"`, "");
const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
type P = [number, number];
const mil = (a: P, b: P): P => [r1((a[0] + b[0]) / 2), r1((a[1] + b[1]) / 2)];
const seg = (a: P, b: P, att = S) => `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" ${att}/>`;
const pt = (p: P, nom: string, dx: number, dy: number, coul: string = C.craie) =>
  `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${coul}"/>` +
  `<text x="${r1(p[0] + dx)}" y="${r1(p[1] + dy)}" fill="${coul}" font-size="24" text-anchor="middle">${nom}</text>`;
const tri = (a: P, b: P, c: P, att: string) => `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]} Z" ${att}/>`;
const POINTILLE = (c: string) => `stroke="${c}" stroke-width="3" stroke-dasharray="8 7" stroke-linecap="round" fill="none"`;
const angleDroit = (H: P, u: P, v: P, t = 16) =>
  `<path d="M${r1(H[0] + t * u[0])} ${r1(H[1] + t * u[1])} L${r1(H[0] + t * (u[0] + v[0]))} ${r1(H[1] + t * (u[1] + v[1]))} L${r1(H[0] + t * v[0])} ${r1(H[1] + t * v[1])}" stroke="${C.craie}" stroke-width="2.5" fill="none"/>`;

// Les trois villages : triangle à angles aigus.
const villages = () => {
  const A: P = [90, 320], B: P = [400, 330], Cc: P = [250, 90];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois villages A, B et C forment un triangle ; où placer un château d'eau à la même distance des trois ?">
  ${tri(A, B, Cc, `fill="${C.jaune}" fill-opacity=".12" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"`)}
  <text x="${A[0] - 4}" y="${A[1] + 6}" font-size="38" text-anchor="middle">🏘️</text>
  <text x="${B[0] + 4}" y="${B[1] + 6}" font-size="38" text-anchor="middle">🏘️</text>
  <text x="${Cc[0]}" y="${Cc[1] + 6}" font-size="38" text-anchor="middle">🏘️</text>
  <text x="${A[0] - 30}" y="${A[1] + 50}" fill="${C.craie}" font-size="24" text-anchor="middle">A</text>
  <text x="${B[0] + 30}" y="${B[1] + 50}" fill="${C.craie}" font-size="24" text-anchor="middle">B</text>
  <text x="${Cc[0] + 36}" y="${Cc[1] - 20}" fill="${C.craie}" font-size="24" text-anchor="middle">C</text>
  <text x="248" y="262" fill="${C.rose}" font-size="36" text-anchor="middle">?</text>
  <text x="248" y="300" fill="${C.pale}" font-size="20" text-anchor="middle">château d'eau</text>
  </svg>`;
};

// Le jardin : I centre du cercle inscrit (calculé : a = 295,5 ; b = 361,2 ;
// c = 360 ; r ≈ 95,6) ; H1, H2, H3 pieds des perpendiculaires sur les côtés.
const jardin = () => {
  const A: P = [60, 350], B: P = [420, 350], Cc: P = [300, 80], I: P = [272.9, 254.4];
  const H1: P = [272.9, 350], H2: P = [360.3, 215.6], H3: P = [201.5, 190.8];
  const ROUTE = `stroke="${C.pale}" stroke-width="16" stroke-linecap="round" stroke-opacity=".45"`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un jardin triangulaire bordé de trois routes ; un kiosque à la même distance des trois routes">
  ${seg(A, B, ROUTE)}${seg(B, Cc, ROUTE)}${seg(Cc, A, ROUTE)}
  ${tri(A, B, Cc, `fill="${C.jaune}" fill-opacity=".2" ${SB}`)}
  ${seg(I, H1, POINTILLE(C.bleu))}${seg(I, H2, POINTILLE(C.bleu))}${seg(I, H3, POINTILLE(C.bleu))}
  ${angleDroit(H1, [-1, 0], [0, -1], 12)}
  <text x="${I[0]}" y="${I[1] + 12}" font-size="34" text-anchor="middle">🎪</text>
  ${pt(A, "A", -18, 28)}${pt(B, "B", 18, 28)}${pt(Cc, "C", 0, -16)}
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">trois distances égales${NB}: quelles droites${NB}?</text>
  </svg>`;
};

// Le carton : médiane AM ≈ 304,6 px pour 18 cm ; G aux deux tiers depuis A.
const carton = () => {
  const A: P = [120, 70], B: P = [60, 370], Cc: P = [420, 330];
  const M = mil(B, Cc), G: P = [200, 256.7];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle en carton ABC, ses trois médianes se coupent en G ; la médiane AM mesure 18 cm">
  ${tri(A, B, Cc, `fill="${C.jaune}" fill-opacity=".25" ${SB}`)}
  ${seg(B, mil(A, Cc), POINTILLE(C.pale))}${seg(Cc, mil(A, B), POINTILLE(C.pale))}
  ${seg(A, M, `stroke="${C.bleu}" stroke-width="5" stroke-linecap="round"`)}
  ${pt(A, "A", -18, -6)}${pt(B, "B", -20, 10)}${pt(Cc, "C", 22, 8)}${pt(M, "M", 6, 32, C.bleu)}${pt(G, "G", 26, -6, C.rose)}
  <text x="${G[0] - 6}" y="${G[1] + 50}" font-size="34" text-anchor="middle">☝️</text>
  <text x="330" y="400" fill="${C.bleu}" font-size="22" text-anchor="middle">AM = 18 cm</text>
  <text x="200" y="185" fill="${C.rose}" font-size="26" text-anchor="middle">?</text>
  </svg>`;
};

// Le champ : 5 px par mètre ; BC = 80 m (400 px), P au milieu.
const champ = () => {
  const A: P = [330, 70], B: P = [40, 360], Cc: P = [440, 360], Pp: P = [240, 360];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un champ triangulaire ABC partagé par une clôture droite de A à un point P de [BC] en deux parts de même aire">
  ${tri(A, B, Pp, `fill="${C.jaune}" fill-opacity=".3" stroke="none"`)}${tri(A, Pp, Cc, `fill="${C.bleu}" fill-opacity=".2" stroke="none"`)}
  ${tri(A, B, Cc, S)}
  ${seg(A, Pp, `stroke="${C.rose}" stroke-width="4" stroke-dasharray="4 8" stroke-linecap="round"`)}
  ${pt(A, "A", 0, -16)}${pt(B, "B", -16, 30)}${pt(Cc, "C", 16, 30)}${pt(Pp, "P", 0, 30, C.rose)}
  <text x="140" y="300" font-size="30" text-anchor="middle">👧</text><text x="330" y="300" font-size="30" text-anchor="middle">👩</text>
  <text x="140" y="404" fill="${C.rose}" font-size="22" text-anchor="middle">BP = ?</text>
  <text x="380" y="404" fill="${C.craie}" font-size="22" text-anchor="middle">BC = 80 m</text>
  </svg>`;
};

// Les fermes : angle en B ≈ 124° (obtus). Le point O (240 ; 380,5) n'est pas tracé.
const fermes = () => {
  const A: P = [50, 250], B: P = [240, 150], Cc: P = [430, 250];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois fermes A, B, C ; l'angle en B est obtus ; où est le point à égale distance des trois ?">
  ${tri(A, B, Cc, `fill="${C.jaune}" fill-opacity=".15" ${SB}`)}
  <path d="M${r1(B[0] - 0.885 * 40)} ${r1(B[1] + 0.466 * 40)} A40 40 0 0 0 ${r1(B[0] + 0.885 * 40)} ${r1(B[1] + 0.466 * 40)}" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${pt(A, "A", -4, 34)}${pt(B, "B", 0, -40)}${pt(Cc, "C", 4, 34)}
  <text x="${A[0] + 10}" y="${A[1] - 14}" font-size="30" text-anchor="middle">🏡</text>
  <text x="${B[0] + 34}" y="${B[1] - 12}" font-size="30" text-anchor="middle">🏡</text>
  <text x="${Cc[0] - 10}" y="${Cc[1] - 14}" font-size="30" text-anchor="middle">🏡</text>
  <text x="240" y="232" fill="${C.rose}" font-size="20" text-anchor="middle">angle obtus</text>
  <text x="240" y="330" fill="${C.pale}" font-size="20" text-anchor="middle">Jade${NB}: «${NB}O est à l'intérieur${NB}»</text>
  <text x="240" y="370" fill="${C.craie}" font-size="22" text-anchor="middle">Où est O${NB}?</text>
  </svg>`;
};

// Les trois arbres : 35 px par mètre ; AB = 6 m (210 px), BC = 8 m (280 px).
const arbres = () => {
  const A: P = [90, 140], B: P = [90, 350], Cc: P = [370, 350], O = mil(A, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois arbres A, B, C : AB 6 m, BC 8 m, angle droit en B ; un mât à égale distance des trois">
  ${tri(A, B, Cc, `fill="${C.jaune}" fill-opacity=".12" stroke="${C.pale}" stroke-width="3"`)}
  ${angleDroit(B, [1, 0], [0, -1])}
  <text x="${A[0]}" y="${A[1] - 8}" font-size="38" text-anchor="middle">🌳</text>
  <text x="${B[0] - 30}" y="${B[1] + 14}" font-size="38" text-anchor="middle">🌳</text>
  <text x="${Cc[0] + 30}" y="${Cc[1] + 14}" font-size="38" text-anchor="middle">🌳</text>
  ${pt(A, "A", 26, 8)}${pt(B, "B", 14, 32)}${pt(Cc, "C", -6, 32)}
  <text x="58" y="250" fill="${C.craie}" font-size="22" text-anchor="middle">6 m</text>
  <text x="230" y="385" fill="${C.craie}" font-size="22" text-anchor="middle">8 m</text>
  <text x="${O[0] + 26}" y="${O[1] - 18}" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="350" y="120" fill="${C.pale}" font-size="20" text-anchor="middle">un mât, trois guirlandes</text>
  <text x="350" y="148" fill="${C.pale}" font-size="20" text-anchor="middle">de même longueur</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "triangle_points_remarquables",
  titre: "Énigmes des points remarquables du triangle",
  description: "Le château d'eau des trois villages, le kiosque du jardin, le carton en équilibre, le champ partagé, le piège du triangle obtus, le défi des guirlandes : médiatrices, bissectrices, médianes et leurs points de concours.",
  problemes: [
    {
      tag: "Énigme 1 · Le château d'eau",
      titre: "À égale distance des villages",
      question: `Trois villages A, B et C veulent un château d'eau à la même distance des trois villages.<br><br>Quelles droites faut-il tracer pour trouver où le construire ?`,
      reponse: `Les points à égale distance de A et de B sont sur la médiatrice de [AB].<br>Le point à égale distance de A, B et C est sur les trois <span class="big">médiatrices</span> : elles se coupent en un seul point O.<br>O est le centre du cercle qui passe par A, B et C : le cercle circonscrit.`,
      consigne: "Quelles droites tracer pour être à égale distance de A, B et C ?",
      verification: { type: "qcm", choix: ["Les médiatrices des côtés", "Les bissectrices des angles", "Les médianes"], bonne: 0 },
      dessin: villages(),
    },
    {
      tag: "Énigme 2 · Le jardin public",
      titre: "Le kiosque entre trois routes",
      question: `Un jardin public a la forme d'un triangle. Il est bordé par trois routes.<br>On veut placer le kiosque à la même distance des trois routes.<br><br>Quelles droites faut-il tracer ?`,
      reponse: `Les points à égale distance des deux côtés d'un angle sont sur sa bissectrice.<br>Le point à égale distance des trois côtés est sur les trois <span class="big">bissectrices</span> : elles se coupent en un point I.<br>I est le centre du cercle inscrit : ce cercle touche les trois routes.<br>La distance à une route se mesure sur la perpendiculaire.`,
      consigne: "Quelles droites tracer pour être à égale distance des trois côtés ?",
      verification: { type: "qcm", choix: ["Les médianes", "Les bissectrices des angles", "Les hauteurs"], bonne: 1 },
      dessin: jardin(),
    },
    {
      tag: "Énigme 3 · L'équilibre",
      titre: "Le carton sur un doigt",
      question: `Rose découpe un triangle ABC en carton. Elle trace la médiane [AM] : elle mesure 18 cm.<br>Le carton tient en équilibre sur son doigt au centre de gravité G, là où se coupent les trois médianes.<br><br>Combien mesure AG ?`,
      reponse: `Le centre de gravité est aux deux tiers de chaque médiane, en partant du sommet.<br>AG = ${frac(2, 3)} × 18 = 36 ÷ 3 = <span class="big">12 cm</span>.<br>Et GM = 18 − 12 = 6 cm : AG est le double de GM.`,
      consigne: "Combien mesure AG, en cm ?",
      verification: { type: "courte", attendus: ["12"], unite: "cm" },
      dessin: carton(),
    },
    {
      tag: "Énigme 4 · L'héritage",
      titre: "Le champ partagé",
      question: `Deux sœurs reçoivent un champ triangulaire ABC. Le côté [BC] mesure 80 m.<br>Elles posent une clôture droite de A jusqu'à un point P de [BC]. Les deux parts doivent avoir la même aire.<br><br>À quelle distance de B faut-il placer P ?`,
      reponse: `Les triangles ABP et APC ont la même hauteur : la distance de A à la droite (BC).<br>Leurs aires sont égales si leurs bases sont égales : BP = PC.<br>P est le milieu de [BC] : la clôture est la <b>médiane</b> issue de A.<br>BP = 80 ÷ 2 = <span class="big">40 m</span>.`,
      consigne: "À quelle distance de B faut-il placer P, en mètres ?",
      verification: { type: "courte", attendus: ["40"], unite: "m" },
      dessin: champ(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le triangle obtus",
      sorte: "piege",
      question: `Trois fermes A, B et C forment un triangle. L'angle en B est obtus.<br>On cherche le point O à la même distance des trois fermes.<br>Jade dit : « O est forcément à l'intérieur du triangle. »<br><br><b>Où se trouve O ?</b>`,
      reponse: `Jade s'est trompée ! O est le point où se coupent les médiatrices.<br>Dans un triangle obtus, il tombe <span class="big">en dehors du triangle</span>, de l'autre côté de [AC] par rapport à B.<br>Il est au milieu de [AC] seulement si le triangle est rectangle en B.`,
      consigne: "Où se trouve le point O à égale distance des trois fermes ?",
      verification: { type: "qcm", choix: ["À l'intérieur du triangle", "Au milieu du côté [AC]", "En dehors du triangle"], bonne: 2 },
      dessin: fermes(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les guirlandes de la fête",
      sorte: "defi",
      question: `Trois arbres A, B et C : AB = 6 m, BC = 8 m, et l'angle en B est droit.<br>Pour la fête, on plante un mât relié aux trois arbres par trois guirlandes de même longueur, bien tendues.<br><br>Combien mesure chaque guirlande ?`,
      reponse: `Le mât est à égale distance de A, B et C : c'est le centre du cercle circonscrit.<br>Dans un triangle rectangle, ce centre est le <b>milieu de l'hypoténuse</b> [AC].<br>Pythagore : AC² = 6² + 8² = 36 + 64 = 100, donc AC = 10 m.<br>Chaque guirlande mesure la moitié : <span class="big">5 m</span>.`,
      consigne: "Combien mesure chaque guirlande, en mètres ?",
      verification: { type: "courte", attendus: ["5"], unite: "m" },
      dessin: arbres(),
    },
  ],
};

export default problemes;
