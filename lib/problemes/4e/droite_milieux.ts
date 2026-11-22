// Énigmes à projeter — 4e, notion droite_milieux (la sangle de l'escabeau,
// la poutre de la charpente, le raccourci du sentier avec la réciproque,
// le patchwork des milieux, piège du renfort de la voile, défi du potager
// de Mamie : les milieux d'un quadrilatère).
// Figures au bon rapport : coordonnées calculées ci-dessous. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

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
const BLEU_TRAIT = `stroke="${C.bleu}" stroke-width="5" stroke-linecap="round" fill="none"`;
const ROSE_TRAIT = `stroke="${C.rose}" stroke-width="5" stroke-linecap="round" fill="none"`;
// n petits traits de codage au milieu du segment [ab] (longueurs égales).
const code = (a: P, b: P, n: number, coul: string = C.rose) => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const u: P = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  const v: P = [-u[1], u[0]];
  const m = mil(a, b);
  let s = "";
  for (let k = 0; k < n; k++) {
    const d = (k - (n - 1) / 2) * 8;
    const c: P = [m[0] + d * u[0], m[1] + d * u[1]];
    s += `<path d="M${r1(c[0] - 9 * v[0])} ${r1(c[1] - 9 * v[1])} L${r1(c[0] + 9 * v[0])} ${r1(c[1] + 9 * v[1])}" stroke="${coul}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return s;
};

// L'escabeau : BC = 220 px pour 90 cm ; M et N milieux des pieds.
const escabeau = () => {
  const A: P = [240, 70], B: P = [130, 370], Cc: P = [350, 370];
  const M = mil(A, B), N = mil(A, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un escabeau ouvert : sommet A, pieds B et C, une sangle MN relie les milieux des deux pieds">
  ${seg([40, 370], [440, 370], `stroke="${C.pale}" stroke-width="3"`)}
  ${seg(A, B, `stroke="${C.craie}" stroke-width="7" stroke-linecap="round" fill="none"`)}${seg(A, Cc, `stroke="${C.craie}" stroke-width="7" stroke-linecap="round" fill="none"`)}
  ${seg(M, N, BLEU_TRAIT)}
  ${code(A, M, 1)}${code(M, B, 1)}${code(A, N, 2)}${code(N, Cc, 2)}
  ${pt(A, "A", 0, -16)}${pt(B, "B", -22, 8)}${pt(Cc, "C", 22, 8)}${pt(M, "M", -26, 6, C.bleu)}${pt(N, "N", 26, 6, C.bleu)}
  <text x="240" y="${M[1] - 14}" fill="${C.bleu}" font-size="22" text-anchor="middle">sangle${NB}?</text>
  <text x="240" y="402" fill="${C.craie}" font-size="22" text-anchor="middle">BC = 90 cm</text>
  </svg>`;
};

// La charpente : triangle ABC du toit, poutre MN entre les milieux des chevrons.
const charpente = () => {
  const A: P = [240, 70], B: P = [50, 290], Cc: P = [430, 290];
  const M = mil(A, B), N = mil(A, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="La charpente d'un toit : chevrons AB et AC, plancher BC, une poutre MN entre les milieux des chevrons">
  <rect x="80" y="290" width="320" height="100" fill="${C.pale}" fill-opacity=".2" stroke="${C.pale}" stroke-width="3"/>
  <rect x="210" y="320" width="60" height="70" fill="${C.jaune}" fill-opacity=".3" stroke="${C.pale}" stroke-width="3"/>
  ${seg(A, B, `stroke="${C.jaune}" stroke-width="8" stroke-linecap="round" fill="none"`)}${seg(A, Cc, `stroke="${C.jaune}" stroke-width="8" stroke-linecap="round" fill="none"`)}
  ${seg(B, Cc)}
  ${seg(M, N, BLEU_TRAIT)}
  ${code(A, M, 1)}${code(M, B, 1)}${code(A, N, 2)}${code(N, Cc, 2)}
  ${pt(A, "A", 0, -16)}${pt(B, "B", -20, -10)}${pt(Cc, "C", 20, -10)}${pt(M, "M", -26, 0, C.bleu)}${pt(N, "N", 26, 0, C.bleu)}
  <text x="240" y="${M[1] - 14}" fill="${C.bleu}" font-size="22" text-anchor="middle">poutre</text>
  <text x="240" y="412" fill="${C.pale}" font-size="20" text-anchor="middle">le plancher (BC)</text>
  </svg>`;
};

// Le sentier : M milieu de [AB], (MN) // (BC), N sur [AC].
const sentier = () => {
  const A: P = [90, 80], B: P = [60, 360], Cc: P = [420, 330];
  const M = mil(A, B), N = mil(A, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois sentiers en triangle ABC ; un raccourci part du milieu M de [AB], parallèle à [BC], et arrive en N sur [AC]">
  <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} Z" fill="${C.jaune}" fill-opacity=".1" stroke="none"/>
  ${seg(A, B, `stroke="${C.craie}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round" fill="none"`)}
  ${seg(B, Cc, `stroke="${C.craie}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round" fill="none"`)}
  ${seg(A, Cc, `stroke="${C.craie}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round" fill="none"`)}
  ${seg(M, N, BLEU_TRAIT)}
  ${code(A, M, 1)}${code(M, B, 1)}
  ${pt(A, "A", -4, -18)}${pt(B, "B", -20, 10)}${pt(Cc, "C", 22, 8)}${pt(M, "M", -24, 4, C.bleu)}${pt(N, "N", 4, -16, C.bleu)}
  <text x="40" y="120" font-size="30" text-anchor="middle">⛺</text>
  <text x="350" y="200" fill="${C.craie}" font-size="22" text-anchor="middle">AC = 7,4 km</text>
  <text x="170" y="245" fill="${C.bleu}" font-size="20" text-anchor="middle">raccourci</text>
  <text x="250" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">(MN) // (BC)${NB}; AN = ?</text>
  </svg>`;
};

// Le patchwork : 11 px par cm. AB = 18 cm, BC = 24 cm, AC = 30 cm.
const patchwork = () => {
  const A: P = [100, 172], B: P = [100, 370], Cc: P = [364, 370];
  const I = mil(A, B), J = mil(B, Cc), K = mil(A, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un patchwork triangulaire de côtés 18, 24 et 30 cm ; le triangle qui joint les trois milieux est d'une autre couleur">
  <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} Z" fill="${C.bleu}" fill-opacity=".15" ${SB}/>
  <path d="M${I[0]} ${I[1]} L${J[0]} ${J[1]} L${K[0]} ${K[1]} Z" fill="${C.jaune}" fill-opacity=".45" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>
  ${code(A, I, 1)}${code(I, B, 1)}${code(B, J, 2)}${code(J, Cc, 2)}${code(A, K, 3)}${code(K, Cc, 3)}
  <text x="60" y="${I[1] + 8}" fill="${C.craie}" font-size="22" text-anchor="middle">18 cm</text>
  <text x="${J[0]}" y="402" fill="${C.craie}" font-size="22" text-anchor="middle">24 cm</text>
  <text x="${K[0] + 60}" y="${K[1] - 24}" fill="${C.craie}" font-size="22" text-anchor="middle">30 cm</text>
  <text x="${r1((I[0] + J[0] + K[0]) / 3)}" y="${r1((I[1] + J[1] + K[1]) / 3 + 10)}" fill="${C.rose}" font-size="28" text-anchor="middle">?</text>
  <text x="330" y="90" font-size="34" text-anchor="middle">🧵</text>
  </svg>`;
};

// La voile : mât [AB] vertical, bôme [BC] horizontale ; renfort MN entre les milieux.
const voile = () => {
  const A: P = [200, 50], B: P = [200, 320], Cc: P = [410, 320];
  const M = mil(A, B), N = mil(B, Cc);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une voile triangulaire ABC : mât AB, bôme BC ; un renfort MN joint le milieu du mât et le milieu de la bôme">
  <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} Z" fill="${C.pale}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  ${seg(A, [200, 350], `stroke="${C.craie}" stroke-width="7" stroke-linecap="round" fill="none"`)}
  ${seg(B, Cc, `stroke="${C.craie}" stroke-width="6" stroke-linecap="round" fill="none"`)}
  <path d="M90 350 L420 350 L380 395 L130 395 Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  ${seg(M, N, ROSE_TRAIT)}
  ${code(A, M, 1, C.bleu)}${code(M, B, 1, C.bleu)}${code(B, N, 2, C.bleu)}${code(N, Cc, 2, C.bleu)}
  ${pt(A, "A", -22, 4)}${pt(B, "B", -22, -6)}${pt(Cc, "C", 22, -10)}${pt(M, "M", -24, 6, C.rose)}${pt(N, "N", 0, -16, C.rose)}
  <text x="90" y="200" fill="${C.pale}" font-size="20" text-anchor="middle">mât</text>
  <text x="350" y="${B[1] + 24}" fill="${C.pale}" font-size="20" text-anchor="middle">bôme</text>
  <text x="330" y="160" fill="${C.rose}" font-size="20" text-anchor="middle">renfort${NB}?</text>
  </svg>`;
};

// Le potager : AC ≈ 362 px et BD ≈ 243 px (rapport 1,5 comme 12 m et 8 m).
const potager = () => {
  const A: P = [60, 200], B: P = [250, 80], Cc: P = [420, 240], D: P = [210, 320];
  const M = mil(A, B), N = mil(B, Cc), Pp = mil(Cc, D), Q = mil(D, A);
  const POINTILLE = `stroke="${C.pale}" stroke-width="3" stroke-dasharray="8 8" fill="none"`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un potager à quatre côtés ABCD, ses deux diagonales, et une ficelle qui relie les milieux M, N, P, Q des côtés">
  <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} L${D[0]} ${D[1]} Z" fill="${C.jaune}" fill-opacity=".15" ${SB}/>
  ${seg(A, Cc, POINTILLE)}${seg(B, D, POINTILLE)}
  <path d="M${M[0]} ${M[1]} L${N[0]} ${N[1]} L${Pp[0]} ${Pp[1]} L${Q[0]} ${Q[1]} Z" fill="none" stroke="${C.bleu}" stroke-width="5" stroke-linejoin="round"/>
  ${pt(A, "A", -22, 8)}${pt(B, "B", 0, -16)}${pt(Cc, "C", 22, 8)}${pt(D, "D", 0, 30)}
  ${pt(M, "M", -18, -12, C.bleu)}${pt(N, "N", 20, -12, C.bleu)}${pt(Pp, "P", 22, 20, C.bleu)}${pt(Q, "Q", -20, 22, C.bleu)}
  <text x="420" y="120" font-size="32" text-anchor="middle">🥕</text>
  <text x="240" y="380" fill="${C.craie}" font-size="20" text-anchor="middle">diagonales${NB}: AC = 12 m${NB}; BD = 8 m</text>
  <text x="240" y="408" fill="${C.pale}" font-size="20" text-anchor="middle">ficelle MNPQ${NB}: longueur${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "droite_milieux",
  titre: "Énigmes du théorème des milieux",
  description: "La sangle de l'escabeau, la poutre de la charpente, le raccourci du sentier, le patchwork, le piège de la voile, le défi du potager : utiliser le théorème des milieux et sa réciproque pour trouver un parallèle, une longueur, un milieu.",
  problemes: [
    {
      tag: "Énigme 1 · L'escabeau",
      titre: "La sangle de sécurité",
      question: `L'escabeau de Malik est ouvert. Ses pieds B et C sont à 90 cm l'un de l'autre.<br>Une sangle relie M, milieu du pied [AB], et N, milieu du pied [AC].<br><br>Quelle est la longueur de la sangle MN ?`,
      reponse: `Dans le triangle ABC, M est le milieu de [AB] et N le milieu de [AC].<br>D'après le théorème des milieux : (MN) // (BC) et MN = BC ÷ 2.<br>MN = 90 ÷ 2 = <span class="big">45 cm</span>.`,
      consigne: "Quelle est la longueur de la sangle MN, en cm ?",
      verification: { type: "courte", attendus: ["45"], unite: "cm" },
      dessin: escabeau(),
    },
    {
      tag: "Énigme 2 · La charpente",
      titre: "La poutre du toit",
      question: `Dans la charpente d'un toit, une poutre relie M, milieu du chevron [AB], et N, milieu du chevron [AC].<br><br>Que peut-on dire de la poutre (MN) et du plancher (BC) ?`,
      reponse: `M et N sont les milieux de deux côtés du triangle ABC.<br>Le théorème des milieux : la droite qui joint ces milieux est parallèle au troisième côté.<br>Donc <span class="big">(MN) // (BC)</span>, et en plus MN = BC ÷ 2.`,
      consigne: "Que peut-on dire de (MN) et (BC) ?",
      verification: { type: "qcm", choix: ["(MN) est perpendiculaire à (BC)", "(MN) est parallèle à (BC)", "(MN) coupe [BC] en son milieu"], bonne: 1 },
      dessin: charpente(),
    },
    {
      tag: "Énigme 3 · La randonnée",
      titre: "Le raccourci",
      question: `Sur la carte, trois sentiers forment le triangle ABC.<br>Un raccourci part de M, milieu de [AB]. Il est parallèle au sentier [BC] et arrive en N sur [AC].<br>Le sentier [AC] mesure 7,4 km.<br><br>Quelle distance y a-t-il de A à N ?`,
      reponse: `Dans le triangle ABC, la droite (MN) passe par M, milieu de [AB], et elle est parallèle à (BC).<br>D'après la réciproque du théorème des milieux, elle coupe [AC] en son milieu : N est le milieu de [AC].<br>AN = 7,4 ÷ 2 = <span class="big">3,7 km</span>.`,
      consigne: "Quelle est la distance AN, en km ?",
      verification: { type: "courte", attendus: ["3,7", "3.7"], unite: "km" },
      dessin: sentier(),
    },
    {
      tag: "Énigme 4 · Le patchwork",
      titre: "Le triangle du centre",
      question: `Inès coud un patchwork triangulaire. Ses côtés mesurent 18 cm, 24 cm et 30 cm.<br>Elle relie les milieux des trois côtés : au centre, un triangle d'une autre couleur.<br><br>Quel est le périmètre du triangle du centre ?`,
      reponse: `Chaque côté du triangle du centre joint deux milieux.<br>Théorème des milieux : il mesure la moitié du côté qui lui fait face.<br>Ses côtés : 30 ÷ 2 = 15 cm, 24 ÷ 2 = 12 cm et 18 ÷ 2 = 9 cm.<br>Périmètre : 15 + 12 + 9 = <span class="big">36 cm</span>, la moitié des 72 cm du grand.`,
      consigne: "Quel est le périmètre du triangle du centre ?",
      verification: { type: "qcm", choix: ["36 cm", "72 cm", "18 cm"], bonne: 0 },
      dessin: patchwork(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le renfort de la voile",
      sorte: "piege",
      question: `Sur la voile ABC, Hugo coud un renfort de M, milieu du mât [AB], à N, milieu de la bôme [BC].<br>Il dit : « Le renfort est parallèle à la bôme (BC). »<br><br><b>À quel côté le renfort (MN) est-il parallèle ?</b>`,
      reponse: `Hugo s'est trompé ! M et N sont sur [AB] et [BC] : le troisième côté est [AC].<br>Le théorème des milieux : (MN) est parallèle au côté qui ne contient ni M ni N.<br>Donc <span class="big">(MN) // (AC)</span>, et MN = AC ÷ 2.<br>D'ailleurs (MN) coupe (BC) en N : elle ne peut pas lui être parallèle.`,
      consigne: "À quel côté le renfort (MN) est-il parallèle ?",
      verification: { type: "qcm", choix: ["(AB)", "(BC)", "(AC)"], bonne: 2 },
      dessin: voile(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le potager de Mamie",
      sorte: "defi",
      question: `Le potager de Mamie a quatre côtés : ABCD. Ses diagonales mesurent AC = 12 m et BD = 8 m.<br>Elle plante un piquet au milieu de chaque côté : M, N, P, Q. Puis elle tend une ficelle d'un piquet au suivant, tout autour.<br><br>Quelle longueur de ficelle lui faut-il ?`,
      reponse: `Dans le triangle ABC, M et N sont les milieux de [AB] et [BC] : MN = AC ÷ 2 = 6 m.<br>Dans le triangle ACD : PQ = AC ÷ 2 = 6 m.<br>Dans les triangles ABD et CBD : MQ = BD ÷ 2 = 4 m et NP = BD ÷ 2 = 4 m.<br>Total : 6 + 6 + 4 + 4 = <span class="big">20 m</span>, c'est AC + BD.<br>Bonus : les côtés opposés de MNPQ sont parallèles, c'est un parallélogramme.`,
      consigne: "Quelle longueur de ficelle faut-il, en mètres ?",
      verification: { type: "courte", attendus: ["20"], unite: "m" },
      dessin: potager(),
    },
  ],
};

export default problemes;
